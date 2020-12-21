const breadcrumbModule = {
    namespaced: true,
    state: {
        breadcrumbList: []
    },
    mutations: {
        setBreadcrumb(state, breadcrumbData) {
            state.breadcrumbList = breadcrumbData
        }
    }
}

export default breadcrumbModule
