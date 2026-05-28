import { Database } from 'remix/data-table'
import type { Middleware } from 'remix/router'

import { db } from '../data/db.ts'

/** Exposes the shared database instance to actions via `get(Database)`. */
export function loadDatabase(): Middleware {
  return async (context, next) => {
    context.set(Database, db)
    return next()
  }
}
