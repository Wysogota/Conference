<?php

require_once $_SERVER['DOCUMENT_ROOT'] . '/routes/conference.php';

define('API', '/api');

// header('Content-type: json/application');

function apiRequests($router)
{
  conferenceRequests($router);
}
