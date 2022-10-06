<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/controllers/conference.controller.php';

function conferenceRequests($router, $db)
{
  $path = API . '/conference';

  $router->get($path, function () use ($router, $db) {
    return getConferences($router, $db);
  });

  $router->get("$path/:conferenceId", function () use ($router, $db) {
    return getConferenceById($router, $db);
  });
}
