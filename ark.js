var Ark = {
    components: {},
    createStyleSheet: function(){
        var style = document.createElement("style");
        style.appendChild(document.createTextNode("")); // WebKit hack :(
        document.head.appendChild(style);
        return style.sheet;
    },
    events: {
        READY: "READY"
    },
    fetch: function(path, cb) {
        cb({
            name: "Custom Component"
        });
    },
    init: function() {

        // create stylesheet
        this.createStyleSheet();

        // tell it on the mountain
        document.addEventListener("DOMContentLoaded", function() {
            var e = new Event(Ark.events.READY);
            document.dispatchEvent(e);
        });
    },
    initComponents: function(options) {
        var options = options || {};
        var Component = options.component;
        var components = document.querySelectorAll(Component.selector);
        var componentInstance;
        for (var i = 0; i < components.length; i++) {
            componentInstance = new Component({
                el: components[i]
            });
            Ark.components[componentInstance.getId()] = componentInstance;
        }
        return components;
    },
    addCss: function(css) {

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

    },
    template: function(html, data) {
        var re = /<%([^%>]+)?%>/g,
            reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
            code = 'var r=[];\n',
            cursor = 0,
            match;
        var add = function(line, js) {
            js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
            return add;
        }
        while (match = re.exec(html)) {
            add(html.slice(cursor, match.index))(match[1], true);
            cursor = match.index + match[0].length;
        }
        add(html.substr(cursor, html.length - cursor));
        code += 'return r.join("");';
        return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
    }
};

Ark.init();