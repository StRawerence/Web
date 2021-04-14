//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.27;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.27] [CoreEngine][翻譯版本:3]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Notetags
 * ============================================================================
 * === Actors ===
 * 可以在"插件參數"中調整參數限制，但這不會超出編輯器的限制來改變角色的初始或最大級別的值。
 * 取而代之的是，必須通過使用便籤來完成這項壯舉。
 * ------ ------ ------ ------ ------ ------
 * <Max Level: x>
 *
 * - 用於: Actor Notetags
 * - 將"x"替換為整數以確定角色的最大級別。
 * - 這使你可以超過數據庫限制99。
 * - 如果未使用此便簽標籤，則默認為參與者的數據庫值。
 * ------ ------ ------ ------ ------ ------
 * <Initial Level: x>
 *
 * - 用於: Actor Notetags
 * - 用整數替換'x'以確定角色的初始級別。
 * - 這使你可以超過數據庫限制99。
 * - 如果未使用此便簽標籤，則默認為參與者的數據庫值。
 * ------ ------ ------ ------ ------ ------
 * === Classes ===
 *
 * 由於使用notetag系統，現在角色級別可以超過99，
 * 因此你可能希望某些技能也可以在達到99以上的更高級別時學習。
 * ------ ------ ------ ------ ------ ------
 * <Learn At Level: x>
 *
 * - 用於: Class Skill Learn Notetags
 * - 將"x"替換為整數以確定本課程將學習相關技能的水平。
 * - 這使你可以超過數據庫限制99。
 * - 如果未使用此便簽標籤，則默認為該類的數據庫值。
 * ------ ------ ------ ------ ------ ------
 * === Enemies ===
 *
 * 現在給敵人等級。 這些關卡除了充當數字值的容器外，什麼也不做。
 * 這樣，可以在損壞公式（即a.atk-b.level）中使用等級，而不會引起任何錯誤。
 * 要給敵人等級，請使用下面的標籤。 這些便簽標籤還允許你調整數據庫參數之外的基本參數，EXP和Gold。
 * ------ ------ ------ ------ ------ ------
 * <Level: x>
 *
 * - 用於: Enemy Notetags
 * - 將"x"替換為整數以確定敵人的等級。
 * - 如果未聲明任何級別，則該級別將默認為1。
 * ------ ------ ------ ------ ------ ------
 * <param: x>
 *
 * - 用於: Enemy Notetags
 * - 將 'param' 替換為 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',or 'LUK' 確定要更改的參數。
 * - 將"x"替換為整數以設置敵人的"param"基本值。
 * - 這將覆蓋敵人的數據庫值，並且可能超出數據庫中的原始值限制。
 * - 如果不使用這些便簽，則默認為敵人的數據庫值。
 * ------ ------ ------ ------ ------ ------
 * <EXP: x>
 * <Gold: x>
 *
 * - 用於: Enemy Notetags
 * - 用整數替換"x"，以確定敵人的EXP或Gold值。
 * - 這將覆蓋敵人的數據庫值，並且可能超出數據庫中的原始值限制。
 * - 如果不使用這些便簽，則默認為敵人的數據庫值。
 * ------ ------ ------ ------ ------ ------
 * === Animations ===
 * ------ ------ ------ ------ ------ ------ 
 * <Head>
 * <Foot>
 * 
 * - 用於: Animation Name Tags
 * - 將動畫設置為固定在精靈的頂部（如果使用<Head>）或錨定在精靈的底部（如果使用<Foot>）。
 * ------ ------ ------ ------ ------ ------ 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - 用於: Animation Name Tags
 * - 將基於"x"和"y"值將動畫錨定在精靈內的特定點。
 * - 根據比率將"x"和"y"替換為代表其位置的數值，其中0.0為最左/上（分別為x，y）至1.0為最右/下（分別為x，y）。
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * ------ ------ ------ ------ ------ ------ 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - 用於: Animation Name Tags
 * - 將錨定動畫以精確數量的像素偏移。
 * - 此操作與編輯器相同，不同之處在於它允許你輸入大於999且小於-999的值。
 * - 將"x"和"y"替換為精確數值的像素值，以偏移動畫的x和y坐標。
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
  * ------ ------ ------ ------ ------ ------
 * === Quality of Life ===
 * ------ ------ ------ ------ ------ ------
 * <Minimum Encounter Steps: x>
 *
 * - 用於: Map Notetags
 * - 在玩家進入該地圖上的隨機遭遇之前，將"x"替換為最小步數。
 * - 如果未使用此便簽標籤，則地圖的最小遭遇步驟將默認為"生活質量設置"=>"遭遇最低比率"。
 * ------ ------ ------ ------ ------ ------
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - 用於: Map Notetags
 * - 將相應的便簽標籤用於你想要實現的功能。
 * - 如果未使用此便簽標籤，則地圖的最小遭遇步驟將默認為"生活質量設置"=>"無平鋪陰影"。
 * ------ ------ ------ ------ ------ ------
 * === Basic, X, and S Parameters ===
 * ------ ------ ------ ------ ------ ------
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 計算總計時，在"param"加值中加上或減去"x"。
 * - 將 'param' 替換為 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',or 'LUK' 確定要修改的參數。
 * - 將"x"替換為整數以調整參數的數量。
 * - 這用於在參數設置=>基本參數=>公式中計算"加"部分。
 * ------ ------ ------ ------ ------ ------
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 將"param"比率更改為"x"以更改總的"param"值。
 * - 將 'param' 替換為 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',or 'LUK' 確定要修改的參數。
 * - 用百分比（即150％）或比率（即1.5）替換"x"。
 * - 這用於在參數設置=>基本參數=>公式中計算"paramRate"部分。
 * ------ ------ ------ ------ ------ ------
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - 將 'param' 替換為 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',or 'LUK' 確定要修改的參數。
 * - 將"x"替換為整數以調整參數的數量。
 * - 這用於在參數設置=>基本參數=>公式中計算"flatBonus"部分。
 * ------ ------ ------ ------ ------ ------
 * <param Max: x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 將"param"的最大上限設置為"x"。 如果該設備有多個最大上限，則將選擇最高的上限。
 * - 將 'param' 替換為 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',or 'LUK' 確定要修改的參數。
 * - 將"x"替換為整數以確定最大上限。
 * ------ ------ ------ ------ ------ ------
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 計算總計時，在"xparam"加值上加上或減去"x"。
 * - 將'xparam'替換為 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT','HRG', 'MRG', 'TRG' 確定要修改的X參數。
 * - 用百分比（即150％）或比率（即1.5）替換"x"。
 * - 這用於在參數設置=> X參數=>公式中計算"加"部分。
 * ------ ------ ------ ------ ------ ------
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 將"param"速率更改為"x"以更改總的"xparam"值。
 * - 將'xparam'替換為 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT','HRG', 'MRG', 'TRG' 確定要修改的X參數。
 * - 用百分比（即150％）或比率（即1.5）替換"x"。
 * - 這用於在參數設置=> X參數=>公式中計算"paramRate"部分。
 * ------ ------ ------ ------ ------ ------
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 計算總計時，在"xparam"加值上加上或減去"x"。
 * - 將'xparam'替換為 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT','HRG', 'MRG', 'TRG' 確定要修改的X參數。
 * - 用百分比（即150％）或比率（即1.5）替換"x"。
 * - 這用於在參數設置=> X參數=>公式中計算"flatBonus"部分。
 * ------ ------ ------ ------ ------ ------
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 計算總計時，在"sparam"加值中加上或減去"x"。
 * - 將"sparam"替換為 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR','MDR', 'FDR', 'EXR' 確定要修改的S參數。
 * - 用百分比（即150％）或比率（即1.5）替換"x"。
 * - 這用於計算參數設置=> S參數=>公式中的"加"部分。
 * ------ ------ ------ ------ ------ ------
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - 將"sparam"替換為 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR','MDR', 'FDR', 'EXR' 確定要修改的S參數。
 * - 用百分比（即150％）或比率（即1.5）替換"x"。
 * - 這用於在參數設置=> S參數=>公式中計算"paramRate"部分。
 * ------ ------ ------ ------ ------ ------
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 計算總計時，在"sparam"加值中加上或減去"x"。
 * - 將"sparam"替換為 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR','MDR', 'FDR', 'EXR' 確定要修改的S參數。
 * - 用百分比（即150％）或比率（即1.5）替換"x"。
 * - 這用於在參數設置=> S參數=>公式中計算"flatBonus"部分。
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 * ------ ------ ------ ------ ------ ------
 * <JS param Plus: code>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.運行"code"以更改"param"加值。
 * - 將 'param' 替換為 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',or 'LUK' 確定要修改的參數。
 * - 用JavaScript代碼替換"code"，以確定為參數的總計算量更改正值的數量。
 * - 這用於在參數設置=>基本參數=>公式中計算"加"部分。
 * ------ ------ ------ ------ ------ ------
 * <JS param Rate: code>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 運行"code"以更改"param"費率值。
 * - 將 'param' 替換為 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',or 'LUK' 確定要修改的參數。
 * - 用JavaScript代碼替換"code"，以確定為參數的總計算更改參數率的數量。
 * - 這用於在參數設置=>基本參數=>公式中計算"paramRate"部分。
 * ------ ------ ------ ------ ------ ------
 * <JS param Flat: code>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 運行"code"以更改"param"固定值。
 * - 將 'param' 替換為 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',or 'LUK' 確定要修改的參數。
 * - 用JavaScript代碼替換"code"，以確定為參數的總計算更改單位固定金額的金額。
 * - 這用於在參數設置=>基本參數=>公式中計算"flatBonus"部分。
 * ------ ------ ------ ------ ------ ------
 * <JS param Max: code>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 運行"code"以確定"param"的最大上限。 如果該設備有多個最大上限，則選擇最高上限。
 * - 將 'param' 替換為 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',or 'LUK' 確定要修改的參數。
 * - 用JavaScript代碼替換"code"，以確定所需參數的最大上限。
 * ------ ------ ------ ------ ------ ------
 * <JS xparam Plus: code>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 運行"code"以更改"xparam"加值。
 * - 將'xparam'替換為 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT','HRG', 'MRG', 'TRG' 確定要修改的X參數。
 * - 用JavaScript代碼替換"code"，以確定為X參數的總計算更改正值的數量。
 * - 這用於在參數設置=> X參數=>公式中計算"加"部分。
 * ------ ------ ------ ------ ------ ------
 * <JS xparam Rate: code>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 運行"code"以更改"xparam"費率值。
 * - 將'xparam'替換為 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT','HRG', 'MRG', 'TRG' 確定要修改的X參數。
 * - 用JavaScript代碼替換"code"，以確定為X參數的總計算更改參數率的數量。
 * - 這用於在參數設置=> X參數=>公式中計算"paramRate"部分。
 * ------ ------ ------ ------ ------ ------
 * <JS xparam Flat: code>
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 運行"code"以更改"xparam"固定值。
 * - 將'xparam'替換為 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT','HRG', 'MRG', 'TRG' 確定要修改的X參數。
 * - 用JavaScript代碼替換"code"，以確定為X參數的總計算更改單位固定金額的金額。
 * - 這用於在參數設置=> X參數=>公式中計算"flatBonus"部分。
 * ------ ------ ------ ------ ------ ------
 * <JS sparam Plus: code>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 運行"code"以更改"sparam"加值。
 * - 將"sparam"替換為 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR','MDR', 'FDR', 'EXR' 確定要修改的S參數。
 * - 用JavaScript代碼替換"code"，以確定為S參數的總計算更改正值的數量。
 * - 這用於計算參數設置=> S參數=>公式中的"加"部分。
 * ------ ------ ------ ------ ------ ------
 * <JS sparam Rate: code>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 運行"code"以更改"sparam"費率值。
 * - 將"sparam"替換為 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR','MDR', 'FDR', 'EXR' 確定要修改的S參數。
 * - 用JavaScript代碼替換"code"，以確定為S參數的總計算更改參數速率量的大小。
 * - 這用於在參數設置=> S參數=>公式中計算"paramRate"部分。
 * ------ ------ ------ ------ ------ ------
 * <JS sparam Flat: code>
 *
 * - 用於: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - 運行"code"以更改"sparam"固定值。
 * - 將"sparam"替換為 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR','MDR', 'FDR', 'EXR' 確定要修改的S參數。
 * - 用JavaScript代碼替換"code"，以確定為S參數的總計計算更改單位固定金額的金額。
 * - 這用於在參數設置=> S參數=>公式中計算"flatBonus"部分。
 * ------ ------ ------ ------ ------ ------
 * === Battle Setting-Related Notetags ===
 * 
 * 無論戰鬥系統的正常設置如何，這些標籤都會更改戰鬥的設置。
 * 將這些標籤插入地圖的便箋盒或部隊名稱中，以使它們生效。
 * 如果兩者都存在於特定戰鬥中，則優先級將優先考慮在部隊名稱中找到的設置。
 * ------ ------ ------ ------ ------ ------ 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - 用於: Map Notetags and Troop Name Tags
 * - 將此特定地圖或戰鬥的戰鬥視角更改為前視圖。
 * - 確保在img/enemies/文件夾中有可用的敵方圖像文件，而不是"sv_enemies"圖形。
 * ------ ------ ------ ------ ------ ------ 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - 用於: Map Notetags and Troop Name Tags
 * - 將此特定地圖或戰鬥的戰鬥視角更改為側視圖。
 * - 確保在img/sv_enemies/文件夾中有可用的敵方圖像文件，而不是"enemies"圖形，它們將被使用。
 * - 確保你的角色已附加"sv_actor"圖形。
 * ------ ------ ------ ------ ------ ------ 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - 用於: Map Notetags and Troop Name Tags
 * - 將戰鬥系統更改為默認戰鬥系統（DTB）。
 * ------ ------ ------ ------ ------ ------ 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - 用於: Map Notetags and Troop Name Tags
 * - 如果為遊戲項目安裝了VisuMZ_2_BattleSystemATB，則將戰鬥系統更改為時間進度戰鬥系統（TPB）或主動轉彎戰鬥系統（ATB）。
 * ------ ------ ------ ------ ------ ------ 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - 用於: Map Notetags and Troop Name Tags
 * - 只要你在當前項目中安裝了那些插件，就將戰鬥系統更改為相應的戰鬥系統。
 * ------ ------ ------ ------ ------ ------
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the default battle system (DTB).
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags and Troop Name Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text 遊戲：打開URL
 * @desc 在遊戲中打開網站URL。
 *
 * @arg URL:str
 * @text URL
 * @desc 你想把玩家帶到哪裡？
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text 金錢：獲得/損失
 * @desc 允許您提供/獲得超過事件編輯器限制的更多金幣。
 *
 * @arg value:eval
 * @text 值
 * @desc 玩家應該獲得/損失多少金幣？
 * 使用負值以損失金幣。
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text 圖片：緩動類型
 * @desc 將緩動類型更改為多個選項。
 *
 * @arg pictureId:num
 * @text 圖片 ID
 * @type number
 * @min 1
 * @max 100
 * @desc 您希望將此緩動應用於哪張圖片？
 * @default 1
 *
 * @arg easingType:str
 * @text 緩動類型
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc 選擇您要應用的緩動類型。
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text 指示
 * @default 在"移動圖片"事件命令之後插入此
 *
 * @arg Instructions2
 * @text -
 * @default 插件命令。
 * 
 * @arg Instructions3
 * @text -
 * @default 在"移動圖片"事件中關閉"等待完
 *
 * @arg Instructions4
 * @text -
 * @default 成"。
 *
 * @arg Instructions5
 * @text -
 * @default 之後，您可能必須添加自己的"等
 *
 * @arg Instructions6
 * @text -
 * @default 待"事件命令。
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text 圖片: 全部刪除
 * @desc 刪除屏幕上的所有圖片，因為一個接一個地做起來非常繁瑣。
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text 圖片：擦除範圍
 * @desc 刪除一個數字範圍內的所有圖片，因為一個接一個地做起來非常繁瑣。
 *
 * @arg StartID:num
 * @text 起始 ID
 * @type number
 * @min 1
 * @max 100
 * @desc 要刪除的圖片的起始ID。
 * @default 1
 *
 * @arg EndingID:num
 * @text 結尾 ID
 * @type number
 * @min 1
 * @max 100
 * @desc 要刪除的圖片的結尾ID。
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text 屏幕晃動：自定義
 * @desc 創建自定義屏幕晃動效果，並將屏幕晃動的以下用法設置為此樣式。
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option 原始
 * @value original
 * @option 隨機
 * @value random
 * @option 水平
 * @value horizontal
 * @option 垂直
 * @value vertical
 * @desc 選擇震動樣式類型。
 * @default random
 *
 * @arg Power:num
 * @text 力度
 * @type number
 * @min 1
 * @max 9
 * @desc 震動的力度。
 * @default 5
 *
 * @arg Speed:num
 * @text 速度
 * @type number
 * @min 1
 * @max 9
 * @desc 震動的速度。
 * @default 5
 *
 * @arg Duration:eval
 * @text 時間
 * @desc 螢幕搖晃的持續時間。
 * 您也可以使用代碼。
 * @default 60
 *
 * @arg Wait:eval
 * @text 等待完成
 * @parent Duration:eval
 * @type boolean
 * @on 等待
 * @off 不等待
 * @desc 等到完成才繼續進行下一個活動？
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text 系統：戰鬥系統變更
 * @desc 在遊戲中切換到其他戰鬥系統。
 *
 * @arg option:str
 * @text 改成
 * @type select
 * @option 數據庫默認值（使用遊戲數據庫設置）
 * @value database
 * @option -
 * @value database
 * @option DTB: 默認回合戰
 * @value dtb
 * @option TPB Active: 時間進度戰役（即時）
 * @value tpb active
 * @option TPB Wait: 時間進度戰役（等待）
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (需要 VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (需要 VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (需要 VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (需要 VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (需要 VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc 選擇要切換到的戰鬥系統。
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text 系統：加載圖像
 * @desc 允許你提前加載圖像。
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text 系統：主字體大小
 * @desc 設置遊戲的主字體大小。
 *
 * @arg option:num
 * @text 改成
 * @type number
 * @min 1
 * @desc 將字體大小更改為此數字。
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text 系統：側面戰鬥
 * @desc 在前視圖或側視圖之間切換以進行戰鬥。
 *
 * @arg option:str
 * @text 改成
 * @type select
 * @option 正視
 * @value Front View
 * @option 側面
 * @value Side View
 * @option 切換
 * @value Toggle
 * @desc 選擇要切換到的視圖類型。
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text 系統：窗口間距(Padding)
 * @desc 更改遊戲的窗口間距。
 *
 * @arg option:num
 * @text 改成
 * @type number
 * @min 1
 * @desc 將遊戲的標準窗口填充更改為此值。
 * 預設: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text 生活品質設定
 * @type struct<QoLSettings>
 * @desc 開發人員和玩家的生活品質設置。
 * @default {"PlayTest":"","NewGameBoot:eval":"false","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text 戰鬥系統
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * @default database
 *
 * @param Color:struct
 * @text 顏色設定
 * @type struct<Color>
 * @desc 更改遊戲文字的顏色。
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text 金幣設定
 * @type struct<Gold>
 * @desc 更改金幣在遊戲中的運作方式和顯示。
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text 圖片載入
 * @type struct<ImgLoad>
 * @desc 在啟動遊戲時將加載的遊戲圖像。
 * 負責任地使用！！！
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text 鍵盤輸入
 * @type struct<KeyboardInput>
 * @desc 利用鍵盤輸入的遊戲設置。
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text 菜單背景設置
 * @type struct<MenuBg>
 * @desc 更改每個背景的菜單背景外觀。
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text 菜單按鈕輔助窗口
 * @type struct<ButtonAssist>
 * @desc 遊戲菜單中與"按鈕輔助"窗口有關的設置。
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text 菜單佈局設置
 * @type struct<MenuLayout>
 * @desc 更改每個場景的菜單佈局外觀。
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text 參數設定/圖示設定
 * @type struct<Param>
 * @desc 更改參數的限制以及它們的計算方式。
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text 自訂參數
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc 為你的遊戲創建自定義參數！
 * 這些將顯示在VisuStella MZ菜單中。
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenShake:struct
 * @text 屏幕抖動設置
 * @type struct<ScreenShake>
 * @desc 在遊戲中獲得更多的屏幕抖動效果！
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text 標題命令列表
 * @type struct<Command>[]
 * @desc 標題屏幕使用的窗口命令。
 * 在此處添加新命令。
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text 標題圖片按鈕
 * @type struct<TitlePictureButton>[]
 * @desc 可以插入標題屏幕的按鈕。
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI 設定
 * @type struct<UI>
 * @desc 更改遊戲中各種UI方面。
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text 視窗設定
 * @type struct<Window>
 * @desc 調整各種遊戲視窗設定。
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: 快速功能
 * @type struct<jsQuickFunc>[]
 * @desc 創建可從中獲得的快速JavaScript函數
 * 全局名稱空間。 請謹慎使用！！！
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text 遊戲測試模式
 *
 * @param NewGameBoot:eval
 * @text 啟動新遊戲
 * @parent PlayTest
 * @type boolean
 * @on 開始新遊戲
 * @off 保留標題畫面
 * @desc 在開始測試中自動開始新遊戲？
 * *僅在遊戲測試期間啟用。
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text 退出遊戲測試
 * @parent PlayTest
 * @type boolean
 * @on 取消遊戲測試
 * @off 保留遊戲測試
 * @desc 進行遊戲測試時，強制遊戲退出"遊戲測試"模式。
 * @default false
 *
 * @param OpenConsole:eval
 * @text 打開調試控制台
 * @parent PlayTest
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc 啟動遊戲後打開調試控制台嗎？
 * *僅在遊戲測試期間啟用。
 * @default true
 *
 * @param F6key:eval
 * @text F6: 音量切換
 * @parent PlayTest
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc F6鍵功能：將所有聲音在100％或0％兩者之間切換。
 * @default true
 *
 * @param F7key:eval
 * @text F7: 切換快速模式
 * @parent PlayTest
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc F7鍵功能：切換快速模式
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text 新遊戲 > 公共事件
 * @parent PlayTest
 * @type common_event
 * @desc 在遊戲測試期間啟動新遊戲時，運行該公共事件。
 * *雜項中有正常啟動新遊戲時的選項。
 * @default 0
 *
 * @param DigitGrouping
 * @text 數字分組
 *
 * @param DigitGroupingStandardText:eval
 * @text 標准文字
 * @parent DigitGrouping
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc 使數字1234567在視窗內的標准文本中看起來像1,234,567嗎？
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex文本
 * @parent DigitGrouping
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc 使數字1234567看起來像1,234,567，Ex文本是通過drawTextEx編寫的（例如消息）？
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text 傷害精靈
 * @parent DigitGrouping
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc 對於戰鬥中的傷害精靈，讓1234567之類的數字看起來像1,234,567嗎？
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text 量條精靈
 * @parent DigitGrouping
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc 對於像HP，MP和TP計量條這樣的可見量條精靈，讓1234567這樣的數字看起來像1,234,567嗎？
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text 國家/地區
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc 數字分組基於哪個國家/地區？
 * @default en-US
 *
 * @param PlayerBenefit
 * @text 利於玩家
 *
 * @param EncounterRateMinimum:num
 * @text 最低遇敵率
 * @parent PlayerBenefit
 * @min 0
 * @desc 玩家在沒有任何隨機遭遇的情況下可以採取的最小步數。
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text 總是逃跑
 * @parent PlayerBenefit
 * @type boolean
 * @on 總是
 * @off 預設
 * @desc 如果玩家想逃避戰鬥，讓他們有100％的機會逃脫戰鬥。
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text 精度公式
 * @parent PlayerBenefit
 * @type boolean
 * @on 更改
 * @off 預設
 * @desc 精度公式計算更改為"技能命中率%*（用戶命中率HIT-目標迴避率EVA）"，以獲得更好的結果。
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text 精度提升
 * @parent PlayerBenefit
 * @type boolean
 * @on 提升
 * @off 預設
 * @desc 提高玩家的命中率(HIT)和迴避率(EVA)。
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text 升等 -> HP完全恢復
 * @parent PlayerBenefit
 * @type boolean
 * @on 恢復
 * @off 預設
 * @desc 角色升級後恢復全部HP。
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text 升等 -> MP完全恢復
 * @parent PlayerBenefit
 * @type boolean
 * @on 恢復
 * @off 預設
 * @desc 角色升級後恢復全部MP。
 * @default true
 *
 * @param Misc
 * @text 雜項
 *
 * @param AntiZoomPictures:eval
 * @text 防變焦圖片
 * @parent Misc
 * @type boolean
 * @on 防變焦
 * @off 正常
 * @desc 如果啟用，則防止圖片受到縮放的影響。
 * @default true
 *
 * @param AutoStretch:str
 * @text 自動拉伸
 * @parent Misc
 * @type select
 * @option 預設
 * @value default
 * @option 拉伸
 * @value stretch
 * @option 正常
 * @value normal
 * @desc 自動拉伸遊戲以適應客戶端的大小？
 * @default default
 *
 * @param FontShadows:eval
 * @text 字體陰影
 * @parent Misc
 * @type boolean
 * @on 陰影
 * @off 輪廓
 * @desc 如果啟用，則文本使用陰影而不是輪廓。
 * @default false
 *
 * @param FontSmoothing:eval
 * @text 字體平滑
 * @parent Misc
 * @type boolean
 * @on 平滑
 * @off (無)
 * @desc 如果啟用，則平滑遊戲中顯示的字體。
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text 關鍵物品保護
 * @parent Misc
 * @type boolean
 * @on 不可售出
 * @off 可售出
 * @desc 如果啟用，則禁止出售和消費關鍵物品(Key Item)。
 * @default true
 *
 * @param ModernControls:eval
 * @text 現代控制
 * @parent Misc
 * @type boolean
 * @on 啟用
 * @off 預設
 * @desc 如果啟用，則允許使用"主頁/結束"按鈕以及其他現代配置。
 * *影響其他VisuStella插件。
 * @default true
 *
 * @param NewGameCommonEventAll:num
 * @text 新遊戲 > 公共事件
 * @parent Misc
 * @type common_event
 * @desc 每次啟動新遊戲時，都會運行該公共事件。
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text 沒有圖塊陰影
 * @parent Misc
 * @type boolean
 * @on 進用圖塊陰影
 * @off 預設
 * @desc 移除遊戲中顯示的圖塊陰影。
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text 像素圖像渲染
 * @parent Misc
 * @type boolean
 * @on 像素化
 * @off 平滑
 * @desc 如果啟用，則將圖像渲染像素化（用於像素遊戲）。
 * @default false
 *
 * @param RequireFocus:eval
 * @text 要求重點嗎？
 * @parent Misc
 * @type boolean
 * @on 要求
 * @off 不要求
 * @desc 需要遊戲專注嗎？如果遊戲沒有重點關注，那麼如果它不是活動窗口，它將暫停。
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text 智能事件碰撞
 * @parent Misc
 * @type boolean
 * @on 只限相同優先級
 * @off 預設
 * @desc 如果事件具有"與角色相同"的優先級，則使事件僅能夠相互衝突。
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text 基本顏色
 *
 * @param ColorNormal:str
 * @text 正常
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 0
 *
 * @param ColorSystem:str
 * @text 系統
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 16
 *
 * @param ColorCrisis:str
 * @text 危機
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 17
 *
 * @param ColorDeath:str
 * @text 死亡
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text 量條背景
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP 量條 1
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP 量條 2
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP 量條 1
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP 量條 2
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP 消耗
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text 能力提升
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text 能力降低
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT 量條 1
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT 量條 2
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP 量條 1
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP 量條 2
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP 消耗
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 29
 *
 * @param ColorPending:str
 * @text 等待處理的顏色
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP 量條 1
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP 量條 2
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv 量條 1
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv 量條 2
 * @parent BasicColors
 * @desc 使用#rrggbb作為自定義顏色，或使用常規數字作為"窗口外觀"中的文本顏色。
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha 顏色
 *
 * @param OutlineColor:str
 * @text 窗口字體輪廓
 * @parent AlphaColors
 * @desc 具有一點Alpha設置的顏色。
 * 格式 rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text 量表數字輪廓
 * @parent AlphaColors
 * @desc 具有一點Alpha設置的顏色。
 * 格式 rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text 昏暗的顏色 1
 * @parent AlphaColors
 * @desc 具有一點Alpha設置的顏色。
 * 格式 rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text 昏暗的顏色 2
 * @parent AlphaColors
 * @desc 具有一點Alpha設置的顏色。
 * 格式 rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text 物品背面顏色 1
 * @parent AlphaColors
 * @desc 具有一點Alpha設置的顏色。
 * 格式 rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text 物品背面顏色 2
 * @parent AlphaColors
 * @desc 具有一點Alpha設置的顏色。
 * 格式 rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text 有條件的顏色
 *
 * @param ActorHPColor:func
 * @text JS: 角色 HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: 角色 MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: 角色 TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: 參數變更
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: 傷害顏色
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text 金幣上限
 * @type num
 * @min 1
 * @desc 隊伍可以容納的最大黃金量。
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text 金幣字體大小
 * @type number
 * @min 1
 * @desc 顯示在金幣窗口中的字體大小。
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text 金幣 Icon
 * @desc 用於代表金幣的圖示。
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text 金幣超載
 * @desc 擁有太多的金幣使文本無法容納在窗口中。
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text 道具風格
 * @type boolean
 * @on 啟用
 * @off 正常
 * @desc true: [金幣圖示][金幣名稱][金幣數量]
 * false:[金幣數量][金幣圖示]
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc 你希望在啟動遊戲時從此目錄加載哪些文件？
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param 控制
 *
 * @param WASD:eval
 * @text WASD 移動
 * @parent Controls
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc 為你的遊戲項目啟用或禁用WASD移動。
 * 將原"W"功能調整為"E"。
 * @default false
 *
 * @param DashToggleR:eval
 * @text R 鍵: 跑步切換
 * @parent Controls
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc 啟用或禁用R鍵作為"總是跑步"選項切換。
 * @default false
 *
 * @param NameInput
 * @text 名稱輸入
 *
 * @param EnableNameInput:eval
 * @text 啟用?
 * @parent NameInput
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc 啟用鍵盤輸入以輸入名稱。
 * *僅用過英文鍵盤進行測試。
 * @default true
 * 
 * @param DefaultMode:str
 * @text 預設模式
 * @parent NameInput
 * @type select
 * @option 默認-使用箭頭鍵選擇字母。
 * @value default
 * @option 鍵盤-使用鍵盤輸入字母。
 * @value keyboard
 * @desc 進入場景時選擇默認模式。
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY 佈局
 * @parent NameInput
 * @type boolean
 * @on QWERTY 佈局
 * @off ABCDEF 佈局
 * @desc 使用QWERTY佈局進行手動輸入。
 * @default true
 *
 * @param NameInputMessage:eval
 * @text 鍵盤訊息
 * @parent NameInput
 * @type note
 * @desc 允許輸入鍵盤時顯示的消息。
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text 禁詞
 * @parent NameInput
 * @type string[]
 * @desc 玩家不能使用這些單詞來命名。
 * 這些名稱中包括單詞。
 * @default []
 *
 * @param NumberInput
 * @text 數字鍵輸入
 *
 * @param EnableNumberInput:eval
 * @text 啟用?
 * @parent NumberInput
 * @type boolean
 * @on 啟用
 * @off 禁用
 * @desc 啟用用於數字輸入的鍵盤輸入。
 * *僅用過英文鍵盤進行測試。
 * @default true
 *
 * @param ButtonAssist
 * @text 按鈕輔助
 * 
 * @param Keyboard:str
 * @text 切換至鍵盤
 * @parent ButtonAssist
 * @desc 用於描述鍵盤開關的文本。
 * @default Keyboard
 * 
 * @param Manual:str
 * @text 切換到手動
 * @parent ButtonAssist
 * @desc 用於描述手動輸入開關的文本。
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc 此場景的各個背景設置。
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshot不透明度
 * @type number
 * @min 0
 * @max 255
 * @desc 場景快照的不透明度。
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc 用於底部背景圖像的文件名。
 * 如果不想使用，請留空。
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc 用於上方背景圖片的文件名。
 * 如果不想使用，請留空。
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param 一般
 *
 * @param Enable:eval
 * @text 啟用
 * @parent General
 * @type boolean
 * @on 使用
 * @off 不使用
 * @desc 啟用菜單按鈕輔助窗口。
 * @default true
 *
 * @param Location:str
 * @text 位置
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc 確定按鈕輔助窗口的位置。
 * 需要 插件參數=> UI => 側面按鈕打開。
 * @default bottom
 *
 * @param BgType:num
 * @text 背景類型
 * @parent General
 * @type select
 * @option 0 - 視窗
 * @value 0
 * @option 1 - 漸變
 * @value 1
 * @option 2 - 透明
 * @value 2
 * @desc 選擇此窗口的背景類型。
 * @default 0
 *
 * @param 文本
 *
 * @param TextFmt:str
 * @text 文字格式
 * @parent Text
 * @desc格式化按鈕的顯示方式。
 * 允許輸入文本代碼。 ％1 - Key，％2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text 多鍵格式
 * @parent Text
 * @desc 具有多個鍵的操作的格式。
 * 允許輸入文本代碼。 ％1 - Key，％2 - Text
 * @default %1/%2
 *
 * @param OkText:str
 * @text 確認文字
 * @parent Text
 * @desc 用於顯示"確定"的默認文本。
 * 允許輸入文本代碼。
 * @default Select
 *
 * @param CancelText:str
 * @text 取消文字
 * @parent Text
 * @desc 用於顯示"取消"的默認文本。
 * 允許輸入文本代碼。
 * @default Back
 *
 * @param SwitchActorText:str
 * @text 切換角色文本
 * @parent Text
 * @desc 用於顯示"切換角色"的默認文本。
 * 允許輸入文本代碼。
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: 不公開格式
 * @parent Keys
 * @desc 如果下面沒有列出密鑰，請使用此格式。
 * 允許輸入文本代碼。 %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc 如何在遊戲中顯示此鍵。
 * 允許輸入文本代碼。
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc 調整標題場景的各種選項。
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc 調整標題場景的各種選項。
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc 調整標題場景的各種選項。
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text 顯示參數
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc 將在遊戲中顯示的參數列表。
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text 擴展參數
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc 擴展場景中顯示的列表（用於其他VisuStella插件）。
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text 基本參數
 *
 * @param CrisisRate:num
 * @text HP 危機狀態
 * @parent BasicParameters
 * @desc 戰鬥者的HP比率低於多少時進入危機狀態。
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: 公式
 * @parent BasicParameters
 * @type note
 * @desc 用於確定所有8個基本參數總值的公式: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text 參數上限
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text 角色
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP 上限
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP 上限
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK 上限
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF 上限
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT 上限
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF 上限
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI 上限
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK 上限
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text 敵人
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP 上限
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP 上限
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK 上限
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF 上限
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT 上限
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF 上限
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI 上限
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK 上限
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X 參數
 *
 * @param XParameterFormula:func
 * @text JS: 公式
 * @parent XParameters
 * @type note
 * @desc 用於確定所有10個X參數總值的公式: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text 詞彙
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text 命中率:HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text 迴避率:EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text 爆擊率:CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text 爆擊迴避率:CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text 魔法迴避率:MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text 魔法反射率:MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text 反擊率:CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HP再生率:HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MP再生率:MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TP再生率:TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S參數
 *
 * @param SParameterFormula:func
 * @text JS: 公式
 * @parent SParameters
 * @type note
 * @desc 用於確定所有10個S參數總值的公式: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text 詞彙
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text 目標率:TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text 防禦效果:GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text 恢復效果率:REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text 道具效果率:PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MP消耗率:MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TP回復率:TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text 物理傷害:PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text 魔法傷害:MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text 地形傷害:FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text 經驗值:EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text 圖示
 *
 * @param DrawIcons:eval
 * @text 繪製圖示?
 * @parent Icons
 * @type boolean
 * @on 繪製
 * @off 不繪製
 * @desc 在參數名稱旁邊繪製圖標？
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text 命中率:HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text 迴避率:EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text 爆擊率:CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text 爆擊迴避率:CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text 魔法迴避率:MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text 魔法反射率:MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text 反擊率:CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HP再生率:HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MP再生率:MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TP再生率:TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text 目標率:TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text 防禦效果率:GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text 恢復效果率:REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text 道具效果率:PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MP消耗率:MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TP恢復率:TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text 物理傷害:PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text 魔法傷害:MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text 地形傷害:FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text 經驗值:EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text 象徵
 * @desc 該命令使用的符號。
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc 用於此標題命令的顯示文本。
 * 如果它有一個值，請忽略JS：文本版本。
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc 用於確定顯示名稱所用字符串的JavaScript代碼。
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc 用於確定該項是否顯示的JavaScript代碼。
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc 用於確定該項是否啟用的JavaScript代碼。
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc 用於確定應添加的所有ext數據的JavaScript代碼。
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc 選擇此命令後運行的JavaScript代碼。
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text 圖片的文件名
 * @type file
 * @dir img/pictures/
 * @desc 圖片使用的文件名。
 * @default 
 *
 * @param ButtonURL:str
 * @text URL按鈕
 * @desc 單擊按鈕後要轉到的URL。
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: 位置
 * @type note
 * @desc 幫助確定按鈕位置的JavaScript代碼。
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: 載入中
 * @type note
 * @desc 加載此按鈕位圖後運行的JavaScript代碼。
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: 運行代碼
 * @type note
 * @desc 按下此按鈕後運行的JavaScript代碼。
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI區
 *
 * @param FadeSpeed:num
 * @text 淡入速度
 * @parent UIArea
 * @desc 過渡的默認淡入速度。
 * @default 24
 *
 * @param BoxMargin:num
 * @text 屏幕邊距
 * @parent UIArea
 * @type number
 * @min 0
 * @desc 設置屏幕邊框的邊距（以像素為單位）。
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text 命令窗口寬度
 * @parent UIArea
 * @type number
 * @min 1
 * @desc 設置標準命令窗口的寬度。
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text 底部幫助窗口
 * @parent UIArea
 * @type boolean
 * @on 底部
 * @off 頂部
 * @desc 將幫助窗口放在屏幕底部？
 * @default false
 *
 * @param RightMenus:eval
 * @text 右對齊菜單
 * @parent UIArea
 * @type boolean
 * @on 右
 * @off 左
 * @desc 將大多數命令窗口放在屏幕的右側。
 * @default true
 *
 * @param ShowButtons:eval
 * @text 顯示按鈕
 * @parent UIArea
 * @type boolean
 * @on 顯示
 * @off 隱藏
 * @desc 在遊戲中顯示可點擊的按鈕？
 * 這將影響所有按鈕。
 * @default true
 *
 * @param cancelShowButton:eval
 * @text 顯示取消按鈕
 * @parent ShowButtons:eval
 * @type boolean
 * @on 顯示
 * @off 隱藏
 * @desc 顯示取消按鈕？
 * 如果"顯示按鈕"為false，則將其隱藏。
 * @default true
 *
 * @param menuShowButton:eval
 * @text 顯示菜單按鈕
 * @parent ShowButtons:eval
 * @type boolean
 * @on 顯示
 * @off 隱藏
 * @desc 在地圖場景中顯示主菜單按鈕？
 * 如果“顯示按鈕”為false，則將其隱藏。
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text 顯示翻頁按鈕
 * @parent ShowButtons:eval
 * @type boolean
 * @on 顯示
 * @off 隱藏
 * @desc 顯示翻頁按鈕？
 * 如果“顯示按鈕”為false，則將其隱藏。
 * @default true
 *
 * @param numberShowButton:eval
 * @text 顯示數字按鈕
 * @parent ShowButtons:eval
 * @type boolean
 * @on 顯示
 * @off 隱藏
 * @desc 顯示數字調整按鈕？
 * 如果“顯示按鈕”為false，則將其隱藏。
 * @default true
 *
 * @param ButtonHeight:num
 * @text 按鈕區域高度
 * @parent UIArea
 * @type number
 * @min 1
 * @desc 設置按鈕區域的高度。
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text 底部按鈕
 * @parent UIArea
 * @type boolean
 * @on 底部
 * @off 頂部
 * @desc 將按鈕放在屏幕底部？
 * @default false
 *
 * @param SideButtons:eval
 * @text 側面按鈕
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc 如果有空間，在UI側面放置按鈕。
 * @default true
 *
 * @param LargerResolution
 * @text 更大的分辨率
 *
 * @param RepositionActors:eval
 * @text 重新定位演員
 * @parent LargerResolution
 * @type boolean
 * @on 重新定位
 * @off 保持原樣
 * @desc 如果屏幕分辨率已更改，請更新演員在戰鬥中的位置。
 * 忽略是否使用Battle Core。
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text 重新定位敵人
 * @parent LargerResolution
 * @type boolean
 * @on 重新定位
 * @off 保持原樣
 * @desc 如果屏幕分辨率已更改，請更新敵人在戰鬥中的位置。
 * @default true
 *
 * @param MenuObjects
 * @text 菜單對象
 *
 * @param LvExpGauge:eval
 * @text 等級-> EXP量條
 * @parent MenuObjects
 * @type boolean
 * @on 繪製量條
 * @off 保持原樣
 * @desc 在角色等級下繪製一個EXP量條。
 * @default true
 *
 * @param ParamArrow:str
 * @text 參數箭頭
 * @parent MenuObjects
 * @desc 用於顯示參數值更改的箭頭。
 * @default →
 *
 * @param TextCodeSupport
 * @text 文字代碼支援
 *
 * @param TextCodeClassNames:eval
 * @text 職業名稱
 * @parent TextCodeSupport
 * @type boolean
 * @on 支援文本代碼
 * @off 普通文字
 * @desc 使職業名稱支援文本代碼？
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text 稱號
 * @parent TextCodeSupport
 * @type boolean
 * @on 支援文本代碼
 * @off 普通文字
 * @desc 使稱號支援文本代碼？
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text 預設
 *
 * @param EnableMasking:eval
 * @text 啟用遮罩
 * @parent WindowDefaults
 * @type boolean
 * @on 遮罩開啟
 * @off 遮罩關閉
 * @desc 啟用窗口遮罩（窗口將其他窗口隱藏在它們後面）？ 
 * 警告：開啟它可能會使數據模糊。
 * @default false
 *
 * @param LineHeight:num
 * @text 行高
 * @parent WindowDefaults
 * @desc 用於標準窗口的默認行高。
 * 預設: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text 項目外框距離(Padding)
 * @parent WindowDefaults
 * @desc 用於標準窗口的默認外框距離。
 * 預設: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text 背面不透明
 * @parent WindowDefaults
 * @desc 用於標準窗口的默認背面不透明。
 * 預設: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text 半透明的不透明度
 * @parent WindowDefaults
 * @desc 用於標準窗口的默認半透明不透明度。
 * 預設: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text 開窗速度
 * @parent WindowDefaults
 * @desc 用於標準窗口的默認打開速度。
 * 預設: 32 (使用0-255之間的數字)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text 列間距
 * @parent WindowDefaults
 * @desc 可選窗口的默認列間距。
 * 預設: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text 行間距
 * @parent WindowDefaults
 * @desc 可選窗口的默認行間距。
 * 預設: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text 可選項目
 *
 * @param ShowItemBackground:eval
 * @text 顯示背景？
 * @parent SelectableItems
 * @type boolean
 * @on 顯示背景
 * @off 不顯示背景
 * @desc 可選菜單項後面有黑框。顯示他們？
 * @default true
 *
 * @param ItemHeight:num
 * @text 項目高度間距(Padding)
 * @parent SelectableItems
 * @desc 可選項目的默認高度間距。
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: 繪製背景
 * @parent SelectableItems
 * @type note
 * @desc 用於在可單擊菜單對像後面繪製背景矩形的代碼。
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text 函數名稱
 * @desc 全局名稱空間中的函數名稱。
 * 不會覆蓋相同名稱的函數/變量。
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: 代碼
 * @type note
 * @desc 使用此功能時，請運行此代碼。
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text 默認樣式
 * @type select
 * @option 原始
 * @value original
 * @option 隨機
 * @value random
 * @option 水平
 * @value horizontal
 * @option 垂直
 * @value vertical
 * @desc 用於屏幕搖晃的默認樣式。
 * @default random
 *
 * @param originalJS:func
 * @text JS: 原始模式
 * @type note
 * @desc 此代碼使您可以控制此屏幕抖動樣式的屏幕抖動。
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: 隨機模式
 * @type note
 * @desc 此代碼使您可以控制此屏幕抖動樣式的屏幕抖動。
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: 水平模式
 * @type note
 * @desc 此代碼使您可以控制此屏幕抖動樣式的屏幕抖動。
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: 垂直模式
 * @type note
 * @desc 此代碼使您可以控制此屏幕抖動樣式的屏幕抖動。
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text 參數名稱
 * @desc 參數的名稱是什麼？
 * 用於VisuStella MZ菜單。
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text 縮寫
 * @parent ParamName:str
 * @desc 您要為參數使用什麼縮寫？
 * 不要使用特殊字符。 如果可能，請避免使用數字。
 * @default unt
 *
 * @param Icon:num
 * @text 圖示
 * @parent ParamName:str
 * @desc 您要使用什麼圖標來表示該參數？
 * 用於VisuStella MZ菜單。
 * @default 160
 *
 * @param Type:str
 * @text 類型
 * @parent ParamName:str
 * @type select
 * @option 整數（僅整數）
 * @value integer
 * @option 浮點數（允許小數）
 * @value float
 * @desc 此參數將返回哪種數字值？
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: 值
 * @type note
 * @desc 要返回此參數時，請運行此代碼。
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
//=============================================================================

const _0x115d=['isOpen','show','NUMPAD7','TGR','style','crisisColor','applyCoreEasing','buttonAssistText%1','setWindowPadding','systemColor','NUMPAD0','buttonAssistOk','ColorTPGauge2','pendingColor','animationShouldMirror','WIN_ICO_HELP','visible','PLAY','hpColor','mainAreaHeight','createCancelButton','createCustomParameter','makeFontSmaller','xparamRate','initialize','processKeyboardBackspace','buttonAssistOffset3','_customModified','EQUALS','XParamVocab5','displayY','mirror','F6key','Control\x20Variables\x20Script\x20Error','BgFilename2','en-US','sparamPlus1','STB','Scene_Name_create','Power','focus','INQUART','createFauxAnimation','setMoveEasingType','processSoundTimings','IconParam0','Linear','outbounce','innerWidth','_defaultStretchMode','DummyBgType','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','catchLoadError','transform','charCode','CrisisRate','Bitmap_drawTextOutline','createTitleButtons','_slotWindow','paramBase','isActiveTpb','startAnimation','SParamVocab8','CustomParamAbb','END','eva','ShopMenu','mainAreaHeightSideButtonLayout','CTB','_statusParamsWindow','CategoryRect','ASTERISK','xScrollLinkedOffset','itemHeight','AccuracyBoost','setAction','successRate','animationNextDelay','ColorCTGauge2','hit','initCoreEngineScreenShake','_shouldPreventDefault','setupCoreEngine','statusEquipWindowRect','requestFauxAnimation','process_VisuMZ_CoreEngine_Settings','Scene_Map_createMenuButton','sparamFlat2','center','clearRect','enemies','\x5c}❪SHIFT❫\x5c{','HANJA','ALT','inbounce','Window_NameInput_processHandling','ModernControls','sparamRate','Graphics_printError','RightMenus','buttonAssistOffset%1','removeAllFauxAnimations','createButtonAssistWindow','setHandler','animationBaseDelay','DocumentTitleFmt','_createInternalTextures','_scene','processKeyboardDigitChange','Symbol','SLASH','updateDocumentTitle','Tilemap_addShadow','DOUBLE_QUOTE','RevertPreserveNumbers','FontShadows','NameInputMessage','repositionEnemiesByResolution','atbActive','WIN_OEM_FJ_LOYA','anchor','stencilOp','_forcedTroopView','_changingClass','targetScaleX','WIN_ICO_CLEAR','EQUAL','enable','WindowLayer_render','encounterStepsMinimum','Input_update','maxLvGaugeColor1','process_VisuMZ_CoreEngine_Functions','_inputWindow','calcEasing','Plus2','Sprite_Gauge_currentValue','playOk','_onKeyDown','Settings','Window_NameInput_cursorDown','windowPadding','16aRKSTp','makeCommandList','xparamFlatJS','initialLevel','StatusMenu','horzJS','createJsQuickFunction','IconXParam6','updatePositionCoreEngine','BgType','xparamRate1','_hideButtons','_addShadow','ButtonFadeSpeed','Enemy','setSize','<JS\x20%1\x20%2:[\x20](.*)>','CRI','Game_System_initialize','refreshDimmerBitmap','create','toLocaleString','FTB','colSpacing','setCoreEngineUpdateWindowBg','result','paramRate1','targetObjects','CustomParam','targetEvaRate','titles2','FadeSpeed','isOptionValid','INELASTIC','changeTextColor','targetContentsOpacity','menuShowButton','skills','IconSParam6','processCursorHomeEndTrigger','max','TextFmt','ColSpacing','drawActorLevel','SideButtons','characters','isSideView','SParamVocab6','canUse','stencilFunc','mainAreaTop','vertJS','BottomButtons','isArrowPressed','retrieveFauxAnimation','CustomParamIcons','getColor','Show\x20Scrolling\x20Text\x20Script\x20Error','Total','IconParam5','INOUTQUAD','F7key','Graphics_defaultStretchMode','pagedownShowButton','setCoreEngineScreenShakeStyle','HIT','_registerKeyInput','catchUnknownError','Window_NameInput_cursorPagedown','cancelShowButton','stringKeyMap','ShowButtons','isBottomHelpMode','applyForcedGameTroopSettingsCoreEngine','PictureEasingType','GoldOverlap','isNormalPriority','isUseModernControls','drawSegment','targetY','PIPE','param','EXECUTE','ENTER_SPECIAL','useDigitGroupingEx','isMapScrollLinked','Scene_Map_createSpriteset','ESC','DigitGroupingGaugeSprites','TPB\x20WAIT','drawGameVersion','Game_Actor_changeClass','DigitGroupingExText','Sprite_Actor_setActorHome','currentClass','ParamName','GoldFontSize','blendFunc','makeDocumentTitle','335aMQwJG','adjustPictureAntiZoom','Spriteset_Base_updatePosition','Scene_Shop_create','NUMPAD5','CreateBattleSystemID','Flat1','SceneManager_onKeyDown','NumberRect','Window_Base_drawFace','Game_Action_itemEva','sv_enemies','IconSet','_cache','RequireFocus','STENCIL_TEST','TimeProgress','NONCONVERT','addWindow','OPEN_PAREN','Gold','Window_StatusBase_drawActorSimpleStatus','SEMICOLON','buttonAssistKey2','ActorBgType','_stored_tpCostColor','TextJS','Scene_Equip_create','_drawTextOutline','child_process','NewGameCommonEvent','COLON','QUOTE','INQUINT','smoothSelect','GRD','_blank','calcCoreEasing','clearCachedKeys','reduce','CLOSE_BRACKET','ParseWeaponNotetags','NUM_LOCK','initialBattleSystem','ARRAYEVAL','_stored_tpGaugeColor1','ARRAYSTR','Window_NumberInput_start','_pagedownButton','TextCodeNicknames','GetParamIcon','requestMotion','isHandled','targetSpritePosition','vertical','ALTGR','paramPlus','VOLUME_UP','CancelText','Window_Base_initialize','helpAreaTopSideButtonLayout','TRG','IconSParam3','IconXParam8','drawNewParam','ShowItemBackground','CTRL','layoutSettings','Scene_Boot_onDatabaseLoaded','Game_Action_updateLastTarget','updatePlayTestF7','seVolume','setSideButtonLayout','LvExpGauge','processCursorMoveModernControls','paramX','terms','_backgroundSprite','_effectsContainer','itemBackColor2','originalJS','NUMPAD2','fillText','isExpGaugeDrawn','CustomParamNames','MAXMP','save','tpCostColor','SParamVocab9','FINAL','Window_NameInput_cursorPageup','Game_Picture_calcEasing','targetX','Scene_MenuBase_helpAreaTop','STRUCT','isFullDocumentTitle','BaseTexture','F20','levelUpRecovery','MDR','processDigitChange','drawCurrentParam','_goldWindow','setSideView','lineHeight','encounterStep','OpenSpeed','_stored_mpGaugeColor2','performMiss','parse','filters','Window_Base_update','itemHitImprovedAccuracy','addLoadListener','ItemHeight','F16','updatePositionCoreEngineShakeHorz','Window_NumberInput_processDigitChange','Game_Troop_setup','_onKeyPress','_shakeDuration','battlebacks2','performEscape','Version','CategoryBgType','exit','renderNoMask','HELP','Bitmap_clearRect','xparamPlus2','opacity','_paramPlus','Game_Picture_move','learnings','ZERO','shift','updateMainMultiply','EXCLAMATION','adjustSprite','_stored_systemColor','padding','remove','cancel','DigitGroupingLocale','_playTestFastMode','helpAreaTop','LESS_THAN','isBottomButtonMode','onEscapeSuccess','Scene_Status_create','getCombinedScrollingText','_playtestF7Looping','keyboard','registerCommand','getInputButtonString','onButtonImageLoad','EnableNameInput','Window_Selectable_cursorUp','WIN_OEM_FJ_TOUROKU','ConvertParams','PRESERVCONVERSION(%1)','sv_actors','isMaxLevel','Sprite_Button_initialize','DOLLAR','ARRAYNUM','fadeSpeed','command111','Window_NameInput_processTouch','mainAreaTopSideButtonLayout','1MfDulv','helpWindowRect','BackOpacity','ColorSystem','Bitmap_blt','xparamFlat1','pagedown','Game_BattlerBase_initMembers','isKeyItem','getColorDataFromPluginParameters','drawParamText','Input_setupEventHandlers','processKeyboardHandling','ParseSkillNotetags','DisplayedParams','select','onMoveEnd','CallHandlerJS','updatePadding','resize','Bitmap_drawCircle','EXSEL','skillId','sparamRateJS','updateFauxAnimations','Window_Gold_refresh','TAB','_coreEasingType','DashToggleR','ACCEPT','evaded','onKeyDownKeysF6F7','_buttonType','skillTypeWindowRect','setAttack','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','openness','ColorPowerDown','createPageButtons','GoldMax','_hp','loadSystem','process_VisuMZ_CoreEngine_Notetags','commandWindowRect','Scene_Menu_create','0.00','active','_repositioned','setSkill','CustomParamType','mainCommandWidth','BACKSPACE','pictures','_cacheScaleY','Script\x20Call\x20Error','Game_Event_isCollidedWithEvents','Window_NameInput_refresh','Window_Selectable_drawBackgroundRect','F21','makeFontBigger','openingSpeed','mainAreaBottom','sparamPlus','applyEasing','blockWidth','hideButtonFromView','gameTitle','ONE_MINUS_SRC_ALPHA','command122','buttonAssistText1','contentsBack','FunctionName','keyCode','itypeId','_movementWholeDuration','Window_NameInput_cursorUp','goldWindowRect','toString','DigitGroupingStandardText','_menuButton','makeInputButtonString','paramMaxJS','OUTQUINT','makeTargetSprites','loadPicture','Subtitle','QoL','targetScaleY','drawBackgroundRect','maxLvGaugeColor2','filter','drawActorClass','mmp','Spriteset_Base_destroy','EnableMasking','CommandBgType','checkCacheKey','Rate2','reserveCommonEvent','createEnemies','isDying','render','up2','isSmartEventCollisionOn','clamp','_categoryWindow','SPACE','evaluate','jsQuickFunc','HOME','sparamRate1','OS_KEY','COMMA','playTestF7','updatePositionCoreEngineShakeVert','ProfileRect','WIN_OEM_BACKTAB','command357','ActorHPColor','Game_Interpreter_command105','LineHeight','MAX_SAFE_INTEGER','ColorMaxLvGauge2','URL','AutoStretch','IconParam1','itemPadding','Type','gradientFillRect','updateKeyText','XParamVocab8','_closing','defineProperty','sparamFlat1','tpColor','INSERT','SaveMenu','bgs','includes','_pictureContainer','ProfileBgType','name','onClick','RepositionEnemies','F17','OPEN_CURLY_BRACKET','cursorPageup','push','clearStencil','WIN_OEM_PA2','(\x5cd+\x5c.?\x5cd+)>','QUESTION_MARK','title','isBusy','TranslucentOpacity','profileWindowRect','DEF','eventsXyNt','keyRepeatWait','image-rendering','updateOpacity','buttonAssistText3','endAnimation','ValueJS','command355','REC','moveRelativeToResolutionChange','paramRateJS','_commandWindow','INCIRC','resetBattleSystem','isSpecialCode','buttonAssistKey4','Game_Screen_initialize','SmartEventCollisionPriority','enableDigitGroupingEx','SellBgType','centerSprite','reserveNewGameCommonEvent','paramValueByName','removeFauxAnimation','F10','processBack','asin','ColorMPGauge1','CNT','reservePlayTestNewGameCommonEvent','SystemSetBattleSystem','setActionState','JUNJA','moveMenuButtonSideButtonLayout','_actor','isMVAnimation','_helpWindow','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','Scene_MenuBase_createPageButtons','ColorCTGauge1','isOpenAndActive','MAT','OUTQUART','processAlwaysEscape','dashToggle','changeClass','drawGameSubtitle','params','setGuard','mute','darwin','call','buttonAssistOffset1','length','ActorRect','scale','setMute','Wait','VisuMZ_2_BattleSystemSTB','contains','_itemWindow','SParamVocab7','animationId','OptionsMenu','WIN_OEM_CUSEL','mhp','getLastPluginCommandInterpreter','runCombinedScrollingTextAsCode','isInputting','StatusRect','keyMapper','LINEAR','onInputOk','1462ZVOpIH','paramY','processTimingData','makeDeepCopy','Abbreviation','_offsetY','Game_Map_setup','ItemBgType','isCursorMovable','_internalTextures','Icon','isTouchedInsideFrame','makeCoreEngineCommandList','actorWindowRect','([\x5c+\x5c-]\x5cd+)([%％])>','expRate','INOUTCIRC','ParseClassNotetags','actor','Bitmap_fillRect','Sprite_Picture_updateOrigin','drawItem','cos','toLowerCase','IconParam6','itemWindowRect','hide','IconParam3','ParseAllNotetags','Window_Base_createTextState','editWindowRect','consumeItem','_list','index','ctGaugeColor2','Sprite_AnimationMV_processTimingData','DataManager_setupNewGame','_fauxAnimationQueue','Untitled','playTestF6','LoadMenu','showDevTools','Key%1','CEV','ParseStateNotetags','iconWidth','setBackgroundOpacity','drawGauge','ItemStyle','repeat','onKeyDown','ExtJS','CLOSE_CURLY_BRACKET','buttonAssistCancel','advanced','getInputMultiButtonStrings','FDR','setMainFontSize','isItem','updateEffekseer','CommandWidth','createChildSprite','HelpBgType','process_VisuMZ_CoreEngine_jsQuickFunctions','_mapNameWindow','shake','drawRightArrow','_profileWindow','sparamPlusJS','MRG','F23','isSideButtonLayout','picture','areButtonsOutsideMainUI','isPhysical','_coreEasing','Sprite_Button_updateOpacity','Game_Picture_x','_centerElement','buttonY','EndingID','103DJiQUr','OnLoadJS','KEEP','INQUAD','boxWidth','measureTextWidth','horizontal','battlebacks1','RepositionActors','Window_NameInput_initialize','Window_Selectable_processCursorMove','ShowJS','MIN_SAFE_INTEGER','INSINE','tab','maxLevel','startAutoNewGame','paramWidth','sparam','_hideTileShadows','Sprite_Battler_startMove','OUTCUBIC','paramName','setAnchor','isRightInputMode','EXR','EVA','loadBitmap','Layer','DigitGroupingDamageSprites','WIN_OEM_ATTN','GoldIcon','buttonAssistText5','IconSParam8','_encounterCount','subject','buttonAssistSwitch','easingType','down','IconSParam0','popScene','pictureButtons','EquipMenu','_isButtonHidden','doesNameContainBannedWords','resetFontSettings','_actorWindow','playEscape','paramBaseAboveLevel99','F15','IconSParam5','mainFontSize','targetBackOpacity','isAnimationForEach','_colorCache','Flat','destroyCoreEngineMarkedBitmaps','IconXParam4','currencyUnit','PictureEraseAll','Game_Interpreter_PluginCommand','updateOpen','processMoveCommand','Plus','isItemStyle','isPlaytest','Bitmap_strokeRect','SLEEP','drawFace','TCR','parseForcedGameTroopSettingsCoreEngine','playCursorSound','Sprite_Gauge_gaugeRate','initVisuMZCoreEngine','DTB','tpGaugeColor2','PHA','attackSkillId','initDigitGrouping','5439tflBrt','Enable','helpAreaHeight','ImprovedAccuracySystem','openURL','VisuMZ_2_BattleSystemBTB','meVolume','processFauxAnimationRequests','_listWindow','WIN_OEM_ENLW','Scene_Battle_createSpriteset','NewGameCommonEventAll','LEFT','ctrlKey','XParameterFormula','ItemBackColor1','INOUTQUINT','_digitGrouping','background','updateCoreEasing','_baseTexture','faceHeight','ONE','_forcedBattleSys','getButtonAssistLocation','buttonAssistWindowRect','OUTQUAD','_targetOffsetY','EnableJS','sparamPlus2','XParamVocab9','CoreEngine','setupCoreEasing','startMove','option','NumberBgType','updateMain','getBackgroundOpacity','toUpperCase','Scene_Item_create','_backSprite1','subjectHitRate','optSideView','processKeyboardDelete','abs','Scene_GameEnd_createBackground','XParamVocab1','ParseActorNotetags','isMenuButtonAssistEnabled','processTouch','_screenY','cursorRight','showFauxAnimations','parallaxes','CodeJS','isClosed','statusWindowRect','textColor','Color','outlineColorDmg','setEasingType','VisuMZ_1_OptionsCore','4088qBAELv','erasePicture','Window_EquipItem_isEnabled','text','ColorMPGauge2','Rate1','hpGaugeColor2','createCustomBackgroundImages','ColorTPCost','makeAutoBattleActions','gaugeRate','ColorHPGauge2','SCALE_MODES','Plus1','buttonAssistWindowButtonRect','MenuBg','TextCodeClassNames','_stored_hpGaugeColor1','loadWindowskin','buttonAssistKey3','Game_Character_processMoveCommand','_stored_mpCostColor','movePageButtonSideButtonLayout','EditBgType','ParseEnemyNotetags','DummyRect','anchorCoreEasing','playCursor','allowShiftScrolling','height','isActor','isFauxAnimationPlaying','areTileShadowsHidden','drawText','currentValue','createFauxAnimationQueue','KeyTAB','nw.gui','dimColor1','pageup','valueOutlineColor','ParseTilesetNotetags','WIN_OEM_FJ_JISHO','drawActorNickname','<%1\x20%2:[\x20]','PGDN','animations','Window_NameInput_cursorLeft','buttonAssistKey5','default','titles1','ParamArrow','REPLACE','DIVIDE','Game_Picture_show','loadSystemImages','isRepeated','markCoreEngineModified','Window_Selectable_processTouch','SUBTRACT','SystemSetSideView','([\x5c+\x5c-]\x5cd+)>','trim','Bitmap_measureTextWidth','destroy','_realScale','down2','TPB\x20ACTIVE','setLastPluginCommandInterpreter','itemLineRect','normalColor','Game_Interpreter_command122','contents','isAlive','dummyWindowRect','catchException','setupValueFont','Scene_Battle_createCancelButton','LevelUpFullMp','WASD','Scene_Map_updateScene','setTargetAnchor','MEV','drawCharacter','buttonAssistOffset5','WIN_OEM_RESET','_data','TRAIT_PARAM','nickname','XParamVocab0','inBattle','_bitmap','Scene_Map_updateMainMultiply','Window','canEquip','Graphics_centerElement','BlurFilter','maxItems','GoldRect','Game_Interpreter_command111','buttonAssistKey%1','buttonAssistKey1','#%1','1412230mYxEwi','_buttonAssistWindow','sparamRate2','ATTN','_stored_deathColor','IconSParam2','rightArrowWidth','Scene_MenuBase_mainAreaHeight','move','listWindowRect','ShowDevTools','guardSkillId','sellWindowRect','left','DECIMAL','SEPARATOR','(\x5cd+)>','_cancelButton','SlotRect','OkText','subtitle','IconXParam3','pow','PDR','refresh','INCUBIC','SParamVocab3','_buyWindow','Input_onKeyDown','alwaysDash','numActions','FontSize','clearForcedGameTroopSettingsCoreEngine','rowSpacing','processTouchModernControls','round','faceWidth','Conditional\x20Branch\x20Script\x20Error','gainGold','Window_ShopSell_isEnabled','drawActorExpGauge','ColorMaxLvGauge1','ALWAYS','createDimmerSprite','DamageColor','bitmapWidth','setActorHome','catchNormalError','faces','Spriteset_Base_update','updateScene','VisuMZ_2_BattleSystemCTB','getBattleSystem','MDF','OUTEXPO','fillRect','maxCols','Manual','Bitmap_resize','match','Duration','width','description','CommandRect','expGaugeColor1','_shakeSpeed','KeyItemProtect','initMembers','Scene_MenuBase_mainAreaTop','bgmVolume','iconHeight','_isWindow','setBattleSystem','_statusWindow','volume','open','ColorHPGauge1','updateTransform','end','createBackground','OUTSINE','_setupEventHandlers','sin','prototype','repositionCancelButtonSideButtonLayout','min','NUMPAD3','setup','_targetOffsetX','_fauxAnimationSprites','_drawTextShadow','isWindowMaskingEnabled','HRG','getLevel','Window_Base_drawCharacter','_clickHandler','forceOutOfPlaytest','4179kQEwox','_backSprite2','F19','mpCostColor','GameEnd','processCursorMove','buttonAssistOffset2','VOLUME_MUTE','split','Scene_Unlisted','system','resetTextColor','_cacheScaleX','_stored_crisisColor','snapForBackground','OPEN_BRACKET','OutlineColor','drawIconBySize','updateDashToggle','targetOpacity','ListRect','initCoreEngine','_inputString','PRINT','IconParam4','Title','NUMPAD4','buyWindowRect','Param','\x5c}❪TAB❫\x5c{','HelpRect','Game_BattlerBase_refresh','Bitmap_gradientFillRect','XParamVocab7','SParameterFormula','ButtonAssist','Scene_Boot_startNormalGame','categoryWindowRect','loadGameImagesCoreEngine','setBackgroundType','duration','createFauxAnimationSprite','outlineColorGauge','cursorDown','_storedStack','Sprite_Animation_processSoundTimings','ParseItemNotetags','_sellWindow','constructor','blt','bitmap','BgFilename1','_optionsWindow','SellRect','QwertyLayout','playMiss','updateLastTarget','drawGameTitle','_duration','MCR','replace','checkSmartEventCollision','floor','Window_Base_drawText','_animation','missed','start','StatusBgType','_CoreEngineSettings','ColorManager_loadWindowskin','RegExp','paramPlusJS','PreserveNumbers','Speed','OptionsRect','isEnabled','slice','_windowLayer','getCoreEngineScreenShakeStyle','DimColor2','KeySHIFT','STENCIL_BUFFER_BIT','translucentOpacity','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_moveEasingType','_movementDuration','sparamFlatJS','flush','boxHeight','ColorPowerUp','top','backgroundBitmap','_isPlaytest','toFixed','maxBattleMembers','F22','mev','addCommand','skipBranch','wait','updateMove','updateBackOpacity','xparam','AGI','altKey','createBuffer','Max','SceneManager_isGameActive','SceneManager_initialize','terminate','tilesets','OutlineColorGauge','CONTEXT_MENU','F14','BattleManager_processEscape','GroupDigits','key%1','_gamepadWait','Rate','areButtonsHidden','createMenuButton','drawCircle','Scene_MenuBase_createCancelButton','return\x200','991981fBjztq','onDatabaseLoaded','_stored_gaugeBackColor','Window_StatusBase_drawActorLevel','PixelateImageRendering','normal','SkillTypeRect','DrawItemBackgroundJS','BannedWords','DOWN','InputBgType','INBOUNCE','traitObjects','map','PERIOD','Game_Party_consumeItem','process_VisuMZ_CoreEngine_CustomParameters','ItemPadding','F11','_spriteset','isMagical','IconSParam1','textWidth','BoxMargin','_sideButtonLayout','add','Keyboard','isNwjs','clear','Input_shouldPreventDefault','_statusEquipWindow','Game_Temp_initialize','CLOSE_PAREN','setupNewGame','random','_lastPluginCommandInterpreter','SParamVocab4','gaugeBackColor','%2%1%3','_centerElementCoreEngine','test','Scene_Map_initialize','initCoreEasing','SkillTypeBgType','ConvertNumberToString','ColorDeath','worldTransform','xparamFlatBonus','version','ARRAYSTRUCT','_stored_powerDownColor','IconSParam9','itemHit','_dummyWindow','StatusEquipBgType','Window_Base_drawIcon','itemSuccessRate','getCustomBackgroundSettings','EREOF','PGUP','SkillMenu','update','bitmapHeight','_inputSpecialKeyCode','gaugeLineHeight','textSizeEx','WIN_OEM_CLEAR','XParamVocab3','drawAllParams','contentsOpacity','itemEva','DimColor1','WIN_OEM_FINISH','cursorLeft','drawTextEx','status','_targetAnchor','NoTileShadows','Flat2','drawIcon','SwitchActorText','106294vAKxta','command105','escape','clearZoom','randomJS','moveCancelButtonSideButtonLayout','removeChild','fontSize','level','Activated','ColorExpGauge2','isEnemy','imageSmoothingEnabled','Game_Actor_levelUp','updatePositionCoreEngineShakeRand','VOLUME_DOWN','switchModes','determineSideButtonLayoutValid','_shakePower','outlineColor','Scene_Base_createWindowLayer','BattleSystem','goto','NUM','KeyboardInput','bind','_mode','printError','ParseArmorNotetags','_stored_expGaugeColor1','Input_clear','tpGaugeColor1','BTB','ImgLoad','_editWindow','NUMPAD1','note','Scene_Boot_loadSystemImages','WIN_OEM_COPY','_coreEngineShakeStyle','_dimmerSprite','RowSpacing','PictureFilename','addChild','framebuffer','(\x5cd+)([%％])>','ColorTPGauge1','PictureEraseRange','currentExp','home','WIN_OEM_PA3','cursorPagedown','STR','_stored_maxLvGaugeColor1','_number','_muteSound','setActorHomeRepositioned','backspace','apply','disable','value','right','type','TextManager_param','updateAnchor','playBuzzer','pixelated','strokeRect','ARRAYJSON','img/%1/','_commandList','currentLevelExp','useDigitGrouping','exp','isTriggered','Game_Picture_y','ForceNoPlayTest','slotWindowRect','UNDERSCORE','randomInt','rgba(0,\x200,\x200,\x201.0)','createTextState','ParamMax','VisuMZ_2_BattleSystemFTB','PLUS','Sprite_destroy','_stored_ctGaugeColor1','Input_pollGamepads','_pageupButton','integer','JSON','setClickHandler','clone','LoadError','initButtonHidden','ApplyEasing','get','Scene_Skill_create','uiAreaHeight','BottomHelp','createSpriteset','retreat','log','isMaskingEnabled','buttonAreaHeight','dimColor2','_digitGroupingEx','stretch','button','updateOrigin','parameters','startNormalGame','_stored_pendingColor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','_maxDigits','NameMenu','Renderer','SystemSetFontSize','BasicParameterFormula','MainMenu','batch','sqrt','createWindowLayer','KeyUnlisted','DefaultStyle','ScreenShake','original','gaugeHeight','MRF','Scene_Name_onInputOk','MAXHP','format','WIN_OEM_FJ_MASSHOU','text%1','StartID','SHIFT','SystemLoadImages','LUK','string','backOpacity','loadTitle1','InputRect','platform','SnapshotOpacity','enter','font-smooth','makeEncounterCount','cursorUp','xparamPlus','exec','createDigits','ItemRect','_skillTypeWindow','ARRAYFUNC','none','scaleMode','_backgroundFilter','isPressed','_stored_normalColor','SideView','xparamPlusJS','drawCurrencyValue','expGaugeColor2','Spriteset_Battle_createEnemies','Game_Action_itemHit','smallParamFontSize','tileWidth','Scene_Title_drawGameTitle','createCommandWindow','TextStr','781263yptXuM','updatePosition','Window_Selectable_itemRect','numberWindowRect','_anchor','nextLevelExp','XParamVocab2','TitleCommandList','SParamVocab0','paramFlat','F13','MenuLayout','ListBgType','win32','buttonAssistWindowSideRect','updatePictureAntiZoom','drawGoldItemStyle','_offsetX','setupButtonImage','isNumpadPressed','Window_NameInput_cursorRight'];const _0x5a4b=function(_0x287dcd,_0x3b443b){_0x287dcd=_0x287dcd-0x18f;let _0x115dce=_0x115d[_0x287dcd];return _0x115dce;};const _0x3a331f=_0x5a4b;(function(_0x28e560,_0xc55f8a){const _0x27164e=_0x5a4b;while(!![]){try{const _0x28d00c=parseInt(_0x27164e(0x574))*-parseInt(_0x27164e(0x6c1))+-parseInt(_0x27164e(0x724))*parseInt(_0x27164e(0x3df))+-parseInt(_0x27164e(0x523))+-parseInt(_0x27164e(0x352))*parseInt(_0x27164e(0x3a1))+parseInt(_0x27164e(0x446))*-parseInt(_0x27164e(0x21b))+parseInt(_0x27164e(0x61e))+-parseInt(_0x27164e(0x301))*-parseInt(_0x27164e(0x4a7));if(_0x28d00c===_0xc55f8a)break;else _0x28e560['push'](_0x28e560['shift']());}catch(_0x14ebb1){_0x28e560['push'](_0x28e560['shift']());}}}(_0x115d,0xd111d));var label=_0x3a331f(0x3c0),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x1f8228){const _0x720d79=_0x3a331f;return _0x1f8228[_0x720d79(0x56e)]&&_0x1f8228[_0x720d79(0x484)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x3a331f(0x6be)]=VisuMZ[label][_0x3a331f(0x6be)]||{},VisuMZ[_0x3a331f(0x210)]=function(_0xd09dc5,_0x154030){const _0x19c931=_0x3a331f;for(const _0x397364 in _0x154030){if(_0x397364[_0x19c931(0x481)](/(.*):(.*)/i)){const _0x4cb57f=String(RegExp['$1']),_0x47619a=String(RegExp['$2'])[_0x19c931(0x3c7)]()['trim']();let _0x3aa8db,_0x2f8428,_0x259d19;switch(_0x47619a){case _0x19c931(0x58b):_0x3aa8db=_0x154030[_0x397364]!==''?Number(_0x154030[_0x397364]):0x0;break;case _0x19c931(0x216):_0x2f8428=_0x154030[_0x397364]!==''?JSON[_0x19c931(0x1de)](_0x154030[_0x397364]):[],_0x3aa8db=_0x2f8428[_0x19c931(0x530)](_0x10fbaf=>Number(_0x10fbaf));break;case'EVAL':_0x3aa8db=_0x154030[_0x397364]!==''?eval(_0x154030[_0x397364]):null;break;case _0x19c931(0x19d):_0x2f8428=_0x154030[_0x397364]!==''?JSON['parse'](_0x154030[_0x397364]):[],_0x3aa8db=_0x2f8428[_0x19c931(0x530)](_0x845976=>eval(_0x845976));break;case _0x19c931(0x5ce):_0x3aa8db=_0x154030[_0x397364]!==''?JSON[_0x19c931(0x1de)](_0x154030[_0x397364]):'';break;case _0x19c931(0x5b8):_0x2f8428=_0x154030[_0x397364]!==''?JSON[_0x19c931(0x1de)](_0x154030[_0x397364]):[],_0x3aa8db=_0x2f8428[_0x19c931(0x530)](_0x2cbf2d=>JSON[_0x19c931(0x1de)](_0x2cbf2d));break;case'FUNC':_0x3aa8db=_0x154030[_0x397364]!==''?new Function(JSON[_0x19c931(0x1de)](_0x154030[_0x397364])):new Function(_0x19c931(0x522));break;case _0x19c931(0x60d):_0x2f8428=_0x154030[_0x397364]!==''?JSON['parse'](_0x154030[_0x397364]):[],_0x3aa8db=_0x2f8428[_0x19c931(0x530)](_0x426def=>new Function(JSON[_0x19c931(0x1de)](_0x426def)));break;case _0x19c931(0x5a8):_0x3aa8db=_0x154030[_0x397364]!==''?String(_0x154030[_0x397364]):'';break;case _0x19c931(0x19f):_0x2f8428=_0x154030[_0x397364]!==''?JSON[_0x19c931(0x1de)](_0x154030[_0x397364]):[],_0x3aa8db=_0x2f8428[_0x19c931(0x530)](_0x3886f4=>String(_0x3886f4));break;case _0x19c931(0x1cf):_0x259d19=_0x154030[_0x397364]!==''?JSON[_0x19c931(0x1de)](_0x154030[_0x397364]):{},_0xd09dc5[_0x4cb57f]={},VisuMZ[_0x19c931(0x210)](_0xd09dc5[_0x4cb57f],_0x259d19);continue;case _0x19c931(0x554):_0x2f8428=_0x154030[_0x397364]!==''?JSON[_0x19c931(0x1de)](_0x154030[_0x397364]):[],_0x3aa8db=_0x2f8428[_0x19c931(0x530)](_0x2e524c=>VisuMZ[_0x19c931(0x210)]({},JSON['parse'](_0x2e524c)));break;default:continue;}_0xd09dc5[_0x4cb57f]=_0x3aa8db;}}return _0xd09dc5;},(_0x36dc7b=>{const _0x287eaa=_0x3a331f,_0x40175e=_0x36dc7b[_0x287eaa(0x2a8)];for(const _0x185426 of dependencies){if(!Imported[_0x185426]){alert(_0x287eaa(0x666)[_0x287eaa(0x5f7)](_0x40175e,_0x185426)),SceneManager[_0x287eaa(0x1ee)]();break;}}const _0xa7940b=_0x36dc7b[_0x287eaa(0x484)];if(_0xa7940b[_0x287eaa(0x481)](/\[Version[ ](.*?)\]/i)){const _0x3d9093=Number(RegExp['$1']);_0x3d9093!==VisuMZ[label]['version']&&(alert(_0x287eaa(0x4fa)['format'](_0x40175e,_0x3d9093)),SceneManager['exit']());}if(_0xa7940b[_0x287eaa(0x481)](/\[Tier[ ](\d+)\]/i)){const _0x50eddd=Number(RegExp['$1']);_0x50eddd<tier?(alert(_0x287eaa(0x5e5)[_0x287eaa(0x5f7)](_0x40175e,_0x50eddd,tier)),SceneManager[_0x287eaa(0x1ee)]()):tier=Math['max'](_0x50eddd,tier);}VisuMZ[_0x287eaa(0x210)](VisuMZ[label][_0x287eaa(0x6be)],_0x36dc7b[_0x287eaa(0x5e2)]);})(pluginData),VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x57d)]={'PluginCommands':!![]},PluginManager[_0x3a331f(0x20a)](pluginData[_0x3a331f(0x2a8)],'OpenURL',_0x2b8390=>{const _0x1f600f=_0x3a331f;VisuMZ[_0x1f600f(0x210)](_0x2b8390,_0x2b8390);const _0x466e73=_0x2b8390[_0x1f600f(0x296)];VisuMZ[_0x1f600f(0x3a5)](_0x466e73);}),PluginManager[_0x3a331f(0x20a)](pluginData[_0x3a331f(0x2a8)],'GoldChange',_0x4fccea=>{const _0x91fad9=_0x3a331f;VisuMZ[_0x91fad9(0x210)](_0x4fccea,_0x4fccea);const _0x3dfac8=_0x4fccea[_0x91fad9(0x5b0)]||0x0;$gameParty[_0x91fad9(0x46c)](_0x3dfac8);}),PluginManager['registerCommand'](pluginData['name'],_0x3a331f(0x70b),_0x37a10f=>{const _0x2414ef=_0x3a331f;VisuMZ[_0x2414ef(0x210)](_0x37a10f,_0x37a10f);const _0x5986a7=_0x37a10f['pictureId']||0x1,_0x1189d6=_0x37a10f[_0x2414ef(0x377)]||_0x2414ef(0x661),_0x32bcf1=$gameScreen[_0x2414ef(0x349)](_0x5986a7);_0x32bcf1&&_0x32bcf1[_0x2414ef(0x3dd)](_0x1189d6);}),PluginManager[_0x3a331f(0x20a)](pluginData[_0x3a331f(0x2a8)],_0x3a331f(0x38d),_0x5e47db=>{const _0x38ed44=_0x3a331f;for(let _0x349426=0x1;_0x349426<=0x64;_0x349426++){$gameScreen[_0x38ed44(0x3e0)](_0x349426);}}),PluginManager[_0x3a331f(0x20a)](pluginData[_0x3a331f(0x2a8)],_0x3a331f(0x5a3),_0x5330c5=>{const _0x3e491a=_0x3a331f;VisuMZ[_0x3e491a(0x210)](_0x5330c5,_0x5330c5);const _0x2f2025=Math[_0x3e491a(0x49b)](_0x5330c5[_0x3e491a(0x5fa)],_0x5330c5[_0x3e491a(0x351)]),_0x51446c=Math[_0x3e491a(0x6e9)](_0x5330c5[_0x3e491a(0x5fa)],_0x5330c5[_0x3e491a(0x351)]);for(let _0x364042=_0x2f2025;_0x364042<=_0x51446c;_0x364042++){$gameScreen['erasePicture'](_0x364042);}}),PluginManager[_0x3a331f(0x20a)](pluginData[_0x3a331f(0x2a8)],'ScreenShake',_0x15591d=>{const _0x111a30=_0x3a331f;VisuMZ[_0x111a30(0x210)](_0x15591d,_0x15591d);const _0x8f0a07=_0x15591d[_0x111a30(0x29a)]||_0x111a30(0x545),_0x3d9456=_0x15591d[_0x111a30(0x65a)][_0x111a30(0x283)](0x1,0x9),_0x3775e2=_0x15591d[_0x111a30(0x4f0)][_0x111a30(0x283)](0x1,0x9),_0x7db782=_0x15591d[_0x111a30(0x482)]||0x1,_0x497aa6=_0x15591d[_0x111a30(0x2f1)];$gameScreen[_0x111a30(0x701)](_0x8f0a07),$gameScreen['startShake'](_0x3d9456,_0x3775e2,_0x7db782);if(_0x497aa6){const _0x12e63a=$gameTemp[_0x111a30(0x2fa)]();if(_0x12e63a)_0x12e63a[_0x111a30(0x50a)](_0x7db782);}}),PluginManager[_0x3a331f(0x20a)](pluginData[_0x3a331f(0x2a8)],_0x3a331f(0x5e9),_0xe94fe5=>{const _0x248f89=_0x3a331f;VisuMZ[_0x248f89(0x210)](_0xe94fe5,_0xe94fe5);const _0x512644=_0xe94fe5['option']||0x1;$gameSystem[_0x248f89(0x33a)](_0x512644);}),PluginManager[_0x3a331f(0x20a)](pluginData[_0x3a331f(0x2a8)],_0x3a331f(0x41b),_0x313a79=>{const _0xff5633=_0x3a331f;if($gameParty['inBattle']())return;VisuMZ[_0xff5633(0x210)](_0x313a79,_0x313a79);const _0x218309=_0x313a79[_0xff5633(0x3c3)];if(_0x218309[_0xff5633(0x481)](/Front/i))$gameSystem[_0xff5633(0x1d8)](![]);else _0x218309[_0xff5633(0x481)](/Side/i)?$gameSystem[_0xff5633(0x1d8)](!![]):$gameSystem[_0xff5633(0x1d8)](!$gameSystem[_0xff5633(0x6ef)]());}),PluginManager['registerCommand'](pluginData[_0x3a331f(0x2a8)],'SystemLoadAudio',_0x569301=>{const _0x375fd1=_0x3a331f;if($gameParty[_0x375fd1(0x439)]())return;VisuMZ['ConvertParams'](_0x569301,_0x569301);const _0x4e2c31=['bgm',_0x375fd1(0x2a4),'me','se'];for(const _0xb941f1 of _0x4e2c31){const _0x21fd36=_0x569301[_0xb941f1],_0x4dad19='%1/'[_0x375fd1(0x5f7)](_0xb941f1);for(const _0x3d7a9f of _0x21fd36){console[_0x375fd1(0x5da)](_0x4dad19,_0x3d7a9f),AudioManager[_0x375fd1(0x510)](_0x4dad19,_0x3d7a9f);}}}),PluginManager['registerCommand'](pluginData['name'],_0x3a331f(0x5fc),_0x175cf2=>{const _0x265aff=_0x3a331f;if($gameParty[_0x265aff(0x439)]())return;VisuMZ[_0x265aff(0x210)](_0x175cf2,_0x175cf2);const _0x3778ee=[_0x265aff(0x40d),_0x265aff(0x359),_0x265aff(0x1ea),_0x265aff(0x6ee),_0x265aff(0x68d),_0x265aff(0x476),_0x265aff(0x3d6),_0x265aff(0x24f),_0x265aff(0x212),_0x265aff(0x72f),_0x265aff(0x4b1),'tilesets',_0x265aff(0x411),'titles2'];for(const _0x334a77 of _0x3778ee){const _0x212829=_0x175cf2[_0x334a77],_0x4ce073=_0x265aff(0x5b9)[_0x265aff(0x5f7)](_0x334a77);for(const _0x598a3b of _0x212829){ImageManager[_0x265aff(0x36d)](_0x4ce073,_0x598a3b);}}}),PluginManager['registerCommand'](pluginData['name'],_0x3a331f(0x2d6),_0x905420=>{const _0x58715d=_0x3a331f;if($gameParty[_0x58715d(0x439)]())return;VisuMZ[_0x58715d(0x210)](_0x905420,_0x905420);const _0x158ed8=_0x905420[_0x58715d(0x3c3)][_0x58715d(0x3c7)]()['trim'](),_0x3d518b=VisuMZ[_0x58715d(0x3c0)]['CreateBattleSystemID'](_0x158ed8);$gameSystem['setBattleSystem'](_0x3d518b);}),VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x729)]=function(_0x3090da){const _0x2df145=_0x3a331f;_0x3090da=_0x3090da||'DATABASE',_0x3090da=String(_0x3090da)[_0x2df145(0x3c7)]()[_0x2df145(0x41d)]();switch(_0x3090da){case _0x2df145(0x39c):return 0x0;case _0x2df145(0x422):Imported[_0x2df145(0x3de)]&&(ConfigManager[_0x2df145(0x6a9)]=!![]);return 0x1;case _0x2df145(0x71a):Imported[_0x2df145(0x3de)]&&(ConfigManager[_0x2df145(0x6a9)]=![]);return 0x2;case'CTB':if(Imported[_0x2df145(0x479)])return _0x2df145(0x677);break;case _0x2df145(0x658):if(Imported[_0x2df145(0x2f2)])return _0x2df145(0x658);break;case'BTB':if(Imported[_0x2df145(0x3a6)])return'BTB';break;case'FTB':if(Imported[_0x2df145(0x5c7)])return _0x2df145(0x6d7);break;}return $dataSystem['battleSystem'];},PluginManager[_0x3a331f(0x20a)](pluginData[_0x3a331f(0x2a8)],'SystemSetWindowPadding',_0x4aaf3e=>{const _0x29cda4=_0x3a331f;VisuMZ[_0x29cda4(0x210)](_0x4aaf3e,_0x4aaf3e);const _0x5518c4=_0x4aaf3e['option']||0x1;$gameSystem[_0x29cda4(0x63b)](_0x5518c4);}),VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x1b5)]=Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x524)],Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x524)]=function(){const _0x2a32b9=_0x3a331f;VisuMZ[_0x2a32b9(0x3c0)][_0x2a32b9(0x1b5)]['call'](this),this['process_VisuMZ_CoreEngine_RegExp'](),this[_0x2a32b9(0x245)](),this[_0x2a32b9(0x688)](),this[_0x2a32b9(0x6b7)](),this['process_VisuMZ_CoreEngine_CustomParameters'](),VisuMZ[_0x2a32b9(0x31d)]();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x4ed)]={},Scene_Boot[_0x3a331f(0x499)]['process_VisuMZ_CoreEngine_RegExp']=function(){const _0x45b1dc=_0x3a331f,_0x17c894=['MAXHP',_0x45b1dc(0x1c6),'ATK',_0x45b1dc(0x2b7),_0x45b1dc(0x2e1),'MDF',_0x45b1dc(0x50e),_0x45b1dc(0x5fd)],_0x568791=[_0x45b1dc(0x702),'EVA',_0x45b1dc(0x6d2),_0x45b1dc(0x32c),_0x45b1dc(0x431),_0x45b1dc(0x5f4),_0x45b1dc(0x2d4),_0x45b1dc(0x4a2),_0x45b1dc(0x346),'TRG'],_0x31ce7c=[_0x45b1dc(0x636),_0x45b1dc(0x194),'REC',_0x45b1dc(0x39e),'MCR',_0x45b1dc(0x397),_0x45b1dc(0x45d),_0x45b1dc(0x1d4),_0x45b1dc(0x339),_0x45b1dc(0x36b)],_0x3b3cf9=[_0x17c894,_0x568791,_0x31ce7c],_0x4fa842=[_0x45b1dc(0x391),_0x45b1dc(0x3ec),_0x45b1dc(0x6ba),'Max',_0x45b1dc(0x51d),_0x45b1dc(0x3e4),_0x45b1dc(0x27c),'Flat','Flat1','Flat2'];for(const _0x116029 of _0x3b3cf9){let _0x54e910='';if(_0x116029===_0x17c894)_0x54e910=_0x45b1dc(0x712);if(_0x116029===_0x568791)_0x54e910='xparam';if(_0x116029===_0x31ce7c)_0x54e910=_0x45b1dc(0x364);for(const _0x35069c of _0x4fa842){let _0x3b9977='%1%2'[_0x45b1dc(0x5f7)](_0x54e910,_0x35069c);VisuMZ['CoreEngine'][_0x45b1dc(0x4ed)][_0x3b9977]=[],VisuMZ[_0x45b1dc(0x3c0)][_0x45b1dc(0x4ed)][_0x3b9977+'JS']=[];let _0x2a851f=_0x45b1dc(0x40b);if([_0x45b1dc(0x391),_0x45b1dc(0x389)][_0x45b1dc(0x2a5)](_0x35069c))_0x2a851f+=_0x45b1dc(0x41c);else{if([_0x45b1dc(0x3ec),_0x45b1dc(0x72a)][_0x45b1dc(0x2a5)](_0x35069c))_0x2a851f+=_0x45b1dc(0x30f);else{if([_0x45b1dc(0x6ba),_0x45b1dc(0x571)][_0x45b1dc(0x2a5)](_0x35069c))_0x2a851f+=_0x45b1dc(0x2dd);else{if(_0x35069c===_0x45b1dc(0x511))_0x2a851f+=_0x45b1dc(0x456);else{if(_0x35069c===_0x45b1dc(0x3e4))_0x2a851f+=_0x45b1dc(0x5a1);else _0x35069c===_0x45b1dc(0x27c)&&(_0x2a851f+=_0x45b1dc(0x2b1));}}}}for(const _0x1e8803 of _0x116029){let _0x48ceb1=_0x35069c['replace'](/[\d+]/g,'')[_0x45b1dc(0x3c7)]();const _0x1489ec=_0x2a851f['format'](_0x1e8803,_0x48ceb1);VisuMZ['CoreEngine'][_0x45b1dc(0x4ed)][_0x3b9977][_0x45b1dc(0x2ae)](new RegExp(_0x1489ec,'i'));const _0x393980=_0x45b1dc(0x6d1)['format'](_0x1e8803,_0x48ceb1);VisuMZ[_0x45b1dc(0x3c0)]['RegExp'][_0x3b9977+'JS'][_0x45b1dc(0x2ae)](new RegExp(_0x393980,'i'));}}}},Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x245)]=function(){const _0x24599a=_0x3a331f;if(VisuMZ[_0x24599a(0x31d)])return;},Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x688)]=function(){const _0x1dc718=_0x3a331f;VisuMZ[_0x1dc718(0x3c0)][_0x1dc718(0x6be)][_0x1dc718(0x271)]['OpenConsole']&&VisuMZ[_0x1dc718(0x450)](!![]);VisuMZ[_0x1dc718(0x3c0)]['Settings']['QoL'][_0x1dc718(0x693)]&&(Input[_0x1dc718(0x2fe)][0x23]=_0x1dc718(0x494),Input[_0x1dc718(0x2fe)][0x24]=_0x1dc718(0x5a5));if(VisuMZ[_0x1dc718(0x3c0)]['Settings'][_0x1dc718(0x4ca)]){const _0x53bc11=VisuMZ[_0x1dc718(0x3c0)][_0x1dc718(0x6be)][_0x1dc718(0x4ca)];_0x53bc11[_0x1dc718(0x4f7)]=_0x53bc11[_0x1dc718(0x4f7)]||_0x1dc718(0x68e),_0x53bc11[_0x1dc718(0x403)]=_0x53bc11[_0x1dc718(0x403)]||_0x1dc718(0x4c4);}VisuMZ[_0x1dc718(0x3c0)][_0x1dc718(0x6be)][_0x1dc718(0x58c)][_0x1dc718(0x42e)]&&(Input['keyMapper'][0x57]='up',Input[_0x1dc718(0x2fe)][0x41]=_0x1dc718(0x453),Input[_0x1dc718(0x2fe)][0x53]=_0x1dc718(0x378),Input[_0x1dc718(0x2fe)][0x44]='right',Input['keyMapper'][0x45]='pagedown'),VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x1dc718(0x237)]&&(Input[_0x1dc718(0x2fe)][0x52]=_0x1dc718(0x2e4));},Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x6b7)]=function(){const _0x3784a6=_0x3a331f;this[_0x3784a6(0x340)]();},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x4a45f0=_0x3a331f,_0x139258=VisuMZ[_0x4a45f0(0x3c0)]['Settings'][_0x4a45f0(0x287)];for(const _0x1c8a49 of _0x139258){const _0x17f43f=_0x1c8a49[_0x4a45f0(0x262)]['replace'](/[ ]/g,''),_0x2f66b=_0x1c8a49[_0x4a45f0(0x3d7)];VisuMZ['CoreEngine'][_0x4a45f0(0x6c7)](_0x17f43f,_0x2f66b);}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6c7)]=function(_0x3e56ba,_0x400da6){const _0x5767f1=_0x3a331f;if(!!window[_0x3e56ba]){if($gameTemp[_0x5767f1(0x393)]())console[_0x5767f1(0x5da)]('WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function'[_0x5767f1(0x5f7)](_0x3e56ba));}const _0xaf7640=_0x5767f1(0x23e)[_0x5767f1(0x5f7)](_0x3e56ba,_0x400da6);window[_0x3e56ba]=new Function(_0xaf7640);},Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x533)]=function(){const _0x4c08ea=_0x3a331f,_0x5cca06=VisuMZ['CoreEngine']['Settings'][_0x4c08ea(0x6dd)];if(!_0x5cca06)return;for(const _0x4f025f of _0x5cca06){if(!_0x4f025f)continue;VisuMZ[_0x4c08ea(0x3c0)][_0x4c08ea(0x648)](_0x4f025f);}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x1c5)]={},VisuMZ['CoreEngine']['CustomParamIcons']={},VisuMZ['CoreEngine'][_0x3a331f(0x24c)]={},VisuMZ[_0x3a331f(0x3c0)]['CustomParamAbb']={},VisuMZ['CoreEngine'][_0x3a331f(0x648)]=function(_0x253c04){const _0x4dae2a=_0x3a331f,_0x276a09=_0x253c04[_0x4dae2a(0x305)],_0x4c5104=_0x253c04[_0x4dae2a(0x720)],_0x5d0170=_0x253c04[_0x4dae2a(0x30b)],_0x572a1e=_0x253c04[_0x4dae2a(0x29a)],_0x238a7b=new Function(_0x253c04[_0x4dae2a(0x2be)]);VisuMZ['CoreEngine'][_0x4dae2a(0x1c5)][_0x276a09[_0x4dae2a(0x3c7)]()[_0x4dae2a(0x41d)]()]=_0x4c5104,VisuMZ[_0x4dae2a(0x3c0)][_0x4dae2a(0x6f8)][_0x276a09[_0x4dae2a(0x3c7)]()[_0x4dae2a(0x41d)]()]=_0x5d0170,VisuMZ[_0x4dae2a(0x3c0)][_0x4dae2a(0x24c)][_0x276a09[_0x4dae2a(0x3c7)]()[_0x4dae2a(0x41d)]()]=_0x572a1e,VisuMZ['CoreEngine'][_0x4dae2a(0x672)][_0x276a09[_0x4dae2a(0x3c7)]()[_0x4dae2a(0x41d)]()]=_0x276a09,Object[_0x4dae2a(0x29f)](Game_BattlerBase['prototype'],_0x276a09,{'get'(){const _0x27613f=_0x4dae2a,_0x5711bb=_0x238a7b[_0x27613f(0x2eb)](this);return _0x572a1e===_0x27613f(0x5cd)?Math['round'](_0x5711bb):_0x5711bb;}});},VisuMZ['ParseAllNotetags']=function(){const _0x451806=_0x3a331f;for(const _0x2ff70e of $dataActors){if(_0x2ff70e)VisuMZ['ParseActorNotetags'](_0x2ff70e);}for(const _0x5e7446 of $dataClasses){if(_0x5e7446)VisuMZ[_0x451806(0x312)](_0x5e7446);}for(const _0x407ec6 of $dataSkills){if(_0x407ec6)VisuMZ[_0x451806(0x228)](_0x407ec6);}for(const _0x41989b of $dataItems){if(_0x41989b)VisuMZ['ParseItemNotetags'](_0x41989b);}for(const _0x1fbed9 of $dataWeapons){if(_0x1fbed9)VisuMZ[_0x451806(0x19a)](_0x1fbed9);}for(const _0x4148a2 of $dataArmors){if(_0x4148a2)VisuMZ['ParseArmorNotetags'](_0x4148a2);}for(const _0x58a330 of $dataEnemies){if(_0x58a330)VisuMZ[_0x451806(0x3f7)](_0x58a330);}for(const _0x1c2b8e of $dataStates){if(_0x1c2b8e)VisuMZ[_0x451806(0x32d)](_0x1c2b8e);}for(const _0x3f797f of $dataTilesets){if(_0x3f797f)VisuMZ[_0x451806(0x408)](_0x3f797f);}},VisuMZ['ParseActorNotetags']=function(_0x4fb34d){},VisuMZ[_0x3a331f(0x312)]=function(_0xca33ed){},VisuMZ[_0x3a331f(0x228)]=function(_0x579925){},VisuMZ[_0x3a331f(0x4d5)]=function(_0x592f67){},VisuMZ[_0x3a331f(0x19a)]=function(_0x492535){},VisuMZ[_0x3a331f(0x590)]=function(_0x2e3a66){},VisuMZ[_0x3a331f(0x3f7)]=function(_0xf9545e){},VisuMZ[_0x3a331f(0x32d)]=function(_0x36ba29){},VisuMZ['ParseTilesetNotetags']=function(_0xa67831){},VisuMZ['CoreEngine'][_0x3a331f(0x3d0)]=VisuMZ[_0x3a331f(0x3d0)],VisuMZ[_0x3a331f(0x3d0)]=function(_0xf1f84c){const _0x32dae8=_0x3a331f;VisuMZ['CoreEngine']['ParseActorNotetags']['call'](this,_0xf1f84c);const _0x183aff=_0xf1f84c[_0x32dae8(0x598)];if(_0x183aff['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0xf1f84c[_0x32dae8(0x361)]=Number(RegExp['$1']);if(_0xf1f84c[_0x32dae8(0x361)]===0x0)_0xf1f84c[_0x32dae8(0x361)]=Number[_0x32dae8(0x294)];}_0x183aff[_0x32dae8(0x481)](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0xf1f84c[_0x32dae8(0x6c4)]=Math['min'](Number(RegExp['$1']),_0xf1f84c[_0x32dae8(0x361)]));},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x312)]=VisuMZ[_0x3a331f(0x312)],VisuMZ['ParseClassNotetags']=function(_0x2e4e4d){const _0x767cce=_0x3a331f;VisuMZ[_0x767cce(0x3c0)][_0x767cce(0x312)][_0x767cce(0x2eb)](this,_0x2e4e4d);if(_0x2e4e4d[_0x767cce(0x1f6)])for(const _0x385cd1 of _0x2e4e4d[_0x767cce(0x1f6)]){_0x385cd1[_0x767cce(0x598)][_0x767cce(0x481)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x385cd1[_0x767cce(0x57c)]=Math[_0x767cce(0x6e9)](Number(RegExp['$1']),0x1));}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x3f7)]=VisuMZ[_0x3a331f(0x3f7)],VisuMZ[_0x3a331f(0x3f7)]=function(_0x251c64){const _0x15c6ca=_0x3a331f;VisuMZ[_0x15c6ca(0x3c0)][_0x15c6ca(0x3f7)]['call'](this,_0x251c64),_0x251c64[_0x15c6ca(0x57c)]=0x1;const _0x2bafcb=_0x251c64['note'];if(_0x2bafcb[_0x15c6ca(0x481)](/<LEVEL:[ ](\d+)>/i))_0x251c64[_0x15c6ca(0x57c)]=Number(RegExp['$1']);if(_0x2bafcb[_0x15c6ca(0x481)](/<MAXHP:[ ](\d+)>/i))_0x251c64[_0x15c6ca(0x2e7)][0x0]=Number(RegExp['$1']);if(_0x2bafcb['match'](/<MAXMP:[ ](\d+)>/i))_0x251c64[_0x15c6ca(0x2e7)][0x1]=Number(RegExp['$1']);if(_0x2bafcb[_0x15c6ca(0x481)](/<ATK:[ ](\d+)>/i))_0x251c64[_0x15c6ca(0x2e7)][0x2]=Number(RegExp['$1']);if(_0x2bafcb['match'](/<DEF:[ ](\d+)>/i))_0x251c64['params'][0x3]=Number(RegExp['$1']);if(_0x2bafcb[_0x15c6ca(0x481)](/<MAT:[ ](\d+)>/i))_0x251c64['params'][0x4]=Number(RegExp['$1']);if(_0x2bafcb['match'](/<MDF:[ ](\d+)>/i))_0x251c64[_0x15c6ca(0x2e7)][0x5]=Number(RegExp['$1']);if(_0x2bafcb['match'](/<AGI:[ ](\d+)>/i))_0x251c64[_0x15c6ca(0x2e7)][0x6]=Number(RegExp['$1']);if(_0x2bafcb[_0x15c6ca(0x481)](/<LUK:[ ](\d+)>/i))_0x251c64[_0x15c6ca(0x2e7)][0x7]=Number(RegExp['$1']);if(_0x2bafcb[_0x15c6ca(0x481)](/<EXP:[ ](\d+)>/i))_0x251c64[_0x15c6ca(0x5bd)]=Number(RegExp['$1']);if(_0x2bafcb[_0x15c6ca(0x481)](/<GOLD:[ ](\d+)>/i))_0x251c64['gold']=Number(RegExp['$1']);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6ff)]=Graphics[_0x3a331f(0x664)],Graphics['_defaultStretchMode']=function(){const _0xe53f0=_0x3a331f;switch(VisuMZ[_0xe53f0(0x3c0)][_0xe53f0(0x6be)][_0xe53f0(0x271)][_0xe53f0(0x297)]){case _0xe53f0(0x5df):return!![];case _0xe53f0(0x528):return![];default:return VisuMZ['CoreEngine'][_0xe53f0(0x6ff)]['call'](this);}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x695)]=Graphics['printError'],Graphics[_0x3a331f(0x58f)]=function(_0x2602c7,_0x42ff13,_0x1800ce=null){const _0x2a7fd2=_0x3a331f;VisuMZ[_0x2a7fd2(0x3c0)][_0x2a7fd2(0x695)][_0x2a7fd2(0x2eb)](this,_0x2602c7,_0x42ff13,_0x1800ce),VisuMZ[_0x2a7fd2(0x450)](![]);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x43e)]=Graphics[_0x3a331f(0x34f)],Graphics[_0x3a331f(0x34f)]=function(_0x3dc787){const _0x1fe4a2=_0x3a331f;VisuMZ['CoreEngine'][_0x1fe4a2(0x43e)]['call'](this,_0x3dc787),this[_0x1fe4a2(0x54a)](_0x3dc787);},Graphics[_0x3a331f(0x54a)]=function(_0x3184e1){const _0x2cc685=_0x3a331f;VisuMZ[_0x2cc685(0x3c0)]['Settings'][_0x2cc685(0x271)]['FontSmoothing']&&(_0x3184e1[_0x2cc685(0x637)][_0x2cc685(0x605)]=_0x2cc685(0x60e));VisuMZ['CoreEngine'][_0x2cc685(0x6be)]['QoL'][_0x2cc685(0x527)]&&(_0x3184e1[_0x2cc685(0x637)][_0x2cc685(0x2ba)]=_0x2cc685(0x5b6));const _0x3946e8=Math[_0x2cc685(0x6e9)](0x0,Math[_0x2cc685(0x4e5)](_0x3184e1[_0x2cc685(0x483)]*this[_0x2cc685(0x420)])),_0x33332e=Math['max'](0x0,Math[_0x2cc685(0x4e5)](_0x3184e1[_0x2cc685(0x3fc)]*this[_0x2cc685(0x420)]));_0x3184e1[_0x2cc685(0x637)][_0x2cc685(0x483)]=_0x3946e8+'px',_0x3184e1[_0x2cc685(0x637)][_0x2cc685(0x3fc)]=_0x33332e+'px';},Bitmap[_0x3a331f(0x499)][_0x3a331f(0x418)]=function(){const _0x3830bd=_0x3a331f;this[_0x3830bd(0x64e)]=!![];},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x5c9)]=Sprite[_0x3a331f(0x499)][_0x3a331f(0x41f)],Sprite[_0x3a331f(0x499)][_0x3a331f(0x41f)]=function(){const _0x39bd44=_0x3a331f;VisuMZ[_0x39bd44(0x3c0)][_0x39bd44(0x5c9)][_0x39bd44(0x2eb)](this),this[_0x39bd44(0x38a)]();},Sprite[_0x3a331f(0x499)]['destroyCoreEngineMarkedBitmaps']=function(){const _0x1602fc=_0x3a331f;if(!this['bitmap'])return;if(!this[_0x1602fc(0x4d9)]['_customModified'])return;this[_0x1602fc(0x4d9)][_0x1602fc(0x3b5)]&&!this[_0x1602fc(0x43a)]['_baseTexture']['destroyed']&&this[_0x1602fc(0x4d9)][_0x1602fc(0x41f)]();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x480)]=Bitmap[_0x3a331f(0x499)][_0x3a331f(0x22e)],Bitmap[_0x3a331f(0x499)][_0x3a331f(0x22e)]=function(_0x2aeceb,_0xf94ab6){const _0x35c747=_0x3a331f;VisuMZ['CoreEngine'][_0x35c747(0x480)][_0x35c747(0x2eb)](this,_0x2aeceb,_0xf94ab6),this[_0x35c747(0x418)]();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x21f)]=Bitmap[_0x3a331f(0x499)][_0x3a331f(0x4d8)],Bitmap[_0x3a331f(0x499)][_0x3a331f(0x4d8)]=function(_0x144984,_0x43fc19,_0x20b219,_0x1620e7,_0x509800,_0x3d9a37,_0x8e1cde,_0x5e09ea,_0x33f216){const _0x35ac3e=_0x3a331f;VisuMZ[_0x35ac3e(0x3c0)][_0x35ac3e(0x21f)]['call'](this,_0x144984,_0x43fc19,_0x20b219,_0x1620e7,_0x509800,_0x3d9a37,_0x8e1cde,_0x5e09ea,_0x33f216),this[_0x35ac3e(0x418)]();},VisuMZ[_0x3a331f(0x3c0)]['Bitmap_clearRect']=Bitmap[_0x3a331f(0x499)]['clearRect'],Bitmap['prototype'][_0x3a331f(0x68c)]=function(_0xa2c1f9,_0x57c870,_0x4ab864,_0x3af31b){const _0x57da70=_0x3a331f;VisuMZ[_0x57da70(0x3c0)][_0x57da70(0x1f1)][_0x57da70(0x2eb)](this,_0xa2c1f9,_0x57c870,_0x4ab864,_0x3af31b),this[_0x57da70(0x418)]();},VisuMZ[_0x3a331f(0x3c0)]['Bitmap_fillRect']=Bitmap[_0x3a331f(0x499)][_0x3a331f(0x47d)],Bitmap[_0x3a331f(0x499)]['fillRect']=function(_0x2daaa3,_0x190c0,_0x46a4ee,_0x2f01e2,_0x5ba248){const _0x493319=_0x3a331f;VisuMZ[_0x493319(0x3c0)][_0x493319(0x314)]['call'](this,_0x2daaa3,_0x190c0,_0x46a4ee,_0x2f01e2,_0x5ba248),this[_0x493319(0x418)]();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x394)]=Bitmap['prototype']['strokeRect'],Bitmap['prototype'][_0x3a331f(0x5b7)]=function(_0x429fcc,_0x3d7401,_0x25f7f6,_0x1769ad,_0xca3a93){const _0x317a40=_0x3a331f;VisuMZ[_0x317a40(0x3c0)][_0x317a40(0x394)][_0x317a40(0x2eb)](this,_0x429fcc,_0x3d7401,_0x25f7f6,_0x1769ad,_0xca3a93),this['markCoreEngineModified']();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x4c7)]=Bitmap[_0x3a331f(0x499)][_0x3a331f(0x29b)],Bitmap['prototype']['gradientFillRect']=function(_0x122830,_0x140028,_0x2a246c,_0x62f078,_0x5176af,_0x550c47,_0x80c28e){const _0x43d663=_0x3a331f;VisuMZ[_0x43d663(0x3c0)]['Bitmap_gradientFillRect'][_0x43d663(0x2eb)](this,_0x122830,_0x140028,_0x2a246c,_0x62f078,_0x5176af,_0x550c47,_0x80c28e),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x3a331f(0x22f)]=Bitmap[_0x3a331f(0x499)]['drawCircle'],Bitmap['prototype'][_0x3a331f(0x520)]=function(_0x138513,_0xd3bca9,_0x146ca8,_0x21e97c){const _0x32d877=_0x3a331f;_0x138513=Math[_0x32d877(0x469)](_0x138513),_0xd3bca9=Math[_0x32d877(0x469)](_0xd3bca9),_0x146ca8=Math[_0x32d877(0x469)](_0x146ca8),VisuMZ[_0x32d877(0x3c0)][_0x32d877(0x22f)][_0x32d877(0x2eb)](this,_0x138513,_0xd3bca9,_0x146ca8,_0x21e97c),this['markCoreEngineModified']();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x41e)]=Bitmap['prototype'][_0x3a331f(0x357)],Bitmap['prototype'][_0x3a331f(0x357)]=function(_0x3ce0d0){const _0x1e710d=_0x3a331f;return Math[_0x1e710d(0x469)](VisuMZ[_0x1e710d(0x3c0)]['Bitmap_measureTextWidth'][_0x1e710d(0x2eb)](this,_0x3ce0d0));},VisuMZ[_0x3a331f(0x3c0)]['Bitmap_drawText']=Bitmap['prototype'][_0x3a331f(0x400)],Bitmap['prototype'][_0x3a331f(0x400)]=function(_0x17c330,_0x424c33,_0x8c59fc,_0xd80e34,_0xd2bd39,_0x1e09ea){const _0xb10d30=_0x3a331f;_0x424c33=Math[_0xb10d30(0x469)](_0x424c33),_0x8c59fc=Math['round'](_0x8c59fc),_0xd80e34=Math[_0xb10d30(0x469)](_0xd80e34),_0xd2bd39=Math['round'](_0xd2bd39),VisuMZ[_0xb10d30(0x3c0)]['Bitmap_drawText'][_0xb10d30(0x2eb)](this,_0x17c330,_0x424c33,_0x8c59fc,_0xd80e34,_0xd2bd39,_0x1e09ea),this[_0xb10d30(0x418)]();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x66b)]=Bitmap[_0x3a331f(0x499)]['_drawTextOutline'],Bitmap[_0x3a331f(0x499)][_0x3a331f(0x740)]=function(_0x28cb55,_0x4a4f70,_0x6ca20e,_0x4f5f9c){const _0x33bd58=_0x3a331f;VisuMZ[_0x33bd58(0x3c0)][_0x33bd58(0x6be)][_0x33bd58(0x271)][_0x33bd58(0x6a6)]?this[_0x33bd58(0x4a0)](_0x28cb55,_0x4a4f70,_0x6ca20e,_0x4f5f9c):VisuMZ[_0x33bd58(0x3c0)]['Bitmap_drawTextOutline'][_0x33bd58(0x2eb)](this,_0x28cb55,_0x4a4f70,_0x6ca20e,_0x4f5f9c);},Bitmap[_0x3a331f(0x499)][_0x3a331f(0x4a0)]=function(_0x491278,_0x2aaebb,_0x2df6bf,_0x555cce){const _0x5875bb=_0x3a331f,_0x336499=this['context'];_0x336499['fillStyle']=this[_0x5875bb(0x587)],_0x336499[_0x5875bb(0x1c3)](_0x491278,_0x2aaebb+0x2,_0x2df6bf+0x2,_0x555cce);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x592)]=Input[_0x3a331f(0x53f)],Input[_0x3a331f(0x53f)]=function(){const _0x3940a3=_0x3a331f;VisuMZ[_0x3940a3(0x3c0)][_0x3940a3(0x592)][_0x3940a3(0x2eb)](this),this[_0x3940a3(0x4bd)]=undefined,this[_0x3940a3(0x562)]=undefined,this[_0x3940a3(0x51c)]=Input[_0x3940a3(0x2b9)];},VisuMZ[_0x3a331f(0x3c0)]['Input_update']=Input['update'],Input[_0x3a331f(0x560)]=function(){const _0x11bd7d=_0x3a331f;VisuMZ[_0x11bd7d(0x3c0)][_0x11bd7d(0x6b5)]['call'](this);if(this['_gamepadWait'])this['_gamepadWait']--;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x5cb)]=Input['_pollGamepads'],Input['_pollGamepads']=function(){const _0x3da6c4=_0x3a331f;if(this['_gamepadWait'])return;VisuMZ['CoreEngine'][_0x3da6c4(0x5cb)]['call'](this);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x226)]=Input[_0x3a331f(0x497)],Input[_0x3a331f(0x497)]=function(){const _0x52ed3e=_0x3a331f;VisuMZ[_0x52ed3e(0x3c0)][_0x52ed3e(0x226)][_0x52ed3e(0x2eb)](this),document['addEventListener']('keypress',this[_0x52ed3e(0x1e8)][_0x52ed3e(0x58d)](this));},VisuMZ['CoreEngine'][_0x3a331f(0x462)]=Input[_0x3a331f(0x6bd)],Input[_0x3a331f(0x6bd)]=function(_0x1ea450){const _0x1caae5=_0x3a331f;this[_0x1caae5(0x562)]=_0x1ea450[_0x1caae5(0x263)],VisuMZ[_0x1caae5(0x3c0)][_0x1caae5(0x462)][_0x1caae5(0x2eb)](this,_0x1ea450);},Input[_0x3a331f(0x1e8)]=function(_0x3b84f3){const _0x5626c8=_0x3a331f;this[_0x5626c8(0x703)](_0x3b84f3);},Input['_registerKeyInput']=function(_0x1e6d07){const _0x443adf=_0x3a331f;this['_inputSpecialKeyCode']=_0x1e6d07[_0x443adf(0x263)];let _0x2bb450=String['fromCharCode'](_0x1e6d07[_0x443adf(0x669)]);this[_0x443adf(0x4bd)]===undefined?this[_0x443adf(0x4bd)]=_0x2bb450:this[_0x443adf(0x4bd)]+=_0x2bb450;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x540)]=Input[_0x3a331f(0x684)],Input[_0x3a331f(0x684)]=function(_0x1ae6e0){const _0x4e4134=_0x3a331f;if(_0x1ae6e0===0x8)return![];return VisuMZ[_0x4e4134(0x3c0)]['Input_shouldPreventDefault']['call'](this,_0x1ae6e0);},Input[_0x3a331f(0x2c6)]=function(_0x3c0729){const _0x388303=_0x3a331f;if(_0x3c0729[_0x388303(0x481)](/backspace/i))return this[_0x388303(0x562)]===0x8;if(_0x3c0729['match'](/enter/i))return this[_0x388303(0x562)]===0xd;if(_0x3c0729[_0x388303(0x481)](/escape/i))return this[_0x388303(0x562)]===0x1b;},Input['isNumpadPressed']=function(){const _0x184c99=_0x3a331f;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x184c99(0x562)]);},Input[_0x3a331f(0x6f6)]=function(){const _0x677a94=_0x3a331f;return[0x25,0x26,0x27,0x28][_0x677a94(0x2f3)](this[_0x677a94(0x562)]);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6a3)]=Tilemap[_0x3a331f(0x499)][_0x3a331f(0x6cd)],Tilemap[_0x3a331f(0x499)][_0x3a331f(0x6cd)]=function(_0x37143f,_0x13a193,_0x1d4c94,_0x5dc129){const _0x341713=_0x3a331f;if($gameMap&&$gameMap[_0x341713(0x3ff)]())return;VisuMZ[_0x341713(0x3c0)][_0x341713(0x6a3)][_0x341713(0x2eb)](this,_0x37143f,_0x13a193,_0x1d4c94,_0x5dc129);},Tilemap[_0x3a331f(0x5e8)]['prototype'][_0x3a331f(0x69d)]=function(){const _0x541aa5=_0x3a331f;this['_destroyInternalTextures']();for(let _0x42427d=0x0;_0x42427d<Tilemap[_0x541aa5(0x36e)]['MAX_GL_TEXTURES'];_0x42427d++){const _0x738cea=new PIXI[(_0x541aa5(0x1d1))]();_0x738cea[_0x541aa5(0x6d0)](0x800,0x800),VisuMZ['CoreEngine'][_0x541aa5(0x6be)][_0x541aa5(0x271)][_0x541aa5(0x527)]&&(_0x738cea[_0x541aa5(0x60f)]=PIXI[_0x541aa5(0x3eb)]['NEAREST']),this[_0x541aa5(0x30a)]['push'](_0x738cea);}},WindowLayer['prototype']['isMaskingEnabled']=function(){const _0x88316b=_0x3a331f;return SceneManager&&SceneManager[_0x88316b(0x69e)]?SceneManager['_scene'][_0x88316b(0x4a1)]():!![];},VisuMZ['CoreEngine'][_0x3a331f(0x6b3)]=WindowLayer[_0x3a331f(0x499)][_0x3a331f(0x280)],WindowLayer[_0x3a331f(0x499)][_0x3a331f(0x280)]=function render(_0x22e21c){const _0x1d73aa=_0x3a331f;this[_0x1d73aa(0x5db)]()?VisuMZ['CoreEngine'][_0x1d73aa(0x6b3)]['call'](this,_0x22e21c):this[_0x1d73aa(0x1ef)](_0x22e21c);},WindowLayer[_0x3a331f(0x499)][_0x3a331f(0x1ef)]=function render(_0x1527f3){const _0x1927d2=_0x3a331f;if(!this[_0x1927d2(0x643)])return;const _0x94156b=new PIXI['Graphics'](),_0x431f83=_0x1527f3['gl'],_0x31b2ba=this['children'][_0x1927d2(0x5d0)]();_0x1527f3[_0x1927d2(0x5a0)]['forceStencil'](),_0x94156b[_0x1927d2(0x668)]=this[_0x1927d2(0x668)],_0x1527f3[_0x1927d2(0x5ec)]['flush'](),_0x431f83[_0x1927d2(0x6b2)](_0x431f83['STENCIL_TEST']);while(_0x31b2ba[_0x1927d2(0x2ed)]>0x0){const _0x37deef=_0x31b2ba[_0x1927d2(0x1f8)]();_0x37deef[_0x1927d2(0x48d)]&&_0x37deef[_0x1927d2(0x643)]&&_0x37deef[_0x1927d2(0x23f)]>0x0&&(_0x431f83[_0x1927d2(0x6f2)](_0x431f83[_0x1927d2(0x6b1)],0x0,~0x0),_0x431f83[_0x1927d2(0x6ac)](_0x431f83[_0x1927d2(0x354)],_0x431f83[_0x1927d2(0x354)],_0x431f83['KEEP']),_0x37deef[_0x1927d2(0x280)](_0x1527f3),_0x1527f3[_0x1927d2(0x5ec)]['flush'](),_0x94156b[_0x1927d2(0x53f)](),_0x431f83[_0x1927d2(0x6f2)](_0x431f83[_0x1927d2(0x470)],0x1,~0x0),_0x431f83['stencilOp'](_0x431f83['REPLACE'],_0x431f83[_0x1927d2(0x413)],_0x431f83['REPLACE']),_0x431f83[_0x1927d2(0x722)](_0x431f83[_0x1927d2(0x1f7)],_0x431f83['ONE']),_0x94156b[_0x1927d2(0x280)](_0x1527f3),_0x1527f3['batch']['flush'](),_0x431f83[_0x1927d2(0x722)](_0x431f83[_0x1927d2(0x3b7)],_0x431f83[_0x1927d2(0x25e)]));}_0x431f83[_0x1927d2(0x5af)](_0x431f83[_0x1927d2(0x733)]),_0x431f83[_0x1927d2(0x53f)](_0x431f83[_0x1927d2(0x4f8)]),_0x431f83[_0x1927d2(0x2af)](0x0),_0x1527f3[_0x1927d2(0x5ec)][_0x1927d2(0x4fe)]();for(const _0x33b414 of this['children']){!_0x33b414['_isWindow']&&_0x33b414[_0x1927d2(0x643)]&&_0x33b414[_0x1927d2(0x280)](_0x1527f3);}_0x1527f3[_0x1927d2(0x5ec)]['flush']();},DataManager[_0x3a331f(0x223)]=function(_0x4e25df){const _0x28244e=_0x3a331f;return this['isItem'](_0x4e25df)&&_0x4e25df[_0x28244e(0x264)]===0x2;},VisuMZ['CoreEngine'][_0x3a331f(0x325)]=DataManager[_0x3a331f(0x544)],DataManager[_0x3a331f(0x544)]=function(){const _0x26994f=_0x3a331f;VisuMZ[_0x26994f(0x3c0)][_0x26994f(0x325)][_0x26994f(0x2eb)](this),this['reservePlayTestNewGameCommonEvent'](),this[_0x26994f(0x2cd)]();},DataManager[_0x3a331f(0x2d5)]=function(){const _0xd341bf=_0x3a331f;if($gameTemp[_0xd341bf(0x393)]()){const _0x358983=VisuMZ[_0xd341bf(0x3c0)]['Settings'][_0xd341bf(0x271)][_0xd341bf(0x18f)];if(_0x358983>0x0)$gameTemp[_0xd341bf(0x27d)](_0x358983);}},DataManager[_0x3a331f(0x2cd)]=function(){const _0x5adbc8=_0x3a331f,_0x102a8f=VisuMZ[_0x5adbc8(0x3c0)][_0x5adbc8(0x6be)][_0x5adbc8(0x271)][_0x5adbc8(0x3ac)]||0x0;if(_0x102a8f>0x0)$gameTemp['reserveCommonEvent'](_0x102a8f);},TextManager[_0x3a331f(0x707)]=['','','','CANCEL','','',_0x3a331f(0x1f0),'',_0x3a331f(0x24e),_0x3a331f(0x235),'','','CLEAR','ENTER',_0x3a331f(0x714),'',_0x3a331f(0x5fb),_0x3a331f(0x1b3),_0x3a331f(0x690),'PAUSE','CAPSLOCK','KANA','EISU',_0x3a331f(0x2d8),_0x3a331f(0x1ca),_0x3a331f(0x68f),'',_0x3a331f(0x718),'CONVERT',_0x3a331f(0x735),_0x3a331f(0x238),'MODECHANGE',_0x3a331f(0x285),_0x3a331f(0x55e),_0x3a331f(0x40c),_0x3a331f(0x673),_0x3a331f(0x288),_0x3a331f(0x3ad),'UP','RIGHT',_0x3a331f(0x52c),'SELECT',_0x3a331f(0x4be),_0x3a331f(0x713),'PRINTSCREEN',_0x3a331f(0x2a2),'DELETE','','0','1','2','3','4','5','6','7','8','9',_0x3a331f(0x190),_0x3a331f(0x73a),_0x3a331f(0x203),_0x3a331f(0x64f),'GREATER_THAN',_0x3a331f(0x2b2),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x3a331f(0x28a),'',_0x3a331f(0x517),'',_0x3a331f(0x395),_0x3a331f(0x63d),_0x3a331f(0x597),_0x3a331f(0x1c2),_0x3a331f(0x49c),_0x3a331f(0x4c1),_0x3a331f(0x728),'NUMPAD6',_0x3a331f(0x635),'NUMPAD8','NUMPAD9','MULTIPLY','ADD',_0x3a331f(0x455),_0x3a331f(0x41a),_0x3a331f(0x454),_0x3a331f(0x414),'F1','F2','F3','F4','F5','F6','F7','F8','F9',_0x3a331f(0x2d0),_0x3a331f(0x535),'F12',_0x3a331f(0x628),_0x3a331f(0x518),_0x3a331f(0x383),_0x3a331f(0x1e4),_0x3a331f(0x2ab),'F18',_0x3a331f(0x4a9),_0x3a331f(0x1d2),_0x3a331f(0x255),_0x3a331f(0x506),_0x3a331f(0x347),'F24','','','','','','','','',_0x3a331f(0x19b),'SCROLL_LOCK',_0x3a331f(0x409),_0x3a331f(0x5f8),_0x3a331f(0x20f),_0x3a331f(0x6aa),'WIN_OEM_FJ_ROYA','','','','','','','','','','CIRCUMFLEX',_0x3a331f(0x1fa),_0x3a331f(0x6a4),'HASH',_0x3a331f(0x215),'PERCENT','AMPERSAND',_0x3a331f(0x5c2),_0x3a331f(0x737),_0x3a331f(0x543),_0x3a331f(0x67a),_0x3a331f(0x5c8),_0x3a331f(0x711),'HYPHEN_MINUS',_0x3a331f(0x2ac),_0x3a331f(0x335),'TILDE','','','','',_0x3a331f(0x4ae),_0x3a331f(0x583),_0x3a331f(0x1aa),'','',_0x3a331f(0x73a),_0x3a331f(0x64f),_0x3a331f(0x28b),'MINUS',_0x3a331f(0x531),_0x3a331f(0x6a1),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x3a331f(0x4b6),'BACK_SLASH',_0x3a331f(0x199),_0x3a331f(0x191),'','META',_0x3a331f(0x1a8),'',_0x3a331f(0x642),'WIN_ICO_00','',_0x3a331f(0x6b0),'','',_0x3a331f(0x434),'WIN_OEM_JUMP','WIN_OEM_PA1',_0x3a331f(0x2b0),_0x3a331f(0x5a6),'WIN_OEM_WSCTRL',_0x3a331f(0x2f8),_0x3a331f(0x370),_0x3a331f(0x56b),_0x3a331f(0x59a),'WIN_OEM_AUTO',_0x3a331f(0x3aa),_0x3a331f(0x28f),_0x3a331f(0x449),'CRSEL',_0x3a331f(0x230),_0x3a331f(0x55d),_0x3a331f(0x644),'ZOOM','','PA1',_0x3a331f(0x565),''],TextManager['buttonAssistOk']=VisuMZ['CoreEngine'][_0x3a331f(0x6be)][_0x3a331f(0x4ca)][_0x3a331f(0x459)],TextManager[_0x3a331f(0x336)]=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x4ca)][_0x3a331f(0x1ab)],TextManager[_0x3a331f(0x376)]=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x4ca)][_0x3a331f(0x573)],VisuMZ['CoreEngine'][_0x3a331f(0x5b3)]=TextManager['param'],TextManager[_0x3a331f(0x712)]=function(_0x33438e){const _0x3f8efc=_0x3a331f;return typeof _0x33438e==='number'?VisuMZ[_0x3f8efc(0x3c0)][_0x3f8efc(0x5b3)][_0x3f8efc(0x2eb)](this,_0x33438e):this['paramName'](_0x33438e);},TextManager[_0x3a331f(0x368)]=function(_0xdfa4a9){const _0x20fb31=_0x3a331f;_0xdfa4a9=String(_0xdfa4a9||'')[_0x20fb31(0x3c7)]();const _0xb2347f=VisuMZ[_0x20fb31(0x3c0)][_0x20fb31(0x6be)][_0x20fb31(0x4c3)];if(_0xdfa4a9==='MAXHP')return $dataSystem['terms'][_0x20fb31(0x2e7)][0x0];if(_0xdfa4a9===_0x20fb31(0x1c6))return $dataSystem['terms']['params'][0x1];if(_0xdfa4a9==='ATK')return $dataSystem[_0x20fb31(0x1bd)][_0x20fb31(0x2e7)][0x2];if(_0xdfa4a9===_0x20fb31(0x2b7))return $dataSystem[_0x20fb31(0x1bd)]['params'][0x3];if(_0xdfa4a9===_0x20fb31(0x2e1))return $dataSystem[_0x20fb31(0x1bd)]['params'][0x4];if(_0xdfa4a9===_0x20fb31(0x47b))return $dataSystem[_0x20fb31(0x1bd)]['params'][0x5];if(_0xdfa4a9===_0x20fb31(0x50e))return $dataSystem[_0x20fb31(0x1bd)][_0x20fb31(0x2e7)][0x6];if(_0xdfa4a9===_0x20fb31(0x5fd))return $dataSystem[_0x20fb31(0x1bd)]['params'][0x7];if(_0xdfa4a9===_0x20fb31(0x702))return _0xb2347f[_0x20fb31(0x438)];if(_0xdfa4a9===_0x20fb31(0x36c))return _0xb2347f[_0x20fb31(0x3cf)];if(_0xdfa4a9===_0x20fb31(0x6d2))return _0xb2347f[_0x20fb31(0x624)];if(_0xdfa4a9===_0x20fb31(0x32c))return _0xb2347f[_0x20fb31(0x566)];if(_0xdfa4a9==='MEV')return _0xb2347f['XParamVocab4'];if(_0xdfa4a9===_0x20fb31(0x5f4))return _0xb2347f[_0x20fb31(0x650)];if(_0xdfa4a9===_0x20fb31(0x2d4))return _0xb2347f['XParamVocab6'];if(_0xdfa4a9==='HRG')return _0xb2347f[_0x20fb31(0x4c8)];if(_0xdfa4a9===_0x20fb31(0x346))return _0xb2347f[_0x20fb31(0x29d)];if(_0xdfa4a9==='TRG')return _0xb2347f[_0x20fb31(0x3bf)];if(_0xdfa4a9==='TGR')return _0xb2347f[_0x20fb31(0x626)];if(_0xdfa4a9===_0x20fb31(0x194))return _0xb2347f['SParamVocab1'];if(_0xdfa4a9==='REC')return _0xb2347f['SParamVocab2'];if(_0xdfa4a9===_0x20fb31(0x39e))return _0xb2347f[_0x20fb31(0x460)];if(_0xdfa4a9==='MCR')return _0xb2347f[_0x20fb31(0x547)];if(_0xdfa4a9===_0x20fb31(0x397))return _0xb2347f['SParamVocab5'];if(_0xdfa4a9===_0x20fb31(0x45d))return _0xb2347f[_0x20fb31(0x6f0)];if(_0xdfa4a9===_0x20fb31(0x1d4))return _0xb2347f[_0x20fb31(0x2f5)];if(_0xdfa4a9===_0x20fb31(0x339))return _0xb2347f[_0x20fb31(0x671)];if(_0xdfa4a9===_0x20fb31(0x36b))return _0xb2347f[_0x20fb31(0x1c9)];if(VisuMZ['CoreEngine']['CustomParamNames'][_0xdfa4a9])return VisuMZ[_0x20fb31(0x3c0)][_0x20fb31(0x1c5)][_0xdfa4a9];return'';},TextManager['getInputButtonString']=function(_0x4132a6){const _0x582f87=_0x3a331f;if(_0x4132a6==='cancel')_0x4132a6=_0x582f87(0x576);let _0x3280cc=[];for(let _0xa0594b in Input['keyMapper']){_0xa0594b=Number(_0xa0594b);if(_0xa0594b>=0x60&&_0xa0594b<=0x69)continue;if([0x12,0x20][_0x582f87(0x2a5)](_0xa0594b))continue;_0x4132a6===Input[_0x582f87(0x2fe)][_0xa0594b]&&_0x3280cc[_0x582f87(0x2ae)](_0xa0594b);}for(let _0x5754fe=0x0;_0x5754fe<_0x3280cc[_0x582f87(0x2ed)];_0x5754fe++){_0x3280cc[_0x5754fe]=TextManager['stringKeyMap'][_0x3280cc[_0x5754fe]];}return this[_0x582f87(0x26b)](_0x3280cc);},TextManager[_0x3a331f(0x26b)]=function(_0x11c347){const _0x394361=_0x3a331f,_0x2d47cd=VisuMZ[_0x394361(0x3c0)][_0x394361(0x6be)][_0x394361(0x4ca)],_0x2a2263=_0x2d47cd[_0x394361(0x5ef)],_0x193798=_0x11c347['pop'](),_0x3bdfe8=_0x394361(0x32b)['format'](_0x193798);return _0x2d47cd[_0x3bdfe8]?_0x2d47cd[_0x3bdfe8]:_0x2a2263[_0x394361(0x5f7)](_0x193798);},TextManager[_0x3a331f(0x338)]=function(_0x4f9e93,_0x393958){const _0x3d540e=_0x3a331f,_0x125b68=VisuMZ[_0x3d540e(0x3c0)][_0x3d540e(0x6be)][_0x3d540e(0x4ca)],_0x37dd94=_0x125b68['MultiKeyFmt'],_0x2d0221=this['getInputButtonString'](_0x4f9e93),_0xbd56d=this[_0x3d540e(0x20b)](_0x393958);return _0x37dd94[_0x3d540e(0x5f7)](_0x2d0221,_0xbd56d);},VisuMZ[_0x3a331f(0x3c0)]['ColorManager_loadWindowskin']=ColorManager[_0x3a331f(0x3f1)],ColorManager[_0x3a331f(0x3f1)]=function(){const _0x50a6b1=_0x3a331f;VisuMZ['CoreEngine'][_0x50a6b1(0x4ec)]['call'](this),this[_0x50a6b1(0x388)]=this[_0x50a6b1(0x388)]||{};},ColorManager[_0x3a331f(0x224)]=function(_0x3c78d2,_0x507184){const _0xc04426=_0x3a331f;return _0x507184=String(_0x507184),this[_0xc04426(0x388)]=this['_colorCache']||{},_0x507184[_0xc04426(0x481)](/#(.*)/i)?this['_colorCache'][_0x3c78d2]='#%1'[_0xc04426(0x5f7)](String(RegExp['$1'])):this[_0xc04426(0x388)][_0x3c78d2]=this[_0xc04426(0x3da)](Number(_0x507184)),this[_0xc04426(0x388)][_0x3c78d2];},ColorManager[_0x3a331f(0x6f9)]=function(_0x401718){const _0x16a826=_0x3a331f;return _0x401718=String(_0x401718),_0x401718[_0x16a826(0x481)](/#(.*)/i)?_0x16a826(0x445)[_0x16a826(0x5f7)](String(RegExp['$1'])):this[_0x16a826(0x3da)](Number(_0x401718));},ColorManager[_0x3a331f(0x197)]=function(){const _0x2dbd90=_0x3a331f;this[_0x2dbd90(0x388)]={};},ColorManager[_0x3a331f(0x425)]=function(){const _0x5d378e=_0x3a331f,_0x32c4f2=_0x5d378e(0x612);this[_0x5d378e(0x388)]=this[_0x5d378e(0x388)]||{};if(this[_0x5d378e(0x388)][_0x32c4f2])return this[_0x5d378e(0x388)][_0x32c4f2];const _0x4dbde4=VisuMZ['CoreEngine']['Settings'][_0x5d378e(0x3db)]['ColorNormal'];return this[_0x5d378e(0x224)](_0x32c4f2,_0x4dbde4);},ColorManager[_0x3a331f(0x63c)]=function(){const _0x5ccbdf=_0x3a331f,_0x14ddf4=_0x5ccbdf(0x1fc);this[_0x5ccbdf(0x388)]=this[_0x5ccbdf(0x388)]||{};if(this['_colorCache'][_0x14ddf4])return this['_colorCache'][_0x14ddf4];const _0x14a2f9=VisuMZ['CoreEngine'][_0x5ccbdf(0x6be)]['Color'][_0x5ccbdf(0x21e)];return this['getColorDataFromPluginParameters'](_0x14ddf4,_0x14a2f9);},ColorManager[_0x3a331f(0x638)]=function(){const _0x44cea0=_0x3a331f,_0xeedd88=_0x44cea0(0x4b4);this[_0x44cea0(0x388)]=this[_0x44cea0(0x388)]||{};if(this[_0x44cea0(0x388)][_0xeedd88])return this[_0x44cea0(0x388)][_0xeedd88];const _0x202825=VisuMZ[_0x44cea0(0x3c0)][_0x44cea0(0x6be)]['Color']['ColorCrisis'];return this[_0x44cea0(0x224)](_0xeedd88,_0x202825);},ColorManager['deathColor']=function(){const _0x1d26cd=_0x3a331f,_0x34efc8=_0x1d26cd(0x44a);this[_0x1d26cd(0x388)]=this[_0x1d26cd(0x388)]||{};if(this[_0x1d26cd(0x388)][_0x34efc8])return this['_colorCache'][_0x34efc8];const _0xc2fa7b=VisuMZ[_0x1d26cd(0x3c0)][_0x1d26cd(0x6be)][_0x1d26cd(0x3db)][_0x1d26cd(0x550)];return this[_0x1d26cd(0x224)](_0x34efc8,_0xc2fa7b);},ColorManager[_0x3a331f(0x548)]=function(){const _0x1032dc=_0x3a331f,_0x2cff2a=_0x1032dc(0x525);this[_0x1032dc(0x388)]=this['_colorCache']||{};if(this[_0x1032dc(0x388)][_0x2cff2a])return this[_0x1032dc(0x388)][_0x2cff2a];const _0x26a7dc=VisuMZ[_0x1032dc(0x3c0)][_0x1032dc(0x6be)][_0x1032dc(0x3db)]['ColorGaugeBack'];return this['getColorDataFromPluginParameters'](_0x2cff2a,_0x26a7dc);},ColorManager['hpGaugeColor1']=function(){const _0x586f4=_0x3a331f,_0x3641f0=_0x586f4(0x3f0);this[_0x586f4(0x388)]=this[_0x586f4(0x388)]||{};if(this[_0x586f4(0x388)][_0x3641f0])return this[_0x586f4(0x388)][_0x3641f0];const _0x8d28f6=VisuMZ[_0x586f4(0x3c0)]['Settings'][_0x586f4(0x3db)][_0x586f4(0x492)];return this[_0x586f4(0x224)](_0x3641f0,_0x8d28f6);},ColorManager[_0x3a331f(0x3e5)]=function(){const _0x1bc63b=_0x3a331f,_0x9c4baa='_stored_hpGaugeColor2';this[_0x1bc63b(0x388)]=this[_0x1bc63b(0x388)]||{};if(this[_0x1bc63b(0x388)][_0x9c4baa])return this[_0x1bc63b(0x388)][_0x9c4baa];const _0x3c18a0=VisuMZ[_0x1bc63b(0x3c0)][_0x1bc63b(0x6be)][_0x1bc63b(0x3db)][_0x1bc63b(0x3ea)];return this[_0x1bc63b(0x224)](_0x9c4baa,_0x3c18a0);},ColorManager['mpGaugeColor1']=function(){const _0x5b659e=_0x3a331f,_0x2b8cdc='_stored_mpGaugeColor1';this[_0x5b659e(0x388)]=this[_0x5b659e(0x388)]||{};if(this[_0x5b659e(0x388)][_0x2b8cdc])return this[_0x5b659e(0x388)][_0x2b8cdc];const _0x4a815f=VisuMZ['CoreEngine'][_0x5b659e(0x6be)][_0x5b659e(0x3db)][_0x5b659e(0x2d3)];return this[_0x5b659e(0x224)](_0x2b8cdc,_0x4a815f);},ColorManager['mpGaugeColor2']=function(){const _0x7ebaa7=_0x3a331f,_0x2d967a=_0x7ebaa7(0x1dc);this['_colorCache']=this['_colorCache']||{};if(this[_0x7ebaa7(0x388)][_0x2d967a])return this['_colorCache'][_0x2d967a];const _0x5d1a65=VisuMZ[_0x7ebaa7(0x3c0)][_0x7ebaa7(0x6be)][_0x7ebaa7(0x3db)][_0x7ebaa7(0x3e3)];return this[_0x7ebaa7(0x224)](_0x2d967a,_0x5d1a65);},ColorManager[_0x3a331f(0x4aa)]=function(){const _0x2f507c=_0x3a331f,_0x1668dc=_0x2f507c(0x3f4);this['_colorCache']=this[_0x2f507c(0x388)]||{};if(this[_0x2f507c(0x388)][_0x1668dc])return this['_colorCache'][_0x1668dc];const _0x53bc3f=VisuMZ['CoreEngine'][_0x2f507c(0x6be)][_0x2f507c(0x3db)]['ColorMPCost'];return this['getColorDataFromPluginParameters'](_0x1668dc,_0x53bc3f);},ColorManager['powerUpColor']=function(){const _0xabf779=_0x3a331f,_0x4d5820='_stored_powerUpColor';this['_colorCache']=this[_0xabf779(0x388)]||{};if(this['_colorCache'][_0x4d5820])return this['_colorCache'][_0x4d5820];const _0x317fbe=VisuMZ[_0xabf779(0x3c0)][_0xabf779(0x6be)]['Color'][_0xabf779(0x500)];return this[_0xabf779(0x224)](_0x4d5820,_0x317fbe);},ColorManager['powerDownColor']=function(){const _0x37f787=_0x3a331f,_0x41c972=_0x37f787(0x555);this['_colorCache']=this[_0x37f787(0x388)]||{};if(this['_colorCache'][_0x41c972])return this[_0x37f787(0x388)][_0x41c972];const _0x32d900=VisuMZ[_0x37f787(0x3c0)][_0x37f787(0x6be)]['Color'][_0x37f787(0x240)];return this[_0x37f787(0x224)](_0x41c972,_0x32d900);},ColorManager['ctGaugeColor1']=function(){const _0x1368e8=_0x3a331f,_0x5c1bf4=_0x1368e8(0x5ca);this[_0x1368e8(0x388)]=this['_colorCache']||{};if(this[_0x1368e8(0x388)][_0x5c1bf4])return this[_0x1368e8(0x388)][_0x5c1bf4];const _0x1594c4=VisuMZ['CoreEngine'][_0x1368e8(0x6be)]['Color'][_0x1368e8(0x2df)];return this[_0x1368e8(0x224)](_0x5c1bf4,_0x1594c4);},ColorManager[_0x3a331f(0x323)]=function(){const _0x41974c=_0x3a331f,_0x4da95d='_stored_ctGaugeColor2';this[_0x41974c(0x388)]=this['_colorCache']||{};if(this[_0x41974c(0x388)][_0x4da95d])return this['_colorCache'][_0x4da95d];const _0x14f2da=VisuMZ[_0x41974c(0x3c0)][_0x41974c(0x6be)][_0x41974c(0x3db)][_0x41974c(0x681)];return this[_0x41974c(0x224)](_0x4da95d,_0x14f2da);},ColorManager[_0x3a331f(0x593)]=function(){const _0x36f8cf=_0x3a331f,_0x595dd7=_0x36f8cf(0x19e);this[_0x36f8cf(0x388)]=this[_0x36f8cf(0x388)]||{};if(this[_0x36f8cf(0x388)][_0x595dd7])return this['_colorCache'][_0x595dd7];const _0x5279b8=VisuMZ[_0x36f8cf(0x3c0)][_0x36f8cf(0x6be)]['Color'][_0x36f8cf(0x5a2)];return this[_0x36f8cf(0x224)](_0x595dd7,_0x5279b8);},ColorManager[_0x3a331f(0x39d)]=function(){const _0x25dcfc=_0x3a331f,_0x224923='_stored_tpGaugeColor2';this[_0x25dcfc(0x388)]=this[_0x25dcfc(0x388)]||{};if(this['_colorCache'][_0x224923])return this[_0x25dcfc(0x388)][_0x224923];const _0x50a27b=VisuMZ[_0x25dcfc(0x3c0)][_0x25dcfc(0x6be)][_0x25dcfc(0x3db)][_0x25dcfc(0x63f)];return this[_0x25dcfc(0x224)](_0x224923,_0x50a27b);},ColorManager[_0x3a331f(0x1c8)]=function(){const _0xc33eae=_0x3a331f,_0x1d15b0=_0xc33eae(0x73d);this[_0xc33eae(0x388)]=this['_colorCache']||{};if(this[_0xc33eae(0x388)][_0x1d15b0])return this[_0xc33eae(0x388)][_0x1d15b0];const _0x5b06c3=VisuMZ['CoreEngine'][_0xc33eae(0x6be)][_0xc33eae(0x3db)][_0xc33eae(0x3e7)];return this[_0xc33eae(0x224)](_0x1d15b0,_0x5b06c3);},ColorManager[_0x3a331f(0x640)]=function(){const _0x5f25a8=_0x3a331f,_0xf4008a=_0x5f25a8(0x5e4);this['_colorCache']=this[_0x5f25a8(0x388)]||{};if(this['_colorCache'][_0xf4008a])return this['_colorCache'][_0xf4008a];const _0x5e679f=VisuMZ[_0x5f25a8(0x3c0)][_0x5f25a8(0x6be)]['Color'][_0x5f25a8(0x3e7)];return this[_0x5f25a8(0x224)](_0xf4008a,_0x5e679f);},ColorManager[_0x3a331f(0x486)]=function(){const _0x3485dd=_0x3a331f,_0x2acadf=_0x3485dd(0x591);this[_0x3485dd(0x388)]=this['_colorCache']||{};if(this[_0x3485dd(0x388)][_0x2acadf])return this['_colorCache'][_0x2acadf];const _0x99c692=VisuMZ[_0x3485dd(0x3c0)][_0x3485dd(0x6be)]['Color']['ColorExpGauge1'];return this[_0x3485dd(0x224)](_0x2acadf,_0x99c692);},ColorManager[_0x3a331f(0x616)]=function(){const _0x3759b2=_0x3a331f,_0x167ac4='_stored_expGaugeColor2';this[_0x3759b2(0x388)]=this[_0x3759b2(0x388)]||{};if(this[_0x3759b2(0x388)][_0x167ac4])return this[_0x3759b2(0x388)][_0x167ac4];const _0x136d44=VisuMZ[_0x3759b2(0x3c0)][_0x3759b2(0x6be)][_0x3759b2(0x3db)][_0x3759b2(0x57e)];return this[_0x3759b2(0x224)](_0x167ac4,_0x136d44);},ColorManager[_0x3a331f(0x6b6)]=function(){const _0x22b566=_0x3a331f,_0x4d6deb=_0x22b566(0x5a9);this[_0x22b566(0x388)]=this['_colorCache']||{};if(this[_0x22b566(0x388)][_0x4d6deb])return this[_0x22b566(0x388)][_0x4d6deb];const _0xe2fc3f=VisuMZ[_0x22b566(0x3c0)][_0x22b566(0x6be)][_0x22b566(0x3db)][_0x22b566(0x46f)];return this[_0x22b566(0x224)](_0x4d6deb,_0xe2fc3f);},ColorManager[_0x3a331f(0x274)]=function(){const _0x93a4a5=_0x3a331f,_0x1476e3='_stored_maxLvGaugeColor2';this[_0x93a4a5(0x388)]=this['_colorCache']||{};if(this[_0x93a4a5(0x388)][_0x1476e3])return this[_0x93a4a5(0x388)][_0x1476e3];const _0xf18ff3=VisuMZ[_0x93a4a5(0x3c0)]['Settings']['Color'][_0x93a4a5(0x295)];return this[_0x93a4a5(0x224)](_0x1476e3,_0xf18ff3);},ColorManager[_0x3a331f(0x645)]=function(_0x46bad7){const _0x143cc0=_0x3a331f;return VisuMZ[_0x143cc0(0x3c0)][_0x143cc0(0x6be)][_0x143cc0(0x3db)][_0x143cc0(0x291)][_0x143cc0(0x2eb)](this,_0x46bad7);},ColorManager['mpColor']=function(_0x2821a7){const _0x19a79a=_0x3a331f;return VisuMZ['CoreEngine'][_0x19a79a(0x6be)][_0x19a79a(0x3db)]['ActorMPColor'][_0x19a79a(0x2eb)](this,_0x2821a7);},ColorManager[_0x3a331f(0x2a1)]=function(_0x1d9656){const _0x5696d7=_0x3a331f;return VisuMZ[_0x5696d7(0x3c0)][_0x5696d7(0x6be)]['Color']['ActorTPColor'][_0x5696d7(0x2eb)](this,_0x1d9656);},ColorManager['paramchangeTextColor']=function(_0x505aa5){const _0x2d37b7=_0x3a331f;return VisuMZ[_0x2d37b7(0x3c0)][_0x2d37b7(0x6be)][_0x2d37b7(0x3db)]['ParamChange'][_0x2d37b7(0x2eb)](this,_0x505aa5);},ColorManager['damageColor']=function(_0x349aae){const _0xb87b34=_0x3a331f;return VisuMZ[_0xb87b34(0x3c0)]['Settings']['Color'][_0xb87b34(0x472)][_0xb87b34(0x2eb)](this,_0x349aae);},ColorManager['outlineColor']=function(){const _0x3e8e00=_0x3a331f;return VisuMZ[_0x3e8e00(0x3c0)][_0x3e8e00(0x6be)][_0x3e8e00(0x3db)][_0x3e8e00(0x4b7)];},ColorManager[_0x3a331f(0x3dc)]=function(){const _0x160939=_0x3a331f;return VisuMZ[_0x160939(0x3c0)][_0x160939(0x6be)][_0x160939(0x3db)]['OutlineColorDmg']||'rgba(0,\x200,\x200,\x200.7)';},ColorManager[_0x3a331f(0x4d1)]=function(){const _0x4b862a=_0x3a331f;return VisuMZ[_0x4b862a(0x3c0)][_0x4b862a(0x6be)][_0x4b862a(0x3db)][_0x4b862a(0x516)]||_0x4b862a(0x5c4);},ColorManager[_0x3a331f(0x405)]=function(){const _0x3dadf7=_0x3a331f;return VisuMZ['CoreEngine']['Settings'][_0x3dadf7(0x3db)][_0x3dadf7(0x56a)];},ColorManager['dimColor2']=function(){const _0x29b9a4=_0x3a331f;return VisuMZ[_0x29b9a4(0x3c0)]['Settings'][_0x29b9a4(0x3db)][_0x29b9a4(0x4f6)];},ColorManager['itemBackColor1']=function(){const _0x4afe07=_0x3a331f;return VisuMZ[_0x4afe07(0x3c0)][_0x4afe07(0x6be)]['Color'][_0x4afe07(0x3b0)];},ColorManager[_0x3a331f(0x1c0)]=function(){const _0xb1d007=_0x3a331f;return VisuMZ[_0xb1d007(0x3c0)]['Settings'][_0xb1d007(0x3db)]['ItemBackColor2'];},SceneManager[_0x3a331f(0x4d3)]=[],VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x513)]=SceneManager[_0x3a331f(0x64b)],SceneManager[_0x3a331f(0x64b)]=function(){const _0x208f10=_0x3a331f;VisuMZ[_0x208f10(0x3c0)][_0x208f10(0x513)][_0x208f10(0x2eb)](this),this[_0x208f10(0x39b)]();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x72b)]=SceneManager[_0x3a331f(0x333)],SceneManager['onKeyDown']=function(_0x23059c){const _0xf3a9c3=_0x3a331f;if($gameTemp)this[_0xf3a9c3(0x23a)](_0x23059c);VisuMZ[_0xf3a9c3(0x3c0)]['SceneManager_onKeyDown'][_0xf3a9c3(0x2eb)](this,_0x23059c);},SceneManager[_0x3a331f(0x23a)]=function(_0x524e13){const _0x4ac386=_0x3a331f;if(!_0x524e13[_0x4ac386(0x3ae)]&&!_0x524e13[_0x4ac386(0x50f)])switch(_0x524e13[_0x4ac386(0x263)]){case 0x75:this[_0x4ac386(0x328)]();break;case 0x76:if(Input['isPressed'](_0x4ac386(0x1f8))||Input[_0x4ac386(0x611)]('ctrl'))return;this['playTestF7']();break;}},SceneManager[_0x3a331f(0x328)]=function(){const _0x400526=_0x3a331f;if($gameTemp[_0x400526(0x393)]()&&VisuMZ[_0x400526(0x3c0)][_0x400526(0x6be)][_0x400526(0x271)][_0x400526(0x653)]){ConfigManager[_0x400526(0x1b8)]!==0x0?(ConfigManager[_0x400526(0x48b)]=0x0,ConfigManager['bgsVolume']=0x0,ConfigManager['meVolume']=0x0,ConfigManager['seVolume']=0x0):(ConfigManager[_0x400526(0x48b)]=0x64,ConfigManager['bgsVolume']=0x64,ConfigManager[_0x400526(0x3a7)]=0x64,ConfigManager[_0x400526(0x1b8)]=0x64);ConfigManager[_0x400526(0x1c7)]();if(this['_scene'][_0x400526(0x4d7)]===Scene_Options){if(this[_0x400526(0x69e)][_0x400526(0x4db)])this[_0x400526(0x69e)][_0x400526(0x4db)][_0x400526(0x45e)]();if(this[_0x400526(0x69e)][_0x400526(0x3a9)])this[_0x400526(0x69e)][_0x400526(0x3a9)][_0x400526(0x45e)]();}}},SceneManager[_0x3a331f(0x28c)]=function(){const _0x22b394=_0x3a331f;$gameTemp[_0x22b394(0x393)]()&&VisuMZ['CoreEngine'][_0x22b394(0x6be)][_0x22b394(0x271)][_0x22b394(0x6fe)]&&($gameTemp[_0x22b394(0x201)]=!$gameTemp[_0x22b394(0x201)]);},SceneManager[_0x3a331f(0x39b)]=function(){const _0x40a884=_0x3a331f;this['_sideButtonLayout']=![],this[_0x40a884(0x6cc)]=!VisuMZ['CoreEngine'][_0x40a884(0x6be)]['UI'][_0x40a884(0x708)];},SceneManager[_0x3a331f(0x1b9)]=function(_0x568c46){const _0x510089=_0x3a331f;VisuMZ['CoreEngine'][_0x510089(0x6be)]['UI'][_0x510089(0x6ed)]&&(this[_0x510089(0x53b)]=_0x568c46);},SceneManager[_0x3a331f(0x348)]=function(){const _0x26928f=_0x3a331f;return this[_0x26928f(0x53b)];},SceneManager['areButtonsHidden']=function(){const _0x96941=_0x3a331f;return this[_0x96941(0x6cc)];},SceneManager[_0x3a331f(0x34a)]=function(){const _0x138c30=_0x3a331f;return this[_0x138c30(0x51e)]()||this['isSideButtonLayout']();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x512)]=SceneManager['isGameActive'],SceneManager['isGameActive']=function(){const _0x4d3de9=_0x3a331f;return VisuMZ[_0x4d3de9(0x3c0)][_0x4d3de9(0x6be)][_0x4d3de9(0x271)][_0x4d3de9(0x732)]?VisuMZ[_0x4d3de9(0x3c0)][_0x4d3de9(0x512)][_0x4d3de9(0x2eb)](this):!![];},SceneManager[_0x3a331f(0x42a)]=function(_0x39d0f9){const _0x6b6d0f=_0x3a331f;if(_0x39d0f9 instanceof Error)this[_0x6b6d0f(0x475)](_0x39d0f9);else _0x39d0f9 instanceof Array&&_0x39d0f9[0x0]===_0x6b6d0f(0x5d1)?this[_0x6b6d0f(0x667)](_0x39d0f9):this[_0x6b6d0f(0x704)](_0x39d0f9);this['stop']();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x519)]=BattleManager['processEscape'],BattleManager['processEscape']=function(){const _0x519845=_0x3a331f;if(VisuMZ[_0x519845(0x3c0)]['Settings'][_0x519845(0x271)]['EscapeAlways'])this['processAlwaysEscape']();else return VisuMZ[_0x519845(0x3c0)][_0x519845(0x519)][_0x519845(0x2eb)](this);},BattleManager[_0x3a331f(0x2e3)]=function(){const _0x101397=_0x3a331f;return $gameParty[_0x101397(0x1eb)](),SoundManager[_0x101397(0x381)](),this[_0x101397(0x205)](),!![];},BattleManager['isTpb']=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x3a331f(0x66f)]=function(){const _0x13aedd=_0x3a331f;return $gameSystem[_0x13aedd(0x47a)]()===0x1;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x542)]=Game_Temp['prototype']['initialize'],Game_Temp[_0x3a331f(0x499)][_0x3a331f(0x64b)]=function(){const _0x4158f5=_0x3a331f;VisuMZ[_0x4158f5(0x3c0)][_0x4158f5(0x542)][_0x4158f5(0x2eb)](this),this[_0x4158f5(0x4a6)](),this['createFauxAnimationQueue']();},Game_Temp['prototype'][_0x3a331f(0x4a6)]=function(){const _0x4b35a4=_0x3a331f;VisuMZ[_0x4b35a4(0x3c0)][_0x4b35a4(0x6be)][_0x4b35a4(0x271)][_0x4b35a4(0x5c0)]&&(this[_0x4b35a4(0x503)]=![]);},Game_Temp[_0x3a331f(0x499)][_0x3a331f(0x402)]=function(){const _0x256ae0=_0x3a331f;this[_0x256ae0(0x326)]=[];},Game_Temp[_0x3a331f(0x499)][_0x3a331f(0x687)]=function(_0x3f5bcd,_0x584b70,_0xc1356c,_0x17bb8a){const _0x368f34=_0x3a331f;if(!this[_0x368f34(0x3d5)]())return;_0xc1356c=_0xc1356c||![],_0x17bb8a=_0x17bb8a||![];if($dataAnimations[_0x584b70]){const _0x55f6fd={'targets':_0x3f5bcd,'animationId':_0x584b70,'mirror':_0xc1356c,'mute':_0x17bb8a};this['_fauxAnimationQueue'][_0x368f34(0x2ae)](_0x55f6fd);for(const _0x14935b of _0x3f5bcd){_0x14935b[_0x368f34(0x670)]&&_0x14935b[_0x368f34(0x670)]();}}},Game_Temp['prototype']['showFauxAnimations']=function(){return!![];},Game_Temp[_0x3a331f(0x499)][_0x3a331f(0x6f7)]=function(){const _0x36b66a=_0x3a331f;return this[_0x36b66a(0x326)]['shift']();},Game_Temp[_0x3a331f(0x499)][_0x3a331f(0x423)]=function(_0x1e0f34){const _0x323806=_0x3a331f;this[_0x323806(0x546)]=_0x1e0f34;},Game_Temp[_0x3a331f(0x499)][_0x3a331f(0x2fa)]=function(){const _0x4fc275=_0x3a331f;return this[_0x4fc275(0x546)];},Game_Temp['prototype']['clearForcedGameTroopSettingsCoreEngine']=function(){const _0x44670f=_0x3a331f;this[_0x44670f(0x6ad)]=undefined,this[_0x44670f(0x3b8)]=undefined;},Game_Temp[_0x3a331f(0x499)][_0x3a331f(0x70a)]=function(_0x67658f){const _0x46b2b4=_0x3a331f;$gameMap&&$dataMap&&$dataMap[_0x46b2b4(0x598)]&&this[_0x46b2b4(0x398)]($dataMap[_0x46b2b4(0x598)]);const _0x497131=$dataTroops[_0x67658f];_0x497131&&this[_0x46b2b4(0x398)](_0x497131[_0x46b2b4(0x2a8)]);},Game_Temp[_0x3a331f(0x499)][_0x3a331f(0x398)]=function(_0x256b9a){const _0x4cb279=_0x3a331f;if(!_0x256b9a)return;if(_0x256b9a[_0x4cb279(0x481)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x256b9a[_0x4cb279(0x481)](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this[_0x4cb279(0x6ad)]='SV';else{if(_0x256b9a[_0x4cb279(0x481)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x4c4100=String(RegExp['$1']);if(_0x4c4100[_0x4cb279(0x481)](/(?:FRONTVIEW|FRONT VIEW|FV)/i))this[_0x4cb279(0x6ad)]='FV';else _0x4c4100['match'](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this[_0x4cb279(0x6ad)]='SV');}}}if(_0x256b9a['match'](/<(?:DTB)>/i))this[_0x4cb279(0x3b8)]=0x0;else{if(_0x256b9a[_0x4cb279(0x481)](/<(?:TPB|ATB)[ ]ACTIVE>/i))this[_0x4cb279(0x3b8)]=0x1;else{if(_0x256b9a[_0x4cb279(0x481)](/<(?:TPB|ATB)[ ]WAIT>/i))this[_0x4cb279(0x3b8)]=0x2;else{if(_0x256b9a[_0x4cb279(0x481)](/<(?:CTB)>/i))Imported['VisuMZ_2_BattleSystemCTB']&&(this['_forcedBattleSys']=_0x4cb279(0x677));else{if(_0x256b9a[_0x4cb279(0x481)](/<(?:STB)>/i))Imported[_0x4cb279(0x2f2)]&&(this[_0x4cb279(0x3b8)]=_0x4cb279(0x658));else{if(_0x256b9a[_0x4cb279(0x481)](/<(?:BTB)>/i))Imported[_0x4cb279(0x3a6)]&&(this[_0x4cb279(0x3b8)]=_0x4cb279(0x594));else{if(_0x256b9a['match'](/<(?:FTB)>/i))Imported[_0x4cb279(0x5c7)]&&(this['_forcedBattleSys']=_0x4cb279(0x6d7));else{if(_0x256b9a[_0x4cb279(0x481)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2d5969=String(RegExp['$1']);if(_0x2d5969[_0x4cb279(0x481)](/DTB/i))this[_0x4cb279(0x3b8)]=0x0;else{if(_0x2d5969[_0x4cb279(0x481)](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x4cb279(0x3b8)]=0x1;else{if(_0x2d5969[_0x4cb279(0x481)](/(?:TPB|ATB)[ ]WAIT/i))this[_0x4cb279(0x3b8)]=0x2;else{if(_0x2d5969[_0x4cb279(0x481)](/CTB/i))Imported[_0x4cb279(0x479)]&&(this[_0x4cb279(0x3b8)]=_0x4cb279(0x677));else{if(_0x2d5969[_0x4cb279(0x481)](/STB/i))Imported[_0x4cb279(0x2f2)]&&(this['_forcedBattleSys']=_0x4cb279(0x658));else{if(_0x2d5969[_0x4cb279(0x481)](/BTB/i))Imported[_0x4cb279(0x3a6)]&&(this[_0x4cb279(0x3b8)]=_0x4cb279(0x594));else _0x2d5969[_0x4cb279(0x481)](/FTB/i)&&(Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x4cb279(0x3b8)]=_0x4cb279(0x6d7)));}}}}}}}}}}}}}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6d3)]=Game_System['prototype'][_0x3a331f(0x64b)],Game_System[_0x3a331f(0x499)][_0x3a331f(0x64b)]=function(){const _0xa01010=_0x3a331f;VisuMZ['CoreEngine'][_0xa01010(0x6d3)]['call'](this),this[_0xa01010(0x4bc)]();},Game_System[_0x3a331f(0x499)][_0x3a331f(0x4bc)]=function(){const _0x18c2b4=_0x3a331f;this['_CoreEngineSettings']={'SideView':$dataSystem[_0x18c2b4(0x3cb)],'BattleSystem':this[_0x18c2b4(0x19c)](),'FontSize':$dataSystem[_0x18c2b4(0x337)][_0x18c2b4(0x57b)],'Padding':0xc};},Game_System[_0x3a331f(0x499)][_0x3a331f(0x6ef)]=function(){const _0x22d06e=_0x3a331f;if($gameTemp[_0x22d06e(0x6ad)]==='SV')return!![];else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this[_0x22d06e(0x4eb)]===undefined)this[_0x22d06e(0x4bc)]();if(this['_CoreEngineSettings'][_0x22d06e(0x613)]===undefined)this[_0x22d06e(0x4bc)]();return this['_CoreEngineSettings'][_0x22d06e(0x613)];},Game_System[_0x3a331f(0x499)][_0x3a331f(0x1d8)]=function(_0xb1e4e3){const _0x225849=_0x3a331f;if(this[_0x225849(0x4eb)]===undefined)this[_0x225849(0x4bc)]();if(this['_CoreEngineSettings'][_0x225849(0x613)]===undefined)this[_0x225849(0x4bc)]();this[_0x225849(0x4eb)][_0x225849(0x613)]=_0xb1e4e3;},Game_System['prototype'][_0x3a331f(0x2c5)]=function(){const _0x393564=_0x3a331f;if(this['_CoreEngineSettings']===undefined)this[_0x393564(0x4bc)]();this[_0x393564(0x4eb)][_0x393564(0x589)]=this[_0x393564(0x19c)]();},Game_System[_0x3a331f(0x499)][_0x3a331f(0x19c)]=function(){const _0x262f5d=_0x3a331f,_0x25f0ed=(VisuMZ[_0x262f5d(0x3c0)][_0x262f5d(0x6be)][_0x262f5d(0x589)]||'DATABASE')[_0x262f5d(0x3c7)]()[_0x262f5d(0x41d)]();return VisuMZ[_0x262f5d(0x3c0)][_0x262f5d(0x729)](_0x25f0ed);},Game_System[_0x3a331f(0x499)][_0x3a331f(0x47a)]=function(){const _0x225f37=_0x3a331f;if($gameTemp[_0x225f37(0x3b8)]!==undefined)return $gameTemp[_0x225f37(0x3b8)];if(this[_0x225f37(0x4eb)]===undefined)this[_0x225f37(0x4bc)]();if(this[_0x225f37(0x4eb)][_0x225f37(0x589)]===undefined)this[_0x225f37(0x2c5)]();return this[_0x225f37(0x4eb)][_0x225f37(0x589)];},Game_System[_0x3a331f(0x499)][_0x3a331f(0x48e)]=function(_0x49d2f6){const _0x53e852=_0x3a331f;if(this[_0x53e852(0x4eb)]===undefined)this[_0x53e852(0x4bc)]();if(this['_CoreEngineSettings']['BattleSystem']===undefined)this[_0x53e852(0x2c5)]();this['_CoreEngineSettings'][_0x53e852(0x589)]=_0x49d2f6;},Game_System[_0x3a331f(0x499)]['mainFontSize']=function(){const _0xd2e1c9=_0x3a331f;if(this[_0xd2e1c9(0x4eb)]===undefined)this[_0xd2e1c9(0x4bc)]();if(this[_0xd2e1c9(0x4eb)][_0xd2e1c9(0x465)]===undefined)this[_0xd2e1c9(0x4bc)]();return this[_0xd2e1c9(0x4eb)][_0xd2e1c9(0x465)];},Game_System['prototype'][_0x3a331f(0x33a)]=function(_0x24f451){const _0x41e9fd=_0x3a331f;if(this[_0x41e9fd(0x4eb)]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x41e9fd(0x734)]===undefined)this['initCoreEngine']();this[_0x41e9fd(0x4eb)]['FontSize']=_0x24f451;},Game_System[_0x3a331f(0x499)][_0x3a331f(0x6c0)]=function(){const _0x468842=_0x3a331f;if(this[_0x468842(0x4eb)]===undefined)this[_0x468842(0x4bc)]();if(this[_0x468842(0x4eb)]['Padding']===undefined)this['initCoreEngine']();return this[_0x468842(0x4eb)]['Padding'];},Game_System[_0x3a331f(0x499)][_0x3a331f(0x63b)]=function(_0x5b9acd){const _0x123c26=_0x3a331f;if(this['_CoreEngineSettings']===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x123c26(0x734)]===undefined)this[_0x123c26(0x4bc)]();this[_0x123c26(0x4eb)]['Padding']=_0x5b9acd;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x2c8)]=Game_Screen[_0x3a331f(0x499)][_0x3a331f(0x64b)],Game_Screen[_0x3a331f(0x499)][_0x3a331f(0x64b)]=function(){const _0x13b820=_0x3a331f;VisuMZ[_0x13b820(0x3c0)][_0x13b820(0x2c8)][_0x13b820(0x2eb)](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x3a331f(0x499)][_0x3a331f(0x683)]=function(){const _0x1a0779=_0x3a331f,_0x209b10=VisuMZ[_0x1a0779(0x3c0)][_0x1a0779(0x6be)][_0x1a0779(0x5f1)];this[_0x1a0779(0x59b)]=_0x209b10?.[_0x1a0779(0x5f0)]||_0x1a0779(0x545);},Game_Screen[_0x3a331f(0x499)][_0x3a331f(0x4f5)]=function(){const _0x417a35=_0x3a331f;if(this[_0x417a35(0x59b)]===undefined)this[_0x417a35(0x683)]();return this[_0x417a35(0x59b)];},Game_Screen[_0x3a331f(0x499)][_0x3a331f(0x701)]=function(_0xebcd44){const _0x4063b0=_0x3a331f;if(this[_0x4063b0(0x59b)]===undefined)this[_0x4063b0(0x683)]();this[_0x4063b0(0x59b)]=_0xebcd44[_0x4063b0(0x318)]()[_0x4063b0(0x41d)]();},Game_Picture['prototype'][_0x3a331f(0x716)]=function(){const _0x1881b7=_0x3a331f;if($gameParty[_0x1881b7(0x439)]())return![];return this[_0x1881b7(0x2a8)]()&&this[_0x1881b7(0x2a8)]()['charAt'](0x0)==='!';},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x34e)]=Game_Picture[_0x3a331f(0x499)]['x'],Game_Picture[_0x3a331f(0x499)]['x']=function(){const _0x4505a9=_0x3a331f;return this[_0x4505a9(0x716)]()?this[_0x4505a9(0x67b)]():VisuMZ[_0x4505a9(0x3c0)]['Game_Picture_x'][_0x4505a9(0x2eb)](this);},Game_Picture['prototype'][_0x3a331f(0x67b)]=function(){const _0x5d02ac=_0x3a331f,_0x200d15=$gameMap['displayX']()*$gameMap[_0x5d02ac(0x61a)]();return this['_x']-_0x200d15;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x5bf)]=Game_Picture['prototype']['y'],Game_Picture['prototype']['y']=function(){const _0x320d34=_0x3a331f;return this[_0x320d34(0x716)]()?this['yScrollLinkedOffset']():VisuMZ[_0x320d34(0x3c0)]['Game_Picture_y'][_0x320d34(0x2eb)](this);},Game_Picture[_0x3a331f(0x499)]['yScrollLinkedOffset']=function(){const _0x1c21d4=_0x3a331f,_0x32c65f=$gameMap[_0x1c21d4(0x651)]()*$gameMap['tileHeight']();return this['_y']-_0x32c65f;},Game_Picture[_0x3a331f(0x499)][_0x3a331f(0x3dd)]=function(_0x323231){const _0x382bf6=_0x3a331f;this[_0x382bf6(0x236)]=_0x323231;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x1cc)]=Game_Picture['prototype'][_0x3a331f(0x6b9)],Game_Picture[_0x3a331f(0x499)][_0x3a331f(0x6b9)]=function(_0x393d22){const _0x378158=_0x3a331f;return this['_coreEasingType']=this[_0x378158(0x236)]||0x0,[0x0,0x1,0x2,0x3][_0x378158(0x2a5)](this[_0x378158(0x236)])?VisuMZ['CoreEngine']['Game_Picture_calcEasing'][_0x378158(0x2eb)](this,_0x393d22):VisuMZ[_0x378158(0x5d3)](_0x393d22,this[_0x378158(0x236)]);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x618)]=Game_Action[_0x3a331f(0x499)]['itemHit'],Game_Action[_0x3a331f(0x499)]['itemHit']=function(_0x3e600c){const _0x5cdd58=_0x3a331f;return VisuMZ[_0x5cdd58(0x3c0)][_0x5cdd58(0x6be)][_0x5cdd58(0x271)]['ImprovedAccuracySystem']?this[_0x5cdd58(0x1e1)](_0x3e600c):VisuMZ[_0x5cdd58(0x3c0)][_0x5cdd58(0x618)][_0x5cdd58(0x2eb)](this,_0x3e600c);},Game_Action[_0x3a331f(0x499)][_0x3a331f(0x1e1)]=function(_0x34c203){const _0x5d3e77=_0x3a331f,_0x373e05=this[_0x5d3e77(0x55b)](_0x34c203),_0x5d2f=this[_0x5d3e77(0x3ca)](_0x34c203),_0x184110=this[_0x5d3e77(0x6de)](_0x34c203);return _0x373e05*(_0x5d2f-_0x184110);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x72e)]=Game_Action[_0x3a331f(0x499)]['itemEva'],Game_Action['prototype']['itemEva']=function(_0x5124ec){const _0x4b244=_0x3a331f;return VisuMZ[_0x4b244(0x3c0)]['Settings'][_0x4b244(0x271)][_0x4b244(0x3a4)]?0x0:VisuMZ['CoreEngine'][_0x4b244(0x72e)][_0x4b244(0x2eb)](this,_0x5124ec);},Game_Action[_0x3a331f(0x499)][_0x3a331f(0x55b)]=function(_0x18a8b2){const _0x512b12=_0x3a331f;return this['item']()[_0x512b12(0x67f)]*0.01;},Game_Action['prototype'][_0x3a331f(0x3ca)]=function(_0x582f6e){const _0x2c4eb5=_0x3a331f;if(VisuMZ['CoreEngine']['Settings'][_0x2c4eb5(0x271)][_0x2c4eb5(0x67d)]&&this[_0x2c4eb5(0x33b)]())return 0x1;return this[_0x2c4eb5(0x34b)]()?VisuMZ[_0x2c4eb5(0x3c0)][_0x2c4eb5(0x6be)][_0x2c4eb5(0x271)][_0x2c4eb5(0x67d)]&&this['subject']()[_0x2c4eb5(0x3fd)]()?this['subject']()['hit']+0.05:this[_0x2c4eb5(0x375)]()[_0x2c4eb5(0x682)]:0x1;},Game_Action[_0x3a331f(0x499)][_0x3a331f(0x6de)]=function(_0x4fadce){const _0x1e8f18=_0x3a331f;if(this[_0x1e8f18(0x375)]()[_0x1e8f18(0x3fd)]()===_0x4fadce[_0x1e8f18(0x3fd)]())return 0x0;if(this['isPhysical']())return VisuMZ[_0x1e8f18(0x3c0)][_0x1e8f18(0x6be)][_0x1e8f18(0x271)][_0x1e8f18(0x67d)]&&_0x4fadce[_0x1e8f18(0x57f)]()?_0x4fadce[_0x1e8f18(0x674)]-0.05:_0x4fadce['eva'];else return this[_0x1e8f18(0x537)]()?_0x4fadce[_0x1e8f18(0x507)]:0x0;},VisuMZ['CoreEngine'][_0x3a331f(0x1b6)]=Game_Action['prototype'][_0x3a331f(0x4df)],Game_Action[_0x3a331f(0x499)][_0x3a331f(0x4df)]=function(_0x57f28d){const _0x4389c0=_0x3a331f;VisuMZ[_0x4389c0(0x3c0)][_0x4389c0(0x1b6)][_0x4389c0(0x2eb)](this,_0x57f28d);if(VisuMZ[_0x4389c0(0x3c0)][_0x4389c0(0x6be)][_0x4389c0(0x271)][_0x4389c0(0x3a4)])return;const _0x1bdf24=_0x57f28d[_0x4389c0(0x6da)]();_0x1bdf24[_0x4389c0(0x4e8)]&&(0x1-this[_0x4389c0(0x569)](_0x57f28d)>this[_0x4389c0(0x557)](_0x57f28d)&&(_0x1bdf24[_0x4389c0(0x4e8)]=![],_0x1bdf24[_0x4389c0(0x239)]=!![]));},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x222)]=Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x489)],Game_BattlerBase[_0x3a331f(0x499)]['initMembers']=function(){const _0x68bc56=_0x3a331f;this['_cache']={},VisuMZ[_0x68bc56(0x3c0)]['Game_BattlerBase_initMembers'][_0x68bc56(0x2eb)](this);},VisuMZ['CoreEngine'][_0x3a331f(0x4c6)]=Game_BattlerBase[_0x3a331f(0x499)]['refresh'],Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x45e)]=function(){const _0x27d3e7=_0x3a331f;this[_0x27d3e7(0x731)]={},VisuMZ[_0x27d3e7(0x3c0)][_0x27d3e7(0x4c6)][_0x27d3e7(0x2eb)](this);},Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x27b)]=function(_0x1aa904){const _0x4a2576=_0x3a331f;return this[_0x4a2576(0x731)]=this[_0x4a2576(0x731)]||{},this[_0x4a2576(0x731)][_0x1aa904]!==undefined;},Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x1a9)]=function(_0x51f3e4){const _0x13c027=_0x3a331f,_0x57d233=(_0x55410b,_0x55a24e)=>{const _0x1744bd=_0x5a4b;if(!_0x55a24e)return _0x55410b;if(_0x55a24e[_0x1744bd(0x598)]['match'](VisuMZ[_0x1744bd(0x3c0)][_0x1744bd(0x4ed)][_0x1744bd(0x1a9)][_0x51f3e4])){var _0x15e65c=Number(RegExp['$1']);_0x55410b+=_0x15e65c;}if(_0x55a24e[_0x1744bd(0x598)][_0x1744bd(0x481)](VisuMZ[_0x1744bd(0x3c0)][_0x1744bd(0x4ed)][_0x1744bd(0x4ee)][_0x51f3e4])){var _0x43b3e8=String(RegExp['$1']);try{_0x55410b+=eval(_0x43b3e8);}catch(_0x532240){if($gameTemp['isPlaytest']())console[_0x1744bd(0x5da)](_0x532240);}}return _0x55410b;};return this[_0x13c027(0x52f)]()[_0x13c027(0x198)](_0x57d233,this[_0x13c027(0x1f4)][_0x51f3e4]);},Game_BattlerBase[_0x3a331f(0x499)]['paramMax']=function(_0x105805){const _0x14b861=_0x3a331f;var _0x56bffd='Basic'+(this[_0x14b861(0x3fd)]()?'Actor':_0x14b861(0x6cf))+_0x14b861(0x5c6)+_0x105805;if(this[_0x14b861(0x27b)](_0x56bffd))return this[_0x14b861(0x731)][_0x56bffd];this['_cache'][_0x56bffd]=eval(VisuMZ[_0x14b861(0x3c0)]['Settings'][_0x14b861(0x4c3)][_0x56bffd]);const _0x24b78f=(_0x1ee393,_0x2398bb)=>{const _0x2fe1a6=_0x14b861;if(!_0x2398bb)return _0x1ee393;if(_0x2398bb[_0x2fe1a6(0x598)][_0x2fe1a6(0x481)](VisuMZ[_0x2fe1a6(0x3c0)][_0x2fe1a6(0x4ed)]['paramMax'][_0x105805])){var _0x4b1f2b=Number(RegExp['$1']);if(_0x4b1f2b===0x0)_0x4b1f2b=Number[_0x2fe1a6(0x294)];_0x1ee393=Math[_0x2fe1a6(0x6e9)](_0x1ee393,_0x4b1f2b);}if(_0x2398bb[_0x2fe1a6(0x598)]['match'](VisuMZ[_0x2fe1a6(0x3c0)][_0x2fe1a6(0x4ed)][_0x2fe1a6(0x26c)][_0x105805])){var _0x466951=String(RegExp['$1']);try{_0x1ee393=Math[_0x2fe1a6(0x6e9)](_0x1ee393,Number(eval(_0x466951)));}catch(_0x215929){if($gameTemp['isPlaytest']())console['log'](_0x215929);}}return _0x1ee393;};if(this['_cache'][_0x56bffd]===0x0)this[_0x14b861(0x731)][_0x56bffd]=Number[_0x14b861(0x294)];return this[_0x14b861(0x731)][_0x56bffd]=this[_0x14b861(0x52f)]()[_0x14b861(0x198)](_0x24b78f,this[_0x14b861(0x731)][_0x56bffd]),this[_0x14b861(0x731)][_0x56bffd];},Game_BattlerBase[_0x3a331f(0x499)]['paramRate']=function(_0x26ecfe){const _0x2b522a=_0x3a331f,_0x423d17=this['traitsPi'](Game_BattlerBase[_0x2b522a(0x436)],_0x26ecfe),_0x275a37=(_0x8a453d,_0x1cf1fb)=>{const _0x79fe56=_0x2b522a;if(!_0x1cf1fb)return _0x8a453d;if(_0x1cf1fb[_0x79fe56(0x598)][_0x79fe56(0x481)](VisuMZ[_0x79fe56(0x3c0)][_0x79fe56(0x4ed)][_0x79fe56(0x6db)][_0x26ecfe])){var _0x2b6729=Number(RegExp['$1'])/0x64;_0x8a453d*=_0x2b6729;}if(_0x1cf1fb['note']['match'](VisuMZ['CoreEngine'][_0x79fe56(0x4ed)]['paramRate2'][_0x26ecfe])){var _0x2b6729=Number(RegExp['$1']);_0x8a453d*=_0x2b6729;}if(_0x1cf1fb[_0x79fe56(0x598)][_0x79fe56(0x481)](VisuMZ[_0x79fe56(0x3c0)][_0x79fe56(0x4ed)][_0x79fe56(0x2c2)][_0x26ecfe])){var _0x1ae45c=String(RegExp['$1']);try{_0x8a453d*=eval(_0x1ae45c);}catch(_0x45d112){if($gameTemp[_0x79fe56(0x393)]())console[_0x79fe56(0x5da)](_0x45d112);}}return _0x8a453d;};return this['traitObjects']()[_0x2b522a(0x198)](_0x275a37,_0x423d17);},Game_BattlerBase[_0x3a331f(0x499)]['paramFlatBonus']=function(_0x512723){const _0x50f474=_0x3a331f,_0x29a73d=(_0x5a1768,_0x31e6c4)=>{const _0x13d1e0=_0x5a4b;if(!_0x31e6c4)return _0x5a1768;if(_0x31e6c4[_0x13d1e0(0x598)]['match'](VisuMZ['CoreEngine']['RegExp'][_0x13d1e0(0x627)][_0x512723])){var _0x42edda=Number(RegExp['$1']);_0x5a1768+=_0x42edda;}if(_0x31e6c4['note']['match'](VisuMZ[_0x13d1e0(0x3c0)]['RegExp']['paramFlatJS'][_0x512723])){var _0x4450d1=String(RegExp['$1']);try{_0x5a1768+=eval(_0x4450d1);}catch(_0x2b8e0){if($gameTemp['isPlaytest']())console[_0x13d1e0(0x5da)](_0x2b8e0);}}return _0x5a1768;};return this[_0x50f474(0x52f)]()[_0x50f474(0x198)](_0x29a73d,0x0);},Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x712)]=function(_0x2d7677){const _0x709c3e=_0x3a331f;let _0x4badd1=_0x709c3e(0x712)+_0x2d7677+_0x709c3e(0x6fb);if(this[_0x709c3e(0x27b)](_0x4badd1))return this[_0x709c3e(0x731)][_0x4badd1];return this['_cache'][_0x4badd1]=Math[_0x709c3e(0x469)](VisuMZ['CoreEngine'][_0x709c3e(0x6be)][_0x709c3e(0x4c3)][_0x709c3e(0x5ea)][_0x709c3e(0x2eb)](this,_0x2d7677)),this[_0x709c3e(0x731)][_0x4badd1];},Game_BattlerBase['prototype'][_0x3a331f(0x608)]=function(_0x7beb64){const _0x531bf5=_0x3a331f,_0x2b6f48=(_0x2d2c46,_0x58b09d)=>{const _0x4316e0=_0x5a4b;if(!_0x58b09d)return _0x2d2c46;if(_0x58b09d['note'][_0x4316e0(0x481)](VisuMZ[_0x4316e0(0x3c0)][_0x4316e0(0x4ed)]['xparamPlus1'][_0x7beb64])){var _0x45102e=Number(RegExp['$1'])/0x64;_0x2d2c46+=_0x45102e;}if(_0x58b09d['note'][_0x4316e0(0x481)](VisuMZ[_0x4316e0(0x3c0)]['RegExp'][_0x4316e0(0x1f2)][_0x7beb64])){var _0x45102e=Number(RegExp['$1']);_0x2d2c46+=_0x45102e;}if(_0x58b09d[_0x4316e0(0x598)][_0x4316e0(0x481)](VisuMZ[_0x4316e0(0x3c0)]['RegExp'][_0x4316e0(0x614)][_0x7beb64])){var _0xdfefbf=String(RegExp['$1']);try{_0x2d2c46+=eval(_0xdfefbf);}catch(_0x24e0b3){if($gameTemp[_0x4316e0(0x393)]())console['log'](_0x24e0b3);}}return _0x2d2c46;};return this[_0x531bf5(0x52f)]()[_0x531bf5(0x198)](_0x2b6f48,0x0);},Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x64a)]=function(_0x8f63fb){const _0x15e8a1=_0x3a331f,_0x566c87=(_0x59b0fd,_0x906617)=>{const _0xba1938=_0x5a4b;if(!_0x906617)return _0x59b0fd;if(_0x906617[_0xba1938(0x598)][_0xba1938(0x481)](VisuMZ['CoreEngine']['RegExp'][_0xba1938(0x6cb)][_0x8f63fb])){var _0x35ecc4=Number(RegExp['$1'])/0x64;_0x59b0fd*=_0x35ecc4;}if(_0x906617[_0xba1938(0x598)]['match'](VisuMZ[_0xba1938(0x3c0)][_0xba1938(0x4ed)]['xparamRate2'][_0x8f63fb])){var _0x35ecc4=Number(RegExp['$1']);_0x59b0fd*=_0x35ecc4;}if(_0x906617['note'][_0xba1938(0x481)](VisuMZ[_0xba1938(0x3c0)][_0xba1938(0x4ed)]['xparamRateJS'][_0x8f63fb])){var _0x1989d2=String(RegExp['$1']);try{_0x59b0fd*=eval(_0x1989d2);}catch(_0x5b83b0){if($gameTemp[_0xba1938(0x393)]())console[_0xba1938(0x5da)](_0x5b83b0);}}return _0x59b0fd;};return this[_0x15e8a1(0x52f)]()[_0x15e8a1(0x198)](_0x566c87,0x1);},Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x552)]=function(_0x4df08b){const _0x3ea041=_0x3a331f,_0xd9c8c4=(_0x388172,_0x2935cb)=>{const _0x1fc057=_0x5a4b;if(!_0x2935cb)return _0x388172;if(_0x2935cb['note'][_0x1fc057(0x481)](VisuMZ[_0x1fc057(0x3c0)][_0x1fc057(0x4ed)][_0x1fc057(0x220)][_0x4df08b])){var _0x3acdc4=Number(RegExp['$1'])/0x64;_0x388172+=_0x3acdc4;}if(_0x2935cb[_0x1fc057(0x598)][_0x1fc057(0x481)](VisuMZ[_0x1fc057(0x3c0)][_0x1fc057(0x4ed)]['xparamFlat2'][_0x4df08b])){var _0x3acdc4=Number(RegExp['$1']);_0x388172+=_0x3acdc4;}if(_0x2935cb[_0x1fc057(0x598)][_0x1fc057(0x481)](VisuMZ[_0x1fc057(0x3c0)][_0x1fc057(0x4ed)][_0x1fc057(0x6c3)][_0x4df08b])){var _0x3fc492=String(RegExp['$1']);try{_0x388172+=eval(_0x3fc492);}catch(_0x2ab5ce){if($gameTemp[_0x1fc057(0x393)]())console[_0x1fc057(0x5da)](_0x2ab5ce);}}return _0x388172;};return this[_0x3ea041(0x52f)]()[_0x3ea041(0x198)](_0xd9c8c4,0x0);},Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x50d)]=function(_0x2f72fe){const _0x50624b=_0x3a331f;let _0xa19482=_0x50624b(0x50d)+_0x2f72fe+_0x50624b(0x6fb);if(this[_0x50624b(0x27b)](_0xa19482))return this[_0x50624b(0x731)][_0xa19482];return this[_0x50624b(0x731)][_0xa19482]=VisuMZ[_0x50624b(0x3c0)][_0x50624b(0x6be)][_0x50624b(0x4c3)][_0x50624b(0x3af)][_0x50624b(0x2eb)](this,_0x2f72fe),this[_0x50624b(0x731)][_0xa19482];},Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x259)]=function(_0x595423){const _0x55949=_0x3a331f,_0x23d95b=(_0x143dab,_0x34a3de)=>{const _0x32868d=_0x5a4b;if(!_0x34a3de)return _0x143dab;if(_0x34a3de[_0x32868d(0x598)][_0x32868d(0x481)](VisuMZ[_0x32868d(0x3c0)][_0x32868d(0x4ed)][_0x32868d(0x657)][_0x595423])){var _0xa5a43d=Number(RegExp['$1'])/0x64;_0x143dab+=_0xa5a43d;}if(_0x34a3de[_0x32868d(0x598)][_0x32868d(0x481)](VisuMZ['CoreEngine'][_0x32868d(0x4ed)][_0x32868d(0x3be)][_0x595423])){var _0xa5a43d=Number(RegExp['$1']);_0x143dab+=_0xa5a43d;}if(_0x34a3de[_0x32868d(0x598)][_0x32868d(0x481)](VisuMZ['CoreEngine'][_0x32868d(0x4ed)][_0x32868d(0x345)][_0x595423])){var _0x20491d=String(RegExp['$1']);try{_0x143dab+=eval(_0x20491d);}catch(_0xe2816a){if($gameTemp['isPlaytest']())console[_0x32868d(0x5da)](_0xe2816a);}}return _0x143dab;};return this['traitObjects']()[_0x55949(0x198)](_0x23d95b,0x0);},Game_BattlerBase['prototype'][_0x3a331f(0x694)]=function(_0x107cff){const _0x36e43c=_0x3a331f,_0x434a3d=(_0x537156,_0x142145)=>{const _0x1c9f0d=_0x5a4b;if(!_0x142145)return _0x537156;if(_0x142145[_0x1c9f0d(0x598)][_0x1c9f0d(0x481)](VisuMZ[_0x1c9f0d(0x3c0)][_0x1c9f0d(0x4ed)][_0x1c9f0d(0x289)][_0x107cff])){var _0x47fb38=Number(RegExp['$1'])/0x64;_0x537156*=_0x47fb38;}if(_0x142145[_0x1c9f0d(0x598)][_0x1c9f0d(0x481)](VisuMZ['CoreEngine'][_0x1c9f0d(0x4ed)][_0x1c9f0d(0x448)][_0x107cff])){var _0x47fb38=Number(RegExp['$1']);_0x537156*=_0x47fb38;}if(_0x142145[_0x1c9f0d(0x598)][_0x1c9f0d(0x481)](VisuMZ[_0x1c9f0d(0x3c0)][_0x1c9f0d(0x4ed)][_0x1c9f0d(0x232)][_0x107cff])){var _0x34a0e5=String(RegExp['$1']);try{_0x537156*=eval(_0x34a0e5);}catch(_0x2a65e5){if($gameTemp[_0x1c9f0d(0x393)]())console['log'](_0x2a65e5);}}return _0x537156;};return this[_0x36e43c(0x52f)]()[_0x36e43c(0x198)](_0x434a3d,0x1);},Game_BattlerBase[_0x3a331f(0x499)]['sparamFlatBonus']=function(_0x233ef8){const _0x1286af=_0x3a331f,_0x1ceddb=(_0x62bdd6,_0x409650)=>{const _0x53695b=_0x5a4b;if(!_0x409650)return _0x62bdd6;if(_0x409650[_0x53695b(0x598)][_0x53695b(0x481)](VisuMZ[_0x53695b(0x3c0)][_0x53695b(0x4ed)][_0x53695b(0x2a0)][_0x233ef8])){var _0x460147=Number(RegExp['$1'])/0x64;_0x62bdd6+=_0x460147;}if(_0x409650[_0x53695b(0x598)][_0x53695b(0x481)](VisuMZ[_0x53695b(0x3c0)][_0x53695b(0x4ed)][_0x53695b(0x68a)][_0x233ef8])){var _0x460147=Number(RegExp['$1']);_0x62bdd6+=_0x460147;}if(_0x409650[_0x53695b(0x598)][_0x53695b(0x481)](VisuMZ['CoreEngine'][_0x53695b(0x4ed)][_0x53695b(0x4fd)][_0x233ef8])){var _0x46cf43=String(RegExp['$1']);try{_0x62bdd6+=eval(_0x46cf43);}catch(_0x5f4540){if($gameTemp[_0x53695b(0x393)]())console[_0x53695b(0x5da)](_0x5f4540);}}return _0x62bdd6;};return this[_0x1286af(0x52f)]()[_0x1286af(0x198)](_0x1ceddb,0x0);},Game_BattlerBase[_0x3a331f(0x499)]['sparam']=function(_0x37b405){const _0x4b76a0=_0x3a331f;let _0x2a268e='sparam'+_0x37b405+_0x4b76a0(0x6fb);if(this[_0x4b76a0(0x27b)](_0x2a268e))return this[_0x4b76a0(0x731)][_0x2a268e];return this[_0x4b76a0(0x731)][_0x2a268e]=VisuMZ['CoreEngine']['Settings'][_0x4b76a0(0x4c3)][_0x4b76a0(0x4c9)][_0x4b76a0(0x2eb)](this,_0x37b405),this[_0x4b76a0(0x731)][_0x2a268e];},Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x2ce)]=function(_0x4d70ad,_0x238d34){const _0x511e76=_0x3a331f;if(typeof paramId==='number')return this[_0x511e76(0x712)](_0x4d70ad);_0x4d70ad=String(_0x4d70ad||'')[_0x511e76(0x3c7)]();if(_0x4d70ad==='MAXHP')return this[_0x511e76(0x712)](0x0);if(_0x4d70ad===_0x511e76(0x1c6))return this[_0x511e76(0x712)](0x1);if(_0x4d70ad==='ATK')return this[_0x511e76(0x712)](0x2);if(_0x4d70ad===_0x511e76(0x2b7))return this[_0x511e76(0x712)](0x3);if(_0x4d70ad==='MAT')return this['param'](0x4);if(_0x4d70ad==='MDF')return this[_0x511e76(0x712)](0x5);if(_0x4d70ad==='AGI')return this[_0x511e76(0x712)](0x6);if(_0x4d70ad===_0x511e76(0x5fd))return this['param'](0x7);if(_0x4d70ad===_0x511e76(0x702))return _0x238d34?String(Math['round'](this[_0x511e76(0x50d)](0x0)*0x64))+'%':this[_0x511e76(0x50d)](0x0);if(_0x4d70ad===_0x511e76(0x36c))return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x50d)](0x1)*0x64))+'%':this[_0x511e76(0x50d)](0x1);if(_0x4d70ad===_0x511e76(0x6d2))return _0x238d34?String(Math['round'](this[_0x511e76(0x50d)](0x2)*0x64))+'%':this[_0x511e76(0x50d)](0x2);if(_0x4d70ad===_0x511e76(0x32c))return _0x238d34?String(Math['round'](this[_0x511e76(0x50d)](0x3)*0x64))+'%':this[_0x511e76(0x50d)](0x3);if(_0x4d70ad===_0x511e76(0x431))return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x50d)](0x4)*0x64))+'%':this[_0x511e76(0x50d)](0x4);if(_0x4d70ad===_0x511e76(0x5f4))return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x50d)](0x5)*0x64))+'%':this[_0x511e76(0x50d)](0x5);if(_0x4d70ad==='CNT')return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x50d)](0x6)*0x64))+'%':this[_0x511e76(0x50d)](0x6);if(_0x4d70ad===_0x511e76(0x4a2))return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x50d)](0x7)*0x64))+'%':this[_0x511e76(0x50d)](0x7);if(_0x4d70ad==='MRG')return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x50d)](0x8)*0x64))+'%':this[_0x511e76(0x50d)](0x8);if(_0x4d70ad===_0x511e76(0x1ae))return _0x238d34?String(Math[_0x511e76(0x469)](this['xparam'](0x9)*0x64))+'%':this[_0x511e76(0x50d)](0x9);if(_0x4d70ad===_0x511e76(0x636))return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x364)](0x0)*0x64))+'%':this[_0x511e76(0x364)](0x0);if(_0x4d70ad===_0x511e76(0x194))return _0x238d34?String(Math['round'](this[_0x511e76(0x364)](0x1)*0x64))+'%':this[_0x511e76(0x364)](0x1);if(_0x4d70ad===_0x511e76(0x2c0))return _0x238d34?String(Math[_0x511e76(0x469)](this['sparam'](0x2)*0x64))+'%':this[_0x511e76(0x364)](0x2);if(_0x4d70ad===_0x511e76(0x39e))return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x364)](0x3)*0x64))+'%':this[_0x511e76(0x364)](0x3);if(_0x4d70ad===_0x511e76(0x4e2))return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x364)](0x4)*0x64))+'%':this[_0x511e76(0x364)](0x4);if(_0x4d70ad===_0x511e76(0x397))return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x364)](0x5)*0x64))+'%':this[_0x511e76(0x364)](0x5);if(_0x4d70ad==='PDR')return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x364)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x4d70ad===_0x511e76(0x1d4))return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x364)](0x7)*0x64))+'%':this[_0x511e76(0x364)](0x7);if(_0x4d70ad==='FDR')return _0x238d34?String(Math['round'](this[_0x511e76(0x364)](0x8)*0x64))+'%':this[_0x511e76(0x364)](0x8);if(_0x4d70ad==='EXR')return _0x238d34?String(Math[_0x511e76(0x469)](this[_0x511e76(0x364)](0x9)*0x64))+'%':this[_0x511e76(0x364)](0x9);if(VisuMZ['CoreEngine']['CustomParamAbb'][_0x4d70ad]){const _0x1b6673=VisuMZ[_0x511e76(0x3c0)][_0x511e76(0x672)][_0x4d70ad],_0x3c8219=this[_0x1b6673];return VisuMZ[_0x511e76(0x3c0)]['CustomParamType'][_0x4d70ad]==='integer'?_0x3c8219:_0x238d34?String(Math[_0x511e76(0x469)](_0x3c8219*0x64))+'%':_0x3c8219;}return'';},Game_BattlerBase[_0x3a331f(0x499)][_0x3a331f(0x27f)]=function(){const _0x5200eb=_0x3a331f;return this[_0x5200eb(0x428)]()&&this['_hp']<this['mhp']*VisuMZ[_0x5200eb(0x3c0)][_0x5200eb(0x6be)][_0x5200eb(0x4c3)][_0x5200eb(0x66a)];},Game_Battler['prototype'][_0x3a331f(0x1dd)]=function(){const _0x30cb83=_0x3a331f;SoundManager[_0x30cb83(0x4de)](),this[_0x30cb83(0x1a4)]('evade');},VisuMZ['CoreEngine']['Game_Actor_paramBase']=Game_Actor['prototype'][_0x3a331f(0x66e)],Game_Actor[_0x3a331f(0x499)]['paramBase']=function(_0x3cc42d){const _0x25621f=_0x3a331f;if(this[_0x25621f(0x57c)]>0x63)return this[_0x25621f(0x382)](_0x3cc42d);return VisuMZ[_0x25621f(0x3c0)]['Game_Actor_paramBase'][_0x25621f(0x2eb)](this,_0x3cc42d);},Game_Actor[_0x3a331f(0x499)][_0x3a331f(0x382)]=function(_0x16f613){const _0x5a4f6e=_0x3a331f,_0x5b50cf=this[_0x5a4f6e(0x71f)]()[_0x5a4f6e(0x2e7)][_0x16f613][0x63],_0x298094=this[_0x5a4f6e(0x71f)]()[_0x5a4f6e(0x2e7)][_0x16f613][0x62];return _0x5b50cf+(_0x5b50cf-_0x298094)*(this['level']-0x63);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x71c)]=Game_Actor['prototype'][_0x3a331f(0x2e5)],Game_Actor['prototype'][_0x3a331f(0x2e5)]=function(_0x543901,_0xe10b19){const _0x39f200=_0x3a331f;$gameTemp[_0x39f200(0x6ae)]=!![],VisuMZ[_0x39f200(0x3c0)][_0x39f200(0x71c)][_0x39f200(0x2eb)](this,_0x543901,_0xe10b19),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x581)]=Game_Actor[_0x3a331f(0x499)]['levelUp'],Game_Actor[_0x3a331f(0x499)]['levelUp']=function(){const _0x445314=_0x3a331f;VisuMZ[_0x445314(0x3c0)][_0x445314(0x581)][_0x445314(0x2eb)](this);if(!$gameTemp['_changingClass'])this[_0x445314(0x1d3)]();},Game_Actor[_0x3a331f(0x499)][_0x3a331f(0x1d3)]=function(){const _0x4b1687=_0x3a331f;this[_0x4b1687(0x731)]={};if(VisuMZ['CoreEngine'][_0x4b1687(0x6be)][_0x4b1687(0x271)]['LevelUpFullHp'])this[_0x4b1687(0x243)]=this[_0x4b1687(0x2f9)];if(VisuMZ[_0x4b1687(0x3c0)][_0x4b1687(0x6be)][_0x4b1687(0x271)][_0x4b1687(0x42d)])this['_mp']=this[_0x4b1687(0x277)];},Game_Actor[_0x3a331f(0x499)][_0x3a331f(0x310)]=function(){const _0x1463a7=_0x3a331f;if(this[_0x1463a7(0x213)]())return 0x1;const _0x513b28=this[_0x1463a7(0x623)]()-this['currentLevelExp'](),_0x3ee014=this[_0x1463a7(0x5a4)]()-this[_0x1463a7(0x5bb)]();return(_0x3ee014/_0x513b28)[_0x1463a7(0x283)](0x0,0x1);},Game_Actor[_0x3a331f(0x499)][_0x3a331f(0x52f)]=function(){const _0x771b66=_0x3a331f,_0x55be0c=Game_Battler[_0x771b66(0x499)]['traitObjects'][_0x771b66(0x2eb)](this);for(const _0x3b9957 of this['equips']()){_0x3b9957&&_0x55be0c[_0x771b66(0x2ae)](_0x3b9957);}return _0x55be0c[_0x771b66(0x2ae)](this[_0x771b66(0x71f)](),this[_0x771b66(0x313)]()),_0x55be0c;},Object[_0x3a331f(0x29f)](Game_Enemy['prototype'],_0x3a331f(0x57c),{'get':function(){const _0x215d03=_0x3a331f;return this[_0x215d03(0x4a3)]();},'configurable':!![]}),Game_Enemy[_0x3a331f(0x499)][_0x3a331f(0x4a3)]=function(){return this['enemy']()['level'];},Game_Enemy[_0x3a331f(0x499)][_0x3a331f(0x2c1)]=function(){const _0x563364=_0x3a331f;!this[_0x563364(0x24a)]&&(this['_screenY']+=Math[_0x563364(0x469)]((Graphics[_0x563364(0x3fc)]-0x270)/0x2),this[_0x563364(0x3d3)]-=Math[_0x563364(0x4e5)]((Graphics[_0x563364(0x3fc)]-Graphics['boxHeight'])/0x2),$gameSystem[_0x563364(0x6ef)]()?this['_screenX']-=Math[_0x563364(0x4e5)]((Graphics[_0x563364(0x483)]-Graphics[_0x563364(0x356)])/0x2):this['_screenX']+=Math[_0x563364(0x469)]((Graphics[_0x563364(0x356)]-0x330)/0x2)),this[_0x563364(0x24a)]=!![];},Game_Party[_0x3a331f(0x499)]['maxGold']=function(){const _0x31d7e1=_0x3a331f;return VisuMZ[_0x31d7e1(0x3c0)]['Settings'][_0x31d7e1(0x738)][_0x31d7e1(0x242)];},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x532)]=Game_Party['prototype'][_0x3a331f(0x320)],Game_Party[_0x3a331f(0x499)][_0x3a331f(0x320)]=function(_0x5a61ad){const _0x41fe9f=_0x3a331f;if(VisuMZ[_0x41fe9f(0x3c0)][_0x41fe9f(0x6be)]['QoL'][_0x41fe9f(0x488)]&&DataManager[_0x41fe9f(0x223)](_0x5a61ad))return;VisuMZ[_0x41fe9f(0x3c0)][_0x41fe9f(0x532)][_0x41fe9f(0x2eb)](this,_0x5a61ad);},VisuMZ[_0x3a331f(0x3c0)]['Game_Troop_setup']=Game_Troop[_0x3a331f(0x499)][_0x3a331f(0x49d)],Game_Troop[_0x3a331f(0x499)]['setup']=function(_0x591094){const _0x204310=_0x3a331f;$gameTemp['clearForcedGameTroopSettingsCoreEngine'](),$gameTemp['applyForcedGameTroopSettingsCoreEngine'](_0x591094),VisuMZ[_0x204310(0x3c0)][_0x204310(0x1e7)][_0x204310(0x2eb)](this,_0x591094);},VisuMZ['CoreEngine'][_0x3a331f(0x307)]=Game_Map['prototype'][_0x3a331f(0x49d)],Game_Map[_0x3a331f(0x499)]['setup']=function(_0x32732f){const _0x128ac3=_0x3a331f;VisuMZ[_0x128ac3(0x3c0)][_0x128ac3(0x307)]['call'](this,_0x32732f),this[_0x128ac3(0x685)](_0x32732f);},Game_Map[_0x3a331f(0x499)][_0x3a331f(0x685)]=function(){const _0x48c949=_0x3a331f;this[_0x48c949(0x365)]=VisuMZ['CoreEngine'][_0x48c949(0x6be)][_0x48c949(0x271)][_0x48c949(0x570)]||![];if($dataMap&&$dataMap[_0x48c949(0x598)]){if($dataMap[_0x48c949(0x598)][_0x48c949(0x481)](/<SHOW TILE SHADOWS>/i))this[_0x48c949(0x365)]=![];if($dataMap['note'][_0x48c949(0x481)](/<HIDE TILE SHADOWS>/i))this['_hideTileShadows']=!![];}},Game_Map['prototype'][_0x3a331f(0x3ff)]=function(){const _0x531e44=_0x3a331f;if(this[_0x531e44(0x365)]===undefined)this['setupCoreEngine']();return this[_0x531e44(0x365)];},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x3f3)]=Game_Character[_0x3a331f(0x499)]['processMoveCommand'],Game_Character[_0x3a331f(0x499)][_0x3a331f(0x390)]=function(_0x1f5c3c){const _0x538336=_0x3a331f;try{VisuMZ[_0x538336(0x3c0)][_0x538336(0x3f3)][_0x538336(0x2eb)](this,_0x1f5c3c);}catch(_0x58c10b){if($gameTemp[_0x538336(0x393)]())console[_0x538336(0x5da)](_0x58c10b);}},Game_Player[_0x3a331f(0x499)][_0x3a331f(0x606)]=function(){const _0x4d410a=_0x3a331f,_0x1e71f6=$gameMap[_0x4d410a(0x1da)]();this[_0x4d410a(0x374)]=Math['randomInt'](_0x1e71f6)+Math['randomInt'](_0x1e71f6)+this[_0x4d410a(0x6b4)]();},Game_Player[_0x3a331f(0x499)][_0x3a331f(0x6b4)]=function(){const _0x1c8f43=_0x3a331f;return $dataMap&&$dataMap['note']&&$dataMap[_0x1c8f43(0x598)]['match'](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x1c8f43(0x3c0)][_0x1c8f43(0x6be)]['QoL']['EncounterRateMinimum'];},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x252)]=Game_Event[_0x3a331f(0x499)]['isCollidedWithEvents'],Game_Event['prototype']['isCollidedWithEvents']=function(_0x24d13a,_0x2e970e){const _0x167050=_0x3a331f;return this[_0x167050(0x282)]()?this['checkSmartEventCollision'](_0x24d13a,_0x2e970e):VisuMZ[_0x167050(0x3c0)]['Game_Event_isCollidedWithEvents']['call'](this,_0x24d13a,_0x2e970e);},Game_Event[_0x3a331f(0x499)][_0x3a331f(0x282)]=function(){const _0x26450f=_0x3a331f;return VisuMZ['CoreEngine'][_0x26450f(0x6be)][_0x26450f(0x271)][_0x26450f(0x2c9)];},Game_Event[_0x3a331f(0x499)][_0x3a331f(0x4e4)]=function(_0x3b307f,_0x560bef){const _0x5d644b=_0x3a331f;if(!this[_0x5d644b(0x70d)]())return![];else{const _0x4e0d7e=$gameMap[_0x5d644b(0x2b8)](_0x3b307f,_0x560bef)['filter'](_0x1bbcbb=>_0x1bbcbb['isNormalPriority']());return _0x4e0d7e[_0x5d644b(0x2ed)]>0x0;}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x292)]=Game_Interpreter[_0x3a331f(0x499)][_0x3a331f(0x575)],Game_Interpreter['prototype'][_0x3a331f(0x575)]=function(_0x130819){const _0x2fa9d5=_0x3a331f,_0x1eb020=this[_0x2fa9d5(0x207)]();return _0x1eb020[_0x2fa9d5(0x481)](/\/\/[ ]SCRIPT[ ]CALL/i)?this[_0x2fa9d5(0x2fb)](_0x1eb020):VisuMZ[_0x2fa9d5(0x3c0)][_0x2fa9d5(0x292)][_0x2fa9d5(0x2eb)](this,_0x130819);},Game_Interpreter['prototype'][_0x3a331f(0x207)]=function(){const _0xe907c4=_0x3a331f;let _0x22dec2='',_0x19f953=this['_index']+0x1;while(this[_0xe907c4(0x321)][_0x19f953]&&this[_0xe907c4(0x321)][_0x19f953]['code']===0x195){_0x22dec2+=this[_0xe907c4(0x321)][_0x19f953][_0xe907c4(0x5e2)][0x0]+'\x0a',_0x19f953++;}return _0x22dec2;},Game_Interpreter[_0x3a331f(0x499)]['runCombinedScrollingTextAsCode']=function(_0x2e4aec){const _0x5b6ecb=_0x3a331f;try{eval(_0x2e4aec);}catch(_0x2228d6){$gameTemp[_0x5b6ecb(0x393)]()&&(console[_0x5b6ecb(0x5da)](_0x5b6ecb(0x6fa)),console[_0x5b6ecb(0x5da)](_0x2228d6));}return!![];},VisuMZ[_0x3a331f(0x3c0)]['Game_Interpreter_command111']=Game_Interpreter[_0x3a331f(0x499)][_0x3a331f(0x218)],Game_Interpreter['prototype'][_0x3a331f(0x218)]=function(_0x34af62){const _0x55267f=_0x3a331f;try{VisuMZ[_0x55267f(0x3c0)][_0x55267f(0x442)]['call'](this,_0x34af62);}catch(_0x45b037){$gameTemp[_0x55267f(0x393)]()&&(console[_0x55267f(0x5da)](_0x55267f(0x46b)),console['log'](_0x45b037)),this[_0x55267f(0x509)]();}return!![];},VisuMZ['CoreEngine'][_0x3a331f(0x426)]=Game_Interpreter['prototype'][_0x3a331f(0x25f)],Game_Interpreter[_0x3a331f(0x499)]['command122']=function(_0x5a83d1){const _0x5ed458=_0x3a331f;try{VisuMZ['CoreEngine'][_0x5ed458(0x426)][_0x5ed458(0x2eb)](this,_0x5a83d1);}catch(_0x1c0520){$gameTemp['isPlaytest']()&&(console[_0x5ed458(0x5da)](_0x5ed458(0x654)),console[_0x5ed458(0x5da)](_0x1c0520));}return!![];},VisuMZ['CoreEngine']['Game_Interpreter_command355']=Game_Interpreter['prototype'][_0x3a331f(0x2bf)],Game_Interpreter[_0x3a331f(0x499)][_0x3a331f(0x2bf)]=function(){const _0x338f75=_0x3a331f;try{VisuMZ[_0x338f75(0x3c0)]['Game_Interpreter_command355'][_0x338f75(0x2eb)](this);}catch(_0x28a951){$gameTemp[_0x338f75(0x393)]()&&(console[_0x338f75(0x5da)](_0x338f75(0x251)),console[_0x338f75(0x5da)](_0x28a951));}return!![];},VisuMZ[_0x3a331f(0x3c0)]['Game_Interpreter_PluginCommand']=Game_Interpreter[_0x3a331f(0x499)][_0x3a331f(0x290)],Game_Interpreter['prototype'][_0x3a331f(0x290)]=function(_0x1efecb){const _0x36aa0d=_0x3a331f;return $gameTemp[_0x36aa0d(0x423)](this),VisuMZ['CoreEngine'][_0x36aa0d(0x38e)][_0x36aa0d(0x2eb)](this,_0x1efecb);},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x217)]=function(){const _0x164a16=_0x3a331f;return VisuMZ[_0x164a16(0x3c0)][_0x164a16(0x6be)]['UI'][_0x164a16(0x6e0)];},Scene_Base[_0x3a331f(0x499)]['isBottomHelpMode']=function(){const _0x12bf5c=_0x3a331f;return VisuMZ['CoreEngine']['Settings']['UI'][_0x12bf5c(0x5d7)];},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x204)]=function(){const _0x41464d=_0x3a331f;return VisuMZ[_0x41464d(0x3c0)][_0x41464d(0x6be)]['UI'][_0x41464d(0x6f5)];},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x36a)]=function(){const _0x203386=_0x3a331f;return VisuMZ[_0x203386(0x3c0)][_0x203386(0x6be)]['UI'][_0x203386(0x696)];},Scene_Base['prototype'][_0x3a331f(0x24d)]=function(){const _0x56fae1=_0x3a331f;return VisuMZ[_0x56fae1(0x3c0)][_0x56fae1(0x6be)]['UI'][_0x56fae1(0x33d)];},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x5dc)]=function(){const _0x479c03=_0x3a331f;return VisuMZ[_0x479c03(0x3c0)][_0x479c03(0x6be)]['UI']['ButtonHeight'];},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x4a1)]=function(){const _0x259bba=_0x3a331f;return VisuMZ[_0x259bba(0x3c0)]['Settings'][_0x259bba(0x43c)][_0x259bba(0x279)];},VisuMZ['CoreEngine'][_0x3a331f(0x588)]=Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x5ee)],Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x5ee)]=function(){const _0x1d7151=_0x3a331f;VisuMZ[_0x1d7151(0x3c0)][_0x1d7151(0x588)][_0x1d7151(0x2eb)](this),this[_0x1d7151(0x699)](),this['_windowLayer']['x']=Math[_0x1d7151(0x469)](this[_0x1d7151(0x4f4)]['x']),this[_0x1d7151(0x4f4)]['y']=Math[_0x1d7151(0x469)](this[_0x1d7151(0x4f4)]['y']);},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x699)]=function(){},Scene_Base['prototype'][_0x3a331f(0x444)]=function(){const _0x4793ae=_0x3a331f;return TextManager[_0x4793ae(0x338)](_0x4793ae(0x406),_0x4793ae(0x221));},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x73b)]=function(){const _0x3be15f=_0x3a331f;return TextManager['getInputButtonString'](_0x3be15f(0x360));},Scene_Base['prototype'][_0x3a331f(0x3f2)]=function(){const _0x2516df=_0x3a331f;return TextManager[_0x2516df(0x20b)](_0x2516df(0x1f8));},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x2c7)]=function(){return TextManager['getInputButtonString']('ok');},Scene_Base['prototype'][_0x3a331f(0x40f)]=function(){const _0x4a9c77=_0x3a331f;return TextManager['getInputButtonString'](_0x4a9c77(0x1ff));},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x260)]=function(){const _0x308ad8=_0x3a331f;return this[_0x308ad8(0x5cc)]&&this[_0x308ad8(0x5cc)][_0x308ad8(0x643)]?TextManager[_0x308ad8(0x376)]:'';},Scene_Base[_0x3a331f(0x499)]['buttonAssistText2']=function(){return'';},Scene_Base['prototype'][_0x3a331f(0x2bc)]=function(){return'';},Scene_Base['prototype']['buttonAssistText4']=function(){const _0x246ef0=_0x3a331f;return TextManager[_0x246ef0(0x63e)];},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x372)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x2ec)]=function(){return 0x0;},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x4ad)]=function(){return 0x0;},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x64d)]=function(){return 0x0;},Scene_Base['prototype']['buttonAssistOffset4']=function(){return 0x0;},Scene_Base[_0x3a331f(0x499)][_0x3a331f(0x433)]=function(){return 0x0;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x599)]=Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x416)],Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x416)]=function(){const _0x31ba52=_0x3a331f;VisuMZ[_0x31ba52(0x3c0)][_0x31ba52(0x599)]['call'](this),this[_0x31ba52(0x4cd)]();},Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x4cd)]=function(){const _0xb857a3=_0x3a331f,_0x4b2ca6=[_0xb857a3(0x40d),_0xb857a3(0x359),'battlebacks2',_0xb857a3(0x6ee),'enemies',_0xb857a3(0x476),_0xb857a3(0x3d6),_0xb857a3(0x24f),_0xb857a3(0x212),_0xb857a3(0x72f),'system',_0xb857a3(0x515),_0xb857a3(0x411),_0xb857a3(0x6df)];for(const _0x2cf3ff of _0x4b2ca6){const _0x100abd=VisuMZ[_0xb857a3(0x3c0)][_0xb857a3(0x6be)][_0xb857a3(0x595)][_0x2cf3ff],_0x60016d=_0xb857a3(0x5b9)[_0xb857a3(0x5f7)](_0x2cf3ff);for(const _0x41b5d9 of _0x100abd){ImageManager['loadBitmap'](_0x60016d,_0x41b5d9);}}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x4cb)]=Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x5e3)],Scene_Boot[_0x3a331f(0x499)]['startNormalGame']=function(){const _0x53db3f=_0x3a331f;Utils[_0x53db3f(0x6e1)](_0x53db3f(0x54b))&&VisuMZ[_0x53db3f(0x3c0)][_0x53db3f(0x6be)][_0x53db3f(0x271)]['NewGameBoot']?this[_0x53db3f(0x362)]():VisuMZ['CoreEngine']['Scene_Boot_startNormalGame']['call'](this);},Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x362)]=function(){const _0x2a16b3=_0x3a331f;DataManager[_0x2a16b3(0x544)](),SceneManager[_0x2a16b3(0x58a)](Scene_Map);},Scene_Boot[_0x3a331f(0x499)]['adjustBoxSize']=function(){const _0x1f708f=_0x3a331f,_0x2f8e98=$dataSystem['advanced']['uiAreaWidth'],_0x1e3d13=$dataSystem[_0x1f708f(0x337)][_0x1f708f(0x5d6)],_0x18b612=VisuMZ['CoreEngine'][_0x1f708f(0x6be)]['UI'][_0x1f708f(0x53a)];Graphics[_0x1f708f(0x356)]=_0x2f8e98-_0x18b612*0x2,Graphics[_0x1f708f(0x4ff)]=_0x1e3d13-_0x18b612*0x2,this[_0x1f708f(0x585)]();},VisuMZ[_0x3a331f(0x3c0)]['Scene_Boot_updateDocumentTitle']=Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x6a2)],Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x6a2)]=function(){const _0x1d65a5=_0x3a331f;this[_0x1d65a5(0x1d0)]()?this[_0x1d65a5(0x723)]():VisuMZ[_0x1d65a5(0x3c0)]['Scene_Boot_updateDocumentTitle'][_0x1d65a5(0x2eb)](this);},Scene_Boot[_0x3a331f(0x499)]['isFullDocumentTitle']=function(){const _0x42d37a=_0x3a331f;if(Scene_Title[_0x42d37a(0x45a)]==='')return![];if(Scene_Title[_0x42d37a(0x45a)]===_0x42d37a(0x270))return![];if(Scene_Title[_0x42d37a(0x553)]==='')return![];if(Scene_Title[_0x42d37a(0x553)]===_0x42d37a(0x248))return![];return!![];},Scene_Boot[_0x3a331f(0x499)][_0x3a331f(0x723)]=function(){const _0xce0634=_0x3a331f,_0x3eb24f=$dataSystem[_0xce0634(0x25d)],_0x31b3e3=Scene_Title['subtitle']||'',_0x3abd69=Scene_Title[_0xce0634(0x553)]||'',_0x2d691b=VisuMZ[_0xce0634(0x3c0)][_0xce0634(0x6be)][_0xce0634(0x629)][_0xce0634(0x4c0)][_0xce0634(0x69c)],_0x1a5fc2=_0x2d691b[_0xce0634(0x5f7)](_0x3eb24f,_0x31b3e3,_0x3abd69);document[_0xce0634(0x2b3)]=_0x1a5fc2;},Scene_Boot['prototype'][_0x3a331f(0x585)]=function(){const _0x2f352f=_0x3a331f;if(VisuMZ[_0x2f352f(0x3c0)][_0x2f352f(0x6be)]['UI'][_0x2f352f(0x6ed)]){const _0x1d9772=Graphics[_0x2f352f(0x483)]-Graphics['boxWidth']-VisuMZ[_0x2f352f(0x3c0)][_0x2f352f(0x6be)]['UI'][_0x2f352f(0x53a)]*0x2,_0xdc35d2=Sprite_Button[_0x2f352f(0x499)][_0x2f352f(0x25b)][_0x2f352f(0x2eb)](this)*0x4;if(_0x1d9772>=_0xdc35d2)SceneManager['setSideButtonLayout'](!![]);}},Scene_Title['subtitle']=VisuMZ[_0x3a331f(0x3c0)]['Settings']['MenuLayout'][_0x3a331f(0x4c0)][_0x3a331f(0x270)],Scene_Title[_0x3a331f(0x553)]=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x629)]['Title'][_0x3a331f(0x1ec)],Scene_Title[_0x3a331f(0x37b)]=VisuMZ['CoreEngine'][_0x3a331f(0x6be)]['TitlePicButtons'],VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x61b)]=Scene_Title[_0x3a331f(0x499)][_0x3a331f(0x4e0)],Scene_Title[_0x3a331f(0x499)][_0x3a331f(0x4e0)]=function(){const _0x11da33=_0x3a331f;VisuMZ[_0x11da33(0x3c0)][_0x11da33(0x6be)][_0x11da33(0x629)][_0x11da33(0x4c0)]['drawGameTitle'][_0x11da33(0x2eb)](this);if(Scene_Title[_0x11da33(0x45a)]!==''&&Scene_Title[_0x11da33(0x45a)]!==_0x11da33(0x270))this[_0x11da33(0x2e6)]();if(Scene_Title['version']!==''&&Scene_Title[_0x11da33(0x553)]!==_0x11da33(0x248))this['drawGameVersion']();},Scene_Title[_0x3a331f(0x499)][_0x3a331f(0x2e6)]=function(){const _0x482490=_0x3a331f;VisuMZ[_0x482490(0x3c0)]['Settings'][_0x482490(0x629)]['Title'][_0x482490(0x2e6)][_0x482490(0x2eb)](this);},Scene_Title[_0x3a331f(0x499)][_0x3a331f(0x71b)]=function(){const _0x5651bc=_0x3a331f;VisuMZ['CoreEngine']['Settings']['MenuLayout']['Title']['drawGameVersion'][_0x5651bc(0x2eb)](this);},Scene_Title[_0x3a331f(0x499)][_0x3a331f(0x61c)]=function(){const _0x2c57a9=_0x3a331f;this[_0x2c57a9(0x66c)]();const _0x50b108=$dataSystem['titleCommandWindow'][_0x2c57a9(0x3b3)],_0x592659=this[_0x2c57a9(0x246)]();this[_0x2c57a9(0x2c3)]=new Window_TitleCommand(_0x592659),this[_0x2c57a9(0x2c3)][_0x2c57a9(0x4ce)](_0x50b108);const _0x35c1a6=this['commandWindowRect']();this[_0x2c57a9(0x2c3)][_0x2c57a9(0x44e)](_0x35c1a6['x'],_0x35c1a6['y'],_0x35c1a6['width'],_0x35c1a6[_0x2c57a9(0x3fc)]),this[_0x2c57a9(0x736)](this[_0x2c57a9(0x2c3)]);},Scene_Title[_0x3a331f(0x499)]['commandWindowRows']=function(){const _0x3d7064=_0x3a331f;return this[_0x3d7064(0x2c3)]?this[_0x3d7064(0x2c3)][_0x3d7064(0x440)]():VisuMZ[_0x3d7064(0x3c0)]['Settings'][_0x3d7064(0x625)]['length'];},Scene_Title['prototype']['commandWindowRect']=function(){const _0x2ba909=_0x3a331f;return VisuMZ[_0x2ba909(0x3c0)][_0x2ba909(0x6be)]['MenuLayout'][_0x2ba909(0x4c0)][_0x2ba909(0x485)][_0x2ba909(0x2eb)](this);},Scene_Title[_0x3a331f(0x499)]['createTitleButtons']=function(){const _0x29c351=_0x3a331f;for(const _0xde79ef of Scene_Title[_0x29c351(0x37b)]){const _0x4a22f8=new Sprite_TitlePictureButton(_0xde79ef);this[_0x29c351(0x59f)](_0x4a22f8);}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x54c)]=Scene_Map[_0x3a331f(0x499)][_0x3a331f(0x64b)],Scene_Map[_0x3a331f(0x499)]['initialize']=function(){const _0x351b84=_0x3a331f;VisuMZ[_0x351b84(0x3c0)]['Scene_Map_initialize']['call'](this),$gameTemp[_0x351b84(0x466)]();},VisuMZ[_0x3a331f(0x3c0)]['Scene_Map_updateMainMultiply']=Scene_Map[_0x3a331f(0x499)][_0x3a331f(0x1f9)],Scene_Map['prototype'][_0x3a331f(0x1f9)]=function(){const _0x600538=_0x3a331f;VisuMZ[_0x600538(0x3c0)][_0x600538(0x43b)]['call'](this),$gameTemp[_0x600538(0x201)]&&!$gameMessage['isBusy']()&&(this[_0x600538(0x3c5)](),SceneManager[_0x600538(0x33c)]());},Scene_Map[_0x3a331f(0x499)][_0x3a331f(0x514)]=function(){const _0x5896db=_0x3a331f;Scene_Message[_0x5896db(0x499)][_0x5896db(0x514)]['call'](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x5896db(0x536)][_0x5896db(0x560)](),this[_0x5896db(0x341)][_0x5896db(0x31b)](),this[_0x5896db(0x4f4)][_0x5896db(0x643)]=![],SceneManager[_0x5896db(0x4b5)]()),$gameScreen[_0x5896db(0x577)]();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x689)]=Scene_Map[_0x3a331f(0x499)][_0x3a331f(0x51f)],Scene_Map[_0x3a331f(0x499)][_0x3a331f(0x51f)]=function(){const _0x385f56=_0x3a331f;VisuMZ[_0x385f56(0x3c0)][_0x385f56(0x689)][_0x385f56(0x2eb)](this),SceneManager[_0x385f56(0x348)]()&&this[_0x385f56(0x2d9)]();},Scene_Map[_0x3a331f(0x499)][_0x3a331f(0x2d9)]=function(){const _0x4e5a19=_0x3a331f;this[_0x4e5a19(0x26a)]['x']=Graphics[_0x4e5a19(0x356)]+0x4;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x42f)]=Scene_Map[_0x3a331f(0x499)]['updateScene'],Scene_Map[_0x3a331f(0x499)][_0x3a331f(0x478)]=function(){const _0x4edf47=_0x3a331f;VisuMZ['CoreEngine'][_0x4edf47(0x42f)][_0x4edf47(0x2eb)](this),this[_0x4edf47(0x4b9)]();},Scene_Map['prototype']['updateDashToggle']=function(){const _0x146374=_0x3a331f;Input['isTriggered'](_0x146374(0x2e4))&&(ConfigManager[_0x146374(0x463)]=!ConfigManager[_0x146374(0x463)],ConfigManager[_0x146374(0x1c7)]());},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x1ce)]=Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x202)],Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x202)]=function(){const _0x2e8bf6=_0x3a331f;let _0x30cbee=0x0;return SceneManager['areButtonsOutsideMainUI']()?_0x30cbee=this[_0x2e8bf6(0x1ad)]():_0x30cbee=VisuMZ[_0x2e8bf6(0x3c0)][_0x2e8bf6(0x1ce)][_0x2e8bf6(0x2eb)](this),this[_0x2e8bf6(0x3d1)]()&&this[_0x2e8bf6(0x3b9)]()==='top'&&(_0x30cbee+=Window_ButtonAssist[_0x2e8bf6(0x499)]['lineHeight']()),_0x30cbee;},Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x1ad)]=function(){const _0x1817fe=_0x3a331f;return this[_0x1817fe(0x709)]()?this[_0x1817fe(0x258)]():0x0;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x48a)]=Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x6f3)],Scene_MenuBase['prototype'][_0x3a331f(0x6f3)]=function(){const _0x20b613=_0x3a331f;return SceneManager[_0x20b613(0x34a)]()?this[_0x20b613(0x21a)]():VisuMZ['CoreEngine'][_0x20b613(0x48a)][_0x20b613(0x2eb)](this);},Scene_MenuBase[_0x3a331f(0x499)]['mainAreaTopSideButtonLayout']=function(){const _0x539114=_0x3a331f;return!this[_0x539114(0x709)]()?this['helpAreaBottom']():0x0;},VisuMZ['CoreEngine'][_0x3a331f(0x44d)]=Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x646)],Scene_MenuBase[_0x3a331f(0x499)]['mainAreaHeight']=function(){const _0x526dc4=_0x3a331f;let _0x4ca4f8=0x0;return SceneManager[_0x526dc4(0x34a)]()?_0x4ca4f8=this[_0x526dc4(0x676)]():_0x4ca4f8=VisuMZ['CoreEngine'][_0x526dc4(0x44d)][_0x526dc4(0x2eb)](this),this['isMenuButtonAssistEnabled']()&&this[_0x526dc4(0x3b9)]()!=='button'&&(_0x4ca4f8-=Window_ButtonAssist['prototype'][_0x526dc4(0x1d9)]()),_0x4ca4f8;},Scene_MenuBase[_0x3a331f(0x499)]['mainAreaHeightSideButtonLayout']=function(){const _0x5f04d8=_0x3a331f;return Graphics[_0x5f04d8(0x4ff)]-this[_0x5f04d8(0x3a3)]();},VisuMZ[_0x3a331f(0x3c0)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x495)],Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x495)]=function(){const _0x1bb40e=_0x3a331f;this['_backgroundFilter']=new PIXI[(_0x1bb40e(0x1df))][(_0x1bb40e(0x43f))](clamp=!![]),this[_0x1bb40e(0x1be)]=new Sprite(),this['_backgroundSprite'][_0x1bb40e(0x4d9)]=SceneManager[_0x1bb40e(0x502)](),this[_0x1bb40e(0x1be)][_0x1bb40e(0x1df)]=[this[_0x1bb40e(0x610)]],this[_0x1bb40e(0x59f)](this[_0x1bb40e(0x1be)]),this[_0x1bb40e(0x32f)](0xc0),this[_0x1bb40e(0x32f)](this[_0x1bb40e(0x3c6)]()),this[_0x1bb40e(0x3e6)]();},Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x3c6)]=function(){const _0x110856=_0x3a331f,_0x2276ef=String(this[_0x110856(0x4d7)][_0x110856(0x2a8)]),_0x396eb8=this[_0x110856(0x55c)](_0x2276ef);return _0x396eb8?_0x396eb8[_0x110856(0x603)]:0xc0;},Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x3e6)]=function(){const _0x8d6f56=_0x3a331f,_0xecf591=String(this[_0x8d6f56(0x4d7)][_0x8d6f56(0x2a8)]),_0x261912=this[_0x8d6f56(0x55c)](_0xecf591);_0x261912&&(_0x261912[_0x8d6f56(0x4da)]!==''||_0x261912[_0x8d6f56(0x655)]!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x8d6f56(0x600)](_0x261912['BgFilename1'])),this[_0x8d6f56(0x4a8)]=new Sprite(ImageManager['loadTitle2'](_0x261912['BgFilename2'])),this['addChild'](this[_0x8d6f56(0x3c9)]),this[_0x8d6f56(0x59f)](this[_0x8d6f56(0x4a8)]),this[_0x8d6f56(0x3c9)][_0x8d6f56(0x4d9)][_0x8d6f56(0x1e2)](this[_0x8d6f56(0x1fb)][_0x8d6f56(0x58d)](this,this[_0x8d6f56(0x3c9)])),this[_0x8d6f56(0x4a8)]['bitmap'][_0x8d6f56(0x1e2)](this[_0x8d6f56(0x1fb)]['bind'](this,this[_0x8d6f56(0x4a8)])));},Scene_MenuBase[_0x3a331f(0x499)]['getCustomBackgroundSettings']=function(_0x49b9e5){const _0x3611e1=_0x3a331f;return VisuMZ[_0x3611e1(0x3c0)][_0x3611e1(0x6be)]['MenuBg'][_0x49b9e5]||VisuMZ[_0x3611e1(0x3c0)][_0x3611e1(0x6be)][_0x3611e1(0x3ee)][_0x3611e1(0x4b0)];},Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x1fb)]=function(_0x5f45ab){const _0x39f7fe=_0x3a331f;this['scaleSprite'](_0x5f45ab),this[_0x39f7fe(0x2cc)](_0x5f45ab);},VisuMZ['CoreEngine'][_0x3a331f(0x521)]=Scene_MenuBase['prototype'][_0x3a331f(0x647)],Scene_MenuBase[_0x3a331f(0x499)]['createCancelButton']=function(){const _0x1e7a50=_0x3a331f;VisuMZ[_0x1e7a50(0x3c0)][_0x1e7a50(0x521)]['call'](this),SceneManager[_0x1e7a50(0x348)]()&&this[_0x1e7a50(0x579)]();},Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x579)]=function(){const _0x312ce5=_0x3a331f;this[_0x312ce5(0x457)]['x']=Graphics[_0x312ce5(0x356)]+0x4;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x2de)]=Scene_MenuBase['prototype'][_0x3a331f(0x241)],Scene_MenuBase[_0x3a331f(0x499)]['createPageButtons']=function(){const _0x48239c=_0x3a331f;VisuMZ[_0x48239c(0x3c0)][_0x48239c(0x2de)]['call'](this),SceneManager[_0x48239c(0x348)]()&&this[_0x48239c(0x3f5)]();},Scene_MenuBase['prototype']['movePageButtonSideButtonLayout']=function(){const _0xef1a3e=_0x3a331f;this[_0xef1a3e(0x5cc)]['x']=-0x1*(this[_0xef1a3e(0x5cc)]['width']+this['_pagedownButton']['width']+0x8),this[_0xef1a3e(0x1a1)]['x']=-0x1*(this[_0xef1a3e(0x1a1)]['width']+0x4);},Scene_MenuBase[_0x3a331f(0x499)]['isMenuButtonAssistEnabled']=function(){const _0x5b74ee=_0x3a331f;return VisuMZ[_0x5b74ee(0x3c0)][_0x5b74ee(0x6be)][_0x5b74ee(0x4ca)][_0x5b74ee(0x3a2)];},Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x3b9)]=function(){const _0x179949=_0x3a331f;return SceneManager[_0x179949(0x348)]()||SceneManager[_0x179949(0x51e)]()?VisuMZ[_0x179949(0x3c0)][_0x179949(0x6be)][_0x179949(0x4ca)]['Location']:_0x179949(0x5e0);},Scene_MenuBase[_0x3a331f(0x499)]['createButtonAssistWindow']=function(){const _0xaa1a2b=_0x3a331f;if(!this[_0xaa1a2b(0x3d1)]())return;const _0xa4d251=this[_0xaa1a2b(0x3ba)]();this[_0xaa1a2b(0x447)]=new Window_ButtonAssist(_0xa4d251),this['addWindow'](this[_0xaa1a2b(0x447)]);},Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x3ba)]=function(){const _0xbb0782=_0x3a331f;return this[_0xbb0782(0x3b9)]()===_0xbb0782(0x5e0)?this[_0xbb0782(0x3ed)]():this[_0xbb0782(0x62c)]();},Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x3ed)]=function(){const _0x8024b0=_0x3a331f,_0x84faf6=ConfigManager['touchUI']?(Sprite_Button[_0x8024b0(0x499)][_0x8024b0(0x25b)]()+0x6)*0x2:0x0,_0x511c9d=this[_0x8024b0(0x350)](),_0x13ae56=Graphics['boxWidth']-_0x84faf6*0x2,_0x4bdef5=this[_0x8024b0(0x5dc)]();return new Rectangle(_0x84faf6,_0x511c9d,_0x13ae56,_0x4bdef5);},Scene_MenuBase[_0x3a331f(0x499)][_0x3a331f(0x62c)]=function(){const _0x32371b=_0x3a331f,_0x447bd5=Graphics[_0x32371b(0x356)],_0xbba51f=Window_ButtonAssist['prototype'][_0x32371b(0x1d9)](),_0x184684=0x0;let _0x5b0f77=0x0;return this[_0x32371b(0x3b9)]()===_0x32371b(0x501)?_0x5b0f77=0x0:_0x5b0f77=Graphics['boxHeight']-_0xbba51f,new Rectangle(_0x184684,_0x5b0f77,_0x447bd5,_0xbba51f);},Scene_Menu[_0x3a331f(0x1b4)]=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x629)][_0x3a331f(0x5eb)],VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x247)]=Scene_Menu['prototype']['create'],Scene_Menu['prototype']['create']=function(){const _0xeaef5f=_0x3a331f;VisuMZ['CoreEngine'][_0xeaef5f(0x247)][_0xeaef5f(0x2eb)](this),this[_0xeaef5f(0x6d9)]();},Scene_Menu[_0x3a331f(0x499)]['setCoreEngineUpdateWindowBg']=function(){const _0x296ea8=_0x3a331f;this['_commandWindow']&&this[_0x296ea8(0x2c3)][_0x296ea8(0x4ce)](Scene_Menu['layoutSettings'][_0x296ea8(0x27a)]),this[_0x296ea8(0x1d7)]&&this[_0x296ea8(0x1d7)]['setBackgroundType'](Scene_Menu[_0x296ea8(0x1b4)]['GoldBgType']),this[_0x296ea8(0x48f)]&&this[_0x296ea8(0x48f)][_0x296ea8(0x4ce)](Scene_Menu[_0x296ea8(0x1b4)]['StatusBgType']);},Scene_Menu[_0x3a331f(0x499)][_0x3a331f(0x246)]=function(){const _0x4e17f5=_0x3a331f;return Scene_Menu['layoutSettings'][_0x4e17f5(0x485)]['call'](this);},Scene_Menu[_0x3a331f(0x499)][_0x3a331f(0x267)]=function(){const _0x32c4d1=_0x3a331f;return Scene_Menu[_0x32c4d1(0x1b4)][_0x32c4d1(0x441)]['call'](this);},Scene_Menu[_0x3a331f(0x499)][_0x3a331f(0x3d9)]=function(){const _0x4920be=_0x3a331f;return Scene_Menu[_0x4920be(0x1b4)][_0x4920be(0x2fd)][_0x4920be(0x2eb)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x629)]['ItemMenu'],VisuMZ[_0x3a331f(0x3c0)]['Scene_Item_create']=Scene_Item[_0x3a331f(0x499)][_0x3a331f(0x6d5)],Scene_Item[_0x3a331f(0x499)][_0x3a331f(0x6d5)]=function(){const _0x25fa92=_0x3a331f;VisuMZ['CoreEngine'][_0x25fa92(0x3c8)][_0x25fa92(0x2eb)](this),this[_0x25fa92(0x6d9)]();},Scene_Item[_0x3a331f(0x499)][_0x3a331f(0x6d9)]=function(){const _0x5addad=_0x3a331f;this[_0x5addad(0x2dc)]&&this[_0x5addad(0x2dc)]['setBackgroundType'](Scene_Item['layoutSettings'][_0x5addad(0x33f)]),this['_categoryWindow']&&this[_0x5addad(0x284)]['setBackgroundType'](Scene_Item[_0x5addad(0x1b4)]['CategoryBgType']),this[_0x5addad(0x2f4)]&&this[_0x5addad(0x2f4)][_0x5addad(0x4ce)](Scene_Item[_0x5addad(0x1b4)][_0x5addad(0x308)]),this[_0x5addad(0x380)]&&this[_0x5addad(0x380)]['setBackgroundType'](Scene_Item[_0x5addad(0x1b4)][_0x5addad(0x73c)]);},Scene_Item['prototype'][_0x3a331f(0x21c)]=function(){const _0x3a8aa2=_0x3a331f;return Scene_Item[_0x3a8aa2(0x1b4)][_0x3a8aa2(0x4c5)]['call'](this);},Scene_Item[_0x3a331f(0x499)][_0x3a331f(0x4cc)]=function(){const _0x35cb5a=_0x3a331f;return Scene_Item[_0x35cb5a(0x1b4)]['CategoryRect'][_0x35cb5a(0x2eb)](this);},Scene_Item[_0x3a331f(0x499)][_0x3a331f(0x31a)]=function(){const _0x12e2d9=_0x3a331f;return Scene_Item[_0x12e2d9(0x1b4)]['ItemRect'][_0x12e2d9(0x2eb)](this);},Scene_Item[_0x3a331f(0x499)][_0x3a331f(0x30e)]=function(){const _0x24af86=_0x3a331f;return Scene_Item[_0x24af86(0x1b4)][_0x24af86(0x2ee)][_0x24af86(0x2eb)](this);},Scene_Skill[_0x3a331f(0x1b4)]=VisuMZ['CoreEngine'][_0x3a331f(0x6be)]['MenuLayout'][_0x3a331f(0x55f)],VisuMZ[_0x3a331f(0x3c0)]['Scene_Skill_create']=Scene_Skill[_0x3a331f(0x499)][_0x3a331f(0x6d5)],Scene_Skill[_0x3a331f(0x499)][_0x3a331f(0x6d5)]=function(){const _0x152143=_0x3a331f;VisuMZ[_0x152143(0x3c0)][_0x152143(0x5d5)]['call'](this),this[_0x152143(0x6d9)]();},Scene_Skill[_0x3a331f(0x499)][_0x3a331f(0x6d9)]=function(){const _0x4386a8=_0x3a331f;this[_0x4386a8(0x2dc)]&&this[_0x4386a8(0x2dc)][_0x4386a8(0x4ce)](Scene_Skill[_0x4386a8(0x1b4)][_0x4386a8(0x33f)]),this[_0x4386a8(0x60c)]&&this[_0x4386a8(0x60c)][_0x4386a8(0x4ce)](Scene_Skill[_0x4386a8(0x1b4)][_0x4386a8(0x54e)]),this['_statusWindow']&&this['_statusWindow'][_0x4386a8(0x4ce)](Scene_Skill[_0x4386a8(0x1b4)][_0x4386a8(0x4ea)]),this[_0x4386a8(0x2f4)]&&this[_0x4386a8(0x2f4)][_0x4386a8(0x4ce)](Scene_Skill['layoutSettings']['ItemBgType']),this[_0x4386a8(0x380)]&&this[_0x4386a8(0x380)][_0x4386a8(0x4ce)](Scene_Skill[_0x4386a8(0x1b4)][_0x4386a8(0x73c)]);},Scene_Skill[_0x3a331f(0x499)][_0x3a331f(0x21c)]=function(){const _0x41cec6=_0x3a331f;return Scene_Skill[_0x41cec6(0x1b4)][_0x41cec6(0x4c5)]['call'](this);},Scene_Skill[_0x3a331f(0x499)][_0x3a331f(0x23c)]=function(){const _0x2874bb=_0x3a331f;return Scene_Skill['layoutSettings'][_0x2874bb(0x529)]['call'](this);},Scene_Skill['prototype'][_0x3a331f(0x3d9)]=function(){const _0x4b68c5=_0x3a331f;return Scene_Skill[_0x4b68c5(0x1b4)][_0x4b68c5(0x2fd)][_0x4b68c5(0x2eb)](this);},Scene_Skill['prototype'][_0x3a331f(0x31a)]=function(){const _0x43504c=_0x3a331f;return Scene_Skill['layoutSettings'][_0x43504c(0x60b)][_0x43504c(0x2eb)](this);},Scene_Skill['prototype'][_0x3a331f(0x30e)]=function(){return Scene_Skill['layoutSettings']['ActorRect']['call'](this);},Scene_Equip['layoutSettings']=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x629)][_0x3a331f(0x37c)],VisuMZ['CoreEngine']['Scene_Equip_create']=Scene_Equip[_0x3a331f(0x499)][_0x3a331f(0x6d5)],Scene_Equip[_0x3a331f(0x499)][_0x3a331f(0x6d5)]=function(){const _0x5fa8b8=_0x3a331f;VisuMZ[_0x5fa8b8(0x3c0)][_0x5fa8b8(0x73f)][_0x5fa8b8(0x2eb)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Equip['prototype'][_0x3a331f(0x6d9)]=function(){const _0x278ca4=_0x3a331f;this[_0x278ca4(0x2dc)]&&this[_0x278ca4(0x2dc)][_0x278ca4(0x4ce)](Scene_Equip['layoutSettings'][_0x278ca4(0x33f)]),this['_statusWindow']&&this['_statusWindow'][_0x278ca4(0x4ce)](Scene_Equip['layoutSettings'][_0x278ca4(0x4ea)]),this['_commandWindow']&&this[_0x278ca4(0x2c3)]['setBackgroundType'](Scene_Equip['layoutSettings'][_0x278ca4(0x27a)]),this['_slotWindow']&&this[_0x278ca4(0x66d)][_0x278ca4(0x4ce)](Scene_Equip[_0x278ca4(0x1b4)]['SlotBgType']),this[_0x278ca4(0x2f4)]&&this[_0x278ca4(0x2f4)][_0x278ca4(0x4ce)](Scene_Equip[_0x278ca4(0x1b4)][_0x278ca4(0x308)]);},Scene_Equip[_0x3a331f(0x499)]['helpWindowRect']=function(){const _0x282b0c=_0x3a331f;return Scene_Equip['layoutSettings'][_0x282b0c(0x4c5)][_0x282b0c(0x2eb)](this);},Scene_Equip[_0x3a331f(0x499)]['statusWindowRect']=function(){const _0x107247=_0x3a331f;return Scene_Equip['layoutSettings'][_0x107247(0x2fd)][_0x107247(0x2eb)](this);},Scene_Equip[_0x3a331f(0x499)][_0x3a331f(0x246)]=function(){const _0x1b60c6=_0x3a331f;return Scene_Equip[_0x1b60c6(0x1b4)]['CommandRect'][_0x1b60c6(0x2eb)](this);},Scene_Equip[_0x3a331f(0x499)][_0x3a331f(0x5c1)]=function(){const _0x336576=_0x3a331f;return Scene_Equip[_0x336576(0x1b4)][_0x336576(0x458)][_0x336576(0x2eb)](this);},Scene_Equip[_0x3a331f(0x499)][_0x3a331f(0x31a)]=function(){const _0x55261b=_0x3a331f;return Scene_Equip[_0x55261b(0x1b4)][_0x55261b(0x60b)]['call'](this);},Scene_Status[_0x3a331f(0x1b4)]=VisuMZ['CoreEngine'][_0x3a331f(0x6be)][_0x3a331f(0x629)][_0x3a331f(0x6c5)],VisuMZ['CoreEngine']['Scene_Status_create']=Scene_Status[_0x3a331f(0x499)][_0x3a331f(0x6d5)],Scene_Status[_0x3a331f(0x499)]['create']=function(){const _0x4d94c8=_0x3a331f;VisuMZ[_0x4d94c8(0x3c0)][_0x4d94c8(0x206)][_0x4d94c8(0x2eb)](this),this[_0x4d94c8(0x6d9)]();},Scene_Status[_0x3a331f(0x499)][_0x3a331f(0x6d9)]=function(){const _0x473933=_0x3a331f;this[_0x473933(0x344)]&&this['_profileWindow'][_0x473933(0x4ce)](Scene_Status[_0x473933(0x1b4)][_0x473933(0x2a7)]),this[_0x473933(0x48f)]&&this['_statusWindow'][_0x473933(0x4ce)](Scene_Status[_0x473933(0x1b4)][_0x473933(0x4ea)]),this[_0x473933(0x678)]&&this[_0x473933(0x678)]['setBackgroundType'](Scene_Status['layoutSettings']['StatusParamsBgType']),this[_0x473933(0x541)]&&this['_statusEquipWindow'][_0x473933(0x4ce)](Scene_Status[_0x473933(0x1b4)][_0x473933(0x559)]);},Scene_Status[_0x3a331f(0x499)][_0x3a331f(0x2b6)]=function(){const _0xf5fc08=_0x3a331f;return Scene_Status[_0xf5fc08(0x1b4)][_0xf5fc08(0x28e)][_0xf5fc08(0x2eb)](this);},Scene_Status[_0x3a331f(0x499)][_0x3a331f(0x3d9)]=function(){const _0x2c7985=_0x3a331f;return Scene_Status['layoutSettings'][_0x2c7985(0x2fd)][_0x2c7985(0x2eb)](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){const _0x222ce7=_0x3a331f;return Scene_Status['layoutSettings']['StatusParamsRect'][_0x222ce7(0x2eb)](this);},Scene_Status[_0x3a331f(0x499)][_0x3a331f(0x686)]=function(){const _0x1d7270=_0x3a331f;return Scene_Status[_0x1d7270(0x1b4)]['StatusEquipRect'][_0x1d7270(0x2eb)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x3a331f(0x3c0)]['Settings'][_0x3a331f(0x629)][_0x3a331f(0x2f7)],VisuMZ[_0x3a331f(0x3c0)]['Scene_Options_create']=Scene_Options['prototype']['create'],Scene_Options[_0x3a331f(0x499)][_0x3a331f(0x6d5)]=function(){const _0x4fe8a4=_0x3a331f;VisuMZ[_0x4fe8a4(0x3c0)]['Scene_Options_create'][_0x4fe8a4(0x2eb)](this),this[_0x4fe8a4(0x6d9)]();},Scene_Options[_0x3a331f(0x499)][_0x3a331f(0x6d9)]=function(){const _0x925230=_0x3a331f;this['_optionsWindow']&&this['_optionsWindow']['setBackgroundType'](Scene_Options[_0x925230(0x1b4)]['OptionsBgType']);},Scene_Options[_0x3a331f(0x499)]['optionsWindowRect']=function(){const _0x50dc40=_0x3a331f;return Scene_Options[_0x50dc40(0x1b4)][_0x50dc40(0x4f1)]['call'](this);},Scene_Save[_0x3a331f(0x1b4)]=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x629)][_0x3a331f(0x2a3)],Scene_Save['prototype'][_0x3a331f(0x6d5)]=function(){const _0x39bcb1=_0x3a331f;Scene_File[_0x39bcb1(0x499)]['create']['call'](this),this[_0x39bcb1(0x6d9)]();},Scene_Save['prototype'][_0x3a331f(0x6d9)]=function(){const _0x138d09=_0x3a331f;this[_0x138d09(0x2dc)]&&this['_helpWindow'][_0x138d09(0x4ce)](Scene_Save['layoutSettings'][_0x138d09(0x33f)]),this['_listWindow']&&this[_0x138d09(0x3a9)]['setBackgroundType'](Scene_Save[_0x138d09(0x1b4)]['ListBgType']);},Scene_Save[_0x3a331f(0x499)]['helpWindowRect']=function(){const _0x51bb3d=_0x3a331f;return Scene_Save[_0x51bb3d(0x1b4)][_0x51bb3d(0x4c5)][_0x51bb3d(0x2eb)](this);},Scene_Save[_0x3a331f(0x499)][_0x3a331f(0x44f)]=function(){const _0x561447=_0x3a331f;return Scene_Save[_0x561447(0x1b4)][_0x561447(0x4bb)][_0x561447(0x2eb)](this);},Scene_Load[_0x3a331f(0x1b4)]=VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x3a331f(0x329)],Scene_Load['prototype'][_0x3a331f(0x6d5)]=function(){const _0xfd569e=_0x3a331f;Scene_File[_0xfd569e(0x499)][_0xfd569e(0x6d5)][_0xfd569e(0x2eb)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load['prototype'][_0x3a331f(0x6d9)]=function(){const _0x3f4991=_0x3a331f;this[_0x3f4991(0x2dc)]&&this[_0x3f4991(0x2dc)][_0x3f4991(0x4ce)](Scene_Load[_0x3f4991(0x1b4)]['HelpBgType']),this['_listWindow']&&this['_listWindow'][_0x3f4991(0x4ce)](Scene_Load[_0x3f4991(0x1b4)][_0x3f4991(0x62a)]);},Scene_Load[_0x3a331f(0x499)][_0x3a331f(0x21c)]=function(){const _0x2b5f75=_0x3a331f;return Scene_Load[_0x2b5f75(0x1b4)]['HelpRect'][_0x2b5f75(0x2eb)](this);},Scene_Load['prototype'][_0x3a331f(0x44f)]=function(){const _0x4598ae=_0x3a331f;return Scene_Load[_0x4598ae(0x1b4)][_0x4598ae(0x4bb)][_0x4598ae(0x2eb)](this);},Scene_GameEnd[_0x3a331f(0x1b4)]=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x629)][_0x3a331f(0x4ab)],VisuMZ['CoreEngine'][_0x3a331f(0x3ce)]=Scene_GameEnd[_0x3a331f(0x499)][_0x3a331f(0x495)],Scene_GameEnd[_0x3a331f(0x499)]['createBackground']=function(){const _0x57dfa0=_0x3a331f;Scene_MenuBase[_0x57dfa0(0x499)][_0x57dfa0(0x495)]['call'](this);},Scene_GameEnd[_0x3a331f(0x499)][_0x3a331f(0x61c)]=function(){const _0x225ffa=_0x3a331f,_0x382573=this['commandWindowRect']();this[_0x225ffa(0x2c3)]=new Window_GameEnd(_0x382573),this[_0x225ffa(0x2c3)][_0x225ffa(0x69a)]('cancel',this[_0x225ffa(0x37a)][_0x225ffa(0x58d)](this)),this[_0x225ffa(0x736)](this[_0x225ffa(0x2c3)]),this['_commandWindow'][_0x225ffa(0x4ce)](Scene_GameEnd[_0x225ffa(0x1b4)]['CommandBgType']);},Scene_GameEnd[_0x3a331f(0x499)][_0x3a331f(0x246)]=function(){const _0x10f7b5=_0x3a331f;return Scene_GameEnd[_0x10f7b5(0x1b4)][_0x10f7b5(0x485)][_0x10f7b5(0x2eb)](this);},Scene_Shop[_0x3a331f(0x1b4)]=VisuMZ['CoreEngine'][_0x3a331f(0x6be)]['MenuLayout'][_0x3a331f(0x675)],VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x727)]=Scene_Shop[_0x3a331f(0x499)][_0x3a331f(0x6d5)],Scene_Shop[_0x3a331f(0x499)][_0x3a331f(0x6d5)]=function(){const _0x274ee8=_0x3a331f;VisuMZ['CoreEngine'][_0x274ee8(0x727)][_0x274ee8(0x2eb)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Shop[_0x3a331f(0x499)][_0x3a331f(0x6d9)]=function(){const _0x56a8e3=_0x3a331f;this[_0x56a8e3(0x2dc)]&&this[_0x56a8e3(0x2dc)]['setBackgroundType'](Scene_Shop['layoutSettings'][_0x56a8e3(0x33f)]),this['_goldWindow']&&this[_0x56a8e3(0x1d7)][_0x56a8e3(0x4ce)](Scene_Shop[_0x56a8e3(0x1b4)]['GoldBgType']),this[_0x56a8e3(0x2c3)]&&this[_0x56a8e3(0x2c3)][_0x56a8e3(0x4ce)](Scene_Shop[_0x56a8e3(0x1b4)][_0x56a8e3(0x27a)]),this[_0x56a8e3(0x558)]&&this[_0x56a8e3(0x558)][_0x56a8e3(0x4ce)](Scene_Shop[_0x56a8e3(0x1b4)][_0x56a8e3(0x665)]),this['_numberWindow']&&this['_numberWindow'][_0x56a8e3(0x4ce)](Scene_Shop[_0x56a8e3(0x1b4)][_0x56a8e3(0x3c4)]),this[_0x56a8e3(0x48f)]&&this[_0x56a8e3(0x48f)][_0x56a8e3(0x4ce)](Scene_Shop[_0x56a8e3(0x1b4)][_0x56a8e3(0x4ea)]),this[_0x56a8e3(0x461)]&&this['_buyWindow'][_0x56a8e3(0x4ce)](Scene_Shop[_0x56a8e3(0x1b4)]['BuyBgType']),this[_0x56a8e3(0x284)]&&this[_0x56a8e3(0x284)]['setBackgroundType'](Scene_Shop[_0x56a8e3(0x1b4)][_0x56a8e3(0x1ed)]),this[_0x56a8e3(0x4d6)]&&this[_0x56a8e3(0x4d6)]['setBackgroundType'](Scene_Shop[_0x56a8e3(0x1b4)][_0x56a8e3(0x2cb)]);},Scene_Shop['prototype'][_0x3a331f(0x21c)]=function(){const _0x153c02=_0x3a331f;return Scene_Shop[_0x153c02(0x1b4)]['HelpRect'][_0x153c02(0x2eb)](this);},Scene_Shop[_0x3a331f(0x499)]['goldWindowRect']=function(){const _0x103e4c=_0x3a331f;return Scene_Shop[_0x103e4c(0x1b4)][_0x103e4c(0x441)][_0x103e4c(0x2eb)](this);},Scene_Shop['prototype'][_0x3a331f(0x246)]=function(){const _0x8d96a=_0x3a331f;return Scene_Shop[_0x8d96a(0x1b4)]['CommandRect'][_0x8d96a(0x2eb)](this);},Scene_Shop[_0x3a331f(0x499)][_0x3a331f(0x429)]=function(){const _0x2e14ae=_0x3a331f;return Scene_Shop[_0x2e14ae(0x1b4)][_0x2e14ae(0x3f8)][_0x2e14ae(0x2eb)](this);},Scene_Shop[_0x3a331f(0x499)][_0x3a331f(0x621)]=function(){const _0x1b014d=_0x3a331f;return Scene_Shop['layoutSettings'][_0x1b014d(0x72c)][_0x1b014d(0x2eb)](this);},Scene_Shop[_0x3a331f(0x499)][_0x3a331f(0x3d9)]=function(){const _0x363b00=_0x3a331f;return Scene_Shop[_0x363b00(0x1b4)]['StatusRect']['call'](this);},Scene_Shop[_0x3a331f(0x499)][_0x3a331f(0x4c2)]=function(){const _0x5b5355=_0x3a331f;return Scene_Shop[_0x5b5355(0x1b4)]['BuyRect'][_0x5b5355(0x2eb)](this);},Scene_Shop[_0x3a331f(0x499)][_0x3a331f(0x4cc)]=function(){const _0x413d40=_0x3a331f;return Scene_Shop[_0x413d40(0x1b4)][_0x413d40(0x679)]['call'](this);},Scene_Shop['prototype'][_0x3a331f(0x452)]=function(){const _0x42a5c9=_0x3a331f;return Scene_Shop[_0x42a5c9(0x1b4)][_0x42a5c9(0x4dc)]['call'](this);},Scene_Name[_0x3a331f(0x1b4)]=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x629)][_0x3a331f(0x5e7)],VisuMZ['CoreEngine'][_0x3a331f(0x659)]=Scene_Name[_0x3a331f(0x499)][_0x3a331f(0x6d5)],Scene_Name[_0x3a331f(0x499)][_0x3a331f(0x6d5)]=function(){const _0x1655ff=_0x3a331f;VisuMZ[_0x1655ff(0x3c0)]['Scene_Name_create'][_0x1655ff(0x2eb)](this),this[_0x1655ff(0x6d9)]();},Scene_Name['prototype'][_0x3a331f(0x6d9)]=function(){const _0x454494=_0x3a331f;this[_0x454494(0x596)]&&this['_editWindow'][_0x454494(0x4ce)](Scene_Name[_0x454494(0x1b4)][_0x454494(0x3f6)]),this['_inputWindow']&&this[_0x454494(0x6b8)][_0x454494(0x4ce)](Scene_Name['layoutSettings'][_0x454494(0x52d)]);},Scene_Name['prototype'][_0x3a331f(0x3a3)]=function(){return 0x0;},Scene_Name[_0x3a331f(0x499)][_0x3a331f(0x31f)]=function(){const _0x25db7b=_0x3a331f;return Scene_Name[_0x25db7b(0x1b4)]['EditRect'][_0x25db7b(0x2eb)](this);},Scene_Name[_0x3a331f(0x499)]['inputWindowRect']=function(){const _0x25d314=_0x3a331f;return Scene_Name[_0x25d314(0x1b4)][_0x25d314(0x601)]['call'](this);},Scene_Name[_0x3a331f(0x499)]['EnableNameInput']=function(){const _0xf9c579=_0x3a331f;if(!this[_0xf9c579(0x6b8)])return![];return VisuMZ[_0xf9c579(0x3c0)][_0xf9c579(0x6be)][_0xf9c579(0x58c)][_0xf9c579(0x20d)];},Scene_Name[_0x3a331f(0x499)][_0x3a331f(0x444)]=function(){const _0x522eaf=_0x3a331f;return this[_0x522eaf(0x20d)]()?TextManager['getInputButtonString'](_0x522eaf(0x360)):Scene_MenuBase['prototype'][_0x522eaf(0x444)][_0x522eaf(0x2eb)](this);},Scene_Name['prototype']['buttonAssistText1']=function(){const _0x4670ea=_0x3a331f;if(this[_0x4670ea(0x20d)]()){const _0x4dc6f4=VisuMZ[_0x4670ea(0x3c0)]['Settings'][_0x4670ea(0x58c)];return this[_0x4670ea(0x6b8)][_0x4670ea(0x58e)]===_0x4670ea(0x209)?_0x4dc6f4[_0x4670ea(0x53d)]||'Keyboard':_0x4dc6f4[_0x4670ea(0x47f)]||_0x4670ea(0x47f);}else return Scene_MenuBase[_0x4670ea(0x499)][_0x4670ea(0x260)][_0x4670ea(0x2eb)](this);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x5f5)]=Scene_Name[_0x3a331f(0x499)]['onInputOk'],Scene_Name['prototype'][_0x3a331f(0x300)]=function(){const _0x1925ec=_0x3a331f;this[_0x1925ec(0x37e)]()?this['onInputBannedWords']():VisuMZ[_0x1925ec(0x3c0)]['Scene_Name_onInputOk']['call'](this);},Scene_Name[_0x3a331f(0x499)][_0x3a331f(0x37e)]=function(){const _0x234334=_0x3a331f,_0x4b4ea3=VisuMZ[_0x234334(0x3c0)][_0x234334(0x6be)][_0x234334(0x58c)];if(!_0x4b4ea3)return![];const _0x3148bb=_0x4b4ea3[_0x234334(0x52b)];if(!_0x3148bb)return![];const _0x179232=this[_0x234334(0x596)][_0x234334(0x2a8)]()[_0x234334(0x318)]();for(const _0x3105a3 of _0x3148bb){if(_0x179232[_0x234334(0x2a5)](_0x3105a3[_0x234334(0x318)]()))return!![];}return![];},Scene_Name[_0x3a331f(0x499)]['onInputBannedWords']=function(){const _0x44be65=_0x3a331f;SoundManager[_0x44be65(0x5b5)]();},VisuMZ[_0x3a331f(0x3c0)]['Scene_Battle_update']=Scene_Battle[_0x3a331f(0x499)][_0x3a331f(0x560)],Scene_Battle[_0x3a331f(0x499)][_0x3a331f(0x560)]=function(){const _0x58eaf9=_0x3a331f;VisuMZ[_0x58eaf9(0x3c0)]['Scene_Battle_update'][_0x58eaf9(0x2eb)](this);if($gameTemp[_0x58eaf9(0x201)])this[_0x58eaf9(0x1b7)]();},Scene_Battle[_0x3a331f(0x499)][_0x3a331f(0x1b7)]=function(){const _0x1dd71f=_0x3a331f;!BattleManager[_0x1dd71f(0x2fc)]()&&!this[_0x1dd71f(0x208)]&&!$gameMessage[_0x1dd71f(0x2b4)]()&&(this['_playtestF7Looping']=!![],this[_0x1dd71f(0x560)](),SceneManager['updateEffekseer'](),this[_0x1dd71f(0x208)]=![]);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x42c)]=Scene_Battle[_0x3a331f(0x499)]['createCancelButton'],Scene_Battle[_0x3a331f(0x499)][_0x3a331f(0x647)]=function(){const _0xdaa7db=_0x3a331f;VisuMZ[_0xdaa7db(0x3c0)]['Scene_Battle_createCancelButton'][_0xdaa7db(0x2eb)](this),SceneManager[_0xdaa7db(0x348)]()&&this[_0xdaa7db(0x49a)]();},Scene_Battle[_0x3a331f(0x499)][_0x3a331f(0x49a)]=function(){const _0x58eac5=_0x3a331f;this['_cancelButton']['x']=Graphics['boxWidth']+0x4,this[_0x58eac5(0x204)]()?this[_0x58eac5(0x457)]['y']=Graphics['boxHeight']-this[_0x58eac5(0x5dc)]():this['_cancelButton']['y']=0x0;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x214)]=Sprite_Button[_0x3a331f(0x499)]['initialize'],Sprite_Button[_0x3a331f(0x499)][_0x3a331f(0x64b)]=function(_0x22059e){const _0x36d11c=_0x3a331f;VisuMZ['CoreEngine'][_0x36d11c(0x214)][_0x36d11c(0x2eb)](this,_0x22059e),this[_0x36d11c(0x5d2)]();},Sprite_Button['prototype'][_0x3a331f(0x5d2)]=function(){const _0x72b3bb=_0x3a331f,_0xef93d5=VisuMZ[_0x72b3bb(0x3c0)][_0x72b3bb(0x6be)]['UI'];this[_0x72b3bb(0x37d)]=![];switch(this[_0x72b3bb(0x23b)]){case _0x72b3bb(0x1ff):this[_0x72b3bb(0x37d)]=!_0xef93d5[_0x72b3bb(0x706)];break;case _0x72b3bb(0x406):case _0x72b3bb(0x221):this[_0x72b3bb(0x37d)]=!_0xef93d5[_0x72b3bb(0x700)];break;case _0x72b3bb(0x378):case'up':case _0x72b3bb(0x421):case _0x72b3bb(0x281):case'ok':this[_0x72b3bb(0x37d)]=!_0xef93d5['numberShowButton'];break;case'menu':this[_0x72b3bb(0x37d)]=!_0xef93d5[_0x72b3bb(0x6e5)];break;}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x34d)]=Sprite_Button['prototype'][_0x3a331f(0x2bb)],Sprite_Button[_0x3a331f(0x499)][_0x3a331f(0x2bb)]=function(){const _0x4d6e54=_0x3a331f;SceneManager[_0x4d6e54(0x51e)]()||this[_0x4d6e54(0x37d)]?this[_0x4d6e54(0x25c)]():VisuMZ[_0x4d6e54(0x3c0)][_0x4d6e54(0x34d)][_0x4d6e54(0x2eb)](this);},Sprite_Button[_0x3a331f(0x499)][_0x3a331f(0x25c)]=function(){const _0x4686ff=_0x3a331f;this[_0x4686ff(0x643)]=![],this[_0x4686ff(0x1f3)]=0x0,this['x']=Graphics[_0x4686ff(0x483)]*0xa,this['y']=Graphics[_0x4686ff(0x3fc)]*0xa;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x366)]=Sprite_Battler['prototype'][_0x3a331f(0x3c2)],Sprite_Battler[_0x3a331f(0x499)][_0x3a331f(0x3c2)]=function(_0x4bb6b3,_0x85dff1,_0x4bb625){const _0x434a73=_0x3a331f;(this['_targetOffsetX']!==_0x4bb6b3||this[_0x434a73(0x3bc)]!==_0x85dff1)&&(this[_0x434a73(0x65e)]('Linear'),this[_0x434a73(0x265)]=_0x4bb625),VisuMZ[_0x434a73(0x3c0)][_0x434a73(0x366)][_0x434a73(0x2eb)](this,_0x4bb6b3,_0x85dff1,_0x4bb625);},Sprite_Battler[_0x3a331f(0x499)][_0x3a331f(0x65e)]=function(_0x3d494b){const _0x4ff901=_0x3a331f;this[_0x4ff901(0x4fb)]=_0x3d494b;},Sprite_Battler[_0x3a331f(0x499)][_0x3a331f(0x50b)]=function(){const _0x43f1e8=_0x3a331f;if(this[_0x43f1e8(0x4fc)]<=0x0)return;const _0x288ea8=this[_0x43f1e8(0x4fc)],_0x5c4337=this[_0x43f1e8(0x265)],_0x2997f0=this[_0x43f1e8(0x4fb)];this[_0x43f1e8(0x62f)]=this[_0x43f1e8(0x25a)](this[_0x43f1e8(0x62f)],this[_0x43f1e8(0x49e)],_0x288ea8,_0x5c4337,_0x2997f0),this[_0x43f1e8(0x306)]=this['applyEasing'](this['_offsetY'],this[_0x43f1e8(0x3bc)],_0x288ea8,_0x5c4337,_0x2997f0),this[_0x43f1e8(0x4fc)]--;if(this['_movementDuration']<=0x0)this[_0x43f1e8(0x22b)]();},Sprite_Battler[_0x3a331f(0x499)][_0x3a331f(0x25a)]=function(_0x30fdad,_0x2f7c46,_0x111790,_0x3bd029,_0x1cfe43){const _0x3c6af6=_0x3a331f,_0x18298d=VisuMZ[_0x3c6af6(0x5d3)]((_0x3bd029-_0x111790)/_0x3bd029,_0x1cfe43||'Linear'),_0xe5d5b9=VisuMZ[_0x3c6af6(0x5d3)]((_0x3bd029-_0x111790+0x1)/_0x3bd029,_0x1cfe43||'Linear'),_0xae7795=(_0x30fdad-_0x2f7c46*_0x18298d)/(0x1-_0x18298d);return _0xae7795+(_0x2f7c46-_0xae7795)*_0xe5d5b9;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x71e)]=Sprite_Actor[_0x3a331f(0x499)][_0x3a331f(0x474)],Sprite_Actor[_0x3a331f(0x499)][_0x3a331f(0x474)]=function(_0x5175de){const _0x4d627d=_0x3a331f;VisuMZ[_0x4d627d(0x3c0)][_0x4d627d(0x6be)]['UI'][_0x4d627d(0x35a)]?this[_0x4d627d(0x5ac)](_0x5175de):VisuMZ[_0x4d627d(0x3c0)][_0x4d627d(0x71e)][_0x4d627d(0x2eb)](this,_0x5175de);},Sprite_Actor[_0x3a331f(0x499)][_0x3a331f(0x5ac)]=function(_0x347776){const _0x3c8ff3=_0x3a331f;let _0x1c169c=Math[_0x3c8ff3(0x469)](Graphics[_0x3c8ff3(0x483)]/0x2+0xc0);_0x1c169c-=Math[_0x3c8ff3(0x4e5)]((Graphics['width']-Graphics[_0x3c8ff3(0x356)])/0x2),_0x1c169c+=_0x347776*0x20;let _0x43f232=Graphics['height']-0xc8-$gameParty[_0x3c8ff3(0x505)]()*0x30;_0x43f232-=Math[_0x3c8ff3(0x4e5)]((Graphics['height']-Graphics[_0x3c8ff3(0x4ff)])/0x2),_0x43f232+=_0x347776*0x30,this['setHome'](_0x1c169c,_0x43f232);},Sprite_Actor[_0x3a331f(0x499)][_0x3a331f(0x5d9)]=function(){const _0x156dd0=_0x3a331f;this[_0x156dd0(0x3c2)](0x4b0,0x0,0x78);},Sprite_Animation[_0x3a331f(0x499)][_0x3a331f(0x2f0)]=function(_0xa9b387){const _0x3fff52=_0x3a331f;this[_0x3fff52(0x5ab)]=_0xa9b387;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x4d4)]=Sprite_Animation[_0x3a331f(0x499)][_0x3a331f(0x65f)],Sprite_Animation[_0x3a331f(0x499)][_0x3a331f(0x65f)]=function(){const _0x33e4dc=_0x3a331f;if(this[_0x33e4dc(0x5ab)])return;VisuMZ[_0x33e4dc(0x3c0)][_0x33e4dc(0x4d4)]['call'](this);},Sprite_Animation[_0x3a331f(0x499)][_0x3a331f(0x1a6)]=function(_0x32ce7c){const _0x4478f0=_0x3a331f;if(_0x32ce7c['_mainSprite']){}const _0x17b899=this[_0x4478f0(0x4e7)][_0x4478f0(0x2a8)];let _0x3e9202=_0x32ce7c[_0x4478f0(0x3fc)]*_0x32ce7c[_0x4478f0(0x2ef)]['y'],_0x18945f=0x0,_0x296923=-_0x3e9202/0x2;if(_0x17b899['match'](/<(?:HEAD|HEADER|TOP)>/i))_0x296923=-_0x3e9202;if(_0x17b899['match'](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x296923=0x0;if(_0x17b899[_0x4478f0(0x481)](/<(?:LEFT)>/i))_0x18945f=-_0x32ce7c[_0x4478f0(0x483)]/0x2;if(_0x17b899[_0x4478f0(0x481)](/<(?:RIGHT)>/i))_0x296923=_0x32ce7c[_0x4478f0(0x483)]/0x2;if(_0x17b899[_0x4478f0(0x481)](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x18945f=Number(RegExp['$1'])*_0x32ce7c[_0x4478f0(0x483)];_0x17b899['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x296923=(0x1-Number(RegExp['$1']))*-_0x3e9202);_0x17b899[_0x4478f0(0x481)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x18945f=Number(RegExp['$1'])*_0x32ce7c[_0x4478f0(0x483)],_0x296923=(0x1-Number(RegExp['$2']))*-_0x3e9202);if(_0x17b899[_0x4478f0(0x481)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x18945f+=Number(RegExp['$1']);if(_0x17b899['match'](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x296923+=Number(RegExp['$1']);_0x17b899[_0x4478f0(0x481)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x18945f+=Number(RegExp['$1']),_0x296923+=Number(RegExp['$2']));const _0x4e50b9=new Point(_0x18945f,_0x296923);return _0x32ce7c[_0x4478f0(0x493)](),_0x32ce7c[_0x4478f0(0x551)][_0x4478f0(0x5ae)](_0x4e50b9);},Sprite_AnimationMV['prototype'][_0x3a331f(0x2f0)]=function(_0x5c40a2){const _0xc5c3d4=_0x3a331f;this[_0xc5c3d4(0x5ab)]=_0x5c40a2;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x324)]=Sprite_AnimationMV[_0x3a331f(0x499)][_0x3a331f(0x303)],Sprite_AnimationMV[_0x3a331f(0x499)]['processTimingData']=function(_0x453d4d){const _0x4feb08=_0x3a331f;this[_0x4feb08(0x5ab)]&&(_0x453d4d=JsonEx[_0x4feb08(0x304)](_0x453d4d),_0x453d4d['se']&&(_0x453d4d['se'][_0x4feb08(0x490)]=0x0)),VisuMZ[_0x4feb08(0x3c0)][_0x4feb08(0x324)][_0x4feb08(0x2eb)](this,_0x453d4d);},Sprite_Damage[_0x3a331f(0x499)][_0x3a331f(0x60a)]=function(_0x4e1b1f){const _0x78811f=_0x3a331f;let _0x39d039=Math[_0x78811f(0x3cd)](_0x4e1b1f)[_0x78811f(0x268)]();this[_0x78811f(0x5bc)]()&&(_0x39d039=VisuMZ['GroupDigits'](_0x39d039));const _0x2d0a40=this[_0x78811f(0x57b)](),_0x34e4d8=Math[_0x78811f(0x4e5)](_0x2d0a40*0.75);for(let _0xdaec93=0x0;_0xdaec93<_0x39d039[_0x78811f(0x2ed)];_0xdaec93++){const _0x52a5e8=this[_0x78811f(0x33e)](_0x34e4d8,_0x2d0a40);_0x52a5e8['bitmap']['drawText'](_0x39d039[_0xdaec93],0x0,0x0,_0x34e4d8,_0x2d0a40,'center'),_0x52a5e8['x']=(_0xdaec93-(_0x39d039[_0x78811f(0x2ed)]-0x1)/0x2)*_0x34e4d8,_0x52a5e8['dy']=-_0xdaec93;}},Sprite_Damage[_0x3a331f(0x499)][_0x3a331f(0x5bc)]=function(){const _0x18732a=_0x3a331f;return VisuMZ['CoreEngine'][_0x18732a(0x6be)][_0x18732a(0x271)][_0x18732a(0x36f)];},Sprite_Damage[_0x3a331f(0x499)]['valueOutlineColor']=function(){return ColorManager['outlineColorDmg']();},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x39a)]=Sprite_Gauge[_0x3a331f(0x499)][_0x3a331f(0x3e9)],Sprite_Gauge[_0x3a331f(0x499)]['gaugeRate']=function(){const _0x3959fa=_0x3a331f;return VisuMZ['CoreEngine']['Sprite_Gauge_gaugeRate'][_0x3959fa(0x2eb)](this)[_0x3959fa(0x283)](0x0,0x1);},VisuMZ[_0x3a331f(0x3c0)]['Sprite_Gauge_currentValue']=Sprite_Gauge['prototype'][_0x3a331f(0x401)],Sprite_Gauge[_0x3a331f(0x499)][_0x3a331f(0x401)]=function(){const _0x9d2b4e=_0x3a331f;let _0x1aa5a2=VisuMZ[_0x9d2b4e(0x3c0)][_0x9d2b4e(0x6bb)][_0x9d2b4e(0x2eb)](this);return _0x1aa5a2;},Sprite_Gauge['prototype']['drawValue']=function(){const _0x5d7d18=_0x3a331f;let _0x4fee46=this[_0x5d7d18(0x401)]();this[_0x5d7d18(0x5bc)]()&&(_0x4fee46=VisuMZ[_0x5d7d18(0x51a)](_0x4fee46));const _0x1ef973=this[_0x5d7d18(0x473)]()-0x1,_0x2fcbb8=this[_0x5d7d18(0x561)]();this[_0x5d7d18(0x42b)](),this[_0x5d7d18(0x4d9)][_0x5d7d18(0x400)](_0x4fee46,0x0,0x0,_0x1ef973,_0x2fcbb8,_0x5d7d18(0x5b1));},Sprite_Gauge[_0x3a331f(0x499)]['valueOutlineWidth']=function(){return 0x3;},Sprite_Gauge[_0x3a331f(0x499)][_0x3a331f(0x5bc)]=function(){const _0x32d92c=_0x3a331f;return VisuMZ[_0x32d92c(0x3c0)][_0x32d92c(0x6be)][_0x32d92c(0x271)][_0x32d92c(0x719)];},Sprite_Gauge['prototype'][_0x3a331f(0x407)]=function(){const _0x18b14f=_0x3a331f;return ColorManager[_0x18b14f(0x4d1)]();};function Sprite_TitlePictureButton(){const _0x5af743=_0x3a331f;this[_0x5af743(0x64b)](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x3a331f(0x6d5)](Sprite_Clickable[_0x3a331f(0x499)]),Sprite_TitlePictureButton[_0x3a331f(0x499)][_0x3a331f(0x4d7)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x3a331f(0x499)][_0x3a331f(0x64b)]=function(_0x4a7e85){const _0x1948f5=_0x3a331f;Sprite_Clickable[_0x1948f5(0x499)][_0x1948f5(0x64b)]['call'](this),this['_data']=_0x4a7e85,this[_0x1948f5(0x4a5)]=null,this[_0x1948f5(0x49d)]();},Sprite_TitlePictureButton[_0x3a331f(0x499)]['setup']=function(){const _0x194e6b=_0x3a331f;this['x']=Graphics[_0x194e6b(0x483)],this['y']=Graphics['height'],this[_0x194e6b(0x643)]=![],this[_0x194e6b(0x630)]();},Sprite_TitlePictureButton['prototype'][_0x3a331f(0x630)]=function(){const _0x131f32=_0x3a331f;this[_0x131f32(0x4d9)]=ImageManager[_0x131f32(0x26f)](this[_0x131f32(0x435)][_0x131f32(0x59e)]),this[_0x131f32(0x4d9)][_0x131f32(0x1e2)](this['onButtonImageLoad']['bind'](this));},Sprite_TitlePictureButton[_0x3a331f(0x499)][_0x3a331f(0x20c)]=function(){const _0x425730=_0x3a331f;this[_0x425730(0x435)][_0x425730(0x353)][_0x425730(0x2eb)](this),this['_data']['PositionJS']['call'](this),this[_0x425730(0x5cf)](this[_0x425730(0x435)][_0x425730(0x22c)][_0x425730(0x58d)](this));},Sprite_TitlePictureButton[_0x3a331f(0x499)][_0x3a331f(0x560)]=function(){const _0x5dee93=_0x3a331f;Sprite_Clickable['prototype'][_0x5dee93(0x560)][_0x5dee93(0x2eb)](this),this[_0x5dee93(0x2bb)](),this['processTouch']();},Sprite_TitlePictureButton[_0x3a331f(0x499)][_0x3a331f(0x217)]=function(){const _0x55387c=_0x3a331f;return VisuMZ['CoreEngine'][_0x55387c(0x6be)]['MenuLayout']['Title'][_0x55387c(0x6ce)];},Sprite_TitlePictureButton[_0x3a331f(0x499)][_0x3a331f(0x2bb)]=function(){const _0x432a81=_0x3a331f;this['_pressed']?this['opacity']=0xff:(this[_0x432a81(0x1f3)]+=this[_0x432a81(0x643)]?this['fadeSpeed']():-0x1*this[_0x432a81(0x217)](),this['opacity']=Math[_0x432a81(0x49b)](0xc0,this['opacity']));},Sprite_TitlePictureButton[_0x3a331f(0x499)][_0x3a331f(0x5cf)]=function(_0x169800){this['_clickHandler']=_0x169800;},Sprite_TitlePictureButton[_0x3a331f(0x499)][_0x3a331f(0x2a9)]=function(){this['_clickHandler']&&this['_clickHandler']();},VisuMZ[_0x3a331f(0x3c0)]['Spriteset_Base_initialize']=Spriteset_Base[_0x3a331f(0x499)]['initialize'],Spriteset_Base[_0x3a331f(0x499)][_0x3a331f(0x64b)]=function(){const _0x3b634b=_0x3a331f;VisuMZ[_0x3b634b(0x3c0)]['Spriteset_Base_initialize'][_0x3b634b(0x2eb)](this),this['initMembersCoreEngine']();},Spriteset_Base[_0x3a331f(0x499)]['initMembersCoreEngine']=function(){const _0x37f322=_0x3a331f;this[_0x37f322(0x49f)]=[],this[_0x37f322(0x4b3)]=this[_0x37f322(0x2ef)]['x'],this['_cacheScaleY']=this['scale']['y'];},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x278)]=Spriteset_Base[_0x3a331f(0x499)][_0x3a331f(0x41f)],Spriteset_Base['prototype'][_0x3a331f(0x41f)]=function(_0x2e6c8f){const _0x183ef0=_0x3a331f;this[_0x183ef0(0x698)](),VisuMZ[_0x183ef0(0x3c0)][_0x183ef0(0x278)]['call'](this,_0x2e6c8f);},VisuMZ[_0x3a331f(0x3c0)]['Spriteset_Base_update']=Spriteset_Base[_0x3a331f(0x499)][_0x3a331f(0x560)],Spriteset_Base[_0x3a331f(0x499)][_0x3a331f(0x560)]=function(){const _0x3cb569=_0x3a331f;VisuMZ[_0x3cb569(0x3c0)][_0x3cb569(0x477)][_0x3cb569(0x2eb)](this),this[_0x3cb569(0x62d)](),this[_0x3cb569(0x233)]();},Spriteset_Base[_0x3a331f(0x499)]['updatePictureAntiZoom']=function(){const _0x1847da=_0x3a331f;if(!VisuMZ[_0x1847da(0x3c0)][_0x1847da(0x6be)][_0x1847da(0x271)]['AntiZoomPictures'])return;if(this['_cacheScaleX']===this[_0x1847da(0x2ef)]['x']&&this[_0x1847da(0x250)]===this[_0x1847da(0x2ef)]['y'])return;this[_0x1847da(0x725)](),this[_0x1847da(0x4b3)]=this[_0x1847da(0x2ef)]['x'],this[_0x1847da(0x250)]=this[_0x1847da(0x2ef)]['y'];},Spriteset_Base[_0x3a331f(0x499)]['adjustPictureAntiZoom']=function(){const _0x3413d6=_0x3a331f;this['scale']['x']!==0x0&&(this['_pictureContainer'][_0x3413d6(0x2ef)]['x']=0x1/this[_0x3413d6(0x2ef)]['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x3413d6(0x2ef)]['x'])),this[_0x3413d6(0x2ef)]['y']!==0x0&&(this['_pictureContainer']['scale']['y']=0x1/this[_0x3413d6(0x2ef)]['y'],this[_0x3413d6(0x2a6)]['y']=-(this['y']/this[_0x3413d6(0x2ef)]['y']));},Spriteset_Base[_0x3a331f(0x499)]['updateFauxAnimations']=function(){const _0x3f4ea9=_0x3a331f;for(const _0x12a920 of this['_fauxAnimationSprites']){!_0x12a920['isPlaying']()&&this[_0x3f4ea9(0x2cf)](_0x12a920);}this[_0x3f4ea9(0x3a8)]();},Spriteset_Base[_0x3a331f(0x499)]['processFauxAnimationRequests']=function(){const _0x328ada=_0x3a331f;for(;;){const _0x564c99=$gameTemp[_0x328ada(0x6f7)]();if(_0x564c99)this[_0x328ada(0x65d)](_0x564c99);else break;}},Spriteset_Base['prototype']['createFauxAnimation']=function(_0x3eb707){const _0x1614b4=_0x3a331f,_0x3464b0=$dataAnimations[_0x3eb707[_0x1614b4(0x2f6)]],_0x5c8abf=_0x3eb707['targets'],_0x17c12f=_0x3eb707[_0x1614b4(0x652)],_0x3e5f44=_0x3eb707[_0x1614b4(0x2e9)];let _0x58bfb0=this[_0x1614b4(0x69b)]();const _0x224084=this[_0x1614b4(0x680)]();if(this[_0x1614b4(0x387)](_0x3464b0))for(const _0xa8ec5c of _0x5c8abf){this['createFauxAnimationSprite']([_0xa8ec5c],_0x3464b0,_0x17c12f,_0x58bfb0,_0x3e5f44),_0x58bfb0+=_0x224084;}else this[_0x1614b4(0x4d0)](_0x5c8abf,_0x3464b0,_0x17c12f,_0x58bfb0,_0x3e5f44);},Spriteset_Base[_0x3a331f(0x499)]['createFauxAnimationSprite']=function(_0x298be2,_0x43b0d5,_0x199621,_0x588e80,_0x33a2e1){const _0x41b0c8=_0x3a331f,_0x20c15b=this[_0x41b0c8(0x2db)](_0x43b0d5),_0x2c6555=new(_0x20c15b?Sprite_AnimationMV:Sprite_Animation)(),_0x1dba63=this[_0x41b0c8(0x26e)](_0x298be2);this[_0x41b0c8(0x641)](_0x298be2[0x0])&&(_0x199621=!_0x199621),_0x2c6555[_0x41b0c8(0x6dc)]=_0x298be2,_0x2c6555['setup'](_0x1dba63,_0x43b0d5,_0x199621,_0x588e80),_0x2c6555['setMute'](_0x33a2e1),this[_0x41b0c8(0x1bf)][_0x41b0c8(0x59f)](_0x2c6555),this[_0x41b0c8(0x49f)][_0x41b0c8(0x2ae)](_0x2c6555);},Spriteset_Base[_0x3a331f(0x499)][_0x3a331f(0x2cf)]=function(_0x40c3d6){const _0x23e9ce=_0x3a331f;this['_fauxAnimationSprites'][_0x23e9ce(0x1fe)](_0x40c3d6),this['_effectsContainer'][_0x23e9ce(0x57a)](_0x40c3d6);for(const _0x44dddf of _0x40c3d6[_0x23e9ce(0x6dc)]){_0x44dddf[_0x23e9ce(0x2bd)]&&_0x44dddf[_0x23e9ce(0x2bd)]();}_0x40c3d6[_0x23e9ce(0x41f)]();},Spriteset_Base['prototype'][_0x3a331f(0x698)]=function(){const _0x5654f1=_0x3a331f;for(const _0x674ea1 of this[_0x5654f1(0x49f)]){this[_0x5654f1(0x2cf)](_0x674ea1);}},Spriteset_Base['prototype'][_0x3a331f(0x3fe)]=function(){const _0x143baf=_0x3a331f;return this['_fauxAnimationSprites'][_0x143baf(0x2ed)]>0x0;},VisuMZ['CoreEngine'][_0x3a331f(0x726)]=Spriteset_Base['prototype'][_0x3a331f(0x61f)],Spriteset_Base[_0x3a331f(0x499)]['updatePosition']=function(){const _0x34abe0=_0x3a331f;VisuMZ[_0x34abe0(0x3c0)]['Spriteset_Base_updatePosition'][_0x34abe0(0x2eb)](this),this[_0x34abe0(0x6c9)]();},Spriteset_Base[_0x3a331f(0x499)]['updatePositionCoreEngine']=function(){const _0x3e85ae=_0x3a331f;if(!$gameScreen)return;if($gameScreen[_0x3e85ae(0x1e9)]<=0x0)return;this['x']-=Math[_0x3e85ae(0x469)]($gameScreen[_0x3e85ae(0x342)]());const _0x2f2335=$gameScreen[_0x3e85ae(0x4f5)]();switch($gameScreen[_0x3e85ae(0x4f5)]()){case _0x3e85ae(0x5f2):this['updatePositionCoreEngineShakeOriginal']();break;case _0x3e85ae(0x358):this[_0x3e85ae(0x1e5)]();break;case _0x3e85ae(0x1a7):this['updatePositionCoreEngineShakeVert']();break;default:this[_0x3e85ae(0x582)]();break;}},Spriteset_Base[_0x3a331f(0x499)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x43d4d8=_0x3a331f,_0xeed107=VisuMZ[_0x43d4d8(0x3c0)][_0x43d4d8(0x6be)][_0x43d4d8(0x5f1)];if(_0xeed107&&_0xeed107[_0x43d4d8(0x1c1)])return _0xeed107[_0x43d4d8(0x1c1)]['call'](this);this['x']+=Math[_0x43d4d8(0x469)]($gameScreen[_0x43d4d8(0x342)]());},Spriteset_Base[_0x3a331f(0x499)][_0x3a331f(0x582)]=function(){const _0x2e7d35=_0x3a331f,_0x7483cb=VisuMZ[_0x2e7d35(0x3c0)]['Settings']['ScreenShake'];if(_0x7483cb&&_0x7483cb[_0x2e7d35(0x578)])return _0x7483cb[_0x2e7d35(0x578)]['call'](this);const _0x32f9d3=$gameScreen[_0x2e7d35(0x586)]*0.75,_0xc4bcf2=$gameScreen[_0x2e7d35(0x487)]*0.6,_0x18d87f=$gameScreen[_0x2e7d35(0x1e9)];this['x']+=Math[_0x2e7d35(0x469)](Math[_0x2e7d35(0x5c3)](_0x32f9d3)-Math['randomInt'](_0xc4bcf2))*(Math[_0x2e7d35(0x49b)](_0x18d87f,0x1e)*0.5),this['y']+=Math[_0x2e7d35(0x469)](Math[_0x2e7d35(0x5c3)](_0x32f9d3)-Math[_0x2e7d35(0x5c3)](_0xc4bcf2))*(Math[_0x2e7d35(0x49b)](_0x18d87f,0x1e)*0.5);},Spriteset_Base['prototype'][_0x3a331f(0x1e5)]=function(){const _0x4e4bd3=_0x3a331f,_0x58b886=VisuMZ[_0x4e4bd3(0x3c0)][_0x4e4bd3(0x6be)][_0x4e4bd3(0x5f1)];if(_0x58b886&&_0x58b886[_0x4e4bd3(0x6c6)])return _0x58b886['horzJS'][_0x4e4bd3(0x2eb)](this);const _0x4bf07f=$gameScreen[_0x4e4bd3(0x586)]*0.75,_0x44a2eb=$gameScreen[_0x4e4bd3(0x487)]*0.6,_0x531676=$gameScreen[_0x4e4bd3(0x1e9)];this['x']+=Math['round'](Math[_0x4e4bd3(0x5c3)](_0x4bf07f)-Math[_0x4e4bd3(0x5c3)](_0x44a2eb))*(Math[_0x4e4bd3(0x49b)](_0x531676,0x1e)*0.5);},Spriteset_Base[_0x3a331f(0x499)][_0x3a331f(0x28d)]=function(){const _0x3db46b=_0x3a331f,_0x53e191=VisuMZ[_0x3db46b(0x3c0)][_0x3db46b(0x6be)]['ScreenShake'];if(_0x53e191&&_0x53e191[_0x3db46b(0x6f4)])return _0x53e191[_0x3db46b(0x6f4)]['call'](this);const _0x3aab06=$gameScreen[_0x3db46b(0x586)]*0.75,_0x30091d=$gameScreen[_0x3db46b(0x487)]*0.6,_0x574c40=$gameScreen[_0x3db46b(0x1e9)];this['y']+=Math[_0x3db46b(0x469)](Math[_0x3db46b(0x5c3)](_0x3aab06)-Math[_0x3db46b(0x5c3)](_0x30091d))*(Math[_0x3db46b(0x49b)](_0x574c40,0x1e)*0.5);},Spriteset_Battle['prototype']['createBackground']=function(){const _0x15ce6a=_0x3a331f;this[_0x15ce6a(0x610)]=new PIXI[(_0x15ce6a(0x1df))][(_0x15ce6a(0x43f))](clamp=!![]),this[_0x15ce6a(0x1be)]=new Sprite(),this['_backgroundSprite']['bitmap']=SceneManager[_0x15ce6a(0x502)](),this[_0x15ce6a(0x1be)][_0x15ce6a(0x1df)]=[this[_0x15ce6a(0x610)]],this['_baseSprite'][_0x15ce6a(0x59f)](this[_0x15ce6a(0x1be)]);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x617)]=Spriteset_Battle[_0x3a331f(0x499)][_0x3a331f(0x27e)],Spriteset_Battle['prototype'][_0x3a331f(0x27e)]=function(){const _0x23f202=_0x3a331f;VisuMZ[_0x23f202(0x3c0)][_0x23f202(0x6be)]['UI'][_0x23f202(0x2aa)]&&this['repositionEnemiesByResolution'](),VisuMZ[_0x23f202(0x3c0)][_0x23f202(0x617)][_0x23f202(0x2eb)](this);},Spriteset_Battle[_0x3a331f(0x499)][_0x3a331f(0x6a8)]=function(){for(member of $gameTroop['members']()){member['moveRelativeToResolutionChange']();}},VisuMZ['CoreEngine']['Window_Base_initialize']=Window_Base[_0x3a331f(0x499)]['initialize'],Window_Base[_0x3a331f(0x499)][_0x3a331f(0x64b)]=function(_0x692826){const _0x3fceb3=_0x3a331f;_0x692826['x']=Math[_0x3fceb3(0x469)](_0x692826['x']),_0x692826['y']=Math[_0x3fceb3(0x469)](_0x692826['y']),_0x692826['width']=Math[_0x3fceb3(0x469)](_0x692826[_0x3fceb3(0x483)]),_0x692826[_0x3fceb3(0x3fc)]=Math['round'](_0x692826[_0x3fceb3(0x3fc)]),this[_0x3fceb3(0x3a0)](),VisuMZ[_0x3fceb3(0x3c0)][_0x3fceb3(0x1ac)][_0x3fceb3(0x2eb)](this,_0x692826),this[_0x3fceb3(0x54d)]();},Window_Base['prototype'][_0x3a331f(0x3a0)]=function(){const _0x1d0397=_0x3a331f;this[_0x1d0397(0x3b2)]=VisuMZ[_0x1d0397(0x3c0)]['Settings'][_0x1d0397(0x271)][_0x1d0397(0x269)],this['_digitGroupingEx']=VisuMZ['CoreEngine'][_0x1d0397(0x6be)][_0x1d0397(0x271)][_0x1d0397(0x71d)];},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x1d9)]=function(){const _0x53cd4d=_0x3a331f;return VisuMZ[_0x53cd4d(0x3c0)][_0x53cd4d(0x6be)][_0x53cd4d(0x43c)][_0x53cd4d(0x293)];},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x299)]=function(){const _0x4b6ecc=_0x3a331f;return VisuMZ['CoreEngine'][_0x4b6ecc(0x6be)][_0x4b6ecc(0x43c)][_0x4b6ecc(0x534)];},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x50c)]=function(){const _0x432b3f=_0x3a331f;this[_0x432b3f(0x5ff)]=VisuMZ[_0x432b3f(0x3c0)][_0x432b3f(0x6be)][_0x432b3f(0x43c)][_0x432b3f(0x21d)];},Window_Base['prototype'][_0x3a331f(0x4f9)]=function(){const _0x53ffd0=_0x3a331f;return VisuMZ[_0x53ffd0(0x3c0)]['Settings'][_0x53ffd0(0x43c)][_0x53ffd0(0x2b5)];},Window_Base['prototype']['openingSpeed']=function(){const _0x8d7bb7=_0x3a331f;return VisuMZ[_0x8d7bb7(0x3c0)]['Settings'][_0x8d7bb7(0x43c)][_0x8d7bb7(0x1db)];},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x1e0)]=Window_Base[_0x3a331f(0x499)][_0x3a331f(0x560)],Window_Base[_0x3a331f(0x499)]['update']=function(){const _0x534eff=_0x3a331f;VisuMZ['CoreEngine'][_0x534eff(0x1e0)]['call'](this),this[_0x534eff(0x3b4)]();},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x38f)]=function(){const _0x5be33b=_0x3a331f;this['_opening']&&(this['openness']+=this['openingSpeed'](),this[_0x5be33b(0x633)]()&&(this['_opening']=![]));},Window_Base[_0x3a331f(0x499)]['updateClose']=function(){const _0x17deab=_0x3a331f;this['_closing']&&(this['openness']-=this[_0x17deab(0x257)](),this[_0x17deab(0x3d8)]()&&(this[_0x17deab(0x29e)]=![]));},VisuMZ[_0x3a331f(0x3c0)]['Window_Base_drawText']=Window_Base[_0x3a331f(0x499)][_0x3a331f(0x400)],Window_Base['prototype'][_0x3a331f(0x400)]=function(_0x4e84de,_0x157851,_0x3df7e4,_0x35721f,_0x27f0a6){const _0x1f4fb3=_0x3a331f;if(this[_0x1f4fb3(0x5bc)]())_0x4e84de=VisuMZ[_0x1f4fb3(0x51a)](_0x4e84de);VisuMZ[_0x1f4fb3(0x3c0)][_0x1f4fb3(0x4e6)]['call'](this,_0x4e84de,_0x157851,_0x3df7e4,_0x35721f,_0x27f0a6);},Window_Base['prototype'][_0x3a331f(0x5bc)]=function(){const _0x2c01fd=_0x3a331f;return this[_0x2c01fd(0x3b2)];},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x31e)]=Window_Base[_0x3a331f(0x499)]['createTextState'],Window_Base[_0x3a331f(0x499)][_0x3a331f(0x5c5)]=function(_0xf5663d,_0x4a74cf,_0x501fa5,_0x58ab2b){const _0x185df3=_0x3a331f;var _0x420306=VisuMZ[_0x185df3(0x3c0)][_0x185df3(0x31e)][_0x185df3(0x2eb)](this,_0xf5663d,_0x4a74cf,_0x501fa5,_0x58ab2b);if(this[_0x185df3(0x715)]())_0x420306[_0x185df3(0x3e2)]=VisuMZ['GroupDigits'](_0x420306['text']);return _0x420306;},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x715)]=function(){const _0x3cffd2=_0x3a331f;return this[_0x3cffd2(0x5de)];},Window_Base['prototype']['enableDigitGrouping']=function(_0x549164){this['_digitGrouping']=_0x549164;},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x2ca)]=function(_0x3fd21c){const _0x26770e=_0x3a331f;this[_0x26770e(0x5de)]=_0x3fd21c;},VisuMZ['CoreEngine'][_0x3a331f(0x55a)]=Window_Base[_0x3a331f(0x499)][_0x3a331f(0x572)],Window_Base[_0x3a331f(0x499)][_0x3a331f(0x572)]=function(_0x38a6b9,_0x298bee,_0x2ca482){const _0x50a4d7=_0x3a331f;_0x298bee=Math[_0x50a4d7(0x469)](_0x298bee),_0x2ca482=Math[_0x50a4d7(0x469)](_0x2ca482),VisuMZ['CoreEngine'][_0x50a4d7(0x55a)]['call'](this,_0x38a6b9,_0x298bee,_0x2ca482);},VisuMZ['CoreEngine'][_0x3a331f(0x72d)]=Window_Base[_0x3a331f(0x499)][_0x3a331f(0x396)],Window_Base[_0x3a331f(0x499)][_0x3a331f(0x396)]=function(_0x34763f,_0x2e7a14,_0x5d99d7,_0x4c3c08,_0x3163eb,_0x18092c){const _0x1142fe=_0x3a331f;_0x3163eb=_0x3163eb||ImageManager[_0x1142fe(0x46a)],_0x18092c=_0x18092c||ImageManager[_0x1142fe(0x3b6)],_0x5d99d7=Math[_0x1142fe(0x469)](_0x5d99d7),_0x4c3c08=Math['round'](_0x4c3c08),_0x3163eb=Math[_0x1142fe(0x469)](_0x3163eb),_0x18092c=Math[_0x1142fe(0x469)](_0x18092c),VisuMZ[_0x1142fe(0x3c0)][_0x1142fe(0x72d)][_0x1142fe(0x2eb)](this,_0x34763f,_0x2e7a14,_0x5d99d7,_0x4c3c08,_0x3163eb,_0x18092c);},VisuMZ['CoreEngine'][_0x3a331f(0x4a4)]=Window_Base[_0x3a331f(0x499)]['drawCharacter'],Window_Base[_0x3a331f(0x499)][_0x3a331f(0x432)]=function(_0x537b34,_0x3feed8,_0x4cb2f0,_0x5bbde1){const _0x5916f1=_0x3a331f;_0x4cb2f0=Math['round'](_0x4cb2f0),_0x5bbde1=Math[_0x5916f1(0x469)](_0x5bbde1),VisuMZ[_0x5916f1(0x3c0)][_0x5916f1(0x4a4)]['call'](this,_0x537b34,_0x3feed8,_0x4cb2f0,_0x5bbde1);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x620)]=Window_Selectable[_0x3a331f(0x499)]['itemRect'],Window_Selectable['prototype']['itemRect']=function(_0x4205ac){const _0x508e30=_0x3a331f;let _0x15182e=VisuMZ[_0x508e30(0x3c0)][_0x508e30(0x620)][_0x508e30(0x2eb)](this,_0x4205ac);return _0x15182e['x']=Math['round'](_0x15182e['x']),_0x15182e['y']=Math[_0x508e30(0x469)](_0x15182e['y']),_0x15182e[_0x508e30(0x483)]=Math[_0x508e30(0x469)](_0x15182e[_0x508e30(0x483)]),_0x15182e['height']=Math[_0x508e30(0x469)](_0x15182e[_0x508e30(0x3fc)]),_0x15182e;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x739)]=Window_StatusBase[_0x3a331f(0x499)]['drawActorSimpleStatus'],Window_StatusBase[_0x3a331f(0x499)]['drawActorSimpleStatus']=function(_0x8e7b63,_0x1421e9,_0x1f58d1){const _0x57d8bf=_0x3a331f;_0x1421e9=Math[_0x57d8bf(0x469)](_0x1421e9),_0x1f58d1=Math[_0x57d8bf(0x469)](_0x1f58d1),VisuMZ['CoreEngine'][_0x57d8bf(0x739)][_0x57d8bf(0x2eb)](this,_0x8e7b63,_0x1421e9,_0x1f58d1);},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x54d)]=function(){const _0x46cdce=_0x3a331f;this['_coreEasing']={'duration':0x0,'wholeDuration':0x0,'type':_0x46cdce(0x2ff),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x46cdce(0x2ef)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x46cdce(0x1f3)],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this['contentsOpacity']};},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x3b4)]=function(){const _0x2659c7=_0x3a331f;if(!this[_0x2659c7(0x34c)])return;if(this[_0x2659c7(0x34c)][_0x2659c7(0x4cf)]<=0x0)return;this['x']=this[_0x2659c7(0x639)](this['x'],this[_0x2659c7(0x34c)][_0x2659c7(0x1cd)]),this['y']=this[_0x2659c7(0x639)](this['y'],this[_0x2659c7(0x34c)]['targetY']),this['scale']['x']=this['applyCoreEasing'](this['scale']['x'],this['_coreEasing'][_0x2659c7(0x6af)]),this[_0x2659c7(0x2ef)]['y']=this['applyCoreEasing'](this[_0x2659c7(0x2ef)]['y'],this[_0x2659c7(0x34c)][_0x2659c7(0x272)]),this[_0x2659c7(0x1f3)]=this[_0x2659c7(0x639)](this['opacity'],this[_0x2659c7(0x34c)][_0x2659c7(0x4ba)]),this['backOpacity']=this[_0x2659c7(0x639)](this['backOpacity'],this[_0x2659c7(0x34c)][_0x2659c7(0x386)]),this[_0x2659c7(0x568)]=this['applyCoreEasing'](this[_0x2659c7(0x568)],this[_0x2659c7(0x34c)][_0x2659c7(0x6e4)]),this[_0x2659c7(0x34c)][_0x2659c7(0x4cf)]--;},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x639)]=function(_0x40cd7b,_0x4e34f6){const _0x53d918=_0x3a331f;if(!this['_coreEasing'])return _0x4e34f6;const _0x35aae7=this[_0x53d918(0x34c)][_0x53d918(0x4cf)],_0x86a32e=this[_0x53d918(0x34c)]['wholeDuration'],_0x2871ec=this[_0x53d918(0x196)]((_0x86a32e-_0x35aae7)/_0x86a32e),_0x27b516=this[_0x53d918(0x196)]((_0x86a32e-_0x35aae7+0x1)/_0x86a32e),_0x1cbad7=(_0x40cd7b-_0x4e34f6*_0x2871ec)/(0x1-_0x2871ec);return _0x1cbad7+(_0x4e34f6-_0x1cbad7)*_0x27b516;},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x196)]=function(_0x2dd2f7){const _0x546d30=_0x3a331f;if(!this['_coreEasing'])return _0x2dd2f7;return VisuMZ[_0x546d30(0x5d3)](_0x2dd2f7,this['_coreEasing'][_0x546d30(0x5b2)]||_0x546d30(0x2ff));},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x3f9)]=function(_0x323099,_0x211502){const _0x29df6e=_0x3a331f;if(!this[_0x29df6e(0x34c)])return;this['x']=this['_coreEasing']['targetX'],this['y']=this[_0x29df6e(0x34c)][_0x29df6e(0x710)],this[_0x29df6e(0x2ef)]['x']=this[_0x29df6e(0x34c)]['targetScaleX'],this[_0x29df6e(0x2ef)]['y']=this[_0x29df6e(0x34c)][_0x29df6e(0x272)],this[_0x29df6e(0x1f3)]=this[_0x29df6e(0x34c)][_0x29df6e(0x4ba)],this[_0x29df6e(0x5ff)]=this[_0x29df6e(0x34c)]['targetBackOpacity'],this[_0x29df6e(0x568)]=this[_0x29df6e(0x34c)]['targetContentsOpacity'],this[_0x29df6e(0x3c1)](_0x323099,_0x211502,this['x'],this['y'],this[_0x29df6e(0x2ef)]['x'],this['scale']['y'],this[_0x29df6e(0x1f3)],this[_0x29df6e(0x5ff)],this[_0x29df6e(0x568)]);},Window_Base[_0x3a331f(0x499)]['setupCoreEasing']=function(_0xe4e2cd,_0x10f456,_0x70e928,_0x3321c5,_0x5cce4b,_0x41416a,_0x54dba7,_0x1ce302,_0x3f65b6){this['_coreEasing']={'duration':_0xe4e2cd,'wholeDuration':_0xe4e2cd,'type':_0x10f456,'targetX':_0x70e928,'targetY':_0x3321c5,'targetScaleX':_0x5cce4b,'targetScaleY':_0x41416a,'targetOpacity':_0x54dba7,'targetBackOpacity':_0x1ce302,'targetContentsOpacity':_0x3f65b6};},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x615)]=function(_0x1798ba,_0x199d4b,_0x1feb25,_0x1612fc,_0x1d4194){const _0x37fbc2=_0x3a331f;this['resetFontSettings'](),this[_0x37fbc2(0x427)][_0x37fbc2(0x57b)]=VisuMZ[_0x37fbc2(0x3c0)][_0x37fbc2(0x6be)]['Gold'][_0x37fbc2(0x721)];const _0x2b01ec=VisuMZ['CoreEngine'][_0x37fbc2(0x6be)][_0x37fbc2(0x738)][_0x37fbc2(0x371)];if(_0x2b01ec>0x0&&_0x199d4b===TextManager['currencyUnit']){const _0x5c606b=_0x1612fc+(this[_0x37fbc2(0x1d9)]()-ImageManager[_0x37fbc2(0x48c)])/0x2;this[_0x37fbc2(0x572)](_0x2b01ec,_0x1feb25+(_0x1d4194-ImageManager[_0x37fbc2(0x32e)]),_0x5c606b),_0x1d4194-=ImageManager[_0x37fbc2(0x32e)]+0x4;}else this[_0x37fbc2(0x6e3)](ColorManager[_0x37fbc2(0x63c)]()),this[_0x37fbc2(0x400)](_0x199d4b,_0x1feb25,_0x1612fc,_0x1d4194,_0x37fbc2(0x5b1)),_0x1d4194-=this['textWidth'](_0x199d4b)+0x6;this[_0x37fbc2(0x4b2)]();const _0x1fe33a=this[_0x37fbc2(0x539)](this[_0x37fbc2(0x3b2)]?VisuMZ['GroupDigits'](_0x1798ba):_0x1798ba);_0x1fe33a>_0x1d4194?this[_0x37fbc2(0x400)](VisuMZ[_0x37fbc2(0x3c0)][_0x37fbc2(0x6be)][_0x37fbc2(0x738)][_0x37fbc2(0x70c)],_0x1feb25,_0x1612fc,_0x1d4194,_0x37fbc2(0x5b1)):this['drawText'](_0x1798ba,_0x1feb25,_0x1612fc,_0x1d4194,_0x37fbc2(0x5b1)),this['resetFontSettings']();},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x4b8)]=function(_0x53e2bc,_0x2fcb51,_0x38c752,_0x1378d5,_0x476628){const _0x4bb5a7=_0x3a331f,_0x4fb1ad=ImageManager[_0x4bb5a7(0x244)](_0x4bb5a7(0x730)),_0x320d8e=ImageManager['iconWidth'],_0x4ae565=ImageManager[_0x4bb5a7(0x48c)],_0x55df28=_0x53e2bc%0x10*_0x320d8e,_0x354204=Math[_0x4bb5a7(0x4e5)](_0x53e2bc/0x10)*_0x4ae565,_0x56472f=_0x1378d5,_0x6d5853=_0x1378d5;this[_0x4bb5a7(0x427)]['_context'][_0x4bb5a7(0x580)]=_0x476628,this[_0x4bb5a7(0x427)][_0x4bb5a7(0x4d8)](_0x4fb1ad,_0x55df28,_0x354204,_0x320d8e,_0x4ae565,_0x2fcb51,_0x38c752,_0x56472f,_0x6d5853),this['contents']['_context'][_0x4bb5a7(0x580)]=!![];},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x330)]=function(_0x11b74c,_0x1cf400,_0x1fcde2,_0x2b6f41,_0x3408c2,_0xbb80f6){const _0x391ee9=_0x3a331f,_0xabad6c=Math[_0x391ee9(0x4e5)]((_0x1fcde2-0x2)*_0x2b6f41),_0x515cee=Sprite_Gauge[_0x391ee9(0x499)][_0x391ee9(0x5f3)]['call'](this),_0x903d72=_0x1cf400+this[_0x391ee9(0x1d9)]()-_0x515cee-0x2;this[_0x391ee9(0x427)][_0x391ee9(0x47d)](_0x11b74c,_0x903d72,_0x1fcde2,_0x515cee,ColorManager['gaugeBackColor']()),this['contents']['gradientFillRect'](_0x11b74c+0x1,_0x903d72+0x1,_0xabad6c,_0x515cee-0x2,_0x3408c2,_0xbb80f6);},Window_Selectable['prototype'][_0x3a331f(0x4d2)]=function(_0x2476f5){const _0x59b9b6=_0x3a331f;let _0x3205b1=this['index']();const _0x141580=this[_0x59b9b6(0x440)](),_0x5b08e8=this['maxCols']();if(this['isUseModernControls']()&&(_0x3205b1<_0x141580||_0x2476f5&&_0x5b08e8===0x1)){_0x3205b1+=_0x5b08e8;if(_0x3205b1>=_0x141580)_0x3205b1=_0x141580-0x1;this[_0x59b9b6(0x193)](_0x3205b1);}else!this['isUseModernControls']()&&((_0x3205b1<_0x141580-_0x5b08e8||_0x2476f5&&_0x5b08e8===0x1)&&this[_0x59b9b6(0x193)]((_0x3205b1+_0x5b08e8)%_0x141580));},VisuMZ[_0x3a331f(0x3c0)]['Window_Selectable_cursorDown']=Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x4d2)],Window_Selectable['prototype'][_0x3a331f(0x4d2)]=function(_0x59cd92){const _0x29c8d5=_0x3a331f;this[_0x29c8d5(0x70e)]()&&_0x59cd92&&this[_0x29c8d5(0x47e)]()===0x1&&this[_0x29c8d5(0x322)]()===this[_0x29c8d5(0x440)]()-0x1?this['smoothSelect'](0x0):VisuMZ[_0x29c8d5(0x3c0)]['Window_Selectable_cursorDown']['call'](this,_0x59cd92);},Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x607)]=function(_0x44fe1f){const _0x15bdfd=_0x3a331f;let _0x17f67b=Math[_0x15bdfd(0x6e9)](0x0,this[_0x15bdfd(0x322)]());const _0x537472=this[_0x15bdfd(0x440)](),_0x3c4d42=this[_0x15bdfd(0x47e)]();if(this[_0x15bdfd(0x70e)]()&&_0x17f67b>0x0||_0x44fe1f&&_0x3c4d42===0x1){_0x17f67b-=_0x3c4d42;if(_0x17f67b<=0x0)_0x17f67b=0x0;this[_0x15bdfd(0x193)](_0x17f67b);}else!this['isUseModernControls']()&&((_0x17f67b>=_0x3c4d42||_0x44fe1f&&_0x3c4d42===0x1)&&this[_0x15bdfd(0x193)]((_0x17f67b-_0x3c4d42+_0x537472)%_0x537472));},VisuMZ['CoreEngine'][_0x3a331f(0x20e)]=Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x607)],Window_Selectable['prototype']['cursorUp']=function(_0x2a3154){const _0x2d9580=_0x3a331f;this[_0x2d9580(0x70e)]()&&_0x2a3154&&this[_0x2d9580(0x47e)]()===0x1&&this[_0x2d9580(0x322)]()===0x0?this[_0x2d9580(0x193)](this[_0x2d9580(0x440)]()-0x1):VisuMZ[_0x2d9580(0x3c0)]['Window_Selectable_cursorUp'][_0x2d9580(0x2eb)](this,_0x2a3154);},Window_Selectable['prototype']['isUseModernControls']=function(){const _0x8f78e3=_0x3a331f;return VisuMZ['CoreEngine'][_0x8f78e3(0x6be)]['QoL']['ModernControls'];},VisuMZ[_0x3a331f(0x3c0)]['Window_Selectable_processCursorMove']=Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x4ac)],Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x4ac)]=function(){const _0x366e76=_0x3a331f;this['isUseModernControls']()?(this[_0x366e76(0x1bb)](),this[_0x366e76(0x6e8)]()):VisuMZ['CoreEngine'][_0x366e76(0x35c)][_0x366e76(0x2eb)](this);},Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x3fb)]=function(){return!![];},Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x1bb)]=function(){const _0x52720c=_0x3a331f;if(this[_0x52720c(0x309)]()){const _0x2a1bed=this[_0x52720c(0x322)]();Input[_0x52720c(0x417)]('down')&&(Input[_0x52720c(0x611)](_0x52720c(0x1f8))&&this[_0x52720c(0x3fb)]()?this['cursorPagedown']():this['cursorDown'](Input[_0x52720c(0x5be)](_0x52720c(0x378)))),Input[_0x52720c(0x417)]('up')&&(Input[_0x52720c(0x611)](_0x52720c(0x1f8))&&this[_0x52720c(0x3fb)]()?this[_0x52720c(0x2ad)]():this[_0x52720c(0x607)](Input[_0x52720c(0x5be)]('up'))),Input[_0x52720c(0x417)](_0x52720c(0x5b1))&&this[_0x52720c(0x3d4)](Input['isTriggered']('right')),Input[_0x52720c(0x417)](_0x52720c(0x453))&&this[_0x52720c(0x56c)](Input[_0x52720c(0x5be)]('left')),!this[_0x52720c(0x1a5)]('pagedown')&&Input[_0x52720c(0x417)](_0x52720c(0x221))&&this[_0x52720c(0x5a7)](),!this['isHandled'](_0x52720c(0x406))&&Input[_0x52720c(0x417)](_0x52720c(0x406))&&this['cursorPageup'](),this['index']()!==_0x2a1bed&&this[_0x52720c(0x399)]();}},Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x6e8)]=function(){const _0x2b1a8e=_0x3a331f;if(this[_0x2b1a8e(0x309)]()){const _0x3e3e1f=this[_0x2b1a8e(0x322)]();Input[_0x2b1a8e(0x5be)](_0x2b1a8e(0x5a5))&&this[_0x2b1a8e(0x193)](Math[_0x2b1a8e(0x49b)](this['index'](),0x0)),Input[_0x2b1a8e(0x5be)](_0x2b1a8e(0x494))&&this[_0x2b1a8e(0x193)](Math[_0x2b1a8e(0x6e9)](this[_0x2b1a8e(0x322)](),this[_0x2b1a8e(0x440)]()-0x1)),this[_0x2b1a8e(0x322)]()!==_0x3e3e1f&&this[_0x2b1a8e(0x399)]();}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x419)]=Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x3d2)],Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x3d2)]=function(){const _0x50bca8=_0x3a331f;this['isUseModernControls']()?this[_0x50bca8(0x468)]():VisuMZ['CoreEngine'][_0x50bca8(0x419)][_0x50bca8(0x2eb)](this);},Window_Selectable[_0x3a331f(0x499)]['processTouchModernControls']=function(){const _0x682623=_0x3a331f;VisuMZ[_0x682623(0x3c0)]['Window_Selectable_processTouch']['call'](this);},Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x6d8)]=function(){const _0x23ad9c=_0x3a331f;return VisuMZ['CoreEngine']['Settings']['Window'][_0x23ad9c(0x6eb)];},Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x467)]=function(){const _0x46cdd6=_0x3a331f;return VisuMZ[_0x46cdd6(0x3c0)][_0x46cdd6(0x6be)][_0x46cdd6(0x43c)][_0x46cdd6(0x59d)];},Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x67c)]=function(){const _0x165670=_0x3a331f;return Window_Scrollable[_0x165670(0x499)][_0x165670(0x67c)][_0x165670(0x2eb)](this)+VisuMZ[_0x165670(0x3c0)][_0x165670(0x6be)][_0x165670(0x43c)][_0x165670(0x1e3)];;},VisuMZ['CoreEngine']['Window_Selectable_drawBackgroundRect']=Window_Selectable['prototype'][_0x3a331f(0x273)],Window_Selectable[_0x3a331f(0x499)][_0x3a331f(0x273)]=function(_0x4523fc){const _0xc8b53b=_0x3a331f,_0x16954c=VisuMZ[_0xc8b53b(0x3c0)]['Settings'][_0xc8b53b(0x43c)];if(_0x16954c[_0xc8b53b(0x1b2)]===![])return;_0x16954c[_0xc8b53b(0x52a)]?_0x16954c[_0xc8b53b(0x52a)][_0xc8b53b(0x2eb)](this,_0x4523fc):VisuMZ['CoreEngine'][_0xc8b53b(0x254)][_0xc8b53b(0x2eb)](this,_0x4523fc);},VisuMZ[_0x3a331f(0x3c0)]['Window_Gold_refresh']=Window_Gold['prototype'][_0x3a331f(0x45e)],Window_Gold[_0x3a331f(0x499)]['refresh']=function(){const _0x35e510=_0x3a331f;this[_0x35e510(0x392)]()?this['drawGoldItemStyle']():VisuMZ[_0x35e510(0x3c0)][_0x35e510(0x234)][_0x35e510(0x2eb)](this);},Window_Gold[_0x3a331f(0x499)]['isItemStyle']=function(){const _0x26c00c=_0x3a331f;if(TextManager[_0x26c00c(0x38c)]!==this['currencyUnit']())return![];return VisuMZ['CoreEngine']['Settings'][_0x26c00c(0x738)][_0x26c00c(0x331)];},Window_Gold[_0x3a331f(0x499)][_0x3a331f(0x62e)]=function(){const _0x4c9824=_0x3a331f;this[_0x4c9824(0x37f)](),this[_0x4c9824(0x427)][_0x4c9824(0x53f)](),this[_0x4c9824(0x427)][_0x4c9824(0x57b)]=VisuMZ[_0x4c9824(0x3c0)][_0x4c9824(0x6be)][_0x4c9824(0x738)][_0x4c9824(0x721)];const _0xe1195d=VisuMZ[_0x4c9824(0x3c0)][_0x4c9824(0x6be)][_0x4c9824(0x738)][_0x4c9824(0x371)],_0x15dd92=this[_0x4c9824(0x424)](0x0);if(_0xe1195d>0x0){const _0x50a810=_0x15dd92['y']+(this[_0x4c9824(0x1d9)]()-ImageManager[_0x4c9824(0x48c)])/0x2;this['drawIcon'](_0xe1195d,_0x15dd92['x'],_0x50a810);const _0x3159e8=ImageManager[_0x4c9824(0x32e)]+0x4;_0x15dd92['x']+=_0x3159e8,_0x15dd92[_0x4c9824(0x483)]-=_0x3159e8;}this[_0x4c9824(0x6e3)](ColorManager[_0x4c9824(0x63c)]()),this['drawText'](this[_0x4c9824(0x38c)](),_0x15dd92['x'],_0x15dd92['y'],_0x15dd92[_0x4c9824(0x483)],_0x4c9824(0x453));const _0x28efe1=this[_0x4c9824(0x539)](this[_0x4c9824(0x38c)]())+0x6;;_0x15dd92['x']+=_0x28efe1,_0x15dd92[_0x4c9824(0x483)]-=_0x28efe1,this[_0x4c9824(0x4b2)]();const _0x27a89f=this['value'](),_0x17e14=this[_0x4c9824(0x539)](this[_0x4c9824(0x3b2)]?VisuMZ[_0x4c9824(0x51a)](this[_0x4c9824(0x5b0)]()):this[_0x4c9824(0x5b0)]());_0x17e14>_0x15dd92[_0x4c9824(0x483)]?this[_0x4c9824(0x400)](VisuMZ[_0x4c9824(0x3c0)][_0x4c9824(0x6be)][_0x4c9824(0x738)]['GoldOverlap'],_0x15dd92['x'],_0x15dd92['y'],_0x15dd92['width'],_0x4c9824(0x5b1)):this[_0x4c9824(0x400)](this[_0x4c9824(0x5b0)](),_0x15dd92['x'],_0x15dd92['y'],_0x15dd92[_0x4c9824(0x483)],_0x4c9824(0x5b1)),this[_0x4c9824(0x37f)]();},Window_StatusBase[_0x3a331f(0x499)][_0x3a331f(0x225)]=function(_0x1209c8,_0x51282b,_0x3cf037,_0x3b3e57,_0x14478d){const _0x5db56f=_0x3a331f;_0x3b3e57=String(_0x3b3e57||'')[_0x5db56f(0x3c7)]();if(VisuMZ['CoreEngine'][_0x5db56f(0x6be)]['Param']['DrawIcons']){const _0x16c063=VisuMZ[_0x5db56f(0x1a3)](_0x3b3e57);_0x14478d?(this[_0x5db56f(0x4b8)](_0x16c063,_0x1209c8,_0x51282b,this[_0x5db56f(0x563)]()),_0x3cf037-=this[_0x5db56f(0x563)]()+0x2,_0x1209c8+=this['gaugeLineHeight']()+0x2):(this[_0x5db56f(0x572)](_0x16c063,_0x1209c8+0x2,_0x51282b+0x2),_0x3cf037-=ImageManager[_0x5db56f(0x32e)]+0x4,_0x1209c8+=ImageManager[_0x5db56f(0x32e)]+0x4);}const _0x2cb4fc=TextManager[_0x5db56f(0x712)](_0x3b3e57);this[_0x5db56f(0x37f)](),this[_0x5db56f(0x6e3)](ColorManager['systemColor']()),_0x14478d?(this[_0x5db56f(0x427)][_0x5db56f(0x57b)]=this[_0x5db56f(0x619)](),this[_0x5db56f(0x427)][_0x5db56f(0x400)](_0x2cb4fc,_0x1209c8,_0x51282b,_0x3cf037,this['gaugeLineHeight'](),_0x5db56f(0x453))):this[_0x5db56f(0x400)](_0x2cb4fc,_0x1209c8,_0x51282b,_0x3cf037),this[_0x5db56f(0x37f)]();},Window_StatusBase[_0x3a331f(0x499)]['smallParamFontSize']=function(){const _0x2a1edb=_0x3a331f;return $gameSystem[_0x2a1edb(0x385)]()-0x8;},Window_StatusBase['prototype'][_0x3a331f(0x276)]=function(_0x2f7ed3,_0x10d4b1,_0x1026b1,_0x37462d){const _0x59bec8=_0x3a331f;_0x37462d=_0x37462d||0xa8,this[_0x59bec8(0x4b2)]();if(VisuMZ[_0x59bec8(0x3c0)][_0x59bec8(0x6be)]['UI'][_0x59bec8(0x3ef)])this[_0x59bec8(0x56d)](_0x2f7ed3[_0x59bec8(0x71f)]()[_0x59bec8(0x2a8)],_0x10d4b1,_0x1026b1,_0x37462d);else{const _0x5c5b94=_0x2f7ed3['currentClass']()['name'][_0x59bec8(0x4e3)](/\\I\[(\d+)\]/gi,'');this[_0x59bec8(0x400)](_0x5c5b94,_0x10d4b1,_0x1026b1,_0x37462d);}},Window_StatusBase['prototype'][_0x3a331f(0x40a)]=function(_0x31e95a,_0x50aa2e,_0x1b91b7,_0x47a5a7){const _0x3213c0=_0x3a331f;_0x47a5a7=_0x47a5a7||0x10e,this[_0x3213c0(0x4b2)]();if(VisuMZ[_0x3213c0(0x3c0)][_0x3213c0(0x6be)]['UI'][_0x3213c0(0x1a2)])this[_0x3213c0(0x56d)](_0x31e95a[_0x3213c0(0x437)](),_0x50aa2e,_0x1b91b7,_0x47a5a7);else{const _0xfdce5b=_0x31e95a[_0x3213c0(0x437)]()['replace'](/\\I\[(\d+)\]/gi,'');this[_0x3213c0(0x400)](_0x31e95a[_0x3213c0(0x437)](),_0x50aa2e,_0x1b91b7,_0x47a5a7);}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x526)]=Window_StatusBase[_0x3a331f(0x499)][_0x3a331f(0x6ec)],Window_StatusBase[_0x3a331f(0x499)]['drawActorLevel']=function(_0x5c6f91,_0x5d5c45,_0xaa6c01){const _0x48e283=_0x3a331f;if(this['isExpGaugeDrawn']())this[_0x48e283(0x46e)](_0x5c6f91,_0x5d5c45,_0xaa6c01);VisuMZ['CoreEngine'][_0x48e283(0x526)][_0x48e283(0x2eb)](this,_0x5c6f91,_0x5d5c45,_0xaa6c01);},Window_StatusBase[_0x3a331f(0x499)][_0x3a331f(0x1c4)]=function(){const _0x4c5fad=_0x3a331f;return VisuMZ[_0x4c5fad(0x3c0)][_0x4c5fad(0x6be)]['UI'][_0x4c5fad(0x1ba)];},Window_StatusBase[_0x3a331f(0x499)]['drawActorExpGauge']=function(_0x1ec69e,_0x209974,_0x2d755f){const _0x35a3a8=_0x3a331f;if(!_0x1ec69e)return;if(!_0x1ec69e[_0x35a3a8(0x3fd)]())return;const _0x18f0b5=0x80,_0x1c0a12=_0x1ec69e[_0x35a3a8(0x310)]();let _0x5d90da=ColorManager[_0x35a3a8(0x486)](),_0x4c4b7e=ColorManager[_0x35a3a8(0x616)]();_0x1c0a12>=0x1&&(_0x5d90da=ColorManager[_0x35a3a8(0x6b6)](),_0x4c4b7e=ColorManager['maxLvGaugeColor2']()),this[_0x35a3a8(0x330)](_0x209974,_0x2d755f,_0x18f0b5,_0x1c0a12,_0x5d90da,_0x4c4b7e);},Window_EquipStatus[_0x3a331f(0x499)][_0x3a331f(0x567)]=function(){const _0x3caae8=_0x3a331f;let _0x185d49=0x0;for(const _0x58f8a2 of VisuMZ[_0x3caae8(0x3c0)][_0x3caae8(0x6be)][_0x3caae8(0x4c3)]['DisplayedParams']){const _0x2f96ce=this[_0x3caae8(0x299)](),_0x47b81a=this[_0x3caae8(0x302)](_0x185d49);this[_0x3caae8(0x316)](_0x2f96ce,_0x47b81a,_0x58f8a2),_0x185d49++;}},Window_EquipStatus[_0x3a331f(0x499)]['drawParamName']=function(_0x5b33d1,_0x279ef6,_0x2d2070){const _0x3e649b=_0x3a331f,_0x147b13=this[_0x3e649b(0x1bc)]()-this[_0x3e649b(0x299)]()*0x2;this['drawParamText'](_0x5b33d1,_0x279ef6,_0x147b13,_0x2d2070,![]);},Window_EquipStatus[_0x3a331f(0x499)][_0x3a331f(0x1d6)]=function(_0x2473cf,_0x381738,_0x1d5eaa){const _0x3ffd8a=_0x3a331f,_0x59586b=this[_0x3ffd8a(0x363)]();this[_0x3ffd8a(0x4b2)](),this['drawText'](this[_0x3ffd8a(0x2da)]['paramValueByName'](_0x1d5eaa,!![]),_0x2473cf,_0x381738,_0x59586b,_0x3ffd8a(0x5b1));},Window_EquipStatus[_0x3a331f(0x499)][_0x3a331f(0x343)]=function(_0xf97200,_0x14565f){const _0x125b2a=_0x3a331f,_0x56ab85=this[_0x125b2a(0x44c)]();this[_0x125b2a(0x6e3)](ColorManager[_0x125b2a(0x63c)]());const _0x49234b=VisuMZ[_0x125b2a(0x3c0)]['Settings']['UI'][_0x125b2a(0x412)];this['drawText'](_0x49234b,_0xf97200,_0x14565f,_0x56ab85,_0x125b2a(0x68b));},Window_EquipStatus[_0x3a331f(0x499)][_0x3a331f(0x1b1)]=function(_0x44010f,_0x1f92c3,_0x2ae2b3){const _0x360334=_0x3a331f,_0x433e1c=this[_0x360334(0x363)](),_0x127723=this['_tempActor'][_0x360334(0x2ce)](_0x2ae2b3),_0x493f38=_0x127723-this[_0x360334(0x2da)][_0x360334(0x2ce)](_0x2ae2b3);this[_0x360334(0x6e3)](ColorManager['paramchangeTextColor'](_0x493f38)),this[_0x360334(0x400)](VisuMZ[_0x360334(0x54f)](_0x127723,0x0,_0x2ae2b3),_0x44010f,_0x1f92c3,_0x433e1c,_0x360334(0x5b1));},VisuMZ[_0x3a331f(0x3c0)]['Window_EquipItem_isEnabled']=Window_EquipItem[_0x3a331f(0x499)]['isEnabled'],Window_EquipItem[_0x3a331f(0x499)][_0x3a331f(0x4f2)]=function(_0x3a8dad){const _0x24ab52=_0x3a331f;return _0x3a8dad&&this[_0x24ab52(0x2da)]?this[_0x24ab52(0x2da)][_0x24ab52(0x43d)](_0x3a8dad):VisuMZ[_0x24ab52(0x3c0)][_0x24ab52(0x3e1)][_0x24ab52(0x2eb)](this,_0x3a8dad);},Window_StatusParams[_0x3a331f(0x499)]['maxItems']=function(){const _0x495956=_0x3a331f;return VisuMZ['CoreEngine'][_0x495956(0x6be)][_0x495956(0x4c3)][_0x495956(0x229)][_0x495956(0x2ed)];},Window_StatusParams[_0x3a331f(0x499)][_0x3a331f(0x316)]=function(_0x5537bf){const _0x464ec0=_0x3a331f,_0x40f712=this[_0x464ec0(0x424)](_0x5537bf),_0x4cf9a2=VisuMZ[_0x464ec0(0x3c0)][_0x464ec0(0x6be)]['Param'][_0x464ec0(0x229)][_0x5537bf],_0x51ec5a=TextManager['param'](_0x4cf9a2),_0x1a3692=this[_0x464ec0(0x2da)][_0x464ec0(0x2ce)](_0x4cf9a2,!![]);this[_0x464ec0(0x225)](_0x40f712['x'],_0x40f712['y'],0xa0,_0x4cf9a2,![]),this['resetTextColor'](),this[_0x464ec0(0x400)](_0x1a3692,_0x40f712['x']+0xa0,_0x40f712['y'],0x3c,_0x464ec0(0x5b1));};if(VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)]['KeyboardInput'][_0x3a331f(0x20d)]){VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x58c)][_0x3a331f(0x4dd)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ['CoreEngine'][_0x3a331f(0x35b)]=Window_NameInput['prototype'][_0x3a331f(0x64b)],Window_NameInput[_0x3a331f(0x499)]['initialize']=function(_0x439cae){const _0x5c35e2=_0x3a331f;this[_0x5c35e2(0x58e)]=this['defaultInputMode'](),VisuMZ[_0x5c35e2(0x3c0)]['Window_NameInput_initialize'][_0x5c35e2(0x2eb)](this,_0x439cae),Input[_0x5c35e2(0x53f)](),this['deselect']();},Window_NameInput[_0x3a331f(0x499)]['defaultInputMode']=function(){const _0x2d8387=_0x3a331f;return VisuMZ[_0x2d8387(0x3c0)][_0x2d8387(0x6be)][_0x2d8387(0x58c)]['DefaultMode']||'keyboard';},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x692)]=Window_NameInput[_0x3a331f(0x499)]['processHandling'],Window_NameInput['prototype']['processHandling']=function(){const _0xf43ef=_0x3a331f;if(!this[_0xf43ef(0x633)]())return;if(!this[_0xf43ef(0x249)])return;if(Input[_0xf43ef(0x2c6)](_0xf43ef(0x5ad)))Input[_0xf43ef(0x53f)](),this[_0xf43ef(0x2d1)]();else{if(Input[_0xf43ef(0x5be)]('tab'))Input[_0xf43ef(0x53f)](),this['_mode']==='keyboard'?this[_0xf43ef(0x584)](_0xf43ef(0x410)):this[_0xf43ef(0x584)]('keyboard');else{if(this[_0xf43ef(0x58e)]===_0xf43ef(0x209))this[_0xf43ef(0x227)]();else Input[_0xf43ef(0x2c6)](_0xf43ef(0x576))?(Input[_0xf43ef(0x53f)](),this[_0xf43ef(0x584)](_0xf43ef(0x209))):VisuMZ[_0xf43ef(0x3c0)][_0xf43ef(0x692)][_0xf43ef(0x2eb)](this);}}},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x219)]=Window_NameInput[_0x3a331f(0x499)]['processTouch'],Window_NameInput[_0x3a331f(0x499)][_0x3a331f(0x3d2)]=function(){const _0x563609=_0x3a331f;if(!this[_0x563609(0x2e0)]())return;if(this['_mode']===_0x563609(0x209)){if(TouchInput[_0x563609(0x5be)]()&&this[_0x563609(0x30c)]())this[_0x563609(0x584)](_0x563609(0x410));else TouchInput['isCancelled']()&&this[_0x563609(0x584)](_0x563609(0x410));}else VisuMZ[_0x563609(0x3c0)]['Window_NameInput_processTouch'][_0x563609(0x2eb)](this);},Window_NameInput[_0x3a331f(0x499)]['processKeyboardHandling']=function(){const _0x14eff9=_0x3a331f;if(Input[_0x14eff9(0x2c6)](_0x14eff9(0x604)))Input[_0x14eff9(0x53f)](),this['onNameOk']();else{if(Input[_0x14eff9(0x4bd)]!==undefined){let _0x23edad=Input['_inputString'],_0x550b36=_0x23edad[_0x14eff9(0x2ed)];for(let _0x238359=0x0;_0x238359<_0x550b36;++_0x238359){this['_editWindow'][_0x14eff9(0x53c)](_0x23edad[_0x238359])?SoundManager[_0x14eff9(0x6bc)]():SoundManager[_0x14eff9(0x5b5)]();}Input[_0x14eff9(0x53f)]();}}},Window_NameInput['prototype'][_0x3a331f(0x584)]=function(_0x5efb90){const _0x226438=_0x3a331f;let _0x58a9d5=this[_0x226438(0x58e)];this[_0x226438(0x58e)]=_0x5efb90,_0x58a9d5!==this[_0x226438(0x58e)]&&(this[_0x226438(0x45e)](),SoundManager['playOk'](),this['_mode']==='default'?this[_0x226438(0x22a)](0x0):this[_0x226438(0x22a)](-0x1));},VisuMZ['CoreEngine'][_0x3a331f(0x6bf)]=Window_NameInput[_0x3a331f(0x499)][_0x3a331f(0x4d2)],Window_NameInput[_0x3a331f(0x499)]['cursorDown']=function(_0x2b69b1){const _0x332a50=_0x3a331f;if(this[_0x332a50(0x58e)]===_0x332a50(0x209)&&!Input['isArrowPressed']())return;if(Input[_0x332a50(0x631)]())return;VisuMZ['CoreEngine'][_0x332a50(0x6bf)][_0x332a50(0x2eb)](this,_0x2b69b1),this['switchModes'](_0x332a50(0x410));},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x266)]=Window_NameInput[_0x3a331f(0x499)][_0x3a331f(0x607)],Window_NameInput['prototype'][_0x3a331f(0x607)]=function(_0x113c30){const _0x251d55=_0x3a331f;if(this[_0x251d55(0x58e)]===_0x251d55(0x209)&&!Input[_0x251d55(0x6f6)]())return;if(Input[_0x251d55(0x631)]())return;VisuMZ[_0x251d55(0x3c0)][_0x251d55(0x266)][_0x251d55(0x2eb)](this,_0x113c30),this[_0x251d55(0x584)](_0x251d55(0x410));},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x632)]=Window_NameInput[_0x3a331f(0x499)][_0x3a331f(0x3d4)],Window_NameInput['prototype'][_0x3a331f(0x3d4)]=function(_0x425abf){const _0x5ab3ee=_0x3a331f;if(this[_0x5ab3ee(0x58e)]==='keyboard'&&!Input[_0x5ab3ee(0x6f6)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x5ab3ee(0x3c0)][_0x5ab3ee(0x632)][_0x5ab3ee(0x2eb)](this,_0x425abf),this[_0x5ab3ee(0x584)](_0x5ab3ee(0x410));},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x40e)]=Window_NameInput[_0x3a331f(0x499)][_0x3a331f(0x56c)],Window_NameInput[_0x3a331f(0x499)][_0x3a331f(0x56c)]=function(_0x3d3624){const _0x436a88=_0x3a331f;if(this[_0x436a88(0x58e)]===_0x436a88(0x209)&&!Input[_0x436a88(0x6f6)]())return;if(Input[_0x436a88(0x631)]())return;VisuMZ[_0x436a88(0x3c0)][_0x436a88(0x40e)][_0x436a88(0x2eb)](this,_0x3d3624),this[_0x436a88(0x584)](_0x436a88(0x410));},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x705)]=Window_NameInput[_0x3a331f(0x499)][_0x3a331f(0x5a7)],Window_NameInput[_0x3a331f(0x499)]['cursorPagedown']=function(){const _0x17a718=_0x3a331f;if(this['_mode']===_0x17a718(0x209))return;if(Input['isNumpadPressed']())return;VisuMZ[_0x17a718(0x3c0)][_0x17a718(0x705)][_0x17a718(0x2eb)](this),this['switchModes']('default');},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x1cb)]=Window_NameInput[_0x3a331f(0x499)]['cursorPageup'],Window_NameInput['prototype'][_0x3a331f(0x2ad)]=function(){const _0x2ec798=_0x3a331f;if(this[_0x2ec798(0x58e)]==='keyboard')return;if(Input[_0x2ec798(0x631)]())return;VisuMZ[_0x2ec798(0x3c0)][_0x2ec798(0x1cb)][_0x2ec798(0x2eb)](this),this['switchModes']('default');},VisuMZ['CoreEngine'][_0x3a331f(0x253)]=Window_NameInput[_0x3a331f(0x499)][_0x3a331f(0x45e)],Window_NameInput[_0x3a331f(0x499)][_0x3a331f(0x45e)]=function(){const _0x1d43ab=_0x3a331f;if(this[_0x1d43ab(0x58e)]==='keyboard'){this[_0x1d43ab(0x427)]['clear'](),this[_0x1d43ab(0x261)][_0x1d43ab(0x53f)](),this[_0x1d43ab(0x4b2)]();let _0x118c82=VisuMZ['CoreEngine'][_0x1d43ab(0x6be)][_0x1d43ab(0x58c)][_0x1d43ab(0x6a7)][_0x1d43ab(0x4af)]('\x0a'),_0x22c795=_0x118c82[_0x1d43ab(0x2ed)],_0x43df90=(this['innerHeight']-_0x22c795*this['lineHeight']())/0x2;for(let _0xb5ef85=0x0;_0xb5ef85<_0x22c795;++_0xb5ef85){let _0x16b25f=_0x118c82[_0xb5ef85],_0x53fb7a=this[_0x1d43ab(0x564)](_0x16b25f)['width'],_0x3485fd=Math[_0x1d43ab(0x4e5)]((this[_0x1d43ab(0x427)][_0x1d43ab(0x483)]-_0x53fb7a)/0x2);this[_0x1d43ab(0x56d)](_0x16b25f,_0x3485fd,_0x43df90),_0x43df90+=this[_0x1d43ab(0x1d9)]();}}else VisuMZ[_0x1d43ab(0x3c0)][_0x1d43ab(0x253)][_0x1d43ab(0x2eb)](this);};};VisuMZ['CoreEngine'][_0x3a331f(0x46d)]=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell[_0x3a331f(0x499)]['isEnabled']=function(_0xf2df19){const _0x20bef1=_0x3a331f;return VisuMZ[_0x20bef1(0x3c0)][_0x20bef1(0x6be)][_0x20bef1(0x271)][_0x20bef1(0x488)]&&DataManager[_0x20bef1(0x223)](_0xf2df19)?![]:VisuMZ[_0x20bef1(0x3c0)][_0x20bef1(0x46d)][_0x20bef1(0x2eb)](this,_0xf2df19);},Window_NumberInput['prototype'][_0x3a331f(0x70e)]=function(){return![];};VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)]['KeyboardInput']['EnableNumberInput']&&(VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x1a0)]=Window_NumberInput[_0x3a331f(0x499)][_0x3a331f(0x4e9)],Window_NumberInput[_0x3a331f(0x499)][_0x3a331f(0x4e9)]=function(){const _0x1ae5fc=_0x3a331f;VisuMZ[_0x1ae5fc(0x3c0)][_0x1ae5fc(0x1a0)][_0x1ae5fc(0x2eb)](this),this[_0x1ae5fc(0x22a)](this[_0x1ae5fc(0x5e6)]-0x1);},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x1e6)]=Window_NumberInput[_0x3a331f(0x499)][_0x3a331f(0x1d5)],Window_NumberInput[_0x3a331f(0x499)][_0x3a331f(0x1d5)]=function(){const _0x37ddd9=_0x3a331f;if(!this['isOpenAndActive']())return;if(Input[_0x37ddd9(0x631)]())this[_0x37ddd9(0x69f)]();else{if(Input[_0x37ddd9(0x2c6)](_0x37ddd9(0x5ad)))this[_0x37ddd9(0x64c)]();else{if(Input[_0x37ddd9(0x562)]===0x2e)this[_0x37ddd9(0x3cc)]();else{if(Input[_0x37ddd9(0x562)]===0x24)this['processKeyboardHome']();else Input[_0x37ddd9(0x562)]===0x23?this['processKeyboardEnd']():(VisuMZ[_0x37ddd9(0x3c0)]['Window_NumberInput_processDigitChange'][_0x37ddd9(0x2eb)](this),Input['clear']());}}}},Window_NumberInput[_0x3a331f(0x499)][_0x3a331f(0x4ac)]=function(){const _0x680132=_0x3a331f;if(!this[_0x680132(0x309)]())return;Input[_0x680132(0x631)]()?this[_0x680132(0x69f)]():Window_Selectable['prototype'][_0x680132(0x4ac)]['call'](this);},Window_NumberInput[_0x3a331f(0x499)][_0x3a331f(0x6e8)]=function(){},Window_NumberInput[_0x3a331f(0x499)][_0x3a331f(0x69f)]=function(){const _0xa2187b=_0x3a331f;if(String(this[_0xa2187b(0x5aa)])['length']>=this[_0xa2187b(0x5e6)])return;this[_0xa2187b(0x5aa)]=Number(String(this[_0xa2187b(0x5aa)])+Input[_0xa2187b(0x4bd)]);const _0x103a4d='9'[_0xa2187b(0x332)](this['_maxDigits']);this['_number']=this[_0xa2187b(0x5aa)][_0xa2187b(0x283)](0x0,_0x103a4d),Input[_0xa2187b(0x53f)](),this[_0xa2187b(0x45e)](),SoundManager['playCursor'](),this[_0xa2187b(0x22a)](this[_0xa2187b(0x5e6)]-0x1);},Window_NumberInput[_0x3a331f(0x499)][_0x3a331f(0x64c)]=function(){const _0x59d08d=_0x3a331f;this[_0x59d08d(0x5aa)]=Number(String(this[_0x59d08d(0x5aa)])[_0x59d08d(0x4f3)](0x0,-0x1)),this[_0x59d08d(0x5aa)]=Math[_0x59d08d(0x6e9)](0x0,this[_0x59d08d(0x5aa)]),Input[_0x59d08d(0x53f)](),this[_0x59d08d(0x45e)](),SoundManager['playCursor'](),this[_0x59d08d(0x22a)](this[_0x59d08d(0x5e6)]-0x1);},Window_NumberInput[_0x3a331f(0x499)][_0x3a331f(0x3cc)]=function(){const _0x479047=_0x3a331f;this[_0x479047(0x5aa)]=Number(String(this[_0x479047(0x5aa)])['substring'](0x1)),this['_number']=Math[_0x479047(0x6e9)](0x0,this[_0x479047(0x5aa)]),Input[_0x479047(0x53f)](),this[_0x479047(0x45e)](),SoundManager[_0x479047(0x3fa)](),this[_0x479047(0x22a)](this[_0x479047(0x5e6)]-0x1);});;Window_TitleCommand['_commandList']=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x625)],Window_TitleCommand[_0x3a331f(0x499)]['makeCommandList']=function(){const _0x364a97=_0x3a331f;this[_0x364a97(0x30d)]();},Window_TitleCommand['prototype'][_0x3a331f(0x30d)]=function(){const _0x46c6a9=_0x3a331f;for(const _0x38e93c of Window_TitleCommand[_0x46c6a9(0x5ba)]){if(_0x38e93c[_0x46c6a9(0x35d)][_0x46c6a9(0x2eb)](this)){const _0x5aabd9=_0x38e93c['Symbol'];let _0x519fb5=_0x38e93c['TextStr'];if(['',_0x46c6a9(0x327)][_0x46c6a9(0x2a5)](_0x519fb5))_0x519fb5=_0x38e93c[_0x46c6a9(0x73e)][_0x46c6a9(0x2eb)](this);const _0x39aa52=_0x38e93c[_0x46c6a9(0x3bd)]['call'](this),_0x1e083c=_0x38e93c['ExtJS']['call'](this);this[_0x46c6a9(0x508)](_0x519fb5,_0x5aabd9,_0x39aa52,_0x1e083c),this['setHandler'](_0x5aabd9,_0x38e93c[_0x46c6a9(0x22c)][_0x46c6a9(0x58d)](this,_0x1e083c));}}},Window_GameEnd[_0x3a331f(0x5ba)]=VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x6be)][_0x3a331f(0x629)][_0x3a331f(0x4ab)]['CommandList'],Window_GameEnd[_0x3a331f(0x499)][_0x3a331f(0x6c2)]=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x3a331f(0x499)]['makeCoreEngineCommandList']=function(){const _0x5f2939=_0x3a331f;for(const _0x5e0c43 of Window_GameEnd['_commandList']){if(_0x5e0c43[_0x5f2939(0x35d)][_0x5f2939(0x2eb)](this)){const _0x373ca5=_0x5e0c43[_0x5f2939(0x6a0)];let _0x8eb951=_0x5e0c43[_0x5f2939(0x61d)];if(['',_0x5f2939(0x327)][_0x5f2939(0x2a5)](_0x8eb951))_0x8eb951=_0x5e0c43['TextJS'][_0x5f2939(0x2eb)](this);const _0x57f865=_0x5e0c43[_0x5f2939(0x3bd)][_0x5f2939(0x2eb)](this),_0x593497=_0x5e0c43[_0x5f2939(0x334)][_0x5f2939(0x2eb)](this);this[_0x5f2939(0x508)](_0x8eb951,_0x373ca5,_0x57f865,_0x593497),this['setHandler'](_0x373ca5,_0x5e0c43['CallHandlerJS']['bind'](this,_0x593497));}}};function Window_ButtonAssist(){const _0x20b9b1=_0x3a331f;this[_0x20b9b1(0x64b)](...arguments);}Window_ButtonAssist[_0x3a331f(0x499)]=Object[_0x3a331f(0x6d5)](Window_Base[_0x3a331f(0x499)]),Window_ButtonAssist[_0x3a331f(0x499)][_0x3a331f(0x4d7)]=Window_ButtonAssist,Window_ButtonAssist[_0x3a331f(0x499)][_0x3a331f(0x64b)]=function(_0x4c0e63){const _0xd893cb=_0x3a331f;this['_data']={},Window_Base[_0xd893cb(0x499)]['initialize'][_0xd893cb(0x2eb)](this,_0x4c0e63),this[_0xd893cb(0x4ce)](VisuMZ[_0xd893cb(0x3c0)][_0xd893cb(0x6be)]['ButtonAssist'][_0xd893cb(0x6ca)]||0x0),this[_0xd893cb(0x45e)]();},Window_ButtonAssist['prototype'][_0x3a331f(0x256)]=function(){const _0x5ecd94=_0x3a331f;this[_0x5ecd94(0x427)][_0x5ecd94(0x57b)]<=0x60&&(this[_0x5ecd94(0x427)][_0x5ecd94(0x57b)]+=0x6);},Window_ButtonAssist[_0x3a331f(0x499)][_0x3a331f(0x649)]=function(){const _0x23279b=_0x3a331f;this['contents']['fontSize']>=0x18&&(this[_0x23279b(0x427)][_0x23279b(0x57b)]-=0x6);},Window_ButtonAssist['prototype'][_0x3a331f(0x560)]=function(){const _0x1359c0=_0x3a331f;Window_Base[_0x1359c0(0x499)]['update']['call'](this),this[_0x1359c0(0x29c)]();},Window_ButtonAssist[_0x3a331f(0x499)][_0x3a331f(0x22d)]=function(){const _0x5a8796=_0x3a331f;this[_0x5a8796(0x1fd)]=SceneManager['_scene'][_0x5a8796(0x3b9)]()!==_0x5a8796(0x5e0)?0x0:0x8;},Window_ButtonAssist[_0x3a331f(0x499)][_0x3a331f(0x29c)]=function(){const _0x4c33fb=_0x3a331f,_0x2db826=SceneManager[_0x4c33fb(0x69e)];for(let _0x4c5972=0x1;_0x4c5972<=0x5;_0x4c5972++){if(this[_0x4c33fb(0x435)][_0x4c33fb(0x51b)[_0x4c33fb(0x5f7)](_0x4c5972)]!==_0x2db826[_0x4c33fb(0x443)['format'](_0x4c5972)]())return this[_0x4c33fb(0x45e)]();if(this[_0x4c33fb(0x435)][_0x4c33fb(0x5f9)['format'](_0x4c5972)]!==_0x2db826[_0x4c33fb(0x63a)[_0x4c33fb(0x5f7)](_0x4c5972)]())return this[_0x4c33fb(0x45e)]();}},Window_ButtonAssist[_0x3a331f(0x499)]['refresh']=function(){const _0x165cde=_0x3a331f;this[_0x165cde(0x427)]['clear']();for(let _0x3fd8bc=0x1;_0x3fd8bc<=0x5;_0x3fd8bc++){this[_0x165cde(0x70f)](_0x3fd8bc);}},Window_ButtonAssist[_0x3a331f(0x499)]['drawSegment']=function(_0x3a87c5){const _0x2e8e30=_0x3a331f,_0x473b5c=this[_0x2e8e30(0x663)]/0x5,_0x218ff8=SceneManager[_0x2e8e30(0x69e)],_0x476273=_0x218ff8[_0x2e8e30(0x443)[_0x2e8e30(0x5f7)](_0x3a87c5)](),_0xfda99=_0x218ff8[_0x2e8e30(0x63a)['format'](_0x3a87c5)]();this[_0x2e8e30(0x435)]['key%1'[_0x2e8e30(0x5f7)](_0x3a87c5)]=_0x476273,this[_0x2e8e30(0x435)]['text%1'[_0x2e8e30(0x5f7)](_0x3a87c5)]=_0xfda99;if(_0x476273==='')return;if(_0xfda99==='')return;const _0x4a79bd=_0x218ff8[_0x2e8e30(0x697)[_0x2e8e30(0x5f7)](_0x3a87c5)](),_0x40b420=this['itemPadding'](),_0x56da33=_0x473b5c*(_0x3a87c5-0x1)+_0x40b420+_0x4a79bd,_0x5ee3bf=VisuMZ[_0x2e8e30(0x3c0)][_0x2e8e30(0x6be)][_0x2e8e30(0x4ca)][_0x2e8e30(0x6ea)];this[_0x2e8e30(0x56d)](_0x5ee3bf[_0x2e8e30(0x5f7)](_0x476273,_0xfda99),_0x56da33,0x0,_0x473b5c-_0x40b420*0x2);},VisuMZ[_0x3a331f(0x450)]=function(_0xe2d527){const _0x54c019=_0x3a331f;if(Utils[_0x54c019(0x6e1)](_0x54c019(0x54b))){var _0x41f257=require(_0x54c019(0x404))[_0x54c019(0x43c)][_0x54c019(0x5d4)]();SceneManager[_0x54c019(0x32a)]();if(_0xe2d527)setTimeout(_0x41f257[_0x54c019(0x65b)][_0x54c019(0x58d)](_0x41f257),0x190);}},VisuMZ[_0x3a331f(0x5d3)]=function(_0x4a4bf7,_0x17a609){const _0x53a923=_0x3a331f;_0x17a609=_0x17a609[_0x53a923(0x3c7)]();var _0x8418b=1.70158,_0x321fab=0.7;switch(_0x17a609){case _0x53a923(0x2ff):return _0x4a4bf7;case _0x53a923(0x35f):return-0x1*Math[_0x53a923(0x317)](_0x4a4bf7*(Math['PI']/0x2))+0x1;case _0x53a923(0x496):return Math[_0x53a923(0x498)](_0x4a4bf7*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x53a923(0x317)](Math['PI']*_0x4a4bf7)-0x1);case _0x53a923(0x355):return _0x4a4bf7*_0x4a4bf7;case _0x53a923(0x3bb):return _0x4a4bf7*(0x2-_0x4a4bf7);case _0x53a923(0x6fd):return _0x4a4bf7<0.5?0x2*_0x4a4bf7*_0x4a4bf7:-0x1+(0x4-0x2*_0x4a4bf7)*_0x4a4bf7;case _0x53a923(0x45f):return _0x4a4bf7*_0x4a4bf7*_0x4a4bf7;case _0x53a923(0x367):var _0x22fede=_0x4a4bf7-0x1;return _0x22fede*_0x22fede*_0x22fede+0x1;case'INOUTCUBIC':return _0x4a4bf7<0.5?0x4*_0x4a4bf7*_0x4a4bf7*_0x4a4bf7:(_0x4a4bf7-0x1)*(0x2*_0x4a4bf7-0x2)*(0x2*_0x4a4bf7-0x2)+0x1;case _0x53a923(0x65c):return _0x4a4bf7*_0x4a4bf7*_0x4a4bf7*_0x4a4bf7;case _0x53a923(0x2e2):var _0x22fede=_0x4a4bf7-0x1;return 0x1-_0x22fede*_0x22fede*_0x22fede*_0x22fede;case'INOUTQUART':var _0x22fede=_0x4a4bf7-0x1;return _0x4a4bf7<0.5?0x8*_0x4a4bf7*_0x4a4bf7*_0x4a4bf7*_0x4a4bf7:0x1-0x8*_0x22fede*_0x22fede*_0x22fede*_0x22fede;case _0x53a923(0x192):return _0x4a4bf7*_0x4a4bf7*_0x4a4bf7*_0x4a4bf7*_0x4a4bf7;case _0x53a923(0x26d):var _0x22fede=_0x4a4bf7-0x1;return 0x1+_0x22fede*_0x22fede*_0x22fede*_0x22fede*_0x22fede;case _0x53a923(0x3b1):var _0x22fede=_0x4a4bf7-0x1;return _0x4a4bf7<0.5?0x10*_0x4a4bf7*_0x4a4bf7*_0x4a4bf7*_0x4a4bf7*_0x4a4bf7:0x1+0x10*_0x22fede*_0x22fede*_0x22fede*_0x22fede*_0x22fede;case'INEXPO':if(_0x4a4bf7===0x0)return 0x0;return Math['pow'](0x2,0xa*(_0x4a4bf7-0x1));case _0x53a923(0x47c):if(_0x4a4bf7===0x1)return 0x1;return-Math[_0x53a923(0x45c)](0x2,-0xa*_0x4a4bf7)+0x1;case'INOUTEXPO':if(_0x4a4bf7===0x0||_0x4a4bf7===0x1)return _0x4a4bf7;var _0x381dd6=_0x4a4bf7*0x2,_0xefa8aa=_0x381dd6-0x1;if(_0x381dd6<0x1)return 0.5*Math['pow'](0x2,0xa*_0xefa8aa);return 0.5*(-Math[_0x53a923(0x45c)](0x2,-0xa*_0xefa8aa)+0x2);case _0x53a923(0x2c4):var _0x381dd6=_0x4a4bf7/0x1;return-0x1*(Math['sqrt'](0x1-_0x381dd6*_0x4a4bf7)-0x1);case'OUTCIRC':var _0x22fede=_0x4a4bf7-0x1;return Math[_0x53a923(0x5ed)](0x1-_0x22fede*_0x22fede);case _0x53a923(0x311):var _0x381dd6=_0x4a4bf7*0x2,_0xefa8aa=_0x381dd6-0x2;if(_0x381dd6<0x1)return-0.5*(Math['sqrt'](0x1-_0x381dd6*_0x381dd6)-0x1);return 0.5*(Math[_0x53a923(0x5ed)](0x1-_0xefa8aa*_0xefa8aa)+0x1);case'INBACK':return _0x4a4bf7*_0x4a4bf7*((_0x8418b+0x1)*_0x4a4bf7-_0x8418b);case'OUTBACK':var _0x381dd6=_0x4a4bf7/0x1-0x1;return _0x381dd6*_0x381dd6*((_0x8418b+0x1)*_0x381dd6+_0x8418b)+0x1;break;case'INOUTBACK':var _0x381dd6=_0x4a4bf7*0x2,_0x2b4ace=_0x381dd6-0x2,_0x58cb1f=_0x8418b*1.525;if(_0x381dd6<0x1)return 0.5*_0x381dd6*_0x381dd6*((_0x58cb1f+0x1)*_0x381dd6-_0x58cb1f);return 0.5*(_0x2b4ace*_0x2b4ace*((_0x58cb1f+0x1)*_0x2b4ace+_0x58cb1f)+0x2);case _0x53a923(0x6e2):if(_0x4a4bf7===0x0||_0x4a4bf7===0x1)return _0x4a4bf7;var _0x381dd6=_0x4a4bf7/0x1,_0xefa8aa=_0x381dd6-0x1,_0x5c2639=0x1-_0x321fab,_0x58cb1f=_0x5c2639/(0x2*Math['PI'])*Math[_0x53a923(0x2d2)](0x1);return-(Math[_0x53a923(0x45c)](0x2,0xa*_0xefa8aa)*Math['sin']((_0xefa8aa-_0x58cb1f)*(0x2*Math['PI'])/_0x5c2639));case'OUTELASTIC':var _0x5c2639=0x1-_0x321fab,_0x381dd6=_0x4a4bf7*0x2;if(_0x4a4bf7===0x0||_0x4a4bf7===0x1)return _0x4a4bf7;var _0x58cb1f=_0x5c2639/(0x2*Math['PI'])*Math[_0x53a923(0x2d2)](0x1);return Math[_0x53a923(0x45c)](0x2,-0xa*_0x381dd6)*Math[_0x53a923(0x498)]((_0x381dd6-_0x58cb1f)*(0x2*Math['PI'])/_0x5c2639)+0x1;case'INOUTELASTIC':var _0x5c2639=0x1-_0x321fab;if(_0x4a4bf7===0x0||_0x4a4bf7===0x1)return _0x4a4bf7;var _0x381dd6=_0x4a4bf7*0x2,_0xefa8aa=_0x381dd6-0x1,_0x58cb1f=_0x5c2639/(0x2*Math['PI'])*Math[_0x53a923(0x2d2)](0x1);if(_0x381dd6<0x1)return-0.5*(Math[_0x53a923(0x45c)](0x2,0xa*_0xefa8aa)*Math[_0x53a923(0x498)]((_0xefa8aa-_0x58cb1f)*(0x2*Math['PI'])/_0x5c2639));return Math[_0x53a923(0x45c)](0x2,-0xa*_0xefa8aa)*Math['sin']((_0xefa8aa-_0x58cb1f)*(0x2*Math['PI'])/_0x5c2639)*0.5+0x1;case'OUTBOUNCE':var _0x381dd6=_0x4a4bf7/0x1;if(_0x381dd6<0x1/2.75)return 7.5625*_0x381dd6*_0x381dd6;else{if(_0x381dd6<0x2/2.75){var _0x2b4ace=_0x381dd6-1.5/2.75;return 7.5625*_0x2b4ace*_0x2b4ace+0.75;}else{if(_0x381dd6<2.5/2.75){var _0x2b4ace=_0x381dd6-2.25/2.75;return 7.5625*_0x2b4ace*_0x2b4ace+0.9375;}else{var _0x2b4ace=_0x381dd6-2.625/2.75;return 7.5625*_0x2b4ace*_0x2b4ace+0.984375;}}}case _0x53a923(0x52e):var _0x290e74=0x1-VisuMZ['ApplyEasing'](0x1-_0x4a4bf7,_0x53a923(0x662));return _0x290e74;case'INOUTBOUNCE':if(_0x4a4bf7<0.5)var _0x290e74=VisuMZ['ApplyEasing'](_0x4a4bf7*0x2,_0x53a923(0x691))*0.5;else var _0x290e74=VisuMZ[_0x53a923(0x5d3)](_0x4a4bf7*0x2-0x1,_0x53a923(0x662))*0.5+0.5;return _0x290e74;default:return _0x4a4bf7;}},VisuMZ[_0x3a331f(0x1a3)]=function(_0x9b9693){const _0x204aa3=_0x3a331f;_0x9b9693=String(_0x9b9693)[_0x204aa3(0x3c7)]();const _0xff6920=VisuMZ['CoreEngine'][_0x204aa3(0x6be)][_0x204aa3(0x4c3)];if(_0x9b9693===_0x204aa3(0x5f6))return _0xff6920[_0x204aa3(0x660)];if(_0x9b9693===_0x204aa3(0x1c6))return _0xff6920[_0x204aa3(0x298)];if(_0x9b9693==='ATK')return _0xff6920['IconParam2'];if(_0x9b9693===_0x204aa3(0x2b7))return _0xff6920[_0x204aa3(0x31c)];if(_0x9b9693==='MAT')return _0xff6920[_0x204aa3(0x4bf)];if(_0x9b9693==='MDF')return _0xff6920[_0x204aa3(0x6fc)];if(_0x9b9693===_0x204aa3(0x50e))return _0xff6920[_0x204aa3(0x319)];if(_0x9b9693===_0x204aa3(0x5fd))return _0xff6920['IconParam7'];if(_0x9b9693===_0x204aa3(0x702))return _0xff6920['IconXParam0'];if(_0x9b9693===_0x204aa3(0x36c))return _0xff6920['IconXParam1'];if(_0x9b9693===_0x204aa3(0x6d2))return _0xff6920['IconXParam2'];if(_0x9b9693===_0x204aa3(0x32c))return _0xff6920[_0x204aa3(0x45b)];if(_0x9b9693==='MEV')return _0xff6920[_0x204aa3(0x38b)];if(_0x9b9693===_0x204aa3(0x5f4))return _0xff6920['IconXParam5'];if(_0x9b9693===_0x204aa3(0x2d4))return _0xff6920[_0x204aa3(0x6c8)];if(_0x9b9693===_0x204aa3(0x4a2))return _0xff6920['IconXParam7'];if(_0x9b9693===_0x204aa3(0x346))return _0xff6920[_0x204aa3(0x1b0)];if(_0x9b9693===_0x204aa3(0x1ae))return _0xff6920['IconXParam9'];if(_0x9b9693===_0x204aa3(0x636))return _0xff6920[_0x204aa3(0x379)];if(_0x9b9693==='GRD')return _0xff6920[_0x204aa3(0x538)];if(_0x9b9693==='REC')return _0xff6920[_0x204aa3(0x44b)];if(_0x9b9693==='PHA')return _0xff6920[_0x204aa3(0x1af)];if(_0x9b9693===_0x204aa3(0x4e2))return _0xff6920['IconSParam4'];if(_0x9b9693===_0x204aa3(0x397))return _0xff6920[_0x204aa3(0x384)];if(_0x9b9693===_0x204aa3(0x45d))return _0xff6920[_0x204aa3(0x6e7)];if(_0x9b9693===_0x204aa3(0x1d4))return _0xff6920['IconSParam7'];if(_0x9b9693===_0x204aa3(0x339))return _0xff6920[_0x204aa3(0x373)];if(_0x9b9693===_0x204aa3(0x36b))return _0xff6920[_0x204aa3(0x556)];if(VisuMZ[_0x204aa3(0x3c0)][_0x204aa3(0x6f8)][_0x9b9693])return VisuMZ[_0x204aa3(0x3c0)]['CustomParamIcons'][_0x9b9693]||0x0;return 0x0;},VisuMZ[_0x3a331f(0x54f)]=function(_0x2509aa,_0x4e40b8,_0x43337d){const _0x51cacc=_0x3a331f;if(_0x43337d===undefined&&_0x2509aa%0x1===0x0)return _0x2509aa;if(_0x43337d!==undefined&&['MAXHP',_0x51cacc(0x1c6),'ATK','DEF',_0x51cacc(0x2e1),_0x51cacc(0x47b),_0x51cacc(0x50e),_0x51cacc(0x5fd)]['includes'](String(_0x43337d)[_0x51cacc(0x3c7)]()['trim']()))return _0x2509aa;return _0x4e40b8=_0x4e40b8||0x0,String((_0x2509aa*0x64)[_0x51cacc(0x504)](_0x4e40b8))+'%';},VisuMZ['GroupDigits']=function(_0x4f3f21){const _0xe480a3=_0x3a331f;_0x4f3f21=String(_0x4f3f21);if(!_0x4f3f21)return _0x4f3f21;if(typeof _0x4f3f21!==_0xe480a3(0x5fe))return _0x4f3f21;const _0x50b473=VisuMZ[_0xe480a3(0x3c0)][_0xe480a3(0x6be)][_0xe480a3(0x271)][_0xe480a3(0x200)]||_0xe480a3(0x656),_0x2e233f={'maximumFractionDigits':0x6};_0x4f3f21=_0x4f3f21[_0xe480a3(0x4e3)](/\[(.*?)\]/g,(_0x2538ea,_0x2c1b89)=>{const _0x469b48=_0xe480a3;return VisuMZ[_0x469b48(0x4ef)](_0x2c1b89,'[',']');}),_0x4f3f21=_0x4f3f21[_0xe480a3(0x4e3)](/<(.*?)>/g,(_0x626b,_0x11a373)=>{return VisuMZ['PreserveNumbers'](_0x11a373,'<','>');}),_0x4f3f21=_0x4f3f21['replace'](/\{\{(.*?)\}\}/g,(_0xdea679,_0xd53391)=>{const _0x516e2d=_0xe480a3;return VisuMZ[_0x516e2d(0x4ef)](_0xd53391,'','');}),_0x4f3f21=_0x4f3f21['replace'](/(\d+\.?\d*)/g,(_0x211ffd,_0x479d40)=>{const _0xb89e79=_0xe480a3;let _0x46beb6=_0x479d40;if(_0x46beb6[0x0]==='0')return _0x46beb6;if(_0x46beb6[_0x46beb6[_0xb89e79(0x2ed)]-0x1]==='.')return Number(_0x46beb6)[_0xb89e79(0x6d6)](_0x50b473,_0x2e233f)+'.';else return _0x46beb6[_0x46beb6[_0xb89e79(0x2ed)]-0x1]===','?Number(_0x46beb6)[_0xb89e79(0x6d6)](_0x50b473,_0x2e233f)+',':Number(_0x46beb6)['toLocaleString'](_0x50b473,_0x2e233f);});let _0x5a65c8=0x3;while(_0x5a65c8--){_0x4f3f21=VisuMZ[_0xe480a3(0x6a5)](_0x4f3f21);}return _0x4f3f21;},VisuMZ[_0x3a331f(0x4ef)]=function(_0x50e1cc,_0x25cc06,_0x34969e){const _0x104c3a=_0x3a331f;return _0x50e1cc=_0x50e1cc[_0x104c3a(0x4e3)](/(\d)/gi,(_0x535a82,_0x14aee0)=>_0x104c3a(0x211)[_0x104c3a(0x5f7)](Number(_0x14aee0))),_0x104c3a(0x549)[_0x104c3a(0x5f7)](_0x50e1cc,_0x25cc06,_0x34969e);},VisuMZ[_0x3a331f(0x6a5)]=function(_0x2227e6){const _0x184ab1=_0x3a331f;return _0x2227e6=_0x2227e6[_0x184ab1(0x4e3)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x2e48c3,_0x440a9e)=>Number(parseInt(_0x440a9e))),_0x2227e6;},VisuMZ[_0x3a331f(0x3a5)]=function(_0x580f3c){const _0x1fb733=_0x3a331f;SoundManager[_0x1fb733(0x6bc)]();if(!Utils[_0x1fb733(0x53e)]()){const _0x1c1c12=window['open'](_0x580f3c,_0x1fb733(0x195));}else{const _0x826bcd=process[_0x1fb733(0x602)]==_0x1fb733(0x2ea)?_0x1fb733(0x491):process[_0x1fb733(0x602)]==_0x1fb733(0x62b)?_0x1fb733(0x4e9):'xdg-open';require(_0x1fb733(0x741))[_0x1fb733(0x609)](_0x826bcd+'\x20'+_0x580f3c);}},Game_Picture[_0x3a331f(0x499)][_0x3a331f(0x6ab)]=function(){const _0x9bcb69=_0x3a331f;return this[_0x9bcb69(0x622)];},VisuMZ[_0x3a331f(0x3c0)]['Game_Picture_initBasic']=Game_Picture[_0x3a331f(0x499)]['initBasic'],Game_Picture[_0x3a331f(0x499)]['initBasic']=function(){const _0xb02f54=_0x3a331f;VisuMZ['CoreEngine']['Game_Picture_initBasic'][_0xb02f54(0x2eb)](this),this[_0xb02f54(0x622)]={'x':0x0,'y':0x0},this[_0xb02f54(0x56f)]={'x':0x0,'y':0x0};},VisuMZ[_0x3a331f(0x3c0)]['Game_Picture_updateMove']=Game_Picture[_0x3a331f(0x499)][_0x3a331f(0x50b)],Game_Picture[_0x3a331f(0x499)][_0x3a331f(0x50b)]=function(){const _0x4eda08=_0x3a331f;this[_0x4eda08(0x5b4)](),VisuMZ[_0x4eda08(0x3c0)]['Game_Picture_updateMove']['call'](this);},VisuMZ['CoreEngine'][_0x3a331f(0x415)]=Game_Picture[_0x3a331f(0x499)][_0x3a331f(0x634)],Game_Picture[_0x3a331f(0x499)][_0x3a331f(0x634)]=function(_0x467b53,_0x5c5142,_0x5d3862,_0x1cb59f,_0x5f46f9,_0x2bcd68,_0x12054d,_0x5220d0){const _0x3c8cee=_0x3a331f;VisuMZ[_0x3c8cee(0x3c0)]['Game_Picture_show'][_0x3c8cee(0x2eb)](this,_0x467b53,_0x5c5142,_0x5d3862,_0x1cb59f,_0x5f46f9,_0x2bcd68,_0x12054d,_0x5220d0),this[_0x3c8cee(0x369)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5c5142]||{'x':0x0,'y':0x0});},VisuMZ['CoreEngine'][_0x3a331f(0x1f5)]=Game_Picture[_0x3a331f(0x499)][_0x3a331f(0x44e)],Game_Picture['prototype'][_0x3a331f(0x44e)]=function(_0x5b7ee0,_0x258e64,_0x5bb51c,_0x14ac44,_0x1de952,_0x536e78,_0xb99409,_0x3038b6,_0x375c5d){const _0xeaf592=_0x3a331f;VisuMZ['CoreEngine']['Game_Picture_move']['call'](this,_0x5b7ee0,_0x258e64,_0x5bb51c,_0x14ac44,_0x1de952,_0x536e78,_0xb99409,_0x3038b6,_0x375c5d),this[_0xeaf592(0x430)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5b7ee0]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x3a331f(0x5b4)]=function(){const _0x496c8d=_0x3a331f;this[_0x496c8d(0x4e1)]>0x0&&(this[_0x496c8d(0x622)]['x']=this[_0x496c8d(0x25a)](this['_anchor']['x'],this[_0x496c8d(0x56f)]['x']),this[_0x496c8d(0x622)]['y']=this[_0x496c8d(0x25a)](this[_0x496c8d(0x622)]['y'],this[_0x496c8d(0x56f)]['y']));},Game_Picture['prototype'][_0x3a331f(0x369)]=function(_0x328194){const _0x227b17=_0x3a331f;this[_0x227b17(0x622)]=_0x328194,this[_0x227b17(0x56f)]=JsonEx[_0x227b17(0x304)](this[_0x227b17(0x622)]);},Game_Picture[_0x3a331f(0x499)][_0x3a331f(0x430)]=function(_0x592e77){const _0x1ec497=_0x3a331f;this[_0x1ec497(0x56f)]=_0x592e77;},VisuMZ[_0x3a331f(0x3c0)][_0x3a331f(0x315)]=Sprite_Picture['prototype'][_0x3a331f(0x5e1)],Sprite_Picture[_0x3a331f(0x499)][_0x3a331f(0x5e1)]=function(){const _0x575336=_0x3a331f,_0x1c38f3=this[_0x575336(0x349)]();!_0x1c38f3['anchor']()?VisuMZ[_0x575336(0x3c0)][_0x575336(0x315)]['call'](this):(this[_0x575336(0x6ab)]['x']=_0x1c38f3[_0x575336(0x6ab)]()['x'],this[_0x575336(0x6ab)]['y']=_0x1c38f3[_0x575336(0x6ab)]()['y']);},Game_Action[_0x3a331f(0x499)]['setEnemyAction']=function(_0x3a237a){const _0x6a128b=_0x3a331f;if(_0x3a237a){const _0x2c03ff=_0x3a237a[_0x6a128b(0x231)];if(_0x2c03ff===0x1&&this[_0x6a128b(0x375)]()[_0x6a128b(0x39f)]()!==0x1)this[_0x6a128b(0x23d)]();else _0x2c03ff===0x2&&this[_0x6a128b(0x375)]()[_0x6a128b(0x451)]()!==0x2?this[_0x6a128b(0x2e8)]():this[_0x6a128b(0x24b)](_0x2c03ff);}else this[_0x6a128b(0x53f)]();},Game_Actor[_0x3a331f(0x499)]['usableSkills']=function(){const _0x1b3462=_0x3a331f;return this[_0x1b3462(0x6e6)]()[_0x1b3462(0x275)](_0x69800d=>this['canUse'](_0x69800d)&&this['skillTypes']()['includes'](_0x69800d['stypeId']));},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x471)]=function(){const _0x19b0ea=_0x3a331f;this[_0x19b0ea(0x59c)]=new Sprite(),this[_0x19b0ea(0x59c)][_0x19b0ea(0x4d9)]=new Bitmap(0x0,0x0),this[_0x19b0ea(0x59c)]['x']=0x0,this['addChildToBack'](this[_0x19b0ea(0x59c)]);},Window_Base[_0x3a331f(0x499)][_0x3a331f(0x6d4)]=function(){const _0x46eebe=_0x3a331f;if(this[_0x46eebe(0x59c)]){const _0x3d6fa7=this['_dimmerSprite']['bitmap'],_0xcb150=this[_0x46eebe(0x483)],_0x4e6a80=this[_0x46eebe(0x3fc)],_0xff1fa1=this['padding'],_0x415b82=ColorManager[_0x46eebe(0x405)](),_0x2ff7ef=ColorManager[_0x46eebe(0x5dd)]();_0x3d6fa7[_0x46eebe(0x22e)](_0xcb150,_0x4e6a80),_0x3d6fa7[_0x46eebe(0x29b)](0x0,0x0,_0xcb150,_0xff1fa1,_0x2ff7ef,_0x415b82,!![]),_0x3d6fa7[_0x46eebe(0x47d)](0x0,_0xff1fa1,_0xcb150,_0x4e6a80-_0xff1fa1*0x2,_0x415b82),_0x3d6fa7[_0x46eebe(0x29b)](0x0,_0x4e6a80-_0xff1fa1,_0xcb150,_0xff1fa1,_0x415b82,_0x2ff7ef,!![]),this[_0x46eebe(0x59c)]['setFrame'](0x0,0x0,_0xcb150,_0x4e6a80);}},Game_Actor[_0x3a331f(0x499)][_0x3a331f(0x3e8)]=function(){const _0x14440d=_0x3a331f;for(let _0x3ea074=0x0;_0x3ea074<this[_0x14440d(0x464)]();_0x3ea074++){const _0x13ffb5=this['makeActionList']();let _0x14d3cf=Number[_0x14440d(0x35e)];this[_0x14440d(0x67e)](_0x3ea074,_0x13ffb5[0x0]);for(const _0x5bcd6a of _0x13ffb5){const _0x44c401=_0x5bcd6a[_0x14440d(0x286)]();_0x44c401>_0x14d3cf&&(_0x14d3cf=_0x44c401,this[_0x14440d(0x67e)](_0x3ea074,_0x5bcd6a));}}this[_0x14440d(0x2d7)]('waiting');},Window_BattleItem[_0x3a331f(0x499)]['isEnabled']=function(_0x1cbc5c){const _0x2a4000=_0x3a331f;return BattleManager[_0x2a4000(0x313)]()?BattleManager[_0x2a4000(0x313)]()[_0x2a4000(0x6f1)](_0x1cbc5c):Window_ItemList['prototype'][_0x2a4000(0x4f2)]['call'](this,_0x1cbc5c);},VisuMZ['CoreEngine'][_0x3a331f(0x717)]=Scene_Map[_0x3a331f(0x499)][_0x3a331f(0x5d8)],Scene_Map[_0x3a331f(0x499)]['createSpriteset']=function(){const _0x1a33e5=_0x3a331f;VisuMZ[_0x1a33e5(0x3c0)]['Scene_Map_createSpriteset']['call'](this);const _0x5a20e2=this['_spriteset']['_timerSprite'];if(_0x5a20e2)this[_0x1a33e5(0x59f)](_0x5a20e2);},VisuMZ[_0x3a331f(0x3c0)]['Scene_Battle_createSpriteset']=Scene_Battle[_0x3a331f(0x499)][_0x3a331f(0x5d8)],Scene_Battle[_0x3a331f(0x499)]['createSpriteset']=function(){const _0x414283=_0x3a331f;VisuMZ['CoreEngine'][_0x414283(0x3ab)][_0x414283(0x2eb)](this);const _0x52c628=this['_spriteset']['_timerSprite'];if(_0x52c628)this['addChild'](_0x52c628);};