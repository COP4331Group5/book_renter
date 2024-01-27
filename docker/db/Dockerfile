FROM postgres

COPY --from=ghcr.io/jqlang/jq:1.7.1 /jq /usr/local/bin/jq

COPY ./docker/db/init.sql /docker-entrypoint-initdb.d/
COPY ./docker/db/post_init_demo.sh /docker-entrypoint-initdb.d/
COPY ./demo/demo_metadata.json /etc/demo/
