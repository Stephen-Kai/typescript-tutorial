1. 数据类型
    ```ts
    Undefined :
    Number:数值类型;
    string : 字符串类型;
    Boolean: 布尔类型；
    enum：枚举类型；
    any : 任意类型，一个牛X的类型；
    void：空类型；
    Array : 数组类型;
    Tuple : 元祖类型；
    Null ：空类型。
    ```

2. 定义变量
    ```ts
    let/const/var variablenName:type = 'xxx'
    ```

3. 任意变量 any
    ```ts
    使用let/var name:any 定义变量可随意赋值各种类型
    ====> 等价于 let/var name
    ```

4. 类型初始化后，不可改变
    ```ts
    // 默认初始化了变量，会默认变量类型，不可改变
    let myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;  
    ```
    ```ts
    // 报错
    index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
    ```

5. 定义变量为多种类型
    ```ts
    // 表示取值可以为多种类型中的一种。
    let myFavoriteNumber: string | number;
    myFavoriteNumber = 'seven';
    myFavoriteNumber = 7;
    ```

6. 访问多种类型变量的方法或属性
    ```ts
    // 只能访问此联合类型的所有类型里共有的属性或方法：
    function getLength(something: string | number): number {
        return something.length;
    }
    ```
    ```ts
    // 报错
    index.ts(2,22): error TS2339: Property 'length' does not exist
    on type 'string | number'.
    Property 'length' does not exist on type 'number'.
    // 可以访问 something.toString()
    // 因为something.toString()是string和number的共有属性
    ```

7. 接口
    ```ts
    // 接口（Interfaces）是对行为的抽象，
    // 而具体如何行动需要由类（classes）实现（implement）。
    // TypeScript 的接口对类的行为进行抽象，
    // 也对「对象的形状（Shape）」进行描述。
    interface Person {
        name: string;
        age: number;
    }
    
    let tom: Person = {
        name: 'Tom',
        age: 25
    };
    ```
    > 赋值的时候，变量的形状必须和接口的形状保持一致。
    > 即定义变量时属性不可【**多**】也不可【**少**】
    
    ##### 定义变量可选属性
    
    ```ts
    interface Person {
        name: string;
        age?: number;  // 用问号表示
    }
    
    let tom: Person = {
        name: 'Tom'
    };
    ```
    ##### 定义变量任意属性
    ```ts
    interface Person {
        name: string;
        age?: number;
        [propName: string]: any;  // 任意string类型的属性，可使用 string
    }
    
    let tom: Person = {
        name: 'Tom',
        gender: 'male'
    };
    ``` 
    #### PS !!! =====>
    > 定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
    
    ```ts
    // 任意属性的值允许是 string，但是可选属性 age 的值却是 number，
    // number 不是 string 的子属性，所以报错了
    interface Person {
        name: string;
        age?: number;
        [propName: string]: string;
    }
    let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };
    ```
    ##### 解决方法：
    ```ts
    interface Person {
        name: string;
        age?: number;
        [propName: string]: string | number; // 定义任意属性时可为多个
    }
    let tom: Person = {
        name: 'Tom',
        age: 25,
        gender: 'male'
    };
    ```
    ##### 定义变量只读属性
    
    ```ts
    interface Person {
        readonly id: number; // 属性前添加readonly
        name: string;
        age?: number;
        [propName: string]: any;
    }
    
    let tom: Person = {
        id: 89757,
        name: 'Tom',
        gender: 'male'
    };
    
    tom.id = 9527;
    ```
    #### PS !!!! =============>
    > 只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
8. 数组
    ##### 「类型 + 方括号」表示法
    ```ts
    // 不允许出现多个类型，这里只能是number类型
    let fibonacci: number[] = [1, 1, 2, 3, 5]; 
    // 在定义和push值过程中，均不允许出现多个类型
    let fibonacci: number[] = [1, '1', 2, 3, 5]; // 出现string类型，报错
    fibonacci.push('8'); // push的值为string类型，报错
    ```

    ##### 数组泛型表示
    ```ts
    let fibonacci: Array<number> = [1, 1, 2, 3, 5];
    ```
    
    ##### 接口表示
    ```ts
    interface NumberArray {
        [index: number]: number;
    }
    let fibonacci: NumberArray = [1, 1, 2, 3, 5];
    ```

    > NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
      虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
    
    ##### 类数组
    ```ts
    // 类数组（Array-like Object）不是数组类型，比如 arguments
    function sum() {
        let args: number[] = arguments;
    }
    // Type 'IArguments' is missing the following properties 
    // from type 'number[]': pop, push, concat, join, and 24 more.
    ```
    > arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：
    ```ts
    function sum() {
        let args: {
            [index: number]: number;
            length: number;
            callee: Function;
        } = arguments;
    }
    ```
