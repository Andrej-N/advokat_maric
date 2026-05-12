import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, phone, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Nedostaju obavezna polja." }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "Maric Advokatura <kontakt@mariclaw.rs>",
    to: "kancelarija.maric@gmail.com",
    replyTo: email,
    subject: `Nova poruka od ${name}`,
    text: `Ime: ${name}\nEmail: ${email}\nTelefon: ${phone || "—"}\n\nPoruka:\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Slanje nije uspelo. Pokušajte ponovo." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
