import * as prefs from './prefs';

export class ShopCharItem {

    /**
     * @param {string} name 
     * @param {number} cost 
     * @param {number} charIndex
     */
    constructor(name, cost, charIndex) {
        this.name = name;
        this.cost = cost;
        this.charIndex = charIndex;
    }

    getName = () => {
        return this.name;
    };

    getCost = () => {
        return this.cost;
    };

    getCharIndex = () => {
        return this.charIndex;
    };

    getIsPurchased = () => {
        return prefs.getIsCharBought(this.getCharIndex());
    };

    getIsUsing = () => {
        return prefs.getCurCharIndex() === this.getCharIndex();
    };

    setPurchase = () => {
        prefs.setCharBoughtItem(this.getCharIndex());
    };
}

export class ShopBgItem {

    /**
     * @param {string} name 
     * @param {number} cost 
     * @param {number} bgIndex 
     */
    constructor(name, cost, bgIndex) {
        this.name = name;
        this.cost = cost;
        this.bgIndex = bgIndex;
    }

    getName = () => {
        return this.name;
    };

    getCost = () => {
        return this.cost;
    };

    getBgIndex = () => {
        return this.bgIndex;
    };

    getIsPurchased = () => {
        return prefs.getIsBgBought(this.getBgIndex());
    };

    getIsUsing = () => {
        return prefs.getCurBgIndex() === this.getBgIndex();
    };

    setPurchase = () => {
        prefs.setBgBoughtItem(this.getBgIndex());
    };
}

export const characterItems = [
    new ShopCharItem("기본 스킨", 0, 0),
    new ShopCharItem("기본 스킨 (중상)", 10000, 1),
    new ShopCharItem("고성에서의 모험", 30000, 2),
    new ShopCharItem("고성에서의 모험 (중상)", 40000, 3),
    new ShopCharItem("겨울날 그대를 기다리며", 30000, 4),
    new ShopCharItem("겨울날 그대를 기다리며 (중상)", 40000, 5),
    new ShopCharItem("무도회의 쉼표", 30000, 6),
    new ShopCharItem("무도회의 쉼표 (중상)", 40000, 7),
    new ShopCharItem("모불라 작전", 30000, 8),
    new ShopCharItem("모불라 작전 (중상)", 40000, 9),
];

export const backgroundItems = [
    new ShopBgItem("Default", 0, 0),
    new ShopBgItem("Cafè", 20000, 1),
    new ShopBgItem("Kitchen", 20000, 2),
    new ShopBgItem("Theater", 20000, 3),
    new ShopBgItem("Cathedral", 20000, 4),
];