<?php
require_once 'DBModel.php';

class Country extends DBModel
{
  protected static $table_name = 'countries';

  public $id;
  public $name;
  public $coord_id;
  public $created_at;
  public $updated_at;
}
