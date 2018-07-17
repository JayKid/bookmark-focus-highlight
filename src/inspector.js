// Inspector
// Constants
const I_KEY = 'i'
const P_KEY = 'p'
const INSPECTOR_ELEMENT_ID = 'bfh-inspector'
const INSPECTOR_TAGNAME_FIELD_ID = 'bfh-inspector-tag'
const INSPECTOR_TAG_ATTRIBUTE_LIST_ID = 'bfh-inspector-tag-attr-list'
const INSPECTOR_STYLES = "background: rgba(0, 0, 0, 0.5);color: white; padding: 1rem; font-size: 1.4rem;"
const INSPECTOR_POSITION_BOTTOM = 0
const INSPECTOR_POSITION_SIDE = 1
const INSPECTOR_POSITIONS = [ 
    INSPECTOR_POSITION_BOTTOM, 
    INSPECTOR_POSITION_SIDE 
]
const INSPECTOR_STYLE_FOR_POSITION = {
    [INSPECTOR_POSITION_BOTTOM]: "width: 100%;height: auto;position: fixed;bottom: 0;",
    [INSPECTOR_POSITION_SIDE]: "width: auto;height: 100%;position: absolute;right: 0;top: 0;"
}

// Methods
const getInspectorStyles = () =>
    `${INSPECTOR_STYLES}${INSPECTOR_STYLE_FOR_POSITION[window.Inspector.inspectorPosition]}`

const createAndAppendInspector = () => {
    let inspectorElement = document.createElement('div')
    inspectorElement.setAttribute('id', INSPECTOR_ELEMENT_ID)
    inspectorElement.setAttribute('style', getInspectorStyles())
    let inspectorElementTagNameLabel = document.createElement('span')
    inspectorElementTagNameLabel.innerHTML = "Focused element type: "
    let inspectorElementTagName = document.createElement('span')
    inspectorElementTagName.setAttribute('id', INSPECTOR_TAGNAME_FIELD_ID)
    let listElement = document.createElement('ul')
    listElement.setAttribute('id', INSPECTOR_TAG_ATTRIBUTE_LIST_ID)
    inspectorElement.appendChild(inspectorElementTagNameLabel)
    inspectorElement.appendChild(inspectorElementTagName)
    inspectorElement.appendChild(listElement)
    document.querySelector('body').appendChild(inspectorElement)
    window.Inspector.isDisplayed = true
}

const toggleInspectorPosition = event => {
    if (event && event.key === P_KEY) {
        window.Inspector.inspectorPosition = (window.Inspector.inspectorPosition + 1) % INSPECTOR_POSITIONS.length
        let inspectorElement = document.getElementById(INSPECTOR_ELEMENT_ID)
        inspectorElement.setAttribute('style', getInspectorStyles())
    }
};

const toggleDisplay = event => {
    if (event && event.key === I_KEY) {
        let inspectorElement = document.querySelector(`#${INSPECTOR_ELEMENT_ID}`)
        if (window.Inspector.isDisplayed) {
            inspectorElement.style.display = 'none'
        }
        else {
            inspectorElement.style.display = 'block'
        }
        window.Inspector.isDisplayed = !window.Inspector.isDisplayed
    }
};

const getAttributesListMarkup = (DOMNode) => {

    const createAttributeListItem = (attributeName, attributeValue) => {
        let listItemElement = document.createElement('li')
        let attributeNameElement = document.createElement('span')
        attributeNameElement.innerText = `${attributeName} : `
        let attributeValueElement = document.createElement('span')
        
        if (attributeName.indexOf('describedby') > 0 || attributeName.indexOf('labelledby') > 0) {
            // Get the contents of the elements its referencing
            let referencedElement = document.getElementById(attributeValue)
            attributeValueElement.innerText = `#${attributeValue}'s contents which are: "${referencedElement.innerText}"`
        }
        else {
            attributeValueElement.innerText = attributeValue
        }
        
        listItemElement.appendChild(attributeNameElement)
        listItemElement.appendChild(attributeValueElement)
        return listItemElement
    }

    let listElement = document.createElement('ul')
    let attributesToDisplay = DOMNode.getAttributeNames().filter(function(attributeName) {
        return attributeName.indexOf('aria') >= 0
    });
    
    for (let index in attributesToDisplay) {
        let attributeName = attributesToDisplay[index]
        listElement.appendChild(createAttributeListItem(attributeName, DOMNode.getAttribute(attributeName)))
    }
    return listElement
};

const updateInspectorContentsFromFocusin = event => {
    if (event && event.target) {
        let element = event.target
        let tagNameField = document.querySelector(`#${INSPECTOR_TAGNAME_FIELD_ID}`)
        if (tagNameField) {
            tagNameField.innerHTML = element.tagName
            let attributeListElement = getAttributesListMarkup(element)
            let tagAttributeListElement = document.querySelector(`#${INSPECTOR_TAG_ATTRIBUTE_LIST_ID}`)
            tagAttributeListElement.innerHTML = attributeListElement.innerHTML
        }
    }
};

// Yassss, window globals </3
window.Inspector = {
    isDisplayed: false,
    createAndAppendInspector: createAndAppendInspector,
    toggleInspectorPosition: toggleInspectorPosition,
    toggleDisplay: toggleDisplay,
    inspectorPosition: INSPECTOR_POSITION_BOTTOM,
    updateInspectorContentsFromFocusin: updateInspectorContentsFromFocusin,
    initializeKeyBindings: () => {
        document.addEventListener('keyup', toggleInspectorPosition);
        document.addEventListener('keyup', toggleDisplay);
        document.addEventListener('focusin', updateInspectorContentsFromFocusin);
    }
};