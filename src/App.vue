<template>
  <div id="app">
    <app-panel/>
    <app-table
      :inspections="inspections"
    />
  </div>
</template>

<script>
export default {
  components: {
    "app-table": () => import("./components/Table.vue"),
    "app-panel": () => import("./components/Panel/Panel.vue")
  },
  data() {
    return {
      showModal: false,
      inspections: [],

      data: { searchby: "insp", def_nature: 0 }
    };
  },
  computed: {
    codesAll() {
      return this.$store.codesAll;
    }
  },
  methods: {
    perPageEmit(perPage) {
      this.onclick_insps_search_photos();
    },
    navClick(nextPage) {
      this.data.Page = nextPage;
      this.onclick_insps_search_photos();
    },

    onclick_insps_search_photos() {
      store.dispatch("GET_IMAGES_BY_INSP");
    },
    insps_parse_tranform(w, searchby) {
      try {
        let e = w["@attributes"];
        e.Row = parseInt(e.Row);
        let toRuDate = w => new Date(w).toLocaleDateString("ru-RU");
        e.InspDateOfSubmit = toRuDate(e.InspDateOfSubmit);
        e.InspDateOfInspect = toRuDate(e.InspDateOfInspect);
        this.codesAll.Ports.Port.forEach(dec => {
          dec = dec["@attributes"];
          if (dec.Code == e.InspPort) e.Render_Place = dec.Name;
        });
        this.codesAll.Flags.Flag.forEach(dec => {
          dec = dec["@attributes"];
          if (dec.Code == e.InspAuthority) {
            e.Render_Place_Title = e.Render_Place + " (" + dec.Name + ")";
            e.Render_Place = e.Render_Place + " (" + dec.Code + ")";
          }
          if (dec.Code == e.ShipFlagCode) {
            e.ShipFlagCode_Render = dec.Code;
            e.ShipFlagCode_Render_Title = dec.Name;
          }
        });
        return e;
      } catch (e) {
        this.$store.commit("SET_ATTRS_STATUS", { status: 2 });
      }
    }
  }
};
</script>

<style lang="scss">
@mixin flx() {
  display: flex;
  display: -webkit-flex;
}
@mixin imgs() {
  & img {
    padding-bottom: 7px;
    padding-top: 7px;
    -webkit-transition: all 1s ease-out;
    -moz-transition: all 1s ease-out;
    -o-transition: all 1s ease-out;
    transition: all 1s ease-out;
    height: 222px;
    width: 222px;
    &:hover {
      cursor: pointer;
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
}
.table-head {
  background-color: #004673;
  & > * {
    color: whitesmoke;
  }
}
.bg-darkblue {
  background: #244c8a;
}
.center {
  text-align: center;
}
.table-def-row-col-head {
  min-height: 33px;
}
.table-def-row-col {
  &:hover {
    background: #cd0a0a;
  }
}

.def-imgs {
  @include imgs();
  & img {
    height: 100px;
    max-width: 111px;
  }
  padding: 3px;
}
.viewer-insp {
  @include flx();
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 10px;
  &:hover {
    cursor: unset;
  }
  & > .viewer-insp-row {
    margin: 1px;
    width: 300px;
    @include imgs();
  }
}
.viewer-title {
  white-space: normal;
  & * {
    color: white;
    font-size: 20px;
    line-height: 1.4;
    word-break: break-all;
  }
}
.tbl-imgs-wrapper {
  @include flx();
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  .tbl-imgs {
    width: 300px;
    text-align: center;
    padding-bottom: 15px;
  }
}

.grow0 {
  flex-grow: 0;
  max-width: 30px;
}
.grow1 {
  flex-grow: 1;
  max-width: 77px;
}
.grow2 {
  flex-grow: 2;
}
.grow3 {
  flex-grow: 3;
}
.grow4 {
  flex-grow: 4;
}
.grow5 {
  flex-grow: 5;
}
.tbl-imgs-wrapper > .tbl-imgs:nth-child(1) {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row_head {
  @include flx();
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /*min-height: 33px; */
  & > div {
    /*width:100%;*/
    height: auto;
    word-break: break-word;
    text-align: center;
    -webkit-flex-basis: 100px;
    flex-basis: 10%;
  }
}

.viewer {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
}
.viewer > div {
  width: 200px;
}
$wt: white;
$tr: rgba(0, 0, 0, 0.1);
@mixin white() {
  color: $wt !important;
}
.fs30 {
  font-size: 30px;
}
.color_white {
  @include white();
  * {
    @extend .color_white;
  }
}

@mixin pnt() {
  color: white;
  background: red;
  cursor: pointer;
}
.table_vue,
#menu {
  min-width: 900px;
} /*main menu of APCIS:) */
#tabs {
  overflow: visible !important;
} /* tabs of APCIS:)  */
.row_head.table-head,
.panelContainer {
  position: sticky;
  &.row_head {
    top: 50px;
    z-index: 221;
  }
  &.panelContainer {
    top: 0px;
    z-index: 222;
  }
}

img.ui-datepicker-trigger {
  cursor: pointer;
}
.marg0 {
  margin: 0px;
}
.oddk {
  background-color: #24638a;
  & > * {
    color: white !important;
  }
  &:hover {
    @include pnt();
  }
}
.evenk {
  background-color: #4d7b9c;
  &:hover {
    @include pnt();
  }
  & > * {
    color: white !important;
  }
}

.oddk2 {
  background: #00679870;
  cursor: pointer;
  border: 2px solid #00679870;
}
.evenk2 {
  background: #1f96d070;
  cursor: pointer;
  border: 2px solid #1f96d070;
}
.oddk3 {
  background: #0a9fcaa6;
  cursor: pointer;
}
.evenk3 {
  background: #5cb85c9c;
  cursor: pointer;
}

/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.shiftx-enter-active,
.shiftx-leave-active {
  transition: all 2s ease-in-out;
}
.shiftx-enter, .shiftx-leave-to        /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
}
</style>

