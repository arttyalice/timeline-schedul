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
                                        style=" transform: translateY(-10%); 
                                                -webkit-transform: translateY(-10%);
                                                -moz-transform: translateY(-10%);
                                                -o-transform: translateY(-10%);
                                                -ms-transform: translateY(-10%);
                                                font-size: 25px"
                                    >-</h3>
                                    <h3 
                                        v-else
                                        style=" transform: translateY(3%); 
                                                -webkit-transform: translateY(3%);
                                                -moz-transform: translateY(3%);
                                                -o-transform: translateY(3%);
                                                -ms-transform: translateY(3%);
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
                            v-if="calOverdueDay(activity) > 0 && activityOverDueStatus[index]"
                            class="t-task-bar t-task-overdue popup" 
                            v-bind:style="{width: calTaskOverdueEnd(activity.startDate, activity.endDate)+'%', left: progressStart(activity.startDate)+'%' }"
                            v-on:mouseover="mouseOverActivityShowOverdue(activity._id)"
                            v-on:mouseleave="mouseExitActivity"
                        >
                            <span class="popuptext" id="myPopup" 
                                v-if="mouseOverActivityOverdue === activity._id && mouseOverActivityShow"
                            >
                                overdue {{calOverdueDay(activity)}} days.
                            </span>
                        </div>

                        <div 
                            class="t-task-bar t-task-progress popup"
                            v-bind:style="{ width: progressEnd(activity.startDate, activity.endDate)+'%',left: progressStart(activity.startDate)+'%' }"
                            v-on:mouseover="mouseOverActivityShowTotal(activity._id)"
                            v-on:mouseleave="mouseExitActivity"
                        >
                            <span class="popuptext" id="myPopup" 
                                v-if="mouseOverActivityTotal && activeActivity === activity._id"
                            >
                                total {{calTotalDay(activity)}} days.
                            </span>
                        </div>
                        
                        <div 
                            class="t-task-bar t-remain-progress popup" 
                            v-if="calDay(activity.endDate) > calDay(new Date())"
                            v-on:mouseover="mouseOverActivityShowRemain(activity._id)"
                            v-on:mouseleave="mouseExitActivity"
                            v-bind:style="{width: calLaterEnd(activity)+'%', left: calCurrentDay+'%'}"
                        >
                            <span class="popuptext" id="myPopup" 
                                v-if="mouseOverActivityRemain && activeActivity === activity._id"
                            >
                                {{calDayRemain(activity.endDate)}} days remain.
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
                                v-if="calOverdueDay(task) > 0 && !task.status"
                                class="t-task-bar t-task-overdue popup" 
                                v-bind:style="{width: calTaskOverdueEnd(task.startDate)+'%', left: progressStart(task.startDate)+'%'}"
                                v-on:mouseover="mouseOverOverdue(task._id)"
                                v-on:mouseleave="mouseExitTask"
                            >
                                <span class="popuptext" id="myPopup" v-if="mouseOverOverdueShow && activeTask === task._id"
                                >overdue {{calOverdueDay(task)}} days.</span>
                            </div>
                            
                            <div 
                                class="t-task-bar t-task-progress popup" 
                                v-bind:style="[{width: progressEnd(task.startDate, task.endDate)+'%', left: progressStart(task.startDate)+'%'}]"
                                v-on:mouseover="mouseOverTotal(task._id)"
                                v-on:mouseleave="mouseExitTask"
                            >
                                <span 
                                    class="popuptext" id="myPopup" 
                                    v-if="mouseOverTotalShow && activeTask === task._id && calTotalDay(task) > 0"
                                >total {{calTotalDay(task)}} days.</span>
                            </div>

                            <div 
                                class="t-task-bar t-remain-progress popup" 
                                v-if="calDay(task.endDate) > calDay(new Date())"
                                v-on:mouseover="mouseOverRemain(task._id)"
                                v-on:mouseleave="mouseExitTask"
                                v-bind:style="[calTotalDay(task) > 0] ? [{width: progressEnd(task.startDate, task.endDate)+'%', left: progressStart(task.startDate)+'50%', },borderRadius] : {width: calLaterEnd(task)+'%', left: calCurrentDay+'%'}"
                            >
                                <span class="popuptext" id="myPopup" 
                                    v-if="mouseOverRemainShow && activeTask === task._id"
                                >
                                    {{calDayRemain(task.endDate)}} days remain.
                                </span>
                            </div>
                            
                            <div class="t-current-date" v-bind:style="{left: calCurrentDay+'%'}">
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

            this.getYears()
        },
        data() {
            return {
                months: [],
                company: '',
                title: '',
                activeActivity: null,
                activeTask: null,
                collapseShow: [],
                Popupshow: false,
                mouseOverTotalShow: false,
                mouseOverOverdueShow: false,
                mouseOverRemainShow: false,
                mouseOverActivityTotal: false,
                mouseOverActivityOverdue: false,
                mouseOverActivityRemain: false,
                activityOverDueStatus: [],
                days: null,
                oneDay: 86400000,
                modDate: new Date(),
                borderRadius: {
                    'border-radius': '15px'
                },
                lastDay: null,
                firstDay: null
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
                var now = this.$moment(task)
                var day = now.diff(this.firstDay, 'days')
                return parseInt(day)
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

                return (day / this.days * 100) - startDate
            },
            calTaskOverdueEnd(taskStart) {
                var day = this.calDay(new Date())
                var startDate = this.progressStart(taskStart)

                return (day / this.days * 100) - startDate
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
            mouseOverTotal(id) {
                this.mouseOverTotalShow = true
                this.activeTask = id
            },
            mouseOverOverdue(id) {
                this.mouseOverOverdueShow = true
                this.activeTask = id
            },
            mouseOverRemain(id) {
                this.mouseOverRemainShow = true
                this.activeTask = id
            },
            mouseExitTask() {
                this.mouseOverTotalShow = false
                this.mouseOverOverdueShow = false
                this.mouseOverRemainShow = false
            },
            mouseOverActivityShowTotal(id) {
                this.mouseOverActivityTotal = true
                this.activeActivity = id
            },
            mouseOverActivityShowOverdue(id) {
                this.mouseOverActivityOverdue = true
                this.activeActivity = id
            },
            mouseOverActivityShowRemain(id) {
                this.mouseOverActivityRemain = true
                this.activeActivity = id
            },
            mouseExitActivity() {
                this.mouseOverActivityTotal = false,
                this.mouseOverActivityOverdue = false
                this.mouseOverActivityRemain = false
            },
            async callDaysInYear(years) {
                var seen = []
                var out = []
                var len = years.length
                var j = 0;

                for(var i in years) {
                    var item = this.$moment(years[i]).format()
                    if(seen[item] !== 1) {
                        seen[item] = 1
                        out[j++] = item
                    }
                }

                out.sort()

                let diff1 = this.$moment([new Date(out[0]).getFullYear(), new Date(out[0]).getMonth(), 1], 'YYYY MM DD')
                let diff2 = this.$moment([new Date(out[out.length-1]).getFullYear(), new Date(out[out.length-1]).getMonth(), 31], 'YYYY MM DD')
                this.days = diff2.diff(diff1, 'days')
                this.days += 30
                this.lastDay = this.$moment([new Date(out[out.length-1]).getFullYear(), new Date(out[out.length-1]).getMonth(), 31])
                this.firstDay = this.$moment([new Date(out[0]).getFullYear(), new Date(out[0]).getMonth(), 1])

                let loop1 = this.$moment(out[0]).format('M')
                let loop2 = this.$moment(out[out.length-1]).diff(diff1, 'months')+parseInt(loop1)
                let mTmp = [
                    "Jan '", 
                    "Feb '", 
                    "Mar '", 
                    "Apr '", 
                    "May '", 
                    "Jun '", 
                    "Jul '", 
                    "Aug '", 
                    "Sep '", 
                    "Oct '", 
                    "Nov '",
                    "Dec '",
                ]
                var yearTmp = new Date(out[0]).getFullYear()
                var i = parseInt(loop1)
                var x = parseInt(loop2)
                console.log(yearTmp)
                for(i; i <= x; i++) {
                    if(i == 12) {
                        this.months = this.months.concat(mTmp[i - 1] + yearTmp.toString().substring(2,4))
                        x -= i
                        i = 1
                        yearTmp += 1
                    }
                    this.months = this.months.concat(mTmp[i - 1] + yearTmp.toString().substring(2,4))
                }
            },
            getYears() {
                var totalYear = []
                var years = []
                var updateDate = []

                for(var i in this.activitys) {
                    this.OverdueActivityArray(i)

                    for(var index in this.tasks) {
                        if(this.tasks[index].activityId == this.activitys[i]._id) {
                            this.OverdueActivity(this.tasks[index], i)
                            years.push(new Date(this.tasks[index].endDate))
                            years.push(new Date(this.tasks[index].startDate))
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
            }
        }
    };
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway');
    $border-color: rgb(240, 240, 240);
    $progress-bar: #3FBA8A;
    $overdue-bar: #AC1818;
    $currentdate: #6D8DF3;
    $remainTask: #E8E8E8;

    html, body {
        animation: fadeIn 1.5s;
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
        font-family: "Raleway", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #19222c;
        text-align: center;
        display: block;
    }

    .page-head {
        text-align: center;
        display: block;
        h1 {
            margin: 15px 0;
        }
    }



    .t-container {
        display: inline-block;
        max-width: 100%;
        overflow-x: scroll;
        overflow-y: auto;
        border: $border-color solid .2px;

        .t-head {
            display: flex;
        }

        .t-left-task {
            width: 320px;
            border: solid $border-color 1px;
            animation: slideDown 0.3s;

            .task-header {
                border: solid $border-color 1px 0px 0px 1px;
                width: 320px;

                h1 {
                    font-size: 22px;
                    vertical-align: middle;
                    line-height: 46px;
                    text-align: center;
                }
            }

            &.activity-name {
                font-size: 16px;
                height: 35px;
                width: 320px;
            }

            &.task-name {
                font-size: 16px;
                height: 35px;
                width: 320px;
                vertical-align: middle;
                line-height: 35px;
                text-indent: 4.5rem;
                color: #546677;
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
            .t-body-task-menu {
                display: flex;
                height: 30;
            }

            .t-right-task-date {
                animation: fadeIn 1s;
                position: relative;
            }
        }

        .t-right-date {
            position: relative;
            animation: slideDown 0.3s;
            .t-month {
                width: 100px;
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
            }

            .popup {
                position: relative;
                display: inline-block;
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            /* The actual popup */
            .popup .popuptext {
                width: 135px;
                background-color: $progress-bar;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 8px 0;
                position: absolute;
                bottom: 125%;
                left: 50%;
                margin-left: -67.5px;
                animation: slideDown 0.2s;

                &::after {
                    content: "";
                    position: absolute;
                    top: 95%;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px;
                    border-style: solid;
                }
            }
            //All TaskBar Base Style
            .t-task-bar {
                position: absolute;
                transform: translateY(50%);
                height: 19px;
                border-radius: 15px;
                text-align: center;
                //Progress Bar Style *Green Bar
                &.t-task-progress {
                    background-color: $progress-bar;

                    //Progress Bar Popup
                    .popuptext {
                        background-color: darken($progress-bar, 0);

                        &::after {
                            border-color: $progress-bar transparent transparent transparent;
                        }
                    }
                }
                &.t-task-coming {
                    background-color: $progress-bar;

                    //Progress Bar Popup
                    .popuptext {
                        background-color: darken($progress-bar, 0);

                        &::after {
                            border-color: $progress-bar transparent transparent transparent;
                        }
                    }
                }
                //Overdue Bar Style *Red Bar
                &.t-task-overdue {
                    background-color: $overdue-bar;

                    //Overdue Bar Popup
                    .popuptext {
                        background-color: darken($overdue-bar, 0);

                        &::after {
                            border-color: $overdue-bar transparent transparent transparent;
                        }
                    }
                }
                //Remaining Bar Style *Grey Bar
                &.t-remain-progress {
                    border-radius: 0 15px 15px 0;
                    background-color: $remainTask;
                    //Remaining Bar Popup
                    .popuptext {
                        background-color: darken($remainTask, 0);

                        &::after {
                            border-color: $remainTask transparent transparent transparent;
                        }
                    }
                }
            }
        }
    }

    .footer {
        position: relative;
        width: 100%;
        .right-comments {
            position: absolute;
            right: 3vw;
        }

        .comment-group {
            margin: 0 .5rem;
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

    @keyframes slideDown {
        from {opacity: 0; transform: translateY(-100%)}
        to {opacity: 1; transform: translateY(0%)}
    }
</style>
