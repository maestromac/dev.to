# Use blank base
FROM gitpod/workspace-base

# Install the GitHub CLI
RUN mkdir ~/.cache && /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
ENV PATH=/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin/:$PATH
ENV MANPATH="$MANPATH:/home/linuxbrew/.linuxbrew/share/man"
ENV INFOPATH="$INFOPATH:/home/linuxbrew/.linuxbrew/share/info"
ENV HOMEBREW_NO_AUTO_UPDATE=1
RUN sudo apt remove -y cmake \
    && brew install cmake
RUN brew install gh

# Install rbenv and Ruby
ENV RUBY_VERSION=3.1.4
ENV NODE_VERSION=16.13.1
ENV WORKSPACE_GEM_HOME=/workspace/.gem
RUN brew install rtx
RUN echo 'eval "$(rtx activate bash)"' >> ~/.bashrc
RUN rtx install node@$NODE_VERSION
RUN npm install -g yarn
RUN rtx install ruby@$RUBY_VERSION

# RUN rtx use -g ruby@$RUBY_VERSION \
#   && echo "export GEM_PATH=\"${WORKSPACE_GEM_HOME}:$(gem env home)\"" >> ~/.bashrc.d/60-ruby \
#   && echo "export GEM_HOME=\"${WORKSPACE_GEM_HOME}\"" >> ~/.bashrc.d/60-ruby
