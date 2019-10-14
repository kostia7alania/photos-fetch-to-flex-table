
export default {
  GET_CODES_ALL({ state, commit }) {
    axios.get(state.API_URL + "GetCodesAll").then(res => {
      if (typeof res.data == "object") commit('SET_CODES_ALL', res.data);
      else console.log('=>error while getting => ', res.data);
    });
  },

  GET_IMAGES_BY_DEFS({ state, commit }, { group, data, callback }) {
    commit('SET_LOADING_ON')
    return axios
      .post(
        `${state.API_URL}group=${group}`,
        Object.getOwnPropertyNames(data)
          .map(e => e + "=" + data[e])
          .join("&") /*qs.stringify(this.data)*/
      )
      .then(res => {
        const record = res.data[0][0].Record;
        const ddd = Object.getOwnPropertyNames(record).includes("@attributes")
          ? [record["@attributes"]]
          : record.map(e => e["@attributes"]);
        // ddd = _.groupBy(ddd, e => e.InspUID)

        ddd = require('lodash').groupBy(ddd, e => e.FullNatureCode);
        commit('SET_IMAGES_BY_DEFS', Object.getOwnPropertyNames(ddd).map(e => ddd[e]))
        callback({ status: 1 })
      })
      .catch(e => callback({ status: 0 }))
      .finally(() => commit('SET_LOADING_ON'))
  },

  GET_IMAGES_BY_INSP({ state, commit }) { // onclick_insps_search_photos
    const searchby = state.FORM.searchby;
    commit("SET_ATTRS_STATUS", { status: 0 });
    commit('SET_LOADING_ON')
    axios
      .post(state.API_URL + "getinspections_photos", form)
      .then(res => {
        const dat = res.data
        if (typeof dat == "object") {
          //пришел норм ответ (объект)
          if (searchby == "insp") {
            commit('SET_INSP_ATTRS', dat["@attributes"])
            if (this.inspAttrs.Found == 0) {
              commit('SET_INSPECTIONS', [])
            } else {
              const inspections =
                this.inspAttrs.Found == 1
                  ? [this.insps_parse_tranform(dat.Inspection, searchby)]
                  : dat.Inspection.map(ee => this.insps_parse_tranform(ee));
              commit('SET_INSPECTIONS', inspections)
            }
          } else commit('SET_DEFS_TABLE', dat)
          commit("SET_ATTRS_STATUS", { status: 1 });
        } else commit("SET_ATTRS_STATUS", { status: 2 }); // пришла ошибка //change status + clear insp/def []'s;

      })
      .finally(() => commit('SET_LOADING_OFF'))
  },

  SEARCH_FROM_PANEL({ state, commit, dispatch }, { form }) {
    commit('SET_FORM', form)
    if (typeof form == "object") dispatch('GET_IMAGES_BY_INSP')
    else if (typeof form == "string") {
      commit('SET_LOADING_ON')
      axios
        .post(`${state.API_URL}getinspections_photos&excel=1`, form)
        .then(res => {
          res.headers["content-type"].match("excel") && down_excel(res)
        })
        .catch(e => {
          debugger
          console.log(e)
        })
        .finaly(() => commit('SET_LOADING_OFF'))


      if (form == "stop") {
        console.log("pressed STOP.!.");
      }
    } else
      console.log(
        "unexpected datetype of data-prop in App->searchFromPanel(date)"
      );
  }
};


function down_excel(res) {
  let file = res.data;
  let filename = res.headers["filename"]
    ? res.headers["filename"]
    : "Inspection photos report.xls";
  let mimetype = res.headers["content-type"];
  import("./download_file.js").then(downloadFile =>
    downloadFile(file, filename, mimetype)
  );
}