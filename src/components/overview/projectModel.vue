<template>
    <div id="projectModel" class="projectModel">
        <Container></Container>
        <div id="projectPoint" class="projectPoint" :class="{ showInfo: showInfo, transEffect: transEffect }">
            <div class="projectInfo">
                <div class="projectInfoDiv">
                    <div class="projectTitle">
                        <div>{{ projectInfo.projectName }}</div>
                    </div>
                    <ul class="projectProperty">
                        <li>
                            <div style="transition: all 1s ease-in 1s;">
                                <div>BIM模型:</div>
                                {{ projectInfo.bim }}
                            </div>
                        </li>
                        <li>
                            <div style="transition: all 1s ease-in 1.1s;">
                                <div>GIS模型:</div>
                                {{ projectInfo.gis }}
                            </div>
                        </li>
                        <li>
                            <div style="transition: all 1s ease-in 1.2s;">
                                <div>图档文件:</div>
                                {{ projectInfo.document }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="clickPoint" v-on:click2="showProjectDetail"></div>
        </div>
        <div id="property" :class="{ show: showProperty }">
            <div :class="{ sx: true, show: showProperty }">
                <div class="tab">
                        <span v-for="(item, index) in tab" :key="index" @click="cur = index"
                              :class="{ selected: cur === index }">{{ item }}</span>
                </div>
                <div class="content">
                    <div :style="{ display: cur === 0 ? 'block' : 'none' }">
                        <div class="propertyDiv">
                            <el-scrollbar>
                                <div class="ditial" v-for="group in propertyList" :key="group.id">
                                    <div class="first">
                                        <span></span>
                                        <p>{{group.name}}</p>
                                    </div>
                                    <ul class="c_content">
                                        <li v-for="item in group.children" :key="item.id">
                                            <span>{{item.name}}</span>
                                            <span>{{item.value}}</span>
                                            <div></div>
                                        </li>
                                    </ul>
                                </div>
                            </el-scrollbar>
                        </div>
                    </div>
                    <div :style="{ display: cur === 1 ? 'block' : 'none' }">
                        <div class="propertyDiv" :class="{ showPreview: showPreview }">
                            <div class="ditial">
                                <div class="first">
                                    <div>文件名称</div>
                                    <div>上传时间</div>
                                </div>
                                <el-scrollbar class="model-file-el">
                                    <ul class="c_content model-file-ul">
                                        <li v-for="(item, index) in documentList" :key="index"
                                            @click="showFilePreview(index, 0)"
                                            :class="{ 'li-active': fileCur === index }">
                                            <span>{{ item.name }}</span>
                                            <span>{{ item.createTime | formatData }}</span>
                                            <div></div>
                                        </li>
                                    </ul>
                                </el-scrollbar>
                            </div>
                            <div class="file-preview">
                                <img :src="filePreviewUrl" @click="showFilePreview(fileCur, 1)"/>
                            </div>
                        </div>
                    </div>
                </div>
                <img class="close" v-on:click="closePropertyDiv" src="../../assets/images/close.png"/>
            </div>
            <img :class="{ pointProperty: true, show: showProperty }" src="../../assets/images/pointProperty.png"/>
        </div>
    </div>
</template>

<script>
    import Container from "@/components/common/3d/index";
    import pinPath from "@/assets/images/point.png";
    import modelFile from "@/assets/js/modelFile.json";

    let vue;

    export default {
        components: {
            Container,
        },
        data() {
            return {
                projectList: [],
                propertyList: [],
                documentList: [],
                projectInfo: {
                    property: {}
                },
                tab: ["属性信息", "关联文档"],
                cur: 0,
                showProperty: false,
                showPreview: false,
                showViewer: false,
                showInfo: false,
                transEffect: false,
                filePreviewUrl: "",
                fileCur: -1,
                isLoop: true,
                modelFile,
                eventPosition: void 0,
            };
        },
        filters: {
            formatData(time) {
                let date = new Date(time);
                return date.format("yyyy-MM-dd");
            }
        },
        created() {
            Hook.add("LeftClick", (position, p) => {
                vue.eventPosition = position;
            }, "ProjectModel");

            Hook.add("PickComponent", component => {
                vue.showPropertyDiv(component);
            }, "ProjectModel");

            Hook.add("PModelLoaded", id => {
            }, "ProjectModel");

            Hook.add("EntityClick", eventArg => {
                if (eventArg.type === "Label") {
                    vue.showProject(eventArg.id);
                    vue.showProjectDetail();
                }
            }, "ProjectModel");

            Hook.add("CloseProjectData", () => {
                // 隐藏属性框
                vue.closePropertyDiv();
                // 隐藏工程信息
                bimMap.showModel(vue.projectPoint, false);
                vue.showInfo = false;
                // 显示工程图标
                bimMap.showModel(vue.projectId, true);
                // 重新轮播工程
                vue.toggleLoop();
            }, "ProjectModel");

        },
        destroyed() {
            clearInterval(this.timer);
            Hook.removeByGroup("ProjectModel");
        },
        methods: {
            init3D() {
                bimMap.createEarthScene();

                // 定位相机位置到重庆市
                bimMap.setCurrentCameraInfo([106.533959, 29.220205, 50000, 0, -60, 0]);

                // 部件拾取设置为双击触发
                bimMap.setClickMode(2);

                // 开启部件拾取为单选模式
                bimMap.setPickMode(1);

                // 加载模型
                this.addModels();

                // 循环定位
                this.loopPoint();
            },
            addModels() {
                // 获取审核中工程视点信息
                this.$http.get('/transfer/point/getList').then(projectList => {
                    vue.projectList = projectList;
                    vue.projectPointMap = {};
                    projectList.forEach(p => {
                        vue.projectPointMap[p.projectId] = p;
                    });

                    projectList.forEach(function (point) {
                        if (point.position) {
                            point.position = point.position.split(',').map(n => Number(n));
                        }
                        // 加载工程模型
                        vue.$http.get('/model/getGraph', {
                            projectId: point.projectId
                        }).then(graphs => {
                            let pmtsIds = [];
                            graphs.forEach(function (graph) {
                                graph.autoFlyto = false;
                                graph.url = ServerUrl + graph.url;
                                pmtsIds.push(bimMap.addPmts(graph));
                            });
                            point.pmtsIds = pmtsIds;
                        });
                    });
                    vue.addLabels();
                });
            },
            addLabels() {
                let defaultLabel = {
                    billboardOption: {
                        disableDepthTestDistance: Number.POSITIVE_INFINITY // 是否穿透显示
                    },
                    image: pinPath,
                    pointOption: {
                        show: false
                    }
                };
                //添加工程图标标签
                vue.labels = vue.projectList.filter(p => p.position).map(function (point) {
                    let label = _.defaults({
                        id: point.projectId,
                        position: point.position
                    }, defaultLabel);
                    return bimMap.addModel("Label", label);
                });
            },
            loopPoint() {
                if (vue.labels && vue.labels.length === 0) {
                    return;
                }
                // 循环展示
                let index = 0;
                this.timer = setInterval(function () {
                    if (!vue.isLoop) return;
                    let projectId = vue.labels[index];
                    vue.showProject(projectId);
                    // 视点定位
                    bimMap.setCurrentCameraInfo(vue.projectPointMap[projectId].farViewpoint, 3);
                    index = (index + 1) % vue.labels.length;
                }, 20000);
            },
            showProject(projectId) {
                vue.projectId = projectId;
                //  添加工程详情标签
                vue.projectPoint = bimMap.addModel("DivLabel", {
                    position: bimMap.tool.tc(vue.projectPointMap[vue.projectId].position),
                    maxDistance: 100000,
                    divId: "projectPoint",
                    offset: 0
                });
                // 隐藏工程信息
                bimMap.showModel(vue.projectPoint, false);
                vue.showInfo = false;
                vue.transEffect = false;

                // 显示初始工程图标
                for (let i = 0; i < vue.labels.length; i++) {
                    bimMap.showModel(vue.labels[i], true);
                }

                setTimeout(function () {
                    // 显示工程统计信息
                    vue.showProjectInfo();
                    // 隐藏工程图标
                    bimMap.showModel(projectId, false);
                }, 2000);
            },
            showProjectInfo() {
                // 获取工程统计信息
                vue.$http.get('/transfer/statistic/getProjectData', {
                    projectId: vue.projectId
                }).then(info => {
                    vue.projectInfo = Object.assign({
                        projectId: undefined,
                        projectName: vue.projectPointMap[vue.projectId].projectName,
                        bim: 0,
                        gis: 0,
                        document: 0
                    }, info);
                    // vue.projectPoint.show = true;
                    bimMap.showModel(vue.projectPoint, true);
                    vue.showInfo = true;
                    setTimeout(function () {
                        // 开启动态效果
                        vue.transEffect = true;
                    }, 10);
                });
            },
            showProjectDetail() {
                // 停止循环
                vue.isLoop = false;
                clearInterval(vue.timer);
                // 隐藏属性框
                vue.showPropertyDiv();
                // 刷新资料视图
                Hook.run("ShowProjectData", vue.projectId, vue.projectPointMap[vue.projectId].projectName);
                // 拉近工程视点
                bimMap.setCurrentCameraInfo(vue.projectPointMap[vue.projectId].nearViewpoint, 3);
                // 开始拾取模式
                bimMap.setPickMode(1);
                // 显隐模型
                bimMap.showAllPmts(!!1);
                bimMap.showAllPmts(!!0, vue.projectPointMap[vue.projectId].pmtsIds);
            },
            showPropertyDiv(component) {
                // 切换到属性标签
                vue.cur = 0;
                // 隐藏图片预览
                this.showPreview = false;
                this.filePreviewUrl = "";
                // 清空属性和文档
                vue.propertyList = [];
                vue.documentList = [];
                vue.fileCur = -1;

                if (component) {
                    // 获取属性信息
                    vue.$http.get('/model/getProperty', {
                        projectId: vue.projectId,
                        modelId: component.componentid
                    }).then(data => {
                        vue.propertyList = data;
                    });

                    // 获取文档信息
                    vue.$http.get('/data/getModelRefFile', {
                        projectId: vue.projectId,
                        modelId: component.modelFileId+'-'+component.componentid
                    }).then(data => {
                        vue.documentList = data;
                    });

                    // 显示属性详情
                    if (!vue.propertyLabel) {
                        vue.propertyLabel = bimMap.addModel("DivLabel", {
                            position: bimMap.tool.tc(vue.eventPosition),
                            maxDistance: 100000,
                            divId: "property",
                            offset: 0
                        });
                    } else {
                        // vue.propertyLabel.position = vue.eventPosition;
                        bimMap.removeModel(vue.propertyLabel);
                        vue.propertyLabel = bimMap.addModel("DivLabel", {
                            position: bimMap.tool.tc(vue.eventPosition),
                            maxDistance: 100000,
                            divId: "property",
                            offset: 0
                        });
                    }
                }
                if (vue.propertyLabel) {
                    // vue.propertyLabel.show = !!component;
                    bimMap.showModel(vue.propertyLabel,true)
                    vue.showProperty = !!component;
                }
            },
            closePropertyDiv() {
                this.showProperty = false;
                // 取消模型高亮
                bimMap.unhighlightAllComponents();
            },
            toggleLoop() {
                if (this.isLoop) {
                    clearInterval(this.timer);
                } else {
                    this.loopPoint();
                    // 显示所有模型
                    bimMap.showAllPmts(!!1);
                }
                vue.isLoop = !vue.isLoop;
            },
            showFilePreview(index, preview) {
                this.fileCur = index;
                let file = vue.documentList[index];
                let type = matchType(file.name);
                if (type === 'pdf' || preview) {
                    Hook.run("ShowFilePreview", file);
                }
                if (type === 'image') {
                    this.showPreview = true;
                    this.filePreviewUrl = gatewayUrl + "/file/preview/" + file.fileId;
                } else {
                    this.showPreview = false;
                    this.filePreviewUrl = "";
                }
            },
        },
        mounted() {
            vue = this;
            vue.init3D();
        },
    }

</script>

<style lang="less" scoped>

    .el-scrollbar {
        height: 100%;
    }

    /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow: scroll;
        height: calc(100% + 17Px);
    }

    .projectModel {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        border: none;
        overflow: hidden;
    }

    .projectPoint {
        position: absolute;
        display: none;
        pointer-events: none;
        user-select: none;
    }

    .showInfo,
    .showInfo > * {
        display: block !important;
    }

    .projectInfo {
        position: absolute;
        display: none;
        width: 300Px;
        height: 300Px;
        bottom: -25Px;
        left: -156Px;
    }

    @keyframes run {
        100% {
            background-position-x: 29700Px;
        }
    }

    .showInfo .projectInfo {
        animation: run 4s steps(99) 1;
    }

    .transEffect .projectInfo {
        background: url(~@/assets/images/projectPoint.png);
    }

    .projectInfoDiv {
        margin: 20Px 39Px;
        color: #fff;
        font-family: PingFang SC;
    }

    .projectTitle {
        font-size: 16Px;
        line-height: 37Px;
        font-weight: 600;
        letter-spacing: 3Px;
        height: 37Px;
        overflow: hidden;
        position: relative;
    }

    .projectTitle div {
        position: absolute;
        left: 222Px;
        transition: all 1s ease-in 1s;
    }

    .transEffect .projectTitle div {
        left: 0;
    }

    .projectProperty {
        font-size: 12Px;
        font-weight: 400;
        margin-top: 3Px;
    }

    .projectProperty li > div::before {
        content: "";
        display: inline-block;
        width: 4Px;
        height: 4Px;
        background-color: #22ffed;
        border-radius: 50%;
        margin: 3Px 5Px;
    }

    .projectProperty li {
        width: 200Px;
        position: relative;
        line-height: 20Px;
        height: 20Px;
        overflow: hidden;
    }

    .projectProperty li > div {
        position: absolute;
        display: inline-block;
        width: 120Px;
        left: -120Px;
    }

    .transEffect .projectProperty li > div {
        left: 0;
    }

    .projectProperty li div div {
        display: inline-block;
        width: 65Px;
        text-align: justify;
        text-align-last: justify;
        margin-right: 5Px;
    }

    .clickPoint {
        display: none;
        position: absolute;
        width: 40Px;
        height: 40Px;
        bottom: -3Px;
        left: -20Px;
        pointer-events: auto;
    }

    #property {
        // position: fixed !important;
        display: block !important;
        pointer-events: none;
        user-select: none;
        position: absolute;
        /*position: relative;*/
    }

    .propertyDiv {
        height: 384px;
        position: absolute;
        top: 58px;
        left: 0px;
        right: 7px;
    }

    #property .close {
        top: 20px;
        right: 22px;
    }

    .pointProperty {
        position: absolute;
        display: none;
        bottom: -4px;
        left: -5px;
    }

    .show {
        display: block !important;
    }

    .close {
        position: absolute;
        pointer-events: auto;
        cursor: pointer;
    }

    .sx {
        width: 302px;
        height: 460px;
        background: url(~@/assets/images/shuxing-box-bg.png);
        background-size: 100% 100%;
        position: absolute;
        left: 120Px;
        top: -197Px;
        display: none;
        pointer-events: auto;
    }

    .center .sx .t {
        padding-top: 25px;

        p {
            color: #fff;
            float: left;
            margin-left: 25px;
            font-size: 16px;
            font-weight: 600;
        }
    }

    .ditial {
        margin-top: 5px;
    }

    .first {
        width: 95%;
        margin: auto;
        height: 30px;
        // background-color: #072450;
        background: linear-gradient(90deg,
        rgba(7, 36, 80, 0.9) 0%,
        rgba(7, 36, 80, 0) 100%);
    }

    .first span {
        display: block;
        width: 4px;
        height: 16px;
        background: #22ffed;
        float: left;
        margin-left: 19px;
        margin-top: 7px;
    }

    .first p {
        color: #fff;
        float: left;
        margin-left: 10px;
        font-size: 14px;
        margin-top: 5px;
    }

    .first div:nth-child(1) {
        color: #fff;
        float: left;
        margin-left: 17px;
        font-size: 14px;
        margin-top: 5px;
        width: 100px;
    }

    .first div:nth-child(2) {
        color: #fff;
        float: right;
        margin-left: 10px;
        font-size: 14px;
        margin-top: 5px;
        width: 100px;
    }

    .c_content {
        width: 83%;
        margin: auto;
    }

    .c_content li {
        height: 37px;
        //border-bottom:1px solid #6BC0F9;
    }

    .c_content li div {
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg,
        rgba(107, 240, 255, 0) 0%,
        rgba(107, 192, 249, 0.95) 50%,
        rgba(107, 240, 255, 0) 100%);
        opacity: 0.5;
        float: left;
    }

    .c_content li span {
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .c_content li span:nth-child(1) {
        float: left;
        line-height: 35px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #dedede;
    }

    .c_content li span:nth-child(2) {
        float: right;
        line-height: 35px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #dedede;
        width: 100px;
    }

    .model-file-ul li span:nth-child(2) {
        width: 82px;
    }

    .showPreview .model-file-el {
        height: 185px;
    }

    .model-file-el {
        height: 350px;
    }

    .file-preview {
        display: none;
        position: relative;
        height: 154px;
        margin: 10px 20px 10px 25px;
    }

    .file-preview img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .showPreview .file-preview {
        display: block;
    }

    .li-active span {
        color: #4bc2ff !important;
    }

    .tab {
        position: absolute;
        top: 24px;
        left: 50%;
        margin-left: -90px;
        text-align: center;
    }

    .tab span {
        display: block;
        width: 90px;
        height: 30px;
        float: left;
        color: #fff;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
    }

    .tab span:nth-child(1) {
        border: 1px solid rgba(107, 192, 249, 1);
    }

    .tab span:nth-child(2) {
        border: 1px solid rgba(107, 192, 249, 1);
    }

    .selected {
        background-color: #6bc0f9;
    }

</style>
