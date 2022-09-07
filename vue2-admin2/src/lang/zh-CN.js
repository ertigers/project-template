export default {
  global: {
    selectValue: '请选择',
    inputValue: '请输入',
    unKnown: '未知',
    tip: '提示',
    button: {
      search: '搜索',
      add: '添加',
      edit: '编辑',
      del: '删除',
      sure: '确定',
      cancel: '取消'
    },
    message: {
      delSuccess: '删除成功',
      editSuccess: '编辑成功',
      addSuccess: '新增成功',
      cancel: '已取消'
    },
    confirm: {
      content: '确定删除？'
    }
  },
  paramsList: {
    genderType: {
      unKnown: '未知',
      male: '男',
      female: '女'
    },
    roleType: {
      systemRole: '系统角色',
      customRole: '自定义角色'
    },
    userType: {
      systemUser: '系统用户',
      customUser: '自定义用户'
    }
  },
  route: {
    dashboard: '首页',
    systemSettings: '系统设置',
    userManage: '用户管理',
    roleManage: '角色管理',
    permissionManage: '权限管理'
  },
  login: {
    title: '自助AI智能算法训练平台',
    login: '登录'
  },
  components: {
    header: {
      title: '自助AI智能算法训练平台',
      dashboard: '首页',
      logout: '登出',
      chooseLanguage: '选择语言'
    }
  },
  systemSettings: {
    userManage: {
      tools: {
        placeholderName: '姓名'
      },
      tableData: {
        tableCols: {
          name: '姓名',
          remark: '备注',
          createTime: '创建时间',
          status: '状态'
        }
      },
      form: {
        label: {
          userName: '用户名称',
          password: '密码',
          role: '角色'
        },
        rules: {
          userName: '请输入用户名',
          password: '请输入密码',
          role: '请选择角色'
        }
      }
    },
    roleManage: {
      tools: {
        placeholderName: '姓名'
      },
      tableData: {
        tableCols: {
          roleName: '姓名',
          type: '类型',
          remark: '备注',
          operation: '操作'
        }
      },
      form: {
        label: {
          roleName: '角色名称',
          description: '描述',
          type: '类型',
          remark: '备注',
          operations: '操作集'
        }
      }
    }
  }
}
