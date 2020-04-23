/**
 * @private
 * @description 处理颜色渐变
 * @param {array} color 渐变的颜色
 * @param {string} type 渐变的方式 bottom||right 默认自上而下
 * @return {object} echarts所使用的渐变颜色对象 
 * @example
 * _linearGradient(['#8e48ee', '#05a7fb'], 'bottom');
 */
function _linearGradient(color, type) {
    var arr = color.slice(0, 2).map(function (item, i) {
        return {
            offset: i,
            color: item
        }
    })
    return type === 'right' ? new echarts.graphic.LinearGradient(0, 0, 1, 0, arr) : new echarts.graphic.LinearGradient(0, 0, 0, 1, arr);
}
/**
 * @private
 * @description 继承
 * @param {function} son 子类
 * @param {function} father 父类
 * @param {object} extend 额外扩展的方法
 * @example
 * _perfectInherit(barChart,Chart);
 */
function _perfectInherit(son, father, extend) {
    var o = Object.create(father.prototype, {
        constructor: {
            value: son
        }
    });
    son.prototype = Object.assign(o, extend);
};

/**工具类
 * @class
 * @description 工具类
 */
function Tool() {}
/**
 * @method
 * @description 检测数据类型
 * @param {*} target 需要检测的数据
 * @return {string}
 * @example
 * Tool.isType('test')
 */
Tool.isType = function (target) {
    var res = Object.prototype.toString.call(target);
    return res.slice(8, res.length - 1);
}
/**
 * @method
 * @description 将数字四舍五入保留到N位小数
 * @param {string|number} num 数字
 * @param {number} n 保留的小数位数
 * @return {string}
 * @example
 * Tool.keepDecimal(16,1)
 */
Tool.keepDecimal = function (num, n) {
    var times = Math.pow(10, n);
    return (Math.round(num * times) / times).toFixed(n)
}

/**所有chart的父类
 * @class
 * @description 所有chart的父类 子类会被继承父类的方法属性 但不可直接调用
 */
function Chart(option) {
    this._chart = null;
    this._option = Object.assign({
        fontColor: '#fff'
    }, option);
    if (this._option.data) {
        this._createOption();
    };
}
/**
 * @method
 * @description 绘制的方法
 * @return {object} 返回调用者本身 支持链式调用
 * @example
 * chart.draw();
 */
Chart.prototype.draw = function () {
    if (this._option.data) {
        if (this._chart) {
            this._chart.clear();
            this._chart.dispose();
        }
        this._chart = echarts.init(document.getElementById(this._option.ele));
        this._chart.setOption(this._configuration, true);
    };
    return this;
};
/**
 * @method
 * @description 设置/更新 option中的data的方法
 * @param {array} data 同option.data一样
 * @param {string} data.name 数据名称（必填）
 * @param {number} data.value 数据值（必填）
 * @return {object} 返回调用者本身 支持链式调用
 * @example
 * chart.setData(data).draw();
 */
Chart.prototype.setData = function (data) {
    this._option.data = data;
    this._createOption();
    return this;
};
Chart.prototype.setSeries = function (series) {
    this._option.series = series;
    return this;
};
Chart.prototype.addOption = function (option) {
    this._option = Object.assign(this._option, option);
    return this;
};

/**图表的公共模板
 * @class
 * @description 图表的公共模板 相当于一个封装好的壳子 具体参数要按照echarts的参数来传递
 * @param {object} option 包含所有参数 
 * @param {string} option.ele 图表容器的id （必填）
 * @param {number} option.fontSize 图表中字体的大小 （必填） 
 * @param {string} option.fontColor 图表中字体的颜色 默认#fff
 * @param {array} option.palletColors 图表的调色板，颜色从中依次选取 支持渐变（必填）
 * @param {array} option.series 图表中所有图例的集合 除本文档介绍的参数外 支持echart中series的参数扩展 本文档未作介绍（必填）
 * @param {array} option.data 图表中所有图例的数据的集合 同series也支持echart中的参数扩展 可以不设置 后续通过.setData设置
 * @param {string} option.data.name 数据名称（必填）
 * @param {number} option.data.value 数据值（必填）
 * @return {object} 创建的实例对象
 * @example 
 * var chart = new commonChart({
    ele: 'container',
    fontSize: 14,
    fontColor: '#fff',
    palletColors: [
        ['#8e48ee', '#05a7fb'],
        '#fdc26e'
    ],
    //其他参数...
    series: [{}, {}],
    data: [
        [],
        []
    ]
});
 */
function commonChart(option) {
    Chart.call(this, option);
}
_perfectInherit(commonChart, Chart, {
    _createOption: function () {
        var option = this._option,
            basicSize = option.fontSize;
        option.series.map(function (item, i) {
            item.data = option.data[i];
        });
        this._configuration = Object.assign({
            backgroundColor: 'transparent',
            color: option.palletColors.map(function (item) {
                return Array.isArray(item) ? _linearGradient(item) : item;
            }),
            textStyle: {
                fontSize: basicSize,
                color: option.fontColor
            }
        }, option)
    }
})

