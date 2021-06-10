<template>
  <div class="loginContainer">
    <div class="login-title">
      <span>安知职业培训平台</span>
    </div>
    <div class="loginControl">
      <div class="loginForm">
        <div class="loginContent">
          <div class="loginTitle">
            <span>HI,欢迎进入安知职业培训平台</span>
          </div>
          <div class="loginInput">
            <div class="inputbox">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                class="login_input"
              >
                <el-form-item prop="username">
                  <img
                    src="@/assets/loginUser.png"
                    alt
                    style="width: 16px; height: 16px"
                  />
                  <el-input
                    v-model="ruleForm.username"
                    class="loginput"
                    clearable
                    @keyup.enter.native="submit()"
                    placeholder="请输入用户名"
                    @focus="
                      (e) => {
                        clear('username');
                      }
                    "
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <img
                    src="@/assets/loginPass.png"
                    alt
                    style="width: 16px; height: 16px"
                  />
                  <el-input
                    v-model="ruleForm.password"
                    type="password"
                    class="loginput"
                    clearable
                    @keyup.enter.native="submit()"
                    placeholder="请输入密码"
                    @focus="
                      (e) => {
                        clear('password');
                      }
                    "
                  />
                </el-form-item>
              
              </el-form>
            </div>
          </div>
          <div class="loginButton">
            <el-button class="bgc-bv" @click="submit()">登&emsp;录</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="loginFoot">
      <span>
        {{ new Date().getFullYear() }} © 北京晟融信息技术有限公司
        <span
          @click="goToIp"
          style="cursor: pointer; font-size: 14px; font-family: 'PingFang SC'"
          >京ICP备19021711号-2</span
        >
      </span>
      <div class="loginpadding">
        <el-link
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802030034"
          target="_blank"
          :underline="false"
        >
          <img
            src="@/assets/gongan.png"
            alt
            style="width: 20px; height: 20px"
          />
          <span>京公网安备 11010802030034号</span>
        </el-link>
      </div>
      <span v-show="version">版本:{{ version }}</span>
    </div>
  </div>
