<template>
    <el-container>
        <el-header style="height: auto;margin-bottom: 20px" :class="{showMessage:tabIndex ==1 || tabIndex==2}">
            <!-- 工程基本信息 -->
            <div class="m_top">
                <projectInfo @projectInited="afterProjectInited" ref="projectInfoRef" @remark="getRemark"></projectInfo>
            </div>
        </el-header>
        <el-main>
            <div class="tab" :class="{ tabs :tabIndex ==1 || tabIndex==2 }">
                <ProjectSwitch :projectInited="projectInited" @changeTableIndex="changeTableIndex"
                               :projectFileListUrl="url"
                               :projectFileListUrl2="url2" :projectFileListHeight="listHeight"></ProjectSwitch>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    // 工程基本信息
    import ProjectInfo from '@/components/audit/detail/projectInfo.vue'

    import ProjectSwitch from '@/components/audit/detail/projectSwitch'

    export default {
        components: {
            ProjectInfo,
            ProjectSwitch
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

    .m_top {
        width: 100%;
        height: 140px;
        background-color: #fff;
        position: relative;
    }

    .el-row {
        margin-left: 100px;
    }

    .tab {
        height: 100%;
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

    .b_bottom {
        position: relative;
        top: 23px;
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
            color: #32375a;
            font-family: Microsoft YaHei;
        }
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


    // /deep/ .el-tree-node {
    //     margin-top: 10px;
    // }


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
        height: 100%;
    }

    /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        color: #fff !important;
        background: #4BC2FF !important;
        width: 200px;
    }

    /deep/ .el-tabs--border-card > .el-tabs__content {
        padding: 0 !important;
    }

    /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
        color: #FFFFFF!important;
    }
</style>
