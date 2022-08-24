import defaultSettings from '@/settings'

const title = defaultSettings.title || '自助AI算法训练系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
