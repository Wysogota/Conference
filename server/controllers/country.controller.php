<?php
require_once APP_DIR . '/models/Country.php';
require_once APP_DIR . '/models/Coord.php';

function getCountryById($request)
{
  try {
    $countryId = $request->params['countryId'];

    $country = Country::findOneById($countryId);
    $coord = Coord::findOneById($country->coord_id);

    $result = [
      "id" => $country->id,
      "name" => $country->name,
      "coord_id" => $country->coord_id,
      "lat" => $coord->lat,
      "lng" => $coord->lng,
    ];

    http_response_code(200);
    return json_encode(['data' => $result]);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function getCountries($request)
{
  try {
    $counties = Country::findAll();
    http_response_code(200);
    return json_encode(['data' => $counties]);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}

function createCountry($request)
{
  try {
    $body = $request->getBody();

    $coordBody = ['lat' => $body['lat'], 'lng' => $body['lng']];
    $coord = Coord::create($coordBody, true);

    $countryBody = [
      'name' => $body['name'],
      'coord_id' => $coord->id,
    ];
    $country = Country::create($countryBody, true);

    $result = [
      "id" => $country->id,
      "name" => $country->name,
      "coord_id" => $country->coord_id,
      "lat" => $coord->lat,
      "lng" => $coord->lng,
    ];

    http_response_code(201);
    return json_encode(['data' => $result]);
  } catch (PDOException $e) {
    return json_encode(['error' => $e->getMessage()]);
  }
}