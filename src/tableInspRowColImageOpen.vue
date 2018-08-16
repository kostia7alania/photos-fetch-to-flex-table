<template>
            <div class="tbl-imgs-wrapper color_white">
              <div class="tbl-imgs">
                <img  :data-original="'https://apcis.tmou.org/pictures/real/'+item.FileName"
                      :alt="`<div> 
                              <b>Date of inspect:</b> ${item.DateOfInspect}
                              ${item.PSCOName!=undefined?'<p><b>PSCO Name:</b> '+item.PSCOName+'</p>':''} 
                              `+//${authCodeComp(item.AuthCode)!=''?'<p><b>Authority:</b> '+ authCodeComp(item.AuthCode) +'</p>':''}
                              `
                              ${item.Remarks!=undefined?'<p><b>Remarks:</b> '+item.Remarks+'</p>':''}


                              ${item.ShipIMO!=undefined?'<p><b>Ship IMO:</b> '+item.ShipIMO+'</p>':''}
                              ${item.ShipName!=undefined?'<p><b>Ship Name:</b> '+item.ShipName+'</p>':''}
                              ${item.ShipFlagCode_Render_Title!=undefined?'<p><b>Ship Flag:</b> '+item.ShipFlagCode_Render_Title+'</p>':''}
                              ${item.Render_Place!=undefined?'<p><b>Place:</b> '+item.Render_Place+'</p>':''}
                            </div>
                          `"
                    :src="'https://apcis.tmou.org/pictures/small/'+item.FileName"
                    data-color="#eee"
                    data-text="Small quality image"
                    style="max-width: 100%" 
                />
            </div>
            <div class="tbl-imgs">
              <p><b>Date Of Inspect</b> {{item.DateOfInspect}} </p>
              <p v-if="item.PSCOName!=undefined" ><b>PSCO Name</b> {{item.PSCOName}}</p>
             <!-- <p v-if="item.Authority!=undefined" ><b>Authority</b> {{item.Authority}}</p>
               <p v-if="authCodeComp(item.AuthCode)!=''" ><b>Authority</b> {{ authCodeComp(item.AuthCode) }}</p> -->
              <p v-if="item.Remarks!=undefined" ><b>Remarks</b> {{item.Remarks}}</p>
            </div> 
        </div>  
</template>

<script>     

export default {  
  components: {     },
  props:['item','decode'],
  data(){ return {  } },
  methods:  {   
    authCodeComp(AuthCode) { 
      let a = this.decode.Authorities.Authority.filter(e=>e["@attributes"].MOU=='TMOU' && e["@attributes"].ID==AuthCode?1:0); //берем из кода Authority - его имя;
      return a.length>0 ? a["0"]["@attributes"].Name: '' ; 
    } 
  },
  computed: { },
  mounted: function () { }
}
</script> 
 