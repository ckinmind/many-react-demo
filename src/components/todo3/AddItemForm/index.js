import React from 'react';
import ColorSelector from '../ColorSelector';
import style from './index.scss';

class AddItemForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            color: 'red'
        };
    }

    /**
     * 执行父组件添加item的回调，然后setState，重置下输入框
     * @param e
     */
    handleSubmit(e){
        e.preventDefault();

        let text = this.state.text;
        let color = this.state.color;

        if(text != ''){
            this.props.addItem(text, color);
            this.setState({
                text: '',
                color: 'red'
            });
        }
    }

    /**
     * 时时更新this.state.text的值
     * @param e
     */
    handleChange(e){
        this.state.text = e.target.value;
        this.setState(this.state);
    }

    /**
     * ColorSelector会传回更改后的颜色值
     * @param color
     */
    handleColorChange(color){
        this.state.color = color;
    }

    render(){
        return (
            <form  className={style.addform} onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" value={this.state.text} onChange={this.handleChange.bind(this)} placeholder="Add New Item" />
                <ColorSelector  colorChange={this.handleColorChange.bind(this)}/>
                <input type="submit" value="Add" />
            </form>
        );
    }
}

AddItemForm.propTypes = {
    addItem: React.PropTypes.func.isRequired
};

export default AddItemForm;