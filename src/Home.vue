<template>
    <div>
        <template v-if="!ongoingTask.id">
            <br>
            <div>创建记录类型：</div>
            <RadioGroup v-model="typeSelect" type="button" size="large">
                <Radio :label="types.LEFT">
                    <span>＋左</span>
                </Radio>
                <Radio :label="types.RIGHT">
                    <span>＋右</span>
                </Radio>
                <Radio :label="types.BOTH">
                    <span>＋左右</span>
                </Radio>
                <Radio :label="types.DIAPERS">
                    <span>＋尿布</span>
                </Radio>
                <Radio :label="types.BOTTLE">
                    ＋奶瓶
                </Radio>
            </RadioGroup>

            <template v-if="Object.keys(types).indexOf(typeSelect) >= 0">
                <br>
                <div>选择开始时间：</div>
                <datetime :value="startTime"
                          @pick-date-time="pickStartDateTime"
                ></datetime>
            </template>

            <template v-if="types.BOTTLE == typeSelect">
                <br>
                <div>喝奶容量（ml）：</div>
                <InputNumber :max="1000" :min="1" v-model="volume" style="width: 5rem;"></InputNumber>
                <ButtonGroup size="large">
                    <Button icon="ios-plus-empty" @click="add"></Button>
                    <Button icon="ios-minus-empty" @click="minus"></Button>
                </ButtonGroup>
            </template>

            <template v-if="Object.keys(types).indexOf(typeSelect)>= 0">
                <div>
                    <br>
                    <Button type="success" @click="createRecord">确认创建</Button>
                    <Button type="error" @click="reset">确认取消</Button>
                </div>
            </template>
        </template>
        <template v-else>
            <div style="text-align: center">
                <div>未完成的记录:</div>
                <div><span class="time">{{ ongoingTask.start_at }}</span> 开始
                    <span class="action">{{ typeDesc[ongoingTask.type] }}</span>,
                    <span class="status">{{ongoingTaskStatus.status}}</span>...
                    已经 <span class="duration">{{ongoingTaskStatus.elapsedMinutes}} min</span>了。
                </div>
                <div>
                    <Progress :percent="ongoingTaskStatus.percent" status="active" style="max-width: 30%;"
                              hide-info></Progress>
                </div>
                <div>选择结束时间：</div>
                <datetime :value="endTime"
                          @pick-date-time="pickEndDateTime"></datetime>
                <div>
                    <br>
                    <Button type="success" @click="endRecord">确认结束</Button>
                    <Button type="error" @click="confirmReset">取消记录</Button>
                </div>
            </div>
        </template>

        <div>
            <a href="/record/list">查看记录列表</a>
        </div>
        <div>
            <a href="javascript:void(0);" @click="rename">修改宝宝姓名</a>
        </div>
    </div>

</template>

<script>
    import Component from 'vue-class-component'
    import {mapState} from "vuex";
    import Vue from 'vue';
    import {types} from "./models/constants"
    import Datetime from "./components/DateTime.vue"
    import {validateDate} from "./utils"
    import {Record} from "./models/Record";
    import moment from "moment";
    import {mutations} from "./models/constants";
    import {mapMutations} from "vuex/dist/vuex.esm";
    import {typeDesc} from "./models/constants";
    import {storageMixin} from "./storageMixin";
    import {durationMinutes} from "./utils";

    @Component({
        components: {
            Datetime,
        },
        mixins: [storageMixin],
        watch: {
            typeSelect(val) {
                if (!val) return;
                this.startTime = moment().format('YYYY-MM-DD HH:mm:ss');
            },
            ongoingTask(val) {
                if (!val.id) return;
                this.startCounter();
                this.endTime = '';
            }
        },
    })
    export default class Home extends Vue {

        types = types;
        typeDesc = typeDesc;

        ongoingCounter = null;
        ongoingDuration = 0;

        typeSelect = '';
        startTime = '';
        endTime = '';
        volume = 120;

        mounted() {
            window.home = this;
            window.moment = moment;
        }

        pickStartDateTime(val) {
            this.startTime = val;
        }
        
        pickEndDateTime(val) {
            this.endTime = val;
        }

        add() {
            if (this.volume >= 995) return;
            this.volume += 5;
        }

        minus() {
            if (this.volume <= 5) return;
            this.volume -= 5;
        }

        get ongoingTaskStatus() {
            if (!this.ongoingTask.id) {
                return {
                    status: '－－',
                    elapsedMinutes: 0,
                    percent: 0,
                }
            } else {
                let duration = this.ongoingDuration;
                let percent = Math.ceil(duration / 30 * 100);
                if (percent > 100) percent = 100;
                return {
                    status: duration < 35 ? '进行中' : '已超时',
                    elapsedMinutes: duration,
                    percent,
                }
            }
        }

        startCounter() {
            this.ongoingCounter && clearInterval(this.ongoingCounter);
            this.ongoingCounter = setInterval(() => {
                this.ongoingDuration = Math.ceil((moment() - moment(this.ongoingTask.start_at)) / (60 * 1000));
            }, 1000);
        }

        createRecord() {
            if (!validateDate(this.startTime)) {
                this.$Message.error('日期时间格式不对');
                console.log('日期时间格式不对');
                return;
            }
            if (Object.keys(this.types).indexOf(this.typeSelect) == -1) {
                console.log('需要选择类型');
                return;
            }
            let record = new Record();
            record.type = this.typeSelect;
            record.start_at = this.startTime;
            if ([this.types.LEFT, this.types.RIGHT, this.types.BOTH].indexOf(this.typeSelect) >= 0) {
                this.setOngoingTask(record);
            } else if ([this.types.DIAPERS].indexOf(this.typeSelect) >= 0) {
                this.addRecord(record);
            } else if ([this.types.BOTTLE].indexOf(this.typeSelect) >= 0) {
                record.volume = this.volume;
                this.addRecord(record);
            }
            this.saveAll();
            this.$Message.success('创建成功！');
            this.reset();
        }

        reset() {
            this.typeSelect = '';
            this.startTime = '';
            this.volume = 120;
        }

        confirmReset() {
            if (confirm('确认取消进行中的记录?')) {
                this.setOngoingTask({});
                this.reset();
            }
        }

        endRecord() {
            if (!validateDate(this.endTime)) {
                this.$Message.error('日期时间格式不对');
                console.log('日期时间格式不对');
                return;
            }

            if (durationMinutes(this.startTime, this.endTime) > 35) {
                let ok = confirm('如果时间超过35min,是否起始时间正常?');
                if (!ok) {
                    return;
                }
            }
            let record = this.ongoingTask;
            record.end_at = this.endTime;
            this.addRecord(record);
            this.setOngoingTask({});
            this.reset();
            this.saveAll();
            this.$Message.success('记录已经结束，请在记录列表查看');
        }

        rename() {
            this.$Modal.confirm({
                render: (h) => {
                    return h('Input', {
                        props: {
                            value: this.babyName,
                            autofocus: true,
                            placeholder: '请输入宝宝姓名...'
                        },
                        on: {
                            input: (val) => {
                                this.babyRename(val);
                            }
                        }
                    })
                }
            })
        }
    }
</script>

<style>
    .icon {
        width: 6em;
        height: 6em;
        font-size: 2em;
        border: 1px darkblue solid;
        border-radius: 1em;
        text-decoration: none;
    }

    .time {
        color: darkgreen;
    }

    .action {
        color: darkgoldenrod;
    }

    .status {
        color: darkblue;
    }

    .duration {
        color: rebeccapurple;
    }
</style>
