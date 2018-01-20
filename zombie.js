
function Zombie(e) {
    this.defaultInit(e);
    this.name = "entity_zombie";

    //this.addCooldown( "Sprout", { per_second: 1/(3 + Math.random() * 5) } );
    //this.addCooldown( "ShootingSolution", { per_second: 1/2 } );
    //this.addCooldown( "Shoot", { per_second: 1/8 } );

    this.addCooldown( "Walk", { per_second: 1/5 });
    this.Walk.Start();
}

Zombie.prototype = Object.create(Entity.prototype);

Zombie.prototype.onWalk = function() {
    this.public.x--;
}
