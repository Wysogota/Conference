<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/controllers/conference.controller.php';

function conferenceRequests($router, $db)
{
  $path = API . '/conference';

  $router->get($path, function ($request) use ($db) {
    return getConferences($request, $db);
  });

  $router->get("$path/:conferenceId", function ($request) use ($db) {
    return getConferenceById($request, $db);
  });

  $router->post($path, function ($request) use ($db) {
    return json_encode($request->getBody());
    // return createConference($request, $db);
  });
}
