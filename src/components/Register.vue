<template>
    <div class="register_container">
        <Container></Container>
        <div class="register">
            <div class="header" :class="{regisContent:hideRegisContent}">
                <img src="../assets/images/logo_dl.png" alt="">
                <p>
                    <router-link :to="{ path: '/login' }">有账号，去登录~</router-link>
                </p>
            </div>
            <p class="p1" :class="{regisContent:hideRegisContent}">欢迎注册</p>
            <div class="register-content" :class="{regisContent:hideRegisContent}">
                <div class="personal-message">
                    <p class="p2">个人信息</p>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model.trim="ruleForm.userName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model.trim="ruleForm.email" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model.number="ruleForm.password"></el-input>
                        </el-form-item>
                        <div class="enterprise-message">
                            <p class="p2">企业信息</p>
                            <el-form-item label="企业名称" prop="name">
                                <el-input v-model.trim="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="项目" prop="businessId">
                                <el-select v-model="ruleForm.businessId" clearable placeholder="请选择项目">
                                    <el-option v-for="item in businessList" :key="item.id" :label="item.businessName"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="企业类型" prop="type">
                                <el-radio-group v-model="ruleForm.type">
                                    <el-radio :label="0" name="type">设计单位</el-radio>
                                    <el-radio :label="1" name="type">建设单位</el-radio>
                                    <el-radio :label="2" name="type">维营单位</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="注册地址" prop="registeredAddress">
                                <el-input v-model.trim="ruleForm.registeredAddress"></el-input>
                            </el-form-item>
                            <el-form-item label="法人" prop="legalPerson">
                                <el-input v-model.trim="ruleForm.legalPerson"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人" prop="contact">
                                <el-input v-model.trim="ruleForm.contact"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="phone">
                                <el-input v-model.trim="ruleForm.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="营业执照" prop="businessLicense">
                                <el-upload class="upload-demo" action="" ref="upload" :auto-upload="false" :limit="1"
                                    :on-exceed="handleExceed" :multiple="false" :on-change="resetFileList">
                                    <span class="sc">
                                        <img src="../assets/images/sz.png" alt="">
                                        上传图片
                                    </span>
                                </el-upload>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div class="btn">
                        <router-link :to="{ path: '/login' }">
                            <span>取消</span>
                        </router-link>
                        <span @click="register">完成</span>
                    </div>
                </div>
            </div>
            <div class="success" :class="{ newSuccess: showSuccess}">
                <img src="../assets/images/zccg.png" alt="">
                <span>恭喜你，注册成功</span>
                <div>
                    <router-link :to="{path:'/login'}">马上登陆</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import Container from "@/components/common/3d/index";
    import {
        isvalidUsername
    } from '@/utils/validate'
    export default {
        components: {
            Container
        },
        data() {
            var validUsername = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入用户名"));
                } else if (!(value.indexOf(" ") == -1)) {
                    callback(
                        new Error(
                            "不允许有空格"
                        )
                    );
                }
            };
            return {
                ruleForm: {
                    userName: '',
                    email: '',
                    password: '',
                    name: '',
                    type: '',
                    registeredAddress: '',
                    legalPerson: '',
                    contact: '',
                    phone: '',
                    businessId: '',
                    businessLicense: ''
                },
                fileList: [],
                businessList: [],
                showSuccess: false,
                hideRegisContent: false,
                rules: {
                    userName: [{
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur'
                    }],
                    email: [{
                        required: true,
                        message: '请填写邮箱',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }],
                    name: [{
                        required: true,
                        message: '请填写企业信息',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '请选择企业类型',
                        trigger: 'change'
                    }],
                    registeredAddress: [{
                        required: true,
                        message: '请填写注册地址',
                        trigger: 'blur'
                    }],
                    legalPerson: [{
                        required: true,
                        message: '请填写法人信息',
                        trigger: 'blur'
                    }],
                    contact: [{
                        required: true,
                        message: '请填写联系人',
                        trigger: 'blur'
                    }],
                    phone: [{
                        required: true,
                        message: '请填写联系电话',
                        trigger: 'blur'
                    }],
                    businessLicense: [{
                        required: true,
                        message: '请上传营业执照',
                        trigger: 'blur'
                    }],
                    businessId: [{
                        required: true,
                        message: '请选择项目',
                        trigger: 'change'
                    }]
                }
            }
        },
        methods: {
            init3D() {
                bimMap.createEarthScene();
                // 定位相机位置到重庆市
                bimMap.setCurrentCameraInfo([106.495716, 29.511596, 1480.5, 53.779235, -13.22014, 0.134853]);
            },
            // 文件上传触发的事件
            resetFileList(file, uploadedFileList) {
                this.fileList = uploadedFileList.map(file => file.raw);
                let formData = new FormData();
                // 遍历上传的文件
                for (let i = 0; i < this.fileList.length; i++) {
                    formData.append('file', this.fileList[i])
                };
                axios.post('/file/upload', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(data => {
                    if (data.data.code === 1) {
                        this.ruleForm.businessLicense = data.data.data[0].fileId;
                    }
                });
            },
            //注册预验证
            register() {
                this.$refs.ruleFormRef.validate(valid => {
                    if (!valid) return;
                    this.$http.post('/transfer/enterprises/register', this.ruleForm, '注册成功').then(data => {
                        if (data === undefined) return
                        this.showSuccess = true
                        this.hideRegisContent = true
                    });
                })
            },
            getBusiness() {
                this.$http.get('/base/business').then(data => {
                    this.businessList = data;
                });
            },
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 1 个文件`);
            },
        },
        mounted() {
            this.init3D();
            this.getBusiness();
        },
        created() {

        }
    }

</script>
<style lang="less" scoped>
    /deep/ .el-form-item__error {
        left: 100px;
    }

    /deep/ .el-radio-group label {
        margin-right: 10px;
    }

    .freedo {
        display: block;
        position: absolute;
        top: 0px;
        left: 0;
        right: 0;
        bottom: 0;
        border: none;
        z-index: -1;
    }

    .register_container {
        width: 100%;
        height: 100%;

    }

    .register {
        /*height: 100%;*/
        background: rgba(5, 40, 94, 0.7);
        z-index: 1;
        /*position: absolute;*/
    }

    .header img {
        position: absolute;
        left: 329px;
        top: 12px;
    }

    .header p {
        position: absolute;
        right: 470px;
        top: 24px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    .register-content {
        width: 600px;
        position: absolute;
        left: 50%;
        /*height: 850px;*/
        top: 115px;
        transform: translateX(-50%);


        .personal-message {
            width: 600px;
            height: 237px;
            border: 1px solid rgba(75, 194, 255, 1);
            position: absolute;


            .p2 {
                font-size: 18px;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
                text-align: center;
                padding-top: 10px;
                margin-bottom: 20px;
            }
        }

        .enterprise-message {
            width: 600px;
            height: 504px;
            border: 1px solid rgba(75, 194, 255, 1);
            margin-top: 28px;
        }
    }

    .p1 {
        font-size: 36px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 50px;
    }

    /deep/ .el-input {
        width: 400px;
    }

    /deep/ .el-form-item__label {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    /deep/ .el-form-item__content {
        margin-left: 0 !important;
    }

    /deep/ .el-form-item {
        margin-bottom: 17px !important;
    }

    /deep/ .el-radio__label {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    .sc {
        width: 140px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        display: block;
        background: #4BC2FF;
        position: absolute;
        // left: 132px;
        top: 0;
    }

    .scT {
        left: 281px;
    }

    .btn {
        display: flex;
    }

    .btn span:nth-child(1) {
        display: block;
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        border: 1px solid rgba(107, 192, 249, 1);
        margin-left: 77px;
        margin-top: 20px;
        cursor: pointer;

        a {
            text-decoration: none;
            color: #fff;
        }
    }

    .btn span:nth-child(2) {
        display: block;
        width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        background: #4BC2FF;
        margin-left: 50px;
        margin-top: 20px;
        cursor: pointer;
    }

    .header p a {
        color: #fff;
        text-decoration: none;
    }

    .success {
        position: absolute;
        top: 493px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        display: none;

        img {
            margin-bottom: 15px;
        }

        span {
            display: block;
            font-size: 24px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
        }

        div {
            color: blue !important;
            top: 143px;
            right: -100px;
            position: absolute;
            font-size: 18px;
            cursor: pointer;
        }
    }

    .newSuccess {
        display: block !important;
    }

    /deep/ .el-upload-list {
        position: absolute;
        left: 241px;
        top: 0;
    }

    /deep/ .el-upload-list__item-name {
        color: #fff;
        font-size: 14px;
    }

    .regisContent {
        display: none;
    }

    a {
        color: #fff !important;
    }

</style>
