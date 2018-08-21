<template>  
  <div class="panelContainer">
    <transition-group name="bounce" tag="div" class="panelContainerRow">
          <div class="searchBy" :key="'k1'">
            <fieldset> 
              <legend><label>Search by:</label></legend>
              <label><input type="radio"  @change="upSendData" v-model.trim="searchby" name="coffee" value="insp">Inspections</label>
              <label><input type="radio"  @change="upSendData" v-model.trim="searchby" name="coffee" value="def">Deficiency</label>
            </fieldset>
          </div>
          <!--<div class="defNature" :key="'k2'" v-if="searchby=='def'">  
                <label>Deficiency nature:</label>
                <select  v-model="def_nature"  @change="upSendData" class="input_select"  style="width:130px;">
                  <option value="0" selected="selected">-- select --</option>  
                  <option v-for="(def,ind) in def_nature_obj" :key="ind" :value="def.val">{{def.val>0 && def.val<100?`0${def.val}00`:`${def.val}00`}} - {{def.txt}}</option> 
                </select> 
          </div>-->
          <div class="searchFrom" :key="'k3'">
            <label>From:</label>
            <input class="input_select calend" name="From"  v-model="search_from"  style="width: 60px;" v-mask="'##.##.####'"/>
          </div>
          <div class="searchTill" :key="'k4'">
            <label>To:</label>
            <input class="input_select calend" name="Till" v-model="search_till" style="width: 60px;"  v-mask="'##.##.####'"/>
          </div>

          <div class="authoritySel" :key="'k5'">
            <label>Authority:</label> 
            <select v-model="authoritySel" class="input_select" name="authorityall"  @change="authSelHandler" style="width:130px;">
              <option value="0" selected="true">-- select --</option>  
              <option v-for="(auth,ind) in authorityAll" :key="ind" :value="auth.auth_val">{{auth.auth}}</option>
            </select> 
          </div>  
          <div class="districtSel" v-if="searchby=='insp'" :key="'k6'" >
            <label>District:</label> 
            <select v-model="districtSel" class="input_select" name="district" style="width:110px;">
              <option value="0" selected="selected">-- select --</option>  
              <option v-for="distr in districtAll" :key="distr.distr_val" :value="distr.distr_val">{{distr.distr}}</option>
            </select> 
          </div>   
<!--  old STYLE of input=> --> 
        <div class="portSel" v-if="searchby=='insp'" :key="'k7'">
          <label>Port:</label>  
          <select  class="input_select" name="port" v-model="portSel" @change="portSelHandler" style="width:110px;">
                <option value="0" selected="selected">-- select --</option> 
                <option v-for="(port,ind) in portAll" :key="ind" :class="port.port_class" :value="port.port_val">{{port.port}}</option>
          </select> 
        </div>   
<!-- => new style: =>
          <td style="overflow: initial;"><label>Port:</label> 
            <v-select :placeholder="'-- select --'" :on-change="portSelHandler2" :searchable="true" :options="portAll" label="port"></v-select> 
          </td>  
-->
          <div class="typeSel" v-if=" searchby=='insp' " :key="'k8'">
            <label>Type:</label> 
            <select v-model="typeSel" class="input_select" style="width:50px;">
              <option v-for="(typ,ind) in typeAll" :key="ind" :value="typ.val">{{typ.type}}</option>
            </select>
          </div>           
          <div class="heldSel" :key="'k9'">
            <label>Show:</label> 
            <select v-model="heldSel" class="input_select" style="width:80px;">
              <option v-for="(hel,ind) in heldAllComp" :key="ind" :value="hel.val">{{hel.type}}</option>
            </select>
          </div> 
           
          <div class="detentionSel" :key="'k10'" v-if="searchby=='insp'">
            <input type="checkbox" v-model="detentionSel" id="detentionSel" >
            <label for="detentionSel">Detention</label> 
          </div> 
           
          <div class="searchBtn" :key="'k11'">
            <button class="button is-warning" @click="searchFromPanel('search')"> {{searchBtnText}}</button>
            <button class="button is-warning" @click="searchFromPanel('cancel')" title="Cancel request">  Stop</button>
            <button class="button is-warning" @click="searchFromPanel('excel')" title="Export to Excel"> To Excel</button>
          </div> 
           
    </transition-group> 
  </div>
