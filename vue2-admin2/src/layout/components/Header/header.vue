<template>
  <div class="header-wrap">
    <div class="left-box">
      <h2>{{ $t('components.header.title') }}</h2>
    </div>
    <div class="right-box">
      <i class="el-icon-bell" />
      <div class="box-item">
        <lang-select />
      </div>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../../icons/gif/avatar.gif" class="user-avatar">
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> {{ $t('components.header.dashboard') }} </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('components.header.logout') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import LangSelect from '@/components/LangSelect'

export default {
  name: 'Header',
  components: {
    'lang-select': LangSelect
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 30px;
  background-color: #304156;
  .left-box {
    color: aliceblue;
  }
  .right-box {
    display: flex;
    align-items: center;
    > i, .box-item{
      color: aliceblue;
      margin-left: 20px;
      cursor: pointer;
    }
    .avatar-container {
      margin-left: 20px;
      .avatar-wrapper {
        margin-top: 5px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

      }
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
