<template>
    <el-container>
        <el-header style="height: auto">
            <div class="bg">
                <div class="bg_con">
                    <img src="../assets/images/cxun.png" alt="" style="width:222px;height:170px">
                    <div class="bg_z">
                        <span>认证报告查询</span>
                        <span>Certification Report Query</span>
                    </div>
                </div>
            </div>
        </el-header>
        <el-main>
            <div class="divForm">
                <el-form label-width="100px" size="medium" :model="searchForm">
                    <el-row>
                        <el-col>
                            <el-form-item label="申请单号">
                                <el-input v-model="searchForm.authRequestNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="认证编号">
                                <el-input v-model="searchForm.authReportNo"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-button type="primary" class="pri-btn" @click="search">查询</el-button>
                        </el-col>
                    </el-row>

                </el-form>
            </div>
        </el-main>
    </el-container>
</template>
<script>
    export default {
        data() {
            return {
                searchForm: {
                    authRequestNo: '',
                    authReportNo: ''
                },
            }
        },
        methods: {
            search() {
                this.$http.get('/transfer/authReport', this.searchForm).then(data => {
                    this.$message.success('成功')
                    //this.searchData = data.data
                    this.$store.commit('report/reportSearch', data)
                    //this.logList = data.data.logList
                    this.$router.push('/report')
                })

            }
        }
    }

</script>
<style lang="less" scoped>
    .pri-btn {
        width: 580px;
        height: 60px;
        margin-left: 95px;
        margin-top: 30px
    }

    .main {
        width: 100%;
        height: 100%;
    }

    .bg {
        width: 100%;
        height: 231px;
        background: #fff;
        background-size: 100% 100%;
        position: relative;
    }

    .divForm {
        width: 100%;
        height: 100%;
        background: #fff;
    }

    .divForm .el-form {
        width: 600px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-37%);
    }

    /deep/ .el-input--medium .el-input__inner {
        height: 60px;
        width: 600px;
    }

    /deep/ .el-form-item--medium .el-form-item__label {
        height: 60px !important;
        line-height: 60px !important;
        font-size: 16px;
    }

    /deep/ .el-input--medium .el-input__inner {
        background: #FCFBFE;
    }

    /deep/ .el-row {
        margin-bottom: 30px;
    }

    .el-button--primary {
        background: #05285E;
    }

    .el-button--primary {
        font-size: 20px;
        color: #fff;
    }

    .bg_con {
        position: absolute;
        left: 50%;
        margin-left: -259px;
        top: 32px;

        img {
            float: left;
        }

        .bg_z {
            float: left;
            margin-top: 43px;
        }
    }

    .bg_z span:nth-child(1) {
        font-size: 43px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(5, 40, 94, 1);
        display: block;
        height: 56px;
    }

    .bg_z span:nth-child(2) {
        font-size: 21px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(5, 40, 94, 1);
        display: block;
    }

    /deep/ .el-header {
        padding: 0px;
        margin-bottom: 20px;
    }

    /deep/ .el-main {
        padding: 2px 0px;
    }

</style>
