<template>
    <div :class='{"oddk2": (i%2),"evenk2":!(i%2)}'>
                    <div @click="showModal=!showModal"  class="row_head center table-def-row-col " >
                      <div class="grow1">{{file[0].FullNatureCode | natureFilter}}</div>
                      <div class="grow3">{{file[0].FullNatureName}}</div>
                      <div class="grow1">{{new Date (file[0].DateOfSubmit).toLocaleDateString('RU')}}</div>
                      <div class="grow1">{{new Date (file[0].DateOfInspect).toLocaleDateString('RU')}}</div>
                      <div class="grow2">{{`${file[0].InspAuthName} (${file[0].InspAuthCode})`}}</div>
                      <div class="grow1">{{file[0].IMO}}</div>
                      <div class="grow2">{{file[0].ShipName}}</div>
                      <div class="grow2">{{`${file[0].ShipFlagName} (${file[0].ShipFlagCode})`}}</div>
                      <div class="grow2 def-imgs">{{file.length}} photos</div>
                    </div>
                    <template v-if="showModal">
                      <def-row-col-image-row-open
                        :file2="file"
                      />
                       <h1 v-if="file.length==0">No photos!</h1>
                    </template>
    </div>
</template>

<script>
export default {
  components: {
    "def-row-col-image-row-open": () => import("./DefRowColImageRowOpen.vue")
  },
  props: ["file", "i"],
  data() {
    return {
      def: [],
      showModal: 0
    };
  },
  filters: {
    natureFilter(e) {
      return "" + e.length == 4 ? "0" + e : e;
    }
  }
};
</script>

