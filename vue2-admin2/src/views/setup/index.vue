<template>
  <el-container
    v-if="IPtype"
    v-loading="loading"
    class="setup-container"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.6)"
  >
    <el-main>
      <div ref="info" class="info">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="基本参数" />
          <el-step title="数据库配置" />
          <el-step title="数据库升级" />
          <el-step title="配置完成" />
        </el-steps>
        <div v-if="active == 0" class="form">
          <el-form
            ref="severForm"
            key="serverForm"
            :model="serverForm"
            :rules="rules"
            label-width="120px"
            label-position="left"
          >
            <el-form-item label="serverPort" required>
              <el-input
                v-model="serverForm.serverPort"
                max-length="5"
              />
            </el-form-item>
            <el-form-item label="logsPath" required>
              <el-input v-model="serverForm.logsPath" />
            </el-form-item>
          </el-form>
          <div style="text-align: right">
            <el-button type="primary" size="small" round icon="el-icon-refresh" @click="refresh()">刷新
            </el-button>
            <el-button type="primary" size="small" round icon="el-icon-check" @click="setServerParams()">保存
            </el-button>
            <el-button type="success" size="small" round @click="nextStep()">下一步
              <i class="el-icon-arrow-right el-icon--right" />
            </el-button>
          </div>
        </div>
        <div v-else-if="active == 1" class="form">
          <el-form ref="form" key="form" :model="form" label-width="100px" label-position="left">
            <el-form-item label="主机" required>
              <el-row type="flex" :gutter="10">
                <el-col :span="16">
                  <el-form-item prop="host">
                    <el-input v-model="form.ip" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="port">
                    <el-input
                      v-model.number="form.port"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="数据库" prop="database">
              <el-input v-model="form.dataDaseName" />
            </el-form-item>
            <el-form-item label="用户名" prop="user">
              <el-input v-model="form.userName" type="text" autocomplete="new-password" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.passWord" type="password" autocomplete="new-password" />
            </el-form-item>
          </el-form>
          <div style="text-align: right">
            <el-button type="success" size="small" round icon="el-icon-arrow-left" @click="lastStep()">上一步
            </el-button>
            <el-button type="primary" size="small" round icon="el-icon-refresh" @click="refresh()">刷新
            </el-button>

            <el-button type="primary" size="small" round icon="el-icon-connection" @click="testConnect()">测试连接
            </el-button>
            <el-button type="success" size="small" round :disabled="disabled" @click="nextStep()">下一步
              <i class="el-icon-arrow-right el-icon--right" />
            </el-button>
          </div>
        </div>
        <div v-else-if="active == 2" class="form">
          <el-form label-width="100px">
            <el-form-item label="数据库">
              <el-input v-model="form.database" disabled />
            </el-form-item>
            <el-form-item label="当前版本">
              <el-input v-model="form.currentVersion" disabled />
            </el-form-item>
            <el-form-item label="最新版本">
              <el-input v-model="form.latestVersion" disabled />
            </el-form-item>
          </el-form>
          <div style="text-align: right; position: relative;">
            <el-button type="success" size="small" round icon="el-icon-arrow-left" @click="lastStep()">上一步
            </el-button>
            <el-button type="warning" size="small" round icon="el-icon-refresh-left" @click="initDatabase()">初始化
            </el-button>
            <el-button
              type="success"
              size="small"
              round
              icon="el-icon-upload2"
              :disabled="!this.form.currentVersion || this.form.currentVersion >= this.form.latestVersion"
              @click="upgradeDatabase()"
            >升级
            </el-button>
            <el-button
              type="success"
              size="small"
              round
              :disabled="!(!this.form.currentVersion || this.form.currentVersion >= this.form.latestVersion)"
              @click="nextStep()"
            >下一步
              <i class="el-icon-arrow-right el-icon--right" />
            </el-button>
          </div>
        </div>
        <div v-else>
          <div class="over">
            <span class="el-icon-circle-check">配置完成</span>
          </div>
          <div style="text-align: right">
            <el-button type="success" size="small" round icon="el-icon-arrow-left" @click="lastStep()">上一步
            </el-button>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
  <el-container v-else class="setup-container">
    <el-main>
      <div class="warn">
        <span>请使用localhost或者127.0.0.1进行打开</span>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {
  getServerParams,
  setServerParams,
  getParams,
  getVersion,
  testConnect,
  setParams,
  initDatabase,
  upgradeDatabase,
  saveSqlConfig
} from '@/api/setup'
export default {
  name: '',
  components: {},
  data() {
    return {
      loading: false,
      active: 0,
      disabled: true,
      serverForm: {
        serverPort: '',
        logsPath: ''
      },
      form: {
        ip: '',
        port: '',
        dataDaseName: '',
        userName: '',
        passWord: ''
      },
      rules: {
        mainServerPort: [{ required: true, message: '请输入端口号', trigger: 'blur' }, { type: 'number', validator: this.validatePort, trigger: ['blur', 'change'] }],
        host: [{ required: true, message: '请输入IP地址', trigger: ['blur', 'change'] }],
        port: [{ required: true, message: '请输入端口号', trigger: ['blur', 'change'] }, { type: 'number', validator: this.validatePort, message: '请输入正确的端口号,范围在1到65535', trigger: ['blur', 'change'] }],
        database: [{ required: true, message: '请输入数据库', trigger: ['blur', 'change'] }],
        user: [{ required: true, message: '请输入用户名', trigger: ['blur', 'change'] }],
        password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }]
      },
      IPtype: true
    }
  },
  computed: {},
  watch: {},
  created() { },
  mounted() {
    const host = window.location.hostname
    if (host === 'localhost' || host === '127.0.0.1') {
      // this.getParams();
      this.getServerParams()
    } else {
      this.IPtype = false
      this.$message.error('请使用localhost或者127.0.0.1进行打开')
      return
    }
  },
  methods: {
    // 获得系统参数
    getServerParams() {
      getServerParams().then((res) => {
        Object.assign(this.serverForm, res.data)
      })
    },
    // 设置系统参数
    setServerParams() {
      this.$refs['severForm'].validate((valid) => {
        if (valid) {
          setServerParams(this.serverForm).then(() => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          })
        } else {
          this.$message({
            message: '有参数未填写,请填写必要参数',
            type: 'error'
          })
        }
      })
    },
    // 保存数据库信息
    saveSqlConfig() {
      saveSqlConfig(this.form).then(() => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },
    // 获得数据库参数
    getParams() {
      getParams().then((res) => {
        Object.assign(this.form, res.data)
      })
    },
    // 获得数据库版本
    getVersion() {
      getVersion().then((res) => {
        Object.assign(this.form, res.data)
      })
    },
    // 设置数据库参数
    setParams() {
      const host = window.location.hostname
      if (host === 'localhost' || host === '127.0.0.1') {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.form.port = parseInt(this.form.port)
            setParams(this.form)
              .then(() => {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            this.$message({
              message: '有参数未填写,请填写必要参数',
              type: 'error'
            })
          }
        })
      } else {
        this.$message.error('请使用localhost或者127.0.0.1进行打开')
        return
      }
    },
    // 测试数据库链接
    testConnect() {
      const host = window.location.hostname
      if (host === 'localhost' || host === '127.0.0.1') {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            this.form.port = parseInt(this.form.port)
            testConnect(this.form)
              .then(() => {
                this.$message({
                  message: '连接成功',
                  type: 'success'
                })
                this.disabled = false
                this.loading = false
                saveSqlConfig(this.form)
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            this.$message({
              message: '有参数未填写,请填写必要参数',
              type: 'error'
            })
          }
        })
      } else {
        this.$message.error('请使用localhost或者127.0.0.1进行打开')
        return
      }
    },
    // 初始化数据库
    initDatabase() {
      initDatabase().then(() => {
        this.$message({
          message: '数据库初始化成功',
          type: 'success'
        })
        this.getVersion()
      })
    },
    // 升级数据库
    upgradeDatabase() {
      this.loading = true
      upgradeDatabase().then(() => {
        this.$message({
          message: '数据库升级成功',
          type: 'success'
        })
        this.getVersion()
      }).finally(() => {
        this.loading = false
      })
    },
    // 上一步
    lastStep() {
      if (this.active === 4) {
        this.active = 2
      } else {
        this.active--
      }
    },
    // 下一步
    nextStep() {
      this.active++
      this.disabled = true
      switch (this.active) {
        case 1: this.getParams()
          break
        case 3: this.active = 4
          break
      }
    },
    // 判断port是否在正常范围
    validatePort(rule, value, callback) {
      if (value === '' || typeof value === 'undefined' || value == null) {
        callback(new Error('请输入正确的端口号,范围在1到65535'))
      } else {
        if (value > 0 && value <= 65535) {
          callback()
        } else {
          callback(new Error('请输入正确的端口号,范围在1到65535'))
        }
      }
    },
    // 判断天数是否在正常范围
    CodeDays(rule, value, callback) {
      if (value === '' || typeof value === 'undefined' || value == null) {
        callback(new Error('请输入大于0的天数,范围在1到999'))
      } else {
        if (value > 0) {
          callback()
        } else {
          callback(new Error('请输入大于0的天数,范围在1到999'))
        }
      }
    },
    refresh() {
      if (this.active === 0) {
        this.getServerParams()
      } else {
        this.getParams()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.el-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .el-main {
    height: 100%;
    /* background: url("../assets/img/prevention/bg.png") no-repeat center; */
    background-color: #304156;
    display: flex;
    align-items: center;

    .info {
      width: 30%;
      min-width: 550px;
      margin: 0 auto;
      background-color: rgba(0, 39, 64, 0.6);
      padding: 20px 40px;
      border-radius: 5px;

      >.form {
        margin-top: 20px;
        // height: 300px
      }

      .over {
        height: 150px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          width: fit-content;
          padding: 4px 8px;
          border-radius: 4px;
          color: #67C23A;
          font-size: 30px;
          display: block;
        }

        .icon {
          font-size: 20px;
          color: #67C23A;
        }
      }
    }
  }

  .warn {
    min-width: 550px;
    margin: 0 auto;
    background-color: rgba(0, 39, 64, 0.6);
    padding: 20px 40px;
    border-radius: 5px;

    span {
      width: fit-content;
      padding: 4px 8px;
      border-radius: 4px;
      color: #c23a3a;
      font-size: 30px;
      display: block;
    }
  }
}

::v-deep {
  .el-step__title.is-process {
    color: #409eff;
  }

  .el-switch__label {
    color: #fff;
  }

  .is-active {
    color: #409eff;
  }

}
</style>
