<template>
    <div class="show3D">
        <Container></Container>
        <div class="camera">
            <div class="title">
                <div></div>
                <span>视图存储</span>
            </div>
            <div class="camera_left">
                <div class="camera_div" :style="{display: !viewPoint.farBitmap?'block':'none'}">
                    <img src="@/assets/images/nav4.png" class="camera_icon" alt v-on:click="addFarViewPoint"/>
                    <p>拍照当前视角为</p>
                    <p>全景视图</p>
                </div>
                <div class="camera_div" :style="{display: viewPoint.farBitmap?'block':'none'}">
                    <img :src="viewPoint.farBitmap" class="camera_img"
                         v-on:click="setCurrentCameraInfo(viewPoint.farViewpoint)">
                    <span class="close" v-on:click="cleanFarViewPoint"></span>
                    <div class="button">
                        <p>全景视图</p>
                    </div>
                </div>
            </div>
            <div class="camera_right">
                <div class="camera_div" :style="{display: !viewPoint.nearBitmap?'block':'none'}">
                    <img src="@/assets/images/nav4.png" class="camera_icon" alt v-on:click="addNearViewPoint"/>
                    <p>拍照当前视角为</p>
                    <p>正视图</p>
                </div>
                <div class="camera_div" :style="{display: viewPoint.nearBitmap?'block':'none'}">
                    <img :src="viewPoint.nearBitmap" class="camera_img"
                         v-on:click="setCurrentCameraInfo(viewPoint.nearViewpoint)">
                    <span class="close" v-on:click="cleanNearViewPoint"></span>
                    <div class="button">
                        <p>正视图</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav">
            <div class="title">
                <div></div>
                <span>模型操作</span>
            </div>
            <ul>
                <li @click="begin" v-if="isStart">开始</li>
                <li @click="end" v-if="isShow">保存</li>
                <li @click="cancel" v-if="isShow">取消</li>
                <li @click="reset" v-if="isShow">重置</li>
            </ul>
            <div class="list_box">
                <div class="list_div">
                    <el-table ref="multipleTable" :data="tableData" :class="{check : isCheck}" :height="220" class="tableBox customer-table"
                              @select="selectOption"
                              @row-click="clickData"
                              :header-cell-style="{background:'#05285E'}">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="name" label="名称" align="center"></el-table-column>
                        <el-table-column label="操作" align="center">
                            <template slot-scope="scope">
                                <TableButton @click="updateModelMatrix(scope.row)">
                                    编辑矩阵
                                </TableButton>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 编辑模型矩阵 -->
        <EditMatrixPage ref="editMatrixPage" @matrixEdit="setModelMatrix"></EditMatrixPage>
    </div>
