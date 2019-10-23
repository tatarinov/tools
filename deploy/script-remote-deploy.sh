#!/usr/bin/env bash

if [ -n "$1" ]
then
  BRANCH="$1"
else
  echo "Parameter branch not found"
  exit 1;
fi;

if [ -n "$2" ]
then
  PROJECT_PATH="$2"
else
  echo "Parameter project_path not found"
  exit 1;
fi;

cd "$PROJECT_PATH"

CURRENT_BRANCH="$(git branch | grep \* | cut -c 3-)"

if [ "$CURRENT_BRANCH" = "$BRANCH" ]
then
  git pull origin "$BRANCH:$BRANCH"
else
  git fetch origin "$BRANCH:$BRANCH"
  git checkout "$BRANCH"
fi

# Оther commands list (example: 'command 1 ; command 2')
if [ -n "$3" ]
then
 eval "$3"
fi;
