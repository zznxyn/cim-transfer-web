<template>
    <el-container>
        <el-header style="height: auto">
            <span class="p_title">欢迎进入智慧城市信息模型平台数字化移交系统</span>
        </el-header>
        <el-main>
            <el-row :gutter="20" class="top_row">
                <el-col :span="12" style="height: 100%">
                    <Nav title="待提交申请单" :icon="pendingSubmitIcon" href2all="/submit"></Nav>
                    <el-row class="item_col">
                        <el-col :span="24" style="height: 100%">
                            <PendingSubmitApplications4Main></PendingSubmitApplications4Main>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12" style="height: 100%">
                    <Nav title="申请单留言" :icon="applicationMessageIcon" href2all="/leavemessage"></Nav>
                    <el-row class="item_col">
                        <el-col :span="24" style="height: 100%">
                            <ApplicationMessageList4Main></ApplicationMessageList4Main>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="middle_row">
                <el-col :span="24"></el-col>
            </el-row>
            <el-row :gutter="20" class="top_row">
                <el-col :span="12" style="height: 100%">
                    <Nav title="通知公告" :icon="noticeIcon" href2all="/notice"></Nav>
                    <el-row class="item_col">
                        <el-col :span="24" style="height: 100%">
                            <NoticeList4Main></NoticeList4Main>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="12" style="height: 100%">
                    <Nav title="需补充资料" :icon="dismissedIcon" href2all="/task"></Nav>
                    <el-row class="item_col">
                        <el-col :span="24" style="height: 100%">
                            <DismissedApplications4Main></DismissedApplications4Main>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
<!--    <div style="height: 100%">-->
<!--        <el-row type="flex" align="middle">-->
<!--            <el-col :span="24">-->
<!--                <div class="p_title">-->
<!--&lt;!&ndash;                    <span>欢迎进入重庆市城市信息模型平台数字化移交系统</span>&ndash;&gt;-->
<!--                </div>-->
<!--            </el-col>-->
<!--        </el-row>-->
<!--    </div>-->
</template>
<script>
    import PendingSubmitApplications4Main from '@/components/application/list/PendingSubmit4Main'
    import DismissedApplications4Main from '@/components/application/list/Dismissed4Main'
    import NoticeList4Main from '@/components/message/notice/list/NoticeList4Main'
    import ApplicationMessageList4Main from '@/components/message/applicationMessage/list/ApplicationMessageList4Main'
    import Nav from '@/components/main/nav'

    export default {
        components: {
            PendingSubmitApplications4Main,
            DismissedApplications4Main,
            NoticeList4Main,
            ApplicationMessageList4Main,
            Nav
        },
        data() {
            return {
                pendingSubmitIcon: require('../../assets/images/icon.png'),
                applicationMessageIcon: require('../../assets/images/xx.png'),
                noticeIcon: require('../../assets/images/lb.png'),
                dismissedIcon: require('../../assets/images/xzz.png')
            }
        },
        methods: {},
        created() {
        }
    }

</script>
<style scoped>
    .p_title {
        margin-bottom: 20px;
        font-size: 16px;
    }

    .p_title span {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(50, 55, 90, 1);
    }

    .top_row {
        height: 48%;
        margin: 0px!important;
    }

    .middle_row {
        height: 4%;
    }

    .top_row:last-child {
        margin-bottom: 0px;
    }

    .item_col {
        height: calc(100% - 50px);
        background-color: #fff;
    }

    /deep/ .el-header {
        padding: 0px;
        margin-bottom: 20px;
    }

    /deep/ .el-main {
        padding: 2px 0px;
    }

    /deep/ .el-container.is-vertical{
        height: 100%!important;
    }
</style>
