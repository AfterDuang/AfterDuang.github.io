---
title: Unity实现高质量多通道阴影的皮肤渲染
date: 2022-5-17
tags:
  - Unity
  - Shader
categories:
  - Games

katex: true

---

在早就发出来的Uniteetokyo2018的PDF中，米家介绍了他们之前在B站的mmd中的渲染技术，其中包括以下这些

![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/Meue.png)_Unitetokyo2018米哈游_

<b>其中包括以下内容</b>
  - 具有笔刷样式的渐变着色
  - 各向异性材质，折射模糊
  - 基于主灯光的边缘光
  - PCSS算法的Shadow
  - 高质量描边

目前暂且只研究到了前两个部分。后面的PCSS的内容在URP管线中实现感觉需要修改源码，因为还没有把URP研究明白，
所以等研究明白了再写(开发能力太弱)。


<b>先看看身上的效果吧</b>

![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/SkinPreview.png)_演示效果_

<!-- more -->

然后上过程吧,PDF中首先提到了一个Ramp，如下。

![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/2DRampPlane.png)_Unitetokyo2018米哈游_

他有三个通道，目前猜测的因该是控制了三个通道的Ramp的软硬。其中三个通道也对应了三层，人物身上的所有阴影是
由三层不同的阴影叠加而成。 再来看看它们对应的通道，还有材质面板。(上图左下)
不难发现其实应该是<u>三个通道分别用来映射了三层阴影</u>,然后对每层阴影做一次笔刷动，最后叠加在一起就行了。
还要一点就是这个ramp是个2D的，在映射的时候，横向用lambert来采样，纵向可能需要用这个地方的曲率来定位采样。
但是咱没有找到可以知道这一点曲率的好办法，有一种方法是用法线贴图和此点默认的法线进行比较，但并不使用于
所有模型。
另外他们还用到了一个笔刷贴图来控制身上漫反射阴影的偏移效果，使得图像更有手绘的感觉。

![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/BrushPr.png)_Unitetokyo2018米哈游_

这个笔刷也有四个通道，RGB通道图上没有标，长下面这样。
![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/BrushTextureC.png)

一个往左刷，一个往右刷，错开来，这样就很合理！！！


<b>那么现在开始吧</b>


---

#### <b>基本的漫反射采样与漫反射笔刷</b>
由于我们并不能完全复制这一张Ramp图，但ramp其实可以用程序化的方法去代替，不过也舍弃了手动控制所有漫反射
渐变的可能性。
先找到一个名叫sigmoid的函数，这个函数长这样。

$$

S(x) = \frac{1}{1+e ^{-x}}

$$

![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/GraphP.png)_函数曲线_

这个函数最大只会固定到1最小值会固定到0。拿来采样Lambert还挺合适的，所以咱们先把这串东西写进Shader。

````cpp

float sigmoid(float x, float center, float sharp) 
        {
	        float s;
	        s = 1 / (1 + pow(100000, (-3 * sharp * (x - center))));
	        return s;
        }

````
这个地方把e常数直接写成100000了，这是因为e的浮点太多了，其次是为了压缩以下函数，原先的曲线太平滑。
其中 center是偏移值,Shap让这个函数更窄是阴影更锐利。

![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/GraphG.png)_函数曲线_

定义好之后就可以直接在片元着色器中使用了！！我们用HalfLambert来采样，这样阴影更加柔和。

````cpp

float R_Sig=sigmoid(HNL,clamp(_RDivided*(1+(1-DiffuseBrush.r)*_BrushWeightR),0.01,0.99),_SharpR);
float G_Sig=sigmoid(HNL,clamp(_GDivided*(1+(1-DiffuseBrush.g)*_BrushWeightG),0.01,0.99),_SharpG);
float B_Sig=sigmoid(HNL,clamp(_BDivided*(1+(1-DiffuseBrush.b)*_BrushWeightB),0.01,0.99),_SharpB);

float B2H=1-R_Sig;
float H2M=1-G_Sig;
float M2L=1-B_Sig;

````

这样一来我们就可以通过 Divided和Shap 这两个参数来控制这个函数采样的HalfLambert的状态了。在这个地方
咱们可以直接用原Brush图中的值来偏移这个函数算出的阴影值，所以也同时实现了Brush效果，由于咱们做了三次
用来分别控制三层阴影。记得一定要反向一下，因为不然阴影就和光一个方向了。然后我们就可以合并上这三个阴影
了。

