<template>
  <div class="  color_white bg-darkblue">
            <div v-viewer="{ movable: true,  url: 'data-original'}" @inited="e=>console.log('inited1')"  ref="viewer">  
              <div v-for="(file,i) in file2"  class="row_head center table-def-row-col " :key="i"  :class="{oddk3:i%2, evenk3:!(i%2)}" >
                <div class="grow1">  </div>  
                <div class="grow1"><b>Nature Code:</b> {{file.FullNatureCode | natureFilter}}   </div>  
                <div class="grow1"><b>Nature:</b> {{file.FullNatureName}}</div>  
                 <div class="grow3"><b>Remark:</b> {{file.Remarks}}</div>
                <div class="grow3"><b>Comment:</b> {{file.Comments}}</div>
               !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
               !
               !
               !
               
                 <app-table-def-row-col-image-row-open-modal :file="file"></app-table-def-row-col-image-row-open-modal>
                
              </div>
            </div>  
    </div>
</template>

<script>

import tableDefRowColImageRowOpenModal from "./tableDefRowColImageRowOpenModal.vue";
export default { 
  components: {'app-table-def-row-col-image-row-open-modal': tableDefRowColImageRowOpenModal},
  props: ['file2'],
  data(){ return { }},
  filters: {
    natureFilter(e){return ''+e.length==4?'0'+e:e;}//to string:)
  }
}
</script> 