export interface Question {
  id: number
  text: string
  options: string[]
}

export const questions: Question[] = [
  {
    id: 1,
    text: "Bana bakan, benimle zaman geçiren, başıma gelen olaylarla gerçekten ilgilenen kimsem olmadı.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 2,
    text: "Beni terkedeceklerinden korktuğum için yakın olduğum insanların peşini bırakmam.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 3,
    text: "İnsanların beni kullandıklarını hissediyorum",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 4,
    text: "Uyumsuzum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 5,
    text: "Beğendiğim hiçbir erkek/kadın, kusurlarımı görürse beni sevmez.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 6,
    text: "İş (veya okul) hayatımda neredeyse hiçbir şeyi diğer insanlar kadar iyi yapamıyorum",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 7,
    text: "Günlük yaşamımı tek başıma idare edebilme becerisine sahip olduğumu hissetmiyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 8,
    text: "Kötü bir şey olacağı duygusundan kurtulamıyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 9,
    text: "Anne babamdan ayrılmayı, bağımsız hareket edebilmeyi, yaşıtlarım kadar, başaramadım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 10,
    text: "Eğer istediğimi yaparsam, başımı derde sokarım diye düşünürüm.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 11,
    text: "Genellikle yakınlarıma ilgi gösteren ve bakan ben olurum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 12,
    text: "Olumlu duygularımı diğerlerine göstermekten utanırım (sevdiğimi, önemsediğimi göstermek gibi).",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 13,
    text: "Yaptığım çoğu şeyde en iyi olmalıyım; ikinci olmayı kabullenemem.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 14,
    text: "Diğer insanlardan bir şeyler istediğimde bana \"hayır\" denilmesini çok zor kabullenirim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 15,
    text: "Kendimi sıradan ve sıkıcı işleri yapmaya zorlayamam.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 16,
    text: "Paramın olması ve önemli insanlar tanıyor olmak beni değerli yapar.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 17,
    text: "Her şey yolunda gidiyor görünse bile, bunun bozulacağını hissederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 18,
    text: "Eğer bir yanlış yaparsam, cezalandırılmayı hakkederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 19,
    text: "Çevremde bana sıcaklık, koruma ve duygusal yakınlık gösteren kimsem yok.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 20,
    text: "Diğer insanlara o kadar muhtacım ki onları kaybedeceğim diye çok endişeleniyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  // Soruları devam ettiriyorum (21-40)
  {
    id: 21,
    text: "İnsanlara karşı tedbiri elden bırakamam yoksa bana kasıtlı olarak zarar vereceklerini hissederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 22,
    text: "Temel olarak diğer insanlardan farklıyım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 23,
    text: "Gerçek beni tanırlarsa beğendiğim hiç kimse bana yakın olmak istemez.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 24,
    text: "İşleri halletmede son derece yetersizim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 25,
    text: "Gündelik işlerde kendimi başkalarına bağımlı biri olarak görüyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 26,
    text: "Her an bir felaket (doğal, adli, mali veya tıbbi) olabilir diye hissediyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 27,
    text: "Annem, babam ve ben birbirimizin hayatı ve sorunlarıyla aşırı ilgili olmaya eğilimliyiz.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 28,
    text: "Diğer insanların isteklerine uymaktan başka yolum yokmuş gibi hissediyorum; eğer böyle yapmazsam bir şekilde beni reddederler veya intikam alırlar.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 29,
    text: "Başkalarını kendimden daha fazla düşündüğüm için ben iyi bir insanım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 30,
    text: "Duygularımı diğerlerine açmayı utanç verici bulurum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 31,
    text: "En iyisini yapmalıyım, \"yeterince iyi\" ile yetinemem.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 32,
    text: "Ben özel biriyim ve diğer insanlar için konulmuş olan kısıtlamaları veya sınırları kabul etmek zorunda değilim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 33,
    text: "Eğer hedefime ulaşamazsam kolaylıkla yılgınlığa düşer ve vazgeçerim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 34,
    text: "Başkalarının da farkında olduğu başarılar benim için en değerlisidir.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 35,
    text: "İyi bir şey olursa, bunu kötü bir şeyin izleyeceğinden endişe ederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 36,
    text: "Eğer yanlış yaparsam, bunun özürü yoktur.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 37,
    text: "Birisi için özel olduğumu hiç hissetmedim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 38,
    text: "Yakınlarımın beni terk edeceği ya da ayrılacağından endişe duyarım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 39,
    text: "Herhangi bir anda birileri beni aldatmaya kalkışabilir.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 40,
    text: "Bir yere ait değilim, yalnızım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  // Devam ediyorum (41-60)
  {
    id: 41,
    text: "Başkalarının sevgisine, ilgisine ve saygısına değer bir insan değilim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 42,
    text: "İş ve başarı alanlarında birçok insan benden daha yeterli.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 43,
    text: "Doğru ile yanlışı birbirinden ayırmakta zorlanırım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 44,
    text: "Fiziksel bir saldırıya uğramaktan endişe duyarım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 45,
    text: "Annem, babam ve ben özel hayatımız birbirimizden saklarsak, birbirimizi aldatmış hisseder veya suçluluk duyarız",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 46,
    text: "İlişkilerimde, diğer kişinin yönlendirici olmasına izin veririm.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 47,
    text: "Yakınlarımla o kadar meşgulüm ki kendime çok az zaman kalıyor.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 48,
    text: "İnsanlarla beraberken içten ve cana yakın olmak benim için zordur.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 49,
    text: "Tüm sorumluluklarımı yerine getirmek zorundayım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 50,
    text: "İstediğimi yapmaktan alıkonulmaktan veya kısıtlanmaktan nefret ederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 51,
    text: "Uzun vadeli amaçlara ulaşabilmek için şu andaki zevklerimden fedakarlık etmekte zorlanırım",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 52,
    text: "Başkalarından yoğun bir ilgi görmezsem kendimi daha az önemli hissederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 53,
    text: "Yeterince dikkatli olmazsanız, neredeyse her zaman bir şeyler ters gider.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 54,
    text: "Eğer işimi doğru yapmazsam sonuçlara katlanmam gerekir.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 55,
    text: "Beni gerçekten dinleyen, anlayan veya benim gerçek ihtiyaçlarım ve duygularımı önemseyen kimsem olmadı.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 56,
    text: "Önem verdiğim birisinin benden uzaklaştığını sezersem çok kötü hissederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 57,
    text: "Diğer insanların niyetleriyle ilgili oldukça şüpheciyimdir.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 58,
    text: "Kendimi diğer insanlara uzak veya kopmuş hissediyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 59,
    text: "Kendimi sevilebilecek biri gibi hissetmiyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 60,
    text: "İş (okul) hayatımda diğer insanlar kadar yetenekli değilim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  // Son 30 soru (61-90)
  {
    id: 61,
    text: "Gündelik işler için benim kararlarıma güvenilemez.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 62,
    text: "Tüm paramı kaybedip çok fakir veya zavallı duruma düşmekten endişe duyarım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 63,
    text: "Çoğunlukla annem ve babamın benimle iç içe yaşadığını hissediyorum-Benim kendime ait bir hayatım yok.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 64,
    text: "Kendim için ne istediğimi bilmediğim için daima benim adıma diğer insanların karar vermesine izin veririm.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 65,
    text: "Ben hep başkalarının sorunlarını dinleyen kişi oldum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 66,
    text: "Kendimi o kadar kontrol ederim ki insanlar beni duygusuz veya hissiz bulurlar.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 67,
    text: "Başarmak ve bir şeyler yapmak için sürekli bir baskı altındayım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 68,
    text: "Diğer insanların uyduğu kurallara ve geleneklere uymak zorunda olmadığımı hissediyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 69,
    text: "Benim yararıma olduğunu bilsem bile hoşuma gitmeyen şeyleri yapmaya kendimi zorlayamam.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 70,
    text: "Bir toplantıda fikrimi söylediğimde veya bir topluluğa tanıtıldığımda onaylanılmayı ve takdir görmeyi isterim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 71,
    text: "Ne kadar çok çalışırsam çalışayım, maddi olarak iflas edeceğimden ve neredeyse her şeyimi kaybedeceğimden endişe ederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 72,
    text: "Neden yanlış yaptığımın önemi yoktur; eğer hata yaptıysam sonucuna da katlanmam gerekir.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 73,
    text: "Hayatımda ne yapacağımı bilmediğim zamanlarda uygun bir öneride bulunacak veya beni yönlendirecek kimsem olmadı.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 74,
    text: "İnsanların beni terk edeceği endişesiyle bazen onları kendimden uzaklaştırırım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 75,
    text: "Genellikle insanların asıl veya art niyetlerini araştırırım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 76,
    text: "Kendimi hep grupların dışında hissederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 77,
    text: "Kabul edilemeyecek pek çok özelliğim yüzünden insanlara kendimi açamıyorum veya beni tam olarak tanımalarına izin vermiyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 78,
    text: "İş (okul) hayatımda diğer insanlar kadar zeki değilim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 79,
    text: "Ortaya çıkan gündelik sorunları çözebilme konusunda kendime güvenmiyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 80,
    text: "Bir doktor tarafından herhangi bir ciddi hastalık bulunmamasına rağmen bende ciddi bir hastalığın gelişmekte olduğu endişesine kapılıyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 81,
    text: "Sık sık annemden babamdan ya da eşimden ayrı bir kimliğimin olmadığını hissediyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 82,
    text: "Haklarıma saygı duyulmasını ve duygularımın hesaba katılmasını istemekte çok zorlanıyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 83,
    text: "Başkaları beni, diğerleri için çok, kendim için az şey yapan biri olarak görüyorlar.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 84,
    text: "Diğerleri beni duygusal olarak soğuk bulurlar.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 85,
    text: "Kendimi sorumluluktan kolayca sıyıramıyorum veya hatalarım için gerekçe bulamıyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 86,
    text: "Benim yaptıklarımın, diğer insanların katkılarından daha önemli olduğunu hissediyorum.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 87,
    text: "Kararlarıma nadiren sadık kalabilirim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 88,
    text: "Bir dolu övgü ve iltifat almam kendimi değerli birisi olarak hissetmemi sağlar.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 89,
    text: "Yanlış bir kararın bir felakete yol açabileceğinden endişe ederim.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  },
  {
    id: 90,
    text: "Ben cezalandırılmayı hakeden kötü bir insanım.",
    options: [
      "Beni mükemmel şekilde tanımlıyor",
      "Benim için çoğunlukla doğru",
      "Benim için orta derecede doğru",
      "Bana uyan tarafı uymayan tarafından biraz fazla",
      "Benim için büyük ölçüde yanlış",
      "Benim için tamamıyla yanlış"
    ]
  }
]
