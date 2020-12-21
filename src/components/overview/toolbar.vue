<template>
    <div>
        <img src="@/assets/images/pic2.png" alt class="control"/>
        <div class="nav">
            <ul>
                <li>
                    <img src="@/assets/images/nav.png" alt/>
                </li>
                <li>
                    <img src="@/assets/images/nav1.png" alt/>
                </li>
                <li>
                    <img src="@/assets/images/nav2.png" alt/>
                </li>
                <li>
                    <img src="@/assets/images/nav3.png" alt/>
                </li>
                <li>
                    <img src="@/assets/images/nav4.png" alt/>
                </li>
                <li @click="toggleLoop()">
                    <img src="@/assets/images/kaiguan.png" v-show="!isLoop" alt/>
                    <img src="@/assets/images/kaiguan-k.png" v-show="isLoop" alt/>
                </li>
                <li>
                    <img src="@/assets/images/nav6.png" alt/>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoop: false,
            }
        }
    }
</script>

<style lang="less" scoped>
    .control {
        position: absolute;
        top: 8px;
        left: -80px;
        width: 63px;
        height: 59px;
    }

    .nav {
        /* width: 360px; */
        height: 60px;
        background-image: url(../../assets/images/pic.png);
        background-size: 100% 100%;
    }

    .nav ul {
        display: flex;
        height: 100%;
    }

    .nav ul li {
        margin-left: 20px;
        margin-top: 23px;
    }

    .nav ul li:nth-child(1) img {
        width: 25px;
        height: 24px;
    }

    .nav ul li:nth-child(2) img {
        width: 25px;
        height: 24px;
    }

    .nav ul li:nth-child(3) img {
        width: 25px;
        height: 24px;
    }

    .nav ul li:nth-child(4) img {
        width: 25px;
        height: 24px;
    }

    .nav ul li:nth-child(5) img {
        width: 25px;
        height: 24px;
    }

    .nav ul li:nth-child(6) img {
        width: 34px;
        height: 20px;
        margin-top: 4px;
        cursor: pointer;
    }

    .nav ul li:nth-child(7) img {
        width: 26px;
        height: 26px;
    }

    .nav ul li:first-child {
        margin-left: 23px;
    }
</style>
