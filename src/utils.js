import moment from "moment";
/**
 * Created by mengmengchen on 17/9/23.
 */

export function newId() {
  return String(Date.now());
};

export function getUrlParams(url = window.location.href) {
  let parts = url.split('?');
  let argsStr = parts[1].split('&');
  let ret = {};
  argsStr.map(argStr => {
    let items = argStr.split('=');
    ret[items[0]] = items[1];
  });
  return ret;
}

export function validateDate(date) {
  return !!new Date(date).getDate();
}

export function durationMinutes(start, end) {
  let delta = moment(end) - moment(start);
  if (delta <= 0) return 0;
  return Math.ceil(delta/(60*1000));
}
