<?php

namespace DB;

use PDO;
use PDOException;

class Database
{
  private $link;

  public function __construct()
  {
    $this->connect();
  }

  private function connect()
  {
    try {
      $config = require 'config.php';

      $host = $config['host'];
      $dbname = $config['db_name'];
      $charset = $config['charset'];

      $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset;";

      $conn = new PDO($dsn, $config['username'], $config['password']);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      $this->link = $conn;
    } catch (PDOException $e) {
      echo 'Connection failed.' . $e->getMessage();
    }
  }

  public function execute($sql)
  {
    try {
      $sth = $this->link->prepare($sql);
      $sth->execute();
      return $this->link->lastInsertId();
    } catch (PDOException $e) {
      echo 'Prepare failed.' . $e->getMessage();
    }
  }

  public function query($sql)
  {
    $sth = $this->link->prepare($sql);
    $sth->execute();
    $result = $sth->fetchAll(PDO::FETCH_ASSOC);

    if (!$result) {
      return [];
    }

    return $result;
  }
}
