<?php
require_once APP_DIR . '/models/Conference.php';
require_once APP_DIR . '/models/Coord.php';

function getConferenceById($request)
{
  try {
    $conferenceId = $request->params['conferenceId'];
    $conference = Conference::findOneById($conferenceId);
    http_response_code(200);
    return json_encode(['data' => $conference]);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function getConferences($request)
{
  try {
    $conferences = Conference::findAll();
    http_response_code(200);
    return json_encode(['data' => $conferences]);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function createConference($request)
{
  try {
    $body = $request->getBody();

    $coordBody = ['lat' => $body['lat'], 'lng' => $body['lng']];
    $coord = Coord::create($coordBody, true);

    $conferenceBody = [
      'name' => $body['name'],
      'event_date' => $body['event_date'],
      'coord_id' => $coord->id,
      'country_id' => $body['country_id'],
    ];
    $conference = Conference::create($conferenceBody, true);

    $result = [
      "id" => $conference->id,
      "name" => $conference->name,
      "event_date" => $conference->event_date,
      "coord_id" => $conference->coord_id,
      "lat" => $coord->lat,
      "lng" => $coord->lng,
      "country_id" => $conference->country_id,
    ];

    http_response_code(201);
    return json_encode(['data' => $result]);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function updateConference($request)
{
  try {
    $conferenceId = $request->params['conferenceId'];
    $body = $request->getBody();

    $coordBody = ['lat' => $body['lat'], 'lng' => $body['lng']];
    $coord = Coord::updateById($body['coord_id'], $coordBody, true);

    $conferenceBody = [
      'name' => $body['name'],
      'event_date' => $body['event_date'],
      'country_id' => $body['country_id'],
    ];
    $conference = Conference::updateById($conferenceId, $conferenceBody, true);

    $result = [
      "id" => $conference->id,
      "name" => $conference->name,
      "event_date" => $conference->event_date,
      "coord_id" => $conference->coord_id,
      "lat" => $coord->lat,
      "lng" => $coord->lng,
      "country_id" => $conference->country_id,
    ];

    http_response_code(200);
    return json_encode(['data' => $result]);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function deleteConference($request)
{
  try {
    $conferenceId = $request->params['conferenceId'];

    $conference = Conference::deleteById($conferenceId, true);
    $coord = Coord::deleteById($conference->coord_id, true);

    $result = [
      "id" => $conference->id,
      "name" => $conference->name,
      "event_date" => $conference->event_date,
      "lat" => $coord->lat,
      "lng" => $coord->lng,
      "country_id" => $conference->country_id,
    ];

    http_response_code(200);
    return json_encode(['data' => $result]);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}
