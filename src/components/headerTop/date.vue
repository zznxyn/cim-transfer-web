<template>
    <el-row type="flex" align="middle">
        <el-col>
            <p class="font_mid al_mid">{{nowWeek}}</p>
            <p class="font_mini al_mid">{{currentTime}}</p>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        data() {
            return {
                timer: "", //定义一个定时器的变量
                currentTime: '', // 获取当前时间
                nowWeek: '',

            };
        },
        created() {
            let _this = this; //声明一个变量指向Vue实例this，保证作用域一致
            this.timer = setInterval(function () {
                //创建补0函数
                function p(s) {
                    return s < 10 ? "0" + s : s;
                }

                let vWeek, vWeek_s, vDay;
                vWeek = [
                    "星期天",
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六"
                ];
                let date = new Date();
                vWeek_s = date.getDay();

                _this.currentTime = date.format('yyyy-MM-dd');
                _this.nowWeek = vWeek[vWeek_s];
            }, 1000);
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        }
    }

</script>
