<template>
  <div class="menubox" >
    <div :class="isTrue ? '' : menu2" collapse-transition="true" class="menu" v-if="$route.meta.show!=false">
      <div class="header">
        <div class="header-title">
          <div class="seat" @click="goRefash()">
            <div class="img-box">
              <img src="../assets/logo-w.png" />
            </div>
            <h4 v-show="showtitle == false">
                数据中心
            </h4>
          </div>
        </div>
        <div class="nav-title">
          <div class="seat" @click="changeCollapse()">
            <div class="img-box" style="margin: inherit">
              <img src="../assets/menu.png" />
            </div>
            <span />
          </div>
        </div>
      </div>
      <div class="nav">
        <div class="nav-box">
          <el-menu
            :collapse="isTrue"
            :default-active="$route.path"
            :default-openeds="menuOpeneds"
            background-color="#324767"
            text-color="#fff"
            class="menu-control"
            @select="menuSelect"
            @open="handleOpen"
            @close="handleClose"
          >
            <template v-for="(item, index) in getMenu">
              <el-submenu
                v-if="item.children && item.children.length"
                :index="'' + (index + 1)"
                :key="index"
              >
                <template slot="title">
                  <img
                    :src="
                      item.icon ? require('@/assets/' + item.icon + '.png') : ''
                    "
                    style="width:30px"
                  />
                  <span slot="title">{{ item.name || "" }}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(item1, index1) in item.children"
                    :index="item1.url"
                    :key="index1"
                    :v-show="item1.url == null ? !show : show"
                    @click="doRouter(item1.url)"
                  >
                    <span>{{ item1.name || "" }}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item
                v-else
                :index="'' + (index + 1)"
                :key="index"
                style="padding-left:0"
                @click="doRouter(item.url)"
              >
                <img
                  :src="
                    item.icon ? require('@/assets/' + item.icon + '.png') : ''
                  "
                  style="padding-left: 0.75rem;width:30px"
                />
                <span style="padding-left:12px;color:#fff">{{
                  item.name || ""
                }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
    </div>
    <div class="control">
      <div class="header" v-if="$route.meta.show!=false">
        <div class="headerBtn">
          <div class="seat">
            <!-- <el-popover
              placement="bottom"
              width="100%"
              trigger="click"
              v-model="newsInfoShow"
              @show="getNewsInfo"
            >
              <div
                class="newInfoc1"
                @click="jumpNewsList"
                style="position: absolute;top: 18px;right: 20px;z-index: 2;font-size: 12px;color: #5c6be8;cursor: pointer;"
              >
                消息中心
                <i class="el-icon-arrow-right"></i>
              </div>
              <el-table :data="newsInfo" size="small">
                <el-table-column width="300" label="站内消息通知">
                  <template slot-scope="scope">
                    <div
                      @click="toNewsInfo(scope.row)"
                      style="cursor: pointer;"
                    >
                      <p>{{ scope.row.msgName }}</p>
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="scope.row.msgContent"
                        placement="top"
                      >
                        <p
                          style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                        >
                          {{ scope.row.msgContent }}
                        </p>
                      </el-tooltip>

                      <p style="color: #c0c4cc;">{{ scope.row.createTime }}</p>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div
                v-show="newsInfoNumber > 5"
                class="newInfoc2"
                @click="jumpNewsList"
                style="text-align: center;line-height: 39px;color: #5c6be8;cursor: pointer;font-size: 12px;"
              >
                查看更多
                <i class="el-icon-arrow-right"></i>
              </div>
              <div
                class="headr-btn-user"
                style="cursor:pointer"
                slot="reference"
              >
                <div class="headr-btn-title" style="width:80px;">
                  <el-badge
                    :value="
                      !newsInfoNumber || newsInfoNumber < 1
                        ? ''
                        : newsInfoNumber
                    "
                    :max="99"
                    class="item"
                    style="padding: 0 8px;"
                  >
                    <img
                      src="@/assets/xxts.png"
                      alt
                      style="width:16px;height:16px;vertical-align: middle;"
                    />
                    <span
                      style="padding-left:5px;padding-left: 5px;vertical-align: middle;font-size: 0.875rem;color: #8c8b8b;"
                      >消息</span
                    >
                  </el-badge>
                </div>
              </div>
            </el-popover> -->
            <div class="headr-btn-user">
              <div class="headr-btn-title">
                <img
                  src="@/assets/user.png"
                  alt
                  style="width:16px; height:16px"
                />
                <span style="padding-left:5px">{{
                  userJson.fullname || "管理员"
                }}</span>
              </div>
            </div>
            <!-- <div class="headr-btn-user">
              <div class="headr-btn-title" @click="passwordShow = true">
                <img
                  src="@/assets/pass.png"
                  alt
                  style="width:16px; height:16px"
                />
                <span style="padding-left:5px">修改密码</span>
              </div>
            </div> -->
            <!-- <div class="headr-btn-pperson">
              <div
                class="headr-btn-title headr-btn-title-border"
                @click="$router.push('/personalendusers')"
              >
                <span>个人中心</span>
              </div>
            </div>-->
            <div class="headr-btn-out">
              <div class="headr-btn-title" @click="loginOut">
                <img
                  src="@/assets/exit.png"
                  alt
                  style="width:16px; height:16px"
                />
                <span style="padding-left:5px">退出</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Informationbox" v-if="$route.meta.show!=false">
        <keep-alive>
          <router-view v-if="$route.meta.state" />
        </keep-alive>
        <router-view v-if="!$route.meta.state" />
      </div>
      <div class="Informationboxs" v-else>
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
// import axios2 from "axios2";
import store from "../store/index";
import { createSwigger, distorySwigger } from "../utils/swigger";

export default {
  name: "Menu",
  components: {
  },
  data() {
    
    return {
      getMenu: [], // 菜单
      // 内参
      menu2: "menu-cur",
      isTrue: false,
      showtitle: false,
      passworkchange: true,
      imgdialog: false,
      menuActive: "1",
      menuOpeneds: ["1"],
      tableData:[],
    };
  },
  computed: {
    ...mapGetters({
      userJson: "getUser",
      menu: "getMenu"
    }),
  },
  created: function() {
    // 用户信息
    // const userJson = sessionStorage.getItem("userJson") || {};
    // if (
    //   userJson.userId &&
    //   (userJson.userId === "undefined" || userJson.userId === "null")
    // ) {
    //   this.$router.push({
    //     name: "Login",
    //     path: "/web/Login"
    //   });
    //   return false;
    // }
    this.init();
    this.getMenuData();
  
  },
  mounted() {},
  beforeDestroy() {
  },
  methods: {
    getUrl(url) {
      if (url) {
        return require("@/assets/" + url + ".png");
      } else {
        return "";
      }
    },
    doRouter(url) {
      const stu = this.$route.fullPath == url;
      if (url == null) {
        this.$alert("暂无权限或此功能暂未开放", "提示").catch(() => {
          return;
        });
      } else {
        if (!stu) {
          this.$router.push({
            path: url
          });
        }
      }
    },
    // 初始化
    init() {
    },
    // 获取菜单
    getMenuData() {
      this.getMenu = [
				{
					name: "首页",
					label: "统计",
					icon: "nav-5",
					children: [],
          url:'/web/home'
				},
				{
					name: "统计",
					label: "统计",
					icon: "nav-5",
					children: [
						{
							name: "培训地域",
							label: "个人端用户",
							url: "./personalendusers"
						},
						{
							name: "用户年龄",
							label: "用户年龄",
							url: null
						},
						{
							name: "培训类型",
							label: "培训类型",
							url: null
						},
						{
							name: "培训月份",
							label: "培训月份",
							url: null
						}
					]
				},
			];
      
    },
  
    // 换页面
    // changeBusinessType(command) {
    //   this.$post(
    //     "userService/queryMenuBussinessId",
    //     {
    //       bussinessId: command.id
    //     },
    //     true,
    //     "json"
    //   )
    //     .then(ret => {
    //       const retData = ret.data || [];
    //       // 缓存参数
    //       this.$store.dispatch("handleMenu", ret.user);
    //       const roleId = [];
    //       retData.forEach(item => {
    //         roleId.push(item.id);
    //       });
    //       this.$store.dispatch("handleUser", {
    //         ...this.userJson,
    //         roleId,
    //         businessId: command.id,
    //         businessName: command.businessName,
    //         operationType: command.operationType
    //       });
    //       this.menuActive = "1";
    //       this.menuOpeneds = ["1"];
    //       this.businessName = command.businessName;
    //       // 跳页
    //       if (ret.code === 0) {
    //         this.$router.push("/personalendusers");
    //         this.getMenuData();
    //       } else {
    //         this.$message.error(ret.msg || "请求失败，请稍后再试");
    //       }
    //     })
    //     .catch(() => {
    //       return;
    //     });
    // },
    // 刷新页面
    goRefash() {
      window.location.reload();
    },
    // 退出
    loginOut() {
      // this.$lWebsocket("closeWebsocket");
      clearInterval(this.getInfosSetInterval);
      this.$post("/logout", {}).catch(err => {console.log(err);})
      this.$store.dispatch("handleDelAll");
      this.$router.push({
        path: "/web/login"
      });
    },
    // 导航
    changeCollapse() {
      this.isTrue = !this.isTrue;
      this.showtitle = !this.showtitle;
      this.setMenuStu("isTrue", this.isTrue);
    },
    menuSelect(index, arr) {
      return;
    },
    handleOpen() {
      return;
    },
    handleClose() {
      return;
    },
    setMenuStu(key, val) {
      const userJson = this.userJson || {};
      const menuStu = userJson.menuStu || {};
      menuStu[key] = val;
      userJson.menuStu = menuStu;
      this.$store.dispatch("handleUser", userJson);
    },
  }
};
</script>
<style lang="less">
.bjInfo2 {
      background: red;
      width: 5px;
      height: 5px;
      display: inline-block;
      border-radius: 50%;
      margin: 0 5px;
      vertical-align: middle;
      margin-top: -3px;
    }
.menubox {
  .el-menu {
    border: none;
  }
  .el-menu-item {
    display: flex;
    align-items: center;
    &.is-active {
      background-color: #182943 !important;
      color: #fff;
    }
  }
  .el-submenu {
    &.is-opened .el-submenu__title {
      background-color: rgb(34, 48, 71) !important;
    }
    .el-submenu__title {
      padding: 0 !important;
      height: 40px;
      line-height: 40px;
      img {
        padding-left: 0.75rem;
      }
      span {
        padding-left: 0.75rem;
      }
    }
    .el-menu {
      .el-menu-item {
        padding-left: 55px !important;
        height: 40px;
        line-height: 40px;
        &.is-active {
          background-color: #182943 !important;
        }
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
    &:before {
      content: "" !important;
    }
  }
}
#app ~ .el-menu--vertical {
  .el-menu-item-group__title {
    padding: 0;
  }
  a {
    color: #fff;
  }
  .is-active {
    background-color: #1d2d47 !important;
  }
}
</style>
<style lang="less" scoped>
.menubox /deep/ .el-table__row:hover {
  cursor: pointer;
}
.menubox {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.menu {
  transition: all 0.3s;
  width: 3rem;
  height: 100%;
  background-color: #324767;
  box-shadow: 1px 0 8px 0 #b7b7b9;
  position: relative;
  z-index: 2;
  color: #fff;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  overflow: initial;
  .seat {
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    overflow: hidden;
    align-items: center;
    .img-box {
      height: 1.5625rem;
      width: 1.5625rem;
    }
  }
}
.menu-cur {
  width: 13rem;
}
.menu .seat .header {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.header-title {
  height: 6rem;
  background-color: #324767;
  box-shadow: 0 4px 4px 0 #293c59;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  .seat {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: center;
    img {
      width: 1.75rem;
    }
  }
}
h4 {
  flex: 1;
  font-size: 1.125rem;
  font-weight: 500;
  padding-left: 0.925rem;
  box-sizing: content-box;
}
.nav-title {
  padding-top: 0.25rem;
}
.nav-title .seat {
  font-size: 0;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
}
.nav-title .seat:hover {
  background-color: #1d2d47;
}
.nav {
  flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  overflow: hidden;
}
.nav .nav-box {
  height: 100%;
  width: calc(100% + 17px);
  overflow-y: auto;
}
.nav .nav-box > ul {
  width: 100%;
  padding: 0;
  // padding-right: 17px;
  list-style: none;
}
.nav .nav-box > ul a {
  color: #fff;
  width: 100%;
  display: flex;
  overflow: hidden;
  -ms-flex-align: center;
  align-items: center;
  text-decoration: none;
}
.nav .nav-box > ul > li > {
  padding: 0.5rem 0;
}
.nav .nav-box > ul > li > .seat {
  padding: 0.75rem 0;
  font-size: 1rem;
  border-bottom: 1px solid transparent;
}
.nav .nav-box > ul > li > .seat .img-box {
  padding-left: 0.75rem;
  box-sizing: content-box;
}
.nav .nav-box > ul > li > .seat span {
  padding-left: 0.75rem;
  box-sizing: content-box;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
.Informationbox {
  flex: 1;
  padding-top: 3rem;
  height: 100%;
  overflow: hidden;
  section {
    height: 100%;
  }
}
.control {
  flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  position: relative;
}
.control .header {
  background-color: #fff;
  height: 3rem;
  position: relative;
  box-shadow: 2px 2px 12px 0 #eeeeee;
  display: flex;
  overflow: hidden;
  align-items: center;
  overflow: initial;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  z-index: 100;
  width: 100%;
}
.headr-btn-title .img-box {
  width: 1.875rem;
  height: 1.875rem;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
.control .header .headerBtn {
  padding-right: 0.5rem;
  .seat {
    & > div {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      &:first-child .headr-btn-title {
        border-left: none;
      }
      .headr-btn-title {
        min-width: 3.9375rem;
        text-align: center;
        border-left: 1px solid #eaeaeb;
        white-space: nowrap;
        padding: 0 0.84375rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          vertical-align: middle;
          white-space: nowrap;
          font-size: 0.875rem;
          line-height: normal;
          color: #8c8b8b;
        }
        .img-box {
          display: flex;
          align-items: center;
        }
      }
      &.headr-btn-out .headr-btn-title {
        border: 0;
      }
      &.headr-btn-title-border {
        border-right: 1px solid #eaeaeb;
        border-left: 1px solid #eaeaeb;
      }
    }
  }
}

.menuLabel {
  display: flex;
  flex-direction: column;
}
.videoMation {
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  > span {
    width: 50%;
    padding: 5px 0;
    display: flex;
    align-items: center;
    > span {
      width: 120px;
    }
    div {
      margin-left: 10px;
      max-width: 27rem;
    }
  }
}
.menubox /deep/ .el-badge__content {
  top: -3px;
  right: 20px;
  height: 16px;
  line-height: 16.5px;
}
.Informationboxs {
  height:100%
}
</style>
