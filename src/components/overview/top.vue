<template>
    <div class="herder">
        <div class="h_logo" onclick="redirectFreedo()">
            <img src="@/assets/images/cim-logo.png" alt class="lo" />
            <p class="p1">智慧城市信息模型(CIM)平台</p>
            <span></span>
            <p class="p2">数字化移交</p>
        </div>
        <div class="cd">
            <ul class="ulMenu">
                <li v-for="(item,index) in menuList" :key="item.id" :class="{'active':item.active}"
                    @click="clickMenu(index)">
                    {{item.title}}</li>
                <!-- <li class="menu-active">
                    <a @click="href2('/Handover')">移交总览</a>
                </li>
                <li>
                    <a @click="href2('/Accept')">工程数据</a>
                </li>
                <li>物联网数据</li>
                <li>运维数据</li> -->
            </ul>
            <!--            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">-->
            <!--                <el-menu-item index="1">处理中心</el-menu-item>-->
            <!--                <el-menu-item index="2">消息中心</el-menu-item>-->
            <!--                <el-menu-item index="3">订单管理</el-menu-item>-->
            <!--            </el-menu>-->
        </div>
        <ul class="message">
            <li class="peo">
                <img src="@/assets/images/people.png" alt />
            </li>
            <li class="peole">
                <div>
                    <p class="peole_p1">李安然</p>
                    <p>ID:2145</p>
                </div>
            </li>
            <li class="wid"></li>
            <li class="weather">
                <img src="@/assets/images/weather.png" alt />
            </li>
            <li class="tem">
                <div>
                    <p class="tem_t1">15℃</p>
                    <p>多云</p>
                </div>
            </li>
            <li class="count">
                <div>
                    <p class="count_c1">64</p>
                    <p>PM2.5</p>
                </div>
            </li>
            <li class="wid"></li>
            <li class="week">
                <div>
                    <p class="week_w1">星期一</p>
                    <p>2020/3/10</p>
                </div>
            </li>
            <li class="tc">
                <img src="../../assets/images/overview/gb.png" alt="" @click="logout">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menuList: [{
                    id: 1,
                    title: '移交总览',
                    active: true
                }, {
                    id: 2,
                    title: '工程数据',
                    active: false
                }, {
                    id: 3,
                    title: '物联网数据',
                    active: false
                }, {
                    id: 4,
                    title: '运维数据',
                    active: false
                }]
            }
        },
        methods: {
            clickMenu(i) {
                this.menuList.forEach(item => {
                    item.active = false;
                });
                this.menuList[i].active = true;
                if (i === 1) {
                    // this.$router.push('/Accept');
                    this.href2('/Accept');
                }
            },
            logout() {
                this.$http.get('/ajaxLogout', {}).then(data => {
                    window.sessionStorage.clear();
                    //sessionStorage.removeItem('token');
                    this.$router.push("/login");
                    window.location.reload();
                });

            }
            // projectDataMethod() {
            //     this.$router.push('/Accept');
            // }
        }
    }

</script>

<style lang="less" scoped>
    .herder {
        position: absolute;
        width: 100%;
        height: 59px;
        background-color: rgba(5, 40, 94, 0.5);
        display: flex;

        .lo {
            margin-left: 30px;
            width: 50px;
            height: 42px;
        }

        span {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #fff;
            margin-left: 10px;
        }

        .p1 {
            margin-left: 10px;
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #fff;
        }

        .p2 {
            margin-left: 10px;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #fff;
        }
    }

    .h_logo {
        width: auto;
        height: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .cd {
        //position: relative;
        background: url(../../assets/images/top-nav-bgn.png) no-repeat;
        height: 63px;
        background-size: 100% 100%;
        flex: 1;
        text-align: center;

        .ulMenu {
            display: inline-block;
        }

        .ulMenu li {
            cursor: default;
        }

        .ulMenu li a {
            text-decoration: none;
            color: #fff;
            cursor: pointer;
        }

        .menu-active {
            background: url(../../assets/images/select.png);
            background-size: 100% 100%;
            margin-left: 0;
        }

        li {
            float: left;
            // margin-right: 40px;
            color: #fff;
            height: 62px;
            line-height: 62px;
            text-align: center;
            font-size: 18px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            margin: 0 25px;
            cursor: pointer !important;
        }
    }

    .message {
        width: 478px;
        display: flex;
        align-items: center;
    }

    .message li {
        float: left;
    }

    .peole {
        margin-left: 10px;
    }

    .peole div {
        width: 54px;
        height: 33px;
    }

    .peole div p {
        font-weight: Regular;
        font-family: Microsoft YaHei;
        font-size: 12px;
        color: #fff;
    }

    .wid {
        width: 2px;
        height: 24px;
        background: rgba(204, 204, 204, 1);
        opacity: 0.5;
        margin-left: 19px;
    }

    .weather img {
        margin-left: 30px;
        margin-top: 7px;
    }

    .tem {
        margin-left: 3px;
    }

    .tem div {
        width: 54px;
        height: 33px;
    }

    .tem div p {
        font-weight: Regular;
        font-family: Microsoft YaHei;
        font-size: 12px;
        color: #fff;
    }

    .count {
        margin-left: 16px;
    }

    .count div {
        width: 54px;
        height: 33px;
    }

    .count div {
        font-weight: Regular;
        font-family: Microsoft YaHei;
        font-size: 12px;
        color: #fff;
    }

    .week {
        margin-left: 23px;
    }

    .week div {
        width: 54px;
        height: 33px;
    }

    .week div p {
        font-weight: Regular;
        font-family: Microsoft YaHei;
        font-size: 12px;
        color: #fff;
    }

    .people_p1 {
        font-size: 16px;
    }

    .tem_t1 {
        font-size: 16px !important;
    }

    .count_c1 {
        font-size: 16px !important;
    }

    .week_w1 {
        font-size: 16px !important;
    }

    .peole_p1 {
        font-size: 16px !important;
    }

    .ulMenu li.active {
        color: #22FFED;
        background: url('../../assets/images/overview/select.png');
        background-size: 100% 100%;
    }

    .tc {
        margin-left: 25px;

        img {
            margin-top: 10px;
            cursor: pointer;
        }
    }

</style>
