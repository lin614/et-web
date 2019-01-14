import createPersistedState from 'vuex-persistedstate'

export default ({
    store
}) => {
    
    // store.commit('set_dark')
    //考虑主题初始化
    createPersistedState({
        key: 'exchain',
        paths: ['lang', 'theme', 'user']
    })(store)
}