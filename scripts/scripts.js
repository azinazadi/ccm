var fs = require('hexo-fs');
var path = require('path');
var ejs = require('ejs');

function res_img(...args){
    var path= args[0];
    var img = args[1];
    var alt= args[2];
    var sizes = args[3];
    var classes = args[4] || ' ';
    console.log(args);
    console.log(classes);
    var ress = "1920 1600 1366 1024 768 640 400 320 160".split(' ');
    var ret="<img src='"+ hexo.config.root + path + img + "' \n";
    ret += "\n class='" + classes + "'";
    ret += "\n alt='" + alt + "'";
    ret += "\n srcset='" + ress.map( r => " " + hexo.config.root + path + r + "_" + img + " " + r + "w").join(",\n") + "' ";
    ret += "\n sizes='" + sizes + "'>";
    return ret;
}

hexo.extend.helper.register('cover_img', function(slug, classes= ''){
    var relativeDir = path.join('images', 'posts', slug);
    var thumb = path.join(hexo.source_dir,  relativeDir, 'thumb.jpg');
    console.log(classes);
    if (!fs.ensurePath(thumb)) return "";
    try {

        return res_img(relativeDir+'\\', 'thumb.jpg' , "Cover for "+slug,  "(max-width: 450px) 100vw, (max-width: 1200px) 50vw, 600px", classes);
        // var photos = files.map(f => relativeDir + '/' + 'small_'+f)
    } catch (e) {
        if (hexo.env.debug) console.log(e);
        return ''
    }

});


hexo.extend.helper.register('res_img', function(...args) {
    return res_img(...args);
});

hexo.extend.helper.register('gallery', function(slug) {
    var relativeDir = path.join('images', 'posts', slug, 'gallery');

    var dir = path.join(hexo.source_dir,  relativeDir);
    if (!fs.exists(dir)) return "";
    var themePath = path.join(hexo.theme_dir, 'layout', '_partial', 'top-gal.ejs');

    if (hexo.env.debug) {
        console.log('[Autogallery] Running autogallery on ' +  dir + ', using layout ' + themePath);
    }

    try {
        var files = fs.listDirSync(dir);
        var template = fs.readFileSync(themePath);

        var photos = files.map(f => res_img(relativeDir+'\\', f , "A film shot",  "(max-width: 450px) 100vw, (max-width: 1200px) 50vw, 600px"));
        // var photos = files.map(f => relativeDir + '/' + 'small_'+f)

        return ejs.render(template, {
            photos: photos,
            path: relativeDir,
            config: hexo.config
        })

    } catch (e) {
        if (hexo.env.debug) console.log(e);
        return ''
    }
});