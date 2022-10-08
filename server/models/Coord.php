<?php
require_once 'DBModel.php';

class Coord extends DBModel
{
  protected static $table_name = 'coords';

  public $id;
  public $lat;
  public $lng;
}
