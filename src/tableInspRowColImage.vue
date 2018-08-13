<template> 
  <div class="bg-darkblue">
    <transition v-if="images.length>0" name="modal">  
      <div v-viewer="{ movable: true,  url: 'data-original'}" @inited="e=>console.log('inited1')" class="viewer-insp"  ref="viewer">
          <div v-for="(item, index) in images" class="viewer-insp-row"  :key="index">
            <app-table-insp-row-col-image-open :item="item" :decode="decode"></app-table-insp-row-col-image-open>
          </div>  
      </div>  
    </transition> 
    <transition v-if="images.length==0" name="modal"> 
      <p class="color_white fs30" v-if='error==0'>Loading...</p>
      <p class="color_white fs30" v-if='error==1'>Error loading photos.</p>
    </transition> 


  </div>
</template>

<script>
import tableInspRowColImageOpen from "./tableInspRowColImageOpen.vue";  
  
export default {  
  components: {  'app-table-insp-row-col-image-open': tableInspRowColImageOpen    },
  props:['InspUID', 'insp','url', 'decode'],
  data(){ return { 
      images: [],
      error: 0
    } },
  methods:  {  },
  computed: { },
  mounted: function () { 
    window.that = this;
    $.post( `${this.url}get_ph_by_inspUID=1`,
      { UID: this.insp.InspUID },
      otv => { //console.log('otvet=>>',d); window.d=d; 
        try{
          window.otv=otv;
          if('FileName' in JSON.parse(otv).row){ 
            let row = JSON.parse(otv).row; 
            this.images.push(row)
          } else {
            JSON.parse(otv).row.forEach( e => { 
              this.images.push(e)
            }); 
          }
          this.error=0;
        } catch(err) { console.log('Err img push => ',err); this.error=1; }
      }
    );
  }
}
</script>
 
 