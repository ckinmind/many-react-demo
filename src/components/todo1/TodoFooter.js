import React from 'react';
import style from './App.scss';

class TodoFooter extends React.Component {

    /**
     * 处理全选与全不选的状态
     * @param e
     */
    handleAllState(e){
        this.props.changeTodoState(null, e.target.checked, true);
    }

    /**
     * 绑定事件，清除已完成的todos
     */
    handleClick(e){
        this.props.clearDone();
        e.stopPropagation();  //阻止事件的传播
    }


    render(){
        return (
            <div className={`${style.clearfix} ${style.footer}`} >
                <input type="checkbox" checked={this.props.isAllChecked}
                       onChange={this.handleAllState.bind(this)} className={style.fl}/>
                <span className={style.fl}> {this.props.todoDoneCount}已完成/{this.props.todoCount}总数</span>
                <button onClick={this.handleClick.bind(this)} className={style.fr}>清除已完成</button>
            </div>
        );
    }
}

export default TodoFooter;

/**
  在TodoFooter组件中的操作
 1. 点击按钮，清除isDone为true的TodoItem
 2. 点击左边的选框，将所有的TodoItem选中（结果会将所有的isDone变成未完成，应该是bug，这样设计不合理）

 在TodoFooter组件中显示的数据
 1. 已完成的TodoItem的数量： todoDoneCount
 2. 全部TodoItem的数量： todoCount




 */
