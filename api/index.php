<?php

require_once 'vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


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
    case 'registrar':
      header('Content-Type: application/json');
      $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
      print_r(json_encode(registrar($fluent, $data)));
      break;
    case 'eliminar':
      header('Content-Type: application/json');
      print_r(json_encode(eliminar($fluent, $_GET['id'])));
      break;
    case 'obtener':
      header('Content-Type: application/json');
      print_r(json_encode(obtener($fluent, $_GET['id'])));
      break;
    case 'editar':
      header('Content-Type: application/json');
      $data = json_decode(utf8_encode(file_get_contents("php://input")), true);
      print_r(json_encode(editar($fluent, $data)));
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

function registrar($fluent, $data)
{
  try
  {
    $fluent->insertInto('motivos_es_gt', $data)
      ->execute();
  }
  catch (Exception $e)
  {
    echo($e->getMessage());
    die($e->getMessage());
  }


  return true;
}

function eliminar($fluent, $id)
{
  $fluent->deleteFrom('motivos_es_gt', $id)
    ->execute();

  return true;
}

function obtener($fluent, $id)
{
  return $fluent->from('empleado', $id)
    ->select('motivos_es_gt.*')
    ->fetch();
}

function editar($fluent, $data)
{
  $id = $data['ID'];
  return $fluent->update('motivos_es_gt', $data, $id)->execute();
}

