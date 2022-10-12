<?php

namespace DB;

return [
  'host' => getenv('DB_HOST'),
  'db_name' => getenv('DB_NAME'),
  'username' => getenv('DB_USERNAME'),
  'password' => getenv('DB_PASSWORD'),
  'charset' => 'utf8',
];
