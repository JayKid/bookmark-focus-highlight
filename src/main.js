// Focus state
this.currentColorIndex = 0;

// Focus methods
this.getNextColor = function() {
    this.currentColorIndex = (this.currentColorIndex+1) % COLORS.length;
    return COLORS[this.currentColorIndex];
};

this.generateStyleTagContents = function (color) {
    var contents = STYLE_TAG_CONTENTS_TEMPLATE.replace(COLOR_TOKEN, color).replace(COLOR_TOKEN, color);
    return decodeURIComponent(contents);
};

this.createAndAppendStyleTag = function() {
    var styleTag = document.createElement('style');
    styleTag.setAttribute('id', STYLE_TAG_ID);
    var nextColor = this.getNextColor();
    styleTag.innerHTML = this.generateStyleTagContents(nextColor);
    document.querySelector('head').appendChild(styleTag);
};

this.toggleColor = function(event) {
    if (event && event.keyCode === ZERO_KEYCODE) {
        var currentStyleTag = document.querySelector('#'+STYLE_TAG_ID);
        var nextColor = this.getNextColor();
        currentStyleTag.innerHTML = this.generateStyleTagContents(nextColor);
    }
};

// Initialization
// DOM Manipulation
this.createAndAppendStyleTag();
Inspector.createAndAppendInspector();

// Key bindings
Inspector.initializeKeyBindings();
document.addEventListener('keyup', this.toggleColor.bind(this));