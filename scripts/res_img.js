var fs = require('hexo-fs');
var path = require('path');
var ejs = require('ejs');

hexo.extend.helper.register('res_img', function(args) {
    var path= args[0];
    var img = args[1];
    var alt= args[2];
    var sizes = args[3] | "100vw";
    var ress = "1920 1600 1366 1024 768 640 320 160".split(' ');
    var ret="<img src='"+ hexo.config.root + path + img + "' \n";

    ret += "\n alt='" + alt + "'";
    ret += "\n srcset='" + ress.map( r => " " + path + r + "_" + img + " " + r + "vw").join(";\n") + "' ";
    ret += "\n sizes='" + sizes + "'\\>";
    return ret;
});