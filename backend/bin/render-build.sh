#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
# If you are strictly an API, you might not need assets:precompile, 
# but it's safe to keep for standard Rails setups.
bundle exec rails assets:precompile
bundle exec rails assets:clean

# This line runs your migrations on every deploy
bundle exec rails db:migrate