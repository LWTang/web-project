<h1>CSS-NOTES</h1>

> 目录

* CSS基础
  * <a href="#pseudo-class">伪类</a>
  * <a href="#pseudo-element">伪元素</a>
  * <a href="#combinators">组合器和选择器组</a>
  * <a href="#value-unit">值和单位</a>
    * <a href="#value">数值</a>
    * <a href="#percentage">百分比</a>
    * <a href="#color">颜色</a>
  * <a href="#cascade">层叠</a>
    * <a href="#priority">优先级计算</a>
  * <a href="#inherit">继承</a>
  * <a href="#box">框操作</a>
    * <a href="#overflow">内容溢出</a>
    * <a href="#box-type">框类型</a>
* 文字样式
  * <a href="#font">字体</a>
    * <a href="#font-stack">字体栈</a>
    * <a href="#font-size">字体大小</a>
    * <a href="#font-style">字体样式</a>
    * <a href="#text-shadow">文字阴影</a>
  * <a href="#text-layout">文本布局</a>
  * <a href="#list-style-type">列表样式</a>
  * <a href="#list-count">列表计数</a>
  * <a href="#link">链接</a>

> 正文

<h2 id="pseudo-class">伪类</h2>

* 伪类(pseudo-class):以一个冒号(:)作为前缀，添加到选择器末尾的关键字。
```html
<a href="https://developer.mozilla.org/" target="_blank">Mozilla Developer Network</a>
```

```css
/* 这些样式将在任何情况下应用于我们
的链接 */
a {
  color: blue;
  font-weight: bold;
}

/* 我们想让被访问过的链接和未被访问
的链接看起来一样 */
a:visited {
  color: blue;
}

/* 当光标悬停于链接，键盘激活或锁定
链接时，我们让链接呈现高亮 */
a:hover,
a:active,
a:focus {
  color: darkred;
  text-decoration: none;
}
```

<hr>

<h2 id="pseudo-element">伪元素</h2>

* 伪元素(pseudo-element):前缀是两个冒号(::)，添加到选择器后面的关键字。

```html
<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Glossary/CSS">CSS</a> defined in the MDN glossary.</li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML">HTML</a> defined in the MDN glossary.</li>
</ul>
```

```css
/* 所有含有"href"属性并且值以"http"开始的元素，
将会在其内容后增加一个箭头（去表明它是外部链接）
*/

[href^=http]::after {
  content: '⤴';
}
```

<hr>

<h2 id="combinators">组合器和选择器组</h2>

* 疑问：A+B 和 A~B 有什么区别？
  * A+B:A和B是兄弟结点，且B紧接着A
  * A~B:A和B是兄弟结点，B只要在A后面就行
<table>
  <thead>
    <tr>
      <th scope="col">Combinators</th>
      <th scope="col">Select</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>A,B</td>
      <td>匹配满足A（和/或）B的任意元素</td>
    </tr>
    <tr>
      <td>A B</td>
      <td>匹配任意元素，满足条件：B是A的后代结点（B是A的子节点，或者A的子节点的子节点）</td>
    </tr>
    <tr>
      <td>A + B</td>
      <td>匹配任意元素B，满足条件：B是A的下一个兄弟节点（AB有相同的父结点，并且B紧跟在A的后面）</td>
    </tr>
    <tr>
      <td>A > B</td>
      <td>匹配任意元素，满足条件：B是A的直接子节点</td>
    </tr>
    <tr>
      <td>A ~ B</td>
      <td>匹配任意元素，满足条件：B是A之后的兄弟节点中的任意一个（AB有相同的父节点，B在A之后，但不一定是紧挨着A）</td>
    </tr>
  </tbody>
</table>

```html
<table lang="en-US" class="with-currency">
  <thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Qty.</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th colspan="2" scope="row">Total:</th>
      <td>148.55</td>
    </tr>
  </tfoot>
  <tbody>
    <tr>
      <td>Lawnchair</td>
      <td>1</td>
      <td>137.00</td>
    </tr>
    <tr>
      <td>Marshmallow rice bar</td>
      <td>2</td>
      <td>1.10</td>
    </tr>
    <tr>
      <td>Book</td>
      <td>1</td>
      <td>10.45</td>
    </tr>
  </tbody>
</table>
```

