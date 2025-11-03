// schemas/blogPage.js

const blogPage = {
  name: "blogPage",
  title: "Blog & İçerikler Sayfası",
  type: "document",
  // Bu document'tan sadece bir tane olmasını sağlamak için:
  // __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: "heroTitle",
      title: "Hero Başlığı",
      description: "Ana başlık. Renkli kelime için ** arasına alın. Örn: Psikoloji ve **Yaşam**",
      type: "string",
    },
    {
      name: "heroDescription",
      title: "Hero Açıklaması",
      type: "text",
    },
    {
      name: "features", // 'categories' post kategorileriyle karışmasın diye 'features' olarak adlandırdım
      title: "Öne Çıkan Özellik Kartları",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "İkon (emoji)", type: "string" },
            { name: "title", title: "Başlık", type: "string" },
            { name: "desc", title: "Açıklama", type: "string" },
          ],
        },
      ],
    },
    {
      name: "categorySectionTitle",
      title: "Kategori Bölümü Başlığı",
      description: "Renkli kelime için ** arasına alın. Örn: İlgi Alanınıza Göre **Keşfedin**",
      type: "string",
    },
    // Diğer SEO ve CTA alanları buraya gelebilir...
  ],
}

export default blogPage;