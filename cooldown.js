
function Cooldown(e) {
    this.defaultInit(e);
}

Cooldown.prototype.defaultInit = function(e) {
    this.name = "cooldown";

    // constants, but leaving here for flexibility
    this.min = 0;
    this.max = 100;
    this.current = 0;
    this.complete = 0;

    // assigned
    this.interval = 10;
    this.per_second = 1;

    // computed for 10/1
    this.goal_ms = 1000;
    this.steps = 100;
    this.delta = 2;

    // event hooks and properties
    this.__active = true;
    this.__awake = false;

    this.wakeUp = null;
    this.__onready = null;
    this.__onupdate = null;

    mixProperties( this, e );
    this.computeDelta();
    //TODO: need to attach this to a startup event?
}

Cooldown.prototype.computeDelta = function(e) {
    this.goal_ms = 1000 / this.per_second;
    this.steps = this.goal_ms / this.interval;
    this.delta = this.max / this.steps;
}

Cooldown.prototype.computeFriendly = function() {
    this.complete = parseInt((this.current / this.max) * 100);
}

Cooldown.prototype.onReady = function(f) {
    this.__onready = f;
}

Cooldown.prototype.onUpdate = function(f) {
    this.__onupdate = f;
}

Cooldown.prototype.doTick = function(engine) {
    if( this.__active === false ) return;

    this.current += this.delta;
    this.computeFriendly();

    if( typeof this.__onupdate === 'function') this.__onupdate.call();

    if( this.current <= this.max ) return;

    // fire event
    this.current = this.min;
    if( typeof this.__onready !== 'function' ) return;

    this.__onready.call();
}