</template>
<script>
import AES from '../../utils/aes';
export default {
  name: "login",
  data() {
    //验证码校验
    let validateCode = (rule, value, callback) => {
      if (value.trim() != "") {
        if (value != this.verificationCode) {
          callback(new Error("请输入正确的验证码"));
        } else {
          callback();
        }
      } else {
        callback(new Error("请输入验证码"));
      }
    };
    return {
      version: process.env.VUE_APP_VERSION,
      // 公共方法
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"],
          },
        ],
        // code: [
        //   {
        //     required: true,
        //     message: "请输入验证码",
        //     trigger: ["blur"],
        //   },
        //   { validator: validateCode, trigger: ["blur"] },
        // ],
      }
    };
  },
  created: function () {
    this.checkbrowser();
  },
  methods: {
    clear(val) {
      const el = this.$refs["ruleForm"];
      el.clearValidate(val);
    },
    // 登录
    submit(formName = "ruleForm") {
      const el = this.$refs[formName];
      el.validate((valid) => {
        if (valid) {
         this.$post("/login", {
                password: this.ruleForm.password,
                username: this.ruleForm.username,
              })
                .then((ret1) => {
                  this.cacheUserData(ret1);        
                })
                .catch(() => {
                  this.$store.dispatch("handleDelAll");
                  this.getYzm();
                });
        } 
      });
    },
    // 缓存登录数据
    cacheUserData(ret) {
      const datas = ret.data || {};
      this.roleId = datas.principal.roleId;
      // 缓存参数
      this.$store.dispatch("handleToken", datas.token || "");
      this.$store.dispatch("handleUser", {
        userId: datas.userId || "",
        fullname: datas.principal.adminFullName || "",
        roleId: datas.principal.adminId || "",
        createTime: datas.principal.createTime,
      });
      // if (JSON.parse(sessionStorage.getItem("userJson")).passwordExpire) {
      //   this.$router.push("/web/operate/change");
      // } else {
        // this.getMenu();
         this.$router.push({
                path:'/web/home',
              });
      // }
    },
    // getMenu() {
    //   this.$post("/sys/per/menu/userId")
    //     .then((res) => {
    //       const data = res.data || [];
    //       this.setDictionary().then(() => {
    //         let url = (data.find((i) => i.name == "首页") || {}).url || null;
    //         if (this.roleId != "2" && url) {
    //           this.$router.push(url);
    //         } else {
    //           this.$router.push({
    //             path: data[0].url ? data[0].url : data[1].url,
    //           });
    //         }
    //       });
    //       this.$store.dispatch("handleMenu", data || []);
    //     })
    //     .catch(() => {
    //       this.$store.dispatch("handleDelAll");
    //     });
    // },
    // 数据字典
    setDictionary() {
      return new Promise((resolve, reject) => {
        this.$post("/sys/dictionary/all").then((ret) => {
          const retData = ret.data || [];
          let dictionaryArr = [];
          let dictionaryJson = {};
          retData.forEach((item) => {
            if (!dictionaryArr.includes(item.dictKey)) {
              dictionaryArr.push(item.dictKey);
              dictionaryJson[item.dictKey] = {};
            }
            dictionaryJson[item.dictKey][item.dictCode] = item.dictValue;
          });
          this.$store.dispatch("handleDictionary", dictionaryJson);
          resolve();
        });
      });
    },
    /**
     * 跳转到IP备案页面
     * @param
     */
    goToIp() {
      window.open("http://beian.miit.gov.cn");
    },
    checkbrowser() {
      if (navigator.userAgent.indexOf("Edge") >= 0) {
        //微软edge

        alert(
          "抱歉！暂时还无法兼容您当前的浏览器！为了能正常使用网址功能，推荐使用谷歌浏览器，QQ浏览器（极速模式），360浏览器（极速模式）"
        );
      } else if (
        navigator.userAgent.indexOf("Chrome") >= 0 &&
        navigator.userAgent.indexOf("WebKit") >= 0
      ) {
        //谷歌内核
      } else if (navigator.userAgent.indexOf("AppleWebKit") >= 0) {
        //mac谷歌内核
      } else {
        alert(
          "抱歉！暂时还无法兼容您当前的浏览器！为了您能正常使用网址功能，推荐使用谷歌浏览器，QQ浏览器（极速模式），360浏览器（极速模式）"
        );
      }
    },
  },
};
</script>
<style lang="less" scoped>
.loginContainer {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  // background: -webkit-linear-gradient(left, #2a3c59, #425c7b 50%, #2a3c59 100%);
  background: url("../../assets/bgc.png") 0 0 no-repeat;
  background-size: cover;
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 14.5rem;
    background-size: cover;
    background-position: center;
  }
}
.login-title {
  position: absolute;
  top: 0;
  color: #fff;
  /* line-height: 9vh; */
  height: 10vh;
  line-height: 10vh;
  font-size: 30px;
  margin: 0 auto;
  letter-spacing: 5px;
  /* position: relative; */
  padding-left: 90px;
  font-family: PingFang SC;
  span {
    &::before {
      content: "";
      display: inline-block;
      width: 75px;
      height: 50px;
      background: red;
      position: absolute;
      left: 0;
      top: 17px;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAiCAYAAADvVd+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABDtJREFUeNrMmn9ojVEYx/ded7NrLGUYMaGxmRkRkY20/GqRIUx+i2lEyR8k/DH/kIWILL8i5q/5Y35kxWqptRWy5g8/EmFbfm62Gda9vg/PrevuPec99z3vy33q07rvPe95n/O9zznPOc87IxAIxLhoHjAZ7AYZYADoyde7QAtoBM/AY3AXPAHfwPeYf2CGpgCxYCCgTpp5UN2eAXLAYZAJ4i36/ATKwTnQwCK5ZySABstAe+CPzQeGpK0X7AJvAup2C8wEPk0/heh2cDnE2SOgp8I9w8EV8D4CIYrBoGgUYCGoAQ/BDIsICCcf3Ac/FUW4DYY4LYDhwCI4mBesjzbu7Q12ghVgtEL7m9y2NVrWAKeYCC6CFoVIOA1So2UKREKiQptVoEpBhGowL1qmgMoUoTBP4Xx/FdRL2g8Ba8EmMFTS7jM4AE4A/7+YArEcerER3JMATob9erRgbldIbTngvEUkdIFD/BxXp8BycAPU8d8C4FG4L1mQ98nxCoUw7gNWglqJCH4WOdEtAciBD2EPpc95igI0Spx/w85bpTeKvH2gQxIJx0Cc0wLkgmbBQ2kz009BgLcKi1o9KLLoi3aS00G5oI9OsMdJAdLBU4nT9F2aQwKQtYJKMMWizySwWhBZX3m6aguQxL+w1QI0xUEBgtYESnj+i/o1eJE067uB9xVaAqxR3KIucUEAsh/gOZhqsb0uFNx/RjUzeEwyYyrYD7wKWXQMn++dNjpmjwSnQB9Juzrw1eT6OpCnWrAINRpMARiu6GgG7+fdMqofxEm+7wAfTK57eTM1NFIB6IaiCBwca/EL6VqVRWWoNxdkzGwuyOaCjJIAFHaLQP8IHExzSYB2UA22CEI8WGnKBb0k/SyXCNRNgL5gtY2a32CHB/8C7OUy2lPJGpEP9lj0NYenqaUABp/Hx9pweBw7pGtN4DyYBY5K2o0Au8AVhfWH1o/pMv88IQ0XaCxUCRoD7+K5vhmsB68F7WiqLeGBH7RYHMOjQBil3hABZtscAEWAD3wRzNMeknup6nsJHOdSuMimcWrbaMO/CbwOvJIJkMgDsWOjWAAz8wtWcSppXQOnwQOL2gAtZNu4nmDH4nna1IqmgMGbH8PmA3ySEKOa/oWwa3fABi54yAa/FJzl9wkpmutLhmjKeFmETM0HZIEakxcjnaCEC6a0x3gJroN3kr7Gc/pb4WCKzTLZ8/wlwDAHHkCh1iaIguMKfVA+3wpW2cxGMsvmKVcBSs1KYmcCelbDJ0id9wuVEbwjsGt0XC4LPWnGcKWlQbPjbzbf3KSAUouqkRtWFizpkRNtXFfTtfQIB7+Dj7z/w2i8i4PHYZ9GBgi1SRY5PzSn3wPFfOT9H2ZwJvr9XsDvkAC0qZkpOJ6SJXMdv8DlE6Sq0SErkbJAoShF2DgY9eOUFzDZjKSDR/yPEP4oEOC3j78EGADfwSB2Dlmk1AAAAABJRU5ErkJggg==)
        no-repeat 50%;
    }
  }
}
.loginControl {
  width: 28rem;
  margin-top: -1rem;
  position: relative;
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 50%;
  }
}
.loginLogo {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: initial;
  margin-bottom: 1rem;
  white-space: nowrap;
}
.loginForm {
  width: 28rem;
  padding: 1.25rem;
  position: relative;
  &:after,
  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
.loginContent {
  background-color: #fff;
  padding: 0 50px;
  position: relative;
  z-index: 1;
  border-radius: 0.25rem;
}
.loginTitle {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  display: block;
  padding: 40px 0;
  font-family: PingFang SC;
}
.loginOther {
  padding: 0 0.25rem;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  span {
    color: #4089fa;
    cursor: pointer;
  }
}
.loginFoot {
  position: absolute;
  color: #fff;
  bottom: 20px;
  span {
    font-size: 14px;
    font-family: PingFang SC;
  }
  .loginpadding {
    padding: 20px 0;
    span {
      color: #fff;
      padding-left: 5px;
    }

    .el-link.el-link--default:hover {
      color: #fff;
    }
  }
}
</style>
<style lang="less">
.loginContainer {
  .loginInput {
    margin-top: 1rem;
  }
  .inputbox {
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .login_input {
    display: flex;
    flex-direction: column;
    flex: 1;
    .el-form-item {
      border-bottom: 1px solid #ccc;
      display: flex;
      // overflow: hidden;
      align-items: center;
      .loginput input {
        border: none;
      }
    }
    .el-form-item__content {
      display: flex;
      align-items: center;
      flex: 1;
    }
  }
  .loginButton {
    padding: 1.25rem 0 50px;
    text-decoration: none;
    > .el-button {
      width: 100%;
      height: 2.5rem;
    }
  }
  .code .el-input__inner {
    border: 0;
  }
}
.loginpadding {
  .el-link--inner {
    display: flex;
    align-items: center;
  }
}
.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  background-color: transparent;
}
</style>