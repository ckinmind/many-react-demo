# many-react-demo
![many-react-demo](https://raw.githubusercontent.com/ckinmind/many-react-demo/master/src/images/screenshot.gif)

各种react demo的合集，有todo应用等

## 项目说明
- 本项目是收集各种react的demo然后整合成一个包含多个小应用的演示，demo大多来自[CodePen.io](http://codepen.io/)
- 项目由Yeoman构建,基础脚手架使用的是 [generator-react-webpack](https://github.com/react-webpack-generators/generator-react-webpack)
- demo整合过程中比较大的问题是CSS Modules,防止相互的命名污染

## 应用清单
- [React Router](http://codepen.io/matthewvincent/pen/qaWxqq)：路由和切换的动画使用的是ReactCSSTransitionGroup
- [Todo1](http://www.reqianduan.com/2297.html)：特点是加入了localstorage本地存储
- [Todo2](http://codepen.io/geobde/pen/LNmdbJ)：最简单的todo实现，值得关注的是其完成时打勾的实现，很有意思
- [Todo3](http://codepen.io/hotate17/pen/oYKMaM)：一个功能很全面的todo例子，特色是可以选择todoitem的颜色
- [Todo4](https://github.com/reactjs/redux/tree/master/examples)：redux官方实例中的todomvc,使用redux实现，学习redux很好的例子
- [Calculator](http://codepen.io/mjijackson/pen/xOzyGX)：一个类苹果手机中的计算器，很有意思的例子
- [Motion](http://codepen.io/oksas/pen/jqJMZd)：一个简单的使用react-motion的demo,React动画的一种实现方向
- [Counter](https://github.com/superNever/counter): 一个简单的应用MobX的计数器

## 应用使用的npm包
- [react-motion](https://github.com/chenglou/react-motion): 用来实现react动画
- [classnames](https://github.com/JedWatson/classnames): 用来便捷操作css class,支持css modules（使用起来很方便）

## 如何开始
```js
> git clone https://github.com/ckinmind/many-react-demo.git
> cd many-react-demo
> npm install
> npm start
```

## 问题收录
- 关于应用mobx时因为缺少ES7的Decorators支持而报错的问题, 查看[issue 2](https://github.com/ckinmind/many-react-demo/issues/2)