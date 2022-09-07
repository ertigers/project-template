<template>
  <div v-loading="loading" class="user-manage-container" element-loading-text="loading···" element-loading-spinner="el-icon-loading">
    <el-row class="tools-wrapper">
      <el-select v-model="searchQuery.type" placeholder="请选择">
        <el-option v-for="item in logsTypeSelect" :key="item.key" :label="item.value" :value="item.key" />
      </el-select>
      <el-button style="margin-left:auto" type="primary" @click="fetchUserList">{{ $t('global.button.search') }}</el-button>
    </el-row>

    <el-row class="table-wrapper">
      <el-table id="dataList" :data="tableData.rows" style="width: 100%" height="99%" border :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
        <el-table-column prop="type" label="type" min-width="100" />
        <el-table-column prop="userid" label="userid" min-width="100" />
        <el-table-column prop="time" label="time" min-width="100" />
        <el-table-column prop="content" label="content" min-width="100" />
        <el-table-column prop="createtime" label="createtime" min-width="100" />
      </el-table>
    </el-row>
    <!-- 分页 -->
    <div class="pages-wrapper">
      <el-pagination class="is-background" :current-page="pageQuery.pageNum" :page-sizes="[10, 20, 50, 100, 200]" :page-size="pageQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import { getLogsList, getTypeSelect } from '@/api/logs'

export default {
  name: 'LogsManage',
  data() {
    return {
      loading: false,
      searchQuery: {
        type: ''
      },
      pageQuery: {
        pageNum: 1,
        pageSize: 10,
        orderValue: 'time',
        orderWay: 'desc'
      },
      tableData: {
        rows: [],
        total: 0
      },
      logsTypeSelect: []
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
      const { data } = await getLogsList(query)
      this.tableData.rows = data.rows
      this.tableData.total = data.total
    },
    // 分页-页码传过去
    handleSizeChange(val) {
      alert('handleSizeChange')
      this.pageQuery.pageSize = val
      this.fetchUserList()
    },
    // 下一页-页码传过去
    handleCurrentChange(val) {
      this.pageQuery.pageNum = val
      this.fetchUserList(val)
    },
    // 日志type下拉框
    initSelect() {
      getTypeSelect().then((res) => {
        console.log(res.data)
        this.logsTypeSelect = res.data
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
