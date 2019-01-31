<?php
require( "functions.php" );

$sprites = get_sprites();
if( isset( $_GET['edit']) ) {
    $sprite = get_sprite($sprites, $_GET['edit']);
    if( $sprite === false ) die( "SPRITE NOT FOUND" );
}

?>
<!doctype html>
<html>
<head>
    <meta charset="utf-8" />
    <title>sprites</title>
    <link rel="stylesheet" type="text/css" href="../default.css?ts=<?php echo time() ?>" />
    <script src="zones.js?ts=<?php echo time() ?>"></script>
</head>
<body class="sprite-editor">
<?php if( !isset($_GET['edit'])) { ?>

    <div class="sprites">
<?php foreach( $sprites as $sprite ) { ?>

        <div class="sprite">
            <div class="size"><?php echo $sprite["width"] ?> x <?php echo $sprite["height"] ?></div>
            <div class="filesize"><?php echo number_format($sprite["filesize"]) ?> bytes</div>
            <div class="filename"><?php echo $sprite["filename"] ?></div>
            <div class="config"><a href="?edit=<?php echo $sprite["md5"] ?>">Config</a></div>
        </div>
<?php } ?>
</div>

<?php } else { ?>

<h1>Editing <?php echo $sprite["filename"] ?></h1>

<div class="single-sprite">
    <canvas data-image="<?php echo $sprite["filename"] ?>" id="single-sprite-canvas" style="width:<?php echo $sprite["width"] ?>px; height:<?php echo $sprite["height"] ?>px"></canvas>
</div>

<button id="add-zone">Add Zone</button>
<div id="sprite-tables"></div>

<script>
var zones = new Array();
var b = document.getElementById('add-zone');
b.addEventListener("click", function() {
    var z = new Zone({
        x: 0, y: 0,
        w: <?php echo $sprite["width"] ?>, h: <?php echo $sprite["height"] ?>,
        sprites_hor: 1,
        sprites_ver: 1,
        sprite_width: 32,
        sprite_height: 32
    });

    zones.push(z);
    z.child_node = z;
});

//for( var i = 0; i < 5; i++ ) {
b.click();
//}

</script>

<!--
<table border="1">
    <thead>
        <tr>
            <th>property</th>
            <th>value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cell count horizontal</td>
            <td><input id="w" spellcheck="false" autocomplete="off" value="1" /></td>
        </tr>
        <tr>
            <td>Cell count vertical</td>
            <td><input id="h" spellcheck="false" autocomplete="off" value="1" /></td>
        </tr>
    </tbody>
</table>
-->

<?php } ?>

</body>
</html>
