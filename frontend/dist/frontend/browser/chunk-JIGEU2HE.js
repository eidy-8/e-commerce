import{A as B,B as p,C as S,D as s,E as v,F as c,G as g,H as h,I as f,K as k,L as V,Q as z,R,S as q,T as D,e as C,f as _,h as A,ha as T,i as b,ia as I,ja as N,ka as W,l as w,la as L,m as M,ma as j,na as U,oa as Z,p as d,pa as G,q as u,v as x,w as m,x as E,y as a,z as r}from"./chunk-6DTLE22S.js";var O=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275cmp=w({type:t,selectors:[["app-main-auth"]],decls:3,vars:0,template:function(o,e){o&1&&B(0,"app-header-regular")(1,"router-outlet")(2,"app-footer-regular")},dependencies:[z,U,Z]})}}return t})();var F=(()=>{class t{constructor(){}preventSpace(n){n.code==="Space"&&n.preventDefault()}static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275prov=A({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();var K=t=>({"border-tertiary-color":t});function oe(t,$){if(t&1&&(a(0,"p",12),s(1),r()),t&2){let n=S();d(),v(" ",n.errorMessage," ")}}var Q=(()=>{class t{constructor(n,o,e){this.apiData=n,this.router=o,this.sharedMethod=e,this.unsubscribe=new C,this.loginError=!1}login(){(this.email==null||this.password==null)&&(this.errorMessage="Preencha todos os campos.",this.loginError=!0);let n={email:this.email,password:this.password};this.apiData.postLogin(n).pipe(_(this.unsubscribe)).subscribe({next:o=>{sessionStorage.setItem("Session-Token",o.data.token),this.router.navigate(["/"])},error:o=>{this.errorMessage=o.message,this.loginError=!0}})}static{this.\u0275fac=function(o){return new(o||t)(u(D),u(R),u(F))}}static{this.\u0275cmp=w({type:t,selectors:[["app-login"]],decls:18,vars:9,consts:[[1,"flex","flex-col","items-center"],[1,"text-quaternary-color","text-3xl","mb-20","mt-10","px-2"],[1,"bg-white","shadow-md","rounded","px-8","pb-8","pt-8","lg:w-1/4","md:w-2/4","sm:w-full"],[1,"mb-4"],["for","email",1,"block","text-quaternary-color","text-sm","mb-2"],["name","email","id","email","type","text","placeholder","Insira seu e-mail",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-quaternary-color","leading-tight","focus:outline-none","focus:shadow-outline","transition","duration-500","ease-in-out",3,"ngModelChange","keydown","ngModel","ngClass"],[1,"mb-6"],["for","password",1,"block","text-quaternary-color","text-sm","mb-2"],["name","password","id","password","type","password","placeholder","Insira sua senha",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-quaternary-color","mb-3","leading-tight","focus:outline-none","focus:shadow-outline","transition","duration-500","ease-in-out",3,"ngModelChange","keydown","ngModel","ngClass"],[1,"flex","items-center","justify-between"],["type","button",1,"bg-primary-color","hover:bg-secondary-color","text-white","py-2","px-4","rounded","focus:outline-none","focus:shadow-outline",3,"click"],["href","http://localhost:4200/auth/register",1,"inline-block","align-baseline","text-sm","text-primary-color","hover:text-secondary-color"],[1,"text-tertiary-color","text-xs","italic","mb-4","mt-3"]],template:function(o,e){o&1&&(a(0,"div",0)(1,"p",1),s(2," Digite seu e-mail e senha para iniciar a sess\xE3o "),r(),a(3,"form",2)(4,"div",3)(5,"label",4),s(6,"E-mail"),r(),a(7,"input",5),h("ngModelChange",function(i){return g(e.email,i)||(e.email=i),i}),p("keydown",function(i){return e.sharedMethod.preventSpace(i)}),r()(),a(8,"div",6)(9,"label",7),s(10,"Senha"),r(),a(11,"input",8),h("ngModelChange",function(i){return g(e.password,i)||(e.password=i),i}),p("keydown",function(i){return e.sharedMethod.preventSpace(i)}),r()(),a(12,"div",9)(13,"button",10),p("click",function(){return e.login()}),s(14," Entrar "),r(),a(15,"a",11),s(16," Criar conta "),r()(),x(17,oe,2,1,"p",12),r()()),o&2&&(d(7),c("ngModel",e.email),m("ngClass",f(5,K,e.loginError)),d(4),c("ngModel",e.password),m("ngClass",f(7,K,e.loginError)),d(6),E(17,e.loginError?17:-1))},dependencies:[k,j,T,I,N,L,W]})}}return t})();var P=t=>({"border-tertiary-color":t});function ne(t,$){if(t&1&&(a(0,"p",15),s(1),r()),t&2){let n=S();d(),v(" ",n.errorMessage," ")}}var X=(()=>{class t{constructor(n,o,e){this.apiData=n,this.router=o,this.sharedMethod=e,this.unsubscribe=new C,this.showPassword=!1,this.registerError=!1,this.emailRegisterError=!1,this.passwordRegisterError=!1}togglePasswordVisibility(){this.showPassword=!this.showPassword}register(){if(this.email==null)this.errorMessage="Digite e-mail.",this.emailRegisterError=!0;else if(this.name==null)this.errorMessage="Digite um nome.",this.registerError=!0;else if(this.password==null||this.password.length<8)this.errorMessage="Digite uma senha segura de no m\xEDnimo 8 digitos.",this.passwordRegisterError=!0;else if(!this.validateEmail(this.email))this.errorMessage="Insira um e-mail v\xE1lido.",this.emailRegisterError=!0;else if(this.password!=this.password2)this.errorMessage="As senhas n\xE3o conferem.",this.passwordRegisterError=!0;else{let n={username:this.name,email:this.email,password:this.password};this.apiData.postUser(n).pipe(_(this.unsubscribe)).subscribe({next:o=>{console.log(o.message),this.router.navigate(["auth/login"])},error:o=>{console.log(o),this.errorMessage=o.message,this.registerError=!0,this.emailRegisterError=!0,this.passwordRegisterError=!0}})}}validateEmail(n){return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(n)}static{this.\u0275fac=function(o){return new(o||t)(u(D),u(R),u(F))}}static{this.\u0275cmp=w({type:t,selectors:[["app-register"]],decls:25,vars:19,consts:[[1,"flex","flex-col","items-center"],[1,"text-quaternary-color","text-3xl","mb-20","mt-10","px-2"],[1,"bg-white","shadow-md","rounded","px-8","pb-8","pt-8","lg:w-1/4","md:w-2/4","sm:w-full"],[1,"mb-4"],["for","email",1,"block","text-quaternary-color","text-sm","mb-2"],["name","email","id","email","type","text","placeholder","Insira seu e-mail",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-quaternary-color","leading-tight","focus:outline-none","focus:shadow-outline","transition","duration-500","ease-in-out",3,"ngModelChange","keydown","ngModel","ngClass"],["name","name","id","name","type","text","placeholder","Insira seu nome",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-quaternary-color","leading-tight","focus:outline-none","focus:shadow-outline","transition","duration-500","ease-in-out",3,"ngModelChange","keydown","ngModel","ngClass"],["for","password",1,"block","text-quaternary-color","text-sm","mb-2"],["name","password","id","password","placeholder","Insira sua senha",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-quaternary-color","mb-3","leading-tight","focus:outline-none","focus:shadow-outline","transition","duration-500","ease-in-out",3,"ngModelChange","keydown","ngModel","ngClass","type"],[1,"-translate-x-8","translate-y-2.5","fa","absolute","text-quaternary-color","cursor-pointer",3,"click","ngClass"],[1,"mb-6"],["for","password2",1,"block","text-quaternary-color","text-sm","mb-2"],["name","password2","id","password2","type","password","placeholder","Confirme sua senha",1,"shadow","appearance-none","border","rounded","w-full","py-2","px-3","text-quaternary-color","mb-3","leading-tight","focus:outline-none","focus:shadow-outline","transition","duration-500","ease-in-out",3,"ngModelChange","keydown","ngModel","ngClass"],[1,"flex","items-center","justify-between"],["type","button",1,"bg-primary-color","hover:bg-secondary-color","text-white","py-2","px-4","rounded","focus:outline-none","focus:shadow-outline",3,"click"],[1,"text-tertiary-color","text-xs","italic","mb-4","mt-3"]],template:function(o,e){o&1&&(a(0,"div",0)(1,"p",1),s(2," Preencha os dados para criar sua conta "),r(),a(3,"form",2)(4,"div",3)(5,"label",4),s(6,"E-mail"),r(),a(7,"input",5),h("ngModelChange",function(i){return g(e.email,i)||(e.email=i),i}),p("keydown",function(i){return e.sharedMethod.preventSpace(i)}),r()(),a(8,"div",3)(9,"label",4),s(10,"Nome"),r(),a(11,"input",6),h("ngModelChange",function(i){return g(e.name,i)||(e.name=i),i}),p("keydown",function(i){return e.sharedMethod.preventSpace(i)}),r()(),a(12,"div",3)(13,"label",7),s(14,"Senha"),r(),a(15,"input",8),h("ngModelChange",function(i){return g(e.password,i)||(e.password=i),i}),p("keydown",function(i){return e.sharedMethod.preventSpace(i)}),r(),a(16,"i",9),p("click",function(){return e.togglePasswordVisibility()}),r()(),a(17,"div",10)(18,"label",11),s(19,"Confirme a senha"),r(),a(20,"input",12),h("ngModelChange",function(i){return g(e.password2,i)||(e.password2=i),i}),p("keydown",function(i){return e.sharedMethod.preventSpace(i)}),r()(),a(21,"div",13)(22,"button",14),p("click",function(){return e.register()}),s(23," Criar conta "),r()(),x(24,ne,2,1,"p",15),r()()),o&2&&(d(7),c("ngModel",e.email),m("ngClass",f(11,P,e.emailRegisterError)),d(4),c("ngModel",e.name),m("ngClass",f(13,P,e.registerError)),d(4),c("ngModel",e.password),m("ngClass",f(15,P,e.passwordRegisterError))("type",e.showPassword?"text":"password"),d(),m("ngClass",e.showPassword?"fa-eye":"fa-eye-slash"),d(4),c("ngModel",e.password2),m("ngClass",f(17,P,e.passwordRegisterError)),d(4),E(24,e.registerError||e.emailRegisterError||e.passwordRegisterError?24:-1))},dependencies:[k,j,T,I,N,L,W]})}}return t})();var re=[{path:"",component:O,children:[{path:"login",component:Q},{path:"register",component:X}]}],Y=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=M({type:t})}static{this.\u0275inj=b({imports:[q.forChild(re),q]})}}return t})();var ke=(()=>{class t{static{this.\u0275fac=function(o){return new(o||t)}}static{this.\u0275mod=M({type:t})}static{this.\u0275inj=b({imports:[V,Y,G]})}}return t})();export{ke as AuthModule};
