<template>
  <div> 
      <transition-group name="fadeLeft" >
      <h1 v-if="defLength" :key="'key1'">Nothing found in the filter of deficiencies</h1>
      <div v-else :key="'key2'">  
        <h1>Deficiencies</h1>
        <h1 v-if="defAttrs.status==0">Loading......</h1> 
        <app-table-def-row v-if="defAttrs.status==1" :decode="decode" :defsTable="defsTable" :url="url" :data="data"></app-table-def-row> 
        <h1 v-if="defAttrs.status==2">Error while performing the search......</h1> 
      </div>

    </transition-group> 
  </div>
</template>

<script>  
import tableDefRow from "./tableDefRow.vue";  
export default {
  components: {'app-table-def-row': tableDefRow},
  props: ['decode', 'url', 'defsTable', 'defAttrs', 'data'],
  data(){ return { } },
  methods:{ },
  computed: {
    defLength(){return typeof this.defsTable == 'undefined' || this.defsTable.length==0?1:0;}
  },
  mounted: function () {} 
}
</script>
 
