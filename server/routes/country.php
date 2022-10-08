<?php
require_once APP_DIR . '/controllers/country.controller.php';

function countryRequests($router)
{
  $PATH = API . '/country';

  $router->get($PATH, fn ($request) => getCountries($request));

  $router->get("$PATH/:countryId", fn ($request) => getCountryById($request));

  $router->post($PATH, fn ($request) => createCountry($request));
}
