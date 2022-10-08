<?php
require_once APP_DIR . '/controllers/conference.controller.php';

function conferenceRequests($router)
{
  $PATH = API . '/conference';

  $router->get($PATH, fn ($request) => getConferences($request));

  $router->get("$PATH/:conferenceId", fn ($request) => getConferenceById($request));

  $router->post($PATH, fn ($request) => createConference($request));

  $router->put("$PATH/:conferenceId", fn ($request) => updateConference($request));

  $router->delete("$PATH/:conferenceId", fn ($request) => deleteConference($request));
}
