var Ark = {

    // namespace for all components
    Components: {},

    // container for components initialized on page
    components: {},

    // enum for any app events
    events: {
        READY: "READY"
    },

    /// initialize ark
    init: function() {

        // create stylesheet
        Ark.Css.init();

        // tell it on the mountain
        document.addEventListener("DOMContentLoaded", function() {
            var e = new Event(Ark.events.READY);
            document.dispatchEvent(e);
        });
    }
};