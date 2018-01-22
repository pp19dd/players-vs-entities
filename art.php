<?php

// returns JS structure

function parse_svg($filename) {
    $ret = array();

    $doc = new DOMDocument();
    $doc->loadXML(file_get_contents($filename));
    $xpath = new DOMXPath($doc);

    $rootNamespace = $doc->lookupNamespaceUri($doc->namespaceURI);
    $xpath->registerNamespace('svg', $rootNamespace);

    $paths = $xpath->query("//svg:path");

    foreach( $paths as $path ) {
        $d = $path->getAttribute("d");
        $ret[] = $d;
    }

    return( $ret );
}

function get_set($folder) {
    $ret = array();
    $ret["entity_plant"] = parse_svg("sets/{$folder}/flower.svg");
    $ret["entity_zombie"] = parse_svg("sets/{$folder}/zombie.svg");
    return( $ret );
}

$x = get_set("test");

printf( "var artwork = %s;\n", json_encode($x, JSON_PRETTY_PRINT));
