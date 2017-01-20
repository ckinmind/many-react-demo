import React from 'react';
import style from './index.scss';


class Header extends React.Component {

    constructor(props){
        super(props);
    }

    handleClick(e){
        e.preventDefault();
        this.props.handleDeleteItems();
    }

    /**
     *  两种情况下才允许header组件重新渲染
     *  1. checkedItemsFlag改变的时候
     *  2. checked number 数目发生变化的是
     */
    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.checkedItemsFlag !== this.props.checkedItemsFlag){
            return true;
        }
        if(nextProps.checkedNum !== this.props.checkedNum){
            return true;
        }
        return false;
    }

    render(){
        let showLinkClass = this.props.checkedItemsFlag ? 'is--visible' : '';
        return (
            <header className={ style.header }>
                <h1 className={ style.clearfix }>
                    {this.props.title}
                    <a
                        className={style[showLinkClass]}
                        href="#"
                        onClick={this.handleClick.bind(this)}>
                        Clear Completed Items ({this.props.checkedNum})
                    </a>
                </h1>
            </header>
        );
    }
}

Header.propTypes = {
    title: React.PropTypes.string.isRequired,              // 标题，有默认值
    checkedItemsFlag: React.PropTypes.bool.isRequired,     // 表示现在是否处于有item被标记checked
    handleDeleteItems:  React.PropTypes.func.isRequired,
    checkedNum: React.PropTypes.number                    // 比较为checked的数目，即标记为完成的数目
};

Header.defaultProps = {
    title: 'React Todo List 🐶'
};

export default Header;
