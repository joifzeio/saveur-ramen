import Link from "next/link";
import Navbar from "@/components/Navbar";

const heroImage = "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1920&q=80"; // Ramen bowl

const blogPostsData = {
  "flavor-harmony": {
    title: "L’Art du Bouillon : Pourquoi Nos Ramens Sont Uniques",
    date: "10 Mars 2026",
    sections: [
      {
        heading: "Un Bouillon Mijôté avec Amour",
        content: `Chez Saveurs Ramen, tout commence par le bouillon. Préparé chaque matin pendant des heures avant l’ouverture, il est la colonne vertébrale de chaque bol que nous servons. Ce n’est pas simplement de la soupe — c’est le résultat d’une passion transmise, d’une technique maîtrisée, et d’ingrédients soigneusement sélectionnés.`,
      },
      {
        heading: "Des Ingrédients Sélectionnés Chaque Jour",
        content: `Nous nous approvisionnons quotidiennement en ingrédients frais — des crevettes pour l’Ebiage, du boeuf pour le Gyukotsushio, des légumes de saison pour notre ramen végétalien. Chaque élément du bol est pensé pour complémenter le bouillon et offrir une expérience gustative complète.\n\nC’est cette attention au détail, associée à l’amour du travail bien fait, qui explique notre note de 4,7/5 sur Google. Quand vous mangez chez nous, vous sentez que chaque bol a été préparé pour vous.`,
      },
      {
        heading: "L’Authenticité Japonaise à Rennes",
        content: `Notre cuisine s’inspire des traditions ramen japonaises tout en restant accessible et chaleureuse. Pas de chichi — juste de bons produits, bien préparés, dans une ambiance qui donne envie de rester. C’est ce que signifie « Saveurs Ramen ».`,
      },
    ],
  },
  "culinary-craftsmanship": {
    title: "Gyoza, Karaage, Takoyaki : Nos Tapas Japonais à L’Honneur",
    date: "25 Fév 2026",
    sections: [
      {
        heading: "La Culture des Tapas Japonais",
        content: `Au Japon, manger est avant tout un acte social. On partage, on goûte, on découvre. C’est dans cet esprit que nous avons conçu notre sélection de tapas — de petites assiettes pour explorer les saveurs japonaises ensemble.`,
      },
      {
        heading: "Nos Inévitables",
        content: `Les Gyoza — poulet ou légumes — sont croustillants à l’extérieur, fondants à l’intérieur. Le Tori Karaage, poulet frit à la japonaise, est croquant et juteux à souhait. Et les Takoyaki, ces boulettes de poulpe, délicieusement moelleuses sous leur sauce.\n\nChaque bouchee est une invitation au voyage. Partagez-les autour d’un ramen pour une expérience complète.`,
      },
      {
        heading: "Pour Tous les Goûts",
        content: `Que vous soyez carnivore, végétarien ou simplement curieux, notre carte de tapas a quelque chose pour vous. La Salade d’Algues, les Edamé, l’Ebi Tempura... chaque assiette est une invite à la découverte.`,
      },
    ],
  },
  "game-day-experience": {
    title: "L’Ambiance Saveurs Ramen : Un Bout du Japon à Rennes",
    date: "11 Fév 2026",
    sections: [
      {
        heading: "Une Déco Pensée pour l’Expérience",
        content: `Dès qu’on pousse la porte, on est transporté. Plafond en bois avec des guirlandes blanches, murs gris foncé ornés de calligraphie japonaise, lumière chaleureuse... L’intérieur de Saveurs Ramen est un écrin moderne et chaleureux pensé pour que vous passiez un bon moment.`,
      },
      {
        heading: "Gare Sud, le Bon Plan Rennais",
        content: `Situé juste derrière la gare de Rennes, au 9 Rue de Châtillon, nous sommes facilement accessibles que vous arriviez en train, à pied ou à vélo. Un déjeuner avant de prendre le train ? Un dîner en famille ? On est là.\n\nNotre restaurant accueille aussi bien les repas entre amis, les pauses méridiens en solo, ou les sorties en famille. L’ambiance est toujours détendue, souriante et accueillante.`,
      },
      {
        heading: "Ce Que Nos Clients Disent",
        content: `« Un nouveau spot ramen à Rennes. Ambiance premium par rapport aux autres, excellent service. »\n« La meilleure adresse de Rennes ! À essayer absolument. »\n« Super nourriture, service aimable et utile, et une vraie atmosphère de restaurant japonais. 10/10 »`,
      },
    ],
  },
  "signature-dishes": {
    title: "Notre Sélection de Ramens : Quel Bol Est Fait Pour Vous ?",
    date: "31 Jan 2026",
    sections: [
      {
        heading: "Le Miso : Le Classique",
        content: `Notre Miso (15,90€) est la porte d’entrée parfaite dans l’univers du ramen. Bouillon miso riche, porc chashu fondant, oeuf mariné, bambou, épinards, maïs et germes de soja. Un bol complet, équilibré, réconfortant.`,
      },
      {
        heading: "L’Ebiage : Pour les Amateurs de Fruits de Mer",
        content: `L’Ebiage (18,90€) est notre ramen aux crevettes. Bouillon artisanal préparé chaque jour avec des produits frais, il offre une saveur délicate et profonde qui plaira aux palais les plus exigeants.\n\nC’est l’un de nos best-sellers — une fois qu’on y goûte, on y revient toujours.`,
      },
      {
        heading: "Végétalien : Rien ne Manque",
        content: `Notre Ramen Végétalien (13,90€) prouve qu’on peut se régaler sans produits animaux. Tofu frit, légumes de saison, bambou mariné, soja grillet́, nori... base lait de soja. Un bol savoureux et généreux qui convient à tous.`,
      },
    ],
  },
  "beyond-food": {
    title: "Saveurs Ramen : Bien Plus Qu’Un Restaurant",
    date: "28 Jan 2026",
    sections: [
      {
        heading: "Un Lieu de Vie",
        content: `Saveurs Ramen, c’est une adresse où l’on se retrouve. Pour un déjeuner rapide, un dîner entre amis, un repas en famille ou un moment de pause dans une journée chargée. Notre équipe chaleureuse fait tout pour que vous vous sentiez bien dès la première seconde.`,
      },
      {
        heading: "L’Ambiance Familiale au Coeur de Notre Identité",
        content: `Notre Instagram dit tout : « Ramen artisanaux, bouillons mijôtés avec amour pendant des heures, saveurs uniques et ambiance familiale. » Ce n’est pas qu’un slogan — c’est notre quotidien.\n\nChaque jour, notre équipe se leve tôt pour que vos bols soient prêts à l’heure du déjeuner. Parce qu’un bon ramen, ça commence bien avant l’ouverture.`,
      },
      {
        heading: "Venez Nous Rendre Visite",
        content: `9 Rue de Châtillon, Rennes (Gare Sud). Ouvert tous les jours : 11h30–14h30 et 18h30–22h30. Réservations acceptées. Nous vous attendons avec impatience !`,
      },
    ],
  },
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPostsData[slug as keyof typeof blogPostsData];

  if (!post) {
    return (
      <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px] flex items-center justify-center">
        <div className="text-center px-[16px]">
          <h1 className="font-[var(--font-forum)] text-[32px] md:text-[40px] lg:text-[48px] text-[#efe7d2] mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-[#efe7d2] underline text-[14px] md:text-[16px]">
            Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#0a0b0a] min-h-screen p-[12px] md:p-[24px]">
      <div className="flex flex-col lg:flex-row gap-[12px] md:gap-[16px] h-auto lg:h-[calc(100vh-48px)]">
        {/* Left Hero Image */}
        <div className="flex-1 bg-black rounded-[16px] overflow-hidden relative min-h-[400px] lg:min-h-0">
          <img
            src={heroImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <Navbar />
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col gap-[12px] md:gap-[16px] self-stretch overflow-y-auto">
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex-1 flex flex-col gap-[48px] md:gap-[64px] lg:gap-[80px] py-[32px] md:py-[60px] lg:py-[80px] px-[24px] md:px-[48px] lg:px-[96px]">
            {/* Header */}
            <div className="flex flex-col gap-[12px] md:gap-[16px] items-center justify-center w-full">
              {/* Date */}
              <div className="flex gap-[12px] md:gap-[16px] items-center justify-center w-full">
                <div className="hidden sm:flex items-center justify-center py-[7px]">
                  <div className="flex items-center justify-center rotate-45">
                    <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                  </div>
                  <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
                </div>
                <p className="text-[11px] md:text-[12px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.3] text-center">
                  {post.date}
                </p>
                <div className="hidden sm:flex items-center justify-center py-[7px]">
                  <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
                  <div className="flex items-center justify-center rotate-45">
                    <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-[var(--font-forum)] text-[32px] md:text-[48px] lg:text-[64px] tracking-[1px] uppercase text-[#efe7d2] leading-[1.1] text-center w-full px-[8px]">
                {post.title}
              </h1>

              {/* Bottom Divider */}
              <div className="flex items-center justify-center py-[7px]">
                <div className="flex items-center justify-center rotate-45">
                  <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                </div>
                <div className="bg-[rgba(239,231,210,0.15)] h-px w-[20px]" />
                <div className="flex items-center justify-center rotate-45">
                  <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="flex flex-col gap-[32px] md:gap-[40px] lg:gap-[48px] w-full">
              {post.sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-[12px] md:gap-[16px] w-full">
                  <h2 className="font-[var(--font-forum)] text-[24px] md:text-[28px] lg:text-[32px] tracking-[1px] uppercase text-[#efe7d2] leading-none">
                    {section.heading}
                  </h2>
                  <div className="text-[14px] md:text-[15px] lg:text-[16px] leading-[1.8] text-[rgba(245,242,234,0.7)] font-light whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border border-[rgba(239,231,210,0.15)] rounded-[16px] flex items-center justify-center py-[20px] px-[16px] md:px-[24px]">
            <div className="flex flex-wrap gap-[12px] md:gap-[16px] items-center justify-center">
              <Link href="/blog" className="text-[#efe7d2] text-[13px] md:text-[14px] font-light leading-[1.5] hover:underline whitespace-nowrap">
                ← Back to Blog
              </Link>
              <div className="hidden sm:flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
              <p className="text-[#efe7d2] text-[13px] md:text-[14px] font-light leading-[1.5] text-center">
                Saveurs Ramen
              </p>
              <div className="flex items-center justify-center rotate-45">
                <div className="border border-[rgba(239,231,210,0.15)] w-[8px] h-[8px]" />
              </div>
              <p className="text-[#efe7d2] text-[13px] md:text-[14px] font-light leading-[1.5]">
                2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
