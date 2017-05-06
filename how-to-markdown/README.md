# how to markdown
## hello world（文本）
```
//markdown
Hello, world!
```
会被解释成
```html
<p>Hello, world!</p>
```
## headings（标题）
```
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
## emphasis（强调）
```
1. 一个下划线的_斜体_和两个星号的**粗体**
2. 一个星号的*斜体*和两个下划线的__粗体__
3. 加粗斜体，两种方式你可以自由选择_**加粗斜体**_或*__加粗斜体__*
4. 在文字上加删除线使用~~删除此行。~~
```
## lists（列表）
```
* 项目 1
* 项目 2
* 项目 3
```
输出
* 项目 1
* 项目 2
* 项目 3

横线作用相同
```
- 用横线的第一个项目
- 用横线的第二个项目
```
- 用横线的第一个项目
- 用横线的第二个项目

有序列表
```
1. 项目 1
2. 项目 2
3. 项目 3
```
输出
1. 项目 1
2. 项目 2
3. 项目 3

多级列表
```
- 项目 1
  1. 项目 1.2
  2. 项目 1.3
- 项目 2
  - 项目 2.1
- 项目 3
```
- 项目 1
  1. 项目 1.2
  2. 项目 1.3
- 项目 2
  - 项目 2.1
- 项目 3

## links（超链接）
创建链接的最简单方式就是直接在 MarkDown 文档中粘贴一个 URL 地址。 URL 地址或者在尖角号中的 URL 地址都会被翻译成超链接：

    http://www.example.com or <http://www.example.com>
    (http://www.example.com) or <http://www.example.com>

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
## imges（图片）

## blockquotes（引用）

## code（代码）

## tables（表格）

## horizontal rules（水平分割线）

## html（超文本）

## GFM
