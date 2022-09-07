<template>
  <el-dialog :title="isEdit ? $t('global.button.edit') : $t('global.button.add')" center :visible.sync="dialog">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label="$t('systemSettings.roleManage.form.label.roleName')">
        <el-input v-model="form.roleName" />
      </el-form-item>
      <el-form-item label="key">
        <el-input v-model="form.roleKey" />
      </el-form-item>
      <el-form-item :label="$t('systemSettings.roleManage.form.label.description')">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item :label="$t('systemSettings.roleManage.form.label.operations')">
        <el-cascader
          v-model="form.operationArray"
          :props="{
            value: 'id',
            emitPath: false,
            multiple: true ,
          }"
          :options="roleCascaderOptions"
          collapse-tags
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ $t('global.button.sure') }}</el-button>
        <el-button @click="dialog=false">{{ $t('global.button.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { addRole, setRole } from '@/api/role'
import { getPermissionList } from '@/api/operation'

export default {
  name: '',
  components: {},
  data() {
    return {
      dialog: false,
      isEdit: false,
      form: {
        roleId: '',
        roleName: '',
        roleKey: '',
        status: 1,
        description: '',
        operationArray: []
      },
      roleCascaderOptions: []
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.fetchPermissionList()
  },
  methods: {
    fetchPermissionList() {
      getPermissionList().then((res) => {
        res.data.forEach((item) => {
          item.id = item.label
        })
        this.roleCascaderOptions = res.data
      })
    },
    async onSubmit() {
      const params = {
        roleId: this.form.roleId,
        roleName: this.form.roleName,
        roleKey: this.form.roleKey,
        status: this.form.status,
        operationIndexs: this.form.operationArray.join(',')
      }
      const res = this.isEdit ? await setRole(params) : await addRole(params)
      const message = this.isEdit ? this.$t('global.message.editSuccess') : this.$t('global.message.addSuccess')
      if (res.code === 200) {
        this.dialog = false
        this.$message({
          message,
          type: 'success'
        })
        this.$parent.fetchRoleList()
      }
    }
  }
}
</script>

<style scoped lang="scss">
</style>
