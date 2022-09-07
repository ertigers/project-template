<template>
  <div v-loading="loading" class="user-manage-container" element-loading-text="loading···" element-loading-spinner="el-icon-loading">
    <el-row class="tools-wrapper">
      <el-input v-model="searchQuery.userName" :placeholder="$t('systemSettings.userManage.tools.placeholderName')" style="width: 120px; margin-right: 10px" clearable />
      <el-button style="margin-left:auto" type="primary" @click="fetchUserList">{{ $t('global.button.search') }}</el-button>
      <el-button v-permission="['system:user:add']" type="primary" @click="addUser">{{ $t('global.button.add') }}</el-button>
    </el-row>
    <el-row class="table-wrapper">
      <el-table id="dataList" :data="tableData.rows" style="width: 100%" height="99%" border :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="userName" :label="$t('systemSettings.userManage.tableData.tableCols.name')" min-width="100" />
        <el-table-column prop="status" :label="$t('systemSettings.userManage.tableData.tableCols.status')" min-width="100">
          <template slot-scope="scope">
            <el-tag type="success"> {{ userTypeMap[scope.row.status] }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('systemSettings.userManage.tableData.tableCols.remark')" min-width="100" />
        <el-table-column prop="createTime" :label="$t('systemSettings.userManage.tableData.tableCols.createTime')" min-width="100" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleEdit(scope.row)">{{ $t('global.button.edit') }}</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('global.button.del') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
    <div class="pages-wrapper">
      <el-pagination
        class="is-background"
        :current-page="pageQuery.pageNum"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="pageQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <user-dialog ref="userDialog" />
  </div>
</template>

<script>
import { delRole, getUserList } from '@/api/user'
import { getRoleList } from '@/api/role'
import userDialog from './user-dialog'
import { globalParams } from '@/utils/params'

const defaultFormData = {
  userName: '',
  password: '',
  roleId: ''
}
export default {
  name: 'UserManage',
  components: { 'user-dialog': userDialog },
  data() {
    return {
      loading: false,
      searchQuery: {
        userName: ''
      },
      pageQuery: {
        pageNum: 1,
        pageSize: 10,
        orderValue: 'id',
        orderWay: 'desc'
      },
      tableData: {
        rows: [],
        total: 0
      },
      addDialog: false,
      roleSelect: [],

      userTypeMap: globalParams.userTypeMap
    }
  },
  mounted() {
    this.fetchUserList()
  },
  created() {
    this.initSelect()
  },
  methods: {
    async fetchUserList() {
      const query = { ...this.pageQuery, ...this.searchQuery }
      const { data } = await getUserList(query)
      this.tableData.rows = data.rows
      this.tableData.total = data.total
    },
    // 分页-页码传过去
    handleSizeChange(val) {
      this.pageQuery.pageSize = val
      this.fetchUserList()
    },
    // 下一页-页码传过去
    handleCurrentChange(val) {
      this.pageQuery.pageNum = val
      this.fetchUserList(val)
    },
    // 添加用户
    addUser() {
      this.$refs['userDialog'].form = JSON.parse(JSON.stringify(defaultFormData))
      this.$refs['userDialog'].isEdit = false
      this.$refs['userDialog'].dialog = true
      this.$nextTick(() => {
        this.$refs['userDialog'].$refs['form'].clearValidate()
      })
    },
    handleEdit(row) {
      this.$refs['userDialog'].form = Object.assign({}, {
        userName: row.userName,
        password: row.password,
        roleId: row.roleId
      })
      this.$refs['userDialog'].isEdit = true
      this.$refs['userDialog'].dialog = true
    },
    handleDelete(row) {
      this.$confirm(this.$t('global.confirm.content'), this.$t('global.tip'), {
        confirmButtonText: this.$t('global.button.sure'),
        cancelButtonText: this.$t('global.button.cancel'),
        type: 'warning'
      }).then(() => {
        const roleId = row.userId
        delRole(roleId).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: this.$t('global.message.delSuccess')
            })
            this.fetchUserList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('global.message.cancel')
        })
      })
    },
    initSelect() {
      getRoleList().then(res => {
        this.roleSelect = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
