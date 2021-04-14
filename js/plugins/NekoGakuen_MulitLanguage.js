//=============================================================================
// NekoGakuen_MulitLanguage.js
// Version: 1.6.3
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 多國語言文本
 * @author Mirai
 * @version 1.6.3
 * @url https://nekogakuen.blogspot.com
 * @help
 * 
 * ─ 插件簡介 ─
 * 在RPG Maker MV/MZ中用於支援各國語言文本內容的切換功能。
 * 
 * 
 * ─ 更新履歷 ─
 * V1.6.3 修正在MV/MZ版本時少部分的用語方面顯示文字訊息等問題。
 * V1.6.2 修正在MV/MZ版本時用語方面顯示文字訊息等問題。
 * V1.6.1 修正在MV版本時顯示地圖名稱錯誤的問題。
 * V1.6 將MV版本用及MZ版本用的插件合併。
 * V1.5.2 修正遊戲初期選擇語言功能的判斷問題。
 * V1.5.1 將遊戲初期選擇語言程式碼做最佳化處理。
 * V1.5 新增遊戲初期選擇語言的功能。
 * V1.4.1 修正「\Say[<參數>]」使用時無法轉換控制字符的問題。
 * V1.4 修正「!Say <參數>」使用時的錯誤問題，另外也新增插件使用說明的Google文件連結。
 * V1.3 修正「顯示文字..」時名字框無法讀取「外部文本」問題，同時也將程式碼做最佳化處理。
 * V1.2 修正讀檔時無法成功讀取「外部文本」參數問題。
 * V1.1 修正一些錯誤。
 * V1.0 初次版本的插件發佈。
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MV/MZ的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 2.在事件頁中高級區塊選擇「插件命令...」，
 *   並設定選擇要執行的插件命令及參數即可。
 * 
 * ※ 詳細使用說明：
 * [RPG Maker MV版本]
 * http://hyperurl.co/rfb9zc
 *
 * [RPG Maker MZ版本]
 * http://hyperurl.co/8u6kes
 * 
 * 
 * ─ 插件命令/腳本/文字指令 ─
 * 
 * 【變更CSV檔讀取】
 * --說明：設定外部文本參數，且必須跟插件的「外部文本語言列表」所設定的「參數」一致。
 * --插件命令 MulitLang CSV <參數>
 * --腳本 $gameSystem.mulitLangCSV("<參數>");
 * 
 * 【變更遊戲語言】
 * --說明：設定文本語言參數，且必須跟CSV檔案裡的欄位名稱一致。
 * --插件命令 MulitLang SET <參數>
 * --腳本 $gameSystem.mulitLangSET("<參數>");
 * 
 * 【呼叫多國語言文本】
 * --說明：在遊戲中呼叫目前所設定的語言文本。
 * 而<參數>為你在CSV檔案裡所輸入的參數名稱。
 * --文字指令  !Say <參數>
 * (※適用於「資料庫」中所有的文字框部分。)
 * --文字指令  \Say[<參數>]
 * (※僅在事件指令「顯示文字...」、「顯示選擇...」使用。)
 * 
 * ※注意：上述提到的參數命名方式最好不要有任何的半形空白，
 * 如有空白可以改成「_」取代半形空白。
 * 
 * 
 * ─ 版權聲明 ─
 * 修改或翻譯本插件無需向作者事前告知，但修改後的版本禁止再次發佈。
 * 如果官方的版本有BUG，可以跟作者回報。
 * 
 * 禁止利用本插件進行非法販售及詐騙。
 * 作者只單純提供此插件，如有問題請使用者自負所有法律責任。
 * 本插件著作權為貓咪學園(Neko Gakuen)的程式人員Mirai(快閃小強)所有。
 * 
 * --------------------
 * -來源標示：【△ 不需要，但有的話會很感謝】
 * -授權方式：【√ 免費】
 * -商業營利：【√ 允許】
 * -改作許可：【√ 允許】
 * -二次配佈：【× 禁止】
 * -成人用途：【√ 允許】
 * -使用範圍：【※ 僅RPG Maker系列】
 * --------------------
 * 
 * 
 * 
 * @command MulitLang CSV
 * @text 變更CSV檔讀取
 * @desc 在遊戲中變更CSV的語言。
 * 
 * @arg exTextArgs
 * @type string
 * @default Text01
 * @text 外部文本參數
 * @desc 設定外部文本參數，且必須跟插件的「外部文本語言列表」所設定的「參數」一致。
 * 
 * 
 * @command MulitLang SET
 * @text 變更遊戲語言
 * @desc 在遊戲中變更遊戲文本的語言。
 *
 * @arg langTextArgs
 * @type string
 * @default zh_TW
 * @text 文本語言參數
 * @desc 設定文本語言參數，且必須跟CSV檔案裡的欄位名稱一致。
 * 
 * 
 * 
 * @param Lancsv List
 * @text 外部文本語言...
 * @desc 匯入各種外部文本CSV檔案。
 * @type struct<Lancsv>[]
 * @default ["{\"Lancsv Name\":\"Text01\",\"Lancsv Path\":\"data/Text.csv\"}"]
 * 
 * @param Custom Langlist
 * @text 自訂遊戲語言...
 * @desc 設定自己遊戲可以選擇切換的語言。
 * @type struct<Langlist>[]
 * @default ["{\"Lang Key\":\"zh_TW\",\"Lang Name\":\"中文\",\"Init Help\":\"請選擇語言？\"}","{\"Lang Key\":\"JP\",\"Lang Name\":\"日本語\",\"Init Help\":\"言語を選択してください？\"}","{\"Lang Key\":\"EN\",\"Lang Name\":\"English\",\"Init Help\":\"Please select language?\"}"]
 * 
 * @param Config Lang
 * @text 選項語言名稱
 * @desc 設定遊戲設定「選項」的語言設定名稱，
 * 如需要選項語言支援多國語言可以使用 !Say <參數> 。
 * @type string
 * @default 語言設定
 * 
 * @param Lancsv Var
 * @text 外部文本記錄變數
 * @desc 用於記錄「外部文本」參數的變數ID。
 * @type variable
 * @default 0
 * 
 * @param InitLang Set
 * @text 初期語言選擇...
 * @desc 設定遊戲一開始的語言選擇參數。
 * @type struct<InitLan>
 * @default {"InitLan Switch":"true","InitLan Images":"","InitLan SelectX":"283","InitLan SelectY":"250","InitLan HelpX":"0","InitLan HelpY":"0"}
 * 
 */
/*~struct~Lancsv:
 * 
 * @param Lancsv Name
 * @text 外部文本參數
 * @desc 指定外部文本CSV檔的參數名稱。
 * @type string
 * 
 * @param Lancsv Path
 * @text 外部文本CSV檔
 * @desc 指定外部文本的CSV檔案路徑。
 * @type string
 * 
 */
/*~struct~Langlist:
 * 
 * @param Lang Key
 * @text 文本語言參數
 * @desc 指定該遊戲語言的參數名稱，
 * 必須跟CSV檔案的欄位名稱一致。
 * @type string
 * 
 * @param Lang Name
 * @text 文本語言名稱
 * @desc 指定該遊戲語言的顯示名稱。
 * @type string
 * 
 * @param Init Help
 * @text 初期語言說明
 * @desc 指定初期選擇遊戲語言時顯示的文字說明，
 * 如果「初期語言選擇」為關閉時可不必填此參數。
 * @type string
 * 
 */
/*~struct~InitLan:
 * 
 * @param InitLan Switch
 * @text 初期語言選擇
 * @desc 是否需要開啟遊戲初期時的語言選擇。
 * @type boolean
 * @on 開啟
 * @off 關閉
 * @default true
 * 
 * @param InitLan Images
 * @text 初期語言背景
 * @desc 指定初期語言選擇畫面的背景圖片，
 * 圖片檔案放在img/pictures資料夾內。
 * @type file
 * @dir img/pictures/
 * @require 1
 * 
 * @param InitLan SelectX
 * @text 語言選擇X軸
 * @desc 指定語言選擇視窗的X軸顯示座標。
 * @type number
 * @min -9999
 * @default 283
 * 
 * @param InitLan SelectY
 * @text 語言選擇Y軸
 * @desc 指定語言選擇視窗的Y軸顯示座標。
 * @type number
 * @min -9999
 * @default 250
 * 
 * @param InitLan HelpX
 * @text 語言說明X軸
 * @desc 指定語言說明視窗的X軸顯示座標。
 * @type number
 * @min -9999
 * @default 0
 * 
 * @param InitLan HelpY
 * @text 語言說明Y軸
 * @desc 指定語言說明視窗的Y軸顯示座標。
 * @type number
 * @min -9999
 * @default 0
 * 
 */
