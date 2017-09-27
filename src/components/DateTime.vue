<template>
    <div class="block">
        <TimePicker format="HH:mm:ss" :value="time" @on-change="handleTimeChange" placeholder="选择时间"
                    style="width: 112px"></TimePicker>
        <DatePicker type="date" :value="date" @on-change="handleDateChange" placeholder="选择日期"
                    style="width: 200px"></DatePicker>
        <Button @click="setNow">Set Now</Button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import moment from "moment"

    @Component({
        props: {
            value: '',
        },
        watch: {
            value(val) {
                let mValue = moment(val);
                this.date = mValue.format('YYYY-MM-DD');
                this.time = mValue.format('HH:mm:ss');
            },
            date(val) {
                val = val || moment().format('YYYY-MM-DD');
                let time = this.time || '00:00:00';
                let value = `${val} ${time}`;
                this.$emit('pick-date-time', value);
            },
            time(val) {
                val = val || moment().format('HH:mm:ss');
                let date = this.date || moment().format('YYYY-MM-DD');
                let value = `${date} ${val}`;
                this.$emit('pick-date-time', value);
            }
        }
    })
    export default class DateTime extends Vue {
        // data
        date = '';
        time = '';

        mounted() {
            this.time = moment(this.value).format('HH:mm:ss');
            this.date = moment(this.value).format('YYYY-MM-DD');

            window.dateTime = this;
            window.moment = moment;
        }

        // method
        handleTimeChange(date) {
            this.time = date;
        }

        handleDateChange(date) {
            this.date = date;
        }

        setNow() {
            this.time = moment().format('HH:mm:ss');
            this.date = moment().format('YYYY-MM-DD');
        }
    }
</script>

<style>
</style>
