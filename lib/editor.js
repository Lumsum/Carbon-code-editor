// All from mini-code-edit :D Thank you so much
// Modified by Supakorn Suttiruang :D

var newButton, openButton, saveButton;
var editor;
var fileEntry;
var hasWriteAccess;
var editorContent;


function errorHandler(e) {
  var msg = "";

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
    msg = "QUOTA_EXCEEDED_ERR";
    break;
    case FileError.NOT_FOUND_ERR:
    msg = "NOT_FOUND_ERR";
    break;
    case FileError.SECURITY_ERR:
    msg = "SECURITY_ERR";
    break;
    case FileError.INVALID_MODIFICATION_ERR:
    msg = "INVALID_MODIFICATION_ERR";
    break;
    case FileError.INVALID_STATE_ERR:
    msg = "INVALID_STATE_ERR";
    break;
    default:
    msg = "Unknown Error";
    break;
  };

  console.log("Error: " + msg);
}

function handleDocumentChange(title) {
  var mode = "none";
  var modeName = "Plain text";
  if (title) {
    title = title.match(/[^/]+$/)[0];
    fileName = title;
    document.getElementById("title").innerHTML = title;
    document.title = 'Carbon : ' + title;
    if (title.match(/.json$/)) {
      mode = {name: "javascript", json: true};
      modeName = "JavaScript (JSON)";
    } else if (title.match(/.html$/)) {
      mode = "htmlmixed";
      modeName = "HTML";
    } else if (title.match(/.css$/)) {
      mode = "css";
      modeName = "CSS";
    } else if (title.match(/.py$/)) {
      mode = "python";
      modeName = "Python";
    } else if (title.match(/.js$/)) {
      mode = "javascript";
      modeName = "Javascript";
    }
  } else {
    fileName = 'Untitled';
    document.getElementById("title").innerHTML = "Untitled";
  }
  editor.setOption("mode", mode);
//  document.getElementById("mode").innerHTML = modeName;
}

function newFile() {
  fileEntry = null;
  hasWriteAccess = false;
  handleDocumentChange(null);
  editorContent = ''; // Init
}

function setFile(theFileEntry, isWritable) {
  fileEntry = theFileEntry;
  hasWriteAccess = isWritable;
}

function readFileIntoEditor(theFileEntry) {
  if (theFileEntry) {
    theFileEntry.file(function(file) {
      var fileReader = new FileReader();

      fileReader.onload = function(e) {
        handleDocumentChange(theFileEntry.fullPath);
        editor.setValue(e.target.result);
//      saveButton.innerHTML = e.target.result; Just a test
        editorContent = e.target.result; // Save content for comparing
        saveIndicator(true);
      };

      fileReader.onerror = function(e) {
        console.log("Read failed: " + e.toString());
      };

      fileReader.readAsText(file);
    }, errorHandler);
  }
}

function writeEditorToFile(theFileEntry) {
  theFileEntry.createWriter(function(fileWriter) {
    fileWriter.onerror = function(e) {
      console.log("Write failed: " + e.toString());
    };

    var blob = new Blob([editor.getValue()]);
    fileWriter.truncate(blob.size);
    fileWriter.onwriteend = function() {
      fileWriter.onwriteend = function(e) {
        handleDocumentChange(theFileEntry.fullPath);
        console.log("Write completed.");
      };

      fileWriter.write(blob);
      editorContent = editor.getValue(); // Update content for comparing
    }
  }, errorHandler);
}

var onChosenFileToOpen = function(theFileEntry) {
  setFile(theFileEntry, false);
  readFileIntoEditor(theFileEntry);
};

var onWritableFileToOpen = function(theFileEntry) {
  setFile(theFileEntry, true);
  readFileIntoEditor(theFileEntry);
};

var onChosenFileToSave = function(theFileEntry) {
  setFile(theFileEntry, true);
  writeEditorToFile(theFileEntry);
};

function handleNewButton() {
  if (false) {
    newFile();
    editor.setValue("");
  } else {
    chrome.app.window.create('../index.html', {
      frame: 'none', minWidth: 960, minHeight: 740, bounds: { width: 960, height: 740}
    });
  }
}

function handleOpenButton() {
  chrome.fileSystem.chooseEntry({ type: 'openWritableFile' }, onWritableFileToOpen);
}

function handleSaveButton() {
  if (fileEntry && hasWriteAccess) {
    writeEditorToFile(fileEntry);
  } else {
    chrome.fileSystem.chooseEntry({ type: 'saveFile' }, onChosenFileToSave);
  }
}

function initContextMenu() {
  chrome.contextMenus.removeAll(function() {
    for (var snippetName in SNIPPETS) {
      chrome.contextMenus.create({
        title: snippetName,
        id: snippetName,
        contexts: ['all']
      });
    }
  });
}

chrome.contextMenus.onClicked.addListener(function(info) {
  // Context menu command wasn't meant for us.
  if (!document.hasFocus()) {
    return;
  }

  editor.replaceSelection(SNIPPETS[info.menuItemId]);
});

onload = function() {
  initContextMenu();

  newButton = document.getElementById("new");
  openButton = document.getElementById("open");
  saveButton = document.getElementById("save");

  newButton.addEventListener("click", handleNewButton);
  openButton.addEventListener("click", handleOpenButton);
  saveButton.addEventListener("click", handleSaveButton);

  editor = CodeMirror(
    document.getElementById("editor"),
    {
      mode: {name: "javascript", json: true },
      lineNumbers: true,
      theme: "monokai",
      fixedGutter: true,
      extraKeys: {
        "Cmd-S": function(instance) { handleSaveButton() },
        "Ctrl-S": function(instance) { handleSaveButton() },
        "Ctrl-D": function() { Commands() }
      },
        viewportMargin: Infinity,
        change: function(editor) { saveButton.setAttribute("class", "activated"); },
        lineWrapping: true
    });


  newFile();
  onresize();
};

onresize = function() {
  var container = document.getElementById('editor');
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;

  var scrollerElement = editor.getScrollerElement();
  scrollerElement.style.width = containerWidth + 'px';
  scrollerElement.style.height = containerHeight + 'px';
    // Auto resize
//    var browserHeight = 
//        document.documentElement.clientHeight; 
//        editor.getWrapperElement().style.height = (0.9*browserHeight) + 'px';

    editor.refresh(); 

}
