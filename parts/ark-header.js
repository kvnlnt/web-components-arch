(function(PARTS) {

    /**
     * Class
     *
     * @class      ArkHeader (name)
     * @param      {Object}  options  The options
     */
    function ArkHeader(options) {
        var options = options || {};
        this.el = options.el;
        this.init();
    };

    // STATIC PROPERTIES

    // Name of custom tag
    ArkHeader.selector = "ark-header";

    // Params
    ArkHeader.params = {
        name: String,
        message: String
    };

    // STATIC METHODS

    /**
     * css
     *
     * @param      {<type>}  data    The data
     * @return     {Array}   array of css rules to be used by Ark.addCss
     */
    ArkHeader.css = function(data) {
        return [
            {
                selector: ArkHeader.selector,
                declarations: [
                    'background-color: ' + Ark.Page.theme.bgColor,
                    'display: block',
                    'padding: 20px',
                    'color: ' + Ark.Page.theme.textColor
                ]
            }
        ]
    };

    /**
     * template
     *
     * @return     {string}  html template string which can be transformed by Ark.template
     */
    ArkHeader.template = function() {
        var template = '';
        template += '<h1><% this.name %></h1>';
        template += '<p><% this.message %></p>';
        return template;
    };

    /**
     * initAll
     * @desc  Creates an instance of ArkHeader for each ark-component tag found, also loads the css for the ArkHeader
     */
    ArkHeader.initAll = function() {
        // find all ark-component tags
        document.addEventListener(Ark.events.READY, function() {
            Ark.Part.collectAndInitialize({
                part: ArkHeader
            });
        });
        // load the css
        Ark.Css.add(ArkHeader.css());
    };

    // INSTANCE METHODS

    ArkHeader.prototype = {
        /**
         * init
         * @desc request component data and render on finish
         *
         * @return     {<type>}  { description_of_the_return_value }
         */
        init: function() {
            var that = this;
            return Ark.Api.getPart(this.getId(), function(err, data) {
                that.render(ArkHeader.template(), data);
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
    ArkHeader.initAll();

    PARTS.ArkHeader = ArkHeader;
    return PARTS;

}(Ark.Parts || {}));