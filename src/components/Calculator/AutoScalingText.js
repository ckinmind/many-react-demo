import React from 'react';
import style from './App.scss';
/**
 *  自动缩放数字组件
 */
class AutoScalingText extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            scale: 1  //缩放比例
        };
    }

    /**
     * 完成渲染新的props或者state后调用，此时可以访问到新的DOM元素
     * 是在render之后调用的
     */
    componentDidUpdate() {
        const { scale } = this.state;
        const node = this.refs.textNode;
        const parentNode = node.parentNode;

        /**
         * 注意这里的actualWidth会极大的超过availableWidth，即使数字顶到底部，继续增长的时候，actualWidth的数值要大于availableWidth
         * 知识因为scale而使得长度缩放了，真是的长度还是不变的，该多长就多长
         */
        const availableWidth = parentNode.offsetWidth;
        const actualWidth = node.offsetWidth;
        const actualScale = availableWidth / actualWidth;  //数值开始会大于1，然后逐渐小于1

        /**
         *  当actualScale<1的时候就会触发setState，将actualScale赋值给this.props.scale
         *  更新后会再次触发componentDidUpdate,所以需要一个机制去阻止死循环
         *  因为更新后 scale === actualScale ，所以可以通过这个开阻止，直接返回
         */
        if (scale === actualScale){
            return ;
        }

        if (actualScale < 1) {
            this.setState({ scale: actualScale })
        } else if (scale < 1) {
            this.setState({ scale: 1 })
        }
    }


    render() {

        const { scale } = this.state;

        /**
         *  这里用了transform：scale(x,y) x,y 分别是宽高的缩放比例
         */
        let divProps = {
            className: style['auto-scaling-text'],
            style: {transform: `scale(${scale},${scale})`},
            ref: 'textNode'
        };
        return (
            <div {...divProps}>
                {this.props.children}
            </div>
        )
    }
}

export default AutoScalingText;


/**
 * 1. 本组件没有销毁的状态
 *
 *
 * */
