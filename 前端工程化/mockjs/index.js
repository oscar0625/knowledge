/**
 * example http://mockjs.com/examples.html#DPD
 */
define(['mock', 'jq'], function (Mock) {
    // 使用 Mock
    var data = Mock.mock({
        //属性值是数字
        'number1|+1': 0, //属性值自动加1
        'number2|1-100': 0, //1-100随机
        'number3|1-100.1': 0, //1-100随机 小数点保留1位
        'number4|1-100.1-2': 0, //1-100随机 小数点保留1-2位

        //属性值是字符串
        'content|1-5': '@ctitle',
        'content|3': '@ctitle',

        //属性值是布尔型
        'bool': '@boolean', //随机生成一个布尔值
        //属性值是数组
        'type|1': [0, 1, 2, 3], //从数组中随机选取1个
        'list|1-10': [ //将数组重复1-10次
            {
                'id|+1': 0, //属性值自动加1
                'bool': '@boolean',
                'content1|1-3': /[\u4E00-\u9FA5]/,
                'content2|1-3': '这是一段测试数据',
                'content3|1-3': '@cparagraph',
            }
        ],
        'list|5': [ //将数组重复5次
            {
                'id|+1': 0, //属性值自动加1
                'bool': '@boolean',
                'content1|1-3': /[\u4E00-\u9FA5]/,
                'content2|1-3': '这是一段测试数据',
                'content3|1-3': '@cparagraph',
            }
        ]
    })
    console.log(data);
})