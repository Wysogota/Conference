<?php
require_once APP_DIR . '/models/Conference.php';

function getConferenceById($request)
{
  $conferenceId = $request->params['conferenceId'];
  $conference = Conference::findOneById($conferenceId);
  return json_encode($conference);
}

function getConferences($request)
{
  $conferences = Conference::findAll();
  return json_encode($conferences);
}

function createConference($request, $db)
{
  // $body = $router->getBody();

  // $date = $body['event_date'];
  // $coord_id = $body['coord_id'];
  // $country_id = $body['country_id'];

  // print_r($body);

  return json_encode($request->getBody());



  // $conference = $db->execute("INSERT INTO conferences (event_date, coord_id, country_id) VALUES ($date, $coord_id, $country_id);");
  // return json_encode($conference);
}
