# Use blank base
FROM gitpod/workspace-base

# Install linuxbrew
RUN mkdir ~/.cache && /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
ENV PATH=/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin/:$PATH
ENV MANPATH="$MANPATH:/home/linuxbrew/.linuxbrew/share/man"
ENV INFOPATH="$INFOPATH:/home/linuxbrew/.linuxbrew/share/info"
ENV HOMEBREW_NO_AUTO_UPDATE=1
RUN sudo apt remove -y cmake \
    && brew install cmake

# Install the GitHub CLI and rtx
RUN brew install gh \
    && brew install rtx
RUN echo 'eval "$(rtx activate bash)"' >> ~/.bashrc.d/10-rtx-activate

# Install Ruby
ENV WORKSPACE_GEM_HOME=/workspace/.gem
ENV RUBY_VERSION=3.1.4
RUN echo "export GEM_PATH=\"${WORKSPACE_GEM_HOME}:$(gem env home)\"" >> ~/.bashrc.d/60-ruby \
      && echo "export GEM_HOME=\"${WORKSPACE_GEM_HOME}\"" >> ~/.bashrc.d/60-ruby \
      && echo "export PATH=\"${WORKSPACE_GEM_HOME}/bin:\$PATH\"" >> ~/.bashrc.d/60-ruby
RUN rtx install ruby@$RUBY_VERSION

# Install Node
ENV NODE_VERSION=16.13.1
RUN rtx install node@$NODE_VERSION

# Install Redis
RUN sudo apt-get update \
  && sudo apt-get install -y \
  redis-server \
  && sudo rm -rf /var/lib/apt/lists/*

# Install PostgreSQL
ENV PGWORKSPACE="/workspace/.pgsql"
ENV PGDATA="$PGWORKSPACE/data"
RUN sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' && \
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add - && \
    sudo install-packages postgresql-12 postgresql-contrib-12

# Setup PostgreSQL server for user gitpod
ENV PATH="/usr/lib/postgresql/12/bin:$PATH"

SHELL ["/usr/bin/bash", "-c"]
RUN PGDATA="${PGDATA//\/workspace/$HOME}" \
 && mkdir -p ~/.pg_ctl/bin ~/.pg_ctl/sockets $PGDATA \
 && initdb -D $PGDATA \
 && printf '#!/bin/bash\npg_ctl -D $PGDATA -l ~/.pg_ctl/log -o "-k ~/.pg_ctl/sockets" start\n' > ~/.pg_ctl/bin/pg_start \
 && printf '#!/bin/bash\npg_ctl -D $PGDATA -l ~/.pg_ctl/log -o "-k ~/.pg_ctl/sockets" stop\n' > ~/.pg_ctl/bin/pg_stop \
 && chmod +x ~/.pg_ctl/bin/*
ENV PATH="$HOME/.pg_ctl/bin:$PATH"
ENV DATABASE_URL="postgresql://gitpod@localhost"
ENV PGHOSTADDR="127.0.0.1"
ENV PGDATABASE="postgres"
COPY --chown=gitpod:gitpod gitpod/postgresql-hook.bash $HOME/.bashrc.d/200-postgresql-launch