>当然如果是用来米家那样的2DRamp的话就要注意在采样UV的时候使用Brush贴图来采样

````cpp

//多层阴影合并
float3 combinedColor = MainTexture.xyz;
float3 targetColor=lerp(combinedColor,lerp( combinedColor,_HightShadowC.xyz,_HightShadowC.a),B2H);
combinedColor = lerp(combinedColor,targetColor,_Rmix);

targetColor=lerp(combinedColor,lerp( combinedColor,_MiddleShadowC.xyz,_MiddleShadowC.a),H2M);
combinedColor = lerp(combinedColor,targetColor,_Gmix);

targetColor=lerp(combinedColor,lerp( combinedColor,_LowShadowC.xyz,_LowShadowC.a),M2L);
combinedColor = lerp(combinedColor,targetColor,_Bmix);


````
我们逐层合并上去，先搞个地图MainTexture作为底色，一层一层进行lerp，先把每层阴影的颜色和底部纹理的颜色
混合出来，混合的大小直接用A通道控制。再把混合好的阴影颜色和之前sigmoid函数解出来的漫反射阴影部分再Lerp
一次得到第一层阴影。一次往下叠加三次，就可以得到最终的效果了。


![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/OnlyDiffuse.png)_OnlyDiffuse_

#### <b>给皮肤添加SSS效果</b>

但是现在这样还不够，我们需要添加SSS效果，这样才能让皮肤更加红润。先不说原理，由常识可得，就是越薄
或转角越大的地方容易出现光透过皮肤而变红的情况，而且这些地方集中在光线交界的位置，也就是阴影交界的
的位置出现一些红色的过渡就是大体正确的结果。

下面这个东西叫高斯函数

$$

f(x) = ae^{-\frac{(x-b)^2}{2c^2}}

$$


![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/GaosiGraph.png)_高斯函数图像_

他的函数图像是往两边扩散的，我们可以用这个东西来模拟那种阴影交界处的红色渐变。我们这样看还不是很清楚
那么下面这样呢。

![Audits - Lighthouse](/images/ToonHightQulityDiffuseShadow/Gaosi2Graph.png)_高斯函数图像_

想象一下输入的x是Lambert的值，Lambert的值在0-1之间渐变增加，计算结果会从0-1再到0，这样我们就有了一个
边界区域的mask。就可以实现类似于SSS的效果。

````cpp

half _BoundSharp = 9.5 + 0.5;
float MidSig = sigmoid(NL, _DividLineM, _BoundSharp * _DividSharpness);
float DarkSig = sigmoid(NL, _DividLineD, _BoundSharp * _DividSharpness);
float diffuseLumin2 = (ndc2Normal(_DividLineM) + ndc2Normal(_DividLineD)) / 2;

float MidDWin = DarkSig - MidSig;
loat DarkWin = 1 - DarkSig;

float MidLWin = sigmoid(NL, _DividLineM, _DividSharpness);
float SSMidLWin = Gaussion(NL, _DividLineM, _SSForwardAtt * _SSSSize);
float SSMidDWin = Gaussion(NL, _DividLineM, _SSSSize);
float SSMidLWin2 = Gaussion(NL, _DividLineM, _SSForwardAtt * _SSSSize*0.01);
float SSMidDWin2 = Gaussion(NL, _DividLineM, _SSSSize * 0.01);
float3 SSLumin1 = MidLWin * diffuseLumin2 * _SSForwardAtt * (SSMidLWin + SSMidLWin2);
float3 SSLumin2 = ((MidDWin + DarkWin) * diffuseLumin2) * (SSMidDWin+ SSMidDWin2);
			
float3 SS = _SSSWeight * (SSLumin1 + SSLumin2) * _SSSColor.rgb;

````

