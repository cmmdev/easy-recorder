/**
 * Created by mengmengchen on 17/9/23.
 */

// 吃母乳 标记起始时间
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const BOTH = 'BOTH';
// 标记 喝奶ml
const BOTTLE = 'BOTTLE';
// 尿不湿
const DIAPERS = 'DIAPERS';

export const types = {
  LEFT,
  RIGHT,
  BOTH,
  BOTTLE,
  DIAPERS,
};

export const typeDesc = {
  [LEFT]: '吃左奶',
  [RIGHT]: '吃右奶',
  [BOTH]: '吃左右奶',
  [BOTTLE]: '吃奶瓶',
  [DIAPERS]: '换尿不湿',
};

// mutations
const ADD_RECORD = 'MUTATION_ADD_RECORD';
const REMOVE_RECORD = 'MUTATION_REMOVE_RECORD';
const SET_RECORDS = 'MUTATION_SET_RECORDS';
const SET_ONGOING_TASK = 'MUTATION_SET_ONGOING_TASK';
const BABY_RENAME = 'MUTATION_BABY_RENAME';
const SAVE_ALL = "MUTATION_SAVE_ALL";

export const mutations = {
  ADD_RECORD,
  REMOVE_RECORD,
  SET_ONGOING_TASK,
  BABY_RENAME,
  SET_RECORDS,
  SAVE_ALL,
}


