// startup
var engine = new Engine({ debug: true });
var renderer = new RendererOGA({
    div: "display",
    width: 1000,
    height: 480
});
engine.setRenderer(renderer);
engine.setBoardSize(20, 8);

function make_terrain() {
    for( var j = 0; j < engine.board_height; j++ ) {
        for( var i = 0; i < engine.board_width; i++ ) {
            var t = "grass";
            if( i >= 2 && j >= 3 && j <= 4 ) t = "water";
            engine.setBoardXY(i, j, t);
        }
    }
}

function make_plant(x,y,life) {
    var p = new Plant({ });
    p.public.x = x;
    p.public.y = y;
    p.public.life = life;
    engine.addEntity(p);
}

function make_zombie(x,y,life) {
    var p = new Zombie({ });
    p.public.x = x;
    p.public.y = y;
    p.public.life = life;
    engine.addEntity(p);
}

// for( var i = 0; i < 20; i++ ) {
//     var x = parseInt(Math.random() * 10);
//     var y = parseInt(Math.random() * 8);
//     make_plant(x, y, 100);
// }

// for( var i = 0; i < 5; i++ ) {
//     var x = 5 + parseInt(Math.random() * 10);
//     var y = parseInt(Math.random() * 8);
//     make_zombie(x, y, 100);
// }

make_terrain();
make_plant(3,4,100);
make_zombie(15,4,100);

engine.Start();

//console.dir( engine.entities[0] );
