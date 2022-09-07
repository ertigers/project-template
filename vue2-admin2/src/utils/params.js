
import i18n from '../lang/index'

const globalParams = {
  // 性别
  genderTypeList: [
    { value: 0, label: i18n.t('paramsList.genderType.unKnown') },
    { value: 1, label: i18n.t('paramsList.genderType.male') },
    { value: 2, label: i18n.t('paramsList.genderType.female') }
  ],
  genderTypeMap: {
    0: i18n.t('paramsList.genderType.unKnown'),
    1: i18n.t('paramsList.genderType.male'),
    2: i18n.t('paramsList.genderType.female')
  },
  // 用户类型
  userTypeList: [
    { value: 0, label: i18n.t('paramsList.userType.systemUser') },
    { value: 1, label: i18n.t('paramsList.userType.customUser') }
  ],
  userTypeMap: {
    0: i18n.t('paramsList.userType.systemUser'),
    1: i18n.t('paramsList.userType.customUser')
  },
  // 角色类型
  roleTypeList: [
    { value: 0, label: i18n.t('paramsList.roleType.systemRole') },
    { value: 1, label: i18n.t('paramsList.roleType.customRole') }
  ],
  roleTypeMap: {
    0: i18n.t('paramsList.roleType.systemRole'),
    1: i18n.t('paramsList.roleType.customRole')
  }
}

export { globalParams }
