<template>
    <div class="right">
        <div :class="{ gj: true, show: showTree }">
            <p class="gp">工程视图</p>
            <div class="tg">
                <span></span>
                <p>{{projectDataName}}</p>
            </div>
            <!-- 工程资料树-->
            <div class="tree">
                <CimTree class="cim-tree" url="/data/getCatalog" :resParams="catalogResParams" :indent="28" :icon-path="iconPath"
                         ref="CatalogTree" @node-click="changeCatalogCode" :expandOnClickNode="false"></CimTree>
            </div>
            <img class="close" v-on:click="Hook.run('CloseProjectData')" src="@/assets/images/close.png"/>
            <p class="p_tt" @click="checkProjectDetail">审核工程<img src="@/assets/images/right_jia.png"
                                                                     style="margin-left: 4px"/></p>
        </div>
        <!-- 文件资料 -->
        <div class="documentation" :class="[this.flag ? 'show' : 'hidden']">
            <div class="document_title">文件资料</div>
            <!-- 面包屑-->
            <CimBreadcrumb :datas="breadcrumbDatas" ref="catalogBreadcrumb"
                           @resetBreadcrumbData="resetBreadcrumbData"></CimBreadcrumb>
            <!--            <el-scrollbar>-->
            <CimTable ref="projectFilesTable" :url="projectFileListUrl" :columns="projectFileTableColumns"
                      :showSelection="false" :params="projectFileListParams" :newMinTable="false"
                      :pagination="false" class="table_color"></CimTable>
            <!--            </el-scrollbar>-->
            <img class="close_la" @click="closeDiv" src="@/assets/images/close.png"/>
        </div>
    </div>
</template>

