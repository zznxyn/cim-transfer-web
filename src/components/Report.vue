<template>
    <div class="contain">
        <div class="report" id="capture" ref="imageWrapper">
            <div class="date">
                <p>认证编号：{{searchData.authReportNo}}</p>
                <p>认证日期：{{reportGenerateTime | formatData}}</p>
            </div>
            <div class="con">
                <ul>
                    <li>
                        <span>工程名称:</span>
                        <span>{{searchData.projectName}}</span>
                    </li>
                    <li>
                        <span>建设单位:</span>
                        <span>{{searchData.constructionUnit}}</span>
                    </li>
                    <li>
                        <span>监理单位:</span>
                        <span>{{searchData.designUnit}}</span>
                    </li>
                    <li>
                        <span>设计单位:</span>
                        <span>{{searchData.supervisionUnit}}</span>
                    </li>
                </ul>
            </div>
            <div class="modelImgOne">
                <img :src="farBitmap" alt="">
            </div>
            <div class="modelImgTwo">
                <img :src="nearBitmap" alt="">
            </div>
            <div class="bot">
                <p>重庆市住房和城乡建设委员会</p>
                <p>{{reportGenerateTime | formatData}}</p>
            </div>
        </div>
        <div id="box">
            <div style="position: relative">
                <img :src="printSrc" alt="" id="box1" ref="printImage">
            </div>
        </div>
        <div class="r_btn">
            <span @click="downLoadImage">下载</span>
            <span @click="toImage">打印</span>
            <span v-print="'#box1'" ref="printBtn" style="display: none"></span>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import Vue from 'vue'
    // import domtoimage from 'dom-to-image'

    import html2canvas from "html2canvas"

    // 打印
    import Print from 'vue-print-nb'

    Vue.use(Print); //注册

    export default {
        data() {
            return {
                searchData: {},
                logList: [],
                reportGenerateTime: '',
                farBitmap: '',
                nearBitmap: '',
                printSrc: ''
            }
        },
        methods: {
            getModelImg() {
                this.$http.get('/transfer/point/get', {
                    projectId: this.searchData.projectId
                }).then(data => {
                    this.farBitmap = data.farBitmap
                    this.nearBitmap = data.nearBitmap
                })
            },

            // 下载图片
            downLoadImage() {
                html2canvas(this.$refs.imageWrapper).then((canvas) => {
                    let dataURL = canvas.toDataURL("image/png");
                    let a = document.createElement("a");
                    let event = new MouseEvent("click");
                    a.download = name || "认证报告.png"; // 设置图片名称
                    a.href = dataURL; // 将生成的URL设置为a.href属性
                    a.dispatchEvent(event);
                    if (a.href) {
                        this.$message.success('下载成功')
                    }
                }).catch((error) => {
                })
            },
            toImage() {
                html2canvas(this.$refs.imageWrapper).then((canvas => {
                    this.printSrc = canvas.toDataURL("image/png",1.0);
                    this.print();
                }))
            },
            print() {
                let btn = this.$refs.printBtn;
                let event = new MouseEvent("click");
                btn.dispatchEvent(event);
            }
        },
        created() {
            this.searchData = this.reportList
            this.logList = this.reportList.logList
            this.logList.filter(
                item => item.state === 5 && item.statePrevious === 3
            ).forEach(item => {
                this.reportGenerateTime = item.operatedAt
            })
            this.getModelImg();
        },
        computed: {
            ...mapState('report', ['reportList'])
        },
        filters: {
            formatData(time) {
                let date = new Date(time);
                return date.format("yyyy-MM-dd");
            }
        },
        mounted() {
            // window.pr = this.$print;
            this.$nextTick(() => {
                //this.toImage()
            })
        }
    }

</script>
<style lang="less" scoped>
    .contain {
        width: 98%;
        height: 100%;
        background-color: #fff;
        margin: auto;
        position: relative;
    }

    .report {
        width: 580px;
        height: 820px;
        background: url(../assets/images/baogao-bg.png);
        background-size: 100% 100%;
        position: absolute;
        left: 233px;
        top: 50%;
        transform: translateY(-50%);
        // margin-top: -357.5px;
    }

    .date {
        padding-top: 310px;
        position: absolute;
        left: 250px;

        p {
            color: #999;
            font-size: 14px;
        }
    }

    .con {
        position: absolute;
        left: 80px;
        top: 370px;
    }

    .con ul li {
        font-size: 16px;
        color: #333;
        margin-bottom: 15px;
    }

    .con ul li span:nth-child(2) {
        margin-left: 10px;
    }

    .bot {
        position: absolute;
        left: 320px;
        bottom: 150px;
    }

    .bot p {
        color: #333;
        font-size: 14px;
        text-align: center;
    }

    .r_btn {
        position: absolute;
        width: 378px;
        right: 220px;
        bottom: 165px;
    }

    .r_btn span {
        display: block;
        width: 378px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
    }

    .r_btn span:nth-child(1) {
        background: #05285e;
        color: #fff;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        margin-bottom: 50px;
    }

    .r_btn span:nth-child(2) {
        background: #ffffff;
        border: 2px solid #05285e;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #05285e;
    }

    .modelImgOne {
        position: absolute;
        top: 360px;
        right: 81px;

        img {
            width: 100px;
            height: 100px;
        }
    }

    .modelImgTwo {
        position: absolute;
        top: 465px;
        right: 81px;

        img {
            width: 100px;
            height: 100px;
        }
    }

    #box {
        width: 0;
        height: 0;
        overflow: hidden;
    }

    #box1 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 780Px;
        @page{
            margin: 0;
        }
    }
</style>
