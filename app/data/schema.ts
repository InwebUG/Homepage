import { column as c, table } from 'remix/data-table'
import type { TableRow } from 'remix/data-table'

/**
 * Leads captured by the booking form. This is the backend side of the
 * onepager: every "Termin sichern" submission lands here.
 */
export const leads = table({
  name: 'leads',
  columns: {
    id: c.integer().primaryKey().autoIncrement(),
    name: c.text().notNull(),
    email: c.text().notNull(),
    company: c.text(),
    budget: c.text(),
    message: c.text(),
    created_at: c.integer().notNull(),
  },
})

export type Lead = TableRow<typeof leads>
