"use strict";(self.webpackChunksakai=self.webpackChunksakai||[]).push([[267],{6267:(K,f,t)=>{t.r(f),t.d(f,{LeaveRuleModule:()=>Y});var c=t(9808),a=t(2382),p=t(8952),s=t(845),u=t(1424),M=t(2841),m=t(5787),J=t(6526),g=t(4036),y=t(8185),h=t(7773),B=t(4776),L=t(8018),R=t(4534),D=t(5315),A=t(4423),S=t(7010),b=t(3407),F=t(9603),C=t(5652),Z=t(405),I=t(3611),v=t(2047);class P{}var e=t(1223),j=t(4004),U=t(520);let N=(()=>{class i{constructor(n){this.http=n}getPaidLeaveRule(){return this.http.get("/api/paidLeaveRules/current")}addPaidLeaveRule(n){return this.http.post("/api/paidLeaveRules",n).pipe((0,j.U)(l=>l))}}return i.\u0275fac=function(n){return new(n||i)(e.LFG(U.eN))},i.\u0275prov=e.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var T=t(657);let z=(()=>{class i{constructor(n,l,r){this.paidLeaveRuleService=n,this.Router=l,this.fb=r,this.ifDistrictSameBoolean=!0,this.ifDistrictDifferentBoolean=!0}ngOnInit(){this.paidLeaveRuleForm=this.fb.group({ifDistrictDifferent:["",[a.kI.required]],ifDistrictSame:["",[a.kI.required]]}),this.paidLeaveRuleService.getPaidLeaveRule().subscribe(n=>{this.paidLeaveRuleForm.patchValue({ifDistrictSame:n.ifDistrictSame,ifDistrictDifferent:n.ifDistrictDifferent}),console.log(this.paidLeaveRuleForm.value),console.log(n.name),console.log(this.paidLeaveRuleForm.value)})}Click(){this.ifDistrictDifferentBoolean=!this.ifDistrictDifferentBoolean,this.ifDistrictSameBoolean=!this.ifDistrictSameBoolean}SaveParameters(){const n=new P;n.ifDistrictDifferent=this.paidLeaveRuleForm.value.ifDistrictDifferent,n.ifDistrictSame=this.paidLeaveRuleForm.value.ifDistrictSame,this.paidLeaveRuleService.addPaidLeaveRule(n).subscribe(()=>{this.Click(),alert("Saved Successfully")})}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(N),e.Y36(v.F0),e.Y36(a.qu))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-leave-rule"]],decls:23,vars:5,consts:[[1,"card","p-fluid"],[3,"formGroup"],["f","ngForm"],[1,"field","grid"],["htmlFor","a",1,"col-12","mb-2","md:col-2","md:mb-0"],[1,"col-12","md:col-6"],["pInputText","","id","ifDistrictSame","formControlName","ifDistrictSame","pKeyFilter","int","maxlength","2",3,"ngModel","ngModelChange"],["htmlFor","name3",1,"col-12","mb-2","md:col-2","md:mb-0"],["htmlFor","b",1,"col-12","mb-2","md:col-2","md:mb-0"],["pInputText","","id","ifDistrictDifferent","formControlName","ifDistrictDifferent","pKeyFilter","int","maxlength","2",3,"ngModel","ngModelChange"],[1,"flex","justify-content-center"],[1,"flex","justify-content-center","col-12","mb-2","md:col-2"],["pButton","","pRipple","","label","Edit","icon","pi pi-pencil",1,"p-button-plain","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","Save","icon","pi pi-save",1,"p-button-raised",3,"click"]],template:function(n,l){1&n&&(e.TgZ(0,"div",0)(1,"h5"),e._uU(2,"Leaves According to District"),e.qZA(),e.TgZ(3,"form",1,2)(5,"div",3)(6,"label",4),e._uU(7,"If District is Same"),e.qZA(),e.TgZ(8,"div",5)(9,"input",6),e.NdJ("ngModelChange",function(d){return l.paidLeaveRuleForm.value.ifDistrictSame=d}),e.qZA()(),e.TgZ(10,"label",7),e._uU(11,"Leaves"),e.qZA()(),e.TgZ(12,"div",3)(13,"label",8),e._uU(14,"If District is Different"),e.qZA(),e.TgZ(15,"div",5)(16,"input",9),e.NdJ("ngModelChange",function(d){return l.paidLeaveRuleForm.value.ifDistrictDifferent=d}),e.qZA()(),e.TgZ(17,"label",7),e._uU(18,"Leaves"),e.qZA()(),e.TgZ(19,"div",10)(20,"div",11)(21,"button",12),e.NdJ("click",function(){return l.Click()}),e.qZA(),e.TgZ(22,"button",13),e.NdJ("click",function(){return l.SaveParameters()}),e.qZA()()()()()),2&n&&(e.xp6(3),e.Q6J("formGroup",l.paidLeaveRuleForm),e.xp6(6),e.Q6J("ngModel",l.paidLeaveRuleForm.value.ifDistrictSame),e.uIk("disabled",!!l.ifDistrictSameBoolean||null),e.xp6(7),e.Q6J("ngModel",l.paidLeaveRuleForm.value.ifDistrictDifferent),e.uIk("disabled",!!l.ifDistrictDifferentBoolean||null))},dependencies:[a._Y,a.Fj,a.JJ,a.JL,a.nD,s.Hq,u.o,m.H,a.sg,a.u,T.Fr]}),i})(),V=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[v.Bz.forChild([{path:"",component:z}]),v.Bz]}),i})(),Y=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[c.ez,V,a.u5,p.U$,L.Xt,s.hJ,B.JH,u.j,M.KZ,m.T,J.q4,g.kW,y.q,h.EV,R.V,c.ez,p.U$,A.O,a.u5,s.hJ,m.T,h.EV,R.V,L.Xt,u.j,b.A,g.kW,F.cc,S.L$,D.S,C._8,Z.k,I.aO.forRoot(),F.cc,S.L$,D.S,C._8,Z.k,u.j,a.u5,a.UX,T.kK]}),i})()}}]);