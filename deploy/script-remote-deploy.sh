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
git pull origin "$BRANCH:$BRANCH"

#protected/yiic migrate up
#protected/yiic cache clear

# Оther commands list (example: 'command 1 ; command 2')
if [ -n "$3" ]
then
 eval "$3"
fi;

