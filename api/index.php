<?php

require_once 'vendor/autoload.php';


try {
    $conexion = new PDO('mysql:host=sql3.freemysqlhosting.net;dbname=sql3283292', 'sql3283292', 'YEVT9Ng7pM');
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

    $fluent = new FluentPDO($conexion);

    $action = isset($_GET['a']) ? $_GET['a'] : null;

    switch($action) {
        case 'listar':
            header('Content-Type: application/json');
            print_r(json_encode(listar($fluent)));
            break;
    }

} catch (Exception $e) {
    echo 'error' . $e->getMessage();
}


function listar($fluent)
{
    return $fluent
        ->from('motivos_es_gt')
        ->select('motivos_es_gt.*')
        ->fetchAll();
}

