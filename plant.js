
function Plant(e) {
    this.defaultInit(e);
    this.name = "entity_plant";

    this.addCooldown( "Sprout", { per_second: 10 } );
    this.addCooldown( "ShootingSolution", { per_second: 7 } );
    this.addCooldown( "Shoot", { per_second: 5 } );

    this.Sprout.Start();
}

Plant.prototype = Object.create(Entity.prototype);

Plant.prototype.onSprout = function() {
    this.Sprout.Stop();
    this.ShootingSolution.Start();
}

Plant.prototype.onShootingSolution = function() {
    this.ShootingSolution.Stop();
    this.Shoot.Start();
}

Plant.prototype.onShoot = function() {
    this.Shoot.Stop();

    if( this.public.life <= 0 ) {
        this.addCooldown( "Dying", { per_second: 1/5 } );
        this.Dying.Start();
        return;
    }
    this.Sprout.Start();
    this.public.life--;
}
