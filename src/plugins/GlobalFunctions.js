/**
 * Created by yuanjianxin on 2018/3/15.
 */
const globalFunctions={

  /**
   * 返回
   */
  goBack(){
    window.history.go(-1);
  },

  //todo more functions


}

export default {
  install:(Vue)=>{
    Vue.prototype.$globalFunction=globalFunctions;
  }
}
