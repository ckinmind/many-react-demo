import React from 'react';
import style from './App.scss';

import CalculatorDisplay from './CalculatorDisplay';
import CalculatorKey from './CalculatorKey';


const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue
};

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: null,                //最终结果值
            displayValue: '0',          //展示在显示屏的值,只显示当前应该显示在显示屏的值，可能是操作数，也可能是值
            operator: null,             //操作符
            waitingForOperand: false    //
        };
    }

    /**
     * 将所有状态都清零：包括前后操作数，操作符等，变为初始状态
     */
    clearAll() {
        this.setState({
            value: null,
            displayValue: '0',
            operator: null,
            waitingForOperand: false
        })
    }

    /**
     * 将当前要展示的数字清零
     */
    clearDisplay() {
        this.setState({
            displayValue: '0'
        })
    }

    clearLastChar() {
        const { displayValue } = this.state

        this.setState({
            displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
        })
    }

    /**
     * 将数字取反
     */
    toggleSign() {
        const { displayValue } = this.state;
        const newValue = parseFloat(displayValue) * -1;

        this.setState({
            displayValue: String(newValue)
        })
    }

    /**
     * 将数字变成百分制，即除以100
     */
    inputPercent() {
        const { displayValue } = this.state;
        const currentValue = parseFloat(displayValue);

        if (currentValue === 0)
            return;

        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');   //fixedDigits是剔除小数点之前的内容，即比如1.2323 => 2323
        const newValue = parseFloat(displayValue) / 100;

        /**
         * toFixed() 方法可把 Number 四舍五入为指定小数位数的数字
         * 测试结果似乎是如果原来有几位小数则百分后不管是不是0，都要多加两位
         */
        this.setState({
            displayValue: String(newValue.toFixed(fixedDigits.length + 2))
        })
    }

    inputDot() {
        const { displayValue } = this.state

        if (!(/\./).test(displayValue)) {
            this.setState({
                displayValue: displayValue + '.',
                waitingForOperand: false
            })
        }
    }

    /**
     * 输入操作数字
     */
    inputDigit(digit) {
        const { displayValue, waitingForOperand } = this.state;

        /**
         * 如果是 waitingForOperand：true
         * 表示上一次已经输入了操作符，这次输入的数字是下一个操作数
         *
         * 如果是 waitingForOperand：false
         * 表示输入的不是下一个操作数，会将当前输入的和之前输入的拼接成字符串，然后更新状态（记得要判断之前的displayValue是否为0，如果是0,则是替换成新值）
         */
        if (waitingForOperand) {
            this.setState({
                displayValue: String(digit),
                waitingForOperand: false
            })
        } else {
            this.setState({
                displayValue: displayValue === '0' ? String(digit) : displayValue + digit
            })
        }
    }

    /**
     *
     */
    performOperation(nextOperator) {
        const { value, displayValue, operator } = this.state;
        const inputValue = parseFloat(displayValue);

        if (value == null) {   //点击操作符的时候，当前显示的仍然是之前输入的数
            this.setState({
                value: inputValue
            })
        } else if (operator) {   //如果已经有操作符了, 则执行操作
            const currentValue = value || 0;
            const newValue = CalculatorOperations[operator](currentValue, inputValue);

            this.setState({
                value: newValue,
                displayValue: String(newValue)
            })
        }
        // 最后更新下操作符
        this.setState({
            waitingForOperand: true,
            operator: nextOperator
        })
    }

    // handleKeyDown = (event) => {
    //     console.log(event);
    //     let { key } = event
    //
    //     if (key === 'Enter')
    //         key = '='
    //
    //     if ((/\d/).test(key)) {
    //         event.preventDefault()
    //         this.inputDigit(parseInt(key, 10))
    //     } else if (key in CalculatorOperations) {
    //         event.preventDefault()
    //         this.performOperation(key)
    //     } else if (key === '.') {
    //         event.preventDefault()
    //         this.inputDot()
    //     } else if (key === '%') {
    //         event.preventDefault()
    //         this.inputPercent()
    //     } else if (key === 'Backspace') {
    //         event.preventDefault()
    //         this.clearLastChar()
    //     } else if (key === 'Clear') {
    //         event.preventDefault()
    //
    //         if (this.state.displayValue !== '0') {
    //             this.clearDisplay()
    //         } else {
    //             this.clearAll()
    //         }
    //     }
    // };

    /**
     * 全局监听鼠标按下的操作,似乎没用？
     *
     * 更新：找到全局绑定keydown失效的原因，是因为click/tap使用了react-point这个库
     * https://github.com/ReactTraining/react-point
     * github的说明上提到一句：Note: The onClick, onTouchStart, onTouchMove, onTouchEnd, and onTouchCancel props will be overwritten because <PointTarget> needs them to do its thing).
     * 很多事件会被改写
     *
     * 新问题：这里没说keydown也会被改写
     *
     * 更新：onTouchStart似乎是类似keydown事件
     */
    // componentDidMount() {
    //     console.log('keydown');
    //     document.addEventListener('keydown', this.handleKeyDown)
    // }

    /**
     * 组件Unmount之前需要解除事件绑定，否则会对其他页面造成影响
     */
    // componentWillUnmount() {
    //     document.removeEventListener('keydown', this.handleKeyDown)
    // }

    render() {
        /**
         * 思考：每次render数据都会创建一遍，那么用const的好处是定义完后不能更改，除非重新render
         */
        const { displayValue } = this.state; //获取此时需要展示在显示屏的数字

        /**
         *  测试的时候发现有个小问题，就是AC/C键切换问题，只通过判断当前展示的数字是否为0，来决定显示是C还是AC
         *  即：如果现在操作是6-0，按到0的时候会显示AC，这应该是不对的
         *
         *  更新1：再次测试发现，C清理的是当前的数字，将其重新变为0，上一步的数字还保留；AC是将所有的数字清空
         */
        const clearDisplay = displayValue !== '0';
        const clearText = clearDisplay ? 'C' : 'AC';  //AC应该是代表全清的状态，指已经全部清空了，C则表示可以进行清理操作
        return (
            <div className="page">
                <div className={style['wrapper']}>
                    <div className={style['app-content']}>
                        {/* 正式内容*/}
                        <div className={style['calculator']}>
                            <CalculatorDisplay value={displayValue}/>
                            <div className={style['calculator-keypad']}>
                                <div className={style['input-keys']}>
                                    <div className={style['function-keys']}>
                                        <CalculatorKey className={style['key-clear']}  onPress={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorKey>
                                        <CalculatorKey className={style['key-sign']}    onPress={() => this.toggleSign()}>±</CalculatorKey>
                                        <CalculatorKey className={style['key-percent']} onPress={() => this.inputPercent()}>%</CalculatorKey>
                                    </div>
                                    <div className={style['digit-keys']}>
                                        <CalculatorKey className={style['key-0']}   onPress={this.inputDigit.bind(this,0)}>0</CalculatorKey>
                                        <CalculatorKey className={style['key-dot']} onPress={() => this.inputDot()}>●</CalculatorKey>
                                        <CalculatorKey className={style['key-1']}   onPress={() => this.inputDigit(1)}>1</CalculatorKey>
                                        <CalculatorKey className={style['key-2']}   onPress={() => this.inputDigit(2)}>2</CalculatorKey>
                                        <CalculatorKey className={style['key-3']}   onPress={() => this.inputDigit(3)}>3</CalculatorKey>
                                        <CalculatorKey className={style['key-4']}   onPress={() => this.inputDigit(4)}>4</CalculatorKey>
                                        <CalculatorKey className={style['key-5']}   onPress={() => this.inputDigit(5)}>5</CalculatorKey>
                                        <CalculatorKey className={style['key-6']}   onPress={() => this.inputDigit(6)}>6</CalculatorKey>
                                        <CalculatorKey className={style['key-7']}   onPress={() => this.inputDigit(7)}>7</CalculatorKey>
                                        <CalculatorKey className={style['key-8']}   onPress={() => this.inputDigit(8)}>8</CalculatorKey>
                                        <CalculatorKey className={style['key-9']}   onPress={() => this.inputDigit(9)}>9</CalculatorKey>
                                    </div>
                                </div>
                                <div className={style['operator-keys']}>
                                    <CalculatorKey className={style['key-divide']}   onPress={() => this.performOperation('/')}>÷</CalculatorKey>
                                    <CalculatorKey className={style['key-multiply']} onPress={() => this.performOperation('*')}>×</CalculatorKey>
                                    <CalculatorKey className={style['key-subtract']} onPress={() => this.performOperation('-')}>−</CalculatorKey>
                                    <CalculatorKey className={style['key-add']}      onPress={() => this.performOperation('+')}>+</CalculatorKey>
                                    <CalculatorKey className={style['key-equals']}   onPress={() => this.performOperation('=')}>=</CalculatorKey>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default Calculator;