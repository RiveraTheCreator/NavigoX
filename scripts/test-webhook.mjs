// Test manual: node scripts/test-webhook.mjs
// Envia un payload de prueba al webhook de n8n usado por WaitlistModal (app/page.jsx)
// y valida que el endpoint responda correctamente.

const WEBHOOK_URL = 'https://mi-n8n-n8n.4u5ow8.easypanel.host/webhook/navigo-x';

const payload = {
  nombre: 'Test Claude',
  email: 'test@example.com',
  telefono: '+52 5511112222',
  empresa: 'NavigoX QA',
};

async function main() {
  console.log(`POST ${WEBHOOK_URL}`);
  console.log('Payload:', payload);

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  console.log(`Status: ${res.status} ${res.statusText}`);
  console.log('Body:', body || '(vacío)');

  if (!res.ok) {
    console.error('El webhook respondió con un error.');
    process.exit(1);
  }

  console.log('OK: el webhook aceptó la petición.');
}

main().catch((err) => {
  console.error('Fallo al llamar al webhook:', err);
  process.exit(1);
});
