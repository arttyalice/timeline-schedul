<template>
    <div id="app">
        <div class="page-head">
            <h1>
                {{title}}
            </h1>
        </div>
        <div class="t-container">
            <div class="t-head">
                <div class="t-left-task">
                    <div class="task-header">
                        <h1>
                            {{company}}
                        </h1>
                    </div>
                </div>
                <div class="t-right-date flex-div">
                    <div class="t-month" v-for="(month, index) in months" :key="index">
                        <h2>{{month}}</h2>
                    </div>
                </div>
            </div>

            <div class="t-loop" v-for="(activity, index) in activitys" :key="index">
                <div class="t-body flex-div" >
                    <div class="t-body-task-menu">
                        <div class="t-left-task activity-name">
                            <div class="activity-group flex-div" v-on:click="showCollapseTask(activity._id, index)">
                                <div class="task-collapse collapse-symbol">
                                    <h3
                                        v-if="collapseShow[index]"
                                        style=" transform: translateY(-0%);
                                                -webkit-transform: translateY(-0%);
                                                -moz-transform: translateY(-0%);
                                                -o-transform: translateY(-0%);
                                                -ms-transform: translateY(-0%);
                                                font-size: 25px"
                                    >-</h3>
                                    <h3
                                        v-else
                                        style=" transform: translateY(-2%);
                                                -webkit-transform: translateY(-2%);
                                                -moz-transform: translateY(-2%);
                                                -o-transform: translateY(-2%);
                                                -ms-transform: translateY(-2%);
                                                font-size: 18px"
                                    >+</h3>
                                </div>
                                <p class="task-collapse">{{ activity.name }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="t-right-date flex-div">
                        <div class="t-month" v-for="(month, index) in months" :key="index"></div>
                        <div
                            class="t-task-bar t-task-overdue popup"
                            v-bind:style="{width: calTaskOverdueEnd(activity.startDate, activity.endDate)+'%', left: progressStart(activity.startDate)+'%' }"
                            v-on:mouseover="mouseOverActivity(activity._id)"
                            v-on:mouseleave="mouseExitActivity"
                        >
                            <span
                                class="popuptext" id="myPopup" v-bind:style="stylePopup"
                                v-if="mouseOverActivityShow && activeActivity === activity._id && calOverdueDay(activity) > 0"
                            >
                                <div>
                                    <h3>{{activity.name}}</h3>
                                </div>
                                <div class="total-popup flex-div">
                                        <div class="flex-div" v-if="calTotalDay(activity) > 0">
                                           <div class="color-cicle r-progress"></div> Total: {{calTotalDay(activity)}} days
                                        </div>
                                        <div class="flex-div" v-else>
                                           <div class="color-cicle r-progress"></div> Day left: {{calTotalDay(activity) / -1}} days
                                        </div>
                                    </div>
                                <div class="remain-popup flex-div" v-if="calDay(activity.endDate) > calDay(new Date())">
                                    <div class="color-cicle r-remain"></div>Remain: {{calDayRemain(activity.endDate)}} days
                                </div>
                                <div class="overdue-popup flex-div" v-if="calOverdueDay(activity) > 0 && !activity.status">
                                    <div class="color-cicle r-overdue"></div>Overdue: {{calOverdueDay(activity)}} days
                                </div>
                            </span>
                        </div>

                        <div
                            class="t-task-bar t-task-progress popup"
                            v-bind:style="{ width: progressEnd(activity.startDate, activity.endDate)+'%',left: progressStart(activity.startDate)+'%' }"
                            v-on:mouseover="mouseOverActivity(activity._id)"
                            v-on:mouseleave="mouseExitActivity"
                        >
                            <span
                                class="popuptext" id="myPopup"
                                v-if="mouseOverActivityShow && activeActivity === activity._id && calOverdueDay(activity) < 0 && calDay(activity.endDate) > calDay(new Date())"
                            >
                                <div>
                                    <h3>{{activity.name}}</h3>
                                </div>
                                <div class="total-popup flex-div">
                                        <div class="flex-div" v-if="calTotalDay(activity) > 0">
                                           <div class="color-cicle r-progress"></div> Total: {{calTotalDay(activity)}} days
                                        </div>
                                        <div class="flex-div" v-else>
                                           <div class="color-cicle r-progress"></div> Day left: {{calTotalDay(activity) / -1}} days
                                        </div>
                                    </div>
                                <div class="remain-popup flex-div" v-if="calDay(activity.endDate) > calDay(new Date())">
                                    <div class="color-cicle r-remain"></div>Remain: {{calDayRemain(activity.endDate)}} days
                                </div>
                                <div class="overdue-popup flex-div" v-if="calOverdueDay(activity) > 0 && !activity.status">
                                    <div class="color-cicle r-overdue"></div>Overdue: {{calOverdueDay(activity)}} days
                                </div>
                            </span>
                        </div>

                        <div
                            class="t-task-bar t-remain-progress popup"
                            v-if="calDay(activity.endDate) > calDay(new Date())"
                            v-on:mouseover="mouseOverActivity(activity._id)"
                            v-on:mouseleave="mouseExitActivity"
                            v-bind:style="{width: calLaterEnd(activity)+'%', left: calCurrentDay+'%'}"
                        >
                            <span
                                class="popuptext" id="myPopup"
                                v-if="mouseOverActivityShow && activeActivity === activity._id && calOverdueDay(activity) < 0 && calDay(activity.endDate) < calDay(new Date())"
                            >
                                <div>
                                    <h3>{{activity.name}}</h3>
                                </div>
                                <div class="total-popup flex-div">
                                        <div class="flex-div" v-if="calTotalDay(activity) > 0">
                                           <div class="color-cicle r-progress"></div> Total: {{calTotalDay(activity)}} days
                                        </div>
                                        <div class="flex-div" v-else>
                                           <div class="color-cicle r-progress"></div> Day left: {{calTotalDay(activity) / -1}} days
                                        </div>
                                    </div>
                                <div class="remain-popup flex-div" v-if="calDay(activity.endDate) > calDay(new Date())">
                                    <div class="color-cicle r-remain"></div>Remain: {{calDayRemain(activity.endDate)}} days
                                </div>
                                <div class="overdue-popup flex-div" v-if="calOverdueDay(activity) > 0 && !activity.status">
                                    <div class="color-cicle r-overdue"></div>Overdue: {{calOverdueDay(activity)}} days
                                </div>
                            </span>
                        </div>

                        <div
                            class="t-current-date"
                            v-bind:style="{left: calCurrentDay+'%'}"
                        >
                        </div>
                    </div>
                </div>

                <div
                    v-show="collapseShow[index]"
                    class="t-body flex-div"
                    v-for="task in tasks" :key="task.id"
                    v-if="task.activityId === activity._id"
                >
                    <div class="t-body-task-menu" >
                        <div class="t-left-task task-name">
                                <p>{{task.name}}</p>
                        </div>
                    </div>

                        <div class="t-right-date flex-div">
                            <div class="t-month" v-for="(month, index) in months" :key="index"></div>
                            <div
                                class="t-task-bar t-task-overdue popup"
                                v-bind:style="{width: calTaskOverdueEnd(task.startDate)+'%', left: progressStart(task.startDate)+'%'}"
                                v-on:mouseover="mouseOverTask(task._id)"
                                v-on:mouseleave="[mouseExitTask]"
                            >
                                <span
                                    class="popuptext" id="myPopup"
                                    v-if="mouseOverTaskShow && activeTask === task._id && calOverdueDay(task) > 0"
                                >
                                    <div>
                                        <h3>{{task.name}}</h3>
                                    </div>
                                    <div class="total-popup flex-div">
                                        <div class="flex-div" v-if="calTotalDay(task) > 0">
                                           <div class="color-cicle r-progress"></div> Total: {{calTotalDay(task)}} days
                                        </div>
                                        <div class="flex-div" v-else>
                                           <div class="color-cicle r-progress"></div> Day left: {{calTotalDay(task) / -1}} days
                                        </div>
                                    </div>
                                    <div class="remain-popup flex-div" v-if="calDay(task.endDate) > calDay(new Date())">
                                        <div class="color-cicle r-remain"></div>Remain: {{calDayRemain(task.endDate)}} days
                                    </div>
                                    <div class="overdue-popup flex-div" v-if="calOverdueDay(task) > 0 && !task.status">
                                        <div class="color-cicle r-overdue"></div>Overdue: {{calOverdueDay(task)}} days
                                    </div>
                                </span>
                            </div>

                            <div
                                class="t-task-bar t-task-progress popup"
                                v-bind:style="[{width: progressEnd(task.startDate, task.endDate)+'%', left: progressStart(task.startDate)+'%'}]"
                                v-on:mouseover="mouseOverTask(task._id)"
                                v-on:mouseleave="mouseExitTask"
                            >
                                <span
                                    class="popuptext" id="myPopup"
                                    v-if="mouseOverTaskShow && activeTask === task._id && calOverdueDay(task) < 0 && calDay(activity.endDate) > calDay(new Date())"
                                >
                                    <div>
                                        <h3>{{task.name}}</h3>
                                    </div>
                                    <div class="total-popup flex-div">
                                        <div class="flex-div" v-if="calTotalDay(task) > 0">
                                           <div class="color-cicle r-progress"></div> Total: {{calTotalDay(task)}} days
                                        </div>
                                        <div class="flex-div" v-else>
                                           <div class="color-cicle r-progress"></div> Day left: {{calTotalDay(task) / -1}} days
                                        </div>
                                    </div>
                                    <div class="remain-popup flex-div" v-if="calDay(task.endDate) > calDay(new Date())">
                                        <div class="color-cicle r-remain"></div>Remain: {{calDayRemain(task.endDate)}} days
                                    </div>
                                    <div class="overdue-popup flex-div" v-if="calOverdueDay(task) > 0 && !task.status">
                                        <div class="color-cicle r-overdue"></div>Overdue: {{calOverdueDay(task)}} days
                                    </div>
                                </span>
                            </div>

                            <div
                                class="t-task-bar t-remain-progress popup"
                                v-if="calDay(task.endDate) > calDay(new Date())"
                                v-on:mouseover="mouseOverTask(task._id)"
                                v-on:mouseleave="mouseExitTask"
                                v-bind:style="[calTotalDay(task) > 0] ? [{width: progressEnd(task.startDate, task.endDate)+'%', left: progressStart(task.startDate)+'50%', },borderRadius] : {width: calLaterEnd(task)+'%', left: calCurrentDay+'%'}"
                            >
                                <span
                                    class="popuptext" id="myPopup"
                                    v-if="mouseOverTaskShow && activeTask === task._id && calOverdueDay(task) < 0 && calDay(activity.endDate) < calDay(new Date())"
                                >
                                    <div>
                                        <h3>{{task.name}}</h3>
                                    </div>
                                    <div class="total-popup flex-div">
                                        <div class="flex-div" v-if="calTotalDay(task) > 0">
                                           <div class="color-cicle r-progress"></div> Total: {{calTotalDay(task)}} days
                                        </div>
                                        <div class="flex-div" v-else>
                                           <div class="color-cicle r-progress"></div> Day left: {{calTotalDay(task) / -1}} days
                                        </div>
                                    </div>
                                    <div class="remain-popup flex-div" v-if="calDay(task.endDate) > calDay(new Date())">
                                        <div class="color-cicle r-remain"></div>Remain: {{calDayRemain(task.endDate)}} days
                                    </div>
                                    <div class="overdue-popup flex-div" v-if="calOverdueDay(task) > 0 && !task.status">
                                        <div class="color-cicle r-overdue"></div>Overdue: {{calOverdueDay(task)}} days
                                    </div>
                                </span>
                            </div>

                            <div class="t-current-date" v-bind:style="{left: calCurrentDay+'%'}">
                                <!-- <span
                                    class="popuptext" id="myPopup" v-if="mouseOverTaskShow && activeTask === task._id"
                                    v-bind:class="[overduePopupPos(task)] < 42 ? 't-task-overdue-lessDay' : '' && [calOverdueDay(task)] < 14 ? {left: '97%'} : {}"
                                >{{new Date()}}</span> -->
                            </div>
                        </div>
                </div>
            </div>
        </div>

        <div class="footer flex-div">
            <div class="left-modifier flex-div">Last Update: {{new Date(modDate).getDate()}}/{{new Date(modDate).getMonth()+1}}/{{new Date(modDate).getFullYear()}}</div>
            <div class="right-comments flex-div">
                <div class="flex-div comment-group">
                    <div class="color-cicle r-currentdate"></div>
                    Today
                </div>
                <div class="flex-div comment-group">
                    <div class="color-cicle r-progress"></div>
                    Done
                </div>
                <div class="flex-div comment-group">
                    <div class="color-cicle r-overdue"></div>
                    Overdue
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import axios from 'axios'

    export default {
        name: "app",
        async created() {
            axios.defaults.headers.common['Authorization'] = 'Bearer Token AAAAAAA'
            await this.$store.dispatch('loadData')
            axios.get('http://api.th2you.com:3001/api/user/1')
                .then(res => {
                    this.company = res.data.organizeName
                })

            this.collectYears()
        },
        data() {
            return {
                months: [],
                company: '',
                title: 'Timeline Schedul',
                activeActivity: null,
                activeTask: null,
                collapseShow: [],
                Popupshow: false,
                mouseOverTaskShow: false,
                mouseOverActivityShow: false,
                activityOverDueStatus: [],
                days: null,
                oneDay: 86400000,
                modDate: new Date(),
                //Object style
                borderRadius: {
                    'border-radius': '15px'
                },
                stylePopup: {

                }
            }
        },
        computed: {
            activitys() {
                return this.$store.getters.activitys
            },
            tasks() {
                return this.$store.getters.tasks
            },
            calCurrentDay() {
                var day = this.calDay(new Date())

                return (day / this.days) * 100
            }
        },
        methods: {
            calDay(task) {
                var now = new Date(task)
                var start = new Date(now.getFullYear(), 0, 0)
                var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
                var day = Math.floor(diff / this.oneDay)
                if(now.getFullYear() > new Date().getFullYear()) {
                    var i = now.getFullYear()
                    var x = new Date().getFullYear()
                    for(x; x < i; x++) {
                        day += x % 4 ? 365 : 366
                    }
                }
                return day
            },
            showCollapseTask(id, index) {
                this.$set(this.collapseShow, index, !this.collapseShow[index])
            },
            progressStart(task) {
                var day = this.calDay(task)

                return (day / this.days) * 100
            },
            progressEnd(taskStart, taskEnd) {
                var day = this.calDay(taskEnd)
                var startDate = this.progressStart(taskStart)

                return (day /this.days * 100) - startDate
            },
            calTaskOverdueEnd(taskStart) {
                var day = this.calDay(new Date())
                var startDate = this.progressStart(taskStart)

                return (day /this.days * 100) - startDate
            },
            calLaterEnd(task) {
                var end = this.calDay(task.endDate)
                var current = this.calDay(new Date())

                return (end - current) / this.days * 100
            },
            calTotalDay(item) {
                var end = this.calDay(item.endDate)
                var start = this.calDay(item.startDate)
                var current = this.calDay(new Date())

                return current - start
            },
            calOverdueDay(item) {
                var end = this.calDay(item.endDate)
                var start = this.calDay(item.startDate)
                var current = this.calDay(new Date())

                return current - end
            },
            calDayRemain(task) {
                var end = this.calDay(task)
                var cur = this.calDay(new Date())

                return end - cur
            },
            OverdueActivityArray(index) {
                this.activityOverDueStatus[index] = false
                this.collapseShow[index] = false
            },
            OverdueActivity(task, activityIndex) {
                if(task.status === 0) {
                    this.activityOverDueStatus[activityIndex] = true
                }
            },
            overduePopupPos(item) {
                var start = this.calDay(item.startDate)
                var end = this.calDay(item.endDate)

                return end - start
                console.log(y)
            },
            mouseOverTask(id) {
                this.mouseOverTaskShow = true
                this.activeTask = id
            },
            mouseExitTask() {
                this.stylePopup = 'animation: fadeOut 0.5s'
                this.mouseOverTaskShow = false

            },
            mouseOverActivity(id) {
                this.mouseOverActivityShow = true
                this.activeActivity = id
            },
            mouseExitActivity() {
                this.mouseOverActivityShow = false
            },
            callDaysInYear(years) {
                var seen = []
                var out = []
                var len = years.length
                var j = 0;
                for(var i in years) {
                    var item = years[i]
                    if(seen[item] !== 1) {
                        seen[item] = 1
                        out[j++] = item
                    }
                }
                out.sort()

                for(var i in out) {
                    this.days += out[i] % 4 ? 365 : 366
                    this.months = this.months.concat(
                        [
                            "Jan '" + out[i].toString().substr(-2),
                            "Feb '" + out[i].toString().substr(-2),
                            "Mar '" + out[i].toString().substr(-2),
                            "Apr '" + out[i].toString().substr(-2),
                            "May '" + out[i].toString().substr(-2),
                            "Jun '" + out[i].toString().substr(-2),
                            "Jul '" + out[i].toString().substr(-2),
                            "Aug '" + out[i].toString().substr(-2),
                            "Sep '" + out[i].toString().substr(-2),
                            "Oct '" + out[i].toString().substr(-2),
                            "Nov '" + out[i].toString().substr(-2),
                            "Dec '" + out[i].toString().substr(-2)
                        ]
                    )
                }
            },
            collectYears() {
                var totalYear = []
                var years = []
                var updateDate = []

                for(var i in this.activitys) {
                    this.OverdueActivityArray(i)

                    for(var index in this.tasks) {
                        if(this.tasks[index].activityId == this.activitys[i]._id) {
                            this.OverdueActivity(this.tasks[index], i)
                            years[index] = new Date(this.tasks[index].endDate).getFullYear()
                            updateDate[index] = new Date(this.tasks[index].updateDate)
                        }
                    }
                }
                this.modDate = (this.findLastestMod(updateDate))
                totalYear = this.callDaysInYear(years)
            },
            findLastestMod(update) {
                var y = new Date(update[0])
                var x = new Date()

                for(var i in update) {
                    if(new Date(update[i]).getFullYear > y.getFullYear) {
                        y = new Date(update[i])
                    } else {
                        if(new Date(update[i]).getMonth > i.getMonth) {
                            y = new Date(update[i])
                        } else {
                            if(new Date(update[i]).getDate > i.getDate) {
                                y = new Date(update[i])
                            }
                        }
                    }
                }
                return new Date(y)
            },
        }
    };
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');
    $border-color: rgb(223, 223, 223);
    $progress-bar: rgb(53, 207, 130);
    $overdue-bar: rgb(252, 92, 92);
    $currentdate: rgb(110, 173, 255);
    $remainTask: rgb(209, 209, 209);
    $popupBg: rgba(235, 235, 235, 0.815);
    $shadow: rgba(3, 3, 3, 0.527);
    $arrow: rgba(3, 3, 3, 0.300);

    html, body {
        margin: 0;
        display: block;

        h1 {
            margin: 0;
        }

        h2 {
            margin: 0;
        }

        h3 {
            margin: 0;
        }

        p {
            margin: 0;
        }
    }

    #app {
        font-family: "Roboto", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #19222c;
        margin: 0 30px;
    }

    .page-head {
        text-align: center;
        display: block;
        h1 {
            margin: 15px 0;
        }
    }



    .t-container {
        width: 100%;
        overflow-y: visible;
        border: $border-color solid .2px;
        animation: fadeIn 1s;

        .t-head {
            display: flex;
        }

        .t-left-task {
            width: 100%;
            min-width: 230px;
            border: solid $border-color 1px;
            animation: fadeIn 1s;

            .task-header {
                border: solid $border-color 1px 0px 0px 1px;

                h1 {
                    font-size: 25px;
                    vertical-align: middle;
                    line-height: 46px;
                    text-align: center;
                }
            }

            &.activity-name {
                height: 35px;
            }

            &.task-name {
                height: 35px;
                vertical-align: middle;
                line-height: 35px;
                text-indent: 2.5rem;
                color: #637688;
            }

            .activity-group {
                vertical-align: middle;
                line-height: 35px;

                .task-collapse {
                    cursor: pointer;

                    &.collapse-symbol {
                        margin:0 15px;
                        transform: translateY(55%);
                        background-color: $border-color;
                        color: white;
                        width: 15px;
                        height: 15px;
                        font-size: 15px;
                        border-radius: 100%;
                    }
                    h3 {
                        text-align: center;
                        vertical-align: middle;
                        line-height: 15px;
                    }
                }
            }
        }

        .t-body {
            animation: fadeIn 0.5s;
            .t-body-task-menu {
                display: flex;
                height: 30;
                width: 100%;
            }

            .t-right-task-date {
                position: relative;
            }
        }

        .t-right-date {
            position: relative;

            .t-month {
                width: 70px;
                min-width: 59px;
                max-width: 150px;
                border: solid $border-color 1px;

                h2 {
                    text-align: center;
                    font-size: 18px;
                    font-weight: normal;
                    vertical-align: middle;
                    line-height: 46px;
                }
            }

            .t-current-date {
                position: absolute;
                height: 94%;
                border: solid $currentdate 1px;
                z-index: 0;

                .popuptext {
                    left: 10%;
                    background-color: darken($progress-bar, 5);
                }

                .popuptext::after {
                    left: 50%;
                }
            }

            .popup {
                position: relative;
                display: inline-block;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                border-radius: 15px;

                .popuptext {
                    overflow: visible;
                    width: 160px;
                    background-color: $popupBg;
                    color: rgb(92, 92, 92);
                    text-align: center;
                    border: rgba(3, 3, 3, 0.527) solid 0.1px;
                    box-shadow:0px 0px 5px $shadow;
                    border-radius: 6px;
                    padding: 8px 0;
                    position: absolute;
                    bottom: 150%;
                    left: 50%;
                    margin-left: -80px;
                    animation: slideDown 0.25s;

                    &::after {
                        content: "";
                        position: absolute;
                        top: 100%;
                        left: 50%;
                        margin-left: -5px;
                        border-width: 5px;
                        border-style: solid;
                        border-color: $arrow transparent transparent transparent;
                    }

                    .color-cicle {
                        width: 10px;
                        height: 10px;
                        border-radius: 100%;
                        transform: translateY(56%);
                        margin: 0 .2rem;

                        &.r-currentdate {
                            background-color: $currentdate;
                        }
                        &.r-progress {
                            background-color: $progress-bar;
                        }
                        &.r-overdue {
                            background-color: $overdue-bar;
                        }
                        &.r-remain {
                            background-color: $remainTask;
                        }
                    }
                }
            }
            //All TaskBar Base Style
            .t-task-bar {
                position: absolute;
                transform: translateY(27%);
                height: 22px;
                border-radius: 15px;
                text-align: center;
                //Progress Bar Style *Green Bar
                &.t-task-progress {
                    background-color: $progress-bar;
                }
                &.t-task-coming {
                    background-color: $progress-bar;
                }
                //Overdue Bar Style *Red Bar
                &.t-task-overdue {
                    background-color: $overdue-bar;
                }
                //Remaining Bar Style *Grey Bar
                &.t-remain-progress {
                    border-radius: 0 15px 15px 0;
                    background-color: $remainTask;
                }
            }
        }
    }

    .footer {
        position: relative;

        .right-comments {
            position: absolute;
            right: 3vw;
        }

        .comment-group {
            margin: 0 .5rem;
        }
    }

    .color-cicle {
        width: 10px;
        height: 10px;
        border-radius: 100%;
        transform: translateY(56%);
        margin: 0 .2rem;

        &.r-currentdate {
            background-color: $currentdate;
        }
        &.r-progress {
            background-color: $progress-bar;
        }
        &.r-overdue {
            background-color: $overdue-bar;
        }
        &.r-remain {
            background-color: $remainTask;
        }
        }

    .flex-div {
        display: flex;
    }
    @-webkit-keyframes fadeIn {
        from {opacity: 0;}
        to {opacity: 1;}
    }

    @keyframes fadeIn {
        from {opacity: 0;}
        to {opacity:1 ;}
    }

    @keyframes fadeOut {
        from {opacity: 1;}
        to {opacity:0 ;}
    }

    @keyframes slideDown {
        from {bottom: 200%; opacity: 0;}
        to {bottom: 150%; opacity:1 ;}
    }
</style>
