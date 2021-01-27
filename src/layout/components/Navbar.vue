<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <div class="avatar-wrapper" style="font-size: 14px">
        欢迎&nbsp;&nbsp;&nbsp;
        <span>{{ name }}</span>
        <i
          class="el-icon-switch-button title_right"
          style="margin-left: 20px"
          title="退出登录"
          @click="logout"
        ></i>
        <i
          class="el-icon-key title_right"
          style="margin-right: 40px"
          title="修改密码"
          @click="checkPwd"
        ></i>
      </div>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <el-form :model="pwdForm" :rules="rules" label-width="80px" ref="pwdForm">
        <el-form-item label="原密码：" prop="oldPwd">
          <el-input
            size="mini"
            v-model="pwdForm.oldPwd"
            placeholder="请输入原密码"
          />
        </el-form-item>
        <el-form-item label="新密码：" prop="newPwd">
          <el-input
            size="mini"
            v-model="pwdForm.newPwd"
            placeholder="请输入新密码"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button
          type="primary"
          @click="handleSure"
          size="mini"
          :loading="sureLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { changePassword } from "@/api/user";

export default {
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      dialogVisible: false,
      sureLoading: false,
      pwdForm: {
        oldPwd: "",
        newPwd: "",
      },
      rules: {
        oldPwd: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
        ],
        newPwd: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    logout() {
      this.$confirm("确定要退出系统吗?", "温馨提示：", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        })
        .catch(() => {
          console.log("取消");
        });
    },
    // 关闭modal框时回调
    handleClose() {
      this.dialogVisible = false;
      this.$refs["pwdForm"].resetFields();
    },
    // 点击修改密码打开弹框
    checkPwd() {
      this.dialogVisible = true;
    },
    // 确定
    handleSure() {
      const _this = this;
      _this.$refs["pwdForm"].validate((valid) => {
        if (valid) {
          if (d.errocode !== '00') {
            _this.$message.error(d.erroinfo);
            return
          }
          const f = new FormData();
          f.append("username", _this.name);
          f.append("oldPwd", _this.pwdForm.oldPwd);
          f.append("newPwd", _this.pwdForm.newPwd);
          _this.sureLoading = true;

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

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.title_right {
  font-size: 22px;
  cursor: pointer;
  margin: 0 5px;
}
</style>