/**单一条形图
 * @class
 * @description 单一条形图（支持多系列）
 * @param {object} option 包含所有参数 
 * @param {string} option.ele 图表容器的id （必填）
 * @param {number} option.fontSize 图表中字体的大小 （必填） 
 * @param {string} option.fontColor 图表中字体的颜色 默认#fff
 * @param {array} option.palletColors 图表的调色板，颜色从中依次选取 支持渐变（必填）
 * @param {string} option.unit 当前图例的单位 默认没有单位
 * @param {number} option.unitTextindent 单位缩进几个字符 默认不缩进 0
 * @param {number} option.showUnitMethod 单位显示方式  1 在坐标轴上显示 2 在值后面显示 默认1
 * @param {number} option.transUnit 单位在坐标轴上显示时单位的转换 如transUnit=10000 值会除以10000加上单位万  默认1
 * @param {number} option.barBorderRadius 条形图圆角半径 px 支持传入数组分别指定 4 个圆角半径 默认0
 * @param {object} option.legend 图表legend组件相关配置 支持echart中legend的参数扩展 默认不显示
 * @param {object} option.grid 如需调整图表的位置 传参数覆盖默认设置
 * @param {object} option.xAxisLabel 图表x轴刻度标签的相关设置  默认不进行操作
 * @param {number} option.xAxisLabel.rotate 刻度标签旋转的角度 默认0
 * @param {function} option.xAxisLabel.formatter 刻度标签的内容格式器
 * @param {array} option.series 图表中所有图例的集合 除本文档介绍的参数外 支持echart中series的参数扩展 本文档未作介绍（必填）
 * @param {string} option.series.type 当前图例的类型 bar/pictorialBar 条形图/有间隔的条形图 （必填）
 * @param {string} option.series.name 当前图例的名字 （必填）
 * @param {array} option.data 图表中所有图例的数据的集合 同series也支持echart中的参数扩展 可以不设置 后续通过.setData设置
 * @param {string} option.data.name 数据名称（必填）
 * @param {number} option.data.value 数据值（必填）
 * @return {object} 创建的实例对象
 * @example
 * var chart = new BarChart({
    ele: 'container',
    fontSize: 14,
    fontColor: '#fff',
    palletColors: [
        ['#8e48ee', '#05a7fb'],
        '#fdc26e'
    ],
    unit: '件',
    unitTextindent: 0,
    showUnitMethod: 1,
    transUnit: 10000,
    xAxisLabel: {
        rotate: 45
    },
    series: [{
            type: 'bar',
            name: '成果数量',
            barWidth: '40%',
            barGap: 0
        },
        {
            type: 'bar',
            name: '需求数量',
            barWidth: '40%',
        }
    ],
    data: [
        [{ "name": "新能源", "value": 29605 }, { "name": "人工智能", "value": 166941 }, { "name": "生物", "value": 44731 }, { "name": "网路空间", "value": 22611 }, { "name": "海洋", "value": 585 }, { "name": "太空", "value": 20474 }],
        [{ "name": "新能源", "value": 24384 }, { "name": "人工智能", "value": 147840 }, { "name": "生物", "value": 34731 }, { "name": "网路空间", "value": 18611 }, { "name": "海洋", "value": 427 }, { "name": "太空", "value": 17925 }]
    ]
});
chart.draw();
 */
function BarChart(option) {
    Chart.call(this, option);
}
_perfectInherit(BarChart, Chart, {
    _createOption: function () {
        var option = this._option,
            basicSize = option.fontSize,
            categoryData = [];
        option.data[0].map(function (item) {
            categoryData.push(item.name);
        })
        this._configuration = {
            backgroundColor: 'transparent',
            color: option.palletColors.map(function (item) {
                return Array.isArray(item) ? _linearGradient(item) : item;
            }),
            textStyle: {
                fontSize: basicSize,
                color: option.fontColor
            },
            legend: Object.assign({
                show: false,
                top: 0.6 * basicSize,
                left: 'center',
                textStyle: {
                    color: option.fontColor
                },
                padding: 0,
                itemGap: 2 * basicSize,
                itemWidth: 0.6 * basicSize,
                itemHeight: 0.6 * basicSize,
                data: option.series.map(function (item) {
                    return {
                        name: item.name,
                        icon: 'circle'
                    }
                })
            }, option.legend),
            tooltip: Object.assign({
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (res) {
                    var tem = '<div style="padding:0 ' + basicSize * 0.5 + 'px;font-size:' + basicSize + 'px;line-height:1.5;">';
                    res.map(function (item, i) {
                        var marker;
                        if (Tool.isType(item.color) === 'Object') {
                            marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:linear-gradient(to bottom, ' + item.color.colorStops[0].color + ', ' + item.color.colorStops[1].color + ');"></span>';
                        } else {
                            marker = item.marker;
                        }
                        if (i === 0) {
                            tem += '<p>' + item.name + '</p>';
                        }
                        tem += '<p>' + marker + item.seriesName + '：' + item.value + (option.unit || '') + '</p>';
                    })
                    tem += '</div>';
                    return tem
                }
            }, option.tooltip),
            grid: Object.assign({
                top: 3 * basicSize,
                left: 0.6 * basicSize,
                right: 0.6 * basicSize,
                bottom: 0.6 * basicSize,
                containLabel: true
            }, option.grid),
            xAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: option.fontColor
                    }
                },
                axisLabel: Object.assign({
                    interval: 0,
                    margin: 0.5 * basicSize,
                    fontSize: basicSize,
                }, option.xAxisLabel),
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: categoryData
            },
            yAxis: (function () {
                var monad = {
                        1000: '千',
                        10000: '万',
                        1000000: '百万',
                        10000000: '千万',
                        100000000: '亿',
                    },
                    transUnit = option.transUnit || 1,
                    curMonad = monad[transUnit],
                    res = {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: option.fontColor
                            }
                        },
                        axisLabel: {
                            fontSize: basicSize
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                        }
                    };

                switch (option.showUnitMethod) {
                    case 2:
                        res.axisLabel.formatter = function (value) {
                            return (curMonad ? (value / transUnit) + curMonad : value) + (option.unit || '');
                        }
                        break;
                    case 1:
                    default:
                        res.axisLabel.formatter = function (value) {
                            return curMonad ? (value / transUnit) + curMonad : value;
                        }
                        Object.assign(res, {
                            name: option.unit ? "单位：(" + option.unit + ")" : '',
                            nameGap: 1 * basicSize,
                            nameTextStyle: {
                                padding: [0, 0, 0, (option.unitTextindent || 0) * basicSize]
                            }
                        });
                }
                return res
            })(),
            series: option.series.map(function (item, i) {
                var res = {
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: option.barBorderRadius || 0
                        }
                    },
                    data: option.data[i]
                };
                switch (item.type) {
                    case 'bar':
                        Object.assign(res, item)
                        break;
                    case 'pictorialBar':
                        Object.assign(res, {
                            symbol: 'rect',
                            symbolSize: ['100%', '25%'],
                            symbolRepeat: true,
                            animationDelay: function (dataIndex, params) {
                                return params.index * 30;
                            }
                        }, item)
                        break;
                };
                return res;
            })
        };
    }
})

