
// ===========================================================================
// generic mixin loop.  takes properties from o_new and puts them in o_old
// ===========================================================================
function mixProperties(o_old, o_new) {
    for( var k in o_new ) {
        o_old[k] = o_new[k];
    }
}

// ===========================================================================
// responsible for the overall state ticker, interactions, communication
// ===========================================================================
function Engine(e) {
    this.defaultInit(e);
}

Engine.prototype.defaultInit = function(e) {
    this.entities = [];
    this.interval = 10;
    this.debug = false;
    this.Init(e);

    if( this.debug === true ) this.setupDebug();
}

Engine.prototype.Init = function(e) {
    mixProperties( this, e );
}

Engine.prototype.addItem = function(e) {
    e.Init({ interval: this.interval });
    if( this.debug === true ) this.setupDebugEntity(e);

    this.entities.push(e);
}

Engine.prototype.setupDebug = function() {
    this.div = document.createElement("div");
    this.div.style = "border-bottom:1px solid silver; padding-bottom:5px; display: flex;";
    document.body.appendChild(this.div);
}

Engine.prototype.setupDebugEntity = function(e) {
    e.debug_div = document.createElement("div");
    e.debug_div.style = "color: red;";

    this.div.appendChild(e.debug_div);
}

Engine.prototype.updateDebugEntity = function(e) {
    var html = e.name + ":";
    for( var key in e.cooldowns ) {
        html += e.cooldowns[key].name + " = " + e.cooldowns[key].complete + "%";
    }
    //for( var key in e ) {
        // html += key.toString() + " = " + e[key].toString() + "<br/>";
    //}
    e.debug_div.innerHTML = html;
}

Engine.prototype.Start = function() {
    var that = this;
    setInterval(function() {
        for( var i = 0; i < that.entities.length; i++ ) {
            if( that.debug === true ) that.updateDebugEntity(that.entities[i]);

            if( that.entities[i].__active === false ) continue;

            that.entities[i].doTick(that);
        }
    }, this.interval);
}
