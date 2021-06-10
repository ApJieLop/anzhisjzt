<template>
  <div class="loginContainer">
    <div class="login-title">
      <span>安知职业培训平台</span>
    </div>
    <div class="loginControl">
      <div class="loginForm">
        <div class="loginContent">
          <div class="loginTitle">
            <p style="color:#E90101">
              温馨提示：根据国家网络安全要求，密码由大写、小写、数字、特殊符号中任意三种组成，且长度为8－20位。系统识别到您的口令等级较弱，请及时修改密码，确保信息安全。
            </p>
          </div>
          <div class="loginInput">
            <div class="inputbox">
              <el-form
                  ref="passform"
                  :model="ruleForm"
                  :rules="rules"
                  class="elForm"
                  label-position="left"
              >
                <el-form-item label="原密码" prop="oldPassword" class="menuLabel">
                  <el-input
                      type="password"
                      v-model="ruleForm.oldPassword"
                      clearable
                      placeholder="请输入原密码"
                  />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" class="menuLabel">
                  <el-input
                      type="password"
                      v-model="ruleForm.newPassword"
                      clearable
                      placeholder="请输入8-20位且包含小写字母、大写字母、数字、特殊符号中的三种组合"
                  />
                </el-form-item>
                <el-form-item
                    label="确认新密码"
                    prop="newPasswordOk"
                    class="menuLabel"
                >
                  <el-input
                      type="password"
                      v-model="ruleForm.newPasswordOk"
                      clearable
                      placeholder="请再次输入新密码"
                  />
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="loginButton">
            <el-button class="bgc-bv" @click="resetPassword" style="width:100%"
            >修改密码</el-button
            >
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "change",
  data() {
    let validatepass = (rule, value, callback) => {
      if (
          this.ruleForm.newPassword &&
          value.trim() != this.ruleForm.newPassword.trim()
      ) {
        callback(new Error("请检查两次输入的新密码是否相同"));
      } else {
        callback();
      }
    };
    let validPassword = (rule, value, callback) => {
      if (value == this.ruleForm.oldPassword) {
        callback(new Error("新密码与原密码相同！"));
      } else {
        let result = this.checkPassword(value);
        if (!result.flag) {
          callback(new Error(result.msg));
        } else {
          callback();
        }
      }
    };
    return {
      // 公共方法
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validPassword, trigger: "blur" }
        ],
        newPasswordOk: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: validatepass, trigger: "blur" }
        ]
      },
      dialogVisiblemobile: false,
      editForm: {},

    };
  },
  created: function () {
  },
  methods: {
    checkPassword(str) {
      //校验密码，密码长度8-20，必须包含大写字母、小写字母、数字、特殊符号中的三种
      let rC = {
        lW: "[a-z]",
        uW: "[A-Z]",
        nW: "[0-9]",
        sW: "[\\u0020-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E]"
      };
      function Reg(str, rStr) {
        let reg = new RegExp(rStr);
        if (reg.test(str)) return true;
        else return false;
      }
      if (str.length < 8) {
        return { flag: false, msg: "密码长度不得少于8位" };
      } else if (str.length > 20) {
        return { flag: false, msg: "密码长度不得超过20位" };
      } else {
        let tR = {
          l: Reg(str, rC.lW),
          u: Reg(str, rC.uW),
          n: Reg(str, rC.nW),
          s: Reg(str, rC.sW)
        };
        if (
            (tR.l && tR.u && tR.n) ||
            (tR.l && tR.u && tR.s) ||
            (tR.s && tR.u && tR.n) ||
            (tR.s && tR.l && tR.n)
        ) {
          return { flag: true, msg: "" };
        } else {
          return {
            flag: false,
            msg:
                "密码需由  小写字母、大写字母、数字、特殊符号  中的任意三种组成"
          };
        }
      }
    },
    resetPassword() {
      const passform = this.$refs.passform;
      passform.validate(valid => {
        if (valid) {
          this.$post("/sys/admin/modifyPassword", {
            newPassword: this.ruleForm.newPassword,
            oldPassword: this.ruleForm.oldPassword
          }).then(res => {
            if (res.status == "0") {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.passworkchange = true;
              this.passwordShow = false;
              this.$refs.passform.resetFields();
              this.loginOut();
            }
          });
        }
      });
    },
    // 退出
    loginOut() {
      clearInterval(this.getInfosSetInterval);
      this.$post("/logout", {}).catch(err => {console.log(err);})
      this.$store.dispatch("handleDelAll");
      this.$router.push({
        path: "/web/login"
      });
    }
  },
};
</script>
<style lang="less" scoped>
.menuLabel {
  display: flex;
  flex-direction: column;
  width: 300px;
}
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
  text-align: left;
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
    color: #f0f5fb;
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
</style>
<style lang="less" scoped>
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
.el-input__inner {
  width: 300px;
}
</style>