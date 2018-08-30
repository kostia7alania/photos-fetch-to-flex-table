<template>
  <div> 
      <transition-group name="fadeLeft" > 
        <h1 :key="'key0'">Deficiencies</h1>
        <app-table-def-row v-if="defAttrs.status==1"  :key="'key3'" :decode="decode" :defsTable="defsTable" :url="url" :data="data"></app-table-def-row> 
        <h1 v-if="defAttrs.status==-1 || defAttrs.status==1 && this.defsTable.length==0" :key="'key1'">Nothing found in the filter of deficiencies</h1>
        <h1 v-if="defAttrs.status==0"  :key="'key4'">Loading......</h1> 
        <h1 v-if="defAttrs.status==2"  :key="'key2'">Error while performing the search......</h1> 
    </transition-group> 
  </div>
</template>

<script>  
import tableDefRow from "./tableDefRow.vue";  
export default {
  components: {'app-table-def-row': tableDefRow},
  props: ['decode', 'url', 'defsTable', 'defAttrs', 'data'],
  data(){ return { } }  
}
</script>
 
