const List = {
  data() {
    return {
      tableHeader: {
        background: "#5C6BE8",
        color: "#fff",
        borderColor: "#5C6BE8",
      },
      tableHeader2: {
        background: "#141E38",
        color: "#fff",
        borderColor: "#141E38",
      },
      searchValue: "",
      tableHeight: "",
      pageSize: 10,
      pageNum: 1,
      paramMsg: "",
      apiData: {
        total: 0,
        size: 10,
        current: 1,
      },
      apiDataDetal: {
        total: 0,
        size: 10,
        current: 1,
      },
      tableData: [],
    };
  },
  created: function() {
    this.tinit();
  },
  methods: {
    tinit() {
      this.init();
    },
    init() {
      this.resizeRefresh();
      this.getTableHeight();
      let option = this.$options.doNotInit
      if (!option) {
        this.getData(-1);
      }
    },
    getData() {
      return;
    },
    // 刷新
    Refresh() {
      this.getData(-1);
    },
    // 搜索
    searchInput(val = "") {
      val = val.trim();
      if (!val.length) {
        this.paramMsg = val;
        this.getData(-1);
      }
    },
    // resize 变化刷新页面
    resizeRefresh() {
      const self = this;
      window.addEventListener("resize",function(){
        self.getTableHeight()
      });
    },
    // 页码
    current_change(current) {
      this.getData(current);
    },
    // 调用接口
    doFetch({ url, params, pageNum, fetchPs = {} },status=true,Requesttype = 1) {
      const { cur } = this.getDataInit(pageNum);
      params.pageNum = cur;
        this["$" + (fetchPs.type || "post")](url, params, 3000, status,Requesttype)
        .then((ret) => {
          this.handleListData(ret.data || {}, fetchPs.key);
        })
        .catch(() => {
          this.screenError(cur);
        });    
    },
    doFetchNoPage({ url, params }) {
      this.$post(url, params)
        .then((ret) => {
          this.tableData = ret || [];
        })
        .catch(() => {
          return;
        });
    },
    // 接口数据处理
    handleListData(res, key = "list") {
      const tableData = res[key] || [];
      if (res[key].length === 0) {
        /*this.$message({
          message: "暂无数据",
          type: "warning",
          duration: 1000
        });*/
      }
      this.apiData = {
        total: res.total || 0,
        size: this.pageSize || 10,
        current: this.pageNum || 1,
      };
      if (typeof this.handleListDataBack === "function") {
        this.handleListDataBack(tableData);
      } else {
        this.tableData = tableData;
      }
    },
    // 接口参数初始化
    getDataInit(cur = 1) {
      this.tableData = [];
      if (cur === -1) {
        cur = this.pageNum;
      } else {
        this.pageNum = cur;
      }
      return { cur };
    },
    // 错误 回调
    screenError(pageNum) {
      this.apiData = {
        total: 0,
        size: 10,
        current: pageNum,
      };
      this.tableData = [];
    },
    /*
     * 获取 table 高度
     * @param opDom 是否有操作栏的dom元素
     */
    getTableHeight(opDom = true, page = true, tr = 40) {
      let tHeight =
        window.innerHeight - (3 + 1.35 + 3.25 + 0.675 + 2 + 1.35 + 4) * 16;
      if (opDom) {
        tHeight -= 40 + 0.675 * 16 + 1;
      }
      if (page) {
        tHeight -= 32;
      }
      this.tableHeight = tHeight;
      // this.pageSize = Math.ceil(this.tableHeight/tr)
    },
    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    // 序号
    indexMethod(index) {
      return (this.pageNum - 1) * this.pageSize + index + 1;
    },
    // 删除
    doDel({ url, msg = "", title = "删除", ps = {} },status=true,Requesttype = 1) {
      this.$confirm(msg, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonClass:'bgc-bv',
        type: "warning",
      })
        .then(() => {
          this["$" + (ps.type || "get")](url, ps.data || {}, 3000, status,Requesttype)
            .then(() => {
              setTimeout(() => {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 1000,
                });
                this.getData(-1);
                if (url == "/biz/projectCourse/deleteProjectCourse") {
                  setTimeout(() => {
                    sessionStorage.setItem(
                      "courseCount",
                      this.tableData.length
                    );
                    console.log(this.tableData.length);
                  }, 1000);
                }
              }, 300);
            })
            .catch(() => {
              return;
            });
        })
        .catch(() => {
          return;
        });
    },
  },
};

export default List;
