import style from './index.scss';

import React from 'react';


class App extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            items: [],
            text: ''
        };
    }

    handleChange(e){
        this.setState({
            text: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.state.items.push(this.state.text);
        this.setState({
            items: this.state.items,
            text: ''
        });
    }


    render(){
        return (
            <div className={'page ' + style.color} style={{alignItems: 'flex-start'}}>
                <div className={style.container}>
                    <div className={style.box}>
                        <h4>Todo List</h4>
                    </div>
                    <form onSubmit={this.handleSubmit} className={style.form}>
                        <ul>
                            {
                                this.state.items.map((item,index) => {
                                    return <li key={index}>
                                                <input className={style.checkbox} type="checkbox"/>
                                                <span>{item}</span>
                                          </li>
                                })
                            }
                        </ul>
                        <input type="text" placeholder="Add your item..."  onChange={this.handleChange}  value={this.state.text}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;

/**
  本Todo的触发有点不一样
 1. 输入框触发的是onChange事件，将输入值时时的赋值给value
 2. 当按下回车键的时候触发表单的提交事件onSubmit, 在处理函数handleSubmit中先阻止默认表单提交行为，
    然后取到用户输入的值this.state.text ，加入到this.state.items，然后setState()更新视图，同时this.state.text重新清空更新到视图
 */
