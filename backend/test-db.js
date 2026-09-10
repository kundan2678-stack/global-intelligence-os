const { Client } = require('pg');

const client = new Client({
  user: 'postgres',                 // pgAdmin ka default user
  host: 'localhost',
  database: 'global_intelligence',    // Jo DB aapne banayi
  password: 'kundan123',     // ⚠️ Yahan apna pgAdmin login password daalein
  port: 5432,                       // Default PostgreSQL port
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Success: Node.js is connected to PostgreSQL!');
    
    // Check if tables exist
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public';
    `);
    console.log('Tables found in database:', res.rows.map(r => r.table_name));
    
    await client.end();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

testConnection();