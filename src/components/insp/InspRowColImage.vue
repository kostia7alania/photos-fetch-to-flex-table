<template>
  <div class="bg-darkblue">
    <transition-group name="modal">
      <div :key="'inspView'" v-if="images.length>0 && status==1"  v-viewer="{ movable: true,  url: 'data-original'}" class="viewer-insp"  ref="viewer">
          <div v-for="(item, index) in images" class="viewer-insp-row"  :key="index">
            <insp-row-col-image-open
              :item="item"
            />
          </div>
      </div>
      <p class="color_white fs30" v-if='images.length==0&&status==1' :key="'photosNot'">Photos not found...</p>
      <p class="color_white fs30" v-if='status==0' :key="'PhotosLoading'">Loading...</p>
      <p class="color_white fs30" v-if='status==2' :key="'ErrLoad'">Error loading photos.</p>
    </transition-group>
  </div>
</template>

<script>
export default {
  components: {
    "insp-row-col-image-open": () => import("./InspRowColImageOpen")
  },
  props: ["InspUID", "insp"],
  data() {
    return {
      images: [],
      status: 0
    };
  },
  mounted() {
    this.loading = true;
    axios
      .get(`${this.url}get_ph_by_inspUID&InspUID=${this.insp.InspUID}`)
      .then(res => {
        let otv = res.data.row;
        if ("FileName" in otv) this.images.push(otv);
        else otv.forEach(e => this.images.push(e));
        this.status = 1; // success
      })
      .catch(e => {
        console.log("catch get_ph_by_inspUID => ", e);
        this.status = 2;
      })
      .finally(() => (this.loading = false));
  }
};
</script>

