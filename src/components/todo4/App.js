import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './components/Header';
import MainSection from './components/MainSection';
import * as TodoActions from './actions';
import styles from './index.scss';

const App = ({todos, actions}) => (
    <div className={`page ${styles.color}`}>
        <div className={styles.container}>
            <Header addTodo={actions.addTodo}/>
            <MainSection todos={todos} actions={actions}/>
        </div>
    </div>
);

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/* 传入初始的todo, 有一个默认的todoitem */
const mapStateToProps = state => ({
  todos: state.todos
});

/**
 * 惟一使用 bindActionCreators 的场景是当你需要把 action creator 往下传到一个组件上，
 * 却不想让这个组件觉察到 Redux 的存在，而且不希望把 Redux store 或 dispatch 传给它
 *
 * 参数：
 * 1. actionCreators (Function or Object): 一个 action creator，或者键值是 action creators 的对象
 * 2. dispatch (Function): 一个 dispatch 函数，由 Store 实例提供
 *
 * 返回值：
 * (Function or Object): 一个与原对象类似的对象，只不过这个对象中的的每个函数值都可以直接
 *  dispatch action。如果传入的是一个函数作为 actionCreators，返回的也是一个函数
 *
 *  自己的理解：使用bindActionCreators处理过后，原来在子组件中需要this.props.dispatch(actions.addTodo())
 *  可以改为 this.props.actions.addTodo(), dispatch方法不会显示的传递给子组件
 *  更多可以看redux中文文档中关于该api解释
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


/**
 *  1. 本应用使用redux只用来管理所有的todoitem数组
 *
 *
 *
 *
 * */