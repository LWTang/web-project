<h1>CSS-NOTES</h1>

> 目录

* <a href="#pseudo-class">伪类</a>
* <a href="#pseudo-element">伪元素</a>
* <a href="#combinators">组合器和选择器组</a>
* <a href="value-unit">值和单位</a>
  * <a href="#value">数值</a>
  * <a href="#percentage">百分比</a>
  * <a href="#color">颜色</a>
* <a href="#cascade">层叠</a>
  * <a href="#priority">优先级计算</a>
* <a href="inherit">继承</a>

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