/**单一折线图
 * @class
 * @description 单一折线图（支持多系列）
 * @param {object} option 包含所有参数 
 * @param {string} option.ele 图表容器的id （必填）
 * @param {number} option.fontSize 图表中字体的大小 （必填） 
 * @param {string} option.fontColor 图表中字体的颜色 默认#fff
 * @param {array} option.palletColors 图表的调色板，颜色从中依次选取 支持渐变（必填）
 * @param {string} option.unit 当前图例的单位 默认没有单位
 * @param {number} option.unitTextindent 单位缩进几个字符 默认不缩进 0
 * @param {number} option.showUnitMethod 单位显示方式  1 在坐标轴上显示 2 在值后面显示 默认1
 * @param {number} option.transUnit 单位在坐标轴上显示时单位的转换 如transUnit=10000 值会除以10000加上单位万  默认1
 * @param {object} option.legend 图表legend组件相关配置 支持echart中legend的参数扩展 默认不显示
 * @param {object} option.grid 如需调整图表的位置 传参数覆盖默认设置
 * @param {object} option.xAxisLabel 图表x轴刻度标签的相关设置  默认不进行操作
 * @param {number} option.xAxisLabel.rotate 刻度标签旋转的角度 默认0
 * @param {function} option.xAxisLabel.formatter 刻度标签的内容格式器
 * @param {array} option.series 图表中所有图例的集合 除本文档介绍的参数外 支持echart中series的参数扩展 本文档未作介绍（必填）
 * @param {string} option.series.name 当前图例的名字 （必填）
 * @param {boolean} option.series.showSymbol 是否显示小圆点 默认true 显示
 * @param {boolean} option.series.step  是否是阶梯线图 默认false 不显示
 * @param {boolean} option.series.smooth 是否平滑曲线显示 默认false不平滑
 * @param {array} option.data 图表中所有图例的数据的集合 同series也支持echart中的参数扩展 可以不设置 后续通过.setData设置
 * @param {string} option.data.name 数据名称（必填）
 * @param {number} option.data.value 数据值（必填）
 * @return {object} 创建的实例对象
 * @example
 * var chart = new LineChart({
    ele: 'container',
    fontSize: 14,
    fontColor: '#fff',
    palletColors: [
        ['#8e48ee', '#05a7fb'],
        '#fdc26e'
    ],
    unit: '件',
    unitTextindent: 0,
    showUnitMethod: 1,
    transUnit: 1,
    series: [{
            name: '成果数量',
            showSymbol: true,
            step: false,
            smooth: true
        },
        {
            name: '需求数量',
            showSymbol: true,
            step: true,
            smooth: false
        }
    ],
    data: [ [{ "name": 2013, "value": 12 }, { "name": 2014, "value": 9.5 }, { "name": 2015, "value": 5.1 }, { "name": 2016, "value": 6.1 }, { "name": 2017, "value": 6.3 }, { "name": 2018, "value": 7.8 }], [{ "name": 2013, "value": 8.1 }, { "name": 2014, "value": 10.5 }, { "name": 2015, "value": 8.1 }, { "name": 2016, "value": 9.1 }, { "name": 2017, "value": 9.3 }, { "name": 2018, "value": 2.8 }], ]
});
chart.draw();
 */
