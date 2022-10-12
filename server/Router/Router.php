<?php

namespace Router;

class Router
{
  private $request;
  private $supportedHttpMethods = array(
    'GET',
    'POST',
    'PUT',
    'DELETE',
  );

  function __construct(IRequest $request)
  {
    $this->request = $request;
  }

  /**
   * Creates methods for api routing.
   *
   * @param name (string)
   * @param args (array)
   */
  function __call($name, $args)
  {
    list($route, $method) = $args;

    if (!in_array(strtoupper($name), $this->supportedHttpMethods)) {
      $this->invalidMethodHandler();
    }

    $this->request->getParams($route);
    $this->request->getBody($route);

    $this->{strtolower($name)}[$this->formatRoute($route)] = $method;
  }

  /**
   * Creates correct url path by replacing params to values.
   * 
   * @param route (string)
   */
  private function formatRoute($route)
  {
    $result = rtrim($route, '/');
    if ($result === '') {
      return '/';
    }

    # Select params from url
    preg_match_all('/:[^\/]*/', $route, $values);
    $param_keys = $values[0];
    $param_values = array();
    $params = &$this->request->params;

    if ($param_keys) {
      for ($i = 0; $i < count($params); $i++) {
        $paramName = substr($param_keys[$i], 1);
        if (array_key_exists($paramName, $params)) {
          $param_values[$i] = $params[$paramName]; #Get existing param values
        }
      }

      if (count($param_keys) === count($param_values)) {
        for ($i = 0; $i < count($param_keys); $i++) {
          $result = str_replace($param_keys[$i], $param_values[$i], $result); #Replace params in url
        }
      }
    }
    return $result;
  }

  private function invalidMethodHandler()
  {
    header("{$this->request->serverProtocol} 405 Method Not Allowed");
  }

  private function defaultRequestHandler()
  {
    header("{$this->request->serverProtocol} 404 Not Found");
  }

  /**
   * Resolves a route
   */
  function resolve()
  {
    $methodDictionary = $this->{strtolower($this->request->requestMethod)};
    $formatedRoute = $this->formatRoute($this->request->requestUri);
    $method = $methodDictionary[$formatedRoute];

    if (is_null($method)) {
      $this->defaultRequestHandler();
      return;
    }

    echo call_user_func_array($method, array($this->request));
  }

  function __destruct()
  {
    $this->resolve();
  }
}
