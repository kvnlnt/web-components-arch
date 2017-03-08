(function(ARK) {
    var Page = {};

    Page.init = function(options){
        var options = options || {};
        Page.theme = options.theme || {};
        Page.css = options.css || [];
        Page.template = options.template || null;
        Page.templateData = options.templateData || {};
        Page.targets = options.targets || {};

        document.addEventListener(Ark.events.READY, function() {
            // render css
            Ark.Css.add(Page.css);
            Page.render(Page.template, Page.templateData);
            Page.layout(Page.targets);
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

    Page.layout = function(targets){
            var target;
            var part;
            for(var i in targets){
                target = document.getElementById(i);
                for(var j in targets[i]){
                    part = document.getElementById(targets[i][j]);
                    target.appendChild(part);
                }
            }
        };


    ARK.Page = Page;
    return ARK;
}(Ark || {}));