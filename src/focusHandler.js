// FocusHandler
// Constants
const COLORS = ['lime','rebeccapurple','orange','blue']
const COLOR_TOKEN = 'COLOR'
const STYLE_TAG_CONTENTS_TEMPLATE = `*:focus {border: 5px solid ${COLOR_TOKEN} !important;} input[type="radio"]:focus, input[type="checkbox"]:focus { outline: 5px solid ${COLOR_TOKEN} !important; }`
const STYLE_TAG_ID = 'bfh'
const ZERO_KEYCODE = 48

// State
let currentColorIndex = 0

// Methods
const getNextColor = () => {
    currentColorIndex = (currentColorIndex+1) % COLORS.length
    return COLORS[currentColorIndex]
};

const generateStyleTagContents = color => {
    const contents = STYLE_TAG_CONTENTS_TEMPLATE.replace(COLOR_TOKEN, color).replace(COLOR_TOKEN, color)
    return decodeURIComponent(contents)
};

const createAndAppendStyleTag = () => {
    let styleTag = document.createElement('style')
    styleTag.setAttribute('id', STYLE_TAG_ID)
    const nextColor = getNextColor()
    styleTag.innerHTML = generateStyleTagContents(nextColor)
    document.querySelector('head').appendChild(styleTag)
}

const toggleColor = event => {
    if (event && event.keyCode === ZERO_KEYCODE) {
        let currentStyleTag = document.querySelector(`#${STYLE_TAG_ID}`)
        const nextColor = getNextColor()
        currentStyleTag.innerHTML = generateStyleTagContents(nextColor)
    }
}

const initializeKeyBindings = () => {
    document.addEventListener('keyup', toggleColor)
}

window.FocusHandler = {
    getNextColor: getNextColor,
    generateStyleTagContents: generateStyleTagContents,
    createAndAppendStyleTag: createAndAppendStyleTag,
    toggleColor: toggleColor,
    initializeKeyBindings: initializeKeyBindings
};