<template>
    <el-row class="bim_row">
        <el-col :span="4" class="leftcontent_col">
            <p>待关联模型</p>
            <!-- 模型树 -->
            <tree class="modelTree" :nodes="nodes" :setting="setting" @onCreated="handleCreated" @onClick="treeModelClick"
                  @onCheck="treeModelCheck"/>
        </el-col>
        <el-col :span="20" class="rightcontent_col">

            <el-row :gutter="20" class="contain_row" style="margin:15px 0 10px 0" type="flex" align="middle">
                <!-- 树形下拉框 -->
                <el-col :span="5" style="padding-left:0px">
                    <treeselect v-model="value" placeholder="请选择" :multiple="false" :options="options"
                                @select="treeSelect" :normalizer="normalizer" :alwaysOpen="false"
                                :defaultExpandLevel="Infinity"/>
                </el-col>
                <!-- 面包屑 -->
                <el-col :span="12">
                    <CimBreadcrumb :datas="breadcrumbDatas" ref="catalogBreadcrumb"
                                   style="margin-top:19px;margin-bottom:15px"
                                   @resetBreadcrumbData="resetBreadcrumbData">
                    </CimBreadcrumb>
                </el-col>
            </el-row>

            <!-- 列表 -->
            <el-row :span="24" class="contain_row table_col">
                <el-col style="height: 100%">
                    <CimTable ref="projectFilesTable" :url="projectFileListUrl" :columns="projectFileTableColumns"
                              :checkedData="checkdata" :showSelection="true" :params="projectFileListParams"
                              :newMinTable="true" :tableHeight="tableHeight" :pagination="false"
                              @TableSelect="isSelected">
                    </CimTable>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
    // import CimTree from '@/components/common/tree'
    import CimBreadcrumb from '@/components/common/breadcrumb'
    import CimTable from '@/components/common/table'
    // import TreeDataParams from '@/components/common/tree/treeDataParams.js'
    import BreadcrumbData from '@/components/common/breadcrumb/breadcrumbData.js'

    // 导入巨树
    import tree from 'vue-giant-tree'
    // 导入vue-treeselect
    import Treeselect from '@riophae/vue-treeselect'
    // import the styles
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'

    export default {
        components: {
            // CimTree,
            tree,
            Treeselect,
            CimBreadcrumb,
            CimTable
        },
        data() {
            return {
                tableHeight: '100%',
                checkdata: [],
                refIcon: require("../../../../public/images/glian.png"),
                unRefIcon: require("../../../../public/images/wglian.png"),
                ztreeObj: null,
                // 面包屑绑定的数据对象
                breadcrumbDatas: [],
                // table Url
                projectFileListUrl: '/data/getProjectFileList',
                // 文档列表参数
                projectFileListParams: {
                    catalogId: '',
                    projectId: this.$store.state.application.projectId,
                    type: this.$store.state.application.catalogTreeCurrentCode,
                    weight: 0
                },
                // table 展示列
                projectFileTableColumns: [{
                    label: '文件名称',
                    align: 'left',
                    prop: 'name',
                    length: 20,
                    typeOf: item => item.isDirectory ? 'event' : '',
                    getIcon: item => item.isDirectory ? "/images/icon1.png" : "/images/gczl.png",
                    clicked: item => {
                        // 重载表格
                        this.reloadTable(item.id)
                        // 给面包屑赋值
                        const breadcrumbData = new BreadcrumbData(item.name, {
                            id: item.id
                        }, data => {
                            this.reloadTable(data.memo.id)
                        })
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
                }],
                // modelTreeResParams: new TreeDataParams('nodeId', 'nodeName', 'parentId'),
                breadcrumbNames: [],
                // tree数据
                nodes: [],
                // tree的modelID
                treeModelId: '',
                selected: '',
                selectedItemIds: [],
                // ztree的配置
                setting: {
                    data: {
                        simpleData: {
                            enable: true,
                        },
                    },
                    view: {
                        showLine: false,
                        // showIcon: false
                    },
                    check: {
                        enable: true,
                        chkboxType: {
                            "Y": "s",
                            "N": "s"
                        }
                    }
                },
                value: null,
                options: [],
                // 处理返回的数据，没有children就删掉
                normalizer(node) {
                    if (node.children && !node.children.length) {
                        delete node.children
                    }
                }
            }
        },
        methods: {
            // 点击面包屑节点后，重置面包屑数据
            resetBreadcrumbData(breadcrumbDatas) {
                this.breadcrumbDatas = breadcrumbDatas
            },
            // 获取左侧模型树的数据
            getTreeData() {
                this.$http.get('/model/getTree', {
                    projectId: this.$store.state.application.projectId
                }).then(data => {
                    this.$http.get('/data/getRefModelId', {
                        projectId: this.$store.state.application.projectId
                    }).then(ids => {
                        // console.log(ids, 'ids')
                        // console.log(this.refIcon, 'refIcon')
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
                    this.options = this.formatTreeData(data)
                    // console.log(this.options, 'treedata')
                })
            },
            initTreeNode(data) {
                let treeNode = {}
                treeNode['id'] = data.code
                treeNode['label'] = data.oname
                // treeNode['icon'] = data[this.resParams.icon]
                // treeNode['class'] = style
                treeNode['children'] = []
                return treeNode
            },
            // 格式化数据
            formatTreeData(data) {
                let level1Nodes = data.filter(node => node.pcode == '').map(node => {
                    return this.initTreeNode(node)
                })
                level1Nodes = this.setChildren(level1Nodes, data)
                return level1Nodes
            },
            // 递归给节点添加子节点
            setChildren(parentNodes, originData) {
                parentNodes = parentNodes.map(
                    node => {
                        let sonNodes = originData.filter(data_node => data_node.pcode === node.id).map(
                            node => {
                                return this.initTreeNode(node)
                            }
                        )
                        sonNodes = this.setChildren(sonNodes, originData)
                        node.children = node.children.concat(sonNodes)
                        return node
                    }
                )
                return parentNodes
            },
            // 操作ztree
            handleCreated(ztreeObj) {
                this.ztreeObj = ztreeObj
            },
            // tree 点击时触发
            treeModelClick(evt, treeId, treeNode) {
                this.treeModelId = treeNode.id;
                this.ztreeObj.checkAllNodes(false)
                this.ztreeObj.checkNode(treeNode, true, true)
                this.getCatalogModelList().then(data => {
                    this.$refs.projectFilesTable.getChecked()
                })
            },
            // 左侧 tree 选中时触发
            treeModelCheck(evt, treeId, treeNode) {
                if (treeNode.checked) {
                    this.treeModelId = treeNode.id
                    let nodes = this.ztreeObj.getCheckedNodes(true)
                    // 判断是否勾选多个节点
                    if (nodes && nodes.length == 1) {
                        this.getCatalogModelList().then(data => {                                                                                                       
                            this.$refs.projectFilesTable.getChecked()
                        })
                    } else {
                        this.$refs.projectFilesTable.cancelListChecked()
                    }
                } else {
                    // this.getCatalogModelList()
                    this.$refs.projectFilesTable.cancelListChecked()
                }
            },
            // 勾选列表触发
            isSelected(rows, row) {
                this.selected = rows.length && rows.indexOf(row) !== -1
                if (this.selected) {
                    this.$http.post('/data/setModelRef', {
                        fileIds: row.id,
                        isRef: 1,
                        modelIds: this.treeModelId,
                        projectId: this.$store.state.application.projectId
                    }, '关联成功').then(data => {

                    })
                } else if (this.selected === 0 || this.selected === false) {
                    this.$http.post('/data/setModelRef', {
                        fileIds: row.id,
                        isRef: 0,
                        modelIds: this.treeModelId,
                        projectId: this.$store.state.application.projectId
                    }, '取消成功').then(data => {
                        // if (rows.length === 0) {
                        //     this.ztreeObj.checkAllNodes(true)
                        // }
                    })
                }
            },
            // 选中树菜单重置文件列表
            treeSelect(node) {
                // 重置面包屑数据
                this.$refs.catalogBreadcrumb.resetData()
                // 重置工程资料文件列表->当前目录Id
                this.resetCurrentCatalogId()
                let catalogCode = node.id
                this.$store.state.application.catalogTreeCurrentCode = catalogCode
                this.projectFileListParams.type = catalogCode

                this.reloadTable('')
            },
            // 设置工程资料文件列表->当前目录Id
            setCurrentCatalogId(catalogId) {
                this.projectFileListParams.catalogId = catalogId
                this.$store.state.application.currentCatalogId = catalogId
            },
            // 重置工程资料文件列表->当前目录Id
            resetCurrentCatalogId() {
                this.projectFileListParams.catalogId = ''
                this.$store.state.application.currentCatalogId = ''
            },
            // 获取目录中模型关联的文档信息
            getCatalogModelList() {
                return this.$http.get('/data/getCatalogModelRefFile', {
                    modelId: this.treeModelId,
                    projectId: this.$store.state.application.projectId,
                    type: this.$store.state.application.catalogTreeCurrentCode,
                    catalogId: this.$store.state.application.currentCatalogId
                }).then(data => {
                    this.checkdata = data
                })
            },
            // 重载表格
            reloadTable(catalogId) {
                this.checkTableSign = 0;
                this.setCurrentCatalogId(catalogId)
                // 如果模型ID为空，不查询
                if (this.treeModelId) {
                    this.getCatalogModelList().then(data => {
                        this.checkTable();
                    })
                }
                this.$refs.projectFilesTable.reload().then(data => {
                    this.checkTable();
                })
            },
            // 给执行的任务排队
            checkTable() {
                if (++this.checkTableSign == 2) {
                    this.$refs.projectFilesTable.getChecked()
                }
            }
        },
        created() {
            this.getTreeData()
            this.getTreeMenuData()
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
        height: 99%;
        margin-top: @content_col_margin_top
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
        border: 1px solid @color_light_grey;
        height: 100%;
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
        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }

    /deep/ .el-container.is-vertical {
        height: 100%;
    }

    .modelTree {
        overflow-x:scroll;
        height: calc(100% - 40px);
    }
</style>
