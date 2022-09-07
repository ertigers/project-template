<template>
  <el-dialog :title="isEdit ? $t('global.button.edit') : $t('global.button.add')" width="800px" :visible.sync="dialog">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <el-form-item prop="userName" :label="$t('systemSettings.userManage.form.label.userName')">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item prop="password" :label="$t('systemSettings.userManage.form.label.password')">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item prop="roleId" :label="$t('systemSettings.userManage.form.label.role')">
        <el-select v-model="form.roleId" style="width:100%" multiple :placeholder="$t('global.selectValue')">
          <el-option
            v-for="item in roleSelect"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onSubmit">{{ $t('global.button.sure') }}</el-button>
      <el-button @click="dialog=false">{{ $t('global.button.cancel') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleSelect } from '@/api/role'
import { addUser, setUser } from '@/api/user'

export default {
  name: '',
  components: {},
  data() {
    return {
      dialog: false,
      isEdit: false,
      form: {
        userName: '',
        password: '',
        roleId: []
      },
      rules: {
        userName: [
          { required: true, message: this.$t('systemSettings.userManage.form.rules.userName'), trigger: 'blur' }
        ],
        password: [
          { required: true, message: this.$t('systemSettings.userManage.form.rules.password'), trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: this.$t('systemSettings.userManage.form.rules.role'), trigger: 'blur' }
        ]
      },
      roleSelect: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.initRoleSelect()
  },
  methods: {
    initRoleSelect() {
      getRoleSelect().then(res => {
        console.log(res.data)
        this.roleSelect = res.data
      })
    },
    onSubmit() {
      this.$refs['form'].validate(async(valid) => {
        console.log(valid)
        if (valid) {
          const res = this.isEdit ? await setUser(this.form) : await addUser(this.form)
          const message = this.isEdit ? this.$t('global.message.editSuccess') : this.$t('global.message.addSuccess')
          if (res.code === 200) {
            this.dialog = false
            this.$message({
              message,
              type: 'success'
            })
            this.$parent.fetchUserList()
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
