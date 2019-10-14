//const watch_url = url_api+'?action=watch&dir=watch&v='
//const gif_url = url_api+'?action=watch&dir=gif&v='
//: 'http://localhost:3000/backend',//'./backend/';// 'https://apcis.tmou.org/APCIS-Test/index.php',
import codesAll from './codes_example'

const state = {
  API_URL: '',
  CODES_ALL: '',
  IMAGES_BY_DEFS: [],
  IMAGES_BY_INSP: [],

  DEF_ATTRS: { //-1 - indicates that we have not searched yet!; 0 - loading; 1 - ready; 2-err
    Found: 0,
    Page: 0,
    status: -1
  },
  INSP_ATTRS: {
    Found: 0,
    Page: 0,
    status: -1,
    exportExcelText: ''
  },

  FORM: {

  },
  INSPECTIONS: [],
  DEFS_TABLE: [],
};
export default state;
