<?php

namespace Router;

interface IRequest
{
  public function getBody();
  public function getParams($route);
}
