
# user-permissons v1.8.0
Библиотека управления ролями пользователей.

Реализовано:
- Авторизация
- Кодогенерированное API
- Просмотр списка активных пользователей
- Просмотр списка заблокированных пользователей
- Просмотр списка групп
- Добавление пользователя для локального домена
- Удаление пользователя для локального домена
- Блокировка пользователя для локального домена
- Разблокировка пользователя для локального домена
- Редактирование групп пользователя для локального домена
- Добавление группы локального домена
- Удаление группы локального домена
- Редактирование списка пользователей группы локального домена
- Редактирование secure_role, secure_countries
- Невозможность удаления / блокировки учётной записи залогиненного пользователя
- Изменение псевдонима / пароля пользователя
- Установка разрешенных регионов
- Установка разрешений группам (secure_ ключи)
- Установка разрешений пользователю, установка скрытых разрешений

## Требуемые зависимости
- Vuex
- LoginForm
- lodash
- Система в которую производится подключение должна использовать для авторизации библиотеку [login-form](https://git.mobiledep.ru/okolesina/common/login-form "Репозиторий login-form")

## Установка в свой проект
Инициализировать в main.ts глобальную шину событий
```ts
window.EVENT_BUS = new Vue()
```
Добавить в переменные окружения
```ts
AUTH_API_URL = "{адрес_API_авторизации}"
```

При отсутствии в проекте `src\types\declarations\global.d.ts` создать его, со следующим содержимым.
Если файл присутствует - дописать в него


```ts
interface Window {
  AUTH_API_URL: string,
  EVENT_BUS: Vue,
}
```

Скопировать директорию /packages в корень своего проекта
> Перед установкой зависимостей `npm | yarn install` - в `package.json` в разделе `dependencies`
> требуется добавить путь к библиотеке: `"user-permissions": "file:./packages/user-permissions"`

## Обновление в своём проекте
1. Удалить "packages/user-permissions"
2. Скопировать "packages/user-permissions" из репозитория в свой "packages/user-permissions"
3. Удалить node_modules
4. Выполнить yarn install

## Подключение Vuex-модулей

В проекте реализованы модули хранидища Vuex:

`packages\user-permissions\src\store\modules\useraccounts.module.ts`
Реализует хранилище для функционала "Пользователи"

`packages\user-permissions\src\store\modules\usergroups.module.ts`
Реализует хранилище для функционала "Группы"


Подключение хранилища библиотеки:
```js
// Импортировать модули хранилища из библиотеки.
// Экспортировать, добавив модули в раздел 'modules'

import { useraccounts, usergroups } from 'user-permissions'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    useraccounts,
    usergroups,
  },
})
```

## Подключение к Vue Router
```js
// Испортировать представление управления ролями пользователей
...
import { UserPermissions } from 'user-permissions'
...
// Добавить путь с проверкой на авторизацию,
// реализацию 'beforeEnter: isAuthorized' см. в репозитории 'login-form'
{
  path: '/userpermissons',
  name: 'userpermissons',
  component: UserPermissions,
  beforeEnter: isAuthorized
  },
```

## Подключение в компонентах
```vue
// Представление управления ролями
<template>
  <user-permissions/>
</template>

<script>
  import { UserPermissions } from 'user-permissions';

  export default {
    components: { UserPermissions }
  };
</script>
```

## Пропсы
> Компонент UserPermissions
```vue
<template>
  <user-permissions
    :regions="regions"
    :permits="permits"
  />
</template>
<script>
...
  private permits = [
    {
      alias: 'Псевдоним разрешения',
      permit: 'secure_permit'
      // системные разрешения которые расширяют текущее, прим.: 'secure_mafi', 'secure_smp'
      extend: [
        'secure_permit_1',
        'secure_permit_2',
        'secure_permit_3',
      ]
    }
  ]

  private async regions() {
    return await keyFromConfstore('REGIONS')
  }
...
</script>
```

 Имя              | Тип       | По умолчанию | Описание
-----------------|-----------|--------------|-------------------------------------------------
user-roles       | `userRole[]` | `[]`      | Список дополнительных уровней доступа пользователя ( Роли 'Не указано', 'Администратор', 'Пользователь' - захардкожены )
regions       | `Region[]` | `null`      | Список регионов для установки доступных пользователю регионов, при null (и не передаче пропса)  - редактирование регионов отключено
permits       | `Permission[]` | `[]`      | Список разрешений

```ts
interface userRole {
  alias: string,
  role: string,
}

interface Region {
  uuid: string
  name: string
}

export interface Permission {
  alias?: string
  permit: string
  extend?: Array<string>
}
```