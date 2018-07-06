<template> 
  <div> 
      <table class="panel">
         <tr>
          <!--<td><label>New interface:</label><input type="checkbox" id="horns" name="feature" value="horns" /></td>-->   
          <td>  
            <label>Search by:</label>
            <select v-model="searchby" style="width:80px;">
              <option value="insp">Inspections</option>
              <option value="def">Deficiencies</option>
            </select>
          </td>

          <transition name="bounce">
            <td v-if=" searchby=='def' ">            
                <label>Deficiency nature:</label>
                <select v-model="def_nature" style="width:130px;">
                  <option value="0" selected="selected">-- select --</option>  
                  <option v-for="(def,ind) in def_nature_obj" :key="ind" :value="def.val">{{def.val}} - {{def.txt}}</option> 
                </select> 
            </td> 
          </transition> 
          <td><label>From:</label> <input name="From"  v-model="search_from"  style="width: 60px;" class="calend" v-mask="'##.##.####'"/></td>
          <td><label>To:</label> <input name="Till" v-model="search_till" style="width: 60px;" class="calend" v-mask="'##.##.####'"/></td>

          <td><label>Authority:</label> 
            <select name="authorityall" v-model="authoritySel" @change="authSelHandler" style="width:130px;">
              <option value="0" selected="true">-- select --</option>  
              <option v-for="(auth,ind) in authorityAll" :key="ind" :value="auth.auth_val">{{auth.auth}}</option>
            </select> 
          </td> 
     
          <td><label>District:</label> 
            <select name="district" v-model="districtSel" style="width:110px;">
              <option value="0" selected="selected">-- select --</option>  
              <option v-for="distr in districtAll" :key="distr.distr_val" :value="distr.distr_val">{{distr.distr}}</option>
            </select> 
          </td>  
<!--  old STYLE -->
<!--      <td><label>Port:</label>  
            <select name="port" v-model="portSel" @change="portSelHandler" style="width:110px;">
              <option value="0" selected="selected">-- select --</option> 
              <option v-for="(port,ind) in portAll" :key="ind" :class="port.port_class" :value="port.port_val">{{port.port}}</option>
            </select> 
          </td> 
-->
          <td style="overflow: initial;"><label>Port:</label> 
            <v-select :placeholder="'-- select --'" :on-change="portSelHandler2" :searchable="true" :options="portAll" label="port"></v-select> 
          </td>  

          <td><label>Type:</label> 
            <select v-model="typeSel" style="width:50px;">
              <option v-for="(typ,ind) in typeAll" :key="ind" :value="typ.val">{{typ.type}}</option>
            </select>
          </td>           
          <td><label>Show:</label> 
            <select v-model="heldSel" style="width:80px;">
              <option v-for="(hel,ind) in heldAllComp" :key="ind" :value="hel.val">{{hel.type}}</option>
            </select>
          </td> 

         <td> 
            <div class="my_padding">
              <input type="checkbox" id="adventure_id" v-model="detentionSel">
              <label for="adventure_id"> Detention</label>
            </div>
          </td>
           
          <td><div class="my_padding"><button @click="upSendData">Search</button></div></td>
        </tr>
      </table>   

</div>
</template>
<script> 
import vSelect from 'vue-select';

