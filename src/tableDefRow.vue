<template>
    <div>   
              <div class="row_head table-head">
                <div class="grow0">#</div>
                <div class="grow2">Code</div>
                <div class="grow3">Nature of deficiencies</div>
                <div class="grow1">No. of deficiencies</div>
                <div class="grow1">No. of photos</div>
              </div>
              <app-table-def-row-col v-for="(def,ind) in defsTable" :key="ind" :def="def" :ind="ind" :data="data" :url="url" ></app-table-def-row-col> 
    </div>
</template>

<script>  
import tableDefRowCol from "./tableDefRowCol.vue";  
export default {
  components: {  'app-table-def-row-col': tableDefRowCol},
  props: ['url', 'decode', 'defsTable', 'data'],
  watch: { },
  data() { return {  } },
  methods:{ },
  mounted: function () {},
  computed: { }
}
</script>
  