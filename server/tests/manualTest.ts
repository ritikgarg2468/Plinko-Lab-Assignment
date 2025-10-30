import axios from 'axios'

const API = 'http://localhost:4000/api'

async function testPlinko() {
  console.log('\n=== 🎯 Testing Plinko API ===')

  const health = await axios.get(`${API}/health`)
  console.log('Health:', health.data)

  const commit = await axios.post(`${API}/rounds/commit`)
  console.log('Commit:', commit.data)

  const { roundId, nonce } = commit.data

  const start = await axios.post(`${API}/rounds/${roundId}/start`, {
    clientSeed: 'test-seed',
    betCents: 100,
    dropColumn: 6
  })
  console.log('Start:', start.data.round.status)

  const reveal = await axios.post(`${API}/rounds/${roundId}/reveal`)
  console.log('Reveal:', reveal.data)

  const verify = await axios.get(`${API}/verify`, {
    params: {
      serverSeed: reveal.data.serverSeed,
      clientSeed: 'test-seed',
      nonce,
      dropColumn: 6
    }
  })
  console.log('Verify:', verify.data)

  console.log('\n✅ All tests executed successfully!\n')
}

testPlinko().catch(err => console.error('❌ Test failed:', err.message))
