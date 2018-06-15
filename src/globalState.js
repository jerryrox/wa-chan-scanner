export function set_ToggleLoader(func) {
    global.gs_toggleLoader = func;
}

export function set_SetViewIndex(func) {
    global.gs_setViewIndex = func;
}

export function set_RefreshTopMenu(func) {
    global.gs_refreshTopMenu = func;
}

export function toggleLoader(isEnabled) {
    global.gs_toggleLoader(isEnabled);
}

/**
 * Refer to viewIndexes.js for guide.
 */
export function setViewIndex(index) {
    global.gs_setViewIndex(index);
}

export function refreshTopMenu() {
    global.gs_refreshTopMenu();
}

export function getScanResult() {
    return global.gs_scanResult || {};
}

export function setScanResult(type, data) {
    global.gs_scanResult = {
        type,
        data
    };
}