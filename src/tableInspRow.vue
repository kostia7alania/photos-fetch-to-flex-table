<template>
    <div>        
              <div class="row_head table-head">
                <div class="grow0">#</div>
                <div class="grow2">Date of Inspection</div>
                <div class="grow2">Submitted</div>
                <div class="grow2">Place</div>
                <div class="grow2">IMO number</div>
                <div class="grow3">Ship Name</div>
                <div class="grow2">Callsign</div>
                <div class="grow2">MMSI</div>
                <div class="grow2">Flag</div>
                <div class="grow2">Deficiencies</div>
                <div class="grow2">Detention</div>
              </div>
              <div v-for="(insp,ind) in orderedInspections" v-bind:key="ind">
                <app-table-insp-row-col :insp="insp" :ind="ind" :decode="decode" :url="url" :Page='Page' :perPage='perPage'></app-table-insp-row-col>
              </div>
    </div> 
</template>

<script>
import tableInspRowCol from "./tableInspRowCol.vue";  
export default {
  components: {  'app-table-insp-row-col': tableInspRowCol },
  props: ['decode',   'url', 'inspections','Page', 'perPage'],
  watch:    {},
  computed: { orderedInspections: function(){ return  _.orderBy(this.inspections,'Row');  } }

}
</script>
 