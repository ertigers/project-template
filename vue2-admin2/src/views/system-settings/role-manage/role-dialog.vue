<template>
  <el-dialog :title="isEdit ? '编辑' : '新增'" center :visible.sync="dialog">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName" />
      </el-form-item>
      <el-form-item label="key">
        <el-input v-model="form.roleKey" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.status" placeholder="角色类型">
          <el-option
            v-for="item in roleStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="操作集">
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
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="dialog=false">返回</el-button>
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
        roleName: '',
        roleKey: '',
        status: 1,
        description: '',
        operationArray: []
      },
      roleCascaderOptions: [],
      roleStatusList: [{
        value: 0,
        label: '系统角色'
      }, {
        value: 1,
        label: '自定义角色'
      }]
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
      console.log(this.$parent)
      const params = {
        roleName: this.form.roleName,
        roleKey: this.form.roleKey,
        status: this.form.status,
        operationIndexs: this.form.operationArray.join(',')
      }
      console.log(params)
      const res = this.isEdit ? await setRole(params) : await addRole(params)
      const message = this.isEdit ? '编辑成功' : '新增成功'
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
