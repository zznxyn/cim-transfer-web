const loginModule = {
    namespaced: true,
    state: {
        // 登录菜单数据
        rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
        dispatchPath:JSON.parse(sessionStorage.getItem('disPath'))
    },
    mutations: {
        // 登录菜单方法
        setRightList(state, data) {
            state.rightList = data
            // console.log(data,'vuex菜单')
            sessionStorage.setItem('rightList', JSON.stringify(data))
        },
        setDispatchPath(state ,data) {
            state.dispatchPath = data;
            sessionStorage.setItem('disPath', JSON.stringify(data));
        }
    },
}

export default loginModule