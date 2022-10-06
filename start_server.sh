re='^[0-9]{4,}+$'
if [[ $1 =~ $re ]] ; then 
  PORT=$1
else 
  echo 'Port is invalid or not set. Used default value.'
  PORT=3000
fi

php -S localhost:$PORT -t ./server