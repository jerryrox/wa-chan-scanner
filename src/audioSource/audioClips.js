import {Audio} from 'expo';
import audioTypes, {AudioType} from './audioTypes';

/**
 * Loads all audio.
 */
async function loadAllAudio() {
    const promises = [];
    global.as_audioClips = {};

    for(var typeKey in audioTypes) {

        var audioType = audioTypes[typeKey];
        var audioCount = audioType.getCount();
        var audioFiles = audioType.getFiles();
        var audioKeys = audioType.getKeys();

        for(let i=0; i<audioCount; i++) {
            promises.push(loadClip(audioType, audioFiles[i], audioKeys[i]));
        }
    }

    await Promise.all(promises);
}

/**
 * Returns a promise that loads the audio with specified type.
 * @param {string} audioType 
 */
function loadClip(audioType, audioFile, audioKey) {
    const sound = new Audio.Sound();
    global.as_audioClips = {
        ...global.as_audioClips,
        [audioKey]: {
            sound,
            audioType
        }
    };
    return sound.loadAsync(audioFile, {
        isLooping: audioType.getIsBgm(),
        volume: 0.5
    });
}

/**
 * Returns the expo audio sound object associated with specified key.
 * @param {string} audioKey 
 * @returns {Audio.Sound}
 */
function getAudioSound(audioKey) {
    return global.as_audioClips[audioKey].sound;
}

/**
 * Returns the AudioType object associated with specified key.
 * @param {string} audioKey 
 * @returns {AudioType}
 */
function getAudioType(audioKey) {
    return global.as_audioClips[audioKey].audioType;
}

/**
 * Plays the audio with specified type.
 * @param {string} audioKey 
 */
function playAudio(audioKey) {
    var sound = getAudioSound(audioKey);
    var type = getAudioType(audioKey);

    if(type.getIsBgm())
        stopAllAudio(true);
    else
        stopAllAudio(false);

    sound.playFromPositionAsync(0)
        .then()
        .catch(e => {
            console.log(`audioClips.playAudio - Error occured: ${JSON.stringify(e)}`);
        });
}

/**
 * Stops all audio with specified flags.
 */
function stopAllAudio(stopBgm) {
    for(var typeKey in audioTypes) {
        var audioType = audioTypes[typeKey];

        // If stop target
        if(audioType.getIsBgm() === stopBgm) {
            var audioKeys = audioType.getKeys();

            audioKeys.forEach(key => {
                getAudioSound(key).stopAsync()
                    .then()
                    .catch(e => {
                        console.log(`audioClips.stopAllAudio - Error: ${JSON.stringify(e)}`);
                    });
            });
        }
    }
}

export {
    loadAllAudio,
    getAudioSound,
    getAudioType,
    playAudio
};