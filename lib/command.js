// I love this thing :D
function Commands() {
    var currentLine = editor.getCursor().line;
   if (editor.getLine(currentLine).slice(-3) == 'div') {
        editor.replaceSelection("<div id=\"", "end");
        editor.replaceSelection("\"></div>", "start");
    } 
    
    else if (editor.getLine(currentLine) == 'html') {
        editor.replaceSelection("<html>\n", "end");
        editor.replaceSelection("\n</html>", "start");
    }
    
    else { //Normal tabbing 
       // editor.replaceSelection("    ", "end");
    }
        document.getElementById('title').innerHTML = editor.getCursor().line;
}
