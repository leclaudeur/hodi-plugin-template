<div align="center">

# 🧩 Hodi plugin template

**A small, complete plugin to start your own [Hodi](https://github.com/leclaudeur/hodi) plugin from.**<br>
Settings, a server route with its own database, a card in Hodi's interface, two languages and a first test:<br>
_all wired up, all passing._ You change what it does, not how it is built.

[![CI](https://github.com/leclaudeur/hodi-plugin-template/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/leclaudeur/hodi-plugin-template/actions/workflows/ci.yml)
[![Plugin SDK](https://img.shields.io/npm/v/@hodi-app/plugin-sdk?label=%40hodi-app%2Fplugin-sdk)](https://www.npmjs.com/package/@hodi-app/plugin-sdk)
[![Node.js 24 or later](https://img.shields.io/badge/node-%E2%89%A524-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[**Quick start**](#-quick-start) · [**Make it yours**](#-make-it-yours) ·
[**What's inside**](#-whats-inside) · [**Rules**](#-the-rules) · [**Checks**](#-checks)

</div>

<br>

## 💡 Why start here

[Hodi](https://github.com/leclaudeur/hodi) is a self-hosted news reader for a household. A **plugin** adds a feature to
it _without touching Hodi's code_: its own settings, its own routes and data, its own screens.

Writing one from a blank folder means guessing the manifest, the build, the sandbox and the tests. This template gives
you all of it, **already working**:

- 🧱 **The build**: `npm run build` makes the `.hodi-plugin` file Hodi installs
- 🔁 **A live loop**: each save rebuilds and reinstalls it on your test Hodi
- 🧪 **A test kit**: your routes run in Hodi's own sandbox, in memory, nothing leaves the machine
- ✅ **CI**: GitHub Actions checks every push and publishes a release from a tag

## ✅ Before you start

- **Node.js 24** or later (npm comes with it)
- **A Hodi of your own to try it on**, where you are the server's admin: a _test_ install, <ins>never the one your
  household reads</ins>. [Installing Hodi](https://github.com/leclaudeur/hodi#install) takes two commands.
- A GitHub account, for the **Use this template** button

## 🚀 Quick start

**1. Make your copy.** Click **Use this template** on GitHub, then clone your new repository.

**2. Install and run the tests.**

```bash
npm install
npm test
```

```text
# tests 3
# pass 3
# fail 0
```

**3. Turn on the developer mode** of your test Hodi: _Serveur › Plugins › Mode développeur_. Hodi asks for your
password and your authenticator app's code, then shows the command to run, **once**.

**4. Send the plugin to it.** Paste that command in the plugin's folder:

```bash
npx hodi-plugin dev --server http://localhost:3000 --code <the code Hodi showed>
```

```text
✓ my-plugin 0.1.0 in Hodi (2.6 s): reload the page
Watching .; Ctrl+C to stop.
```

**5. See it work.** Reload _Serveur › Plugins_: **Mon plugin** is there, marked « En développement ». Click **Gérer**:
under its two options, the card's **Dire bonjour** button answers **« Bonjour »**, and counts each time.

From now on, **each save** in the folder rebuilds the plugin and sends it again: reload the page to see your change. 🎉

## 🎨 Make it yours

1. In `plugin.json`, pick your plugin's **`id`** (lowercase letters, digits and dashes), its `name` and its
   `description`.
2. Rename the `my-plugin-` CSS class in `web/plugin.css` and `web/index.tsx` to `<your id>-`.
3. Put your texts in `locales/fr.json` and `locales/en.json`.
4. Change the route, the card and the test. The next section shows where each one lives.

## 📦 What's inside

```text
plugin.json        what it is: id, name, version, API, who it is for, what it may reach, its settings
server/index.ts    its server part, run in Hodi's sandbox: its own database, migrations and routes
web/index.tsx      its web part, drawn with Hodi's components from 'hodi:sdk'
web/plugin.css     its styles, prefixed with its id, coloured with Hodi's CSS variables
locales/           its texts, one file per language (French is the fallback)
test/              its tests: the server part run as Hodi runs it
assets/            optional: pictures and other files its web part asks for
```

### The server part answers a route

Hodi serves it at `/api/plugins/my-plugin/hello`, to the profiles the plugin is for:

```ts
// server/index.ts
const plugin: ServerPlugin = {
  migrations: ['CREATE TABLE said (at TEXT NOT NULL)'],
  routes: {
    'POST /hello': async (_request, ctx) => {
      const { greeting, loud } = ctx.settings()
      ctx.db.run('INSERT INTO said (at) VALUES (?)', [new Date().toISOString()])
      const count = Number(ctx.db.get('SELECT COUNT(*) AS count FROM said')?.count ?? 0)
      const text = String(greeting)
      return { body: { text: loud ? text.toUpperCase() : text, count } }
    }
  }
}
```

### The web part calls it

`usePluginApi()` asks the plugin's own routes, and the card is drawn with Hodi's `SettingRow` and `Button`:

```tsx
// web/index.tsx
const response = await api('/hello', { method: 'POST' })
setSaid(await response.json()) // { text: 'Bonjour', count: 1 }
```

### A test checks it

`testPlugin('.')` builds the plugin and runs it around a small Hodi in memory:

```ts
// test/plugin.test.ts
const hodi = await testPlugin('.')
const first = await hodi.route('POST /hello')
assert.deepEqual([first.status, first.body], [200, { text: 'Bonjour', count: 1 }])
```

📚 Every field, every hook and everything a plugin may use is in the
[**`@hodi-app/plugin-sdk` guide**](https://www.npmjs.com/package/@hodi-app/plugin-sdk).

## 📏 The rules

A plugin runs **inside Hodi, with Hodi's rights**, so it keeps Hodi's rules:

- 🟣 **No AI call without a click** on a purple button.
- 🌍 **Every text goes in `locales/`**, and French says « tu ».
- 📦 **The server part runs in a sandbox**, with no Node module. Its data goes in its own database (`ctx.db`), the
  pages of the sites listed in `permissions.network` come through `ctx.fetchText`, and Hodi's articles through
  `ctx.articles` with `permissions.articles`.
- 🔐 **Ask only for what it needs**: Hodi shows these permissions to the admin before installing.
- 🧱 **A released migration is never edited or reordered**: add a new one.

## 🔏 Signed or not: what it changes

A package built here is **unsigned**. That is fine to write and try a plugin, but know what it means:

| Where it runs                           | Its server part | Its web part (cards, pages) |
| :-------------------------------------- | :-------------: | :-------------------------: |
| Your test Hodi, in **Mode développeur** |       ✅        |             ✅              |
| A Hodi that installs the `.hodi-plugin` |       ✅        |      ❌ _never served_      |

Installed from the file, Hodi labels it **« Code non vérifié »** and asks a second time. Its web part stays off because
it would run in Hodi's page, with the person's session. **« Vérifié »** is kept for Hodi's official plugins, signed by
its maintainer.

Some permissions (`accounts`, `households`, `signIn`, `mail`, `notify`) and the AI are for **signed plugins only**: Hodi
refuses an unsigned plugin that asks for them, outside the developer mode.

## 🧪 Checks

Run them before each pull request. GitHub Actions runs the same ones on every push:

```bash
npm run typecheck
npm run lint
npm run format:check
npm test
npm run build      # → Unsigned package: dist/my-plugin-0.1.0.hodi-plugin
```

CI attaches the `.hodi-plugin` file to each run. A tag such as `v0.1.0` also publishes it as a **GitHub release**.

## 📄 License

This template is under the [MIT license](LICENSE). **Your plugin is yours**: replace `LICENSE` and the `license` field
of `package.json` with the license you choose.
