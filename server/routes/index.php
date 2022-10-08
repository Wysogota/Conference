<?php
require_once 'conference.php';
require_once 'country.php';

define('API', '/api');

header('Content-Type: application/json');

function apiRequests($router)
{
  conferenceRequests($router);
  countryRequests($router);
}
