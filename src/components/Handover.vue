<template>
    <div class="container">
        <!--模型-->
        <ProjectModel></ProjectModel>
        <!--头部-->
        <top></top>
        <!--左边区域-->
        <div class="leftMain">
            <Statistic></Statistic>
        </div>
        <!--右边区域-->
        <div class="rightMain">
            <!--工具条-->
            <Toolbar class="toolbar"></Toolbar>
            <!-- 工程资料树-->
            <ProjectData></ProjectData>
        </div>
        <!--文件预览-->
        <FilePreview></FilePreview>
    </div>
</template>

<script>
    import top from "@/components/overview/top";
    import ProjectModel from "@/components/overview/projectModel";
    import modelTree from "../assets/js/modelTree.json";
    import Statistic from "@/components/overview/statistic";
    import ProjectData from "@/components/overview/projectData";
    // 工具条
    import Toolbar from "@/components/overview/toolbar";
    import FilePreview from "@/components/overview/filePreview";

    export default {
        components: {
            ProjectModel,
            top,
            Statistic,
            ProjectData,
            Toolbar,
            FilePreview
        },
        data() {
            return {
                data: modelTree,
                defaultProps: {
                    children: "children",
                    label: "text"
                },
            };
        }
    };

</script>

<style lang="less" scoped>
    .leftMain {
        width: 360px;
        margin-left: 30px;
        float: left;
        position: relative;
        top: 69px;
    }

    .rightMain {
        position: relative;
        width: 360px;
        float: right;
        margin-right: 24px;
        top: 69px;
        pointer-events: none;

        .toolbar {
            margin-bottom: 10px;
        }
    }

    .container {
        width: 100%;
        height: 100%;
        min-width: 1920px;
        min-height: 1080px;
        background: url(../assets/images/back.png);
        background-size: 100% 100%;
        position: absolute;
        overflow: hidden;
    }
</style>
