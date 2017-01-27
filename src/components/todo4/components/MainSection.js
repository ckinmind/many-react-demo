import React, { Component } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';
import styles from '../index.scss';

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};

class MainSection extends Component {

    constructor(props){
        super(props);
        this.state = {
            filter: SHOW_ALL
        };
    }

    /**
     * 处理清除所有已完成的todoitem
     * 简略写法可以直接 onClearCompleted = this.props.actions.clearCompleted
     */
    handleClearCompleted() {
        this.props.actions.clearCompleted();
    }

    /**
     * 在Footer组件中触发
     */
    handleShow(filter){
        this.setState({filter});
    }

    /**
     * 全选设为已完成，或者全选取消变为未完成
     */
    renderToggleAll(completedCount) {
        const {todos, actions} = this.props;
        if (todos.length > 0) {
            return (
                <input className={styles['toggle-all']}
                       type="checkbox"
                       checked={completedCount === todos.length}
                       onChange={actions.completeAll}/>
            )
        }
    }

    /**
     * 底部的操作栏, 当没有todoitem的时候是隐藏的
     */
    renderFooter(completedCount) {
        const {todos} = this.props;
        const {filter} = this.state;
        const activeCount = todos.length - completedCount;

        if (todos.length) {
            return (
                <Footer completedCount={completedCount}
                        activeCount={activeCount}
                        filter={filter}
                        onClearCompleted={this.handleClearCompleted.bind(this)}
                        onShow={this.handleShow.bind(this)}/>
            )
        }
    }

    render() {
        const {todos, actions} = this.props;
        const {filter} = this.state;

        /**
         * TODO_FILTERS返回的是筛选方法，然后根据筛选方法返回筛选出的todolist
         */
        const filteredTodos = todos.filter(TODO_FILTERS[filter]);

        /**
         *  逗号后面的0是指定count的初始值，这样写法很容易误解的，这里不用箭头函数好理解一点
         *  关于reduce指定初始值的用法可以参考阮一峰的教程
         */
            // const completedCount = todos.reduce((count, todo) =>
            //         todo.completed ? count + 1 : count, 0
            // );
        const completedCount = todos.reduce(function(count, todo){
                return todo.completed ? count + 1 : count;
            }, 0);

        return (
            <section className={styles.main}>
                {this.renderToggleAll(completedCount)}
                <ul className={styles['todo-list']}>
                    {filteredTodos.map(todo =>
                        <TodoItem key={todo.id} todo={todo} {...actions} />
                    )}
                </ul>
                {this.renderFooter(completedCount)}
            </section>
        )
    }
}
MainSection.propTypes = {
    todos: React.PropTypes.array.isRequired,
    actions: React.PropTypes.object.isRequired
};

export default MainSection;