<template>
    <div class="left">
        <div class="left_top">
            <div class="t">
                <span></span>
                <p>待审核工程数量及分布</p>
            </div>
            <div class="s">
                <div class="cont">
                    <p class="c1">{{projectTotal.total}}</p>
                    <p class="c2">工程总量</p>
                </div>
                <div class="cont_r">
                    <p class="c1">{{projectTotal.request}}</p>
                    <p class="c2" style="margin-left:5px">待审核数量</p>
                </div>
            </div>
            <div id="myCharts" ref="myCharts"></div>
        </div>
        <div class="left_c">
            <div class="t">
                <span></span>
                <p>各阶段工程移交数量</p>
            </div>
            <div class="ld">
                <img src="../../assets/images/ld.png" alt class="l_img" />
                <div class="l_top">
                    <span></span>
                    <span></span>
                    <div class="r_center">
                        <p>{{ProjectStage.stage2}}</p>
                        <p>运维阶段</p>
                    </div>
                </div>
                <div class="l_cen">
                    <span></span>
                    <span></span>
                    <div class="r_center1">
                        <p>{{ProjectStage.stage1}}</p>
                        <p>建设阶段</p>
                    </div>
                </div>
                <div class="l_bot">
                    <span></span>
                    <span></span>
                    <div class="r_center2">
                        <p>{{ProjectStage.stage0}}</p>
                        <p>设计阶段</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="left_b">
            <div class="t">
                <span></span>
                <p>工程移交数量(近5年)</p>
            </div>
            <div id="myCharts1" ref="myCharts1"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                projectTotal: {},
                yData: [],
                xData1: [],
                xData2: [],
                ProjectStage: {},
                years: [],
                stageArr: [],
                myChart: null,
                myChart2: null
            }
        },
        methods: {
            // 获取待审核工程数量
            getProjectTotal() {
                this.$http.get('/transfer/statistic/getProjectTotal').then(data => {
                    this.projectTotal = data
                })
            },
            // 获取待审核工程
            getProjectArea() {
                this.$http.get('/transfer/statistic/getProjectArea').then(data => {
                    this.yData = data.areas;
                    this.xData1 = data.stage0;
                    this.xData2 = data.stage1;
                })
            },
            // 获取阶段数量
            getProjectStage() {
                this.$http.get('/transfer/statistic/getProjectStage').then(data => {
                    this.ProjectStage = data;
                })
            },
            // 获取工程移交总量
            getProjectYear() {
                this.$http.get('/transfer/statistic/getProjectYear').then(data => {
                    this.years = data.years.reverse();
                    this.sumItem(data.stage0, data.stage1, data.stage2);
                })
            },
            // 多个数组对应项之和
            sumItem(arr1, arr2, arr3) {
                let result = arr1.map((item, index) => {
                    return item + arr2[index]
                });
                let result2 = result.map((item, index) => {
                    return item + arr3[index]
                });
                this.stageArr = result2;
            },
            drawLine() {
                // 初始化echarts实例
                this.myChart = this.$echarts.init(this.$refs.myCharts);
                setTimeout(() => {
                    let yData = this.yData;
                    let xData1 = this.xData1;
                    let xData2 = this.xData2;
                    this.myChart.setOption({
                        title: {
                            text: "待审核工程分布",
                            x: "center",
                            textStyle: {
                                fontSize: transSize(14),
                                color: "#ffffff",
                                fontFamily: "PingFang SC"
                            },
                            subtext: "设计移交                                                              竣工移交",
                            subtextStyle: {
                                color: "#ffffff",
                                fontSize: transSize(12)
                            }
                        },
                        tooltip: {
                            trigger: "axis",
                            show: true,
                        },
                        xAxis: [{
                                gridIndex: 0,
                                type: "value",
                                minInterval: 1,
                                // max: 400,
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        type: "dashed"
                                    }
                                },
                                axisLine: {
                                    interval: 0,
                                    lineStyle: {
                                        color: "#cccccc"
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: "rgb(255, 255, 255)",
                                        fontSize: transSize(12)
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                inverse: true
                            },
                            {
                                gridIndex: 1,
                                type: "value",
                                // max: 1000,
                                minInterval: 1,
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        type: "dashed"
                                    }
                                },
                                axisLine: {
                                    interval: 0,
                                    lineStyle: {
                                        color: "#cccccc"
                                    }
                                },
                                axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: "rgb(255, 255, 255)",
                                        fontSize: transSize(12)
                                    }
                                },
                                axisTick: {
                                    show: false
                                }
                            }
                        ],
                        yAxis: [{
                                type: "category",
                                gridIndex: 0,
                                data: this.yData,
                                axisLabel: {
                                    show: false
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: "#cccccc"
                                    }
                                }
                            },
                            {
                                type: "category",
                                gridIndex: 1,
                                data: yData,
                                axisLabel: {
                                    show: true,
                                    margin: transSize(10),
                                    textStyle: {
                                        fontSize: transSize(12),
                                        color: "rgb(255, 255, 255)",
                                        fontFamily: "PingFang SC"
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    lineStyle: {
                                        color: "#cccccc"
                                    }
                                }
                            }
                        ],
                        grid: [{
                                right: "58%",
                                x: 20,
                                y: 45,
                                y2: 30
                            },
                            {
                                left: "58%",
                                y: 45,
                                x2: 20,
                                y2: 30
                            }
                        ],
                        series: [{
                                type: "bar",
                                data: this.xData1,
                                itemStyle: {
                                    normal: {
                                        color: "#6BC0F9"
                                    }
                                },
                                seriesLayoutBy: "",
                                barCategoryGap: "50%"
                            },
                            {
                                type: "bar",
                                data: this.xData2,
                                itemStyle: {
                                    normal: {
                                        color: "#EC716B"
                                    }
                                },
                                xAxisIndex: 1,
                                yAxisIndex: 1,
                                barCategoryGap: "50%"
                            }
                        ]
                    });
                }, 1000);
            },
            initChart() {
                // 初始化echarts实例
                this.myChart2 = this.$echarts.init(this.$refs.myCharts1);
                setTimeout(() => {
                    let nData = this.stageArr.reverse()
                    var chartOption = {
                        tooltip: {
                            trigger: "axis",
                            show: true,
                            formatter(params) {
                                const item = params[0]
                                return `
                                        年份：${item.axisValue}<br />
                                        移交总量：${item.data}
                                       `
                            }
                        },
                        color: ["#6BC0F9", "#EC716B"],
                        toolbox: {
                            show: false
                        },
                        legend: {
                            x: "right",
                            itemWidth: transSize(10),
                            itemHeight: transSize(10),
                            textStyle: {
                                color: "#fff",
                                fontSize: transSize(12)
                            }
                        },
                        xAxis: [{
                            type: "category",
                            axisTick: {
                                show: true
                            },
                            boundaryGap: false,
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                interval: 0,
                                lineStyle: {
                                    color: "rgb(255, 255, 255)"
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "rgb(255, 255, 255)",
                                    fontSize: transSize(12)
                                }
                            },
                            data: this.years
                        }],
                        yAxis: [{
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "rgb(255, 255, 255)"
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: "rgb(255, 255, 255)",
                                    fontSize: transSize(12)
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    type: "dashed"
                                }
                            }
                        }],
                        series: [{
                                // name: "BIM模型",
                                type: "line",
                                itemStyle: {
                                    normal: {
                                        areaStyle: {
                                            type: "default",
                                            color: new this.$echarts.graphic.LinearGradient(
                                                0,
                                                0,
                                                0,
                                                1,
                                                [{
                                                        offset: 0,
                                                        color: "#6BC0F9DD"
                                                    },
                                                    {
                                                        offset: 0.5,
                                                        color: "#6BC0F977"
                                                    },
                                                    {
                                                        offset: 1,
                                                        color: "#6BC0F900"
                                                    }
                                                ]
                                            )
                                        },
                                        lineStyle: {
                                            color: "rgb(75, 194, 255)"
                                        },
                                        borderColor: "#C4EAFC"
                                    }
                                },
                                data: nData,
                                symbol: "rectangle"
                            },
                            // {
                            //     name: "三维模型",
                            //     type: "line",
                            //
                            //     itemStyle: {
                            //         normal: {
                            //             areaStyle: {
                            //                 type: "default",
                            //                 color: new this.$echarts.graphic.LinearGradient(
                            //                     0,
                            //                     0,
                            //                     0,
                            //                     1,
                            //                     [{
                            //                         offset: 0,
                            //                         color: "#E5655FDD"
                            //                     },
                            //                         {
                            //                             offset: 0.5,
                            //                             color: "#E5655F77"
                            //                         },
                            //                         {
                            //                             offset: 1,
                            //                             color: "#E5655F00"
                            //                         }
                            //                     ]
                            //                 )
                            //             },
                            //             lineStyle: {
                            //                 color: "rgb(255, 202, 202)"
                            //             },
                            //             borderColor: "#C4EAFC"
                            //         }
                            //     },
                            //     data: [65, 50, 80, 60, 40, 80],
                            //     symbol: "rectangle"
                            // }
                        ],
                        grid: {
                            left: "4%",
                            right: "4%",
                            top: "15%",
                            bottom: "0%",
                            containLabel: true
                        }
                    };
                    this.myChart2.setOption(chartOption);
                }, 1000)
            },

        },
        mounted() {
            this.drawLine();
            this.initChart();

            let _this = this;
            window.onresize = () => {
                _this.myChart.resize();
                _this.myChart2.resize();
            }
        },
        created() {
            this.getProjectTotal();
            this.getProjectArea();
            this.getProjectStage();
            this.getProjectYear();
        }
    }

