# anzhi-manager

# 项目目录
```
assets     图片
components 组件
  CheckButton 获取手机验证码倒计时按钮
  Empty       列表空数据样式
  PageNum    页码
  player     阿里播放器
  uploadAuth 阿里视频上传
mixins     混入
  DatePicker 开始结束时间选择约束
  Form       表单
  UploadPic  上传图片
  List       列表
plugins    插件
  axios      请求
  install    注册方法
router     路由
store      状态
style      样式
  reset      重置默认样式
  common     公共基础样式
  public     公共模块样式
  base       基础样式
  form       表单样式
utils      工具
  common       公共方法
  filters      过滤器
  helper       vuedraggable引用方法
  vuedraggable 拖拽类
  idcard       身份证号校验
views      页面
```
```
  commenPages --> 页面公共页（现在只有课程展示）
  PersonnelManagement --> 人员管理
  paltform --> 平台资源
  resourse --> 我的资源
    |-  popup --> 弹窗
  
```
```
  // 培训类型
      判断有id就传给后台
      if(this.params.trainFormId){
        params.trainTypeId = this.params.trainFormId;
      }
      if(this.params.levelFormId){
        params.trainLevelId = this.params.levelFormId;
      }
      if(this.params.occFormId){
        params.occupationId = this.params.occFormId;
      }
      if(this.params.postFormId){
        params.postId = this.params.postFormId;
      }
      if(this.params.industryFormId){
        params.industryId = this.params.industryFormId;
      }
      //方法method里
       // 培训类型回调  
    childBack(params){
      this.params = {...this.params,...params};
    },
    clearParams(){
      this.params = {};
    },
    引入
    import tree from "@/components/treePopup"; 

    components里
    tree

     <tree ref="tree" @eventBtn="childBack" :ruleForm="ruleForm" size="small" @clearParams="clearParams"/> // ruleForm == {Trainingtype:''} 传入组件
```
# anzhi-manager

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
```  
    菜单
    //  运营端再 web 后面加上 operate  如 下面的账号管理
    // const menu = [
    //   {
    //     name: "首页",
    //     icon: "nav-7",
    //     path: "/web/SupervisionEnd/home",
    //     children: [
    //       // {
    //       //   path: "/web/SupervisionEnd/home",
    //       //   name: "首页",
    //       // }
    //     ]
    //   },
    //   {
    //     name: "监管-培训管理",
    //     icon: "nav-3",
    //     children: [
    //       {
    //         name: "班级审批",
    //         path: "/web/SupervisionEnd/classcheckList"
    //       },
    //       {
    //         name: "班级课程参数",
    //         path: "/web/SupervisionEnd/classSubjectParam"
    //       },
          
    //     ]
    //   },
    //   {
    //     name: "账号管理",
    //     icon: "nav-7",
    //     children: [
    //       {
    //         name: "账号列表",
    //         path: "/web/operate/accountList"
    //       },
    //       {
    //         name: "角色列表",
    //         path: "/web/operate/roleList"
    //       },
    //       {
    //         name: "权限管理",
    //         path: "/web/operate/rightsManagement"
    //       }
    //     ]
    //   },
    //   {
    //     name: "审核管理",
    //     icon: "nav-6",
    //     children: [
    //       {
    //         name: "课程审核",
    //         path: "/web/CourseReview"
    //       },
    //       {
    //         name: "课件审核",
    //         path: "/web/CoursewareReview"
    //       },
    //        {
    //         name: "班级审核",
    //         path: "/web/ClassReview"
    //       }
    //     ]
    //   },
    //   {
    //     name: "结算管理",
    //     icon: "nav-8",
    //     children: [
    //       {
    //         name: "结算列表",
    //         path: "/web/evaluate/list"
    //       }
    //     ]
    //   },
    //   {
    //     name: "单位管理",
    //     icon: "nav-8",
    //     children: [
    //       {
    //         name: "单位列表",
    //         path: "/web/UnitList"
    //       }
    //     ]
    //   },
    //   {
    //     name: "我的资源",
    //     icon: "nav-1",
    //     children: [
    //       {
    //         name: "我的课程/课件",
    //         path: "/web/myresourseList"
    //       },
    //       {
    //         name: "我的试卷/题库",
    //         path: "/web/testPaperList"
    //       }
    //     ]
    //   },
    //   {
    //     name: "平台资源",
    //     icon: "nav-2",
    //     children: [
    //       {
    //         name: "平台课程/课件",
    //         path: "/web/courseList"
    //       },
    //       {
    //         name: "平台试卷/题库",
    //         path: "/web/paperList"
    //       }
    //     ]
    //   },
    //   {
    //     name: "培训管理",
    //     icon: "nav-3",
    //     children: [
    //       {
    //         name: "班级列表",
    //         path: "/web/classListCtr"
    //       },
    //       {
    //         name: "班级列表运营",
    //         path: "/web/classListCtrY"
    //       }
    //       // {
    //       //   name: "培训档案",
    //       //   path: "/web/activity/overlordMealList"
    //       // }
    //     ]
    //   },
    //   {
    //     name: "人员管理",
    //     icon: "nav-4",
    //     children: [
    //       {
    //         name: "讲师列表",
    //         path: "/web/lecturer/list"
    //       },
    //       {
    //         name: "职工列表",
    //         path: "/web/workersList"
    //       },
    //       {
    //         name: "学员列表",
    //         path: "/web/studentsList"
    //       }
    //     ]
    //   },
    //   {
    //     name: " 关联企业",
    //     icon: "nav-5",
    //     children: [
    //       {
    //         name: "企业列表",
    //         path: "/web/coupon/list"
    //       }
    //     ]
    //   },
    //   {
    //     name: "统计查询",
    //     icon: "nav-6",
    //     children: [
    //       {
    //         name: "单位统计",
    //         path: "/web/UnitStatistics"
    //       },
    //       {
    //         name: "班级培训统计",
    //         path: "/web/ClassTrainingStatistics"
    //       },
    //       {
    //         name: "学员学习记录",
    //         path: "/web/StudentLearningRecord"
    //       },
    //          {
    //         name: "学时证明查询",
    //         path: "/web/ClassHourCertificateQuery"
    //       },
    //          {
    //         name: "学员档案查询",
    //         path: "/web/StudentFileQuery"
    //       },
    //          {
    //         name: "人脸认证统计",
    //         path: "/web/FaceAuthenticationStatistics"
    //       },
    //     ]
    //   },
    //   // {
    //   //   name: "结算管理",
    //   //   icon: "nav-8",
    //   //   children: [
    //   //     {
    //   //       name: "结算列表",
    //   //       path: "/web/evaluate/list"
    //   //     }
    //   //   ]
    //   // },
    //   {
    //     name: "数据统计",
    //     icon: "nav-6",
    //     children: [
    //       {
    //         name: "开班统计",
    //         path: "/web/set/Openingstatistics"
    //       },
    //       {
    //         name: "学员统计",
    //         path: "/web/set/Studentstatistics"
    //       }
    //     ]
    //   }
    // ];
    // this.getMenu = menu;
```