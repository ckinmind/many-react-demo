require('normalize.css/normalize.css');
import style from './App.scss';

import React from 'react';
import LocalDb from '../../tools/localDb';
import TodoHeader from './TodoHeader';
import TodoMain from './TodoMain';
import TodoFooter from './TodoFooter';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.db = new LocalDb('React-Todos');
        this.state = {
            todos: this.db.get('todos') || [],
            isAllChecked: false
        };
    }

    /**
     * 判断是否所有任务的状态都完成，同步底部的全选框
     */
    allChecked(){
        let isAllChecked = false;
        if(this.state.todos.every((todo) => todo.isDone)){
            isAllChecked = true;
        }
        this.setState({
            todos: this.state.todos,
            isAllChecked: isAllChecked
        });
    }

    /**
     * 添加任务，是传递给Header组件的方法
     * @param todoItem
     */
    addTodo(todoItem){
        this.state.todos.push(todoItem);
        // this.allChecked();
        // 将上面的改为下面的，增加新的todoitem的时候，isAllChecked肯定是false，不需要去确定一遍
        this.setState({
            todos: this.state.todos
        });

        this.db.set('todos',this.state.todos);
    }

    /**
     * 改变任务状态，传递给TodoItem和Footer组件的方法
     * @param index  索引
     * @param isDone  是否完成
     * @param isChangeAll 是否改变所有状态
     */
    changeTodoState(index, isDone, isChangeAll = false){
        if(isChangeAll){
            let todos = this.state.todos;
            todos.map((todo) => {
                todo.isDone = isDone;
                return todo;
            });

            this.setState({
                todos: todos,
                isAllChecked: isDone
            });
        }else {
            this.state.todos[index].isDone = isDone;
            this.allChecked();
        }
        this.db.set('todos',this.state.todos);
    }

    /**
     * 删除当前的任务，传递给TodoItem的方法
     * @param index
     */
    deleteTodo(index){
        this.state.todos.splice(index,1);
        this.setState({
            todos: this.state.todos
        });
        this.db.set('todos',this.state.todos);
    }

    /**
     * 清除已完成的任务，传递给Footer组件的方法
     */
    clearDone(){
        let todos = this.state.todos.filter((todo) => !todo.isDone);
        this.setState({
            todos: todos,
            isAllChecked: false
        });
        this.db.set('todos',todos);
    }


    render() {
        let headerProps = {
            addTodo: this.addTodo.bind(this)
        };
        let mainProps = {
            deleteTodo: this.deleteTodo.bind(this),
            todos: this.state.todos,
            changeTodoState: this.changeTodoState.bind(this)
        };

        let footerProps = {
                todoCount: this.state.todos.length || 0,
                todoDoneCount: (this.state.todos.filter((todo)=>todo.isDone)).length,
                isAllChecked: this.state.isAllChecked,
                clearDone: this.clearDone.bind(this),
                changeTodoState: this.changeTodoState.bind(this)
        };

        return (
            <div className={`page ${style.color} `}>
                <div className={style.container}>
                    <div className={style.panel}>
                        <TodoHeader {...headerProps}/>
                        <TodoMain   {...mainProps}/>
                        <TodoFooter {...footerProps} />
                    </div>
                </div>
            </div>
        );
    }
}

App.defaultProps = {};

export default App;
