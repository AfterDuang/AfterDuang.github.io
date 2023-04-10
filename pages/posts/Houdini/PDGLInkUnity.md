---
title: PDG FORM UNITY记录
date: 2021-5-26
tags:
  - Houdini
  - Unity
  - PDG
categories:
  - Games
---

### <b>Houdini PDG</b>

>[参考教程](https://www.bilibili.com/video/BV1fb411E7No)
>[图文解析](https://zhuanlan.zhihu.com/p/68868983)

Houdini PDG 是在17.5版本中增加的一个流程管理模块，可以用此工具方便的进行分布
生成。在TOP网格中PDG可以直观的描述这些依赖关系，甚至可以分发到其他计算机同时
执行。能更灵活的自动化生产过程。

>在[这里](https://www.sidefx.com/learn/pipeline-pdg/)可以看到更多的关于PDG的教程资料

<!-- more -->

#### <b>Houdini PDG 应用在游戏生产中</b>
---
在Unite 2019大会上，SideFx已经演示过了PDG在Houdini Engine上的应用。在我的理
解中其实就是把一个大的HDA分成数个小HDA,再进入PDG中进行过程管理，形成一条生产
链，可以方便的在中间修改数据，并生成最后的结果。

在官方的[文档](https://www.sidefx.com/docs/unity/_environment.html)中可以看到，在Unity中使用Houdini ENgine 是要对插件环境进行配置的。
环境路径的设置必须以````HEU_ENVPATH````前缀开头。

示例:
<pre>
HEU_ENVPATH_MYPATH
</pre>

故在Unity中导入HoudiniEngine后在Assets目录下创建unity_houdini.env文件
文件内写入以下路径，并在Engine设置中刷新工作目录。
<pre>
HEU_ENVPATH_JOB = E:/HoudiniManager/PDG_GAMEING_TEST
</pre>

其中 路径内容是我要让PDG工作的目录，Houdini文件中的PDG Network下，也要进行配置

<font color=#B55578 ><b>配置完成之后，就可以打开Houdini,开始制作初步的地形啦</b> </font>

---

直接拿那会跟着教程做的HDA来说，现在已经有了三个制作地形需要使用的基本HDA文件

![](/images/PDGLinkUnity/HDAs.png)

这三个HDA代表了以下三个步骤。
![](/images/PDGLinkUnity/Processor1.png)  
![](/images/PDGLinkUnity/Processor2.png) 
![](/images/PDGLinkUnity/Processor3.png) 

在Houdini中，为了方便使用在unity_houdini.env中设置的环境变量，按<kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd>
打开环境变量设置，在Variables中,TextPort 分别写入HEU_ENVPATH_JOB、E:/HoudiniManager/PDG_GAMEING_TEST
这样我们就可以方便的直接引用此变量。

之后我们先创建TOP网格和一个空对象，将他们一起<kbd>Shift</kbd>+<kbd>C</kbd>一下。
并右键创建资源(HDA)。

![](/images/PDGLinkUnity/TOPSet.png) 
![](/images/PDGLinkUnity/HDASet.png)

在TOP网格中的 localscheduler默认的Working Directory 中填入之前设置好的````HEU_ENVPATH_JOB````
之后创建HDA Proccessor 节点并导入好之前的三个HDA，并按处理顺序连接好。这就是
一个基本的处理HDA流程的TOP网格。

<font color=#B55578 >设置如下</font>

![](/images/PDGLinkUnity/TOPNet.png)

<font color=#FF0000 >注意设置每个HDA的输入输出````$PDG_DIR````是当前PDG工作目录,也就是````$HEU_ENVPATH_JOB```` </font>

回到Object层级 右键Save Node Type保存(可以把HDA Proccessor中的参数绑到这个TOP的HDA上)
可以实时的在Unity中调整参数重新烘焙结果，这里之前为了方便没这么做。

<b>回到Unity</b>
拖入刚刚在houdini中用TOP网格创建的HDA，再拖进场景。选中对象，点击菜单栏上的HoudiniEngine→PDG→Great PDG Link
可以发现，PDG模块中识别到了这个资源中的TOP网格和网格中的节点，在TOP Node中选择
最后一项ERODE,勾上AutoLoad Results(最后读取Output是这个结果，全勾上就会显示三个)
开始CookNode。烘焙完成后Unity层级中将新建出来一个OUTPUTS的对象，显示结果如下。

![](/images/PDGLinkUnity/Preview1.png)


> <b>另外值得一提的是</b> 在设置地形的时候，大小必须是2的n次幂加一，不然会出现地形无法读取的情况

![](/images/PDGLinkUnity/TerrainSize.png)

> <font color=#B55578 >另外在这边补充一个教程[页面](https://www.sidefx.com/learn/collections/pdg-for-indie-gamedev/)</font>