import{c as Q,g,a as l,j as x,o as v,s as o,d as m,A as B,i as y,p as A,r as E,e as $}from"./rename-key-e125a601.js";const T=async()=>{const _=await Promise.all([g("Practice/BodyPractice/SuperPart/SuperPart_All_Gong1"),g("Practice/BodyPractice/SuperPart/SuperPart_All_Gong2"),g("Practice/BodyPractice/SuperPart/SuperPart_All_Gong3"),g("Practice/BodyPractice/SuperPart/SuperPart_All_Gong5")]),s=(await Promise.all([l("Practice/BodyPractice/SuperPart/SuperPart_All_Gong1"),l("Practice/BodyPractice/SuperPart/SuperPart_All_Gong2"),l("Practice/BodyPractice/SuperPart/SuperPart_All_Gong3"),l("Practice/BodyPractice/SuperPart/SuperPart_All_Gong5")])).map(n=>n.Texts.List.Text),i=_.map((n,t)=>n.BPSuperPartDefs.List.Def.map((p,a)=>{const L=x(s[t][a],p,c=>typeof c=="number"?["li",c]:c);return{DisplayName:`${L.Prefix} ${L.Suffix}`,...v(["AtkAni","DefAni","AtkEffect","DefEffect","EffectColor","Parts","Levels","Prefix","Suffix"],o(L)),Parts:L.Parts.li.map(c=>({...o(c),Labels:c.Labels.li.map(h=>{const d=o(h);return{...d,Levels:d.Levels.split(",").map(r=>Number.parseInt(r))}})})),Levels:L.Levels.li.map(c=>{var h,d,r;return{...c,SuperPartProperties:(r=(d=(h=c.SuperPartProperties)==null?void 0:h.li)==null?void 0:d.map(P=>o(P)))!=null?r:[]}})}})).flat();return m(i,"Name")},H=Q(T),D=(_,u)=>{const s=x(u,_.Gongs.List.Gong,i=>i==="Stages"?["Stages","Stage"]:i);return o({...s,Magic:s.Magic.li,SuperParts:[...s.SuperParts.li,...s.Stages.Stage.map(i=>{var t,e;return(e=(t=i.Necks[0].Neck.SuperParts)==null?void 0:t.li)!=null?e:[]}).flat()],QuenchingMethods:[...s.QuenchingMethods.li,...s.Stages.Stage.map(i=>{var t,e;return(e=(t=i.Necks[0].Neck.QuenchingMethods)==null?void 0:t.li)!=null?e:[]}).flat()],Stages:s.Stages.Stage.map(i=>{var t,e;const n=i.Necks[0].Neck;return o({...i,Necks:o({...n,QuenchingMethods:(t=n.QuenchingMethods)==null?void 0:t.li,SuperParts:(e=n.SuperParts)==null?void 0:e.li})})})})},k=async()=>{const _=await Promise.all([g("Practice/Gong/Body/Body_Gong_1"),g("Practice/Gong/Body/Body_Gong_2"),g("Practice/Gong/Body/Body_Gong_3"),g("Practice/Gong/Body/Body_Gong_5")]),s=(await Promise.all([l("Practice/Gong/Body/Body_Gong_1"),l("Practice/Gong/Body/Body_Gong_2"),l("Practice/Gong/Body/Body_Gong_3"),l("Practice/Gong/Body/Body_Gong_5")])).map(n=>v([`${B}Name`],n.Texts.List.Text)),i=_.map((n,t)=>D(n,s[t])).map(n=>({...v(["Magic","GongKind","Hide","ElementKind","SelectDesc","FiveBaseNeed","Stages"],n)}));return m(i,"Name")},R=Q(k),O=({Name:_,...u})=>u.AddV?{Name:_,AddV:Number.parseFloat(u.AddV)}:u.AddP?{Name:_,AddP:Number.parseFloat(u.AddP)}:{Name:_,BAddV:Number.parseFloat(u.BAddV)},N={QuenchingLabel_Lv0_Brain:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Eye:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Ear:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Nose:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Mouth:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Throat:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Heart:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Liver:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Spleen:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Lung:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Kidney:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Stomach:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Intestines:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Genitals:{inherits:["QuenchingLabel_Lv0_Base_Organ"]},QuenchingLabel_Lv0_Spine:{inherits:["QuenchingLabel_Lv0_Base_Bone"]}},j={Brain:{include:["QuenchingLabel_Lv0_Brain"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},LeftEye:{include:["QuenchingLabel_Lv0_Eye"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},RightEye:{include:["QuenchingLabel_Lv0_Eye"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},LeftEar:{include:["QuenchingLabel_Lv0_Ear"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},RightEar:{include:["QuenchingLabel_Lv0_Ear"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Nose:{include:["QuenchingLabel_Lv0_Nose"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Mouth:{include:["QuenchingLabel_Lv0_Mouth"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Throat:{include:["QuenchingLabel_Lv0_Throat"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Heart:{include:["QuenchingLabel_Lv0_Heart"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Liver:{include:["QuenchingLabel_Lv0_Liver"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Spleen:{include:["QuenchingLabel_Lv0_Spleen"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Lung:{include:["QuenchingLabel_Lv0_Lung"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Kidney:{include:["QuenchingLabel_Lv0_Kidney"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Stomach:{include:["QuenchingLabel_Lv0_Stomach"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Intestines:{include:["QuenchingLabel_Lv0_Intestines"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Genitals:{include:["QuenchingLabel_Lv0_Genitals"],exclude:["QuenchingLabel_Lv0_Base_Organ"]},Spine:{include:["QuenchingLabel_Lv0_Spine"],exclude:["QuenchingLabel_Lv0_Base_Bone"]}},C=["BQLabel_LOST"],F=async()=>{const[_,u,s]=await Promise.all([g("Practice/BodyPractice/LabelCache/LabelCache"),g("Practice/BodyPractice/QuenchingLabel/QuenchingLabel"),l("Practice/BodyPractice/QuenchingLabel/QuenchingLabel")]),i=_.BPLabelCacheDefs.List.Def.reduce((a,L)=>{if(L&&L.Labels){const c=L[`${B}Name`],h=d=>({...o(d),CacheName:c});return L.Labels.li.forEach(d=>{const r=h(d);a[r.Label]=r}),a}else return a},{}),n=u.BodyQuenchingLabelDefs.List.Def.map(a=>{var c;return{...o(a),Modifier:[a.Modifier],SuperPartProperties:(c=a.SuperPartProperties)==null?void 0:c.li.map(h=>O(o(h)))}}),t=y(A("Name"),s.Texts.List.Text.map(a=>E(`${B}Name`,"Name",a))),p=n.filter(a=>!!a&&!C.includes(a.Name)).map(a=>({...a,...t[a.Name],...i[a.Name]})).map((a,L,c)=>N[a.Name]?N[a.Name].inherits.map(r=>c.find(P=>P.Name===r)).filter(r=>r).reduce((r,P)=>{var f,S;const G=[...r.Modifier,...P.Modifier].filter(b=>b&&!$(b)),M=[...(f=r==null?void 0:r.SuperPartProperties)!=null?f:[],...(S=P==null?void 0:P.SuperPartProperties)!=null?S:[]].filter(b=>b);return{...r,Modifier:G,SuperPartProperties:M}},a):a);return m(p,"Name")},w=Q(F),K=async()=>{const _=await Promise.all([g("Modifiers/BodyPractice/Modifier_BodyPractice_QuenchingLabel"),g("Modifiers/BodyPractice/Modifier_BodyPractice_SuperPart")]),u=await Promise.all([l("Property/BodyPraticeProperty"),l("Property/FightProperty"),l("Property/PracticeProperty"),l("Property/RoleProperty")]),s=await Promise.all([l("Modifiers/BodyPractice/Modifier_BodyPractice_QuenchingLabel"),l("Modifiers/BodyPractice/Modifier_BodyPractice_SuperPart")]),i=y(e=>e.Name,s.flatMap(e=>e.Texts.List.Text).map(e=>o(e))),n=y(e=>e.Name,u.flatMap(e=>e.Texts.List.Text.map(p=>o(p)))),t=_.flatMap(e=>e.ModifierDefs.List.Modifier).map(e=>({...o(e),Properties:e.Properties.li.map(p=>{const a=O(o(p));return{...a,...n[a.Name]}}),...i[e[`${B}Name`]]}));return m(t,"Name")},V=Q(K);export{j as T,R as b,w as l,V as m,H as s};