//=============================================================================
'use strict';
if (Utils.RPGMAKER_NAME === "MZ") {
    (() => {
        let NekoGakuen = {};
        const pluginName = "NekoGakuen_MulitLanguage";
        NekoGakuen.MulitLanguage = {};
        NekoGakuen.MulitLanguage.Parameters = PluginManager.parameters(pluginName);
        NekoGakuen.MulitLanguage.Config_Lang = String(NekoGakuen.MulitLanguage.Parameters['Config Lang'] || "語言設定");
        NekoGakuen.MulitLanguage.LancsvVar = Number(NekoGakuen.MulitLanguage.Parameters['Lancsv Var'] || 0);
        const args_InitLanSet = JSON.parse(NekoGakuen.MulitLanguage.Parameters['InitLang Set']);
        const args_LanNameList = JSON.parse(NekoGakuen.MulitLanguage.Parameters['Custom Langlist']);
        const args_LancsvFileList = JSON.parse(NekoGakuen.MulitLanguage.Parameters['Lancsv List']);
        const args_Lancsv1a = Array();
        const args_Lancsv1b = Array();
        const args_Lan2a = Array();
        const args_Lan2b = Array();
        const args_Lan2c = Array();
        let args_load = false;
        let args_LancsvPath
        let args_LanName;

        for (let i = 0; i < args_LancsvFileList.length; i++) {
            args_LancsvPath = JSON.parse(args_LancsvFileList[i]);
            args_Lancsv1a.push(String(args_LancsvPath["Lancsv Name"]));
            args_Lancsv1b.push(String(args_LancsvPath["Lancsv Path"]));
        }
        for (let i = 0; i < args_LanNameList.length; i++) {
            args_LanName = JSON.parse(args_LanNameList[i]);
            args_Lan2a.push(String(args_LanName["Lang Key"]));
            args_Lan2b.push(String(args_LanName["Lang Name"]));
            args_Lan2c.push(String(args_LanName["Init Help"]));
        }


        NekoGakuen.MulitLanguage._Scene_Boot_start = Scene_Boot.prototype.start;
        Scene_Boot.prototype.start = function () {
            NekoGakuen.MulitLanguage._Scene_Boot_start.call(this);
            ConfigManager.load();
            if (args_InitLanSet["InitLan Switch"] == 'true' && ConfigManager.language == undefined) {
                ConfigManager.language = "init";
            } else {
                ConfigManager.language = 0;
            }
            if (ConfigManager.language == "init") {
                if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {
                    SceneManager.goto(Scene_InitialLanguage);
                }
            }
        };

        let args_Csvindex = args_Lancsv1b[0];
        let args_Lanindex = args_Lan2a[0];
        let request = new XMLHttpRequest();
        request.open("GET", args_Csvindex, false);
        request.send(null);

        let csvData = new Array();
        let jsonObject = request.responseText.split(/\r\n|\r/);
        for (let i = 0; i < jsonObject.length; i++) {
            csvData.push(jsonObject[i].split(','));
        }

        PluginManager.registerCommand(pluginName, "MulitLang CSV", args => {
            if (args_Lancsv1a.indexOf(args.exTextArgs) != -1) {
                $gameSystem.mulitLangCSV(String(args.exTextArgs));
            }
        });

        PluginManager.registerCommand(pluginName, "MulitLang SET", args => {
            if (args_Lan2a[args_Lan2a.indexOf(args.langTextArgs)] != undefined) {
                $gameSystem.mulitLangSET(String(args.langTextArgs));
            }
        });

        NekoGakuen.MulitLanguage._Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
        Window_Base.prototype.convertEscapeCharacters = function (text) {
            let content = NekoGakuen.MulitLanguage._Window_Base_convertEscapeCharacters.call(this, text);
            content = content.replace(/\x1bSay\[(.*?)\]/gi, (_, p1) =>
                MulitLanguageArgs.isLangDataText(String(p1)) ? this.convertEscapeCharacters(MulitLanguageArgs.getLangDataText(String(p1))) : ''
            );
            return content;
        };

        NekoGakuen.MulitLanguage._Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
        Scene_Load.prototype.onLoadSuccess = function () {
            NekoGakuen.MulitLanguage._Scene_Load_onLoadSuccess.call(this);
            args_load = true;
        };

        Scene_Map.prototype.isReady = function () {
            if (!this._mapLoaded && DataManager.isMapLoaded()) {
                this.onMapLoaded();
                this._mapLoaded = true;
                if (args_load) {
                    MulitLanguageArgs.setCsvData(args_Lancsv1a[$gameVariables.value(NekoGakuen.MulitLanguage.LancsvVar)]);
                    args_load = false;
                }
            }
            return this._mapLoaded && Scene_Message.prototype.isReady.call(this);
        };

        Game_Interpreter.prototype.checkTextByData = function (text) {
            text = text.replace(/\\/g, '\x1b');
            text = text.replace(/\x1bSay\[(.*?)\]/gi, (_, p1) =>
                MulitLanguageArgs.isLangDataText(String(p1)) ? MulitLanguageArgs.getLangDataText(String(p1)) : ''
            );
            return text;
        }

        Game_Interpreter.prototype.setupChoices = function (params) {
            const choices = params[0].clone();
            for (let i = 0; i < choices.length; i++) {
                choices[i] = this.checkTextByData(choices[i]);
            }
            const cancelType = params[1] < choices.length ? params[1] : -2;
            const defaultType = params.length > 2 ? params[2] : 0;
            const positionType = params.length > 3 ? params[3] : 2;
            const background = params.length > 4 ? params[4] : 0;
            $gameMessage.setChoices(choices, defaultType, cancelType);
            $gameMessage.setChoiceBackground(background);
            $gameMessage.setChoicePositionType(positionType);
            $gameMessage.setChoiceCallback(n => {
                this._branch[this._indent] = n;
            });
        };

        TextManager.basic = function (basicId) {
            const args = $dataSystem.terms.basic[basicId].split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0])) || "";
            } else {
                return $dataSystem.terms.basic[basicId] || "";
            }
        };

        TextManager.param = function (paramId) {
            const args = $dataSystem.terms.params[paramId].split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0])) || "";
            } else {
                return $dataSystem.terms.params[paramId] || "";
            }
        };

        TextManager.command = function (commandId) {
            const args = $dataSystem.terms.commands[commandId].split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0])) || "";
            } else {
                return $dataSystem.terms.commands[commandId] || "";
            }
        };

        TextManager.message = function (messageId) {
            const args = $dataSystem.terms.messages[messageId].split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0])) || "";
            } else {
                return $dataSystem.terms.messages[messageId] || "";
            }
        };

        TextManager.getter = function (method, param) {
            return {
                get: function () {
                    const args = this[method](param).split(" ");
                    const command = args.shift();
                    if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {

                        return MulitLanguageArgs.getLangDataText(String(args[0]));
                    } else {
                        return this[method](param);
                    }
                },
                configurable: true
            };
        };

        Object.defineProperties(TextManager, {
            level: TextManager.getter("basic", 0),
            levelA: TextManager.getter("basic", 1),
            hp: TextManager.getter("basic", 2),
            hpA: TextManager.getter("basic", 3),
            mp: TextManager.getter("basic", 4),
            mpA: TextManager.getter("basic", 5),
            tp: TextManager.getter("basic", 6),
            tpA: TextManager.getter("basic", 7),
            exp: TextManager.getter("basic", 8),
            expA: TextManager.getter("basic", 9),
            fight: TextManager.getter("command", 0),
            escape: TextManager.getter("command", 1),
            attack: TextManager.getter("command", 2),
            guard: TextManager.getter("command", 3),
            item: TextManager.getter("command", 4),
            skill: TextManager.getter("command", 5),
            equip: TextManager.getter("command", 6),
            status: TextManager.getter("command", 7),
            formation: TextManager.getter("command", 8),
            save: TextManager.getter("command", 9),
            gameEnd: TextManager.getter("command", 10),
            options: TextManager.getter("command", 11),
            weapon: TextManager.getter("command", 12),
            armor: TextManager.getter("command", 13),
            keyItem: TextManager.getter("command", 14),
            equip2: TextManager.getter("command", 15),
            optimize: TextManager.getter("command", 16),
            clear: TextManager.getter("command", 17),
            newGame: TextManager.getter("command", 18),
            continue_: TextManager.getter("command", 19),
            toTitle: TextManager.getter("command", 21),
            cancel: TextManager.getter("command", 22),
            buy: TextManager.getter("command", 24),
            sell: TextManager.getter("command", 25),
            alwaysDash: TextManager.getter("message", "alwaysDash"),
            commandRemember: TextManager.getter("message", "commandRemember"),
            touchUI: TextManager.getter("message", "touchUI"),
            bgmVolume: TextManager.getter("message", "bgmVolume"),
            bgsVolume: TextManager.getter("message", "bgsVolume"),
            meVolume: TextManager.getter("message", "meVolume"),
            seVolume: TextManager.getter("message", "seVolume"),
            possession: TextManager.getter("message", "possession"),
            expTotal: TextManager.getter("message", "expTotal"),
            expNext: TextManager.getter("message", "expNext"),
            saveMessage: TextManager.getter("message", "saveMessage"),
            loadMessage: TextManager.getter("message", "loadMessage"),
            file: TextManager.getter("message", "file"),
            autosave: TextManager.getter("message", "autosave"),
            partyName: TextManager.getter("message", "partyName"),
            emerge: TextManager.getter("message", "emerge"),
            preemptive: TextManager.getter("message", "preemptive"),
            surprise: TextManager.getter("message", "surprise"),
            escapeStart: TextManager.getter("message", "escapeStart"),
            escapeFailure: TextManager.getter("message", "escapeFailure"),
            victory: TextManager.getter("message", "victory"),
            defeat: TextManager.getter("message", "defeat"),
            obtainExp: TextManager.getter("message", "obtainExp"),
            obtainGold: TextManager.getter("message", "obtainGold"),
            obtainItem: TextManager.getter("message", "obtainItem"),
            levelUp: TextManager.getter("message", "levelUp"),
            obtainSkill: TextManager.getter("message", "obtainSkill"),
            useItem: TextManager.getter("message", "useItem"),
            criticalToEnemy: TextManager.getter("message", "criticalToEnemy"),
            criticalToActor: TextManager.getter("message", "criticalToActor"),
            actorDamage: TextManager.getter("message", "actorDamage"),
            actorRecovery: TextManager.getter("message", "actorRecovery"),
            actorGain: TextManager.getter("message", "actorGain"),
            actorLoss: TextManager.getter("message", "actorLoss"),
            actorDrain: TextManager.getter("message", "actorDrain"),
            actorNoDamage: TextManager.getter("message", "actorNoDamage"),
            actorNoHit: TextManager.getter("message", "actorNoHit"),
            enemyDamage: TextManager.getter("message", "enemyDamage"),
            enemyRecovery: TextManager.getter("message", "enemyRecovery"),
            enemyGain: TextManager.getter("message", "enemyGain"),
            enemyLoss: TextManager.getter("message", "enemyLoss"),
            enemyDrain: TextManager.getter("message", "enemyDrain"),
            enemyNoDamage: TextManager.getter("message", "enemyNoDamage"),
            enemyNoHit: TextManager.getter("message", "enemyNoHit"),
            evasion: TextManager.getter("message", "evasion"),
            magicEvasion: TextManager.getter("message", "magicEvasion"),
            magicReflection: TextManager.getter("message", "magicReflection"),
            counterAttack: TextManager.getter("message", "counterAttack"),
            substitute: TextManager.getter("message", "substitute"),
            buffAdd: TextManager.getter("message", "buffAdd"),
            debuffAdd: TextManager.getter("message", "debuffAdd"),
            buffRemove: TextManager.getter("message", "buffRemove"),
            actionFailure: TextManager.getter("message", "actionFailure")
        });

        Game_Enemy.prototype.originalName = function () {
            const args = this.enemy().name.split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                return this.enemy().name;
            }
        };

        Game_Actor.prototype.displayLevelUp = function (newSkills) {
            const args = this._name.split(" ");
            const command = args.shift();
            let actorName;
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                actorName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                actorName = this._name;
            }
            const text = TextManager.levelUp.format(
                actorName,
                TextManager.level,
                this._level
            );
            $gameMessage.newPage();
            $gameMessage.add(text);
            for (const skill of newSkills) {
                const args = skill.name.split(" ");
                const command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    $gameMessage.add(TextManager.obtainSkill.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                } else {
                    $gameMessage.add(TextManager.obtainSkill.format(skill.name));
                }
            }
        };

        Game_Actor.prototype.showAddedStates = function () {
            for (const state of this.result().addedStateObjects()) {
                if (state.message1) {
                    const args = this._name.split(" ");
                    const command = args.shift();
                    if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                        $gameMessage.add(state.message1.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                    } else {
                        $gameMessage.add(state.message1.format(this._name));
                    }
                }
            }
        };

        Game_Actor.prototype.showRemovedStates = function () {
            for (const state of this.result().removedStateObjects()) {
                if (state.message4) {
                    const args = this._name.split(" ");
                    const command = args.shift();
                    if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                        $gameMessage.add(state.message4.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                    } else {
                        $gameMessage.add(state.message4.format(this._name));
                    }
                }
            }
        };

        BattleManager.displayStartMessages = function () {
            for (const name of $gameTroop.enemyNames()) {
                const args = name.split(" ");
                const command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    $gameMessage.add(TextManager.emerge.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                } else {
                    $gameMessage.add(TextManager.emerge.format(name));
                }
            }
            const args = $gameParty.name().split(" ");
            const command = args.shift();
            let partyName;
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                partyName = $gameParty.name();
            }
            if (this._preemptive) {
                $gameMessage.add(TextManager.preemptive.format(partyName));
            } else if (this._surprise) {
                $gameMessage.add(TextManager.surprise.format(partyName));
            }
        };

        BattleManager.displayVictoryMessage = function () {
            const args = $gameParty.name().split(" ");
            const command = args.shift();
            let partyName;
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                partyName = $gameParty.name();
            }
            $gameMessage.add(TextManager.victory.format(partyName));
        };

        BattleManager.displayDefeatMessage = function () {
            const args = $gameParty.name().split(" ");
            const command = args.shift();
            let partyName;
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                partyName = $gameParty.name();
            }
            $gameMessage.add(TextManager.defeat.format(partyName));
        };

        BattleManager.displayEscapeSuccessMessage = function () {
            const args = $gameParty.name().split(" ");
            const command = args.shift();
            let partyName;
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                partyName = $gameParty.name();
            }
            $gameMessage.add(TextManager.escapeStart.format(partyName));
        };

        BattleManager.displayEscapeFailureMessage = function () {
            const args = $gameParty.name().split(" ");
            const command = args.shift();
            let partyName;
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                partyName = $gameParty.name();
            }
            $gameMessage.add(TextManager.escapeStart.format(partyName));
            $gameMessage.add("\\." + TextManager.escapeFailure);
        };

        BattleManager.displayDropItems = function () {
            const items = this._rewards.items;
            if (items.length > 0) {
                $gameMessage.newPage();
                for (const item of items) {
                    const args = item.name.split(" ");
                    const command = args.shift();
                    if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                        $gameMessage.add(TextManager.obtainItem.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                    } else {
                        $gameMessage.add(TextManager.obtainItem.format(item.name));
                    }
                }
            }
        };

        Window_BattleLog.prototype.displayItemMessage = function (fmt, subject, item) {
            if (fmt) {
                const args = item.name.split(" ");
                const command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    this.push("addText", fmt.format(subject.name(), MulitLanguageArgs.getLangDataText(String(args[0]))));
                } else {
                    this.push("addText", fmt.format(subject.name(), item.name));
                }
            }
        };

        Window_BattleLog.prototype.displayCounter = function (target) {
            this.push("performCounter", target);
            const args = target.name().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.push("addText", TextManager.counterAttack.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
            } else {
                this.push("addText", TextManager.counterAttack.format(target.name()));
            }
        };

        Window_BattleLog.prototype.displayReflection = function (target) {
            this.push("performReflection", target);
            const args = target.name().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.push("addText", TextManager.magicReflection.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
            } else {
                this.push("addText", TextManager.magicReflection.format(target.name()));
            }
        };

        Window_BattleLog.prototype.displaySubstitute = function (substitute, target) {
            const substName = substitute.name();
            const args = target.name().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                const text = TextManager.substitute.format(substName, MulitLanguageArgs.getLangDataText(String(args[0])));
            } else {
                const text = TextManager.substitute.format(substName, target.name());
            }
            this.push("performSubstitute", substitute, target);
            this.push("addText", text);
        };

        Window_BattleLog.prototype.displayMiss = function (target) {
            let fmt;
            if (target.result().physical) {
                const isActor = target.isActor();
                fmt = isActor ? TextManager.actorNoHit : TextManager.enemyNoHit;
                this.push("performMiss", target);
            } else {
                fmt = TextManager.actionFailure;
            }
            const args = target.name().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.push("addText", fmt.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
            } else {
                this.push("addText", fmt.format(target.name()));
            }
        };


        Window_BattleLog.prototype.displayEvasion = function (target) {
            let fmt;
            if (target.result().physical) {
                fmt = TextManager.evasion;
                this.push("performEvasion", target);
            } else {
                fmt = TextManager.magicEvasion;
                this.push("performMagicEvasion", target);
            }
            const args = target.name().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.push("addText", fmt.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
            } else {
                this.push("addText", fmt.format(target.name()));
            }
        };

        Window_BattleLog.prototype.displayAddedStates = function (target) {
            const result = target.result();
            const states = result.addedStateObjects();
            for (const state of states) {
                const stateText = target.isActor() ? state.message1 : state.message2;
                if (state.id === target.deathStateId()) {
                    this.push("performCollapse", target);
                }
                if (stateText) {
                    this.push("popBaseLine");
                    this.push("pushBaseLine");
                    const args = target.name().split(" ");
                    const command = args.shift();
                    if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                        this.push("addText", stateText.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                    } else {
                        this.push("addText", stateText.format(target.name()));
                    }
                    this.push("waitForEffect");
                }
            }
        };

        Window_BattleLog.prototype.displayRemovedStates = function (target) {
            const result = target.result();
            const states = result.removedStateObjects();
            for (const state of states) {
                if (state.message4) {
                    this.push("popBaseLine");
                    this.push("pushBaseLine");
                    const args = target.name().split(" ");
                    const command = args.shift();
                    if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                        this.push("addText", state.message4.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                    } else {
                        this.push("addText", state.message4.format(target.name()));
                    }
                }
            }
        };

        Window_BattleLog.prototype.displayBuffs = function (target, buffs, fmt) {
            for (const paramId of buffs) {
                const text = fmt.format(target.name(), TextManager.param(paramId));
                this.push("popBaseLine");
                this.push("pushBaseLine");
                this.push("addText", text);
            }
        };

        Window_BattleLog.prototype.makeHpDamageText = function (target) {
            const result = target.result();
            const damage = result.hpDamage;
            const isActor = target.isActor();
            let fmt;
            let targetName;
            const args = target.name().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                targetName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                targetName = target.name();
            }
            if (damage > 0 && result.drain) {
                fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
                return fmt.format(targetName, TextManager.hp, damage);
            } else if (damage > 0) {
                fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
                return fmt.format(targetName, damage);
            } else if (damage < 0) {
                fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
                return fmt.format(targetName, TextManager.hp, -damage);
            } else {
                fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
                return fmt.format(targetName);
            }
        };

        Window_BattleLog.prototype.makeMpDamageText = function (target) {
            const result = target.result();
            const damage = result.mpDamage;
            const isActor = target.isActor();
            let fmt;
            let targetName;
            const args = target.name().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                targetName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                targetName = target.name();
            }
            if (damage > 0 && result.drain) {
                fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
                return fmt.format(targetName, TextManager.mp, damage);
            } else if (damage > 0) {
                fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
                return fmt.format(targetName, TextManager.mp, damage);
            } else if (damage < 0) {
                fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
                return fmt.format(targetName, TextManager.mp, -damage);
            } else {
                return "";
            }
        };

        Window_BattleLog.prototype.makeTpDamageText = function (target) {
            const result = target.result();
            const damage = result.tpDamage;
            const isActor = target.isActor();
            let fmt;
            let targetName;
            const args = target.name().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                targetName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                targetName = target.name();
            }
            if (damage > 0) {
                fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
                return fmt.format(targetName, TextManager.tp, damage);
            } else if (damage < 0) {
                fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
                return fmt.format(targetName, TextManager.tp, -damage);
            } else {
                return "";
            }
        };

        Game_Actor.prototype.name = function () {
            const args = this._name.split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                return this._name;
            }
        };

        Game_Party.prototype.name = function () {
            const numBattleMembers = this.battleMembers().length;
            if (numBattleMembers === 0) {
                return "";
            } else if (numBattleMembers === 1) {
                const args = this.leader().name().split(" ");
                const command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    return MulitLanguageArgs.getLangDataText(String(args[0]));
                } else {
                    return this.leader().name();
                }
            } else {
                const args = this.leader().name().split(" ");
                const command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {

                    return MulitLanguageArgs.getLangDataText(String(args[0]));
                } else {
                    return TextManager.partyName.format(this.leader().name());
                }
            }
        };

        Window_MapName.prototype.refresh = function () {
            this.contents.clear();
            if ($gameMap.displayName()) {
                const width = this.innerWidth;
                this.drawBackground(0, 0, width, this.lineHeight());
                const args = $gameMap.displayName().split(" ");
                const command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), 0, 0, width, "center");
                } else {
                    this.drawText($gameMap.displayName(), 0, 0, width, "center");
                }
            }
        };

        Window_Help.prototype.refresh = function () {
            const rect = this.baseTextRect();
            this.contents.clear();

            const args = this._text.split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.drawTextEx(MulitLanguageArgs.getLangDataText(String(args[0])), rect.x, rect.y, rect.width);
            } else {
                this.drawTextEx(this._text, rect.x, rect.y, rect.width);
            }
        };

        Window_Message.prototype.updateSpeakerName = function () {

            const content = $gameMessage.speakerName().replace(/\x1bSay\[(.*?)\]/gi, (_, p1) =>
                MulitLanguageArgs.isLangDataText(String(p1)) ? MulitLanguageArgs.getLangDataText(String(p1)) : ''

            );

            this._nameBoxWindow.setName(content);
        };

        Window_Base.prototype.drawItemName = function (item, x, y, width) {
            if (item) {
                const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
                const textMargin = ImageManager.iconWidth + 4;
                const itemWidth = Math.max(0, width - textMargin);
                this.resetTextColor();
                this.drawIcon(item.iconIndex, x, iconY);
                const args = item.name.split(" ");
                const command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), x + textMargin, y, itemWidth);
                } else {
                    this.drawText(item.name, x + textMargin, y, itemWidth);
                }
            }
        };

        Window_StatusBase.prototype.drawActorName = function (actor, x, y, width) {
            width = width || 168;
            this.changeTextColor(ColorManager.hpColor(actor));
            const args = actor.name().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), x, y, width);
            } else {
                this.drawText(actor.name(), x, y, width);
            }
        };

        Window_StatusBase.prototype.drawActorClass = function (actor, x, y, width) {
            width = width || 168;
            this.resetTextColor();
            const args = actor.currentClass().name.split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), x, y, width);
            } else {
                this.drawText(actor.currentClass().name, x, y, width);
            }
        };

        Window_StatusBase.prototype.drawActorNickname = function (actor, x, y, width) {
            width = width || 270;
            this.resetTextColor();
            const args = actor.nickname().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), x, y, width);
            } else {
                this.drawText(actor.nickname(), x, y, width);
            }
        };

        Scene_Status.prototype.refreshActor = function () {
            const actor = this.actor();
            const args = this._actor.profile().split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this._profileWindow.setText(MulitLanguageArgs.getLangDataText(String(args[0])));
            } else {
                this._profileWindow.setText(actor.profile());
            }
            this._statusWindow.setActor(actor);
            this._statusParamsWindow.setActor(actor);
            this._statusEquipWindow.setActor(actor);
        };


        function Window_LanguageSelect() {
            this.initialize(...arguments);
        }

        Window_LanguageSelect.prototype = Object.create(Window_Selectable.prototype);
        Window_LanguageSelect.prototype.constructor = Window_LanguageSelect;

        Window_LanguageSelect.prototype.initialize = function (rect) {
            Window_Selectable.prototype.initialize.call(this, rect);
            this.setTopRow(0);
            this.select(0);
            this.activate();
            this.width = this.windowWidth();
            this.height = this.windowHeight();
            this.refresh();
        };

        Window_LanguageSelect.prototype.maxCols = function () {
            return 1;
        };

        Window_LanguageSelect.prototype.colSpacing = function () {
            return 16;
        };

        Window_LanguageSelect.prototype.maxItems = function () {
            return args_LanNameList ? args_LanNameList.length : 1;
        };

        Window_LanguageSelect.prototype.windowWidth = function () {
            return 250;
        };

        Window_LanguageSelect.prototype.windowHeight = function () {
            return this.fittingHeight(this.numVisibleRows());
        };

        Window_LanguageSelect.prototype.drawItem = function (index) {
            const name = this.itemName(index);
            const rect = this.itemLineRect(index);
            this.resetTextColor();
            this.drawText(name, rect.x, rect.y, rect.width);
        };

        Window_LanguageSelect.prototype.numVisibleRows = function () {
            return args_LanNameList.length;
        };

        Window_LanguageSelect.prototype.itemName = function (value) {
            return args_Lan2b[value];
        };

        Window_LanguageSelect.prototype.item = function () {
            return this.itemAt(this.index());
        };

        Window_LanguageSelect.prototype.itemAt = function (index) {
            return args_LanNameList ? this.itemName(index) : null;
        };

        Window_LanguageSelect.prototype.refresh = function () {
            Window_Selectable.prototype.refresh.call(this);
        };


        function Window_LanguageHelp() {
            this.initialize(...arguments);
        }

        Window_LanguageHelp.prototype = Object.create(Window_Base.prototype);
        Window_LanguageHelp.prototype.constructor = Window_LanguageHelp;

        Window_LanguageHelp.prototype.initialize = function (rect) {
            Window_Base.prototype.initialize.call(this, rect);
            this._text = "";
        };

        Window_LanguageHelp.prototype.setText = function (text) {
            if (this._text !== text) {
                this._text = text;
                this.refresh();
            }
        };

        Window_LanguageHelp.prototype.clear = function () {
            this.setText("");
        };

        Window_LanguageHelp.prototype.setItem = function (value) {
            this.setText(args_Lan2c[value]);
        };

        Window_LanguageHelp.prototype.refresh = function () {
            const rect = this.baseTextRect();
            this.contents.clear();
            this.drawTextEx(this._text, rect.x, rect.y, rect.width);
        };


        function Scene_InitialLanguage() {
            this.initialize(...arguments);
        }

        Scene_InitialLanguage.prototype = Object.create(Scene_MenuBase.prototype);
        Scene_InitialLanguage.prototype.constructor = Scene_InitialLanguage;

        Scene_InitialLanguage.prototype.initialize = function () {
            Scene_MenuBase.prototype.initialize.call(this);
        };

        Scene_InitialLanguage.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.createLanguageSelectWindow();
            this.createHelpWindow();
        };

        Scene_InitialLanguage.prototype.createBackground = function () {

            this._background = new Sprite(ImageManager.loadPicture(args_InitLanSet["InitLan Images"]));
            this._background.x = 0;
            this._background.y = 0;

            this.addChild(this._background);
        };

        Scene_InitialLanguage.prototype.langSelectWindowRect = function () {
            const ww = 250;
            const wh = 150;
            const wx = Number(args_InitLanSet["InitLan SelectX"] || 283);
            const wy = Number(args_InitLanSet["InitLan SelectY"] || 250);
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_InitialLanguage.prototype.needsCancelButton = function () {
            return false;
        };

        Scene_InitialLanguage.prototype.createLanguageSelectWindow = function () {
            const rect = this.langSelectWindowRect();
            this._langSelectWindow = new Window_LanguageSelect(rect);
            this._langSelectWindow.setHandler("ok", this.onLangSetOk.bind(this));
            this.addWindow(this._langSelectWindow);
        };

        Scene_InitialLanguage.prototype.createHelpWindow = function () {
            const rect = this.helpWindowRect();
            this._langhelpWindow = new Window_LanguageHelp(rect);
            this.addWindow(this._langhelpWindow);
        };

        Scene_InitialLanguage.prototype.helpWindowRect = function () {
            const wx = Number(args_InitLanSet["InitLan HelpX"]);
            const wy = Number(args_InitLanSet["InitLan HelpY"]);
            const ww = Graphics.boxWidth;
            const wh = this.calcWindowHeight(1, false);
            return new Rectangle(wx, wy, ww, wh);
        };

        Scene_InitialLanguage.prototype.update = function () {
            Scene_Base.prototype.update.call(this);
            this._lastSelect = this._langSelectWindow.index();
            this._langhelpWindow.setItem(this._lastSelect);
        };

        Scene_InitialLanguage.prototype.onLangSetOk = function () {
            let langset = args_Lan2a[this._langSelectWindow.index()]
            ConfigManager.language = this._langSelectWindow.index();
            ConfigManager.save();
            MulitLanguageArgs.setLangData(String(langset));
            this._langSelectWindow.close();
            this.fadeOutAll();
            SceneManager.goto(Scene_Title);
        };

        Window_Options.prototype.statusText = function (index) {
            const symbol = this.commandSymbol(index);
            const value = this.getConfigValue(symbol);
            if (this.isVolumeSymbol(symbol)) {
                return this.volumeStatusText(value);
            } else if (this.isLanguageSymbol(symbol)) {
                return this.langSymbol(value);
            } else {
                return this.booleanStatusText(value);
            }
        };

        Window_Options.prototype.isLanguageSymbol = function (symbol) {
            return symbol.contains('language');
        };

        Window_Options.prototype.langSymbol = function (value) {
            return args_Lan2b[value];
        }

        Window_Options.prototype.addGeneralOptions = function () {
            const args = NekoGakuen.MulitLanguage.Config_Lang.split(" ");
            const command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.addCommand(MulitLanguageArgs.getLangDataText(String(args[0])), 'language');
            } else {
                this.addCommand(NekoGakuen.MulitLanguage.Config_Lang, 'language');
            }
            this.addCommand(TextManager.alwaysDash, "alwaysDash");
            this.addCommand(TextManager.commandRemember, "commandRemember");
            this.addCommand(TextManager.touchUI, "touchUI");
        };

        Window_Options.prototype.processOk = function () {
            const index = this.index();
            const symbol = this.commandSymbol(index);
            let value = this.getConfigValue(symbol);
            if (this.isVolumeSymbol(symbol)) {
                this.changeVolume(symbol, true, true);
            } else if (this.isLanguageSymbol(symbol)) {
                value += this.langOffset();
                let config = args_Lan2a;
                if (value > config.length - 1) {
                    value = 0;
                }
                MulitLanguageArgs.setLangData(args_Lan2a[value]);
                this.changeValue(symbol, value);
            } else {
                this.changeValue(symbol, !this.getConfigValue(symbol));
            }
        };

        Window_Options.prototype.langOffset = function () {
            return 1;
        }

        Window_Options.prototype.cursorLeft = function () {
            const index = this.index();
            const symbol = this.commandSymbol(index);
            let value = this.getConfigValue(symbol);
            if (this.isVolumeSymbol(symbol)) {
                this.changeVolume(symbol, false, false);
            } else if (this.isLanguageSymbol(symbol)) {
                value--;
                value = value.clamp(0, args_LanNameList.length);
                MulitLanguageArgs.setLangData(args_Lan2a[value]);
                this.changeValue(symbol, value);
            } else {
                this.changeValue(symbol, false);
            }
        };

        Window_Options.prototype.cursorRight = function () {
            const index = this.index();
            const symbol = this.commandSymbol(index);
            let value = this.getConfigValue(symbol);
            if (this.isVolumeSymbol(symbol)) {
                this.changeVolume(symbol, true, false);
            } else if (this.isLanguageSymbol(symbol)) {
                value++;
                value = value.clamp(0, args_LanNameList.length - 1);
                MulitLanguageArgs.setLangData(args_Lan2a[value]);
                this.changeValue(symbol, value);
            } else {
                this.changeValue(symbol, true);
            }
        };

        NekoGakuen.MulitLanguage._configManager_makeData = ConfigManager.makeData;
        ConfigManager.makeData = function () {
            const config = NekoGakuen.MulitLanguage._configManager_makeData.call(this);
            config.language = this.language;
            return config;
        };

        NekoGakuen.MulitLanguage._configManager_applyData = ConfigManager.applyData;
        ConfigManager.applyData = function (config) {
            NekoGakuen.MulitLanguage._configManager_applyData.call(this, config);
            this.language = this.readVolume(config, 'language');
            args_Lanindex = args_Lan2a[this.language];
        };

        ConfigManager.readVolume = function (config, name) {
            const value = config[name];
            if (name != 'language') {
                if (name in config) {
                    return Number(config[name]).clamp(0, 100);
                } else {
                    return 100;
                }
            } else {
                if (name in config) {
                    return Number(config[name]).clamp(0, args_LanNameList.length);
                } else {
                    return 0;
                }
            }
        };

        Game_System.prototype.mulitLangSET = function (lanargs) {
            ConfigManager.language = args_Lan2a.indexOf(lanargs);
            ConfigManager.save();
            MulitLanguageArgs.setLangData(String(lanargs));
        };

        Game_System.prototype.mulitLangCSV = function (csvargs) {
            $gameVariables.setValue(NekoGakuen.MulitLanguage.LancsvVar, args_Lancsv1a.indexOf(csvargs));
            MulitLanguageArgs.setCsvData(String(csvargs));
        };

        function MulitLanguageArgs() {
            throw new Error('This is a static class');
        }

        MulitLanguageArgs.setLangData = function (lanindex) {
            if (args_Lan2a[args_Lan2a.indexOf(lanindex)] != undefined) {
                args_Lanindex = args_Lan2a[args_Lan2a.indexOf(lanindex)];
            }
        }

        MulitLanguageArgs.setCsvData = function (csvindex) {
            args_Csvindex = args_Lancsv1b[args_Lancsv1a.indexOf(csvindex)];
            if (args_Csvindex != undefined) {
                request.open("GET", args_Csvindex, false);
                request.send(null);
                csvData = new Array();
                jsonObject = request.responseText.split(/\r\n|\r/);
                for (let i = 0; i < jsonObject.length; i++) {
                    csvData.push(jsonObject[i].split(','));
                }
            }
        }

        MulitLanguageArgs.isLangDataText = function (textArgs) {
            const idList = csvData.map(x => x[0]).indexOf(textArgs);
            return idList == -1 ? false : true;
        }

        MulitLanguageArgs.getLangDataText = function (textArgs) {
            let text = '';
            const idList = csvData.map(x => x[0]).indexOf(textArgs);
            const nameList = csvData["0"].indexOf(args_Lanindex);
            text = csvData[idList][nameList];
            text = text.replace(/^\"|\"$/g, '');
            return text;
        }
    })();
}