</script>

<style lang="less" scoped>
    .left {
        .left_top {
            position: relative;
            width: 100%;
            height: 433px;
            background: url(../../assets/images/box-bg-left1.png);
            background-size: 100% 100%;
            position: relative;

            .t {
                padding-top: 31px;

                span {
                    display: block;
                    width: 4px;
                    height: 16px;
                    background: #22ffed;
                    float: left;
                    margin-left: 19px;
                    margin-top: 3px;
                }

                p {
                    color: #fff;
                    float: left;
                    margin-left: 10px;
                    font-size: 16px;
                    font-family: PingFang SC;
                }
            }
        }

        .left_c {
            width: 100%;
            height: 272px;
            background: url(../../assets/images/box-bg-left2.png);
            background-size: 100% 100%;
            margin-top: 10px;

            .t {
                padding-top: 25px;

                span {
                    display: block;
                    width: 4px;
                    height: 16px;
                    background: #22ffed;
                    float: left;
                    margin-left: 19px;
                    margin-top: 3px;
                }

                p {
                    color: #fff;
                    float: left;
                    margin-left: 10px;
                    font-size: 16px;
                }
            }

            .ld {
                position: relative;
            }

            .l_img {
                position: absolute;
                left: 40px;
                top: 47px;
                height: 177px;
                width: 176px;
            }

            .l_top {
                position: absolute;
                left: 134px;
                top: 65px;
            }

            .l_top,
            .l_cen span:nth-child(1) {
                display: block;
                width: 84px;
                height: 2px;
                background-color: #ccc;
            }

            .l_top span:nth-child(2) {
                display: block;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background-color: #fff;
                position: absolute;
                left: 84px;
                top: -2px;
            }

            .r_center {
                position: absolute;
                width: 80px;
                left: 81px;
                top: -22px;
                width: 80px;
            }

            .r_center p:nth-child(1) {
                font-size: 30px;
                font-family: DS-Digital;
                font-weight: normal;
                color: #ffffff;
                text-align: center;
            }

            .r_center p:nth-child(2) {
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: normal;
                color: #ffffff;
                text-align: center;
            }

            .l_cen {
                position: absolute;
                left: 170px;
                top: 126px;
            }

            .l_cen span:nth-child(1) {
                width: 52px;
            }

            .l_cen span:nth-child(2) {
                display: block;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background-color: #fff;
                position: absolute;
                left: 50px;
                top: -2px;
            }

            .r_center1 {
                position: absolute;
                left: 45px;
                top: -20px;
                width: 80px;
            }

            .r_center1 p:nth-child(1) {
                font-size: 30px;
                font-family: DS-Digital;
                font-weight: normal;
                color: #ffffff;
                text-align: center;
            }

            .r_center1 p:nth-child(2) {
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: normal;
                color: #ffffff;
                text-align: center;
            }

            .l_bot {
                position: absolute;
                left: 199px;
                top: 185px;
            }

            .l_bot span:nth-child(1) {
                display: block;
                width: 26px;
                height: 2px;
                background-color: #ccc;
            }

            .l_bot span:nth-child(2) {
                display: block;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background-color: #fff;
                position: absolute;
                left: 23px;
                top: -2Px;
            }

            .r_center2 {
                position: absolute;
                left: 16px;
                top: -18px;
                width: 80px;
            }

            .r_center2 p:nth-child(1) {
                font-size: 30px;
                font-family: DS-Digital;
                font-weight: normal;
                color: #ffffff;
                text-align: center;
            }

            .r_center2 p:nth-child(2) {
                font-size: 12px;
                font-family: PingFang SC;
                font-weight: normal;
                color: #ffffff;
                text-align: center;
            }
        }

        .left_b {
            width: 100%;
            height: 260px;
            background: url(../../assets/images/box-bg-left3.png);
            background-size: 100% 100%;
            margin-top: 10px;

            .t {
                padding-top: 31px;

                span {
                    display: block;
                    width: 4px;
                    height: 16px;
                    background: #22ffed;
                    float: left;
                    margin-left: 19px;
                    margin-top: 3px;
                }

                p {
                    color: #fff;
                    float: left;
                    margin-left: 10px;
                    font-size: 16px;
                    font-family: PingFang SC;
                }
            }
        }
    }

    .s {
        width: 100%;
        height: 80px;
    }

    .cont {
        position: absolute;
        top: 73px;
        left: 73px;
    }

    .c1 {
        font-size: 30px;
        font-size: 60px;
        font-family: DS-Digital;
        font-weight: normal;
        color: #22ffed;
        text-align: center;
    }

    .c2 {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ccc;
        margin-left: 8px;
    }

    .cont_r {
        position: absolute;
        top: 73px;
        right: 74px;
    }

    #myCharts {
        width: 98%;
        height: 270px;
        margin: 51px auto 0;
    }

    #myCharts1 {
        width: 95%;
        height: 170px;
        margin: auto;
        padding-top: 30px;
    }

</style>
