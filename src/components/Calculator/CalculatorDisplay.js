import React from 'react';
import AutoScalingText from './AutoScalingText.js';
import style from './App.scss';
/**
 *  计算器显示屏组件
 */
class CalculatorDisplay extends React.Component {

    render() {
        /**
         * 这里做法有点奇怪，上层组件只传递了一个value, props应该没值，但是打印出来又显示是object
         * 然后return 的时候又往div 传递 {..props}, 这里没必要吧，删除似乎也没有影响，这里待测试，如果没影响最后需要删除
         */
        const { value, ...props } = this.props;

        const language = navigator.language || 'en-US';

        /**
         * 这里的做法的目的是将数字去掉多余的0，并且限制小数点的位数，然后多位显示使用分隔符
         * parseFloat() 函数可解析一个字符串，并返回一个浮点数
         * toLocaleString把数组转换为本地字符串, 还接受别的参数，详情
         * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
         * maximumSignificantDigits： 最终结果限制多少位小数
         * useGrouping: 是否启用分组分隔符，比如三位有一个逗号
         */
        let formattedValue = parseFloat(value).toLocaleString(language, {
            useGrouping: true,
            maximumFractionDigits: 6
        });

        /**
         * 这里的目的是将丢掉的0重新加回去
         * Add back missing .0 in e.g. 12.0
         */
        const match = value.match(/\.\d*?(0*)$/);
        if (match)
            formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0];

        return (
            <div {...props} className={style['calculator-display']}>
                <AutoScalingText>{formattedValue}</AutoScalingText>
            </div>
        )
    }
}

/**
 * 新增
 */
CalculatorDisplay.defaultProps = {
    value: React.PropTypes.number.isRequired    //需要显示的数字
};

export default CalculatorDisplay;
