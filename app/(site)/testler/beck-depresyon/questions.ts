export interface Question {
  id: number
  text: string
  options: string[]
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Kendimi üzüntülü ve sıkıntılı hissetmiyorum.",
      "Kendimi üzüntülü ve sıkıntılı hissediyorum.",
      "Hep üzüntülü ve sıkıntılıyım. Bundan kurtulamıyorum.",
      "Öylesine üzgün ve mutsuzum ki, dayanamıyorum."
    ]
  },
  {
    id: 2,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Gelecek hakkında mutsuz ve karamsar değilim.",
      "Gelecek hakkında karamsarım",
      "Gelecekten beklediğim hiçbir şey yok.",
      "Geleceğim hakkında umutsuzum ve sanki hiçbir şey düzelmeyecekmiş gibi geliyor."
    ]
  },
  {
    id: 3,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Kendimi başarısız bir insan olarak görmüyorum.",
      "Çevremdeki birçok kişiden daha çok başarısızlıklarım olmuş gibi hissediyorum.",
      "Geçmişime baktığımda başarısızlıklarla dolu olduğunu görüyorum.",
      "Kendimi tümüyle başarısız biri olarak görüyorum."
    ]
  },
  {
    id: 4,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Birçok şeyden eskisi kadar zevk alıyorum.",
      "Eskiden olduğu gibi her şeyden hoşlanmıyorum",
      "Artık hiçbir şey bana tam anlamıyla zevk vermiyor.",
      "Her şeyden sıkılıyorum."
    ]
  },
  {
    id: 5,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Kendimi herhangi bir şekilde suçlu hissetmiyorum.",
      "Kendimi zaman zaman suçlu hissediyorum.",
      "Çoğu zaman kendimi suçlu hissediyorum.",
      "Kendimi her zaman suçlu hissediyorum."
    ]
  },
  {
    id: 6,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Bana cezalandırılmışım gibi gelmiyor.",
      "Cezalandırılabileceğimi hissediyorum.",
      "Cezalandırılmayı bekliyorum.",
      "Cezalandırılmış hissediyorum."
    ]
  },
  {
    id: 7,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Kendimden memnunum.",
      "Kendi kendimden pek memnun değilim.",
      "Kendime çok kızıyorum.",
      "Kendimden nefret ediyorum."
    ]
  },
  {
    id: 8,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Başkalarından daha kötü olduğumu sanmıyorum.",
      "Zayıf yanlarım veya hatalarım için kendi kendimi eleştiririm.",
      "Hatalarımdan dolayı her zaman kendimi kabahatli bulurum.",
      "Her aksilik karşısında kendimi hatalı bulurum."
    ]
  },
  {
    id: 9,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Kendimi öldürmek gibi düşüncelerim yok.",
      "Zaman zaman kendimi öldürmeyi düşündüğüm olur. Fakat yapmıyorum.",
      "Kendimi öldürmek isterdim.",
      "Fırsatını bulsam kendimi öldürürdüm."
    ]
  },
  {
    id: 10,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Her zamankinden fazla içimden ağlamak gelmiyor.",
      "Zaman zaman içindem ağlamak geliyor.",
      "Çoğu zaman ağlıyorum.",
      "Eskiden ağlayabilirdim şimdi istesem de ağlayamıyorum."
    ]
  },
  {
    id: 11,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Şimdi her zaman olduğumdan daha sinirli değilim.",
      "Eskisine kıyasla daha kolay kızıyor ya da sinirleniyorum.",
      "Şimdi hep sinirliyim.",
      "Bir zamanlar beni sinirlendiren şeyler şimdi hiç sinirlendirmiyor."
    ]
  },
  {
    id: 12,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Başkaları ile görüşmek, konuşmak isteğimi kaybetmedim.",
      "Başkaları ile eskiden daha az konuşmak, görüşmek istiyorum.",
      "Başkaları ile konuşma ve görüşme isteğimi kaybettim",
      "Hiç kimseyle konuşmak görüşmek istemiyorum."
    ]
  },
  {
    id: 13,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Eskiden olduğu gibi kolay karar verebiliyorum.",
      "Eskiden olduğu kadar kolay karar veremiyorum.",
      "Karar verirken eskisine kıyasla çok güçlük çekiyorum.",
      "Artık hiç karar veremiyorum."
    ]
  },
  {
    id: 14,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Aynada kendime baktığımda değişiklik görmüyorum.",
      "Daha yaşlanmış ve çirkinleşmişim gibi geliyor.",
      "Görünüşümün çok değiştiğini ve çirkinleştiğimi hissediyorum.",
      "Kendimi çok çirkin buluyorum."
    ]
  },
  {
    id: 15,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Eskisi kadar iyi çalışabiliyorum.",
      "Bir şeyler yapabilmek için gayret göstermem gerekiyor.",
      "Herhangi bir şeyi yapabilmek için kendimi çok zorlamam gerekiyor.",
      "Hiçbir şey yapamıyorum."
    ]
  },
  {
    id: 16,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Her zamanki gibi iyi uyuyabiliyorum.",
      "Eskiden olduğu gibi iyi uyuyamıyorum",
      "Her zamankinden 1-2 saat daha erken uyanıyorum ve tekrar uyuyamıyorum.",
      "Her zamankinden çok daha erken uyanıyor ve tekrar uyuyamıyorum."
    ]
  },
  {
    id: 17,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Her zamankinden daha çabuk yorulmuyorum.",
      "Her zamankinden daha çabuk yoruluyorum.",
      "Yaptığım her şey beni yoruyor.",
      "Kendimi hemen hiçbir şey yapamayacak kadar yorgun hissediyorum."
    ]
  },
  {
    id: 18,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "İştahım her zamanki gibi.",
      "İştahım her zamanki kadar iyi değil.",
      "İştahım çok azaldı.",
      "Artık hiç iştahım yok."
    ]
  },
  {
    id: 19,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Son zamanlarda kilo vermedim.",
      "İki kilodan fazla kilo verdim",
      "Dört kilodan fazla kilo verdim.",
      "AltI kilodan fazla kilo verdim"
    ]
  },
  {
    id: 20,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Sağlığım beni fazla endişelendirmiyor.",
      "Ağrı, sancı, mide bozukluğu veya kabızlık gibi rahatsızlıklar beni endişelendirmiyor.",
      "Sağlığım beni endişelendirdiği için başka şeyleri düşünmek zorlaşıyor.",
      "Sağlığım hakkında o kadar endişeliyim ki başka hiçbir şey düşünemiyorum."
    ]
  },
  {
    id: 21,
    text: "Bugün dahil olmak üzere son bir hafta içerisindeki kendi durumunuzu düşünerek aşağıdaki seçeneklerden size en uygun olan ifadeyi seçiniz.",
    options: [
      "Son zamanlarda cinsel konulara olan ilgimde bir değişme fark etmedim.",
      "Cinsel konularla eskisinden daha az ilgiliyim.",
      "Cinsel konularla şimdi çok daha az ilgiliyim.",
      "Cinsel konular olan ilgimi tamamen kaybettim."
    ]
  }
]

export const testInfo = {
  title: "Beck Depresyon Envanteri",
  description: "Beck Depresyon Envanteri, depresyon belirtilerinin şiddetini ölçmek için kullanılan bir değerlendirme aracıdır. Bu test, son bir hafta içinde yaşadığınız duygusal ve fiziksel belirtileri değerlendirmenize yardımcı olur.",
  instructions: [
    "Son bir hafta içindeki durumunuzu düşünün",
    "Her soru için size en uygun ifadeyi seçin",
    "İlk aklınıza gelen cevabı verin",
    "Tüm soruları cevaplayın"
  ],
  disclaimer: "Testlerden elde edeceğiniz sonuçlar bir tanı ya da psikolojik değerlendirme değil, sadece ipuçları ve genel bir bilgi edinme amaçlı olarak ele alınmalıdır.",
  duration: "10-15 dakika"
}
