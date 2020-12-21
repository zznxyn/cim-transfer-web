<template>
    <el-row type="flex" align="middle" justify="center" :gutter="20">
        <el-col :span="12">
            <img src="@/assets/images/people.png" alt />
        </el-col>
        <el-col :span="12">
            <p class="font_mid al_mid">{{realName}}</p>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data() {
        return {
           realName: sessionStorage.getItem('realName') 
        }
    }
}
</script>
<style lang="less" scoped>
    .el-col-12 {
        padding: 0!important;
    }
</style>