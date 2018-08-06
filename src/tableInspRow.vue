<template>
    <div>   
              <div class="row_head" :class="{odd:ind%2, even:!(ind%2)}" @click="showModal=!showModal">
                <!-- фоллоуАППы =>--> <!--<td style="text-align: center;"><img v-if="insp.InspType==0" :src="url+'/img/initial.png'" /><img v-if="insp.InspType==1" :src="url+'/img/followup.png'" /><input type="hidden" :value="insp.InspUID" /> </td>-->
                <div class="grow1"> {{ ind + ( (Page)*perPage) +1 }} </div>
                <div class="grow1"> {{insp.InspDateOfSubmit}} </div>
                <div class="grow1"> {{insp.InspDateOfInspect}} </div>
                <div class="grow1" :title="insp.Render_Place_Title"> {{insp.Render_Place}}</div>
                <div class="grow1"> {{insp.ShipIMO}}</div>
                <div class="grow1"> {{insp.ShipName}}</div>
                <div class="grow1"> {{insp.ShipCallsign}}</div>
                <div class="grow1"> {{insp.ShipMMSI}}</div>
                <div class="grow1" :title="insp.ShipFlagCode_Render_Title"> {{insp.ShipFlagCode_Render}}</div>
                <div class="grow1"> {{insp.InspDeficiencies}}</div>
                <div class="grow1"> {{insp.InspDetention>0?"yes":'no'}} </div>
              </div>
              <transition name="slide-fade">
                <app-table-insp-row-image :decode="decode" :url="url" :insp="insp" :InspUID="insp.InspUID">Photo..</app-table-insp-row-image>
              </transition> 
    </div> 
</template>

<script>
import tableInspRowImage from "./tableInspRowImage.vue";  
export default {
  components: {  'app-table-insp-row-image': tableInspRowImage },
  props: ['decode', 'Page', 'perPage', 'url', 'insp', 'ind'],
  watch: {
    insp: function(newVal, oldVal) { // watch it
     // console.log('perPage changed: ', newVal, ' | was: ', oldVal, 'this:', this)
      window.newVal=newVal; window.oldVal=oldVal;
      let oldV = Object.getOwnPropertyNames(oldVal);
      let newV = Object.getOwnPropertyNames(newVal);
      this.showModal = oldV.every(e=>typeof oldVal[e] != 'object' ? oldVal[e] == newVal[e]:1) ? this.showModal : 0 //закрываем панель,если фотка в ней изменилась;)
    }
  },
  data(){ return { showModal: false } }
}
</script>

<style scoped>
/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
.slide-fade-enter-active {   transition: all .3s ease;  }
.slide-fade-leave-active {   transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);  }
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.row_hover:hover{       background: #006798e3 !important }
.even:hover,.odd:hover{ background: red; color: black  }
</style>