</template>
<script>
    import Container from "@/components/common/3d/index";
    import EditMatrixPage from '@/components/application/detail/editMatrix';

    var vue;
    export default {
        data() {
            return {
                viewPoint: {
                    "position": void 0,
                    "farViewpoint": void 0,
                    "nearViewpoint": void 0,
                    "farBitmap": void 0,
                    "nearBitmap": void 0,
                },
                tableData: [],
                tableArr: [],
                isCheck: false,
                fileId: '',
                isShow: false,
                isStart: true
            }
        },
        components: {
            Container,
            EditMatrixPage,
        },
        methods: {
            init3D() {
                if (bimMap.param.sceneType === -1) {
                    bimMap.createEarthScene();
                }
            },
            addModel() {
                // 销毁所有模型
                bimMap.removeAllPmts();

                // 加载模型
                this.$http.get('/model/getGraph', {
                    projectId: this.$store.state.application.projectId
                }).then(pmtsArray => {
                    let modelIds = [];
                    pmtsArray.forEach((pmts) => {
                        if (this.viewPoint.nearViewpoint) {
                            this.setCurrentCameraInfo(this.viewPoint.nearViewpoint)
                            pmts.autoFlyto = false;
                        } else {
                            pmts.autoFlyto = true;
                        }
                        pmts.url = ServerUrl + pmts.url;
                        const pmtsId = bimMap.addPmts(pmts);
                        modelIds.push(pmtsId);
                    });

                    // 模型加载完成, 设置工程坐标
                    let i = 0;
                    this.hookId = Hook.add("PModelLoaded", () => {
                        if (++i === modelIds.length) {
                            Hook.remove(this.hookId);
                            this.setPosition(modelIds);
                        }
                    });
                });
            },
            captureScreen(callback) {
                bimMap.captureScreen(300, 300, !1, callback);
            },
            getViewPoint() {
                this.$http.get('transfer/point/get', {
                    projectId: this.$store.state.application.projectId
                }).then(data => {
                    Object.assign(vue.viewPoint, data);
                });
            },
            setFarViewPoint(bitmap, cameraInfo) {
                this.$http.post('transfer/point/updateFar', {
                    projectId: this.$store.state.application.projectId,
                    farBitmap: bitmap,
                    farViewpoint: cameraInfo,
                }, '保存成功');
                this.viewPoint.farBitmap = bitmap;
                this.viewPoint.farViewpoint = cameraInfo;
            },
            setNearViewPoint(bitmap, cameraInfo) {
                this.$http.post('transfer/point/updateNear', {
                    projectId: this.$store.state.application.projectId,
                    nearBitmap: bitmap,
                    nearViewpoint: cameraInfo,
                }, '保存成功');
                this.viewPoint.nearBitmap = bitmap;
                this.viewPoint.nearViewpoint = cameraInfo;
            },
            setPosition(modelIds) {
                let tcArray = modelIds.map(id => {
                    return bimMap.getModelCenter(id);
                }).flat(Infinity);
                let center = bimMap.tool.getCenterOfPts(tcArray);
                let position = bimMap.tool.tg(center);

                this.$http.post('transfer/point/updatePosition', {
                    projectId: this.$store.state.application.projectId,
                    position: position.join(','),
                });
            },
            setCurrentCameraInfo(cameraInfo) {
                bimMap.setCurrentCameraInfo(cameraInfo);
            },
            addFarViewPoint() {
                let cameraInfo = bimMap.getCurrentCameraInfo().join(',');
                this.captureScreen((data) => {
                    this.setFarViewPoint(data, cameraInfo);
                });
            },
            addNearViewPoint() {
                let cameraInfo = bimMap.getCurrentCameraInfo().join(',');
                this.captureScreen((data) => {
                    this.setNearViewPoint(data, cameraInfo);
                });
            },
            cleanFarViewPoint() {
                this.setFarViewPoint("", "");
            },
            cleanNearViewPoint() {
                this.setNearViewPoint("", "");
            },
            getModelList() {
                this.$http.get('/data/getModelFileList', {
                    projectId: this.$store.state.application.projectId,
                    type: 'BIM'
                }).then(data => {
                    this.tableData = data;
                })
            },
            clickData(row, column) {
                if (column.property === "name") {
                    bimMap.fly2Model(row.id);
                }
            },
            selectOption(selection, row) {
                this.tableArr = selection
            },
            // 开始编辑
            begin() {
                if (this.tableArr.length == 0) return this.$message.warning('请先勾选列表');
                this.isCheck = true;
                this.isShow = true;
                this.isStart = false;
                let ids = [];
                this.tableArr.filter(item => {
                    ids.push(item.id);
                });
                bimMap.matrixTransform.start(ids);
                // this.tableArr.length = 0;
            },
            // 保存
            end() {
                // 清空勾选
                this.$refs.multipleTable.clearSelection();
                bimMap.matrixTransform.end();
                let fileId = [];
                let ModelMatrix = [];
                this.tableArr.filter(item => {
                    fileId.push(item.id);
                    ModelMatrix.push(bimMap.getModelMatrix(item.id));
                });
                let info = this.arrayToObj(fileId, ModelMatrix);
                this.$http.post('/model/updateGraph', {
                    projectId: this.$store.state.application.projectId,
                    matrices: JSON.stringify(info)
                }).then(data => {
                    if (data === true) {
                        this.$message.success('编辑成功');
                        this.isShow = false;
                        this.isStart = true;
                        this.isCheck = false;
                    }
                })
                this.tableArr.length = 0;
            },
            // 取消
            cancel() {
                // 清空勾选
                this.$refs.multipleTable.clearSelection();
                this.tableArr.length = 0;
                bimMap.matrixTransform.cancel();
                this.isCheck = false;
                this.isStart = true;
                this.isShow = false;
            },
            // 打开矩阵编辑弹框
            updateModelMatrix(row) {
                let editMatrixPageRef = this.$refs.editMatrixPage;
                editMatrixPageRef.showEditMatrixDialog = true;
                editMatrixPageRef.matrixForm.fileId = row.id;
                editMatrixPageRef.matrixForm.modelMatrix = JSON.stringify(bimMap.getModelMatrix(row.id));
            },
            // 设置模型矩阵
            setModelMatrix(matrixForm) {
                bimMap.setModelMatrix(matrixForm.fileId, JSON.parse(matrixForm.modelMatrix));
            },
            // 重置
            reset() {
                // // 清空勾选
                // this.$refs.multipleTable.clearSelection();
                // this.tableArr.length = 0;
                bimMap.matrixTransform.reset();
            },
            arrayToObj(arrA, arrB) {
                let info = {};
                for (let i = 0; i < arrA.length; i++) {
                    info[arrA[i]] = arrB[i];
                }
                return info;
            }
        },
        mounted() {
            vue = this;
            // vue.init3D();
            vue.getViewPoint();
        },
        created() {
            this.getModelList();
        }
    }

