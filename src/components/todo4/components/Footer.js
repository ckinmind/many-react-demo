import React, {Component} from 'react';
import classNames from 'classnames';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/TodoFilters';
import styles from '../index.scss';
// let cx = classNames.bind(styles);

/* 这里的[]的用法是为了让其中的值是变量*/
const FILTER_TITLES = {
    [SHOW_ALL]: 'All',
    [SHOW_ACTIVE]: 'Active',
    [SHOW_COMPLETED]: 'Completed'
};

class Footer extends Component {

    /**
     * 显示当前还未完成（actie）的todoitem的数目
     * 注意items的单复数，和没有todoitem的时候显示No
     */
    renderTodoCount() {
        const {activeCount} = this.props;
        const itemWord = activeCount === 1 ? 'item' : 'items';

        return (
            <span className={styles['todo-count']}>
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
        )
    }

    /**
     * 显示todolist的状态，all / active / completed
     */
    renderFilterLink(filter) {
        const title = FILTER_TITLES[filter];
        /* 注意这里的冒号的用法，将selectedFilter当成filter的别名，因为这里的外部的filter有别的值，即这里的 selectedFilter = this.props.filter */
        const {filter: selectedFilter, onShow} = this.props;

        let selectedClass = filter === selectedFilter ? 'selected' : '';
        // cx({selected: filter === selectedFilter})
        return (
            <a className={styles[selectedClass]}
               style={{cursor: 'pointer'}}
               onClick={() => onShow(filter)}>
                {title}
            </a>
        )
    }

    /**
     * 当有完成的todoitem时，按钮才显示，作用是清除所有已完成的todoitem
     */
    renderClearButton() {
        const {completedCount, onClearCompleted} = this.props;
        if (completedCount > 0) {
            return (
                <button className={styles['clear-completed']}
                        onClick={onClearCompleted}>
                    Clear completed
                </button>
            )
        }
    }

    render() {
        return (
            <footer className={styles.footer}>
                {this.renderTodoCount()}
                <ul className={styles.filters}>
                    {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
                        <li key={filter}>
                            {this.renderFilterLink(filter)}
                        </li>
                    )}
                </ul>
                {this.renderClearButton()}
            </footer>
        )
    }
}

Footer.propTypes = {
    completedCount: React.PropTypes.number.isRequired,    // 完成的todoitem数目
    activeCount: React.PropTypes.number.isRequired,       // 未完成的todoitem的数目
    filter: React.PropTypes.string.isRequired,            // 表示当前的todolist类别， all / active / completed
    onClearCompleted: React.PropTypes.func.isRequired,    // 清除所有已完成的回掉函数
    onShow: React.PropTypes.func.isRequired               // 点击 all / active / completed 时的回调函数，用于设置filters
};

export default Footer;