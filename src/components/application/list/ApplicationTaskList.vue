<template>
    <CimTable :url="url" :columns="columns" :params="params" :searchParams="searchParams" :pagination="pagination">
    </CimTable>
</template>
<script>
    import CimTable from '../../common/table'
    export default {
        // name: 'CommonApplicationList',
        components: {
            CimTable
        },
        props: {
            stateNames: {
                type: Array,
                default () {
                    return []
                }
            },
            operColumns: {
                type: Array,
                default () {
                    return []
                }
            },
            pagination: {
                type: Boolean,
                default: true
            },
            searchProps: {
                type: Array,
                default () {
                    return [{
                            label: '申请单号',
                            placeholder: '请输入申请单号',
                            prop: 'authRequestNo'
                        },
                        {
                            label: '工程名称',
                            placeholder: '请输入工程名称',
                            prop: 'projectName'
                        },

                    ]
                }
            }
        },
        data() {
            return {
                url: '/transfer/applications',
                params: {
                    stateNames: [],
                },
                searchParams: [],
                columns: [{
                        label: '申请单号',
                        prop: 'authRequestNo',
                    },
                    {
                        label: '工程名称',
                        prop: 'projectName'
                    },
                    /*  {
                        label: '工程类型',
                        prop: 'projectName'
                    }, */
                    {
                        label: '审核意见',
                        type: 'method',
                        method: item => {
                            return item.logList.filter(log => log.state === 6)[0].remark
                        }
                    },
                    {
                        label: '审核日期',
                        type: 'method',
                        method: item => {
                            return new Date(item.logList.filter(log => log.state === 6)[0].operatedAt).format('yyyy-MM-dd')
                        }
                    },
                    {
                        label: '创建时间',
                        prop: 'createdAt',
                        type: 'date'
                    },
                ],
            }
        },
        created() {
            this.params.stateNames = this.stateNames
            this.columns = this.columns.concat(this.operColumns)
            this.searchParams = this.searchProps
        }
    }

</script>
