<div align="center">

# 🧩 Hodi plugin template

**A small, working plugin to start your own [Hodi](https://github.com/leclaudeur/hodi) plugin from.**<br>
Settings, a route with its own database, a card in Hodi and a first test. _All set up, all passing._

[![CI](https://github.com/leclaudeur/hodi-plugin-template/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/leclaudeur/hodi-plugin-template/actions/workflows/ci.yml)
[![Plugin SDK](https://img.shields.io/npm/v/@hodi-app/plugin-sdk?label=%40hodi-app%2Fplugin-sdk)](https://www.npmjs.com/package/@hodi-app/plugin-sdk)
[![Node.js 24 or later](https://img.shields.io/badge/node-%E2%89%A524-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[**Quick start**](#quick-start) · [**What's inside**](#whats-inside) · [**Rules**](#rules) · [**Checks**](#checks)

</div>

## Why start here

A Hodi **plugin** adds a feature to Hodi _without touching its code_. This template already has:

- 🧱 **the build**, which makes the `.hodi-plugin` file Hodi installs
- 🔁 **a live loop**: each save reinstalls the plugin on your test Hodi
- 🧪 **a test kit** that runs your routes in Hodi's sandbox, in memory
- ✅ **CI**, which checks every push and releases from a tag

## Before you start

- **Node.js 24** or later
- **A test Hodi** where you are the server's admin. Never the one your household uses.
  [Install Hodi](https://github.com/leclaudeur/hodi#install).

## Quick start

**1.** Click **Use this template**, then clone your new repository.

**2.** Install and test:

```bash
npm install
npm test        # → 3 tests pass
```

**3.** In your test Hodi, open _Server › Plugins_ and turn on **Developer mode**. Hodi shows a command, once.

**4.** Run that command in the plugin's folder:

```bash
npx hodi-plugin dev --server http://localhost:3000 --code <code>
# → ✓ my-plugin 0.1.0 in Hodi (2.6 s): reload the page
```

**5.** Reload _Server › Plugins_, then **Manage** the new plugin. Its **Say hello** card answers `Bonjour`.

Each save now reinstalls the plugin: reload the page to see your change.

## Make it yours

1. In `plugin.json`, set your `id` (lowercase letters, digits, dashes), `name` and `description`.
2. Rename the `my-plugin-` CSS class in `web/plugin.css` and `web/index.tsx`.
3. Write your texts in `locales/`.

## What's inside

```text
plugin.json        id, name, version, audience, permissions, settings
server/index.ts    server part: routes, migrations, its own database
web/index.tsx      web part, built with Hodi's components from 'hodi:sdk'
web/plugin.css     styles, prefixed with the plugin's id
locales/           texts, one file per language
test/              tests, with @hodi-app/plugin-sdk/testing
```

The [**`@hodi-app/plugin-sdk` guide**](https://www.npmjs.com/package/@hodi-app/plugin-sdk) explains every field and
everything a plugin may use.

## Rules

A plugin runs **inside Hodi, with Hodi's rights**, so it follows Hodi's rules:

- **No AI call without a click** on a purple button.
- **Every text goes in `locales/`.** In French, Hodi says « tu ».
- **The server part runs in a sandbox**: no Node modules, and the web only through `ctx.fetchText`.
- **Ask only for the permissions you need.** Hodi shows them before installing.
- **Never edit a released migration.** Add a new one.

## Signed or not

A package built here is **unsigned**. Installed from its file, Hodi labels it _Unverified code_ and **never shows its
web part**: no card, no page. In developer mode, everything shows while you work on it.

Only Hodi's official plugins are signed (_Verified_). Outside developer mode, an unsigned plugin can't use `accounts`,
`households`, `signIn`, `mail` or `notify`, and it never gets the AI.

## Checks

GitHub Actions runs these on every push. Run them before a pull request:

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build      # → dist/my-plugin-0.1.0.hodi-plugin
```

A tag such as `v0.1.0` publishes the `.hodi-plugin` file as a GitHub release.

## License

Copyright © 2026 Le Claudeur.

This template is free software under the [MIT license](LICENSE): you may **use, change and share** it freely.
Your plugin is yours: put your own license in `LICENSE` and in `package.json`.
