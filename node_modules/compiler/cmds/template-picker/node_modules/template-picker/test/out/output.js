
var template = (function(){

    this.tmpl1=function($data) {
var ret= $data.ret,panelId= $data.panelId,title= $data.title,titleText= $data.titleText,html= $data.html,buttons= $data.buttons,i= $data.i,footerText= $data.footerText,ret = "";ret +=" <header> <button cmd=\"close\" param=\"";
ret +=panelId;
ret +="\" class=\"closeButton\">X</button> <h1 title=\"";
ret +=title;
ret +="\">";
ret +=titleText;
ret +="</h1> </header> <section> ";
ret +=html;
ret +=" </section>";
 if(buttons){ 
ret +=" <footer> ";
 for(var i in buttons){ 
ret +=" <button cmd=\"";
ret +=buttons[i].cmd;
ret +="\" param=\"";
ret +=panelId;
ret +="\" class=\"panelButton\">";
ret +=buttons[i].text;
ret +="</button> ";
 } 
ret +=" </footer>";
 } 
 if(footerText){ 
ret +=" <footer> ";
ret += footerText;
ret +=" </footer>";
 } 
return ret;
}
this.tmpl2=function($data) {
var ret= $data.ret,panelId= $data.panelId,title= $data.title,titleText= $data.titleText,html= $data.html,buttons= $data.buttons,i= $data.i,footerText= $data.footerText,ret = "";ret +=" <header> <button cmd=\"close\" param=\"";
ret +=panelId;
ret +="\" class=\"closeButton\">X</button> <h1 title=\"";
ret +=title;
ret +="\">";
ret +=titleText;
ret +="</h1> </header> <section> ";
ret +=html;
ret +=" </section>";
 if(buttons){ 
ret +=" <footer> ";
 for(var i in buttons){ 
ret +=" <button cmd=\"";
ret +=buttons[i].cmd;
ret +="\" param=\"";
ret +=panelId;
ret +="\" class=\"panelButton\">";
ret +=buttons[i].text;
ret +="</button> ";
 } 
ret +=" </footer>";
 } 
 if(footerText){ 
ret +=" <footer> ";
ret += footerText;
ret +=" </footer>";
 } 
return ret;
}

    return this;
})();
