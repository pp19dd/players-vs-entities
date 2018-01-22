
function Renderer(e) {
    this.defaultInit(e);
}

Renderer.prototype.defaultInit = function(e) {
    this.name = "renderer";
    this.render_interval = 100;
    console.info( "RENDERER: default init" );
}

Renderer.prototype.setupBoard = function() {
    console.info( "RENDERER: setting up board" );
}

Renderer.prototype.resetBoard = function() {
    console.info( "RENDERER: resetting board" );
}

Renderer.prototype.updatePause = function() {
    console.info( "RENDERER: updating game state" );
}

Renderer.prototype.drawEntity = function(e) {
    console.info( "RENDERER: drawing entity " + e.name );
}

Renderer.prototype.updateEntity = function(e) {
    console.info( "RENDERER: updating entity " + e.name );
}

Renderer.prototype.eraseEntity = function(e) {
    console.info( "RENDERER: erasing entity " + e.name );
}
