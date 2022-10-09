<?php
require_once 'DBModel.php';

class Coord extends DBModel
{
  public static $table_name = 'coords';

  public $id;
  public $lat;
  public $lng;
}
