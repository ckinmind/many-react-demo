import React, {Component} from 'react';
import classNames from 'classnames/bind';
import TodoTextInput from './TodoTextInput';
import styles from '../index.scss';
let cx = classNames.bind(styles);

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }

    /**
     * 双击进入编辑模式，即将editing设为true通过setState
     */
    handleDoubleClick(){
        this.setState({editing: true})
    }

    /**
     * 疑惑：在这里不管写成箭头函数也好还是现在这样，调用处都无需bind(this)
     * 如果文本长度为0 则执行删除操作
     */
    handleSave(id, text){
        if (text.length === 0) {
            this.props.deleteTodo(id);
        } else {
            this.props.editTodo(id, text);
        }
        this.setState({editing: false});
    }

    render() {
        const {todo, completeTodo, deleteTodo} = this.props;
        /**
         * 判断是否处于edi来选择加载TodoTextInput还是正常的todoitem
         */
        let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput text={todo.text}
                               editing={this.state.editing}
                               onSave={(text) => this.handleSave(todo.id, text)}/>
            )
        } else {
            element = (
                <div className={styles.view}>
                    <input className={styles.toggle}
                           type="checkbox"
                           checked={todo.completed}
                           onChange={() => completeTodo(todo.id)}/>
                    <label onDoubleClick={this.handleDoubleClick.bind(this)}>
                        {todo.text}
                    </label>
                    <button className={styles.destroy}
                            onClick={() => deleteTodo(todo.id)}/>
                </div>
            )
        }

        let liClass = cx({
            'completed': todo.completed,
            'editing': this.state.editing
        });
        return (
            <li className={liClass}>
                {element}
            </li>
        )
    }
}

TodoItem.propTypes = {
    todo: React.PropTypes.object.isRequired,       // 每个todoitem的详细信息：text / id / completed
    editTodo: React.PropTypes.func.isRequired,     // 编辑模式保存时的回调函数
    deleteTodo: React.PropTypes.func.isRequired,   // 删除时的回调函数
    completeTodo: React.PropTypes.func.isRequired  // 每个todoitem的完成按钮
};

export default  TodoItem;