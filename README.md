# <img src="https://github.com/dlcastillop/dlcastillop/blob/main/logos/hook-crafter.png" width="40" height="40" /> Hook Crafter

A Vite and TypeScript template for building your React hook library.

## Getting started

### Create the project

To create a Hook Crafter project, run:

```sh
npm create hook-crafter
```

```sh
yarn create hook-crafter
```

```sh
pnpm create hook-crafter
```

Then follow the prompt.

### Install the dependencies

Install the dependencies with npm, yarn, or pnpm.

```sh
npm install
```

```sh
yarn
```

```sh
pnpm install
```

### Create your hooks

Create all your hooks inside the `src/hooks` directory.

```ts
import { useState } from "react";

export const useCountUp = (increase: number) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + increase);
  return { count, increment };
};
```

And export them in the `index.ts` file.

```ts
export * from "./useCountUp";
```

## Questions

For questions and support please [open a discussion](https://github.com/novajslabs/hook-crafter/discussions).

## Support

You can support this project in several ways:

### Star us

Star [this repo](https://github.com/novajslabs/hook-crafter).

### Share

- [LinkedIn](http://www.linkedin.com/shareArticle?mini=true&url=https://hook-crafter.novajs.co/)
- [WhatsApp](https://api.whatsapp.com/send?text=https://hook-crafter.novajs.co/)
- [Facebook](https://www.facebook.com/sharer/sharer.php?u=https://hook-crafter.novajs.co/)
- [X](https://twitter.com/intent/tweet?url=https://hook-crafter.novajs.co/)
- [Reddit](https://www.reddit.com/submit?url=https://hook-crafter.novajs.co/)

## License

[MIT](https://github.com/novajslabs/hook-crafter/blob/main/LICENSE)
