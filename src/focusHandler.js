// FocusHandler
// Constants
var COLORS = ['lime','rebeccapurple','orange','blue'];
var COLOR_TOKEN = 'COLOR';
var STYLE_TAG_CONTENTS_TEMPLATE = "*:focus {border: 5px solid " + COLOR_TOKEN + " !important;} input[type=\"radio\"]:focus, input[type=\"checkbox\"]:focus { outline: 5px solid " + COLOR_TOKEN + " !important; }";
var STYLE_TAG_ID = 'bfh';
var ZERO_KEYCODE = 48;

// State
var currentColorIndex = 0;

// Methods
var getNextColor = function () {
    currentColorIndex = (currentColorIndex+1) % COLORS.length;
    return COLORS[currentColorIndex];
};

var generateStyleTagContents = function (color) {
    var contents = STYLE_TAG_CONTENTS_TEMPLATE.replace(COLOR_TOKEN, color).replace(COLOR_TOKEN, color);
    return decodeURIComponent(contents);
};

var createAndAppendStyleTag = function () {
    var styleTag = document.createElement('style');
    styleTag.setAttribute('id', STYLE_TAG_ID);
    var nextColor = getNextColor();
    styleTag.innerHTML = generateStyleTagContents(nextColor);
    document.querySelector('head').appendChild(styleTag);
};

var toggleColor = function (event) {
    if (event && event.keyCode === ZERO_KEYCODE) {
        var currentStyleTag = document.querySelector('#'+STYLE_TAG_ID);
        var nextColor = getNextColor();
        currentStyleTag.innerHTML = generateStyleTagContents(nextColor);
    }
};

var initializeKeyBindings = function () {
    document.addEventListener('keyup', toggleColor);
}

window.FocusHandler = {
    getNextColor: getNextColor,
    generateStyleTagContents: generateStyleTagContents,
    createAndAppendStyleTag: createAndAppendStyleTag,
    toggleColor: toggleColor,
    initializeKeyBindings: initializeKeyBindings
};