</script>
<style lang="less" scoped>
    .show3D {
        height: 100%;
    }

    .camera {
        position: absolute;
        top: 12px;
        right: 9px;
        width: 360px;
        height: 233px;
        background: url("../../../assets/images/san_bg.png");
        background-size: 100% 100%;
        /*background: rgba(5, 40, 94, 0.46);*/
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .title {
        position: absolute;
        left: 22px;
        top: 20px;
        display: flex;

        div {
            width: 4px;
            height: 16px;
            display: inline-block;
            background-color: #22FFED;
        }

        span {
            color: #fff;
            font-weight: 400;
            margin-left: 10px;
            font-size: 16px;
            height: 16px;
            line-height: 16px;
        }
    }

    .camera_left {
        width: 150px;
        height: 150px;
        background: rgba(5, 40, 94, 0.5);
        border: 1px solid #4BC2FF;
        margin-top: 18px;
    }

    .camera_right {
        width: 150px;
        height: 150px;
        background: rgba(5, 40, 94, 0.5);
        border: 1px solid #4BC2FF;
        margin-top: 18px;
    }

    .camera_div {
        display: block;
        text-align: center;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .camera_div p {
        color: #ffffffcc;
        font-size: 14px;
        font-weight: 400;
        margin: 2px 0;
    }

    .camera_div .close::before {
        content: "\2716";
    }

    .camera_div .close {
        position: absolute;
        right: 8px;
        top: 8px;
        height: 17px;
        width: 17px;
        color: rgba(255, 255, 255, 0.7);
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        cursor: pointer;
    }

    .camera_div .close:hover {
        color: rgba(255, 255, 255, 0.9);
    }

    .camera_div .button {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.8) 100%);
    }

    .camera_icon {
        margin-top: 37px;
        margin-bottom: 5px;
        cursor: pointer;
    }

    .camera_img {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    .nav {
        position: absolute;
        right: 10px;
        top: 257px;
        width: 360px;
        height: 355px;
        background-image: url(../../../assets/images/san_bg2.png);
        background-size: 100% 100%;
    }

    .nav ul {
        display: flex;
        justify-content: flex-end;
        margin-top: 46px;
    }

    .nav ul li {
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #4BC2FF;
        border-radius: 2px;
        color: #ffffffcc;
        font-size: 16px;
        cursor: pointer;
        margin-right: 20px;
    }

    .list_box {
        display: flex;
        justify-content: space-evenly;
        margin-top: 10px;
        .list_div {
            width: 320px;
        }
    }

    /deep/ .el-container.is-vertical {
        background: rgba(5, 40, 94, 0.46) !important;
    }

    /deep/ .tableBox {
        background: transparent!important;
        width: 100% !important;
    }

    /deep/ .el-table th > .cell {
        color: #fff;
    }

    /deep/ .check .el-checkbox {
        pointer-events: none;
    }

    .tableBox th{
        height: 30px!important;
        line-height: 30px!important;
    }

    /deep/ .el-table tr {
        background: none!important;
    }

    /deep/ .el-table .cell {
        color: #FFFFFF;
    }

   /deep/  .el-table--border, .el-table--group{
       border: none!important;
   }
    /deep/ .el-table tbody tr:hover>td {
        background:none!important
    }

    /deep/ .el-checkbox__inner {
        background: none;
    }

    /deep/ .tableBox ::-webkit-scrollbar-track-piece {
        background: #05285E55;
    }

    /deep/ .tableBox ::-webkit-scrollbar-thumb {
        background: #CCCCCCcc;
    }

    /deep/ .tableBox th {
        background: rgb(5, 40, 94);
    }

    /deep/ .el-table .cell {
        cursor: pointer;
    }

    /deep/ .tableBox .el-button {
        background: transparent;
    }
</style>
