<template>
  <div class="color_white bg-darkblue">
        <transition-group name="modal">
          <div v-if="IMAGES_BY_DEFS" :key="'def_row'">
            <div class="row_head table-head table-def-row-col-head center">
                <div class="grow1">Code</div>
                <div class="grow3">Nature</div>
                <div class="grow1">Submitted</div>
                <div class="grow1">Date of Inspect</div>
                <div class="grow2">Place</div>
                <div class="grow1">IMO Number</div>
                <div class="grow2">Ship Name</div>
                <div class="grow2">Ship Flag</div>
                <div class="grow2">Photo</div>
            </div>
            <def-row-col-image-row
              v-for="(file, i) in IMAGES_BY_DEFS"
              :file="file"
              :key="i"
              :i="i"
              :file2="file"
            />
          </div>

          <div v-if="loading" :key="'def_loading'"><h1>loading... Please, wait...</h1></div>
          <div v-if="error" :key="'def_error'">{{error_comp}}</div>
        </transition-group>
    </div>
</template>

<script>
export default {
  components: {
    "def-row-col-image-row": () => import("./DefRowColImageRow.vue")
  },
  props: ["group", "ind"],
  watch: {},
  data() {
    return {
      showModal: 0,
      loading: 1,
      error: null
    };
  },
  mounted() {
    const callback = (({ status, msg }) => {
      debugger;
      this.loading = false;
      if (!status) {
        this.error = msg || "Error while fetching photos."; // если неудачно, то выводим ошибку
      }
    }).bind(this);

    store._actions.GET_IMAGES_BY_DEFS({
      group: this.group,
      callback
    });
  },
  computed: {
    IMAGES_BY_DEFS() {
      return this.$store.state.IMAGES_BY_DEFS;
    },
    error_comp() {
      return this.error;
    }
  },
  methods: {
    codeGroupViewHandler: e => (e > 0 && e < 100 ? `0${e}00` : `${e}00`)
  }
};
</script>

