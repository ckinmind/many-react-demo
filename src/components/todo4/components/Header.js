import React, {Component} from 'react';
import TodoTextInput from './TodoTextInput';
import styles from '../index.scss';


class Header extends Component {

    handleSave(text) {
        if (text.length !== 0) {
            this.props.addTodo(text);
        }
    }

    render() {
        /* 注意下面传入的newTodo只有key,无value,但是TodoTextInput组件内部可以取得this.props.newTodo，且值为true*/
        return (
            <header className={styles.header}>
                <h1>todos</h1>
                <TodoTextInput newTodo
                               onSave={this.handleSave.bind(this)}
                               placeholder="What needs to be done?"/>
            </header>
        )
    }
}

Header.propTypes = {
    addTodo: React.PropTypes.func.isRequired
};

export default  Header;