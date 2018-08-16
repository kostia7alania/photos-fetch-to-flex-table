<template>
  <div class="  color_white bg-darkblue">
     <div v-viewer="{ movable: true,  url: 'data-original'}" @inited="e=>console.log('inited1')" class="" ref="viewer"> 
          <transition-group> 
              <div v-if="status==1" :key="'def_row'">
                <div class="row_head table-head table-def-row-col-head center"> 
                  <div class="grow1">Submitted</div>
                  <div class="grow1">Date of Inspect</div>
                  <div class="grow1">Place</div>
                  <div class="grow1">IMO Number</div>
                  <div class="grow1">Ship Name</div>
                  <div class="grow1">Ship Flag</div>
                  <div class="grow3">Remarks</div>
                  <div class="grow2">Photo</div>
                </div>   
                <div v-for="(file,i) in def"  class="row_head center table-def-row-col " :key="i" >
                  <div class="grow1">{{new Date (file.DateOfSubmit).toLocaleDateString('RU')}}</div>
                  <div class="grow1">{{new Date (file.DateOfInspect).toLocaleDateString('RU')}}</div>
                  <div class="grow1">{{`${file.InspAuthName} (${file.InspAuthCode})`}}</div>
                  <div class="grow1">{{file.IMO}}</div>  
                  <div class="grow1">{{file.ShipName}}</div>  
                  <div class="grow1">{{`${file.ShipFlagName} (${file.ShipFlagCode})`}}</div> 
                  <div class="grow3">{{file.Remarks}}</div>
                  <div class="grow2 def-imgs">
                    <img :data-original="'https://apcis.tmou.org/pictures/real/'+file.FileName"
                                          :alt="`<div> 
                                                  <p><b>Date of inspect:</b> ${new Date (file.DateOfInspect).toLocaleDateString('RU')}</p>
                                                  ${`<p><b>Place:</b> ${file.InspAuthName}</p>`}
                                                  ${`<p><b>Ship Flag:</b> ${file.ShipFlagName}</p>`}
                                                  ${`<p><b>IMO:</b> ${file.IMO}</p>`}
                                                  ${`<p><b>ShipName:</b> ${file.ShipName}</p>`}
                                                  ${file.Remarks.trim().length>0?'<p><b>Remarks:</b> '+file.Remarks+'</p>':''}
                                                  ${file.Comments.trim().length>0?'<p><b>Comments:</b> '+file.Comments+'</p>':''}
                                                </div>
                                              `"
                                        :src="'https://apcis.tmou.org/pictures/small/'+file.FileName"
                      /> 
                  </div>
                </div>
              </div> 
              <div v-if="status==0"><h1>loading... Please, wait...</h1></div>
              <div v-if="status==2">Error while fetching photos.</div>
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
  props: ['group', 'ind', 'data' , 'url', /*'decode', 'deficiencies'*/],
  watch: { },
  data(){ return { 
    def:[],
    status: 0 //-1 -> init; 0 -> loading; 1-success; 2-error;
  }},
  mounted() {
    this.status = 0; // loading
    axios.post(`${this.url}group=${this.group}`, qs.stringify(this.data))
    .then( res => {
        window.res = res;
        console.log('this !!!',this)
        this.def = res.data[0][0].Record.map(e=>e["@attributes"])
        this.status = 1; // success
    })
    .catch(e=>{console.log(e); this.status = 2;}) // error
  },
  methods:{
    codeGroupViewHandler: e => e>0 && e<100?`0${e}00`:`${e}00`, 
  }, 
  computed: { }
}
</script>
<style>
.strong {font-weight: 777;}
</style>

 