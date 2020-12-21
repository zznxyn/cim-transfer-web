const reportModule = {
    namespaced: true,
    state: {
        // 认证报告查询数据
        reportList: JSON.parse(sessionStorage.getItem('reportList') || '[]'),
    },
    mutations: {
        // 认证报告查询方法
        reportSearch(state, data) {
            state.reportList = data
            sessionStorage.setItem('reportList', JSON.stringify(data))
        }
    },
}

export default reportModule