(function(PARTS) {

    /**
     * Class
     *
     * @class      ArkMenu (name)
     * @param      {Object}  options  The options
     */
    function ArkMenu(options) {
        var options = options || {};
        this.el = options.el;
    };

    // STATIC PROPERTIES

    // Name of custom tag
    ArkMenu.selector = "ark-menu";

    // params
    ArkMenu.params = {
        items: Array.of({
            name: String,
            path: String
        })
    };

    // STATIC METHODS

    /**
     * css
     *
     * @param      {<type>}  data    The data
     * @return     {Array}   array of css rules to be used by Ark.addCss
     */
    ArkMenu.css = function(data) {
        return [
            {
                selector: ArkMenu.selector,
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
    ArkMenu.template = function() {
        var template = '';
        template += '<ul>';
        template += '<% for(var i = 0; i < this.items.length; i++) { %>';
        template += '<li><a href="<% this.items[i].path %>"><% this.items[i].name %></a></li>';
        template += '<% } %>';
        template += '<ul>';
        return template;
    };

    // INSTANCE METHODS

    ArkMenu.prototype = {
        /**
         * init
         * @desc request component data and render on finish
         *
         * @return     {<type>}  { description_of_the_return_value }
         */
        init: function() {
            var that = this;
            return Ark.Api.getPart(this.getId(), function(err, data) {
                that.render(ArkMenu.template(), data);
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

    PARTS.ArkMenu = ArkMenu;
    return PARTS;

}(Ark.Parts || {}));