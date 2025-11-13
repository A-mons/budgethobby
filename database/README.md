# Database

The Prisma schema and migrations live in `server/prisma/`.

## Quick commands

```bash
# Generate Prisma client
npm run db:generate

# Run migrations (dev)
npm run db:migrate

# Seed the database
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Reset (drops all data)
npm run db:reset
```

## Schema overview

See [`server/prisma/schema.prisma`](../server/prisma/schema.prisma) for the full schema.
