<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo">
        <span>Tsing</span>
        <span>link</span>
        <div>清新互联员工考勤系统</div>
      </div>
      <van-form @submit="confirmLogin" v-if="config.type === 'mobile'">
        <van-field
          v-model="loginForm.mobile"
          name="手机号"
          label-width="60"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
          v-model="loginForm.code"
          name="验证码"
          label-width="60"
          style="display: flex; align-items: center"
          label="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请输入短信验证码' }]"
        >
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click.prevent="handleSendCode"
              >发送验证码</van-button
            >
          </template>
        </van-field>

        <div style="margin: 16px">
          <van-button block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
        <div class="tools">
          <van-checkbox v-model="loginForm.checked" shape="square"
            >记住密码</van-checkbox
          >
          <span @click="config.type = 'username'">使用账户登录</span>
        </div>
      </van-form>
      <van-form @submit="confirmLogin" v-else>
        <van-field
          v-model="loginForm.loginid"
          name="用户名"
          label-width="60"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          name="密码"
          label-width="60"
          label="密码"
          placeholder="密码"
          :rules="[
          { required: true, message: '请填写密码' },
          { pattern:/^\S{6,}$/,message:'不少于6位'},
          ]"
        />

        <div style="margin: 16px">
          <van-button block type="primary" native-type="submit">
            登录
          </van-button>
        </div>
        <div class="tools">
          <van-checkbox v-model="loginForm.checked" shape="square"
            >记住密码</van-checkbox
          >
          <span @click="config.type = 'mobile'">使用手机号登录</span>
        </div>
      </van-form>
    </div>
    <div class="text-box">
      <div>企业内部使用,不对外开放注册</div>
      <!-- <div>c2018 Tsinglink.All Rights Reserved.</div> -->
      <div>{{ copyrightTxt }}</div>
    </div>
    <van-popup
      v-model="showCatcha"
      :style="{ width: '90%', background: 'transparent' }"
    >
      <div class="content">
        <captcha
          class="content-captcha"
          ref="dialogopen"
          :callback="handleCatchaFn"
          :l="42"
          :r="10"
          :w="catcha.w"
          :h="catcha.h"
          :sw="catcha.sw"
          :sh="catcha.sh"
          :blocky="catcha.blocky"
          :imgurl="catcha.imgurl"
          :miniimgurl="catcha.miniimgurl"
          :slider-text="catcha.text"
        ></captcha>
      </div>
    </van-popup>
  </div>
</template>

<script>
import auth from "@/api/auth.js";
import md5 from "md5";
import Captcha from "./captha.vue";

