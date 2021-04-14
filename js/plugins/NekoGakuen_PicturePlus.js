//=============================================================================
// NekoGakuen_PicturePlus.js
// Version: 1.9.2
//=============================================================================
/*:zh
 * @target MZ
 * @plugindesc 圖片顯示強化
 * @author Mirai
 * @version 1.9.2
 * @url https://nekogakuen.blogspot.com
 * @help
 * 
 * ─ 插件簡介 ─
 * 在RPG Maker MZ中將原本顯示圖片的事件功能強化。
 * 
 * 
 * ─ 更新履歷 ─
 * V1.9.2 修正與遮罩圖片和圖層階級有關的程式碼部分
 * V1.9.1 修正程式碼上的幾個錯誤
 * V1.9 更新插件使用條款
 * V1.8 修正圖片遮罩功能的層級判斷問題
 * V1.7 新增圖片遮罩功能以及修正圖片層級判斷問題
 * V1.6 新增移動圖片的放慢類型以及與顯示圖片相同功能
 * V1.5 新增圖片層級功能的批次圖片編號功能
 * V1.4 新增圖片功能的指定變數為變數ID
 * V1.3.1 修正插件命令某個無效指令以及插件的多個說明錯誤
 * V1.3 修正顯示圖片跟移動圖片時的錯誤
 * V1.2 新增顯示圖片的時候可以指定圖片的優先顯示層級
 * V1.1 新增顯示圖片的時候可以指定圖片角度及固定方式
 * V1.0 初次版本的插件發佈
 * 
 * 
 * ─ 使用說明 ─
 * 1.在RPG Maker MZ的「插件管理器」之中載入本插件，
 *   並在本插件的「參數」區塊設定即可。
 * 2.在事件頁中高級區塊選擇「插件命令...」，
 *   並設定選擇要執行的插件命令及參數即可。
 * 
 * 
 * ─ 插件命令 ─
 * 【顯示圖片...】
 * --說明：在遊戲中顯示指定圖片。
 * 
 * 【移動圖片...】
 * --說明：在遊戲中更改圖片屬性。
 * 
 * 【擦除圖片...】
 * --說明：在遊戲中刪除指定圖片。
 * 
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
 * -授權方式：【√ 免費 (註1)】
 * -商業營利：【√ 允許】
 * -改作許可：【√ 允許】
 * -二次配佈：【× 禁止】
 * -成人用途：【√ 允許】
 * -使用範圍：【※ 僅RPG Maker系列】
 * 
 * 【！】註1：適用範圍僅限有支援包含「中文」在內的遊戲作品。
 * --------------------
 * 
 * @param PictureId_Max
 * @text 圖片最大值
 * @desc 指定圖片編號的最大上限值。
 * @type number
 * @min 1
 * @default 100
 * 
 * @param PicLayer_Boolean
 * @text 開啟圖片層級功能
 * @desc 是否開啟圖片的優先層級功能。
 * @type boolean
 * @default false
 * @on 開啟
 * @off 關閉
 * 
 * @param Picture_Layer
 * @text 【單一】圖片層級選項...
 * @desc 指定單一圖片編號的優先層級，如有用到圖層遮罩功能，
 * 被指定的兩張圖片必須為同個層級，且層級範圍在1~4層級內。
 * @type struct<Layer>[]
 * @default []
 * 
 * @param Picture_Layer_bat
 * @text 【批次】圖片層級選項...
 * @desc 指定多個圖片編號的優先層級，如有用到圖層遮罩功能，
 * 被指定的兩張圖片必須為同個層級，且層級範圍在1~4層級內。
 * @type struct<Layerbat>[]
 * @default []
 * 
 * @param Picture_Mask
 * @text 圖片遮罩選項...
 * @desc 指定兩張圖片編號為遮罩圖層。
 * @type struct<Mask>[]
 * @default []
 * 
 * 
 * @command PicturePlus_Show
 * @text 顯示圖片...
 * @desc 在遊戲中顯示指定圖片。
 * 
 * @arg PictureId_Class
 * @text ◆ 編號
 * 
 * @arg Id_Type
 * @text 編號類型
 * @desc 指定圖片的編號類型。
 * @type select
 * @parent PictureId_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * 
 * @arg Id_Number
 * @text 直接指定(Number)
 * @desc 指定數字作為圖片編號。
 * @type number
 * @parent Id_Type
 * @min 1
 * @default 1
 * 
 * @arg Id_Variable
 * @text 使用變數(Variable)
 * @desc 指定變數ID作為圖片編號。
 * @type variable
 * @parent Id_Type
 * @default 0
 * 
 * @arg Id_VarToID
 * @text 指定變數為變數ID(VarToID)
 * @desc 指定變數來設定變數ID作為圖片編號。
 * @type variable
 * @parent Id_Type
 * @default 0
 * 
 * @arg PictureName_Class
 * @text ◆ 圖片
 * 
 * @arg Images_File
 * @text 指定圖片檔案
 * @desc 指定要顯示的圖片檔案，圖片檔案放在「img/pictures」資料夾內。
 * @type file
 * @parent PictureName_Class
 * @dir img/pictures/
 * @require 1
 * 
 * @arg Images_Extend
 * @text 延伸功能...
 * @desc 使用圖片檔案的延伸功能。
 * @type struct<ImagesExtend>
 * @parent PictureName_Class
 * @default {"ImgExtend_Boolean":"false","ImgExtend_Replace":"1","ImgExtend_Variable":"0"}
 * 
 * @arg PictureOrigin_Class
 * @text ◆ 位置
 * 
 * @arg Origin_Type
 * @text 原點位置
 * @desc 指定圖片的原點位置。
 * @type select
 * @parent PictureOrigin_Class
 * @default UpperLeft
 * @option 左上
 * @value UpperLeft
 * @option 中心
 * @value Center
 * 
 * @arg Coordinate_Type
 * @text 座標類型
 * @desc 指定圖片的座標類型。
 * @type select
 * @parent PictureOrigin_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * 
 * @arg Coordinate_TypeA
 * @text 直接指定(Number)
 * @parent Coordinate_Type
 * 
 * @arg Coordinate_NumberX
 * @text X：
 * @desc 指定數字作為圖片的X座標。
 * @type number
 * @parent Coordinate_TypeA
 * @min -999999999
 * @max 999999999
 * @default 0
 * 
 * @arg Coordinate_NumberY
 * @text Y：
 * @desc 指定數字作為圖片的Y座標。
 * @type number
 * @parent Coordinate_TypeA
 * @min -999999999
 * @max 999999999
 * @default 0
 * 
 * @arg Coordinate_TypeB
 * @text 使用變數(Variable)
 * @parent Coordinate_Type
 * 
 * @arg Coordinate_VariableX
 * @text X：
 * @desc 使用變數ID作為指定圖片的X座標。
 * @type variable
 * @parent Coordinate_TypeB
 * @default 0
 * 
 * @arg Coordinate_VariableY
 * @text Y：
 * @desc 使用變數ID作為指定圖片的Y座標。
 * @type variable
 * @parent Coordinate_TypeB
 * @default 0
 * 
 * @arg Coordinate_TypeC
 * @text 指定變數為變數ID(VarToID)
 * @parent Coordinate_Type
 * 
 * @arg Coordinate_VarToIDX
 * @text X：
 * @desc 指定變數來設定變數ID作為指定圖片的X座標。
 * @type variable
 * @parent Coordinate_TypeC
 * @default 0
 * 
 * @arg Coordinate_VarToIDY
 * @text Y：
 * @desc 指定變數來設定變數ID作為指定圖片的Y座標。
 * @type variable
 * @parent Coordinate_TypeC
 * @default 0
 * 
 * 
 * @arg PictureScale_Class
 * @text ◆ 縮放
 * 
 * @arg Scale_Type
 * @text 縮放類型
 * @desc 指定圖片的縮放比例。
 * @type select
 * @parent PictureScale_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * 
 * @arg Scale_TypeA
 * @text 直接指定(Number)
 * @parent Scale_Type
 * 
 * @arg Scale_NumberW
 * @text 寬度：
 * @desc 指定圖片的橫向比例，負數以下為左右反轉圖片。
 * @type number
 * @parent Scale_TypeA
 * @min -999999999
 * @max 999999999
 * @default 100
 * 
 * @arg Scale_NumberH
 * @text 高度：
 * @desc 指定圖片的縱向比例，負數以下為上下反轉圖片。
 * @type number
 * @parent Scale_TypeA
 * @min -999999999
 * @max 999999999
 * @default 100
 * 
 * @arg Scale_TypeB
 * @text 使用變數(Variable)
 * @parent Scale_Type
 * 
 * @arg Scale_VariableW
 * @text 寬度：
 * @desc 使用變數ID來指定圖片的橫向比例，負數以下為左右反轉圖片。
 * @type variable
 * @parent Scale_TypeB
 * @default 0
 * 
 * @arg Scale_VariableH
 * @text 高度：
 * @desc 使用變數ID來指定圖片的縱向比例，負數以下為上下反轉圖片。
 * @type variable
 * @parent Scale_TypeB
 * @default 0
 * 
 * @arg Scale_TypeC
 * @text 指定變數為變數ID(VarToID)
 * @parent Scale_Type
 * 
 * @arg Scale_VarToIDW
 * @text 寬度：
 * @desc 指定變數來設定變數ID作為指定圖片的橫向比例。
 * @type variable
 * @parent Scale_TypeC
 * @default 0
 * 
 * @arg Scale_VarToIDH
 * @text 高度：
 * @desc 指定變數來設定變數ID作為指定圖片的縱向比例。
 * @type variable
 * @parent Scale_TypeC
 * @default 0
 * 
 * @arg PictureOpacity_Class
 * @text ◆ 不透明度
 * 
 * @arg Opacity_Type
 * @text 不透明度類型
 * @desc 指定圖片的不透明度類型。
 * @type select
 * @parent PictureOpacity_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * 
 * @arg Opacity_Number
 * @text 直接指定(Number)
 * @desc 指定數字為圖片的不透明度，數值設定介於0~255之間，數字越小越透明。
 * @type number
 * @parent Opacity_Type
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg Opacity_Variable
 * @text 使用變數(Variable)
 * @desc 使用變數ID來指定圖片的不透明度，數值設定介於0~255之間，數字越小越透明。
 * @type variable
 * @parent Opacity_Type
 * @default 0
 * 
 * @arg Opacity_VarToID
 * @text 指定變數為變數ID(VarToID)
 * @desc 指定變數來設定變數ID作為指定圖片的不透明度。
 * @type variable
 * @parent Opacity_Type
 * @default 0
 * 
 * @arg PictureOther_Class
 * @text ◆ 其他
 * 
 * @arg Blend_Mode
 * @text 合成方式
 * @desc 指定圖片顯示的合成方式。
 * @type select
 * @parent PictureOther_Class
 * @default Normal
 * @option 標準
 * @value Normal
 * @option 添加
 * @value Add
 * @option 乘
 * @value Multiply
 * @option 畫面
 * @value Screen
 * 
 * @arg Angle_Type
 * @text 旋轉類型
 * @desc 指定圖片的旋轉類型。
 * @type select
 * @parent PictureOther_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * 
 * @arg Angle_Number
 * @text 直接指定(Number)
 * @desc 指定數字作為圖片的旋轉角度。數值設定介於-360~360之間，負數以下為逆時針旋轉。
 * @type number
 * @parent Angle_Type
 * @min -360
 * @max 360
 * @default 0
 * 
 * @arg Angle_Variable
 * @text 使用變數(Variable)
 * @desc 指定變數ID作為圖片的旋轉角度。數值設定介於-360~360之間，負數以下為逆時針旋轉。
 * @type variable
 * @parent Angle_Type
 * @default 0
 * 
 * @arg Angle_VarToID
 * @text 指定變數為變數ID(VarToID)
 * @desc 指定變數來設定變數ID作為圖片的旋轉角度。數值設定介於-360~360之間，負數以下為逆時針旋轉。
 * @type variable
 * @parent Angle_Type
 * @default 0
 * 
 * @arg Fix_Type
 * @text 固定類型
 * @desc 指定圖片的固定方式。
 * @type select
 * @parent PictureOther_Class
 * @default Screen
 * @option 畫面
 * @value Screen
 * @option 地圖
 * @value Map
 * 
 * 
 * 
 * @command PicturePlus_Move
 * @text 移動圖片...
 * @desc 在遊戲中更改圖片屬性。
 * 
 * @arg PictureId_Class
 * @text ◆ 編號
 * 
 * @arg Id_Type
 * @text 編號類型
 * @desc 指定圖片的編號類型。
 * @type select
 * @parent PictureId_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * @option 與顯示圖片相同
 * @value SameAs
 * 
 * @arg Id_Number
 * @text 直接指定(Number)
 * @desc 指定數字作為圖片編號。
 * @type number
 * @parent Id_Type
 * @min 1
 * @default 1
 * 
 * @arg Id_Variable
 * @text 使用變數(Variable)
 * @desc 指定變數ID作為圖片編號。
 * @type variable
 * @parent Id_Type
 * @default 0
 * 
 * @arg Id_VarToID
 * @text 指定變數為變數ID(VarToID)
 * @desc  指定變數來設定變數ID作為圖片編號。
 * @type variable
 * @parent Id_Type
 * @default 0
 * 
 * @arg PictureOrigin_Class
 * @text ◆ 位置
 * 
 * @arg Origin_Type
 * @text 原點位置
 * @desc 指定圖片的原點位置。
 * @type select
 * @parent PictureOrigin_Class
 * @default UpperLeft
 * @option 左上
 * @value UpperLeft
 * @option 中心
 * @value Center
 * 
 * @arg Coordinate_Type
 * @text 座標類型
 * @desc 指定圖片的座標類型。
 * @type select
 * @parent PictureOrigin_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * @option 與顯示圖片相同
 * @value SameAs
 * 
 * @arg Coordinate_TypeA
 * @text 直接指定(Number)
 * @parent Coordinate_Type
 * 
 * @arg Coordinate_NumberX
 * @text X：
 * @desc 指定圖片的X座標。
 * @type number
 * @parent Coordinate_TypeA
 * @min -999999999
 * @max 999999999
 * @default 0
 * 
 * @arg Coordinate_NumberY
 * @text Y：
 * @desc 指定圖片的Y座標。
 * @type number
 * @parent Coordinate_TypeA
 * @min -999999999
 * @max 999999999
 * @default 0
 * 
 * @arg Coordinate_TypeB
 * @text 使用變數(Variable)
 * @parent Coordinate_Type
 * 
 * @arg Coordinate_VariableX
 * @text X：
 * @desc 使用變數ID作為指定圖片的X座標。
 * @type variable
 * @parent Coordinate_TypeB
 * @default 0
 * 
 * @arg Coordinate_VariableY
 * @text Y：
 * @desc 使用變數ID作為指定圖片的Y座標。
 * @type variable
 * @parent Coordinate_TypeB
 * @default 0
 * 
 * @arg Coordinate_TypeC
 * @text 指定變數為變數ID(VarToID)
 * @parent Coordinate_Type
 * 
 * @arg Coordinate_VarToIDX
 * @text X：
 * @desc 指定變數來設定變數ID作為指定圖片的X座標。
 * @type variable
 * @parent Coordinate_TypeC
 * @default 0
 * 
 * @arg Coordinate_VarToIDY
 * @text Y：
 * @desc 指定變數來設定變數ID作為指定圖片的Y座標。
 * @type variable
 * @parent Coordinate_TypeC
 * @default 0
 * 
 * @arg PictureScale_Class
 * @text ◆ 縮放
 * 
 * @arg Scale_Type
 * @text 縮放類型
 * @desc 指定圖片的縮放比例。
 * @type select
 * @parent PictureScale_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID
 * @option 與顯示圖片相同
 * @value SameAs
 * 
 * @arg Scale_TypeA
 * @text 直接指定(Number)
 * @parent Scale_Type
 * 
 * @arg Scale_NumberW
 * @text 寬度：
 * @desc 指定圖片的橫向比例，負數以下為左右反轉圖片。
 * @type number
 * @parent Scale_TypeA
 * @min -999999999
 * @max 999999999
 * @default 100
 * 
 * @arg Scale_NumberH
 * @text 高度：
 * @desc 指定圖片的縱向比例，負數以下為上下反轉圖片。
 * @type number
 * @parent Scale_TypeA
 * @min -999999999
 * @max 999999999
 * @default 100
 * 
 * @arg Scale_TypeB
 * @text 使用變數(Variable)
 * @parent Scale_Type
 * 
 * @arg Scale_VariableW
 * @text 寬度：
 * @desc 使用變數ID作為指定圖片的橫向比例，負數以下為左右反轉圖片。
 * @type variable
 * @parent Scale_TypeB
 * @default 0
 * 
 * @arg Scale_VariableH
 * @text 高度：
 * @desc 使用變數ID作為指定圖片的縱向比例，負數以下為上下反轉圖片。
 * @type variable
 * @parent Scale_TypeB
 * @default 0
 * 
 * @arg Scale_TypeC
 * @text 指定變數為變數ID(VarToID)
 * @parent Scale_Type
 * 
 * @arg Scale_VarToIDW
 * @text 寬度：
 * @desc 指定變數來設定變數ID作為指定圖片的橫向比例。
 * @type variable
 * @parent Scale_TypeC
 * @default 0
 * 
 * @arg Scale_VarToIDH
 * @text 高度：
 * @desc 指定變數來設定變數ID作為指定圖片的縱向比例。
 * @type variable
 * @parent Scale_TypeC
 * @default 0
 * 
 * @arg PictureOpacity_Class
 * @text ◆ 不透明度
 * 
 * @arg Opacity_Type
 * @text 不透明度類型
 * @desc 指定圖片的不透明度類型。
 * @type select
 * @parent PictureOpacity_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * @option 與顯示圖片相同
 * @value SameAs
 * 
 * @arg Opacity_Number
 * @text 直接指定(Number)
 * @desc 指定數字為圖片的不透明度，數值設定介於0~255之間，數字越小越透明。
 * @type number
 * @parent Opacity_Type
 * @min 0
 * @max 255
 * @default 255
 * 
 * @arg Opacity_Variable
 * @text 使用變數(Variable)
 * @desc 使用變數ID作為指定圖片的不透明度，數值設定介於0~255之間，數字越小越透明。
 * @type variable
 * @parent Opacity_Type
 * @default 0
 * 
 * @arg Opacity_VarToID
 * @text 指定變數為變數ID(VarToID)
 * @desc 指定變數來設定變數ID作為指定圖片的不透明度。
 * @type variable
 * @parent Opacity_Type
 * @default 0
 * 
 * @arg PictureOther_Class
 * @text ◆ 其他
 * 
 * @arg Blend_Mode
 * @text 合成方式
 * @desc 指定圖片顯示的合成方式。
 * @type select
 * @parent PictureOther_Class
 * @default Normal
 * @option 標準
 * @value Normal
 * @option 添加
 * @value Add
 * @option 乘
 * @value Multiply
 * @option 畫面
 * @value Screen
 * 
 * @arg Angle_Type
 * @text 旋轉類型
 * @desc 指定圖片的旋轉類型。
 * @type select
 * @parent PictureOther_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * @option 與顯示圖片相同
 * @value SameAs
 * 
 * @arg Angle_Number
 * @text 直接指定(Number)
 * @desc 指定數字作為圖片的旋轉角度。數值設定介於-360~360之間，負數以下為逆時針旋轉。
 * @type number
 * @parent Angle_Type
 * @min -360
 * @max 360
 * @default 0
 * 
 * @arg Angle_Variable
 * @text 使用變數(Variable)
 * @desc 指定變數ID作為圖片的旋轉角度。數值設定介於-360~360之間，負數以下為逆時針旋轉。
 * @type variable
 * @parent Angle_Type
 * @default 0
 * 
 * @arg Angle_VarToID
 * @text 指定變數為變數ID(VarToID)
 * @desc 指定變數來設定變數ID作為圖片的旋轉角度。數值設定介於-360~360之間，負數以下為逆時針旋轉。
 * @type variable
 * @parent Angle_Type
 * @default 0
 * 
 * @arg Wait_Type
 * @text 等待類型
 * @desc 指定圖片的等待類型。
 * @type select
 * @parent PictureOther_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * 
 * @arg Wait_Number
 * @text 直接指定(Number)
 * @desc 指定數字作為圖片的持續時間。指定圖片的持續時間(1/60秒)。
 * @type number
 * @parent Wait_Type
 * @min 1
 * @default 60
 * 
 * @arg Wait_Variable
 * @text 使用變數(Variable)
 * @desc 指定變數ID作為圖片的持續時間。指定圖片的持續時間(1/60秒)。
 * @type variable
 * @parent Wait_Type
 * @default 0
 * 
 * @arg Wait_VarToID
 * @text 指定變數為變數ID(VarToID)
 * @desc 指定變數來設定變數ID作為圖片的持續時間。指定圖片的持續時間(1/60秒)。
 * @type variable
 * @parent Wait_Type
 * @default 0
 * 
 * @arg Wait_Boolean
 * @text 等待完成
 * @desc 等待持續時間是否完成。
 * @type boolean
 * @parent PictureOther_Class
 * @default true
 * @on 是
 * @off 否
 * 
 * @arg Easing_Type
 * @text 放慢類型
 * @desc 指定圖片的放慢速度類型。
 * @type select
 * @parent PictureOther_Class
 * @default FixedSpeed
 * @option 固定速度
 * @value FixedSpeed
 * @option 緩慢開始
 * @value SlowStart
 * @option 緩慢結束
 * @value SlowEnd
 * @option 緩慢開始及結束
 * @value SlowStartAndEnd
 * 
 * 
 * @command PicturePlus_Erase
 * @text 擦除圖片...
 * @desc 在遊戲中刪除指定圖片。
 * 
 * @arg PictureId_Class
 * @text ◆ 編號
 * 
 * @arg Id_Type
 * @text 編號類型
 * @desc 指定圖片的編號類型。
 * @type select
 * @parent PictureId_Class
 * @default Number
 * @option 直接指定
 * @value Number
 * @option 使用變數
 * @value Variable
 * @option 指定變數為變數ID
 * @value VarToID 
 * @option 指定範圍
 * @value Range
 * 
 * @arg Id_Number
 * @text 直接指定(Number)
 * @desc 指定數字作為圖片編號。
 * @type number
 * @parent Id_Type
 * @min 1
 * @default 1
 * 
 * @arg Id_Variable
 * @text 使用變數(Variable)
 * @desc 指定變數ID作為圖片編號。
 * @type variable
 * @parent Id_Type
 * @default 0
 * 
 * @arg Id_VarToID
 * @text 指定變數為變數ID(VarToID)
 * @desc 指定變數為「使用變數(Variable)」的變數ID作為圖片編號。
 * @type variable
 * @parent Id_Type
 * @default 0
 * 
 * @arg Id_Range
 * @text 指定範圍(Range)
 * @desc 指定圖片編號的範圍。
 * @type struct<EraseRange>
 * @parent Id_Type
 * 
 * 
 */
