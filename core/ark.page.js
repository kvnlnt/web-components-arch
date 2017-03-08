(function(ARK) {
    var Page = {};

    Page.init = function(options){
        var options = options || {};
        Page.theme = options.theme || {};
        Page.css = options.css || [];
        Page.template = options.template || null;
        Page.templateData = options.templateData || {};
        Page.layout = options.layout || {};

        document.addEventListener(Ark.events.READY, function() {
            // render css
            Ark.Css.add(Page.css);
            Page.render(Page.template, Page.templateData);
            Page.layoutParts(Page.layout);
        });
    };

    Page.render = function(template, data){
        var renderedTemplate = Ark.Template.compile(template, data);
        var pageWrapper = document.createElement("div");
        pageWrapper.setAttribute("id", "Page");
        pageWrapper.innerHTML = renderedTemplate;
        document.body.insertBefore(pageWrapper, document.body.firstChild);
        return renderedTemplate;
    };

    Page.layoutParts = function(layout){
        var target;
        var part;
        for(var i in layout){
            target = document.getElementById(i);
            for(var j in layout[i]){
                part = document.getElementById(layout[i][j]);
                target.appendChild(part);
            }
        }
    };


    ARK.Page = Page;
    return ARK;
}(Ark || {}));