```css
table {
  font: 1em sans-serif;
  border-collapse: collapse;
  border-spacing: 0;
}

/* 所有在table里的td以及th，这里的逗号不是一个组合器，
它只是允许你把几个选择器对应到相同的CSS规则上.*/
table td, table th {
  border : 1px solid black;
  padding: 0.5em 0.5em 0.4em;
}

/* 所有table里的thead里的所有th */
table thead th {
  color: white;
  background: black;
}

/* 所有table里的tbody里的所有td（第一个除外），每个td都是由它上边的td选择 */
table tbody td + td {
  text-align: center;
}

/*table里所有的tbody里的td当中的最后一个 */
table tbody td:last-child {
  text-align: right
}

/* 所有table里的tfoot里的th */
table tfoot th {
  text-align: right;
  border-top-width: 5px;
  border-left: none;
  border-bottom: none;
}

/* 在table当中，所有的th之后的td */
table th + td {
  text-align: right;
  border-top-width: 5px;
  color: white;
  background: black;
}

/* 定位在“with-currency”类中拥有属性lang并且这个属性值为en-US的元素中的，最后td(:last-child)节点的前面（::before）*/
.with-currency[lang="en-US"] td:last-child::before {
  content: '$';
}

/* 定位在“with-currency”类中拥有属性lang并且这个属性值为fr的元素中的，最后td(:last-child)节点的后面（::after） */
.with-currency[lang="fr"] td:last-child::after {
  content: ' €';
}
```

* 应用同一规则的选择器组

```html
h1, h2, h3, h4, h5, h6 {
  font-family: helvetica, 'sans serif';
}
```

<hr>

<h2 id="value-unit">值和单位</h2>
<table>
<!--   <colgroup>
    <col style="width: 35px;">
    <col style="background-color: gray;color: white;">
  </colgroup> -->
  <tr>
    <th scope="row">数值</th>
    <td>长度值，用于指定例如元素宽度、边框（border）宽度或字体大小；以及无单位整数，用于指定例如相对线宽或运行动画的次数。</td>
  </tr>
  <tr>
    <th scope="row">百分比</th>
    <td>可以用于指定尺寸或长度，例如取决于父容器的长度或高度，或默认的字体大小。</td>
  </tr>
  <tr>
    <th scope="row">颜色</th>
    <td>用于指定背景颜色，字体颜色等。</td>
  </tr>
  <tr>
    <th scope="row">坐标位置</th>
    <td>例如，以屏幕的左上角为坐标原点定位元素的位置。</td>
  </tr>
  <tr>
    <th scope="row">函数</th>
    <td>例如，用于指定背景图片或背景图片渐变。</td>
  </tr>
</table>

<h3 id="value">数值</h3>

```html
<p>This is a paragraph.</p>
<p>This is a paragraph.</p>
<p>This is a paragraph.</p>
```

```css
p {
  margin: 5px;
  padding: 10px;
  border: 2px solid black;
  background-color: cyan;
}

p:nth-child(1) {
  width: 150px;
  font-size: 18px;
}

p:nth-child(2) {
  width: 250px;
  font-size: 24px;
}

p:nth-child(3) {
  width: 350px;
  font-size: 30px;
}
```
* 绝对单位
  * 像素 (px) 是一种绝对单位（absolute units），因为无论其他相关的设置怎么变化，像素指定的值是不会变化的。
  * 绝对单位还有 mm, cm, in: 毫米（Millimeters），厘米（centimeters），英寸（inches）

* 相对单位（ 是相对于当前元素的字号(font-size)或者视口(viewport)尺寸 ）
  * em:1em与当前元素的字体大小相同。对一个元素来说1em的计算值默认为16像素。em单位会继承父元素的字体大小，所以如果在父元素上设置了不同的字体大小，em的像素值就会变化，em是Web开发中最常用的相对单位。
  * rem:总是等于默认基础字体大小的尺寸，继承的字体大小将不起作用。

