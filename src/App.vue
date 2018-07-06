<template>
  <div class="scobki" id="app">   
    <app-panel :url="url" :decode="decode" @search7emit="search" @onclick7insps7search7photos="onclick_insps_search_photos"></app-panel>
    <app-table :url="url" :inspections="inspections" :results="results" ></app-table>
  </div>
</template>

<script>
import Table from "./Table.vue";
import Panel from "./Panel.vue";
  export default {  
    props: ['url'], 
    data () { return {inspections:[], decode:[] , results:1 } },
    components: { 'app-table': Table,'app-panel': Panel },
    mounted() {
       $.post(this.url+"/?action=getinspections_photos&json=1&get_params","", data => {
          window.decode = this.decode = eval("[" + data + "]")[0].Codes;
       }); 
    },
    methods: {
      search(){ $.post(this.url+"/?action=getinspections_photos&json=1","From=02.06.2018&Till=02.07.2018&authorityall=CA&district_temp=1&district=0&ports_temp=0&ports=0&type=-1&held=0&detention=0&Page=0", this.searchHandler); },
      onclick_insps_search_photos (data) {
        window.data=data;
        console.log(data)
        var a = ''
        Object.keys(data).forEach(e=>{
          a=a+e+"="+data[e]+"&";
        })
        var tab = $('.table_vue');
        tab.hide();
        $.post(this.url+'/?action=getinspections_photos&json=1',a, this.searchHandler)
        tab.fadeIn(800);
      },
      searchHandler(data) {
        /*axios.post("./?action=getinspections_photos&ajax=1", 
        "From=28.05.2018&Till=28.06.2018&authorityall=0&district_temp=1&district=0&ports_temp=0&ports=0&type=-1&detention=0&Page=0")
        .then(function (res) {console.log("stage1=>", res);}) */
        window.dat = eval("[" + data + "]")[0];
        if(window.dat.Inspections.Found==0){
            this.results = 0;
            this.inspections = [];
        }else{
          data = dat.Inspections.Inspection;
          data = data.map( e => {
            try {
              e.Row = parseInt(e.Row);
              e.InspDateOfSubmit  = new Date(e.InspDateOfSubmit) .toLocaleDateString();
              e.InspDateOfInspect = new Date(e.InspDateOfInspect).toLocaleDateString(); 
              this.decode.Ports.Port.forEach( dec => {if (dec.Code == e.InspPort) e.Render_Place = dec.Name })
              this.decode.Flags.Flag.forEach( dec => {
                if (dec.Code == e.InspAuthority) {e.Render_Place_Title = e.Render_Place + " (" + dec.Name + ")";
                  e.Render_Place = e.Render_Place + " (" + dec.Code + ")";}
                if (dec.Code == e.ShipFlagCode) {e.ShipFlagCode_Render = dec.Code;e.ShipFlagCode_Render_Title = dec.Name;}
              }) 
            } catch (err) { return; }
            return e; 
          }); 
          this.results = 1;
          this.inspections = data;  
        }
      }
    }
  }
</script>
 


 