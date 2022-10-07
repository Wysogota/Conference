<?php

class Router
{
  private $request;
  private $supportedHttpMethods = array(
    'GET',
    'POST',
  );

  function __construct(IRequest $request)
  {
    $this->request = $request;
  }

  function __call($name, $args)
  {
    list($route, $method) = $args;

    if (!in_array(strtoupper($name), $this->supportedHttpMethods)) {
      $this->invalidMethodHandler();
    }

    $this->request->getParams($route);

    $this->{strtolower($name)}[$this->formatRoute($route)] = $method;
  }

  /**
   * Removes trailing forward slashes from the right of the route.
   * @param route (string)
   */
  private function formatRoute($route)
  {
    $result = rtrim($route, '/');
    if ($result === '') {
      return '/';
    }

    preg_match_all('/:[^\/]*/', $route, $values);
    $param_keys = $values[0];
    $param_values = array();

    for ($i = 0; $i < count($param_keys); $i++) {
      $param_values[$i] = $this->request->params[substr($param_keys[$i], 1)];
    }

    if (count($param_keys) === count($param_values)) {
      for ($i = 0; $i < count($param_keys); $i++) {
        $result = str_replace($param_keys[$i], $param_values[$i], $result);
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
