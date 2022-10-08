<?php
require_once 'DBModel.php';

class Conference extends DBModel
{
  protected static $table_name = 'conferences';

  public $id;
  public $name;
  public $event_date;
  public $coord_id;
  public $country_id;
}
