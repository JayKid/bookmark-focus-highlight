(function() {
    var COLORS = ['lime','rebeccapurple','orange','blue'];
    var ZERO_KEYCODE = 48;
    var STYLE_TAG_ID = 'bfh';
    var COLOR_TOKEN = 'COLOR';
    var STYLE_TAG_CONTENTS_TEMPLATE = "*:focus {border: 5px solid " + COLOR_TOKEN + " !important;}";

    // Init
    this.currentColorIndex = 0;

    // Methods
    this.getNextColor = function() {
        this.currentColorIndex = (this.currentColorIndex+1) % COLORS.length;
        return COLORS[this.currentColorIndex];
    };

    this.generateStyleTagContents = function (color) {
        var contents = STYLE_TAG_CONTENTS_TEMPLATE.replace(COLOR_TOKEN, color);
        return decodeURIComponent(contents);
    };

    this.createAndAppendStyleTag = function() {
        var styleTag = document.createElement('style');
        styleTag.setAttribute('id', STYLE_TAG_ID);
        var nextColor = this.getNextColor();
        styleTag.innerHTML = this.generateStyleTagContents(nextColor);
        document.querySelector('head').appendChild(styleTag);
    };

    this.toggleColorOnZeroPressed = function(event) {
        if (event && event.keyCode === ZERO_KEYCODE) {
            var currentStyleTag = document.querySelector('#'+STYLE_TAG_ID);
            var nextColor = this.getNextColor();
            currentStyleTag.innerHTML = this.generateStyleTagContents(nextColor);
        }
    };

    this.bindKeyboardShortcuts = function() {
        document.addEventListener('keyup', this.toggleColorOnZeroPressed.bind(this));
    };

    this.createAndAppendStyleTag();
    this.bindKeyboardShortcuts();
})();