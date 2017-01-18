import React from 'react';
import ColorSelector from '../ColorSelector';
import style from './index.scss';


class EditItemForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newText: this.props.text,
            newColor: this.props.color
        };
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.editMode === false){
    //         this.setState({
    //             newText: nextProps.text,
    //             newColor: nextProps.color
    //         });
    //     }
    // }

    handleValueChange(e){
        this.state.newText = e.target.value;
        this.setState(this.state);
    }
    /**
     * 组件ColorSelector的回调处理函数，改变父组件中的newColor值
     * @param color
     */
    handleColorChange(color){
        this.state.newColor = color;
    }

    handleSubmit(e){
        e.preventDefault();

        let text = this.state.newText;
        let color = this.state.newColor;
        let id = this.props.id;

        if(text != ''){
            this.props.notifyEdits(text, color, id);
        }
    }

    render(){
        let editClass = this.props.editMode ? 'is--show' : '';

        return (
            <form className={`${style.editform} ${style[editClass]}`} onSubmit={this.handleSubmit.bind(this)}>
                <input
                    type="text"
                    onChange={this.handleValueChange.bind(this)}
                    value={this.state.newText}
                />
                <ColorSelector colorChange={this.handleColorChange.bind(this)} color={this.props.color}/>
                <input type="submit" value="Save" />
            </form>
        );
    }
}

EditItemForm.propTypes = {
    editMode: React.PropTypes.bool.isRequired,   //是否处于编辑状态
    text: React.PropTypes.string.isRequired,     //文本内容
    color: React.PropTypes.string.isRequired,    //文本颜色
    id: React.PropTypes.number.isRequired,       //文本id编号
    notifyEdits: React.PropTypes.func.isRequired //修改文本提交后的回调,会在App组件中对数据做修改处理
};


// var EditItemForm = React.createClass({
//     propTypes: {
//         editMode: React.PropTypes.bool.isRequired,
//         val: React.PropTypes.string.isRequired,
//           // colorList: React.PropTypes.array.isRequired,
//         color: React.PropTypes.string
//     },
//
//     getInitialState: function(){
//         return {
//             newName: this.props.val,
//             newColor: this.props.color
//         }
//     },
//     componentWillReceiveProps: function(nextProps){
//         // console.log('componentWillReceiveProps '+nextProps.val+' '+nextProps.color);
//         if(nextProps.editMode === false){
//             // console.log('nextprops === false');
//             this.setState({
//                 newName: nextProps.val,
//                 newColor: nextProps.color
//             });
//         }
//     },
//     handleValueChange: function(e){
//         this.state.newName = e.target.value;
//         this.setState(this.state);
//     },
//     /**
//      * 组件ColorSelector的回调处理函数，改变父组件中的newColor值
//      * @param color
//      */
//     handleColorChange: function(color){
//         this.state.newColor = color;
//     },
//
//     handleSubmit: function(e){
//         e.preventDefault();
//
//         var name = this.state.newName;
//         var color = this.state.newColor;
//         var id = this.props.id;
//
//         if(name != ''){
//             this.props.notifyEdits(name, color, id);
//         }
//     },
//     render: function(){
//         var editClass = this.props.editMode ? 'is--show' : '';
//
//         return (
//             <form className={`list__form ${editClass}`} onSubmit={this.handleSubmit}>
//                 <input
//                     className="form__inputText--lg form__inputText--addItem"
//                     type="text"
//                     ref="editInput"
//                     onChange={this.handleValueChange}
//                     value={this.state.newName}
//                 />
//                 <ColorSelector colorChange={this.handleColorChange}/>
//                 <input className="form__inputSubmit--inside" type="submit" value="Save" />
//             </form>
//         );
//     }
// });

export default EditItemForm;
