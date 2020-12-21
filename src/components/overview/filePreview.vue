<template>
    <div class="file-preview" :class="{ show : showPreview }">
        <div class="file_mask"></div>
        <el-image-viewer v-if="showImage" :on-close="closeFilePreview" :url-list="[fileUrl]"/>
        <div class="dialog"  v-if="showPDF" :class="{ show : showPDF }">
            <img src="../../assets/images/close_pdf.png" class="file_close" @click="closeFilePreview" alt="">
            <span class="iframe_title">{{fileName}}</span>
            <iframe :src="fileUrl" class="iframe" frameborder="0"></iframe>
        </div>
    </div>
</template>

<script>
    import ElImageViewer from "element-ui/packages/image/src/image-viewer";

    export default {
        components: {
            ElImageViewer
        },
        data() {
            return {
                showPreview: false,
                showImage: false,
                showPDF: false,
                fileUrl: "",
                fileName: "",
            }
        },
        created() {
            Hook.add("ShowFilePreview", (file) => {
                this.showFilePreview(file);
            }, "FilePreview");

            Hook.add("CloseFilePreview", () => {
                this.closeFilePreview();
            }, "FilePreview");
        },
        destroyed() {
            Hook.removeByGroup("FilePreview");
        },
        methods: {
            showFilePreview(file) {
                let fileType = matchType(file.name);
                this.fileUrl = gatewayUrl + "/file/preview/" + file.fileId;
                switch (fileType) {
                    case "image":
                        this.showPreview = true;
                        this.showImage = true;
                        break;
                    case "pdf":
                        this.showPreview = true;
                        this.showPDF = true;
                        this.fileName = file.name;
                        break;
                    default:
                        break;
                }
            },
            closeFilePreview() {
                this.showPreview = false;
                this.showImage = false;
                this.showPDF = false;
            },
        }
    }
</script>

<style lang="less" scoped>
    /deep/.el-image-viewer__mask{
        display: none;
    }
    .show {
        display: block !important;
    }

    .file-preview {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        overflow: hidden;
        z-index: 100;
    }

    .file_mask{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: .5;
        background: #000;
    }

    .dialog {
        width: 960px;
        height: 873px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: rgba(5, 40, 94, 0.7);
        display: none;
    }

    .file_close {
        position: absolute;
        right: 30px;
        top: 20px;
        cursor: pointer;
    }

    .iframe {
        width: 900px;
        height: 776px;
        margin-top: 68px;
        margin-left: 30px;
        border: none;
    }

    .iframe_title {
        position: absolute;
        left: 50%;
        top: 27px;
        transform: translateX(-50%);
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(254, 254, 254, 1);
    }

</style>
