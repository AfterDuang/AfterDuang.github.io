---
title: 关于MarkDownd的一点点复杂的用法
email: icesmall@outlook.com
data: 2021-5-14 14:08
updated: 2021-5-14 14:15
tags:
  - MarkDown
categories:
  - MarkDown
aplayer: true

katex: true
---

## <b>MarkDown的用法和参考 ##
>[帮助](https://segmentfault.com/markdown#articleHeader9)
>[帮助2](https://www.runoob.com/markdown/md-tutorial.html)
---
* Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。
* Markdown 语言在 2004 由约翰·格鲁伯（英语：John Gruber）创建。
* Markdown 编写的文档可以导出 HTML 、Word、图像、PDF、Epub 等多种格式的文档。
* Markdown 编写的文档后缀为 .md, .markdown。
<!-- more -->

### <b>数学

---
MarkDown中如果需要渲染数学公式，必须用两个美元符$$包裹住[Tex](http://www.ctex.org/TeX/)或[LaTex](https://www.latex-project.org/)来实现，
提交后，文章会根据需要加载的Mathjax对数学公式进行渲染。但是要单独了解它并使用
又需要花时间去熟悉它们的写法。

>所以我个人使用以下方法：

使用Codecogs将所需要的符号转换成Latex代码

>链接： https://www.codecogs.com/latex/eqneditor.php

例如：先点击右上角的矩阵图标 输入 2,3 创建一个两行三列的矩阵，窗口中结果如下

    \begin{bmatrix}
     &  & \\ 
     &  & 
    \end{bmatrix}
依次把数字间隔填入&间隔中。最后再MarkDown中

    $$
    \begin{bmatrix}
     1& 2 &3 \\ 
     4& 5 &6
    \end{bmatrix}
    $$

结果如下

$$
\begin{bmatrix}
 1& 2 &3 \\ 
 4& 5 & 6
\end{bmatrix}
$$



行间公式$O(f(n))=log_2^{n}$测试

---
### <b>关于Hexo框架使用数学公式渲染的问题
---

<font color=#FF0000 >Hexo框架中似乎普遍存在这中问题，一下是个人的解决方法：</font>
- 先卸载自带的hexo-renderer-marked渲染核心 npm install hexo-renderer-markdown-it-plus --save
- 安装hexo-renderer-markdown-it-plus渲染核心
- 安装markdown-it-katex插件
- 在_config.yml中配置plus核心的内容

<pre>
#KaTex Configuration Section
markdown_it_plus:
  highlight: true
  html: true
  xhtmlOut: true
  breaks: true
  langPrefix:
  linkify: true
  typographer:
  quotes: “”‘’
  pre_class: highlight
  plugins:
    - plugin:
      name: '@neilsustc/markdown-it-katex'
      enable: true
      options:
        strict: false
</pre>
  
  -最后在文章的ForntMatter中设置
  <pre>
  katex: true
  </pre>

