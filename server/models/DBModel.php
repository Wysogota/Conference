<?php
define('DB_PATH', APP_DIR . '/Database/Database.php');

class DBModel
{
  protected static $table_name;

  protected function __construct($instance)
  {
    $reflect = new ReflectionClass($this);
    $props = $reflect->getProperties(ReflectionProperty::IS_PUBLIC);
    foreach ($props as $prop) {
      $propName = $prop->getName();
      $this->{$propName} = $instance[$propName];
    }
  }

  public static function findOneById($id)
  {
    $db = require_once DB_PATH;
    $table = static::$table_name;

    $response = $db->query("SELECT * FROM $table WHERE id=$id;");

    if (!$response) {
      return [];
    }
    return new static($response[0]);
  }

  public static function findAll()
  {
    $result = array();
    $db = require_once DB_PATH;
    $table = static::$table_name;

    $response = $db->query("SELECT * FROM $table;");

    for ($i = 0; $i < count($response); $i++) {
      $result[$i] = new static($response[$i]);
    }

    return $result;
  }
}
