const auditModule = {
    namespaced: true,
    state: {
        projectId: JSON.parse(sessionStorage.getItem('projectId') || '[]'),
        applicationId: JSON.parse(sessionStorage.getItem('applicationId') || '[]'),
        logList: JSON.parse(sessionStorage.getItem('logList') || '[]'),
        // 工程资料树当前选中节点code
        catalogTreeCurrentCode: '',
        // 工程资料文件列表->当前目录Id
        currentCatalogId: ''
    },
    mutations: {
        init(state, audit) {
            state.projectId = audit.projectId
            state.applicationId = audit.id
            state.logList = audit.logList
            sessionStorage.setItem('projectId', JSON.stringify(audit.projectId))
            sessionStorage.setItem('applicationId', JSON.stringify(audit.id))
            sessionStorage.setItem('logList', JSON.stringify(audit.logList))
        }
    }
}
export default auditModule
