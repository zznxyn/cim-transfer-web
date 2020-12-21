import Vue from 'vue'
import Vuex from 'vuex'
import applicationModule from './applicationModule'
import loginModule from './loginModule'
import reportModule from './reportModule'
import treeModule from './treeModule'
import breadcrumbModule from './breadcrumbModule'
import auditModule from './auditModule'
import tokenModule from './tokenModule'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        application: applicationModule,
        login: loginModule,
        report: reportModule,
        tree: treeModule,
        breadcrumb: breadcrumbModule,
        audit: auditModule,
        token: tokenModule
    }
})
