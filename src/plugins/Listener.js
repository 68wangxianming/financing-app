import Vue from 'vue'
const listen=new Vue();
const Listener={
   install:(Vue)=>{
      Vue.prototype.$listener=listen;
   }
}
export default Listener
