# `@m-zelinka/streak-counter` - a basic streak counter

![npm](https://img.shields.io/npm/v/@m-zelinka/streak-counter)

> This is a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser (uses `localStorage`).

This module is available in three formats:

- **ES Module**: `dist/index.module.js`
- **CommonJS**: `dist/index.cjs`
- **UMD**: `dist/index.umd.js`

## Install

```
npm install @m-zelinka/streak-counter
```

## Usage

[![Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/streak-counter-7yl2w8)

```ts
import { streakCounter } from "@m-zelinka/streak-counter";

const today = new Date();
const streak = streakCounter(localStorage, today);
// streakCounter returns an object:
// {
//    currentCount: 1,
//    lastLoginDate: "11/11/2021",
//    startDate: "11/11/2021",
// }
```

## Credits

- [TypeScript Course](https://www.typescriptcourse.com/tutorials/build-a-typescript-project-from-scratch/) - Build a TypeScript Project From Scratch

## License

MIT © [Marek Zelinka](mailto:mzelinka17@gmail.com)
