//=============================================================================
// RPG Maker MZ - Ignis Touch Pictures
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 觸控圖片 Ignis Touch Pictures
 * @author Reisen (Mauricio Pastana)
  * @help Ignis Character After Image - this plugins is under zlib license
 * For support and new plugins join our discord server! https://discord.gg/Kh9XXZ2
 * Want to support new creations? be a patreon! https://www.patreon.com/raizen884?fan_landing=true
 * You just need to add a listener by a Plugin Command, on it you can configure
 * the parameters, once that is done, that picture will have a listener, which means, whenever
 * you hover/interact with it, it will do what you wanted the listener to do.
 * You can use the other plugin command to remove listeners from pictures.
 * THe blend type is a number, you can follow as below to know what number does what:
* 正常 NORMAL: 0
* 添加 ADD: 1
* 乘 MULTIPLY: 2
* 螢幕 SCREEN: 3
* 疊加 OVERLAY: 4
* 變暗 DARKEN: 5
* 發光 LIGHTEN: 6
* 顏色減淡 COLOR_DODGE: 7
* 顏色加深 COLOR_BURN: 8
* 強光 HARD_LIGHT: 9
* 柔光 SOFT_LIGHT: 10
* 差異化 DIFFERENCE: 11
* 排除 EXCLUSION: 12
* 色調 HUE: 13
* 飽和 SATURATION: 14
* 顏色 COLOR: 15
* 亮度 LUMINOSITY: 16
* 正常NPM NORMAL_NPM: 17
* 添加NPM ADD_NPM: 18
* 銀幕NPM SCREEN_NPM: 19
* 無 NONE: 20
* SRC結束 SRC_OVER: 0
* SRC進 SRC_IN: 21
* SRC出 SRC_OUT: 22
* SRC在頂上 SRC_ATOP: 23
* DST結束 DST_OVER: 24
* DST進 DST_IN: 25
* DST出 DST_OUT: 26
* DST在頂上 DST_ATOP: 27
* 擦除 ERASE: 26
* 減去 SUBTRACT: 28
* 互斥 XOR: 29
 * @command Add Picture Listener
 * @text 添加圖片聽眾
 * @desc 添加圖片聽眾
 * Adds a Picture Listener
 * 
 * @arg listener
 * @text listener
 * @type struct<PictureListener>
 * @command Remove Picture Listener
 * @text 刪除圖片聽眾
 * @desc 刪除圖片聽眾
 * Removes a PictureListener
 * @arg deletePictureId
 * @type number
 */

/*~struct~PictureListener:
* @param picture Id
* @text 圖片ID
* @type number
* @default 1
* @desc 在此圖片上添加一個聽眾
* Adds a listener to this picture
* @param switch
* @text 開關
* @type number
* @default 1
* @desc 懸停此圖片時將打開的開關，0禁用此開關。
* Switch that will be turned on when this picture is hovered, 0 to disable this.
* @param colorTone
* @text 色調
* @type struct<ColorTone>
* @desc 懸停時的色調偏移。
* The color tone shift when hovered.
* @param opacity
* @text 不透明度
* @type number
* @default 255
* @desc 懸停時不透明度發生變化。
* The opacity shift when hovered.
* @param blendType
* @text 混合類型
* @type number
* @default 1
* @desc 圖片懸停時的混合類型。
* The type of blend when the picture is hovered.
* @param typeOfEvent
* @text 事件類型
* @type select
* @option common
* @option self
* @desc 如果事件打開，將是常見事件或自我切換
* If the event turned on will be common event or self switch
* @param id
* @text ID
* @type number
* @default 1
* @desc 觸發圖片時要調用的公共事件的ID，或者如果它是自切換"A"，則默認為事件的ID
* Id of the Common event to be called when the picture is triggered, or the id of the event if it is a self switch "A" is default
* @param triggerType
* @text 觸發類型
* @type select
* @option press
* @option repeat
* @option trigger
* @desc 你要放置圖片的觸發器的類型(press:按著 repeat:長按 trigger:按下)
* The type of trigger you want to put the picture on
* @param onlyPixels
* @text 僅像素
* @type boolean
* @desc 如果啟用，則懸停和触發/按動僅適用於實際像素，而不適用於圖片的透明部分。
* If on, hover and trigger/press will work only on actual pixels and not transparent part of the picture.
*/

