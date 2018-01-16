
function Entity(e) {
    this.defaultInit(e);
}

Entity.prototype.defaultInit = function(e) {
    this.name = "entity";
    this.cooldowns = [];

    this.__active = true;
    this.__awake = false;

    this.Init(e);
}

Entity.prototype.Init = function(e) {
    mixProperties( this, e );
}

Entity.prototype.doTick = function(engine) {
    if( this.__active === false ) return;
    if(
        this.__awake === false &&
        typeof this.wakeUp === "function"
    ) {
        this.__awake = true;
        this.wakeUp();
    }

    for( var i in this.cooldowns ) {
        if( this.cooldowns[i].__active === false ) continue;
        if(
            this.cooldowns[i].__awake === false &&
            typeof this.cooldowns[i].wakeUp === "function"
        ) {
            this.cooldowns[i].__awake = true;
            this.cooldowns[i].wakeUp();
        }

        this.cooldowns[i].doTick();
    }
}