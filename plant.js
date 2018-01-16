
function Plant(e) {
    this.defaultInit(e);
    this.name = "entity_plant";
}

Plant.prototype = Object.create(Entity.prototype);

Plant.prototype.wakeUp = function() {
    var that = this;

    console.info( "YAWWWN ");
    var seed = new Cooldown({ name: "sprout", per_second: 1/5});
    seed.onReady(function() {
        seed.__active = false;
        console.info( "I'm up, I'm up" );
        shooting_solution.__active = true;
    });

    var shooting_solution = new Cooldown({ name: "shooting_solution", per_second: 1/3 });
    shooting_solution.onReady(function() {
        console.info( "nothing to shoot, partner" );
    });
    shooting_solution.__active = false;

    seed.onUpdate(function() {
        // console.info( "JOSS" + seed.complete );
    });
    this.cooldowns.push(seed);
    this.cooldowns.push(shooting_solution);
}