function LineChart(option) {
    Chart.call(this, option);
}
_perfectInherit(LineChart, Chart, {
    _createOption: function () {
        var option = this._option,
            basicSize = option.fontSize,
            categoryData = [];
        option.data[0].map(function (item) {
            categoryData.push(item.name);
        })
        this._configuration = {
            backgroundColor: 'transparent',
            color: option.palletColors.map(function (item) {
                return Array.isArray(item) ? _linearGradient(item) : item;
            }),
            textStyle: {
                fontSize: basicSize,
                color: option.fontColor
            },
            legend: Object.assign({
                show: false,
                top: 0.6 * basicSize,
                left: 'center',
                textStyle: {
                    color: option.fontColor
                },
                padding: 0,
                itemGap: 2 * basicSize,
                itemWidth: 1.2 * basicSize,
                itemHeight: 0.6 * basicSize,
                data: option.series.map(function (item) {
                    return {
                        name: item.name
                    }
                })
            }, option.legend),
            tooltip: Object.assign({
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (res) {
                    var tem = '<div style="padding:0 ' + basicSize * 0.5 + 'px;font-size:' + basicSize + 'px;line-height:1.5;">';
                    res.map(function (item, i) {
                        var marker;
                        if (Tool.isType(item.color) === 'Object') {
                            marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:linear-gradient(to bottom, ' + item.color.colorStops[0].color + ', ' + item.color.colorStops[1].color + ');"></span>';
                        } else {
                            marker = item.marker;
                        }
                        if (i === 0) {
                            tem += '<p>' + item.name + '</p>';
                        }
                        tem += '<p>' + marker + item.seriesName + '：' + item.value + (option.unit || '') + '</p>';
                    })
                    tem += '</div>';
                    return tem
                }
            }, option.tooltip),
            grid: Object.assign({
                top: 3 * basicSize,
                left: 1.2 * basicSize,
                right: 3 * basicSize,
                bottom: 0.6 * basicSize,
                containLabel: true
            }, option.grid),
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: option.fontColor
                    }
                },
                axisLabel: Object.assign({
                    interval: 0,
                    margin: 0.5 * basicSize,
                    fontSize: basicSize,
                }, option.xAxisLabel),
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: categoryData
            },
            yAxis: (function () {
                var monad = {
                        1000: '千',
                        10000: '万',
                        1000000: '百万',
                        10000000: '千万',
                        100000000: '亿',
                    },
                    transUnit = option.transUnit || 1,
                    curMonad = monad[transUnit],
                    res = {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: option.fontColor
                            }
                        },
                        axisLabel: {
                            fontSize: basicSize
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                        }
                    };
                switch (option.showUnitMethod) {
                    case 2:
                        res.axisLabel.formatter = function (value) {
                            return (curMonad ? (value / transUnit) + curMonad : value) + (option.unit || '');
                        }
                        break;
                    case 1:
                    default:
                        res.axisLabel.formatter = function (value) {
                            return curMonad ? (value / transUnit) + curMonad : value;
                        }
                        Object.assign(res, {
                            name: option.unit ? "单位：(" + option.unit + ")" : '',
                            nameGap: 1 * basicSize,
                            nameTextStyle: {
                                padding: [0, 0, 0, (option.unitTextindent || 0) * basicSize]
                            }
                        });
                }
                return res
            })(),
            series: option.series.map(function (item, i) {
                return Object.assign({
                    type: 'line',
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    data: option.data[i]
                }, item);
            })
        };
    }
})

/**条形和折线结合图
 * @class
 * @description 条形和折线结合图
 * @param {object} option 包含所有参数 
 * @param {string} option.ele 图表容器的id （必填）
 * @param {number} option.fontSize 图表中字体的大小 （必填） 
 * @param {string} option.fontColor 图表中字体的颜色 默认#fff
 * @param {array} option.palletColors 图表的调色板，颜色从中依次选取 支持渐变（必填）
 * @param {object} option.grid 如需调整图表的位置 传参数覆盖默认设置
 * @param {object} option.xAxisLabel 图表x轴刻度标签的相关设置  默认不进行操作
 * @param {number} option.xAxisLabel.rotate 刻度标签旋转的角度 默认0
 * @param {function} option.xAxisLabel.formatter 刻度标签的内容格式器
 * @param {array} option.series 图表中所有图例的集合 除本文档介绍的参数外 支持echart中series的参数扩展 本文档未作介绍（必填）
 * @param {string} option.series.type 当前图例的类型 line / bar / pictorialBar 折线图/条形图/有间隔的条形图 （必填）
 * @param {string} option.series.name 当前图例的名字 （必填）
 * @param {string} option.series.unit 当前图例的单位 默认没有单位
 * @param {number} option.series.unitTextindent 单位缩进几个字符 默认不缩进 0
 * @param {number} option.series.showUnitMethod 单位显示方式  1 在坐标轴上显示 2 在值后面显示 默认1
 * @param {number} option.series.transUnit 单位在坐标轴上显示时单位的转换 如transUnit=10000 值会除以10000加上单位万  默认1
 * @param {array} option.data 图表中所有图例的数据的集合 同series也支持echart中的参数扩展 可以不设置 后续通过.setData设置
 * @param {string} option.data.name 数据名称（必填）
 * @param {number} option.data.value 数据值（必填）
 * @return {object} 创建的实例对象
 * @example
 * var chart = new BarLineChart({
    ele: 'container',
    fontSize: 14,
    fontColor: '#fff',
    palletColors: [
        ['#8e48ee', '#05a7fb'],
        '#fdc26e'
    ],
    series: [{
            type: 'pictorialBar',
            name: '技术交易额',
            unit: '次',
            unitTextindent: -1,
            showUnitMethod: 1,
            transUnit: 1,
            barWidth: '40%',
        },
        {
            type: 'line',
            name: '发展趋势',
            unit: '%',
            showUnitMethod: 2,
        }
    ],
    data: [
        [{ "name": 2013, "value": 1248.5 }, { "name": 2014, "value": 1366.7 }, { "name": 2015, "value": 1436.8 }, { "name": 2016, "value": 1800 }, { "name": 2017, "value": 1620 }, { "name": 2018, "value": 1747.2 }],
        [{ "name": 2013, "value": 10.1 }, { "name": 2014, "value": 9.5 }, { "name": 2015, "value": 5.1 }, { "name": 2016, "value": 6.1 }, { "name": 2017, "value": 6.3 }, { "name": 2018, "value": 7.8 }]
    ]
});
chart.draw();
 * */
