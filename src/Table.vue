<template>
  <div class="table_vue"> 
      <div> 

        <transition-group name="fadeLeft" > 

          <div v-if="data.searchby=='insp' && inspAttrs.status>-1" :key="'key_insp'">
            <app-table-insp :decode="decode" :url="url" :inspAttrs="inspAttrs" :Page="Page" :perPage="perPage" :Found="Found" :inspections="inspections" @navClick="navClick" @perPageEmit="perPageEmit"></app-table-insp> 
          </div>

          <div v-if="data.searchby=='def' && defAttrs.status>-1" :key="'key_def'">
            <app-table-def :data="clonedDifData" :decode="decode" :defAttrs="defAttrs" :url="url" :deficiencies="deficiencies"></app-table-def> 
          </div> 

        </transition-group>

      </div>
    

  </div>
</template>

<script>   
import tableInsp from "./tableInsp.vue";  
import tableDef from "./tableDef.vue";  

export default {
  components: {  'app-table-insp': tableInsp ,'app-table-def': tableDef},
  props: ['url', 'inspections', 'Found', 'Page', 'perPage', 'data', 'clonedDifData','deficiencies', 'inspAttrs', 'defAttrs', 'decode'],
  data(){ return { } },
  methods:{
    perPageEmit(e){this.$emit('perPageEmit',e)},
    navClick(e){   this.$emit('navClick',   e)}
  },
  mounted: function () {} 
}
</script>