# otus_webpython_030

Login And Registration on "Django" + "Redux&React" separately.

This is not the clean mono-repository!

It contains real two parts - **backend** and **frontend**. They are independent and communicated by API.

Look at its GIF-animation:
<kbd>![react_redux_3.gif](README.files/img/screencasts/react_redux_3.gif)</kbd>

## Checking


Run **backend** at first terminal window:
```
python3 manage.py runserver
```

Run **frontend** at second terminal window:

```
cd myapp/ && npm i && npm start
```

Worked urls:
* Django (mysite) - **backend** part
  * http://127.0.0.1:8000/
  * http://127.0.0.1:8000/token-auth/
  * http://127.0.0.1:8000/api/ver.0/
* React (myapp) - **frontend** part
  * http://127.0.0.1:3000/


## Maybe would be needed - my garbage list

 * cd myapp/
 * npm install --save-dev redux
 * npm install --save-dev react-redux
 * npm install --save react react-dom prop-types redux react-redux
 * npm install --save-dev react redux-thunk
 * npm install --save-dev react redux-logger
 * npm install --save-dev weak-key
 
 * npm install -i webpack webpack-cli
 * npm install --save-dev babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-react babel-plugin-transform-decorators-legacy 
 * npm install moment --save
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
* **BorisPlus** - [https://github.com/BorisPlus/otus_webpython_030](https://github.com/BorisPlus/otus_webpython_030)

## License

Free

## Additional info

Homework within "Web-разработчик на Python" on https://otus.ru/learning
