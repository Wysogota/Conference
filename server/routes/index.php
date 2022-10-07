<?php
require_once APP_DIR . '/routes/conference.php';

define('API', '/api');

header('Content-Type: application/json');

function apiRequests($router)
{
  conferenceRequests($router);
}
