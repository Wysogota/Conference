<?php
require_once 'DBModel.php';

class Coords extends DBModel
{
  protected static $table_name = 'coords';

  public $id;
  public $lat;
  public $lng;
}
