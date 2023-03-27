---
title: Unity仿站双渲染—_PBR混合
data: 2021-8-28 16:09
tags:
  - Unity
  - Shader
  - Rendering
categories:
  - Games

---

##### <b>Unity 关于“战双帕弥什”中的PBR混合</b>
---

最近由于工作原因接触到了渲染这方面的东西，效果中需要实现到“战双帕弥什”中的卡通渲染混合了PBR这样类似的效果。故也忙里偷闲，写了这篇文章。

![](/images/ZhanShuangPBRMixer/GamePreview.png)

其实可以从这张图上看出来，人物武器上的金属和身上的金属有很明显的PBR效果。而且不只是金属PBR也体现在了人物服装的漫反射上，基本可以说是
在服装上高光，漫反射，和金属度都是PBR的渲染。

<!-- more -->

---

再来看一下Unity URP内部提供的PBR Lit材质。

![](/images/ZhanShuangPBRMixer/UnityPBRPreview.png)

这是一个默认状态下的URP PBR 效果，其核心函数为````UniversalFragmentPBR()```` 包含在Lighting.hlsl的文件中，具体内容如下

![](/images/ZhanShuangPBRMixer/URP_PRRCODE.png)

它接受的数据主要就是InputData这个结构体，还有关于PBR的一段参数，就能用这个函数直接计算出PBR的表面。 那么InputData中到底给了
函数哪些内容呢。这个内容被包含在了Input.hlsl文件中，如下。

![](/images/ZhanShuangPBRMixer/InputData.png)

这样就知道了我们需要为````UniversalFragmentPBR()````函数输入准备哪些东西了

![](/images/ZhanShuangPBRMixer/StartInputData.png)

我们先准备一个函数，让这个函数返回这个结构体，并初始花结构体里的值都为0。我们可以直接在这个函数里计算InputData结构中所拥有的所有内容

![](/images/ZhanShuangPBRMixer/InputDataCode.png)

这就是InputData中的全部参数，当然这一部分也可以直接在顶点着色器上完成，后续直接传入这个结构中即可。有了这个之后其实就可以直接开始使用了
后面只需要将对应的参数传入后面即可。这边另外做了一个surfaceData来存放其他数据

![](/images/ZhanShuangPBRMixer/SurfaceInputCode.png)

接下来我们就可以在片元着色器中开始调用````UniversalFragmentPBR()````函数了。

````cpp
float4 PBRcolor = UniversalFragmentPBR(inputData, surfaceData.albedo, surfaceData.metallic, surfaceData.specular, surfaceData.smoothness, surfaceData.occlusion, surfaceData.emission, surfaceData.alpha);

````
>这个函数输出其实就是输出的最后的PBR着色。

但是因为我们需要做的是混合PBR中的高光，和金属度部分，有的时候也需要单独的漫反射通道。所以我们并不能直接使用````UniversalFragmentPBR()````函数。
所以这个时候就需要回头去看看函数中的源码。可以看到这样一段内容。

````cpp
half3 color = GlobalIllumination(brdfData, inputData.bakedGI, occlusion, inputData.normalWS, inputData.viewDirectionWS);
color += LightingPhysicallyBased(brdfData, mainLight, inputData.normalWS, inputData.viewDirectionWS);

````

这两个函数一个计算了在PBR着色计算中的mesh颜色信息，mesh表面的光照信息。所以只要我们把它区分开，就能实现PBR的混合了。
故如下

````cpp
//InitializeBRDFData(albedo, metallic, specular, smoothness, alpha, brdfData);
BRDFData brdfData;
InitializeBRDFData(float3(1,1,1), surfaceData.metallic, surfaceData.specular, 0, surfaceData.alpha, brdfData);
float3 PBRLightDiffuse = LightingPhysicallyBased(brdfData, light, inputData.normalWS, inputData.viewDirectionWS);//PBR Lighting
BRDFData brdfData2;
InitializeBRDFData(float3(0,0,0), 0, surfaceData.specular, surfaceData.smoothness, surfaceData.alpha, brdfData2);
float3 PBRLightSpec = LightingPhysicallyBased(brdfData2, light, inputData.normalWS, inputData.viewDirectionWS);//PBR Lighting

BRDFData brdfData3;
InitializeBRDFData(surfaceData.albedo, 1, surfaceData.specular, surfaceData.smoothness, surfaceData.alpha, brdfData3);
float3 PBRmetallic = LightingPhysicallyBased(brdfData3, light, inputData.normalWS, inputData.viewDirectionWS);
float3 MetalicBase = GlobalIllumination(brdfData3, inputData.bakedGI, surfaceData.occlusion, inputData.normalWS, inputData.viewDirectionWS);//MetalBaseCOlor
smoothnessMask = step(0.1,smoothnessMask);

float3 PBRDiffuse = smoothstep(0,_PbrDiffuseSmooth,PBRLightDiffuse.r);
PBRDiffuse = lerp( DarkSide,BrightSide,PBRDiffuse).xyz;
````

首先，要使用````LightingPhysicallyBased()````函数需要有一个BRDFData类型的结构输入，先跟着Lighting.hlsl中的内容把BRDFData中的数据储存好。
另外，我们需要分离高光和漫反射，为了做到唯一变量，先把颜色变量变为白色输入BRDFData中，这样我们````LightingPhysicallyBased()````得出的结果就能用于最后的混合。
同理，高光和金属度也一样。 最后将结果lerp一下漫反射即可获得我们需要混合的三个通道，然后用这些通道进行卡通渲染上的叠加就可以了。