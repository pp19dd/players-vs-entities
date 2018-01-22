
function Zombie(e) {
    this.defaultInit(e);
    this.name = "entity_zombie";

    //this.addCooldown( "Sprout", { per_second: 1/(3 + Math.random() * 5) } );
    //this.addCooldown( "ShootingSolution", { per_second: 1/2 } );
    //this.addCooldown( "Shoot", { per_second: 1/8 } );

    this.addCooldown( "Walk", { per_second: 10 });
    this.Walk.Start();
}

Zombie.prototype = Object.create(Entity.prototype);

Zombie.prototype.onWalk = function() {

    var col = this.hasCollisions();
    for( var i = 0; i < col.length; i++ ) {
        console.info( "ACK hitting " + col[i].name );
        return;
    }

    this.public.x -= 0.5;

    if( this.public.x <= 0 ) {
        this.Walk.Stop();
        this.addCooldown( "Dying", { per_second: 1/3 });
        this.Dying.Start();
        this.__active = false;
    }

    this.engine.renderer.updateEntity(this);
    //console.info( this.public );

}

Zombie.prototype.onDying = function() {
    this.Dying.Stop();
}
