<template>
  <div class="table_vue">
        <transition-group name="fadeLeft" tag="div" >

          <div v-if="insp_status /*searchby=='insp' && inspAttrs.status>-1*/ " :key="'key_insp'">
            <app-table-insp
              @navClick="navClick"
              @perPageEmit="perPageEmit"
            />
          </div>

          <div v-if="def_status /*searchby=='def' && defAttrs.status>-1*/ " :key="'key_def'">
            <app-table-def :defAttrs="defAttrs"  />
          </div>
        </transition-group>

  </div>
</template>

<script>
export default {
  components: {
    insp: () => import("./def/Def"),
    def: () => import("./insp/insp")
  },
  computed: {
    insp_status() {
      return this.$store && this.$store.state.INSP_ATTRS.status > -1;
    },

    def_status() {
      return this.$store && this.$store.state.DEF_ATTRS.status > -1;
    },

    searchby() {
      return this.$store && this.$store.state.FORM.searchby;
    }
  },
  methods: {
    perPageEmit(e) {
      this.$emit("perPageEmit", e);
    },
    navClick(e) {
      this.$emit("navClick", e);
    }
  },
  mounted: function() {}
};
</script>