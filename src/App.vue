<template>
  <div class="scobki" id="app">
    <app-panel :url="url" :decode="decode" :Page="inspAttrs.Page" :inspAttrs="inspAttrs" :defAttrs="defAttrs"
               :perPage="perPage" @searchFromPanel="searchFromPanel" @upSendData="getSentData"></app-panel>
    <app-table 
      :data="data" :clonedDifData="clonedDifData"
      :decode='decode'
      :inspAttrs="inspAttrs" :defAttrs="defAttrs"
      :url="url" 
      :defsTable="defsTable"
      :inspections="inspections" 
      :Found="inspAttrs.Found" :Page="inspAttrs.Page" :perPage="perPage" 
      @navClick="navClick" @perPageEmit="perPageEmit"
    ></app-table> 
  </div>
</template>

<script>  
 //const qs = require('qs');
import Table from "./Table.vue";
import Panel from "./Panel.vue"; 
import { downloadFile } from "./download_file.js";  
export default {
    components: { 'app-table': Table, 'app-panel': Panel},
    props: ['url'], 
    data () {
      return {
        showModal:    false,
        inspections:  [],
        defsTable:   [], //изменить!
        decode:       {}, 
        inspAttrs:    {Found:0,Page:0,status:-1, exportExcelStatus:1},//-1 - indicates that we have not searched yet!; 0 - loading; 1 - ready; 2-err
        defAttrs:     {Found:0,Page:0,status:-1},//-1 - indicates that we have not searched yet!; 0 - loading; 1 - ready; 2-err
        perPage:      25,
        clonedDifData: {},
        //clonedInspData: {},
        data:         {searchby:'insp', def_nature:0} //заполняется динамически;
        
      }
    },
    computed: { },
    beforeMount(){console.log('before moiunt')},
    mounted() {
     this.axios.post(this.url+"GetCodesAll=1")
      .then(res=> { 
        let dec = res.data; window.decode = dec;
        if(typeof dec=='object') this.decode = dec;
        else console.log('=>error while getting "decode" => ', dec)
      });
    },
    methods: {
      perPageEmit(perPage){ 
        this.data.perPage = this.perPage = perPage;
        this.onclick_insps_search_photos();
      },
      navClick(nextPage){
        this.data.Page = nextPage;
        this.onclick_insps_search_photos();
      },
      //search(){ $.post(this.url+"json=1","From=02.06.2018&Till=02.07.2018&authorityall=CA&district_temp=1&district=0&ports_temp=0&ports=0&type=-1&held=0&detention=0&Page=0", this.searchHandler); },
      getSentData(data){
        console.log('APP.VUE: getSentData()'); 
        this.data = data;
      },
      searchFromPanel(data){
        console.log('typeof data',typeof data);
        if(typeof data == 'object'){
          this.data = data;
          this.onclick_insps_search_photos();
        } else if(typeof data == 'string'){

          if(data=='excel'){  
            this.inspAttrs.exportExcelStatus=0; // loading
            this.axios.post(`${this.url}excel=1`, Object.getOwnPropertyNames(this.data).map(e=>e+"="+this.data[e]).join('&') /*qs.stringify(this.data)*/)
            .then( res => {
              console.log(this, res);
              if(res.headers["content-type"].match('excel')){
                let file = res.data;
                let filename = res.headers["filename"]?res.headers["filename"]:'Inspection photos report.xls';
                let mimetype = res.headers["content-type"];
                this.inspAttrs.exportExcelStatus=1;//ready
                downloadFile(file, filename, mimetype);                
              }
              else { this.inspAttrs.exportExcelStatus=2; }//error
            }).catch(e=>this.inspAttrs.exportExcelStatus=2)//error
          };

          if(data=='stop'){ 
            console.log('pressed STOP.!.')
          };

        } else console.log('unexpected datetype of data-prop in App->searchFromPanel(date)');
      },
      changeStatus(e, searchby = this.data.searchby){
        if(searchby=='insp') { this.inspAttrs.status=e; if(e==2) this.inspections=[];} // чистим деф или инсп при ошибке;
        if(searchby=='def' ) { this.defAttrs .status=e; if(e==2) this.defsTable  =[];}  // чистим деф или инсп при ошибке;        
      },
      onclick_insps_search_photos () {  
        window.data=this.data;          console.log('onclick_insps_search_photos() => ', data);
        this.changeStatus(0); 
        let searchby = this.data.searchby; // searchby - передаю для параллельного поиска (до завершения запроса и началом его обработкой юзер может переключить режим insp/def;;;
        this.axios.post(this.url, Object.getOwnPropertyNames(this.data).map(e=>e+"="+this.data[e]).join('&') /*qs.stringify(this.data)*/).then( res => this.searchHandler(res.data, searchby) );
      },
      insps_parse_tranform(w, searchby){
            try {
              let e = w["@attributes"]; 
              e.Row = parseInt(e.Row);
              let toRuDate = w => new Date(w).toLocaleDateString('ru-RU');
              e.InspDateOfSubmit  = toRuDate(e.InspDateOfSubmit);
              e.InspDateOfInspect = toRuDate(e.InspDateOfInspect);
              this.decode.Ports.Port.forEach( dec => {dec = dec["@attributes"]; if (dec.Code == e.InspPort) e.Render_Place = dec.Name })
              this.decode.Flags.Flag.forEach( dec => {dec = dec["@attributes"];
                if (dec.Code == e.InspAuthority) {
                  e.Render_Place_Title = e.Render_Place + " (" + dec.Name + ")";
                  e.Render_Place       = e.Render_Place + " (" + dec.Code + ")";}
                if (dec.Code == e.ShipFlagCode) {
                  e.ShipFlagCode_Render       = dec.Code;
                  e.ShipFlagCode_Render_Title = dec.Name;}
              });
              return e;
            } catch (e) { this.changeStatus(2, searchby); console.log('errooooorr==',e); } // error
      },
      searchHandler(dat, searchby = this.data.searchby) {
       console.log('searchHandler(dat)', dat, typeof dat, this)  
        if( typeof  dat == 'object' ){ //пришел норм ответ (объект)
          if(searchby=='insp'){
            this.inspAttrs.Found = parseInt(dat["@attributes"].Found);
            this.inspAttrs.Page  = parseInt(dat["@attributes"].Page);
            if(this.inspAttrs.Found==0){this.inspections = [];}
            else this.inspections = this.inspAttrs.Found==1 ? [this.insps_parse_tranform( dat.Inspection, searchby )] : dat.Inspection.map( ee => this.insps_parse_tranform( ee ) )
          } else {//def
            this.clonedDifData = this.data;
            this.defsTable = dat;
          } 
          this.changeStatus(1, searchby); //ready
        } else {// пришла ошибка
          this.changeStatus(2, searchby);//change status + clear insp/def []'s;
        }        
      }
    }
  }
