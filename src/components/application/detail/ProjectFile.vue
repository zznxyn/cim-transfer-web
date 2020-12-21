<template>
    <el-row class="row_main">
        <el-col :span="4" class="leftcontent_col">
            <CimTree class="cim-tree" url="/data/getCatalog" :resParams="catalogResParams" :indent="28"
                ref="CatalogTree" @node-click="changeCatalogCode" :expandOnClickNode="true" treeId="CatalogTree">
            </CimTree>
        </el-col>
        <el-col :span="20" class="rightcontent_col">
            <el-row class="content top_row" type="flex" align="middle">
                <!--面包屑 -->
                <el-col :span="16">
                    <CimBreadcrumb :datas="breadcrumbDatas" ref="catalogBreadcrumb"
                        @resetBreadcrumbData="resetBreadcrumbData">
                    </CimBreadcrumb>
                </el-col>
                <el-col :span="8">
                    <el-row :gutter="25">
                        <el-col :span="8">
                            <FormButton icon="iconfont12 icontianjiawenjian" @click="createCatalog">新建目录</FormButton>
                        </el-col>
                        <el-col :span="8">
                            <!-- <el-upload class="upload-demo" action="/file/upload" ref="upload" :auto-upload="false"
                                       :multiple="false"
                                       accept=""
                                       :show-file-list="false"
                                       :on-change="resetFileListNormal" v-show="showUpload">
                                <FormButton icon="iconfont12 iconshangchuan" type="primary">上传
                                </FormButton>
                            </el-upload> -->
                            <uploader ref="uploader-single" :options="uploadOptions" :autoStart="true" :files="files"
                                @file-added="onSingleFileAdded" @file-removed="onSingleFileRemove"
                                @file-success="onSingleFileSuccess" @file-error="onSingleFileError" class="uploader-app"
                                v-show="false">
                                <uploader-unsupport></uploader-unsupport>
                                <uploader-drop>
                                    <uploader-btn ref="uploaderBtn" :attrs="attrs">选择文件</uploader-btn>
                                </uploader-drop>
                                <!-- <uploader-list></uploader-list> -->
                            </uploader>
                            <FormButton icon="iconfont12 iconshangchuan" type="primary" @click="openUploader"
                                v-show="showUpload">上传
                            </FormButton>

                            <FormButton class="show-upload-button" icon="iconfont12 iconshangchuan" type="primary"
                                @click="createUpload" v-show="showDialogUpload">上传
                            </FormButton>
                        </el-col>
                        <el-col :span="8">
                            <FormButton icon="iconfont12 iconshanchu" type="primary" @click="patchDelete">批量删除
                            </FormButton>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <!-- 列表 -->
            <el-row class="content">
                <el-col class="table_col">
                    <CimTable ref="projectFilesTable" :url="projectFileListUrl" :columns="projectFileTableColumns"
                        :showSelection="true" :params="projectFileListParams" :newMinTable="true"
                        :tableHeight="tableHeight" :pagination="false" @SelectionChange="handleSelectionChange">
                    </CimTable>
                </el-col>
            </el-row>
            <el-upload class="upload-demo" action="/file/upload" ref="upload1" :auto-upload="false" :multiple="false"
                accept="" :show-file-list="false" :on-change="resetFileListNormal1">
            </el-upload>
        </el-col>
        <!-- 新建目录弹框 -->
        <CreateCatalogPage ref="createCatalogPage" @catalogAdded="reloadProjectFilesTable"></CreateCatalogPage>
        <!-- 编辑目录弹框 -->
        <EditCatalogPage ref="editCatalogPage" @catalogEdit="reloadProjectFilesTable"></EditCatalogPage>
        <!-- 上传文件 -->
        <ProjectUpload ref="createProjectUpload" @uploadFile="reloadProjectFilesTable"></ProjectUpload>
    </el-row>

