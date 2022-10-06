<?php

function getConferenceById($router, $db)
{
  $conference = $db->query("SELECT * FROM conferences WHERE id=$router->conferenceId;");
  return json_encode($conference);
}

function getConferences($router, $db)
{
  $conferences = $db->query('SELECT * FROM conferences;');
  return json_encode($conferences);
}
