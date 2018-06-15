import * as prefsFile from './prefsFile';

const defaultPrefs = {
    totalScans: 0,
    points: 0,
    curCharIndex: 0,
    curBgIndex: 0,
    charBoughtItems: [0],
    bgBoughtItems: [0],
};

function setPrefsObject(prefsObj) {
    global.prefsObj = prefsObj;
}

function getPrefsObject() {
    return global.prefsObj;
}

export function resetPrefs() {
    setPrefsObject(defaultPrefs);
    savePrefs();
}

export function savePrefs() {
    prefsFile.savePrefs(getPrefsObject());
}

export function loadPrefs(callback) {
    prefsFile.loadPrefs(prefs => {
        setPrefsObject(prefs || defaultPrefs);
        callback();
    });
}

// =======================================================================
// Get methods
// =======================================================================

export function getTotalScans() {
    return getPrefsObject().totalScans;
}

export function getPoints() {
    return getPrefsObject().points;
}

export function getCurCharIndex() {
    return getPrefsObject().curCharIndex;
}

export function getCurBgIndex() {
    return getPrefsObject().curBgIndex;
}

export function getIsCharBought(index) {
    return getPrefsObject().charBoughtItems.indexOf(index) >= 0;
}

export function getIsBgBought(index) {
    return getPrefsObject().bgBoughtItems.indexOf(index) >= 0;
}

// =======================================================================
// Set methods
// =======================================================================

export function setTotalScans(val) {
    getPrefsObject().totalScans = val;
    savePrefs();
}

export function setPoints(val) {
    getPrefsObject().points = val;
    savePrefs();
}

export function setCurCharIndex(val) {
    getPrefsObject().curCharIndex = val;
    savePrefs();
}

export function setCurBgIndex(val) {
    getPrefsObject().curBgIndex = val;
    savePrefs();
}

export function setCharBoughtItem(val) {
    getPrefsObject().charBoughtItems.push(val);
    savePrefs();
}

export function setBgBoughtItem(val) {
    getPrefsObject().bgBoughtItems.push(val);
    savePrefs();
}