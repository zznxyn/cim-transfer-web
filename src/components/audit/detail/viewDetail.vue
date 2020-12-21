<template>
    <el-container style="min-height: 725px">
        <el-header style="height: auto;margin-bottom: 20px" :class="{showMessage:tabIndex ==1 || tabIndex==2}">
            <!-- 工程基本信息 -->
            <div class="m_top">
                <projectInfo @projectInited="afterProjectInited" ref="projectInfoRef" @remark="getRemark"></projectInfo>
            </div>
        </el-header>
        <el-main>
            <el-row :style="{height : (tabIndex ==1 || tabIndex == 2) ? '100%' : '66%'}">
                <el-col style="height: 100%">
                    <div class="tab">
                        <ProjectSwitch :projectInited="projectInited" @changeTableIndex="changeTableIndex"
                                       :projectFileListUrl="url"
                                       :projectFileListUrl2="url2" :projectFileListHeight="listHeight"></ProjectSwitch>
                    </div>
                </el-col>
            </el-row>
            <el-row style="height: 4%" :class="{showMessage:tabIndex ==1 || tabIndex==2}">
                <el-col></el-col>
            </el-row>
            <el-row style="height: 30%" :class="{showMessage:tabIndex ==1 || tabIndex==2}">
                <el-col style="height: 100%">
                    <div class="b_bottom">
                        <el-row>
                            <el-col :span="5">
                                <p class="m_title">审核历史</p>
                                <img src="@/assets/images/jx.png" alt class="ic"/>
                            </el-col>
                        </el-row>
                        <el-row class="bottom_row">
                            <el-col :span="24" style="height: 100%">
                                <TimeLine class="view_history"></TimeLine>
                            </el-col>
                        </el-row>
                    </div>
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
            TimeLine
        },
        data() {
            return {
                tabIndex: 0,
                projectInited: false,
                remark: '',
                url: '/data/getCatalogModelRefFile',
                url2: '/data/getProjectFileList',
                listHeight: '100%'
            }
        },
        methods: {
            afterProjectInited() {
                this.projectInited = true;
            },
            changeTableIndex(tab) {
                this.tabIndex = tab.index;
            },
            reject() {
                this.$http.post('/transfer/updateApplications/' + this.$store.state.audit.applicationId, {
                    stateName: 'DISMISSED',
                    remark: this.remark
                }, '驳回成功').then(data => {
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
                })
            }
        }
    };

</script>
<style lang="less" scoped>
    /deep/ .el-header {
        padding: 0px;
    }

    /deep/ .el-main {
        padding: 3px 0px;
    }

    .ic {
        position: absolute;
        height: 49px;
        top: 0;
    }

    .bottom_row {
        height: calc(100% - 47px);
        overflow-y: auto;
    }

    .m_top {
        width: 100%;
        height: 140px;
        background-color: #fff;
        position: relative;
    }

    .tab {
        height: 100%;
    }

    .b_bottom {
        width: 100%;
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


    .el-button.el-button {
        margin-left: 35px;
    }


    .el-icon-my-export {
        background: url(/officeHouse/resources/images/export.png) center no-repeat;
        background-size: cover;
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

        div {
            width: 100%;
            height: 146px;
            border: 1px solid rgba(190, 198, 228, 1);
            background: rgba(248, 249, 253, 1);

            .inp_p {
                color: #333;
                font-size: 16px;
            }
        }
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


    .showMessage {
        display: none;
    }

    .tabs {
        margin-top: 0;
        height: auto;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        color: #fff !important;
        background: #4BC2FF !important;
        width: 200px;
    }

    /deep/ .el-tabs--border-card > .el-tabs__content {
        padding: 0 !important;
    }

    .view_history {
        width: 96%;
        margin: 5px auto;

        /deep/ .el-col-16 {
            width: 4.66667% !important;
        }

        /deep/ .el-col-4 {
            width: 8.66667%;
            text-align: left;
        }
    }

    /deep/ .el-container.is-vertical {
        height: 99% !important
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #fff!important;
    }
</style>
