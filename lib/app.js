//Global variables
var themeInput = document.getElementById("themes");
themeInput.onchange = changeTheme; // CSP restricted inline scripting so I need to do it this way...
var lineNum = document.getElementById("lineNum");
var menuOpen = false;
var linenumber = true;

//HandleClose-----------------------------------------------------------------------------------
document.getElementById("close").onclick = function() {
    window.close();
}
//HandleClose-----------------------------------------------------------------------------------

$("#menu").hide();

//HandleMenu -----------------------------------------------------------------------------------
$("#menuBtn").click(function(event) {
    event.stopPropagation();
    if (menuOpen == false) {
        $("#menu").show()
        $("#menu").animate({'margin-top': '70', 'opacity':1}, 160);
        $("#menuBtn").css("background", "#d9d9d9");
        menuOpen = true;
        //$("#editor").css("-webkit-filter", "blur(5px)");
        
    } else {
        $("#menuBtn").css("background", "#ffffff");
        $("#menu").animate({'margin-top': '50', 'opacity':0}, 160);
        $("#menu").fadeOut(0)
        menuOpen = false;
    }
});

$(document).click(function() {
    $("#menuBtn").css("background", "#ffffff");
    $("#menu").animate({'margin-top': '50', 'opacity':0}, 160);
    $("#menu").fadeOut(0)
    menuOpen = false;
});

$("#lineNum").click(function(event) { // So when I toggle line numbers the menu is still opened.
    event.stopPropagation();
});
$("#themes").click(function(event) {
    event.stopPropagation();
});
//HandleMenu -----------------------------------------------------------------------------------

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
        document.title = 'Carbon : ' + document.getElementById("title").innerHTML + '';
        document.getElementById("title").innerHTML = fileName;
    } else {
        document.title = 'Carbon : ' + document.getElementById("title").innerHTML + '*';
        document.getElementById("title").innerHTML = '*' + fileName;
    }
}

function changeTheme() {
    var theme = themeInput.options[themeInput.selectedIndex].innerHTML;
    editor.setOption("theme", theme);
}

lineNum.onclick = lineNumToggle;

function lineNumToggle() {
    if (!linenumber) {
        $("#lineNum").css('background', '#d5eaff');
        editor.setOption("lineNumbers", true);
        linenumber = true;
    } else {
        $("#lineNum").css('background', '#FFF');
        editor.setOption("lineNumbers", false);
        linenumber = false;
    }
}