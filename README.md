# otus_webpython_030

Login And Registration on "Django" + "Redux&React" separately.

This is not the clean mono-repository!

It contains real two parts - **backend** and **frontend**. They are independent and communicated by API.

Add CHAT-entity (GIF-animation):
<kbd>![react_redux_5.gif](README.files/img/screencasts/react_redux_5.gif)</kbd>

## Old versions

Look at its GIF-animation:
<kbd>![react_redux_3.gif](README.files/img/screencasts/react_redux_3.gif)</kbd>

After refactor and user-friendly:
<kbd>![react_redux_4.gif](README.files/img/screencasts/react_redux_4.gif)</kbd>


## Checking

Run **backend** at first terminal window:
```bash
python3 manage.py runserver
```
```text
fuser -k 8000/tcp
```
Run **frontend** at second terminal window:

```bash
cd myapp/ && npm i && npm start
```

```bash
cd myapp/ && npm start
```

Worked urls:
* Django (mysite) - **backend** part
  * http://127.0.0.1:8000/
  * http://127.0.0.1:8000/token-auth/
  * http://127.0.0.1:8000/api/ver.0/
* React (myapp) - **frontend** part
  * http://127.0.0.1:3000/

## Manage

### Init Django by default user data

```bash
python3 manage.py init_acl # Access control list
```
Являет собьой последовательный вызов других manage-процедур

```bash
python3 manage.py init_users  # Массовое создание Django пользователей
python3 manage.py init_users_groups  # Массовое создание групп
python3 manage.py init_groups_permissions  # Массовое назначение прав группам
```

### Init Django by default test data

```bash
python3 manage.py init_test_data # Create chats and access to them
```

## Testing

### Test backend 

#### Test backend by `Unittest`

All:

```bash
python3 manage.py test
```

Separately:

```bash
python3 manage.py test flood_app.tests.LowLevelTDDTestCase # Low level TDD
python3 manage.py test flood_app.tests.UserTestCase # can be creating / exists
python3 manage.py test flood_app.tests.ChatTestCase # can be creating / exists, string_representation, created_recently
python3 manage.py test flood_app.tests.AccessTestCase # uniquest
```

As result:

```bash
pip install coverage 
coverage run --source='.' manage.py test
coverage report
```

```text
developer@TOSHIBA:~/PycharmProjects/otus_webpython_030$ coverage report
Name                                                                               Stmts   Miss  Cover
------------------------------------------------------------------------------------------------------
core_app/__init__.py                                                                   0      0   100%
core_app/admin.py                                                                      1      0   100%
core_app/apps.py                                                                       3      3     0%
core_app/management/__init__.py                                                        0      0   100%
core_app/management/commands/__init__.py                                               0      0   100%
core_app/management/commands/init_acl.py                                              17     17     0%
core_app/management/commands/init_groups_permissions.py                               25     25     0%
core_app/management/commands/init_users.py                                            36     36     0%
core_app/management/commands/init_users_groups.py                                     24     24     0%
core_app/migrations/__init__.py                                                        0      0   100%
core_app/models.py                                                                     1      0   100%
core_app/serializers.py                                                               26     11    58%
core_app/tests.py                                                                      1      0   100%
core_app/urls.py                                                                       3      0   100%
core_app/views.py                                                                     18      7    61%
django_admin_features/__init__.py                                                      0      0   100%
django_admin_features/django_model_admin/__init__.py                                   0      0   100%
django_admin_features/django_model_admin/model_admin.py                               41     41     0%
django_admin_features/django_model_admin_custom_field_decorators/__init__.py           0      0   100%
django_admin_features/django_model_admin_custom_field_decorators/helper/attrs.py      19     18     5%
django_admin_features/django_model_admin_custom_field_decorators/html.py              84     67    20%
flood_app/__init__.py                                                                  0      0   100%
flood_app/admin.py                                                                    20      1    95%
flood_app/apps.py                                                                      3      3     0%
flood_app/management/__init__.py                                                       0      0   100%
flood_app/management/commands/__init__.py                                              0      0   100%
flood_app/management/commands/init_test_data.py                                       26     26     0%
flood_app/migrations/0001_initial.py                                                   7      0   100%
flood_app/migrations/0002_chat_chatmessage.py                                          6      0   100%
flood_app/migrations/0003_auto_20190102_1339.py                                        6      0   100%
flood_app/migrations/0004_auto_20190102_1936.py                                        4      0   100%
flood_app/migrations/__init__.py                                                       0      0   100%
flood_app/models.py                                                                   22      1    95%
flood_app/serializers.py                                                              23      5    78%
flood_app/tests.py                                                                    96      1    99%
flood_app/urls.py                                                                      3      0   100%
flood_app/views.py                                                                    60     31    48%
manage.py                                                                              9      2    78%
mysite/__init__.py                                                                     0      0   100%
mysite/middleware.py                                                                  18     18     0%
mysite/settings.py                                                                    21      0   100%
mysite/urls.py                                                                         4      0   100%
mysite/utils.py                                                                        9      6    33%
mysite/wsgi.py                                                                         4      4     0%
------------------------------------------------------------------------------------------------------
TOTAL                                                                                640    347    46%

```

