<template>
    <el-container style="background-color: #fff">
        <!--        <el-header style="height: auto">-->
        <!--        </el-header>-->
        <el-main style="padding: 0;display: flex;justify-content: center;align-items: center">
            <el-form ref="form" :model="form" label-width="80px" class="form">
                <el-form-item>
                    <p class="p">企业信息</p>
                </el-form-item>
                <el-form-item label="企业名称">
                    <el-input v-model="form.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="企业类型">
                    <el-radio-group v-model="form.type" :disabled="true">
                        <el-radio :label="0">设计单位</el-radio>
                        <el-radio :label="1">建设单位</el-radio>
                        <el-radio :label="2">维营单位</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="注册地址">
                    <el-input v-model="form.registeredAddress" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="法人">
                    <el-input v-model="form.legalPerson" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="form.contact"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="营业执照" style="height:200px">
                    <img :src="imgUrl" alt="" class="upload-img">
                    <el-upload class="upload-demo" action="" ref="upload" :auto-upload="false" :multiple="false"
                        list-type="text" :show-file-list="false"  :on-change="resetFileList">
                        <FormButton type="primary" class="uploadBtn">重新上传
                        </FormButton>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <FormButton type="primary" style="width:400px;margin-top:28px;background-color:#05285E"
                        v-if="saveEnterPrise" @click="preservation">保存</FormButton>
                </el-form-item>
            </el-form>
        </el-main>
    </el-container>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                form: {
                    name: '',
                    type: '',
                    registeredAddress: '',
                    legalPerson: '',
                    contact: '',
                    phone: '',
                },
                messageData: [],
                saveEnterPrise: true,
                fileList: [],
                fileIds: [],
                imgUrl: ''
            }
        },
        methods: {
            // 获取企业信息
            getEnterpriseMessage() {
                this.$http.get('/transfer/getEnterpriseInfo').then(data => {
                    this.imgUrl = ServerUrl + `/file/preview/${data.businessLicense}`;
                    this.messageData = data;
                    for (const key in this.form) {
                        if (this.messageData.hasOwnProperty(key)) {
                            this.form[key] = this.messageData[key];
                        }
                    }
                })
            },
            // 图片上传触发的事件
            resetFileList(file, uploadedFileList) {
                this.fileList = uploadedFileList.map(file => file.raw).slice(-1);
                let formData = new FormData();
                // 遍历上传文件
                for (let i = 0; i < this.fileList.length; i++) {
                    formData.append('file', this.fileList[i]);
                }
                axios.post('/file/upload', formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then(data => {
                    const res = data.data;
                    if (res.code === 1) {
                        this.$message.success('上传成功');
                        this.fileIds = res.data.map(data => data.fileId);
                        this.imgUrl = ServerUrl + `/file/preview/${this.fileIds}`;
                    }
                })
            },
            // 保存修改的企业信息
            preservation() {
                const id = this.messageData.id
                this.$http.post('/transfer/updateEnterprises/' + id, this.form, '保存成功')
            }
        },
        created() {
            this.getEnterpriseMessage()
        },
        watch: {
            'fileIds': function (val, old) {
                if (val.length !== 0) {
                    Object.assign(this.form, {
                        businessLicense: this.fileIds.join(',')
                    })
                }
            }
        }
    }

</script>
<style lang="less" scoped>
    .el-form-item {
        margin-bottom: 20px;
    }

    .upload-img {
        width: 148px;
        height: 200px;
        float: left
    }

    .el-radio-group label {
        margin-right: 10px;
    }

    .form {
        margin: auto;
    }

    .p {
        font-size: 24px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        /*line-height: 60px;*/
        text-align: center;
    }

    .uploadBtn {
        position: absolute;
        left: 170px;
        top: 10px;
        width: 100px
    }

</style>
