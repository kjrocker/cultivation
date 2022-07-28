export const TemperedLabelConfig: Record<string, { inherits: string[] }> = {
	QuenchingLabel_Lv0_Brain: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Eye: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Ear: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Nose: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Mouth: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Throat: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Heart: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Liver: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Spleen: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Lung: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Kidney: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Stomach: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Intestines: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Genitals: {
		inherits: ['QuenchingLabel_Lv0_Base_Organ']
	},
	QuenchingLabel_Lv0_Spine: {
		inherits: ['QuenchingLabel_Lv0_Base_Bone']
	}
};

export const TemperedPartConfig: Record<string, { include: string[]; exclude: string[] }> = {
	Brain: {
		include: ['QuenchingLabel_Lv0_Brain'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	LeftEye: {
		include: ['QuenchingLabel_Lv0_Eye'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	RightEye: {
		include: ['QuenchingLabel_Lv0_Eye'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	LeftEar: {
		include: ['QuenchingLabel_Lv0_Ear'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	RightEar: {
		include: ['QuenchingLabel_Lv0_Ear'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Nose: {
		include: ['QuenchingLabel_Lv0_Nose'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Mouth: {
		include: ['QuenchingLabel_Lv0_Mouth'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Throat: {
		include: ['QuenchingLabel_Lv0_Throat'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Heart: {
		include: ['QuenchingLabel_Lv0_Heart'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Liver: {
		include: ['QuenchingLabel_Lv0_Liver'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Spleen: {
		include: ['QuenchingLabel_Lv0_Spleen'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Lung: {
		include: ['QuenchingLabel_Lv0_Lung'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Kidney: {
		include: ['QuenchingLabel_Lv0_Kidney'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Stomach: {
		include: ['QuenchingLabel_Lv0_Stomach'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Intestines: {
		include: ['QuenchingLabel_Lv0_Intestines'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Genitals: {
		include: ['QuenchingLabel_Lv0_Genitals'],
		exclude: ['QuenchingLabel_Lv0_Base_Organ']
	},
	Spine: {
		include: ['QuenchingLabel_Lv0_Spine'],
		exclude: ['QuenchingLabel_Lv0_Base_Bone']
	}
};
