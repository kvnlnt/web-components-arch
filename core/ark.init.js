Ark.Events.addEventListener(Ark.EVENTS.DOCUMENT_READY, function(){
    Ark.Css.init();
    Ark.Events.dispatch(Ark.EVENTS.ARK_READY);
});