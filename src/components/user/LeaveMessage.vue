<template>
    <div style="height: 100%;background-color: #FFFFFF">
        <div class="ic"></div>
        <ApplicationMessageList></ApplicationMessageList>
    </div>
</template>
<script>
    import ApplicationMessageList from '@/components/message/applicationMessage/list/ApplicationMessageList'

    export default {
        components: {
            ApplicationMessageList
        }
    }

</script>
<style lang="less" scoped>
    .ic {
        height: 20px;
    }

    /deep/ .el-container.is-vertical {
        height: 100%!important;
    }
</style>
