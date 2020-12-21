<template>
    <div class="container">
        <div id="3DContainer"></div>
    </div>
</template>

<script>
    export default {
        props: {
            config: {
                type: Object,
                default: () => {}
            }
        },
        created() {
            window.bimMap = new BimMap('3DContainer');
        },
        destroyed() {
            bimMap.destroy();
            window.bimMap = new BimMap('3DContainer');
        },
    }
</script>

<style lang="less" scoped>
    @import url(../../../assets/css/widgets.css);

    .container {
        width: 100%;
        height: 100%;
        overflow: hidden;
        div {
            display: block;
            width: 100%;
            height: 100%;
        }
    }


</style>
