import React from 'react';
import style from './index.scss';

class ColorSelector extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            color: this.props.color
        };
    }

    /**
     * 处理radio的onChange事件，三个步骤
     * 1. 将this.state.color更改为点击位置的颜色值
     * 2. setState()，则点击位置的颜色会新增一个checked的class, 表示选择了该颜色值
     * 3. 触发父组件的回调函数，将更改的颜色值传回去，以便新增item的时候背景色显示为之前选中的颜色
     * @param e
     */
    handleColorChange(e){
        //this.state.color = e.target.value;     // 要注释掉，如果setState(this.state.color)则shouldComponentUpdate就会失效
        this.setState({color: e.target.value});
        this.props.colorChange(e.target.value);  //用e.target.value而不用this.state.color
    }

    /**
     *  只有颜色改变才能触发更新，其他的改变都不会触发更新
     */
    shouldComponentUpdate(nextProps, nextState){
        if(nextState.color !== this.state.color){
            return true;
        }
        return false;
    }

    render(){
        let radio = this.props.colorList.map((color, index) => {
            let checkedClass =  (this.state.color == color.name)? 'checked' : '';
            return  <input type="radio" onChange={this.handleColorChange.bind(this)}
                           className={`${style[color.name]} ${style[checkedClass]}`}
                           name="selectedColor"
                           value={color.name}
                           key={index} />
        });
        return (
            <div className={style.colorSelector}>
                {radio}
            </div>
        );
    }
}

/**
 *  colorList: 颜色列表值
 *  colorChange： 颜色改变后的回调函数，在父组件中执行一些后续操作
 */
ColorSelector.propTypes = {
    colorList: React.PropTypes.array.isRequired,   // 颜色列表
    colorChange: React.PropTypes.func.isRequired,  // 颜色更改后的回调处理
    color: React.PropTypes.string.isRequired       // 用来处理默认checked的颜色框，add组件是默认红色，edit组件是需要传入一个颜色值的
};

ColorSelector.defaultProps = {
    color: 'red',
    colorList:[
        {
            name: 'red',
            checked: true,
            id: 1
        },
        {
            name: 'pink',
            checked: false,
            id: 2
        },
        {
            name: 'purple',
            checked: false,
            id: 3
        },
        {
            name: 'blue',
            checked: false,
            id: 4
        },
        {
            name: 'green',
            checked: false,
            id: 5
        },
        {
            name: 'yellow',
            checked: false,
            id: 6
        }
    ]
};


export default ColorSelector;