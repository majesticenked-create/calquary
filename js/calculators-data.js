/* ============================================================
   Calquary — Calculator Config Schema
   Each category has a short "code" (card-catalog label).
   Each calculator config drives the tool page, category page,
   and homepage cards from ONE source of truth.
   ============================================================ */

// `code` (M/F/C/H/D/V/T/P) is kept as a stable machine-readable id for things
// like sitemap/OG image generation, but is no longer shown as a visible
// letter badge anywhere post-rebrand — `icon` (an SVG path fragment for the
// shared line-icon treatment) is the single source of truth so every page
// type (homepage, category pages, all-calculators) renders the same icon
// without duplicating this map per file.
const CATEGORIES = [
  { id: "math", code: "M", name: "Math", description: "Percentages, ratios, and everyday arithmetic.", longDescription: "From quick percentage calculations to statistics and algebra, this category covers the everyday math problems people actually search for - splitting a bill, checking a grade, or working out a ratio - without wading through a full scientific calculator's worth of unrelated functions.", icon: '<circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/><line x1="18" y1="6" x2="6" y2="18"/>' },
  { id: "finance", code: "F", name: "Finance", description: "Loans, tipping, and everyday money math.", longDescription: "Loans, savings, taxes, and debt payoff all come down to a handful of well-known formulas - these calculators apply them to your actual numbers so you can see a real monthly payment, payoff timeline, or growth projection instead of reading about the formula in the abstract.", icon: '<line x1="5" y1="19" x2="5" y2="13"/><line x1="12" y1="19" x2="12" y2="9"/><line x1="19" y1="19" x2="19" y2="5"/>' },
  { id: "construction", code: "C", name: "Construction & Home", description: "Materials, coverage, and project estimates.", longDescription: "Home improvement projects live or die on getting material quantities right - too little and you're back at the store mid-job, too much and you've overspent. These calculators turn room dimensions into concrete, flooring, paint, and lumber quantities, each with a waste allowance built in.", icon: '<path d="M4 11.5 12 5l8 6.5"/><path d="M6 10v9h12v-9"/>' },
  { id: "health", code: "H", name: "Health & Fitness", description: "Body metrics, pace, and training numbers.", longDescription: "Body metrics like BMI, BMR, and body fat percentage are calculated from a handful of standard, published formulas - these tools apply them to your measurements so you get a number to work with, alongside a plain-language note on what that number does and doesn't tell you.", icon: '<polyline points="3,12 8,12 10,6 14,18 16,12 21,12"/>' },
  { id: "datetime", code: "D", name: "Date & Time", description: "Countdowns, durations, and age in days.", longDescription: "Whether you're counting down to an event, figuring out how many business days are left, or working out someone's exact age, these calculators handle calendar math correctly - including leap years and weekday-only counts - so you don't have to count by hand.", icon: '<circle cx="12" cy="12" r="8"/><line x1="12" y1="12" x2="12" y2="7"/><line x1="12" y1="12" x2="16" y2="14"/>' },
  { id: "conversions", code: "V", name: "Everyday Conversions", description: "Units, measurements, and kitchen swaps.", longDescription: "Unit conversions come up constantly in cooking, home projects, and everyday life - converting between metric and imperial, or figuring out how many cups a recipe's grams translate to. These tools handle the conversion instantly, with the underlying factor shown so you can trust the number.", icon: '<polyline points="16,3 20,7 16,11"/><line x1="20" y1="7" x2="4" y2="7"/><polyline points="8,13 4,17 8,21"/><line x1="4" y1="17" x2="20" y2="17"/>' },
  { id: "text", code: "T", name: "Text & Digital", description: "Word counts and generators for everyday tasks.", longDescription: "Word counts, case conversion, and text generators handle the small text-processing tasks that come up while writing, coding, or formatting content - each one runs entirely in your browser, so nothing you type or paste is ever sent anywhere.", icon: '<path d="M9 4h6M12 4v16M9 20h6"/>' },
  { id: "pets", code: "P", name: "Pet & Lifestyle", description: "Age charts and everyday pet math.", longDescription: "A dog year isn't really seven human years, and pregnancy length varies by species - these calculators use the actual age curves and gestation data for dogs, cats, rabbits, and horses instead of the oversimplified rules of thumb most people know.", icon: '<circle cx="12" cy="15.5" r="4"/><circle cx="5.5" cy="9" r="2"/><circle cx="10" cy="4.5" r="2"/><circle cx="14" cy="4.5" r="2"/><circle cx="18.5" cy="9" r="2"/>' },
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
    intro: "Enter a percentage and a number to find the resulting value - useful for tips, discounts, grades, and quick everyday math.",
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
      { q: "How do I calculate a percentage increase or decrease?", a: "Subtract the old value from the new value, divide by the old value, then multiply by 100. Going from 150 to 180 is (180−150)/150×100 = 20% increase; going from 150 to 120 is (120−150)/150×100 = −20%, a 20% decrease." },
      { q: "How do I find the original price before a percentage discount was applied?", a: "Divide the discounted price by (1 minus the discount as a decimal). If a $60 item is 25% off, divide 60 by 0.75 to get the original price of $80." },
      { q: "How do I calculate a percent of a percent, like 20% of 50%?", a: "Convert both percentages to decimals and multiply them together, then convert back to a percentage: 20% of 50% is 0.20 × 0.50 = 0.10, or 10%. This comes up when combining rates - like a discount applied on top of an already-discounted price, or a tax rate applied to a partial amount." },
    ],
    related: ["percentage-change-calculator", "tip-calculator", "ratio-calculator"],
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
      { q: "Is percentage change the same as percentage point change?", a: "No - if a rate goes from 20% to 25%, that's a 5 percentage point increase, but a 25% percentage change ((25−20)÷20×100). Mixing the two up is a common reporting mistake." },
      { q: "How do I calculate percentage change when the old value is negative?", a: "The formula still applies: (new − old) / |old| × 100, but using the absolute value of the old number in the denominator avoids a misleading sign flip - most financial and scientific contexts define percentage change this way specifically to keep the result intuitive." },
      { q: "Can percentage change be greater than 100%?", a: "Yes - if a value more than doubles, the percentage change exceeds 100%. Going from 10 to 25 is a 150% increase: (25-10)/10*100 = 150%. There's no upper limit on increases, but a decrease can never exceed -100% (a value can't drop below zero relative to itself)." },
    ],
    related: ["percentage-calculator", "loan-calculator"],
  },
  {
    id: "average-calculator",
    category: "math",
    title: "Average Calculator",
    keyword: "average calculator",
    description: "Calculate the mean, median, and sum of a list of numbers.",
    intro: "Enter a list of numbers separated by commas or spaces to calculate the mean, median, and sum.",
    fields: [
      { id: "numbers", label: "Numbers (comma or space separated)", type: "textarea", default: "4, 8, 15, 16, 23, 42" },
    ],
    compute: (v) => {
      const nums = v.numbers.trim().split(/[,\s]+/).filter((s) => s !== "").map(Number).filter((n) => !isNaN(n));
      const count = nums.length;
      const sum = nums.reduce((a, b) => a + b, 0);
      const mean = count ? sum / count : 0;
      const sorted = [...nums].sort((a, b) => a - b);
      const median = count === 0 ? 0
        : count % 2 === 0 ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
        : sorted[(count - 1) / 2];
      return {
        primary: { label: "Average (mean)", value: round(mean, 2) },
        secondary: [
          { l: "Median", v: round(median, 2) },
          { l: "Sum", v: round(sum, 2) },
          { l: "Count", v: count },
        ],
      };
    },
    faq: [
      { q: "How do I calculate the average of a list of numbers?", a: "Add all the numbers together, then divide by how many numbers there are. For 4, 8, 15, 16, 23, 42: the sum is 108, divided by 6 numbers = an average of 18." },
      { q: "What's the difference between mean and median?", a: "The mean is the sum divided by the count (the 'average'); the median is the middle value when the numbers are sorted. The median is less affected by outliers than the mean." },
      { q: "Does this handle negative numbers or decimals?", a: "Yes - enter negative numbers with a minus sign and decimals with a period, separated by commas or spaces just like any other value; the mean, median, and sum all calculate correctly with mixed positive, negative, and decimal values." },
      { q: "What's the difference between an average and a weighted average?", a: "A simple average treats every number equally; a weighted average multiplies each number by its own weight before dividing by the total weight, so values that matter more (like a test worth 40% of a grade) count for more. This calculator computes a simple average - for weighted averages you'd multiply each value by its weight first." },
    ],
    related: ["standard-deviation-calculator", "fraction-calculator", "gcd-lcm-calculator"],
  },
  {
    id: "fraction-calculator",
    category: "math",
    title: "Fraction Calculator",
    keyword: "fraction calculator",
    description: "Add, subtract, multiply, or divide two fractions.",
    intro: "Enter two fractions and choose an operation to calculate the result, automatically simplified.",
    fields: [
      { id: "num1", label: "Numerator 1", type: "number", default: 1, step: 1 },
      { id: "den1", label: "Denominator 1", type: "number", default: 2, step: 1 },
      { id: "operation", label: "Operation", type: "select", default: "add", options: [
        { v: "add", l: "+" }, { v: "subtract", l: "−" }, { v: "multiply", l: "×" }, { v: "divide", l: "÷" },
      ] },
      { id: "num2", label: "Numerator 2", type: "number", default: 1, step: 1 },
      { id: "den2", label: "Denominator 2", type: "number", default: 3, step: 1 },
    ],
    compute: (v) => {
      let rNum, rDen;
      if (v.operation === "add") { rNum = v.num1 * v.den2 + v.num2 * v.den1; rDen = v.den1 * v.den2; }
      else if (v.operation === "subtract") { rNum = v.num1 * v.den2 - v.num2 * v.den1; rDen = v.den1 * v.den2; }
      else if (v.operation === "multiply") { rNum = v.num1 * v.num2; rDen = v.den1 * v.den2; }
      else { rNum = v.num1 * v.den2; rDen = v.den1 * v.num2; }
      const g = gcd(rNum, rDen) || 1;
      const simplifiedNum = rNum / g;
      const simplifiedDen = rDen / g;
      return {
        primary: { label: "Result", value: `${simplifiedNum}/${simplifiedDen}` },
        secondary: [
          { l: "Decimal", v: round(rNum / rDen, 4) },
          { l: "Unsimplified", v: `${rNum}/${rDen}` },
        ],
      };
    },
    faq: [
      { q: "How do I add two fractions?", a: "Find a common denominator, convert both fractions, then add the numerators. 1/2 + 1/3 = 3/6 + 2/6 = 5/6." },
      { q: "How do I divide fractions?", a: "Multiply the first fraction by the reciprocal (flip) of the second. 1/2 ÷ 1/3 = 1/2 × 3/1 = 3/2." },
      { q: "How do I convert a fraction to a decimal?", a: "Divide the numerator by the denominator. 3/4 becomes 3 ÷ 4 = 0.75. This calculator's fraction operations return a simplified fraction, which you can convert to a decimal the same way afterward." },
      { q: "How do I subtract fractions with different denominators?", a: "Find a common denominator first, convert each fraction to that denominator, then subtract the numerators. For 3/4 - 1/6, the common denominator is 12: 9/12 - 2/12 = 7/12. This calculator handles the common-denominator step automatically." },
    ],
    related: ["gcd-lcm-calculator", "average-calculator", "percentage-calculator"],
  },
  {
    id: "gcd-lcm-calculator",
    category: "math",
    title: "GCD and LCM Calculator",
    keyword: "gcd calculator",
    description: "Find the greatest common divisor and least common multiple of two numbers.",
    intro: "This GCD calculator finds the greatest common divisor and least common multiple (LCM) of two whole numbers in one step.",
    fields: [
      { id: "a", label: "First number", type: "number", default: 24, step: 1 },
      { id: "b", label: "Second number", type: "number", default: 36, step: 1 },
    ],
    compute: (v) => {
      const g = gcd(v.a, v.b);
      const l = g ? Math.abs(v.a * v.b) / g : 0;
      return {
        primary: { label: "Greatest common divisor", value: g },
        secondary: [{ l: "Least common multiple", v: l }],
      };
    },
    faq: [
      { q: "What's the GCD of 24 and 36?", a: "12 - the largest number that divides evenly into both 24 and 36." },
      { q: "How is LCM related to GCD?", a: "LCM = (a × b) ÷ GCD(a, b). For 24 and 36: (24 × 36) ÷ 12 = 72, the smallest number both 24 and 36 divide into evenly." },
      { q: "How is GCD used to simplify a fraction?", a: "Divide the numerator and denominator by their GCD to reduce a fraction to lowest terms - for example, 24/36 shares a GCD of 12, so dividing both by 12 gives the simplified fraction 2/3. See the Fraction Calculator for simplifying fractions directly." },
      { q: "Can this find the GCD or LCM of more than two numbers?", a: "This calculator computes GCD and LCM for two numbers at a time. For three or more numbers, apply the calculation pairwise - find the GCD or LCM of the first two, then combine that result with the next number, repeating until all values are included." },
    ],
    related: ["fraction-calculator", "average-calculator", "percentage-calculator"],
  },
  {
    id: "standard-deviation-calculator",
    category: "math",
    title: "Standard Deviation Calculator",
    keyword: "standard deviation calculator",
    description: "Calculate the standard deviation and variance of a list of numbers.",
    intro: "Enter a list of numbers separated by commas or spaces to calculate the standard deviation and variance.",
    fields: [
      { id: "numbers", label: "Numbers (comma or space separated)", type: "textarea", default: "4, 8, 15, 16, 23, 42" },
    ],
    compute: (v) => {
      const nums = v.numbers.trim().split(/[,\s]+/).filter((s) => s !== "").map(Number).filter((n) => !isNaN(n));
      const count = nums.length;
      const mean = count ? nums.reduce((a, b) => a + b, 0) / count : 0;
      const sumSqDiffs = nums.reduce((a, n) => a + Math.pow(n - mean, 2), 0);
      const popStdev = count ? Math.sqrt(sumSqDiffs / count) : 0;
      const sampleStdev = count > 1 ? Math.sqrt(sumSqDiffs / (count - 1)) : 0;
      return {
        primary: { label: "Sample standard deviation", value: round(sampleStdev, 2) },
        secondary: [
          { l: "Population standard deviation", v: round(popStdev, 2) },
          { l: "Mean", v: round(mean, 2) },
          { l: "Count", v: count },
        ],
        note: "Sample standard deviation (dividing by n−1) is used when your numbers are a sample from a larger population; use population standard deviation if your list is the entire population.",
      };
    },
    faq: [
      { q: "What's the standard deviation of 4, 8, 15, 16, 23, 42?", a: "About 13.49 using the sample formula (dividing by n−1), or 12.32 using the population formula (dividing by n) - the mean of this set is 18." },
      { q: "When should I use sample vs. population standard deviation?", a: "Use population standard deviation when your numbers represent the entire group you care about; use sample standard deviation when your numbers are a subset used to estimate a larger population's spread." },
      { q: "What does a low vs. high standard deviation mean?", a: "A low standard deviation means the values cluster tightly around the mean, while a high standard deviation means they're spread out widely - it's a measure of consistency, not of the average itself." },
      { q: "What does it mean if the standard deviation is zero?", a: "A standard deviation of zero means every value in the data set is identical - there's no spread or variation at all. Any variation among the numbers, even a small one, produces a standard deviation greater than zero." },
    ],
    related: ["average-calculator", "fraction-calculator", "gcd-lcm-calculator"],
  },
  {
    id: "square-root-calculator",
    category: "math",
    title: "Square Root Calculator",
    keyword: "square root calculator",
    description: "Calculate the square root, square, and cube root of a number.",
    intro: "Enter a number to calculate its square root, square, and cube root.",
    fields: [
      { id: "value", label: "Number", type: "number", default: 144, step: 1 },
    ],
    compute: (v) => {
      const sqrtValue = v.value < 0 ? null : Math.sqrt(v.value);
      const square = v.value * v.value;
      const cbrtValue = Math.cbrt(v.value);
      return {
        primary: { label: "Square root", value: sqrtValue === null ? "Not a real number" : round(sqrtValue, 4) },
        secondary: [
          { l: "Square", v: round(square, 4) },
          { l: "Cube root", v: round(cbrtValue, 4) },
        ],
        note: v.value < 0 ? "Negative numbers don't have a real square root - the result is an imaginary number." : undefined,
      };
    },
    faq: [
      { q: "What's the square root of 144?", a: "12 - since 12 × 12 = 144, making 144 a perfect square." },
      { q: "Why don't negative numbers have a real square root?", a: "Any real number squared is positive (or zero), so no real number multiplied by itself can produce a negative result - negative square roots require imaginary numbers." },
      { q: "How do I estimate a square root without a calculator?", a: "Find the two perfect squares your number falls between, then interpolate. For √50, it's between √49=7 and √64=8, closer to 7, so a reasonable estimate is about 7.07 - which matches the exact value." },
      { q: "What's the difference between a square root and a cube root?", a: "A square root asks what number times itself equals the input; a cube root asks what number times itself three times equals the input. The square root of 27 isn't a whole number, but the cube root of 27 is exactly 3, since 3 x 3 x 3 = 27." },
    ],
    related: ["gcd-lcm-calculator", "fraction-calculator", "average-calculator"],
  },
  {
    id: "ratio-calculator",
    category: "math",
    title: "Ratio Calculator",
    keyword: "ratio calculator",
    description: "Simplify a ratio to its lowest terms.",
    intro: "Enter two numbers to simplify their ratio to lowest terms and see the decimal equivalent.",
    fields: [
      { id: "a", label: "First value", type: "number", default: 8, step: 1 },
      { id: "b", label: "Second value", type: "number", default: 12, step: 1 },
    ],
    compute: (v) => {
      const g = gcd(v.a, v.b) || 1;
      return {
        primary: { label: "Simplified ratio", value: `${v.a / g}:${v.b / g}` },
        secondary: [{ l: "Decimal equivalent", v: round(v.a / v.b, 4) }],
      };
    },
    faq: [
      { q: "How do I simplify a ratio like 8:12?", a: "Divide both numbers by their greatest common divisor. GCD(8, 12) = 4, so 8:12 simplifies to 2:3." },
      { q: "How is a ratio different from a fraction?", a: "A ratio compares two quantities directly (like 2:3), while a fraction expresses one quantity as a part of a whole (like 2/3) - though the simplification math is the same." },
      { q: "How do I scale a ratio to a different total?", a: "Divide the target total by the sum of the ratio parts, then multiply each part by that factor. To split $300 in a 2:3 ratio: 2+3=5 parts, $300÷5=$60 per part, so the split is $120 and $180." },
      { q: "How do I find a missing value in a proportion, like 3:4 = x:20?", a: "Cross-multiply and solve: 3/4 = x/20 becomes 3*20 = 4*x, so x = 60/4 = 15. This calculator handles that cross-multiplication automatically whenever you provide three of the four values in a proportion." },
    ],
    related: ["fraction-calculator", "gcd-lcm-calculator", "percentage-calculator"],
  },
  {
    id: "exponent-calculator",
    category: "math",
    title: "Exponent Calculator",
    keyword: "exponent calculator",
    description: "Calculate a base raised to a power.",
    intro: "Enter a base and an exponent to calculate the result, including support for negative and fractional exponents.",
    fields: [
      { id: "base", label: "Base", type: "number", default: 2, step: 0.1 },
      { id: "exponent", label: "Exponent", type: "number", default: 10, step: 0.1 },
    ],
    compute: (v) => {
      const result = Math.pow(v.base, v.exponent);
      return {
        primary: { label: `${v.base}^${v.exponent}`, value: round(result, 6) },
        secondary: [{ l: "In scientific notation", v: result.toExponential(4) }],
      };
    },
    faq: [
      { q: "What is 2 to the 10th power?", a: "1,024 - doubling 2 ten times (2 × 2 × 2... ten times) gives 1,024." },
      { q: "What does a negative exponent mean?", a: "A negative exponent means the reciprocal of the positive power - for example, 2^-3 = 1 ÷ 2^3 = 1/8 = 0.125." },
      { q: "What is any number raised to the power of 0?", a: "It equals 1, by definition, for any nonzero base - this isn't something you calculate from repeated multiplication, it's a mathematical convention that keeps the rules of exponents consistent (e.g., x^a ÷ x^a = x^0 = 1)." },
      { q: "How do I calculate a fractional exponent, like 8^(1/3)?", a: "A fractional exponent represents a root: the denominator is the root and the numerator is the power. 8^(1/3) means the cube root of 8, which is 2. 8^(2/3) means the cube root of 8, squared, which is 4." },
    ],
    related: ["square-root-calculator", "gcd-lcm-calculator", "quadratic-formula-calculator"],
  },
  {
    id: "quadratic-formula-calculator",
    category: "math",
    title: "Quadratic Formula Calculator",
    keyword: "quadratic formula calculator",
    description: "Solve ax² + bx + c = 0 for x using the quadratic formula.",
    intro: "Enter the coefficients a, b, and c to solve a quadratic equation for x, including complex roots when needed.",
    fields: [
      { id: "a", label: "a (coefficient of x²)", type: "number", default: 1, step: 0.1 },
      { id: "b", label: "b (coefficient of x)", type: "number", default: -3, step: 0.1 },
      { id: "c", label: "c (constant)", type: "number", default: 2, step: 0.1 },
    ],
    compute: (v) => {
      const discriminant = v.b * v.b - 4 * v.a * v.c;
      if (discriminant > 0) {
        const sq = Math.sqrt(discriminant);
        const x1 = (-v.b + sq) / (2 * v.a);
        const x2 = (-v.b - sq) / (2 * v.a);
        return {
          primary: { label: "x =", value: `${round(x1, 4)} or ${round(x2, 4)}` },
          secondary: [{ l: "Discriminant", v: round(discriminant, 4) }],
          note: "Two distinct real roots - the discriminant (b² − 4ac) is positive.",
        };
      } else if (discriminant === 0) {
        const x = -v.b / (2 * v.a);
        return {
          primary: { label: "x =", value: round(x, 4) },
          secondary: [{ l: "Discriminant", v: 0 }],
          note: "One repeated real root - the discriminant (b² − 4ac) is zero.",
        };
      } else {
        const realPart = -v.b / (2 * v.a);
        const imagPart = Math.sqrt(-discriminant) / (2 * v.a);
        return {
          primary: { label: "x =", value: `${round(realPart, 4)} ± ${round(imagPart, 4)}i` },
          secondary: [{ l: "Discriminant", v: round(discriminant, 4) }],
          note: "Two complex roots - the discriminant (b² − 4ac) is negative, so there are no real solutions.",
        };
      }
    },
    faq: [
      { q: "How do I solve x² − 3x + 2 = 0?", a: "Using the quadratic formula with a=1, b=−3, c=2: the discriminant is 9 − 8 = 1, giving two real roots x = 2 and x = 1." },
      { q: "What does a negative discriminant mean?", a: "A negative discriminant means the equation has no real solutions - the roots are complex numbers, since you'd need the square root of a negative number." },
      { q: "What if a quadratic equation has no real solutions?", a: "That happens when the discriminant (b² − 4ac) is negative - the equation still has two solutions, but they're complex numbers involving the imaginary unit i, since you can't take the square root of a negative number within the real numbers." },
      { q: "What's the difference between the quadratic formula and factoring?", a: "Factoring only works cleanly when a quadratic has simple, often whole-number roots; the quadratic formula always works, for any quadratic equation, whether the roots are whole numbers, fractions, decimals, or complex numbers. This calculator uses the formula directly, so it handles every case without needing to guess factors first." },
    ],
    related: ["exponent-calculator", "square-root-calculator", "fraction-calculator"],
  },

  // ---------------- FINANCE ----------------
  {
    id: "loan-calculator",
    category: "finance",
    title: "Loan Payment Calculator",
    keyword: "loan calculator",
    description: "Estimate your monthly payment on a fixed-rate loan.",
    intro: "This loan calculator estimates your fixed monthly payment - just enter the loan amount, annual interest rate, and term.",
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
      { q: "Does this include taxes and insurance?", a: "No - this is principal and interest only. Mortgages in particular often bundle property tax and insurance into the monthly payment (PITI), so your actual bill from a lender may be higher than the number shown here." },
      { q: "Does paying extra each month reduce the total interest?", a: "Yes - any payment above the required amount goes straight to principal, which shortens the loan and cuts total interest paid, since interest is calculated on the remaining balance each period." },
      { q: "How does the loan term affect the total interest paid?", a: "A longer term lowers your monthly payment but increases total interest paid, since you're borrowing the same amount for more periods; a shorter term raises the payment but cuts total interest - the trade-off depends on what monthly amount you can comfortably afford." },
    ],
    related: ["mortgage-calculator", "auto-loan-calculator", "percentage-calculator", "tip-calculator"],
  },
  {
    id: "mortgage-calculator",
    category: "finance",
    title: "Mortgage Calculator",
    keyword: "mortgage calculator",
    description: "Free mtg (mortgage) calculator - estimate your total monthly mortgage payment, including taxes and insurance.",
    intro: "Also known as a home loan calculator: enter your home price, down payment, rate, and term to estimate your full monthly payment - principal, interest, property tax, and insurance.",
    fields: [
      { id: "homePrice", label: "Home price", type: "number", unit: "$", default: 350000, step: 1000 },
      { id: "downPaymentPercent", label: "Down payment", type: "number", unit: "%", default: 20, step: 1 },
      { id: "rate", label: "Annual interest rate", type: "number", unit: "%", default: 6.5, step: 0.01 },
      { id: "years", label: "Loan term", type: "number", unit: "years", default: 30, step: 1 },
      { id: "propertyTaxRate", label: "Annual property tax rate", type: "number", unit: "%", default: 1.1, step: 0.05 },
      { id: "annualInsurance", label: "Annual home insurance", type: "number", unit: "$", default: 1400, step: 50 },
    ],
    compute: (v) => {
      const loanAmount = v.homePrice * (1 - v.downPaymentPercent / 100);
      const monthlyRate = v.rate / 100 / 12;
      const n = v.years * 12;
      const principalInterest = monthlyRate === 0
        ? loanAmount / n
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      const monthlyTax = (v.homePrice * (v.propertyTaxRate / 100)) / 12;
      const monthlyInsurance = v.annualInsurance / 12;
      const totalMonthly = principalInterest + monthlyTax + monthlyInsurance;
      return {
        primary: { label: "Estimated monthly payment", value: `$${round(totalMonthly, 2).toLocaleString()}` },
        secondary: [
          { l: "Principal & interest", v: `$${round(principalInterest, 2).toLocaleString()}` },
          { l: "Taxes + insurance", v: `$${round(monthlyTax + monthlyInsurance, 2).toLocaleString()}` },
          { l: "Loan amount", v: `$${round(loanAmount, 0).toLocaleString()}` },
        ],
        note: "This estimate covers principal, interest, taxes, and insurance (PITI). It doesn't include PMI, HOA fees, or other lender-specific costs.",
      };
    },
    faq: [
      { q: "What's included in a mortgage payment estimate?", a: "This calculator estimates PITI - principal, interest, property taxes, and homeowners insurance. It doesn't include PMI (if your down payment is under 20%) or HOA fees, which vary by lender and property." },
      { q: "How does down payment affect my monthly payment?", a: "A larger down payment reduces your loan amount, which lowers both the principal & interest portion of your payment and your total interest paid over the loan term." },
      { q: "What happens to my payment if I refinance to a lower rate later?", a: "Refinancing recalculates your loan from the new balance, rate, and remaining term - even a 1% rate drop meaningfully lowers the interest portion of each payment, though closing costs on the new loan need to be weighed against the savings." },
      { q: "How does the loan term affect total interest paid?", a: "A shorter term (like 15 years vs. 30) means higher monthly payments but far less total interest, since you're paying down principal faster and it has less time to accrue interest. A 30-year loan lowers the monthly payment but often costs more than double the total interest of the same loan at 15 years." },
      { q: "What does 'mtg' mean in mtg calculator or mtg payment?", a: "'Mtg' is a common shorthand for 'mortgage' used in real estate listings, loan documents, and search queries - an mtg calculator is the same thing as a mortgage calculator. This tool covers both: enter your home price, down payment, rate, and term to estimate your monthly mtg payment." },
      { q: "Is a home loan calculator the same as a mortgage calculator?", a: "Yes - \"home loan\" and \"mortgage\" refer to the same type of loan used to buy a house, so a home loan calculator and a mortgage calculator do the same job. This tool estimates your full monthly payment (principal, interest, taxes, and insurance) whichever term you search for." },
      { q: "What's the difference between a mortgage calculator and a house loan estimator?", a: "None - a house loan estimator, home loan calculator, and mortgage calculator all describe the same tool: something that estimates your monthly payment on a loan used to buy a house. This calculator covers that estimate, including principal, interest, property taxes, and insurance." },
    ],
    related: ["loan-calculator", "savings-calculator", "compound-interest-calculator"],
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
      { q: "Should I tip on the pre-tax or post-tax total?", a: "Etiquette guides generally say tip on the pre-tax subtotal, but most people just tip on the total shown on the receipt - the difference is usually small enough not to matter." },
      { q: "How do I split a tip evenly among a group?", a: "Add the tip to the bill first, then divide the total by the number of people - this calculator does that automatically once you enter the number of people, so everyone pays an equal share of both the bill and the tip." },
      { q: "How do I calculate a tip for a large group with a mandatory service charge?", a: "Check your receipt first - many restaurants automatically add an 18-20% gratuity for groups above a certain size, which replaces rather than adds to a separate tip. If no service charge is listed, calculate the tip normally on the pre-tax subtotal and split it evenly among the group." },
    ],
    related: ["loan-calculator", "percentage-calculator"],
  },
  {
    id: "savings-calculator",
    category: "finance",
    title: "Savings Calculator",
    keyword: "savings calculator",
    description: "Estimate the future value of your savings with regular contributions.",
    intro: "Enter your starting balance, monthly contribution, interest rate, and time frame to see how your savings could grow.",
    fields: [
      { id: "initialDeposit", label: "Starting balance", type: "number", unit: "$", default: 1000, step: 100 },
      { id: "monthlyContribution", label: "Monthly contribution", type: "number", unit: "$", default: 200, step: 10 },
      { id: "rate", label: "Annual interest rate", type: "number", unit: "%", default: 4.5, step: 0.1 },
      { id: "years", label: "Time frame", type: "number", unit: "years", default: 10, step: 1 },
    ],
    compute: (v) => {
      const monthlyRate = v.rate / 100 / 12;
      const n = v.years * 12;
      const growthFactor = Math.pow(1 + monthlyRate, n);
      const fvPrincipal = v.initialDeposit * growthFactor;
      const fvContributions = monthlyRate === 0
        ? v.monthlyContribution * n
        : v.monthlyContribution * ((growthFactor - 1) / monthlyRate);
      const total = fvPrincipal + fvContributions;
      const totalContributed = v.initialDeposit + v.monthlyContribution * n;
      return {
        primary: { label: "Estimated future value", value: `$${round(total, 2).toLocaleString()}` },
        secondary: [
          { l: "Total contributed", v: `$${round(totalContributed, 2).toLocaleString()}` },
          { l: "Interest earned", v: `$${round(total - totalContributed, 2).toLocaleString()}` },
        ],
        note: "Assumes interest compounds monthly and contributions are made at a consistent monthly amount. Actual returns vary with account type and market conditions.",
      };
    },
    faq: [
      { q: "How does compound growth affect savings over time?", a: "Interest earns interest on itself, so the longer your money stays invested, the larger the share of your balance that comes from growth rather than contributions - this effect accelerates in later years." },
      { q: "What interest rate should I use for a savings calculator?", a: "Use your actual account's APY for savings accounts, or a conservative long-term average (historically 4–7%) for investment accounts - check your specific account terms for the current rate." },
      { q: "How do monthly contributions compare to a one-time lump sum?", a: "Regular monthly contributions add up steadily and each one gets fewer years to compound than an early lump sum, so a lump sum invested early generally outgrows the same total amount contributed gradually - though most people find gradual saving far more realistic." },
      { q: "How much do monthly contributions really matter over 20-30 years?", a: "Even modest recurring contributions compound significantly over decades - $200/month at a 6% annual return grows to well over $130,000 in 25 years, most of it from compound growth rather than the contributions themselves. Starting early matters more than the exact contribution amount, since compounding needs time to work." },
    ],
    related: ["compound-interest-calculator", "mortgage-calculator", "loan-calculator"],
  },
  {
    id: "compound-interest-calculator",
    category: "finance",
    title: "Compound Interest Calculator",
    keyword: "compound interest calculator",
    description: "Calculate how a lump sum grows over time with compound interest.",
    intro: "Enter a principal amount, interest rate, compounding frequency, and time frame to see how much your money could grow.",
    fields: [
      { id: "principal", label: "Principal", type: "number", unit: "$", default: 5000, step: 100 },
      { id: "rate", label: "Annual interest rate", type: "number", unit: "%", default: 5, step: 0.1 },
      { id: "compoundsPerYear", label: "Compounds per year", type: "number", default: 12, step: 1 },
      { id: "years", label: "Time frame", type: "number", unit: "years", default: 10, step: 1 },
    ],
    compute: (v) => {
      const total = v.principal * Math.pow(1 + (v.rate / 100) / v.compoundsPerYear, v.compoundsPerYear * v.years);
      const interestEarned = total - v.principal;
      return {
        primary: { label: "Future value", value: `$${round(total, 2).toLocaleString()}` },
        secondary: [
          { l: "Interest earned", v: `$${round(interestEarned, 2).toLocaleString()}` },
          { l: "Principal", v: `$${round(v.principal, 2).toLocaleString()}` },
        ],
        note: "This calculates a single lump-sum deposit with no additional contributions - use the Savings Calculator if you're adding money regularly.",
      };
    },
    faq: [
      { q: "What's the formula for compound interest?", a: "A = P(1 + r/n)^(nt) - where P is principal, r is the annual rate, n is compounds per year, and t is time in years." },
      { q: "How does compounding frequency affect growth?", a: "More frequent compounding (daily vs. annually) produces slightly higher returns at the same stated rate, since interest starts earning interest sooner - though the difference is usually small at typical savings rates." },
      { q: "How much difference does starting a few years earlier make?", a: "A significant one - because growth compounds on itself, money invested 5 or 10 years earlier at the same rate ends up substantially larger, not just proportionally larger, since the earlier contributions have more compounding periods working on them." },
      { q: "Is compound interest always better than simple interest?", a: "Compound interest earns interest on both principal and previously earned interest, so it always outpaces simple interest (which only earns on the original principal) given enough time. The longer the time horizon and the higher the compounding frequency, the bigger the gap becomes." },
    ],
    related: ["savings-calculator", "mortgage-calculator", "loan-calculator", "investment-calculator"],
  },
  {
    id: "sales-tax-calculator",
    category: "finance",
    title: "Sales Tax Calculator",
    keyword: "sales tax calculator",
    description: "Calculate the sales tax and total price on a purchase.",
    intro: "Enter a price and your local sales tax rate to calculate the tax amount and total cost.",
    fields: [
      { id: "price", label: "Price", type: "number", unit: "$", default: 49.99, step: 0.01 },
      { id: "taxRate", label: "Sales tax rate", type: "number", unit: "%", default: 7.25, step: 0.01 },
    ],
    compute: (v) => {
      const tax = v.price * (v.taxRate / 100);
      const total = v.price + tax;
      return {
        primary: { label: "Total with tax", value: `$${round(total, 2)}` },
        secondary: [
          { l: "Tax amount", v: `$${round(tax, 2)}` },
          { l: "Pre-tax price", v: `$${round(v.price, 2)}` },
        ],
      };
    },
    faq: [
      { q: "How do I calculate sales tax on a purchase?", a: "Multiply the price by the tax rate as a decimal, then add that to the original price. For $49.99 at 7.25% tax: $49.99 × 0.0725 = $3.62 tax, for a total of $53.61." },
      { q: "Does sales tax rate vary by location?", a: "Yes - sales tax rates are set by state, county, and sometimes city, so the combined rate can vary significantly even within the same state. Check your local rate before relying on a default." },
      { q: "Is sales tax calculated on the price before or after other discounts?", a: "Sales tax is almost always calculated on the final sale price after discounts are applied, not on the original list price - so apply any discount first, then calculate tax on the reduced amount." },
      { q: "Are groceries and clothing always taxed at the same rate as other purchases?", a: "No - many jurisdictions exempt or reduce the tax rate on groceries, prescription medication, and sometimes clothing, while taxing general merchandise at the standard rate. Check your local tax authority's rules if you're calculating tax for a specific exempt category rather than a general purchase." },
    ],
    related: ["discount-calculator", "tip-calculator", "percentage-calculator"],
  },
  {
    id: "discount-calculator",
    category: "finance",
    title: "Discount Calculator",
    keyword: "discount calculator",
    description: "Calculate the sale price and savings on a discounted item.",
    intro: "Enter the original price and discount percentage to calculate the sale price and how much you're saving.",
    fields: [
      { id: "originalPrice", label: "Original price", type: "number", unit: "$", default: 80, step: 0.01 },
      { id: "discountPercent", label: "Discount", type: "number", unit: "%", default: 25, step: 1 },
    ],
    compute: (v) => {
      const discountAmount = v.originalPrice * (v.discountPercent / 100);
      const salePrice = v.originalPrice - discountAmount;
      return {
        primary: { label: "Sale price", value: `$${round(salePrice, 2)}` },
        secondary: [
          { l: "Amount saved", v: `$${round(discountAmount, 2)}` },
          { l: "Original price", v: `$${round(v.originalPrice, 2)}` },
        ],
      };
    },
    faq: [
      { q: "How do I calculate a sale price from a discount percentage?", a: "Multiply the original price by the discount percentage as a decimal to get the amount saved, then subtract that from the original price. For $80 at 25% off: $80 × 0.25 = $20 saved, for a sale price of $60." },
      { q: "How do I stack multiple discounts?", a: "Apply each discount to the price remaining after the previous one, not to the original price - two 20% discounts stacked equal a 36% total discount, not 40%." },
      { q: "Is a 50% off then an additional 20% off the same as 70% off?", a: "No - stacked discounts multiply, they don't add. 50% off leaves 50%, then another 20% off that leaves 40% of the original price, which is a 60% total discount, not 70%." },
      { q: "How do I calculate the percentage saved if I know the original and sale price?", a: "Subtract the sale price from the original price, divide by the original price, then multiply by 100. A $50 item marked down to $35 saved you $15, and 15/50*100 = 30% off." },
    ],
    related: ["sales-tax-calculator", "tip-calculator", "percentage-calculator"],
  },
  {
    id: "debt-payoff-calculator",
    category: "finance",
    title: "Debt Payoff Calculator",
    keyword: "debt payoff calculator",
    description: "Calculate how long it will take to pay off a debt with fixed monthly payments.",
    intro: "Enter your balance, interest rate, and a fixed monthly payment to see how many months it will take to pay off and how much interest you'll pay.",
    fields: [
      { id: "balance", label: "Current balance", type: "number", unit: "$", default: 8000, step: 100 },
      { id: "rate", label: "Annual interest rate", type: "number", unit: "%", default: 19.99, step: 0.01 },
      { id: "payment", label: "Fixed monthly payment", type: "number", unit: "$", default: 250, step: 10 },
    ],
    compute: (v) => {
      const r = v.rate / 100 / 12;
      const months = r === 0
        ? Math.ceil(v.balance / v.payment)
        : Math.ceil(-Math.log(1 - (v.balance * r) / v.payment) / Math.log(1 + r));
      const totalPaid = v.payment * months;
      return {
        primary: { label: "Months to pay off", value: months },
        secondary: [
          { l: "Total interest paid", v: `$${round(totalPaid - v.balance, 2).toLocaleString()}` },
          { l: "Total paid", v: `$${round(totalPaid, 2).toLocaleString()}` },
        ],
        note: "Assumes a fixed payment each month with no additional charges. Your monthly payment must be greater than the first month's interest for payoff to be possible.",
      };
    },
    faq: [
      { q: "How long will it take to pay off $8,000 at 19.99% with $250/month payments?", a: "About 47 months (just under 4 years), paying roughly $3,750 in total interest on top of the original $8,000 balance." },
      { q: "Why does my payment need to exceed the monthly interest?", a: "If your payment is less than the interest charged that month, the balance grows instead of shrinking - this is why credit cards with low minimum payments can take decades to pay off." },
      { q: "Does paying off the highest-interest debt first save the most money?", a: "Generally yes - this is the 'avalanche' method, and it minimizes total interest paid over time since more of your payment goes toward the balance accruing interest fastest, though some people prefer the 'snowball' method (smallest balance first) for the psychological win of clearing accounts sooner." },
      { q: "What's the difference between the debt snowball and debt avalanche methods?", a: "The snowball method pays off the smallest balance first for quick psychological wins, then rolls that payment into the next-smallest debt; the avalanche method pays off the highest-interest debt first to minimize total interest paid. Avalanche saves more money mathematically, but snowball's early wins help some people stay motivated." },
    ],
    related: ["credit-card-payoff-calculator", "loan-calculator", "compound-interest-calculator"],
  },
  {
    id: "credit-card-payoff-calculator",
    category: "finance",
    title: "Credit Card Payoff Calculator",
    keyword: "credit card payoff calculator",
    description: "See how long a credit card balance takes to pay off with a declining minimum payment.",
    intro: "Enter your balance, APR, and minimum payment structure to see how long it takes to pay off - and how much interest you'll pay - if you only pay the minimum.",
    fields: [
      { id: "balance", label: "Current balance", type: "number", unit: "$", default: 5000, step: 100 },
      { id: "apr", label: "APR", type: "number", unit: "%", default: 22.99, step: 0.01 },
      { id: "basePercent", label: "Minimum payment (% of balance)", type: "number", unit: "%", default: 1, step: 0.5 },
      { id: "minFloor", label: "Minimum payment floor", type: "number", unit: "$", default: 25, step: 5 },
    ],
    compute: (v) => {
      const r = v.apr / 100 / 12;
      let bal = v.balance;
      let months = 0;
      let totalInterest = 0;
      while (bal > 0.01 && months < 600) {
        const interest = bal * r;
        let payment = Math.max(v.minFloor, interest + bal * (v.basePercent / 100));
        payment = Math.min(payment, bal + interest);
        bal = bal + interest - payment;
        totalInterest += interest;
        months++;
      }
      return {
        primary: { label: "Months to pay off (minimum payments only)", value: months >= 600 ? "600+" : months },
        secondary: [
          { l: "Years to pay off", v: round(months / 12, 1) },
          { l: "Total interest paid", v: `$${round(totalInterest, 2).toLocaleString()}` },
        ],
        note: "Minimum payment is modeled as the greater of a flat floor or (interest + a percentage of balance) - the common structure most card issuers use. Actual formulas vary by issuer.",
      };
    },
    faq: [
      { q: "How long does it take to pay off $5,000 in credit card debt with minimum payments?", a: "At 22.99% APR with a typical minimum payment structure (interest + 1% of balance), about 232 months - over 19 years - paying roughly $8,489 in interest on a $5,000 balance." },
      { q: "Why do minimum payments take so long to pay off a balance?", a: "Minimum payments are calculated as a small percentage of the balance, so as the balance shrinks, the required payment shrinks too - most of each payment goes to interest early on, dramatically stretching out payoff time." },
      { q: "Does making more than the minimum payment really make that big a difference?", a: "Yes, dramatically - because minimum payments on revolving credit are often set just above the monthly interest charge, even a modest extra payment each month can cut years off the payoff timeline and save substantial interest." },
      { q: "Does making an extra payment mid-month reduce interest faster than a normal payment?", a: "Yes - credit card interest typically compounds daily on your outstanding balance, so an extra payment made as soon as possible reduces the balance interest accrues on sooner, saving more than the same amount paid at the end of the billing cycle." },
    ],
    related: ["debt-payoff-calculator", "loan-calculator", "savings-calculator"],
  },
  {
    id: "auto-loan-calculator",
    category: "finance",
    title: "Auto Loan Calculator",
    keyword: "auto loan calculator",
    description: "Also works as a car loan, automobile loan, car payment, or auto payment estimator calculator - estimate your monthly car payment, including trade-in value and sales tax.",
    intro: "Enter your vehicle price, trade-in value, down payment, and loan terms to estimate your monthly payment, including sales tax.",
    fields: [
      { id: "vehiclePrice", label: "Vehicle price", type: "number", unit: "$", default: 32000, step: 500 },
      { id: "tradeInValue", label: "Trade-in value", type: "number", unit: "$", default: 5000, step: 500 },
      { id: "downPayment", label: "Down payment", type: "number", unit: "$", default: 2000, step: 500 },
      { id: "salesTaxRate", label: "Sales tax rate", type: "number", unit: "%", default: 6.5, step: 0.1 },
      { id: "rate", label: "Annual interest rate", type: "number", unit: "%", default: 7.5, step: 0.01 },
      { id: "years", label: "Loan term", type: "number", unit: "years", default: 5, step: 1 },
    ],
    compute: (v) => {
      const taxableAmount = v.vehiclePrice - v.tradeInValue;
      const salesTax = taxableAmount * (v.salesTaxRate / 100);
      const amountFinanced = v.vehiclePrice - v.tradeInValue - v.downPayment + salesTax;
      const monthlyRate = v.rate / 100 / 12;
      const n = v.years * 12;
      const payment = monthlyRate === 0
        ? amountFinanced / n
        : (amountFinanced * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      return {
        primary: { label: "Estimated monthly payment", value: `$${round(payment, 2).toLocaleString()}` },
        secondary: [
          { l: "Amount financed", v: `$${round(amountFinanced, 2).toLocaleString()}` },
          { l: "Sales tax", v: `$${round(salesTax, 2).toLocaleString()}` },
        ],
        note: "Most states tax the vehicle price minus trade-in value, not the full purchase price - this varies by state, so confirm your local rule.",
      };
    },
    faq: [
      { q: "How does a trade-in affect my auto loan?", a: "A trade-in reduces both your amount financed and, in most states, the taxable amount - a $5,000 trade-in on a $32,000 car with 6.5% tax saves you $325 in sales tax compared to paying tax on the full price." },
      { q: "Should I finance the sales tax on my car loan?", a: "Many buyers roll sales tax into the loan rather than paying it upfront - this increases your amount financed and total interest paid, but keeps more cash on hand at purchase." },
      { q: "Is it better to put more money down or take a longer loan term?", a: "A larger down payment reduces both your monthly payment and total interest paid, while a longer term only lowers the monthly payment while increasing total interest - a bigger down payment is almost always the better deal if you can afford it." },
      { q: "What's a reasonable loan term for a car purchase?", a: "Shorter terms (36-60 months) mean higher payments but less total interest and less risk of owing more than the car is worth; longer terms (72-84 months) lower the payment but often mean paying significantly more in interest over the life of the loan." },
      { q: "Is a car loan calculator the same as an auto loan calculator?", a: "Yes - \"car loan,\" \"automobile loan,\" and \"auto loan\" all describe the same type of financing, so a car loan calculator, automobile loan calculator, and auto loan calculator are interchangeable names for the same estimate: your monthly payment including trade-in value and sales tax." },
    ],
    related: ["loan-calculator", "sales-tax-calculator", "debt-payoff-calculator"],
  },
  {
    id: "investment-calculator",
    category: "finance",
    title: "Investment Calculator",
    keyword: "investment calculator",
    description: "Estimate the future value of an investment, adjusted for inflation.",
    intro: "Enter your starting investment, monthly contribution, expected return, and inflation rate to see both the nominal and inflation-adjusted future value.",
    fields: [
      { id: "initialInvestment", label: "Starting investment", type: "number", unit: "$", default: 10000, step: 500 },
      { id: "monthlyContribution", label: "Monthly contribution", type: "number", unit: "$", default: 300, step: 25 },
      { id: "annualReturn", label: "Expected annual return", type: "number", unit: "%", default: 7, step: 0.1 },
      { id: "inflationRate", label: "Expected inflation rate", type: "number", unit: "%", default: 3, step: 0.1 },
      { id: "years", label: "Time frame", type: "number", unit: "years", default: 20, step: 1 },
    ],
    compute: (v) => {
      const monthlyReturn = v.annualReturn / 100 / 12;
      const n = v.years * 12;
      const growthFactor = Math.pow(1 + monthlyReturn, n);
      const fvPrincipal = v.initialInvestment * growthFactor;
      const fvContributions = monthlyReturn === 0
        ? v.monthlyContribution * n
        : v.monthlyContribution * ((growthFactor - 1) / monthlyReturn);
      const nominalTotal = fvPrincipal + fvContributions;
      const realTotal = nominalTotal / Math.pow(1 + v.inflationRate / 100, v.years);
      const totalContributed = v.initialInvestment + v.monthlyContribution * n;
      return {
        primary: { label: "Future value (nominal)", value: `$${round(nominalTotal, 2).toLocaleString()}` },
        secondary: [
          { l: "Inflation-adjusted (today's dollars)", v: `$${round(realTotal, 2).toLocaleString()}` },
          { l: "Total contributed", v: `$${round(totalContributed, 2).toLocaleString()}` },
        ],
        note: "Nominal value is what your account balance would show; inflation-adjusted value shows what that amount is actually worth in today's purchasing power.",
      };
    },
    faq: [
      { q: "Why does inflation matter for investment projections?", a: "A dollar in 20 years buys less than a dollar today - showing only the nominal future value overstates how much better off you'll actually be, so adjusting for inflation gives a more honest picture." },
      { q: "What return rate should I use for an investment calculator?", a: "7% is a commonly used long-term average for a diversified stock portfolio after inflation is roughly accounted for in nominal terms, but actual returns vary significantly year to year - use a conservative estimate for planning." },
      { q: "How does contribution frequency affect long-term growth?", a: "More frequent contributions (monthly vs. annually) let your money start compounding sooner on average, which produces a modestly higher final balance for the same total amount contributed over the same period." },
      { q: "What's a realistic average annual return to assume for long-term projections?", a: "Historically, diversified stock market index funds have averaged roughly 7-10% annual returns before inflation over multi-decade periods, though any single year can vary wildly. Using a more conservative estimate (6-7%) for planning purposes accounts for volatility and fees better than assuming a best-case average every year." },
    ],
    related: ["savings-calculator", "compound-interest-calculator", "mortgage-calculator"],
  },

  // ---------------- CONSTRUCTION & HOME ----------------
  {
    id: "concrete-calculator",
    category: "construction",
    title: "Concrete Calculator",
    keyword: "concrete calculator",
    description: "A concrete measurement calculator - estimate cubic yards and bag count for a concrete slab.",
    intro: "Enter the slab dimensions to estimate how much ready-mix concrete or how many bags you'll need, with a waste allowance built in.",
    diagram: { type: "slab", topLabels: ["Length", "Width"], depthLabel: "Thickness" },
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
      { q: "How much concrete do I need for a 10x10 slab?", a: "At 4 inches thick, a 10×10 ft slab needs about 1.23 cubic yards before waste allowance - roughly 74 bags of 80 lb mix." },
      { q: "Why add a waste allowance?", a: "Uneven subgrade, spillage, and over-excavation typically use 5–10% more material than the exact math suggests." },
      { q: "Can I use this for a non-rectangular slab?", a: "Break an irregular shape into rectangular sections, calculate each one separately with this tool, then add the results together - the length × width × thickness math only works cleanly on rectangles, so splitting an L-shaped or curved area into simpler pieces is the standard workaround." },
      { q: "How do I account for slab thickness in the calculation?", a: "Multiply the slab's length by width to get the area, then multiply by the thickness (converted to feet) to get cubic feet, and divide by 27 to get cubic yards. A thicker slab needs proportionally more concrete - doubling the thickness doubles the volume for the same footprint." },
      { q: "Is a concrete measurement calculator different from a concrete calculator?", a: "No - they're the same tool by different names. Both describe estimating how much concrete (cubic yards or bags) a project needs from the slab's length, width, and thickness measurements, which is exactly what this calculator does." },
    ],
    related: ["paint-calculator", "gravel-calculator", "mulch-calculator", "area-converter"],
  },
  {
    id: "paint-calculator",
    category: "construction",
    title: "Paint Calculator",
    keyword: "paint calculator",
    description: "Estimate how many gallons of paint you need for a room.",
    intro: "Enter your wall area and number of coats to estimate gallons of paint needed, based on standard coverage rates.",
    diagram: { type: "area", label: "Wall area" },
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
      { q: "How much paint covers 400 sq ft?", a: "At standard 350 sq ft per gallon coverage, one coat over 400 sq ft needs about 1.14 gallons - round up to be safe." },
      { q: "Should I subtract doors and windows from wall area?", a: "For a rough estimate, no - most painters skip this since the extra paint from not subtracting covers trim work and touch-ups. For large window/door areas, subtracting them can save you from buying more than you need." },
      { q: "How much extra paint should I buy for touch-ups later?", a: "Buy a little more than the calculated amount - rounding up to the next full gallon or quart covers touch-ups and accounts for uneven coverage on textured surfaces." },
      { q: "How many coats of paint does this calculator assume?", a: "This calculator estimates paint needed for two coats, which is standard for most interior and exterior jobs, especially when changing colors significantly. If you're covering a similar color with a single coat, you can roughly halve the estimated paint quantity." },
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
    diagram: { type: "slab", topLabels: ["Bed area"], depthLabel: "Depth" },
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
      { q: "How much mulch do I need for 200 sq ft?", a: "At 3 inches deep, 200 sq ft needs about 1.85 cubic yards before waste allowance - roughly 28 bags of 2 cu ft mulch." },
      { q: "How deep should mulch be?", a: "2–3 inches is standard for most garden beds. Less than 2 inches won't suppress weeds well; more than 4 inches can smother roots and hold too much moisture." },
      { q: "Does mulch depth vary by type of mulch?", a: "Yes - shredded bark and wood chips typically work well at 2-3 inches deep, while finer materials like compost or straw are often applied thinner (1-2 inches) since they break down and compact faster." },
      { q: "How often should mulch be replaced or topped up?", a: "Organic mulch typically breaks down and should be topped up annually, adding just enough to restore the recommended 2-3 inch depth rather than a full fresh layer every year, which can smother plants and cause excess moisture retention around stems." },
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
    diagram: { type: "slab", topLabels: ["Length", "Width"], depthLabel: "Depth" },
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
        note: "Tonnage is based on a typical density of 1.4 tons per cubic yard - this varies by gravel type, so confirm with your supplier for large orders.",
      };
    },
    faq: [
      { q: "How much gravel do I need for a 20x10 driveway?", a: "At 4 inches deep, a 20×10 ft area needs about 2.47 cubic yards before waste allowance - roughly 3.46 tons at typical gravel density." },
      { q: "How many tons is a cubic yard of gravel?", a: "About 1.4 tons per cubic yard for most crushed stone and gravel, though density varies by material - pea gravel and crushed granite can differ slightly." },
      { q: "Should I compact the base layer before adding gravel?", a: "Yes for most projects - a compacted sub-base (often crushed stone) prevents the gravel layer above it from settling unevenly over time, which is especially important under driveways and walkways that see regular weight." },
      { q: "What's the difference between crushed gravel and pea gravel for a driveway base?", a: "Crushed/angular gravel locks together under weight and compacts into a stable base, making it the standard choice for driveways; pea gravel is smooth and rounded, so it shifts underfoot and under vehicle weight, making it better suited for decorative paths than load-bearing surfaces." },
    ],
    related: ["mulch-calculator", "paver-calculator", "concrete-calculator"],
  },
  {
    id: "flooring-calculator",
    category: "construction",
    title: "Flooring Calculator",
    keyword: "flooring calculator",
    description: "Estimate how many boxes of flooring you need for a room.",
    intro: "Enter your room area, coverage per box, and a waste allowance to estimate how many boxes of flooring to buy.",
    diagram: { type: "area", label: "Room area" },
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
      { q: "Why do I need extra flooring for waste?", a: "Cuts around doorways, closets, and pattern matching use extra material - a 10–15% allowance keeps you from running short mid-project." },
      { q: "Does the waste percentage change based on the flooring pattern?", a: "Yes - a straight-lay pattern typically needs only 5-10% extra, while diagonal layouts or patterns requiring precise seam matching (like herringbone) can need 15-20% extra due to more angled cuts and discarded offcuts." },
      { q: "Should I buy extra flooring for future repairs?", a: "Yes - beyond the waste allowance for cutting during installation, many installers recommend keeping one full extra box aside so replacement pieces match the original dye lot if a plank or tile is ever damaged later, since manufacturers change color batches over time." },
    ],
    related: ["paint-calculator", "tile-calculator", "concrete-calculator", "unit-length-converter"],
  },
  {
    id: "drywall-calculator",
    category: "construction",
    title: "Drywall Calculator",
    keyword: "drywall calculator",
    description: "Estimate how many sheets of drywall you need for a wall area.",
    intro: "Enter your total wall area and a waste allowance to estimate how many standard 4×8 drywall sheets to buy.",
    diagram: { type: "area", label: "Wall area" },
    fields: [
      { id: "wallArea", label: "Wall area", type: "number", unit: "sq ft", default: 400, step: 1 },
      { id: "waste", label: "Waste allowance", type: "number", unit: "%", default: 10, step: 1 },
    ],
    compute: (v) => {
      const sheetSize = 32; // standard 4x8 ft sheet = 32 sq ft
      const totalAreaNeeded = v.wallArea * (1 + v.waste / 100);
      const sheets = Math.ceil(totalAreaNeeded / sheetSize);
      return {
        primary: { label: "Sheets needed", value: sheets },
        secondary: [
          { l: "Total area with waste", v: `${round(totalAreaNeeded, 1)} sq ft` },
          { l: "Sheet size", v: "4×8 ft (32 sq ft)" },
        ],
        note: "Based on standard 4×8 ft sheets. Larger sheets (4×10, 4×12) reduce seams but cost more and need more room to maneuver.",
      };
    },
    faq: [
      { q: "How many sheets of drywall do I need for 400 sq ft of wall?", a: "At a 10% waste allowance, 400 sq ft needs about 14 standard 4×8 ft sheets (32 sq ft each)." },
      { q: "Why do I need extra drywall for waste?", a: "Cuts around outlets, corners, doorways, and windows use extra material - a 10% allowance keeps you from running short mid-job." },
      { q: "What size drywall sheets are standard?", a: "4×8 feet (32 sq ft) is the most common size for walls and ceilings, though 4×12 sheets are also used on larger walls to reduce the number of seams - this calculator assumes the standard 4×8 sheet unless you adjust the coverage value." },
      { q: "Should I calculate drywall separately for walls and ceilings?", a: "Yes - ceilings often use thicker or fire-rated drywall in some rooms, and calculating them separately from walls avoids mixing different sheet requirements into one number. Measure ceiling square footage and wall square footage independently, then run each through the calculator." },
    ],
    related: ["paint-calculator", "flooring-calculator", "concrete-calculator", "insulation-calculator"],
  },
  {
    id: "tile-calculator",
    category: "construction",
    title: "Tile Calculator",
    keyword: "tile calculator",
    description: "Estimate how many tiles you need for a room, including grout lines.",
    intro: "Enter your room area, tile size, and grout line width to estimate how many tiles to buy, with a waste allowance built in.",
    diagram: { type: "area", label: "Room area" },
    fields: [
      { id: "roomArea", label: "Room area", type: "number", unit: "sq ft", default: 100, step: 1 },
      { id: "tileLength", label: "Tile length", type: "number", unit: "in", default: 12, step: 0.5 },
      { id: "tileWidth", label: "Tile width", type: "number", unit: "in", default: 12, step: 0.5 },
      { id: "groutLine", label: "Grout line width", type: "number", unit: "in", default: 0.125, step: 0.0625 },
      { id: "waste", label: "Waste allowance", type: "number", unit: "%", default: 10, step: 1 },
    ],
    compute: (v) => {
      const effectiveTileSqFt = ((v.tileLength + v.groutLine) * (v.tileWidth + v.groutLine)) / 144;
      const totalAreaNeeded = v.roomArea * (1 + v.waste / 100);
      const tiles = Math.ceil(totalAreaNeeded / effectiveTileSqFt);
      return {
        primary: { label: "Tiles needed", value: tiles },
        secondary: [
          { l: "Total area with waste", v: `${round(totalAreaNeeded, 1)} sq ft` },
          { l: "Coverage per tile (with grout)", v: `${round(effectiveTileSqFt, 3)} sq ft` },
        ],
        note: "Grout lines add a small amount to each tile's footprint, so tile count is slightly higher than a simple area-divided-by-tile-size estimate.",
      };
    },
    faq: [
      { q: "How many 12x12 tiles do I need for 100 sq ft?", a: "With a 1/8 inch grout line and 10% waste allowance, 100 sq ft needs about 108 tiles." },
      { q: "Why does grout line width affect tile count?", a: "Grout lines add space between tiles, slightly increasing each tile's effective footprint - over a large room this adds up to a few extra tiles beyond a simple area ÷ tile size calculation." },
      { q: "Should I buy extra tile beyond the waste allowance for future repairs?", a: "It's a common practice to keep a few extra tiles from the same production batch/dye lot specifically for future repairs, since tile colors can vary slightly between manufacturing batches and an exact match may not be available later." },
      { q: "Does tile size affect how much waste allowance I should use?", a: "Yes - larger tiles generally need a lower waste percentage since fewer cuts are required for the same area, while smaller tiles, mosaics, or diagonal layouts need a higher waste allowance because more pieces get cut and discarded around edges." },
    ],
    related: ["flooring-calculator", "paint-calculator", "unit-length-converter"],
  },
  {
    id: "roofing-calculator",
    category: "construction",
    title: "Roofing Calculator",
    keyword: "roofing calculator",
    description: "Estimate roofing squares needed from footprint area and roof pitch.",
    intro: "Enter your roof's footprint area and pitch to estimate the actual sloped roof area and how many squares of shingles you'll need.",
    diagram: { type: "area", label: "Roof footprint" },
    fields: [
      { id: "footprintArea", label: "Roof footprint area", type: "number", unit: "sq ft", default: 1500, step: 10 },
      { id: "pitch", label: "Pitch (rise per 12&quot; run)", type: "number", unit: "/12", default: 6, step: 0.5 },
      { id: "waste", label: "Waste allowance", type: "number", unit: "%", default: 10, step: 1 },
    ],
    compute: (v) => {
      const pitchMultiplier = Math.sqrt(1 + Math.pow(v.pitch / 12, 2));
      const actualRoofArea = v.footprintArea * pitchMultiplier;
      const squares = Math.ceil((actualRoofArea * (1 + v.waste / 100)) / 100);
      return {
        primary: { label: "Roofing squares needed", value: squares },
        secondary: [
          { l: "Actual roof area", v: `${round(actualRoofArea, 0)} sq ft` },
          { l: "Pitch multiplier", v: round(pitchMultiplier, 3) },
        ],
        note: "A roofing square covers 100 sq ft. Steeper pitches increase the actual sloped area beyond the flat footprint.",
      };
    },
    faq: [
      { q: "How many squares of shingles do I need for a 1500 sq ft roof with a 6/12 pitch?", a: "A 6/12 pitch increases the flat footprint area by about 11.8% - 1500 sq ft becomes roughly 1677 sq ft of actual roof, or about 19 squares including a 10% waste allowance." },
      { q: "What is a roofing square?", a: "A roofing square is a standard unit equal to 100 sq ft of roof area - shingles and other roofing materials are typically priced and sold by the square." },
      { q: "Why does roof pitch matter for material estimates?", a: "A steeper pitch means more actual roof surface area than the same footprint on a flatter roof, since the roof plane is longer at a steeper angle - this calculator's pitch factor accounts for that difference so the material estimate reflects the true surface, not just the building's footprint." },
      { q: "What's included in a typical roofing material estimate beyond shingles?", a: "Beyond the shingles themselves (measured in squares), a full roofing estimate usually accounts for underlayment, starter strips, ridge cap shingles, and flashing - this calculator estimates the shingle quantity specifically, which is the largest cost component, but always add a margin for these additional materials." },
    ],
    related: ["lumber-calculator", "concrete-calculator", "unit-length-converter"],
  },
  {
    id: "fence-calculator",
    category: "construction",
    title: "Fence Calculator",
    keyword: "fence calculator",
    description: "Estimate how many posts and panels you need for a fence line.",
    intro: "Enter your total fence length and panel width to estimate how many panels and posts to buy.",
    diagram: { type: "fence" },
    fields: [
      { id: "fenceLength", label: "Fence length", type: "number", unit: "ft", default: 100, step: 1 },
      { id: "panelWidth", label: "Panel width", type: "number", unit: "ft", default: 8, step: 0.5 },
    ],
    compute: (v) => {
      const panels = Math.ceil(v.fenceLength / v.panelWidth);
      const posts = panels + 1;
      return {
        primary: { label: "Panels needed", value: panels },
        secondary: [
          { l: "Posts needed", v: posts },
          { l: "Total length covered", v: `${round(panels * v.panelWidth, 1)} ft` },
        ],
        note: "Assumes a straight run. Add extra posts for corners, gates, or line breaks not captured by simple length ÷ panel width.",
      };
    },
    faq: [
      { q: "How many posts do I need for 100 feet of fence?", a: "At 8 ft panel spacing, 100 ft of fence needs 13 panels and 14 posts - one extra post to close both ends of the run." },
      { q: "Why is post count one more than panel count?", a: "Each panel needs a post at both ends, but adjacent panels share a post, so total posts always equal panels plus one for a straight run." },
      { q: "How far apart should fence posts be spaced?", a: "6 to 8 feet apart is typical for most residential fencing, though the exact spacing depends on the panel size you're using and local wind/soil conditions - check your specific fence panel's recommended spacing before finalizing post count." },
      { q: "Does this account for gates in the fence line?", a: "This calculator estimates posts and panels for a continuous fence run; if your fence includes one or more gates, subtract the gate width from the total fence length before calculating, since gates use separate hardware rather than standard panels." },
    ],
    related: ["lumber-calculator", "gravel-calculator", "unit-length-converter"],
  },
  {
    id: "insulation-calculator",
    category: "construction",
    title: "Insulation Calculator",
    keyword: "insulation calculator",
    description: "Estimate bags of blown-in insulation needed to reach a target R-value.",
    intro: "Enter your attic area and target R-value to estimate the required depth and how many bags of insulation to buy.",
    diagram: { type: "area", label: "Attic area" },
    fields: [
      { id: "atticArea", label: "Attic area", type: "number", unit: "sq ft", default: 800, step: 10 },
      { id: "targetRValue", label: "Target R-value", type: "number", default: 49, step: 1 },
      { id: "rValuePerInch", label: "R-value per inch", type: "number", default: 2.5, step: 0.1 },
      { id: "bagYield", label: "Bag yield", type: "number", unit: "cu ft", default: 30, step: 1 },
      { id: "waste", label: "Waste allowance", type: "number", unit: "%", default: 5, step: 1 },
    ],
    compute: (v) => {
      const requiredDepthIn = v.targetRValue / v.rValuePerInch;
      const volumeCuFt = v.atticArea * (requiredDepthIn / 12);
      const bags = Math.ceil((volumeCuFt * (1 + v.waste / 100)) / v.bagYield);
      return {
        primary: { label: "Bags needed", value: bags },
        secondary: [
          { l: "Required depth", v: `${round(requiredDepthIn, 1)} in` },
          { l: "Total volume", v: `${round(volumeCuFt, 0)} cu ft` },
        ],
        note: "R-value per inch and bag yield vary by insulation type - check your product's coverage chart for exact figures before buying.",
      };
    },
    faq: [
      { q: "How many bags of insulation do I need for R-49 in an 800 sq ft attic?", a: "At 2.5 R-value per inch, R-49 needs about 19.6 inches of depth - roughly 46 bags at a 30 cu ft yield per bag, including a 5% waste allowance." },
      { q: "Why does R-value per inch matter?", a: "Different insulation types cover different R-value per inch - fiberglass and cellulose have different coverage charts, so using the wrong figure will throw off your bag count." },
      { q: "What R-value do I need for my attic?", a: "Recommended attic R-values vary by climate zone, generally ranging from R-30 in warmer regions to R-49 or higher in colder ones - check your local building code or the U.S. Department of Energy's zone map for the recommended value in your area." },
      { q: "Does insulation R-value stack if I add a second layer?", a: "Yes - R-values are additive, so adding a layer of R-19 insulation on top of existing R-13 insulation gives a combined R-32. This is a common way to boost attic insulation to current recommended levels without removing the older layer first." },
    ],
    related: ["drywall-calculator", "paint-calculator", "unit-length-converter"],
  },
  {
    id: "lumber-calculator",
    category: "construction",
    title: "Lumber Calculator",
    keyword: "lumber calculator",
    description: "Calculate total board feet needed for a lumber order.",
    intro: "Enter your board dimensions and quantity to calculate total board feet - the standard unit lumber is priced and sold by.",
    diagram: { type: "board" },
    fields: [
      { id: "quantity", label: "Number of boards", type: "number", default: 20, step: 1 },
      { id: "thickness", label: "Thickness", type: "number", unit: "in", default: 1.5, step: 0.25 },
      { id: "width", label: "Width", type: "number", unit: "in", default: 5.5, step: 0.25 },
      { id: "length", label: "Length", type: "number", unit: "ft", default: 8, step: 0.5 },
    ],
    compute: (v) => {
      const boardFeetPerBoard = (v.thickness * v.width * v.length) / 12;
      const totalBoardFeet = boardFeetPerBoard * v.quantity;
      return {
        primary: { label: "Total board feet", value: round(totalBoardFeet, 1) },
        secondary: [
          { l: "Board feet per board", v: round(boardFeetPerBoard, 2) },
        ],
        note: "Board feet = (thickness in × width in × length ft) ÷ 12. Use actual (not nominal) dimensions for accurate results.",
      };
    },
    faq: [
      { q: "How do I calculate board feet?", a: "Multiply thickness in inches × width in inches × length in feet, then divide by 12. A 1.5×5.5×8 ft board (actual dimensions of a nominal 2×6×8) works out to 5.5 board feet." },
      { q: "Why use actual dimensions instead of nominal?", a: "A nominal 2×6 actually measures about 1.5×5.5 inches after milling and drying - using nominal dimensions overstates board feet and your order." },
      { q: "Why is lumber priced and measured in board feet?", a: "A board foot is a volume measurement (12 in × 12 in × 1 in), which lets lumber of different lengths, widths, and thicknesses be compared and priced on a consistent basis - it's more useful than linear feet once boards vary in width or thickness." },
      { q: "Why is a 2x4 not actually 2 inches by 4 inches?", a: "Lumber is named by its nominal (pre-milling) size, but planing and drying reduce the actual finished dimensions - a nominal 2x4 measures about 1.5 by 3.5 inches actual. This calculator uses actual dimensions for board-foot calculations, since that's the real material you're buying." },
    ],
    related: ["fence-calculator", "roofing-calculator", "concrete-calculator"],
  },
  {
    id: "paver-calculator",
    category: "construction",
    title: "Paver Calculator",
    keyword: "paver calculator",
    description: "Estimate how many pavers you need for a patio or walkway.",
    intro: "Enter your area and paver size to estimate how many pavers to buy, with a waste allowance for cuts and breakage.",
    diagram: { type: "area", label: "Patio area" },
    fields: [
      { id: "area", label: "Area", type: "number", unit: "sq ft", default: 200, step: 1 },
      { id: "paverLength", label: "Paver length", type: "number", unit: "in", default: 12, step: 0.5 },
      { id: "paverWidth", label: "Paver width", type: "number", unit: "in", default: 12, step: 0.5 },
      { id: "waste", label: "Waste allowance", type: "number", unit: "%", default: 10, step: 1 },
    ],
    compute: (v) => {
      const paverSqFt = (v.paverLength * v.paverWidth) / 144;
      const totalAreaNeeded = v.area * (1 + v.waste / 100);
      const pavers = Math.ceil(round(totalAreaNeeded / paverSqFt, 6));
      return {
        primary: { label: "Pavers needed", value: pavers },
        secondary: [
          { l: "Total area with waste", v: `${round(totalAreaNeeded, 1)} sq ft` },
          { l: "Coverage per paver", v: `${round(paverSqFt, 3)} sq ft` },
        ],
        note: "Cuts around edges and curves, plus breakage during installation, typically use 10% more pavers than the exact math suggests.",
      };
    },
    faq: [
      { q: "How many 12x12 pavers do I need for 200 sq ft?", a: "At a 10% waste allowance, 200 sq ft needs about 220 pavers of 12×12 inch size." },
      { q: "Why add waste for pavers?", a: "Cuts around edges, curves, and borders - plus occasional breakage during installation - typically use about 10% more pavers than the flat area math suggests." },
      { q: "How much sand or base material do I need under pavers?", a: "A typical base is 4-6 inches of compacted gravel topped with 1 inch of leveling sand, though exact depth depends on soil conditions and whether the area will bear vehicle weight - this calculator estimates paver count only, not base material." },
      { q: "Can this calculator handle an irregular or curved patio shape?", a: "This calculator works from a total square footage figure, so for irregular or curved layouts, break the area into simpler rectangular or triangular sections, calculate each section's square footage separately, add them together, then enter the combined total." },
    ],
    related: ["gravel-calculator", "concrete-calculator", "unit-length-converter"],
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
      { q: "Is BMI accurate for everyone?", a: "No - BMI doesn't distinguish muscle from fat and can be misleading for athletes, older adults, and some body types. It's a screening tool, not a diagnosis." },
      { q: "What counts as a healthy BMI range?", a: "18.5–24.9 is generally classified as the healthy range, under 18.5 as underweight, 25–29.9 as overweight, and 30+ as the obesity range - but these cutoffs are population averages, not individual health verdicts." },
      { q: "Does BMI apply the same way to children as adults?", a: "No - this calculator uses the adult BMI formula and adult healthy-range cutoffs; children and teens need age- and gender-specific growth-chart percentiles instead, since healthy body composition changes significantly throughout childhood development." },
      { q: "How is BMI different from body fat percentage?", a: "BMI only uses height and weight, so it can't distinguish muscle from fat - a very muscular person may show a high BMI without excess body fat. Body fat percentage measures the fat portion of your body directly and gives a more accurate picture of body composition than BMI alone." },
      { q: "How do I compute BMI, and is 'body weight index' the same thing?", a: "To compute BMI by hand: divide your weight in kilograms by your height in meters squared (or use weight in pounds divided by height in inches squared, times 703, as this calculator does). \"Body weight index\" is an informal variant of the same search term - it refers to the same body mass index (BMI) calculation, not a separate metric." },
      { q: "Are 'body index calculator,' 'mass index calculator,' 'biomass index calculator,' 'bio mass index,' and 'corporal mass index' all the same as BMI?", a: "Yes - these are all informal, mistranslated, or misremembered versions of the same search: body mass index (BMI). \"Corporal mass index\" is a direct translation from Spanish/Portuguese (\"índice de masa corporal\"/\"índice de massa corporal\"). This calculator computes standard BMI from height and weight, regardless of which of these phrasings you used to find it." },
    ],
    related: ["body-fat-calculator", "calorie-calculator", "pace-calculator", "water-intake-calculator"],
  },
  {
    id: "bmr-calculator",
    category: "health",
    title: "BMR Calculator",
    keyword: "bmr calculator",
    description: "Calculate your basal metabolic rate - the calories your body burns at rest.",
    intro: "Enter your age, gender, height, and weight to estimate your basal metabolic rate (BMR) using the Mifflin-St Jeor formula.",
    fields: [
      { id: "gender", label: "Gender", type: "select", options: [{ v: "male", l: "Male" }, { v: "female", l: "Female" }], default: "male" },
      { id: "age", label: "Age", type: "number", unit: "years", default: 30, step: 1 },
      { id: "heightIn", label: "Height", type: "number", unit: "inches", default: 70, step: 0.1 },
      { id: "weightLb", label: "Weight", type: "number", unit: "lb", default: 180, step: 0.1 },
    ],
    compute: (v) => {
      const weightKg = v.weightLb * 0.453592;
      const heightCm = v.heightIn * 2.54;
      const bmr = v.gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * v.age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * v.age - 161;
      return {
        primary: { label: "BMR (calories/day at rest)", value: round(bmr, 0) },
        secondary: [{ l: "Formula used", v: "Mifflin-St Jeor" }],
        note: "BMR is the energy your body burns at complete rest. Use the Calorie Calculator to factor in activity level for your total daily calorie needs.",
      };
    },
    faq: [
      { q: "What is BMR?", a: "Basal metabolic rate is the number of calories your body burns at complete rest just to maintain vital functions like breathing and circulation - it doesn't include any activity." },
      { q: "How accurate is the Mifflin-St Jeor formula?", a: "It's considered one of the more accurate BMR formulas for the general population, typically within about 10% of measured values, though individual metabolism varies with muscle mass and other factors." },
      { q: "Does BMR change as I age?", a: "Yes - BMR gradually declines with age, largely due to a natural decrease in muscle mass over time, which is part of why calorie needs often trend down in later adulthood even at the same activity level." },
      { q: "Should I eat at exactly my BMR calorie level?", a: "No - BMR is the minimum energy your body needs at complete rest, not a healthy target to eat at. Eating below BMR for extended periods can slow metabolism and cause muscle loss; use your BMR as a baseline and add your activity level to find an appropriate maintenance or deficit target." },
    ],
    related: ["calorie-calculator", "body-fat-calculator", "bmi-calculator"],
  },
  {
    id: "calorie-calculator",
    category: "health",
    title: "Calorie Calculator",
    keyword: "calorie calculator",
    description: "Calculate your daily calorie needs to maintain, lose, or gain weight.",
    intro: "Enter your age, gender, height, weight, and activity level to estimate your daily calorie needs for maintaining, losing, or gaining weight.",
    fields: [
      { id: "gender", label: "Gender", type: "select", options: [{ v: "male", l: "Male" }, { v: "female", l: "Female" }], default: "male" },
      { id: "age", label: "Age", type: "number", unit: "years", default: 30, step: 1 },
      { id: "heightIn", label: "Height", type: "number", unit: "inches", default: 70, step: 0.1 },
      { id: "weightLb", label: "Weight", type: "number", unit: "lb", default: 180, step: 0.1 },
      { id: "activityLevel", label: "Activity level", type: "select", options: [
        { v: "sedentary", l: "Sedentary (little to no exercise)" },
        { v: "light", l: "Light (exercise 1-3 days/week)" },
        { v: "moderate", l: "Moderate (exercise 3-5 days/week)" },
        { v: "active", l: "Active (exercise 6-7 days/week)" },
        { v: "veryActive", l: "Very active (hard exercise daily)" },
      ], default: "moderate" },
    ],
    compute: (v) => {
      const weightKg = v.weightLb * 0.453592;
      const heightCm = v.heightIn * 2.54;
      const bmr = v.gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * v.age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * v.age - 161;
      const multipliers = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
      const maintenance = bmr * multipliers[v.activityLevel];
      return {
        primary: { label: "Maintenance calories/day", value: round(maintenance, 0) },
        secondary: [
          { l: "To lose weight (~1 lb/week)", v: round(maintenance - 500, 0) },
          { l: "To gain weight (~1 lb/week)", v: round(maintenance + 500, 0) },
        ],
        note: "Based on the Mifflin-St Jeor formula for BMR, scaled by activity level. A 500-calorie daily deficit or surplus roughly corresponds to 1 lb of change per week.",
      };
    },
    faq: [
      { q: "How many calories do I need to maintain my weight?", a: "It depends on your BMR and activity level - for a 30-year-old, 5'10\", 180 lb male at moderate activity, maintenance is roughly 2,763 calories per day." },
      { q: "How many calories should I cut to lose weight?", a: "A deficit of about 500 calories per day below maintenance is a common target for roughly 1 lb of weight loss per week, since 1 lb of body fat is approximately 3,500 calories." },
      { q: "Why do two people with the same age, height, and weight get different results?", a: "Activity level and gender both factor into the formula - a more active lifestyle raises the calorie target substantially above someone sedentary at the same stats, and the underlying BMR formula also accounts for typical differences in body composition between men and women." },
      { q: "What's the difference between BMR and the calorie target this tool gives me?", a: "BMR is the energy your body burns at complete rest; this calculator's maintenance number - your Total Daily Energy Expenditure (TDEE) - adds your activity level on top of BMR, since daily movement and exercise burn additional calories beyond what your body needs just to function." },
    ],
    related: ["bmr-calculator", "body-fat-calculator", "bmi-calculator"],
  },
  {
    id: "body-fat-calculator",
    category: "health",
    title: "Body Fat Calculator",
    keyword: "body fat calculator",
    description: "Estimate your body fat percentage using the U.S. Navy circumference method.",
    intro: "Enter your height and body measurements to estimate your body fat percentage using the U.S. Navy method.",
    fields: [
      { id: "gender", label: "Gender", type: "select", options: [{ v: "male", l: "Male" }, { v: "female", l: "Female" }], default: "male" },
      { id: "heightIn", label: "Height", type: "number", unit: "inches", default: 70, step: 0.1 },
      { id: "neckIn", label: "Neck circumference", type: "number", unit: "inches", default: 15, step: 0.1 },
      { id: "waistIn", label: "Waist circumference", type: "number", unit: "inches", default: 34, step: 0.1 },
      { id: "hipIn", label: "Hip circumference (women only)", type: "number", unit: "inches", default: 40, step: 0.1 },
    ],
    compute: (v) => {
      const bodyFat = v.gender === "male"
        ? 86.010 * Math.log10(v.waistIn - v.neckIn) - 70.041 * Math.log10(v.heightIn) + 36.76
        : 163.205 * Math.log10(v.waistIn + v.hipIn - v.neckIn) - 97.684 * Math.log10(v.heightIn) - 78.387;
      return {
        primary: { label: "Estimated body fat", value: `${round(bodyFat, 1)}%` },
        secondary: [{ l: "Method", v: "U.S. Navy circumference formula" }],
        note: "The U.S. Navy method is an estimate based on body circumference, not a direct measurement - it's typically within a few percentage points of more precise methods like DEXA scans.",
      };
    },
    faq: [
      { q: "How accurate is the U.S. Navy body fat method?", a: "It's generally within 3–4% of more precise methods like DEXA scans for most body types, making it a reasonably reliable estimate without special equipment." },
      { q: "Why does the formula use neck and waist measurements?", a: "The Navy method correlates body fat with the ratio between waist (and hip, for women) circumference relative to neck circumference and height - larger waist-to-neck ratios generally indicate higher body fat." },
      { q: "How does the U.S. Navy method compare to other body fat measurement methods?", a: "It's less precise than methods like DEXA scans or hydrostatic weighing, but it's far more accessible since it only needs a tape measure - it's generally considered reasonably accurate for tracking trends over time, even if the absolute number carries more error than a clinical method." },
      { q: "Can I use the U.S. Navy method to track progress over time?", a: "Yes - because it only requires a tape measure and no special equipment, it's a practical way to track relative body composition changes over weeks or months, even though its absolute accuracy is lower than methods like DEXA scans for any single measurement." },
    ],
    related: ["bmi-calculator", "calorie-calculator", "bmr-calculator", "ideal-weight-calculator"],
  },
  {
    id: "macro-calculator",
    category: "health",
    title: "Macro Calculator",
    keyword: "macro calculator",
    description: "Split your daily calorie target into protein, fat, and carb grams.",
    intro: "Enter your daily calorie target and a macro split to see your protein, fat, and carb targets in grams.",
    fields: [
      { id: "dailyCalories", label: "Daily calories", type: "number", unit: "cal", default: 2500, step: 10 },
      { id: "proteinPercent", label: "Protein", type: "number", unit: "%", default: 30, step: 1 },
      { id: "fatPercent", label: "Fat", type: "number", unit: "%", default: 30, step: 1 },
      { id: "carbPercent", label: "Carbs", type: "number", unit: "%", default: 40, step: 1 },
    ],
    compute: (v) => {
      const proteinGrams = (v.dailyCalories * v.proteinPercent / 100) / 4;
      const fatGrams = (v.dailyCalories * v.fatPercent / 100) / 9;
      const carbGrams = (v.dailyCalories * v.carbPercent / 100) / 4;
      return {
        primary: { label: "Protein", value: `${round(proteinGrams, 0)}g` },
        secondary: [
          { l: "Fat", v: `${round(fatGrams, 0)}g` },
          { l: "Carbs", v: `${round(carbGrams, 0)}g` },
        ],
        note: "Protein and carbs provide 4 calories per gram; fat provides 9 calories per gram. Adjust the percentage split to match your goals - percentages should sum to 100%.",
      };
    },
    faq: [
      { q: "How do I convert macro percentages to grams?", a: "Multiply your daily calories by the macro's percentage, then divide by its calories per gram - 4 for protein and carbs, 9 for fat. At 2,500 calories with a 30/30/40 split: 188g protein, 83g fat, 250g carbs." },
      { q: "What's a good macro split for weight loss?", a: "A higher-protein split (30-40% protein) is common for weight loss to help preserve muscle mass, but the right split depends on your activity level, goals, and personal preference - there's no single universal ratio." },
      { q: "Should my macro split change based on my goal?", a: "Yes - a higher protein percentage is common when the goal is muscle retention during a calorie deficit, while a higher carbohydrate percentage often suits endurance training, so the ideal split shifts depending on whether you're cutting, maintaining, or focused on performance." },
      { q: "Do macro targets change based on activity level, not just calorie goals?", a: "Yes - protein needs generally scale with body weight and activity level regardless of whether you're cutting or maintaining, while carbohydrate needs rise with training volume since carbs fuel intense exercise. Two people with the same calorie target can have different ideal macro splits based on how active they are." },
    ],
    related: ["calorie-calculator", "bmr-calculator", "one-rep-max-calculator"],
  },
  {
    id: "water-intake-calculator",
    category: "health",
    title: "Water Intake Calculator",
    keyword: "water intake calculator",
    description: "Estimate your daily water intake target based on body weight and activity.",
    intro: "Enter your body weight and daily exercise minutes to estimate how much water you should drink per day.",
    fields: [
      { id: "weightLb", label: "Weight", type: "number", unit: "lb", default: 180, step: 1 },
      { id: "activityMinutes", label: "Daily exercise", type: "number", unit: "minutes", default: 30, step: 5 },
    ],
    compute: (v) => {
      const baseOz = v.weightLb * 0.5;
      const activityOz = Math.floor(v.activityMinutes / 30) * 12;
      const totalOz = baseOz + activityOz;
      const totalLiters = totalOz * 0.0295735;
      return {
        primary: { label: "Daily water target", value: `${round(totalOz, 1)} oz` },
        secondary: [
          { l: "Liters", v: round(totalLiters, 2) },
          { l: "Cups (8 oz)", v: round(totalOz / 8, 1) },
        ],
        note: "Based on a common rule of thumb: half your body weight in ounces, plus 12 oz for every 30 minutes of exercise. Individual needs vary with climate, health conditions, and diet.",
      };
    },
    faq: [
      { q: "How much water should I drink based on my weight?", a: "A common guideline is half your body weight in pounds, converted to ounces - a 180 lb person would target about 90 oz per day before accounting for exercise." },
      { q: "Does exercise increase how much water I need?", a: "Yes - sweat losses during exercise increase your fluid needs. This calculator adds roughly 12 oz for every 30 minutes of activity as a general estimate." },
      { q: "Does this account for water from food, not just drinks?", a: "No - this estimates fluid intake from drinking specifically; roughly 20% of daily water intake typically comes from food, so your actual total hydration needs are somewhat lower than the drinking-only figure this calculator returns." },
      { q: "Do coffee and tea count toward daily water intake?", a: "Yes, in moderation - while caffeine has a mild diuretic effect, research shows moderate coffee and tea consumption still contributes net hydration rather than causing dehydration. Water remains the most reliable source, but you don't need to exclude other beverages entirely from your daily total." },
    ],
    related: ["calorie-calculator", "bmi-calculator", "bmr-calculator"],
  },
  {
    id: "one-rep-max-calculator",
    category: "health",
    title: "One Rep Max Calculator",
    keyword: "one rep max calculator",
    description: "Estimate your one-rep max from a weight and rep count using the Epley formula.",
    intro: "Enter the weight you lifted and how many reps you completed to estimate your one-rep max (1RM).",
    fields: [
      { id: "weightLifted", label: "Weight lifted", type: "number", unit: "lb", default: 185, step: 5 },
      { id: "reps", label: "Reps completed", type: "number", default: 5, step: 1, min: 1 },
    ],
    compute: (v) => {
      const oneRepMax = v.weightLifted * (1 + v.reps / 30);
      return {
        primary: { label: "Estimated one-rep max", value: `${round(oneRepMax, 1)} lb` },
        secondary: [
          { l: "90% of 1RM", v: `${round(oneRepMax * 0.9, 0)} lb` },
          { l: "80% of 1RM", v: `${round(oneRepMax * 0.8, 0)} lb` },
        ],
        note: "Uses the Epley formula, most accurate for rep ranges under about 10. Higher rep sets produce less reliable 1RM estimates.",
      };
    },
    faq: [
      { q: "What's the formula for estimating one-rep max?", a: "The Epley formula: 1RM = weight × (1 + reps ÷ 30). Lifting 185 lb for 5 reps estimates a one-rep max of about 216 lb." },
      { q: "Why use percentages of 1RM for training?", a: "Training programs often prescribe a percentage of your 1RM (like 80% for strength work) to target specific adaptations - knowing your estimated max lets you calculate the right weight for any given percentage." },
      { q: "How accurate are 1RM formulas for very low or very high rep counts?", a: "They're most accurate in the 2-10 rep range - estimates from sets of 1-2 reps are close to the true max by definition, but formulas become progressively less reliable above about 12 reps, since fatigue and endurance start to matter more than pure strength." },
      { q: "Should I test my actual 1RM or rely on the calculated estimate?", a: "For most training purposes, a calculated estimate from a lower-rep set is safer and sufficient, since testing a true 1RM carries higher injury risk and requires a proper warm-up and spotter. Estimates are most accurate in the 3-8 rep range and less reliable below 3 or above 12 reps." },
    ],
    related: ["macro-calculator", "bmr-calculator", "pace-calculator"],
  },
  {
    id: "heart-rate-zone-calculator",
    category: "health",
    title: "Heart Rate Zone Calculator",
    keyword: "heart rate zone calculator",
    description: "Calculate your maximum heart rate and target training zones by age.",
    intro: "Enter your age to calculate your estimated maximum heart rate and target zones for different training intensities.",
    fields: [
      { id: "age", label: "Age", type: "number", unit: "years", default: 30, step: 1 },
    ],
    compute: (v) => {
      const maxHR = 220 - v.age;
      const zone = (lo, hi) => `${round(maxHR * lo, 0)}–${round(maxHR * hi, 0)} bpm`;
      return {
        primary: { label: "Estimated max heart rate", value: `${maxHR} bpm` },
        secondary: [
          { l: "Fat-burn zone (60–70%)", v: zone(0.6, 0.7) },
          { l: "Anaerobic zone (80–90%)", v: zone(0.8, 0.9) },
        ],
        note: "Based on the common 220 minus age formula. This is a population estimate - individual max heart rate can vary by 10-20 bpm, so use a fitness tracker's measured value if available.",
      };
    },
    faq: [
      { q: "How do I calculate my maximum heart rate?", a: "The most common estimate is 220 minus your age - for a 30-year-old, that's 190 bpm. It's a population average, not a precise individual measurement." },
      { q: "What heart rate zone should I train in to burn fat?", a: "The 60-70% zone of your max heart rate is often called the 'fat-burn' zone - for a 30-year-old with a 190 bpm max, that's roughly 114-133 bpm. Higher zones burn more total calories despite a lower fat percentage." },
      { q: "Why use the Karvonen formula instead of just a percentage of max heart rate?", a: "The Karvonen formula factors in your resting heart rate, which accounts for individual fitness differences - two people with the same max heart rate but very different resting heart rates will get more personalized, accurate training zones from Karvonen than from a simple percentage of max alone." },
      { q: "Do heart rate zones need to be adjusted for medication like beta-blockers?", a: "Yes - beta-blockers and some other heart medications lower resting and maximum heart rate, which makes standard age-based formulas inaccurate. If you take heart-affecting medication, consult a doctor for a more accurate maximum heart rate before using zone-based training targets." },
    ],
    related: ["pace-calculator", "bmr-calculator", "one-rep-max-calculator"],
  },
  {
    id: "ideal-weight-calculator",
    category: "health",
    title: "Ideal Weight Calculator",
    keyword: "ideal weight calculator",
    description: "Estimate a healthy target weight based on height and gender.",
    intro: "Enter your height and gender to estimate an ideal body weight range using the Devine formula.",
    fields: [
      { id: "gender", label: "Gender", type: "select", options: [{ v: "male", l: "Male" }, { v: "female", l: "Female" }], default: "male" },
      { id: "heightIn", label: "Height", type: "number", unit: "inches", default: 70, step: 0.1 },
    ],
    compute: (v) => {
      const inchesOver5ft = v.heightIn - 60;
      const ibwKg = v.gender === "male"
        ? 50 + 2.3 * inchesOver5ft
        : 45.5 + 2.3 * inchesOver5ft;
      const ibwLb = ibwKg * 2.20462;
      return {
        primary: { label: "Estimated ideal weight", value: `${round(ibwLb, 1)} lb` },
        secondary: [{ l: "Formula used", v: "Devine formula" }],
        note: "The Devine formula was originally developed for medication dosing, not fitness goals - it's a rough reference point, not a target you need to hit. Frame size and muscle mass aren't accounted for.",
      };
    },
    faq: [
      { q: "How is ideal body weight calculated?", a: "The Devine formula starts at a base weight for 5 feet of height (50 kg for men, 45.5 kg for women) and adds 2.3 kg for each inch over 5 feet - a 5'10\" man works out to about 161 lb." },
      { q: "Is the Devine formula a good weight-loss target?", a: "Not necessarily - it doesn't account for muscle mass, frame size, or individual body composition, so it's better used as a rough medical reference than a personal fitness goal." },
      { q: "Why do ideal weight formulas differ from healthy BMI ranges?", a: "Ideal weight formulas like Devine were originally developed for medical dosing calculations, not as fitness or aesthetic targets, and they don't account for muscle mass or frame size the way a BMI range or body composition assessment might - they're a rough reference point, not a strict target." },
      { q: "Why do different ideal weight formulas (Devine, Robinson, Hamwi) give different results?", a: "Each formula was developed from different population samples and study periods, so they weight height and frame size slightly differently. The results typically fall within a few pounds of each other, and none of them should be treated as a precise target - they're rough reference points, not medical prescriptions." },
    ],
    related: ["bmi-calculator", "body-fat-calculator", "calorie-calculator"],
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
      { q: "How do I convert pace to speed?", a: "Divide 60 by your pace in minutes per mile (or km) to get mph (or km/h). A 9:00/mile pace is 60 ÷ 9 ≈ 6.7 mph." },
      { q: "How do I use pace to predict a race finish time?", a: "Multiply your per-mile or per-km pace by the total race distance - if your training pace is 9:00/mile, a 13.1-mile half marathon at that same pace would finish in roughly 1:58:00, though most runners' actual race pace differs somewhat from training pace." },
      { q: "What pace do I need to run a sub-2-hour half marathon?", a: "A sub-2-hour half marathon (13.1 miles) requires an average pace of about 9:09 per mile or faster. This calculator converts between total time, distance, and pace, so you can plug in any race distance and target time to find the required pace." },
    ],
    related: ["bmi-calculator", "heart-rate-zone-calculator", "days-until-calculator"],
  },

  // ---------------- DATE & TIME ----------------
  {
    id: "days-until-calculator",
    category: "datetime",
    title: "How Many Days Until Calculator",
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
      { q: "Does this count weekends and holidays?", a: "Yes - this counts every calendar day, including weekends and holidays. If you need business-day-only counts (excluding weekends), use the Business Days Calculator instead." },
      { q: "Can I calculate the days between two future dates, not just from today?", a: "Yes, indirectly - this tool anchors to today, but the Date Duration Calculator lets you pick any two arbitrary dates (past, present, or future) and returns the exact number of days between them." },
      { q: "Can I use this to count down to a recurring event like a birthday?", a: "Yes - enter next year's date for a birthday or anniversary that's already passed this year, and the calculator will show the exact number of days until that upcoming occurrence." },
    ],
    related: ["date-duration-calculator", "age-calculator", "pace-calculator"],
  },
  {
    id: "date-duration-calculator",
    category: "datetime",
    title: "Date Duration Calculator",
    keyword: "date calculator",
    description: "Calculate the number of days, weeks, months, and years between two dates.",
    intro: "This date calculator finds the exact duration between a start and end date - in days, weeks, months, and years.",
    fields: [
      { id: "startDate", label: "Start date", type: "date", default: "2024-01-01" },
      { id: "endDate", label: "End date", type: "date", default: "2024-12-31" },
    ],
    compute: (v) => {
      const start = new Date(v.startDate);
      const end = new Date(v.endDate);
      const diffDays = Math.round((end - start) / 86400000);
      return {
        primary: { label: "Days between", value: Math.abs(diffDays) },
        secondary: [
          { l: "Weeks", v: round(Math.abs(diffDays) / 7, 1) },
          { l: "Months (approx.)", v: round(Math.abs(diffDays) / 30.44, 1) },
          { l: "Years (approx.)", v: round(Math.abs(diffDays) / 365.25, 2) },
        ],
        note: diffDays < 0 ? "The end date is before the start date." : undefined,
      };
    },
    faq: [
      { q: "How many days are between January 1 and December 31, 2024?", a: "365 days - 2024 is a leap year, but since the range doesn't cross into a new year past the leap day cutoff for this specific pair of dates, the count is a standard 365." },
      { q: "Does this calculator count the start or end date?", a: "It counts the number of full days elapsed between the two dates - the start date itself is day zero, not day one." },
      { q: "Does this account for leap years?", a: "Yes - it works directly from real calendar dates rather than assuming a fixed 365-day year, so a February 29 falling between your start and end date is counted correctly without any extra adjustment." },
      { q: "Can this calculate duration in months and days, not just total days?", a: "Yes - alongside the total number of days between two dates, this calculator breaks the duration down into years, months, and days, which is more intuitive for spans longer than a few weeks than a single large day count." },
    ],
    related: ["days-until-calculator", "business-days-calculator", "age-calculator"],
  },
  {
    id: "business-days-calculator",
    category: "datetime",
    title: "Business Days Calculator",
    keyword: "business days calculator",
    description: "Count the number of weekdays between two dates.",
    intro: "Enter a start and end date to count the number of business days (Monday through Friday) between them.",
    fields: [
      { id: "startDate", label: "Start date", type: "date", default: "2024-01-01" },
      { id: "endDate", label: "End date", type: "date", default: "2024-01-31" },
    ],
    compute: (v) => {
      const start = new Date(v.startDate);
      const end = new Date(v.endDate);
      let businessDays = 0;
      const totalDays = Math.round(Math.abs(end - start) / 86400000) + 1;
      const cursor = new Date(Math.min(start, end));
      const last = new Date(Math.max(start, end));
      while (cursor <= last) {
        const day = cursor.getDay();
        if (day !== 0 && day !== 6) businessDays++;
        cursor.setDate(cursor.getDate() + 1);
      }
      return {
        primary: { label: "Business days", value: businessDays },
        secondary: [
          { l: "Total calendar days", v: totalDays },
          { l: "Weekend days", v: totalDays - businessDays },
        ],
        note: "Counts Monday through Friday only - this doesn't exclude public holidays, so subtract those separately if needed.",
      };
    },
    faq: [
      { q: "How many business days are in January 2024?", a: "23 business days between January 1 and January 31, 2024 - the month has 31 calendar days, 8 of which fall on a weekend." },
      { q: "Does this include public holidays?", a: "No - this calculator only excludes Saturdays and Sundays. Public holidays vary by country and organization, so subtract any that apply to your situation separately." },
      { q: "Can this account for a custom work week (not Monday-Friday)?", a: "This calculator assumes the standard Monday-through-Friday work week; if your business operates on a different schedule (e.g., Sunday-Thursday), you'd need to manually adjust the count for the days that differ from the standard assumption." },
      { q: "How does this handle a business day count that crosses a weekend?", a: "Weekends are automatically excluded from the count - if you start on a Thursday and need 5 business days, the calculator skips the intervening Saturday and Sunday and lands on the following Thursday, rather than counting them as business days." },
    ],
    related: ["date-duration-calculator", "days-until-calculator", "time-duration-calculator"],
  },
  {
    id: "time-duration-calculator",
    category: "datetime",
    title: "Time Duration Calculator",
    keyword: "time duration calculator",
    description: "Calculate the duration between two times of day, including overnight spans.",
    intro: "Enter a start and end time to calculate the duration between them, in hours and minutes.",
    fields: [
      { id: "startHour", label: "Start hour", type: "number", default: 9, step: 1, min: 0, max: 23 },
      { id: "startMinute", label: "Start minute", type: "number", default: 0, step: 1, min: 0, max: 59 },
      { id: "endHour", label: "End hour", type: "number", default: 17, step: 1, min: 0, max: 23 },
      { id: "endMinute", label: "End minute", type: "number", default: 30, step: 1, min: 0, max: 59 },
    ],
    compute: (v) => {
      const startTotal = v.startHour * 60 + v.startMinute;
      let endTotal = v.endHour * 60 + v.endMinute;
      let diffMin = endTotal - startTotal;
      let overnight = false;
      if (diffMin < 0) {
        diffMin += 1440;
        overnight = true;
      }
      const hours = Math.floor(diffMin / 60);
      const minutes = diffMin % 60;
      return {
        primary: { label: "Duration", value: `${hours}h ${minutes}m` },
        secondary: [
          { l: "Total minutes", v: diffMin },
          { l: "Total hours (decimal)", v: round(diffMin / 60, 2) },
        ],
        note: overnight ? "The end time is earlier than the start time, so this spans past midnight into the next day." : undefined,
      };
    },
    faq: [
      { q: "How many hours between 9:00 AM and 5:30 PM?", a: "8 hours and 30 minutes - a common full work day with a half-hour beyond the standard 8-hour shift." },
      { q: "What happens if the end time is earlier than the start time?", a: "The calculator assumes the span crosses midnight into the next day - for example, 10 PM to 6 AM is treated as an 8-hour overnight duration, not a negative number." },
      { q: "How do I calculate duration across a time zone change?", a: "This calculator assumes both times are in the same time zone; if you're comparing times across zones, convert both to the same time zone first (e.g., using a time zone converter), then calculate the duration between the converted times." },
      { q: "Can I calculate duration in decimal hours instead of hours and minutes?", a: "Yes - alongside the hours-and-minutes breakdown, this calculator shows the total duration as a decimal (e.g., 7 hours 30 minutes displays as 7.5 hours), which is useful for timesheets and billing that require decimal time entries." },
    ],
    related: ["business-days-calculator", "date-duration-calculator", "pace-calculator"],
  },
  {
    id: "week-number-calculator",
    category: "datetime",
    title: "Week Number Calculator",
    keyword: "week number calculator",
    description: "Find the ISO week number for any date.",
    intro: "Enter a date to find its ISO week number - the standard system used by businesses, schedules, and international standards.",
    fields: [
      { id: "date", label: "Date", type: "date", default: "2024-06-15" },
    ],
    compute: (v) => {
      const [y, m, d] = v.date.split("-").map(Number);
      const date = new Date(Date.UTC(y, m - 1, d));
      const dayNum = date.getUTCDay() || 7;
      date.setUTCDate(date.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
      const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
      return {
        primary: { label: "ISO week number", value: weekNo },
        secondary: [{ l: "ISO week year", v: date.getUTCFullYear() }],
        note: "Uses the ISO 8601 standard, where week 1 is the week containing the year's first Thursday. This can differ from a simple 'days since Jan 1' count near year boundaries.",
      };
    },
    faq: [
      { q: "What week number is June 15, 2024?", a: "Week 24 of 2024, using the ISO 8601 standard where weeks start on Monday." },
      { q: "Why does ISO week numbering matter?", a: "ISO 8601 week numbers are used widely in business, manufacturing, and international scheduling because they give every week a consistent, unambiguous number that doesn't reset awkwardly mid-week at year boundaries." },
      { q: "Does every year have exactly 52 weeks?", a: "No - the ISO week-numbering system means most years have 52 weeks, but years where January 1 falls on a Thursday (or it's a leap year starting on Wednesday) get a 53rd week, since ISO weeks are defined by whole Monday-to-Sunday periods within the year." },
      { q: "Why do some calendars show week 53 for a year?", a: "A year has 52 weeks plus one or two extra days, and under the ISO week-numbering standard, those leftover days sometimes form a 53rd week - this happens in years where January 1st falls on a Thursday, or in leap years where it falls on a Wednesday." },
    ],
    related: ["date-duration-calculator", "day-of-week-calculator", "leap-year-calculator"],
  },
  {
    id: "day-of-week-calculator",
    category: "datetime",
    title: "Day of the Week Calculator",
    keyword: "day of the week calculator",
    description: "Find what day of the week any date falls on.",
    intro: "Enter a date to find out what day of the week it falls on - past, present, or future.",
    fields: [
      { id: "date", label: "Date", type: "date", default: "2000-01-01" },
    ],
    compute: (v) => {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const [y, m, d] = v.date.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      return {
        primary: { label: "Day of the week", value: dayNames[dateObj.getDay()] },
        secondary: [],
      };
    },
    faq: [
      { q: "What day of the week was January 1, 2000?", a: "Saturday. The new millennium began on a Saturday." },
      { q: "How is the day of the week calculated for any date?", a: "It follows the standard Gregorian calendar's repeating 7-day cycle, accounting for leap years - the same logic your phone or computer's calendar app uses internally." },
      { q: "Can this calculate the day of the week for historical dates, like the 1800s?", a: "Yes - the underlying calculation works directly from the Gregorian calendar's date rules, so it correctly returns the day of the week for any valid date, whether decades in the past or far in the future." },
      { q: "Does this work for dates before the Gregorian calendar was adopted?", a: "This calculator uses the proleptic Gregorian calendar, which extends today's calendar rules backward in time - accurate for most modern historical purposes, but note that many countries didn't switch from the Julian calendar until the 1500s-1700s, so real historical records from that period may use a different day count." },
    ],
    related: ["week-number-calculator", "date-duration-calculator", "leap-year-calculator"],
  },
  {
    id: "leap-year-calculator",
    category: "datetime",
    title: "Leap Year Calculator",
    keyword: "leap year calculator",
    description: "Check whether a year is a leap year and find the next one.",
    intro: "Enter a year to check whether it's a leap year and find the next leap year after it.",
    fields: [
      { id: "year", label: "Year", type: "number", default: 2024, step: 1 },
    ],
    compute: (v) => {
      const isLeap = (v.year % 4 === 0 && v.year % 100 !== 0) || v.year % 400 === 0;
      let next = v.year + 1;
      while (!((next % 4 === 0 && next % 100 !== 0) || next % 400 === 0)) next++;
      return {
        primary: { label: "Is it a leap year?", value: isLeap ? "Yes" : "No" },
        secondary: [
          { l: "Days in this year", v: isLeap ? 366 : 365 },
          { l: "Next leap year", v: next },
        ],
      };
    },
    faq: [
      { q: "Is 2024 a leap year?", a: "Yes - 2024 is divisible by 4 and not a century year, so it's a leap year with 366 days. The next leap year after 2024 is 2028." },
      { q: "What's the rule for leap years?", a: "A year is a leap year if it's divisible by 4, except century years (divisible by 100), which must also be divisible by 400 - so 2000 was a leap year, but 1900 and 2100 are not." },
      { q: "Are century years always leap years?", a: "No - century years (like 1900 or 2100) are leap years only if divisible by 400, not just by 4. That's why 2000 was a leap year but 1900 and 2100 are not - this extra rule keeps the calendar aligned with the solar year over long periods." },
      { q: "Why was the leap year rule created in the first place?", a: "A solar year is about 365.2422 days, not exactly 365, so without leap years the calendar would drift out of sync with the seasons by about a day every four years. Adding a leap day roughly every four years (with century-year exceptions) keeps the calendar aligned with Earth's orbit over long periods." },
    ],
    related: ["week-number-calculator", "day-of-week-calculator", "date-duration-calculator"],
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
      { q: "How is exact age calculated?", a: "By counting full years, then remaining months, then remaining days between the birth date and today - not just subtracting birth year from the current year." },
      { q: "Does this account for leap years?", a: "Yes - it works directly from calendar dates rather than assuming a fixed 365-day year, so leap years are handled correctly without any extra adjustment." },
      { q: "Can I calculate age as of a specific future or past date instead of today?", a: "This calculator compares your birth date to today's date specifically; to find your age on another date, use the Days Until Calculator or Date Duration Calculator to measure the gap between your birth date and any date you choose." },
      { q: "Can this calculate age in months or weeks instead of just years?", a: "Yes - alongside your age in years, this calculator breaks down the exact time elapsed into total months, weeks, and days, so you can see your precise age in whichever unit is most useful." },
    ],
    related: ["days-until-calculator", "dog-age-calculator"],
  },

  // ---------------- EVERYDAY CONVERSIONS ----------------
  {
    id: "unit-length-converter",
    category: "conversions",
    title: "CM to Inches Converter",
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
      { q: "Is this conversion exact or rounded?", a: "The underlying conversion factor (1 inch = 2.54 cm) is exact by international definition - any rounding you see is just the displayed result being trimmed to a readable number of decimal places." },
      { q: "Why do some online converters give a slightly different answer?", a: "Small differences usually come from rounding at different decimal places, not a different conversion factor - the underlying 1 inch = 2.54 cm relationship is a fixed international standard, so any accurate converter should agree once you compare at the same precision." },
      { q: "Which length units does this converter support?", a: "This tool converts between metric units (millimeters, centimeters, meters, kilometers) and imperial/US units (inches, feet, yards, miles), so you can convert in either direction without memorizing conversion factors." },
    ],
    related: ["weight-converter", "cooking-converter", "concrete-calculator"],
  },
  {
    id: "temperature-converter",
    category: "conversions",
    title: "Temperature Converter",
    keyword: "temperature converter",
    description: "Convert between Fahrenheit, Celsius, and Kelvin.",
    intro: "Enter a temperature and choose a starting unit to convert between Fahrenheit, Celsius, and Kelvin.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 98.6, step: 0.1 },
      { id: "from", label: "From", type: "select", default: "f", options: [
        { v: "f", l: "Fahrenheit" }, { v: "c", l: "Celsius" }, { v: "k", l: "Kelvin" },
      ] },
    ],
    compute: (v) => {
      let celsius;
      if (v.from === "f") celsius = (v.value - 32) * 5 / 9;
      else if (v.from === "c") celsius = v.value;
      else celsius = v.value - 273.15;
      const fahrenheit = celsius * 9 / 5 + 32;
      const kelvin = celsius + 273.15;
      return {
        primary: { label: "In Celsius", value: `${round(celsius, 1)}°C` },
        secondary: [
          { l: "Fahrenheit", v: `${round(fahrenheit, 1)}°F` },
          { l: "Kelvin", v: `${round(kelvin, 2)} K` },
        ],
      };
    },
    faq: [
      { q: "How do I convert Fahrenheit to Celsius?", a: "Subtract 32, then multiply by 5/9. 98.6°F: (98.6 − 32) × 5/9 = 37°C - normal human body temperature." },
      { q: "Why does temperature conversion need an offset, not just multiplication?", a: "Fahrenheit and Celsius have different zero points (freezing water is 0°C but 32°F), so converting requires shifting the scale first, unlike length or weight conversions which only need a multiplier." },
      { q: "What temperature is the same number in both Celsius and Fahrenheit?", a: "−40 degrees - it's the one point where the two scales intersect, since −40°C × 9/5 + 32 = −40°F exactly; every other temperature reads as a different number on each scale." },
      { q: "Does this also convert to and from Kelvin?", a: "Yes - alongside Celsius and Fahrenheit, this converter supports Kelvin, which is useful for scientific calculations since it starts at absolute zero rather than an arbitrary reference point." },
    ],
    related: ["weight-converter", "volume-converter", "unit-length-converter"],
  },
  {
    id: "weight-converter",
    category: "conversions",
    title: "Weight Converter",
    keyword: "weight converter",
    description: "Convert between kilograms, pounds, ounces, and grams.",
    intro: "Enter a value and choose a starting unit to convert between common weight measurements.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 150, step: 0.01 },
      { id: "from", label: "From", type: "select", default: "lb", options: [
        { v: "kg", l: "Kilograms" }, { v: "lb", l: "Pounds" }, { v: "oz", l: "Ounces" }, { v: "g", l: "Grams" },
      ] },
    ],
    compute: (v) => {
      const toKg = { kg: 1, lb: 0.453592, oz: 0.0283495, g: 0.001 };
      const kgValue = v.value * toKg[v.from];
      return {
        primary: { label: "In kilograms", value: `${round(kgValue, 2)} kg` },
        secondary: [
          { l: "Pounds", v: round(kgValue / toKg.lb, 2) },
          { l: "Ounces", v: round(kgValue / toKg.oz, 1) },
          { l: "Grams", v: round(kgValue / toKg.g, 0) },
        ],
      };
    },
    faq: [
      { q: "How many kilograms is 150 pounds?", a: "150 lb equals about 68.04 kg. To convert pounds to kilograms, multiply by 0.453592." },
      { q: "What's the difference between weight and mass?", a: "In everyday use they're treated as the same - this converter, like most scales and recipes, converts weight units (kg, lb, oz, g) directly without distinguishing mass from gravitational weight, which is accurate for anything happening on Earth's surface." },
      { q: "Why do some scales show a slightly different number than an exact conversion?", a: "Most bathroom and kitchen scales round to the nearest whole unit or a fixed decimal place for readability, so a small rounding gap between the scale's display and an exact mathematical conversion is normal and doesn't indicate an error in either one." },
      { q: "How many grams are in an ounce?", a: "One ounce equals approximately 28.35 grams. This is the standard conversion used for cooking, postal weights, and most everyday US customary-to-metric weight conversions." },
    ],
    related: ["unit-length-converter", "volume-converter", "temperature-converter", "speed-converter"],
  },
  {
    id: "volume-converter",
    category: "conversions",
    title: "Volume Converter",
    keyword: "volume converter",
    description: "Convert between liters, gallons, cups, and milliliters.",
    intro: "Enter a value and choose a starting unit to convert between common volume measurements.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 1, step: 0.01 },
      { id: "from", label: "From", type: "select", default: "gal", options: [
        { v: "l", l: "Liters" }, { v: "gal", l: "Gallons" }, { v: "cup", l: "Cups" }, { v: "ml", l: "Milliliters" },
      ] },
    ],
    compute: (v) => {
      const toLiters = { l: 1, gal: 3.78541, cup: 0.236588, ml: 0.001 };
      const litersValue = v.value * toLiters[v.from];
      return {
        primary: { label: "In liters", value: `${round(litersValue, 3)} L` },
        secondary: [
          { l: "Gallons", v: round(litersValue / toLiters.gal, 3) },
          { l: "Cups", v: round(litersValue / toLiters.cup, 2) },
          { l: "Milliliters", v: round(litersValue / toLiters.ml, 0) },
        ],
      };
    },
    faq: [
      { q: "How many liters is a gallon?", a: "1 US gallon equals about 3.785 liters. To convert gallons to liters, multiply by 3.78541." },
      { q: "Is a US gallon the same as a UK gallon?", a: "No - a US gallon (3.785 L) is smaller than a UK/imperial gallon (4.546 L). This converter uses US gallons; adjust accordingly if you need imperial units." },
      { q: "Why is a US pint different from an imperial pint?", a: "The US and imperial (UK) systems define their base units differently - a US gallon is smaller than an imperial gallon, and since a pint is defined as a fraction of a gallon in each system, US pints (16 fl oz) end up smaller than imperial pints (20 fl oz)." },
      { q: "How many milliliters are in a fluid ounce?", a: "One US fluid ounce equals approximately 29.57 milliliters. This differs slightly from the UK/imperial fluid ounce (about 28.41 mL), so it's worth checking which standard a recipe or product label is using before converting." },
    ],
    related: ["cooking-converter", "weight-converter", "unit-length-converter"],
  },
  {
    id: "cooking-converter",
    category: "conversions",
    title: "Grams to Cups Converter",
    keyword: "grams to cups",
    description: "Convert common baking ingredients between cups and grams.",
    intro: "Choose an ingredient and enter cups to see the equivalent weight in grams - ingredient density affects the conversion.",
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
        note: "Weights vary by brand and how ingredients are packed/scooped - for baking precision, a kitchen scale is most accurate.",
      };
    },
    faq: [
      { q: "Why does 1 cup of flour and 1 cup of sugar weigh different amounts?", a: "Cups measure volume, not weight - denser ingredients like sugar weigh more per cup than lighter ones like flour." },
      { q: "How much does a stick of butter weigh in this converter?", a: "A standard US stick of butter is 1/2 cup, which converts to about 113.5g - half of the 227g-per-cup figure this calculator uses." },
      { q: "Why does the type of flour affect its weight per cup?", a: "How densely the flour is packed into the measuring cup - and differences between flour types like all-purpose, bread, or cake flour - both affect weight per cup, which is why professional recipes often specify weight rather than cup measurements for consistency." },
      { q: "Why do recipes from different countries use different measurement systems?", a: "The US primarily uses volume-based cup and spoon measurements, while most of the rest of the world uses weight-based metric measurements (grams), which are more precise for baking since ingredient density varies. This converter bridges the two so you can follow a recipe written in either system." },
    ],
    related: ["unit-length-converter", "volume-converter", "paint-calculator"],
  },
  {
    id: "speed-converter",
    category: "conversions",
    title: "Speed Converter",
    keyword: "speed converter",
    description: "Convert between mph, km/h, m/s, and knots.",
    intro: "Enter a speed and choose a starting unit to convert between mph, km/h, m/s, and knots.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 60, step: 0.1 },
      { id: "from", label: "From", type: "select", default: "mph", options: [
        { v: "mph", l: "Miles per hour" }, { v: "kph", l: "Kilometers per hour" }, { v: "ms", l: "Meters per second" }, { v: "knot", l: "Knots" },
      ] },
    ],
    compute: (v) => {
      const toMph = { mph: 1, kph: 0.621371, ms: 2.23694, knot: 1.15078 };
      const mphValue = v.value * toMph[v.from];
      return {
        primary: { label: "In mph", value: `${round(mphValue, 2)} mph` },
        secondary: [
          { l: "km/h", v: round(mphValue / toMph.kph, 2) },
          { l: "m/s", v: round(mphValue / toMph.ms, 2) },
          { l: "Knots", v: round(mphValue / toMph.knot, 2) },
        ],
      };
    },
    faq: [
      { q: "How many km/h is 60 mph?", a: "60 mph equals about 96.56 km/h. To convert mph to km/h, divide by 0.621371 (or multiply by about 1.60934)." },
      { q: "What's the difference between knots and mph?", a: "A knot is one nautical mile per hour, which is slightly longer than a statute mile - 1 knot ≈ 1.15 mph. Knots are standard in marine and aviation navigation; mph is standard for road speeds in the US." },
      { q: "What's the difference between speed over ground and airspeed?", a: "This converter handles simple unit conversion (mph, km/h, knots, etc.) for a single speed value; it doesn't account for wind or current effects that separate 'speed over ground' from 'airspeed' or 'water speed' in aviation and marine contexts, which require additional variables beyond unit conversion." },
      { q: "How many meters per second is a mile per hour?", a: "One mile per hour equals approximately 0.447 meters per second. Meters per second is the standard scientific unit for speed, while mph and km/h are more common in everyday and automotive contexts." },
    ],
    related: ["unit-length-converter", "weight-converter", "pace-calculator"],
  },
  {
    id: "area-converter",
    category: "conversions",
    title: "Area Converter",
    keyword: "area converter",
    description: "Convert between square feet, square meters, acres, and square yards.",
    intro: "Enter an area and choose a starting unit to convert between square feet, square meters, acres, and square yards.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 1000, step: 1 },
      { id: "from", label: "From", type: "select", default: "sqft", options: [
        { v: "sqft", l: "Square feet" }, { v: "sqm", l: "Square meters" }, { v: "acre", l: "Acres" }, { v: "sqyd", l: "Square yards" },
      ] },
    ],
    compute: (v) => {
      const toSqFt = { sqft: 1, sqm: 10.7639, acre: 43560, sqyd: 9 };
      const sqftValue = v.value * toSqFt[v.from];
      return {
        primary: { label: "In square feet", value: `${round(sqftValue, 2)} sq ft` },
        secondary: [
          { l: "Square meters", v: round(sqftValue / toSqFt.sqm, 2) },
          { l: "Acres", v: round(sqftValue / toSqFt.acre, 5) },
          { l: "Square yards", v: round(sqftValue / toSqFt.sqyd, 2) },
        ],
      };
    },
    faq: [
      { q: "How many acres is 1,000 square feet?", a: "1,000 sq ft equals about 0.023 acres. To convert square feet to acres, divide by 43,560." },
      { q: "How big is an acre in more relatable terms?", a: "An acre is about 43,560 sq ft - roughly the size of a standard American football field without the end zones, or about 90% of one." },
      { q: "How is a hectare different from an acre?", a: "A hectare is a metric unit (10,000 square meters) commonly used outside the US, while an acre is an imperial unit (43,560 square feet) common in the US and UK - one hectare is approximately 2.47 acres." },
      { q: "How many square feet are in a square meter?", a: "One square meter equals approximately 10.76 square feet. This conversion is commonly needed when comparing real estate listings or floor plans that mix metric and imperial units." },
    ],
    related: ["unit-length-converter", "concrete-calculator", "flooring-calculator"],
  },
  {
    id: "data-storage-converter",
    category: "conversions",
    title: "Data Storage Converter",
    keyword: "data storage converter",
    description: "Convert between bytes, KB, MB, GB, and TB.",
    intro: "Enter a value and choose a starting unit to convert between bytes, kilobytes, megabytes, gigabytes, and terabytes.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 8, step: 0.1 },
      { id: "from", label: "From", type: "select", default: "gb", options: [
        { v: "b", l: "Bytes" }, { v: "kb", l: "Kilobytes" }, { v: "mb", l: "Megabytes" }, { v: "gb", l: "Gigabytes" }, { v: "tb", l: "Terabytes" },
      ] },
    ],
    compute: (v) => {
      const toBytes = { b: 1, kb: 1024, mb: Math.pow(1024, 2), gb: Math.pow(1024, 3), tb: Math.pow(1024, 4) };
      const bytesValue = v.value * toBytes[v.from];
      return {
        primary: { label: "In megabytes", value: `${round(bytesValue / toBytes.mb, 2)} MB` },
        secondary: [
          { l: "Gigabytes", v: round(bytesValue / toBytes.gb, 4) },
          { l: "Terabytes", v: round(bytesValue / toBytes.tb, 6) },
          { l: "Kilobytes", v: round(bytesValue / toBytes.kb, 0) },
        ],
      };
    },
    faq: [
      { q: "How many MB is a GB?", a: "1 GB equals 1,024 MB using the binary convention this calculator uses (1 KB = 1,024 bytes) - this is standard for computing contexts like file sizes and RAM." },
      { q: "Why do storage sizes sometimes not match what I expect?", a: "Storage manufacturers often use decimal units (1 GB = 1,000 MB) for marketing, while operating systems typically report binary units (1 GB = 1,024 MB) - this is why a \"1 TB\" drive shows less space than expected in your file explorer." },
      { q: "Why do hard drive capacities sometimes show less space than advertised?", a: "Manufacturers typically calculate storage using decimal units (1 GB = 1,000,000,000 bytes), while operating systems often display capacity using binary units (1 GB = 1,073,741,824 bytes) - the same physical drive shows a smaller number under the binary convention, which is why advertised and displayed capacities don't always match." },
      { q: "What's the difference between a megabyte (MB) and a mebibyte (MiB)?", a: "A megabyte is typically 1,000 kilobytes (decimal, base-10), used by storage manufacturers, while a mebibyte is 1,024 kibibytes (binary, base-2), used by most operating systems when reporting file and disk sizes - this mismatch is why a '256GB' drive often shows less usable space in your OS." },
    ],
    related: ["unit-length-converter", "word-counter", "password-generator"],
  },
  {
    id: "pressure-converter",
    category: "conversions",
    title: "Pressure Converter",
    keyword: "pressure converter",
    description: "Convert between PSI, bar, kPa, and atmospheres.",
    intro: "Enter a pressure value and choose a starting unit to convert between PSI, bar, kPa, and atmospheres.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 32, step: 0.1 },
      { id: "from", label: "From", type: "select", default: "psi", options: [
        { v: "psi", l: "PSI" }, { v: "bar", l: "Bar" }, { v: "kpa", l: "kPa" }, { v: "atm", l: "Atmospheres" },
      ] },
    ],
    compute: (v) => {
      const toPsi = { psi: 1, bar: 14.5038, kpa: 0.145038, atm: 14.6959 };
      const psiValue = v.value * toPsi[v.from];
      return {
        primary: { label: "In PSI", value: `${round(psiValue, 2)} psi` },
        secondary: [
          { l: "Bar", v: round(psiValue / toPsi.bar, 3) },
          { l: "kPa", v: round(psiValue / toPsi.kpa, 2) },
          { l: "Atmospheres", v: round(psiValue / toPsi.atm, 3) },
        ],
      };
    },
    faq: [
      { q: "How many PSI is 2 bar?", a: "2 bar equals about 29 PSI. To convert bar to PSI, multiply by 14.5038 - useful for checking tire pressure specs listed in bar." },
      { q: "What tire pressure unit does my car use?", a: "US vehicles almost always list tire pressure in PSI (on the door jamb sticker); most other countries use bar or kPa. If your car's manual or tire spec is in bar or kPa, convert it to PSI here before checking with a US-standard gauge." },
      { q: "Why are there so many different pressure units?", a: "Different fields settled on different standards historically - PSI is common in the US for tires and mechanical work, bar and kPa are common in metric countries and scientific contexts, and atmospheres (atm) are often used in chemistry - this converter handles the conversion between all of them." },
      { q: "How many kilopascals is 1 atmosphere?", a: "One standard atmosphere equals approximately 101.325 kilopascals. Atmospheres are commonly used as a reference pressure in science and diving, while kilopascals are the standard SI unit used in most engineering and weather contexts." },
    ],
    related: ["unit-length-converter", "weight-converter", "fuel-economy-converter"],
  },
  {
    id: "fuel-economy-converter",
    category: "conversions",
    title: "Fuel Economy Converter",
    keyword: "fuel economy converter",
    description: "Convert between MPG and L/100km fuel economy.",
    intro: "Enter a fuel economy value and choose a starting unit to convert between MPG (US) and L/100km.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 25, step: 0.1 },
      { id: "from", label: "From", type: "select", default: "mpg", options: [
        { v: "mpg", l: "MPG (US)" }, { v: "l100km", l: "L/100km" },
      ] },
    ],
    compute: (v) => {
      let mpg, l100km;
      if (v.from === "mpg") {
        mpg = v.value;
        l100km = 235.214 / mpg;
      } else {
        l100km = v.value;
        mpg = 235.214 / l100km;
      }
      const kmL = mpg * 0.425144;
      return {
        primary: { label: "MPG (US)", value: round(mpg, 2) },
        secondary: [
          { l: "L/100km", v: round(l100km, 2) },
          { l: "km/L", v: round(kmL, 2) },
        ],
        note: "MPG and L/100km measure fuel economy inversely - a lower L/100km or a higher MPG both mean better efficiency.",
      };
    },
    faq: [
      { q: "How do I convert MPG to L/100km?", a: "Divide 235.214 by the MPG value. A car getting 25 MPG uses about 9.41 L/100km - the relationship is inverse, so higher MPG means lower L/100km." },
      { q: "Why is the MPG to L/100km conversion not a simple multiplication?", a: "MPG measures distance per unit of fuel, while L/100km measures fuel per unit of distance - they're reciprocals of each other, so the conversion involves division rather than a fixed multiplier." },
      { q: "Why does a higher MPG number mean a lower L/100km number?", a: "MPG measures distance per unit of fuel (higher is better), while L/100km measures fuel per unit of distance (lower is better) - they're inverse measurements, so the relationship between them isn't linear, which is also why the conversion isn't a simple multiplication." },
      { q: "Why do European cars advertise fuel consumption instead of fuel economy?", a: "Most of the world measures fuel consumption as liters per 100 km (how much fuel is used over a fixed distance), while the US measures fuel economy as miles per gallon (how far you go per unit of fuel) - the two scales aren't linearly related, which is why this converter is needed rather than a simple ratio." },
    ],
    related: ["unit-length-converter", "pressure-converter", "volume-converter"],
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
      { q: "Does this word counter save my text?", a: "No - the count runs entirely in your browser and nothing is sent or stored." },
      { q: "Does this count words the same way Microsoft Word does?", a: "Very close, but not always identical - this counter splits on whitespace, which is how most word processors count too, but edge cases like hyphenated words or numbers can be tallied slightly differently between tools." },
      { q: "What counts as a 'sentence' in the sentence count?", a: "Text ending in a period, question mark, or exclamation point is counted as one sentence - abbreviations with periods (like 'Dr.' or 'e.g.') can occasionally inflate the count slightly, since the tool can't always distinguish a sentence-ending period from an abbreviation's period." },
      { q: "Does this tool count characters as well as words?", a: "Yes - alongside the word count, it shows character count both with and without spaces, plus sentence and paragraph counts, which is useful for meeting strict character limits like social media posts or meta descriptions." },
    ],
    related: ["password-generator", "data-storage-converter", "days-until-calculator"],
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
        note: "Generated locally in your browser - nothing is transmitted or stored. Use a password manager to save it securely.",
      };
    },
    faq: [
      { q: "Is this password generator secure?", a: "Passwords are generated entirely client-side using your browser's random number generator and are never sent to a server." },
      { q: "How long should my password be?", a: "12 characters minimum is a common baseline; 16+ is better if the site allows it. Longer passwords are exponentially harder to brute-force than adding more character types to a short one." },
      { q: "Why are similar-looking characters like 'l', '1', 'I', and 'O' excluded?", a: "This generator leaves out visually ambiguous characters so a password you have to type or read off a screen (rather than copy-paste) isn't confused between a lowercase L, an uppercase I, and the digit 1." },
      { q: "What makes a password 'strong' beyond just length?", a: "A strong password combines length (12+ characters) with unpredictability - a mix of uppercase, lowercase, numbers, and symbols in no predictable pattern, avoiding dictionary words, names, or reused passwords across sites. Length matters more than complexity alone: a long random passphrase is often stronger than a short complex one." },
    ],
    related: ["word-counter", "random-number-generator", "unit-length-converter"],
  },
  {
    id: "random-number-generator",
    category: "text",
    title: "Random Number Generator",
    keyword: "random number generator",
    description: "Generate one or more random numbers within a range.",
    intro: "Choose a minimum, maximum, and how many numbers you need to generate random numbers in your browser.",
    fields: [
      { id: "min", label: "Minimum", type: "number", default: 1, step: 1 },
      { id: "max", label: "Maximum", type: "number", default: 100, step: 1 },
      { id: "count", label: "How many numbers", type: "number", default: 1, step: 1, min: 1, max: 50 },
    ],
    compute: (v) => {
      const lo = Math.min(v.min, v.max);
      const hi = Math.max(v.min, v.max);
      const results = [];
      for (let i = 0; i < v.count; i++) {
        results.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
      }
      return {
        primary: { label: "Random number(s)", value: results.join(", ") },
        secondary: [
          { l: "Range", v: `${lo} to ${hi}` },
          { l: "Count", v: v.count },
        ],
        note: "Generated locally in your browser using Math.random() - not cryptographically secure. For security-sensitive randomness, use the Password Generator instead.",
      };
    },
    faq: [
      { q: "Is this random number generator truly random?", a: "It uses your browser's built-in Math.random(), which is pseudo-random and suitable for games, giveaways, and everyday decisions - but not for cryptographic or security purposes." },
      { q: "Can I generate multiple random numbers at once?", a: "Yes - set 'how many numbers' to any value up to 50 to generate a list of random numbers within your chosen range in one click." },
      { q: "Can I exclude specific numbers from the random range?", a: "This calculator generates uniformly from the full range you specify (minimum to maximum); to exclude specific values, generate a number and simply re-roll if it matches an excluded value, or narrow the range if the excluded values are all at one end." },
      { q: "Can I use this for a raffle or giveaway drawing?", a: "Yes - this generator is well-suited for informal drawings like picking a raffle winner or random giveaway entry from a numbered list. For anything with legal or regulatory requirements around fairness (like a licensed lottery), use a certified random number source instead." },
    ],
    related: ["password-generator", "word-counter", "gcd-lcm-calculator"],
  },
  {
    id: "case-converter",
    category: "text",
    title: "Case Converter",
    keyword: "case converter",
    description: "Convert text between uppercase, lowercase, title case, and sentence case.",
    intro: "Paste your text and choose a case to convert it to UPPERCASE, lowercase, Title Case, or Sentence case.",
    fields: [
      { id: "text", label: "Your text", type: "textarea", default: "Hello World Example Text" },
      { id: "targetCase", label: "Convert to", type: "select", default: "upper", options: [
        { v: "upper", l: "UPPERCASE" }, { v: "lower", l: "lowercase" }, { v: "title", l: "Title Case" }, { v: "sentence", l: "Sentence case" },
      ] },
    ],
    compute: (v) => {
      const text = v.text || "";
      let result;
      if (v.targetCase === "upper") result = text.toUpperCase();
      else if (v.targetCase === "lower") result = text.toLowerCase();
      else if (v.targetCase === "title") result = text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
      else result = text.length ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
      return {
        primary: { label: "Converted text", value: result },
        secondary: [{ l: "Character count", v: text.length }],
      };
    },
    faq: [
      { q: "What's the difference between title case and sentence case?", a: "Title case capitalizes the first letter of every major word (\"Hello World Example\"), while sentence case only capitalizes the first letter of the whole text (\"Hello world example\")." },
      { q: "Does this case converter save my text?", a: "No - the conversion runs entirely in your browser and nothing is sent or stored." },
      { q: "Does this handle accented letters and non-English characters correctly?", a: "Yes - case conversion works on standard Unicode text, including accented letters (é, ñ, ü, etc.), so converting to uppercase or lowercase preserves accents correctly rather than stripping them." },
      { q: "What case styles does this converter support?", a: "Beyond title case and sentence case, it converts to UPPERCASE, lowercase, camelCase, and other common formatting styles used in writing and code, so you can reformat text for whichever context you need." },
    ],
    related: ["word-counter", "lorem-ipsum-generator", "password-generator", "binary-to-text-converter"],
  },
  {
    id: "lorem-ipsum-generator",
    category: "text",
    title: "Lorem Ipsum Generator",
    keyword: "lorem ipsum generator",
    description: "Generate placeholder Lorem Ipsum text for mockups and designs.",
    intro: "Choose how many paragraphs and words per paragraph to generate placeholder Lorem Ipsum text.",
    fields: [
      { id: "paragraphs", label: "Paragraphs", type: "number", default: 3, step: 1, min: 1, max: 20 },
      { id: "wordsPerParagraph", label: "Words per paragraph", type: "number", default: 40, step: 5, min: 5, max: 200 },
    ],
    compute: (v) => {
      const LOREM = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat".split(" ");
      const makeParagraph = (wordCount) => {
        const words = [];
        for (let i = 0; i < wordCount; i++) words.push(LOREM[i % LOREM.length]);
        const s = words.join(" ");
        return s.charAt(0).toUpperCase() + s.slice(1) + ".";
      };
      const paragraphs = [];
      for (let i = 0; i < v.paragraphs; i++) paragraphs.push(makeParagraph(v.wordsPerParagraph));
      const fullText = paragraphs.join("\n\n");
      return {
        primary: { label: "Generated text", value: fullText },
        secondary: [
          { l: "Paragraphs", v: v.paragraphs },
          { l: "Total words", v: v.paragraphs * v.wordsPerParagraph },
        ],
      };
    },
    faq: [
      { q: "What is Lorem Ipsum text used for?", a: "It's placeholder text used in design mockups and layouts so viewers focus on visual design rather than being distracted by readable content." },
      { q: "Why does Lorem Ipsum look like Latin?", a: "It's derived from a passage of Cicero's 1st-century BC text on Latin ethics - the words were scrambled and altered over centuries of use in printing and typesetting to become the standard placeholder text used today." },
      { q: "Is Lorem Ipsum actual Latin with real meaning?", a: "No - it's scrambled and altered from a passage of Cicero's writing from 45 BC, to the point that it no longer forms coherent Latin sentences. That's intentional: it needs to look like real language at a glance without any actual meaning that could distract from evaluating a design." },
      { q: "Why is Lorem Ipsum still used when other placeholder text options exist?", a: "Lorem Ipsum's word lengths and letter frequencies roughly mimic real Latin-derived languages like English, so it fills a layout with a realistic visual weight and paragraph rhythm without the reader getting distracted trying to actually read it - unlike 'the quick brown fox' style filler, which pulls attention to its meaning." },
    ],
    related: ["case-converter", "word-counter", "password-generator"],
  },
  {
    id: "text-to-slug-generator",
    category: "text",
    title: "Text to Slug Generator",
    keyword: "text to slug generator",
    description: "Convert text into a clean, URL-friendly slug.",
    intro: "Enter a title or phrase to convert it into a lowercase, hyphenated URL slug.",
    fields: [
      { id: "text", label: "Your text", type: "textarea", default: "Hello World! This is a Test Title" },
    ],
    compute: (v) => {
      const text = v.text || "";
      const slug = text.toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      return {
        primary: { label: "Slug", value: slug },
        secondary: [{ l: "Character count", v: slug.length }],
      };
    },
    faq: [
      { q: "What makes a good URL slug?", a: "Lowercase letters, numbers, and hyphens only - no spaces, punctuation, or special characters. Slugs should be short, readable, and describe the page content." },
      { q: "Why are spaces replaced with hyphens instead of underscores?", a: "Search engines generally treat hyphens as word separators but not underscores, so hyphens are the standard choice for SEO-friendly URLs." },
      { q: "Should slugs include numbers or only letters?", a: "Numbers are fine and commonly used in slugs (e.g., product model numbers or years), as long as they're separated by hyphens like other words - this generator preserves numbers while converting everything else to lowercase, hyphen-separated text." },
      { q: "Should URL slugs include stop words like 'the' and 'and'?", a: "Removing common stop words is optional but often improves readability and slightly shortens the URL without losing meaning - 'best-pizza-in-chicago' works as well as 'the-best-pizza-in-chicago'. This tool preserves your original word order and lets you decide what to keep." },
    ],
    related: ["case-converter", "word-counter", "word-frequency-counter"],
  },
  {
    id: "binary-to-text-converter",
    category: "text",
    title: "Binary to Text Converter",
    keyword: "binary to text converter",
    description: "Convert text to binary or binary back to text.",
    intro: "Enter text or binary and choose a direction to convert between plain text and 8-bit binary.",
    fields: [
      { id: "input", label: "Input", type: "textarea", default: "Hi" },
      { id: "mode", label: "Direction", type: "select", default: "textToBinary", options: [
        { v: "textToBinary", l: "Text → Binary" }, { v: "binaryToText", l: "Binary → Text" },
      ] },
    ],
    compute: (v) => {
      const input = v.input || "";
      let result;
      if (v.mode === "textToBinary") {
        result = input.split("").map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ");
      } else {
        result = input.trim().split(/\s+/).filter((b) => b !== "").map((b) => String.fromCharCode(parseInt(b, 2))).join("");
      }
      return {
        primary: { label: "Result", value: result },
        secondary: [],
      };
    },
    faq: [
      { q: "How is text converted to binary?", a: "Each character's numeric code (from the ASCII/Unicode table) is converted to base-2 and padded to 8 bits - 'H' has code 72, which is 01001000 in binary." },
      { q: "Why 8 bits per character?", a: "8 bits (1 byte) covers the standard ASCII character set (0-255), which includes all English letters, numbers, and common symbols." },
      { q: "What happens if I enter a binary string that isn't a multiple of 8 bits?", a: "Standard text encoding (ASCII/UTF-8) represents each character as a full 8-bit byte, so a binary string that isn't a clean multiple of 8 bits can't be converted to valid characters and will likely produce an error or unexpected result - double-check your binary input is grouped correctly." },
      { q: "Can this convert binary to numbers as well as text?", a: "This tool converts binary directly to readable text using standard 8-bit character encoding (ASCII/UTF-8). To convert binary to a plain numeric value instead, treat the binary string as a base-2 number and convert it to base-10 using a binary-to-decimal calculation instead." },
    ],
    related: ["case-converter", "word-counter", "text-to-slug-generator"],
  },
  {
    id: "word-frequency-counter",
    category: "text",
    title: "Word Frequency Counter",
    keyword: "word frequency counter",
    description: "Find the most frequently used words in a block of text.",
    intro: "Paste your text to see which words appear most often, ranked by frequency.",
    fields: [
      { id: "text", label: "Your text", type: "textarea", default: "the quick brown fox jumps over the lazy dog the fox runs fast" },
    ],
    compute: (v) => {
      const text = v.text || "";
      const words = text.toLowerCase().match(/[a-z0-9']+/g) || [];
      const freq = {};
      words.forEach((w) => { freq[w] = (freq[w] || 0) + 1; });
      const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
      const top = sorted[0];
      return {
        primary: { label: "Most frequent word", value: top ? `"${top[0]}" (${top[1]}×)` : "—" },
        secondary: sorted.slice(1, 5).map(([word, count]) => ({ l: `"${word}"`, v: `${count}×` })),
        note: `${words.length} total words, ${sorted.length} unique.`,
      };
    },
    faq: [
      { q: "How is word frequency calculated?", a: "The text is split into individual words (case-insensitive, punctuation ignored), then each unique word is counted and sorted by how often it appears." },
      { q: "What is word frequency analysis used for?", a: "It's used for SEO keyword density checks, writing style analysis, and finding overused words or phrases in a document." },
      { q: "Does this count 'the' and 'The' as the same word?", a: "Yes - word frequency counting is case-insensitive by default here, so capitalization at the start of a sentence doesn't split a word's count across two separate entries." },
      { q: "How can word frequency analysis help with SEO or writing?", a: "Word frequency analysis reveals unintentional repetition, helps confirm target keywords appear at a natural density rather than being stuffed, and can surface overused filler words that weaken writing - useful for both editing prose and checking on-page SEO content before publishing." },
    ],
    related: ["word-counter", "text-to-slug-generator", "case-converter"],
  },

  // ---------------- PET & LIFESTYLE ----------------
  {
    id: "dog-age-calculator",
    category: "pets",
    title: "Dog Age Calculator",
    keyword: "dog age calculator",
    description: "Convert your dog's age into human years by size.",
    intro: "Dog aging varies by breed size - enter your dog's age and size to get a more accurate human-year estimate than the old 'multiply by 7' rule.",
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
        note: "This is an estimate - actual aging varies by breed and individual health, not just size.",
      };
    },
    faq: [
      { q: "Is 'one dog year equals seven human years' accurate?", a: "No - that old rule is a rough myth. Dogs age faster in their first two years, and larger breeds age faster in later years than small breeds." },
      { q: "Why do larger dog breeds age faster than small breeds?", a: "Large and giant breeds grow faster and hit physical maturity sooner, which is linked to shorter lifespans and faster aging in their middle and senior years - the opposite of the pattern in most other mammals." },
      { q: "At what age is a dog considered a 'senior'?", a: "It varies by size - small breeds are typically considered senior around 10-12 years, medium breeds around 8-10, and large or giant breeds as early as 6-7 years, since larger dogs both mature and age faster than smaller ones." },
      { q: "Why isn't the calculation just size-based - does breed matter too?", a: "Size remains the strongest predictor of aging rate, which is why this calculator groups breeds by size (small, medium, large, giant) rather than using a single universal formula. Individual breeds within the same size class can still age at slightly different rates due to genetics, but size explains most of the variation." },
    ],
    related: ["cat-age-calculator", "dog-food-calculator", "bmi-calculator", "ideal-dog-weight-calculator"],
  },
  {
    id: "dog-food-calculator",
    category: "pets",
    title: "Dog Food Calculator",
    keyword: "dog food calculator",
    description: "Estimate how much food to feed your dog each day.",
    intro: "Enter your dog's weight and activity level to estimate daily calorie needs and cups of food per day.",
    fields: [
      { id: "weightLb", label: "Weight", type: "number", unit: "lb", default: 40, step: 1 },
      { id: "activityLevel", label: "Activity level", type: "select", default: "moderate", options: [
        { v: "low", l: "Low (senior, weight loss)" }, { v: "moderate", l: "Moderate (typical adult)" },
        { v: "active", l: "Active (working, very active)" }, { v: "puppy", l: "Puppy (growing)" },
      ] },
      { id: "caloriesPerCup", label: "Calories per cup of food", type: "number", unit: "kcal", default: 350, step: 10 },
    ],
    compute: (v) => {
      const weightKg = v.weightLb * 0.453592;
      const rer = 70 * Math.pow(weightKg, 0.75);
      const multipliers = { low: 1.2, moderate: 1.6, active: 2.0, puppy: 2.5 };
      const dailyCalories = rer * multipliers[v.activityLevel];
      const cupsPerDay = dailyCalories / v.caloriesPerCup;
      return {
        primary: { label: "Cups per day", value: round(cupsPerDay, 2) },
        secondary: [
          { l: "Daily calories", v: `${round(dailyCalories, 0)} kcal` },
          { l: "Resting energy requirement", v: `${round(rer, 0)} kcal` },
        ],
        note: "This is a general estimate based on resting energy requirements. Individual needs vary - check your food's feeding guide and consult a vet for specific dietary advice.",
      };
    },
    faq: [
      { q: "How much food does a 40 lb dog need per day?", a: "A moderately active 40 lb dog needs roughly 985 calories per day, or about 2.8 cups of a food with 350 calories per cup." },
      { q: "What is RER for dog food calculations?", a: "Resting energy requirement (RER) is the calories a dog needs at complete rest, calculated as 70 × (weight in kg)^0.75 - daily needs are then scaled up from RER based on activity level." },
      { q: "Should I adjust the amount for a spayed or neutered dog?", a: "Yes, generally - spayed and neutered dogs often have a slightly lower metabolic rate, so many veterinarians recommend reducing the calculated portion by roughly 10-20% to avoid gradual weight gain, then adjusting further based on your dog's actual body condition over time." },
      { q: "How does dog food calorie density affect how much to feed?", a: "Not all dog foods have the same calorie density - a cup of a calorie-dense food delivers more energy than a cup of a lower-calorie formula, so the same daily calorie target translates into different serving sizes depending on the specific food's calories-per-cup, listed on the packaging." },
    ],
    related: ["dog-age-calculator", "calorie-calculator", "bmr-calculator"],
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
      { q: "Does indoor vs. outdoor lifestyle affect a cat's age calculation?", a: "This calculator doesn't factor that in - it's a general estimate based on typical development. In practice, indoor cats tend to live longer than outdoor cats due to lower exposure to injury and disease, but that affects lifespan, not the age-equivalence math itself." },
      { q: "At what age is a cat considered a 'senior'?", a: "Most veterinary guidelines consider cats senior starting around 10-11 years old, with 'geriatric' typically used for cats 15 and older - though individual health varies more than a single age cutoff can capture." },
      { q: "How accurate is the cat age formula for very old cats?", a: "The formula is most reliable through a cat's early years and levels off for senior cats, roughly adding about 4 human years per additional cat year after age 2, though individual health and genetics affect actual aging more at advanced ages than the formula alone can capture." },
    ],
    related: ["dog-age-calculator", "rabbit-age-calculator", "age-calculator", "horse-age-calculator"],
  },
  {
    id: "rabbit-age-calculator",
    category: "pets",
    title: "Rabbit Age Calculator",
    keyword: "rabbit age calculator",
    description: "Convert your rabbit's age into human years.",
    intro: "Enter your rabbit's age to estimate the equivalent human age, based on typical lagomorph aging patterns.",
    fields: [
      { id: "rabbitYears", label: "Rabbit's age", type: "number", unit: "years", default: 3, step: 0.5 },
    ],
    compute: (v) => {
      const humanAge = v.rabbitYears <= 1 ? v.rabbitYears * 21 : 21 + (v.rabbitYears - 1) * 6;
      return {
        primary: { label: "Human-equivalent age", value: `${round(humanAge, 0)} years` },
        secondary: [{ l: "Rabbit's actual age", v: `${v.rabbitYears} years` }],
        note: "This is an estimate based on typical rabbit development, not a veterinary assessment. Rabbits can live 8-12 years with good care.",
      };
    },
    faq: [
      { q: "How fast do rabbits age compared to humans?", a: "Rabbits mature very quickly - a 1-year-old rabbit is roughly equivalent to a 21-year-old human, then aging slows to about 6 human years per rabbit year after that." },
      { q: "How long do pet rabbits typically live?", a: "Well-cared-for house rabbits commonly live 8-12 years, with some living longer depending on breed and health." },
      { q: "Do different rabbit breeds age at different rates?", a: "Somewhat - larger rabbit breeds tend to have shorter lifespans and may show signs of aging earlier than smaller breeds, following a similar (though less dramatic) size-to-lifespan pattern seen in dogs, though this calculator uses a general estimate rather than breed-specific curves." },
      { q: "Does spaying or neutering affect a rabbit's lifespan or aging rate?", a: "Yes - spayed and neutered rabbits generally live longer than intact rabbits, since the procedure significantly reduces the risk of reproductive cancers that are common in unaltered rabbits, particularly female rabbits, who face a high lifetime risk of uterine cancer if left intact." },
    ],
    related: ["cat-age-calculator", "dog-age-calculator", "age-calculator"],
  },
  {
    id: "dog-pregnancy-calculator",
    category: "pets",
    title: "Dog Pregnancy Calculator",
    keyword: "dog pregnancy calculator",
    description: "Estimate your dog's due date based on the mating date.",
    intro: "Enter the mating date to estimate your dog's due date, based on the typical 63-day canine gestation period.",
    fields: [
      { id: "matingDate", label: "Mating date", type: "date", default: "2024-01-01" },
      { id: "gestationDays", label: "Gestation length", type: "number", unit: "days", default: 63, step: 1 },
    ],
    compute: (v) => {
      const [y, m, d] = v.matingDate.split("-").map(Number);
      const dueDate = new Date(y, m - 1, d);
      dueDate.setDate(dueDate.getDate() + v.gestationDays);
      const dueDateStr = dueDate.toISOString().slice(0, 10);
      return {
        primary: { label: "Estimated due date", value: dueDateStr },
        secondary: [{ l: "Gestation length", v: `${v.gestationDays} days` }],
        note: "The typical canine gestation period is 58-68 days (about 63 days on average). Confirm timing with a veterinarian, especially as the due date approaches.",
      };
    },
    faq: [
      { q: "How long are dogs pregnant?", a: "The average canine gestation period is about 63 days from conception, though it can range from 58 to 68 days depending on the dog and litter size." },
      { q: "How accurate is a due date estimate from the mating date?", a: "It's a reasonable estimate, but actual whelping dates can vary by several days - a veterinarian can confirm timing more precisely using ultrasound or progesterone testing." },
      { q: "What are signs that a dog is nearing labor?", a: "A drop in body temperature (often below 100°F), nesting behavior, restlessness, and loss of appetite are common signs in the final 24 hours before labor - if you're unsure or your dog shows any concerning symptoms, contact your veterinarian rather than relying on date estimates alone." },
      { q: "Can an ultrasound confirm pregnancy before the due date estimate is useful?", a: "Yes - an ultrasound can typically confirm pregnancy around 25-35 days after mating, well before the estimated due date, and can also give a rough estimate of litter size later in the pregnancy, which a due-date calculation alone cannot provide." },
    ],
    related: ["days-until-calculator", "date-duration-calculator", "dog-age-calculator", "cat-pregnancy-calculator"],
  },
  {
    id: "horse-age-calculator",
    category: "pets",
    title: "Horse Age Calculator",
    keyword: "horse age calculator",
    description: "Convert your horse's age into human years.",
    intro: "Enter your horse's age to estimate the equivalent human age, based on typical equine aging patterns.",
    fields: [
      { id: "horseYears", label: "Horse's age", type: "number", unit: "years", default: 10, step: 0.5 },
    ],
    compute: (v) => {
      let humanAge;
      if (v.horseYears <= 1) humanAge = v.horseYears * 6.5;
      else if (v.horseYears <= 2) humanAge = 6.5 + (v.horseYears - 1) * 6.5;
      else humanAge = 13 + (v.horseYears - 2) * 2.5;
      return {
        primary: { label: "Human-equivalent age", value: `${round(humanAge, 0)} years` },
        secondary: [{ l: "Horse's actual age", v: `${v.horseYears} years` }],
        note: "This is an estimate based on typical equine development, not a veterinary assessment. Horses mature quickly in their first two years, then age more slowly.",
      };
    },
    faq: [
      { q: "How old is a 10-year-old horse in human years?", a: "About 33 human years - horses mature very quickly in their first two years (reaching roughly age 13 by year two), then age more gradually afterward." },
      { q: "What's considered old age for a horse?", a: "Horses are often considered seniors starting around age 15-20, with many living into their late 20s or early 30s with good care." },
      { q: "Do all horse breeds age at a similar rate?", a: "Aging patterns are fairly similar across most horse breeds compared to the size-driven differences seen in dogs, though very large draft breeds and miniature breeds can show somewhat different lifespan trends at the extremes." },
      { q: "Why do horses age faster in their first few years than later in life?", a: "Horses reach physical maturity much faster than humans, hitting adolescence and near-full growth within their first 4-5 years, so the human-year equivalent of each early horse year is very high before leveling off to a slower, steadier rate for the rest of their adult life." },
    ],
    related: ["dog-age-calculator", "cat-age-calculator", "rabbit-age-calculator"],
  },
  {
    id: "ideal-dog-weight-calculator",
    category: "pets",
    title: "Ideal Dog Weight Calculator",
    keyword: "ideal dog weight calculator",
    description: "Estimate your dog's ideal weight from current weight and body condition score.",
    intro: "Enter your dog's current weight and body condition score (1-9 scale) to estimate their ideal weight.",
    fields: [
      { id: "currentWeight", label: "Current weight", type: "number", unit: "lb", default: 60, step: 1 },
      { id: "bcs", label: "Body condition score (1-9)", type: "number", default: 7, step: 1, min: 1, max: 9 },
    ],
    compute: (v) => {
      const idealWeight = v.currentWeight - (v.currentWeight * 0.1 * (v.bcs - 5));
      return {
        primary: { label: "Estimated ideal weight", value: `${round(idealWeight, 1)} lb` },
        secondary: [{ l: "Weight to lose/gain", v: `${round(v.currentWeight - idealWeight, 1)} lb` }],
        note: "Body condition score (BCS) is a 1-9 scale where 5 is ideal - each point above or below adjusts the estimate by about 10% of current weight. Ask your vet for an accurate BCS assessment.",
      };
    },
    faq: [
      { q: "What is a body condition score for dogs?", a: "A 1-9 scale vets use to assess a dog's fat coverage by look and feel - 4-5 is ideal, with each point above indicating roughly 10% excess body weight." },
      { q: "How much weight should a dog with a BCS of 7 lose?", a: "A BCS of 7 (moderately overweight) suggests roughly 20% excess weight - a 60 lb dog would have an estimated ideal weight around 48 lb, a loss of about 12 lb." },
      { q: "Can I assess body condition score at home without a vet?", a: "Yes, to a reasonable degree - you can feel for your dog's ribs (should be easily felt but not visibly prominent) and check for a visible waist from above, but a veterinarian's hands-on assessment is more reliable, especially for breeds with thick coats that make visual and tactile assessment harder." },
      { q: "Should I use ideal weight or body condition score to judge if my dog needs to lose weight?", a: "Body condition score is generally more reliable than a single ideal-weight number, since it accounts for your dog's individual frame and muscle mass rather than a breed-average target; use ideal weight as a starting reference and body condition score to fine-tune the actual goal." },
    ],
    related: ["dog-food-calculator", "dog-age-calculator", "bmi-calculator"],
  },
  {
    id: "cat-pregnancy-calculator",
    category: "pets",
    title: "Cat Pregnancy Calculator",
    keyword: "cat pregnancy calculator",
    description: "Estimate your cat's due date based on the mating date.",
    intro: "Enter the mating date to estimate your cat's due date, based on the typical 64-day feline gestation period.",
    fields: [
      { id: "matingDate", label: "Mating date", type: "date", default: "2024-01-01" },
      { id: "gestationDays", label: "Gestation length", type: "number", unit: "days", default: 64, step: 1 },
    ],
    compute: (v) => {
      const [y, m, d] = v.matingDate.split("-").map(Number);
      const dueDate = new Date(y, m - 1, d);
      dueDate.setDate(dueDate.getDate() + v.gestationDays);
      const dueDateStr = dueDate.toISOString().slice(0, 10);
      return {
        primary: { label: "Estimated due date", value: dueDateStr },
        secondary: [{ l: "Gestation length", v: `${v.gestationDays} days` }],
        note: "The typical feline gestation period is 63-65 days. Confirm timing with a veterinarian, especially as the due date approaches.",
      };
    },
    faq: [
      { q: "How long are cats pregnant?", a: "The average feline gestation period is about 64 days from conception, typically ranging from 63 to 65 days." },
      { q: "How many kittens are in an average litter?", a: "Cat litters typically range from 3 to 5 kittens, though first litters and some breeds tend to be smaller." },
      { q: "How can I tell if a cat is pregnant before the due date estimate matters?", a: "Signs include enlarged and pinker nipples ('pinking up') around 2-3 weeks, gradual abdominal enlargement after about 3-4 weeks, and increased appetite - a veterinarian can confirm pregnancy via palpation as early as day 17-25 or ultrasound, which is more reliable than estimating from mating date alone." },
      { q: "Do cats show physical signs of pregnancy right away?", a: "Not usually - most physical signs, like a swollen abdomen or enlarged nipples, become noticeable around 3-4 weeks into the pregnancy, well after conception. Behavioral changes like increased affection or appetite can sometimes appear earlier, but a vet exam or ultrasound is the most reliable early confirmation." },
    ],
    related: ["dog-pregnancy-calculator", "cat-age-calculator", "days-until-calculator"],
  },
];

/* ---------- helpers ---------- */

function round(num, decimals) {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
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
