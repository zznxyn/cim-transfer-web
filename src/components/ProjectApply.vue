<template>
    <el-container style="min-height: 725px">
        <el-header style="height:auto;margin-bottom: 20px" :class="{ showMessage:tabIndex ==1 || tabIndex==2}">
            <!-- 工程基本信息 -->
            <div class="m_top">
                <ProjectDetail :isCreate="isCreate" @projectInited="afterProjectInited" ref="projectDetailRef">
                </ProjectDetail>
            </div>
        </el-header>
        <el-main>
            <div class="tab" :class="{ tabs :tabIndex ==1 || tabIndex==2 }">
                <el-tabs type="border-card" @tab-click="handleClick">
                    <!-- 工程资料01 -->
                    <el-tab-pane>
                        <span slot="label">工程资料</span>
                        <span slot="label">01</span>
                        <el-row v-if="!projectInited" class="blank_row"></el-row>
                        <ProjectFile v-if="projectInited"></ProjectFile>
                        <el-row class="buttonRow">
                            <el-col style="text-align: center">
                                <FormButton type="primary" size="big" @click.once="submitReview">提交审核</FormButton>
                                <FormButton @click="preservation" size="big">保存</FormButton>
                            </el-col>
                        </el-row>
                    </el-tab-pane>
                    <!-- BIM关联文档02 -->
                    <el-tab-pane>
                        <span slot="label">BIM关联文档</span>
                        <span slot="label">02</span>
                        <BimModelFileRel v-if="projectInited"></BimModelFileRel>
                    </el-tab-pane>
                    <!-- 工程视图03 -->
                    <el-tab-pane>
                        <span slot="label">工程视图</span>
                        <span slot="label">03</span>
                        <ProjectModelView ref="modelView" v-if="projectInited"></ProjectModelView>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    import BimModelFileRel from '@/components/application/detail/BimModelFileRel'
    import ProjectDetail from '@/components/application/detail/ProjectDetail'
    import ProjectFile from '@/components/application/detail/ProjectFile'
    import ProjectModelView from '@/components/application/detail/ProjectModelView'

    export default {
        components: {
            BimModelFileRel,
            ProjectDetail,
            ProjectFile,
            ProjectModelView
        },
        data() {
            return {
                isCreate: !this.$route.params.id,
                projectInited: false,
                // modelAssociation: ['全部', '地理信息'],
                // application: {},
                tabIndex: 0,
            }
        },
        methods: {
            afterProjectInited() {
                this.projectInited = true
            },

            // 保存基本信息
            preservation() {
                this.$http.post('/transfer/updateApplications/' + this.$store.state.application.applicationId, {
                    stateName: 'UNCOMMITTED'
                }, '保存成功')
            },
            // 提交审核
            submitReview() {
                const applicationObj = this.$refs.projectDetailRef.application
                // for (let key in applicationObj) {
                //     if (applicationObj[key] == null) {
                //         console.log('applicationObj[key]',applicationObj[key])
                //         this.$message.warning('工程基本信息不能为空')
                //         return false
                //     }
                // }
                this.$http.post('/transfer/updateApplications/' + this.$store.state.application.applicationId, {
                    stateName: 'PENDINGAUDIT'
                }, '提交成功').then(data => {
                    if (data) {
                        this.$router.push('/submitAudit')
                    }
                })
            },
            handleClick(tab) {
                this.tabIndex = tab.index;
                if (tab.index === '2') {
                    this.$nextTick(() => {
                        this.$refs.modelView.init3D();
                        this.$refs.modelView.addModel();
                        this.$refs.modelView.getModelList();
                    });
                    this.$refs.modelView.isShow = false;
                    this.$refs.modelView.tableArr = []
                }
            },
        }
    }

