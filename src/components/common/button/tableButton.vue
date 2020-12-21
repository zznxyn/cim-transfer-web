<template>
    <el-button @click="$emit('click')">
        <a>
            <slot></slot>
        </a>
    </el-button>
</template>
<script>
    export default {}

</script>
<style lang="less" scoped>
    .el-button:focus,
    .el-button {
        border: 1px solid @color_blue;
        margin-left: 2px;
        margin-right: 2px;
        .size_mini()
    }

    .el-button:focus,
    .el-button span {
        color: @color_blue;
    }

    .el-button:focus,
    .el-button span a {
        text-decoration: none;
        color: @color_blue;
    }
</style>
