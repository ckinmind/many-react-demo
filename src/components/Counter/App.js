import {mobx,observable,computed} from 'mobx';
import React from 'react';
import {observer} from 'mobx-react';
import CounterStore from './CounterStore';
import classNames from 'classnames/bind';
import  styles from './App.scss';
let cx = classNames.bind(styles);

@observer
class Counter extends React.Component{
    constructor(props) {
        super(props);
        this.todoStore = new CounterStore();
    }
    render(){
        return (
            <div className="page">
                <div className={cx('container')}>
                    <span onClick={()=>this.todoStore.changeNum('minu')} className={cx('span','l')}>-</span>
                    {this.todoStore.count}
                    <span onClick={()=>this.todoStore.changeNum('plus')} className={cx('span', 'r')}>+</span>
                </div>
            </div>
        )
    }
}

export default  Counter;