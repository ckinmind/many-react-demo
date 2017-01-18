import React from 'react';
import style from './App.scss';

class TodoHeader extends React.Component {
    /**
     * 绑定回车事件，添加新任务
     * @param e 事件句柄
     */
    handleKeyUp(e){
        if(e.keyCode === 13){
            let text = e.target.value;
            if(!text){
                return false;
            }

            let newTodoItem = {
                    text: text,
                    isDone: false
            };
            e.target.value = '';
            this.props.addTodo(newTodoItem);
        }
    }

    
    render(){
        return (
            <div className={style.header}>
                <input type="text"  onKeyUp={this.handleKeyUp.bind(this)} placeholder="what's your task" />
            </div>
        );
    }
}

export default TodoHeader;

/**
 在TodoHeader中的操作
 1. 回车事件onKeyUp，代表输入了一项新的TodoItem
 */
