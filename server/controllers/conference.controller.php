<?php
require_once APP_DIR . '/models/Conference.php';

function getConferenceById($request)
{
  $conferenceId = $request->params['conferenceId'];
  $conference = Conference::findOneById($conferenceId);
  http_response_code(200);
  return json_encode($conference);
}

function getConferences($request)
{
  $conferences = Conference::findAll();
  http_response_code(200);
  return json_encode($conferences);
}

function createConference($request)
{
  $body = $request->getBody();
  $conference = Conference::create($body, true);
  http_response_code(201);
  return json_encode($conference);
}

function updateConference($request)
{
  $conferenceId = $request->params['conferenceId'];
  $body = $request->getBody();

  $conference = Conference::updateById($conferenceId, $body, true);

  http_response_code(200);
  return json_encode($conference);
}

function deleteConference($request)
{
  $conferenceId = $request->params['conferenceId'];

  $conference = Conference::deleteById($conferenceId, true);

  http_response_code(200);
  return json_encode($conference);
}
