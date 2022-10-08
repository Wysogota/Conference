<?php
require_once 'conference.php';
require_once 'country.php';

function apiRequests($router)
{
  define('API', '/api');
  header('Content-Type: application/json');

  conferenceRequests($router);
  countryRequests($router);
}
