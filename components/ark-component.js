(function(COMPONENTS) {

    /**
     * Class
     *
     * @class      ArkComponent (name)
     * @param      {Object}  options  The options
     */
    function ArkComponent(options) {
        var options = options || {};
        this.el = options.el;
        this.init();
    };

    // STATIC PROPERTIES

    // Name of custom tag
    ArkComponent.selector = "ark-component";

    // STATIC METHODS

    /**
     * css
     *
     * @param      {<type>}  data    The data
     * @return     {Array}   array of css rules to be used by Ark.addCss
     */
    ArkComponent.css = function(data) {
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

    /**
     * template
     *
     * @return     {string}  html template string which can be transformed by Ark.template
     */
    ArkComponent.template = function() {
        return 'Hi, I am a custom component. With the a little help, I grabbed external data, compiled it with both an html and css template and dynamically generated my own mark up and styles. For example, my payload included a "name" value. Here it is generated via my own template: <strong><% this.name %></strong>';
    };

    /**
     * initAll
     * @desc  Creates an instance of ArkComponent for each ark-component tag found, also loads the css for the ArkComponent
     */
    ArkComponent.initAll = function() {
        // find all ark-component tags
        document.addEventListener(Ark.events.READY, function() {
            Ark.Component.collectAndInitialize({
                component: ArkComponent
            });
        });
        // load the css
        Ark.Css.add(ArkComponent.css());
    };

    // INSTANCE METHODS
    ArkComponent.prototype = {
        /**
         * init
         * @desc request component data and render on finish
         *
         * @return     {<type>}  { description_of_the_return_value }
         */
        init: function() {
            var that = this;
            return Ark.Api.fetch("/part/" + this.getId(), function(data) {
                that.render(ArkComponent.template(), data);
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
    ArkComponent.initAll();

    COMPONENTS.ArkComponent = ArkComponent;
    return COMPONENTS;

}(Ark.Components || {}));