这里多出的代码主要用于多个高斯叠加来实现两边不对称的效果详见[这里](https://zhuanlan.zhihu.com/p/97892884)

SSS基本就到这，其实详细的原理还没有搞明白，后面完全明白了之后再结合新东西写一个~~~


#### <b>Specular && RIM Light</b>

这个部分其实没有太多可说的，都是和前面一样的东西，觉得皮肤需要也就加了进去，当然
有所不同的是,Specular中也加入了Brush的影响。

<b>Speclaur</b>

````cpp

float SpecularRamp =pow(max(0,HNV),_SpecGloss);

float Spec1ts = 1- sigmoid(SpecularRamp,clamp(_SpecRDivided*(1+(1-SpecBrush.r)*_SpecBrushWeightR),0.01,0.99),_SpecSharpR);
float Spec2ts = 1- sigmoid(SpecularRamp,clamp(_SpecGDivided*(1+(1-SpecBrush.g)*_SpecBrushWeightG),0.01,0.99),_SpecSharpG);
float Spec3ts = 1- sigmoid(SpecularRamp,clamp(_SpecBDivided*(1+(1-SpecBrush.b)*_SpecBrushWeightB),0.01,0.99),_SpecSharpB);

float3 SpecCombined = float3(1,1,1);

float3 SpecTargetColor=lerp(SpecCombined,float3(0,0,0),Spec1ts);
SpecCombined = lerp(SpecCombined,SpecTargetColor,_SpecRmix);

SpecTargetColor = lerp(SpecCombined,float3(0,0,0),Spec2ts);
SpecCombined = lerp(SpecCombined,SpecTargetColor,_SpecGmix);

SpecTargetColor = lerp(SpecCombined,float3(0,0,0),Spec3ts);
SpecCombined = lerp(SpecCombined,SpecTargetColor,_SpecBmix);

````


<b>RimLight</b>


````cpp

float fresnel = pow((1-NV),max(0.01,_RimPow));
fresnel = smoothstep(min(0.99 , _RimMinRange) , _RimMaxRange , fresnel);
float3 rimColor = fresnel * _RimColor.xyz;

````


#### <b>结束</b>

先贴一下所有的代码


````c

Shader "YuzuToonShader/YuzuToonSkin"
{
    Properties
    {
        [Header(MainTexture)]
        _Color ("Color", Color) = (1,1,1,1)
        _MainTex ("MainTexture", 2D) = "white" {}

        [Space(30)]

        [Header(Deffuse)]
        _DeffuseRamp("DeffuseRamp",2D) = "white"{}
        _DiffuseBrush("DiffuseBrush",2D) = "white"{}
        [Space(30)]
        _DiffuseRampCenter("DiffuseRampCenter",Range(-1,1)) = 0.426
        _DiffuseRampShap("DiffuseRampShap",Range(0,1)) = 0.313
        [Space(30)]
        _BrushWeightR("BrushWeightR",Range(0,1)) = 0.924
        _BrushWeightG("BrushWeightG",Range(0,1)) = 0.907
        _BrushWeightB("BrushWeightB",Range(0,1)) = 0.906
        [Space(30)]
        _RDivided("RDivided",Range(0,1)) = 0.161
        _GDivided("GDivided",Range(0,1)) = 0.213
        _BDivided("BDivided",Range(0,1)) = 0.254
        [Space(30)]
        _SharpR("ShapR",Range(0,1)) = 0.95
        _SharpG("ShapG",Range(0,1)) = 0.889
        _SharpB("ShapB",Range(0,1)) = 0.655
        [Space(30)]
        _HightShadowC("HightShadowC",Color) = (0.894,0.470,0.360,0.28)
        _MiddleShadowC("MiddleShadowC",Color) = (0.764,0.380,0.407,0.72)
        _LowShadowC("LowShadowC",Color) = (0.611,0.282,0.345,0.921)
        [Space(30)]
        _Rmix("Rmix",Range(0,1)) = 0.854
        _Gmix("Gmix",Range(0,1)) = 0.833
        _Bmix("Bmix",Range(0,1)) = 0.726
        [Space(30)]
        [Header(Specular)]

        [Toggle(USE_SPECULAR)]_EnableSpec("Enable Spec",float) = 0
        _SpecularBrush("SpecBrush",2D) = "white"{}
        [Space(30)]
        _SpecBrushWeightR("BrushWeightR",Range(0,1)) = 0.612
        _SpecBrushWeightG("BrushWeightG",Range(0,1)) = 0.699
        _SpecBrushWeightB("BrushWeightB",Range(0,1)) = 0.796
        [Space(30)]
        _SpecRDivided("RDivided",Range(0,1)) = 0.532
        _SpecGDivided("GDivided",Range(0,1)) = 0.664
        _SpecBDivided("BDivided",Range(0,1)) = 0.813
        [Space(30)]
        _SpecSharpR("ShapR",Range(0,50)) = 0.4
        _SpecSharpG("ShapG",Range(0,50)) = 0.6
        _SpecSharpB("ShapB",Range(0,50)) = 15.2
        [Space(30)]
        _SpecRmix("Rmix",Range(0,1)) = 1
        _SpecGmix("Gmix",Range(0,1)) = 0.611
        _SpecBmix("Bmix",Range(0,1)) = 0.597
        [Space(30)]
        _SpecGloss("Gloss",Range(1.0,512)) = 2

        [Header(SSS)]
        [Space(30)]
        _SSSColor ("Subsurface Scattering Color", Color) = (1,0,0,1)
        _SSSColorSub("Subsurface Scattering 2nd Color", Color) = (0.8,0,0.2,1)
        _SSSWeight ("Weight of SSS", Range(0,1)) = 0.722
        _SSSSize("Size of SSS", Range(0,1)) = 0.407
        _SSForwardAtt("Atten of SS in forward Dir", Range(0,1)) = 0.643
        _DividLineM("DividLine of Middle", Range(-0.5, 0.8)) = 0.2
        _DividLineD("DividLine of Dark", Range(-1.0, 0.0)) = -0.5
        _DividSharpness("Sharpness of Divide Line", Range(0.2,5)) = 1.87
        [Space(30)]

        [Header(RIMLight)]

        [Space(30)]

        [Toggle(USE_RIM)]_EnableRim("Enable RIM",float) = 0
        _RimPow("RimPow",Range(0,255)) = 5
        [HDR]_RimColor("Rim Color",Color) = (1,1,1,1)
        _RimMinRange("RimMinRange",Range(0,1)) = 0.095
        _RimMaxRange("RimMaxRange",Range(0,1)) = 0.863

        [Space(30)]
        [Header(Outline)]
        _Outlinewidth("Outline Width", Range(0,1)) = 0.2
        _OutlineColor("Outline Color", Color) = (0.5,0.5,0.5,1)
    }
    SubShader
    {
        Tags { "RenderPipeline" = "UniversalPipeline" "RenderType" = "Opaque" "Queue" = "Geometry" }
        HLSLINCLUDE

        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
        #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"
        //#include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Shadows.hlsl"
        //#include "Packages/com.unity.render-pipelines.universal/Shaders/LitInput.hlsl"
        //#include "Packages/com.unity.render-pipelines.universal/Shaders/ShadowCasterPass.hlsl"

        //纹理采样器

        TEXTURE2D(_MainTex);            SAMPLER(sampler_MainTex);
        TEXTURE2D(_DeffuseRamp);        SAMPLER(sampler_DeffuseRamp);
        TEXTURE2D(_DiffuseBrush);       SAMPLER(sampler_DiffuseBrush);
        TEXTURE2D(_SpecularBrush);      SAMPLER(sampler_SpecularBrush);
        

        //

        //CBUFFER
        CBUFFER_START(UnityPerMaterial)

        float4 _Color;

        float4 _MainTex_ST;
        float4 _DiffuseBrush_ST;

        float _DiffuseRampCenter;
        float _DiffuseRampShap;

        float _BrushWeightR;
        float _BrushWeightG;
        float _BrushWeightB;//扰动强度

        float _RDivided;//控制三个阈值
        float _GDivided;
        float _BDivided;

        float _SharpR;//锐利度
        float _SharpG;
        float _SharpB;

        float _Rmix;
        float _Gmix;
        float _Bmix;

        float4 _SpecularBrush_ST;

        float _SpecBrushWeightR;
        float _SpecBrushWeightG;
        float _SpecBrushWeightB;//扰动强度

        float _SpecRDivided;//控制三个阈值
        float _SpecGDivided;
        float _SpecBDivided;

        float _SpecSharpR;//锐利度
        float _SpecSharpG;
        float _SpecSharpB;

        float _SpecRmix;
        float _SpecGmix;
        float _SpecBmix;
        float _SpecGloss;

        float4 _HightShadowC;
        float4 _MiddleShadowC;
        float4 _LowShadowC;
///sss
        float4 _SSSColor;
        float4 _SSSColorSub;
        float _SSSWeight;
        float _SSSSize;
        float _SSForwardAtt;
        float _DividLineM;
        float _DividLineD;
        float _DividSharpness;

        ///rim
        float _RimMinRange;
        float _RimMaxRange;
        float _RimPow;
        float4 _RimColor;

        float _Outlinewidth;
        float4 _OutlineColor;

        float3 _LightDirection;

        CBUFFER_END



        struct a2v
        {
            float4 positionOS : POSITION;
            float3 normalOS : NORMAL;
            float4 tangentOS : TANGENT;
            float2 uv : TEXCOORD0;
        };

        struct v2f
        {
            float4 positionCS : SV_POSITION;
            float2 uv : TEXCOORD0;
            float3 positionWS : TEXCOORD1;
            float3 normalWS : TEXCOORD3;
            float3 tangentWS : TEXCOORD4;
        };

        //sigmoid函数
        float sigmoid(float x, float center, float sharp) 
        {
	        float s;
	        s = 1 / (1 + pow(100000, (-3 * sharp * (x - center))));
	        return s;
        }

        float Pow2(float x) 
        {
		    return x * x;
	    }

        float Gaussion(float x, float center, float var) 
        {
		    return pow(2.718, -1 * Pow2(x - center) / var);
	    }

        float warp(float x, float w) 
        {
		    return (x + w) / (1 + w);
	    }

	    float3 warp(float3 x, float3 w) 
        {
		    return (x + w) / (1 + w);
	    }

	    float3 warp(float3 x, float w) 
        {
		    return (x + w.xxx) / (1 + w.xxx);
	    }

        float ndc2Normal(float x) 
        {
		    return x * 0.5 + 0.5;
	    }

        ENDHLSL


        Pass
        {
            Cull Back
            Name "SKIN_MAIN_PASS"
            Tags{"LightMode" = "UniversalForward"}

            HLSLPROGRAM

            #pragma vertex vert 
            #pragma fragment frag

            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS//想让物体接收其他着色器的阴影，需要声明此关键字  Lighting.hlsl
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS_CASCADE
            #pragma multi_compile _ _ADDITIONAL_LIGHTS_VERTEX _ADDITIONAL_LIGHTS
            #pragma multi_compile_fragment _ _ADDITIONAL_LIGHT_SHADOWS
            #pragma multi_compile_fragment _ _SHADOWS_SOFT
            #pragma multi_compile_fog


            #pragma shader_feature_local_fragment USE_SPECULAR
            #pragma shader_feature_local_fragment USE_RIM


            v2f vert(a2v v)
            {
                v2f o;
                VertexPositionInputs positionInputs = GetVertexPositionInputs(v.positionOS.xyz);
                o.positionCS = positionInputs.positionCS;
                o.positionWS = positionInputs.positionWS;

                o.uv = v.uv;

                VertexNormalInputs tbn = GetVertexNormalInputs(v.normalOS,v.tangentOS);
                o.normalWS = tbn.normalWS;
                o.tangentWS = tbn.tangentWS;

                return o;
            }

            float4 frag(v2f i) : SV_TARGET
            {
                float3 worldPos = i.positionWS;
                float3 worldNormal = normalize(i.normalWS);
                float3 worldTangent = normalize(i.tangentWS);

                float4 shadowCoords = TransformWorldToShadowCoord(worldPos.xyz);
                Light light = GetMainLight(shadowCoords);

                float3 viewDir = normalize(_WorldSpaceCameraPos - worldPos);

                float3 lightDirWS = normalize(light.direction);

                float NL = dot(worldNormal,lightDirWS);
                float HNL = NL*0.5+0.5;
                float NV = dot(worldNormal , viewDir);
                float3 HalfViewDir = normalize(viewDir + lightDirWS.xyz);
                float HNV = dot(worldNormal,HalfViewDir);

                //float SSLambert = warp(NL, _SSSWeight);

                float4 MainTexture = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv * _MainTex_ST.xy + _MainTex_ST.zw ) * _Color;
                float3 DiffuseBrush = SAMPLE_TEXTURE2D(_DiffuseBrush,sampler_DiffuseBrush,i.uv * _DiffuseBrush_ST.xy + _DiffuseBrush_ST.zw).xyz;
                float3 SpecBrush = SAMPLE_TEXTURE2D(_SpecularBrush,sampler_SpecularBrush,i.uv * _SpecularBrush_ST.xy + _SpecularBrush_ST.zw).xyz;
                
                //float3 diffuse = max(0,NL);
                //float3 Ramp = SAMPLE_TEXTURE2D(_DeffuseRamp,sampler_DeffuseRamp,float2(1 - clamp(HNL,0.01,0.99), HNL)).g;//float2(横坐标兰伯特采样，纵坐标曲率垂直采样)
                //float Lambert = smoothstep(0, _DeffuseSoftShadow, HNL - _ShadowRange);

                //程序化Ramp、brush

                float sigmoidDiffuse = sigmoid(HNL,_DiffuseRampCenter,_DiffuseRampShap);
                float R_Sig=sigmoid(HNL,clamp(_RDivided*(1+(1-DiffuseBrush.r)*_BrushWeightR),0.01,0.99),_SharpR);
                float G_Sig=sigmoid(HNL,clamp(_GDivided*(1+(1-DiffuseBrush.g)*_BrushWeightG),0.01,0.99),_SharpG);
                float B_Sig=sigmoid(HNL,clamp(_BDivided*(1+(1-DiffuseBrush.b)*_BrushWeightB),0.01,0.99),_SharpB);

                float B2H=1-R_Sig;
                float H2M=1-G_Sig;
                float M2L=1-B_Sig;

                ///

                //多层阴影合并

                float3 combinedColor = MainTexture.xyz;
                float3 targetColor=lerp(combinedColor,lerp( combinedColor,_HightShadowC.xyz,_HightShadowC.a),B2H);
                combinedColor = lerp(combinedColor,targetColor,_Rmix);

                targetColor=lerp(combinedColor,lerp( combinedColor,_MiddleShadowC.xyz,_MiddleShadowC.a),H2M);
                combinedColor = lerp(combinedColor,targetColor,_Gmix);

                targetColor=lerp(combinedColor,lerp( combinedColor,_LowShadowC.xyz,_LowShadowC.a),M2L);
                combinedColor = lerp(combinedColor,targetColor,_Bmix);

                //


                /// Speclar
                float SpecularRamp =pow(max(0,HNV),_SpecGloss);

                float Spec1ts = 1- sigmoid(SpecularRamp,clamp(_SpecRDivided*(1+(1-SpecBrush.r)*_SpecBrushWeightR),0.01,0.99),_SpecSharpR);
                float Spec2ts = 1- sigmoid(SpecularRamp,clamp(_SpecGDivided*(1+(1-SpecBrush.g)*_SpecBrushWeightG),0.01,0.99),_SpecSharpG);
                float Spec3ts = 1- sigmoid(SpecularRamp,clamp(_SpecBDivided*(1+(1-SpecBrush.b)*_SpecBrushWeightB),0.01,0.99),_SpecSharpB);

                float3 SpecCombined = float3(1,1,1);

                float3 SpecTargetColor=lerp(SpecCombined,float3(0,0,0),Spec1ts);
                SpecCombined = lerp(SpecCombined,SpecTargetColor,_SpecRmix);

                SpecTargetColor = lerp(SpecCombined,float3(0,0,0),Spec2ts);
                SpecCombined = lerp(SpecCombined,SpecTargetColor,_SpecGmix);

                SpecTargetColor = lerp(SpecCombined,float3(0,0,0),Spec3ts);
                SpecCombined = lerp(SpecCombined,SpecTargetColor,_SpecBmix);


                ///

                ///SSS
                half _BoundSharp = 9.5 + 0.5;
                float MidSig = sigmoid(NL, _DividLineM, _BoundSharp * _DividSharpness);
			    float DarkSig = sigmoid(NL, _DividLineD, _BoundSharp * _DividSharpness);
                float diffuseLumin2 = (ndc2Normal(_DividLineM) + ndc2Normal(_DividLineD)) / 2;

			    float MidDWin = DarkSig - MidSig;
			    float DarkWin = 1 - DarkSig;

                float MidLWin = sigmoid(NL, _DividLineM, _DividSharpness);
                float SSMidLWin = Gaussion(NL, _DividLineM, _SSForwardAtt * _SSSSize);
                float SSMidDWin = Gaussion(NL, _DividLineM, _SSSSize);
                float SSMidLWin2 = Gaussion(NL, _DividLineM, _SSForwardAtt * _SSSSize*0.01);
                float SSMidDWin2 = Gaussion(NL, _DividLineM, _SSSSize * 0.01);
                float3 SSLumin1 = MidLWin * diffuseLumin2 * _SSForwardAtt * (SSMidLWin + SSMidLWin2);
			    float3 SSLumin2 = ((MidDWin + DarkWin) * diffuseLumin2) * (SSMidDWin+ SSMidDWin2);
			
			    float3 SS = _SSSWeight * (SSLumin1 + SSLumin2) * _SSSColor.rgb;

                ///

                //float3 diffuse = lerp(MainTexture.xyz * _DarkSideIntensity , MainTexture.xyz * _BrightSideIntensity,sigmoidDiffuse);
                ///rim

                float fresnel = pow((1-NV),max(0.01,_RimPow));
                fresnel = smoothstep(min(0.99 , _RimMinRange) , _RimMaxRange , fresnel);
                float3 rimColor = fresnel * _RimColor.xyz;

                //

                float3 FinalColor = combinedColor+ SS ;

                #if USE_RIM

                FinalColor += rimColor;

                #endif

                #if USE_SPECULAR

                    FinalColor += SpecCombined;

                #endif


                return float4(FinalColor,1);


            }

            ENDHLSL
        }

        Pass
        {
            Cull Front
            Name "Outline"
            //Tags{}

            HLSLPROGRAM

            #pragma vertex vertOutline 
            #pragma fragment fragOutline
            


            float4 vertOutline(float4 positionOS : POSITION , float3 normal : NORMAL , float3 tangent : TANGENT) : SV_POSITION
            {
                VertexPositionInputs positionInputs = GetVertexPositionInputs(positionOS.xyz);
                float4 positionCS = positionInputs.positionCS;
                VertexNormalInputs tbn = GetVertexNormalInputs(normal);
                float3 normalWS = tbn.normalWS;
                float3 normalOS = normal;
                float3 normalVS = normalize(mul((float3x3)UNITY_MATRIX_IT_MV, normal));
                float3 ndcNormal= normalize(mul((float3x3)UNITY_MATRIX_P,normalVS).xyz);
                float4 nearUpperRight = mul(unity_CameraInvProjection, float4(1, 1, UNITY_NEAR_CLIP_VALUE, _ProjectionParams.y));//摄像机投影矩阵的逆矩阵和近裁切
                float aspect = abs(nearUpperRight.y / nearUpperRight.x);//计算屏幕的长宽比
                ndcNormal.x *= aspect;
                positionCS.xy += (0.01 * _Outlinewidth  * positionCS.w) * ndcNormal.xy;
                return positionCS;
            }

            float4 fragOutline(a2v i) : COLOR 
            {
                float4 MainTexture = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv * _MainTex_ST.xy + _MainTex_ST.zw ) * _Color;
                //float4 MainTexture = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv);
                float3 OutlineColor = _OutlineColor.xyz * MainTexture.xyz;
                return float4(OutlineColor,1);
            }
            ENDHLSL

            
        }

        //UsePass "Universal Render Pipeline/Lit/ShadowCaster"
        Pass
        {
            Name "ShadowCaster"
            Tags{"LightMode" = "ShadowCaster"}

            ZWrite On
            ZTest LEqual
            ColorMask 0
            Cull[_Cull]

            HLSLPROGRAM


            #pragma exclude_renderers gles gles3 glcore
            #pragma target 4.5

            // -------------------------------------
            // Material Keywords
            #pragma shader_feature_local_fragment _ALPHATEST_ON
            #pragma shader_feature_local_fragment _SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A

            //--------------------------------------
            // GPU Instancing
            #pragma multi_compile_instancing
            #pragma multi_compile _ DOTS_INSTANCING_ON

            #pragma vertex ShadowPassVertex
            #pragma fragment ShadowPassFragment

            #include "Packages/com.unity.render-pipelines.universal/Shaders/LitInput.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/Shaders/ShadowCasterPass.hlsl"
            ENDHLSL
        }
    }
}


````


又有好久没有研究了。下次准备改改管线试着做做PCSS。研究一下URP管线。目前的知识还是不太够，数学
这块是个大坑，希望今年有所突破！！！！


> Ref：
> https://zhuanlan.zhihu.com/p/97892884
> https://zhuanlan.zhihu.com/p/383740561
> https://zhuanlan.zhihu.com/p/356528433