interface Question {
  question: string
  answers: Array<string>
}

export const questions: Array<Question> = [
  {
    question: 'Сколько параметров можно передать в деструктор?\n\n',
    answers: [ 'Один', 'Не более 30', 'Ни одного', 'Любое число' ],
  },
  {
    question: 'Сколько аргументов можно передать в функцию?\n\n',
    answers: [ 'Ни одного', 'Один', 'Не более десяти',
      'Только один по значению, и неограниченное число по ссылке',
      'Только один по ссылке, и неограниченное число по значению',
      'Неограниченное число' ],
  },
  {
    question: 'Где правильно приведена инициализация переменной?\n\n',
    answers: [ 'var str = "Hi";', 'int num = "1";',
      'done = true;', 'char sym = \'a\';' ],
  },
  {
    question: 'Как подключить стандартную библиотеку iostream?\n\n',
    answers: [ '#include "iostream.h"', '#include <iostream>',
      '#include <iostream.h>', ' #include iostream', '#include \'iostream.h\'' ],
  },
  {
    question: 'Какой результат будет в a и x после выполнения?\n\n' + 'int a=5;\n' + 'long x=3;\n' +
      'a+=x;\n' + 'x=--x;\n\n\n',
    answers: [ 'a=8 и x=7', 'a=8 и x=2', 'a=6 и x=2' ],
  },
  {
    question: 'При выполнении кода\n\n' + 'int a, b, c;\n' + 'cin>>a>>b>>c;\n' + 'cout<<a<<b<<c;\n\n' +
      'пользователь ввёл "10 234.5 822"\n' + 'что будет выведено на экран?\n\n',
    answers: [ '10 234.5 8822', '10234.5822',
      '102340', '10234822' ],
  },
  {
    question: 'Какое утверждение про цикл for верное?\n\n',
    answers: [ 'Цикл for может быть не выполнен ни разу', 'В цикле for может быть только один счётчик',
      'Цикл for не может быть бесконечным' ],
  },
  {
    question: 'Что такое конструктор класса?\n\n',
    answers: [ 'Метод инициализации экземпляра, который проверяет возможность создания экземпляра и реализует его',
      'Специальный метод класса для инициализации элементов класса начальными значениями',
      'Способ создания класса' ],
  },
  {
    question: 'Чсколько раз выполнится цикл for (int i=0; i<3; i++) ?\n\n',
    answers: [ '0', '1', '2', '3', '4' ],
  },
  {
    question: 'Чему будет равна переменная x?\n\n' + 'double x=400;\n' + 'int a=2;\n' + 'x%=3*a;\n',
    answers: [ 'Остаток от деления на 3, который умножается на 2',
      'Остаток от деления 400 на 6',
      'Количество процентов, которое 6 составляет от 400' ],
  },
  {
    question: 'Что такое выравнивание полей структур и классов?\n\n',
    answers: [ 'Это размещение полей по смещениям, кратным n байтам',
      'Это замена значений полей структуры, выходящих за некий максимум, этим максимальным значением. ' ],
  },
  {
    question: 'что такое абстрактный класс?\n\n',
    answers: [ 'Это класс с ключевым словом abstract',
      'Это класс с одной или несколькими абстрактными функциями.',
      'Это класс с недоопределёнными функциями' ],
  },
  {
    question: 'Виды наследования в C++\n\n',
    answers: [ 'public, private',
      'public, protected, private',
      'public, protected, private, virtual',
      'public, protected, private, virtual, abstract',
      'public, protected, private, virtual, abstract, extends',
      'public, protected, private, virtual, abstract, extends, explicit' ],
  },
  {
    question: 'Что такое mutable?\n\n',
    answers: [ 'Ключевое слово, позволяющее изменять член класса из константного метода',
      'Запрет компилятору на оптимизацию объекта',
      'Указание компилятору хранить значение в регистрах для ускорения доступа',
      'Указание компилятору на то, что переменная может быть записана из нескольких потоков одновременно' ],
  },
  {
    question: 'Что такое volatile?\n\n',
    answers: [ 'Ключевое слово, позволяющее изменять член класса из константного метода',
      'Запрет компилятору на оптимизацию объекта',
      'Указание компилятору хранить значение в регистрах для ускорения доступа',
      'Указание компилятору на то, что переменная может быть записана из нескольких потоков одновременно' ],
  },
  {
    question: 'Может ли порядок членов в списке инициализации конструктора ' +
      'не совпадать с порядком членов в классе?\n\n',
    answers: [ 'Может',
      'Не может',
      'Не должен, но если сделать по другому, то не будет ничего страшнее предупреждения компилятора' ],
  },
  {
    question: 'Как запретить неявное преобразование типа, выполняемое конструктором инициализации?\n\n',
    answers: [ 'Объявить конструктор abstract',
      'Объявить конструктор explicit',
      'Существует соглашение, по которому ключевое слово const в ' +
      'конце конструктора означает запрет на неявное преобразование типа' ],
  },
  {
    question: 'Укажите максимальное число правильных (согласно стандарту C++) способов' +
      ' освободить память, выделенную командой MyClass * ptr = ::new MyClass[50]\n\n',
    answers: [ 'Без ограничений. delete ptr, free( ptr ), delete[] ptr',
      'Только delete[] ptr',
      'delete[] ptr или можно для каждого элемента массива вызвать деструктор, ' +
      'а потом можно использовать delete ptr' ],
  },
  {
    question: 'Что обозначается ключевым словом catch?\n\n',
    answers: [ 'Контролируемый блок',
      'Блок обработки исключения',
      'Секция-ловушка',
      'Генератор исключения',
      'Обработчик прерывания' ],
  },
  {
    question: 'Могут ли блоки try-catch быть вложенными?\n\n',
    answers: [ 'Да',
      'Нет' ],
  },
  {
    question: 'Каков порядок вызова конструкторов? А деструкторов?\n\n',
    answers: [ 'Оба порядка случайны',
      'Гарантируется, что порядок вызова конструкторов будет каждый раз одним и тем же,' +
      ' но последовательность вызова не известна заранее. Тоже для деструкторов',
      'Конструкторы вызываются случайным образом, а деструкторы в обратном порядке',
      'Гарантируется, что порядок вызова конструкторов будет каждый раз одним и тем же, ' +
      'но последовательность вызова не известна заранее. Деструкторы вызываются в обратном порядке',
      'Конструкторы вызываются случайным образом, а порядок вызова деструкторов совпадает с вызовом конструкторов' ],
  },
  {
    question: 'Для чего нужен виртуальный конструктор?\n\n',
    answers: [ 'Чтобы избежать утечки памяти',
      'Чтобы использовать пользовательские аллокаторы',
      'Конструктор не бывает виртуальным',
      'Для создания фабричных методов' ],
  },
  {
    question: 'Для чего нужен виртуальный деструктор?\n\n',
    answers: [ 'Чтобы избежать утечки памяти',
      'Чтобы использовать пользовательские аллокаторы',
      'Конструктор не бывает виртуальным',
      'Для создания фабричных методов' ],
  },
  {
    question: 'Как правильно бросать исключения в конструкторе?\n\n',
    answers: [ 'Лучше не бросать, но если бросил, следить, чтобы не было повторных исключений.',
      'Исключения в конструкторе - это стандартная хорошая практика, ' +
      'гарантирующая, что не будет утечек памяти. Главное, перехватить исключение через catch  и обработать его.',
      'Нельзя бросать исключения в конструкторе, это ведёт к ошибке времени исполнения с вероятностью 100%.',
      'Исключения в конструкторе - часть парадигмы RAII, их можно и нужно бросать всегда без каких-либо ' +
      'ограничений.' ],
  },
  {
    question: ' В каком классе будет базовый при ромбовидном наследовании (когда D наследуется от B и C, ' +
      'а они имеют общего предка A)\n\n',
    answers: [ 'В первом',
      'Во втором',
      ' В обоих, т.е. у D будет 2 базовых класса A',
      'Ни в каком',
      'Компилятор имеет право на оптимизацию, поэтому он уберёт один лишний класс A, ' +
      'а нелишний разместит случайным образом, скорее всего в первом.' ],
  },
  {
    question: 'Чему равен sizeof от пустой структуры\n\n',
    answers: [ '0',
      '1',
      'sizeof пустой структуры - это неопределённое поведение по стандарту' ],
  },
  {
    question: 'Что такое абстрактная функция?\n\n',
    answers: [ 'Виртуальная функция без тела, заданная как "=0;", которую ' +
    'обязательно надо переопределить в наследниках',
    'Невиртуальная функция без тела, заданная как "=0;"',
    'Виртуальная функция с телом, заданная как "=0;", но которую обязательно надо переопределить в наследниках' ],
  },
  {
    question: 'Насколько использование volatile является thread-safe / потокобезопасным?\n\n',
    answers: [ 'По стандарту C++ - не является, но на общеупотребимых платформах на практике может работать ' +
    'как atomic в простых операциях и при использовании барьеров, запрещающих переупорядочение команд',
    'По стандарту C++ безопасно использовать только volatile bool в качестве atomic<bool>  в простых операциях ' +
      'и при использовании барьеров, запрещающих переупорядочение команд',
    'По стандарту C++ volatile потокобезопасен и может использоваться в простых операциях и при ' +
      'использовании барьеров, запрещающих переупорядочение команд',
    'По стандарту C++ volatile потокобезопасен и может использоваться без ограничений.' ],
  },
  {
    question: 'Что такое фабрика и зачем она нужна?\n\n',
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
    question: 'Является ли shared_ptr потокобезопасным (thread safe)? Возможность переупорядочивания ' +
      'операций в расчёт не принимать.\n\n',
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
    question: 'Какой метод запретить создание класса на стеке будет рабочим?\n\n',
    answers: [ 'Объявить конструкторы private или protected и добавить фабричный метод',
      'Просто объявить конструкторы private или protected',
      'Объявить деструкторы private или protected',
      'Это не возможно по стандарту C++' ],
  },
  {
    question: `Есть ли ошибки в этой программе ?
          #include <utility>
          #include <cstdio>
          #include <cstdlib>
          #include <new>
          
          
          #pragma pack(push, 1)
          
          class A {
            public:
              int x = 0;
            virtual ~A() {}
            virtual int GetY() const { return 170170; }
          };
          
          class B : public A {
          public:
            B( int val ) : y( val ) {}
            virtual int GetY() const { return y; }
          
          private:
            int y = 0;
          };
          
          template<typename T, typename... ConstructionArgs>
          void Construct( T &to_construct, ConstructionArgs &&... args ) {
            ::new( &to_construct ) T(
              std::forward<ConstructionArgs>( args )... );
          };
          
          
          struct C {
            A array[15];
          } a;
          
          #pragma pack(pop)
          
          int main()
          {
            for ( int i = 14; i > 0; --i ) {
            Construct<B>( static_cast<B&>( a.array[i] ), (rand()/1000)*1000 );
          }
            for ( int i = 0; i < 15; ++i ) {
            printf("%d ", a.array[i].GetY() );
          }
            return 0;
          }

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
    question: `Что напечатает следующий код в результате исполнения?

    try {
        throw B();
    } catch ( std::string s ) {
        printf("std::string");
    } catch ( A ) {
        printf("A");
    } catch ( const char * s ) {
        printf("B");
    }`,
    answers: [ 'std::string',
      'A',
      'B',
    ],
  },
  {
    question: `Какой типичный результат у sizeof(B) на 32х и 64х - битной платформе?


        struct A {
            virtual ~A() {}
            int x;
        };
        
        class B : virtual public A {
            char a;
            void * b;
            int c;
            long long d;
    };`,
    answers: [ '32х-битная - 21; и 64х-битная - 21',
      '32х-битная - 24; и 64х-битная - 32',
      '32х-битная - 28; и 64х-битная - 40',
      '32х-битная - 29; и 64х-битная - 29',
      '32х-битная - 32; и 64х-битная - 56',
    ],
  },
  {
    question: `Какой результат напечатает нижеследующий код при исполнении согласно стандарту C++?

      int DoA( int x ) {
        printf( "DoA = %d" , x);
        return x;
      }
      
      int DoZ( int x, int y ) {
         return x * y;
      }
      
      
      int DoY( int & x ) {
        printf(    "DoY = %d ", DoZ(  ++x, --x )   );
        return 0;
      }
      
      int x = 7, y = 8;
      
      int main()
      {
          DoY(x) && DoA( y );
        return 0;
    }`,
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
    question: `Дано: выравнивание 1, размер указателя на платформе 32 бита. Какой будет размер 
    структуры Z в байтах по стандарту C++?

      struct Z {
       char a;
       int b;
       void * c;
       long d;
       long long e;
    };`,
    answers: [ '21',
      '25',
      '32',
      'Неопределено',
    ],
  },
  {
    question: 'Сколько int уместится в long по стандарту c++?',
    answers: [ '1',
      '2',
      'больше одного',
      'больше или равно одному',
      'неопределено',
    ],
  },
  {
    question: 'Чему равен sizeof("aBcDeF") на общеупотребительных 32х битных платформах?',
    answers: [ '4',
      '6',
      '7',
      '8',
    ],
  },
  {
    question: `Сработает ли NRVO (named return value optimization, оптимизация именованного возращаемого значения)?

      A fun( bool cond ) {
        if ( cond ) {
          const A const a= ...;
          return a;
        } else {
          const A const a= ...;
          return a;
    }`,
    answers: [ 'да',
      'нет',
      'неопределено',
    ],
  },
  {
    question: `Дано: код

      template <typename T> T const & std::min( T const & a, T const &b ) { return a<b ? b: a; }
      
      C c1, c2;
      auto const &my_a = std::min( c1.getA(), c2.getA() );`,
    answers: [ 'Код сработает корректно, потому что механизм lifetime extension (продление жизни ссылок) сработает',
      'Механизм lifetime extension не сработает, код не скомпилируется',
      'Механизм lifetime extension сработает, код скомпилируется',
      'Механизм lifetime extension не только не сработает, но в результате получится UB (неопределенное поведение)',
    ],
  },
  {
    question: 'ADL ( Argument-Depended name Lookup, koenig lookup ) (аргументно-зависимый поиск) это:',
    answers: [ 'Механизм, который позволяет компилятору искать функцию в ' +
    'пространстве имён аргументов и шаблонных параметров',
    'Механизм, который позволяет компилятору искать аргументы и шаблонные параметры в пространстве имён функции',
    ],
  },
  {
    question: 'сколько short int вместится в int по стандарту С++?',
    answers: [ '1',
      '2',
      'Любое число',
      'Любое число, кроме нуля',
      'Неопределено',
    ],
  },
  {
    question: `Что выведет следующий код без дополнительных ключей к компилятору (кроме ключей максимальной 
    оптимизации)? Укажите наиболее вероятный и типичный результат.

      int a = 0;
      int b = 1;
      *(&a + 1)  = 3;
      MyFun(b);
`,
    answers: [ '1',
      '3',
      'выведет ошибку',
      'неопределено по стандарту С++.',
    ],
  },

]
