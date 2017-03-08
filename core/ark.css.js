(function(ARK) {
    var Css = {};

    Css.add = function(css) {

        function addCSSRule(sheet, selector, rules, index) {
            if ("insertRule" in sheet) {
                sheet.insertRule(selector + "{" + rules + "}", index);
            } else if ("addRule" in sheet) {
                sheet.addRule(selector, rules, index);
            }
        }

        css.forEach(function(rule) {
            addCSSRule(document.styleSheets[0],rule.selector,rule.declarations.join(";"), 0);
        });

    };

    Css.init = function(){
        var style = document.createElement("style");
        style.appendChild(document.createTextNode("")); // WebKit hack :(
        document.head.appendChild(style);
        return style.sheet;
    };

    ARK.Css = Css;
    return ARK;
}(Ark || {}));