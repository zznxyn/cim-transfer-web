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
                stateNames: ['AUDITED', 'DISMISSED'],
                operColumns: [{
                    type: 'link',
                    linkTo: item => '/completedList/' + item.id ,
                    linkName: '查看'
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
