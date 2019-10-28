#!/usr/bin/env bash

COMMANDS=""

if [ -n "$1" ]
then
  BRANCH="$1"
else
  echo "Parameter branch not found"
  exit 1
fi;

if [ -n "$2" ]
then
  PROJECT_PATH="$2"
else
  echo "Parameter project_path not found"
  exit 1
fi;


#get and decode commands from argument
if [ ! -n "$3" ]; then
 exit 0
else
 COMMANDS=`echo $3 | tr '@' '\n\r' | base64 --decode`
fi

# commands list (example: 'command 1 ; command 2')
if [ "$COMMANDS" = "" ]; then
 exit 0
fi

echo "Executing remote commands..."

cd "$PROJECT_PATH"

if [[ $COMMANDS == *"git-pull"* ]]; then

  #delete git-pull from commnd list
  COMMANDS=${COMMANDS/\;git-pull/}
  COMMANDS=${COMMANDS/\git-pull;/}
  COMMANDS=${COMMANDS/\git-pull/}

  CURRENT_BRANCH="$(git branch | grep \* | cut -c 3-)"
  if [ "$CURRENT_BRANCH" = "$BRANCH" ]; then
    git pull origin "$BRANCH:$BRANCH"
  else
    git fetch origin "$BRANCH:$BRANCH"
    git checkout "$BRANCH"
  fi
fi

eval $COMMANDS

