<template>
    <el-scrollbar style="height:100%">
        <TimeLine></TimeLine>
    </el-scrollbar>
</template>

<script>
    import TimeLine from '@/components/common/timeline/index'

    export default {
        name: "reviewHistory",
        components: {
            TimeLine
        },
        data() {
            return {}
        }
    }
</script>

<style lang="less" scoped>

</style>
