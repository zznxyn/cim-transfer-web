<template>
    <el-container style="background-color: #fff;height: 100%">
        <el-header style="height: auto">
            <el-row style="padding-top: 20px" v-if="searchParams.length > 0">
                <el-col>
                    <CimForm :formData="searchInfo" :formParams="searchParams" :searchAvailable="true" :search="search"
                        ref="ruleForm" :resetAvailable="true" :reset="reset"></CimForm>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <!-- table -->
            <div :class="{stb: miniTable, tb: !miniTable, mtb: newMinTable}" id="CimTable" style="height: 100%">
                <!-- <div class="stb"> -->
                <!-- <el-scrollbar style="height:100%"> -->
                <el-table :data="tableData" :header-cell-style="{background:'#EBEEF7'}" @selection-change="selectChange"
                    @select="onTableSelect" :row-class-name="tableRowClassName" class="tableBox" :height="tableHeight"
                    ref="table" :style="{'width': miniTable || newMinTable? '100%':'96%', 'margin':'auto'}">
                    <el-table-column type="index" :index="indexMethod" label="序号" v-if="showIndex" width="100">
                        <!-- <template slot-scope="scope">
                            <span>{{ scope.$index + 1}}</span>
                        </template> -->
                    </el-table-column>
                    <el-table-column type="selection" v-if="showSelection">
                    </el-table-column>
                    <el-table-column v-for="tableAttrColumn in tableAttrColumns" :key="tableAttrColumn.prop"
                        :label="tableAttrColumn.label" :show-overflow-tooltip="true" :align="tableAttrColumn.align"
                        :width="getColumnWidth(tableAttrColumn)">
                        <template slot-scope="scope">
                            <a class="href" v-if="getColumnType(tableAttrColumn, scope.row) === 'a'"
                                @click="href2(tableAttrColumn.href(scope.row))">{{scope.row[tableAttrColumn.prop]}}
                            </a>
                            <span v-else-if="getColumnType(tableAttrColumn, scope.row) === 'method'">
                                {{tableAttrColumn.method(scope.row)}}
                            </span>
                            <span v-else-if="getColumnType(tableAttrColumn, scope.row) === 'event'"
                                @click="tableAttrColumn.clicked(scope.row)" class="event">
                                <img class="td-icon" v-if="getIcon(tableAttrColumn, scope.row)"
                                    :src="getIcon(tableAttrColumn, scope.row)" alt="">
                                {{scope.row[tableAttrColumn.prop]}}
                            </span>
                            <span v-else>
                                <img class="td-icon" v-if="getIcon(tableAttrColumn, scope.row)"
                                    :src="getIcon(tableAttrColumn, scope.row)" alt="">
                                {{scope.row[tableAttrColumn.prop]}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" v-if="tableOperColumns.length > 0" header-align="center">
                        <template slot-scope="scope">
                            <template v-for="tableOperColumn in tableOperColumns">
                                <TableButton v-if="tableOperColumn.type === 'link'" :key="tableOperColumn.linkName"
                                    @click="href2(tableOperColumn.linkTo(scope.row))">
                                    {{tableOperColumn.linkName}}
                                </TableButton>

                                <TableButton v-if="isButton(tableOperColumn, scope.row)" :key="tableOperColumn.name"
                                    @click="tableOperColumn.clicked(scope.row)">
                                    {{tableOperColumn.name}}
                                </TableButton>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- </el-scrollbar> -->
            </div>
        </el-main>
        <el-footer style="height: auto">
            <!-- 分页 -->
            <div class="page">
                <el-pagination v-show="pagination" background layout="prev, pager, next, total, jumper, sizes"
                    :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="page" :page-size="limit" :page-sizes="pageSizes">
                </el-pagination>
            </div>
        </el-footer>
    </el-container>
    <!--    <div class="bgBox">-->


    <!--       -->
    <!--    </div>-->
</template>
<script>
    import CimForm from '@/components/common/form'

    export default {
        // name: 'CimTable',
        components: {
            CimForm
        },
        props: {
            checkedData: Array,
            url: {
                type: String,
                default: ''
            },
            /*
             * 要显示的列
             */
            columns: {
                type: Array,
                default () {
                    return []
                }
            },
            params: {
                type: Object,
                default () {
                    return {}
                }
            },
            searchParams: {
                type: Array,
                default () {
                    return []
                }
            },
            pagination: {
                type: Boolean,
                default: true
            },
            limit: {
                type: Number,
                default: 15
            },
            miniTable: {
                type: Boolean,
                default: false
            },
            newMinTable: {
                type: Boolean,
                default: false
            },
            showIndex: {
                type: Boolean,
                default: false
            },
            showSelection: {
                type: Boolean,
                default: false
            },
            tableHeight: {
                type: String,
                default: '100%'
            },
            // 多选触发事件
            SelectionChange: {
                type: Function,
                default: () => () => {}
            }
        },
        data() {
            return {
                tableAttrColumns: [],
                tableOperColumns: [],
                tableData: [],
                page: 1,
                total: 0,
                searchInfo: {},
                defaultDatePattern: 'yyyy-MM-dd',
                pageSizes: [5, 10, 15],
                selectData: [],
                isUpdate: false
            }
        },
        methods: {
            // 获取页面需要展示的数据列
            getTableAttrColumns() {
                return this.columns.filter(
                    tableColumn => tableColumn.label !== undefined
                )
            },
            // 获取页面需要展示的操作项
            getTableOperColumns() {
                return this.columns.filter(tableColumn => tableColumn.type === 'link' || tableColumn.type ===
                    'button')
            },
            initSearchInfo() {
                this.searchParams.forEach(searchParam => {
                    if (searchParam.type === 'date') {
                        this.searchInfo[searchParam.prop] = undefined
                    } else {
                        this.searchInfo[searchParam.prop] = ''
                    }
                })
            },
            tableRowClassName({
                row,
                rowIndex
            }) {
                if (rowIndex % 2 == 1) {
                    return 'warning-row'
                } else {
                    return 'success-row'
                }
            },
            searchInfoChange() {
                /* 查询条件变化调用此方法，避免查询输入框无法输入 */
                this.$forceUpdate()
            },
            getResult() {
                let queryInfo = this.params
                queryInfo = Object.assign(queryInfo, {
                    page: this.page,
                    limit: this.limit
                })

                if (this.searchInfo) {
                    queryInfo = Object.assign(queryInfo, this.searchInfo)
                }
                return this.$http.get(this.url, queryInfo).then(data => {
                    if (data instanceof Array) {
                        this.tableData = this.formatItems(data)
                        this.total = data.length
                    } else {
                        if (data.items === undefined || data.total === undefined) {
                            this.$message.error('返回数据格式错误，请联系后端开发人员')
                        } else {
                            this.tableData = this.formatItems(data.items)
                            this.total = data.total
                        }
                    }
                    return data
                })
            },
            reload() {
                this.addPageSize()
                this.tableAttrColumns = this.getTableAttrColumns()
                this.tableOperColumns = this.getTableOperColumns()
                return this.getResult()
            },

            // 监听分页改变事件
            handleSizeChange(newSize) {
                this.limit = newSize
                this.getResult()
                this.page = 1
            },
            // 监听页码值发生改变
            handleCurrentChange(pageSize) {
                this.page = pageSize
                this.getResult()
            },
            search() {
                this.page = 1
                this.getResult()
            },
            // 重置文本框
            reset() {
                this.initSearchInfo()
                this.page = 1
                this.getResult()
            },
            // 对数据进行格式化
            formatItems(items) {
                return items.map(item => {
                    this.tableAttrColumns.forEach(tableColumn => {
                        // 日期格式化
                        if (tableColumn.type === 'date') {
                            if (item[tableColumn.prop] !== null) {
                                if (tableColumn.pattern === undefined) {
                                    item[tableColumn.prop] = new Date(item[tableColumn.prop]).format(
                                        this.defaultDatePattern)
                                } else {
                                    item[tableColumn.prop] = new Date(item[tableColumn.prop]).format(
                                        tableColumn.pattern)
                                }
                            }
                        }
                    });
                    // 格式化文件大小
                    this.getfilesize(item)
                    return item
                })
            },
            //
            getColumnWidth(column) {
                if (column.length) {
                    return column.length * 8 + 20 + 'px'
                }
            },
            getColumnType(tableAttrColumn, row) {
                if (tableAttrColumn.type) {
                    return tableAttrColumn.type
                } else if (tableAttrColumn.typeOf) {
                    return tableAttrColumn.typeOf(row)
                }
            },
            addPageSize() {
                if (!this.pageSizes.includes(this.limit)) {
                    this.pageSizes.push(this.limit)
                    this.pageSizes.sort((a, b) => a - b)
                }
            },
            selectChange(selection) {
                this.$emit('SelectionChange', selection)
            },
            onTableSelect(rows, row) {
                this.$emit('TableSelect', rows, row)
            },
            // 文档模型关联改变列表选中状态
            getChecked() {
                let $this = this
                if (this.selectData.length === 0) {
                    $this.$refs.table.clearSelection()
                } else {
                    $this.$refs.table.clearSelection()
                    this.selectData.map(item => {
                        const row = this.tableData.filter(row => row.id === item.id)
                        $this.$refs.table.toggleRowSelection(row[0], true)
                    })
                }
            },
            // 当右侧勾选状态取消，就取消列表勾选状态
            cancelListChecked() {
                this.$refs.table.clearSelection()
            },
            getIcon(column, row) {
                if (column.getIcon) {
                    return column.getIcon(row)
                }
            },
            isButton(column, row) {
                if (column.show) {
                    return column.show(row)
                } else {
                    return column.type === 'button'
                }
            },
            // 格式化文件大小
            getfilesize(fileSizeByte) {
                if (fileSizeByte.fileSize !== null) {
                    if (fileSizeByte.fileSize === "0") {
                        fileSizeByte.fileSize = 0 + 'B'
                        return fileSizeByte.fileSize
                    } else {
                        let unitArr = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
                        let index = 0,
                            srcsize = fileSizeByte.fileSize;
                        index = Math.floor(Math.log(srcsize) / Math.log(1024));
                        let size = srcsize / Math.pow(1024, index);
                        //  保留的小数位数
                        size = parseFloat(size.toFixed(2));
                        fileSizeByte.fileSize = size + unitArr[index];
                        return fileSizeByte.fileSize;
                    }
                }
            },
            // 翻页序号递增
            indexMethod(index) {
                return (this.page - 1) * this.limit + index + 1;
            }
        },
        watch: {
            checkedData(val) {
                this.selectData = val
            }
        },
        created() {
            this.reload()
        }
    }

</script>
<style lang="less" scoped>
    /deep/ .el-table th.gutter {
        background: @color_light_grey;
    }

    .href {
        cursor: pointer;
        color: @color_blue;
    }

    .event {
        .href()
    }

    .bgBox {
        width: 100%;
        height: 100%;
        background: #fff;
        position: relative;
    }

    .stb {
        height: 315px;
    }

    /deep/ .el-input--medium .el-input__inner {
        width: 300px;
        height: 40px;
        line-height: 40px;
    }

    /deep/ .el-table .warning-row {
        background: #F8F9FD;
    }

    /deep/ .el-table .success-row {
        background: #fff;
    }

    /deep/ .tableBox {
        height: 100% !important;

        th {
            padding: 0 !important;
            height: 40px;
            line-height: 40px;
        }

        td {
            padding: 0 !important;
            height: 40px;
            line-height: 40px;
        }
    }

    /deep/ .el-table .cell span {
        color: #333;
    }

    /deep/ .el-table .cell {
        color: #333;
        /*text-align: center;*/
    }

    .page {
        text-align: center;
    }

    .btn_a {
        display: inline-block;
        text-decoration: none;
        width: 52px;
        height: 26px;
        color: #4BC2FF;
        border-radius: 2px;
        border: 1px solid rgba(75, 194, 255, 1);
    }

    /*隐藏掉全选*/
    /*/deep/ .el-table__header-wrapper .el-checkbox { //找到表头那一行，然后把里面的复选框隐藏掉*/
    /*    display: none*/
    /*}*/

    img.td-icon {
        width: 16px;
        margin-bottom: -3px;
        margin-right: 3px;
    }

    /deep/ .el-table td:last-child {
        text-align: center;
    }

    /deep/ .el-header {
        padding: 0px;
        /*margin-bottom: 20px;*/
    }

    /deep/ .el-main {
        padding: 2px 0px;
    }

    /deep/ .el-container.is-vertical {
        height: 100% !important;
    }

    .upDate {
        display: none;
    }

</style>
