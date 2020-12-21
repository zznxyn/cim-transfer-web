<template>
    <div class="bgBox">
        <p class="p">个人信息</p>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">
            <!-- 用户名 -->
            <el-form-item label="用户名">
                <el-input v-model="form.userName" :disabled="true"></el-input>
            </el-form-item>
            <!-- 真实姓名 -->
            <el-form-item label="真实姓名">
                <el-input v-model="form.realName"></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <!-- 保存 -->
            <el-form-item>
                <FormButton type="primary" class="save" @click="updatePersonalMessage">保存</FormButton>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {
        isEmail
    } from '@/utils/validate'
    export default {
        data() {
            let validateEmail = (rule, value, callback) => {
                if (!isEmail(value)) {
                    callback(new Error('邮箱格式错误'))
                } else {
                    callback()
                }
            }
            return {
                form: {
                    userName: '',
                    realName: '',
                    email: '',
                },
                personalData: [],
                rules: {
                    email: [{
                        required: true,
                        message: '请输入正确的邮箱地址',
                        trigger: 'blur'
                    }, {
                        validator: validateEmail,
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            // 获取个人信息
            getPersonalMessage() {
                this.$http.get('/base/system/users/-1').then(data => {
                    this.personalData = data
                    for (const key in this.form) {
                        if (this.personalData.hasOwnProperty(key)) {
                            this.form[key] = this.personalData[key]
                        }
                    }
                    // console.log(data)
                })
            },
            // 更新保存个人信息
            updatePersonalMessage() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.$http.post('/base/system/updateUsers/', {
                            realName: this.form.realName,
                            email: this.form.email
                        }, '保存成功').then(data => {})
                    }
                })
            }
        },
        created() {
            this.getPersonalMessage()
        }
    }

</script>
<style lang="less" scoped>
    .el-form-item {
        margin-bottom: 20px;
    }

    .bgBox {
        width: 100%;
        height: 100%;
        background: #fff;

        .p {
            font-size: 24px;
            font-family: PingFangSC-Regular, Microsoft YaHei;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 33px;
            text-align: center;
            padding-top: 56px;
        }

        .form {
            width: 500px;
            margin: 48px auto 0;
        }

        .modify {
            width: 420px;
            height: 180px;
            border: 1px solid rgba(75, 194, 255, 1);

            .el-form-item {
                width: 85%;

                /deep/ .el-input__inner {
                    height: 32px;
                }
            }
        }

        .new {
            height: 230px;
        }
    }

    .save {
        width: 430px;
        margin-top: 28px;
        background-color: #05285E
    }

</style>
