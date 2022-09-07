<template>
  <div v-loading="loading" class="user-manage-container" element-loading-text="loading···" element-loading-spinner="el-icon-loading">
    <el-row class="tools-wrapper">
      <el-input v-model="searchQuery.userName" :placeholder="$t('systemSettings.roleManage.tools.placeholderName')" style="width: 120px; margin-right: 10px" clearable />
      <el-button style="margin-left:auto" type="primary" @click="fetchRoleList">{{ $t('global.button.search') }}</el-button>
      <el-button size="small" type="primary" @click="addRole">{{ $t('global.button.add') }}</el-button>
    </el-row>
    <el-row class="table-wrapper">
      <el-table id="dataList" :data="tableData.rows" style="width: 100%" height="99%" border :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="roleName" :label="$t('systemSettings.roleManage.tableData.tableCols.roleName')" min-width="100" />
        <el-table-column prop="roleKey" label="key" min-width="100" />
        <el-table-column prop="status" :label="$t('systemSettings.roleManage.tableData.tableCols.type')" min-width="100">
          <template slot-scope="scope">
            <el-tag type="success"> {{ roleTypeMap[scope.row.status] }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('systemSettings.roleManage.tableData.tableCols.remark')" min-width="100" />
        <el-table-column :label="$t('systemSettings.roleManage.tableData.tableCols.operation')">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleEdit(scope.row)">{{ $t('global.button.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
    <div class="pages-wrapper">
      <el-pagination class="is-background" :current-page="pageQuery.pageNum" :page-sizes="[10, 20, 50, 100, 200]" :page-size="pageQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <role-dialog ref="roleDialog" />
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'
import RoleDialog from './role-dialog.vue'
import { globalParams } from '@/utils/params'

const defaultFormData = {
  roleId: '',
  roleName: '',
  roleKey: '',
  status: 1,
  description: '',
  operationArray: []
}
export default {
  name: 'RoleManage',
  components: {
    'role-dialog': RoleDialog
  },
  data() {
    return {
      loading: false,
      searchQuery: {
        userName: ''
      },
      pageQuery: {
        pageNum: 1,
        pageSize: 10
      },
      tableData: {
        rows: [],
        total: 0
      },

      roleTypeMap: globalParams.roleTypeMap
    }
  },
  mounted() {
    this.fetchRoleList()
  },
  methods: {
    async fetchRoleList() {
      const query = { ...this.pageQuery, ...this.searchQuery }
      const { data } = await getRoleList(query)
      this.tableData.rows = data.rows
      this.tableData.total = data.total
    },
    // 添加角色
    addRole() {
      this.$refs['roleDialog'].form = JSON.parse(JSON.stringify(defaultFormData))
      this.$refs['roleDialog'].isEdit = false
      this.$refs['roleDialog'].dialog = true
      this.$nextTick(() => {
        this.$refs['roleDialog'].$refs['form'].clearValidate()
      })
    },
    handleEdit(row) {
      this.$refs['roleDialog'].form = Object.assign({}, {
        roleId: row.roleId,
        roleName: row.roleName,
        roleKey: row.roleKey,
        status: row.status,
        operationArray: row.operationIndexs ? row.operationIndexs.split(',') : []
      })
      this.$refs['roleDialog'].isEdit = true
      this.$refs['roleDialog'].dialog = true
    },
    // 分页-页码传过去
    handleSizeChange(val) {
      this.pageQuery.pageSize = val
      this.fetchRoleList()
    },
    // 下一页-页码传过去
    handleCurrentChange(val) {
      this.pageQuery.pageNum = val
      this.fetchRoleList(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.user-manage-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tools-wrapper {
  padding: 10px;
  display: flex;
}

.table-wrapper {
  flex: 1;
  padding: 0 10px;
}

.pages-wrapper {
  height: 50px;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  padding-right: 40px;
}
</style>
