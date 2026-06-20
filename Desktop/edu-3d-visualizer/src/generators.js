// ==========================================================================
// Edu3D Procedural Generators (Enhanced with Canvas Textures & Lab Instruments)
// ==========================================================================

const EduGenerators = {
    createLabelTexture: function(text, color = '#ffffff', background = 'rgba(15, 23, 42, 0.75)') {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createRadialGradient(64, 64, 8, 64, 64, 60);
        gradient.addColorStop(0, 'rgba(255,255,255,0.18)');
        gradient.addColorStop(1, 'rgba(8, 47, 73, 0.0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(64, 64, 56, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = background;
        ctx.beginPath();
        ctx.arc(64, 64, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = color;
        ctx.font = 'bold 34px Arial, Helvetica, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 64, 64);

        return new THREE.CanvasTexture(canvas);
    },

    // Utility to create glowing materials
    createGlowMaterial: function(color, intensity = 1.0) {
        return new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
    },

    // === PROCEDURAL CANVAS TEXTURE GENERATOR ENGINE ===
    
    createEarthTexture: function() {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        
        // 1. Blue Oceans Gradient
        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, "#0f172a"); // Deep space navy
        grad.addColorStop(0.5, "#1d4ed8"); // Ocean blue
        grad.addColorStop(1, "#1e3a8a");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);
        
        // 2. Continents Map Drawing (Green/Brown land masses)
        ctx.fillStyle = "#15803d"; // Forest green
        
        // Helper to draw continent blob
        const drawBlob = (pts, color = "#16a34a") => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(pts[0][0], pts[0][1]);
            for (let i = 1; i < pts.length; i++) {
                ctx.lineTo(pts[i][0], pts[i][1]);
            }
            ctx.closePath();
            ctx.fill();
            
            // Add desert/mountain brown details inside
            ctx.fillStyle = "#a16207"; // Brownish
            ctx.beginPath();
            ctx.arc(pts[0][0], pts[0][1], 15, 0, Math.PI * 2);
            ctx.fill();
        };
        
        // North America
        drawBlob([
            [100, 100], [250, 80], [350, 120], [300, 180], [270, 240], 
            [220, 240], [240, 200], [180, 210], [120, 180], [90, 130]
        ]);
        // South America
        drawBlob([
            [250, 250], [290, 260], [340, 310], [320, 390], [280, 450], 
            [270, 450], [250, 380], [230, 300]
        ]);
        // Eurasia
        drawBlob([
            [450, 80], [600, 60], [800, 70], [950, 90], [900, 190], 
            [850, 250], [750, 230], [620, 240], [550, 210], [420, 150]
        ]);
        // Africa
        drawBlob([
            [480, 220], [580, 210], [630, 260], [620, 320], [580, 380], 
            [540, 420], [520, 350], [460, 280]
        ]);
        // Australia
        drawBlob([
            [800, 350], [880, 340], [900, 390], [860, 430], [790, 410]
        ], "#84cc16");
        // Antarctica (White strip along bottom)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 480, 1024, 32);
        
        return new THREE.CanvasTexture(canvas);
    },
    
    createJupiterTexture: function() {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        
        // Jupiter base orange-brown stripes
        const bands = [
            { y: 0, h: 30, color: "#8a583c" },  // polar
            { y: 30, h: 20, color: "#c99e82" },
            { y: 50, h: 35, color: "#b07454" },
            { y: 85, h: 15, color: "#e3c1a8" },
            { y: 100, h: 40, color: "#9c603c" }, // equatorial
            { y: 140, h: 30, color: "#e0b396" },
            { y: 170, h: 25, color: "#b5734c" },
            { y: 195, h: 35, color: "#cf9e80" },
            { y: 230, h: 26, color: "#784b31" }  // polar
        ];
        
        bands.forEach(b => {
            ctx.fillStyle = b.color;
            ctx.fillRect(0, b.y, 512, b.h);
            
            // Add storm swirls/distortion
            ctx.fillStyle = "rgba(255,255,255,0.06)";
            ctx.beginPath();
            for (let x = 0; x <= 512; x += 30) {
                const sineY = b.y + b.h/2 + Math.sin(x/20) * 6;
                ctx.arc(x, sineY, 8, 0, Math.PI * 2);
            }
            ctx.fill();
        });
        
        // Draw the Great Red Spot (at y = 175, x = 360)
        ctx.fillStyle = "#b91c1c"; // Crimson red spot
        ctx.shadowColor = "#7f1d1d";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.ellipse(360, 175, 28, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        
        // Add white storm swirl border to Great Red Spot
        ctx.strokeStyle = "#fed7aa";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(360, 175, 33, 19, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        return new THREE.CanvasTexture(canvas);
    },
    
    createMarsTexture: function() {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        
        // Rust Red Base
        ctx.fillStyle = "#c2410c"; // Iron oxide orange-red
        ctx.fillRect(0, 0, 512, 256);
        
        // Dark volcanic plains (basalt patches)
        ctx.fillStyle = "#7c2d12"; // Dark brown
        const drawPatch = (x, y, rx, ry) => {
            ctx.beginPath();
            ctx.ellipse(x, y, rx, ry, Math.PI / 6, 0, Math.PI * 2);
            ctx.fill();
        };
        drawPatch(120, 140, 60, 30);
        drawPatch(340, 120, 90, 45);
        drawPatch(220, 160, 45, 20);
        
        // Soft polar ice caps (white circles at north and south poles)
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(256, 4, 25, 0, Math.PI, false); // North polar cap
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(256, 252, 18, 0, Math.PI, true); // South polar cap
        ctx.fill();
        
        return new THREE.CanvasTexture(canvas);
    },
    
    createMoonTexture: function() {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        
        // Grey surface base
        ctx.fillStyle = "#9ca3af";
        ctx.fillRect(0, 0, 512, 256);
        
        // Dark Maria (Basalt Plains)
        ctx.fillStyle = "#4b5563"; // Dark grey
        const drawMaria = (x, y, r) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        };
        drawMaria(140, 100, 35);
        drawMaria(180, 120, 45);
        drawMaria(260, 80, 50);
        drawMaria(340, 110, 40);
        drawMaria(310, 150, 30);
        
        // White Highland Craters with rays
        ctx.strokeStyle = "#e5e7eb";
        ctx.fillStyle = "#f3f4f6";
        ctx.lineWidth = 1;
        const drawCrater = (x, y, r) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            
            // Draw radial rays lines
            ctx.strokeStyle = "rgba(243, 244, 246, 0.25)";
            for (let i = 0; i < 8; i++) {
                const angle = (i * Math.PI) / 4;
                ctx.beginPath();
                ctx.moveTo(x + Math.cos(angle) * r, y + Math.sin(angle) * r);
                ctx.lineTo(x + Math.cos(angle) * (r * 4), y + Math.sin(angle) * (r * 4));
                ctx.stroke();
            }
        };
        drawCrater(220, 160, 6); // Tycho-like crater
        drawCrater(120, 70, 4);
        drawCrater(390, 180, 5);
        
        return new THREE.CanvasTexture(canvas);
    },
    
    createSaturnTexture: function() {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        
        // Saturn soft cream-yellow banded atmosphere
        const bands = [
            { y: 0, h: 40, color: "#d4b996" },
            { y: 40, h: 30, color: "#ebd2b0" },
            { y: 70, h: 50, color: "#dfc19b" },
            { y: 120, h: 40, color: "#e8cca6" },
            { y: 160, h: 30, color: "#dfc19b" },
            { y: 190, h: 66, color: "#c8ab84" }
        ];
        
        bands.forEach(b => {
            ctx.fillStyle = b.color;
            ctx.fillRect(0, b.y, 512, b.h);
        });
        
        return new THREE.CanvasTexture(canvas);
    },

    createSunTexture: function() {
        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 128;
        const ctx = canvas.getContext("2d");
        
        // Solar plasma gradient (yellow center to orange edges)
        const grad = ctx.createRadialGradient(128, 64, 5, 128, 64, 128);
        grad.addColorStop(0, "#fef08a"); // Bright yellow
        grad.addColorStop(0.4, "#f97316"); // Solar orange
        grad.addColorStop(1, "#dc2626"); // Red corona border
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 128);
        
        // Draw solar convection cells (random noise dots)
        ctx.fillStyle = "rgba(254, 240, 138, 0.15)";
        for (let i = 0; i < 200; i++) {
            ctx.fillRect(Math.random() * 256, Math.random() * 128, 3, 3);
        }
        
        return new THREE.CanvasTexture(canvas);
    },

    // 1. ATOMS GENERATOR
    createAtom: function(dbItem, settings) {
        const group = new THREE.Group();
        const data = dbItem.data;
        const shellScale = settings.shellScale || 1.5;

        // Visual parameters
        const protonColor = 0xef4444; // Red
        const neutronColor = 0x3b82f6; // Blue
        const electronColor = 0x06b6d4; // Cyan
        const orbitColor = 0xffffff;
        const sphereRadius = 0.22;
        
        // Sphere Geometries
        const protonGeo = new THREE.SphereGeometry(sphereRadius, 16, 16);
        const neutronGeo = new THREE.SphereGeometry(sphereRadius, 16, 16);
        
        // Materials
        const protonMat = new THREE.MeshStandardMaterial({ color: protonColor, roughness: 0.3, metalness: 0.1 });
        const neutronMat = new THREE.MeshStandardMaterial({ color: neutronColor, roughness: 0.4, metalness: 0.1 });
        
        // A. Generate Nucleus
        const nucleusGroup = new THREE.Group();
        const totalNucleons = data.protons + data.neutrons;
        const symbolLabel = new THREE.Sprite(new THREE.SpriteMaterial({
            map: this.createLabelTexture(dbItem.symbol || 'X', '#fff', 'rgba(15, 23, 42, 0.95)'),
            transparent: true,
            depthTest: false,
            opacity: 0.98
        }));
        symbolLabel.scale.set(1.2, 1.2, 1);
        nucleusGroup.add(symbolLabel);
        const nucleons = [];
        for (let i = 0; i < data.protons; i++) nucleons.push({ type: 'p', mesh: new THREE.Mesh(protonGeo, protonMat) });
        for (let i = 0; i < data.neutrons; i++) nucleons.push({ type: 'n', mesh: new THREE.Mesh(neutronGeo, neutronMat) });
        nucleons.sort(() => Math.random() - 0.5);
        
        nucleons.forEach((nucleon, idx) => {
            let pos;
            if (idx === 0) {
                pos = new THREE.Vector3(0, 0, 0);
            } else {
                const radiusFactor = 0.16 + 0.04 * Math.floor(idx / 4);
                const phi = Math.acos(-1 + (2 * idx) / totalNucleons);
                const theta = Math.sqrt(totalNucleons * Math.PI) * phi;
                
                pos = new THREE.Vector3(
                    Math.cos(theta) * Math.sin(phi) * radiusFactor,
                    Math.sin(theta) * Math.sin(phi) * radiusFactor,
                    Math.cos(phi) * radiusFactor
                );
            }
            nucleon.mesh.position.copy(pos);
            nucleon.mesh.userData = {
                type: 'nucleon',
                name: nucleon.type === 'p' ? 'Proton (p⁺)' : 'Neutron (n⁰)',
                desc: nucleon.type === 'p' ? 'Positively charged nucleon.' : 'Neutral nucleon, acts as nuclear glue.'
            };
            nucleusGroup.add(nucleon.mesh);
        });
        group.add(nucleusGroup);
        
        // B. Generate Electron Shells & Orbiting Electrons
        const orbitsGroup = new THREE.Group();
        const electronsList = [];
        
        data.electrons.forEach((count, shellIdx) => {
            const shellNum = shellIdx + 1;
            const radius = shellNum * shellScale;
            
            for (let j = 0; j < count; j++) {
                const tiltX = (Math.PI / 4) * Math.sin(j * (Math.PI / count) + shellIdx);
                const tiltY = (Math.PI / 3) * Math.cos(j * (Math.PI / count) + shellIdx * 2);
                
                const ringGeo = new THREE.RingGeometry(radius - 0.01, radius + 0.01, 64);
                const ringMat = new THREE.MeshBasicMaterial({
                    color: orbitColor,
                    transparent: true,
                    opacity: 0.12,
                    side: THREE.DoubleSide
                });
                const orbitRing = new THREE.Mesh(ringGeo, ringMat);
                orbitRing.rotation.set(tiltX, tiltY, 0);
                orbitsGroup.add(orbitRing);
                
                const electronGroup = new THREE.Group();
                const electronDot = new THREE.Mesh(
                    new THREE.SphereGeometry(0.08, 16, 16),
                    new THREE.MeshBasicMaterial({ color: 0x67e8f9, transparent: true, opacity: 0.95 })
                );
                electronDot.scale.set(1.0, 1.0, 1.0);

                const electronLabel = new THREE.Sprite(new THREE.SpriteMaterial({
                    map: this.createLabelTexture('e−', '#67e8f9', 'rgba(8, 47, 73, 0.92)'),
                    transparent: true,
                    depthTest: false,
                    depthWrite: false,
                    opacity: 1.0,
                    alphaTest: 0.1
                }));
                electronLabel.scale.set(0.55, 0.55, 1);
                electronLabel.position.set(0, 0.18, 0);

                electronGroup.add(electronDot);
                electronGroup.add(electronLabel);

                const ePlaneX = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(tiltX, tiltY, 0));
                const ePlaneY = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(tiltX, tiltY, 0));
                
                electronGroup.userData = {
                    type: 'electron',
                    name: `Electron (e⁻) - Shell ${shellNum}`,
                    desc: 'Negatively charged subatomic particle orbiting the nucleus.',
                    radius: radius,
                    uVector: ePlaneX,
                    vVector: ePlaneY,
                    speed: (3 - shellNum * 0.4) * 0.8,
                    angleOffset: (j * (Math.PI * 2)) / count
                };
                
                orbitsGroup.add(electronGroup);
                electronsList.push(electronGroup);
            }
        });
        
        group.add(orbitsGroup);
        
        group.userData = {
            electrons: electronsList,
            nucleus: nucleusGroup,
            orbits: orbitsGroup,
            animate: function(time, speedFactor) {
                nucleusGroup.rotation.y = time * 0.1 * speedFactor;
                nucleusGroup.rotation.z = time * 0.05 * speedFactor;
                
                electronsList.forEach(e => {
                    const data = e.userData;
                    const speed = data.speed * speedFactor;
                    const angle = time * speed + data.angleOffset;
                    
                    const pos = new THREE.Vector3()
                        .copy(data.uVector).multiplyScalar(Math.cos(angle) * data.radius)
                        .addScaledVector(data.vVector, Math.sin(angle) * data.radius);

                    e.position.copy(pos);
                    e.rotation.y = angle * 0.6;
                    e.rotation.x = Math.sin(angle * 0.5) * 0.08;
                    e.userData.orbitAngle = angle;
                });
            },
            explode: function(progress) {
                nucleusGroup.children.forEach((nucleon, idx) => {
                    if (!nucleon.userData.origPos) {
                        nucleon.userData.origPos = nucleon.position.clone();
                    }
                    const dir = nucleon.userData.origPos.clone().normalize();
                    if (nucleon.userData.origPos.lengthSq() < 0.01) {
                        dir.set(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
                    }
                    nucleon.position.copy(nucleon.userData.origPos).addScaledVector(dir, progress * 2.0);
                });
                
                orbitsGroup.scale.setScalar(1.0 + progress * 1.5);
                orbitsGroup.children.forEach(child => {
                    if (child.material) {
                        child.material.opacity = (child.userData.type === 'electron' ? 1.0 : 0.12) * (1 - progress * 0.5);
                    }
                });
            }
        };
        
        return group;
    },

    // 2. MOLECULES GENERATOR
    createMolecule: function(dbItem, settings) {
        const group = new THREE.Group();
        const data = dbItem.data;
        const bondLengthScale = settings.bondLength || 1.6;

        const sphereGeo = new THREE.SphereGeometry(0.35, 32, 32);
        const atomMeshes = [];
        
        data.atoms.forEach((atomData, idx) => {
            const size = atomData.size || 0.6;
            const geo = sphereGeo.clone().scale(size, size, size);
            
            const mat = new THREE.MeshStandardMaterial({
                color: atomData.color,
                roughness: 0.15,
                metalness: 0.05,
                clearcoat: 0.5,
                clearcoatRoughness: 0.1
            });
            
            const atomMesh = new THREE.Mesh(geo, mat);
            atomMesh.position.set(
                atomData.x * bondLengthScale,
                atomData.y * bondLengthScale,
                atomData.z * bondLengthScale
            );

            const symbolLabel = new THREE.Sprite(new THREE.SpriteMaterial({
                map: this.createLabelTexture(atomData.type || 'X', '#ffffff', 'rgba(15, 23, 42, 0.82)'),
                transparent: true,
                depthTest: false,
                depthWrite: false,
                opacity: 0.98
            }));
            symbolLabel.scale.set(0.45, 0.45, 1);
            symbolLabel.position.set(0, 0, 0.02);
            atomMesh.add(symbolLabel);
            
            atomMesh.userData = {
                type: 'atom',
                name: `${atomData.type} Atom`,
                desc: `Element symbol: ${atomData.type}. Positioned in 3D molecular bonds.`
            };
            
            group.add(atomMesh);
            atomMeshes.push(atomMesh);
        });

        const bondGroup = new THREE.Group();
        const bondColor = 0xd1d5db;
        const bondMat = new THREE.MeshStandardMaterial({ color: bondColor, roughness: 0.4, metalness: 0.2 });
        
        data.bonds.forEach(bond => {
            const startAtom = atomMeshes[bond.from];
            const endAtom = atomMeshes[bond.to];
            
            if (bond.double) {
                this.createCylinderBond(startAtom.position, endAtom.position, bondGroup, bondMat, 0.07, 0.12);
                this.createCylinderBond(startAtom.position, endAtom.position, bondGroup, bondMat, 0.07, -0.12);
            } else {
                this.createCylinderBond(startAtom.position, endAtom.position, bondGroup, bondMat, 0.09, 0);
            }
        });
        
        group.add(bondGroup);

        group.userData = {
            atoms: atomMeshes,
            bonds: bondGroup,
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.15 * speedFactor;
                group.rotation.x = Math.sin(time * 0.25) * 0.08 * speedFactor;
                
                atomMeshes.forEach((atom, idx) => {
                    const scale = 1.0 + Math.sin(time * 5 + idx) * 0.02 * speedFactor;
                    atom.scale.setScalar(scale);
                });
            },
            explode: function(progress) {
                atomMeshes.forEach((atom, idx) => {
                    if (!atom.userData.origPos) {
                        atom.userData.origPos = atom.position.clone();
                    }
                    const dir = atom.userData.origPos.clone().normalize();
                    atom.position.copy(atom.userData.origPos).addScaledVector(dir, progress * 2.5);
                });
                
                bondGroup.children.forEach(bond => {
                    bond.scale.set(1 - progress, 1 - progress, 1 - progress);
                });
            }
        };

        return group;
    },

    createCylinderBond: function(vStart, vEnd, group, material, radius = 0.08, offsetAmount = 0) {
        const distance = vStart.distanceTo(vEnd);
        const position = vEnd.clone().add(vStart).multiplyScalar(0.5);
        
        const cylinderGeo = new THREE.CylinderGeometry(radius, radius, distance, 12);
        const bondMesh = new THREE.Mesh(cylinderGeo, material);
        bondMesh.position.copy(position);
        
        const direction = new THREE.Vector3().subVectors(vEnd, vStart).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        bondMesh.quaternion.setFromUnitVectors(up, direction);
        
        if (offsetAmount !== 0) {
            const perp = new THREE.Vector3(0, 0, 1).applyQuaternion(bondMesh.quaternion).normalize();
            bondMesh.position.addScaledVector(perp, offsetAmount);
        }
        
        group.add(bondMesh);
    },

    // 3. CRYSTALLINE LATTICES GENERATOR
    createLattice: function(dbItem, settings) {
        const group = new THREE.Group();
        const mode = dbItem.data.mode;
        const gridCells = settings.latticeSize || 1;
        const atomRadius = settings.atomRadius || 0.22;
        
        const latticeLines = new THREE.Group();
        const atomsGroup = new THREE.Group();
        
        const atomColor = mode === 'graphene' || mode === 'diamond' ? 0x4b5563 : 0x06b6d4;
        const atomMat = new THREE.MeshStandardMaterial({
            color: atomColor,
            roughness: 0.2,
            metalness: 0.6,
            clearcoat: 0.3
        });
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.25
        });
        
        const atomGeo = new THREE.SphereGeometry(atomRadius, 32, 32);
        const latticePoints = [];
        
        if (mode === 'sc') {
            for (let x = 0; x <= gridCells; x++) {
                for (let y = 0; y <= gridCells; y++) {
                    for (let z = 0; z <= gridCells; z++) {
                        latticePoints.push(new THREE.Vector3(x - gridCells/2, y - gridCells/2, z - gridCells/2));
                    }
                }
            }
            const size = gridCells;
            for (let x = 0; x <= size; x++) {
                for (let y = 0; y <= size; y++) {
                    this.createGridLine(new THREE.Vector3(x - size/2, -size/2, -size/2), new THREE.Vector3(x - size/2, -size/2, size/2), latticeLines, wireMat);
                    this.createGridLine(new THREE.Vector3(x - size/2, size/2, -size/2), new THREE.Vector3(x - size/2, size/2, size/2), latticeLines, wireMat);
                    this.createGridLine(new THREE.Vector3(-size/2, x - size/2, -size/2), new THREE.Vector3(size/2, x - size/2, -size/2), latticeLines, wireMat);
                    this.createGridLine(new THREE.Vector3(-size/2, x - size/2, size/2), new THREE.Vector3(size/2, x - size/2, size/2), latticeLines, wireMat);
                    this.createGridLine(new THREE.Vector3(-size/2, -size/2, x - size/2), new THREE.Vector3(-size/2, size/2, x - size/2), latticeLines, wireMat);
                    this.createGridLine(new THREE.Vector3(size/2, -size/2, x - size/2), new THREE.Vector3(size/2, size/2, x - size/2), latticeLines, wireMat);
                }
            }
            
        } else if (mode === 'bcc') {
            for (let x = 0; x < gridCells; x++) {
                for (let y = 0; y < gridCells; y++) {
                    for (let z = 0; z < gridCells; z++) {
                        const ox = x - gridCells/2;
                        const oy = y - gridCells/2;
                        const oz = z - gridCells/2;
                        
                        const corners = [
                            [0,0,0], [1,0,0], [0,1,0], [1,1,0],
                            [0,0,1], [1,0,1], [0,1,1], [1,1,1]
                        ];
                        corners.forEach(c => {
                            const pt = new THREE.Vector3(ox + c[0], oy + c[1], oz + c[2]);
                            if (!this.containsPoint(latticePoints, pt)) {
                                latticePoints.push(pt);
                            }
                        });
                        
                        latticePoints.push(new THREE.Vector3(ox + 0.5, oy + 0.5, oz + 0.5));
                        
                        const center = new THREE.Vector3(ox + 0.5, oy + 0.5, oz + 0.5);
                        const centralMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.15 });
                        corners.forEach(c => {
                            this.createGridLine(center, new THREE.Vector3(ox + c[0], oy + c[1], oz + c[2]), latticeLines, centralMat, 0.015);
                        });
                    }
                }
            }
            this.createBoxOutline(gridCells, latticeLines, wireMat);
            
        } else if (mode === 'fcc') {
            for (let x = 0; x < gridCells; x++) {
                for (let y = 0; y < gridCells; y++) {
                    for (let z = 0; z < gridCells; z++) {
                        const ox = x - gridCells/2;
                        const oy = y - gridCells/2;
                        const oz = z - gridCells/2;
                        
                        const corners = [
                            [0,0,0], [1,0,0], [0,1,0], [1,1,0],
                            [0,0,1], [1,0,1], [0,1,1], [1,1,1]
                        ];
                        corners.forEach(c => {
                            const pt = new THREE.Vector3(ox + c[0], oy + c[1], oz + c[2]);
                            if (!this.containsPoint(latticePoints, pt)) latticePoints.push(pt);
                        });
                        
                        const faces = [
                            [0.5, 0.5, 0], [0.5, 0.5, 1],
                            [0.5, 0, 0.5], [0.5, 1, 0.5],
                            [0, 0.5, 0.5], [1, 0.5, 0.5]
                        ];
                        faces.forEach(f => {
                            const pt = new THREE.Vector3(ox + f[0], oy + f[1], oz + f[2]);
                            if (!this.containsPoint(latticePoints, pt)) latticePoints.push(pt);
                        });
                        
                        const faceCenterMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.1 });
                        faces.forEach(f => {
                            const facePt = new THREE.Vector3(ox + f[0], oy + f[1], oz + f[2]);
                            const cornersToLink = [];
                            if (f[2] === 0 || f[2] === 1) {
                                cornersToLink.push([0,0,f[2]], [1,0,f[2]], [0,1,f[2]], [1,1,f[2]]);
                            } else if (f[1] === 0 || f[1] === 1) {
                                cornersToLink.push([0,f[1],0], [1,f[1],0], [0,f[1],1], [1,f[1],1]);
                            } else {
                                cornersToLink.push([f[0],0,0], [f[0],1,0], [f[0],0,1], [f[0],1,1]);
                            }
                            
                            cornersToLink.forEach(c => {
                                this.createGridLine(facePt, new THREE.Vector3(ox + c[0], oy + c[1], oz + c[2]), latticeLines, faceCenterMat, 0.015);
                            });
                        });
                    }
                }
            }
            this.createBoxOutline(gridCells, latticeLines, wireMat);
            
        } else if (mode === 'hcp') {
            const a = 1.6;
            const cHeight = 2.5;
            
            const getHexCoords = (z) => {
                const pts = [new THREE.Vector3(0, 0, z)];
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3;
                    pts.push(new THREE.Vector3(Math.cos(angle) * a, Math.sin(angle) * a, z));
                }
                return pts;
            };
            
            const bottomHex = getHexCoords(-cHeight/2);
            bottomHex.forEach(pt => latticePoints.push(pt));
            
            const topHex = getHexCoords(cHeight/2);
            topHex.forEach(pt => latticePoints.push(pt));
            
            const midDist = a / Math.sqrt(3);
            const midPlanePts = [
                new THREE.Vector3(Math.cos(Math.PI/6) * midDist, Math.sin(Math.PI/6) * midDist, 0),
                new THREE.Vector3(Math.cos(5*Math.PI/6) * midDist, Math.sin(5*Math.PI/6) * midDist, 0),
                new THREE.Vector3(Math.cos(3*Math.PI/2) * midDist, Math.sin(3*Math.PI/2) * midDist, 0)
            ];
            midPlanePts.forEach(pt => latticePoints.push(pt));
            
            for (let i = 1; i <= 6; i++) {
                this.createGridLine(bottomHex[i], bottomHex[i === 6 ? 1 : i + 1], latticeLines, wireMat, 0.02);
                this.createGridLine(bottomHex[0], bottomHex[i], latticeLines, wireMat, 0.01);
                this.createGridLine(topHex[i], topHex[i === 6 ? 1 : i + 1], latticeLines, wireMat, 0.02);
                this.createGridLine(topHex[0], topHex[i], latticeLines, wireMat, 0.01);
                this.createGridLine(bottomHex[i], topHex[i], latticeLines, wireMat, 0.02);
            }
            this.createGridLine(bottomHex[0], topHex[0], latticeLines, wireMat, 0.01);
            
            const midMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.15 });
            midPlanePts.forEach(midPt => {
                this.createGridLine(midPt, bottomHex[0], latticeLines, midMat, 0.01);
                this.createGridLine(midPt, topHex[0], latticeLines, midMat, 0.01);
            });
            
        } else if (mode === 'diamond') {
            const scale = 3.0;
            const addPt = (pt) => {
                pt.multiplyScalar(scale);
                latticePoints.push(pt);
            };
            
            for (let x = 0; x <= 1; x++) {
                for (let y = 0; y <= 1; y++) {
                    for (let z = 0; z <= 1; z++) {
                        addPt(new THREE.Vector3(x - 0.5, y - 0.5, z - 0.5));
                    }
                }
            }
            
            const faces = [
                [0.5, 0.5, 0], [0.5, 0.5, 1],
                [0.5, 0, 0.5], [0.5, 1, 0.5],
                [0, 0.5, 0.5], [1, 0.5, 0.5]
            ];
            faces.forEach(f => {
                addPt(new THREE.Vector3(f[0] - 0.5, f[1] - 0.5, f[2] - 0.5));
            });
            
            const interior = [
                [0.25, 0.25, 0.25],
                [0.75, 0.75, 0.25],
                [0.25, 0.75, 0.75],
                [0.75, 0.25, 0.75]
            ];
            const interiorPts = [];
            interior.forEach(f => {
                const pt = new THREE.Vector3(f[0] - 0.5, f[1] - 0.5, f[2] - 0.5);
                pt.multiplyScalar(scale);
                latticePoints.push(pt);
                interiorPts.push(pt);
            });
            
            const dMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.5, metalness: 0.1 });
            const link = (p1, p2) => this.createCylinderBond(p1, p2, latticeLines, dMat, 0.05);
            
            const origin = new THREE.Vector3(-0.5, -0.5, -0.5).multiplyScalar(scale);
            const xyFace = new THREE.Vector3(0, 0, -0.5).multiplyScalar(scale);
            const xzFace = new THREE.Vector3(0, -0.5, 0).multiplyScalar(scale);
            const yzFace = new THREE.Vector3(-0.5, 0, 0).multiplyScalar(scale);
            
            link(interiorPts[0], origin);
            link(interiorPts[0], xyFace);
            link(interiorPts[0], xzFace);
            link(interiorPts[0], yzFace);
            
            const boxGeo = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(scale, scale, scale)));
            boxGeo.material.color.setHex(0xffffff);
            boxGeo.material.opacity = 0.15;
            boxGeo.material.transparent = true;
            latticeLines.add(boxGeo);
            
        } else if (mode === 'graphene') {
            const size = settings.sheetSize || 8;
            const bondLen = 0.8;
            const atomsArr = [];
            
            for (let i = -size/2; i <= size/2; i++) {
                for (let j = -size/2; j <= size/2; j++) {
                    const x = bondLen * Math.sqrt(3) * (i + j/2);
                    const z = bondLen * 1.5 * j;
                    
                    const ptA = new THREE.Vector3(x, 0, z);
                    const ptB = new THREE.Vector3(x, 0, z + bondLen);
                    
                    if (ptA.length() < 5 && !this.containsPoint(latticePoints, ptA)) {
                        latticePoints.push(ptA);
                        atomsArr.push(ptA);
                    }
                    if (ptB.length() < 5 && !this.containsPoint(latticePoints, ptB)) {
                        latticePoints.push(ptB);
                        atomsArr.push(ptB);
                    }
                }
            }
            
            const gMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.3, metalness: 0.2 });
            const bondMeshArray = [];
            for (let i = 0; i < latticePoints.length; i++) {
                for (let j = i + 1; j < latticePoints.length; j++) {
                    const dist = latticePoints[i].distanceTo(latticePoints[j]);
                    if (dist > 0.7 && dist < 0.95) {
                        const cylinderGeo = new THREE.CylinderGeometry(0.04, 0.04, dist, 8);
                        const bond = new THREE.Mesh(cylinderGeo, gMat);
                        bond.userData = {
                            fromIdx: i,
                            toIdx: j,
                            length: dist
                        };
                        latticeLines.add(bond);
                        bondMeshArray.push(bond);
                    }
                }
            }
            group.userData.bondMeshes = bondMeshArray;
        }

        latticePoints.forEach((pos, idx) => {
            const mesh = new THREE.Mesh(atomGeo, atomMat);
            mesh.position.copy(pos);
            mesh.userData = {
                type: 'lattice_atom',
                name: mode === 'graphene' || mode === 'diamond' ? 'Carbon Atom (C)' : 'Lattice Node Atom',
                desc: `Unit cell coordinate: [${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)}]`
            };
            atomsGroup.add(mesh);
        });
        
        group.add(atomsGroup);
        group.add(latticeLines);
        
        group.userData = {
            atoms: atomsGroup,
            lines: latticeLines,
            points: latticePoints,
            animate: function(time, speedFactor) {
                if (mode === 'graphene') {
                    const amp = settings.waveAmp !== undefined ? settings.waveAmp : 0.3;
                    const freq = settings.waveSpeed !== undefined ? settings.waveSpeed : 1.0;
                    
                    atomsGroup.children.forEach((atom, idx) => {
                        const origPos = latticePoints[idx];
                        const waveY = amp * Math.sin(origPos.x * 0.8 + origPos.z * 0.8 + time * 2.5 * freq);
                        atom.position.y = waveY;
                    });
                    
                    const bonds = group.userData.bondMeshes || [];
                    bonds.forEach(bond => {
                        const start = atomsGroup.children[bond.userData.fromIdx].position;
                        const end = atomsGroup.children[bond.userData.toIdx].position;
                        
                        const distance = start.distanceTo(end);
                        const pos = end.clone().add(start).multiplyScalar(0.5);
                        
                        bond.position.copy(pos);
                        bond.scale.set(1, distance / bond.userData.length, 1);
                        
                        const direction = new THREE.Vector3().subVectors(end, start).normalize();
                        const up = new THREE.Vector3(0, 1, 0);
                        bond.quaternion.setFromUnitVectors(up, direction);
                    });
                } else {
                    group.rotation.y = time * 0.08 * speedFactor;
                }
            },
            explode: function(progress) {
                atomsGroup.children.forEach((atom, idx) => {
                    const origPos = latticePoints[idx];
                    const dir = origPos.clone().normalize();
                    if (origPos.lengthSq() < 0.01) dir.set(0, 1, 0);
                    atom.position.copy(origPos).addScaledVector(dir, progress * 1.5);
                });
                
                latticeLines.scale.setScalar(1 - progress);
                latticeLines.children.forEach(c => {
                    if (c.material) c.material.opacity = 0.25 * (1 - progress);
                });
            }
        };
        
        return group;
    },

    createGridLine: function(vStart, vEnd, group, material, radius = 0.02) {
        const distance = vStart.distanceTo(vEnd);
        const position = vEnd.clone().add(vStart).multiplyScalar(0.5);
        const cylinderGeo = new THREE.CylinderGeometry(radius, radius, distance, 6);
        const lineMesh = new THREE.Mesh(cylinderGeo, material);
        lineMesh.position.copy(position);
        
        const direction = new THREE.Vector3().subVectors(vEnd, vStart).normalize();
        const up = new THREE.Vector3(0, 1, 0);
        lineMesh.quaternion.setFromUnitVectors(up, direction);
        
        group.add(lineMesh);
    },

    createBoxOutline: function(size, group, material) {
        const half = size / 2;
        const corners = [
            new THREE.Vector3(-half, -half, -half),
            new THREE.Vector3(half, -half, -half),
            new THREE.Vector3(half, half, -half),
            new THREE.Vector3(-half, half, -half),
            new THREE.Vector3(-half, -half, half),
            new THREE.Vector3(half, -half, half),
            new THREE.Vector3(half, half, half),
            new THREE.Vector3(-half, half, half)
        ];
        
        const edges = [
            [0,1], [1,2], [2,3], [3,0],
            [4,5], [5,6], [6,7], [7,4],
            [0,4], [1,5], [2,6], [3,7]
        ];
        edges.forEach(e => {
            this.createGridLine(corners[e[0]], corners[e[1]], group, material, 0.025);
        });
    },

    containsPoint: function(arr, pt, tolerance = 0.01) {
        return arr.some(item => item.distanceTo(pt) < tolerance);
    },

    createLatticeNaCl: function(dbItem, settings) {
        const group = new THREE.Group();
        const spacing = settings.latticeSpacing || 2.0;
        const radiusRatio = settings.ionRatio || 0.7;
        
        const atomsGroup = new THREE.Group();
        const lineGroup = new THREE.Group();
        
        const clColor = 0x10b981;
        const naColor = 0x8b5cf6;
        
        const clRadius = 0.38;
        const naRadius = 0.38 * radiusRatio;
        
        const clGeo = new THREE.SphereGeometry(clRadius, 32, 32);
        const naGeo = new THREE.SphereGeometry(naRadius, 32, 32);
        
        const clMat = new THREE.MeshStandardMaterial({ color: clColor, roughness: 0.15, metalness: 0.1, clearcoat: 0.2 });
        const naMat = new THREE.MeshStandardMaterial({ color: naColor, roughness: 0.2, metalness: 0.2, clearcoat: 0.2 });
        const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
        
        const points = [];
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    const isNa = (x + y + z) % 2 === 0;
                    const pos = new THREE.Vector3(x * spacing, y * spacing, z * spacing);
                    
                    const mesh = new THREE.Mesh(isNa ? naGeo : clGeo, isNa ? naMat : clMat);
                    mesh.position.copy(pos);
                    mesh.userData = {
                        type: 'ion',
                        name: isNa ? 'Sodium Cation (Na⁺)' : 'Chlorine Anion (Cl⁻)',
                        desc: isNa ? 'Small positively charged sodium ion.' : 'Large negatively charged chloride ion.'
                    };
                    
                    atomsGroup.add(mesh);
                    points.push({ pos: pos, isNa: isNa });
                }
            }
        }
        
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dist = points[i].pos.distanceTo(points[j].pos);
                if (Math.abs(dist - spacing) < 0.1) {
                    this.createGridLine(points[i].pos, points[j].pos, lineGroup, wireMat, 0.015);
                }
            }
        }
        
        group.add(atomsGroup);
        group.add(lineGroup);
        
        group.userData = {
            atoms: atomsGroup,
            lines: lineGroup,
            points: points.map(p => p.pos.clone()),
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.08 * speedFactor;
            },
            explode: function(progress) {
                atomsGroup.children.forEach((atom, idx) => {
                    const origPos = group.userData.points[idx];
                    const dir = origPos.clone().normalize();
                    if (origPos.lengthSq() < 0.01) dir.set(0, 1, 0);
                    atom.position.copy(origPos).addScaledVector(dir, progress * 1.8);
                });
                
                lineGroup.scale.setScalar(1 - progress);
                lineGroup.children.forEach(c => {
                    if (c.material) c.material.opacity = 0.15 * (1 - progress);
                });
            }
        };
        
        return group;
    },

    // 4. ASTRONOMY & SPACE GENERATOR (HIGH FIDELITY GLOBES)
    createSpaceObject: function(dbItem, settings) {
        const group = new THREE.Group();
        const body = dbItem.data.body;
        
        // Setup Planet Geometries
        const sphereGeo = new THREE.SphereGeometry(1.6, 64, 64);
        
        if (body === 'sun') {
            const sunTex = this.createSunTexture();
            const sunMat = new THREE.MeshBasicMaterial({ map: sunTex });
            const sunMesh = new THREE.Mesh(sphereGeo, sunMat);
            group.add(sunMesh);
            
            const coronaSize = settings.coronaSize || 1.8;
            const coronaGeo = new THREE.SphereGeometry(1.62, 32, 32);
            const coronaMat = new THREE.MeshBasicMaterial({
                color: 0xff3700,
                transparent: true,
                opacity: 0.35,
                blending: THREE.AdditiveBlending,
                side: THREE.DoubleSide
            });
            const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
            group.add(coronaMesh);
            
            const flares = new THREE.Group();
            const flareGeo = new THREE.ConeGeometry(0.12, 0.7, 4);
            const flareMat = new THREE.MeshBasicMaterial({
                color: 0xff4500,
                transparent: true,
                opacity: 0.5,
                blending: THREE.AdditiveBlending
            });
            for (let i = 0; i < 20; i++) {
                const flare = new THREE.Mesh(flareGeo, flareMat);
                const phi = Math.acos(-1 + (2 * i) / 20);
                const theta = Math.sqrt(20 * Math.PI) * phi;
                flare.position.set(
                    Math.cos(theta) * Math.sin(phi) * 1.6,
                    Math.sin(theta) * Math.sin(phi) * 1.6,
                    Math.cos(phi) * 1.6
                );
                const dir = flare.position.clone().normalize();
                flare.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
                flares.add(flare);
            }
            group.add(flares);
            
            group.userData = {
                animate: function(time, speedFactor) {
                    const rotSpeed = settings.rotationSpeed || 1.0;
                    sunMesh.rotation.y = time * 0.06 * rotSpeed * speedFactor;
                    coronaMesh.rotation.y = -time * 0.12 * speedFactor;
                    
                    const pulse = 1.0 + Math.sin(time * 2.5) * 0.04 * coronaSize;
                    coronaMesh.scale.setScalar(pulse);
                    
                    flares.children.forEach((f, idx) => {
                        f.scale.set(1, 1.0 + Math.sin(time * 4 + idx) * 0.15, 1);
                    });
                },
                explode: function(progress) {
                    sunMesh.scale.setScalar(1 + progress * 1.8);
                    coronaMesh.scale.setScalar(1 + progress * 2.8);
                    coronaMat.opacity = 0.35 * (1 - progress);
                    flares.scale.setScalar(1 - progress);
                }
            };
            
        } else if (body === 'earth') {
            const tiltAngle = settings.tiltAngle || 23.5;
            const moonDist = settings.moonDist || 6.0;
            
            const tiltGroup = new THREE.Group();
            tiltGroup.rotation.z = THREE.MathUtils.degToRad(tiltAngle);
            group.add(tiltGroup);
            
            // Earth Globe with Canvas Texture
            const earthTex = this.createEarthTexture();
            const earthMat = new THREE.MeshStandardMaterial({
                map: earthTex,
                roughness: 0.5,
                metalness: 0.1
            });
            const earthMesh = new THREE.Mesh(sphereGeo, earthMat);
            tiltGroup.add(earthMesh);
            
            // Clouds Atmosphere Layer (3D Parallax effect)
            // Creating a canvas texture for clouds dynamically
            const cloudCanvas = document.createElement("canvas");
            cloudCanvas.width = 512;
            cloudCanvas.height = 256;
            const cloudCtx = cloudCanvas.getContext("2d");
            cloudCtx.clearRect(0, 0, 512, 256);
            cloudCtx.fillStyle = "rgba(255, 255, 255, 0.4)";
            // Paint organic cloud puffs
            for (let i = 0; i < 25; i++) {
                cloudCtx.beginPath();
                cloudCtx.arc(Math.random() * 512, Math.random() * 256, 15 + Math.random() * 25, 0, Math.PI * 2);
                cloudCtx.fill();
            }
            const cloudTex = new THREE.CanvasTexture(cloudCanvas);
            
            const cloudGeo = new THREE.SphereGeometry(1.64, 32, 32);
            const cloudMat = new THREE.MeshStandardMaterial({
                map: cloudTex,
                transparent: true,
                opacity: 0.6,
                roughness: 0.9,
                blending: THREE.NormalBlending
            });
            const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
            tiltGroup.add(cloudMesh);
            
            // Red Polar Axis line
            const axisGeo = new THREE.CylinderGeometry(0.015, 0.015, 4.0, 8);
            const axisMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.4 });
            const axisMesh = new THREE.Mesh(axisGeo, axisMat);
            tiltGroup.add(axisMesh);
            
            // Moon Group
            const moonGroup = new THREE.Group();
            group.add(moonGroup);
            
            const moonTex = this.createMoonTexture();
            const moonGeo = new THREE.SphereGeometry(0.35, 32, 32);
            const moonMat = new THREE.MeshStandardMaterial({
                map: moonTex,
                roughness: 0.8,
                metalness: 0.0
            });
            const moonMesh = new THREE.Mesh(moonGeo, moonMat);
            moonMesh.position.x = moonDist;
            moonGroup.add(moonMesh);
            
            const orbitRingGeo = new THREE.RingGeometry(moonDist - 0.01, moonDist + 0.01, 128);
            const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
            const moonOrbitLine = new THREE.Mesh(orbitRingGeo, orbitRingMat);
            moonOrbitLine.rotation.x = Math.PI / 2;
            moonGroup.add(moonOrbitLine);
            
            group.userData = {
                animate: function(time, speedFactor) {
                    const moonSpeed = settings.moonSpeed || 1.0;
                    earthMesh.rotation.y = time * 0.25 * speedFactor;
                    cloudMesh.rotation.y = time * 0.3 * speedFactor;
                    
                    moonGroup.rotation.y = time * 0.05 * moonSpeed * speedFactor;
                    moonMesh.rotation.y = time * 0.05 * speedFactor;
                },
                explode: function(progress) {
                    earthMesh.scale.setScalar(1 + progress * 1.5);
                    cloudMesh.scale.setScalar(1 + progress * 2.2);
                    cloudMat.opacity = 0.6 * (1 - progress);
                    moonMesh.position.x = moonDist + progress * 6.0;
                    moonMesh.scale.setScalar(1 - progress);
                    moonOrbitLine.scale.setScalar(1 + progress);
                    orbitRingMat.opacity = 0.06 * (1 - progress);
                }
            };
            
        } else if (body === 'saturn') {
            const rotSpeed = settings.rotationSpeed || 1.0;
            const ringTilt = settings.ringAngle || 27;
            const ringWidth = settings.ringWidth || 1.4;
            
            // Saturn sphere
            const saturnTex = this.createSaturnTexture();
            const satGeo = new THREE.SphereGeometry(1.3, 64, 64);
            satGeo.scale(1.0, 0.88, 1.0); // Saturn Oblateness
            const satMat = new THREE.MeshStandardMaterial({
                map: saturnTex,
                roughness: 0.5,
                metalness: 0.1
            });
            const saturnMesh = new THREE.Mesh(satGeo, satMat);
            group.add(saturnMesh);
            
            // Rings
            const ringsGroup = new THREE.Group();
            ringsGroup.rotation.x = THREE.MathUtils.degToRad(90 - ringTilt);
            group.add(ringsGroup);
            
            const ringParams = [
                { inner: 1.6, outer: 2.1, color: 0x9a8570, opacity: 0.7 },
                { inner: 2.15, outer: 2.8, color: 0xd9c5b2, opacity: 0.9 },
                { inner: 2.9, outer: 3.5, color: 0xbfad98, opacity: 0.6 }
            ];
            
            ringParams.forEach(p => {
                const innerRad = p.inner;
                const outerRad = p.outer * ringWidth;
                const ringGeo = new THREE.RingGeometry(innerRad, outerRad, 128);
                const ringMat = new THREE.MeshStandardMaterial({
                    color: p.color,
                    transparent: true,
                    opacity: p.opacity,
                    side: THREE.DoubleSide,
                    roughness: 0.8
                });
                const ringMesh = new THREE.Mesh(ringGeo, ringMat);
                ringsGroup.add(ringMesh);
            });
            
            group.userData = {
                animate: function(time, speedFactor) {
                    saturnMesh.rotation.y = time * 0.35 * rotSpeed * speedFactor;
                    ringsGroup.rotation.z = time * 0.02 * speedFactor;
                },
                explode: function(progress) {
                    saturnMesh.scale.setScalar(1 + progress * 2.0);
                    ringsGroup.scale.setScalar(1 + progress * 2.5);
                    ringsGroup.children.forEach(r => {
                        r.material.opacity = (1 - progress) * 0.8;
                    });
                }
            };
            
        } else if (body === 'mars') {
            const rotSpeed = settings.rotationSpeed || 1.0;
            const polarCapSize = settings.polarCapSize || 0.2;
            
            const marsTex = this.createMarsTexture();
            const marsMat = new THREE.MeshStandardMaterial({
                map: marsTex,
                roughness: 0.6,
                metalness: 0.05
            });
            const marsMesh = new THREE.Mesh(sphereGeo, marsMat);
            group.add(marsMesh);
            
            group.userData = {
                animate: function(time, speedFactor) {
                    marsMesh.rotation.y = time * 0.2 * rotSpeed * speedFactor;
                },
                explode: function(progress) {
                    marsMesh.scale.setScalar(1 + progress * 2.0);
                }
            };
            
        } else if (body === 'jupiter') {
            const rotSpeed = settings.rotationSpeed || 1.2;
            
            const jupiterTex = this.createJupiterTexture();
            const jupGeo = new THREE.SphereGeometry(1.5, 64, 64);
            jupGeo.scale(1.0, 0.93, 1.0); // Oblate gas giant
            
            const jupMat = new THREE.MeshStandardMaterial({
                map: jupiterTex,
                roughness: 0.4,
                metalness: 0.1
            });
            const jupiterMesh = new THREE.Mesh(jupGeo, jupMat);
            group.add(jupiterMesh);
            
            group.userData = {
                animate: function(time, speedFactor) {
                    jupiterMesh.rotation.y = time * 0.4 * rotSpeed * speedFactor;
                },
                explode: function(progress) {
                    jupiterMesh.scale.setScalar(1 + progress * 2.0);
                }
            };
            
        } else if (body === 'moon') {
            const rotSpeed = settings.rotationSpeed || 1.0;
            
            const moonTex = this.createMoonTexture();
            const moonGeo = new THREE.SphereGeometry(1.2, 64, 64);
            const moonMat = new THREE.MeshStandardMaterial({
                map: moonTex,
                roughness: 0.9,
                metalness: 0.0
            });
            const moonMesh = new THREE.Mesh(moonGeo, moonMat);
            group.add(moonMesh);
            
            group.userData = {
                animate: function(time, speedFactor) {
                    moonMesh.rotation.y = time * 0.08 * rotSpeed * speedFactor;
                },
                explode: function(progress) {
                    moonMesh.scale.setScalar(1 + progress * 2.0);
                }
            };
            
        } else if (body === 'blackhole') {
            const horizonGeo = new THREE.SphereGeometry(1.0, 32, 32);
            const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
            group.add(horizonMesh);
            
            const diskGroup = new THREE.Group();
            group.add(diskGroup);
            
            const diskRadius = settings.diskRadius || 4.5;
            const lensing = settings.lensingStrength || 1.5;
            
            const flatDiskGeo = new THREE.RingGeometry(1.5, diskRadius, 128);
            const flatDiskMat = new THREE.MeshBasicMaterial({
                color: 0xff7700,
                transparent: true,
                opacity: 0.75,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending
            });
            const flatDisk = new THREE.Mesh(flatDiskGeo, flatDiskMat);
            flatDisk.rotation.x = Math.PI / 2;
            diskGroup.add(flatDisk);
            
            const lensedDiskGeo = new THREE.RingGeometry(1.05, 1.45 * lensing, 64);
            const lensedDiskMat = new THREE.MeshBasicMaterial({
                color: 0xff3700,
                transparent: true,
                opacity: 0.45,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending
            });
            const verticalLensing = new THREE.Mesh(lensedDiskGeo, lensedDiskMat);
            verticalLensing.rotation.y = Math.PI / 4;
            diskGroup.add(verticalLensing);
            
            const particlesGeo = new THREE.BufferGeometry();
            const particlesCount = 200;
            const positions = new Float32Array(particlesCount * 3);
            const orbitRadii = [];
            const orbitSpeeds = [];
            
            for (let i = 0; i < particlesCount; i++) {
                const rad = 1.5 + Math.random() * (diskRadius - 1.5);
                const angle = Math.random() * Math.PI * 2;
                positions[i * 3] = Math.cos(angle) * rad;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
                positions[i * 3 + 2] = Math.sin(angle) * rad;
                
                orbitRadii.push(rad);
                orbitSpeeds.push(1.5 / Math.sqrt(rad));
            }
            
            particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particleMat = new THREE.PointsMaterial({
                color: 0xffcc00,
                size: 0.04,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });
            const dustParticles = new THREE.Points(particlesGeo, particleMat);
            diskGroup.add(dustParticles);
            
            group.userData = {
                animate: function(time, speedFactor) {
                    const diskSpeed = settings.diskSpeed || 1.5;
                    diskGroup.rotation.y = time * 0.1 * diskSpeed * speedFactor;
                    verticalLensing.rotation.z = time * 0.05 * speedFactor;
                    
                    const posArr = dustParticles.geometry.attributes.position.array;
                    for (let i = 0; i < particlesCount; i++) {
                        const radius = orbitRadii[i];
                        const speed = orbitSpeeds[i] * diskSpeed * speedFactor;
                        const angle = time * speed + i;
                        posArr[i * 3] = Math.cos(angle) * radius;
                        posArr[i * 3 + 2] = Math.sin(angle) * radius;
                    }
                    dustParticles.geometry.attributes.position.needsUpdate = true;
                },
                explode: function(progress) {
                    horizonMesh.scale.setScalar(1 - progress);
                    diskGroup.scale.setScalar(1 + progress * 2.0);
                    flatDiskMat.opacity = 0.75 * (1 - progress);
                    lensedDiskMat.opacity = 0.45 * (1 - progress);
                    particleMat.opacity = 0.8 * (1 - progress);
                }
            };
        }
        
        return group;
    },

    // 5. PHYSICS EXPERIMENTS GENERATOR
    createPhysicsSetup: function(dbItem, settings) {
        const group = new THREE.Group();
        const setup = dbItem.data.setup;
        
        if (setup === 'pendulum_simple') {
            const standGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8);
            const standMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.2 });
            const standMesh = new THREE.Mesh(standGeo, standMat);
            standMesh.rotation.x = Math.PI / 2;
            standMesh.position.y = 2.0;
            group.add(standMesh);
            
            const stringGeo = new THREE.CylinderGeometry(0.012, 0.012, 1.0, 8);
            const stringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const stringMesh = new THREE.Mesh(stringGeo, stringMat);
            stringMesh.geometry.translate(0, -0.5, 0);
            stringMesh.position.y = 2.0;
            group.add(stringMesh);
            
            const bobGeo = new THREE.SphereGeometry(0.3, 32, 32);
            const bobMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8, roughness: 0.1 });
            const bobMesh = new THREE.Mesh(bobGeo, bobMat);
            bobMesh.userData = {
                type: 'bob',
                name: 'Pendulum Bob',
                desc: 'Concentrated mass subject to restoring gravity forces.'
            };
            group.add(bobMesh);
            
            const length = settings.stringLength || 3.0;
            let angle = THREE.MathUtils.degToRad(settings.initAngle || 45);
            let angularVelocity = 0;
            
            group.userData = {
                animate: function(time, speedFactor) {
                    const g = settings.gravityAccel || 9.8;
                    const b = settings.dampingFactor || 0.005;
                    const dt = 0.016 * speedFactor;
                    
                    const angularAccel = -(g / length) * Math.sin(angle) - b * angularVelocity;
                    angularVelocity += angularAccel * dt * 60;
                    angle += angularVelocity * dt * 60;
                    
                    stringMesh.scale.set(1, length, 1);
                    stringMesh.rotation.z = angle;
                    
                    const bobPos = new THREE.Vector3(
                        -Math.sin(angle) * length,
                        2.0 - Math.cos(angle) * length,
                        0
                    );
                    bobMesh.position.copy(bobPos);
                },
                explode: function(progress) {
                    standMesh.position.y = 2.0 + progress * 2.0;
                    bobMesh.position.y = (2.0 - length) - progress * 2.0;
                    stringMesh.scale.set(1, length * (1 - progress), 1);
                    bobMesh.scale.setScalar(1 - progress);
                }
            };
            
        } else if (setup === 'pendulum_double') {
            const standGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.2, 8);
            const standMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af });
            const stand = new THREE.Mesh(standGeo, standMat);
            stand.rotation.x = Math.PI / 2;
            stand.position.y = 1.5;
            group.add(stand);
            
            const rMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const bMat1 = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.5 });
            const bMat2 = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, metalness: 0.5 });
            
            const rod1 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.0), rMat);
            const rod2 = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.0), rMat);
            rod1.geometry.translate(0, -0.5, 0);
            rod2.geometry.translate(0, -0.5, 0);
            group.add(rod1);
            group.add(rod2);
            
            const bob1 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), bMat1);
            const bob2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), bMat2);
            group.add(bob1);
            group.add(bob2);
            
            const trailLenMax = settings.trailLen || 300;
            const trailGeo = new THREE.BufferGeometry();
            const trailPoints = new Float32Array(trailLenMax * 3);
            trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPoints, 3));
            
            const trailMat = new THREE.LineBasicMaterial({
                color: 0x8b5cf6,
                transparent: true,
                opacity: 0.6
            });
            const trailLine = new THREE.Line(trailGeo, trailMat);
            group.add(trailLine);
            
            const l1 = 1.6;
            const l2 = 1.6 * (settings.lengthRatio || 1.0);
            const m1 = 1.0;
            const m2 = 1.0 * (settings.massRatio || 1.0);
            const g = 9.8;
            
            let th1 = Math.PI / 2;
            let th2 = Math.PI / 2;
            let w1 = 0;
            let w2 = 0;
            const trailHistory = [];
            
            const getDerivatives = (t1, t2, v1, v2) => {
                const delta = t1 - t2;
                const num1 = -g * (2 * m1 + m2) * Math.sin(t1) - m2 * g * Math.sin(t1 - 2 * t2) - 2 * Math.sin(delta) * m2 * (v2 * v2 * l2 + v1 * v1 * l1 * Math.cos(delta));
                const den1 = l1 * (2 * m1 + m2 - m2 * Math.cos(2 * t1 - 2 * t2));
                const a1 = num1 / den1;
                
                const num2 = 2 * Math.sin(delta) * (v1 * v1 * l1 * (m1 + m2) + g * (m1 + m2) * Math.cos(t1) + v2 * v2 * l2 * m2 * Math.cos(delta));
                const den2 = l2 * (2 * m1 + m2 - m2 * Math.cos(2 * t1 - 2 * t2));
                const a2 = num2 / den2;
                return [v1, v2, a1, a2];
            };
            
            group.userData = {
                animate: function(time, speedFactor) {
                    const dt = 0.016 * speedFactor;
                    const [v1, v2, a1, a2] = getDerivatives(th1, th2, w1, w2);
                    w1 += a1 * dt * 60;
                    w2 += a2 * dt * 60;
                    w1 *= 0.999;
                    w2 *= 0.999;
                    th1 += w1 * dt * 60;
                    th2 += w2 * dt * 60;
                    
                    const p1 = new THREE.Vector3(l1 * Math.sin(th1), 1.5 - l1 * Math.cos(th1), 0);
                    const p2 = new THREE.Vector3(p1.x + l2 * Math.sin(th2), p1.y - l2 * Math.cos(th2), 0);
                    
                    rod1.scale.set(1, l1, 1);
                    rod1.rotation.z = th1;
                    rod1.position.set(0, 1.5, 0);
                    
                    rod2.scale.set(1, l2, 1);
                    rod2.rotation.z = th2;
                    rod2.position.copy(p1);
                    
                    bob1.position.copy(p1);
                    bob2.position.copy(p2);
                    
                    trailHistory.push(p2.clone());
                    if (trailHistory.length > trailLenMax) {
                        trailHistory.shift();
                    }
                    
                    const posArr = trailLine.geometry.attributes.position.array;
                    for (let i = 0; i < trailLenMax; i++) {
                        const pt = trailHistory[i] || p2;
                        posArr[i * 3] = pt.x;
                        posArr[i * 3 + 1] = pt.y;
                        posArr[i * 3 + 2] = pt.z;
                    }
                    trailLine.geometry.attributes.position.needsUpdate = true;
                },
                explode: function(progress) {
                    stand.position.y = 1.5 + progress * 2.0;
                    bob1.position.addScalar(progress * 2.0);
                    bob2.position.subScalar(progress * 2.0);
                    rod1.scale.setScalar(1 - progress);
                    rod2.scale.setScalar(1 - progress);
                    trailLine.scale.setScalar(1 - progress);
                }
            };
            
        } else if (setup === 'prism') {
            const prismGeo = new THREE.CylinderGeometry(1.2, 1.2, 1.6, 3);
            const prismMat = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.35,
                transmission: 0.9,
                ior: settings.glassIndex || 1.52,
                roughness: 0.0
            });
            const prism = new THREE.Mesh(prismGeo, prismMat);
            prism.rotation.x = Math.PI / 2;
            group.add(prism);
            
            const rayGroup = new THREE.Group();
            group.add(rayGroup);
            
            const beamAngleDeg = settings.beamAngle || 0;
            const beamAngle = THREE.MathUtils.degToRad(beamAngleDeg);
            
            const startPt = new THREE.Vector3(-4, Math.tan(beamAngle) * -4, 0);
            const enterPt = new THREE.Vector3(-0.6, 0.15, 0);
            
            const lineWhiteMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });
            const whiteRay = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints([startPt, enterPt]),
                lineWhiteMat
            );
            rayGroup.add(whiteRay);
            
            const colors = [0xef4444, 0xf97316, 0xeab308, 0x22c55e, 0x3b82f6, 0x4f46e5, 0xa855f7];
            const dispersedLines = [];
            
            colors.forEach((col, idx) => {
                const lambdaOffset = (idx - 3) * 0.03;
                const bendAngle = -0.3 + lambdaOffset;
                
                const exitPt = new THREE.Vector3(0.5, -0.2 + lambdaOffset * 2.0, 0);
                const finalPt = new THREE.Vector3(4, -1.0 + bendAngle * 5.0, 0);
                
                const innerGeo = new THREE.BufferGeometry().setFromPoints([enterPt, exitPt]);
                const innerLine = new THREE.Line(innerGeo, new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.4 }));
                rayGroup.add(innerLine);
                
                const outerGeo = new THREE.BufferGeometry().setFromPoints([exitPt, finalPt]);
                const outerLine = new THREE.Line(outerGeo, new THREE.LineBasicMaterial({ color: col, linewidth: 2 }));
                rayGroup.add(outerLine);
                
                dispersedLines.push({ inner: innerLine, outer: outerLine, enter: enterPt, exit: exitPt, final: finalPt });
            });
            
            group.userData = {
                animate: function(time, speedFactor) {
                    prism.rotation.y = Math.sin(time * 0.1) * 0.05 * speedFactor;
                },
                explode: function(progress) {
                    prism.position.y = progress * 2.5;
                    prism.scale.setScalar(1 - progress);
                    rayGroup.scale.setScalar(1 - progress);
                }
            };
            
        } else if (setup === 'magnetic') {
            const barGeo = new THREE.BoxGeometry(2.4, 0.4, 0.4);
            const nMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
            const sMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.3 });
            
            const magnet = new THREE.Group();
            const northPart = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.4), nMat);
            northPart.position.x = 0.6;
            const southPart = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.4), sMat);
            southPart.position.x = -0.6;
            magnet.add(northPart);
            magnet.add(southPart);
            group.add(magnet);
            
            const particleCount = settings.particleCount || 400;
            const fieldGeo = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const flowSpeeds = [];
            const flowPaths = [];
            
            for (let i = 0; i < particleCount; i++) {
                const loopRadiusX = 1.0 + Math.random() * 3.0;
                const loopHeightY = 0.5 + Math.random() * 2.0;
                const angleZ = Math.random() * Math.PI * 2;
                
                flowPaths.push({
                    rx: loopRadiusX,
                    ry: loopHeightY,
                    az: angleZ,
                    progress: Math.random()
                });
                
                positions[i * 3] = 0;
                positions[i * 3 + 1] = 0;
                positions[i * 3 + 2] = 0;
                flowSpeeds.push(0.005 + Math.random() * 0.01);
            }
            
            fieldGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            const particleMat = new THREE.PointsMaterial({
                color: 0x06b6d4,
                size: 0.045,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });
            const fieldParticles = new THREE.Points(fieldGeo, particleMat);
            group.add(fieldParticles);
            
            const getDipolePos = (path) => {
                const t = path.progress;
                const angle = t * Math.PI;
                const localX = Math.cos(angle) * path.rx;
                const localY = Math.sin(angle) * path.ry;
                const x = localX;
                const y = Math.cos(path.az) * localY;
                const z = Math.sin(path.az) * localY;
                return new THREE.Vector3(x, y, z);
            };
            
            group.userData = {
                animate: function(time, speedFactor) {
                    magnet.rotation.y = Math.sin(time * 0.2) * 0.15 * speedFactor;
                    const posArr = fieldParticles.geometry.attributes.position.array;
                    flowPaths.forEach((path, i) => {
                        path.progress += flowSpeeds[i] * speedFactor;
                        if (path.progress > 1.0) path.progress = 0.0;
                        
                        const pos = getDipolePos(path);
                        posArr[i * 3] = pos.x;
                        posArr[i * 3 + 1] = pos.y;
                        posArr[i * 3 + 2] = pos.z;
                    });
                    fieldParticles.geometry.attributes.position.needsUpdate = true;
                },
                explode: function(progress) {
                    northPart.position.x = 0.6 + progress * 2.0;
                    southPart.position.x = -0.6 - progress * 2.0;
                    fieldParticles.scale.setScalar(1 + progress * 2.0);
                    particleMat.opacity = 0.7 * (1 - progress);
                }
            };
        }
        
        return group;
    },

    // 5.B NEW LAB INSTRUMENT: VERNIER CALIPER (REBUILT - Large Scale, Canvas Number Textures)
    createVernierCaliper: function(dbItem, settings) {
        const group = new THREE.Group();
        const objectSize = settings.objectSize !== undefined ? settings.objectSize : 24.5; // mm (0–60)
        
        // Scale: 1 Three.js unit = 10 mm  →  60mm span becomes 6.0 units
        const SCALE = 0.1;   // mm → world units
        const totalMM = 60;  // full bar length in mm
        const totalU  = totalMM * SCALE; // 6.0 world units
        const slideU  = objectSize * SCALE;
        
        // ---- MATERIAL LIBRARY ----
        const steelMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.92, roughness: 0.08 });
        const darkMat  = new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.8, roughness: 0.2 });
        const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.18 });
        const redMat   = new THREE.MeshStandardMaterial({ color: 0xef4444 });
        
        // ==========================================
        // A. MAIN SCALE BAR (canvas texture with mm numbers)
        // ==========================================
        const BAR_W = totalU + 1.5; // slightly longer than span
        const BAR_H = 0.6;
        const BAR_D = 0.12;
        
        // Build canvas texture for main scale
        const msCvs = document.createElement('canvas');
        msCvs.width = 1024; msCvs.height = 128;
        const msCtx = msCvs.getContext('2d');
        
        // Background: brushed steel gradient
        const grad = msCtx.createLinearGradient(0, 0, 0, 128);
        grad.addColorStop(0, '#e5e7eb');
        grad.addColorStop(0.5, '#f3f4f6');
        grad.addColorStop(1, '#d1d5db');
        msCtx.fillStyle = grad;
        msCtx.fillRect(0, 0, 1024, 128);
        
        // Draw tick marks and numbers (0 to 60 mm)
        const pxPerMM = 1024 / (totalMM + 5); // leave a bit of padding
        msCtx.fillStyle = '#111827';
        msCtx.strokeStyle = '#111827';
        msCtx.lineWidth = 2;
        msCtx.font = 'bold 20px monospace';
        msCtx.textAlign = 'center';
        
        for (let mm = 0; mm <= totalMM; mm++) {
            const px = 30 + mm * pxPerMM;
            const isCm  = mm % 10 === 0;
            const isHalf = mm % 5 === 0;
            const tickH  = isCm ? 54 : (isHalf ? 36 : 22);
            
            msCtx.lineWidth = isCm ? 3 : (isHalf ? 2 : 1);
            msCtx.beginPath();
            msCtx.moveTo(px, 68);
            msCtx.lineTo(px, 68 - tickH);
            msCtx.stroke();
            
            if (isCm) {
                msCtx.fillStyle = '#111827';
                msCtx.font = 'bold 22px monospace';
                msCtx.fillText(String(mm), px, 100);
            } else if (isHalf) {
                msCtx.font = '14px monospace';
                msCtx.fillStyle = '#374151';
                msCtx.fillText(String(mm), px, 100);
            }
        }
        
        // "mm" label at right edge
        msCtx.font = 'bold 18px monospace';
        msCtx.fillStyle = '#6b7280';
        msCtx.fillText('mm', 980, 108);
        
        const mainScaleTex = new THREE.CanvasTexture(msCvs);
        
        const barGeo  = new THREE.BoxGeometry(BAR_W, BAR_H, BAR_D);
        const barMats = [steelMat, steelMat, steelMat, steelMat,
                         new THREE.MeshStandardMaterial({ map: mainScaleTex }), steelMat];
        const scaleBar = new THREE.Mesh(barGeo, barMats);
        scaleBar.position.set(totalU / 2 - 0.4, 0, 0);  // centred along span
        group.add(scaleBar);
        
        // ==========================================
        // B. FIXED JAW ASSEMBLY
        // ==========================================
        const fixedJaw = new THREE.Group();
        
        // Jaw body (outer)
        const fJawOuter = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.6, BAR_D * 3), steelMat);
        fJawOuter.position.set(0, -1.0, 0);
        fixedJaw.add(fJawOuter);
        
        // Jaw tip (hardened flat)
        const fJawTip = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, BAR_D * 3), darkMat);
        fJawTip.position.set(0, -2.36, 0);
        fixedJaw.add(fJawTip);
        
        // Upper jaw (for inner measurements)
        const fUpper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, BAR_D * 2), steelMat);
        fUpper.position.set(0.1, 0.65, 0);
        fixedJaw.add(fUpper);
        
        fixedJaw.position.set(-0.4, 0, 0);
        group.add(fixedJaw);
        
        // ==========================================
        // C. SLIDING ASSEMBLY (moves with objectSize)
        // ==========================================
        const sliderGroup = new THREE.Group();
        sliderGroup.position.set(slideU, 0, 0);
        
        // Vernier scale canvas
        const vsCvs = document.createElement('canvas');
        vsCvs.width = 256; vsCvs.height = 128;
        const vsCtx = vsCvs.getContext('2d');
        
        const vsGrad = vsCtx.createLinearGradient(0, 0, 0, 128);
        vsGrad.addColorStop(0, '#dbeafe');
        vsGrad.addColorStop(1, '#bfdbfe');
        vsCtx.fillStyle = vsGrad;
        vsCtx.fillRect(0, 0, 256, 128);
        
        // Vernier: 10 divisions = 9 mm (each 0.9 mm apart)
        const vPxPerDiv = 256 / 11;
        vsCtx.strokeStyle = '#1e40af';
        vsCtx.fillStyle   = '#1e3a8a';
        vsCtx.font = 'bold 18px monospace';
        vsCtx.textAlign = 'center';
        
        for (let d = 0; d <= 10; d++) {
            const px = 20 + d * vPxPerDiv;
            const isEnd = (d === 0 || d === 5 || d === 10);
            vsCtx.lineWidth = isEnd ? 3 : 1.5;
            const th = isEnd ? 50 : 30;
            vsCtx.beginPath();
            vsCtx.moveTo(px, 64);
            vsCtx.lineTo(px, 64 - th);
            vsCtx.stroke();
            if (isEnd || d % 2 === 0) {
                vsCtx.fillText(String(d), px, 95);
            }
        }
        // "VC" label
        vsCtx.font = 'bold 14px monospace';
        vsCtx.fillStyle = '#1d4ed8';
        vsCtx.fillText('Vernier', 128, 116);
        
        const vernierScaleTex = new THREE.CanvasTexture(vsCvs);
        
        // Sleeve body
        const SLEEVE_W = 1.8;
        const sleeveGeo  = new THREE.BoxGeometry(SLEEVE_W, 0.65, BAR_D * 3.5);
        const sleeveMats = [steelMat, steelMat, steelMat, steelMat,
                            new THREE.MeshStandardMaterial({ map: vernierScaleTex }), steelMat];
        const sleeve = new THREE.Mesh(sleeveGeo, sleeveMats);
        sleeve.position.set(-SLEEVE_W / 2, 0, BAR_D * 1.2);
        sliderGroup.add(sleeve);
        
        // Movable jaw
        const mJawOuter = new THREE.Mesh(new THREE.BoxGeometry(0.7, 2.6, BAR_D * 3), steelMat);
        mJawOuter.position.set(-0.9, -1.0, BAR_D * 0.8);
        sliderGroup.add(mJawOuter);
        
        const mJawTip = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, BAR_D * 3), darkMat);
        mJawTip.position.set(-0.9, -2.36, BAR_D * 0.8);
        sliderGroup.add(mJawTip);
        
        const mUpper = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, BAR_D * 2), steelMat);
        mUpper.position.set(-0.8, 0.65, BAR_D * 0.6);
        sliderGroup.add(mUpper);
        
        // Locking screw
        const lockScrew = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.18, 8), brassMat);
        lockScrew.position.set(-1.1, 0.1, BAR_D * 3);
        lockScrew.rotation.x = Math.PI / 2;
        sliderGroup.add(lockScrew);
        
        // ---- HIGHLIGHTED ZERO-LINE on Vernier ----
        const zeroLineMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const zeroLine = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.5, BAR_D * 5), zeroLineMat);
        zeroLine.position.set(-SLEEVE_W, 0.05, BAR_D * 1.5);
        sliderGroup.add(zeroLine);
        
        group.add(sliderGroup);
        
        // ==========================================
        // D. DEPTH PROBE (rod sliding through back of bar)
        // ==========================================
        const depthRod = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, slideU + 0.1), steelMat);
        depthRod.position.set(slideU / 2 - 0.5, -0.25, -BAR_D * 0.8);
        group.add(depthRod);
        
        // ==========================================
        // E. MEASURED OBJECT (coloured sphere clamped between jaws)
        // ==========================================
        // Safely clamp so sphere doesn't overflow
        const sphereR = Math.max(0.05, Math.min(slideU / 2, 1.8));
        const objGeo  = new THREE.SphereGeometry(sphereR, 32, 32);
        const objMesh = new THREE.Mesh(objGeo, brassMat);
        objMesh.position.set(-0.4 + sphereR, -1.5 - sphereR * 0.5, 0);
        objMesh.userData = {
            type: 'measured_object', name: 'Measured Sphere',
            desc: `Ø ${objectSize.toFixed(1)} mm`
        };
        group.add(objMesh);
        
        // ==========================================
        // F. FLOATING DIMENSION LABEL (canvas sprite)
        // ==========================================
        const dimCvs = document.createElement('canvas');
        dimCvs.width = 256; dimCvs.height = 64;
        const dimCtx = dimCvs.getContext('2d');
        dimCtx.fillStyle = 'rgba(0,0,0,0)';
        dimCtx.clearRect(0, 0, 256, 64);
        
        const msr = Math.floor(objectSize);
        const vc  = Math.round((objectSize - msr) * 10);
        const tot = (msr + vc * 0.1).toFixed(1);
        
        dimCtx.fillStyle = 'rgba(6,182,212,0.15)';
        dimCtx.beginPath();
        dimCtx.roundRect(4, 4, 248, 56, 8);
        dimCtx.fill();
        dimCtx.fillStyle = '#06b6d4';
        dimCtx.font = 'bold 22px monospace';
        dimCtx.textAlign = 'center';
        dimCtx.fillText(`${tot} mm  (MSR:${msr} + VC:${vc}×0.1)`, 128, 38);
        
        const dimTex = new THREE.CanvasTexture(dimCvs);
        const dimMat = new THREE.MeshBasicMaterial({ map: dimTex, transparent: true, side: THREE.DoubleSide, depthWrite: false });
        const dimPlane = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 1.0), dimMat);
        dimPlane.position.set(slideU / 2, -3.5, 0);
        group.add(dimPlane);
        
        // ==========================================
        // G. LEADER LINES from jaw tips to label
        // ==========================================
        const lineMat = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.6 });
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-0.4, -2.36, 0),
            new THREE.Vector3(-0.4, -3.5, 0),
            new THREE.Vector3(slideU / 2, -3.5, 0)
        ]);
        group.add(new THREE.Line(lineGeo, lineMat));
        
        const lineGeo2 = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(slideU - 0.9, -2.36, 0),
            new THREE.Vector3(slideU - 0.9, -3.5, 0),
            new THREE.Vector3(slideU / 2, -3.5, 0)
        ]);
        group.add(new THREE.Line(lineGeo2, lineMat));
        
        // Scale the whole model up for visibility
        group.scale.setScalar(1.4);
        
        group.userData = {
            slider: sliderGroup,
            object: objMesh,
            animate: function(time, speedFactor) {
                // gentle float
                group.position.y = Math.sin(time * 0.4) * 0.05;
            },
            explode: function(progress) {
                sliderGroup.position.x = slideU + progress * 4.0;
                objMesh.scale.setScalar(1 - progress);
                dimPlane.scale.setScalar(1 - progress);
            }
        };
        
        return group;
    },

    // 5.C NEW OPTICS INSTRUMENT: RAY OPTICS BENCH
    createRayOptics: function(dbItem, settings) {
        const group = new THREE.Group();
        
        const u = settings.objectDist || 3.0; // object distance (positive magnitude)
        const f = settings.focalLen || 1.5;   // lens focal length
        
        // Solve lens equation: 1/v - 1/(-u) = 1/f => 1/v = 1/f - 1/u => v = (u * f) / (u - f)
        const isVirtual = u < f;
        const v = isVirtual ? (u * f) / (u - f) : (u * f) / (u - f);
        
        // Visual Scale multipliers
        const scaleX = 1.2;
        const arrowHeight = 0.8;
        
        // A. Optical Rail Bench
        const railMat = new THREE.MeshStandardMaterial({ color: 0x4b5563, roughness: 0.3, metalness: 0.7 });
        const rail = new THREE.Mesh(new THREE.BoxGeometry(10.0, 0.08, 0.2), railMat);
        rail.position.set(0, -1.0, 0);
        group.add(rail);
        
        // Stand mounts
        const standMat = new THREE.MeshStandardMaterial({ color: 0x1f2937 });
        const supportL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 0.15), standMat);
        supportL.position.set(-4.5, -1.15, 0);
        group.add(supportL);
        const supportR = supportL.clone();
        supportR.position.x = 4.5;
        group.add(supportR);
        
        // B. Biconvex Glass Lens
        // Formed by squashing a sphere along X
        const lensGeo = new THREE.SphereGeometry(1.2, 32, 32);
        lensGeo.scale(0.12, 1.0, 1.0);
        const lensMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3,
            transmission: 0.95,
            ior: 1.52,
            roughness: 0.0
        });
        const lens = new THREE.Mesh(lensGeo, lensMat);
        lens.position.set(0, 0, 0);
        group.add(lens);
        
        // Lens rim holder
        const rim = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.05, 16, 64), standMat);
        rim.position.set(0, 0, 0);
        group.add(rim);
        
        // C. Illuminated Object (Red Glowing Arrow)
        const objPos = -u * scaleX;
        const objectArrow = new THREE.Group();
        objectArrow.position.set(objPos, -1.0, 0);
        
        const arrowShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, arrowHeight), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        arrowShaft.position.y = arrowHeight / 2;
        objectArrow.add(arrowShaft);
        
        const arrowTip = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.16, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        arrowTip.position.y = arrowHeight;
        objectArrow.add(arrowTip);
        
        group.add(objectArrow);
        
        // D. Image Projection Screen & Image Arrow
        const screenGroup = new THREE.Group();
        const imgPos = v * scaleX;
        
        // If real image, draw screen at v
        const screenMat = new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.9 });
        const screen = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.8, 1.0), screenMat);
        screen.position.set(imgPos, -0.1, 0);
        
        const screenHolder = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.8, 0.12), standMat);
        screenHolder.position.set(imgPos, -0.6, 0);
        
        if (!isVirtual) {
            screenGroup.add(screen);
            screenGroup.add(screenHolder);
            
            // Image Arrow (inverted, scaled by magnification m = v / -u)
            const mag = v / -u; 
            const imgArrowHeight = arrowHeight * Math.abs(mag);
            
            const imageArrow = new THREE.Group();
            imageArrow.position.set(imgPos, -1.0, 0);
            
            const iShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, imgArrowHeight), new THREE.MeshBasicMaterial({ color: 0x10b981 })); // Green for real image
            iShaft.position.y = -imgArrowHeight / 2; // points downward
            imageArrow.add(iShaft);
            
            const iTip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 8), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
            iTip.position.y = -imgArrowHeight;
            iTip.rotation.z = Math.PI; // point down
            imageArrow.add(iTip);
            
            screenGroup.add(imageArrow);
        } else {
            // Draw a dashed virtual arrow at v (behind object, upright and magnified)
            const mag = Math.abs(v / -u);
            const imgArrowHeight = arrowHeight * mag;
            
            const virtualArrow = new THREE.Group();
            virtualArrow.position.set(imgPos, -1.0, 0);
            
            // Dotted look (multiple small cylinders)
            const segs = 6;
            for (let i = 0; i < segs; i++) {
                const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, imgArrowHeight / (segs * 2)), new THREE.MeshBasicMaterial({ color: 0xf59e0b })); // Yellow for virtual
                seg.position.y = (i * (imgArrowHeight / segs)) + (imgArrowHeight / (segs * 4));
                virtualArrow.add(seg);
            }
            const iTip = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.12, 8), new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
            iTip.position.y = imgArrowHeight;
            virtualArrow.add(iTip);
            
            screenGroup.add(virtualArrow);
        }
        group.add(screenGroup);
        
        // E. Refracting Light Rays (Glowing line meshes)
        const rayGroup = new THREE.Group();
        const ray1Mat = new THREE.LineBasicMaterial({ color: 0x06b6d4, linewidth: 2 }); // Ray 1: Parallel -> Focus
        const ray2Mat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, linewidth: 2 }); // Ray 2: Center straight
        
        // 1. Parallel -> Focal ray
        const r1Pts = [
            new THREE.Vector3(objPos, -1.0 + arrowHeight, 0),
            new THREE.Vector3(0, -1.0 + arrowHeight, 0)
        ];
        if (!isVirtual) {
            r1Pts.push(new THREE.Vector3(imgPos, -1.0 - (arrowHeight * (v/u)), 0));
        } else {
            // Diverges after lens
            const divPt = new THREE.Vector3(5, -1.0 + arrowHeight - ((5 / f) * arrowHeight), 0);
            r1Pts.push(divPt);
            
            // Back extension line (dashed)
            const backGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, -1.0 + arrowHeight, 0),
                new THREE.Vector3(imgPos, -1.0 + (arrowHeight * mag), 0)
            ]);
            const backLine = new THREE.Line(backGeo, new THREE.LineBasicMaterial({ color: 0x06b6d4, dashSize: 0.1, gapSize: 0.1 }));
            rayGroup.add(backLine);
        }
        rayGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(r1Pts), ray1Mat));
        
        // 2. Center Ray
        const r2Pts = [
            new THREE.Vector3(objPos, -1.0 + arrowHeight, 0),
            new THREE.Vector3(0, 0, 0)
        ];
        if (!isVirtual) {
            r2Pts.push(new THREE.Vector3(imgPos, -1.0 - (arrowHeight * (v/u)), 0));
        } else {
            const divPt = new THREE.Vector3(5, (5 / -objPos) * (-1.0 + arrowHeight), 0);
            r2Pts.push(divPt);
            
            const backGeo = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(imgPos, -1.0 + (arrowHeight * mag), 0)
            ]);
            const backLine = new THREE.Line(backGeo, new THREE.LineBasicMaterial({ color: 0x8b5cf6 }));
            rayGroup.add(backLine);
        }
        rayGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(r2Pts), ray2Mat));
        
        group.add(rayGroup);
        
        group.userData = {
            animate: function(time, speedFactor) {
                // Static, updates handled via real-time slider updates
            },
            explode: function(progress) {
                lens.position.y = progress * 2.5;
                lens.scale.setScalar(1 - progress);
                objectArrow.position.x = objPos - progress * 2.5;
                screenGroup.position.x = progress * 2.5;
                rayGroup.scale.setScalar(1 - progress);
            }
        };
        
        return group;
    },

    // 5.D NEW OPTICS INSTRUMENT: MAGNIFYING GLASS
    createMagnifyingGlass: function(dbItem, settings) {
        const group = new THREE.Group();
        const lensHeight = settings.lensHeight || 2.0;
        const zoom = settings.glassPower || 2.8;
        
        // A. Brass frame and handle
        const frameGroup = new THREE.Group();
        frameGroup.position.y = lensHeight - 1.5;
        
        const rimMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 }); // Brass
        const rim = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.06, 16, 64), rimMat);
        rim.rotation.x = Math.PI / 2;
        frameGroup.add(rim);
        
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.2), rimMat);
        handle.position.set(0, 0, -1.6);
        handle.rotation.x = Math.PI / 2;
        frameGroup.add(handle);
        
        // B. Glass Lens
        const lensGeo = new THREE.SphereGeometry(1.0, 32, 32);
        lensGeo.scale(1.0, 0.1, 1.0);
        const lensMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.25,
            transmission: 0.9,
            ior: 1.5,
            roughness: 0.0
        });
        const lens = new THREE.Mesh(lensGeo, lensMat);
        lens.rotation.x = Math.PI / 2;
        frameGroup.add(lens);
        
        group.add(frameGroup);
        
        // C. Background Text Plane (representing day-to-day objects to inspect)
        const textCanvas = document.createElement("canvas");
        textCanvas.width = 512;
        textCanvas.height = 512;
        const textCtx = textCanvas.getContext("2d");
        textCtx.fillStyle = "#ffffff";
        textCtx.fillRect(0, 0, 512, 512);
        
        // Draw grid of text letters
        textCtx.fillStyle = "#000000";
        textCtx.font = "bold 20px monospace";
        for (let r = 0; r < 20; r++) {
            let str = "";
            for (let c = 0; c < 24; c++) {
                str += String.fromCharCode(65 + Math.floor(Math.random() * 26)) + " ";
            }
            textCtx.fillText(str, 15, 30 + r * 25);
        }
        
        const textTex = new THREE.CanvasTexture(textCanvas);
        const textPlaneGeo = new THREE.PlaneGeometry(3.5, 3.5);
        const textPlaneMat = new THREE.MeshBasicMaterial({ map: textTex, side: THREE.DoubleSide });
        const textPlane = new THREE.Mesh(textPlaneGeo, textPlaneMat);
        textPlane.rotation.x = -Math.PI / 2;
        textPlane.position.y = -1.5;
        group.add(textPlane);
        
        // D. Secondary Magnified plane overlay (representing the magnified virtual image)
        const magnifiedPlaneMat = new THREE.MeshBasicMaterial({
            map: textTex,
            side: THREE.DoubleSide
        });
        const magnifiedPlane = new THREE.Mesh(new THREE.CircleGeometry(0.96, 32), magnifiedPlaneMat);
        magnifiedPlane.rotation.x = -Math.PI / 2;
        // Positioned slightly above the lens to create visual alignment
        magnifiedPlane.position.y = lensHeight - 1.48; 
        
        // Compute text offset scaling to simulate magnification
        // We crop/scale texture coordinates
        textTex.wrapS = THREE.RepeatWrapping;
        textTex.wrapT = THREE.RepeatWrapping;
        
        const repeatVal = 1 / zoom;
        magnifiedPlane.material.map = textTex.clone();
        magnifiedPlane.material.map.repeat.set(repeatVal, repeatVal);
        magnifiedPlane.material.map.offset.set(0.5 - repeatVal/2, 0.5 - repeatVal/2);
        magnifiedPlane.material.map.needsUpdate = true;
        
        group.add(magnifiedPlane);
        
        group.userData = {
            animate: function(time, speedFactor) {
                // Move handle slightly on rotation
                frameGroup.position.x = Math.sin(time * 0.5) * 0.1;
                magnifiedPlane.position.x = frameGroup.position.x;
            },
            explode: function(progress) {
                frameGroup.position.y = lensHeight - 1.5 + progress * 2.0;
                textPlane.position.y = -1.5 - progress * 2.0;
                magnifiedPlane.scale.setScalar(1 - progress);
            }
        };
        
        return group;
    },

    // 6. GEOMETRIC & MATHEMATICAL OBJECTS
    createMathShape: function(dbItem, settings) {
        const group = new THREE.Group();
        const shape = dbItem.data.shape;
        
        const meshColor = 0x8b5cf6;
        const solidMat = new THREE.MeshStandardMaterial({
            color: meshColor,
            roughness: 0.3,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            wireframe: true,
            transparent: true,
            opacity: 0.5
        });
        
        let solidMesh, wireMesh;
        
        if (shape === 'tetrahedron' || shape === 'cube' || shape === 'octahedron' || shape === 'dodecahedron' || shape === 'icosahedron') {
            let geo;
            const size = 1.6;
            
            switch (shape) {
                case 'tetrahedron': geo = new THREE.TetrahedronGeometry(size); break;
                case 'cube':        geo = new THREE.BoxGeometry(size, size, size); break;
                case 'octahedron':  geo = new THREE.OctahedronGeometry(size); break;
                case 'dodecahedron':geo = new THREE.DodecahedronGeometry(size); break;
                case 'icosahedron': geo = new THREE.IcosahedronGeometry(size); break;
            }
            
            solidMesh = new THREE.Mesh(geo, solidMat);
            wireMesh = new THREE.Mesh(geo, wireMat);
            group.add(solidMesh);
            group.add(wireMesh);
            
            const tempPoints = [];
            const posAttr = geo.attributes.position;
            const tolerance = 0.01;
            
            for (let i = 0; i < posAttr.count; i++) {
                const v = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
                if (!this.containsPoint(tempPoints, v, tolerance)) {
                    tempPoints.push(v);
                }
            }
            
            const dotGeo = new THREE.SphereGeometry(0.06, 8, 8);
            const dotMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });
            const dotsGroup = new THREE.Group();
            tempPoints.forEach(pt => {
                const dot = new THREE.Mesh(dotGeo, dotMat);
                dot.position.copy(pt);
                dotsGroup.add(dot);
            });
            group.add(dotsGroup);
            
            group.userData = {
                animate: function(time, speedFactor) {
                    const rotSpeed = settings.rotationX || 0.5;
                    group.rotation.y = time * 0.15 * speedFactor;
                    group.rotation.x = time * 0.08 * rotSpeed * speedFactor;
                },
                explode: function(progress) {
                    solidMesh.scale.setScalar(1 - progress);
                    wireMesh.scale.setScalar(1 + progress * 1.5);
                    dotsGroup.children.forEach(dot => {
                        const dir = dot.position.clone().normalize();
                        dot.position.addScaledVector(dir, progress * 1.5);
                        dot.scale.setScalar(1 - progress);
                    });
                }
            };
            
        } else if (shape === 'mobius') {
            const width = settings.stripWidth || 1.0;
            const twists = settings.stripTwists || 1;
            
            const segmentsU = 120;
            const segmentsV = 20;
            const mobiusGeo = new THREE.BufferGeometry();
            
            const vertices = [];
            const indices = [];
            
            for (let i = 0; i <= segmentsU; i++) {
                const u = (i / segmentsU) * Math.PI * 2;
                for (let j = 0; j <= segmentsV; j++) {
                    const v = (j / segmentsV - 0.5) * width;
                    const twistFactor = (twists * u) / 2;
                    const x = (2 + v * Math.cos(twistFactor)) * Math.cos(u);
                    const y = (2 + v * Math.cos(twistFactor)) * Math.sin(u);
                    const z = v * Math.sin(twistFactor);
                    
                    vertices.push(x, y, z);
                }
            }
            
            for (let i = 0; i < segmentsU; i++) {
                for (let j = 0; j < segmentsV; j++) {
                    const a = i * (segmentsV + 1) + j;
                    const b = (i + 1) * (segmentsV + 1) + j;
                    const c = (i + 1) * (segmentsV + 1) + j + 1;
                    const d = i * (segmentsV + 1) + j + 1;
                    indices.push(a, b, d);
                    indices.push(b, c, d);
                }
            }
            
            mobiusGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            mobiusGeo.setIndex(indices);
            mobiusGeo.computeVertexNormals();
            
            solidMesh = new THREE.Mesh(mobiusGeo, solidMat);
            wireMesh = new THREE.Mesh(mobiusGeo, wireMat);
            group.add(solidMesh);
            group.add(wireMesh);
            
            const beetleGeo = new THREE.SphereGeometry(0.12, 16, 16);
            const beetleMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
            const beetle = new THREE.Mesh(beetleGeo, beetleMat);
            group.add(beetle);
            
            group.userData = {
                animate: function(time, speedFactor) {
                    group.rotation.z = time * 0.05 * speedFactor;
                    group.rotation.x = time * 0.03 * speedFactor;
                    
                    const u = (time * 0.25 * speedFactor) % (Math.PI * 4);
                    const twistFactor = (twists * u) / 2;
                    const bx = 2 * Math.cos(u);
                    const by = 2 * Math.sin(u);
                    const bz = 0;
                    
                    const nx = Math.cos(twistFactor) * Math.cos(u);
                    const ny = Math.cos(twistFactor) * Math.sin(u);
                    const nz = Math.sin(twistFactor);
                    
                    beetle.position.set(bx + nx * 0.15, by + ny * 0.15, bz + nz * 0.15);
                },
                explode: function(progress) {
                    solidMesh.scale.setScalar(1 - progress);
                    wireMesh.scale.setScalar(1 + progress * 2.0);
                    beetle.scale.setScalar(1 - progress);
                }
            };
            
        } else if (shape === 'tesseract') {
            const rotSpeed4D = settings.rotSpeed4D !== undefined ? settings.rotSpeed4D : 1.0;
            const cameraDist4D = settings.projectionFov || 2.0;
            
            const vertices4D = [];
            for (let x of [-1, 1]) {
                for (let y of [-1, 1]) {
                    for (let z of [-1, 1]) {
                        for (let w of [-1, 1]) {
                            vertices4D.push([x, y, z, w]);
                        }
                    }
                }
            }
            
            const edges4D = [];
            for (let i = 0; i < 16; i++) {
                for (let j = i + 1; j < 16; j++) {
                    let diffCount = 0;
                    for (let c = 0; c < 4; c++) {
                        if (vertices4D[i][c] !== vertices4D[j][c]) diffCount++;
                    }
                    if (diffCount === 1) edges4D.push([i, j]);
                }
            }
            
            const linesGroup = new THREE.Group();
            const cylinderGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.0, 6);
            const edgeCylinders = [];
            
            const edgeMat = new THREE.MeshStandardMaterial({
                color: 0x8b5cf6,
                roughness: 0.1,
                metalness: 0.8,
                emissive: 0x3b0764,
                emissiveIntensity: 0.5
            });
            
            edges4D.forEach(edge => {
                const mesh = new THREE.Mesh(cylinderGeo, edgeMat);
                linesGroup.add(mesh);
                edgeCylinders.push({ mesh: mesh, from: edge[0], to: edge[1] });
            });
            
            const nodeGroup = new THREE.Group();
            const nodeMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
            const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
            for (let i = 0; i < 16; i++) {
                const mesh = new THREE.Mesh(nodeGeo, nodeMat);
                nodeGroup.add(mesh);
            }
            
            group.add(linesGroup);
            group.add(nodeGroup);
            
            const project4D = (coords4D, angleW) => {
                const c = Math.cos(angleW);
                const s = Math.sin(angleW);
                let [x, y, z, w] = coords4D;
                let rx = x * c - w * s;
                let rw = x * s + w * c;
                let ry = y * c - rw * s;
                let rww = y * s + rw * c;
                const factor = 1.5 / (cameraDist4D - rww * 0.45);
                return new THREE.Vector3(rx * factor, ry * factor, z * factor);
            };
            
            group.userData = {
                animate: function(time, speedFactor) {
                    const angle4D = time * 0.4 * rotSpeed4D * speedFactor;
                    group.rotation.x = time * 0.05 * speedFactor;
                    group.rotation.y = time * 0.08 * speedFactor;
                    
                    const projected3D = [];
                    vertices4D.forEach((v4, idx) => {
                        const pt3D = project4D(v4, angle4D);
                        projected3D.push(pt3D);
                        nodeGroup.children[idx].position.copy(pt3D);
                    });
                    
                    edgeCylinders.forEach(cyl => {
                        const start = projected3D[cyl.from];
                        const end = projected3D[cyl.to];
                        const distance = start.distanceTo(end);
                        const pos = end.clone().add(start).multiplyScalar(0.5);
                        
                        cyl.mesh.position.copy(pos);
                        cyl.mesh.scale.set(1, distance, 1);
                        
                        const direction = new THREE.Vector3().subVectors(end, start).normalize();
                        const up = new THREE.Vector3(0, 1, 0);
                        cyl.mesh.quaternion.setFromUnitVectors(up, direction);
                    });
                },
                explode: function(progress) {
                    nodeGroup.scale.setScalar(1 - progress);
                    linesGroup.scale.setScalar(1 + progress * 2.0);
                    edgeMat.emissiveIntensity = 0.5 * (1 - progress);
                }
            };
        }
        
        return group;
    },

    // 7. SMART ABSTRACT FALLBACK GENERATOR
    createFallbackVisual: function(queryText, settings) {
        const group = new THREE.Group();
        const coreGeo = new THREE.SphereGeometry(1.0, 32, 32);
        const coreMat = new THREE.MeshPhysicalMaterial({
            color: 0x06b6d4,
            transparent: true,
            opacity: 0.25,
            roughness: 0.1,
            metalness: 0.9,
            clearcoat: 1.0
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        group.add(core);
        
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const innerWire = new THREE.Mesh(coreGeo, wireMat);
        innerWire.scale.setScalar(0.98);
        group.add(innerWire);
        
        const ringsGroup = new THREE.Group();
        const ringsCount = 3;
        const satelliteMeshes = [];
        
        for (let i = 0; i < ringsCount; i++) {
            const rad = 1.4 + i * 0.45;
            const ringGeo = new THREE.RingGeometry(rad - 0.015, rad + 0.015, 64);
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.1,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.random() * Math.PI;
            ring.rotation.y = Math.random() * Math.PI;
            ringsGroup.add(ring);
            
            const satGeo = new THREE.SphereGeometry(0.08, 16, 16);
            const satMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
            const satMesh = new THREE.Mesh(satGeo, satMat);
            const uVector = new THREE.Vector3(1, 0, 0).applyEuler(ring.rotation);
            const vVector = new THREE.Vector3(0, 0, 1).applyEuler(ring.rotation);
            
            satMesh.userData = {
                radius: rad,
                u: uVector,
                v: vVector,
                phase: Math.random() * Math.PI * 2,
                speed: 1.5 - i * 0.3
            };
            
            ringsGroup.add(satMesh);
            satelliteMeshes.push(satMesh);
        }
        group.add(ringsGroup);
        
        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.1 * speedFactor;
                group.rotation.x = Math.sin(time * 0.1) * 0.05 * speedFactor;
                innerWire.rotation.y = -time * 0.2 * speedFactor;
                
                satelliteMeshes.forEach(sat => {
                    const data = sat.userData;
                    const angle = time * data.speed * speedFactor + data.phase;
                    const pos = new THREE.Vector3()
                        .copy(data.u).multiplyScalar(Math.cos(angle) * data.radius)
                        .addScaledVector(data.v, Math.sin(angle) * data.radius);
                    sat.position.copy(pos);
                });
            },
            explode: function(progress) {
                core.scale.setScalar(1 + progress * 2.0);
                coreMat.opacity = 0.25 * (1 - progress);
                innerWire.scale.setScalar(0.98 * (1 - progress));
                ringsGroup.scale.setScalar(1 + progress * 2.5);
                ringsGroup.children.forEach(c => {
                    if (c.material) c.material.opacity *= (1 - progress);
                });
            }
        };
        
        return group;
    }
};

// Expose globally
window.EduGenerators = EduGenerators;