* 无单位的值
```html
margin: 0;
```
* 动画的数值
```html
<p>Hello</p>
```

```css
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

p {
  color: red;
  width: 100px;
  font-size: 40px;
  transform-origin: center;
}

p:hover {
  animation-name: rotate;
  animation-duration: 0.6s;
  animation-timing-function: linear;
  animation-iteration-count: 5;
}
```

<h3 id="percentage">百分比</h3>

```html
<div>
  <div class="boxes">Fixed width layout with pixels</div>
  <div class="boxes">Liquid layout with percentages</div>
</div>
```

```css
div .boxes {
  margin: 10px;
  font-size: 200%;
  color: white;
  height: 150px;
  border: 2px solid black;
}

.boxes:nth-child(1) {
  background-color: red;
  width: 650px;
}

.boxes:nth-child(2) {
  background-color: blue;
  width: 75%;
}
```

<h3 id="color">颜色</h3>

* RGB：3通道，3种表示方法：关键字(red、blue...); #ffeedd(256*256*256); rgb(0,0,255)
* HSL：3个不同的值：色相、饱和度和明度值
* RGBA 和 HSLA：RGBA和HSLA 不仅可以设置想要显示的颜色,还有此颜色的透明度（ transparency ）,0是完全透明的,1是完全不透明的。
```html
<p>This paragraph has a transparent red background</p>
<p>This paragraph has a transparent blue background</p>
```

```css
p {
  height: 50px;
  width: 350px;
}

/* Transparent red */
p:nth-child(1) {
  background-color: rgba(255,0,0,0.5);
  position: relative;
  top: 30px;
  left: 50px;
}

/* Transparent blue */
p:nth-child(2) {
  background-color: hsla(240,100%,50%,0.5);
}
```
* 还可以通过CSS的opacity属性来指定透明度。与设置某个特定颜色的透明度相比，这会设置所有选定元素以及它们的孩子节点的不透明度。
```html
<p>This paragraph is using RGBA for transparency</p>
<p>This paragraph is using opacity for transparency</p>
```

```css
/* Red with RGBA */
p:nth-child(1) {
  background-color: rgba(255,0,0,0.5);
}

/* Red with opacity */
p:nth-child(2) {
  background-color: rgb(255,0,0);
  opacity: 0.5;
}
```

<hr>

<h2 id="cascade">层叠</h2>
样式的优先级：

1. 重要性(importance):```!important```加在属性值后面，优先级最高。**强烈建议不要使用**，因为改变了cascade正常工作方式。
2. 专用性(specificity):ID/Class 选择器优于 element 选择器，ID 专用性高于 Class。
3. 源代码次序(source order):源代码靠后的规则会覆盖较早的规则。

```html
<p class="better">This is a paragraph.</p>
<p class="better" id="winning">One selector to rule them all!</p>
```

```css
#winning {
  background-color: red;
  border: 1px solid black;
}

.better {
  background-color: gray;
  border: none !important;
}

p {
  background-color: blue;
  color: white;
  padding: 5px;
}
```

<h3 id="priority">优先级计算</h3>

<table>
  <thead>
    <tr>
      <th>选择器</th>
      <th>千位</th>
      <th>百位</th>
      <th>十位</th>
      <th>个位</th>
      <th>合计值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>h1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1</td>
      <td>0001</td>
    </tr>
    <tr>
      <td>#id</td>
      <td>0</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0100</td>
    </tr>
    <tr>
      <td>h1 + p::first-letter</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>3</td>
      <td>0003</td>
    </tr>
    <tr>
      <td>li > a[href*="zh-CN"] > .inline-warning</td>
      <td>0</td>
      <td>0</td>
      <td>2</td>
      <td>2</td>
      <td>0022</td>
    </tr>
    <tr>
      <td>没有选择器, 规则在一个元素的 style 属性里</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>1000</td>
    </tr>
  </tbody>
