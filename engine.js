
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

    this.board = []; // dimensioned by setBoardSize
    this.board_width = 20;
    this.board_height = 8;

    this.interval = 10;
    this.debug_interval = 100;

    this.debug = false;
    this.__pause = false;

    this.serial = 100;

    this.setBoardSize(this.board_width, this.board_height);
    mixProperties( this, e );

    if( this.debug === true ) this.setupDebug();
}

// elements accessed as [x][y]
Engine.prototype.setBoardSize = function(w, h) {
    this.board = [];
    this.board_width = w;
    this.board_height = h;
    for( var i = 0; i < w; i++ ) {
        var col = [];

        for( var j = 0; j < h; j++ ) {
            col.push(null);
        }
        this.board.push(col);
    }
}

Engine.prototype.setBoardXY = function(x, y, o) {
    this.board[x][y] = o;
}

Engine.prototype.setRenderer = function(r) {
    r.engine = this;
    this.renderer = r;
    this.renderer.setupBoard();
}

Engine.prototype.addEntity = function(e) {
    mixProperties(e, { interval: this.interval });
    if( this.debug === true ) this.setupDebugEntity(e);
    e.engine = this;
    this.serial++;
    e.serial = this.serial;
    this.renderer.drawEntity(e);
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

Engine.prototype.numberDisplay = function(n) {
    return( Math.round(n*10) / 10 );
}

Engine.prototype.updateDebugEntity = function(e) {
    if( e.__active === false ) {
        e.debug_div.className = "pve-debug-entity pve-debug-entity-disabled";
    }

    var html = "<div class='pve-debug-entity-name'>" + e.name + "</div>";
    for( var k in e.public) {
        html += "<div>" + k + ":" + this.numberDisplay(e.public[k]) + "</div>";
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
    this.renderer.updatePause(this.__pause);
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
    console.info( "ENGINE: start");
    if( this.debug === true ) this.setupDebugCycle();
    this.renderer.resetBoard();
    this.setupTicker();
}
