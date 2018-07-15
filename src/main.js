// Init
this.currentColorIndex = 0;
this.isInspectorDisplayed = true;
this.inspectorPosition = INSPECTOR_POSITION_BOTTOM;

// Methods
this.getNextColor = function() {
    this.currentColorIndex = (this.currentColorIndex+1) % COLORS.length;
    return COLORS[this.currentColorIndex];
};

this.getInspectorStyles = function() {
    return INSPECTOR_STYLES + INSPECTOR_STYLE_FOR_POSITION[this.inspectorPosition];
}

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

this.toggleInspector = function(event) {
    if (event && event.key === I_KEY) {
        var inspectorElement = document.querySelector('#'+INSPECTOR_ELEMENT_ID);
        if (this.isInspectorDisplayed) {
            inspectorElement.style.display = 'none';
        }
        else {
            inspectorElement.style.display = 'block';
        }
        this.isInspectorDisplayed = !this.isInspectorDisplayed;
    }
};

this.toggleInspectorPosition = function() {
    if (event && event.key === P_KEY) {
        this.inspectorPosition = (this.inspectorPosition + 1) % INSPECTOR_POSITIONS.length;
        var inspectorElement = document.getElementById(INSPECTOR_ELEMENT_ID);
        inspectorElement.setAttribute('style', this.getInspectorStyles());
    }
};

this.toggleColor = function(event) {
    if (event && event.keyCode === ZERO_KEYCODE) {
        var currentStyleTag = document.querySelector('#'+STYLE_TAG_ID);
        var nextColor = this.getNextColor();
        currentStyleTag.innerHTML = this.generateStyleTagContents(nextColor);
    }
};

this.createAndAppendInspector = function () {
    var inspectorElement = document.createElement('div');
    inspectorElement.setAttribute('id', INSPECTOR_ELEMENT_ID);
    inspectorElement.setAttribute('style', this.getInspectorStyles());
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
    document.addEventListener('keyup', this.toggleInspectorPosition.bind(this));
    document.addEventListener('keyup', this.toggleInspector.bind(this));
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