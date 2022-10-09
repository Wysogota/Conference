<?php
require_once 'DBModel.php';

class Conference extends DBModel
{
  public static $table_name = 'conferences';

  protected static $associations = [
    'countries' => 'country_id',
    'coords' => 'coord_id',
  ];

  public $id;
  public $name;
  public $event_date;
  public $coord_id;
  public $country_id;
}