</template>
<script>
    import CimTable from '@/components/common/table'
    import CimTree from '@/components/common/tree'
    import CimBreadcrumb from '@/components/common/breadcrumb'
    import CreateCatalogPage from '@/components/application/detail/createCatalog'
    import EditCatalogPage from '@/components/application/detail/editCatalog'
    import BreadcrumbData from '@/components/common/breadcrumb/breadcrumbData.js'
    import ProjectUpload from '@/components/application/detail/projectUpload'
    import TreeDataParams from '@/components/common/tree/treeDataParams.js'
    import SparkMD5 from 'spark-md5';

    import upLoadFiles from "@/components/application/detail/commonUpload";
    import {
        showLoading,
        hideLoading
    } from '@/components/common/loading/loading.js';

    export default {
        components: {
            CimTable,
            CimTree,
            CimBreadcrumb,
            CreateCatalogPage,
            EditCatalogPage,
            ProjectUpload
        },
        data() {
            return {
                //断点续传==start
                singleUploadType: '',
                files: [],
                uploadOptions: {
                    target: window.ServerUrl + "/file/slice/upload",
                    chunkSize: 1 * 512 * 1024,
                    testChunks: true,
                    simultaneousUploads: 1,
                    singleFile: true,
                    maxChunkRetries: undefined,
                    checkChunkUploadedByResponse: function (chunk, message) {
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
                //断点续传==end
                timer: null,
                treeNodeData: {},
                showUpload: false,
                showDialogUpload: true,
                fileListNormal: [],
                // 返回的上传文件数据的fileIds
                fileIds: [],
                // 返回上传文件的fileNames
                fileNames: [],
                itemList: {},
                tableHeight: '100%',
                // 创建目录
                showCreateCatalogDialog: false,
                selectedItemIds: [],
                breadcrumbDatas: [],
                projectFileListUrl: '/data/getProjectFileList',
                // 文档列表参数
                projectFileListParams: {
                    catalogId: '',
                    projectId: this.$store.state.application.projectId,
                    type: '',
                    weight: 0
                },
                // 存当前树节点数据
                currentTreeNodeData: [],
                catalogResParams: new TreeDataParams('code', 'oname', 'pcode', 'memo', 'type', 'accept'),
                projectFileTableColumns: [{
                    label: '文件名称',
                    align: 'left',
                    prop: 'name',
                    length: 20,
                    typeOf: item => item.isDirectory ? 'event' : '',
                    getIcon: item => item.isDirectory ? "/images/icon1.png" : "/images/gczl.png",
                    clicked: item => {
                        this.setCurrentCatalogId(item.id)
                        const breadcrumbData = new BreadcrumbData(item.name, {
                            id: item.id
                        }, data => {
                            this.setCurrentCatalogId(data.memo.id)
                            this.$refs.projectFilesTable.reload()
                        })
                        this.breadcrumbDatas.push(breadcrumbData)
                        this.$refs.catalogBreadcrumb.reload()
                        this.$refs.projectFilesTable.reload()
                    },
                }, {
                    label: '创建时间',
                    prop: 'createTime',
                    type: 'date',
                    align: 'center',
                    // pattern: 'yyyy-MM-dd hh:mm'
                }, {
                    label: '大小',
                    prop: 'fileSize',
                    align: 'center',
                }, {
                    label: '状态',
                    prop: 'status',
                    align: 'center',
                }, {
                    type: 'button',
                    clicked: item => {
                        this.editCatalogDialog(item);
                        let editCatalogPageRef = this.$refs.editCatalogPage;
                        if (this.currentTreeNodeData.type === 'bim' && item.isDirectory === false) {
                            editCatalogPageRef.showEditCatalogDialog = true;
                            editCatalogPageRef.showModelDate = false;
                            editCatalogPageRef.showEditModel = true;
                        } else if (this.currentTreeNodeData.type === 'gis' && item.isDirectory === false) {
                            editCatalogPageRef.showEditCatalogDialog = true
                            editCatalogPageRef.showModelDate = true;
                            editCatalogPageRef.showEditModel = false;
                        } else {
                            editCatalogPageRef.showEditCatalogDialog = true
                            editCatalogPageRef.showModelDate = false;
                            editCatalogPageRef.showEditModel = false;
                        }
                    },
                    name: '编辑',
                    align: 'center',
                }, {
                    type: 'button',
                    clicked: item => {
                        this.deleteFiles([item.id])
                    },
                    name: '删除',
                    align: 'center',
                }, {
                    type: 'button',
                    show: item => !item.isDirectory,
                    clicked: item => {
                        // let event = new MouseEvent("click");
                        // vue.$refs.upload1.$refs["upload-inner"].$el.dispatchEvent(new MouseEvent("click"));
                        this.singleUploadType = 'update';
                        this.$refs.uploaderBtn.$el.click();
                        this.itemList = item;
                    },
                    name: '更新',
                    align: 'center',
                }, {
                    type: 'button',
                    show: item => !item.isDirectory,
                    clicked: item => {
                        let dataURL = ServerUrl + `/file/download/${item.fileId}`;
                        let a = document.createElement("a");
                        let event = new MouseEvent("click");
                        a.href = dataURL; // 将生成的URL设置为a.href属性
                        a.dispatchEvent(event);
                    },
                    name: '下载',
                    align: 'center'
                }],
            }
        },
        methods: {
            // 点击非当前选中树节点
            changeCatalogCode(treeNodeData, treeNode) {
                this.treeNodeData = treeNodeData;
                if (treeNodeData.type === 'normal') {
                    this.showUpload = true
                    this.showDialogUpload = false
                } else {
                    this.showUpload = false
                    this.showDialogUpload = true
                }
                // 获取节点数据并赋值
                this.currentTreeNodeData = treeNodeData
                // 重置工程资料文件列表->当前目录Id
                this.resetCurrentCatalogId()

                if (treeNodeData.disabled) {
                    return
                }
                let catalogCode = treeNodeData.id
                this.$store.state.application.catalogTreeCurrentCode = catalogCode
                this.projectFileListParams.type = catalogCode
                this.$refs.projectFilesTable.reload()

                // 给面包屑赋值
                this.breadcrumbDatas = []
                const parentNodes = this.$refs.CatalogTree.getParentNodes(treeNode)
                this.$store.commit('breadcrumb/setBreadcrumb', parentNodes)

                parentNodes.forEach(node => {
                    const breadcrumbData = new BreadcrumbData(node.label)
                    this.breadcrumbDatas.push(breadcrumbData)
                })
                this.$refs.catalogBreadcrumb.reload()
            },
            // 点击面包屑节点后，重置面包屑数据
            resetBreadcrumbData(breadcrumbDatas) {
                this.breadcrumbDatas = breadcrumbDatas
            },
            // 批量删除
            patchDelete() {
                this.deleteFiles(this.selectedItemIds)
            },
            // 删除文件
            async deleteFiles(ids) {
                if (!(ids instanceof Array) || ids.length === 0) {
                    return this.$message.warning('请选择要删除的文件')
                }
                const confirmResult = await this.$confirm('确定永久删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)

                if (confirmResult !== 'confirm') {
                    return this.$message.info('已取消删除')
                }
                this.$http.post('/data/removeProjectFile', {
                    ids: ids.join(','),
                    projectId: this.$store.state.application.projectId,
                }, '删除成功').then(data => {
                    this.$refs.projectFilesTable.reload()
                }).catch(() => {
                    this.$message.error('删除失败')
                })
            },

            // 创建目录
            createCatalog() {
                if (this.currentTreeNodeData.length === 0 || this.currentTreeNodeData.type === 'none') {
                    this.$confirm('请选择文件夹', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).catch(err => err)
                    this.$refs.createCatalogPage.showCreateCatalogDialog = false
                } else {
                    this.$refs.createCatalogPage.showCreateCatalogDialog = true
                }
            },
            // 编辑目录
            editCatalogDialog(item) {
                let objForm = this.$refs.editCatalogPage.catalogForm;
                this.$http.get('/data/getModelInfo', {
                    projectFileId: item.id
                }).then(data => {
                    if (data) {
                        objForm.longitude = data.longitude
                        objForm.latitude = data.latitude
                        objForm.height = data.height
                        objForm.makeDate = data.makeDate
                    } else {
                        objForm.longitude = ''
                        objForm.latitude = ''
                        objForm.height = ''
                        objForm.makeDate = ''
                    }
                })
                this.$refs.editCatalogPage.catalogForm.name = item.name;
                this.$refs.editCatalogPage.catalogForm.id = item.id;
            },
            // 重新加载列表
            reloadProjectFilesTable() {
                this.$refs.projectFilesTable.reload()
            },
            // 重置工程资料文件列表->当前目录Id
            resetCurrentCatalogId() {
                this.projectFileListParams.catalogId = ''
                this.$store.state.application.currentCatalogId = ''
            },
            // 设置工程资料文件列表->当前目录Id
            setCurrentCatalogId(catalogId) {
                this.projectFileListParams.catalogId = catalogId
                this.$store.state.application.currentCatalogId = catalogId
            },
            // 上传文件
            createUpload(treeNodeData, treeNode) {
                // 判断是否选中文件夹
                if (this.currentTreeNodeData.length === 0 || this.currentTreeNodeData.type === 'none') {
                    this.$confirm('请选择文件夹', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).catch(err => err)
                    this.$refs.createProjectUpload.showProjectUploadDialog = false
                } else {
                    // 点击上传是否展示经纬度
                    if (this.currentTreeNodeData.type === 'bim') {
                        this.$refs.createProjectUpload.showProjectUploadDialog = true;
                        this.$refs.createProjectUpload.showModelLocation = true;
                        this.$refs.createProjectUpload.showModelDate = false;
                    } else if (this.currentTreeNodeData.type === 'gis') {
                        this.$refs.createProjectUpload.showProjectUploadDialog = true;
                        this.$refs.createProjectUpload.showModelDate = true;
                        this.$refs.createProjectUpload.showModelLocation = false;
                    }
                }
            },
            //断点续传===start
            openUploader() {
                this.singleUploadType = 'add';
                this.$refs.uploaderBtn.$el.click();
            },
            onSingleFileAdded(file) {
                showLoading();
                this.computeMD5(file);
            },
            onSingleFileRemove(file) {},
            async onSingleFileSuccess(rootFile, file, response, chunk) {
                let res = JSON.parse(response);
                if (res.code != 1 || res.data === undefined || res.data === null || res.data.md5 === undefined ||
                    res.data.md5 === null) {
                    return;
                }
                //let filedata = await this.getFileByMD5FUN(res.data.md5);
                let filedata = await this.$refs.createProjectUpload.getFileByMD5FUN(res.data.md5);
                this.fileIds.push(filedata.fileId);
                this.fileNames.push(file.name);
                // 菜单文件上传
                if (this.singleUploadType === 'add') {
                    this.normalUpload();
                } else if (this.singleUploadType === 'update') { //更新文件
                    this.operatorUpload();
                }
                this.singleUploadType = '';
                this.files = [];
                this.fileIds = [];
                this.fileNames = [];
                //alert("上传成功");
                hideLoading() //关闭遮罩
            },
            onSingleFileError(rootFile, file, response, chunk) {
                this.singleUploadType = '';
                this.files = [];
                this.fileIds = [];
                this.fileNames = [];
                hideLoading() //关闭遮罩
            },
            computeMD5(file) {
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
                        this.$nextTick(() => {})
                    } else {
                        let md5 = spark.end();
                        //loading.close();
                        this.computeMD5Success(md5, file);
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
                file.uniqueIdentifier = md5; //把md5值作为文件的识别码
                file.resume(); //开始上传
            },
            loadingFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            },
            //断点续传===end
            // 当用户勾选列表多选框时触发
            handleSelectionChange(selectedItems) {
                this.selectedItemIds = selectedItems.map(selectedItem => selectedItem.id)
            },
            resetFileListNormal(file, uploadedFileList) {
                let uploadData = upLoadFiles(file, uploadedFileList);
                uploadData.then(fileInfo => {
                    this.fileIds = fileInfo.map(data => data.fileId);
                    this.fileNames = fileInfo.map(data => data.fileName + '.' + data.fileSuffix);
                    this.normalUpload();
                })
            },
            normalUpload() {
                this.$http.post('/data/addProjectFile', {
                    fileIds: this.fileIds.join(','),
                    fileNames: this.fileNames.join(','),
                    projectId: this.$store.state.application.projectId,
                    type: this.$store.state.application.catalogTreeCurrentCode,
                    catalogId: this.$store.state.application.currentCatalogId,
                    weight: 0,
                }).then(data => {
                    this.reloadProjectFilesTable();
                    this.fileIds = [];
                    this.fileNames = [];
                })
            },
            resetFileListNormal1(file, uploadedFileList) {
                let uploadData1 = upLoadFiles(file, uploadedFileList);
                uploadData1.then(fileInfo => {
                    this.fileIds = fileInfo.map(data => data.fileId);
                    this.fileNames = fileInfo.map(data => data.fileName + '.' + data.fileSuffix);
                    this.operatorUpload();
                })
            },
            operatorUpload() {
                this.$http.post('/data/replaceFile', {
                    fileId: this.fileIds.join(','),
                    fileName: this.fileNames.join(','),
                    id: this.itemList.id,
                    projectId: this.$store.state.application.projectId
                }).then(data => {
                    this.reloadProjectFilesTable();
                })
            },
            refresh() {
                this.timer = setInterval(() => {
                    if (this.treeNodeData) {
                        if (this.treeNodeData.type === 'bim' || this.treeNodeData.type === 'gis') {
                            let oldStatus = this.$refs.projectFilesTable.tableData;
                            this.$http.get('/data/getProjectFileList', this.projectFileListParams).then(
                            data => {
                                data.map(item => {
                                    const aa = oldStatus.filter(row => row.id === item.id);
                                    if (aa) {
                                        aa[0].status = item.status;
                                    }
                                })
                            })
                        }
                    }
                }, 10000);
            }
        },
        created() {
            this.resetCurrentCatalogId();
            this.refresh();
            window.vue = this;
        },
        beforeDestroy() {
            clearInterval(this.timer)
        },
        computed: {
            //Uploader实例
            uploader() {
                return this.$refs.uploader - single.uploader;
            }
        },
    }

</script>
<style lang="less" scoped>
    @content_col_height: 525px;
    @content_col_margin_top: -1px;
    @table_col_height: @content_col_height - 110;

    .row_main {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .content_col {
        border-top: none;
        height: @content_col_height;
        margin-top: @content_col_margin_top
    }

    .leftcontent_col {
        width: @tab-width;
        border: 1px solid @color_blue;
        border-top: none;
        height: 98%;
        margin-top: -1px;
        // overflow: auto;
    }

    .rightcontent_col {
        .content_col()
    }

    .table_col {
        border: 1px solid @color_light_grey;
        height: @table_col_height;
    }

    .cim-tree {
        // margin-left: 15px;
        height: 100%;
        overflow: auto;
    }

    .content {
        width: 96%;
        margin: auto;
    }

    .top_row {
        /*margin-top: 18px;*/
        height: 70px;
    }

    /deep/ .el-table td:last-child {
        text-align: center;
    }

    .show-upload-button {
        margin-left: 0px;
        ;
    }

</style>