</table>

```html
<div id="outer" class="container">
  <div id="inner" class="container">
    <ul>
      <li class="nav"><a href="#">One</a></li>
      <li class="nav"><a href="#">Two</a></li>
    </ul>
  </div>
</div>
```

```css
/* specificity: 0101 */
#outer a {
  background-color: red;
}

/* specificity: 0201 */
#outer #inner a {
  background-color: blue;
}

/* specificity: 0104 */
#outer div ul li a {
  color: yellow;
}

/* specificity: 0113 */
#outer div ul .nav a {
  color: white;
}

/* specificity: 0024 */
div div li:nth-child(2) a:hover {
  border: 10px solid black;
}

/* specificity: 0023 */
div li:nth-child(2) a:hover {
  border: 10px dashed black;
}

/* specificity: 0033 */
div div .nav:nth-child(2) a:hover {
  border: 10px double black;
}

a {
  display: inline-block;
  line-height: 40px;
  font-size: 20px;
  text-decoration: none;
  text-align: center;
  width: 200px;
  margin-bottom: 10px;
}

ul {
  padding: 0;
}

li {
  list-style-type: none;
}
```

<hr>

<h2 id="inherit">继承</h2>

* inherit:设置为与其父元素一样(想象成继承父类)
* initial:设置为与浏览器默认样式表中该元素设置的值一样，如果没有，就设置为inherit(想象成初始化为默认)
* unset:如果是自然继承的，就表现得像inherit，否则就设置为initial(想象成优先inherit，再initial)
```html
<ul>
  <li>Default <a href="#">link</a> color</li>
  <li class="inherit">Inherit the <a href="#">link</a> color</li>
  <li class="initial">Reset the <a href="#">link</a> color</li>
  <li class="unset">Unset the <a href="#">link</a> color</li>
</ul>
```

```css
body {
  color: green;
}

.inherit a {
  color: inherit;
}

.initial a {
  color: initial
}

.unset a {
  color: unset;
}
```

<hr>

<h2 id="box">框操作</h2>

* width, height：内容框的宽和高
* border：边界属性，eg.40px solid green
* padding：内边距，内容和边框之间的宽度
* margin：外边距，兄弟结点之间的宽度，(外边距塌陷：取大的margin值，小的相当于0)

<h3 id="overflow">内容溢出</h3>

* auto：溢出的内容被隐藏，然后出现滚动条来让我们滚动查看所有的内容。
* hidden：溢出的内容被隐藏
* visible：溢出的内容被显示在盒子的外边（默认的）

```html
<p class="autoscroll">
   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Mauris tempus turpis id ante mollis dignissim. Nam sed
   dolor non tortor lacinia lobortis id dapibus nunc. Praesent
   iaculis tincidunt augue. Integer efficitur sem eget risus
   cursus, ornare venenatis augue hendrerit. Praesent non elit
   metus. Morbi vel sodales ligula.
</p>

<p class="clipped">
   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Mauris tempus turpis id ante mollis dignissim. Nam sed
   dolor non tortor lacinia lobortis id dapibus nunc. Praesent
   iaculis tincidunt augue. Integer efficitur sem eget risus
   cursus, ornare venenatis augue hendrerit. Praesent non elit
   metus. Morbi vel sodales ligula.
</p>

<p class="default">
   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   Mauris tempus turpis id ante mollis dignissim. Nam sed
   dolor non tortor lacinia lobortis id dapibus nunc. Praesent
   iaculis tincidunt augue. Integer efficitur sem eget risus
   cursus, ornare venenatis augue hendrerit. Praesent non elit
   metus. Morbi vel sodales ligula.
</p>
```

```css
p {
  width  : 400px;
  height : 2.5em;
  padding: 1em 1em 1em 1em;
  border : 1px solid black;
}

.autoscroll { overflow: auto;    }
.clipped    { overflow: hidden;  }
.default    { overflow: visible; }
```

<h3 id="box-type">框类型</h3>

