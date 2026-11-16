let ticketCache
let ticketRequest

async function getTicket(env) {
  if (ticketCache?.expires > Date.now()) return ticketCache.ticket
  if (ticketRequest) return ticketRequest
  ticketRequest = (async () => {
    const response = await fetch('https://api.weixin.qq.com/cgi-bin/stable_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grant_type: 'client_credential', appid: env.WECHAT_APP_ID || 'wx49c11ddfaacd7389', secret: env.WECHAT_APP_SECRET, force_refresh: false })
    })
    const token = await response.json()
    if (!response.ok || !token.access_token) throw new Error('wechat_token_unavailable')
    const url = new URL('https://api.weixin.qq.com/cgi-bin/ticket/getticket')
    url.searchParams.set('access_token', token.access_token)
    url.searchParams.set('type', 'jsapi')
    const ticketResponse = await fetch(url)
    const result = await ticketResponse.json()
    if (!ticketResponse.ok || result.errcode !== 0 || !result.ticket) throw new Error('wechat_ticket_unavailable')
    ticketCache = { ticket: result.ticket, expires: Date.now() + Math.max(0, result.expires_in - 300) * 1000 }
    return result.ticket
  })()
  try { return await ticketRequest } finally { ticketRequest = undefined }
}

export default {
  async fetch(request, env) {
    const requestUrl = new URL(request.url)
    if (requestUrl.pathname !== '/api/wechat-share') return env.ASSETS.fetch(request)
    const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
    if (request.method !== 'GET') return new Response(JSON.stringify({ error: 'method_not_allowed' }), { status: 405, headers })
    let pageUrl
    try { pageUrl = new URL(requestUrl.searchParams.get('url')) } catch {
      return new Response(JSON.stringify({ error: 'invalid_url' }), { status: 400, headers })
    }
    if (pageUrl.origin !== 'https://ewanqian.site' || !['/music/reawakening/', '/music/reawakening'].includes(pageUrl.pathname) || pageUrl.hash || pageUrl.username || pageUrl.password) {
      return new Response(JSON.stringify({ error: 'invalid_url' }), { status: 400, headers })
    }
    if (!env.WECHAT_APP_SECRET) return new Response(JSON.stringify({ error: 'wechat_configuration_required' }), { status: 503, headers })
    try {
      const ticket = await getTicket(env)
      const nonceStr = crypto.randomUUID().replaceAll('-', '')
      const timestamp = Math.floor(Date.now() / 1000)
      const input = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${pageUrl.href}`
      const digest = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(input))
      const signature = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
      return new Response(JSON.stringify({ appId: env.WECHAT_APP_ID || 'wx49c11ddfaacd7389', timestamp, nonceStr, signature }), { headers })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message === 'wechat_token_unavailable' ? 'wechat_token_unavailable' : 'wechat_ticket_unavailable' }), { status: 502, headers })
    }
  }
}
