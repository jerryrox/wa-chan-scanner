import {FileSystem} from 'expo';

export function getPrefPath() {
    return FileSystem.documentDirectory + "prefs.json";
}

export function savePrefs(prefObj) {
    FileSystem.writeAsStringAsync(
        getPrefPath(),
        JSON.stringify(prefObj)
    ).then().catch(e => {
        console.log(`prefsFile.savePrefs - Error while saving: ${JSON.stringify(e)}`);
    });
}

export function loadPrefs(callback) {
    FileSystem.readAsStringAsync(
        getPrefPath()
    ).then(val => {
        callback(JSON.parse(val) || null);
    }).catch(e => {
        console.log(`prefsFile.loadPrefs - Error while loading: ${JSON.stringify(e)}`);
        callback(null);
    });
}