<!-- 主页使用 -->
<template>
    <ApplicationList4Main :stateNames="stateNames" :columns="columns" :tableHeight="tableHeight">
    </ApplicationList4Main>
</template>
<script>
    import ApplicationList4Main from './ApplicationList4Main'
    export default {
        components: {
            ApplicationList4Main
        },
        data() {
            return {
                tableHeight:'100%',
                stateNames: ['DISMISSED'],
                columns: [{
                        label: '申请单号',
                        prop: 'authRequestNo',
                        type: 'a',
                        href: item => '/submit/' + item.id,
                        length: 25
                    },
                    {
                        label: '工程名称',
                        prop: 'projectName',
                        align:'center'
                    },
                    {
                        label: '说明',
                        type: 'method',
                        align:'center',
                        method: item => {
                            return item.logList.filter(log => log.state === 6)[0].remark
                        }
                    }
                ],
            }
        }
    }

</script>
