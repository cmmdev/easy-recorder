import {mapState} from "vuex";
import storage from "./storage";
import {mapMutations} from "vuex/dist/vuex.esm";
import {mutations} from "./models/constants";

export const storageMixin = {
  computed: {
    ...mapState([
      'records',
      'ongoingTask',
      'babyName',
    ]),
  },
  methods: {
    ...mapMutations({
      addRecord: mutations.ADD_RECORD,
      setRecords: mutations.SET_RECORDS,
      removeRecord: mutations.REMOVE_RECORD,
      setOngoingTask: mutations.SET_ONGOING_TASK,
      babyRename: mutations.BABY_RENAME,
      saveAll: mutations.SAVE_ALL,
    }),
  },
  mounted() {
    let {records, ongoingTask, babyName} = storage.get();
    this.setRecords(records);
    this.setOngoingTask(ongoingTask);
    this.babyRename(babyName);
  }
}