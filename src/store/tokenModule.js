const tokenModule = {
    namespaced: true,
    state: {
        // 存储token
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token') : ''
      },
     
    mutations: {
        // 修改token，并将token存入sessionStorage
        changeLogin (state, user) {
            state.token = user.token;
            sessionStorage.setItem('token', user.token);
        }
    }

}

export default tokenModule