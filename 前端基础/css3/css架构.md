https://juejin.cn/post/7021461539236347940

# OOCSS
* OOCSS (Object-Oriented CSS 翻译为 面向对象 CSS) 是组织 CSS 的领先的模块化或基于组件的系统。
## 分离结构（structure）和皮肤（skin）
* 在基础对象中保留结构和位置，并在扩展类中保留视觉特征。
```
    结构
        Height Width Margin Padding Overflow Position
    皮肤   
        Colors Fonts Shadows Gradients BackgroundColos 
```
## 分离容器（container）和内容（content）
* 不要在 CSS 中模仿 HTML 的结构。换句话说，不要在样式表中引用标签或 ID, 否则改变了 HTML 的结构就会导致我们写的 CSS 无效


# BEM
* 简写 block, element, modifier，分为为 块层、元素层、修饰符层。
```
    less
        .block {
            &-element {
                &--modifier {}
            }
            &-btn {
                &--active {}
            }
        }

``` 

# SMACSS
* Scalable and Modular Architecture for CSS，名字的意思很明确就是要编写模块化、结构化和可扩展的 CSS
```
    SMACSS 的核心是分类，具体把项目的样式分为了五类：
        Base（基础） Normalize.css 等

        Layout（布局）布局（Layout）规则就是将页面拆分成几个部分，每个部分都可能有一到多个模块。一般布局类名都是 .l- 开头。

        Module（模块）Module 从工程化的角度等于 component

        State（状态）动态交互的类名，一般使用 .is- 来开头，例如：.is-active .is-collapsed、

        Theme（主题）整个网站上重复的元素，比如颜色、形状、边框、阴影等规则基本都在 Theme 的管辖下，换句话说 Theme 是定义公共类名的地方。
```

# ITCSS
在SMACSS基础上进一步分层

# ACSS
* 原子化 CSS (Atomic CSS) 你还可以称它为函数式 CSS，或者 CSS 实用工具。
```
    市面上有不少成熟的 CSS 框架，如 Tailwind CSS，Windi CSS 以及 Tachyons 等。

    同时有些 UI 库也会附带一些 CSS 工具类作为框架的补充，如 Bootstrap 和 Chakra UI。

    甚至还有一些人根据项目总结出来自己的 ACSS，例如 atom.css、SACSS: Static Atomic CSS 等。
```