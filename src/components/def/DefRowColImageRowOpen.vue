<template>
  <div class="  color_white bg-darkblue">
            <div v-viewer="{ movable: true,  url: 'data-original'}" class="viewer-insp" ref="viewer">
              <div v-for="(file,i) in file2"  class="viewer-insp-row" :key="i" >
              <div class="tbl-imgs-wrapper color_white">
                <div class="tbl-imgs">
                  <img
                        :data-original="'https://apcis.tmou.org/pictures/real/'+file.FileName"
                                    :alt="`<div>
                                      <p><b>Date of inspect:</b> ${new Date (file.DateOfInspect).toLocaleDateString('RU')}</p>
                                      ${`<p><b>Place:</b> ${file.InspAuthName}</p>`}
                                      ${`<p><b>Ship Flag:</b> ${file.ShipFlagName}</p>`}
                                      ${`<p><b>IMO:</b> ${file.IMO}</p>`}
                                      ${`<p><b>ShipName:</b> ${file.ShipName}</p>`}
                                      ${file.Remarks.trim().length>0?'<p><b>Remarks:</b> '+file.Remarks+'</p>':''}
                                      ${file.Comments.trim().length>0?'<p><b>Comments:</b> '+file.Comments+'</p>':''}
                                      </div>
                      `"
                      :src="'https://apcis.tmou.org/pictures/small/'+file.FileName"/>
                </div>
                <div class="tbl-imgs">
                    <p><b>IMO:</b> {{file.IMO}}</p>
                    <p><b>Remark:</b> {{file.Remarks}}</p>
                    <p v-if="file.Comments.trim().length>0"><b>Comment:</b> {{file.Comments}}</p>
                </div>
            </div>
           </div>
          </div>
    </div>
</template>

<script>
export default {
  props: ["file2"]
};
</script>