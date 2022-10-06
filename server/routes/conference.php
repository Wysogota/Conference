<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/controllers/conference.controller.php';

function conferenceRequests($router)
{
  $path = API . '/conference';

  $router->get($path, function () use ($router) {
    return getConferences($router);
  });

  $router->get("$path/:conferenceId", function () use ($router) {
    return getConferenceById($router);
  });
}
