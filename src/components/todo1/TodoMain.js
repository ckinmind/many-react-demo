import React from 'react';
import TodoItem from './TodoItem';
import style from './App.scss';

class TodoMain extends React.Component {
    // 遍历显示任务，转发props
    render(){
        return (
            <ul className={style.list}>
                {
                    this.props.todos.map((todo,index) => {
                        return <TodoItem key={index}  {...todo} index={index} {...this.props} />
                    })
                }
            </ul>
        );
    }
}

export default TodoMain;

/**
  TodoMain 中操作
 1. 渲染TodoItem子组件
 2. 将父组件中的数据传递到子组件中

 */