/*~struct~ColorTone:
* @param red
* @type number
* @default 255
* @desc red color shift 0-255
* @param green
* @type number
* @default 255
* @desc green color shift 0-255
* @param blue
* @type number
* @default 255
* @desc blue color shift 0-255
* @param alpha
* @type number
* @default 255
* @desc alpha color shift 0-255
*/
// NÃO MEXE AQUI POR FAVOR :(!
// No touching this part!
var Ignis = Ignis || {};
Ignis.TouchPictures = Ignis.TouchPictures || {};
Ignis.TouchPictures.VERSION = [1, 0, 1];


const pluginName = "IgnisTouchPictures";
Ignis.TouchPictures.PictureListeners = [];


PluginManager.registerCommand(pluginName, "Add Picture Listener", args => {
    const arg = JSON.parse(args['listener']);
    const id = parseInt(arg["picture Id"]);
    Ignis.TouchPictures.PictureListeners[id] = {
        switch: parseInt(arg["switch"]),
        opacity: parseInt(arg["opacity"]),
        commonEventId: parseInt(arg["id"]),
        colorTone: arg["colorTone"] == "" ? false : JSON.parse(arg["colorTone"]),
        onlyPixels: arg["onlyPixels"] == "true" ? true : false,
        blendType: parseInt(arg["blendType"]),
        triggerType: arg["triggerType"],
        typeEvent: arg["typeOfEvent"]
    }
});

PluginManager.registerCommand(pluginName, "Remove Picture Listener", args => {
    const id = parseInt(args['deletePictureId']);
    Ignis.TouchPictures.PictureListeners[id] = false;
});
(() => {
    //=============================================================================
    // RPG Maker MZ - Ignis Character After Image
    //=============================================================================
    Sprite_Picture.prototype.callIgnisListener = function (pictureId) {
        const listener = Ignis.TouchPictures.PictureListeners[pictureId];
        if (listener.onlyPixels) {
            const touchPos = new Point(TouchInput.x, TouchInput.y);
            const localPos = this.worldTransform.applyInverse(touchPos);
            if (this.bitmap.getAlphaPixel(localPos.x, localPos.y) == 0) {
                return;
            }
        }
        $gameSwitches.setValue(listener.switch, true);
        this.opacity = listener.opacity;
        if (listener.colorTone) {
            this._colorTone = [parseInt(listener.colorTone.red),
            parseInt(listener.colorTone.green),
            parseInt(listener.colorTone.blue),
            parseInt(listener.colorTone.alpha)];
            this._updateColorFilter();
        }
        this.blendMode = listener.blendType;
        switch (listener.triggerType) {
            case "press":
                if (TouchInput.isPressed()) { this.switchType(listener) }
                break;
            case "trigger":
                if (TouchInput.isTriggered()) { this.switchType(listener) }
                break;
            case "repeat":
                if (TouchInput.isRepeated()) { this.switchType(listener) }
                break;
        }
    }
    Sprite_Picture.prototype.switchType = function (listener) {
        if (listener.typeEvent == "common")
            $gameMap._interpreter.setup($dataCommonEvents[listener.commonEventId].list)
        else {
            const key = [$gameMap.mapId(), listener.commonEventId, "A"];
            $gameSelfSwitches.setValue(key, true);
        }

    };

    const _Sprite_Picture_update = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function () {
        _Sprite_Picture_update.call(this, ...arguments);
        if (this._hovered) {
            if (Ignis.TouchPictures.PictureListeners[this._pictureId]) {
                this.callIgnisListener(this._pictureId)
            }
        }
    };
})();