import {
  getLoginInfo,
  setLoginInfo,
  removeLoginInfo,
  getUserInfo,
  setUserInfo,
} from "@/utils/auth";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginid: "",
        password: "",

        mobile: "",
        code: "",

        epid: "tsinglink",
        checked: true,
        captcha: "",
      },
      copyrightTxt: "",

      showCatcha: false,
      catcha: {
        blocky: 0,
        imgurl: "",
        miniimgurl: "",
        text: "向右滑动完成拼图",
        h: 220,
        w: 550,
        sh: 45,
        sw: 45,
        modifyImg: "",
      }, // 图片验证码传值
      sugar: {},
      config: {
        clientType: "",
        mode: "cloud",
        type: "username",
      },
    };
  },
  components: {
    Captcha,
  },
  mounted() {
    this.initLogin();
  },
  methods: {
    // 初始化登录信息
    initLogin() {
      let userInfo = getUserInfo();
      if (userInfo) {
        this.$router.push({ path: "/home" });
      } else {
        let loginInfo = getLoginInfo();
        if (loginInfo && loginInfo.checked) {
          this.loginForm.loginid = loginInfo.loginid;
          this.loginForm.epid = loginInfo.epid;
          this.loginForm.password = loginInfo.password;
        }
      }
      let year = this.$moment().year();
      this.copyrightTxt = `© 2014-${year} 安徽清新互联信息科技有限公司 版权所有`;
    },
    // 提交登录请求
    confirmLogin() {
      console.log(111);
      this.get_captcha();
      this.showCatcha = true;
    },
    // 提交登录
    async onSubmit() {
      try {
        let params = {
          loginid: this.loginForm.loginid,
          password: md5(this.loginForm.password).toUpperCase(),
          epid: this.loginForm.epid,
          captcha: this.loginForm.captcha,
          clientType: this.config.clientType || "",
        };

        if (this.config.mode === "cloud") {
          console.log(params.password, this.sugar);
          params.password = this.confusion(params.password, this.sugar);
        } else {
          params.password = params.password.toLowerCase();
        }

        let rv = await auth.login(params);
        console.log(rv);
        if (this.loginForm.checked) {
          setLoginInfo(this.loginForm);
        } else {
          removeLoginInfo();
        }
        // let qxmis = getUserInfo();
        if (rv.code === 0) {
          setUserInfo(rv.employee);
          this.showCatcha = false;
          this.$router.push("/home");
          this.$toast.success("登录成功!");
          // if(qxmis.code === 301){
          //   this.$toast('密码已到期，立即修改')
          // }else if(qxmis.code ===302){
          //   this.$toast('密码即将到期，请尽快修改密码')
          // }else if(qxmis.code ===8 ){
          //   this.$toast('登录次数过多，请联系管理员解锁账户')
          // }
        }
      } catch (error) {
        console.log(error);
        if (error.code === 10) {
          this.get_captcha();
        } else if (error.code === 102) {
          this.showCatcha = false;
        }
      }
    },

    // 获取验证码
    get_captcha() {
      auth.get_captcha().then((res) => {
        if (res && res.data) {
          let imgobj = res.data;
          this.catcha.blocky = imgobj.y / 1.57;
          this.catcha.imgurl = imgobj.image;
          this.catcha.miniimgurl = imgobj.fragment;
          this.sugar = res.sugar || "";
          this.$nextTick(() => {
            if (this.$refs.dialogopen) {
              this.$refs.dialogopen.reset(imgobj.y);
            }
          });
        }
      });
    },
    // 滑动拼图
    handleCatchaFn({ type, params }) {
      console.log(type, params);
      if (type == "verify") {
        // 滑动完成，提交
        this.loginForm.captcha = params.x;
        this.onSubmit();
      } else if (type == "refresh") {
        this.get_captcha();
      } else if (type == "back") {
        this.showCatcha = false;
      }
    },
    // * 混淆
    confusion(p, sugar) {
      let randomString = sugar.text.substr(0, 16);
      let valueString = sugar.text.substr(16);
      let range = sugar.range;
      let answerString;
      for (let i = 0; i < range; i++) {
        let s = md5(randomString + i).toUpperCase();
        if (s == valueString) {
          answerString = md5(i + randomString).toUpperCase();
          break;
        }
      }
      return (
        answerString.substr(0, 16) + p.toUpperCase() + answerString.substr(16)
      );
    },
    // 发送短信验证码
    handleSendCode() {
      if (!this.$validator.isMobile(this.loginForm.mobile)) {
        this.$toast.fail("请输入正确的手机号码");
      }
      console.log("发送短信验证码");
      // todo调用接口
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #2581ff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .login-box {
    margin-top: 50%;
    width: 80%;
    padding: 50px 20px;
    background-color: #fff;
    border-radius: 8px;
    .logo {
      margin-bottom: 40px;
      padding-left: 12px;
      span {
        font-size: 24px;
      }
      div {
        color: #ccd1d9;
        margin-top: 6px;
      }
      span:nth-child(1) {
        color: #2580fd;
      }
      span:nth-child(2) {
        color: #1aad19;
      }
    }
    .tools {
      display: flex;
      justify-content: space-between;
      padding-left: 20px;
      margin-top: 10px;
      font-size: 14px;
      > span {
        color: #2580fd;
        margin-right: 18px;
      }
    }
  }
  .text-box {
    font-size: 12px;
    color: #bbbbbb;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.content {
  transform: scale(60%) translate(-90px, 0);
}
</style>
