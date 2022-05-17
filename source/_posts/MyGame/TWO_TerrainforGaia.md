---
title: 个人游戏Demo的开发日志 - 2 "关于Untiy_Gaia的地形创建"
data: 2021-6-18 17:19
tags:
  - Unity
  - Game
categories:
  - Games
  - Unity

---



前段时间状态不好加上很忙，这两天抽空搜集了一些资料。发现有人提到了Gaia这个地形插件，便下载下来体验了一下。
研究了一番出了下面的这个效果。

<img src="/images/GameNote/1GaiaForUnity/Preview.png" width="100%" height="100%" style="zoom:150%">

<!-- more -->

可以发现这张图的效果还是不错的，其实熟悉软件之后全流程大概两小时就差不多了。而且插件内置的默认资产也足够在很短
的时间内生成一个效果全面地形。但是它是随机的。

<b>此工具拥有以下优缺点</b>

>优点
>  - 能够进行快速的层级和资产配置
>  - 能用一个风格同时适配多套不一样的地形
>  - 能通过Slamp图来生成地形。（可以使用WorldCreator生成之后导出EXR）
>  - 把植被的生成模块化了，可以单独的配置和加入新的摆件，每个摆件可以选择覆盖范围和密度等
>  - 最终配置完成后你依然可以通过刷子来刷自己想要的物体或贴图在地形上


>缺点
>  - 调试并不直观，没有办法直观方便的调整各个Texture的范围，这可能也是模块化的一个弊端
>  - 和HDRP的支持不是很好


### <b>Gaia地形的创建过程</b>

---

首先创建一个HDRP的实例项目，并导入Gaia Pro的插件。从窗口→Procedural World→Gaia 下打开 GaiaManager。
这里首先会提示说是要加载一些配置。由于使用了HDRP所以在Manager窗口中把Gaia升级到HDRP配置，再安装Shader。
中途会让用户选择保留正在使用的HDRP资产，或切换到Gaia提供的。

<img src="/images/GameNote/1GaiaForUnity/GaiaSetting1.png" width="100%" height="100%" style="zoom:150%">

最后变成这个样子就可以了。

#### <b>开始创建地形</b>

点到GaiaManager下的Create World。下面包含了Gaia的一些基本设置。前两项是地形的大小和分辨率的选项。
在 Target Platform下可以看到这么一个窗口

<img src="/images/GameNote/1GaiaForUnity/GaiaSetting2.png" width="100%" height="100%" style="zoom:150%">

大概就是用来调整各个层级的叠加模式和状态的。最后一栏是歌WorkFlower选项，这里可以让你选择是全自动生成，还是依据Stamper来
生成地形。这里选择Stamper来生成。 点击Create Terrain。

<img src="/images/GameNote/1GaiaForUnity/GreatTerrain.png" width="100%" height="100%" style="zoom:150%">

可以看到 场景中生成了地形，层级窗口也多了一大堆东西。此时点到Gaia Tools下Stamper,这里右边是可以设置用于地形置换的图层的。
此时随便选一个，点击Stamp

<img src="/images/GameNote/1GaiaForUnity/GreatTerrain2.png" width="100%" height="100%" style="zoom:150%">

此时便把Stamp应用到了地形上,纹理材质也应用了上去。这个地方官方演示还可以做地形混合，把类型设置混合高度，选择另外一张Stamp
图。

<img src="/images/GameNote/1GaiaForUnity/GreatTerrainBlend.png" width="100%" height="100%" style="zoom:150%">

继续点击Stamper，就会变成下面这样子。

<img src="/images/GameNote/1GaiaForUnity/GreatTerrainBlend2.png" width="100%" height="100%" style="zoom:150%">

这样地形的大体就创建好了。先看层级窗口，之前创建地形时这边多了个叫Gaia Tools 的游戏对象，完全展开后可以看见一大堆东西。
其中Session Manager 中记录了目前你的历史操作，在Operations中你可以随时取消删除之前使用过的操作，这也是模块化的一个优点。
然后再Alpine Meadow Biome下面有一大堆对象，这就是地形表面的植被等数据了，每个模块上对应了一个种类，我们只需要在对应的地方设置
自己的资产点击Spawn World就可以应用上去了，当然如果你觉得不够，也可以在Gaia Manager→Advanced下自己添加。先来看树这一栏。

<img src="/images/GameNote/1GaiaForUnity/SpawnTreeSetting.png" width="100%" height="100%" style="zoom:150%">

