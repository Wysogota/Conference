<?php

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
      $config = require_once 'config.php';

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
    $sth = $this->link->prepare($sql);
    return $sth->execute();
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

return new Database();
