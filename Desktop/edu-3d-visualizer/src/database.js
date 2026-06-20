// ==========================================================================
// Edu3D Scientific Database (Enhanced with Planets & Lab Instruments)
// ==========================================================================

const EduDatabase = {
    // === CHEMISTRY & ELEMENTS ===
    "hydrogen": {
        id: "hydrogen",
        name: "Hydrogen Atom",
        symbol: "H",
        category: "chemistry",
        description: "Hydrogen is the chemical element with the symbol H and atomic number 1. It is the lightest element and, at standard conditions, is a gas of diatomic molecules with the formula H₂. It is colorless, odorless, non-toxic, and highly combustible. Hydrogen is the most abundant chemical substance in the Universe, constituting roughly 75% of all normal matter.",
        properties: {
            "Atomic Number": "1",
            "Atomic Mass": "1.008 u",
            "State (STP)": "Gas",
            "Electron Config": "1s¹",
            "Group": "1 (Reactive Nonmetal)",
            "Electronegativity": "2.20"
        },
        controls: [
            { id: "shell-scale", label: "Orbital Radius", type: "slider", min: 1, max: 5, step: 0.1, value: 2.5, unit: " Å" },
            { id: "orbit-speed", label: "Electron Speed", type: "slider", min: 0, max: 2, step: 0.1, value: 1.0, unit: "x" }
        ],
        type: "atom",
        data: { protons: 1, neutrons: 0, electrons: [1] }
    },
    
    "helium": {
        id: "helium",
        name: "Helium Atom",
        symbol: "He",
        category: "chemistry",
        description: "Helium is a colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas group in the periodic table. Its boiling and melting points are the lowest among all elements. It is the second lightest and second most abundant element in the observable universe, being present at about 24% of the total elemental mass.",
        properties: {
            "Atomic Number": "2",
            "Atomic Mass": "4.0026 u",
            "State (STP)": "Gas",
            "Electron Config": "1s²",
            "Group": "18 (Noble Gas)",
            "Boiling Point": "-268.9 °C"
        },
        controls: [
            { id: "shell-scale", label: "Orbital Radius", type: "slider", min: 1, max: 5, step: 0.1, value: 2.2, unit: " Å" },
            { id: "orbit-speed", label: "Electron Speed", type: "slider", min: 0, max: 2, step: 0.1, value: 1.2, unit: "x" }
        ],
        type: "atom",
        data: { protons: 2, neutrons: 2, electrons: [2] }
    },
    
    "carbon": {
        id: "carbon",
        name: "Carbon Atom",
        symbol: "C",
        category: "chemistry",
        description: "Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic and tetravalent—making four electrons available to form covalent chemical bonds. It belongs to group 14 of the periodic table. Carbon makes up only about 0.025 percent of Earth's crust, but it forms the chemical basis for all known organic life.",
        properties: {
            "Atomic Number": "6",
            "Atomic Mass": "12.011 u",
            "State (STP)": "Solid (Graphite)",
            "Electron Config": "1s² 2s² 2p²",
            "Shells": "2, 4",
            "Valency": "4"
        },
        controls: [
            { id: "shell-scale", label: "Shell Spacing", type: "slider", min: 1, max: 3, step: 0.1, value: 1.5, unit: "" },
            { id: "orbit-speed", label: "Electron Speed", type: "slider", min: 0, max: 2, step: 0.1, value: 1.0, unit: "x" }
        ],
        type: "atom",
        data: { protons: 6, neutrons: 6, electrons: [2, 4] }
    },

    "oxygen": {
        id: "oxygen",
        name: "Oxygen Atom",
        symbol: "O",
        category: "chemistry",
        description: "Oxygen is the chemical element with the symbol O and atomic number 8. It is a member of the chalcogen group in the periodic table, a highly reactive nonmetal, and an oxidizing agent that readily forms oxides with most elements as well as with other compounds. Oxygen is Earth's most abundant element by mass, and after hydrogen and helium, it is the third-most abundant element in the universe.",
        properties: {
            "Atomic Number": "8",
            "Atomic Mass": "15.999 u",
            "State (STP)": "Gas",
            "Electron Config": "1s² 2s² 2p⁴",
            "Shells": "2, 6",
            "Electronegativity": "3.44"
        },
        controls: [
            { id: "shell-scale", label: "Shell Spacing", type: "slider", min: 1, max: 3, step: 0.1, value: 1.5, unit: "" },
            { id: "orbit-speed", label: "Electron Speed", type: "slider", min: 0, max: 2, step: 0.1, value: 1.0, unit: "x" }
        ],
        type: "atom",
        data: { protons: 8, neutrons: 8, electrons: [2, 6] }
    },

    "gold": {
        id: "gold",
        name: "Gold Atom",
        symbol: "Au",
        category: "chemistry",
        description: "Gold is a transition metal and a group 11 element. It is one of the least reactive chemical elements and is solid under standard conditions. Gold has been used widely throughout history as a currency, in jewelry, and in electronics due to its high conductivity, malleability, and resistance to corrosion.",
        properties: {
            "Atomic Number": "79",
            "Atomic Mass": "196.97 u",
            "State (STP)": "Solid",
            "Electron Config": "[Xe] 4f¹⁴ 5d¹⁰ 6s¹",
            "Shells": "2, 8, 18, 32, 18, 1",
            "Melting Point": "1064.18 °C"
        },
        controls: [
            { id: "shell-scale", label: "Shell Spacing", type: "slider", min: 0.5, max: 2, step: 0.05, value: 0.8, unit: "" },
            { id: "orbit-speed", label: "Electron Speed", type: "slider", min: 0, max: 2, step: 0.1, value: 0.8, unit: "x" }
        ],
        type: "atom",
        data: { protons: 79, neutrons: 118, electrons: [2, 8, 18, 32, 18, 1] }
    },

    "uranium": {
        id: "uranium",
        name: "Uranium Atom",
        symbol: "U",
        category: "chemistry",
        description: "Uranium is a silvery-grey metal in the actinide series of the periodic table. It has atomic number 92. A uranium atom has 92 protons and 92 electrons, of which 6 are valence electrons. Uranium is weakly radioactive because all its isotopes are unstable. Its most common isotopes are Uranium-238 (99.27% abundance) and Uranium-235 (0.72% abundance).",
        properties: {
            "Atomic Number": "92",
            "Atomic Mass": "238.03 u",
            "State (STP)": "Solid",
            "Electron Config": "[Rn] 5f³ 6d¹ 7s²",
            "Shells": "2, 8, 18, 32, 21, 9, 2",
            "Half-life (U-238)": "4.468 billion years"
        },
        controls: [
            { id: "shell-scale", label: "Shell Spacing", type: "slider", min: 0.4, max: 1.5, step: 0.05, value: 0.6, unit: "" },
            { id: "orbit-speed", label: "Electron Speed", type: "slider", min: 0, max: 2, step: 0.1, value: 0.6, unit: "x" }
        ],
        type: "atom",
        data: { protons: 92, neutrons: 146, electrons: [2, 8, 18, 32, 21, 9, 2] }
    },

    // === MOLECULES ===
    "water": {
        id: "water",
        name: "Water Molecule",
        formula: "H₂O",
        category: "chemistry",
        description: "Water is an inorganic, transparent, tasteless, odorless, and nearly colorless chemical substance, which is the main constituent of Earth's hydrosphere and the fluids of all known living organisms. The covalent bond angle in water is 104.45°, and it behaves as a polar molecule (oxygen holds a partial negative charge while hydrogen carries a partial positive charge), leading to hydrogen bonding properties.",
        properties: {
            "Molar Mass": "18.015 g/mol",
            "Density": "1.00 g/cm³",
            "Melting Point": "0.00 °C",
            "Boiling Point": "100.00 °C",
            "Bond Angle": "104.45°",
            "Dipole Moment": "1.85 D"
        },
        controls: [
            { id: "bond-length", label: "Bond Length", type: "slider", min: 1, max: 3, step: 0.1, value: 1.8, unit: " Å" },
            { id: "bond-angle", label: "Bond Angle", type: "slider", min: 90, max: 120, step: 1, value: 104, unit: "°" }
        ],
        type: "molecule",
        data: {
            atoms: [
                { type: "O", x: 0, y: 0.35, z: 0, size: 0.8, color: 0xef4444 },
                { type: "H", x: -1.35, y: -0.7, z: 0, size: 0.5, color: 0xffffff },
                { type: "H", x: 1.35, y: -0.7, z: 0, size: 0.5, color: 0xffffff }
            ],
            bonds: [
                { from: 0, to: 1 },
                { from: 0, to: 2 }
            ]
        }
    },

    "carbon_dioxide": {
        id: "carbon_dioxide",
        name: "Carbon Dioxide",
        formula: "CO₂",
        category: "chemistry",
        description: "Carbon dioxide is a chemical compound composed of one carbon atom covalently double-bonded to two oxygen atoms. It is a gas at standard temperature and pressure and exists in Earth's atmosphere as a greenhouse gas. The molecule is linear and centrosymmetric, meaning it has a symmetric linear shape and lacks an electric dipole moment.",
        properties: {
            "Molar Mass": "44.01 g/mol",
            "Density (Gas)": "1.87 kg/m³",
            "Bond Angle": "180° (Linear)",
            "Solubility in Water": "1.45 g/L (25 °C)",
            "Triple Point": "-56.6 °C, 5.11 atm"
        },
        controls: [
            { id: "bond-length", label: "C-O Bond Length", type: "slider", min: 1, max: 3, step: 0.1, value: 2.0, unit: " Å" }
        ],
        type: "molecule",
        data: {
            atoms: [
                { type: "C", x: 0, y: 0, z: 0, size: 0.7, color: 0x374151 },
                { type: "O", x: -2.0, y: 0, z: 0, size: 0.8, color: 0xef4444 },
                { type: "O", x: 2.0, y: 0, z: 0, size: 0.8, color: 0xef4444 }
            ],
            bonds: [
                { from: 0, to: 1, double: true },
                { from: 0, to: 2, double: true }
            ]
        }
    },

    "methane": {
        id: "methane",
        name: "Methane Molecule",
        formula: "CH₄",
        category: "chemistry",
        description: "Methane is a chemical compound with the chemical formula CH₄ (one carbon atom and four hydrogen atoms). It is a group-14 hydride, the simplest alkane, and the main constituent of natural gas. Methane has a tetrahedral molecular geometry, where the carbon atom resides in the center, and the four hydrogen atoms sit at the corners of a regular tetrahedron.",
        properties: {
            "Molar Mass": "16.04 g/mol",
            "Density (STP)": "0.656 kg/m³",
            "Geometry": "Tetrahedral",
            "Bond Angle": "109.5°",
            "Melting Point": "-182.5 °C"
        },
        controls: [
            { id: "bond-length", label: "C-H Bond Length", type: "slider", min: 1, max: 3, step: 0.1, value: 1.8, unit: " Å" }
        ],
        type: "molecule",
        data: {
            atoms: [
                { type: "C", x: 0, y: 0, z: 0, size: 0.7, color: 0x374151 },
                { type: "H", x: 0, y: 1.6, z: 0, size: 0.45, color: 0xffffff },
                { type: "H", x: 1.5, y: -0.53, z: 0, size: 0.45, color: 0xffffff },
                { type: "H", x: -0.75, y: -0.53, z: 1.3, size: 0.45, color: 0xffffff },
                { type: "H", x: -0.75, y: -0.53, z: -1.3, size: 0.45, color: 0xffffff }
            ],
            bonds: [
                { from: 0, to: 1 },
                { from: 0, to: 2 },
                { from: 0, to: 3 },
                { from: 0, to: 4 }
            ]
        }
    },

    "ethanol": {
        id: "ethanol",
        name: "Ethanol Molecule",
        formula: "C₂H₅OH",
        category: "chemistry",
        description: "Ethanol (also called ethyl alcohol, grain alcohol, or drinking alcohol) is an organic compound. It is a simple alcohol with the chemical formula C₂H₆O (often written as C₂H₅OH). It is a volatile, flammable, colorless liquid with a characteristic chemical odor. Ethanol is produced naturally by the fermentation of sugars by yeasts or via petrochemical processes.",
        properties: {
            "Molar Mass": "46.07 g/mol",
            "Density": "0.789 g/cm³",
            "Melting Point": "-114.1 °C",
            "Boiling Point": "78.37 °C",
            "Flash Point": "13 °C (Liquid)"
        },
        controls: [
            { id: "bond-length", label: "Bond Scale", type: "slider", min: 1, max: 3, step: 0.1, value: 1.6, unit: "" }
        ],
        type: "molecule",
        data: {
            atoms: [
                { type: "C", x: -1.1, y: -0.3, z: 0, size: 0.7, color: 0x374151 }, // C1
                { type: "C", x: 0.9, y: 0.6, z: 0, size: 0.7, color: 0x374151 },  // C2
                { type: "O", x: 2.5, y: -0.5, z: 0, size: 0.8, color: 0xef4444 },  // O
                { type: "H", x: 3.7, y: 0.0, z: 0, size: 0.45, color: 0xffffff },  // H (hydroxyl)
                { type: "H", x: -1.1, y: -1.4, z: 0, size: 0.45, color: 0xffffff }, // H (C1)
                { type: "H", x: -1.8, y: 0.3, z: 1.1, size: 0.45, color: 0xffffff }, // H (C1)
                { type: "H", x: -1.8, y: 0.3, z: -1.1, size: 0.45, color: 0xffffff },// H (C1)
                { type: "H", x: 0.9, y: 1.6, z: 1.1, size: 0.45, color: 0xffffff },  // H (C2)
                { type: "H", x: 0.9, y: 1.6, z: -1.1, size: 0.45, color: 0xffffff }  // H (C2)
            ],
            bonds: [
                { from: 0, to: 1 }, // C-C
                { from: 1, to: 2 }, // C-O
                { from: 2, to: 3 }, // O-H
                { from: 0, to: 4 }, // C1-H
                { from: 0, to: 5 }, // C1-H
                { from: 0, to: 6 }, // C1-H
                { from: 1, to: 7 }, // C2-H
                { from: 1, to: 8 }  // C2-H
            ]
        }
    },

    "caffeine": {
        id: "caffeine",
        name: "Caffeine Molecule",
        formula: "C₈H₁₀N₄O₂",
        category: "chemistry",
        description: "Caffeine is a central nervous system stimulant of the methylxanthine class. It is the world's most widely consumed psychoactive drug. Caffeine is a purine-based alkaloid consisting of a fused pyrimidinedione and imidazole ring system. It operates primarily by antagonizing adenosine receptors in the human brain, preventing drowsiness.",
        properties: {
            "Molar Mass": "194.19 g/mol",
            "Melting Point": "235 °C",
            "Class": "Alkaloid (Xanthine)",
            "Systemic Name": "1,3,7-Trimethylxanthine",
            "Appearance": "White odorless crystals"
        },
        controls: [
            { id: "bond-length", label: "Atom Bond Scale", type: "slider", min: 0.8, max: 2, step: 0.1, value: 1.2, unit: "" }
        ],
        type: "molecule",
        data: {
            atoms: [
                { type: "N", x: -0.6, y: -1.6, z: 0, size: 0.7, color: 0x3b82f6 }, // N1 (0)
                { type: "C", x: -1.9, y: -1.1, z: 0, size: 0.7, color: 0x374151 }, // C2 (1)
                { type: "N", x: -1.9, y: 0.3, z: 0, size: 0.7, color: 0x3b82f6 },  // N3 (2)
                { type: "C", x: -0.6, y: 0.8, z: 0, size: 0.7, color: 0x374151 },  // C4 (3)
                { type: "C", x: 0.3, y: -0.4, z: 0, size: 0.7, color: 0x374151 },  // C5 (4)
                { type: "C", x: 0.6, y: 2.1, z: 0, size: 0.7, color: 0x374151 },   // C6 (5)
                { type: "N", x: 1.9, y: 1.6, z: 0, size: 0.7, color: 0x3b82f6 },   // N7 (6)
                { type: "C", x: 1.9, y: 0.2, z: 0, size: 0.7, color: 0x374151 },   // C8 (7)
                { type: "N", x: 0.7, y: -0.6, z: 0, size: 0.7, color: 0x3b82f6 },  // N9 (8)
                { type: "O", x: 0.3, y: 3.3, z: 0, size: 0.75, color: 0xef4444 },  // O1 (9)
                { type: "O", x: 3.0, y: -0.4, z: 0, size: 0.75, color: 0xef4444 }, // O2 (10)
                { type: "C", x: -3.2, y: 1.0, z: 0, size: 0.7, color: 0x374151 },  // Methyl C (11)
                { type: "C", x: 3.2, y: 2.3, z: 0, size: 0.7, color: 0x374151 },  // Methyl C (12)
                { type: "C", x: -0.6, y: -3.1, z: 0, size: 0.7, color: 0x374151 }  // Methyl C (13)
            ],
            bonds: [
                { from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 0 }, // Ring 1
                { from: 3, to: 5 }, { from: 5, to: 6 }, { from: 6, to: 7 }, { from: 7, to: 8 }, { from: 8, to: 4 }, // Ring 2
                { from: 5, to: 9, double: true },  // C=O
                { from: 7, to: 10, double: true }, // C=O
                { from: 2, to: 11 }, // N-CH3
                { from: 6, to: 12 }, // N-CH3
                { from: 0, to: 13 }  // N-CH3
            ]
        }
    },

    "nacl": {
        id: "nacl",
        name: "NaCl Ionic Lattice",
        formula: "NaCl",
        category: "chemistry",
        description: "Sodium chloride, commonly known as salt, is an ionic compound with the chemical formula NaCl, representing a 1:1 ratio of sodium and chloride ions. In its crystalline state, it forms a face-centered cubic (FCC) lattice. The lattice consists of two interpenetrating FCC sublattices where sodium cations ($Na^+$) and chloride anions ($Cl^-$) alternate along the edges, giving a coordination number of 6 for both ions.",
        properties: {
            "Molar Mass": "58.44 g/mol",
            "Crystal Structure": "Face-Centered Cubic (Halite)",
            "Coordination Number": "6:6",
            "Melting Point": "801 °C",
            "Refractive Index": "1.544"
        },
        controls: [
            { id: "lattice-spacing", label: "Ion Spacing", type: "slider", min: 1.2, max: 3, step: 0.1, value: 2.0, unit: " Å" },
            { id: "ion-ratio", label: "Cation/Anion Radius Ratio", type: "slider", min: 0.4, max: 1.2, step: 0.05, value: 0.7, unit: "" }
        ],
        type: "lattice_nacl"
    },

    // === LATTICES ===
    "simple_cubic": {
        id: "simple_cubic",
        name: "Simple Cubic Lattice (SC)",
        symbol: "SC",
        category: "lattices",
        description: "The Simple Cubic (SC) lattice structure consists of atoms located at the eight corners of a regular cube. It is the simplest three-dimensional crystalline system. Due to its low packing density, this crystal structure is extremely rare in nature, with Polonium (Po) being the only element that crystallizes in a simple cubic structure under standard conditions.",
        latticeDetails: {
            coordination: "6",
            efficiency: "52.4%",
            atomCount: "1 (8 corners × 1/8)",
            examples: "Polonium (α-Po)"
        },
        properties: {
            "Coordination Number": "6",
            "Packing Efficiency": "52.4%",
            "Net Atoms / Unit Cell": "1",
            "Lattice Constants": "a = b = c",
            "Angles": "α = β = γ = 90°",
            "Atomic Radius Relation": "a = 2r"
        },
        controls: [
            { id: "lattice-size", label: "Superlattice Grid Size", type: "slider", min: 1, max: 3, step: 1, value: 2, unit: "x" },
            { id: "atom-radius", label: "Atomic Radius (Sphere)", type: "slider", min: 0.15, max: 0.5, step: 0.02, value: 0.25, unit: "a" }
        ],
        type: "lattice",
        data: { mode: "sc" }
    },

    "bcc": {
        id: "bcc",
        name: "Body-Centered Cubic (BCC)",
        symbol: "BCC",
        category: "lattices",
        description: "The Body-Centered Cubic (BCC) crystal structure has atoms located at all eight corners of a cube, with a single additional atom placed directly in the geometric center of the cube. The central atom is in contact with all eight corner atoms. This packing arrangement provides greater structural stability than simple cubic, making it a very common configuration for metals at high temperatures.",
        latticeDetails: {
            coordination: "8",
            efficiency: "68.0%",
            atomCount: "2 (8 corners × 1/8 + 1 center)",
            examples: "Iron (Fe), Chromium (Cr), Sodium (Na), Tungsten (W)"
        },
        properties: {
            "Coordination Number": "8",
            "Packing Efficiency": "68.0%",
            "Net Atoms / Unit Cell": "2",
            "Atomic Radius Relation": "4r = a√3",
            "Slip Systems": "48 (High deformability)",
            "Common Phases": "Ferrite (α-Fe)"
        },
        controls: [
            { id: "lattice-size", label: "Superlattice Grid Size", type: "slider", min: 1, max: 3, step: 1, value: 2, unit: "x" },
            { id: "atom-radius", label: "Atomic Radius (Sphere)", type: "slider", min: 0.15, max: 0.43, step: 0.02, value: 0.25, unit: "a" }
        ],
        type: "lattice",
        data: { mode: "bcc" }
    },

    "fcc": {
        id: "fcc",
        name: "Face-Centered Cubic (FCC)",
        symbol: "FCC",
        category: "lattices",
        description: "The Face-Centered Cubic (FCC) crystal structure features atoms at the eight corners of a cube, along with an atom positioned in the center of all six cubic faces. FCC is a close-packed structure with the maximum theoretical packing density of spheres in three dimensions. The coordination number of 12 represents a highly dense, stable arrangement characteristic of ductile metals.",
        latticeDetails: {
            coordination: "12",
            efficiency: "74.0%",
            atomCount: "4 (8 corners × 1/8 + 6 faces × 1/2)",
            examples: "Aluminum (Al), Copper (Cu), Gold (Au), Silver (Ag), Lead (Pb)"
        },
        properties: {
            "Coordination Number": "12",
            "Packing Efficiency": "74.0% (Close-packed)",
            "Net Atoms / Unit Cell": "4",
            "Atomic Radius Relation": "4r = a√2",
            "Stacking Sequence": "ABCABC...",
            "Ductility": "Very high"
        },
        controls: [
            { id: "lattice-size", label: "Superlattice Grid Size", type: "slider", min: 1, max: 3, step: 1, value: 2, unit: "x" },
            { id: "atom-radius", label: "Atomic Radius (Sphere)", type: "slider", min: 0.15, max: 0.35, step: 0.02, value: 0.22, unit: "a" }
        ],
        type: "lattice",
        data: { mode: "fcc" }
    },

    "hcp": {
        id: "hcp",
        name: "Hexagonal Close-Packed (HCP)",
        symbol: "HCP",
        category: "lattices",
        description: "The Hexagonal Close-Packed (HCP) structure is another close-packed configuration with a maximum packing efficiency of 74%. It consists of alternating close-packed atomic layers arranged in an ABAB stacking sequence. The unit cell is a hexagonal prism containing atoms at its corners, top/bottom face centers, and three atoms inside the mid-plane of the cell, providing high rigidity and lower ductility than FCC.",
        latticeDetails: {
            coordination: "12",
            efficiency: "74.0%",
            atomCount: "6 (12 corners × 1/6 + 2 centers × 1/2 + 3 internal)",
            examples: "Titanium (Ti), Zinc (Zn), Magnesium (Mg), Cadmium (Cd)"
        },
        properties: {
            "Coordination Number": "12",
            "Packing Efficiency": "74.0%",
            "Net Atoms / Unit Cell": "6",
            "c/a Axial Ratio": "1.633 (Ideal)",
            "Stacking Sequence": "ABABAB...",
            "Basal Plane": "Easy slip along (0001)"
        },
        controls: [
            { id: "lattice-size", label: "Superlattice Grid Size", type: "slider", min: 1, max: 2, step: 1, value: 1, unit: "x" },
            { id: "atom-radius", label: "Atomic Radius (Sphere)", type: "slider", min: 0.15, max: 0.35, step: 0.02, value: 0.25, unit: "a" }
        ],
        type: "lattice",
        data: { mode: "hcp" }
    },

    "diamond_lattice": {
        id: "diamond_lattice",
        name: "Diamond Cubic Lattice",
        symbol: "C (Diamond)",
        category: "lattices",
        description: "The Diamond Cubic structure is a three-dimensional crystalline lattice formed by carbon atoms under extreme pressure. It can be viewed as two interpenetrating Face-Centered Cubic (FCC) lattices shifted relative to each other by 1/4 of the body diagonal. Each carbon atom is tetrahedrally bonded to four other carbon atoms, resulting in the famous structural rigidity that makes diamond the hardest natural bulk material.",
        latticeDetails: {
            coordination: "4",
            efficiency: "34.0%",
            atomCount: "8 (8 corners × 1/8 + 6 faces × 1/2 + 4 internal)",
            examples: "Diamond, Silicon (Si), Germanium (Ge), Gray Tin (α-Sn)"
        },
        properties: {
            "Coordination Number": "4 (Tetrahedral)",
            "Packing Efficiency": "34.0% (Low, due to covalent bonds)",
            "Net Atoms / Unit Cell": "8",
            "Bond Angle": "109.5°",
            "Unit Cell Geometry": "FCC Sub-lattices",
            "Hardness (Mohs Scale)": "10"
        },
        controls: [
            { id: "lattice-size", label: "Unit Cells", type: "slider", min: 1, max: 2, step: 1, value: 1, unit: "" },
            { id: "atom-radius", label: "Atomic Radius (Sphere)", type: "slider", min: 0.1, max: 0.25, step: 0.01, value: 0.15, unit: "a" }
        ],
        type: "lattice",
        data: { mode: "diamond" }
    },

    "graphene": {
        id: "graphene",
        name: "Graphene Sheet",
        symbol: "C (Graphene)",
        category: "lattices",
        description: "Graphene is a single, two-dimensional sheet of carbon atoms organized in a hexagonal, honeycomb lattice. It is an allotrope of carbon and the basic structural element of graphite, carbon nanotubes, and fullerenes. Carbon atoms in graphene are $sp^2$-hybridized, providing a strong network of covalent bonds along the plane. Graphene displays extraordinary electrical conductivity, heat conduction, and mechanical strength.",
        latticeDetails: {
            coordination: "3",
            efficiency: "N/A (2D Single Sheet)",
            atomCount: "2 (per 2D unit cell)",
            examples: "Single-layer graphene, carbon nanotubes (rolled graphene)"
        },
        properties: {
            "Coordination Number": "3 (sp² Hybridized)",
            "Thickness": "0.345 nm (1 atom thick)",
            "Tensile Strength": "130 GPa (100x stronger than steel)",
            "Electron Mobility": "200,000 cm²/(V·s)",
            "Thermal Conductivity": "5000 W/m·K",
            "Transparency": "97.7% light transmittance"
        },
        controls: [
            { id: "sheet-size", label: "Sheet Dimensions", type: "slider", min: 4, max: 12, step: 2, value: 8, unit: " atoms" },
            { id: "wave-amp", label: "Wave Amplitude (Thermal Vibration)", type: "slider", min: 0, max: 1, step: 0.05, value: 0.3, unit: "" },
            { id: "wave-speed", label: "Vibration Frequency", type: "slider", min: 0, max: 2, step: 0.1, value: 1.0, unit: "Hz" }
        ],
        type: "lattice",
        data: { mode: "graphene" }
    },

    // === ASTRONOMY & SPACE ===
    "sun": {
        id: "sun",
        name: "The Sun",
        symbol: "☉",
        category: "astronomy",
        description: "The Sun is the star at the center of the Solar System. It is a nearly perfect ball of hot plasma, heated to incandescence by nuclear fusion reactions in its core, radiating energy mainly as light, ultraviolet, and infrared radiation. In this high-fidelity simulation, we generate a procedural turbulent fire surface on the solar sphere, combined with glowing corona flares.",
        properties: {
            "Spectral Class": "G2V (Yellow Dwarf)",
            "Surface Temp": "5,500 °C",
            "Core Temp": "15,000,000 °C",
            "Mass": "1.989 × 10³⁰ kg",
            "Age": "4.6 billion years",
            "Composition": "73% H, 25% He"
        },
        controls: [
            { id: "corona-size", label: "Corona Intensity", type: "slider", min: 1, max: 3, step: 0.1, value: 1.8, unit: "" },
            { id: "rotation-speed", label: "Sun Rotation Speed", type: "slider", min: 0, max: 3, step: 0.1, value: 1.0, unit: "x" }
        ],
        type: "space",
        data: { body: "sun" }
    },

    "earth": {
        id: "earth",
        name: "Earth (Globe)",
        symbol: "♁",
        category: "astronomy",
        description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. This simulation uses a Canvas-generated texture map showing detailed green and brown continent landmasses, blue oceans, and a secondary outer translucent sphere containing white cloud layers. The clouds rotate independently of the planet's axis, creating a beautiful 3D parallax atmosphere overlay.",
        properties: {
            "Equatorial Radius": "6,378 km",
            "Orbit Period": "365.25 days",
            "Rotation Period": "23.93 hours",
            "Atmosphere Pressure": "101.325 kPa",
            "Satellites": "1 (The Moon)"
        },
        controls: [
            { id: "moon-dist", label: "Moon Orbital Radius", type: "slider", min: 3, max: 10, step: 0.5, value: 6.0, unit: " Earth Radii" },
            { id: "moon-speed", label: "Moon Orbital Speed", type: "slider", min: 0, max: 3, step: 0.1, value: 1.0, unit: "x" },
            { id: "tilt-angle", label: "Earth Axial Tilt", type: "slider", min: 0, max: 45, step: 0.5, value: 23.5, unit: "°" }
        ],
        type: "space",
        data: { body: "earth" }
    },

    "saturn": {
        id: "saturn",
        name: "Saturn (Globe)",
        symbol: "♄",
        category: "astronomy",
        description: "Saturn is the sixth planet from the Sun, a gas giant with an oblate shape. Its atmosphere features colorful, swirling gas bands. This model generates concentric banded texture maps along its poles, aligning seamlessly with its massive flat ring system composed of icy fragments and cosmic dust particles.",
        properties: {
            "Mean Radius": "58,232 km",
            "Mass": "95 Earths",
            "Rotation Period": "10.66 hours",
            "Ring Span": "282,000 km diameter",
            "Satellites": "146 confirmed moons"
        },
        controls: [
            { id: "ring-angle", label: "Ring System Tilt", type: "slider", min: 0, max: 40, step: 1, value: 27, unit: "°" },
            { id: "ring-width", label: "Ring Width Factor", type: "slider", min: 1, max: 2, step: 0.05, value: 1.4, unit: "" },
            { id: "rotation-speed", label: "Rotation Speed", type: "slider", min: 0, max: 2, step: 0.1, value: 1.0, unit: "x" }
        ],
        type: "space",
        data: { body: "saturn" }
    },

    "mars": {
        id: "mars",
        name: "Mars (Globe)",
        symbol: "♂",
        category: "astronomy",
        description: "Mars is the fourth planet from the Sun, often called the 'Red Planet' due to iron oxide (rust) on its surface. This model uses a procedural canvas texture displaying reddish-orange deserts, dark basaltic dust plains, and bright white polar ice caps at the north and south poles. It rotates on its axis, showcasing a dusty atmosphere.",
        properties: {
            "Equatorial Radius": "3,389 km",
            "Orbit Period": "687 days",
            "Surface Temp": "-62 °C (Average)",
            "Atmosphere": "95% CO₂, very thin",
            "Satellites": "2 (Phobos, Deimos)"
        },
        controls: [
            { id: "rotation-speed", label: "Rotation Speed", type: "slider", min: 0, max: 3, step: 0.1, value: 1.0, unit: "x" },
            { id: "polar-cap-size", label: "Polar Cap Radius", type: "slider", min: 0.1, max: 0.4, step: 0.05, value: 0.2, unit: " rad" }
        ],
        type: "space",
        data: { body: "mars" }
    },

    "jupiter": {
        id: "jupiter",
        name: "Jupiter (Globe)",
        symbol: "♃",
        category: "astronomy",
        description: "Jupiter is the largest planet in our solar system, a gas giant primarily made of hydrogen and helium. This high-fidelity model generates a detailed procedural canvas texture displaying colorful, alternating atmospheric bands of orange, brown, red, and cream, along with the giant anti-cyclonic storm system known as the 'Great Red Spot'.",
        properties: {
            "Equatorial Radius": "71,492 km",
            "Mass": "318 Earths",
            "Rotation Period": "9.9 hours (Fastest)",
            "Great Red Spot Size": "16,350 km wide",
            "Satellites": "95 moons (e.g. Io, Europa)"
        },
        controls: [
            { id: "rotation-speed", label: "Rotation Speed", type: "slider", min: 0, max: 3, step: 0.1, value: 1.2, unit: "x" },
            { id: "spot-angle", label: "Great Red Spot Lat", type: "slider", min: -35, max: -15, step: 1, value: -22, unit: "°" }
        ],
        type: "space",
        data: { body: "jupiter" }
    },

    "moon": {
        id: "moon",
        name: "The Moon (Globe)",
        symbol: "☾",
        category: "astronomy",
        description: "The Moon is Earth's only natural satellite. This model generates a high-contrast procedural lunar texture showcasing the dark, basaltic plains called 'lunar maria' (seas) formed by ancient volcanic eruptions, alongside highly cratered, bright highlands.",
        properties: {
            "Mean Radius": "1,737 km (0.27 Earths)",
            "Gravity": "1.62 m/s² (16.6% of Earth)",
            "Orbital Distance": "384,400 km",
            "Rotation Period": "27.3 days (Tidally locked)",
            "Surface": "Regolith dust and craters"
        },
        controls: [
            { id: "rotation-speed", label: "Moon Rotation Speed", type: "slider", min: 0, max: 2, step: 0.1, value: 1.0, unit: "x" }
        ],
        type: "space",
        data: { body: "moon" }
    },

    "black_hole": {
        id: "black_hole",
        name: "Schwarzschild Black Hole",
        symbol: "🕳",
        category: "astronomy",
        description: "A black hole is a region of spacetime where gravity is so strong that nothing—no particles or even electromagnetic radiation such as light—has enough energy to escape its gravitational pull. The boundary of no escape is called the event sphere (event horizon). Surrounding a black hole is an accretion disk of superheated dust and gas, which glows brightly and bends visually around the black hole due to intense gravitational lensing.",
        properties: {
            "Class": "Stellar/Supermassive",
            "Event Horizon Radius": "Schwarzschild Radius (2GM/c²)",
            "Accretion Temp": "Millions of Kelvin",
            "Gravitational Lensing": "Einstein Ring bending effect",
            "Hawking Radiation": "Extremely weak energy decay",
            "Singularity": "Infinite density point"
        },
        controls: [
            { id: "disk-radius", label: "Accretion Disk Radius", type: "slider", min: 2.5, max: 8, step: 0.2, value: 4.5, unit: " Rs" },
            { id: "disk-speed", label: "Accretion Rotation Speed", type: "slider", min: 0, max: 3, step: 0.1, value: 1.5, unit: "x" },
            { id: "lensing-strength", label: "Gravitational Lensing", type: "slider", min: 0.5, max: 2.5, step: 0.1, value: 1.5, unit: "" }
        ],
        type: "space",
        data: { body: "blackhole" }
    },

    // === PHYSICS & LAB INSTRUMENTS ===
    "vernier_caliper": {
        id: "vernier_caliper",
        name: "Vernier Caliper",
        formula: "Reading = MSR + (VC × LC)",
        category: "physics",
        description: "A Vernier Caliper is a high-precision linear measuring instrument used in physics laboratories to measure inner/outer diameters and depths of small objects. It consists of a Main Scale (least count 1 mm) and a sliding Vernier Scale (least count 0.1 mm, divided into 10 divisions matching 9 mm of main scale). When the jaws clamp onto an object, the reading is obtained by finding the Main Scale division just before the Vernier zero ($MSR$) and adding the Vernier division that lines up perfectly with any main scale line ($VC$) multiplied by the Least Count ($LC = 0.1\\text{ mm}$).",
        properties: {
            "Least Count (LC)": "0.1 mm (0.01 cm)",
            "Main Scale divisions": "1.0 mm increments",
            "Vernier divisions": "10 divisions = 9.0 mm",
            "Max Measurement": "120.0 mm",
            "Standard Material": "Tempered Stainless Steel"
        },
        controls: [
            { id: "object-size", label: "Object Diameter", type: "slider", min: 0, max: 60, step: 0.1, value: 24.5, unit: " mm" },
            { id: "frame-opacity", label: "Caliper Opacity", type: "slider", min: 0.4, max: 1.0, step: 0.05, value: 0.95, unit: "" }
        ],
        type: "instrument_vernier"
    },

    "ray_optics": {
        id: "ray_optics",
        name: "Convex Lens Optics Bench",
        formula: "1/v - 1/u = 1/f",
        category: "physics",
        description: "An optical bench is a basic laboratory instrument used to conduct focal length and image formation experiments. This biconvex glass lens refraction model shows three principal light rays emerging from a source arrow: a parallel ray bending through the focal point, an optical center ray continuing undeflected, and a focal ray exiting parallel. Adjusting sliders calculates the image distance ($v$) using the lens formula, illustrating real/inverted images (when object distance $u > f$) or virtual/erect magnifying images (when $u < f$).",
        properties: {
            "Lens Type": "Double Convex (Converging)",
            "Lens Formula": "1/v - 1/u = 1/f (Cartesian)",
            "Calculated Image (v)": "v = (u·f)/(u + f)",
            "Magnification (m)": "m = v / u",
            "Image Nature": "Real / Virtual (depends on u)"
        },
        controls: [
            { id: "object-dist", label: "Object Distance (-u)", type: "slider", min: 1.2, max: 5.0, step: 0.1, value: 3.0, unit: " m" },
            { id: "focal-len", label: "Focal Length (f)", type: "slider", min: 0.8, max: 2.2, step: 0.1, value: 1.5, unit: " m" }
        ],
        type: "instrument_optics"
    },

    "magnifying_glass": {
        id: "magnifying_glass",
        name: "Magnifying Glass",
        formula: "M = 1 + D/f",
        category: "physics",
        description: "A magnifying glass is a double convex lens that produces a magnified virtual image of an object placed within its focal length. This 3D simulation renders a brass-rimmed magnifying glass held over a printed text grid. Adjusting the lens height shows real-time light refraction, displaying a magnified, upright virtual image of the letters directly through the glass lens.",
        properties: {
            "Lens Configuration": "Biconvex Glass Lens",
            "Near Point (D)": "25 cm (Human Eye)",
            "Angular Magnification": "M ≈ D / f",
            "Image Orientation": "Upright, Virtual, Magnified",
            "Achromatic Coating": "None (shows chromatic dispersion)"
        },
        controls: [
            { id: "lens-height", label: "Lens Height", type: "slider", min: 1.2, max: 3.5, step: 0.1, value: 2.0, unit: " units" },
            { id: "glass-power", label: "Lens Magnification Power", type: "slider", min: 1.5, max: 4.5, step: 0.1, value: 2.8, unit: "x" }
        ],
        type: "instrument_magnifier"
    },

    "simple_pendulum": {
        id: "simple_pendulum",
        name: "Simple Pendulum",
        formula: "T ≈ 2π√(L/g)",
        category: "physics",
        description: "A simple pendulum consists of a mass (bob) suspended from a pivot by a light string or rod, which swings back and forth in a regular harmonic motion when displaced. Under small angle approximations, its period of oscillation is independent of the mass of the bob and the amplitude of the swing. Adjusting the string length or gravity alters the oscillation period according to physical laws.",
        properties: {
            "Motion Type": "Simple Harmonic Motion (SHM)",
            "Theoretical Period (T)": "T = 2π√(L/g)",
            "Restoring Force": "F_restoring = -m·g·sin(θ)",
            "Maximum Velocity": "v_max = √(2gL(1 - cos(θ_max)))",
            "Conservation of Energy": "Kinetic + Potential = Constant"
        },
        controls: [
            { id: "string-length", label: "String Length (L)", type: "slider", min: 1.5, max: 4.5, step: 0.1, value: 3.0, unit: " m" },
            { id: "gravity-accel", label: "Gravity (g)", type: "slider", min: 1.0, max: 25.0, step: 0.5, value: 9.8, unit: " m/s²" },
            { id: "damping-factor", label: "Damping / Air Resistance", type: "slider", min: 0, max: 0.05, step: 0.001, value: 0.005, unit: "" },
            { id: "init-angle", label: "Initial Displacement", type: "slider", min: 10, max: 75, step: 5, value: 45, unit: "°" }
        ],
        type: "physics",
        data: { setup: "pendulum_simple" }
    },

    "double_pendulum": {
        id: "double_pendulum",
        name: "Double Pendulum (Chaos)",
        formula: "θ₁, θ₂ Equations",
        category: "physics",
        description: "A double pendulum consists of one pendulum attached to another. Unlike the simple pendulum, the double pendulum is a classic example of a simple physical system that exhibits rich chaotic behavior. The system's movement is governed by a set of coupled, non-linear ordinary differential equations. It is highly sensitive to initial conditions; even an infinitesimal difference in initial angle leads to completely divergent paths over time.",
        properties: {
            "Motion Type": "Chaotic / Non-linear Dynamics",
            "Degrees of Freedom": "2",
            "Sensitivity": "Butterfly Effect (High sensitive)",
            "Energy State": "Hamiltonian System",
            "Lagrangian System": "L = Kinetic - Potential"
        },
        controls: [
            { id: "length-ratio", label: "Rod 2 / Rod 1 Length", type: "slider", min: 0.5, max: 1.5, step: 0.05, value: 1.0, unit: "" },
            { id: "mass-ratio", label: "Bob 2 / Bob 1 Mass", type: "slider", min: 0.5, max: 3.0, step: 0.1, value: 1.0, unit: "" },
            { id: "trail-len", label: "Chaos Path Trail Length", type: "slider", min: 50, max: 600, step: 50, value: 300, unit: " frames" }
        ],
        type: "physics",
        data: { setup: "pendulum_double" }
    },

    "light_prism": {
        id: "light_prism",
        name: "Light Prism Dispersion",
        formula: "n(λ) = A + B/λ²",
        category: "physics",
        description: "Prism dispersion occurs when a narrow beam of white light enters a triangular glass prism. Because glass has a dispersive refractive index, different wavelengths of light travel at different speeds inside the prism. According to Snell's Law, shorter wavelengths (violet/blue) refract (bend) more than longer wavelengths (orange/red), splitting the white light into a rainbow spectrum ($ROYGBIV$) upon exit.",
        properties: {
            "Optical Phenomenon": "Dispersion / Refraction",
            "Governing Law": "Snell's Law: n₁·sin(θ₁) = n₂·sin(θ₂)",
            "Refractive Index Formula": "Cauchy's Equation",
            "Wavelength Spread": "Red (700nm) to Violet (400nm)",
            "Deviation Angle": "δ = θ₁ + θ₂ - A"
        },
        controls: [
            { id: "beam-angle", label: "Incident Beam Angle", type: "slider", min: -25, max: 25, step: 1, value: 0, unit: "°" },
            { id: "glass-index", label: "Glass Dispersion Power", type: "slider", min: 1.2, max: 1.8, step: 0.05, value: 1.52, unit: " n" }
        ],
        type: "physics",
        data: { setup: "prism" }
    },

    "magnetic_field": {
        id: "magnetic_field",
        name: "Magnetic Field Lines",
        formula: "B(r) Field Vectors",
        category: "physics",
        description: "A bar magnet generates a magnetic dipole field. The field lines emerge from the North Pole (N) and loop around to enter the South Pole (S). They represent the direction and strength of the magnetic force vectors. The density of lines indicates field intensity (strongest near the poles). Placing magnetic compasses or iron filings in the field aligns them along these invisible lines.",
        properties: {
            "Field Type": "Magnetic Dipole Field",
            "Poles": "North (Red) & South (Blue)",
            "Governing Equation": "B = (μ₀/4π) · (3(m·r)r/r⁵ - m/r³)",
            "Field Line Loops": "Closed loops (No magnetic monopoles)",
            "Force Vector Direction": "Out of North, into South"
        },
        controls: [
            { id: "magnet-strength", label: "Magnet Dipole Strength", type: "slider", min: 1, max: 5, step: 0.2, value: 3.0, unit: "" },
            { id: "particle-count", label: "Magnetic Vector Particles", type: "slider", min: 100, max: 1000, step: 50, value: 400, unit: "" }
        ],
        type: "physics",
        data: { setup: "magnetic" }
    },

    "meter_scale": {
        id: "meter_scale",
        name: "Metre Scale / Ruler",
        formula: "L = x₂ − x₁",
        category: "physics",
        description: "A metre scale is a basic linear measuring instrument used in school and college physics for length, displacement, and ray tracing experiments.",
        properties: {
            "Use": "Length measurement",
            "Typical Accuracy": "1 mm",
            "Application": "Kinematics, optics, mechanics"
        },
        controls: [
            { id: "scale-length", label: "Scale Length", type: "slider", min: 0.5, max: 2.0, step: 0.05, value: 1.0, unit: " m" }
        ],
        type: "fallback"
    },

    "spring_balance": {
        id: "spring_balance",
        name: "Spring Balance",
        formula: "F = kx",
        category: "physics",
        description: "A spring balance measures force by the extension of a spring and is standard in mechanics labs for Hooke's law experiments.",
        properties: {
            "Use": "Force / weight measurement",
            "Law": "Hooke's Law",
            "Typical Range": "0–10 N"
        },
        controls: [
            { id: "spring-force", label: "Applied Force", type: "slider", min: 0, max: 10, step: 0.1, value: 5.0, unit: " N" }
        ],
        type: "fallback"
    },

    "stopwatch": {
        id: "stopwatch",
        name: "Stopwatch",
        formula: "t = Δt",
        category: "physics",
        description: "A stopwatch measures time intervals in motion, oscillation, and projectile experiments.",
        properties: {
            "Use": "Time measurement",
            "Resolution": "0.01 s",
            "Application": "Pendulum, free fall, reaction time"
        },
        controls: [
            { id: "time-interval", label: "Time Interval", type: "slider", min: 0, max: 20, step: 0.1, value: 5.0, unit: " s" }
        ],
        type: "fallback"
    },

    "ammeter": {
        id: "ammeter",
        name: "Ammeter",
        formula: "I = V/R",
        category: "physics",
        description: "An ammeter measures electric current in series in an electric circuit and is used in current, resistance, and Ohm's law experiments.",
        properties: {
            "Use": "Current measurement",
            "Connection": "Series",
            "Unit": "Ampere (A)"
        },
        controls: [
            { id: "current", label: "Current", type: "slider", min: 0, max: 5, step: 0.01, value: 1.5, unit: " A" }
        ],
        type: "fallback"
    },

    "voltmeter": {
        id: "voltmeter",
        name: "Voltmeter",
        formula: "V = IR",
        category: "physics",
        description: "A voltmeter measures potential difference in parallel across a component in electric circuit experiments.",
        properties: {
            "Use": "Voltage measurement",
            "Connection": "Parallel",
            "Unit": "Volt (V)"
        },
        controls: [
            { id: "voltage", label: "Voltage", type: "slider", min: 0, max: 12, step: 0.1, value: 6.0, unit: " V" }
        ],
        type: "fallback"
    },

    "galvanometer": {
        id: "galvanometer",
        name: "Galvanometer",
        formula: "I ∝ deflection",
        category: "physics",
        description: "A galvanometer detects and measures small electric currents, forming the basis of ammeters and voltmeters.",
        properties: {
            "Use": "Detect small current",
            "Principle": "Magnetic deflection",
            "Application": "Bridge circuits, null detection"
        },
        controls: [
            { id: "deflection", label: "Deflection", type: "slider", min: 0, max: 90, step: 1, value: 30, unit: "°" }
        ],
        type: "fallback"
    },

    "multimeter": {
        id: "multimeter",
        name: "Multimeter",
        formula: "V, I, R measurement",
        category: "physics",
        description: "A multimeter combines voltmeter, ammeter, and ohmmeter functions for electronics and electrical circuits.",
        properties: {
            "Use": "Multi-function measurement",
            "Modes": "Voltage, Current, Resistance",
            "Application": "Basic electronics labs"
        },
        controls: [
            { id: "mode-level", label: "Mode Level", type: "slider", min: 1, max: 3, step: 1, value: 2, unit: "" }
        ],
        type: "fallback"
    },

    "microscope": {
        id: "microscope",
        name: "Compound Microscope",
        formula: "M = m₁ × m₂",
        category: "physics",
        description: "A compound microscope is used for magnifying tiny specimens in biology and optics experiments.",
        properties: {
            "Use": "Microscopic observation",
            "Magnification": "Objective × eyepiece",
            "Application": "Optics, biology labs"
        },
        controls: [
            { id: "zoom", label: "Magnification Zoom", type: "slider", min: 1, max: 6, step: 0.1, value: 3.0, unit: "x" }
        ],
        type: "fallback"
    },

    "telescope": {
        id: "telescope",
        name: "Telescope",
        formula: "M = f₀/fₑ",
        category: "physics",
        description: "A telescope is used for observing distant objects in astronomy and optics labs.",
        properties: {
            "Use": "Distant object observation",
            "Principle": "Refracting / reflecting optics",
            "Application": "Astronomy lab"
        },
        controls: [
            { id: "focus", label: "Focus Setting", type: "slider", min: 0.5, max: 2.5, step: 0.05, value: 1.2, unit: " m" }
        ],
        type: "fallback"
    },

    "spectrometer": {
        id: "spectrometer",
        name: "Spectrometer",
        formula: "λ = d sin θ / n",
        category: "physics",
        description: "A spectrometer measures wavelengths and is used in modern optics and spectroscopy experiments.",
        properties: {
            "Use": "Wavelength analysis",
            "Principle": "Diffraction / dispersion",
            "Application": "Atomic spectra, optics"
        },
        controls: [
            { id: "angle", label: "Diffraction Angle", type: "slider", min: 5, max: 60, step: 1, value: 20, unit: "°" }
        ],
        type: "fallback"
    },

    "spherometer": {
        id: "spherometer",
        name: "Spherometer",
        formula: "R = l² / 6h + h/2",
        category: "physics",
        description: "A spherometer measures the radius of curvature of spherical surfaces in optics experiments.",
        properties: {
            "Use": "Curvature measurement",
            "Principle": "Three-point contact",
            "Application": "Lens and mirror curvature"
        },
        controls: [
            { id: "height", label: "Sagitta Height", type: "slider", min: 0.01, max: 0.4, step: 0.001, value: 0.08, unit: " cm" }
        ],
        type: "fallback"
    },

    "travelling_microscope": {
        id: "travelling_microscope",
        name: "Travelling Microscope",
        formula: "Reading = MSR + VSR",
        category: "physics",
        description: "A travelling microscope is used for precise linear displacement and small object measurements in optics labs.",
        properties: {
            "Use": "Precise displacement measurement",
            "Accuracy": "High precision",
            "Application": "Optics, small scale experiments"
        },
        controls: [
            { id: "travel", label: "Travel Distance", type: "slider", min: 0, max: 5, step: 0.01, value: 1.2, unit: " cm" }
        ],
        type: "fallback"
    },

    "resonance_tube": {
        id: "resonance_tube",
        name: "Resonance Tube",
        formula: "f = v / 4L",
        category: "physics",
        description: "A resonance tube demonstrates sound waves and resonance in air columns for wave experiments.",
        properties: {
            "Use": "Sound resonance",
            "Principle": "Standing waves",
            "Application": "Wave and sound lab"
        },
        controls: [
            { id: "tube-length", label: "Tube Length", type: "slider", min: 0.1, max: 1.0, step: 0.01, value: 0.4, unit: " m" }
        ],
        type: "fallback"
    },

    // === MATHEMATICS / GEOMETRY ===
    "tetrahedron": {
        id: "tetrahedron",
        name: "Regular Tetrahedron",
        formula: "Platonic Solid",
        category: "mathematics",
        description: "A regular tetrahedron is a polyhedron composed of four equilateral triangular faces, three of which meet at each vertex. It is the simplest of the five Platonic solids and has tetrahedral symmetry. It represents a 3D simplex, which is the most basic spatial geometry.",
        properties: {
            "Faces": "4 (Equilateral triangles)",
            "Vertices": "4",
            "Edges": "6",
            "Euler Characteristic": "V - E + F = 2",
            "Volume (side a)": "V = a³ / (6√2)",
            "Symmetry Group": "T_d (Order 24)"
        },
        controls: [
            { id: "rotation-x", label: "Rotation Pitch", type: "slider", min: 0, max: 2, step: 0.1, value: 0.5, unit: "x" },
            { id: "wire-thickness", label: "Wireframe Thickness", type: "slider", min: 1, max: 8, step: 1, value: 2, unit: "px" }
        ],
        type: "math",
        data: { shape: "tetrahedron" }
    },

    "cube": {
        id: "cube",
        name: "Cube (Regular Hexahedron)",
        formula: "Platonic Solid",
        category: "mathematics",
        description: "A cube is a three-dimensional solid object bounded by six square faces, facets or sides, with three meeting at each vertex. It is one of the five Platonic solids, representing a regular hexahedron, and shares octahedral symmetry. It has the unique property of packing space perfectly.",
        properties: {
            "Faces": "6 (Squares)",
            "Vertices": "8",
            "Edges": "12",
            "Euler Characteristic": "V - E + F = 2",
            "Volume (side a)": "V = a³",
            "Symmetry Group": "O_h (Order 48)"
        },
        controls: [
            { id: "rotation-x", label: "Rotation Pitch", type: "slider", min: 0, max: 2, step: 0.1, value: 0.5, unit: "x" },
            { id: "wire-thickness", label: "Wireframe Thickness", type: "slider", min: 1, max: 8, step: 1, value: 2, unit: "px" }
        ],
        type: "math",
        data: { shape: "cube" }
    },

    "octahedron": {
        id: "octahedron",
        name: "Regular Octahedron",
        formula: "Platonic Solid",
        category: "mathematics",
        description: "A regular octahedron is a Platonic solid composed of eight equilateral triangles, four of which meet at each vertex. It is the dual polyhedron of the cube. It can be viewed as two square pyramids joined at their bases.",
        properties: {
            "Faces": "8 (Triangles)",
            "Vertices": "6",
            "Edges": "12",
            "Euler Characteristic": "V - E + F = 2",
            "Volume (side a)": "V = a³√2 / 3",
            "Symmetry Group": "O_h (Order 48)"
        },
        controls: [
            { id: "rotation-x", label: "Rotation Pitch", type: "slider", min: 0, max: 2, step: 0.1, value: 0.5, unit: "x" },
            { id: "wire-thickness", label: "Wireframe Thickness", type: "slider", min: 1, max: 8, step: 1, value: 2, unit: "px" }
        ],
        type: "math",
        data: { shape: "octahedron" }
    },

    "dodecahedron": {
        id: "dodecahedron",
        name: "Regular Dodecahedron",
        formula: "Platonic Solid",
        category: "mathematics",
        description: "A regular dodecahedron is a Platonic solid composed of twelve regular pentagonal faces, with three meeting at each vertex. It has icosahedral symmetry. Dodecahedrons have been found in various historical contexts, including Roman dodecahedra of mysterious function.",
        properties: {
            "Faces": "12 (Regular pentagons)",
            "Vertices": "20",
            "Edges": "30",
            "Euler Characteristic": "V - E + F = 2",
            "Volume (side a)": "V = (15 + 7√5)a³ / 4",
            "Symmetry Group": "I_h (Order 120)"
        },
        controls: [
            { id: "rotation-x", label: "Rotation Pitch", type: "slider", min: 0, max: 2, step: 0.1, value: 0.5, unit: "x" },
            { id: "wire-thickness", label: "Wireframe Thickness", type: "slider", min: 1, max: 8, step: 1, value: 2, unit: "px" }
        ],
        type: "math",
        data: { shape: "dodecahedron" }
    },

    "icosahedron": {
        id: "icosahedron",
        name: "Regular Icosahedron",
        formula: "Platonic Solid",
        category: "mathematics",
        description: "A regular icosahedron is a Platonic solid with twenty equilateral triangular faces, five meeting at each vertex. It is the dual of the dodecahedron and has icosahedral symmetry. Many viruses, such as adenovirus, possess icosahedral capsids for maximum volume enclosure with minimal protein units.",
        properties: {
            "Faces": "20 (Triangles)",
            "Vertices": "12",
            "Edges": "30",
            "Euler Characteristic": "V - E + F = 2",
            "Volume (side a)": "V = 5(3 + √5)a³ / 12",
            "Symmetry Group": "I_h (Order 120)"
        },
        controls: [
            { id: "rotation-x", label: "Rotation Pitch", type: "slider", min: 0, max: 2, step: 0.1, value: 0.5, unit: "x" },
            { id: "wire-thickness", label: "Wireframe Thickness", type: "slider", min: 1, max: 8, step: 1, value: 2, unit: "px" }
        ],
        type: "math",
        data: { shape: "icosahedron" }
    },

    "mobius_strip": {
        id: "mobius_strip",
        name: "Möbius Strip",
        formula: "Single-Sided Surface",
        category: "mathematics",
        description: "A Möbius strip (or Möbius band) is a surface with only one side and only one boundary curve. It is a basic non-orientable topological space. It can be formed by taking a paper strip, giving it a half-twist, and gluing its ends together. Traversing the strip completes a full loop but finishes on the 'opposite' side from where you started.",
        properties: {
            "Sides": "1",
            "Boundaries": "1",
            "Genus": "1",
            "Orientation": "Non-orientable",
            "Euler Characteristic": "χ = 0",
            "Discovered": "August Möbius & Johann Listing (1858)"
        },
        controls: [
            { id: "strip-width", label: "Strip Width", type: "slider", min: 0.5, max: 2, step: 0.1, value: 1.0, unit: "" },
            { id: "strip-twists", label: "Number of Twists", type: "slider", min: 1, max: 5, step: 2, value: 1, unit: " twists" }
        ],
        type: "math",
        data: { shape: "mobius" }
    },

    "tesseract": {
        id: "tesseract",
        name: "Tesseract (4D Hypercube)",
        formula: "4D Regular Polytope",
        category: "mathematics",
        description: "A tesseract is the four-dimensional analogue of the cube. Just as a cube is bounded by six square faces, a tesseract is bounded by eight cubic cells. In our 3D visualizer, we project the four-dimensional structure into 3D space. By rotating the hypercube in 4D (specifically, double rotations in the XW or YW planes), its 3D projection undergoes folding, morphing transitions.",
        properties: {
            "Cells (3D)": "8 (Cubes)",
            "Faces (2D)": "24 (Squares)",
            "Edges (1D)": "32",
            "Vertices (0D)": "16",
            "Euler (4D)": "V - E + F - C = 0",
            "Projection Model": "Perspective 4D-to-3D"
        },
        controls: [
            { id: "rot-speed-4d", label: "4D Rotation Speed", type: "slider", min: 0, max: 2, step: 0.1, value: 1.0, unit: "rad/s" },
            { id: "projection-fov", label: "4D Camera Dist (Fov)", type: "slider", min: 1.2, max: 3.5, step: 0.1, value: 2.0, unit: "" }
        ],
        type: "math",
        data: { shape: "tesseract" }
    }
};

// Expose database globally to let other files load it
window.EduDatabase = EduDatabase;
