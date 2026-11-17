import { deliverLead, parseLead } from "@/lib/leads";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const lead = parseLead(body);
  if (!lead) {
    // Bots get a fake success; people only reach here with name and phone filled in.
    return body.website ? Response.json({ ok: true }) : Response.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const ok = await deliverLead(lead);
  return ok ? Response.json({ ok: true }) : Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
}
