
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

//FIXME: collisions not working?
Entity.prototype.hasCollisions = function() {
    var ret = [];
    var padding = 0.9;
    console.clear();
    for( var i = 0; i < this.engine.entities.length; i++ ) {
        if( this.engine.entities[i].__active === false ) continue;
        if( this.engine.entities[i].public.y != this.public.y ) continue;

        var a = this.public;
        var b = this.engine.entities[i].public;

        console.info( a, b );

        // if(
        //     this.public.x <= this.engine.entities[i].public.x + padding &&
        //     this.public.x >= this.engine.entities[i].public.x - padding
        // ) {
        //     ret.push(this.engine.entities);
        // }
    }

    return( ret );
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
        // this.engine.renderer.updateEntity(this);
    }
}
