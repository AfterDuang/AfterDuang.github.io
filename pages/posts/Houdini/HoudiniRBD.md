---
title: Houdini RBD使用笔记
date: 2024-4-30
tags:
  - Houdini
categories:
  - Houdini
---

> **这部分是关于OneNote中的笔记部分，由于经常进行更改和升级，现在慢慢同步到博客上**<font color=#c00000 style = "font-size: 14px;">此文章更新于2024.04.23</font>

#### RBD与刚体动力学
---

**Houdini动力学的基本**

 - 动力学模拟具有模拟对象，解算器， 力场， 碰撞， 约束 这三个基本的元素
 - Houdini动态模拟单位默认使用千克， 米， 秒 做为基本单位。
 - 跟据模拟的特性，我们可以把多个需要模拟的对象合并进数据流中一同模拟。

**DopNetwork中基本的网格**

![](/images/RBDHoudini/RBDOffNetwork.png)_官方展示的基本网格_

<!-- more -->

#### BulletSolver和RBD Solver
---
根据https://zhuanlan.zhihu.com/p/583610419 中的说法。Bullet Solver是一种更适合大规模群集，破碎的一种解算方式。通过各种的包围盒来包裹集合体，从而达到加速结算的作用。缺点是精度上欠缺，对凹面体的结算不是很好。

![](/images/RBDHoudini/BulletZhihu.png)

反之如果是RBD Solver。 这种解算器更适合小规模 精确刚体的模拟，代价是非常的消耗算力。一般在需要高精度碰撞的场景使用。

> **<font  style = "font-size: 14px;">PS: 如果使用Pack带打包刚体对象，这种方式对RBD Solver不起效果。之能对Bullet Solver起作用</font>**

![](/images/RBDHoudini/AssembleNode.png)

![](/images/RBDHoudini/Packnodes.png)

---

##### RBD Solver

![](/images/RBDHoudini/RBDSolverNodes.png)

RBD Solver的Sop部分非常简单，基本如果不需要建立自定义碰撞体积的话可以直接将几合体导入dop。导入节点如下：

<div style="display: flex; align-items: center;">
  <span style="margin-left: 4px;">●&nbsp; &nbsp;</span>
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdfracturedobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdfracturedobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Fractured Object</span>
</div>

<div style="display: flex; align-items: center;">
  <span style="margin-left: 4px;">●&nbsp; &nbsp;</span>
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Object</span>
</div>

<div style="display: flex; align-items: center;">
  <span style="margin-left: 4px;">●&nbsp; &nbsp;</span>
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdconfigureobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdconfigureobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Configure Object</span>
</div>

<div style="display: flex; align-items: center;">
  <span style="margin-left: 4px;">●&nbsp; &nbsp;</span>
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdpointobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdpointobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Point Object</span>
</div>

四个导入节点分别对应了不同的情况，酌情使用，首先第一个。

<h6>
<div style="display: flex; align-items: center;">
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdfracturedobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdfracturedobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Fractured Object</span>
</div>
</h6>

这个节点允许你将已经破碎的集合体导入进来，当然，为了让解算器知道你的碎块分别是哪些东西，所以需要在sop中根据物体连接性来创建piece*

![](/images/RBDHoudini/RBDFracturedObjectNet.png)

![](/images/RBDHoudini/attFOb.png)

![](/images/RBDHoudini/RBDFracturedObjectNetIn.png)


<h6>
<div style="display: flex; align-items: center;">
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Object</span>
</div>
</h6>


这个是最简单的导入方式，一次导入一个模型，模型将视为一个整体在解算器中模拟。


<h6>
<div style="display: flex; align-items: center;">
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdpointobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdpointobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Point Object</span>
</div>
</h6>

RBD点对象节点，将几何体在点云里每个点上做实例，然后一起模拟

![](/images/RBDHoudini/pointbo1.png)

![](/images/RBDHoudini/pointbo2.png)


<h6>
<div style="display: flex; align-items: center;">
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdconfigureobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdconfigureobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Configure Object</span>
</div>
</h6>


将其他的RBD对象附加到当前数据流。附加模拟对象来加入数据流，不同之处是它似乎能附加其他DopNetwork中的数据。

---

###### 示例

![](/images/RBDHoudini/demo1Model.png)
这个示例是来自于官方的演示部分，官方演示所使用的模型是一个类似杠铃的东西，如上图。

然后需求是这个模型需要在碰撞的过程中跟据冲击力的大小和速度来进行自动的破碎。所以破碎的过程需要在DOP中进行。我们需要如下的节点：

<div style="display: flex; align-items: center;">
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/voronoifractureconfigureobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/voronoifractureconfigureobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">Voronoi Fracture Configure Object</span>
</div>

这个节点的作用是可以附加适当的数据来让模型进行断裂，一般这些数据是求解器给出的，让模型在受到一定程度的碰撞后自动破碎。


![](/images/RBDHoudini/DopNetGeoinput.png)

