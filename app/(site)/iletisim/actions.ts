"use server";

export async function submitContactForm(formData: FormData) {
  // Honeypot kontrolü
  const honeypot = formData.get("website");
  if (honeypot) {
    // Bot tespit edildi, sessizce başarılı gibi göster
    return { success: true };
  }

  // Form verilerini al
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  // Basit validasyon
  if (!name || !email || !message) {
    return {
      success: false,
      error: "Lütfen tüm zorunlu alanları doldurun.",
    };
  }

  // Email validasyonu
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: "Geçerli bir e-posta adresi girin.",
    };
  }

  try {
    // Burada gerçek e-posta gönderimi yapılabilir
    // Örnek: SendGrid, Resend, Nodemailer vb.
    
    // Şimdilik console'a yazdıralım
    console.log("📧 Yeni İletişim Formu:");
    console.log("İsim:", name);
    console.log("E-posta:", email);
    console.log("Telefon:", phone);
    console.log("Konu:", subject);
    console.log("Mesaj:", message);

    // TODO: Gerçek e-posta gönderimi eklenecek
    // await sendEmail({
    //   to: "info@iremakkan.com",
    //   subject: `İletişim Formu: ${subject}`,
    //   html: `...`
    // });

    return { success: true };
  } catch (error) {
    console.error("Form gönderim hatası:", error);
    return {
      success: false,
      error: "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
    };
  }
}
