import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://inove_user:inove_pass_change_me@localhost:5433/inove_db',
  },
})
