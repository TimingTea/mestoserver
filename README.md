### Учебный  проект

## Версия v1.2.0
### ссылки на сервер:
http://timmesto.tk
http://130.193.37.32

* в проекте есть package.json;
* в проекте есть .editorconfig;
* в проекте есть .eslintrc, расширяющий конфигурацию airbnb-base, а также необходимые для работы линтера dev-зависимости;
* в проекте есть .gitignore;
* команда npm run start запускает сервер на localhost:3000;
* команда npm run dev запускает сервер на localhost:3000 с хот релоудом;
* адрес localhost:3000 загружает фронтенд проекта Mesto, который вы делали;
* в ответ на запрос GET localhost:3000/users сервер вернёт JSON-объект из файла users.json;
* в ответ на запрос GET localhost:3000/cards сервер вернёт JSON-объект из файла cards.json;
* в ответ на запрос GET localhost:3000/users/8340d0ec33270a25f2413b69, сервер вернёт JSON-объект пользователя с переданным после /users идентификатором;
* если пользователя с запрошенным идентификатором нет, API должен возвращать 404 статус ответа и JSON: { "message": "Нет пользователя с таким id" };
* при запросе на несуществующий адрес, API должен возвращать 404 статус ответа и JSON: { "message": "Запрашиваемый ресурс не найден" }.

## Установка
* Скачать репозиторий: git clone https://github.com/TimingTea/mestoserver.git
* Установить npm-зависимости: npm i
* Запустить проект на локальном сервере: npm run start
* Команда npm run dev запускает сервер на localhost:3000 с хот релоудом;
