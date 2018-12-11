# otus_webpython_023

Login And Registration on Django  Redux&React separately.

**Почему после авторизации компонент(-ы) не обновляе(-ю)тся?**

## Checking


Run at first terminal window:
```
python3 manage.py runserver
```

Run at second terminal window:

```
cd myapp/ && npm i && npm start
```

Worked urls:
* Django (mysite)
  * http://127.0.0.1:8000/
  * http://127.0.0.1:8000/core_app/users/
  * http://127.0.0.1:8000/core_app/current_user/
* React (myapp)
  * http://127.0.0.1:3000/

## Why not rerender page

Help. I just need somebody help.

Look GIF-animation:
<kbd>![not_rerender.png](README.files/img/screencasts/not_rerender.gif)</kbd>

Почему после авторизации компонент не обновляется? Логин user\user

Авторизация проходит, но как компонент переобновить? И как обновить другие компоненты. Если например прошел авторизацию, то должны появится новые пункты меню и должен появится в контенте другого компонента, опирающегося на наличие токена авторизации, новый див с текстом.

## Maybe would be needed - my garbage list

 * cd myapp/
 * npm install --save-dev redux
 * npm install --save-dev react-redux
 * npm install --save react react-dom prop-types redux react-redux
 * npm install --save-dev react redux-thunk
 * npm install --save-dev react redux-logger
 * npm install -i webpack webpack-cli
 * npm install --save-dev babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-react babel-plugin-transform-decorators-legacy 
 * npm install babel-loader@next
 * npm install --save-dev @babel/core@7
 * npm install --save-dev @babel/core@7
 * npm install --save-dev @babel/plugin-proposal-decorators
 * npm install --save-dev babel-plugin-transform-decorators-legacy
 * npm install --save-dev babel-plugin-transform-class-properties
 * npm install --save-dev @babel/preset-env
 * npm install --save-dev @babel/preset-react
 
## Author

* https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
* **BorisPlus** - [https://github.com/BorisPlus/otus_webpython_023](https://github.com/BorisPlus/otus_webpython_025)

## License

Free

## Additional info

Homework within "Web-разработчик на Python" on https://otus.ru/learning
