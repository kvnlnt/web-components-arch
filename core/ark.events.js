(function(ARK) {

    var EVENTS = {
        DOCUMENT_READY: "DOCUMENT_READY",
        ARK_INITIALIZED: "ARK_INITIALIZED",
        PAGE_READY: "PAGE_READY",
        PAGE_RESIZED: "PAGE_RESIZED",
        PAGE_SCROLLED: "PAGE_SCROLLED",
        PARTS_INITIALIZED: "PARTS_INITIALIZED"
    };

    var Events = new ARK.EventBus();

    // when all dom content is loaded
    document.addEventListener("DOMContentLoaded", function(event) {
        Events.dispatch(EVENTS.DOCUMENT_READY, this);
        ARK.Log(EVENTS.DOCUMENT_READY);
    });

    // when the window is resized
    window.addEventListener("resize", ARK.Util.debounce(function() {
        Events.dispatch(EVENTS.PAGE_RESIZED, this);
        ARK.Log(EVENTS.PAGE_RESIZED);
    }, 250), true);
    
    // when the window is scrolled
    window.addEventListener("scroll", ARK.Util.debounce(function() {
        Events.dispatch(EVENTS.PAGE_SCROLLED, this);
        ARK.Log(EVENTS.PAGE_SCROLLED);
    }, 250), true);

    ARK.EVENTS = EVENTS;
    ARK.Events = Events;
    return ARK;

})(Ark || {});