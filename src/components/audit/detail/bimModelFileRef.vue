<template>
    <el-row class="bim_row">
        <el-col :span="4" class="leftcontent_col">
            <p>待关联模型</p>
            <!-- 模型树 -->
            <tree class="modelTree" :nodes="nodes" :setting="setting" @onCreated="handleCreated"
                  @onClick="treeModelClick"/>
        </el-col>
        <el-col :span="20" class="rightcontent_col">
            <el-row :gutter="20" class="contain_row" style="height: 100%" type="flex" align="middle">

                <el-container>
                    <el-header style="padding-top: 10px;height: 40px">
                        <!-- 树形下拉框 -->
                        <el-col :span="5" style="padding-left:0px">
                            <!--                            <treeselect v-model="value" placeholder="请选择" :multiple="false" :options="options"-->
                            <!--                                        @select="treeSelect" :normalizer="normalizer" :alwaysOpen="false"-->
                            <!--                                        :defaultExpandLevel="Infinity"/>-->
                        </el-col>
                        <!-- 面包屑 -->
                        <el-col :span="12">
                            <CimBreadcrumb :datas="breadcrumbDatas" ref="catalogBreadcrumb"
                                           style="margin-top:19px;margin-bottom:15px"
                                           @resetBreadcrumbData="resetBreadcrumbData" @resetTableList="resetTableList">
                            </CimBreadcrumb>
                        </el-col>
                    </el-header>
                    <el-main>
                        <el-col style="height: 100%;padding: 0">
                            <CimTable ref="projectFilesTable" :url="fileListUrl" :columns="projectFileTableColumns"
                                      :checkedData="checkdata" :showSelection="false"
                                      :params="projectFileListParams"
                                      :newMinTable="true" :tableHeight="tableHeight"
                                      :pagination="false">
                            </CimTable>
                        </el-col>
                    </el-main>
                </el-container>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    // 导入巨树
    import tree from 'vue-giant-tree'
    // 导入vue-treeselect
    // import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    import CimBreadcrumb from '@/components/common/breadcrumb'
    import CimTable from '@/components/common/table'
    import BreadcrumbData from '@/components/common/breadcrumb/breadcrumbData.js'

    export default {
        components: {
            tree,
            // Treeselect,
            CimBreadcrumb,
            CimTable
        },
        props: {
            fileListUrl: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                selectNodeId: '',
                tableHeight: '100%',
                defaultDatePattern: 'yyyy-MM-dd',
                // tree数据
                nodes: [],
                value: null,
                options: [],
                ztreeObj: null,
                treeModelId: '',
                checkdata: [],
                refIcon: require("../../../../public/images/glian.png"),
                unRefIcon: require("../../../../public/images/wglian.png"),
                // 面包屑绑定的数据对象
                breadcrumbDatas: [],
                // 文档列表参数
                projectFileListParams: {
                    modelId: '',
                    catalogId: '',
                    projectId: this.$store.state.audit.projectId,
                    // type: '',
                    weight: 0,
                },
                // 列表项
                projectFileTableColumns: [{
                    label: '文件名称',
                    align: 'left',
                    prop: 'name',
                    length: 50,
                    typeOf: item => item.isDirectory ? 'event' : '',
                    getIcon: item => item.isDirectory ? "/images/icon1.png" : "/images/gczl.png",
                    clicked: item => {
                        // 重载表格
                        this.reloadTable(item.id)
                        const breadcrumbData = new BreadcrumbData(item.name, {
                            id: item.id
                        }, data => {
                            this.reloadTable(data.memo.id)
                        });
                        this.breadcrumbDatas.push(breadcrumbData)
                        this.$refs.catalogBreadcrumb.reload()
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
                    label: '所属目录',
                    prop: 'type',
                    align: 'center',
                }],
                // ztree的配置
                setting: {
                    data: {
                        simpleData: {
                            enable: true,
                        },
                    },
                    view: {
                        showLine: false,
                        selectedMulti: false,
                        // autoCancelSelected: false
                    },
                    check: {
                        enable: false,
                        chkboxType: {
                            "Y": "s",
                            "N": "s"
                        }
                    }
                },
                // 处理返回的数据，没有children就删掉
                normalizer(node) {
                    if (node.children && !node.children.length) {
                        delete node.children
                    }
                }
            }
        },
        methods: {
            // 操作ztree
            handleCreated(ztreeObj) {
                this.ztreeObj = ztreeObj
            },
            // 获取左侧模型树的数据
            getTreeData() {
                this.$http.get('/model/getTree', {
                    projectId: this.$store.state.audit.projectId
                }).then(data => {
                    this.$http.get('/data/getRefModelId', {
                        projectId: this.$store.state.audit.projectId
                    }).then(ids => {
                        if (ids && ids.length > 0) {
                            data.forEach(node => {
                                if (ids.includes(node.id)) {
                                    node.icon = this.refIcon;
                                } else {
                                    node.icon = this.unRefIcon;
                                }
                            })
                        } else {
                            data.forEach(node => {
                                node.icon = this.unRefIcon;
                            })
                        }
                        this.nodes = data;
                    })

                })
            },
            // 获取树形菜单数据
            getTreeMenuData() {
                this.$http.get('/data/getCatalog').then(data => {
                    this.options = data;
                    let tableListData = this.$refs.projectFilesTable.tableData;
                    tableListData.map(item => {
                        item.type = data.filter(line => line.code === item.type)[0].oname;
                    });
                })
            },
            // tree 点击时触发
            treeModelClick(evt, treeId, treeNode) {
                if (this.selectNodeId === treeNode.id) {
                    this.ztreeObj.cancelSelectedNode();
                    this.selectNodeId = '';
                    this.treeModelId = '';
                    this.resetTableList();
                    this.$refs.catalogBreadcrumb.resetData();
                    this.breadcrumbDatas.splice(0, 0, {
                        name: '全部'
                    });
                } else {
                    this.selectNodeId = treeNode.id;
                    this.treeModelId = treeNode.id;
                    this.resetCurrentCatalogId();
                    this.$refs.catalogBreadcrumb.resetData();
                    this.getCatalogModelList();
                    this.breadcrumbDatas.splice(0, 0, {
                        name: '已关联'
                    });
                }
            },
            // 获取目录中模型关联的文档信息
            getCatalogModelList() {
                this.$http.get('/data/getCatalogModelRefFile', {
                    modelId: this.treeModelId,
                    projectId: this.$store.state.audit.projectId,
                    catalogId: this.$store.state.audit.currentCatalogId,
                    weight: 0
                }).then(data => {
                    data.map(item => {
                        item.type = this.options.filter(row => row.code === item.type)[0].oname;
                        item.createTime = new Date(item.createTime).format(this.defaultDatePattern);
                        this.$refs.projectFilesTable.getfilesize(item);
                    });
                    this.$refs.projectFilesTable.tableData = data;
                })
            },
            // 重载表格
            reloadTable(catalogId) {
                // this.checkTableSign = 0;
                this.setCurrentCatalogId(catalogId);
                this.getCatalogModelList();
            },
            resetTableList() {
                this.resetCurrentCatalogId();
                this.resetBreadcrumbData();
                this.getCatalogModelList();
            },
            // 给执行的任务排队
            checkTable() {
                if (++this.checkTableSign == 2) {
                    this.$refs.projectFilesTable.getChecked()
                }
            },
            treeSelect(node) {
                // 重置面包屑数据
                this.$refs.catalogBreadcrumb.resetData()
                // 重置工程资料文件列表->当前目录Id
                this.resetCurrentCatalogId()
                let catalogCode = node.id
                this.$store.state.audit.catalogTreeCurrentCode = catalogCode
                this.projectFileListParams.type = catalogCode

                this.reloadTable('')
                // this.$refs.projectFilesTable.reload()
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
            // 点击面包屑节点后，重置面包屑数据
            resetBreadcrumbData(breadcrumbDatas) {
                if (breadcrumbDatas !== undefined) {
                    this.breadcrumbDatas = breadcrumbDatas
                }
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 == 1) {
                    return "warning-row";
                } else {
                    return "success-row";
                }
            },
        },
        created() {
            this.getTreeData();
            this.getTreeMenuData();
            if (!this.treeModelId) {
                this.breadcrumbDatas.splice(0, 0, {
                    name: '全部'
                });
            }
        }
    }

