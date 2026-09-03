// ENTROPY SIGNAL LINK — Cloudflare Worker signaling
// Bind a KV namespace named SIGNALS.
// POST /signal  { room, role, type, sdp }
// GET  /signal?room=...&role=sender|receiver
export default {
  async fetch(request, env) {
    const u = new URL(request.url);
    const cors = {
      "access-control-allow-origin":"*",
      "access-control-allow-headers":"content-type",
      "access-control-allow-methods":"GET,POST,OPTIONS",
      "content-type":"application/json"
    };
    if (request.method === "OPTIONS") return new Response("", {headers:cors});
    if (u.pathname !== "/signal") return new Response(JSON.stringify({ok:true,name:"ENTROPY SIGNAL LINK"}),{headers:cors});
    if (request.method === "POST") {
      const b = await request.json();
      const id = crypto.randomUUID();
      const targetRole = b.role === "sender" ? "receiver" : "sender";
      const key = `${b.room}:${targetRole}`;
      await env.SIGNALS.put(key, JSON.stringify({id, type:b.type, sdp:b.sdp, ts:Date.now()}), {expirationTtl:120});
      return new Response(JSON.stringify({ok:true,id}), {headers:cors});
    }
    const room=u.searchParams.get("room"), role=u.searchParams.get("role");
    if(!room||!role) return new Response(JSON.stringify({error:"room and role required"}),{status:400,headers:cors});
    const v=await env.SIGNALS.get(`${room}:${role}`);
    return new Response(v||"{}",{headers:cors});
  }
};