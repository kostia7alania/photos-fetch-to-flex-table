<template>  
    <div :class='{"oddk2": (i%2),"evenk2":!(i%2)}'>
                    <div @click="showModal=!showModal"  class="row_head center table-def-row-col " >
                      <div class="grow1">{{new Date (file[0].DateOfSubmit).toLocaleDateString('RU')}}</div>
                      <div class="grow1">{{new Date (file[0].DateOfInspect).toLocaleDateString('RU')}}</div>
                      <div class="grow1">{{`${file[0].InspAuthName} (${file[0].InspAuthCode})`}}</div>
                      <div class="grow1">{{file[0].IMO}}</div>  
                      <div class="grow1">{{file[0].ShipName}}</div>  
                      <div class="grow1">{{`${file[0].ShipFlagName} (${file[0].ShipFlagCode})`}}</div> 
                      <div class="grow3">{{file[0].Remarks}}</div>
                      <div class="grow2 def-imgs">{{file.length}} photos</div>
                    </div>
                    <template v-if="showModal">
                      <app-table-def-row-col-image-row-open :file2="file"></app-table-def-row-col-image-row-open>
                       <h1 v-if="file.length==0">No photos!</h1>
                    </template>
    </div>     
</template>

<script>    
import tableDefRowColImageRowOpen from "./tableDefRowColImageRowOpen.vue";  
export default {
  components: {'app-table-def-row-col-image-row-open': tableDefRowColImageRowOpen},
  props: ['file', 'i', /* 'url', /*'decode', 'deficiencies'*/],
  watch: { },
  data(){ return { 
    def:[],
    showModal:0,
    status: 0 //-1 -> init; 0 -> loading; 1-success; 2-error;
  }},
  mounted() { 
  },
  methods:{ }, 
  computed: {
    
  }
}
</script>
<style>
.strong {font-weight: 777;}
</style>

 
 