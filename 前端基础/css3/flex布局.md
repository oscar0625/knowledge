# 基本概念
![参考图片](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d04b11ae24ef433db22f64fb8a69f274~tplv-k3u1fbpfcp-watermark.image?imageslim)  
* 在 flex 容器中默认存在两条轴，水平主轴(main axis) 和垂直的交叉轴(cross axis)。  
* 在容器中的每个单元块被称之为 flex item，每个项目占据的主轴空间为 (main size), 占据的交叉轴的空间为 (cross size)。

# Flex 容器
0. 定义
```
    .container {
        display: flex | inline-flex;
    }
```
1. flex-direction: 决定主轴的方向(即项目的排列方向)
```
    .container {
        flex-direction: row | row-reverse | column | column-reverse;
    }
```
2. flex-wrap: 决定容器内项目是否可换行
```
    .container {
        flex-wrap: nowrap | wrap | wrap-reverse;
    }
```
3. flex-flow: flex-direction 和 flex-wrap 的简写形式
```
    .container {
        flex-flow: <flex-direction> || <flex-wrap>;
    }
```
4. justify-content：定义了项目在主轴的对齐方式。
```
    .container {
        justify-content: flex-start | flex-end | center | space-between | space-around;
    }
```
5. align-items: 定义了项目在交叉轴上的对齐方式
```
    .container {
        align-items: flex-start | flex-end | center | baseline | stretch;
    }
```
6. align-content: 定义了在项目多行时，各行在交叉轴方向上的对齐方式，如果项目只有一行，那么该属性将不起作用  
* 既方向和align-items一致，属性和justify-content大概一致（多一个stretch），想用必须有换行
```
    .container {
        align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    }
```

# Flex 项目
1. order: 定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0
```
    .item {
        order: <integer>;
    }
```
2. align-self: 允许单个项目有与其他项目不一样的对齐方式  
* 单个项目覆盖 align-items 定义的属性
```
    .item {
        align-self: auto | flex-start | flex-end | center | baseline | stretch;
    }
```
3. flex-basis: 定义了在分配剩余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有剩余空间
* 默认值auto，即项目本来的大小，这时候 item 的宽高取决于 width 或 height 的值。
* 当设置了flex-basis的值，当主轴为水平方向的时候，项目的宽度设置值会失效，反之是高度。
* flex-basis所占据的尺寸不会纳入剩余空间。
* 跟flex-grow 和 flex-shrink 配合使用才能发挥效果。
```
    .item {
        flex-basis: <length> | auto;
    }
```
4. flex-grow: 定义项目的放大比例
* 默认值为 0，即如果存在剩余空间，也不放大
* 当所有的项目都以 flex-basis 的值进行排列后，仍有剩余空间，那么这时候 flex-grow 就会发挥作用了，将剩余空间按照值的比例进行分配
* 当然如果当所有项目以 flex-basis 的值排列完后发现空间不够了，且 flex-wrap：nowrap 时，此时 flex-grow 则不起作用了。
```
    .item {
        flex-grow: <number>;
    }
```
5. flex-shrink: 定义了项目的缩小比例
* 默认值: 1，即如果空间不足，该项目将缩小，负值对该属性无效。
* 如果所有项目的 flex-shrink 属性都为 1，当空间不足时，都将等比例缩小。
* 如果一个项目的 flex-shrink 属性为 0，其他项目都为 1，则空间不足时，前者不缩小。
```
    .item {
        flex-shrink: <number>;
    }
```  
6. flex: flex-grow, flex-shrink 和 flex-basis的简写 
* 默认(0 1 auto)  建议优先使用这个属性，而不是单独写三个分离的属性。
* 快捷值：auto (1 1 auto) 和 none (0 0 auto)
* flex: 1; 等同(1 1 0%)
* flex: 0; 等同(0 1 0%)
* 在同一时间，flex-shrink 和 flex-grow 只有一个能起作用，这其中的道理细想起来也很浅显：空间足够时，flex-grow 就有发挥的余地，而空间不足时，flex-shrink 就能起作用。当然，flex-wrap 的值为 wrap | wrap-reverse 时，表明可以换行，既然可以换行，一般情况下空间就总是足够的，flex-shrink 当然就不会起作用
```
    .item{
        flex: auto | none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
    } 
```

# 其他
1. 让CSS flex布局最后一行列表左对齐的N种方法  
[教程链接](https://www.zhangxinxu.com/wordpress/2019/08/css-flex-last-align/)  
2. 兼容  
flex布局不能兼容ie9及以下的版本 如考虑ie9及一下不可用
```
    <style>
        div{
            display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
            display: -moz-box; /* 老版本语法: Firefox  */
            display: -ms-flexbox; /* 混合版本语法: IE 10 */
            display: -webkit-flex; /* 新版本语法: Chrome 21+ */
            display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */

            /*-webkit-box-pack: center;*/
            /*-moz-box-pack: center;*/
            /*-ms-flex-pack: center;*/
            /*-webkit-justify-content: center;*/
            /*justify-content: center;*/

            /*-webkit-box-pack: justify;*/
            /*-moz-box-pack: justify;*/
            /*-ms-flex-pack: justify; !* WP IE 10 *!*/
            /*-webkit-justify-content: space-between;*/
            /*justify-content: space-between;*/

            /*********注：旧版盒子中  无space-around这种分布  可使用space-between 两边加margin代替********/
            -webkit-justify-content: space-around;
            justify-content: space-around;

            -webkit-box-align: center;
            -moz-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;

            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -moz-box-orient: vertical;
            -moz-box-direction: normal;
            -ms-flex-direction: column;
            -webkit-flex-direction: column;
            flex-direction: column;

            -webkit-box-ordinal-group: 1;
            -moz-box-ordinal-group: 1;
            -ms-flex-order:1;
            order: 1;

            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
            -webkit-flex-grow: 1;
            flex-grow: 1;

            /*********旧盒子不支持部分********/
            -ms-flex-wrap :wrap;
            flex-wrap:wrap;

            -webkit-align-content:center ;
            align-content:center;

            -webkit-align-self: center;
            align-self: center;
        }
    </style>
```