</template>
<script> 
//import vSelect from 'vue-select'; 
export default {
  props: ['url', 'decode','Page','perPage', 'inspAttrs', 'defAttrs'],
  components: { /*'v-select': vSelect */},
  data() {
    return {  
            searchby: 'insp',
            districtSel:0,
            authoritySel:0,
          radio: 'default',
          detentionSel: false,
          portAll:[],
          districtAll:[],
          heldSel:'0',
          heldAll: [ {type:'Held by Authority', val:0},
                     {type:'For Authority Flag',val:1}],
          typeSel: -1,
          typeAll: [ {type:'all',       val:-1},
                     {type:'initial',   val: 0},
                     {type:'follow-up', val: 1}],
          portSel: 0,
          def_nature: 0,
          MOU:'TMOU', 
          search_from:'',
          search_till:'' 
    }
  },
  methods: {
    upSendData(e){  
      console.log('upSendData(e)=>'+e);
      let excel = arguments.length>0 && arguments[0]=='excel'?1:0;
      this.data = {
        "From":         this.search_from,
        "Till":         this.search_till,
        "authorityall": this.authoritySel,
        "district":     this.districtSel,
        "ports":        this.portSel,
        "type":         this.typeSel,
        "held":         this.heldSel,
        "detention":    this.detentionSel?1:0,
        "Page":         0,//с кнопки - всегда с первой страницы начинаем;)
        "perPage":      this.perPage,
        "ports_temp":   0,
        "district_temp":1,
        "excel"        :excel,
        "searchby"     :this.searchby,
        "def_nature"   :this.def_nature
        }; 
        this.$emit('upSendData', this.data) 
  },  
  searchFromPanel(e){
    this.upSendData(e);
    console.log('searchFromPanel(e)=>',e);
    this.$emit('searchFromPanel', ['cancel','excel'].indexOf(e)>-1 ? e : this.data);    //если нажата кнопка поиск, то отправляем данные с форм, иначе - тексты соотв кнопок;
  },
  portSelHandler2(e){ 
    window.that = this
    window.ee = e;
    console.log('this-<',this,e);
    if( typeof e != 'undefined' && e != null){
      console.log( ' typeof e != "undefined" ', typeof e != "undefined")
      if( typeof e.port_val != 'undefined') {
        console.log(" typeof e.port_val != 'undefined'",typeof e.port_val != 'undefined');
        this.portSel = e.port_val     
      } else this.portSel = 0;
    } else this.portSel = 0; 
    this.portSelHandler(); 
    //if (typeof e != 'undefined') this.portSel = e.port_val 
    //else console.log('undef!')
  },
  authSelHandler(){
    console.log('this.authoritySel=>',this.authoritySel)
    if(this.authoritySel !=0 ){ this.districtSel=0; this.portSel=0;  }
      this.portAll_function();
      this.districtAll_function();
  },   
  districtAll_function(){
      const addToArr = (distr_Name, distr_ID) => a.push({ distr: distr_Name,   distr_val: distr_ID});
      let a = [];
      if (Object.getOwnPropertyNames(this.decode).includes('Districts')){
      /*this.decode.Districts.District
        .filter(el => el["@attributes"].Active == "yes" && 
                      el["@attributes"].MOU    == this.MOU )
        .forEach( distr => {
          this.portAll.forEach( port => {
              let exit = 0;
              a.forEach( s => { if(s.distr_val==distr.ID) exit = 1; }) //костыль -> дубли чеб не попадали в district;
              if (port.port_auth == distr.ID && exit != 1) {
                if (this.authoritySel == 0 ) addToArr (distr.Name, distr.ID); 
                else if (port.port_country == this.authoritySel) addToArr (distr.Name, distr.ID);  
              }
            })
        })  *///более изящно:   
    let test = this.decode.Districts.District
          .filter(distr =>  distr["@attributes"].Active == "yes" && 
                            distr["@attributes"].MOU    == this.MOU  &&
                            /*this.portAll.filter( port =>port.port_auth == distr.ID  &&
                                                        this.authoritySel == 0?1:
                                                        port.port_country == this.authoritySel?1:0
                            ).length */ //более изящно:
                            this.portAll.some(port => {

                              if(port.port_auth != distr["@attributes"].ID) {
                                 //console.log('1.1');
                                  return false } //не совпадают дистрикты
                              else if(this.authoritySel == 0 && this.portSel == 0){
                                ///console.log('1.2');
                                 return true} //ничего не выбрано при этом! (auth/port)
                              else if (this.authoritySel != 0 /*&& this.portSel == 0*/) {  //без второго условия вроде бы норм пашет,тогда посл условие - не нужно - перемудрил,чтоли)) ну,ладно! пока так.
                                if(this.authoritySel == port.port_country) {
                                  //console.log('2.1');
                                  return true} else {
                                    //console.log('2.2');
                                    return false} 
                              }else if (this.authoritySel == 0 && this.portSel != 0){
                                //console.log('3')
                                this.portAll.filter(port=>port.port_val==this.portSel) //делаем выборку (this.portSel->"PHBCD") из portAll: {port_val:"PHBCD", port_auth:"2", ...}, чтобы узнать port_auth(!)
                                        .some(port=>port.port_auth == distr.ID) ?1:0
                              } else {
                                //console.log('else')
                                if(this.authoritySel == port.port_country &&
                                  this.portAll.filter(port=>port.port_val==this.portSel).some(port=>port.port_auth == distr.ID)) {
                                    return true
                                } else {return false}
                              }
                            })
          );
          window.portAll = this.portAll
          window.authoritySel = this.authoritySel;
          test.forEach( distr => addToArr (distr["@attributes"].Name, distr["@attributes"].ID))
          console.log('test====',test);
      }
      this.districtAll = a;
    },
  portAll_function(){
      const addToArr = (port_Name,port_Code,port_Country,port_District) => {
        a.push( { port:        port_Name, 
                  port_val:    port_Code,
                  port_class:  'auth'+port_Country+(port_District!=''?' dist'+port_District:''),//потом удалить;)
                  port_country:port_Country,
                  port_auth:   port_District
        } );
      }
      let a = [ /*{port:"-- select --", port_val: 0} */ ]; 
      if (Object.getOwnPropertyNames(this.decode).includes('Ports')){
      //  this.decode.Ports.Port.forEach( port => { 
      //     if (port.MOU==this.MOU && port.Inherit==1 && port.Active=='yes' /* && typeof port.District != 'undefined'*/ ) {
      //       if(this.authoritySel == 0) addToArr(port.Name, port.Code, port.Country, port.District)  //добавим все порты;
      //       else if(port.Country == this.authoritySel)  addToArr(port.Name, port.Code, port.Country, port.District)
      //       } else console.log('Undefined port=>',port)
      //     });
      // NEW JS => ECMA 16 => 
        this.decode.Ports.Port
          .filter(el => el["@attributes"].Active == "yes" && el["@attributes"].Inherit == 1 && el["@attributes"].MOU == this.MOU )
          .forEach( el => {
            let port = el["@attributes"];
            if(this.authoritySel == 0) addToArr(port.Name, port.Code, port.Country, port.District)  //добавим все порты;
            else if(port.Country == this.authoritySel)  addToArr(port.Name, port.Code, port.Country, port.District)
          }); 
      }
      this.portAll = a;      
    }, 
    portSelHandler(){
      if( this.portSel !=0 || this.portSel !='undefined' ){
        let auth_m, dist_m;
        let test = this.portAll.filter(port => port.port_val==this.portSel);
        console.log('test',test);//много совпадений... хз!!!! должно быть 1 ??
        test.forEach(port => [auth_m, dist_m] = [port.port_country, port.port_auth] )
        //this.authoritySel = String(this.authoritySel.length)==2 ? auth_m : 0;
        console.log('');
        console.log('auth_m',auth_m,'dist_m',dist_m) 
        console.log('authoritySel',this.authoritySel,'districtSel',this.districtSel)
        if(this.portSel != 0){
            [this.authoritySel, this.districtSel] = [auth_m!=undefined ? auth_m:0, dist_m!=undefined ? dist_m:0];
        }
      }
      console.log('authoritySel',this.authoritySel,'districtSel',this.districtSel);
      this.districtAll_function();
    } 
  },
  watch: {
    decode: function (e) { this.authSelHandler(); console.log('декод -',e); }
  },
  mounted: function () {
    this.search_from = `${	String(new Date().getDate()).length==1?0+""+new Date().getDate():new Date().getDate()}.${	String  (new Date().getMonth()).length==1?0+""+new Date().getMonth():new Date().getMonth()}.${new Date().getFullYear()}`;
    this.search_till = `${	String(new Date().getDate()).length==1?0+""+new Date().getDate():new Date().getDate()}.${	String( (new Date().getMonth()+1) ).length==1?0+""+(new Date().getMonth()+1):new Date().getMonth()+1}.${new Date().getFullYear()}`;;
    //$('.calend').each( function ( ) { $(this).datepicker() })/*$('#getinspections button').button( )*/
  //  $('.calend').datepicker({onSelect: function(d,i){if(d !== i.lastVal){$(this).change();}}  });
  var pic = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8Zz4KCTxnIGlkPSJjYWxlbmRhcl8xXyI+CgkJPHBhdGggZD0iTTI5LjMzNCwzSDI1VjFjMC0wLjU1My0wLjQ0Ny0xLTEtMXMtMSwwLjQ0Ny0xLDF2MmgtNlYxYzAtMC41NTMtMC40NDgtMS0xLTFzLTEsMC40NDctMSwxdjJIOVYxICAgIGMwLTAuNTUzLTAuNDQ4LTEtMS0xUzcsMC40NDcsNywxdjJIMi42NjdDMS4xOTQsMywwLDQuMTkzLDAsNS42NjZ2MjMuNjY3QzAsMzAuODA2LDEuMTk0LDMyLDIuNjY3LDMyaDI2LjY2NyAgICBDMzAuODA3LDMyLDMyLDMwLjgwNiwzMiwyOS4zMzNWNS42NjZDMzIsNC4xOTMsMzAuODA3LDMsMjkuMzM0LDN6IE0zMCwyOS4zMzNDMzAsMjkuNzAxLDI5LjcwMSwzMCwyOS4zMzQsMzBIMi42NjcgICAgQzIuMjk5LDMwLDIsMjkuNzAxLDIsMjkuMzMzVjUuNjY2QzIsNS4yOTksMi4yOTksNSwyLjY2Nyw1SDd2MmMwLDAuNTUzLDAuNDQ4LDEsMSwxczEtMC40NDcsMS0xVjVoNnYyYzAsMC41NTMsMC40NDgsMSwxLDEgICAgczEtMC40NDcsMS0xVjVoNnYyYzAsMC41NTMsMC40NDcsMSwxLDFzMS0wLjQ0NywxLTFWNWg0LjMzNEMyOS43MDEsNSwzMCw1LjI5OSwzMCw1LjY2NlYyOS4zMzN6IiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHJlY3QgeD0iNyIgeT0iMTIiIHdpZHRoPSI0IiBoZWlnaHQ9IjMiIGZpbGw9IiNEODAwMjciLz4KCQk8cmVjdCB4PSI3IiB5PSIxNyIgd2lkdGg9IjQiIGhlaWdodD0iMyIgZmlsbD0iI0Q4MDAyNyIvPgoJCTxyZWN0IHg9IjciIHk9IjIyIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHJlY3QgeD0iMTQiIHk9IjIyIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHJlY3QgeD0iMTQiIHk9IjE3IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHJlY3QgeD0iMTQiIHk9IjEyIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHJlY3QgeD0iMjEiIHk9IjIyIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHJlY3QgeD0iMjEiIHk9IjE3IiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiBmaWxsPSIjRDgwMDI3Ii8+CgkJPHJlY3QgeD0iMjEiIHk9IjEyIiB3aWR0aD0iNCIgaGVpZ2h0PSIzIiBmaWxsPSIjRDgwMDI3Ii8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==';

  $('.calend').datepicker({      
    buttonImage: pic,
    buttonImageOnly: true,
    buttonText: "Select date",
    onSelect: function(d,i){if(d !== i.lastVal){$(this).change();}}
  });
    $('.calend').change( e => {
        if(e.target.name=='Till') this.search_till = e.target.value
        if(e.target.name=='From') this.search_from = e.target.value
    });
  },
  computed: {
    searchBtnText: function(){
      return this.searchby=='insp' && this.inspAttrs.status==0 ||
             this.searchby=='def'  && this.defAttrs.status ==0 ? 'Stop' : 'Search';
    },
    heldAllComp: function(){
      if ( this.authoritySel==0 ) {this.heldSel = 0; return [this.heldAll[0]]} else return this.heldAll;
    },
    authorityAll: function(){
      let a = [];
      if (Object.getOwnPropertyNames(this.decode).includes('AuthoritiesAll')){
        console.log('-==>>',this.decode,Object.getOwnPropertyNames(this.decode).length)
 
        this.decode.AuthoritiesAll.AuthorityAll 
        .filter(el => el["@attributes"].MOU == this.MOU )
        .forEach( el => {
          let auth = el["@attributes"]; 
          a.push({ auth: auth.Name, auth_val: auth.Code});
        });
      }
      return a;
    },
    def_nature_obj: function(){
      let a = [];
      if (Object.getOwnPropertyNames(this.decode).includes('DeficiencyGroups')){
        this.decode.DeficiencyGroups.DeficiencyGroup 
        .filter(el => el["@attributes"].Active == 'yes' )
        .forEach( el => {
          let DefC = el["@attributes"];
          let c = parseInt(DefC.Code);
          let code = c// >0 && c<100?`0${c}00`:`${c}00`;  //=>в шаблоне буду править внешний вид,чтобы на сервак норм коды слал;
          a.push({ txt: DefC.Name, val: code});
        });
      }
      return a;
    }
  }
}
</script>
 
<style>
.panelContainerRow .ui-datepicker-trigger { top: -3px !important;  position: relative !important; margin-left: 2px !important; }
#ui-datepicker-div {z-index: 222222 !important;}
</style>

<style scoped lang="scss">

.searchby,.searchby *{cursor: pointer;} 
lebel {color: white;}
.panelContainer {
  min-width: 900px;
  background-color: #004673;
  .panelContainerRow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    &>div {
      font-size: .8em;
      color: white;
      margin: 2px;
    }
    

    .searchBy label {cursor: pointer;}
    .defNature select {width: 138px !important; }
    .authoritySel select {width: 80px !important; }
    
    .input_select {height: 23px;}
    select.input_select {
      border: #004673 solid 1px;
      *{
        background: #004673;
        color: white;
        border: 1px white solid;
      }
    }
  }
}

@import './styles/styles_panel.css';
/*@import '../node_modules/buefy/lib/buefy.min.css';*/
</style>

 