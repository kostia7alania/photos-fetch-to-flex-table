<template>
  <div class="scobki"> 
    <app-input :url="url"></app-input>
  </div>
</template>

<script>
import Input from './Input.vue'
export default { 
  props: ['url'],
  data(){
    return{}
  },
  components: { 'app-input': Input }
}
</script>
 