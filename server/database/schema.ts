import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

interface SocialItem {
  href: string
  label: string
}

export const signatures = sqliteTable('signatures', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  email: text('email').notNull(),
  address: text('address').notNull(),
  logoUrl: text('logoUrl').notNull(),
  website: text('website').notNull(),
  phone: text('phone').notNull(),
  phoneAlt: text('phoneAlt').notNull(),
  socialText: text('socialText').notNull(),
  disclaimer: text('disclaimer').notNull(),
  showEmail: integer('showEmail', { mode: 'boolean' }),
  showSocial: integer('showSocial', { mode: 'boolean' }),
  showLogo: integer('showLogo', { mode: 'boolean' }),
  social: blob('social').$type<SocialItem>(),
})
