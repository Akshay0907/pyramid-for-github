"use strict";(self.webpackChunksakai=self.webpackChunksakai||[]).push([[166],{8166:(z,y,a)=>{a.r(y),a.d(y,{HolidayModuleModule:()=>K});var m=a(9808),_=a(2047),d=a(2382),r=a(9783);class p{}var t=a(1223),g=a(4004),f=a(520);let w=(()=>{class i{constructor(e){this.http=e}getHolidayList(){return this.http.get("/api/holidays").pipe((0,g.U)(e=>e))}createHoliday(e){return this.http.post("/api/holidays",e)}updateHoliday(e,o){return this.http.put(`/api/holidays/${e}`,o).pipe((0,g.U)(l=>l))}deleteHolidays(e){return this.http.delete(`/api/holidays/${e}`).pipe((0,g.U)(o=>o))}}return i.\u0275fac=function(e){return new(e||i)(t.LFG(f.eN))},i.\u0275prov=t.Yz7({token:i,factory:i.\u0275fac,providedIn:"root"}),i})();var c=a(8952),H=a(7773),v=a(4534),b=a(845),Z=a(1424),T=a(3407),x=a(5315),C=a(5787),A=a(5652),D=a(4119);function N(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"div",17)(1,"button",18),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.openNew(l.holiday))}),t.qZA(),t.TgZ(2,"button",19),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.deleteSelectedProducts(l.selectedHolidays))}),t.qZA()()}if(2&i){const e=t.oxw();t.xp6(2),t.Q6J("disabled",!e.selectedHolidays||!e.selectedHolidays.length)}}function L(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"div",20)(1,"h5",21),t._uU(2,"Holiday List"),t.qZA(),t.TgZ(3,"span",22),t._UZ(4,"i",23),t.TgZ(5,"input",24),t.NdJ("input",function(l){t.CHM(e);const s=t.oxw(),u=t.MAs(7);return t.KtG(s.onGlobalFilter(u,l))}),t.qZA()()()}}function U(i,n){1&i&&(t.TgZ(0,"tr")(1,"th",25),t._UZ(2,"p-tableHeaderCheckbox"),t.qZA(),t.TgZ(3,"th",26),t._uU(4,"Holiday Name"),t.qZA(),t.TgZ(5,"th",27),t._uU(6,"Holiday Description "),t.qZA(),t.TgZ(7,"th",28),t._uU(8,"Holiday Date "),t._UZ(9,"p-sortIcon",29),t.qZA(),t._UZ(10,"th"),t.qZA())}function S(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"tr")(1,"td"),t._UZ(2,"p-tableCheckbox",30),t.qZA(),t.TgZ(3,"td",31)(4,"span",32),t._uU(5,"Holiday Name"),t.qZA(),t._uU(6),t.qZA(),t.TgZ(7,"td",31)(8,"span",32),t._uU(9,"Holiday Discription"),t.qZA(),t._uU(10),t.qZA(),t.TgZ(11,"td",31)(12,"span",32),t._uU(13,"Holiday Date"),t.qZA(),t._uU(14),t.qZA(),t.TgZ(15,"td")(16,"div",33)(17,"button",34),t.NdJ("click",function(){const s=t.CHM(e).$implicit,u=t.oxw();return t.KtG(u.editHoliday(s))}),t.qZA(),t.TgZ(18,"button",35),t.NdJ("click",function(){const s=t.CHM(e).$implicit,u=t.oxw();return t.KtG(u.deleteHoliday(s))}),t.qZA()()()()}if(2&i){const e=n.$implicit;t.xp6(2),t.Q6J("value",e),t.xp6(4),t.hij(" ",e.name," "),t.xp6(4),t.hij(" ",e.description," "),t.xp6(4),t.hij(" ",e.date," ")}}function J(i,n){1&i&&(t.TgZ(0,"div",47),t._uU(1," This input filed is not valid."),t.qZA())}function M(i,n){1&i&&(t.TgZ(0,"div",47),t._uU(1," This input filed is not valid."),t.qZA())}function q(i,n){1&i&&(t.TgZ(0,"div",47),t._uU(1," This input filed is not valid."),t.qZA())}const F=function(i){return{"ng-invalid ng-dirty":i}};function k(i,n){if(1&i&&(t.TgZ(0,"form",36),t._UZ(1,"img",37),t.TgZ(2,"div",38)(3,"label",39),t._uU(4,"Holiday Name"),t.qZA(),t._UZ(5,"input",40),t.YNc(6,J,2,0,"div",41),t.qZA(),t.TgZ(7,"div",42)(8,"label",43),t._uU(9,"Holiday Description"),t.qZA(),t._UZ(10,"textarea",44),t.YNc(11,M,2,0,"div",41),t.qZA(),t.TgZ(12,"div",42)(13,"label",45),t._uU(14,"Date "),t.qZA(),t._UZ(15,"p-calendar",46),t.YNc(16,q,2,0,"div",41),t.qZA()()),2&i){const e=t.oxw();t.Q6J("formGroup",e.addHolidayForm),t.xp6(1),t.MGl("src","assets/layout/images/","pyramidlogo",".jpg",t.LSH),t.xp6(4),t.Q6J("ngClass",t.VKq(8,F,e.submitted&&!e.addHolidayForm.value.name)),t.xp6(1),t.Q6J("ngIf",!e.addHolidayForm.controls.name.valid&&e.addHolidayForm.controls.name.touched),t.xp6(5),t.Q6J("ngIf",!e.addHolidayForm.controls.description.valid&&e.addHolidayForm.controls.description.touched),t.xp6(4),t.Q6J("showIcon",!0)("ngClass",t.VKq(10,F,e.submitted&&!e.addHolidayForm.value.date)),t.xp6(1),t.Q6J("ngIf",!e.addHolidayForm.controls.date.valid&&e.addHolidayForm.controls.date.touched&&!e.addHolidayForm.controls.date&&e.submitted)}}function I(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"button",48),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.hideDialog())}),t.qZA(),t.TgZ(1,"button",49),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.saveProduct())}),t.qZA()}if(2&i){const e=t.oxw();t.xp6(1),t.Q6J("disabled",e.addHolidayForm.invalid)}}function P(i,n){if(1&i&&(t.TgZ(0,"span"),t._uU(1,"Are you sure you want to delete "),t.TgZ(2,"b"),t._uU(3),t.qZA(),t._uU(4,"?"),t.qZA()),2&i){const e=t.oxw();t.xp6(3),t.Oqu(e.holidayObjectForDelete.name)}}function j(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"button",50),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.deleteholidayDialog=!1)}),t.qZA(),t.TgZ(1,"button",51),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.confirmDelete())}),t.qZA()}}function O(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"button",50),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.deleteProductsDialog=!1)}),t.qZA(),t.TgZ(1,"button",51),t.NdJ("click",function(){t.CHM(e);const l=t.oxw();return t.KtG(l.confirmDeleteSelected())}),t.qZA()}}const B=function(){return["name","discription","date"]},G=function(){return[10,20,30]},h=function(){return{width:"450px"}};let Y=(()=>{class i{constructor(e,o){this.messageService=e,this.holidayService=o,this.cols=[],this.holidays=[],this.demolist=[],this.selectedHolidays=[],this.deleteholidayDialog=!1,this.deleteProductsDialog=!1,this.holidayDialog=!1,this.submitted=!1,this.selectedProducts=[],this.holidayObject=new p,this.holidayObjectForEdit=new p,this.holidayObjectForDelete=new p,this.holidayDialogForEdit=!1,this.holidayObjectForSelectedDelete="",this.editBoolean=!1}ngOnInit(){this.getHoliday(),this.addHolidayForm=new d.cw({id:new d.NI(""),name:new d.NI("",[d.kI.required,d.kI.maxLength(20)]),description:new d.NI("",[d.kI.maxLength(40)]),date:new d.NI("",[d.kI.required])})}getHoliday(){this.selectedHolidays=[],this.holidayService.getHolidayList().subscribe(e=>{this.demolist=e})}openNew(e){this.submitted=!1,this.holidayDialog=!0,this.getHoliday()}editHoliday(e){this.editBoolean=!0,this.forUpdateOrEditHoliday(e),this.holidayDialog=!0,this.getHoliday()}forUpdateOrEditHoliday(e){console.log(e),this.addHolidayForm.patchValue({id:e.id,name:e.name,description:e.description,date:new Date(e.date)}),console.log(this.addHolidayForm)}deleteHoliday(e){this.deleteholidayDialog=!0,this.holidayObjectForDelete=e,this.getHoliday()}onGlobalFilter(e,o){e.filterGlobal(o.target.value,"contains")}deleteSelectedProducts(e){this.deleteIds=[];let o=new Array;e.forEach(l=>o.push(l.id)),this.deleteProductsDialog=!0,this.deleteIds=o,this.getHoliday()}hideDialog(){this.addHolidayForm.reset(),this.holidayDialog=!1,this.submitted=!1,this.editBoolean=!1}extractValues(e){e.name=this.addHolidayForm.value.name,e.description=this.addHolidayForm.value.description,e.date=this.addHolidayForm.value.date}saveProduct(){if(console.log(this.addHolidayForm.value),0==this.editBoolean){this.submitted=!0;const e=new p;this.extractValues(e),console.log(e),this.holidayService.createHoliday(e).subscribe(o=>{this.holidayDialog=!1,this.messageService.add({severity:"success",summary:"Successful",detail:"Holiday Saved",life:3e3}),this.getHoliday()},o=>console.log(o)),this.getHoliday()}if(1==this.editBoolean){this.submitted=!0;const e=new p;this.extractValues(e),console.log(e),this.holidayService.updateHoliday(this.addHolidayForm.value.id,e).subscribe(o=>{this.holidayDialog=!1,this.messageService.add({severity:"success",summary:"Successful",detail:"Holiday Saved",life:3e3}),this.getHoliday(),this.editBoolean=!1},o=>console.log(o))}}confirmDeleteSelected(){this.deleteProductsDialog=!1,this.holidayService.deleteHolidays(this.deleteIds).subscribe(e=>{this.messageService.add({severity:"success",summary:"Successful",detail:"Products Deleted",life:3e3})},e=>console.log(e)),setTimeout(()=>{console.log(this.selectedProducts.length),this.getHoliday()},100)}confirmDelete(){this.deleteholidayDialog=!1,this.holidayService.deleteHolidays(this.holidayObjectForDelete.id).subscribe(),this.messageService.add({severity:"success",summary:"Successful",detail:"Product Deleted",life:3e3}),setTimeout(()=>{this.getHoliday()},100)}saveHolidayForEdit(e,o){this.holidayService.updateHoliday(e,o).subscribe(l=>{o=l,this.holidayDialog=!1,this.getHoliday()},l=>console.log(l)),this.getHoliday()}}return i.\u0275fac=function(e){return new(e||i)(t.Y36(r.ez),t.Y36(w))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-holiday-list"]],features:[t._Bn([r.YP,r.ez])],decls:25,vars:28,consts:[[1,"grid"],[1,"col-12"],[1,"card","px-6","py-6"],["styleClass","mb-4"],["pTemplate","left"],["responsiveLayout","scroll","currentPageReportTemplate","Showing {first} to {last} of {totalRecords} entries","selectionMode","multiple","dataKey","id",3,"value","columns","rows","globalFilterFields","paginator","rowsPerPageOptions","showCurrentPageReport","selection","rowHover","selectionChange"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["header","Holiday Details",1,"p-fluid",3,"visible","modal","visibleChange","onHide"],["pTemplate","content"],["pTemplate","footer"],["header","Confirm",3,"visible","modal","visibleChange"],[1,"flex","align-items-center","justify-content-center"],[1,"pi","pi-exclamation-triangle","mr-3",2,"font-size","2rem"],[4,"ngIf"],[1,"my-2"],["pButton","","pRipple","","label","New","icon","pi pi-plus",1,"p-button-success","mr-2",3,"click"],["pButton","","pRipple","","label","Delete","icon","pi pi-trash",1,"p-button-danger",3,"disabled","click"],[1,"flex","flex-column","md:flex-row","md:justify-content-between","md:align-items-center"],[1,"m-0"],[1,"block","mt-2","md:mt-0","p-input-icon-left"],[1,"pi","pi-search"],["pInputText","","type","text","placeholder","Search...",1,"w-full","sm:w-auto",3,"input"],[2,"width","3rem"],["pSortableColumn","name"],["pSortableColumn","description"],["pSortableColumn","date"],["field","date"],[3,"value"],[2,"width","25%","min-width","10rem"],[1,"p-column-title"],[1,"flex"],["pButton","","pRipple","","icon","pi pi-pencil","pTooltip","Edit",1,"p-button-rounded","p-button-success","mr-2",3,"click"],["pButton","","pRipple","","icon","pi pi-trash","pTooltip","Delete",1,"p-button-rounded","p-button-warning",3,"click"],[3,"formGroup"],["width","150",1,"mt-0","mx-auto","mb-5","block","shadow-2",3,"src"],[1,"field","mt-7"],["for","name"],["type","text","pInputText","","id","name","formControlName","name","required","","autofocus","",3,"ngClass"],["style","color: red;",4,"ngIf"],[1,"field","mt-5"],["for","description"],["id","description","pInputTextarea","","formControlName","description","required","","rows","3","cols","20"],["for","date"],["id","date","formControlName","date",3,"showIcon","ngClass"],[2,"color","red"],["pButton","","pRipple","","label","Cancel","icon","pi pi-times",1,"p-button-text",3,"click"],["pButton","","pRipple","","label","Save","icon","pi pi-check",1,"p-button-text",3,"disabled","click"],["pButton","","pRipple","","icon","pi pi-times","label","No",1,"p-button-text",3,"click"],["pButton","","pRipple","","icon","pi pi-check","label","Yes",1,"p-button-text",3,"click"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"p-toast"),t.TgZ(4,"p-toolbar",3),t.YNc(5,N,3,1,"ng-template",4),t.qZA(),t.TgZ(6,"p-table",5,6),t.NdJ("selectionChange",function(s){return o.selectedHolidays=s}),t.YNc(8,L,6,0,"ng-template",7),t.YNc(9,U,11,0,"ng-template",8),t.YNc(10,S,19,4,"ng-template",9),t.qZA()(),t.TgZ(11,"p-dialog",10),t.NdJ("visibleChange",function(s){return o.holidayDialog=s})("onHide",function(){return o.hideDialog()}),t.YNc(12,k,17,12,"ng-template",11),t.YNc(13,I,2,1,"ng-template",12),t.qZA(),t.TgZ(14,"p-dialog",13),t.NdJ("visibleChange",function(s){return o.deleteholidayDialog=s}),t.TgZ(15,"div",14),t._UZ(16,"i",15),t.YNc(17,P,5,1,"span",16),t.qZA(),t.YNc(18,j,2,0,"ng-template",12),t.qZA(),t.TgZ(19,"p-dialog",13),t.NdJ("visibleChange",function(s){return o.deleteProductsDialog=s}),t.TgZ(20,"div",14),t._UZ(21,"i",15),t.TgZ(22,"span"),t._uU(23,"Are you sure you want to delete selected products?"),t.qZA()(),t.YNc(24,O,2,0,"ng-template",12),t.qZA()()()),2&e&&(t.xp6(6),t.Q6J("value",o.demolist)("columns",o.cols)("rows",10)("globalFilterFields",t.DdM(23,B))("rows",10)("paginator",!0)("rowsPerPageOptions",t.DdM(24,G))("showCurrentPageReport",!0)("selection",o.selectedHolidays)("rowHover",!0),t.xp6(5),t.Akn(t.DdM(25,h)),t.Q6J("visible",o.holidayDialog)("modal",!0),t.xp6(3),t.Akn(t.DdM(26,h)),t.Q6J("visible",o.deleteholidayDialog)("modal",!0),t.xp6(3),t.Q6J("ngIf",o.holidayObject),t.xp6(2),t.Akn(t.DdM(27,h)),t.Q6J("visible",o.deleteProductsDialog)("modal",!0))},dependencies:[m.mk,m.O5,c.iA,r.jx,c.lQ,c.fz,c.UA,c.Mo,H.FN,v.o,b.Hq,Z.o,T.g,d._Y,d.Fj,d.JJ,d.JL,d.Q7,x.V,C.H,A.f,d.sg,d.u,D.u],styles:["p-dialog[_ngcontent-%COMP%]{width:80vw;height:70vh}p-calendar[_ngcontent-%COMP%]{width:calc(100% - 10vw);height:calc(100% - 20vh)}"]}),i})(),Q=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[_.Bz.forChild([{path:"",component:Y}]),_.Bz]}),i})();var R=a(4423),E=a(4297);let K=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({providers:[r.ez],imports:[m.ez,Q,c.U$,H.EV,v.V,R.O,Z.j,T.A,d.u5,f.JF,E.d,x.S,b.hJ,C.T,A._8,d.UX,D.z]}),i})()}}]);