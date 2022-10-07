<?php

function getConferenceById($request, $db)
{
  $conferenceId = $request->params['conferenceId'];
  $conference = $db->query("SELECT * FROM conferences WHERE id=$conferenceId;");
  return json_encode($conference);
}

function getConferences($request, $db)
{
  $conferences = $db->query('SELECT * FROM conferences;');
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
