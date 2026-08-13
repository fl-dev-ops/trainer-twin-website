const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

export async function POST(request: Request) {
  const formData = await request.formData();
  const contact = formData.get("contact");
  const link = formData.get("link");

  if (
    typeof contact !== "string" ||
    !contact.trim() ||
    contact.length > 200 ||
    typeof link !== "string" ||
    !link.trim() ||
    link.length > 500
  ) {
    return Response.json({ success: false }, { status: 400 });
  }

  if (!webhookUrl) {
    return Response.json({ success: false }, { status: 500 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      body: new URLSearchParams({ contact: contact.trim(), link: link.trim() }),
      signal: AbortSignal.timeout(10_000),
    });
    const result = await response.json();

    if (!response.ok || !result.success) throw new Error("Webhook rejected submission");
    return Response.json({ success: true });
  } catch (error) {
    console.error("Invite submission failed", error);
    return Response.json({ success: false }, { status: 502 });
  }
}
