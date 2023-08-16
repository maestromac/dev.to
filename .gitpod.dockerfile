# Use postgres as base image to keep setup simple.
# It is based on a lightweight 'base' image.
FROM gitpod/workspace-postgres

# Install the GitHub CLI
RUN brew install gh

# Install rtx as version manager
RUN brew install rtx
RUN echo 'eval "$(rtx activate bash)"' >> ~/.bashrc.d/rtx.bashrc

# Install Ruby and Node
ENV RUBY_VERSION=3.1.4
ENV NODE_VERSION=16.13.1
RUN rtx install node@$NODE_VERSION
RUN rtx install ruby@$RUBY_VERSION

# Install Redis
RUN sudo apt-get update \
        && sudo apt-get install -y \
        redis-server \
        && sudo rm -rf /var/lib/apt/lists/*
