<?php
require_once 'conference.php';
require_once 'country.php';

function homeRequests($router)
{
  header('Content-Type: text/html');
}

function apiRequests($router)
{
  define('API', '/api');
  header('Content-Type: application/json');

  conferenceRequests($router);
  countryRequests($router);
}
