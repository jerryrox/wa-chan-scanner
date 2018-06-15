import * as prefsFile from './prefsFile';

const defaultPrefs = {
    totalScans: 0,
    points: 0,
    curCharIndex: 0,
    curBgIndex: 0,
    charBoughtIndex: 0,
    bgBoughtIndex: 0,
};

function setPrefsObject(prefsObj) {
    global.prefsObj = prefsObj;
}

function getPrefsObject() {
    return global.prefsObj;
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

export function getCharBoughtIndex() {
    return getPrefsObject().charBoughtIndex;
}

export function getBgBoughtIndex() {
    return getPrefsObject().bgBoughtIndex;
}

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

export function setCharBoughtIndex(val) {
    getPrefsObject().charBoughtIndex = val;
    savePrefs();
}

export function setBgBoughtIndex(val) {
    getPrefsObject().bgBoughtIndex = val;
    savePrefs();
}