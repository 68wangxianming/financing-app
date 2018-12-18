/**
 * Created by yuanjianxin on 2018/3/23.
 */

let dispatchCallback={};
let eventListener={};
let eventQueue=[];
let bridgeFrame=null;
const _SCHEME="yjx";
const _QUEUE_ALARM="EVENT_ALARM";
class JsBridge{

  static get instance(){
    if(!JsBridge._instance)
      JsBridge._instance=new JsBridge();
    return JsBridge._instance;
  }

  constructor(){
    this.doc=document;
    this.createBridgeIframe();
  }

  createBridgeIframe(){
    if(bridgeFrame!==null)
      return undefined;
    bridgeFrame=this.doc.createElement('iframe');
    bridgeFrame.style.display='none';
    this.doc.documentElement.appendChild(bridgeFrame);
  }

  init(){
    if(!window.JSBridge)
      window.JSBridge={
        _fetchQueue:this.fetchQueue,
        _dispatchMessageFromNative:this.dispatchMessageFromNative
      }
  }

  addEventListener(req){
    if (!req || !req.handlerName || !req.callback) {
      return undefined;
    }

    if(!eventListener[req.handlerName])
      eventListener[req.handlerName]=[];
    eventListener[req.handlerName].push(req.callback);
  }


  dispatch(req){
    if(!req || !req.handlerName)
      return undefined;

    // 注册回调函数
    if(req.callback){
      let callbackId=generateCallbackId();
      req.callbackId=callbackId;
      dispatchCallback[callbackId]=req.callback;
    }

    //添加到事件队列
    eventQueue.push(req);

    //通知 native
    bridgeFrame.src=_SCHEME+'://'+_QUEUE_ALARM;

  }

  fetchQueue(){
    let eventQueueString=JSON.stringify(eventQueue);
    eventQueue=[];
    bridgeFrame.src=_SCHEME+'://return/'+_QUEUE_ALARM+'/'+encodeURIComponent(eventQueueString);
  }


  dispatchMessageFromNative(messageJSON){
    console.log('=====messge',messageJSON);
    let msg=messageJSON;
    let callbackFunc;
    let data=msg.data;
    // try{
    //   data=JSON.parse(msg.data);
    // }catch (e){
    //   data=msg.data;
    // }

    // js dispatch callback
    if(data.callbackId){
      callbackFunc=dispatchCallback[data.callbackId];
      if(!callbackFunc)
        return undefined;
      callbackFunc({data,msg:msg.msg,code:msg.code});
      delete dispatchCallback[data.callbackId];
      return undefined;
    }

    //todo  js event callback

    if(!msg.handlerName)
      return undefined;
    let funcs=eventListener[msg.handlerName] || [];
    funcs.forEach(v=>v({data,msg:msg.msg,code:msg.code}));
  }



}


function generateCallbackId(){
  return 'cb_'+Date.now();
}


export default {
  install:(Vue)=>{
    JsBridge.instance.init();
    Vue.prototype.$jsBridge=JsBridge.instance;
  }
}
