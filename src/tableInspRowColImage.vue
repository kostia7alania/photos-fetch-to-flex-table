<template> 
  <div class="bg-darkblue">
    <transition-group name="modal">  
      <div :key="'inspView'" v-if="images.length>0 && status==1"  v-viewer="{ movable: true,  url: 'data-original'}" @inited="e=>console.log('inited1')" class="viewer-insp"  ref="viewer">
          <div v-for="(item, index) in images" class="viewer-insp-row"  :key="index">
            <app-table-insp-row-col-image-open :item="item" :decode="decode"></app-table-insp-row-col-image-open>
          </div>  
      </div> 
      <p class="color_white fs30" v-if='images.length==0&&status==1' :key="'photosNot'">Photos not found...</p>
      <p class="color_white fs30" v-if='status==0' :key="'PhotosLoading'">Loading...</p>
      <p class="color_white fs30" v-if='status==2' :key="'ErrLoad'">Error loading photos.</p> 
    </transition-group>  

  </div>
</template>

<script>
import tableInspRowColImageOpen from "./tableInspRowColImageOpen.vue";  
  
export default {  
  components: {  'app-table-insp-row-col-image-open': tableInspRowColImageOpen    },
  props:['InspUID', 'insp','url', 'decode'],
  data(){ return { 
      images: [],
      status: 0
    } },
  methods:  {  },
  computed: { },
  mounted: function () {

    this.status = 0; // loading
    this.axios.post(`${this.url}get_ph_by_inspUID=1&InspUID=${this.insp.InspUID}`)
    .then( res => {
      let otv = res.data.row;
            if   ('FileName' in otv) this.images.push( otv )
            else otv.forEach(  e  => this.images.push(e) );
            this.status = 1; // success
    })
    .catch(e=>{console.log('catch get_ph_by_inspUID => ', e); this.status = 2;}) 
  }
}
</script>
 
 