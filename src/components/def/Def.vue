<template>
      <transition-group name="fadeLeft" tag="div">

        <h1 :key="'key0'">Deficiencies</h1>

        <def-row
          v-if="defAttrs.status==1"
          :key="'key3'"
        />

        <h1 v-if="elem_computed" :key="'key1'">{{elem_computed}}</h1>

    </transition-group>
</template>

<script>
export default {
  components: { "def-row": () => import("./DefRow.vue") },
  data() {
    return {
      elems: [
        "Nothing found in the filter of deficiencies",
        "Loading......",
        "Error while performing the search......"
      ]
    };
  },
  computed: {
    defsTable() {
      return this.$store && this.$store.state.DEFS_TABLE;
    },
    defAttrs() {
      return this.$store.state && this.$store.state.DEF_ATTRS;
    },
    elem_computed() {
      if (
        this.defAttrs.status == -1 ||
        (this.defAttrs.status == 1 && this.defsTable.length == 0)
      )
        return this.elems[0];
      else if (this.defAttrs.status == 2) return this.elems[1];
      else if (this.defAttrs.status == 0) return this.elems[2];
    }
  }
};
</script>

