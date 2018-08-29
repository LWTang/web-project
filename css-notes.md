<h1>CSS-NOTES</h1>

> 目录

* <a href="#pseudo-class">伪类</a>
* <a href="#pseudo-element">伪元素</a>
* <a href="#combinators">组合器和选择器组</a>

> 正文开始

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