function BarLineChart(option) {
    Chart.call(this, option);
}
_perfectInherit(BarLineChart, Chart, {
    _createOption: function (option) {
        var option = this._option,
            basicSize = option.fontSize,
            categoryData = [];
        option.data[0].map(function (item) {
            categoryData.push(item.name);
        })
        this._configuration = {
            backgroundColor: 'transparent',
            color: option.palletColors.map(function (item) {
                return Array.isArray(item) ? _linearGradient(item) : item;
            }),
            textStyle: {
                fontSize: basicSize,
                color: option.fontColor
            },
            legend: Object.assign({
                top: 0.6 * basicSize,
                left: 'center',
                textStyle: {
                    color: option.fontColor
                },
                padding: 0,
                itemGap: 2 * basicSize,
                itemWidth: 0.6 * basicSize,
                itemHeight: 0.6 * basicSize,
                data: option.series.map(function (item) {
                    return {
                        name: item.name,
                        icon: 'circle'
                    }
                })
            }, option.legend),
            tooltip: Object.assign({
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (res) {
                    var tem = '<div style="padding:0 ' + basicSize * 0.5 + 'px;font-size:' + basicSize + 'px;line-height:1.5;">';
                    res.map(function (item, i) {
                        var marker;
                        if (Tool.isType(item.color) === 'Object') {
                            marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:linear-gradient(to bottom, ' + item.color.colorStops[0].color + ', ' + item.color.colorStops[1].color + ');"></span>';
                        } else {
                            marker = item.marker;
                        }
                        if (i === 0) {
                            tem += '<p>' + item.name + '</p>';
                        }
                        tem += '<p>' + marker + item.seriesName + '：' + item.value + (option.series[i].unit || '') + '</p>';
                    })
                    tem += '</div>';
                    return tem
                }
            }, option.tooltip),
            grid: Object.assign({
                top: 3.6 * basicSize,
                left: 0.6 * basicSize,
                right: 0.6 * basicSize,
                bottom: 0.6 * basicSize,
                containLabel: true
            }, option.grid),
            xAxis: {
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: option.fontColor
                    }
                },
                axisLabel: Object.assign({
                    interval: 0,
                    margin: 0.5 * basicSize,
                    fontSize: basicSize,
                }, option.xAxisLabel),
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                data: categoryData
            },
            yAxis: option.series.map(function (item) {
                var monad = {
                        1000: '千',
                        10000: '万',
                        1000000: '百万',
                        10000000: '千万',
                        100000000: '亿',
                    },
                    transUnit = item.transUnit || 1,
                    curMonad = monad[transUnit],
                    res = {
                        type: 'value',
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            fontSize: basicSize
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        }
                    };
                switch (item.showUnitMethod) {
                    case 2:
                        res.axisLabel.formatter = function (value) {
                            return (curMonad ? (value / transUnit) + curMonad : value) + (item.unit || '');
                        }
                        break;
                    case 1:
                    default:
                        res.axisLabel.formatter = function (value) {
                            return curMonad ? (value / transUnit) + curMonad : value;
                        }
                        Object.assign(res, {
                            name: item.unit ? "单位：(" + item.unit + ")" : '',
                            nameGap: 1 * basicSize,
                            nameTextStyle: {
                                padding: [0, 0, 0, (item.unitTextindent || 0) * basicSize]
                            }
                        });
                }
                return res
            }),
            series: option.series.map(function (item, i) {
                var res = {
                    yAxisIndex: i,
                    data: option.data[i]
                };
                switch (item.type) {
                    case 'bar':
                        Object.assign(res, {
                            label: {
                                normal: {
                                    show: false
                                }
                            }
                        }, item)
                        break;
                    case 'pictorialBar':
                        Object.assign(res, {
                            symbol: 'rect',
                            symbolSize: ['100%', '25%'],
                            symbolRepeat: true,
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            animationDelay: function (dataIndex, params) {
                                return params.index * 30;
                            }
                        }, item)
                        break;
                    case 'line':
                        Object.assign(res, {
                            symbol: 'circle',
                            symbolSize: 0.5 * basicSize,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: item.showUnitMethod === 2 ? '{c}' + (item.unit || '') : '{c}'
                                }
                            },
                            lineStyle: {
                                normal: {
                                    width: 0.1 * basicSize
                                }
                            }
                        }, item)
                        break;
                };
                return res;
            })
        }
    }
})

