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

this.toggleColor = function(event) {
    if (event && event.keyCode === ZERO_KEYCODE) {
        var currentStyleTag = document.querySelector('#'+STYLE_TAG_ID);
        var nextColor = this.getNextColor();
        currentStyleTag.innerHTML = this.generateStyleTagContents(nextColor);
    }
};

this.getAttributesListMarkup = function (DOMNode) {

    var createAttributeListItem = function (attributeName, attributeValue) {
        var listItemElement = document.createElement('li');
        var attributeNameElement = document.createElement('span');
        attributeNameElement.innerText = attributeName + ": ";
        var attributeValueElement = document.createElement('span');
        
        if (attributeName.indexOf('describedby') > 0 || attributeName.indexOf('labelledby') > 0) {
            // Get the contents of the elements its referencing
            var referencedElement = document.getElementById(attributeValue);
            attributeValueElement.innerText = "#" + attributeValue + "'s contents which are: \"" + referencedElement.innerText + "\"";
        }
        else {
            attributeValueElement.innerText = attributeValue;
        }
        
        listItemElement.appendChild(attributeNameElement);
        listItemElement.appendChild(attributeValueElement);
        return listItemElement;
    }

    var listElement = document.createElement('ul');
    var attributesToDisplay = DOMNode.getAttributeNames().filter(function(attributeName) {
        return attributeName.indexOf('aria') >= 0;
    });
    
    for (var index in attributesToDisplay) {
        var attributeName = attributesToDisplay[index];
        listElement.appendChild(createAttributeListItem(attributeName, DOMNode.getAttribute(attributeName)));
    }
    return listElement;
};

// Bindings
this.bindKeyboardShortcuts = function() {
    document.addEventListener('keyup', this.toggleColor.bind(this));
    document.addEventListener('keyup', Inspector.toggleInspectorPosition);
    document.addEventListener('keyup', Inspector.toggleDisplay);
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
Inspector.createAndAppendInspector();

this.addFocusListener();
this.bindKeyboardShortcuts();