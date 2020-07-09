import Mock from "mockjs";

const mock = Mock.mock;

// 通用的枚举数据
const tEnumerate = mock({
  code: 0,
  message: "@csentence",
  "enumList|1-10": [
    {
      "value|0-100": 0,
      name: "@ctitle"
    }
  ]
});
// 通用的成功状态数据
const tSuccess = mock({
  code: 0,
  message: "成功"
});

// 所有请求集合
const apiList = [
  {
    url: "/api/CourseInfo/GetCourse_KeyEnum",
    template: tEnumerate
  },
  {
    url: "/api/user/",
    template: tSuccess
  },
  {
    // 课程列表
    url: "/api/CourseInfo/GetCourseData",
    template: mock({
      code: 0,
      message: "@csentence",
      count: 100,
      "courseList|15": [
        {
          "id|+1": 0, // 属性值自动加1
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
  }
];

export default function () {
  apiList.map((item) => {
    const { url, template } = item;
    const rurl = new RegExp(url, "i");
    mock(rurl, template);
  });
}
