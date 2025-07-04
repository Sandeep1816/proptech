import { InternalEmailHandler } from "@/app/components/emailHandlers/InternalEmail";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const {
      companyName,
      contactName,
      email,
      phone,
      website,
      boothSize,
      productCategory,
      specialRequirements,
    } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    const mailOptions = {
      from: `"Future Proptech Summit-Exhibitor" <${process.env.EMAIL_USER}>`,
      to: process.env.TO_USER, // Replace with your recipient email
      subject: "New Exhibitor- Future Proptech Summit",
      html: `
        <h3>New Exhibitor Registration</h3>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Booth Size:</strong> ${boothSize}</p>
        <p><strong>Product Category:</strong> ${productCategory}</p>
        <p><strong>Special Requirements:</strong> ${specialRequirements}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
