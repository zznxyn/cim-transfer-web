import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const mainRule = {
//     path: '/main',
//     component: Main
// }
// const projectApplyRule = {
//     path: '/projectApply',
//     component: ProjectApply
// }
// const auditRule = {
//     path: '/audit',
//     component: Audit
// }
// const documentRule = {
//     path: '/document',
//     component: Document
// }
// const acceptRule = {
//     path: '/accept',
//     component: Accept
// }
// const searchRule = {
//     path: '/search',
//     component: Search
// }
// const reportRule = {
//     path: '/report',
//     component: Report
// }
// const guideRule = {
//     path: '/guide',
//     component: Guide
// }
// const personalRule = {
//     path: '/personal',
//     component: Personal
// }
// const noticeRule = {
//     path: '/notice',
//     component: Notice
// }
// const taskRule = {
//     path: '/task',
//     component: Task
// }
// const leavemessageRule = {
//     path: '/leavemessage',
//     component: LeaveMessage
// }
// const enterpriseRule = {
//     path: '/enterprise',
//     component: Enterprise
// }
// const submitRule = {
//     path: '/submit',
//     component: Submit,
// }
// const applicationDetailRule = {
//     path: '/submit/:id',
//     component: ApplicationDetail,
// }
// const reviewedRule = {
//     path: '/reviewed',
//     component: Reviewed
// }
// const completedRule = {
//     path: '/completed',
//     component: Completed
// }
// const handoverRule = {
//     path: '/Handover',
//     component: Handover
// }

// 配置路由对应规则
// const ruleMapping = {
//     'main': [mainRule],
//     'projectApply': [projectApplyRule],
//     'audit': [auditRule],
//     'document': [documentRule],
//     'accept': [acceptRule],
//     'search': [searchRule],
//     'report': [reportRule],
//     'guide': [guideRule],
//     'personal': [personalRule],
//     'notice': [noticeRule],
//     'task': [taskRule],
//     'leavemessage': [leavemessageRule],
//     'enterprise': [enterpriseRule],
//     'submit': [submitRule, applicationDetailRule],
//     'reviewed': [reviewedRule],
//     'completed': [completedRule],
//     'Handover': [handoverRule]
// }

const router = new Router({
    mode: 'history', // 路由显示模式，默认hash，地址栏上面默认带#，history不会带#号
    routes: [
        {
            path: '/',
            component: () => import('@/components//RedirectPage.vue')
        },
        {
            path: '/login',
            component: () => import('@/components/Login.vue')
        },

        {
            path: '/register',
            component: () => import('@/components/Register.vue')
        },

        {
            path: '/homePage',
            component: () => import('@/components/HomePage.vue'),
            redirect: '/main',
            children: [{
                path: '/report',
                component: () => import('@/components/Report.vue')
            },
                {
                    path: '/tree',
                    component: () => import('@/components/application/detail/BimModelFileRel')
                },
                {
                    path: '/error500',
                    component: () => import('@/components/error/Error500.vue')
                },
                {
                    path: '/main',
                    component: () => import('@/components/main/Main.vue')
                },
                {
                    path: '/projectApply',
                    component: () => import('@/components/ProjectApply.vue')
                },
                {
                    path: '/submitAudit',
                    component: () => import('@/components/application/detail/submitAudit.vue')
                },
                // {
                //     path: '/audit',
                //     component: Audit
                // },
                {
                    path: '/document',
                    component: Document
                },
                {
                    path: '/accept',
                    component: () => import('@/components/transfer/Accept.vue')
                },
                {
                    path: '/accept/:id',
                    component: () => import('@/components/audit/detail/auditDetail.vue')
                },
                {
                    path: '/completedList',
                    component: () => import('@/components/transfer/CompletedList.vue')
                },
                {
                    path: '/completedList/:id',
                    component: () => import('@/components/audit/detail/viewDetail.vue')
                },
                {
                    path: '/auditLog',
                    component: () => import('@/components/transfer/AuditLog.vue')
                },
                {
                    path: '/search',
                    component: () => import('@/components/Search.vue')
                },
                {
                    path: '/report',
                    component: () => import('@/components/Report.vue')
                },
                {
                    path: '/submit',
                    component: () => import('@/components/application/list/PendingSubmit.vue')
                    // children: [{
                    //     path: '/submit/:id',
                    //     component: ProjectApply
                    // }]
                },
                {
                    path: '/submit/:id',
                    component: () => import('@/components/ProjectApply.vue')
                },
                {
                    path: '/guide',
                    component: () => import('@/components/guide/Guide.vue')
                },
                {
                    path: '/personal',
                    component: () => import('@/components/user/Personal.vue')
                },
                {
                    path: '/notice',
                    component: () => import('@/components/user/Notice.vue')
                },
                {
                    path: '/task',
                    component: () => import('@/components/user/Task.vue')
                },
                {
                    path: '/task/:id',
                    component: () => import('@/components/ProjectApply.vue')
                },
                {
                    path: '/leavemessage',
                    component: () => import('@/components/user/LeaveMessage.vue')
                },
                {
                    path: '/enterprise',
                    component: () => import('@/components/user/Enterprise.vue')
                },
                {
                    path: '/reviewed',
                    component: () => import('@/components/application/list/PendingAudit.vue')
                },
                {
                    path: '/reviewed/:id',
                    component: () => import('@/components/application/detail/ApplicationDetail')
                },
                {
                    path: '/completed',
                    component: () => import('@/components/application/list/Completed.vue')
                },
                {
                    path: '/completed/:id',
                    component: () => import('@/components/transfer/Reviewdetail.vue')
                }
            ]
        },

        {
            path: '/Handover',
            component: () => import('@/components/Handover.vue')
        },


        {
            path: '/password',
            component: () => import('@/components/Password.vue')
        },


        {
            path: '*',
            component: () => import('@/components/error/NotFound.vue')
        }
    ]
})

//路由导航卫士
router.beforeEach((to, from, next) => {
    if (to.path == '/login' || to.path == '/register' || to.path == '/password') {
        next()
    } else {
        // const realName = sessionStorage.getItem('realName')
        // if (!realName) {
        //     next('/login')
        // } else {
        //     next()
        // }
        let token = sessionStorage.getItem('token');

        if (token === null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
})

//路由跳转控制
// export function initDynamicRoutes() {
//     const currentRoutes = router.options.routes
//     const rightList = store.state.login.rightList
//     // const name = sessionStorage.getItem('realName')
//     rightList.forEach(item => {
//         // console.log(item,'item')
//         if (item.menuUrl !== '') {
//             const itemRuleFirst = ruleMapping[item.menuUrl]
//             currentRoutes[3].children.push(...itemRuleFirst)
//         }
//         if (item.children !== null) {
//             item.children.forEach(item => {
//                 const itemRule = ruleMapping[item.menuUrl]
//                 currentRoutes[3].children.push(...itemRule)
//             })
//         }
//     })
//     // if (name === 'js') {
//     // } else if (name === 'zjw') {

//     // }
//     router.addRoutes(currentRoutes)
// }

export default router
