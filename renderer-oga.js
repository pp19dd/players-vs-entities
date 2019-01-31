
function RendererOGA(e) {
    this.defaultInit(e);
    this.name = "renderer_oga";
    mixProperties( this, e );
    this.paper = null;
}

RendererOGA.prototype = Object.create(Renderer.prototype);

RendererOGA.prototype.setupBoard = function() {

    this.sx = (this.width / this.engine.board_width);
    this.sy = (this.height / this.engine.board_height);

    // creates and plots board
    // this.div.style.backColor = 'green';
    this.div_node = document.getElementById(this.div);
    this.div_node.style.backgroundColor = 'rgba(0,0,0,0.5)';
    this.div_node.style.width = '800px';
    this.div_node.style.height = '400px';
    console.warn( this.div_node );
}

RendererOGA.prototype.resetBoard = function() {

}

RendererOGA.prototype.updatePause = function() {

}

RendererOGA.prototype.sprite_tile = function(a, b) {
    var tx = -32 * a;
    var ty = -32 * b;
    return( tx + "px " + ty + "px" );
}

RendererOGA.prototype.reposition = function(obj, e) {
    // move a dude
    var nx = e.public.x * this.sx;
    var ny = e.public.y * this.sy;

    e.public.animation_step++;
    if( e.public.animation_step >= 10 ) e.public.animation_step = 0;

    //console.info( e.public );

    obj.style.left = nx + "px";
    obj.style.top = ny + "px";

    obj.style.backgroundPosition = this.sprite_tile(e.public.animation_step, 2);
}

RendererOGA.prototype.drawEntity = function(e) {
    e.public.animation_step = 0;

    // first display of a sprite?
    var key = e.name;
    // e.obj = this.paper.path(artwork[key]);
    e.obj = document.createElement("div");
    e.obj.style.position = 'absolute';
    e.obj.style.width = '32px';
    e.obj.style.height = '32px';
    e.obj.style.transform = "scale(-2,2)";
    //e.obj.style.transform = "scale(2)";
    e.obj.innerHTML = e.name.substr(-1,1);
    this.div_node.appendChild(e.obj);

    // 320 x 160
    // 10 cols x 5 rows

    //if( e.name == 'entity_zombie' ) {
        e.obj.style.backgroundImage = "url(sets/oga/skeleton-spritesheet-calciumtrice.png)";
        e.obj.style.backgroundRepeat = "no-repeat";
    //}

    //if( e.name == 'entity_flower' ) {
    //    e.obj.style.backgroundImage = "url(sets/oga/flower.png)";
    //    e.obj.style.backgroundRepeat = "no-repeat";
    //}

    this.reposition(e.obj, e);
}

RendererOGA.prototype.updateEntity = function(e) {
    this.reposition(e.obj, e);
}

RendererOGA.prototype.eraseEntity = function(e) {
    // sprite died
}
