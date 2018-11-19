import createPersistedState from 'vuex-persistedstate'

export default ({
    store
}) => {
    createPersistedState({
        key: 'exchain',
        paths: ['lang','theme']
    })(store)
}