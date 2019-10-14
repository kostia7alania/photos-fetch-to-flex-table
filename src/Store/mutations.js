const mutations = {
  changeProp(store, { prop, state }) {
    this._vm.$set(store, prop, state);
  },
  SET_CODES_ALL(state, payload) { state.codes_all = payload },
  SET_API_URL(state, payload) { state.api_url = payload },
  SET_IMAGES_BY_DEFS(state, payload) { state.IMAGES_BY_DEFS = payload },
  SET_LOADING_ON(state) { state.loading = true },
  SET_LOADING_OFF(state) { state.loading = false },
  SET_FORM(state, payload) { state.FORM = payload },
  SET_INSPECTIONS(state, payload) { state.SET_INSPECTIONS = payload },
  SET_INSP_ATTRS(state, payload) { state.INSP_ATTRS = payload },
  SET_DEF_ATTRS(state, payload) { state.DEF_ATTRS = payload },
  SET_ATTRS_STATUS(state, { status }) {
    const searchby = state.Form.searchby
    if (searchby == "insp") {
      state.INSP_ATTRS.status = status;
      if (status == 2) state.SET_INSPECTIONS = [];
    } // чистим деф или инсп при ошибке;
    if (searchby == "def") {
      state.DEF_ATTRS.status = status;
      if (status == 2) state.SET_INSPECTIONS = [];
    } // чистим деф или инсп при ошибке;
  },
  SET_DEFS_TABLE(state, payload) {
    state.DEFS_TABLE = payload
  }
};

export default mutations;
