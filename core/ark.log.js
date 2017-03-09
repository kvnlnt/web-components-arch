(function(ARK){

    function Log() {
        // logging enabled by the presence of the "logging" url parameter
        if(!ARK.Util.getUrlVars().logging) return false;
        try {
            console.log.apply(console, arguments);
        } catch(err){
            // alert(err);
            // noop
        }
    };

    ARK.Log = Log;
    return ARK;

})(Ark || {});