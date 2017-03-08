(function(PARTS) {

    /**
     * Class
     *
     * @class      ArkLayout (name)
     * @param      {Object}  options  The options
     */
    function ArkLayout(options) {
        var options = options || {};
        this.el = options.el;
        this.init();
    };

    // STATIC PROPERTIES

    // Name of custom tag
    ArkLayout.selector = "ark-layout";

    // Params
    ArkLayout.params = {
        name: String,
        message: String
    };

    // STATIC METHODS

    /**
     * initAll
     * @desc  Creates an instance of ArkLayout for each ark-component tag found, also loads the css for the ArkLayout
     */
    ArkLayout.initAll = function() {
        // find all ark-component tags
        document.addEventListener(Ark.events.READY, function() {
            Ark.Part.collectAndInitialize({
                part: ArkLayout
            });
        });
    };

    // INSTANCE METHODS

    ArkLayout.prototype = {
        /**
         * init
         * @desc request component data and render on finish
         *
         * @return     {<type>}  { description_of_the_return_value }
         */
        init: function() {
            var that = this;
            return Ark.Api.getPart(this.getId(), function(err, data) {
                Ark.Css.add(data.css);
                that.render(data.template);
                that.layout(data.targets);
            });
        },
        /**
         * Gets the identifier.
         *
         * @return     {<type>}  The identifier.
         */
        getId: function() {
            return this.el.getAttribute("id");
        },
        /**
         * Auto lays out parts
         * @param  {[type]} targets [description]
         * @return {[type]}         [description]
         */
        layout: function(targets){
            var target;
            var part;
            for(var i in targets){
                target = document.getElementById(i);
                for(var j in targets[i]){
                    part = document.getElementById(targets[i][j]);
                    target.appendChild(part);
                }
            }
        },
        /**
         * Renders this components template with data supplied
         *
         * @param      {Function}  template  The template
         * @param      {<type>}    data      The data
         * @return     {<type>}    the compiled template
         */
        render: function(template, data) {
            var renderedTemplate = Ark.Template.compile(template, data);
            this.el.innerHTML = renderedTemplate;
            return renderedTemplate;
        }
    };

    // look for any ark-components on this page and create instances of them
    ArkLayout.initAll();

    PARTS.ArkLayout = PARTS;
    return PARTS;

}(Ark.Parts || {}));