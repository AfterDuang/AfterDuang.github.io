---
title: Blender 渲染初探
data: 2021-5-19 18:00
tags:
  - Blender
  - Shader
  - Rendering
categories:
  - Blender
---

最近Blender更新了带有Cycles X的Alpha版本，所以乘此机会了解了一下Blender的用法，
粗略的制作了这张图。

![](/images/BlenderStartTitle.png)

>Blender 是一款开源，跨平台，并且全能的三维动画制作软件，它提供了从概念绘画到建模，
>到最终的渲染合成的全部解决方案，并且拥有非常活跃的社区生态。在未来有非常理想的生长
>空间，这也是有必要去学习的一个很重要的理由。

<b>学习了主要包含：</b>
  - Blender的操作
  - 基本的模型建立
  - 基本的节点使用
  - NPR的通常渲染方法

---
<!-- more -->

![](/images/BlenderStartPreView.png)

#### <b>就说说这张图的制作过程吧</b>
---
首先，值得注意的是Blender的操作在我个人看来非常的反人类，我花了很久的时间，
才慢慢适应过来。
适应过来之后，感觉这个软件功能模块做得非常的分明，在对应的模块做对应的事情。
除去了菜单栏上的那一大堆按钮，整个界面非常整洁，对应的模块干对应的事情。

---

<b>先来说说这个草</b>

![](/images/BlenderStartGrassPreview.png)


由于开始想要尝试的风格比较明确，我直接去B站搜了个[教程](https://www.bilibili.com/video/BV1Sk4y1C7Uy?from=search&seid=1962023099087612406)。

>这个教程直接用了两重映射，一个映射基本噪波，另一个映射条纹的噪波，然后利用
>Ramp节点做草丛渐变，这样造成了一些问题，就是这个ramp不是很方便控制颜色，并
>且每次都会在这个阶段调试很长时间，故改用如下方法。

![](/images/BlenderStartGrassNode.png)

使用噪波置换纹理坐标，并用Ramp控制噪波分界上的过渡，最后Lerp草的两种颜色并
连接到自发光即可，最后得到的效果是这样。

![](/images/BlenderGrassPreview2.png)

由于是自发光着色器，所以草并没有受到光照的影响，这是比较理想的效果。但是我需
要草地接收物体的阴影，所以在此把漫反射节点引入。以此为阴影贴图lerp草体，来
实现阴影效果

![](/images/BlenderStartGrassNode2.png)

但是结果出现了问题

![](/images/BlenderStartGrassPreview3.png)

显然是因为这个漫反射着色器把所有的阴影都拿下来了，我们不需要这部分。思考了些许时间，
最后把法线防线手动定位了一下解决了问题

![](/images/BlenderStartGrassNode3.png)
![](/images/BlenderStartGrassPreview4.png)

最后由于草是基于Blenderd的毛发粒子做的，给场景中加个风场，就能让草随风飘动。
下面是草的节点图。

![](/images/BlenderStartGrassNode4.png)

<b>然后人的话其实没什么可说的，值得一提的是，我往任何模型上贴贴图，都会像蒙
了层豆腐皮一样，很亮</b>

> 最后在节点中强行加了个Gama节点解决问题，可能是线性工作流的问题，但是导入的节
> 点也都改过了，没啥效果。

下面是人物的节点图：
![](/images/BlenderStartCharNode.png)

最后摆好摄像机，设置景深和EEVEE的辉光就可以达到最终效果啦！

![](/images/BlenderStartEndperview.png)

---

#### <b>总结</b>
---
虽然说Blender是个非常全能的软件，但是在使用的过程中还是有很多别扭的情况，例如
相乘节点乘出来是个黑白的，几个颜色滤镜的节点并不像我自己理解的一样工作。在我个人
看来，它的EEVEE渲染器并不具备引擎中那么高的灵活性。但是又一想，对于Blender这款
软件中，它确实有能方便很多，所有的BSDF这些着色器节点可以直接调用使用，而且能同时
支持Cycles无缝切换。这些对于用户来说还是非常舒服的！我也会继续研究和使用它，同时
以上的一些说法可能是我自己对软件不够了解，如果有幸你能看到，欢迎来阔个列啊~

![](/images/BlenderStartEndGif.gif)
> <b>END</b>