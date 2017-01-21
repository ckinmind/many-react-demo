import  React from 'react';
import {Motion, spring} from 'react-motion';
import styles from './index.scss';

// These numbers for the square sizes are sync'd up to the ones in the CSS
const width = 4;
const widthUnits = "rem";

// The next two functions are necessary to determine what translationX and Y
// to apply to each square in the render method below

/**
 * 获取item所在的行号(因为从0开始编号所以没+1)
 */
function getItemRowIndex(index, rowLen) {
    return Math.floor(index / rowLen);
}

/**
 * 获取item所在的列号
 */
function getIndexInRow(index, rowLen) {
    return index % rowLen;
}


/**
 * 返回一个颜色值，类似#23dfe6
 */
function getRandomColorString() {
    let options = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    let color = ["#"];
    for (let i = 1; i <= 6; i++) {
        color[i] = options[Math.floor(Math.random() * options.length)];
    }
    return color.join("");
}

/**
 * 将对应index的元素提升到数组开头
 * 注意这里是浅拷贝
 */
function moveToFront(oldArr, index) {
    let newArr = [...oldArr];                //注意这里是浅拷贝，数组内的对象指向的地址相同
    let item = newArr.splice(index, 1)[0];  //splice返回的是被删元素的数组，所以后面要跟[0]
    newArr.unshift(item);                   //unshift在数组开头添加元素
    return newArr;
}


class Grid  extends React.Component {
    constructor(props){
        super(props);
        let items = [];
        for (let i = 0; i < 24; i++) {
            items[i] = { color: getRandomColorString() }
        }
        this.state = {
            items,
            itemCount: 24,
            rowLen: 6        //一排的长度是6个
        };
    }

    /**
     * 点击哪里item就将其提升到头部
     */
    handleClick(index) {
        const newArr = moveToFront(this.state.items, index);
        this.setState({
            items: newArr
        })
    }

    render() {
        // The count variable is only used to calculate a square's z-index property
        const count = this.state.items.length;
        return (
            <div className="page">
                <div className={`${styles.container} ${styles.clearfix}`}>
                {
                    this.state.items.map( (item, index) => {
                        let x = width * getIndexInRow(index, this.state.rowLen);
                        let y = width * getItemRowIndex(index, this.state.rowLen);


                        // The spring(x) and spring(y) below are what tell React-Motion to
                        // do its magic
                        // But we still need to do the work of calculating what x and y
                        // should be ourselves
                        // 如果将spring(x)和spring(y)改为x和y,就没有动画效果了
                        let style = {
                            backgroundColor: item.color,
                            translateX: spring(x),
                            translateY: spring(y)
                        };

                        return (
                            <Motion key={item.color} style={style}>
                                { ({backgroundColor,translateX, translateY}) =>
                                    <div
                                        onClick={this.handleClick.bind(this, index)}
                                        className={styles.box}
                                        style={{
                                            backgroundColor: item.color,
                                            zIndex: index === 0 ? 99 : count - index,
                                            transform: `translate3d(${translateX}${widthUnits}, ${translateY}${widthUnits}, 0)`,
                                        }} />
                                }
                            </Motion>
                        );
                    })
                }
            </div>
            </div>
        );
    }
}


export default  Grid;

/**
 *  在Motion标签内部的写法参考react-motion的demo
 *  之前看的时候觉得奇怪这里为什么是个回掉函数，看了官方的demo中有说明：
 *  children is a callback which should accept the current value of `style`
 *  里面的children是一个callback, 并且接受的值是style,这里还用了对象的解构赋值
 *  更多详情可以参考官方的demo
 */

/**
 *   报错：warning.js?8428:36Warning: Failed prop type: Invalid prop `style.backgroundColor` supplied to `Motion`.
 *   暂时没找到解决办法
 */
