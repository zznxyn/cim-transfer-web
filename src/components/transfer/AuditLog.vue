<template>
    <CimTable :url="url" :columns="columns" :params="params"  :searchParams="searchParams" :tableHeight="tableHeight"
        :pagination="true">
    </CimTable>
</template>
<script>
    import CimTable from '@/components/common/table/index'
    export default {
        components: {
            CimTable
        },
        data() {
            return {
                tableHeight:'100%',
                url: '/transfer/application/logs',
                params:{
                    authRequestNo:'',
                    enterpriseName:'',
                    limit:'',
                    page:'',
                    projectName:''
                },
                searchParams: [{
                        label: '申请单号',
                        placeholder: '请输入申请单号',
                        prop: 'authRequestNo'
                    }, {
                        label: '申请单位',
                        placeholder: '请输入申请单位',
                        prop: 'enterpriseName'
                    },
                    {
                        label: '工程名称',
                        placeholder: '请输入工程名称',
                        prop: 'projectName'
                    }
                ],
                columns: [{
                        label: '申请单号',
                        prop: 'authRequestNo',
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
                        label: '审核人',
                        prop: 'operatorName',
                        align:'center'
                    },
                    {
                        label: '审核结果',
                        type: 'method',
                        align:'center',
                        method:item => {
                            if (item.state == 5) {
                                return '通过'
                            } else if (item.state ==6) {
                                return '驳回'
                            }
                        }
                    },
                    {
                        label: '审核时间',
                        prop: 'operatedAt',
                        type: 'date',
                        align:'center'
                    }, {
                        label: '审核意见',
                        prop:'remark',
                        align:'center'
                    }
                ]
            }
        },
    }

</script>
<style lang="less" scoped>
    /deep/ .el-col-8 {
        width: auto;
    }

    /deep/ .el-col-8:nth-child(4) {
        padding-left: 30px;
    }

</style>
