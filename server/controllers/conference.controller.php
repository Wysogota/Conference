<?php
require_once APP_DIR . '/models/Conference.php';

function getConferenceById($request)
{
  try {
    $conferenceId = $request->params['conferenceId'];
    $conference = Conference::findOneById($conferenceId);
    http_response_code(200);
    return json_encode($conference);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function getConferences($request)
{
  try {
    $conferences = Conference::findAll();
    http_response_code(200);
    return json_encode($conferences);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function createConference($request)
{
  try {
    $body = $request->getBody();
    $conference = Conference::create($body, true);
    http_response_code(201);
    return json_encode($conference);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function updateConference($request)
{
  try {
    $conferenceId = $request->params['conferenceId'];
    $body = $request->getBody();
    $conference = Conference::updateById($conferenceId, $body, true);
    http_response_code(200);
    return json_encode($conference);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function deleteConference($request)
{
  try {
    $conferenceId = $request->params['conferenceId'];
    $conference = Conference::deleteById($conferenceId, true);
    http_response_code(200);
    return json_encode($conference);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}
