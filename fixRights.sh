#!bash
#права на папки
find . -type d | xargs chmod 775 {} \;
#права все файлы папки
find . -type f | xargs chmod 664 {} \;
chmod 775 index.php
chmod 775 backend/index.php
chmod 775 protected/yiic*
