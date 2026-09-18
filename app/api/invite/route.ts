const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

export async function POST(request: Request) {
  try {
    let name = "";
    let email = "";
    let mobile = "";
    let links = "";
    let role: string[] = [];
    let earnings: string[] = [];
    let goals: string[] = [];
    let contact = "";
    let link = "";

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await request.json();
      name = String(data.name || "");
      email = String(data.email || "");
      mobile = String(data.mobile || "");
      links = String(data.links || "");
      contact = String(data.contact || "");
      link = String(data.link || "");
      role = Array.isArray(data.role) ? data.role : data.role ? [String(data.role)] : [];
      earnings = Array.isArray(data.earnings) ? data.earnings : data.earnings ? [String(data.earnings)] : [];
      goals = Array.isArray(data.goals) ? data.goals : data.goals ? [String(data.goals)] : [];
    } else {
      const formData = await request.formData();
      name = String(formData.get("name") || "");
      email = String(formData.get("email") || "");
      mobile = String(formData.get("mobile") || "");
      links = String(formData.get("links") || "");
      contact = String(formData.get("contact") || "");
      link = String(formData.get("link") || "");
      role = formData.getAll("role").map(String).filter(Boolean);
      earnings = formData.getAll("earnings").map(String).filter(Boolean);
      goals = formData.getAll("goals").map(String).filter(Boolean);
    }

    const effectiveContact = (email || mobile || contact).trim();
    const effectiveLink = (links || link).trim();

    if (!effectiveContact && !name.trim()) {
      return Response.json(
        { success: false, error: "Missing required contact details" },
        { status: 400 }
      );
    }

    if (!webhookUrl) {
      console.warn("GOOGLE_SHEETS_WEBHOOK_URL is not configured.");
      return Response.json({ success: true });
    }

    const params = new URLSearchParams();
    if (name.trim()) params.append("name", name.trim());
    if (email.trim()) params.append("email", email.trim());
    if (mobile.trim()) params.append("mobile", mobile.trim());
    if (effectiveContact) params.append("contact", effectiveContact);
    if (effectiveLink) params.append("link", effectiveLink);
    if (links.trim()) params.append("links", links.trim());
    if (role.length > 0) params.append("role", role.join(", "));
    if (earnings.length > 0) params.append("earnings", earnings.join(", "));
    if (goals.length > 0) params.append("goals", goals.join(", "));
    params.append("timestamp", new Date().toISOString());

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: params,
      signal: AbortSignal.timeout(10_000),
    });

    let result: any = {};
    try {
      result = await response.json();
    } catch {
      result = { success: response.ok };
    }

    if (!response.ok && !result.success) {
      throw new Error("Webhook rejected submission");
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Invite submission failed:", error);
    return Response.json({ success: false, error: "Submission failed" }, { status: 502 });
  }
}
