<template>
    <el-container style="min-height: 725px">
        <el-header style="height: auto;margin-bottom: 20px" :class="{showMessage:tabIndex ==1 || tabIndex==2}">
            <!-- 工程基本信息 -->
            <div class="m_top">
                <projectInfo ref="projectInfoRef" @projectInited="afterProjectInited" @remark="getRemark"></projectInfo>
            </div>
        </el-header>
        <el-main>
            <el-row class="top_row" :style="{height : (tabIndex ==1 || tabIndex == 2) ? '100%' : '66%'}">
                <el-col :span="24" style="height: 100%">
                    <div class="tab">
                        <ProjectSwitch :projectInited="projectInited" @changeTableIndex="changeTableIndex"
                                       :projectFileListUrl="url"
                                       :projectFileListUrl2="url2"></ProjectSwitch>
                    </div>
                </el-col>
            </el-row>
            <el-row style="height: 4%" :class="{showMessage:tabIndex ==1 || tabIndex==2}">
                <el-col></el-col>
            </el-row>
            <el-row class="top_row_c" :class="{showMessage:tabIndex ==1 || tabIndex==2}">
                <el-col style="height: 100%">
                    <div class="b_bottom">
                        <el-row  type="flex" align="middle">
                            <el-col :span="20">
                                <p class="m_title">审核意见</p>
                                <img src="@/assets/images/jx.png" alt class="ic"/>
                            </el-col>
                            <el-col :span="4">
                                <div class="p_history">
                                    <img src="@/assets/images/audit_icon.png" alt="">
                                    <i class="history" @click="openReviewHistory">审核历史</i>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row style="height: calc(100% - 47px)">
                            <el-col :span="24" style="height: 60%">
                                <el-input type="textarea" v-model="remark" :autosize="false"
                                          placeholder="请输入审核意见"></el-input>
                            </el-col>
                            <el-col style="height: 40%">
                                <div class="an">
                                    <span @click="reject">驳回</span>
                                    <span @click="pass">通过</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 审核历史-->
                    <el-dialog title="审核历史" :visible.sync="dialogVisible" width="40%" class="abow_dialog">
                        <TimeLine ref="reviewHistoryRef"></TimeLine>
                    </el-dialog>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    // 工程基本信息
    import ProjectInfo from '@/components/audit/detail/projectInfo.vue'

    import ProjectSwitch from '@/components/audit/detail/projectSwitch'

    import ReviewHistory from '@/components/audit/detail/reviewHistory'

    import TimeLine from '@/components/common/timeline/index'

    export default {
        components: {
            ProjectInfo,
            ProjectSwitch,
            // ReviewHistory,
            TimeLine
        },
        data() {
            return {
                tabIndex: 0,
                projectInited: false,
                remark: '',
                url: '/data/getCatalogModelRefFile',
                url2: '/data/getProjectFileList',
                listHeight: 235,
                dialogVisible: false
            }
        },
        methods: {
            changeTableIndex(tab) {
                this.tabIndex = tab.index;
            },
            afterProjectInited() {
                this.projectInited = true;
            },
            reject() {
                this.$http.post('/transfer/updateApplications/' + this.$store.state.audit.applicationId, {
                    stateName: 'DISMISSED',
                    remark: this.remark
                }, '驳回成功').then(data => {
                    this.$router.push('/Accept');
                })
            },
            getRemark(val) {
                this.remark = val
            },
            pass() {
                this.$http.post('/transfer/updateApplications/' + this.$store.state.audit.applicationId, {
                    stateName: 'AUDITED',
                    remark: this.remark
                }, '成功').then(data => {
                    this.$router.push('/Accept');
                })
            },
            openReviewHistory() {
                this.dialogVisible = true;
            }
        }
    };

