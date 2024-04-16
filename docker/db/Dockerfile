FROM postgres

RUN apt-get update \
    && apt-get install cron -qqy

COPY --from=ghcr.io/jqlang/jq:1.7.1 /jq /usr/local/bin/jq

COPY ./docker/db/init.sql /docker-entrypoint-initdb.d/
COPY ./docker/db/crontab /etc/cron.d/crontab
COPY ./docker/db/entrypoint.sh /pg/

RUN chmod 0644 /etc/cron.d/crontab \
    && crontab /etc/cron.d/crontab

# COPY ./docker/db/post_init_demo.sh /docker-entrypoint-initdb.d/
# COPY ./docker/db/postgresql.conf /etc/postgresql/postgresql.conf
# COPY ./demo/demo_metadata.json /etc/demo/

ENTRYPOINT "/pg/entrypoint.sh"

CMD []
