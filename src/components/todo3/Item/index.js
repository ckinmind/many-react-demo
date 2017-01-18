import React from 'react';
import EditItemForm  from '../EditItemForm';
import style from './index.scss';

class Item extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            clicked: false,
            checked: false,
            editSwitch: false
        };
    }

    /**
     * 处理当前item 是否checked后的事件
     */
    handleChange(e){
        this.state.checked = e.target.checked;
        this.props.onCheckedCheck(this.state.checked, this.props.id);
        // this.setState(this.state);  // 这步没有意义，同onEditSwitch
    }

    /**
     *  点击item文本内容时触发
     */
    onEditSwitch(){
        this.state.editSwitch = true;
       // this.setState(this.state);  //这步没有意义，因为item以及EditItemForm的组件的改变全部依赖App组件的setState
        //this.props.editFlag(this.state.editSwitch, this.props.id);
        this.props.editFlag(true, this.props.id);
    }

    /** 【新增代码shouldComponentUpdate，目的是优化程序，较少不必要的执行】
     * shouldComponentUpdate会在本身组件的setState或者父组件的setState之后触发，来决定是否执行本组件的render
     * 默认shouldComponentUpdate总是返回true，即本组件和父组件setState都要重新render
     * 假设列表有20条item, 则执行onEditSwitch的时候每一个item元素都要执行render, 这里总共执行了20次， 但是其实大部分的item没有任何改变
     * 此时如果在shouldComponentUpdate中判断，如果新的props.edit和老的不一样才触发更新，则实际只触发了2次render
     * 一次是当前item变为编辑状态，另一次是另一个处于编辑状态的item重新变为展示状态
     * （备注：如果点击是来自列表之外的，则可能只触发1次或者0次，取决于当前列表有没有处于编辑状态的item）
     * （备注: 发现一个新问题，就是修改已发布的item,更改颜色值但是不保存，在别的地方点击重置，再点开，发现颜色radio还是上次更改的）
     */
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.edit !== nextProps.edit){
            return true;
        }
        if(this.props.checked !== nextProps.checked){
            return true;
        }
        return false;
    }

    render(){
        let colorClass = this.props.color ? this.props.color : '';
        let checkedClass = this.state.checked ? 'disabled' : '';
        let editProps = {
            editMode: this.props.edit,
            text: this.props.text,
            color: this.props.color,
            notifyEdits: this.props.onEdit,
            id: this.props.id
        };
        return (
            <li className={`${style.item} ${style[colorClass]} ${style[checkedClass]}`}>
                <div className={style.checkbox}>
                    <input type="checkbox" onChange={this.handleChange.bind(this)} />
                </div>

                <div className={style.text}>
                    <p onClick={this.onEditSwitch.bind(this)}>{this.props.text}</p>
                    <EditItemForm {...editProps}/>
                </div>
            </li>
        );
    }
}

Item.propTypes = {
    text: React.PropTypes.string.isRequired,      // item的文本内容
    color: React.PropTypes.string,                // item的颜色
    checked: React.PropTypes.bool.isRequired,     // item是否处于完成状态，即前面有没有打勾
    edit: React.PropTypes.bool.isRequired,        // item是否处于编辑状态，用来指定组件EditItemForm的显示和隐藏
    id: React.PropTypes.number.isRequired,        // item的id
    onCheckedCheck: React.PropTypes.func.isRequired,
    editFlag: React.PropTypes.func.isRequired
};

export default Item;