</script>
<style lang="less" scoped>
    .top_row {
        /*height: 66%;*/
        margin: 0px !important;
    }

    .top_row_c {
        height: 30%;
    }

    /deep/ .el-header {
        padding: 0px;
    }

    /deep/ .el-main {
        padding: 3px 0px;
    }

    .ic {
        position: absolute;
        /*height: 49px;*/
        top: 0;
    }

    .m_top {
        width: 100%;
        height: 140px;
        background-color: #fff;
        position: relative;
    }

    .form {
        padding-top: 20px;
        box-sizing: border-box;
    }

    .b_bottom {
        height: 100%;
        background-color: #fff;

        p {
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            font-size: 18px;
            color: #32375a;
        }
    }

    .p_history {
        /*height: 50px;*/
        /*line-height: 50px;*/
        padding-right: 30px;
        text-align: right;

        .history {
            margin-left: 4px;
            font-size: 16px;
            font-weight: 400;
            color: #05285E;
            cursor: pointer;
        }

        img {
            vertical-align: middle;
            height: 14px;
        }
    }

    .an {
        position: absolute;
        left: 50%;
        bottom: 5px;
        transform: translateX(-50%);
    }

    .el-tabs--border-card {
        height: 100%;
        border: none;
    }

    /deep/ .el-tabs__item {
        font-size: 18px;
    }

    .tj {
        position: absolute;
        bottom: 0;
        margin-left: 200px;
    }

    .el-button.el-button {
        margin-left: 35px;
    }

    .divBox {
        width: 100%;
        display: flex;
        height: 785px;
    }

    .div2 {
        width: 250px;

        p {
            width: 100%;
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            background-color: #cccccc;
        }
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        width: 200px;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        color: #fff;
        background: #1f2559;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #ccc;
    }

    /deep/ .el-tabs__item {
        font-size: 16px;
    }

    /deep/ .el-tabs--border-card > .el-tabs__content {
        padding: 0px;
    }

    /deep/ .el-submenu .el-submenu__title {
        background-color: #fff !important;
    }

    /deep/ .el-menu--inline {
        background-color: #fff !important;
    }

    .el-icon-my-export {
        background: url(/officeHouse/resources/images/export.png) center no-repeat;
        background-size: cover;
    }

    .btn {
        width: 96%;
        margin: auto;
        border: 1px solid rgba(235, 238, 247, 1);
        height: calc(100% - 80px);
    }

    /deep/ .el-table .warning-row {
        background: #f8f9fd;
    }

    /deep/ .el-table .success-row {
        background: #fff;
    }

    .inp {
        width: 96%;
        margin: auto;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header {
        background-color: #fff;
    }

    /deep/ .el-textarea {
        height: 100%;
    }

    /deep/ .el-textarea__inner {
        background-color: #f8fafb;
        border-radius: 0px !important;
        resize: none;
        height: 100%;
        width: 96%;
        margin: auto;
    }


    .an span:nth-child(1) {
        display: block;
        width: 200px;
        height: 40px;
        border: 1px solid #05285e;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #05285e;
        float: left;
        margin-right: 20px;
        cursor: pointer;
    }

    .an span:nth-child(2) {
        display: block;
        width: 200px;
        height: 40px;
        border: 1px solid #05285e;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fff;
        background-color: #05285e;
        float: left;
        cursor: pointer;
    }

    // /deep/ .el-tree-node {
    //     margin-top: 10px;
    // }

    /deep/ .el-tabs--border-card > .el-tabs__header {
        border: none;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #fff;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item {
        font-size: 18px;
        font-family: Microsoft YaHei;
        color: rgba(255, 255, 255, 0.3);
    }

    /deep/ .el-tabs--border-card > .el-tabs__header {
        border: none;
    }

    #pane-0 {
        border-top: 4px solid #4BC2FF;
    }

    #pane-1 {
        border-top: 4px solid #4BC2FF;
    }

    #pane-2 {
        border-top: 4px solid #4BC2FF;
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
        color: #fff;
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

    /deep/ .is-active {
        z-index: 2 !important;
    }

    /deep/ .el-table td,
    .el-table th.is-leaf {
        border: none;
    }

    /deep/ .el-table__row > td {
        border: none;
    }

    /deep/ .el-table::before {
        //去掉最下面的那一条线
        height: 0px;
    }

    /deep/ .el-menu {
        background: none;
    }


    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #fff;
    }

    .ul_listr li:hover {
        background-color: #ebeef7;
    }

    .ul_listr li:nth-child(1) {
        background: none;
    }

    .showMessage {
        display: none;
    }

    .tabs {
        margin-top: 0;
    }

    .tab {
        height: 100%;
    }

    /deep/ .el-dialog {
        height: 517px;
    }

    /deep/ .el-dialog__body {
        height: 77%;
        overflow-y: auto;
    }

    .abow_dialog {
        display: flex;
        justify-content: center;
        align-items: Center;
        overflow: hidden;
    }

    // /deep/ .el-container.is-vertical {
    //     /*height: 99%!important;*/
    // }
</style>
