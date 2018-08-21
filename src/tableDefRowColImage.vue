<template>
  <div class="  color_white bg-darkblue">
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
            <app-table-def-row-col-image-row  v-for="(file, i) in def" :file="file" :key="i" :i="i" :file2="file"></app-table-def-row-col-image-row>
          </div> 

          <div v-if="status==0" :key="'def_loading'"><h1>loading... Please, wait...</h1></div>
          <div v-if="status==2" :key="'def_error'">Error while fetching photos.</div>
        </transition-group> 
    </div>
</template>

<script>    
const axios = require('axios');
const qs = require('qs'); 
import tableDefRowColImageRow from "./tableDefRowColImageRow.vue";  
 
export default {
   components: {'app-table-def-row-col-image-row': tableDefRowColImageRow},
  props: ['group', 'ind', 'data' , 'url', /*'decode', 'deficiencies'*/],
  watch: { },
  data(){ return { 
    def:[],
    showModal:0,
    status: 0 //-1 -> init; 0 -> loading; 1-success; 2-error;
  }},
  mounted() {
    this.status = 0; // loading
    axios.post(`${this.url}group=${this.group}`, qs.stringify(this.data))
    .then( res => {
      window.res = res;
      let record = res.data[0][0].Record;        
      let ddd = Object.getOwnPropertyNames(record).includes("@attributes")?[record['@attributes']] : record.map(e=>e["@attributes"]);
          ddd = _.groupBy(ddd, e => e.InspUID)
        this.def = Object.getOwnPropertyNames(ddd).map(e=>ddd[e])
        window.def = this.def;
        this.status = 1; // success
    })
    .catch(e=>{console.log(e); this.status = 2;}) // error
  },
  methods:{
     codeGroupViewHandler: e => e>0 && e<100?`0${e}00`:`${e}00`, 
  }, 
  computed: {
    
  }
}
</script>
<style>
.strong {font-weight: 777;}
</style>

 
 