9. 函数
    > JavaScript 中，有两种常见的定义函数的方式——函数声明（Function Declaration）和函数表达式（Function Expression）
   
    ```ts
    // 函数声明（Function Declaration）
    function sum(x, y) {
        return x + y;
    }
    
    // 函数表达式（Function Expression）
    let mySum = function (x, y) {
        return x + y;
    };
    ```
    ##### 函数声明
    ```ts
    // 输入多余的（或者少于要求的）参数，是不被允许的
    function sum(x: number, y: number): number {
        return x + y;
    }
    ```
    ##### 函数表达式
    ```ts
    // => 表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。不等于ES6中的箭头函数
    let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
        return x + y;
    };
    ```
    ##### 用接口定义函数的形状
    ```ts
    // 采用函数表达式 | 接口定义函数的方式时，对等号左侧进行类型限制，
    // 可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    
    let mySearch: SearchFunc;
    mySearch = function(source: string, subString: string) {
        return source.search(subString) !== -1;
    }
    ```
    ##### 入参可选
    ```ts
    function buildName(firstName: string, lastName?: string) {
        if (lastName) {
            return firstName + ' ' + lastName;
        } else {
            return firstName;
        }
    }
    let tomcat = buildName('Tom', 'Cat');
    let tom = buildName('Tom');
    ```
    > 可选参数必须接在必需参数后面。换句话说，**可选参数后面不允许再出现必需参数**

    ##### 参数默认值
    ```
    function buildName(firstName: string, lastName: string = 'Cat') {
        return firstName + ' ' + lastName;
    }
    let tomcat = buildName('Tom', 'Cat');
    let tom = buildName('Tom');
    ```
    > 此时就不受「**可选参数必须接在必需参数后面**」的限制

    ##### 剩余参数
    > ES6 中，使用 ...rest 的方式获取函数中的剩余参数
    
    ```ts
    function push(array, ...items) {
        items.forEach(function(item) {
            array.push(item);
        });
    }
    
    let a: any[] = [];
    push(a, 1, 2, 3);
    ```
    
    ```ts
    // 用数组的类型来定义, any表示任意类型
    function push(array: any[], ...items: any[]) {
        items.forEach(function(item) {
            array.push(item);
        });
    }
    
    let a = [];
    push(a, 1, 2, 3);
    ```
    
    ##### 重载
    > 允许一个函数接受不同**数量**或**类型**的参数
    
    ```ts
    // 重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。
    function reverse(x: number): number;
    function reverse(x: string): string;
    function reverse(x: number | string): number | string {
        if (typeof x === 'number') {
            return Number(x.toString().split('').reverse().join(''));
        } else if (typeof x === 'string') {
            return x.split('').reverse().join('');
        }
    }
    ```

