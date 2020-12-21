<template>
    <el-dialog title="上传文件" :visible.sync="showProjectUploadDialog" width="27%" center>
        <el-row :gutter="5">
            <el-col :span="24">
                <el-row type="flex" align="middle">
                    <el-col :span="4">文件</el-col>
                    <el-col :span="20">
                        <!-- <el-upload class="upload-demo" action="/file/upload" ref="upload" :auto-upload="false" multiple
                                   accept=""
                                   :on-change="resetFileList">
                            <FormButton type="primary">点击上传
                            </FormButton>
                        </el-upload> -->
                        <uploader
                            ref="uploader"
                            :options="uploadOptions"
                            :autoStart="false"
                            :fileStatusText="fileStatusText"
                            :files="files"
                            @file-added="onFileAdded"
                            @file-removed="onFileRemove"
                            @file-success="onFileSuccess"
                            @file-progress="onFileProgress"
                            @file-error="onFileError"
                            class="uploader-app"
                        >
                            <uploader-unsupport></uploader-unsupport>
                            <uploader-btn :attrs="attrs">选择文件</uploader-btn>
                            <!-- <uploader-drop>
                            <uploader-btn :attrs="attrs">选择文件</uploader-btn>
                            </uploader-drop> -->
                            <uploader-list></uploader-list>
                        </uploader>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px" type="flex" align="middle">
            <el-col :span="24">
                <el-form :model="modelForm" :rules="rules" ref="ruleForm">
                    <el-row :gutter="10" type="flex" align="middle" style="margin-bottom: 20px"
                            v-if="showModelLocation">
                        <el-col :span="4">模型位置</el-col>
                        <el-col :span="7">
                            <el-form-item prop="longitude">
                                <el-input v-model="modelForm.longitude" placeholder="经度" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="latitude">
                                <el-input v-model="modelForm.latitude" placeholder="纬度" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item prop="height">
                                <el-input v-model="modelForm.height" placeholder="高度" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" align="middle" v-if="showModelDate">
                        <el-col :span="4">制作日期</el-col>
                        <el-col :span="20">
                            <el-form-item prop="makeDate">
                                <el-date-picker
                                    v-model="modelForm.makeDate"
                                    value-format="yyyy-MM-dd"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <div slot="footer" style="text-align: center">
            <!-- <FormButton type="primary" @click="test()">测 试</FormButton> -->
            <FormButton type="primary" @click="submitUploadFiles('ruleForm')">确 定</FormButton>
            <FormButton @click="resetForm('ruleForm')">取消</FormButton>
        </div>
    </el-dialog>