可以从面板就看出个大概了，最上面的几个参数待变了一些全局的参数，如范围密度等，而下面的Spawn Rules规定了有那些资源需要使用，以及
这些资源具体的分布范围，在Mask Setting 中我们还可以设置应用于这个单独资产分布的噪波等局部控制方法。(在替换资源的时候会遇到一个
提示，提示我们需要在Advanced→Resrouce Managerment下点击Remove Resources，这是由于切换了资产影响了Session Manager下的顺序引起的
需要删除重新分布)。了解完成后点击Spawn World。

<img src="/images/GameNote/1GaiaForUnity/SpawnTree.png" width="100%" height="100%" style="zoom:150%">

这是侯场景中就被种上了树，树的分布此时全是默认的Gaia数据，接着把所有东西都种了。（值得一提的是HDRP默认不支持Detail Shader,所以
先忽略掉这个）

<img src="/images/GameNote/1GaiaForUnity/SpwanAll.png" width="100%" height="100%" style="zoom:150%">

一顿操作之后，场景变成了这个样子，该有的细节都有了，现在在Gaia上就差最后一步。
打开Gaia Manager,在Great Runtime下选择自己现在想要的天气和水体Shader等，点击Updata Runtime。

<img src="/images/GameNote/1GaiaForUnity/Runtime.png" width="100%" height="100%" style="zoom:150%">

之后我们再把现有的资产预设放进对应的位置中,重新Spwan World,就达成了最终效果

<img src="/images/GameNote/1GaiaForUnity/Preview.png" width="100%" height="100%" style="zoom:150%">


#### <b>总结</b>

Gaia是一个非常合适的插件，虽然现在仍然欠缺一些功能（需要配合其他他加的插件补齐 称为Gaia 全家桶）。有了这些就可以更方便的制作动态加载，
地形切割，和道路的一些功能。

<b>大概有以下这些</b>

>  - Gaia：$77，全家桶的主体中心，用于制作Terrain类型的地形地貌，据说未来可以免费更新到Gaia 2
>  - CTS 2019 - Complete Terrain Shader：$57，新版CTS，支持2018.3+以及2019，这是使用Gaia必不可少的一个辅助插件
>  - Path Painter：$47，用于在Terrain地形上制作“路”，用途比较单一
>  - GeNa 2 - Terrain & Scene Spawner：$57，用于在Terrain地形（尤其是Gaia地形）上生成（spawn）各种游戏对象，类似细节物体笔刷，但功能要强大很多，这也是使用Gaia必不可少的辅助插件，Gaia自带的Spawn系统主要用于在整个地形上根据所设定的条件来“散布”游戏对象（比如房子、石头之类），而GeNa则主要用于在特定位置“刷出”所需要的游戏对象
>  - Ambient Skies - Skies, Post FX, Lighting：$47，用于给场景添加天空、后期效果、灯光效果等等，很方便，效果也很不错，Gaia中集成了一个简化版的Ambient Skies Sample，可调整性比完整版要少很多，不过也够用就是了
>  - SECTR COMPLETE 2019：$97，用于将超大场景切割成多个部分（sector），然后就可以根据需要动态加载/卸载所需要的部分而非完整大场景，这样一来，游戏的运行效率（以及帧率）就会高很多
>  - Pegasus：$47，用于制作路径动画，可以让摄影机或游戏角色沿着所制作的路径运动，从而获得场景漫游摄影机（Fly Through Camera）以及简单的游戏过场动画，这个插件的功能比较类似于Unity自带的Timeline系统，但功能相对单一，优势在于使用非常简单
>  - Real Ivy 2 - Procedural Ivy Generator：$47，用于程序化生成蔓藤，效果还蛮好的，就是确实有点贵

<b>常用配合插件</b>

>  - Enviro - Sky and Weather：$50，用于制作可以随时间变化的动态天空以及天气效果，可以用它来取代Ambient Skies
>  - AQUAS 2020：$45，用于制作水体（江河湖海），Gaia自带的水体效果是“Ambient Water Samples”，效果比Unity Standard Assets中提供的几个水体要好，但远远不及AQUAS 2020

---

地形应该目前已经决定是这个了，之后一段时间应该是会写些基本的代码练练手了，目前还是写太少了QAQ。希望能有时间哈哈哈哈！

<img src="/images/GameNote/1GaiaForUnity/END.gif" width="100%" height="100%" style="zoom:150%">

>Ref:
  - https://zhuanlan.zhihu.com/p/99943791
  - https://www.procedural-worlds.com/