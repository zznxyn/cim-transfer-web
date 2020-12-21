<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-row class="nav_main_area" type="flex" align="middle">
                    <el-col :span="1">
                        <img class="lt_img_main_area" src="../../assets/images/jx.png" alt="">
                    </el-col>
                    <el-col :span="4">
                        <span class="title_main_area">{{title}}</span>
                    </el-col>
                    <el-col :span="1">
                        <img :src="icon" alt="" class="icon_main_area">
                    </el-col>
                    <el-col :span="15">
                        <div class="placeholder_main_area"></div>
                    </el-col>
                    <el-col :span="3">
                        <span class="link_main_area" @click="href2(href2all)">查看全部>></span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            href2all: {
                type: String,
                default: ''
            }
        }
    }

</script>
<style scoped>
    @import '../../assets/css/homepage/mainAreaNav.css';

</style>
