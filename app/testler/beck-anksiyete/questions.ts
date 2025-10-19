export interface Question {
  id: number
  text: string
  options: string[]
}

export const questions: Question[] = [
  { id: 1, text: "Bedeninizin herhangi bir yerinde uyuşma veya karıncalanma", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 2, text: "Sıcak/ateş basmaları", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 3, text: "Bacaklarda halsizlik, titreme", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 4, text: "Gevşeyememe", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 5, text: "Çok kötü şeyler olacak korkusu", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 6, text: "Baş dönmesi ve sersemlik", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 7, text: "Kalp çarpıntısı", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 8, text: "Dengeyi kaybetme duygusu", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 9, text: "Dehşete kapılma", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 10, text: "Sinirlilik", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 11, text: "Boğuluyormuş gibi olma duygusu", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 12, text: "Ellerde titreme", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 13, text: "Titreklik", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 14, text: "Kontrolü kaybetme korkusu", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 15, text: "Nefes almada güçlük", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 16, text: "Ölüm korkusu", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 17, text: "Korkuya kapılma", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 18, text: "Midede hazımsızlık yada rahatsızlık hissi", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 19, text: "Baygınlık", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 20, text: "Yüzün kızarması", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] },
  { id: 21, text: "Terleme (sıcağa bağlı olmayan)", options: ["Hiç", "Hafif Derecede", "Orta Derecede", "Ciddi derecede"] }
]

export const testInfo = {
  title: "Beck Anksiyete Ölçeği",
  description: "Beck Anksiyete Ölçeği, kaygı ve endişe belirtilerinin şiddetini ölçmek için kullanılan bir değerlendirme aracıdır. Bu test, bugün dahil son bir haftadır yaşadığınız kaygı belirtilerini değerlendirmenize yardımcı olur.",
  instructions: [
    "Son bir hafta içindeki durumunuzu düşünün",
    "Her belirti için size en uygun düzeyi seçin",
    "Belirtilerin sizi ne kadar rahatsız ettiğini değerlendirin",
    "Tüm soruları cevaplayın"
  ],
  disclaimer: "Testlerden elde edeceğiniz sonuçlar bir tanı ya da psikolojik değerlendirme değil, sadece ipuçları ve genel bir bilgi edinme amaçlı olarak ele alınmalıdır.",
  duration: "5-10 dakika"
}
