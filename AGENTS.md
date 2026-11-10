# AGENTS.md

Instructions for AI coding agents working on this Hodi plugin. Read `README.md` first, then the
[`@hodi-app/plugin-sdk` README](https://www.npmjs.com/package/@hodi-app/plugin-sdk) (in `node_modules/@hodi-app/plugin-sdk/` once
installed).

- TypeScript strict, ES modules. Prettier decides formatting (no semicolons, single quotes, 120 columns): run
  `npm run format`. ESLint (`npm run lint`) has the same rules as Hodi's own code.
- Hodi's conventions: small modules with one job, at most 300 lines per file and 80 per function or component,
  `===` except `== null`, no nested ternary, `export default` for a `.tsx` file's component, named exports elsewhere.
  Comments say why in one or two plain sentences, above the line they concern.
- The plugin runs inside Hodi: never call an AI provider without a click, never import Hodi's own modules (use the
  context the server part gets and `hodi:sdk` in the web part), outgoing requests only through `ctx.fetchText` to the hosts in `permissions.network`; no Node module on the server part (it runs in a sandbox).
- Every text goes in `locales/fr.json` (the reference; French says « tu ») and every key also in `locales/en.json`.
  Code, comments, identifiers and commits are in English.
- Use Hodi's components from `hodi:sdk` and its CSS variables; prefix class names with the plugin's id.
- Migrations are appended, never edited or reordered once released. Its tables live in its own database, named as it likes.
- Server changes come with a test in `test/` (`testPlugin` from `@hodi-app/plugin-sdk/testing`).
- Add a line under « Unreleased » in `CHANGELOG.md` for anything a user would notice. Never raise `version` in a
  feature pull request: a small release pull request does it, right before the tag.
- Before a pull request: `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test` and `npm run build` must pass.
- Never put a private key in the repository.
