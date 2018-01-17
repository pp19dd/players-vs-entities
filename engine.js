
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
    this.debug_interval = 100;
    this.debug = false;
    this.__pause = false;
    mixProperties( this, e );

    if( this.debug === true ) this.setupDebug();
}

Engine.prototype.addItem = function(e) {
    mixProperties(e, { interval: this.interval });
    if( this.debug === true ) this.setupDebugEntity(e);

    this.entities.push(e);
}

Engine.prototype.setupDebug = function() {
    var that = this;

    this.div = document.createElement("div");
    this.div.className = "pve-debug";
    document.body.appendChild(this.div);

    var ctrl = document.createElement("div");
    ctrl.className = "pve-debug-control";

    var p = document.createElement("button");
    p.innerHTML = 'Pause';
    p.onclick = function() {
        p.innerHTML = that.__pause ? "Pause" : "Resume";
        that.Pause(!that.__pause);
    };
    ctrl.appendChild(p);

    this.div.appendChild(ctrl);

}

Engine.prototype.setupDebugEntity = function(e) {
    e.debug_div = document.createElement("div");
    e.debug_div.className = "pve-debug-entity";
    this.div.appendChild(e.debug_div);
}

Engine.prototype.updateDebugEntity = function(e) {
    if( e.__active === false ) {
        e.debug_div.className = "pve-debug-entity pve-debug-entity-disabled";
    }

    var html = "<div class='pve-debug-entity-name'>" + e.name + "</div>";
    for( var k in e.public) {
        html += "<div>" + k + ":" + e.public[k] + "</div>";
    }
    for( var key in e.cooldowns ) {
        html +=
            "<div class='pve-debug-entity-cooldown'>" + e.cooldowns[key].name + "</div>" +
            "<progress value='" + e.cooldowns[key].complete +
            "' max='100'></progress>";
    }
    e.debug_div.innerHTML = html;
}

Engine.prototype.Pause = function(true_or_false) {
    this.__pause = true_or_false;
}

Engine.prototype.setupBoard = function() {

}

Engine.prototype.setupDebugCycle = function() {
    var that = this;
    setInterval(function() {
        for( var i = 0; i < that.entities.length; i++ ) {
            that.updateDebugEntity(that.entities[i]);
        }
    }, this.debug_interval);
}

Engine.prototype.setupTicker = function() {
    var that = this;
    setInterval(function() {
        if( that.__pause === true ) return;

        for( var i = 0; i < that.entities.length; i++ ) {
            if( that.entities[i].__active === false ) continue;
            that.entities[i].doTick(that);
        }
    }, this.interval);
}

Engine.prototype.Start = function() {
    this.setupBoard();
    if( that.debug === true ) this.setupDebugCycle();
    this.setupTicker();
}
