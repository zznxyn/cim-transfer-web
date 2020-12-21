<template>
    <el-container>
        <!-- 页面侧边栏区域 -->
        <SideBar></SideBar>
        <!-- 主体区域 -->
        <el-container>
            <!-- 头部区域 -->
            <el-header>
                <HeaderTop></HeaderTop>
            </el-header>
            <!-- 右侧主题内容区域 -->
            <el-main>
                <!-- 占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>
<script>
    import HeaderTop from '@/components/headerTop/index.vue'
    import SideBar from '@/components/menu'
    export default {
        components: {
            HeaderTop,
            SideBar
        },
    }

</script>
<style scoped>
    .el-main {
        padding: 30px;
        background-color: #F0F2F7;
    }

    .el-container {
        height: 100%;
    }

    .el-header {
        padding: 0px;
        height: 70px !important;
    }

</style>
