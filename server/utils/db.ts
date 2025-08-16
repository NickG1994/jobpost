import { H3Event } from 'h3'
import type { Pool } from 'mysql2/promise'

export async function query<T = any>(
  event: H3Event,
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const pool = event.context.mysqlPool as Pool | undefined

  if (!pool) {
    throw new Error('MySQL pool is not attached to request.')
  }

  const [rows] = await pool.execute(sql, params)
  return rows as T[]
}