</script>

<style lang="less" scoped>
    @content_col_height: 800px;
    @content_col_margin_top: -1px;
    @table_col_height: @content_col_height - 115;
    @col_gutter: 29px;

    .bim_row {
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
        height: 100%;
    }

    .leftcontent_col p {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: @color_blue;
        .font_mid();
        color: @color_white;
        text-align: center;
        /*margin-top: 10px;*/
    }

    .rightcontent_col {
        padding-left: @col_gutter;
        //.content_col();
    }

    .table_col {
        /*border: 1px solid @color_light_grey;*/
        height: calc(100% - 34px);
        /*height: @table_col_height;*/
    }

    .breadcrumb {
        margin: 19px 0 11px 0;
    }

    .ztree {
        padding: 20px 0 0 20px;
        box-sizing: border-box;
    }

    .el-breadcrumb {
        margin-top: 6px !important;
        margin-bottom: 0 !important;
    }

    .el-row {
        margin-left: 0 !important;
    }

    /deep/ .mtb .el-checkbox:last-of-type {
        pointer-events: none;
    }

    /deep/ .el-container.is-vertical {
        height: 99%;
    }

    /deep/ .el-main {
        padding: 0 !important;
    }

    .modelTree {
        height: calc(100% - 41px);
        overflow-x: scroll;
    }
</style>
