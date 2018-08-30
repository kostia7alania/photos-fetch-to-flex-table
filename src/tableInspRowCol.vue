<template>
    <div>      
                <div class="row_head" :class="{oddk:ind%2, evenk:!(ind%2)}" @click="showModal =! showModal">
                  <!-- фоллоуАППы =>--> <!--<td style="text-align: center;"><img v-if="insp.InspType==0" :src="url+'/img/initial.png'" /><img v-if="insp.InspType==1" :src="url+'/img/followup.png'" /><input type="hidden" :value="insp.InspUID" /> </td>-->
                  <div class="grow0"> {{ ind + ( (Page)*perPage) +1 }} </div>
                  <div class="grow1"> {{insp.InspDateOfInspect}} </div>
                  <div class="grow1"> {{insp.InspDateOfSubmit}} </div>
                  <div class="grow2" :title="insp.Render_Place_Title"> {{insp.Render_Place}}</div>
                  <div class="grow1"> {{insp.ShipIMO}}</div>
                  <div class="grow3"> {{insp.ShipName}}</div>
                  <div class="grow1"> {{insp.ShipCallsign}}</div>
                  <div class="grow1"> {{insp.ShipMMSI}}</div>
                  <div class="grow1" :title="insp.ShipFlagCode_Render_Title"> {{insp.ShipFlagCode_Render}}</div>
                  <div class="grow1"> {{insp.InspDeficiencies}}</div>
                  <div class="grow1"> {{insp.InspPictures}}</div>
                  <div class="grow1"> {{insp.InspDetention>0?"yes":'no'}} </div>
                </div> 
                <transition name="slide-fade">
                  <app-table-insp-row-col-image v-if="showModal" :decode="decode" :url="url" :insp="insp" :InspUID="insp.InspUID">Photo..</app-table-insp-row-col-image>
                </transition> 
    </div> 
</template>

<script>
import tableInspRowColImage from "./tableInspRowColImage.vue";  
export default {
  components: {  'app-table-insp-row-col-image': tableInspRowColImage },
  props: ['url','decode', 'insp','ind', 'Page', 'perPage'],
  data(){ return { showModal: false } },
  watch: {
    insp: function(newVal, oldVal) { // watch it
     // console.log('perPage changed: ', newVal, ' | was: ', oldVal, 'this:', this)
      window.newVal=newVal; window.oldVal=oldVal;
      let oldV = Object.getOwnPropertyNames(oldVal);
      let newV = Object.getOwnPropertyNames(newVal);
      this.showModal = oldV.every(e=>typeof oldVal[e] != 'object' ? oldVal[e] == newVal[e]:1) ? this.showModal : 0 //закрываем панель,если фотка в ней изменилась;)
    }
  }
}
</script>
 