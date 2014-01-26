//Global variables
var themeInput = document.getElementById("themes");
themeInput.onchange = changeTheme; // CSP restricted inline scripting so I need to do it this way...
var lineNum = document.getElementById("lineNum");

var mixedMode = { // HTML mixed mode
        name: "htmlmixed",
        scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
                       mode: null},
                      {matches: /(text|application)\/(x-)?vb(a|script)/i,
                       mode: "vbscript"}]
      };

// Key Listener
editor.onkeyup = function(e) {
    // Saved/Unsaved Indicator
   if (editor.getValue() != editorContent) {
       saveIndicator(false);

   } else {
       saveIndicator(true); // It works! :)
   }
}

// Save Indicator
function saveIndicator(bool) {
    if (bool) {
        document.getElementById("ind").innerHTML = '';
        document.title = 'Carbon : ' + document.getElementById("title").innerHTML + '';
        saveButton.setAttribute('class', '');
    } else {
        document.getElementById("ind").innerHTML = '*';
        document.title = 'Carbon : ' + document.getElementById("title").innerHTML + '*';
        saveButton.setAttribute('class', 'unsaved');
    }
}

function changeTheme() {
    var theme = themeInput.options[themeInput.selectedIndex].innerHTML;
    editor.setOption("theme", theme);
}

lineNum.onclick = lineNumToggle;

function lineNumToggle() {
    if (lineNum.className == "") {
        lineNum.setAttribute("class", "activated");
        editor.setOption("lineNumbers", true);
    } else {
        lineNum.removeAttribute("class", "activated");
        editor.setOption("lineNumbers", false);
    }
}