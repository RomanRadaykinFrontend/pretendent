
interface Question {
  question: string
  answers: Array<string>
}

export const questions: Array<Question> = [
  {
    question: '0KHQutC+0LvRjNC60L4g0L/QsNGA0LDQvNC10YLRgNC+0LIg0LzQvtC20L' +
      '3QviDQv9C10YDQtdC00LDRgtGMINCyINC00LXRgdGC0YDRg9C60YLQvtGAPwoK',
    answers: [ 'Один', 'Не более 30', 'Ни одного', 'Любое число' ],
  },
  {
    question: '0KHQutC+0LvRjNC60L4g0LDRgNCz0YPQvNC10L3RgtC+0LIg0LzQvtC20L3QviDQv9C10YDQtd' +
      'C00LDRgtGMINCyINGE0YPQvdC60YbQuNGOPwoK',
    answers: [ 'Ни одного', 'Один', 'Не более десяти',
      'Только один по значению, и неограниченное число по ссылке',
      'Только один по ссылке, и неограниченное число по значению',
      'Неограниченное число' ],
  },
  {
    question: '0JPQtNC1INC/0YDQsNCy0LjQu9GM0L3QviDQv9GA0LjQstC10LTQtdC90LAg0LjQvd' +
      'C40YbQuNCw0LvQuNC30LDRhtC40Y8g0L/QtdGA0LXQvNC10L3QvdC+0Lk/Cgo=',
    answers: [ 'var str = "Hi";', 'int num = "1";',
      'done = true;', 'char sym = \'a\';' ],
  },
  {
    question: '0JrQsNC6INC/0L7QtNC60LvRjtGH0LjRgtGMINGB0YLQsNC90LTQsNGA0YLQvdGD0Y4g0' +
      'LHQuNCx0LvQuNC+0YLQtdC60YMgaW9zdHJlYW0/Cgo=',
    answers: [ '#include "iostream.h"', '#include <iostream>',
      '#include <iostream.h>', ' #include iostream', '#include \'iostream.h\'' ],
  },
  {
    question: '0JrQsNC60L7QuSDRgNC10LfRg9C70YzRgtCw0YIg0LHRg9C00LXRgiDQsiBhINC4IHgg0L/QvtGB0LvQtS' +
      'DQstGL0L/QvtC70L3QtdC90LjRjz8KCmludCBhPTU7CmxvbmcgeD0zOwphKz14Owp4PS0teDsKCgo=',
    answers: [ 'a=8 и x=7', 'a=8 и x=2', 'a=6 и x=2' ],
  },
  {
    question: '0J/RgNC4INCy0YvQv9C+0LvQvdC10L3QuNC4INC60L7QtNCwCgppbnQgYSwgYiwgYzsKY2luPj5hPj5iPj5jOw' +
      'pjb3V0PDxhPDxiPDxjOwoK0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GMINCy0LLRkdC7ICIxMCAyMzQuNSA4MjIiCtGH0YLQvi' +
      'DQsdGD0LTQtdGCINCy0YvQstC10LTQtdC90L4g0L3QsCDRjdC60YDQsNC9PwoK',
    answers: [ '10 234.5 8822', '10234.5822',
      '102340', '10234822' ],
  },
  {
    question: '0JrQsNC60L7QtSDRg9GC0LLQtdGA0LbQtNC10L3QuNC1INC/0YDQviDRhtC40LrQuyBmb3Ig0LLQtdGA0L3QvtC1PwoK',
    answers: [ 'Цикл for может быть не выполнен ни разу', 'В цикле for может быть только один счётчик',
      'Цикл for не может быть бесконечным' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUg0LrQvtC90YHRgtGA0YPQutGC0L7RgCDQutC70LDRgdGB0LA/Cgo=',
    answers: [ 'Метод инициализации экземпляра, который проверяет возможность создания экземпляра и реализует его',
      'Специальный метод класса для инициализации элементов класса начальными значениями',
      'Способ создания класса' ],
  },
  {
    question: '0KfRgdC60L7Qu9GM0LrQviDRgNCw0Lcg0LLRi9C/0L7Qu9C90LjRgtGB0' +
      'Y8g0YbQuNC60LsgZm9yIChpbnQgaT0wOyBpPDM7IGkrKykgPwoK',
    answers: [ '0', '1', '2', '3', '4' ],
  },
  {
    question: '0KfQtdC80YMg0LHRg9C00LXRgiDRgNCw0LLQvdCwINC/0LXRgNC10LzQtdC90L' +
      '3QsNGPIHg/Cgpkb3VibGUgeD00MDA7CmludCBhPTI7CnglPTMqYTsK',
    answers: [ 'Остаток от деления на 3, который умножается на 2',
      'Остаток от деления 400 на 6',
      'Количество процентов, которое 6 составляет от 400' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUg0LLRi9GA0LDQstC90LjQstCw0L3QuNC1INC/0L7Q' +
      'u9C10Lkg0YHRgtGA0YPQutGC0YPRgCDQuCDQutC70LDRgdGB0L7Qsj8KCg==',
    answers: [ 'Это размещение полей по смещениям, кратным n байтам',
      'Это замена значений полей структуры, выходящих за некий максимум, этим максимальным значением. ' ],
  },
  {
    question: '0YfRgtC+INGC0LDQutC+0LUg0LDQsdGB0YLRgNCw0LrRgtC90YvQuSDQutC70LDRgdGBPwoK',
    answers: [ 'Это класс с ключевым словом abstract',
      'Это класс с одной или несколькими абстрактными функциями.',
      'Это класс с недоопределёнными функциями' ],
  },
  {
    question: '0JLQuNC00Ysg0L3QsNGB0LvQtdC00L7QstCw0L3QuNGPINCyIEMrKwoK',
    answers: [ 'public, private',
      'public, protected, private',
      'public, protected, private, virtual',
      'public, protected, private, virtual, abstract',
      'public, protected, private, virtual, abstract, extends',
      'public, protected, private, virtual, abstract, extends, explicit' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUgbXV0YWJsZT8KCg==',
    answers: [ 'Ключевое слово, позволяющее изменять член класса из константного метода',
      'Запрет компилятору на оптимизацию объекта',
      'Указание компилятору хранить значение в регистрах для ускорения доступа',
      'Указание компилятору на то, что переменная может быть записана из нескольких потоков одновременно' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUgdm9sYXRpbGU/Cgo=',
    answers: [ 'Ключевое слово, позволяющее изменять член класса из константного метода',
      'Запрет компилятору на оптимизацию объекта',
      'Указание компилятору хранить значение в регистрах для ускорения доступа',
      'Указание компилятору на то, что переменная может быть записана из нескольких потоков одновременно' ],
  },
  {
    question: '0JzQvtC20LXRgiDQu9C4INC/0L7RgNGP0LTQvtC6INGH0LvQtdC90L7QsiDQsiDRgdC/0LjRgdC60LU' +
      'g0LjQvdC40YbQuNCw0LvQuNC30LDRhtC4' +
      '0Lgg0LrQvtC90YHRgtGA0YPQutGC0L7RgNCwINC90LUg0YHQvtCy0L/QsNC00LDRgtGMIN' +
      'GBINC/0L7RgNGP0LTQutC+0Lwg0YfQu9C10L3QvtCyINCyINC60LvQsNGB0YHQtT8KCg==',
    answers: [ 'Может',
      'Не может',
      'Не должен, но если сделать по другому, то не будет ничего страшнее предупреждения компилятора' ],
  },
  {
    question: '0JrQsNC6INC30LDQv9GA0LXRgtC40YLRjCDQvdC10Y/QstC90L7QtSDQv9GA0LXQvtCx0YDQsNC30L7QstCw' +
      '0L3QuNC1INGC0LjQv9CwLCDQstGL0L/QvtC70L3Rj9C10LzQvtC1INC60L7QvdGB0YLRgNGD0LrRgt' +
      'C+0YDQvtC8INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4PwoK',
    answers: [ 'Объявить конструктор abstract',
      'Объявить конструктор explicit',
      'Существует соглашение, по которому ключевое слово const в ' +
      'конце конструктора означает запрет на неявное преобразование типа' ],
  },
  {
    question: '0KPQutCw0LbQuNGC0LUg0LzQsNC60YHQuNC80LDQu9GM0L3QvtC1INGH0LjRgdC70L4g0L/RgNCw0LLQuNC70YzQvdGL0YUgK' +
      'NGB0L7Qs9C70LDRgdC90L4g0YHRgtCw0L3QtNCw0YDRgtGDIEMrKykg0YHQv9C+0YHQvtCx0L7QsiDQvtGB0LLQvtCx0L7QtNC40YLR' +
      'jCDQv9Cw0LzRj9GC0YwsINCy0YvQtNC10LvQtdC90L3Rg9GOINC60L7QvN' +
      'Cw0L3QtNC+0LkgTXlDbGFzcyAqIHB0ciA9IDo6bmV3IE15Q2xhc3NbNTBdCgo=',
    answers: [ 'Без ограничений. delete ptr, free( ptr ), delete[] ptr',
      'Только delete[] ptr',
      'delete[] ptr или можно для каждого элемента массива вызвать деструктор, ' +
      'а потом можно использовать delete ptr' ],
  },
  {
    question: '0KfRgtC+INC+0LHQvtC30L3QsNGH0LDQtdGC0YHRjyDQutC70Y7Rh9C10LLRi9C8INGB0LvQvtCy0L7QvCBjYXRjaD8KCg==',
    answers: [ 'Контролируемый блок',
      'Блок обработки исключения',
      'Секция-ловушка',
      'Генератор исключения',
      'Обработчик прерывания' ],
  },
  {
    question: '0JzQvtCz0YPRgiDQu9C4INCx0LvQvtC60LggdHJ5LWNhdGNoINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4PwoK',
    answers: [ 'Да',
      'Нет' ],
  },
  {
    question: '0JrQsNC60L7QsiDQv9C+0YDRj9C00L7QuiDQstGL0LfQvtCy0LAg0LrQvtC90YHRgtGA0YPQut' +
      'GC0L7RgNC+0LI/INCQINC00LXRgdGC0YDRg9C60YLQvtGA0L7Qsj8KCg==',
    answers: [ 'Оба порядка случайны',
      'Гарантируется, что порядок вызова конструкторов будет каждый раз одним и тем же,' +
      ' но последовательность вызова не известна заранее. Тоже для деструкторов',
      'Конструкторы вызываются случайным образом, а деструкторы в обратном порядке',
      'Гарантируется, что порядок вызова конструкторов будет каждый раз одним и тем же, ' +
      'но последовательность вызова не известна заранее. Деструкторы вызываются в обратном порядке',
      'Конструкторы вызываются случайным образом, а порядок вызова деструкторов совпадает с вызовом конструкторов' ],
  },
  {
    question: '0JTQu9GPINGH0LXQs9C+INC90YPQttC10L0g0LLQuNGA0YLRg9Cw0Lv' +
      'RjNC90YvQuSDQutC+0L3RgdGC0YDRg9C60YLQvtGAPwoK',
    answers: [ 'Чтобы избежать утечки памяти',
      'Чтобы использовать пользовательские аллокаторы',
      'Конструктор не бывает виртуальным',
      'Для создания фабричных методов' ],
  },
  {
    question: '0JTQu9GPINGH0LXQs9C+INC90YPQttC10L0g0LLQuNGA0YLRg9Cw0LvRjNC90YvQuSDQtNC10YHRgtGA0YPQutGC0L7RgD8KCg==',
    answers: [ 'Чтобы избежать утечки памяти',
      'Чтобы использовать пользовательские аллокаторы',
      'Конструктор не бывает виртуальным',
      'Для создания фабричных методов' ],
  },
  {
    question: '0JrQsNC6INC/0YDQsNCy0LjQu9GM0L3QviDQsdGA0L7RgdCw0YLRjCDQ' +
      'uNGB0LrQu9GO0YfQtdC90LjRjyDQsiDQutC+0L3RgdGC0YDRg9C60YLQvtGA0LU/Cgo=',
    answers: [ 'Лучше не бросать, но если бросил, следить, чтобы не было повторных исключений.',
      'Исключения в конструкторе - это стандартная хорошая практика, ' +
      'гарантирующая, что не будет утечек памяти. Главное, перехватить исключение через catch  и обработать его.',
      'Нельзя бросать исключения в конструкторе, это ведёт к ошибке времени исполнения с вероятностью 100%.',
      'Исключения в конструкторе - часть парадигмы RAII, их можно и нужно бросать всегда без каких-либо ' +
      'ограничений.' ],
  },
  {
    question: 'INCSINC60LDQutC+0Lwg0LrQu9Cw0YHRgdC1INCx0YPQtNC10YIg0LHQsNC30L7QstGL0Lkg0L/RgNC4INGA0L7Qv' +
      'NCx0L7QstC40LTQvdC+0Lwg0L3QsNGB0LvQtdC00L7QstCw0L3QuNC4ICjQutC+0LPQtNCwIEQg0L3QsNGB0LvQtdC00YPQt' +
      'dGC0YHRjyDQvtGCIEIg0LggQywg0LAg0L7QvdC4INC40LzQtdGO0YIg0L7QsdGJ0LXQs9C+INC/0YDQtdC00LrQsCBBKQoK',
    answers: [ 'В первом',
      'Во втором',
      ' В обоих, т.е. у D будет 2 базовых класса A',
      'Ни в каком',
      'Компилятор имеет право на оптимизацию, поэтому он уберёт один лишний класс A, ' +
      'а нелишний разместит случайным образом, скорее всего в первом.' ],
  },
  {
    question: '0KfQtdC80YMg0YDQsNCy0LXQvSBzaXplb2Yg0L7RgiDQv9GD0YHRgtC+0Lkg0YHRgtGA0YPQutGC0YPRgNGLCgo=',
    answers: [ '0',
      '1',
      'sizeof пустой структуры - это неопределённое поведение по стандарту' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUg0LDQsdGB0YLRgNCw0LrRgtC90LDRjyDRhNGD0L3QutGG0LjRjz8KCg==',
    answers: [ 'Виртуальная функция без тела, заданная как "=0;", которую ' +
    'обязательно надо переопределить в наследниках',
    'Невиртуальная функция без тела, заданная как "=0;"',
    'Виртуальная функция с телом, заданная как "=0;", но которую обязательно надо переопределить в наследниках' ],
  },
  {
    question: '0J3QsNGB0LrQvtC70YzQutC+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNC1IHZvbGF0aWxlIN' +
      'GP0LLQu9GP0LXRgtGB0Y8gdGhyZWFkLXNhZmUgLyDQv9C+0YLQvtC60L7QsdC10LfQvtC/0LDRgdC90YvQvD8KCg==',
    answers: [ 'По стандарту C++ - не является, но на общеупотребимых платформах на практике может работать ' +
    'как atomic в простых операциях и при использовании барьеров, запрещающих переупорядочение команд',
    'По стандарту C++ безопасно использовать только volatile bool в качестве atomic<bool>  в простых операциях ' +
      'и при использовании барьеров, запрещающих переупорядочение команд',
    'По стандарту C++ volatile потокобезопасен и может использоваться в простых операциях и при ' +
      'использовании барьеров, запрещающих переупорядочение команд',
    'По стандарту C++ volatile потокобезопасен и может использоваться без ограничений.' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUg0YTQsNCx0YDQuNC60LAg0Lgg0LfQsNGH0LXQvCDQvtC90LAg0L3Rg9C20L3QsD8KCg==',
    answers: [ 'Фабрика - это шаблон проектирования, позволяющий создать одномоментно сразу несколько объектов из ' +
    'одного семейства, для того, чтобы оптимизировать время создания однотипных объектов.',
    'Фабрика - это шаблон проектирования, который используется либо для того, чтобы принимать ' +
      'решение о типе создаваемого объекта в процессе исполнения программы, либо ограничить условия ' +
      'создания объектов (например, запретить создавать объекты на стеке)',
    'Фабрика - это шаблон проектирования, который хранит набор уже инициализированных ' +
      '(или ранее использованных) объектов, и вместо создания возвращает на них ссылки, ' +
      'что значительно экономит время на создание объекта, особенно в многопоточном режиме, ' +
      'за счёт снижения числа выделений памяти',
    ],
  },
  {
    question: '0K/QstC70Y/QtdGC0YHRjyDQu9C4IHNoYXJlZF9wdHIg0L/QvtGC0L7QutC+0LHQtdC30L7Qv9Cw0YHQvdGL0LwgKHRo' +
      'cmVhZCBzYWZlKT8g0JLQvtC30LzQvtC20L3QvtGB0YLR' +
      'jCDQv9C10YDQtdGD0L/QvtGA0Y/QtNC+0YfQuNCy0LDQvdC40Y8g0L7Qv9C10YDQsNGG0LjQuSDQsiDRgNCw0' +
      'YHRh9GR0YIg0L3QtSDQv9GA0LjQvdC40LzQsNGC0YwuCgo=',
    answers: [ 'Потокобезопасной является только контрольная часть указателя, поэтому использование ' +
    'shared_ptr потокобезопасно, если речь идёт о самом указателе, а не о значении, на которое он указывает.',
    'Потокобезопасной является только контрольная часть указателя, но она не всегда ' +
      'гарантирует потокобезопасное копирование и удаление указателя, поэтому shared_ptr ' +
      'потокобезопасен только на чтение адреса значения или или изменение хранимого адреса',
    'shared_ptr потокобезопасен без ограничений, но эта гарантия не распространяется на объект, ' +
      'на который указывает shared_ptr',
    'shared_ptr категорически нельзя использовать в многопоточном коде без мьютексов ' +
      'или иных дополнительных методов синхронизации' ],
  },
  {
    question: '0JrQsNC60L7QuSDQvNC10YLQvtC0INC30LDQv9GA0LXRgtC40YLRjCDRgdC+0LfQtNCw0L3QuNC1INC60LvQsNGB0YH' +
      'QsCDQvdCwINGB0YLQtdC60LUg0LHRg9C00LXRgiDRgNCw0LHQvtGH0LjQvD8KCg==',
    answers: [ 'Объявить конструкторы private или protected и добавить фабричный метод',
      'Просто объявить конструкторы private или protected',
      'Объявить деструкторы private или protected',
      'Это не возможно по стандарту C++' ],
  },
  {
    question: `0JXRgdGC0Ywg0LvQuCDQvtGI0LjQsdC60Lgg0LIg0Y3RgtC+0Lkg0L/RgNC+0LPRgNCw0LzQvNC1ID8KICAgICAg
    ICAgICNpbmNsdWRlIDx1dGlsaXR5PgogICAgICAgICAgI2luY2x1ZGUgPGNzdGRpbz4KICAgICAgICAgICNpbmNsdWRlIDxjc3Rk
    bGliPgogICAgICAgICAgI2luY2x1ZGUgPG5ldz4KICAgICAgICAgIAogICAgICAgICAgCiAgICAgICAgICAjcHJhZ21hIHBhY2so
    cHVzaCwgMSkKICAgICAgICAgIAogICAgICAgICAgY2xhc3MgQSB7CiAgICAgICAgICAgIHB1YmxpYzoKICAgICAgICAgICAgICBpb
    nQgeCA9IDA7CiAgICAgICAgICAgIHZpcnR1YWwgfkEoKSB7fQogICAgICAgICAgICB2aXJ0dWFsIGludCBHZXRZKCkgY29uc3Qge
    yByZXR1cm4gMTcwMTcwOyB9CiAgICAgICAgICB9OwogICAgICAgICAgCiAgICAgICAgICBjbGFzcyBCIDogcHVibGljIEEgewogIC
    AgICAgICAgcHVibGljOgogICAgICAgICAgICBCKCBpbnQgdmFsICkgOiB5KCB2YWwgKSB7fQogICAgICAgICAgICB2aXJ0dWFsIGl
    udCBHZXRZKCkgY29uc3QgeyByZXR1cm4geTsgfQogICAgICAgICAgCiAgICAgICAgICBwcml2YXRlOgogICAgICAgICAgICBpbnQg
    eSA9IDA7CiAgICAgICAgICB9OwogICAgICAgICAgCiAgICAgICAgICB0ZW1wbGF0ZTx0eXBlbmFtZSBULCB0eXBlbmFtZS4uLiBDb2
    5zdHJ1Y3Rpb25BcmdzPgogICAgICAgICAgdm9pZCBDb25zdHJ1Y3QoIFQgJnRvX2NvbnN0cnVjdCwgQ29uc3RydWN0aW9uQXJncyAm
    Ji4uLiBhcmdzICkgewogICAgICAgICAgICA6Om5ldyggJnRvX2NvbnN0cnVjdCApIFQoCiAgICAgICAgICAgICAgc3RkOjpmb3J3YXJ
    kPENvbnN0cnVjdGlvbkFyZ3M+KCBhcmdzICkuLi4gKTsKICAgICAgICAgIH07CiAgICAgICAgICAKICAgICAgICAgIAogICAgICAgI
    CAgc3RydWN0IEMgewogICAgICAgICAgICBBIGFycmF5WzE1XTsKICAgICAgICAgIH0gYTsKICAgICAgICAgIAogICAgICAgICAgI3B
    yYWdtYSBwYWNrKHBvcCkKICAgICAgICAgIAogICAgICAgICAgaW50IG1haW4oKQogICAgICAgICAgewogICAgICAgICAgICBmb3IgKC
    BpbnQgaSA9IDE0OyBpID4gMDsgLS1pICkgewogICAgICAgICAgICBDb25zdHJ1Y3Q8Qj4oIHN0YXRpY19jYXN0PEImPiggYS5hcnJhe
    VtpXSApLCAocmFuZCgpLzEwMDApKjEwMDAgKTsKICAgICAgICAgIH0KICAgICAgICAgICAgZm9yICggaW50IGkgPSAwOyBpIDwgMTU7
    ICsraSApIHsKICAgICAgICAgICAgcHJpbnRmKCIlZCAiLCBhLmFycmF5W2ldLkdldFkoKSApOwogICAgICAgICAgfQogICAgICAgICAg
    ICByZXR1cm4gMDsKICAgICAgICAgIH0KCiAgICAgICAg
        `,
    answers: [ 'Ошибок нет.',
      'В программе присутствует UB(неопределённое поведение)',
      'В программе выход за границы массива.',
      'Программа может "упасть" - ошибка времени выполнения.',
      ' программе присутствует UB(неопределённое поведение) и выход за границы массива.',
      'В программе присутствует UB(неопределённое поведение), выход за границы массива, ' +
      'и возможно "падение" - ошибка времени выполнения.' ],
  },
  {
    question: `0KfRgtC+INC90LDQv9C10YfQsNGC0LDQtdGCINGB0LvQtdC00YPRjtGJ0LjQuSDQutC+0LQg0LIg0YDQtdC30YPQu9
    GM0YLQsNGC0LUg0LjRgdC/0L7Qu9C90LXQvdC40Y8/CgogICAgdHJ5IHsKICAgICAgICB0aHJvdyBCKCk7CiAgICB9IGNhdGNoICgg
    c3RkOjpzdHJpbmcgcyApIHsKICAgICAgICBwcmludGYoInN0ZDo6c3RyaW5nIik7CiAgICB9IGNhdGNoICggQSApIHsKICAgICAgIC
    BwcmludGYoIkEiKTsKICAgIH0gY2F0Y2ggKCBjb25zdCBjaGFyICogcyApIHsKICAgICAgICBwcmludGYoIkIiKTsKICAgIH0=`,
    answers: [ 'std::string',
      'A',
      'B',
    ],
  },
  {
    question: `0JrQsNC60L7QuSDRgtC40L/QuNGH0L3Ri9C5INGA0LXQt9GD0LvRjNGC0LDRgiDRgyBzaXplb2YoQikg0L3QsCAzMtG
    FINC4IDY00YUgLSDQsdC40YLQvdC+0Lkg0L/Qu9Cw0YLRhNC+0YDQvNC1PwoKCiAgICAgICAgc3RydWN0IEEgewogICAgICAgICAgI
    CB2aXJ0dWFsIH5BKCkge30KICAgICAgICAgICAgaW50IHg7CiAgICAgICAgfTsKICAgICAgICAKICAgICAgICBjbGFzcyBCIDogdm
    lydHVhbCBwdWJsaWMgQSB7CiAgICAgICAgICAgIGNoYXIgYTsKICAgICAgICAgICAgdm9pZCAqIGI7CiAgICAgICAgICAgIGludCB
    jOwogICAgICAgICAgICBsb25nIGxvbmcgZDsKICAgIH07`,
    answers: [ '32х-битная - 21; и 64х-битная - 21',
      '32х-битная - 24; и 64х-битная - 32',
      '32х-битная - 28; и 64х-битная - 40',
      '32х-битная - 29; и 64х-битная - 29',
      '32х-битная - 32; и 64х-битная - 56',
    ],
  },
  {
    question: `0JrQsNC60L7QuSDRgNC10LfRg9C70YzRgtCw0YIg0L3QsNC/0LXRh9Cw0YLQsNC10YIg0L3QuNC20LXRgdC70LXQtNGD
    0Y7RidC40Lkg0LrQvtC0INC/0YDQuCDQuNGB0L/QvtC70L3QtdC90LjQuCDRgdC+0LPQu9Cw0YHQvdC+INGB0YLQsNC90LTQsNGA0YLR
    gyBDKys/CgogICAgICBpbnQgRG9BKCBpbnQgeCApIHsKICAgICAgICBwcmludGYoICJEb0EgPSAlZCIgLCB4KTsKICAgICAgICByZXR
    1cm4geDsKICAgICAgfQogICAgICAKICAgICAgaW50IERvWiggaW50IHgsIGludCB5ICkgewogICAgICAgICByZXR1cm4geCAqIHk7C
    iAgICAgIH0KICAgICAgCiAgICAgIAogICAgICBpbnQgRG9ZKCBpbnQgJiB4ICkgewogICAgICAgIHByaW50ZiggICAgIkRvWSA9ICVk
    ICIsIERvWiggICsreCwgLS14ICkgICApOwogICAgICAgIHJldHVybiAwOwogICAgICB9CiAgICAgIAogICAgICBpbnQgeCA9IDcsIHk
    gPSA4OwogICAgICAKICAgICAgaW50IG1haW4oKQogICAgICB7CiAgICAgICAgICBEb1koeCkgJiYgRG9BKCB5ICk
    7CiAgICAgICAgcmV0dXJuIDA7CiAgICB9`,
    answers: [ 'DoY = 56 DoA= 8',
      'DoY = 42 DoA = 8',
      'DoY = 49 DoA = 8',
      'DoY = 56 ',
      'DoY = 52 ',
      'DoY = 49 ',
      'Результат неопределён',
    ],
  },
  {
    question: `0JTQsNC90L46INCy0YvRgNCw0LLQvdC40LLQsNC90LjQtSAxLCDRgNCw0LfQvNC10YAg0YPQutCw0LfQsNGC0LXQu9GP
    INC90LAg0L/Qu9Cw0YLRhNC+0YDQvNC1IDMyINCx0LjRgtCwLiDQmtCw0LrQvtC5INCx0YPQtNC10YIg0YDQsNC30LzQtdGAIAogICAg
    0YHRgtGA0YPQutGC0YPRgNGLIFog0LIg0LHQsNC50YLQsNGFINC/0L4g0YHRgtCw0L3QtNCw0YDRgtGDIEMrKz8KCiAgICAgIHN0cnVjd
    CBaIHsKICAgICAgIGNoYXIgYTsKICAgICAgIGludCBiOwogICAgICAgdm9pZCAqIGM7CiAgICAgICBsb25nIGQ7CiAgICAgICBsb25nI
    GxvbmcgZTsKICAgIH07`,
    answers: [ '21',
      '25',
      '32',
      'Неопределено',
    ],
  },
  {
    question: '0KHQutC+0LvRjNC60L4gaW50INGD0LzQtdGB0YLQuNGC0YHRjyDQsiBsb25nINC/0L4g0YHRgtCw0L3QtNCw0YDRgtGDIGMrKz8=',
    answers: [ '1',
      '2',
      'больше одного',
      'больше или равно одному',
      'неопределено',
    ],
  },
  {
    question: '0KfQtdC80YMg0YDQsNCy0LXQvSBzaXplb2YoImFCY0RlRiIpINC90LAg0L7QsdGJ0LXRg9C/0L7RgtGA0LXQsdC40YLQ' +
      'tdC70YzQvdGL0YUgMzLRhSDQsdC40YLQvdGL0YUg0L/Qu9Cw0YLRhNC+0YDQvNCw0YU/',
    answers: [ '4',
      '6',
      '7',
      '8',
    ],
  },
  {
    question: `0KHRgNCw0LHQvtGC0LDQtdGCINC70LggTlJWTyAobmFtZWQgcmV0dXJuIHZhbHVlIG9wdGltaXphdGlvbiwg0L7Qv9G
    C0LjQvNC40LfQsNGG0LjRjyDQuNC80LXQvdC+0LLQsNC90L3QvtCz0L4g0LLQvtC30YDQsNGJ0LDQtdC80L7Qs9C+INC30L3QsNG
    H0LXQvdC40Y8pPwoKICAgICAgQSBmdW4oIGJvb2wgY29uZCApIHsKICAgICAgICBpZiAoIGNvbmQgKSB7CiAgICAgICAgICBjb25
    zdCBBIGNvbnN0IGE9IC4uLjsKICAgICAgICAgIHJldHVybiBhOwogICAgICAgIH0gZWxzZSB7CiAgICAgICAgICBjb25zdCBBIGNvbn
    N0IGE9IC4uLjsKICAgICAgICAgIHJldHVybiBhOwogICAgfQ==`,
    answers: [ 'да',
      'нет',
      'неопределено',
    ],
  },
  {
    question: `0JTQsNC90L46INC60L7QtAoKICAgICAgdGVtcGxhdGUgPHR5cGVuYW1lIFQ+IFQgY29uc3QgJiBzdGQ6Om1pbiggVCBjb
    25zdCAmIGEsIFQgY29uc3QgJmIgKSB7IHJldHVybiBhPGIgPyBiOiBhOyB9CiAgICAgIAogICAgICBDIGMxLCBjMjsKICAgICAgYXV0
    byBjb25zdCAmbXlfYSA9IHN0ZDo6bWluKCBjMS5nZXRBKCksIGMyLmdldEEoKSApOw==`,
    answers: [ 'Код сработает корректно, потому что механизм lifetime extension (продление жизни ссылок) сработает',
      'Механизм lifetime extension не сработает, код не скомпилируется',
      'Механизм lifetime extension сработает, код скомпилируется',
      'Механизм lifetime extension не только не сработает, но в результате получится UB (неопределенное поведение)',
    ],
  },
  {
    question: 'QURMICggQXJndW1lbnQtRGVwZW5kZWQgbmFtZSBMb29rdXAsIGtvZW5pZyBsb29rdXAgKSAo0LDRgNCz0YPQvNC10L3Rg' +
      'tC90L4t0LfQsNCy0LjRgdC40LzRi9C5INC/0L7QuNGB0LopINGN0YLQvjo=',
    answers: [ 'Механизм, который позволяет компилятору искать функцию в ' +
    'пространстве имён аргументов и шаблонных параметров',
    'Механизм, который позволяет компилятору искать аргументы и шаблонные параметры в пространстве имён функции',
    ],
  },
  {
    question: '0YHQutC+0LvRjNC60L4gc2hvcnQgaW50INCy0LzQtdGB0YLQuNGC0YHRjyDQsiBpbnQg0L/Q' +
      'viDRgdGC0LDQvdC00LDRgNGC0YMg0KErKz8=',
    answers: [ '1',
      '2',
      'Любое число',
      'Любое число, кроме нуля',
      'Неопределено',
    ],
  },
  {
    question: `0KfRgtC+INCy0YvQstC10LTQtdGCINGB0LvQtdC00YPRjtGJ0LjQuSDQutC+0LQg0LHQtdC3INC00L7Qv9C+0LvQvdC40
    YLQtdC70YzQvdGL0YUg0LrQu9GO0YfQtdC5INC6INC60L7QvNC/0LjQu9GP0YLQvtGA0YMgKNC60YDQvtC80LUg0LrQu9GO0YfQtdC
    5INC80LDQutGB0LjQvNCw0LvRjNC90L7QuSAKICAgINC+0L/RgtC40LzQuNC30LDRhtC40LgpPyDQo9C60LDQttC40YLQtSDQvdCw0Lj
    QsdC+0LvQtdC1INCy0LXRgNC+0Y/RgtC90YvQuSDQuCDRgtC40L/QuNGH0L3Ri9C5INGA0LXQt9GD0LvRjNGC0LDRgi4KCiAgICAgIGl
    udCBhID0gMDsKICAgICAgaW50IGIgPSAxOwogICAgICAqKCZhICsgMSkgID0gMzsKICAgICAgTXlGdW4oYik7Cg==
`,
    answers: [ '1',
      '3',
      'выведет ошибку',
      'неопределено по стандарту С++.',
    ],
  },
]
