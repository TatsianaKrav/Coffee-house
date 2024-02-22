# TypeScript Essentials
## Badges and Reflections

- **Getting Started with TypeScript:** [Badge](https://learn.microsoft.com/api/achievements/share/en-us/43772041/ZPFCS8P2?sharingId=6A0FA167937C07F0)

This module lets us know what TypeScript is, what it's used for and what are the advantages of this language. It tells us about the first steps of  TS installation and initialisation in the project. There is basic knowledge necessary to work with TS.

- **Declare Variable Types in TypeScript:** [Badge](https://learn.microsoft.com/api/achievements/share/en-us/43772041/9NSEPC8U?sharingId=6A0FA167937C07F0)

This module explains how to declare variables with TS. The most important difference from JS is that mostly each variable should be declared with type. It can be not only well known types such as string and number, but also new types such as any, unknown, enum, void, interface etc. There is also some special construction such as type assertion, type guards, union and intersection types, literal types and literal narrowing, tuples. We should know what to choose because different constructions have different effects and allow us either narrow or make the type more flexible. 

- **Implement Interfaces in TypeScript:** [Badge](https://learn.microsoft.com/api/achievements/share/en-us/43772041/N79J6N8F?sharingId=6A0FA167937C07F0)

In this module we knew about a new thing that doesn’t exist in JS - interfaces. It's a very useful tool for typing variables, firstly because we can describe a type (with interface) once and use it many times for different variables with the same type, secondly - because it makes us strictly use all the fields and methods of interface (if they are not optional). 

- **Develop Typed Functions in TypeScript:** [Badge](https://learn.microsoft.com/api/achievements/share/en-us/43772041/3XL49EFH?sharingId=6A0FA167937C07F0)

This module introduces us to a new functionality - function types. This feature makes our work with function more clear, because typing a function in such a way allows us to see what this function accepts as arguments and return. It works with function expression, function declaration and arrow function and like in JS, we can use default parameters. The usage of optional parameters makes our work more flexible. Besides, we can use interfaces to type functions so we don’t need to type every parameter. 

- **Declare and Instantiate Classes in TypeScript:** [Badge](https://learn.microsoft.com/api/achievements/share/en-us/43772041/FZULBG5X?sharingId=6A0FA167937C07F0)

TS is a perfect tool to implement OOP paradigms. It has special features to operate with classes. TS allows us to use access modifiers (private, protected, readonly). Besides, we can use interfaces to ensure class shape. Typing class fields protects us from creating a wrong instance. 

- **Generics in TypeScript:** [Badge](https://learn.microsoft.com/api/achievements/share/en-us/43772041/UF5BSB43?sharingId=6A0FA167937C07F0)

Another paradigm of OOP - polymorphism - is implemented well with help of Generics. We can use generic functions, classes and interfaces when we work with a variety of data types (call functions with different types) so we reduce our code because it’s reusable. For example, we don’t need to write several functions that do the same thing but operate with different types and can give us different results (such as usage of binary + that works with numbers as summary operators and contacts strings when we operate with string type).

- **Work with External Libraries in TypeScript:** [Badge](https://learn.microsoft.com/api/achievements/share/en-us/43772041/8R6S2TRW?sharingId=6A0FA167937C07F0)

This module tells us about how to organize our code - with the usage of modules and namespace. It describes mostly how to work with modules. Actually, it’s realized in such a way as we do it in JS - using import and export. This module also explains how to use external libraries with TS. Modules are useful to make the architecture and logic of our project more clear, help to avoid the pollution of global scope and allow us to reuse our code .