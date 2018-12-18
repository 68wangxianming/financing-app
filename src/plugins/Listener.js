/**
 * Created by yuanjianxin on 2018/3/15.
 */
import Vue from 'vue'
const listen=new Vue();
const Listener={
   install:(Vue)=>{
      Vue.prototype.$listener=listen;
   }
}
export default Listener
