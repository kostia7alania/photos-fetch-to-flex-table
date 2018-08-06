<template>   
          <div>
            <div class="row_head" :class="{oddk:ind%2, evenk:!(ind%2)}" @click="showModal=!showModal" key="'k1'" >
              <div class="grow1">{{ind+1}}</div>
              <div class="grow1">{{ codeGroupViewHandler( def.Group ) }}</div>
              <div class="grow2">{{def.Name}}</div>
              <div class="grow1">{{def.Found}}</div>
            </div> 
              <app-table-def-row-col-image v-if="showModal" :def="def" :ind="ind" :data="data" :url="url" @click="showModal=!showModal" key="'k2'">
              </app-table-def-row-col-image> 
          </div>

</template>

<script>
import tableDefRowColImage from "./tableDefRowColImage.vue";  
export default {
  components: {  'app-table-def-row-col-image': tableDefRowColImage},
  props: ['data', 'def', 'ind', 'url'/*, 'decode', 'deficiencies'*/],
  watch: { },
  data(){ return { showModal: false } },
  methods:{
    codeGroupViewHandler: e => e>0 && e<100?`0${e}00`:`${e}00`
  },
  mounted: function () {},
  computed: { }
}
</script> 
 
 