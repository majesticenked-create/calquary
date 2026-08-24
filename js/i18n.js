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
};

const I18N_CATEGORIES = {
  math: {
    es: { name: "Matemáticas", description: "Porcentajes, proporciones y aritmética cotidiana." },
    fr: { name: "Mathématiques", description: "Pourcentages, ratios et calculs du quotidien." },
    de: { name: "Mathematik", description: "Prozentsätze, Verhältnisse und alltägliche Arithmetik." },
  },
  finance: {
    es: { name: "Finanzas", description: "Préstamos, propinas y matemáticas del dinero cotidianas." },
    fr: { name: "Finance", description: "Prêts, pourboires et calculs financiers du quotidien." },
    de: { name: "Finanzen", description: "Kredite, Trinkgeld und alltägliche Geldrechnungen." },
  },
  construction: {
    es: { name: "Construcción y Hogar", description: "Materiales, cobertura y presupuestos de proyectos." },
    fr: { name: "Construction et Maison", description: "Matériaux, couverture et estimations de projets." },
    de: { name: "Bau & Heimwerken", description: "Materialien, Flächenbedarf und Projektschätzungen." },
  },
  health: {
    es: { name: "Salud y Fitness", description: "Métricas corporales, ritmo y datos de entrenamiento." },
    fr: { name: "Santé et Forme", description: "Mesures corporelles, allure et données d'entraînement." },
    de: { name: "Gesundheit & Fitness", description: "Körperwerte, Tempo und Trainingsdaten." },
  },
  datetime: {
    es: { name: "Fecha y Hora", description: "Cuentas regresivas, duraciones y edad en días." },
    fr: { name: "Date et Heure", description: "Comptes à rebours, durées et âge en jours." },
    de: { name: "Datum & Uhrzeit", description: "Countdowns, Zeitspannen und Alter in Tagen." },
  },
  conversions: {
    es: { name: "Conversiones Cotidianas", description: "Unidades, medidas y equivalencias de cocina." },
    fr: { name: "Conversions Courantes", description: "Unités, mesures et équivalences de cuisine." },
    de: { name: "Alltagsumrechnungen", description: "Einheiten, Maße und Küchenumrechnungen." },
  },
  text: {
    es: { name: "Texto y Digital", description: "Conteo de palabras y generadores para tareas cotidianas." },
    fr: { name: "Texte et Numérique", description: "Comptage de mots et générateurs pour les tâches courantes." },
    de: { name: "Text & Digital", description: "Wortzählung und Generatoren für alltägliche Aufgaben." },
  },
  pets: {
    es: { name: "Mascotas y Estilo de Vida", description: "Tablas de edad y matemáticas cotidianas para mascotas." },
    fr: { name: "Animaux et Style de Vie", description: "Tableaux d'âge et calculs courants pour animaux." },
    de: { name: "Haustiere & Lifestyle", description: "Altersrechner und alltägliche Berechnungen für Haustiere." },
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
      ],
    },
    fr: {
      title: "Calculatrice de Pourcentage",
      intro: "Saisissez un pourcentage et un nombre pour obtenir la valeur résultante - utile pour les pourboires, les remises, les notes et les calculs du quotidien.",
      description: "Trouvez ce que représente X pour cent d'un nombre, en une étape.",
      faq: [
        { q: "Comment calculer un pourcentage d'un nombre à la main ?", a: "Divisez le pourcentage par 100, puis multipliez par le nombre. Pour 20% de 150 : 0,20 × 150 = 30." },
        { q: "Comment trouver quel pourcentage un nombre représente d'un autre ?", a: "Divisez la partie par le tout, puis multipliez par 100. Par exemple, 30 représente quel pourcentage de 150 ? 30 ÷ 150 × 100 = 20%." },
      ],
    },
    de: {
      title: "Prozentrechner",
      intro: "Geben Sie einen Prozentsatz und eine Zahl ein, um den resultierenden Wert zu ermitteln - nützlich für Trinkgeld, Rabatte, Noten und alltägliche Berechnungen.",
      description: "Ermitteln Sie in einem Schritt, wie viel X Prozent einer Zahl sind.",
      faq: [
        { q: "Wie berechne ich einen Prozentsatz einer Zahl von Hand?", a: "Teilen Sie den Prozentsatz durch 100 und multiplizieren Sie mit der Zahl. Für 20% von 150: 0,20 × 150 = 30." },
        { q: "Wie finde ich heraus, wie viel Prozent eine Zahl von einer anderen ist?", a: "Teilen Sie den Teil durch das Ganze und multiplizieren Sie mit 100. Beispiel: Wie viel Prozent von 150 sind 30? 30 ÷ 150 × 100 = 20%." },
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
      ],
    },
    fr: {
      title: "Calculatrice de Moyenne",
      intro: "Saisissez une liste de nombres séparés par des virgules ou des espaces pour calculer la moyenne, la médiane et la somme.",
      description: "Calculez la moyenne, la médiane et la somme d'une liste de nombres.",
      faq: [
        { q: "Comment calculer la moyenne d'une liste de nombres ?", a: "Additionnez tous les nombres, puis divisez par leur nombre total. Pour 4, 8, 15, 16, 23, 42 : la somme est 108, divisée par 6 nombres = une moyenne de 18." },
        { q: "Quelle est la différence entre moyenne et médiane ?", a: "La moyenne est la somme divisée par le nombre total (la « moyenne »); la médiane est la valeur du milieu une fois les nombres triés. La médiane est moins sensible aux valeurs extrêmes que la moyenne." },
      ],
    },
    de: {
      title: "Durchschnittsrechner",
      intro: "Geben Sie eine durch Kommas oder Leerzeichen getrennte Zahlenliste ein, um Mittelwert, Median und Summe zu berechnen.",
      description: "Berechnen Sie Mittelwert, Median und Summe einer Zahlenliste.",
      faq: [
        { q: "Wie berechne ich den Durchschnitt einer Zahlenliste?", a: "Addieren Sie alle Zahlen und teilen Sie durch die Anzahl der Zahlen. Für 4, 8, 15, 16, 23, 42: die Summe ist 108, geteilt durch 6 Zahlen = ein Durchschnitt von 18." },
        { q: "Was ist der Unterschied zwischen Mittelwert und Median?", a: "Der Mittelwert ist die Summe geteilt durch die Anzahl (der „Durchschnitt“); der Median ist der mittlere Wert der sortierten Zahlen. Der Median reagiert weniger empfindlich auf Ausreißer als der Mittelwert." },
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
      ],
    },
    fr: {
      title: "Calculatrice de Prêt Immobilier",
      intro: "Saisissez le prix du bien, l'apport, le taux et la durée pour estimer votre mensualité complète - capital, intérêts, taxe foncière et assurance.",
      description: "Estimez votre mensualité de prêt immobilier totale, taxes et assurance incluses.",
      faq: [
        { q: "Qu'inclut cette estimation de mensualité ?", a: "Cette calculatrice estime le PITI - capital, intérêts, taxe foncière et assurance habitation. Elle n'inclut pas la PMI (si votre apport est inférieur à 20 %) ni les charges de copropriété, qui varient selon le prêteur et le bien." },
        { q: "Comment l'apport affecte-t-il ma mensualité ?", a: "Un apport plus élevé réduit le montant emprunté, ce qui diminue à la fois la part capital + intérêts de votre mensualité et le total des intérêts payés sur la durée du prêt." },
      ],
    },
    de: {
      title: "Hypothekenrechner",
      intro: "Geben Sie Kaufpreis, Anzahlung, Zinssatz und Laufzeit ein, um Ihre vollständige monatliche Rate zu schätzen - Tilgung, Zinsen, Grundsteuer und Versicherung.",
      description: "Schätzen Sie Ihre monatliche Gesamtrate für die Hypothek, inklusive Steuern und Versicherung.",
      faq: [
        { q: "Was ist in dieser Hypothekenraten-Schätzung enthalten?", a: "Dieser Rechner schätzt PITI - Tilgung, Zinsen, Grundsteuer und Wohngebäudeversicherung. Nicht enthalten sind PMI (falls die Anzahlung unter 20% liegt) oder HOA-Gebühren, die je nach Kreditgeber und Immobilie variieren." },
        { q: "Wie wirkt sich die Anzahlung auf meine monatliche Rate aus?", a: "Eine höhere Anzahlung verringert die Darlehenssumme, was sowohl den Tilgungs- und Zinsanteil Ihrer Rate als auch die insgesamt über die Laufzeit gezahlten Zinsen senkt." },
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
      ],
    },
    fr: {
      title: "Calculatrice d'Intérêts Composés",
      intro: "Saisissez un capital initial, un taux d'intérêt, une fréquence de capitalisation et une durée pour voir combien votre argent pourrait rapporter.",
      description: "Calculez comment une somme d'argent croît dans le temps grâce aux intérêts composés.",
      faq: [
        { q: "Quelle est la formule des intérêts composés ?", a: "A = P(1 + r/n)^(nt) - où P est le capital, r le taux annuel, n le nombre de capitalisations par an et t la durée en années." },
        { q: "Comment la fréquence de capitalisation affecte-t-elle la croissance ?", a: "Une capitalisation plus fréquente (quotidienne plutôt qu'annuelle) produit des rendements légèrement supérieurs à taux nominal égal, car les intérêts commencent à produire des intérêts plus tôt - même si la différence reste généralement faible aux taux d'épargne courants." },
      ],
    },
    de: {
      title: "Zinseszinsrechner",
      intro: "Geben Sie einen Anfangsbetrag, einen Zinssatz, die Zinsperiode und einen Zeitraum ein, um zu sehen, wie stark Ihr Geld wachsen könnte.",
      description: "Berechnen Sie, wie eine Geldsumme durch Zinseszins über die Zeit wächst.",
      faq: [
        { q: "Wie lautet die Formel für Zinseszins?", a: "A = P(1 + r/n)^(nt) - wobei P das Kapital, r der Jahreszins, n die Anzahl der Zinsperioden pro Jahr und t die Zeit in Jahren ist." },
        { q: "Wie wirkt sich die Zinsperiode auf das Wachstum aus?", a: "Häufigere Verzinsung (täglich statt jährlich) führt bei gleichem Nominalzins zu etwas höheren Erträgen, da Zinsen früher beginnen, selbst Zinsen zu erwirtschaften - der Unterschied ist bei üblichen Sparzinsen aber meist gering." },
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
      ],
    },
    fr: {
      title: "Calculatrice de Béton",
      intro: "Saisissez les dimensions de la dalle pour estimer la quantité de béton prêt à l'emploi ou le nombre de sacs nécessaires, avec une marge de perte incluse.",
      description: "Estimez le volume en mètres cubes et le nombre de sacs pour une dalle de béton.",
      faq: [
        { q: "De combien de béton ai-je besoin pour une dalle de 3x3 m ?", a: "Sur une épaisseur de 10 cm, une dalle de 3×3 m nécessite environ 0,9 m³ avant marge de perte - soit environ 36 sacs de mélange de 35 kg." },
        { q: "Pourquoi ajouter une marge de perte ?", a: "Un sous-sol irrégulier, les déversements et le surcreusement consomment généralement 5 à 10 % de matériau en plus que ce que suggère le calcul exact." },
      ],
    },
    de: {
      title: "Betonrechner",
      intro: "Geben Sie die Plattenmaße ein, um zu schätzen, wie viel Fertigbeton oder wie viele Säcke Sie benötigen, inklusive eingebautem Verschnittzuschlag.",
      description: "Schätzen Sie Kubikmeter und Sackzahl für eine Betonplatte.",
      faq: [
        { q: "Wie viel Beton brauche ich für eine 3x3-m-Platte?", a: "Bei 10 cm Dicke benötigt eine 3×3-m-Platte vor dem Verschnittzuschlag etwa 0,9 m³ - rund 36 Säcke einer 35-kg-Mischung." },
        { q: "Warum einen Verschnittzuschlag hinzufügen?", a: "Unebener Untergrund, Verschütten und Übererdaushub verbrauchen typischerweise 5-10% mehr Material, als die reine Rechnung nahelegt." },
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
      ],
    },
    fr: {
      title: "Calculatrice de Revêtement de Sol",
      intro: "Saisissez la surface de votre pièce, la couverture par boîte et une marge de perte pour estimer le nombre de boîtes de revêtement à acheter.",
      description: "Estimez le nombre de boîtes de revêtement de sol nécessaires pour une pièce.",
      faq: [
        { q: "Combien de boîtes de revêtement me faut-il pour 25 m² ?", a: "Avec 2 m² par boîte et une marge de perte de 10 %, 25 m² nécessitent environ 14 boîtes." },
        { q: "Pourquoi prévoir du revêtement supplémentaire pour la perte ?", a: "Les découpes autour des portes, des placards et le raccord des motifs consomment du matériau supplémentaire - une marge de 10 à 15 % évite de manquer de matériau en cours de projet." },
      ],
    },
    de: {
      title: "Bodenbelagsrechner",
      intro: "Geben Sie Ihre Raumfläche, die Deckung pro Karton und einen Verschnittzuschlag ein, um zu schätzen, wie viele Kartons Bodenbelag Sie kaufen sollten.",
      description: "Schätzen Sie, wie viele Kartons Bodenbelag Sie für einen Raum benötigen.",
      faq: [
        { q: "Wie viele Kartons Bodenbelag brauche ich für 25 m²?", a: "Bei 2 m² pro Karton und 10% Verschnittzuschlag benötigen 25 m² etwa 14 Kartons." },
        { q: "Warum brauche ich zusätzlichen Bodenbelag für Verschnitt?", a: "Zuschnitte an Türen, Schränken und der Musterausrichtung verbrauchen zusätzliches Material - ein Zuschlag von 10-15% verhindert, dass Ihnen mitten im Projekt das Material ausgeht." },
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
      ],
    },
    fr: {
      title: "Calculatrice de Calories",
      intro: "Saisissez votre âge, sexe, taille, poids et niveau d'activité pour estimer vos besoins caloriques quotidiens pour maintenir, perdre ou prendre du poids.",
      description: "Calculez vos besoins caloriques quotidiens pour maintenir, perdre ou prendre du poids.",
      faq: [
        { q: "Combien de calories me faut-il pour maintenir mon poids ?", a: "Cela dépend de votre métabolisme de base et de votre niveau d'activité - pour un homme de 30 ans, 1,78 m, 82 kg, à activité modérée, le maintien se situe autour de 2 763 calories par jour." },
        { q: "Combien de calories dois-je réduire pour perdre du poids ?", a: "Un déficit d'environ 500 calories par jour sous le niveau de maintien est un objectif courant pour perdre environ 0,45 kg par semaine, puisque 0,45 kg de graisse corporelle équivaut à environ 3 500 calories." },
      ],
    },
    de: {
      title: "Kalorienrechner",
      intro: "Geben Sie Alter, Geschlecht, Größe, Gewicht und Aktivitätslevel ein, um Ihren täglichen Kalorienbedarf zum Halten, Abnehmen oder Zunehmen zu schätzen.",
      description: "Berechnen Sie Ihren täglichen Kalorienbedarf zum Halten, Abnehmen oder Zunehmen des Gewichts.",
      faq: [
        { q: "Wie viele Kalorien brauche ich, um mein Gewicht zu halten?", a: "Das hängt von Ihrem Grundumsatz und Aktivitätslevel ab - für einen 30-jährigen Mann, 1,78 m, 82 kg, mit moderater Aktivität liegt der Erhaltungsbedarf bei etwa 2.763 Kalorien pro Tag." },
        { q: "Wie viele Kalorien sollte ich zum Abnehmen einsparen?", a: "Ein Defizit von etwa 500 Kalorien pro Tag unter dem Erhaltungsbedarf ist ein gängiges Ziel für rund 0,45 kg Gewichtsverlust pro Woche, da 0,45 kg Körperfett etwa 3.500 Kalorien entsprechen." },
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
      ],
    },
    fr: {
      title: "Calculatrice d'IMC",
      intro: "Saisissez votre taille et votre poids pour calculer votre IMC, une mesure de dépistage générale (et non un diagnostic).",
      description: "Calculez votre indice de masse corporelle à partir de la taille et du poids.",
      faq: [
        { q: "L'IMC est-il précis pour tout le monde ?", a: "Non - l'IMC ne distingue pas la masse musculaire de la masse grasse et peut être trompeur pour les athlètes, les personnes âgées et certaines morphologies. C'est un outil de dépistage, pas un diagnostic." },
        { q: "Quelle est la plage d'IMC considérée comme saine ?", a: "18,5-24,9 est généralement classé comme la plage saine, moins de 18,5 comme insuffisance pondérale, 25-29,9 comme surpoids, et 30+ comme la plage d'obésité - mais ces seuils sont des moyennes de population, pas des verdicts de santé individuels." },
      ],
    },
    de: {
      title: "BMI-Rechner",
      intro: "Geben Sie Größe und Gewicht ein, um den BMI zu berechnen - ein allgemeines Screening-Maß (keine Diagnose).",
      description: "Berechnen Sie Ihren Body-Mass-Index aus Größe und Gewicht.",
      faq: [
        { q: "Ist der BMI für jeden genau?", a: "Nein - der BMI unterscheidet nicht zwischen Muskel- und Fettmasse und kann bei Sportlern, älteren Erwachsenen und bestimmten Körpertypen irreführend sein. Er ist ein Screening-Instrument, keine Diagnose." },
        { q: "Was gilt als gesunder BMI-Bereich?", a: "18,5-24,9 gilt allgemein als gesunder Bereich, unter 18,5 als Untergewicht, 25-29,9 als Übergewicht und 30+ als Adipositas-Bereich - diese Grenzwerte sind jedoch Bevölkerungsdurchschnitte, keine individuellen Gesundheitsurteile." },
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
      ],
    },
    fr: {
      title: "Calculatrice de Métabolisme de Base",
      intro: "Saisissez votre âge, sexe, taille et poids pour estimer votre métabolisme de base à l'aide de la formule de Mifflin-St Jeor.",
      description: "Calculez votre métabolisme de base - les calories brûlées par votre corps au repos.",
      faq: [
        { q: "Qu'est-ce que le métabolisme de base ?", a: "Le métabolisme de base est le nombre de calories que votre corps brûle au repos complet, uniquement pour maintenir des fonctions vitales comme la respiration et la circulation - il n'inclut aucune activité." },
        { q: "Quelle est la précision de la formule de Mifflin-St Jeor ?", a: "Elle est considérée comme l'une des formules de métabolisme de base les plus précises pour la population générale, généralement à environ 10 % près des valeurs mesurées, bien que le métabolisme individuel varie selon la masse musculaire et d'autres facteurs." },
      ],
    },
    de: {
      title: "Grundumsatzrechner",
      intro: "Geben Sie Alter, Geschlecht, Größe und Gewicht ein, um Ihren Grundumsatz mit der Mifflin-St-Jeor-Formel zu schätzen.",
      description: "Berechnen Sie Ihren Grundumsatz - die Kalorien, die Ihr Körper in Ruhe verbrennt.",
      faq: [
        { q: "Was ist der Grundumsatz?", a: "Der Grundumsatz ist die Anzahl an Kalorien, die Ihr Körper in völliger Ruhe verbrennt, nur um lebenswichtige Funktionen wie Atmung und Kreislauf aufrechtzuerhalten - Aktivität ist nicht eingerechnet." },
        { q: "Wie genau ist die Mifflin-St-Jeor-Formel?", a: "Sie gilt als eine der genaueren Grundumsatzformeln für die Allgemeinbevölkerung, meist innerhalb von etwa 10% der gemessenen Werte, wobei der individuelle Stoffwechsel je nach Muskelmasse und anderen Faktoren variiert." },
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
      ],
    },
    fr: {
      title: "Calculatrice d'Âge",
      intro: "Saisissez une date de naissance pour calculer l'âge exact à ce jour, au jour près.",
      description: "Calculez l'âge exact en années, mois et jours.",
      faq: [
        { q: "Comment l'âge exact est-il calculé ?", a: "En comptant les années complètes, puis les mois restants, puis les jours restants entre la date de naissance et aujourd'hui - pas simplement en soustrayant l'année de naissance de l'année en cours." },
        { q: "Cela tient-il compte des années bissextiles ?", a: "Oui - le calcul se fait directement à partir des dates du calendrier plutôt qu'en supposant une année fixe de 365 jours, les années bissextiles sont donc gérées correctement sans ajustement supplémentaire." },
      ],
    },
    de: {
      title: "Altersrechner",
      intro: "Geben Sie ein Geburtsdatum ein, um das genaue Alter bis heute, tagesgenau, zu berechnen.",
      description: "Berechnen Sie das genaue Alter in Jahren, Monaten und Tagen.",
      faq: [
        { q: "Wie wird das genaue Alter berechnet?", a: "Durch Zählen der vollen Jahre, dann der verbleibenden Monate, dann der verbleibenden Tage zwischen Geburtsdatum und heute - nicht durch einfaches Subtrahieren des Geburtsjahrs vom aktuellen Jahr." },
        { q: "Werden Schaltjahre berücksichtigt?", a: "Ja - die Berechnung erfolgt direkt anhand von Kalenderdaten statt eines festen 365-Tage-Jahres, sodass Schaltjahre korrekt ohne zusätzliche Anpassung berücksichtigt werden." },
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
      ],
    },
    fr: {
      title: "Calculatrice de Jours Restants",
      intro: "Choisissez une date pour voir exactement combien de jours, semaines et mois il reste avant son arrivée.",
      description: "Découvrez combien de jours il reste avant n'importe quelle date future.",
      faq: [
        { q: "Comment le nombre de « jours restants » est-il calculé ?", a: "C'est le nombre de jours calendaires entre aujourd'hui et la date choisie, en comptant à partir de minuit." },
        { q: "Cela compte-t-il les week-ends et jours fériés ?", a: "Oui - ce calcul compte chaque jour calendaire, y compris les week-ends et jours fériés. Si vous avez besoin d'un décompte en jours ouvrés uniquement (hors week-ends), utilisez la Calculatrice de Jours Ouvrés." },
      ],
    },
    de: {
      title: "Tage-bis-Rechner",
      intro: "Wählen Sie ein Datum, um genau zu sehen, wie viele Tage, Wochen und Monate bis dahin verbleiben.",
      description: "Finden Sie heraus, wie viele Tage bis zu einem beliebigen zukünftigen Datum verbleiben.",
      faq: [
        { q: "Wie werden die „verbleibenden Tage“ berechnet?", a: "Es ist die Anzahl der Kalendertage zwischen heute und dem gewählten Datum, gezählt ab Mitternacht." },
        { q: "Werden Wochenenden und Feiertage mitgezählt?", a: "Ja - hier werden alle Kalendertage gezählt, einschließlich Wochenenden und Feiertagen. Falls Sie nur Werktage benötigen (ohne Wochenenden), nutzen Sie stattdessen den Werktage-Rechner." },
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
      ],
    },
    fr: {
      title: "Convertisseur CM en Pouces",
      intro: "Saisissez une valeur et choisissez les unités pour convertir entre les mesures de longueur courantes.",
      description: "Convertissez entre centimètres, pouces, pieds et mètres.",
      faq: [
        { q: "Combien de pouces fait un centimètre ?", a: "1 centimètre équivaut à environ 0,3937 pouce. Pour convertir des cm en pouces, divisez par 2,54." },
        { q: "Cette conversion est-elle exacte ou arrondie ?", a: "Le facteur de conversion sous-jacent (1 pouce = 2,54 cm) est exact par définition internationale - tout arrondi que vous voyez correspond simplement au résultat affiché, ajusté à un nombre lisible de décimales." },
      ],
    },
    de: {
      title: "CM-zu-Zoll-Umrechner",
      intro: "Geben Sie einen Wert ein und wählen Sie die Einheiten, um zwischen gängigen Längenmaßen umzurechnen.",
      description: "Rechnen Sie zwischen Zentimetern, Zoll, Fuß und Metern um.",
      faq: [
        { q: "Wie viele Zoll hat ein Zentimeter?", a: "1 Zentimeter entspricht etwa 0,3937 Zoll. Um cm in Zoll umzurechnen, teilen Sie durch 2,54." },
        { q: "Ist diese Umrechnung exakt oder gerundet?", a: "Der zugrunde liegende Umrechnungsfaktor (1 Zoll = 2,54 cm) ist per internationaler Definition exakt - jede sichtbare Rundung betrifft nur die Anzeige auf eine lesbare Anzahl Dezimalstellen." },
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
      ],
    },
    fr: {
      title: "Convertisseur de Température",
      intro: "Saisissez une température et choisissez une unité de départ pour convertir entre Fahrenheit, Celsius et Kelvin.",
      description: "Convertissez entre Fahrenheit, Celsius et Kelvin.",
      faq: [
        { q: "Comment convertir des Fahrenheit en Celsius ?", a: "Soustrayez 32, puis multipliez par 5/9. 98,6°F : (98,6 − 32) × 5/9 = 37°C - température corporelle humaine normale." },
        { q: "Pourquoi la conversion de température nécessite-t-elle un décalage et pas seulement une multiplication ?", a: "Fahrenheit et Celsius ont des points zéro différents (l'eau gèle à 0°C mais à 32°F), donc la conversion nécessite d'abord de décaler l'échelle, contrairement aux conversions de longueur ou de poids qui n'ont besoin que d'un multiplicateur." },
      ],
    },
    de: {
      title: "Temperaturumrechner",
      intro: "Geben Sie eine Temperatur ein und wählen Sie eine Ausgangseinheit, um zwischen Fahrenheit, Celsius und Kelvin umzurechnen.",
      description: "Rechnen Sie zwischen Fahrenheit, Celsius und Kelvin um.",
      faq: [
        { q: "Wie rechne ich Fahrenheit in Celsius um?", a: "Ziehen Sie 32 ab und multiplizieren Sie dann mit 5/9. 98,6°F: (98,6 − 32) × 5/9 = 37°C - normale menschliche Körpertemperatur." },
        { q: "Warum braucht die Temperaturumrechnung eine Verschiebung statt nur eine Multiplikation?", a: "Fahrenheit und Celsius haben unterschiedliche Nullpunkte (gefrierendes Wasser liegt bei 0°C, aber 32°F), daher muss die Skala zuerst verschoben werden - anders als bei Längen- oder Gewichtsumrechnungen, die nur einen Multiplikator benötigen." },
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
      ],
    },
    fr: {
      title: "Compteur de Mots",
      intro: "Collez ou saisissez du texte ci-dessous pour compter instantanément les mots, les caractères et les phrases.",
      description: "Comptez les mots, les caractères et les phrases de votre texte.",
      faq: [
        { q: "Ce compteur de mots enregistre-t-il mon texte ?", a: "Non - le comptage s'effectue entièrement dans votre navigateur et rien n'est envoyé ni stocké." },
        { q: "Compte-t-il les mots de la même façon que Microsoft Word ?", a: "Très proche, mais pas toujours identique - ce compteur se base sur les espaces, comme la plupart des traitements de texte, mais des cas particuliers comme les mots à trait d'union ou les nombres peuvent être comptés légèrement différemment d'un outil à l'autre." },
      ],
    },
    de: {
      title: "Wortzähler",
      intro: "Fügen Sie unten Text ein oder tippen Sie ihn, um sofort Wörter, Zeichen und Sätze zu zählen.",
      description: "Zählen Sie Wörter, Zeichen und Sätze in Ihrem Text.",
      faq: [
        { q: "Speichert dieser Wortzähler meinen Text?", a: "Nein - die Zählung läuft vollständig in Ihrem Browser, es wird nichts gesendet oder gespeichert." },
        { q: "Zählt er Wörter genauso wie Microsoft Word?", a: "Sehr ähnlich, aber nicht immer identisch - dieser Zähler trennt anhand von Leerzeichen, wie es die meisten Textverarbeitungen tun, aber Grenzfälle wie Bindestrich-Wörter oder Zahlen können je nach Tool leicht unterschiedlich gezählt werden." },
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
      ],
    },
    fr: {
      title: "Convertisseur de Casse",
      intro: "Collez votre texte et choisissez une casse pour le convertir en MAJUSCULES, minuscules, Casse de Titre ou Casse de phrase.",
      description: "Convertissez du texte entre majuscules, minuscules, casse de titre et casse de phrase.",
      faq: [
        { q: "Quelle est la différence entre la casse de titre et la casse de phrase ?", a: "La casse de titre met une majuscule à la première lettre de chaque mot principal (« Bonjour Le Monde »), tandis que la casse de phrase ne met une majuscule qu'à la première lettre du texte entier (« Bonjour le monde »)." },
        { q: "Ce convertisseur enregistre-t-il mon texte ?", a: "Non - la conversion s'effectue entièrement dans votre navigateur et rien n'est envoyé ni stocké." },
      ],
    },
    de: {
      title: "Groß-/Kleinschreibungs-Konverter",
      intro: "Fügen Sie Ihren Text ein und wählen Sie eine Schreibweise: GROSSBUCHSTABEN, Kleinbuchstaben, Titelschreibweise oder Satzschreibweise.",
      description: "Wandeln Sie Text zwischen Groß-, Klein-, Titel- und Satzschreibweise um.",
      faq: [
        { q: "Was ist der Unterschied zwischen Titelschreibweise und Satzschreibweise?", a: "Bei der Titelschreibweise wird der erste Buchstabe jedes wichtigen Wortes großgeschrieben („Hallo Welt Beispiel“), bei der Satzschreibweise nur der erste Buchstabe des gesamten Textes („Hallo welt beispiel“)." },
        { q: "Speichert dieser Konverter meinen Text?", a: "Nein - die Umwandlung läuft vollständig in Ihrem Browser, es wird nichts gesendet oder gespeichert." },
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
      ],
    },
    fr: {
      title: "Calculatrice d'Âge du Chien",
      intro: "Le vieillissement des chiens varie selon la taille de la race - saisissez l'âge et la taille de votre chien pour obtenir une estimation en années humaines plus précise que l'ancienne règle du « multiplier par 7 ».",
      description: "Convertissez l'âge de votre chien en années humaines selon sa taille.",
      faq: [
        { q: "La règle « une année de chien équivaut à sept années humaines » est-elle exacte ?", a: "Non - cette vieille règle est un mythe approximatif. Les chiens vieillissent plus vite durant leurs deux premières années, et les grandes races vieillissent plus vite dans les années suivantes que les petites races." },
        { q: "Pourquoi les grandes races de chiens vieillissent-elles plus vite que les petites ?", a: "Les grandes et très grandes races grandissent plus vite et atteignent leur maturité physique plus tôt, ce qui est lié à des durées de vie plus courtes et un vieillissement plus rapide durant leurs années intermédiaires et seniors - l'inverse du schéma observé chez la plupart des autres mammifères." },
      ],
    },
    de: {
      title: "Hundealter-Rechner",
      intro: "Das Altern von Hunden variiert je nach Rassegröße - geben Sie Alter und Größe Ihres Hundes ein, um eine genauere Schätzung in Menschenjahren zu erhalten als mit der alten „Mal 7“-Regel.",
      description: "Rechnen Sie das Alter Ihres Hundes größenabhängig in Menschenjahre um.",
      faq: [
        { q: "Stimmt die Regel „ein Hundejahr entspricht sieben Menschenjahren“?", a: "Nein - diese alte Regel ist ein grober Mythos. Hunde altern in den ersten zwei Jahren schneller, und große Rassen altern in späteren Jahren schneller als kleine Rassen." },
        { q: "Warum altern große Hunderassen schneller als kleine?", a: "Große und Riesenrassen wachsen schneller und erreichen die körperliche Reife früher, was mit kürzeren Lebenserwartungen und schnellerem Altern in den mittleren und höheren Jahren verbunden ist - das Gegenteil des Musters bei den meisten anderen Säugetieren." },
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
      ],
    },
    fr: {
      title: "Calculatrice d'Âge du Chat",
      intro: "Saisissez l'âge de votre chat pour estimer l'âge humain équivalent, selon les schémas de vieillissement félin typiques.",
      description: "Convertissez l'âge de votre chat en années humaines.",
      faq: [
        { q: "Les chats vieillissent-ils tous de la même façon, quelle que soit leur race ?", a: "Les schémas de vieillissement sont assez homogènes chez la plupart des races de chats, contrairement aux chiens, où la taille entraîne de grandes différences de vieillissement." },
        { q: "Le mode de vie intérieur ou extérieur affecte-t-il le calcul de l'âge d'un chat ?", a: "Cette calculatrice n'en tient pas compte - c'est une estimation générale basée sur un développement typique. En pratique, les chats d'intérieur ont tendance à vivre plus longtemps que les chats d'extérieur en raison d'une moindre exposition aux blessures et aux maladies, mais cela affecte l'espérance de vie, pas le calcul d'équivalence d'âge lui-même." },
      ],
    },
    de: {
      title: "Katzenalter-Rechner",
      intro: "Geben Sie das Alter Ihrer Katze ein, um das entsprechende Menschenalter anhand typischer Alterungsmuster von Katzen zu schätzen.",
      description: "Rechnen Sie das Alter Ihrer Katze in Menschenjahre um.",
      faq: [
        { q: "Altern alle Katzen unabhängig von der Rasse gleich?", a: "Die Alterungsmuster sind bei den meisten Katzenrassen recht einheitlich, anders als bei Hunden, wo die Größe große Alterungsunterschiede verursacht." },
        { q: "Beeinflusst Wohnen drinnen oder draußen die Altersberechnung einer Katze?", a: "Dieser Rechner berücksichtigt das nicht - es handelt sich um eine allgemeine Schätzung basierend auf typischer Entwicklung. In der Praxis leben Wohnungskatzen aufgrund geringerer Verletzungs- und Krankheitsgefahr tendenziell länger als Freigänger, aber das beeinflusst die Lebenserwartung, nicht die Alters-Äquivalenzrechnung selbst." },
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
      title: "About Calquary",
      lede: "A reference index of fast, accurate calculators - organized the way a good library organizes books, not the way most calculator sites throw everything on one page.",
      body: "Calquary is a collection of single-purpose calculators - for math, money, home projects, health, dates, conversions, everyday text tasks, and pets - built to answer one question well rather than bury it in ads and unrelated content. Every tool runs entirely in your browser: enter your numbers, get your answer, nothing is sent to a server. Calculators are grouped into 8 categories, and the catalog keeps growing - every tool is reviewed for a working formula and a plain-language explanation before it's added, so the answer you get is one you can trust. For decisions with real financial, structural, or medical stakes, confirm with a qualified professional.",
    },
    es: {
      title: "Acerca de Calquary",
      lede: "Un índice de referencia de calculadoras rápidas y precisas - organizado como una buena biblioteca organiza los libros, no como la mayoría de los sitios de calculadoras que amontonan todo en una sola página.",
      body: "Calquary es una colección de calculadoras de propósito único - para matemáticas, dinero, proyectos del hogar, salud, fechas, conversiones, tareas cotidianas de texto y mascotas - creadas para responder bien una pregunta en lugar de enterrarla entre anuncios y contenido no relacionado. Cada herramienta funciona enteramente en tu navegador: introduces tus números, obtienes tu respuesta, nada se envía a un servidor. Las calculadoras se agrupan en 8 categorías, y el catálogo sigue creciendo - cada herramienta se revisa para tener una fórmula funcional y una explicación en lenguaje claro antes de añadirse, para que la respuesta que obtengas sea confiable. Para decisiones con implicaciones financieras, estructurales o médicas reales, consulta con un profesional cualificado.",
    },
    fr: {
      title: "À propos de Calquary",
      lede: "Un index de référence de calculatrices rapides et précises - organisé comme une bonne bibliothèque organise les livres, et non comme la plupart des sites de calculatrices qui entassent tout sur une seule page.",
      body: "Calquary est une collection de calculatrices à usage unique - pour les mathématiques, l'argent, les travaux, la santé, les dates, les conversions, les tâches de texte courantes et les animaux - conçues pour répondre correctement à une seule question plutôt que de la noyer sous des publicités et des contenus sans rapport. Chaque outil fonctionne entièrement dans votre navigateur : vous saisissez vos chiffres, vous obtenez votre réponse, rien n'est envoyé à un serveur. Les calculatrices sont regroupées en 8 catégories, et le catalogue continue de s'agrandir - chaque outil est vérifié pour disposer d'une formule fonctionnelle et d'une explication en langage clair avant d'être ajouté, afin que la réponse obtenue soit fiable. Pour toute décision ayant de réelles conséquences financières, structurelles ou médicales, consultez un professionnel qualifié.",
    },
    de: {
      title: "Über Calquary",
      lede: "Ein Referenzindex schneller, präziser Rechner - organisiert wie eine gute Bibliothek ihre Bücher ordnet, nicht wie die meisten Rechner-Websites, die alles auf eine Seite werfen.",
      body: "Calquary ist eine Sammlung von Einzelzweck-Rechnern - für Mathematik, Geld, Hausprojekte, Gesundheit, Termine, Umrechnungen, alltägliche Textaufgaben und Haustiere - entwickelt, um eine Frage gut zu beantworten, statt sie zwischen Anzeigen und themenfremden Inhalten zu vergraben. Jedes Tool läuft vollständig in Ihrem Browser: Zahlen eingeben, Antwort erhalten, nichts wird an einen Server gesendet. Die Rechner sind in 8 Kategorien gruppiert, und der Katalog wächst stetig weiter - jedes Tool wird auf eine funktionierende Formel und eine verständliche Erklärung geprüft, bevor es hinzugefügt wird, damit Sie sich auf die Antwort verlassen können. Bei Entscheidungen mit echten finanziellen, baulichen oder medizinischen Konsequenzen wenden Sie sich bitte an eine qualifizierte Fachperson.",
    },
  },
  contact: {
    en: {
      title: "Get in touch",
      body: "Found a bug, have a calculator idea, or have a question about how we handle data? Email us at hello@calquary.com - we read every message, though replies may take a few days.",
    },
    es: {
      title: "Ponte en contacto",
      body: "¿Encontraste un error, tienes una idea para una calculadora o una pregunta sobre cómo manejamos los datos? Escríbenos a hello@calquary.com - leemos todos los mensajes, aunque las respuestas pueden tardar unos días.",
    },
    fr: {
      title: "Contactez-nous",
      body: "Vous avez trouvé un bug, une idée de calculatrice, ou une question sur la gestion de vos données ? Écrivez-nous à hello@calquary.com - nous lisons chaque message, même si les réponses peuvent prendre quelques jours.",
    },
    de: {
      title: "Kontaktieren Sie uns",
      body: "Einen Fehler gefunden, eine Idee für einen Rechner, oder eine Frage zu unserem Umgang mit Daten? Schreiben Sie uns an hello@calquary.com - wir lesen jede Nachricht, auch wenn Antworten ein paar Tage dauern können.",
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
  },

  privacy: {
    en: {
      title: "Privacy Policy",
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
      title: "Política de Privacidad",
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
      title: "Politique de Confidentialité",
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
      title: "Datenschutzerklärung",
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
  },

  terms: {
    en: {
      title: "Terms of Service",
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
      title: "Términos de Servicio",
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
      title: "Conditions d'Utilisation",
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
      title: "Nutzungsbedingungen",
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
