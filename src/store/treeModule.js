const treeModule = {
    namespaced: true,
    state: {
        treeData: JSON.parse(sessionStorage.getItem('treeData') || '[]'),
    },
    mutations: {
        setTreeMenu(state, data) {
            state.treeData = data
            sessionStorage.setItem('treeData', JSON.stringify(data))
        }
    }

}

export default treeModule
