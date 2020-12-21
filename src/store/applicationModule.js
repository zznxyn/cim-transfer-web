const applicationModule = {
    namespaced: true,
    state: {
        projectId: '',
        applicationId: '',
        // 工程资料树当前选中节点code
        catalogTreeCurrentCode: '',
        // 工程资料文件列表->当前目录Id
        currentCatalogId: ''
    },
    mutations: {
        init(state, application) {
            state.projectId = application.projectId
            state.applicationId = application.id

        }
    }

}

export default applicationModule
