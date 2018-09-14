export default {
    loadActivity(state, payload) {
        state.activitys = payload
    },
    loadTask(state, payload) {
        state.tasks = payload
    },
    changeLoadingState(state, loading) {
        state.loading = loading
    }
}
