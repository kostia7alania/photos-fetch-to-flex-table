<template>   
          <div>
            <div class="row_head" :class="{oddk:ind%2, evenk:!(ind%2)}" @click="showModal=!showModal" key="'k1'" >
              <div class="grow0">{{ind+1}}</div>
              <div class="grow2">{{ codeGroupViewHandler( def.Group ) }}</div>
              <div class="grow3">{{def.Name}}</div>
              <div class="grow1">{{def.Found}}</div>
              <div class="grow1">{{def.File.length}}</div>
            </div>  
              <template v-if="showModal">
                <app-table-def-row-col-image v-show="def.File.length>0" :def="def" :ind="ind" :data="data" :url="url" @click="showModal=!showModal" key="'k2'">  </app-table-def-row-col-image> 
                <h1 v-show="def.File.length==0"> No photos!</h1>
              </template>
          </div>

</template>

<script>
import tableDefRowColImage from "./tableDefRowColImage.vue";  
export default {
  components: { 'app-table-def-row-col-image': tableDefRowColImage },
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
 
 