import initWasm from '@vlcn.io/crsqlite-wasm'

function App() {
  const numEntries = 1000

  const test = async () => {
    const sqlite = await initWasm()
    const sqliteDB = await sqlite.open('sqlite_test.db')
    await sqliteDB.exec('DROP TABLE IF EXISTS test_fts')
    await sqliteDB.exec('CREATE VIRTUAL TABLE IF NOT EXISTS test_fts USING fts5(fieldA, fieldB, fieldC, fieldD, fieldE, id UNINDEXED, prefix=2, detail=none);')

    for (let i = 0; i < numEntries; i++) {
      await sqliteDB.exec(`INSERT INTO test_fts (fieldA, fieldB, fieldC, fieldD, fieldE, id) VALUES ('test', 'test', 'test', 'test', 'test', '${i}');`)
        .catch(err => {
          console.error(err, i)
        })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={test}
          target="_blank"
          rel="noopener noreferrer"
        >
          Test
        </button>
      </header>
    </div>
  );
}

export default App;
