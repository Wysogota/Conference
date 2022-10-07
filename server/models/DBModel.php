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

  public static function create($body, $returning = false)
  {
    $db = require_once DB_PATH;
    $table = static::$table_name;

    $fields = implode(',', array_keys($body));
    $mappedValues = array_map(fn ($value) => "\"$value\"", array_values($body));
    $values = implode(',', $mappedValues);

    $sql = "INSERT INTO $table ($fields) VALUES ($values);";
    $lastId = $db->execute($sql);

    if ($returning) {
      $response = $db->query("SELECT * FROM $table WHERE id=$lastId;");
      return new static($response[0]);
    }
  }

  public static function updateById($id, $body, $returning = false)
  {
    $db = require_once DB_PATH;
    $table = static::$table_name;

    $updateArr = array();
    foreach ($body as $key => $value) {
      array_push($updateArr, "$key=\"$value\"");
    }
    $updateValues = implode(',', $updateArr);

    $sql = "UPDATE $table SET $updateValues WHERE id=$id;";
    $db->execute($sql);

    if ($returning) {
      $response = $db->query("SELECT * FROM $table WHERE id=$id;");
      return new static($response[0]);
    }
  }

  public static function deleteById($id, $returning = false)
  {
    $db = require_once DB_PATH;
    $table = static::$table_name;

    if ($returning) {
      $response = $db->query("SELECT * FROM $table WHERE id=$id;");
    }

    $sql = "DELETE FROM $table WHERE id=$id;";
    $db->execute($sql);

    if ($returning) {
      return new static($response[0]);
    }
  }
}
