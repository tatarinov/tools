#!/usr/bin/env bash

read -p "Are you sure you fix rigth for directory \"${PWD##*/}\"(y/n)?"
 
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
   exit
fi


#права на папки
chmod 775 ..
find . -type d -exec chmod 775 "{}" \;
#права все файлы папки
find . -type f -exec chmod 664 "{}" \;
chmod 775 index.php
chmod 775 backend/index.php
chmod 775 protected/yiic*

echo "complite"
