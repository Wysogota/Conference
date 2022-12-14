<?php

namespace Models;

use DB\Database;
use ReflectionClass;
use ReflectionProperty;

require_once APP_DIR . '/Database/Database.php';

class DBModel
{
  public static $table_name;
  protected static $associations;

  protected function __construct($instance)
  {
    # Get all defined in model table fields 
    $reflect = new ReflectionClass($this);
    $public = $reflect->getProperties(ReflectionProperty::IS_PUBLIC);
    $static = $reflect->getProperties(ReflectionProperty::IS_STATIC);
    $props = array_diff($public, $static);

    # Get fields from associated tables that was defined by user
    $assocPropsNames = array_filter(
      $instance,
      function ($key) {
        $filterTableNames = array_keys(static::$associations);
        foreach ($filterTableNames as $tableName) {
          if (stripos($key, $tableName) !== false) return true; # Filter associated fields
        }
        return false;
      },
      ARRAY_FILTER_USE_KEY
    );

    foreach ($props as $prop) {
      $propName = $prop->getName();
      $this->{$propName} = $instance[$propName]; # Set values to model fields
    }
    foreach ($assocPropsNames as $key => $value) {
      $this->{$key} = $instance[$key]; # Set values to model associated fields
    }
  }

  public function __set($name, $value)
  {
    $this->$name = $value; # Set associted fields
  }

  /**
   * Forms string for joining associated tables.
   *
   * @param assocValues (array)
   * @return string
   */
  protected static function getAssociations($assocValues)
  {
    if (count($assocValues) === 0) {
      return '';
    }

    $tableName = static::$table_name;
    $assocTableNames = array_keys($assocValues);
    $assocArray = array();

    foreach ($assocTableNames as $assocTableName) {
      $assocId = static::$associations[$assocTableName];
      if ($assocId) {
        array_push($assocArray, "JOIN $assocTableName ON $tableName.$assocId=$assocTableName.id");
      }
    }
    $associations = implode(' ', $assocArray);
    return $associations;
  }

  /**
   * Forms string with values which should be selected.
   *
   * @param assocValues (array)
   * @return string
   */
  protected static function getSelectValues($assocValues)
  {
    $tableName = static::$table_name;
    $defaultSelectValue = "$tableName.*";

    if (count($assocValues) === 0) {
      return $defaultSelectValue;
    }

    $assocTableNames = array_keys($assocValues);
    $selectingValuesArray = array($defaultSelectValue);

    foreach ($assocTableNames as $assocTableName) {
      $valuesArray = array(); # Array for spicific associated table
      foreach ($assocValues[$assocTableName] as $value) {
        $namedValue = $assocTableName . '_' . $value; # Create AS name
        array_push($valuesArray, "$assocTableName.$value AS $namedValue"); # Push associated field to selecting values array
      }
      array_push($selectingValuesArray, implode(',', $valuesArray));
    }
    return implode(',', $selectingValuesArray);
  }

  protected static function db()
  {
    return new Database();
  }

  public static function findOneById($id, $assocValues = array())
  {
    $db = static::db();
    $tableName = static::$table_name;

    $associations = static::getAssociations($assocValues);
    $selectValues = static::getSelectValues($assocValues);
    $response = $db->query("SELECT $selectValues FROM $tableName $associations WHERE $tableName.id=$id;");

    if (!$response) {
      return [];
    }
    return new static($response[0]);
  }

  public static function findAll($assocValues = array())
  {
    $result = array();
    $db = static::db();
    $tableName = static::$table_name;

    $associations = static::getAssociations($assocValues);
    $selectValues = static::getSelectValues($assocValues);
    $response = $db->query("SELECT $selectValues FROM $tableName $associations ORDER BY updated_at DESC;");

    for ($i = 0; $i < count($response); $i++) {
      $result[$i] = new static($response[$i]);
    }

    return $result;
  }

  public static function create($body, $returning = false)
  {
    $db = static::db();
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

    return $lastId;
  }

  public static function updateById($id, $body, $returning = false)
  {
    $db = static::db();
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
    $db = static::db();
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