/**饼图
 * @class
 * @description 饼图
 * @param {object} option 包含所有参数 
 * @param {string} option.ele 图表容器的id （必填）
 * @param {number} option.fontSize 图表中字体的大小 （必填） 
 * @param {string} option.fontColor 图表中字体的颜色 默认#fff
 * @param {array} option.palletColors 图表的调色板，颜色从中依次选取 支持渐变（必填）
 * @param {boolean} option.showTooltip 图表是否显示tooltip组件 默认false不显示
 * @param {object} option.legend 图表legend组件相关配置 支持echart中legend的参数扩展 默认不显示
 * @param {object} option.series 饼图的参数 除本文档介绍的参数外 支持echart中series的参数扩展 本文档未作介绍（必填）
 * @param {string} option.series.name 饼图的名字（必填）
 * @param {array} option.series.center 饼图圆心的位置 默认 ['50%', '50%']
 * @param {number|string|array} option.series.radius 饼图的半径 默认 [0, '75%']
 * @param {number} option.series.startAngle 饼图的起始角度 默认90 
 * @param {number} option.series.labelDecimal 饼图图形上百分数保留的小数 默认保留2为小数
 * @param {number} option.series.labelNameLength 饼图图形上文本标签长度限制 超过这个长度则会折行 默认不折行
 * @param {number} option.series.labelLine1 饼图图形上标签视觉引导线第一段的长度 默认一个字体的长度
 * @param {number} option.series.labelLine2 饼图图形上标签视觉引导线第二段的长度 默认一个字体的长度
 * @param {array} option.data 饼图的数据 同series也支持echart中的参数扩展 可以不设置 后续通过.setData设置
 * @param {string} option.data.name 数据名称（必填）
 * @param {number} option.data.value 数据值（必填）
 * @return {object} 创建的实例对象
 * @example
 * var chart = new PieChart({
    ele: 'container',
    fontSize: 14,
    fontColor: '#fff',
    palletColors: [
        ['#8e48ee', '#05a7fb'],
        '#fdc26e'
    ],
    showTooltip: true,
    series: {
        name: '实验室数量',
        center: ['50%', '50%'],
        radius: ['40%', '65%'],
        startAngle: 0,
        labelDecimal: 1,
        labelNameLength: 3
    },
    data: [{ "name": "人工智能", "value": 39 }, { "name": "生物", "value": 25 }, { "name": "网络空间", "value": 23 }, { "name": "新能源", "value": 17 }, { "name": "太空", "value": 4 } ]
});
chart.draw();
 */
