<template>
    <div class="pass-container">
        <div id="freedoContainer" class="freedo"></div>
        <div class="login_box">
            <div class="login_title" align="center">
                <img src="../assets/images/logo_dl.png" alt="">
            </div>
            <p class="dl">找回密码</p>
            <!-- 表单区域 -->
            <el-form ref="dynamicValidateForm" :model="dynamicValidateForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!-- 邮箱 -->
                <el-form-item prop="email">
                    <el-input v-model="dynamicValidateForm.email"></el-input>
                    <!-- <span class="del">X</span> -->
                </el-form-item>
                <!-- 验证码 -->
                <el-form-item prop="code">
                    <el-input v-model="dynamicValidateForm.code" style="width:240px"></el-input>
                    <el-button type="primary" style="width:146px;height:50px;margin-left:14px">发送验证码</el-button>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btn">
                    <el-button type="primary" >下一步</el-button>
                    <!-- <span class="new">注册新账号</span> -->
                </el-form-item>
            </el-form>
             <p class="zc">
                <router-link :to="{ path: '/login'}">又想起来了</router-link>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
              //这是表单的绑定对象
                dynamicValidateForm: {
                    email: '',
                    code: ''
                }
        }
    },
    methods:{
         init3D() {
                // 初始化三维引擎
                var viewer = Freedo.FdApp.createDefaultViewer("freedoContainer", {}, {
                    showMouseCenterIcon: true, // 显示鼠标中心图标
                    hasProvinceBoundaries: true // 显示中国省界
                });

                // 去掉水印
                viewer.showLogo = false;

                // 定位相机位置到重庆市
                var cameraInfo = [106.612237, 29.572497, 1058.53, 257.556864, -14.108478, 0];
                Freedo.FdCamera.goToByCameraInfo(viewer.scene.camera, cameraInfo);

                // 添加地形高程
                var terrainManager = new Freedo.FdTools.FdTerrain(viewer);
                terrainManager.setTerrain('//terrain.gbim360.com/', 'STK');

                // 添加默认影像图层
                var imageryManager = new Freedo.FdTools.FdImageryLayersManager(viewer);
                imageryManager.addDefaultImageryLayer();
            }
    },
    mounted(){
        this.init3D()
    }
}
</script>
<style lang="less" scoped>
     @import url(../assets/css/widgets.css);

    .container {
        width: 100%;
        height: 100%;
        background: url(../assets/images/back.png);
        background-size: 100% 100%;
    }

    .freedo {
        display: block;
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        bottom: 0;
        border: none;
    }

    .login_container {
        height: 100%;
        background: url(../assets/images/back.jpg) no-repeat;
        background-size: 100% 100%;
    }

        .login_box {
        width: 500px;
        height: 624px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        margin-top: -300px;
        right: 201px;
        background: #05285Ebb;

        .login_title {
            width: 100%;
            height: 35px;
            position: absolute;
            top: 71px;

            p {
                font-size: 26px;
                font-family: Microsoft YaHei;
                font-weight: 500;
                color: #6BC0F9;
                text-align: center;
            }
        }

        .dl {
            font-size: 36px;
            font-family: Microsoft YaHei;
            font-weight: 600;
            color: #fff;
            text-align: center;
            position: absolute;
            left: 50%;
            top: 141px;
            margin-left: -72px;
            margin-bottom: 50px;
        }
    }
     .btn {
        text-align: center;
        margin-top: 100px;

        .el-button--primary {
            width: 100%;
            height: 50px;
            background-color: #4BC2FF;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 600;
            color: #fff;

        }
    }

    .login_form {
        margin: auto;
        width: 400px;
        position: absolute;
        left: 50%;
        top: 236px;
        margin-left: -200px;

        .el-form-item {
            margin-bottom: 50px;
        }
    }

    /deep/ .el-input__inner {
        height: 50px;
        border: 2px solid rgba(232, 235, 240, 1);
        background-color: #fff !important;
    }

    /deep/ .icon-user {
        font-size: 25px;
    }

    /deep/ .icon-3702mima {
        font-size: 25px;
    }

    /deep/ .el-checkbox__inner {
        border-color: #ccc;
        border-radius: 50%;
    }

    /deep/ .el-checkbox__label {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fff;
    }

    .forget {
        position: absolute;
        right: 10px;
        cursor: pointer;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fff;
        a{
            text-decoration: none;
            color: #fff;
        }
    }

    .new {
        color: #072450;
        cursor: pointer;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fff;
    }

    /deep/ .search {
        display: none;
    }

    .del {
        position: absolute;
        width: 14px;
        height: 14px;
        color: #999;
        display: block;
    }

    .el-form-item,
    .btn {
        margin-top: 0px;
    }

    /deep/.el-checkbox:last-of-type {
        margin-left: 10px;
    }

    /deep/ .el-input--prefix .el-input__inner {
        padding-left: 50px;
        opacity: 1;
    }
    .zc{
        position: absolute;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1);
        cursor: pointer;
        a{
            color:#fff;
            text-decoration: none;
        }
    }
</style>
