<template>
  <div>   
      <transition-group name="fadeLeft" >
          <app-table-insp-navigate :key="'key0'" :Found="Found" :Page="Page" :perPage="perPage" @navClick="navClick" @perPageEmit="perPageEmit"></app-table-insp-navigate>
          <h1 :key="'key1'">Inspections</h1>
          <h1 v-if="inspAttrs.status==0" :key="'key2'">Loading......</h1> 
          <h1 v-if="inspAttrs.status == 1 && inspections.length == 0" :key="'key3'">Nothing found in the filter of inspections!</h1>
          <div v-if="inspAttrs.status == 1 && inspections.length > 0" :key="'key4'"> 

            <app-table-insp-row :inspections="inspections" :decode="decode" :url="url"  :Page='Page' :perPage='perPage'></app-table-insp-row>

          </div>
          <h1 v-if="inspAttrs.status == 2" :key="'key7'">Error while searching inspections!</h1>
      </transition-group>
    </div> 
</template> 
<script>
import tableInspNavigate from "./tableInspNavigate.vue"; 
import tableInspRow      from "./tableInspRow.vue";  

export default {
  components: { 'app-table-insp-navigate': tableInspNavigate, 'app-table-insp-row': tableInspRow },
  props: ['decode', 'Page', 'perPage', 'Found', 'url', 'inspections', 'inspAttrs'],
  data(){return {}},
    methods:{
    perPageEmit(e){this.$emit('perPageEmit',e)},
    navClick(e){   this.$emit('navClick',   e)}
  },
  mounted: function () {}
}
</script> 