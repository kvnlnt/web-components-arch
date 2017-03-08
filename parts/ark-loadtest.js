(function(PARTS) {

    /**
     * Class
     *
     * @class      ArkLoadTest (name)
     * @param      {Object}  options  The options
     */
    function ArkLoadTest(options) {
        var options = options || {};
        this.el = options.el;
    };

    // STATIC PROPERTIES

    // Name of custom tag
    ArkLoadTest.selector = "ark-loadtest";

    // params
    ArkLoadTest.params = {
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
    ArkLoadTest.css = function(data) {

        function getRandom(min, max) {
          return Math.ceil(Math.random() * (max - min) + min);
        }

        function randColor(){
            var hex = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
            var color = [];
            for(var i = 0; i < 6; i++){
                color.push(hex[getRandom(0,15)]);
            }
            return '#' + color.join('');
        }

        var css = [];

        for(var i = 0; i < 1000; i++){
            css.push({
                selector: ArkLoadTest.selector + " span:nth-child("+i+")",
                declarations: [
                    'display: inline-block',
                    'width: 50px',
                    'height:50px',
                    'background-color:' + randColor()
                ]
            });
        }

        return css;
    };

    /**
     * template
     *
     * @return     {string}  html template string which can be transformed by Ark.template
     */
    ArkLoadTest.template = function() {
        var template = '';
        template += '<% for(var i = 0; i < this.data.length; i++) { %>';
        template += '<span><% this.data[i] %></span>';
        template += '<% } %>';
        return template;
    };

    // INSTANCE METHODS

    ArkLoadTest.prototype = {
        /**
         * init
         * @desc request component data and render on finish
         *
         * @return     {<type>}  { description_of_the_return_value }
         */
        init: function() {
            var data = [];
            for(var i = 0; i < 1000; i++) data.push(i);
            this.render(ArkLoadTest.template(), {data:data});
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

    PARTS.ArkLoadTest = ArkLoadTest;
    return PARTS;

}(Ark.Parts || {}));