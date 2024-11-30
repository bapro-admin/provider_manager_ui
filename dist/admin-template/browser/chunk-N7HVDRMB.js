import{A as ge,B as he,C as Ce,D as Me,E as _e,F as Se,G as Ue,H as be,I as ve,a as B,b as P,c as j,d as H,e as V,f as q,g as G,h as $,i as z,j as J,k as K,m as Q,n as W,o as X,q as Y,r as Z,s as ee,t as te,u as ie,v as re,w as ue,x as pe,z as fe}from"./chunk-3DMHSWZL.js";import{K as Ee,q as L,u as b,w as v}from"./chunk-ZWJOQXN4.js";import{O as A,S as ne,T as E,V as oe,W as ae,_ as se,aa as le,ba as me,fa as de,ha as ce}from"./chunk-BTRDCSZN.js";import{Ba as O,Ca as w,Cb as m,Gb as d,Kb as g,Pb as o,Qb as r,Rb as p,Sb as h,Tb as C,Vb as T,Yb as M,_b as y,dd as I,ed as N,jc as a,kb as l,lb as u,lc as S,ma as x,qa as _,rc as U,wc as k,yc as F}from"./chunk-VWWPF74O.js";function Oe(e,t){e&1&&(o(0,"mat-error"),a(1," El nombre de usuario es obligatorio. "),r())}function we(e,t){e&1&&(o(0,"mat-error"),a(1," Debe ser un correo electr\xF3nico v\xE1lido. "),r())}function Te(e,t){e&1&&(o(0,"mat-error"),a(1," La contrase\xF1a es obligatoria. "),r())}var De=(()=>{let t=class t{constructor(n){this.fb=n,this.dialogRef=x(X),this.userForm=this.fb.group({username:["",[E.required,E.email]],password:["",E.required],role:[{value:"OPERATOR",disabled:!0}]})}onNoClick(){this.dialogRef.close()}saveUserData(){this.userForm.valid&&this.dialogRef.close(this.userForm.getRawValue())}};t.\u0275fac=function(i){return new(i||t)(u(de))},t.\u0275cmp=_({type:t,selectors:[["app-user-mgmt-dialog"]],standalone:!0,features:[U],decls:30,vars:6,consts:[["mat-dialog-title",""],[3,"formGroup"],[1,"row","mt-2"],[1,"col-12"],["appearance","outline",1,"full-width"],["matInput","","formControlName","username"],["appearance","outline",1,"full-width","mt-2"],["matInput","","formControlName","password"],["formControlName","role",3,"disabled"],["value","OPERATOR"],["mat-button","","mat-dialog-close","","color","warn"],["mat-button","","color","primary",3,"click","disabled"]],template:function(i,s){if(i&1&&(o(0,"h2",0),a(1,"Agregar usuario"),r(),o(2,"mat-dialog-content")(3,"form",1)(4,"div",2)(5,"div",3)(6,"mat-form-field",4)(7,"mat-label"),a(8,"Nombre de usuario"),r(),p(9,"input",5),m(10,Oe,2,0,"mat-error")(11,we,2,0,"mat-error"),r()(),o(12,"div",3)(13,"mat-form-field",6)(14,"mat-label"),a(15,"Password"),r(),p(16,"input",7),m(17,Te,2,0,"mat-error"),r()(),o(18,"div",3)(19,"mat-form-field",4)(20,"mat-label"),a(21,"Rol"),r(),o(22,"mat-select",8)(23,"mat-option",9),a(24,"Operador"),r()()()()()()(),o(25,"mat-dialog-actions")(26,"button",10),a(27,"Cancelar"),r(),o(28,"button",11),M("click",function(){return s.saveUserData()}),a(29,"Guardar"),r()()),i&2){let f,D,R;l(3),d("formGroup",s.userForm),l(7),g((f=s.userForm.get("username"))!=null&&f.hasError("required")?10:-1),l(),g((D=s.userForm.get("username"))!=null&&D.hasError("email")?11:-1),l(6),g((R=s.userForm.get("password"))!=null&&R.hasError("required")?17:-1),l(5),d("disabled",!0),l(6),d("disabled",s.userForm.invalid)}},dependencies:[ge,fe,ue,pe,Ce,he,ce,se,ne,oe,ae,le,me,v,b,ee,te,ie,Z,_e,Me,L],styles:[".full-width[_ngcontent-%COMP%]{width:100%}"]});let e=t;return e})();function ye(e,t){e&1&&(o(0,"th",12),a(1," Nombre de Usuario "),r())}function ke(e,t){if(e&1&&(o(0,"td",13),a(1),r()),e&2){let c=t.$implicit;l(),S(" ",c.username," ")}}function Fe(e,t){e&1&&(o(0,"th",12),a(1," Rol "),r())}function Ie(e,t){if(e&1&&(o(0,"td",13),a(1),r()),e&2){let c=t.$implicit;l(),S(" ",c.role," ")}}function Ne(e,t){e&1&&(o(0,"th",12),a(1," Fecha de Creaci\xF3n "),r())}function Ae(e,t){if(e&1&&(o(0,"td",13),a(1),k(2,"date"),r()),e&2){let c=t.$implicit;l(),S(" ",F(2,1,c.created_at,"dd/MM/yyyy")," ")}}function Le(e,t){e&1&&(o(0,"th",12),a(1," Acciones "),r())}function Be(e,t){if(e&1){let c=T();o(0,"td",13)(1,"mat-icon",14),M("click",function(){let i=O(c).$implicit,s=y();return w(s.deleteUserDialog(i.id_user))}),r()()}}function Pe(e,t){e&1&&p(0,"tr",15)}function je(e,t){e&1&&p(0,"tr",16)}function He(e,t){e&1&&(o(0,"mat-card",11)(1,"mat-card-content")(2,"h3"),p(3,"mat-icon",17),a(4," No tienes usuarios registrados "),r()()())}var Ct=(()=>{let t=class t{constructor(n,i,s,f){this.userServ=n,this.snackBar=i,this.dialog=s,this.sessionServ=f,this.displayedColumns=["username","role","creationdate","actions"],this.dataSource=[],this.usersList=[],this.currentUser="",this.registeredUsersCount=0,this.maxUsers=20}ngOnInit(){let n=this.sessionServ.getUser();this.currentUser=n.username,this.retrieveUsers()}ngOnDestroy(){this.dialog.closeAll()}addUser(){if(this.registeredUsersCount>=this.maxUsers){this.openSnackbar(`El n\xFAmero m\xE1ximo de usuarios es ${this.maxUsers}. No puedes agregar m\xE1s.`,"Ok");return}this.dialog.open(De,{}).afterClosed().subscribe(i=>{if(i){let s=i;this.createUser(s)}})}deleteUserDialog(n){this.dialog.open(re,{data:{title:"Eliminar Usuario",message:"\xBFSeguro que quieres eliminar este usuario?"}}).afterClosed().subscribe(s=>{s&&this.deleteUser(n)})}createUser(n){this.userServ.createUser(n).subscribe(()=>{console.log("USUARIO CREADO CORRECTAMENTE"),this.openSnackbar("Se gener\xF3 el usuario correctamente","Ok"),this.retrieveUsers()},i=>{console.log("ERROR ON LIST USERS ",i),this.openSnackbar("Ocurri\xF3 un error al obtener a los usuarios","Ok")})}deleteUser(n){this.userServ.deleteUser(n).subscribe(()=>{console.log("USUARIO BORRADO CORRECTAMENTE"),this.openSnackbar("Se elimin\xF3 el usuario correctamente","Ok"),this.retrieveUsers()},i=>{console.log("ERROR ON DELETE USER ",i),this.openSnackbar("Ocurri\xF3 un error al eliminar el usuario","Ok")})}retrieveUsers(){this.userServ.listUsers().subscribe(n=>{this.usersList=n.users,this.usersList=this.usersList.filter(i=>i.username!==this.currentUser),this.dataSource=this.usersList,this.registeredUsersCount=this.usersList.length},n=>{console.log("ERROR ON LIST USERS ",n),this.openSnackbar("Ocurri\xF3 un error al obtener a los usuarios","Ok")})}openSnackbar(n,i){this.snackBar.open(n,i,{duration:3e3})}};t.\u0275fac=function(i){return new(i||t)(u(ve),u(Ee),u(Y),u(A))},t.\u0275cmp=_({type:t,selectors:[["app-user-management"]],standalone:!0,features:[U],decls:19,vars:4,consts:[[1,"d-flex","justify-content-end"],["mat-raised-button","",1,"mt-3","mb-4","primary-button",3,"click"],["mat-table","",1,"mat-elevation-z2","mb-4",3,"dataSource"],["matColumnDef","username"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","role"],["matColumnDef","creationdate"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["appearance","outlined",1,"empty-records","d-flex","justify-content-center","align-items-center"],["mat-header-cell",""],["mat-cell",""],["aria-hidden","false","aria-label","Delete user","fontIcon","delete",1,"action-icon",3,"click"],["mat-header-row",""],["mat-row",""],["aria-hidden","false","aria-label","Delete user","fontIcon","report",1,"empty-records-icon"]],template:function(i,s){i&1&&(o(0,"div",0)(1,"button",1),M("click",function(){return s.addUser()}),a(2,"Agregar usuario"),r()(),o(3,"table",2),h(4,3),m(5,ye,2,0,"th",4)(6,ke,2,1,"td",5),C(),h(7,6),m(8,Fe,2,0,"th",4)(9,Ie,2,1,"td",5),C(),h(10,7),m(11,Ne,2,0,"th",4)(12,Ae,3,4,"td",5),C(),h(13,8),m(14,Le,2,0,"th",4)(15,Be,2,0,"td",5),C(),m(16,Pe,1,0,"tr",9)(17,je,1,0,"tr",10),r(),m(18,He,5,0,"mat-card",11)),i&2&&(l(3),d("dataSource",s.dataSource),l(13),d("matHeaderRowDef",s.displayedColumns),l(),d("matRowDefColumns",s.displayedColumns),l(),g(s.usersList.length<=0?18:-1))},dependencies:[K,B,j,G,H,P,$,V,q,z,J,N,I,W,Q,v,b,be,Se,Ue],styles:['@charset "UTF-8";table[_ngcontent-%COMP%]{width:100%}.action-icon[_ngcontent-%COMP%]{cursor:pointer}.primary-button[_ngcontent-%COMP%]{background-color:#212631!important;color:#fff!important}.empty-records[_ngcontent-%COMP%]{min-height:150px;border-radius:0}.empty-records-icon[_ngcontent-%COMP%]{font-size:36px;height:36px;width:36px;line-height:36px}']});let e=t;return e})();export{Ct as UserManagementComponent};