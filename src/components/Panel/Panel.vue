<template>
  <div class="panelContainer">
    <transition-group name="bounce" tag="div" class="panelContainerRow">
          <div class="searchBy" :key="'k1'">
              <span>Search by:</span>
              <div class="search__items">
                <div class="search__item">
                  <input id="search_insp" name="coffee" type="radio" value="insp" v-model="form.searchby">
                  <label for="search_insp">Inspections</label>
                </div>
                <div class="search__item">
                  <input id="search_def"  name="coffee" type="radio" value="def" v-model="form.searchby">
                  <label for="search_def">Deficiency</label>
                </div>
              </div>
          </div>
         <!-- <div class="defNature" :key="'k2'" v-if="form.searchby=='def'">
                <label>Deficiency nature:</label>
                <select  v-model="form.def_nature"  @change="upSendData" class="input_select"  style="width:130px;">
                  <option value="0" selected="selected">-- select --</option>
                  <option v-for="(def,ind) in def_nature_obj" :key="ind" :value="def.val">{{def.val | defValFilter}} - {{def.txt}}</option>
                </select>
          </div>
          [ !!! --- filters: { defValFilter(e){return e > 0 && e < 100 ? `0${e}00`:`${e}00}}  ---<<< !!!! ]
          -->
          <div class="searchFrom" :key="'k3'">
            <label>From:</label>
            <input class="input_select calend" name="From"  v-model="form.From" v-mask="'##.##.####'"/>
          </div>
          <div class="searchTill" :key="'k4'">
            <label>To:</label>
            <input class="input_select calend" name="Till" v-model="form.Till" v-mask="'##.##.####'"/>
          </div>

          <div class="authoritySel" :key="'k5'">
            <label>Authority:</label>
            <select v-model="form.authoritySel" class="input_select" name="authorityall"  @change="authSelHandler" style="width:130px;">
              <option value="0" selected="true">-- select --</option>
              <option v-for="(auth,ind) in authorityAll" :key="ind" :value="auth.auth_val">{{auth.auth}}</option>
            </select>
          </div>
          <div class="districtSel" :class="{width0: form.searchby!='insp'}" :key="'k6'" >
            <label>District:</label>
            <select v-model="form.districtSel" class="input_select" name="district" style="width:110px;">
              <option value="0" selected="selected">-- select --</option>
              <option v-for="distr in districtAll" :key="distr.distr_val" :value="distr.distr_val">{{distr.distr}}</option>
            </select>
          </div>

          <div class="portSel" :class="{width0: form.searchby!='insp'}" :key="'k7'">
            <label>Port:</label>
            <select v-model="form.portSel" @change="portSelHandler" class="input_select" name="port" style="width:110px;">
               <option value="0" selected="selected">-- select --</option>
                <option v-for="(port,ind) in portAll" :key="ind" :class="port.port_class" :value="port.port_val">{{port.port}}</option>
            </select>
          </div>

          <div class="typeSel" :class="{width0: form.searchby!='insp'}" :key="'k8'">
            <label>Type:</label>
            <select v-model="form.typeSel" class="input_select" style="width:50px;">
              <option v-for="(typ,ind) in typeAll" :key="ind" :value="typ.val">{{typ.type}}</option>
            </select>
          </div>
          <div class="heldSel" :key="'k9'">
            <label>Show:</label>
            <select v-model="form.heldSel" class="input_select" style="width:80px;">
              <option v-for="(hel,ind) in heldAllComp" :key="ind" :value="hel.val">{{hel.type}}</option>
            </select>
          </div>

          <div class="detentionSel" :key="'k10'" :class="{width0: form.searchby!='insp'}">
            <input type="checkbox" v-model="form.detentionSel" id="detentionSel" >
            <label for="detentionSel">Detention</label>
          </div>

          <div class="searchBtn" :key="'k11'">
            <button v-show="!loading" @click="search"><img src="./img/search.png"> Search</button>
            <button v-show="loading"   @click="cancel" title="Cancel request"><img src="./img/stop.png"> Stop</button>
            <button v-show="form.searchby=='insp'"   @click="excel" title="Export to Excel"> <img src="./img/excel.svg"> {{excelBtnText}}</button>
          </div>

    </transition-group>
  </div>
</template>
<script>
export default {
  name: "app-panel",
  data() {
    return {
      form: {
        From: "",
        Till: "",
        authoritySel: 0, // authorityall: this.authoritySel,
        districtSel: 0, // district: this.districtSel,
        portSel: 0, //ports: this.portSel,
        typeSel: -1, //type: this.typeSel,
        heldSel: "0", //held: this.heldSel,
        detentionSel: false, // detention: this.detentionSel ? 1 : 0,
        def_nature: 0,
        searchby: "insp"
      },
      portAll: [],
      districtAll: [],
      heldAll: [
        { type: "Held by Authority", val: 0 },
        { type: "For Authority Flag", val: 1 }
      ],
      typeAll: [
        { type: "all", val: -1 },
        { type: "initial", val: 0 },
        { type: "follow-up", val: 1 }
      ],
      MOU: "TMOU"
    };
  },
  methods: {
    search(e) {
      let form = { ...this.form };
      //переделываем под БД
      form.excel = e == "excel" ? 1 : 0;
      form.authorityall = form.authoritySel;
      form.district = form.districtSel;
      form.ports = form.portSel;
      form.type = form.typeSel;
      form.held = form.heldSel;
      form.detention = form.detentionSel;
      form = Object.getOwnPropertyNames(form)
        .map(e => e + "=" + form[e])
        .join("&");
      store.dispatch("SEARCH_FROM_PANEL", { form, that: this });
    },
    cancel() {
      this.$emit("searchFromPanel", "cancel");
    },
    excel() {
      this.search("excel");
    },

    authSelHandler() {
      if (this.form.authoritySel != 0) {
        this.form.districtSel = 0;
        this.form.portSel = 0;
      }
      this.portAll_function();
      this.districtAll_function();
    },
    districtAll_function() {
      const prt = this.form.portSel;
      const addToArr = (distr_Name, distr_ID) =>
        a.push({ distr: distr_Name, distr_val: distr_ID });
      let a = [];
      if (Object.getOwnPropertyNames(this.CODES_ALL).includes("Districts")) {
        let test = this.CODES_ALL.Districts.District.filter(
          distr =>
            distr["@attributes"].Active == "yes" &&
            distr["@attributes"].MOU == this.MOU &&
            this.portAll.some(port => {
              if (port.port_auth != distr["@attributes"].ID) return false;
              //не совпадают дистрикты
              else if (this.form.authoritySel == 0 && prt == 0) return true;
              //ничего не выбрано при этом! (auth/port)
              else if (this.form.authoritySel != 0 /*&& this.portSel == 0*/) {
                //без второго условия вроде бы норм пашет,тогда посл условие - не нужно - перемудрил,чтоли)) ну,ладно! пока так.
                if (this.form.authoritySel == port.port_country) return true;
                else return false;
              } else if (this.form.authoritySel == 0 && prt != 0) {
                this.portAll
                  .filter(port => port.port_val == prt) //делаем выборку (this.portSel->"PHBCD") из portAll: {port_val:"PHBCD", port_auth:"2", ...}, чтобы узнать port_auth(!)
                  .some(port => port.port_auth == distr.ID)
                  ? 1
                  : 0;
              } else {
                if (
                  this.form.authoritySel == port.port_country &&
                  this.portAll
                    .filter(port => port.port_val == prt)
                    .some(port => port.port_auth == distr.ID)
                )
                  return true;
              }
            })
        );
        test.forEach(distr =>
          addToArr(distr["@attributes"].Name, distr["@attributes"].ID)
        );
      }
      this.districtAll = a;
    },
    portAll_function() {
      const a = [
        /*{port:"-- select --", port_val: 0} */
      ];

      const addToArr = (port_Name, port_Code, port_Country, port_District) => {
        a.push({
          port: port_Name,
          port_val: port_Code,
          port_class:
            "auth" +
            port_Country +
            (port_District != "" ? " dist" + port_District : ""), //потом удалить;)
          port_country: port_Country,
          port_auth: port_District
        });
      };

      if (Object.getOwnPropertyNames(this.CODES_ALL).includes("Ports")) {
        this.CODES_ALL.Ports.Port.filter(
          el =>
            el["@attributes"].Active == "yes" &&
            el["@attributes"].Inherit == 1 &&
            el["@attributes"].MOU == this.MOU
        ).forEach(el => {
          let port = el["@attributes"];
          if (this.form.authoritySel == 0)
            addToArr(port.Name, port.Code, port.Country, port.District);
          //добавим все порты;
          else if (port.Country == this.form.authoritySel)
            addToArr(port.Name, port.Code, port.Country, port.District);
        });
      }
      this.portAll = a;
    },
    portSelHandler() {
      const prt = this.form.portSel;
      if (prt != 0 || prt != "undefined") {
        let auth_m, dist_m;
        let test = this.portAll.filter(port => port.port_val == prt);
        test.forEach(
          port => ([auth_m, dist_m] = [port.port_country, port.port_auth])
        );

        if (prt != 0) {
          [this.form.authoritySel, this.form.districtSel] = [
            auth_m != undefined ? auth_m : 0,
            dist_m != undefined ? dist_m : 0
          ];
        }
      }
      this.districtAll_function();
    }
  },
  watch: {
    CODES_ALL(e) {
      this.authSelHandler();
    }
  },
  mounted() {
    this.form.From = `${
      String(new Date().getDate()).length == 1
        ? 0 + "" + new Date().getDate()
        : new Date().getDate()
    }.${
      String(new Date().getMonth()).length == 1
        ? 0 + "" + new Date().getMonth()
        : new Date().getMonth()
    }.${new Date().getFullYear()}`;
    this.form.Till = `${
      String(new Date().getDate()).length == 1
        ? 0 + "" + new Date().getDate()
        : new Date().getDate()
    }.${
      String(new Date().getMonth() + 1).length == 1
        ? 0 + "" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1
    }.${new Date().getFullYear()}`;
    //$('.calend').each( function ( ) { $(this).datepicker() })/*$('#getinspections button').button( )*/
    //  $('.calend').datepicker({onSelect: function(d,i){if(d !== i.lastVal){$(this).change();}}  });

    $(".calend").datepicker({
      showAnim: "blind",
      buttonImage:
        "https://res.cloudinary.com/dz5tfpyna/image/upload/v1565019612/calendar_ucv2za.png",
      buttonImageOnly: true,
      buttonText: "Select date",
      onSelect: function(d, i) {
        if (d !== i.lastVal) {
          $(this).change();
        }
      }
    });
    $(".calend").change(e => (this.form[e.target.name] = e.target.value));
  },
  computed: {
    loading() {
      return this.$store && this.$store.state.loading;
    },
    inspAttrs() {
      return this.$store && this.$store.INSP_ATTRS;
    },
    defAttrs() {
      return this.$store && this.$store.DEF_ATTRS;
    },
    CODES_ALL() {
      return store.state.CODES_ALL;
    },
    excelBtnText() {
      return this.loading ? "Loading" : "To Excel";
    },
    heldAllComp() {
      if (this.form.authoritySel == 0) {
        this.form.heldSel = 0;
        return [this.heldAll[0]];
      } else return this.heldAll;
    },
    authorityAll() {
      let a = [];
      if (
        Object.getOwnPropertyNames(this.CODES_ALL).includes("AuthoritiesAll")
      ) {
        this.CODES_ALL.AuthoritiesAll.AuthorityAll.filter(
          el => el["@attributes"].MOU == this.MOU
        ).forEach(el => {
          let auth = el["@attributes"];
          a.push({ auth: auth.Name, auth_val: auth.Code });
        });
      }
      return a;
    },
    def_nature_obj: function() {
      let a = [];
      if (
        Object.getOwnPropertyNames(this.CODES_ALL).includes("DeficiencyGroups")
      ) {
        this.CODES_ALL.DeficiencyGroups.DeficiencyGroup.filter(
          el => el["@attributes"].Active == "yes"
        ).forEach(el => {
          let DefC = el["@attributes"];
          let c = parseInt(DefC.Code);
          let code = c; // >0 && c<100?`0${c}00`:`${c}00`;  //=>в шаблоне буду править внешний вид,чтобы на сервак норм коды слал;
          a.push({ txt: DefC.Name, val: code });
        });
      }
      return a;
    }
  }
};
</script>



<style lang="scss">
.search__items {
  display: flex;
  flex-direction: column;
  label {
    margin: 0;
  }
  .search__item {
    display: flex;
    align-items: flex-end;
  }
}

.calend {
  min-width: 70px;
  max-width: 75px;
  text-align: center;
}
.width0 {
  width: 0px;
  display: none;
}
#ui-datepicker-div {
  z-index: 222222 !important;
}
.panelContainerRow img.ui-datepicker-trigger {
  width: 26px;
  top: -3px !important;
  position: relative !important;
  margin-left: 2px !important;
  transition: 2s;
  &:hover {
    background: #cd0a0a66;
    box-shadow: -1px -1px 12px 9px rgba(0, 0, 0, 0.5);
  }
}
</style>

<style scoped lang="scss">
.panelContainer {
  min-width: 900px;
  background-color: #004673;
  .panelContainerRow {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    * {
      transition: 0.4s;
    }
    & > div {
      font-size: 0.8em;
      color: white;
      margin: 2px;
    }
    lebel {
      color: white;
    }
    .searchTill input,
    .searchFrom input {
      width: 60px !important;
      padding-left: 3px;
    }
    .defNature select {
      width: 138px !important;
    }
    .authoritySel select {
      width: 80px !important;
    }
    .searchBy label,
    .searchBy label *,
    .detentionSel * {
      cursor: pointer;
    }
    .input_select {
      height: 23px;
    }
    .detentionSel {
      display: flex;
      padding-top: 13px;
      input {
        margin-top: 2px !important;
      }
    }
    .searchBtn {
      display: flex;
      flex-direction: column;
    }
    .searchBtn img {
      width: 15px;
      margin: 1px 2px 0 0;
    }
    select.input_select {
      cursor: pointer;
      border-radius: 5px;
      * {
        background: #004673;
        color: white;
        border: 1px white solid;
      }
    }
    &.panelContainerRow input {
      border-radius: 5px;
    }
  }
}

.whitesmoke {
  color: whitesmoke !important;
}

.v-select.open {
  width: 150px !important;
}

.my_vue_table td {
  display: inline-block !important;
} /*Меню в строчку!*/
.input_select {
  height: 27px;
}

.v-select .selected-tag,
.v-select input[type="search"],
.v-select input[type="search"]:focus {
  top: -4px !important;
  left: 4px !important;
  margin: 0px !important;
  padding: 0px !important;
}
.v-select.open .selected-tag,
.v-select.open input[type="search"],
.v-select.open input[type="search"]:focus {
  top: 0px !important;
  left: 0px !important;
  margin: 0px !important;
  padding: 0px !important;
}
.v-select .dropdown-toggle .clear {
  bottom: 6px;
}
.v-select {
  color: #006798;
  background: white;
}

.my_vue_table img.ui-datepicker-trigger {
  height: 27px;
  width: 20px;
  padding-bottom: 4px;
  cursor: pointer;
}
.my_vue_table img.ui-datepicker-trigger {
  cursor: pointer !important;
}

span.selected-tag ~ .form-control {
  width: 60px !important;
}
.dropdown.v-select.single.searchable {
  height: 27px;
}

.v-select .ui-button-text {
  padding: 0px 0px;
  font-weight: 999;
}
.v-select .open-indicator,
.v-select .open-indicator:before {
  top: 7px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.icons_in_panel {
  width: 20px;
}

/* стилизация чекера ====»
*/
.detentionSel {
  input[type="checkbox"]:checked + label::after {
    content: "";
    position: absolute;
    width: 1.2ex;
    height: 0.4ex;
    background: rgba(0, 0, 0, 0);
    top: 0.9ex;
    left: 0.4ex;
    border: 3px solid #11b912;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  input[type="checkbox"] {
    line-height: 2.1ex;
  }

  input[type="radio"],
  input[type="checkbox"] {
    position: absolute;
    left: -999em;
  }

  input[type="checkbox"] + label {
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  input[type="checkbox"] + label::before {
    content: "";
    display: inline-block;
    vertical-align: -25%;
    height: 2ex;
    width: 2ex;
    background-color: white;
    border: 1px solid rgb(166, 166, 166);
    border-radius: 4px;
    box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.25);
    margin-right: 0.5em;
  }
}
/*<=== стилизация чекера */
</style>

