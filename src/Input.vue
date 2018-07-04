<template>

<div>
        <table class="panel">
         <tr>

          <td>  
            <label>Search by:</label>
            <select v-model="searchby" style="width:130px;">
              <option selected="selected" value="insp">Inspections</option>
              <option value="def">Deficiencies</option>
            </select>
          </td> 

          <transition name="bounce"> 
            <td v-show="searchby=='def'">            
                <label>Deficiency nature:</label>
                <select v-model="def_nature" style="width:130px;">
                  <option value="0" selected="selected">-- select --</option>  
                  <option v-for="(def,ind) in def_nature_obj" :key="ind" :value="def.val">{{def.val}} - {{def.txt}}</option> 
                </select> 
            </td> 
          </transition> 
          <td><label>From:</label> <input name="From"  v-model="search_from"  style="width: 60px;" class="calend"   /></td>
          <td><label>To:</label> <input name="Till" v-model="search_till" style="width: 60px;" class="calend"  v-mask="'##.##.####'"/></td>

          <td><label>Authority:</label> 
            <select name="authorityall" v-model="authoritySel" style="width:130px;">
              <option value="0" selected="true">-- select --</option>  
              <option v-for="(auth,ind) in authorityAll" :key="ind" :value="auth.auth_val">{{auth.auth}}</option>
            </select> 
          </td> 
     
          <td><label>District:</label> 
            <select name="district" v-model="districtSel" style="width:110px;">
              <option value="0" selected="selected">-- select --</option>  
              <option v-for="(distr,ind) in districtAll" :key="ind" :value="distr.distr_val">{{distr.distr}}</option>
            </select> 
          </td>  

          <td><label>Port:</label> 
            <select name="port" v-model="portSel" style="width:110px;">
              <option value="0" selected="selected">-- select --</option>  
              <option v-for="(port,ind) in portAll" :key="ind" :class="port.port_class" :value="port.port_val">{{port.port}}</option>
            </select> 
          </td> 
          <td><label>Type:</label> 
            <select v-model="typeSel" style="width:80px;">
              <option v-for="(typ,ind) in typeAll" :key="ind" :value="typ.val">{{typ.type}}</option>
            </select>
          </td>           
          <td><label>Show:</label> 
            <select v-model="heldSel" style="width:80px;">
              <option v-for="(hel,ind) in heldAllComp" :key="ind" :value="hel.val">{{hel.type}}</option>
            </select>
          </td> 

           
          <td><button @click="onclick_insps_search_photos">Search</button></td>
        </tr>
      </table>   


       <table>
        <col width="4%"  />
        <col width="8%"  />
        <col width="8%"  />
        <col width="20%" />
        <col width="7%"  />
        <col />
        <col width="8%" />
        <col width="8%" />
        <col width="6%" />
        <col width="7%" />
        <col width="5%" />
        <tr>
          <th>Type</th>
          <th>Submitted</th>
          <th>Date</th>
          <th>Place</th>
          <th>IMO number</th>
          <th>Name</th>
          <th>Callsign</th>
          <th>MMSI</th>
          <th>Flag</th>
          <th>Deficiencies</th>
          <th>Detention</th>
          <th>Pictures</th>
        </tr> 

        <tr v-for="(insp,ind) in orderedInspections" v-bind:key="ind"  :class="{odd:ind%2,even:!(ind%2)}" onclick="onclick_insp(this)">
            <td style="text-align: center;"> 
              <img v-if="insp.InspType==0" :src="url+'/img/initial.png'" />
              <img v-if="insp.InspType==1" :src="url+'/img/followup.png'" />
              <input type="hidden" :value="insp.InspUID" /> 
            </td>
            <td> {{insp.InspDateOfSubmit}} </td>
            <td> {{insp.InspDateOfInspect}} </td>

            <td  style="text-align: left;" :title="insp.Render_Place_Title"> 
             {{insp.Render_Place}}
            
            </td>
            <td> {{insp.ShipIMO}}          </td> 
            <td style="text-align: left;"> {{insp.ShipName}} </td> 
            <td> {{insp.ShipCallsign}}     </td> 
            <td> {{insp.ShipMMSI}}         </td> 
            <td :title="insp.ShipFlagCode_Render_Title"> {{insp.ShipFlagCode_Render}}     </td>
            <td> {{insp.InspDeficiencies}} </td>
            <td> {{insp.InspDetention}}    </td>
            <td> {{insp.InspPictures}}     </td>
          </tr>
       </table>
