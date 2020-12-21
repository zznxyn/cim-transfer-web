<template>
    <CommonExamineApplicationList :stateNames="stateNames" :operColumns="operColumns"></CommonExamineApplicationList>
</template>
<script>
    import CommonExamineApplicationList from '@/components/application/list/CommonExamineApplicationList'
    export default {
        components: {
            CommonExamineApplicationList
        },
        data() {
            return {
                stateNames: ['PENDINGAUDIT'],
                operColumns: [{
                    type: 'link',
                    linkTo: item => '/Accept/' + item.id,
                    linkName: '校核'
                }],
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
