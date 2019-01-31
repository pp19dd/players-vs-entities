<?php

// lists all available sprites
function get_sprites() {
    $all = glob("*");
    $ret = array();

    foreach( $all as $ff ) {
        if( !is_file($ff) ) continue;
        $i = getimagesize($ff);
        if( $i === false ) continue;

        $temp = array(
            "filename" => $ff,
            "filesize" => filesize($ff),
            "width" => $i[0],
            "height" => $i[1],
            "md5" => md5_file($ff)
        );

        $info_file = $ff . ".json";
        if( file_exists($info_file) ) {
            $info = @json_decode(file_get_contents($info_file), true);
            if( $info !== null ) $temp["info"] = $info;
        }

        $ret[] = $temp;
        unset( $temp );
    }
    return( $ret );
}

// returns one sprite from the list, identified by md5 hash of the file
function get_sprite($sprites, $hash) {
    foreach( $sprites as $sprite ) {
        if( $sprite["md5"] === $_GET['edit'] ) return($sprite);
    }
    return(false);
}
