import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | İrem Akkan Psikolojik Danışmanlık',
  description: 'Psikolojik danışmanlık hizmetlerinde gizlilik ilkeleri, mesleki etik kuralları ve danışan gizliliği politikamız.',
  keywords: 'gizlilik politikası, mesleki etik, danışan gizliliği, psikolojik danışmanlık, etik kurallar',
}

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-navy to-navy-dark">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Gizlilik Politikası
          </h1>
          <p className="text-xl text-cream leading-relaxed">
            Psikolojik danışmanlık hizmetlerinde gizlilik ve mesleki etik ilkelerimiz
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="prose prose-lg max-w-none">
            
            {/* Genel İlkeler */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">1. Genel İlkeler</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                İrem Akkan Psikolojik Danışmanlık olarak, danışanlarımızın gizliliğini korumak en temel sorumluluğumuz olduğunu kabul ediyoruz. 
                Bu politika, Türk Psikologlar Derneği Etik Yönetmeliği ve mesleki etik kuralları çerçevesinde hazırlanmıştır.
              </p>
              <div className="bg-cream/50 p-6 rounded-xl">
                <h3 className="font-semibold text-navy mb-3">Temel İlkelerimiz:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Gizlilik:</strong> Danışan bilgileri kesinlikle gizli tutulur</li>
                  <li>• <strong>Güven:</strong> Güvenli ve destekleyici bir ortam sağlanır</li>
                  <li>• <strong>Saygı:</strong> Her danışana eşit saygı ve anlayış gösterilir</li>
                  <li>• <strong>Profesyonellik:</strong> En yüksek mesleki standartlar uygulanır</li>
                </ul>
              </div>
            </div>

            {/* Danışan Gizliliği */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">2. Danışan Gizliliği</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Psikolojik danışmanlık sürecinde paylaştığınız tüm bilgiler tamamen gizlidir ve aşağıdaki durumlar haricinde 
                hiçbir şekilde üçüncü kişilerle paylaşılmaz:
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-navy mb-3">Gizli Tutulan Bilgiler:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-cream/30 p-4 rounded-lg">
                    <ul className="text-gray-700 space-y-1">
                      <li>• Kişisel bilgileriniz</li>
                      <li>• Seans içerikleri</li>
                      <li>• Psikolojik değerlendirme sonuçları</li>
                      <li>• Paylaştığınız duygular ve deneyimler</li>
                    </ul>
                  </div>
                  <div className="bg-cream/30 p-4 rounded-lg">
                    <ul className="text-gray-700 space-y-1">
                      <li>• Aile ve ilişki bilgileri</li>
                      <li>• Sağlık durumu</li>
                      <li>• Geçmiş travmalar</li>
                      <li>• İletişim bilgileriniz</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-700 mb-3">Gizliliğin Kaldırılabileceği Durumlar:</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• <strong>Kendine zarar verme riski:</strong> İntihar riski veya ciddi self-harm durumları</li>
                  <li>• <strong>Başkalarına zarar verme riski:</strong> Üçüncü kişilere yönelik tehdit durumları</li>
                  <li>• <strong>Çocuk istismarı şüphesi:</strong> Yasal bildirme yükümlülüğü</li>
                  <li>• <strong>Mahkeme kararı:</strong> Yasal zorunluluk halinde</li>
                  <li>• <strong>Yazılı izniniz:</strong> Açık rızanız ile üçüncü kişilerle paylaşım</li>
                </ul>
                <p className="text-sm text-red-600 mt-3 italic">
                  Bu durumlar söz konusu olduğunda, mümkün olduğunca önceden sizinle konuşulur ve bilgi verilir.
                </p>
              </div>
            </div>

            {/* Veri Güvenliği */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">3. Veri Güvenliği ve Saklama</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-navy mb-3">Güvenlik Önlemleri:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-cream/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-navy mb-2">Fiziksel Güvenlik</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Kilitli dosya dolapları</li>
                      <li>• Güvenli ofis ortamı</li>
                      <li>• Sınırlı erişim kontrolü</li>
                      <li>• Güvenlik kameraları</li>
                    </ul>
                  </div>
                  <div className="bg-cream/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-navy mb-2">Dijital Güvenlik</h4>
                    <ul className="text-gray-700 text-sm space-y-1">
                      <li>• Şifreli veri saklama</li>
                      <li>• Güvenli sunucular</li>
                      <li>• Düzenli yedekleme</li>
                      <li>• Güncellenmiş güvenlik yazılımları</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-cream/30 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-navy mb-3">Saklama Süreleri:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Seans kayıtları:</strong> Minimum 10 yıl (TPD Yönetmeliği gereği)</li>
                  <li>• <strong>Psikolojik test sonuçları:</strong> 10 yıl</li>
                  <li>• <strong>İletişim kayıtları:</strong> Hizmet bitiminden sonra 5 yıl</li>
                  <li>• <strong>Mali kayıtlar:</strong> 5 yıl (vergi mevzuatı gereği)</li>
                </ul>
              </div>
            </div>

            {/* Online Hizmetler */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">4. Online Hizmetler ve İletişim</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-navy mb-3">Online Seans Gizliliği:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-gold mr-3">•</span>
                    Güvenli video konferans platformları kullanılır
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-3">•</span>
                    Uçtan uca şifreleme ile korunur
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-3">•</span>
                    Kayıt yapılmaz (özel durumlarda yazılı izin ile)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-3">•</span>
                    Güvenli internet bağlantısı önerilir
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-3">İletişim Kanalları:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Güvenli İletişim</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Profesyonel e-posta sistemi</li>
                      <li>• Güvenli mesajlaşma platformları</li>
                      <li>• Şifreli dosya paylaşımı</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">Dikkat Edilmesi Gerekenler</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• SMS ile hassas bilgi paylaşılmaz</li>
                      <li>• Sosyal medya üzerinden danışmanlık yapılmaz</li>
                      <li>• Acil durumlar için telefon tercih edilir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Aile Danışmanlığında Gizlilik */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">5. Aile ve Çift Danışmanlığında Gizlilik</h2>
              
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  Aile veya çift danışmanlığı sürecinde, tüm katılımcıların gizliliği eşit şekilde korunur:
                </p>
                
                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Ortak Seanslarda:</h3>
                  <ul className="space-y-2">
                    <li>• Tüm katılımcılar gizlilik kurallarından haberdar edilir</li>
                    <li>• Paylaşılan bilgiler tüm katılımcılar tarafından duyulur</li>
                    <li>• Bireysel paylaşımlar öncesinde izin alınır</li>
                    <li>• Seans dışında üçüncü kişilerle paylaşım yapılmaz</li>
                  </ul>
                </div>

                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Bireysel Seanslarda:</h3>
                  <ul className="space-y-2">
                    <li>• Bireysel seansda paylaşılan bilgiler gizli tutulur</li>
                    <li>• Eş/aile üyesi ile paylaşım için açık izin gerekir</li>
                    <li>• Çelişkili durumlar profesyonel etik kurallarla çözülür</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mesleki Etik */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">6. Mesleki Etik ve Denetim</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-3">Uyduğumuz Etik Kurallar:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-gold mr-3">•</span>
                      Türk Psikologlar Derneği Etik Yönetmeliği
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-3">•</span>
                      Amerikan Psikoloji Derneği (APA) Etik İlkeleri
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-3">•</span>
                      KVKK ve ilgili mevzuat
                    </li>
                    <li className="flex items-start">
                      <span className="text-gold mr-3">•</span>
                      Sağlık Bakanlığı düzenlemeleri
                    </li>
                  </ul>
                </div>

                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-navy mb-3">Sürekli Gelişim:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Düzenli mesleki gelişim eğitimleri</li>
                    <li>• Etik konularda sürekli eğitim</li>
                    <li>• Mesleki süpervizyon</li>
                    <li>• Güncel etik standartları takibi</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Şikayet ve İtiraz */}
            <div className="mb-12 p-8 bg-white rounded-2xl shadow-lg border border-gold/20">
              <h2 className="text-2xl font-display font-bold text-navy mb-6">7. Şikayet ve İtiraz Hakkı</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Gizlilik politikamız veya mesleki uygulamalarımız hakkında herhangi bir endişeniz varsa:
              </p>

              <div className="space-y-4">
                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">İç Başvuru:</h3>
                  <p className="text-gray-700 mb-2">Öncelikle doğrudan bizimle iletişime geçebilirsiniz:</p>
                  <ul className="text-gray-700 space-y-1">
                    <li>• E-posta: info@iremakkan.com</li>
                    <li>• Telefon: [Telefon numarası]</li>
                    <li>• Yazılı başvuru: [Ofis adresi]</li>
                  </ul>
                </div>

                <div className="bg-cream/30 p-6 rounded-xl">
                  <h3 className="font-semibold text-navy mb-3">Dış Başvuru:</h3>
                  <ul className="text-gray-700 space-y-2">
                    <li>• <strong>Türk Psikologlar Derneği</strong> - Etik kurulu</li>
                    <li>• <strong>Kişisel Verileri Koruma Kurulu</strong> - KVKK ihlalleri için</li>
                    <li>• <strong>Sağlık Bakanlığı</strong> - Mesleki uygulamalar için</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* İletişim */}
            <div className="p-8 bg-gradient-to-r from-navy/10 to-gold/10 rounded-2xl border border-gold/30">
              <h2 className="text-2xl font-display font-bold text-navy mb-4">İletişim</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>E-posta:</strong> info@iremakkan.com</p>
                <p><strong>Telefon:</strong> 0543 231 33 00</p>
                <p><strong>Ofis:</strong> [Ofis adresi]</p>
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