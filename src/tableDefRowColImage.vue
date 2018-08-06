<template>
  <div class="  color_white v-viewer-pos bg-darkblue">
     <div v-viewer="{ movable: true,  url: 'data-original'}" @inited="e=>console.log('inited1')" class="viewer" ref="viewer">
          <transition v-if="def.FileName=='' || def.FileName.length<1 "  name="modal">NO PHOTOS!!</transition>
          <transition-group v-else>
            <div v-for="(src,i) in def.FileName" :key="i"> 
              <img :data-original="'https://apcis.tmou.org/pictures/real/'+src"
                :alt="`<div><b>#</b> ${i+1}</div>`"
                :src="'https://apcis.tmou.org/pictures/small/'+src"
                data-color="#eee" data-text="Small quality image"
                style="max-width: 100%" 
              /><p><span class="strong">#</span> {{i+1}}</p>
        </div>
      </transition-group> 
    </div>
  </div>
</template>

<script>  
//import lbx from "./lightbox_tpl_test.vue";  

  const axios = require('axios');
 const qs = require('qs');
export default {
  //components: {  'app-lbx': lbx},
  props: ['def', 'ind', 'data' , 'url', /*'decode', 'deficiencies'*/],
  watch: { },
  data(){ return {  } },
  methods:{
    codeGroupViewHandler: e => e>0 && e<100?`0${e}00`:`${e}00`, 
  },
/*  mounted: function () {
      let posting = this.data;
      posting.Group = this.def.Group; 
      axios.post(`${this.url}`, qs.stringify(posting)).then( res => {
        console.log(res);
      });
  },*/
  computed: { }
}
</script>
<style>
.strong {font-weight: 777;}
</style>

 