10. 类型断言
    > 手动指定一个**值的类型**
    
    ##### 语法：
    ```
    1. 值 as 类型
    2. <类型>值 // 可能表示一个泛型
    ```
    > 在 tsx 语法中必须使用前者，即 值 as 类型
    
    #### 用途
    > 1. 将一个**联合类型**断言为其**中一个类型**
    
    ```ts
    interface Cat {
        name: string;
        run(): void;
    }
    interface Fish {
        name: string;
        swim(): void;
    }
    
    function getName(animal: Cat | Fish) {  // 联合类型
        return animal.name;
    }
    
    // 采用断言指定类型
    function isFish(animal: Cat | Fish) {
        if (typeof (animal as Fish).swim === 'function') {
            return true;
        }
        return false;
    }
    ```
    > 2. 将一个**父类**断言为更加**具体的子类**
    
    ```ts
    class ApiError extends Error {
        code: number = 0;
    }
    class HttpError extends Error {
        statusCode: number = 200;
    }
    
    function isApiError(error: Error) {
        if (typeof (error as ApiError).code === 'number') {
            return true;
        }
        return false;
    }
    // 有的情况下 ApiError 和 HttpError 不是一个真正的类，
    // 而只是一个 TypeScript 的接口（interface），
    // 接口是一个类型，不是一个真正的值，它在编译结果中会被删除，
    // 当然就无法使用 instanceof 来做运行时判断了。
    interface ApiError extends Error {
        code: number;
    }
    interface HttpError extends Error {
        statusCode: number;
    }
    
    function isApiError(error: Error) {
        if (error instanceof ApiError) {
            return true;
        }
        return false;
    }
    
    // index.ts:9:26 - error TS2693: 'ApiError' only refers to a type, but is being used as a value here.
    ```
    > 3. 将任何一个类型断言为 any
    
    ```ts
    const foo: number = 1;
    foo.length = 1;
    // index.ts:2:5 - error TS2339: Property 'length' does not exist on type 'number'.
    
    window.foo = 1;
    // index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
    
    (window as any).foo = 1;  // 使用 as any 临时将 window 断言为 any 类型
    ```
    它极有可能**掩盖了真正的类型错误**，所以如果**不是非常确定**，就**不要使用 as any**。
     
    总之，**一方面不能滥用 as any，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡**（这也是 TypeScript 的设计理念之一），才能发挥出 TypeScript 最大的价值。
    
    > 4. 将 any 断言为一个具体的类型
    
    ```ts
    // 调用完 getCacheData 之后，立即将它断言为 Cat 类型。
    // 这样的话明确了 tom 的类型，后续对 tom 的访问时就有了代码补全，
    // 提高了代码的可维护性。
    function getCacheData(key: string): any {
        return (window as any).cache[key];
    }
    
    interface Cat {
        name: string;
        run(): void;
    }
    
    const tom = getCacheData('tom') as Cat;
    tom.run();
    ```

    ##### 类型断言的限制
    ```ts
    若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。
    若 B 兼容 A，那么 A 能够被断言为 B，B 也能被断言为 A。
    ```
    ##### 双重断言
    ```ts
    // 除非迫不得已，千万别用双重断言。
    interface Cat {
        run(): void;
    }
    interface Fish {
        swim(): void;
    }
    
    function testCat(cat: Cat) {
        return (cat as any as Fish);
    }
    // 十有八九是非常错误的，它很可能会导致运行时错误
    ```
    ##### 类型断言 vs 类型转换
    > 类型断言只会**影响** TypeScript **编译时**的类型，类型断言语句在**编译结果**中会**被删除**
    
    ```ts
    function toBoolean(something: any): boolean {
        return something as boolean;
    }
    
    toBoolean(1);
    // 返回值为 1
    ```
    ```ts
    // 编译后
    function toBoolean(something) {
        return something;
    }
    
    toBoolean(1);
    // 返回值为 1
    ```
    > 类型断言**不是类型转换**，它不会真的**影响**到**变量的类型**

    ##### 类型断言 vs 类型声明
    ```ts
    function getCacheData(key: string): any {
        return (window as any).cache[key];
    }
    
    interface Cat {
        name: string;
        run(): void;
    }
    
    const tom = getCacheData('tom') as Cat; // as 转为Cat
    const tom: Cat = getCacheData('tom');  // 也可以通过类型声明方式实现
    tom.run();
    ```

    ```ts
    interface Animal {
        name: string;
    }
    interface Cat {
        name: string;
        run(): void;
    }

    const animal: Animal = {
        name: 'tom'
    };
    let tom: Cat = animal;

    // index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
    ```
    > animal **==断言==**为 Cat，只需要满足 Animal 兼容 Cat 或 Cat 兼容 Animal 即可

    > animal **==赋值给==** tom，需要满足 Cat 兼容 Animal 才行
    
    ##### 类型断言 vs 范型
    ```ts
    const tom = getCacheData<Cat>('tom'); // 泛型方式实现类型断言
    ```
    
