"use client";

import { useState } from "react";
import { submitContactForm } from "./actions";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setMessage(null);

    try {
      const name = formData.get("name")?.toString().trim();
      const email = formData.get("email")?.toString().trim();
      const msg = formData.get("message")?.toString().trim();

      if (!name || !email || !msg) {
        setMessage({
          type: "error",
          text: "Lütfen gerekli alanları doldurunuz (*).",
        });
        setIsSubmitting(false);
        return;
      }

      const result = await submitContactForm(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
        });
        const formEl = document.getElementById("contact-form") as HTMLFormElement;
        if (formEl) formEl.reset();
      } else {
        setMessage({
          type: "error",
          text: result.error || "Bir hata oluştu. Lütfen tekrar deneyin.",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setMessage({
        type: "error",
        text: "Sunucuya bağlanılamadı. Lütfen daha sonra tekrar deneyin.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="contact-form"
      action={handleSubmit}
      className="space-y-5 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
      aria-label="İletişim formu"
    >
      {/* Honeypot field */}
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <InputField
        label="Ad Soyad *"
        name="name"
        type="text"
        required
        placeholder="Adınız ve soyadınız"
      />

      <InputField
        label="E-posta *"
        name="email"
        type="email"
        required
        placeholder="ornek@email.com"
      />

      <InputField
        label="Telefon"
        name="phone"
        type="tel"
        placeholder="+90 555 123 4567"
      />

      <InputField
        label="Konu"
        name="subject"
        type="text"
        placeholder="Mesajınızın konusu"
      />

      

      {message && (
        <div
          role="alert"
          aria-live="polite"
          className={`p-4 rounded-xl border transition-all duration-300 ${
            message.type === "success"
              ? "bg-[#f3efe8] text-[#2a3140] border-[#e7cfa6]"
              : "bg-[#f9e7e7] text-[#6b2b2b] border-[#e4b4b4]"
          }`}
        >
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        className={`w-full rounded-full bg-[#e7cfa6] text-[#181c26] font-semibold py-3 transition-all duration-300 hover:bg-[#cbb07e] ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
        size="lg"
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Gönderiliyor..." : "Gönder"}
      </Button>

      <p className="text-xs text-[#3d4352]/70 text-center pt-1">
        * ile işaretli alanlar zorunludur.
      </p>
    </form>
  );
}
