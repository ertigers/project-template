<template>
  <div v-loading="loading">
    <slot :data="tableData" name="table" />
    <el-pagination
      v-if="!nopager"
      :current-page="pageIndex"
      :page-sizes="pgrpagesizes"
      :page-size="rows"
      :layout="pgrlayout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>

// import axios from 'axios'
import service from '@/utils/request'

import {
  Message
} from 'element-ui'

export default { // extParams 额外参数，可用于搜索
  name: 'MyTable',
  // eslint-disable-next-line vue/require-prop-types,vue/prop-name-casing
  props: ['pagesize', 'url', 'pagesizes', 'layout', 'nopager', 'height', 'ext-params', 'firstPage', 'keepCase'],
  data: function() {
    return {
      tableData: [], // 数据
      pageIndex: 0, // 页面个数
      total: 0, // 总数据量
      rows: 40, // 每页个数
      loading: false,
      qsData: {}
    }
  },
  computed: {
    // 分页去
    pgrpagesizes: function() {
      return this.pagesizes || [40, 100, 200, 400]
    },
    pgrlayout: function() {
      return this.layout || 'total, sizes, prev, pager, next, jumper'
    }
  },
  watch: {
    pagesize: function(nv, ov) {
      this.rows = nv
    },
    url: function(nv, ov) {
      this.reload()
    },
    extParams: function(nv, ov) {
      this.reload()
    }
  },
  mounted: function() {},
  methods: {
    // 加载数据
    loadData: function(qsData) {
      this.loading = true
      var page = this.pageIndex - 1 < 0 ? 0 : this.pageIndex - 1
      var params = {
        pageNum: page + 1,
        pageSize: this.rows,
        order: 0
      }
      if (qsData) {
        this.qsData = qsData
      }
      // 对象拷贝
      Object.assign(params, this.qsData)
      if (this.extParams) {
        Object.assign(params, this.extParams)
      }
      var self = this
      // 请求拿table数据
      service({
        url: this.url,
        method: 'get',
        params: params
      }).then(res => {
        // console.log(res)
        // console.log(res.data)

        // alert(this.url)
        // alert(JSON.stringify(res))
        // alert(JSON.stringify(res.data))

        self.$emit('ontabledata', res.data)
        self.loading = false
        if (res.code === 200) {
          if (!this.keepCase)
          // JSON.keyToLowerCase(res.data.rowData);
          // eslint-disable-next-line brace-style
          { self.tableData = res.data.rows }
          self.total = res.data.total
        } else {
          Message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      }).catch(e => {
        console.log(e)
        Message({
          message: '发生异常' + e,
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    // 刷新表格
    reload: function() {
      this.pageIndex = 1
      this.total = 0
      this.tableData = []
      this.loading = true
      this.loadData()
    },
    // 每页显示个数改变
    handleSizeChange: function(size) {
      this.rows = size
      this.loading = true
      this.loadData()
    },
    // 显示页改变
    handleCurrentChange: function(cur) {
      this.pageIndex = cur
      this.loading = true
      this.loadData()
    }
  }
}
</script>
