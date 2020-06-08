import Mock from "mockjs";
const mock = Mock.mock;
//通用的多级列表数据
const tMulList = mock({
    code: 0,
    message: "@csentence",
    "enumList|1-10": [
      {
        "id|+1": 0, //属性值自动加1
        "value|0-100": 0,
        name: "@ctitle",
        "enumList|1-10": [
          {
            "id|+1": 0, //属性值自动加1
            "value|0-100": 0,
            name: "@ctitle",
            "enumList|1-10": [
              {
                "id|+1": 0, //属性值自动加1
                "value|0-100": 0,
                name: "@ctitle",
                "enumList|1-10": [
                  {
                    "id|+1": 0, //属性值自动加1
                    "value|0-100": 0,
                    name: "@ctitle"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }),
  //通用的枚举数据
  tEnumerate = mock({
    code: 0,
    message: "@csentence",
    "enumList|1-10": [
      {
        "value|0-100": 0,
        name: "@ctitle"
      }
    ]
  }),
  //通用的成功状态数据
  tSuccess = mock({
    code: 0,
    message: "成功"
  });
const apiList = [
  //课程部分
  {
    //课程类型
    url: "/api/CourseInfo/GetCourseType",
    template: tMulList
  },
  {
    //课程关键字
    url: "/api/CourseInfo/GetCourse_KeyEnum",
    template: tEnumerate
  },
  {
    //课程状态
    url: "/api/CourseInfo/GetCourseStatus",
    template: mock({
      code: 0,
      message: "@csentence",
      enumList: [
        {
          value: 0,
          name: "未上架"
        },
        {
          value: 1,
          name: "上架"
        },
        {
          value: 2,
          name: "下架"
        }
      ]
    })
  },
  {
    //精选好课
    url: "/api/CourseInfo/GetGoodCourse",
    template: mock({
      code: 0,
      message: "@csentence",
      enumList: [
        {
          value: 1,
          name: "是"
        },
        {
          value: -1,
          name: "否"
        }
      ]
    })
  },
  {
    //课程列表
    url: "/api/CourseInfo/GetCourseData",
    template: mock({
      code: 0,
      message: "@csentence",
      count: 100,
      "courseList|15": [
        {
          "id|+1": 0, //属性值自动加1
          createTime: "2020-05-20 05:07:47",
          topic: "@ctitle",
          teacherName: "@ctitle",
          validDateStart: "2020-05-20 05:07:47",
          validDateEnd: "2020-05-20 05:07:47",
          status: "@integer",
          statusName: "@ctitle",
          isChoiceness: "@integer",
          isChoicenessName: "@ctitle",
          courseTypeId: "@integer",
          courseTypeName: "@ctitle"
        }
      ]
    })
  },
  {
    //课程详情
    url: "/api/CourseInfo/GetCourseById",
    template: mock({
      code: 0,
      message: "@csentence",
      courseList: [
        {
          topic: "@ctitle",
          courseTypeId: `${tMulList.enumList[0].value},${tMulList.enumList[0].enumList[0].value}`,
          courseTypeName: `${tMulList.enumList[0].name},${tMulList.enumList[0].enumList[0].name}`,
          validDateStart: "2020-05-20 05:07:47",
          validDateEnd: "2020-05-20 05:07:47",
          description: "<p>这是测试的数据</p>",
          status: 1,
          statusName: "是",
          isChoiceness: 1,
          isChoicenessName: "上架",
          "teacherList|1-3": [
            {
              teacherName: "讲师名字",
              teacherIMgUrl: "",
              teacherIMgUrlName: "",
              teacherDescription: "讲师简介"
            }
          ]
        }
      ]
    })
  },
  {
    //删除课程 添加课程 修改课程
    url: "/api/CourseInfo/",
    template: tSuccess
  },
  {
    //获取课时树
    url: "/api/ClassInfo/GetClassTree",
    template: mock({
      code: 0,
      message: "@csentence",
      "treeList|0-3": [
        {
          type: "章",
          "id|+1": 0, //属性值自动加1
          name: "@ctitle",
          "children|1-5": [
            {
              type: "节",
              "id|+1": 0, //属性值自动加1
              name: "@ctitle",
              children: [
                {
                  type: "课时",
                  "id|+1": 0, //属性值自动加1
                  name: "@ctitle",
                  videoURL: "http://vjs.zencdn.net/v/oceans.mp4"
                },
                {
                  type: "课时",
                  "id|+1": 0, //属性值自动加1
                  name: "@ctitle",
                  videoURL:
                    "https://vdept.bdstatic.com/6d697336437553434937413243524332/70384c5472397548/3e5100936b6d1c033d3867c3d42fac9147537c21a8fee325bf7ec61990d9dc6bab3d9482f0a165fd239ee37671a54e3b.mp4?auth_key=1590399342-0-0-968bd0ba9a082893cd2b8221f7b4a4d4"
                }
              ]
            }
          ]
        }
      ]
    })
  },
  {
    //章的添加修改删除
    url: "/api/CourseChapter/",
    template: tSuccess
  },
  {
    //节的添加修改删除
    url: "/api/CourseNode/",
    template: tSuccess
  },
  {
    //课时的添加修改删除
    url: "/api/ClassInfo/",
    template: tSuccess
  },
  {
    //获取课程分类目录树
    url: "/api/CourseType/GetCourseTypeTree",
    template: mock({
      code: 0,
      message: "@csentence",
      "data|3": [
        {
          "id|+1": 0, //属性值自动加1
          name: "@ctitle",
          description: "@cparagraph",
          createTime: "2020-05-20 05:07:47",
          "children|1-5": [
            {
              "id|+1": 0, //属性值自动加1
              name: "@ctitle",
              description: "@cparagraph",
              createTime: "2020-05-20 05:07:47",
              "children|1-5": [
                {
                  "id|+1": 0, //属性值自动加1
                  name: "@ctitle",
                  description: "@cparagraph",
                  createTime: "2020-05-20 05:07:47",
                  "children|1-5": [
                    {
                      "id|+1": 0, //属性值自动加1
                      name: "@ctitle",
                      description: "@cparagraph",
                      createTime: "2020-05-20 05:07:47"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    })
  },
  {
    //课程分类的添加修改删除
    url: "/api/CourseType/",
    template: tSuccess
  },
  //模块图部分
  {
    //获取banner状态
    url: "/api/BannerInfo/GetBannerStatus",
    template: mock({
      code: 0,
      message: "@csentence",
      enumList: [
        {
          value: 1,
          name: "已上架"
        },
        {
          value: 2,
          name: "已下架"
        }
      ]
    })
  },
  {
    //获取banner的模块位置
    url: "/api/BannerInfo/GetModuleLocation",
    template: mock({
      code: 0,
      message: "@csentence",
      enumList: [
        {
          value: 1,
          name: "首页"
        },
        {
          value: 2,
          name: "详情页"
        }
      ]
    })
  },
  {
    //banner列表
    url: "/api/BannerInfo/GetBannerInfoSelect",
    template: mock({
      code: 0,
      message: "@csentence",
      count: 100,
      "bannerInfoList|15": [
        {
          "id|+1": 0, //属性值自动加1
          moduleLocation: 1,
          moduleLocationName: "首页",
          name: "@ctitle",
          imgUrl: "@image",
          imgName: "@ctitle",
          courseId: "@integer",
          status: 1,
          statusName: "已上架",
          order: 0
        }
      ]
    })
  },
  {
    //banner详情
    url: "/api/BannerInfo/GetBannerInfoById",
    template: mock({
      code: 0,
      message: "@csentence",
      bannerInfoList: [
        {
          "id|+1": 0, //属性值自动加1
          moduleLocation: 1,
          moduleLocationName: "首页",
          name: "@ctitle",
          imgUrl: "@image",
          imgName: "@ctitle",
          courseId: "@integer",
          status: 1,
          statusName: "已上架",
          order: 0
        }
      ]
    })
  },
  {
    //banner删除 添加 修改 移动
    url: "/api/BannerInfo",
    template: tSuccess
  }
];

const myMock = function() {
  apiList.map(item => {
    const { url, template } = item,
      rurl = new RegExp(url, "i");
    mock(rurl, template);
  });
};
export default myMock;
