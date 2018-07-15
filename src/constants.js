var COLORS = ['lime','rebeccapurple','orange','blue'];
var ZERO_KEYCODE = 48;
var I_KEY = 'i';
var P_KEY = 'p';
var STYLE_TAG_ID = 'bfh';
var INSPECTOR_ELEMENT_ID = 'bfh-inspector';
var INSPECTOR_TAGNAME_FIELD_ID = 'bfh-inspector-tag';
var INSPECTOR_TAG_ATTRIBUTE_LIST_ID = 'bfh-inspector-tag-attr-list';
var COLOR_TOKEN = 'COLOR';
var STYLE_TAG_CONTENTS_TEMPLATE = "*:focus {border: 5px solid " + COLOR_TOKEN + " !important;} input[type=\"radio\"]:focus, input[type=\"checkbox\"]:focus { outline: 5px solid " + COLOR_TOKEN + " !important; }";

var INSPECTOR_STYLES = "background: rgba(0, 0, 0, 0.5);color: white; padding: 1rem; font-size: 1.4rem;";
var INSPECTOR_POSITION_BOTTOM = 0;
var INSPECTOR_POSITION_SIDE = 1;
var INSPECTOR_POSITIONS = [ INSPECTOR_POSITION_BOTTOM, INSPECTOR_POSITION_SIDE ];
var INSPECTOR_STYLE_FOR_POSITION = [];
INSPECTOR_STYLE_FOR_POSITION[INSPECTOR_POSITION_BOTTOM] = "width: 100%;height: auto;position: fixed;bottom: 0;";
INSPECTOR_STYLE_FOR_POSITION[INSPECTOR_POSITION_SIDE] = "width: auto;height: 100%;position: absolute;right: 0;top: 0;";