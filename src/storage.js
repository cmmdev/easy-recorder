/**
 * Created by mengmengchen on 17/9/23.
 */

import {Record} from "./models/Record"

const KEY = 'local_storage_records';


function localSave(val) {
  window.localStorage.setItem(KEY, val);
}

function localGet() {
  return window.localStorage.getItem(KEY);
}

function save({records, ongoingTask, babyName}) {
  localSave(JSON.stringify({
    records,
    ongoingTask,
    babyName,
  }));
}

function get() {
  let str = localGet();
  if (!str) {
    return {
      babyName: '陈崭岩',
      records: [],
      ongoingTask: {},
    }
  } else {
    let {
      babyName,
      records,
      ongoingTask
    } = JSON.parse(str);
    return {
      babyName,
      records: records.map(item=>new Record(item)),
      ongoingTask: ongoingTask.id ? new Record(ongoingTask) : {},
    }
  }
}

export default {
  save,
  get
}