* 块框(block box)：内容独占一行，可以设置宽和高
* 行内框(inline box)：随文字出现，设置宽和高无效
* 行内块状框(inline-block box)：不会另起一行，随文字出现，可以设置宽和高，不会再段落行中断开

```html
<p>
   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
   <span class="inline">Mauris tempus turpis id ante mollis dignissim.</span>
   Nam sed dolor non tortor lacinia lobortis id dapibus nunc.
</p>

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <span class="block">Mauris tempus turpis id ante mollis dignissim.</span>
  Nam sed dolor non tortor lacinia lobortis id dapibus nunc.
</p>

<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  <span class="inline-block">Mauris tempus turpis id ante mollis dignissim.</span>
  Nam sed dolor non tortor lacinia lobortis id dapibus nunc.
</p>
```

```css
p {
  padding : 1em;
  border  : 1px solid black;
}

span {
  padding : 0.5em;
  border  : 1px solid green;

  /* That makes the box visible, regardless of its type */
  background-color: yellow;
}

.inline       { display: inline;       }
.block        { display: block;        }
.inline-block { display: inline-block; }
```

<hr>
<hr>

<h2 id="font">字体</h2>

* 网页安全字体：只有几种字体可以应用到所有系统中，称作网页安全字体。<a href="https://developer.mozilla.org/zh-CN/docs/Learn/CSS/%E4%B8%BA%E6%96%87%E6%9C%AC%E6%B7%BB%E5%8A%A0%E6%A0%B7%E5%BC%8F/Fundamentals#%E5%AD%97%E4%BD%93%E7%A7%8D%E7%B1%BB">点击</a>
<table>
  <thead>
    <tr>
      <th>名称</th>
      <th>定义</th>
      <th>实例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>```serif```</td>
      <td>有衬线的字体 (在一些字体的结尾，你看到的那些华丽的和其他的细节)。</td>
      <td style="font-family:serif;">My big red elephant</td>
    </tr>
    <tr>
      <td>```sans-serif```</td>
      <td>没有衬线的字体。</td>
      <td style="font-family:sans-serif;">My big red elephant</td>
    </tr>
    <tr>
      <td>```monospace```</td>
      <td>每个字符具有相同宽度的字体，通常用于代码列表。</td>
      <td style="font-family:monospace;">My big red elephant</td>
    </tr>
    <tr>
      <td>```cursive```</td>
      <td>用于模拟笔迹的字体，具有流动的连接笔画。</td>
      <td style="font-family:cursive;">My big red elephant</td>
    </tr>
    <tr>
      <td>```fantasy```</td>
      <td>用来装饰的字体。</td>
      <td style="font-family:fantasy;">My big red elephant</td>
    </tr>
  </tbody>
</table>

<h3 id="font-stack">字体栈</h3>

* 浏览器从列表第一项开始，依次检查在当前机器中字体是否可用，有些字体名字不止一个单词，用引号括起来。一般在字体栈的最后放一个通用的字体。
```css
p {
  font-family: "Trebuchet MS", Verdana, sans-serif;
}
```

<h3 id="font-size">字体大小</h3>

1. px：绝对单位
2. em：父元素大小的倍数
3. rem：根元素大小的倍数

* 通过属性```font-size```设置，元素的```font-size```属性是从父元素继承来的，所以一切都是从根元素```html```而来，浏览器的标准```font-size```设置值为```16px```。

<h3 id="font-style">字体样式</h3>

* ```font-style```：打开和关闭文本斜体，取值：
  * normal：设置为普通字体(关闭斜体)。
  * italic：设置为斜体，如果字体的斜体版本不可用，就利用oblique来模拟斜体。
  * oblique：将普通文本倾斜的样式应用到文本中。
* ```font-weight```：文字的粗体大小，取值：
  * normal，bold：普通或者加粗
  * lighter，bolder：设置得比父元素更细或更粗一步
* ```text-transform```：设置要转换的字体，取值：
  * none：防止任何转换
  * uppercase：转为大写
  * lowercase：转为小写
  * capitalize：单词首字母大写
  * full-width：转换为固定宽度的正方形
