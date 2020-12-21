<!-- 主页使用 -->
<template>
    <ApplicationList4Main :stateNames="stateNames" :columns="columns">
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
                stateNames: ['UNCOMMITTED', 'DISMISSED'],
                columns: [{
                        label: '申请单号',
                        prop: 'authRequestNo',
                        type: 'a',
                        href: item => '/submit/' + item.id,
                        length: 25,
                        align:'left'
                    },
                    {
                        label: '工程名称',
                        prop: 'projectName',
                        align:'center'
                    },
                    {
                        label: '工程类型',
                        prop: 'projectType',
                        align:'center'
                    },
                    {
                        label: '创建时间',
                        prop: 'createdAt',
                        type: 'date',
                        align:'center'
                        // pattern: 'yyyy-M-dd'
                    }
                ],
            }
        }
    }

</script>
