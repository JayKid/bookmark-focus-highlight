(function() {
    var COLORS = ['lime','rebeccapurple','orange','blue'];
    var ZERO_KEYCODE = 48;
    var STYLE_TAG_ID = 'bfh';
    var INSPECTOR_ELEMENT_ID = 'bfh-inspector';
    var INSPECTOR_TAGNAME_FIELD_ID = 'bfh-inspector-tag';
    var INSPECTOR_TAG_ATTRIBUTE_LIST_ID = 'bfh-inspector-tag-attr-list';
    var COLOR_TOKEN = 'COLOR';
    var STYLE_TAG_CONTENTS_TEMPLATE = "*:focus {border: 5px solid " + COLOR_TOKEN + " !important;} input[type=\"radio\"]:focus, input[type=\"checkbox\"]:focus { outline: 5px solid " + COLOR_TOKEN + " !important; }";

    var INSPECTOR_STYLES = "width: 100%;height: 10rem;position: fixed;bottom: 0;background: rgba(0, 0, 0, 0.5);color: white; padding: 1rem; font-size: 1.4rem";

    // Init
    this.currentColorIndex = 0;

    // Methods
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
        var listElement = document.createElement('ul');
        listElement.setAttribute('id', INSPECTOR_TAG_ATTRIBUTE_LIST_ID);
        inspectorElement.appendChild(inspectorElementTagNameLabel);
        inspectorElement.appendChild(inspectorElementTagName);
        inspectorElement.appendChild(listElement);
        document.querySelector('body').appendChild(inspectorElement);
    };

    this.getAttributesListMarkup = function (DOMNode) {
        var listElement = document.createElement('ul');
        var attributesToDisplay = DOMNode.getAttributeNames().filter(function(attributeName) {
            return attributeName.indexOf('aria') >= 0;
        });
        for (var index in attributesToDisplay) {
            var attributeName = attributesToDisplay[index];
            var listItemElement = document.createElement('li');
            var attributeNameElement = document.createElement('span');
            attributeNameElement.innerText = attributeName + ": ";
            var attributeValueElement = document.createElement('span');
            attributeValueElement.innerText = DOMNode.getAttribute(attributeName);
            listItemElement.appendChild(attributeNameElement);
            listItemElement.appendChild(attributeValueElement);
            listElement.appendChild(listItemElement);
        }
        return listElement;
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
                    var attributeListElement = this.getAttributesListMarkup(element);
                    var tagAttributeListElement = document.querySelector('#'+INSPECTOR_TAG_ATTRIBUTE_LIST_ID);
                    tagAttributeListElement.innerHTML = attributeListElement.innerHTML;
                }
            }
        }.bind(this));
    };

    this.createAndAppendStyleTag();
    this.createAndAppendInspector();

    this.addFocusListener();
    this.bindKeyboardShortcuts();
})();