<h1>CSS</h1>

> contents table

* <a href="#pseudo-class">伪类</a>
* <a href="#pseudo-element">伪元素</a>

> 正文开始

<h2 id="pseudo-class">伪类</h2>

* 伪类(pseudo-class):以一个冒号(:)作为前缀，添加到选择器末尾的关键字
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