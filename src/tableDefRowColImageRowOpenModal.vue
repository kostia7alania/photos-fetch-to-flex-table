<template>
  <div class="grow2 def-imgs">
    <img  v-if="status==1" :data-original="'https://apcis.tmou.org/pictures/real/'+file.FileName"
                      :alt="`<div>
                        <p><b>Date of inspect:</b> ${new Date (file.DateOfInspect).toLocaleDateString('RU')}</p>
                        ${`<p><b>Place:</b> ${file.InspAuthName}</p>`}
                        ${`<p><b>Ship Flag:</b> ${file.ShipFlagName}</p>`}
                        ${`<p><b>IMO:</b> ${file.IMO}</p>`}
                        ${`<p><b>ShipName:</b> ${file.ShipName}</p>`}
                        ${file.Remarks.trim().length>0?'<p><b>Remarks:</b> '+file.Remarks+'</p>':''}
                        ${file.Comments.trim().length>0?'<p><b>Comments:</b> '+file.Comments+'</p>':''}
                        </div>
                      `"  :src="'https://apcis.tmou.org/pictures/small/'+file.FileName"/> 
 
  </div>
</template>

<script>    
export default { props: ['file'], data(){ return { status:0  }},
  mounted() {this.status=1;},
}
</script> 