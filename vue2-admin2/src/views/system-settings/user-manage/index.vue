<template>
  <div v-loading="loading" class="user-manage-container" element-loading-text="loading···" element-loading-spinner="el-icon-loading">
    <el-row class="tools-wrapper">
      <el-input v-model="searchQuery.userName" :placeholder="$t('systemSettings.userManage.tools.placeholderName')" style="width: 120px; margin-right: 10px" clearable />
      <el-button style="margin-left:auto" type="primary" @click="fetchUserList">{{ $t('systemSettings.userManage.tools.btnSearch') }}</el-button>
    </el-row>
    <el-row>
      <el-button size="small" type="primary" @click="addUser">添加用户</el-button>
    </el-row>
    <el-row class="table-wrapper">
      <el-table id="dataList" :data="tableData.rows" style="width: 100%" height="99%" border :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="userName" :label="$t('systemSettings.userManage.tableData.tableCols.name')" min-width="100" />
        <el-table-column prop="status" :label="$t('systemSettings.userManage.tableData.tableCols.status')" min-width="100" />
        <el-table-column prop="remark" :label="$t('systemSettings.userManage.tableData.tableCols.remark')" min-width="100" />
        <el-table-column prop="createTime" :label="$t('systemSettings.userManage.tableData.tableCols.createTime')" min-width="100" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="handleEdit(scope.row)">修改</el-button>
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
    <el-dialog title="表单" center :visible.sync="addDialog" :before-close="outClose">
      <el-form ref="form" :model="addForm" label-width="80px">
        <el-form-item label="userName">
          <el-input v-model="addForm.userName" />
        </el-form-item>
        <el-form-item label="password">
          <el-input v-model="addForm.password" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="addForm.roleId" placeholder="请选择">
            <el-option
              v-for="item in roleSelect"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="addDialog=false">返回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, addUser } from '@/api/user'
import { getRoleList } from '@/api/role'

export default {
  name: 'UserManage',
  components: {},
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
      addDialog: false,
      addForm: {
        userName: '',
        password: '',
        roleId: ''
      },
      roleSelect: []
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
      this.addDialog = true
    },
    onSubmit() {
      addUser(this.addForm).then((res) => {
        console.log(res.data)
      })
    },
    outClose(done) {
      this.$confirm('确认关闭', '提示框').then(() => {
        done()
      }).catch(() => {

      })
    },
    handleEdit(row) {
      this.addForm = row
      this.addDialog = true
    },
    initSelect() {
      getRoleList().then(res => {
        console.log(res.data)
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
