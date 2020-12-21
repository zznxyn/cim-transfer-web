<template>
    <el-row type="flex" align="middle" :gutter="20">
        <el-col :span="12">
            <img src="@/assets/images/wea.png" alt />
        </el-col>
        <el-col :span="12">
            <p class="font_mid al_mid">{{temperature}}℃</p>
            <p class="font_mini al_mid">{{weatherType}}</p>
        </el-col>
    </el-row>
</template>
<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                weatherType: '', // 天气情况
                temperature: 0, // 温度
            }
        },
        methods: {
            getWeatherInfo() {
                var url = "http://wthrcdn.etouch.cn/weather_mini"
                axios.get(url, {
                    params: {
                        city: '重庆市',
                    }
                }).then(data => {
                    const forecast = data.data.data.forecast;
                    this.temperature = data.data.data.wendu
                    if (forecast.length < 1) {
                        return;
                    }
                    const currentWeather = forecast[0]
                    this.weatherType = currentWeather.type
                })
            }
        },
        created() {
            this.getWeatherInfo()
        }


    }

</script>
