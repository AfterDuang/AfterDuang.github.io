---
title: PDG FORM UNITY2
date: 2021-11-10 
tags:
  - Houdini
  - Unity
  - PDG
categories:
  - Games
---

#### <b>Houdini PDG PAGE2</b>

<b>继续[上次](http://yuzuha.space/posts/houdini/pdglinkunity)的过程。</b>

这么久过去了中间也稍微做了些修改和完善。这里把之前的三个生成地形节点直接合并成了一个Terrain节点

![](/images/PDGLinkUnity2/BaseTerrain.png)

并且由于忘记了这个<font color=#AB0007 >地形大小为2的N次幂加一，直接把 ReSample 节点加上去了，导致怎末调都生成不出来</font>

---
<!-- more -->

<b>那么就继续往下</b>
目前的目标是需要这个地形上有材质， 并且能直接Split分块，避免再在Unity中分了。

##### <b>Terrain Texture</b>

首先研究了一番 TerrainLayer到底是什么？

![](/images/PDGLinkUnity2/HeightFiedOutMessage.png)

其实也不难看出这东西在Houdini里本质其实是Volume ，然后Volume分了几层，每层规定了不一样的属性，其实就是Volumed代替了传统图像mask
的这种。如下所示。

![](/images/PDGLinkUnity2/TerrainAtt.png)

它总共有四层，第一层规定了最重要的height 也就是高度属性，直接影响了地面的起伏。 其他分别是土地 岩石和草这几种表面附着物？
，也就是说这几层Vulume规定了在Height基础之上 这些附着物应该附着在哪些地方。grass对应grass Layer(Volume)的区域，其次一一对应。
最后像AE这中合成软件一样 一层层往上覆盖就行。当然有了层（区域）还不够。虽然说这层命名为Grass,但我必须要把草的贴图覆盖到这个区域，
才能说这个区域里有grass。这也是Houdini必须告诉Unity我该在这个区域用哪张贴图（就是Unity Terrain中的Terrain Tex罢了）。

这是后再回头看看Houdini engine的文档中的内容。

![](/images/PDGLinkUnity2/EngineDocData.png)

这个表格告诉了我们Unity需要哪些属性，在Houdini中直接定义好就行了，Unity将会自动关联。

那现在要做的其实就很明白了，我把HeightLayer多搞几个 给美层Layer定义这么些个属性就行了，后续直接在Unity里选路径就OK。

那么先在Wrangle里整一个````@mask = 1;```` 在Prim这个层上把mask都拉满填充。

![](/images/PDGLinkUnity2/SetLayerNode.png)

再通过下面两个节点来调节Mask区域，和把这个mask转变成一个新的Layer(Volume)。

这样一套操作下来，加上之前生成的Layer,其实已经有一大堆了
。
![](/images/PDGLinkUnity2/LayerGreating.png)

最后搞个LayerClean 和blast把其他不要的全清了。

![](/images/PDGLinkUnity2/CleanLayer.png)

此时就获得了只有4TerrainLayer的地形了，同样如上图所示，，每一层Layer都需要指定这一层的所用的贴图，瓷砖大小等等这些属性。
根据Houdini Engine文档中的内容来写。给Base这一层写TitleSize，和一个Str类型的Diffuse属性，就和之前的这张图一样

![](/images/PDGLinkUnity2/TerrainAtt.png)

这几个属性也对应了这几个节点。
![](/images/PDGLinkUnity2/AttCreatNodes.png)

每一层中都会有同样的这些属性，我们可以再在Base层中加上文档中的法线，SPEC贴图这样的属性，最后把这些参数传入最终Top的HDA
上，就可以直接在Unity中实时修改了

![](/images/PDGLinkUnity2/TopHdas1.png)

这边在Houdini的工作也就做完了，TopHda重新放进Unity加载。像一下这样填好参数。

![](/images/PDGLinkUnity2/UnitySetting.png)

这里有个很坑的地方就是这个路径问题，贴图必须放在在与Scenes同层下创建一个Resources文件夹里面，然后像上面一样用相对路径
传进去。挺难用的其实。

最终Cook出来是这样

![](/images/PDGLinkUnity2/SetLayerFCook.png)

其实也可以看下地形的参数面板，可以看到其实就是每个TerrainLayer就是替换了底下的这些贴图参数而已。

##### <b>Terrain Split</b>

这一步其实究极简单，就把Houdini Terrain 自己的Split节点拿过来用就可以了。

![](/images/PDGLinkUnity2/TerrainSplitNodes.png)

然后把Title Count 和Title Number 参数拿出去。分别对应把地形分成几乘几块，和输出哪块。
这里值得一说的是在PDG里的操作，教程中的用一个HDA处理多次产生多个工作项的方法似乎在18.5版本中移除了。
于是用到了这两个节点

![](/images/PDGLinkUnity2/WorkThems.png)

这边是直接把那个Title Count 绑在了这个WedgeCount上，就是地形分了几块，分出多少个工作项。然后是下面这个HDA参数


![](/images/PDGLinkUnity2/SpletHdaPram.png)

由于上一个节点分出了16个工作项，所以HDA会处理16次，ID分别是1-16 也就是pdg_index, 直接吧 ````@pdg_index````填到Title Number
中，这个属性是读取工作项的ID,就可以让每个工作项去处理对应这个地方的分块。最终得到完整的地形。
最后整个waitforall都整进一个分区里合并就行了。 好了 现在把Top导入Unity,进行测试。

![](/images/PDGLinkUnity2/SplitF.png)

可以看到还是完美的切割下来了，总共16块，但是最后切完地形上看近了会出现这黑不溜秋的东西，还需要研究下。


![](/images/PDGLinkUnity2/MDJL.jpg)