</script>
 
<style lang="scss">

@import './styles/styles_table.scss';
@mixin pnt(){ color: white; background: red; cursor: pointer; }
.table_vue,
#menu{min-width: 900px} /*main menu of APCIS:) */
#tabs {overflow: visible !important;} /* tabs of APCIS:)  */
.row_head.table-head,
.panelContainer {
  position: sticky;
  &.row_head{top: 50px;z-index: 221;}
  &.panelContainer{top: 0px;z-index: 222;}
}

img.ui-datepicker-trigger {cursor:pointer;}
.marg0{ margin: 0px; }
.oddk {background-color: #24638a;
      &>*{color: white !important;};
      &:hover{@include pnt();}
}
.evenk {
  background-color: #4d7b9c;
  &:hover{@include pnt();} 
  &>*{color: white !important;};
} 

.oddk2  {    background: #00679870;cursor: pointer;border: 2px solid #00679870;}
.evenk2 { background: #1f96d070; cursor:pointer; border: 2px solid #1f96d070 }
.oddk3  { background: #0a9fcaa6; cursor:pointer }
.evenk3 { background: #5cb85c9c; cursor:pointer }

/* Анимации появления и исчезновения могут иметь */ 
/* различные продолжительности и динамику.       */
.slide-fade-enter-active {   transition: all .3s ease;  }
.slide-fade-leave-active {   transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);  }
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active до версии 2.1.8 */ { transform: translateX(10px); opacity: 0; } 

.shiftx-enter-active, .shiftx-leave-active {  transition: all 2s ease-in-out;   } 
.shiftx-enter, .shiftx-leave-to        /* .fade-leave-active below version 2.1.8 */   { transform: translateX(100px); } 
</style>
 
 