function PieChart(option) {
    Chart.call(this, option);
}
_perfectInherit(PieChart, Chart, {
    _createOption: function () {
        var option = this._option,
            basicSize = option.fontSize;
        this._configuration = {
            backgroundColor: 'transparent',
            color: option.palletColors.map(function (item) {
                return Array.isArray(item) ? _linearGradient(item) : item;
            }),
            textStyle: {
                fontSize: basicSize,
                color: option.fontColor
            },
            legend: Object.assign({
                show: false,
                top: '4%',
                left: 'center',
                textStyle: {
                    color: option.fontColor
                },
                padding: 0,
                itemGap: basicSize,
                itemWidth: 1.6 * basicSize,
                itemHeight: basicSize,
                data: option.data.map(function (item) {
                    return item.name
                })
            }, option.legend),
            tooltip: Object.assign({
                show: option.showTooltip || false,
                trigger: 'item',
                formatter: function (res) {
                    var marker;
                    if (Tool.isType(res.color) === 'Object') {
                        marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:linear-gradient(to bottom, ' + res.color.colorStops[0].color + ', ' + res.color.colorStops[1].color + ');"></span>';
                    } else {
                        marker = res.marker;
                    }
                    return '<div style="padding:0 ' + basicSize * 0.5 + 'px;font-size:' + basicSize + 'px;line-height:1.5;"><p>' + res.name + '</p><p>' + marker + res.seriesName + '：' + res.value + '</p></div>';
                }
            }, option.tooltip),
            series: Object.assign({
                type: 'pie',
                data: option.data,
                label: {
                    normal: {
                        formatter: function (e) {
                            var num = option.series.labelDecimal,
                                percent = num === undefined ? e.percent : Tool.keepDecimal(e.percent, num),
                                len = option.series.labelNameLength || Infinity,
                                name = e.name.length > len ? (e.name.slice(0, len) + '\n' + e.name.slice(len)) : e.name;
                            return name + '：' + percent + "%";
                        }
                    }
                },
                labelLine: {
                    normal: {
                        smooth: 0,
                        length: option.series.labelLine1 || basicSize,
                        length2: option.series.labelLine2 || basicSize
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
            }, option.series)
        };
    }
})

/**南丁格尔图
 * @class
 * @description 南丁格尔图
 * @param {object} option 包含所有参数 
 * @param {string} option.ele 图表容器的id （必填）
 * @param {number} option.fontSize 图表中字体的大小 （必填） 
 * @param {string} option.fontColor 图表中字体的颜色 默认#fff
 * @param {array} option.palletColors 图表的调色板，颜色从中依次选取 支持渐变（必填）
 * @param {boolean} option.showTooltip 图表是否显示tooltip组件 默认false不显示
 * @param {object} option.legend 图表legend组件相关配置 支持echart中legend的参数扩展 默认不显示
 * @param {object} option.series 南丁格尔图的参数 除本文档介绍的参数外 支持echart中series的参数扩展 本文档未作介绍（必填）
 * @param {string} option.series.name 南丁格尔图的名字（必填）
 * @param {string} option.series.roseType 南丁格尔图的形式 'radius'|'area' 默认'area'
 * @param {array} option.series.center 南丁格尔图圆心的位置 默认 ['50%', '50%']
 * @param {number|string|array} option.series.radius 南丁格尔图的半径 默认 [0, '75%']
 * @param {number} option.series.startAngle 南丁格尔图的起始角度 默认90 
 * @param {number} option.series.labelDecimal 南丁格尔图图形上百分数保留的小数 默认保留2为小数
 * @param {number} option.series.labelNameLength 南丁格尔图图形上文本标签长度限制 超过这个长度则会折行 默认不折行
 * @param {number} option.series.labelLine1 南丁格尔图图形上标签视觉引导线第一段的长度 默认一个字体的长度
 * @param {number} option.series.labelLine2 南丁格尔图图形上标签视觉引导线第二段的长度 默认一个字体的长度
 * @param {array} option.data 南丁格尔图的数据 同series也支持echart中的参数扩展 可以不设置 后续通过.setData设置
 * @param {string} option.data.name 数据名称（必填）
 * @param {number} option.data.value 数据值（必填）
 * @return {object} 创建的实例对象
 * @example
 * var chart = new RosePieChart({
    ele: 'container',
    fontSize: 14,
    fontColor: '#fff',
    palletColors: [
        ['#8e48ee', '#05a7fb'],
        '#fdc26e'
    ],
    showTooltip: true,
    series: {
        name: '实验室数量',
        center: ['50%', '50%'],
        radius: ['0%', '55%'],
        startAngle: 0,
        labelDecimal: 1,
        labelNameLength: 10
    },
    data: [{ "name": "人工智能", "value": 39 }, { "name": "生物", "value": 25 }, { "name": "网络空间", "value": 23 }, { "name": "新能源", "value": 17 }, { "name": "太空", "value": 4 } ]
});
chart.draw();
 */
function RosePieChart(option) {
    Chart.call(this, option);
}
_perfectInherit(RosePieChart, Chart, {
    _createOption: function () {
        var option = this._option,
            basicSize = option.fontSize,
            sum = 0,
            mData = option.data.map(function (item) {
                sum += item.value;
                return {
                    name: item.name,
                    reserveValue: item.value,
                    value: Math.log(item.value)
                }
            });
        this._configuration = {
            backgroundColor: 'transparent',
            color: option.palletColors.map(function (item) {
                return Array.isArray(item) ? _linearGradient(item) : item;
            }),
            textStyle: {
                fontSize: basicSize,
                color: option.fontColor
            },
            legend: Object.assign({
                show: false,
                top: '4%',
                left: 'center',
                textStyle: {
                    color: option.fontColor
                },
                padding: 0,
                itemGap: basicSize,
                itemWidth: 1.6 * basicSize,
                itemHeight: basicSize,
                data: mData.map(function (item) {
                    return item.name
                })
            }, option.legend),
            tooltip: Object.assign({
                show: option.showTooltip || false,
                trigger: 'item',
                formatter: function (res) {
                    var marker;
                    if (Tool.isType(res.color) === 'Object') {
                        marker = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background:linear-gradient(to bottom, ' + res.color.colorStops[0].color + ', ' + res.color.colorStops[1].color + ');"></span>';
                    } else {
                        marker = res.marker;
                    }
                    return '<div style="padding:0 ' + basicSize * 0.5 + 'px;font-size:' + basicSize + 'px;line-height:1.5;"><p>' + res.name + '</p><p>' + marker + res.seriesName + '：' + res.data.reserveValue + '</p></div>';
                }
            }, option.tooltip),
            series: Object.assign({
                type: 'pie',
                roseType: 'area',
                data: mData,
                label: {
                    normal: {
                        formatter: function (e) {
                            var num = option.series.labelDecimal === undefined ? 2 : option.series.labelDecimal,
                                percent = Tool.keepDecimal(e.data.reserveValue / sum * 100, num),
                                len = option.series.labelNameLength || Infinity,
                                name = e.name.length > len ? (e.name.slice(0, len) + '\n' + e.name.slice(len)) : e.name;
                            return name + '：' + percent + "%";
                        }
                    }
                },
                labelLine: {
                    normal: {
                        smooth: 0,
                        length: option.series.labelLine1 || basicSize,
                        length2: option.series.labelLine2 || basicSize
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
            }, option.series)
        };
    }
})

/**雷达图
 * @class
 * @description 雷达图
 * @param {object} option 包含所有参数 
 * @param {string} option.ele 图表容器的id （必填）
 * @param {number} option.fontSize 图表中字体的大小 （必填） 
 * @param {string} option.fontColor 图表中字体的颜色 默认#fff
 * @param {array} option.palletColors 图表的调色板，颜色从中依次选取 支持渐变（必填）
 * @param {object} option.radarAxis 雷达图的坐标系
 * @param {string} option.radarAxis.shape 雷达图绘制类型 支持 'polygon' 和 'circle' 默认'polygon'
 * @param {array} option.radarAxis.center 雷达图的圆心 默认['50%', '50%']
 * @param {number|string|array} option.radarAxis.radius 雷达图的半径 默认75%
 * @param {number} option.radarAxis.startAngle 雷达图起始角度 默认90  
 * @param {object} option.series 雷达图的参数 除本文档介绍的参数外 支持echart中series的参数扩展 本文档未作介绍（必填）
 * @param {string} option.series.name 雷达图的名字（必填）
 * @param {array} option.data 雷达图的数据 同series也支持echart中的参数扩展 可以不设置 后续通过.setData设置
 * @param {string} option.data.name 数据名称（必填）
 * @param {number} option.data.max 数据最大值（必填）
 * @param {number} option.data.value 数据值（必填）
 * @return {object} 创建的实例对象
 * @example
 * var chart = new RadarChart({
    ele: 'container',
    fontSize: 14,
    fontColor: '#fff',
    palletColors: [
        ['#8e48ee', '#05a7fb']
    ],
    radarAxis: {
        shape: 'circle',
        center: ['50%', '50%'],
        radius: '70%',
        startAngle: 90
    },
    series: {
        name: '鲲鹏指数'
    },
    data: [{ name: '资质完备度指数', max: 5.0, value: 3.1 }, { name: '参与度指数', max: 5.0, value: 4.2 }, { name: '资本活跃度指数', max: 5.0, value: 1.2 }, { name: '研发投入度指数', max: 5.0, value: 4.5 }, { name: '景气度指数', max: 5.0, value: 4.7 } ]
});
chart.draw();
 */
function RadarChart(option) {
    Chart.call(this, option);
}
_perfectInherit(RadarChart, Chart, {
    _createOption: function () {
        var option = this._option,
            basicSize = option.fontSize;
        this._configuration = {
            backgroundColor: 'transparent',
            color: option.palletColors.map(function (item) {
                return Array.isArray(item) ? _linearGradient(item) : item;
            }),
            textStyle: {
                fontSize: basicSize,
                color: option.fontColor
            },
            tooltip: Object.assign({
                trigger: 'item',
                formatter: function (res) {
                    var tem = '<div style="padding:0 ' + basicSize * 0.5 + 'px;font-size:' + basicSize + 'px;line-height:1.5;"><p>' + res.seriesName + '</p>';
                    option.data.map(function (item) {
                        tem += '<p>' + item.name + '：' + item.value + '</p>'
                    })
                    tem += '</div>'
                    return tem;
                }
            }, option.tooltip),
            radar: Object.assign({
                indicator: option.data,
                name: {
                    color: option.fontColor
                },
                nameGap: basicSize,
                axisLine: {
                    lineStyle: {
                        color: option.fontColor
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: option.fontColor
                    }
                },
                splitArea: {
                    show: false
                }
            }, option.radarAxis),
            series: Object.assign({
                type: 'radar',
                symbol: 'circle',
                lineStyle: {
                    normal: {
                        type: 'dotted'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.8
                    }
                },
                data: [{
                    value: option.data.map(function (item) {
                        return item.value
                    })
                }]
            }, option.series)
        };
    }
})

//散点图
function ScatterChart(option) {
    Chart.call(this, option);
}
_perfectInherit(ScatterChart, Chart, {
    _createOption: function () {
        var option = this._option,
            basicSize = option.fontSize,
            dimension = option.dimension,
            max = Math.max.apply(Math, option.data.map(function (item) {
                return item[dimension]
            }));
        this._configuration = {
            backgroundColor: 'transparent',
            textStyle: {
                fontSize: basicSize,
                color: option.fontColor
            },
            grid: Object.assign({
                top: 1 * basicSize,
                left: 1 * basicSize,
                right: 5 * basicSize,
                bottom: 1 * basicSize,
                containLabel: true
            }, option.grid),
            xAxis: {
                position: "top",
                type: 'category',
                axisLabel: {
                    fontSize: basicSize
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'category',
                inverse: true,
                axisLabel: {
                    fontSize: basicSize
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            },
            visualMap: {
                type: "continuous",
                max: max,
                top: basicSize,
                right: basicSize,
                itemWidth: basicSize,
                itemHeight: basicSize * 7,
                textStyle: {
                    fontSize: basicSize,
                    color: option.fontColor
                },
                calculable: false,
                precision: 0.1,
                inRange: { //定义被选中时 selected:true 的样式
                    color: option.palletColors
                },
                dimension: 2
            },
            series: Object.assign({
                type: 'scatter',
                coordinateSystem: "cartesian2d",
                data: option.data
            }, option.series)
        };
    }
})

//wordCloud 需要先引入wordCloud组件
function WordCloudChart(option) {
    Chart.call(this, option);
}
_perfectInherit(WordCloudChart, Chart, {
    _createOption: function () {
        var option = this._option,
            basicSize = option.fontSize;
        this._configuration = {
            backgroundColor: 'transparent',
            textStyle: {
                fontSize: basicSize,
                color: option.fontColor
            },
            series: option.series.map(function (item, i) {
                return Object.assign({
                    type: 'wordCloud',
                    left: 'center',
                    top: 'center',
                    width: '100%',
                    height: '100%',
                    //网格在像素中的大小，以标记网格的可用性 网格尺寸大，字之间的差距大。
                    gridSize: 0.1 * basicSize,
                    //数据中的值将映射到的文本大小范围。默认为具有最小12px和最大60px大小。如果设置太大会出现少词（溢出屏幕）
                    sizeRange: [0.5 * basicSize, 1 * basicSize],
                    //设置为true以允许部分在画布外部绘制单词。
                    drawOutOfBound: false,
                    //文本旋转范围和步进度。文本将在[-90，90]范围内随机旋转，旋转步骤45
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    textStyle: {
                        normal: {
                            color: function (v) {
                                var index = v.dataIndex % 5,
                                    arr = option.palletColors
                                return arr[index]
                            }
                        }
                    },
                    data: option.data[i]
                }, item);
            })
        };
    }
})