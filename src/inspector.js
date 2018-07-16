// Constants
var I_KEY = 'i';
var P_KEY = 'p';
var INSPECTOR_ELEMENT_ID = 'bfh-inspector';
var INSPECTOR_TAGNAME_FIELD_ID = 'bfh-inspector-tag';
var INSPECTOR_TAG_ATTRIBUTE_LIST_ID = 'bfh-inspector-tag-attr-list';
var INSPECTOR_STYLES = "background: rgba(0, 0, 0, 0.5);color: white; padding: 1rem; font-size: 1.4rem;";
var INSPECTOR_POSITION_BOTTOM = 0;
var INSPECTOR_POSITION_SIDE = 1;
var INSPECTOR_POSITIONS = [ INSPECTOR_POSITION_BOTTOM, INSPECTOR_POSITION_SIDE ];
var INSPECTOR_STYLE_FOR_POSITION = [];
INSPECTOR_STYLE_FOR_POSITION[INSPECTOR_POSITION_BOTTOM] = "width: 100%;height: auto;position: fixed;bottom: 0;";
INSPECTOR_STYLE_FOR_POSITION[INSPECTOR_POSITION_SIDE] = "width: auto;height: 100%;position: absolute;right: 0;top: 0;";

var getInspectorStyles = function () {
    return INSPECTOR_STYLES + INSPECTOR_STYLE_FOR_POSITION[window.Inspector.inspectorPosition];
}

var createAndAppendInspector = function () {
    var inspectorElement = document.createElement('div');
    inspectorElement.setAttribute('id', INSPECTOR_ELEMENT_ID);
    inspectorElement.setAttribute('style', getInspectorStyles());
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
    window.Inspector.isDisplayed = true;
};

var toggleInspectorPosition = function (event) {
    if (event && event.key === P_KEY) {
        window.Inspector.inspectorPosition = (window.Inspector.inspectorPosition + 1) % INSPECTOR_POSITIONS.length;
        var inspectorElement = document.getElementById(INSPECTOR_ELEMENT_ID);
        inspectorElement.setAttribute('style', getInspectorStyles());
    }
};

var toggleDisplay = function(event) {
    if (event && event.key === I_KEY) {
        var inspectorElement = document.querySelector('#'+INSPECTOR_ELEMENT_ID);
        if (window.Inspector.isDisplayed) {
            inspectorElement.style.display = 'none';
        }
        else {
            inspectorElement.style.display = 'block';
        }
        window.Inspector.isDisplayed = !window.Inspector.isDisplayed;
    }
};

var getAttributesListMarkup = function (DOMNode) {

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

var updateInspectorContentsFromFocusin = function (event) {
    if (event && event.target) {
        var element = event.target;
        var tagNameField = document.querySelector('#'+INSPECTOR_TAGNAME_FIELD_ID);
        if (tagNameField) {
            tagNameField.innerHTML = element.tagName;
            var attributeListElement = getAttributesListMarkup(element);
            var tagAttributeListElement = document.querySelector('#'+INSPECTOR_TAG_ATTRIBUTE_LIST_ID);
            tagAttributeListElement.innerHTML = attributeListElement.innerHTML;
        }
    }
};

var initializeKeyBindings = function () {
    document.addEventListener('keyup', toggleInspectorPosition);
    document.addEventListener('keyup', toggleDisplay);
    document.addEventListener('focusin', updateInspectorContentsFromFocusin);
}

// Yassss, window globals </3
window.Inspector = {
    isDisplayed: false,
    createAndAppendInspector: createAndAppendInspector,
    toggleInspectorPosition: toggleInspectorPosition,
    toggleDisplay: toggleDisplay,
    inspectorPosition: INSPECTOR_POSITION_BOTTOM,
    updateInspectorContentsFromFocusin: updateInspectorContentsFromFocusin,
    initializeKeyBindings: initializeKeyBindings
};