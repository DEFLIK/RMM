# Отчет
Проверяющий: https://github.com/brskiy

## Что сделал ученик:
1 часть (22.02 - 1.03):
- Составил ТЗ
- Выполнил деплой ASP и Angular
- Приступил к разработке дизайн-макетов

2 часть (2.03 - 15.03):\
Front:
- Закончил выполнение некоторых компонентов дизайн-макета (шапка, список девайсов, панель управления и информации конкретного девайса)

Back:
- Выполнил подключение и настройку Postgres к backend
  * Настройка миграций БД
  * Реализация сервиса и контроллера по записи и получению информации девайсов
  * Создан, настроен и реализован Data access layer (Репозиторий, контекст, существа)
  * Создан проект с тестами

3 часть (15.03 - 22.03):\
Front:
- Реализовал систему входа/регистрации пользователя
  * Создан и подключен лениво подгружаемый модуль аутентификации
  * Реализованы компоненты входа, регистрации
  * Реализован сервис аутентификации
  * Реализован сервис хеширования паролей по алгоритму sha256
  * Реализован сервис сессий пользователя (кеширование авторизации)
  * Создан и подключен гуард для предотвращения доступа к панели девайсов неавторизованным пользователям
- Подключил eslint к проекту и установил требуемый стиль кода
- Провел миграцию версии Angular с 8 (создана по умолчанию) до 13
- Дополнил дизайн-макеты

Back:
- Реализовал сервис сессий и регистрации новых пользователей
- Настроил новый DI
- Добавил отношение пользователей в БД, связал с контекстом бэка

## Оценка проверяющего:
- 1 часть: 0/10
- 2 часть: 0/10
- 3 часть: 0/10

# 1. Цель
Разработать систему удаленного мониторинга и управления в установленный срок 01.03.22 - 03.05.22

# 2. Описание
Веб-сервис с возможностью дистанционного мониторинга и управления устройствами
, а также десктопное приложения под платформу Windows, позволяющее выполнять различные команды передаваемые удаленно

Система должна иметь следующие функциональные блоки:

## Первичные (с установленным сроком выполнения)
В первичные блоки входит реализация Frontend/Backend

В порядке приоритета выполнения:
1. Отображение информации подключенных устройств
2. Создание профиля администратора (регистрация/вход)
3. Конфигурирование устройств (запрос режима сна, перезагрузки, выключения)
4. Запрос блокировки устройства
5. Отображение устройств на карте
6. Отображение графа состояния всех устройств
7. Возможность создания групп и подключения к ним через идентификатор и пароль

## Второстепенные (без сроков)
Во второстепенные блоки входит реализация Dekstop

В порядке приоритета выполнения:
1. Установка связи с сервером через идентификатор и пароль
2. Принятие и выполнение консольных команд PowerShell c сервера
3. Отправка личных характеристик на сервер при необходимости

# 2.1 Типы пользователей
В системе имеется два типа пользователей: администратор и управляемое устройство
Администратор имеет доступ к web-сервису и права на запрос выполнения основных задач сервером.
Управляемое устройство имеет доступ к связи с сервером для принятия требуемых к выполнению задач, а также имеет возможность сообщать серверу свои характеристики

# 2.2 Регистрация и вход роли администратора
Пользователю сервиса предоставляется возможность зарегистрироваться на сервисе указав следующие входные данные:

* логин профиля - обязательное поле
* email профиля - обязательное поле
* пароль профиля - обязательное поле

Регистрация проходит в форме, которая всплывает при неавторизованном открытии сервиса
После регистрации/входе у пользователя появляется возможность создавать группы и подключаться к ним
При успешной(-ом) регистрации/входе, в идеале, хранить куки или другую информацию для последующего автоматического входа на сервис

# 2.3 Создание групп и подключение к ним
Администратор имеет возможность создавать новую группу через web-сервис, а также подключаться к другим группам используя следующие входные данные:

* логин группы - обязательное поле
* пароль для группы - обязательное поле
* ключ доступа к управлению (в случае создания группы) - обязательное поле
  
Управляемое устройство имеет возможность подключаться к группам используя
следующие входные данные:

* идентификатор (формата GUID) - обязательное поле
* пароль - обязательное поле

После создания группы на сервере регистрируется новый идентификатор (формата GUID), который будет использоваться управляемым устройством для дальнейшего подключения. Данный идентификатор должен отображаться у администратора в веб-сервисе, если тот подключен к созданной группе

# 2.4 Функционал для администратора
Администратор после аутентификации (ввода логина и пароля) получает доступ к следующему функционалу в системе:

1. Просмотр конфигураций устройств
2. Выполнение запросов на выключение, перезагрузку, блокирование, сон устройства
3. Просмотр местоположения устройств на карте
4. Просмотр состояний (сон/подключен/отключен/заблокирован) устройств на момент последнего обновления данных
5. Запрос на блокировку использования конкретного устройства
6. Удаление, переименование группы
7. Отключение устройств от группы
8. Выход из группы

# 2.5 Функционал для управляемого устройства
Администратор после аутентификации (ввода идентификатора и пароля) получает доступ к следующему функционалу в системе:

1. Отправка личных характеристик по запросу
2. Отправка текущего состояния по запросу
3. Принятие и выполнение консольных команд с сервера
4. Отключение от группы

# 2.6 Отображение и выбор подключенных устройств
В левой части интерфейса web-приложения растянутым по всей высоте (вычитая длину шапки) и занимающим около четверти (1/4-1/5) длины экрана должен быть расположен список подключенных устройств. Каждый элемент отображает название устройства и значок его состояния (вкл/выкл/сон/заблокирован), дату последней связи устройства с сервером. Также в списке должно отображаться количество элементов. При отсутствии подключенных устройств отображать соответствующий текст с малозаметным текстом (серый на белом фоне, к примеру). Список устройств должен подгружаться лениво

# 2.7 Отображение характеристик и конфигурации устройства
При выборе элемента в списке подключенных устройств, оставшееся по длине пространство экрана занимает панель управления устройством, в котором требуется расположить характеристики устройства, панель конфигураций, кнопку отключения устройства от группы (при нажатии требовать подтверждения действия)

# 2.8 Отображение общей статистики
Если ни один элемент из списка подключенных устройств не выбран, то требуется отображать общую статистику по всем устройствам (граф подключенных/отключенных и т.д., по возможности полный список логирования выполненных действий в системе)

# 2.9 Отображение шапки
В шапке должен находиться логотип системы и идентификатор группы (с возможность выделения и копирования текста, в идеале копирование происходит по клику без выделения текста). В правой части шапки расположить кнопку выхода из режима администрирования группы (при нажатии требовать подтверждения действия)

# 2.10 Отображение карты
При нажатии на значок земли (расположение значка еще не определено), вместо панели общей информации или информации конкретного устройства отображать карту (Yandex maps) со всеми подключенными устройствами, при нажатии на метку устройства показывать его характеристики

# 2.11 Интерфейс подключение устройства к группе*
Простенький интерфейс с полем ввода идентификатором и паролем группы,
ниже отображается поле логирование требуемых задач, которые отправил сервер. Также присутствует кнопка отключения от группы

# 3. Предполагаемый стек технологий
Для реализации системы предлагается следующий стек технологий:

* Backend:
    - C#
    - ASP.NET
    - EntityFramework
    - PostgreSQL

* Frontend:
    - TypeScript
    - Angular
    - JQuery
    - YandexMaps API
    - SCSS

# 4. Дизайн

Минимализм, акцент на белые тона в сочетании с каким-либо цветом
