#!/usr/bin/env bash

# Make sure some folders not in /workspace persist between worksapce restarts.
# You may add additional directories to this list.
declare -a CACHE_DIRS=(
  $HOME/.local
)

for DIR in "${CACHE_DIRS[@]}"; do
  mkdir -p $(dirname /workspace/cache$DIR)
  mkdir -p $DIR # in case $DIR doesn't already exist
  # On a fresh start with no prebuilds, we move existing directory
  # to /workspace. 'sudo mv' fails with 'no permission', I don't know why
  echo "Copying $DIR to /workspace/cache$DIR"
  echo $(ls /workspace/)
  if [ ! -d /workspace/cache$DIR ]; then
    sudo cp -rp $DIR /workspace/cache$DIR
    sudo rm -rf $DIR/*
  fi
  mkdir -p /workspace/cache$DIR # make sure it exists even if cp fails
  # Now /workspace/cache$DIR exists.
  # Use bind mount to make $DIR backed by /workspace/cache$DIR
  echo "Mounting $DIR to /workspace/cache$DIR"
  echo $(ls /workspace/)
  sudo mount --bind /workspace/cache$DIR $DIR
done