</script>
<style lang="less" scoped>

    /deep/ .el-header {
        padding: 0px;
    }

    /deep/ .el-main {
        padding: 2px 0px;
    }

    .blank_row {
        height: 525px;
    }

    /deep/ .el-tabs__content {
        height: calc(100% - 46px) !important;
    }

    .buttonRow {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        margin: 15px 0;
    }

    .fsize {
        font-size: 12px;
        padding-right: 5px;

    }

    .m_top {
        width: 100%;
        background-color: #fff;
        position: relative;
        height: 171px;

        span {
            position: absolute;
            left: 30px;
            top: 17px;
            box-sizing: border-box;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 600;
            color: #05285E;
        }
    }

    .form {
        margin-top: 10px;
    }

    .tab {
        height: 100%;
        /*margin-top: 20px;*/
        /*flex: 1;*/
    }

    .el-tabs--border-card {
        height: 100%;
        border: none;
        box-shadow: 0 0 0 0;
    }

    /deep/ .el-tabs__item {
        font-size: 18px;
    }

    /deep/ .el-tabs__item {
        width: 150px;
        ///text-align: center;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #ccc;
    }


    /deep/ .el-submenu .el-submenu__title {
        background-color: #fff !important;
    }

    /deep/ .el-menu--inline {
        background-color: #fff !important;
    }

    .tj {
        position: absolute;
        bottom: 0;
        margin-left: 200px;
    }

    .divBox {
        width: 100%;
        display: flex;
        height: 350px;
    }

    .center {
        flex: 1;
        width: 96%;
    }

    .div2 {
        width: 250px;

        p {
            width: 100%;
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            background-color: #CCCCCC;
        }
    }

    .gl {
        position: absolute;
        bottom: 0;
        margin-left: 200px;

        .el-button {
            width: 100px;
        }
    }

    /deep/ .el-tabs--border-card > .el-tabs__header {
        background-color: #fff;
    }

    /deep/ .el-input--medium .el-input__inner {
        background-color: #F9F8FF;
        border-radius: 0px;
    }

    /deep/ .el-tabs--border-card > .el-tabs__content {
        padding: 0;
    }

    .el-icon-my-export {
        background: url(../assets/images/sc.png) center no-repeat;
        background-size: cover;
    }

    .b_bottom {
        position: relative;
        width: 100%;
        height: 240px;
        background-color: #fff;

        //margin-top: 20px;
        p {
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            font-size: 18px;
            color: #32375A;
            font-family: Microsoft YaHei;
        }
    }

    .inp {
        width: 96%;
        margin: auto;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header {
        background-color: #fff;
    }

    /deep/ .el-textarea {
        margin-top: 10px !important;
    }

    /deep/ .el-textarea__inner {
        height: 100px;
        background-color: #F8FAFB;
    }

    .an span:nth-child(1) {
        display: block;
        width: 200px;
        height: 40px;
        border: 1px solid #05285E;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #05285E;
        float: left;
        margin-right: 20px;
        cursor: pointer;
    }

    .an span:nth-child(2) {
        display: block;
        width: 200px;
        height: 40px;
        border: 1px solid #05285E;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fff;
        background-color: #05285E;
        float: left;
        cursor: pointer;
    }

    .bt {
        margin-top: 20px;
        margin-left: -10px;
        display: flex;
    }

    .an {
        position: absolute;
        left: 50%;
        bottom: 30px;
        width: 500px;
        margin-left: -115px;
        margin-top: 20px;
    }

    .an span:nth-child(1) {
        display: block;
        width: 200px;
        height: 40px;
        border: 1px solid #05285E;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #05285E;
        float: left;
        margin-right: 20px;
    }

    .an span:nth-child(2) {
        display: block;
        width: 200px;
        height: 40px;
        border: 1px solid #05285E;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #fff;
        background-color: #05285E;
        float: left;
    }

    .divBox {
        width: 100%;
        display: flex;
        height: 540px;
    }

    .div1 {
        width: 250px;
        border: 1px solid rgba(107, 192, 249, 1);
        padding-top: 3px;
        height: 98%;

        p {
            width: 100%;
            height: 40px;
            line-height: 40px;
            background-color: #4BC2FF;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #fff;
            text-align: center;
        }
    }

    .center {
        flex: 1;
    }

    .div2 {
        width: 250px;

        p {
            width: 100%;
            height: 50px;
            line-height: 50px;
            padding-left: 20px;
            background-color: #CCCCCC;
        }
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        color: #fff;
        background: #4BC2FF !important;
        width: 200px;
        //text-align: center;
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
        //border-bottom: 4px solid #05285E;
        border: none;
    }

    #pane-0 {
        border-top: 4px solid #4BC2FF;
        height: 100%;
    }

    #pane-1 {
        border-top: 4px solid #4BC2FF;
        height: 100%;
    }

    #pane-2 {
        border-top: 4px solid #4BC2FF;
        height: 100%;
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
        background: #F8F9FD;
    }

    /deep/ .el-table .success-row {
        background: #fff;
    }

    /deep/ .tableBox {
        th {
            padding: 0 !important;
            height: 40px;
            line-height: 40px;
        }

        td {
            padding: 0 !important;
            height: 40px;
            line-height: 40px;
        }
    }

    /deep/ .el-table .warning-row {
        background: #F8F9FD;
    }

    /deep/ .el-table .success-row {
        background: #fff;
    }

    .right_ce {
        width: 96%;
        margin: auto;
        height: calc(100% - 90px);
        border: 1px solid rgba(235, 238, 247, 1);
    }

    /deep/ .el-table--fit {
        padding-top: 0px !important;
    }


    /deep/ #tab-0 {
        width: 252px;
        height: 50px;
        border-radius: 20px 20px 0px 0px;
        border-right: none;
        z-index: 1;
        background-color: #05285E;
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


    .ul_listr li:nth-child(1) {
        padding-left: 32px;
        box-sizing: border-box;
        margin-top: 32px;
        color: #333;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        cursor: pointer;

        img {
            vertical-align: middle;
            margin-right: 8px;
        }
    }

    .ul_listr li:nth-child(2) {
        padding-left: 29px;
        box-sizing: border-box;
        margin-top: 20px;
        cursor: pointer;
        font-size: 14px;
        height: 30px;
        line-height: 30px;

        img {
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .ul_listr li:nth-child(3) {
        padding-left: 29px;
        box-sizing: border-box;
        margin-top: 20px;
        cursor: pointer;
        font-size: 14px;
        height: 30px;
        line-height: 30px;

        img {
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .ul_listr1 li:nth-child(1) {
        padding-left: 32px;
        box-sizing: border-box;
        margin-top: 32px;
        color: #333;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        cursor: pointer;
        font-size: 16px;

        img {
            vertical-align: middle;
            margin-right: 8px;
        }
    }

    .ul_listr1 li:nth-child(2) {
        padding-left: 29px;
        box-sizing: border-box;
        margin-top: 20px;
        cursor: pointer;
        font-size: 14px;
        height: 30px;
        line-height: 30px;

        img {
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .ul_listr1 li:nth-child(3) {
        padding-left: 29px;
        box-sizing: border-box;
        margin-top: 20px;
        cursor: pointer;
        font-size: 14px;
        height: 30px;
        line-height: 30px;

        img {
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .ul_listr1 li:nth-child(4) {
        padding-left: 29px;
        box-sizing: border-box;
        margin-top: 20px;
        cursor: pointer;
        font-size: 14px;
        height: 30px;
        line-height: 30px;

        img {
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .ul_listr1 li:nth-child(5) {
        padding-left: 29px;
        box-sizing: border-box;
        margin-top: 20px;
        font-size: 14px;
        cursor: pointer;
        height: 30px;
        line-height: 30px;

        img {
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .ul_listr2 li:nth-child(1) {
        padding-left: 29px;
        box-sizing: border-box;
        margin-top: 20px;
        color: #333;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        cursor: pointer;

        img {
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .ul_listr2 li:nth-child(2) {
        padding-left: 29px;
        box-sizing: border-box;
        margin-top: 20px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        cursor: pointer;

        img {
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .ul_listr li:hover {
        background-color: #EBEEF7;
    }

    .ul_listr1 li:hover {
        background-color: #EBEEF7;
    }

    .ul_listr2 li:hover {
        background-color: #EBEEF7;
    }

    .ul_listr li:nth-child(1) {
        background: none;
    }

    .ul_listr1 li:nth-child(1) {
        background: none;
    }

    .ul_listr2 li:nth-child(1) {
        background: none;
    }

    .ul_listr1,
    .ul_listr2 {
        padding-top: 15px;
    }

    .showMessage {
        display: none;
    }

    .divBoxt {
        height: 785px;
    }

    .tabs {
        margin-top: 0;
    }

    .el-tree-info {
        width: 14px;
        height: 13px;
        background: url(../assets/images/dicon.png);
        margin-right: 6px;
    }

    /deep/ .el-tree {
        height: auto!important;
    }
</style>