<script>
    // 引用tree组件
    import CimTree from "@/components/common/tree";
    import TreeDataParams from '@/components/common/tree/treeDataParams.js';
    // 引入面包屑组件
    import CimBreadcrumb from '@/components/common/breadcrumb';
    import BreadcrumbData from '@/components/common/breadcrumb/breadcrumbData.js';

    // 引入table列表组件
    import CimTable from '@/components/common/table'

    export default {
        components: {
            CimTree,
            CimBreadcrumb,
            CimTable
        },
        data() {
            return {
                Hook,
                iconPath: "overview/",
                showTree: false,
                flag: false,
                projectDetailId: '',
                list: ["BIM模型", "三维模型"],
                list2: ["工程地理信息", "数字正射影像", "航空影像", "三维地形"],
                catalogResParams: new TreeDataParams('code', 'oname', 'pcode', 'memo'),
                projectDataName: '',
                breadcrumbDatas: [],
                // 列表url
                projectFileListUrl: '/data/getProjectFileList',
                // 文档列表参数
                projectFileListParams: {
                    catalogId: '',
                    projectId: '',
                    type: '',
                    weight: 0
                },
                // 列表项
                projectFileTableColumns: [{
                    label: '文件名称',
                    prop: 'name',
                    length: 20,
                    typeOf: item => item.isDirectory ? 'event' : '',
                    getIcon: item => item.isDirectory ? "/images/icon1.png" : "/images/gczl.png",
                    clicked: item => {
                        this.setCurrentCatalogId(item.id);
                        const breadcrumbData = new BreadcrumbData(item.name, {
                            id: item.id
                        }, data => {
                            this.setCurrentCatalogId(data.memo.id);
                            this.$refs.projectFilesTable.reload();
                        })
                        this.breadcrumbDatas.push(breadcrumbData);
                        this.$refs.catalogBreadcrumb.reload();
                        this.$refs.projectFilesTable.reload();
                    },
                }, {
                    label: '上传时间',
                    prop: 'createTime',
                    type: 'date',
                    // pattern: 'yyyy-MM-dd hh:mm'
                }],
            }
        },
        created() {
            Hook.add("ShowProjectData", (projectId, projectName) => {
                // console.log('ShowProjectData1', projectId, projectName);
                // 展示获刷新工程资料信息
                this.showProjectDataDiv();
                this.projectDataName = projectName;
                this.projectFileListParams.projectId = projectId;
                this.projectDetailId = projectId;
                this.closeDiv();
                this.$refs.CatalogTree.getData();
            }, "ProjectData");

            Hook.add("CloseProjectData", () => {
                // console.log('CloseProjectData1');
                // 关闭工程资料信息
                this.closeProjectTree();
            }, "ProjectData");
            this.resetCurrentCatalogId();
        },
        destroyed() {
            Hook.removeByGroup("ProjectData");
        },
        methods: {
            // 展示工程资料div
            showProjectDataDiv() {
                this.showTree = true
            },
            changeCatalogCode(treeNodeData, treeNode) {
                // 重置工程资料文件列表->当前目录Id
                this.resetCurrentCatalogId()

                if (treeNodeData.children.length !== 0) {
                    treeNodeData.disabled = true;
                } else {
                    this.flag = true;
                }
                let catalogCode = treeNodeData.id
                this.$store.state.audit.catalogTreeCurrentCode = catalogCode;
                this.projectFileListParams.type = catalogCode;
                this.$refs.projectFilesTable.reload();

                // 给面包屑赋值
                this.breadcrumbDatas = []
                const parentNodes = this.$refs.CatalogTree.getParentNodes(treeNode)
                parentNodes.forEach(node => {
                    const breadcrumbData = new BreadcrumbData(node.label)
                    this.breadcrumbDatas.push(breadcrumbData)
                })
                this.$refs.catalogBreadcrumb.reload()
            },
            // 重置工程资料文件列表->当前目录Id
            resetCurrentCatalogId() {
                this.projectFileListParams.catalogId = ''
                this.$store.state.audit.currentCatalogId = ''
            },
            // 设置工程资料文件列表->当前目录Id
            setCurrentCatalogId(catalogId) {
                this.projectFileListParams.catalogId = catalogId
                this.$store.state.audit.currentCatalogId = catalogId
            },
            // 重置面包屑数据
            resetBreadcrumbData(breadcrumbDatas) {
                this.breadcrumbDatas = breadcrumbDatas
            },
            checkProjectDetail() {
                this.$http.get(`/transfer/getByProjectId/${this.projectDetailId}`).then(data => {
                    this.href2('/Accept/' + data.id);
                })
            },
            // 关闭工程资料
            closeProjectTree() {
                this.showTree = false;
                this.closeDiv();
            },
            // 关闭文件资料
            closeDiv() {
                this.flag = false;
            }
        }
    }
</script>

