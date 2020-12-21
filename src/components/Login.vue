<template>
    <div class="login_container" :class="{addBg:isAddBg}">
        <!-- <HeaderTop title="重庆市城市信息模型(CIM)平台"></HeaderTop> -->
        <Container></Container>
        <div class="login_box">
            <div class="login_title" align="center">
                <img src="../assets/images/logo_dl.png" alt="">
            </div>
            <p class="dl">用户登录</p>
            <!-- 表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" prefix-icon="iconfont1 icondenglu-zhanghao"></el-input>
                    <!-- <span class="del">X</span> -->
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" prefix-icon="iconfont1 icondenglu-mima" type="password">
                    </el-input>
                    <el-checkbox>十天内免登录</el-checkbox>
                    <span class="forget">
                        <router-link :to="{ path: '/password'}">忘记密码？</router-link>
                    </span>
                </el-form-item>
                <!-- 按钮区域 -->
                <el-form-item class="btn">
                    <el-button type="primary" @click="login">登录</el-button>
                    <!-- <span class="new">注册新账号</span> -->
                </el-form-item>
            </el-form>
            <p class="zc">
                <router-link :to="{ path: '/register'}">没账号，马上注册</router-link>
            </p>
        </div>
    </div>
</template>
<script>
    //import HeaderTop from './HeaderTop.vue'
    import Container from "@/components/common/3d/index";
    import {
        initDynamicRoutes
    } from '@/router/index.js'
    import {
        mapMutations
    } from 'vuex';

    export default {
        //components:{ HeaderTop },
        components: {
            Container
        },
        data() {
            return {
                isAddBg: false,
                //这是登录表单的绑定对象
                loginForm: {
                    userName: '',
                    password: ''
                },
                //这是登录表单的验证
                loginFormRules: {
                    //验证用户名
                    userName: [{
                            required: true,
                            message: '请输入登录名称',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 10,
                            message: '长度在 2 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    //验证密码
                    password: [{
                            required: true,
                            message: '请输入登录密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 15,
                            message: '长度在 6 到 15 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            ...mapMutations('token', ['changeLogin']),
            //登录的预验证
            login() {
                //console.log(this);
                let _this = this;
                this.$refs.loginFormRef.validate(valid => {
                    if (!valid) return
                    this.$http.post('/ajaxLogin', this.loginForm, '登录成功').then(data => {
                        if (data == undefined) {
                            return
                        }
                        //登录token管理
                        _this.changeLogin({
                            token: data.token
                        });

                        sessionStorage.setItem('realName', data.realName)
                        this.$http.get('/base/system/getUserPermission', {
                            systemCode: 2
                        }).then(data => {
                            this.$store.commit('login/setRightList', data.menus)
                            // initDynamicRoutes()
                            this.$router.push(data.index)
                        })
                    })
                })
            },
            init3D() {
                bimMap.createEarthScene();
                // 定位相机位置到重庆市
                bimMap.setCurrentCameraInfo([106.495716, 29.511596, 1480.5, 53.779235, -13.22014, 0.134853]);
            },
        },
        mounted() {
            try {
                this.init3D();
            } catch (error) {
                // console.log(error);
                this.isAddBg = true;
            }
        },
        created() {
            let that = this;
            document.onkeydown = function (e) {
                e = window.event || e;
                if (that.$route.path == '/login' && (e.code == 'Enter' || e.code ==
                        'enter')) { //验证在登录界面和按得键是回车键enter
                    that.login(); //登录函数
                }
            }
        }

    }

</script>
<style lang="less" scoped>
    .login_container {
        height: 100%;
        // background: url(../assets/images/back.jpg) no-repeat;
        // background-size: 100% 100%;
    }

    .addBg {
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

        a {
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

    /deep/ .el-checkbox:last-of-type {
        margin-left: 10px;
    }

    /deep/ .el-input--prefix .el-input__inner {
        padding-left: 50px;
        opacity: 1;
    }

    .zc {
        position: absolute;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        cursor: pointer;

        a {
            color: #fff;
            text-decoration: none;
        }
    }

</style>
