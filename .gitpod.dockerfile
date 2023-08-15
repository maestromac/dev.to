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
ENV WORKSPACE_GEM_HOME=/workspace/.gem
RUN brew install rtx
RUN echo 'eval "$(rtx activate bash)"' >> ~/.bashrc
RUN /bin/bash -c "source ~/.bashrc"
RUN rtx install
