FROM node:current-alpine

ENV REVIEWDOG_VERSION=v0.17.2

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

RUN apk --no-cache add git findutils

RUN wget -O - -q https://raw.githubusercontent.com/reviewdog/reviewdog/master/install.sh| sh -s -- -b /usr/local/bin/ ${REVIEWDOG_VERSION}

RUN npm install -g bigcommerce/dev-docs-style-guide-linter#master --save

COPY entrypoint.sh /entrypoint.sh

# Set execute permissions for the entrypoint script
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]