11. 声明文件
    ```ts
    declare var 声明全局变量
    declare function 声明全局方法
    declare class 声明全局类
    declare enum 声明全局枚举类型
    declare namespace 声明（含有子属性的）全局对象
    interface 和 type 声明全局类型
    export 导出变量
    export namespace 导出（含有子属性的）对象
    export default ES6 默认导出
    export = commonjs 导出模块
    export as namespace UMD 库声明全局变量
    declare global 扩展全局变量
    declare module 扩展模块
    /// <reference /> 三斜线指令
    ```
    
    ```ts
    // 声明文件必需以 .d.ts 为后缀
    declare var jQuery: (selector: string) => any;
    
    /path/to/project
    ├── src
    |  ├── index.ts
    |  └── jQuery.d.ts
    └── tsconfig.json
    
    // 将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了
    ```

    ```ts
    // 第三方声明文件
    npm install @types/jquery --save-dev
    ```
    
    ```ts
    // 书写声明文件
    全局变量：通过 <script> 标签引入第三方库，注入全局变量
    npm 包：通过 import foo from 'foo' 导入，符合 ES6 模块规范
    UMD 库：既可以通过 <script> 标签引入，又可以通过 import 导入
    直接扩展全局变量：通过 <script> 标签引入后，改变一个全局变量的结构
    在 npm 包或 UMD 库中扩展全局变量：引用 npm 包或 UMD 库后，改变一个全局变量的结构
    模块插件：通过 <script> 或 import 导入后，改变另一个模块的结构
    ```
    
    ```ts
    // declare namespace 内部，我们直接使用 function ajax 来声明函数，
    // 而不是使用 declare function ajax。类似的，也可以使用 const, class, enum 等语句
    
    // src/jQuery.d.ts
    declare namespace jQuery {
        function ajax(url: string, settings?: any): void;
        const version: number;
        class Event {
            blur(eventType: EventType): void
        }
        enum EventType {
            CustomClick
        }
    }
    ```
    
    ```
    // 嵌套的命名空间
    declare namespace jQuery {
        function ajax(url: string, settings?: any): void;
        namespace fn {
            function extend(object: any): void;
        }
    }
    ```
    
    ```ts
    // export 语法与普通的 ts 中的语法类似
    // 区别 仅在于声明文件中禁止定义具体的实现
    // 混用 declare 和 export，效果一致，
    // 区别 interface 前是不需要 declare 的
    
    // types/foo/index.d.ts
    export const name: string;
    export function getName(): string;
    export class Animal {
        constructor(name: string);
        sayHi(): string;
    }
    export enum Directions {
        Up,
        Down,
        Left,
        Right
    }
    export interface Options {
        data: any;
    }
    ```
    ```ts
    // import
    // src/index.ts
    import { name, getName, Animal, Directions, Options } from 'foo';
    
    console.log(name);
    let myName = getName();
    let cat = new Animal('Tom');
    let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
    let options: Options = {
        data: {
            name: 'foo'
        }
    };
    ```
    
    > ES6 模块系统中，使用 export default 可以导出一个默认值，使用方可以用 import foo from 'foo' 而不是 import { foo } from 'foo' 来导入这个默认值
    
    ```ts
    // export default
    // types/foo/index.d.ts
    export default function foo(): string;
    
    // import
    // src/index.ts
    import foo from 'foo';
    foo();
     ```
     
    > 只有 **==function==、==class==** 和 **==interface==** 可以直接默认导出，其他的变量需要先定义出来，再默认导出

    ```ts
    // 模块导出
    // commonjs 
    // 整体导出
    module.exports = foo;
    // 单个导出
    exports.bar = bar;
    
    // ts 中
    
    // 第一种: const ... = require
    // 整体导入
    const foo = require('foo');
    // 单个导入
    const bar = require('foo').bar;
    
    
    // 第二种: import ... from
    // 整体导入
    import * as foo from 'foo';
    // 单个导入
    import { bar } from 'foo';
    
    // 第三种: import ... require
    //  ts 官方推荐
    // 整体导入
    import foo = require('foo');
    // 单个导入
    import bar = foo.bar;
    
    ```
    
    > 由于很多第三方库是 commonjs 规范的，所以声明文件也就不得不用到 export = 这种语法了。但是还是需要再强调下，相比与 export =，我们更推荐使用 ES6 标准的 export default 和 export

    > 既可以通过 <script> 标签引入，又可以通过 import 导入的库，称为 UMD 库
    
    ```ts
    // types/foo/index.d.ts
    // 使用 export as namespace 时，都是先有了 npm 包的声明文件，
    // 再基于它添加一条 export as namespace 语句，
    // 即可将声明好的一个变量声明为全局变量
    export as namespace foo;
    export = foo;
    
    declare function foo(): string;
    declare namespace foo {
        const bar: number;
    }
    
    // 也可以与 export default 一起使用
    // types/foo/index.d.ts

    export as namespace foo;
    export default foo;
    
    declare function foo(): string;
    declare namespace foo {
        const bar: number;
    }
    ```
    
12. 内置对象
    > 内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。
    
    > ECMAScript 标准提供的内置对象有：
    Boolean、Error、Date、RegExp 等
    
    ts中使用内置对象：
    ```
    let b: Boolean = new Boolean(1);
    let e: Error = new Error('Error occurred');
    let d: Date = new Date();
    let r: RegExp = /[a-z]/;
    ```
    > DOM 和 BOM 的内置对象：
    Document、HTMLElement、Event、NodeList 等。
    
    ```
    let body: HTMLElement = document.body;
    let allDiv: NodeList = document.querySelectorAll('div');
    document.addEventListener('click', function(e: MouseEvent) {
      // Do something
    });
    ```
    