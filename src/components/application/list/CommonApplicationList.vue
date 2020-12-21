<template>
    <CimTable :url="url" :showIndex="true" :columns="columns" :params="params" :searchParams="searchParams" :tableHeight="tableHeight" :pagination="pagination">
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
                tableHeight:'100%',
                url: '/transfer/applications',
                params: {
                    stateNames: [],
                },
                searchParams: [],
                columns: [{
                        label: '申请单号',
                        prop: 'authRequestNo',
                        align:'left'
                    },
                    {
                        label: '申请单位',
                        prop: 'enterpriseName',
                        align:'center'
                    },
                    {
                        label: '工程名称',
                        prop: 'projectName',
                        align:'center'
                    },
                    {
                        label: '申请人',
                        prop: 'creatorName',
                        align:'center'
                    },
                    {
                        label: '创建时间',
                        prop: 'createdAt',
                        type: 'date',
                        align:'center'
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
