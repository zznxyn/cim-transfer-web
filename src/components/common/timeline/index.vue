<template>
    <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top" :color="color" :hide-timestamp="true"
            v-for="(loglist,index) in logList" :key="index">
            <el-row type="flex" align="middle" style="margin-bottom: 11px">
                <el-col :span="16" class="col1" :class="stateColor == true ? 'pColor' : 'rColor'">{{loglist.status}}
                </el-col>
                <el-col :span="4" class="col2" v-if="loglist.state == 3">申请人:{{loglist.operatorName}}</el-col>
                <el-col :span="4" class="col2" v-if="loglist.state == 5 || loglist.state == 6">
                    审核人:{{loglist.operatorName}}</el-col>
                <el-col :span="4" class="col3">{{loglist.operatedAt}}</el-col>
            </el-row>
            <el-card v-if="loglist.state !== 3">
                <p>{{loglist.remark}}</p>
            </el-card>
        </el-timeline-item>
    </el-timeline>
</template>

<script>
    export default {
        data() {
            return {
                color: '#4BC2FF',
                logList: [],
                defaultDatePattern: 'yyyy-MM-dd',
                isP: false,
                isR: false,
                stateColor: false,
            }
        },
        created() {
            this.$http.get('/transfer/applications/' + this.$route.params.id).then(data => {
                this.logList = data.logList.filter(list => list.state === 3 || list.state === 5 || list
                    .state === 6).map(item => {
                    item.operatedAt = new Date(item.operatedAt).format(this.defaultDatePattern);
                    switch (item.state) {
                        case 3:
                            item.status = '申请';
                            break;
                        case 5:
                            item.status = '通过';
                            break;
                        case 6:
                            item.status = '驳回';
                            break;
                        default:
                            break;
                    }
                    return item;
                })
            })
        }
    }

</script>

<style lang="less" scoped>
    /deep/ .el-timeline-item__timestamp.is-top {
        text-align: right;
    }

    .col1 {
        font-size: 18px;
        font-weight: 600;
    }

    .pColor {
        color: #00D463;
    }

    .rColor {
        color: #FF6E10;
    }

    /deep/ .content .el-card__body {
        display: none !important;
    }

    .col2 {
        font-size: 14px;
        color: #999999;
        font-weight: 400;
    }

    .col3 {
        font-size: 14px;
        color: #999999;
        font-weight: 400;
        text-align: right;
    }

    /deep/ .el-card.is-always-shadow,
    .el-card.is-hover-shadow:focus,
    .el-card.is-hover-shadow:hover {
        box-shadow: none !important;
        background-color: #F8F9FD;
    }

</style>
