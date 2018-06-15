export class AudioType {

    /**
     * @param {number} count 
     * @param {Array<any>} audioFiles 
     * @param {Array<string>} audioKeys
     */
    constructor(count, audioFiles, audioKeys, isBgm = false) {
        this.count = count;
        this.audioFiles = audioFiles;
        this.audioKeys = audioKeys;
        this.isBgm = isBgm;
    }

    getFiles = () => {
        return this.audioFiles;
    };

    getKeys = () => {
        return this.audioKeys;
    };

    getCount = () => {
        return this.count;
    };

    getIsBgm = () => {
        return this.isBgm;
    };

    /**
     * @param {number} inx
     */
    getKeyAt = (inx) => {
        return this.audioKeys[inx];
    };

    getRandomKey = () => {
        return this.audioKeys[Math.floor(Math.random() * this.count)];
    };
}

const audioTypes = {
    BGM: new AudioType(2,
        [
            require('../../assets/audios/bgm_home.mp3'),
            require('../../assets/audios/bgm_shop.mp3')
        ],
        [
            "bgm_home",
            "bgm_shop"
        ],
        true
    ),

    Buy: new AudioType(1, [
        require("../../assets/audios/buy_0.mp3")
    ], [
        "buy0",
    ]),

    Dialogue: new AudioType(5, [
        require("../../assets/audios/dialogue_0.mp3"),
        require("../../assets/audios/dialogue_1.mp3"),
        require("../../assets/audios/dialogue_2.mp3"),
        require("../../assets/audios/dialogue_3.mp3"),
        require("../../assets/audios/dialogue_4.mp3"),
    ], [
        "dialogue0",
        "dialogue1",
        "dialogue2",
        "dialogue3",
        "dialogue4",
    ]),

    Fail: new AudioType(2, [
        require("../../assets/audios/fail_0.mp3"),
        require("../../assets/audios/fail_1.mp3"),
    ], [
        "fail0",
        "fail1",
    ]),

    Greet: new AudioType(2, [
        require("../../assets/audios/greet_0.mp3"),
        require("../../assets/audios/greet_1.mp3"),
    ], [
        "greet0",
        "greet1",
    ]),

    Success: new AudioType(2, [
        require("../../assets/audios/success_0.mp3"),
        require("../../assets/audios/success_1.mp3"),
    ], [
        "success0",
        "success1",
    ]),

    Take: new AudioType(3, [
        require("../../assets/audios/take_0.mp3"),
        require("../../assets/audios/take_1.mp3"),
        require("../../assets/audios/take_2.mp3"),
    ], [
        "take0",
        "take1",
        "take2",
    ]),
};

/**
 * Returns all AudioType objects in an array.
 * @returns {Array<AudioType>}
 */
export function getAllAudioTypes() {
    if(!global.as_allAudioTypes) {
        global.as_allAudioTypes = [];

        for(var typeKey in audioTypes) {
            var audioType = audioTypes[typeKey];
            global.as_allAudioTypes.push(audioType);
        }
    }
    return global.as_allAudioTypes;
}

export default audioTypes;