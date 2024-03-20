FROM node:current-alpine

ENV REVIEWDOG_VERSION=v0.17.2

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

RUN apk --no-cache add git findutils

RUN wget -O - -q https://raw.githubusercontent.com/reviewdog/reviewdog/master/install.sh| sh -s -- -b /usr/local/bin/ ${REVIEWDOG_VERSION}
# TODO: try pretty-reporter - RUN npm install -g markcmurphy/quality-docs-fork#pretty-reporter --save
RUN npm install -g bigcommerce/dev-docs-style-guide-linter#updated-messages --save

COPY entrypoint.sh /entrypoint.sh

# Set execute permissions for the entrypoint script
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]