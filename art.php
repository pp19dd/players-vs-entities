<?php

// returns JS structure

function parse_svg($filename) {
    $ret = array(
        "entities" => array()
    );

    $doc = new DOMDocument();
    $doc->loadXML(file_get_contents($filename));
    $xpath = new DOMXPath($doc);

    $rootNamespace = $doc->lookupNamespaceUri($doc->namespaceURI);
    $xpath->registerNamespace('svg', $rootNamespace);

    $entities = $xpath->query("//svg:g[@id='entities']");
    foreach( $entities as $entity ) {
        $paths = $xpath->query(".//svg:path", $entity);

        foreach( $paths as $path ) {
            $id = $path->getAttribute("id");
            $d = $path->getAttribute("d");
            $ret["entities"][$id] = $d;
        }
    }

    return( $ret );
}

$x = parse_svg("art-set-01.svg");
printf( "var artwork = %s;\n", json_encode($x, JSON_PRETTY_PRINT));