* ```text-decoration```：设置/取消字体上的文本装饰(eg.取消链接的下划线)，可以一次接收多个值，取值：
  * none：取消所有装饰
  * underline：下划线
  * overline：上划线
  * line-through：穿过文本的线

<h3 id="text-shadow">文字阴影</h3>

```css
text-shadow: 4px 4px 5px red;
```
4个属性：
1. 水平偏移，必须指定
2. 垂直偏移，必须指定
3. 模糊半径，默认为0
4. 阴影的基础颜色，默认为black
可以用逗号分隔多个阴影值，应用到一个文本

```css
text-shadow: -1px -1px 1px #aaa,
             0px 4px 1px rgba(0,0,0,0.5),
             4px 4px 5px rgba(0,0,0,0.7),
             0px 0px 7px rgba(0,0,0,0.4);
```

<hr>

<h2 id="text-layout">文本布局</h2>

* 文本对齐：```text-align```:left/right/center/justify(justify是两边对齐)
* 行高：通常设置为无单位的值，这个值乘以```font-size```来获得行高。推荐的是1.5-2

```css
line-height: 1.5;
```

* 字母和单词间距：```letter-spacing```和```word-spacing```属性
```css
p::first-line {
  letter-spacing: 2px;
  word-spacing: 4px;
}
```

<hr>

<h2 id="list-style-type">列表样式</h2>

* ```list-style-type```：设置项目符号的类型，例如无序列表的方形、圆形符号和有序列表的数字、字母、罗马数字。
* ```list-style-position```：项目符号出现在列表内，还是列表外。
* ```list-style-image```：项目符号使用自定义图片。

```css
/*有序列表上设置了大写罗马数字，list-style-position 默认值为 outside*/
ol {
  list-style-type: upper-roman;
}
```

```css
ol {
  list-style-type: upper-roman;
  list-style-position: inside;
}
```

<hr>

<h2 id="list-count">列表计数</h2>

```html
<!-- 从4开始计数 -->
<ol start="4">
  <li>Toast pitta, leave to cool, then slice down the edge.</li>
  <li>Fry the halloumi in a shallow, non-stick pan, until browned on both sides.</li>
  <li>Wash and chop the salad.</li>
  <li>Fill pitta with salad, humous, and fried halloumi.</li>
</ol>
```

```html
<!-- 倒计数 -->
<ol start="4" reversed>
  <li>Toast pitta, leave to cool, then slice down the edge.</li>
  <li>Fry the halloumi in a shallow, non-stick pan, until browned on both sides.</li>
  <li>Wash and chop the salad.</li>
  <li>Fill pitta with salad, humous, and fried halloumi.</li>
</ol>
```

```html
<!-- 指定列表项数值 -->
<ol>
  <li value="2">Toast pitta, leave to cool, then slice down the edge.</li>
  <li value="4">Fry the halloumi in a shallow, non-stick pan, until browned on both sides.</li>
  <li value="6">Wash and chop the salad.</li>
  <li value="8">Fill pitta with salad, humous, and fried halloumi.</li>
</ol>
```

<hr>

<h2 id="link">链接</h2>

* 每一个链接状态都可以用对应的伪类来应用样式：
  * link(没有访问过的)：链接的默认状态。可以使用```:link```伪类来应用样式。
  * visited：已经被访问过之后的状态。用:visited来应用样式。
  * hover：鼠标悬停在链接上时的状态。用:hover来应用样式。
  * active：链接被点击的时候的状态。用:active来应用样式。
* 默认的样式：
  * 链接具有下划线
  * 未访问过的链接是蓝色的
  * 访问过(visited)的是紫色的
  * 激活(active)的时候链接变成红色
* 设置链接样式的顺序：**L**o**V**e **F**ears **HA**te.
```css
/*这个顺序很重要，尝试交换hover和active的顺序后，active 就失效了*/
a {

}


a:link {

}

a:visited {

}

a:focus {

}

a:hover {

}

a:active {

}
```