/*~struct~ImagesExtend:
 * 
 * @param ImgExtend_Boolean
 * @text 開啟圖片延伸功能
 * @desc 是否開啟圖片檔名的流水號功能。
 * @type boolean
 * @default false
 * @on 開啟
 * @off 關閉
 * 
 * @param ImgExtend_Replace
 * @text 指定末端字元
 * @desc 指定圖片檔名的末端字元數為流水號。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param ImgExtend_Variable
 * @text 指定末端變數
 * @desc 指定變數ID為圖片檔名的流水號。
 * @type variable
 * @default 0
 * 
 * 
 */
/*~struct~EraseRange:
 * 
 * @param EraseRange_Start
 * @text 起始編號
 * @desc 指定起始的圖片編號。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param EraseRange_End
 * @text 結尾編號
 * @desc 指定結尾的圖片編號。
 * @type number
 * @min 1
 * @default 100
 * 
 */
/*~struct~Layer:
 * 
 * @param Layer_Id
 * @text 圖片編號
 * @desc 指定圖片編號。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param Layer_Type
 * @text 層級類型
 * @desc 指定圖片的層級類型，如有用到圖層遮罩功能，
 * 被指定的兩張圖片必須要在範圍1~4層級以內。
 * @type select
 * @default 3
 * @option 0:遠景之上/地圖之下
 * @value 0
 * @option 1:地圖之上/角色&動畫之下
 * @value 1
 * @option 2:角色&動畫之上/天氣之下
 * @value 2
 * @option 3:天氣之上/計時器之下
 * @value 3
 * @option 4:計時器之上/對話框之下
 * @value 4
 * @option 5:對話框之上(最高優先度)
 * @value 5
 * 
 */
