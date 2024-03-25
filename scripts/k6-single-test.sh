#!/bin/bash

if [ $# -ne 1 ] || [ ! -f "$1" ]; then
    echo "provide only one test file"
    exit 99
fi

if [[ "$1" != *-test.js ]]; then
    echo "provided file does not end with -test.js"
    exit 99
fi

while read line; do
    if [ -n "$line" ]; then
        var_name=$(echo "$line" | cut -d'=' -f1)
        var_value=$(echo "$line" | cut -d'=' -f2- | tr -d '\r')
        eval "$var_name=\"$var_value\""
    fi
done < ".env"

k6 run \
    -e ENVIRONMENT="$ENVIRONMENT" \
    -e CLIENT_ID="$CLIENT_ID" \
    -e CLIENT_SECRET="$CLIENT_SECRET" \
    -e USERNAME="$USERNAME" \
    -e PASSWORD="$PASSWORD" \
    "$1"
