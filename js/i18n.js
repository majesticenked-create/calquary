/* ============================================================
   Calquary — internationalization data (wave one: es, fr, de)
   Single source of truth stays js/calculators-data.js — nothing here
   forks the compute logic, field schema, or English content. This file
   only layers translated STRINGS on top, keyed by locale, with English
   as the implicit fallback wherever a key is missing (a calculator not
   yet in I18N_TOOLS simply doesn't get a localized page built for it —
   see build.js's WAVE_ONE_TOOL_IDS).

   Scope note (wave one, deliberate): the calculator FORM itself (field
   labels, units, input placeholders) stays English across all locales.
   Translating "cubic yards" or "Mifflin-St Jeor" field-by-field risks
   silently introducing a wrong unit or formula label — worse than an
   English fallback, per the standing instruction on this task. What IS
   translated (title, intro, meta description, FAQ) is exactly the
   static prose Google indexes, which is the actual SEO surface area of
   "wave one" — and it's baked statically into each locale's HTML at
   build time, not swapped in by client-side JS (see build.js).
   ============================================================ */

const LOCALES = ["es", "fr", "de"];

const LOCALE_NAMES = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

const I18N_UI = {
  es: {
    catSuffix: "Calculadoras",
    nav: { categories: "Categorías", allTools: "Todas las herramientas", about: "Acerca de" },
    footer: {
      categoriesHeader: "Categorías",
      popularHeader: "Popular",
      siteHeader: "Sitio",
      allCategories: "Todas las categorías",
      allTools: "Todas las herramientas",
      allCalculators: "Todas las calculadoras",
      about: "Acerca de",
      contact: "Contacto",
      privacy: "Privacidad",
      terms: "Términos",
      tagline: "Un índice de referencia de calculadoras rápidas y precisas, creado para quienes solo necesitan la respuesta.",
      copyright: "© 2026 Calquary. Las calculadoras se ofrecen con fines informativos y no sustituyen el asesoramiento profesional.",
    },
    buttons: {
      findIt: "Buscar",
      browseAll: "Ver todas →",
      calculate: "Calcular",
      reset: "Reiniciar",
      backToAll: "← Volver a todas las calculadoras",
    },
    labels: {
      relatedTools: "Herramientas relacionadas",
      accuracyTitle: "Nota sobre precisión",
      accuracyText: "Las calculadoras de Calquary están diseñadas para ofrecer estimaciones rápidas y fiables. Para decisiones con implicaciones financieras, estructurales o médicas reales, consulta con un profesional cualificado.",
      lastUpdated: "Última actualización:",
      faqTitle: "Preguntas frecuentes",
      titleSuffix: "Calculadora Gratis Online",
      breadcrumbHome: "Calquary",
    },
    hero: {
      eyebrow: "Índice de referencia · calculadoras para todo",
      h1: "Encuentra la calculadora exacta que necesitas - rápido.",
      lede: "Calquary organiza las calculadoras como una buena biblioteca de referencia organiza los libros: por tema, con respuestas claras y sin distracciones. Matemáticas, dinero, proyectos del hogar, salud y más.",
      statLabel: "calculadoras disponibles y en aumento",
      lookupTag: "BUSCAR",
      placeholder: "Prueba 'concreto', 'IMC', 'préstamo'...",
      hint: "O explora por categoría a continuación.",
    },
    sections: {
      browseKicker: "Explorar",
      browseH2: "Cada categoría, su propio estante",
      popularKicker: "Popular ahora",
      popularH2: "Herramientas destacadas",
      recentKicker: "Recién añadido",
      recentH2: "Añadido recientemente",
      faqKicker: "Para saber más",
      faqH2: "Preguntas frecuentes",
    },
    homeFaq: [
      { q: "¿Qué es Calquary?", a: "Calquary es un índice de referencia de calculadoras rápidas y precisas, organizadas por tema como en una biblioteca, en lugar de estar dispersas entre anuncios y contenido no relacionado. Elige una categoría, abre una herramienta y obtén tu respuesta." },
      { q: "¿Son gratuitas estas calculadoras?", a: "Sí: todas las calculadoras de Calquary son gratuitas, sin necesidad de cuenta, registro ni pago. Simplemente abre una herramienta y úsala." },
      { q: "¿Qué tan precisas son las calculadoras de Calquary?", a: "Cada calculadora utiliza una fórmula estándar y verificada para su categoría, y cada herramienta se comprueba con resultados calculados a mano antes de publicarse. Para decisiones con implicaciones financieras, estructurales o médicas reales, consulta con un profesional cualificado." },
      { q: "¿Guardáis alguno de mis datos?", a: "No: todas las calculadoras funcionan enteramente en tu navegador. Los números que introduces nunca se envían a un servidor ni se almacenan; al cerrar la pestaña, todo se borra." },
      { q: "¿Cuántas calculadoras tiene Calquary?", a: 'Actualmente, Calquary tiene <span id="faq-tool-count">—</span> calculadoras en 8 categorías, y el catálogo sigue creciendo.' },
      { q: "¿Con qué frecuencia se añaden nuevas calculadoras?", a: "No hay un calendario fijo, pero el catálogo ha crecido de forma constante desde el lanzamiento: se añaden nuevas calculadoras por lotes según la categoría, cada una construida y verificada antes de publicarse." },
    ],
  },

  fr: {
    catSuffix: "Calculatrices",
    nav: { categories: "Catégories", allTools: "Tous les outils", about: "À propos" },
    footer: {
      categoriesHeader: "Catégories",
      popularHeader: "Populaire",
      siteHeader: "Site",
      allCategories: "Toutes les catégories",
      allTools: "Tous les outils",
      allCalculators: "Toutes les calculatrices",
      about: "À propos",
      contact: "Contact",
      privacy: "Confidentialité",
      terms: "Conditions",
      tagline: "Un index de référence de calculatrices rapides et précises, conçu pour ceux qui veulent simplement la réponse.",
      copyright: "© 2026 Calquary. Les calculatrices sont fournies à titre informatif et ne remplacent pas un avis professionnel.",
    },
    buttons: {
      findIt: "Rechercher",
      browseAll: "Tout voir →",
      calculate: "Calculer",
      reset: "Réinitialiser",
      backToAll: "← Retour à toutes les calculatrices",
    },
    labels: {
      relatedTools: "Outils associés",
      accuracyTitle: "Remarque sur la précision",
      accuracyText: "Les calculatrices de Calquary sont conçues pour fournir des estimations rapides et fiables. Pour toute décision ayant de réelles conséquences financières, structurelles ou médicales, consultez un professionnel qualifié.",
      lastUpdated: "Dernière mise à jour :",
      faqTitle: "Questions fréquentes",
      titleSuffix: "Calculatrice Gratuite en Ligne",
      breadcrumbHome: "Calquary",
    },
    hero: {
      eyebrow: "Index de référence · des calculatrices pour tout",
      h1: "Trouvez exactement la calculatrice qu'il vous faut - rapidement.",
      lede: "Calquary organise les calculatrices comme une bonne bibliothèque de référence organise les livres : par sujet, avec des réponses claires et sans superflu. Mathématiques, argent, travaux, santé, et plus encore.",
      statLabel: "calculatrices disponibles, et ça continue",
      lookupTag: "RECHERCHE",
      placeholder: "Essayez « béton », « IMC », « prêt »...",
      hint: "Ou parcourez les catégories ci-dessous.",
    },
    sections: {
      browseKicker: "Parcourir",
      browseH2: "Chaque catégorie, son propre rayon",
      popularKicker: "Populaire en ce moment",
      popularH2: "Outils à la une",
      recentKicker: "Ajouté récemment",
      recentH2: "Ajouts récents",
      faqKicker: "Bon à savoir",
      faqH2: "Questions fréquentes",
    },
    homeFaq: [
      { q: "Qu'est-ce que Calquary ?", a: "Calquary est un index de référence de calculatrices rapides et précises, organisées par sujet comme dans une bibliothèque, plutôt qu'éparpillées entre publicités et contenus sans rapport. Choisissez une catégorie, ouvrez un outil, obtenez votre réponse." },
      { q: "Ces calculatrices sont-elles gratuites ?", a: "Oui - chaque calculatrice de Calquary est gratuite, sans compte, ni inscription, ni paiement. Ouvrez simplement un outil et utilisez-le." },
      { q: "Quelle est la précision des calculatrices de Calquary ?", a: "Chaque calculatrice utilise une formule standard et vérifiée pour sa catégorie, et chaque outil est contrôlé par rapport à des résultats calculés à la main avant sa publication. Pour toute décision ayant de réelles conséquences financières, structurelles ou médicales, consultez un professionnel qualifié." },
      { q: "Conservez-vous mes données ?", a: "Non - chaque calculatrice fonctionne entièrement dans votre navigateur. Les chiffres que vous saisissez ne sont jamais envoyés à un serveur ni stockés ; fermer l'onglet efface tout." },
      { q: "Combien de calculatrices Calquary propose-t-il ?", a: 'À ce jour, Calquary compte <span id="faq-tool-count">—</span> calculatrices réparties en 8 catégories, et le catalogue continue de s\'agrandir.' },
      { q: "À quelle fréquence de nouvelles calculatrices sont-elles ajoutées ?", a: "Il n'y a pas de calendrier fixe, mais le catalogue s'est étoffé régulièrement depuis le lancement - de nouvelles calculatrices sont ajoutées par lots selon la catégorie, chacune construite et vérifiée avant sa publication." },
    ],
  },

  de: {
    catSuffix: "Rechner",
    nav: { categories: "Kategorien", allTools: "Alle Tools", about: "Über uns" },
    footer: {
      categoriesHeader: "Kategorien",
      popularHeader: "Beliebt",
      siteHeader: "Website",
      allCategories: "Alle Kategorien",
      allTools: "Alle Tools",
      allCalculators: "Alle Rechner",
      about: "Über uns",
      contact: "Kontakt",
      privacy: "Datenschutz",
      terms: "Nutzungsbedingungen",
      tagline: "Ein Referenzindex schneller, präziser Rechner - für alle, die einfach nur die Antwort brauchen.",
      copyright: "© 2026 Calquary. Die Rechner dienen nur zu Informationszwecken und ersetzen keine professionelle Beratung.",
    },
    buttons: {
      findIt: "Suchen",
      browseAll: "Alle ansehen →",
      calculate: "Berechnen",
      reset: "Zurücksetzen",
      backToAll: "← Zurück zu allen Rechnern",
    },
    labels: {
      relatedTools: "Ähnliche Rechner",
      accuracyTitle: "Hinweis zur Genauigkeit",
      accuracyText: "Die Rechner von Calquary sind für schnelle, zuverlässige Schätzungen ausgelegt. Bei Entscheidungen mit echten finanziellen, baulichen oder medizinischen Konsequenzen wenden Sie sich bitte an eine qualifizierte Fachperson.",
      lastUpdated: "Zuletzt aktualisiert:",
      faqTitle: "Häufig gestellte Fragen",
      titleSuffix: "Kostenloser Online-Rechner",
      breadcrumbHome: "Calquary",
    },
    hero: {
      eyebrow: "Referenzindex · Rechner für alles",
      h1: "Finden Sie genau den Rechner, den Sie brauchen - schnell.",
      lede: "Calquary organisiert Rechner wie eine gute Nachschlagebibliothek ihre Bücher: nach Thema, mit klaren Antworten und ohne Ablenkung. Mathematik, Geld, Hausprojekte, Gesundheit und mehr.",
      statLabel: "Rechner verfügbar, Tendenz steigend",
      lookupTag: "SUCHE",
      placeholder: "Versuchen Sie „Beton“, „BMI“, „Kredit“ ...",
      hint: "Oder unten nach Kategorie stöbern.",
    },
    sections: {
      browseKicker: "Durchsuchen",
      browseH2: "Jede Kategorie, ihr eigenes Regal",
      popularKicker: "Gerade beliebt",
      popularH2: "Empfohlene Rechner",
      recentKicker: "Neu hinzugefügt",
      recentH2: "Kürzlich hinzugefügt",
      faqKicker: "Gut zu wissen",
      faqH2: "Häufig gestellte Fragen",
    },
    homeFaq: [
      { q: "Was ist Calquary?", a: "Calquary ist ein Referenzindex schneller, präziser Rechner, thematisch geordnet wie in einer Bibliothek - statt verstreut zwischen Anzeigen und themenfremden Inhalten. Kategorie wählen, Tool öffnen, Antwort erhalten." },
      { q: "Sind diese Rechner kostenlos nutzbar?", a: "Ja - jeder Rechner auf Calquary ist kostenlos, ohne Konto, Anmeldung oder Bezahlschranke. Einfach ein Tool öffnen und nutzen." },
      { q: "Wie genau sind die Rechner von Calquary?", a: "Jeder Rechner verwendet eine standardisierte, geprüfte Formel für seine Kategorie, und jedes Tool wird vor der Veröffentlichung anhand von Hand berechneter Ergebnisse überprüft. Bei Entscheidungen mit echten finanziellen, baulichen oder medizinischen Konsequenzen wenden Sie sich bitte an eine qualifizierte Fachperson." },
      { q: "Speichert ihr meine Daten?", a: "Nein - jeder Rechner läuft vollständig in Ihrem Browser. Die eingegebenen Zahlen werden nie an einen Server gesendet oder gespeichert; beim Schließen des Tabs wird alles gelöscht." },
      { q: "Wie viele Rechner hat Calquary?", a: 'Aktuell hat Calquary <span id="faq-tool-count">—</span> Rechner in 8 Kategorien, und der Katalog wächst stetig weiter.' },
      { q: "Wie oft werden neue Rechner hinzugefügt?", a: "Es gibt keinen festen Zeitplan, aber der Katalog ist seit dem Start stetig gewachsen - neue Rechner werden kategorieweise in Gruppen hinzugefügt, jeder einzelne gebaut und geprüft, bevor er veröffentlicht wird." },
    ],
  },

  pt: {
    catSuffix: "Calculadoras",
    nav: { categories: "Categorias", allTools: "Todas as ferramentas", about: "Sobre" },
    footer: {
      categoriesHeader: "Categorias",
      popularHeader: "Populares",
      siteHeader: "Site",
      allCategories: "Todas as categorias",
      allTools: "Todas as ferramentas",
      allCalculators: "Todas as calculadoras",
      about: "Sobre",
      contact: "Contato",
      privacy: "Privacidade",
      terms: "Termos",
      tagline: "Um índice de referência de calculadoras rápidas e precisas - feito para quem só precisa da resposta.",
      copyright: "© 2026 Calquary. As calculadoras são fornecidas para fins informativos e não substituem o aconselhamento profissional.",
    },
    buttons: {
      findIt: "Buscar",
      browseAll: "Ver todas →",
      calculate: "Calcular",
      reset: "Redefinir",
      backToAll: "← Voltar a todas as calculadoras",
    },
    labels: {
      relatedTools: "Ferramentas relacionadas",
      accuracyTitle: "Nota sobre precisão",
      accuracyText: "As calculadoras da Calquary são feitas para estimativas rápidas e confiáveis. Para decisões com implicações financeiras, estruturais ou médicas reais, consulte um profissional qualificado.",
      lastUpdated: "Última atualização:",
      faqTitle: "Perguntas frequentes",
      titleSuffix: "Calculadora Gratuita Online",
      breadcrumbHome: "Calquary",
    },
    hero: {
      eyebrow: "Índice de referência · calculadoras para tudo",
      h1: "Encontre a calculadora exata que você precisa - rápido.",
      lede: "A Calquary organiza calculadoras como uma boa biblioteca de referência organiza livros: por assunto, com respostas claras e sem confusão. Matemática, dinheiro, projetos domésticos, saúde e muito mais.",
      statLabel: "calculadoras disponíveis e em crescimento",
      lookupTag: "BUSCAR",
      placeholder: "Experimente 'concreto', 'IMC', 'empréstimo'...",
      hint: "Ou explore por categoria abaixo.",
    },
    sections: {
      browseKicker: "Explorar",
      browseH2: "Cada categoria, sua própria prateleira",
      popularKicker: "Popular agora",
      popularH2: "Ferramentas em destaque",
      recentKicker: "Adicionado recentemente",
      recentH2: "Adicionadas recentemente",
      faqKicker: "Bom saber",
      faqH2: "Perguntas frequentes",
    },
    homeFaq: [
      { q: "O que é a Calquary?", a: "A Calquary é um índice de referência de calculadoras rápidas e precisas, organizadas por assunto como em uma biblioteca, em vez de espalhadas entre anúncios e conteúdo não relacionado. Escolha uma categoria, abra uma ferramenta e obtenha sua resposta." },
      { q: "Essas calculadoras são gratuitas?", a: "Sim - todas as calculadoras da Calquary são gratuitas, sem necessidade de conta, cadastro ou pagamento. Basta abrir uma ferramenta e usá-la." },
      { q: "Quão precisas são as calculadoras da Calquary?", a: "Cada calculadora usa uma fórmula padrão e verificada para sua categoria, e cada ferramenta é conferida com resultados calculados manualmente antes de ser publicada. Para decisões com implicações financeiras, estruturais ou médicas reais, consulte um profissional qualificado." },
      { q: "Vocês armazenam algum dos meus dados?", a: "Não - todas as calculadoras funcionam inteiramente no seu navegador. Os números que você insere nunca são enviados a um servidor nem armazenados; fechar a aba apaga tudo." },
      { q: "Quantas calculadoras a Calquary tem?", a: 'Atualmente, a Calquary tem <span id="faq-tool-count">—</span> calculadoras em 8 categorias, e o catálogo continua crescendo.' },
      { q: "Com que frequência novas calculadoras são adicionadas?", a: "Não há um cronograma fixo, mas o catálogo tem crescido de forma constante desde o lançamento - novas calculadoras são adicionadas em lotes por categoria, cada uma construída e verificada antes de ser publicada." },
    ],
  },

  it: {
    catSuffix: "Calcolatrici",
    nav: { categories: "Categorie", allTools: "Tutti gli strumenti", about: "Chi siamo" },
    footer: {
      categoriesHeader: "Categorie",
      popularHeader: "Popolari",
      siteHeader: "Sito",
      allCategories: "Tutte le categorie",
      allTools: "Tutti gli strumenti",
      allCalculators: "Tutte le calcolatrici",
      about: "Chi siamo",
      contact: "Contatti",
      privacy: "Privacy",
      terms: "Termini",
      tagline: "Un indice di riferimento di calcolatrici rapide e precise - pensato per chi ha solo bisogno della risposta.",
      copyright: "© 2026 Calquary. Le calcolatrici sono fornite a scopo informativo e non sostituiscono una consulenza professionale.",
    },
    buttons: {
      findIt: "Cerca",
      browseAll: "Vedi tutte →",
      calculate: "Calcola",
      reset: "Reimposta",
      backToAll: "← Torna a tutte le calcolatrici",
    },
    labels: {
      relatedTools: "Strumenti correlati",
      accuracyTitle: "Nota sulla precisione",
      accuracyText: "Le calcolatrici di Calquary sono pensate per stime rapide e affidabili. Per decisioni con reali implicazioni finanziarie, strutturali o mediche, consulta un professionista qualificato.",
      lastUpdated: "Ultimo aggiornamento:",
      faqTitle: "Domande frequenti",
      titleSuffix: "Calcolatrice Online Gratuita",
      breadcrumbHome: "Calquary",
    },
    hero: {
      eyebrow: "Indice di riferimento · calcolatrici per tutto",
      h1: "Trova esattamente la calcolatrice di cui hai bisogno - velocemente.",
      lede: "Calquary organizza le calcolatrici come una buona biblioteca di riferimento organizza i libri: per argomento, con risposte chiare e senza confusione. Matematica, denaro, progetti per la casa, salute e altro ancora.",
      statLabel: "calcolatrici disponibili e in aumento",
      lookupTag: "CERCA",
      placeholder: "Prova 'cemento', 'IMC', 'prestito'...",
      hint: "Oppure sfoglia per categoria qui sotto.",
    },
    sections: {
      browseKicker: "Sfoglia",
      browseH2: "Ogni categoria, il suo scaffale",
      popularKicker: "Popolari ora",
      popularH2: "Strumenti in evidenza",
      recentKicker: "Aggiunte recenti",
      recentH2: "Aggiunte di recente",
      faqKicker: "Utile sapere",
      faqH2: "Domande frequenti",
    },
    homeFaq: [
      { q: "Cos'è Calquary?", a: "Calquary è un indice di riferimento di calcolatrici rapide e precise, organizzate per argomento come in una biblioteca, invece di essere sparse tra annunci e contenuti non correlati. Scegli una categoria, apri uno strumento, ottieni la tua risposta." },
      { q: "Queste calcolatrici sono gratuite?", a: "Sì - ogni calcolatrice su Calquary è gratuita, senza account, registrazione o abbonamento. Basta aprire uno strumento e usarlo." },
      { q: "Quanto sono precise le calcolatrici di Calquary?", a: "Ogni calcolatrice utilizza una formula standard e verificata per la sua categoria, e ogni strumento viene controllato rispetto a risultati calcolati a mano prima della pubblicazione. Per decisioni con reali implicazioni finanziarie, strutturali o mediche, consulta un professionista qualificato." },
      { q: "Conservate i miei dati?", a: "No - ogni calcolatrice funziona interamente nel tuo browser. I numeri che inserisci non vengono mai inviati a un server né memorizzati; chiudendo la scheda tutto viene cancellato." },
      { q: "Quante calcolatrici ha Calquary?", a: 'Ad oggi, Calquary ha <span id="faq-tool-count">—</span> calcolatrici in 8 categorie, e il catalogo continua a crescere.' },
      { q: "Con quale frequenza vengono aggiunte nuove calcolatrici?", a: "Non c'è un programma fisso, ma il catalogo è cresciuto costantemente dal lancio - nuove calcolatrici vengono aggiunte a gruppi per categoria, ciascuna costruita e verificata prima della pubblicazione." },
    ],
  },

  ja: {
    catSuffix: "計算ツール",
    nav: { categories: "カテゴリー", allTools: "すべてのツール", about: "このサイトについて" },
    footer: {
      categoriesHeader: "カテゴリー",
      popularHeader: "人気",
      siteHeader: "サイト",
      allCategories: "すべてのカテゴリー",
      allTools: "すべてのツール",
      allCalculators: "すべての計算ツール",
      about: "このサイトについて",
      contact: "お問い合わせ",
      privacy: "プライバシー",
      terms: "利用規約",
      tagline: "必要な答えだけが欲しい人のために作られた、速く正確な計算ツールのリファレンスインデックスです。",
      copyright: "© 2026 Calquary. 計算結果は情報提供のみを目的としており、専門家によるアドバイスに代わるものではありません。",
    },
    buttons: {
      findIt: "検索",
      browseAll: "すべて見る →",
      calculate: "計算する",
      reset: "リセット",
      backToAll: "← すべての計算ツールに戻る",
    },
    labels: {
      relatedTools: "関連ツール",
      accuracyTitle: "精度について",
      accuracyText: "Calquaryの計算ツールは、迅速で信頼できる概算を目的としています。実際の財務、構造、医療に関わる重要な決定を行う前には、必ず専門家にご確認ください。",
      lastUpdated: "最終更新日：",
      faqTitle: "よくある質問",
      titleSuffix: "無料オンライン計算ツール",
      breadcrumbHome: "Calquary",
    },
    hero: {
      eyebrow: "リファレンスインデックス・あらゆる計算ツール",
      h1: "必要な計算ツールが、驚くほどすぐに見つかる計算サイト。",
      lede: "Calquaryは、優れた参考図書館が本を整理するように計算ツールを整理します。項目別に、わかりやすい答えを、無駄なく。数学、お金、住まいのプロジェクト、健康など。",
      statLabel: "件の計算ツールが公開中、さらに増加中",
      lookupTag: "検索",
      placeholder: "「コンクリート」「BMI」「ローン」などで検索...",
      hint: "または、下のカテゴリーから探す。",
    },
    sections: {
      browseKicker: "カテゴリー",
      browseH2: "カテゴリーごとに整理された計算ツール",
      popularKicker: "人気の計算ツール",
      popularH2: "注目の計算ツール",
      recentKicker: "新着",
      recentH2: "最近追加されたツール",
      faqKicker: "知っておくと便利",
      faqH2: "よくある質問",
    },
    homeFaq: [
      { q: "Calquaryとは何ですか？", a: "Calquaryは、広告や無関係なコンテンツの中に埋もれることなく、図書館のように項目別に整理された、速く正確な計算ツールのリファレンスインデックスです。カテゴリーを選び、ツールを開くだけで答えが得られます。" },
      { q: "これらの計算ツールは無料で使えますか？", a: "はい。Calquaryのすべての計算ツールは無料で、アカウント登録や支払いは一切不要です。ツールを開いてすぐにお使いいただけます。" },
      { q: "Calquaryの計算ツールはどのくらい正確ですか？", a: "各計算ツールはそのカテゴリーに応じた標準的で検証済みの数式を使用しており、公開前に手計算による結果と照合して確認されています。実際の財務、構造、医療に関わる重要な決定を行う前には、必ず専門家にご確認ください。" },
      { q: "入力したデータは保存されますか？", a: "いいえ。すべての計算ツールはブラウザ内で完結して動作します。入力した数値がサーバーに送信されたり保存されたりすることは一切なく、タブを閉じればすべて消去されます。" },
      { q: "Calquaryにはいくつの計算ツールがありますか？", a: '現在、Calquaryには8つのカテゴリーにわたり<span id="faq-tool-count">—</span>件の計算ツールがあり、カタログは今も増え続けています。' },
      { q: "新しい計算ツールはどのくらいの頻度で追加されますか？", a: "決まったスケジュールはありませんが、公開以来カタログは着実に成長しています。新しい計算ツールはカテゴリーごとにまとめて追加され、公開前に一つひとつ構築・検証されています。" },
    ],
  },

  ro: {
    catSuffix: "Calculatoare",
    nav: { categories: "Categorii", allTools: "Toate instrumentele", about: "Despre noi" },
    footer: {
      categoriesHeader: "Categorii",
      popularHeader: "Populare",
      siteHeader: "Site",
      allCategories: "Toate categoriile",
      allTools: "Toate instrumentele",
      allCalculators: "Toate calculatoarele",
      about: "Despre noi",
      contact: "Contact",
      privacy: "Confidențialitate",
      terms: "Termeni",
      tagline: "Un index de referință cu calculatoare rapide și precise, creat pentru cei care vor doar răspunsul.",
      copyright: "© 2026 Calquary. Calculatoarele sunt oferite în scop informativ și nu înlocuiesc sfatul unui profesionist.",
    },
    buttons: {
      findIt: "Caută",
      browseAll: "Vezi toate →",
      calculate: "Calculează",
      reset: "Resetează",
      backToAll: "← Înapoi la toate calculatoarele",
    },
    labels: {
      relatedTools: "Instrumente similare",
      accuracyTitle: "Notă privind precizia",
      accuracyText: "Calculatoarele Calquary sunt concepute pentru a oferi estimări rapide și fiabile. Pentru decizii cu implicații financiare, structurale sau medicale reale, consultă un profesionist calificat.",
      lastUpdated: "Ultima actualizare:",
      faqTitle: "Întrebări frecvente",
      titleSuffix: "Calculator Gratuit Online",
      breadcrumbHome: "Calquary",
    },
    hero: {
      eyebrow: "Index de referință · calculatoare pentru orice",
      h1: "Găsește exact calculatorul de care ai nevoie - rapid.",
      lede: "Calquary organizează calculatoarele așa cum o bibliotecă bună își organizează cărțile: pe subiecte, cu răspunsuri clare și fără elemente inutile. Matematică, bani, proiecte pentru casă, sănătate și multe altele.",
      statLabel: "calculatoare disponibile și în continuă creștere",
      lookupTag: "CAUTĂ",
      placeholder: "Încearcă 'beton', 'IMC', 'împrumut'...",
      hint: "Sau explorează pe categorii mai jos.",
    },
    sections: {
      browseKicker: "Explorează",
      browseH2: "Fiecare categorie, propriul raft",
      popularKicker: "Populare acum",
      popularH2: "Instrumente recomandate",
      recentKicker: "Adăugate recent",
      recentH2: "Adăugate de curând",
      faqKicker: "Află mai multe",
      faqH2: "Întrebări frecvente",
    },
    homeFaq: [
      { q: "Ce este Calquary?", a: "Calquary este un index de referință cu calculatoare rapide și precise, organizate pe subiecte ca într-o bibliotecă, nu împrăștiate printre reclame și conținut fără legătură. Alegi o categorie, deschizi un instrument și obții răspunsul." },
      { q: "Sunt gratuite aceste calculatoare?", a: "Da - toate calculatoarele Calquary sunt gratuite, fără cont, înregistrare sau plată. Deschizi un instrument și îl folosești." },
      { q: "Cât de precise sunt calculatoarele Calquary?", a: "Fiecare calculator folosește o formulă standard, verificată pentru categoria sa, iar fiecare instrument este verificat cu rezultate calculate manual înainte de publicare. Pentru decizii cu implicații financiare, structurale sau medicale reale, consultă un profesionist calificat." },
      { q: "Îmi salvați vreo dată?", a: "Nu - toate calculatoarele funcționează în întregime în browserul tău. Numerele introduse nu sunt niciodată trimise către un server sau stocate; când închizi fila, totul dispare." },
      { q: "Câte calculatoare are Calquary?", a: 'În prezent, Calquary are <span id="faq-tool-count">—</span> calculatoare în 8 categorii, iar catalogul continuă să crească.' },
      { q: "Cât de des sunt adăugate calculatoare noi?", a: "Nu există un calendar fix, dar catalogul a crescut constant de la lansare - calculatoarele noi sunt adăugate în loturi, pe categorii, fiecare fiind construit și verificat înainte de publicare." },
    ],
  },
};

const I18N_CATEGORIES = {
  math: {
    es: { name: "Matemáticas", description: "Porcentajes, proporciones y aritmética cotidiana.", longDescription: "Desde cálculos rápidos de porcentajes hasta estadística y álgebra, esta categoría cubre los problemas matemáticos cotidianos que la gente realmente busca - dividir una cuenta, revisar una nota o calcular una proporción - sin tener que usar una calculadora científica completa llena de funciones que no necesitas." },
    fr: { name: "Mathématiques", description: "Pourcentages, ratios et calculs du quotidien.", longDescription: "Des calculs rapides de pourcentages aux statistiques et à l'algèbre, cette catégorie couvre les problèmes mathématiques quotidiens que les gens recherchent réellement - diviser une addition, vérifier une note ou calculer un ratio - sans avoir à utiliser une calculatrice scientifique complète regorgeant de fonctions inutiles." },
    de: { name: "Mathematik", description: "Prozentsätze, Verhältnisse und alltägliche Arithmetik.", longDescription: "Von schnellen Prozentrechnungen bis hin zu Statistik und Algebra deckt diese Kategorie die alltäglichen mathematischen Probleme ab, nach denen Menschen tatsächlich suchen - eine Rechnung teilen, eine Note überprüfen oder ein Verhältnis berechnen - ohne sich durch einen vollständigen wissenschaftlichen Taschenrechner mit lauter unnötigen Funktionen arbeiten zu müssen." },
    pt: { name: "Matemática", description: "Porcentagens, proporções e aritmética do dia a dia.", longDescription: "De cálculos rápidos de porcentagem a estatística e álgebra, esta categoria cobre os problemas matemáticos do dia a dia que as pessoas realmente procuram - dividir uma conta, conferir uma nota ou calcular uma proporção - sem precisar de uma calculadora científica completa cheia de funções desnecessárias." },
    it: { name: "Matematica", description: "Percentuali, rapporti e calcoli quotidiani.", longDescription: "Dai calcoli rapidi delle percentuali alla statistica e all'algebra, questa categoria copre i problemi matematici quotidiani che le persone cercano davvero - dividere un conto, controllare un voto o calcolare un rapporto - senza dover usare una calcolatrice scientifica completa piena di funzioni inutili." },
    ja: { name: "数学", description: "パーセント、比率、日常の計算。", longDescription: "パーセントの簡単な計算から統計、代数まで、このカテゴリーは人々が実際に検索する日常的な数学の問題をカバーしています。割り勘の計算、成績の確認、比率の計算などを、無関係な機能だらけの本格的な関数電卓を使わずに行えます。" },
    ro: { name: "Matematică", description: "Procente, rapoarte și aritmetică zilnică.", longDescription: "De la calcule rapide de procente până la statistică și algebră, această categorie acoperă problemele matematice zilnice pe care oamenii chiar le caută - împărțirea unei note de plată, verificarea unei medii sau calcularea unui raport - fără să fie nevoie de un calculator științific complet, plin de funcții inutile." },
  },
  finance: {
    es: { name: "Finanzas", description: "Préstamos, propinas y matemáticas del dinero cotidianas.", longDescription: "Préstamos, ahorros, impuestos y pago de deudas se reducen a un puñado de fórmulas bien conocidas - estas calculadoras las aplican a tus propios números para que veas un pago mensual real, un cronograma de pago o una proyección de crecimiento en lugar de leer sobre la fórmula en abstracto." },
    fr: { name: "Finance", description: "Prêts, pourboires et calculs financiers du quotidien.", longDescription: "Prêts, épargne, impôts et remboursement de dettes reposent tous sur une poignée de formules bien connues - ces calculatrices les appliquent à vos propres chiffres pour que vous voyiez une mensualité réelle, un calendrier de remboursement ou une projection de croissance plutôt que de simplement lire la formule dans l'abstrait." },
    de: { name: "Finanzen", description: "Kredite, Trinkgeld und alltägliche Geldrechnungen.", longDescription: "Kredite, Ersparnisse, Steuern und Schuldenabbau lassen sich alle auf eine Handvoll bekannter Formeln zurückführen - diese Rechner wenden sie auf Ihre tatsächlichen Zahlen an, sodass Sie eine reale monatliche Rate, einen Tilgungsplan oder eine Wachstumsprognose sehen, statt nur abstrakt über die Formel zu lesen." },
    pt: { name: "Finanças", description: "Empréstimos, gorjetas e cálculos financeiros do dia a dia.", longDescription: "Empréstimos, poupança, impostos e quitação de dívidas se resumem a um punhado de fórmulas bem conhecidas - essas calculadoras as aplicam aos seus próprios números para que você veja um pagamento mensal real, um cronograma de quitação ou uma projeção de crescimento, em vez de apenas ler sobre a fórmula de forma abstrata." },
    it: { name: "Finanza", description: "Prestiti, mance e calcoli finanziari quotidiani.", longDescription: "Prestiti, risparmi, tasse e estinzione dei debiti si riducono tutti a una manciata di formule ben note - queste calcolatrici le applicano ai tuoi numeri reali così puoi vedere una rata mensile effettiva, una tempistica di estinzione o una proiezione di crescita invece di leggere della formula in astratto." },
    ja: { name: "お金・金融", description: "ローン、チップ、日常のお金の計算。", longDescription: "ローン、貯蓄、税金、借金の返済はすべて、よく知られたいくつかの計算式に帰着します。これらの計算機はそれらの式をあなたの実際の数値に当てはめるので、公式について抽象的に読むのではなく、実際の月々の返済額、返済スケジュール、または成長予測を確認できます。" },
    ro: { name: "Finanțe", description: "Împrumuturi, bacșișuri și calcule financiare zilnice.", longDescription: "Împrumuturile, economiile, taxele și plata datoriilor se reduc la un set de formule bine cunoscute - aceste calculatoare le aplică la cifrele tale reale, ca să vezi o rată lunară reală, un grafic de rambursare sau o proiecție de creștere, nu doar formula citită abstract." },
  },
  construction: {
    es: { name: "Construcción y Hogar", description: "Materiales, cobertura y presupuestos de proyectos.", longDescription: "Los proyectos de mejoras del hogar dependen de calcular bien las cantidades de material - muy poco y tienes que volver a la tienda a mitad del trabajo, demasiado y has gastado de más. Estas calculadoras convierten las dimensiones de una habitación en cantidades de concreto, piso, pintura y madera, cada una con un margen de desperdicio incluido." },
    fr: { name: "Construction et Maison", description: "Matériaux, couverture et estimations de projets.", longDescription: "Les projets de rénovation dépendent d'un calcul précis des quantités de matériaux - trop peu et vous retournez au magasin en plein chantier, trop et vous avez dépensé plus que nécessaire. Ces calculatrices convertissent les dimensions d'une pièce en quantités de béton, de revêtement de sol, de peinture et de bois, chacune avec une marge de perte intégrée." },
    de: { name: "Bau & Heimwerken", description: "Materialien, Flächenbedarf und Projektschätzungen.", longDescription: "Bei Heimwerkerprojekten kommt es darauf an, die Materialmengen richtig zu berechnen - zu wenig, und Sie müssen mitten im Projekt noch einmal einkaufen; zu viel, und Sie haben zu viel ausgegeben. Diese Rechner wandeln Raummaße in Beton-, Bodenbelag-, Farb- und Holzmengen um, jeweils mit eingebautem Verschnittzuschlag." },
    pt: { name: "Construção e Casa", description: "Materiais, cobertura e orçamentos de projetos.", longDescription: "Projetos de reforma dependem de calcular corretamente as quantidades de material - pouco demais e você volta à loja no meio da obra, demais e você gastou mais do que devia. Essas calculadoras convertem as dimensões de um cômodo em quantidades de concreto, piso, tinta e madeira, cada uma com uma margem de desperdício incluída." },
    it: { name: "Costruzione e Casa", description: "Materiali, copertura e stime di progetto.", longDescription: "I progetti di ristrutturazione dipendono dal calcolare correttamente le quantità di materiale - troppo poco e devi tornare al negozio a metà lavoro, troppo e hai speso più del necessario. Queste calcolatrici convertono le dimensioni di una stanza in quantità di calcestruzzo, pavimento, vernice e legname, ciascuna con un margine di spreco incorporato." },
    ja: { name: "建築・住まい", description: "材料、施工面積、プロジェクトの見積もり。", longDescription: "住まいのリフォームプロジェクトは、材料の必要量を正確に把握できるかどうかで成否が分かれます。少なすぎれば工事の途中でまた買いに行くことになり、多すぎれば無駄な出費になります。これらの計算機は、部屋の寸法をコンクリート、床材、ペンキ、木材の必要量に変換し、それぞれにロス分の余裕も組み込まれています。" },
    ro: { name: "Construcții și Casă", description: "Materiale, suprafețe și estimări de proiect.", longDescription: "Proiectele de renovare depind de calcularea corectă a cantităților de material - prea puțin și te întorci la magazin la jumătatea lucrării, prea mult și ai cheltuit în plus. Aceste calculatoare transformă dimensiunile unei camere în cantități de beton, pardoseală, vopsea și cherestea, fiecare cu o marjă de pierdere inclusă." },
  },
  health: {
    es: { name: "Salud y Fitness", description: "Métricas corporales, ritmo y datos de entrenamiento.", longDescription: "Métricas corporales como el IMC, la TMB y el porcentaje de grasa corporal se calculan con un puñado de fórmulas estándar y publicadas - estas herramientas las aplican a tus medidas para darte un número con el que trabajar, junto con una nota en lenguaje sencillo sobre lo que ese número sí y no te dice." },
    fr: { name: "Santé et Forme", description: "Mesures corporelles, allure et données d'entraînement.", longDescription: "Des indicateurs corporels comme l'IMC, le métabolisme de base et le pourcentage de masse grasse se calculent à partir d'une poignée de formules standards et publiées - ces outils les appliquent à vos mesures pour vous donner un chiffre concret, accompagné d'une explication en langage clair sur ce que ce chiffre révèle ou non." },
    de: { name: "Gesundheit & Fitness", description: "Körperwerte, Tempo und Trainingsdaten.", longDescription: "Körperwerte wie BMI, Grundumsatz und Körperfettanteil werden anhand einer Handvoll standardisierter, veröffentlichter Formeln berechnet - diese Tools wenden sie auf Ihre Messwerte an, sodass Sie eine Zahl zum Arbeiten erhalten, zusammen mit einem verständlichen Hinweis darauf, was diese Zahl aussagt und was nicht." },
    pt: { name: "Saúde e Fitness", description: "Métricas corporais, ritmo e dados de treino.", longDescription: "Métricas corporais como IMC, TMB e percentual de gordura corporal são calculadas a partir de um punhado de fórmulas padrão e publicadas - essas ferramentas as aplicam às suas medidas para você obter um número com o qual trabalhar, junto com uma explicação em linguagem simples sobre o que esse número indica e o que não indica." },
    it: { name: "Salute e Fitness", description: "Parametri corporei, ritmo e dati di allenamento.", longDescription: "Parametri corporei come IMC, metabolismo basale e percentuale di grasso corporeo si calcolano con una manciata di formule standard e pubblicate - questi strumenti le applicano alle tue misurazioni per darti un numero su cui lavorare, insieme a una spiegazione in linguaggio semplice su cosa quel numero indica e cosa no." },
    ja: { name: "健康・フィットネス", description: "身体指標、ペース、トレーニングデータ。", longDescription: "BMI、基礎代謝量、体脂肪率などの身体指標は、標準的で公表されているいくつかの計算式から算出されます。これらのツールはあなたの測定値にそれらの式を適用し、数値をわかりやすい言葉での説明とともに提供します。" },
    ro: { name: "Sănătate și Fitness", description: "Indicatori corporali, ritm și date de antrenament.", longDescription: "Indicatori corporali precum IMC, rata metabolică bazală și procentul de grăsime corporală se calculează cu un set de formule standard, publicate - aceste instrumente le aplică la măsurătorile tale pentru a-ți oferi o cifră cu care poți lucra, împreună cu o explicație pe înțelesul tuturor despre ce arată și ce nu arată acel număr." },
  },
  datetime: {
    es: { name: "Fecha y Hora", description: "Cuentas regresivas, duraciones y edad en días.", longDescription: "Ya sea que estés contando los días para un evento, calculando cuántos días hábiles quedan o determinando la edad exacta de alguien, estas calculadoras manejan correctamente el cálculo de calendario - incluidos los años bisiestos y los conteos solo de días laborables - para que no tengas que contar a mano." },
    fr: { name: "Date et Heure", description: "Comptes à rebours, durées et âge en jours.", longDescription: "Que vous comptiez les jours avant un événement, calculiez le nombre de jours ouvrés restants ou déterminiez l'âge exact de quelqu'un, ces calculatrices gèrent correctement les calculs de calendrier - y compris les années bissextiles et les décomptes en jours ouvrés uniquement - pour vous éviter de compter à la main." },
    de: { name: "Datum & Uhrzeit", description: "Countdowns, Zeitspannen und Alter in Tagen.", longDescription: "Ob Sie bis zu einem Ereignis herunterzählen, herausfinden möchten, wie viele Werktage noch verbleiben, oder das genaue Alter einer Person berechnen möchten - diese Rechner verarbeiten Kalenderberechnungen korrekt, einschließlich Schaltjahren und reinen Werktagszählungen, damit Sie nicht von Hand zählen müssen." },
    pt: { name: "Data e Hora", description: "Contagens regressivas, durações e idade em dias.", longDescription: "Seja para contar os dias até um evento, calcular quantos dias úteis restam ou determinar a idade exata de alguém, essas calculadoras lidam corretamente com cálculos de calendário - incluindo anos bissextos e contagens apenas de dias úteis - para que você não precise contar manualmente." },
    it: { name: "Data e Ora", description: "Conti alla rovescia, durate ed età in giorni.", longDescription: "Che tu stia contando alla rovescia per un evento, calcolando quanti giorni lavorativi rimangono o determinando l'età esatta di qualcuno, queste calcolatrici gestiscono correttamente i calcoli del calendario - inclusi gli anni bisestili e i conteggi solo dei giorni lavorativi - così non devi contare a mano." },
    ja: { name: "日付・時間", description: "カウントダウン、期間、日数での年齢。", longDescription: "イベントまでのカウントダウンでも、残りの営業日数の計算でも、誰かの正確な年齢の算出でも、これらの計算機はうるう年や営業日のみのカウントを含め、カレンダー計算を正しく処理するので、手作業で数える必要はありません。" },
    ro: { name: "Dată și Oră", description: "Numărători inverse, durate și vârstă în zile.", longDescription: "Fie că numeri zilele până la un eveniment, calculezi câte zile lucrătoare mai rămân sau determini vârsta exactă a cuiva, aceste calculatoare gestionează corect calculul calendaristic - inclusiv anii bisecți și numărătorile doar în zile lucrătoare - ca să nu fie nevoie să numeri manual." },
  },
  conversions: {
    es: { name: "Conversiones Cotidianas", description: "Unidades, medidas y equivalencias de cocina.", longDescription: "Las conversiones de unidades surgen constantemente en la cocina, los proyectos del hogar y la vida cotidiana - convertir entre métrico e imperial, o calcular cuántas tazas equivalen a los gramos de una receta. Estas herramientas hacen la conversión al instante, mostrando el factor subyacente para que puedas confiar en el resultado." },
    fr: { name: "Conversions Courantes", description: "Unités, mesures et équivalences de cuisine.", longDescription: "Les conversions d'unités reviennent constamment en cuisine, dans les projets domestiques et au quotidien - convertir entre le métrique et l'impérial, ou déterminer combien de tasses représentent les grammes d'une recette. Ces outils effectuent la conversion instantanément, avec le facteur sous-jacent affiché pour que vous puissiez faire confiance au résultat." },
    de: { name: "Alltagsumrechnungen", description: "Einheiten, Maße und Küchenumrechnungen.", longDescription: "Einheitenumrechnungen kommen beim Kochen, bei Heimwerkerprojekten und im Alltag ständig vor - zwischen metrisch und imperial umrechnen oder herausfinden, wie viele Tassen den Gramm-Angaben eines Rezepts entsprechen. Diese Tools führen die Umrechnung sofort durch und zeigen den zugrunde liegenden Faktor an, damit Sie dem Ergebnis vertrauen können." },
    pt: { name: "Conversões do Dia a Dia", description: "Unidades, medidas e equivalências de cozinha.", longDescription: "Conversões de unidades surgem constantemente na culinária, em projetos domésticos e no dia a dia - converter entre métrico e imperial, ou descobrir quantas xícaras equivalem aos gramas de uma receita. Essas ferramentas fazem a conversão instantaneamente, mostrando o fator utilizado para que você possa confiar no resultado." },
    it: { name: "Conversioni Quotidiane", description: "Unità, misure ed equivalenze di cucina.", longDescription: "Le conversioni di unità ricorrono costantemente in cucina, nei progetti domestici e nella vita quotidiana - convertire tra metrico e imperiale, o capire quante tazze corrispondono ai grammi di una ricetta. Questi strumenti eseguono la conversione istantaneamente, mostrando il fattore sottostante così puoi fidarti del risultato." },
    ja: { name: "日常の単位換算", description: "単位、計測、料理の換算。", longDescription: "単位換算は、料理、住まいのプロジェクト、日常生活で頻繁に必要になります。メートル法とヤード・ポンド法の変換や、レシピのグラム数が何カップに相当するかを調べる場合などです。これらのツールは即座に変換を行い、根拠となる換算係数も表示するため、結果を信頼できます。" },
    ro: { name: "Conversii Zilnice", description: "Unități, măsuri și echivalențe de gătit.", longDescription: "Conversiile de unități apar constant la gătit, în proiecte pentru casă și în viața de zi cu zi - conversia între metric și imperial, sau aflarea câte cești corespund gramelor dintr-o rețetă. Aceste instrumente fac conversia instantaneu, arătând și factorul de calcul, ca să poți avea încredere în rezultat." },
  },
  text: {
    es: { name: "Texto y Digital", description: "Conteo de palabras y generadores para tareas cotidianas.", longDescription: "El conteo de palabras, la conversión de mayúsculas/minúsculas y los generadores de texto se encargan de las pequeñas tareas de procesamiento de texto que surgen al escribir, programar o formatear contenido - cada una funciona enteramente en tu navegador, así que nada de lo que escribes o pegas se envía a ningún lado." },
    fr: { name: "Texte et Numérique", description: "Comptage de mots et générateurs pour les tâches courantes.", longDescription: "Le comptage de mots, la conversion de casse et les générateurs de texte prennent en charge les petites tâches de traitement de texte qui surviennent lors de l'écriture, du codage ou de la mise en forme de contenu - chacun fonctionne entièrement dans votre navigateur, donc rien de ce que vous tapez ou collez n'est jamais envoyé où que ce soit." },
    de: { name: "Text & Digital", description: "Wortzählung und Generatoren für alltägliche Aufgaben.", longDescription: "Wortzählung, Groß-/Kleinschreibungsumwandlung und Textgeneratoren übernehmen die kleinen Textverarbeitungsaufgaben, die beim Schreiben, Programmieren oder Formatieren von Inhalten anfallen - jedes läuft vollständig in Ihrem Browser, sodass nichts, was Sie eingeben oder einfügen, jemals irgendwohin gesendet wird." },
    pt: { name: "Texto e Digital", description: "Contagem de palavras e geradores para tarefas do dia a dia.", longDescription: "Contagem de palavras, conversão de maiúsculas/minúsculas e geradores de texto cuidam das pequenas tarefas de processamento de texto que surgem ao escrever, programar ou formatar conteúdo - cada uma funciona inteiramente no seu navegador, então nada do que você digita ou cola é enviado a lugar nenhum." },
    it: { name: "Testo e Digitale", description: "Conteggio parole e generatori per attività quotidiane.", longDescription: "Conteggio parole, conversione maiuscolo/minuscolo e generatori di testo gestiscono le piccole attività di elaborazione testo che si presentano durante la scrittura, la programmazione o la formattazione di contenuti - ognuno funziona interamente nel tuo browser, quindi nulla di ciò che digiti o incolli viene mai inviato altrove." },
    ja: { name: "テキスト・デジタル", description: "日常的な作業のための文字数カウントや生成ツール。", longDescription: "文字数カウント、大文字・小文字変換、テキスト生成ツールは、文章作成、コーディング、コンテンツの整形の際に発生する細かなテキスト処理作業を担います。すべてブラウザ内で完結して動作するため、入力または貼り付けた内容がどこかに送信されることはありません。" },
    ro: { name: "Text și Digital", description: "Numărare de cuvinte și generatoare pentru sarcini zilnice.", longDescription: "Numărarea cuvintelor, conversia între majuscule/minuscule și generatoarele de text rezolvă micile sarcini de procesare a textului care apar la scris, programare sau formatarea conținutului - fiecare rulează în întregime în browser, deci nimic din ce scrii sau lipești nu este trimis nicăieri." },
  },
  pets: {
    es: { name: "Mascotas y Estilo de Vida", description: "Tablas de edad y matemáticas cotidianas para mascotas.", longDescription: "Un año de perro no equivale realmente a siete años humanos, y la duración del embarazo varía según la especie - estas calculadoras usan las curvas de edad y los datos de gestación reales de perros, gatos, conejos y caballos, en lugar de las reglas simplificadas que la mayoría conoce." },
    fr: { name: "Animaux et Style de Vie", description: "Tableaux d'âge et calculs courants pour animaux.", longDescription: "Une année de chien n'équivaut pas vraiment à sept années humaines, et la durée de gestation varie selon l'espèce - ces calculatrices utilisent les véritables courbes d'âge et données de gestation pour les chiens, chats, lapins et chevaux, plutôt que les règles simplifiées que la plupart des gens connaissent." },
    de: { name: "Haustiere & Lifestyle", description: "Altersrechner und alltägliche Berechnungen für Haustiere.", longDescription: "Ein Hundejahr entspricht nicht wirklich sieben Menschenjahren, und die Tragzeit variiert je nach Tierart - diese Rechner verwenden die tatsächlichen Alterskurven und Trächtigkeitsdaten für Hunde, Katzen, Kaninchen und Pferde, statt der stark vereinfachten Faustregeln, die die meisten Menschen kennen." },
    pt: { name: "Animais de Estimação e Estilo de Vida", description: "Tabelas de idade e cálculos do dia a dia para pets.", longDescription: "Um ano de cão não equivale realmente a sete anos humanos, e a duração da gestação varia por espécie - essas calculadoras usam as curvas de idade e os dados de gestação reais de cães, gatos, coelhos e cavalos, em vez das regras simplificadas que a maioria conhece." },
    it: { name: "Animali Domestici e Stile di Vita", description: "Tabelle d'età e calcoli quotidiani per animali domestici.", longDescription: "Un anno di cane non equivale davvero a sette anni umani, e la durata della gravidanza varia in base alla specie - queste calcolatrici usano le curve d'età e i dati di gestazione reali per cani, gatti, conigli e cavalli, invece delle regole semplificate che la maggior parte delle persone conosce." },
    ja: { name: "ペット・ライフスタイル", description: "年齢早見表や日常のペット計算。", longDescription: "犬の1年は実際には人間の7年に相当するわけではなく、妊娠期間も種によって異なります。これらの計算機は、多くの人が知っている単純化された目安ではなく、犬・猫・ウサギ・馬それぞれの実際の年齢曲線と妊娠データを使用しています。" },
    ro: { name: "Animale de Companie și Stil de Viață", description: "Tabele de vârstă și calcule zilnice pentru animale de companie.", longDescription: "Un an de câine nu echivalează cu adevărat cu șapte ani umani, iar durata gestației variază în funcție de specie - aceste calculatoare folosesc curbele reale de vârstă și datele de gestație pentru câini, pisici, iepuri și cai, în loc de regulile simplificate pe care majoritatea le știu." },
  },
};

// Wave-one tool translations. Only calculators listed here get localized
// pages built (see build.js WAVE_ONE_TOOL_IDS) — every other calculator
// stays English-only until a later wave, by design (231 pages in one pass
// was flagged as worth pacing, per this task's own brief).
const I18N_TOOLS = {
  "percentage-calculator": {
    es: {
      title: "Calculadora de Porcentajes",
      intro: "Introduce un porcentaje y un número para obtener el valor resultante - útil para propinas, descuentos, notas y matemáticas cotidianas.",
      description: "Calcula qué es X por ciento de un número, en un solo paso.",
      faq: [
        { q: "¿Cómo calculo el porcentaje de un número a mano?", a: "Divide el porcentaje entre 100 y multiplica por el número. Para el 20% de 150: 0,20 × 150 = 30." },
        { q: "¿Cómo hallo qué porcentaje representa un número de otro?", a: "Divide la parte entre el total y multiplica por 100. Por ejemplo, ¿30 qué porcentaje es de 150? 30 ÷ 150 × 100 = 20%." },
        { q: "¿Cómo calculo un aumento o una disminución porcentual?", a: "Resta el valor antiguo del nuevo valor, divide entre el valor antiguo y multiplica por 100. Pasar de 150 a 180 es (180−150)/150×100 = 20% de aumento; pasar de 150 a 120 es (120−150)/150×100 = −20%, una disminución del 20%." },
        { q: "¿Cómo hallo el precio original antes de aplicar un descuento porcentual?", a: "Divide el precio con descuento entre (1 menos el descuento en decimal). Si un artículo de $60 tiene un 25% de descuento, divide 60 entre 0,75 para obtener el precio original de $80." },
        { q: "¿Cómo calculo un porcentaje de un porcentaje, como el 20% del 50%?", a: "Convierte ambos porcentajes a decimales y multiplícalos entre sí, luego vuelve a convertir a porcentaje: el 20% del 50% es 0,20 × 0,50 = 0,10, o 10%. Esto surge al combinar tasas, como un descuento aplicado sobre un precio ya rebajado, o una tasa de impuesto aplicada a una cantidad parcial." },
      ],
    },
    fr: {
      title: "Calculatrice de Pourcentage",
      intro: "Saisissez un pourcentage et un nombre pour obtenir la valeur résultante - utile pour les pourboires, les remises, les notes et les calculs du quotidien.",
      description: "Trouvez ce que représente X pour cent d'un nombre, en une étape.",
      faq: [
        { q: "Comment calculer un pourcentage d'un nombre à la main ?", a: "Divisez le pourcentage par 100, puis multipliez par le nombre. Pour 20% de 150 : 0,20 × 150 = 30." },
        { q: "Comment trouver quel pourcentage un nombre représente d'un autre ?", a: "Divisez la partie par le tout, puis multipliez par 100. Par exemple, 30 représente quel pourcentage de 150 ? 30 ÷ 150 × 100 = 20%." },
        { q: "Comment calculer une augmentation ou une diminution en pourcentage ?", a: "Soustrayez l'ancienne valeur de la nouvelle, divisez par l'ancienne valeur, puis multipliez par 100. Passer de 150 à 180 donne (180−150)/150×100 = 20 % d'augmentation ; passer de 150 à 120 donne (120−150)/150×100 = −20 %, soit une diminution de 20 %." },
        { q: "Comment trouver le prix d'origine avant l'application d'une remise en pourcentage ?", a: "Divisez le prix soldé par (1 moins la remise en décimal). Pour un article à 60 $ avec 25 % de remise, divisez 60 par 0,75 pour obtenir le prix d'origine de 80 $." },
        { q: "Comment calculer un pourcentage d'un pourcentage, comme 20 % de 50 % ?", a: "Convertissez les deux pourcentages en décimales et multipliez-les entre eux, puis reconvertissez en pourcentage : 20 % de 50 % équivaut à 0,20 × 0,50 = 0,10, soit 10 %. Cela arrive lorsqu'on combine des taux - comme une remise appliquée sur un prix déjà réduit, ou un taux de taxe appliqué à un montant partiel." },
      ],
    },
    de: {
      title: "Prozentrechner",
      intro: "Geben Sie einen Prozentsatz und eine Zahl ein, um den resultierenden Wert zu ermitteln - nützlich für Trinkgeld, Rabatte, Noten und alltägliche Berechnungen.",
      description: "Ermitteln Sie in einem Schritt, wie viel X Prozent einer Zahl sind.",
      faq: [
        { q: "Wie berechne ich einen Prozentsatz einer Zahl von Hand?", a: "Teilen Sie den Prozentsatz durch 100 und multiplizieren Sie mit der Zahl. Für 20% von 150: 0,20 × 150 = 30." },
        { q: "Wie finde ich heraus, wie viel Prozent eine Zahl von einer anderen ist?", a: "Teilen Sie den Teil durch das Ganze und multiplizieren Sie mit 100. Beispiel: Wie viel Prozent von 150 sind 30? 30 ÷ 150 × 100 = 20%." },
        { q: "Wie berechne ich eine prozentuale Zu- oder Abnahme?", a: "Ziehen Sie den alten Wert vom neuen Wert ab, teilen Sie durch den alten Wert und multiplizieren Sie mit 100. Von 150 auf 180 ergibt (180−150)/150×100 = 20 % Zunahme; von 150 auf 120 ergibt (120−150)/150×100 = −20 %, also eine Abnahme von 20 %." },
        { q: "Wie finde ich den ursprünglichen Preis vor einem prozentualen Rabatt?", a: "Teilen Sie den reduzierten Preis durch (1 minus den Rabatt als Dezimalzahl). Bei einem Artikel für 60 $ mit 25 % Rabatt teilen Sie 60 durch 0,75, um den ursprünglichen Preis von 80 $ zu erhalten." },
        { q: "Wie berechne ich einen Prozentsatz eines Prozentsatzes, z. B. 20 % von 50 %?", a: "Wandeln Sie beide Prozentsätze in Dezimalzahlen um und multiplizieren Sie sie miteinander, dann rechnen Sie zurück in Prozent: 20 % von 50 % sind 0,20 × 0,50 = 0,10, also 10 %. Das kommt vor, wenn Sie Sätze kombinieren - etwa einen Rabatt auf einen bereits reduzierten Preis oder einen Steuersatz auf einen Teilbetrag." },
      ],
    },
    pt: {
      title: "Calculadora de Porcentagem",
      intro: "Insira uma porcentagem e um número para encontrar o valor resultante - útil para gorjetas, descontos, notas e cálculos do dia a dia.",
      description: "Descubra quanto é X por cento de um número, em uma etapa.",
      faq: [
        { q: "Como calculo a porcentagem de um número manualmente?", a: "Divida a porcentagem por 100 e multiplique pelo número. Para 20% de 150: 0,20 × 150 = 30." },
        { q: "Como descubro que porcentagem um número representa de outro?", a: "Divida a parte pelo todo e multiplique por 100. Por exemplo, 30 é que porcentagem de 150? 30 ÷ 150 × 100 = 20%." },
        { q: "Como calculo um aumento ou diminuição percentual?", a: "Subtraia o valor antigo do novo valor, divida pelo valor antigo e multiplique por 100. Ir de 150 para 180 é (180−150)/150×100 = 20% de aumento; ir de 150 para 120 é (120−150)/150×100 = −20%, uma diminuição de 20%." },
        { q: "Como encontro o preço original antes de aplicar um desconto percentual?", a: "Divida o preço com desconto por (1 menos o desconto em decimal). Se um item de $60 tem 25% de desconto, divida 60 por 0,75 para obter o preço original de $80." },
        { q: "Como calculo uma porcentagem de uma porcentagem, como 20% de 50%?", a: "Converta as duas porcentagens em decimais e multiplique-as entre si, depois converta de volta para porcentagem: 20% de 50% é 0,20 × 0,50 = 0,10, ou 10%. Isso surge ao combinar taxas - como um desconto aplicado sobre um preço já reduzido, ou uma taxa de imposto aplicada sobre um valor parcial." },
      ],
    },
    it: {
      title: "Calcolatrice di Percentuale",
      intro: "Inserisci una percentuale e un numero per trovare il valore risultante - utile per mance, sconti, voti e calcoli quotidiani.",
      description: "Scopri quanto è il X per cento di un numero, in un solo passaggio.",
      faq: [
        { q: "Come calcolo la percentuale di un numero a mano?", a: "Dividi la percentuale per 100, poi moltiplica per il numero. Per il 20% di 150: 0,20 × 150 = 30." },
        { q: "Come trovo che percentuale rappresenta un numero rispetto a un altro?", a: "Dividi la parte per il totale, poi moltiplica per 100. Ad esempio, 30 che percentuale è di 150? 30 ÷ 150 × 100 = 20%." },
        { q: "Come calcolo un aumento o una diminuzione percentuale?", a: "Sottrai il vecchio valore dal nuovo valore, dividi per il vecchio valore, poi moltiplica per 100. Passare da 150 a 180 è (180−150)/150×100 = 20% di aumento; passare da 150 a 120 è (120−150)/150×100 = −20%, una diminuzione del 20%." },
        { q: "Come trovo il prezzo originale prima di applicare uno sconto percentuale?", a: "Dividi il prezzo scontato per (1 meno lo sconto in decimale). Per un articolo da $60 con il 25% di sconto, dividi 60 per 0,75 per ottenere il prezzo originale di $80." },
        { q: "Come calcolo una percentuale di una percentuale, come il 20% del 50%?", a: "Converti entrambe le percentuali in decimali e moltiplicale tra loro, poi riconverti in percentuale: il 20% del 50% è 0,20 × 0,50 = 0,10, ovvero il 10%. Questo capita quando si combinano tassi - come uno sconto applicato su un prezzo già ridotto, o un'aliquota fiscale applicata a un importo parziale." },
      ],
    },
    ja: {
      title: "パーセント計算機",
      intro: "パーセントと数値を入力すると、計算結果が表示されます。チップ、割引、成績など日常の計算に便利です。",
      description: "ある数のXパーセントが何かを、一度の計算で求めます。",
      faq: [
        { q: "パーセントを手計算する方法は？", a: "パーセントを100で割り、その数を掛けます。150の20%の場合：0.20 × 150 = 30。" },
        { q: "ある数が別の数の何パーセントかを求める方法は？", a: "部分を全体で割り、100を掛けます。例えば、30は150の何パーセントですか？30 ÷ 150 × 100 = 20%。" },
        { q: "パーセントの増加や減少はどのように計算しますか？", a: "新しい値から元の値を引き、元の値で割ってから100を掛けます。150から180への変化は(180−150)/150×100 = 20%の増加、150から120への変化は(120−150)/150×100 = −20%、つまり20%の減少です。" },
        { q: "割引後の価格から元の価格を求めるにはどうすればいいですか？", a: "割引後の価格を「1 − 割引率（小数）」で割ります。60ドルの商品が25%オフの場合、60を0.75で割ると元の価格80ドルになります。" },
        { q: "20%の50%のような「パーセントのパーセント」はどう計算しますか？", a: "両方のパーセントを小数に変換して掛け合わせ、結果を再びパーセントに戻します。20%の50%は0.20 × 0.50 = 0.10、つまり10%です。これは、すでに割引された価格にさらに割引を適用する場合や、一部の金額に税率を適用する場合など、率を組み合わせるときに使います。" },
      ],
    },
    ro: {
      title: "Calculator de Procente",
      intro: "Introdu un procent și un număr pentru a obține valoarea rezultată - util pentru bacșișuri, reduceri, note și calcule zilnice.",
      description: "Află cât reprezintă X procente dintr-un număr, într-un singur pas.",
      faq: [
        { q: "Cum calculez manual un procent dintr-un număr?", a: "Împarte procentul la 100 și înmulțește cu numărul. Pentru 20% din 150: 0,20 × 150 = 30." },
        { q: "Cum aflu ce procent reprezintă un număr din altul?", a: "Împarte partea la întreg și înmulțește cu 100. De exemplu, 30 reprezintă ce procent din 150? 30 ÷ 150 × 100 = 20%." },
        { q: "Cum calculez o creștere sau o scădere procentuală?", a: "Scade valoarea veche din valoarea nouă, împarte la valoarea veche și înmulțește cu 100. Trecerea de la 150 la 180 este (180−150)/150×100 = 20% creștere; trecerea de la 150 la 120 este (120−150)/150×100 = −20%, adică o scădere de 20%." },
        { q: "Cum aflu prețul inițial înainte de aplicarea unei reduceri procentuale?", a: "Împarte prețul redus la (1 minus reducerea în format zecimal). Dacă un produs de 60$ are o reducere de 25%, împarte 60 la 0,75 pentru a obține prețul inițial de 80$." },
        { q: "Cum calculez un procent dintr-un procent, cum ar fi 20% din 50%?", a: "Convertește ambele procente în zecimale și înmulțește-le, apoi convertește rezultatul înapoi în procent: 20% din 50% este 0,20 × 0,50 = 0,10, adică 10%. Acest lucru apare când combini rate - de exemplu o reducere aplicată peste un preț deja redus, sau o rată de taxă aplicată unei sume parțiale." },
      ],
    },
  },

  "average-calculator": {
    es: {
      title: "Calculadora de Promedio",
      intro: "Introduce una lista de números separados por comas o espacios para calcular la media, la mediana y la suma.",
      description: "Calcula la media, la mediana y la suma de una lista de números.",
      faq: [
        { q: "¿Cómo calculo el promedio de una lista de números?", a: "Suma todos los números y divide entre la cantidad de números. Para 4, 8, 15, 16, 23, 42: la suma es 108, dividida entre 6 números = un promedio de 18." },
        { q: "¿Cuál es la diferencia entre media y mediana?", a: "La media es la suma dividida entre la cantidad (el 'promedio'); la mediana es el valor central cuando los números están ordenados. La mediana se ve menos afectada por valores atípicos que la media." },
        { q: "¿Esto admite números negativos o decimales?", a: "Sí: introduce los números negativos con un signo menos y los decimales con un punto, separados por comas o espacios como cualquier otro valor; la media, la mediana y la suma se calculan correctamente con valores positivos, negativos y decimales combinados." },
        { q: "¿Cuál es la diferencia entre un promedio y un promedio ponderado?", a: "Un promedio simple trata todos los números por igual; un promedio ponderado multiplica cada número por su propio peso antes de dividir entre el peso total, de modo que los valores más importantes (como un examen que vale el 40% de la nota) cuentan más. Esta calculadora calcula un promedio simple - para promedios ponderados debes multiplicar cada valor por su peso primero." },
      ],
    },
    fr: {
      title: "Calculatrice de Moyenne",
      intro: "Saisissez une liste de nombres séparés par des virgules ou des espaces pour calculer la moyenne, la médiane et la somme.",
      description: "Calculez la moyenne, la médiane et la somme d'une liste de nombres.",
      faq: [
        { q: "Comment calculer la moyenne d'une liste de nombres ?", a: "Additionnez tous les nombres, puis divisez par leur nombre total. Pour 4, 8, 15, 16, 23, 42 : la somme est 108, divisée par 6 nombres = une moyenne de 18." },
        { q: "Quelle est la différence entre moyenne et médiane ?", a: "La moyenne est la somme divisée par le nombre total (la « moyenne »); la médiane est la valeur du milieu une fois les nombres triés. La médiane est moins sensible aux valeurs extrêmes que la moyenne." },
        { q: "Cela gère-t-il les nombres négatifs ou décimaux ?", a: "Oui - saisissez les nombres négatifs avec un signe moins et les décimales avec un point, séparés par des virgules ou des espaces comme n'importe quelle autre valeur ; la moyenne, la médiane et la somme se calculent correctement avec un mélange de valeurs positives, négatives et décimales." },
        { q: "Quelle est la différence entre une moyenne et une moyenne pondérée ?", a: "Une moyenne simple traite tous les nombres de façon égale ; une moyenne pondérée multiplie chaque nombre par son propre poids avant de diviser par le poids total, de sorte que les valeurs les plus importantes (comme un examen valant 40 % de la note) comptent davantage. Cette calculatrice calcule une moyenne simple - pour une moyenne pondérée, il faut d'abord multiplier chaque valeur par son poids." },
      ],
    },
    de: {
      title: "Durchschnittsrechner",
      intro: "Geben Sie eine durch Kommas oder Leerzeichen getrennte Zahlenliste ein, um Mittelwert, Median und Summe zu berechnen.",
      description: "Berechnen Sie Mittelwert, Median und Summe einer Zahlenliste.",
      faq: [
        { q: "Wie berechne ich den Durchschnitt einer Zahlenliste?", a: "Addieren Sie alle Zahlen und teilen Sie durch die Anzahl der Zahlen. Für 4, 8, 15, 16, 23, 42: die Summe ist 108, geteilt durch 6 Zahlen = ein Durchschnitt von 18." },
        { q: "Was ist der Unterschied zwischen Mittelwert und Median?", a: "Der Mittelwert ist die Summe geteilt durch die Anzahl (der „Durchschnitt“); der Median ist der mittlere Wert der sortierten Zahlen. Der Median reagiert weniger empfindlich auf Ausreißer als der Mittelwert." },
        { q: "Werden negative Zahlen oder Dezimalzahlen unterstützt?", a: "Ja - geben Sie negative Zahlen mit einem Minuszeichen und Dezimalzahlen mit einem Punkt ein, getrennt durch Kommas oder Leerzeichen wie jeden anderen Wert; Mittelwert, Median und Summe werden auch bei einer Mischung aus positiven, negativen und Dezimalwerten korrekt berechnet." },
        { q: "Was ist der Unterschied zwischen einem Durchschnitt und einem gewichteten Durchschnitt?", a: "Ein einfacher Durchschnitt behandelt alle Zahlen gleich; ein gewichteter Durchschnitt multipliziert jede Zahl mit ihrem eigenen Gewicht, bevor durch das Gesamtgewicht geteilt wird, sodass wichtigere Werte (wie eine Prüfung, die 40 % der Note ausmacht) stärker zählen. Dieser Rechner berechnet einen einfachen Durchschnitt - für gewichtete Durchschnitte müssten Sie jeden Wert zuerst mit seinem Gewicht multiplizieren." },
      ],
    },
    pt: {
      title: "Calculadora de Média",
      intro: "Insira uma lista de números separados por vírgulas ou espaços para calcular a média, a mediana e a soma.",
      description: "Calcule a média, a mediana e a soma de uma lista de números.",
      faq: [
        { q: "Como calculo a média de uma lista de números?", a: "Some todos os números e divida pela quantidade de números. Para 4, 8, 15, 16, 23, 42: a soma é 108, dividida por 6 números = média de 18." },
        { q: "Qual é a diferença entre média e mediana?", a: "A média é a soma dividida pela quantidade (a 'média'); a mediana é o valor central quando os números estão ordenados. A mediana é menos afetada por valores extremos do que a média." },
        { q: "Isso funciona com números negativos ou decimais?", a: "Sim - insira números negativos com um sinal de menos e decimais com um ponto, separados por vírgulas ou espaços como qualquer outro valor; a média, a mediana e a soma são calculadas corretamente mesmo com valores positivos, negativos e decimais combinados." },
        { q: "Qual é a diferença entre uma média e uma média ponderada?", a: "Uma média simples trata todos os números igualmente; uma média ponderada multiplica cada número pelo seu próprio peso antes de dividir pelo peso total, de modo que valores mais importantes (como uma prova que vale 40% da nota) contam mais. Esta calculadora calcula uma média simples - para médias ponderadas, multiplique cada valor pelo seu peso primeiro." },
      ],
    },
    it: {
      title: "Calcolatrice della Media",
      intro: "Inserisci un elenco di numeri separati da virgole o spazi per calcolare media, mediana e somma.",
      description: "Calcola la media, la mediana e la somma di un elenco di numeri.",
      faq: [
        { q: "Come calcolo la media di un elenco di numeri?", a: "Somma tutti i numeri, poi dividi per quanti numeri ci sono. Per 4, 8, 15, 16, 23, 42: la somma è 108, divisa per 6 numeri = una media di 18." },
        { q: "Qual è la differenza tra media e mediana?", a: "La media è la somma divisa per il conteggio (la 'media'); la mediana è il valore centrale quando i numeri sono ordinati. La mediana è meno influenzata dai valori anomali rispetto alla media." },
        { q: "Funziona con numeri negativi o decimali?", a: "Sì - inserisci i numeri negativi con un segno meno e i decimali con un punto, separati da virgole o spazi come qualsiasi altro valore; media, mediana e somma vengono calcolate correttamente anche con valori positivi, negativi e decimali misti." },
        { q: "Qual è la differenza tra una media e una media ponderata?", a: "Una media semplice tratta tutti i numeri allo stesso modo; una media ponderata moltiplica ogni numero per il proprio peso prima di dividere per il peso totale, così i valori più importanti (come un esame che vale il 40% del voto) contano di più. Questa calcolatrice calcola una media semplice - per medie ponderate devi prima moltiplicare ogni valore per il suo peso." },
      ],
    },
    ja: {
      title: "平均計算機",
      intro: "カンマまたはスペースで区切った数値のリストを入力すると、平均値・中央値・合計を計算します。",
      description: "数値のリストの平均値、中央値、合計を計算します。",
      faq: [
        { q: "数値のリストの平均を計算する方法は？", a: "すべての数値を合計し、数値の個数で割ります。4, 8, 15, 16, 23, 42の場合：合計は108、6個で割ると平均は18になります。" },
        { q: "平均値と中央値の違いは何ですか？", a: "平均値は合計を個数で割ったもの（「平均」）で、中央値は数値を並べたときの中央の値です。中央値は平均値よりも外れ値の影響を受けにくいです。" },
        { q: "負の数や小数にも対応していますか？", a: "はい。負の数はマイナス記号を付けて、小数はピリオドを使って、他の値と同様にカンマまたはスペースで区切って入力してください。正の数、負の数、小数が混在していても、平均値・中央値・合計は正しく計算されます。" },
        { q: "平均と加重平均の違いは何ですか？", a: "単純平均はすべての数値を均等に扱いますが、加重平均は各数値をその重み（比重）で掛けてから合計の重みで割るため、重要な値（例えば成績の40%を占めるテストなど）がより大きく反映されます。この計算機は単純平均を計算します。加重平均を求めるには、各値に重みを掛けてから計算してください。" },
      ],
    },
    ro: {
      title: "Calculator de Medie",
      intro: "Introdu o listă de numere separate prin virgulă sau spațiu pentru a calcula media, mediana și suma.",
      description: "Calculează media, mediana și suma unei liste de numere.",
      faq: [
        { q: "Cum calculez media unei liste de numere?", a: "Adună toate numerele, apoi împarte la câte numere sunt. Pentru 4, 8, 15, 16, 23, 42: suma este 108, iar 108 împărțit la 6 numere dă o medie de 18." },
        { q: "Care este diferența dintre medie și mediană?", a: "Media este suma împărțită la număr ('media aritmetică'), în timp ce mediana este valoarea din mijloc atunci când numerele sunt ordonate. Mediana este mai puțin afectată de valorile extreme decât media." },
        { q: "Funcționează cu numere negative sau zecimale?", a: "Da - introdu numerele negative cu un semn minus și zecimalele cu punct, separate prin virgulă sau spațiu ca și celelalte valori. Media, mediana și suma se calculează corect indiferent dacă amesteci numere pozitive, negative și zecimale." },
        { q: "Care este diferența dintre medie și medie ponderată?", a: "O medie simplă tratează toate numerele la fel, în timp ce o medie ponderată înmulțește fiecare număr cu importanța (ponderea) sa înainte de a împărți la suma ponderilor, astfel încât valorile mai importante (cum ar fi un test care valorează 40% din nota finală) cântăresc mai mult. Acest calculator calculează media simplă - pentru o medie ponderată, înmulțește fiecare valoare cu ponderea sa înainte de calcul." },
      ],
    },
  },

  "mortgage-calculator": {
    es: {
      title: "Calculadora de Hipoteca",
      intro: "Introduce el precio de la vivienda, el pago inicial, la tasa y el plazo para estimar tu pago mensual completo - capital, interés, impuesto predial y seguro.",
      description: "Estima tu pago hipotecario mensual total, incluidos impuestos y seguro.",
      faq: [
        { q: "¿Qué incluye esta estimación de pago hipotecario?", a: "Esta calculadora estima PITI: capital, interés, impuesto predial y seguro de vivienda. No incluye el PMI (si el pago inicial es menor al 20%) ni las cuotas de HOA, que varían según el prestamista y la propiedad." },
        { q: "¿Cómo afecta el pago inicial a mi pago mensual?", a: "Un pago inicial mayor reduce el monto del préstamo, lo que disminuye tanto la porción de capital e interés de tu pago como el interés total pagado durante el plazo del préstamo." },
        { q: "¿Qué sucede con mi pago si más adelante refinancio a una tasa más baja?", a: "Refinanciar recalcula tu préstamo a partir del nuevo saldo, la tasa y el plazo restante - incluso una caída de 1 punto en la tasa reduce de forma notable la parte de interés de cada pago, aunque los costos de cierre del nuevo préstamo deben sopesarse frente al ahorro." },
        { q: "¿Cómo afecta el plazo del préstamo al interés total pagado?", a: "Un plazo más corto (como 15 años frente a 30) implica pagos mensuales más altos pero mucho menos interés total, ya que se reduce el capital más rápido y hay menos tiempo para que se acumule interés. Un préstamo a 30 años reduce el pago mensual, pero a menudo cuesta más del doble en interés total que el mismo préstamo a 15 años." },
      ],
    },
    fr: {
      title: "Calculatrice de Prêt Immobilier",
      intro: "Saisissez le prix du bien, l'apport, le taux et la durée pour estimer votre mensualité complète - capital, intérêts, taxe foncière et assurance.",
      description: "Estimez votre mensualité de prêt immobilier totale, taxes et assurance incluses.",
      faq: [
        { q: "Qu'inclut cette estimation de mensualité ?", a: "Cette calculatrice estime le PITI - capital, intérêts, taxe foncière et assurance habitation. Elle n'inclut pas la PMI (si votre apport est inférieur à 20 %) ni les charges de copropriété, qui varient selon le prêteur et le bien." },
        { q: "Comment l'apport affecte-t-il ma mensualité ?", a: "Un apport plus élevé réduit le montant emprunté, ce qui diminue à la fois la part capital + intérêts de votre mensualité et le total des intérêts payés sur la durée du prêt." },
        { q: "Qu'arrive-t-il à ma mensualité si je refinance plus tard à un taux plus bas ?", a: "Le refinancement recalcule votre prêt à partir du nouveau solde, du nouveau taux et de la durée restante - même une baisse de 1 point de taux réduit sensiblement la part d'intérêts de chaque mensualité, bien que les frais de clôture du nouveau prêt doivent être mis en balance avec les économies réalisées." },
        { q: "Comment la durée du prêt affecte-t-elle le total des intérêts payés ?", a: "Une durée plus courte (comme 15 ans contre 30) signifie des mensualités plus élevées mais beaucoup moins d'intérêts au total, car le capital est remboursé plus vite et a moins de temps pour générer des intérêts. Un prêt sur 30 ans réduit la mensualité mais coûte souvent plus du double en intérêts totaux par rapport au même prêt sur 15 ans." },
      ],
    },
    de: {
      title: "Hypothekenrechner",
      intro: "Geben Sie Kaufpreis, Anzahlung, Zinssatz und Laufzeit ein, um Ihre vollständige monatliche Rate zu schätzen - Tilgung, Zinsen, Grundsteuer und Versicherung.",
      description: "Schätzen Sie Ihre monatliche Gesamtrate für die Hypothek, inklusive Steuern und Versicherung.",
      faq: [
        { q: "Was ist in dieser Hypothekenraten-Schätzung enthalten?", a: "Dieser Rechner schätzt PITI - Tilgung, Zinsen, Grundsteuer und Wohngebäudeversicherung. Nicht enthalten sind PMI (falls die Anzahlung unter 20% liegt) oder HOA-Gebühren, die je nach Kreditgeber und Immobilie variieren." },
        { q: "Wie wirkt sich die Anzahlung auf meine monatliche Rate aus?", a: "Eine höhere Anzahlung verringert die Darlehenssumme, was sowohl den Tilgungs- und Zinsanteil Ihrer Rate als auch die insgesamt über die Laufzeit gezahlten Zinsen senkt." },
        { q: "Was passiert mit meiner Rate, wenn ich später zu einem niedrigeren Zinssatz umschulde?", a: "Eine Umschuldung berechnet Ihr Darlehen anhand des neuen Saldos, Zinssatzes und der verbleibenden Laufzeit neu - selbst ein Rückgang des Zinssatzes um 1 % senkt den Zinsanteil jeder Rate spürbar, wobei die Abschlusskosten des neuen Darlehens gegen die Ersparnis abgewogen werden müssen." },
        { q: "Wie wirkt sich die Laufzeit des Darlehens auf die gesamten Zinskosten aus?", a: "Eine kürzere Laufzeit (z. B. 15 statt 30 Jahre) bedeutet höhere monatliche Raten, aber deutlich weniger Zinsen insgesamt, da die Restschuld schneller sinkt und weniger Zeit zum Verzinsen bleibt. Ein Darlehen über 30 Jahre senkt die monatliche Rate, kostet aber oft mehr als doppelt so viel an Gesamtzinsen wie dasselbe Darlehen über 15 Jahre." },
      ],
    },
    pt: {
      title: "Calculadora de Financiamento Imobiliário",
      intro: "Insira o preço do imóvel, a entrada, a taxa e o prazo para estimar seu pagamento mensal completo - principal, juros, imposto predial e seguro.",
      description: "Estime seu pagamento mensal total do financiamento imobiliário, incluindo impostos e seguro.",
      faq: [
        { q: "O que está incluído nesta estimativa de pagamento?", a: "Esta calculadora estima o PITI - principal, juros, imposto predial e seguro residencial. Não inclui o PMI (se a entrada for inferior a 20%) nem taxas de condomínio, que variam conforme o credor e o imóvel." },
        { q: "Como a entrada afeta meu pagamento mensal?", a: "Uma entrada maior reduz o valor do empréstimo, o que diminui tanto a parte de principal e juros do pagamento quanto o total de juros pagos ao longo do prazo do financiamento." },
        { q: "O que acontece com meu pagamento se eu refinanciar para uma taxa menor mais tarde?", a: "O refinanciamento recalcula seu empréstimo com base no novo saldo, na nova taxa e no prazo restante - mesmo uma queda de 1 ponto percentual na taxa reduz significativamente a parte de juros de cada pagamento, embora os custos de fechamento do novo empréstimo precisem ser comparados com a economia." },
        { q: "Como o prazo do empréstimo afeta o total de juros pagos?", a: "Um prazo mais curto (como 15 anos em vez de 30) significa parcelas mensais mais altas, mas muito menos juros totais, já que o saldo devedor diminui mais rápido e há menos tempo para acumular juros. Um empréstimo de 30 anos reduz a parcela mensal, mas geralmente custa mais do que o dobro em juros totais em comparação ao mesmo empréstimo em 15 anos." },
      ],
    },
    it: {
      title: "Calcolatrice del Mutuo",
      intro: "Inserisci prezzo dell'immobile, acconto, tasso e durata per stimare la rata mensile completa - capitale, interessi, imposta sulla proprietà e assicurazione.",
      description: "Stima la rata mensile totale del mutuo, comprese tasse e assicurazione.",
      faq: [
        { q: "Cosa include questa stima della rata del mutuo?", a: "Questa calcolatrice stima il PITI - capitale, interessi, imposta sulla proprietà e assicurazione sulla casa. Non include il PMI (se l'acconto è inferiore al 20%) né le spese condominiali, che variano in base al prestatore e all'immobile." },
        { q: "Come influisce l'acconto sulla mia rata mensile?", a: "Un acconto maggiore riduce l'importo del prestito, il che abbassa sia la quota capitale e interessi della rata sia il totale degli interessi pagati durante la durata del mutuo." },
        { q: "Cosa succede alla mia rata se in seguito rifinanzio a un tasso più basso?", a: "Il rifinanziamento ricalcola il tuo prestito in base al nuovo saldo, tasso e durata residua - anche un calo dell'1% del tasso riduce sensibilmente la quota interessi di ogni rata, anche se i costi di chiusura del nuovo prestito vanno soppesati rispetto al risparmio." },
        { q: "In che modo la durata del mutuo influisce sugli interessi totali pagati?", a: "Una durata più breve (ad esempio 15 anni anziché 30) significa rate mensili più alte ma interessi totali molto più bassi, poiché il capitale si riduce più rapidamente e ha meno tempo per maturare interessi. Un mutuo a 30 anni abbassa la rata mensile ma spesso costa più del doppio in interessi totali rispetto allo stesso mutuo a 15 anni." },
      ],
    },
    ja: {
      title: "住宅ローン計算機",
      intro: "物件価格、頭金、金利、返済期間を入力すると、元金・利息・固定資産税・保険料を含めた毎月の返済額の概算がわかります。",
      description: "税金と保険料を含めた住宅ローンの月々の総返済額を概算します。",
      faq: [
        { q: "この住宅ローン返済額の見積もりには何が含まれますか？", a: "この計算機はPITI（元金・利息・固定資産税・住宅保険）を概算します。頭金が20%未満の場合のPMI（民間住宅ローン保険）やHOA（管理費）は含まれておらず、これらは貸し手や物件によって異なります。" },
        { q: "頭金は月々の返済額にどう影響しますか？", a: "頭金が多いほど借入額が減り、返済額のうち元金・利息部分と、返済期間全体で支払う利息の総額の両方が少なくなります。" },
        { q: "後でより低い金利に借り換えると、返済額はどうなりますか？", a: "借り換えでは、新しい残高・金利・残りの返済期間に基づいてローンが再計算されます。わずか1%の金利低下でも各回の利息部分は大きく下がりますが、新しいローンの諸費用と節約額を比較検討する必要があります。" },
        { q: "ローンの返済期間は総支払利息にどう影響しますか？", a: "返済期間が短い（30年ではなく15年など）と、月々の返済額は高くなりますが、元金の減りが早く利息が発生する期間も短いため、総利息はかなり少なくなります。30年ローンは月々の返済額を抑えられますが、同じ借入額の15年ローンに比べて総利息が2倍以上になることもよくあります。" },
      ],
    },
    ro: {
      title: "Calculator de Credit Ipotecar",
      intro: "Introdu prețul locuinței, avansul, rata dobânzii și durata împrumutului pentru a estima rata lunară, incluzând principalul, dobânda, taxele și asigurarea.",
      description: "Estimează rata lunară totală a unui credit ipotecar, incluzând taxele și asigurarea.",
      faq: [
        { q: "Ce include această estimare a ratei ipotecare?", a: "Calculatorul estimează PITI (principal, dobândă, taxe și asigurare pentru locuință). Nu include PMI (asigurare ipotecară privată, dacă avansul este sub 20%) sau taxele de asociație de proprietari, care variază în funcție de creditor și proprietate." },
        { q: "Cum influențează avansul rata lunară?", a: "Un avans mai mare reduce suma împrumutată, ceea ce scade atât partea de principal și dobândă a ratei, cât și dobânda totală plătită pe durata împrumutului." },
        { q: "Ce se întâmplă cu rata dacă refinanțez mai târziu la o dobândă mai mică?", a: "Refinanțarea recalculează împrumutul pe baza noului sold, a noii dobânzi și a duratei rămase. Chiar și o scădere de 1 punct procentual poate reduce semnificativ partea de dobândă din fiecare rată, dar merită să compari costurile de închidere ale noului credit cu economiile obținute." },
        { q: "Cum influențează durata împrumutului dobânda totală plătită?", a: "O durată mai scurtă (15 ani în loc de 30) înseamnă rate lunare mai mari, dar principalul scade mai repede și dobânda se acumulează pe o perioadă mai scurtă, ceea ce reduce semnificativ dobânda totală. Un împrumut pe 30 de ani reduce rata lunară, dar deseori dublează sau depășește dobânda totală plătită pentru aceeași sumă împrumutată pe 15 ani." },
      ],
    },
  },

  "loan-calculator": {
    es: {
      title: "Calculadora de Pago de Préstamo",
      intro: "Esta calculadora de préstamos estima tu pago mensual fijo - solo introduce el monto del préstamo, la tasa de interés anual y el plazo.",
      description: "Estima tu pago mensual en un préstamo de tasa fija.",
      faq: [
        { q: "¿Cómo se calcula el pago de un préstamo?", a: "Los préstamos de tasa fija usan una fórmula de amortización basada en el capital, la tasa de interés periódica y el número de pagos, por lo que cada pago tiene el mismo monto, pero la proporción entre interés y capital cambia con el tiempo." },
        { q: "¿Esto incluye impuestos y seguro?", a: "No - esto es solo capital e interés. Las hipotecas en particular suelen incluir el impuesto predial y el seguro en el pago mensual (PITI), así que tu factura real del prestamista puede ser mayor que el número mostrado aquí." },
        { q: "¿Pagar extra cada mes reduce el interés total?", a: "Sí - cualquier pago superior al monto requerido se destina directamente al capital, lo que acorta el préstamo y reduce el interés total pagado, ya que el interés se calcula sobre el saldo restante en cada período." },
        { q: "¿Cómo afecta el plazo del préstamo al interés total pagado?", a: "Un plazo más largo reduce tu pago mensual pero aumenta el interés total pagado, ya que pides prestado el mismo monto durante más períodos; un plazo más corto sube el pago pero reduce el interés total - el equilibrio depende de qué monto mensual puedas afrontar cómodamente." },
        { q: "¿Es lo mismo que un simulador de préstamo?", a: "Sí - \"simulador de préstamo\" es solo otro nombre para una calculadora de pago de préstamo, y esta herramienta cubre ambos: introduce el capital, la tasa y el plazo para cualquier préstamo de tasa fija. Si estás financiando específicamente un vehículo, la calculadora de préstamo de auto es más adecuada, ya que también incluye el valor de la parte de cambio y el impuesto sobre ventas." },
      ],
    },
    fr: {
      title: "Calculatrice de Mensualité de Prêt",
      intro: "Cette calculatrice de prêt estime votre mensualité fixe - saisissez simplement le montant emprunté, le taux d'intérêt annuel et la durée.",
      description: "Estimez votre mensualité sur un prêt à taux fixe.",
      faq: [
        { q: "Comment la mensualité d'un prêt est-elle calculée ?", a: "Les prêts à taux fixe utilisent une formule d'amortissement basée sur le capital, le taux d'intérêt périodique et le nombre de versements, si bien que chaque mensualité a le même montant, mais la répartition intérêts/capital évolue dans le temps." },
        { q: "Cela inclut-il les taxes et l'assurance ?", a: "Non - il s'agit uniquement du capital et des intérêts. Les prêts immobiliers en particulier incluent souvent la taxe foncière et l'assurance dans la mensualité (PITI), donc votre facture réelle auprès du prêteur peut être supérieure au montant affiché ici." },
        { q: "Payer un supplément chaque mois réduit-il les intérêts totaux ?", a: "Oui - tout paiement au-delà du montant requis va directement au capital, ce qui raccourcit le prêt et réduit le total des intérêts payés, puisque les intérêts sont calculés sur le solde restant à chaque période." },
        { q: "Comment la durée du prêt affecte-t-elle le total des intérêts payés ?", a: "Une durée plus longue réduit votre mensualité mais augmente le total des intérêts payés, puisque vous empruntez le même montant sur plus de périodes ; une durée plus courte augmente la mensualité mais réduit le total des intérêts - l'arbitrage dépend du montant mensuel que vous pouvez confortablement vous permettre." },
        { q: "Est-ce la même chose qu'un simulateur de prêt ?", a: "Oui - « simulateur de prêt » est simplement un autre nom pour une calculatrice de mensualité de prêt, et cet outil couvre les deux : saisissez le capital, le taux et la durée pour n'importe quel prêt à taux fixe. Si vous financez spécifiquement un véhicule, la calculatrice de prêt auto est plus adaptée, car elle prend aussi en compte la valeur de reprise et la taxe de vente." },
      ],
    },
    de: {
      title: "Kreditratenrechner",
      intro: "Dieser Kreditrechner schätzt Ihre feste monatliche Rate - geben Sie einfach die Darlehenssumme, den Jahreszins und die Laufzeit ein.",
      description: "Schätzen Sie Ihre monatliche Rate für ein Darlehen mit festem Zinssatz.",
      faq: [
        { q: "Wie wird eine Kreditrate berechnet?", a: "Darlehen mit festem Zinssatz verwenden eine Tilgungsformel basierend auf der Darlehenssumme, dem periodischen Zinssatz und der Anzahl der Raten, sodass jede Rate gleich hoch ist, sich aber der Anteil von Zins und Tilgung im Zeitverlauf verschiebt." },
        { q: "Sind Steuern und Versicherung enthalten?", a: "Nein - dies sind nur Tilgung und Zinsen. Insbesondere Hypotheken bündeln Grundsteuer und Versicherung oft in der monatlichen Rate (PITI), sodass Ihre tatsächliche Rechnung des Kreditgebers höher ausfallen kann als der hier angezeigte Betrag." },
        { q: "Senkt eine zusätzliche monatliche Zahlung die Gesamtzinsen?", a: "Ja - jede Zahlung über dem erforderlichen Betrag fließt direkt in die Tilgung, was das Darlehen verkürzt und die insgesamt gezahlten Zinsen senkt, da die Zinsen jede Periode auf den verbleibenden Saldo berechnet werden." },
        { q: "Wie wirkt sich die Kreditlaufzeit auf die insgesamt gezahlten Zinsen aus?", a: "Eine längere Laufzeit senkt Ihre monatliche Rate, erhöht aber die insgesamt gezahlten Zinsen, da Sie denselben Betrag über mehr Perioden leihen; eine kürzere Laufzeit erhöht die Rate, senkt aber die Gesamtzinsen - der Kompromiss hängt davon ab, welchen monatlichen Betrag Sie sich bequem leisten können." },
        { q: "Ist das dasselbe wie ein Kreditsimulator?", a: "Ja - \"Kreditsimulator\" ist nur ein anderer Name für einen Kreditratenrechner, und dieses Tool deckt beides ab: Geben Sie Darlehenssumme, Zinssatz und Laufzeit für ein beliebiges Darlehen mit festem Zinssatz ein. Wenn Sie speziell ein Fahrzeug finanzieren, ist der Autokreditrechner besser geeignet, da er auch den Inzahlungnahmewert und die Umsatzsteuer berücksichtigt." },
      ],
    },
    pt: {
      title: "Calculadora de Pagamento de Empréstimo",
      intro: "Esta calculadora de empréstimo estima seu pagamento mensal fixo - basta inserir o valor do empréstimo, a taxa de juros anual e o prazo.",
      description: "Estime seu pagamento mensal em um empréstimo de taxa fixa.",
      faq: [
        { q: "Como é calculado o pagamento de um empréstimo?", a: "Empréstimos de taxa fixa usam uma fórmula de amortização baseada no principal, na taxa de juros periódica e no número de pagamentos, então cada pagamento tem o mesmo valor, mas a proporção entre juros e principal muda ao longo do tempo." },
        { q: "Isso inclui impostos e seguro?", a: "Não - isso é apenas principal e juros. Financiamentos imobiliários, em particular, costumam incluir imposto predial e seguro no pagamento mensal (PITI), então sua conta real do credor pode ser maior do que o valor mostrado aqui." },
        { q: "Pagar a mais todo mês reduz os juros totais?", a: "Sim - qualquer pagamento acima do valor exigido vai diretamente para o principal, o que encurta o empréstimo e reduz o total de juros pagos, já que os juros são calculados sobre o saldo restante a cada período." },
        { q: "Como o prazo do empréstimo afeta o total de juros pagos?", a: "Um prazo mais longo reduz seu pagamento mensal, mas aumenta o total de juros pagos, já que você toma emprestado o mesmo valor por mais períodos; um prazo mais curto aumenta o pagamento, mas reduz o total de juros - o equilíbrio depende de qual valor mensal você consegue pagar confortavelmente." },
        { q: "Isso é a mesma coisa que um simulador de empréstimo?", a: "Sim - \"simulador de empréstimo\" é apenas outro nome para uma calculadora de pagamento de empréstimo, e esta ferramenta cobre ambos: insira o valor principal, a taxa e o prazo para qualquer empréstimo de taxa fixa. Se você está financiando especificamente um veículo, a calculadora de empréstimo automotivo é mais adequada, já que também considera o valor de troca e o imposto sobre vendas." },
      ],
    },
    it: {
      title: "Calcolatrice della Rata del Prestito",
      intro: "Questa calcolatrice di prestito stima la tua rata mensile fissa - inserisci solo l'importo del prestito, il tasso di interesse annuo e la durata.",
      description: "Stima la tua rata mensile su un prestito a tasso fisso.",
      faq: [
        { q: "Come viene calcolata la rata di un prestito?", a: "I prestiti a tasso fisso usano una formula di ammortamento basata sul capitale, sul tasso di interesse periodico e sul numero di rate, quindi ogni rata ha lo stesso importo, ma la ripartizione tra interessi e capitale cambia nel tempo." },
        { q: "Questo include tasse e assicurazione?", a: "No - questo è solo capitale e interessi. I mutui, in particolare, spesso includono imposta sulla proprietà e assicurazione nella rata mensile (PITI), quindi la fattura reale del tuo prestatore potrebbe essere superiore all'importo mostrato qui." },
        { q: "Pagare di più ogni mese riduce gli interessi totali?", a: "Sì - qualsiasi pagamento superiore all'importo richiesto va direttamente al capitale, il che accorcia il prestito e riduce il totale degli interessi pagati, poiché gli interessi vengono calcolati sul saldo residuo ogni periodo." },
        { q: "In che modo la durata del prestito influisce sul totale degli interessi pagati?", a: "Una durata più lunga riduce la rata mensile ma aumenta il totale degli interessi pagati, poiché prendi in prestito lo stesso importo per più periodi; una durata più breve aumenta la rata ma riduce il totale degli interessi - il compromesso dipende da quale importo mensile puoi permetterti comodamente." },
        { q: "È la stessa cosa di un simulatore di prestito?", a: "Sì - \"simulatore di prestito\" è solo un altro nome per una calcolatrice della rata del prestito, e questo strumento copre entrambi: inserisci capitale, tasso e durata per qualsiasi prestito a tasso fisso. Se stai finanziando specificamente un veicolo, la calcolatrice del prestito auto è più adatta, poiché considera anche il valore della permuta e l'imposta sulle vendite." },
      ],
    },
    ja: {
      title: "ローン返済額計算機",
      intro: "このローン計算機は毎月の固定返済額を概算します。借入額、年利、返済期間を入力するだけです。",
      description: "固定金利ローンの毎月の返済額を概算します。",
      faq: [
        { q: "ローンの返済額はどのように計算されますか？", a: "固定金利ローンは、元金、期間ごとの金利、返済回数に基づく元利均等返済の計算式を使用するため、毎回の返済額は同じですが、利息と元金の割合は時間とともに変化します。" },
        { q: "これには税金や保険料が含まれますか？", a: "いいえ、これは元金と利息のみです。特に住宅ローンでは、固定資産税や保険料が毎月の返済額（PITI）に含まれることが多いため、実際の貸し手からの請求額はここに表示される金額より高くなる場合があります。" },
        { q: "毎月多めに支払うと総利息は減りますか？", a: "はい。必要額を超える支払い分はすべて元金に充てられるため、ローン期間が短縮され、支払う総利息が減ります。これは各期間の利息が残高に対して計算されるためです。" },
        { q: "返済期間は支払う総利息にどう影響しますか？", a: "返済期間を長くすると毎月の返済額は下がりますが、同じ金額をより多くの期間借りることになるため総利息は増えます。期間を短くすると返済額は上がりますが総利息は減ります。どちらを選ぶかは、無理なく支払える毎月の金額次第です。" },
        { q: "ローンシミュレーターと同じものですか？", a: "はい。「ローンシミュレーター」はローン返済額計算機の別の呼び方に過ぎず、このツールはどちらの用途にも対応します。元金、金利、返済期間を入力すれば、固定金利のどんなローンにも使えます。車の購入資金を計算したい場合は、下取り額や消費税も考慮できるオートローン計算機の方が適しています。" },
      ],
    },
    ro: {
      title: "Calculator de Rată la Împrumut",
      intro: "Acest calculator de împrumuturi estimează rata lunară fixă. Introdu suma împrumutată, rata anuală a dobânzii și durata împrumutului.",
      description: "Estimează rata lunară pentru un împrumut cu dobândă fixă.",
      faq: [
        { q: "Cum se calculează rata unui împrumut?", a: "Un împrumut cu dobândă fixă folosește formula de amortizare, bazată pe principal, rata dobânzii pe perioadă și numărul de rate, astfel încât fiecare rată este egală, dar proporția dintre dobândă și principal se schimbă în timp." },
        { q: "Include acest calcul taxe sau asigurare?", a: "Nu, acesta este doar principalul și dobânda. Mai ales la creditele ipotecare, taxele și asigurarea sunt adesea incluse în rata lunară (PITI), deci factura reală de la creditor poate fi mai mare decât suma afișată aici." },
        { q: "Reduce dobânda totală dacă plătesc mai mult în fiecare lună?", a: "Da - orice sumă plătită peste rata cerută se aplică principalului, ceea ce scurtează durata împrumutului și reduce dobânda totală plătită, deoarece dobânda pentru fiecare perioadă se calculează pe baza soldului rămas." },
        { q: "Cum influențează durata împrumutului dobânda totală plătită?", a: "O durată mai lungă reduce rata lunară, dar crește dobânda totală, deoarece împrumuți aceeași sumă pe o perioadă mai lungă. O durată mai scurtă crește rata lunară, dar reduce dobânda totală. Alegerea depinde de ce sumă lunară îți poți permite confortabil." },
        { q: "Este același lucru cu un simulator de împrumut?", a: "Da - un \"simulator de împrumut\" este pur și simplu un alt nume pentru un calculator de rată la împrumut, iar acest instrument funcționează pentru ambele scopuri. Introdu principalul, rata dobânzii și durata pentru orice împrumut cu dobândă fixă. Dacă vrei să finanțezi o mașină, calculatorul de credit auto e mai potrivit, deoarece ia în calcul și valoarea de schimb și taxele." },
      ],
    },
  },

  "compound-interest-calculator": {
    es: {
      title: "Calculadora de Interés Compuesto",
      intro: "Introduce un capital inicial, una tasa de interés, la frecuencia de capitalización y un plazo para ver cuánto podría crecer tu dinero.",
      description: "Calcula cómo crece una suma de dinero con el tiempo mediante interés compuesto.",
      faq: [
        { q: "¿Cuál es la fórmula del interés compuesto?", a: "A = P(1 + r/n)^(nt) - donde P es el capital, r es la tasa anual, n es el número de capitalizaciones por año y t es el tiempo en años." },
        { q: "¿Cómo afecta la frecuencia de capitalización al crecimiento?", a: "Una capitalización más frecuente (diaria frente a anual) produce rendimientos ligeramente mayores con la misma tasa nominal, ya que el interés empieza a generar interés antes - aunque la diferencia suele ser pequeña con tasas de ahorro típicas." },
        { q: "¿Cuánta diferencia hace empezar unos años antes?", a: "Una diferencia significativa: como el crecimiento se compone sobre sí mismo, el dinero invertido 5 o 10 años antes a la misma tasa termina siendo sustancialmente mayor, no solo proporcionalmente mayor, ya que las aportaciones más tempranas tienen más períodos de capitalización trabajando sobre ellas." },
        { q: "¿El interés compuesto es siempre mejor que el interés simple?", a: "El interés compuesto genera intereses tanto sobre el capital como sobre los intereses ya obtenidos, por lo que siempre supera al interés simple (que solo genera intereses sobre el capital original) si se le da tiempo suficiente. Cuanto más largo sea el horizonte temporal y mayor la frecuencia de capitalización, mayor será la diferencia." },
      ],
    },
    fr: {
      title: "Calculatrice d'Intérêts Composés",
      intro: "Saisissez un capital initial, un taux d'intérêt, une fréquence de capitalisation et une durée pour voir combien votre argent pourrait rapporter.",
      description: "Calculez comment une somme d'argent croît dans le temps grâce aux intérêts composés.",
      faq: [
        { q: "Quelle est la formule des intérêts composés ?", a: "A = P(1 + r/n)^(nt) - où P est le capital, r le taux annuel, n le nombre de capitalisations par an et t la durée en années." },
        { q: "Comment la fréquence de capitalisation affecte-t-elle la croissance ?", a: "Une capitalisation plus fréquente (quotidienne plutôt qu'annuelle) produit des rendements légèrement supérieurs à taux nominal égal, car les intérêts commencent à produire des intérêts plus tôt - même si la différence reste généralement faible aux taux d'épargne courants." },
        { q: "Quelle différence cela fait-il de commencer quelques années plus tôt ?", a: "Une différence significative : comme la croissance se compose sur elle-même, l'argent investi 5 ou 10 ans plus tôt au même taux finit par être nettement plus important, pas seulement proportionnellement plus important, car les apports plus anciens bénéficient de davantage de périodes de capitalisation." },
        { q: "Les intérêts composés sont-ils toujours meilleurs que les intérêts simples ?", a: "Les intérêts composés rapportent des intérêts à la fois sur le capital et sur les intérêts déjà générés, ils finissent donc toujours par dépasser les intérêts simples (qui ne rapportent que sur le capital initial) si l'on attend assez longtemps. Plus l'horizon temporel est long et plus la fréquence de capitalisation est élevée, plus l'écart se creuse." },
      ],
    },
    de: {
      title: "Zinseszinsrechner",
      intro: "Geben Sie einen Anfangsbetrag, einen Zinssatz, die Zinsperiode und einen Zeitraum ein, um zu sehen, wie stark Ihr Geld wachsen könnte.",
      description: "Berechnen Sie, wie eine Geldsumme durch Zinseszins über die Zeit wächst.",
      faq: [
        { q: "Wie lautet die Formel für Zinseszins?", a: "A = P(1 + r/n)^(nt) - wobei P das Kapital, r der Jahreszins, n die Anzahl der Zinsperioden pro Jahr und t die Zeit in Jahren ist." },
        { q: "Wie wirkt sich die Zinsperiode auf das Wachstum aus?", a: "Häufigere Verzinsung (täglich statt jährlich) führt bei gleichem Nominalzins zu etwas höheren Erträgen, da Zinsen früher beginnen, selbst Zinsen zu erwirtschaften - der Unterschied ist bei üblichen Sparzinsen aber meist gering." },
        { q: "Wie groß ist der Unterschied, wenn man einige Jahre früher beginnt?", a: "Ein erheblicher - da das Wachstum sich selbst verstärkt, wird Geld, das 5 oder 10 Jahre früher zum gleichen Zinssatz angelegt wird, am Ende deutlich größer, nicht nur proportional größer, da die früheren Einzahlungen mehr Zinsperioden zur Verfügung haben." },
        { q: "Sind Zinseszinsen immer besser als einfache Zinsen?", a: "Zinseszinsen erwirtschaften Zinsen sowohl auf das Kapital als auch auf bereits erhaltene Zinsen, sodass sie bei ausreichend Zeit immer die einfachen Zinsen (die nur auf das ursprüngliche Kapital anfallen) übertreffen. Je länger der Zeithorizont und je höher die Zinseszinsfrequenz, desto größer wird der Unterschied." },
      ],
    },
    pt: {
      title: "Calculadora de Juros Compostos",
      intro: "Insira um valor principal, taxa de juros, frequência de capitalização e período de tempo para ver quanto seu dinheiro pode crescer.",
      description: "Calcule como uma quantia cresce ao longo do tempo com juros compostos.",
      faq: [
        { q: "Qual é a fórmula dos juros compostos?", a: "A = P(1 + r/n)^(nt) - onde P é o principal, r é a taxa anual, n é o número de capitalizações por ano e t é o tempo em anos." },
        { q: "Como a frequência de capitalização afeta o crescimento?", a: "Uma capitalização mais frequente (diária em vez de anual) produz retornos ligeiramente maiores com a mesma taxa nominal, já que os juros começam a render juros mais cedo - embora a diferença costume ser pequena em taxas de poupança típicas." },
        { q: "Quanta diferença faz começar alguns anos antes?", a: "Uma diferença significativa: como o crescimento se compõe sobre si mesmo, o dinheiro investido 5 ou 10 anos antes na mesma taxa acaba sendo substancialmente maior, não apenas proporcionalmente maior, já que as contribuições mais antigas têm mais períodos de capitalização trabalhando a seu favor." },
        { q: "Os juros compostos são sempre melhores que os juros simples?", a: "Os juros compostos rendem juros tanto sobre o capital quanto sobre os juros já obtidos, por isso sempre superam os juros simples (que rendem apenas sobre o capital original) com tempo suficiente. Quanto maior o horizonte de tempo e a frequência de capitalização, maior a diferença." },
      ],
    },
    it: {
      title: "Calcolatrice dell'Interesse Composto",
      intro: "Inserisci un capitale iniziale, un tasso di interesse, la frequenza di capitalizzazione e un periodo di tempo per vedere quanto potrebbe crescere il tuo denaro.",
      description: "Calcola come una somma cresce nel tempo con l'interesse composto.",
      faq: [
        { q: "Qual è la formula dell'interesse composto?", a: "A = P(1 + r/n)^(nt) - dove P è il capitale, r è il tasso annuo, n è il numero di capitalizzazioni all'anno e t è il tempo in anni." },
        { q: "Come influisce la frequenza di capitalizzazione sulla crescita?", a: "Una capitalizzazione più frequente (giornaliera anziché annuale) produce rendimenti leggermente più alti allo stesso tasso nominale, poiché gli interessi iniziano a generare interessi prima - anche se la differenza è solitamente piccola ai tassi di risparmio tipici." },
        { q: "Quanta differenza fa iniziare qualche anno prima?", a: "Una differenza significativa: poiché la crescita si compone su se stessa, il denaro investito 5 o 10 anni prima allo stesso tasso finisce per essere sostanzialmente maggiore, non solo proporzionalmente maggiore, poiché i contributi più anticipati hanno più periodi di capitalizzazione a proprio favore." },
        { q: "L'interesse composto è sempre migliore dell'interesse semplice?", a: "L'interesse composto genera interessi sia sul capitale sia sugli interessi già maturati, quindi con abbastanza tempo supera sempre l'interesse semplice (che matura solo sul capitale iniziale). Più lungo è l'orizzonte temporale e più alta è la frequenza di capitalizzazione, maggiore sarà il divario." },
      ],
    },
    ja: {
      title: "複利計算機",
      intro: "元金、金利、複利計算の頻度、期間を入力すると、お金がどれだけ増える可能性があるかがわかります。",
      description: "複利によって、まとまった金額が時間とともにどう増えるかを計算します。",
      faq: [
        { q: "複利の計算式は？", a: "A = P(1 + r/n)^(nt) - Pは元金、rは年利、nは年間の複利計算回数、tは年数です。" },
        { q: "複利計算の頻度は増え方にどう影響しますか？", a: "複利計算の頻度が高いほど（年1回より毎日など）、同じ表示金利でもわずかに高いリターンになります。これは利息がより早く利息を生み始めるためですが、一般的な貯蓄金利では差はわずかです。" },
        { q: "数年早く始めると、どれくらいの差が生まれますか？", a: "大きな差が生まれます。複利は自己増殖的に働くため、同じ利率でも5年、10年早く投資したお金は、比例的に大きくなるだけでなく、それ以上に大きく増える傾向があります。早い時期の資金ほど、複利が効く期間が長くなるためです。" },
        { q: "複利は常に単利より有利ですか？", a: "複利は元金だけでなく、それまでに得た利息にも利息がつくため、十分な時間があれば必ず単利（元金にのみ利息がつく）を上回ります。運用期間が長いほど、また複利計算の頻度が高いほど、その差はさらに大きくなります。" },
      ],
    },
    ro: {
      title: "Calculator de Dobândă Compusă",
      intro: "Introdu suma inițială, rata dobânzii, frecvența capitalizării și durata pentru a vedea cât de mult pot crește banii tăi.",
      description: "Calculează cum crește o sumă de bani în timp prin dobândă compusă.",
      faq: [
        { q: "Care este formula dobânzii compuse?", a: "A = P(1 + r/n)^(nt) - unde P este suma inițială, r este rata anuală a dobânzii, n este numărul de capitalizări pe an, iar t este numărul de ani." },
        { q: "Cum influențează frecvența capitalizării creșterea sumei?", a: "O capitalizare mai frecventă (zilnic în loc de anual) generează un randament ușor mai mare la aceeași rată nominală, deoarece dobânda începe să genereze dobândă mai repede - deși diferența este mică la ratele tipice de economisire." },
        { q: "Cât de mare este diferența dacă încep cu câțiva ani mai devreme?", a: "Substanțială. Deoarece dobânda compusă se auto-alimentează, banii investiți cu 5 sau 10 ani mai devreme la aceeași rată tind să crească mai mult decât proporțional, nu doar proporțional, pentru că au mai mult timp la dispoziție pentru capitalizare." },
        { q: "Este dobânda compusă întotdeauna mai bună decât dobânda simplă?", a: "Dobânda compusă depășește întotdeauna dobânda simplă (care se calculează doar la suma inițială) dat fiind timp suficient, deoarece se calculează atât la suma inițială, cât și la dobânda deja acumulată. Diferența crește cu cât perioada este mai lungă și capitalizarea mai frecventă." },
      ],
    },
  },

  "concrete-calculator": {
    es: {
      title: "Calculadora de Concreto",
      intro: "Introduce las dimensiones de la losa para estimar cuánto concreto premezclado o cuántas bolsas necesitarás, con un margen de desperdicio incluido.",
      description: "Estima las yardas cúbicas y el número de bolsas para una losa de concreto.",
      faq: [
        { q: "¿Cuánto concreto necesito para una losa de 10x10?", a: "Con un grosor de 4 pulgadas, una losa de 10×10 pies necesita aproximadamente 1,23 yardas cúbicas antes del margen de desperdicio - unas 74 bolsas de mezcla de 80 lb." },
        { q: "¿Por qué añadir un margen de desperdicio?", a: "Una subrasante irregular, derrames y excavación excesiva suelen usar entre un 5% y un 10% más de material del que sugieren los cálculos exactos." },
        { q: "¿Puedo usar esto para una losa no rectangular?", a: "Divide la forma irregular en secciones rectangulares, calcula cada una por separado con esta herramienta y luego suma los resultados - el cálculo de largo × ancho × grosor solo funciona bien con rectángulos, así que dividir un área en forma de L o curva en piezas más simples es la solución habitual." },
        { q: "¿Cómo se tiene en cuenta el grosor de la losa en el cálculo?", a: "Multiplica el largo por el ancho de la losa para obtener el área, luego multiplica por el grosor (convertido a pies) para obtener pies cúbicos, y divide entre 27 para obtener yardas cúbicas. Una losa más gruesa necesita proporcionalmente más concreto - duplicar el grosor duplica el volumen para la misma superficie." },
      ],
    },
    fr: {
      title: "Calculatrice de Béton",
      intro: "Saisissez les dimensions de la dalle pour estimer la quantité de béton prêt à l'emploi ou le nombre de sacs nécessaires, avec une marge de perte incluse.",
      description: "Estimez le volume en mètres cubes et le nombre de sacs pour une dalle de béton.",
      faq: [
        { q: "De combien de béton ai-je besoin pour une dalle de 3x3 m ?", a: "Sur une épaisseur de 10 cm, une dalle de 3×3 m nécessite environ 0,9 m³ avant marge de perte - soit environ 36 sacs de mélange de 35 kg." },
        { q: "Pourquoi ajouter une marge de perte ?", a: "Un sous-sol irrégulier, les déversements et le surcreusement consomment généralement 5 à 10 % de matériau en plus que ce que suggère le calcul exact." },
        { q: "Puis-je utiliser cet outil pour une dalle non rectangulaire ?", a: "Découpez la forme irrégulière en sections rectangulaires, calculez chacune séparément avec cet outil, puis additionnez les résultats - le calcul longueur × largeur × épaisseur ne fonctionne proprement que sur des rectangles, donc diviser une surface en L ou courbe en morceaux plus simples est la solution habituelle." },
        { q: "Comment l'épaisseur de la dalle est-elle prise en compte dans le calcul ?", a: "Multipliez la longueur par la largeur de la dalle pour obtenir la surface, puis multipliez par l'épaisseur (convertie en pieds) pour obtenir des pieds cubes, et divisez par 27 pour obtenir des verges cubes. Une dalle plus épaisse nécessite proportionnellement plus de béton - doubler l'épaisseur double le volume pour la même surface." },
      ],
    },
    de: {
      title: "Betonrechner",
      intro: "Geben Sie die Plattenmaße ein, um zu schätzen, wie viel Fertigbeton oder wie viele Säcke Sie benötigen, inklusive eingebautem Verschnittzuschlag.",
      description: "Schätzen Sie Kubikmeter und Sackzahl für eine Betonplatte.",
      faq: [
        { q: "Wie viel Beton brauche ich für eine 3x3-m-Platte?", a: "Bei 10 cm Dicke benötigt eine 3×3-m-Platte vor dem Verschnittzuschlag etwa 0,9 m³ - rund 36 Säcke einer 35-kg-Mischung." },
        { q: "Warum einen Verschnittzuschlag hinzufügen?", a: "Unebener Untergrund, Verschütten und Übererdaushub verbrauchen typischerweise 5-10% mehr Material, als die reine Rechnung nahelegt." },
        { q: "Kann ich das für eine nicht rechteckige Platte verwenden?", a: "Teilen Sie eine unregelmäßige Form in rechteckige Abschnitte auf, berechnen Sie jeden Abschnitt separat mit diesem Tool und addieren Sie die Ergebnisse - die Rechnung Länge × Breite × Dicke funktioniert nur bei Rechtecken sauber, daher ist das Aufteilen einer L-förmigen oder gebogenen Fläche in einfachere Teile die übliche Lösung." },
        { q: "Wie wird die Plattendicke in die Berechnung einbezogen?", a: "Multiplizieren Sie die Länge der Platte mit der Breite, um die Fläche zu erhalten, dann mit der Dicke (in Fuß umgerechnet), um Kubikfuß zu erhalten, und teilen Sie durch 27, um Kubikyards zu erhalten. Eine dickere Platte benötigt proportional mehr Beton - eine Verdopplung der Dicke verdoppelt das Volumen bei gleicher Grundfläche." },
      ],
    },
    pt: {
      title: "Calculadora de Concreto",
      intro: "Insira as dimensões da laje para estimar quanto concreto pré-misturado ou quantos sacos você vai precisar, com uma margem de desperdício incluída.",
      description: "Estime o volume em metros cúbicos e a quantidade de sacos para uma laje de concreto.",
      faq: [
        { q: "Quanto concreto preciso para uma laje de 3x3 m?", a: "Com 10 cm de espessura, uma laje de 3×3 m precisa de aproximadamente 0,9 m³ antes da margem de desperdício - cerca de 36 sacos de mistura de 35 kg." },
        { q: "Por que adicionar uma margem de desperdício?", a: "Subleito irregular, derramamentos e escavação em excesso normalmente usam de 5% a 10% mais material do que o cálculo exato sugere." },
        { q: "Posso usar isso para uma laje não retangular?", a: "Divida o formato irregular em seções retangulares, calcule cada uma separadamente com esta ferramenta e depois some os resultados - o cálculo de comprimento × largura × espessura só funciona bem em retângulos, então dividir uma área em L ou curva em partes mais simples é a solução padrão." },
        { q: "Como a espessura da laje é considerada no cálculo?", a: "Multiplique o comprimento pela largura da laje para obter a área, depois multiplique pela espessura (convertida em pés) para obter pés cúbicos, e divida por 27 para obter jardas cúbicas. Uma laje mais espessa precisa de concreto proporcionalmente maior - dobrar a espessura dobra o volume para a mesma área." },
      ],
    },
    it: {
      title: "Calcolatrice del Calcestruzzo",
      intro: "Inserisci le dimensioni della soletta per stimare quanto calcestruzzo pronto o quanti sacchi ti serviranno, con un margine di spreco incluso.",
      description: "Stima i metri cubi e il numero di sacchi per una soletta di calcestruzzo.",
      faq: [
        { q: "Quanto calcestruzzo mi serve per una soletta di 3x3 m?", a: "Con uno spessore di 10 cm, una soletta di 3×3 m richiede circa 0,9 m³ prima del margine di spreco - circa 36 sacchi di miscela da 35 kg." },
        { q: "Perché aggiungere un margine di spreco?", a: "Un sottofondo irregolare, versamenti e scavo eccessivo generalmente utilizzano dal 5% al 10% di materiale in più rispetto a quanto suggerisce il calcolo esatto." },
        { q: "Posso usarlo per una soletta non rettangolare?", a: "Suddividi la forma irregolare in sezioni rettangolari, calcola ciascuna separatamente con questo strumento, poi somma i risultati - il calcolo lunghezza × larghezza × spessore funziona correttamente solo sui rettangoli, quindi dividere un'area a L o curva in parti più semplici è la soluzione standard." },
        { q: "Come si tiene conto dello spessore della soletta nel calcolo?", a: "Moltiplica la lunghezza per la larghezza della soletta per ottenere l'area, poi moltiplica per lo spessore (convertito in piedi) per ottenere i piedi cubi, e dividi per 27 per ottenere le iarde cube. Una soletta più spessa richiede proporzionalmente più cemento - raddoppiare lo spessore raddoppia il volume a parità di superficie." },
      ],
    },
    ja: {
      title: "コンクリート計算機",
      intro: "スラブの寸法を入力すると、必要な生コンクリートの量、または必要な袋数の概算がわかります（ロス分も考慮済み）。",
      description: "コンクリートスラブに必要な立方メートル数と袋数を概算します。",
      faq: [
        { q: "3×3mのスラブにはどれくらいのコンクリートが必要ですか？", a: "厚さ10cmの場合、3×3mのスラブにはロス分を除いて約0.9m³必要です - 35kg入りの袋で約36袋分です。" },
        { q: "なぜロス分の余裕を見る必要がありますか？", a: "下地の不陸、こぼれ、余分な掘削などにより、通常は正確な計算よりも5〜10%多くの材料が必要になります。" },
        { q: "長方形以外の形のスラブにも使えますか？", a: "不規則な形状を長方形のセクションに分割し、それぞれをこのツールで個別に計算してから合計してください。長さ×幅×厚さの計算は長方形でのみ正確に機能するため、L字型や曲線状のエリアはより単純な形に分割するのが一般的な対処法です。" },
        { q: "計算でスラブの厚さはどう扱われますか？", a: "スラブの縦×横で面積を求め、それに厚さ（フィートに換算）を掛けて立方フィートを求め、27で割ると立方ヤードになります。厚みが増すほど必要なコンクリート量は比例して増え、同じ面積でも厚さを2倍にすれば体積も2倍になります。" },
      ],
    },
    ro: {
      title: "Calculator de Beton",
      intro: "Introdu dimensiunile plăcii pentru a estima cât beton gata amestecat sau câte saci vei avea nevoie, cu marja de pierdere inclusă.",
      description: "Estimează metrii cubi și numărul de saci de beton necesari pentru o placă.",
      faq: [
        { q: "Câtă beton îmi trebuie pentru o placă de 3×3m?", a: "Pentru o grosime de 10cm, o placă de 3×3m are nevoie de aproximativ 0,9 m³ de beton, fără marja de pierdere - adică aproximativ 36 de saci de 35kg." },
        { q: "De ce am nevoie de o marjă de pierdere?", a: "Neregularitățile terenului, scurgerile de material și săpăturile suplimentare fac de obicei necesară cu 5-10% mai multă cantitate decât calculul exact." },
        { q: "Funcționează pentru plăci care nu sunt dreptunghiulare?", a: "Împarte forma neregulată în secțiuni dreptunghiulare, calculează fiecare separat cu acest instrument, apoi adună rezultatele. Calculul lungime × lățime × grosime funcționează exact doar pentru dreptunghiuri, deci împărțirea unei zone în formă de L sau curbate în forme mai simple este abordarea standard." },
        { q: "Cum ia în calcul grosimea plăcii?", a: "Calculul înmulțește lungimea × lățimea plăcii pentru a obține suprafața, apoi înmulțește cu grosimea (convertită în metri) pentru a obține volumul, care se împarte apoi pentru a obține metri cubi. Cu cât grosimea este mai mare, cu atât crește proporțional cantitatea de beton necesară - dublarea grosimii pentru aceeași suprafață dublează și volumul." },
      ],
    },
  },

  "flooring-calculator": {
    es: {
      title: "Calculadora de Piso",
      intro: "Introduce el área de tu habitación, la cobertura por caja y un margen de desperdicio para estimar cuántas cajas de piso comprar.",
      description: "Estima cuántas cajas de piso necesitas para una habitación.",
      faq: [
        { q: "¿Cuántas cajas de piso necesito para 25 m²?", a: "Con 2 m² por caja y un margen de desperdicio del 10%, 25 m² necesitan aproximadamente 14 cajas." },
        { q: "¿Por qué necesito piso adicional para el desperdicio?", a: "Los cortes alrededor de puertas, armarios y el ajuste de patrones consumen material extra - un margen del 10-15% evita que te quedes corto a mitad del proyecto." },
        { q: "¿El porcentaje de desperdicio cambia según el patrón del piso?", a: "Sí: un patrón de colocación recta suele necesitar solo un 5-10% extra, mientras que los diseños en diagonal o los patrones que requieren un ajuste preciso de las juntas (como el espiga) pueden necesitar un 15-20% extra debido a más cortes angulados y recortes descartados." },
        { q: "¿Debo comprar piso extra para futuras reparaciones?", a: "Sí - además del margen de desperdicio para los cortes durante la instalación, muchos instaladores recomiendan guardar una caja extra completa para que las piezas de repuesto coincidan con el lote de color original si una tabla o baldosa se daña más adelante, ya que los fabricantes cambian los lotes de color con el tiempo." },
      ],
    },
    fr: {
      title: "Calculatrice de Revêtement de Sol",
      intro: "Saisissez la surface de votre pièce, la couverture par boîte et une marge de perte pour estimer le nombre de boîtes de revêtement à acheter.",
      description: "Estimez le nombre de boîtes de revêtement de sol nécessaires pour une pièce.",
      faq: [
        { q: "Combien de boîtes de revêtement me faut-il pour 25 m² ?", a: "Avec 2 m² par boîte et une marge de perte de 10 %, 25 m² nécessitent environ 14 boîtes." },
        { q: "Pourquoi prévoir du revêtement supplémentaire pour la perte ?", a: "Les découpes autour des portes, des placards et le raccord des motifs consomment du matériau supplémentaire - une marge de 10 à 15 % évite de manquer de matériau en cours de projet." },
        { q: "Le pourcentage de perte change-t-il selon le motif de pose ?", a: "Oui - une pose droite ne nécessite généralement que 5 à 10 % de surplus, tandis que les poses en diagonale ou les motifs nécessitant un raccord précis des joints (comme le chevron) peuvent nécessiter 15 à 20 % de surplus en raison de coupes plus angulées et de chutes rejetées." },
        { q: "Devrais-je acheter du revêtement de sol supplémentaire pour de futures réparations ?", a: "Oui - au-delà de la marge de perte prévue pour les découpes lors de l'installation, de nombreux poseurs recommandent de garder une boîte entière supplémentaire de côté, afin que les pièces de remplacement correspondent au lot de teinte d'origine si une planche ou un carreau est endommagé plus tard, car les fabricants changent les lots de couleur au fil du temps." },
      ],
    },
    de: {
      title: "Bodenbelagsrechner",
      intro: "Geben Sie Ihre Raumfläche, die Deckung pro Karton und einen Verschnittzuschlag ein, um zu schätzen, wie viele Kartons Bodenbelag Sie kaufen sollten.",
      description: "Schätzen Sie, wie viele Kartons Bodenbelag Sie für einen Raum benötigen.",
      faq: [
        { q: "Wie viele Kartons Bodenbelag brauche ich für 25 m²?", a: "Bei 2 m² pro Karton und 10% Verschnittzuschlag benötigen 25 m² etwa 14 Kartons." },
        { q: "Warum brauche ich zusätzlichen Bodenbelag für Verschnitt?", a: "Zuschnitte an Türen, Schränken und der Musterausrichtung verbrauchen zusätzliches Material - ein Zuschlag von 10-15% verhindert, dass Ihnen mitten im Projekt das Material ausgeht." },
        { q: "Ändert sich der Verschnittanteil je nach Verlegemuster?", a: "Ja - eine gerade Verlegung benötigt in der Regel nur 5-10 % zusätzlich, während diagonale Verlegungen oder Muster mit präzisem Fugenversatz (wie Fischgrät) aufgrund von mehr Winkelschnitten und verworfenen Reststücken 15-20 % zusätzlich benötigen können." },
        { q: "Sollte ich zusätzlichen Bodenbelag für spätere Reparaturen kaufen?", a: "Ja - über den Verschnittzuschlag beim Verlegen hinaus empfehlen viele Verleger, eine ganze zusätzliche Packung aufzubewahren, damit Ersatzstücke bei späteren Beschädigungen zur ursprünglichen Farbcharge passen, da Hersteller ihre Farbchargen im Laufe der Zeit ändern." },
      ],
    },
    pt: {
      title: "Calculadora de Piso",
      intro: "Insira a área do seu cômodo, a cobertura por caixa e uma margem de desperdício para estimar quantas caixas de piso comprar.",
      description: "Estime quantas caixas de piso você precisa para um cômodo.",
      faq: [
        { q: "Quantas caixas de piso preciso para 25 m²?", a: "Com 2 m² por caixa e uma margem de desperdício de 10%, 25 m² precisam de aproximadamente 14 caixas." },
        { q: "Por que preciso de piso extra para o desperdício?", a: "Cortes ao redor de portas, armários e o encaixe de padrões consomem material extra - uma margem de 10-15% evita que você fique sem material no meio do projeto." },
        { q: "A porcentagem de desperdício muda de acordo com o padrão do piso?", a: "Sim - um padrão de instalação reta geralmente precisa de apenas 5-10% a mais, enquanto layouts diagonais ou padrões que exigem encaixe preciso das juntas (como espinha de peixe) podem precisar de 15-20% a mais devido a mais cortes angulados e sobras descartadas." },
        { q: "Devo comprar piso extra para reparos futuros?", a: "Sim - além da margem de desperdício para cortes durante a instalação, muitos instaladores recomendam guardar uma caixa extra completa para que as peças de reposição combinem com o lote de cor original caso uma tábua ou peça seja danificada depois, já que os fabricantes mudam os lotes de cor com o tempo." },
      ],
    },
    it: {
      title: "Calcolatrice del Pavimento",
      intro: "Inserisci la superficie della stanza, la copertura per scatola e un margine di spreco per stimare quante scatole di pavimento acquistare.",
      description: "Stima quante scatole di pavimento ti servono per una stanza.",
      faq: [
        { q: "Quante scatole di pavimento mi servono per 25 m²?", a: "Con 2 m² per scatola e un margine di spreco del 10%, 25 m² richiedono circa 14 scatole." },
        { q: "Perché mi serve del pavimento extra per lo spreco?", a: "I tagli intorno a porte, armadi e l'abbinamento dei motivi consumano materiale extra - un margine del 10-15% evita di rimanere senza materiale a metà progetto." },
        { q: "La percentuale di spreco cambia in base al motivo di posa del pavimento?", a: "Sì - una posa dritta di solito richiede solo il 5-10% in più, mentre le pose diagonali o i motivi che richiedono un abbinamento preciso delle giunture (come la spina di pesce) possono richiedere il 15-20% in più a causa di tagli più angolati e ritagli scartati." },
        { q: "Dovrei acquistare pavimento extra per riparazioni future?", a: "Sì - oltre alla percentuale di scarto per i tagli durante la posa, molti posatori consigliano di tenere da parte una scatola intera in più, così i pezzi di ricambio corrisponderanno al lotto di colore originale se un'asse o una piastrella si danneggia in seguito, poiché i produttori cambiano i lotti di colore nel tempo." },
      ],
    },
    ja: {
      title: "床材計算機",
      intro: "部屋の面積、1箱あたりの施工可能面積、ロス率を入力すると、必要な床材の箱数の概算がわかります。",
      description: "部屋に必要な床材の箱数を概算します。",
      faq: [
        { q: "25m²の部屋には床材が何箱必要ですか？", a: "1箱あたり2m²、ロス率10%の場合、25m²には約14箱必要です。" },
        { q: "なぜ余分に床材が必要なのですか？", a: "ドアや収納の周りのカットや柄合わせで余分な材料が必要になります。10〜15%の余裕を見ておくことで、施工途中で材料が足りなくなるのを防げます。" },
        { q: "床材のロス率は張り方によって変わりますか？", a: "はい。まっすぐ張る場合は通常5〜10%程度の余裕で済みますが、斜め張りやヘリンボーンのように継ぎ目を正確に合わせる必要があるパターンでは、角度のあるカットや廃棄する端材が増えるため15〜20%程度の余裕が必要になることがあります。" },
        { q: "将来の補修のために床材を多めに買っておくべきですか？", a: "はい。施工時のカット用の余剰分に加えて、多くの施工業者は箱を1つ余分に取っておくことを勧めています。メーカーは時間とともに色のロットを変更するため、後で板やタイルが破損した際に元の色合いに近い交換部材を確保できるからです。" },
      ],
    },
    ro: {
      title: "Calculator de Pardoseală",
      intro: "Introdu suprafața camerei, cât acoperă o cutie și marja de pierdere pentru a estima câte cutii de pardoseală ai nevoie.",
      description: "Estimează câte cutii de pardoseală îți trebuie pentru o cameră.",
      faq: [
        { q: "Câte cutii de pardoseală îmi trebuie pentru o cameră de 25m²?", a: "Cu 2m² per cutie și o marjă de pierdere de 10%, ai nevoie de aproximativ 14 cutii pentru 25m²." },
        { q: "De ce am nevoie de material în plus pentru pardoseală?", a: "Tăierile în jurul ușilor și dulapurilor, plus potrivirea modelului, consumă material suplimentar. O marjă de 10-15% te ferește să rămâi fără material la jumătatea lucrării." },
        { q: "Marja de pierdere pentru pardoseală variază în funcție de modelul de montaj?", a: "Da - montajul drept necesită de obicei doar 5-10% marjă, dar modele precum montajul în diagonală sau în os de pește, care necesită potrivire precisă a rosturilor, pot necesita 15-20% din cauza tăierilor unghiulare și a resturilor irosite." },
        { q: "Ar trebui să cumpăr material în plus pentru reparații viitoare?", a: "Da - pe lângă surplusul pentru tăieri în timpul montajului, mulți instalatori recomandă păstrarea unei cutii suplimentare deoparte, deoarece producătorii schimbă loturile de culoare în timp, ceea ce face dificilă găsirea unei potriviri exacte dacă o placă sau o dală se deteriorează mai târziu." },
      ],
    },
  },

  "calorie-calculator": {
    es: {
      title: "Calculadora de Calorías",
      intro: "Introduce tu edad, sexo, altura, peso y nivel de actividad para estimar tus necesidades calóricas diarias para mantener, perder o ganar peso.",
      description: "Calcula tus necesidades calóricas diarias para mantener, perder o ganar peso.",
      faq: [
        { q: "¿Cuántas calorías necesito para mantener mi peso?", a: "Depende de tu TMB y nivel de actividad - para un hombre de 30 años, 1,78 m y 82 kg con actividad moderada, el mantenimiento es de aproximadamente 2.763 calorías al día." },
        { q: "¿Cuántas calorías debo reducir para perder peso?", a: "Un déficit de unas 500 calorías diarias por debajo del mantenimiento es un objetivo común para perder aproximadamente 0,45 kg de peso por semana, ya que 0,45 kg de grasa corporal equivalen a unas 3.500 calorías." },
        { q: "¿Por qué dos personas con la misma edad, altura y peso obtienen resultados distintos?", a: "El nivel de actividad y el sexo influyen en la fórmula: un estilo de vida más activo eleva sustancialmente el objetivo calórico frente a alguien sedentario con las mismas medidas, y la fórmula de TMB subyacente también tiene en cuenta las diferencias típicas en la composición corporal entre hombres y mujeres." },
        { q: "¿Cuál es la diferencia entre la TMB y el objetivo calórico que da esta herramienta?", a: "La TMB es la energía que tu cuerpo quema en reposo total; el número de mantenimiento de esta calculadora - tu Gasto Energético Diario Total (TDEE) - suma tu nivel de actividad a la TMB, ya que el movimiento diario y el ejercicio queman calorías adicionales más allá de lo que tu cuerpo necesita solo para funcionar." },
      ],
    },
    fr: {
      title: "Calculatrice de Calories",
      intro: "Saisissez votre âge, sexe, taille, poids et niveau d'activité pour estimer vos besoins caloriques quotidiens pour maintenir, perdre ou prendre du poids.",
      description: "Calculez vos besoins caloriques quotidiens pour maintenir, perdre ou prendre du poids.",
      faq: [
        { q: "Combien de calories me faut-il pour maintenir mon poids ?", a: "Cela dépend de votre métabolisme de base et de votre niveau d'activité - pour un homme de 30 ans, 1,78 m, 82 kg, à activité modérée, le maintien se situe autour de 2 763 calories par jour." },
        { q: "Combien de calories dois-je réduire pour perdre du poids ?", a: "Un déficit d'environ 500 calories par jour sous le niveau de maintien est un objectif courant pour perdre environ 0,45 kg par semaine, puisque 0,45 kg de graisse corporelle équivaut à environ 3 500 calories." },
        { q: "Pourquoi deux personnes du même âge, de la même taille et du même poids obtiennent-elles des résultats différents ?", a: "Le niveau d'activité et le sexe entrent tous deux en compte dans la formule - un mode de vie plus actif augmente sensiblement l'objectif calorique par rapport à une personne sédentaire ayant les mêmes mesures, et la formule de métabolisme de base sous-jacente tient également compte des différences habituelles de composition corporelle entre hommes et femmes." },
        { q: "Quelle est la différence entre le MB et l'objectif calorique donné par cet outil ?", a: "Le métabolisme de base (MB) est l'énergie brûlée par votre corps au repos complet ; le chiffre d'entretien de cette calculatrice - votre dépense énergétique journalière totale (DEJT) - ajoute votre niveau d'activité au MB, car les mouvements et l'exercice quotidiens brûlent des calories supplémentaires au-delà de ce dont votre corps a besoin pour simplement fonctionner." },
      ],
    },
    de: {
      title: "Kalorienrechner",
      intro: "Geben Sie Alter, Geschlecht, Größe, Gewicht und Aktivitätslevel ein, um Ihren täglichen Kalorienbedarf zum Halten, Abnehmen oder Zunehmen zu schätzen.",
      description: "Berechnen Sie Ihren täglichen Kalorienbedarf zum Halten, Abnehmen oder Zunehmen des Gewichts.",
      faq: [
        { q: "Wie viele Kalorien brauche ich, um mein Gewicht zu halten?", a: "Das hängt von Ihrem Grundumsatz und Aktivitätslevel ab - für einen 30-jährigen Mann, 1,78 m, 82 kg, mit moderater Aktivität liegt der Erhaltungsbedarf bei etwa 2.763 Kalorien pro Tag." },
        { q: "Wie viele Kalorien sollte ich zum Abnehmen einsparen?", a: "Ein Defizit von etwa 500 Kalorien pro Tag unter dem Erhaltungsbedarf ist ein gängiges Ziel für rund 0,45 kg Gewichtsverlust pro Woche, da 0,45 kg Körperfett etwa 3.500 Kalorien entsprechen." },
        { q: "Warum erhalten zwei Personen mit gleichem Alter, gleicher Größe und gleichem Gewicht unterschiedliche Ergebnisse?", a: "Aktivitätslevel und Geschlecht fließen beide in die Formel ein - ein aktiverer Lebensstil erhöht das Kalorienziel deutlich gegenüber einer sitzenden Person mit denselben Werten, und die zugrunde liegende Grundumsatzformel berücksichtigt zudem typische Unterschiede in der Körperzusammensetzung zwischen Männern und Frauen." },
        { q: "Was ist der Unterschied zwischen dem Grundumsatz und dem Kalorienziel dieses Tools?", a: "Der Grundumsatz ist die Energie, die Ihr Körper in völliger Ruhe verbrennt; der Erhaltungswert dieses Rechners - Ihr Gesamtenergieverbrauch (TDEE) - addiert Ihr Aktivitätsniveau zum Grundumsatz, da tägliche Bewegung und Sport zusätzliche Kalorien verbrennen, über das hinaus, was Ihr Körper allein zum Funktionieren benötigt." },
      ],
    },
    pt: {
      title: "Calculadora de Calorias",
      intro: "Insira sua idade, sexo, altura, peso e nível de atividade para estimar suas necessidades calóricas diárias para manter, perder ou ganhar peso.",
      description: "Calcule suas necessidades calóricas diárias para manter, perder ou ganhar peso.",
      faq: [
        { q: "Quantas calorias preciso para manter meu peso?", a: "Depende da sua TMB e nível de atividade - para um homem de 30 anos, 1,78 m e 82 kg com atividade moderada, a manutenção é de aproximadamente 2.763 calorias por dia." },
        { q: "Quantas calorias devo cortar para perder peso?", a: "Um déficit de cerca de 500 calorias por dia abaixo da manutenção é uma meta comum para perder aproximadamente 0,45 kg por semana, já que 0,45 kg de gordura corporal equivale a cerca de 3.500 calorias." },
        { q: "Por que duas pessoas com a mesma idade, altura e peso obtêm resultados diferentes?", a: "O nível de atividade e o sexo influenciam a fórmula - um estilo de vida mais ativo eleva substancialmente a meta calórica em relação a alguém sedentário com as mesmas medidas, e a fórmula de TMB subjacente também leva em conta as diferenças típicas de composição corporal entre homens e mulheres." },
        { q: "Qual é a diferença entre a TMB e a meta calórica que esta ferramenta fornece?", a: "A TMB é a energia que seu corpo queima em repouso total; o número de manutenção desta calculadora - seu Gasto Energético Total Diário (TDEE) - soma seu nível de atividade à TMB, já que o movimento diário e o exercício queimam calorias extras além do que o corpo precisa apenas para funcionar." },
      ],
    },
    it: {
      title: "Calcolatrice delle Calorie",
      intro: "Inserisci età, sesso, altezza, peso e livello di attività per stimare il tuo fabbisogno calorico giornaliero per mantenere, perdere o aumentare peso.",
      description: "Calcola il tuo fabbisogno calorico giornaliero per mantenere, perdere o aumentare peso.",
      faq: [
        { q: "Quante calorie mi servono per mantenere il mio peso?", a: "Dipende dal tuo metabolismo basale e dal livello di attività - per un uomo di 30 anni, 1,78 m, 82 kg con attività moderata, il mantenimento è di circa 2.763 calorie al giorno." },
        { q: "Quante calorie dovrei tagliare per perdere peso?", a: "Un deficit di circa 500 calorie al giorno sotto il livello di mantenimento è un obiettivo comune per perdere circa 0,45 kg a settimana, poiché 0,45 kg di grasso corporeo equivale a circa 3.500 calorie." },
        { q: "Perché due persone della stessa età, altezza e peso ottengono risultati diversi?", a: "Il livello di attività e il sesso influiscono entrambi sulla formula - uno stile di vita più attivo aumenta notevolmente l'obiettivo calorico rispetto a una persona sedentaria con gli stessi parametri, e la formula del metabolismo basale sottostante tiene conto anche delle tipiche differenze di composizione corporea tra uomini e donne." },
        { q: "Qual è la differenza tra il metabolismo basale e l'obiettivo calorico fornito da questo strumento?", a: "Il metabolismo basale è l'energia che il tuo corpo brucia a completo riposo; il valore di mantenimento di questa calcolatrice - il tuo dispendio energetico totale giornaliero (TDEE) - aggiunge il tuo livello di attività al metabolismo basale, poiché il movimento quotidiano e l'esercizio bruciano calorie extra oltre a quelle necessarie al corpo per funzionare." },
      ],
    },
    ja: {
      title: "カロリー計算機",
      intro: "年齢、性別、身長、体重、活動レベルを入力すると、体重を維持・減量・増量するための1日の必要カロリーがわかります。",
      description: "体重を維持・減量・増量するための1日の必要カロリーを計算します。",
      faq: [
        { q: "体重を維持するには何カロリー必要ですか？", a: "基礎代謝量と活動レベルによります - 30歳、身長178cm、体重82kgの男性で活動量が中程度の場合、維持カロリーは1日約2,763kcalです。" },
        { q: "減量にはどれくらいカロリーを減らせばいいですか？", a: "維持カロリーから1日約500kcal減らすのが、週に約0.45kgの減量を目指す一般的な目安です。体脂肪0.45kgは約3,500kcalに相当します。" },
        { q: "年齢・身長・体重が同じ2人でも結果が異なるのはなぜですか？", a: "活動レベルと性別の両方が計算式に影響します。活動量が多いライフスタイルは、同じ体格で座りがちな人と比べてカロリー目標を大きく引き上げます。また基礎代謝量の計算式自体も、男女間の一般的な体組成の違いを考慮しています。" },
        { q: "基礎代謝（BMR）とこのツールが示す目標カロリーはどう違いますか？", a: "基礎代謝は完全に安静な状態で体が消費するエネルギーです。このツールが示す維持カロリー（総消費エネルギー量、TDEE）は、日常の動きや運動が体を機能させるだけで必要な分を超えてカロリーを消費するため、基礎代謝に活動量を加えて算出されます。" },
      ],
    },
    ro: {
      title: "Calculator de Calorii",
      intro: "Introdu vârsta, sexul, înălțimea, greutatea și nivelul de activitate pentru a afla necesarul zilnic de calorii pentru menținere, scădere sau creștere în greutate.",
      description: "Calculează necesarul zilnic de calorii pentru menținere, scădere sau creștere în greutate.",
      faq: [
        { q: "De câte calorii am nevoie pentru a-mi menține greutatea?", a: "Depinde de rata metabolică bazală și nivelul de activitate - pentru un bărbat de 30 de ani, 178cm, 82kg, moderat activ, caloriile de menținere sunt de aproximativ 2.763 kcal pe zi." },
        { q: "Cu cât ar trebui să-mi reduc caloriile pentru a slăbi?", a: "O reducere de aproximativ 500 kcal pe zi față de nivelul de menținere este un ghid comun pentru a viza aproximativ 0,45kg pe săptămână, deoarece 0,45kg de grăsime corporală echivalează cu aproximativ 3.500 kcal." },
        { q: "De ce doi oameni cu aceeași vârstă, înălțime și greutate primesc rezultate diferite?", a: "Atât nivelul de activitate, cât și sexul influențează formula. Un stil de viață mai activ crește semnificativ ținta calorică față de cineva sedentar cu aceeași constituție, iar formula ratei metabolice bazale în sine ține cont de diferențele tipice de compoziție corporală dintre bărbați și femei." },
        { q: "Cum diferă rata metabolică bazală (BMR) de ținta calorică arătată de acest instrument?", a: "Rata metabolică bazală (BMR) este energia pe care corpul o consumă în repaus complet. Caloriile de menținere arătate aici (consumul energetic total, TDEE) pornesc de la BMR și adaugă nivelul de activitate, deoarece mișcarea zilnică și exercițiile fizice ard calorii peste minimul necesar pentru funcționarea de bază a corpului." },
      ],
    },
  },

  "bmi-calculator": {
    es: {
      title: "Calculadora de IMC",
      intro: "Introduce tu altura y peso para calcular el IMC, una medida general de detección (no un diagnóstico).",
      description: "Calcula tu índice de masa corporal a partir de la altura y el peso.",
      faq: [
        { q: "¿Es el IMC preciso para todas las personas?", a: "No - el IMC no distingue entre músculo y grasa, y puede resultar engañoso en deportistas, adultos mayores y ciertos tipos de cuerpo. Es una herramienta de detección, no un diagnóstico." },
        { q: "¿Qué se considera un rango de IMC saludable?", a: "18,5-24,9 se clasifica generalmente como rango saludable, menos de 18,5 como bajo peso, 25-29,9 como sobrepeso y 30+ como el rango de obesidad - pero estos límites son promedios poblacionales, no veredictos individuales de salud." },
        { q: "¿El IMC se aplica igual a niños que a adultos?", a: "No: esta calculadora usa la fórmula de IMC para adultos y los rangos saludables para adultos; los niños y adolescentes necesitan percentiles de tablas de crecimiento específicos por edad y sexo, ya que la composición corporal saludable cambia significativamente durante el desarrollo infantil." },
        { q: "¿En qué se diferencia el IMC del porcentaje de grasa corporal?", a: "El IMC solo usa la altura y el peso, por lo que no puede distinguir el músculo de la grasa - una persona muy musculosa puede mostrar un IMC alto sin exceso de grasa corporal. El porcentaje de grasa corporal mide directamente la parte de grasa de tu cuerpo y ofrece una imagen más precisa de la composición corporal que el IMC por sí solo." },
        { q: "¿Cómo se calcula el IMC, y es lo mismo que el 'índice de peso corporal'?", a: "Para calcular el IMC a mano: divide tu peso en kilogramos entre tu altura en metros al cuadrado. \"Índice de peso corporal\" es una variante informal de la misma búsqueda - se refiere al mismo cálculo del índice de masa corporal (IMC), no a una métrica distinta." },
        { q: "¿'Calculadora de índice corporal', 'calculadora de índice de masa' y 'calculadora de biomasa' son lo mismo que el IMC?", a: "Sí - todas estas son variantes informales o mal recordadas de la misma búsqueda: índice de masa corporal (IMC). Esta calculadora calcula el IMC estándar a partir de la altura y el peso, sin importar con cuál de estas frases la hayas encontrado." },
      ],
    },
    fr: {
      title: "Calculatrice d'IMC",
      intro: "Saisissez votre taille et votre poids pour calculer votre IMC, une mesure de dépistage générale (et non un diagnostic).",
      description: "Calculez votre indice de masse corporelle à partir de la taille et du poids.",
      faq: [
        { q: "L'IMC est-il précis pour tout le monde ?", a: "Non - l'IMC ne distingue pas la masse musculaire de la masse grasse et peut être trompeur pour les athlètes, les personnes âgées et certaines morphologies. C'est un outil de dépistage, pas un diagnostic." },
        { q: "Quelle est la plage d'IMC considérée comme saine ?", a: "18,5-24,9 est généralement classé comme la plage saine, moins de 18,5 comme insuffisance pondérale, 25-29,9 comme surpoids, et 30+ comme la plage d'obésité - mais ces seuils sont des moyennes de population, pas des verdicts de santé individuels." },
        { q: "L'IMC s'applique-t-il de la même façon aux enfants qu'aux adultes ?", a: "Non - cette calculatrice utilise la formule d'IMC pour adultes et les seuils sains pour adultes ; les enfants et adolescents ont besoin de percentiles de courbes de croissance spécifiques à l'âge et au sexe, car la composition corporelle saine évolue considérablement au cours du développement de l'enfant." },
        { q: "En quoi l'IMC diffère-t-il du pourcentage de masse grasse ?", a: "L'IMC n'utilise que la taille et le poids, il ne peut donc pas distinguer le muscle de la graisse - une personne très musclée peut afficher un IMC élevé sans excès de graisse corporelle. Le pourcentage de masse grasse mesure directement la part de graisse du corps et donne une image plus précise de la composition corporelle que l'IMC seul." },
        { q: "Comment calculer l'IMC, et « indice de poids corporel » est-il la même chose ?", a: "Pour calculer l'IMC à la main : divisez votre poids en kilogrammes par votre taille en mètres au carré. « Indice de poids corporel » est une variante informelle de la même recherche - elle désigne le même calcul de l'indice de masse corporelle (IMC), pas une mesure distincte." },
        { q: "« Calculatrice d'indice corporel », « calculatrice d'indice de masse » et « calculatrice de biomasse » sont-elles la même chose que l'IMC ?", a: "Oui - ce sont toutes des variantes informelles ou mal mémorisées de la même recherche : l'indice de masse corporelle (IMC). Cette calculatrice calcule l'IMC standard à partir de la taille et du poids, quelle que soit la formulation utilisée pour la trouver." },
      ],
    },
    de: {
      title: "BMI-Rechner",
      intro: "Geben Sie Größe und Gewicht ein, um den BMI zu berechnen - ein allgemeines Screening-Maß (keine Diagnose).",
      description: "Berechnen Sie Ihren Body-Mass-Index aus Größe und Gewicht.",
      faq: [
        { q: "Ist der BMI für jeden genau?", a: "Nein - der BMI unterscheidet nicht zwischen Muskel- und Fettmasse und kann bei Sportlern, älteren Erwachsenen und bestimmten Körpertypen irreführend sein. Er ist ein Screening-Instrument, keine Diagnose." },
        { q: "Was gilt als gesunder BMI-Bereich?", a: "18,5-24,9 gilt allgemein als gesunder Bereich, unter 18,5 als Untergewicht, 25-29,9 als Übergewicht und 30+ als Adipositas-Bereich - diese Grenzwerte sind jedoch Bevölkerungsdurchschnitte, keine individuellen Gesundheitsurteile." },
        { q: "Gilt der BMI für Kinder genauso wie für Erwachsene?", a: "Nein - dieser Rechner verwendet die BMI-Formel und die gesunden Bereichsgrenzen für Erwachsene; Kinder und Jugendliche benötigen stattdessen alters- und geschlechtsspezifische Perzentile aus Wachstumskurven, da sich eine gesunde Körperzusammensetzung während der Kindheit deutlich verändert." },
        { q: "Wie unterscheidet sich der BMI vom Körperfettanteil?", a: "Der BMI berücksichtigt nur Größe und Gewicht und kann daher nicht zwischen Muskeln und Fett unterscheiden - eine sehr muskulöse Person kann einen hohen BMI aufweisen, ohne überschüssiges Körperfett zu haben. Der Körperfettanteil misst den Fettanteil des Körpers direkt und gibt ein genaueres Bild der Körperzusammensetzung als der BMI allein." },
        { q: "Wie berechne ich den BMI, und ist 'Körpergewichtsindex' dasselbe?", a: "So berechnen Sie den BMI von Hand: teilen Sie Ihr Gewicht in Kilogramm durch Ihre Größe in Metern zum Quadrat. „Körpergewichtsindex“ ist eine informelle Variante derselben Suche - sie bezieht sich auf dieselbe Body-Mass-Index-Berechnung (BMI), nicht auf eine eigene Kennzahl." },
        { q: "Sind 'Körperindex-Rechner', 'Massenindex-Rechner' und 'Biomasse-Index-Rechner' dasselbe wie der BMI?", a: "Ja - das sind alles informelle oder falsch erinnerte Varianten derselben Suche: Body-Mass-Index (BMI). Dieser Rechner berechnet den Standard-BMI aus Größe und Gewicht, unabhängig davon, mit welcher dieser Formulierungen Sie ihn gefunden haben." },
      ],
    },
    pt: {
      title: "Calculadora de IMC",
      intro: "Insira sua altura e peso para calcular o IMC, uma medida geral de triagem (não um diagnóstico).",
      description: "Calcule seu índice de massa corporal a partir da altura e do peso.",
      faq: [
        { q: "O IMC é preciso para todos?", a: "Não - o IMC não distingue músculo de gordura e pode ser enganoso para atletas, idosos e alguns tipos de corpo. É uma ferramenta de triagem, não um diagnóstico." },
        { q: "O que é considerado uma faixa de IMC saudável?", a: "18,5-24,9 é geralmente classificado como a faixa saudável, abaixo de 18,5 como abaixo do peso, 25-29,9 como sobrepeso e 30+ como a faixa de obesidade - mas esses limites são médias populacionais, não veredictos individuais de saúde." },
        { q: "O IMC se aplica da mesma forma a crianças e adultos?", a: "Não - esta calculadora usa a fórmula de IMC para adultos e as faixas saudáveis para adultos; crianças e adolescentes precisam de percentis de curvas de crescimento específicos por idade e sexo, já que a composição corporal saudável muda significativamente ao longo do desenvolvimento infantil." },
        { q: "Como o IMC é diferente do percentual de gordura corporal?", a: "O IMC usa apenas altura e peso, então não consegue distinguir músculo de gordura - uma pessoa muito musculosa pode apresentar um IMC alto sem excesso de gordura corporal. O percentual de gordura corporal mede diretamente a parte de gordura do corpo e oferece um retrato mais preciso da composição corporal do que o IMC sozinho." },
        { q: "Como calculo o IMC, e 'índice de peso corporal' é a mesma coisa?", a: "Para calcular o IMC manualmente: divida seu peso em quilogramas pela sua altura em metros ao quadrado. \"Índice de peso corporal\" é uma variante informal da mesma busca - refere-se ao mesmo cálculo do índice de massa corporal (IMC), não a uma métrica separada." },
        { q: "'Calculadora de índice corporal', 'calculadora de índice de massa' e 'calculadora de biomassa' são a mesma coisa que o IMC?", a: "Sim - todas essas são variantes informais ou mal lembradas da mesma busca: índice de massa corporal (IMC). Esta calculadora calcula o IMC padrão a partir da altura e do peso, independentemente de qual dessas expressões você usou para encontrá-la." },
      ],
    },
    it: {
      title: "Calcolatrice dell'IMC",
      intro: "Inserisci altezza e peso per calcolare l'IMC, una misura generale di screening (non una diagnosi).",
      description: "Calcola il tuo indice di massa corporea da altezza e peso.",
      faq: [
        { q: "L'IMC è accurato per tutti?", a: "No - l'IMC non distingue tra massa muscolare e grassa e può essere fuorviante per atleti, anziani e alcuni tipi di corpo. È uno strumento di screening, non una diagnosi." },
        { q: "Cosa si considera un intervallo di IMC sano?", a: "18,5-24,9 è generalmente classificato come l'intervallo sano, sotto 18,5 come sottopeso, 25-29,9 come sovrappeso e 30+ come l'intervallo dell'obesità - ma queste soglie sono medie di popolazione, non verdetti di salute individuali." },
        { q: "L'IMC si applica allo stesso modo a bambini e adulti?", a: "No - questa calcolatrice utilizza la formula dell'IMC per adulti e gli intervalli sani per adulti; bambini e adolescenti necessitano invece di percentili delle curve di crescita specifici per età e sesso, poiché la composizione corporea sana cambia significativamente durante lo sviluppo infantile." },
        { q: "In cosa si differenzia l'IMC dalla percentuale di grasso corporeo?", a: "L'IMC utilizza solo altezza e peso, quindi non riesce a distinguere il muscolo dal grasso - una persona molto muscolosa può avere un IMC alto senza eccesso di grasso corporeo. La percentuale di grasso corporeo misura direttamente la parte grassa del corpo e offre un quadro più accurato della composizione corporea rispetto al solo IMC." },
        { q: "Come si calcola l'IMC, e 'indice di peso corporeo' è la stessa cosa?", a: "Per calcolare l'IMC a mano: dividi il tuo peso in chilogrammi per la tua altezza in metri al quadrato. \"Indice di peso corporeo\" è una variante informale della stessa ricerca - si riferisce allo stesso calcolo dell'indice di massa corporea (IMC), non a una misura distinta." },
        { q: "'Calcolatrice indice corporeo', 'calcolatrice indice di massa' e 'calcolatrice biomassa' sono la stessa cosa dell'IMC?", a: "Sì - sono tutte varianti informali o ricordate male della stessa ricerca: indice di massa corporea (IMC). Questa calcolatrice calcola l'IMC standard da altezza e peso, indipendentemente da quale di queste espressioni tu abbia usato per trovarla." },
      ],
    },
    ja: {
      title: "BMI計算機",
      intro: "身長と体重を入力してBMI（体格指数）を計算します。これは一般的なスクリーニング指標であり、診断ではありません。",
      description: "身長と体重からBMI（体格指数）を計算します。",
      faq: [
        { q: "BMIは誰にでも正確ですか？", a: "いいえ。BMIは筋肉と脂肪を区別できないため、アスリートや高齢者、一部の体型の人には誤解を招くことがあります。診断ではなく、スクリーニングツールです。" },
        { q: "健康的なBMIの範囲は？", a: "一般的に18.5〜24.9が健康的な範囲、18.5未満はやせすぎ、25〜29.9は肥満（軽度）、30以上は肥満の範囲とされていますが、これらは集団の平均値であり、個人の健康を判定するものではありません。" },
        { q: "BMIは子どもにも大人と同じように当てはまりますか？", a: "いいえ。この計算機は大人用のBMI計算式と健康範囲の基準を使用しています。子どもや青少年には、年齢・性別ごとの成長曲線パーセンタイルが必要です。これは、健やかな体組成が子どもの発達過程で大きく変化するためです。" },
        { q: "BMIと体脂肪率はどう違いますか？", a: "BMIは身長と体重だけを使うため、筋肉と脂肪を区別できません。筋肉量の多い人は体脂肪が少なくてもBMIが高く出ることがあります。体脂肪率は体の脂肪部分を直接測定するため、BMIだけよりも体組成をより正確に把握できます。" },
        { q: "BMIはどう計算しますか？「体重指数」も同じものですか？", a: "BMIを手計算するには、体重（キログラム）を身長（メートル）の2乗で割ります。「体重指数」は同じ検索の非公式な言い方で、別の指標ではなく同じ体格指数（BMI）の計算を指しています。" },
        { q: "「身体指数計算機」「質量指数計算機」「バイオマス指数計算機」もBMIと同じものですか？", a: "はい。これらはすべて体格指数（BMI）を指す非公式な、あるいは記憶違いによる言い方です。この計算機はどの言い方で検索してたどり着いた場合でも、身長と体重から標準的なBMIを計算します。" },
      ],
    },
    ro: {
      title: "Calculator IMC",
      intro: "Introdu înălțimea și greutatea pentru a calcula indicele de masă corporală (IMC) - un indicator general de screening, nu un diagnostic.",
      description: "Calculează indicele de masă corporală (IMC) din înălțime și greutate.",
      faq: [
        { q: "Este IMC exact pentru toată lumea?", a: "Nu - IMC nu diferențiază între masa musculară și grăsimea corporală, deci poate fi înșelător pentru sportivi, adulți în vârstă sau anumite tipuri de corp. Este un instrument de screening, nu un diagnostic." },
        { q: "Care este intervalul sănătos al IMC?", a: "În general, 18,5-24,9 este considerat intervalul sănătos, sub 18,5 înseamnă subponderal, 25-29,9 înseamnă supraponderal, iar 30+ înseamnă obezitate - dar acestea sunt medii la nivel de populație, nu un verdict individual asupra sănătății tale." },
        { q: "Se aplică IMC copiilor la fel ca adulților?", a: "Nu - acest calculator folosește formula și pragurile de sănătate pentru IMC adult. Copiii și adolescenții au nevoie de percentile pe curbe de creștere specifice vârstei și sexului, deoarece compoziția corporală sănătoasă se schimbă semnificativ pe parcursul dezvoltării copilului." },
        { q: "Cum diferă IMC de procentul de grăsime corporală?", a: "IMC folosește doar înălțimea și greutatea, deci nu poate diferenția masa musculară de grăsime - cineva cu masă musculară mare poate avea un IMC ridicat cu grăsime corporală scăzută. Procentul de grăsime corporală măsoară direct componenta de grăsime, oferind o imagine mai precisă a compoziției corporale decât IMC singur." },
        { q: "Cum se calculează IMC? Este 'indice de masă corporală' același lucru?", a: "Pentru a calcula manual IMC, împarte greutatea în kilograme la înălțimea în metri la pătrat. 'Indice de masă corporală' este pur și simplu denumirea completă a aceleiași căutări, nu un indicator diferit - se referă la același calcul de IMC." },
        { q: "Sunt și 'calculator indice corporal' sau 'calculator indice de greutate' același lucru cu IMC?", a: "Da - acestea sunt denumiri informale sau formulări ușor greșite pentru indicele de masă corporală (IMC). Acest calculator calculează IMC standard din înălțime și greutate, indiferent de termenul folosit pentru a-l găsi." },
      ],
    },
  },

  "bmr-calculator": {
    es: {
      title: "Calculadora de TMB",
      intro: "Introduce tu edad, sexo, altura y peso para estimar tu tasa metabólica basal (TMB) usando la fórmula de Mifflin-St Jeor.",
      description: "Calcula tu tasa metabólica basal - las calorías que quema tu cuerpo en reposo.",
      faq: [
        { q: "¿Qué es la TMB?", a: "La tasa metabólica basal es el número de calorías que tu cuerpo quema en reposo absoluto solo para mantener funciones vitales como la respiración y la circulación - no incluye ninguna actividad." },
        { q: "¿Qué tan precisa es la fórmula de Mifflin-St Jeor?", a: "Se considera una de las fórmulas de TMB más precisas para la población general, típicamente dentro de un 10% de los valores medidos, aunque el metabolismo individual varía según la masa muscular y otros factores." },
        { q: "¿La TMB cambia con la edad?", a: "Sí: la TMB disminuye gradualmente con la edad, en gran parte debido a una disminución natural de la masa muscular con el tiempo, lo que explica en parte por qué las necesidades calóricas suelen bajar en la edad adulta avanzada incluso con el mismo nivel de actividad." },
        { q: "¿Debo comer exactamente al nivel calórico de mi TMB?", a: "No - la TMB es la energía mínima que tu cuerpo necesita en reposo total, no un objetivo saludable para comer. Comer por debajo de la TMB durante periodos prolongados puede ralentizar el metabolismo y causar pérdida muscular; usa tu TMB como referencia y suma tu nivel de actividad para encontrar un objetivo de mantenimiento o déficit adecuado." },
      ],
    },
    fr: {
      title: "Calculatrice de Métabolisme de Base",
      intro: "Saisissez votre âge, sexe, taille et poids pour estimer votre métabolisme de base à l'aide de la formule de Mifflin-St Jeor.",
      description: "Calculez votre métabolisme de base - les calories brûlées par votre corps au repos.",
      faq: [
        { q: "Qu'est-ce que le métabolisme de base ?", a: "Le métabolisme de base est le nombre de calories que votre corps brûle au repos complet, uniquement pour maintenir des fonctions vitales comme la respiration et la circulation - il n'inclut aucune activité." },
        { q: "Quelle est la précision de la formule de Mifflin-St Jeor ?", a: "Elle est considérée comme l'une des formules de métabolisme de base les plus précises pour la population générale, généralement à environ 10 % près des valeurs mesurées, bien que le métabolisme individuel varie selon la masse musculaire et d'autres facteurs." },
        { q: "Le métabolisme de base change-t-il avec l'âge ?", a: "Oui - le métabolisme de base diminue progressivement avec l'âge, en grande partie en raison d'une baisse naturelle de la masse musculaire au fil du temps, ce qui explique en partie pourquoi les besoins caloriques ont tendance à diminuer à un âge avancé, même à niveau d'activité identique." },
        { q: "Dois-je manger exactement au niveau calorique de mon métabolisme de base ?", a: "Non - le métabolisme de base est l'énergie minimale dont votre corps a besoin au repos complet, pas un objectif alimentaire sain. Manger en dessous de ce niveau pendant une longue période peut ralentir le métabolisme et entraîner une perte musculaire ; utilisez votre métabolisme de base comme référence et ajoutez votre niveau d'activité pour trouver un objectif d'entretien ou de déficit approprié." },
      ],
    },
    de: {
      title: "Grundumsatzrechner",
      intro: "Geben Sie Alter, Geschlecht, Größe und Gewicht ein, um Ihren Grundumsatz mit der Mifflin-St-Jeor-Formel zu schätzen.",
      description: "Berechnen Sie Ihren Grundumsatz - die Kalorien, die Ihr Körper in Ruhe verbrennt.",
      faq: [
        { q: "Was ist der Grundumsatz?", a: "Der Grundumsatz ist die Anzahl an Kalorien, die Ihr Körper in völliger Ruhe verbrennt, nur um lebenswichtige Funktionen wie Atmung und Kreislauf aufrechtzuerhalten - Aktivität ist nicht eingerechnet." },
        { q: "Wie genau ist die Mifflin-St-Jeor-Formel?", a: "Sie gilt als eine der genaueren Grundumsatzformeln für die Allgemeinbevölkerung, meist innerhalb von etwa 10% der gemessenen Werte, wobei der individuelle Stoffwechsel je nach Muskelmasse und anderen Faktoren variiert." },
        { q: "Verändert sich der Grundumsatz mit dem Alter?", a: "Ja - der Grundumsatz sinkt mit zunehmendem Alter allmählich, größtenteils aufgrund einer natürlichen Abnahme der Muskelmasse im Laufe der Zeit, was mit erklärt, warum der Kalorienbedarf im höheren Erwachsenenalter oft sinkt, selbst bei gleichem Aktivitätslevel." },
        { q: "Sollte ich genau auf dem Niveau meines Grundumsatzes essen?", a: "Nein - der Grundumsatz ist die Mindestenergie, die Ihr Körper in völliger Ruhe benötigt, kein gesundes Essziel. Dauerhaftes Essen unter dem Grundumsatz kann den Stoffwechsel verlangsamen und zu Muskelverlust führen; nutzen Sie Ihren Grundumsatz als Basiswert und addieren Sie Ihr Aktivitätsniveau, um ein passendes Erhaltungs- oder Defizitziel zu finden." },
      ],
    },
    pt: {
      title: "Calculadora de TMB",
      intro: "Insira sua idade, sexo, altura e peso para estimar sua taxa metabólica basal (TMB) usando a fórmula de Mifflin-St Jeor.",
      description: "Calcule sua taxa metabólica basal - as calorias que seu corpo queima em repouso.",
      faq: [
        { q: "O que é a TMB?", a: "A taxa metabólica basal é o número de calorias que seu corpo queima em repouso absoluto apenas para manter funções vitais como respiração e circulação - não inclui nenhuma atividade." },
        { q: "Quão precisa é a fórmula de Mifflin-St Jeor?", a: "É considerada uma das fórmulas de TMB mais precisas para a população em geral, geralmente dentro de cerca de 10% dos valores medidos, embora o metabolismo individual varie conforme a massa muscular e outros fatores." },
        { q: "A TMB muda com a idade?", a: "Sim - a TMB diminui gradualmente com a idade, em grande parte devido a uma redução natural da massa muscular ao longo do tempo, o que explica em parte por que as necessidades calóricas costumam cair na idade adulta avançada, mesmo com o mesmo nível de atividade." },
        { q: "Devo comer exatamente no nível calórico da minha TMB?", a: "Não - a TMB é a energia mínima que seu corpo precisa em repouso total, não uma meta saudável para se alimentar. Comer abaixo da TMB por períodos prolongados pode desacelerar o metabolismo e causar perda muscular; use sua TMB como referência e some seu nível de atividade para encontrar uma meta adequada de manutenção ou déficit." },
      ],
    },
    it: {
      title: "Calcolatrice del Metabolismo Basale",
      intro: "Inserisci età, sesso, altezza e peso per stimare il tuo metabolismo basale (BMR) usando la formula di Mifflin-St Jeor.",
      description: "Calcola il tuo metabolismo basale - le calorie che il tuo corpo brucia a riposo.",
      faq: [
        { q: "Cos'è il metabolismo basale?", a: "Il metabolismo basale è il numero di calorie che il tuo corpo brucia a riposo completo solo per mantenere le funzioni vitali come la respirazione e la circolazione - non include alcuna attività." },
        { q: "Quanto è accurata la formula di Mifflin-St Jeor?", a: "È considerata una delle formule del metabolismo basale più accurate per la popolazione generale, di solito entro circa il 10% dei valori misurati, anche se il metabolismo individuale varia in base alla massa muscolare e ad altri fattori." },
        { q: "Il metabolismo basale cambia con l'età?", a: "Sì - il metabolismo basale diminuisce gradualmente con l'età, in gran parte a causa di una naturale riduzione della massa muscolare nel tempo, il che spiega in parte perché il fabbisogno calorico tende a calare in età adulta avanzata anche a parità di livello di attività." },
        { q: "Dovrei mangiare esattamente al livello calorico del mio metabolismo basale?", a: "No - il metabolismo basale è l'energia minima di cui il tuo corpo ha bisogno a completo riposo, non un obiettivo alimentare salutare. Mangiare al di sotto del metabolismo basale per periodi prolungati può rallentare il metabolismo e causare perdita muscolare; usa il tuo metabolismo basale come base e aggiungi il tuo livello di attività per trovare un obiettivo di mantenimento o deficit adeguato." },
      ],
    },
    ja: {
      title: "基礎代謝量計算機",
      intro: "年齢、性別、身長、体重を入力すると、Mifflin-St Jeor式を用いて基礎代謝量（BMR）を概算します。",
      description: "安静時に体が消費するカロリーである基礎代謝量を計算します。",
      faq: [
        { q: "基礎代謝量とは何ですか？", a: "基礎代謝量とは、呼吸や血液循環など生命維持に必要な機能を保つためだけに、完全な安静状態で体が消費するカロリーのことです。活動によるカロリー消費は含まれません。" },
        { q: "Mifflin-St Jeor式はどのくらい正確ですか？", a: "一般集団に対して比較的精度の高い基礎代謝量の計算式の一つとされ、通常は実測値の約10%以内に収まりますが、個人の代謝は筋肉量などの要因によって異なります。" },
        { q: "基礎代謝量は年齢とともに変化しますか？", a: "はい。基礎代謝量は加齢とともに徐々に低下します。これは主に、時間の経過に伴う自然な筋肉量の減少によるもので、同じ活動レベルであっても年齢を重ねるとカロリー必要量が下がる傾向がある理由の一つです。" },
        { q: "基礎代謝と同じカロリーだけ摂取すればいいのですか？", a: "いいえ。基礎代謝は体が完全に安静な状態で必要とする最低限のエネルギーであり、食事の健康的な目標値ではありません。長期間基礎代謝を下回る食事を続けると代謝が低下し筋肉量が減る可能性があります。基礎代謝を基準にして活動量を加え、適切な維持カロリーや減量目標を求めてください。" },
      ],
    },
    ro: {
      title: "Calculator Rată Metabolică Bazală",
      intro: "Introdu vârsta, sexul, înălțimea și greutatea pentru a estima rata metabolică bazală (BMR) folosind formula Mifflin-St Jeor.",
      description: "Calculează rata metabolică bazală - caloriile pe care corpul le arde în repaus.",
      faq: [
        { q: "Ce este rata metabolică bazală?", a: "Rata metabolică bazală (BMR) este numărul de calorii pe care corpul le arde în repaus complet, doar pentru a menține funcțiile vitale precum respirația și circulația sângelui - nu include niciun fel de mișcare sau activitate." },
        { q: "Cât de precisă este formula Mifflin-St Jeor?", a: "Este considerată una dintre cele mai precise formule disponibile pentru BMR la populația generală, de obicei fiind în limita a 10% față de valoarea reală măsurată, deși metabolismul individual variază în funcție de factori precum masa musculară." },
        { q: "Se schimbă rata metabolică bazală odată cu vârsta?", a: "Da - BMR scade treptat odată cu înaintarea în vârstă, în mare parte din cauza pierderii naturale de masă musculară în timp, motiv pentru care necesarul caloric tinde să scadă cu vârsta chiar și la același nivel de activitate." },
        { q: "Ar trebui să mănânc exact cât este rata mea metabolică bazală?", a: "Nu - BMR este energia minimă de care corpul tău are nevoie în repaus complet, nu o țintă alimentară sănătoasă. Consumul constant sub BMR pe termen lung poate încetini metabolismul și poate duce la pierderea masei musculare. Folosește BMR ca punct de plecare, apoi adaugă nivelul de activitate pentru a obține o țintă adecvată de menținere sau de scădere în greutate." },
      ],
    },
  },

  "age-calculator": {
    es: {
      title: "Calculadora de Edad",
      intro: "Introduce una fecha de nacimiento para calcular la edad exacta a día de hoy, hasta el día.",
      description: "Calcula la edad exacta en años, meses y días.",
      faq: [
        { q: "¿Cómo se calcula la edad exacta?", a: "Contando los años completos, luego los meses restantes y luego los días restantes entre la fecha de nacimiento y hoy - no simplemente restando el año de nacimiento del año actual." },
        { q: "¿Esto tiene en cuenta los años bisiestos?", a: "Sí - funciona directamente con fechas de calendario en lugar de asumir un año fijo de 365 días, por lo que los años bisiestos se gestionan correctamente sin ningún ajuste adicional." },
        { q: "¿Puedo calcular la edad en una fecha futura o pasada específica en lugar de hoy?", a: "Esta calculadora compara tu fecha de nacimiento específicamente con la fecha de hoy; para hallar tu edad en otra fecha, usa la Calculadora de Días Restantes o la Calculadora de Duración de Fecha para medir la diferencia entre tu fecha de nacimiento y cualquier fecha que elijas." },
        { q: "¿Puede calcular la edad en meses o semanas en lugar de solo años?", a: "Sí - además de tu edad en años, esta calculadora desglosa el tiempo exacto transcurrido en meses, semanas y días totales, para que puedas ver tu edad precisa en la unidad que más te convenga." },
      ],
    },
    fr: {
      title: "Calculatrice d'Âge",
      intro: "Saisissez une date de naissance pour calculer l'âge exact à ce jour, au jour près.",
      description: "Calculez l'âge exact en années, mois et jours.",
      faq: [
        { q: "Comment l'âge exact est-il calculé ?", a: "En comptant les années complètes, puis les mois restants, puis les jours restants entre la date de naissance et aujourd'hui - pas simplement en soustrayant l'année de naissance de l'année en cours." },
        { q: "Cela tient-il compte des années bissextiles ?", a: "Oui - le calcul se fait directement à partir des dates du calendrier plutôt qu'en supposant une année fixe de 365 jours, les années bissextiles sont donc gérées correctement sans ajustement supplémentaire." },
        { q: "Puis-je calculer mon âge à une date future ou passée précise plutôt qu'aujourd'hui ?", a: "Cette calculatrice compare spécifiquement votre date de naissance à la date d'aujourd'hui ; pour connaître votre âge à une autre date, utilisez la Calculatrice de Jours Restants ou la Calculatrice de Durée pour mesurer l'écart entre votre date de naissance et la date de votre choix." },
        { q: "Cet outil peut-il calculer l'âge en mois ou en semaines, pas seulement en années ?", a: "Oui - en plus de votre âge en années, cette calculatrice décompose le temps exact écoulé en mois, semaines et jours totaux, afin que vous puissiez voir votre âge précis dans l'unité la plus utile." },
      ],
    },
    de: {
      title: "Altersrechner",
      intro: "Geben Sie ein Geburtsdatum ein, um das genaue Alter bis heute, tagesgenau, zu berechnen.",
      description: "Berechnen Sie das genaue Alter in Jahren, Monaten und Tagen.",
      faq: [
        { q: "Wie wird das genaue Alter berechnet?", a: "Durch Zählen der vollen Jahre, dann der verbleibenden Monate, dann der verbleibenden Tage zwischen Geburtsdatum und heute - nicht durch einfaches Subtrahieren des Geburtsjahrs vom aktuellen Jahr." },
        { q: "Werden Schaltjahre berücksichtigt?", a: "Ja - die Berechnung erfolgt direkt anhand von Kalenderdaten statt eines festen 365-Tage-Jahres, sodass Schaltjahre korrekt ohne zusätzliche Anpassung berücksichtigt werden." },
        { q: "Kann ich das Alter zu einem bestimmten zukünftigen oder vergangenen Datum statt heute berechnen?", a: "Dieser Rechner vergleicht Ihr Geburtsdatum speziell mit dem heutigen Datum; um Ihr Alter an einem anderen Datum zu ermitteln, nutzen Sie den Tage-bis-Rechner oder den Datumsdifferenz-Rechner, um den Abstand zwischen Ihrem Geburtsdatum und einem beliebigen Datum zu berechnen." },
        { q: "Kann dieses Tool das Alter auch in Monaten oder Wochen statt nur in Jahren berechnen?", a: "Ja - neben Ihrem Alter in Jahren schlüsselt dieser Rechner die genau verstrichene Zeit auch in Monate, Wochen und Tage insgesamt auf, sodass Sie Ihr genaues Alter in der jeweils nützlichsten Einheit sehen können." },
      ],
    },
    pt: {
      title: "Calculadora de Idade",
      intro: "Insira uma data de nascimento para calcular a idade exata até hoje, com precisão de dias.",
      description: "Calcule a idade exata em anos, meses e dias.",
      faq: [
        { q: "Como a idade exata é calculada?", a: "Contando os anos completos, depois os meses restantes e depois os dias restantes entre a data de nascimento e hoje - não apenas subtraindo o ano de nascimento do ano atual." },
        { q: "Isso considera anos bissextos?", a: "Sim - funciona diretamente com datas do calendário em vez de assumir um ano fixo de 365 dias, então os anos bissextos são tratados corretamente sem nenhum ajuste extra." },
        { q: "Posso calcular a idade em uma data futura ou passada específica, em vez de hoje?", a: "Esta calculadora compara sua data de nascimento especificamente com a data de hoje; para descobrir sua idade em outra data, use a Calculadora de Dias Restantes ou a Calculadora de Duração de Data para medir a diferença entre sua data de nascimento e qualquer data escolhida." },
        { q: "Isso pode calcular a idade em meses ou semanas em vez de apenas anos?", a: "Sim - além da idade em anos, esta calculadora divide o tempo exato decorrido em meses, semanas e dias totais, para que você veja sua idade precisa na unidade que for mais útil." },
      ],
    },
    it: {
      title: "Calcolatrice dell'Età",
      intro: "Inserisci una data di nascita per calcolare l'età esatta ad oggi, fino al giorno.",
      description: "Calcola l'età esatta in anni, mesi e giorni.",
      faq: [
        { q: "Come viene calcolata l'età esatta?", a: "Contando gli anni completi, poi i mesi rimanenti, poi i giorni rimanenti tra la data di nascita e oggi - non semplicemente sottraendo l'anno di nascita dall'anno corrente." },
        { q: "Questo tiene conto degli anni bisestili?", a: "Sì - funziona direttamente con le date del calendario invece di assumere un anno fisso di 365 giorni, quindi gli anni bisestili vengono gestiti correttamente senza alcuna regolazione aggiuntiva." },
        { q: "Posso calcolare l'età a partire da una data futura o passata specifica anziché da oggi?", a: "Questa calcolatrice confronta la tua data di nascita specificamente con la data odierna; per trovare la tua età in un'altra data, usa la Calcolatrice dei Giorni Rimanenti o la Calcolatrice della Durata tra Date per misurare la differenza tra la tua data di nascita e qualsiasi data tu scelga." },
        { q: "Può calcolare l'età in mesi o settimane invece che solo in anni?", a: "Sì - oltre all'età in anni, questa calcolatrice suddivide il tempo esatto trascorso in mesi, settimane e giorni totali, così puoi vedere la tua età precisa nell'unità più utile per te." },
      ],
    },
    ja: {
      title: "年齢計算機",
      intro: "生年月日を入力すると、今日時点での正確な年齢を日単位まで計算します。",
      description: "正確な年齢を年・月・日で計算します。",
      faq: [
        { q: "正確な年齢はどのように計算されますか？", a: "生年月日から今日までの満年数、残りの月数、残りの日数を順に数えていきます。単純に現在の年から生まれた年を引くわけではありません。" },
        { q: "うるう年は考慮されますか？", a: "はい。365日固定の年を前提とするのではなく、実際のカレンダーの日付をもとに計算するため、うるう年も特別な調整なしで正しく処理されます。" },
        { q: "今日ではなく、特定の未来や過去の日付時点での年齢を計算できますか？", a: "この計算機は生年月日を今日の日付と比較する仕様です。別の日付での年齢を知りたい場合は、残り日数計算機や期間計算機を使って、生年月日と任意の日付との差を測ってください。" },
        { q: "年齢は年だけでなく月や週の単位でも計算できますか？", a: "はい。年齢を年単位で表示するだけでなく、経過時間を月・週・日の合計に細かく分解して表示するため、最も使いやすい単位で正確な年齢を確認できます。" },
      ],
    },
    ro: {
      title: "Calculator de Vârstă",
      intro: "Introdu data nașterii pentru a calcula vârsta exactă de astăzi, până la nivel de zi.",
      description: "Calculează vârsta exactă în ani, luni și zile.",
      faq: [
        { q: "Cum se calculează vârsta exactă?", a: "Calculul numără anii compleți de la data nașterii până astăzi, apoi lunile rămase, apoi zilele rămase - nu doar scade anul nașterii din anul curent." },
        { q: "Se ține cont de anii bisecți?", a: "Da - calculul folosește date reale de calendar în loc să presupună ani ficși de 365 de zile, deci anii bisecți sunt gestionați corect fără niciun ajustaj special." },
        { q: "Pot calcula vârsta la o dată viitoare sau trecută specifică, nu doar astăzi?", a: "Acest calculator compară data nașterii cu data de astăzi. Pentru vârsta la o altă dată, folosește calculatorul de zile rămase sau calculatorul de durată pentru a măsura diferența dintre data nașterii și orice altă dată." },
        { q: "Pot vedea vârsta în luni sau săptămâni, nu doar ani?", a: "Da - pe lângă afișarea vârstei în ani, calculatorul descompune timpul scurs în total de luni, săptămâni și zile, ca să poți vedea vârsta exactă în orice unitate îți este cea mai utilă." },
      ],
    },
  },

  "days-until-calculator": {
    es: {
      title: "Calculadora de Días Restantes",
      intro: "Elige una fecha para ver exactamente cuántos días, semanas y meses faltan para que llegue.",
      description: "Descubre cuántos días faltan para cualquier fecha futura.",
      faq: [
        { q: "¿Cómo se calculan los 'días restantes'?", a: "Es el número de días de calendario entre hoy y la fecha elegida, contando hacia adelante o hacia atrás desde la medianoche." },
        { q: "¿Esto cuenta fines de semana y festivos?", a: "Sí - esto cuenta todos los días de calendario, incluyendo fines de semana y festivos. Si necesitas un conteo solo de días hábiles (excluyendo fines de semana), usa la Calculadora de Días Hábiles." },
        { q: "¿Puedo calcular los días entre dos fechas futuras, no solo desde hoy?", a: "Sí, de forma indirecta: esta herramienta parte de hoy, pero la Calculadora de Duración de Fecha te permite elegir dos fechas arbitrarias (pasadas, presentes o futuras) y devuelve el número exacto de días entre ellas." },
        { q: "¿Puedo usar esto para contar los días hasta un evento recurrente como un cumpleaños?", a: "Sí - introduce la fecha del próximo año para un cumpleaños o aniversario que ya pasó este año, y la calculadora mostrará el número exacto de días hasta esa próxima ocurrencia." },
        { q: "¿Cuántos días faltan para Navidad?", a: "Fija la fecha objetivo en el 25 de diciembre del año actual (o del próximo) y esta calculadora te dará la cuenta regresiva exacta, incluido el equivalente en semanas y meses - útil para planear compras de regalos o viajes." },
      ],
    },
    fr: {
      title: "Calculatrice de Jours Restants",
      intro: "Choisissez une date pour voir exactement combien de jours, semaines et mois il reste avant son arrivée.",
      description: "Découvrez combien de jours il reste avant n'importe quelle date future.",
      faq: [
        { q: "Comment le nombre de « jours restants » est-il calculé ?", a: "C'est le nombre de jours calendaires entre aujourd'hui et la date choisie, en comptant à partir de minuit." },
        { q: "Cela compte-t-il les week-ends et jours fériés ?", a: "Oui - ce calcul compte chaque jour calendaire, y compris les week-ends et jours fériés. Si vous avez besoin d'un décompte en jours ouvrés uniquement (hors week-ends), utilisez la Calculatrice de Jours Ouvrés." },
        { q: "Puis-je calculer le nombre de jours entre deux dates futures, pas seulement à partir d'aujourd'hui ?", a: "Oui, indirectement - cet outil part d'aujourd'hui, mais la Calculatrice de Durée vous permet de choisir deux dates quelconques (passées, présentes ou futures) et renvoie le nombre exact de jours entre elles." },
        { q: "Puis-je l'utiliser pour compter les jours restants avant un événement récurrent comme un anniversaire ?", a: "Oui - saisissez la date de l'année prochaine pour un anniversaire déjà passé cette année, et la calculatrice affichera le nombre exact de jours restants avant cette prochaine occurrence." },
        { q: "Combien de jours reste-t-il avant Noël ?", a: "Réglez la date cible sur le 25 décembre de l'année en cours (ou de l'année prochaine) et cette calculatrice vous donnera le compte à rebours exact, avec l'équivalent en semaines et en mois - utile pour planifier vos achats de cadeaux ou vos voyages." },
      ],
    },
    de: {
      title: "Tage-bis-Rechner",
      intro: "Wählen Sie ein Datum, um genau zu sehen, wie viele Tage, Wochen und Monate bis dahin verbleiben.",
      description: "Finden Sie heraus, wie viele Tage bis zu einem beliebigen zukünftigen Datum verbleiben.",
      faq: [
        { q: "Wie werden die „verbleibenden Tage“ berechnet?", a: "Es ist die Anzahl der Kalendertage zwischen heute und dem gewählten Datum, gezählt ab Mitternacht." },
        { q: "Werden Wochenenden und Feiertage mitgezählt?", a: "Ja - hier werden alle Kalendertage gezählt, einschließlich Wochenenden und Feiertagen. Falls Sie nur Werktage benötigen (ohne Wochenenden), nutzen Sie stattdessen den Werktage-Rechner." },
        { q: "Kann ich die Tage zwischen zwei zukünftigen Daten berechnen, nicht nur ab heute?", a: "Ja, indirekt - dieses Tool geht von heute aus, aber der Datumsdifferenz-Rechner lässt Sie zwei beliebige Daten (Vergangenheit, Gegenwart oder Zukunft) wählen und liefert die genaue Anzahl der Tage dazwischen." },
        { q: "Kann ich damit die Tage bis zu einem wiederkehrenden Ereignis wie einem Geburtstag zählen?", a: "Ja - geben Sie das Datum für nächstes Jahr ein, falls ein Geburtstag oder Jahrestag dieses Jahr bereits vorbei ist, und der Rechner zeigt die genaue Anzahl an Tagen bis zu diesem nächsten Termin an." },
        { q: "Wie viele Tage sind es noch bis Weihnachten?", a: "Stellen Sie das Zieldatum auf den 25. Dezember des aktuellen (oder nächsten) Jahres ein, und dieser Rechner zeigt Ihnen den genauen Countdown, inklusive der Umrechnung in Wochen und Monate - praktisch für die Planung von Geschenkkäufen oder Reisen." },
      ],
    },
    pt: {
      title: "Calculadora de Dias Restantes",
      intro: "Escolha uma data para ver exatamente quantos dias, semanas e meses faltam até ela chegar.",
      description: "Descubra quantos dias faltam até qualquer data futura.",
      faq: [
        { q: "Como os 'dias restantes' são calculados?", a: "É o número de dias corridos entre hoje e a data escolhida, contando para frente ou para trás a partir da meia-noite." },
        { q: "Isso conta fins de semana e feriados?", a: "Sim - isso conta todos os dias corridos, incluindo fins de semana e feriados. Se você precisar de uma contagem apenas de dias úteis (excluindo fins de semana), use a Calculadora de Dias Úteis." },
        { q: "Posso calcular os dias entre duas datas futuras, não apenas a partir de hoje?", a: "Sim, indiretamente - esta ferramenta parte de hoje, mas a Calculadora de Duração de Data permite escolher duas datas arbitrárias (passadas, presentes ou futuras) e retorna o número exato de dias entre elas." },
        { q: "Posso usar isso para contar os dias até um evento recorrente, como um aniversário?", a: "Sim - insira a data do próximo ano para um aniversário que já passou este ano, e a calculadora mostrará o número exato de dias até essa próxima ocorrência." },
        { q: "Quantos dias faltam para o Natal?", a: "Defina a data de destino para 25 de dezembro do ano atual (ou do próximo) e esta calculadora dará a contagem regressiva exata, incluindo o equivalente em semanas e meses - útil para planejar compras de presentes ou viagens." },
      ],
    },
    it: {
      title: "Calcolatrice dei Giorni Rimanenti",
      intro: "Scegli una data per vedere esattamente quanti giorni, settimane e mesi mancano al suo arrivo.",
      description: "Scopri quanti giorni mancano a una data futura qualsiasi.",
      faq: [
        { q: "Come vengono calcolati i 'giorni rimanenti'?", a: "È il numero di giorni di calendario tra oggi e la data scelta, contando in avanti o indietro dalla mezzanotte." },
        { q: "Questo conta i weekend e le festività?", a: "Sì - questo conta ogni giorno di calendario, inclusi weekend e festività. Se hai bisogno di un conteggio solo di giorni lavorativi (esclusi i weekend), usa la Calcolatrice dei Giorni Lavorativi." },
        { q: "Posso calcolare i giorni tra due date future, non solo da oggi?", a: "Sì, indirettamente - questo strumento parte da oggi, ma la Calcolatrice della Durata tra Date ti permette di scegliere due date qualsiasi (passate, presenti o future) e restituisce il numero esatto di giorni tra loro." },
        { q: "Posso usarlo per contare i giorni fino a un evento ricorrente come un compleanno?", a: "Sì - inserisci la data dell'anno prossimo per un compleanno o un anniversario già trascorso quest'anno, e la calcolatrice mostrerà il numero esatto di giorni fino a quella prossima occorrenza." },
        { q: "Quanti giorni mancano a Natale?", a: "Imposta la data obiettivo sul 25 dicembre dell'anno in corso (o del prossimo) e questa calcolatrice ti darà il conto alla rovescia esatto, incluso l'equivalente in settimane e mesi - utile per pianificare acquisti di regali o viaggi." },
      ],
    },
    ja: {
      title: "残り日数計算機",
      intro: "日付を選択すると、その日までの残り日数・週数・月数が正確にわかります。",
      description: "任意の未来の日付までの残り日数を調べます。",
      faq: [
        { q: "「残り日数」はどのように計算されますか？", a: "今日から選択した日付までの暦日数で、深夜0時を基準に前後を数えます。" },
        { q: "週末や祝日もカウントされますか？", a: "はい。週末や祝日を含むすべての暦日をカウントします。週末を除いた営業日のみのカウントが必要な場合は、営業日計算機をご利用ください。" },
        { q: "今日からではなく、2つの未来の日付の間の日数を計算できますか？", a: "間接的には可能です。このツールは今日を基準にしていますが、期間計算機を使えば任意の2つの日付（過去・現在・未来）を選んで、その間の正確な日数を求めることができます。" },
        { q: "誕生日のような繰り返しのイベントまでの日数を数えるのにも使えますか？", a: "はい。今年すでに過ぎてしまった誕生日や記念日については、来年の日付を入力すれば、次回の日までの正確な日数を表示します。" },
        { q: "クリスマスまであと何日ですか？", a: "対象日を今年（または来年）の12月25日に設定すると、正確なカウントダウンが週数・月数の目安とともに表示されます。プレゼントの準備や旅行の計画に便利です。" },
      ],
    },
    ro: {
      title: "Calculator Zile Rămase",
      intro: "Alege o dată pentru a afla exact câte zile, săptămâni și luni mai sunt până la ea.",
      description: "Află câte zile mai sunt până la orice dată viitoare.",
      faq: [
        { q: "Cum se calculează 'zilele rămase'?", a: "Numărul de zile calendaristice de la astăzi până la data aleasă, numărând limitele de zi de la miezul nopții." },
        { q: "Se numără weekendurile și sărbătorile?", a: "Da - se numără toate zilele calendaristice, inclusiv weekendurile și sărbătorile. Dacă ai nevoie doar de zile lucrătoare, fără weekenduri, folosește calculatorul de zile lucrătoare." },
        { q: "Pot calcula zilele dintre două date viitoare, nu doar de la astăzi?", a: "Indirect, da - acest instrument pornește de la data de astăzi, dar calculatorul de durată îți permite să alegi orice două date (trecute, prezente sau viitoare) pentru a afla numărul exact de zile dintre ele." },
        { q: "Pot folosi asta pentru a număra zilele până la un eveniment recurent, cum ar fi o zi de naștere?", a: "Da - dacă ziua de naștere sau aniversarea a trecut deja anul acesta, introdu data pentru anul următor pentru a vedea exact câte zile mai sunt până la următoarea apariție." },
        { q: "Câte zile mai sunt până la Crăciun?", a: "Setează data țintă pe 25 decembrie a anului curent (sau următor) pentru un numărător exact, plus echivalentul aproximativ în săptămâni și luni - util pentru planificarea cadourilor sau a călătoriilor." },
      ],
    },
  },

  "unit-length-converter": {
    es: {
      title: "Conversor de CM a Pulgadas",
      intro: "Introduce un valor y elige las unidades para convertir entre medidas de longitud comunes.",
      description: "Convierte entre centímetros, pulgadas, pies y metros.",
      faq: [
        { q: "¿Cuántas pulgadas tiene un centímetro?", a: "1 centímetro equivale a unas 0,3937 pulgadas. Para convertir cm a pulgadas, divide entre 2,54." },
        { q: "¿Esta conversión es exacta o redondeada?", a: "El factor de conversión subyacente (1 pulgada = 2,54 cm) es exacto por definición internacional - cualquier redondeo que veas es solo el resultado mostrado ajustado a un número legible de decimales." },
        { q: "¿Por qué algunos conversores en línea dan una respuesta ligeramente distinta?", a: "Las pequeñas diferencias suelen deberse al redondeo en distintos decimales, no a un factor de conversión distinto: la relación de 1 pulgada = 2,54 cm es un estándar internacional fijo, así que cualquier conversor preciso debería coincidir al comparar con la misma precisión." },
        { q: "¿Qué unidades de longitud admite este convertidor?", a: "Esta herramienta convierte entre unidades métricas (milímetros, centímetros, metros, kilómetros) y unidades imperiales/estadounidenses (pulgadas, pies, yardas, millas), para que puedas convertir en cualquier dirección sin memorizar los factores de conversión." },
      ],
    },
    fr: {
      title: "Convertisseur CM en Pouces",
      intro: "Saisissez une valeur et choisissez les unités pour convertir entre les mesures de longueur courantes.",
      description: "Convertissez entre centimètres, pouces, pieds et mètres.",
      faq: [
        { q: "Combien de pouces fait un centimètre ?", a: "1 centimètre équivaut à environ 0,3937 pouce. Pour convertir des cm en pouces, divisez par 2,54." },
        { q: "Cette conversion est-elle exacte ou arrondie ?", a: "Le facteur de conversion sous-jacent (1 pouce = 2,54 cm) est exact par définition internationale - tout arrondi que vous voyez correspond simplement au résultat affiché, ajusté à un nombre lisible de décimales." },
        { q: "Pourquoi certains convertisseurs en ligne donnent-ils une réponse légèrement différente ?", a: "Les petites différences proviennent généralement d'un arrondi à des décimales différentes, et non d'un facteur de conversion différent - la relation sous-jacente de 1 pouce = 2,54 cm est une norme internationale fixe, donc tout convertisseur précis devrait concorder une fois comparé à la même précision." },
        { q: "Quelles unités de longueur ce convertisseur prend-il en charge ?", a: "Cet outil convertit entre les unités métriques (millimètres, centimètres, mètres, kilomètres) et les unités impériales/américaines (pouces, pieds, yards, miles), afin que vous puissiez convertir dans les deux sens sans mémoriser les facteurs de conversion." },
      ],
    },
    de: {
      title: "CM-zu-Zoll-Umrechner",
      intro: "Geben Sie einen Wert ein und wählen Sie die Einheiten, um zwischen gängigen Längenmaßen umzurechnen.",
      description: "Rechnen Sie zwischen Zentimetern, Zoll, Fuß und Metern um.",
      faq: [
        { q: "Wie viele Zoll hat ein Zentimeter?", a: "1 Zentimeter entspricht etwa 0,3937 Zoll. Um cm in Zoll umzurechnen, teilen Sie durch 2,54." },
        { q: "Ist diese Umrechnung exakt oder gerundet?", a: "Der zugrunde liegende Umrechnungsfaktor (1 Zoll = 2,54 cm) ist per internationaler Definition exakt - jede sichtbare Rundung betrifft nur die Anzeige auf eine lesbare Anzahl Dezimalstellen." },
        { q: "Warum liefern manche Online-Umrechner ein leicht abweichendes Ergebnis?", a: "Kleine Abweichungen entstehen meist durch Rundung auf unterschiedliche Nachkommastellen, nicht durch einen anderen Umrechnungsfaktor - das zugrunde liegende Verhältnis 1 Zoll = 2,54 cm ist ein fester internationaler Standard, sodass jeder korrekte Umrechner bei gleicher Genauigkeit übereinstimmen sollte." },
        { q: "Welche Längeneinheiten unterstützt dieser Umrechner?", a: "Dieses Tool rechnet zwischen metrischen Einheiten (Millimeter, Zentimeter, Meter, Kilometer) und imperialen/US-Einheiten (Zoll, Fuß, Yards, Meilen) um, sodass Sie in beide Richtungen umrechnen können, ohne sich Umrechnungsfaktoren merken zu müssen." },
      ],
    },
    pt: {
      title: "Conversor de CM para Polegadas",
      intro: "Insira um valor e escolha as unidades para converter entre medidas de comprimento comuns.",
      description: "Converta entre centímetros, polegadas, pés e metros.",
      faq: [
        { q: "Quantas polegadas tem um centímetro?", a: "1 centímetro equivale a cerca de 0,3937 polegadas. Para converter cm em polegadas, divida por 2,54." },
        { q: "Essa conversão é exata ou arredondada?", a: "O fator de conversão subjacente (1 polegada = 2,54 cm) é exato por definição internacional - qualquer arredondamento que você vê é apenas o resultado exibido ajustado para um número legível de casas decimais." },
        { q: "Por que alguns conversores online dão uma resposta ligeiramente diferente?", a: "Pequenas diferenças geralmente vêm do arredondamento em casas decimais diferentes, não de um fator de conversão diferente - a relação de 1 polegada = 2,54 cm é um padrão internacional fixo, então qualquer conversor preciso deve concordar ao comparar na mesma precisão." },
        { q: "Quais unidades de comprimento este conversor suporta?", a: "Esta ferramenta converte entre unidades métricas (milímetros, centímetros, metros, quilômetros) e unidades imperiais/americanas (polegadas, pés, jardas, milhas), para que você possa converter em qualquer direção sem decorar os fatores de conversão." },
      ],
    },
    it: {
      title: "Convertitore da CM a Pollici",
      intro: "Inserisci un valore e scegli le unità per convertire tra le misure di lunghezza più comuni.",
      description: "Converti tra centimetri, pollici, piedi e metri.",
      faq: [
        { q: "Quanti pollici ha un centimetro?", a: "1 centimetro equivale a circa 0,3937 pollici. Per convertire cm in pollici, dividi per 2,54." },
        { q: "Questa conversione è esatta o arrotondata?", a: "Il fattore di conversione sottostante (1 pollice = 2,54 cm) è esatto per definizione internazionale - qualsiasi arrotondamento che vedi è solo il risultato mostrato adattato a un numero leggibile di cifre decimali." },
        { q: "Perché alcuni convertitori online danno una risposta leggermente diversa?", a: "Le piccole differenze di solito derivano dall'arrotondamento a decimali diversi, non da un fattore di conversione diverso - il rapporto di base 1 pollice = 2,54 cm è uno standard internazionale fisso, quindi qualsiasi convertitore accurato dovrebbe concordare se confrontato con la stessa precisione." },
        { q: "Quali unità di lunghezza supporta questo convertitore?", a: "Questo strumento converte tra unità metriche (millimetri, centimetri, metri, chilometri) e unità imperiali/statunitensi (pollici, piedi, iarde, miglia), così puoi convertire in entrambe le direzioni senza memorizzare i fattori di conversione." },
      ],
    },
    ja: {
      title: "cm・インチ変換ツール",
      intro: "数値を入力し、単位を選択すると、一般的な長さの単位間で変換できます。",
      description: "センチメートル、インチ、フィート、メートルの間で変換します。",
      faq: [
        { q: "1センチメートルは何インチですか？", a: "1センチメートルは約0.3937インチです。cmをインチに変換するには2.54で割ります。" },
        { q: "この変換は正確ですか、それとも四捨五入されていますか？", a: "変換係数そのもの（1インチ＝2.54cm）は国際的な定義により厳密な値です。表示上見える丸めは、結果を読みやすい小数点以下の桁数に調整しているだけです。" },
        { q: "オンライン変換ツールによって答えがわずかに異なるのはなぜですか？", a: "わずかな違いは通常、変換係数の違いではなく、四捨五入する小数点以下の桁数の違いによるものです。1インチ＝2.54cmという関係は国際的に定められた固定値なので、同じ精度で比較すれば正確な変換ツールの結果は一致するはずです。" },
        { q: "この変換ツールはどの長さの単位に対応していますか？", a: "このツールはメートル法の単位（ミリメートル、センチメートル、メートル、キロメートル）とヤードポンド法の単位（インチ、フィート、ヤード、マイル）の両方に対応しているため、換算係数を覚えていなくてもどちらの方向にも変換できます。" },
      ],
    },
    ro: {
      title: "Convertor cm-inch",
      intro: "Introdu un număr și alege unitățile pentru a converti între unitățile obișnuite de lungime.",
      description: "Convertește între centimetri, inch-uri, picioare și metri.",
      faq: [
        { q: "Câți inch-i este un centimetru?", a: "Un centimetru este aproximativ 0,3937 inch-i. Pentru a converti cm în inch-i, împarte la 2,54." },
        { q: "Este această conversie exactă sau rotunjită?", a: "Factorul de conversie în sine (1 inch = 2,54cm) este exact prin definiție internațională. Orice rotunjire vizibilă este doar pentru a afișa rezultatul la un număr rezonabil de zecimale." },
        { q: "De ce diferă ușor rezultatele la convertoarele online?", a: "Micile diferențe se datorează de obicei numărului diferit de zecimale la care se face rotunjirea, nu unui factor de conversie diferit - relația de 1 inch = 2,54cm este fixă și definită internațional, deci convertoarele exacte ar trebui să fie de acord dacă compari la aceeași precizie." },
        { q: "Ce unități de lungime acoperă acest convertor?", a: "Acest instrument gestionează atât unitățile metrice (milimetri, centimetri, metri, kilometri), cât și cele imperiale (inch-i, picioare, yarzi, mile), deci poți converti în orice direcție fără să memorezi factorii de conversie." },
      ],
    },
  },

  "temperature-converter": {
    es: {
      title: "Conversor de Temperatura",
      intro: "Introduce una temperatura y elige una unidad de partida para convertir entre Fahrenheit, Celsius y Kelvin.",
      description: "Convierte entre Fahrenheit, Celsius y Kelvin.",
      faq: [
        { q: "¿Cómo convierto Fahrenheit a Celsius?", a: "Resta 32 y luego multiplica por 5/9. 98,6°F: (98,6 − 32) × 5/9 = 37°C - temperatura corporal humana normal." },
        { q: "¿Por qué la conversión de temperatura necesita un desplazamiento y no solo una multiplicación?", a: "Fahrenheit y Celsius tienen puntos cero distintos (el agua se congela a 0°C pero a 32°F), por lo que la conversión requiere desplazar la escala primero, a diferencia de las conversiones de longitud o peso, que solo necesitan un multiplicador." },
        { q: "¿Qué temperatura tiene el mismo número en Celsius y en Fahrenheit?", a: "−40 grados: es el único punto donde ambas escalas coinciden, ya que −40 °C × 9/5 + 32 = −40 °F exactamente; cualquier otra temperatura muestra un número distinto en cada escala." },
        { q: "¿Esto también convierte a y desde Kelvin?", a: "Sí - además de Celsius y Fahrenheit, este convertidor admite Kelvin, útil para cálculos científicos ya que comienza en el cero absoluto en lugar de un punto de referencia arbitrario." },
      ],
    },
    fr: {
      title: "Convertisseur de Température",
      intro: "Saisissez une température et choisissez une unité de départ pour convertir entre Fahrenheit, Celsius et Kelvin.",
      description: "Convertissez entre Fahrenheit, Celsius et Kelvin.",
      faq: [
        { q: "Comment convertir des Fahrenheit en Celsius ?", a: "Soustrayez 32, puis multipliez par 5/9. 98,6°F : (98,6 − 32) × 5/9 = 37°C - température corporelle humaine normale." },
        { q: "Pourquoi la conversion de température nécessite-t-elle un décalage et pas seulement une multiplication ?", a: "Fahrenheit et Celsius ont des points zéro différents (l'eau gèle à 0°C mais à 32°F), donc la conversion nécessite d'abord de décaler l'échelle, contrairement aux conversions de longueur ou de poids qui n'ont besoin que d'un multiplicateur." },
        { q: "À quelle température le nombre est-il identique en Celsius et en Fahrenheit ?", a: "−40 degrés - c'est le seul point où les deux échelles se croisent, puisque −40 °C × 9/5 + 32 = −40 °F exactement ; toute autre température affiche un nombre différent sur chaque échelle." },
        { q: "Cela convertit-il aussi vers et depuis le Kelvin ?", a: "Oui - en plus de Celsius et Fahrenheit, ce convertisseur prend en charge le Kelvin, utile pour les calculs scientifiques puisqu'il commence au zéro absolu plutôt qu'à un point de référence arbitraire." },
      ],
    },
    de: {
      title: "Temperaturumrechner",
      intro: "Geben Sie eine Temperatur ein und wählen Sie eine Ausgangseinheit, um zwischen Fahrenheit, Celsius und Kelvin umzurechnen.",
      description: "Rechnen Sie zwischen Fahrenheit, Celsius und Kelvin um.",
      faq: [
        { q: "Wie rechne ich Fahrenheit in Celsius um?", a: "Ziehen Sie 32 ab und multiplizieren Sie dann mit 5/9. 98,6°F: (98,6 − 32) × 5/9 = 37°C - normale menschliche Körpertemperatur." },
        { q: "Warum braucht die Temperaturumrechnung eine Verschiebung statt nur eine Multiplikation?", a: "Fahrenheit und Celsius haben unterschiedliche Nullpunkte (gefrierendes Wasser liegt bei 0°C, aber 32°F), daher muss die Skala zuerst verschoben werden - anders als bei Längen- oder Gewichtsumrechnungen, die nur einen Multiplikator benötigen." },
        { q: "Bei welcher Temperatur ist die Zahl in Celsius und Fahrenheit gleich?", a: "−40 Grad - das ist der einzige Punkt, an dem sich die beiden Skalen schneiden, da −40 °C × 9/5 + 32 exakt −40 °F ergibt; bei jeder anderen Temperatur zeigen beide Skalen eine unterschiedliche Zahl." },
        { q: "Rechnet dieses Tool auch in und aus Kelvin um?", a: "Ja - neben Celsius und Fahrenheit unterstützt dieser Umrechner auch Kelvin, was für wissenschaftliche Berechnungen nützlich ist, da es beim absoluten Nullpunkt statt an einem willkürlichen Bezugspunkt beginnt." },
      ],
    },
    pt: {
      title: "Conversor de Temperatura",
      intro: "Insira uma temperatura e escolha uma unidade de partida para converter entre Fahrenheit, Celsius e Kelvin.",
      description: "Converta entre Fahrenheit, Celsius e Kelvin.",
      faq: [
        { q: "Como converto Fahrenheit para Celsius?", a: "Subtraia 32 e depois multiplique por 5/9. 98,6°F: (98,6 − 32) × 5/9 = 37°C - temperatura corporal humana normal." },
        { q: "Por que a conversão de temperatura precisa de um deslocamento e não apenas de multiplicação?", a: "Fahrenheit e Celsius têm pontos zero diferentes (a água congela a 0°C, mas a 32°F), então a conversão exige deslocar a escala primeiro, diferente das conversões de comprimento ou peso, que precisam apenas de um multiplicador." },
        { q: "Em que temperatura o número é igual em Celsius e Fahrenheit?", a: "−40 graus - é o único ponto em que as duas escalas se cruzam, já que −40°C × 9/5 + 32 = −40°F exatamente; qualquer outra temperatura mostra um número diferente em cada escala." },
        { q: "Isso também converte para e a partir de Kelvin?", a: "Sim - além de Celsius e Fahrenheit, este conversor suporta Kelvin, útil para cálculos científicos, já que começa no zero absoluto em vez de um ponto de referência arbitrário." },
      ],
    },
    it: {
      title: "Convertitore di Temperatura",
      intro: "Inserisci una temperatura e scegli un'unità di partenza per convertire tra Fahrenheit, Celsius e Kelvin.",
      description: "Converti tra Fahrenheit, Celsius e Kelvin.",
      faq: [
        { q: "Come converto i Fahrenheit in Celsius?", a: "Sottrai 32, poi moltiplica per 5/9. 98,6°F: (98,6 − 32) × 5/9 = 37°C - temperatura corporea umana normale." },
        { q: "Perché la conversione della temperatura richiede uno spostamento e non solo una moltiplicazione?", a: "Fahrenheit e Celsius hanno punti zero diversi (l'acqua congela a 0°C ma a 32°F), quindi la conversione richiede prima di spostare la scala, a differenza delle conversioni di lunghezza o peso che richiedono solo un moltiplicatore." },
        { q: "A quale temperatura il numero è uguale sia in Celsius che in Fahrenheit?", a: "−40 gradi - è l'unico punto in cui le due scale si incrociano, poiché −40°C × 9/5 + 32 = −40°F esattamente; ogni altra temperatura mostra un numero diverso su ciascuna scala." },
        { q: "Questo converte anche da e verso i Kelvin?", a: "Sì - oltre a Celsius e Fahrenheit, questo convertitore supporta i Kelvin, utili per calcoli scientifici poiché iniziano dallo zero assoluto invece che da un punto di riferimento arbitrario." },
      ],
    },
    ja: {
      title: "温度変換ツール",
      intro: "温度と変換元の単位を入力すると、華氏・摂氏・ケルビンの間で変換できます。",
      description: "華氏、摂氏、ケルビンの間で変換します。",
      faq: [
        { q: "華氏から摂氏への変換方法は？", a: "32を引いてから5/9を掛けます。98.6°Fの場合：(98.6 − 32) × 5/9 = 37°C（人間の平熱）です。" },
        { q: "なぜ温度変換には掛け算だけでなくオフセットが必要なのですか？", a: "華氏と摂氏では基準点（0度）が異なるため（水は0°Cで凍りますが、華氏では32°F）、まずスケールをずらす必要があります。これは掛け算だけで済む長さや重さの変換とは異なる点です。" },
        { q: "摂氏と華氏で同じ数値になる温度はありますか？", a: "−40度です。−40°C × 9/5 + 32 = −40°Fとなり、2つの目盛りが一致する唯一の点です。それ以外の温度では、両方の目盛りで異なる数値になります。" },
        { q: "ケルビンとの相互変換にも対応していますか？", a: "はい。摂氏・華氏に加えて、このツールはケルビンにも対応しています。ケルビンは任意の基準点ではなく絶対零度を起点とするため、科学的な計算に便利です。" },
      ],
    },
    ro: {
      title: "Convertor de Temperatură",
      intro: "Introdu o temperatură și unitatea din care convertești pentru a trece între Fahrenheit, Celsius și Kelvin.",
      description: "Convertește între Fahrenheit, Celsius și Kelvin.",
      faq: [
        { q: "Cum convertesc din Fahrenheit în Celsius?", a: "Scade 32, apoi înmulțește cu 5/9. Pentru 98,6°F: (98,6 − 32) × 5/9 = 37°C (temperatura normală a corpului uman)." },
        { q: "De ce conversia temperaturii are nevoie de o deplasare, nu doar de o înmulțire?", a: "Fahrenheit și Celsius au puncte de zero diferite (apa îngheață la 0°C, dar la 32°F), deci scalele trebuie deplasate mai întâi - spre deosebire de conversiile de lungime sau greutate, care necesită doar o înmulțire." },
        { q: "Există o temperatură la care Celsius și Fahrenheit sunt egale?", a: "Da, la −40 de grade. −40°C × 9/5 + 32 = −40°F, singurul punct în care cele două scale coincid. La orice altă temperatură, cele două scale dau numere diferite." },
        { q: "Gestionează și Kelvin?", a: "Da - pe lângă Celsius și Fahrenheit, acest instrument gestionează și Kelvin, care pornește de la zero absolut în loc de un punct de referință arbitrar, ceea ce îl face util pentru calcule științifice." },
      ],
    },
  },

  "word-counter": {
    es: {
      title: "Contador de Palabras",
      intro: "Pega o escribe texto a continuación para contar instantáneamente palabras, caracteres y oraciones.",
      description: "Cuenta palabras, caracteres y oraciones en tu texto.",
      faq: [
        { q: "¿Este contador de palabras guarda mi texto?", a: "No - el conteo se realiza enteramente en tu navegador y no se envía ni almacena nada." },
        { q: "¿Cuenta las palabras igual que Microsoft Word?", a: "Muy similar, pero no siempre idéntico - este contador divide por espacios en blanco, que es como cuentan la mayoría de los procesadores de texto, pero casos especiales como palabras con guion o números pueden contarse ligeramente distinto entre herramientas." },
        { q: "¿Qué se considera una 'oración' en el conteo de oraciones?", a: "El texto que termina en punto, signo de interrogación o de exclamación se cuenta como una oración; las abreviaturas con punto (como 'Dr.' o 'p. ej.') pueden a veces inflar ligeramente el conteo, ya que la herramienta no siempre distingue un punto final de oración de un punto de abreviatura." },
        { q: "¿Esta herramienta cuenta caracteres además de palabras?", a: "Sí - además del conteo de palabras, muestra el conteo de caracteres con y sin espacios, además del conteo de oraciones y párrafos, útil para cumplir límites estrictos de caracteres como en publicaciones de redes sociales o metadescripciones." },
      ],
    },
    fr: {
      title: "Compteur de Mots",
      intro: "Collez ou saisissez du texte ci-dessous pour compter instantanément les mots, les caractères et les phrases.",
      description: "Comptez les mots, les caractères et les phrases de votre texte.",
      faq: [
        { q: "Ce compteur de mots enregistre-t-il mon texte ?", a: "Non - le comptage s'effectue entièrement dans votre navigateur et rien n'est envoyé ni stocké." },
        { q: "Compte-t-il les mots de la même façon que Microsoft Word ?", a: "Très proche, mais pas toujours identique - ce compteur se base sur les espaces, comme la plupart des traitements de texte, mais des cas particuliers comme les mots à trait d'union ou les nombres peuvent être comptés légèrement différemment d'un outil à l'autre." },
        { q: "Qu'est-ce qui compte comme une « phrase » dans le comptage des phrases ?", a: "Un texte se terminant par un point, un point d'interrogation ou d'exclamation est compté comme une phrase - les abréviations avec point (comme « Dr. » ou « ex. ») peuvent parfois gonfler légèrement le compte, car l'outil ne peut pas toujours distinguer un point de fin de phrase d'un point d'abréviation." },
        { q: "Cet outil compte-t-il aussi les caractères en plus des mots ?", a: "Oui - en plus du nombre de mots, il affiche le nombre de caractères avec et sans espaces, ainsi que le nombre de phrases et de paragraphes, utile pour respecter des limites strictes de caractères comme les publications sur les réseaux sociaux ou les méta-descriptions." },
      ],
    },
    de: {
      title: "Wortzähler",
      intro: "Fügen Sie unten Text ein oder tippen Sie ihn, um sofort Wörter, Zeichen und Sätze zu zählen.",
      description: "Zählen Sie Wörter, Zeichen und Sätze in Ihrem Text.",
      faq: [
        { q: "Speichert dieser Wortzähler meinen Text?", a: "Nein - die Zählung läuft vollständig in Ihrem Browser, es wird nichts gesendet oder gespeichert." },
        { q: "Zählt er Wörter genauso wie Microsoft Word?", a: "Sehr ähnlich, aber nicht immer identisch - dieser Zähler trennt anhand von Leerzeichen, wie es die meisten Textverarbeitungen tun, aber Grenzfälle wie Bindestrich-Wörter oder Zahlen können je nach Tool leicht unterschiedlich gezählt werden." },
        { q: "Was zählt als „Satz“ bei der Satzzählung?", a: "Text, der mit einem Punkt, Frage- oder Ausrufezeichen endet, wird als ein Satz gezählt - Abkürzungen mit Punkt (wie „Dr.“ oder „z. B.“) können die Zählung gelegentlich leicht erhöhen, da das Tool einen satzabschließenden Punkt nicht immer von einem Abkürzungspunkt unterscheiden kann." },
        { q: "Zählt dieses Tool auch Zeichen und nicht nur Wörter?", a: "Ja - neben der Wortanzahl zeigt es die Zeichenanzahl mit und ohne Leerzeichen sowie die Anzahl der Sätze und Absätze an, was nützlich ist, um strikte Zeichenlimits wie bei Social-Media-Beiträgen oder Meta-Beschreibungen einzuhalten." },
      ],
    },
    pt: {
      title: "Contador de Palavras",
      intro: "Cole ou digite o texto abaixo para contar instantaneamente palavras, caracteres e frases.",
      description: "Conte palavras, caracteres e frases no seu texto.",
      faq: [
        { q: "Este contador de palavras salva meu texto?", a: "Não - a contagem é feita inteiramente no seu navegador e nada é enviado ou armazenado." },
        { q: "Ele conta palavras da mesma forma que o Microsoft Word?", a: "Bem próximo, mas nem sempre idêntico - este contador divide por espaços em branco, que é como a maioria dos processadores de texto conta também, mas casos específicos como palavras com hífen ou números podem ser contados de forma ligeiramente diferente entre ferramentas." },
        { q: "O que conta como uma 'frase' na contagem de frases?", a: "Um texto que termina em ponto final, ponto de interrogação ou exclamação é contado como uma frase - abreviações com ponto (como 'Dr.' ou 'ex.') podem ocasionalmente inflar um pouco a contagem, já que a ferramenta nem sempre consegue distinguir um ponto final de frase de um ponto de abreviação." },
        { q: "Esta ferramenta conta caracteres além de palavras?", a: "Sim - além da contagem de palavras, ela mostra a contagem de caracteres com e sem espaços, além da contagem de frases e parágrafos, útil para cumprir limites rígidos de caracteres, como em postagens de redes sociais ou meta descrições." },
      ],
    },
    it: {
      title: "Contatore di Parole",
      intro: "Incolla o digita il testo qui sotto per contare istantaneamente parole, caratteri e frasi.",
      description: "Conta parole, caratteri e frasi nel tuo testo.",
      faq: [
        { q: "Questo contatore di parole salva il mio testo?", a: "No - il conteggio avviene interamente nel tuo browser e nulla viene inviato o memorizzato." },
        { q: "Conta le parole allo stesso modo di Microsoft Word?", a: "Molto simile, ma non sempre identico - questo contatore divide in base agli spazi bianchi, come fanno anche la maggior parte degli elaboratori di testo, ma casi limite come parole con trattino o numeri possono essere conteggiati in modo leggermente diverso tra i vari strumenti." },
        { q: "Cosa conta come 'frase' nel conteggio delle frasi?", a: "Un testo che termina con un punto, un punto interrogativo o esclamativo viene contato come una frase - le abbreviazioni con punto (come 'Dott.' o 'es.') possono a volte gonfiare leggermente il conteggio, poiché lo strumento non sempre riesce a distinguere un punto di fine frase da un punto di abbreviazione." },
        { q: "Questo strumento conta anche i caratteri oltre alle parole?", a: "Sì - oltre al conteggio delle parole, mostra il conteggio dei caratteri con e senza spazi, oltre al conteggio di frasi e paragrafi, utile per rispettare limiti rigidi di caratteri come nei post sui social media o nelle meta description." },
      ],
    },
    ja: {
      title: "文字数・単語数カウンター",
      intro: "以下にテキストを貼り付けるか入力すると、単語数・文字数・文の数を即座にカウントします。",
      description: "テキストの単語数、文字数、文の数をカウントします。",
      faq: [
        { q: "このツールは入力したテキストを保存しますか？", a: "いいえ。カウントはすべてブラウザ内で行われ、データが送信・保存されることはありません。" },
        { q: "Microsoft Wordと同じ数え方ですか？", a: "非常に近いですが、常に同じとは限りません。このツールは空白で区切って数える、多くのワープロソフトと同様の方式ですが、ハイフン付きの単語や数字などの境界的なケースでは、ツールによって数え方がわずかに異なることがあります。" },
        { q: "「文」のカウントでは何が1文としてカウントされますか？", a: "ピリオド、疑問符、感嘆符で終わるテキストが1文としてカウントされます。「Dr.」や「e.g.」のような省略記号のピリオドは、文末のピリオドと区別できない場合があるため、まれにカウントが少し多くなることがあります。" },
        { q: "このツールは単語数だけでなく文字数も数えますか？", a: "はい。単語数に加えて、スペースを含む・含まない文字数、さらに文の数や段落数も表示します。SNS投稿やメタディスクリプションのような厳しい文字数制限を守る際に便利です。" },
      ],
    },
    ro: {
      title: "Numărător de Cuvinte și Caractere",
      intro: "Lipește sau tastează text mai jos pentru a număra instant cuvintele, caracterele și propozițiile.",
      description: "Numără cuvintele, caracterele și propozițiile dintr-un text.",
      faq: [
        { q: "Această unealtă salvează textul pe care îl introduc?", a: "Nu - numărarea are loc în întregime în browserul tău, iar datele nu sunt niciodată trimise sau stocate." },
        { q: "Se numără la fel ca în Microsoft Word?", a: "Foarte aproape, dar nu întotdeauna identic. Acest instrument numără cuvintele separate prin spații, similar cu majoritatea procesoarelor de text, dar cazurile marginale precum cuvintele cu cratimă sau numerele pot fi tratate ușor diferit de la un instrument la altul." },
        { q: "Ce se numără ca o 'propoziție'?", a: "Textul care se termină cu punct, semn de întrebare sau semn de exclamare este numărat ca o propoziție. Abrevierile cu punct (cum ar fi 'Dr.' sau 'de ex.') pot fi uneori greu de distins de sfârșitul unei propoziții, deci numărătoarea poate fi ocazional puțin mai mare decât te-ai aștepta." },
        { q: "Numără și caracterele, nu doar cuvintele?", a: "Da - pe lângă numărul de cuvinte, afișează numărul de caractere cu și fără spații, precum și numărul de propoziții și paragrafe - util pentru respectarea limitelor stricte de caractere, cum ar fi postările pe rețele sociale sau meta descrierile." },
      ],
    },
  },

  "case-converter": {
    es: {
      title: "Conversor de Mayúsculas y Minúsculas",
      intro: "Pega tu texto y elige un formato para convertirlo a MAYÚSCULAS, minúsculas, Tipo Título o Tipo oración.",
      description: "Convierte texto entre mayúsculas, minúsculas, tipo título y tipo oración.",
      faq: [
        { q: "¿Cuál es la diferencia entre tipo título y tipo oración?", a: "El tipo título pone en mayúscula la primera letra de cada palabra principal ('Hola Mundo Ejemplo'), mientras que el tipo oración solo pone en mayúscula la primera letra de todo el texto ('Hola mundo ejemplo')." },
        { q: "¿Este conversor guarda mi texto?", a: "No - la conversión se realiza enteramente en tu navegador y no se envía ni almacena nada." },
        { q: "¿Esto maneja correctamente letras acentuadas y caracteres no ingleses?", a: "Sí: la conversión de mayúsculas y minúsculas funciona con texto Unicode estándar, incluidas letras acentuadas (é, ñ, ü, etc.), de modo que convertir a mayúsculas o minúsculas conserva los acentos correctamente en lugar de eliminarlos." },
        { q: "¿Qué estilos de mayúsculas/minúsculas admite este convertidor?", a: "Además de tipo título y tipo oración, convierte a MAYÚSCULAS, minúsculas, camelCase y otros estilos de formato comunes usados en escritura y código, para que puedas reformatear texto según el contexto que necesites." },
      ],
    },
    fr: {
      title: "Convertisseur de Casse",
      intro: "Collez votre texte et choisissez une casse pour le convertir en MAJUSCULES, minuscules, Casse de Titre ou Casse de phrase.",
      description: "Convertissez du texte entre majuscules, minuscules, casse de titre et casse de phrase.",
      faq: [
        { q: "Quelle est la différence entre la casse de titre et la casse de phrase ?", a: "La casse de titre met une majuscule à la première lettre de chaque mot principal (« Bonjour Le Monde »), tandis que la casse de phrase ne met une majuscule qu'à la première lettre du texte entier (« Bonjour le monde »)." },
        { q: "Ce convertisseur enregistre-t-il mon texte ?", a: "Non - la conversion s'effectue entièrement dans votre navigateur et rien n'est envoyé ni stocké." },
        { q: "Cela gère-t-il correctement les lettres accentuées et les caractères non anglais ?", a: "Oui - la conversion de casse fonctionne sur du texte Unicode standard, y compris les lettres accentuées (é, ñ, ü, etc.), de sorte que la conversion en majuscules ou minuscules préserve correctement les accents au lieu de les supprimer." },
        { q: "Quels styles de casse ce convertisseur prend-il en charge ?", a: "Au-delà de la casse de titre et de la casse de phrase, il convertit en MAJUSCULES, minuscules, camelCase et d'autres styles de formatage courants utilisés dans l'écriture et le code, afin de reformater le texte selon le contexte dont vous avez besoin." },
      ],
    },
    de: {
      title: "Groß-/Kleinschreibungs-Konverter",
      intro: "Fügen Sie Ihren Text ein und wählen Sie eine Schreibweise: GROSSBUCHSTABEN, Kleinbuchstaben, Titelschreibweise oder Satzschreibweise.",
      description: "Wandeln Sie Text zwischen Groß-, Klein-, Titel- und Satzschreibweise um.",
      faq: [
        { q: "Was ist der Unterschied zwischen Titelschreibweise und Satzschreibweise?", a: "Bei der Titelschreibweise wird der erste Buchstabe jedes wichtigen Wortes großgeschrieben („Hallo Welt Beispiel“), bei der Satzschreibweise nur der erste Buchstabe des gesamten Textes („Hallo welt beispiel“)." },
        { q: "Speichert dieser Konverter meinen Text?", a: "Nein - die Umwandlung läuft vollständig in Ihrem Browser, es wird nichts gesendet oder gespeichert." },
        { q: "Werden Buchstaben mit Akzenten und nicht-englische Zeichen korrekt behandelt?", a: "Ja - die Groß-/Kleinschreibungsumwandlung funktioniert mit Standard-Unicode-Text, einschließlich Buchstaben mit Akzenten (é, ñ, ü usw.), sodass beim Umwandeln in Groß- oder Kleinbuchstaben Akzente korrekt erhalten bleiben, statt entfernt zu werden." },
        { q: "Welche Schreibweisen unterstützt dieser Konverter?", a: "Neben Titel- und Satzschreibweise wandelt er auch in GROSSBUCHSTABEN, Kleinbuchstaben, camelCase und andere gängige Formatierungsstile in Text und Code um, sodass Sie Text für jeden benötigten Kontext neu formatieren können." },
      ],
    },
    pt: {
      title: "Conversor de Maiúsculas e Minúsculas",
      intro: "Cole seu texto e escolha um formato para convertê-lo para MAIÚSCULAS, minúsculas, Formato de Título ou Formato de frase.",
      description: "Converta texto entre maiúsculas, minúsculas, formato de título e formato de frase.",
      faq: [
        { q: "Qual é a diferença entre formato de título e formato de frase?", a: "O formato de título coloca em maiúscula a primeira letra de cada palavra principal ('Olá Mundo Exemplo'), enquanto o formato de frase coloca em maiúscula apenas a primeira letra de todo o texto ('Olá mundo exemplo')." },
        { q: "Este conversor salva meu texto?", a: "Não - a conversão é feita inteiramente no seu navegador e nada é enviado ou armazenado." },
        { q: "Isso lida corretamente com letras acentuadas e caracteres não ingleses?", a: "Sim - a conversão de maiúsculas/minúsculas funciona com texto Unicode padrão, incluindo letras acentuadas (é, ñ, ü etc.), de modo que converter para maiúsculas ou minúsculas preserva os acentos corretamente em vez de removê-los." },
        { q: "Quais estilos de capitalização este conversor suporta?", a: "Além do tipo título e tipo frase, ele converte para MAIÚSCULAS, minúsculas, camelCase e outros estilos de formatação comuns usados em textos e código, para que você reformate o texto conforme o contexto que precisar." },
      ],
    },
    it: {
      title: "Convertitore di Maiuscole/Minuscole",
      intro: "Incolla il tuo testo e scegli un formato per convertirlo in MAIUSCOLO, minuscolo, Formato Titolo o Formato frase.",
      description: "Converti il testo tra maiuscolo, minuscolo, formato titolo e formato frase.",
      faq: [
        { q: "Qual è la differenza tra formato titolo e formato frase?", a: "Il formato titolo mette in maiuscolo la prima lettera di ogni parola principale ('Ciao Mondo Esempio'), mentre il formato frase mette in maiuscolo solo la prima lettera dell'intero testo ('Ciao mondo esempio')." },
        { q: "Questo convertitore salva il mio testo?", a: "No - la conversione avviene interamente nel tuo browser e nulla viene inviato o memorizzato." },
        { q: "Gestisce correttamente lettere accentate e caratteri non inglesi?", a: "Sì - la conversione maiuscolo/minuscolo funziona su testo Unicode standard, incluse le lettere accentate (é, ñ, ü, ecc.), quindi convertire in maiuscolo o minuscolo preserva correttamente gli accenti invece di rimuoverli." },
        { q: "Quali stili di maiuscole/minuscole supporta questo convertitore?", a: "Oltre al maiuscolo del titolo e al maiuscolo della frase, converte in MAIUSCOLO, minuscolo, camelCase e altri stili di formattazione comuni usati nella scrittura e nel codice, così puoi riformattare il testo per qualsiasi contesto ti serva." },
      ],
    },
    ja: {
      title: "大文字・小文字変換ツール",
      intro: "テキストを貼り付けて形式を選ぶと、大文字、小文字、タイトルケース、文頭大文字に変換できます。",
      description: "テキストを大文字、小文字、タイトルケース、文頭大文字の間で変換します。",
      faq: [
        { q: "タイトルケースと文頭大文字の違いは何ですか？", a: "タイトルケースは主要な単語ごとに先頭を大文字にします（例：「Hello World Example」）。文頭大文字はテキスト全体の最初の文字だけを大文字にします（例：「Hello world example」）。" },
        { q: "このツールは入力したテキストを保存しますか？", a: "いいえ。変換はすべてブラウザ内で行われ、データが送信・保存されることはありません。" },
        { q: "アクセント付き文字や英語以外の文字も正しく処理されますか？", a: "はい。大文字・小文字の変換は標準的なUnicodeテキストに対応しており、アクセント付き文字（é、ñ、üなど）も含まれます。大文字または小文字に変換しても、アクセントが失われることなく正しく保持されます。" },
        { q: "この変換ツールはどのような大文字・小文字のスタイルに対応していますか？", a: "タイトルケースやセンテンスケースに加えて、大文字、小文字、キャメルケースなど、文章やコードでよく使われる書式スタイルにも変換できるため、必要な用途に合わせてテキストを整形できます。" },
      ],
    },
    ro: {
      title: "Convertor Majuscule/Minuscule",
      intro: "Lipește textul și alege un format pentru a converti între majuscule, minuscule, format titlu și format propoziție.",
      description: "Convertește textul între majuscule, minuscule, format titlu și format propoziție.",
      faq: [
        { q: "Care este diferența dintre formatul titlu și formatul propoziție?", a: "Formatul titlu scrie cu majusculă primul caracter al fiecărui cuvânt principal (ex: 'Salut Lume Exemplu'). Formatul propoziție scrie cu majusculă doar primul caracter al întregului text (ex: 'Salut lume exemplu')." },
        { q: "Această unealtă salvează textul pe care îl introduc?", a: "Nu - conversia are loc în întregime în browserul tău, iar datele nu sunt niciodată trimise sau stocate." },
        { q: "Gestionează corect caracterele cu diacritice sau non-engleze?", a: "Da - conversia majuscule/minuscule funcționează cu text Unicode standard, inclusiv caractere cu diacritice (é, ñ, ü și altele). Conversia în majuscule sau minuscule păstrează diacriticele corect, fără să le piardă." },
        { q: "Ce alte stiluri de majuscule/minuscule gestionează acest convertor?", a: "Pe lângă formatul titlu și formatul propoziție, convertește și în majuscule, minuscule și camelCase - stiluri de formatare comune în scriere și programare, ca să poți formata textul exact așa cum ai nevoie." },
      ],
    },
  },

  "dog-age-calculator": {
    es: {
      title: "Calculadora de Edad de Perros",
      intro: "El envejecimiento de los perros varía según el tamaño de la raza - introduce la edad y el tamaño de tu perro para obtener una estimación en años humanos más precisa que la vieja regla de 'multiplicar por 7'.",
      description: "Convierte la edad de tu perro a años humanos según su tamaño.",
      faq: [
        { q: "¿Es precisa la regla de 'un año de perro equivale a siete años humanos'?", a: "No - esa vieja regla es un mito aproximado. Los perros envejecen más rápido en sus primeros dos años, y las razas grandes envejecen más rápido en años posteriores que las razas pequeñas." },
        { q: "¿Por qué las razas de perros grandes envejecen más rápido que las pequeñas?", a: "Las razas grandes y gigantes crecen más rápido y alcanzan la madurez física antes, lo cual está vinculado a vidas más cortas y un envejecimiento más rápido en sus años medios y avanzados - lo opuesto al patrón de la mayoría de los otros mamíferos." },
        { q: "¿A qué edad se considera 'senior' a un perro?", a: "Varía según el tamaño: las razas pequeñas suelen considerarse senior alrededor de los 10-12 años, las medianas alrededor de los 8-10, y las razas grandes o gigantes desde los 6-7 años, ya que los perros más grandes maduran y envejecen más rápido que los pequeños." },
        { q: "¿Por qué el cálculo no se basa solo en el tamaño? ¿La raza también importa?", a: "El tamaño sigue siendo el mejor predictor del ritmo de envejecimiento, por lo que esta calculadora agrupa las razas por tamaño (pequeño, mediano, grande, gigante) en lugar de usar una fórmula universal única. Las razas individuales dentro de la misma categoría de tamaño pueden envejecer a ritmos ligeramente distintos debido a la genética, pero el tamaño explica la mayor parte de la variación." },
      ],
    },
    fr: {
      title: "Calculatrice d'Âge du Chien",
      intro: "Le vieillissement des chiens varie selon la taille de la race - saisissez l'âge et la taille de votre chien pour obtenir une estimation en années humaines plus précise que l'ancienne règle du « multiplier par 7 ».",
      description: "Convertissez l'âge de votre chien en années humaines selon sa taille.",
      faq: [
        { q: "La règle « une année de chien équivaut à sept années humaines » est-elle exacte ?", a: "Non - cette vieille règle est un mythe approximatif. Les chiens vieillissent plus vite durant leurs deux premières années, et les grandes races vieillissent plus vite dans les années suivantes que les petites races." },
        { q: "Pourquoi les grandes races de chiens vieillissent-elles plus vite que les petites ?", a: "Les grandes et très grandes races grandissent plus vite et atteignent leur maturité physique plus tôt, ce qui est lié à des durées de vie plus courtes et un vieillissement plus rapide durant leurs années intermédiaires et seniors - l'inverse du schéma observé chez la plupart des autres mammifères." },
        { q: "À quel âge un chien est-il considéré comme « senior » ?", a: "Cela varie selon la taille - les petites races sont généralement considérées comme seniors vers 10-12 ans, les races moyennes vers 8-10 ans, et les grandes ou très grandes races dès 6-7 ans, car les chiens plus grands mûrissent et vieillissent plus vite que les petits." },
        { q: "Pourquoi le calcul n'est-il pas basé uniquement sur la taille - la race compte-t-elle aussi ?", a: "La taille reste le meilleur indicateur du rythme de vieillissement, c'est pourquoi cette calculatrice regroupe les races par taille (petite, moyenne, grande, géante) plutôt que d'utiliser une seule formule universelle. Certaines races au sein d'une même catégorie de taille peuvent vieillir légèrement différemment en raison de la génétique, mais la taille explique l'essentiel de la variation." },
      ],
    },
    de: {
      title: "Hundealter-Rechner",
      intro: "Das Altern von Hunden variiert je nach Rassegröße - geben Sie Alter und Größe Ihres Hundes ein, um eine genauere Schätzung in Menschenjahren zu erhalten als mit der alten „Mal 7“-Regel.",
      description: "Rechnen Sie das Alter Ihres Hundes größenabhängig in Menschenjahre um.",
      faq: [
        { q: "Stimmt die Regel „ein Hundejahr entspricht sieben Menschenjahren“?", a: "Nein - diese alte Regel ist ein grober Mythos. Hunde altern in den ersten zwei Jahren schneller, und große Rassen altern in späteren Jahren schneller als kleine Rassen." },
        { q: "Warum altern große Hunderassen schneller als kleine?", a: "Große und Riesenrassen wachsen schneller und erreichen die körperliche Reife früher, was mit kürzeren Lebenserwartungen und schnellerem Altern in den mittleren und höheren Jahren verbunden ist - das Gegenteil des Musters bei den meisten anderen Säugetieren." },
        { q: "Ab welchem Alter gilt ein Hund als „Senior“?", a: "Das hängt von der Größe ab - kleine Rassen gelten in der Regel ab etwa 10-12 Jahren als Senior, mittelgroße Rassen ab etwa 8-10 Jahren und große oder Riesenrassen schon ab 6-7 Jahren, da größere Hunde sowohl schneller reifen als auch schneller altern als kleinere." },
        { q: "Warum basiert die Berechnung nicht nur auf der Größe - spielt auch die Rasse eine Rolle?", a: "Die Größe bleibt der stärkste Indikator für die Alterungsrate, weshalb dieser Rechner Rassen nach Größe gruppiert (klein, mittel, groß, riesig) statt eine einzige universelle Formel zu verwenden. Einzelne Rassen innerhalb derselben Größenklasse können aufgrund der Genetik etwas unterschiedlich altern, aber die Größe erklärt den Großteil der Abweichung." },
      ],
    },
    pt: {
      title: "Calculadora de Idade de Cães",
      intro: "O envelhecimento dos cães varia conforme o porte da raça - insira a idade e o porte do seu cão para obter uma estimativa em anos humanos mais precisa do que a antiga regra de 'multiplicar por 7'.",
      description: "Converta a idade do seu cão em anos humanos de acordo com o porte.",
      faq: [
        { q: "A regra de que 'um ano de cão equivale a sete anos humanos' é precisa?", a: "Não - essa velha regra é um mito aproximado. Cães envelhecem mais rápido nos primeiros dois anos, e raças grandes envelhecem mais rápido em anos posteriores do que raças pequenas." },
        { q: "Por que raças de cães maiores envelhecem mais rápido que as pequenas?", a: "Raças grandes e gigantes crescem mais rápido e atingem a maturidade física mais cedo, o que está ligado a expectativas de vida mais curtas e a um envelhecimento mais rápido em seus anos intermediários e avançados - o oposto do padrão da maioria dos outros mamíferos." },
        { q: "Com que idade um cão é considerado 'idoso'?", a: "Varia conforme o porte - raças pequenas costumam ser consideradas idosas por volta dos 10-12 anos, raças médias por volta dos 8-10, e raças grandes ou gigantes já a partir dos 6-7 anos, já que cães maiores amadurecem e envelhecem mais rápido do que os menores." },
        { q: "Por que o cálculo não se baseia apenas no tamanho - a raça também importa?", a: "O tamanho continua sendo o melhor indicador da taxa de envelhecimento, por isso esta calculadora agrupa as raças por tamanho (pequeno, médio, grande, gigante) em vez de usar uma única fórmula universal. Raças individuais dentro da mesma categoria de tamanho ainda podem envelhecer em ritmos ligeiramente diferentes por causa da genética, mas o tamanho explica a maior parte da variação." },
      ],
    },
    it: {
      title: "Calcolatrice dell'Età del Cane",
      intro: "L'invecchiamento dei cani varia in base alla taglia della razza - inserisci l'età e la taglia del tuo cane per ottenere una stima in anni umani più accurata della vecchia regola del 'moltiplica per 7'.",
      description: "Converti l'età del tuo cane in anni umani in base alla taglia.",
      faq: [
        { q: "La regola 'un anno di cane equivale a sette anni umani' è accurata?", a: "No - quella vecchia regola è un mito approssimativo. I cani invecchiano più velocemente nei primi due anni, e le razze più grandi invecchiano più velocemente negli anni successivi rispetto alle razze piccole." },
        { q: "Perché le razze di cani più grandi invecchiano più velocemente di quelle piccole?", a: "Le razze grandi e giganti crescono più velocemente e raggiungono la maturità fisica prima, il che è collegato a una durata di vita più breve e a un invecchiamento più rapido negli anni intermedi e senior - l'opposto dello schema della maggior parte degli altri mammiferi." },
        { q: "A quale età un cane è considerato 'anziano'?", a: "Varia in base alla taglia - le razze piccole sono generalmente considerate anziane intorno ai 10-12 anni, le razze medie intorno agli 8-10, e le razze grandi o giganti già a 6-7 anni, poiché i cani più grandi maturano e invecchiano più velocemente di quelli piccoli." },
        { q: "Perché il calcolo non si basa solo sulla taglia - conta anche la razza?", a: "La taglia resta il predittore più forte del ritmo di invecchiamento, motivo per cui questa calcolatrice raggruppa le razze per taglia (piccola, media, grande, gigante) invece di usare un'unica formula universale. Le singole razze all'interno della stessa categoria di taglia possono comunque invecchiare a ritmi leggermente diversi per motivi genetici, ma la taglia spiega gran parte della variazione." },
      ],
    },
    ja: {
      title: "犬の年齢計算機",
      intro: "犬の老化は犬種のサイズによって異なります。犬の年齢とサイズを入力すると、昔ながらの「7倍」ルールよりも正確な人間年齢の目安がわかります。",
      description: "サイズに応じて犬の年齢を人間の年齢に換算します。",
      faq: [
        { q: "「犬の1年は人間の7年」というルールは正確ですか？", a: "いいえ、それはおおまかな俗説です。犬は最初の2年で急速に年をとり、大型犬は小型犬に比べて後年になるほど老化が早まります。" },
        { q: "なぜ大型犬は小型犬より早く老化するのですか？", a: "大型犬・超大型犬は成長が早く、身体的な成熟も早く迎えます。これは寿命の短さと、中年期・シニア期における老化の速さに関連しており、他の多くの哺乳類とは逆の傾向です。" },
        { q: "犬は何歳から「シニア」と見なされますか？", a: "サイズによって異なります。小型犬は通常10〜12歳ごろ、中型犬は8〜10歳ごろ、大型犬・超大型犬は早ければ6〜7歳でシニアと見なされます。大型犬は小型犬よりも成長が早く、老化も早いためです。" },
        { q: "なぜ計算は体の大きさだけを基準にしていないのですか？犬種も関係しますか？", a: "体の大きさは老化速度の最も強い予測因子であるため、この計算機は単一の万能な計算式ではなく、犬種を大きさ（小型・中型・大型・超大型）でグループ分けしています。同じ大きさのグループ内でも遺伝的な要因により犬種ごとに老化速度は多少異なりますが、その差の大部分は体の大きさで説明できます。" },
      ],
    },
    ro: {
      title: "Calculator de Vârstă pentru Câini",
      intro: "Câinii îmbătrânesc diferit în funcție de mărimea rasei. Introdu vârsta și mărimea câinelui pentru o estimare mai precisă a vârstei umane decât vechea regulă 'ori 7'.",
      description: "Convertește vârsta unui câine în vârstă umană echivalentă, ajustată după mărime.",
      faq: [
        { q: "Este exactă regula 'un an de câine egal cu 7 ani umani'?", a: "Nu, este un mit aproximativ. Câinii îmbătrânesc rapid în primii doi ani, iar rasele mari îmbătrânesc mai repede la vârste înaintate în comparație cu rasele mici." },
        { q: "De ce câinii mari îmbătrânesc mai repede decât cei mici?", a: "Rasele mari și uriașe cresc mai repede și ajung la maturitate fizică mai devreme, ceea ce este asociat cu o durată de viață mai scurtă și un ritm de îmbătrânire mai rapid la vârstă mijlocie și înaintată - opusul tendinței văzute la majoritatea celorlalte mamifere." },
        { q: "La ce vârstă este considerat un câine 'senior'?", a: "Depinde de mărime - câinii mici sunt de obicei considerați seniori pe la 10-12 ani, cei de talie medie pe la 8-10 ani, iar rasele mari și uriașe pot fi considerate seniore încă de la 6-7 ani, deoarece rasele mari cresc și îmbătrânesc mai repede decât cele mici." },
        { q: "De ce calculul nu se bazează doar pe mărimea corpului? Contează și rasa?", a: "Mărimea corpului este cel mai puternic factor de predicție al ritmului de îmbătrânire, așa că acest calculator grupează rasele după mărime (mică, medie, mare, uriașă) în loc de o singură formulă universală. În cadrul aceluiași grup de mărime, ritmul de îmbătrânire variază ușor între rase din cauza factorilor genetici, dar mărimea corpului explică cea mai mare parte a diferenței." },
      ],
    },
  },

  "cat-age-calculator": {
    es: {
      title: "Calculadora de Edad de Gatos",
      intro: "Introduce la edad de tu gato para estimar la edad humana equivalente, según los patrones típicos de envejecimiento felino.",
      description: "Convierte la edad de tu gato a años humanos.",
      faq: [
        { q: "¿Envejecen todos los gatos de la misma manera sin importar la raza?", a: "Los patrones de envejecimiento son bastante consistentes en la mayoría de las razas de gatos, a diferencia de los perros, donde el tamaño impulsa grandes diferencias de envejecimiento." },
        { q: "¿El estilo de vida interior o exterior afecta el cálculo de la edad de un gato?", a: "Esta calculadora no tiene eso en cuenta - es una estimación general basada en el desarrollo típico. En la práctica, los gatos de interior suelen vivir más que los de exterior debido a una menor exposición a lesiones y enfermedades, pero eso afecta la esperanza de vida, no las matemáticas de equivalencia de edad en sí." },
        { q: "¿A qué edad se considera 'senior' a un gato?", a: "La mayoría de las guías veterinarias consideran senior a los gatos a partir de los 10-11 años, y se suele usar el término 'geriátrico' para gatos de 15 años o más - aunque la salud individual varía más de lo que un único límite de edad puede reflejar." },
        { q: "¿Qué tan precisa es la fórmula de edad felina para gatos muy mayores?", a: "La fórmula es más fiable durante los primeros años del gato y se estabiliza en gatos mayores, sumando aproximadamente 4 años humanos por cada año felino adicional después de los 2 años, aunque la salud individual y la genética influyen más en el envejecimiento real en edades avanzadas de lo que la fórmula por sí sola puede reflejar." },
      ],
    },
    fr: {
      title: "Calculatrice d'Âge du Chat",
      intro: "Saisissez l'âge de votre chat pour estimer l'âge humain équivalent, selon les schémas de vieillissement félin typiques.",
      description: "Convertissez l'âge de votre chat en années humaines.",
      faq: [
        { q: "Les chats vieillissent-ils tous de la même façon, quelle que soit leur race ?", a: "Les schémas de vieillissement sont assez homogènes chez la plupart des races de chats, contrairement aux chiens, où la taille entraîne de grandes différences de vieillissement." },
        { q: "Le mode de vie intérieur ou extérieur affecte-t-il le calcul de l'âge d'un chat ?", a: "Cette calculatrice n'en tient pas compte - c'est une estimation générale basée sur un développement typique. En pratique, les chats d'intérieur ont tendance à vivre plus longtemps que les chats d'extérieur en raison d'une moindre exposition aux blessures et aux maladies, mais cela affecte l'espérance de vie, pas le calcul d'équivalence d'âge lui-même." },
        { q: "À quel âge un chat est-il considéré comme « senior » ?", a: "La plupart des recommandations vétérinaires considèrent les chats comme seniors à partir d'environ 10-11 ans, le terme « gériatrique » étant généralement utilisé pour les chats de 15 ans et plus - même si la santé individuelle varie davantage qu'un simple seuil d'âge ne peut le refléter." },
        { q: "Quelle est la précision de la formule d'âge du chat pour les chats très âgés ?", a: "La formule est la plus fiable durant les premières années du chat et se stabilise pour les chats âgés, ajoutant environ 4 années humaines par année féline supplémentaire après 2 ans, bien que la santé individuelle et la génétique influencent davantage le vieillissement réel aux âges avancés que ce que la formule seule peut refléter." },
      ],
    },
    de: {
      title: "Katzenalter-Rechner",
      intro: "Geben Sie das Alter Ihrer Katze ein, um das entsprechende Menschenalter anhand typischer Alterungsmuster von Katzen zu schätzen.",
      description: "Rechnen Sie das Alter Ihrer Katze in Menschenjahre um.",
      faq: [
        { q: "Altern alle Katzen unabhängig von der Rasse gleich?", a: "Die Alterungsmuster sind bei den meisten Katzenrassen recht einheitlich, anders als bei Hunden, wo die Größe große Alterungsunterschiede verursacht." },
        { q: "Beeinflusst Wohnen drinnen oder draußen die Altersberechnung einer Katze?", a: "Dieser Rechner berücksichtigt das nicht - es handelt sich um eine allgemeine Schätzung basierend auf typischer Entwicklung. In der Praxis leben Wohnungskatzen aufgrund geringerer Verletzungs- und Krankheitsgefahr tendenziell länger als Freigänger, aber das beeinflusst die Lebenserwartung, nicht die Alters-Äquivalenzrechnung selbst." },
        { q: "Ab welchem Alter gilt eine Katze als „Senior“?", a: "Die meisten tiermedizinischen Richtlinien betrachten Katzen ab etwa 10-11 Jahren als Senior, wobei „geriatrisch“ üblicherweise für Katzen ab 15 Jahren verwendet wird - die individuelle Gesundheit variiert jedoch stärker, als eine einzelne Altersgrenze erfassen kann." },
        { q: "Wie genau ist die Katzenalter-Formel für sehr alte Katzen?", a: "Die Formel ist in den ersten Lebensjahren einer Katze am zuverlässigsten und flacht bei älteren Katzen ab, wobei nach dem 2. Lebensjahr pro zusätzlichem Katzenjahr etwa 4 Menschenjahre hinzukommen. Individuelle Gesundheit und Genetik beeinflussen das tatsächliche Altern im hohen Alter jedoch stärker, als die Formel allein erfassen kann." },
      ],
    },
    pt: {
      title: "Calculadora de Idade de Gatos",
      intro: "Insira a idade do seu gato para estimar a idade humana equivalente, com base em padrões típicos de envelhecimento felino.",
      description: "Converta a idade do seu gato em anos humanos.",
      faq: [
        { q: "Todos os gatos envelhecem da mesma forma, independentemente da raça?", a: "Os padrões de envelhecimento são bastante consistentes na maioria das raças de gatos, ao contrário dos cães, onde o porte gera grandes diferenças no envelhecimento." },
        { q: "O estilo de vida interno ou externo afeta o cálculo da idade de um gato?", a: "Esta calculadora não leva isso em conta - é uma estimativa geral baseada no desenvolvimento típico. Na prática, gatos domésticos tendem a viver mais do que gatos que ficam ao ar livre devido à menor exposição a lesões e doenças, mas isso afeta a expectativa de vida, não o cálculo de equivalência de idade em si." },
        { q: "Com que idade um gato é considerado 'idoso'?", a: "A maioria das diretrizes veterinárias considera os gatos idosos a partir de cerca de 10-11 anos, com o termo 'geriátrico' geralmente usado para gatos com 15 anos ou mais - embora a saúde individual varie mais do que um único limite de idade consegue captar." },
        { q: "Quão precisa é a fórmula de idade felina para gatos muito idosos?", a: "A fórmula é mais confiável nos primeiros anos do gato e se estabiliza em gatos idosos, somando aproximadamente 4 anos humanos por cada ano felino adicional após os 2 anos, embora a saúde individual e a genética influenciem mais o envelhecimento real em idades avançadas do que a fórmula sozinha consegue captar." },
      ],
    },
    it: {
      title: "Calcolatrice dell'Età del Gatto",
      intro: "Inserisci l'età del tuo gatto per stimare l'età umana equivalente, in base ai tipici modelli di invecchiamento felino.",
      description: "Converti l'età del tuo gatto in anni umani.",
      faq: [
        { q: "Tutti i gatti invecchiano allo stesso modo indipendentemente dalla razza?", a: "I modelli di invecchiamento sono abbastanza costanti nella maggior parte delle razze di gatti, a differenza dei cani, dove la taglia genera grandi differenze di invecchiamento." },
        { q: "Lo stile di vita in casa o all'aperto influisce sul calcolo dell'età di un gatto?", a: "Questa calcolatrice non ne tiene conto - è una stima generale basata sullo sviluppo tipico. In pratica, i gatti d'appartamento tendono a vivere più a lungo di quelli che vivono all'aperto per la minore esposizione a lesioni e malattie, ma questo influisce sull'aspettativa di vita, non sul calcolo dell'equivalenza dell'età in sé." },
        { q: "A quale età un gatto è considerato 'anziano'?", a: "La maggior parte delle linee guida veterinarie considera i gatti anziani a partire da circa 10-11 anni, con il termine 'geriatrico' generalmente usato per gatti di 15 anni o più - anche se la salute individuale varia più di quanto un singolo limite di età possa cogliere." },
        { q: "Quanto è precisa la formula dell'età del gatto per i gatti molto anziani?", a: "La formula è più affidabile nei primi anni di vita del gatto e si stabilizza per i gatti anziani, aggiungendo circa 4 anni umani per ogni anno felino aggiuntivo dopo i 2 anni, sebbene la salute individuale e la genetica influenzino l'invecchiamento reale in età avanzata più di quanto la sola formula possa cogliere." },
      ],
    },
    ja: {
      title: "猫の年齢計算機",
      intro: "猫の年齢を入力すると、一般的な猫の老化パターンに基づいて人間年齢の目安を計算します。",
      description: "猫の年齢を人間の年齢に換算します。",
      faq: [
        { q: "猫は犬種のような違いに関係なく同じように年をとりますか？", a: "猫の老化パターンはほとんどの猫種でかなり一定しています。犬のようにサイズによって老化の違いが大きく出ることはありません。" },
        { q: "室内飼いか屋外飼いかで年齢の計算は変わりますか？", a: "この計算機ではその点は考慮していません。あくまで一般的な発育に基づいた目安です。実際には、室内飼いの猫はケガや病気にさらされる機会が少ないため屋外飼いの猫より長生きする傾向がありますが、それは寿命に影響するものであり、年齢換算の計算自体には影響しません。" },
        { q: "猫は何歳から「シニア」と見なされますか？", a: "多くの獣医学的な指針では、猫はおおよそ10〜11歳からシニアと見なされ、15歳以上は「老齢期」とされることが一般的です。ただし、個体差は単一の年齢基準で捉えられる以上に大きいことに注意してください。" },
        { q: "非常に高齢な猫の場合、猫の年齢換算式はどの程度正確ですか？", a: "この計算式は猫の若い時期において最も信頼性が高く、高齢になると変化が緩やかになり、2歳以降は猫の1年ごとに人間の約4歳分が加算される計算になります。ただし高齢期の実際の老化には個体の健康状態や遺伝の影響が式だけでは捉えきれないほど大きく関わります。" },
      ],
    },
    ro: {
      title: "Calculator de Vârstă pentru Pisici",
      intro: "Introdu vârsta pisicii pentru a calcula vârsta umană echivalentă, pe baza tiparelor tipice de îmbătrânire la pisici.",
      description: "Convertește vârsta unei pisici în vârstă umană echivalentă.",
      faq: [
        { q: "Îmbătrânesc toate pisicile la fel, indiferent de rasă?", a: "Tiparul de îmbătrânire al pisicilor este destul de consistent la majoritatea raselor - nu există o variație atât de mare bazată pe mărime ca la câini." },
        { q: "Contează dacă pisica trăiește în casă sau afară pentru calculul vârstei?", a: "Acest calculator nu ia în calcul acest aspect - este o estimare bazată pe tiparele generale de dezvoltare. În realitate, pisicile de interior tind să trăiască mai mult decât cele de exterior, deoarece sunt expuse la mai puține accidentări și boli, dar asta influențează durata de viață, nu formula de conversie a vârstei." },
        { q: "La ce vârstă este considerată o pisică 'senioară'?", a: "Multe ghiduri veterinare consideră pisicile senioare pe la 10-11 ani, cu 'geriatric' folosit adesea pentru 15 ani și peste - deși variația individuală este mai mare decât poate surprinde un singur prag de vârstă." },
        { q: "Cât de precisă este formula de conversie a vârstei pisicilor pentru animale foarte bătrâne?", a: "Formula este cea mai fiabilă în anii tineri ai pisicii, iar în anii mai avansați se aplatizează, adăugând aproximativ 4 ani umani pentru fiecare an de pisică după vârsta de 2 ani. Sănătatea individuală și genetica joacă un rol tot mai mare în îmbătrânirea reală la vârste înaintate, mai mult decât poate surprinde orice formulă." },
      ],
    },
  },
};

// Static-page copy for wave one. Privacy and Terms are flagged explicitly
// in the completion report as needing native-speaker/legal review before
// being treated as authoritative in each jurisdiction — these are careful,
// literal translations of the existing English legal text, not paraphrases,
// but machine-assisted legal translation still needs a human sign-off pass
// before it should be relied on the way the English original can be.
const I18N_STATIC = {
  about: {
    en: {
      title: "About Calquary - Free Calculators & Conversion Tools",
      lede: "A reference index of fast, accurate calculators - organized the way a good library organizes books, not the way most calculator sites throw everything on one page.",
      body: "Calquary is a collection of single-purpose calculators - for math, money, home projects, health, dates, conversions, everyday text tasks, and pets - built to answer one question well rather than bury it in ads and unrelated content. Every tool runs entirely in your browser: enter your numbers, get your answer, nothing is sent to a server. Calculators are grouped into 8 categories, and the catalog keeps growing - every tool is reviewed for a working formula and a plain-language explanation before it's added, so the answer you get is one you can trust. For decisions with real financial, structural, or medical stakes, confirm with a qualified professional. Most tools started as a specific, narrow question someone actually needed answered - how much concrete for a slab, what a dog's age means in human years, how many business days fall between two dates - rather than a generic calculator built to look comprehensive. That's also why the categories stay broad (Math, Finance, Construction & Home, Health & Fitness, Date & Time, Everyday Conversions, Text & Digital, and Pet & Lifestyle) instead of narrow: the goal is a library you can browse by the kind of problem you have, not a maze of subcategories to click through before reaching an answer.",
    },
    es: {
      title: "Acerca de Calquary - Calculadoras y Conversores Gratis",
      lede: "Un índice de referencia de calculadoras rápidas y precisas - organizado como una buena biblioteca organiza los libros, no como la mayoría de los sitios de calculadoras que amontonan todo en una sola página.",
      body: "Calquary es una colección de calculadoras de propósito único - para matemáticas, dinero, proyectos del hogar, salud, fechas, conversiones, tareas cotidianas de texto y mascotas - creadas para responder bien una pregunta en lugar de enterrarla entre anuncios y contenido no relacionado. Cada herramienta funciona enteramente en tu navegador: introduces tus números, obtienes tu respuesta, nada se envía a un servidor. Las calculadoras se agrupan en 8 categorías, y el catálogo sigue creciendo - cada herramienta se revisa para tener una fórmula funcional y una explicación en lenguaje claro antes de añadirse, para que la respuesta que obtengas sea confiable. Para decisiones con implicaciones financieras, estructurales o médicas reales, consulta con un profesional cualificado. La mayoría de las herramientas nacieron de una pregunta concreta y específica que alguien necesitaba responder - cuánto concreto para una losa, qué significa la edad de un perro en años humanos, cuántos días hábiles hay entre dos fechas - en lugar de una calculadora genérica creada solo para parecer completa. Por eso las categorías se mantienen amplias (Matemáticas, Finanzas, Construcción y Hogar, Salud y Fitness, Fecha y Hora, Conversiones Cotidianas, Texto y Digital, y Mascotas y Estilo de Vida) en lugar de estrechas: el objetivo es una biblioteca que puedas explorar según el tipo de problema que tengas, no un laberinto de subcategorías que recorrer antes de llegar a una respuesta.",
    },
    fr: {
      title: "À propos de Calquary - Calculatrices et Convertisseurs Gratuits",
      lede: "Un index de référence de calculatrices rapides et précises - organisé comme une bonne bibliothèque organise les livres, et non comme la plupart des sites de calculatrices qui entassent tout sur une seule page.",
      body: "Calquary est une collection de calculatrices à usage unique - pour les mathématiques, l'argent, les travaux, la santé, les dates, les conversions, les tâches de texte courantes et les animaux - conçues pour répondre correctement à une seule question plutôt que de la noyer sous des publicités et des contenus sans rapport. Chaque outil fonctionne entièrement dans votre navigateur : vous saisissez vos chiffres, vous obtenez votre réponse, rien n'est envoyé à un serveur. Les calculatrices sont regroupées en 8 catégories, et le catalogue continue de s'agrandir - chaque outil est vérifié pour disposer d'une formule fonctionnelle et d'une explication en langage clair avant d'être ajouté, afin que la réponse obtenue soit fiable. Pour toute décision ayant de réelles conséquences financières, structurelles ou médicales, consultez un professionnel qualifié. La plupart des outils sont nés d'une question précise et concrète que quelqu'un avait besoin de résoudre - combien de béton pour une dalle, ce que signifie l'âge d'un chien en années humaines, combien de jours ouvrés séparent deux dates - plutôt que d'une calculatrice générique conçue seulement pour paraître complète. C'est aussi pourquoi les catégories restent larges (Mathématiques, Finance, Construction et Maison, Santé et Fitness, Date et Heure, Conversions Courantes, Texte et Numérique, et Animaux et Style de Vie) plutôt qu'étroites : l'objectif est une bibliothèque que vous pouvez parcourir selon le type de problème que vous avez, pas un labyrinthe de sous-catégories à traverser avant d'obtenir une réponse.",
    },
    de: {
      title: "Über Calquary - Kostenlose Rechner und Umrechner",
      lede: "Ein Referenzindex schneller, präziser Rechner - organisiert wie eine gute Bibliothek ihre Bücher ordnet, nicht wie die meisten Rechner-Websites, die alles auf eine Seite werfen.",
      body: "Calquary ist eine Sammlung von Einzelzweck-Rechnern - für Mathematik, Geld, Hausprojekte, Gesundheit, Termine, Umrechnungen, alltägliche Textaufgaben und Haustiere - entwickelt, um eine Frage gut zu beantworten, statt sie zwischen Anzeigen und themenfremden Inhalten zu vergraben. Jedes Tool läuft vollständig in Ihrem Browser: Zahlen eingeben, Antwort erhalten, nichts wird an einen Server gesendet. Die Rechner sind in 8 Kategorien gruppiert, und der Katalog wächst stetig weiter - jedes Tool wird auf eine funktionierende Formel und eine verständliche Erklärung geprüft, bevor es hinzugefügt wird, damit Sie sich auf die Antwort verlassen können. Bei Entscheidungen mit echten finanziellen, baulichen oder medizinischen Konsequenzen wenden Sie sich bitte an eine qualifizierte Fachperson. Die meisten Tools entstanden aus einer konkreten, engen Frage, die jemand tatsächlich beantwortet haben wollte - wie viel Beton für eine Platte nötig ist, was das Alter eines Hundes in Menschenjahren bedeutet, wie viele Werktage zwischen zwei Terminen liegen - statt aus einem generischen Rechner, der nur umfassend wirken soll. Deshalb bleiben die Kategorien bewusst breit (Mathematik, Finanzen, Bau & Haus, Gesundheit & Fitness, Datum & Zeit, Alltägliche Umrechnungen, Text & Digital sowie Haustiere & Lifestyle) statt eng: Ziel ist eine Bibliothek, die Sie nach der Art Ihres Problems durchsuchen können, kein Labyrinth aus Unterkategorien, das Sie erst durchklicken müssen, bevor Sie eine Antwort finden.",
    },
    pt: {
      title: "Sobre a Calquary - Calculadoras e Conversores Gratuitos",
      lede: "Um índice de referência de calculadoras rápidas e precisas - organizado como uma boa biblioteca organiza os livros, não como a maioria dos sites de calculadoras que jogam tudo em uma única página.",
      body: "A Calquary é uma coleção de calculadoras de propósito único - para matemática, dinheiro, projetos domésticos, saúde, datas, conversões, tarefas de texto do dia a dia e pets - feitas para responder bem a uma pergunta, em vez de enterrá-la em anúncios e conteúdo não relacionado. Cada ferramenta funciona inteiramente no seu navegador: você insere seus números, obtém sua resposta, nada é enviado a um servidor. As calculadoras são agrupadas em 8 categorias, e o catálogo continua crescendo - cada ferramenta é revisada quanto a uma fórmula funcional e uma explicação em linguagem simples antes de ser adicionada, para que a resposta que você obtém seja confiável. Para decisões com implicações financeiras, estruturais ou médicas reais, consulte um profissional qualificado. A maioria das ferramentas nasceu de uma pergunta concreta e específica que alguém realmente precisava responder - quanto concreto para uma laje, o que a idade de um cão significa em anos humanos, quantos dias úteis há entre duas datas - em vez de uma calculadora genérica criada só para parecer completa. É por isso também que as categorias permanecem amplas (Matemática, Finanças, Construção e Casa, Saúde e Fitness, Data e Hora, Conversões do Dia a Dia, Texto e Digital, e Pets e Estilo de Vida) em vez de estreitas: o objetivo é uma biblioteca que você possa explorar pelo tipo de problema que tem, não um labirinto de subcategorias para percorrer antes de chegar a uma resposta.",
    },
    it: {
      title: "Chi siamo - Calcolatrici e Convertitori Gratuiti Calquary",
      lede: "Un indice di riferimento di calcolatrici rapide e precise - organizzato come una buona biblioteca organizza i libri, non come la maggior parte dei siti di calcolatrici che ammassano tutto in una sola pagina.",
      body: "Calquary è una raccolta di calcolatrici a scopo unico - per matematica, denaro, progetti per la casa, salute, date, conversioni, attività di testo quotidiane e animali domestici - pensate per rispondere bene a una domanda invece di seppellirla tra annunci e contenuti non correlati. Ogni strumento funziona interamente nel tuo browser: inserisci i tuoi numeri, ottieni la tua risposta, nulla viene inviato a un server. Le calcolatrici sono raggruppate in 8 categorie, e il catalogo continua a crescere - ogni strumento viene verificato per avere una formula funzionante e una spiegazione in linguaggio semplice prima di essere aggiunto, così la risposta che ottieni è affidabile. Per decisioni con reali implicazioni finanziarie, strutturali o mediche, consulta un professionista qualificato. La maggior parte degli strumenti è nata da una domanda concreta e specifica a cui qualcuno doveva davvero rispondere - quanto cemento serve per una soletta, cosa significa l'età di un cane in anni umani, quanti giorni lavorativi ci sono tra due date - invece che da una calcolatrice generica creata solo per sembrare completa. Per questo le categorie restano ampie (Matematica, Finanza, Costruzioni e Casa, Salute e Fitness, Data e Ora, Conversioni Quotidiane, Testo e Digitale, e Animali e Stile di Vita) invece che ristrette: l'obiettivo è una biblioteca che puoi esplorare in base al tipo di problema che hai, non un labirinto di sottocategorie da attraversare prima di trovare una risposta.",
    },
    ja: {
      title: "Calquaryについて - 無料の計算ツールと変換ツール",
      lede: "速く正確な計算ツールのリファレンスインデックス - 多くの計算ツールサイトのようにすべてを1ページに詰め込むのではなく、優れた図書館が本を整理するように構成されています。",
      body: "Calquaryは、数学、お金、住まいのプロジェクト、健康、日付、単位換算、日常的なテキスト作業、ペットなど、単一の目的に特化した計算ツールのコレクションです。広告や無関係なコンテンツに埋もれさせるのではなく、一つの質問にしっかり答えることを目指して作られています。すべてのツールはブラウザ内で完結して動作します。数値を入力すると答えが得られ、サーバーには何も送信されません。計算ツールは8つのカテゴリーに分類されており、カタログは今も増え続けています。公開前にはそれぞれのツールについて、正しく動作する数式とわかりやすい説明があるかを確認しているため、得られる答えを信頼していただけます。実際の財務、構造、医療に関わる重要な決定を行う前には、必ず専門家にご確認ください。ほとんどのツールは、コンクリートのスラブに必要な量、犬の年齢を人間の年齢に換算するとどうなるか、2つの日付の間に何営業日あるかなど、誰かが実際に知りたかった具体的で狭い質問から生まれたものであり、網羅的に見せるためだけに作られた汎用的な計算ツールではありません。カテゴリーを細かく分けすぎず、あえて広めに保っている（数学、金融、建築・住まい、健康・フィットネス、日付・時間、日常の単位換算、テキスト・デジタル、ペット・ライフスタイル）のもそのためです。目指しているのは、答えにたどり着く前にいくつものサブカテゴリーをクリックし続けるような迷路ではなく、抱えている問題の種類に応じて探せる図書館のような構成です。",
    },
    ro: {
      title: "Despre Calquary - Calculatoare și Convertoare Gratuite",
      lede: "Un index de referință cu calculatoare rapide și precise - organizat așa cum o bibliotecă bună își organizează cărțile, nu cum majoritatea site-urilor de calculatoare aruncă totul pe o singură pagină.",
      body: "Calquary este o colecție de calculatoare cu scop unic - pentru matematică, bani, proiecte pentru casă, sănătate, date, conversii, sarcini de text zilnice și animale de companie - create pentru a răspunde bine la o singură întrebare, în loc să o îngroape sub reclame și conținut fără legătură. Fiecare instrument funcționează în întregime în browserul tău: introduci numerele, primești răspunsul, nimic nu este trimis către un server. Calculatoarele sunt grupate în 8 categorii, iar catalogul continuă să crească - fiecare instrument este verificat pentru o formulă funcțională și o explicație pe înțelesul tuturor înainte de a fi adăugat, ca răspunsul primit să fie de încredere. Pentru decizii cu implicații financiare, structurale sau medicale reale, consultă un profesionist calificat. Majoritatea instrumentelor au pornit de la o întrebare concretă și specifică pe care cineva chiar avea nevoie să o rezolve - cât beton pentru o placă, ce înseamnă vârsta unui câine în ani umani, câte zile lucrătoare sunt între două date - în loc de un calculator generic construit doar ca să pară complet. De aceea categoriile rămân largi (Matematică, Finanțe, Construcții și Casă, Sănătate și Fitness, Dată și Oră, Conversii Zilnice, Text și Digital, și Animale de Companie și Stil de Viață) în loc de înguste: obiectivul este o bibliotecă pe care o poți explora în funcție de tipul de problemă pe care o ai, nu un labirint de subcategorii de parcurs înainte de a ajunge la un răspuns.",
    },
  },
  contact: {
    en: {
      title: "Contact Calquary - Bugs, Ideas & Questions",
      body: "Found a bug, have a calculator idea, or have a question about how we handle data? Email us at hello@calquary.com - we read every message, though replies may take a few days. If you're reporting a bug, it helps to include the calculator name, the numbers you entered, and what result you expected versus what you saw. Calculator suggestions are especially welcome - most of the tools already on Calquary started as a reader request, and we track requested calculators against how often they come up before deciding what to build next.",
    },
    es: {
      title: "Contacto - Escríbenos a Calquary",
      body: "¿Encontraste un error, tienes una idea para una calculadora o una pregunta sobre cómo manejamos los datos? Escríbenos a hello@calquary.com - leemos todos los mensajes, aunque las respuestas pueden tardar unos días. Si reportas un error, ayuda incluir el nombre de la calculadora, los números que introdujiste y qué resultado esperabas frente al que obtuviste. Las sugerencias de calculadoras son especialmente bienvenidas - la mayoría de las herramientas de Calquary comenzaron como una petición de un lector, y llevamos seguimiento de las calculadoras solicitadas según su frecuencia antes de decidir qué construir a continuación.",
    },
    fr: {
      title: "Contactez-nous - Écrivez à Calquary",
      body: "Vous avez trouvé un bug, une idée de calculatrice, ou une question sur la gestion de vos données ? Écrivez-nous à hello@calquary.com - nous lisons chaque message, même si les réponses peuvent prendre quelques jours. Si vous signalez un bug, il est utile d'indiquer le nom de la calculatrice, les chiffres saisis et le résultat attendu par rapport à celui obtenu. Les suggestions de calculatrices sont particulièrement bienvenues - la plupart des outils déjà présents sur Calquary sont nés d'une demande de lecteur, et nous suivons la fréquence des demandes avant de décider quoi développer ensuite.",
    },
    de: {
      title: "Kontaktieren Sie uns - Schreiben Sie Calquary",
      body: "Einen Fehler gefunden, eine Idee für einen Rechner, oder eine Frage zu unserem Umgang mit Daten? Schreiben Sie uns an hello@calquary.com - wir lesen jede Nachricht, auch wenn Antworten ein paar Tage dauern können. Bei einer Fehlermeldung hilft es, den Namen des Rechners, die eingegebenen Zahlen sowie das erwartete gegenüber dem tatsächlichen Ergebnis anzugeben. Vorschläge für neue Rechner sind besonders willkommen - die meisten Tools auf Calquary begannen als Leseranfrage, und wir verfolgen, wie oft ein Rechner gewünscht wird, bevor wir entscheiden, was als Nächstes entwickelt wird.",
    },
    pt: {
      title: "Entre em Contato com a Calquary",
      body: "Encontrou um bug, tem uma ideia de calculadora ou uma dúvida sobre como tratamos os dados? Escreva para hello@calquary.com - lemos todas as mensagens, embora as respostas possam levar alguns dias. Se estiver relatando um bug, ajuda incluir o nome da calculadora, os números que você inseriu e o resultado esperado em comparação ao obtido. Sugestões de calculadoras são especialmente bem-vindas - a maioria das ferramentas já disponíveis na Calquary começou como um pedido de leitor, e acompanhamos a frequência dos pedidos antes de decidir o que desenvolver a seguir.",
    },
    it: {
      title: "Contattaci - Scrivi a Calquary",
      body: "Hai trovato un bug, hai un'idea per una calcolatrice o una domanda su come gestiamo i dati? Scrivici a hello@calquary.com - leggiamo ogni messaggio, anche se le risposte potrebbero richiedere alcuni giorni. Se stai segnalando un bug, è utile includere il nome della calcolatrice, i numeri inseriti e il risultato atteso rispetto a quello ottenuto. I suggerimenti per nuove calcolatrici sono particolarmente graditi - la maggior parte degli strumenti già presenti su Calquary è nata da una richiesta dei lettori, e teniamo traccia della frequenza delle richieste prima di decidere cosa sviluppare in seguito.",
    },
    ja: {
      title: "お問い合わせ - Calquaryへのご連絡",
      body: "不具合の報告、計算ツールのアイデア、データの取り扱いについてのご質問などがございましたら、hello@calquary.com までご連絡ください。すべてのメッセージに目を通しておりますが、返信までに数日かかる場合があります。不具合を報告される際は、対象の計算ツール名、入力した数値、そして期待していた結果と実際の結果を書き添えていただけると助かります。新しい計算ツールのご提案も特に歓迎しています。Calquaryに掲載されているツールの多くは読者からのリクエストがきっかけで生まれており、リクエストの頻度を確認しながら次に開発するツールを決めています。",
    },
    ro: {
      title: "Contactează Calquary - Erori, Idei și Întrebări",
      body: "Ai găsit o eroare, ai o idee pentru un calculator sau o întrebare despre cum gestionăm datele? Scrie-ne la hello@calquary.com - citim fiecare mesaj, deși răspunsul poate dura câteva zile. Dacă raportezi o eroare, ajută să incluzi numele calculatorului, numerele introduse și rezultatul așteptat comparat cu cel obținut. Sugestiile de calculatoare sunt binevenite - majoritatea instrumentelor deja prezente pe Calquary au pornit ca solicitări ale cititorilor, iar noi urmărim frecvența cererilor înainte de a decide ce construim în continuare.",
    },
  },

  // Legal-facing pages: translated in full (not summarized), but each
  // locale version carries a visible translationNotice banner stating the
  // English original governs any conflict and that this translation has
  // not had a separate native-speaker/legal review pass — the honest
  // middle ground between silently omitting these pages from wave one and
  // publishing a translated legal document as if it carried the same
  // authority as the reviewed English source.
  translationNotice: {
    es: 'Esta es una traducción de la Política de Privacidad y los Términos de Servicio originales en inglés, ofrecida por comodidad. En caso de discrepancia, prevalece la <a href="/privacy.html">versión en inglés</a>. Esta traducción no ha pasado por una revisión legal independiente.',
    fr: 'Ceci est une traduction de la Politique de Confidentialité et des Conditions d\'Utilisation originales en anglais, fournie par commodité. En cas de divergence, la <a href="/privacy.html">version anglaise</a> fait foi. Cette traduction n\'a pas fait l\'objet d\'une relecture juridique indépendante.',
    de: 'Dies ist eine Übersetzung der ursprünglichen englischen Datenschutzerklärung und Nutzungsbedingungen, bereitgestellt aus Gründen der Übersichtlichkeit. Bei Abweichungen ist die <a href="/privacy.html">englische Fassung</a> maßgeblich. Diese Übersetzung wurde keiner separaten rechtlichen Prüfung unterzogen.',
    pt: 'Esta é uma tradução da Política de Privacidade e dos Termos de Serviço originais em inglês, oferecida por conveniência. Em caso de divergência, prevalece a <a href="/privacy.html">versão em inglês</a>. Esta tradução não passou por uma revisão jurídica independente.',
    it: 'Questa è una traduzione dell\'Informativa sulla Privacy e dei Termini di Servizio originali in inglese, fornita per comodità. In caso di discrepanza, prevale la <a href="/privacy.html">versione inglese</a>. Questa traduzione non è stata sottoposta a una revisione legale indipendente.',
    ja: 'これは英語版のプライバシーポリシーおよび利用規約の翻訳であり、利便性のために提供されています。内容に相違がある場合は、<a href="/privacy.html">英語版</a>が優先されます。この翻訳は独立した法的レビューを受けていません。',
    ro: 'Aceasta este o traducere a Politicii de Confidențialitate și a Termenilor de Serviciu originale în limba engleză, oferită pentru comoditate. În caz de discrepanță, prevalează <a href="/privacy.html">versiunea în limba engleză</a>. Această traducere nu a trecut printr-o revizuire juridică independentă.',
  },

  privacy: {
    en: {
      title: "Privacy Policy - How Calquary Handles Your Data",
      effectiveDateLabel: "Effective date: August 18, 2026",
      sections: [
        { h2: "Overview", p: ['This Privacy Policy explains what information Calquary ("we," "us," "our") collects when you use calquary.com (the "Site"), how we use it, and the choices available to you. By using the Site, you agree to the practices described here.'] },
        { h2: "Information we collect", p: [
          "Calquary's calculators run entirely in your browser. When you enter numbers or other values into a calculator, that data is processed locally on your device using JavaScript - it is never transmitted to our servers, stored in a database, or seen by us in any form. We do not require accounts, logins, or any personal information to use any calculator on this Site.",
          "We may collect limited, non-identifying technical information automatically, such as your browser type, general device type, and pages visited, through standard web server logs and analytics tools (for example, to understand which calculators are most useful and to fix bugs). This information does not include the values you enter into a calculator.",
        ] },
        { h2: "Cookies and tracking technologies", p: ["Calquary does not currently use cookies for the calculators themselves - no login state, no saved preferences, no tracking of your calculator inputs. We do use, or plan to use, third-party services described below that may set their own cookies in your browser, including for advertising purposes."] },
        { h2: "Advertising", p: [
          'Calquary may display advertising through Google AdSense or similar third-party advertising services. These services may use cookies, device identifiers, or similar technologies to serve ads based on your prior visits to this or other websites ("interest-based" or "personalized" advertising).',
          'Google\'s use of advertising cookies enables it and its partners to serve ads based on your visits to this and other sites. You can opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>, or opt out of some third-party vendors\' use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>. For more on how Google uses data when you use our Site, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>.',
        ] },
        { h2: "Third-party services", p: ["We may use third-party services for analytics, hosting, and advertising (such as Google AdSense and Google Analytics). These providers may collect information sent by your browser as part of a web page request, such as cookies or your IP address, and are governed by their own privacy policies, not this one."] },
        { h2: "Children's privacy", p: ["Calquary is not directed at children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can address it."] },
        { h2: "Changes to this policy", p: ['We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. The "Effective date" at the top of this page will reflect the most recent revision. Continued use of the Site after changes take effect constitutes acceptance of the revised policy.'] },
        { h2: "Contact us", p: ['If you have questions about this Privacy Policy, please <a href="/contact.html">contact us</a>.'] },
      ],
    },
    es: {
      title: "Política de Privacidad - Cómo Calquary Trata tus Datos",
      effectiveDateLabel: "Fecha de vigencia: 18 de agosto de 2026",
      sections: [
        { h2: "Resumen", p: ['Esta Política de Privacidad explica qué información recopila Calquary ("nosotros", "nos", "nuestro") cuando utilizas calquary.com (el "Sitio"), cómo la usamos y las opciones disponibles para ti. Al usar el Sitio, aceptas las prácticas aquí descritas.'] },
        { h2: "Información que recopilamos", p: [
          "Las calculadoras de Calquary funcionan enteramente en tu navegador. Cuando introduces números u otros valores en una calculadora, esos datos se procesan localmente en tu dispositivo mediante JavaScript - nunca se transmiten a nuestros servidores, ni se almacenan en una base de datos, ni los vemos de ninguna forma. No requerimos cuentas, inicios de sesión ni ninguna información personal para usar ninguna calculadora de este Sitio.",
          "Podemos recopilar automáticamente información técnica limitada y no identificable, como el tipo de navegador, el tipo general de dispositivo y las páginas visitadas, mediante registros estándar del servidor web y herramientas de análisis (por ejemplo, para entender qué calculadoras son más útiles y corregir errores). Esta información no incluye los valores que introduces en una calculadora.",
        ] },
        { h2: "Cookies y tecnologías de seguimiento", p: ["Calquary actualmente no utiliza cookies para las calculadoras en sí - sin estado de sesión, sin preferencias guardadas, sin seguimiento de tus entradas en la calculadora. Utilizamos, o planeamos utilizar, los servicios de terceros descritos a continuación, que pueden establecer sus propias cookies en tu navegador, incluso con fines publicitarios."] },
        { h2: "Publicidad", p: [
          'Calquary puede mostrar publicidad a través de Google AdSense o servicios publicitarios de terceros similares. Estos servicios pueden usar cookies, identificadores de dispositivo o tecnologías similares para mostrar anuncios basados en tus visitas anteriores a este u otros sitios web (publicidad "basada en intereses" o "personalizada").',
          'El uso que hace Google de las cookies publicitarias le permite a Google y a sus socios mostrar anuncios basados en tus visitas a este y otros sitios. Puedes optar por no recibir publicidad personalizada visitando <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">la Configuración de anuncios de Google</a>, o rechazar el uso de cookies de algunos proveedores externos para publicidad personalizada visitando <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>. Para más información sobre cómo Google usa los datos cuando utilizas nuestro Sitio, consulta <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Cómo usa Google la información de los sitios o aplicaciones que utilizan sus servicios</a>.',
        ] },
        { h2: "Servicios de terceros", p: ["Podemos utilizar servicios de terceros para análisis, alojamiento y publicidad (como Google AdSense y Google Analytics). Estos proveedores pueden recopilar información enviada por tu navegador como parte de una solicitud de página web, como cookies o tu dirección IP, y se rigen por sus propias políticas de privacidad, no por esta."] },
        { h2: "Privacidad de menores", p: ["Calquary no está dirigido a menores de 13 años, y no recopilamos conscientemente información personal de menores de 13 años. Si crees que un menor nos ha proporcionado información personal, por favor contáctanos para que podamos resolverlo."] },
        { h2: "Cambios a esta política", p: ['Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas o por razones legales, operativas o regulatorias. La "Fecha de vigencia" en la parte superior de esta página reflejará la revisión más reciente. El uso continuado del Sitio después de que los cambios entren en vigor constituye la aceptación de la política revisada.'] },
        { h2: "Contáctanos", p: ['Si tienes preguntas sobre esta Política de Privacidad, por favor <a href="/contact.html">contáctanos</a>.'] },
      ],
    },
    fr: {
      title: "Politique de Confidentialité - Vos Données chez Calquary",
      effectiveDateLabel: "Date d'entrée en vigueur : 18 août 2026",
      sections: [
        { h2: "Aperçu", p: ['Cette Politique de Confidentialité explique quelles informations Calquary (« nous », « notre ») collecte lorsque vous utilisez calquary.com (le « Site »), comment nous les utilisons, et les choix qui s\'offrent à vous. En utilisant le Site, vous acceptez les pratiques décrites ici.'] },
        { h2: "Informations que nous collectons", p: [
          "Les calculatrices de Calquary fonctionnent entièrement dans votre navigateur. Lorsque vous saisissez des chiffres ou d'autres valeurs dans une calculatrice, ces données sont traitées localement sur votre appareil via JavaScript - elles ne sont jamais transmises à nos serveurs, ni stockées dans une base de données, ni consultées par nous sous quelque forme que ce soit. Aucun compte, identifiant ou information personnelle n'est requis pour utiliser une calculatrice de ce Site.",
          "Nous pouvons collecter automatiquement des informations techniques limitées et non identifiantes, telles que le type de navigateur, le type général d'appareil et les pages visitées, via des journaux de serveur web standard et des outils d'analyse (par exemple, pour comprendre quelles calculatrices sont les plus utiles et corriger des bugs). Ces informations n'incluent pas les valeurs que vous saisissez dans une calculatrice.",
        ] },
        { h2: "Cookies et technologies de suivi", p: ["Calquary n'utilise actuellement pas de cookies pour les calculatrices elles-mêmes - pas d'état de connexion, pas de préférences enregistrées, aucun suivi de vos saisies dans les calculatrices. Nous utilisons, ou prévoyons d'utiliser, les services tiers décrits ci-dessous, qui peuvent déposer leurs propres cookies dans votre navigateur, y compris à des fins publicitaires."] },
        { h2: "Publicité", p: [
          "Calquary peut afficher des publicités via Google AdSense ou des services publicitaires tiers similaires. Ces services peuvent utiliser des cookies, des identifiants d'appareil ou des technologies similaires pour diffuser des publicités basées sur vos visites précédentes sur ce site ou d'autres (publicité « basée sur les centres d'intérêt » ou « personnalisée »).",
          'L\'utilisation par Google de cookies publicitaires permet à Google et à ses partenaires de diffuser des publicités en fonction de vos visites sur ce site et d\'autres sites. Vous pouvez refuser la publicité personnalisée en consultant les <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Paramètres des annonces Google</a>, ou refuser l\'utilisation de cookies par certains fournisseurs tiers à des fins de publicité personnalisée en consultant <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>. Pour en savoir plus sur la façon dont Google utilise les données lorsque vous utilisez notre Site, consultez <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Comment Google utilise les informations provenant de sites ou d\'applications qui utilisent ses services</a>.',
        ] },
        { h2: "Services tiers", p: ["Nous pouvons utiliser des services tiers pour l'analyse, l'hébergement et la publicité (comme Google AdSense et Google Analytics). Ces prestataires peuvent collecter des informations envoyées par votre navigateur dans le cadre d'une requête de page web, telles que des cookies ou votre adresse IP, et sont régis par leurs propres politiques de confidentialité, et non par la présente."] },
        { h2: "Confidentialité des mineurs", p: ["Calquary ne s'adresse pas aux enfants de moins de 13 ans, et nous ne collectons pas sciemment d'informations personnelles auprès d'enfants de moins de 13 ans. Si vous pensez qu'un enfant nous a fourni des informations personnelles, veuillez nous contacter afin que nous puissions y remédier."] },
        { h2: "Modifications de cette politique", p: ['Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre pour refléter des changements dans nos pratiques ou pour des raisons légales, opérationnelles ou réglementaires. La « Date d\'entrée en vigueur » en haut de cette page reflétera la révision la plus récente. La poursuite de l\'utilisation du Site après l\'entrée en vigueur des modifications constitue une acceptation de la politique révisée.'] },
        { h2: "Nous contacter", p: ['Si vous avez des questions concernant cette Politique de Confidentialité, veuillez <a href="/contact.html">nous contacter</a>.'] },
      ],
    },
    de: {
      title: "Datenschutzerklärung - Ihre Daten bei Calquary",
      effectiveDateLabel: "Datum des Inkrafttretens: 18. August 2026",
      sections: [
        { h2: "Überblick", p: ['Diese Datenschutzerklärung erläutert, welche Informationen Calquary („wir", „uns", „unser") erhebt, wenn Sie calquary.com (die „Website") nutzen, wie wir diese verwenden und welche Wahlmöglichkeiten Ihnen zur Verfügung stehen. Durch die Nutzung der Website stimmen Sie den hier beschriebenen Praktiken zu.'] },
        { h2: "Von uns erhobene Informationen", p: [
          "Die Rechner von Calquary laufen vollständig in Ihrem Browser. Wenn Sie Zahlen oder andere Werte in einen Rechner eingeben, werden diese Daten lokal auf Ihrem Gerät mittels JavaScript verarbeitet - sie werden niemals an unsere Server übertragen, in einer Datenbank gespeichert oder von uns in irgendeiner Form eingesehen. Für die Nutzung eines Rechners auf dieser Website sind kein Konto, kein Login und keine persönlichen Informationen erforderlich.",
          "Wir können automatisch begrenzte, nicht identifizierende technische Informationen erheben, wie Ihren Browsertyp, den allgemeinen Gerätetyp und besuchte Seiten, über Standard-Webserver-Protokolle und Analysetools (zum Beispiel, um zu verstehen, welche Rechner am nützlichsten sind, und um Fehler zu beheben). Diese Informationen umfassen nicht die Werte, die Sie in einen Rechner eingeben.",
        ] },
        { h2: "Cookies und Tracking-Technologien", p: ["Calquary verwendet derzeit keine Cookies für die Rechner selbst - kein Anmeldestatus, keine gespeicherten Präferenzen, kein Tracking Ihrer Rechner-Eingaben. Wir nutzen, oder planen zu nutzen, die unten beschriebenen Dienste Dritter, die möglicherweise eigene Cookies in Ihrem Browser setzen, auch zu Werbezwecken."] },
        { h2: "Werbung", p: [
          'Calquary kann Werbung über Google AdSense oder ähnliche Werbedienste Dritter anzeigen. Diese Dienste können Cookies, Geräte-IDs oder ähnliche Technologien verwenden, um Anzeigen basierend auf Ihren früheren Besuchen dieser oder anderer Websites auszuliefern („interessenbasierte" oder „personalisierte" Werbung).',
          'Durch die Verwendung von Werbe-Cookies können Google und seine Partner Anzeigen basierend auf Ihren Besuchen dieser und anderer Websites schalten. Sie können personalisierte Werbung ablehnen, indem Sie die <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google-Anzeigeneinstellungen</a> besuchen, oder die Verwendung von Cookies einiger Drittanbieter für personalisierte Werbung ablehnen, indem Sie <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a> besuchen. Weitere Informationen dazu, wie Google Daten verwendet, wenn Sie unsere Website nutzen, finden Sie unter <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Wie Google Daten verwendet, wenn Sie Websites oder Apps unserer Partner nutzen</a>.',
        ] },
        { h2: "Dienste Dritter", p: ["Wir können Dienste Dritter für Analyse, Hosting und Werbung nutzen (wie Google AdSense und Google Analytics). Diese Anbieter können Informationen erheben, die Ihr Browser im Rahmen einer Webseitenanfrage sendet, wie Cookies oder Ihre IP-Adresse, und unterliegen ihren eigenen Datenschutzerklärungen, nicht dieser."] },
        { h2: "Datenschutz von Kindern", p: ["Calquary richtet sich nicht an Kinder unter 13 Jahren, und wir erheben wissentlich keine personenbezogenen Daten von Kindern unter 13 Jahren. Wenn Sie glauben, dass ein Kind uns persönliche Informationen mitgeteilt hat, kontaktieren Sie uns bitte, damit wir dies klären können."] },
        { h2: "Änderungen dieser Richtlinie", p: ['Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren, um Änderungen unserer Praktiken oder aus rechtlichen, betrieblichen oder regulatorischen Gründen widerzuspiegeln. Das „Datum des Inkrafttretens" oben auf dieser Seite spiegelt die jüngste Überarbeitung wider. Die fortgesetzte Nutzung der Website nach Inkrafttreten der Änderungen stellt die Annahme der überarbeiteten Richtlinie dar.'] },
        { h2: "Kontakt", p: ['Wenn Sie Fragen zu dieser Datenschutzerklärung haben, <a href="/contact.html">kontaktieren Sie uns bitte</a>.'] },
      ],
    },
    pt: {
      title: "Política de Privacidade - Como a Calquary Trata seus Dados",
      effectiveDateLabel: "Data de vigência: 18 de agosto de 2026",
      sections: [
        { h2: "Visão geral", p: ['Esta Política de Privacidade explica quais informações a Calquary ("nós", "nosso") coleta quando você usa calquary.com (o "Site"), como as usamos e as opções disponíveis para você. Ao usar o Site, você concorda com as práticas aqui descritas.'] },
        { h2: "Informações que coletamos", p: [
          "As calculadoras da Calquary funcionam inteiramente no seu navegador. Quando você insere números ou outros valores em uma calculadora, esses dados são processados localmente no seu dispositivo usando JavaScript - nunca são transmitidos aos nossos servidores, armazenados em um banco de dados ou vistos por nós de qualquer forma. Não exigimos contas, logins ou qualquer informação pessoal para usar qualquer calculadora deste Site.",
          "Podemos coletar automaticamente informações técnicas limitadas e não identificáveis, como tipo de navegador, tipo geral de dispositivo e páginas visitadas, por meio de registros padrão de servidor web e ferramentas de análise (por exemplo, para entender quais calculadoras são mais úteis e corrigir erros). Essas informações não incluem os valores que você insere em uma calculadora.",
        ] },
        { h2: "Cookies e tecnologias de rastreamento", p: ["A Calquary atualmente não usa cookies para as próprias calculadoras - sem estado de login, sem preferências salvas, sem rastreamento das suas entradas na calculadora. Nós usamos, ou planejamos usar, os serviços de terceiros descritos abaixo, que podem definir seus próprios cookies no seu navegador, inclusive para fins de publicidade."] },
        { h2: "Publicidade", p: [
          'A Calquary pode exibir publicidade por meio do Google AdSense ou serviços de publicidade de terceiros semelhantes. Esses serviços podem usar cookies, identificadores de dispositivo ou tecnologias semelhantes para veicular anúncios com base em suas visitas anteriores a este ou outros sites (publicidade "baseada em interesses" ou "personalizada").',
          'O uso de cookies de publicidade pelo Google permite que ele e seus parceiros veiculem anúncios com base em suas visitas a este e a outros sites. Você pode optar por não receber publicidade personalizada visitando as <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Configurações de anúncios do Google</a>, ou recusar o uso de cookies de alguns fornecedores terceirizados para publicidade personalizada visitando <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>. Para saber mais sobre como o Google usa os dados quando você usa nosso Site, consulte <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Como o Google usa informações de sites ou apps que usam os serviços do Google</a>.',
        ] },
        { h2: "Serviços de terceiros", p: ["Podemos usar serviços de terceiros para análise, hospedagem e publicidade (como Google AdSense e Google Analytics). Esses provedores podem coletar informações enviadas pelo seu navegador como parte de uma solicitação de página da web, como cookies ou seu endereço IP, e são regidos por suas próprias políticas de privacidade, não por esta."] },
        { h2: "Privacidade infantil", p: ["A Calquary não é direcionada a crianças menores de 13 anos, e não coletamos intencionalmente informações pessoais de crianças menores de 13 anos. Se você acredita que uma criança nos forneceu informações pessoais, entre em contato conosco para que possamos resolver a situação."] },
        { h2: "Alterações a esta política", p: ['Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou por motivos legais, operacionais ou regulatórios. A "Data de vigência" no topo desta página refletirá a revisão mais recente. O uso continuado do Site após a entrada em vigor das alterações constitui aceitação da política revisada.'] },
        { h2: "Fale conosco", p: ['Se você tiver dúvidas sobre esta Política de Privacidade, por favor <a href="/contact.html">entre em contato conosco</a>.'] },
      ],
    },
    it: {
      title: "Informativa sulla Privacy - I Tuoi Dati su Calquary",
      effectiveDateLabel: "Data di entrata in vigore: 18 agosto 2026",
      sections: [
        { h2: "Panoramica", p: ['Questa Informativa sulla Privacy spiega quali informazioni Calquary ("noi", "nostro") raccoglie quando utilizzi calquary.com (il "Sito"), come le utilizziamo e le scelte a tua disposizione. Utilizzando il Sito, accetti le pratiche qui descritte.'] },
        { h2: "Informazioni che raccogliamo", p: [
          "Le calcolatrici di Calquary funzionano interamente nel tuo browser. Quando inserisci numeri o altri valori in una calcolatrice, quei dati vengono elaborati localmente sul tuo dispositivo tramite JavaScript - non vengono mai trasmessi ai nostri server, memorizzati in un database o visti da noi in alcuna forma. Non richiediamo account, accessi o alcuna informazione personale per utilizzare qualsiasi calcolatrice di questo Sito.",
          "Potremmo raccogliere automaticamente informazioni tecniche limitate e non identificative, come il tipo di browser, il tipo generale di dispositivo e le pagine visitate, tramite log standard del server web e strumenti di analisi (ad esempio, per capire quali calcolatrici sono più utili e correggere bug). Queste informazioni non includono i valori che inserisci in una calcolatrice.",
        ] },
        { h2: "Cookie e tecnologie di tracciamento", p: ["Calquary attualmente non utilizza cookie per le calcolatrici stesse - nessuno stato di accesso, nessuna preferenza salvata, nessun tracciamento dei tuoi input nelle calcolatrici. Utilizziamo, o prevediamo di utilizzare, i servizi di terze parti descritti di seguito, che potrebbero impostare i propri cookie nel tuo browser, anche a scopo pubblicitario."] },
        { h2: "Pubblicità", p: [
          'Calquary potrebbe mostrare pubblicità tramite Google AdSense o servizi pubblicitari di terze parti simili. Questi servizi potrebbero utilizzare cookie, identificatori del dispositivo o tecnologie simili per mostrare annunci basati sulle tue visite precedenti a questo o ad altri siti web (pubblicità "basata sugli interessi" o "personalizzata").',
          'L\'uso da parte di Google dei cookie pubblicitari consente a Google e ai suoi partner di mostrare annunci in base alle tue visite a questo e ad altri siti. Puoi disattivare la pubblicità personalizzata visitando le <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Impostazioni annunci Google</a>, oppure rifiutare l\'uso dei cookie da parte di alcuni fornitori terzi per la pubblicità personalizzata visitando <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>. Per saperne di più su come Google utilizza i dati quando usi il nostro Sito, consulta <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Come Google utilizza le informazioni dei siti o delle app che utilizzano i suoi servizi</a>.',
        ] },
        { h2: "Servizi di terze parti", p: ["Potremmo utilizzare servizi di terze parti per analisi, hosting e pubblicità (come Google AdSense e Google Analytics). Questi fornitori potrebbero raccogliere informazioni inviate dal tuo browser come parte di una richiesta di pagina web, come cookie o il tuo indirizzo IP, e sono regolati dalle proprie informative sulla privacy, non da questa."] },
        { h2: "Privacy dei minori", p: ["Calquary non è rivolto a bambini di età inferiore ai 13 anni, e non raccogliamo consapevolmente informazioni personali da bambini di età inferiore ai 13 anni. Se ritieni che un bambino ci abbia fornito informazioni personali, contattaci in modo da poter risolvere la situazione."] },
        { h2: "Modifiche a questa informativa", p: ['Potremmo aggiornare questa Informativa sulla Privacy di tanto in tanto per riflettere cambiamenti nelle nostre pratiche o per motivi legali, operativi o normativi. La "Data di entrata in vigore" in cima a questa pagina rifletterà la revisione più recente. L\'uso continuato del Sito dopo l\'entrata in vigore delle modifiche costituisce accettazione dell\'informativa rivista.'] },
        { h2: "Contattaci", p: ['Se hai domande su questa Informativa sulla Privacy, <a href="/contact.html">contattaci</a>.'] },
      ],
    },
    ja: {
      title: "プライバシーポリシー - Calquaryのデータの取り扱い",
      effectiveDateLabel: "発効日：2026年8月18日",
      sections: [
        { h2: "概要", p: ["本プライバシーポリシーは、calquary.com（以下「本サイト」）をご利用の際にCalquary（以下「当社」）が収集する情報、その利用方法、およびお客様が選択できる事項について説明するものです。本サイトをご利用いただくことで、ここに記載された取り扱いに同意したものとみなされます。"] },
        { h2: "当社が収集する情報", p: [
          "Calquaryの計算ツールはすべてお客様のブラウザ内で動作します。計算ツールに数値などの値を入力すると、そのデータはJavaScriptを使用してお客様のデバイス上でローカルに処理されます。当社のサーバーに送信されたり、データベースに保存されたり、当社が何らかの形で閲覧したりすることは一切ありません。本サイトのいずれの計算ツールを利用する際にも、アカウント登録、ログイン、個人情報の入力は不要です。",
          "当社は、ブラウザの種類、一般的なデバイスの種類、閲覧したページなど、個人を特定しない限定的な技術情報を、標準的なウェブサーバーのログや分析ツールを通じて自動的に収集する場合があります（例：どの計算ツールが最も利用されているかを把握し、不具合を修正するため）。この情報には、計算ツールに入力した値は含まれません。",
        ] },
        { h2: "Cookieおよびトラッキング技術", p: ["Calquaryは現在、計算ツール自体にはCookieを使用していません - ログイン状態の保持、設定の保存、入力内容の追跡は行っていません。当社は、以下で説明する第三者サービスを利用する、または利用を予定しており、それらは広告目的を含め、お客様のブラウザに独自のCookieを設定する場合があります。"] },
        { h2: "広告", p: [
          "Calquaryは、Google AdSenseまたは類似の第三者広告サービスを通じて広告を表示する場合があります。これらのサービスは、Cookie、デバイス識別子、または類似の技術を使用して、お客様の本サイトまたは他のサイトへの過去の訪問履歴に基づいた広告（「興味関心に基づく」または「パーソナライズされた」広告）を配信する場合があります。",
          'Googleが広告用Cookieを使用することで、Googleおよびそのパートナーは、お客様のこのサイトおよび他のサイトへの訪問に基づいた広告を配信できます。パーソナライズ広告を無効にするには<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google広告設定</a>をご覧ください。また、一部の第三者ベンダーによるパーソナライズ広告用Cookieの使用を無効にするには<a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>をご覧ください。Googleが本サイトのご利用時にデータをどのように使用するかについては、<a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Googleのサービスを使用するサイトやアプリからの情報の使用方法について</a>をご覧ください。',
        ] },
        { h2: "第三者サービス", p: ["当社は、分析、ホスティング、広告のために第三者サービス（Google AdSenseやGoogle Analyticsなど）を利用する場合があります。これらのプロバイダーは、Cookieやお客様のIPアドレスなど、ウェブページのリクエストの一部としてブラウザから送信される情報を収集する場合があり、本ポリシーではなく、各社独自のプライバシーポリシーに準拠します。"] },
        { h2: "児童のプライバシー", p: ["Calquaryは13歳未満のお子様を対象としておらず、13歳未満のお子様の個人情報を意図的に収集することはありません。お子様が当社に個人情報を提供したと思われる場合は、対応いたしますので当社までご連絡ください。"] },
        { h2: "本ポリシーの変更", p: ["当社は、実務内容の変更、または法的・運用上・規制上の理由により、本プライバシーポリシーを随時更新する場合があります。本ページ上部の「発効日」は最新の改定日を反映しています。変更の発効後も本サイトをご利用いただいた場合、改定後のポリシーに同意したものとみなされます。"] },
        { h2: "お問い合わせ", p: ['本プライバシーポリシーに関するご質問は、<a href="/contact.html">お問い合わせ</a>ください。'] },
      ],
    },
    ro: {
      title: "Politica de Confidențialitate - Cum Gestionează Calquary Datele Tale",
      effectiveDateLabel: "Data intrării în vigoare: 18 august 2026",
      sections: [
        { h2: "Prezentare generală", p: ['Această Politică de Confidențialitate explică ce informații colectează Calquary ("noi", "al nostru") atunci când utilizezi calquary.com (denumit "Site-ul"), cum le folosim și opțiunile disponibile pentru tine. Prin utilizarea Site-ului, ești de acord cu practicile descrise aici.'] },
        { h2: "Informațiile pe care le colectăm", p: [
          "Calculatoarele Calquary funcționează în întregime în browserul tău. Când introduci numere sau alte valori într-un calculator, acele date sunt procesate local pe dispozitivul tău folosind JavaScript - nu sunt niciodată transmise către serverele noastre, stocate într-o bază de date sau văzute de noi sub nicio formă. Nu solicităm conturi, autentificare sau vreo informație personală pentru a folosi niciun calculator de pe acest Site.",
          "Putem colecta automat informații tehnice limitate, neidentificabile, precum tipul browserului, tipul general de dispozitiv și paginile vizitate, prin jurnale standard de server web și instrumente de analiză (de exemplu, pentru a înțelege care calculatoare sunt cele mai utile și pentru a remedia erori). Aceste informații nu includ valorile pe care le introduci într-un calculator.",
        ] },
        { h2: "Cookie-uri și tehnologii de urmărire", p: ["Calquary nu folosește în prezent cookie-uri pentru calculatoarele în sine - fără stare de autentificare, fără preferințe salvate, fără urmărirea datelor introduse. Folosim, sau intenționăm să folosim, serviciile terțe descrise mai jos, care pot seta propriile cookie-uri în browserul tău, inclusiv în scopuri publicitare."] },
        { h2: "Publicitate", p: [
          'Calquary poate afișa publicitate prin Google AdSense sau servicii publicitare terțe similare. Aceste servicii pot folosi cookie-uri, identificatori de dispozitiv sau tehnologii similare pentru a livra reclame bazate pe vizitele tale anterioare pe acest site sau pe altele (publicitate "bazată pe interese" sau "personalizată").',
          'Utilizarea de către Google a cookie-urilor publicitare permite Google și partenerilor săi să afișeze reclame bazate pe vizitele tale pe acest site și pe altele. Poți renunța la publicitatea personalizată vizitând <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Setările de anunțuri Google</a>, sau poți renunța la utilizarea cookie-urilor de către unii furnizori terți pentru publicitate personalizată vizitând <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>. Pentru mai multe informații despre cum Google folosește datele atunci când utilizezi Site-ul nostru, vezi <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Cum folosește Google informațiile din site-uri sau aplicații care utilizează serviciile sale</a>.',
        ] },
        { h2: "Servicii terțe", p: ["Putem folosi servicii terțe pentru analiză, găzduire și publicitate (precum Google AdSense și Google Analytics). Acești furnizori pot colecta informații trimise de browserul tău ca parte a unei solicitări de pagină web, precum cookie-uri sau adresa ta IP, și sunt guvernați de propriile politici de confidențialitate, nu de aceasta."] },
        { h2: "Confidențialitatea copiilor", p: ["Calquary nu se adresează copiilor sub 13 ani și nu colectăm cu bună știință informații personale de la copii sub 13 ani. Dacă crezi că un copil ne-a furnizat informații personale, te rugăm să ne contactezi pentru a putea remedia situația."] },
        { h2: "Modificări ale acestei politici", p: ['Putem actualiza această Politică de Confidențialitate din când în când pentru a reflecta schimbări în practicile noastre sau din motive legale, operaționale sau de reglementare. "Data intrării în vigoare" din partea de sus a acestei pagini va reflecta cea mai recentă revizuire. Continuarea utilizării Site-ului după intrarea în vigoare a modificărilor constituie acceptarea politicii revizuite.'] },
        { h2: "Contactează-ne", p: ['Dacă ai întrebări despre această Politică de Confidențialitate, te rugăm să <a href="/contact.html">ne contactezi</a>.'] },
      ],
    },
  },

  terms: {
    en: {
      title: "Terms of Service - Calquary Usage Terms",
      effectiveDateLabel: "Effective date: August 18, 2026",
      sections: [
        { h2: "Acceptance of terms", p: ['By accessing or using calquary.com (the "Site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Site.'] },
        { h2: "Informational purposes only", p: [
          "Calquary's calculators are provided for general informational and estimation purposes only. They are not, and should not be relied upon as, professional financial, structural, engineering, medical, legal, or other expert advice. Results are estimates based on the formulas and assumptions built into each tool, and may not account for your specific circumstances.",
          "Always confirm results that matter - a loan payment, a material estimate for a construction project, a health-related calculation - with a qualified professional before making a decision based on them.",
        ] },
        { h2: "No warranty", p: ['The Site and its calculators are provided "as is" and "as available," without warranty of any kind, express or implied, including but not limited to warranties of accuracy, merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that any calculator will be error-free, uninterrupted, or produce results suitable for your specific situation.'] },
        { h2: "Limitation of liability", p: ["To the fullest extent permitted by law, Calquary and its operators shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of, or inability to use, the Site or any calculator's results - including but not limited to financial loss, property damage, or personal injury - even if advised of the possibility of such damages."] },
        { h2: "Acceptable use", p: ["You agree not to misuse the Site, including but not limited to: attempting to disrupt or overload the Site's infrastructure, scraping content at a rate that degrades service for other users, or using the Site for any unlawful purpose. We reserve the right to restrict access for any use that violates these terms."] },
        { h2: "Third-party links and advertising", p: ["The Site may contain links to third-party websites or display third-party advertising. We are not responsible for the content, accuracy, or practices of any third-party site, and inclusion of a link or advertisement does not imply endorsement."] },
        { h2: "Changes to these terms", p: ['We may update these Terms of Service from time to time. The "Effective date" at the top of this page reflects the most recent revision. Continued use of the Site after changes take effect constitutes acceptance of the revised terms.'] },
        { h2: "Contact us", p: ['If you have questions about these Terms of Service, please <a href="/contact.html">contact us</a>.'] },
      ],
    },
    es: {
      title: "Términos de Servicio - Condiciones de Uso de Calquary",
      effectiveDateLabel: "Fecha de vigencia: 18 de agosto de 2026",
      sections: [
        { h2: "Aceptación de los términos", p: ['Al acceder o utilizar calquary.com (el "Sitio"), aceptas quedar sujeto a estos Términos de Servicio. Si no estás de acuerdo, por favor no utilices el Sitio.'] },
        { h2: "Solo con fines informativos", p: [
          "Las calculadoras de Calquary se proporcionan únicamente con fines informativos y de estimación general. No son, y no deben tomarse como, asesoramiento financiero, estructural, de ingeniería, médico, legal ni de ningún otro tipo profesional. Los resultados son estimaciones basadas en las fórmulas y supuestos incorporados en cada herramienta, y pueden no tener en cuenta tus circunstancias específicas.",
          "Confirma siempre los resultados importantes - un pago de préstamo, una estimación de materiales para un proyecto de construcción, un cálculo relacionado con la salud - con un profesional cualificado antes de tomar una decisión basada en ellos.",
        ] },
        { h2: "Sin garantía", p: ['El Sitio y sus calculadoras se proporcionan "tal cual" y "según disponibilidad", sin garantía de ningún tipo, expresa o implícita, incluyendo entre otras las garantías de precisión, comerciabilidad, idoneidad para un propósito particular o no infracción. No garantizamos que ninguna calculadora esté libre de errores, sea ininterrumpida o produzca resultados adecuados para tu situación específica.'] },
        { h2: "Limitación de responsabilidad", p: ["En la medida máxima permitida por la ley, Calquary y sus operadores no serán responsables de ningún daño directo, indirecto, incidental, consecuente o especial que surja de, o esté relacionado con, tu uso o incapacidad de usar el Sitio o los resultados de cualquier calculadora - incluyendo, entre otros, pérdidas financieras, daños materiales o lesiones personales - incluso si se les advirtió de la posibilidad de tales daños."] },
        { h2: "Uso aceptable", p: ["Aceptas no hacer un uso indebido del Sitio, incluyendo, entre otros: intentar interrumpir o sobrecargar la infraestructura del Sitio, extraer contenido a un ritmo que degrade el servicio para otros usuarios, o utilizar el Sitio para cualquier propósito ilegal. Nos reservamos el derecho de restringir el acceso por cualquier uso que viole estos términos."] },
        { h2: "Enlaces de terceros y publicidad", p: ["El Sitio puede contener enlaces a sitios web de terceros o mostrar publicidad de terceros. No somos responsables del contenido, la precisión ni las prácticas de ningún sitio de terceros, y la inclusión de un enlace o anuncio no implica respaldo."] },
        { h2: "Cambios a estos términos", p: ['Podemos actualizar estos Términos de Servicio periódicamente. La "Fecha de vigencia" en la parte superior de esta página refleja la revisión más reciente. El uso continuado del Sitio después de que los cambios entren en vigor constituye la aceptación de los términos revisados.'] },
        { h2: "Contáctanos", p: ['Si tienes preguntas sobre estos Términos de Servicio, por favor <a href="/contact.html">contáctanos</a>.'] },
      ],
    },
    fr: {
      title: "Conditions d'Utilisation - Règles d'Usage de Calquary",
      effectiveDateLabel: "Date d'entrée en vigueur : 18 août 2026",
      sections: [
        { h2: "Acceptation des conditions", p: ['En accédant à calquary.com ou en l\'utilisant (le « Site »), vous acceptez d\'être lié par les présentes Conditions d\'Utilisation. Si vous n\'êtes pas d\'accord, veuillez ne pas utiliser le Site.'] },
        { h2: "À des fins informatives uniquement", p: [
          "Les calculatrices de Calquary sont fournies uniquement à des fins générales d'information et d'estimation. Elles ne constituent pas, et ne doivent pas être considérées comme, des conseils financiers, structurels, d'ingénierie, médicaux, juridiques ou autres conseils professionnels. Les résultats sont des estimations basées sur les formules et hypothèses intégrées à chaque outil, et peuvent ne pas tenir compte de votre situation particulière.",
          "Confirmez toujours les résultats importants - une mensualité de prêt, une estimation de matériaux pour un projet de construction, un calcul lié à la santé - auprès d'un professionnel qualifié avant de prendre une décision fondée sur ceux-ci.",
        ] },
        { h2: "Absence de garantie", p: ['Le Site et ses calculatrices sont fournis « en l\'état » et « selon disponibilité », sans garantie d\'aucune sorte, expresse ou implicite, y compris, sans s\'y limiter, les garanties d\'exactitude, de qualité marchande, d\'adéquation à un usage particulier ou de non-contrefaçon. Nous ne garantissons pas qu\'une calculatrice sera exempte d\'erreurs, ininterrompue, ou produira des résultats adaptés à votre situation particulière.'] },
        { h2: "Limitation de responsabilité", p: ["Dans toute la mesure permise par la loi, Calquary et ses exploitants ne pourront être tenus responsables de dommages directs, indirects, accessoires, consécutifs ou spéciaux découlant de, ou liés à, votre utilisation ou incapacité à utiliser le Site ou les résultats d'une calculatrice - y compris, sans s'y limiter, une perte financière, des dommages matériels ou des blessures corporelles - même si la possibilité de tels dommages a été signalée."] },
        { h2: "Utilisation acceptable", p: ["Vous acceptez de ne pas faire un usage abusif du Site, y compris, sans s'y limiter : tenter de perturber ou de surcharger l'infrastructure du Site, extraire du contenu à un rythme qui dégrade le service pour les autres utilisateurs, ou utiliser le Site à des fins illégales. Nous nous réservons le droit de restreindre l'accès pour tout usage contraire à ces conditions."] },
        { h2: "Liens tiers et publicité", p: ["Le Site peut contenir des liens vers des sites web tiers ou afficher de la publicité tierce. Nous ne sommes pas responsables du contenu, de l'exactitude ni des pratiques d'un site tiers, et l'inclusion d'un lien ou d'une publicité n'implique aucun soutien de notre part."] },
        { h2: "Modifications de ces conditions", p: ['Nous pouvons mettre à jour ces Conditions d\'Utilisation de temps à autre. La « Date d\'entrée en vigueur » en haut de cette page reflète la révision la plus récente. La poursuite de l\'utilisation du Site après l\'entrée en vigueur des modifications constitue une acceptation des conditions révisées.'] },
        { h2: "Nous contacter", p: ['Si vous avez des questions concernant ces Conditions d\'Utilisation, veuillez <a href="/contact.html">nous contacter</a>.'] },
      ],
    },
    de: {
      title: "Nutzungsbedingungen - Regeln für Calquary",
      effectiveDateLabel: "Datum des Inkrafttretens: 18. August 2026",
      sections: [
        { h2: "Annahme der Bedingungen", p: ['Durch den Zugriff auf calquary.com oder dessen Nutzung (die „Website") erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Falls Sie nicht zustimmen, nutzen Sie die Website bitte nicht.'] },
        { h2: "Nur zu Informationszwecken", p: [
          "Die Rechner von Calquary dienen ausschließlich allgemeinen Informations- und Schätzzwecken. Sie stellen keine professionelle Finanz-, Bau-, Ingenieurs-, medizinische, rechtliche oder sonstige fachliche Beratung dar und sollten nicht als solche verstanden werden. Die Ergebnisse sind Schätzungen, die auf den in jedem Tool hinterlegten Formeln und Annahmen basieren, und berücksichtigen möglicherweise nicht Ihre individuellen Umstände.",
          "Bestätigen Sie wichtige Ergebnisse - eine Kreditrate, eine Materialschätzung für ein Bauprojekt, eine gesundheitsbezogene Berechnung - stets bei einer qualifizierten Fachperson, bevor Sie eine darauf basierende Entscheidung treffen.",
        ] },
        { h2: "Keine Gewährleistung", p: ['Die Website und ihre Rechner werden „wie besehen" und „wie verfügbar" bereitgestellt, ohne jegliche ausdrückliche oder stillschweigende Gewährleistung, einschließlich, aber nicht beschränkt auf Gewährleistungen der Genauigkeit, der Marktgängigkeit, der Eignung für einen bestimmten Zweck oder der Nichtverletzung von Rechten Dritter. Wir garantieren nicht, dass ein Rechner fehlerfrei oder unterbrechungsfrei arbeitet oder für Ihre individuelle Situation geeignete Ergebnisse liefert.'] },
        { h2: "Haftungsbeschränkung", p: ["Im gesetzlich zulässigen Umfang haften Calquary und seine Betreiber nicht für direkte, indirekte, beiläufig entstandene, Folge- oder besondere Schäden, die sich aus oder im Zusammenhang mit Ihrer Nutzung oder Nichtnutzungsmöglichkeit der Website oder der Ergebnisse eines Rechners ergeben - einschließlich, aber nicht beschränkt auf finanzielle Verluste, Sachschäden oder Personenschäden - selbst wenn auf die Möglichkeit solcher Schäden hingewiesen wurde."] },
        { h2: "Zulässige Nutzung", p: ["Sie verpflichten sich, die Website nicht missbräuchlich zu nutzen, einschließlich, aber nicht beschränkt auf: Versuche, die Infrastruktur der Website zu stören oder zu überlasten, Inhalte in einem Umfang zu scrapen, der den Dienst für andere Nutzer beeinträchtigt, oder die Website für rechtswidrige Zwecke zu nutzen. Wir behalten uns das Recht vor, den Zugang bei jeder Nutzung, die gegen diese Bedingungen verstößt, einzuschränken."] },
        { h2: "Links Dritter und Werbung", p: ["Die Website kann Links zu Websites Dritter enthalten oder Werbung Dritter anzeigen. Wir sind nicht verantwortlich für den Inhalt, die Genauigkeit oder die Praktiken einer Website Dritter, und die Aufnahme eines Links oder einer Anzeige impliziert keine Empfehlung unsererseits."] },
        { h2: "Änderungen dieser Bedingungen", p: ['Wir können diese Nutzungsbedingungen von Zeit zu Zeit aktualisieren. Das „Datum des Inkrafttretens" oben auf dieser Seite spiegelt die jüngste Überarbeitung wider. Die fortgesetzte Nutzung der Website nach Inkrafttreten der Änderungen stellt die Annahme der überarbeiteten Bedingungen dar.'] },
        { h2: "Kontakt", p: ['Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, <a href="/contact.html">kontaktieren Sie uns bitte</a>.'] },
      ],
    },
    pt: {
      title: "Termos de Serviço - Condições de Uso da Calquary",
      effectiveDateLabel: "Data de vigência: 18 de agosto de 2026",
      sections: [
        { h2: "Aceitação dos termos", p: ['Ao acessar ou utilizar calquary.com (o "Site"), você concorda em ficar vinculado a estes Termos de Serviço. Se você não concordar, não use o Site.'] },
        { h2: "Apenas para fins informativos", p: [
          "As calculadoras da Calquary são fornecidas apenas para fins gerais de informação e estimativa. Elas não são, e não devem ser tomadas como, aconselhamento financeiro, estrutural, de engenharia, médico, jurídico ou de qualquer outra natureza profissional. Os resultados são estimativas baseadas nas fórmulas e suposições incorporadas em cada ferramenta, e podem não considerar suas circunstâncias específicas.",
          "Sempre confirme resultados importantes - um pagamento de empréstimo, uma estimativa de material para um projeto de construção, um cálculo relacionado à saúde - com um profissional qualificado antes de tomar uma decisão baseada neles.",
        ] },
        { h2: "Sem garantia", p: ['O Site e suas calculadoras são fornecidos "como estão" e "conforme disponíveis", sem garantia de qualquer tipo, expressa ou implícita, incluindo, mas não se limitando a, garantias de precisão, comercialização, adequação a um propósito específico ou não violação. Não garantimos que qualquer calculadora estará livre de erros, será ininterrupta ou produzirá resultados adequados à sua situação específica.'] },
        { h2: "Limitação de responsabilidade", p: ["Na máxima extensão permitida por lei, a Calquary e seus operadores não serão responsáveis por quaisquer danos diretos, indiretos, incidentais, consequenciais ou especiais decorrentes de, ou relacionados a, seu uso ou incapacidade de usar o Site ou os resultados de qualquer calculadora - incluindo, mas não se limitando a, perda financeira, danos materiais ou lesões pessoais - mesmo que avisados da possibilidade de tais danos."] },
        { h2: "Uso aceitável", p: ["Você concorda em não fazer uso indevido do Site, incluindo, mas não se limitando a: tentar interromper ou sobrecarregar a infraestrutura do Site, extrair conteúdo em um ritmo que degrade o serviço para outros usuários, ou usar o Site para qualquer propósito ilegal. Reservamo-nos o direito de restringir o acesso para qualquer uso que viole estes termos."] },
        { h2: "Links de terceiros e publicidade", p: ["O Site pode conter links para sites de terceiros ou exibir publicidade de terceiros. Não somos responsáveis pelo conteúdo, precisão ou práticas de qualquer site de terceiros, e a inclusão de um link ou anúncio não implica endosso."] },
        { h2: "Alterações a estes termos", p: ['Podemos atualizar estes Termos de Serviço periodicamente. A "Data de vigência" no topo desta página reflete a revisão mais recente. O uso continuado do Site após a entrada em vigor das alterações constitui aceitação dos termos revisados.'] },
        { h2: "Fale conosco", p: ['Se você tiver dúvidas sobre estes Termos de Serviço, por favor <a href="/contact.html">entre em contato conosco</a>.'] },
      ],
    },
    it: {
      title: "Termini di Servizio - Regole d'Uso di Calquary",
      effectiveDateLabel: "Data di entrata in vigore: 18 agosto 2026",
      sections: [
        { h2: "Accettazione dei termini", p: ['Accedendo o utilizzando calquary.com (il "Sito"), accetti di essere vincolato da questi Termini di Servizio. Se non sei d\'accordo, ti preghiamo di non utilizzare il Sito.'] },
        { h2: "Solo a scopo informativo", p: [
          "Le calcolatrici di Calquary sono fornite solo a scopo generale informativo e di stima. Non costituiscono, e non devono essere considerate, una consulenza finanziaria, strutturale, ingegneristica, medica, legale o di altro tipo professionale. I risultati sono stime basate sulle formule e sulle ipotesi integrate in ciascuno strumento, e potrebbero non tenere conto delle tue circostanze specifiche.",
          "Conferma sempre i risultati importanti - una rata di un prestito, una stima dei materiali per un progetto edile, un calcolo relativo alla salute - con un professionista qualificato prima di prendere una decisione basata su di essi.",
        ] },
        { h2: "Nessuna garanzia", p: ['Il Sito e le sue calcolatrici sono forniti "così come sono" e "come disponibili", senza garanzia di alcun tipo, espressa o implicita, incluse, a titolo esemplificativo ma non esaustivo, le garanzie di accuratezza, commerciabilità, idoneità a uno scopo particolare o non violazione. Non garantiamo che una calcolatrice sarà priva di errori, ininterrotta o produrrà risultati adatti alla tua situazione specifica.'] },
        { h2: "Limitazione di responsabilità", p: ["Nella misura massima consentita dalla legge, Calquary e i suoi gestori non saranno responsabili per eventuali danni diretti, indiretti, incidentali, consequenziali o speciali derivanti da, o in connessione con, l'uso o l'impossibilità di utilizzare il Sito o i risultati di qualsiasi calcolatrice - inclusi, a titolo esemplificativo ma non esaustivo, perdite finanziarie, danni materiali o lesioni personali - anche se avvisati della possibilità di tali danni."] },
        { h2: "Uso consentito", p: ["Accetti di non fare un uso improprio del Sito, incluso, a titolo esemplificativo ma non esaustivo: tentare di interrompere o sovraccaricare l'infrastruttura del Sito, effettuare scraping di contenuti a un ritmo che degradi il servizio per altri utenti, o utilizzare il Sito per scopi illeciti. Ci riserviamo il diritto di limitare l'accesso per qualsiasi uso che violi questi termini."] },
        { h2: "Link di terze parti e pubblicità", p: ["Il Sito potrebbe contenere link a siti web di terze parti o mostrare pubblicità di terze parti. Non siamo responsabili per il contenuto, l'accuratezza o le pratiche di alcun sito di terze parti, e l'inclusione di un link o di un annuncio non implica alcuna approvazione."] },
        { h2: "Modifiche a questi termini", p: ['Potremmo aggiornare questi Termini di Servizio di tanto in tanto. La "Data di entrata in vigore" in cima a questa pagina riflette la revisione più recente. L\'uso continuato del Sito dopo l\'entrata in vigore delle modifiche costituisce accettazione dei termini rivisti.'] },
        { h2: "Contattaci", p: ['Se hai domande su questi Termini di Servizio, <a href="/contact.html">contattaci</a>.'] },
      ],
    },
    ja: {
      title: "利用規約 - Calquaryのご利用条件",
      effectiveDateLabel: "発効日：2026年8月18日",
      sections: [
        { h2: "規約への同意", p: ["calquary.com（以下「本サイト」）にアクセスまたはこれを利用することにより、お客様は本利用規約に拘束されることに同意したものとみなされます。同意されない場合は、本サイトをご利用にならないでください。"] },
        { h2: "情報提供のみを目的とした利用", p: [
          "Calquaryの計算ツールは、一般的な情報提供および概算のみを目的として提供されています。これらは専門的な財務、構造、工学、医療、法律、その他の専門的アドバイスではなく、そのようなものとして利用されるべきではありません。計算結果は、各ツールに組み込まれた数式や前提条件に基づく概算であり、お客様固有の状況を反映していない場合があります。",
          "ローンの返済額、建築プロジェクトの資材見積もり、健康に関する計算など、重要な意味を持つ結果については、それに基づいて判断を行う前に、必ず有資格の専門家にご確認ください。",
        ] },
        { h2: "保証の免責", p: ["本サイトおよびその計算ツールは「現状有姿」および「提供可能な状態のまま」で提供され、正確性、商品性、特定目的への適合性、権利非侵害を含むいかなる保証も、明示的か黙示的かを問わず一切行いません。いずれの計算ツールについても、エラーがないこと、中断なく利用できること、またはお客様固有の状況に適した結果を生成することを保証するものではありません。"] },
        { h2: "責任の制限", p: ["法律で認められる最大限の範囲において、Calquaryおよびその運営者は、本サイトまたはいずれかの計算ツールの結果の利用または利用不能に起因または関連して生じる、直接的、間接的、付随的、結果的、または特別な損害（金銭的損失、物的損害、人身傷害を含むがこれらに限定されない）について、たとえそのような損害の可能性を通知されていた場合でも、一切責任を負いません。"] },
        { h2: "許容される利用", p: ["お客様は、本サイトのインフラの妨害または過負荷を試みること、他のユーザーのサービスを低下させる速度でのコンテンツのスクレイピング、または違法な目的での本サイトの利用を含むがこれらに限定されない、本サイトの不正利用を行わないことに同意するものとします。当社は、これらの規約に違反する利用に対してアクセスを制限する権利を留保します。"] },
        { h2: "第三者リンクおよび広告", p: ["本サイトには、第三者ウェブサイトへのリンクが含まれている場合や、第三者の広告が表示される場合があります。当社は、いかなる第三者サイトのコンテンツ、正確性、または取り扱いについても責任を負わず、リンクや広告の掲載は推奨を意味するものではありません。"] },
        { h2: "本規約の変更", p: ["当社は、本利用規約を随時更新する場合があります。本ページ上部の「発効日」は最新の改定日を反映しています。変更の発効後も本サイトをご利用いただいた場合、改定後の規約に同意したものとみなされます。"] },
        { h2: "お問い合わせ", p: ['本利用規約に関するご質問は、<a href="/contact.html">お問い合わせ</a>ください。'] },
      ],
    },
    ro: {
      title: "Termeni de Serviciu - Condițiile de Utilizare Calquary",
      effectiveDateLabel: "Data intrării în vigoare: 18 august 2026",
      sections: [
        { h2: "Acceptarea termenilor", p: ['Prin accesarea sau utilizarea calquary.com (denumit "Site-ul"), ești de acord să respecți acești Termeni de Serviciu. Dacă nu ești de acord, te rugăm să nu folosești Site-ul.'] },
        { h2: "Doar în scop informativ", p: [
          "Calculatoarele Calquary sunt oferite exclusiv în scopuri informative generale și de estimare. Nu reprezintă și nu trebuie considerate consultanță financiară, structurală, inginerească, medicală, juridică sau de alt tip profesional. Rezultatele sunt estimări bazate pe formulele și presupunerile încorporate în fiecare instrument și pot să nu ia în calcul circumstanțele tale specifice.",
          "Confirmă întotdeauna rezultatele care contează - o rată de împrumut, o estimare de materiale pentru un proiect de construcție, un calcul legat de sănătate - cu un profesionist calificat înainte de a lua o decizie bazată pe ele.",
        ] },
        { h2: "Fără garanție", p: ['Site-ul și calculatoarele sale sunt furnizate "ca atare" și "conform disponibilității", fără nicio garanție de niciun fel, expresă sau implicită, incluzând dar fără a se limita la garanții de acuratețe, vandabilitate, adecvare pentru un anumit scop sau neîncălcare. Nu garantăm că vreun calculator va fi lipsit de erori, neîntrerupt sau va produce rezultate adecvate pentru situația ta specifică.'] },
        { h2: "Limitarea răspunderii", p: ["În măsura maximă permisă de lege, Calquary și operatorii săi nu vor fi răspunzători pentru niciun fel de daune directe, indirecte, incidentale, subsecvente sau speciale rezultate din sau legate de utilizarea sau imposibilitatea de a utiliza Site-ul sau rezultatele oricărui calculator - incluzând dar fără a se limita la pierderi financiare, daune materiale sau vătămări corporale - chiar dacă au fost avertizați despre posibilitatea unor astfel de daune."] },
        { h2: "Utilizare acceptabilă", p: ["Ești de acord să nu abuzezi de Site, incluzând dar fără a se limita la: încercarea de a perturba sau supraîncărca infrastructura Site-ului, extragerea conținutului într-un ritm care degradează serviciul pentru alți utilizatori sau utilizarea Site-ului în orice scop ilegal. Ne rezervăm dreptul de a restricționa accesul pentru orice utilizare care încalcă acești termeni."] },
        { h2: "Link-uri terțe și publicitate", p: ["Site-ul poate conține link-uri către site-uri web terțe sau poate afișa publicitate terță. Nu suntem responsabili pentru conținutul, acuratețea sau practicile niciunui site terț, iar includerea unui link sau a unei reclame nu implică o recomandare din partea noastră."] },
        { h2: "Modificări ale acestor termeni", p: ['Putem actualiza acești Termeni de Serviciu din când în când. "Data intrării în vigoare" din partea de sus a acestei pagini reflectă cea mai recentă revizuire. Continuarea utilizării Site-ului după intrarea în vigoare a modificărilor constituie acceptarea termenilor revizuiți.'] },
        { h2: "Contactează-ne", p: ['Dacă ai întrebări despre acești Termeni de Serviciu, te rugăm să <a href="/contact.html">ne contactezi</a>.'] },
      ],
    },
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = { LOCALES, LOCALE_NAMES, I18N_UI, I18N_CATEGORIES, I18N_TOOLS, I18N_STATIC };
}
if (typeof window !== "undefined") {
  window.I18N_CATEGORIES = I18N_CATEGORIES;
  window.I18N_TOOLS = I18N_TOOLS;
  window.I18N_UI = I18N_UI;
}
