// netlify/functions/notion-proxy.js
// CommonJS format — most reliable on Netlify free tier.
// Proxies all Notion API calls server-side to resolve browser CORS block.

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VER = '2022-06-28';

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async function (event) {
  // Preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  // Token from Authorization header
  const auth  = event.headers['authorization'] || event.headers['Authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';

  if (!token) {
    return json(401, { error: 'Missing Notion token' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'Invalid JSON body' });
  }

  const { action, dbId, body = {} } = payload;

  try {
    let res;

    if (action === 'validate') {
      res = await fetch(`${NOTION_API}/users/me`, {
        headers: notionHeaders(token),
      });

    } else if (action === 'query') {
      if (!dbId) return json(400, { error: 'dbId required' });
      res = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
        method:  'POST',
        headers: notionHeaders(token),
        body:    JSON.stringify(body),
      });

    } else {
      return json(400, { error: `Unknown action: ${action}` });
    }

    const data = await res.json();
    return json(res.status, data);

  } catch (err) {
    console.error('[notion-proxy]', err.message);
    return json(502, { error: 'Proxy error: ' + err.message });
  }
};

function notionHeaders(token) {
  return {
    'Authorization':  `Bearer ${token}`,
    'Notion-Version': NOTION_VER,
    'Content-Type':   'application/json',
  };
}

function json(status, body) {
  return {
    statusCode: status,
    headers:    { 'Content-Type': 'application/json', ...CORS },
    body:       JSON.stringify(body),
  };
}
