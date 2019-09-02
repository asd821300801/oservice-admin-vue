<template>
  <div class="site-wrapper" :class="{ 'site-sidebar--fold': sidebarFold }" v-loading.fullscreen.lock="loading"
       element-loading-text="拼命加载中">
    <template v-if="!loading">
      <main-navbar></main-navbar>
      <main-sidebar></main-sidebar>
      <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
        <main-content></main-content>
      </div>
    </template>
  </div>
</template>

<script>
  import MainNavbar from './layout/main-navbar'
  import MainSidebar from './layout/main-sidebar'
  import MainContent from './layout/main-content'

  import request from '@/api/sys/user';

  export default {
    data () {
      return {
        loading: true
      }
    },
    components: {
      MainNavbar,
      MainSidebar,
      MainContent
    },
    computed: {
      documentClientHeight: {
        get () {
          return this.$store.state.common.documentClientHeight
        },
        set (val) {
          this.$store.commit('common/updateDocumentClientHeight', val)
        }
      },
      sidebarFold: {
        get () {
          return this.$store.state.common.sidebarFold
        }
      },
      userId: {
        get () {
          return this.$store.state.user.id
        },
        set (val) {
          this.$store.commit('user/updateId', val)
        }
      },
      userName: {
        get () {
          return this.$store.state.user.name
        },
        set (val) {
          this.$store.commit('user/updateName', val)
        }
      }
    },
    created () {
      this.getUserInfo()
    },
    mounted () {
      this.resetDocumentClientHeight()
    },
    methods: {
      // 重置窗口可视高度
      resetDocumentClientHeight () {
        let _this = this;
        _this.documentClientHeight = document.documentElement['clientHeight'];
        window.onresize = () => {
          _this.documentClientHeight = document.documentElement['clientHeight']
        };
        // 设置主题
        _this.$store.commit('common/updateNavbarLayoutType', 'inverse');
        _this.$store.commit('common/updateSidebarLayoutSkin', 'dark')
      },
      // 获取当前管理员信息
      getUserInfo () {
        let _this = this;
        request.getLoginUserInfo().then(data => {
          if (data && data.code === 0) {
            _this.loading = false;
            _this.userId = data.user.userId;
            _this.userName = data.user.username
          }
        });
      }
    }
  }
</script>
