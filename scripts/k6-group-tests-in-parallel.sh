#!/bin/bash

if [ $# -ne 1 ] || [ ! -d "$1" ]; then
    echo "provide only one test directory"
    exit 99
fi

if [[ "$(basename $1)" != "dist" ]]; then
    echo "provided directory is not dist (bundled project)"
    exit 99
fi

while read line; do
    if [ -n "$line" ]; then
        var_name=$(echo "$line" | cut -d'=' -f1)
        var_value=$(echo "$line" | cut -d'=' -f2- | tr -d '\r')
        eval "$var_name=\"$var_value\""
    fi
done < ".env"

while read line; do
    k6 run \
        -e ENVIRONMENT="$ENVIRONMENT" \
        -e CLIENT_ID="$CLIENT_ID" \
        -e CLIENT_SECRET="$CLIENT_SECRET" \
        -e USERNAME="$USERNAME" \
        -e PASSWORD="$PASSWORD" \
        "$line" &
done < <(find "$1" -type f -name *-test.js)

wait