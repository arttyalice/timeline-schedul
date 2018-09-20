import axios from "axios";

axios.defaults.headers.common['Authorization'] = 'Bearer Token AAAAAAA'

export default {
    loadData: async ({ commit }) => {
        let tmpActivity = await axios.get("http://api.th2you.com:3001/api/activity")
        //commit('loadActivity', tmpActivity.data)
        commit('loadActivity', [
    {
        "_id": "5b8b5adb533d2c19e284ad20",
        "name": "Lean",
        "batchId": "5b8b5689533d2c19e284ad1d",
        "categoryId": 1,
        "startDate": "2018-08-01T00:00:00.000Z",
        "endDate": "2018-10-15T00:00:00.000Z",
        "createDate": "2018-06-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20"
    },
    {
        "_id": "5b9c5adb533d2c19e284fff0",
        "name": "Design",
        "batchId": "5b8b5689533d2c19e284ad1d",
        "categoryId": 1,
        "startDate": "2018-08-15T00:00:00.000Z",
        "endDate": "2018-09-15T00:00:00.000Z",
        "createDate": "2018-06-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20"
    },
    {
        "_id": "5b9c5adb533d2c19e284ffde",
        "name": "Planning",
        "batchId": "5b8b5689533d2c19e284ad1d",
        "categoryId": 1,
        "startDate": "2018-08-01T00:00:00.000Z",
        "endDate": "2018-10-15T00:00:00.000Z",
        "createDate": "2018-06-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "updateDate": "2019-11-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20"
    },
    {
        "_id": "5b93f946e4a53d20223a4ee5",
        "name": "MVP",
        "batchId": "5b8b5689533d2c19e284ad1d",
        "categoryId": 2,
        "startDate": "2018-09-01T00:00:00.000Z",
        "endDate": "2018-10-30T00:00:00.000Z",
        "createDate": "2018-06-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20"
    },
    {
        "batchId": "5b8b5689533d2c19e284ad1d",
        "name": "Prototype",
        "categoryId": 2,
        "startDate": "2018-09-15T00:00:00.000Z",
        "endDate": "2018-09-30T00:00:00.000Z",
        "createDate": "2018-06-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993ed0e4a53d20223a4ee8",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20"
    },
    {
        "batchId": "5b8b5689533d2c19e284ad1d",
        "name": "Testing",
        "categoryId": 1,
        "startDate": "2018-10-01T00:00:00.000Z",
        "endDate": "2018-10-15T00:00:00.000Z",
        "createDate": "2018-06-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993ed7e4a53d20223a4ee9",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20"
    },
    {
        "batchId": "5b8b5689533d2c19e284ad1d",
        "name": "Develop",
        "categoryId": 3,
        "startDate": "2018-10-01T00:00:00.000Z",
        "endDate": "2019-05-31T00:00:00.000Z",
        "createDate": "2018-06-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993edde4a53d20223a4eea",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20"
    },
    {
        "batchId": "5b8b5689533d2c19e284ad1d",
        "name": "Marketing",
        "categoryId": 2,
        "startDate": "2018-12-16T00:00:00.000Z",
        "endDate": "2020-04-30T00:00:00.000Z",
        "createDate": "2018-06-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993edde4a53d20223a4aea",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20"
    },
    {
        "batchId": "5b8b5689533d2c19e284ad1d",
        "name": "Events",
        "categoryId": 3,
        "startDate": "2019-02-15T00:00:00.000Z",
        "endDate": "2020-01-01T00:00:00.000Z",
        "createDate": "2018-06-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993e5de4a53d20223a432a",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20"
    }
])

        let tmpTask = await axios.get('http://api.th2you.com:3001/api/task')
        commit('loadTask', [{
        "_id": "5b8b5bce0df0d91f4cf0dcb4",
        "name": "Lean 1",
        "startDate": "2018-08-01T00:00:00.000Z",
        "endDate": "2018-08-20T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "activityId": "5b8b5adb533d2c19e284ad20",
        "fundReq": true,
        "fundAmount": 1000.59,
        "status": 1,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 500.5,
        "approveRemark": "Nothing...",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": "2018-08-01T00:00:00.000Z",
        "finishProcessDate": "2018-08-20T00:00:00.000Z"
    },
    {
        "_id": "5b93fb85e4a53d20223a4ee6",
        "name": "Lean 2",
        "startDate": "2018-08-15T00:00:00.000Z",
        "endDate": "2018-08-30T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "activityId": "5b8b5adb533d2c19e284ad20",
        "fundReq": true,
        "fundAmount": 2000.69,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 1500,
        "approveRemark": "Test",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": "2018-09-15T00:00:00.000Z",
        "finishProcessDate": "2018-09-10T00:00:00.000Z"
    },
    {
        "name": "Plan 3",
        "startDate": "2018-08-20T00:00:00.000Z",
        "endDate": "2018-09-30T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f20e4a53d20223a4eeb",
        "activityId": "5b9c5adb533d2c19e284ffde",
        "fundReq": true,
        "fundAmount": 2500.69,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 2000,
        "approveRemark": "Test",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": "2018-08-25T00:00:00.000Z",
        "finishProcessDate": null
    },
    {
        "name": "Lean 4",
        "startDate": "2018-09-02T00:00:00.000Z",
        "endDate": "2018-09-12T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f59e4a53d20223a4eec",
        "activityId": "5b8b5adb533d2c19e284ad20",
        "fundReq": true,
        "fundAmount": 12000.6,
        "status": 2,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 10000,
        "approveRemark": "Test",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    },
    {
        "name": "Dev 1",
        "startDate": "2018-10-02T00:00:00.000Z",
        "endDate": "2018-12-12T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f66e4a53d20223a4eed",
        "activityId": "5b993edde4a53d20223a4eea",
        "fundReq": true,
        "fundAmount": 200.97,
        "status": 2,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 0,
        "approveRemark": "Test",
        "updateDate": "2018-09-15T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    },
    {
        "name": "Dev 2",
        "startDate": "2018-11-02T00:00:00.000Z",
        "endDate": "2019-02-15T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f66e4a53d20223a4eez",
        "activityId": "5b993edde4a53d20223a4eea",
        "fundReq": true,
        "fundAmount": 25000.00,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 15000,
        "approveRemark": "Test",
        "updateDate": "2018-09-18T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    },
    {
        "name": "Proto 1",
        "startDate": "2018-09-20T00:00:00.000Z",
        "endDate": "2018-09-30T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f66e4a53d20223a4eez",
        "activityId": "5b993ed0e4a53d20223a4as7",
        "fundReq": true,
        "fundAmount": 2000.69,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 1330,
        "approveRemark": "Test",
        "updateDate": "2018-09-18T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    },
    {
        "name": "Proto 2",
        "startDate": "2018-09-25T00:00:00.000Z",
        "endDate": "2018-09-29T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993h66e4a53d20223a4e42",
        "activityId": "5b993ed0e4a53d20223a4ee8",
        "fundReq": true,
        "fundAmount": 2000.69,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 333,
        "approveRemark": "Test",
        "updateDate": "2018-09-18T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    },
    {
        "name": "Market 2",
        "startDate": "2019-09-25T00:00:00.000Z",
        "endDate": "2019-10-20T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f66e4a53d20223a4kez",
        "activityId": "5b993edde4a53d20223a4aea",
        "fundReq": true,
        "fundAmount": 5000.69,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 333,
        "approveRemark": "Test",
        "updateDate": "2018-09-18T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    },
    {
        "name": "Event 2",
        "startDate": "2019-02-25T00:00:00.000Z",
        "endDate": "2019-03-20T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f66e4a53d20223a4fe0",
        "activityId": "5b993e5de4a53d20223a432a",
        "fundReq": true,
        "fundAmount": 50000.69,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 35000,
        "approveRemark": "Tests",
        "updateDate": "2018-09-18T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    },
    {
        "name": "Event 3",
        "startDate": "2019-02-18T00:00:00.000Z",
        "endDate": "2019-02-27T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f66e4a53d20223fffe0",
        "activityId": "5b993e5de4a53d20223a432a",
        "fundReq": true,
        "fundAmount": 50000.69,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 35000,
        "approveRemark": "Tests",
        "updateDate": "2018-09-18T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    },
    {
        "name": "Event 4",
        "startDate": "2019-02-20T00:00:00.000Z",
        "endDate": "2019-06-23T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f66e4a53d20223ffee0",
        "activityId": "5b993e5de4a53d20223a432a",
        "fundReq": true,
        "fundAmount": 50000.69,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 35000,
        "approveRemark": "Tests",
        "updateDate": "2018-09-18T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    },
    {
        "name": "MVP 1",
        "startDate": "2018-09-02T00:00:00.000Z",
        "endDate": "2018-09-17T00:00:00.000Z",
        "createDate": "2018-05-18T00:00:00.000Z",
        "createBy": "5b8b552a533d2c19e284ad1c",
        "_id": "5b993f66e4a53d20223ffee0",
        "activityId": "5b93f946e4a53d20223a4ee5",
        "fundReq": true,
        "fundAmount": 50000.69,
        "status": 0,
        "docStatus": 0,
        "fundStatus": 0,
        "approveAmount": 35000,
        "approveRemark": "Tests",
        "updateDate": "2018-09-18T00:00:00.000Z",
        "updateBy": "5b8b5adb533d2c19e284ad20",
        "startProcessDate": null,
        "finishProcessDate": null
    }
    ])
    }
}
