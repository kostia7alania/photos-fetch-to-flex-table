<template>
          <div>
            <div class="row_head" :class="{oddk:ind%2, evenk:!(ind%2)}" @click="showModal=!showModal" key="'k1'" >
              <div class="grow0">{{ind+1}}</div>
              <div class="grow1">{{ codeGroupViewHandler( def[0].Group ) }}</div>
              <div class="grow3">{{def[0].Name}}</div>
              <div class="grow2">{{def[0].Defs}}</div>
              <div class="grow1">{{def[0].Photos}}</div>
            </div>
              <template v-if="showModal">
                <def-row-col-image
                  v-show="def[0].Photos>0"
                  :group="def[0].Group"
                  :ind="ind"
                />
                <h1 v-show="def[0].Photos==0">No photos!</h1>
              </template>
          </div>

</template>

<script>
export default {
  components: {
    "def-row-col-image": () => import("./DefRowColImage.vue")
  },
  props: ["def", "ind"],
  data() {
    return { showModal: false };
  },
  methods: {
    codeGroupViewHandler: e => (e > 0 && e < 100 ? `0${e}00` : `${e}00`)
  }
};
</script>

