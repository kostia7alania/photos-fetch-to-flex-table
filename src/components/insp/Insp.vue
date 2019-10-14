<template>
      <transition-group name="fadeLeft" tag='div'>
        <insp-navigate :key="'key0'"  />
        <h1 :key="'key1'">Inspections</h1>
        <h1 v-if="inspAttrs.status==0" :key="'key2'">Loading......</h1>
        <h1 v-if="inspAttrs.status == 1 && inspections.length == 0" :key="'key3'">Nothing found in the filter of inspections!</h1>
        <div v-if="inspAttrs.status == 1 && inspections.length > 0" :key="'key4'">
          <insp-row/>
        </div>
        <h1 v-if="inspAttrs.status == 2" :key="'key7'">Error while searching inspections!</h1>
      </transition-group>
</template>
<script>
export default {
  components: {
    "insp-navigate": () => import("./InspNavigate.vue"),
    "insp-row": () => import("./InspRow.vue")
  },
  props: [],
  computed: {
    inspAttrs() {
      return this.$store && this.$store.state.INSP_ATTRS;
    }
  }
};
</script>