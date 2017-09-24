# how to markdown
* [文本](#1)
* [标题](#2)
* [强调](#3)
* [列表](#4)
* [超链接](#5)
* [图片](#6)
* [引用](#7)
* [代码](#8)
* [表格](#9)
* [水平分割线](#10)
* [超文本](#11)
* [GFM](#12)

<h2 id="1"> hello world（文本）</h2>

```plain
//markdown
Hello, world!
```

会被解释成

```html
<p>Hello, world!</p>
```

<h2 id="2">headings（标题）</h2>

```plain
     # 标题 1
     ## 标题 2
     ### 标题 3
     #### 标题 4
     ##### 标题 5
     ###### 标题 6
```

MarkDown 中的标题级别对应 `<h1>-<h6>` HTML 标记。

一级二级标题的另外表示方法

    标题 1
    ===

    标题 2
    ---

<h2 id="3">emphasis（强调）</h2>

```plain
1. 一个下划线的_斜体_和两个星号的**粗体**
2. 一个星号的*斜体*和两个下划线的__粗体__
3. 加粗斜体，两种方式你可以自由选择_**加粗斜体**_或*__加粗斜体__*
4. 在文字上加删除线使用~~删除此行。~~
```

<h2 id="4">lists（列表）</h2>

```plain
* 项目 1
* 项目 2
* 项目 3
```

输出

* 项目 1
* 项目 2
* 项目 3

横线作用相同

```plain
- 用横线的第一个项目
- 用横线的第二个项目
```

输出

- 用横线的第一个项目
- 用横线的第二个项目

有序列表

```plain
1. 项目 1
2. 项目 2
3. 项目 3
```

输出

1. 项目 1
2. 项目 2
3. 项目 3

多级列表

```plain
- 项目 1
  1. 项目 1.2
  2. 项目 1.3
- 项目 2
  - 项目 2.1
- 项目 3
```

输出

- 项目 1
  1. 项目 1.2
  2. 项目 1.3
- 项目 2
  - 项目 2.1
- 项目 3

<h2 id="5">links（超链接）</h2>

创建链接的最简单方式就是直接在 MarkDown 文档中粘贴一个 URL 地址。 URL 地址或者在尖角号中的 URL 地址都会被翻译成超链接：

```plain
http://www.example.com or <http://www.example.com>
(http://www.example.com) or <http://www.example.com>
```

### 内嵌式
    [text](href "alt")
    [text](http://www.example.com)
    [谷歌主页](https://www.google.com "谷歌主页")
### 引用式
使用应用方便多次使用链接

     [NodeSchool Site][ref]
     [GitHub][1]
     [Remark parser]

     //下面是这些链接所引用的资源：
     //引用
     [ref]: http://www.nodeschool.io
     [1]: https://github.com/
     [Remark parser]: http://remark.js.org/

<h2 id="6">imges（图片）</h2>

### 嵌入式

    ![alt text](url)

### 引用式

    ![reference style][logo]

    [logo]: ./logo.png

<h2 id="7">blockquotes（引用）</h2>

```plain
> 这是一段引文
> 此行是同一引文的一部分
```

输出

> 这是一段引文
> 此行是同一引文的一部分

<h2 id="8">code（代码）</h2>

### 行内代码

    `<code>`

结果

`<code>`

### 块式代码

块式代码由三个反引号的符号行所包裹（\`\`\` ），或者前面插入 四个空格

代码高亮

    ```js
    console.log('markdown')
    ```
输出

```js
console.log('markdown')
```

<h2 id="9">tables（表格）</h2>

表格不在 MarkDown 的规范里，但是很多解释器都支持表格。尤其是 Github 使用的 GFM 也是支持表格的。

```plain
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

输出


| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

* 每个单元格至少需要三个横线来间隔，冒号算作一个横线
* 外侧的竖线（|）可以没有
* 单元格里可以使用 MarkDown 语法

<h2 id="10">horizontal rules（水平分割线）</h2>

```plain
横线
---

星号
***

下划线
___

```

输出

---

<h2 id="11">html（超文本）</h2>

如果你想对文档做更多的格式化，而这些格式超出了 MarkDown 的能力范围，你可以使用 HTML 标记，MarkDown 对 HTML 能够很好地兼容

```plain
<p align="center">可以很好地将文本居中。</p>
```

输出

<p align="center">可以很好地将文本居中。</p>

可以使用 HTML 编写任何内容：定义列表，嵌入社交网络中的内容，嵌入 YouTube 视频，等等。只需要在你的 MarkDown 文档的合适位置插入 HTML 标记即可

<h2 id="12">GFM（Github Flavored(特色的) Markdown）</h2>

### 任务列表

```plain
- [x] [这是链接](#)，**这是格式化**，这是<del>删除标记</del>
- [x] 需要列表语法（有序和无序列表都支持）
- [x] 此项已完成
- [ ] 此项未完成
```

输出

- [x] [这是链接](#)，**这是格式化**，这是<del>删除标记</del>
- [x] 需要列表语法（有序和无序列表都支持）
- [x] 此项已完成
- [ ] 此项未完成

### SHA引用
Github上对一个提交的SHA-1 hash引用会被翻译为该提交的一个链接
### 问题（Issue）和请求合并（Pull request）引用

#1
denysdovhan/how-to-markdowkn#1

### 用户 @ 提及
用户名前加 @
### 表情符号
查看 GFM 支持的完整表情符号列表，请访问 Emoji Cheat Sheet <http://www.emoji-cheat-sheet.com/>

<br><br>
end.
