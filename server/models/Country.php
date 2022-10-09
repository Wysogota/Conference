<?php
require_once 'DBModel.php';

class Country extends DBModel
{
  public static $table_name = 'countries';

  protected static $associations = [
    'coords' => 'coord_id',
  ];

  public $id;
  public $name;
  public $coord_id;
}
