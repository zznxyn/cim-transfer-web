<template>
        <el-tabs type="border-card" @tab-click="handleClick">
            <!-- 01 工程资料 -->
            <el-tab-pane>
                <span slot="label">工程资料</span>
                <span slot="label">01</span>
                <ProjectFile v-if="projectInited" :fileListUrl="projectFileListUrl2" :tabListHeight="projectFileListHeight"></ProjectFile>
            </el-tab-pane>
            <!-- 02 BIM关联文档 -->
            <el-tab-pane>
                <span slot="label">BIM关联文档</span>
                <span slot="label">02</span>
                <BimModelFileRef v-if="projectInited" :fileListUrl="projectFileListUrl"></BimModelFileRef>
            </el-tab-pane>
            <!-- 03 三维视图 -->
            <el-tab-pane>
                <span slot="label">三维视图</span>
                <span slot="label">03</span>
                <ProjectModelView ref="modelView" v-if="projectInited"></ProjectModelView>
            </el-tab-pane>
        </el-tabs>
</template>

<script>
    // 01 工程资料
    import ProjectFile from '@/components/audit/detail/projectFile.vue'
    // 02 BIM关联文档
    import BimModelFileRef from '@/components/audit/detail/bimModelFileRef.vue'
    // 03 三维视图
    import ProjectModelView from '@/components/audit/detail/auditModelView.vue'

    export default {
        components: {
            ProjectFile,
            BimModelFileRef,
            ProjectModelView,
        },
        props: {
            projectInited: {
                type: Boolean,
                default: false
            },
            projectFileListUrl: {
                type:String,
                default: ''
            },
            projectFileListUrl2: {
                type:String,
                default: ''
            },
        //    列表高度
            projectFileListHeight: {
                type: String
            }
        },
        methods: {
            handleClick(tab) {
                this.$emit('changeTableIndex',tab)
                if (tab.index === '2') {
                    this.$nextTick(() => {
                        this.$refs.modelView.init3D();
                        this.$refs.modelView.addModel();
                    });
                    this.$refs.modelView.getModelList();
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-tabs--border-card {
        height: 100%;
        border: none;
    }

    /deep/ .el-tabs__item {
        font-size: 18px;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #fff!important;
    }

    /deep/ .el-tabs__item {
        font-size: 16px;
    }

    /deep/ .el-tabs--border-card > .el-tabs__content {
        padding: 0px;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header {
        background-color: #fff;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header {
        border: none;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #fff;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item {
        font-size: 18px;
        font-family: PingFang SC;
        color: rgba(255, 255, 255, 0.3);
    }

    /deep/ .el-tabs--border-card > .el-tabs__header {
        border: none;
    }

    #pane-0 {
        border-top: 4px solid #4BC2FF;
        /*height: 100%;*/
        height: calc(100% - 4px);
    }

    #pane-1 {
        border-top: 4px solid #4BC2FF;
        height: calc(100% - 4px);
        /*height: 100%;*/
    }

    #pane-2 {
        border-top: 4px solid #4BC2FF;
        height: 100%;
    }

    /deep/ #tab-0 {
        width: 252px;
        height: 50px;
        border-radius: 20px 20px 0px 0px;
        border-right: none;
        z-index: 1;
        background-color: #05285E;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        color: #fff!important;
        background: #4BC2FF !important;
        width: 200px;
    }

    /deep/ #tab-0 span:nth-child(1) {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
    }

    /deep/ #tab-0 span:nth-child(2) {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding-left: 95px;
        box-sizing: border-box;
    }

    /deep/ #tab-1 {
        //width: 263px;
        width: 250px;
        height: 50px;
        border-radius: 20px 20px 0px 0px;
        //position: absolute;
        //left: 225px;
        border-left: none;
        background-color: #05285E;
    }

    /deep/ #tab-1 span:nth-child(1) {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding-left: 30px;
    }

    /deep/ #tab-1 span:nth-child(2) {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding-left: 30px;
    }

    /deep/ #tab-2 {
        //width: 263px;
        width: 250px;
        height: 50px;
        border-radius: 20px 20px 0px 0px;
        //position: absolute;
        //left: 225px;
        border-left: none;
        background-color: #05285E;
    }

    /deep/ #tab-2 span:nth-child(1) {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding-left: 30px;
    }

    /deep/ #tab-2 span:nth-child(2) {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        padding-left: 30px;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #fff!important;
    }

    /deep/ .el-tabs__content {
        height: calc(100% - 46px)!important;
    }

</style>
