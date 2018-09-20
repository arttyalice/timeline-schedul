import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'Bearer Token AAAAAAA'

export default {
    loadData: async ({ commit }) => {
        let tmpActivity = await axios.get("http://api.th2you.com:3001/api/activity")
        commit('loadActivity', tmpActivity.data)

        let tmpTask = await axios.get('http://api.th2you.com:3001/api/task')
        commit('loadTask', tmpTask.data)
    }
}
