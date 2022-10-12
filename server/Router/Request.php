<?php
require_once 'IRequest.php';

class Request implements IRequest
{
  public $params = array();
  public $body = array();

  function __construct()
  {
    $this->bootstrapSelf();
  }

  private function bootstrapSelf()
  {
    foreach ($_SERVER as $key => $value) {
      $this->{$this->toCamelCase($key)} = $value;
    }
  }

  private function toCamelCase($string)
  {
    $result = strtolower($string);

    preg_match_all('/_[a-z]/', $result, $matches);

    foreach ($matches[0] as $match) {
      $c = str_replace('_', '', strtoupper($match));
      $result = str_replace($match, $c, $result);
    }

    return $result;
  }

  public function getBody()
  {
    switch ($this->requestMethod) {
      case 'GET':
      case 'DELETE':
        return;
      case 'POST':
      case 'PUT':
        $data = file_get_contents('php://input');
        $this->body = json_decode($data, true);
    }
  }

  public function getParams($route)
  {
    preg_match_all('/:[^\/]*/', $route, $values);

    $param_keys = $values[0];
    array_walk($param_keys, function (&$item) {
      $item = substr($item, 1);
    });

    $path = str_replace(implode('/', $values[0]), '', $route);
    $param_values = array_values(array_filter(explode('/', str_replace($path, '', $this->requestUri))));

    if (count($param_keys) === count($param_values)) {
      for ($i = 0; $i < count($param_keys); $i++) {
        $this->params[$param_keys[$i]] = $param_values[$i];
      }
    }
  }
}