/*~struct~Layerbat:
 * 
 * @param Layer_StartId
 * @text 起始編號
 * @desc 指定起始的圖片編號。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param Layer_EndId
 * @text 結尾編號
 * @desc 指定結尾的圖片編號。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param Layer_bat_Type
 * @text 層級類型
 * @desc 指定圖片的層級類型，如有用到圖層遮罩功能，
 * 被指定的兩張圖片必須要在範圍1~4層級以內。
 * @type select
 * @default 3
 * @option 0:遠景之上/地圖之下
 * @value 0
 * @option 1:地圖之上/角色&動畫之下
 * @value 1
 * @option 2:角色&動畫之上/天氣之下
 * @value 2
 * @option 3:天氣之上/計時器之下
 * @value 3
 * @option 4:計時器之上/對話框之下
 * @value 4
 * @option 5:對話框之上(最高優先度)
 * @value 5
 * 
 */
/*~struct~Mask:
 * 
 * @param Face_Id
 * @text 表面圖片編號
 * @desc 指定圖片編號為表面圖層。
 * @type number
 * @min 1
 * @default 1
 * 
 * @param Mask_Id
 * @text 遮罩圖片編號
 * @desc 指定圖片編號為遮罩圖層。
 * @type number
 * @min 1
 * @default 1
 * 
 */