</template>
<script>
    import axios from 'axios';
    import SparkMD5 from 'spark-md5';

    export default {
        data() {
            return {
                // 控制弹框
                showProjectUploadDialog: false,
                // 绑定的表单数据对象
                modelForm: {
                    height: '',
                    longitude: '',
                    latitude: '',
                    makeDate: '',
                },
                // 表单验证对象
                rules: {
                    longitude: [
                        {required: true, message: '请填写经度', trigger: 'blur'}
                    ],
                    latitude: [
                        {required: true, message: '请填写唯度', trigger: 'blur'}
                    ],
                    height: [
                        {required: true, message: '请填写高度', trigger: 'blur'}
                    ],
                    makeDate: [
                        {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
                    ]
                },
                // 上传的文件
                fileList: [],
                // 返回的上传文件数据的fileIds
                fileIds: [],
                // 返回上传文件的fileNames
                fileNames: [],
                showModelLocation: false,
                showModelDate: false,
                //断点续传
                files: [],
                fileStatusText: {
                    success: '上传成功...',
                    error: '上传失败...',
                    uploading: '上传中...',
                    paused: '等待上传...',
                    waiting: '上传中...'
                },
                uploadOptions: {
                    target: window.ServerUrl + "/file/slice/upload",
                    chunkSize: 1 * 512 * 1024,
                    testChunks: true,
                    simultaneousUploads: 1,
                    maxChunkRetries: undefined,
                    checkChunkUploadedByResponse: function(chunk, message) {
                        let objMessage = JSON.parse(message);
                        let chunkNumbers = objMessage.chunkNumbers;
                        return (chunkNumbers || []).indexOf(chunk.offset + 1) >= 0;
                    },
                    headers: {},
                    query() {},
                    categaryMap: {
                        image: ["gif", "jpg", "jpeg", "png", "bmp"],
                        zip: ["zip"],
                        document: ["csv"]
                    }
                },
                attrs: {},
            }
        },
        methods: {
            // 文件上传触发的事件
            resetFileList(file, uploadedFileList) {
                this.fileList = uploadedFileList.map(file => file.raw)
            },
            // 点击确定上传文件
            determineUploadFiles(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.fileList.length == '') {
                            return this.$message.warning('请选择要上传的文件')
                        }
                        let formData = new FormData()
                        // 遍历上传文件
                        for (let i = 0; i < this.fileList.length; i++) {
                            formData.append('file', this.fileList[i])
                        }
                        // if (this.modelForm.height !== '' && this.modelForm.longitude !== '' && this.modelForm.latitude !== '') {
                            axios.post('/file/upload', formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((data) => {
                                const res = data.data
                                this.fileIds = res.data.map(data => data.fileId)
                                this.fileNames = res.data.map(data => data.fileName + '.' + data.fileSuffix)

                                if (res.code === 1) {
                                    this.$message.success(res.message)
                                    this.showProjectUploadDialog = false

                                    this.$http.post('/data/addProjectFile', {
                                        fileIds: this.fileIds.join(','),
                                        fileNames: this.fileNames.join(','),
                                        projectId: this.$store.state.application.projectId,
                                        type: this.$store.state.application.catalogTreeCurrentCode,
                                        catalogId: this.$store.state.application.currentCatalogId,
                                        weight: 0,
                                        height: this.modelForm.height,
                                        longitude: this.modelForm.longitude,
                                        latitude: this.modelForm.latitude,
                                        makeDate: this.modelForm.makeDate
                                    }).then(data => {
                                        // console.log(data)
                                        this.$emit('uploadFile')
                                        // 清空上传的文件
                                        this.$refs.upload.clearFiles()
                                        this.modelForm.height = ''
                                        this.modelForm.longitude = ''
                                        this.modelForm.latitude = ''
                                        this.modelForm.makeDate = ''
                                    })
                                }
                            }).catch(err => err)
                    } else {
                        return false;
                    }
                })
            },
            //断点续传组件start
            test() {
                
                // if(this.fileList.length <= 0) {return;}
                // for (let i = 0; i < this.fileList.length; i++) {
                //     const file = this.fileList[i];
                //     file.resume();
                // }
                // this.fileList=[];
            },
            getFileByMD5(md5) {
                return new Promise((resolve, reject) => {
                    this.$http.get('/file/check', {
                        hash: md5
                    }).then((res) => {
                        resolve(res)
                    }).catch((err) => {
                        reject(err)
                    })
                });
            },
            async getFileByMD5FUN(md5) {
                let res = await this.getFileByMD5(md5);
                while (res === undefined || res === null) {
                    res = await this.getFileByMD5(md5);
                    let start = (new Date()).getTime();
                    while((new Date()).getTime() - start < 1500) {
                        continue;
                    }
                }
                return res;
            },
            onFileAdded(file) {
                this.computeMD5(file);
                this.fileList.push(file);
                //console.log(file);
            },
            onFileRemove(file) {
                if(this.fileList.length === 1) {
                    this.fileList = [];
                    return;
                }
                for (let i = 0; i < this.fileList.length; i++) {
                    if(file.uniqueIdentifier === this.fileList[i].uniqueIdentifier){
                        this.fileList.splice(i, 1);
                        break;
                    }
                }
            },
            onFileProgress(rootFile, file, chunk) {},
            async onFileSuccess(rootFile, file, response, chunk) {
                let res = JSON.parse(response);
                if(res.code != 1 || res.data === undefined || res.data === null || res.data.md5 === undefined || res.data.md5 === null) {return;}
                let filedata = await this.getFileByMD5FUN(res.data.md5);
                
                this.fileIds.push(filedata.fileId);
                this.fileNames.push(file.name);
                if(this.fileList.length === this.fileIds.length && this.fileList.length === this.fileNames.length){
                    this.$message.success(res.message)
                    this.showProjectUploadDialog = false

                    this.$http.post('/data/addProjectFile', {
                        fileIds: this.fileIds.join(','),
                        fileNames: this.fileNames.join(','),
                        projectId: this.$store.state.application.projectId,
                        type: this.$store.state.application.catalogTreeCurrentCode,
                        catalogId: this.$store.state.application.currentCatalogId,
                        weight: 0,
                        height: this.modelForm.height,
                        longitude: this.modelForm.longitude,
                        latitude: this.modelForm.latitude,
                        makeDate: this.modelForm.makeDate
                    }).then(data => {
                        // console.log(data)
                        this.$emit('uploadFile')
                        // 清空上传的文件
                        //this.$refs.upload.clearFiles()
                        this.uploader.cancel();
                        this.modelForm.height = '';
                        this.modelForm.longitude = '';
                        this.modelForm.latitude = '';
                        this.modelForm.makeDate = '';
                        this.fileIds = [];
                        this.fileNames = [];
                        this.fileList = [];
                    })
                }

                
            },
            onFileError(rootFile, file, response, chunk) {
                this.$message({
                    message: response,
                    type: "error"
                });
            },
            computeMD5(file) {
                // const loading = this.$loading({
                // lock: true,
                // text: '正在计算MD5',
                // spinner: 'el-icon-loading',
                // background: 'rgba(0, 0, 0, 0.7)'
                // });
                let fileReader = new FileReader();
                let time = new Date().getTime();
                let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
                let currentChunk = 0;
                const chunkSize = 10 * 1024 * 1000;
                let chunks = Math.ceil(file.size / chunkSize);
                let spark = new SparkMD5.ArrayBuffer();
                file.pause();
        
                loadNext();
        
                fileReader.onload = (e => {
                spark.append(e.target.result);
                if (currentChunk < chunks) {
                    currentChunk++;
                    loadNext();
                    this.$nextTick(() => {
                    //console.log('校验MD5 ' + ((currentChunk / chunks) * 100).toFixed(0) + '%')
                    })
                } else {
                    let md5 = spark.end();
                    //loading.close();
                    this.computeMD5Success(md5, file);
                    //console.log(`MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${new Date().getTime() - time} ms`);
                }
                });
                fileReader.onerror = function () {
                    this.error(`文件${file.name}读取出错，请检查该文件`);
                    //loading.close();
                    file.cancel();
                };
        
                function loadNext() {
                    let start = currentChunk * chunkSize;
                    let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                    fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
                }
            },
            computeMD5Success(md5, file) {
                file.uniqueIdentifier = md5;//把md5值作为文件的识别码
                //file.resume();//开始上传
            },
            //上传提交
            submitUploadFiles(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.fileList.length == '') {
                            return this.$message.warning('请选择要上传的文件')
                        }
                        
                        // 遍历上传文件
                        for (let i = 0; i < this.fileList.length; i++) {
                            const fileD = this.fileList[i];
                            fileD.resume();
                        }
                    } else {
                        return false;
                    }
                })
            },
            //断点续传组件end
            resetForm(formName) {
                this.showProjectUploadDialog = false;
                this.$refs[formName].resetFields();
                //this.$refs.upload.clearFiles();
                this.uploader.cancel();
            }
        },
        computed: {
            //Uploader实例
            uploader() {
                return this.$refs.uploader.uploader;
            }
        },
    }

</script>
<style lang="less" scoped>
    .el-form-item {
        margin-bottom: 0;
    }
    
    .uploader-app /deep/ .uploader-file-actions{
        float: right;
    }
    .uploader-app /deep/ .uploader-file-progress{
        display: none;
    }
    .uploader-app /deep/ .uploader-file-actions .uploader-file-pause {
        display: none!important;
    }
    .uploader-app /deep/ .uploader-file-actions .uploader-file-resume {
        display: none!important;
    }
    .uploader-app /deep/ .uploader-file-actions .uploader-file-retry {
        display: none!important;
    }
    .uploader-app /deep/ .uploader-file-meta {
        display: none;
    }
</style>
