
function Entity(e) {
    this.defaultInit(e);
}

Entity.prototype.defaultInit = function(e) {
    this.name = "entity";
    this.cooldowns = [];

    this.public = {
        x: 0,
        y: 0,
        life: 100
    };

    this.__active = true;
    this.__awake = false;

    mixProperties( this, e );
}

Entity.prototype.addCooldown = function(obj, parms) {
    this[obj] = new Cooldown(parms);
    this[obj].name = obj;
    this[obj].__entity = this;
    this[obj].__onready = this["on" + obj];
    if(parms.start == true) this[obj].__active = true;
    this.cooldowns.push(this[obj]);
}

Entity.prototype.doTick = function(engine) {
    if( this.__active === false ) return;

    for( var i in this.cooldowns ) {
        if( this.cooldowns[i].__active === false ) continue;
        this.cooldowns[i].doTick();
    }
}
