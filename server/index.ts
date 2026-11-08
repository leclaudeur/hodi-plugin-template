import type { ServerPlugin } from '@hodi-app/plugin-sdk/server'

// The server part: one table of its own and one route. Hodi serves the route at /api/plugins/my-plugin/hello, to
// the profiles the plugin is for, while it is on. It runs in Hodi's sandbox: its database is its own file, so its
// tables need no prefix.
const plugin: ServerPlugin = {
  migrations: ['CREATE TABLE said (at TEXT NOT NULL)'],
  routes: {
    'POST /hello': async (_request, ctx) => {
      const { greeting, loud } = ctx.settings()
      ctx.db.run('INSERT INTO said (at) VALUES (?)', [new Date().toISOString()])
      const count = Number(ctx.db.get('SELECT COUNT(*) AS count FROM said')?.count ?? 0)
      const text = String(greeting)
      ctx.log(`said hello (${count})`)
      return { body: { text: loud ? text.toUpperCase() : text, count } }
    }
  }
}

export default plugin
