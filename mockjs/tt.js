var txt = `{"employees" : [
    {"firstname":"Bill","lastname":"Gates"},
    {"firstname":"George","lastname":"Bush"},
    {"firstname":"Thomas","lastname":"Carter"}]}`;
//var obj = eval("(" + txt + ")");//采用eval()不够安全，能够执行一切JS代码
var obj = JSON.parse(txt);
console.log(obj);