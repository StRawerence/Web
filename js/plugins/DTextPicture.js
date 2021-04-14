//=============================================================================
// DTextPicture.js
// ----------------------------------------------------------------------------
// (C) 2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.2.1 2021/02/08 色調変更したピクチャを消去し、同一の番号で動的文字列ピクチャを作成したとき文字列ピクチャが表示されない場合がある問題を修正
// 2.2.0 2021/01/22 複数行の動的文字列を中央揃え、右揃えにできる機能を追加
// 2.1.0 2021/01/10 動的文字列のフォントサイズを指定できる機能を追加
// 2.0.4 2021/01/06 制御文字\v[n,m]でもリアルタイム描画されるよう修正
// 2.0.3 2020/09/01 制御文字\oc[c], \ow[n]の移植が漏れていた問題を修正
// 2.0.2 2020/08/26 ベースプラグインの説明を追加
// 2.0.1 2020/08/26 描画文字列に数値のみを指定するとエラーになる問題を修正
// 2.0.0 2020/08/15 MZ対応用に全面リファクタリング
// 1.0.0 2015/11/06 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 文字圖片化 (Icon繪製有問題) 動的文字列ピクチャ生成プラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/DTextPicture.js
 * @author トリアコンタン
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 *
 * @param frameWindowSkin
 * @text 視窗文件名稱
 * @desc 框架窗口的外觀文件名。 如果使用的是Window Builder，則需要指定它。フレームウィンドウのスキンファイル名です。ウィンドウビルダーを使っている場合は、指定する必要があります。
 * @default
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param frameWindowPadding
 * @text 窗口邊距
 * @desc 框架窗口的邊距。
 * フレームウィンドウの余白です。
 * @default 18
 * @type number
 *
 * @param padCharacter
 * @text 填充字符
 * @desc 繪製數值時，如果位數小於指定的數字，則要填充的字符。請僅指定一個單字節字符。
 * 数値描画時、指定桁数に満たないときに埋められる文字です。半角で1文字だけ指定してください。
 * @default 0
 *
 * @param prefixText
 * @text 前綴字符串
 * @desc 在每個字符串圖片之前插入的文本。主要指定默認的控製字符。
 * すべての文字列ピクチャの前に挿入されるテキストです。主にデフォルトの制御文字などを指定します。
 * @default
 *
 * @command dText
 * @text 字符串圖片準備
 * @desc 字符串準備要在圖片中顯示的字符串。
 * 文字列ピクチャで表示する文字列を準備します。
 *
 * @arg text
 * @text 表示文字列
 * @desc 要顯示為字符串圖片的文本。
 * 文字列ピクチャとして表示するテキストです。
 * @default
 * @type multiline_string
 *
 * @arg fontSize
 * @text 字體大小
 * @desc 動態字符串的初始字體大小。如果指定0，它將是系統設置的默認大小。
 * 動的文字列の初期フォントサイズです。0を指定するとシステムで設定したデフォルトサイズになります。
 * @default 0
 * @type number
 *
 * @command dTextSetting
 * @text 字符串圖片設置
 * @desc 與字符串圖片的顯示方法有關的設置。更改後的設置在繪製後保留。
 * 文字列ピクチャの表示方法に関する設定です。変更した設定は描画後も保持されます。
 *
 * @arg backGroundColor
 * @text 背景色
 * @desc 字符串圖片的背景色。
 * 文字列ピクチャの背景色です。
 * @default
 *
 * @arg gradationLeft
 * @text 向左漸變
 * @desc 字符串圖片背景的左漸變中的像素數。
 * 文字列ピクチャの背景の左方向グラデーションのピクセル数です。
 * @type number
 * @default
 *
 * @arg gradationRight
 * @text 向右漸變
 * @desc 字符串圖片背景的右漸變中的像素數。
 * 文字列ピクチャの背景の右方向グラデーションのピクセル数です。
 * @type number
 * @default
 *
 * @arg realTime
 * @text 即時描繪
 * @desc 如果您使用控製字符\v[n]，則當變量的內容更改時，重新繪製圖片。
 * 制御文字\v[n]を使っている場合、変数の内容が変化したらピクチャを再描画します。
 * @type boolean
 * @default
 *
 * @arg window
 * @text 視窗
 * @desc 在字符串圖片的背景中顯示一個窗口。
 * 文字列ピクチャの背景にウィンドウを表示します。
 * @type boolean
 * @default
 *
 * @arg align
 * @text 對齊
 * @desc 指定多行動態字符串時的對齊方式。
 * 複数行の動的文字列を指定したときの揃えです。
 * @default
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 *
 * @command windowCursor
 * @text 視窗光標
 * @desc 在顯示的字符串圖片的背景窗口中顯示光標。表示中の文字列ピクチャの背景ウィンドウにカーソルを表示します。
 *
 * @arg pictureId
 * @text 圖片ID
 * @desc 目標圖片編號。它必須是已經顯示的圖片。
 * 対象のピクチャ番号です。すでに表示中のピクチャである必要があります。
 * @type number
 * @default 1
 *
 * @arg x
 * @text X座標
 * @desc 光標的X坐標。
 * カーソルのX座標です。
 * @type number
 * @default 0
 *
 * @arg y
 * @text Y座標
 * @desc 光標的Y坐標。
 * カーソルのY座標です。
 * @type number
 * @default 0
 *
 * @arg width
 * @text 寬度
 * @desc 光標的寬度。
 * @type number
 * @default 100
 *
 * @arg height
 * @text 高度
 * @desc 光標的高度。
 * @type number
 * @default 100
 *
 * @arg activateSwitch
 * @text 啟用開關
 * @desc 如果指定，則僅在開關打開時才激活。
 * 如果未指定，則始終處於活動狀態。
 * @type switch
 * @default 0
 *
 * @help 
 * ----------------------------------------------------------------------
 * \V[n,m](變量的值，用參數為m位指定的字符填充)
 *        
 * \item[n]   編號n的項目信息（圖標+名稱）
 * \weapon[n] n號武器信息（圖標+名稱）
 * \armor[n]  n裝甲器信息（圖標+名稱）
 * \skill[n]  n號技能信息（圖標+名稱）
 * \state[n]  n號狀態信息（圖標+名稱）
 * \oc[c] 將輪廓顏色設置為"c"（*1）
 * \ow[n] 將輪廓寬度設置為"n" (例:\ow[5])
 * \f[b] 粗體
 * \f[i] 斜體
 * \f[n] 將字體粗體和斜體恢復為正常
 * ----------------------------------------------------------------------
 * 
 * 指定した文字列でピクチャを動的に生成するコマンドを提供します。
 * 文字列には各種制御文字（\v[n]等）も使用可能で、制御文字で表示した変数の値が
 * 変更されたときにリアルタイムでピクチャの内容を更新できます。
 *
 * 以下の手順で表示します。
 *  1 : プラグインコマンド[文字列ピクチャ準備]で描画内容を準備
 *      使用插件命令[準備字符串圖片]準備圖紙內容
 *  2 : イベントコマンド「ピクチャの表示」で「画像」を未選択に指定。
 *      在事件命令“顯示圖片”中將“圖像”指定為未選擇。
 * ※ 1の時点ではピクチャは表示されないので必ずセットで呼び出してください。
 *    在1時，該圖片不會顯示，因此請務必將其命名為一組。
 *
 * 専用制御文字
 * \V[n,m](m桁分のパラメータで指定した文字で埋めた変数の値)
 *        變量的值，用參數為m位指定的字符填充
 * \item[n]   n 番のアイテム情報（アイコン＋名称）
 * \weapon[n] n 番の武器情報（アイコン＋名称）
 * \armor[n]  n 番の防具情報（アイコン＋名称）
 * \skill[n]  n 番のスキル情報（アイコン＋名称）
 * \state[n]  n 番のステート情報（アイコン＋名称）
 * \oc[c] 輪廓顏色 アウトラインカラーを「c」に設定(※1)
 * \ow[n] 輪廓寬度 アウトライン幅を「n」に設定(例:\ow[5])
 * \f[b] 粗體 フォントの太字化
 * \f[i] 斜體 フォントのイタリック化
 * \f[n] 將字體粗體和斜體恢復為正常 フォントの太字とイタリックを通常に戻す
 *
 * ※1 アウトラインカラーの指定方法
 * \oc[red]  色名で指定
 * \oc[rgb(0,255,0)] カラーコードで指定
 * \oc[2] 文字色番号\c[n]と同様のもので指定
 *
 * このプラグインの利用にはベースプラグイン『PluginCommonBase.js』が必要です。
 * 『PluginCommonBase.js』は、RPGツクールMZのインストールフォルダ配下の
 * 以下のフォルダに格納されています。
 * dlc/BasicResources/plugins/official
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */
(function() {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    PluginManager.registerCommand(PluginManagerEx.findPluginName(script), 'dText', function(args) {
        $gameScreen.setDTextPicture(args.text, args.fontSize);
    });

    PluginManagerEx.registerCommand(script, 'dTextSetting', function(args) {
        $gameScreen.setDtextSetting(args);
    });

    PluginManagerEx.registerCommand(script, 'windowCursor', function(args) {
        $gameScreen.setDTextWindowCursor(args.pictureId, args, args.activateSwitch);
    });

    //=============================================================================
    // Game_Screen
    //  動的ピクチャ用のプロパティを追加定義します。
    //=============================================================================
    Game_Screen.prototype.setDtextSetting = function(setting) {
        if (setting.backGroundColor !== '') {
            this.dTextBackColor = setting.backGroundColor;
        }
        if (setting.gradationLeft !== '') {
            this.dTextGradationLeft = setting.gradationLeft;
        }
        if (setting.gradationRight !== '') {
            this.dTextGradationRight = setting.gradationRight;
        }
        if (setting.realTime !== '') {
            this.dTextRealTime = setting.realTime;
        }
        if (setting.window !== '') {
            this.dWindowFrame = setting.window;
        }
        if (setting.align !== '') {
            this.dTextAlign = setting.align;
        }
    };

    Game_Screen.prototype.clearDTextPicture = function() {
        this.dTextValue = null;
    };

    Game_Screen.prototype.setDTextPicture = function(value, size) {
        if (typeof TranslationManager !== 'undefined') {
            TranslationManager.translateIfNeed(value, function(translatedText) {
                value = translatedText;
            });
        }
        if (size > 0) {
            value = `\\fs[${size}]${value}`;
        }
        this.dTextValue = value;
    };

    Game_Screen.prototype.setDTextWindowCursor = function(pictureId, rect, switchId) {
        const picture = this.picture(pictureId);
        if (picture) {
            picture.setWindowCursor(rect, switchId);
        }
    };

    Game_Screen.prototype.getDTextPictureInfo = function() {
        const prefix = param.prefixText || '';
        return {
            value         : prefix + this.dTextValue,
            color         : this.dTextBackColor,
            realTime      : this.dTextRealTime,
            windowFrame   : this.dWindowFrame,
            gradationLeft : this.dTextGradationLeft,
            gradationRight: this.dTextGradationRight,
            align         : this.dTextAlign
        };
    };

    Game_Screen.prototype.isSettingDText = function() {
        return !!this.dTextValue;
    };

    //=============================================================================
    // Game_Picture
    //  動的ピクチャ用のプロパティを追加定義し、表示処理を動的ピクチャ対応に変更します。
    //=============================================================================
    const _Game_Picture_initBasic      = Game_Picture.prototype.initBasic;
    Game_Picture.prototype.initBasic = function() {
        _Game_Picture_initBasic.call(this);
        this.dTextValue = null;
        this.dTextInfo  = null;
    };

    const _Game_Picture_show      = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function(name, origin, x, y, scaleX,
                                           scaleY, opacity, blendMode) {
        if ($gameScreen.isSettingDText() && !name) {
            arguments[0]   = Date.now().toString();
            this.dTextInfo = $gameScreen.getDTextPictureInfo();
            this.updateDText();
            $gameScreen.clearDTextPicture();
        } else {
            this.dTextInfo = null;
            this._dTextValue = null;
        }
        _Game_Picture_show.apply(this, arguments);
    };

    const _Game_Picture_update      = Game_Picture.prototype.update;
    Game_Picture.prototype.update = function() {
        _Game_Picture_update.apply(this, arguments);
        if (this.dTextInfo && this.dTextInfo.realTime) {
            this.updateDText();
        }
    };

    Game_Picture.prototype.updateDText = function() {
        const text = PluginManagerEx.convertEscapeCharacters(this.dTextInfo.value);
        if (text !== this._dTextValue) {
            this._name = Date.now().toString();
        }
        this._dTextValue = text;
    };

    Game_Picture.prototype.getDText = function() {
        return this._dTextValue;
    };

    Game_Picture.prototype.setWindowCursor = function(rect, switchId) {
        this._windowCursor = rect;
        this._windowCursorActive = switchId;
    };

    Game_Picture.prototype.getWindowCursor = function() {
        return this._windowCursor;
    };

    Game_Picture.prototype.getWindowCursorActive = function() {
        const switchId = this._windowCursorActive;
        return !switchId || $gameSwitches.value(switchId);
    };

    //=============================================================================
    // Window_Base
    //  文字列変換処理に追加制御文字を設定します。
    //=============================================================================
    
    const _PluginManagerEx_convertEscapeCharactersEx      = PluginManagerEx.convertEscapeCharactersEx;
    PluginManagerEx.convertEscapeCharactersEx = function(text, data = null) {
        text = _PluginManagerEx_convertEscapeCharactersEx.call(this, text, data);
        text = text.replace(/\x1bV\[(\d+),\s*(\d+)]/gi, function() {
            return this.getVariablePadCharacter($gameVariables.value(parseInt(arguments[1], 10)), arguments[2]);
        }.bind(this));
        
        text = text.replace(/\x1bITEM\[(\d+)]/gi, function() {
            const item = $dataItems[parseInt(arguments[1])];
            return this.getItemInfoText(item);
        }.bind(this));
        text = text.replace(/\x1bWEAPON\[(\d+)]/gi, function() {
            const item = $dataWeapons[parseInt(arguments[1])];
            return this.getItemInfoText(item);
        }.bind(this));
        text = text.replace(/\x1bARMOR\[(\d+)]/gi, function() {
            const item = $dataArmors[parseInt(arguments[1])];
            return this.getItemInfoText(item);
        }.bind(this));
        text = text.replace(/\x1bSKILL\[(\d+)]/gi, function() {
            const item = $dataSkills[parseInt(arguments[1])];
            return this.getItemInfoText(item);
        }.bind(this));
        text = text.replace(/\x1bSTATE\[(\d+)]/gi, function() {
            const item = $dataStates[parseInt(arguments[1])];
            return this.getItemInfoText(item);
        }.bind(this));
        
        return text;
    };

    PluginManagerEx.getItemInfoText = function(item) {
        return item ?`\x1bi[${item.iconIndex}]${item.name}` : '';
    };

    PluginManagerEx.getVariablePadCharacter = function(value, digit) {
        let numText = String(Math.abs(value));
        const pad = String(param.padCharacter) || '0';
        while (numText.length < digit) {
            numText = pad + numText;
        }
        return (value < 0 ? '-' : '') + numText;
    };

    const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        _Window_Base_processEscapeCharacter.apply(this, arguments);
        switch (code) {
            case 'OC':
                const colorCode  = this.obtainEscapeParamString(textState);
                const colorIndex = Number(colorCode);
                this.changeOutlineColor(!isNaN(colorIndex) ? ColorManager.textColor(colorIndex) : colorCode);
                break;
            case 'OW':
                this.contents.outlineWidth = this.obtainEscapeParam(textState);
                break;
        }
    };

    Window_Base.prototype.obtainEscapeParamString = function(textState) {
        const arr = /^\[.+?]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return arr[0].substring(1, arr[0].length - 1);
        } else {
            return '';
        }
    };
    

    const _Window_Base_flushTextState = Window_Base.prototype.flushTextState;
    Window_Base.prototype.flushTextState = function(textState) {
        if (this.textPictureWidth && this.textPictureAlign) {
            this.setDTextAlign(textState);
        }
        _Window_Base_flushTextState.apply(this, arguments);
    };

    Window_Base.prototype.setDTextAlign = function(textState) {
        const dx = this.textPictureWidth - this.textWidth(textState.buffer);
        if (this.textPictureAlign === 'center') {
            textState.x = Math.floor(dx / 2);
        } else if (this.textPictureAlign === 'right') {
            textState.x = dx;
        }
    };

    //=============================================================================
    // Sprite_Picture
    //  画像の動的生成を追加定義します。
    //=============================================================================
    const _Sprite_Picture_update      = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function() {
        _Sprite_Picture_update.apply(this, arguments);
        if (this._frameWindow) {
            this.updateFrameWindow();
        }
    };

    Sprite_Picture.prototype.updateFrameWindow = function() {
        const padding             = param.frameWindowPadding;
        this._frameWindow.x       = this.x - (this.anchor.x * this.width * this.scale.x) - padding;
        this._frameWindow.y       = this.y - (this.anchor.y * this.height * this.scale.y) - padding;
        this._frameWindow.opacity = this.opacity;
        if (!this.visible || !this.dTextInfo) {
            this.removeFrameWindow();
            return;
        }
        if (!this._addFrameWindow) {
            this.addFrameWindow();
        }
        if (Graphics.frameCount % 2 === 0) {
            this.adjustScaleFrameWindow();
        }
        this.updateFrameWindowCursor();
    };

    Sprite_Picture.prototype.updateFrameWindowCursor = function() {
        const picture = this.picture();
        if (!picture) {
            return;
        }
        const rect = picture.getWindowCursor();
        if (rect) {
            const width  = rect.width || this._frameWindow.contentsWidth();
            const height = rect.width || this._frameWindow.contentsHeight();
            this._frameWindow.setCursorRect(0, 0, width, height);
            this._frameWindow.active = picture.getWindowCursorActive();
        } else {
            this._frameWindow.setCursorRect(0, 0, 0, 0);
        }
    };

    Sprite_Picture.prototype.adjustScaleFrameWindow = function() {
        const padding        = param.frameWindowPadding;
        const newFrameWidth  = Math.floor(this.width * this.scale.x + padding * 2);
        const newFrameHeight = Math.floor(this.height * this.scale.x + padding * 2);
        if (this._frameWindow.width !== newFrameWidth || this._frameWindow.height !== newFrameHeight) {
            this._frameWindow.move(this._frameWindow.x, this._frameWindow.y, newFrameWidth, newFrameHeight);
        }
    };

    Sprite_Picture.prototype.addFrameWindow = function() {
        const parent = this.parent;
        if (parent) {
            const index = parent.getChildIndex(this);
            parent.addChildAt(this._frameWindow, index);
            this._addFrameWindow = true;
        }
    };

    Sprite_Picture.prototype.removeFrameWindow = function() {
        const parent = this.parent;
        if (parent) {
            parent.removeChild(this._frameWindow);
            this._frameWindow    = null;
            this._addFrameWindow = false;
        }
    };

    Sprite_Picture.prototype.makeFrameWindow = function(width, height) {
        const padding = param.frameWindowPadding;
        const rect = new Rectangle(0, 0, width + padding * 2, height + padding * 2);
        this._frameWindow = new Window_Base(rect);
        if (param.frameWindowSkin) {
            this._frameWindow.windowskin = ImageManager.loadSystem(param.frameWindowSkin);
        }
    };

    const _Sprite_Picture_loadBitmap      = Sprite_Picture.prototype.loadBitmap;
    Sprite_Picture.prototype.loadBitmap = function() {
        this.dTextInfo = this.picture().dTextInfo;
        if (this.dTextInfo) {
            this.makeDynamicBitmap();
        } else {
            _Sprite_Picture_loadBitmap.apply(this, arguments);
        }
    };

    Sprite_Picture.prototype.makeDynamicBitmap = function() {
        const text = this.picture().getDText();
        const tempWindow = new Window_Base(new Rectangle());
        const size = tempWindow.textSizeEx(text);
        this.bitmap = new Bitmap(size.width, size.height);
        if (this.dTextInfo.font) {
            this.bitmap.fontFace = this.dTextInfo.font;
        }
        if (this.dTextInfo.color) {
            this.makeDynamicBitmapBack();
        }
        this.setColorTone([0, 0, 0, 0]);
        tempWindow.contents = this.bitmap;
        const rect = tempWindow.textSizeEx(text);
        tempWindow.textPictureWidth = rect.width;
        tempWindow.textPictureAlign = this.dTextInfo.align;
        tempWindow.drawTextEx(text, 0, 0);
        tempWindow.contents = null;
        tempWindow.destroy();
        if (this._frameWindow) {
            this.removeFrameWindow();
        }
        if (this.dTextInfo.windowFrame) {
            const scaleX = this.picture().scaleX() / 100;
            const scaleY = this.picture().scaleY() / 100;
            this.makeFrameWindow(size.width * scaleX, size.height * scaleY);
        }
    };

    Sprite_Picture.prototype.makeDynamicBitmapBack = function() {
        this.bitmap.fillAll(this.dTextInfo.color);
        const h             = this.bitmap.height;
        const w             = this.bitmap.width;
        const gradationLeft = this.dTextInfo.gradationLeft;
        if (gradationLeft > 0) {
            this.bitmap.clearRect(0, 0, gradationLeft, h);
            this.bitmap.gradientFillRect(0, 0, gradationLeft, h, 'rgba(0, 0, 0, 0)', this.dTextInfo.color, false);
        }
        const gradationRight = this.dTextInfo.gradationRight;
        if (gradationRight > 0) {
            this.bitmap.clearRect(w - gradationRight, 0, gradationRight, h);
            this.bitmap.gradientFillRect(w - gradationRight, 0, gradationRight, h, this.dTextInfo.color, 'rgba(0, 0, 0, 0)', false);
        }
    };
})();