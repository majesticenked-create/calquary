/* ============================================================
   Calquary — Calculator Config Schema
   Each category has a short "code" (card-catalog label).
   Each calculator config drives the tool page, category page,
   and homepage cards from ONE source of truth.
   ============================================================ */

const CATEGORIES = [
  { id: "math", code: "M", name: "Math", description: "Percentages, ratios, and everyday arithmetic." },
  { id: "finance", code: "F", name: "Finance", description: "Loans, tipping, and everyday money math." },
  { id: "construction", code: "C", name: "Construction & Home", description: "Materials, coverage, and project estimates." },
  { id: "health", code: "H", name: "Health & Fitness", description: "Body metrics, pace, and training numbers." },
  { id: "datetime", code: "D", name: "Date & Time", description: "Countdowns, durations, and age in days." },
  { id: "conversions", code: "V", name: "Everyday Conversions", description: "Units, measurements, and kitchen swaps." },
  { id: "text", code: "T", name: "Text & Digital", description: "Word counts and generators for everyday tasks." },
  { id: "pets", code: "P", name: "Pet & Lifestyle", description: "Age charts and everyday pet math." },
];

/* Each field: { id, label, type: number|select|date|text|textarea|checkbox-group,
   unit (optional note), default, options (for select/checkbox-group), min, max, step } */

