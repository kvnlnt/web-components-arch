/**
 * Class
 */
function ArkComponent(options) {
    var options = options || {};
    this.el = options.el;
    this.init();
};

// Static Properties
ArkComponent.selector = "ark-component";

// Static Methods
ArkComponent.css = function() {
    return [
        {
            selector: ArkComponent.selector,
            declarations: [
                    'background-color: #e2e2e2',
                    'display: block',
                    'padding: 20px'
                ]
            }
        ]
};

ArkComponent.template = function() {
    return 'Hi, I am a custom component. With the a little help, I grabbed external data, compiled it with both an html and css template and dynamically generated my own mark up and styles. For example, my payload included a "name" value. Here it is generated via my own template: <strong><% this.name %></strong>';
};

ArkComponent.initAll = function() {
    document.addEventListener(Ark.events.READY, function() {
        Ark.initComponents({
            component: ArkComponent
        });
    });
    Ark.addCss(ArkComponent.css());
};

// Instance Methods
ArkComponent.prototype = {
    init: function() {
        var that = this;
        return Ark.fetch("/part/" + this.getId(), function(data){
            that.render(ArkComponent.template(), data);
        });
    },
    getId: function() {
        return this.el.getAttribute("id");
    },
    render: function(template, data) {
        var renderedTemplate = Ark.template(template, data);
        this.el.innerHTML = renderedTemplate;
        return renderedTemplate;
    }
};

// look for any ark-components on this page and create instances of them
ArkComponent.initAll();