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
      { q: "What is 6/5 as a percentage?", a: "120% - divide the numerator by the denominator (6 ÷ 5 = 1.2), then multiply by 100. A fraction greater than 1 (like 6/5) always converts to a percentage greater than 100%." },
      { q: "Is a percentage finder the same as this percentage calculator?", a: "Yes - \"percentage finder\" just describes what this tool does: find what X percent of a number is, find what percent one number is of another, or find a percentage increase or decrease, all in one place." },
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
      { q: "How do I just simplify one fraction, without a second one?", a: "Set the second fraction to 1/1 and choose \"×\" (multiply) - multiplying by 1/1 doesn't change the value, so the result shown is your original fraction reduced to its simplest form." },
      { q: "How do I subtract fractions with different denominators?", a: "Find a common denominator first, convert each fraction to that denominator, then subtract the numerators. For 3/4 - 1/6, the common denominator is 12: 9/12 - 2/12 = 7/12. This calculator handles the common-denominator step automatically." },
    ],
    related: ["gcd-lcm-calculator", "average-calculator", "percentage-calculator"],
  },
  {
    id: "pi-digits-calculator",
    category: "math",
    title: "Digits of Pi Calculator",
    keyword: "pi digits calculator",
    description: "Show pi (π) to a chosen number of decimal digits, up to 100.",
    intro: "Choose how many decimal digits of pi (π) to display, from 1 to 100.",
    fields: [
      { id: "digits", label: "Number of decimal digits", type: "number", default: 20, step: 1, min: 1, max: 100 },
    ],
    compute: (v) => {
      const PI_100 = "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679";
      const n = Math.max(1, Math.min(100, Math.round(v.digits)));
      const decimals = PI_100.slice(0, n);
      return {
        primary: { label: `π to ${n} decimal digits`, value: `3.${decimals}` },
        secondary: [{ l: "Decimal digits shown", v: n }],
        note: n === 100 ? "This calculator supports up to 100 decimal digits." : undefined,
      };
    },
    faq: [
      { q: "What are the first 10 digits of pi?", a: "3.141592653 - pi is an irrational number, so its decimal digits never terminate or repeat, but the sequence is precisely known and verified to trillions of digits by mathematicians and computer scientists." },
      { q: "Why does pi have infinite digits?", a: "Pi is irrational, meaning it can't be expressed as a simple fraction of two integers - a mathematical proof (first given by Johann Lambert in 1761) shows its decimal expansion never terminates or falls into a repeating pattern, unlike a fraction like 1/3 = 0.333..." },
      { q: "Do I need 100 digits of pi for real calculations?", a: "No - just 15-16 digits of pi (about what a standard calculator or programming language's floating-point number provides) is far more precision than needed for any real-world physical calculation, even at astronomical scales. Extra digits are mostly of interest for pure mathematics, computing benchmarks, and memorization records." },
      { q: "How many digits does pi have?", a: "Infinitely many - since pi is irrational, its decimal expansion never ends or repeats. This calculator shows up to 100 of those digits; trillions more have been computed by supercomputers, though only a handful are useful for any real calculation." },
    ],
    related: ["square-root-calculator", "exponent-calculator", "random-number-generator"],
  },
  {
    id: "long-division-calculator",
    category: "math",
    title: "Long Division Calculator",
    keyword: "long division calculator",
    description: "Divide two whole numbers and see the full step-by-step long division work.",
    intro: "Enter a dividend and divisor to see the quotient, remainder, and the full step-by-step long division work.",
    fields: [
      { id: "dividend", label: "Dividend", type: "number", default: 987, step: 1 },
      { id: "divisor", label: "Divisor", type: "number", default: 7, step: 1 },
    ],
    compute: (v) => {
      const dividend = Math.round(Math.abs(v.dividend));
      const divisor = Math.round(Math.abs(v.divisor));
      if (divisor === 0) {
        return { primary: { label: "Result", value: "Undefined" }, secondary: [], note: "Division by zero is undefined." };
      }
      const digits = String(dividend).split("").map(Number);
      let remainder = 0;
      let quotientDigits = [];
      const rows = [];
      for (const digit of digits) {
        const current = remainder * 10 + digit;
        const qDigit = Math.floor(current / divisor);
        const subtract = qDigit * divisor;
        const newRemainder = current - subtract;
        quotientDigits.push(qDigit);
        rows.push([digit, current, qDigit, subtract, newRemainder]);
        remainder = newRemainder;
      }
      let quotientStr = quotientDigits.join("");
      quotientStr = quotientStr.replace(/^0+(?=\d)/, "");
      return {
        primary: { label: "Quotient", value: quotientStr },
        secondary: [
          { l: "Remainder", v: remainder },
          { l: "As a decimal", v: round(dividend / divisor, 6) },
        ],
        note: "Scroll the table below for the full digit-by-digit long division steps.",
        table: {
          columns: ["Digit brought down", "Value", "Quotient digit", "Subtract (digit × divisor)", "Remainder"],
          rows,
        },
      };
    },
    faq: [
      { q: "How do I do long division step by step?", a: "Bring down one digit of the dividend at a time, divide the running value by the divisor to get a quotient digit, multiply that digit by the divisor and subtract it from the running value, then bring down the next digit and repeat - this calculator shows every one of those steps in the table." },
      { q: "What does the remainder mean?", a: "The remainder is what's left over after dividing as many whole times as possible - for 23 ÷ 5, the quotient is 4 (5×4=20) with a remainder of 3 (23−20), since 5 doesn't divide evenly into 23." },
      { q: "Does this work with negative numbers?", a: "This calculator works with the absolute (positive) value of whatever you enter, since long division as a step-by-step method is defined for positive whole numbers - apply the sign rules separately (a negative dividend or divisor, but not both, gives a negative result) after getting the positive quotient and remainder here." },
    ],
    related: ["fraction-calculator", "gcd-lcm-calculator", "percentage-calculator"],
  },
  {
    id: "long-multiplication-calculator",
    category: "math",
    title: "Long Multiplication Calculator",
    keyword: "multiplication long",
    description: "Multiply two whole numbers and see the full step-by-step long multiplication work.",
    intro: "Enter two numbers to see the product, plus the full step-by-step long multiplication work (partial products for each digit).",
    fields: [
      { id: "factor1", label: "First number", type: "number", default: 234, step: 1 },
      { id: "factor2", label: "Second number", type: "number", default: 56, step: 1 },
    ],
    compute: (v) => {
      const f1 = Math.round(Math.abs(v.factor1));
      const f2 = Math.round(Math.abs(v.factor2));
      const digits2 = String(f2).split("").reverse();
      const rows = [];
      let total = 0;
      digits2.forEach((digitChar, placeIdx) => {
        const digit = Number(digitChar);
        const partial = f1 * digit * Math.pow(10, placeIdx);
        total += partial;
        rows.push([
          `${f1} × ${digit} (×10^${placeIdx})`,
          `${f1} × ${digit} = ${f1 * digit}`,
          partial.toLocaleString(),
        ]);
      });
      rows.push(["Sum of partial products", "—", total.toLocaleString()]);
      return {
        primary: { label: "Product", value: total.toLocaleString() },
        secondary: [
          { l: "First number", v: f1 },
          { l: "Second number", v: f2 },
        ],
        note: "Scroll the table below for the full digit-by-digit long multiplication work.",
        table: { columns: ["Step", "Digit multiplication", "Partial product"], rows },
      };
    },
    faq: [
      { q: "How does long multiplication work?", a: "Multiply the first number by each digit of the second number separately (starting from the ones place), shifting each result left by one place value per digit, then add all those partial products together for the final answer - this calculator shows every partial product in the table." },
      { q: "Why do partial products get shifted left as you go?", a: "Each digit in the second number represents a different place value (ones, tens, hundreds, etc.), so multiplying by the tens digit really means multiplying by that digit times 10 - shifting the partial product one place left accounts for that automatically." },
      { q: "Does this work with negative numbers?", a: "This calculator works with the absolute (positive) value of whatever you enter, since long multiplication as a step-by-step method is defined for positive whole numbers - apply sign rules separately afterward (a result is negative if exactly one of the two numbers was negative)." },
    ],
    related: ["long-division-calculator", "fraction-calculator", "percentage-calculator"],
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
    id: "factor-calculator",
    category: "math",
    title: "Factor Calculator",
    keyword: "factor calculator",
    description: "Find all factors and the prime factorization of a whole number.",
    intro: "Enter a positive whole number to list all of its factors and break it down into its prime factorization.",
    fields: [
      { id: "number", label: "Number", type: "number", default: 360, step: 1, min: 1 },
    ],
    compute: (v) => {
      const n = Math.round(Math.abs(v.number));
      const facs = [];
      for (let i = 1; i * i <= n; i++) {
        if (n % i === 0) {
          facs.push(i);
          if (i !== n / i) facs.push(n / i);
        }
      }
      facs.sort((a, b) => a - b);
      const primeFactors = [];
      let rem = n;
      for (let d = 2; d * d <= rem; d++) {
        while (rem % d === 0) { primeFactors.push(d); rem /= d; }
      }
      if (rem > 1) primeFactors.push(rem);
      return {
        primary: { label: "Number of factors", value: facs.length },
        secondary: [
          { l: "All factors", v: facs.join(", ") },
          { l: "Prime factorization", v: primeFactors.length > 1 ? primeFactors.join(" × ") : `${n} (prime)` },
        ],
      };
    },
    faq: [
      { q: "What are the factors of 360?", a: "1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, and 360 - 24 factors in total." },
      { q: "What is the prime factorization of 360?", a: "2 × 2 × 2 × 3 × 3 × 5 (or 2³ × 3² × 5) - breaking a number down into the prime numbers that multiply together to produce it." },
      { q: "How is this different from the GCD and LCM Calculator?", a: "This tool finds every factor of a single number. The GCD and LCM Calculator instead compares two numbers to find their greatest common divisor and least common multiple - use that one if you're comparing two numbers rather than analyzing one." },
      { q: "How do you know when a number is prime?", a: "A number is prime if its only factors are 1 and itself - enter it here and if the factor list contains only those two numbers (or the prime factorization shows just the number itself), it's prime." },
    ],
    related: ["gcd-lcm-calculator", "fraction-calculator", "percentage-calculator"],
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
      { q: "Where do I find standard deviation on a calculator?", a: "You don't need a special scientific calculator function - enter your list of numbers above (separated by commas or spaces) and this calculator computes the standard deviation directly, along with the variance and mean." },
    ],
    related: ["average-calculator", "fraction-calculator", "gcd-lcm-calculator"],
  },
  {
    id: "t-test-calculator",
    category: "math",
    title: "T-Test Calculator",
    keyword: "t test calculator",
    description: "Calculate the t-statistic for a two-sample independent t-test.",
    intro: "Enter each group's mean, standard deviation, and sample size to calculate the t-statistic and degrees of freedom.",
    fields: [
      { id: "mean1", label: "Group 1 mean", type: "number", default: 105, step: 0.1 },
      { id: "sd1", label: "Group 1 standard deviation", type: "number", default: 15, step: 0.1 },
      { id: "n1", label: "Group 1 sample size", type: "number", default: 30, step: 1, min: 2 },
      { id: "mean2", label: "Group 2 mean", type: "number", default: 100, step: 0.1 },
      { id: "sd2", label: "Group 2 standard deviation", type: "number", default: 14, step: 0.1 },
      { id: "n2", label: "Group 2 sample size", type: "number", default: 30, step: 1, min: 2 },
    ],
    compute: (v) => {
      const pooledVar = ((v.n1 - 1) * v.sd1 * v.sd1 + (v.n2 - 1) * v.sd2 * v.sd2) / (v.n1 + v.n2 - 2);
      const se = Math.sqrt(pooledVar * (1 / v.n1 + 1 / v.n2));
      const t = (v.mean1 - v.mean2) / se;
      const df = v.n1 + v.n2 - 2;
      return {
        primary: { label: "t-statistic", value: round(t, 4) },
        secondary: [
          { l: "Degrees of freedom", v: df },
          { l: "Pooled standard error", v: round(se, 4) },
        ],
        note: "This is the independent (unpaired) two-sample t-test with pooled variance, assuming both groups have similar variance. Compare |t| to a critical value from a t-table at your chosen significance level and these degrees of freedom to determine significance.",
      };
    },
    faq: [
      { q: "What does the t-statistic tell me?", a: "It measures how many standard errors apart the two group means are - the larger |t| is, the less likely the difference between groups happened by chance alone, assuming the null hypothesis (no real difference) is true." },
      { q: "How do I know if my result is statistically significant?", a: "Compare your calculated |t| to a critical value from a t-distribution table, using your degrees of freedom and chosen significance level (commonly 0.05) - if |t| exceeds the critical value, the result is significant at that level." },
      { q: "What's the difference between this and a paired t-test?", a: "This calculator assumes two independent groups (like a treatment group vs. a control group of different people). A paired t-test instead compares two measurements on the same subjects (like before/after) - for that, calculate the mean and standard deviation of the differences, then treat it as a one-sample t-test against zero." },
      { q: "Why does this use \"pooled\" standard deviation?", a: "Pooling combines both groups' variance into a single weighted estimate, which is the standard approach when you can reasonably assume both groups have similar underlying variance - it uses more of your data than relying on either group's variance alone." },
    ],
    related: ["standard-deviation-calculator", "z-score-calculator", "sample-size-calculator"],
  },
  {
    id: "effect-size-calculator",
    category: "math",
    title: "Effect Size Calculator (Cohen's d)",
    keyword: "effect size calculator",
    description: "Calculate Cohen's d to measure the standardized difference between two group means.",
    intro: "Enter each group's mean, standard deviation, and sample size to calculate Cohen's d effect size.",
    fields: [
      { id: "mean1", label: "Group 1 mean", type: "number", default: 105, step: 0.1 },
      { id: "sd1", label: "Group 1 standard deviation", type: "number", default: 15, step: 0.1 },
      { id: "n1", label: "Group 1 sample size", type: "number", default: 30, step: 1, min: 2 },
      { id: "mean2", label: "Group 2 mean", type: "number", default: 100, step: 0.1 },
      { id: "sd2", label: "Group 2 standard deviation", type: "number", default: 14, step: 0.1 },
      { id: "n2", label: "Group 2 sample size", type: "number", default: 30, step: 1, min: 2 },
    ],
    compute: (v) => {
      const pooledSd = Math.sqrt(((v.n1 - 1) * v.sd1 * v.sd1 + (v.n2 - 1) * v.sd2 * v.sd2) / (v.n1 + v.n2 - 2));
      const d = (v.mean1 - v.mean2) / pooledSd;
      const absD = Math.abs(d);
      let magnitude = "negligible";
      if (absD >= 0.8) magnitude = "large";
      else if (absD >= 0.5) magnitude = "medium";
      else if (absD >= 0.2) magnitude = "small";
      return {
        primary: { label: "Cohen's d", value: round(d, 4) },
        secondary: [
          { l: "Pooled standard deviation", v: round(pooledSd, 4) },
          { l: "Conventional magnitude", v: magnitude },
        ],
        note: "Cohen's conventional benchmarks: ~0.2 = small, ~0.5 = medium, ~0.8 = large effect - useful as a rough guide, not a strict rule, since what counts as a meaningful effect varies by field.",
      };
    },
    faq: [
      { q: "What is Cohen's d?", a: "A standardized measure of the difference between two group means, expressed in units of pooled standard deviation: d = (mean1 − mean2) ÷ pooled SD. It lets you compare effect sizes across studies that used different scales or units." },
      { q: "What do Cohen's d values mean in practice?", a: "By Cohen's original conventions: about 0.2 is a small effect, 0.5 a medium effect, and 0.8 a large effect - meaning the groups' means differ by that many pooled standard deviations. These are rough benchmarks, not hard cutoffs." },
      { q: "How is Cohen's d different from a t-test?", a: "A t-test tells you whether a difference is statistically significant (unlikely due to chance), while Cohen's d tells you how large that difference is in a standardized, comparable way - a result can be statistically significant with a tiny effect size, especially with large samples." },
      { q: "Why does sample size not appear directly in the effect size formula?", a: "Effect size measures the magnitude of a difference independent of how much data you collected, unlike a t-test's significance, which does depend on sample size - a small, consistent difference will show a similar Cohen's d whether measured with 10 or 10,000 people, even though only the larger sample might reach statistical significance." },
    ],
    related: ["t-test-calculator", "standard-deviation-calculator", "z-score-calculator"],
  },
  {
    id: "mann-whitney-u-calculator",
    category: "math",
    title: "Mann-Whitney U Test Calculator",
    keyword: "mann whitney u test calculator",
    description: "Calculate the Mann-Whitney U statistic for two independent groups, a non-parametric alternative to the t-test.",
    intro: "Enter two groups of numbers (one per line or comma-separated) to calculate the Mann-Whitney U statistic.",
    fields: [
      { id: "group1", label: "Group 1 (comma or line separated)", type: "textarea", default: "1, 3, 5, 7, 9" },
      { id: "group2", label: "Group 2 (comma or line separated)", type: "textarea", default: "2, 4, 6, 8, 10" },
    ],
    compute: (v) => {
      const parse = (s) => (s || "").split(/[,\n]+/).map((x) => x.trim()).filter(Boolean).map(Number).filter((n) => !isNaN(n));
      const g1 = parse(v.group1);
      const g2 = parse(v.group2);
      const n1 = g1.length, n2 = g2.length;
      if (n1 < 2 || n2 < 2) {
        return { primary: { label: "Need more data", value: "-" }, secondary: [], note: "Enter at least 2 numbers in each group." };
      }
      const combined = [...g1.map((x) => ({ val: x, group: 1 })), ...g2.map((x) => ({ val: x, group: 2 }))];
      combined.sort((a, b) => a.val - b.val);
      const ranks = new Array(combined.length);
      let i = 0;
      while (i < combined.length) {
        let j = i;
        while (j < combined.length && combined[j].val === combined[i].val) j++;
        const avgRank = (i + 1 + j) / 2;
        for (let k = i; k < j; k++) ranks[k] = avgRank;
        i = j;
      }
      const R1 = combined.reduce((sum, item, idx) => item.group === 1 ? sum + ranks[idx] : sum, 0);
      const U1 = R1 - (n1 * (n1 + 1)) / 2;
      const U2 = n1 * n2 - U1;
      const U = Math.min(U1, U2);
      const meanU = (n1 * n2) / 2;
      const sigmaU = Math.sqrt((n1 * n2 * (n1 + n2 + 1)) / 12);
      const z = sigmaU > 0 ? (U1 - meanU) / sigmaU : 0;
      return {
        primary: { label: "U statistic", value: U },
        secondary: [
          { l: "U1, U2", v: `${round(U1, 2)}, ${round(U2, 2)}` },
          { l: "z-score (normal approximation)", v: round(z, 4) },
        ],
        note: "Uses the rank-sum method with tied ranks averaged. The z-score approximation is reasonably accurate for n1 and n2 both above about 8-10; for smaller samples, compare U directly to an exact Mann-Whitney critical value table.",
      };
    },
    faq: [
      { q: "What is the Mann-Whitney U test used for?", a: "Comparing two independent groups to see if they come from the same distribution, without assuming the data is normally distributed - it's the non-parametric alternative to the independent two-sample t-test, based on ranking rather than means." },
      { q: "How is U calculated?", a: "Combine both groups, rank all values together (averaging ranks for ties), sum the ranks for group 1 (R1), then U1 = R1 − n1(n1+1)/2. U2 is found the same way for group 2, or as n1×n2 − U1. The reported U statistic is the smaller of U1 and U2." },
      { q: "How do I know if my result is significant?", a: "For larger samples, compare the z-score to a standard normal critical value (like ±1.96 for a 0.05 two-tailed test). For smaller samples (roughly n1 or n2 under 8-10), the normal approximation is less reliable - look up your exact U statistic against a Mann-Whitney critical value table instead." },
      { q: "When should I use this instead of a t-test?", a: "When your data isn't normally distributed, contains outliers, or is ordinal rather than truly numeric - the Mann-Whitney test only relies on rank order, making it more robust than the t-test to non-normal distributions and extreme values." },
    ],
    related: ["t-test-calculator", "standard-deviation-calculator", "effect-size-calculator"],
  },
  {
    id: "sequences-series-calculator",
    category: "math",
    title: "Sequences and Series Calculator",
    keyword: "sequences and series calculator",
    description: "Calculate the nth term and sum of an arithmetic or geometric sequence.",
    intro: "Choose a sequence type, enter the first term and common difference or ratio, and how many terms to find the nth term and the sum.",
    fields: [
      { id: "type", label: "Sequence type", type: "select", default: "arithmetic", options: [
        { v: "arithmetic", l: "Arithmetic (common difference)" }, { v: "geometric", l: "Geometric (common ratio)" },
      ] },
      { id: "a1", label: "First term (a₁)", type: "number", default: 3, step: 0.1 },
      { id: "dr", label: "Common difference (d) or ratio (r)", type: "number", default: 5, step: 0.1 },
      { id: "n", label: "Number of terms (n)", type: "number", default: 10, step: 1, min: 1 },
    ],
    compute: (v) => {
      const n = Math.round(v.n);
      if (v.type === "arithmetic") {
        const an = v.a1 + (n - 1) * v.dr;
        const sum = (n / 2) * (2 * v.a1 + (n - 1) * v.dr);
        return {
          primary: { label: `Term ${n} (aₙ)`, value: round(an, 6) },
          secondary: [{ l: `Sum of first ${n} terms`, v: round(sum, 6) }],
          note: `aₙ = a₁ + (n−1)d = ${v.a1} + (${n}−1)×${v.dr} = ${round(an, 6)}. Sum = n/2 × (2a₁ + (n−1)d).`,
        };
      }
      const r = v.dr;
      const an = v.a1 * Math.pow(r, n - 1);
      const sum = r === 1 ? v.a1 * n : v.a1 * (1 - Math.pow(r, n)) / (1 - r);
      return {
        primary: { label: `Term ${n} (aₙ)`, value: round(an, 6) },
        secondary: [{ l: `Sum of first ${n} terms`, v: round(sum, 6) }],
        note: `aₙ = a₁ × r^(n−1) = ${v.a1} × ${r}^${n - 1} = ${round(an, 6)}. Sum = a₁(1−rⁿ)/(1−r) for r ≠ 1.`,
      };
    },
    faq: [
      { q: "What's the formula for the nth term of an arithmetic sequence?", a: "aₙ = a₁ + (n−1)d, where a₁ is the first term, d is the common difference, and n is the term number. For a₁=3, d=5, n=10: 3 + 9×5 = 48." },
      { q: "What's the formula for the sum of an arithmetic sequence?", a: "Sum = n/2 × (2a₁ + (n−1)d), or equivalently n × (first term + last term) / 2. For the first 10 terms of 3, 8, 13...: 10/2 × (6 + 45) = 255." },
      { q: "What's the formula for the nth term of a geometric sequence?", a: "aₙ = a₁ × r^(n−1), where r is the common ratio. For a₁=2, r=3, n=6: 2 × 3⁵ = 486." },
      { q: "What's the formula for the sum of a geometric sequence?", a: "Sum = a₁(1 − rⁿ) / (1 − r) for r ≠ 1. For a₁=2, r=3, n=6: 2×(1−729)/(1−3) = 728. If r = 1, every term equals a₁, so the sum is simply a₁ × n." },
    ],
    related: ["gcd-lcm-calculator", "average-calculator", "compound-interest-calculator"],
  },
  {
    id: "coupon-collector-calculator",
    category: "math",
    title: "Coupon Collector Calculator",
    keyword: "coupon collector calculator",
    description: "Calculate the expected number of draws needed to collect all n distinct items.",
    intro: "Enter how many distinct items exist (like coupon types, cards, or prizes) to find the expected number of random draws to collect them all.",
    fields: [
      { id: "n", label: "Number of distinct items", type: "number", default: 6, step: 1, min: 1 },
    ],
    compute: (v) => {
      const n = Math.round(v.n);
      let harmonicSum = 0;
      for (let k = 1; k <= n; k++) harmonicSum += 1 / k;
      const expectedDraws = n * harmonicSum;
      return {
        primary: { label: "Expected draws to collect all", value: round(expectedDraws, 2) },
        secondary: [{ l: "Harmonic number (Hₙ)", v: round(harmonicSum, 4) }],
        note: "This is the classic \"coupon collector's problem\": expected draws = n × Hₙ, where Hₙ is the nth harmonic number (1 + 1/2 + 1/3 + ... + 1/n). Assumes each draw is independent and equally likely to be any of the n items.",
      };
    },
    faq: [
      { q: "What is the coupon collector's problem?", a: "A classic probability problem: if there are n distinct items and each random draw is equally likely to be any one of them (with replacement), how many draws on average does it take to collect at least one of every item?" },
      { q: "What's the expected number of draws to collect all 6 items?", a: "About 14.7 draws - using expected draws = n × Hₙ = 6 × (1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6) = 6 × 2.45 ≈ 14.7." },
      { q: "Why does it get disproportionately harder to collect the last few items?", a: "Early draws are likely to be new items since most of the set is still uncollected, but as you collect more, each new draw has a shrinking chance of being one of the few remaining types - the last item alone takes n draws on average to find." },
      { q: "Does this assume every item is equally likely to be drawn?", a: "Yes - this calculation assumes a uniform distribution, where each of the n items has an equal 1/n chance on every draw. If some items are rarer than others, the actual expected number of draws will be higher than this estimate." },
    ],
    related: ["random-number-generator", "lottery-odds-calculator", "poker-hand-probability-calculator"],
  },
  {
    id: "similarity-ratio-calculator",
    category: "math",
    title: "Similarity Ratio Calculator",
    keyword: "similarity ratio calculator",
    description: "Calculate the area and volume ratio between two similar figures from their side length ratio.",
    intro: "Enter the scale factor (ratio of corresponding side lengths) between two similar figures to find the resulting area and volume ratios.",
    fields: [
      { id: "scaleFactor", label: "Scale factor (side length ratio, k)", type: "number", default: 3, step: 0.1, min: 0 },
    ],
    compute: (v) => {
      const k = v.scaleFactor;
      const areaRatio = k * k;
      const volumeRatio = k * k * k;
      return {
        primary: { label: "Area ratio (k²)", value: round(areaRatio, 4) },
        secondary: [{ l: "Volume ratio (k³)", v: round(volumeRatio, 4) }],
        note: "For similar figures, if corresponding side lengths scale by a factor k, area scales by k² and volume scales by k³ - this holds for any similar shapes, not just simple ones like squares and cubes.",
      };
    },
    faq: [
      { q: "If two similar shapes have sides in a 1:3 ratio, what's their area ratio?", a: "1:9 - area scales with the square of the linear scale factor, so a side ratio of 3 gives an area ratio of 3² = 9." },
      { q: "If two similar solids have sides in a 1:3 ratio, what's their volume ratio?", a: "1:27 - volume scales with the cube of the linear scale factor, so a side ratio of 3 gives a volume ratio of 3³ = 27." },
      { q: "Why does area scale by the square and volume by the cube?", a: "Area is a two-dimensional measurement (length × length), so both dimensions scale by k, multiplying the area by k×k = k². Volume is three-dimensional (length × length × length), so all three dimensions scale by k, multiplying volume by k×k×k = k³." },
      { q: "Does this work for any similar shapes, or just squares and cubes?", a: "Any similar shapes - triangles, circles, irregular polygons, spheres, or complex solids. As long as one figure is a uniform scaled copy of the other, the k² area rule and k³ volume rule apply regardless of the specific shape." },
    ],
    related: ["pythagorean-theorem-calculator", "rectangular-prism-volume-calculator", "trapezoid-area-calculator"],
  },
  {
    id: "color-difference-checker",
    category: "text",
    title: "Color Difference Checker",
    keyword: "color difference checker",
    description: "Compare two colors and measure how different they are.",
    intro: "Enter two hex colors to see how visually different they are, from identical to very different.",
    fields: [
      { id: "color1", label: "Color 1 (hex)", type: "text", default: "#3366CC" },
      { id: "color2", label: "Color 2 (hex)", type: "text", default: "#33CC66" },
    ],
    compute: (v) => {
      const parseHex = (hex) => {
        const clean = hex.replace("#", "").trim();
        const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
        const num = parseInt(full, 16);
        if (full.length !== 6 || isNaN(num)) return null;
        return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
      };
      const c1 = parseHex(v.color1);
      const c2 = parseHex(v.color2);
      if (!c1 || !c2) {
        return { primary: { label: "Invalid color", value: "Use hex format like #3366CC" }, secondary: [], note: "Enter both colors as 3- or 6-digit hex codes." };
      }
      const dr = c1.r - c2.r, dg = c1.g - c2.g, db = c1.b - c2.b;
      const distance = Math.sqrt(dr * dr + dg * dg + db * db);
      const maxDistance = Math.sqrt(255 * 255 * 3);
      const percentDiff = (distance / maxDistance) * 100;
      let label = "Identical";
      if (distance > 0) label = distance < 30 ? "Very similar" : distance < 100 ? "Noticeably different" : distance < 200 ? "Quite different" : "Very different";
      return {
        primary: { label: "Difference", value: label },
        secondary: [
          { l: "RGB distance", v: round(distance, 2) },
          { l: "As percent of max", v: `${round(percentDiff, 1)}%` },
        ],
        note: "Uses simple Euclidean distance in RGB space (0 = identical, ~441 = maximum possible difference, e.g. black vs. white). For color-critical work like printing or design systems, a perceptual metric like CIE Delta E is more accurate than raw RGB distance.",
      };
    },
    faq: [
      { q: "How is color difference calculated here?", a: "As the Euclidean distance between the two colors' red, green, and blue values, treating RGB as 3D coordinates: √((ΔR)² + (ΔG)² + (ΔB)²). It's a simple, fast measure of numerical difference." },
      { q: "What's the maximum possible difference?", a: "About 441.7, which is the distance between pure black (0,0,0) and pure white (255,255,255): √(255² × 3) ≈ 441.7." },
      { q: "Is RGB distance the same as how different colors look to the human eye?", a: "Not exactly - human color perception isn't uniform across RGB space (we're more sensitive to some hue differences than others), so a more accurate perceptual measure like CIE Delta E weights the components differently. RGB distance is a simpler, \"good enough\" approximation for most everyday comparisons." },
      { q: "Can I use this to check if two brand colors are too similar?", a: "Yes, as a rough check - a low RGB distance (under about 30) suggests colors that could be hard to tell apart, useful for flagging potential branding or accessibility conflicts before a more rigorous perceptual check." },
    ],
    related: ["color-mixer", "case-converter", "word-counter"],
  },
  {
    id: "correlation-calculator",
    category: "math",
    title: "Correlation Coefficient Calculator",
    keyword: "correlation test calculator",
    description: "Calculate the Pearson correlation coefficient (r) between two paired sets of numbers.",
    intro: "Enter two lists of paired numbers (same length, separated by commas or spaces) to calculate the Pearson correlation coefficient.",
    fields: [
      { id: "xValues", label: "X values", type: "text", default: "1, 2, 3, 4, 5" },
      { id: "yValues", label: "Y values", type: "text", default: "2, 4, 5, 4, 6" },
    ],
    compute: (v) => {
      const parseList = (s) => (s || "").split(/[,\s]+/).map(Number).filter((n) => !isNaN(n));
      const xs = parseList(v.xValues);
      const ys = parseList(v.yValues);
      if (xs.length < 2 || xs.length !== ys.length) {
        return { primary: { label: "Correlation (r)", value: "Invalid input" }, secondary: [], note: "Enter two equal-length lists of at least 2 numbers each, separated by commas or spaces." };
      }
      const n = xs.length;
      const meanX = xs.reduce((a, b) => a + b, 0) / n;
      const meanY = ys.reduce((a, b) => a + b, 0) / n;
      let cov = 0, varX = 0, varY = 0;
      for (let i = 0; i < n; i++) {
        const dx = xs[i] - meanX, dy = ys[i] - meanY;
        cov += dx * dy;
        varX += dx * dx;
        varY += dy * dy;
      }
      const denom = Math.sqrt(varX * varY);
      const r = denom === 0 ? null : cov / denom;
      let strength = "None";
      if (r !== null) {
        const abs = Math.abs(r);
        if (abs >= 0.8) strength = "Very strong";
        else if (abs >= 0.6) strength = "Strong";
        else if (abs >= 0.4) strength = "Moderate";
        else if (abs >= 0.2) strength = "Weak";
        else strength = "Very weak / none";
      }
      return {
        primary: { label: "Correlation (r)", value: r === null ? "Undefined" : round(r, 4) },
        secondary: [
          { l: "Direction", v: r === null ? "—" : r > 0 ? "Positive" : r < 0 ? "Negative" : "None" },
          { l: "Strength", v: strength },
        ],
        note: "r ranges from -1 (perfect negative) to +1 (perfect positive); 0 means no linear relationship. Correlation doesn't imply causation.",
      };
    },
    faq: [
      { q: "What does a correlation coefficient of 1 or -1 mean?", a: "A correlation of exactly 1 means the two variables have a perfect positive linear relationship (as one increases, the other increases proportionally); -1 means a perfect negative linear relationship (as one increases, the other decreases proportionally). Real-world data rarely hits exactly 1 or -1." },
      { q: "Does correlation prove causation?", a: "No - two variables can be strongly correlated without one causing the other, due to coincidence, a shared underlying cause, or reverse causation. Correlation only measures whether two variables tend to move together, not why." },
      { q: "What's considered a 'strong' correlation?", a: "There's no universal cutoff, but a common rough guide is: 0.8+ very strong, 0.6-0.8 strong, 0.4-0.6 moderate, 0.2-0.4 weak, and below 0.2 very weak or none - though what counts as \"strong enough\" varies a lot by field (social sciences vs. physical sciences, for example)." },
      { q: "Is a 'Pearson correlation calculator' or 'Pearson coefficient calculator' the same as this tool?", a: "Yes - \"Pearson\" refers to the Pearson product-moment correlation coefficient, which is the standard correlation measure this calculator computes. It's the most common type of correlation people mean by \"correlation\" without further specification." },
      { q: "Is an 'r correlation calculator' the same as this tool?", a: "Yes - \"r\" is the standard symbol for the Pearson correlation coefficient, so an \"r correlation calculator\" is asking for the same value this tool computes." },
    ],
    related: ["standard-deviation-calculator", "average-calculator", "percentage-calculator"],
  },
  {
    id: "z-score-calculator",
    category: "math",
    title: "Z-Score (Standardized Score) Calculator",
    keyword: "how to calculate standardized score",
    description: "Calculate a z-score (standardized score) and percentile from a value, mean, and standard deviation.",
    intro: "Enter a value, the mean, and the standard deviation of its distribution to calculate the z-score and percentile.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 85, step: 0.1 },
      { id: "mean", label: "Mean", type: "number", default: 75, step: 0.1 },
      { id: "stdDev", label: "Standard deviation", type: "number", default: 10, step: 0.1 },
    ],
    compute: (v) => {
      if (v.stdDev === 0) {
        return { primary: { label: "Z-score", value: "Undefined" }, secondary: [], note: "Standard deviation can't be zero." };
      }
      const z = (v.value - v.mean) / v.stdDev;
      function normalCdf(x) {
        const sign = x < 0 ? -1 : 1;
        const ax = Math.abs(x) / Math.sqrt(2);
        const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
        const t = 1 / (1 + p * ax);
        const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
        return 0.5 * (1 + sign * y);
      }
      const percentile = normalCdf(z) * 100;
      return {
        primary: { label: "Z-score", value: round(z, 4) },
        secondary: [
          { l: "Percentile", v: `${round(percentile, 2)}th` },
          { l: "Standard deviations from mean", v: `${round(Math.abs(z), 2)} ${z >= 0 ? "above" : "below"}` },
        ],
        note: "Percentile assumes a normal (bell-curve) distribution - the z-score itself doesn't depend on that assumption, but converting it to a percentile does.",
      };
    },
    faq: [
      { q: "How do I calculate a standardized score (z-score)?", a: "Subtract the mean from your value, then divide by the standard deviation: z = (x − mean) / SD. A score of 85 with a mean of 75 and standard deviation of 10 gives z = (85−75)/10 = 1.0, meaning the score is exactly 1 standard deviation above average." },
      { q: "What does a z-score of 0 mean?", a: "A z-score of 0 means the value is exactly equal to the mean - neither above nor below average. Positive z-scores are above the mean, negative z-scores are below it." },
      { q: "How is percentile calculated from a z-score?", a: "Using the standard normal cumulative distribution function, which gives the proportion of a normal distribution falling below a given z-score - a z-score of 1.0 corresponds to about the 84th percentile, meaning roughly 84% of values in a normal distribution fall below that point." },
      { q: "How do you calculate percentile in general?", a: "Enter your value, the distribution's mean, and its standard deviation above - this calculator converts that into a z-score, then into a percentile using the normal distribution. That's the standard method for calculating percentile when you know a distribution's mean and spread." },
    ],
    related: ["standard-deviation-calculator", "average-calculator", "percentage-calculator"],
  },
  {
    id: "confusion-matrix-calculator",
    category: "math",
    title: "Confusion Matrix Calculator",
    keyword: "confusion matrix calculator",
    description: "Calculate precision, recall, F1, specificity, accuracy, and other diagnostic test metrics from a confusion matrix.",
    intro: "Enter true positives, false positives, true negatives, and false negatives to calculate every standard classification and diagnostic test metric at once.",
    fields: [
      { id: "tp", label: "True positives (TP)", type: "number", default: 80, step: 1, min: 0 },
      { id: "fp", label: "False positives (FP)", type: "number", default: 10, step: 1, min: 0 },
      { id: "tn", label: "True negatives (TN)", type: "number", default: 850, step: 1, min: 0 },
      { id: "fn", label: "False negatives (FN)", type: "number", default: 60, step: 1, min: 0 },
    ],
    compute: (v) => {
      const { tp, fp, tn, fn } = v;
      const total = tp + fp + tn + fn;
      const precision = tp / (tp + fp);
      const recall = tp / (tp + fn);
      const specificity = tn / (tn + fp);
      const npv = tn / (tn + fn);
      const accuracy = (tp + tn) / total;
      const f1 = 2 * (precision * recall) / (precision + recall);
      const prevalence = (tp + fn) / total;
      return {
        primary: { label: "Precision (PPV)", value: `${round(precision * 100, 2)}%` },
        secondary: [
          { l: "Recall (Sensitivity)", v: `${round(recall * 100, 2)}%` },
          { l: "Specificity", v: `${round(specificity * 100, 2)}%` },
          { l: "F1 score", v: round(f1, 4) },
          { l: "Accuracy", v: `${round(accuracy * 100, 2)}%` },
          { l: "NPV", v: `${round(npv * 100, 2)}%` },
          { l: "Prevalence", v: `${round(prevalence * 100, 2)}%` },
        ],
        note: "Precision = TP/(TP+FP). Recall = TP/(TP+FN). Specificity = TN/(TN+FP). F1 = 2×(precision×recall)/(precision+recall). Accuracy = (TP+TN)/total. Same math applies whether you call it a classification model or a diagnostic test.",
      };
    },
    faq: [
      { q: "What's the difference between precision and recall?", a: "Precision asks: of everything flagged positive, how much was actually positive? (TP/(TP+FP)). Recall asks: of everything actually positive, how much did you catch? (TP/(TP+FN)). There's usually a tradeoff between the two." },
      { q: "What is the F1 score?", a: "The harmonic mean of precision and recall, giving a single balanced score: F1 = 2×(precision×recall)/(precision+recall). It's low if either precision or recall is low, unlike a simple average." },
      { q: "How is specificity different from recall (sensitivity)?", a: "Recall (sensitivity) measures how well you catch actual positives; specificity measures how well you correctly identify actual negatives (TN/(TN+FP)). A test can have high sensitivity but low specificity, or vice versa." },
      { q: "What's the difference between PPV and NPV?", a: "PPV (positive predictive value, same as precision) is the chance a positive result is truly positive. NPV (negative predictive value) is the chance a negative result is truly negative - both depend heavily on prevalence, not just the test's inherent accuracy." },
      { q: "Why does prevalence matter for interpreting these numbers?", a: "A test's sensitivity and specificity are fixed properties of the test itself, but PPV and NPV shift with how common the condition actually is - the same test gives a much lower PPV when screening a low-prevalence population than a high-prevalence one, even with identical sensitivity/specificity." },
    ],
    related: ["z-score-calculator", "sample-size-calculator", "standard-deviation-calculator"],
  },
  {
    id: "odds-probability-converter",
    category: "math",
    title: "Odds to Probability Converter",
    keyword: "odds probability converter",
    description: "Convert between probability and odds, in either direction.",
    intro: "Enter a value and choose a starting format to convert between probability and odds.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 0.25, step: 0.001 },
      { id: "from", label: "From", type: "select", default: "probability", options: [
        { v: "probability", l: "Probability (0 to 1)" }, { v: "odds", l: "Odds (e.g. 3 means 3-to-1)" },
      ] },
    ],
    compute: (v) => {
      let probability, odds;
      if (v.from === "probability") {
        probability = Math.max(0, Math.min(0.999999, v.value));
        odds = probability / (1 - probability);
      } else {
        odds = Math.max(0, v.value);
        probability = odds / (1 + odds);
      }
      return {
        primary: { label: "Probability", value: round(probability, 6) },
        secondary: [
          { l: "Odds", v: `${round(odds, 4)}-to-1` },
          { l: "Probability as percent", v: `${round(probability * 100, 4)}%` },
        ],
        note: "Odds = probability ÷ (1 − probability). Probability = odds ÷ (1 + odds).",
      };
    },
    faq: [
      { q: "How do I convert probability to odds?", a: "Divide the probability by (1 − probability). A 25% (0.25) probability converts to odds of 0.25 ÷ 0.75 = 0.333, or \"1-to-3\" odds." },
      { q: "How do I convert odds to probability?", a: "Divide the odds by (1 + odds). Odds of 3 (meaning 3-to-1) convert to probability of 3 ÷ 4 = 0.75, or 75%." },
      { q: "Why are probability and odds different numbers for the same likelihood?", a: "Probability compares favorable outcomes to all outcomes (favorable ÷ total), while odds compare favorable outcomes to unfavorable outcomes only (favorable ÷ unfavorable) - they measure the same underlying likelihood but with different denominators, which is why they diverge more as probability moves away from 50%." },
      { q: "At what probability are odds exactly 1-to-1?", a: "50% (0.5) - this is the only point where probability and odds \"look\" similar in a sense (even money), since favorable and unfavorable outcomes are equally likely." },
    ],
    related: ["percentage-calculator", "lottery-odds-calculator", "poker-hand-probability-calculator"],
  },
  {
    id: "normal-distribution-calculator",
    category: "math",
    title: "Normal Distribution Calculator",
    keyword: "normal distribution calculator",
    description: "Calculate the probability that a normally distributed value falls between two values, given the mean and standard deviation.",
    intro: "Enter a mean, standard deviation, and a value range to calculate the probability that a normally distributed value falls within that range.",
    fields: [
      { id: "mean", label: "Mean", type: "number", default: 100, step: 0.1 },
      { id: "stdDev", label: "Standard deviation", type: "number", default: 15, step: 0.1 },
      { id: "lower", label: "Lower bound", type: "number", default: 85, step: 0.1 },
      { id: "upper", label: "Upper bound", type: "number", default: 115, step: 0.1 },
    ],
    compute: (v) => {
      if (v.stdDev === 0) {
        return { primary: { label: "Probability", value: "Undefined" }, secondary: [], note: "Standard deviation can't be zero." };
      }
      function normalCdf(x) {
        const sign = x < 0 ? -1 : 1;
        const ax = Math.abs(x) / Math.sqrt(2);
        const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
        const t = 1 / (1 + p * ax);
        const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
        return 0.5 * (1 + sign * y);
      }
      const zLower = (v.lower - v.mean) / v.stdDev;
      const zUpper = (v.upper - v.mean) / v.stdDev;
      const probability = normalCdf(zUpper) - normalCdf(zLower);
      return {
        primary: { label: "Probability", value: `${round(probability * 100, 2)}%` },
        secondary: [
          { l: "Z-score (lower)", v: round(zLower, 4) },
          { l: "Z-score (upper)", v: round(zUpper, 4) },
        ],
        note: probability < 0 ? "Lower bound is above upper bound - swap them for a positive probability." : "Assumes a normal (bell-curve) distribution with the given mean and standard deviation.",
      };
    },
    faq: [
      { q: "How do I find the probability a value falls in a range for a normal distribution?", a: "Convert both bounds to z-scores (z = (x − mean) / SD), look up (or calculate) the cumulative probability for each z-score, then subtract: P(lower < X < upper) = CDF(z_upper) − CDF(z_lower). This calculator does that conversion automatically." },
      { q: "What's the probability within 1, 2, or 3 standard deviations of the mean?", a: "This follows the empirical rule (68-95-99.7 rule): about 68% of values fall within 1 standard deviation of the mean, about 95% within 2, and about 99.7% within 3 - try entering mean ± 1, 2, or 3 × standard deviation as your bounds to confirm this." },
      { q: "Is this the same as the Z-Score Calculator?", a: "Related but different - the Z-Score Calculator finds the percentile below a single value. This calculator finds the probability a value falls between two bounds, which is more useful for questions like \"what fraction of scores are between 85 and 115?\"" },
    ],
    related: ["z-score-calculator", "standard-deviation-calculator", "average-calculator"],
  },
  {
    id: "lottery-odds-calculator",
    category: "math",
    title: "Lottery Odds Calculator",
    keyword: "lottery odds calculator",
    description: "Calculate the odds of winning a lottery jackpot from the pool size and how many numbers are drawn.",
    intro: "Enter the lottery's main number pool and picks, plus an optional bonus-ball pool, to calculate the jackpot odds. Defaults are set to Powerball's actual rules.",
    fields: [
      { id: "mainPool", label: "Main number pool (1 to N)", type: "number", default: 69, step: 1, min: 1 },
      { id: "mainPicks", label: "Numbers drawn from main pool", type: "number", default: 5, step: 1, min: 1 },
      { id: "bonusPool", label: "Bonus ball pool (0 if none)", type: "number", default: 26, step: 1, min: 0 },
    ],
    compute: (v) => {
      function combinations(n, k) {
        if (k < 0 || k > n) return 0;
        k = Math.min(k, n - k);
        let result = 1;
        for (let i = 0; i < k; i++) {
          result = (result * (n - i)) / (i + 1);
        }
        return Math.round(result);
      }
      const mainCombos = combinations(v.mainPool, v.mainPicks);
      const totalCombos = v.bonusPool > 0 ? mainCombos * v.bonusPool : mainCombos;
      return {
        primary: { label: "Odds of winning the jackpot", value: `1 in ${totalCombos.toLocaleString()}` },
        secondary: [
          { l: "Main pool combinations", v: mainCombos.toLocaleString() },
          { l: "Total combinations", v: totalCombos.toLocaleString() },
        ],
        note: "Assumes numbers are drawn without replacement and order doesn't matter (standard lottery rules) - the default values match the actual Powerball jackpot format (5 of 69, plus 1 of 26).",
      };
    },
    faq: [
      { q: "What are the actual odds of winning the Powerball jackpot?", a: "1 in 292,201,338 - calculated from choosing 5 numbers correctly out of 69 (11,238,513 combinations), then multiplying by the 26 possible Powerball numbers, since you need to match that separately drawn number too." },
      { q: "How is the number of possible combinations calculated?", a: "Using the combinations formula (n choose k) = n! / (k!(n−k)!), which counts how many ways you can choose k numbers from a pool of n where order doesn't matter - that's why lottery odds use combinations, not permutations." },
      { q: "Why does adding a bonus ball make the odds so much worse?", a: "Because you multiply the main-pool combinations by the bonus pool size, since you need both the right main numbers AND the right bonus number - Powerball's main-pool-only odds are about 1 in 11.2 million, but requiring the correct Powerball number too (1 in 26) multiplies that to roughly 1 in 292 million." },
      { q: "Is 'odds for winning lottery,' 'what are chances of winning lotto,' and 'odds of winning the lottery' the same as this tool?", a: "Yes - every one of these phrasings is asking for the same thing: the probability of matching a lottery jackpot's numbers, which this calculator computes from the pool size, picks, and bonus ball settings above." },
    ],
    related: ["random-number-generator", "percentage-calculator", "gcd-lcm-calculator"],
  },
  {
    id: "poker-hand-probability-calculator",
    category: "math",
    title: "Poker Hand Probability Calculator",
    keyword: "poker hand percentages calculator",
    description: "See the exact probability and odds of every 5-card poker hand ranking, out of a standard 52-card deck.",
    intro: "This table shows the exact count, probability, and odds of every 5-card poker hand ranking from a standard 52-card deck.",
    fields: [],
    compute: () => {
      // Standard 5-card-hand counts out of C(52,5) = 2,598,960 total hands.
      // Each count is a direct combinatorial calculation (e.g. four of a
      // kind = 13 ranks x 48 remaining cards = 624); these are fixed
      // mathematical facts about a 52-card deck, not sourced data.
      const totalHands = 2598960;
      const hands = [
        ["Royal flush", 4],
        ["Straight flush", 36],
        ["Four of a kind", 624],
        ["Full house", 3744],
        ["Flush", 5108],
        ["Straight", 10200],
        ["Three of a kind", 54912],
        ["Two pair", 123552],
        ["One pair", 1098240],
        ["High card", 1302540],
      ];
      const rows = hands.map(([name, count]) => [
        name,
        count.toLocaleString(),
        `${round((count / totalHands) * 100, 4)}%`,
        `1 in ${round(totalHands / count, 0).toLocaleString()}`,
      ]);
      return {
        primary: { label: "Total 5-card hands", value: totalHands.toLocaleString() },
        secondary: [{ l: "Rarest hand", v: "Royal flush" }, { l: "Most common", v: "High card" }],
        note: "Based on a standard 52-card deck, 5 cards dealt with no wild cards.",
        table: { columns: ["Hand", "Ways to make it", "Probability", "Odds"], rows },
      };
    },
    faq: [
      { q: "What are the odds of a royal flush?", a: "1 in 649,740 - there are only 4 ways to make a royal flush (one per suit) out of 2,598,960 possible 5-card hands, making it the rarest standard poker hand." },
      { q: "Why is a flush rarer than a straight even though it ranks higher?", a: "Actually, in standard hand rankings a flush does rank higher than a straight, and it is rarer - a flush has 5,108 ways to occur versus a straight's 10,200, which matches the table above and confirms flush is the less common (and higher-ranked) hand." },
      { q: "How are these probabilities calculated?", a: "Each hand type's count comes from combinatorics - for example, four of a kind is 13 possible ranks × 48 remaining cards for the 5th card = 624 ways, divided by the total 2,598,960 possible 5-card hands from a 52-card deck." },
      { q: "Is a 'poker hand percentage calculator' the same as this tool?", a: "Yes - the table above shows the exact percentage (and odds) for every standard poker hand ranking." },
    ],
    related: ["lottery-odds-calculator", "card-deck-shuffler", "random-number-generator"],
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
      { q: "Is a 'proportions calculator' the same as this ratio calculator?", a: "Yes - a proportion is just two ratios set equal to each other, so a proportions calculator and a ratio calculator solve the same underlying math. Enter your two known values above to simplify a ratio, or use the proportion FAQ above to solve for a missing fourth value." },
      { q: "Is a 'proportion solver' different from a proportion calculator?", a: "No - \"solver\" and \"calculator\" describe the same thing here: finding a missing value in a proportion, or simplifying a ratio. This tool handles both." },
    ],
    related: ["fraction-calculator", "gcd-lcm-calculator", "percentage-calculator"],
  },
  {
    id: "aspect-ratio-calculator",
    category: "math",
    title: "Aspect Ratio Calculator",
    keyword: "aspect ratio calculator",
    description: "Calculate a photo or video's aspect ratio, and find a matching height or width for a new size.",
    intro: "Enter a width and height to find the simplified aspect ratio, plus the matching dimension for a new size.",
    fields: [
      { id: "width", label: "Original width", type: "number", default: 1920, step: 1 },
      { id: "height", label: "Original height", type: "number", default: 1080, step: 1 },
      { id: "newWidth", label: "New width (optional)", type: "number", default: 800, step: 1 },
    ],
    compute: (v) => {
      const g = gcd(Math.round(v.width), Math.round(v.height));
      const ratioW = g === 0 ? v.width : v.width / g;
      const ratioH = g === 0 ? v.height : v.height / g;
      const matchingHeight = v.width === 0 ? 0 : (v.newWidth * v.height) / v.width;
      return {
        primary: { label: "Aspect ratio", value: `${round(ratioW, 2)}:${round(ratioH, 2)}` },
        secondary: [
          { l: "Decimal ratio", v: round(v.width / v.height, 4) },
          { l: `Height at width ${v.newWidth}`, v: round(matchingHeight, 1) },
        ],
        note: "The matching height/width keeps the same proportions as your original image or video, avoiding a stretched or squashed resize.",
      };
    },
    faq: [
      { q: "How do I calculate an aspect ratio?", a: "Divide both the width and height by their greatest common divisor (GCD) to simplify them to the smallest whole-number ratio - 1920×1080 simplifies to 16:9, since GCD(1920, 1080) = 120, and 1920÷120=16, 1080÷120=9." },
      { q: "How do I resize an image without distorting it?", a: "Keep the same aspect ratio: pick your new width, then calculate the matching height using (new width × original height) ÷ original width - that's exactly what this calculator's \"new width\" field does." },
      { q: "What does a 'photo ratio' like 4:3 or 16:9 mean?", a: "It's the proportional relationship between an image's width and height - 4:3 is a more square-ish traditional photo/TV shape, while 16:9 is the wider, more cinematic shape used by most modern screens and video." },
    ],
    related: ["unit-length-converter", "area-converter", "ratio-calculator"],
  },
  {
    id: "screen-ppi-calculator",
    category: "conversions",
    title: "Screen PPI Calculator",
    keyword: "screen ppi calculator",
    description: "Calculate a screen's pixel density (PPI) from resolution and diagonal size.",
    intro: "Enter a screen's pixel resolution and diagonal size to calculate its pixels per inch (PPI).",
    fields: [
      { id: "widthPx", label: "Horizontal resolution", type: "number", unit: "px", default: 1920, step: 1 },
      { id: "heightPx", label: "Vertical resolution", type: "number", unit: "px", default: 1080, step: 1 },
      { id: "diagonalIn", label: "Diagonal screen size", type: "number", unit: "in", default: 24, step: 0.1 },
    ],
    compute: (v) => {
      const diagonalPx = Math.sqrt(v.widthPx * v.widthPx + v.heightPx * v.heightPx);
      const ppi = diagonalPx / v.diagonalIn;
      const totalPixels = v.widthPx * v.heightPx;
      return {
        primary: { label: "Pixel density", value: `${round(ppi, 2)} PPI` },
        secondary: [
          { l: "Total pixels", v: `${round(totalPixels / 1000000, 2)} MP` },
          { l: "Diagonal pixels", v: round(diagonalPx, 1) },
        ],
        note: "PPI = diagonal resolution (in pixels) ÷ diagonal size (in inches). Diagonal pixels use the Pythagorean theorem: √(width² + height²).",
      };
    },
    faq: [
      { q: "What is PPI?", a: "Pixels per inch - a measure of screen pixel density. Higher PPI means individual pixels are smaller and harder to see, producing a sharper image at a given viewing distance." },
      { q: "What is the PPI of a 1920×1080 24-inch monitor?", a: "About 91.79 PPI - the diagonal resolution is √(1920² + 1080²) ≈ 2203.1 pixels, divided by the 24-inch diagonal screen size." },
      { q: "Why does PPI matter for choosing a monitor or phone?", a: "Higher PPI generally produces a sharper, more detailed image, but the difference becomes less noticeable the farther away you sit - phones (viewed close-up) benefit more from very high PPI than a TV (viewed from across a room)." },
      { q: "What's the difference between PPI and DPI?", a: "PPI (pixels per inch) describes screen or digital image resolution. DPI (dots per inch) technically refers to physical printer output resolution, though the terms are often used interchangeably in casual conversation." },
    ],
    related: ["print-dpi-calculator", "aspect-ratio-calculator", "unit-length-converter"],
  },
  {
    id: "print-dpi-calculator",
    category: "conversions",
    title: "Print DPI Calculator",
    keyword: "print dpi calculator",
    description: "Calculate the effective print resolution (DPI) for a photo at a given print size.",
    intro: "Enter your image's pixel dimensions and the print size to calculate the effective DPI (dots per inch).",
    fields: [
      { id: "widthPx", label: "Image width", type: "number", unit: "px", default: 3000, step: 1 },
      { id: "heightPx", label: "Image height", type: "number", unit: "px", default: 2000, step: 1 },
      { id: "printWidthIn", label: "Print width", type: "number", unit: "in", default: 10, step: 0.1 },
      { id: "printHeightIn", label: "Print height", type: "number", unit: "in", default: 6.67, step: 0.1 },
    ],
    compute: (v) => {
      const dpiWidth = v.widthPx / v.printWidthIn;
      const dpiHeight = v.heightPx / v.printHeightIn;
      const effectiveDpi = Math.min(dpiWidth, dpiHeight);
      let quality = "Low (visible pixelation)";
      if (effectiveDpi >= 300) quality = "Excellent (professional print quality)";
      else if (effectiveDpi >= 200) quality = "Good (standard photo print quality)";
      else if (effectiveDpi >= 150) quality = "Acceptable (for larger viewing distances)";
      return {
        primary: { label: "Effective DPI", value: round(effectiveDpi, 1) },
        secondary: [
          { l: "Print quality", v: quality },
          { l: "Width/height DPI", v: `${round(dpiWidth, 1)} / ${round(dpiHeight, 1)}` },
        ],
        note: "DPI = pixel dimension ÷ print dimension (in inches) for each axis - the lower of the two is the effective, limiting DPI. 300 DPI is the standard target for high-quality photo prints; lower DPI is often acceptable for posters and large prints viewed from farther away.",
      };
    },
    faq: [
      { q: "What DPI do I need for a good quality print?", a: "300 DPI is the standard target for close-up viewing (like photo prints and documents). For larger prints viewed from a distance (posters, banners), 150 DPI or even lower can look sharp, since the viewing distance is greater." },
      { q: "How do I calculate the DPI for a specific print size?", a: "Divide your image's pixel width by the intended print width in inches, and do the same for height - a 3000×2000 pixel image printed at 10×6.67 inches gives exactly 300 DPI on both axes." },
      { q: "What's the biggest I can print my photo at 300 DPI?", a: "Divide your image's pixel dimensions by 300 - a 3000×2000 pixel photo could print at up to 10×6.67 inches while maintaining 300 DPI." },
      { q: "Why does the calculator use the lower of the two DPI values?", a: "If your print aspect ratio doesn't exactly match your image's pixel aspect ratio, one dimension will have a higher effective DPI than the other - the lower value is the true limiting factor for overall image sharpness, since you can't exceed it without either cropping or distorting the image." },
    ],
    related: ["screen-ppi-calculator", "aspect-ratio-calculator", "unit-length-converter"],
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
    id: "logarithm-calculator",
    category: "math",
    title: "Logarithm Calculator",
    keyword: "logarithm calculator",
    description: "Calculate the logarithm of a number in any base, including natural log and log base 10.",
    intro: "Enter a number and a base to calculate its logarithm.",
    fields: [
      { id: "value", label: "Number (x)", type: "number", default: 8, step: 0.01, min: 0.0000001 },
      { id: "base", label: "Base (b)", type: "number", default: 2, step: 0.01, min: 0.0000001 },
    ],
    compute: (v) => {
      if (v.base === 1) {
        return { primary: { label: "Undefined", value: "-" }, secondary: [], note: "Logarithms are undefined for base 1, since 1 raised to any power always equals 1, never x." };
      }
      const result = Math.log(v.value) / Math.log(v.base);
      const naturalLog = Math.log(v.value);
      const log10 = Math.log10(v.value);
      return {
        primary: { label: `log_${v.base}(${v.value})`, value: round(result, 6) },
        secondary: [
          { l: "Natural log (ln)", v: round(naturalLog, 6) },
          { l: "Log base 10", v: round(log10, 6) },
        ],
        note: `logᵦ(x) = ln(x) / ln(b) (the change-of-base formula) - used since most calculators only have built-in natural log and log-10 functions.`,
      };
    },
    faq: [
      { q: "What is log base 2 of 8?", a: "3 - because 2³ = 8. A logarithm answers \"what power do I raise the base to, to get this number?\"" },
      { q: "How do I calculate a logarithm in a base my calculator doesn't have a button for?", a: "Use the change-of-base formula: logᵦ(x) = ln(x) / ln(b), or equivalently log₁₀(x) / log₁₀(b) - divide the natural log (or log base 10) of your number by the natural log (or log base 10) of your desired base." },
      { q: "What's the difference between ln and log?", a: "\"ln\" always means natural log (base e ≈ 2.71828). Plain \"log\" usually means base 10 in everyday math, though in computer science and some fields it can mean base 2 - this calculator shows all three (your chosen base, natural log, and log base 10) to avoid ambiguity." },
      { q: "Why can't I take the log of a negative number or zero?", a: "No real power of a positive base ever produces zero or a negative result, so log(x) is undefined for x ≤ 0 in the real numbers - logarithms of negative numbers require complex numbers, outside what this calculator handles." },
    ],
    related: ["exponent-calculator", "square-root-calculator", "gcd-lcm-calculator"],
  },
  {
    id: "vector-calculator",
    category: "math",
    title: "Vector Calculator",
    keyword: "vector calculator",
    description: "Calculate dot product, cross product, magnitude, and angle between two 3D vectors.",
    intro: "Enter the components of two vectors to calculate their dot product, cross product, magnitudes, and the angle between them.",
    fields: [
      { id: "ax", label: "Vector A: x", type: "number", default: 1, step: 0.1 },
      { id: "ay", label: "Vector A: y", type: "number", default: 2, step: 0.1 },
      { id: "az", label: "Vector A: z (0 for 2D)", type: "number", default: 3, step: 0.1 },
      { id: "bx", label: "Vector B: x", type: "number", default: 4, step: 0.1 },
      { id: "by", label: "Vector B: y", type: "number", default: 5, step: 0.1 },
      { id: "bz", label: "Vector B: z (0 for 2D)", type: "number", default: 6, step: 0.1 },
    ],
    compute: (v) => {
      const a = [v.ax, v.ay, v.az];
      const b = [v.bx, v.by, v.bz];
      const dot = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      const cross = [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
      ];
      const magA = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
      const magB = Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2]);
      const cosAngle = dot / (magA * magB);
      const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
      return {
        primary: { label: "Dot product (A·B)", value: round(dot, 4) },
        secondary: [
          { l: "Cross product (A×B)", v: `(${round(cross[0], 4)}, ${round(cross[1], 4)}, ${round(cross[2], 4)})` },
          { l: "Angle between vectors", v: `${round(angle, 4)}°` },
          { l: "|A|, |B|", v: `${round(magA, 4)}, ${round(magB, 4)}` },
        ],
        note: "Dot product: A·B = Σ(aᵢ×bᵢ). Cross product (3D only): a vector perpendicular to both A and B. Angle: cos⁻¹(A·B / (|A||B|)). For a 2D calculation, set both z components to 0.",
      };
    },
    faq: [
      { q: "What does the dot product tell you?", a: "A single number summarizing how much two vectors point in the same direction, scaled by their lengths - it's positive if the vectors point roughly the same way, negative if roughly opposite, and zero if they're perpendicular." },
      { q: "What does the cross product tell you?", a: "A new vector perpendicular to both input vectors (only defined in 3D), whose magnitude equals the area of the parallelogram formed by the two vectors - commonly used to find a normal vector to a plane or to calculate torque and angular momentum in physics." },
      { q: "How do I find the angle between two vectors?", a: "cos(θ) = (A·B) / (|A|×|B|), then take the inverse cosine (arccos) of that value to get the angle in degrees." },
      { q: "How do I use this for 2D vectors?", a: "Set both z components to 0 - the dot product and angle calculations work identically, and the cross product will only have a z component, which represents the 2D \"cross product\" (a scalar in most 2D contexts)." },
    ],
    related: ["distance-formula-calculator", "pythagorean-theorem-calculator", "triangle-solver"],
  },
  {
    id: "haversine-distance-calculator",
    category: "math",
    title: "Distance and Bearing Calculator (Lat/Long)",
    keyword: "haversine distance calculator",
    description: "Calculate the great-circle distance and compass bearing between two GPS coordinates.",
    intro: "Enter the latitude and longitude of two points to calculate the distance between them and the compass bearing from the first to the second.",
    fields: [
      { id: "lat1", label: "Point 1 latitude", type: "number", default: 40.7128, step: 0.0001, min: -90, max: 90 },
      { id: "lon1", label: "Point 1 longitude", type: "number", default: -74.006, step: 0.0001, min: -180, max: 180 },
      { id: "lat2", label: "Point 2 latitude", type: "number", default: 51.5074, step: 0.0001, min: -90, max: 90 },
      { id: "lon2", label: "Point 2 longitude", type: "number", default: -0.1278, step: 0.0001, min: -180, max: 180 },
    ],
    compute: (v) => {
      const rad = Math.PI / 180;
      const R = 6371;
      const phi1 = v.lat1 * rad, phi2 = v.lat2 * rad;
      const dPhi = (v.lat2 - v.lat1) * rad;
      const dLambda = (v.lon2 - v.lon1) * rad;
      const a = Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceKm = R * c;
      const y = Math.sin(dLambda) * Math.cos(phi2);
      const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
      const bearing = (Math.atan2(y, x) / rad + 360) % 360;
      const compassPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      const compass = compassPoints[Math.round(bearing / 22.5) % 16];
      return {
        primary: { label: "Distance", value: `${round(distanceKm, 2)} km` },
        secondary: [
          { l: "Miles", v: round(distanceKm * 0.621371, 2) },
          { l: "Bearing", v: `${round(bearing, 2)}° (${compass})` },
        ],
        note: "Uses the haversine formula on a spherical Earth model (radius 6,371 km) - accurate to within about 0.5% of the true ellipsoidal distance, which is more than sufficient for most navigation and mapping purposes.",
      };
    },
    faq: [
      { q: "What is the haversine formula?", a: "A formula that calculates great-circle distance between two points on a sphere from their latitude and longitude - it accounts for Earth's curvature, unlike a straight-line (flat-map) distance calculation, which becomes increasingly inaccurate over longer distances." },
      { q: "How far is New York from London?", a: "About 5,570 km (3,461 miles) as the crow flies, using their coordinates (40.71°N, 74.01°W) and (51.51°N, 0.13°W)." },
      { q: "What does 'bearing' mean?", a: "The compass direction (in degrees, 0-360°, where 0°/360° is north) you'd need to initially head in to travel from the first point toward the second along the great-circle route - it changes continuously along a long route, so this is the bearing only at the starting point." },
      { q: "How accurate is this compared to real-world flight distances?", a: "Within about 0.5%, since it treats Earth as a perfect sphere rather than its actual slightly flattened ellipsoid shape - close enough for virtually all practical distance-estimation purposes, though official aviation navigation uses more precise ellipsoidal models." },
    ],
    related: ["unit-length-converter", "time-zone-converter", "distance-formula-calculator"],
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
      const stepRows = [
        ["1. Identify a, b, c", `a=${v.a}, b=${v.b}, c=${v.c}`],
        ["2. Compute discriminant", `b² − 4ac = (${v.b})² − 4(${v.a})(${v.c}) = ${round(discriminant, 4)}`],
      ];
      if (discriminant > 0) {
        const sq = Math.sqrt(discriminant);
        const x1 = (-v.b + sq) / (2 * v.a);
        const x2 = (-v.b - sq) / (2 * v.a);
        stepRows.push(["3. Take square root", `√${round(discriminant, 4)} = ${round(sq, 4)}`]);
        stepRows.push(["4. Apply x = (−b ± √disc) / 2a", `x = (${-v.b} ± ${round(sq, 4)}) / ${2 * v.a}`]);
        stepRows.push(["5. Solve both roots", `x = ${round(x1, 4)} or x = ${round(x2, 4)}`]);
        return {
          primary: { label: "x =", value: `${round(x1, 4)} or ${round(x2, 4)}` },
          secondary: [{ l: "Discriminant", v: round(discriminant, 4) }],
          note: "Two distinct real roots - the discriminant (b² − 4ac) is positive.",
          table: { columns: ["Step", "Work"], rows: stepRows },
        };
      } else if (discriminant === 0) {
        const x = -v.b / (2 * v.a);
        stepRows.push(["3. Discriminant is 0", "One repeated root: x = −b / 2a"]);
        stepRows.push(["4. Solve", `x = ${-v.b} / ${2 * v.a} = ${round(x, 4)}`]);
        return {
          primary: { label: "x =", value: round(x, 4) },
          secondary: [{ l: "Discriminant", v: 0 }],
          note: "One repeated real root - the discriminant (b² − 4ac) is zero.",
          table: { columns: ["Step", "Work"], rows: stepRows },
        };
      } else {
        const realPart = -v.b / (2 * v.a);
        const imagPart = Math.sqrt(-discriminant) / (2 * v.a);
        stepRows.push(["3. Discriminant is negative", "Roots are complex: x = −b/2a ± (√|disc|/2a)i"]);
        stepRows.push(["4. Solve real and imaginary parts", `Real: ${round(realPart, 4)}, Imaginary: ±${round(imagPart, 4)}i`]);
        return {
          primary: { label: "x =", value: `${round(realPart, 4)} ± ${round(imagPart, 4)}i` },
          secondary: [{ l: "Discriminant", v: round(discriminant, 4) }],
          note: "Two complex roots - the discriminant (b² − 4ac) is negative, so there are no real solutions.",
          table: { columns: ["Step", "Work"], rows: stepRows },
        };
      }
    },
    faq: [
      { q: "How do I solve x² − 3x + 2 = 0?", a: "Using the quadratic formula with a=1, b=−3, c=2: the discriminant is 9 − 8 = 1, giving two real roots x = 2 and x = 1." },
      { q: "What does a negative discriminant mean?", a: "A negative discriminant means the equation has no real solutions - the roots are complex numbers, since you'd need the square root of a negative number." },
      { q: "What if a quadratic equation has no real solutions?", a: "That happens when the discriminant (b² − 4ac) is negative - the equation still has two solutions, but they're complex numbers involving the imaginary unit i, since you can't take the square root of a negative number within the real numbers." },
      { q: "What's the difference between the quadratic formula and factoring?", a: "Factoring only works cleanly when a quadratic has simple, often whole-number roots; the quadratic formula always works, for any quadratic equation, whether the roots are whole numbers, fractions, decimals, or complex numbers. This calculator uses the formula directly, so it handles every case without needing to guess factors first." },
      { q: "Is a 'quadratic equation formula calculator,' 'solve quadratic formula calculator,' and 'calculator for solving quadratic equations' the same as this tool?", a: "Yes - every one of these names describes solving ax² + bx + c = 0 for x, which is exactly what this calculator does. Enter your a, b, and c coefficients above and it applies the quadratic formula automatically, real or complex roots included." },
      { q: "Does this show the steps, like a 'math solver with steps'?", a: "Yes - scroll the table below the result for the full step-by-step work: identifying a, b, c, computing the discriminant, taking the square root, and solving for x." },
    ],
    related: ["exponent-calculator", "square-root-calculator", "fraction-calculator"],
  },
  {
    id: "cone-volume-calculator",
    category: "math",
    title: "Cone Volume Calculator",
    keyword: "cone volume calculator",
    description: "Also works as a formula for the volume of a cone lookup - calculate the volume, surface area, and slant height of a cone from its radius and height.",
    intro: "Enter a cone's radius and height to calculate its volume, using V = (1/3)πr²h.",
    fields: [
      { id: "radius", label: "Radius", type: "number", default: 3, step: 0.1 },
      { id: "height", label: "Height", type: "number", default: 8, step: 0.1 },
    ],
    compute: (v) => {
      const volume = (1 / 3) * Math.PI * v.radius * v.radius * v.height;
      const slantHeight = Math.sqrt(v.radius * v.radius + v.height * v.height);
      const surfaceArea = Math.PI * v.radius * (v.radius + slantHeight);
      return {
        primary: { label: "Volume", value: round(volume, 4) },
        secondary: [
          { l: "Slant height", v: round(slantHeight, 4) },
          { l: "Surface area", v: round(surfaceArea, 4) },
        ],
        note: "Volume uses V = (1/3)πr²h. Surface area includes both the base circle and the curved (lateral) surface.",
      };
    },
    faq: [
      { q: "What's the formula for the volume of a cone?", a: "V = (1/3)πr²h, where r is the radius of the circular base and h is the height from the base to the apex. It's exactly one-third the volume of a cylinder with the same base and height." },
      { q: "Is 'volume of a cone formula,' 'formula volume of a cone,' and 'formula of a cone volume' the same question?", a: "Yes - these are all reordered phrasings of the same search: the formula for a cone's volume, V = (1/3)πr²h. This calculator plugs your radius and height into that formula directly, so you don't need to do the arithmetic by hand." },
      { q: "What about 'formula for cone volume,' 'cone volume formula,' 'volume formula of a cone,' and 'volume for a cone formula'?", a: "All the same question, just reordered - every one of these is asking for the cone volume formula, V = (1/3)πr²h. Enter your radius and height above and this calculator applies it for you." },
      { q: "Does 'cones volume formula,' 'formulas for volume of a cone,' 'formula volume of cone,' and 'formula for volume of cone' mean anything different?", a: "No - plural, singular, and reordered versions of the same phrase all point to the same thing: the cone volume formula, V = (1/3)πr²h. This calculator computes it directly from your radius and height, whichever way you searched for it." },
      { q: "What about 'formula for volume of a cone,' 'volume for cone formula,' 'formula cone volume,' 'formula of cone volume,' and 'formula volume for cone'?", a: "Same answer every time: the cone volume formula is V = (1/3)πr²h. However this phrase gets reordered or abbreviated, it's asking for that one formula, which this calculator applies to your radius and height automatically." },
      { q: "Is 'volume of the cone,' 'volume for a cone,' 'volume of conical,' and 'cones volume' the same search?", a: "Yes - \"conical\" is just the adjective form of \"cone,\" and the rest are simple word-order or plural variations. All of them mean the same volume formula, V = (1/3)πr²h, which this calculator computes from your radius and height." },
      { q: "What about 'volume of a conical shape,' 'volume cone,' and 'cone of volume'?", a: "Still the same thing - a \"conical shape\" is just a cone, and the terse two-word versions are the same search with the words dropped or reordered. All of them mean V = (1/3)πr²h." },
      { q: "Why is a cone's volume exactly 1/3 of a cylinder's?", a: "This is a geometric fact provable with calculus (integrating circular cross-sections that shrink linearly to a point) - for any cone and cylinder sharing the same base radius and height, the cone always encloses exactly one-third the volume, regardless of the specific radius or height." },
      { q: "What's the difference between height and slant height?", a: "Height is the straight vertical distance from the base to the apex; slant height is the distance along the cone's curved surface from the base edge to the apex. Slant height is always longer than height (except in the degenerate case of zero radius), and is calculated as √(r² + h²)." },
    ],
    related: ["cylinder-volume-calculator", "square-root-calculator", "exponent-calculator"],
  },
  {
    id: "cylinder-volume-calculator",
    category: "math",
    title: "Cylinder Volume Calculator",
    keyword: "cylinder volume calculator",
    description: "Also works as a formula for the volume of a cylinder lookup - calculate the volume and surface area of a cylinder from its radius and height.",
    intro: "Enter a cylinder's radius and height to calculate its volume, using V = πr²h.",
    fields: [
      { id: "radius", label: "Radius", type: "number", default: 4, step: 0.1 },
      { id: "height", label: "Height", type: "number", default: 10, step: 0.1 },
    ],
    compute: (v) => {
      const volume = Math.PI * v.radius * v.radius * v.height;
      const surfaceArea = 2 * Math.PI * v.radius * (v.radius + v.height);
      const lateralArea = 2 * Math.PI * v.radius * v.height;
      return {
        primary: { label: "Volume", value: round(volume, 4) },
        secondary: [
          { l: "Surface area", v: round(surfaceArea, 4) },
          { l: "Lateral (side) area", v: round(lateralArea, 4) },
        ],
        note: "Volume uses V = πr²h. Total surface area includes the two circular ends plus the curved side.",
      };
    },
    faq: [
      { q: "What's the formula for the volume of a cylinder?", a: "V = πr²h, where r is the radius of the circular base and h is the height. This comes from multiplying the area of the circular base (πr²) by the height, the same logic used for any prism." },
      { q: "Is 'volume for a cylinder,' 'formula of volume of a cylinder,' and 'volume of the cylinder formula' the same question?", a: "Yes - these are all reordered phrasings of the same search: the formula for a cylinder's volume, V = πr²h. This calculator plugs your radius and height into that formula directly, so you don't need to do the arithmetic by hand." },
      { q: "What about 'formula cylinder volume,' 'formula for volume of cylinders,' 'volume equation for cylinder,' and 'volume of a drum'?", a: "All the same shape and formula (V = πr²h), just phrased differently. A \"drum\" - like a 55-gallon drum - is simply a cylinder, so a drum volume formula is a cylinder volume formula; this calculator works for any cylindrical container, whether you call it a cylinder, tube, or drum." },
      { q: "Does 'cylinder equation volume,' 'volume cylinder formula,' 'formula of the volume of a cylinder,' and 'volume formula cylinder' mean anything different?", a: "No - every reordering of \"cylinder,\" \"volume,\" \"formula,\" and \"equation\" here points to the same thing: V = πr²h. This calculator computes it directly from your radius and height, whichever way you searched for it." },
      { q: "What about 'cylinder volume equation,' 'formula for a cylinder volume,' 'formulas for volume of a cylinder,' and 'formula volume for cylinder'?", a: "Same answer every time: the cylinder volume formula is V = πr²h. However this phrase gets reordered, pluralized, or abbreviated, it's asking for that one formula, which this calculator applies to your radius and height automatically." },
      { q: "Is 'volume of cylinder' (without 'a' or 'the') the same search?", a: "Yes - dropping small words like \"a\" or \"the\" doesn't change the meaning. \"Volume of cylinder\" is asking for the same formula, V = πr²h, as every other phrasing on this page." },
      { q: "How do I find the volume of a cylinder if I only know the diameter?", a: "Divide the diameter by 2 to get the radius first, then use V = πr²h. For example, a cylinder with a 10 cm diameter and 20 cm height has a radius of 5 cm, giving a volume of π × 5² × 20 ≈ 1,570.8 cm³." },
      { q: "What's the difference between total surface area and lateral surface area?", a: "Lateral (side) surface area only counts the curved wall of the cylinder (2πrh); total surface area adds the two flat circular ends (2πr²) on top of that. Use lateral area alone for things like labeling a can's wraparound label, and total area for anything covering the whole object." },
    ],
    related: ["cone-volume-calculator", "square-root-calculator", "area-converter"],
  },
  {
    id: "pythagorean-theorem-calculator",
    category: "math",
    title: "Pythagorean Theorem Calculator",
    keyword: "pythagorean theorem calculator",
    description: "Calculate the hypotenuse (or a missing leg) of a right triangle using the Pythagorean theorem.",
    intro: "Enter the two legs of a right triangle to calculate the hypotenuse, using a² + b² = c².",
    fields: [
      { id: "a", label: "Leg a", type: "number", default: 3, step: 0.1 },
      { id: "b", label: "Leg b", type: "number", default: 4, step: 0.1 },
    ],
    compute: (v) => {
      const c = Math.sqrt(v.a * v.a + v.b * v.b);
      return {
        primary: { label: "Hypotenuse (c)", value: round(c, 4) },
        secondary: [
          { l: "a²", v: round(v.a * v.a, 4) },
          { l: "b²", v: round(v.b * v.b, 4) },
          { l: "a² + b²", v: round(v.a * v.a + v.b * v.b, 4) },
        ],
        note: "Uses a² + b² = c², valid only for right triangles (one 90° angle). To find a missing leg instead of the hypotenuse, rearrange to a = √(c² − b²).",
      };
    },
    faq: [
      { q: "What is the Pythagorean theorem?", a: "a² + b² = c², where a and b are the two shorter sides (legs) of a right triangle and c is the hypotenuse (the longest side, opposite the right angle). It only applies to right triangles." },
      { q: "How do I find a missing leg instead of the hypotenuse?", a: "Rearrange the formula: a = √(c² − b²), or b = √(c² − a²). Subtract the known leg's square from the hypotenuse's square, then take the square root." },
      { q: "What's a common example of the Pythagorean theorem, like 3-4-5?", a: "3-4-5 is the most common \"Pythagorean triple\" - a set of whole numbers that satisfy a² + b² = c² exactly: 3² + 4² = 9 + 16 = 25 = 5². Other common triples include 5-12-13 and 8-15-17, useful for quickly checking if a corner is truly square without a calculator." },
      { q: "Is a 'pythagoras theorem calculator' or 'pythagorean theorem calc' different from this tool?", a: "No - \"Pythagoras\" and \"Pythagorean\" both refer to the same theorem and mathematician, and \"calc\" is just short for calculator. All of these searches want the same thing: a² + b² = c², which this calculator solves for you." },
    ],
    related: ["square-root-calculator", "cylinder-volume-calculator", "quadratic-formula-calculator"],
  },
  {
    id: "distance-formula-calculator",
    category: "math",
    title: "Distance Formula Calculator",
    keyword: "distance formula calculator",
    description: "Calculate the distance between two points on a coordinate plane.",
    intro: "Enter the coordinates of two points to calculate the straight-line distance and midpoint between them.",
    fields: [
      { id: "x1", label: "x1", type: "number", default: 1, step: 0.1 },
      { id: "y1", label: "y1", type: "number", default: 2, step: 0.1 },
      { id: "x2", label: "x2", type: "number", default: 4, step: 0.1 },
      { id: "y2", label: "y2", type: "number", default: 6, step: 0.1 },
    ],
    compute: (v) => {
      const dx = v.x2 - v.x1;
      const dy = v.y2 - v.y1;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const midX = (v.x1 + v.x2) / 2;
      const midY = (v.y1 + v.y2) / 2;
      return {
        primary: { label: "Distance", value: round(distance, 4) },
        secondary: [
          { l: "Midpoint", v: `(${round(midX, 4)}, ${round(midY, 4)})` },
          { l: "Δx, Δy", v: `${round(dx, 4)}, ${round(dy, 4)}` },
        ],
        note: "Uses the distance formula d = √((x₂-x₁)² + (y₂-y₁)²), which is the Pythagorean theorem applied to coordinate points.",
      };
    },
    faq: [
      { q: "What is the distance formula?", a: "d = √((x₂-x₁)² + (y₂-y₁)²) - it finds the straight-line distance between two points (x₁,y₁) and (x₂,y₂) on a coordinate plane." },
      { q: "How is the distance formula related to the Pythagorean theorem?", a: "It's the same theorem applied to coordinates - the horizontal difference (Δx) and vertical difference (Δy) between the two points form the two legs of a right triangle, and the distance between the points is the hypotenuse." },
      { q: "What is the distance between (1,2) and (4,6)?", a: "5 - Δx = 4-1 = 3, Δy = 6-2 = 4, so d = √(3² + 4²) = √(9+16) = √25 = 5." },
      { q: "How do I find the midpoint between two points?", a: "Average the x-coordinates and average the y-coordinates separately: midpoint = ((x₁+x₂)/2, (y₁+y₂)/2). For (1,2) and (4,6), the midpoint is (2.5, 4)." },
    ],
    related: ["pythagorean-theorem-calculator", "quadratic-formula-calculator", "slope-calculator"],
  },
  {
    id: "triangle-solver",
    category: "math",
    title: "Triangle Solver (SSS)",
    keyword: "triangle solver",
    description: "Calculate all three angles and the area of a triangle from its three side lengths.",
    intro: "Enter the three side lengths of a triangle to calculate all three angles and the area, using the law of cosines and Heron's formula.",
    fields: [
      { id: "a", label: "Side a", type: "number", default: 3, step: 0.1, min: 0.01 },
      { id: "b", label: "Side b", type: "number", default: 4, step: 0.1, min: 0.01 },
      { id: "c", label: "Side c", type: "number", default: 5, step: 0.1, min: 0.01 },
    ],
    compute: (v) => {
      const { a, b, c } = v;
      if (a + b <= c || a + c <= b || b + c <= a) {
        return { primary: { label: "Invalid triangle", value: "Sides don't form a valid triangle" }, secondary: [], note: "The sum of any two sides must be greater than the third side (the triangle inequality)." };
      }
      const angleFrom = (opp, s1, s2) => Math.acos((s1 * s1 + s2 * s2 - opp * opp) / (2 * s1 * s2)) * (180 / Math.PI);
      const angleA = angleFrom(a, b, c);
      const angleB = angleFrom(b, a, c);
      const angleC = 180 - angleA - angleB;
      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      let type = "scalene";
      if (a === b && b === c) type = "equilateral";
      else if (a === b || b === c || a === c) type = "isosceles";
      if (Math.abs(angleA - 90) < 0.01 || Math.abs(angleB - 90) < 0.01 || Math.abs(angleC - 90) < 0.01) type += ", right";
      return {
        primary: { label: "Angle A (opposite side a)", value: `${round(angleA, 3)}°` },
        secondary: [
          { l: "Angle B (opposite side b)", v: `${round(angleB, 3)}°` },
          { l: "Angle C (opposite side c)", v: `${round(angleC, 3)}°` },
          { l: "Area", v: round(area, 4) },
          { l: "Triangle type", v: type },
        ],
        note: "Uses the law of cosines to find angles from three known sides (SSS), and Heron's formula for area. All three angles always sum to 180°.",
      };
    },
    faq: [
      { q: "What are the angles of a 3-4-5 triangle?", a: "90°, 53.13°, and 36.87° - a 3-4-5 triangle is a right triangle, since 3² + 4² = 5² satisfies the Pythagorean theorem, and the angle opposite the longest side (5) is exactly 90°." },
      { q: "What's the area of a 3-4-5 triangle?", a: "6 - using Heron's formula: s = (3+4+5)/2 = 6, area = √(6×(6-3)×(6-4)×(6-5)) = √(6×3×2×1) = √36 = 6." },
      { q: "What is the law of cosines?", a: "c² = a² + b² − 2ab·cos(C), a generalization of the Pythagorean theorem that works for any triangle, not just right triangles. Rearranged to solve for an angle: cos(C) = (a² + b² − c²) / (2ab)." },
      { q: "Why does this need three sides, and not angles or other combinations?", a: "This tool solves the SSS (side-side-side) case specifically. Other cases like SAS (two sides and the included angle) or ASA (two angles and the included side) need different starting formulas - the law of cosines shown here works directly from three known sides." },
    ],
    related: ["pythagorean-theorem-calculator", "slope-calculator", "distance-formula-calculator"],
  },
  {
    id: "hypergeometric-calculator",
    category: "math",
    title: "Hypergeometric Distribution Calculator",
    keyword: "hypergeometric calculator",
    description: "Calculate the probability of drawing exactly k successes from a population without replacement.",
    intro: "Enter the population size, number of successes in the population, sample size, and number of successes you want to find the exact and cumulative probability.",
    fields: [
      { id: "N", label: "Population size (N)", type: "number", default: 52, step: 1, min: 1 },
      { id: "K", label: "Successes in population (K)", type: "number", default: 13, step: 1, min: 0 },
      { id: "n", label: "Sample size (n)", type: "number", default: 5, step: 1, min: 0 },
      { id: "k", label: "Successes wanted (k)", type: "number", default: 2, step: 1, min: 0 },
    ],
    compute: (v) => {
      const N = Math.round(v.N), K = Math.round(v.K), n = Math.round(v.n), k = Math.round(v.k);
      if (k > n || k > K || n > N || n - k > N - K) {
        return { primary: { label: "Impossible combination", value: "0" }, secondary: [], note: "Check that k ≤ n, k ≤ K, n ≤ N, and n−k ≤ N−K." };
      }
      const logFactorial = (x) => {
        let sum = 0;
        for (let i = 2; i <= x; i++) sum += Math.log(i);
        return sum;
      };
      const logC = (n2, r) => (r < 0 || r > n2) ? -Infinity : logFactorial(n2) - logFactorial(r) - logFactorial(n2 - r);
      const pmf = (kk) => Math.exp(logC(K, kk) + logC(N - K, n - kk) - logC(N, n));
      const exactProb = pmf(k);
      let cdf = 0;
      const lowerBound = Math.max(0, n - (N - K));
      for (let i = lowerBound; i <= k; i++) cdf += pmf(i);
      return {
        primary: { label: `P(X = ${k})`, value: `${round(exactProb * 100, 4)}%` },
        secondary: [{ l: `P(X ≤ ${k})`, v: `${round(cdf * 100, 4)}%` }],
        note: "P(X=k) = C(K,k) × C(N−K,n−k) / C(N,n) - the probability of exactly k successes when drawing n items without replacement from a population of N with K total successes.",
      };
    },
    faq: [
      { q: "What is the hypergeometric distribution used for?", a: "Calculating probabilities when sampling without replacement from a finite population - like drawing cards from a deck, or defective items from a batch, where each draw changes the odds for the next one (unlike the binomial distribution, which assumes replacement)." },
      { q: "What's the probability of drawing exactly 2 hearts in a 5-card hand?", a: "About 27.4% - with N=52 (deck), K=13 (hearts), n=5 (hand size), k=2: P(X=2) = C(13,2) × C(39,3) / C(52,5) ≈ 0.2743." },
      { q: "How is this different from the binomial distribution?", a: "Binomial assumes each trial is independent with a fixed probability (sampling with replacement, or an infinite population). Hypergeometric accounts for the population shrinking as you sample (without replacement), which changes the odds on each draw - this matters most when the sample size is a meaningful fraction of the population." },
      { q: "What does the cumulative probability (P(X ≤ k)) tell me?", a: "The probability of getting k or fewer successes, not exactly k - useful for questions like \"what's the probability of drawing at most 2 hearts,\" which sums the individual probabilities for 0, 1, and 2 hearts." },
    ],
    related: ["permutations-combinations-calculator", "poker-hand-probability-calculator", "lottery-odds-calculator"],
  },
  {
    id: "trapezoid-area-calculator",
    category: "math",
    title: "Trapezoid Area Calculator",
    keyword: "trapezoid area calculator",
    description: "Calculate the area and perimeter of a trapezoid.",
    intro: "Enter the two parallel sides, height, and the two slanted sides to calculate a trapezoid's area and perimeter.",
    fields: [
      { id: "a", label: "Parallel side a", type: "number", default: 6, step: 0.1 },
      { id: "b", label: "Parallel side b", type: "number", default: 10, step: 0.1 },
      { id: "height", label: "Height", type: "number", default: 4, step: 0.1 },
      { id: "sideC", label: "Slanted side c (optional)", type: "number", default: 0, step: 0.1 },
      { id: "sideD", label: "Slanted side d (optional)", type: "number", default: 0, step: 0.1 },
    ],
    compute: (v) => {
      const area = ((v.a + v.b) / 2) * v.height;
      const hasSides = v.sideC > 0 && v.sideD > 0;
      const perimeter = hasSides ? v.a + v.b + v.sideC + v.sideD : null;
      return {
        primary: { label: "Area", value: round(area, 4) },
        secondary: [
          { l: "Perimeter", v: hasSides ? round(perimeter, 4) : "Enter both slanted sides to calculate" },
        ],
        note: "Area = ((a + b) / 2) × height, where a and b are the two parallel sides. Perimeter needs all four side lengths, not just the parallel sides and height.",
      };
    },
    faq: [
      { q: "What is the formula for the area of a trapezoid?", a: "Area = ((a + b) / 2) × h, where a and b are the lengths of the two parallel sides and h is the perpendicular height between them." },
      { q: "What is the area of a trapezoid with parallel sides 6 and 10 and height 4?", a: "32 - ((6 + 10) / 2) × 4 = 8 × 4 = 32." },
      { q: "Why do I need all four sides to find the perimeter, but only the parallel sides and height for the area?", a: "Area only depends on the two parallel sides and the distance between them, but perimeter is simply the sum of all four side lengths - including the two non-parallel (slanted) sides, which don't factor into the area formula at all." },
      { q: "Is a parallelogram a special case of a trapezoid?", a: "Yes, under the inclusive definition most math courses use - a parallelogram is a trapezoid where both pairs of opposite sides are parallel. Some definitions exclude parallelograms, but the area formula works either way since it only requires knowing one pair of parallel sides." },
    ],
    related: ["pythagorean-theorem-calculator", "rectangular-prism-volume-calculator", "distance-formula-calculator"],
  },
  {
    id: "rectangular-prism-volume-calculator",
    category: "math",
    title: "Rectangular Prism Volume Calculator",
    keyword: "rectangular prism volume calculator",
    description: "Calculate the volume and surface area of a rectangular prism (box) from its length, width, and height.",
    intro: "Enter a box's length, width, and height to calculate its volume, using V = l × w × h.",
    fields: [
      { id: "length", label: "Length", type: "number", default: 5, step: 0.1 },
      { id: "width", label: "Width", type: "number", default: 4, step: 0.1 },
      { id: "height", label: "Height", type: "number", default: 3, step: 0.1 },
    ],
    compute: (v) => {
      const volume = v.length * v.width * v.height;
      const surfaceArea = 2 * (v.length * v.width + v.length * v.height + v.width * v.height);
      const diagonal = Math.sqrt(v.length * v.length + v.width * v.width + v.height * v.height);
      return {
        primary: { label: "Volume", value: round(volume, 4) },
        secondary: [
          { l: "Surface area", v: round(surfaceArea, 4) },
          { l: "Diagonal length", v: round(diagonal, 4) },
        ],
        note: "Volume uses V = l × w × h. Surface area sums all six rectangular faces; a cube is just a rectangular prism where l = w = h.",
      };
    },
    faq: [
      { q: "What's the formula for the volume of a rectangular prism?", a: "V = l × w × h - multiply the length, width, and height together. A box that's 5 × 4 × 3 units has a volume of 60 cubic units." },
      { q: "Is a rectangular prism the same as a cuboid or a box?", a: "Yes - \"rectangular prism,\" \"cuboid,\" and \"box\" (or \"rectangular box\") all describe the same 3D shape: six rectangular faces meeting at right angles. This calculator works for any of them, whichever term you use." },
      { q: "How is a rectangular prism different from a cube?", a: "A cube is a special case of a rectangular prism where all three dimensions are equal (l = w = h). Every cube is a rectangular prism, but most rectangular prisms aren't cubes, since their length, width, and height differ." },
    ],
    related: ["area-converter", "volume-converter", "cylinder-volume-calculator"],
  },
  {
    id: "slope-calculator",
    category: "math",
    title: "Slope Calculator",
    keyword: "slope calculator",
    description: "Calculate the slope between two points, plus the line's equation and angle.",
    intro: "Enter the coordinates of two points to calculate the slope of the line between them, using m = (y2 − y1) / (x2 − x1).",
    fields: [
      { id: "x1", label: "x1", type: "number", default: 1, step: 0.1 },
      { id: "y1", label: "y1", type: "number", default: 2, step: 0.1 },
      { id: "x2", label: "x2", type: "number", default: 4, step: 0.1 },
      { id: "y2", label: "y2", type: "number", default: 8, step: 0.1 },
    ],
    compute: (v) => {
      const dx = v.x2 - v.x1;
      const dy = v.y2 - v.y1;
      if (dx === 0) {
        return {
          primary: { label: "Slope", value: "Undefined" },
          secondary: [{ l: "Line type", v: "Vertical (x = " + v.x1 + ")" }],
          note: "The slope is undefined when both points share the same x-coordinate - the line is vertical, and vertical lines have no defined slope (a zero denominator).",
        };
      }
      const slope = dy / dx;
      const yIntercept = v.y1 - slope * v.x1;
      const angleDeg = (Math.atan(slope) * 180) / Math.PI;
      return {
        primary: { label: "Slope (m)", value: round(slope, 4) },
        secondary: [
          { l: "Y-intercept (b)", v: round(yIntercept, 4) },
          { l: "Angle from horizontal", v: `${round(angleDeg, 2)}°` },
        ],
        note: `Line equation: y = ${round(slope, 4)}x + ${round(yIntercept, 4)}`,
      };
    },
    faq: [
      { q: "What's the formula for slope?", a: "m = (y2 − y1) / (x2 − x1) - the change in y divided by the change in x between two points. A slope of 2 means y increases by 2 for every 1 unit increase in x." },
      { q: "What does a negative slope mean?", a: "A negative slope means the line goes downward from left to right - as x increases, y decreases. A positive slope goes upward left to right, a zero slope is a flat horizontal line, and an undefined slope is a vertical line." },
      { q: "How do I calculate slope from a graph without exact coordinates?", a: "Pick any two points the line clearly passes through on the grid, read off their (x, y) coordinates, then apply the slope formula. Choosing points that land on clean grid intersections makes the rise-over-run count easier and less error-prone than estimating decimal coordinates." },
      { q: "How do you find slope?", a: "Pick any two points on the line, subtract their y-coordinates and their x-coordinates, then divide: slope = (y2 − y1) / (x2 − x1). Enter your two points above and this calculator does that division for you, along with the line's full equation." },
    ],
    related: ["quadratic-formula-calculator", "ratio-calculator", "percentage-change-calculator"],
  },
  {
    id: "sector-calculator",
    category: "math",
    title: "Circle Sector Calculator",
    keyword: "sector calculator",
    description: "Calculate the arc length and area of a circle sector (pie-slice) from radius and angle.",
    intro: "Enter a circle's radius and the sector's angle to calculate its arc length and area.",
    fields: [
      { id: "radius", label: "Radius", type: "number", default: 10, step: 0.1, min: 0 },
      { id: "angle", label: "Angle", type: "number", unit: "degrees", default: 90, step: 0.1, min: 0, max: 360 },
    ],
    compute: (v) => {
      const angleRad = v.angle * (Math.PI / 180);
      const arcLength = v.radius * angleRad;
      const area = 0.5 * v.radius * v.radius * angleRad;
      const fullCircleArea = Math.PI * v.radius * v.radius;
      const percentOfCircle = (v.angle / 360) * 100;
      return {
        primary: { label: "Arc length", value: round(arcLength, 4) },
        secondary: [
          { l: "Sector area", v: round(area, 4) },
          { l: "Percent of full circle", v: `${round(percentOfCircle, 2)}%` },
        ],
        note: "Arc length = radius × angle (in radians). Sector area = 0.5 × radius² × angle (in radians). This tool converts your angle from degrees automatically.",
      };
    },
    faq: [
      { q: "What is the arc length of a 90° sector with radius 10?", a: "About 15.71 - convert 90° to radians (π/2 ≈ 1.5708), then arc length = 10 × 1.5708 ≈ 15.71." },
      { q: "What is the area of a 90° sector with radius 10?", a: "About 78.54 - area = 0.5 × 10² × 1.5708 (90° in radians) ≈ 78.54, which is exactly 1/4 of the full circle's area (π × 10² ≈ 314.16), matching the 90°/360° = 25% fraction." },
      { q: "Why does the formula need the angle in radians, not degrees?", a: "Radians directly relate arc length to radius (an angle of 1 radian subtends an arc equal to the radius), which is what makes the simple formulas arc length = r×θ and area = 0.5×r²×θ work - degrees don't have that direct relationship, so this calculator converts for you automatically." },
      { q: "How is a sector different from a segment?", a: "A sector is the full \"pie slice\" bounded by two radii and the arc between them. A segment is just the region between a chord (straight line connecting the two arc endpoints) and the arc itself - a segment is always smaller than its corresponding sector." },
    ],
    related: ["pythagorean-theorem-calculator", "trapezoid-area-calculator", "cylinder-volume-calculator"],
  },
  {
    id: "grade-gradient-calculator",
    category: "math",
    title: "Grade / Gradient Calculator",
    keyword: "average gradient calculator",
    description: "Calculate slope grade as a percentage, angle, and ratio from rise and run - for roads, ramps, and roofs.",
    intro: "Enter the rise (vertical change) and run (horizontal distance) to calculate the grade as a percentage, angle, and ratio.",
    fields: [
      { id: "rise", label: "Rise (vertical change)", type: "number", default: 6, step: 0.1 },
      { id: "run", label: "Run (horizontal distance)", type: "number", default: 100, step: 0.1 },
    ],
    compute: (v) => {
      if (v.run === 0) {
        return { primary: { label: "Grade", value: "Undefined" }, secondary: [], note: "Run (horizontal distance) can't be zero." };
      }
      const gradePercent = (v.rise / v.run) * 100;
      const angleDeg = (Math.atan(v.rise / v.run) * 180) / Math.PI;
      const ratioRun = v.rise === 0 ? 0 : Math.abs(v.run / v.rise);
      return {
        primary: { label: "Grade", value: `${round(gradePercent, 2)}%` },
        secondary: [
          { l: "Angle", v: `${round(angleDeg, 2)}°` },
          { l: "Ratio", v: v.rise === 0 ? "Flat (0)" : `1:${round(ratioRun, 2)}` },
        ],
        note: "This is average gradient over the whole run - a real road, ramp, or roof may vary in steepness along its length even if the average matches this figure.",
      };
    },
    faq: [
      { q: "How do I calculate grade as a percentage?", a: "Divide the rise (vertical change) by the run (horizontal distance), then multiply by 100. A road that climbs 6 feet over a 100-foot horizontal distance has a 6% grade (6 ÷ 100 × 100 = 6%)." },
      { q: "What's the difference between grade (percentage) and angle (degrees)?", a: "Grade and angle both describe steepness, but grade is rise ÷ run as a percentage, while angle is the arctangent of that same ratio in degrees - a 100% grade is a 45° angle (not 90°, a common misconception), since 100% grade means rise equals run." },
      { q: "What's a typical maximum grade for roads or wheelchair ramps?", a: "US highways are typically limited to about 6-8% grade, residential driveways often go up to 15-20%, and ADA-compliant wheelchair ramps are limited to about 8.3% (1:12) - though exact limits depend on the specific code or standard that applies to your situation." },
    ],
    related: ["slope-calculator", "ratio-calculator", "unit-length-converter"],
  },
  {
    id: "molecular-weight-calculator",
    category: "math",
    title: "Molecular Weight Calculator",
    keyword: "molecular weight calculator",
    description: "Calculate the molecular weight (molar mass) of a chemical formula, like H2O or C6H12O6.",
    intro: "Enter a chemical formula (e.g. H2O, NaCl, C6H12O6, Ca(OH)2) to calculate its molecular weight in grams per mole.",
    fields: [
      { id: "formula", label: "Chemical formula", type: "text", default: "H2O" },
    ],
    compute: (v) => {
      const ATOMIC_WEIGHTS = {
        H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.18,
        Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
        Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
        Ga: 69.723, Ge: 72.63, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
        Nb: 92.906, Mo: 95.95, Tc: 98, Ru: 101.07, Rh: 102.91, Pd: 106.42, Ag: 107.87, Cd: 112.41, In: 114.82, Sn: 118.71,
        Sb: 121.76, Te: 127.6, I: 126.9, Xe: 131.29, Cs: 132.91, Ba: 137.33, La: 138.91, Ce: 140.12, Pr: 140.91, Nd: 144.24,
        Pm: 145, Sm: 150.36, Eu: 151.96, Gd: 157.25, Tb: 158.93, Dy: 162.5, Ho: 164.93, Er: 167.26, Tm: 168.93, Yb: 173.05,
        Lu: 174.97, Hf: 178.49, Ta: 180.95, W: 183.84, Re: 186.21, Os: 190.23, Ir: 192.22, Pt: 195.08, Au: 196.97, Hg: 200.59,
        Tl: 204.38, Pb: 207.2, Bi: 208.98, Po: 209, At: 210, Rn: 222, Fr: 223, Ra: 226, Ac: 227, Th: 232.04,
        Pa: 231.04, U: 238.03, Np: 237, Pu: 244, Am: 243, Cm: 247, Bk: 247, Cf: 251, Es: 252, Fm: 257,
        Md: 258, No: 259, Lr: 262, Rf: 267, Db: 268, Sg: 271, Bh: 272, Hs: 270, Mt: 276, Ds: 281,
        Rg: 280, Cn: 285, Nh: 284, Fl: 289, Mc: 288, Lv: 293, Ts: 294, Og: 294,
      };
      const formula = (v.formula || "").trim();
      if (!formula) {
        return { primary: { label: "Molecular weight", value: "—" }, secondary: [], note: "Enter a chemical formula, like H2O or NaCl." };
      }
      let i = 0;
      let error = null;
      const parseNumber = () => {
        const start = i;
        while (i < formula.length && /[0-9]/.test(formula[i])) i++;
        return start === i ? 1 : parseInt(formula.slice(start, i), 10);
      };
      const parseGroup = () => {
        const counts = {};
        while (i < formula.length && formula[i] !== ")" && !error) {
          if (formula[i] === "(") {
            i++;
            const inner = parseGroup();
            if (formula[i] !== ")") { error = "Mismatched parentheses"; return counts; }
            i++;
            const mult = parseNumber();
            for (const el in inner) counts[el] = (counts[el] || 0) + inner[el] * mult;
          } else if (/[A-Z]/.test(formula[i])) {
            const start = i;
            i++;
            while (i < formula.length && /[a-z]/.test(formula[i])) i++;
            const el = formula.slice(start, i);
            if (!(el in ATOMIC_WEIGHTS)) { error = `Unknown element: ${el}`; return counts; }
            const count = parseNumber();
            counts[el] = (counts[el] || 0) + count;
          } else {
            error = `Unexpected character: ${formula[i]}`;
            return counts;
          }
        }
        return counts;
      };
      const counts = parseGroup();
      if (!error && i !== formula.length) error = "Unexpected character at end of formula";
      if (error) {
        return { primary: { label: "Molecular weight", value: "Invalid formula" }, secondary: [], note: error + " - try a format like H2O, NaCl, or Ca(OH)2." };
      }
      let totalWeight = 0;
      const breakdown = [];
      for (const el in counts) {
        const contribution = ATOMIC_WEIGHTS[el] * counts[el];
        totalWeight += contribution;
        breakdown.push({ l: `${el} × ${counts[el]}`, v: round(contribution, 3) });
      }
      return {
        primary: { label: "Molecular weight", value: `${round(totalWeight, 3)} g/mol` },
        secondary: breakdown,
        note: "Uses standard atomic weights (IUPAC). Doesn't support hydrate notation (like CuSO4·5H2O) or isotope-specific masses.",
      };
    },
    faq: [
      { q: "How do I calculate the molecular weight of water (H2O)?", a: "Add up the atomic weights: 2 hydrogen atoms (2 × 1.008 = 2.016) plus 1 oxygen atom (15.999), for a total of about 18.015 g/mol." },
      { q: "What's the difference between molecular weight and molar mass?", a: "They're the same value expressed differently - molecular weight is technically a dimensionless ratio, while molar mass carries units (grams per mole, g/mol), but in practice the numbers are identical and the terms are used interchangeably." },
      { q: "How do I enter a formula with parentheses, like Ca(OH)2?", a: "Type it exactly as written - this calculator supports parentheses with a multiplier, so Ca(OH)2 correctly counts 1 calcium, 2 oxygen, and 2 hydrogen atoms (the 2 outside the parentheses multiplies everything inside)." },
      { q: "Is a 'molecular weight calculators' or 'calculate molecular weights' search different from this tool?", a: "No - plural, verb, and noun forms of the same phrase all point to the same task: entering a chemical formula and getting its total molar mass back, which is exactly what this calculator does." },
      { q: "Is 'molar weight calculator' or 'mol wt calculator' the same as molecular weight?", a: "Yes - \"molar weight,\" \"mol wt,\" \"molecular weight,\" and \"molar mass\" are all names for the same quantity: the mass of one mole of a substance, in grams per mole. This calculator computes it from any chemical formula you enter." },
      { q: "How do we calculate molar mass?", a: "Add up the atomic weight of each element in the formula, multiplied by how many atoms of that element appear - for H2O, that's 2 × 1.008 (hydrogen) + 1 × 15.999 (oxygen) = 18.015 g/mol. Enter any formula above and this calculator does that sum for you." },
    ],
    related: ["percentage-calculator", "square-root-calculator", "exponent-calculator"],
  },
  {
    id: "empirical-formula-calculator",
    category: "math",
    title: "Empirical Formula Calculator",
    keyword: "empirical formula calculator",
    description: "Calculate a compound's empirical formula from the mass percentage of each element.",
    intro: "Enter up to three elements and their mass percentages to calculate the compound's empirical formula.",
    fields: [
      { id: "element1", label: "Element 1 symbol", type: "text", default: "C" },
      { id: "percent1", label: "Element 1 mass %", type: "number", unit: "%", default: 40.0, step: 0.01 },
      { id: "element2", label: "Element 2 symbol", type: "text", default: "H" },
      { id: "percent2", label: "Element 2 mass %", type: "number", unit: "%", default: 6.7, step: 0.01 },
      { id: "element3", label: "Element 3 symbol (optional)", type: "text", default: "O" },
      { id: "percent3", label: "Element 3 mass % (optional, 0 if unused)", type: "number", unit: "%", default: 53.3, step: 0.01 },
    ],
    compute: (v) => {
      const atomicWeights = {
        H: 1.008, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085,
        P: 30.974, S: 32.06, Cl: 35.45, K: 39.098, Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.38, Br: 79.904, I: 126.9,
      };
      const entries = [
        { el: (v.element1 || "").trim(), pct: v.percent1 },
        { el: (v.element2 || "").trim(), pct: v.percent2 },
        { el: (v.element3 || "").trim(), pct: v.percent3 },
      ].filter((e) => e.el && e.pct > 0);
      for (const e of entries) {
        if (!atomicWeights[e.el]) {
          return { primary: { label: "Unknown element", value: e.el }, secondary: [], note: "Supported elements: H, C, N, O, F, Na, Mg, Al, Si, P, S, Cl, K, Ca, Fe, Cu, Zn, Br, I." };
        }
      }
      if (entries.length < 2) {
        return { primary: { label: "Enter at least 2 elements", value: "-" }, secondary: [], note: "Fill in symbol and mass % for at least two elements." };
      }
      const moles = entries.map((e) => ({ el: e.el, mol: e.pct / atomicWeights[e.el] }));
      const minMol = Math.min(...moles.map((m) => m.mol));
      const ratios = moles.map((m) => ({ el: m.el, ratio: m.mol / minMol }));
      const roundedRatios = ratios.map((r) => Math.round(r.ratio));
      const formula = ratios.map((r, idx) => `${r.el}${roundedRatios[idx] === 1 ? "" : roundedRatios[idx]}`).join("");
      return {
        primary: { label: "Empirical formula", value: formula },
        secondary: ratios.map((r) => ({ l: r.el, v: round(r.ratio, 4) })),
        note: "Mole ratio = mass% ÷ atomic weight for each element, then divide all by the smallest to get the simplest whole-number ratio. If a ratio isn't close to a whole number, the true formula may need multiplying through by a small integer.",
      };
    },
    faq: [
      { q: "What is an empirical formula?", a: "The simplest whole-number ratio of atoms in a compound - for example, glucose's molecular formula is C₆H₁₂O₆, but its empirical formula is CH₂O, the reduced ratio." },
      { q: "How do I calculate an empirical formula from mass percentages?", a: "Divide each element's mass percentage by its atomic weight to get relative moles, then divide all the mole values by the smallest one to get the simplest ratio - round to whole numbers if they're close (like 1.98 → 2)." },
      { q: "What's the empirical formula for a compound that's 40% C, 6.7% H, 53.3% O?", a: "CH₂O - moles: C = 40/12.011 ≈ 3.33, H = 6.7/1.008 ≈ 6.65, O = 53.3/15.999 ≈ 3.33. Dividing all by the smallest (3.33) gives roughly C₁H₂O₁, so CH₂O." },
      { q: "Why might my mole ratios not come out to exact whole numbers?", a: "Rounding in the mass percentages themselves, or a true ratio that isn't 1:1:1 (like 2:3), can leave you with values like 1.5 or 2.33 instead of whole numbers - if that happens, try multiplying all the ratios by a small whole number (2 or 3) to see if they land on whole numbers." },
    ],
    related: ["molecular-weight-calculator", "chemical-equation-balancer", "percentage-calculator"],
  },
  {
    id: "system-of-equations-solver",
    category: "math",
    title: "System of Equations Solver",
    keyword: "system of equations solver",
    description: "Solve a system of two linear equations (ax + by = e, cx + dy = f) for x and y.",
    intro: "Enter the coefficients for two linear equations (ax + by = e and cx + dy = f) to solve for x and y.",
    fields: [
      { id: "a", label: "a (eq. 1: ax + by = e)", type: "number", default: 2, step: 0.1 },
      { id: "b", label: "b", type: "number", default: 3, step: 0.1 },
      { id: "e", label: "e", type: "number", default: 16, step: 0.1 },
      { id: "c", label: "c (eq. 2: cx + dy = f)", type: "number", default: 1, step: 0.1 },
      { id: "d", label: "d", type: "number", default: -1, step: 0.1 },
      { id: "f", label: "f", type: "number", default: 2, step: 0.1 },
    ],
    compute: (v) => {
      const det = v.a * v.d - v.b * v.c;
      if (Math.abs(det) < 1e-12) {
        const det2 = v.a * v.f - v.e * v.c;
        const sameLine = Math.abs(det2) < 1e-9 && Math.abs(v.b * v.f - v.e * v.d) < 1e-9;
        return {
          primary: { label: "Solution", value: sameLine ? "Infinitely many solutions" : "No solution" },
          secondary: [],
          note: sameLine
            ? "Both equations describe the same line, so every (x, y) pair on that line satisfies both equations."
            : "These two lines are parallel and never intersect, so there's no (x, y) that satisfies both equations.",
        };
      }
      const x = (v.e * v.d - v.b * v.f) / det;
      const y = (v.a * v.f - v.e * v.c) / det;
      return {
        primary: { label: "Solution", value: `x = ${round(x, 4)}, y = ${round(y, 4)}` },
        secondary: [
          { l: "x", v: round(x, 4) },
          { l: "y", v: round(y, 4) },
        ],
        note: "Solved using Cramer's rule - each variable is a ratio of two determinants of the coefficient matrix.",
      };
    },
    faq: [
      { q: "How do I solve a system of two linear equations?", a: "Using Cramer's rule (what this calculator does): for ax+by=e and cx+dy=f, x = (ed−bf)/(ad−bc) and y = (af−ec)/(ad−bc), where ad−bc is the determinant of the coefficient matrix. This works as long as that determinant isn't zero." },
      { q: "What does it mean if there's no solution?", a: "The two equations represent parallel lines (the same slope, different intercepts) that never cross - so there's no (x, y) pair that makes both equations true at the same time." },
      { q: "What does it mean if there are infinitely many solutions?", a: "The two equations actually describe the exact same line (one might just be a multiple of the other) - every point on that line satisfies both equations, so there isn't one unique (x, y) answer." },
      { q: "Is a 'systems of equations calculator' the same as this solver?", a: "Yes - \"systems of equations solver\" and \"systems of equations calculator\" both describe finding the (x, y) that satisfies two linear equations simultaneously, which is exactly what this tool does." },
    ],
    related: ["quadratic-formula-calculator", "ratio-calculator", "square-root-calculator"],
  },
  {
    id: "linear-equation-solver",
    category: "math",
    title: "Linear Equation Solver",
    keyword: "linear equation solver",
    description: "Solve a linear equation of the form ax + b = c for x.",
    intro: "Enter the coefficients for ax + b = c to solve for x.",
    fields: [
      { id: "a", label: "a (coefficient of x)", type: "number", default: 3, step: 0.1 },
      { id: "b", label: "b", type: "number", default: 5, step: 0.1 },
      { id: "c", label: "c", type: "number", default: 20, step: 0.1 },
    ],
    compute: (v) => {
      if (v.a === 0) {
        const isTrue = v.b === v.c;
        return {
          primary: { label: "Solution", value: isTrue ? "Infinitely many solutions" : "No solution" },
          secondary: [],
          note: isTrue
            ? "With a = 0, the equation reduces to b = c, which is true regardless of x - so every value of x works."
            : "With a = 0, the equation reduces to b = c, which is false here - so no value of x can make the equation true.",
        };
      }
      const x = (v.c - v.b) / v.a;
      return {
        primary: { label: "x =", value: round(x, 6) },
        secondary: [{ l: "Check", v: `${round(v.a, 4)}(${round(x, 4)}) + ${round(v.b, 4)} = ${round(v.a * x + v.b, 4)}` }],
        note: "Solved by isolating x: x = (c − b) / a.",
      };
    },
    faq: [
      { q: "How do I solve a linear equation like 3x + 5 = 20?", a: "Isolate x: subtract 5 from both sides to get 3x = 15, then divide both sides by 3 to get x = 5. In general, for ax + b = c, x = (c − b) / a." },
      { q: "What if the equation has x on both sides, like 2x + 3 = x + 10?", a: "Move all the x terms to one side and constants to the other first: subtracting x from both sides gives x + 3 = 10, then subtracting 3 gives x = 7. Rearrange your equation into the ax + b = c form before entering it here." },
      { q: "What does it mean if a = 0 in this calculator?", a: "If a is 0, there's no x term left to solve for - the equation becomes just b = c. If that's true (like 5 = 5), every value of x satisfies it; if it's false (like 5 = 7), no value of x can, since the x term can't change the outcome." },
    ],
    related: ["system-of-equations-solver", "quadratic-formula-calculator", "ratio-calculator"],
  },
  {
    id: "eigenvalue-calculator",
    category: "math",
    title: "Eigenvalue & Eigenvector Calculator (2x2)",
    keyword: "eigenvalues and eigenvectors calculator",
    description: "Calculate the eigenvalues and eigenvectors of a 2x2 matrix.",
    intro: "Enter the four entries of a 2x2 matrix [[a, b], [c, d]] to calculate its eigenvalues and eigenvectors.",
    fields: [
      { id: "a", label: "a (row 1, col 1)", type: "number", default: 2, step: 0.1 },
      { id: "b", label: "b (row 1, col 2)", type: "number", default: 1, step: 0.1 },
      { id: "c", label: "c (row 2, col 1)", type: "number", default: 1, step: 0.1 },
      { id: "d", label: "d (row 2, col 2)", type: "number", default: 2, step: 0.1 },
    ],
    compute: (v) => {
      const trace = v.a + v.d;
      const det = v.a * v.d - v.b * v.c;
      const discriminant = trace * trace - 4 * det;

      function eigenvector(lambda) {
        if (v.b !== 0) return [round(v.b, 4), round(lambda - v.a, 4)];
        if (v.c !== 0) return [round(lambda - v.d, 4), round(v.c, 4)];
        return v.a === lambda ? [1, 0] : [0, 1];
      }

      if (discriminant >= 0) {
        const sq = Math.sqrt(discriminant);
        const l1 = (trace + sq) / 2;
        const l2 = (trace - sq) / 2;
        const v1 = eigenvector(l1);
        const v2 = eigenvector(l2);
        return {
          primary: { label: "Eigenvalues", value: `λ₁ = ${round(l1, 4)}, λ₂ = ${round(l2, 4)}` },
          secondary: [
            { l: "Eigenvector for λ₁", v: `[${v1[0]}, ${v1[1]}]` },
            { l: "Eigenvector for λ₂", v: `[${v2[0]}, ${v2[1]}]` },
          ],
          note: "Eigenvectors are shown as one valid direction (any nonzero multiple is also a valid eigenvector) - they aren't normalized to unit length.",
        };
      } else {
        const realPart = trace / 2;
        const imagPart = Math.sqrt(-discriminant) / 2;
        return {
          primary: { label: "Eigenvalues", value: `${round(realPart, 4)} ± ${round(imagPart, 4)}i` },
          secondary: [{ l: "Trace", v: round(trace, 4) }, { l: "Determinant", v: round(det, 4) }],
          note: "This matrix has complex eigenvalues (no real eigenvectors) - this happens for matrices that represent a rotation-like transformation.",
        };
      }
    },
    faq: [
      { q: "How do I find eigenvalues of a 2x2 matrix?", a: "Solve det(A − λI) = 0, which for a 2x2 matrix [[a,b],[c,d]] simplifies to λ² − (a+d)λ + (ad−bc) = 0 - a quadratic equation in λ, using the matrix's trace (a+d) and determinant (ad−bc). This calculator applies that formula directly." },
      { q: "How do I find the eigenvector once I have an eigenvalue?", a: "Solve (A − λI)v = 0 for the vector v - for a 2x2 matrix this reduces to one independent equation, since the system is singular by construction. This calculator solves that directly from the b or c entry and the eigenvalue." },
      { q: "What does it mean if the eigenvalues are complex?", a: "Complex eigenvalues mean the matrix has no real eigenvectors - geometrically, this happens for matrices that rotate vectors (like a rotation matrix) rather than just stretching them along fixed directions, since a rotation has no direction that stays unchanged (except a 180° rotation)." },
    ],
    related: ["system-of-equations-solver", "quadratic-formula-calculator", "square-root-calculator"],
  },
  {
    id: "inequality-solver",
    category: "math",
    title: "Linear Inequality Solver",
    keyword: "solution inequality calculator",
    description: "Solve a linear inequality of the form ax + b [<, >, ≤, ≥] c for x.",
    intro: "Enter the coefficients and choose an inequality symbol to solve ax + b [symbol] c for x.",
    fields: [
      { id: "a", label: "a (coefficient of x)", type: "number", default: 2, step: 0.1 },
      { id: "b", label: "b", type: "number", default: 3, step: 0.1 },
      { id: "symbol", label: "Symbol", type: "select", default: "gt", options: [
        { v: "gt", l: ">" }, { v: "lt", l: "<" }, { v: "gte", l: "≥" }, { v: "lte", l: "≤" },
      ] },
      { id: "c", label: "c", type: "number", default: 7, step: 0.1 },
    ],
    compute: (v) => {
      if (v.a === 0) {
        const symbols = { gt: "b > c", lt: "b < c", gte: "b ≥ c", lte: "b ≤ c" };
        const holds = { gt: v.b > v.c, lt: v.b < v.c, gte: v.b >= v.c, lte: v.b <= v.c }[v.symbol];
        return {
          primary: { label: "Solution", value: holds ? "All real numbers" : "No solution" },
          secondary: [],
          note: `With a = 0, the inequality reduces to ${v.b} ${{ gt: ">", lt: "<", gte: "≥", lte: "≤" }[v.symbol]} ${v.c}, which is ${holds ? "always true" : "never true"} - x doesn't appear, so the inequality is ${holds ? "true for every x" : "false for every x"}.`,
        };
      }
      const boundary = (v.c - v.b) / v.a;
      // Dividing/multiplying an inequality by a negative flips its direction.
      let symbol = v.symbol;
      if (v.a < 0) {
        symbol = { gt: "lt", lt: "gt", gte: "lte", lte: "gte" }[symbol];
      }
      const symbolText = { gt: ">", lt: "<", gte: "≥", lte: "≤" }[symbol];
      return {
        primary: { label: "Solution", value: `x ${symbolText} ${round(boundary, 4)}` },
        secondary: [{ l: "Boundary value", v: round(boundary, 4) }],
        note: v.a < 0 ? "Dividing both sides by a negative number (a) flips the inequality's direction - that's already applied above." : undefined,
      };
    },
    faq: [
      { q: "How do I solve a linear inequality like 2x + 3 > 7?", a: "Isolate x the same way as an equation: subtract 3 from both sides to get 2x > 4, then divide by 2 to get x > 2. The only special rule is that dividing or multiplying by a negative number flips the inequality's direction." },
      { q: "Why does the inequality sign flip when dividing by a negative number?", a: "Because multiplying or dividing by a negative reverses the order of numbers on the number line - if 2 < 3, multiplying both sides by −1 gives −2 and −3, and −2 is actually greater than −3, so the inequality must flip to stay true (−2 > −3)." },
      { q: "What does 'no solution' or 'all real numbers' mean for an inequality?", a: "This happens when the x term cancels out (a = 0), leaving just a comparison of two numbers - if that comparison is always true (like 5 > 3), every x satisfies it; if it's never true (like 3 > 5), no x does, since x never had any influence on the outcome." },
    ],
    related: ["linear-equation-solver", "quadratic-formula-calculator", "system-of-equations-solver"],
  },
  {
    id: "chemical-equation-balancer",
    category: "math",
    title: "Chemical Equation Balancer",
    keyword: "chemical equation balancer",
    description: "Balance a chemical equation by finding the correct whole-number coefficients.",
    intro: "Enter an unbalanced equation (like Fe + O2 -> Fe2O3) using + between compounds and -> between reactants and products.",
    fields: [
      { id: "equation", label: "Equation", type: "text", default: "Fe + O2 -> Fe2O3" },
    ],
    compute: (v) => {
      const raw = (v.equation || "").trim();
      if (!raw) {
        return { primary: { label: "Balanced equation", value: "—" }, secondary: [], note: "Enter an equation, like Fe + O2 -> Fe2O3." };
      }
      const fail = (msg) => ({ primary: { label: "Balanced equation", value: "Invalid equation" }, secondary: [], note: msg });

      const arrowSplit = raw.split(/->|=>|=/);
      if (arrowSplit.length !== 2) return fail("Use -> (or =) to separate reactants from products, e.g. Fe + O2 -> Fe2O3.");
      const [leftRaw, rightRaw] = arrowSplit;
      const reactants = leftRaw.split("+").map((s) => s.trim()).filter(Boolean);
      const products = rightRaw.split("+").map((s) => s.trim()).filter(Boolean);
      if (!reactants.length || !products.length) return fail("Both sides of the equation need at least one compound.");
      const terms = [...reactants, ...products];

      function parseFormula(formula) {
        let i = 0;
        let error = null;
        const parseNumber = () => {
          const start = i;
          while (i < formula.length && /[0-9]/.test(formula[i])) i++;
          return start === i ? 1 : parseInt(formula.slice(start, i), 10);
        };
        const parseGroup = () => {
          const counts = {};
          while (i < formula.length && formula[i] !== ")" && !error) {
            if (formula[i] === "(") {
              i++;
              const inner = parseGroup();
              if (formula[i] !== ")") { error = `Mismatched parentheses in "${formula}"`; return counts; }
              i++;
              const mult = parseNumber();
              for (const el in inner) counts[el] = (counts[el] || 0) + inner[el] * mult;
            } else if (/[A-Z]/.test(formula[i])) {
              const start = i;
              i++;
              while (i < formula.length && /[a-z]/.test(formula[i])) i++;
              const el = formula.slice(start, i);
              const count = parseNumber();
              counts[el] = (counts[el] || 0) + count;
            } else {
              error = `Unexpected character in "${formula}"`;
              return counts;
            }
          }
          return counts;
        };
        const counts = parseGroup();
        if (!error && i !== formula.length) error = `Unexpected character at end of "${formula}"`;
        return { counts, error };
      }

      const termCounts = [];
      for (const t of terms) {
        const { counts, error } = parseFormula(t);
        if (error) return fail(error);
        termCounts.push(counts);
      }

      const elements = [...new Set(termCounts.flatMap((c) => Object.keys(c)))];
      const numTerms = terms.length;
      const matrix = elements.map((el, rowIdx) =>
        termCounts.map((counts, colIdx) => {
          const sign = colIdx < reactants.length ? 1 : -1;
          return sign * (counts[el] || 0);
        })
      );

      // Reduced row echelon form (Gauss-Jordan) to find the null space.
      const m = matrix.map((row) => row.slice());
      const rows = m.length;
      const cols = numTerms;
      let lead = 0;
      const pivotCols = [];
      for (let r = 0; r < rows && lead < cols; r++) {
        let i = r;
        while (i < rows && Math.abs(m[i][lead]) < 1e-9) i++;
        if (i === rows) { lead++; r--; continue; }
        [m[r], m[i]] = [m[i], m[r]];
        const lv = m[r][lead];
        for (let j = 0; j < cols; j++) m[r][j] /= lv;
        for (let i2 = 0; i2 < rows; i2++) {
          if (i2 !== r) {
            const factor = m[i2][lead];
            for (let j = 0; j < cols; j++) m[i2][j] -= factor * m[r][j];
          }
        }
        pivotCols.push(lead);
        lead++;
      }
      const freeCols = [];
      for (let c = 0; c < cols; c++) if (!pivotCols.includes(c)) freeCols.push(c);
      if (freeCols.length === 0) return fail("Couldn't find a way to balance this equation - check the formulas and try again.");

      const solution = new Array(cols).fill(0);
      solution[freeCols[0]] = 1;
      for (let r = 0; r < pivotCols.length; r++) {
        const pc = pivotCols[r];
        let val = 0;
        for (const fc of freeCols) val -= m[r][fc] * solution[fc];
        solution[pc] = val;
      }

      let coeffs = null;
      for (let k = 1; k <= 60 && !coeffs; k++) {
        const scaled = solution.map((x) => x * k);
        const allNearInt = scaled.every((x) => Math.abs(x - Math.round(x)) < 1e-3);
        const allPositive = scaled.every((x) => x > 1e-6);
        if (allNearInt && allPositive) coeffs = scaled.map((x) => Math.round(x));
      }
      if (!coeffs) return fail("Couldn't resolve whole-number coefficients for this equation - double-check the formulas.");

      let g = coeffs[0];
      for (let i = 1; i < coeffs.length; i++) g = gcd(g, coeffs[i]);
      if (g > 1) coeffs = coeffs.map((c) => c / g);

      for (const el of elements) {
        let reactantTotal = 0, productTotal = 0;
        for (let i = 0; i < reactants.length; i++) reactantTotal += coeffs[i] * (termCounts[i][el] || 0);
        for (let i = reactants.length; i < numTerms; i++) productTotal += coeffs[i] * (termCounts[i][el] || 0);
        if (reactantTotal !== productTotal) return fail(`Couldn't verify a balanced solution for element ${el} - double-check the equation.`);
      }

      const fmt = (coeff, term) => (coeff === 1 ? term : `${coeff}${term}`);
      const balancedLeft = reactants.map((t, i) => fmt(coeffs[i], t)).join(" + ");
      const balancedRight = products.map((t, i) => fmt(coeffs[reactants.length + i], t)).join(" + ");

      return {
        primary: { label: "Balanced equation", value: `${balancedLeft} → ${balancedRight}` },
        secondary: [
          { l: "Reactant coefficients", v: coeffs.slice(0, reactants.length).join(", ") },
          { l: "Product coefficients", v: coeffs.slice(reactants.length).join(", ") },
        ],
        note: "Verified atom-for-atom - every element has the same total count on both sides.",
      };
    },
    faq: [
      { q: "What does it mean to 'balance' a chemical equation?", a: "Finding the whole-number coefficients (multipliers) in front of each compound so the same number of atoms of each element appears on both sides of the equation - matter isn't created or destroyed in a chemical reaction, so both sides must balance exactly." },
      { q: "How do I enter an equation with multiple compounds, like combustion reactions?", a: "Separate compounds with + and use -> between reactants and products, for example: CH4 + O2 -> CO2 + H2O. This calculator finds the smallest whole-number coefficients that balance every element in the equation." },
      { q: "Why does this calculator sometimes say it can't balance my equation?", a: "Usually because of a typo in a chemical formula, or because the reaction as written isn't chemically valid (the same elements don't appear on both sides). Double-check each formula's capitalization and parentheses - chemical symbols are case-sensitive (Co is cobalt, CO is carbon monoxide)." },
    ],
    related: ["molecular-weight-calculator", "percentage-calculator", "square-root-calculator"],
  },
  {
    id: "solubility-product-calculator",
    category: "math",
    title: "Solubility Product (Ksp) Calculator",
    keyword: "solubility product calculator",
    description: "Calculate the solubility product constant (Ksp) from molar solubility and ion stoichiometry.",
    intro: "Enter the compound's molar solubility and the number of cations and anions it releases per formula unit to calculate Ksp.",
    fields: [
      { id: "solubility", label: "Molar solubility (s)", type: "number", unit: "mol/L", default: 0.00021, step: 0.00001 },
      { id: "cationCoeff", label: "Cations per formula unit (x)", type: "number", default: 1, step: 1, min: 1 },
      { id: "anionCoeff", label: "Anions per formula unit (y)", type: "number", default: 2, step: 1, min: 1 },
    ],
    compute: (v) => {
      const x = Math.round(v.cationCoeff);
      const y = Math.round(v.anionCoeff);
      const cationConc = x * v.solubility;
      const anionConc = y * v.solubility;
      const ksp = Math.pow(cationConc, x) * Math.pow(anionConc, y);
      return {
        primary: { label: "Ksp", value: ksp.toExponential(4) },
        secondary: [
          { l: "[Cation]", v: `${cationConc.toExponential(4)} mol/L` },
          { l: "[Anion]", v: `${anionConc.toExponential(4)} mol/L` },
        ],
        note: `For a compound AₓBᵧ dissolving into x cations and y anions: Ksp = [cation]^x × [anion]^y, where [cation] = x×s and [anion] = y×s at saturation.`,
      };
    },
    faq: [
      { q: "What is the solubility product constant (Ksp)?", a: "An equilibrium constant for a sparingly soluble ionic compound, equal to the product of its dissolved ion concentrations (each raised to its stoichiometric coefficient) at saturation - a lower Ksp means the compound is less soluble." },
      { q: "How do I calculate Ksp for CaF₂ (calcium fluoride)?", a: "CaF₂ dissolves as 1 Ca²⁺ and 2 F⁻ per formula unit, so with molar solubility s: [Ca²⁺] = s, [F⁻] = 2s, and Ksp = s × (2s)² = 4s³. Enter cation coefficient 1 and anion coefficient 2 above." },
      { q: "Why is the anion concentration multiplied by its coefficient before being raised to a power?", a: "Each formula unit that dissolves releases y anions, not just 1, so the anion concentration at saturation is y times the molar solubility - that scaled concentration is what gets raised to the power y in the Ksp expression, following the reaction stoichiometry." },
      { q: "Does this work for any compound, or just 1:1 and 1:2 ratios?", a: "It works for any x:y cation-to-anion ratio - enter the actual stoichiometric coefficients from the compound's formula (like 2 and 3 for a compound like Al₂S₃) and the calculator applies the same general formula." },
    ],
    related: ["molecular-weight-calculator", "chemical-equation-balancer", "limiting-reagent-calculator"],
  },
  {
    id: "titration-ph-calculator",
    category: "math",
    title: "Titration pH Calculator",
    keyword: "titration ph calculator",
    description: "Calculate the pH at any point during a strong acid / strong base titration.",
    intro: "Enter the acid and base concentrations and volumes to calculate the resulting pH - works for any point before, at, or after the equivalence point.",
    fields: [
      { id: "acidConc", label: "Acid concentration", type: "number", unit: "mol/L", default: 0.1, step: 0.001 },
      { id: "acidVolume", label: "Acid volume", type: "number", unit: "mL", default: 50, step: 1 },
      { id: "baseConc", label: "Base concentration", type: "number", unit: "mol/L", default: 0.1, step: 0.001 },
      { id: "baseVolume", label: "Base volume added", type: "number", unit: "mL", default: 40, step: 1 },
    ],
    compute: (v) => {
      const molesAcid = v.acidConc * (v.acidVolume / 1000);
      const molesBase = v.baseConc * (v.baseVolume / 1000);
      const totalVolume = (v.acidVolume + v.baseVolume) / 1000;
      let pH, note;
      if (Math.abs(molesAcid - molesBase) < 1e-12) {
        pH = 7;
        note = "At the equivalence point, moles of acid and base are equal - for a strong acid/strong base titration, this occurs at exactly pH 7.";
      } else if (molesBase < molesAcid) {
        const excessH = molesAcid - molesBase;
        const hConc = excessH / totalVolume;
        pH = -Math.log10(hConc);
        note = `Before equivalence: excess H⁺ = ${excessH.toExponential(4)} mol over ${round(totalVolume * 1000, 2)} mL total volume gives [H⁺] = ${hConc.toExponential(4)} mol/L, so pH = −log₁₀[H⁺].`;
      } else {
        const excessOH = molesBase - molesAcid;
        const ohConc = excessOH / totalVolume;
        const pOH = -Math.log10(ohConc);
        pH = 14 - pOH;
        note = `Past equivalence: excess OH⁻ = ${excessOH.toExponential(4)} mol over ${round(totalVolume * 1000, 2)} mL total volume gives [OH⁻] = ${ohConc.toExponential(4)} mol/L, so pOH = −log₁₀[OH⁻] and pH = 14 − pOH.`;
      }
      return {
        primary: { label: "pH", value: round(pH, 4) },
        secondary: [
          { l: "Moles of acid", v: molesAcid.toExponential(4) },
          { l: "Moles of base added", v: molesBase.toExponential(4) },
        ],
        note,
      };
    },
    faq: [
      { q: "How do I calculate pH before the equivalence point?", a: "Subtract moles of base from moles of acid to find excess H⁺, divide by total volume to get [H⁺], then pH = −log₁₀[H⁺]. This works because the strong base fully neutralizes an equal amount of acid, leaving the rest as excess." },
      { q: "What is the pH at the equivalence point for a strong acid/strong base titration?", a: "Exactly 7 - at the equivalence point, moles of acid and base are equal, fully neutralizing each other and leaving only water and a neutral salt, with no excess H⁺ or OH⁻." },
      { q: "How do I calculate pH after the equivalence point?", a: "Subtract moles of acid from moles of base to find excess OH⁻, divide by total volume to get [OH⁻], calculate pOH = −log₁₀[OH⁻], then pH = 14 − pOH." },
      { q: "Does this work for weak acids or weak bases?", a: "No - this calculator assumes both the acid and base are strong (fully dissociate), which is what makes the simple excess-ion math valid. Weak acid/base titrations need equilibrium (Ka/Kb) calculations and produce a different, non-7 pH at the equivalence point due to the conjugate base or acid remaining in solution." },
    ],
    related: ["solubility-product-calculator", "molecular-weight-calculator", "chemical-equation-balancer"],
  },
  {
    id: "limiting-reagent-calculator",
    category: "math",
    title: "Limiting Reagent Calculator",
    keyword: "how to do limiting reagent",
    description: "Find which of two reactants is the limiting reagent from their mass, formula, and stoichiometric coefficient.",
    intro: "Enter each reactant's chemical formula, mass, and its coefficient in the balanced equation to find the limiting reagent.",
    fields: [
      { id: "formula1", label: "Reactant 1 formula", type: "text", default: "H2" },
      { id: "mass1", label: "Reactant 1 mass", type: "number", unit: "g", default: 10, step: 0.1 },
      { id: "coeff1", label: "Reactant 1 coefficient", type: "number", default: 2, step: 1, min: 1 },
      { id: "formula2", label: "Reactant 2 formula", type: "text", default: "O2" },
      { id: "mass2", label: "Reactant 2 mass", type: "number", unit: "g", default: 10, step: 0.1 },
      { id: "coeff2", label: "Reactant 2 coefficient", type: "number", default: 1, step: 1, min: 1 },
    ],
    compute: (v) => {
      const ATOMIC_WEIGHTS = {
        H: 1.008, He: 4.0026, Li: 6.94, Be: 9.0122, B: 10.81, C: 12.011, N: 14.007, O: 15.999, F: 18.998, Ne: 20.18,
        Na: 22.99, Mg: 24.305, Al: 26.982, Si: 28.085, P: 30.974, S: 32.06, Cl: 35.45, Ar: 39.948, K: 39.098, Ca: 40.078,
        Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996, Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38,
        Ga: 69.723, Ge: 72.63, As: 74.922, Se: 78.971, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
        Ag: 107.87, Cd: 112.41, Sn: 118.71, I: 126.9, Ba: 137.33, Au: 196.97, Hg: 200.59, Pb: 207.2,
      };
      function molarMass(formula) {
        let i = 0, error = null;
        const clean = (formula || "").trim();
        const parseNumber = () => {
          const start = i;
          while (i < clean.length && /[0-9]/.test(clean[i])) i++;
          return start === i ? 1 : parseInt(clean.slice(start, i), 10);
        };
        const parseGroup = () => {
          const counts = {};
          while (i < clean.length && clean[i] !== ")" && !error) {
            if (clean[i] === "(") {
              i++;
              const inner = parseGroup();
              if (clean[i] !== ")") { error = "Mismatched parentheses"; return counts; }
              i++;
              const mult = parseNumber();
              for (const el in inner) counts[el] = (counts[el] || 0) + inner[el] * mult;
            } else if (/[A-Z]/.test(clean[i])) {
              const start = i;
              i++;
              while (i < clean.length && /[a-z]/.test(clean[i])) i++;
              const el = clean.slice(start, i);
              if (!(el in ATOMIC_WEIGHTS)) { error = `Unknown element: ${el}`; return counts; }
              counts[el] = (counts[el] || 0) + parseNumber();
            } else {
              error = `Unexpected character: ${clean[i]}`;
              return counts;
            }
          }
          return counts;
        };
        const counts = parseGroup();
        if (!error && i !== clean.length) error = "Unexpected character at end";
        if (error) return { mass: null, error };
        let total = 0;
        for (const el in counts) total += ATOMIC_WEIGHTS[el] * counts[el];
        return { mass: total, error: null };
      }
      const m1 = molarMass(v.formula1);
      const m2 = molarMass(v.formula2);
      if (m1.error || m2.error) {
        return { primary: { label: "Limiting reagent", value: "Invalid formula" }, secondary: [], note: (m1.error || "") + " " + (m2.error || "") + " - try formats like H2, O2, or Ca(OH)2." };
      }
      const moles1 = v.mass1 / m1.mass;
      const moles2 = v.mass2 / m2.mass;
      const ratio1 = moles1 / v.coeff1;
      const ratio2 = moles2 / v.coeff2;
      const limiting = ratio1 < ratio2 ? v.formula1 : ratio2 < ratio1 ? v.formula2 : "Neither (exact stoichiometric match)";
      return {
        primary: { label: "Limiting reagent", value: limiting },
        secondary: [
          { l: `Moles of ${v.formula1}`, v: round(moles1, 4) },
          { l: `Moles of ${v.formula2}`, v: round(moles2, 4) },
        ],
        note: "The limiting reagent is whichever reactant has the smaller moles-to-coefficient ratio - it runs out first and determines how much product can form.",
      };
    },
    faq: [
      { q: "How do I find the limiting reagent?", a: "Convert each reactant's mass to moles (mass ÷ molar mass), divide by its coefficient in the balanced equation, then compare - whichever reactant has the smaller result is the limiting reagent, since it will run out first." },
      { q: "Why does the coefficient matter, not just the moles?", a: "The balanced equation's coefficients show the required ratio between reactants - having more raw moles of a reactant doesn't help if the reaction needs proportionally even more of it. Dividing by the coefficient normalizes each reactant to \"how many complete reactions worth\" you have." },
      { q: "What happens to the excess reagent?", a: "The non-limiting reagent is left over (in excess) once the limiting reagent is fully consumed - the reaction stops there, and any remaining excess reagent doesn't react further without more of the limiting reagent being added." },
    ],
    related: ["chemical-equation-balancer", "molecular-weight-calculator", "percentage-calculator"],
  },
  {
    id: "half-life-calculator",
    category: "math",
    title: "Half-Life Calculator",
    keyword: "half life calculator",
    description: "Calculate half-life, remaining amount, or elapsed time for first-order decay (radioactive decay or first-order reaction kinetics).",
    intro: "Choose what to solve for, then enter the known values to calculate first-order decay - used for radioactive decay and first-order chemical reaction kinetics.",
    fields: [
      { id: "solveFor", label: "Solve for", type: "select", default: "remaining", options: [
        { v: "remaining", l: "Remaining amount (from half-life and time)" }, { v: "halfLife", l: "Half-life (from rate constant k)" }, { v: "rateConstant", l: "Rate constant k (from half-life)" },
      ] },
      { id: "initialAmount", label: "Initial amount", type: "number", default: 100, step: 1 },
      { id: "halfLife", label: "Half-life", type: "number", unit: "time units", default: 10, step: 0.1 },
      { id: "elapsedTime", label: "Elapsed time", type: "number", unit: "time units", default: 25, step: 0.1 },
      { id: "rateConstant", label: "Rate constant (k)", type: "number", unit: "per time unit", default: 0.0693, step: 0.0001 },
    ],
    compute: (v) => {
      if (v.solveFor === "remaining") {
        const remaining = v.initialAmount * Math.pow(0.5, v.elapsedTime / v.halfLife);
        const percentRemaining = (remaining / v.initialAmount) * 100;
        return {
          primary: { label: "Remaining amount", value: round(remaining, 6) },
          secondary: [{ l: "Percent remaining", v: `${round(percentRemaining, 3)}%` }],
          note: "N(t) = N₀ × (1/2)^(t / half-life). Assumes simple first-order (exponential) decay.",
        };
      }
      if (v.solveFor === "halfLife") {
        const halfLife = Math.LN2 / v.rateConstant;
        return {
          primary: { label: "Half-life", value: round(halfLife, 6) },
          secondary: [{ l: "Rate constant used", v: v.rateConstant }],
          note: "Half-life = ln(2) / k, the standard relationship for first-order kinetics or radioactive decay.",
        };
      }
      const k = Math.LN2 / v.halfLife;
      return {
        primary: { label: "Rate constant (k)", value: round(k, 6) },
        secondary: [{ l: "Half-life used", v: v.halfLife }],
        note: "k = ln(2) / half-life, the standard relationship for first-order kinetics or radioactive decay.",
      };
    },
    faq: [
      { q: "What is the formula for first-order half-life?", a: "Half-life = ln(2) / k, where k is the rate constant. Equivalently, k = ln(2) / half-life. This applies to both radioactive decay and first-order chemical reaction kinetics." },
      { q: "How much of a substance remains after several half-lives?", a: "N(t) = N₀ × (1/2)^(t / half-life). After 1 half-life, 50% remains; after 2, 25%; after 3, 12.5% - each half-life cuts the remaining amount in half, regardless of the starting amount." },
      { q: "How much of 100 units remains after 25 time units, with a half-life of 10?", a: "About 17.7 units (17.7% of the original) - 100 × (1/2)^(25/10) = 100 × 0.5^2.5 ≈ 17.68." },
      { q: "Does this apply to both radioactive decay and chemical reactions?", a: "Yes, for first-order processes - radioactive decay is inherently first-order, and many chemical reactions (where the rate depends on the concentration of a single reactant) follow the same exponential decay math." },
    ],
    related: ["molecular-weight-calculator", "compound-interest-calculator", "solubility-product-calculator"],
  },
  {
    id: "hardy-weinberg-calculator",
    category: "math",
    title: "Hardy-Weinberg Equilibrium Calculator",
    keyword: "hardy weinberg calculator",
    description: "Calculate genotype and allele frequencies using the Hardy-Weinberg equilibrium equation.",
    intro: "Enter one allele frequency (or a genotype frequency) to calculate the expected genotype frequencies under Hardy-Weinberg equilibrium.",
    fields: [
      { id: "solveFrom", label: "Calculate from", type: "select", default: "p", options: [
        { v: "p", l: "Dominant allele frequency (p)" }, { v: "q2", l: "Recessive genotype frequency (q²)" },
      ] },
      { id: "value", label: "Value (0 to 1)", type: "number", default: 0.7, step: 0.01, min: 0, max: 1 },
    ],
    compute: (v) => {
      let p, q;
      if (v.solveFrom === "p") {
        p = Math.max(0, Math.min(1, v.value));
        q = 1 - p;
      } else {
        const q2 = Math.max(0, Math.min(1, v.value));
        q = Math.sqrt(q2);
        p = 1 - q;
      }
      const p2 = p * p;
      const twoPQ = 2 * p * q;
      const q2 = q * q;
      return {
        primary: { label: "Homozygous dominant (p²)", value: `${round(p2 * 100, 2)}%` },
        secondary: [
          { l: "Heterozygous (2pq)", v: `${round(twoPQ * 100, 2)}%` },
          { l: "Homozygous recessive (q²)", v: `${round(q2 * 100, 2)}%` },
          { l: "p, q", v: `${round(p, 4)}, ${round(q, 4)}` },
        ],
        note: "Hardy-Weinberg equilibrium: p² + 2pq + q² = 1, where p and q are the two allele frequencies (p + q = 1). Assumes no mutation, migration, selection, or genetic drift, and random mating in a large population.",
      };
    },
    faq: [
      { q: "What is the Hardy-Weinberg equation?", a: "p² + 2pq + q² = 1, where p and q are the frequencies of two alleles at a gene (p + q = 1). p² is the frequency of homozygous dominant individuals, 2pq is heterozygous, and q² is homozygous recessive." },
      { q: "If the dominant allele frequency (p) is 0.7, what are the genotype frequencies?", a: "q = 1 − 0.7 = 0.3. p² = 0.49 (49% homozygous dominant), 2pq = 0.42 (42% heterozygous), q² = 0.09 (9% homozygous recessive)." },
      { q: "How do I find allele frequencies if I only know the recessive phenotype frequency?", a: "The recessive phenotype frequency equals q² (only homozygous recessive individuals show the recessive trait), so take its square root to get q, then p = 1 − q." },
      { q: "What assumptions does Hardy-Weinberg equilibrium require?", a: "No mutation, no migration, no natural selection, random mating, and an infinitely large population (no genetic drift) - real populations rarely meet all these perfectly, so Hardy-Weinberg serves as a theoretical baseline to detect when evolution is happening, by comparing observed frequencies to the expected equilibrium." },
    ],
    related: ["solubility-product-calculator", "standard-deviation-calculator", "z-score-calculator"],
  },
  {
    id: "grade-calculator",
    category: "math",
    title: "Grade Calculator",
    keyword: "grade calculator",
    description: "Calculate a test or exam grade as a percentage and letter grade from points earned and total points.",
    intro: "Enter the points earned and total possible points to calculate your percentage and letter grade.",
    fields: [
      { id: "earned", label: "Points earned", type: "number", default: 85, step: 0.5 },
      { id: "total", label: "Total points possible", type: "number", default: 100, step: 0.5 },
    ],
    compute: (v) => {
      const pct = v.total === 0 ? 0 : (v.earned / v.total) * 100;
      let letter = "F";
      if (pct >= 97) letter = "A+";
      else if (pct >= 93) letter = "A";
      else if (pct >= 90) letter = "A-";
      else if (pct >= 87) letter = "B+";
      else if (pct >= 83) letter = "B";
      else if (pct >= 80) letter = "B-";
      else if (pct >= 77) letter = "C+";
      else if (pct >= 73) letter = "C";
      else if (pct >= 70) letter = "C-";
      else if (pct >= 67) letter = "D+";
      else if (pct >= 63) letter = "D";
      else if (pct >= 60) letter = "D-";
      return {
        primary: { label: "Grade", value: `${round(pct, 2)}%` },
        secondary: [
          { l: "Letter grade", v: letter },
          { l: "Points missed", v: round(v.total - v.earned, 2) },
        ],
        note: "Uses a standard US grading scale (90+ = A range, 80-89 = B range, etc.). Individual schools and instructors may use a different scale.",
      };
    },
    faq: [
      { q: "How do I calculate my grade as a percentage?", a: "Divide the points you earned by the total points possible, then multiply by 100. Scoring 85 out of 100 gives 85/100 × 100 = 85%." },
      { q: "What percentage is each letter grade?", a: "On the standard US scale this calculator uses: 90-100% is the A range, 80-89% is B, 70-79% is C, 60-69% is D, and below 60% is F, each split further into +/- bands (e.g. 93-96% is a straight A, 90-92% is A-)." },
      { q: "Is this the same as a gradebook calculator?", a: "Yes - \"gradebook calculator\" and \"grading calculator\" both describe figuring out a grade percentage and letter grade from points earned, which is exactly what this tool does for a single test, assignment, or exam." },
    ],
    related: ["average-calculator", "percentage-calculator", "percentage-change-calculator"],
  },
  {
    id: "weighted-grade-calculator",
    category: "math",
    title: "Weighted Grade Calculator",
    keyword: "weighted grade calculator",
    description: "Calculate an overall course grade from category scores and weights, like homework, tests, and a final exam.",
    intro: "Enter your score and weight for each category to calculate your overall weighted grade.",
    fields: [
      { id: "homeworkScore", label: "Homework score", type: "number", unit: "%", default: 95, step: 0.5 },
      { id: "homeworkWeight", label: "Homework weight", type: "number", unit: "%", default: 20, step: 1 },
      { id: "testsScore", label: "Tests score", type: "number", unit: "%", default: 82, step: 0.5 },
      { id: "testsWeight", label: "Tests weight", type: "number", unit: "%", default: 40, step: 1 },
      { id: "finalScore", label: "Final exam score", type: "number", unit: "%", default: 88, step: 0.5 },
      { id: "finalWeight", label: "Final exam weight", type: "number", unit: "%", default: 40, step: 1 },
    ],
    compute: (v) => {
      const totalWeight = v.homeworkWeight + v.testsWeight + v.finalWeight;
      const weightedSum = v.homeworkScore * v.homeworkWeight + v.testsScore * v.testsWeight + v.finalScore * v.finalWeight;
      const overall = totalWeight === 0 ? 0 : weightedSum / totalWeight;
      let letter = "F";
      if (overall >= 97) letter = "A+";
      else if (overall >= 93) letter = "A";
      else if (overall >= 90) letter = "A-";
      else if (overall >= 87) letter = "B+";
      else if (overall >= 83) letter = "B";
      else if (overall >= 80) letter = "B-";
      else if (overall >= 77) letter = "C+";
      else if (overall >= 73) letter = "C";
      else if (overall >= 70) letter = "C-";
      else if (overall >= 67) letter = "D+";
      else if (overall >= 63) letter = "D";
      else if (overall >= 60) letter = "D-";
      return {
        primary: { label: "Overall grade", value: `${round(overall, 2)}%` },
        secondary: [
          { l: "Letter grade", v: letter },
          { l: "Total weight entered", v: `${round(totalWeight, 1)}%` },
        ],
        note: totalWeight !== 100 ? `Your weights add up to ${round(totalWeight, 1)}%, not 100% - the overall grade above is still calculated correctly (normalized to whatever total you entered), but double-check your category weights match your syllabus.` : undefined,
      };
    },
    faq: [
      { q: "How do I calculate a weighted grade?", a: "Multiply each category's score by its weight, add those together, then divide by the total weight. For 95% homework at 20%, 82% tests at 40%, and 88% final at 40%: (95×20 + 82×40 + 88×40) / 100 = 87.4%." },
      { q: "What if my category weights don't add up to 100%?", a: "This calculator still works correctly - it divides by whatever your weights actually sum to, which handles a partial-progress scenario (like weights that only cover work completed so far). Just make sure the weights you enter match the categories your instructor actually uses." },
      { q: "Is this different from the regular Grade Calculator?", a: "Yes - the regular Grade Calculator converts a single score (like one test) into a percentage and letter grade. This tool combines multiple weighted categories - homework, tests, a final exam, etc. - into one overall course grade." },
    ],
    related: ["grade-calculator", "average-calculator", "percentage-calculator"],
  },
  {
    id: "gpa-calculator",
    category: "math",
    title: "Weighted GPA Calculator",
    keyword: "weighted calculator gpa",
    description: "Calculate your GPA on a 4.0 scale from letter grades and credit hours across up to 5 courses.",
    intro: "Enter a letter grade and credit hours for each course to calculate your credit-weighted GPA.",
    fields: [
      { id: "grade1", label: "Course 1 grade", type: "select", default: "A", options: [
        { v: "A", l: "A (4.0)" }, { v: "A-", l: "A- (3.7)" }, { v: "B+", l: "B+ (3.3)" }, { v: "B", l: "B (3.0)" }, { v: "B-", l: "B- (2.7)" },
        { v: "C+", l: "C+ (2.3)" }, { v: "C", l: "C (2.0)" }, { v: "C-", l: "C- (1.7)" }, { v: "D+", l: "D+ (1.3)" }, { v: "D", l: "D (1.0)" }, { v: "F", l: "F (0.0)" },
      ] },
      { id: "credits1", label: "Course 1 credit hours", type: "number", default: 3, step: 0.5, min: 0 },
      { id: "grade2", label: "Course 2 grade", type: "select", default: "B+", options: [
        { v: "A", l: "A (4.0)" }, { v: "A-", l: "A- (3.7)" }, { v: "B+", l: "B+ (3.3)" }, { v: "B", l: "B (3.0)" }, { v: "B-", l: "B- (2.7)" },
        { v: "C+", l: "C+ (2.3)" }, { v: "C", l: "C (2.0)" }, { v: "C-", l: "C- (1.7)" }, { v: "D+", l: "D+ (1.3)" }, { v: "D", l: "D (1.0)" }, { v: "F", l: "F (0.0)" },
      ] },
      { id: "credits2", label: "Course 2 credit hours", type: "number", default: 3, step: 0.5, min: 0 },
      { id: "grade3", label: "Course 3 grade", type: "select", default: "A-", options: [
        { v: "A", l: "A (4.0)" }, { v: "A-", l: "A- (3.7)" }, { v: "B+", l: "B+ (3.3)" }, { v: "B", l: "B (3.0)" }, { v: "B-", l: "B- (2.7)" },
        { v: "C+", l: "C+ (2.3)" }, { v: "C", l: "C (2.0)" }, { v: "C-", l: "C- (1.7)" }, { v: "D+", l: "D+ (1.3)" }, { v: "D", l: "D (1.0)" }, { v: "F", l: "F (0.0)" },
      ] },
      { id: "credits3", label: "Course 3 credit hours", type: "number", default: 3, step: 0.5, min: 0 },
      { id: "grade4", label: "Course 4 grade (optional)", type: "select", default: "B", options: [
        { v: "A", l: "A (4.0)" }, { v: "A-", l: "A- (3.7)" }, { v: "B+", l: "B+ (3.3)" }, { v: "B", l: "B (3.0)" }, { v: "B-", l: "B- (2.7)" },
        { v: "C+", l: "C+ (2.3)" }, { v: "C", l: "C (2.0)" }, { v: "C-", l: "C- (1.7)" }, { v: "D+", l: "D+ (1.3)" }, { v: "D", l: "D (1.0)" }, { v: "F", l: "F (0.0)" },
      ] },
      { id: "credits4", label: "Course 4 credit hours (0 to skip)", type: "number", default: 0, step: 0.5, min: 0 },
      { id: "grade5", label: "Course 5 grade (optional)", type: "select", default: "A", options: [
        { v: "A", l: "A (4.0)" }, { v: "A-", l: "A- (3.7)" }, { v: "B+", l: "B+ (3.3)" }, { v: "B", l: "B (3.0)" }, { v: "B-", l: "B- (2.7)" },
        { v: "C+", l: "C+ (2.3)" }, { v: "C", l: "C (2.0)" }, { v: "C-", l: "C- (1.7)" }, { v: "D+", l: "D+ (1.3)" }, { v: "D", l: "D (1.0)" }, { v: "F", l: "F (0.0)" },
      ] },
      { id: "credits5", label: "Course 5 credit hours (0 to skip)", type: "number", default: 0, step: 0.5, min: 0 },
    ],
    compute: (v) => {
      const points = { A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7, "C+": 2.3, C: 2.0, "C-": 1.7, "D+": 1.3, D: 1.0, F: 0.0 };
      const courses = [
        [v.grade1, v.credits1], [v.grade2, v.credits2], [v.grade3, v.credits3],
        [v.grade4, v.credits4], [v.grade5, v.credits5],
      ];
      let totalPoints = 0, totalCredits = 0;
      for (const [grade, credits] of courses) {
        if (credits > 0) {
          totalPoints += points[grade] * credits;
          totalCredits += credits;
        }
      }
      const gpa = totalCredits === 0 ? 0 : totalPoints / totalCredits;
      return {
        primary: { label: "Weighted GPA", value: round(gpa, 3) },
        secondary: [
          { l: "Total credit hours", v: totalCredits },
          { l: "Total quality points", v: round(totalPoints, 2) },
        ],
        note: "Uses a standard unweighted 4.0 scale (A=4.0 down to F=0.0). Some schools use a different scale or add extra points for honors/AP courses - check your school's specific scale if this needs to match a transcript exactly.",
      };
    },
    faq: [
      { q: "How is GPA calculated?", a: "Convert each course's letter grade to grade points (A=4.0, A-=3.7, B+=3.3, etc.), multiply by that course's credit hours to get \"quality points,\" add up the quality points across all courses, then divide by the total credit hours - this weights higher-credit courses more heavily than lower-credit ones." },
      { q: "Why is this called a 'weighted' GPA calculator?", a: "\"Weighted\" here refers to weighting by credit hours - a 4-credit course affects your GPA more than a 1-credit course. This is different from \"weighted\" in the high school sense (extra GPA points for honors/AP classes), which this calculator doesn't apply - it uses a standard unweighted 4.0 scale per course." },
      { q: "What if I'm only taking 2 or 3 courses?", a: "Leave the unused course credit-hour fields at 0 - this calculator skips any course with 0 credit hours entered, so you can use just 2, 3, 4, or all 5 course slots." },
      { q: "Is a 'GPA calculator with weighted grades' the same as this tool?", a: "Yes - this calculator weights each course's grade by its credit hours, which is exactly what \"weighted GPA\" means in this context. Enter your grades and credit hours above to get your overall GPA." },
    ],
    related: ["grade-calculator", "weighted-grade-calculator", "average-calculator"],
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
      { q: "Is this the same as a lending calculator, loan simulator, or autoloan calculator?", a: "\"Lending calculator\" and \"loan simulator\" are just other names for a loan payment calculator, and this tool covers both - enter a principal, rate, and term for any fixed-rate loan. If you're specifically financing a vehicle, the auto loan calculator is a better fit since it also handles trade-in value and sales tax." },
    ],
    related: ["mortgage-calculator", "auto-loan-calculator", "percentage-calculator", "tip-calculator"],
  },
  {
    id: "amortization-schedule-calculator",
    category: "finance",
    title: "Amortization Schedule Calculator",
    keyword: "amortization schedule calculator",
    description: "See a full month-by-month payment breakdown - principal, interest, and remaining balance - for a fixed-rate loan.",
    intro: "Enter a loan amount, rate, and term to see the monthly payment plus the complete amortization schedule below.",
    fields: [
      { id: "principal", label: "Loan amount", type: "number", unit: "$", default: 20000, step: 100 },
      { id: "rate", label: "Annual interest rate", type: "number", unit: "%", default: 6.5, step: 0.01 },
      { id: "years", label: "Loan term", type: "number", unit: "years", default: 5, step: 1 },
    ],
    compute: (v) => {
      const monthlyRate = v.rate / 100 / 12;
      const n = Math.round(v.years * 12);
      const payment = monthlyRate === 0
        ? v.principal / n
        : (v.principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      let balance = v.principal;
      let totalInterest = 0;
      const rows = [];
      for (let month = 1; month <= n; month++) {
        const interestPortion = balance * monthlyRate;
        let principalPortion = payment - interestPortion;
        if (month === n || principalPortion > balance) principalPortion = balance;
        const actualPayment = principalPortion + interestPortion;
        balance = Math.max(0, balance - principalPortion);
        totalInterest += interestPortion;
        rows.push([
          month,
          `$${round(actualPayment, 2).toLocaleString()}`,
          `$${round(principalPortion, 2).toLocaleString()}`,
          `$${round(interestPortion, 2).toLocaleString()}`,
          `$${round(balance, 2).toLocaleString()}`,
        ]);
      }
      return {
        primary: { label: "Monthly payment", value: `$${round(payment, 2).toLocaleString()}` },
        secondary: [
          { l: "Total interest", v: `$${round(totalInterest, 0).toLocaleString()}` },
          { l: "Total paid", v: `$${round(v.principal + totalInterest, 0).toLocaleString()}` },
          { l: "Number of payments", v: n },
        ],
        note: "Scroll the table below for the full payment-by-payment schedule.",
        table: {
          columns: ["Month", "Payment", "Principal", "Interest", "Balance"],
          rows,
        },
      };
    },
    faq: [
      { q: "What's an amortization schedule?", a: "A table showing every payment over the life of a loan, broken into how much goes to principal versus interest, plus the remaining balance after each payment - it shows exactly how the principal/interest split shifts over time, even though the total payment stays the same." },
      { q: "Why does more of my payment go to interest early on?", a: "Interest is calculated on the remaining balance each period, and the balance is largest at the start of the loan - as principal gets paid down, the interest portion shrinks and more of each fixed payment goes toward principal instead." },
      { q: "Why is my last payment sometimes a different amount?", a: "Rounding across many months of interest calculations can leave a few cents of balance remaining after the second-to-last scheduled payment - this calculator adjusts the final payment to clear the exact remaining balance rather than leaving a tiny leftover balance." },
      { q: "Is 'amortization schedule for loan' the same as this calculator?", a: "Yes - enter your loan amount, rate, and term above to see the full amortization schedule for that loan, exactly what this phrase is asking for." },
    ],
    related: ["loan-calculator", "mortgage-calculator", "auto-loan-calculator"],
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
    id: "home-affordability-calculator",
    category: "finance",
    title: "How Much House Can I Afford Calculator",
    keyword: "how much house can i afford",
    description: "Estimate the home price you can afford, based on income, debt, and a down payment.",
    intro: "Enter your income, existing monthly debt, down payment, and loan terms to estimate an affordable home price using standard debt-to-income guidelines.",
    fields: [
      { id: "annualIncome", label: "Annual household income", type: "number", unit: "$", default: 90000, step: 1000, min: 0 },
      { id: "monthlyDebt", label: "Existing monthly debt payments", type: "number", unit: "$", default: 500, step: 10, min: 0 },
      { id: "downPayment", label: "Down payment", type: "number", unit: "$", default: 40000, step: 1000, min: 0 },
      { id: "rate", label: "Mortgage interest rate", type: "number", unit: "%", default: 6.5, step: 0.01 },
      { id: "years", label: "Loan term", type: "number", unit: "years", default: 30, step: 1, min: 1 },
      { id: "taxInsurance", label: "Est. monthly taxes & insurance", type: "number", unit: "$", default: 300, step: 10, min: 0 },
    ],
    compute: (v) => {
      const monthlyIncome = v.annualIncome / 12;
      const maxFrontEnd = monthlyIncome * 0.28;
      const maxBackEnd = monthlyIncome * 0.36 - v.monthlyDebt;
      const maxTotalPayment = Math.min(maxFrontEnd, maxBackEnd);
      const maxPrincipalAndInterest = maxTotalPayment - v.taxInsurance;
      if (maxPrincipalAndInterest <= 0) {
        return { primary: { label: "Not enough income headroom", value: "$0" }, secondary: [], note: "Your existing debt and estimated taxes/insurance leave no room for a mortgage payment under standard 28%/36% guidelines." };
      }
      const r = v.rate / 100 / 12;
      const n = v.years * 12;
      const maxLoan = (maxPrincipalAndInterest * (1 - Math.pow(1 + r, -n))) / r;
      const maxHomePrice = maxLoan + v.downPayment;
      return {
        primary: { label: "Estimated affordable home price", value: `$${round(maxHomePrice, 0).toLocaleString()}` },
        secondary: [
          { l: "Max monthly payment (P&I + tax/ins.)", v: `$${round(maxTotalPayment, 0).toLocaleString()}` },
          { l: "Max loan amount", v: `$${round(maxLoan, 0).toLocaleString()}` },
        ],
        note: "Uses the standard 28/36 rule: monthly housing costs shouldn't exceed 28% of gross income, and total debt payments (including housing) shouldn't exceed 36%. Actual lender approval also depends on credit score, other assets, and specific loan program rules.",
      };
    },
    faq: [
      { q: "What is the 28/36 rule?", a: "A widely used mortgage affordability guideline: your total monthly housing costs (mortgage, taxes, insurance) shouldn't exceed 28% of gross monthly income, and your total debt payments (housing plus other debts like car loans and credit cards) shouldn't exceed 36%." },
      { q: "Why does this calculator ask about existing monthly debt?", a: "Lenders look at your total debt burden, not just the potential mortgage payment - the \"back-end\" 36% limit already has to cover your car payments, student loans, and credit card minimums, so more existing debt directly reduces how much mortgage payment you can qualify for." },
      { q: "Does a bigger down payment increase how much house I can afford?", a: "Yes, directly - the down payment adds straight to the maximum loan amount to determine home price, and it can also reduce your monthly payment (a smaller loan needs a smaller payment) or help you avoid private mortgage insurance, freeing up more payment room." },
      { q: "Is this the same amount a lender will actually approve me for?", a: "Not necessarily - lenders also weigh your credit score, employment history, cash reserves, and specific loan program guidelines (conventional, FHA, VA, etc.), which can push their actual approved amount higher or lower than this 28/36-rule estimate." },
    ],
    related: ["mortgage-calculator", "dti-ratio-calculator", "loan-calculator"],
  },
  {
    id: "hourly-to-salary-calculator",
    category: "finance",
    title: "Hourly to Salary Calculator",
    keyword: "hourly to salary calculator",
    description: "Convert an hourly wage into an estimated annual salary, and back.",
    intro: "Enter an hourly wage, hours per week, and weeks worked per year to calculate the equivalent annual salary.",
    fields: [
      { id: "hourlyRate", label: "Hourly wage", type: "number", unit: "$", default: 19, step: 0.25 },
      { id: "hoursPerWeek", label: "Hours per week", type: "number", default: 40, step: 1 },
      { id: "weeksPerYear", label: "Weeks worked per year", type: "number", default: 52, step: 1 },
    ],
    compute: (v) => {
      const weeklyPay = v.hourlyRate * v.hoursPerWeek;
      const annual = weeklyPay * v.weeksPerYear;
      const monthly = annual / 12;
      return {
        primary: { label: "Annual salary", value: `$${round(annual, 2).toLocaleString()}` },
        secondary: [
          { l: "Monthly", v: `$${round(monthly, 2).toLocaleString()}` },
          { l: "Weekly", v: `$${round(weeklyPay, 2).toLocaleString()}` },
        ],
        note: "This is gross (pre-tax) pay - actual take-home pay is lower after taxes and any other withholdings. Uses a standard full-time schedule by default (40 hrs/week, 52 weeks/year); adjust for part-time hours or unpaid time off.",
      };
    },
    faq: [
      { q: "How do I convert an hourly wage to an annual salary?", a: "Multiply hourly wage by hours worked per week, then by weeks worked per year. At full-time hours (40/week, 52 weeks), that's hourly × 2,080. A $19/hour wage works out to $19 × 2,080 = $39,520 per year." },
      { q: "Why 2,080 hours in a work year?", a: "40 hours/week × 52 weeks/year = 2,080 hours - the standard full-time work-year figure used for salary conversions, assuming no unpaid time off. If you take unpaid vacation or have fewer working weeks, use a lower \"weeks worked per year\" figure for a more accurate estimate." },
      { q: "Does this account for overtime pay?", a: "No - this calculator assumes a flat hourly rate for all hours entered. If some of your hours are paid at an overtime rate (typically 1.5x for hours over 40/week in the US), calculate the regular and overtime portions separately and add them together." },
      { q: "$48,000 a year is how much an hour?", a: "About $23.08/hour at standard full-time hours (2,080 hours/year): $48,000 ÷ 2,080 ≈ $23.08. To confirm with this calculator, adjust the hourly wage until the annual salary shown matches $48,000, or divide any annual salary by 2,080 directly for the same result." },
    ],
    related: ["loan-calculator", "savings-calculator", "tip-calculator"],
  },
  {
    id: "time-card-calculator",
    category: "finance",
    title: "Time Card Calculator",
    keyword: "time card calculator",
    description: "Add up hours worked across the week and calculate gross pay.",
    intro: "Enter hours worked each day and an hourly rate to total your weekly hours and gross pay.",
    fields: [
      { id: "mon", label: "Monday", type: "number", unit: "hrs", default: 8, step: 0.25 },
      { id: "tue", label: "Tuesday", type: "number", unit: "hrs", default: 8, step: 0.25 },
      { id: "wed", label: "Wednesday", type: "number", unit: "hrs", default: 8, step: 0.25 },
      { id: "thu", label: "Thursday", type: "number", unit: "hrs", default: 8, step: 0.25 },
      { id: "fri", label: "Friday", type: "number", unit: "hrs", default: 8, step: 0.25 },
      { id: "sat", label: "Saturday", type: "number", unit: "hrs", default: 0, step: 0.25 },
      { id: "sun", label: "Sunday", type: "number", unit: "hrs", default: 0, step: 0.25 },
      { id: "hourlyRate", label: "Hourly rate", type: "number", unit: "$", default: 20, step: 0.25 },
    ],
    compute: (v) => {
      const totalHours = v.mon + v.tue + v.wed + v.thu + v.fri + v.sat + v.sun;
      const grossPay = totalHours * v.hourlyRate;
      return {
        primary: { label: "Total hours", value: `${round(totalHours, 2)} hrs` },
        secondary: [
          { l: "Gross pay", v: `$${round(grossPay, 2).toLocaleString()}` },
          { l: "Average hours/day worked", v: round(totalHours / 7, 2) },
        ],
        note: "This is gross (pre-tax) pay at a flat hourly rate - it doesn't account for overtime premiums, unpaid breaks already excluded from your entered hours, or tax withholding.",
      };
    },
    faq: [
      { q: "How do I calculate total hours from a time card?", a: "Add up the hours worked each day of the pay period. This calculator sums seven daily entries (Monday through Sunday) into a weekly total, then multiplies by your hourly rate for gross pay." },
      { q: "Does this handle clock-in and clock-out times?", a: "No - enter the total decimal hours already worked each day (e.g., 7.5 for 7 hours 30 minutes), not clock-in/clock-out times. If you only have clock times, subtract clock-in from clock-out (accounting for any unpaid break) to get the decimal hours first." },
      { q: "Does this include overtime pay?", a: "No - it multiplies total hours by a single flat hourly rate. If any hours qualify for an overtime premium (commonly 1.5x for hours over 40/week in the US), calculate the regular and overtime portions separately and add them together." },
      { q: "How do I convert minutes to a decimal for a time card?", a: "Divide the minutes by 60. 30 minutes = 0.5 hours, 15 minutes = 0.25 hours, 45 minutes = 0.75 hours - add that decimal to the whole-hour count for each day." },
    ],
    related: ["hourly-to-salary-calculator", "time-duration-calculator", "tip-calculator"],
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
      { q: "Is this a 'time value of money' (TVM) calculator?", a: "Yes - this calculator solves for future value given a starting balance, regular contributions, interest rate, and time frame, which is the core time value of money calculation used in savings and investment planning." },
    ],
    related: ["compound-interest-calculator", "mortgage-calculator", "loan-calculator"],
  },
  {
    id: "tvm-solver",
    category: "finance",
    title: "TVM Solver (PV, FV, PMT)",
    keyword: "tvm solver",
    description: "Solve for present value, future value, or payment in a time value of money problem.",
    intro: "Choose what to solve for, then enter the other known values - rate per period, number of periods, and the known amounts.",
    fields: [
      { id: "solveFor", label: "Solve for", type: "select", default: "fv", options: [
        { v: "fv", l: "Future value (FV)" }, { v: "pv", l: "Present value (PV)" }, { v: "pmt", l: "Payment (PMT)" },
      ] },
      { id: "rate", label: "Rate per period", type: "number", unit: "%", default: 0.5, step: 0.01 },
      { id: "nper", label: "Number of periods", type: "number", default: 60, step: 1, min: 0 },
      { id: "pv", label: "Present value (PV)", type: "number", unit: "$", default: 1000, step: 10 },
      { id: "pmt", label: "Payment per period (PMT)", type: "number", unit: "$", default: -200, step: 10 },
      { id: "fv", label: "Future value (FV)", type: "number", unit: "$", default: 0, step: 10 },
    ],
    compute: (v) => {
      const r = v.rate / 100;
      const n = v.nper;
      const factor = Math.pow(1 + r, n);
      let result, label;
      if (v.solveFor === "fv") {
        result = r === 0 ? -(v.pv + v.pmt * n) : -(v.pv * factor + v.pmt * ((factor - 1) / r));
        label = "Future value (FV)";
      } else if (v.solveFor === "pv") {
        result = r === 0 ? -(v.fv + v.pmt * n) : -(v.fv + v.pmt * ((factor - 1) / r)) / factor;
        label = "Present value (PV)";
      } else {
        result = r === 0 ? -(v.fv + v.pv) / n : -(v.fv + v.pv * factor) * r / (factor - 1);
        label = "Payment (PMT)";
      }
      return {
        primary: { label, value: `$${round(result, 2).toLocaleString()}` },
        secondary: [
          { l: "Rate per period", v: `${v.rate}%` },
          { l: "Number of periods", v: n },
        ],
        note: "Uses standard TVM sign convention (like a financial calculator or spreadsheet): cash you pay out is negative, cash you receive is positive - a negative PMT means you're contributing/paying, a positive result means money coming to you.",
      };
    },
    faq: [
      { q: "What is a TVM (time value of money) solver?", a: "A calculator that solves any one of the core time-value-of-money variables (present value, future value, or payment) given the others, using standard annuity formulas - the same math behind loan payments, savings growth, and annuities." },
      { q: "Why is my payment negative in the example?", a: "This tool uses the standard financial sign convention: money you pay out (like a monthly contribution) is negative, and money you receive is positive. Flip the signs to match your actual scenario - for example, use a positive PMT if you're receiving regular payments instead of making them." },
      { q: "How is this related to the Savings Calculator and Loan Calculator?", a: "Same underlying math - the Savings Calculator solves specifically for future value with a starting balance and contributions, and the Loan Calculator solves specifically for payment on a loan with no future value. This tool generalizes both so you can solve for any of the three." },
      { q: "What rate should I enter?", a: "Enter the rate per period, not the annual rate - if you're compounding monthly and have a 6% annual rate, enter 0.5 (6 ÷ 12) as the rate per period, and set periods in months to match." },
    ],
    related: ["savings-calculator", "loan-calculator", "compound-interest-calculator"],
  },
  {
    id: "irr-npv-calculator",
    category: "finance",
    title: "IRR and NPV Calculator",
    keyword: "irr calculator",
    description: "Calculate net present value (NPV) and internal rate of return (IRR) from a series of cash flows.",
    intro: "Enter a series of cash flows (starting with your initial investment as a negative number) to calculate NPV at your discount rate and the IRR.",
    fields: [
      { id: "cashflows", label: "Cash flows (comma or line separated, period 0 first)", type: "textarea", default: "-1000, 300, 400, 500, 200" },
      { id: "discountRate", label: "Discount rate (for NPV)", type: "number", unit: "%", default: 8, step: 0.1 },
    ],
    compute: (v) => {
      const cashflows = (v.cashflows || "").split(/[,\n]+/).map((s) => s.trim()).filter(Boolean).map(Number).filter((n) => !isNaN(n));
      if (cashflows.length < 2) {
        return { primary: { label: "Need more cash flows", value: "-" }, secondary: [], note: "Enter at least two cash flows, starting with your initial investment (as a negative number)." };
      }
      const npvAt = (rate) => cashflows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0);
      const npv = npvAt(v.discountRate / 100);
      let lo = -0.99, hi = 10;
      const npvLo = npvAt(lo), npvHi = npvAt(hi);
      let irr = null;
      if (npvLo * npvHi <= 0) {
        for (let i = 0; i < 200; i++) {
          const mid = (lo + hi) / 2;
          if (npvAt(mid) > 0) lo = mid; else hi = mid;
        }
        irr = (lo + hi) / 2;
      }
      return {
        primary: { label: "NPV", value: `$${round(npv, 2).toLocaleString()}` },
        secondary: [
          { l: "IRR", v: irr !== null ? `${round(irr * 100, 4)}%` : "No solution found in range" },
          { l: "Number of periods", v: cashflows.length - 1 },
        ],
        note: "NPV = Σ (cash flow at period t) ÷ (1 + rate)^t. IRR is the discount rate where NPV equals exactly zero, found here by numerical search (bisection).",
      };
    },
    faq: [
      { q: "What is NPV?", a: "Net present value - the sum of all cash flows, each discounted back to today's value using your chosen discount rate. A positive NPV means the investment is expected to create value above your required return; negative means it falls short." },
      { q: "What is IRR?", a: "Internal rate of return - the discount rate at which NPV equals exactly zero. It represents the investment's break-even annualized return, useful for comparing investments without needing to pick a discount rate upfront." },
      { q: "How do I enter cash flows correctly?", a: "Start with period 0 - typically your initial investment as a negative number (money going out) - followed by each subsequent period's net cash flow (positive for money coming in). For example: -1000, 300, 400, 500, 200 represents a $1,000 investment followed by four years of returns." },
      { q: "Should I use NPV or IRR to compare investments?", a: "NPV is generally considered more reliable, especially when comparing projects of different sizes or with unconventional cash flow patterns, since NPV directly measures value created in dollar terms. IRR is intuitive as a percentage return but can behave oddly (multiple or no solutions) with cash flows that change sign more than once." },
    ],
    related: ["savings-calculator", "compound-interest-calculator", "tvm-solver"],
  },
  {
    id: "budget-calculator",
    category: "finance",
    title: "Budget Calculator",
    keyword: "budget calculator",
    description: "See where your monthly income goes and how it compares to the 50/30/20 rule.",
    intro: "Enter your monthly take-home income and spending by category to see what's left over and how your budget compares to the 50/30/20 guideline.",
    fields: [
      { id: "income", label: "Monthly income (after tax)", type: "number", unit: "$", default: 4500, step: 50 },
      { id: "housing", label: "Housing", type: "number", unit: "$", default: 1400, step: 10 },
      { id: "transportation", label: "Transportation", type: "number", unit: "$", default: 400, step: 10 },
      { id: "food", label: "Food & groceries", type: "number", unit: "$", default: 500, step: 10 },
      { id: "utilities", label: "Utilities & bills", type: "number", unit: "$", default: 250, step: 10 },
      { id: "debt", label: "Debt payments", type: "number", unit: "$", default: 300, step: 10 },
      { id: "other", label: "Other spending", type: "number", unit: "$", default: 400, step: 10 },
    ],
    compute: (v) => {
      const totalExpenses = v.housing + v.transportation + v.food + v.utilities + v.debt + v.other;
      const leftover = v.income - totalExpenses;
      const savingsRate = v.income > 0 ? round((leftover / v.income) * 100, 1) : 0;
      const need50 = v.income * 0.5;
      const want30 = v.income * 0.3;
      const save20 = v.income * 0.2;
      return {
        primary: { label: leftover >= 0 ? "Left over each month" : "Over budget by", value: `$${round(Math.abs(leftover), 2).toLocaleString()}` },
        secondary: [
          { l: "Total expenses", v: `$${round(totalExpenses, 2).toLocaleString()}` },
          { l: "Savings rate", v: `${savingsRate}%` },
          { l: "50/30/20 needs target", v: `$${round(need50, 0).toLocaleString()}` },
          { l: "50/30/20 wants target", v: `$${round(want30, 0).toLocaleString()}` },
          { l: "50/30/20 savings target", v: `$${round(save20, 0).toLocaleString()}` },
        ],
        note: "The 50/30/20 targets are a common budgeting guideline (50% needs, 30% wants, 20% savings/debt payoff), not a rule - useful as a reference point, not a strict requirement.",
      };
    },
    faq: [
      { q: "What is the 50/30/20 budgeting rule?", a: "A guideline that splits after-tax income into roughly 50% needs (housing, food, utilities), 30% wants (discretionary spending), and 20% savings or extra debt payoff - popularized as a simple starting framework, not a strict formula." },
      { q: "What counts as a 'need' versus a 'want'?", a: "Needs are costs you can't avoid without real hardship - rent/mortgage, groceries, utilities, minimum debt payments. Wants are discretionary - dining out, entertainment, subscriptions. The line isn't always sharp, but the split is meant to be a rough guide, not an exact accounting standard." },
      { q: "What if my expenses add up to more than my income?", a: "The calculator shows you're over budget by the shortfall amount - that's a signal to either reduce spending in a category, find additional income, or both, before it compounds into debt." },
      { q: "Should my income here be gross or after-tax?", a: "Use after-tax (take-home) income - it reflects money actually available to spend or save, which is what a monthly budget is built around." },
    ],
    related: ["savings-calculator", "hourly-to-salary-calculator", "loan-calculator"],
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
    id: "apr-to-apy-calculator",
    category: "finance",
    title: "APR to APY (EAR) Calculator",
    keyword: "apr to apy calculator",
    description: "Convert a nominal interest rate (APR) into its effective annual rate (APY/EAR), accounting for compounding.",
    intro: "Enter a nominal annual rate and how often it compounds to calculate the effective annual rate (APY/EAR).",
    fields: [
      { id: "apr", label: "Nominal annual rate (APR)", type: "number", unit: "%", default: 6, step: 0.01 },
      { id: "compoundsPerYear", label: "Compounding periods per year", type: "number", default: 12, step: 1, min: 1 },
    ],
    compute: (v) => {
      const r = v.apr / 100;
      const n = v.compoundsPerYear;
      const apy = Math.pow(1 + r / n, n) - 1;
      return {
        primary: { label: "Effective annual rate (APY/EAR)", value: `${round(apy * 100, 4)}%` },
        secondary: [{ l: "Difference from APR", v: `${round((apy * 100 - v.apr), 4)} percentage points` }],
        note: "APY = (1 + APR/n)ⁿ − 1, where n is the number of compounding periods per year. More frequent compounding produces a higher effective rate for the same nominal APR.",
      };
    },
    faq: [
      { q: "What's the difference between APR and APY?", a: "APR (annual percentage rate) is the stated nominal rate, without accounting for compounding within the year. APY (annual percentage yield, also called EAR) is the actual rate you earn or pay once compounding is factored in - APY is always equal to or higher than APR when compounding happens more than once a year." },
      { q: "What is 6% APR compounded monthly, as APY?", a: "About 6.1678% - (1 + 0.06/12)¹² − 1 ≈ 0.061678." },
      { q: "Why does more frequent compounding increase the effective rate?", a: "Each compounding period adds interest on top of previously earned interest, so compounding more often (monthly vs. annually, for example) lets that \"interest on interest\" effect compound more times per year, producing a higher effective annual return even though the nominal APR is unchanged." },
      { q: "Which rate should I use to compare two loans or savings accounts?", a: "APY/EAR - it accounts for compounding frequency, so it's the only rate that lets you fairly compare two products with different compounding schedules (like monthly vs. daily) on equal terms." },
    ],
    related: ["compound-interest-calculator", "savings-calculator", "loan-calculator"],
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
    id: "price-calculator",
    category: "finance",
    title: "Price Calculator",
    keyword: "price calculator",
    description: "Calculate a selling price from your cost and target profit margin.",
    intro: "Enter your cost and target profit margin to calculate the selling price, profit, and equivalent markup.",
    fields: [
      { id: "cost", label: "Cost", type: "number", unit: "$", default: 50, step: 0.01 },
      { id: "marginPercent", label: "Target profit margin", type: "number", unit: "%", default: 30, step: 1, max: 99.9 },
    ],
    compute: (v) => {
      const margin = Math.min(99.9, Math.max(0, v.marginPercent));
      const price = v.cost / (1 - margin / 100);
      const profit = price - v.cost;
      const markup = v.cost > 0 ? (profit / v.cost) * 100 : 0;
      return {
        primary: { label: "Selling price", value: `$${round(price, 2)}` },
        secondary: [
          { l: "Profit", v: `$${round(profit, 2)}` },
          { l: "Equivalent markup", v: `${round(markup, 1)}%` },
        ],
        note: "Margin is profit as a percentage of the selling price; markup is profit as a percentage of cost. The two describe the same profit differently and are never the same number (except at 0%).",
      };
    },
    faq: [
      { q: "What's the difference between margin and markup?", a: "Margin is profit divided by the selling price; markup is profit divided by cost - the same dollar amount of profit produces two different percentages depending on which base you divide by. A 30% margin corresponds to about a 42.9% markup." },
      { q: "How do I calculate a selling price from cost and margin?", a: "Divide cost by (1 - margin as a decimal). A $50 cost at a 30% target margin: $50 ÷ (1 - 0.30) = $50 ÷ 0.70 = $71.43." },
      { q: "Why can't margin be 100% or more?", a: "Margin is profit as a percentage of the selling price, and profit can never exceed the selling price itself (that would mean the cost was negative) - so margin approaches but never reaches 100%, no matter how low the cost is relative to price." },
      { q: "Is this the same as the Discount Calculator?", a: "No - the Discount Calculator works backward from a sale price and discount percentage to find savings. This tool works forward from your cost and a target profit margin to find what price to charge." },
    ],
    related: ["discount-calculator", "sales-tax-calculator", "percentage-calculator"],
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
    id: "dti-ratio-calculator",
    category: "finance",
    title: "Debt-to-Income (DTI) Ratio Calculator",
    keyword: "dti ratio calculator",
    description: "Calculate your debt-to-income ratio from monthly debt payments and gross monthly income.",
    intro: "Enter your total monthly debt payments and gross monthly income to calculate your debt-to-income (DTI) ratio.",
    fields: [
      { id: "monthlyDebt", label: "Total monthly debt payments", type: "number", unit: "$", default: 1800, step: 10 },
      { id: "monthlyIncome", label: "Gross monthly income", type: "number", unit: "$", default: 6000, step: 10 },
    ],
    compute: (v) => {
      const dti = v.monthlyIncome === 0 ? 0 : (v.monthlyDebt / v.monthlyIncome) * 100;
      let category = "High";
      if (dti <= 36) category = "Generally favorable";
      else if (dti <= 43) category = "Moderate";
      return {
        primary: { label: "DTI ratio", value: `${round(dti, 1)}%` },
        secondary: [
          { l: "General range", v: category },
          { l: "Income remaining after debt", v: `$${round(v.monthlyIncome - v.monthlyDebt, 2).toLocaleString()}` },
        ],
        note: "Lender thresholds vary by loan type and program - many conventional mortgage guidelines look for 36-43% or below, but this varies. Check your specific lender's requirements rather than treating these ranges as a hard rule.",
      };
    },
    faq: [
      { q: "How is debt-to-income (DTI) ratio calculated?", a: "Divide your total monthly debt payments (loans, credit cards, etc.) by your gross (pre-tax) monthly income, then multiply by 100. $1,800 in monthly debt on $6,000 gross monthly income gives a DTI of 30%." },
      { q: "What counts as 'debt' in a DTI calculation?", a: "Recurring debt obligations like mortgage or rent, car loans, student loans, minimum credit card payments, and other loan payments - it does not include everyday living expenses like groceries, utilities, or insurance, which aren't counted as \"debt\" for DTI purposes." },
      { q: "What's a good DTI ratio?", a: "Many conventional mortgage lenders look favorably on a DTI of 36% or below, with some programs allowing up to 43-50% depending on other factors - but exact thresholds vary significantly by loan type and lender, so this is a general reference, not a guarantee of approval." },
    ],
    related: ["debt-payoff-calculator", "mortgage-calculator", "loan-calculator"],
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
  {
    id: "bond-duration-calculator",
    category: "finance",
    title: "Bond Duration Calculator",
    keyword: "bond duration calculator",
    description: "Calculate a bond's price, Macaulay duration, modified duration, DV01, and convexity.",
    intro: "Enter a bond's face value, coupon rate, yield to maturity, term, and payment frequency to calculate its price and interest-rate risk measures.",
    fields: [
      { id: "faceValue", label: "Face value", type: "number", unit: "$", default: 1000, step: 10 },
      { id: "couponRate", label: "Annual coupon rate", type: "number", unit: "%", default: 5, step: 0.01 },
      { id: "ytm", label: "Yield to maturity", type: "number", unit: "%", default: 6, step: 0.01 },
      { id: "years", label: "Years to maturity", type: "number", unit: "years", default: 5, step: 0.5 },
      { id: "freq", label: "Payments per year", type: "number", default: 2, step: 1, min: 1 },
    ],
    compute: (v) => {
      const n = Math.round(v.years * v.freq);
      const couponPerPeriod = (v.faceValue * v.couponRate) / 100 / v.freq;
      const yPerPeriod = v.ytm / 100 / v.freq;
      let price = 0, weightedTime = 0, convexitySum = 0;
      for (let t = 1; t <= n; t++) {
        const cf = couponPerPeriod + (t === n ? v.faceValue : 0);
        const pv = cf / Math.pow(1 + yPerPeriod, t);
        price += pv;
        weightedTime += t * pv;
        convexitySum += pv * t * (t + 1);
      }
      const macaulay = weightedTime / price / v.freq;
      const modified = macaulay / (1 + yPerPeriod);
      const dv01 = modified * price * 0.0001;
      const convexity = convexitySum / (price * Math.pow(1 + yPerPeriod, 2)) / (v.freq * v.freq);
      return {
        primary: { label: "Bond price", value: `$${round(price, 2).toLocaleString()}` },
        secondary: [
          { l: "Macaulay duration", v: `${round(macaulay, 4)} years` },
          { l: "Modified duration", v: `${round(modified, 4)} years` },
          { l: "DV01 (price change per 0.01%)", v: `$${round(dv01, 4)}` },
          { l: "Convexity", v: round(convexity, 4) },
        ],
        note: "Macaulay duration is the weighted-average time to receive cash flows; modified duration estimates the % price change for a 1% yield change; DV01 is the dollar price change for a 0.01% (1 basis point) yield change. Assumes a flat yield curve and no default risk.",
      };
    },
    faq: [
      { q: "What is Macaulay duration?", a: "The weighted-average time (in years) until a bond's cash flows are received, where each cash flow's weight is its present value's share of the total price - it's a measure of how long, on average, your money is tied up." },
      { q: "What is modified duration used for?", a: "Estimating a bond's price sensitivity to interest rate changes - a modified duration of 4.3 means the price changes by approximately 4.3% for each 1 percentage point change in yield (in the opposite direction)." },
      { q: "What is DV01?", a: "\"Dollar value of 01\" - the actual dollar price change for a 1 basis point (0.01%) move in yield. It's the same concept as modified duration, just expressed in dollars for a specific price and a specific tiny yield move, rather than as a percentage." },
      { q: "What is convexity, and why does it matter alongside duration?", a: "Convexity measures how much duration itself changes as yields change - duration alone is a straight-line (linear) approximation of price sensitivity, and convexity corrects for the fact that bond price/yield relationships actually curve, improving accuracy for larger yield changes." },
      { q: "Why does a longer-maturity, lower-coupon bond have higher duration?", a: "Duration weights each cash flow by how far in the future it arrives - a lower coupon means more of the bond's value comes from the single face-value payment at maturity (rather than spread across earlier coupons), and a longer maturity pushes that payment further out, both of which increase the average weighted time." },
    ],
    related: ["savings-calculator", "loan-calculator", "compound-interest-calculator"],
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
      { q: "Is this the same as a concrete estimator, or 'figuring concrete' by hand?", a: "Yes - a concrete estimator is another name for this same tool. \"Figuring concrete\" by hand means doing the length × width × thickness ÷ 27 math yourself to get cubic yards; this calculator does that math for you and adds a waste allowance automatically." },
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
      { q: "Is a 'paint coverage estimator' the same as this tool?", a: "Yes - enter your wall area, number of coats, and coverage rate per gallon above to get the same estimate." },
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
    id: "ac-btu-calculator",
    category: "construction",
    title: "Air Conditioner Size Calculator (BTU)",
    keyword: "air conditioner size calculator",
    description: "Estimate the BTU/h cooling capacity needed for a room, based on its size and conditions.",
    intro: "Enter your room's square footage and conditions to estimate the air conditioner size (BTU/h) you need.",
    fields: [
      { id: "sqft", label: "Room area", type: "number", unit: "sq ft", default: 300, step: 10 },
      { id: "sunExposure", label: "Sun exposure", type: "select", default: "average", options: [
        { v: "shaded", l: "Heavily shaded" }, { v: "average", l: "Average" }, { v: "sunny", l: "Very sunny" },
      ] },
      { id: "occupants", label: "Typical occupants", type: "number", default: 2, step: 1, min: 1 },
      { id: "kitchen", label: "Is it a kitchen?", type: "select", default: "no", options: [
        { v: "no", l: "No" }, { v: "yes", l: "Yes" },
      ] },
    ],
    compute: (v) => {
      let btu = v.sqft * 20;
      if (v.sunExposure === "shaded") btu *= 0.9;
      if (v.sunExposure === "sunny") btu *= 1.1;
      if (v.occupants > 2) btu += (v.occupants - 2) * 600;
      if (v.kitchen === "yes") btu += 4000;
      return {
        primary: { label: "Recommended capacity", value: `${round(btu, 0).toLocaleString()} BTU/h` },
        secondary: [{ l: "In tons (÷12,000)", v: round(btu / 12000, 2) }],
        note: "Based on the standard rule of thumb of 20 BTU/h per square foot, adjusted for sun exposure, extra occupants (600 BTU each beyond 2), and kitchens (+4,000 BTU for cooking heat). This is a general estimate - ceiling height, insulation quality, and climate also affect the ideal size.",
      };
    },
    faq: [
      { q: "How many BTUs do I need for a 300 sq ft room?", a: "About 6,000 BTU/h as a baseline (300 × 20), adjusted up or down for sun exposure, extra occupants, or if it's a kitchen." },
      { q: "Why does sun exposure matter for AC sizing?", a: "Rooms with lots of direct sunlight gain significant extra heat through windows, requiring more cooling capacity than a shaded room of the same size - conversely, a heavily shaded room needs somewhat less." },
      { q: "Why do kitchens need extra cooling capacity?", a: "Cooking appliances (stoves, ovens) generate substantial extra heat beyond what's typical for a room that size, so kitchens typically need roughly 4,000 additional BTU/h compared to a similarly sized non-kitchen room." },
      { q: "What happens if I oversize my air conditioner?", a: "An oversized unit cools the room quickly but shuts off before properly removing humidity, leading to a cold but clammy feeling and more frequent on/off cycling that wears out the compressor faster - right-sizing (not just maximizing capacity) matters for comfort and equipment life." },
    ],
    related: ["insulation-calculator", "drywall-calculator", "concrete-calculator"],
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
    id: "height-percentile-calculator",
    category: "health",
    title: "Height Percentile Calculator",
    keyword: "height percentile calculator",
    description: "Estimate what percentile a height falls into among US adults of the same gender.",
    intro: "Enter a height and gender to estimate the percentile rank among US adults of the same gender.",
    fields: [
      { id: "feet", label: "Feet", type: "number", default: 5, step: 1, min: 0 },
      { id: "inches", label: "Inches", type: "number", default: 9, step: 0.1, min: 0, max: 11.9 },
      { id: "gender", label: "Gender", type: "select", default: "male", options: [{ v: "male", l: "Male" }, { v: "female", l: "Female" }] },
    ],
    compute: (v) => {
      // Approximate US adult height distribution (commonly cited CDC/NHANES-
      // based figures) - a general reference, not a precise clinical or
      // region-specific dataset.
      const stats = { male: { mean: 69.1, sd: 3.0 }, female: { mean: 63.7, sd: 2.7 } };
      const { mean, sd } = stats[v.gender];
      const totalInches = v.feet * 12 + v.inches;
      const z = (totalInches - mean) / sd;
      function normalCdf(x) {
        const sign = x < 0 ? -1 : 1;
        const ax = Math.abs(x) / Math.sqrt(2);
        const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
        const t = 1 / (1 + p * ax);
        const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-ax * ax);
        return 0.5 * (1 + sign * y);
      }
      const percentile = normalCdf(z) * 100;
      return {
        primary: { label: "Percentile", value: `${round(percentile, 1)}th` },
        secondary: [
          { l: "Height", v: `${totalInches.toFixed(1)} in (${(totalInches * 2.54).toFixed(1)} cm)` },
          { l: "Z-score", v: round(z, 2) },
        ],
        note: `Estimated against a US adult ${v.gender} average of about ${mean.toFixed(1)} in with a standard deviation of ${sd.toFixed(1)} in - a general population approximation, not a precise or region-specific measurement.`,
      };
    },
    faq: [
      { q: "How is height percentile calculated?", a: "Convert height to a z-score using an average and standard deviation for the population (height − mean) ÷ SD, then convert that z-score to a percentile using the normal distribution - the same method used for other percentile calculations like test scores." },
      { q: "How tall is 5'9\" compared to other people?", a: "For a US adult male, 5'9\" (69 inches) is almost exactly average, landing around the 50th percentile, since the average US male adult height is very close to 5'9\". For a US adult female, 5'9\" is well above average, in roughly the 96-97th percentile." },
      { q: "How tall is 5'8\" compared to other people?", a: "For a US adult male, 5'8\" is slightly below average, around the 36th percentile. For a US adult female, 5'8\" is well above average, around the 94th percentile - a good example of how the same height ranks very differently depending on which population it's compared against." },
      { q: "How tall is 165 cm compared to other people?", a: "165 cm is about 5'5\" (5 feet 4.96 inches). For a US adult male, that's quite short, around the 8th percentile. For a US adult female, it's close to average, around the 68th percentile. Enter 5 feet and 4.96 inches above to confirm." },
      { q: "How tall is 183 cm compared to other people?", a: "183 cm is about 6'0\" (6 feet 0.05 inches). For a US adult male, that's well above average, around the 84th percentile. For a US adult female, it's extremely tall, in roughly the 99.9th percentile." },
      { q: "How accurate are these percentile estimates?", a: "They're based on commonly cited average height and standard deviation figures for the general US adult population, not an exact or up-to-date clinical dataset - actual percentiles vary somewhat by country, age group, and measurement methodology, so treat this as a general estimate rather than a precise clinical percentile." },
    ],
    related: ["bmi-calculator", "ideal-weight-calculator", "unit-length-converter"],
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
    id: "body-surface-area-calculator",
    category: "health",
    title: "Body Surface Area Calculator",
    keyword: "body surface area calculator",
    description: "Calculate body surface area (BSA) from height and weight using the Mosteller formula.",
    intro: "Enter height and weight to calculate body surface area (BSA), commonly used for medication dosing.",
    fields: [
      { id: "heightCm", label: "Height", type: "number", unit: "cm", default: 170, step: 0.1, min: 1 },
      { id: "weightKg", label: "Weight", type: "number", unit: "kg", default: 70, step: 0.1, min: 1 },
    ],
    compute: (v) => {
      const bsa = Math.sqrt((v.heightCm * v.weightKg) / 3600);
      const bsaSqFt = bsa * 10.7639;
      return {
        primary: { label: "Body surface area", value: `${round(bsa, 4)} m²` },
        secondary: [{ l: "In square feet", v: round(bsaSqFt, 4) }],
        note: "Uses the Mosteller formula: BSA = √((height in cm × weight in kg) ÷ 3600). This is a general reference figure - actual medication dosing should always follow a clinician's guidance, not a self-calculated value.",
      };
    },
    faq: [
      { q: "What is body surface area (BSA) used for?", a: "Primarily for dosing certain medications (especially chemotherapy drugs) more precisely than weight alone, since some drug effects correlate better with total body surface area than with body mass." },
      { q: "What is the Mosteller formula?", a: "BSA = √((height in cm × weight in kg) ÷ 3600) - a simple, widely used formula that closely approximates the more complex DuBois formula while being much easier to calculate by hand." },
      { q: "What is a typical BSA for an adult?", a: "About 1.5 to 2.0 m² for most adults, though it varies with height and weight - a person of average height (170cm) and weight (70kg) has a BSA of roughly 1.81 m² by the Mosteller formula." },
      { q: "Should I use this to calculate my own medication dose?", a: "No - this is a general reference calculation. Medication dosing based on BSA should always be determined and verified by a qualified healthcare provider, since dosing also depends on the specific drug, your medical history, and other clinical factors this calculator doesn't account for." },
    ],
    related: ["bmi-calculator", "bmr-calculator", "ideal-weight-calculator"],
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
      { q: "Is a 'weight and water calculator' the same as this tool?", a: "Yes - this calculator estimates your daily water intake target based on your body weight (plus activity level), which is exactly what that phrase describes." },
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
    id: "bra-size-calculator",
    category: "health",
    title: "Bra Size Calculator",
    keyword: "bra size calculator",
    description: "Calculate your bra band and cup size from your underbust and bust measurements.",
    intro: "Enter your underbust (band) and bust measurements in inches to estimate your US bra size.",
    fields: [
      { id: "underbust", label: "Underbust measurement", type: "number", unit: "in", default: 32, step: 0.25, min: 20, max: 60 },
      { id: "bust", label: "Bust measurement", type: "number", unit: "in", default: 36, step: 0.25, min: 20, max: 70 },
    ],
    compute: (v) => {
      const bandRounded = Math.round(v.underbust);
      const bandSize = bandRounded % 2 === 0 ? bandRounded + 4 : bandRounded + 5;
      const diff = v.bust - v.underbust;
      const cupLetters = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H", "I", "J"];
      const cupIndex = Math.max(0, Math.min(Math.round(diff), cupLetters.length - 1));
      const cup = cupLetters[cupIndex];
      return {
        primary: { label: "Estimated size", value: `${bandSize}${cup}` },
        secondary: [
          { l: "Band size", v: bandSize },
          { l: "Cup size", v: cup },
          { l: "Bust-band difference", v: `${round(diff, 2)} in` },
        ],
        note: "Uses a common US sizing method: band size rounds your underbust to the nearest even number, adding 4 (if even) or 5 (if odd); cup size is based on the difference between bust and underbust (1 inch per cup letter, starting at AA). Sizing conventions vary between brands and regions, so treat this as a starting point, not a guarantee of fit.",
      };
    },
    faq: [
      { q: "How do I measure for a bra size?", a: "Underbust: wrap a tape measure snugly around your ribcage, directly under your bust, keeping it level and not too tight. Bust: wrap the tape around the fullest part of your bust, without compressing it, while wearing a well-fitting (non-padded) bra." },
      { q: "How is cup size calculated?", a: "By the difference between your bust and underbust measurements - each full inch of difference corresponds to one cup letter, starting at AA for less than 1 inch, A for 1 inch, B for 2 inches, and so on." },
      { q: "Why do bra sizes vary so much between brands?", a: "There's no single universal sizing standard - brands use different measuring conventions, cut patterns, and fit philosophies, so the same calculated size can fit differently across brands. Use this calculator as a starting point and expect to fine-tune with try-ons." },
      { q: "What if my calculated size doesn't fit well?", a: "This formula is a widely used estimate, not a substitute for professional fitting - if the band feels loose or the cups gap or spill over, try adjacent sizes (a smaller band with a larger cup, or vice versa, often fits similarly) or get measured in person." },
    ],
    related: ["bmi-calculator", "body-fat-calculator", "unit-length-converter"],
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
  {
    id: "steps-to-miles-calculator",
    category: "health",
    title: "Steps to Miles Calculator",
    keyword: "steps to miles calculator",
    description: "Convert a step count into distance walked, based on your stride length.",
    intro: "Enter a step count and your stride length (or use the average default) to convert steps into miles and kilometers.",
    fields: [
      { id: "steps", label: "Steps", type: "number", default: 10000, step: 100 },
      { id: "strideFeet", label: "Stride length", type: "number", unit: "feet", default: 2.5, step: 0.1 },
    ],
    compute: (v) => {
      const totalFeet = v.steps * v.strideFeet;
      const miles = totalFeet / 5280;
      const km = (totalFeet * 0.3048) / 1000;
      return {
        primary: { label: "Distance", value: `${round(miles, 2)} miles` },
        secondary: [
          { l: "Kilometers", v: round(km, 2) },
          { l: "Total feet", v: Math.round(totalFeet).toLocaleString() },
        ],
        note: "Stride length varies by height and walking speed - 2.5 feet is a commonly used average for adults, but measuring your own gives a more accurate result.",
      };
    },
    faq: [
      { q: "How many miles is 10,000 steps?", a: "About 4.7-5 miles at an average stride length of 2.5 feet (10,000 × 2.5 ÷ 5,280 ≈ 4.73 miles) - this is why \"10,000 steps ≈ 5 miles\" is a commonly cited rule of thumb, though your actual distance depends on your stride length." },
      { q: "How do I measure my own stride length?", a: "Walk a known distance (like 100 feet) counting your steps, then divide the distance by the step count - or use your height as a rough estimate: stride length is typically about 0.4-0.45 times your height in inches, converted to feet." },
      { q: "Does stride length differ between walking and running?", a: "Yes - running strides are typically longer than walking strides for the same person, since running involves a greater push-off and airborne phase. Use a shorter stride estimate for walking-based step counts and adjust upward if you're converting running steps." },
      { q: "How do I calculate miles into steps, the reverse direction?", a: "Divide the distance in feet by your stride length: miles × 5,280 ÷ stride length in feet. At the default 2.5 ft stride, 1 mile (5,280 ft) works out to about 2,112 steps - this calculator's fields go steps-to-miles, so just solve that same formula backward for a target distance." },
      { q: "Is a 'steps and distance calculator' the same as this tool?", a: "Yes - that's exactly what this calculator does, converting a step count into a walking distance based on stride length." },
    ],
    related: ["pace-calculator", "unit-length-converter", "calorie-calculator"],
  },
  {
    id: "speed-distance-time-calculator",
    category: "math",
    title: "Speed, Distance & Time Calculator",
    keyword: "speed distance time calculator",
    description: "Solve for speed, distance, or time using speed = distance / time - enter any two to find the third.",
    intro: "Choose which value to solve for, then enter the other two - speed, distance, and time are all connected by speed = distance / time.",
    fields: [
      { id: "solveFor", label: "Solve for", type: "select", default: "speed", options: [
        { v: "speed", l: "Speed" }, { v: "distance", l: "Distance" }, { v: "time", l: "Time" },
      ] },
      { id: "distance", label: "Distance", type: "number", default: 120, step: 0.1 },
      { id: "time", label: "Time", type: "number", unit: "hours", default: 2, step: 0.1 },
      { id: "speed", label: "Speed", type: "number", unit: "per hour", default: 60, step: 0.1 },
    ],
    compute: (v) => {
      if (v.solveFor === "speed") {
        if (v.time === 0) return { primary: { label: "Speed", value: "Undefined" }, secondary: [], note: "Time can't be zero." };
        const speed = v.distance / v.time;
        return {
          primary: { label: "Speed", value: round(speed, 4) },
          secondary: [{ l: "Distance", v: v.distance }, { l: "Time", v: `${v.time} hours` }],
          note: `speed = distance ÷ time = ${v.distance} ÷ ${v.time} = ${round(speed, 4)}`,
        };
      } else if (v.solveFor === "distance") {
        const distance = v.speed * v.time;
        return {
          primary: { label: "Distance", value: round(distance, 4) },
          secondary: [{ l: "Speed", v: v.speed }, { l: "Time", v: `${v.time} hours` }],
          note: `distance = speed × time = ${v.speed} × ${v.time} = ${round(distance, 4)}`,
        };
      } else {
        if (v.speed === 0) return { primary: { label: "Time", value: "Undefined" }, secondary: [], note: "Speed can't be zero." };
        const time = v.distance / v.speed;
        return {
          primary: { label: "Time", value: `${round(time, 4)} hours` },
          secondary: [{ l: "Distance", v: v.distance }, { l: "Speed", v: v.speed }],
          note: `time = distance ÷ speed = ${v.distance} ÷ ${v.speed} = ${round(time, 4)} hours`,
        };
      }
    },
    faq: [
      { q: "What's the formula connecting speed, distance, and time?", a: "Speed = distance ÷ time. Rearranged, distance = speed × time, and time = distance ÷ speed - all three formulas describe the same relationship, just solved for a different variable." },
      { q: "How do I calculate speed if I know distance and time?", a: "Divide distance by time. A trip covering 120 miles in 2 hours averages 120 ÷ 2 = 60 mph." },
      { q: "Do the units need to match, like miles and hours?", a: "Yes - this calculator doesn't convert units, so make sure distance and speed use the same unit (both miles or both km) and time is in hours to get a correctly-scaled result. Use the unit length converter first if your distance is in a different unit than your speed." },
      { q: "Is 'speed distance time converter,' 'time calculator for speed and distance,' and 'distance calculator from speed and time' all the same as this tool?", a: "Yes - every one of these phrasings describes the same three-way relationship (speed = distance ÷ time), just naming a different variable first. Choose what you're solving for above and enter the other two values." },
    ],
    related: ["pace-calculator", "unit-length-converter", "fuel-economy-converter"],
  },
  {
    id: "projectile-motion-calculator",
    category: "math",
    title: "Projectile Motion Calculator",
    keyword: "projectile motion calculator",
    description: "Calculate the flight time, maximum height, and range of a projectile launched at an angle.",
    intro: "Enter the launch speed and angle to calculate flight time, maximum height, and horizontal range, ignoring air resistance.",
    fields: [
      { id: "velocity", label: "Launch velocity", type: "number", unit: "m/s", default: 20, step: 0.1 },
      { id: "angle", label: "Launch angle", type: "number", unit: "degrees", default: 45, step: 0.1, min: 0, max: 90 },
      { id: "gravity", label: "Gravity", type: "number", unit: "m/s²", default: 9.81, step: 0.01 },
    ],
    compute: (v) => {
      const angleRad = v.angle * (Math.PI / 180);
      const vx = v.velocity * Math.cos(angleRad);
      const vy = v.velocity * Math.sin(angleRad);
      const flightTime = (2 * vy) / v.gravity;
      const maxHeight = (vy * vy) / (2 * v.gravity);
      const range = vx * flightTime;
      return {
        primary: { label: "Range", value: `${round(range, 3)} m` },
        secondary: [
          { l: "Flight time", v: `${round(flightTime, 3)} s` },
          { l: "Maximum height", v: `${round(maxHeight, 3)} m` },
        ],
        note: "Ignores air resistance. Range = (vₓ × flight time). Flight time = 2×v_y÷g. Max height = v_y²÷(2g), where vₓ and v_y are the horizontal and vertical components of launch velocity.",
      };
    },
    faq: [
      { q: "What angle gives the maximum range?", a: "45° - for a given launch speed on flat ground with no air resistance, 45° splits the velocity evenly between horizontal and vertical components in a way that maximizes horizontal distance. Any other angle (holding speed and ground level fixed) produces a shorter range." },
      { q: "What is the range of a projectile launched at 20 m/s at 45°?", a: "About 40.77 m - vₓ = vy = 20×cos(45°) = 20×sin(45°) ≈ 14.14 m/s, flight time = 2×14.14÷9.81 ≈ 2.88 s, range = 14.14×2.88 ≈ 40.77 m." },
      { q: "Why do 30° and 60° give the same range?", a: "Complementary launch angles (angles that add up to 90°) always produce the same range on flat ground, because the range formula depends on sin(2×angle), and sin(2×30°) = sin(60°) equals sin(2×60°) = sin(120°) - both are the same value." },
      { q: "Does this account for air resistance?", a: "No - this uses ideal projectile motion (only gravity acting on the object), which is accurate for dense, compact objects moving at moderate speeds over short distances, but increasingly diverges from reality for light or fast-moving objects where air drag matters." },
    ],
    related: ["pythagorean-theorem-calculator", "speed-distance-time-calculator", "vector-calculator"],
  },
  {
    id: "collision-calculator",
    category: "math",
    title: "Momentum and Collision Calculator",
    keyword: "collision calculator",
    description: "Calculate final velocities for an elastic or perfectly inelastic collision between two objects.",
    intro: "Enter the mass and velocity of two objects to calculate their velocities after an elastic or perfectly inelastic collision.",
    fields: [
      { id: "collisionType", label: "Collision type", type: "select", default: "elastic", options: [
        { v: "elastic", l: "Elastic (bounces apart, energy conserved)" }, { v: "inelastic", l: "Perfectly inelastic (objects stick together)" },
      ] },
      { id: "m1", label: "Mass 1", type: "number", unit: "kg", default: 2, step: 0.1, min: 0.001 },
      { id: "v1", label: "Velocity 1 (before)", type: "number", unit: "m/s", default: 5, step: 0.1 },
      { id: "m2", label: "Mass 2", type: "number", unit: "kg", default: 3, step: 0.1, min: 0.001 },
      { id: "v2", label: "Velocity 2 (before)", type: "number", unit: "m/s", default: -2, step: 0.1 },
    ],
    compute: (v) => {
      const totalMomentumBefore = v.m1 * v.v1 + v.m2 * v.v2;
      if (v.collisionType === "elastic") {
        const v1f = ((v.m1 - v.m2) * v.v1 + 2 * v.m2 * v.v2) / (v.m1 + v.m2);
        const v2f = ((v.m2 - v.m1) * v.v2 + 2 * v.m1 * v.v1) / (v.m1 + v.m2);
        return {
          primary: { label: "Velocity 1 (after)", value: `${round(v1f, 4)} m/s` },
          secondary: [
            { l: "Velocity 2 (after)", v: `${round(v2f, 4)} m/s` },
            { l: "Momentum before/after", v: `${round(totalMomentumBefore, 4)} kg·m/s` },
          ],
          note: "Elastic collision: both momentum and kinetic energy are conserved. v1f = ((m1−m2)v1 + 2m2v2)/(m1+m2), and v2f is the mirror formula.",
        };
      }
      const vFinal = totalMomentumBefore / (v.m1 + v.m2);
      const keBefore = 0.5 * v.m1 * v.v1 * v.v1 + 0.5 * v.m2 * v.v2 * v.v2;
      const keAfter = 0.5 * (v.m1 + v.m2) * vFinal * vFinal;
      return {
        primary: { label: "Combined velocity (after)", value: `${round(vFinal, 4)} m/s` },
        secondary: [
          { l: "Kinetic energy lost", v: `${round(keBefore - keAfter, 4)} J` },
          { l: "Momentum before/after", v: `${round(totalMomentumBefore, 4)} kg·m/s` },
        ],
        note: "Perfectly inelastic collision: the objects stick together and move with one shared velocity. Momentum is conserved, but kinetic energy is not (some converts to heat, sound, and deformation).",
      };
    },
    faq: [
      { q: "What's the difference between elastic and inelastic collisions?", a: "In an elastic collision, both momentum and kinetic energy are conserved (objects bounce apart cleanly). In a perfectly inelastic collision, momentum is conserved but kinetic energy is not - the objects stick together and move as one, with some energy lost to heat, sound, or deformation." },
      { q: "How do I calculate velocities after an elastic collision?", a: "v1f = ((m1−m2)×v1 + 2×m2×v2) / (m1+m2), and v2f = ((m2−m1)×v2 + 2×m1×v1) / (m1+m2) - these formulas come from solving the conservation of momentum and conservation of kinetic energy equations together." },
      { q: "Why is momentum always conserved, even in inelastic collisions?", a: "Momentum conservation comes directly from Newton's third law (equal and opposite forces during the collision) and doesn't require energy to be conserved - it holds for any collision as long as no external forces act on the system." },
      { q: "What happens to the 'lost' kinetic energy in an inelastic collision?", a: "It converts to other forms of energy - heat from friction and deformation, sound from the impact, and permanent structural deformation of the colliding objects - rather than disappearing, consistent with the overall conservation of energy." },
    ],
    related: ["projectile-motion-calculator", "vector-calculator", "speed-distance-time-calculator"],
  },
  {
    id: "ohms-law-calculator",
    category: "math",
    title: "Ohm's Law Calculator",
    keyword: "ohms law calculator",
    description: "Calculate voltage, current, resistance, or power - enter any two to find the other two.",
    intro: "Enter any two of voltage, current, and resistance to calculate the other two, plus power.",
    fields: [
      { id: "voltage", label: "Voltage (V, leave 0 to solve for it)", type: "number", unit: "volts", default: 0, step: 0.01 },
      { id: "current", label: "Current (I, leave 0 to solve for it)", type: "number", unit: "amps", default: 2, step: 0.01 },
      { id: "resistance", label: "Resistance (R, leave 0 to solve for it)", type: "number", unit: "ohms", default: 10, step: 0.01 },
    ],
    compute: (v) => {
      const known = [v.voltage > 0, v.current > 0, v.resistance > 0].filter(Boolean).length;
      if (known < 2) {
        return { primary: { label: "Need two values", value: "-" }, secondary: [], note: "Enter any two of voltage, current, and resistance (leave the third at 0) to solve for the rest." };
      }
      let V = v.voltage, I = v.current, R = v.resistance;
      if (V === 0) V = I * R;
      else if (I === 0) I = V / R;
      else if (R === 0) R = V / I;
      const P = V * I;
      return {
        primary: { label: "Voltage", value: `${round(V, 4)} V` },
        secondary: [
          { l: "Current", v: `${round(I, 4)} A` },
          { l: "Resistance", v: `${round(R, 4)} Ω` },
          { l: "Power", v: `${round(P, 4)} W` },
        ],
        note: "Ohm's law: V = I × R. Power: P = V × I. Enter any two of voltage, current, or resistance (leave the third at 0) to solve for all four values.",
      };
    },
    faq: [
      { q: "What is Ohm's law?", a: "V = I × R - voltage equals current multiplied by resistance. It describes the relationship between these three quantities in an electrical circuit: for a fixed resistance, more voltage drives more current." },
      { q: "How do I calculate power from Ohm's law values?", a: "P = V × I (power equals voltage times current) - once you know voltage and current from Ohm's law, power follows directly. You can also derive P = I²R or P = V²/R by substituting Ohm's law into the power formula." },
      { q: "What is the current if a 10-ohm resistor has 20 volts across it?", a: "2 amps - using I = V/R = 20/10 = 2 A." },
      { q: "Why do I need to enter exactly two known values?", a: "Ohm's law (V=IR) relates three quantities - knowing any two lets you solve for the third algebraically, but with only one known value, there isn't enough information to determine the other two uniquely." },
    ],
    related: ["electricity-cost-calculator", "collision-calculator", "vector-calculator"],
  },
  {
    id: "right-triangle-calculator",
    category: "math",
    title: "Right Triangle Calculator",
    keyword: "right triangle calculator",
    description: "Solve a right triangle's missing sides, angles, and area from any two known sides.",
    intro: "Enter any two of a right triangle's sides (two legs, or one leg and the hypotenuse) to calculate everything else.",
    fields: [
      { id: "legA", label: "Leg a (leave 0 if unknown)", type: "number", default: 3, step: 0.01, min: 0 },
      { id: "legB", label: "Leg b (leave 0 if unknown)", type: "number", default: 4, step: 0.01, min: 0 },
      { id: "hypotenuse", label: "Hypotenuse c (leave 0 if unknown)", type: "number", default: 0, step: 0.01, min: 0 },
    ],
    compute: (v) => {
      let a = v.legA, b = v.legB, c = v.hypotenuse;
      if (a > 0 && b > 0) {
        c = Math.sqrt(a * a + b * b);
      } else if (a > 0 && c > 0) {
        if (c <= a) return { primary: { label: "Invalid input", value: "-" }, secondary: [], note: "The hypotenuse must be longer than either leg." };
        b = Math.sqrt(c * c - a * a);
      } else if (b > 0 && c > 0) {
        if (c <= b) return { primary: { label: "Invalid input", value: "-" }, secondary: [], note: "The hypotenuse must be longer than either leg." };
        a = Math.sqrt(c * c - b * b);
      } else {
        return { primary: { label: "Need two sides", value: "-" }, secondary: [], note: "Enter any two sides (two legs, or one leg and the hypotenuse) - leave the unknown one at 0." };
      }
      const angleA = Math.asin(a / c) * (180 / Math.PI);
      const angleB = 90 - angleA;
      const area = 0.5 * a * b;
      const perimeter = a + b + c;
      return {
        primary: { label: "Hypotenuse (c)", value: round(c, 4) },
        secondary: [
          { l: "Leg a, Leg b", v: `${round(a, 4)}, ${round(b, 4)}` },
          { l: "Angle A, Angle B", v: `${round(angleA, 3)}°, ${round(angleB, 3)}°` },
          { l: "Area", v: round(area, 4) },
          { l: "Perimeter", v: round(perimeter, 4) },
        ],
        note: "Uses the Pythagorean theorem (a² + b² = c²) to find the missing side, then trigonometry to find the angles. Angle C (opposite the hypotenuse) is always 90°.",
      };
    },
    faq: [
      { q: "What is the hypotenuse of a right triangle with legs 3 and 4?", a: "5 - using the Pythagorean theorem: c = √(3² + 4²) = √25 = 5. This is the classic 3-4-5 right triangle." },
      { q: "How do I find a missing leg if I know the hypotenuse and one leg?", a: "Rearrange the Pythagorean theorem: missing leg = √(hypotenuse² − known leg²). For example, with hypotenuse 5 and one leg 3: √(25−9) = √16 = 4." },
      { q: "How do I find the angles of a right triangle from its sides?", a: "Once you know all three sides, use inverse sine: angle A = sin⁻¹(a ÷ c), where a is the leg opposite angle A and c is the hypotenuse. The other non-right angle is simply 90° minus angle A, since all three angles sum to 180°." },
      { q: "What's the area of a right triangle?", a: "0.5 × leg a × leg b - the two legs meet at the right angle, so they serve directly as the triangle's base and height." },
    ],
    related: ["pythagorean-theorem-calculator", "triangle-solver", "circle-calculator"],
  },
  {
    id: "pregnancy-due-date-calculator",
    category: "health",
    title: "Pregnancy Due Date Calculator",
    keyword: "pregnancy due date calculator",
    description: "Estimate a pregnancy due date from your last period, conception date, or IVF transfer date.",
    intro: "Choose your calculation method and enter the relevant date to estimate your due date.",
    fields: [
      { id: "method", label: "Calculate from", type: "select", default: "lmp", options: [
        { v: "lmp", l: "Last menstrual period (LMP)" },
        { v: "conception", l: "Conception date" },
        { v: "ivf3", l: "IVF transfer - day 3 embryo" },
        { v: "ivf5", l: "IVF transfer - day 5 embryo (blastocyst)" },
      ] },
      { id: "refDate", label: "Reference date", type: "date", default: futureDateString(-30) },
    ],
    compute: (v) => {
      const offsetDays = { lmp: 280, conception: 266, ivf3: 263, ivf5: 261 };
      const ref = new Date(v.refDate);
      const due = new Date(ref);
      due.setDate(due.getDate() + offsetDays[v.method]);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const daysRemaining = Math.round((due - today) / 86400000);
      const dueStr = due.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
      return {
        primary: { label: "Estimated due date", value: dueStr },
        secondary: [
          { l: "Days from today", v: daysRemaining >= 0 ? daysRemaining : `${Math.abs(daysRemaining)} (past)` },
          { l: "Weeks pregnant (approx., today)", v: v.method === "lmp" ? Math.max(0, round((today - ref) / 86400000 / 7, 1)) : "N/A for this method" },
        ],
        note: "An estimate only, based on average timelines - actual delivery dates vary widely and this doesn't replace dating confirmed by your care provider (typically via ultrasound).",
      };
    },
    faq: [
      { q: "How is a due date calculated from the last menstrual period (LMP)?", a: "Add 280 days (40 weeks) to the first day of your last period - this is Naegele's rule, the standard method, which assumes a 28-day cycle with ovulation on day 14. It's an estimate; actual cycle length affects real conception timing." },
      { q: "How is an IVF due date different from an LMP-based due date?", a: "IVF due dates are calculated from a known transfer date rather than an estimated ovulation date, which makes them more precise. A day-5 (blastocyst) transfer adds 261 days to the transfer date, and a day-3 transfer adds 263 days - both account for the embryo's exact age at transfer." },
      { q: "How accurate are due date estimates?", a: "Only about 5% of babies are born on their exact estimated due date - most arrive within a 2-week window before or after. Due dates are a statistical estimate of a full-term timeline, not a precise prediction, and your care provider's ultrasound-based dating is generally more reliable than a calculation from LMP alone." },
      { q: "Is an 'ivf birth date calculator' the same as this tool?", a: "Yes - select \"IVF transfer\" as the calculation method above (day 3 or day 5, depending on your embryo's transfer stage) to get an IVF-specific due date estimate." },
    ],
    related: ["age-calculator", "days-until-calculator", "date-duration-calculator"],
  },
  {
    id: "ovulation-calculator",
    category: "health",
    title: "Ovulation Calculator",
    keyword: "ovulation calculator",
    description: "Estimate your ovulation date and fertile window from your last period and cycle length.",
    intro: "Enter the first day of your last period and your average cycle length to estimate your ovulation date and fertile window.",
    fields: [
      { id: "lastPeriod", label: "First day of last period", type: "date", default: futureDateString(-14) },
      { id: "cycleLength", label: "Average cycle length", type: "number", unit: "days", default: 28, step: 1, min: 20, max: 45 },
    ],
    compute: (v) => {
      const lmp = new Date(v.lastPeriod);
      const ovulation = new Date(lmp);
      ovulation.setDate(ovulation.getDate() + (v.cycleLength - 14));
      const fertileStart = new Date(ovulation);
      fertileStart.setDate(fertileStart.getDate() - 5);
      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(fertileEnd.getDate() + 1);
      const nextPeriod = new Date(lmp);
      nextPeriod.setDate(nextPeriod.getDate() + v.cycleLength);
      const fmt = (d) => d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
      return {
        primary: { label: "Estimated ovulation date", value: fmt(ovulation) },
        secondary: [
          { l: "Fertile window", v: `${fmt(fertileStart)} - ${fmt(fertileEnd)}` },
          { l: "Next period expected", v: fmt(nextPeriod) },
        ],
        note: "Assumes a standard 14-day luteal phase (time between ovulation and your next period), which is fairly consistent even when overall cycle length varies. This is an estimate - actual ovulation timing varies cycle to cycle.",
      };
    },
    faq: [
      { q: "How is ovulation date calculated from cycle length?", a: "Ovulation typically occurs 14 days before your next period starts, regardless of how long your total cycle is - so it's calculated as (cycle length - 14) days after the first day of your last period." },
      { q: "Why does ovulation timing vary if the luteal phase is fixed at 14 days?", a: "The luteal phase (after ovulation, before the next period) is relatively consistent at about 14 days, but the follicular phase (before ovulation) varies more between cycles and between people - so a longer or shorter overall cycle mostly reflects a longer or shorter follicular phase, not a different luteal length." },
      { q: "What is the fertile window?", a: "The days when pregnancy is possible from intercourse - typically the 5 days before ovulation plus the day of ovulation itself, since sperm can survive several days while the egg is viable for about 24 hours after release." },
      { q: "Does this work for irregular cycles?", a: "It's less reliable for irregular cycles, since the calculation assumes a consistent cycle length. Tracking actual ovulation signs (basal body temperature, cervical mucus, or an ovulation predictor kit) gives more accurate results if your cycles vary significantly month to month." },
    ],
    related: ["pregnancy-due-date-calculator", "age-calculator", "days-until-calculator"],
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
      { q: "How many days until Christmas?", a: "Set the target date to December 25 of the current (or next) year and this calculator gives you the exact countdown, including the equivalent in weeks and months - handy for gift-shopping or travel planning deadlines." },
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
      { q: "Is a 'day to day calculator' the same as this date duration calculator?", a: "Yes - \"day to day calculator\" describes finding the span between two calendar dates, which is exactly what this tool does. Enter a start and end date above to get the exact number of days, weeks, months, and years between them." },
      { q: "Is 'day between days' the same search as 'days between dates'?", a: "Yes - both describe finding the span between two calendar dates, which is exactly what this tool does." },
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
    id: "time-add-calculator",
    category: "datetime",
    title: "Time Add/Subtract Calculator",
    keyword: "time add calculator",
    description: "Add or subtract hours and minutes to or from a starting time.",
    intro: "Enter a starting time and how many hours and minutes to add or subtract to calculate the resulting time.",
    fields: [
      { id: "startHour", label: "Start hour", type: "number", default: 9, step: 1, min: 0, max: 23 },
      { id: "startMinute", label: "Start minute", type: "number", default: 0, step: 1, min: 0, max: 59 },
      { id: "operation", label: "Operation", type: "select", default: "add", options: [{ v: "add", l: "Add" }, { v: "subtract", l: "Subtract" }] },
      { id: "deltaHours", label: "Hours", type: "number", default: 5, step: 1, min: 0 },
      { id: "deltaMinutes", label: "Minutes", type: "number", default: 45, step: 1, min: 0, max: 59 },
    ],
    compute: (v) => {
      const startTotal = v.startHour * 60 + v.startMinute;
      const deltaTotal = v.deltaHours * 60 + v.deltaMinutes;
      const signedDelta = v.operation === "subtract" ? -deltaTotal : deltaTotal;
      const rawTotal = startTotal + signedDelta;
      const daysRolled = Math.floor(rawTotal / 1440);
      const normalized = ((rawTotal % 1440) + 1440) % 1440;
      const resultHour = Math.floor(normalized / 60);
      const resultMinute = normalized % 60;
      const pad = (n) => String(n).padStart(2, "0");
      const hour12 = resultHour % 12 === 0 ? 12 : resultHour % 12;
      const ampm = resultHour < 12 ? "AM" : "PM";
      return {
        primary: { label: "Resulting time", value: `${pad(resultHour)}:${pad(resultMinute)} (${hour12}:${pad(resultMinute)} ${ampm})` },
        secondary: [
          { l: "24-hour format", v: `${pad(resultHour)}:${pad(resultMinute)}` },
          { l: "Days crossed", v: daysRolled },
        ],
        note: daysRolled !== 0 ? `This ${v.operation === "subtract" ? "goes back" : "crosses forward"} ${Math.abs(daysRolled)} calendar day${Math.abs(daysRolled) === 1 ? "" : "s"} from the start time.` : undefined,
      };
    },
    faq: [
      { q: "How do I add hours and minutes to a time?", a: "Convert everything to total minutes, add them together, then convert back: for 9:00 plus 5 hours 45 minutes, that's (9×60) + (5×60+45) = 540 + 345 = 885 minutes, which is 14:45 (2:45 PM)." },
      { q: "How do I add or convert between hours and minutes in general?", a: "Multiply hours by 60 to get minutes (2.5 hours = 150 minutes), or divide minutes by 60 to get hours (150 minutes = 2.5 hours). This calculator applies that directly when adding or subtracting a duration to a starting time." },
      { q: "What happens if adding time crosses midnight?", a: "The result wraps around to the next day - for example, 11:00 PM plus 3 hours becomes 2:00 AM, and this calculator flags that the result crosses into the following calendar day rather than showing an invalid 26:00." },
      { q: "Is this the same as the Time Duration Calculator?", a: "No - the Time Duration Calculator finds the gap between two times you already know (like 9 AM and 5:30 PM). This calculator does the opposite: starting from one known time, it adds or subtracts a duration to find a new resulting time." },
      { q: "Is a 'calculator that adds time' or 'time calculator addition' the same as this tool?", a: "Yes - all of these describe adding a duration to a starting time to get a new time, which is exactly what this calculator does. Set the operation to \"Add\" above." },
      { q: "Is an 'add calculator time' or 'time adding calculator' search different from this tool?", a: "No - both describe the same task this calculator handles: adding a duration to a starting time. Set the operation to \"Add\" and enter your starting time and duration above." },
    ],
    related: ["time-duration-calculator", "time-unit-converter", "date-duration-calculator"],
  },
  {
    id: "online-timer",
    category: "datetime",
    title: "Online Timer",
    keyword: "online timer",
    description: "A free countdown timer that runs in your browser - set minutes and seconds, then start, pause, or reset.",
    intro: "Set a countdown time, then hit start - this timer counts down and alerts you when time's up.",
    // No form fields — this tool is a live, running widget (see
    // js/engine.js's initOnlineTimer), not a compute-on-submit
    // calculator. compute() only exists so the homepage/category card
    // preview (which calls it for a sample readout) doesn't crash.
    fields: [],
    compute: () => ({
      primary: { label: "Default duration", value: "5:00" },
      secondary: [{ l: "Controls", v: "Start / Pause / Reset" }],
    }),
    faq: [
      { q: "Does this online timer keep running if I switch browser tabs?", a: "Yes - the countdown runs in the background as long as this browser tab stays open, even if it's not the active tab. Closing the tab or your browser stops the timer." },
      { q: "Will this timer make a sound when it finishes?", a: "Yes - a short beep plays when the countdown reaches zero, along with the display changing to \"Time's up!\" so you notice even if you're not looking directly at the screen." },
      { q: "Can I set a timer for longer than an hour?", a: "Yes - enter any number of minutes (there's no upper limit), so you can set a 90-minute or multi-hour timer just as easily as a short one." },
    ],
    related: ["time-duration-calculator", "time-add-calculator", "date-duration-calculator"],
  },
  {
    id: "online-alarm-clock",
    category: "datetime",
    title: "Online Alarm Clock",
    keyword: "online alarm clock",
    description: "A free alarm clock that runs in your browser - set a time and it alerts you when your clock reaches it.",
    intro: "Set a time below, then click Set Alarm - this rings (with an on-screen alert and a sound) when your computer's clock reaches that time.",
    // Live widget, same pattern as online-timer — see initOnlineAlarm in
    // js/engine.js. compute() only exists for the card-preview readout.
    fields: [],
    compute: () => ({
      primary: { label: "Alarm status", value: "Not set" },
      secondary: [{ l: "Controls", v: "Set / Cancel" }],
    }),
    faq: [
      { q: "Does this alarm clock keep the correct time?", a: "Yes - it reads your computer or phone's system clock directly, so it's as accurate as your device's clock, updated every second." },
      { q: "Will the alarm still ring if I switch browser tabs?", a: "Yes, as long as this tab stays open - the check runs in the background even on an inactive tab. Closing the tab or your browser cancels the alarm." },
      { q: "Can I set more than one alarm at a time?", a: "This tool supports one alarm at a time - set a new one and it replaces the previous one. For multiple simultaneous countdowns instead of a specific clock time, use the Online Timer." },
      { q: "Is this an 'alarm clock website' I can bookmark and reuse?", a: "Yes - this page works as a standalone browser alarm clock you can bookmark; just keep the tab open while you wait for it to ring, since the alarm only runs while the page is loaded." },
    ],
    related: ["online-timer", "time-add-calculator", "military-time-converter"],
  },
  {
    id: "online-stopwatch",
    category: "datetime",
    title: "Online Stopwatch",
    keyword: "online stopwatch",
    description: "A free stopwatch that runs in your browser - start, lap, and reset with tenth-of-a-second precision.",
    intro: "Click Start to begin timing - use Lap to record split times without stopping the clock, and Reset to clear it.",
    // Live widget, same pattern as online-timer — see initOnlineStopwatch
    // in js/engine.js. compute() only exists for the card-preview readout.
    fields: [],
    compute: () => ({
      primary: { label: "Elapsed time", value: "00:00.0" },
      secondary: [{ l: "Controls", v: "Start / Lap / Reset" }],
    }),
    faq: [
      { q: "How precise is this stopwatch?", a: "It displays to a tenth of a second, updated continuously in your browser - accurate enough for everyday timing, though very high-precision athletic timing typically needs dedicated hardware." },
      { q: "What does the Lap button do?", a: "It records a split time without stopping the overall clock - each lap shows both the time since the previous lap and the total elapsed time, listed most recent first." },
      { q: "Does the stopwatch keep running if I switch browser tabs?", a: "Yes - it keeps timing in the background as long as this tab stays open, even if it's not the active tab. Closing the tab or browser stops it." },
      { q: "Can I pause and resume instead of stopping completely?", a: "Yes - the Start button toggles to \"Stop\" while running; clicking it again pauses the clock, and clicking \"Resume\" continues from where it left off. Use Reset to clear the time back to zero." },
    ],
    related: ["online-timer", "online-alarm-clock", "time-duration-calculator"],
  },
  {
    id: "current-time",
    category: "datetime",
    title: "Current Time",
    keyword: "current time",
    description: "See the exact current time and date, updating live in your browser.",
    intro: "This shows your device's current time and date, updating every second.",
    // Live widget, same pattern as online-timer — see initOnlineClock in
    // js/engine.js. compute() only exists for the card-preview readout.
    fields: [],
    compute: () => ({
      primary: { label: "Current time", value: "Live" },
      secondary: [{ l: "Updates", v: "Every second" }],
    }),
    faq: [
      { q: "Where does this time come from?", a: "Directly from your device's system clock, read and displayed in your browser - it's exactly as accurate as your computer or phone's own clock." },
      { q: "Is this shown in my local time zone?", a: "Yes - it uses your device's configured time zone automatically. To see the time in a different zone, use the Time Zone Converter instead." },
      { q: "Why might this be a minute or two off from an official time source?", a: "If your device's clock hasn't synced recently (or is set manually), it can drift slightly from an atomic-clock reference - most computers and phones auto-sync periodically to correct this." },
    ],
    related: ["time-zone-converter", "online-timer", "online-stopwatch"],
  },
  {
    id: "random-date-generator",
    category: "datetime",
    title: "Random Date Generator",
    keyword: "generate random date",
    description: "Generate one or more random dates within a chosen date range.",
    intro: "Choose a start date, end date, and how many random dates to generate.",
    fields: [
      { id: "startDate", label: "Start date", type: "date", default: "2020-01-01" },
      { id: "endDate", label: "End date", type: "date", default: "2029-12-31" },
      { id: "count", label: "How many dates", type: "number", default: 1, step: 1, min: 1, max: 20 },
    ],
    compute: (v) => {
      const start = new Date(v.startDate);
      const end = new Date(v.endDate);
      const startMs = start.getTime();
      const endMs = end.getTime();
      if (isNaN(startMs) || isNaN(endMs) || endMs < startMs) {
        return { primary: { label: "Random date", value: "Invalid range" }, secondary: [], note: "End date must be on or after the start date." };
      }
      const count = Math.max(1, Math.min(20, Math.round(v.count)));
      const dates = Array.from({ length: count }, () => {
        const randomMs = startMs + Math.random() * (endMs - startMs);
        return new Date(randomMs).toISOString().slice(0, 10);
      });
      return {
        primary: { label: count > 1 ? "Random dates" : "Random date", value: dates.join(", ") },
        secondary: [
          { l: "Date range", v: `${v.startDate} to ${v.endDate}` },
          { l: "Count", v: count },
        ],
        note: "Click Calculate again to generate a fresh set of random dates.",
      };
    },
    faq: [
      { q: "How does this generate a random date?", a: "It picks a random point in time uniformly between your start and end dates (converted to timestamps), then converts that random timestamp back into a calendar date - every day in the range has an equal chance of being picked." },
      { q: "Can I generate multiple random dates at once?", a: "Yes - set \"how many dates\" to any value up to 20 to generate that many random dates from the same range in one click." },
      { q: "What could this be used for?", a: "Common uses include picking a random testing date, generating sample data for software testing, randomly assigning a date for a drawing or giveaway, or any scenario needing an unbiased random pick from a range of dates." },
      { q: "Is 'get random date' the same as this random date generator?", a: "Yes - choose your start date, end date, and how many dates you need above, then click Calculate to get one or more random dates." },
    ],
    related: ["days-until-calculator", "date-duration-calculator", "random-number-generator"],
  },
  {
    id: "military-time-converter",
    category: "datetime",
    title: "Military Time Converter",
    keyword: "military time converter",
    description: "Convert 12-hour clock time to 24-hour military (army) time, and back.",
    intro: "Choose a direction, then enter a time to convert between standard 12-hour time and 24-hour military time.",
    fields: [
      { id: "direction", label: "Convert", type: "select", default: "to24", options: [
        { v: "to24", l: "12-hour → Military (24-hour)" }, { v: "to12", l: "Military (24-hour) → 12-hour" },
      ] },
      { id: "hour12", label: "Hour (1-12)", type: "number", default: 2, step: 1, min: 1, max: 12 },
      { id: "minute12", label: "Minute", type: "number", default: 30, step: 1, min: 0, max: 59 },
      { id: "period", label: "AM/PM", type: "select", default: "PM", options: [{ v: "AM", l: "AM" }, { v: "PM", l: "PM" }] },
      { id: "hour24", label: "Military hour (0-23)", type: "number", default: 14, step: 1, min: 0, max: 23 },
      { id: "minute24", label: "Military minute", type: "number", default: 30, step: 1, min: 0, max: 59 },
    ],
    compute: (v) => {
      const pad = (n) => String(n).padStart(2, "0");
      if (v.direction === "to12") {
        const h24 = ((v.hour24 % 24) + 24) % 24;
        const period = h24 < 12 ? "AM" : "PM";
        let h12 = h24 % 12;
        if (h12 === 0) h12 = 12;
        return {
          primary: { label: "12-hour time", value: `${h12}:${pad(v.minute24)} ${period}` },
          secondary: [
            { l: "Military time entered", v: `${pad(h24)}:${pad(v.minute24)}` },
            { l: "Spoken as", v: `${pad(h24)}${pad(v.minute24)} hours` },
          ],
        };
      }
      let hour24 = v.hour12 % 12;
      if (v.period === "PM") hour24 += 12;
      const militaryDigits = `${pad(hour24)}${pad(v.minute12)}`;
      return {
        primary: { label: "Military time", value: `${pad(hour24)}:${pad(v.minute12)}` },
        secondary: [
          { l: "Spoken as", v: `${militaryDigits} hours` },
          { l: "12-hour time entered", v: `${v.hour12}:${pad(v.minute12)} ${v.period}` },
        ],
      };
    },
    faq: [
      { q: "How do I convert regular time to military time?", a: "For AM hours, military time matches the clock hour (with a leading zero) - 9:00 AM becomes 0900. For PM hours, add 12 to the clock hour - 2:30 PM becomes 14:30 (1430)." },
      { q: "What is 12 AM and 12 PM in military time?", a: "12:00 AM (midnight) is 0000 in military time, and 12:00 PM (noon) is 1200 - these are the two exceptions where you don't simply add or keep the 12." },
      { q: "How do I convert military time back to 12-hour time?", a: "If the hour is 13 or greater, subtract 12 and mark it PM (1430 becomes 2:30 PM); if it's 00-11, keep the hour and mark it AM, except 0000 which becomes 12:00 AM. Switch this calculator to \"Military → 12-hour\" mode to do this conversion directly." },
      { q: "Is 'military clock conversion' or 'military hours converter' different from converting military time?", a: "No - all of these describe the same conversion between 24-hour military time and standard 12-hour clock time, in either direction. Pick the direction you need above." },
      { q: "Do 'military clock converter,' 'conversion of military time,' 'converting military time,' and 'translate military time' all mean the same thing here?", a: "Yes - every one of these phrasings is asking to convert between 12-hour and 24-hour (military) time, which is exactly what this calculator does in both directions." },
      { q: "What is 1600 military time?", a: "4:00 PM. Since 1600 is 16 hundred hours, subtract 12 to get 4, and any hour of 13 or greater is PM - switch this calculator to \"Military → 12-hour\" mode and enter hour 16, minute 0 to confirm." },
      { q: "What is 7 PM or 10 PM in military time?", a: "7:00 PM is 1900 (19 hundred hours) - add 12 to the PM hour. 10:00 PM is 2200 (22 hundred hours), same rule. Only 12 PM (noon, stays 1200) and 12 AM (midnight, becomes 0000) break the simple \"add 12\" pattern." },
      { q: "What is 6 PM in military time?", a: "1800 (18 hundred hours) - add 12 to the PM hour, same rule as any other PM time between 1 PM and 11 PM." },
      { q: "What is 8 AM in military time?", a: "0800 - AM hours from 1 AM to 11 AM stay the same number in military time, just with a leading zero. Only 12 AM (midnight) is the exception, becoming 0000." },
      { q: "What is 12 PM in military time?", a: "1200 - noon is one of the two exceptions to the simple AM/PM rules (the other being 12 AM/midnight, which becomes 0000). 12 PM stays 1200 rather than becoming 2400." },
      { q: "Is 'army clock converter' the same as a military time converter?", a: "Yes - the US military and other armed forces use the same 24-hour clock system commonly called \"military time,\" so \"army clock converter\" describes the same conversion this tool handles in both directions." },
    ],
    related: ["time-duration-calculator", "time-add-calculator", "time-unit-converter"],
  },
  {
    id: "unix-timestamp-converter",
    category: "datetime",
    title: "Unix Timestamp Converter",
    keyword: "unix timestamp converter",
    description: "Convert a Unix timestamp (epoch time) to a human-readable date, or a date to a timestamp.",
    intro: "Enter a Unix timestamp to convert it to a readable date, or enter a date below to get its timestamp.",
    fields: [
      { id: "timestamp", label: "Unix timestamp (seconds)", type: "number", default: 1735689600, step: 1 },
      { id: "year", label: "Year", type: "number", default: 2025, step: 1 },
      { id: "month", label: "Month", type: "number", default: 1, step: 1, min: 1, max: 12 },
      { id: "day", label: "Day", type: "number", default: 1, step: 1, min: 1, max: 31 },
      { id: "hour", label: "Hour (UTC, 0-23)", type: "number", default: 0, step: 1, min: 0, max: 23 },
    ],
    compute: (v) => {
      const fromTimestamp = new Date(v.timestamp * 1000);
      const dateFromEntered = new Date(Date.UTC(v.year, v.month - 1, v.day, v.hour));
      const epochFromEntered = Math.floor(dateFromEntered.getTime() / 1000);
      const pad = (n) => String(n).padStart(2, "0");
      const isoFromTimestamp = isNaN(fromTimestamp.getTime())
        ? "Invalid timestamp"
        : `${fromTimestamp.getUTCFullYear()}-${pad(fromTimestamp.getUTCMonth() + 1)}-${pad(fromTimestamp.getUTCDate())} ${pad(fromTimestamp.getUTCHours())}:${pad(fromTimestamp.getUTCMinutes())}:${pad(fromTimestamp.getUTCSeconds())} UTC`;
      return {
        primary: { label: "Date from timestamp", value: isoFromTimestamp },
        secondary: [
          { l: "Milliseconds", v: (v.timestamp * 1000).toLocaleString() },
          { l: "Timestamp from entered date", v: epochFromEntered.toLocaleString() },
        ],
        note: "Timestamps are seconds since January 1, 1970 UTC (the Unix epoch). Entered dates are treated as UTC, not your local time zone.",
      };
    },
    faq: [
      { q: "What is a Unix timestamp?", a: "The number of seconds elapsed since January 1, 1970, 00:00:00 UTC (the \"Unix epoch\") - a single number that unambiguously represents a specific moment in time, widely used in programming and databases since it avoids time zone and calendar-formatting ambiguity." },
      { q: "How is this different from an epoch converter?", a: "Nothing - \"epoch time\" and \"Unix timestamp\" are the same thing, and \"epoch converter\" and \"Unix timestamp converter\" describe the same tool. This calculator handles both directions: timestamp to date, and date to timestamp." },
      { q: "How do I convert a Unix timestamp to a readable time?", a: "Enter the timestamp in the \"Unix timestamp\" field above - the \"Date from timestamp\" result shows the exact UTC date and time it corresponds to." },
      { q: "Is 'unix to timestamp' or 'unix timestamp to timestamp' a valid search, or a mistake?", a: "It's likely shorthand for converting a Unix timestamp to a readable date, or vice versa - both directions are handled by the fields above, whichever way you're converting." },
      { q: "Is 'linux timestamp to time' the same as a Unix timestamp?", a: "Yes - Linux (and most Unix-like systems) uses the same epoch-based timestamp convention, so \"Linux timestamp\" and \"Unix timestamp\" refer to the identical value. Enter it in the timestamp field above." },
      { q: "Why does my timestamp look 3 or 10 digits different from what I expected?", a: "Some systems use milliseconds since the epoch instead of seconds - a timestamp in milliseconds has 3 extra digits (13 digits vs. 10 for a current-day timestamp in seconds). Divide a millisecond timestamp by 1,000 before entering it here." },
    ],
    related: ["date-duration-calculator", "time-unit-converter", "days-until-calculator"],
  },
  {
    id: "absolute-risk-reduction-calculator",
    category: "math",
    title: "Absolute Risk Reduction Calculator",
    keyword: "absolute risk reduction calculator",
    description: "Calculate absolute risk reduction (ARR), relative risk reduction (RRR), and number needed to treat (NNT) from two event rates.",
    intro: "Enter the event rate in a control group and a treatment group to calculate absolute risk reduction, relative risk reduction, and number needed to treat.",
    fields: [
      { id: "controlRate", label: "Control group event rate", type: "number", unit: "%", default: 20, step: 0.1 },
      { id: "treatmentRate", label: "Treatment group event rate", type: "number", unit: "%", default: 12, step: 0.1 },
    ],
    compute: (v) => {
      const arr = v.controlRate - v.treatmentRate;
      const rrr = v.controlRate === 0 ? null : (arr / v.controlRate) * 100;
      const nnt = arr === 0 ? null : Math.abs(100 / arr);
      return {
        primary: { label: "Absolute risk reduction (ARR)", value: `${round(arr, 2)} percentage points` },
        secondary: [
          { l: "Relative risk reduction (RRR)", v: rrr === null ? "—" : `${round(rrr, 1)}%` },
          { l: "Number needed to treat (NNT)", v: nnt === null ? "—" : round(nnt, 1) },
        ],
        note: "A statistics reference tool, not medical advice - interpreting clinical significance requires the full study context (confidence intervals, study design, population), which a single calculator can't capture.",
      };
    },
    faq: [
      { q: "What's the difference between absolute and relative risk reduction?", a: "Absolute risk reduction (ARR) is the simple difference between two event rates (e.g., 20% − 12% = 8 percentage points). Relative risk reduction (RRR) expresses that same difference as a percentage of the original rate (8 ÷ 20 = 40%) - RRR often sounds more dramatic than ARR for the same underlying data, which is why both numbers matter for context." },
      { q: "What does 'number needed to treat' (NNT) mean?", a: "NNT is the number of people who would need to receive a treatment for one additional person to benefit (avoid the event), calculated as 1 ÷ ARR (expressed as a decimal). A smaller NNT means a more impactful treatment effect - an NNT of 12.5 means roughly 1 in every 12-13 people treated sees the benefit." },
      { q: "Is this appropriate for making medical treatment decisions?", a: "No - this is a statistics reference calculator for understanding how these numbers are computed, not a substitute for a full clinical study's confidence intervals, population characteristics, and a qualified professional's interpretation. Always discuss treatment decisions with a healthcare provider." },
    ],
    related: ["percentage-calculator", "percentage-change-calculator", "standard-deviation-calculator"],
  },
  {
    id: "sample-size-calculator",
    category: "math",
    title: "Sample Size Calculator",
    keyword: "calculating sample size calculator",
    description: "Calculate the survey or study sample size needed for a chosen confidence level and margin of error.",
    intro: "Choose a confidence level and margin of error to calculate the minimum sample size needed for a survey or study.",
    fields: [
      { id: "confidenceLevel", label: "Confidence level", type: "select", default: "95", options: [
        { v: "90", l: "90%" }, { v: "95", l: "95%" }, { v: "99", l: "99%" },
      ] },
      { id: "marginError", label: "Margin of error", type: "number", unit: "%", default: 5, step: 0.1, min: 0.1 },
      { id: "proportion", label: "Estimated response proportion", type: "number", unit: "%", default: 50, step: 1, min: 1, max: 99 },
      { id: "populationSize", label: "Population size (0 = unlimited/unknown)", type: "number", default: 0, step: 1, min: 0 },
    ],
    compute: (v) => {
      const zValues = { "90": 1.645, "95": 1.96, "99": 2.576 };
      const z = zValues[v.confidenceLevel];
      const p = v.proportion / 100;
      const e = v.marginError / 100;
      if (e === 0) {
        return { primary: { label: "Sample size", value: "Undefined" }, secondary: [], note: "Margin of error can't be zero." };
      }
      const nInfinite = (z * z * p * (1 - p)) / (e * e);
      let nFinal = nInfinite;
      if (v.populationSize > 0) {
        nFinal = nInfinite / (1 + (nInfinite - 1) / v.populationSize);
      }
      return {
        primary: { label: "Required sample size", value: Math.ceil(nFinal).toLocaleString() },
        secondary: [
          { l: "Unadjusted (infinite population)", v: Math.ceil(nInfinite).toLocaleString() },
          { l: "Z-score used", v: z },
        ],
        note: v.populationSize > 0 ? "Adjusted for a finite population using the finite population correction formula." : "For an unknown or very large population - enter a population size above to get a smaller, adjusted sample size for a finite group.",
      };
    },
    faq: [
      { q: "How is sample size calculated?", a: "n = (z² × p × (1−p)) / e², where z is the z-score for your confidence level, p is the estimated proportion (50% is the most conservative/largest assumption if unknown), and e is your margin of error as a decimal. Higher confidence and lower margin of error both increase the required sample size." },
      { q: "Why use 50% for the estimated proportion if I don't know it?", a: "50% produces the largest possible required sample size (p×(1−p) is maximized at p=0.5), so it's the safe, conservative default when you have no prior estimate - using it guarantees your sample is large enough regardless of the true proportion." },
      { q: "How does population size affect the required sample size?", a: "For very large or unknown populations, sample size depends only on confidence level and margin of error, not population size. For a known, finite population, the finite population correction reduces the required sample size somewhat, since sampling a larger fraction of a smaller population reduces uncertainty faster." },
      { q: "Is 'calculating sample size online' or 'determine sample size calculator' the same as this tool?", a: "Yes - all of these describe finding the minimum sample size needed for a survey or study at a chosen confidence level and margin of error, which is exactly what this calculator does." },
    ],
    related: ["standard-deviation-calculator", "percentage-calculator", "average-calculator"],
  },
  {
    id: "confidence-interval-calculator",
    category: "math",
    title: "Confidence Interval Calculator",
    keyword: "confidence interval calculator",
    description: "Calculate a confidence interval for a sample mean.",
    intro: "Enter a sample mean, standard deviation, and sample size to calculate a confidence interval.",
    fields: [
      { id: "mean", label: "Sample mean", type: "number", default: 100, step: 0.01 },
      { id: "stdDev", label: "Sample standard deviation", type: "number", default: 15, step: 0.01, min: 0 },
      { id: "sampleSize", label: "Sample size (n)", type: "number", default: 30, step: 1, min: 2 },
      { id: "confidenceLevel", label: "Confidence level", type: "select", default: "95", options: [
        { v: "90", l: "90%" }, { v: "95", l: "95%" }, { v: "99", l: "99%" },
      ] },
    ],
    compute: (v) => {
      const zTable = { "90": 1.645, "95": 1.96, "99": 2.576 };
      const z = zTable[v.confidenceLevel];
      const marginOfError = (z * v.stdDev) / Math.sqrt(v.sampleSize);
      const lower = v.mean - marginOfError;
      const upper = v.mean + marginOfError;
      return {
        primary: { label: `${v.confidenceLevel}% confidence interval`, value: `${round(lower, 4)} to ${round(upper, 4)}` },
        secondary: [{ l: "Margin of error", v: `±${round(marginOfError, 4)}` }],
        note: `Uses the normal (z) distribution: margin of error = z × (standard deviation ÷ √n), with z = ${z} for ${v.confidenceLevel}% confidence. This approximation works well for sample sizes of 30+; for smaller samples, a t-distribution is more accurate.`,
      };
    },
    faq: [
      { q: "What does a 95% confidence interval mean?", a: "If you repeated the sampling process many times and built a confidence interval each time, about 95% of those intervals would contain the true population mean - it's a statement about the reliability of the method, not a 95% probability that this specific interval contains the true value." },
      { q: "How do I calculate a confidence interval?", a: "Margin of error = z-score × (standard deviation ÷ √sample size). Then add and subtract that margin from your sample mean to get the interval's lower and upper bounds. The z-score depends on your chosen confidence level (1.96 for 95%, for example)." },
      { q: "Why does a larger sample size produce a narrower confidence interval?", a: "The margin of error divides by the square root of the sample size, so larger samples shrink the margin - more data means less uncertainty about where the true population mean lies, narrowing the interval around your estimate." },
      { q: "Should I use a z-score or t-score for my confidence interval?", a: "Use a t-score (from the t-distribution) for smaller samples, typically under 30, since it accounts for extra uncertainty in a small-sample standard deviation estimate. This calculator uses the z-distribution, which is a reasonable approximation once your sample size is 30 or more." },
    ],
    related: ["standard-deviation-calculator", "sample-size-calculator", "z-score-calculator"],
  },
  {
    id: "mean-median-mode-calculator",
    category: "math",
    title: "Mean, Median, Mode & Range Calculator",
    keyword: "mean median mode calculator",
    description: "Calculate the mean, median, mode, and range of a data set.",
    intro: "Enter a list of numbers (comma or line separated) to calculate the mean, median, mode, and range.",
    fields: [
      { id: "data", label: "Numbers (comma or line separated)", type: "textarea", default: "2, 4, 4, 4, 5, 5, 7, 9" },
    ],
    compute: (v) => {
      const data = (v.data || "").split(/[,\n]+/).map((s) => s.trim()).filter(Boolean).map(Number).filter((n) => !isNaN(n));
      if (data.length === 0) {
        return { primary: { label: "Enter some numbers", value: "-" }, secondary: [], note: "Enter a list of numbers separated by commas or line breaks." };
      }
      const sorted = [...data].sort((a, b) => a - b);
      const n = data.length;
      const mean = data.reduce((a, b) => a + b, 0) / n;
      const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[(n - 1) / 2];
      const counts = {};
      data.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });
      const maxCount = Math.max(...Object.values(counts));
      const modes = Object.keys(counts).filter((k) => counts[k] === maxCount).map(Number);
      const modeStr = maxCount === 1 ? "No mode (all values unique)" : modes.join(", ");
      const range = sorted[n - 1] - sorted[0];
      return {
        primary: { label: "Mean", value: round(mean, 4) },
        secondary: [
          { l: "Median", v: round(median, 4) },
          { l: "Mode", v: modeStr },
          { l: "Range", v: round(range, 4) },
          { l: "Count", v: n },
        ],
        note: "Mean = sum ÷ count. Median = the middle value (average of the two middle values if count is even). Mode = the most frequently occurring value(s). Range = maximum − minimum.",
      };
    },
    faq: [
      { q: "What's the difference between mean, median, and mode?", a: "Mean is the arithmetic average (sum ÷ count). Median is the middle value when sorted. Mode is the most frequently occurring value. They can all differ, especially with skewed data or outliers." },
      { q: "Why would I use median instead of mean?", a: "Median is more resistant to outliers - a single extreme value can pull the mean far from where most of the data actually sits, while the median stays anchored to the middle of the sorted data regardless of how extreme the outliers are." },
      { q: "Can a data set have more than one mode?", a: "Yes - if two or more values tie for the highest frequency, the data set is \"multimodal\" and all of them are reported as modes. If every value appears exactly once, there's no meaningful mode." },
      { q: "What does range tell you that mean or median doesn't?", a: "Range measures the spread of the data (maximum minus minimum), while mean and median describe its center - two data sets can have identical means but very different ranges, reflecting very different amounts of variability." },
    ],
    related: ["average-calculator", "standard-deviation-calculator", "confidence-interval-calculator"],
  },
  {
    id: "gas-trip-cost-calculator",
    category: "finance",
    title: "Gas Trip Cost Calculator",
    keyword: "cost of gas calculator",
    description: "Calculate how much gas a trip will cost based on distance, fuel economy, and gas price.",
    intro: "Enter your trip distance, vehicle's fuel economy, and the price of gas to calculate the total fuel cost.",
    fields: [
      { id: "distance", label: "Trip distance", type: "number", unit: "miles", default: 300, step: 1 },
      { id: "mpg", label: "Fuel economy", type: "number", unit: "mpg", default: 28, step: 0.1 },
      { id: "gasPrice", label: "Gas price", type: "number", unit: "$/gallon", default: 3.5, step: 0.01 },
    ],
    compute: (v) => {
      const gallons = v.mpg === 0 ? 0 : v.distance / v.mpg;
      const totalCost = gallons * v.gasPrice;
      const costPerMile = v.distance === 0 ? 0 : totalCost / v.distance;
      return {
        primary: { label: "Total gas cost", value: `$${round(totalCost, 2).toLocaleString()}` },
        secondary: [
          { l: "Gallons needed", v: round(gallons, 2) },
          { l: "Cost per mile", v: `$${round(costPerMile, 3)}` },
        ],
        note: "Estimate only - actual fuel use varies with driving style, terrain, traffic, and vehicle load.",
      };
    },
    faq: [
      { q: "How do I calculate the cost of gas for a road trip?", a: "Divide the trip distance by your vehicle's miles-per-gallon rating to get gallons needed, then multiply by the price per gallon. A 300-mile trip at 28 mpg and $3.50/gallon needs about 10.7 gallons, costing roughly $37.50." },
      { q: "Should I use city or highway mpg for a road trip estimate?", a: "Highway mpg is usually the more accurate figure for a long-distance trip, since most of the driving happens at steady highway speeds; city mpg (typically lower) is more relevant for trips with frequent stops and lower average speeds." },
      { q: "How can I split this cost among passengers?", a: "Divide the total gas cost by the number of people sharing the trip - for a $37.50 total split 3 ways, that's $12.50 per person. This calculator gives you the total cost; dividing it evenly (or by another agreed split) is a simple next step." },
      { q: "Is 'calculating gas costs for a trip' the same as this calculator?", a: "Yes - enter your trip distance, fuel economy, and gas price above to calculate exactly that." },
      { q: "Is a 'gas calculator for a trip' the same as this tool?", a: "Yes - that's exactly what this calculator does, using your trip distance, fuel economy, and gas price." },
    ],
    related: ["fuel-economy-converter", "auto-loan-calculator", "tip-calculator"],
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
      const dec31 = new Date(Date.UTC(y, 11, 31));
      const daysLeftInYear = Math.max(0, Math.round((dec31 - date) / 86400000));
      const weeksLeftInYear = Math.floor(daysLeftInYear / 7);
      return {
        primary: { label: "ISO week number", value: weekNo },
        secondary: [
          { l: "ISO week year", v: date.getUTCFullYear() },
          { l: "Full weeks left in year", v: weeksLeftInYear },
        ],
        note: "Uses the ISO 8601 standard, where week 1 is the week containing the year's first Thursday. This can differ from a simple 'days since Jan 1' count near year boundaries.",
      };
    },
    faq: [
      { q: "What week number is June 15, 2024?", a: "Week 24 of 2024, using the ISO 8601 standard where weeks start on Monday." },
      { q: "Why does ISO week numbering matter?", a: "ISO 8601 week numbers are used widely in business, manufacturing, and international scheduling because they give every week a consistent, unambiguous number that doesn't reset awkwardly mid-week at year boundaries." },
      { q: "Does every year have exactly 52 weeks?", a: "No - the ISO week-numbering system means most years have 52 weeks, but years where January 1 falls on a Thursday (or it's a leap year starting on Wednesday) get a 53rd week, since ISO weeks are defined by whole Monday-to-Sunday periods within the year." },
      { q: "Why do some calendars show week 53 for a year?", a: "A year has 52 weeks plus one or two extra days, and under the ISO week-numbering standard, those leftover days sometimes form a 53rd week - this happens in years where January 1st falls on a Thursday, or in leap years where it falls on a Wednesday." },
      { q: "How many weeks are left this year?", a: "Set the date above to today and check the \"Full weeks left in year\" figure - it counts complete 7-day weeks remaining between your chosen date and December 31." },
      { q: "What does 'week and year' mean together, like week 24 of 2024?", a: "It's the standard way to unambiguously reference a specific week - the ISO week number alone can be shared between two different years near a year boundary, so pairing it with the ISO week year (shown above) removes that ambiguity." },
    ],
    related: ["date-duration-calculator", "day-of-week-calculator", "leap-year-calculator"],
  },
  {
    id: "time-zone-converter",
    category: "datetime",
    title: "Time Zone Converter",
    keyword: "time zone converter",
    description: "Convert a time from one time zone to another, including current time in any zone.",
    intro: "Enter a date and time in one time zone to see the equivalent time in another - defaults to right now.",
    fields: [
      { id: "date", label: "Date", type: "date", default: todayDateString() },
      { id: "time", label: "Time (24-hour, HH:MM)", type: "text", default: nowTimeString() },
      { id: "fromZone", label: "From time zone", type: "select", default: Intl.DateTimeFormat().resolvedOptions().timeZone, options: [
        { v: "America/New_York", l: "US Eastern (New York)" }, { v: "America/Chicago", l: "US Central (Chicago)" },
        { v: "America/Denver", l: "US Mountain (Denver)" }, { v: "America/Los_Angeles", l: "US Pacific (Los Angeles)" },
        { v: "America/Sao_Paulo", l: "Brazil (São Paulo)" }, { v: "UTC", l: "UTC" },
        { v: "Europe/London", l: "UK (London)" }, { v: "Europe/Paris", l: "Central Europe (Paris)" },
        { v: "Europe/Moscow", l: "Russia (Moscow)" }, { v: "Africa/Cairo", l: "Egypt (Cairo)" },
        { v: "Asia/Dubai", l: "UAE (Dubai)" }, { v: "Asia/Kolkata", l: "India (Kolkata)" },
        { v: "Asia/Dhaka", l: "Bangladesh (Dhaka)" }, { v: "Asia/Bangkok", l: "Thailand (Bangkok)" },
        { v: "Asia/Shanghai", l: "China (Shanghai)" }, { v: "Asia/Tokyo", l: "Japan (Tokyo)" },
        { v: "Asia/Seoul", l: "South Korea (Seoul)" }, { v: "Australia/Sydney", l: "Australia Eastern (Sydney)" },
        { v: "Pacific/Auckland", l: "New Zealand (Auckland)" },
      ] },
      { id: "toZone", label: "To time zone", type: "select", default: "Asia/Kolkata", options: [
        { v: "America/New_York", l: "US Eastern (New York)" }, { v: "America/Chicago", l: "US Central (Chicago)" },
        { v: "America/Denver", l: "US Mountain (Denver)" }, { v: "America/Los_Angeles", l: "US Pacific (Los Angeles)" },
        { v: "America/Sao_Paulo", l: "Brazil (São Paulo)" }, { v: "UTC", l: "UTC" },
        { v: "Europe/London", l: "UK (London)" }, { v: "Europe/Paris", l: "Central Europe (Paris)" },
        { v: "Europe/Moscow", l: "Russia (Moscow)" }, { v: "Africa/Cairo", l: "Egypt (Cairo)" },
        { v: "Asia/Dubai", l: "UAE (Dubai)" }, { v: "Asia/Kolkata", l: "India (Kolkata)" },
        { v: "Asia/Dhaka", l: "Bangladesh (Dhaka)" }, { v: "Asia/Bangkok", l: "Thailand (Bangkok)" },
        { v: "Asia/Shanghai", l: "China (Shanghai)" }, { v: "Asia/Tokyo", l: "Japan (Tokyo)" },
        { v: "Asia/Seoul", l: "South Korea (Seoul)" }, { v: "Australia/Sydney", l: "Australia Eastern (Sydney)" },
        { v: "Pacific/Auckland", l: "New Zealand (Auckland)" },
      ] },
    ],
    compute: (v) => {
      const getOffsetMinutes = (date, zone) => {
        const zStr = date.toLocaleString("en-US", { timeZone: zone });
        const uStr = date.toLocaleString("en-US", { timeZone: "UTC" });
        return (new Date(zStr) - new Date(uStr)) / 60000;
      };
      const [hh, mm] = v.time.split(":").map(Number);
      const timeStr = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
      const asUTC = new Date(`${v.date}T${timeStr}:00Z`);
      const fromOffsetMin = getOffsetMinutes(asUTC, v.fromZone);
      const realUTC = new Date(asUTC.getTime() - fromOffsetMin * 60000);
      const fmt = (zone) => realUTC.toLocaleString("en-US", {
        timeZone: zone, weekday: "short", year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true,
      });
      const fromOffset = getOffsetMinutes(realUTC, v.fromZone) / 60;
      const toOffset = getOffsetMinutes(realUTC, v.toZone) / 60;
      const diffHours = round(toOffset - fromOffset, 2);
      return {
        primary: { label: "Time in destination zone", value: fmt(v.toZone) },
        secondary: [
          { l: "Original time", v: fmt(v.fromZone) },
          { l: "Difference", v: `${diffHours >= 0 ? "+" : ""}${diffHours} hrs` },
        ],
        note: "Uses each location's actual current UTC offset for the date entered, so daylight saving time is applied automatically where it's observed.",
      };
    },
    faq: [
      { q: "What time is it in India right now?", a: "Leave the date and time fields at their defaults (today, current time) above, set \"From\" to your own time zone, and \"To\" to India (Kolkata) to see the live current time there, including the exact offset from your zone." },
      { q: "Why is India's time zone offset like +5:30 instead of a whole number?", a: "India uses a single time zone (IST, UTC+5:30) with a half-hour offset rather than aligning to whole-hour zones - a deliberate choice made at independence to sit between the whole-hour zones that would otherwise apply across the country's width." },
      { q: "Does this account for daylight saving time?", a: "Yes - the conversion uses each time zone's actual UTC offset on the specific date you enter, so it automatically reflects daylight saving time where a zone observes it, without you needing to adjust manually." },
      { q: "Can I convert a time from the past or future, not just right now?", a: "Yes - change the date and time fields to any date; the tool still applies the correct daylight-saving rules for whichever zones and date you choose." },
    ],
    related: ["online-timer", "day-of-week-calculator", "date-duration-calculator"],
  },
  {
    id: "daylight-saving-time-calculator",
    category: "datetime",
    title: "Daylight Saving Time Calculator",
    keyword: "daylight saving time calculator",
    description: "Find when the clocks change for daylight saving time in any time zone.",
    intro: "Choose a time zone and year to find the exact dates clocks spring forward and fall back.",
    fields: [
      { id: "zone", label: "Time zone", type: "select", default: Intl.DateTimeFormat().resolvedOptions().timeZone, options: [
        { v: "America/New_York", l: "US Eastern (New York)" }, { v: "America/Chicago", l: "US Central (Chicago)" },
        { v: "America/Denver", l: "US Mountain (Denver)" }, { v: "America/Los_Angeles", l: "US Pacific (Los Angeles)" },
        { v: "America/Sao_Paulo", l: "Brazil (São Paulo)" }, { v: "UTC", l: "UTC" },
        { v: "Europe/London", l: "UK (London)" }, { v: "Europe/Paris", l: "Central Europe (Paris)" },
        { v: "Europe/Moscow", l: "Russia (Moscow)" }, { v: "Africa/Cairo", l: "Egypt (Cairo)" },
        { v: "Asia/Dubai", l: "UAE (Dubai)" }, { v: "Asia/Kolkata", l: "India (Kolkata)" },
        { v: "Asia/Shanghai", l: "China (Shanghai)" }, { v: "Asia/Tokyo", l: "Japan (Tokyo)" },
        { v: "Australia/Sydney", l: "Australia Eastern (Sydney)" }, { v: "Pacific/Auckland", l: "New Zealand (Auckland)" },
      ] },
      { id: "year", label: "Year", type: "number", default: new Date().getFullYear(), step: 1, min: 1970, max: 2100 },
    ],
    compute: (v) => {
      const getOffsetMinutes = (date, zone) => {
        const zStr = date.toLocaleString("en-US", { timeZone: zone });
        const uStr = date.toLocaleString("en-US", { timeZone: "UTC" });
        return (new Date(zStr) - new Date(uStr)) / 60000;
      };
      const transitions = [];
      let prevOffset = null;
      for (let d = 1; d <= 366; d++) {
        const date = new Date(Date.UTC(v.year, 0, d, 12));
        if (date.getUTCFullYear() !== v.year) break;
        const off = getOffsetMinutes(date, v.zone);
        if (prevOffset !== null && off !== prevOffset) {
          transitions.push({ date: new Date(Date.UTC(v.year, 0, d)), springsForward: off > prevOffset });
        }
        prevOffset = off;
      }
      if (transitions.length === 0) {
        return {
          primary: { label: "Daylight saving time", value: "Not observed" },
          secondary: [{ l: "Time zone", v: v.zone }],
          note: "This time zone doesn't change its clocks for daylight saving time.",
        };
      }
      const fmt = (d) => d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
      const springForward = transitions.find((t) => t.springsForward);
      const fallBack = transitions.find((t) => !t.springsForward);
      return {
        primary: { label: "Clocks spring forward", value: springForward ? fmt(springForward.date) : "N/A" },
        secondary: [
          { l: "Clocks fall back", v: fallBack ? fmt(fallBack.date) : "N/A" },
        ],
        note: "Clocks spring forward (lose an hour) at the start of daylight saving time, and fall back (gain an hour) when it ends - based on this time zone's actual observed rules for the selected year.",
      };
    },
    faq: [
      { q: "When do clocks change for daylight saving time in the US?", a: "US clocks spring forward on the second Sunday of March and fall back on the first Sunday of November - select a US zone above to see the exact dates for any year." },
      { q: "When does the UK/EU change clocks?", a: "The UK and EU change clocks on the last Sunday of March (spring forward) and the last Sunday of October (fall back) - different dates than the US, which is why the time difference between the US and Europe shifts by an hour for a few weeks each spring and fall." },
      { q: "Why do some time zones not observe daylight saving time?", a: "Many regions near the equator skip it since day length barely changes across seasons there, so shifting clocks wouldn't produce any meaningful benefit. Some other regions (like most of Asia) have also chosen not to observe it for various historical or practical reasons." },
      { q: "Which direction is 'spring forward' - do I lose or gain an hour?", a: "Spring forward means clocks move ahead one hour (e.g., 2:00 AM becomes 3:00 AM), so you lose an hour of sleep that night. Fall back moves clocks back one hour, so you gain an hour." },
    ],
    related: ["time-zone-converter", "online-timer", "day-of-week-calculator"],
  },
  {
    id: "roman-numeral-converter",
    category: "math",
    title: "Roman Numeral Converter",
    keyword: "roman numeral converter",
    description: "Convert between numbers and Roman numerals, in either direction.",
    intro: "Enter a number (1-3999) or a Roman numeral to convert it to the other - the tool detects which one you typed.",
    fields: [
      { id: "value", label: "Number or Roman numeral", type: "text", default: "1994" },
    ],
    compute: (v) => {
      const input = v.value.trim();
      const romanVals = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
      const toRoman = (num) => {
        let res = "";
        let n = num;
        for (const [v2, s] of romanVals) {
          while (n >= v2) { res += s; n -= v2; }
        }
        return res;
      };
      const fromRoman = (str) => {
        const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
        let total = 0, prev = 0;
        for (let i = str.length - 1; i >= 0; i--) {
          const val = map[str[i]];
          if (val === undefined) return null;
          if (val < prev) total -= val; else { total += val; prev = val; }
        }
        return total;
      };
      if (/^[0-9]+$/.test(input)) {
        const num = parseInt(input, 10);
        if (num < 1 || num > 3999) {
          return { primary: { label: "Out of range", value: "Enter 1-3999" }, secondary: [], note: "Standard Roman numerals only represent values from 1 to 3999." };
        }
        return {
          primary: { label: "Roman numeral", value: toRoman(num) },
          secondary: [{ l: "Number", v: num }],
        };
      }
      const upper = input.toUpperCase();
      const num = fromRoman(upper);
      if (num === null || num < 1 || toRoman(num) !== upper) {
        return { primary: { label: "Not a valid Roman numeral", value: input }, secondary: [], note: "Check the spelling - Roman numerals only use the letters I, V, X, L, C, D, and M." };
      }
      return {
        primary: { label: "Number", value: num },
        secondary: [{ l: "Roman numeral", v: upper }],
      };
    },
    faq: [
      { q: "What is 1994 in Roman numerals?", a: "MCMXCIV - 1000 (M) + 900 (CM) + 90 (XC) + 4 (IV)." },
      { q: "What is 58 in Roman numerals?", a: "LVIII - 50 (L) + 5 (V) + 1 + 1 + 1 (III)." },
      { q: "What's the highest number Roman numerals can represent?", a: "Standard Roman numerals go up to 3,999 (MMMCMXCIX) - there's no standard symbol for 4,000 or higher without using an overline or other extended notation." },
      { q: "Why is 4 written as IV instead of IIII?", a: "Roman numerals use a subtractive rule for four specific cases (IV, IX, XL, XC, CD, CM) where a smaller symbol placed before a larger one is subtracted - this keeps numbers shorter than repeating a symbol four times, though IIII does appear historically, especially on clock faces." },
      { q: "How do I convert a Roman numeral back to a regular number?", a: "Type the Roman numeral (like MCMXCIV) into the field above instead of a number - the tool automatically detects whether you entered digits or Roman numerals and converts to the other." },
    ],
    related: ["percentage-calculator", "random-number-generator", "quadratic-formula-calculator"],
  },
  {
    id: "sunrise-sunset-calculator",
    category: "datetime",
    title: "Sunrise and Sunset Calculator",
    keyword: "sunrise sunset calculator",
    description: "Find sunrise and sunset times for any date and major city.",
    intro: "Choose a city and date to see when the sun rises and sets there.",
    fields: [
      { id: "date", label: "Date", type: "date", default: todayDateString() },
      { id: "city", label: "City", type: "select", default: "New York", options: [
        { v: "New York", l: "New York, USA" }, { v: "Los Angeles", l: "Los Angeles, USA" },
        { v: "Chicago", l: "Chicago, USA" }, { v: "London", l: "London, UK" },
        { v: "Paris", l: "Paris, France" }, { v: "Berlin", l: "Berlin, Germany" },
        { v: "Moscow", l: "Moscow, Russia" }, { v: "Cairo", l: "Cairo, Egypt" },
        { v: "Dubai", l: "Dubai, UAE" }, { v: "Mumbai", l: "Mumbai, India" },
        { v: "Bangkok", l: "Bangkok, Thailand" }, { v: "Shanghai", l: "Shanghai, China" },
        { v: "Tokyo", l: "Tokyo, Japan" }, { v: "Sydney", l: "Sydney, Australia" },
        { v: "Auckland", l: "Auckland, New Zealand" }, { v: "Sao Paulo", l: "São Paulo, Brazil" },
      ] },
    ],
    compute: (v) => {
      const cities = {
        "New York": { lat: 40.7128, lon: -74.006, zone: "America/New_York" },
        "Los Angeles": { lat: 34.0522, lon: -118.2437, zone: "America/Los_Angeles" },
        "Chicago": { lat: 41.8781, lon: -87.6298, zone: "America/Chicago" },
        "London": { lat: 51.5074, lon: -0.1278, zone: "Europe/London" },
        "Paris": { lat: 48.8566, lon: 2.3522, zone: "Europe/Paris" },
        "Berlin": { lat: 52.52, lon: 13.405, zone: "Europe/Berlin" },
        "Moscow": { lat: 55.7558, lon: 37.6173, zone: "Europe/Moscow" },
        "Cairo": { lat: 30.0444, lon: 31.2357, zone: "Africa/Cairo" },
        "Dubai": { lat: 25.2048, lon: 55.2708, zone: "Asia/Dubai" },
        "Mumbai": { lat: 19.076, lon: 72.8777, zone: "Asia/Kolkata" },
        "Bangkok": { lat: 13.7563, lon: 100.5018, zone: "Asia/Bangkok" },
        "Shanghai": { lat: 31.2304, lon: 121.4737, zone: "Asia/Shanghai" },
        "Tokyo": { lat: 35.6762, lon: 139.6503, zone: "Asia/Tokyo" },
        "Sydney": { lat: -33.8688, lon: 151.2093, zone: "Australia/Sydney" },
        "Auckland": { lat: -36.8485, lon: 174.7633, zone: "Pacific/Auckland" },
        "Sao Paulo": { lat: -23.5505, lon: -46.6333, zone: "America/Sao_Paulo" },
      };
      const c = cities[v.city];
      const rad = Math.PI / 180;
      const dayMs = 86400000;
      const J1970 = 2440588, J2000 = 2451545, J0 = 0.0009;
      const e = rad * 23.4397;
      const toJulian = (d) => d.getTime() / dayMs - 0.5 + J1970;
      const fromJulian = (j) => new Date((j + 0.5 - J1970) * dayMs);
      const [yy, mm, dd] = v.date.split("-").map(Number);
      const dateNoon = new Date(Date.UTC(yy, mm - 1, dd, 12));
      const dNum = toJulian(dateNoon) - J2000;
      const solarMeanAnomaly = (d) => rad * (357.5291 + 0.98560028 * d);
      const eclipticLongitude = (M) => M + rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)) + rad * 102.9372 + Math.PI;
      const declination = (l) => Math.asin(Math.sin(l) * Math.sin(e));
      const lw = rad * -c.lon;
      const phi = rad * c.lat;
      const n = Math.round(dNum - J0 - lw / (2 * Math.PI));
      const approxTransit = (Ht) => J0 + (Ht + lw) / (2 * Math.PI) + n;
      const ds = approxTransit(0);
      const M = solarMeanAnomaly(ds);
      const L = eclipticLongitude(M);
      const dec = declination(L);
      const solarTransitJ = (dsx) => J2000 + dsx + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
      const Jnoon = solarTransitJ(ds);
      const h0 = -0.833 * rad;
      const cosW = (Math.sin(h0) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec));
      const fmt = (j) => fromJulian(j).toLocaleTimeString("en-US", { timeZone: c.zone, hour: "2-digit", minute: "2-digit" });
      if (cosW > 1) {
        return { primary: { label: "Sunrise/sunset", value: "No sunrise (polar night)" }, secondary: [], note: "The sun stays below the horizon all day at this latitude and date." };
      }
      if (cosW < -1) {
        return { primary: { label: "Sunrise/sunset", value: "No sunset (midnight sun)" }, secondary: [], note: "The sun stays above the horizon all day at this latitude and date." };
      }
      const w = Math.acos(cosW);
      const Jset = solarTransitJ(approxTransit(w));
      const Jrise = Jnoon - (Jset - Jnoon);
      const daylightMinutes = Math.round((Jset - Jrise) * 1440);
      return {
        primary: { label: "Sunrise", value: fmt(Jrise) },
        secondary: [
          { l: "Sunset", v: fmt(Jset) },
          { l: "Daylight", v: `${Math.floor(daylightMinutes / 60)}h ${daylightMinutes % 60}m` },
        ],
        note: "Calculated from the sun's position for this date and location, accurate to within about a minute - actual visible sunrise/sunset can shift slightly with local horizon obstructions and atmospheric conditions.",
      };
    },
    faq: [
      { q: "How is sunrise time calculated?", a: "From the sun's position (declination and hour angle) for the given date and location, using standard solar position equations - the same underlying astronomy used by observatories and navigation, accurate to within about a minute." },
      { q: "Why are sunrise and sunset times different every day?", a: "Earth's axial tilt (about 23.4°) means the sun's path across the sky shifts throughout the year as the planet orbits, changing day length and the exact rise/set times - most dramatically near the solstices and least around the equinoxes." },
      { q: "What does 'midnight sun' or 'polar night' mean?", a: "Near the poles, at some times of year the sun never sets (midnight sun, in summer) or never rises (polar night, in winter) - this calculator flags those cases instead of showing a sunrise/sunset time that doesn't exist." },
      { q: "Does this account for daylight saving time?", a: "Yes - times are shown in the selected city's local time zone, which automatically reflects daylight saving time if that zone observes it on the chosen date." },
    ],
    related: ["time-zone-converter", "daylight-saving-time-calculator", "day-of-week-calculator"],
  },
  {
    id: "sun-position-calculator",
    category: "datetime",
    title: "Sun Position Calculator",
    keyword: "sun position calculator",
    description: "Find the sun's altitude and azimuth (solar noon, direction, and height in the sky) for any date, time, and city.",
    intro: "Choose a city, date, and time to find the sun's altitude and azimuth (compass direction) at that moment, plus solar noon for the day.",
    fields: [
      { id: "date", label: "Date", type: "date", default: todayDateString() },
      { id: "time", label: "Time (24-hour, HH:MM)", type: "text", default: nowTimeString() },
      { id: "city", label: "City", type: "select", default: "New York", options: [
        { v: "New York", l: "New York, USA" }, { v: "Los Angeles", l: "Los Angeles, USA" },
        { v: "Chicago", l: "Chicago, USA" }, { v: "London", l: "London, UK" },
        { v: "Paris", l: "Paris, France" }, { v: "Berlin", l: "Berlin, Germany" },
        { v: "Moscow", l: "Moscow, Russia" }, { v: "Cairo", l: "Cairo, Egypt" },
        { v: "Dubai", l: "Dubai, UAE" }, { v: "Mumbai", l: "Mumbai, India" },
        { v: "Bangkok", l: "Bangkok, Thailand" }, { v: "Shanghai", l: "Shanghai, China" },
        { v: "Tokyo", l: "Tokyo, Japan" }, { v: "Sydney", l: "Sydney, Australia" },
        { v: "Auckland", l: "Auckland, New Zealand" }, { v: "Sao Paulo", l: "São Paulo, Brazil" },
      ] },
    ],
    compute: (v) => {
      const cities = {
        "New York": { lat: 40.7128, lon: -74.006, zone: "America/New_York" },
        "Los Angeles": { lat: 34.0522, lon: -118.2437, zone: "America/Los_Angeles" },
        "Chicago": { lat: 41.8781, lon: -87.6298, zone: "America/Chicago" },
        "London": { lat: 51.5074, lon: -0.1278, zone: "Europe/London" },
        "Paris": { lat: 48.8566, lon: 2.3522, zone: "Europe/Paris" },
        "Berlin": { lat: 52.52, lon: 13.405, zone: "Europe/Berlin" },
        "Moscow": { lat: 55.7558, lon: 37.6173, zone: "Europe/Moscow" },
        "Cairo": { lat: 30.0444, lon: 31.2357, zone: "Africa/Cairo" },
        "Dubai": { lat: 25.2048, lon: 55.2708, zone: "Asia/Dubai" },
        "Mumbai": { lat: 19.076, lon: 72.8777, zone: "Asia/Kolkata" },
        "Bangkok": { lat: 13.7563, lon: 100.5018, zone: "Asia/Bangkok" },
        "Shanghai": { lat: 31.2304, lon: 121.4737, zone: "Asia/Shanghai" },
        "Tokyo": { lat: 35.6762, lon: 139.6503, zone: "Asia/Tokyo" },
        "Sydney": { lat: -33.8688, lon: 151.2093, zone: "Australia/Sydney" },
        "Auckland": { lat: -36.8485, lon: 174.7633, zone: "Pacific/Auckland" },
        "Sao Paulo": { lat: -23.5505, lon: -46.6333, zone: "America/Sao_Paulo" },
      };
      const c = cities[v.city];
      const rad = Math.PI / 180;
      const dayMs = 86400000;
      const J1970 = 2440588, J2000 = 2451545, J0 = 0.0009;
      const e = rad * 23.4397;
      const toJulian = (d) => d.getTime() / dayMs - 0.5 + J1970;
      const [hh, min] = (v.time || "12:00").split(":").map(Number);
      const timeStr = `${String(hh).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
      const asUTC = new Date(`${v.date}T${timeStr}:00Z`);
      const getOffsetMinutes = (date, zone) => {
        const zStr = date.toLocaleString("en-US", { timeZone: zone });
        const uStr = date.toLocaleString("en-US", { timeZone: "UTC" });
        return (new Date(zStr) - new Date(uStr)) / 60000;
      };
      const offsetMin = getOffsetMinutes(asUTC, c.zone);
      const dateAtTime = new Date(asUTC.getTime() - offsetMin * 60000);
      const dNum = toJulian(dateAtTime) - J2000;
      const rightAscension = (l) => Math.atan2(Math.sin(l) * Math.cos(e), Math.cos(l));
      const declination = (l) => Math.asin(Math.sin(l) * Math.sin(e));
      const solarMeanAnomaly = (d) => rad * (357.5291 + 0.98560028 * d);
      const eclipticLongitude = (M) => M + rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)) + rad * 102.9372 + Math.PI;
      const M = solarMeanAnomaly(dNum);
      const L = eclipticLongitude(M);
      const dec = declination(L);
      const ra = rightAscension(L);
      const lw = rad * -c.lon;
      const phi = rad * c.lat;
      const siderealTime = rad * (280.16 + 360.9856235 * dNum) - lw;
      const H = siderealTime - ra;
      const azimuthSouth = Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
      const azimuth = ((azimuthSouth / rad) + 180 + 360) % 360;
      const altitude = Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H)) / rad;
      const n = Math.round(dNum - J0 - lw / (2 * Math.PI));
      const ds = J0 + lw / (2 * Math.PI) + n;
      const Mnoon = solarMeanAnomaly(ds);
      const Lnoon = eclipticLongitude(Mnoon);
      const Jnoon = J2000 + ds + 0.0053 * Math.sin(Mnoon) - 0.0069 * Math.sin(2 * Lnoon);
      const fromJulian = (j) => new Date((j + 0.5 - J1970) * dayMs);
      const solarNoon = fromJulian(Jnoon).toLocaleTimeString("en-US", { timeZone: c.zone, hour: "2-digit", minute: "2-digit" });
      const compassPoints = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      const compass = compassPoints[Math.round(azimuth / 22.5) % 16];
      return {
        primary: { label: "Sun altitude", value: `${round(altitude, 2)}°${altitude < 0 ? " (below horizon)" : ""}` },
        secondary: [
          { l: "Azimuth (from N, clockwise)", v: `${round(azimuth, 2)}° (${compass})` },
          { l: "Solar noon today", v: solarNoon },
        ],
        note: "Altitude is the sun's height above the horizon (90° = directly overhead, 0° = on the horizon, negative = below). Azimuth is compass direction, measured clockwise from north. Accurate to within about a degree.",
      };
    },
    faq: [
      { q: "What does 'sun altitude' mean?", a: "The angle of the sun above the horizon - 0° means the sun is right on the horizon (sunrise/sunset), 90° means directly overhead, and negative values mean the sun is below the horizon (nighttime)." },
      { q: "What does 'azimuth' mean?", a: "The sun's compass direction, measured in degrees clockwise from north - 0°/360° is north, 90° is east, 180° is south, and 270° is west. This tool also shows the nearest compass point (like SE or WNW) for easier reading." },
      { q: "What is solar noon?", a: "The moment the sun reaches its highest point in the sky for that day (due south in the Northern Hemisphere, due north in the Southern Hemisphere) - it's rarely exactly 12:00 local clock time, since clock time is standardized across a whole time zone while solar noon depends on your exact longitude." },
      { q: "Why isn't solar noon at exactly 12:00?", a: "Two reasons: your exact longitude within your time zone shifts solar noon from the zone's reference meridian, and the \"equation of time\" (Earth's elliptical orbit and axial tilt) shifts it by up to about 16 minutes throughout the year, even at a fixed longitude." },
    ],
    related: ["sunrise-sunset-calculator", "time-zone-converter", "daylight-saving-time-calculator"],
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
      { q: "Is this the same as a 'calculator birthday' or 'age calculator net' search?", a: "Yes - both describe calculating exact age from a birth date, which is exactly what this tool does. Enter your birth date above to see your exact age in years, months, and days." },
      { q: "Is 'age calculator from birth date' or 'count age from date of birth' different from this tool?", a: "No - all three phrasings describe the same task: entering a birth date to get an exact age. Enter your birth date above to get started." },
      { q: "Is 'age calculator by birth date' the same as this tool?", a: "Yes - that's exactly what this calculator does. Enter your birth date above to see your exact age in years, months, and days." },
    ],
    related: ["days-until-calculator", "dog-age-calculator"],
  },
  {
    id: "birth-year-calculator",
    category: "datetime",
    title: "Birth Year Calculator",
    keyword: "birth year calculator",
    description: "Estimate someone's birth year (or year range) from their current age.",
    intro: "Enter a current age to estimate the birth year - since the exact birthday isn't known, this gives the two possible years.",
    fields: [
      { id: "age", label: "Current age", type: "number", default: 30, step: 1, min: 0 },
    ],
    compute: (v) => {
      const currentYear = new Date().getFullYear();
      const earlierYear = currentYear - v.age - 1;
      const laterYear = currentYear - v.age;
      return {
        primary: { label: "Possible birth year", value: `${earlierYear} or ${laterYear}` },
        secondary: [
          { l: "If birthday hasn't happened yet this year", v: earlierYear },
          { l: "If birthday already happened this year", v: laterYear },
        ],
        note: "Age alone doesn't pin down an exact birth year without knowing whether this year's birthday has already passed - both years shown are equally possible.",
      };
    },
    faq: [
      { q: "Why does this give two possible birth years instead of one?", a: "Because \"age\" alone doesn't specify a birth date - someone who is 30 today was born in the current year minus 30 if their birthday already happened this year, or the current year minus 31 if it hasn't happened yet. Without knowing the birth month and day, both are equally valid." },
      { q: "How do I calculate my exact birth year if I know my birthday?", a: "If you know the specific birth date, use the Age Calculator instead - enter the birth date directly and it tells you the exact age, rather than working backward from age alone with two possible years." },
      { q: "Is 'calculate DOB from age' the same as this tool?", a: "Not quite - DOB (date of birth) includes month and day, which age alone can't determine. This calculator estimates the birth year specifically; the exact day and month within that year isn't recoverable from age alone." },
      { q: "Someone told me their age - how do I figure out 'when was he born'?", a: "Enter their age above to get the two possible birth years - without knowing whether their birthday has happened yet this year, that's as precise as age alone allows." },
    ],
    related: ["age-calculator", "days-until-calculator", "date-duration-calculator"],
  },

  // ---------------- EVERYDAY CONVERSIONS ----------------
  {
    id: "unit-length-converter",
    category: "conversions",
    title: "CM to Inches Converter",
    keyword: "cm to inches converter",
    description: "Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.",
    intro: "Enter a value and choose units to convert between common metric and imperial length measurements.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 100, step: 0.01 },
      { id: "from", label: "From", type: "select", default: "cm", options: [
        { v: "mm", l: "Millimeters" }, { v: "cm", l: "Centimeters" }, { v: "m", l: "Meters" }, { v: "km", l: "Kilometers" },
        { v: "in", l: "Inches" }, { v: "ft", l: "Feet" }, { v: "yd", l: "Yards" }, { v: "mi", l: "Miles" },
      ] },
    ],
    compute: (v) => {
      const toCm = { mm: 0.1, cm: 1, m: 100, km: 100000, in: 2.54, ft: 30.48, yd: 91.44, mi: 160934.4 };
      const cmValue = v.value * toCm[v.from];
      return {
        primary: { label: "In centimeters", value: `${round(cmValue, 4)} cm` },
        secondary: [
          { l: "Inches", v: round(cmValue / toCm.in, 4) },
          { l: "Feet", v: round(cmValue / toCm.ft, 4) },
          { l: "Meters", v: round(cmValue / toCm.m, 4) },
          { l: "Kilometers", v: round(cmValue / toCm.km, 6) },
        ],
      };
    },
    faq: [
      { q: "How many inches is a centimeter?", a: "1 centimeter equals about 0.3937 inches. To convert cm to inches, divide by 2.54." },
      { q: "Is this conversion exact or rounded?", a: "The underlying conversion factor (1 inch = 2.54 cm) is exact by international definition - any rounding you see is just the displayed result being trimmed to a readable number of decimal places." },
      { q: "Why do some online converters give a slightly different answer?", a: "Small differences usually come from rounding at different decimal places, not a different conversion factor - the underlying 1 inch = 2.54 cm relationship is a fixed international standard, so any accurate converter should agree once you compare at the same precision." },
      { q: "Which length units does this converter support?", a: "This tool converts between metric units (millimeters, centimeters, meters, kilometers) and imperial/US units (inches, feet, yards, miles), so you can convert in either direction without memorizing conversion factors." },
      { q: "How many centimeters are in a kilometer?", a: "100,000 centimeters - a kilometer is 1,000 meters, and each meter is 100 centimeters, so 1,000 × 100 = 100,000 cm." },
      { q: "How tall is 175 cm in feet and inches?", a: "175 cm is about 5 feet 8.9 inches (68.9 inches total) - divide 175 by 2.54 to get inches, then divide by 12 for feet, with the remainder as extra inches. Enter 175 with \"Centimeters\" selected above to see this and other unit conversions at once." },
      { q: "Is 'feet in to cm' the same as this converter?", a: "Yes - this tool converts feet to centimeters and centimeters to feet (along with several other length units), in either direction." },
      { q: "Is 'feet inches centimeters,' 'foot and inches to cm,' or 'ft inch to cm' different from this tool?", a: "No - all of these describe converting between feet/inches and centimeters, which this converter handles alongside several other length units." },
      { q: "How tall is 5 feet 8 inches in centimeters?", a: "About 172.7 cm - convert to total inches (5×12+8=68), then multiply by 2.54 (68×2.54=172.72 cm). Enter 68 with \"Inches\" selected above to confirm." },
      { q: "How tall is 5 feet 9 inches in centimeters?", a: "About 175.26 cm - convert to total inches (5×12+9=69), then multiply by 2.54 (69×2.54=175.26 cm)." },
      { q: "How many feet is 210 cm?", a: "About 6 feet 10.7 inches - divide 210 by 2.54 to get 82.68 inches, then divide by 12 for feet (6) with the remainder in inches (10.68). Enter 210 with \"Centimeters\" selected above to confirm." },
      { q: "How many inches is 210 cm?", a: "About 82.68 inches - divide 210 by 2.54. Enter 210 with \"Centimeters\" selected above to confirm." },
      { q: "How many feet is 108 inches?", a: "Exactly 9 feet - divide 108 by 12. Enter 108 with \"Inches\" selected above to confirm." },
      { q: "How many inches is a millimeter?", a: "1 millimeter equals about 0.03937 inches - divide millimeters by 25.4, or select \"Millimeters\" above and enter your value to see the exact inch equivalent alongside every other supported unit." },
    ],
    related: ["weight-converter", "cooking-converter", "concrete-calculator"],
  },
  {
    id: "time-unit-converter",
    category: "conversions",
    title: "Time Unit Converter",
    keyword: "time unit converter",
    description: "Convert between seconds, minutes, hours, days, weeks, and years.",
    intro: "Enter a value and choose a unit to convert it into seconds, minutes, hours, days, and weeks.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 1, step: 0.1 },
      { id: "from", label: "From", type: "select", default: "hours", options: [
        { v: "seconds", l: "Seconds" }, { v: "minutes", l: "Minutes" }, { v: "hours", l: "Hours" },
        { v: "days", l: "Days" }, { v: "weeks", l: "Weeks" }, { v: "months", l: "Months (avg.)" }, { v: "years", l: "Years" },
      ] },
    ],
    compute: (v) => {
      const toSeconds = { seconds: 1, minutes: 60, hours: 3600, days: 86400, weeks: 604800, months: 2629800, years: 31557600 };
      const totalSeconds = v.value * toSeconds[v.from];
      return {
        primary: { label: "In seconds", value: round(totalSeconds, 2).toLocaleString() },
        secondary: [
          { l: "Minutes", v: round(totalSeconds / 60, 4).toLocaleString() },
          { l: "Hours", v: round(totalSeconds / 3600, 4).toLocaleString() },
          { l: "Days", v: round(totalSeconds / 86400, 4).toLocaleString() },
          { l: "Weeks", v: round(totalSeconds / 604800, 4).toLocaleString() },
        ],
        note: "Months and years use average lengths (30.44 and 365.25 days) since calendar months and leap years vary - for exact calendar-date math, use the Date Duration Calculator instead.",
      };
    },
    faq: [
      { q: "How many seconds are in a day?", a: "86,400 seconds - 24 hours × 60 minutes × 60 seconds." },
      { q: "Why does this use 365.25 days for a year instead of 365?", a: "365.25 accounts for leap years - a solar year is actually about 365.2422 days, and adding a leap day roughly every 4 years keeps the calendar aligned with Earth's orbit, so 365.25 is a more accurate long-run average than a flat 365." },
      { q: "Should I use this or the Date Duration Calculator to find days between two dates?", a: "Use the Date Duration Calculator for that - it works from actual calendar dates and accounts for real month lengths and leap years exactly. This tool is for converting a plain quantity (like \"3.5 hours\") between units, not for calendar-date math." },
    ],
    related: ["time-duration-calculator", "date-duration-calculator", "unit-length-converter"],
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
      { q: "What is 180°C in an oven, in Fahrenheit?", a: "356°F exactly, though recipes almost always round oven temperatures to the nearest common setting - 180°C is the standard rounded equivalent of 350°F, a very common baking temperature, even though the precise conversion is a few degrees higher." },
      { q: "What is 100°F in Celsius?", a: "About 37.8°C - subtract 32, then multiply by 5/9: (100−32)×5/9 = 68×5/9 ≈ 37.78°C. That's just above normal human body temperature (37°C), which is why 100°F often feels notably hot outdoors." },
      { q: "What is 170°F in Celsius?", a: "About 76.7°C - (170−32)×5/9 = 138×5/9 ≈ 76.67°C." },
      { q: "What is 73°F in Celsius?", a: "About 22.8°C - (73−32)×5/9 = 41×5/9 ≈ 22.78°C, a comfortable room temperature." },
      { q: "What is 43°F in Celsius?", a: "About 6.1°C - (43−32)×5/9 = 11×5/9 ≈ 6.11°C, just above refrigerator temperature." },
      { q: "What is 43°C in Fahrenheit?", a: "109.4°F - multiply by 9/5 and add 32: 43×9/5+32 = 77.4+32 = 109.4°F, a high fever range if referring to body temperature (though a healthy human body temperature never actually reaches 43°C)." },
      { q: "What is 73°C in Fahrenheit?", a: "163.4°F - multiply by 9/5 and add 32: 73×9/5+32 = 131.4+32 = 163.4°F." },
      { q: "What is 65°F in Celsius?", a: "About 18.3°C - (65−32)×5/9 = 33×5/9 ≈ 18.33°C, a mild, comfortable temperature." },
      { q: "What is 37°F in Celsius?", a: "About 2.8°C - (37−32)×5/9 = 5×5/9 ≈ 2.78°C, just above freezing." },
      { q: "What is 98°F in Celsius?", a: "About 36.7°C - (98−32)×5/9 = 66×5/9 ≈ 36.67°C, very close to normal human body temperature (which is closer to 98.6°F / 37°C)." },
      { q: "What is 18°C in Fahrenheit?", a: "64.4°F - multiply by 9/5 and add 32: 18×9/5+32 = 32.4+32 = 64.4°F, a mild spring/fall temperature." },
      { q: "What is 40°F in Celsius?", a: "About 4.4°C - (40−32)×5/9 = 8×5/9 ≈ 4.44°C, a cold, near-refrigerator temperature." },
      { q: "What is 165°C in Fahrenheit?", a: "329°F - multiply by 9/5 and add 32: 165×9/5+32 = 297+32 = 329°F, a typical baking oven temperature." },
      { q: "What is 165°F in Celsius?", a: "About 73.9°C - (165−32)×5/9 = 133×5/9 ≈ 73.89°C." },
      { q: "What is 65°C in Fahrenheit?", a: "149°F - multiply by 9/5 and add 32: 65×9/5+32 = 117+32 = 149°F." },
      { q: "What is 106°F in Celsius?", a: "About 41.1°C - (106−32)×5/9 = 74×5/9 ≈ 41.11°C, a dangerously high fever temperature if referring to body temperature." },
      { q: "What is 36.7°C in Fahrenheit?", a: "98.06°F - multiply by 9/5 and add 32: 36.7×9/5+32 = 66.06+32 = 98.06°F, right around normal human body temperature." },
    ],
    related: ["weight-converter", "volume-converter", "unit-length-converter"],
  },
  {
    id: "oven-temperature-converter",
    category: "conversions",
    title: "Oven Temperature Converter",
    keyword: "oven temperature converter",
    description: "Convert oven temperatures between Celsius, Fahrenheit, and UK Gas Mark.",
    intro: "Enter a temperature to convert between Celsius, Fahrenheit, and the UK Gas Mark scale used on older British ovens.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 180, step: 1 },
      { id: "from", label: "From", type: "select", default: "c", options: [
        { v: "c", l: "Celsius" }, { v: "f", l: "Fahrenheit" }, { v: "gas", l: "Gas Mark" },
      ] },
    ],
    compute: (v) => {
      const gasMarkTable = [
        { mark: "1/4", c: 110, f: 225 }, { mark: "1/2", c: 120, f: 250 }, { mark: "1", c: 140, f: 275 },
        { mark: "2", c: 150, f: 300 }, { mark: "3", c: 160, f: 325 }, { mark: "4", c: 180, f: 350 },
        { mark: "5", c: 190, f: 375 }, { mark: "6", c: 200, f: 400 }, { mark: "7", c: 220, f: 425 },
        { mark: "8", c: 230, f: 450 }, { mark: "9", c: 240, f: 475 },
      ];
      let celsius;
      if (v.from === "c") celsius = v.value;
      else if (v.from === "f") celsius = (v.value - 32) * (5 / 9);
      else {
        const entry = gasMarkTable.reduce((closest, e) => Math.abs(parseFloat(e.mark) - v.value) < Math.abs(parseFloat(closest.mark) - v.value) ? e : closest, gasMarkTable[0]);
        celsius = entry.c;
      }
      const fahrenheit = celsius * (9 / 5) + 32;
      const closestGasMark = gasMarkTable.reduce((closest, e) => Math.abs(e.c - celsius) < Math.abs(closest.c - celsius) ? e : closest, gasMarkTable[0]);
      return {
        primary: { label: "Celsius", value: `${round(celsius, 0)}°C` },
        secondary: [
          { l: "Fahrenheit", v: `${round(fahrenheit, 0)}°F` },
          { l: "Closest Gas Mark", v: closestGasMark.mark },
        ],
        note: "Gas Mark is a stepped scale (whole and half numbers only), so the closest match is shown rather than an exact conversion - most home ovens round to the nearest standard setting anyway.",
      };
    },
    faq: [
      { q: "What is Gas Mark 4 in Celsius and Fahrenheit?", a: "180°C, which converts to 356°F exactly (though many recipe charts round this to the conventional 350°F pairing) - Gas Mark 4 is one of the most common baking temperatures, standard for cakes and general baking in UK recipes." },
      { q: "What is 200°C in Gas Mark?", a: "Gas Mark 6 - 200°C is a common temperature for roasting." },
      { q: "Why does Gas Mark use fractions like 1/4 and 1/2 at the low end?", a: "Gas Mark's lowest settings (1/4 and 1/2, corresponding to 110°C/225°F and 120°C/250°F) are used for very low, slow cooking like meringues or slow roasts, and the fractional notation is a historical convention from the original UK gas oven dial markings." },
      { q: "Is Gas Mark still used today?", a: "Mostly in older UK recipes and some British cookbooks - most modern ovens, including in the UK, use Celsius directly, but Gas Mark conversions are still commonly included for compatibility with older recipes and gas ovens that still use the dial system." },
    ],
    related: ["temperature-converter", "cooking-converter", "volume-converter"],
  },
  {
    id: "mix-ratio-calculator",
    category: "construction",
    title: "Mix Ratio Calculator",
    keyword: "epoxy mix ratio calculator",
    description: "Calculate the amounts of two components needed for a given mix ratio, like epoxy or paint.",
    intro: "Enter your total amount needed and the mix ratio (like 2:1) to calculate how much of each component to use.",
    fields: [
      { id: "totalAmount", label: "Total amount needed", type: "number", default: 300, step: 1 },
      { id: "ratioA", label: "Part A ratio", type: "number", default: 2, step: 0.1, min: 0.01 },
      { id: "ratioB", label: "Part B ratio", type: "number", default: 1, step: 0.1, min: 0.01 },
    ],
    compute: (v) => {
      const totalRatio = v.ratioA + v.ratioB;
      const unit = v.totalAmount / totalRatio;
      const amountA = unit * v.ratioA;
      const amountB = unit * v.ratioB;
      return {
        primary: { label: "Part A amount", value: round(amountA, 2) },
        secondary: [
          { l: "Part B amount", v: round(amountB, 2) },
          { l: "Ratio simplified", v: `${round(v.ratioA / v.ratioB, 3)}:1` },
        ],
        note: "Part A + Part B = total amount, split in the ratio you entered. Use the same unit (weight or volume) consistently - check your product's instructions for whether it specifies a ratio by weight or by volume, since they can differ.",
      };
    },
    faq: [
      { q: "How do I calculate a 2:1 epoxy mix for 300ml total?", a: "Divide 300 by (2+1)=3 to get 100 per unit, then multiply: Part A = 100×2 = 200ml, Part B = 100×1 = 100ml." },
      { q: "Does it matter if I mix by weight or by volume?", a: "Yes - always check the product's instructions. Some epoxies and paints specify ratios by volume, others by weight, and using the wrong basis can produce an incorrectly cured or mixed product even if you follow the numeric ratio correctly." },
      { q: "What happens if I get the mix ratio wrong?", a: "For epoxy and other reactive products, an incorrect ratio can prevent proper curing, leaving the mixture tacky, brittle, or never fully hardening - unlike simple dilutions, these reactions typically need close to the exact specified ratio to work correctly." },
      { q: "Can I use this for paint tinting or other non-reactive mixes too?", a: "Yes - the same proportional math applies to any two-part mix ratio, reactive or not, including paint tinting, cleaning solution dilution, or fuel-oil mixes for 2-stroke engines." },
    ],
    related: ["paint-calculator", "concrete-calculator", "ratio-calculator"],
  },
  {
    id: "rainfall-volume-calculator",
    category: "conversions",
    title: "Rainfall to Volume Calculator",
    keyword: "rainfall to volume calculator",
    description: "Convert rainfall depth over an area into total water volume.",
    intro: "Enter the rainfall depth and the catchment area to calculate the total volume of water collected.",
    fields: [
      { id: "depth", label: "Rainfall depth", type: "number", unit: "mm", default: 10, step: 0.1 },
      { id: "area", label: "Catchment area", type: "number", unit: "m²", default: 100, step: 1 },
    ],
    compute: (v) => {
      const liters = v.depth * v.area;
      const gallons = liters * 0.264172;
      return {
        primary: { label: "Volume collected", value: `${round(liters, 1)} L` },
        secondary: [
          { l: "US gallons", v: round(gallons, 1) },
          { l: "Cubic meters", v: round(liters / 1000, 4) },
        ],
        note: "1 mm of rainfall over 1 m² of catchment area equals exactly 1 liter of water (since 1 mm = 0.001 m, and 0.001 m × 1 m² = 0.001 m³ = 1 L). Assumes 100% capture with no runoff loss.",
      };
    },
    faq: [
      { q: "How do I convert rainfall in mm to liters?", a: "Multiply the rainfall depth (mm) by the catchment area (m²) - the result is directly in liters, since 1 mm over 1 m² equals exactly 1 liter." },
      { q: "How much water does 10mm of rain produce over a 100m² roof?", a: "1,000 liters - 10mm × 100m² = 1,000, and each 1mm-over-1m² unit equals 1 liter." },
      { q: "Why does 1mm of rain over 1 square meter equal exactly 1 liter?", a: "1mm = 0.001 meters, so 0.001m × 1m² = 0.001 cubic meters, and 1 cubic meter equals 1,000 liters, so 0.001 m³ = 1 liter exactly - the units work out perfectly because a liter is defined as 0.001 cubic meters." },
      { q: "Does this account for runoff losses?", a: "No - it assumes 100% of the rain falling on the area is captured, which is realistic for a smooth, sealed roof feeding a collection system but overestimates yield for permeable surfaces like soil or gravel, where some water soaks in or evaporates instead of running off." },
    ],
    related: ["volume-converter", "unit-length-converter", "concrete-calculator"],
  },
  {
    id: "calories-burned-calculator",
    category: "health",
    title: "Calories Burned Calculator",
    keyword: "calories burned calculator",
    description: "Estimate calories burned during an activity using its MET value.",
    intro: "Choose an activity and enter your weight and duration to estimate calories burned, using standard MET (Metabolic Equivalent of Task) values.",
    fields: [
      { id: "activity", label: "Activity", type: "select", default: "running_6mph", options: [
        { v: "walking_3mph", l: "Walking, 3 mph (MET 3.5)" },
        { v: "walking_4mph", l: "Walking, 4 mph, brisk (MET 5.0)" },
        { v: "running_5mph", l: "Running, 5 mph (MET 8.3)" },
        { v: "running_6mph", l: "Running, 6 mph (MET 9.8)" },
        { v: "running_8mph", l: "Running, 8 mph (MET 11.8)" },
        { v: "cycling_moderate", l: "Cycling, moderate (MET 8.0)" },
        { v: "swimming_moderate", l: "Swimming, moderate (MET 6.0)" },
        { v: "weightTraining", l: "Weight training, general (MET 3.5)" },
        { v: "yoga", l: "Yoga (MET 2.5)" },
        { v: "hiking", l: "Hiking (MET 6.0)" },
      ] },
      { id: "weightLb", label: "Weight", type: "number", unit: "lb", default: 160, step: 1 },
      { id: "durationMin", label: "Duration", type: "number", unit: "min", default: 30, step: 1 },
    ],
    compute: (v) => {
      const metValues = {
        walking_3mph: 3.5, walking_4mph: 5.0, running_5mph: 8.3, running_6mph: 9.8, running_8mph: 11.8,
        cycling_moderate: 8.0, swimming_moderate: 6.0, weightTraining: 3.5, yoga: 2.5, hiking: 6.0,
      };
      const met = metValues[v.activity];
      const weightKg = v.weightLb * 0.453592;
      const hours = v.durationMin / 60;
      const calories = met * weightKg * hours;
      return {
        primary: { label: "Calories burned", value: round(calories, 0) },
        secondary: [
          { l: "MET value", v: met },
          { l: "Calories/minute", v: round(calories / v.durationMin, 1) },
        ],
        note: "Calories = MET × body weight (kg) × duration (hours). MET values are standardized averages from published research; actual burn varies with intensity, fitness level, and individual metabolism.",
      };
    },
    faq: [
      { q: "What is a MET value?", a: "Metabolic Equivalent of Task - a standardized measure of how many times more energy an activity uses compared to resting quietly (MET 1.0). Running at 6 mph (MET 9.8) burns roughly 9.8 times more energy than sitting still." },
      { q: "How are calories burned calculated from MET?", a: "Calories = MET × weight in kilograms × duration in hours. A 160 lb (72.6 kg) person running at 6 mph (MET 9.8) for 30 minutes burns about 9.8 × 72.6 × 0.5 ≈ 356 calories." },
      { q: "Why does weight affect calories burned for the same activity?", a: "Moving more body mass takes more energy - a heavier person burns more calories doing the identical activity at the identical intensity than a lighter person, since MET-based estimates scale directly with body weight." },
      { q: "How accurate are MET-based calorie estimates?", a: "They're population averages, not individual measurements - actual calorie burn varies with fitness level, exact intensity, terrain, and individual metabolism, so treat this as a reasonable estimate rather than a precise figure, similar to what fitness trackers and gym equipment typically show." },
    ],
    related: ["calorie-calculator", "bmr-calculator", "pace-calculator"],
  },
  {
    id: "water-density-calculator",
    category: "conversions",
    title: "Water Density Calculator",
    keyword: "water density calculator",
    description: "Calculate the density of water at a given temperature.",
    intro: "Enter a water temperature to calculate its density, since water's density changes slightly (and non-linearly) with temperature.",
    fields: [
      { id: "tempC", label: "Temperature", type: "number", unit: "°C", default: 20, step: 0.5 },
    ],
    compute: (v) => {
      const points = [
        [0, 999.84], [4, 999.97], [10, 999.70], [20, 998.20], [25, 997.05],
        [30, 995.65], [40, 992.22], [50, 988.03], [60, 983.20], [70, 977.76],
        [80, 971.79], [90, 965.31], [100, 958.37],
      ];
      let t = v.tempC;
      if (t < 0) t = 0;
      if (t > 100) t = 100;
      let density = points[points.length - 1][1];
      for (let i = 0; i < points.length - 1; i++) {
        const [t1, d1] = points[i];
        const [t2, d2] = points[i + 1];
        if (t >= t1 && t <= t2) {
          density = d1 + ((t - t1) / (t2 - t1)) * (d2 - d1);
          break;
        }
      }
      return {
        primary: { label: "Density", value: `${round(density, 2)} kg/m³` },
        secondary: [
          { l: "g/cm³ (g/mL)", v: round(density / 1000, 4) },
          { l: "lb/ft³", v: round(density * 0.062428, 2) },
        ],
        note: v.tempC < 0 || v.tempC > 100 ? "Clamped to the 0-100°C liquid water range - values outside that need to account for ice or steam, which this calculator doesn't cover." : "At standard atmospheric pressure, for pure (fresh) water. Interpolated between standard reference points.",
      };
    },
    faq: [
      { q: "What is the density of water at room temperature?", a: "About 998.2 kg/m³ (0.9982 g/cm³) at 20°C, which is commonly used as \"room temperature\" - very close to, but not exactly, the commonly rounded figure of 1,000 kg/m³ (1 g/cm³) used in everyday estimates." },
      { q: "Why isn't water's density exactly 1,000 kg/m³ except at one specific temperature?", a: "1,000 kg/m³ (1 g/cm³) is only exact at 3.98°C, water's point of maximum density - a quirk caused by hydrogen bonding effects that make water denser as it warms from 0°C up to about 4°C, before behaving normally and getting less dense as it warms further." },
      { q: "Does salt water have the same density as this calculator shows?", a: "No - this calculator is for pure (fresh) water only. Seawater is denser due to dissolved salts, typically around 1,020-1,029 kg/m³ at the surface depending on salinity and temperature, meaningfully higher than fresh water at the same temperature." },
      { q: "Where can I find the density of the water at a specific temperature?", a: "Enter that temperature above and this calculator gives you the density directly, interpolated from standard reference values between 0°C and 100°C - no need to look it up in a printed table." },
    ],
    related: ["volume-converter", "weight-converter", "unit-length-converter"],
  },
  {
    id: "distance-modulus-calculator",
    category: "math",
    title: "Distance Modulus Calculator",
    keyword: "distance modulus calculator",
    description: "Calculate astronomical distance from apparent and absolute magnitude, or vice versa.",
    intro: "Enter apparent magnitude (m) and absolute magnitude (M) to find distance, or distance and one magnitude to find the other.",
    fields: [
      { id: "solveFor", label: "Solve for", type: "select", default: "distance", options: [
        { v: "distance", l: "Distance (from m and M)" }, { v: "absolute", l: "Absolute magnitude (from m and distance)" }, { v: "apparent", l: "Apparent magnitude (from M and distance)" },
      ] },
      { id: "apparentMag", label: "Apparent magnitude (m)", type: "number", default: 10, step: 0.01 },
      { id: "absoluteMag", label: "Absolute magnitude (M)", type: "number", default: 5, step: 0.01 },
      { id: "distance", label: "Distance", type: "number", unit: "parsecs", default: 100, step: 1 },
    ],
    compute: (v) => {
      if (v.solveFor === "distance") {
        const modulus = v.apparentMag - v.absoluteMag;
        const d = Math.pow(10, (modulus + 5) / 5);
        return {
          primary: { label: "Distance", value: `${round(d, 4)} pc` },
          secondary: [
            { l: "Distance modulus (m−M)", v: round(modulus, 4) },
            { l: "Light-years", v: round(d * 3.26156, 2) },
          ],
          note: "d (parsecs) = 10^((m − M + 5) / 5).",
        };
      }
      if (v.solveFor === "absolute") {
        const M = v.apparentMag - 5 * Math.log10(v.distance) + 5;
        return {
          primary: { label: "Absolute magnitude (M)", value: round(M, 4) },
          secondary: [{ l: "Distance modulus (m−M)", v: round(v.apparentMag - M, 4) }],
          note: "M = m − 5×log₁₀(d) + 5, with d in parsecs.",
        };
      }
      const m = v.absoluteMag + 5 * Math.log10(v.distance) - 5;
      return {
        primary: { label: "Apparent magnitude (m)", value: round(m, 4) },
        secondary: [{ l: "Distance modulus (m−M)", v: round(m - v.absoluteMag, 4) }],
        note: "m = M + 5×log₁₀(d) − 5, with d in parsecs.",
      };
    },
    faq: [
      { q: "What is the distance modulus?", a: "m − M, the difference between an object's apparent magnitude (how bright it looks from Earth) and its absolute magnitude (how bright it would look from a standard 10-parsec distance) - it's directly related to distance." },
      { q: "How do I find distance from apparent and absolute magnitude?", a: "d = 10^((m − M + 5) / 5), with distance in parsecs. For m=10 and M=5: d = 10^((5+5)/5) = 10² = 100 parsecs." },
      { q: "Why does a distance modulus of exactly 0 mean 10 parsecs?", a: "Absolute magnitude is defined as the apparent magnitude an object would have at exactly 10 parsecs - so when m equals M (modulus = 0), the object actually is at 10 parsecs, and the formula d = 10^((0+5)/5) = 10¹ = 10 confirms this." },
      { q: "How do I convert the distance to light-years?", a: "Multiply parsecs by about 3.26156 - one parsec equals approximately 3.26 light-years." },
    ],
    related: ["sunrise-sunset-calculator", "square-root-calculator", "z-score-calculator"],
  },
  {
    id: "earthquake-magnitude-calculator",
    category: "math",
    title: "Earthquake Magnitude Energy Calculator",
    keyword: "earthquake magnitude calculator",
    description: "Compare the energy released by two earthquake magnitudes.",
    intro: "Enter two earthquake magnitudes to compare how much more energy the larger one releases.",
    fields: [
      { id: "magnitude1", label: "Magnitude 1", type: "number", default: 6.0, step: 0.1 },
      { id: "magnitude2", label: "Magnitude 2", type: "number", default: 7.0, step: 0.1 },
    ],
    compute: (v) => {
      const energy1 = Math.pow(10, 1.5 * v.magnitude1 + 4.8);
      const energy2 = Math.pow(10, 1.5 * v.magnitude2 + 4.8);
      const ratio = energy2 / energy1;
      const amplitudeRatio = Math.pow(10, v.magnitude2 - v.magnitude1);
      return {
        primary: { label: "Energy ratio (M2 ÷ M1)", value: `${round(ratio, 2)}×` },
        secondary: [
          { l: `Energy at M${v.magnitude1}`, v: `${energy1.toExponential(3)} J` },
          { l: `Energy at M${v.magnitude2}`, v: `${energy2.toExponential(3)} J` },
          { l: "Amplitude ratio", v: `${round(amplitudeRatio, 2)}×` },
        ],
        note: "Uses the Gutenberg-Richter relation: energy (joules) = 10^(1.5×magnitude + 4.8). Each whole-number increase in magnitude releases about 31.6× more energy, and produces 10× the ground-motion amplitude.",
      };
    },
    faq: [
      { q: "How much more energy does a magnitude 7 earthquake release than a magnitude 6?", a: "About 31.6 times more - each whole-number increase in the Richter/moment magnitude scale corresponds to roughly 31.6× more released energy, following the formula energy = 10^(1.5×M + 4.8) joules." },
      { q: "Why does a 1-point magnitude increase mean 10× the shaking but 31.6× the energy?", a: "The magnitude scale is defined logarithmically on ground-motion amplitude (10× per whole point), but energy scales with amplitude to the 1.5 power, not 1-to-1 - so a 10× amplitude increase corresponds to 10^1.5 ≈ 31.6× more energy." },
      { q: "What does the Gutenberg-Richter energy formula assume?", a: "It's an empirical relationship calibrated to typical earthquake source characteristics - it gives a good general estimate but the exact energy of a specific earthquake also depends on factors like fault geometry, depth, and rupture duration that aren't captured by magnitude alone." },
      { q: "Is this the Richter scale or the moment magnitude scale?", a: "The energy formula works the same way for both, since modern earthquake reporting mostly uses moment magnitude (Mw), which was designed to align closely with the original Richter scale's numbers for most earthquakes while working better for very large events." },
    ],
    related: ["pressure-altitude-calculator", "sun-position-calculator", "half-life-calculator"],
  },
  {
    id: "pressure-altitude-calculator",
    category: "math",
    title: "Pressure Altitude Calculator",
    keyword: "pressure altitude calculator",
    description: "Calculate pressure altitude from field elevation and altimeter setting.",
    intro: "Enter your field elevation and current altimeter setting to calculate pressure altitude, using the standard atmosphere reference of 29.92 inHg.",
    fields: [
      { id: "elevation", label: "Field elevation", type: "number", unit: "ft", default: 1000, step: 10 },
      { id: "altimeterSetting", label: "Altimeter setting", type: "number", unit: "inHg", default: 29.42, step: 0.01 },
    ],
    compute: (v) => {
      const pressureAltitude = v.elevation + (29.92 - v.altimeterSetting) * 1000;
      return {
        primary: { label: "Pressure altitude", value: `${round(pressureAltitude, 0)} ft` },
        secondary: [{ l: "Difference from elevation", v: `${round(pressureAltitude - v.elevation, 0)} ft` }],
        note: "Pressure altitude = field elevation + (29.92 − altimeter setting) × 1,000. Used in aviation for performance calculations, especially above the transition altitude where all aircraft use the standard 29.92 inHg setting.",
      };
    },
    faq: [
      { q: "What is pressure altitude?", a: "The altitude indicated when an altimeter is set to the standard atmospheric pressure of 29.92 inHg (1013.25 hPa), rather than the local altimeter setting - it's used for aircraft performance calculations and above the transition altitude." },
      { q: "How do I calculate pressure altitude?", a: "Add (29.92 − current altimeter setting) × 1,000 to your field elevation. For an elevation of 1,000 ft and an altimeter setting of 29.42: 1,000 + (29.92 − 29.42) × 1,000 = 1,500 ft." },
      { q: "Why does a lower altimeter setting increase pressure altitude?", a: "A lower altimeter setting means the actual air pressure is lower than standard, which happens at effectively higher altitudes in the standard atmosphere - so the formula adds altitude to compensate, reflecting that the air is \"thinner\" than the field elevation alone would suggest." },
      { q: "What's the difference between pressure altitude and density altitude?", a: "Pressure altitude only accounts for atmospheric pressure. Density altitude goes a step further and also corrects for temperature (and humidity), since less dense air - whether from lower pressure or higher temperature - affects aircraft and engine performance similarly." },
    ],
    related: ["unit-length-converter", "pressure-converter", "sunrise-sunset-calculator"],
  },
  {
    id: "time-zone-meeting-planner",
    category: "datetime",
    title: "Time Zone Meeting Planner",
    keyword: "time zone meeting planner",
    description: "See a meeting time across multiple time zones at once.",
    intro: "Enter a date and time in your zone, then see the equivalent local time in three other zones at a glance.",
    fields: [
      { id: "date", label: "Date", type: "date", default: todayDateString() },
      { id: "time", label: "Time (24-hour, HH:MM)", type: "text", default: nowTimeString() },
      { id: "baseZone", label: "Your time zone", type: "select", default: Intl.DateTimeFormat().resolvedOptions().timeZone, options: [
        { v: "America/New_York", l: "US Eastern (New York)" }, { v: "America/Chicago", l: "US Central (Chicago)" },
        { v: "America/Denver", l: "US Mountain (Denver)" }, { v: "America/Los_Angeles", l: "US Pacific (Los Angeles)" },
        { v: "UTC", l: "UTC" }, { v: "Europe/London", l: "UK (London)" }, { v: "Europe/Paris", l: "Central Europe (Paris)" },
        { v: "Asia/Dubai", l: "UAE (Dubai)" }, { v: "Asia/Kolkata", l: "India (Kolkata)" },
        { v: "Asia/Shanghai", l: "China (Shanghai)" }, { v: "Asia/Tokyo", l: "Japan (Tokyo)" },
        { v: "Australia/Sydney", l: "Australia Eastern (Sydney)" },
      ] },
      { id: "zone2", label: "Attendee 2 time zone", type: "select", default: "Europe/London", options: [
        { v: "America/New_York", l: "US Eastern (New York)" }, { v: "America/Chicago", l: "US Central (Chicago)" },
        { v: "America/Denver", l: "US Mountain (Denver)" }, { v: "America/Los_Angeles", l: "US Pacific (Los Angeles)" },
        { v: "UTC", l: "UTC" }, { v: "Europe/London", l: "UK (London)" }, { v: "Europe/Paris", l: "Central Europe (Paris)" },
        { v: "Asia/Dubai", l: "UAE (Dubai)" }, { v: "Asia/Kolkata", l: "India (Kolkata)" },
        { v: "Asia/Shanghai", l: "China (Shanghai)" }, { v: "Asia/Tokyo", l: "Japan (Tokyo)" },
        { v: "Australia/Sydney", l: "Australia Eastern (Sydney)" },
      ] },
      { id: "zone3", label: "Attendee 3 time zone", type: "select", default: "Asia/Kolkata", options: [
        { v: "America/New_York", l: "US Eastern (New York)" }, { v: "America/Chicago", l: "US Central (Chicago)" },
        { v: "America/Denver", l: "US Mountain (Denver)" }, { v: "America/Los_Angeles", l: "US Pacific (Los Angeles)" },
        { v: "UTC", l: "UTC" }, { v: "Europe/London", l: "UK (London)" }, { v: "Europe/Paris", l: "Central Europe (Paris)" },
        { v: "Asia/Dubai", l: "UAE (Dubai)" }, { v: "Asia/Kolkata", l: "India (Kolkata)" },
        { v: "Asia/Shanghai", l: "China (Shanghai)" }, { v: "Asia/Tokyo", l: "Japan (Tokyo)" },
        { v: "Australia/Sydney", l: "Australia Eastern (Sydney)" },
      ] },
    ],
    compute: (v) => {
      const getOffsetMinutes = (date, zone) => {
        const zStr = date.toLocaleString("en-US", { timeZone: zone });
        const uStr = date.toLocaleString("en-US", { timeZone: "UTC" });
        return (new Date(zStr) - new Date(uStr)) / 60000;
      };
      const [hh, mm] = v.time.split(":").map(Number);
      const timeStr = `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
      const asUTC = new Date(`${v.date}T${timeStr}:00Z`);
      const baseOffsetMin = getOffsetMinutes(asUTC, v.baseZone);
      const realUTC = new Date(asUTC.getTime() - baseOffsetMin * 60000);
      const fmt = (zone) => realUTC.toLocaleString("en-US", {
        timeZone: zone, weekday: "short", hour: "2-digit", minute: "2-digit", hour12: true,
      });
      return {
        primary: { label: "Your time", value: fmt(v.baseZone) },
        secondary: [
          { l: "Attendee 2", v: fmt(v.zone2) },
          { l: "Attendee 3", v: fmt(v.zone3) },
        ],
        note: "Automatically applies each zone's actual daylight saving rules for the selected date.",
      };
    },
    faq: [
      { q: "How is this different from the Time Zone Converter?", a: "The Time Zone Converter shows one time converted between two zones. This tool shows a single meeting time across three zones simultaneously, useful for scheduling a call with people in different locations at once." },
      { q: "Does this handle daylight saving time correctly?", a: "Yes - it applies each zone's actual observed DST rules for the specific date you enter, so the displayed times are correct even during DST transition periods." },
      { q: "Can I use this for more than 3 time zones?", a: "This tool shows your zone plus two others at once. For additional zones, use the Time Zone Converter to check each one individually against your base time." },
      { q: "Why do the day names sometimes differ between zones?", a: "A meeting late at night in one zone can fall on the next calendar day in a zone further east, or the previous day in a zone further west - the weekday shown for each attendee accounts for this correctly." },
    ],
    related: ["time-zone-converter", "daylight-saving-time-calculator", "online-timer"],
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
      { q: "How many pounds is 200 grams?", a: "About 0.441 pounds - multiply grams by 0.00220462, or divide by 453.592 (grams per pound). 200g is a relatively small weight, well under half a pound." },
      { q: "How many ounces is 200 grams?", a: "About 7.05 ounces - divide grams by 28.3495 (grams per ounce). 200g ÷ 28.3495 ≈ 7.05 oz." },
    ],
    related: ["unit-length-converter", "volume-converter", "temperature-converter", "speed-converter"],
  },
  {
    id: "volume-converter",
    category: "conversions",
    title: "Volume Converter",
    keyword: "volume converter",
    description: "Convert between liters, gallons, quarts, fluid ounces, cups, milliliters, teaspoons, and tablespoons.",
    intro: "Enter a value and choose a starting unit to convert between common volume measurements.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 1, step: 0.01 },
      { id: "from", label: "From", type: "select", default: "gal", options: [
        { v: "l", l: "Liters" }, { v: "gal", l: "Gallons" }, { v: "qt", l: "Quarts" }, { v: "cup", l: "Cups" }, { v: "floz", l: "Fluid ounces" }, { v: "ml", l: "Milliliters" },
        { v: "tbsp", l: "Tablespoons" }, { v: "tsp", l: "Teaspoons" },
      ] },
    ],
    compute: (v) => {
      const toLiters = { l: 1, gal: 3.78541, qt: 0.946353, cup: 0.236588, floz: 0.0295735, ml: 0.001, tbsp: 0.0147868, tsp: 0.00492892 };
      const litersValue = v.value * toLiters[v.from];
      return {
        primary: { label: "In liters", value: `${round(litersValue, 3)} L` },
        secondary: [
          { l: "Gallons", v: round(litersValue / toLiters.gal, 3) },
          { l: "Quarts", v: round(litersValue / toLiters.qt, 3) },
          { l: "Cups", v: round(litersValue / toLiters.cup, 2) },
          { l: "Fluid ounces", v: round(litersValue / toLiters.floz, 2) },
          { l: "Milliliters", v: round(litersValue / toLiters.ml, 0) },
          { l: "Tablespoons", v: round(litersValue / toLiters.tbsp, 2) },
          { l: "Teaspoons", v: round(litersValue / toLiters.tsp, 2) },
        ],
      };
    },
    faq: [
      { q: "How many liters is a gallon?", a: "1 US gallon equals about 3.785 liters. To convert gallons to liters, multiply by 3.78541." },
      { q: "Is a US gallon the same as a UK gallon?", a: "No - a US gallon (3.785 L) is smaller than a UK/imperial gallon (4.546 L). This converter uses US gallons; adjust accordingly if you need imperial units." },
      { q: "Why is a US pint different from an imperial pint?", a: "The US and imperial (UK) systems define their base units differently - a US gallon is smaller than an imperial gallon, and since a pint is defined as a fraction of a gallon in each system, US pints (16 fl oz) end up smaller than imperial pints (20 fl oz)." },
      { q: "How many milliliters are in a fluid ounce?", a: "One US fluid ounce equals approximately 29.57 milliliters. This differs slightly from the UK/imperial fluid ounce (about 28.41 mL), so it's worth checking which standard a recipe or product label is using before converting." },
      { q: "A teaspoon is how many tablespoons?", a: "1 US teaspoon is 1/3 of a tablespoon, so 1 tablespoon equals exactly 3 teaspoons. Select \"Teaspoons\" or \"Tablespoons\" above to convert either direction, alongside liters, gallons, cups, and milliliters." },
      { q: "How many fluid ounces are in a gallon?", a: "Exactly 128 US fluid ounces per gallon - a gallon is defined as 128 fl oz, so 1 gallon ÷ 128 gives the fl oz-to-gallon conversion factor directly. Select \"Gallons\" or \"Fluid ounces\" above to convert either direction." },
      { q: "How many quarts are in a gallon?", a: "Exactly 4 quarts per US gallon - a quart is literally defined as a quarter-gallon. Select \"Gallons\" or \"Quarts\" above to convert between them alongside the other supported units." },
      { q: "How many cups are in a tablespoon?", a: "1 tablespoon is 1/16 of a cup, so there are 16 tablespoons in a cup. Select \"Tablespoons\" or \"Cups\" above to convert either direction." },
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
      { q: "How many grams are in a cup?", a: "It depends on the ingredient - a cup of flour is about 120g, a cup of granulated sugar is about 200g, and a cup of butter is about 227g, since cups measure volume and grams measure weight. Choose your ingredient above for the exact figure." },
      { q: "Is '1 cup in grams' or '1 cup to g' the same question as 'cup to grams'?", a: "Yes - all of these ask the same thing: how many grams are in one cup of a given ingredient. Enter 1 in the cups field and pick your ingredient above for the exact figure." },
      { q: "Is '1 cups to grams' (plural) different from '1 cup to grams'?", a: "No - it's the same question with a grammar slip. Enter 1 in the cups field above for the answer either way." },
      { q: "Is a 'cup to gram calculator' the same as this tool?", a: "Yes - that's exactly what this calculator does. Choose your ingredient and enter a number of cups above to get the equivalent weight in grams." },
      { q: "Is 'cups to grams' without a number the same question?", a: "Yes - it's asking for the same conversion, just without specifying an amount. Enter however many cups you have above (1, 2, 0.5, etc.) to get the exact grams for your ingredient." },
      { q: "How many cups are in a certain number of grams?", a: "Divide the gram amount by the grams-per-cup figure for your ingredient - 240g of flour, for example, is 240 ÷ 120 = 2 cups. This calculator converts cups to grams directly; for grams to cups, divide your gram amount by the per-cup weight shown for your ingredient above." },
      { q: "A cup is how many grams?", a: "It depends entirely on the ingredient, since a cup measures volume and grams measure weight - select your ingredient above (flour, sugar, butter, or brown sugar) to see its specific grams-per-cup figure." },
      { q: "How many grams is 1/2 cup?", a: "Enter 0.5 in the cups field above - for example, 1/2 cup of flour is about 60g, while 1/2 cup of butter is about 113.5g, since the per-cup weight varies by ingredient density." },
      { q: "How many grams are in 1 1/2 cups of sugar?", a: "About 300g for granulated sugar - enter 1.5 in the cups field with sugar selected above (200g per cup × 1.5 = 300g)." },
      { q: "How many grams is 2 1/2 cups?", a: "It depends on the ingredient - enter 2.5 in the cups field above with your ingredient selected. For flour that's about 300g, and for sugar it's about 500g, since the per-cup weight varies by density." },
      { q: "How many grams is 3/4 cup?", a: "Enter 0.75 in the cups field above with your ingredient selected - for flour that's about 90g, and for sugar it's about 150g." },
      { q: "How many grams is 1 cup, in general?", a: "There's no single answer without knowing the ingredient - it ranges from about 120g (flour) to 227g (butter) per cup for the ingredients this calculator covers, since denser ingredients pack more weight into the same volume." },
      { q: "Why do recipes from different countries use different measurement systems?", a: "The US primarily uses volume-based cup and spoon measurements, while most of the rest of the world uses weight-based metric measurements (grams), which are more precise for baking since ingredient density varies. This converter bridges the two so you can follow a recipe written in either system." },
    ],
    related: ["unit-length-converter", "volume-converter", "paint-calculator"],
  },
  {
    id: "microwave-wattage-converter",
    category: "conversions",
    title: "Microwave Wattage Converter",
    keyword: "microwave wattage converter",
    description: "Adjust a recipe's cooking time when your microwave's wattage is different from the recipe's.",
    intro: "Enter the recipe's original time and wattage, plus your microwave's wattage, to get an adjusted cooking time.",
    fields: [
      { id: "originalTime", label: "Recipe's cook time", type: "number", unit: "min", default: 5, step: 0.5 },
      { id: "originalWattage", label: "Recipe's wattage", type: "number", unit: "W", default: 1000, step: 50 },
      { id: "yourWattage", label: "Your microwave's wattage", type: "number", unit: "W", default: 700, step: 50 },
    ],
    compute: (v) => {
      const newTime = v.originalTime * (v.originalWattage / v.yourWattage);
      const newMin = Math.floor(newTime);
      const newSec = Math.round((newTime - newMin) * 60);
      return {
        primary: { label: "Adjusted cook time", value: `${round(newTime, 2)} min` },
        secondary: [{ l: "As min:sec", v: `${newMin}:${String(newSec).padStart(2, "0")}` }],
        note: "Power and time are inversely proportional for the same total energy delivered - a lower-wattage microwave needs proportionally longer. Check food periodically since actual results can vary by microwave and food type.",
      };
    },
    faq: [
      { q: "How do I convert a 1000W recipe time to 700W?", a: "Multiply the original time by (1000 ÷ 700) ≈ 1.43. A 5-minute recipe at 1000W needs about 7.14 minutes (7 min 9 sec) at 700W." },
      { q: "Why does lower wattage need more time, not less?", a: "Wattage measures how much energy the microwave delivers per second - a lower-wattage microwave delivers less energy per second, so it takes proportionally longer to deliver the same total amount of energy (and therefore the same amount of cooking)." },
      { q: "Is this conversion exact?", a: "It's a close approximation based on the inverse relationship between power and time, but actual results can vary by food type, quantity, and microwave design - check food periodically rather than relying on the adjusted time alone, especially for longer cook times." },
      { q: "What's a typical microwave wattage?", a: "Most home microwaves range from 600W (compact/older models) to 1200W (large, newer models), with 1000W-1100W being common for standard full-size microwaves - check the wattage printed inside the door or in the manual." },
    ],
    related: ["temperature-converter", "cooking-converter", "unit-length-converter"],
  },
  {
    id: "electricity-cost-calculator",
    category: "conversions",
    title: "Electricity Cost Calculator",
    keyword: "electricity cost calculator",
    description: "Calculate the electricity cost of running an appliance, from its wattage, usage time, and your rate.",
    intro: "Enter an appliance's wattage, how long you run it, and your electricity rate to calculate the cost.",
    fields: [
      { id: "watts", label: "Power draw", type: "number", unit: "watts", default: 100, step: 1, min: 0 },
      { id: "hoursPerDay", label: "Hours used per day", type: "number", unit: "hours", default: 5, step: 0.1, min: 0 },
      { id: "days", label: "Number of days", type: "number", default: 30, step: 1, min: 1 },
      { id: "ratePerKwh", label: "Electricity rate", type: "number", unit: "$/kWh", default: 0.15, step: 0.001, min: 0 },
    ],
    compute: (v) => {
      const kwhPerDay = (v.watts / 1000) * v.hoursPerDay;
      const totalKwh = kwhPerDay * v.days;
      const totalCost = totalKwh * v.ratePerKwh;
      const costPerDay = kwhPerDay * v.ratePerKwh;
      return {
        primary: { label: "Total cost", value: `$${round(totalCost, 2).toLocaleString()}` },
        secondary: [
          { l: "Cost per day", v: `$${round(costPerDay, 4)}` },
          { l: "Total energy used", v: `${round(totalKwh, 3)} kWh` },
        ],
        note: "Energy (kWh) = watts ÷ 1000 × hours used. Cost = energy (kWh) × your rate per kWh. Check your utility bill for your actual rate, since it often varies by usage tier or time of day.",
      };
    },
    faq: [
      { q: "How much does it cost to run a 100W device for 5 hours a day?", a: "At a typical rate of $0.15/kWh: about $0.075 per day, or roughly $2.25 over 30 days - 100W × 5 hours = 0.5 kWh per day, times $0.15." },
      { q: "How do I convert watts to kilowatt-hours?", a: "Kilowatt-hours = watts ÷ 1000 × hours of use. A 1000-watt device running for 1 hour uses exactly 1 kWh - it's a measure of total energy consumed, not just power draw." },
      { q: "Where do I find my electricity rate?", a: "Check your utility bill - it's usually listed as a price per kilowatt-hour (kWh), though many utilities use tiered or time-of-use rates that vary depending on how much you use or when, which this simple calculator doesn't account for." },
      { q: "Why does my calculated cost differ from my actual bill?", a: "Real bills often include additional fixed charges, taxes, and tiered or time-of-use pricing that a simple flat-rate calculation doesn't capture - this tool gives a good estimate for a single device's marginal cost, not a full bill prediction." },
    ],
    related: ["ohms-law-calculator", "gas-trip-cost-calculator", "microwave-wattage-converter"],
  },
  {
    id: "day-of-the-week-calculator",
    category: "datetime",
    title: "Day of the Week Calculator",
    keyword: "day of the week calculator",
    description: "Find what day of the week any date falls on, past or future.",
    intro: "Enter any date to find out what day of the week it falls on.",
    fields: [
      { id: "date", label: "Date", type: "date", default: todayDateString() },
    ],
    compute: (v) => {
      const [y, m, d] = v.date.split("-").map(Number);
      const date = new Date(Date.UTC(y, m - 1, d));
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayName = days[date.getUTCDay()];
      const dayOfYear = Math.round((date - new Date(Date.UTC(y, 0, 1))) / 86400000) + 1;
      const weekNum = Math.ceil((dayOfYear + new Date(Date.UTC(y, 0, 1)).getUTCDay()) / 7);
      return {
        primary: { label: "Day of the week", value: dayName },
        secondary: [
          { l: "Day of the year", v: dayOfYear },
          { l: "Approximate week number", v: weekNum },
        ],
        note: "Uses the proleptic Gregorian calendar, which works correctly for any date, past or future - including dates before the Gregorian calendar's 1582 adoption (calculated as if it had always been in use).",
      };
    },
    faq: [
      { q: "What day of the week was January 1, 2000?", a: "Saturday - a widely known reference date, useful for verifying day-of-week calculations." },
      { q: "How do you calculate the day of the week for any date?", a: "The most common method is Zeller's congruence, a formula that uses the day, month, and year (with January and February treated as months 13 and 14 of the previous year) to directly compute the day of the week without needing a calendar lookup." },
      { q: "Does this work for dates far in the past or future?", a: "Yes - it uses the proleptic Gregorian calendar, meaning it applies today's calendar rules consistently to any date, even before the Gregorian calendar was actually adopted in 1582. Historical dates recorded under the Julian calendar may differ from this calculation." },
      { q: "Why does knowing the day of the week matter for old or future dates?", a: "It's useful for genealogy research, verifying historical records, planning far-future events, or just satisfying curiosity about what day a birthday, anniversary, or historical event actually fell on." },
    ],
    related: ["days-until-calculator", "date-duration-calculator", "time-add-calculator"],
  },
  {
    id: "simple-interest-calculator",
    category: "finance",
    title: "Simple Interest Calculator",
    keyword: "simple interest calculator",
    description: "Calculate simple interest and total repayment from principal, rate, and time.",
    intro: "Enter the principal, annual interest rate, and time period to calculate simple interest (no compounding).",
    fields: [
      { id: "principal", label: "Principal", type: "number", unit: "$", default: 1000, step: 10, min: 0 },
      { id: "rate", label: "Annual interest rate", type: "number", unit: "%", default: 5, step: 0.01 },
      { id: "years", label: "Time", type: "number", unit: "years", default: 3, step: 0.1, min: 0 },
    ],
    compute: (v) => {
      const interest = (v.principal * v.rate * v.years) / 100;
      const total = v.principal + interest;
      return {
        primary: { label: "Simple interest", value: `$${round(interest, 2).toLocaleString()}` },
        secondary: [{ l: "Total amount", v: `$${round(total, 2).toLocaleString()}` }],
        note: "Simple interest = principal × rate × time. Unlike compound interest, simple interest is calculated only on the original principal - it never earns \"interest on interest.\"",
      };
    },
    faq: [
      { q: "How do I calculate simple interest?", a: "Interest = principal × rate × time, where rate is expressed as a decimal (or divided by 100 if using a percentage) and time is in years. A $1,000 principal at 5% for 3 years earns $1,000 × 0.05 × 3 = $150." },
      { q: "What's the difference between simple and compound interest?", a: "Simple interest is calculated only on the original principal for the entire period. Compound interest is recalculated periodically on the growing balance (principal plus previously earned interest), so it grows faster over time - use the compound interest calculator for compounding scenarios." },
      { q: "Where is simple interest actually used?", a: "Some short-term loans, certain bonds, and basic promissory notes use simple interest, since it's straightforward to calculate. Most savings accounts, credit cards, and mortgages use compound interest instead." },
      { q: "Does simple interest ever beat compound interest?", a: "For a single compounding period (like one year with annual compounding), simple and compound interest give the same result. Over multiple periods, compound interest always produces more total interest for the lender/investor (or costs more for the borrower) than simple interest at the same nominal rate." },
    ],
    related: ["compound-interest-calculator", "savings-calculator", "loan-calculator"],
  },
  {
    id: "circle-calculator",
    category: "math",
    title: "Circle Calculator",
    keyword: "circle calculator",
    description: "Calculate a circle's radius, diameter, circumference, and area from any one known value.",
    intro: "Enter any one measurement of a circle - radius, diameter, circumference, or area - to calculate the rest.",
    fields: [
      { id: "knownValue", label: "Known value", type: "select", default: "radius", options: [
        { v: "radius", l: "Radius" }, { v: "diameter", l: "Diameter" }, { v: "circumference", l: "Circumference" }, { v: "area", l: "Area" },
      ] },
      { id: "value", label: "Value", type: "number", default: 5, step: 0.01, min: 0.0001 },
    ],
    compute: (v) => {
      let radius;
      if (v.knownValue === "radius") radius = v.value;
      else if (v.knownValue === "diameter") radius = v.value / 2;
      else if (v.knownValue === "circumference") radius = v.value / (2 * Math.PI);
      else radius = Math.sqrt(v.value / Math.PI);
      const diameter = radius * 2;
      const circumference = 2 * Math.PI * radius;
      const area = Math.PI * radius * radius;
      return {
        primary: { label: "Radius", value: round(radius, 4) },
        secondary: [
          { l: "Diameter", v: round(diameter, 4) },
          { l: "Circumference", v: round(circumference, 4) },
          { l: "Area", v: round(area, 4) },
        ],
        note: "Diameter = 2 × radius. Circumference = 2π × radius. Area = π × radius². Enter any one measurement and the rest are calculated from it.",
      };
    },
    faq: [
      { q: "What is the circumference of a circle with radius 5?", a: "About 31.42 - circumference = 2 × π × 5 ≈ 31.42." },
      { q: "What is the area of a circle with radius 5?", a: "About 78.54 - area = π × 5² ≈ 78.54." },
      { q: "How do I find the radius from the circumference?", a: "Divide the circumference by 2π: radius = circumference ÷ (2×π)." },
      { q: "How do I find the radius from the area?", a: "Divide the area by π, then take the square root: radius = √(area ÷ π)." },
    ],
    related: ["right-triangle-calculator", "sector-calculator", "cylinder-volume-calculator"],
  },
  {
    id: "list-shuffler",
    category: "text",
    title: "List Shuffler",
    keyword: "list shuffler",
    description: "Shuffle a list of items into random order.",
    intro: "Paste a list of items (one per line) to shuffle them into random order.",
    fields: [
      { id: "items", label: "Items (one per line)", type: "textarea", default: "Alex\nJordan\nTaylor\nMorgan\nCasey" },
    ],
    compute: (v) => {
      const items = (v.items || "").split("\n").map((s) => s.trim()).filter(Boolean);
      const shuffled = [...items];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return {
        primary: { label: "Shuffled order", value: shuffled.length ? shuffled.join(", ") : "Enter at least one item" },
        secondary: [{ l: "Items shuffled", v: items.length }],
        note: "Click Calculate again to reshuffle.",
      };
    },
    faq: [
      { q: "How random is this shuffle?", a: "It uses the Fisher-Yates shuffle algorithm with your browser's random number generator, which gives every possible ordering an equal chance - a well-established, unbiased shuffling method." },
      { q: "Does this remove duplicate items from my list?", a: "No - it only reorders the list you enter. If your list has duplicates, they stay in the shuffled output; remove them from your input first if you don't want repeats." },
      { q: "How is this different from the Group Randomizer?", a: "This tool just reorders a single list. The Group Randomizer instead splits a list of names into a set number of teams or groups - use that one if you need to divide people up, not just reorder them." },
      { q: "Can I use this to randomize the order of a playlist, raffle entries, or presentation order?", a: "Yes - paste any list (songs, names, topics) one per line, and it works for any of those use cases the same way." },
    ],
    related: ["group-randomizer", "random-number-generator", "card-deck-shuffler"],
  },
  {
    id: "ppm-percent-converter",
    category: "conversions",
    title: "PPM to Percent Converter",
    keyword: "ppm to percent converter",
    description: "Convert between parts per million (ppm) and percent.",
    intro: "Enter a value and choose a starting unit to convert between parts per million and percent.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 500, step: 0.01 },
      { id: "from", label: "From", type: "select", default: "ppm", options: [
        { v: "ppm", l: "PPM" }, { v: "percent", l: "Percent" },
      ] },
    ],
    compute: (v) => {
      const ppm = v.from === "ppm" ? v.value : v.value * 10000;
      const percent = ppm / 10000;
      return {
        primary: { label: "In PPM", value: round(ppm, 6) },
        secondary: [{ l: "In percent", v: `${round(percent, 6)}%` }],
        note: "1% = 10,000 ppm, since \"percent\" means parts per hundred and \"ppm\" means parts per million - the ratio between them is 1,000,000 ÷ 100 = 10,000.",
      };
    },
    faq: [
      { q: "How do I convert ppm to percent?", a: "Divide by 10,000. 500 ppm ÷ 10,000 = 0.05%." },
      { q: "How do I convert percent to ppm?", a: "Multiply by 10,000. 0.05% × 10,000 = 500 ppm." },
      { q: "Why is ppm used instead of percent for very small concentrations?", a: "Percent becomes awkward for tiny concentrations (like 0.0005%), so ppm - parts per million - is used instead for readability, common in water quality, air pollution, and chemistry measurements where concentrations are very low." },
      { q: "What is 1 ppm as a percent?", a: "0.0001% - one part per million is one ten-thousandth of a percent." },
    ],
    related: ["percentage-calculator", "percentage-change-calculator", "water-density-calculator"],
  },
  {
    id: "repeating-decimal-to-fraction-calculator",
    category: "math",
    title: "Repeating Decimal to Fraction Calculator",
    keyword: "repeating decimal to fraction calculator",
    description: "Convert a repeating decimal into an exact fraction, with steps.",
    intro: "Enter the non-repeating digits and repeating digits after the decimal point to convert to an exact fraction.",
    fields: [
      { id: "nonRepeating", label: "Non-repeating digits (after decimal, before the repeat)", type: "text", default: "1" },
      { id: "repeating", label: "Repeating digits", type: "text", default: "6" },
    ],
    compute: (v) => {
      const nonRep = (v.nonRepeating || "").replace(/\D/g, "");
      const rep = (v.repeating || "").replace(/\D/g, "");
      if (!rep) {
        return { primary: { label: "Enter repeating digits", value: "-" }, secondary: [], note: "This tool needs at least one repeating digit to work." };
      }
      const n = nonRep.length;
      const m = rep.length;
      const combined = parseInt((nonRep + rep) || "0", 10);
      const nonRepNum = parseInt(nonRep || "0", 10);
      const numerator = combined - nonRepNum;
      const denominator = Math.pow(10, n + m) - Math.pow(10, n);
      const g = gcd(numerator, denominator);
      const simpNum = g ? numerator / g : numerator;
      const simpDen = g ? denominator / g : denominator;
      return {
        primary: { label: "Fraction", value: `${simpNum}/${simpDen}` },
        secondary: [
          { l: "As decimal", v: `0.${nonRep}${rep.split("").map((d) => d).join("")}...` },
          { l: "Before simplifying", v: `${numerator}/${denominator}` },
        ],
        note: `Numerator = ${combined} − ${nonRepNum} = ${numerator}. Denominator = 10^${n + m} − 10^${n} = ${denominator}. Then reduced by the GCD.`,
      };
    },
    faq: [
      { q: "What is 0.1666... (0.1 with 6 repeating) as a fraction?", a: "1/6 - with non-repeating digit \"1\" and repeating digit \"6\": numerator = 16 − 1 = 15, denominator = 100 − 10 = 90, and 15/90 simplifies to 1/6." },
      { q: "What is 0.333... (repeating 3) as a fraction?", a: "1/3 - leave the non-repeating field empty and enter \"3\" as the repeating digit: numerator = 3 − 0 = 3, denominator = 10 − 1 = 9, and 3/9 simplifies to 1/3." },
      { q: "Why does the denominator use powers of 10?", a: "Each decimal place represents a power of ten, so shifting the repeating block by its own length and subtracting cancels out the infinite repetition algebraically, leaving a finite fraction - the powers of 10 come directly from how many digits are in each part." },
      { q: "Does this work for decimals with no non-repeating part, like 0.727272...?", a: "Yes - leave the non-repeating field empty and enter \"72\" as the repeating digits; the calculator treats a blank non-repeating part as zero digits." },
    ],
    related: ["fraction-calculator", "gcd-lcm-calculator", "percentage-calculator"],
  },
  {
    id: "permutations-combinations-calculator",
    category: "math",
    title: "Permutations and Combinations Calculator",
    keyword: "permutations and combinations calculator",
    description: "Calculate nPr (permutations) and nCr (combinations) for a set of n items chosen r at a time.",
    intro: "Enter n (total items) and r (items chosen) to calculate permutations (order matters) and combinations (order doesn't matter).",
    fields: [
      { id: "n", label: "n (total items)", type: "number", default: 10, step: 1, min: 0 },
      { id: "r", label: "r (items chosen)", type: "number", default: 3, step: 1, min: 0 },
    ],
    compute: (v) => {
      const n = Math.round(v.n);
      const r = Math.round(v.r);
      if (r > n || n < 0 || r < 0) {
        return { primary: { label: "Invalid input", value: "r can't exceed n" }, secondary: [], note: "n and r must be non-negative whole numbers, and r can't be larger than n." };
      }
      const factorial = (x) => {
        let result = 1;
        for (let i = 2; i <= x; i++) result *= i;
        return result;
      };
      const nPr = factorial(n) / factorial(n - r);
      const nCr = nPr / factorial(r);
      return {
        primary: { label: "Permutations (nPr)", value: nPr.toLocaleString() },
        secondary: [{ l: "Combinations (nCr)", v: nCr.toLocaleString() }],
        note: "Permutations count arrangements where order matters; combinations count selections where order doesn't - combinations are always permutations divided by r! (the number of ways to reorder each selection).",
      };
    },
    faq: [
      { q: "What's the difference between a permutation and a combination?", a: "Permutations count arrangements where order matters (like a race's 1st/2nd/3rd place); combinations count selections where order doesn't matter (like picking a 3-person committee). The same group of items counted as a permutation is always larger, since it counts each ordering separately." },
      { q: "What is 10 choose 3 (10C3)?", a: "120 - using nCr = n! / (r! × (n-r)!): 10! / (3! × 7!) = 3,628,800 / (6 × 5,040) = 120." },
      { q: "What is 10P3?", a: "720 - using nPr = n! / (n-r)!: 10! / 7! = 10 × 9 × 8 = 720." },
      { q: "Why is nPr always nCr multiplied by r!?", a: "Every combination of r items can be arranged in r! different orders, and each of those orderings counts as a separate permutation - so permutations = combinations × r!, or equivalently combinations = permutations ÷ r!." },
    ],
    related: ["gcd-lcm-calculator", "lottery-odds-calculator", "poker-hand-probability-calculator"],
  },
  {
    id: "weighted-random-picker",
    category: "text",
    title: "Weighted Random Picker",
    keyword: "weighted random picker",
    description: "Pick a random item from a list where some items are more likely than others.",
    intro: "Enter items with their weights (one \"item, weight\" pair per line) to pick a random winner, where higher weights are more likely.",
    fields: [
      { id: "items", label: "Items with weights (one per line, as \"item, weight\")", type: "textarea", default: "Gold, 1\nSilver, 3\nBronze, 6" },
    ],
    compute: (v) => {
      const lines = (v.items || "").split("\n").map((l) => l.trim()).filter(Boolean);
      const parsed = lines.map((line) => {
        const idx = line.lastIndexOf(",");
        if (idx === -1) return null;
        const name = line.slice(0, idx).trim();
        const weight = parseFloat(line.slice(idx + 1).trim());
        return name && !isNaN(weight) && weight > 0 ? { name, weight } : null;
      }).filter(Boolean);
      if (parsed.length === 0) {
        return { primary: { label: "No valid entries", value: "-" }, secondary: [], note: "Enter each item as \"name, weight\" on its own line, with a positive number for weight." };
      }
      const totalWeight = parsed.reduce((sum, p) => sum + p.weight, 0);
      let r = Math.random() * totalWeight;
      let winner = parsed[parsed.length - 1].name;
      for (const p of parsed) {
        if (r < p.weight) { winner = p.name; break; }
        r -= p.weight;
      }
      return {
        primary: { label: "Winner", value: winner },
        secondary: parsed.map((p) => ({ l: p.name, v: `${round((p.weight / totalWeight) * 100, 1)}%` })),
        note: "Click Calculate again to pick again - each item's chance is its weight divided by the total weight of all items.",
      };
    },
    faq: [
      { q: "How does the weighting work?", a: "Each item's probability of winning equals its weight divided by the sum of all weights. If Gold=1, Silver=3, Bronze=6 (total 10), Gold has a 10% chance, Silver 30%, and Bronze 60%." },
      { q: "Can I use decimal weights?", a: "Yes - weights don't need to be whole numbers or add up to any particular total; only the ratio between them matters for the odds." },
      { q: "How is this different from the plain Random Number Generator?", a: "The Random Number Generator picks uniformly (every outcome equally likely). This tool lets you assign different odds to different items, useful for prize drawings, loot tables, or any pick where some outcomes should be more common than others." },
      { q: "What format does my list need to be in?", a: "One item per line, formatted as \"name, weight\" - for example \"Bronze, 6\". The last comma-separated value on each line is read as the weight, and everything before it is the item name." },
    ],
    related: ["random-number-generator", "group-randomizer", "list-shuffler"],
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
      { q: "How many mph is 260 km/h?", a: "About 161.6 mph - multiply km/h by 0.621371. That's a very high speed, well above typical highway limits, in the range of a high-performance sports car near top speed." },
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
      { q: "Is 'ac to ft2' the same as this converter?", a: "Yes - \"ac\" and \"ft2\" are just shorthand for acres and square feet, which this converter handles alongside square meters and square yards." },
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
    id: "torque-converter",
    category: "conversions",
    title: "Torque Converter",
    keyword: "torque converter",
    description: "Also works as an nm to ft lb converter - convert between newton-meters (Nm), foot-pounds (ft-lb), and inch-pounds (in-lb).",
    intro: "Enter a torque value and choose a starting unit to convert between newton-meters, foot-pounds, and inch-pounds.",
    fields: [
      { id: "value", label: "Value", type: "number", default: 100, step: 0.1 },
      { id: "from", label: "From", type: "select", default: "nm", options: [
        { v: "nm", l: "Newton-meters (Nm)" }, { v: "ftlb", l: "Foot-pounds (ft-lb)" }, { v: "inlb", l: "Inch-pounds (in-lb)" },
      ] },
    ],
    compute: (v) => {
      const toNm = { nm: 1, ftlb: 1.35582, inlb: 0.112985 };
      const nmValue = v.value * toNm[v.from];
      return {
        primary: { label: "In newton-meters", value: `${round(nmValue, 3)} Nm` },
        secondary: [
          { l: "Foot-pounds (ft-lb)", v: round(nmValue / toNm.ftlb, 3) },
          { l: "Inch-pounds (in-lb)", v: round(nmValue / toNm.inlb, 2) },
        ],
      };
    },
    faq: [
      { q: "How do I convert Nm to ft-lbs?", a: "Divide by 1.35582 - 1 newton-meter equals about 0.7376 foot-pounds. For example, 100 Nm converts to roughly 73.76 ft-lb, a common conversion when a torque wrench spec is given in the unit your wrench doesn't use." },
      { q: "Why does a lug nut or bolt spec list torque in Nm sometimes and ft-lb other times?", a: "Manufacturers based in metric-standard countries (and most of the auto industry globally) spec torque in newton-meters, while US-market torque wrenches and repair manuals often use foot-pounds - this converter bridges the two so you can match your spec to your wrench's units." },
      { q: "What's the difference between foot-pounds and inch-pounds?", a: "Both measure torque (a twisting force), but inch-pounds are 1/12th the size of foot-pounds, since a foot is 12 inches - inch-pounds are used for smaller fasteners where foot-pounds would be too coarse a unit (12 in-lb = 1 ft-lb)." },
      { q: "Is 'nm ft lbs,' 'nm to ft-lbs,' and 'newton meters to foot pounds' all the same conversion?", a: "Yes - \"Nm\" here is short for newton-meters (not nanometers, despite the abbreviation looking similar), and all of these phrasings ask for the same conversion this tool does: newton-meters to foot-pounds." },
    ],
    related: ["unit-length-converter", "weight-converter", "pressure-converter"],
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
  {
    id: "gear-ratio-calculator",
    category: "conversions",
    title: "Bike Gear Ratio Calculator",
    keyword: "gear ratio calculator",
    description: "Calculate gear inches and speed from wheel size, chainring, cog, and cadence.",
    intro: "Enter your wheel diameter, chainring and cog teeth, and pedaling cadence to calculate gear inches and resulting speed.",
    fields: [
      { id: "wheelDiameter", label: "Wheel diameter", type: "number", unit: "in", default: 27, step: 0.1 },
      { id: "chainring", label: "Chainring teeth", type: "number", default: 50, step: 1, min: 1 },
      { id: "cog", label: "Rear cog teeth", type: "number", default: 14, step: 1, min: 1 },
      { id: "cadence", label: "Cadence", type: "number", unit: "rpm", default: 90, step: 1 },
    ],
    compute: (v) => {
      const gearInches = v.wheelDiameter * (v.chainring / v.cog);
      const circumferenceIn = gearInches * Math.PI;
      const speedInPerMin = circumferenceIn * v.cadence;
      const speedMph = (speedInPerMin * 60) / 63360;
      const speedKph = speedMph * 1.60934;
      return {
        primary: { label: "Gear inches", value: round(gearInches, 2) },
        secondary: [
          { l: "Speed", v: `${round(speedMph, 2)} mph` },
          { l: "Speed (metric)", v: `${round(speedKph, 2)} km/h` },
        ],
        note: "Gear inches = wheel diameter × (chainring teeth ÷ cog teeth). Speed assumes no slipping and constant cadence: distance per pedal revolution = gear inches × π.",
      };
    },
    faq: [
      { q: "What are 'gear inches'?", a: "A standard way to compare bike gearing across different wheel sizes and gear combinations - it's the effective diameter (in inches) of the wheel if it were driven directly by the pedals with a 1:1 ratio, calculated as wheel diameter × (chainring teeth ÷ cog teeth)." },
      { q: "How do I calculate speed from cadence and gearing?", a: "Each pedal revolution moves the bike forward by (gear inches × π) - multiply that by your cadence (revolutions per minute) to get distance per minute, then convert to your preferred speed unit." },
      { q: "What's a typical gear-inch range for road cycling?", a: "Roughly 20-30 gear inches for steep climbs up to 100-130+ gear inches for fast flat riding or descents, depending on rider strength and terrain - a wide range across a bike's full gear set covers climbing to sprinting." },
      { q: "Does this account for real-world factors like tire slip or drivetrain loss?", a: "No - it's an idealized calculation assuming no wheel slip and perfectly efficient power transfer, which is a reasonable approximation for most road and trail conditions but won't be perfectly exact." },
    ],
    related: ["speed-distance-time-calculator", "pace-calculator", "unit-length-converter"],
  },
  {
    id: "tire-size-calculator",
    category: "conversions",
    title: "Tire Size Comparison Calculator",
    keyword: "tire size calculator",
    description: "Compare two tire sizes and see the resulting difference in diameter, circumference, and speedometer accuracy.",
    intro: "Enter two tire sizes (width/aspect ratio/rim diameter) to compare their overall diameter and the resulting speedometer difference.",
    fields: [
      { id: "width1", label: "Tire 1 width", type: "number", unit: "mm", default: 225, step: 1 },
      { id: "aspect1", label: "Tire 1 aspect ratio", type: "number", unit: "%", default: 45, step: 1 },
      { id: "rim1", label: "Tire 1 rim diameter", type: "number", unit: "in", default: 17, step: 0.5 },
      { id: "width2", label: "Tire 2 width", type: "number", unit: "mm", default: 235, step: 1 },
      { id: "aspect2", label: "Tire 2 aspect ratio", type: "number", unit: "%", default: 40, step: 1 },
      { id: "rim2", label: "Tire 2 rim diameter", type: "number", unit: "in", default: 18, step: 0.5 },
    ],
    compute: (v) => {
      const diameter = (width, aspect, rim) => rim + (2 * (width * (aspect / 100))) / 25.4;
      const d1 = diameter(v.width1, v.aspect1, v.rim1);
      const d2 = diameter(v.width2, v.aspect2, v.rim2);
      const circumference1 = d1 * Math.PI;
      const circumference2 = d2 * Math.PI;
      const diffPercent = ((d2 - d1) / d1) * 100;
      const speedoAt60 = 60 * (d2 / d1);
      return {
        primary: { label: "Diameter difference", value: `${round(diffPercent, 2)}%` },
        secondary: [
          { l: "Tire 1 diameter / circumference", v: `${round(d1, 2)} in / ${round(circumference1, 2)} in` },
          { l: "Tire 2 diameter / circumference", v: `${round(d2, 2)} in / ${round(circumference2, 2)} in` },
          { l: "Actual speed when speedo reads 60", v: `${round(speedoAt60, 2)} mph` },
        ],
        note: "Diameter = rim diameter + 2 × (sidewall height), where sidewall height = tire width × (aspect ratio ÷ 100), converted from mm to inches. A larger tire diameter means your speedometer (calibrated for the original tire) will under-read your actual speed.",
      };
    },
    faq: [
      { q: "How do I read a tire size like 225/45R17?", a: "225 is the tire width in millimeters, 45 is the aspect ratio (sidewall height as a percentage of width), R means radial construction, and 17 is the rim diameter in inches." },
      { q: "Why does changing tire size affect my speedometer accuracy?", a: "Your speedometer is calibrated based on your original tire's diameter and how many times it rotates per mile. A larger-diameter tire covers more distance per rotation, so your speedometer (still counting rotations the same way) will read lower than your actual speed - and a smaller tire will make it read higher." },
      { q: "How much difference in tire diameter is considered acceptable?", a: "Many tire professionals recommend staying within about 3% of the original diameter to avoid significantly affecting speedometer accuracy, ABS/traction control calibration, and ground clearance." },
      { q: "Does tire width alone tell you the overall size?", a: "No - width is just one factor. Overall diameter depends on width, aspect ratio (sidewall height), and rim diameter together, which is why two tires with different width/aspect/rim combinations can end up nearly the same overall size." },
    ],
    related: ["gear-ratio-calculator", "speed-distance-time-calculator", "unit-length-converter"],
  },
  {
    id: "weather-comfort-calculator",
    category: "conversions",
    title: "Dew Point, Heat Index & Wind Chill Calculator",
    keyword: "heat index calculator",
    description: "Calculate dew point, heat index, and wind chill from temperature, humidity, and wind speed.",
    intro: "Enter temperature, relative humidity, and wind speed to calculate dew point, heat index, and wind chill.",
    fields: [
      { id: "tempF", label: "Temperature", type: "number", unit: "°F", default: 95, step: 0.1 },
      { id: "humidity", label: "Relative humidity", type: "number", unit: "%", default: 60, step: 1, min: 0, max: 100 },
      { id: "windMph", label: "Wind speed", type: "number", unit: "mph", default: 15, step: 0.1, min: 0 },
    ],
    compute: (v) => {
      const tempC = (v.tempF - 32) * (5 / 9);
      const a = 17.27, b = 237.7;
      const alpha = (a * tempC) / (b + tempC) + Math.log(v.humidity / 100);
      const dewPointC = (b * alpha) / (a - alpha);
      const dewPointF = dewPointC * (9 / 5) + 32;
      const T = v.tempF, RH = v.humidity;
      const heatIndex = -42.379 + 2.04901523 * T + 10.14333127 * RH - 0.22475541 * T * RH
        - 0.00683783 * T * T - 0.05481717 * RH * RH + 0.00122874 * T * T * RH
        + 0.00085282 * T * RH * RH - 0.00000199 * T * T * RH * RH;
      const heatIndexValid = T >= 80 && RH >= 40;
      const windChill = 35.74 + 0.6215 * T - 35.75 * Math.pow(v.windMph, 0.16) + 0.4275 * T * Math.pow(v.windMph, 0.16);
      const windChillValid = T <= 50 && v.windMph >= 3;
      return {
        primary: { label: "Dew point", value: `${round(dewPointF, 1)}°F` },
        secondary: [
          { l: "Heat index", v: heatIndexValid ? `${round(heatIndex, 1)}°F` : "N/A (needs 80°F+ and 40%+ humidity)" },
          { l: "Wind chill", v: windChillValid ? `${round(windChill, 1)}°F` : "N/A (needs ≤50°F and 3+ mph wind)" },
        ],
        note: "Dew point uses the Magnus formula. Heat index uses the NWS Rothfusz regression (valid roughly 80°F+/40%+ RH). Wind chill uses the NWS formula (valid roughly ≤50°F with wind ≥3 mph). Outside those ranges, the respective figure isn't meaningful and is shown as N/A.",
      };
    },
    faq: [
      { q: "What is dew point?", a: "The temperature air would need to cool to for it to become fully saturated with the moisture it already contains, causing condensation (dew). Higher dew points feel more humid and muggy regardless of the actual temperature reading." },
      { q: "What is heat index?", a: "The \"feels like\" temperature when humidity is factored in with air temperature - high humidity reduces how effectively sweat evaporates to cool your body, making hot weather feel hotter than the thermometer alone suggests." },
      { q: "What is wind chill?", a: "The \"feels like\" temperature when wind is factored in with cold air - wind strips away the thin layer of warmer air your body naturally holds near your skin, making cold weather feel colder than the thermometer alone suggests." },
      { q: "Why does the calculator sometimes show heat index or wind chill as N/A?", a: "Both formulas are empirical regressions only validated within specific conditions - heat index needs warm, humid conditions (roughly 80°F+ with 40%+ humidity) and wind chill needs cold, breezy conditions (roughly 50°F or below with wind of at least 3 mph). Outside those ranges the formulas can produce misleading results, so they're hidden instead." },
    ],
    related: ["temperature-converter", "sunrise-sunset-calculator", "pressure-altitude-calculator"],
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
    id: "uuid-generator",
    category: "text",
    title: "UUID Generator",
    keyword: "uuid generator",
    description: "Generate one or more random UUIDs (version 4), the standard format for unique identifiers.",
    intro: "Choose how many UUIDs to generate - each one is a random version-4 UUID, formatted per the standard.",
    fields: [
      { id: "count", label: "How many UUIDs", type: "number", default: 1, step: 1, min: 1, max: 50 },
    ],
    compute: (v) => {
      function uuidv4() {
        const bytes = new Uint8Array(16);
        if (typeof crypto !== "undefined" && crypto.getRandomValues) {
          crypto.getRandomValues(bytes);
        } else {
          for (let i = 0; i < 16; i++) bytes[i] = Math.floor(Math.random() * 256);
        }
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
        return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
      }
      const count = Math.max(1, Math.min(50, Math.round(v.count)));
      const uuids = Array.from({ length: count }, uuidv4);
      return {
        primary: { label: "UUID" + (count > 1 ? "s" : ""), value: uuids.join("\n") },
        secondary: [{ l: "Count", v: count }, { l: "Version", v: "4 (random)" }],
        note: "Generated locally using your browser's cryptographic random number generator when available - nothing is sent to a server.",
      };
    },
    faq: [
      { q: "What is a UUID?", a: "A Universally Unique Identifier - a 128-bit value formatted as 32 hexadecimal digits in five groups (like 8-4-4-4-12 characters), designed so that generating one independently, anywhere, is astronomically unlikely to collide with any other UUID ever generated." },
      { q: "What does 'version 4' mean for a UUID?", a: "Version 4 UUIDs are generated from random (or pseudo-random) bits, as opposed to other UUID versions based on timestamps or namespaces - it's the most common type for general-purpose unique IDs, and what this generator produces." },
      { q: "How likely is a UUID collision?", a: "Effectively negligible - with 122 random bits (a few bits are fixed to mark the version), you'd need to generate roughly a billion UUIDs per second for about 85 years before a 50% chance of any collision, which is why UUIDs are trusted as unique identifiers without checking a central registry." },
    ],
    related: ["password-generator", "random-number-generator", "text-to-slug-generator"],
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
      { q: "Is this the same as asking Google to generate a random number?", a: "Yes, functionally - Google's search results include a built-in random number generator for quick use, and this calculator does the same thing with a dedicated page, plus the option to set a custom range and generate multiple numbers at once." },
      { q: "Can I generate multiple random numbers at once?", a: "Yes - set 'how many numbers' to any value up to 50 to generate a list of random numbers within your chosen range in one click." },
      { q: "Can I exclude specific numbers from the random range?", a: "This calculator generates uniformly from the full range you specify (minimum to maximum); to exclude specific values, generate a number and simply re-roll if it matches an excluded value, or narrow the range if the excluded values are all at one end." },
      { q: "Is a 'randomness generator' the same as this random number generator?", a: "Yes - \"randomness generator\" is just another way of describing a tool that produces random numbers, which is exactly what this calculator does within whatever range and count you set." },
      { q: "Is an 'integer random generator' different from this tool?", a: "No - this calculator already generates whole numbers (integers) within your chosen range by default, so an \"integer random generator\" search is asking for exactly what this tool provides." },
      { q: "Can I use this for a raffle or giveaway drawing?", a: "Yes - this generator is well-suited for informal drawings like picking a raffle winner or random giveaway entry from a numbered list. For anything with legal or regulatory requirements around fairness (like a licensed lottery), use a certified random number source instead." },
    ],
    related: ["password-generator", "word-counter", "gcd-lcm-calculator"],
  },
  {
    id: "coin-flipper",
    category: "text",
    title: "Coin Flip",
    keyword: "flip a coin",
    description: "Flip one or more virtual coins instantly.",
    intro: "Choose how many coins to flip, then flip - each one lands heads or tails with equal odds.",
    fields: [
      { id: "numFlips", label: "Number of coins", type: "number", default: 1, step: 1, min: 1, max: 100 },
    ],
    compute: (v) => {
      const numFlips = Math.max(1, Math.min(100, Math.round(v.numFlips)));
      const flips = Array.from({ length: numFlips }, () => (Math.random() < 0.5 ? "Heads" : "Tails"));
      const heads = flips.filter((f) => f === "Heads").length;
      return {
        primary: { label: numFlips === 1 ? "Result" : "Results", value: numFlips === 1 ? flips[0] : flips.join(", ") },
        secondary: numFlips > 1 ? [
          { l: "Heads", v: heads },
          { l: "Tails", v: numFlips - heads },
        ] : [],
        note: "Click Calculate again to flip again.",
      };
    },
    faq: [
      { q: "Is this coin flip actually random?", a: "It uses your browser's random number generator, giving heads and tails an equal 50/50 chance on every flip - fine for games and casual decisions, though not certified for regulated gambling." },
      { q: "Can I flip multiple coins at once?", a: "Yes - set \"number of coins\" to flip up to 100 at once, and the result shows each individual outcome plus the total heads/tails count." },
      { q: "Why did I get 7 heads in a row - is that broken?", a: "No - each flip is independent, so streaks happen naturally. A run of several heads (or tails) in a row is expected occasionally with a fair 50/50 coin, especially across many flips." },
    ],
    related: ["dice-roller", "random-number-generator", "group-randomizer"],
  },
  {
    id: "dice-roller",
    category: "text",
    title: "Dice Roller",
    keyword: "dice roller",
    description: "Roll one or more virtual dice, with any number of sides.",
    intro: "Choose how many dice to roll and how many sides each die has, then roll.",
    fields: [
      { id: "numDice", label: "Number of dice", type: "number", default: 2, step: 1, min: 1, max: 20 },
      { id: "numSides", label: "Sides per die", type: "number", default: 6, step: 1, min: 2, max: 100 },
    ],
    compute: (v) => {
      const numDice = Math.max(1, Math.min(20, Math.round(v.numDice)));
      const numSides = Math.max(2, Math.min(100, Math.round(v.numSides)));
      const rolls = Array.from({ length: numDice }, () => Math.floor(Math.random() * numSides) + 1);
      const total = rolls.reduce((a, b) => a + b, 0);
      return {
        primary: { label: "Roll result", value: rolls.join(" + ") },
        secondary: [
          { l: "Total", v: total },
          { l: "Average per die", v: round(total / numDice, 2) },
        ],
        note: "Click Calculate again to roll again.",
      };
    },
    faq: [
      { q: "How random is this dice roller?", a: "It uses your browser's random number generator, giving each side of each die an equal chance on every roll - fine for games, decisions, and casual use, though not certified for regulated gambling." },
      { q: "Can I roll dice with more than 6 sides, like a D20?", a: "Yes - set \"sides per die\" to any number from 2 to 100, so this works for standard 6-sided dice, D20s and other tabletop RPG dice, or custom side counts." },
      { q: "How do I roll multiple dice and add them together, like 2d6?", a: "Set \"number of dice\" to 2 and \"sides per die\" to 6 - the result shows each individual roll plus the total, which is exactly what \"2d6\" notation from tabletop games means." },
    ],
    related: ["random-number-generator", "group-randomizer", "password-generator"],
  },
  {
    id: "card-deck-shuffler",
    category: "text",
    title: "Shuffled Deck of Cards",
    keyword: "shuffled deck of cards",
    description: "Shuffle a standard 52-card deck into random order, or draw a set number of random cards.",
    intro: "Choose how many cards to draw from a freshly shuffled standard 52-card deck.",
    fields: [
      { id: "numCards", label: "Cards to draw", type: "number", default: 52, step: 1, min: 1, max: 52 },
    ],
    compute: (v) => {
      const suits = ["♠", "♥", "♦", "♣"];
      const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
      const deck = [];
      for (const s of suits) for (const r of ranks) deck.push(`${r}${s}`);
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      const numCards = Math.max(1, Math.min(52, Math.round(v.numCards)));
      const drawn = deck.slice(0, numCards);
      const perRow = 8;
      const rows = [];
      for (let i = 0; i < drawn.length; i += perRow) {
        const chunk = drawn.slice(i, i + perRow);
        while (chunk.length < perRow) chunk.push("");
        rows.push(chunk);
      }
      return {
        primary: { label: "Cards drawn", value: numCards },
        secondary: [{ l: "First card", v: drawn[0] }, { l: "Last card", v: drawn[drawn.length - 1] }],
        note: "Click Calculate again to reshuffle and draw a fresh set.",
        table: { columns: Array.from({ length: perRow }, (_, i) => `#${i + 1}`), rows },
      };
    },
    faq: [
      { q: "How is this deck shuffled?", a: "Using a Fisher-Yates shuffle - a well-established algorithm that gives every one of the 52! (about 8×10^67) possible orderings an equal chance, run using your browser's random number generator." },
      { q: "Can I draw fewer than 52 cards, like for a poker hand?", a: "Yes - set \"cards to draw\" to however many you need (5 for a poker hand, 13 for a bridge hand, etc.) and this pulls that many cards from the top of a freshly shuffled deck." },
      { q: "Does this include jokers?", a: "No - this is a standard 52-card deck (4 suits × 13 ranks, no jokers), which matches the deck used in most card games. Jokers aren't part of the standard deck this tool shuffles." },
    ],
    related: ["random-number-generator", "dice-roller", "group-randomizer"],
  },
  {
    id: "color-mixer",
    category: "text",
    title: "Color Mixer",
    keyword: "color mixer",
    description: "Mix two colors together at any ratio to see the resulting hex and RGB color.",
    intro: "Enter two hex colors and a mix ratio to see the blended color.",
    fields: [
      { id: "color1", label: "First color (hex)", type: "text", default: "#FF0000" },
      { id: "color2", label: "Second color (hex)", type: "text", default: "#0000FF" },
      { id: "ratio", label: "First color weight", type: "number", unit: "%", default: 50, step: 1, min: 0, max: 100 },
    ],
    compute: (v) => {
      function parseHex(hex) {
        const clean = (hex || "").trim().replace(/^#/, "");
        if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
        return {
          r: parseInt(clean.slice(0, 2), 16),
          g: parseInt(clean.slice(2, 4), 16),
          b: parseInt(clean.slice(4, 6), 16),
        };
      }
      const c1 = parseHex(v.color1);
      const c2 = parseHex(v.color2);
      if (!c1 || !c2) {
        return { primary: { label: "Mixed color", value: "Invalid hex color" }, secondary: [], note: "Enter colors as 6-digit hex codes, like #FF0000." };
      }
      const w = Math.max(0, Math.min(100, v.ratio)) / 100;
      const r = Math.round(c1.r * w + c2.r * (1 - w));
      const g = Math.round(c1.g * w + c2.g * (1 - w));
      const b = Math.round(c1.b * w + c2.b * (1 - w));
      const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
      const mixedHex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
      return {
        primary: { label: "Mixed color", value: mixedHex },
        secondary: [
          { l: "RGB", v: `${r}, ${g}, ${b}` },
          { l: "Mix ratio", v: `${round(v.ratio, 0)}% / ${round(100 - v.ratio, 0)}%` },
        ],
        note: "Mixed by simple linear interpolation of RGB channels - matches how digital color mixing (light-based, not paint) actually works.",
      };
    },
    faq: [
      { q: "How does color mixing work here - like paint or like light?", a: "Like light (additive RGB blending), not paint (subtractive pigment mixing) - this calculator linearly interpolates the red, green, and blue channels between your two colors, which is how digital displays and design tools mix colors, not how physical paint pigments combine." },
      { q: "What ratio gives an even 50/50 mix?", a: "Set the first color's weight to 50% - each channel becomes the exact average of the two input colors' channels at that setting." },
      { q: "Can I use color names instead of hex codes?", a: "No - enter colors as 6-digit hex codes (like #FF0000 for red), since that's the precise, unambiguous format this calculator parses. Most design tools and browsers can show you the hex code for any color you pick visually." },
    ],
    related: ["random-number-generator", "unit-length-converter", "text-to-slug-generator"],
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
  {
    id: "url-encoder-decoder",
    category: "text",
    title: "URL Encoder / Decoder",
    keyword: "url encoder decoder",
    description: "Encode or decode text for safe use in URLs.",
    intro: "Enter text or a URL-encoded string, choose a direction, and get the encoded or decoded result instantly.",
    fields: [
      { id: "text", label: "Text", type: "textarea", default: "https://example.com/search?q=hello world&lang=en" },
      { id: "mode", label: "Mode", type: "select", default: "encode", options: [
        { v: "encode", l: "Encode" }, { v: "decode", l: "Decode" },
      ] },
    ],
    compute: (v) => {
      const text = v.text || "";
      try {
        const result = v.mode === "encode" ? encodeURIComponent(text) : decodeURIComponent(text);
        return {
          primary: { label: v.mode === "encode" ? "Encoded" : "Decoded", value: result },
          secondary: [{ l: "Original length", v: text.length }, { l: "Result length", v: result.length }],
        };
      } catch (err) {
        return { primary: { label: "Invalid input", value: "Couldn't decode - check for a malformed % sequence" }, secondary: [], note: "Decoding fails if the text contains a % not followed by a valid two-digit hex code." };
      }
    },
    faq: [
      { q: "What does URL encoding do?", a: "Converts characters that aren't safe in a URL (spaces, &, ?, #, and others) into a percent-sign followed by their hex code - for example, a space becomes %20 - so the text can be safely included in a URL, like a search query or parameter value." },
      { q: "Why does a space become %20 instead of a plus sign (+)?", a: "Both are used in practice: %20 is the standard percent-encoding for a space anywhere in a URL, while + specifically means \"space\" only within URL query strings (form-encoded data), a legacy convention from HTML forms. This tool uses %20, the more universally correct encoding." },
      { q: "What happens if I try to decode text that isn't actually encoded?", a: "Plain text without any % sequences decodes back to itself unchanged, since there's nothing to convert - decoding only fails if the text contains an incomplete or invalid % sequence (like a % not followed by two valid hex digits)." },
      { q: "Is this the same as encodeURIComponent() in JavaScript?", a: "Yes - encoding uses exactly that function, which is the standard way to safely encode a single value (like a query parameter) for use in a URL, as opposed to encodeURI() which is meant for encoding a whole URL and leaves characters like / and : untouched." },
    ],
    related: ["word-counter", "text-to-slug-generator", "case-converter"],
  },
  {
    id: "ip-subnet-calculator",
    category: "text",
    title: "IP Subnet Calculator",
    keyword: "ip subnet calculator",
    description: "Calculate network address, broadcast address, and usable host range from an IPv4 address and CIDR prefix.",
    intro: "Enter an IPv4 address and CIDR prefix length to calculate the subnet's network address, broadcast address, and usable host range.",
    fields: [
      { id: "ip", label: "IP address", type: "text", default: "192.168.1.0" },
      { id: "cidr", label: "CIDR prefix length", type: "number", default: 24, step: 1, min: 0, max: 32 },
    ],
    compute: (v) => {
      const parts = (v.ip || "").split(".").map(Number);
      if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0 || p > 255)) {
        return { primary: { label: "Invalid IP address", value: "-" }, secondary: [], note: "Enter a valid IPv4 address, like 192.168.1.0." };
      }
      const cidr = Math.round(v.cidr);
      const ipInt = ((parts[0] << 24) + (parts[1] << 16) + (parts[2] << 8) + parts[3]) >>> 0;
      const maskInt = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
      const networkInt = (ipInt & maskInt) >>> 0;
      const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
      const intToIp = (int) => [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join(".");
      const totalAddresses = Math.pow(2, 32 - cidr);
      const usableHosts = cidr >= 31 ? 0 : totalAddresses - 2;
      const firstHost = cidr >= 31 ? networkInt : networkInt + 1;
      const lastHost = cidr >= 31 ? broadcastInt : broadcastInt - 1;
      return {
        primary: { label: "Network address", value: `${intToIp(networkInt)}/${cidr}` },
        secondary: [
          { l: "Subnet mask", v: intToIp(maskInt) },
          { l: "Broadcast address", v: intToIp(broadcastInt) },
          { l: "Usable host range", v: `${intToIp(firstHost)} - ${intToIp(lastHost)}` },
          { l: "Total / usable addresses", v: `${totalAddresses.toLocaleString()} / ${usableHosts.toLocaleString()}` },
        ],
        note: "The network address is the IP masked by the CIDR prefix; the broadcast address is the network address with all host bits set to 1. /31 and /32 subnets have no separate usable host range (point-to-point links and single hosts).",
      };
    },
    faq: [
      { q: "What is a CIDR prefix?", a: "A number (0-32) after a slash indicating how many leading bits of the IP address are the network portion - /24 means the first 24 bits (three octets) identify the network, leaving the last 8 bits for host addresses." },
      { q: "How many usable hosts does a /24 subnet have?", a: "254 - a /24 has 256 total addresses (2⁸), minus the network address and broadcast address, which aren't assignable to individual hosts." },
      { q: "What's the difference between network address and broadcast address?", a: "The network address (all host bits set to 0) identifies the subnet itself and isn't assigned to any device. The broadcast address (all host bits set to 1) is used to send a message to every device on that subnet simultaneously - neither is usable as a regular host address." },
      { q: "Why do /31 and /32 subnets have no usable host range?", a: "A /32 has exactly one address total (used to identify a single host, like a loopback interface), and a /31 has only 2 addresses with no room for separate network/broadcast addresses - both are typically used for point-to-point links where every address is directly usable." },
    ],
    related: ["url-encoder-decoder", "data-storage-converter", "roman-numeral-converter"],
  },
  {
    id: "json-compare",
    category: "text",
    title: "JSON Compare",
    keyword: "json compare",
    description: "Compare two JSON objects and see exactly what's added, removed, or changed between them.",
    intro: "Paste two JSON objects to see a field-by-field diff - what's added, removed, or changed between them.",
    fields: [
      { id: "json1", label: "First JSON", type: "textarea", default: '{\n  "name": "Alex",\n  "age": 30,\n  "city": "Austin"\n}' },
      { id: "json2", label: "Second JSON", type: "textarea", default: '{\n  "name": "Alex",\n  "age": 31,\n  "country": "USA"\n}' },
    ],
    compute: (v) => {
      let obj1, obj2;
      try { obj1 = JSON.parse(v.json1 || "{}"); } catch (e) { return { primary: { label: "Result", value: "Invalid JSON" }, secondary: [], note: "First JSON is invalid: " + e.message }; }
      try { obj2 = JSON.parse(v.json2 || "{}"); } catch (e) { return { primary: { label: "Result", value: "Invalid JSON" }, secondary: [], note: "Second JSON is invalid: " + e.message }; }

      const rows = [];
      function diff(a, b, path) {
        const isObjA = a !== null && typeof a === "object" && !Array.isArray(a);
        const isObjB = b !== null && typeof b === "object" && !Array.isArray(b);
        if (isObjA && isObjB) {
          const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
          for (const key of keys) {
            const childPath = path ? `${path}.${key}` : key;
            if (!(key in a)) rows.push([childPath, "—", JSON.stringify(b[key]), "Added"]);
            else if (!(key in b)) rows.push([childPath, JSON.stringify(a[key]), "—", "Removed"]);
            else diff(a[key], b[key], childPath);
          }
        } else if (JSON.stringify(a) !== JSON.stringify(b)) {
          rows.push([path || "(root)", JSON.stringify(a), JSON.stringify(b), "Changed"]);
        }
      }
      diff(obj1, obj2, "");

      const added = rows.filter((r) => r[3] === "Added").length;
      const removed = rows.filter((r) => r[3] === "Removed").length;
      const changed = rows.filter((r) => r[3] === "Changed").length;
      return {
        primary: { label: "Differences found", value: rows.length },
        secondary: [
          { l: "Added", v: added },
          { l: "Removed", v: removed },
          { l: "Changed", v: changed },
        ],
        note: rows.length === 0 ? "The two JSON objects are identical." : "Scroll the table below for every field-level difference.",
        table: rows.length ? { columns: ["Path", "First JSON", "Second JSON", "Status"], rows } : undefined,
      };
    },
    faq: [
      { q: "How does this JSON compare tool work?", a: "It parses both JSON objects, then recursively walks every key: keys only in the first are marked \"Removed,\" keys only in the second are marked \"Added,\" and keys present in both with different values are marked \"Changed.\" Nested objects are compared field by field, not as one big blob." },
      { q: "Does this compare arrays element by element?", a: "Arrays are compared by exact value (the whole array is treated as \"changed\" if any element differs), not merged element-by-element like objects - this keeps the diff logic predictable for arrays where order matters." },
      { q: "What happens if my JSON has a syntax error?", a: "This tool reports which of the two JSON inputs is invalid, along with the parser's error message, rather than attempting a partial or guessed comparison - fix the syntax error first, then compare." },
    ],
    related: ["word-counter", "text-to-slug-generator", "case-converter"],
  },
  {
    id: "cidr-calculator",
    category: "text",
    title: "CIDR / Subnet Calculator",
    keyword: "cidr calculation",
    description: "Calculate the network address, broadcast address, subnet mask, and usable host range from a CIDR notation.",
    intro: "Enter an IP address in CIDR notation (like 192.168.1.0/24) to calculate the subnet's network address, broadcast address, and usable host range.",
    fields: [
      { id: "cidr", label: "CIDR notation", type: "text", default: "192.168.1.0/24" },
    ],
    compute: (v) => {
      const raw = (v.cidr || "").trim();
      const match = raw.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/);
      if (!match) {
        return { primary: { label: "Result", value: "Invalid CIDR" }, secondary: [], note: "Use the format IP/prefix, like 192.168.1.0/24." };
      }
      const octets = [1, 2, 3, 4].map((i) => parseInt(match[i], 10));
      const prefix = parseInt(match[5], 10);
      if (octets.some((o) => o > 255) || prefix > 32) {
        return { primary: { label: "Result", value: "Invalid CIDR" }, secondary: [], note: "Each IP octet must be 0-255, and the prefix must be 0-32." };
      }
      const ipInt = ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
      const maskInt = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0;
      const networkInt = (ipInt & maskInt) >>> 0;
      const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
      const toIp = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
      const totalAddresses = Math.pow(2, 32 - prefix);
      const usableHosts = prefix >= 31 ? 0 : totalAddresses - 2;
      return {
        primary: { label: "Network address", value: `${toIp(networkInt)}/${prefix}` },
        secondary: [
          { l: "Broadcast address", v: toIp(broadcastInt) },
          { l: "Subnet mask", v: toIp(maskInt) },
          { l: "Usable hosts", v: usableHosts.toLocaleString() },
          { l: "Usable range", v: usableHosts > 0 ? `${toIp(networkInt + 1)} - ${toIp(broadcastInt - 1)}` : "N/A (point-to-point or single host)" },
        ],
        note: prefix >= 31 ? "A /31 or /32 has no separate network/broadcast address in the traditional sense - it's used for point-to-point links (/31) or a single host route (/32)." : undefined,
      };
    },
    faq: [
      { q: "What does CIDR notation mean, like /24?", a: "The number after the slash is the prefix length - how many leading bits of the 32-bit IP address are fixed as the network portion. /24 means the first 24 bits (the first three octets) identify the network, leaving 8 bits (256 addresses) for hosts." },
      { q: "How do I calculate the number of usable hosts from a prefix?", a: "Usable hosts = 2^(32 − prefix) − 2, subtracting the network address and broadcast address, which can't be assigned to hosts. A /24 network has 2^8 − 2 = 254 usable host addresses." },
      { q: "Why are there no usable hosts for a /31 or /32?", a: "A /32 is a single address with no room for a network/broadcast pair, and a /31 is a special case (defined in RFC 3021) used for point-to-point links where both addresses in the 2-address block are usable as host addresses, since there's no broadcast needed." },
    ],
    related: ["json-compare", "unit-length-converter", "uuid-generator"],
  },
  {
    id: "group-randomizer",
    category: "text",
    title: "Group Randomizer",
    keyword: "group randomizer generator",
    description: "Randomly split a list of names into a set number of even groups or teams.",
    intro: "Enter one name per line and choose how many groups to split them into - each group is randomly and evenly assigned.",
    fields: [
      { id: "names", label: "Names (one per line)", type: "textarea", default: "Alex\nJordan\nTaylor\nMorgan\nCasey\nRiley\nSam\nJamie" },
      { id: "numGroups", label: "Number of groups", type: "number", default: 2, step: 1, min: 1, max: 20 },
    ],
    compute: (v) => {
      const names = (v.names || "").split("\n").map((n) => n.trim()).filter(Boolean);
      const numGroups = Math.max(1, Math.min(20, Math.round(v.numGroups)));
      if (names.length === 0) {
        return { primary: { label: "Groups", value: "—" }, secondary: [], note: "Enter at least one name, one per line." };
      }
      const shuffled = names.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const groups = Array.from({ length: numGroups }, () => []);
      shuffled.forEach((name, i) => groups[i % numGroups].push(name));
      const maxRows = Math.max(...groups.map((g) => g.length));
      const rows = [];
      for (let r = 0; r < maxRows; r++) {
        rows.push(groups.map((g) => g[r] || ""));
      }
      return {
        primary: { label: "People assigned", value: names.length },
        secondary: [
          { l: "Groups", v: numGroups },
          { l: "Group size", v: `${Math.floor(names.length / numGroups)}-${Math.ceil(names.length / numGroups)}` },
        ],
        note: "Click Calculate again for a fresh random split.",
        table: {
          columns: groups.map((_, i) => `Group ${i + 1}`),
          rows,
        },
      };
    },
    faq: [
      { q: "How does this randomize groups fairly?", a: "It uses a Fisher-Yates shuffle - a well-established algorithm that gives every name an equal, unbiased chance of ending up in any position - then deals the shuffled list into groups in round-robin order, which keeps group sizes as even as possible." },
      { q: "What happens if the number of people doesn't divide evenly into groups?", a: "The extra people are spread one-per-group starting from the first group, so group sizes differ by at most one person - for 10 people split into 3 groups, you'll get groups of 4, 3, and 3, not 4, 4, and 2." },
      { q: "Can I use this for classroom teams or a work project split?", a: "Yes - this works for any scenario where you need an unbiased random split of a list of names into a fixed number of groups, whether that's classroom project teams, sports teams, or dividing up a task list at work." },
      { q: "Can I use this as a randomizer to pick one random winner or order names randomly?", a: "Yes - set the number of groups to 1, and this calculator shuffles your entire list into a single random order (the fairest way to pick a random winner is to take whoever ends up first). Every reshuffle uses a fresh Fisher-Yates shuffle." },
      { q: "Is a 'randomizer list' or 'random a list' the same as this tool?", a: "Yes - both describe shuffling a list into random order, which this tool does (set groups to 1 for a single shuffled list, or more for random group splits)." },
      { q: "Is 'random draws,' 'random list creator,' or 'list random generator' different from this tool?", a: "No - all of these describe randomly ordering or drawing from a list, which this calculator does. Set groups to 1 to shuffle the whole list into random order." },
      { q: "Is 'random generator for teams' or 'randomize list' different from this tool?", a: "No - both describe splitting or shuffling a list of names randomly, which is exactly what this calculator does. Set the number of groups to however many teams you need, or to 1 to just shuffle the whole list." },
    ],
    related: ["random-number-generator", "word-counter", "text-to-slug-generator"],
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

function todayDateString() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function nowTimeString() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
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
