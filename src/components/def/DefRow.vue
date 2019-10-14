<template>
    <div>
              <div class="row_head table-head">
                <div class="grow0">#</div>
                <div class="grow1">Code</div>
                <div class="grow3">Nature of deficiencies</div>
                <div class="grow2">No. of deficiencies</div>
                <div class="grow1">No. of photos</div>
              </div>
              <def-row-col
                  v-for="(def,ind) in defsTable"
                  :key="ind"
                  :def="def" :ind="ind"
              />
    </div>
</template>

<script>
export default {
  components: { "def-row-col": () => import("./DefRowCol.vue") },
  computed: {
    defsTable() {
      return this.$store && this.$store.state.DEFS_TABLE;
    }
  }
};
</script>
