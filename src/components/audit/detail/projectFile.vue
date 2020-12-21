<template>
    <div class="content">
        <!-- 工程资料树 -->
        <div class="left">
            <!--                <el-scrollbar style="height:100%">-->
            <CimTree class="cim-tree" url="/data/getCatalog" :resParams="catalogResParams" :indent="28"
                     ref="CatalogTree" @node-click="changeCatalogCode" :expandOnClickNode="true"
                     treeId="CatalogTree">
            </CimTree>
            <!--                </el-scrollbar>-->
        </div>
        <div class="right">
            <el-container>
                <el-header style="height: auto">
                    <!-- 面包屑 -->
                    <CimBreadcrumb :datas="breadcrumbDatas" ref="catalogBreadcrumb"
                                   @resetBreadcrumbData="resetBreadcrumbData" @resetTableList="resetTableList">
                    </CimBreadcrumb>
                </el-header>
                <el-main>
                    <!-- 列表 -->
                    <div class="btn">
                        <CimTable ref="projectFilesTable" :url="fileListUrl" :columns="projectFileTableColumns"
                                  :showSelection="false" :params="projectFileListParams" :newMinTable="true"
                                  :tableHeight="tabListHeight"
                                  :pagination="false">
                        </CimTable>
                    </div>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    // 引入tree组件
    import CimTree from '@/components/common/tree'
    import TreeDataParams from '@/components/common/tree/treeDataParams.js'
    // 引入table列表组件
    import CimTable from '@/components/common/table'
    // 引入面包屑组件
    import CimBreadcrumb from '@/components/common/breadcrumb'
    import BreadcrumbData from '@/components/common/breadcrumb/breadcrumbData.js'

    export default {
        components: {
            CimTree,
            CimTable,
            CimBreadcrumb
        },
        props: {
            fileListUrl: {
                type: String,
                default: ''
            },
            //    列表高度
            tabListHeight: {
                type: String
            }
        },
        data() {
            return {
                breadcrumb: [],
                catalogResParams: new TreeDataParams('code', 'oname', 'pcode', 'memo'),
                // 列表项
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
                },{
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
                // 文档列表参数
                projectFileListParams: {
                    catalogId: '',
                    projectId: this.$store.state.audit.projectId,
                    type: '',
                    weight: 0
                },
                // 列表url
                projectFileListUrl: '/data/getCatalogModelRefFile',
                breadcrumbDatas: [],
            }
        },
        methods: {
            tableRowClassName({
                                  row,
                                  rowIndex
                              }) {
                //console.log(rowIndex)
                if (rowIndex % 2 == 1) {
                    return "warning-row";
                } else {
                    return "success-row";
                }
            },
            changeCatalogCode(treeNodeData, treeNode) {
                // 重置工程资料文件列表->当前目录Id
                this.resetCurrentCatalogId()

                if (treeNodeData.disabled) {
                    return
                }
                let catalogCode = treeNodeData.id
                this.$store.state.audit.catalogTreeCurrentCode = catalogCode
                this.projectFileListParams.type = catalogCode
                this.$refs.projectFilesTable.reload()

                // 给面包屑赋值
                this.breadcrumbDatas = []
                const parentNodes = this.$refs.CatalogTree.getParentNodes(treeNode)
                this.breadcrumb = parentNodes
                // this.$store.commit('breadcrumb/setBreadcrumb', parentNodes)

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
            resetTableList() {
                this.resetCurrentCatalogId();
                this.$refs.projectFilesTable.reload();
                this.$refs.catalogBreadcrumb.resetData();
                this.breadcrumb.forEach(node => {
                    const breadcrumbData = new BreadcrumbData(node.label)
                    this.breadcrumbDatas.push(breadcrumbData)
                });
                this.$refs.catalogBreadcrumb.reload();
            }
        },
        created() {
            this.resetCurrentCatalogId()
        }
    }

</script>

<style lang="less" scoped>
    .content {
        display: flex;
        width: 100%;
        height: 100%;

        .left {
            width: 249px;
            border: 1px solid #4BC2FF;
            height: 99%;
            overflow: auto;
        }

        .right {
            flex: 1;
        }
    }

    // .cim-tree {
    //     margin-left: 15px;
    //     height: calc(100% - 10px);
    // }

    .btn {
        width: 96%;
        margin: auto;
        height: 99%;
    }

    /deep/ .el-breadcrumb {
        margin-left: 26px;
        height: 40px;
        line-height: 40px;
    }

    /deep/ .el-container.is-vertical{
        height: 100%!important;
    }
</style>
