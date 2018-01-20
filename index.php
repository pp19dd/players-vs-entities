<!doctype html>
<html>
<head>
    <title>pve test</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="default.css" />
</head>
<body>
    <div id="display"></div>
    <script src="engine.js?ts=<?php echo time() ?>"></script>
    <script src="cooldown.js?ts=<?php echo time() ?>"></script>
    <script src="entity.js?ts=<?php echo time() ?>"></script>
    <script src="renderer.js?ts=<?php echo time() ?>"></script>
    <script src="renderer-raphael.js?ts=<?php echo time() ?>"></script>
    <script src="raphael.min.js"></script>
    <script src="art.php?ts=<?php echo time() ?>"></script>

    <script src="plant.js?ts=<?php echo time() ?>"></script>
    <script src="zombie.js?ts=<?php echo time() ?>"></script>
    <script>
        var engine = new Engine({ debug: true });
        var renderer = new RendererRaphael({
            div: "display",
            width:1000,
            height:480
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

        function make_random() {
            var p = new Plant({ });
            p.public.x = parseInt(Math.random() * engine.board_width/3);
            p.public.y = parseInt(Math.random() * engine.board_height);
            p.public.life = parseInt(Math.random() * 100);
            engine.addItem(p);

            var z = new Zombie({ });
            z.public.x = parseInt(
                (engine.board_width)*(2/3) +
                (Math.random() * engine.board_width/3)
            );
            z.public.y = parseInt(Math.random() * engine.board_height);
            z.public.life = parseInt(Math.random() * 100);
            engine.addItem(z);

        }

        make_terrain();
        for( var i = 0; i < 4; i++ ) {
            make_random();
        }

        //var e1 = new Entity({});
        // c1.onReady(function() {
        //     console.info( "PEW" );
        // });
        //engine.addItem(e1);

        engine.Start();

        //console.dir( engine.entities[0] );

    </script>
</body>
</html>
