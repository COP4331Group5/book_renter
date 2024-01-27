#!/bin/bash
set -e

filter='.[] | [.title, .author, .file_path] | @sh'

while read -r -d ''; do
declare -a "entry=($REPLY)"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    INSERT INTO books (title, author, file_path)
    VALUES ('${entry[0]}', '${entry[1]}', '${entry[2]}');
EOSQL
done < <(cat "/etc/demo/demo_metadata.json" | jq "$filter" --raw-output0)
