<template> 
  <div> 
      <table class="panel my_vue_table">
        <transition-group name="bounce" tag="tr">
          <!--<td><label>New interface:</label><input type="checkbox" id="horns" name="feature" value="horns" /></td>-->   
          <td :key="'k1'">  
            <label>Search by:</label> 
            <section class="whitesmoke">
                  <span class="searchby" @click="searchby_click"><input name="searchby" type="radio" @change="upSendData" v-model.trim="searchby" value="insp"> Inspections</input></span><br>
                  <span class="searchby" @click="searchby_click"><input name="searchby" type="radio" @change="upSendData" v-model.trim="searchby" value="def"> Deficiency</input></span>
            </section> 
          </td >  
            <td :key="'k2'" v-if=" searchby=='def' ">  <label>Deficiency nature:</label>
                <select  v-model="def_nature"  @change="upSendData" class="input_select"  style="width:130px;">
                  <option value="0" selected="selected">-- select --</option>  
                  <option v-for="(def,ind) in def_nature_obj" :key="ind" :value="def.val">{{def.val>0 && def.val<100?`0${def.val}00`:`${def.val}00`}} - {{def.txt}}</option> 
                </select> 
            </td>  
          <td :key="'k3'"><label>From:</label> <input class="input_select calend" name="From"  v-model="search_from"  style="width: 60px;" v-mask="'##.##.####'"/></td>
          <td :key="'k4'"><label>To:</label> <input class="input_select calend" name="Till" v-model="search_till" style="width: 60px;"  v-mask="'##.##.####'"/></td>

          <td :key="'k5'"><label>Authority:</label> 
            <select  class="input_select" name="authorityall" v-model="authoritySel" @change="authSelHandler" style="width:130px;">
              <option value="0" selected="true">-- select --</option>  
              <option v-for="(auth,ind) in authorityAll" :key="ind" :value="auth.auth_val">{{auth.auth}}</option>
            </select> 
          </td>  
          <td  :key="'k6'" v-if="searchby=='insp'"><label>District:</label> 
            <select  class="input_select" name="district" v-model="districtSel" style="width:110px;">
              <option value="0" selected="selected">-- select --</option>  
              <option v-for="distr in districtAll" :key="distr.distr_val" :value="distr.distr_val">{{distr.distr}}</option>
            </select> 
          </td>   
<!--  old STYLE of input=> --> 
        <td  :key="'k7'" v-if="searchby=='insp'"><label>Port:</label>  
              <select  class="input_select" name="port" v-model="portSel" @change="portSelHandler" style="width:110px;">
                <option value="0" selected="selected">-- select --</option> 
                <option v-for="(port,ind) in portAll" :key="ind" :class="port.port_class" :value="port.port_val">{{port.port}}</option>
              </select> 
        </td>   
<!-- => new style: =>
          <td style="overflow: initial;"><label>Port:</label> 
            <v-select :placeholder="'-- select --'" :on-change="portSelHandler2" :searchable="true" :options="portAll" label="port"></v-select> 
          </td>  
-->
          <td  v-if=" searchby=='insp' " :key="'k8'"><label>Type:</label> 
            <select  class="input_select" v-model="typeSel" style="width:50px;">
              <option v-for="(typ,ind) in typeAll" :key="ind" :value="typ.val">{{typ.type}}</option>
            </select>
          </td>           
          <td :key="'k9'"><label>Show:</label> 
            <select  class="input_select" v-model="heldSel" style="width:80px;">
              <option v-for="(hel,ind) in heldAllComp" :key="ind" :value="hel.val">{{hel.type}}</option>
            </select>
          </td> 
           
          <td  :key="'k10'" v-if="searchby=='insp'">
              <div class="field det my_padding">
                  <input type="checkbox" :value="true" v-model="detentionSel"><span class="whitesmoke">Detention</span></input>
              </div>
            </td> 
           
          <td :key="'k11'"><div class="my_padding"><button class="button is-warning" @click="searchFromPanel('search')"> {{searchBtnText}}</button></div></td>
          <td :key="'k12'"><div class="my_padding"><button class="button is-warning" @click="searchFromPanel('excel')" title="Export to Excel"> To Excel</button></div></td>
          <td :key="'k13'"><div class="my_padding"><button class="button is-warning" @click="searchFromPanel('cancel')" title="Cancel request">  Stop</button></div></td>
 
        </transition-group>
      </table>   
 
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
    searchby_click(e){
      let a = e.target.querySelector('input');
      a=a==null?e.target:a;
      this.searchby = a.value;
      this.upSendData(); 
},
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
    $('.calend').each( function ( ) { $(this).datepicker() })/*$('#getinspections button').button( )*/
    $('.calend').datepicker({onSelect: function(d,i){if(d !== i.lastVal){$(this).change();}}  });
    $('.calend').change( e=>{
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
 

<style scoped>
.searchby,.searchby *{    cursor: pointer;}
.whitesmoke *{color: whitesmoke !important;}
@import './styles/styles_panel.css';
/*@import '../node_modules/buefy/lib/buefy.min.css';*/
</style>

 