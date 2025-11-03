import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Çerez Politikası | İrem Akkan Psikolojik Danışmanlık',
  description: 'Web sitemizde kullanılan çerezler ve veri toplama yöntemleri hakkında detaylı bilgilendirme.',
  keywords: 'çerez politikası, cookies, web analitik, veri toplama, gizlilik, psikolojik danışmanlık',
}

export default function CerezPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-navy to-navy-dark">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Çerez Politikası
          </h1>
          <p className="text-xl text-cream leading-relaxed">
            Web sitemizde kullanılan çerezler ve veri toplama yöntemleri
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="prose prose-lg max-w-none">
            
            {/* Çerez Nedir */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">1. Çerez Nedir?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Çerezler (cookies), web sitelerini ziyaret ettiğinizde tarayıcınızda saklanan küçük metin dosyalarıdır. 
                Bu dosyalar, web sitesinin düzgün çalışmasını sağlamak ve kullanıcı deneyimini iyileştirmek için kullanılır.
              </p>
              
              <div className="bg-cream/50 p-6 rounded-xl">
                <h3 className="font-semibold text-navy mb-3">Çerezlerin Amacı:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Web sitesinin işlevselliğini sağlamak</li>
                  <li>• Kullanıcı tercihlerini hatırlamak</li>
                  <li>• Site performansını analiz etmek</li>
                  <li>• Güvenliği artırmak</li>
                  <li>• Kullanıcı deneyimini kişiselleştirmek</li>
                </ul>
              </div>
            </div>

            {/* Kullandığımız Çerez Türleri */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">2. Kullandığımız Çerez Türleri</h2>
              
              <div className="space-y-6">
                {/* Zorunlu Çerezler */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-700 mb-3">Zorunlu Çerezler</h3>
                  <p className="text-green-700 mb-3">
                    Bu çerezler web sitesinin temel işlevlerinin çalışması için gereklidir ve kapatılamaz.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-green-300">
                          <th className="text-left py-2 text-green-800">Çerez Adı</th>
                          <th className="text-left py-2 text-green-800">Amacı</th>
                          <th className="text-left py-2 text-green-800">Süre</th>
                        </tr>
                      </thead>
                      <tbody className="text-green-700">
                        <tr className="border-b border-green-200">
                          <td className="py-2">session_id</td>
                          <td className="py-2">Oturum yönetimi</td>
                          <td className="py-2">Oturum süresi</td>
                        </tr>
                        <tr className="border-b border-green-200">
                          <td className="py-2">csrf_token</td>
                          <td className="py-2">Güvenlik</td>
                          <td className="py-2">Oturum süresi</td>
                        </tr>
                        <tr>
                          <td className="py-2">cookie_consent</td>
                          <td className="py-2">Çerez onayı</td>
                          <td className="py-2">1 yıl</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analitik Çerezler */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-700 mb-3">Analitik Çerezler</h3>
                  <p className="text-blue-700 mb-3">
                    Site kullanımını analiz etmek ve iyileştirmeler yapmak için kullanılır. Bu çerezler isteğe bağlıdır.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-blue-300">
                          <th className="text-left py-2 text-blue-800">Servis</th>
                          <th className="text-left py-2 text-blue-800">Çerez Adı</th>
                          <th className="text-left py-2 text-blue-800">Amacı</th>
                          <th className="text-left py-2 text-blue-800">Süre</th>
                        </tr>
                      </thead>
                      <tbody className="text-blue-700">
                        <tr className="border-b border-blue-200">
                          <td className="py-2">Google Analytics</td>
                          <td className="py-2">_ga</td>
                          <td className="py-2">Kullanıcı ayırt etme</td>
                          <td className="py-2">2 yıl</td>
                        </tr>
                        <tr className="border-b border-blue-200">
                          <td className="py-2">Google Analytics</td>
                          <td className="py-2">_ga_*</td>
                          <td className="py-2">Oturum durumu</td>
                          <td className="py-2">2 yıl</td>
                        </tr>
                        <tr>
                          <td className="py-2">Site İstatistik</td>
                          <td className="py-2">_analytics</td>
                          <td className="py-2">Sayfa görüntüleme</td>
                          <td className="py-2">30 gün</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* İşlevsel Çerezler */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-purple-700 mb-3">İşlevsel Çerezler</h3>
                  <p className="text-purple-700 mb-3">
                    Gelişmiş özellikler ve kişiselleştirme için kullanılır. Bu çerezler isteğe bağlıdır.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-purple-300">
                          <th className="text-left py-2 text-purple-800">Çerez Adı</th>
                          <th className="text-left py-2 text-purple-800">Amacı</th>
                          <th className="text-left py-2 text-purple-800">Süre</th>
                        </tr>
                      </thead>
                      <tbody className="text-purple-700">
                        <tr className="border-b border-purple-200">
                          <td className="py-2">language_pref</td>
                          <td className="py-2">Dil tercihi</td>
                          <td className="py-2">6 ay</td>
                        </tr>
                        <tr className="border-b border-purple-200">
                          <td className="py-2">theme_pref</td>
                          <td className="py-2">Tema tercihi</td>
                          <td className="py-2">1 yıl</td>
                        </tr>
                        <tr>
                          <td className="py-2">form_data</td>
                          <td className="py-2">Form verileri</td>
                          <td className="py-2">Oturum süresi</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Üçüncü Taraf Hizmetler */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">3. Üçüncü Taraf Hizmetler</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Web sitemizde aşağıdaki üçüncü taraf hizmetleri kullanılabilir ve bunlar kendi çerez politikalarına sahiptir:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Google Analytics</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Web sitesi trafiğini ve kullanıcı davranışlarını analiz etmek için kullanılır.
                  </p>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-dark text-sm underline"
                  >
                    Google Gizlilik Politikası
                  </a>
                </div>

                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Sanity CMS</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    İçerik yönetim sistemi olarak kullanılır.
                  </p>
                  <a 
                    href="https://www.sanity.io/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-dark text-sm underline"
                  >
                    Sanity Gizlilik Politikası
                  </a>
                </div>

                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">WhatsApp Business</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    İletişim için WhatsApp entegrasyonu kullanılır.
                  </p>
                  <a 
                    href="https://www.whatsapp.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-dark text-sm underline"
                  >
                    WhatsApp Gizlilik Politikası
                  </a>
                </div>

                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Vercel Hosting</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Web sitesi barındırma hizmeti olarak kullanılır.
                  </p>
                  <a 
                    href="https://vercel.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-dark text-sm underline"
                  >
                    Vercel Gizlilik Politikası
                  </a>
                </div>
              </div>
            </div>

            {/* Çerez Yönetimi */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">4. Çerez Yönetimi</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-3">Çerez Tercihlerinizi Yönetme:</h3>
                  <p className="text-gray-700 mb-4">
                    Çerez tercihlerinizi aşağıdaki yöntemlerle yönetebilirsiniz:
                  </p>
                  
                  <div className="bg-cream/30 p-6 rounded-xl">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-gold mr-3">•</span>
                        <strong>Site Üzerinden:</strong> Çerez ayarları panelinden tercihlerinizi değiştirin
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold mr-3">•</span>
                        <strong>Tarayıcı Ayarları:</strong> Tarayıcınızın gizlilik ayarlarından çerezleri yönetin
                      </li>
                      <li className="flex items-start">
                        <span className="text-gold mr-3">•</span>
                        <strong>Çerez Silme:</strong> Mevcut çerezleri tarayıcınızdan silebilirsiniz
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-yellow-700 mb-3">Önemli Not:</h3>
                  <p className="text-yellow-700">
                    Zorunlu çerezleri devre dışı bırakırsanız, web sitesinin bazı özellikleri düzgün çalışmayabilir. 
                    Analitik ve işlevsel çerezleri reddetmek, sitenin çalışmasını etkilemez ancak bazı kişiselleştirilmiş 
                    özellikleri kaybedebilirsiniz.
                  </p>
                </div>
              </div>
            </div>

            {/* Tarayıcı Ayarları */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">5. Tarayıcı Ayarları</h2>
              
              <p className="text-gray-700 mb-6">
                Popüler tarayıcılarda çerez ayarlarına nasıl erişeceğiniz:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cream/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-navy mb-2">Google Chrome</h3>
                  <p className="text-gray-700 text-sm">
                    Ayarlar → Gizlilik ve güvenlik → Çerezler ve diğer site verileri
                  </p>
                </div>

                <div className="bg-cream/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-navy mb-2">Mozilla Firefox</h3>
                  <p className="text-gray-700 text-sm">
                    Ayarlar → Gizlilik ve Güvenlik → Çerezler ve Site Verileri
                  </p>
                </div>

                <div className="bg-cream/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-navy mb-2">Safari</h3>
                  <p className="text-gray-700 text-sm">
                    Safari → Tercihler → Gizlilik → Çerezleri yönet
                  </p>
                </div>

                <div className="bg-cream/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-navy mb-2">Microsoft Edge</h3>
                  <p className="text-gray-700 text-sm">
                    Ayarlar → Çerezler ve site izinleri → Çerezleri yönet
                  </p>
                </div>
              </div>
            </div>

            {/* Veri Güvenliği */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">6. Veri Güvenliği</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Çerezler aracılığıyla toplanan verilerinizin güvenliği için aşağıdaki önlemleri alıyoruz:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Teknik Önlemler</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• SSL/TLS şifreleme</li>
                    <li>• Güvenli çerez bayrakları</li>
                    <li>• HttpOnly çerezler</li>
                    <li>• SameSite politikaları</li>
                  </ul>
                </div>

                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">İdari Önlemler</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Düzenli güvenlik denetimleri</li>
                    <li>• Veri minimizasyon ilkesi</li>
                    <li>• Erişim kontrolü</li>
                    <li>• Düzenli yedekleme</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Politika Güncellemeleri */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">7. Politika Güncellemeleri</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Bu çerez politikası değişiklik gösterebilir. Önemli değişiklikler için:
              </p>

              <div className="bg-cream/30 p-6 rounded-xl">
                <ul className="space-y-2 text-gray-700">
                  <li>• Web sitesinde duyuru yayınlanır</li>
                  <li>• E-posta ile bildirim gönderilir (kayıtlı kullanıcılar için)</li>
                  <li>• Yeni çerez onayı istenebilir</li>
                  <li>• Son güncelleme tarihi gösterilir</li>
                </ul>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p><strong>Son güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
              </div>
            </div>

            {/* İletişim */}
            <div className="p-8 bg-gradient-to-r from-navy/10 to-gold/10 rounded-2xl border border-gold/30">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">İletişim</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Çerez politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>E-posta:</strong> info@iremakkan.com</p>
                <p><strong>Telefon:</strong> 0543 231 33 00</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}