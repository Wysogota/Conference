<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/routes/conference.php';

define('API', '/api');

header('Content-Type: application/json');

function apiRequests($router)
{
  $db = require_once $_SERVER['DOCUMENT_ROOT'] . '/Database/Database.php';
  
  conferenceRequests($router, $db);
}
