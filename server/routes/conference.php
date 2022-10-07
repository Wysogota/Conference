<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/controllers/conference.controller.php';

function conferenceRequests($router)
{
  $path = API . '/conference';

  $router->get($path, function ($request) {
    return getConferences($request);
  });

  $router->get("$path/:conferenceId", function ($request) {
    return getConferenceById($request);
  });

  $router->post($path, function ($request) {
    return createConference($request);
  });
}
