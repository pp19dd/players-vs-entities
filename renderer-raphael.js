
function RendererRaphael(e) {
    this.defaultInit(e);
    this.name = "renderer_raphael";
    mixProperties( this, e );
    this.paper = null;
}

RendererRaphael.prototype = Object.create(Renderer.prototype);

RendererRaphael.prototype.setupBoard = function() {
    console.info( "RendererRaphael RENDERER: setting up board" );
    this.paper = Raphael(this.div, this.width, this.height);

    this.sx = (this.width / this.engine.board_width);
    this.sy = (this.height / this.engine.board_height);

    for( var j = 0; j < this.engine.board_height; j++ ) {
        for( var i = 0; i < this.engine.board_width; i++ ) {
            var x = this.sx * i;
            var y = this.sy * j;
            var r = this.paper.rect(x, y, this.sx, this.sy);
            r.attr({ stroke: 'white'});

            switch( this.engine.board[i][j] ) {
                case 'grass': r.attr({ fill: 'green' }); break;
                case 'water': r.attr({ fill: 'blue' }); break;
                default: r.attr({ fill: 'silver' }); break;
            }
        }
    }
}

RendererRaphael.prototype.resetBoard = function() {
    console.info( "RendererRaphael RENDERER: resetting board" );
}

RendererRaphael.prototype.updatePause = function() {
    console.info( "RendererRaphael RENDERER: updating game state" );
}

RendererRaphael.prototype.reposition = function(obj, e) {
    var nx = e.public.x * this.sx;
    var ny = e.public.y * this.sy;

    obj.transform("T" + nx + "," + ny );
}

RendererRaphael.prototype.drawEntity = function(e) {
    console.info( "RendererRaphael RENDERER: drawing entity " + e.name );
    // console.dir( e );
    //console.info( artwork.entities.flower );
    //var p = this.paper.path();
    //var key = e.name.substr(7);
    var key = e.name;
    e.obj = this.paper.path(artwork.entities[key]);
    this.reposition(e.obj, e);
    //console.dir( e.public );


    //console.info( p );
}

RendererRaphael.prototype.updateEntity = function(e) {
    // console.info( "RendererRaphael RENDERER: updating entity " + e.name );
    //e.path.translate(e.public.x,)
    this.reposition(e.obj, e);
}

RendererRaphael.prototype.eraseEntity = function(e) {
    console.info( "RendererRaphael RENDERER: erasing entity " + e.name );
}
