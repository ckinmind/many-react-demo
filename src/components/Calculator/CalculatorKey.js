import React from 'react';
import ReactPoint from 'react-point';
// github:https://github.com/ReactTraining/react-point
import style from './App.scss';

const PointTarget = ReactPoint.PointTarget;


/**
 * 这里用了一个第三方的click/tap Component 用来模拟点击和触摸事件，每个button都用这个组件包住
 */
class CalculatorKey extends React.Component {
    render() {
        /**
         * 这里使用的是对象的解构赋值和JSX的spread operator
         * this.props是上一层组件传递给CalculatorKey组件的
         * 然后onPress = this.props.onPress, className = this.props.className, 剩下的就全部给props（这里可以换成别的名字比如other,不造成误解）
         * 疑问：button标签怎么是自闭合的，直接将...props传递下去是什么意思
         */
        const { onPress, className, ...props } = this.props;
        return (
            <PointTarget onPoint={onPress}>
                <button className={`${style['calculator-key']} ${className}`} {...props}/>
            </PointTarget>
        )
    }
}

CalculatorKey.propTypes = {

};

export default CalculatorKey;
