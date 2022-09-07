import moment from 'moment'

// 时间戳格式化日期时间处理
const dateFilter = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (value === null || value === undefined || value === '') return '--'
  const date = moment(value).format(format)
  return date
}

export { dateFilter }