不过我们看到了在自动破碎之后官方给数据流附加了一个Auto Freeze节点

<div style="display: flex; align-items: center;">
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdautofreeze.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdautofreeze.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Auto Freeze</span>
</div>

这个节点就如同其名字一样，冻结对象。再模拟中其实经常可以发现，本来应该落在地上停住的物体，还在无规则的抖动。这些是因为它虽然停下了，但解算器并不知道，所以还在一直解算这些数据，从而导致物体一直在抖动。为了解决这个问题，这个节点将通过速度和冲击来判断是否应该冻结这个对象，除非此物体再次受到一定程度的冲击。这样很好的节省了性能开销和物体的抖动问题。是一个非常重要的节点。

![](/images/RBDHoudini/RBDDopNetW.png)

这是节点图。 模拟的结果如下：

<video controls width="1228" height="800">
    <source src="/images/RBDHoudini/Dopjg1.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

---


##### RBD Solver

Bullet Solver 是最常见模拟刚体的方法，用在了各种的解算工具中。在简单的几何体中Bullet的模拟实际上是完全不输给RBD的。而且模拟速度有非常大的提升。不管是大小场景都适用。可谓是用途多多好处多多

**Bullet Solver的解算器如下：**

<div style="display: flex; align-items: center;">
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdsolver.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdsolver.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">Rigid Body Solver</span>
</div>

<div style="display: flex; align-items: center;">
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/bulletsolver.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/bulletsolver.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">Bullet Solver</span>
</div>

可以看到依旧有这Rigid Body Solver这个选项，因为大部分的适合其实都是使用的这个节点，这个节点能在Bullet和RBD中自由切换，调试起来比较方便。就不用单独去拉取一个专门的节点了，此外，相比传统的Bullet节点，Rigid Body Solver的输入数量有所不同。分别提供了一个解算前后附加微解算器的输入端。更加灵活

![](/images/RBDHoudini/RigBdSP.png)

就想上文说过的，在Bullet解算中，我们需要在Sop模块当中进行一定程度的预处理，一般如下过程：

![](/images/RBDHoudini/RBDWorkFlow.png)

前面说到过Bullet解算器接受的是Pack过后的几何体，所以导入的时候使用的节点就会有所不同

<div style="display: flex; align-items: center;">
  <svg xmlns="https://www.sidefx.com/docs/houdini/icons/DOP/rbdpackedobject.svg" width="25" height="25">
    <image href="https://www.sidefx.com/docs/houdini/icons/DOP/rbdpackedobject.svg" width="25" height="25" />
</svg>
  <span style="margin-left: 4px;">RBD Packed Object</span>
</div>

这次的导入节点选择了这个，这个节点的作用是把打包几何传入Dop。从上图可以注意到在Sop中还定义了一个约束网格的部分，约束是刚体的模拟中一个必要添加的部分。理论上RBD的模拟也同样可以进行这个过程。但分情况讨论，RBD模拟中是实时根据碰撞的冲击来自动计算了破碎。而bullet解算器在Sop中就处理了破碎。所以模拟时会把所有的几何体都进行碎开。这使得模型会在模拟开始就会碎的七零八落。我们希望的是模型可以根据自身冲击来破碎。这里其实除了用约束网格还需要二次破碎打击点来控制碎块数量。这部分还是有一些复杂。

![](/images/RBDHoudini/RBD2stBreak.png)


图中可以看到这里使用了一个metaball辅助二次破碎的节点让点在收到冲击的部分数量变多，这是首次模拟得到的位置数据。

![](/images/RBDHoudini/Vis2Break.png)

![](/images/RBDHoudini/RBD2breaknode.png)


然后跟上图一样分成了两个部分，一个打包过的几何体，和一个约束网格

![](/images/RBDHoudini/NodesPackRBD.png)

![](/images/RBDHoudini/GlueCons.png)

随后进入Dop模拟，使用了两个packobject, 一个用来导入冲撞用的刚体，一个导入受击几何体 ，和RBD不一样的地方是这里用到了导入约束网格使用的节点，把约束信息合并进入数据流

![](/images/RBDHoudini/PackRBDDopNodes.png)

这边也可以看到，约束网格的合并方式，在dop中我们有非常多的约束类型。每个类型也有自己相应的字段控制。所有的字段都可以在Sop网格中进行定义。

![](/images/RBDHoudini/Consnodes.png)

最终都合并进 Constrain Network节点。

<video controls width="1228" height="800">
    <source src="/images/RBDHoudini/19.mp4" type="video/mp4">
    Your browser does not support the video tag.
</video>

最终可以清楚的看到有一部分因为约束的关系是没有完全破碎的。同理所有的建筑物，大楼等各种刚体。都可以灵活的用这个约束。

---

#### 结束！！

到这里为止就是RBD刚体部分的全部笔记。之后会逐步跟据实际使用的各种情况来更新一些细节啦！！！