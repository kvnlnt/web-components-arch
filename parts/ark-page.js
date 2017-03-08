(function(PARTS) {

    /**
     * Class
     *
     * @class      ArkPage (name)
     * @param      {Object}  options  The options
     */
    function ArkPage(options) {
        var options = options || {};
        this.el = options.el;
        this.init();
    };

    // STATIC PROPERTIES

    // Name of custom tag
    ArkPage.selector = "ark-page";

    // Params
    ArkPage.params = {
        name: String,
        message: String
    };

    // STATIC METHODS

    /**
     * initAll
     * @desc  Creates an instance of ArkPage for each ark-component tag found, also loads the css for the ArkPage
     */
    ArkPage.initAll = function() {
        // find all ark-component tags
        document.addEventListener(Ark.events.READY, function() {
            Ark.Part.collectAndInitialize({
                part: ArkPage
            });
        });
    };

    // INSTANCE METHODS

    ArkPage.prototype = {
        /**
         * init
         * @desc request component data and render on finish
         *
         * @return     {<type>}  { description_of_the_return_value }
         */
        init: function() {
            var that = this;
            Ark.Css.add(Ark.Page.css);
            that.render(Ark.Page.template);
            that.layout(Ark.Page.targets);
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
    ArkPage.initAll();

    PARTS.ArkPage = ArkPage;
    return PARTS;

}(Ark.Parts || {}));