//=============================================================================

(() => {
    let NekoGakuen = {};
    const pluginName = "NekoGakuen_PicturePlus";
    NekoGakuen.PicturePlus = {};
    NekoGakuen.PicturePlus.Parameters = PluginManager.parameters(pluginName);
    NekoGakuen.PicturePlus.PictureId_Max = Number(NekoGakuen.PicturePlus.Parameters['PictureId_Max'] || 100);
    NekoGakuen.PicturePlus.PicLayer_Boolean = (NekoGakuen.PicturePlus.Parameters['PicLayer_Boolean'] || 'false');
    const args_Picture_Layer = JSON.parse(NekoGakuen.PicturePlus.Parameters['Picture_Layer']);
    const args_LayerId = Array();
    const args_LayerType = Array();
    let args_LayerParse;
    for (let i = 0; i < args_Picture_Layer.length; i++) {
        args_LayerParse = JSON.parse(args_Picture_Layer[i]);
        args_LayerId.push(Number(args_LayerParse["Layer_Id"]));
        args_LayerType.push(Number(args_LayerParse["Layer_Type"]));
    }

    const args_Picture_Layerbat = JSON.parse(NekoGakuen.PicturePlus.Parameters['Picture_Layer_bat']);
    const args_Layerbat_Type = Array();
    let args_LayerbatParse;
    for (let i = 0; i < args_Picture_Layerbat.length; i++) {
        args_LayerbatParse = JSON.parse(args_Picture_Layerbat[i]);
        const args_LayerStartId = Number(args_LayerbatParse["Layer_StartId"])
        const args_LayerEndId = Number(args_LayerbatParse["Layer_EndId"])
        for (let d = args_LayerStartId; d < args_LayerEndId + 1; d++) {
            args_LayerId.push(d);
            args_Layerbat_Type.push(Number(args_LayerbatParse["Layer_bat_Type"]));
        }
    }

    const args_Picture_Mask = JSON.parse(NekoGakuen.PicturePlus.Parameters['Picture_Mask']);
    const args_FaceId = Array();
    const args_MaskId = Array();
    let args_MaskParse;
    for (let i = 0; i < args_Picture_Mask.length; i++) {
        args_MaskParse = JSON.parse(args_Picture_Mask[i]);
        args_FaceId.push(Number(args_MaskParse["Face_Id"]));
        args_MaskId.push(Number(args_MaskParse["Mask_Id"]));
    }

    PluginManager.registerCommand(pluginName, "PicturePlus_Show", args => {
        NekoGakuen.PicturePlus_Show = {
            Id_Type: String(args.Id_Type),
            Id_Number: Number(args.Id_Number),
            Id_Variable: Number(args.Id_Variable),
            Id_VarToID: Number(args.Id_VarToID),
            Images_File: String(args.Images_File),
            Images_Extend: JSON.parse(args.Images_Extend),
            Origin_Type: String(args.Origin_Type),
            Coordinate_Type: String(args.Coordinate_Type),
            Coordinate_NumberX: Number(args.Coordinate_NumberX),
            Coordinate_NumberY: Number(args.Coordinate_NumberY),
            Coordinate_VariableX: Number(args.Coordinate_VariableX),
            Coordinate_VariableY: Number(args.Coordinate_VariableY),
            Coordinate_VarToIDX: Number(args.Coordinate_VarToIDX),
            Coordinate_VarToIDY: Number(args.Coordinate_VarToIDY),
            Scale_Type: String(args.Scale_Type),
            Scale_NumberW: Number(args.Scale_NumberW),
            Scale_NumberH: Number(args.Scale_NumberH),
            Scale_VariableW: Number(args.Scale_VariableW),
            Scale_VariableH: Number(args.Scale_VariableH),
            Scale_VarToIDW: Number(args.Scale_VarToIDW),
            Scale_VarToIDH: Number(args.Scale_VarToIDH),
            Opacity_Type: String(args.Opacity_Type),
            Opacity_Number: Number(args.Opacity_Number),
            Opacity_Variable: Number(args.Opacity_Variable),
            Opacity_VarToID: Number(args.Opacity_VarToID),
            Blend_Mode: String(args.Blend_Mode),
            Angle_Type: String(args.Angle_Type),
            Angle_Number: Number(args.Angle_Number),
            Angle_Variable: Number(args.Angle_Variable),
            Angle_VarToID: Number(args.Angle_VarToID),
            Fix_Type: String(args.Fix_Type)
        }

        const PicShow_ImgExtend_Boolean = NekoGakuen.PicturePlus_Show.Images_Extend.ImgExtend_Boolean;
        const PicShow_ImgExtend_Replace = Number(NekoGakuen.PicturePlus_Show.Images_Extend.ImgExtend_Replace);
        const PicShow_ImgExtend_Variable = Number(NekoGakuen.PicturePlus_Show.Images_Extend.ImgExtend_Variable);
        let PicShow_ld;
        if (NekoGakuen.PicturePlus_Show.Id_Type == "Number") {
            PicShow_ld = NekoGakuen.PicturePlus_Show.Id_Number;
        } else if (NekoGakuen.PicturePlus_Show.Id_Type == "Variable") {
            PicShow_ld = $gameVariables.value(NekoGakuen.PicturePlus_Show.Id_Variable);
        } else {
            PicShow_ld = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Id_VarToID));
        }

        let PicShow_Name;
        if (PicShow_ImgExtend_Boolean == 'true') {
            PicShow_Name = NekoGakuen.PicturePlus_Show.Images_File.substring(0, NekoGakuen.PicturePlus_Show.Images_File.length - PicShow_ImgExtend_Replace) + $gameVariables.value(PicShow_ImgExtend_Variable);
        } else {
            PicShow_Name = NekoGakuen.PicturePlus_Show.Images_File;
        }

        const PicShow_Origin = NekoGakuen.PicturePlus_Show.Origin_Type == "UpperLeft" ? 0 : 1;
        let PicShow_CoordinateX = 0, PicShow_CoordinateY = 0;
        if (NekoGakuen.PicturePlus_Show.Coordinate_Type == "Number") {
            PicShow_CoordinateX = NekoGakuen.PicturePlus_Show.Coordinate_NumberX;
            PicShow_CoordinateY = NekoGakuen.PicturePlus_Show.Coordinate_NumberY;
        } else if (NekoGakuen.PicturePlus_Show.Coordinate_Type == "Variable") {
            PicShow_CoordinateX = $gameVariables.value(NekoGakuen.PicturePlus_Show.Coordinate_VariableX);
            PicShow_CoordinateY = $gameVariables.value(NekoGakuen.PicturePlus_Show.Coordinate_VariableY);
        } else {
            PicShow_CoordinateX = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Coordinate_VarToIDX));
            PicShow_CoordinateY = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Coordinate_VarToIDY));
        }

        let PicShow_ScaleX = 100, PicShow_ScaleY = 100;
        if (NekoGakuen.PicturePlus_Show.Scale_Type == "Number") {
            PicShow_ScaleX = NekoGakuen.PicturePlus_Show.Scale_NumberW;
            PicShow_ScaleY = NekoGakuen.PicturePlus_Show.Scale_NumberH;
        } else if (NekoGakuen.PicturePlus_Show.Scale_Type == "Variable") {
            PicShow_ScaleX = $gameVariables.value(NekoGakuen.PicturePlus_Show.Scale_VariableW);
            PicShow_ScaleY = $gameVariables.value(NekoGakuen.PicturePlus_Show.Scale_VariableH);
        } else {
            PicShow_ScaleX = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Scale_VarToIDW));
            PicShow_ScaleY = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Scale_VarToIDH));
        }

        let PicShow_Opacity = 255;
        if (NekoGakuen.PicturePlus_Show.Opacity_Type == "Number") {
            PicShow_Opacity = NekoGakuen.PicturePlus_Show.Opacity_Number;
        } else if (NekoGakuen.PicturePlus_Show.Opacity_Type == "Variable") {
            PicShow_Opacity = $gameVariables.value(NekoGakuen.PicturePlus_Show.Opacity_Variable);
        } else {
            PicShow_Opacity = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Opacity_VarToID));
        }

        let PicShow_Blend_Mode = 0;
        if (NekoGakuen.PicturePlus_Show.Blend_Mode == "Normal") {
            PicShow_Blend_Mode = 0;
        } else if (NekoGakuen.PicturePlus_Show.Blend_Mode == "Add") {
            PicShow_Blend_Mode = 1;
        } else if (NekoGakuen.PicturePlus_Show.Blend_Mode == "Multiply") {
            PicShow_Blend_Mode = 2;
        } else if (NekoGakuen.PicturePlus_Show.Blend_Mode == "Screen") {
            PicShow_Blend_Mode = 3;
        }

        let PicShow_Angle;
        if (NekoGakuen.PicturePlus_Show.Angle_Type == "Number") {
            PicShow_Angle = NekoGakuen.PicturePlus_Show.Angle_Number;
        } else if (NekoGakuen.PicturePlus_Show.Angle_Type == "Variable") {
            PicShow_Angle = $gameVariables.value(NekoGakuen.PicturePlus_Show.Angle_Variable);
        } else {
            PicShow_Angle = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Angle_VarToID));
        }

        const PicShow_Fix_Type = NekoGakuen.PicturePlus_Show.Fix_Type;
        $gameScreen.showPicturePlus(
            PicShow_ld,
            PicShow_Name,
            PicShow_Origin,
            PicShow_CoordinateX,
            PicShow_CoordinateY,
            PicShow_ScaleX,
            PicShow_ScaleY,
            PicShow_Opacity,
            PicShow_Blend_Mode,
            PicShow_Angle,
            PicShow_Fix_Type
        );
    });


    PluginManager.registerCommand(pluginName, "PicturePlus_Move", args => {
        NekoGakuen.PicturePlus_Move = {
            Id_Type: String(args.Id_Type),
            Id_Number: Number(args.Id_Number),
            Id_Variable: Number(args.Id_Variable),
            Id_VarToID: Number(args.Id_VarToID),
            Origin_Type: String(args.Origin_Type),
            Coordinate_Type: String(args.Coordinate_Type),
            Coordinate_NumberX: Number(args.Coordinate_NumberX),
            Coordinate_NumberY: Number(args.Coordinate_NumberY),
            Coordinate_VariableX: Number(args.Coordinate_VariableX),
            Coordinate_VariableY: Number(args.Coordinate_VariableY),
            Coordinate_VarToIDX: Number(args.Coordinate_VarToIDX),
            Coordinate_VarToIDY: Number(args.Coordinate_VarToIDY),
            Scale_Type: String(args.Scale_Type),
            Scale_NumberW: Number(args.Scale_NumberW),
            Scale_NumberH: Number(args.Scale_NumberH),
            Scale_VariableW: Number(args.Scale_VariableW),
            Scale_VariableH: Number(args.Scale_VariableH),
            Scale_VarToIDW: Number(args.Scale_VarToIDW),
            Scale_VarToIDH: Number(args.Scale_VarToIDH),
            Opacity_Type: String(args.Opacity_Type),
            Opacity_Number: Number(args.Opacity_Number),
            Opacity_Variable: Number(args.Opacity_Variable),
            Opacity_VarToID: Number(args.Opacity_VarToID),
            Blend_Mode: String(args.Blend_Mode),
            Angle_Type: String(args.Angle_Type),
            Angle_Number: Number(args.Angle_Number),
            Angle_Variable: Number(args.Angle_Variable),
            Angle_VarToID: Number(args.Angle_VarToID),
            Wait_Type: String(args.Wait_Type),
            Wait_Number: Number(args.Wait_Number),
            Wait_Variable: Number(args.Wait_Variable),
            Wait_VarToID: Number(args.Wait_VarToID),
            Wait_Boolean: args.Wait_Boolean,
            Easing_Type: args.Easing_Type
        }

        let PicMove_ld;
        if (NekoGakuen.PicturePlus_Move.Id_Type == "Number") {
            PicMove_ld = NekoGakuen.PicturePlus_Move.Id_Number;
        } else if (NekoGakuen.PicturePlus_Move.Id_Type == "Variable") {
            PicMove_ld = $gameVariables.value(NekoGakuen.PicturePlus_Move.Id_Variable);
        } else if (NekoGakuen.PicturePlus_Move.Id_Type == "VarToID") {
            PicMove_ld = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Move.Id_VarToID));
        } else {
            if (NekoGakuen.PicturePlus_Show.Id_Type == "Number") {
                PicMove_ld = NekoGakuen.PicturePlus_Show.Id_Number;
            } else if (NekoGakuen.PicturePlus_Show.Id_Type == "Variable") {
                PicMove_ld = $gameVariables.value(NekoGakuen.PicturePlus_Show.Id_Variable);
            } else {
                PicMove_ld = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Id_VarToID));
            }
        }

        const PicMove_Origin = NekoGakuen.PicturePlus_Move.Origin_Type == "UpperLeft" ? 0 : 1;
        let PicMove_CoordinateX = 0, PicMove_CoordinateY = 0;
        if (NekoGakuen.PicturePlus_Move.Coordinate_Type == "Number") {
            PicMove_CoordinateX = NekoGakuen.PicturePlus_Move.Coordinate_NumberX;
            PicMove_CoordinateY = NekoGakuen.PicturePlus_Move.Coordinate_NumberY;
        } else if (NekoGakuen.PicturePlus_Move.Coordinate_Type == "Variable") {
            PicMove_CoordinateX = $gameVariables.value(NekoGakuen.PicturePlus_Move.Coordinate_VariableX);
            PicMove_CoordinateY = $gameVariables.value(NekoGakuen.PicturePlus_Move.Coordinate_VariableY);
        } else if (NekoGakuen.PicturePlus_Move.Coordinate_Type == "VarToID") {
            PicMove_CoordinateX = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Move.Coordinate_VarToIDX));
            PicMove_CoordinateY = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Move.Coordinate_VarToIDY));
        } else {
            if (NekoGakuen.PicturePlus_Show.Coordinate_Type == "Number") {
                PicMove_CoordinateX = NekoGakuen.PicturePlus_Show.Coordinate_NumberX;
                PicMove_CoordinateY = NekoGakuen.PicturePlus_Show.Coordinate_NumberY;
            } else if (NekoGakuen.PicturePlus_Show.Coordinate_Type == "Variable") {
                PicMove_CoordinateX = $gameVariables.value(NekoGakuen.PicturePlus_Show.Coordinate_VariableX);
                PicMove_CoordinateY = $gameVariables.value(NekoGakuen.PicturePlus_Show.Coordinate_VariableY);
            } else {
                PicMove_CoordinateX = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Coordinate_VarToIDX));
                PicMove_CoordinateY = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Coordinate_VarToIDY));
            }
        }

        let PicMove_ScaleX = 100, PicMove_ScaleY = 100;
        if (NekoGakuen.PicturePlus_Move.Scale_Type == "Number") {
            PicMove_ScaleX = NekoGakuen.PicturePlus_Move.Scale_NumberW;
            PicMove_ScaleY = NekoGakuen.PicturePlus_Move.Scale_NumberH;
        } else if (NekoGakuen.PicturePlus_Move.Scale_Type == "Variable") {
            PicMove_ScaleX = $gameVariables.value(NekoGakuen.PicturePlus_Move.Scale_VariableW);
            PicMove_ScaleY = $gameVariables.value(NekoGakuen.PicturePlus_Move.Scale_VariableH);
        } else if (NekoGakuen.PicturePlus_Move.Scale_Type == "VarToID") {
            PicMove_ScaleX = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Move.Scale_VarToIDW));
            PicMove_ScaleY = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Move.Scale_VarToIDH));
        } else {
            if (NekoGakuen.PicturePlus_Show.Scale_Type == "Number") {
                PicMove_ScaleX = NekoGakuen.PicturePlus_Show.Scale_NumberW;
                PicMove_ScaleY = NekoGakuen.PicturePlus_Show.Scale_NumberH;
            } else if (NekoGakuen.PicturePlus_Show.Scale_Type == "Variable") {
                PicMove_ScaleX = $gameVariables.value(NekoGakuen.PicturePlus_Show.Scale_VariableW);
                PicMove_ScaleY = $gameVariables.value(NekoGakuen.PicturePlus_Show.Scale_VariableH);
            } else {
                PicMove_ScaleX = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Scale_VarToIDW));
                PicMove_ScaleY = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Scale_VarToIDH));
            }
        }

        let PicMove_Opacity = 255;
        if (NekoGakuen.PicturePlus_Move.Opacity_Type == "Number") {
            PicMove_Opacity = NekoGakuen.PicturePlus_Move.Opacity_Number;
        } else if (NekoGakuen.PicturePlus_Move.Opacity_Type == "Variable") {
            PicMove_Opacity = $gameVariables.value(NekoGakuen.PicturePlus_Move.Opacity_Variable);
        } else if (NekoGakuen.PicturePlus_Move.Opacity_Type == "VarToID") {
            PicMove_Opacity = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Move.Opacity_VarToID));
        } else {
            if (NekoGakuen.PicturePlus_Show.Opacity_Type == "Number") {
                PicMove_Opacity = NekoGakuen.PicturePlus_Show.Opacity_Number;
            } else if (NekoGakuen.PicturePlus_Show.Opacity_Type == "Variable") {
                PicMove_Opacity = $gameVariables.value(NekoGakuen.PicturePlus_Show.Opacity_Variable);
            } else {
                PicMove_Opacity = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Opacity_VarToID));
            }
        }

        let PicMove_Blend_Mode = 0;
        if (NekoGakuen.PicturePlus_Move.Blend_Mode == "Normal") {
            PicMove_Blend_Mode = 0;
        } else if (NekoGakuen.PicturePlus_Move.Blend_Mode == "Add") {
            PicMove_Blend_Mode = 1;
        } else if (NekoGakuen.PicturePlus_Move.Blend_Mode == "Multiply") {
            PicMove_Blend_Mode = 2;
        } else if (NekoGakuen.PicturePlus_Move.Blend_Mode == "Screen") {
            PicMove_Blend_Mode = 3;
        }

        let PicMove_Angle;
        if (NekoGakuen.PicturePlus_Move.Angle_Type == "Number") {
            PicMove_Angle = NekoGakuen.PicturePlus_Move.Angle_Number;
        } else if (NekoGakuen.PicturePlus_Move.Angle_Type == "Variable") {
            PicMove_Angle = $gameVariables.value(NekoGakuen.PicturePlus_Move.Angle_Variable);
        } else if (NekoGakuen.PicturePlus_Move.Angle_Type == "VarToID") {
            PicMove_Angle = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Move.Angle_VarToID));
        } else {
            if (NekoGakuen.PicturePlus_Show.Angle_Type == "Number") {
                PicMove_Angle = NekoGakuen.PicturePlus_Show.Angle_Number;
            } else if (NekoGakuen.PicturePlus_Show.Angle_Type == "Variable") {
                PicMove_Angle = $gameVariables.value(NekoGakuen.PicturePlus_Show.Angle_Variable);
            } else {
                PicMove_Angle = $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Show.Angle_VarToID));
            }
        }

        const PicMove_Wait_Time = NekoGakuen.PicturePlus_Move.Wait_Type == "Number" ? NekoGakuen.PicturePlus_Move.Wait_Number : NekoGakuen.PicturePlus_Move.Wait_Type == "Variable" ? $gameVariables.value(NekoGakuen.PicturePlus_Move.Wait_Variable) : $gameVariables.value($gameVariables.value(NekoGakuen.PicturePlus_Move.Wait_VarToID));
        const PicMove_Wait_Boolean = NekoGakuen.PicturePlus_Move.Wait_Boolean;
        const PicMove_Easing_Type = NekoGakuen.PicturePlus_Move.Easing_Type == "SlowStart" ? 1 : NekoGakuen.PicturePlus_Move.Easing_Type == "SlowEnd" ? 2 : NekoGakuen.PicturePlus_Move.Easing_Type == "SlowStartAndEnd" ? 3 : 0;
        $gameScreen.movePicturePlus(
            PicMove_ld, PicMove_Origin,
            PicMove_CoordinateX,
            PicMove_CoordinateY,
            PicMove_ScaleX,
            PicMove_ScaleY,
            PicMove_Opacity,
            PicMove_Blend_Mode,
            PicMove_Angle,
            PicMove_Wait_Time,
            PicMove_Easing_Type
        )
        if (PicMove_Wait_Boolean) {
            this._interpreter = new Game_Interpreter();
            this._interpreter.wait(PicMove_Wait_Time);
        }
    });


    PluginManager.registerCommand(pluginName, "PicturePlus_Erase", args => {
        const PicErase_Id_Type = String(args.Id_Type);
        const PicErase_Id_Number = Number(args.Id_Number);
        const PicErase_Id_Variable = $gameVariables.value(args.Id_Variable);
        const PicErase_Id_VarToID = $gameVariables.value($gameVariables.value(args.Id_VarToID));
        if (PicErase_Id_Type == "Number") {
            $gameScreen.erasePicture(PicErase_Id_Number);
        } else if (PicErase_Id_Type == "Variable") {
            $gameScreen.erasePicture(PicErase_Id_Variable);
        } else if (PicErase_Id_Type == "VarToID") {
            $gameScreen.erasePicture(PicErase_Id_VarToID);
        } else if (PicErase_Id_Type == "Range") {
            let PicErase_Id_Range = JSON.parse(args.Id_Range);
            for (let i = PicErase_Id_Range.EraseRange_Start; i < PicErase_Id_Range.EraseRange_End; i++) {
                $gameScreen.erasePicture(i);
            }
        }
    });

    Game_Screen.prototype.maxPictures = function () {
        return NekoGakuen.PicturePlus.PictureId_Max;
    };

    Game_Screen.prototype.showPicturePlus = function (
        pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode, angle
        , picfix) {
        const realPictureId = this.realPictureId(pictureId);
        const picture = new Game_Picture();
        picture.showPlus(name, origin, x, y, scaleX, scaleY, opacity, blendMode, angle, picfix);
        this._pictures[realPictureId] = picture;

    };

    Game_Picture.prototype.initialize = function () {
        this.initBasic();
        this.initRotation();
        this.initTarget();
        this.initTone();

    };

    NekoGakuen.PicturePlus._Game_Picture_initTarget = Game_Picture.prototype.initTarget;
    Game_Picture.prototype.initTarget = function () {
        NekoGakuen.PicturePlus._Game_Picture_initTarget.call(this);
        this._targetAngle = this._angle;
    };

    Game_Picture.prototype.showPlus = function (name, origin, x, y, scaleX, scaleY, opacity, blendMode, angle, picfix) {
        this._name = name;
        this._origin = origin;
        this._x = x;
        this._y = y;
        this._scaleX = scaleX;
        this._scaleY = scaleY;
        this._opacity = opacity;
        this._blendMode = blendMode;

        this._picfix = picfix;
        this.initTarget();
        this.initTone();
        this.initRotation();
        this._angle = angle;
    };

    Game_Screen.prototype.movePicturePlus = function (
        pictureId, origin, x, y, scaleX, scaleY, opacity, blendMode, angle, duration,
        easingType
    ) {
        const picture = this.picture(pictureId);
        if (picture) {
            picture.movePlus(origin, x, y, scaleX, scaleY, opacity, blendMode, angle,
                duration, easingType);
        }
    };

    Game_Picture.prototype.movePlus = function (
        origin, x, y, scaleX, scaleY, opacity, blendMode, angle, duration, easingType
    ) {
        this._origin = origin;
        this._targetX = x;
        this._targetY = y;
        this._targetScaleX = scaleX;
        this._targetScaleY = scaleY;
        this._targetOpacity = opacity;
        this._blendMode = blendMode;
        this._duration = duration;
        this._wholeDuration = duration;
        this._easingType = easingType;
        this._targetAngle = angle;
        this._easingExponent = 2;
    };

    Game_Picture.prototype.picfix = function () {
        return this._picfix;
    };

    NekoGakuen.PicturePlus._Game_Picture_updateMove = Game_Picture.prototype.updateMove;
    Game_Picture.prototype.updateMove = function () {
        if (this._duration > 0) {
            this._angle = this.applyEasing(this._angle, this._targetAngle);
            NekoGakuen.PicturePlus._Game_Picture_updateMove.call(this);
        }
    };

    NekoGakuen.PicturePlus._Sprite_Picture_updatePosition = Sprite_Picture.prototype.updatePosition;
    Sprite_Picture.prototype.updatePosition = function () {
        const picture = this.picture();
        if (picture.picfix() == "Map") {
            this.x = ($gameMap.displayX() * -48) + picture.x();
            this.y = ($gameMap.displayY() * -48) + picture.y();
        } else {
            NekoGakuen.PicturePlus._Sprite_Picture_updatePosition.call(this);
        }
    };

    Spriteset_Base.prototype.createPictures_L0 = function () {
        const rect = this.pictureContainerRect();
        this._pictureContainer_L0 = new Sprite();
        this._pictureContainer_L0.setFrame(rect.x, rect.y, rect.width, rect.height);
        if (NekoGakuen.PicturePlus.PicLayer_Boolean == 'true') {
            for (let i = 1; i < $gameScreen.maxPictures() + 1; i++) {
                if (args_LayerType[i - 1] == 0) {
                    this._pictureContainer_L0.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
                if (args_Layerbat_Type[i - 1] == 0) {
                    this._pictureContainer_L0.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
            }
        }
        this._baseSprite.addChild(this._pictureContainer_L0);
    };

    Spriteset_Base.prototype.createPictures_L1 = function () {
        const rect = this.pictureContainerRect();
        this._pictureContainer_L1 = new Sprite();
        this._pictureContainer_L1.setFrame(rect.x, rect.y, rect.width, rect.height);
        if (NekoGakuen.PicturePlus.PicLayer_Boolean == 'true') {
            for (let i = 1; i < $gameScreen.maxPictures() + 1; i++) {
                if (args_LayerType[i - 1] == 1) {
                    this._pictureContainer_L1.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
                if (args_Layerbat_Type[i - 1] == 1) {
                    this._pictureContainer_L1.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
            }
        }
        this._tilemap.addChild(this._pictureContainer_L1);
    };

    Spriteset_Base.prototype.createPictures_L2 = function () {
        const rect = this.pictureContainerRect();
        this._pictureContainer_L2 = new Sprite();
        this._pictureContainer_L2.setFrame(rect.x, rect.y, rect.width, rect.height);
        if (NekoGakuen.PicturePlus.PicLayer_Boolean == 'true') {
            for (let i = 1; i < $gameScreen.maxPictures() + 1; i++) {
                if (args_LayerType[i - 1] == 2) {
                    this._pictureContainer_L2.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
                if (args_Layerbat_Type[i - 1] == 2) {
                    this._pictureContainer_L2.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
            }
        }
        this._tilemap.addChild(this._pictureContainer_L2);
    };

    Spriteset_Base.prototype.createPictures = function () {
        const rect = this.pictureContainerRect();
        if (NekoGakuen.PicturePlus.PicLayer_Boolean == 'true') {
            this._pictureContainer = new Sprite();
            this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
        } else {
            this._pictureContainer = new Sprite();
            this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
        }
        for (let i = 1; i < $gameScreen.maxPictures() + 1; i++) {
            if (NekoGakuen.PicturePlus.PicLayer_Boolean == 'true') {

                if (args_LayerType[i - 1] == 3) {
                    this._pictureContainer.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));

                } else if (args_Layerbat_Type[i - 1] == 3) {
                    this._pictureContainer.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
            } else {
                this._pictureContainer.addChild(new Sprite_Picture(i));
            }
        }
        if (NekoGakuen.PicturePlus.PicLayer_Boolean == 'true') {
            this.addChild(this._pictureContainer);
        } else {
            this.addChild(this._pictureContainer);
        }
    };

    Spriteset_Base.prototype.createPictures_L4 = function () {
        const rect = this.pictureContainerRect();
        this._pictureContainer_L4 = new Sprite();
        this._pictureContainer_L4.setFrame(rect.x, rect.y, rect.width, rect.height);
        if (NekoGakuen.PicturePlus.PicLayer_Boolean == 'true') {
            for (let i = 1; i < $gameScreen.maxPictures() + 1; i++) {
                if (args_LayerType[i - 1] == 4) {
                    this._pictureContainer_L4.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
                if (args_Layerbat_Type[i - 1] == 4) {
                    this._pictureContainer_L4.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
            }
        }
        this.addChild(this._pictureContainer_L4);
    };

    NekoGakuen.PicturePlus._Spriteset_Base_processAnimationRequests = Spriteset_Base.prototype.processAnimationRequests;
    Spriteset_Base.prototype.processAnimationRequests = function () {
        if (!$gameParty.inBattle()) {
            this.createPictures_L2();
        }
        NekoGakuen.PicturePlus._Spriteset_Base_processAnimationRequests.call(this);
    };

    Spriteset_Base.prototype.createUpperLayer = function () {
        this.createPictures();
        this.createTimer();
        this.createPictures_L4();
        this.createOverallFilters();
    };

    Spriteset_Map.prototype.createLowerLayer = function () {
        Spriteset_Base.prototype.createLowerLayer.call(this);
        this.createParallax();
        this.createPictures_L0();
        this.createTilemap();
        this.createPictures_L1();
        this.createCharacters();
        this.createShadow();
        this.createDestination();
        this.createWeather();
    };

    Scene_Map.prototype.createDisplayObjects = function () {
        this.createSpriteset();
        this.createWindowLayer();
        this.createAllWindows();
        this.createPictures_L5();
        this.createButtons();
    };

    Scene_Map.prototype.createPictures_L5 = function () {
        const rect = new Rectangle(0, 0, Graphics.width, Graphics.height);
        this._pictureContainer_L5 = new Sprite();
        this._pictureContainer_L5.setFrame(rect.x, rect.y, rect.width, rect.height);
        if (NekoGakuen.PicturePlus.PicLayer_Boolean == 'true') {
            for (let i = 1; i < $gameScreen.maxPictures() + 1; i++) {
                if (args_LayerType[i - 1] == 5) {
                    this._pictureContainer_L5.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
                if (args_Layerbat_Type[i - 1] == 5) {
                    this._pictureContainer_L5.addChild(new Sprite_Picture(Number(args_LayerId[i - 1])));
                }
            }
        }
        this.addChild(this._pictureContainer_L5);

    };

    NekoGakuen.PicturePlus._Spriteset_Base_update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function () {
        NekoGakuen.PicturePlus._Spriteset_Base_update.call(this);
        if (args_Picture_Mask.length > 0) {
            this.updateMaskPicture();
        }
    };

    Spriteset_Base.prototype.updateMaskPicture = function () {
        let face, mask;
        for (let i = 1; i < $gameScreen.maxPictures() + 1; i++) {
            if (NekoGakuen.PicturePlus.PicLayer_Boolean == 'true') {
                for (let r = 0; r < 5; r++) {
                    if (r == 3) {
                        for (let s = 0; s < args_Picture_Mask.length; s++) {
                            if (args_LayerType[i - 1] == 3) {
                                if (!args_LayerId[i - 1]) {
                                    for (let s = 0; s < args_Picture_Mask.length; s++) {
                                        if (args_FaceId[s] == i) {
                                            face = args_FaceId[s];
                                            mask = args_MaskId[s];
                                        }
                                    }
                                    this._pictureContainer.children[face - 1].mask = this._pictureContainer.children[mask - 1];
                                } else if (args_LayerType[i - 1] == 3) {
                                    if (args_FaceId[s] == args_LayerId[i - 1]) {
                                        face = args_FaceId[s];
                                        mask = args_MaskId[s];
                                    }
                                    this._pictureContainer.children[face - 1].mask = this._pictureContainer.children[mask - 1];
                                } else if (args_Layerbat_Type[i - 1] == 3) {
                                    if (args_FaceId[s] == args_LayerId[i - 1]) {
                                        face = args_FaceId[s];
                                        mask = args_MaskId[s];
                                    }
                                    this._pictureContainer.children[face - 1].mask = this._pictureContainer.children[mask - 1];
                                }
                            }
                        }
                    }
                    if (args_LayerType[i - 1] == r) {
                        for (let s = 0; s < args_Picture_Mask.length; s++) {
                            if (args_FaceId[s] == args_LayerId[i - 1]) {
                                face = args_FaceId[s];
                                mask = args_MaskId[s];
                                this['_pictureContainer_L' + r].children[face - 1].mask = this['_pictureContainer_L' + r].children[mask - 1];
                            }
                        }
                    }
                    if (args_Layerbat_Type[i - 1] == r) {
                        for (let s = 0; s < args_Picture_Mask.length; s++) {
                            if (args_FaceId[s] == args_LayerId[i - 1]) {
                                face = args_FaceId[s];
                                mask = args_MaskId[s];
                                this['_pictureContainer_L' + r].children[face - 1].mask = this['_pictureContainer_L' + r].children[mask - 1];
                            }
                        }
                    }
                }

            } else {
                for (let s = 0; s < args_Picture_Mask.length; s++) {
                    if (args_FaceId[s] == i) {
                        face = args_FaceId[s];
                        mask = args_MaskId[s];
                    }
                }
                this._pictureContainer.children[face - 1].mask = this._pictureContainer.children[mask - 1];
            }
        }
    };

})();
