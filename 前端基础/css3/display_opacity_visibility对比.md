<h1>
    <center>display: none、visibility: hidden与opacity: 0的对比</center>
</h1>  

# DOM结构
* display:会让元素完全从渲染树中消失，渲染的时候不占据任何空间
* visibility:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见
* opacity:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见

# DOM事件
* display:无法进行 DOM 事件
* visibility:无法进行 DOM 事件
* opacity:可以进行 DOM 事件
# 继承
* display:是非继承属性，通过修改子孙节点属性无法显示
* visibility:是继承属性，子孙节点消失由于继承了hidden，通过设置visible可以让子孙节点显式
* opacity:是非继承属性，通过修改子孙节点属性无法显示
# 性能
* display:修改元素会造成文档回流，性能消耗较大，读屏器不会读取display: none元素内容
* visibility:修改元素只会造成元素的重绘，性能消耗较少，读屏器读取visibility: hidden元素内容
* opacity:修改元素会造成重绘，但是性能会更好（opacity将该元素变成一个复合图层，就是传说中的硬件加速技术）
# transition
* display:transition不支持display
* visibility:transition从理论上来说是支持visibility，但是过渡效果不如平常属性一样，从hidden到visible是无过渡效果的，从visible到hidden变成了一种延迟效果。
* opacity:transition支持opacity

[参考链接](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/100)