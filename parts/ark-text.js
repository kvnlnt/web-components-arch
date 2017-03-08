(function(PARTS) {

    /**
     * Class
     *
     * @class      ArkText (name)
     * @param      {Object}  options  The options
     */
    function ArkText(options) {
        var options = options || {};
        this.el = options.el;
    };

    // STATIC PROPERTIES

    // Name of custom tag
    ArkText.selector = "ark-text";

    // params
    ArkText.params = {
        text: String,
        image: String
    };

    // STATIC METHODS

    /**
     * css
     *
     * @param      {<type>}  data    The data
     * @return     {Array}   array of css rules to be used by Ark.addCss
     */
    ArkText.css = function(data) {
        return [
            {
                selector: ArkText.selector,
                declarations: [
                    'border: 5px solid ' + Ark.Page.theme.bgColor,
                    'display: block',
                    'padding: 20px',
                    'max-width: 500px',
                    'font-size: 1.2rem'
                ]
            },
            {
                selector: ArkText.selector + ' img',
                declarations: [
                    'float:right',
                    'margin:2rem'
                ]
            }
        ]
    };

    /**
     * template
     *
     * @return     {string}  html template string which can be transformed by Ark.template
     */
    ArkText.template = function() {
        var template = '';
        template += '<% if(this.image) { %>';
        template += '<img src="<% this.image %>"/>';
        template += '<% } %>';
        template += '<% for(var i = 0; i < this.text.length; i++) { %>';
        template += '<p><% this.text[i] %></p>';
        template += '<% } %>';
        return template;
    };

    // INSTANCE METHODS

    ArkText.prototype = {
        /**
         * init
         * @desc request component data and render on finish
         *
         * @return     {<type>}  { description_of_the_return_value }
         */
        init: function() {
            var that = this;
            return Ark.Api.getPart(this.getId(), function(err, data) {
                that.render(ArkText.template(), data);
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

    PARTS.ArkText = ArkText;
    return PARTS;

}(Ark.Parts || {}));