export default {
  props: ['msg','doc_id','url', 'decode'],
  components: { 'v-select': vSelect },
  data() {
    return { 
          detentionSel: false,
          districtAll: [],
          portAll:[],
          heldSel:'0',
          heldAll: [ {type:'Held by Authority', val:0},
                     {type:'For Authority Flag',val:1}],
          typeSel: -1,
          typeAll: [ {type:'all',       val:-1},
                     {type:'initial',   val: 0},
                     {type:'follow-up', val: 1}],
          portSel: 0,
          districtSel:0,
          authoritySel:0,
          def_nature_obj: [
              {val: "01100", txt: "Certification and Documentation - Ship Certificates"},
              {val: "01200", txt: "Certification and Documentation - Crew Certificates"},
              {val: "01300", txt: "Certification and Documentation - Documents"},
              {val: "02100", txt: "Structural conditions"}
          ],
          searchby:'insp',
          def_nature: 0,
          MOU:'TMOU', 
          search_from:'',
          search_till:'' 
    }
  },
  methods: {
    upSendData(){
      let data = {
        "From":         this.search_from,
        "Till":         this.search_till,
        "authorityall": this.authoritySel,
        "district":     this.districtSel,
        "ports":        this.portSel,
        "type":         this.typeSel,
        "held":         this.heldSel,
        "detention":    this.detentionSel?1:0,
        "Page":         0,
        "ports_temp":   0,
        "district_temp":1
        };
      this.$emit('onclick7insps7search7photos', data)
  },
  portSelHandler2(e){ 
    window.that = this
    window.ee = e;
    console.log('this-<',this,e);
    if( typeof e != 'undefined' && e != null){
      console.log( ' typeof e != "undefined" ', typeof e != "undefined")
      if( typeof e.port_val != 'undefined') {
        console.log(" typeof e.port_val != 'undefined'",typeof e.port_val != 'undefined')
        this.portSel = e.port_val     
      } else this.portSel = 0;
    } else this.portSel = 0; 
    this.portSelHandler(); 
    //if (typeof e != 'undefined') this.portSel = e.port_val 
    //else console.log('undef!')
  },
  authSelHandler(){
    if(this.authoritySel !=0 ){ this.districtSel=0; this.portSel=0;  }
      this.portAll_function();
      this.districtAll_function();
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
      if (typeof this.decode != 'undefined'){
        this.decode.Ports.Port.forEach( port => { 
          if (port.MOU==this.MOU && port.Inherit==1 && port.Active=='yes' /* && typeof port.District != 'undefined'*/ ) {
            if(this.authoritySel == 0) addToArr(port.Name, port.Code, port.Country, port.District)  //добавим все порты;
            else if(port.Country == this.authoritySel)  addToArr(port.Name, port.Code, port.Country, port.District)
            } else console.log('Undefined port=>',port)
        });
      }
      this.portAll = a;      
    },
     districtAll_function(){
      const addToArr = (distr_Name,distr_ID) => a.push({ distr: distr_Name, distr_val: distr_ID});
      let a = [];
      if (typeof this.decode != 'undefined'){
        this.decode.Districts.District.forEach( distr => {
          if(distr.MOU==this.MOU && distr.Active=='yes') {
            this.portAll.forEach( port => {
              let exit = 0;
              a.forEach( s => {if(s.distr_val==distr.ID) exit = 1; }) //костыль -> дубли чеб не попадали в district;
                  if (port.port_auth == distr.ID && exit!=1) {
                    if (this.authoritySel == 0 ) addToArr (distr.Name, distr.ID); 
                    else if (port.port_country == this.authoritySel) addToArr (distr.Name, distr.ID);  
                  }
            })
          } 
        })
      }
      this.districtAll = a;
    },
    portSelHandler(){
      if( this.portSel !=0 || this.portSel !='undefined' ){
        let auth_m, dist_m;
        this.portAll.forEach( port => {
                                      if(port.port_val==this.portSel){
                                          auth_m = port.port_country;
                                          dist_m = port.port_auth;
                                      }
        })
        //this.authoritySel = String(this.authoritySel.length)==2 ? auth_m : 0;
        console.log('');
        console.log('auth_m',auth_m,'dist_m',dist_m) 
        console.log('authoritySel',this.authoritySel,'districtSel',this.districtSel)
        if(this.portSel != 0){
          //  if(String(this.authoritySel).length==2) 
            this.authoritySel =  auth_m!=undefined ? auth_m:0
          // else this.authoritySel = 0; 
          // if(String(this.districtSel).length==1 || String(this.districtSel).length==2) 
            this.districtSel  =  dist_m != undefined ? dist_m:0
          // else this.districtSel = 0; 
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
    $('.calend').each( function ( ) { $(this).datepicker() })/*$('#getinspections button').button( )*/
  },
  computed: {
    heldAllComp: function(){
      if ( this.authoritySel==0 ) {this.heldSel = 0; return [this.heldAll[0]]} else return this.heldAll;
    },
    authorityAll: function(){
      let a = [];
      if (typeof this.decode != 'undefined'){ 
        this.decode.AuthoritiesAll.AuthorityAll.forEach( auth => {
          if(auth.MOU==this.MOU)  a.push({ auth: auth.Name, auth_val: auth.Code}) 
        })
      }
      return a;
    } 
  }
}
</script>
 

<style>

.v-select.open {width: 150px !important;}

.my_padding{  padding-top:12px}
table.panel td { display: inline-block !important; } /*Меню в строчку!*/

.v-select .selected-tag,
.v-select input[type=search], .v-select input[type=search]:focus { top: -4px !important; left: 4px !important; margin:0px !important;  padding: 0px !important; }


.v-select.open .selected-tag,
.v-select.open input[type=search], .v-select.open input[type=search]:focus { top: 0px !important;  left: 0px !important;; margin:0px !important;  padding: 0px !important;}

.v-select .dropdown-toggle .clear {    bottom: 6px;}
input,select{height:27px}
.v-select{
  color:#006798;
  background: white;
}
img.ui-datepicker-trigger {
    height: 27px;
    width: 20px;
    padding-bottom: 4px;
    cursor: pointer;
}
img.ui-datepicker-trigger {
    cursor: pointer !important;
}
span.selected-tag ~ .form-control { 
    width: 60px !important;    
}
.dropdown.v-select.single.searchable { height: 27px; }
.v-select .ui-button-text {padding: 0px 0px;font-weight: 999;}
.v-select .open-indicator, .v-select .open-indicator:before { top:7px}
/*
.v-select .dropdown-toggle .clear {
  bottom: 5px;
}
.v-select.open .open-indicator {    bottom: -5px;}

.v-select .open-indicator {    bottom: 1px;}
.dropdown.v-select.single.searchable {
    height: 20px;
}

*/
  .bounce-enter-active {  animation: bounce-in .5s;}
  .bounce-leave-active {  animation: bounce-in .5s reverse;}
  @keyframes bounce-in {   0% {    transform: scale(0);  }   50% {transform: scale(1.5);}   100% {transform: scale(1);} }

/* стилизация чекера ====>> 
*/
  input[type="checkbox"]:checked + label::after {
   content: '';
   position: absolute;
   width: 1.2ex;
   height: 0.4ex;
   background: rgba(0, 0, 0, 0);
   top: 0.9ex;
   left: 0.4ex;
   border: 3px solid #11b912;
   border-top: none;
   border-right: none;
   -webkit-transform: rotate(-45deg);
   -moz-transform: rotate(-45deg);
   -o-transform: rotate(-45deg);
   -ms-transform: rotate(-45deg);
   transform: rotate(-45deg);
}

input[type="checkbox"] {
   line-height: 2.1ex;
}

input[type="radio"],
input[type="checkbox"] {
    position: absolute;
    left: -999em;
}

input[type="checkbox"] + label {
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

input[type="checkbox"] + label::before {
   content: "";
   display: inline-block;
   vertical-align: -25%;
   height: 2ex;
   width: 2ex;
   background-color: white;
   border: 1px solid rgb(166, 166, 166);
   border-radius: 4px;
   box-shadow: inset 0 2px 5px rgba(0,0,0,0.25);
   margin-right: 0.5em;
}
/*<=== стилизация чекера */
</style>
