re='^[0-9]{4,}+$'
if [[ $1 =~ $re ]] ; then 
  PORT=$1
else 
  echo 'Port is invalid or not set. Used default value.'
  PORT=5000
fi

env $(cat ./server/.env | xargs) php -S localhost:$PORT -t ./server