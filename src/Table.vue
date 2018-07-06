<template>
  <div class="table_vue">
       <table v-if="inspections.length>0">
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
       <div v-else>
         <div v-if="results==0">
           <h1>Nothing found!</h1>
         </div>
       </div>
  </div> 
</template>

<script> 
export default {
  props: ['url','inspections', 'results'],
  data(){
    return{}
  },
  computed: {
    orderedInspections: function(){
      return _.orderBy(this.inspections,'Row')
    }
  }
}
</script>