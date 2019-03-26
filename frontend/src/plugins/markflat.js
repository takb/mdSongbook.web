import getShowdown from './showdown.ext-markflat'
const Markflat = {
  install(Vue, options) {
    Vue.prototype.$markflat = getShowdown();
    if (typeof options == 'object') {
      if (options.zoom) {
        Vue.prototype.$markflat.zoom = options.zoom;
      }
      if (options.transposeBy) {
        Vue.prototype.$markflat.transposeBy = options.transposeBy;
      }
    }
  }
}
export default Markflat;
