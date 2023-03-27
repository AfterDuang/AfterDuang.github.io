---
title: 个人游戏Demo的开发日志 - 0
excerpt_type: md
data: 2021-6-18 17:19
tags:
  - Unity
  - Game
categories:
  - Games
  - Unity

---


### <b>开始</b>
---

最近以为自己的技术积累做了个大概了，然后就开始做起了自己小demo的练习，结果法线还是不够，基础不过关。最开始也没想太多，直接上了Unity2020.3
和HDRP的管线。很多插件包有问题不支持不说，对Unity和SRP也都了解的不深，别提写shader了。

不过既然已经开始了，那也不能停下，自己比较头铁也不想换回URP，就这样慢慢做吧。 "狗头"

---

#### <b>坑</b>

先说一下踩到的坑吧，似乎都是一些版本坑，也没有找到合适的解决办法。

<!-- more -->

##### <b>地形插件World Creator for Unity</b>

![](/images/GameNote/0/WorldCeatorPreview.png)

World Creator本是一个独立的地形软件，当我下载这个地形软件后打开法线这似乎使用Unity做的。那怎么说是不是也在Unity上有个插件吧，结果还真在
Assets Store上找到了，下载下来之后版面改了有点不习惯，而且在2020.3Unity下,似乎在Generate纹理的时候，地形会直接变成超平坦。要重启才能在
第一次成功。

![](/images/GameNote/0/WorldCeatorForUnityUI.png)

但是如果我用默认地形导入进行修改，下一次打开地形数据会丢，在次把原先的地形放入Input Terrain 中会提示这将丢失所有的纹理数据，所以我弄的纹理
就直接全没了。？？？，而且在文件内提供的手册中也没有看到对应的解决方案。

![](/images/GameNote/0/WorldCeatorDoc1.png)


由于又想自己最大程度的控制生成的地形，就去软件上把Splat图导出然后和地形数据中的Splat图替换。最后确实也实现了目标效果，但我又要如何使用WorldCeator
的其他功能呢，最终也没有搞清楚这个问题。

![](/images/GameNote/0/UnityTerrain.png)


##### <b> HDRP Ray Tacing </b>

刚开始是想的在水面上或一些环境光遮蔽中应用一点Ray Tracing让其更细腻一些，结果一打开直接黑了。不过最终问题是因为着色器不兼容。这个应该需要后期改
着色器代码来实现。

##### <b> Map Magic Brush </b>

![](/images/GameNote/0/MapMagicBrushGraph.png)

这个插件是为了解决在地形上种树和种草使用的刷子，因为在预设的刷子中没办法实现一起随机实现的效果，PolyBrush只能在Poly上实现随机而不能使用地形。
但是这个软件的节点系统并不是很懂，并且文档中没太多实例效果教程，内部的预设也没太看懂。所以还在研究这个。

#### <b>结束</b>

一天下来踩了这些，没啥进度。总结了一下还是觉得这样的地形流程并不是我想要的。如果之后要回来修改的话肯定会特别麻烦。回头看看PDG，感觉虽然说过程不是
很方便，但至少我能让地形变成想要的样子，后续还能整合增加更多程序化功能。可能过两天还是会研究并应用这种方法。


![](/images/GameNote/0/miyahouxi.gif)