<style lang="less" scoped>

    .right > * {
        pointer-events: auto;
    }

    .gj {
        width: 100%;
        height: 510px;
        background: url(../../assets/images/right-top.png);
        background-size: 100% 100%;
        margin-top: 20px;
        position: relative;
        display: none;
    }

    .gj .close {
        position: absolute;
        top: 46px;
        right: 22px;
        cursor: pointer;
    }

    .gp {
        text-align: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #fff;
        padding-top: 2px;
    }

    .tg {
        position: absolute;
        top: 65px;

        span {
            display: block;
            width: 4px;
            height: 16px;
            background: url(../../assets/images/title-beautiful.png);
            float: left;
            margin-left: 19px;
            margin-top: 3px;
        }

        p {
            color: #fff;
            float: left;
            margin-left: 10px;
            font-size: 16px;
            font-family: PingFang SC;
            font-weight: 600;
            letter-spacing: 3px;
        }
    }

    .tree {
        height: 400px;
        width: 300px;
        margin-left: 30px;
        position: absolute;
        top: 106px;
        overflow: auto;
    }

    .icon_img {
        vertical-align: middle;
        margin-right: 10px;
    }

    .documentation {
        position: relative;
        width: 100%;
        height: 393px;
        background: url(../../assets/images/guanlian.png);
        background-size: 100% 100%;
        display: none;
    }

    .document_title {
        position: absolute;
        left: 50%;
        top: 30px;
        width: 164px;
        text-align: center;
        transform: translateX(-50%);
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        background: url(../../assets/images/gltitle.png);
        background-size: 100% 100%;
        height: 9px;
        line-height: 9px;
    }

    .el-breadcrumb {
        position: absolute;
        left: 26px;
        top: 65px;
    }

    .el-breadcrumb-item {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
    }

    /deep/ .el-breadcrumb__inner {
        color: #fff !important;
    }

    .close_la {
        position: absolute;
        top: 22px;
        right: 18px;
        cursor: pointer;
    }

    .show {
        display: block;
    }

    .el-scrollbar {
        height: 100%;
    }

    /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow: scroll;
        height: calc(100% + 17Px);
    }

    /deep/ .tree .el-tree-node__content {
        height: 22px;
    }

    /deep/ .el-tree {
        background: none;
    }

    /deep/ .font_mid {
        color: #fff !important;
    }

    /deep/ .font_sm {
        color: #fff !important;
        font-size: 14px !important;
    }

    /deep/ .el-tree-node__content:hover {
        background: none !important;
        background: transparent !important;
    }

    /deep/ .el-tree-node__content .is-active {
        background: none !important;
    }

    /* 工程视图树节点文字选中效果*/
    /deep/ .el-tree-node.is-current > .el-tree-node__content > .custom-tree-node > span > .font_sm {
        /*background: transparent;*/
        color: #4BC2FF !important;
    }

    /deep/ .el-tree-node.is-current > .el-tree-node__content > .custom-tree-node > span > .font_mid {
        /*background: transparent;*/
        color: #4BC2FF !important;
    }

    /deep/ .tree .dis_mid {
        color: #FFFFFF !important;
        font-size: 16px !important;
        cursor: default;
    }

    /deep/ .el-tree-node:focus > .el-tree-node__content {
        background: transparent;
    }

    /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
        background: transparent;
    }

    .bgBox {
        background: none;
        top: 80px;
    }

    /deep/ .tb {
        height: auto;
    }

    /deep/ .el-table {
        background: none !important;
        width: 90% !important;
        height: 300px !important;
    }

    /deep/ .tableBox th {
        background: none !important;
    }

    /deep/ .el-table .cell {
        color: #FFFFFF;
    }

    /deep/ .el-table tr {
        background: none !important;
    }

    /deep/ .el-table tr .el-table_1_column_1 .cell {
        text-align: left;
        font-size: 12px;
    }

    /deep/ .el-table tr .el-table_1_column_2 .cell {
        text-align: right;
        font-size: 12px;
    }

    /deep/ .el-table th.is-leaf {
        border-bottom: none;
    }

    /deep/ .event {
        color: #4BC2FF !important;
    }

    /deep/ .el-table .cell span {
        color: #FFFFFF !important;
    }

    /deep/ .el-table td {
        border-bottom: none;
    }

    /deep/ .el-table__body tr:hover > td {
        background: none !important;
    }

    .p_tt {
        position: absolute;
        color: #FFFFFF;
        font-size: 14px;
        left: 50%;
        bottom: 24px;
        transform: translateX(-50%);
        cursor: pointer;
    }

    .table_color {
        background: transparent!important;
        width: 100%;
        position: absolute;
        top: 90px;
        overflow-y: auto;
    }

    /*/deep/ .tree_icon {*/
    /*    display: inline-block;*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    margin-right: 8px;*/
    /*    overflow: hidden;*/
    /*}*/

    /*/deep/ .el-tree-node__content .custom-tree-node img{*/
    /*    filter: drop-shadow(20px 0 #FFFFFF);*/
    /*    border-right: 20px solid transparent;*/
    /*    -webkit-filter: drop-shadow(20px 0 #FFFFFF);*/
    /*    position: relative;*/
    /*    left: -20px;*/
    /*}*/

</style>
