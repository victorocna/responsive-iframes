let height;
const sendPostMessage = () => {
  if (height !== document.getElementsByTagName('body')[0].offsetHeight) {
    height = document.getElementsByTagName('body')[0].offsetHeight;

    window.parent.postMessage({
      frameHeight: height
    }, '*');
  }
};

const listenForTextareaResize = () => {
  const textareas = document.getElementsByTagName('textarea')
  for (let i = 0; i < textareas.length; i++) {
    const ta = textareas[i]

    var _width = ta.clientWidth;
    var _height = ta.clientHeight;
    ta.addEventListener('mousemove', function () {
      if (ta.clientWidth != _width || ta.clientHeight != _height) {
        sendPostMessage();
      }
      _width = ta.clientWidth;
      _height = ta.clientHeight;
    });
  }
}

const listenForDomMutation = () => {
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  var observer = new MutationObserver(function () {
    sendPostMessage();
  });

  // define what element should be observed by the observer
  // and what types of mutations trigger the callback
  observer.observe(document, {
    subtree: true,
    attributes: true
  });
}

window.onresize = () => {
  sendPostMessage();
}
window.onload = () => {
  sendPostMessage();
  listenForTextareaResize();
  listenForDomMutation();
}