const CALCULATORS = [
  // ---------------- MATH ----------------
  {
    id: "percentage-calculator",
    category: "math",
    title: "Percentage Calculator",
    keyword: "percentage calculator",
    description: "Find what X percent of a number is, in one step.",
    intro: "Enter a percentage and a number to find the resulting value — useful for tips, discounts, grades, and quick everyday math.",
    fields: [
      { id: "percent", label: "Percent", type: "number", unit: "%", default: 20, step: 0.1 },
      { id: "base", label: "Of this number", type: "number", default: 150, step: 0.01 },
    ],
    compute: (v) => {
      const result = (v.percent / 100) * v.base;
      return {
        primary: { label: `${v.percent}% of ${v.base}`, value: round(result, 2) },
        secondary: [
          { l: "As a decimal", v: round(v.percent / 100, 4) },
          { l: "Remaining amount", v: round(v.base - result, 2) },
        ],
      };
    },
    faq: [
      { q: "How do I calculate a percentage of a number by hand?", a: "Divide the percent by 100, then multiply by the number. For 20% of 150: 0.20 × 150 = 30." },
      { q: "How do I find what percent one number is of another?", a: "Divide the part by the whole, then multiply by 100. For example, 30 is what percent of 150? 30 ÷ 150 × 100 = 20%." },
    ],
    related: ["percentage-change-calculator", "tip-calculator"],
  },
  {
    id: "percentage-change-calculator",
    category: "math",
    title: "Percentage Change Calculator",
    keyword: "percentage change calculator",
    description: "Calculate percentage increase or decrease between two values.",
    intro: "Enter a starting and ending value to see the percentage increase or decrease between them.",
    fields: [
      { id: "from", label: "Starting value", type: "number", default: 80, step: 0.01 },
      { id: "to", label: "Ending value", type: "number", default: 100, step: 0.01 },
    ],
    compute: (v) => {
      const change = ((v.to - v.from) / Math.abs(v.from)) * 100;
      const direction = change >= 0 ? "increase" : "decrease";
      return {
        primary: { label: `Percentage ${direction}`, value: `${round(Math.abs(change), 2)}%` },
        secondary: [
          { l: "Absolute change", v: round(v.to - v.from, 2) },
        ],
        note: change >= 0 ? "This is a percentage increase." : "This is a percentage decrease.",
      };
    },
    faq: [
      { q: "What's the formula for percentage change?", a: "(New value − Old value) ÷ Old value × 100. A positive result is an increase; a negative result is a decrease." },
    ],
    related: ["percentage-calculator", "loan-calculator"],
  },

  // ---------------- FINANCE ----------------
  {
    id: "loan-calculator",
    category: "finance",
    title: "Loan Payment Calculator",
    keyword: "loan calculator",
    description: "Estimate your monthly payment on a fixed-rate loan.",
    intro: "Enter the loan amount, annual interest rate, and term to estimate your fixed monthly payment.",
    fields: [
      { id: "principal", label: "Loan amount", type: "number", unit: "$", default: 20000, step: 100 },
      { id: "rate", label: "Annual interest rate", type: "number", unit: "%", default: 6.5, step: 0.01 },
      { id: "years", label: "Loan term", type: "number", unit: "years", default: 5, step: 1 },
    ],
    compute: (v) => {
      const monthlyRate = v.rate / 100 / 12;
      const n = v.years * 12;
      const payment = monthlyRate === 0
        ? v.principal / n
        : (v.principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      const totalPaid = payment * n;
      return {
        primary: { label: "Estimated monthly payment", value: `$${round(payment, 2).toLocaleString()}` },
        secondary: [
          { l: "Total paid over term", v: `$${round(totalPaid, 0).toLocaleString()}` },
          { l: "Total interest", v: `$${round(totalPaid - v.principal, 0).toLocaleString()}` },
        ],
        note: "This is an estimate. Actual payments may vary with fees, taxes, and lender terms.",
      };
    },
    faq: [
      { q: "How is a loan payment calculated?", a: "Fixed-rate loans use an amortization formula based on the principal, the periodic interest rate, and the number of payments, so each payment is the same size but the interest/principal split changes over time." },
    ],
    related: ["percentage-calculator", "tip-calculator"],
  },
  {
    id: "tip-calculator",
    category: "finance",
    title: "Tip Calculator",
    keyword: "tip calculator",
    description: "Split a bill and calculate the tip in seconds.",
    intro: "Enter your bill total, choose a tip percentage, and split it across any number of people.",
    fields: [
      { id: "bill", label: "Bill total", type: "number", unit: "$", default: 64.5, step: 0.01 },
      { id: "tipPercent", label: "Tip percent", type: "number", unit: "%", default: 18, step: 1 },
      { id: "people", label: "Split between", type: "number", unit: "people", default: 2, step: 1, min: 1 },
    ],
    compute: (v) => {
      const tip = v.bill * (v.tipPercent / 100);
      const total = v.bill + tip;
      return {
        primary: { label: "Tip amount", value: `$${round(tip, 2)}` },
        secondary: [
          { l: "Total with tip", v: `$${round(total, 2)}` },
          { l: "Per person", v: `$${round(total / v.people, 2)}` },
        ],
      };
    },
    faq: [
      { q: "What's a standard tip percentage?", a: "In the US, 15–20% is typical for sit-down service; some people tip more for excellent service." },
    ],
    related: ["loan-calculator", "percentage-calculator"],
  },

  // ---------------- CONSTRUCTION & HOME ----------------
  {
    id: "concrete-calculator",
    category: "construction",
    title: "Concrete Calculator",
    keyword: "concrete calculator",
    description: "Estimate cubic yards and bag count for a concrete slab.",
    intro: "Enter the slab dimensions to estimate how much ready-mix concrete or how many bags you'll need, with a waste allowance built in.",
    fields: [
      { id: "length", label: "Length", type: "number", unit: "ft", default: 10, step: 0.1 },
      { id: "width", label: "Width", type: "number", unit: "ft", default: 10, step: 0.1 },
      { id: "thickness", label: "Thickness", type: "number", unit: "in", default: 4, step: 0.5 },
      { id: "waste", label: "Waste allowance", type: "number", unit: "%", default: 10, step: 1 },
    ],
    compute: (v) => {
      const cubicFeet = v.length * v.width * (v.thickness / 12);
      const cubicYards = (cubicFeet / 27) * (1 + v.waste / 100);
      const bags80lb = Math.ceil(cubicYards / 0.017); // ~0.017 cu yd per 80lb bag
      return {
        primary: { label: "Concrete needed", value: `${round(cubicYards, 2)} cu yd` },
        secondary: [
          { l: "80 lb bags (approx.)", v: bags80lb },
          { l: "Cubic feet", v: round(cubicFeet, 1) },
        ],
        note: "Includes your waste allowance. Order slightly more for irregular shapes or ready-mix truck minimums.",
      };
    },
    faq: [
      { q: "How much concrete do I need for a 10x10 slab?", a: "At 4 inches thick, a 10×10 ft slab needs about 1.23 cubic yards before waste allowance — roughly 74 bags of 80 lb mix." },
      { q: "Why add a waste allowance?", a: "Uneven subgrade, spillage, and over-excavation typically use 5–10% more material than the exact math suggests." },
    ],
    related: ["paint-calculator", "gravel-calculator", "mulch-calculator", "percentage-calculator"],
  },
  {
    id: "paint-calculator",
    category: "construction",
    title: "Paint Calculator",
    keyword: "paint calculator",
    description: "Estimate how many gallons of paint you need for a room.",
    intro: "Enter your wall area and number of coats to estimate gallons of paint needed, based on standard coverage rates.",
    fields: [
      { id: "wallArea", label: "Wall area", type: "number", unit: "sq ft", default: 400, step: 1 },
      { id: "coats", label: "Number of coats", type: "number", default: 2, step: 1, min: 1 },
      { id: "coverage", label: "Coverage per gallon", type: "number", unit: "sq ft", default: 350, step: 10 },
    ],
    compute: (v) => {
      const gallons = (v.wallArea * v.coats) / v.coverage;
      return {
        primary: { label: "Paint needed", value: `${round(gallons, 1)} gal` },
        secondary: [
          { l: "Quarts (if under 1 gal)", v: gallons < 1 ? round(gallons * 4, 1) : "—" },
          { l: "Total area painted", v: `${v.wallArea * v.coats} sq ft` },
        ],
      };
    },
    faq: [
      { q: "How much paint covers 400 sq ft?", a: "At standard 350 sq ft per gallon coverage, one coat over 400 sq ft needs about 1.14 gallons — round up to be safe." },
    ],
    related: ["concrete-calculator", "flooring-calculator", "unit-length-converter"],
  },
  {
    id: "mulch-calculator",
    category: "construction",
    title: "Mulch Calculator",
    keyword: "mulch calculator",
    description: "Estimate cubic yards and bags of mulch needed for a bed.",
    intro: "Enter the area you're covering and your desired depth to estimate how much mulch you'll need, in cubic yards or standard 2 cu ft bags.",
    fields: [
      { id: "area", label: "Bed area", type: "number", unit: "sq ft", default: 200, step: 1 },
      { id: "depth", label: "Depth", type: "number", unit: "in", default: 3, step: 0.5 },
      { id: "waste", label: "Waste allowance", type: "number", unit: "%", default: 10, step: 1 },
    ],
    compute: (v) => {
      const cubicFeet = v.area * (v.depth / 12);
      const cubicYards = (cubicFeet / 27) * (1 + v.waste / 100);
      const bags2cf = Math.ceil((cubicFeet * (1 + v.waste / 100)) / 2); // standard 2 cu ft mulch bags
      return {
        primary: { label: "Mulch needed", value: `${round(cubicYards, 2)} cu yd` },
        secondary: [
          { l: "2 cu ft bags (approx.)", v: bags2cf },
          { l: "Cubic feet", v: round(cubicFeet, 1) },
        ],
        note: "A 2–3 inch depth is standard for weed suppression. Order slightly more for uneven beds or settling.",
      };
    },
    faq: [
      { q: "How much mulch do I need for 200 sq ft?", a: "At 3 inches deep, 200 sq ft needs about 1.85 cubic yards before waste allowance — roughly 28 bags of 2 cu ft mulch." },
      { q: "How deep should mulch be?", a: "2–3 inches is standard for most garden beds. Less than 2 inches won't suppress weeds well; more than 4 inches can smother roots and hold too much moisture." },
    ],
    related: ["gravel-calculator", "concrete-calculator", "unit-length-converter"],
  },
  {
    id: "gravel-calculator",
    category: "construction",
    title: "Gravel Calculator",
    keyword: "gravel calculator",
    description: "Estimate cubic yards and tons of gravel needed for a project.",
    intro: "Enter your area's length, width, and depth to estimate how much gravel you'll need, in cubic yards and tons.",
    fields: [
      { id: "length", label: "Length", type: "number", unit: "ft", default: 20, step: 0.1 },
      { id: "width", label: "Width", type: "number", unit: "ft", default: 10, step: 0.1 },
      { id: "depth", label: "Depth", type: "number", unit: "in", default: 4, step: 0.5 },
      { id: "waste", label: "Waste allowance", type: "number", unit: "%", default: 10, step: 1 },
    ],
    compute: (v) => {
      const cubicFeet = v.length * v.width * (v.depth / 12);
      const cubicYards = (cubicFeet / 27) * (1 + v.waste / 100);
      const tons = cubicYards * 1.4; // ~1.4 tons per cubic yard for typical gravel
      return {
        primary: { label: "Gravel needed", value: `${round(cubicYards, 2)} cu yd` },
        secondary: [
          { l: "Tons (approx.)", v: round(tons, 2) },
          { l: "Cubic feet", v: round(cubicFeet, 1) },
        ],
        note: "Tonnage is based on a typical density of 1.4 tons per cubic yard — this varies by gravel type, so confirm with your supplier for large orders.",
      };
    },
    faq: [
      { q: "How much gravel do I need for a 20x10 driveway?", a: "At 4 inches deep, a 20×10 ft area needs about 2.47 cubic yards before waste allowance — roughly 3.46 tons at typical gravel density." },
      { q: "How many tons is a cubic yard of gravel?", a: "About 1.4 tons per cubic yard for most crushed stone and gravel, though density varies by material — pea gravel and crushed granite can differ slightly." },
    ],
    related: ["mulch-calculator", "concrete-calculator", "unit-length-converter"],
  },
  {
    id: "flooring-calculator",
    category: "construction",
    title: "Flooring Calculator",
    keyword: "flooring calculator",
    description: "Estimate how many boxes of flooring you need for a room.",
    intro: "Enter your room area, coverage per box, and a waste allowance to estimate how many boxes of flooring to buy.",
    fields: [
      { id: "roomArea", label: "Room area", type: "number", unit: "sq ft", default: 250, step: 1 },
      { id: "coveragePerBox", label: "Coverage per box", type: "number", unit: "sq ft", default: 22, step: 0.5 },
      { id: "waste", label: "Waste allowance", type: "number", unit: "%", default: 10, step: 1 },
    ],
    compute: (v) => {
      const totalAreaNeeded = v.roomArea * (1 + v.waste / 100);
      const boxes = Math.ceil(totalAreaNeeded / v.coveragePerBox);
      return {
        primary: { label: "Boxes needed", value: boxes },
        secondary: [
          { l: "Total area with waste", v: `${round(totalAreaNeeded, 1)} sq ft` },
          { l: "Total coverage bought", v: `${round(boxes * v.coveragePerBox, 1)} sq ft` },
        ],
        note: "A 10% waste allowance covers cuts and pattern matching. Increase to 15% for diagonal layouts or rooms with lots of angles.",
      };
    },
    faq: [
      { q: "How many boxes of flooring do I need for 250 sq ft?", a: "At 22 sq ft per box with a 10% waste allowance, 250 sq ft needs about 13 boxes." },
      { q: "Why do I need extra flooring for waste?", a: "Cuts around doorways, closets, and pattern matching use extra material — a 10–15% allowance keeps you from running short mid-project." },
    ],
    related: ["paint-calculator", "concrete-calculator", "unit-length-converter"],
  },

  // ---------------- HEALTH & FITNESS ----------------
  {
    id: "bmi-calculator",
    category: "health",
    title: "BMI Calculator",
    keyword: "bmi calculator",
    description: "Calculate your body mass index from height and weight.",
    intro: "Enter your height and weight to calculate BMI, a general screening measure (not a diagnosis).",
    fields: [
      { id: "heightIn", label: "Height", type: "number", unit: "inches", default: 67, step: 0.1 },
      { id: "weightLb", label: "Weight", type: "number", unit: "lb", default: 150, step: 0.1 },
    ],
    compute: (v) => {
      const bmi = (v.weightLb / (v.heightIn * v.heightIn)) * 703;
      let category = "Moderate";
      if (bmi < 18.5) category = "Underweight";
      else if (bmi < 25) category = "Healthy range";
      else if (bmi < 30) category = "Overweight";
      else category = "Obesity range";
      return {
        primary: { label: "BMI", value: round(bmi, 1) },
        secondary: [{ l: "Category", v: category }],
        note: "BMI is a general screening tool and doesn't account for muscle mass, frame size, or other individual factors. Talk to a healthcare provider for a full picture.",
      };
    },
    faq: [
      { q: "Is BMI accurate for everyone?", a: "No — BMI doesn't distinguish muscle from fat and can be misleading for athletes, older adults, and some body types. It's a screening tool, not a diagnosis." },
    ],
    related: ["pace-calculator", "dog-age-calculator"],
  },
  {
    id: "pace-calculator",
    category: "health",
    title: "Running Pace Calculator",
    keyword: "pace calculator",
    description: "Calculate your running pace per mile or kilometer.",
    intro: "Enter your distance and total time to calculate your pace per mile and per kilometer.",
    fields: [
      { id: "distance", label: "Distance", type: "number", unit: "miles", default: 3.1, step: 0.01 },
      { id: "hours", label: "Hours", type: "number", default: 0, step: 1, min: 0 },
      { id: "minutes", label: "Minutes", type: "number", default: 28, step: 1, min: 0 },
      { id: "seconds", label: "Seconds", type: "number", default: 0, step: 1, min: 0 },
    ],
    compute: (v) => {
      const totalMinutes = v.hours * 60 + v.minutes + v.seconds / 60;
      const paceMin = totalMinutes / v.distance;
      const paceMinKm = paceMin / 1.60934;
      return {
        primary: { label: "Pace per mile", value: formatPace(paceMin) },
        secondary: [
          { l: "Pace per km", v: formatPace(paceMinKm) },
          { l: "Total time", v: `${v.hours}h ${v.minutes}m ${v.seconds}s` },
        ],
      };
    },
    faq: [
      { q: "How do I calculate running pace?", a: "Divide your total time by your total distance. For a 5K in 28 minutes, pace per mile = 28 ÷ 3.1 ≈ 9:02 per mile." },
    ],
    related: ["bmi-calculator", "days-until-calculator"],
  },

  // ---------------- DATE & TIME ----------------
  {
    id: "days-until-calculator",
    category: "datetime",
    title: "Days Until Calculator",
    keyword: "how many days until",
    description: "Find out how many days remain until any future date.",
    intro: "Pick a date to see exactly how many days, weeks, and months remain until it arrives.",
    fields: [
      { id: "targetDate", label: "Target date", type: "date", default: futureDateString(60) },
    ],
    compute: (v) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const target = new Date(v.targetDate);
      const diffMs = target - today;
      const days = Math.round(diffMs / 86400000);
      return {
        primary: { label: days >= 0 ? "Days remaining" : "Days ago", value: Math.abs(days) },
        secondary: [
          { l: "Weeks", v: round(Math.abs(days) / 7, 1) },
          { l: "Months (approx.)", v: round(Math.abs(days) / 30.44, 1) },
        ],
      };
    },
    faq: [
      { q: "How is 'days until' calculated?", a: "It's the number of calendar days between today and your chosen date, counting forward or backward from midnight." },
    ],
    related: ["age-calculator", "pace-calculator"],
  },
  {
    id: "age-calculator",
    category: "datetime",
    title: "Age Calculator",
    keyword: "age calculator",
    description: "Calculate exact age in years, months, and days.",
    intro: "Enter a birth date to calculate exact age as of today, down to the day.",
    fields: [
      { id: "birthDate", label: "Birth date", type: "date", default: "1995-06-15" },
    ],
    compute: (v) => {
      const birth = new Date(v.birthDate);
      const today = new Date();
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();
      if (days < 0) { months -= 1; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
      if (months < 0) { years -= 1; months += 12; }
      const totalDays = Math.round((today - birth) / 86400000);
      return {
        primary: { label: "Age", value: `${years} yrs, ${months} mo, ${days} days` },
        secondary: [{ l: "Total days lived", v: totalDays.toLocaleString() }],
      };
    },
    faq: [
      { q: "How is exact age calculated?", a: "By counting full years, then remaining months, then remaining days between the birth date and today — not just subtracting birth year from the current year." },
    ],
    related: ["days-until-calculator", "dog-age-calculator"],
  },

  // ---------------- EVERYDAY CONVERSIONS ----------------
  {
    id: "unit-length-converter",
    category: "conversions",
    title: "Length Unit Converter",
    keyword: "cm to inches converter",
    description: "Convert between centimeters, inches, feet, and meters.",
    intro: "Enter a value and choose units to convert between common length measurements.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 100, step: 0.01 },
      { id: "from", label: "From", type: "select", default: "cm", options: [
        { v: "cm", l: "Centimeters" }, { v: "in", l: "Inches" }, { v: "ft", l: "Feet" }, { v: "m", l: "Meters" },
      ] },
    ],
    compute: (v) => {
      const toCm = { cm: 1, in: 2.54, ft: 30.48, m: 100 };
      const cmValue = v.value * toCm[v.from];
      return {
        primary: { label: "In centimeters", value: `${round(cmValue, 2)} cm` },
        secondary: [
          { l: "Inches", v: round(cmValue / 2.54, 2) },
          { l: "Feet", v: round(cmValue / 30.48, 3) },
          { l: "Meters", v: round(cmValue / 100, 3) },
        ],
      };
    },
    faq: [
      { q: "How many inches is a centimeter?", a: "1 centimeter equals about 0.3937 inches. To convert cm to inches, divide by 2.54." },
    ],
    related: ["cooking-converter", "concrete-calculator"],
  },
  {
    id: "cooking-converter",
    category: "conversions",
    title: "Cups to Grams Converter",
    keyword: "grams to cups",
    description: "Convert common baking ingredients between cups and grams.",
    intro: "Choose an ingredient and enter cups to see the equivalent weight in grams — ingredient density affects the conversion.",
    fields: [
      { id: "cups", label: "Cups", type: "number", default: 1, step: 0.25 },
      { id: "ingredient", label: "Ingredient", type: "select", default: "flour", options: [
        { v: "flour", l: "All-purpose flour (120g/cup)" },
        { v: "sugar", l: "Granulated sugar (200g/cup)" },
        { v: "butter", l: "Butter (227g/cup)" },
        { v: "brownSugar", l: "Brown sugar, packed (220g/cup)" },
      ] },
    ],
    compute: (v) => {
      const gramsPerCup = { flour: 120, sugar: 200, butter: 227, brownSugar: 220 };
      const grams = v.cups * gramsPerCup[v.ingredient];
      return {
        primary: { label: "Grams", value: round(grams, 0) },
        secondary: [{ l: "Ounces", v: round(grams / 28.35, 1) }],
        note: "Weights vary by brand and how ingredients are packed/scooped — for baking precision, a kitchen scale is most accurate.",
      };
    },
    faq: [
      { q: "Why does 1 cup of flour and 1 cup of sugar weigh different amounts?", a: "Cups measure volume, not weight — denser ingredients like sugar weigh more per cup than lighter ones like flour." },
    ],
    related: ["unit-length-converter", "paint-calculator"],
  },

  // ---------------- TEXT & DIGITAL ----------------
  {
    id: "word-counter",
    category: "text",
    title: "Word Counter",
    keyword: "word counter",
    description: "Count words, characters, and sentences in your text.",
    intro: "Paste or type text below to instantly count words, characters, and sentences.",
    fields: [
      { id: "text", label: "Your text", type: "textarea", default: "Paste your text here to see live counts." },
    ],
    compute: (v) => {
      const text = v.text || "";
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const chars = text.length;
      const charsNoSpaces = text.replace(/\s/g, "").length;
      const sentences = (text.match(/[.!?]+/g) || []).length;
      return {
        primary: { label: "Words", value: words },
        secondary: [
          { l: "Characters", v: chars },
          { l: "Characters (no spaces)", v: charsNoSpaces },
          { l: "Sentences", v: sentences },
        ],
      };
    },
    faq: [
      { q: "Does this word counter save my text?", a: "No — the count runs entirely in your browser and nothing is sent or stored." },
    ],
    related: ["password-generator", "days-until-calculator"],
  },
  {
    id: "password-generator",
    category: "text",
    title: "Password Generator",
    keyword: "password generator",
    description: "Generate a strong, random password instantly.",
    intro: "Choose a length and character types to generate a random password in your browser.",
    fields: [
      { id: "length", label: "Length", type: "number", default: 16, min: 6, max: 64, step: 1 },
      { id: "options", label: "Include", type: "checkbox-group", default: ["upper", "lower", "numbers", "symbols"], options: [
        { v: "upper", l: "Uppercase (A-Z)" }, { v: "lower", l: "Lowercase (a-z)" },
        { v: "numbers", l: "Numbers (0-9)" }, { v: "symbols", l: "Symbols (!@#$)" },
      ] },
    ],
    compute: (v) => {
      const sets = {
        upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
        lower: "abcdefghijkmnpqrstuvwxyz",
        numbers: "23456789",
        symbols: "!@#$%^&*-_=+",
      };
      let pool = "";
      (v.options || []).forEach((k) => { pool += sets[k] || ""; });
      if (!pool) pool = sets.lower;
      let pw = "";
      for (let i = 0; i < v.length; i++) pw += pool[Math.floor(Math.random() * pool.length)];
      return {
        primary: { label: "Generated password", value: pw },
        secondary: [{ l: "Length", v: v.length }],
        note: "Generated locally in your browser — nothing is transmitted or stored. Use a password manager to save it securely.",
      };
    },
    faq: [
      { q: "Is this password generator secure?", a: "Passwords are generated entirely client-side using your browser's random number generator and are never sent to a server." },
    ],
    related: ["word-counter", "unit-length-converter"],
  },

  // ---------------- PET & LIFESTYLE ----------------
  {
    id: "dog-age-calculator",
    category: "pets",
    title: "Dog Age Calculator",
    keyword: "dog age calculator",
    description: "Convert your dog's age into human years by size.",
    intro: "Dog aging varies by breed size — enter your dog's age and size to get a more accurate human-year estimate than the old 'multiply by 7' rule.",
    fields: [
      { id: "dogYears", label: "Dog's age", type: "number", unit: "years", default: 3, step: 0.5 },
      { id: "size", label: "Size", type: "select", default: "medium", options: [
        { v: "small", l: "Small (under 20 lb)" }, { v: "medium", l: "Medium (20–50 lb)" },
        { v: "large", l: "Large (50–90 lb)" }, { v: "giant", l: "Giant (90+ lb)" },
      ] },
    ],
    compute: (v) => {
      // Simplified size-adjusted curve, first 2 years weighted heavily, then per-size multiplier
      const base = v.dogYears <= 2 ? v.dogYears * 12.5 : 25;
      const multiplier = { small: 4, medium: 4.5, large: 5.5, giant: 7 }[v.size];
      const remainingYears = Math.max(0, v.dogYears - 2);
      const humanAge = v.dogYears <= 2 ? base : 25 + remainingYears * multiplier;
      return {
        primary: { label: "Human-equivalent age", value: `${round(humanAge, 0)} years` },
        secondary: [{ l: "Dog's actual age", v: `${v.dogYears} years` }],
        note: "This is an estimate — actual aging varies by breed and individual health, not just size.",
      };
    },
    faq: [
      { q: "Is 'one dog year equals seven human years' accurate?", a: "No — that old rule is a rough myth. Dogs age faster in their first two years, and larger breeds age faster in later years than small breeds." },
    ],
    related: ["cat-age-calculator", "bmi-calculator"],
  },
  {
    id: "cat-age-calculator",
    category: "pets",
    title: "Cat Age Calculator",
    keyword: "cat age calculator",
    description: "Convert your cat's age into human years.",
    intro: "Enter your cat's age to estimate the equivalent human age, based on typical feline aging patterns.",
    fields: [
      { id: "catYears", label: "Cat's age", type: "number", unit: "years", default: 3, step: 0.5 },
    ],
    compute: (v) => {
      let humanAge;
      if (v.catYears <= 1) humanAge = v.catYears * 15;
      else if (v.catYears <= 2) humanAge = 15 + (v.catYears - 1) * 9;
      else humanAge = 24 + (v.catYears - 2) * 4;
      return {
        primary: { label: "Human-equivalent age", value: `${round(humanAge, 0)} years` },
        secondary: [{ l: "Cat's actual age", v: `${v.catYears} years` }],
        note: "This is an estimate based on typical feline development, not a veterinary assessment.",
      };
    },
    faq: [
      { q: "Do cats age the same way regardless of breed?", a: "Aging patterns are fairly consistent across most cat breeds, unlike dogs where size drives large aging differences." },
    ],
    related: ["dog-age-calculator", "age-calculator"],
  },
];

/* ---------- helpers ---------- */

function round(num, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

function formatPace(minutesDecimal) {
  const min = Math.floor(minutesDecimal);
  const sec = Math.round((minutesDecimal - min) * 60);
  return `${min}:${sec.toString().padStart(2, "0")} /mi`;
}

function futureDateString(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

function getCalculator(id) {
  return CALCULATORS.find((c) => c.id === id);
}

function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function calculatorsInCategory(catId) {
  return CALCULATORS.filter((c) => c.category === catId);
}
