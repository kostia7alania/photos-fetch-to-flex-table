<template>
  <div>
    <div class="row_head table-head">
      <div class="grow0">#</div>
      <div class="grow1">Date of Inspection</div>
      <div class="grow1">Submitted</div>
      <div class="grow2">Place</div>
      <div class="grow1">IMO number</div>
      <div class="grow3">Ship Name</div>
      <div class="grow1">Callsign</div>
      <div class="grow1">MMSI</div>
      <div class="grow1">Flag</div>
      <div class="grow1">Deficiencies</div>
      <div class="grow1">Photos</div>
      <div class="grow1">Detention</div>
    </div>
    <div v-for="(insp,ind) in orderedInspections" v-bind:key="ind">
      <insp-row-col :insp="insp" :ind="ind"/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "insp-row-col": () => import("./InspRowCol.vue")
  },
  props: ["inspections", "Page", "perPage"],
  watch: {},
  computed: {
    inspections() {
      return this.$store && this.$store.state.INSPECTIONS;
    },

    orderedInspections() {
      return require("lodash").orderBy(this.inspections, "Row");
    }
  }
};
</script>
