<template>
    <div class="left_menuBox">
        <el-aside :width="isCollapse ? '68px' : '270px'">
            <div class="header_left">
                <img src="@/assets/images/logo-sub.png" v-if="play" alt/>
            </div>
            <!-- 菜单区域 -->
            <el-menu background-color="#20222A" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true"
                     :class="{ paddleft:ispaddleft}" :collapse="isCollapse" :collapse-transition="false" router
                     :default-active="activePath">
                <template v-for="(item,key) in menulist">
                    <el-submenu :key="item.id" v-if="item.children && item.children.length !== 0"
                                :index="item.id + ''">
                        <template slot="title">
                            <i :class="['iconfont',item.menuIcon]"></i>
                            <span class="title">{{item.menuName}}</span>
                            <i class="iconfont2 icondaohang-shouqi el-submenu__icon-arrow"></i>
                        </template>
                        <el-menu-item v-for="val in item.children" :index=" '/' + val.menuUrl" :key="val.id"
                                      @click="saveNavState('/' + val.menuUrl)">
                            {{val.menuName}}
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else-if="item.menuUrl == ''" :index="''" :key="item.menuName">
                        <i :class="['iconfont',item.menuIcon]"></i>
                        <span slot="title" class="title">{{item.menuName}}</span>
                    </el-menu-item>
                    <el-menu-item v-else :key="key.id" :index="'/' + item.menuUrl"
                                  @click="saveNavState('/' + item.menuUrl)">
                        <i :class="['iconfont',item.menuIcon]"></i>
                        <span slot="title" class="title">{{item.menuName}}</span>
                    </el-menu-item>
                </template>
            </el-menu>
        </el-aside>
        <!-- 点击折叠展开菜单 -->
        <div class="toggle-button">
            <div class="menu-link" :class="{ clickIcon: menuIcon }" @click="toggleCollapse"></div>
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
                // 左侧菜单数据
                menulist: [],
                isCollapse: false,
                //被激活的链接地址
                activePath: '',
                play: true,
                ispaddleft: false,
                menuIcon: false
            }
        },
        created() {
            this.menulist = this.rightList;
            this.refreshActivePath();
            window.addEventListener('resetLocalStorage', this.refreshActivePath);
        },
        methods: {
            //保存链接激活状态
            saveNavState(activePath) {
                window.sessionStorage.setItem('activePath', activePath)
                this.activePath = activePath
            },
            // 点击按钮切换菜单的折叠和展开
            toggleCollapse() {
                this.isCollapse = !this.isCollapse
                this.play = !this.play
                this.ispaddleft = !this.ispaddleft
                this.menuIcon = !this.menuIcon
            },
            refreshActivePath() {
                let storageActivePath = sessionStorage.getItem('activePath');
                storageActivePath = storageActivePath === null ? '/main' : storageActivePath
                // 处理详情页等带有id的情况
                if (storageActivePath.lastIndexOf('/') !== 0) {
                    this.activePath = storageActivePath.substring(0, storageActivePath.lastIndexOf('/'))
                } else {
                    this.activePath = storageActivePath
                }
            }
        },
        computed: {
            ...mapState('login', ['rightList'])
        },
        destroyed() {
            window.sessionStorage.removeItem('activePath');
        }
    }

</script>
<style lang="less" scoped>
    .title {
        padding-left: 5px;
    }

    .left_menuBox {
        position: relative;
        background-color: #05285E;
    }

    .el-aside {
        height: 100%;
        background: #05285E;
        overflow-x: hidden;
    }

    .toggle-button {
        position: absolute;
        top: 50%;
        right: -9px;
        transform: translateY(-50%);

        .menu-link {
            width: 10Px;
            height: 60Px;
            background-image: url("../../assets/images/menu_new.png");
            background-repeat: no-repeat;
            cursor: pointer;
            background-size: 100%;
        }
    }

    .toggle-button .menu-link:hover {
        background-image: url("../../assets/images/hover_menu.png");
    }

    .clickIcon {
        background-image: url("../../assets/images/click_menu.png") !important;
    }

    .header_left {
        height: 70px;
        overflow-y: hidden;

        img {
            margin-top: 19px;
            margin-left: 56px;
        }
    }

    .el-menu {
        border-right: none;
        background-color: #05285E !important;
        padding-left: 35px;
        margin-top: 38px;
        height: calc(100% - 108px);
        overflow-y: auto;
    }

    /deep/ .el-menu--inline {
        background-color: #05285E !important;
    }

    .el-menu .el-menu-item {
        background-color: #05285E !important;
        border-radius: 30px 0 0 30px;
        margin-bottom: 45px;
        padding-left: 5px;
        height: 50px;
        line-height: 50px;
    }

    .el-menu--vertical .el-menu--popup .el-menu-item {
        margin-bottom: 0 !important;
    }

    /deep/ .el-tooltip__popper.is-dark {
        background: #05285E;
    }

    .el-menu .el-submenu .el-menu--inline .el-menu-item {
        margin-bottom: 0px;
    }

    .el-submenu {
        padding-bottom: 45px;
    }

    /deep/ .el-submenu .el-submenu__title {
        background-color: #05285E !important;
    }

    .el-menu .el-menu-item.is-active {
        background-color: #4BC2FF !important;
        height: 50px;
        line-height: 50px;
        color: #fff !important;
        font-size: 14px;
    }

    .el-menu--vertical .el-menu .el-menu-item.is-active {
        background: none !important;
        color: #4BC2FF !important;
    }

    /deep/ .el-submenu__title.is-active {
        background-color: #4BC2FF !important;
        /*border-radius: 30px 0 0 30px;*/
        height: 60px;
        line-height: 60px;
        color: #fff !important;
    }

    /deep/ .el-submenu .el-submenu__title {
        font-size: 18px !important;
        font-family: PingFang SC;
        height: 50px;
        line-height: 50px;
    }

    /deep/ .el-menu .el-menu-item span {
        font-size: 18px;
        font-family: PingFang SC;
    }

    .el-menu .el-menu-item i {
        color: white;
    }

    .el-submenu__title i {
        color: white;
    }

    .el-submenu.is-opened > .el-submenu__title .el-submenu__icon-arrow {
        transform: rotateZ(90deg);
    }

    /deep/ .el-icon-arrow-down {
        display: none;
    }

    .paddleft {
        padding-left: 4px;
    }

    .el-menu::-webkit-scrollbar {
        display: none !important; //Safari and Chrome
    }
</style>
