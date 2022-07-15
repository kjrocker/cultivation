export type LanguageEnum =
  | "LingShou/ActionType/ActionType"
  | "LingShou/Action/lsaction"
  | "LingShou/LsRace/LsRace_DLC"
  | "LingShou/LsRace/LsRace"
  | "LingShou/LsRace/LsRace_DLC_WuDang"
  | "LingShou/Extra/extrap"
  | "Teaching/TeachingDefs"
  | "Fight/FightDef"
  | "Fight/FightSkillTemplate/FightSkill_Fabao"
  | "Fight/FightSkillTemplate/FightSkill_Body"
  | "Fight/FightSkillTemplate/FightSkill_LingShou"
  | "Fight/FightSkillTemplate/FightSkill_BossZhulong"
  | "Fight/FightSkillTemplate/FightSkill_Health"
  | "Fight/FightSkillTemplate/FightSkill_Skill"
  | "Fight/FightSkillTemplate/FightSkill_Sheild"
  | "Fight/FightSkillTemplate/FightSkill_God"
  | "Fight/FightSkillTemplate/FightSkill_Zhen"
  | "Fight/FightSkillTemplate/FightSkill_DLC_WuDang"
  | "Fight/FightSkillTemplate/FightSkill_BossXiongfeng"
  | "Fight/FightSkillTemplate/FightSkill_BossJiaolong"
  | "Fight/FightSkillTemplate/FightSkill_Damage"
  | "Fight/FightSkillTemplate/FightSkill_DLC"
  | "MsgShow/Event/EventShow"
  | "MsgShow/Rule/Rule_DLC_WuDang"
  | "MsgShow/Rule/Rule"
  | "Jianghu/Npc/Npc"
  | "CommandDef/CommandTypeDef_Other"
  | "Npc/Race/Race_Animal"
  | "Npc/Race/Race_XiongmaoDLC"
  | "Npc/Race/Race_JYAnimal"
  | "Npc/Race/Race_LsAnimal"
  | "Npc/Race/Race_Boss"
  | "Npc/Race/Race_Human"
  | "Npc/Race/Race_Other"
  | "Npc/Race/Race_DLC_WuDang"
  | "Npc/Race/Race_BossTest"
  | "Npc/Race/Race_YGAnimal"
  | "Npc/Experience/e1"
  | "Npc/Experience/e2"
  | "Npc/Features/BanWork_Features"
  | "Npc/Features/BanRelationship_Features"
  | "Npc/Features/Special_Features"
  | "Npc/Features/Panda_Features"
  | "Npc/Features/Emotion_Features"
  | "Npc/Features/Ls_Features"
  | "Npc/Features/Hobby_Features"
  | "Npc/Features/Body_Features"
  | "Npc/Features/System_Features"
  | "Npc/Body/Animal_Quadruped"
  | "Npc/Body/YGAnimal_Rabbit"
  | "Npc/Body/Animal_Snake"
  | "Npc/Body/YGAnimal_Panda"
  | "Npc/Body/YGAnimal_Snake"
  | "Npc/Body/YGAnimal_Cattle"
  | "Npc/Body/Human"
  | "Npc/Body/YGAnimal_Turtle"
  | "Npc/Body/YGAnimal_CatTigerWolf"
  | "Npc/Body/YGAnimal_Bear"
  | "Npc/Body/YGAnimal_Chicken"
  | "Npc/Body/YGAnimal_Frog"
  | "Npc/Body/Puppet"
  | "Npc/Body/YGAnimal_Boar"
  | "Npc/Damages/GongDamages"
  | "Npc/Damages/Damages_DLC"
  | "Npc/Damages/Damages"
  | "Npc/Relation/PracticeKinship"
  | "Npc/Relation/Kinship"
  | "Npc/Favour/Test"
  | "Npc/Moods/Moods_Features"
  | "Npc/Moods/Moods_Requirement"
  | "Npc/Moods/Moods_Gong"
  | "Npc/Moods/Moods_Evaluate"
  | "Npc/Moods/Moods_Other"
  | "Npc/Moods/Moods_Sys"
  | "Npc/Moods/Moods_Weather"
  | "Npc/Moods/Moods_EventFeedback"
  | "Npc/Moods/Moods_DLC"
  | "Npc/Moods/Moods_BodilyFeelings"
  | "Npc/Moods/Moods_LingShou"
  | "Esoterica/Esoterica_Magic"
  | "Esoterica/Esoterica_Spell"
  | "Esoterica/Esoterica_Zhen"
  | "Esoterica/Esoterica_GongLvUp"
  | "Esoterica/Esoterica_Book"
  | "Esoterica/Esoterica_FightSkill"
  | "Esoterica/Esoterica_LingZhi"
  | "Esoterica/Esoterica_Magic2"
  | "Esoterica/Esoterica_Other"
  | "Esoterica/Esoterica_Gong"
  | "Esoterica/Esoterica_MiBao"
  | "Esoterica/Esoterica_Gong_DLC_WuDang"
  | "Property/BodyPraticeProperty"
  | "Property/PracticeProperty"
  | "Property/FightProperty"
  | "Property/RoleProperty"
  | "Property/GodPraticeProperty"
  | "Property/FishProperty_DLC"
  | "Property/WorkProperty"
  | "NpcStories/social"
  | "NpcStories/JingGuai"
  | "NpcStories/fun"
  | "NpcStories/work"
  | "NpcStories/practice"
  | "NpcStories/system"
  | "NpcStories/WithAnimal"
  | "NpcStories/makeitem"
  | "JobDef/JobDef_Panda"
  | "JobDef/JobDef_Other"
  | "JobDef/JobDef_Work"
  | "JobDef/JobDef_Need"
  | "JobDef/JobDef_LingShou"
  | "JobDef/JobDef_RPG"
  | "JobDef/JobDef_Special"
  | "JobDef/JobDef_Disciple"
  | "TerrainDef/Terrain_Base"
  | "TerrainDef/Terrain_Floor"
  | "Modifiers/BodyPractice/Modifier_BodyPractice_System"
  | "Modifiers/BodyPractice/Modifier_BodyPracticeEnemy"
  | "Modifiers/BodyPractice/Modifier_BodyPractice_QuenchingLabel"
  | "Modifiers/BodyPractice/Modifier_BodyPractice_SuperPart"
  | "Modifiers/Modifier_Lc"
  | "Modifiers/Modifier_Normal"
  | "Modifiers/Modifier_Zhen"
  | "Modifiers/Modifier_HotStory"
  | "Modifiers/Modifier_Horse"
  | "Modifiers/Modifier_YaoShou"
  | "Modifiers/Modifier_DLC_WuDang"
  | "Modifiers/Modifier_DLC"
  | "Modifiers/Modifier_SpecialNpc"
  | "Modifiers/Modifier_MapStory"
  | "Modifiers/Modifier_FeatureBase"
  | "Modifiers/Modifier_JGToHuman"
  | "Modifiers/Modifier_Dan"
  | "Modifiers/Modifier_LingZhi"
  | "Modifiers/Modifier_System"
  | "Modifiers/Modifier_Trade"
  | "Modifiers/Modifier_Gong_Esoteriac_DLC_WuDang"
  | "Modifiers/Modifier_A2H"
  | "Modifiers/GodPractice/Modifier_GodPractice"
  | "Modifiers/Modifier_Immortal"
  | "Modifiers/Modifier_RPG"
  | "Modifiers/Modifier_System_DLC_WuDang"
  | "Modifiers/Modifier_FSZhenWu"
  | "Modifiers/Modifier_Tool"
  | "Modifiers/Modifier_Weather"
  | "Modifiers/Modifier_Env"
  | "Modifiers/Modifier_Magic"
  | "Modifiers/Boss/Modifier_jiaolong_Test"
  | "Modifiers/Boss/Modifier_zhulong"
  | "Modifiers/Boss/Modifier_xiongfeng"
  | "Modifiers/Boss/Modifier_jiaolong"
  | "Modifiers/Boss/Modifier_xiongfeng_Test"
  | "Modifiers/Modifier_Tower"
  | "Outspread/Region/region_City"
  | "Outspread/Region/region_District"
  | "Outspread/Policy/policy_Point"
  | "Outspread/Policy/policy_Disaster"
  | "Outspread/Point/Point_District"
  | "Outspread/Point/Point_City"
  | "Outspread/Landform/landform"
  | "Outspread/Disaster/Disaster"
  | "Outspread/Build/Build_City"
  | "Outspread/Build/Build_Wonder"
  | "Outspread/Build/Build_Point"
  | "Outspread/Build/Build_Region"
  | "Outspread/BuildSkill/BuildSkill"
  | "Outspread/PolicyStory/PolicyStory"
  | "Tang/tang"
  | "Zhen/Props/SlotProperty"
  | "Zhen/NodeLevelInfo/nodelevelinfo"
  | "Zhen/Suit/ZhenSuit"
  | "Zhen/Node/ZhenNode_Lv4"
  | "Zhen/Node/ZhenNode_School"
  | "Zhen/Node/ZhenNode_Lv3"
  | "Zhen/Node/ZhenNode_Lv2"
  | "Zhen/Node/ZhenNode_Suit"
  | "Zhen/Node/ZhenNode_Lv0"
  | "Zhen/Node/ZhenNode_Lv1"
  | "Zhen/SlotSuit/SlotSuit"
  | "Zhen/SlotSuit/SlotSuit_School"
  | "Zhen/Propvalue/PropertyValue"
  | "RPG/Info/RpgInfo"
  | "RPG/Operation/opt"
  | "RPG/Event/Event"
  | "RPG/Dialogues/Rpg_Tower_0_Talk3"
  | "RPG/Dialogues/JuQing_dialogue_3"
  | "RPG/Dialogues/system"
  | "RPG/Dialogues/Rpg_Tower_0_Talk1"
  | "RPG/Dialogues/tower_dialogue"
  | "RPG/Dialogues/Rpg_Tower_1_Talk1"
  | "RPG/Dialogues/Rpg_Tower_0_Talk4"
  | "RPG/Dialogues/Rpg_Arena_Ping"
  | "RPG/Dialogues/system_dialogue"
  | "RPG/Dialogues/Rpg_Arena_YingTian"
  | "RPG/Dialogues/Rpg_Arena_0"
  | "RPG/Dialogues/JuQing_dialogue_1"
  | "RPG/Dialogues/Rpg_Arena_Mdie"
  | "RPG/Dialogues/Rpg_Tower_0_Talk2"
  | "RPG/Dialogues/JuQing_dialogue_0"
  | "RPG/Dialogues/Rpg_Arena_Onlinedie"
  | "RPG/Dialogues/JuQing_dialogue_2"
  | "RPG/Dialogues/test"
  | "RPG/Dialogues/Rpg_Arena_Tdie"
  | "RPG/Things/Things"
  | "ThingDef/Plant/Plant_Farm"
  | "ThingDef/Plant/Plant_Box"
  | "ThingDef/Plant/Plant_Wild"
  | "ThingDef/Plant/Plant_DLC_WuDang"
  | "ThingDef/Plant/Plant_LingZhi"
  | "ThingDef/Plant/Plant_Beauty"
  | "ThingDef/Plant/Plant_DLC"
  | "ThingDef/Plant/Plant_Tree"
  | "ThingDef/Plant/Plant_Special"
  | "ThingDef/Plant/Plant_Base"
  | "ThingDef/Building/Building_Furniture"
  | "ThingDef/Building/Building_Ornament"
  | "ThingDef/Building/Building_Floor"
  | "ThingDef/Building/Building_Production"
  | "ThingDef/Building/Building_Wall"
  | "ThingDef/Building/Building_System"
  | "ThingDef/Building/Building_Magic"
  | "ThingDef/Building/Building_Roof"
  | "ThingDef/Building/Building_Other"
  | "ThingDef/Building/Building_2_DLC_WuDang"
  | "ThingDef/Building/Building_Env"
  | "ThingDef/Building/Building_LingShou"
  | "ThingDef/Building/Building_DLC_WuDang"
  | "ThingDef/Building/Building_Ornament2"
  | "ThingDef/Building/Building_PANDA"
  | "ThingDef/ThingNpc"
  | "ThingDef/Rock/Special"
  | "ThingDef/Rock/Rock"
  | "ThingDef/Rock/Metal"
  | "ThingDef/Item/Item_Material_Other"
  | "ThingDef/Item/Item_Material_2_WoodBlock"
  | "ThingDef/Item/Item_Base"
  | "ThingDef/Item/Item_Consumable_Food"
  | "ThingDef/Item/Item_BodyPracticeItem"
  | "ThingDef/Item/RaceNormalAttack"
  | "ThingDef/Item/Item_Consumable_Drug"
  | "ThingDef/Item/Item_Material_2_LeftoverMaterial_DLC"
  | "ThingDef/Item/Item_Equipment_Fabao"
  | "ThingDef/Item/Item_Material_Metal"
  | "ThingDef/Item/Item_Material_PlantProduct"
  | "ThingDef/Item/Item_System"
  | "ThingDef/Item/Item_Material_2_LeftoverMaterial"
  | "ThingDef/Item/Item_FengShuiItem"
  | "ThingDef/Item/Item_Equipment_MiBao"
  | "ThingDef/Item/Item_Material_2_Meat"
  | "ThingDef/Item/Item_Material_2_MetalBlock"
  | "ThingDef/Item/Item_DLC"
  | "ThingDef/Item/Item_Consumable_Tool"
  | "ThingDef/Item/Item_Material_Plant"
  | "ThingDef/Item/Item_System2"
  | "ThingDef/Item/Item_Material_Leather"
  | "ThingDef/Item/Item_Material_Rock"
  | "ThingDef/Item/Item_Consumable_Spell"
  | "ThingDef/Item/Item_Material_Other_Portia"
  | "ThingDef/Item/Item_Material_Wood"
  | "ThingDef/Item/Item_DLC_WuDang"
  | "ThingDef/Item/Item_Equipment_Clothes"
  | "ThingDef/Item/Item_Equipment_Trousers"
  | "ThingDef/Item/Item_Consumable_Dan"
  | "ThingDef/Item/Item_Fish_DLC"
  | "ThingDef/Item/RaceNormalAttack_DLC"
  | "ThingDef/Item/Item_Equipment_Weapon"
  | "ThingDef/Item/Item_Material_2_Ingredient"
  | "ThingDef/Item/Item_Horse"
  | "ThingDef/Item/Item_Consumable_SoulCrystal"
  | "ThingDef/Item/Item_Material_Cloth"
  | "ThingDef/Item/Item_System_WanJieTianGong"
  | "ThingDef/Item/Item_Cape"
  | "ThingDef/Item/Item_Material_2_RockBlock"
  | "ThingDef/Item/RaceNormalAttack_DLC_WuDang"
  | "ThingDef/Item/Item_Boss"
  | "Weather/Weather"
  | "Weather/skill"
  | "Weather/Weather_Env"
  | "Weather/Weather_Special"
  | "World/DufficultyLabel/DifficultyLabels"
  | "World/DufficultyLabel/DifficultyEventLabels"
  | "World/EventDriver"
  | "World/Immortal/Constraint/Env"
  | "World/Immortal/Constraint/Constraint"
  | "World/Immortal/ImmortalLevel/level"
  | "World/Places/DLC"
  | "World/Places/System"
  | "World/Places/Level3"
  | "World/Places/DLC_WuDang"
  | "World/Places/Level2"
  | "World/Places/Level1"
  | "Comment/Special"
  | "Comment/Npc"
  | "Comment/ZhenSlotSuit"
  | "Comment/BottleNeck"
  | "Comment/Region"
  | "Comment/Gong"
  | "Comment/MainMenu"
  | "Comment/SkillTree"
  | "Comment/GodCity"
  | "Comment/MainUI"
  | "Comment/SecondaryUI"
  | "Comment/Area"
  | "Practice/BodyPractice/QuenchingLabel/QuenchingLabel"
  | "Practice/BodyPractice/Attitude/system"
  | "Practice/BodyPractice/Attitude/Attitude_Part1"
  | "Practice/BodyPractice/SuperPart/SuperPart_Tiger"
  | "Practice/BodyPractice/SuperPart/system"
  | "Practice/BodyPractice/SuperPart/SuperPart_Chicken"
  | "Practice/BodyPractice/SuperPart/SuperPart_Cat"
  | "Practice/BodyPractice/SuperPart/SuperPart_All_Gong2"
  | "Practice/BodyPractice/SuperPart/SuperPart_Boar"
  | "Practice/BodyPractice/SuperPart/SuperPart_All_Gong1"
  | "Practice/BodyPractice/SuperPart/SuperPart_All_Gong3"
  | "Practice/BodyPractice/SuperPart/SuperPart_Rabbit"
  | "Practice/BodyPractice/SuperPart/SuperPart_Human"
  | "Practice/BodyPractice/SuperPart/SuperPart_Wolf"
  | "Practice/BodyPractice/SuperPart/SuperPart_Forg"
  | "Practice/BodyPractice/SuperPart/SuperPart_All_Gong5"
  | "Practice/BodyPractice/SuperPart/SuperPart_Bear"
  | "Practice/BodyPractice/SuperPart/SuperPart_Cattle"
  | "Practice/BodyPractice/SuperPart/SuperPart_Panda"
  | "Practice/BodyPractice/SuperPart/SuperPart_Turtle"
  | "Practice/BodyPractice/QuenchingMethod/system"
  | "Practice/BodyPractice/QuenchingMethod/QuenchingMethod"
  | "Practice/Magic/Magic_Panda"
  | "Practice/Magic/Magic"
  | "Practice/Magic/Magic_Zhen"
  | "Practice/Magic/Magic_Lc"
  | "Practice/Magic/Magic_new"
  | "Practice/Magic/Magic_DLC_WuDang"
  | "Practice/Magic/Magic_god"
  | "Practice/Magic/Magic_Horse"
  | "Practice/Magic/Magic_body"
  | "Practice/Magic/Magic_other"
  | "Practice/Tree/Gong2"
  | "Practice/Tree/Gong6"
  | "Practice/Tree/Gong8"
  | "Practice/Tree/Gong9"
  | "Practice/Tree/Gong3"
  | "Practice/Tree/Gong12"
  | "Practice/Tree/Gong10"
  | "Practice/Tree/Gong1"
  | "Practice/Tree/Gong_DLC_WuDang"
  | "Practice/Tree/Gong7"
  | "Practice/Tree/Gong5"
  | "Practice/Tree/Gong4"
  | "Practice/Tree/Gong11"
  | "Practice/RandomGong/RandomGong"
  | "Practice/GodPractice/Guard/System"
  | "Practice/GodPractice/Guard/Guard"
  | "Practice/GodPractice/City/System"
  | "Practice/GodPractice/City/Building"
  | "Practice/Spell/Spell"
  | "Practice/Gong/Gong_8"
  | "Practice/Gong/Gong_4"
  | "Practice/Gong/Gong_5"
  | "Practice/Gong/Gong_7"
  | "Practice/Gong/Gong_YaoShou"
  | "Practice/Gong/Gong_6"
  | "Practice/Gong/Gong_1"
  | "Practice/Gong/Gong_9"
  | "Practice/Gong/Gong_11"
  | "Practice/Gong/Gong_Lost"
  | "Practice/Gong/Body/Body_Gong_3"
  | "Practice/Gong/Body/Body_Gong_1"
  | "Practice/Gong/Body/Body_Gong_5"
  | "Practice/Gong/Body/Body_Gong_2"
  | "Practice/Gong/God/God_Gong_1"
  | "Practice/Gong/God/God_Gong_3"
  | "Practice/Gong/God/God_Gong_2"
  | "Practice/Gong/Gong_13_DLC_WuDang"
  | "Practice/Gong/Gong_DaNneg"
  | "Practice/Gong/Gong_LingShou"
  | "Practice/Gong/Gong_2"
  | "Practice/Gong/Gong_3"
  | "Practice/Gong/Gong_12"
  | "Practice/Gong/Gong_10"
  | "Ui/MainList/MainList_DLC"
  | "Ui/MainList/MainList_DLC_WuDang"
  | "Ui/MainList/MainList"
  | "Ui/Help/Help"
  | "Ui/IllustratedHandbook"
  | "Trade/GoodPool/Good_BodyAnimal"
  | "Trade/GoodPool/Good_AnimalShuShan"
  | "Trade/GoodPool/Good_LunarNewYear"
  | "Trade/GoodPool/Good_AnimalWuLian"
  | "Trade/GoodPool/Good_Animal"
  | "Trade/GoodPool/Good_DLC_WuDang"
  | "Trade/GoodPool/Good_AnimalKunLun"
  | "Trade/GoodPool/Good_AnimalXianKong"
  | "Trade/GoodPool/Good_AnimalDanXia"
  | "Trade/GoodPool/Good_AnimalTianJi"
  | "Trade/GoodPool/Good_AnimalJiuHua"
  | "Trade/GoodPool/Good_AnimalHeHuan"
  | "Trade/GoodPool/Good_Trash"
  | "Trade/GoodPool/Good_AnimalHeiShan"
  | "Trade/GoodPool/Good_AnimalZhengYi"
  | "Trade/GoodPool/Good_MiBao"
  | "Trade/GoodPool/Good_AnimalBaiMan"
  | "Trade/Auction/auction_Normal"
  | "Trade/Auction/auction_Big"
  | "Trade/Auction/auction"
  | "Trade/Auction/auction_Unsure"
  | "Trade/Talk/Talk_TianJi"
  | "Trade/Talk/Talk_ShuShan"
  | "Trade/Talk/Talk_BaiMan"
  | "Trade/Talk/Talk_DanXia"
  | "Trade/Talk/Talk_WanYao"
  | "Trade/Talk/Talk_HeiShan"
  | "Trade/Talk/Talk_DLC_WuDang"
  | "Trade/Talk/Talk_JiuHua"
  | "Trade/Talk/Talk_WuLian"
  | "Trade/Talk/Talk_ZhengYi"
  | "Trade/Talk/Talk_XianKong"
  | "Trade/Talk/Talk_KunLun"
  | "Trade/Talk/Talk_HeHuan"
  | "Trade/SchoolTask/Task"
  | "Display/ArtItem/Weapon_DLC_WuDang"
  | "Display/ArtItem/Weapon"
  | "Display/SpecialName/SpecialNames_DLC"
  | "Display/SpecialName/SpecialNames"
  | "Display/SpecialName/SpecialNames_Fun"
  | "Display/SpecialName/SpecialNames_DLC_WuDang"
  | "MapStories/MapStory_Trade"
  | "MapStories/MapStory_Policy2"
  | "MapStories/MapStory_Env"
  | "MapStories/MapStory_DLC_WuDang"
  | "MapStories/MapStory_FillingLv1"
  | "MapStories/MapStory_HotCharacter"
  | "MapStories/MapStory_Auction"
  | "MapStories/MapStory_Task"
  | "MapStories/MapStory_Panda"
  | "MapStories/MapStory_Policy"
  | "MapStories/MapStory_LingPlant"
  | "MapStories/MapStory_SpecialGong"
  | "MapStories/MapStory_BuildMode"
  | "MapStories/MapStory_LS"
  | "MapStories/MapStory_Curb1"
  | "MapStories/MapStory_Disasters"
  | "MapStories/MapStory_FillingLv2"
  | "MapStories/MapStory_OutSpread"
  | "MapStories/MapStory_Arena"
  | "MapStories/MapStory_Test"
  | "MapStories/MapStory_System"
  | "MapStories/MapStory_Special"
  | "MapStories/MapStory_GodStory"
  | "MapStories/MapStory_Item"
  | "MapStories/MapStory_QuestStory"
  | "HumanoidEvolution/Race/RaceEvoInfo"
  | "HumanoidEvolution/Race/RaceEvoInfo_DLC"
  | "HumanoidEvolution/ThinkFragment/Fragment_Scene"
  | "HumanoidEvolution/ThinkFragment/Fragment_Emotion"
  | "HumanoidEvolution/ThinkFragment/Fragment"
  | "HumanoidEvolution/ThinkFragment/Fragment_Target"
  | "HumanoidEvolution/Combine/Combine"
  | "HumanoidEvolution/Rule/Rule"
  | "Fun/Funs";
