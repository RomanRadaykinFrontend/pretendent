

interface Question {
  question: string
  code?: string
  answers: Array<string>
}

export const questions: Array<Question> = [
  {
    question: '0KHQutC+0LvRjNC60L4g0L/QsNGA0LDQvNC10YLRgNC+0LIg0LzQvtC20L3Q' +
      'viDQv9C10YDQtdC00LDRgtGMINCyINC00LXRgdGC0YDRg9C60YLQvtGAPw==',
    answers: [ 'Один', 'Не более 30', 'Ни одного', 'Любое число' ],
  },
  {
    question: '0KHQutC+0LvRjNC60L4g0LDRgNCz0YPQvNC10L3RgtC+0LIg0LzQvt' +
      'C20L3QviDQv9C10YDQtdC00LDRgtGMINCyINGE0YPQvdC60YbQuNGOPw==',
    answers: [ 'Ни одного', 'Один', 'Не более десяти',
      'Только один по значению, и неограниченное число по ссылке',
      'Только один по ссылке, и неограниченное число по значению',
      'Неограниченное число' ],
  },
  {
    question: '0JPQtNC1INC/0YDQsNCy0LjQu9GM0L3QviDQv9GA0LjQstC10LTQtdC90LAg' +
      '0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Y8g0L/QtdGA0LXQvNC10L3QvdC+0Lk/',
    answers: [ 'var str = "Hi"', 'int num = "1"',
      'done = true', 'char sym = \'a\'' ],
  },
  {
    question: '0JrQsNC6INC/0L7QtNC60LvRjtGH0LjRgtGMINGB0YLQsNC90LTQs' +
      'NGA0YLQvdGD0Y4g0LHQuNCx0LvQuNC+0YLQtdC60YMgaW9zdHJlYW0/',
    answers: [ '#include "iostream.h"', '#include <iostream>',
      '#include <iostream.h>', ' #include iostream', '#include \'iostream.h\'' ],
  },
  {
    question: '0JrQsNC60L7QuSDRgNC10LfRg9C70YzRgtCw0YIg0LHRg9C00LXRgiDQsiBhINC' +
      '4IHgg0L/QvtGB0LvQtSDQstGL0L/QvtC70L3QtdC90LjRjz8=',
    code: 'aW50IGE9NTsKbG9uZyB4PTM7CmErPXg7Cng9LS14Ow==',
    answers: [ 'a=8 и x=7', 'a=8 и x=2', 'a=6 и x=2' ],
  },
  {
    question: '0J/RgNC4INCy0YvQv9C+0LvQvdC10L3QuNC4INC00LDQvdC90L7Qs9C+INC60L7QtNCwINC/0L7Qu9G' +
      'M0LfQvtCy0LDRgtC10LvRjCDQstCy0ZHQuyAiMTAgMjM0LjUgODIyIi4g0KfRgtC+INCx0YP' +
      'QtNC10YIg0LLRi9Cy0LXQtNC10L3QviDQvdCwINGN0LrRgNCw0L0/',
    code: 'aW50IGEsIGIsIGM7CmNpbj4+YT4+Yj4+YzsKY291dDw8YTw8Yjw8Yzs=',
    answers: [ '10 234.5 8822', '10234.5822',
      '102340', '10234822' ],
  },
  {
    question: '0JrQsNC60L7QtSDRg9GC0LLQtdGA0LbQtNC10L3QuNC1INC/0YDQviDRhtC40LrQuyBmb3Ig0LLQtdGA0L3QvtC1Pw==',
    answers: [ 'Цикл for может быть не выполнен ни разу', 'В цикле for может быть только один счётчик',
      'Цикл for не может быть бесконечным' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUg0LrQvtC90YHRgtGA0YPQutGC0L7RgCDQutC70LDRgdGB0LA/',
    answers: [ 'Метод инициализации экземпляра, который проверяет возможность создания экземпляра и реализует его',
      'Специальный метод класса для инициализации элементов класса начальными значениями',
      'Способ создания класса' ],
  },
  {
    question: '0KHQutC+0LvRjNC60L4g0YDQsNC3INCy0YvQv9C+0LvQvdC40YLRgdGPINGG0LjQutC7Pw==',
    code: 'Zm9yIChpbnQgaT0wOyBpPDM7IGkrKyk=',
    answers: [ '0', '1', '2', '3', '4' ],
  },
  {
    question: '0KfQtdC80YMg0LHRg9C00LXRgiDRgNCw0LLQvdCwINC/0LXRgNC10LzQtdC90L3QsNGPIHg/',
    code: 'ZG91YmxlIHg9NDAwOwppbnQgYT0yOwp4JT0zKmE7',
    answers: [ 'Остаток от деления на 3, который умножается на 2',
      'Остаток от деления 400 на 6',
      'Количество процентов, которое 6 составляет от 400' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUg0LLRi9GA0LDQstC90LjQstCw0L3QuNC1INC/0L7Qu9C' +
      '10Lkg0YHRgtGA0YPQutGC0YPRgCDQuCDQutC70LDRgdGB0L7Qsj8=',
    answers: [ 'Это размещение полей по смещениям, кратным n байтам',
      'Это замена значений полей структуры, выходящих за некий максимум, этим максимальным значением ' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUg0LDQsdGB0YLRgNCw0LrRgtC90YvQuSDQutC70LDRgdGBPw==',
    answers: [ 'Это класс с ключевым словом abstract',
      'Это класс с одной или несколькими абстрактными функциями',
      'Это класс с недоопределёнными функциями' ],
  },
  {
    question: '0JrQsNC60LjQtSDQtdGB0YLRjCDQstC40LTRiyDQvdCw0YHQu9C10LTQvtCy0LDQvdC40Y8g0LIgQysrPw==',
    answers: [ 'public, private',
      'public, protected, private',
      'public, protected, private, virtual',
      'public, protected, private, virtual, abstract',
      'public, protected, private, virtual, abstract, extends',
      'public, protected, private, virtual, abstract, extends, explicit' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUgbXV0YWJsZT8=',
    answers: [ 'Ключевое слово, позволяющее изменять член класса из константного метода',
      'Запрет компилятору на оптимизацию объекта',
      'Указание компилятору хранить значение в регистрах для ускорения доступа',
      'Указание компилятору на то, что переменная может быть записана из нескольких потоков одновременно' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUgdm9sYXRpbGU/',
    answers: [ 'Ключевое слово, позволяющее изменять член класса из константного метода',
      'Запрет компилятору на оптимизацию объекта',
      'Указание компилятору хранить значение в регистрах для ускорения доступа',
      'Указание компилятору на то, что переменная может быть записана из нескольких потоков одновременно' ],
  },
  {
    question: '0JzQvtC20LXRgiDQu9C4INC/0L7RgNGP0LTQvtC6INGH0LvQtdC90L7QsiDQsiDRgdC/0LjRgdC60LUg0LjQvdC40Y' +
      'bQuNCw0LvQuNC30LDRhtC40Lgg0LrQvtC90YHRgtGA0YPQutGC0L7RgNCwINC90LUg0YHQvtCy0L/QsNC00LDRgtGMINGBINC/' +
      '0L7RgNGP0LTQutC+0Lwg0YfQu9C10L3QvtCyINCyINC60LvQsNGB0YHQtT8=',
    answers: [ 'Может',
      'Не может',
      'Не должен, но если сделать по другому, то не будет ничего страшнее предупреждения компилятора' ],
  },
  {
    question: '0JrQsNC6INC30LDQv9GA0LXRgtC40YLRjCDQvdC10Y/QstC90L7QtSDQv9GA0LXQvtCx0YDQsNC30L7QstCw0L3QuN' +
      'C1INGC0LjQv9CwLCDQstGL0L/QvtC70L3Rj9C10LzQvtC1INC60L7QvdGB0YLRgNGD0LrRgtC+0YDQvtC8I' +
      'NC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4Pw==',
    answers: [ 'Объявить конструктор abstract',
      'Объявить конструктор explicit',
      'Существует соглашение, по которому ключевое слово const в ' +
      'конце конструктора означает запрет на неявное преобразование типа' ],
  },
  {
    question: '0KPQutCw0LbQuNGC0LUg0LzQsNC60YHQuNC80LDQu9GM0L3QvtC1INGH0LjRgdC70L4g0L/RgNCw0LLQuNC70YzQvdGL0YUgKNGB0L7Qs9C70LDRgdC90L4g0YHRgtCw0L3QtNCw0YDRgtGDIEMrKykg0YHQv9C+0YHQvtCx0L7QsiDQvtGB0LLQvtCx0L7QtNC40YLRjCDQv9Cw0LzRj9GC0YwsINCy0YvQtNC10LvQtdC90L3Rg9GOINC60L7QvNCw0L3QtNC+0Lk=',
    code: 'TXlDbGFzcyAqIHB0ciA9IDo6bmV3IE15Q2xhc3NbNTBdOw==',
    answers: [ 'Без ограничений: delete ptr, free( ptr ), delete[] ptr',
      'Только delete[] ptr',
      'delete[] ptr или можно для каждого элемента массива вызвать деструктор, ' +
      'а потом можно использовать delete ptr' ],
  },
  {
    question: '0KfRgtC+INC+0LHQvtC30L3QsNGH0LDQtdGC0YHRjyDQutC70Y7Rh9C10LLRi9C8INGB0LvQvtCy0L7QvCBjYXRjaD8=',
    answers: [ 'Контролируемый блок',
      'Блок обработки исключения',
      'Секция-ловушка',
      'Генератор исключения',
      'Обработчик прерывания' ],
  },
  {
    question: '0JzQvtCz0YPRgiDQu9C4INCx0LvQvtC60LggdHJ5LWNhdGNoINCx0YvRgtGMINCy0LvQvtC20LXQvdC90YvQvNC4Pw==',
    answers: [ 'Да',
      'Нет' ],
  },
  {
    question: '0JrQsNC60L7QsiDQv9C+0YDRj9C00L7QuiDQstGL0LfQvtCy0LAg0LrQvtC90YHRgtGA0YP' +
      'QutGC0L7RgNC+0LI/INCQINC00LXRgdGC0YDRg9C60YLQvtGA0L7Qsj8=',
    answers: [ 'Оба порядка случайны',
      'Гарантируется, что порядок вызова конструкторов будет каждый раз одним и тем же,' +
      ' но последовательность вызова не известна заранее. Тоже для деструкторов',
      'Конструкторы вызываются случайным образом, а деструкторы в обратном порядке',
      'Гарантируется, что порядок вызова конструкторов будет каждый раз одним и тем же, ' +
      'но последовательность вызова не известна заранее. Деструкторы вызываются в обратном порядке',
      'Конструкторы вызываются случайным образом, а порядок вызова деструкторов совпадает с вызовом конструкторов' ],
  },
  {
    question: '0JTQu9GPINGH0LXQs9C+INC90YPQttC10L0g0LLQuNGA0YLRg9Cw0LvRj' +
      'NC90YvQuSDQutC+0L3RgdGC0YDRg9C60YLQvtGAPw==',
    answers: [ 'Чтобы избежать утечки памяти',
      'Чтобы использовать пользовательские аллокаторы',
      'Конструктор не бывает виртуальным',
      'Для создания фабричных методов' ],
  },
  {
    question: '0JTQu9GPINGH0LXQs9C+INC90YPQttC10L0g0LLQuNGA0YLRg9Cw0LvRjNC90YvQuSDQtNC10YHRgtGA0YPQutGC0L7RgD8=',
    answers: [ 'Чтобы избежать утечки памяти',
      'Чтобы использовать пользовательские аллокаторы',
      'Деструктор не бывает виртуальным',
      'Для создания фабричных методов' ],
  },
  {
    question: '0JrQsNC6INC/0YDQsNCy0LjQu9GM0L3QviDQsdGA0L7RgdCw0YLRjCDQuNGB0LrQu9G' +
      'O0YfQtdC90LjRjyDQsiDQutC+0L3RgdGC0YDRg9C60YLQvtGA0LU/',
    answers: [ 'Лучше не бросать, но если бросил, следить, чтобы не было повторных исключений',
      'Исключения в конструкторе - это стандартная хорошая практика, ' +
      'гарантирующая, что не будет утечек памяти. Главное, перехватить исключение через catch  и обработать его',
      'Нельзя бросать исключения в конструкторе, это ведёт к ошибке времени исполнения с вероятностью 100%',
      'Исключения в конструкторе - часть парадигмы RAII, их можно и нужно бросать всегда без каких-либо ' +
      'ограничений' ],
  },
  {
    question: '0JIg0LrQsNC60L7QvCDQutC70LDRgdGB0LUg0LHRg9C00LXRgiDQsdCw0LfQvtCy0YvQuSDQv9GA0Lgg0YDQvtC80LHQv' +
      'tCy0LjQtNC90L7QvCDQvdCw0YHQu9C10LTQvtCy0LDQvdC40Lg/ICjQutC+0LPQtNCwIEQg0L3QsNGB0LvQtdC00YPQtd' +
      'GC0YHRjyDQvtGCIEIg0LggQywg0LAg0L7QvdC4INC40LzQtdGO0YIg0L7QsdGJ0LXQs9C+INC/0YDQtdC00LrQsCBBKQ==',
    answers: [ 'В первом',
      'Во втором',
      ' В обоих, т.е. у D будет 2 базовых класса A',
      'Ни в каком',
      'Компилятор имеет право на оптимизацию, поэтому он уберёт один лишний класс A, ' +
      'а нелишний разместит случайным образом, скорее всего в первом' ],
  },
  {
    question: '0KfQtdC80YMg0YDQsNCy0LXQvSBzaXplb2Yg0L7RgiDQv9GD0YHRgtC+0Lkg0YHRgtGA0YPQutGC0YPRgNGLPw==',
    answers: [ '0',
      '1',
      'sizeof пустой структуры - это неопределённое поведение по стандарту' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUg0LDQsdGB0YLRgNCw0LrRgtC90LDRjyDRhNGD0L3QutGG0LjRjz8=',
    answers: [ 'Виртуальная функция без тела, заданная как "=0;", которую ' +
    'обязательно надо переопределить в наследниках',
    'Невиртуальная функция без тела, заданная как "=0;"',
    'Виртуальная функция с телом, заданная как "=0;", но которую обязательно надо переопределить в наследниках' ],
  },
  {
    question: '0J3QsNGB0LrQvtC70YzQutC+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNC1IHZvbGF0aWxlINGP' +
      '0LLQu9GP0LXRgtGB0Y8gdGhyZWFkLXNhZmUgLyDQv9C+0YLQvtC60L7QsdC10LfQvtC/0LDRgdC90YvQvD8=',
    answers: [ 'По стандарту C++ - не является, но на общеупотребимых платформах на практике может работать ' +
    'как atomic в простых операциях и при использовании барьеров, запрещающих переупорядочение команд',
    'По стандарту C++ безопасно использовать только volatile bool в качестве atomic<bool>  в простых операциях ' +
      'и при использовании барьеров, запрещающих переупорядочение команд',
    'По стандарту C++ volatile потокобезопасен и может использоваться в простых операциях и при ' +
      'использовании барьеров, запрещающих переупорядочение команд',
    'По стандарту C++ volatile потокобезопасен и может использоваться без ограничений' ],
  },
  {
    question: '0KfRgtC+INGC0LDQutC+0LUg0YTQsNCx0YDQuNC60LAg0Lgg0LfQsNGH0LXQvCDQvtC90LAg0L3Rg9C20L3QsD8=',
    answers: [ 'Фабрика - это шаблон проектирования, позволяющий создать одномоментно сразу несколько объектов из ' +
    'одного семейства, для того, чтобы оптимизировать время создания однотипных объектов',
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
    question: '0K/QstC70Y/QtdGC0YHRjyDQu9C4IHNoYXJlZF9wdHIg0L/QvtGC0L7QutC+0LHQtdC30L7Qv9Cw' +
      '0YHQvdGL0LwgKHRocmVhZCBzYWZlKT8g0JLQvtC30LzQvtC20L3QvtGB0YLRjCDQv9C10YDQtdGD0L/QvtGA0Y/QtNC+0' +
      'YfQuNCy0LDQvdC40Y8g0L7Qv9C10YDQsNGG0LjQuSDQsiDRgNCw0YHRh9GR0YIg0L3QtSDQv9GA0LjQvdC40LzQsNGC0Ywu',
    answers: [ 'Потокобезопасной является только контрольная часть указателя, поэтому использование ' +
    'shared_ptr потокобезопасно, если речь идёт о самом указателе, а не о значении, на которое он указывает',
    'Потокобезопасной является только контрольная часть указателя, но она не всегда ' +
      'гарантирует потокобезопасное копирование и удаление указателя, поэтому shared_ptr ' +
      'потокобезопасен только на чтение адреса значения или изменение хранимого адреса',
    'shared_ptr потокобезопасен без ограничений, но эта гарантия не распространяется на объект, ' +
      'на который указывает shared_ptr',
    'shared_ptr категорически нельзя использовать в многопоточном коде без мьютексов ' +
      'или иных дополнительных методов синхронизации' ],
  },
  {
    question: '0JrQsNC60L7QuSDQvNC10YLQvtC0INC30LDQv9GA0LXRgtC40YLRjCDRgdC+0LfQtNCw' +
      '0L3QuNC1INC60LvQsNGB0YHQsCDQvdCwINGB0YLQtdC60LUg0LHRg9C00LXRgiDRgNCw0LHQvtGH0LjQvD8=',
    answers: [ 'Объявить конструкторы private или protected и добавить фабричный метод',
      'Просто объявить конструкторы private или protected',
      'Объявить деструкторы private или protected',
      'Это не возможно по стандарту C++' ],
  },
  {
    question: '0JXRgdGC0Ywg0LvQuCDQvtGI0LjQsdC60Lgg0LIg0Y3RgtC+0Lkg0L/RgNC+0LPRgNCw0LzQvNC1ID8=',
    code: 'I2luY2x1ZGUgPHV0aWxpdHk+CiNpbmNsdWRlIDxjc3RkaW8+CiNpbmNsdWRlIDxjc3RkbGliPgojaW5jbHV' +
      'kZSA8bmV3PgoKI3ByYWdtYSBwYWNrKHB1c2gsIDEpCmNsYXNzIEEgewogIHB1YmxpYzoKICAgIGludCB4' +
      'ID0gMDsKICAgIHZpcnR1YWwgfkEoKSB7fQogICAgdmlydHVhbCBpbnQgR2V0WSgpIGNvbnN0IHsgcmV0dXJ' +
      'uIDE3MDE3MDsgfQp9OwpjbGFzcyBCIDogcHVibGljIEEgewogIHB1YmxpYzoKICAgIEIoIGludCB2YWwgKS' +
      'A6IHkoIHZhbCApIHt9CiAgICB2aXJ0dWFsIGludCBHZXRZKCkgY29uc3QgeyByZXR1cm4geTsgfSAKCiAgcHJ' +
      'pdmF0ZToKICAgIGludCB5ID0gMDsgCn07CnRlbXBsYXRlPHR5cGVuYW1lIFQsIHR5cGVuYW1lLi4uIENvbnN0c' +
      'nVjdGlvbkFyZ3M+CnZvaWQgQ29uc3RydWN0KCBUICZ0b19jb25zdHJ1Y3QsIENvbnN0cnVjdGlvbkFyZ3MgCi' +
      'YmLi4uIGFyZ3MgKSB7CiAgOjpuZXcoICZ0b19jb25zdHJ1Y3QgKSBUKAogIHN0ZDo6Zm9yd2FyZDxDb25zdHJ1' +
      'Y3Rpb25BcmdzPiggYXJncyApLi4uICk7Cn07CgpzdHJ1Y3QgQyB7CkEgYXJyYXlbMTVdOwp9IGE7CiNwcmFnbWEg' +
      'cGFjayhwb3ApCmludCBtYWluKCkKewogIGZvciAoIGludCBpID0gMTQ7IGkgPiAwOyAtLWkgKSB7CiAgICBDb25z' +
      'dHJ1Y3Q8Qj4oIHN0YXRpY19jYXN0PEImPiggYS5hcnJheVtpXSApLCAKICAgICAgIChyYW5kKCkvMTAwMCkqMTAwM' +
      'CApOwogIH0KICBmb3IgKCBpbnQgaSA9IDA7IGkgPCAxNTsgKytpICkgewogICAgcHJpbnRmKCIlZCAiLCBhLmFyc' +
      'mF5W2ldLkdldFkoKSApOwogIH0KICByZXR1cm4gMDsKfQ==',
    answers: [ 'Ошибок нет',
      'В программе присутствует UB(неопределённое поведение)',
      'В программе выход за границы массива',
      'Программа может "упасть" - ошибка времени выполнения',
      ' программе присутствует UB(неопределённое поведение) и выход за границы массива',
      'В программе присутствует UB(неопределённое поведение), выход за границы массива, ' +
      'и возможно "падение" - ошибка времени выполнения' ],
  },
  {
    question: '0KfRgtC+INC90LDQv9C10YfQsNGC0LDQtdGCINGB0LvQtdC00YPRjtGJ0LjQuSDQu' +
      'tC+0LQg0LIg0YDQtdC30YPQu9GM0YLQsNGC0LUg0LjRgdC/0L7Qu9C90LXQvdC40Y8/',
    code: 'CnRyeSB7CiAgdGhyb3cgIm15IHRocm93IjsKfSBjYXRjaCAoIHN0ZDo6c3RyaW5nIHMgKSB7CiAgcHJpbnRmKC' +
      'JzdGQ6OnN0cmluZyIpOwp9IGNhdGNoICggY2hhciAqIHMgKSB7CiAgcHJpbnRmKCAiY2hhciAqIik7Cn0gY2F0Y' +
      '2ggKCBjb25zdCBjaGFyICogcyApIHsKICBwcmludGYoICJjb25zdCBjaGFyICoiKTsKfQogICAg',
    answers: [ 'std::string',
      'char *',
      'const char *',
    ],
  },
  {
    question: '0KfRgtC+INC90LDQv9C10YfQsNGC0LDQtdGCINGB0LvQtdC00YPRjtGJ0LjQuSDQutC+0' +
      'LQg0LIg0YDQtdC30YPQu9GM0YLQsNGC0LUg0LjRgdC/0L7Qu9C90LXQvdC40Y8/',
    code: 'CnRyeSB7CiAgdGhyb3cgQigpOwp9IGNhdGNoICggc3RkOjpzdHJpbmcgcyApIHsKICBwcmludGYoInN0ZD' +
      'o6c3RyaW5nIik7Cn0gY2F0Y2ggKCBBICkgewogIHByaW50ZigiQSIpOwp9IGNhdGNoICggY29uc3' +
      'QgY2hhciAqIHMgKSB7CiAgcHJpbnRmKCJCIik7Cn0KICAgIA==',
    answers: [ 'std::string',
      'A',
      'B',
    ],
  },
  {
    question: '0JrQsNC60L7QuSDRgtC40L/QuNGH0L3Ri9C5INGA0LXQt9GD0LvRjNGC0LDR' +
      'giDRgyBzaXplb2YoQikg0L3QsCAzMtGFINC4IDY00YUgLSDQsdC40YLQvdC+0Lkg0L/Qu9Cw0YLRhNC+0YDQvNC1Pw==',
    code:  'c3RydWN0IEEgewogICAgdmlydHVhbCB+QSgpIHt9CiAgICBpbnQgeDsKfTsKCmNsYXNzIEIgOiB2aXJ0dW' +
      'FsIHB1YmxpYyBBIHsKICAgIGNoYXIgYTsKICAgIHZvaWQgKiBiOwogICAgaW50IGM7CiAgICBsb25nIGxvbmcgZDsKfTs=',
    answers: [ '32х-битная - 21; и 64х-битная - 21',
      '32х-битная - 24; и 64х-битная - 32',
      '32х-битная - 28; и 64х-битная - 40',
      '32х-битная - 29; и 64х-битная - 29',
      '32х-битная - 32; и 64х-битная - 56',
    ],
  },
  {
    question: '0JrQsNC60L7QuSDRgNC10LfRg9C70YzRgtCw0YIg0L3QsNC/0LXRh9Cw0YLQsNC10YIg0L3QuNC20LXR' +
      'gdC70LXQtNGD0Y7RidC40Lkg0LrQvtC0INC/0YDQuCDQuNGB0L/QvtC70L3QtdC90LjQuCDRgdC+0LPQ' +
      'u9Cw0YHQvdC+INGB0YLQsNC90LTQsNGA0YLRgyBDKys/',
    code: 'aW50IERvQSggaW50IHggKSB7CiAgcHJpbnRmKCAiRG9BID0gJWQiICwgeCk7CiAgcmV0dXJuIHg7Cn0KCmlud' +
      'CBEb1ooIGludCB4LCBpbnQgeSApIHsKICAgcmV0dXJuIHggKiB5Owp9CgoKaW50IERvWSggaW50ICYgeCApIHsKICB' +
      'wcmludGYoICAgICJEb1kgPSAlZCAiLCBEb1ooICArK3gsIC0teCApICAgKTsKICByZXR1cm4gMDsKfQoKaW50IHggPSA3' +
      'LCB5ID0gODsKCmludCBtYWluKCkKewogICAgRG9ZKHgpICYmIERvQSggeSApOwogIHJldHVybiAwOwp9',
    answers: [ 'DoY = 56 DoA= 8',
      'DoY = 42 DoA = 8',
      'DoY = 49 DoA = 8',
      'DoY = 56 ',
      'DoY = 52 ',
      'DoY = 49 ',
      'Результат не определён',
    ],
  },
  {
    question: '0JTQsNC90L46INCy0YvRgNCw0LLQvdC40LLQsNC90LjQtSAxLCDRgNCw0LfQvNC10YAg0YPQutCw0LfQsNGC0L' +
      'XQu9GPINC90LAg0L/Qu9Cw0YLRhNC+0YDQvNC1IDMyINCx0LjRgtCwLiDQmtCw0LrQvtC5INCx0YPQtNC10YIg0YDQs' +
      'NC30LzQtdGAINGB0YLRgNGD0LrRgtGD0YDRiyBaINCyINCx0LDQudGC0LDRhSDQv9C+INGB0YLQsNC90LTQsNGA0YLRgyBDKys/',
    code: 'c3RydWN0IFogewogY2hhciBhOwogaW50IGI7CiB2b2lkICogYzsKIGxvbmcgZDsKIGxvbmcgbG9uZyBlOwp9Ow==',
    answers: [ '21',
      '25',
      '32',
      'Не определено',
    ],
  },
  {
    question: '0KHQutC+0LvRjNC60L4gaW50INGD0LzQtdGB0YLQuNGC0YHRjyDQsiBsb25nINC/0L4g0YHRgtCw0L3QtNCw0YDRgtGDIEMrKz8=',
    answers: [ '1',
      '2',
      'Больше одного',
      'Больше или равно одному',
      'Не определено',
    ],
  },
  {
    question: '0KfQtdC80YMg0YDQsNCy0LXQvSBzaXplb2YoIjB4QWJDZCIpINC90LAg0L7QsdGJ0LXRg9C/0L7RgtGA0LXQsdC40YLQtdC70YzQvdGL0YUgMzLRhSDQsdC40YLQvdGL0YUg0L/Qu9Cw0YLRhNC+0YDQvNCw0YU/',
    answers: [ '4',
      '6',
      '7',
      '8',
    ],
  },
  {
    question: '0KHRgNCw0LHQvtGC0LDQtdGCINC70LggTlJWTyAobmFtZWQgcmV0dXJuIHZhbHVlIG9wdGltaXp' +
      'hdGlvbiwg0L7Qv9GC0LjQvNC40LfQsNGG0LjRjyDQuNC80LXQvdC+0LLQsNC90L3QvtCz0L4g0LLQvtC' +
      '30YDQsNGJ0LDQtdC80L7Qs9C+INC30L3QsNGH0LXQvdC40Y8pPw==',
    code: 'QSBmdW4oIGJvb2wgY29uZCApIHsKICBpZiAoIGNvbmQgKSB7CiAgICBjb25zdCBBIGNvbn' +
      'N0IGE9IC4uLjsKICAgIHJldHVybiBhOwogIH0gZWxzZSB7CiAgICBjb25zdCBBIGNvbnN0IGE9I' +
      'C4uLjsKICAgIHJldHVybiBhOwp9',
    answers: [ 'Да',
      'Нет',
      'Не определено',
    ],
  },
  {
    question: '0JTQsNC90L46INC60L7QtA==',
    code: 'dGVtcGxhdGUgPHR5cGVuYW1lIFQ+IFQgY29uc3QgCiAgJiBzdGQ6Om1pbiggVCBjb25zdCAmIG' +
      'EsIFQgY29uc3QgJmIgKSB7IAogIHJldHVybiBhPGIgPyBiOiBhOyAKfQoKQyBjMSwgYzI7CmF1dG8gY' +
      '29uc3QgJm15X2EgPSAKICBzdGQ6Om1pbiggYzEuZ2V0QSgpLCBjMi5nZXRBKCkgKTs=',
    answers: [ 'Код сработает корректно, потому что механизм lifetime extension (продление жизни ссылок) сработает',
      'Механизм lifetime extension не сработает, код не скомпилируется',
      'Механизм lifetime extension сработает, код скомпилируется',
      'Механизм lifetime extension не только не сработает, но в результате получится UB (неопределенное поведение)',
    ],
  },
  {
    question: 'QURMICggQXJndW1lbnQtRGVwZW5kZWQgbmFtZSBMb29rdXAsIGtvZW5pZyB' +
      'sb29rdXAgKSAo0LDRgNCz0YPQvNC10L3RgtC90L4t0LfQsNCy0LjRgdC40LzRi9C5INC/0L7QuNGB0LopINGN0YLQvjo=',
    answers: [ 'Механизм, который позволяет компилятору искать функцию в ' +
    'пространстве имён аргументов и шаблонных параметров',
    'Механизм, который позволяет компилятору искать аргументы и шаблонные параметры в пространстве имён функции',
    ],
  },
  {
    question: '0KHQutC+0LvRjNC60L4gc2hvcnQgaW50INCy0LzQtdGB0YLQuNGC0YHRj' +
      'yDQsiBpbnQg0L/QviDRgdGC0LDQvdC00LDRgNGC0YMg0KErKz8=',
    answers: [ '1',
      '2',
      'Любое число',
      'Любое число, кроме нуля',
      'Неопределено',
    ],
  },
  {
    question: '0KfRgtC+INCy0YvQstC10LTQtdGCINGB0LvQtdC00YPRjtGJ0LjQuSDQutC+0LQg0LHQtdC3INC00' +
      'L7Qv9C+0LvQvdC40YLQtdC70YzQvdGL0YUg0LrQu9GO0YfQtdC5INC6INC60L7QvNC/0LjQu9GP0YLQvtGA0Y' +
      'MgKNC60YDQvtC80LUg0LrQu9GO0YfQtdC5INC80LDQutGB0LjQvNCw0LvRjNC90L7QuSDQvtC/0YLQuNC80Lj' +
      'Qt9Cw0YbQuNC4KT8g0KPQutCw0LbQuNGC0LUg0L3QsNC40LHQvtC70LXQtSDQstC10YDQvtGP0YLQvdGL0Lkg0L' +
      'gg0YLQuNC/0LjRh9C90YvQuSDRgNC10LfRg9C70YzRgtCw0YIu',
    code: 'I2luY2x1ZGUgPGlvc3RyZWFtPgp1c2luZyBuYW1lc3BhY2Ugc3RkOwoKdm9pZCBNeUZ1bihpbnQgeCkgewpjb3V0PDwgeCA8PGVuZGw7Cn0KCmludCBtYWluKCkgewppbnQgYSA9IDA7CmludCBiID0gMTsKKigmYSArIDEpICA9IDM7Ck15RnVuKGIpOwpyZXR1cm4gMDsKfQ==',
    answers: [ '1',
      '3',
      'выведет ошибку',
      'неопределено по стандарту С++',
    ],
  },
]



