<template>
    <el-row type="flex" align="middle">
        <el-col :span="loginCols">
            <Logo></Logo>
        </el-col>
        <el-col :span="blankCols">
            <p class="title"></p>
        </el-col>
        <el-col :span="plugCols">
            <el-row type="flex" align="middle">
                <el-col :span="24-separatorCols">
                    <PersonInfo></PersonInfo>
                </el-col>
                <el-col :span="separatorCols">
                    <Separator></Separator>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="plugCols">
            <el-row type="flex" align="middle">
                <el-col :span="24-separatorCols">
                    <Weather></Weather>
                </el-col>
                <el-col :span="separatorCols">
                    <Separator></Separator>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="plugCols">
            <el-row type="flex" align="middle">
                <el-col :span="24-separatorCols">
                    <DateInfo></DateInfo>
                </el-col>
                <el-col :span="separatorCols">
                    <Separator></Separator>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="smallPlugCols">
            <el-row type="flex" align="middle">
                <el-col :span="12">
                    <LoginOut></LoginOut>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
    import PersonInfo from '@/components/headerTop/personInfo.vue'
    import Weather from '@/components/headerTop/weather.vue'
    import DateInfo from '@/components/headerTop/date.vue'
    import LoginOut from '@/components/headerTop/loginOut.vue'
    import Separator from '@/components/headerTop/separator.vue'
    import Logo from '@/components/headerTop/logo.vue'

    export default {
        name: "HeaderTop",
        components: {
            PersonInfo,
            Weather,
            DateInfo,
            LoginOut,
            Logo,
            Separator
        },
        data() {
            return {
                plugCols: 2,
                smallPlugCols: 1,
                loginCols: 10,
                blankCols: 7,
                separatorCols: 6
            }
        }


    };

</script>
<style lang="less" scoped>
    .el-row {
        height: 100%;
    }

    .el-col {
        // border: 1px solid red;
        // height: 100%;
    }
</style>
