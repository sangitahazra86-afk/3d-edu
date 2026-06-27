const formulas = [
  { grade: "8", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Mensuration", title: "Area of Rectangle", formula: "A = l × b", description: "Used to find area of a rectangle." },
  { grade: "8", board: "ICSE", stream: "Science", subject: "Mathematics", chapter: "Mensuration", title: "Perimeter of Rectangle", formula: "P = 2(l + b)", description: "Measures the distance around a rectangle." },
  { grade: "8", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Fractions", title: "Percentage", formula: "Percentage = (Part / Whole) × 100", description: "Useful for comparing values." },
  { grade: "8", board: "Cambridge", stream: "General", subject: "Mathematics", chapter: "Fractions", title: "Simplifying Fractions", formula: "a/b = (a÷g)/(b÷g)", description: "Reduces a fraction to its simplest form." },
  { grade: "9", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Motion", title: "Speed", formula: "v = s / t", description: "Average speed of a moving object." },
  { grade: "9", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Matter", title: "Density", formula: "ρ = m / V", description: "Mass per unit volume." },
  { grade: "9", board: "ICSE", stream: "Science", subject: "Biology", chapter: "Cell", title: "Magnification", formula: "m = h_i/h_o = v/u", description: "Measures image size relative to object size." },
  { grade: "9", board: "IB", stream: "General", subject: "Mathematics", chapter: "Algebra", title: "Simple Interest", formula: "SI = (P × R × T) / 100", description: "Interest earned on principal over time." },
  { grade: "10", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Electricity", title: "Ohm's Law", formula: "V = I R", description: "Relationship between voltage, current and resistance." },
  { grade: "10", board: "ICSE", stream: "Science", subject: "Physics", chapter: "Light", title: "Mirror Formula", formula: "1/f = 1/v + 1/u", description: "Relates focal length, image distance and object distance." },
  { grade: "10", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Acids and Bases", title: "pH", formula: "pH = -log[H+]", description: "Measures acidity or basicity." },
  { grade: "10", board: "Cambridge", stream: "Science", subject: "Chemistry", chapter: "Chemical Reactions", title: "Mole Concept", formula: "n = m/M", description: "Amount of substance in moles." },
  { grade: "11", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Motion in a Straight Line", title: "First Equation of Motion", formula: "v = u + at", description: "Relates final velocity, initial velocity and acceleration." },
  { grade: "11", board: "State Board", stream: "Science", subject: "Physics", chapter: "Work, Energy and Power", title: "Work Done", formula: "W = F s cosθ", description: "Energy transferred by force over displacement." },
  { grade: "11", board: "Cambridge", stream: "Science", subject: "Mathematics", chapter: "Quadratics", title: "Quadratic Formula", formula: "x = (-b ± √(b² - 4ac)) / 2a", description: "Finds roots of a quadratic equation." },
  { grade: "11", board: "CBSE", stream: "Commerce", subject: "Accountancy", chapter: "Financial Statements", title: "Gross Profit", formula: "Gross Profit = Sales - Cost of Goods Sold", description: "Shows profit before operating expenses." },
  { grade: "11", board: "ICSE", stream: "Commerce", subject: "Economics", chapter: "Basic Concepts", title: "Price Elasticity", formula: "E_d = %ΔQ / %ΔP", description: "Measures responsiveness of demand to price changes." },
  { grade: "11", board: "IB", stream: "Commerce", subject: "Economics", chapter: "Basic Concepts", title: "Price Elasticity", formula: "E_d = %ΔQ / %ΔP", description: "Measures responsiveness of demand to price changes." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Electrostatics", title: "Coulomb's Law", formula: "F = k(q₁q₂/r²)", description: "Force between two charges." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Electrostatics", title: "Electric Field", formula: "E = F/q", description: "Electric force per unit charge." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Electrostatics", title: "Electric Potential", formula: "V = W/q", description: "Work done per unit charge." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Electrostatics", title: "Coulomb's Law", formula: "F = k(q₁q₂/r²)", description: "Force between two charges in state board physics." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Ohm's Law", formula: "V = IR", description: "Basic relation in electric circuits." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Electrical Power", formula: "P = VI", description: "Power consumed in a circuit." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Magnetic Effects", title: "Magnetic Field", formula: "B = μ₀I/2πr", description: "Field around a long straight conductor." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Electromagnetic Induction", title: "Faraday's Law", formula: "ε = -N (dΦ/dt)", description: "Induced emf from changing magnetic flux." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Ray Optics", title: "Mirror Formula", formula: "1/f = 1/v + 1/u", description: "Connection between focal length and image distance." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Wave Optics", title: "Young's Double Slit", formula: "β = λD/d", description: "Fringe width in interference pattern." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Dual Nature", title: "de Broglie Wavelength", formula: "λ = h/p", description: "Wavelength of an object in motion." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Atoms and Nuclei", title: "Energy of a Photon", formula: "E = hν", description: "Energy carried by a photon." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Resistance", formula: "R = ρl/A", description: "Resistance of a conductor." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Physics", chapter: "Wave Optics", title: "Interference", formula: "I = I₁ + I₂ + 2√(I₁I₂) cosδ", description: "Resultant intensity in interference." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Physics", chapter: "Semiconductor Electronics", title: "Current Gain", formula: "β = ΔI_C / ΔI_B", description: "Gain of a transistor amplifier." },
  { grade: "12", board: "IB", stream: "Science", subject: "Physics", chapter: "Mechanics", title: "Kinetic Energy", formula: "K = 1/2 mv²", description: "Energy due to motion." },
  { grade: "12", board: "IB", stream: "Science", subject: "Physics", chapter: "Electricity", title: "Potential Difference", formula: "V = W/q", description: "Work done per unit charge." },
  { grade: "12", board: "Cambridge", stream: "Science", subject: "Physics", chapter: "Waves", title: "Wave Speed", formula: "v = fλ", description: "Relation between speed, frequency and wavelength." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Ohm's Law", formula: "V = IR", description: "Relationship between voltage, current and resistance." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Electrical Power", formula: "P = VI = I²R = V²/R", description: "Rate of electrical energy transfer." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Magnetic Effects", title: "Force on a Moving Charge", formula: "F = qvB sinθ", description: "Magnetic force acting on a charge." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Magnetic Effects", title: "Force on a Current Carrying Conductor", formula: "F = BIL sinθ", description: "Force on a straight wire in a magnetic field." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Electromagnetic Induction", title: "Faraday's Law", formula: "ε = -N (dΦ/dt)", description: "Induced emf due to changing magnetic flux." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Alternating Current", title: "AC Current", formula: "I = I₀ sinωt", description: "Instantaneous current in AC circuit." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Ray Optics", title: "Mirror Formula", formula: "1/f = 1/v + 1/u", description: "Relation between focal length and image distance." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Ray Optics", title: "Lens Formula", formula: "1/f = 1/v - 1/u", description: "Relates focal length, image distance and object distance for lenses." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Wave Optics", title: "Young's Double Slit", formula: "β = λD/d", description: "Fringe width in interference pattern." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Dual Nature", title: "Photoelectric Equation", formula: "K_max = hν - φ", description: "Maximum kinetic energy of emitted electrons." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Dual Nature", title: "de Broglie Wavelength", formula: "λ = h/p", description: "Wavelength of a moving particle." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Atoms and Nuclei", title: "Energy of a Photon", formula: "E = hν", description: "Energy carried by a photon." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Atoms and Nuclei", title: "Radioactive Decay", formula: "N = N₀ e^{-λt}", description: "Number of undecayed nuclei after time t." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Semiconductor Electronics", title: "Current Gain", formula: "β = ΔI_C / ΔI_B", description: "Measure of transistor amplification." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Chemistry", chapter: "Chemical Kinetics", title: "Rate of Reaction", formula: "Rate = k[A]^m[B]^n", description: "Shows how concentration affects reaction rate." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Chemistry", chapter: "Electrochemistry", title: "Nernst Equation", formula: "E = E° - (0.0591/n) log Q", description: "Electrode potential at non-standard conditions." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Chemistry", chapter: "Solutions", title: "Henry's Law", formula: "p = k_H x", description: "Solubility of a gas in a liquid." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Chemical Kinetics", title: "Rate of Reaction", formula: "rate = k[A]^n", description: "Basic rate law for a reaction." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Electrochemistry", title: "Faraday's Law", formula: "m = (EIt)/96500", description: "Mass deposited during electrolysis." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Genetics", title: "Hardy-Weinberg", formula: "p² + 2pq + q² = 1", description: "Describes allele frequencies in a population." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Ecology", title: "Population Growth", formula: "dN/dt = (b + i) - (d + e)N", description: "Change in population size over time." },
  { grade: "12", board: "Cambridge", stream: "Science", subject: "Biology", chapter: "Genetics", title: "Punnett Square", formula: "P = 1/4", description: "Probability of a recessive trait in a cross." },
  { grade: "12", board: "CBSE", stream: "Commerce", subject: "Business Studies", chapter: "Marketing", title: "Break Even Point", formula: "BEP = Fixed Cost / (Selling Price - Variable Cost)", description: "Point where total revenue equals total cost." },
  { grade: "12", board: "CBSE", stream: "Commerce", subject: "Accountancy", chapter: "Partnership", title: "Goodwill", formula: "Goodwill = Super Profit × Years of Purchase", description: "Value of an established business." },
  { grade: "12", board: "CBSE", stream: "Commerce", subject: "Economics", chapter: "National Income", title: "GDP", formula: "GDP = C + I + G + (X - M)", description: "Total value of goods and services produced." },
  { grade: "12", board: "CBSE", stream: "Arts", subject: "Geography", chapter: "Population", title: "Population Density", formula: "Density = Population / Area", description: "Shows how crowded an area is." },
  { grade: "10", board: "IB", stream: "General", subject: "Mathematics", chapter: "Statistics", title: "Mean", formula: "Mean = Sum of values / Number of values", description: "Average of a data set." },
  { grade: "9", board: "Cambridge", stream: "General", subject: "Mathematics", chapter: "Algebra", title: "Simple Interest", formula: "SI = (P × R × T) / 100", description: "Interest earned on principal over time." },
  { grade: "8", board: "CBSE", stream: "General", subject: "Mathematics", chapter: "Fractions", title: "Percentage", formula: "Percentage = (Part / Whole) × 100", description: "Useful for comparing values." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Physical World", title: "Physical World", formula: "Conceptual chapter", description: "Foundation chapter for physics concepts." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Units and Measurements", title: "Units and Measurements", formula: "1 unit = 1 standard", description: "Introduces measurement systems and unit conversions." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Motion in a Straight Line", title: "Motion in a Straight Line", formula: "v = u + at", description: "Covers rectilinear motion and equations of motion." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Motion in a Plane", title: "Motion in a Plane", formula: "R = u² sin 2θ / g", description: "Discusses projectile motion and vectors." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Laws of Motion", title: "Laws of Motion", formula: "F = ma", description: "Newton's laws of motion and force analysis." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Work, Energy and Power", title: "Work, Energy and Power", formula: "W = Fd cosθ", description: "Energy transfer, power, and work concepts." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Systems of Particles and Rotational Motion", title: "Systems of Particles and Rotational Motion", formula: "τ = rF sinθ", description: "Rotational dynamics and centre of mass." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Gravitation", title: "Gravitation", formula: "F = Gm₁m₂/r²", description: "Universal law of gravitation and orbital motion." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Mechanical Properties of Solids", title: "Mechanical Properties of Solids", formula: "Stress = F/A", description: "Elasticity, stress, strain, and Young's modulus." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Mechanical Properties of Fluids", title: "Mechanical Properties of Fluids", formula: "P = F/A", description: "Pressure and fluid statics concepts." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Thermal Properties of Matter", title: "Thermal Properties of Matter", formula: "Q = mcΔT", description: "Heat capacity and thermal expansion." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Thermodynamics", title: "Thermodynamics", formula: "ΔU = Q - W", description: "Laws of thermodynamics and heat engines." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Kinetic Theory", title: "Kinetic Theory", formula: "PV = nRT", description: "Gas laws and kinetic theory of gases." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Oscillations", title: "Oscillations", formula: "T = 2π√(l/g)", description: "Simple harmonic motion and periodicity." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Waves", title: "Waves", formula: "v = fλ", description: "Wave motion and propagation." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Physics", chapter: "Electrostatics", title: "Electrostatics", formula: "F = kq₁q₂/r²", description: "Electric charge, fields, and potential." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Some Basic Concepts of Chemistry", title: "Some Basic Concepts of Chemistry", formula: "n = m/M", description: "Mole concept and chemical calculations." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Structure of Atom", title: "Structure of Atom", formula: "E = hν", description: "Atomic models and electronic structure." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Classification of Elements", title: "Classification of Elements", formula: "Periodic law", description: "Periodic table and periodic trends." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Chemical Bonding", title: "Chemical Bonding", formula: "Bond order = 1/2(Nb - Na)", description: "Covalent, ionic, and metallic bonding." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "States of Matter", title: "States of Matter", formula: "PV = nRT", description: "Gas laws and matter states." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Thermodynamics", title: "Thermodynamics", formula: "ΔH = ΔU + ΔnRT", description: "Heat changes and energy transfer." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Equilibrium", title: "Equilibrium", formula: "Kc = [products]/[reactants]", description: "Chemical equilibrium and Le Chatelier's principle." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Redox Reactions", title: "Redox Reactions", formula: "Oxidation number", description: "Electron transfer and oxidation numbers." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Hydrogen", title: "Hydrogen", formula: "H2O", description: "Properties and uses of hydrogen." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "s-Block Elements", title: "s-Block Elements", formula: "M + H2O → MOH + H2", description: "Alkali and alkaline earth metals." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "p-Block Elements", title: "p-Block Elements", formula: "Group trends", description: "Properties of p-block elements." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Organic Chemistry Basics", title: "Organic Chemistry Basics", formula: "C_nH_{2n+2}", description: "Basic nomenclature and hydrocarbons." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Hydrocarbons", title: "Hydrocarbons", formula: "CnH2n+2", description: "Alkanes, alkenes, and alkynes." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Environmental Chemistry", title: "Environmental Chemistry", formula: "Pollution control", description: "Air, water, and environmental concepts." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Diversity in the Living World", title: "Diversity in the Living World", formula: "Classification", description: "Classification and biodiversity basics." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Structural Organisation in Animals and Plants", title: "Structural Organisation in Animals and Plants", formula: "Tissue structure", description: "Plant and animal tissue organisation." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Cell: Structure and Function", title: "Cell: Structure and Function", formula: "Cell theory", description: "Cell wall, membrane, and organelles." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Plant Physiology", title: "Plant Physiology", formula: "Photosynthesis", description: "Photosynthesis and transport in plants." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Human Physiology", title: "Human Physiology", formula: "Respiration", description: "Functions of human body systems." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Reproduction", title: "Reproduction", formula: "Gamete formation", description: "Sexual and asexual reproduction." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Genetics and Evolution", title: "Genetics and Evolution", formula: "p² + 2pq + q² = 1", description: "Inheritance patterns and evolution." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Biology in Human Welfare", title: "Biology in Human Welfare", formula: "Disease control", description: "Applications in health and agriculture." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Biotechnology", title: "Biotechnology", formula: "Gene cloning", description: "Genetic engineering and applications." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Biology", chapter: "Ecology and Environment", title: "Ecology and Environment", formula: "dN/dt = (b + i) - (d + e)N", description: "Population ecology and environmental balance." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Relations and Functions", title: "Relations and Functions", formula: "f(x)", description: "Domain, range, and mapping concepts." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Inverse Trigonometric Functions", title: "Inverse Trigonometric Functions", formula: "sin⁻¹x", description: "Inverse trig identities and graphs." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Matrices", title: "Matrices", formula: "A = [aij]", description: "Matrix operations and determinants." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Determinants", title: "Determinants", formula: "det(A)", description: "Evaluation of determinants and properties." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Continuity and Differentiability", title: "Continuity and Differentiability", formula: "dy/dx", description: "Differentiation and continuity concepts." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Application of Derivatives", title: "Application of Derivatives", formula: "dy/dx = 0", description: "Maxima, minima, and tangents." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Integrals", title: "Integrals", formula: "∫x^n dx", description: "Indefinite and definite integrals." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Differential Equations", title: "Differential Equations", formula: "dy/dx = f(x)", description: "Formation and solution of equations." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Vector Algebra", title: "Vector Algebra", formula: "a · b", description: "Dot products and vector operations." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Three Dimensional Geometry", title: "Three Dimensional Geometry", formula: "Distance formula", description: "Lines and planes in 3D." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Mathematics", chapter: "Probability", title: "Probability", formula: "P(E) = n(E)/n(S)", description: "Classical probability and distributions." },
  { grade: "12", board: "State Board", stream: "Commerce", subject: "Accountancy", chapter: "Accounting for Partnership", title: "Accounting for Partnership", formula: "Capital Account", description: "Partnership account treatment and adjustments." },
  { grade: "12", board: "State Board", stream: "Commerce", subject: "Accountancy", chapter: "Company Accounts", title: "Company Accounts", formula: "Share Capital", description: "Share and debenture accounting fundamentals." },
  { grade: "12", board: "State Board", stream: "Commerce", subject: "Business Studies", chapter: "Marketing", title: "Marketing", formula: "4Ps", description: "Product, price, place, and promotion." },
  { grade: "12", board: "State Board", stream: "Commerce", subject: "Business Studies", chapter: "Financial Management", title: "Financial Management", formula: "Working Capital", description: "Capital structure and finance decisions." },
  { grade: "12", board: "State Board", stream: "Commerce", subject: "Economics", chapter: "National Income", title: "National Income", formula: "GDP = C + I + G + (X-M)", description: "Income and production accounting." },
  { grade: "12", board: "State Board", stream: "Commerce", subject: "Economics", chapter: "Money and Banking", title: "Money and Banking", formula: "Money Supply", description: "Banking system and monetary policy." },
  { grade: "12", board: "State Board", stream: "Arts", subject: "Geography", chapter: "Population", title: "Population", formula: "Density = Population/Area", description: "Population distribution and growth." },
  { grade: "12", board: "State Board", stream: "Arts", subject: "Geography", chapter: "Migration", title: "Migration", formula: "Net Migration", description: "Population movement patterns." },
  { grade: "12", board: "State Board", stream: "Arts", subject: "Geography", chapter: "Human Development", title: "Human Development", formula: "HDI", description: "Human development index concepts." },
  { grade: "12", board: "State Board", stream: "Arts", subject: "Geography", chapter: "Resources and Development", title: "Resources and Development", formula: "Resource planning", description: "Use and conservation of resources." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Electrostatics", title: "Potential Energy of a System", formula: "U = k(q₁q₂/r)", description: "Energy stored due to interaction between charges." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Electrostatics", title: "Capacitance", formula: "C = Q/V", description: "Ability of a capacitor to store charge." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Equivalent Resistance in Series", formula: "R_eq = R₁ + R₂ + ...", description: "Total resistance for series combination." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Equivalent Resistance in Parallel", formula: "1/R_eq = 1/R₁ + 1/R₂ + ...", description: "Total resistance for parallel combination." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Kirchhoff's Junction Rule", formula: "ΣI_in = ΣI_out", description: "Conservation of charge at a junction." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Kirchhoff's Loop Rule", formula: "ΣV = 0", description: "Conservation of energy in a loop." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Magnetic Effects", title: "Magnetic Field due to a Long Wire", formula: "B = μ₀I / 2πr", description: "Field around a straight current-carrying conductor." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Magnetic Effects", title: "Magnetic Field at the Centre of a Circular Coil", formula: "B = μ₀NI / 2R", description: "Field at the centre of a loop." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Electromagnetic Induction", title: "Motional EMF", formula: "ε = B l v", description: "EMF induced in a moving conductor." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Electromagnetic Induction", title: "Self-Inductance", formula: "ε = -L (dI/dt)", description: "Back emf in an inductor." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Alternating Current", title: "RMS Current", formula: "I_rms = I₀ / √2", description: "Effective value of AC current." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Alternating Current", title: "RMS Voltage", formula: "V_rms = V₀ / √2", description: "Effective value of AC voltage." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Alternating Current", title: "Impedance", formula: "Z = √(R² + X_L²)", description: "Total opposition in an AC circuit." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Ray Optics", title: "Magnification", formula: "m = h_i/h_o = v/u", description: "Size ratio of image to object." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Wave Optics", title: "Diffraction Condition", formula: "a sinθ = nλ", description: "Condition for diffraction minima." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Dual Nature", title: "Photon Energy", formula: "E = hc/λ", description: "Energy of a light quantum." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Atoms and Nuclei", title: "Bohr Radius", formula: "r_n = n²h²ε₀/(πm e²)", description: "Radius of nth orbit in hydrogen atom." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Atoms and Nuclei", title: "Binding Energy", formula: "BE = [Zm_p + (A-Z)m_n - M]c²", description: "Energy needed to split a nucleus." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Physics", chapter: "Semiconductor Electronics", title: "Diode Equation", formula: "I = I₀(e^{qV/kT} - 1)", description: "Current through a p-n junction diode." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Physics", chapter: "Electrostatics", title: "Gauss's Law", formula: "∮E·dA = q/ε₀", description: "Electric flux through a closed surface." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Physics", chapter: "Current Electricity", title: "Conductivity", formula: "σ = 1/ρ", description: "Reciprocal of resistivity." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Physics", chapter: "Magnetic Effects", title: "Cyclotron Frequency", formula: "f = qB/2πm", description: "Frequency of circular motion in magnetic field." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Physics", chapter: "Alternating Current", title: "Power in AC Circuit", formula: "P = V_rms I_rms cosφ", description: "Real power consumed in AC." },
  { grade: "12", board: "ICSE", stream: "Science", subject: "Physics", chapter: "Wave Optics", title: "Path Difference", formula: "Δ = d sinθ", description: "Difference in optical path in interference." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Chemical Kinetics", title: "Integrated Rate Law for First Order", formula: "k = (2.303/t) log([A]₀/[A])", description: "First-order reaction rate law." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Electrochemistry", title: "Faraday's First Law", formula: "m = ZIt", description: "Mass deposited at electrode." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Solutions", title: "Molarity", formula: "M = n/V", description: "Moles of solute per litre of solution." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Solutions", title: "Molality", formula: "m = n_solute / kg_solvent", description: "Moles of solute per kg solvent." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Surface Chemistry", title: "Freundlich Adsorption Isotherm", formula: "x/m = kP^(1/n)", description: "Adsorption relation for gases on solids." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "p-Block Elements", title: "Oxoacid Formation", formula: "H₃PO₄", description: "Common oxoacid of phosphorus." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Organic Chemistry Basics", title: "Degree of Unsaturation", formula: "DU = (2C + 2 + N - H - X)/2", description: "Used to find unsaturation in organic compounds." },
  { grade: "12", board: "State Board", stream: "Science", subject: "Chemistry", chapter: "Hydrocarbons", title: "Combustion", formula: "C_xH_y + O₂ → CO₂ + H₂O", description: "General combustion of hydrocarbons." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Chemistry", chapter: "Chemical Kinetics", title: "Arrhenius Equation", formula: "k = Ae^{-Ea/RT}", description: "Temperature dependence of rate constant." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Chemistry", chapter: "Electrochemistry", title: "Conductance", formula: "G = 1/R", description: "Ease with which current passes through a conductor." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Chemistry", chapter: "Solutions", title: "Raoult's Law", formula: "p = p°x", description: "Vapour pressure lowering in ideal solutions." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Chemistry", chapter: "Surface Chemistry", title: "Catalyst", formula: "Rate increases", description: "Catalyst lowers activation energy and increases rate." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Chemistry", chapter: "Coordination Compounds", title: "Werner's Theory", formula: "Primary and secondary valency", description: "Foundation of coordination chemistry." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Chemistry", chapter: "Haloalkanes and Haloarenes", title: "SN1 Reaction", formula: "R-X → R⁺ + X⁻", description: "Unimolecular substitution mechanism." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Chemistry", chapter: "Alcohols, Phenols and Ethers", title: "Esterification", formula: "RCOOH + R'OH → RCOOR' + H₂O", description: "Formation of esters from acids and alcohols." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Chemistry", chapter: "Aldehydes, Ketones and Carboxylic Acids", title: "Tollen's Test", formula: "Ag⁺ + aldehyde → Ag mirror", description: "Used to detect aldehydes." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Chemistry", chapter: "Biomolecules", title: "Glucose Formula", formula: "C₆H₁₂O₆", description: "Molecular formula of glucose." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Matrices", title: "Determinant of 2x2 Matrix", formula: "det(A) = ad - bc", description: "Determinant of a 2x2 matrix." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Matrices", title: "Inverse of 2x2 Matrix", formula: "A⁻¹ = 1/(ad-bc) [[d,-b],[-c,a]]", description: "Inverse of a 2x2 matrix." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Continuity and Differentiability", title: "Product Rule", formula: "d(uv)/dx = u dv/dx + v du/dx", description: "Derivative of product of two functions." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Continuity and Differentiability", title: "Quotient Rule", formula: "d(u/v)/dx = (v du/dx - u dv/dx)/v²", description: "Derivative of quotient of two functions." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Application of Derivatives", title: "Slope of Tangent", formula: "m = dy/dx", description: "Gradient of tangent at a point." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Integrals", title: "Integration of x^n", formula: "∫x^n dx = x^{n+1}/(n+1) + C", description: "Basic power rule for integration." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Integrals", title: "Integration of e^x", formula: "∫e^x dx = e^x + C", description: "Integral of exponential function." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Differential Equations", title: "General Solution", formula: "y = ∫f(x)dx + C", description: "General form of solution of differential equation." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Vector Algebra", title: "Dot Product", formula: "a · b = |a||b| cosθ", description: "Scalar product of two vectors." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Vector Algebra", title: "Cross Product", formula: "|a × b| = |a||b| sinθ", description: "Vector product magnitude." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Mathematics", chapter: "Probability", title: "Conditional Probability", formula: "P(A|B) = P(A∩B)/P(B)", description: "Probability of A given B." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Biology", chapter: "Human Physiology", title: "Cardiac Output", formula: "CO = Stroke Volume × Heart Rate", description: "Amount of blood pumped by heart per minute." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Biology", chapter: "Plant Physiology", title: "Photosynthesis", formula: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", description: "Overall equation of photosynthesis." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Biology", chapter: "Genetics and Evolution", title: "Hardy-Weinberg", formula: "p² + 2pq + q² = 1", description: "Allele frequency equation in genetics." },
  { grade: "12", board: "CBSE", stream: "Science", subject: "Biology", chapter: "Ecology and Environment", title: "Population Growth", formula: "dN/dt = (b + i) - (d + e)N", description: "Change in population size over time." },
  { grade: "12", board: "CBSE", stream: "Commerce", subject: "Accountancy", chapter: "Partnership", title: "Sacrificing Ratio", formula: "Sacrificing Ratio = Old Ratio - New Ratio", description: "Share given up by partners on admission." },
  { grade: "12", board: "CBSE", stream: "Commerce", subject: "Accountancy", chapter: "Company Accounts", title: "Dividend", formula: "Dividend = Rate × Face Value × Number of Shares", description: "Return paid to shareholders." },
  { grade: "12", board: "CBSE", stream: "Commerce", subject: "Economics", chapter: "National Income", title: "National Income Identity", formula: "Y = C + I + G + (X - M)", description: "Aggregate demand identity." },
  { grade: "12", board: "CBSE", stream: "Commerce", subject: "Economics", chapter: "Money and Banking", title: "Credit Multiplier", formula: "Credit Multiplier = 1 / Reserve Ratio", description: "Expansion of bank credit through deposits." },
  { grade: "12", board: "CBSE", stream: "Commerce", subject: "Business Studies", chapter: "Financial Management", title: "Working Capital", formula: "Working Capital = Current Assets - Current Liabilities", description: "Amount of liquid resources available to business." },
  { grade: "12", board: "CBSE", stream: "Arts", subject: "Geography", chapter: "Population", title: "Crude Birth Rate", formula: "CBR = Births / Mid-year Population × 1000", description: "Birth rate per thousand population." },
  { grade: "12", board: "CBSE", stream: "Arts", subject: "Geography", chapter: "Migration", title: "Net Migration", formula: "Net Migration = In-migration - Out-migration", description: "Difference between arrivals and departures." }
];

const gradeFilter = document.getElementById("gradeFilter");
const boardFilter = document.getElementById("boardFilter");
const streamFilter = document.getElementById("streamFilter");
const subjectFilter = document.getElementById("subjectFilter");
const chapterFilter = document.getElementById("chapterFilter");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount");
const formulaGrid = document.getElementById("formulaGrid");
const chapterPills = document.getElementById("chapterPills");
const chapterSummaryTitle = document.getElementById("chapterSummaryTitle");
const chapterSummaryList = document.getElementById("chapterSummaryList");

const chapterNumberMap = {
  Physics: {
    "Physical World": 1,
    "Units and Measurements": 2,
    "Motion in a Straight Line": 3,
    "Motion in a Plane": 4,
    "Laws of Motion": 5,
    "Work, Energy and Power": 6,
    "Systems of Particles and Rotational Motion": 7,
    "Gravitation": 8,
    "Mechanical Properties of Solids": 9,
    "Mechanical Properties of Fluids": 10,
    "Thermal Properties of Matter": 11,
    "Thermodynamics": 12,
    "Kinetic Theory": 13,
    "Oscillations": 14,
    Waves: 15,
    Electrostatics: 16,
    "Current Electricity": 17,
    "Magnetic Effects": 18,
    "Electromagnetic Induction": 19,
    "Alternating Current": 20,
    "Ray Optics": 21,
    "Wave Optics": 22,
    "Dual Nature": 23,
    "Atoms and Nuclei": 24,
    "Semiconductor Electronics": 25
  },
  Chemistry: {
    "Some Basic Concepts of Chemistry": 1,
    "Structure of Atom": 2,
    "Classification of Elements": 3,
    "Chemical Bonding": 4,
    "States of Matter": 5,
    Thermodynamics: 6,
    Equilibrium: 7,
    "Redox Reactions": 8,
    Hydrogen: 9,
    "s-Block Elements": 10,
    "p-Block Elements": 11,
    "Organic Chemistry Basics": 12,
    Hydrocarbons: 13,
    "Chemical Kinetics": 14,
    "Electrochemistry": 15,
    Solutions: 16,
    "Surface Chemistry": 17,
    "Coordination Compounds": 18,
    "Haloalkanes and Haloarenes": 19,
    "Alcohols, Phenols and Ethers": 20,
    "Aldehydes, Ketones and Carboxylic Acids": 21,
    Biomolecules: 22,
    Polymers: 23,
    "Chemistry in Everyday Life": 24
  },
  Mathematics: {
    "Relations and Functions": 1,
    "Inverse Trigonometric Functions": 2,
    Matrices: 3,
    Determinants: 4,
    "Continuity and Differentiability": 5,
    "Application of Derivatives": 6,
    Integrals: 7,
    "Applications of Integrals": 8,
    "Differential Equations": 9,
    "Vector Algebra": 10,
    "Three Dimensional Geometry": 11,
    "Linear Programming": 12,
    Probability: 13
  },
  Biology: {
    "Diversity in the Living World": 1,
    "Structural Organisation in Animals and Plants": 2,
    "Cell: Structure and Function": 3,
    "Plant Physiology": 4,
    "Human Physiology": 5,
    Reproduction: 6,
    "Genetics and Evolution": 7,
    "Biology in Human Welfare": 8,
    Biotechnology: 9,
    "Ecology and Environment": 10
  },
  Accountancy: {
    "Accounting for Partnership": 1,
    "Company Accounts": 2
  },
  Economics: {
    "Basic Concepts": 1,
    "National Income": 2,
    "Money and Banking": 3
  },
  "Business Studies": {
    Marketing: 1,
    "Financial Management": 2
  },
  Geography: {
    Population: 1,
    Migration: 2,
    "Human Development": 3,
    "Resources and Development": 4
  }
};

function getChapterNumber(chapter, subject) {
  const normalizedSubject = subject?.trim();
  const subjectMap = normalizedSubject && chapterNumberMap[normalizedSubject];

  if (subjectMap) {
    const matchedChapter = Object.entries(subjectMap).find(([chapterName]) => chapterName.toLowerCase() === chapter.trim().toLowerCase());
    if (matchedChapter) {
      return matchedChapter[1];
    }
  }

  for (const subjectName of Object.keys(chapterNumberMap)) {
    const fallbackMap = chapterNumberMap[subjectName];
    const matchedChapter = Object.entries(fallbackMap).find(([chapterName]) => chapterName.toLowerCase() === chapter.trim().toLowerCase());
    if (matchedChapter) {
      return matchedChapter[1];
    }
  }

  return null;
}

function getChapterDisplayName(chapter, subject) {
  const chapterNumber = getChapterNumber(chapter, subject);
  return chapterNumber ? `Chapter ${chapterNumber}: ${chapter}` : chapter;
}

function getVisibleChapters() {
  const grade = gradeFilter.value;
  const board = boardFilter.value;
  const stream = streamFilter.value;
  const subject = subjectFilter.value;

  const matchingEntries = formulas
    .filter((item) => {
      const matchesGrade = grade === "All" || item.grade === grade;
      const matchesBoard = board === "All" || item.board === board;
      const matchesStream = stream === "All" || item.stream === stream;
      const matchesSubject = subject === "All" || item.subject === subject;
      return matchesGrade && matchesBoard && matchesStream && matchesSubject;
    })
    .map((item) => ({ chapter: item.chapter, subject: item.subject }));

  return [...new Map(matchingEntries.map((entry) => [entry.chapter, entry])).values()]
    .sort((a, b) => {
      const orderA = getChapterNumber(a.chapter, a.subject);
      const orderB = getChapterNumber(b.chapter, b.subject);

      if (orderA && orderB && orderA !== orderB) {
        return orderA - orderB;
      }

      if (orderA && !orderB) return -1;
      if (!orderA && orderB) return 1;
      return a.chapter.localeCompare(b.chapter);
    })
    .map((entry) => entry.chapter);
}

function renderChapterFilterOptions() {
  const visibleChapters = getVisibleChapters();
  const currentValue = chapterFilter.value;
  const selectedValue = visibleChapters.includes(currentValue) ? currentValue : "All";

  chapterFilter.innerHTML = [
    '<option value="All">All chapters</option>',
    ...visibleChapters.map((chapter) => `<option value="${chapter}" ${chapter === selectedValue ? "selected" : ""}>${getChapterDisplayName(chapter, subjectFilter.value)}</option>`)
  ].join("");

  chapterFilter.value = selectedValue;
}

function renderChapterPills() {
  const visibleChapters = getVisibleChapters();

  if (!visibleChapters.length) {
    chapterPills.innerHTML = '<div class="empty-state">No chapters for this selection.</div>';
    return;
  }

  chapterPills.innerHTML = visibleChapters
    .map((chapter) => {
      const isActive = chapterFilter.value === chapter;
      return `<button type="button" class="chapter-chip ${isActive ? "active" : ""}" data-chapter="${chapter}">${getChapterDisplayName(chapter, subjectFilter.value)}</button>`;
    })
    .join("");
}

function renderChapterSummary() {
  const subject = subjectFilter.value;
  const visibleChapters = getVisibleChapters();
  const subjectLabel = subject === "All" ? "All subjects" : subject;

  chapterSummaryTitle.textContent = `${subjectLabel} chapters`;

  if (!visibleChapters.length) {
    chapterSummaryList.innerHTML = '<span class="chapter-summary-chip">No chapters available</span>';
    return;
  }

  chapterSummaryList.innerHTML = visibleChapters
    .map((chapter) => `<span class="chapter-summary-chip">${getChapterDisplayName(chapter, subject)}</span>`)
    .join("");
}

function renderFormulas() {
  const grade = gradeFilter.value;
  const board = boardFilter.value;
  const stream = streamFilter.value;
  const subject = subjectFilter.value;
  const chapter = chapterFilter.value;
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filtered = formulas.filter((item) => {
    const matchesGrade = grade === "All" || item.grade === grade;
    const matchesBoard = board === "All" || item.board === board;
    const matchesStream = stream === "All" || item.stream === stream;
    const matchesSubject = subject === "All" || item.subject === subject;
    const matchesChapter = chapter === "All" || item.chapter === chapter;
    const haystack = `${item.title} ${item.subject} ${item.chapter} ${item.formula} ${item.description}`.toLowerCase();
    const matchesSearch = !searchTerm || haystack.includes(searchTerm);

    return matchesGrade && matchesBoard && matchesStream && matchesSubject && matchesChapter && matchesSearch;
  });

  renderChapterFilterOptions();
  renderChapterPills();
  renderChapterSummary();
  resultsCount.textContent = `${filtered.length} result${filtered.length === 1 ? "" : "s"}`;

  if (!filtered.length) {
    formulaGrid.innerHTML = '<div class="empty-state">No formulas match your filters yet. Try a broader search.</div>';
    return;
  }

  formulaGrid.innerHTML = filtered
    .map(
      (item) => `
        <article class="card">
          <div class="topline">
            <span class="badge">Class ${item.grade}</span>
            <span class="badge">${item.board}</span>
          </div>
          <h3>${item.title}</h3>
          <p>${item.subject} • ${item.chapter} • ${item.stream}</p>
          <p>${item.description}</p>
          <div class="formula-label">Formula</div>
          <div class="formula-explanation">${item.description}</div>
          <div class="formula">${item.formula}</div>
        </article>
      `
    )
    .join("");
}

[gradeFilter, boardFilter, streamFilter, subjectFilter, chapterFilter, searchInput].forEach((element) => {
  element.addEventListener("input", renderFormulas);
  element.addEventListener("change", renderFormulas);
});

chapterPills.addEventListener("click", (event) => {
  const button = event.target.closest(".chapter-chip");
  if (!button) return;

  chapterFilter.value = button.dataset.chapter;
  renderFormulas();
});

renderFormulas();
