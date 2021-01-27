<template>
  <div>
    <div class="login-container">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <div class="title">钢材管理系统</div>
        </div>

        <div class="loginInput">
          <h2>登录您的账号</h2>
          <el-form-item prop="username">
            <span class="svg-container">
              <img src="../../assets/images/username.png" />
              <!-- <svg-icon icon-class="user" /> -->
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="请输入帐号"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <img src="../../assets/images/password.png" />
              <!-- <svg-icon icon-class="password" /> -->
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>
          <!-- <el-form-item prop="captcha">
            <span class="svg-container">
              <img src="../../assets/images/codeImg.png" />
            </span>
            <el-input
              style="width: 60%"
              ref="captcha"
              v-model="loginForm.captcha"
              placeholder="请输入图形码"
              name="captcha"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
            <img class="code" @click="getImgCodeUrl()" :src="imgCodeUrlVal" />
          </el-form-item> -->

          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; margin-bottom: 30px"
            @click.native.prevent="handleLogin"
            >登 录</el-button
          >
          <div style="text-align: right">
            <el-button type="text" @click="forgetPwd">忘记密码</el-button>
          </div>
        </div>
        <!-- <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: Tnms#2019</span>
        </div>-->
      </el-form>
    </div>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="100px"
        label-position="right"
        ref="modalForm"
        :model="modalForm"
        :rules="dialogRules"
      >
        <el-form-item label="用户名：" prop="account">
          <el-input
            size="mini"
            v-model="modalForm.account"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item label="原密码：" prop="oldPwd">
          <el-input
            size="mini"
            type="password"
            v-model="modalForm.oldPwd"
            placeholder="请输入原密码"
          />
        </el-form-item>
        <el-form-item label="新密码：" prop="newPwd">
          <el-input
            size="mini"
            type="password"
            v-model="modalForm.newPwd"
            placeholder="请输入新密码"
          />
        </el-form-item>
        <el-form-item label="确认密码：" prop="relPwd">
          <el-input
            size="mini"
            type="password"
            v-model="modalForm.relPwd"
            placeholder="请输入确认密码"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleClose">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          :loading="sureLoading"
          @click="sumbitPwd"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import { changePassword } from "@/api/user";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateCaptcha = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入图形码"));
      } else {
        callback();
      }
    };
    const validateRelPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (this.modalForm.newPwd !== value) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const validateOldPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (this.modalForm.oldPwd === value) {
        callback(new Error("原密码与新密码不能一样"));
      }
    };
    return {
      dxlogo: require("../../assets/images/dxlogo.png"),
      imgCodeUrl: window.BASEURL + "/login/getKaptcha", // 正式
      // imgCodeUrl: "http://132.224.218.204:18082/login/getKaptcha",
      dialogVisible: false,
      sureLoading: false,
      modalForm: {
        account: "",
        oldPwd: "",
        newPwd: "",
        relPwd: "",
      },
      dialogRules: {
        account: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        oldPwd: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        newPwd: [
          { required: true, trigger: "blur", validator: validateOldPassWord },
        ],
        relPwd: [
          { required: true, trigger: "blur", validator: validateRelPassWord },
        ],
      },
      imgCodeUrlVal: "",
      loginForm: {
        username: "admin",
        password: "admin",
        captcha: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
        // captcha: [
        //   { required: true, trigger: "blur", validator: validateCaptcha },
        // ],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    this.getImgCodeUrl();
  },
  methods: {
    // 图形码
    getImgCodeUrl() {
      this.loginForm.captcha = "";
      this.imgCodeUrlVal =
        this.imgCodeUrl + "?_t=" + parseInt(Math.random() * 100000);
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          const date = Date.now();
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((d) => {
              console.log(d)
              this.$router.push("/");
            })
            .catch(() => {})
            .finally(() => {
              this.loading = false;
              this.logInfo(this.cType.button, this.oType.login, date, "登录");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    forgetPwd() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs["modalForm"].resetFields();
    },
    sumbitPwd() {
      const _this = this;

      this.$refs["modalForm"].validate((valid) => {
        if (valid) {
          const f = new FormData();

          _this.sureLoading = true;

          f.append("username", _this.modalForm.account);
          f.append("oldPwd", _this.modalForm.oldPwd);
          f.append("newPwd", _this.modalForm.newPwd);
          changePassword(f)
            .then((res) => {
              if (res.responseCode === 200) {
                _this.$message.success(res.msg);
                _this.handleClose();
              } else {
                _this.$message.error(res.msg);
              }
            })
            .finally(() => {
              _this.sureLoading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="scss">

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/images/newLoginBg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #333;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  // min-height: 100%;
  // width: 100%;
  // background-color: $bg;
  // overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 130px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    margin-bottom: 20px;
    position: relative;
    text-align: center;
    .title {
      margin-left: 20px;
      color: white;
      font-size: 16px;
      display: inline-block;
      height: 29px;
      line-height: 29px;
      vertical-align: top;
    }
  }

  .loginInput {
    background: white;
    padding: 10px 20px;
    border-radius: 5px;
    h2 {
      margin-bottom: 20px;
      font-size: 14px;
      color: #4d6378;
      text-align: center;
    }
  }
  .loginInput >>> .el-form-item__content {
    line-height: 1.2;
  }
  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.code {
  vertical-align: middle;
}
</style>
