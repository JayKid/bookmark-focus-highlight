(function() {
    var COLORS = ['lime','rebeccapurple','orange','blue'];
    var ZERO_KEYCODE = 48;
    var STYLE_TAG_ID = 'bfh';
    var INSPECTOR_ELEMENT_ID = 'bfh-inspector';
    var INSPECTOR_TAGNAME_FIELD_ID = 'bfh-inspector-tag';
    var COLOR_TOKEN = 'COLOR';
    var STYLE_TAG_CONTENTS_TEMPLATE = "*:focus {border: 5px solid " + COLOR_TOKEN + " !important;}";

    var INSPECTOR_STYLES = "width: 100%;height: 10rem;position: fixed;bottom: 0;background: black;color: white; padding: 1rem;";

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
    
    this.createAndAppendInspector = function () {
        var inspectorElement = document.createElement('div');
        inspectorElement.setAttribute('id', INSPECTOR_ELEMENT_ID);
        inspectorElement.setAttribute('style', INSPECTOR_STYLES);
        var inspectorElementTagNameLabel = document.createElement('span');
        inspectorElementTagNameLabel.innerHTML = "Focused element type: ";
        var inspectorElementTagName = document.createElement('span');
        inspectorElementTagName.setAttribute('id', INSPECTOR_TAGNAME_FIELD_ID);
        inspectorElement.appendChild(inspectorElementTagNameLabel);
        inspectorElement.appendChild(inspectorElementTagName);
        document.querySelector('body').appendChild(inspectorElement);
    };

    // Bindings
    this.bindKeyboardShortcuts = function() {
        document.addEventListener('keyup', this.toggleColorOnZeroPressed.bind(this));
    };

    this.addFocusListener = function() {
        document.addEventListener('focusin', function (event) {
            if (event && event.target) {
                var element = event.target;
                var tagNameField = document.querySelector('#'+INSPECTOR_TAGNAME_FIELD_ID);
                if (tagNameField) {
                    tagNameField.innerHTML = element.tagName;
                }
            }
        });
    };

    this.createAndAppendStyleTag();
    this.createAndAppendInspector();

    this.addFocusListener();
    this.bindKeyboardShortcuts();
})();