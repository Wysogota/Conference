<?php
interface IRequest
{
  public function getBody();
  public function getParams($route);
}
