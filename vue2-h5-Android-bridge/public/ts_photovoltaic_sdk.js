function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}



setupWebViewJavascriptBridge(function(bridge) {
  var TsPhotovoltaicSDK = {}
  var configs = [
    'toast',
    'goBack',
    'goClose',
    'checkGoBack',
    'getDeviceInfo',
    'getUserInfo',
    'setStatusBarStyle',
  ]

  // 安卓去调用JS的方法
  // 展示省略

  // JS去调用安卓端的方法
  if (typeof bridge == 'function') {
    configs.forEach(key => {
      TsPhotovoltaicSDK[key] = ({params = {}, callback = () => {}}) => {
        bridge({
          method: key,
          params: params,
          callback
        })
      }
    })
  } 
  if (typeof bridge == 'object') {
    configs.forEach(key => {
      TsPhotovoltaicSDK[key] = ({params = {}, callback = () => {}}) => {
        bridge.callHandler(key, params, callback)
      }
    })
  }

  window.TsPhotovoltaicSDK = TsPhotovoltaicSDK
})