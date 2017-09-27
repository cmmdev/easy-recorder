import {newId} from "../utils";
import {types} from "./constants";
import {durationMinutes} from "../utils";
import {typeDesc} from "./constants";

export class Record {
  constructor(obj) {
    this.id = obj ? obj.id : newId();
    this.start_at = obj ? obj.start_at : Date.now();
    this.end_at = obj ? obj.end_at: null;
    this.type = obj ? obj.type : types.LEFT;
    this.volume = obj ? obj.volume : 0;
  }

  asDict() {
    return {
      event: typeDesc[this.type],
      start_at: this.start_at,
      duration: this.end_at ? durationMinutes(this.start_at, this.end_at) + 'min' : '',
      volume: this.volume ? this.volume + "ml" : '',
    }
  }

}