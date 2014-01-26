chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    minWidth: 960, minHeight: 740,
    bounds: {
      width: 960,
      height: 740
    },
    "id": "AppWindow",
    //"resizable": false,
    "frame": "chrome",
  });
});