;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-icontabdown" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M512 660.736c-10.922667 0-21.845333-4.181333-30.165333-12.501333l-191.36-191.36c-16.682667-16.682667-16.682667-43.648 0-60.330667s43.648-16.682667 60.330667 0L512 557.738667l161.194667-161.194667c16.682667-16.682667 43.648-16.682667 60.330667 0s16.682667 43.648 0 60.330667l-191.36 191.36C533.845333 656.597333 522.922667 660.736 512 660.736z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-jiantouxiangxia" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M866.638531 283.226596c11.680017 14.969946 12.659321 33.733289 2.186805 41.907459L527.292799 591.542614c-2.362814 1.851161-9.949606 6.407943-11.239995 7.837502-12.724813 14.066367-31.019481 18.287505-40.889269 9.386788L153.508721 318.711785c-9.868765-8.915044-7.590885-27.562752 5.13802-41.660842 12.722766-14.090926 31.018457-18.295692 40.918945-9.389858l292.737204 263.964904L826.521858 270.920316C837.02712 262.742053 854.986143 268.264836 866.638531 283.226596L866.638531 283.226596zM866.638531 283.226596"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
