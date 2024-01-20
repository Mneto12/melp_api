import pg from 'pg'

// TODO: Refactor urgent
export const pool = new pg.Pool({
    connectionString: 'postgres://root:HctYHXOSOtKPWtXF57N6slxmmZL0Ymxg@dpg-cmlcq50l5elc73c3ljeg-a.oregon-postgres.render.com/dbrestaurantes',
    ssl: true
})