if (Utils.RPGMAKER_NAME === "MV") {
    (function () {
        let NekoGakuen = {};
        var pluginName = "NekoGakuen_MulitLanguage";
        NekoGakuen.MulitLanguage = {};
        NekoGakuen.MulitLanguage.Parameters = PluginManager.parameters(pluginName);
        NekoGakuen.MulitLanguage.Config_Lang = String(NekoGakuen.MulitLanguage.Parameters['Config Lang'] || "語言設定");
        NekoGakuen.MulitLanguage.LancsvVar = Number(NekoGakuen.MulitLanguage.Parameters['Lancsv Var'] || 0);
        var args_InitLanSet = JSON.parse(NekoGakuen.MulitLanguage.Parameters['InitLang Set']);
        var args_LanNameList = JSON.parse(NekoGakuen.MulitLanguage.Parameters['Custom Langlist']);
        var args_LancsvFileList = JSON.parse(NekoGakuen.MulitLanguage.Parameters['Lancsv List']);
        var args_Lancsv1a = Array();
        var args_Lancsv1b = Array();
        var args_Lan2a = Array();
        var args_Lan2b = Array();
        var args_Lan2c = Array();
        let args_load = false;
        let args_LancsvPath
        let args_LanName;

        for (let i = 0; i < args_LancsvFileList.length; i++) {
            args_LancsvPath = JSON.parse(args_LancsvFileList[i]);
            args_Lancsv1a.push(String(args_LancsvPath["Lancsv Name"]));
            args_Lancsv1b.push(String(args_LancsvPath["Lancsv Path"]));
        }
        for (let i = 0; i < args_LanNameList.length; i++) {
            args_LanName = JSON.parse(args_LanNameList[i]);
            args_Lan2a.push(String(args_LanName["Lang Key"]));
            args_Lan2b.push(String(args_LanName["Lang Name"]));
            args_Lan2c.push(String(args_LanName["Init Help"]));
        }

        ConfigManager.language = 0;
        NekoGakuen.MulitLanguage._Scene_Boot_start = Scene_Boot.prototype.start;
        Scene_Boot.prototype.start = function () {
            NekoGakuen.MulitLanguage._Scene_Boot_start.call(this);
            if (Utils.isNwjs()) {
                var fs = require('fs');
                if (args_InitLanSet["InitLan Switch"] == 'true' && !fs.existsSync('save/config.rpgsave')) {
                    ConfigManager.language = "init";
                }
            } else {
                if (args_InitLanSet["InitLan Switch"] == 'true' && !localStorage.getItem('RPG Config')) {
                    ConfigManager.language = "init";
                }
            }
            if (ConfigManager.language == "init") {
                if (!DataManager.isBattleTest() && !DataManager.isEventTest()) {
                    SceneManager.goto(Scene_InitialLanguage);
                }
            }
        };

        let args_Csvindex = args_Lancsv1b[0];
        let args_Lanindex = args_Lan2a[0];
        let request = new XMLHttpRequest();
        request.open("GET", args_Csvindex, false);
        request.send(null);

        let csvData = new Array();
        let jsonObject = request.responseText.split(/\r\n|\r/);
        for (let i = 0; i < jsonObject.length; i++) {
            csvData.push(jsonObject[i].split(','));
        }

        NekoGakuen.MulitLanguage._Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            NekoGakuen.MulitLanguage._Game_Interpreter_pluginCommand.call(this, command, args);
            if (command === 'MulitLang') {
                switch (args[0]) {
                    case 'CSV':
                        $gameSystem.mulitLangCSV(String(args[1]));
                        break;
                    case 'SET':
                        $gameSystem.mulitLangSET(String(args[1]));
                        break;
                }
            }
        };

        NekoGakuen.MulitLanguage._Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
        Window_Base.prototype.convertEscapeCharacters = function (text) {
            let content = NekoGakuen.MulitLanguage._Window_Base_convertEscapeCharacters.call(this, text);
            content = content.replace(/\x1bSay\[(.*?)\]/gi, function () {
                return MulitLanguageArgs.isLangDataText(String(arguments[1])) ? this.convertEscapeCharacters(MulitLanguageArgs.getLangDataText(String(arguments[1]))) : ''
            }.bind(this));
            return content;
        };

        NekoGakuen.MulitLanguage._Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
        Scene_Load.prototype.onLoadSuccess = function () {
            NekoGakuen.MulitLanguage._Scene_Load_onLoadSuccess.call(this);
            args_load = true;
        };

        Scene_Map.prototype.isReady = function () {
            if (!this._mapLoaded && DataManager.isMapLoaded()) {
                this.onMapLoaded();
                this._mapLoaded = true;
                if (args_load) {
                    MulitLanguageArgs.setCsvData(args_Lancsv1a[$gameVariables.value(NekoGakuen.MulitLanguage.LancsvVar)]);
                    args_load = false;
                }
            }
            return this._mapLoaded && Scene_Base.prototype.isReady.call(this);
        };

        Game_Interpreter.prototype.checkTextByData = function (text) {
            text = text.replace(/\\/g, '\x1b');
            text = text.replace(/\x1bSay\[(.*?)\]/gi, function () {
                return MulitLanguageArgs.isLangDataText(String(arguments[1])) ? MulitLanguageArgs.getLangDataText(String(arguments[1])) : ''
            }.bind(this));
            return text;
        }

        Game_Interpreter.prototype.setupChoices = function (params) {
            var choices = params[0].clone();
            for (let i = 0; i < choices.length; i++) {
                choices[i] = this.checkTextByData(choices[i]);
            }
            var cancelType = params[1];
            var defaultType = params.length > 2 ? params[2] : 0;
            var positionType = params.length > 3 ? params[3] : 2;
            var background = params.length > 4 ? params[4] : 0;
            if (cancelType >= choices.length) {
                cancelType = -2;
            }
            $gameMessage.setChoices(choices, defaultType, cancelType);
            $gameMessage.setChoiceBackground(background);
            $gameMessage.setChoicePositionType(positionType);
            $gameMessage.setChoiceCallback(function (n) {
                this._branch[this._indent] = n;
            }.bind(this));
        };

        TextManager.basic = function (basicId) {
            var args = $dataSystem.terms.basic[basicId].split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0])) || '';
            } else {
                return $dataSystem.terms.basic[basicId] || '';
            }
        };

        TextManager.param = function (paramId) {
            var args = $dataSystem.terms.params[paramId].split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0])) || '';
            } else {
                return $dataSystem.terms.params[paramId] || '';
            }
        };

        TextManager.command = function (commandId) {
            var args = $dataSystem.terms.commands[commandId].split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0])) || '';
            } else {
                return $dataSystem.terms.commands[commandId] || '';
            }
        };

        TextManager.message = function (messageId) {
            var args = $dataSystem.terms.messages[messageId].split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0])) || '';
            } else {
                return $dataSystem.terms.messages[messageId] || '';
            }
        };

        TextManager.getter = function (method, param) {
            return {
                get: function () {
                    var args = this[method](param).split(" ");
                    var command = args.shift();
                    if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                        return MulitLanguageArgs.getLangDataText(String(args[0]));
                    } else {
                        return this[method](param);
                    }
                },
                configurable: true
            };
        };

        Object.defineProperties(TextManager, {
            level: TextManager.getter('basic', 0),
            levelA: TextManager.getter('basic', 1),
            hp: TextManager.getter('basic', 2),
            hpA: TextManager.getter('basic', 3),
            mp: TextManager.getter('basic', 4),
            mpA: TextManager.getter('basic', 5),
            tp: TextManager.getter('basic', 6),
            tpA: TextManager.getter('basic', 7),
            exp: TextManager.getter('basic', 8),
            expA: TextManager.getter('basic', 9),
            fight: TextManager.getter('command', 0),
            escape: TextManager.getter('command', 1),
            attack: TextManager.getter('command', 2),
            guard: TextManager.getter('command', 3),
            item: TextManager.getter('command', 4),
            skill: TextManager.getter('command', 5),
            equip: TextManager.getter('command', 6),
            status: TextManager.getter('command', 7),
            formation: TextManager.getter('command', 8),
            save: TextManager.getter('command', 9),
            gameEnd: TextManager.getter('command', 10),
            options: TextManager.getter('command', 11),
            weapon: TextManager.getter('command', 12),
            armor: TextManager.getter('command', 13),
            keyItem: TextManager.getter('command', 14),
            equip2: TextManager.getter('command', 15),
            optimize: TextManager.getter('command', 16),
            clear: TextManager.getter('command', 17),
            newGame: TextManager.getter('command', 18),
            continue_: TextManager.getter('command', 19),
            toTitle: TextManager.getter('command', 21),
            cancel: TextManager.getter('command', 22),
            buy: TextManager.getter('command', 24),
            sell: TextManager.getter('command', 25),
            alwaysDash: TextManager.getter('message', 'alwaysDash'),
            commandRemember: TextManager.getter('message', 'commandRemember'),
            bgmVolume: TextManager.getter('message', 'bgmVolume'),
            bgsVolume: TextManager.getter('message', 'bgsVolume'),
            meVolume: TextManager.getter('message', 'meVolume'),
            seVolume: TextManager.getter('message', 'seVolume'),
            possession: TextManager.getter('message', 'possession'),
            expTotal: TextManager.getter('message', 'expTotal'),
            expNext: TextManager.getter('message', 'expNext'),
            saveMessage: TextManager.getter('message', 'saveMessage'),
            loadMessage: TextManager.getter('message', 'loadMessage'),
            file: TextManager.getter('message', 'file'),
            partyName: TextManager.getter('message', 'partyName'),
            emerge: TextManager.getter('message', 'emerge'),
            preemptive: TextManager.getter('message', 'preemptive'),
            surprise: TextManager.getter('message', 'surprise'),
            escapeStart: TextManager.getter('message', 'escapeStart'),
            escapeFailure: TextManager.getter('message', 'escapeFailure'),
            victory: TextManager.getter('message', 'victory'),
            defeat: TextManager.getter('message', 'defeat'),
            obtainExp: TextManager.getter('message', 'obtainExp'),
            obtainGold: TextManager.getter('message', 'obtainGold'),
            obtainItem: TextManager.getter('message', 'obtainItem'),
            levelUp: TextManager.getter('message', 'levelUp'),
            obtainSkill: TextManager.getter('message', 'obtainSkill'),
            useItem: TextManager.getter('message', 'useItem'),
            criticalToEnemy: TextManager.getter('message', 'criticalToEnemy'),
            criticalToActor: TextManager.getter('message', 'criticalToActor'),
            actorDamage: TextManager.getter('message', 'actorDamage'),
            actorRecovery: TextManager.getter('message', 'actorRecovery'),
            actorGain: TextManager.getter('message', 'actorGain'),
            actorLoss: TextManager.getter('message', 'actorLoss'),
            actorDrain: TextManager.getter('message', 'actorDrain'),
            actorNoDamage: TextManager.getter('message', 'actorNoDamage'),
            actorNoHit: TextManager.getter('message', 'actorNoHit'),
            enemyDamage: TextManager.getter('message', 'enemyDamage'),
            enemyRecovery: TextManager.getter('message', 'enemyRecovery'),
            enemyGain: TextManager.getter('message', 'enemyGain'),
            enemyLoss: TextManager.getter('message', 'enemyLoss'),
            enemyDrain: TextManager.getter('message', 'enemyDrain'),
            enemyNoDamage: TextManager.getter('message', 'enemyNoDamage'),
            enemyNoHit: TextManager.getter('message', 'enemyNoHit'),
            evasion: TextManager.getter('message', 'evasion'),
            magicEvasion: TextManager.getter('message', 'magicEvasion'),
            magicReflection: TextManager.getter('message', 'magicReflection'),
            counterAttack: TextManager.getter('message', 'counterAttack'),
            substitute: TextManager.getter('message', 'substitute'),
            buffAdd: TextManager.getter('message', 'buffAdd'),
            debuffAdd: TextManager.getter('message', 'debuffAdd'),
            buffRemove: TextManager.getter('message', 'buffRemove'),
            actionFailure: TextManager.getter('message', 'actionFailure'),
        });

        Game_Enemy.prototype.originalName = function () {
            var args = this.enemy().name.split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                return this.enemy().name;
            }
        };

        Game_Actor.prototype.displayLevelUp = function (newSkills) {
            var args = this._name.split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var text = TextManager.levelUp.format(MulitLanguageArgs.getLangDataText(String(args[0])), TextManager.level, this._level);
            } else {
                var text = TextManager.levelUp.format(this._name, TextManager.level, this._level);
            }
            $gameMessage.newPage();
            $gameMessage.add(text);
            newSkills.forEach(function (skill) {
                var args = skill.name.split(" ");
                var command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    $gameMessage.add(TextManager.obtainSkill.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                } else {
                    $gameMessage.add(TextManager.obtainSkill.format(skill.name));
                }
            });
        };

        BattleManager.displayStartMessages = function () {
            $gameTroop.enemyNames().forEach(function (name) {
                var args = name.split(" ");
                var command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    $gameMessage.add(TextManager.emerge.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                } else {
                    $gameMessage.add(TextManager.emerge.format(name));
                }
            });
            var args = $gameParty.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var partyName = $gameParty.name();
            }
            if (this._preemptive) {
                $gameMessage.add(TextManager.preemptive.format(partyName));
            } else if (this._surprise) {
                $gameMessage.add(TextManager.surprise.format(partyName));
            }
        };

        BattleManager.displayVictoryMessage = function () {
            var args = $gameParty.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var partyName = $gameParty.name();
            }
            $gameMessage.add(TextManager.victory.format(partyName));
        };

        BattleManager.displayDefeatMessage = function () {
            var args = $gameParty.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var partyName = $gameParty.name();
            }
            $gameMessage.add(TextManager.defeat.format(partyName));
        };

        BattleManager.displayEscapeSuccessMessage = function () {
            var args = $gameParty.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var partyName = $gameParty.name();
            }
            $gameMessage.add(TextManager.escapeStart.format(partyName));
        };

        BattleManager.displayEscapeFailureMessage = function () {
            var args = $gameParty.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var partyName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var partyName = $gameParty.name();
            }
            $gameMessage.add(TextManager.escapeStart.format(partyName));
            $gameMessage.add('\\.' + TextManager.escapeFailure);
        };

        BattleManager.displayDropItems = function () {
            var items = this._rewards.items;
            if (items.length > 0) {
                $gameMessage.newPage();
                items.forEach(function (item) {
                    var args = item.name.split(" ");
                    var command = args.shift();
                    if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                        $gameMessage.add(TextManager.obtainItem.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                    } else {
                        $gameMessage.add(TextManager.obtainItem.format(item.name));
                    }
                });
            }
        };

        Window_BattleLog.prototype.displayAction = function (subject, item) {
            var numMethods = this._methods.length;
            var args = item.name.split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var itemName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var itemName = item.name;
            }
            if (DataManager.isSkill(item)) {
                if (item.message1) {
                    this.push('addText', subject.name() + item.message1.format(itemName));
                }
                if (item.message2) {
                    this.push('addText', item.message2.format(itemName));
                }
            } else {
                this.push('addText', TextManager.useItem.format(subject.name(), itemName));
            }
            if (this._methods.length === numMethods) {
                this.push('wait');
            }
        };

        Window_BattleLog.prototype.displayCounter = function (target) {
            this.push('performCounter', target);
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.push('addText', TextManager.counterAttack.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
            } else {
                this.push('addText', TextManager.counterAttack.format(target.name()));
            }
        };

        Window_BattleLog.prototype.displayReflection = function (target) {
            this.push('performReflection', target);
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.push('addText', TextManager.magicReflection.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
            } else {
                this.push('addText', TextManager.magicReflection.format(target.name()));
            }
        };

        Window_BattleLog.prototype.displaySubstitute = function (substitute, target) {
            var substName = substitute.name();
            this.push('performSubstitute', substitute, target);
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.push('addText', TextManager.substitute.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
            } else {
                this.push('addText', TextManager.substitute.format(substName, target.name()));
            }
        };

        Window_BattleLog.prototype.displayFailure = function (target) {
            if (target.result().isHit() && !target.result().success) {
                var args = target.name().split(" ");
                var command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    this.push('addText', TextManager.actionFailure.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
                } else {
                    this.push('addText', TextManager.actionFailure.format(target.name()));
                }
            }
        };

        Window_BattleLog.prototype.displayEvasion = function (target) {
            var fmt;
            if (target.result().physical) {
                fmt = TextManager.evasion;
                this.push('performEvasion', target);
            } else {
                fmt = TextManager.magicEvasion;
                this.push('performMagicEvasion', target);
            }
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.push('addText', fmt.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
            } else {
                this.push('addText', fmt.format(target.name()));
            }
        };

        Window_BattleLog.prototype.displayMiss = function (target) {
            var fmt;
            if (target.result().physical) {
                fmt = target.isActor() ? TextManager.actorNoHit : TextManager.enemyNoHit;
                this.push('performMiss', target);
            } else {
                fmt = TextManager.actionFailure;
            }
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.push('addText', fmt.format(MulitLanguageArgs.getLangDataText(String(args[0]))));
            } else {
                this.push('addText', fmt.format(target.name()));
            }
        };

        Window_BattleLog.prototype.displayBuffs = function (target, buffs, fmt) {
            buffs.forEach(function (paramId) {
                this.push('popBaseLine');
                this.push('pushBaseLine');
                var args = target.name().split(" ");
                var command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    this.push('addText', fmt.format(MulitLanguageArgs.getLangDataText(String(args[0])), TextManager.param(paramId)));
                } else {
                    this.push('addText', fmt.format(target.name(), TextManager.param(paramId)));
                }
            }, this);
        };

        Window_BattleLog.prototype.makeHpDamageText = function (target) {
            var result = target.result();
            var damage = result.hpDamage;
            var isActor = target.isActor();
            var fmt;
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var targetName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var targetName = target.name();
            }
            if (damage > 0 && result.drain) {
                fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
                return fmt.format(targetName, TextManager.hp, damage);
            } else if (damage > 0) {
                fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
                return fmt.format(targetName, damage);
            } else if (damage < 0) {
                fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
                return fmt.format(targetName, TextManager.hp, -damage);
            } else {
                fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
                return fmt.format(targetName);
            }
        };

        Window_BattleLog.prototype.makeMpDamageText = function (target) {
            var result = target.result();
            var damage = result.mpDamage;
            var isActor = target.isActor();
            var fmt;
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var targetName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var targetName = target.name();
            }
            if (damage > 0 && result.drain) {
                fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
                return fmt.format(targetName, TextManager.mp, damage);
            } else if (damage > 0) {
                fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
                return fmt.format(targetName, TextManager.mp, damage);
            } else if (damage < 0) {
                fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
                return fmt.format(targetName, TextManager.mp, -damage);
            } else {
                return '';
            }
        };

        Window_BattleLog.prototype.makeTpDamageText = function (target) {
            var result = target.result();
            var damage = result.tpDamage;
            var isActor = target.isActor();
            var fmt;
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var targetName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var targetName = target.name();
            }
            if (damage > 0) {
                fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
                return fmt.format(targetName, TextManager.tp, damage);
            } else if (damage < 0) {
                fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
                return fmt.format(targetName, TextManager.tp, -damage);
            } else {
                return '';
            }
        };

        Window_BattleLog.prototype.displayBuffs = function (target, buffs, fmt) {
            buffs.forEach(function (paramId) {
                this.push('popBaseLine');
                this.push('pushBaseLine');
                var args = target.name().split(" ");
                var command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    this.push('addText', fmt.format(MulitLanguageArgs.getLangDataText(String(args[0])), TextManager.param(paramId)));
                } else {
                    this.push('addText', fmt.format(target.name(), TextManager.param(paramId)));
                }
            }, this);
        };

        Window_BattleLog.prototype.makeHpDamageText = function (target) {
            var result = target.result();
            var damage = result.hpDamage;
            var isActor = target.isActor();
            var fmt;
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var targetName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var targetName = target.name();
            }
            if (damage > 0 && result.drain) {
                fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
                return fmt.format(targetName, TextManager.hp, damage);
            } else if (damage > 0) {
                fmt = isActor ? TextManager.actorDamage : TextManager.enemyDamage;
                return fmt.format(targetName, damage);
            } else if (damage < 0) {
                fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
                return fmt.format(targetName, TextManager.hp, -damage);
            } else {
                fmt = isActor ? TextManager.actorNoDamage : TextManager.enemyNoDamage;
                return fmt.format(targetName);
            }
        };

        Window_BattleLog.prototype.makeMpDamageText = function (target) {
            var result = target.result();
            var damage = result.mpDamage;
            var isActor = target.isActor();
            var fmt;
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var targetName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var targetName = target.name();
            }
            if (damage > 0 && result.drain) {
                fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
                return fmt.format(targetName, TextManager.mp, damage);
            } else if (damage > 0) {
                fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
                return fmt.format(targetName, TextManager.mp, damage);
            } else if (damage < 0) {
                fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
                return fmt.format(targetName, TextManager.mp, -damage);
            } else {
                return '';
            }
        };

        Window_BattleLog.prototype.makeTpDamageText = function (target) {
            var result = target.result();
            var damage = result.tpDamage;
            var isActor = target.isActor();
            var fmt;
            var args = target.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                var targetName = MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                var targetName = target.name();
            }
            if (damage > 0) {
                fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
                return fmt.format(targetName, TextManager.tp, damage);
            } else if (damage < 0) {
                fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
                return fmt.format(targetName, TextManager.tp, -damage);
            } else {
                return '';
            }
        };

        Game_Actor.prototype.name = function () {
            var args = this._name.split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                return MulitLanguageArgs.getLangDataText(String(args[0]));
            } else {
                return this._name;
            }
        };

        Game_Party.prototype.name = function () {
            var numBattleMembers = this.battleMembers().length;
            if (numBattleMembers === 0) {
                return "";
            } else if (numBattleMembers === 1) {
                var args = this.leader().name().split(" ");
                var command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    return MulitLanguageArgs.getLangDataText(String(args[0]));
                } else {
                    return this.leader().name();
                }
            } else {
                var args = this.leader().name().split(" ");
                var command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {

                    return MulitLanguageArgs.getLangDataText(String(args[0]));
                } else {
                    return TextManager.partyName.format(this.leader().name());
                }
            }
        };

        Window_MapName.prototype.refresh = function () {
            this.contents.clear();
            if ($gameMap.displayName()) {
                var width = this.contentsWidth();
                this.drawBackground(0, 0, width, this.lineHeight());
                var args = $gameMap.displayName().split(" ");
                var command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), 0, 0, width, "center");
                } else {
                    this.drawText($gameMap.displayName(), 0, 0, width, "center");
                }
            }
        };

        Window_Help.prototype.refresh = function () {
            this.contents.clear();
            var args = this._text.split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.drawTextEx(MulitLanguageArgs.getLangDataText(String(args[0])), this.textPadding(), 0);
            } else {
                this.drawTextEx(this._text, this.textPadding(), 0);
            }
        };

        Window_Base.prototype.drawItemName = function (item, x, y, width) {
            width = width || 312;
            if (item) {
                var iconBoxWidth = Window_Base._iconWidth + 4;
                this.resetTextColor();
                this.drawIcon(item.iconIndex, x + 2, y + 2);
                var args = item.name.split(" ");
                var command = args.shift();
                if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                    this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), x + iconBoxWidth, y, width - iconBoxWidth);
                } else {
                    this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
                }
            }
        };

        Window_Base.prototype.drawActorName = function (actor, x, y, width) {
            width = width || 168;
            this.changeTextColor(this.hpColor(actor));
            var args = actor.name().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), x, y, width);
            } else {
                this.drawText(actor.name(), x, y, width);
            }
        };

        Window_Base.prototype.drawActorClass = function (actor, x, y, width) {
            width = width || 168;
            this.resetTextColor();
            var args = actor.currentClass().name.split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), x, y, width);
            } else {
                this.drawText(actor.currentClass().name, x, y, width);
            }
        };

        Window_Base.prototype.drawActorNickname = function (actor, x, y, width) {
            width = width || 270;
            this.resetTextColor();
            var args = actor.nickname().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.drawText(MulitLanguageArgs.getLangDataText(String(args[0])), x, y, width);
            } else {
                this.drawText(actor.nickname(), x, y, width);
            }
        };

        Window_Status.prototype.drawProfile = function (x, y) {
            var args = this._actor.profile().split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.drawTextEx(MulitLanguageArgs.getLangDataText(String(args[0])), x, y);
            } else {
                this.drawTextEx(this._actor.profile(), x, y);
            }
        };


        function Window_LanguageSelect() {
            this.initialize.apply(this, arguments);
        }

        Window_LanguageSelect.prototype = Object.create(Window_Selectable.prototype);
        Window_LanguageSelect.prototype.constructor = Window_LanguageSelect;

        Window_LanguageSelect.prototype.initialize = function (x, y, width, height) {
            var width = this.windowWidth();
            var height = this.windowHeight();
            Window_Selectable.prototype.initialize.call(this, x, y, width, height);
            this.setTopRow(0);
            this.select(0);
            this.activate();
            this.refresh();
        };

        Window_LanguageSelect.prototype.maxCols = function () {
            return 1;
        };

        Window_LanguageSelect.prototype.spacing = function () {
            return 48;
        };

        Window_LanguageSelect.prototype.maxItems = function () {
            return args_LanNameList ? args_LanNameList.length : 1;
        };

        Window_LanguageSelect.prototype.windowWidth = function () {
            return 250;
        };

        Window_LanguageSelect.prototype.windowHeight = function () {
            return this.fittingHeight(this.numVisibleRows());
        };

        Window_LanguageSelect.prototype.drawItem = function (index) {
            var name = args_Lan2b[index];
            var rect = this.itemRectForText(index);
            this.drawText(name, rect.x, rect.y, rect.width);
        };

        Window_LanguageSelect.prototype.numVisibleRows = function () {
            return args_LanNameList.length;
        };

        Window_LanguageSelect.prototype.item = function () {
            return args_LanNameList ? args_Lan2b[this.index()] : null;
        };
        Window_LanguageSelect.prototype.makeItemList = function () {

        };
        Window_LanguageSelect.prototype.refresh = function () {
            this.createContents();
            this.drawAllItems();
        };


        function Window_LanguageHelp() {
            this.initialize.apply(this, arguments);
        }

        Window_LanguageHelp.prototype = Object.create(Window_Base.prototype);
        Window_LanguageHelp.prototype.constructor = Window_LanguageHelp;

        Window_LanguageHelp.prototype.initialize = function (numLines) {
            var width = Graphics.boxWidth;
            var height = this.fittingHeight(1);
            Window_Base.prototype.initialize.call(this, 0, 0, width, height);
            this._text = '';
        };

        Window_LanguageHelp.prototype.setText = function (text) {
            if (this._text !== text) {
                this._text = text;
                this.refresh();
            }
        };

        Window_LanguageHelp.prototype.clear = function () {
            this.setText("");
        };

        Window_LanguageHelp.prototype.setItem = function (value) {
            this.setText(args_Lan2c[value]);
        };

        Window_LanguageHelp.prototype.refresh = function () {
            this.contents.clear();
            this.drawTextEx(this._text, this.textPadding(), 0);
        };


        function Scene_InitialLanguage() {
            this.initialize.apply(this, arguments);
        }

        Scene_InitialLanguage.prototype = Object.create(Scene_MenuBase.prototype);
        Scene_InitialLanguage.prototype.constructor = Scene_InitialLanguage;

        Scene_InitialLanguage.prototype.initialize = function () {
            Scene_MenuBase.prototype.initialize.call(this);
        };

        Scene_InitialLanguage.prototype.create = function () {
            Scene_MenuBase.prototype.create.call(this);
            this.createLanguageSelectWindow();
            this.createHelpWindow();
        };

        Scene_InitialLanguage.prototype.createBackground = function () {
            this._background = new Sprite(ImageManager.loadPicture(args_InitLanSet["InitLan Images"]));
            this._background.x = 0;
            this._background.y = 0;
            this.addChild(this._background);
        };

        Scene_InitialLanguage.prototype.createLanguageSelectWindow = function () {
            this._langSelectWindow = new Window_LanguageSelect();
            this._langSelectWindow.x = Number(args_InitLanSet["InitLan SelectX"] || 283);
            this._langSelectWindow.y = Number(args_InitLanSet["InitLan SelectY"] || 250);
            this._langSelectWindow.setHandler("ok", this.onLangSetOk.bind(this));
            this.addWindow(this._langSelectWindow);
        };

        Scene_InitialLanguage.prototype.createHelpWindow = function () {
            this._langhelpWindow = new Window_LanguageHelp();
            this._langhelpWindow.x = Number(args_InitLanSet["InitLan HelpX"]);
            this._langhelpWindow.y = Number(args_InitLanSet["InitLan HelpY"]);
            this.addWindow(this._langhelpWindow);
        };

        Scene_InitialLanguage.prototype.update = function () {
            Scene_Base.prototype.update.call(this);
            this._lastSelect = this._langSelectWindow.index();
            this._langhelpWindow.setItem(this._lastSelect);
        };

        Scene_InitialLanguage.prototype.onLangSetOk = function () {
            let langset = args_Lan2a[this._langSelectWindow.index()]
            ConfigManager.language = this._langSelectWindow.index();
            ConfigManager.save();
            MulitLanguageArgs.setLangData(String(langset));
            this._langSelectWindow.close();
            this.fadeOutAll();
            SceneManager.goto(Scene_Title);
        };

        Window_Options.prototype.statusText = function (index) {
            var symbol = this.commandSymbol(index);
            var value = this.getConfigValue(symbol);
            if (this.isVolumeSymbol(symbol)) {
                return this.volumeStatusText(value);
            } else if (this.isLanguageSymbol(symbol)) {

                return this.langSymbol(value);
            } else {
                return this.booleanStatusText(value);
            }
        };

        Window_Options.prototype.isLanguageSymbol = function (symbol) {
            return symbol.contains('language');
        };

        Window_Options.prototype.langSymbol = function (value) {
            return args_Lan2b[value];
        }

        Window_Options.prototype.addGeneralOptions = function () {
            var args = NekoGakuen.MulitLanguage.Config_Lang.split(" ");
            var command = args.shift();
            if (command === "!Say" && MulitLanguageArgs.isLangDataText(String(args[0]))) {
                this.addCommand(MulitLanguageArgs.getLangDataText(String(args[0])), 'language');
            } else {
                this.addCommand(NekoGakuen.MulitLanguage.Config_Lang, 'language');
            }
            this.addCommand(TextManager.alwaysDash, 'alwaysDash');
            this.addCommand(TextManager.commandRemember, 'commandRemember');
        };

        Window_Options.prototype.processOk = function () {
            var index = this.index();
            var symbol = this.commandSymbol(index);
            var value = this.getConfigValue(symbol);
            if (this.isVolumeSymbol(symbol)) {
                value += this.volumeOffset();
                if (value > 100) {
                    value = 0;
                }
                value = value.clamp(0, 100);
                this.changeValue(symbol, value);
            } else if (this.isLanguageSymbol(symbol)) {
                value += this.langOffset();
                let config = args_Lan2a;
                if (value > config.length - 1) {
                    value = 0;
                }
                MulitLanguageArgs.setLangData(args_Lan2a[value]);
                this.changeValue(symbol, value);
            } else {
                this.changeValue(symbol, !value);
            }
        };

        Window_Options.prototype.langOffset = function () {
            return 1;
        }

        Window_Options.prototype.cursorLeft = function (wrap) {
            var index = this.index();
            var symbol = this.commandSymbol(index);
            var value = this.getConfigValue(symbol);
            if (this.isVolumeSymbol(symbol)) {
                value -= this.volumeOffset();
                value = value.clamp(0, 100);
                this.changeValue(symbol, value);
            } else if (this.isLanguageSymbol(symbol)) {
                value--;
                value = value.clamp(0, args_LanNameList.length);
                MulitLanguageArgs.setLangData(args_Lan2a[value]);
                this.changeValue(symbol, value);
            } else {
                this.changeValue(symbol, false);
            }
        };

        Window_Options.prototype.cursorRight = function (wrap) {
            var index = this.index();
            var symbol = this.commandSymbol(index);
            var value = this.getConfigValue(symbol);
            if (this.isVolumeSymbol(symbol)) {
                value += this.volumeOffset();
                value = value.clamp(0, 100);
                this.changeValue(symbol, value);
            } else if (this.isLanguageSymbol(symbol)) {
                value++;
                value = value.clamp(0, args_LanNameList.length);
                MulitLanguageArgs.setLangData(args_Lan2a[value]);
                this.changeValue(symbol, value);
            } else {
                this.changeValue(symbol, true);
            }
        };

        NekoGakuen.MulitLanguage._configManager_makeData = ConfigManager.makeData;
        ConfigManager.makeData = function () {
            var config = NekoGakuen.MulitLanguage._configManager_makeData.call(this);
            config.language = this.language;
            return config;
        };

        NekoGakuen.MulitLanguage._configManager_applyData = ConfigManager.applyData;
        ConfigManager.applyData = function (config) {
            NekoGakuen.MulitLanguage._configManager_applyData.call(this, config);
            this.language = this.readVolume(config, 'language');
            args_Lanindex = args_Lan2a[this.language];
        };

        ConfigManager.readVolume = function (config, name) {
            var value = config[name];
            if (name != 'language') {
                if (name in config) {
                    return Number(config[name]).clamp(0, 100);
                } else {
                    return 100;
                }
            } else {
                if (name in config) {
                    return Number(config[name]).clamp(0, args_LanNameList.length);
                } else {
                    return 0;
                }
            }
        };

        Game_System.prototype.mulitLangSET = function (lanargs) {
            ConfigManager.language = args_Lan2a.indexOf(lanargs);
            ConfigManager.save();
            MulitLanguageArgs.setLangData(String(lanargs));
        };

        Game_System.prototype.mulitLangCSV = function (csvargs) {
            $gameVariables.setValue(NekoGakuen.MulitLanguage.LancsvVar, args_Lancsv1a.indexOf(csvargs));
            MulitLanguageArgs.setCsvData(String(csvargs));
        };

        function MulitLanguageArgs() {
            throw new Error('This is a static class');
        }

        MulitLanguageArgs.setLangData = function (lanindex) {
            if (args_Lan2a[args_Lan2a.indexOf(lanindex)] != undefined) {
                args_Lanindex = args_Lan2a[args_Lan2a.indexOf(lanindex)];
            }
        }

        MulitLanguageArgs.setCsvData = function (csvindex) {
            args_Csvindex = args_Lancsv1b[args_Lancsv1a.indexOf(csvindex)];
            if (args_Csvindex != undefined) {
                request.open("GET", args_Csvindex, false);
                request.send(null);
                csvData = new Array();
                jsonObject = request.responseText.split(/\r\n|\r/);
                for (let i = 0; i < jsonObject.length; i++) {
                    csvData.push(jsonObject[i].split(','));
                }
            }
        }

        MulitLanguageArgs.isLangDataText = function (textArgs) {
            var idList = csvData.map(x => x[0]).indexOf(textArgs);
            return idList == -1 ? false : true;
        }

        MulitLanguageArgs.getLangDataText = function (textArgs) {
            let text = '';
            var idList = csvData.map(x => x[0]).indexOf(textArgs);
            var nameList = csvData["0"].indexOf(args_Lanindex);
            text = csvData[idList][nameList];
            text = text.replace(/^\"|\"$/g, '');
            return text;
        }
    })();
}
