chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    minWidth: 660, minHeight: 540,
    bounds: {
      width: 660,
      height: 540
    },
    "id": "AppWindow",
    //"resizable": false,
    "frame": "none",
  });
});