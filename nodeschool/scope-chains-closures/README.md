# 作用域、作用域链、闭包

## 作用域（Scopes）

在 JavaScript 中主要的作用域类型是词法作用域（Lexical Scoping），一个函数创建一个词法作用域。在 ES6 中定义了新的块级作用域（Block Scoping）

注：除了词法作用域外还有 Global、`with`、`catch`、`eval` 四种可产生作用域，且不推荐使用。

var 被用来表示一个变量作用域是前的函数。let 和 const 被用来表示一个变量作用域是当前的大括号内。

小结：作用域分为词法作用域（function产生）和 块级作用域


## 作用域链（Scope Chains）

### 嵌套（Nesting）

作用域可以嵌套，词法作用域与块级作用域可以相互嵌套

### 获取作用域变量

所有嵌套作用域都遵循一个规则：每一个内层嵌套作用域可以访问外层作用域的变量，但是反过来不成立。

## 全局作用域 & Shadowing

所有的 JavaScript 环境都隐式的创建了一个全局作用域对象（浏览器中的 window， node 中的 global）

Shadowing
```js
function someFunc() {
	var foo = 1;
	function inner() {
		var foo = 2;
	}
}
```
变量命名覆盖

## 闭包（Closures）
```js
function someFunc() {
	var bar = 1;
	return function inner() {
		alert(bar)
	}
}
```
函数 inner 就是闭包，即使 someFunc 函数执行完，执行 inner 函数时仍能取到变量 bar。

## 垃圾回收机制（Garbage Collection）

