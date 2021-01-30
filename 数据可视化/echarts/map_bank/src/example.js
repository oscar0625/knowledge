var getAjax = function (url, data, callback) {
        var aj = $.ajax({
            type: 'get',
            url: 'http://47.94.205.149:8005' + url,
            data: data,
            dataType: 'json',
            success: function (res) {
                callback(res)
            }
        })
        return aj
    },
    //领域对应参数
    allCorrespondence = {
        '全部': 0,
        '海洋': 5,
        '太空': 7,
        '生物': 2,
        '新能源': 1,
        '网络空间': 23,
        '人工智能': 104
    },
    hdCorrespondence = {
        '全部': 0,
        '仿真系统': 69,
        '集成电路及核心传感器': 70,
        '大数据及人工智能': 37,
        '新材料': 120,
        '光电装备': 68,
        '通用航空与卫星应用': 66,
        '网络与信息安全': 65,
        '高端海洋装备': 67,
    };
//获取数据
var map = {
    positionMap: '海淀',
    globalDomain: '全部',
    legend: '全部',
    //获取数据
    getData: function () {
        var self = this,
            dataObj = {
                num: 0
            };
        //获取实验室
        getAjax('/api/laboratory/getfield', {
            tecField: 0
        }, function (res) {
            dataObj.laboratory = res;
            dataObj.num++;
            self.processData(dataObj);
        });
    },
    //处理数据
    processData: function (dataObj) {
        if (dataObj.num != 1) return;
        var self = this;
        var map = new Map({
            ele: "container",
            //根据所需位置 设定经纬度过滤条件和geo组件
            position: [{
                    name: '全国',
                    filter: function (longitude, latitude) {
                        return true
                    },
                    geo: {
                        map: 'china', //中国地图
                        roam: true, //是否开启平移和缩放
                        zoom: 1.2,
                        scaleLimit: {
                            min: 1
                        },
                        silent: true, //不响应和触发鼠标事件。
                        label: { //控制省份名
                            normal: { //正常模式
                                show: false
                            },
                            emphasis: { //hover模式
                                show: false
                            }
                        },
                        itemStyle: { //控制省份区域（省份块）
                            normal: {
                                areaColor: 'rgba(2,53,105,0.8)',
                                borderColor: '#03fbfe',
                                borderWidth: 2,
                                shadowColor: 'rgb(2,209,253,0.3)',
                                shadowBlur: 10,
                            }
                        }
                    }
                },
                {
                    name: '北京',
                    filter: function (longitude, latitude) {
                        return true
                    },
                    geo: {
                        map: 'beijing', //中国地图
                        roam: true, //是否开启平移和缩放
                        center: ["116.44947027683258", "40.153040592969246"],
                        zoom: 1.2,
                        scaleLimit: {
                            min: 1
                        },
                        silent: true, //不响应和触发鼠标事件。
                        label: { //控制省份名
                            normal: { //正常模式
                                show: false
                            },
                            emphasis: { //hover模式
                                show: false
                            }
                        },
                        itemStyle: { //控制省份区域（省份块）
                            normal: {
                                areaColor: 'rgba(2,53,105,0.8)',
                                borderColor: '#03fbfe',
                                borderWidth: 2,
                                shadowColor: 'rgb(2,209,253,0.3)',
                                shadowBlur: 10,
                            }
                        }
                    }
                },
                {
                    index: 2,
                    name: '海淀',

                    filter: function (longitude, latitude) {
                        return true
                    },
                    geo: {
                        map: 'beijing', //中国地图
                        roam: true, //是否开启平移和缩放
                        center: ["116.22947027683258", "40.005040592969246"],
                        zoom: 7,
                        scaleLimit: {
                            min: 6.8
                        },
                        silent: true, //不响应和触发鼠标事件。
                        label: { //控制省份名
                            normal: { //正常模式
                                show: false
                            },
                            emphasis: { //hover模式
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                opacity: 0
                            }
                        },
                        regions: [{ //海淀
                            name: '海淀区',
                            itemStyle: {
                                normal: {
                                    areaColor: 'rgba(2,53,105,0.8)',
                                    borderColor: '#03fbfe',
                                    borderWidth: 2,
                                    shadowColor: 'rgb(2,209,253,0.7)',
                                    shadowBlur: 100,
                                    shadowOffsetX: 1,
                                    shadowOffsetY: 1,
                                    opacity: 1
                                }
                            }
                        }]
                    }
                }
            ],
            //通过经纬度筛选数据
            filterData: function () {
                var fnc = function (filter) {
                    var labData = {
                        0: []
                    };
                    //获取实验室
                    $.each(dataObj.laboratory, function () {
                        if (filter(this.longitude, this.latitude)) {
                            this.value = [this.longitude, this.latitude];
                            //全部领域
                            labData[0].push(this);

                            //其他领域
                            //6大领域
                            labData[this.fieldID] = (labData[this.fieldID] || []);
                            labData[this.fieldID].push(this);

                            //8大领域
                            labData[this.hdFieldID] = (labData[this.hdFieldID] || []);
                            labData[this.hdFieldID].push(this);
                        }
                    });
                    return {
                        labData: labData
                    }
                };
                //经纬度筛选之后的数据
                this.afterFilteringData = this.position.map(function (item) {
                    return fnc(item.filter)
                });
            },
            //tab切换组件 按照定义的顺序依次执行
            tab: [{
                //切换位置
                name: 'tabPosition',
                callback: function () {
                    this.position.forEach(function (item, i) {
                        if (item.name === self.positionMap) {
                            //当前位置下所需的geo组件
                            this.geo = item.geo;
                            //当前位置下所需的数据
                            this.curPostionData = this.afterFilteringData[i];
                        }
                    }.bind(this));
                    //重置globalDomain
                    self.globalDomain = '全部';
                }
            }, {
                //切换领域
                name: 'tabField',
                callback: function () {
                    var text = self.globalDomain,
                        //如果是海淀采用8大领域 全国采用6大领域
                        correspondence = self.positionMap == '海淀' ? hdCorrespondence : allCorrespondence,
                        circleSize = 20,
                        colors = ['#0084ff'],
                        option = {
                            backgroundColor: 'transparent', //整体背景
                            geo: this.geo,
                            tooltip: { //提示框组件。 hover导航框
                                trigger: 'item',
                                formatter: function (res) { //导航框内容  可以写标签哦！！！
                                    if (/实验室/.test(res.seriesName)) {
                                        return '<div style="padding:0 10px;"><p >' + res.data.labName + '</p></div>'
                                    }
                                }
                            }
                        },
                        series = [{
                            name: '实验室',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            symbol: 'pin',
                            symbolSize: circleSize,
                            progressive: 0,
                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colors[0]
                                }
                            },
                            data: this.curPostionData.labData[correspondence[text]],
                            zlevel: 8,
                            animation: false,
                            cursor: 'auto'
                        }];
                    //当前领域下所需的option
                    this.curFieldOption = Object.assign({
                        seriesCopy: series
                    }, option);
                }
            }, {
                //切换legend
                name: 'tabLegend',
                callback: function () {
                    var legends = this.curFieldOption.seriesCopy.map(function (item) {
                            return item.name
                        }),
                        index = legends.indexOf(self.legend);
                    //如果是-1 则为全部
                    this.curFieldOption.series = index == -1 ? this.curFieldOption.seriesCopy : [this.curFieldOption.seriesCopy[index]];
                    //最终的配置
                    this.configuration = this.curFieldOption;
                }
            }],
            //绑定点击事件
            click: function (e) {
                var data = e.data;
                if (/实验室/.test(e.seriesName)) {
                    console.log(data);
                }
            }
        });
        map.init();
    },
};
//获取北京地图
$.get('./script/map/json/province/beijing.json', function (geoJson) {
    echarts.registerMap('beijing', geoJson);
    //地图初始获取数据
    map.getData();
});