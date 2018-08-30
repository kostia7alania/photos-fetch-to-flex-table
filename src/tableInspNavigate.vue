<template>

<div>
  <ul class="navigate">
    <li>
      Found <animated-number :value="Found" :formatValue="fmt" :duration="300"/> 
        elements in <animated-number :value="pages" :formatValue="fmt" :duration="300"/> page(s).
           Current page <animated-number :value="Page+1" :formatValue="fmt" :duration="300"/>.
             Rows from <animated-number :value="rowsfrom" :formatValue="fmt" :duration="300"/>  
               to <animated-number :value="rowsto" :formatValue="fmt" :duration="300"/>   
      <br>
           Elements per page
      <select @change="perPageHandler" v-model="perPageModel">
        <option v-for="pppl in pages_per_page_list" :value="pppl" :key="pppl" style="height: 20px;" >{{pppl}}</option>
      </select>

   </li> 
    <li v-for="ii in nav_computed" :key="ii.class">
      <a @click="nav_handler" :style="`background: url('./img/${ii.class}.png') center center no-repeat; cursor: pointer`" :title="ii.title"></a>
    </li>
  </ul> 
</div>

    
</template>

<script> 
import AnimatedNumber from "animated-number-vue";
 
export default {
  props: [ 'Found', 'Page', 'perPage' ],
  components:{ 'animated-number': AnimatedNumber },
  data() { 
    return {
      perPageModel: 25,
      pages_per_page_list: [ 25,50,75,100,200,500, 1000, 2000, 5000, 10000 ],
      rowsperpage:25 
    }
  },
  methods: {
    fmt(e){return e.toFixed()},
    perPageHandler(){  this.$emit('perPageEmit',this.perPageModel);     },
    nav_handler(e){
      let nextPage = this.nav_computed.filter(f=>e.target.title == f.title)[0].gotoPage;
      nextPage = Math.ceil(nextPage)//округляем в большую сторону (страниц)
      this.$emit('navClick',nextPage);
    }
  },
  computed: {
    pages: function(){ return Math.ceil(this.Found/this.perPage); },
    nav_computed: function(){
    /* 
                  let infa_out;
                  if(this.page<this.pages){ 
                    this.infa.forEach( e=>e.class!='navigate_end'  && e.class!='navigate_next'?infa.out.push(e):'' );
                  };
                  if(this.page>0){ 
                    this.infa.forEach( e=>e.class!='navigate_prev' && e.class!='navigate_begin'?infa.out.push(e):'' );
                  };
                  */
                // let nav_out = [...this.nav];
                /*  if(this.Page==this.pages){  nav_out = nav_out.filter( e=>e.class!='navigate_end' && e.class!='navigate_next'?1:0 ); }
                  if(this.Page==0){           nav_out = nav_out.filter( e=>e.class!='navigate_prev' && e.class!='navigate_begin'?1:0 ); }
                */
                /*
                  let a = [];
                  nav_out.forEach(e=>{
                    if(this.Page+1<this.pages){
                      if(e.class=='navigate_next') {a.push({title: e.title, class: e.class, gotoPage: this.Page+1 });}
                      else if(e.class=='navigate_end') {a.push({title: e.title, class: e.class, gotoPage: this.pages });}
                    }
                    if(this.Page<this.pages){
                      if(e.class=='navigate_prev') {a.push({title: e.title, class: e.class, gotoPage: this.Page-1 });} 
                      else if(e.class=='navigate_begin') {a.push({title: e.title, class: e.class, gotoPage: 0 });}
                    }
                    })
    */
        let nav = 
          [  
            {class: "navigate_end",  title: "To the last page"},
            {class: "navigate_next", title: "To the next page"},
            {class: "navigate_prev", title: "To the previous page"},
            {class: "navigate_begin",title: "To the first page"},
          ]
          .map(e=>{
            if(this.Page+1<this.pages){
              if(e.class=='navigate_next') return {title: e.title, class: e.class, gotoPage: this.Page+1}
              if(e.class=='navigate_end')  return {title: e.title, class: e.class, gotoPage: this.pages }
            }
            if(this.Page!=0){
              if(e.class=='navigate_prev') return {title: e.title, class: e.class, gotoPage: this.Page-1}
              if(e.class=='navigate_begin')return {title: e.title, class: e.class, gotoPage: 0 }
            }
          })
          .filter(e=>e);//убирает undefined из массива;
          return nav;
    },
    rowsto: function() {
      let temp =  (this.Page+1) * this.perPage;
      return temp > this.Found ? this.Found : temp
    },
    rowsfrom: function() {
      let temp =  this.Page*this.perPage + 1;
      return this.Found == 0 ? this.Found : temp
    }
  }
}


</script>


<style lang="scss" scoped>
ul.navigate{padding-top:3px;}
</style>

