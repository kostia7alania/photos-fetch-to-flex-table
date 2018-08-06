<template> 
  <div>
    <transition v-if="images.length>0" name="modal"> 
  <div> 
      <div v-viewer="{ movable: true,  url: 'data-original'}" @inited="e=>console.log('inited1')" class="viewer" ref="viewer">
          <div v-for="(item, index) in images" :key="index">
            <app-table-insp-row-image-open :item="item" :decode="decode"></app-table-insp-row-image-open>
          </div>  
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
import tableInspRowImageOpen from "./tableInspRowImageOpen.vue";  
  
export default {  
  components: {  'app-table-insp-row-image-open': tableInspRowImageOpen    },
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
 

<style  lang="scss">
.viewer {    
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
}
.viewer > div { width: 200px; }
$wt : white;
$tr : rgba(0,0,0,0.1);
@mixin white (){ color:$wt !important;}  
.fs30 {font-size:30px;}
.v-viewer-pos{
  padding: 10px  0px 10px 0px;
  img { padding-bottom: 10px; }
}

.color_white{
  @include white ();
    * { @extend .color_white; } 
}
 
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.viewer-title {
  white-space: unset;
  padding: 10px;
  line-height: 1.5;
  color: $tr;
  * {   
    @include white ();
    font-size: 16px;
  }
}
</style>
