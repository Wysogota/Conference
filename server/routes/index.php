<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/routes/conference.php';

define('API', '/api');

header('Content-Type: application/json');

function apiRequests($router)
{
  conferenceRequests($router);
}
