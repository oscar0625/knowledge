# position: sticky
吸顶

# aspect-ratio
纵横比

# content-visibility
控制页面元素渲染的强大 CSS 属性 首屏渲染

# object-fit
指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框。

# clip-path
裁剪

# mix-blend-mode
混合模式

# filter
滤镜效果 

# CSS 滚动捕捉
父元素 scroll-snap-type: x/y
子元素 scroll-snap-align: start/end/center

# pointer-events
禁用一个元素的点击事件

# line-clamp
限定一个块级容器中展示内容的行数

# CSS 变量（自定义属性）
```
  :root {
    --bg-color: red;
  }
  .title {
      background-color: var(--bg-color);
  }

```

# 特征查询
```
  @supports (animation-name: test) {
    
  }
```

# contain 
* contain 属性的主要目的是隔离指定内容的样式、布局和渲染。
* 对于页面上的一些独立的小部件，都推荐使用 contain: strict;，对页面性能很有帮助，目前使用度还比较低，强烈推荐！

# will-change
如果用好的话，也是性能优化的一大利器。
```
  .will-change {
  transition: transform 0.3s;
  }
  .will-change:hover {
  will-change: transform;
  }
  .will-change:active {
  transform: scale(1.5);
  }
```

# CSS 比较函数
max()
min()
clamp()

# CSS Houdini
css polyfill
