<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-row type="flex" align="middle">
                    <el-col :span="1">
                        <img class="lt_img_main_area" src="@/assets/images/jx.png" alt="">
                    </el-col>
                    <el-col :span="6">
                        <span class="title_main_area">工程基本信息</span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px">
            <el-col :span="8">
                <ul class="ul">
                    <li>
                        <span>工程名称:</span>
                        <span>{{projectBaseInfo.projectName}}</span>
                    </li>
                    <li>
                        <span>设计单位:</span>
                        <span>{{projectBaseInfo.designUnit}}</span>
                    </li>
                </ul>
            </el-col>
            <el-col :span="8">
                <ul class="ul">
                    <li>
                        <span>建设单位:</span>
                        <span>{{projectBaseInfo.constructionUnit}}</span>
                    </li>
                    <li>
                        <span>监理单位:</span>
                        <span>{{projectBaseInfo.supervisionUnit}}</span>
                    </li>
                </ul>
            </el-col>
            <el-col :span="8">
                <ul class="ul">
                    <li>
                        <span>工程地址:</span>
                        <span>{{projectBaseInfo.provinceName}}{{projectBaseInfo.cityName}}{{projectBaseInfo.areaName}}{{projectBaseInfo.detail}}</span>
                    </li>
                    <li>
                        <span>工程类型:</span>
                        <span>{{projectBaseInfo.projectType}}</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                projectBaseInfo: {
                    id: '',
                    projectId: '',
                    projectName: '',
                    constructionUnit: '',
                    designUnit: '',
                    supervisionUnit: '',
                    provinceName: '',
                    cityName: '',
                    areaName: '',
                    detail: '',
                    remark: '',
                    projectType: '',
                    logList:[]
                },
                // projectType: ''
            }
        },
        methods: {
            //获取工程基本信息
            getApplication() {
                this.$http.get('/transfer/applications/' + this.$route.params.id).then(data => {
                    // this.projectBaseInfo = data
                    this.initAudit(data);
                    // this.$emit('remark', this.projectBaseInfo.remark)
                    // this.$store.commit('audit/init', data)
                    // this.$http.get('/base/system/structDic/selectByCode/', {
                    //     code: data.projectType
                    // }).then(data => {
                    //     if (data) {
                    //         this.projectType = data.oname
                    //     }
                    // })
                })
            },
            // 根据查询结果，初始化表单数据
            initAudit(result) {
                this.BeanUtils.copyProp(this.projectBaseInfo, result);
                this.$store.commit('audit/init', this.projectBaseInfo);
                this.$emit('projectInited');
                // this.$http.get('/base/system/structDic/selectByCode/', {
                //     code: this.projectBaseInfo.projectType
                // }).then(data => {
                //     if (data) {
                //         this.projectType = data.oname
                //     }
                // })
                this.$emit('remark', this.projectBaseInfo.remark);
            },
        },
        created() {
            this.getApplication()
        }
    }

</script>

<style lang="less" scoped>
    .m_top {
        width: 100%;
        height: 140px;
        background-color: #fff;
        position: relative;

        .m_title {
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
            box-sizing: border-box;
            font-size: 18px;
            color: #32375a;
            font-family: Microsoft YaHei;
        }
    }

    .ic {
        position: absolute;
        height: 49px;
        top: 0;
    }

    .ul li {
        height: 25px;
        margin-bottom: 14px;
        padding-left: 32px;
    }

    .ul li span:nth-child(1) {
        float: left;
        color: rgba(153, 153, 153, 1);
        font-size: 14px;
        font-family: Microsoft YaHei;
        line-height: 25px;
    }

    .ul li span:nth-child(2) {
        margin-left: 15px;
        line-height: 25px;
        color: #333;
        font-size: 16px;
        display: grid;
        padding-left: 10px;
    }

</style>
