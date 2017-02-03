import React, {Component} from 'react';
import classNames from 'classnames/bind';
import styles from '../index.scss';

let cx = classNames.bind(styles);

class TodoTextInput extends Component {

    constructor(props) {
        super(props);
        // this.props.text 针对todoitem的编辑模式
        this.state = {
            text: this.props.text || ''
        };
    }

    /**
     * 触发事件是onKeyDown, 所以会时时触发，但是只有是回车才会进一步执行
     * 别的todo一般是表单form,然后是onSubmit触发，本组件是单纯的input
     */
    handleSubmit(e) {
        const text = e.target.value.trim();  //这行最好放进if里面
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newTodo) {
                this.setState({text: ''});
            }
        }
    }

    /**
     * 时时触发，改变输入值
     */
    handleChange(e) {
        this.setState({text: e.target.value});
    }

    /**
     * 1. 失去焦点时触发
     * 2. 本方法针对进入编辑模式的todoitem, 当输入框失去焦点时需要保存输入的内容
     */
    handleBlur(e) {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    render() {

        const inputClass =  cx({
            'edit': this.props.editing,
            'new-todo': this.props.newTodo
        });
        return (
            <input className={inputClass}
                   type="text"
                   placeholder={this.props.placeholder}
                   autoFocus="true"
                   value={this.state.text}
                   onBlur={this.handleBlur.bind(this)}
                   onChange={this.handleChange.bind(this)}
                   onKeyDown={this.handleSubmit.bind(this)}/>
        )
    }
}

TodoTextInput.propTypes = {
    onSave: React.PropTypes.func.isRequired,   // 新增或者保存todoitem时的回调函数
    text: React.PropTypes.string,              // 组件的初始值，主要针对todoitem中的input value
    placeholder: React.PropTypes.string,       // 这条我觉得可以省略的
    editing: React.PropTypes.bool,             // 是否处于编辑模式
    newTodo: React.PropTypes.bool              // header中的标志
};

export default TodoTextInput;

