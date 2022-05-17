---
title: Unity_SRP自定义渲染管线学习1
data: 2022-2-10 17:19
tags:
  - Unity
  - Game
categories:
  - Games
  - Unity

---


### <b>Unity使用SRP创建自定义渲染管线</b>

最近有想法深入了解一下管线，所以就研究一下Unity的自定义渲染管线，也加深一下自己对
管线的理解。也提升下自己那么一丢丢的开发能力。

<b>此文章包括以下内容：</b>

> - 什么是SRP可编程渲染管线
> - 创建一个简单的自定义渲染管线

<!-- more -->

好了那么开始，先建立一个项目，这里Unity版本为 ````2019.4.18````。然后打开官网
开始看相关资料！！！


<div align=left>
    <img src="/images/SRP1/GoingHelp.jpg" width="100%" height="100%" style="zoom:100%">
</div>

#### <b>什么是可编程渲染管线（SRP）</b>

[官网中](https://docs.unity.cn/cn/2019.4/Manual/scriptable-render-pipeline-introduction.html)这么写到了

此外官网中也给到了一个大概SRP的[工作原理](https://docs.unity.cn/cn/current/Manual/SRPBatcher.html)。

---------

<div align=left>
    <img src="/images/SRP1/Help1.png" width="100%" height="100%" style="zoom:150%">
</div>

也就是说Unity开放了一层API来让用户可以用C#来控制渲染管线。用户只要继承```` Rendering.RenderPipelineAsset ````并重写````Render()````
方法，来控制就行。那么也不多看，稍微知道是什么就行，直接开始做。


#### <b>创建基本的可编程渲染管线主体（SRP）</b>


按照[文档](https://docs.unity.cn/cn/2019.4/Manual/srp-creating-render-pipeline-asset-and-render-pipeline-instance.html)的意思我们要创建以下脚本

> - 一个继承自 RenderPipelineAsset 并覆盖其 CreatePipeline() 方法的脚本。此脚本用于定义渲染管线资源。
> - 一个继承自 RenderPipeline 并覆盖其 Render() 方法的脚本。此脚本用于定义渲染管线实例。
> - 一个从 RenderPipelineAsset 脚本创建的渲染管线资源。此资源充当渲染管线实例的工厂类。

按照官网的说法，咱们照搬两个脚本。

<font size=4 color=#FF0000>ExampleRenderPipelineAsset.cs</font>

````cpp

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

[CreateAssetMenu(menuName = "Rendering/ExampleRenderPipelineAsset")]//这能让我们在Unity Editor 中创建这个资源
public class ExampleRenderPipelineAsset : RenderPipelineAsset
{
    // Unity 在渲染第一帧之前调用此方法。
    // 如果渲染管线资源上的设置改变，Unity 将销毁当前的渲染管线实例，并在渲染下一帧之前再次调用此方法。
    protected override RenderPipeline CreatePipeline()//重写CreatePipline方法 该方法返回RenderPipline类型
    {
        return new ExampleRenderPipelineInstance();//返回渲染管线实例
    }
}



````

<font size=4 color=#FF0000>ExampleRenderPipelineInstance.cs</font>

````cpp

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

public class ExampleRenderPipelineInstance : RenderPipeline//这部应该是创建了管线实例（看上去）
{
    public ExampleRenderPipelineInstance()//构造函数
    {
        
    }

    protected override void Render(ScriptableRenderContext context, Camera[] cameras)//在这里重写这个Render方法
    {
        
    }
    
}



````

这个时候我们就可以在Editor中创建这个资源。把它放到以下位置

<div align=left>
    <img src="/images/SRP1/NewAss.png" width="100%" height="100%" style="zoom:150%">
</div>

然后神奇的事情发生了。咱们的场景和渲染窗口都变黑了，啥也没有。这就说明新的管线起到作用了。


#### <b>创建可配置的可编程渲染管线实例（SRP）</b>

我们现在可以在脚本中为管线增加自定义功能了，同样的两个脚本，我们在````ExampleRenderPipelineAsset.cs````中先对外配置一些数据，如下：

<font size=4 color=#FF0000>ExampleRenderPipelineAsset.cs</font>

````cpp

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

[CreateAssetMenu(menuName = "Rendering/ExampleRenderPipelineAsset")]//这能让我们在Unity Editor 中创建这个资源
public class ExampleRenderPipelineAsset : RenderPipelineAsset
{

    public Color exampleColor;
    public string exampleString;//自定义修改管线 暴露在外的变量
    // Unity 在渲染第一帧之前调用此方法。
    // 如果渲染管线资源上的设置改变，Unity 将销毁当前的渲染管线实例，并在渲染下一帧之前再次调用此方法。
    protected override RenderPipeline CreatePipeline()//重写CreatePipline方法 该方法返回RenderPipline类型
    {
        return new ExampleRenderPipelineInstance(this);//返回渲染管线实例 这边调用了脚本的构造函数
    }
}


````
然后在````ExampleRenderPipelineInstance.cs````中调用并处理它：

<font size=4 color=#FF0000>ExampleRenderPipelineInstance.cs</font>

````cpp

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

public class ExampleRenderPipelineInstance : RenderPipeline//这部应该是创建了管线实例（看上去）
{
    private ExampleRenderPipelineAsset renderPipelineAsset;// 使用此变量来引用传递给构造函数的渲染管线资源 这似乎也是单例好像
    public ExampleRenderPipelineInstance(ExampleRenderPipelineAsset asset)//构造函数 然后就把自己输入进去了 最终似乎把ExampleRenderPipelineAsset类传进来了
    {
        renderPipelineAsset = asset;
    }


    // 对于当前正在渲染的每个 CameraType，Unity 每帧调用一次此方法。
    protected override void Render(ScriptableRenderContext context, Camera[] cameras)//在这里重写这个Render方法
    {
        // 可以在此处编写自定义渲染代码。通过自定义此方法可以自定义 SRP。
        Debug.Log(renderPipelineAsset.exampleString);
    }
    
}


````

可以看到，我们把管线资源的数据给了管线实例，最后在Render()方法中每帧输出。结果如下：

<div align=left>
    <img src="/images/SRP1/DebugPram.png" width="100%" height="100%" style="zoom:150%">
</div>
控制台中成功输出了，资源中设置的内容。

#### <b>设置激活可编程渲染管线的基础功能（SRP）</b>

说到这以及完成了基础上的配置了，大概知道这两个脚本怎么工作之后，就可以开始设置激活管线的渲染过程了！！！

##### <b>绘制一个天空盒</b>

现在我们来绘制一个基础的天空盒！！,首先，我们需要循环所有相机，对每个相机执行一个渲染命令，脚本中override的````Render()````
指令接收了一个摄像机数组，我门需要在其中对每个相机进行操作。


````cpp

foreach (Camera camera in cameras)
    {
            //执行的操作在这里
    }

````

之后为了方便操作，给他扩展一个新类来写入每个摄像机渲染的内容，最后在这里执行。

<font size=4 color=#FF0000>ExampleRenderPipelineInstance.cs</font>

````cpp
CameraRender renderer = new CameraRender();
    // 对于当前正在渲染的每个 CameraType，Unity 每帧调用一次此方法。
protected override void Render(ScriptableRenderContext context, Camera[] cameras)//在这里重写这个Render方法
{
    // 可以在此处编写自定义渲染代码。通过自定义此方法可以自定义 SRP。
    foreach (Camera camera in cameras)
    {
        renderer.Render(context,camera);//循环每个摄像机 执行一次CameraRender.Render()
    }

    }

````

<font size=4 color=#FF0000>CameraRender.cs</font>

````cpp

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
public class CameraRender
{

    ScriptableRenderContext context;
    Camera camera;

    public void Render(ScriptableRenderContext context, Camera camera)
    {
        this.context = context;
        this.camera = camera;
        Setup();
        DrawVsibleGeoMetry();
        Submit();
    }

    void DrawVsibleGeoMetry()//绘制天空盒 这只告诉了Unity是否应该绘制天空盒
    {
        context.DrawSkybox(camera);
    }

    void Submit()//提交工作序列
    {
        context.Submit();
    }

    void Setup()//场景视图设置投影矩阵使场景正确与屏幕对其
    {
        context.SetupCameraProperties(camera);
    }

}

````

这样我们就绘制好了一个能够在屏幕中正确显示的天空盒。

<div align=left>
    <img src="/images/SRP1/DrawSkyBox.png" width="100%" height="100%" style="zoom:150%">
</div>

##### <b>设置命令缓冲区</b>

这个地方补了下延迟渲染的知识

<div align=left>
    <img src="/images/SRP1/SROShaderPass.png" width="100%" height="100%" style="zoom:150%">
</div>

<div align=left>
    <img src="/images/SRP1/SRP_Batcher_loop.png" width="100%" height="100%" style="zoom:150%">
</div>

上图是一个SRP管线的流程图，可以大概的堪出来其实在一帧中所有的渲染命令全部都是存在一个命令缓冲区中再一起发送给GPU的，
所以我自己的理解是，渲染每一帧的时候CPU会把这一帧所需要的命令数据和参数打包在命令缓冲区中，然后一起发送给Shader代码统一处理。

<div align=left>
    <img src="/images/SRP1/CamRender1.png" width="100%" height="100%" style="zoom:150%">
</div>

在上图的Frame Debugger中可以看到 一个Render Camera中包含了这一帧中所有的指令，所有命令都包含在一个Render Camera
的块中，现在我们把设置的命令缓冲关掉看看。

<div align=left>
    <img src="/images/SRP1/CamRender2.png" width="100%" height="100%" style="zoom:150%">
</div>

突然发现他们没有了，他们在这一帧是逐步执行的。而我们设置的命令缓冲区的名字正是 Render Camera。

````cpp

    const string bufferName = "Render Camera";

    CommandBuffer buffer = new CommandBuffer
    {
        name = bufferName
    };

````

好了 现在先设置这个Buffer


````cpp

    void Setup()
    {
        context.SetupCameraProperties(camera);
        buffer.ClearRenderTarget(true,true,Color.clear);//清空渲染目标
        buffer.BeginSample(bufferName);
        ExcuteBuffer();
    }
    void ExcuteBuffer()
    {
        context.ExecuteCommandBuffer(buffer);
        buffer.Clear();
    }

````

首先分析一下这段代码的作用，我们先准备了摄像机的数据，这相当于上面流程图的第一阶段,Setup。
然后第二部我们清理了缓冲区中的所有内容。然后开始进行填充命令， 最后调用命令并清空缓冲区。
那么，这个函数中最终执行的会是BeginSample这个函数，我们为什么要执行它呢？，目前我们
正常看到的是一个Render Camera 框住了其他所有的渲染步骤，但是如果我们把BeginSample这一块移动
到了别的位置

````cpp

public void Render(ScriptableRenderContext context, Camera camera)
    {
        this.context = context;
        this.camera = camera;

        if(!Cull())//为真调用括号里的函数
        {
            return;
        }

        Setup();
        DrawVsibleGeoMetry();
        Submit();
    }

    void DrawVsibleGeoMetry()//绘制几何体
    {
        context.DrawRenderers(cullingResults,ref drawingSettings, ref filteringSettings);
        buffer.BeginSample(bufferName);//向命令缓冲中添加开始采样的命令
        ExcuteBuffer();//调用命令
        context.DrawSkybox(camera);//绘制天空盒 这只告诉了Unity是否应该绘制天空盒
    }

    void Submit()//提交工作序列
    {
        buffer.EndSample(bufferName);//向命令缓冲中添加结束采样的命令
        ExcuteBuffer();//调用命令
        context.Submit();
    }

````

这个时候我们会发现嵌套消失了
<div align=left>
    <img src="/images/SRP1/CamRender3.png" width="100%" height="100%" style="zoom:150%">
</div>
并且屏幕中绘制的是后绘制的RenderCamera中的内容，渲染目标内的东西被覆盖了。
然后大概推出了这命令缓冲区的作用

 - BeginSample和EndSample包裹的内容全部在采样的buffer名字下面一起执行
 - 最终他们包裹的内容会合并进ScriptableRenderContext里面提交到大的工作序列中执行的
 - 他们可以重复的进行嵌套，但是保证嵌套运行的顺序

<font size=4 color=#FF0000>CameraRender.cs</font>

````cpp

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
public class CameraRender
{

    ScriptableRenderContext context;
    Camera camera;

    const string bufferName = "Render Camera";

    CommandBuffer buffer = new CommandBuffer
    {
        name = bufferName
    };

    CullingResults cullingResults;//剔除参数

    static ShaderTagId unlitShaderTagId = new ShaderTagId("SRPDefaultUnlit");//默认画出来使用的Shader
    public void Render(ScriptableRenderContext context, Camera camera)
    {
        this.context = context;
        this.camera = camera;

        if(!Cull())//为真调用括号里的函数
        {
            return;
        }

        Setup();
        DrawVsibleGeoMetry();
        Submit();//工作顺序
    }

    void DrawVsibleGeoMetry()//绘制几何体
    {
        var sortingSettings = new SortingSettings(camera);
        var drawingSettings = new DrawingSettings(unlitShaderTagId, sortingSettings);
        var filteringSettings = new FilteringSettings(RenderQueueRange.all);

        context.DrawRenderers(cullingResults,ref drawingSettings, ref filteringSettings);
        context.DrawSkybox(camera);//绘制天空盒 这只告诉了Unity是否应该绘制天空盒
    }

    void Submit()//提交工作序列
    {
        buffer.EndSample(bufferName);//向命令缓冲中添加结束采样的命令 End结束
        ExcuteBuffer();//调用命令
        context.Submit();
    }

    void ExcuteBuffer()
    {
        context.ExecuteCommandBuffer(buffer);
        buffer.Clear();
    }

    void Setup()
    {
        context.SetupCameraProperties(camera);
        buffer.ClearRenderTarget(true,true,Color.clear);
        buffer.BeginSample(bufferName);//向命令缓冲中添加开始采样的命令 Begin开始
        ExcuteBuffer();//调用命令
    }

    bool Cull()
    {
        if(camera.TryGetCullingParameters(out ScriptableCullingParameters p))
        {
            cullingResults = context.Cull(ref p);
            return true;
        }
        return false;
    }

}

````

##### <b>设置剔除</b>
其实上面的代码部分已经包括了这个部分

````cpp

bool Cull()
    {
        if(camera.TryGetCullingParameters(out ScriptableCullingParameters p))
        {
            cullingResults = context.Cull(ref p);
            return true;
        }
        return false;
    }

````
这个函数最后在主函数中调用就行

##### <b>渲染出没有阴影的几何体</b>

这个部分还是接着上面的代码说明，在````DrawVsibleGeoMetry()````方法中进行了实现

````cpp

void DrawVsibleGeoMetry()//绘制几何体
    {
        var sortingSettings = new SortingSettings(camera);
        var drawingSettings = new DrawingSettings(unlitShaderTagId, sortingSettings);
        var filteringSettings = new FilteringSettings(RenderQueueRange.all);

        context.DrawRenderers(cullingResults,ref drawingSettings, ref filteringSettings);
        context.DrawSkybox(camera);//绘制天空盒 这只告诉了Unity是否应该绘制天空盒
    }

````

我们先来看看其中的变量类型,他们分别对应了API中的如下内容：

> https://docs.unity.cn/cn/2021.2/ScriptReference/Rendering.SortingSettings-ctor.html
> https://docs.unity.cn/cn/2021.2/ScriptReference/Rendering.DrawingSettings-ctor.html
> https://docs.unity.cn/cn/2021.2/ScriptReference/Rendering.FilteringSettings-ctor.html

他们三个都是构造函数，返回值成为了DrawRenderers()的参数，最终执行的是````DrawRenderers()````。
他们分别表示了：
 - 摄像机的透明排序设置。
 - 材质的绘制设置，包含了需要用到哪些材质，介于材质会包含透明度混合，参数需要知道材质ID和透明排序
 - 过滤图层蒙版的结构

 有了这些东西之后我们就能使用DrawRenderers来渲染物体了！

 ##### <b>绘制错误或旧版的着色器</b>

 在编辑器中，我们需要区分材质是否被正确支持，支持的材质需要高亮显示区分，或者是绘制默认着色器。
 我们先来绘制旧版着色器

 ````cpp

static ShaderTagId[] legacySJaderTagIds = 
    {
        new ShaderTagId("Always"),
        new ShaderTagId("ForwardBase"),
        new ShaderTagId("PrepassBase"),
        new ShaderTagId("Vertex"),
        new ShaderTagId("VertexLMRGBM"),
        new ShaderTagId("VertexLM")
    };

 ````

我们先建一个ShaderTagId类型的数组。把这些旧版Shader都包含进来。
然后我们新建一个ErrorMaterial类型变量用来存错误的着色器。

````cpp

static Material errorMaterial;

````
然后我们创建一个新的函数绘制这些几何体

````cpp

    void DrawUnSupportedShaders()//绘制无效或错误的几何体
    {
        if(errorMaterial == null)
        {
            errorMaterial = new Material(Shader.Find("Hidden/InternalErrorShader"));
            
        }//赋值 找到错误的着色器。
        
        var drawingSettings = new DrawingSettings(legacySJaderTagIds[0],new SortingSettings(camera)){overrideMaterial = errorMaterial};//错误的材质显示
        for (int i = 1; i < legacySJaderTagIds.Length; i++)
        {
            drawingSettings.SetShaderPassName(i,legacySJaderTagIds[i]);
        }
        var filteringSettings = FilteringSettings.defaultValue;

        context.DrawRenderers(cullingResults,ref drawingSettings,ref filteringSettings);
    }

````
我们先找到了用来表现错误材质的着色器，最后在DrawingSettings调用使用这个材质。为了绘制旧版的材质，我们循环了这个数组，
用SetShaderPassName,来绘制一个材质的多个通道。这使得我们使用默认管线着色器的对象得以被正确绘制出来，而不是藏起来了。
，但是其实我们在DrawSetting中其实覆盖了这个错误材质，所以不受支持的材质仍然会显示为洋红色。

 ##### <b>Gizmos</b>

 绘制Gizmos是方便我们调试场景很重要的过程，当然这一步我们也需要在管道中完成。首先，我们的Gizmos应该只在Editor下显示。
 为了方便调试，我们新建一个扩展类，partial class。

 我们给CameraRender类前加上扩展类标志。````public partial class CameraRender````然后新建一个一样的扩展类。把````#if UNITY_EDITOR````
 块写进去，最后吧我们只在编辑器中才渲染的部分照写过来。原来的那一部分删掉。

 如下：

 <font size=4 color=#FF0000>CameraRenderEditor.cs</font>

````cpp

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEditor;

partial class CameraRender
{
    partial void DrawGizmos();
    partial void DrawUnSupportedShaders();
    #if UNITY_EDITOR//只在编辑器下显示

    partial void DrawUnSupportedShaders()//绘制无效或错误的几何体
    {
        if(errorMaterial == null)
        {
            errorMaterial = new Material(Shader.Find("Hidden/InternalErrorShader"));
            
        }
        
        var drawingSettings = new DrawingSettings(legacySJaderTagIds[0],new SortingSettings(camera)){overrideMaterial = errorMaterial};//错误的材质显示
        for (int i = 1; i < legacySJaderTagIds.Length; i++)
        {
            drawingSettings.SetShaderPassName(i,legacySJaderTagIds[i]);
        }
        var filteringSettings = FilteringSettings.defaultValue;

        context.DrawRenderers(cullingResults,ref drawingSettings,ref filteringSettings);
    }

    static ShaderTagId[] legacySJaderTagIds = 
    {
        new ShaderTagId("Always"),
        new ShaderTagId("ForwardBase"),
        new ShaderTagId("PrepassBase"),
        new ShaderTagId("Vertex"),
        new ShaderTagId("VertexLMRGBM"),
        new ShaderTagId("VertexLM")
    };
    static Material errorMaterial;

    partial void DrawGizmos()
    {
        if(Handles.ShouldRenderGizmos())
        {
            context.DrawGizmos(camera,GizmoSubset.PreImageEffects);
            context.DrawGizmos(camera,GizmoSubset.PostImageEffects);
        }
    }

    #endif
}


````

在我们的扩展类中，我们把绘制错误shader的步骤放了进来，并且加入了绘制Gizmos的代码; 这些步骤只会在编辑器中执行。
最后当然需要记得在主要的Render方法中调用他们。

````cpp
    public void Render(ScriptableRenderContext context, Camera camera)
    {
        this.context = context;
        this.camera = camera;

        if(!Cull())//为真调用括号里的函数
        {
            return;
        }

        Setup();
        DrawVsibleGeoMetry();
        DrawUnSupportedShaders();
        DrawGizmos();
        Submit();
    }

````

最后我们得到了如下效果

<div align=left>
    <img src="/images/SRP1/DrawGizmos.png" width="100%" height="100%" style="zoom:150%">
</div>


 ##### <b>给场景打光！</b>

 我们都知道，我们平常写Shader时会使用很多全局变量，如````_WorldSpaceLightPos0````等等，但是这些东西其实是从管线中的代码传递过来的。
 我们要想使用这些变量，就需要提前在管线中通过````Shader.PropertyToID()````来定义。
 首先假装为了方便管理，新建一个静态类专门用来放这些信息。

 <font size=4 color=#FF0000>ShaderBindings.cs</font>


 ````cpp

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Rendering;

public static class ShaderBindings
{
    const string kPerCameraShaderVariablesTag = "SetPerCameraShaderVariables";
    public static int  _CameraPos = Shader.PropertyToID("_CameraPos");
    public static int _LightColor = Shader.PropertyToID("_LightColor");
    public static int _LightDir = Shader.PropertyToID("_LightDir");


    public static void SetPerFrameShaderVariables(ScriptableRenderContext context,Camera camera)
    {
        
        camera.TryGetCullingParameters(out ScriptableCullingParameters p);
        CullingResults cullingResults = context.Cull(ref p);
        var lights = cullingResults.visibleLights;
        CommandBuffer cmd = new CommandBuffer{name = kPerCameraShaderVariablesTag};
        Vector4 CameraPosition = new Vector4(camera.transform.localPosition.x,camera.transform.localPosition.y,camera.transform.localPosition.z,1.0f);
        cmd.SetGlobalVector(_CameraPos,camera.transform.localToWorldMatrix * CameraPosition);

        foreach(var light in lights)
        {
            if(light.lightType != LightType.Directional)
            continue;
            Vector4 pos = light.localToWorldMatrix.GetColumn(2);
            Vector4 LightDirection = new Vector4(-pos.x,-pos.y,-pos.z,0);
            Color LightColor = light.finalColor;
            cmd.SetGlobalColor(_LightColor,LightColor);
            cmd.SetGlobalVector(_LightDir,LightDirection);
            break;

        }

        context.ExecuteCommandBuffer(cmd);
        cmd.Clear();
    }
}


 ````

 我们的类中包含有几个静态的变量，储存了各个Shader全局变量的ID,这些数据在我们之后使用````SetGlobalColor()````
 的时候用到了，这个函数会根据这个ID和我们计算出的数据来写入命令缓冲区，最后一起调用。
 函数````SetPerFrameShaderVariables()````计算了摄像机位置，获取了灯光参数，把它们写入了命令缓冲区。
 最后调用缓冲区，然后释放。当这些都做完的时候，最后在Render方法中直接调用就行了。因为这是在单个摄像机中每帧产生
 的数据，所以我们把它放在如下位置。

  <font size=4 color=#FF0000> ExampleRenderPipelineInstance.cs</font>


  ````cpp

    protected override void Render(ScriptableRenderContext context, Camera[] cameras)//在这里重写这个Render方法
    {

        // 可以在此处编写自定义渲染代码。通过自定义此方法可以自定义 SRP。
        Debug.Log(renderPipelineAsset.exampleString);
        foreach (Camera camera in cameras)
        {
            CullingResults cullingResults = Cull(context,camera);
            ShaderBindings.SetPerFrameShaderVariables(context,camera);//调用
            renderer.Render(context,camera);//循环每个摄像机 执行一次CameraRender.Render()
        }



  ````

  此时它就会逐帧的向Shader中提供数据了。但是实际上挂载了这个Shader的材质并不会被渲染，我们需要在CameraRender中把这个Shader
  中设置的通道再画一次才行。
  写过UnityShader的都知道，在Shader代码中会有这样一行代码````Tags {"LightMode" = "ForwardLit"}````这个东西其实就表示这个Shader
  所使用的通道。还记得在CameraRender类中我们设置的````ShaderTagId unlitShaderTagId````这个代码么，它在DrawSetting中被调用了。
  这说明要画出此Shader材质的几何体，就需要在这个材质Shader下Pass下的Tag中设置的Tag。把这个Tag包含进DrawSetting中，渲染器才会
  把它们画出来。故修改如下代码

  <font size=4 color=#FF0000> CameraRender.cs</font>

  ````cpp

    void DrawVsibleGeoMetry()//绘制几何体
    {
        var sortingSettings = new SortingSettings(camera){criteria = SortingCriteria.CommonOpaque};
        var drawingSettings = new DrawingSettings(unlitShaderTagId, sortingSettings);
        var drawingSettingsFW = new DrawingSettings(new ShaderTagId("ForwardLit"), sortingSettings);
        var filteringSettings = new FilteringSettings(RenderQueueRange.opaque);
        
        context.DrawRenderers(cullingResults,ref drawingSettings, ref filteringSettings);
        context.DrawRenderers(cullingResults,ref drawingSettingsFW, ref filteringSettings);


        context.DrawSkybox(camera);//绘制天空盒 这只告诉了Unity是否应该绘制天空盒

        sortingSettings.criteria = SortingCriteria.CommonTransparent;
        drawingSettings.sortingSettings = sortingSettings;
        filteringSettings.renderQueueRange = RenderQueueRange.transparent;

        context.DrawRenderers(cullingResults,ref drawingSettings,ref filteringSettings);
        //透明物体与不透明物体分开绘制
    }

  ````

  我们再画一遍拥有这个通道ShaderPass的材质，切回编辑器，我们看一下。

  <div align=left>
    <img src="/images/SRP1/LightDA.png" width="100%" height="100%" style="zoom:150%">
</div>
我们现在已经画出了带有光照的几何体。并且在帧调试器中可以看到画这个几何体时使用的Pass和它包含的ShaderProperties。
到这里其实就已经完成了一个简单的自定义渲染管线了。

#### <b>结语</b>

通过一段时间的努力，我大概了解了SRP在渲染中到底起到了什么作用，上述内容必然会出现很多理解错误导致不对的地方。尽管
如此。也在逐步的探索中收获了很多。择个良辰吉日，我再回来继续搭建更完善的自定义管线。

<img src="/images/SRP1/ENDING.gif" width="100%" height="100%" style="zoom:200%">

>Ref:
> - https://zhuanlan.zhihu.com/p/35862626
> - https://catlikecoding.com/unity/tutorials/custom-srp/custom-render-pipeline/
> - https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@12.1/manual/index.html
> - https://github.com/phi-lira/CustomSRP
> - https://docs.unity.cn/cn/2021.1/ScriptReference/index.html