
# Login-form v2.6.0
Библиотека авторизации пользователя в системах

Включает:
1.Компонент логина
2.Компонент отображения залогиненого пользователя

## Установка в свой проект

Скопировать директорию /packages в корень своего проекта
> Перед установкой зависимостей `npm | yarn install` - в `package.json` в разделе `dependencies`
> требуется добавить путь к библиотеке: `"login-form": "file:./packages/login-form"`
В `main.ts` проекта создать глобальную шину на основе экземпляра Vue
```ts
window.EVENT_BUS = new Vue()
```

## Обновление в своём проекте
1. Удалить "packages/login-form"
2. Скопировать "packages/login-form" из репозитория в свой "packages/login-form"
3. Удалить node_modules
4. Выполнить yarn install

# Подключение компонента

## Подключение в App.vue
```vue
// Важно использовать именно `v-if`
<template lang="pug">
#app
    AppHeader( v-if="isUserLoggedIn" )
    RouterView
    AppFooter( v-if="isUserLoggedIn" )
</template>
```


## Подключение Vuex
```ts store\index.ts

// Подключение модуля авторизации в систему,
// при необходимости работы с данными пользователя

import { authStore } from 'login-form'
export default new Vuex.Store({
  modules: {
    ...
    authStore,
  }
```

## Подключение Vue Router
```ts
// К путям роутера необходимо добавить проверку перед переходом по ним
// Если доступ к пути возможен только авторизованному пользователю, указываем beforeEnter: isAuthorized
// Если доступ к пути возможен только не авторизованному, указываем beforeEnter: isNotAuthorized
// Пример содержимого файла router/index.ts :

import MainView from '@/views/MainView.vue'
import LoginView from '@/views/LoginView.vue'

import { checkADFSAuth } from 'login-form'

Vue.use(VueRouter)

const isAuthorized = (to: any, from: any, next: any) => {
  if (sessionStorage.getItem('access_token') !== null) {
    next()
    return
  }
  next('/login')
}

const isNotAuthorized = (to: any, from: any, next: any) => {
  checkADFSAuth()
  if (sessionStorage.getItem('access_token') === null) {
    next()
    return
  }
  next('/')
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
    beforeEnter: isAuthorized,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    beforeEnter: isNotAuthorized,
  },
]
```

## Подключение в компонентах
```vue
// Представление авторизации
<template lang="pug">
    LoginForm(
      systemName="ССИ"
      pathAfterLogon="/test"
      :allowedPermits="allowedPermits"
    )
</template>

<script lang="ts">
import { LoginForm } from 'login-form'

@Component({ components: { LoginForm } })
export default class LoginView extends Vue {
    public allowedPermits: string[] = [
      'ssi-proxy',
      'ssi_sources'
    ]

}
</script>
```

```vue
// Панель пользователя в AppHeader
<template lang="pug">
    .header
        .navigation
        UserPanel(
          @logout="doSomthing"
        )
</template>

<script lang="ts">
  import { UserPanel } from 'login-form';

  export default {
    components: { UserPanel },
  };
</script>
```
## Пропсы и события
> Форма логина LoginForm
```vue
<template lang="pug">
    LoginForm(
      systemName="ССИ"
      pathAfterLogon="/test"
      :allowed-roles="allowedPermits"
      @login="doSomthing"
    )
</template>
```
# Пропсы
 Имя              | Тип       | По умолчанию | Описание
-----------------|-----------|--------------|-------------------------------------------------
system-name       | `String` | `пустая строка`      | Имя системы в которую производится авторизация
pathAfterLogon | `String`  | `/`          | Путь перенаправления после успешной авторизации
allowedPermits | `Array<string>`  | `[]`          | Список кастомных разрешений для реализации гранулярности доступа

# События
 Имя              | Аргументы      |  Описание
 -----------------|-----------|--------------|-------------------------------------------------
 login| Без аргументов  |  Эмитится при успешной авторизации пользователя
 logout| Без аргументов  |  Эмитится при деавторизации пользователя

> Панель пользователя UserPanel
```vue
<template lang="pug">
  UserPanel(

  )
</template>
```
# Пропсы
> Отсутствуют
