// netlify/functions/notion-proxy.js
// Server-side proxy for Notion API — resolves CORS block on browser requests.
// Token is passed per-request in Authorization header. Never stored here.
//
// Supported actions (POST body):
//   { action: 'validate' }                          → GET /v1/users/me
//   { action: 'query', dbId: string, body: object } → POST /v1/databases/:dbId/query

const NOTION_API = 'https://api.notion.com/v1';
const NOTION_VER = '2022-06-28';

export default async (req, context) => {
  // Only accept POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: corsHeaders(),
    });
  }

  // Extract token from Authorization header
  const auth  = req.headers.get('authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';

  if (!token) {
    return new Response(JSON.stringify({ error: 'Missing Notion token' }), {
      status: 401,
      headers: corsHeaders(),
    });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: corsHeaders(),
    });
  }

  const { action, dbId, body = {} } = payload;

  try {
    let notionRes;

    if (action === 'validate') {
      // Validate token — check user identity
      notionRes = await fetch(`${NOTION_API}/users/me`, {
        headers: notionHeaders(token),
      });

    } else if (action === 'query') {
      if (!dbId) {
        return new Response(JSON.stringify({ error: 'dbId required for query' }), {
          status: 400,
          headers: corsHeaders(),
        });
      }
      notionRes = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
        method: 'POST',
        headers: notionHeaders(token),
        body: JSON.stringify(body),
      });

    } else {
      return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const data = await notionRes.json();

    return new Response(JSON.stringify(data), {
      status: notionRes.status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders() },
    });

  } catch (err) {
    console.error('[notion-proxy] Error:', err.message);
    return new Response(JSON.stringify({ error: 'Proxy error: ' + err.message }), {
      status: 502,
      headers: corsHeaders(),
    });
  }
};

function notionHeaders(token) {
  return {
    Authorization:    `Bearer ${token}`,
    'Notion-Version': NOTION_VER,
    'Content-Type':   'application/json',
  };
}

function corsHeaders() {
  return {
    'Content-Type':                'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export const config = { path: '/api/notion' };
