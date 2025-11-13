import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { client } from "@/sanity/lib/client";

// 🧩 Fetch settings from Sanity
async function getSettings() {
  try {
    const settings = await client.fetch(
      `*[_type == "settings" && _id == "settings"][0]{
        phoneNumber,
        email,
        officeAddress,
        locationInfo,
        socialLinks,
        counselor {
          name,
          title,
          "image": image.asset->url
        }
      }`
    );
    return settings;
  } catch (error) {
    console.error("⚠️ Sanity settings fetch failed:", error);
    return null;
  }
}

// 🏗️ Site Layout Component
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="pt-20 relative bg-ivory overflow-hidden">
        {/* Hafif arka plan bloblar */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-[-10%] w-[40rem] h-[40rem] bg-gold/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-[-10%] w-[35rem] h-[35rem] bg-teal/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
        </div>
        {children}
      </main>

      {/* Footer */}
      <Footer settings={settings} />

      {/* Sticky CTA Button */}
      <StickyCTA />
    </>
  );
}