</div>
</template>
<script>
export default {
  props: ['msg','doc_id','url'],
  data() {
    return {heldSel:'0',
            heldAll: [ {type:'Held by Authority', val:0},
                       {type:'For Authority Flag',val:1}],
          typeSel: -1,
          typeAll: [ {type:'all',       val:-1},
                     {type:'initial',   val: 0},
                     {type:'follow-up', val: 1}],
          portSel:'',
          districtSel:'',
          authoritySel:'',
          authorityAll: [],
          def_nature_obj: [
              {val: "01100", txt: "Certification and Documentation - Ship Certificates"},
              {val: "01200", txt: "Certification and Documentation - Crew Certificates"},
              {val: "01300", txt: "Certification and Documentation - Documents"},
              {val: "02100", txt: "Structural conditions"}
          ],
          searchby:'',
          def_nature:'',
          MOU:'TMOU',
          decode:[],
          search_from:'',
          search_till:'',
          inspections: { test1: 1, test2: 2 } 
    }
  },
  methods: { 
   search(){ $.post(this.url+"/?action=getinspections_photos&ajax=1","From=02.06.2018&Till=02.07.2018&authorityall=CA&district_temp=1&district=0&ports_temp=0&ports=0&type=-1&held=0&detention=0&Page=0", this.searchHandler); },
   onclick_insps_search_photos(o) {
         o=o.target;
         var tab = $(o).parents('.tab');
         tab.hide();
         $.post(this.url+'/?action=getinspections_photos&ajax=111', "", this.searchHandler)
          tab.fadeIn(800);
          tab.find('button').button();
     },
      searchHandler(data) { /*
      axios.post("./?action=getinspections_photos&ajax=1", 
      "From=28.05.2018&Till=28.06.2018&authorityall=0&district_temp=1&district=0&ports_temp=0&ports=0&type=-1&detention=0&Page=0")
      .then(function (res) {console.log("stage1=>", res);})
*/    data = eval("[" + data + "]")[0].Inspections.Inspection;
      this.decode = data.splice(data.length - 1, 1);
      data = data.map( e => {
        try {
          e.Row = parseInt(e.Row);
          e.InspDateOfSubmit = new Date(e.InspDateOfSubmit).toLocaleDateString();
          e.InspDateOfInspect = new Date(e.InspDateOfInspect).toLocaleDateString(); 
          this.decode[0].Ports.Port.forEach( dec => {if (dec.Code == e.InspPort) e.Render_Place = dec.Name })
          this.decode[0].Flags.Flag.forEach( dec => {
            if (dec.Code == e.InspAuthority) {e.Render_Place_Title = e.Render_Place + " (" + dec.Name + ")";
              e.Render_Place = e.Render_Place + " (" + dec.Code + ")";}
            if (dec.Code == e.ShipFlagCode) {e.ShipFlagCode_Render = dec.Code;e.ShipFlagCode_Render_Title = dec.Name;}
          }) 
          this.authorityAll = [];
          this.decode[0].AuthoritiesAll.AuthorityAll.forEach( dec => dec.MOU==this.MOU?this.authorityAll.push({auth: dec.Name, auth_val: dec.Code}):'')
        } catch (e) { return; }
        return e; 
      });
    this.inspections = data;
    }
  },
  mounted: function () {
    this.search_from = `${	String(new Date().getDate()).length==1?0+""+new Date().getDate():new Date().getDate()}.${	String  (new Date().getMonth()).length==1?0+""+new Date().getMonth():new Date().getMonth()}.${new Date().getFullYear()}`;
    this.search_till = `${	String(new Date().getDate()).length==1?0+""+new Date().getDate():new Date().getDate()}.${	String( (new Date().getMonth()+1) ).length==1?0+""+(new Date().getMonth()+1):new Date().getMonth()+1}.${new Date().getFullYear()}`;;
    this.search();
    $('.calend').each( function ( ) { $(this).datepicker() })/*$('#getinspections button').button( )*/
  },
  computed: {
    heldAllComp:function(){
      return this.authoritySel==0?[this.heldAll[0]]:this.heldAll;
      
    },
    portAll: function(){ 
      let a = [];
      if (typeof this.decode[0] != 'undefined'){
          this.decode[0].Ports.Port.forEach( port => {
            if (port.MOU==this.MOU && port.Inherit==1 && port.Active=='yes') {
              if(this.authoritySel == 0){
                a.push({  port:       port.Name, 
                          port_val:   port.Code,
                          port_class: 'auth'+port.Country+(port.District!=''?' dist'+port.District:''),
                          port_country:port.Country,
                          port_auth:  port.District
                });
              } else { 
                    if(port.Country==this.authoritySel){
                        a.push({ 
                            port:       port.Name, 
                            port_val:   port.Code,
                            port_class: 'auth'+port.Country+(port.District!=''?' dist'+port.District:''),
                            port_auth:  port.District
                          })
                      };  
              }
          }
        }) 
      }

      return a; 
    },
    districtAll: function(){
      let a = [];
      if(this.authoritySel == 0){
        if (typeof this.decode[0] != 'undefined'){
          this.decode[0].Districts.District.forEach( distr => { 
            if (distr.MOU==this.MOU && distr.Active=='yes') {
              this.portAll.forEach( port =>{if(port.port_auth==distr.ID){a.push({  distr:       distr.Name, distr_val:   distr.ID})};})
            }
          })
        }
      } else {


      }
      return a;
    },
    orderedInspections: function(){
      return _.orderBy(this.inspections,'Row')
    }
  }
}  
</script>

<style>
  .bounce-enter-active {  animation: bounce-in .5s;}
  .bounce-leave-active {  animation: bounce-in .5s reverse;}
  @keyframes bounce-in {   0% {    transform: scale(0);  }   50% {transform: scale(1.5);}   100% {transform: scale(1);} }
</style>
