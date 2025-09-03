import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

(async () => {
  const payload = JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    date: '2025-09-10',
    time: '08:00–12:00',
    location: 'Berlin',
  });

  const res = await request({
    hostname: 'localhost',
    port: 3001,
    path: '/api/bookings',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
  }, payload);

  console.log('POST /api/bookings =>', res.status, res.body);
})();
