import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'KVKK - Kişisel Verilerin Korunması | İrem Akkan Psikolojik Danışmanlık',
  description: 'Kişisel verilerin korunması ve işlenmesi hakkında bilgilendirme. Psikolojik danışmanlık hizmetlerinde gizlilik ve veri güvenliği.',
  keywords: 'KVKK, kişisel veri, gizlilik, psikolojik danışmanlık, veri güvenliği, danışan hakları',
}

export default function KVKKPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-navy to-navy-dark">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Kişisel Verilerin Korunması
          </h1>
          <p className="text-xl text-cream leading-relaxed">
            6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında bilgilendirme
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="prose prose-lg max-w-none">
            
            {/* Veri Sorumlusu */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">1. Veri Sorumlusu</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel verilerinizin işlenmesine ilişkin veri sorumlusu sıfatıyla aşağıdaki bilgilendirmeyi yapıyoruz.
              </p>
              <div className="bg-cream/50 p-6 rounded-xl">
                <p className="font-semibold text-navy">Veri Sorumlusu:</p>
                <p className="text-gray-700">İrem Akkan - Psikolojik Danışman</p>
                <p className="text-gray-700">E-posta: psk.dan.iremakkan@gmail.com</p>
                <p className="text-gray-700">Telefon: 0543 231 33 00</p>
              </div>
            </div>

            {/* Kişisel Verilerin İşlenme Amaçları */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">2. Kişisel Verilerin İşlenme Amaçları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Psikolojik danışmanlık hizmetlerinin sunulması
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Randevu planlaması ve takibi
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Danışan ile iletişim kurulması
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Seanslara ilişkin kayıtların tutulması
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Mesleki sorumlulukların yerine getirilmesi
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Yasal yükümlülüklerin yerine getirilmesi
                </li>
              </ul>
            </div>

            {/* İşlenen Kişisel Veri Kategorileri */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">3. İşlenen Kişisel Veri Kategorileri</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Kimlik Bilgileri</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Ad, soyad</li>
                    <li>• T.C. kimlik numarası</li>
                    <li>• Doğum tarihi</li>
                  </ul>
                </div>
                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">İletişim Bilgileri</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Telefon numarası</li>
                    <li>• E-posta adresi</li>
                    <li>• Adres bilgileri</li>
                  </ul>
                </div>
                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Sağlık Bilgileri</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Psikolojik değerlendirme sonuçları</li>
                    <li>• Seans notları</li>
                    <li>• Tedavi süreci bilgileri</li>
                  </ul>
                </div>
                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Özel Nitelikli Veriler</h3>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Ruh sağlığı durumu</li>
                    <li>• Psikolojik test sonuçları</li>
                    <li>• Terapi kayıtları</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Kişisel Verilerin İşlenme Hukuki Sebepleri */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">4. Kişisel Verilerin İşlenme Hukuki Sebepleri</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki hukuki sebeplere dayanılarak işlenmektedir:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <strong>Açık rıza:</strong> Özel nitelikli kişisel veriler için açık rızanız
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <strong>Sözleşmenin ifası:</strong> Psikolojik danışmanlık hizmet sözleşmesinin ifası
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <strong>Yasal yükümlülük:</strong> Meslek yasalarından kaynaklanan yükümlülükler
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <strong>Meşru menfaat:</strong> Veri sorumlusunun meşru menfaatleri
                </li>
              </ul>
            </div>

            {/* Kişisel Verilerin Saklanma Süresi */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">5. Kişisel Verilerin Saklanma Süresi</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve mevzuatta öngörülen süreler dikkate alınarak saklanmaktadır:
              </p>
              <div className="bg-cream/30 p-6 rounded-xl">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-gold mr-3">•</span>
                    <strong>Seans kayıtları:</strong> En az 10 yıl (Türk Psikologlar Derneği Yönetmeliği)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-3">•</span>
                    <strong>İletişim bilgileri:</strong> Hizmet ilişkisi sona erdikten sonra 5 yıl
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-3">•</span>
                    <strong>Mali kayıtlar:</strong> 5 yıl (Vergi Usul Kanunu)
                  </li>
                </ul>
              </div>
            </div>

            {/* Kişisel Veri Sahibinin Hakları */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">6. Kişisel Veri Sahibinin Hakları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KVKK&apos;nin 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-cream/30 p-4 rounded-lg">
                  <p className="font-semibold text-navy">Bilgi Talep Etme</p>
                  <p className="text-sm text-gray-700">Kişisel verilerinizin işlenip işlenmediğini öğrenme</p>
                </div>
                <div className="bg-cream/30 p-4 rounded-lg">
                  <p className="font-semibold text-navy">Bilgilendirme Talep Etme</p>
                  <p className="text-sm text-gray-700">İşlenme amacı ve kullanım şekli hakkında bilgi alma</p>
                </div>
                <div className="bg-cream/30 p-4 rounded-lg">
                  <p className="font-semibold text-navy">Düzeltme Talep Etme</p>
                  <p className="text-sm text-gray-700">Eksik veya yanlış verilerin düzeltilmesini isteme</p>
                </div>
                <div className="bg-cream/30 p-4 rounded-lg">
                  <p className="font-semibold text-navy">Silme Talep Etme</p>
                  <p className="text-sm text-gray-700">Belirli şartlarda verilerin silinmesini isteme</p>
                </div>
                <div className="bg-cream/30 p-4 rounded-lg">
                  <p className="font-semibold text-navy">İtiraz Etme</p>
                  <p className="text-sm text-gray-700">Veri işleme faaliyetlerine itiraz etme</p>
                </div>
                <div className="bg-cream/30 p-4 rounded-lg">
                  <p className="font-semibold text-navy">Zarar Talebi</p>
                  <p className="text-sm text-gray-700">Uğranılan zararın giderilmesini talep etme</p>
                </div>
              </div>
            </div>

            {/* Başvuru Yöntemleri */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">7. Başvuru Yöntemleri</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Yukarıda sayılan haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz:
              </p>
              <div className="bg-cream/30 p-6 rounded-xl">
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-navy">E-posta ile:</p>
                    <p className="text-gray-700">psk.dan.iremakkan@gmail.com</p>
                  </div>
                  <div>
                   
               
                  </div>
                  <div className="text-sm text-gray-600 italic">
                    <p>* Başvurularınız en geç 30 gün içinde yanıtlanacaktır.</p>
                    <p>* Başvuru sırasında kimlik tespiti için gerekli belgeler talep edilebilir.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Güvenlik Önlemleri */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">8. Güvenlik Önlemleri</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verilerinizin güvenliği için aşağıdaki teknik ve idari önlemler alınmaktadır:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Fiziksel güvenlik önlemleri (kilitli dosya dolapları, güvenli ofis)
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Dijital güvenlik önlemleri (şifreleme, güvenli sunucular)
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Erişim kontrolü ve yetkilendirme sistemleri
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  Düzenli güvenlik denetimleri ve güncellemeler
                </li>
              </ul>
            </div>

            {/* İletişim */}
            <div className="p-8 bg-gradient-to-r from-navy/10 to-gold/10 rounded-2xl border border-gold/30">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">İletişim</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KVKK kapsamındaki haklarınız ve kişisel veri işleme faaliyetlerimiz hakkında daha fazla bilgi için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>E-posta:</strong> psk.dan.iremakkan@gmail.com</p>
                <p><strong>Telefon:</strong> 0543 231 33 00</p>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}