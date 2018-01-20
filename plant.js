
function Plant(e) {
    this.defaultInit(e);
    this.name = "entity_plant";

    this.addCooldown( "Sprout", { per_second: 1/(3 + Math.random() * 5) } );
    this.addCooldown( "ShootingSolution", { per_second: 1/2 } );
    this.addCooldown( "Shoot", { per_second: 1/8 } );

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
}
