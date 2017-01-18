import  style from './index.scss';

import React from 'react';
import Header from './Header';
import Item from './Item';
import AddItemForm  from './AddItemForm';

const INIT_ITEMS = [
    {
        name: 'Todo item 1',
        color: 'red',
        checked: false,
        edit: false,
        id: 1
    },
    {
        name: 'Todo item 2',
        color: 'pink',
        checked: false,
        edit: false,
        id: 2
    },
    {
        name: 'Todo item 3',
        color: 'purple',
        checked: false,
        edit: false,
        id: 3
    }
];

var itemId = 4;

/**
 * 获取某个值得索引（这里是根据id值找到对应数据在数组中的索引值）
 * @param value 属性值
 * @param arr  数组
 * @param prop 属性名
 * @returns {number} 返回索引值
 */
function getIndex(value, arr, prop) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}


class App extends React.Component {
    constructor(props){
        super(props);
        this.onItemAdd = this.onItemAdd.bind(this);
        this.onItemEdit = this.onItemEdit.bind(this);
        this.onCheckedChecker = this.onCheckedChecker.bind(this);
        this.onMultiDelete = this.onMultiDelete.bind(this);
        this.onEditCheck = this.onEditCheck.bind(this);
        this.clickOutside = this.clickOutside.bind(this);
        this.state = {
            items: INIT_ITEMS,
            countChecked: false,
            checkedNum: 1
        };
    }

    /**
     * 全局绑定一个click的监听函数，用于处理在item列表外的点击
     */
    componentDidMount(){
        window.addEventListener('click', this.clickOutside);
    }

    /**
     * 新增：在组件销毁之前一定要解除绑定的监听函数
     */
    componentWillUnmount(){
        window.removeEventListener('click',this.clickOutside);
    }

    /**
     *  addItemForm组件submit事件触发
     */
    onItemAdd(name, color){
        this.state.items.push({
            name: name,
            color: color,
            checked: false,
            edit: false,
            id: itemId
        });
        this.setState(this.state);
        itemId += 1;
    }

    /**
     *  editItemForm组件submit事件的时候触发
     *  修改item的数据
     */
    onItemEdit(name, color, id){
        let array = this.state.items;
        let index = getIndex(id, array, 'id'); //找到索引值
        this.state.items[index].name = name;
        this.state.items[index].color = color;
        this.state.items[index].edit = false;
        this.setState(this.state);
    }

    /**
     * item 点击checked 触发，或者取消checked触发
     * 更新了APP的countChecked 和 checkedNum
     */
    onCheckedChecker(checked, id){
        let array = this.state.items;
        let index = getIndex(id, array, 'id');  //获取目标item的索引值
        let counter = [];

        if(this.state.items[index].edit === true){
            this.state.items[index].edit = false;
        }
        this.state.items[index].checked = checked;
        this.setState(this.state);

        this.state.items.forEach(function(obj, index){
            if(obj.checked === true){
                counter.push(obj);
            }
        });
        if(counter.length > 0){
            this.state.countChecked = true;
        }else {
            this.state.countChecked = false;
        }
        this.state.checkedNum = counter.length;
    }

    /**
     * 删除所有状态是checked的item
     */
    onMultiDelete (){
        let items = this.state.items;
        let keep = [];   //筛选出所有未checked的属性
        this.state.items.forEach(function(item, index){
            if(item.checked !== true){
                keep.push(items[index]);
            }
        });
        this.setState({
            items: keep,
            countChecked: false,
            checkedNum: 1
        });
    }

    /**
     * 点击item的文本内容时触发
     * @param flag
     * @param id
     */
    onEditCheck(flag, id){

        let array = this.state.items;
        let index = getIndex(id, array, 'id');
        let counter = [];

        // 保证只有一个item处于编辑状态
        this.state.items.forEach(function(obj, index){
            obj.edit = false;
        });

        this.state.items[index].edit = flag; //flag值是true,表示item处于可编辑状态
        this.setState(this.state);

    }

    /**
     * 处理item列表外的点击，即将所有item数据的edit字段更新为false
     * edit字段为false,则 editItemForm组件就不会展示出来
     */
    clickOutside(e){
        if(!this.refs.todoList.contains(e.target)){
            let shouldSetSate = false;
            this.state.items.forEach((item) =>{
                if(item.edit){
                    item.edit = false;
                    shouldSetSate = true;
                }

            });
            /* 设置shouldSetSate的目的是较少频繁的执行setState()*/
            if(shouldSetSate){
                this.setState(this.state);
            }
        }
    }

    render(){
        return (
            <div className={`page ${style.color}`} style={{alignItems: 'flex-start'}}>
                <div className={style.container}>
                    <Header checkedItemsFlag={this.state.countChecked} checkedNum={this.state.checkedNum} handleDeleteItems={this.onMultiDelete} />
                    <ul ref="todoList">
                        {this.state.items.map(function(item, index){
                            return (
                                <Item
                                    text={item.name}
                                    color={item.color}
                                    checked={item.checked}
                                    edit={item.edit}
                                    key={item.id}
                                    id={item.id}
                                    onCheckedCheck={this.onCheckedChecker}
                                    editFlag={this.onEditCheck}
                                    onEdit={this.onItemEdit}
                                />
                            );
                        }.bind(this))}
                    </ul>
                    <AddItemForm addItem={this.onItemAdd} />
                </div>
            </div>
        );
    }

}


export default App;
