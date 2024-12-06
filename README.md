> [!warning]
> Using node version 22.10.0

#### pnpm workspaces boiler plate:
- [video](https://www.youtube.com/watch?v=HM03XGVlRXI)
  - Complete
- [repo](https://github.com/mihailtd/demo-monorepo/tree/main)

#### Adding module to workspace
```sh
$ pnpm --filter @popover/client add @popover/tailwind-config@workspace:*
```

### Adding UI Module to module
```sh
$ pnpm --filter @popover/client add -D @popover/ui@workspace:*
```

> [!warning]
> This project uses ESLint version 9, which supports the `.eslintrc` format for configuration. However, newer versions of ESLint use a different configuration format called flat config. To ensure compatibility with the `.eslintrc` format, the `useFlatConfig` setting in the [.vscode/settings.json](.vscode/settings.json) file has been toggled to `false`. This allows the project to continue using the traditional `.eslintrc` configuration file. 
> An alternative to this is changing the [.eslintrc file](./.eslintrc) to the [eslint.config.js file format](https://eslint.org/blog/2023/10/flat-config-rollout-plans/) that will be compatible with ESLint 9 and beyond. Make sure to use the correct ESLint extension as well.