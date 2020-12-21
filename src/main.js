import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import 'amfe-flexible'
import _ from "lodash"
// 导入请求模块
import Http from './utils/http.js'
import BeanUtils from './utils/bean.js'
import resetLocalStorage from './utils/localStorage'
import qs from 'qs'
import FormButton from '@/components/common/button/formButton'
import TableButton from '@/components/common/button/tableButton'
import uploader from 'vue-simple-uploader';

Vue.use(uploader);
Vue.prototype.$qs = qs
Vue.prototype.$http = Http
Vue.prototype.BeanUtils = BeanUtils
Vue.prototype.resetLocalStorage = resetLocalStorage
Vue.prototype.href2 = function (url) {
    this.resetLocalStorage('activePath', url)
    this.$router.push(url)
}
// 导入Vuex
import store from './store'
// 导入echarts
import echarts from 'echarts'
// import 'echarts-gl'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.config.devtools = true

//导入字体图标
import './assets/fonts/iconfont.css'
import './assets/fonts/font.css'
import './assets/icon/iconfont.css'
//导入全局样式表
import './assets/css/cim_global.less'
// ztree
// import './plugins/ztree/js/jquery.ztree.core.min'
// import './plugins/ztree/js/jquery.ztree.excheck.min'
// import './plugins/ztree/css/zTreeStyle/zTreeStyle.css'

/*
 * 对date增加格式化方法
 * fmt参考yyyy-MM-dd hh:mm:ss.S q 或 yyyy-M-d h:m:s.S q
 */

Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

Vue.component('FormButton', FormButton)
Vue.component('TableButton', TableButton)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