#### Test backend by `Pytest`

```bash
pip install pytest

pytest 
```
build fixture with its semantics identity

```text

Coverage report: 91% Show keyboard shortcuts

Module 	            statements 	missing 	excluded 	coverage
flood_app/models.py 22 	        2 	        0 	        91%
Total 	            22 	        2 	        0 	        91%

coverage.py v4.5.2, created at 2019-01-09 23:09

```

## Router ( not ready homework part )

* https://habr.com/post/329996/
* cd myapp/
* npm install --save react-router-dom

## Author

* https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
* **BorisPlus** - [https://github.com/BorisPlus/otus_webpython_030](https://github.com/BorisPlus/otus_webpython_030)

## License

Free

## Additional info

Homework within "Web-разработчик на Python" on https://otus.ru/learning

## Question

### Question FRONTEND

1) localStorage - игнорирует тип данных ?!

```bash
const a = 1;
localStorage.setItem('a', a);

console.log(typeof a); --> number 
console.log(typeof localStorage.getItem('a')); --> string 
```

2) (Разобрался) Объект response, переданный в функцию, в логе консоли отображается пустым

Имеется исключение
```bash
function ResponseException(message='ResponseException', response=null) {
  this.name = "ResponseException";
  this.message = message;
  this.response = response.clone();
};
```

вызываю
```bash
...
  return fetch(restFullUrl, params)
    .then(response => {
      if (!response.ok) {
        throw new ResponseException(response.status + ': ' + response.statusText, response);
      }
      return response;
    }) ...
```
проверяю и имею противоречие

```bash
console.log(error.response); # --> Response { type: "cors", url: "http://localhost:8000/api/ver.0/chat/list", redirected: false, status: 403, ok: false, statusText: "Forbidden", headers: Headers, bodyUsed: false }
console.log('JSON.stringify(error) = ' + JSON.stringify(error)); # -->{"name":"ResponseException","message":"403: Forbidden","response":{}});
console.log('error.response.statusText = ' + error.response.statusText); # --> error.response.statusText = Forbidden
```

Как правильно "печаталь" в лог response?

**ВОТ ТАК:**

```bash
console.log('error.message = ', error.message);
console.log('error.response = ', error.response);
```

### Question backend

1) Я не хочу передавать user_id, уже имея токен. Для ассоциации токена и пользователя, чтоб выдавать в списке только назначеные ему чаты, реализовал middleware _JWTAuthenticationMiddleware_. 

Все отлично работает на GET запросы: 

и проверяется на факт авторизации во view (@permission_classes([IsAuthenticated])) и

```python
...

@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
class ChatList(generics.ListAPIView):
    ...

...
```
и ассоциируется с кем надо

```python
    ...
        user = self.request.user
        if user.is_superuser:
            return models.Chat.objects.order_by('name').all()
        return models.Chat.objects.filter(
            Q(owner=user) |
            Q(access__user=user))...
```
Но при POST запросах пользователь всегда Аноним.
Нашел подобное:

* https://stackoverflow.com/questions/24784985/i-have-a-middleware-where-i-a-want-to-log-every-request-response-how-can-i-acce
* https://stackoverflow.com/questions/49311434/django-middleware-advised-not-to-use-request-post-why

Суть решения в том, что помещать запись в request о пользователе не в свойство user, а в любое другое приватное, например, `request._jwt_user`. И при post запросе опираться на него, что именно этот пользователь и отправил данные. Это фишка или баг Django. Связано видимо с каскдом соответствующих middleware, которые бдят за POST (`CsrfViewMiddleware` и т.п.) и режут его. Все б хорошо, но

а) Приходится исключать IsAuthenticated из @permission_classes для POST запросов

```python
...

@authentication_classes([])
@permission_classes([])
class ChatMessageCreate(generics.ListCreateAPIView):
    ...

...
```
б) Приходится иметь вызов "одного" и "того" же в middleware (что для перфекциониста беда посто)

```python
    def __call__(self, request):
        request._jwt_user = SimpleLazyObject(lambda: self.__class__.get_jwt_user(request))
        request.user = SimpleLazyObject(lambda: self.__class__.get_jwt_user(request))
        return self.process_request(request)
```

## Just for me

### Maybe would be needed - my garbage list

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



```bash
pip install pytest-django
pip install pytest-cov

coverage run -m pytest
```