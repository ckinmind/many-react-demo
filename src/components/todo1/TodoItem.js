import React from 'react';
import ReactDOM from 'react-dom';
import style from './App.scss';

class TodoItem extends React.Component {
    /**
     *处理任务是否完成状态
     */
    handleChange(){
        let isDone = !this.props.isDone;
        this.props.changeTodoState(this.props.index, isDone);
    }

    /**
     * 鼠标移入
     */
    handleMouseOver(){
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = 'inline';
    }

    /**
     * 鼠标移出
     */
    handleMouseOut(){
        ReactDOM.findDOMNode(this.refs.deleteBtn).style.display = 'none';
    }


    /**
     * 删除当前任务
     */
    handleDelete(){
        this.props.deleteTodo(this.props.index);
    }

    render(){
        let doneStyle = this.props.isDone? {textDecoration: 'line-through'} : {textDecoration: 'none'};

        let btnProps = {
            ref: 'deleteBtn',
            onClick: this.handleDelete.bind(this),
            style: {'display': 'none'},
            className: style.fr
        };

        return (
            <li onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                <input type="checkbox" checked={this.props.isDone} onChange={this.handleChange.bind(this)}/>
                <span style={doneStyle}> {this.props.text} </span>
                <button {...btnProps}>删除</button>
            </li>
        );
    }
}

export default TodoItem;

/**
  TodoItem 中的操作
 1. 监听mouseover和mouseout事件，从而显示隐藏删除按钮
 2. input框的onchange事件，改变TodoItem的状态，比如isDone属性和是否有删除样式
 3. 按钮上的click事件，执行删除操作


 */