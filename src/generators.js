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
            const showMoons = settings.showMoons !== undefined ? settings.showMoons : true;
            
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
            
            let moonGroup = null;
            let moonMesh = null;
            let moonOrbitLine = null;
            let orbitRingMat = null;
            
            if (showMoons) {
                moonGroup = new THREE.Group();
                group.add(moonGroup);
                
                const moonTex = this.createMoonTexture();
                const moonGeo = new THREE.SphereGeometry(0.35, 32, 32);
                const moonMat = new THREE.MeshStandardMaterial({
                    map: moonTex,
                    roughness: 0.8,
                    metalness: 0.0
                });
                moonMesh = new THREE.Mesh(moonGeo, moonMat);
                moonMesh.position.x = moonDist;
                moonGroup.add(moonMesh);
                
                const orbitRingGeo = new THREE.RingGeometry(moonDist - 0.01, moonDist + 0.01, 128);
                orbitRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.06, side: THREE.DoubleSide });
                moonOrbitLine = new THREE.Mesh(orbitRingGeo, orbitRingMat);
                moonOrbitLine.rotation.x = Math.PI / 2;
                moonGroup.add(moonOrbitLine);
            }
            
            group.userData = {
                animate: function(time, speedFactor) {
                    const moonSpeed = settings.moonSpeed || 1.0;
                    earthMesh.rotation.y = time * 0.25 * speedFactor;
                    cloudMesh.rotation.y = time * 0.3 * speedFactor;
                    
                    if (showMoons && moonGroup && moonMesh && moonOrbitLine) {
                        moonGroup.rotation.y = time * 0.05 * moonSpeed * speedFactor;
                        moonMesh.rotation.y = time * 0.05 * speedFactor;
                    }
                },
                explode: function(progress) {
                    earthMesh.scale.setScalar(1 + progress * 1.5);
                    cloudMesh.scale.setScalar(1 + progress * 2.2);
                    cloudMat.opacity = 0.6 * (1 - progress);
                    if (showMoons && moonMesh && moonOrbitLine && orbitRingMat) {
                        moonMesh.position.x = moonDist + progress * 6.0;
                        moonMesh.scale.setScalar(1 - progress);
                        moonOrbitLine.scale.setScalar(1 + progress);
                        orbitRingMat.opacity = 0.06 * (1 - progress);
                    }
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

    // ─── HIGH-FIDELITY LABORATORY INSTRUMENTS ───────────────────────────────

    createMeterScale: function(dbItem, settings) {
        const group = new THREE.Group();
        const scaleLength = settings.scaleLength !== undefined ? settings.scaleLength : 1.0; // meters (0.5 to 2.0)
        
        // Scale conversion: 1 meter = 6.0 Three.js units
        const L_units = scaleLength * 6.0;
        
        // Materials
        const woodMat = new THREE.MeshStandardMaterial({
            color: 0xe3a857, // wooden pine yellow
            roughness: 0.7,
            metalness: 0.1
        });
        const brassMat = new THREE.MeshStandardMaterial({
            color: 0xd97706,
            metalness: 0.8,
            roughness: 0.2
        });

        // 1. Wood beam
        const beamGeo = new THREE.BoxGeometry(L_units, 0.05, 0.4);
        
        // Build tick canvas
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(scaleLength * 1000);
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        
        // Wood base color on texture
        ctx.fillStyle = "#facc15";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw wood grain details
        ctx.strokeStyle = "rgba(161, 98, 7, 0.15)";
        ctx.lineWidth = 1;
        for (let i = 0; i < 15; i++) {
            ctx.beginPath();
            ctx.moveTo(0, Math.random() * 64);
            ctx.lineTo(canvas.width, Math.random() * 64);
            ctx.stroke();
        }
        
        // Draw division lines (mm and cm)
        ctx.strokeStyle = "#1e293b";
        ctx.fillStyle = "#1e293b";
        ctx.textAlign = "center";
        
        const totalCm = Math.round(scaleLength * 100);
        const pxPerCm = canvas.width / totalCm;
        
        for (let cm = 0; cm <= totalCm; cm++) {
            const cx = cm * pxPerCm;
            
            // Draw cm ticks
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, 0);
            ctx.lineTo(cx, 28);
            ctx.stroke();
            
            // Labels every cm
            if (cm % 5 === 0) {
                ctx.font = "bold 16px sans-serif";
                ctx.fillText(String(cm), cx, 48);
            }
            
            // Draw mm ticks
            if (cm < totalCm) {
                ctx.lineWidth = 1;
                for (let mm = 1; mm < 10; mm++) {
                    const mx = cx + (mm * (pxPerCm / 10));
                    const tickH = mm === 5 ? 18 : 10;
                    ctx.beginPath();
                    ctx.moveTo(mx, 0);
                    ctx.lineTo(mx, tickH);
                    ctx.stroke();
                }
            }
        }
        
        const tickTex = new THREE.CanvasTexture(canvas);
        const scaleMat = new THREE.MeshStandardMaterial({
            map: tickTex,
            roughness: 0.6
        });
        
        const beamMats = [woodMat, woodMat, scaleMat, woodMat, woodMat, woodMat];
        const beam = new THREE.Mesh(beamGeo, beamMats);
        group.add(beam);
        
        // 2. Brass end caps
        const capGeo = new THREE.BoxGeometry(0.04, 0.06, 0.42);
        const leftCap = new THREE.Mesh(capGeo, brassMat);
        leftCap.position.set(-L_units/2, 0, 0);
        const rightCap = new THREE.Mesh(capGeo, brassMat);
        rightCap.position.set(L_units/2, 0, 0);
        
        group.add(leftCap);
        group.add(rightCap);
        
        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.x = Math.sin(time * 0.2) * 0.05;
            },
            explode: function(progress) {
                beam.position.y = progress * 1.5;
                leftCap.position.x = -L_units/2 - progress * 1.0;
                rightCap.position.x = L_units/2 + progress * 1.0;
            }
        };
        
        return group;
    },

    createSpringBalance: function(dbItem, settings) {
        const group = new THREE.Group();
        const force = settings.springForce !== undefined ? settings.springForce : 5.0; // 0 to 10 N
        
        // Materials
        const metalMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.1 });
        const casingMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.4, roughness: 0.5, transparent: true, opacity: 0.85 });
        const springMat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.8, roughness: 0.2 });
        const weightMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.3 });
        
        // 1. Casing (cylindrical frame with slot)
        const casingGeo = new THREE.CylinderGeometry(0.35, 0.35, 4.0, 32);
        const casing = new THREE.Mesh(casingGeo, casingMat);
        group.add(casing);
        
        // Top ring hook
        const topRing = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.04, 16, 32), metalMat);
        topRing.position.y = 2.1;
        topRing.rotation.y = Math.PI / 2;
        group.add(topRing);
        
        // 2. Scale backplate inside
        const backplate = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 3.4), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        backplate.position.set(0, 0, 0.2);
        
        const scaleCanvas = document.createElement("canvas");
        scaleCanvas.width = 128; scaleCanvas.height = 512;
        const sCtx = scaleCanvas.getContext("2d");
        sCtx.fillStyle = "#ffffff";
        sCtx.fillRect(0, 0, 128, 512);
        sCtx.fillStyle = "#000000";
        sCtx.textAlign = "center";
        
        // Draw balance divisions (0 to 10 N)
        sCtx.strokeStyle = "#000000";
        sCtx.font = "bold 20px monospace";
        for (let i = 0; i <= 10; i++) {
            const y = 30 + i * 45;
            sCtx.lineWidth = 3;
            sCtx.beginPath(); sCtx.moveTo(10, y); sCtx.lineTo(35, y); sCtx.stroke();
            sCtx.beginPath(); sCtx.moveTo(118, y); sCtx.lineTo(93, y); sCtx.stroke();
            
            sCtx.fillText(`${i} N`, 64, y + 6);
            
            if (i < 10) {
                sCtx.lineWidth = 1;
                for (let j = 1; j < 10; j++) {
                    const sy = y + j * 4.5;
                    const len = j === 5 ? 18 : 10;
                    sCtx.beginPath(); sCtx.moveTo(10, sy); sCtx.lineTo(10 + len, sy); sCtx.stroke();
                }
            }
        }
        
        const scaleTex = new THREE.CanvasTexture(scaleCanvas);
        backplate.material.map = scaleTex;
        backplate.material.needsUpdate = true;
        group.add(backplate);
        
        // 3. Helix Spring (Stretchable spline tube)
        // Spring stretches based on force
        const stretchFactor = 1.0 + force * 0.12; // stretches up to 2.2x length
        const baseSpringLength = 1.5;
        const extendedSpringLength = baseSpringLength * stretchFactor;
        
        const points = [];
        const turns = 18;
        for (let i = 0; i <= 200; i++) {
            const pct = i / 200;
            const theta = pct * turns * Math.PI * 2;
            const sx = 0.16 * Math.cos(theta);
            const sz = 0.16 * Math.sin(theta);
            // Extends downwards from y = 1.6
            const sy = 1.6 - pct * extendedSpringLength;
            points.push(new THREE.Vector3(sx, sy, sz));
        }
        
        const springCurve = new THREE.CatmullRomCurve3(points);
        const springGeo = new THREE.TubeGeometry(springCurve, 128, 0.022, 8, false);
        const springMesh = new THREE.Mesh(springGeo, springMat);
        group.add(springMesh);
        
        // 4. Moving pointer and rod assembly
        const rodGroup = new THREE.Group();
        // The rod starts below the spring
        const rodY = 1.6 - extendedSpringLength;
        rodGroup.position.y = rodY;
        
        // Red pointer tab
        const pointer = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 16), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        pointer.position.set(0, 0, 0.22);
        rodGroup.add(pointer);
        
        // Pull rod extending out bottom
        const pullRod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 16), metalMat);
        pullRod.position.y = -0.6;
        rodGroup.add(pullRod);
        
        // Bottom hook
        const bottomHook = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.03, 16, 32, Math.PI * 1.5), metalMat);
        bottomHook.position.y = -1.2;
        bottomHook.rotation.z = Math.PI / 2;
        rodGroup.add(bottomHook);
        
        // Suspended Weight (representing the load)
        const loadWeight = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.8, 20), weightMat);
        loadWeight.position.y = -1.7;
        
        // Hook loop for weight
        const weightLoop = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 16, 32), metalMat);
        weightLoop.position.y = -1.25;
        loadWeight.add(weightLoop);
        
        rodGroup.add(loadWeight);
        group.add(rodGroup);
        
        group.userData = {
            animate: function(time, speedFactor) {
                // Bob slightly to show spring physics
                const bounce = Math.sin(time * 3.0) * 0.03 * (force / 10.0);
                rodGroup.position.y = rodY + bounce;
            },
            explode: function(progress) {
                casing.position.x = -progress * 1.5;
                backplate.position.x = progress * 1.5;
                rodGroup.position.y = rodY - progress * 1.5;
            }
        };
        
        return group;
    },

    createStopwatch: function(dbItem, settings) {
        const group = new THREE.Group();
        const timeVal = settings.timeInterval !== undefined ? settings.timeInterval : 15.0; // 0 to 60 s
        
        // Materials
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.98, roughness: 0.05 });
        const darkMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
        const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.1 });
        const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, roughness: 0.1, transmission: 0.9 });
        const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
        
        // 1. Metal circular body
        const bodyGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.45, 48);
        const body = new THREE.Mesh(bodyGeo, chromeMat);
        body.rotation.x = Math.PI / 2; // face forward
        group.add(body);
        
        // 2. Pusher buttons at top
        const buttonStem = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.3, 16), chromeMat);
        buttonStem.position.set(0, 1.7, 0);
        group.add(buttonStem);
        const buttonCap = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.1, 16), brassMat);
        buttonCap.position.set(0, 1.85, 0);
        group.add(buttonCap);
        
        const resetStem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.25, 16), chromeMat);
        resetStem.position.set(1.2, 1.2, 0);
        resetStem.rotation.z = -Math.PI / 4;
        group.add(resetStem);
        const resetCap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16), chromeMat);
        resetCap.position.set(1.3, 1.3, 0);
        resetCap.rotation.z = -Math.PI / 4;
        group.add(resetCap);
        
        // 3. Dial Face
        const faceCanvas = document.createElement("canvas");
        faceCanvas.width = 512; faceCanvas.height = 512;
        const fCtx = faceCanvas.getContext("2d");
        fCtx.fillStyle = "#ffffff";
        fCtx.fillRect(0, 0, 512, 512);
        
        // Circular border
        fCtx.strokeStyle = "#1e293b";
        fCtx.lineWidth = 8;
        fCtx.beginPath(); fCtx.arc(256, 256, 240, 0, Math.PI * 2); fCtx.stroke();
        
        // Ticks 0-60
        fCtx.fillStyle = "#0f172a";
        fCtx.textAlign = "center";
        fCtx.textBaseline = "middle";
        
        for (let s = 0; s < 60; s++) {
            const angle = (s / 60) * Math.PI * 2 - Math.PI / 2;
            const isMajor = s % 5 === 0;
            const tickLen = isMajor ? 24 : 12;
            
            fCtx.lineWidth = isMajor ? 4 : 2;
            fCtx.strokeStyle = isMajor ? "#0f172a" : "#475569";
            
            const x1 = 256 + Math.cos(angle) * 236;
            const y1 = 256 + Math.sin(angle) * 236;
            const x2 = 256 + Math.cos(angle) * (236 - tickLen);
            const y2 = 256 + Math.sin(angle) * (236 - tickLen);
            
            fCtx.beginPath(); fCtx.moveTo(x1, y1); fCtx.lineTo(x2, y2); fCtx.stroke();
            
            if (isMajor) {
                fCtx.font = "bold 26px sans-serif";
                const num = s === 0 ? 60 : s;
                const lx = 256 + Math.cos(angle) * 196;
                const ly = 256 + Math.sin(angle) * 196;
                fCtx.fillText(String(num), lx, ly);
            }
        }
        
        // Draw sub-dial (minutes 0-30)
        fCtx.strokeStyle = "#000000";
        fCtx.lineWidth = 2;
        fCtx.beginPath(); fCtx.arc(256, 150, 48, 0, Math.PI * 2); fCtx.stroke();
        for (let m = 0; m < 30; m += 5) {
            const angle = (m / 30) * Math.PI * 2 - Math.PI / 2;
            fCtx.font = "14px monospace";
            fCtx.fillText(String(m), 256 + Math.cos(angle) * 36, 150 + Math.sin(angle) * 36);
        }
        
        const faceTex = new THREE.CanvasTexture(faceCanvas);
        const dialPlate = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 3.0), new THREE.MeshBasicMaterial({ map: faceTex }));
        dialPlate.position.z = 0.235;
        group.add(dialPlate);
        
        // 4. Glass cover
        const glass = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.04, 32), glassMat);
        glass.rotation.x = Math.PI / 2;
        glass.position.z = 0.26;
        group.add(glass);
        
        // 5. Needle pivot pin
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16), chromeMat);
        pin.rotation.x = Math.PI / 2;
        pin.position.z = 0.25;
        group.add(pin);
        
        // 6. Seconds Needle
        const needle = new THREE.Group();
        needle.position.set(0, 0, 0.25);
        const pointerBlade = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.25, 0.02), redMat);
        pointerBlade.position.y = 0.5; // pivot at base
        needle.add(pointerBlade);
        
        const tailMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.02, 16), darkMat);
        tailMesh.rotation.x = Math.PI / 2;
        needle.add(tailMesh);
        group.add(needle);
        
        // 7. Sub-dial Needle (minutes)
        const subNeedle = new THREE.Group();
        subNeedle.position.set(0, 0.585, 0.245); // centered on sub-dial (y = 150/256 * 1.5 - 0.75 ? wait, y = 256-150 = 106 px up => 106/256 * 1.5 = 0.62)
        const subBlade = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.25, 0.01), darkMat);
        subBlade.position.y = 0.1;
        subNeedle.add(subBlade);
        group.add(subNeedle);
        
        // Map settings value to angles
        const secAngle = -(timeVal / 60) * Math.PI * 2;
        needle.rotation.z = secAngle;
        
        const minVal = timeVal / 60;
        const minAngle = -(minVal / 30) * Math.PI * 2;
        subNeedle.rotation.z = minAngle;
        
        group.userData = {
            animate: function(time, speedFactor) {
                // Subtle shadow angle
                buttonCap.position.y = 1.85 + Math.sin(time * 5.0) * 0.01;
            },
            explode: function(progress) {
                body.position.z = -progress * 1.5;
                dialPlate.position.z = 0.235 + progress * 1.0;
                glass.position.z = 0.26 + progress * 2.0;
                needle.position.z = 0.25 + progress * 1.5;
            }
        };
        
        return group;
    },

    createAmmeter: function(dbItem, settings) {
        return this._synthPanelMeter(dbItem, settings, "ammeter");
    },

    createVoltmeter: function(dbItem, settings) {
        return this._synthPanelMeter(dbItem, settings, "voltmeter");
    },

    createGalvanometer: function(dbItem, settings) {
        return this._synthPanelMeter(dbItem, settings, "galvanometer");
    },

    _synthPanelMeter: function(dbItem, settings, mode) {
        const group = new THREE.Group();
        
        // Materials
        let caseColor = 0x0f172a; // dark slate ammeter
        if (mode === "voltmeter") caseColor = 0x1e3a8a; // dark blue voltmeter
        if (mode === "galvanometer") caseColor = 0x064e3b; // dark green galvanometer
        
        const caseMat = new THREE.MeshStandardMaterial({ color: caseColor, roughness: 0.4 });
        const plasticMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.1, roughness: 0.5 });
        const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.2, roughness: 0.1, transmission: 0.8 });
        const needleMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
        const terminalRed = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.1 });
        const terminalBlack = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });

        // 1. Slanted Panel Meter Enclosure
        // Back base
        const bodyGeo = new THREE.BoxGeometry(3.2, 3.2, 1.2);
        const body = new THREE.Mesh(bodyGeo, caseMat);
        group.add(body);
        
        // Slanted front panel insert
        const frontGeo = new THREE.BoxGeometry(2.9, 2.3, 0.15);
        const frontPanel = new THREE.Mesh(frontGeo, plasticMat);
        frontPanel.position.set(0, 0.2, 0.6);
        frontPanel.rotation.x = -Math.PI / 12; // tilt slightly back
        group.add(frontPanel);
        
        // 2. Dial Texture (Canvas)
        const dialCanvas = document.createElement("canvas");
        dialCanvas.width = 512; dialCanvas.height = 384;
        const dCtx = dialCanvas.getContext("2d");
        dCtx.fillStyle = "#f8fafc";
        dCtx.fillRect(0, 0, 512, 384);
        
        // Draw scale arc
        dCtx.strokeStyle = "#0f172a";
        dCtx.lineWidth = 5;
        dCtx.beginPath();
        // Arc center at x=256, y=340
        dCtx.arc(256, 340, 240, -Math.PI * 0.8, -Math.PI * 0.2);
        dCtx.stroke();
        
        // Draw ticks and labels
        dCtx.fillStyle = "#0f172a";
        dCtx.textAlign = "center";
        dCtx.font = "bold 28px sans-serif";
        
        let minVal = 0, maxVal = 5, step = 1, suffix = "A";
        let logoText = "A";
        let titleText = "AMMETER";
        
        if (mode === "voltmeter") {
            minVal = 0; maxVal = 12; step = 2; suffix = "V";
            logoText = "V";
            titleText = "VOLTMETER";
        } else if (mode === "galvanometer") {
            minVal = -30; maxVal = 30; step = 10; suffix = "";
            logoText = "G";
            titleText = "GALVANOMETER";
        }
        
        // Center zero or left zero
        const angleStart = -Math.PI * 0.78;
        const angleEnd = -Math.PI * 0.22;
        const angleRange = angleEnd - angleStart;
        
        const totalMarks = maxVal - minVal;
        const markStep = (maxVal - minVal) / 10; // 10 main steps
        
        for (let v = minVal; v <= maxVal; v += markStep) {
            const pct = (v - minVal) / totalMarks;
            const angle = angleStart + pct * angleRange;
            
            const isLabel = Math.abs(v % step) < 0.001 || mode === "ammeter";
            const tickLen = isLabel ? 26 : 14;
            
            dCtx.lineWidth = isLabel ? 3 : 1;
            dCtx.strokeStyle = "#1e293b";
            
            const x1 = 256 + Math.cos(angle) * 240;
            const y1 = 340 + Math.sin(angle) * 240;
            const x2 = 256 + Math.cos(angle) * (240 - tickLen);
            const y2 = 340 + Math.sin(angle) * (240 - tickLen);
            
            dCtx.beginPath(); dCtx.moveTo(x1, y1); dCtx.lineTo(x2, y2); dCtx.stroke();
            
            if (isLabel) {
                dCtx.font = "bold 22px sans-serif";
                const lx = 256 + Math.cos(angle) * 200;
                const ly = 340 + Math.sin(angle) * 200;
                dCtx.fillText(String(Math.round(v)), lx, ly);
            }
        }
        
        // Draw instrument big letters
        dCtx.font = "bold 64px serif";
        dCtx.fillStyle = mode === "ammeter" ? "#ef4444" : (mode === "voltmeter" ? "#2563eb" : "#059669");
        dCtx.fillText(logoText, 256, 200);
        
        dCtx.font = "14px monospace";
        dCtx.fillStyle = "#64748b";
        dCtx.fillText(titleText, 256, 260);
        dCtx.fillText("Class 1.5  MC-Movement", 256, 290);
        
        const dialTex = new THREE.CanvasTexture(dialCanvas);
        const dialFace = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2.0), new THREE.MeshBasicMaterial({ map: dialTex }));
        dialFace.position.set(0, 0.25, 0.69);
        dialFace.rotation.x = -Math.PI / 12;
        group.add(dialFace);
        
        // Glass face on top of panel
        const glassGeo = new THREE.PlaneGeometry(2.7, 2.1);
        const glass = new THREE.Mesh(glassGeo, glassMat);
        glass.position.set(0, 0.25, 0.72);
        glass.rotation.x = -Math.PI / 12;
        group.add(glass);
        
        // 3. Pointer Needle Assembly
        const needleGroup = new THREE.Group();
        needleGroup.position.set(0, 0.25 - 0.7, 0.69 - 0.7 * Math.sin(Math.PI/12)); // place pivot at base of dial face
        needleGroup.rotation.x = -Math.PI / 12;
        
        // Thin red needle
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.03, 1.25, 0.01), needleMat);
        blade.position.y = 0.6; // pivot offset
        needleGroup.add(blade);
        
        // Pivot cover
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 16), terminalBlack);
        cap.rotation.x = Math.PI / 2;
        needleGroup.add(cap);
        group.add(needleGroup);
        
        // 4. Screw Terminals at bottom
        const t1 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.3, 16), terminalRed);
        t1.position.set(-1.0, -1.2, 0.45);
        t1.rotation.x = Math.PI / 2;
        group.add(t1);
        
        const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.3, 16), terminalBlack);
        t2.position.set(1.0, -1.2, 0.45);
        t2.rotation.x = Math.PI / 2;
        group.add(t2);
        
        // Apply Needle rotation based on value
        let val = 0;
        if (mode === "ammeter") {
            val = settings.current !== undefined ? settings.current : 0;
        } else if (mode === "voltmeter") {
            val = settings.voltage !== undefined ? settings.voltage : 0;
        } else if (mode === "galvanometer") {
            val = settings.deflection !== undefined ? settings.deflection : 0;
        }
        
        // Map val to angle
        const pct = (val - minVal) / totalMarks;
        const targetRot = Math.PI/2 - (angleStart + pct * angleRange); // zero center relative rotation
        needleGroup.rotation.z = -targetRot + Math.PI/2; // convert to standard rotation
        
        group.userData = {
            animate: function(time, speedFactor) {
                // Gentle thermal sway
                needleGroup.rotation.z += Math.sin(time * 8.0) * 0.002 * (val > 0 ? 1 : 0.2);
            },
            explode: function(progress) {
                body.position.z = -progress * 1.5;
                frontPanel.position.z = 0.6 - progress * 1.0;
                dialFace.position.z = 0.69 + progress * 1.0;
                glass.position.z = 0.72 + progress * 2.0;
                needleGroup.position.z = needleGroup.position.z + progress * 1.5;
            }
        };
        
        return group;
    },

    createMultimeter: function(dbItem, settings) {
        const group = new THREE.Group();
        const mode = settings.modeLevel !== undefined ? settings.modeLevel : 1; // 1=V, 2=A, 3=Ohm
        const strength = settings.measureValue !== undefined ? settings.measureValue : 45; // 0 to 100%
        
        // Materials
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffaa00, roughness: 0.3 }); // Yellow shell
        const panelMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 }); // grey faceplate
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.9, roughness: 0.1 });
        const plasticMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
        const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
        
        // 1. Chassis
        const box = new THREE.Mesh(new THREE.BoxGeometry(2.3, 3.8, 0.8), bodyMat);
        group.add(box);
        
        const face = new THREE.Mesh(new THREE.BoxGeometry(2.1, 3.6, 0.05), panelMat);
        face.position.z = 0.4;
        group.add(face);
        
        // 2. LCD Display (canvas texture)
        const lcdCanvas = document.createElement("canvas");
        lcdCanvas.width = 256; lcdCanvas.height = 128;
        const lCtx = lcdCanvas.getContext("2d");
        lCtx.fillStyle = "#475569";
        lCtx.fillRect(0, 0, 256, 128);
        lCtx.fillStyle = "#86efac"; // retro LCD background green-yellow
        lCtx.fillRect(10, 10, 236, 108);
        
        lCtx.fillStyle = "#166534";
        lCtx.font = "20px monospace";
        lCtx.textAlign = "left";
        
        let label = "DCV";
        let unitStr = "V";
        let displayVal = strength * 0.12;
        if (mode === 2) {
            label = "DCA";
            unitStr = "A";
            displayVal = strength * 0.05;
        } else if (mode === 3) {
            label = "RES";
            unitStr = "kΩ";
            displayVal = strength * 0.2;
        }
        
        lCtx.fillText(label, 18, 38);
        lCtx.font = "bold 52px monospace";
        lCtx.textAlign = "right";
        lCtx.fillText(displayVal.toFixed(2), 200, 95);
        lCtx.font = "bold 24px monospace";
        lCtx.fillText(unitStr, 230, 92);
        
        const lcdTex = new THREE.CanvasTexture(lcdCanvas);
        const lcdMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.85), new THREE.MeshBasicMaterial({ map: lcdTex }));
        lcdMesh.position.set(0, 1.1, 0.44);
        group.add(lcdMesh);
        
        // 3. Central Rotary Selection Switch
        const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.15, 24), plasticMat);
        dial.rotation.x = Math.PI / 2;
        dial.position.set(0, -0.1, 0.46);
        
        // Pointer line on knob
        const dialPointer = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.05), redMat);
        dialPointer.position.set(0, 0.2, 0.08);
        dial.add(dialPointer);
        group.add(dial);
        
        // Rotate knob based on mode
        let dialRot = -Math.PI / 4; // mode 1
        if (mode === 2) dialRot = 0; // mode 2
        if (mode === 3) dialRot = Math.PI / 4; // mode 3
        dial.rotation.z = dialRot;
        
        // 4. Input Jacks (metallic holes at bottom)
        for (let i = -1; i <= 1; i++) {
            const jack = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.1, 16), chromeMat);
            jack.rotation.x = Math.PI / 2;
            jack.position.set(i * 0.5, -1.3, 0.44);
            group.add(jack);
        }
        
        // Wires / probes extending out
        // Black probe wire
        const blackWireCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-0.5, -1.3, 0.45),
            new THREE.Vector3(-0.8, -1.8, 0.8),
            new THREE.Vector3(-0.6, -2.4, 0.4),
            new THREE.Vector3(-0.3, -2.8, 0)
        ]);
        const blackWireGeo = new THREE.TubeGeometry(blackWireCurve, 32, 0.03, 8, false);
        const blackWire = new THREE.Mesh(blackWireGeo, plasticMat);
        group.add(blackWire);
        
        // Red probe wire
        const redWireCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.5, -1.3, 0.45),
            new THREE.Vector3(0.9, -1.7, 0.8),
            new THREE.Vector3(1.1, -2.2, 0.5),
            new THREE.Vector3(0.8, -2.8, 0)
        ]);
        const redWireGeo = new THREE.TubeGeometry(redWireCurve, 32, 0.03, 8, false);
        const redWire = new THREE.Mesh(redWireGeo, redMat);
        group.add(redWire);
        
        // Probes handles
        const blackProbe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 16), plasticMat);
        blackProbe.position.set(-0.3, -3.2, 0);
        blackProbe.rotation.x = Math.PI / 3;
        const blackTip = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2, 16), chromeMat);
        blackTip.position.y = -0.5;
        blackProbe.add(blackTip);
        group.add(blackProbe);
        
        const redProbe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.8, 16), redMat);
        redProbe.position.set(0.8, -3.2, 0);
        redProbe.rotation.x = Math.PI / 3.4;
        const redTip = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.2, 16), chromeMat);
        redTip.position.y = -0.5;
        redProbe.add(redTip);
        group.add(redProbe);
        
        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = Math.sin(time * 0.3) * 0.06;
            },
            explode: function(progress) {
                box.position.z = -progress * 1.5;
                face.position.z = 0.4 + progress * 1.0;
                lcdMesh.position.z = 1.1 + progress * 2.0;
                dial.position.z = 0.46 + progress * 1.5;
                blackProbe.position.y -= progress * 1.5;
                redProbe.position.y -= progress * 1.5;
            }
        };
        
        return group;
    },

    createMicroscope: function(dbItem, settings) {
        const group = new THREE.Group();
        const focusVal = settings.zoom !== undefined ? settings.zoom : 2.2; // focus vertical shift
        
        // Materials
        const darkIron = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6, metalness: 0.6 });
        const brass = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.8, roughness: 0.15 });
        const silver = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.95, roughness: 0.05 });
        const stageMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
        const mirrorMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.01, metalness: 1.0 });
        
        // Base horseshoe
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.25, 2.0), darkIron);
        base.position.y = -2.25;
        group.add(base);
        
        // Vertical curved stand limb
        const limbGeo = new THREE.BoxGeometry(0.3, 2.8, 0.5);
        const limb = new THREE.Mesh(limbGeo, darkIron);
        limb.position.set(0, -0.8, -0.85);
        group.add(limb);
        
        // Stage Plate
        const stage = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 1.5), stageMat);
        stage.position.set(0, -0.9, 0);
        group.add(stage);
        
        // Metal slide clips
        const clipGeo = new THREE.BoxGeometry(0.08, 0.01, 0.5);
        const clip1 = new THREE.Mesh(clipGeo, silver);
        clip1.position.set(-0.5, -0.85, 0.2);
        clip1.rotation.y = Math.PI / 8;
        const clip2 = new THREE.Mesh(clipGeo, silver);
        clip2.position.set(0.5, -0.85, 0.2);
        clip2.rotation.y = -Math.PI / 8;
        stage.add(clip1);
        stage.add(clip2);
        
        // Glass slide sample
        const slide = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.02, 1.0), new THREE.MeshPhysicalMaterial({ color: 0x86efac, transparent: true, opacity: 0.6, transmission: 0.9 }));
        slide.position.set(0, -0.855, 0);
        slide.rotation.y = Math.PI / 2;
        group.add(slide);
        
        // Sub-stage mirror (concave mirror)
        const mirrorHolder = new THREE.Group();
        mirrorHolder.position.set(0, -1.7, -0.4);
        const mirrorRing = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 20), brass);
        mirrorRing.rotation.x = Math.PI / 2;
        mirrorHolder.add(mirrorRing);
        const mirrorFace = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.01, 20), mirrorMat);
        mirrorFace.position.y = 0.04;
        mirrorFace.rotation.x = Math.PI / 2;
        mirrorHolder.add(mirrorFace);
        mirrorHolder.rotation.x = Math.PI / 6; // reflect upwards
        group.add(mirrorHolder);
        
        // Sliding Body Tube assembly (moves up and down based on focus slider)
        const bodyTubeGroup = new THREE.Group();
        const focusY = 0.5 + focusVal * 0.1; // shifts vertical tube up/down
        bodyTubeGroup.position.set(0, focusY, -0.3);
        
        // Main drawtube
        const drawTube = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 1.8, 24), darkIron);
        bodyTubeGroup.add(drawTube);
        
        // Eyepiece lens collar
        const eyepieceCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.25, 24), brass);
        eyepieceCollar.position.y = 0.9;
        bodyTubeGroup.add(eyepieceCollar);
        
        const eyepieceLens = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.1, 24), stageMat);
        eyepieceLens.position.y = 1.0;
        bodyTubeGroup.add(eyepieceLens);
        
        // Revolving Nosepiece
        const nosepiece = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.3, 24), brass);
        nosepiece.position.y = -0.9;
        bodyTubeGroup.add(nosepiece);
        
        // Objective lens barrels (3 brass cylinders protruding)
        for (let i = 0; i < 3; i++) {
            const rot = (i * Math.PI * 2) / 3;
            const objGroup = new THREE.Group();
            objGroup.rotation.y = rot;
            
            const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.45, 12), brass);
            barrel.position.set(0.18, -1.05, 0);
            barrel.rotation.x = 0.15; // angled slightly out
            objGroup.add(barrel);
            
            bodyTubeGroup.add(objGroup);
        }
        
        group.add(bodyTubeGroup);
        
        // 4. Focus adjustment knobs on limb
        const knobAxle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 16), silver);
        knobAxle.position.set(0, 0.8, -0.65);
        knobAxle.rotation.z = Math.PI / 2;
        group.add(knobAxle);
        
        const leftKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.12, 24), brass);
        leftKnob.position.set(-0.6, 0.8, -0.65);
        leftKnob.rotation.z = Math.PI / 2;
        const rightKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.12, 24), brass);
        rightKnob.position.set(0.6, 0.8, -0.65);
        rightKnob.rotation.z = Math.PI / 2;
        group.add(leftKnob);
        group.add(rightKnob);
        
        group.userData = {
            animate: function(time, speedFactor) {
                // Rotate knobs slightly on time
                leftKnob.rotation.x = time * 0.4 * speedFactor;
                rightKnob.rotation.x = time * 0.4 * speedFactor;
                mirrorHolder.rotation.y = Math.sin(time * 0.2) * 0.1;
            },
            explode: function(progress) {
                base.position.y = -2.25 - progress * 1.5;
                limb.position.z = -0.85 - progress * 1.0;
                stage.position.y = -0.9 - progress * 1.0;
                bodyTubeGroup.position.y = focusY + progress * 2.0;
            }
        };
        
        return group;
    },

    createTelescope: function(dbItem, settings) {
        const group = new THREE.Group();
        const focusVal = settings.focus !== undefined ? settings.focus : 1.5; // 0.5 to 2.5
        
        // Materials
        const brass = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.12 });
        const darkChrome = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7, roughness: 0.3 });
        const silver = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.05 });
        const woodMat = new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.6 });
        const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xa5f3fc, transparent: true, opacity: 0.4, transmission: 0.9 });
        
        // 1. Tripod stand
        const tripod = new THREE.Group();
        tripod.position.y = -2.0;
        
        const mountBase = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.4, 20), silver);
        tripod.add(mountBase);
        
        // Three wooden legs spread out
        for (let i = 0; i < 3; i++) {
            const rot = (i * Math.PI * 2) / 3;
            const legGroup = new THREE.Group();
            legGroup.rotation.y = rot;
            
            const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 2.5, 0.1), woodMat);
            leg.position.set(0.6, -1.0, 0);
            leg.rotation.z = 0.28; // spread outwards
            legGroup.add(leg);
            
            // Brass brace cuffs
            const cuff = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.15, 0.12), brass);
            cuff.position.set(0.6, -1.0, 0);
            cuff.rotation.z = 0.28;
            legGroup.add(cuff);
            
            tripod.add(legGroup);
        }
        group.add(tripod);
        
        // 2. Alt-Azimuth Mount Head
        const yoke = new THREE.Group();
        yoke.position.y = -1.8;
        const yokeBase = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.5, 16), silver);
        yoke.add(yokeBase);
        
        const yokeU = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.6, 0.15), silver);
        yokeU.position.y = 0.4;
        yoke.add(yokeU);
        group.add(yoke);
        
        // 3. Telescope Main Optical Tube (slanted upwards)
        const tubeGroup = new THREE.Group();
        tubeGroup.position.y = -1.2;
        tubeGroup.rotation.z = Math.PI / 8; // slant up 22.5 deg
        
        // Objective barrel
        const mainTube = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.26, 3.2, 24), brass);
        mainTube.rotation.z = Math.PI / 2; // lay along X axis
        mainTube.position.x = 0.5;
        tubeGroup.add(mainTube);
        
        // Glass objective lens at front (right side)
        const frontLens = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 24), glassMat);
        frontLens.rotation.z = Math.PI / 2;
        frontLens.position.x = 2.1;
        tubeGroup.add(frontLens);
        
        // Brass objective rim collar
        const frontCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.2, 24), brass);
        frontCollar.rotation.z = Math.PI / 2;
        frontCollar.position.x = 2.1;
        tubeGroup.add(frontCollar);
        
        // 4. Focus Draw-Tube (extends out back left side based on focus slider)
        const focusGroup = new THREE.Group();
        focusGroup.position.x = -1.1 - focusVal * 0.25; // extends left
        
        const focusTube = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.2, 24), silver);
        focusTube.rotation.z = Math.PI / 2;
        focusGroup.add(focusTube);
        
        // Eyepiece diagonal/mount
        const eyepieceCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.3, 16), darkChrome);
        eyepieceCollar.position.x = -0.75;
        eyepieceCollar.rotation.z = Math.PI / 2;
        focusGroup.add(eyepieceCollar);
        
        const eyepieceCup = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.15, 16), darkChrome);
        eyepieceCup.position.x = -0.9;
        eyepieceCup.rotation.z = Math.PI / 2;
        focusGroup.add(eyepieceCup);
        
        tubeGroup.add(focusGroup);
        
        // 5. Finder Scope mounted on top
        const finderGroup = new THREE.Group();
        finderGroup.position.set(0.2, 0.45, 0.18);
        
        const finderBrackets = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4, 0.06), silver);
        finderGroup.add(finderBrackets);
        
        const finderTube = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.07, 1.0, 16), darkChrome);
        finderTube.rotation.z = Math.PI / 2;
        finderTube.position.y = 0.25;
        finderGroup.add(finderTube);
        
        tubeGroup.add(finderGroup);
        group.add(tubeGroup);
        
        group.userData = {
            animate: function(time, speedFactor) {
                // Azimuth slow sweep
                yoke.rotation.y = Math.sin(time * 0.15) * 0.12;
                tubeGroup.rotation.y = yoke.rotation.y;
            },
            explode: function(progress) {
                tripod.position.y = -2.0 - progress * 1.5;
                yoke.position.y = -1.8 + progress * 1.0;
                mainTube.position.y = progress * 1.5;
                focusGroup.position.x = -1.1 - focusVal * 0.25 - progress * 1.5;
            }
        };
        
        return group;
    },

    createSpectrometer: function(dbItem, settings) {
        const group = new THREE.Group();
        const angleVal = settings.angle !== undefined ? settings.angle : 20.0; // degrees
        
        // Materials
        const steel = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.15 });
        const brass = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.85, roughness: 0.2 });
        const blackIron = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.7, metalness: 0.2 });
        const glassPrismMat = new THREE.MeshPhysicalMaterial({ color: 0xa5f3fc, transparent: true, opacity: 0.6, roughness: 0.05, refractiveIndex: 1.62, transmission: 0.95 });
        
        // 1. Heavy Base Stand
        const base = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.15, 32), blackIron);
        base.position.y = -1.8;
        group.add(base);
        
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.4, 20), steel);
        pillar.position.y = -1.0;
        group.add(pillar);
        
        // 2. Circular Vernier Scale plate (with protractor marks)
        const scaleTable = document.createElement("canvas");
        scaleTable.width = 512; scaleTable.height = 512;
        const sCtx = scaleTable.getContext("2d");
        sCtx.fillStyle = "#e2e8f0"; sCtx.fillRect(0, 0, 512, 512);
        
        sCtx.strokeStyle = "#0f172a";
        sCtx.lineWidth = 4;
        sCtx.beginPath(); sCtx.arc(256, 256, 230, 0, Math.PI*2); sCtx.stroke();
        
        // Draw 360 degree ticks
        for (let d = 0; d < 360; d += 2) {
            const rad = (d * Math.PI) / 180;
            const isMajor = d % 10 === 0;
            const len = isMajor ? 24 : 10;
            sCtx.lineWidth = isMajor ? 2 : 1;
            
            const x1 = 256 + Math.cos(rad) * 230;
            const y1 = 256 + Math.sin(rad) * 230;
            const x2 = 256 + Math.cos(rad) * (230 - len);
            const y2 = 256 + Math.sin(rad) * (230 - len);
            sCtx.beginPath(); sCtx.moveTo(x1, y1); sCtx.lineTo(x2, y2); sCtx.stroke();
            
            if (isMajor) {
                sCtx.font = "bold 14px sans-serif";
                sCtx.fillStyle = "#0f172a";
                sCtx.fillText(String(d), 256 + Math.cos(rad) * 190, 256 + Math.sin(rad) * 190);
            }
        }
        
        const dialTex = new THREE.CanvasTexture(scaleTable);
        const dialDisk = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.08, 32), new THREE.MeshStandardMaterial({ map: dialTex, roughness: 0.4 }));
        dialDisk.position.y = -0.26;
        group.add(dialDisk);
        
        // 3. Central Prism Table
        const prismTableGroup = new THREE.Group();
        prismTableGroup.position.y = -0.15;
        
        const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.08, 20), brass);
        prismTableGroup.add(tableBase);
        
        // Triangular Glass Prism
        // Build prism geometry
        const shape = new THREE.Shape();
        shape.moveTo(-0.25, -0.14);
        shape.lineTo(0.25, -0.14);
        shape.lineTo(0, 0.28);
        shape.closePath();
        
        const extrudeSettings = { depth: 0.6, bevelEnabled: false };
        const prismGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const prism = new THREE.Mesh(prismGeo, glassPrismMat);
        prism.rotation.x = Math.PI / 2; // stand vertical
        prism.position.y = 0.04;
        prism.position.z = -0.2;
        prismTableGroup.add(prism);
        
        group.add(prismTableGroup);
        
        // 4. Fixed Collimator Tube (always at 180 degrees, pointing to center)
        const collimator = new THREE.Group();
        collimator.position.set(-1.0, -0.18, 0);
        collimator.rotation.y = Math.PI / 2; // points +X
        
        const collTube = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.4, 16), blackIron);
        collimator.add(collTube);
        // Slit collar at left
        const slitCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.15, 16), brass);
        slitCollar.position.y = -0.7;
        collimator.add(slitCollar);
        
        group.add(collimator);
        
        // 5. Rotatable Telescope Tube (rotates around central axis)
        const telescopeArm = new THREE.Group();
        telescopeArm.position.y = -0.18;
        
        // Support arm
        const armBar = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.8), steel);
        armBar.position.z = 0.4;
        telescopeArm.add(armBar);
        
        const telescope = new THREE.Group();
        telescope.position.set(0, 0, 0.9); // offset radial
        
        const scopeTube = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.10, 1.4, 20), blackIron);
        scopeTube.rotation.x = Math.PI / 2;
        telescope.add(scopeTube);
        
        // Brass eyepiece end
        const eyepieceCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.25, 16), brass);
        eyepieceCollar.position.z = 0.75;
        eyepieceCollar.rotation.x = Math.PI / 2;
        telescope.add(eyepieceCollar);
        
        telescopeArm.add(telescope);
        
        // Rotate telescope according to angleVal
        const rotRad = (angleVal * Math.PI) / 180;
        telescopeArm.rotation.y = rotRad;
        
        group.add(telescopeArm);
        
        group.userData = {
            animate: function(time, speedFactor) {
                // slow table drift
                prismTableGroup.rotation.y = Math.sin(time * 0.15) * 0.05;
            },
            explode: function(progress) {
                base.position.y = -1.8 - progress * 1.5;
                dialDisk.position.y = -0.26 - progress * 1.0;
                prismTableGroup.position.y = -0.15 + progress * 2.0;
                collimator.position.x = -1.0 - progress * 1.5;
                telescopeArm.position.y = -0.18 - progress * 1.0;
            }
        };
        
        return group;
    },

    createSpherometer: function(dbItem, settings) {
        const group = new THREE.Group();
        const heightVal = settings.height !== undefined ? settings.height : 0.8; // mm (-1.5 to 3.5)
        
        // Materials
        const brass = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.82, roughness: 0.18 });
        const steel = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });
        const blackIron = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
        
        // Scale: 1 mm vertical displacement = 0.4 Three.js units
        const Y_SCALE = 0.4;
        const centralLegOffset = heightVal * Y_SCALE;
        
        // 1. Triangular base frame
        const frame = new THREE.Group();
        frame.position.y = -0.5;
        
        // Circular center boss
        const centerBoss = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.25, 20), brass);
        frame.add(centerBoss);
        
        // Three horizontal radial spokes (120 deg apart)
        for (let i = 0; i < 3; i++) {
            const rot = (i * Math.PI * 2) / 3;
            const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 1.1), brass);
            spoke.position.set(0.55 * Math.sin(rot), 0, 0.55 * Math.cos(rot));
            spoke.rotation.y = rot;
            frame.add(spoke);
            
            // Outer pointed leg at the end of each spoke
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.01, 1.2, 8), steel);
            leg.position.set(1.0 * Math.sin(rot), -0.6, 1.0 * Math.cos(rot));
            frame.add(leg);
        }
        group.add(frame);
        
        // 2. Vertical Pitch Scale Column
        const vertColumn = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.2, 0.08), brass);
        vertColumn.position.set(-0.25, 0.6, 0.28);
        
        // Draw vertical ticks (mm) using canvas texture
        const vertCanvas = document.createElement("canvas");
        vertCanvas.width = 64; vertCanvas.height = 256;
        const vCtx = vertCanvas.getContext("2d");
        vCtx.fillStyle = "#eab308"; vCtx.fillRect(0, 0, 64, 256);
        vCtx.strokeStyle = "#000000"; vCtx.lineWidth = 2;
        vCtx.font = "bold 16px sans-serif";
        vCtx.textAlign = "right";
        vCtx.fillStyle = "#000000";
        
        // 20 mm scale range (from -5 to +15)
        for (let mm = -5; mm <= 15; mm++) {
            const y = 256 - (mm + 5) * 12;
            const isMajor = mm % 5 === 0;
            vCtx.lineWidth = isMajor ? 3 : 1;
            vCtx.beginPath(); vCtx.moveTo(40, y); vCtx.lineTo(60, y); vCtx.stroke();
            if (isMajor) {
                vCtx.fillText(String(mm), 34, y + 5);
            }
        }
        const vertTex = new THREE.CanvasTexture(vertCanvas);
        const vertMats = [
            new THREE.MeshStandardMaterial({ color: 0xb45309 }), // sides
            new THREE.MeshStandardMaterial({ color: 0xb45309 }),
            new THREE.MeshStandardMaterial({ color: 0xb45309 }),
            new THREE.MeshStandardMaterial({ color: 0xb45309 }),
            new THREE.MeshStandardMaterial({ map: vertTex }),
            new THREE.MeshStandardMaterial({ color: 0xb45309 })
        ];
        vertColumn.material = vertMats;
        group.add(vertColumn);
        
        // 3. Central Vertical Micrometer Screw
        const screwGroup = new THREE.Group();
        screwGroup.position.y = centralLegOffset;
        
        // Central screw rod
        const screwRod = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.6, 20), steel);
        screwRod.position.y = 0.5;
        screwGroup.add(screwRod);
        
        // Pointy tip at base of screw rod
        const screwTip = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.01, 0.4, 8), steel);
        screwTip.position.y = -0.9;
        screwGroup.add(screwTip);
        
        // 4. Horizontal Circular Dial Disc (rotates as it displaces vertically)
        const dialCanvas = document.createElement("canvas");
        dialCanvas.width = 512; dialCanvas.height = 512;
        const dCtx = dialCanvas.getContext("2d");
        dCtx.fillStyle = "#f3f4f6"; dCtx.fillRect(0, 0, 512, 512);
        dCtx.strokeStyle = "#1e293b"; dCtx.lineWidth = 4;
        dCtx.beginPath(); dCtx.arc(256, 256, 240, 0, Math.PI*2); dCtx.stroke();
        
        // 100 graduation divisions
        dCtx.fillStyle = "#1e293b";
        dCtx.textAlign = "center";
        dCtx.textBaseline = "middle";
        for (let i = 0; i < 100; i++) {
            const rad = (i / 100) * Math.PI * 2;
            const isMajor = i % 10 === 0;
            const len = isMajor ? 26 : 12;
            dCtx.lineWidth = isMajor ? 3 : 1;
            
            const x1 = 256 + Math.cos(rad) * 240;
            const y1 = 256 + Math.sin(rad) * 240;
            const x2 = 256 + Math.cos(rad) * (240 - len);
            const y2 = 256 + Math.sin(rad) * (240 - len);
            dCtx.beginPath(); dCtx.moveTo(x1, y1); dCtx.lineTo(x2, y2); dCtx.stroke();
            
            if (isMajor) {
                dCtx.font = "bold 20px monospace";
                dCtx.fillText(String(i), 256 + Math.cos(rad) * 194, 256 + Math.sin(rad) * 194);
            }
        }
        
        const dialTex = new THREE.CanvasTexture(dialCanvas);
        const dialDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.08, 32), new THREE.MeshStandardMaterial({ map: dialTex, roughness: 0.2 }));
        dialDisc.position.y = -0.4; // sits near bottom of screw vertical scale
        screwGroup.add(dialDisc);
        
        // Top turn knob
        const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.4, 16), blackIron);
        knob.position.y = 1.7;
        screwGroup.add(knob);
        
        group.add(screwGroup);
        
        // Apply micrometer math: pitch = 1mm, divisions = 100
        // Screw rotation matches heights fraction
        const rotationAngle = -(heightVal / 1.0) * Math.PI * 2;
        screwGroup.rotation.y = rotationAngle;
        
        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.1 * speedFactor;
            },
            explode: function(progress) {
                frame.position.y = -0.5 - progress * 1.5;
                vertColumn.position.x = -0.25 - progress * 1.0;
                screwGroup.position.y = centralLegOffset + progress * 2.0;
            }
        };
        
        return group;
    },

    createTravellingMicroscope: function(dbItem, settings) {
        const group = new THREE.Group();
        const travel = settings.travel !== undefined ? settings.travel : 3.4; // 0 to 8 mm
        
        // Materials
        const darkIron = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.4 });
        const brass = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 });
        const steel = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.95, roughness: 0.05 });
        
        // 1. Heavy horizontal slider track base
        const base = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.3, 1.2), darkIron);
        base.position.y = -1.8;
        group.add(base);
        
        const track1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.9, 16), steel);
        track1.rotation.z = Math.PI / 2;
        track1.position.set(0, 0.2, 0.3);
        base.add(track1);
        
        const track2 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.9, 16), steel);
        track2.rotation.z = Math.PI / 2;
        track2.position.set(0, 0.2, -0.3);
        base.add(track2);
        
        // Horizontal Vernier dial
        const horizKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.15, 20), brass);
        horizKnob.rotation.z = Math.PI / 2;
        horizKnob.position.set(1.5, 0.1, 0);
        base.add(horizKnob);
        
        // 2. Vertical Column Pillar
        const column = new THREE.Mesh(new THREE.BoxGeometry(0.4, 3.2, 0.4), darkIron);
        column.position.set(-0.8, -0.1, 0);
        group.add(column);
        
        // Vertical steel guide rod
        const vertRod = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.0, 16), steel);
        vertRod.position.set(-0.8, -0.1, 0.25);
        group.add(vertRod);
        
        // Vertical fine movement knob
        const vertKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.15, 20), brass);
        vertKnob.position.set(-0.8, 1.6, 0);
        group.add(vertKnob);
        
        // 3. Sliding carriage mount
        const carriage = new THREE.Group();
        // Carriage shifts vertically based on travel
        const travelY = -1.0 + (travel / 8.0) * 2.0; // scales 2.0 units vertically
        carriage.position.set(-0.5, travelY, 0);
        
        const mountBracket = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), brass);
        carriage.add(mountBracket);
        
        // Microscope optics barrel (horizontal)
        const scopeGroup = new THREE.Group();
        scopeGroup.position.set(0.6, 0, 0.1);
        
        const mainTube = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 1.2, 24), darkIron);
        mainTube.rotation.x = Math.PI / 2;
        scopeGroup.add(mainTube);
        
        const eyepieceCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.11, 0.25, 16), brass);
        eyepieceCollar.position.set(0, 0, -0.7);
        eyepieceCollar.rotation.x = Math.PI / 2;
        scopeGroup.add(eyepieceCollar);
        
        const objectiveCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 16), brass);
        objectiveCollar.position.set(0, 0, 0.7);
        objectiveCollar.rotation.x = Math.PI / 2;
        scopeGroup.add(objectiveCollar);
        
        // Focus knob on telescope tube
        const focusKnob = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.4, 16), brass);
        focusKnob.position.set(-0.16, 0, 0.1);
        focusKnob.rotation.z = Math.PI / 2;
        scopeGroup.add(focusKnob);
        
        carriage.add(scopeGroup);
        group.add(carriage);
        
        group.userData = {
            animate: function(time, speedFactor) {
                // Gentle scope alignment wobble
                scopeGroup.rotation.z = Math.sin(time * 0.5) * 0.03;
                vertKnob.rotation.y = time * 0.2 * speedFactor;
            },
            explode: function(progress) {
                base.position.y = -1.8 - progress * 1.5;
                column.position.x = -0.8 - progress * 1.0;
                carriage.position.y = travelY + progress * 2.0;
                scopeGroup.position.x = 0.6 + progress * 1.5;
            }
        };
        
        return group;
    },

    createResonanceTube: function(dbItem, settings) {
        const group = new THREE.Group();
        const L_water = settings.tubeLength !== undefined ? settings.tubeLength : 0.45; // 0.1 to 0.9 m
        
        // Materials
        const standMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.5, roughness: 0.5 });
        const steel = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });
        const waterMat = new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.5, transmission: 0.9, roughness: 0.1 });
        const tubeMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.2, transmission: 0.95, roughness: 0.1 });
        const soundMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.5 });
        
        // Base plate
        const base = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.15, 1.2), standMat);
        base.position.y = -2.2;
        group.add(base);
        
        // Vertical supporting rod
        const vertRod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.2, 16), steel);
        vertRod.position.set(-0.6, -0.1, 0);
        group.add(vertRod);
        
        // Metal support ring brackets
        const clamp1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.15), steel);
        clamp1.position.set(-0.25, 1.0, 0);
        group.add(clamp1);
        const clamp2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.08, 0.15), steel);
        clamp2.position.set(-0.25, -1.0, 0);
        group.add(clamp2);
        
        // 1. Transparent glass resonance tube cylinder
        const glassTube = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 3.8, 24, 1, true), tubeMat);
        glassTube.position.set(0.1, -0.1, 0);
        group.add(glassTube);
        
        // 2. Adjusting Water column inside tube
        // Scale L_water: 0.0 to 1.0 maps to water height.
        // Full height is 3.8 units inside.
        const waterH = L_water * 3.7;
        const water = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, waterH, 20), waterMat);
        // Place water starting from bottom of glass tube (y = -2.0)
        water.position.set(0.1, -2.0 + waterH/2, 0);
        group.add(water);
        
        // 3. Moveable adjacent steel water reservoir cup
        const reservoir = new THREE.Group();
        // Reservoir cup moves up/down in sync with water level
        reservoir.position.set(0.8, -2.0 + waterH, 0);
        const resCup = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.14, 0.8, 16), steel);
        reservoir.add(resCup);
        
        const clampRes = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.06), steel);
        clampRes.position.set(-0.5, 0.2, 0);
        reservoir.add(clampRes);
        group.add(reservoir);
        
        // Rubber tube connection mesh (connecting reservoir to bottom of glass tube)
        // Draw simple link curve
        const tubeCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0.1, -2.0, 0),
            new THREE.Vector3(0.4, -2.3, 0.2),
            new THREE.Vector3(0.8, -2.0 + waterH - 0.4, 0)
        ]);
        const rubberTube = new THREE.Mesh(new THREE.TubeGeometry(tubeCurve, 20, 0.03, 8, false), standMat);
        group.add(rubberTube);
        
        // 4. Tuning Fork (steel U-shape hovering above the glass tube)
        const forkGroup = new THREE.Group();
        forkGroup.position.set(0.1, 2.05, 0);
        
        const forkHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.35, 12), steel);
        forkHandle.position.y = -0.18;
        forkGroup.add(forkHandle);
        
        const forkBase = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.06), steel);
        forkGroup.add(forkBase);
        
        const tine1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.6, 0.04), steel);
        tine1.position.set(-0.1, 0.3, 0);
        const tine2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.6, 0.04), steel);
        tine2.position.set(0.1, 0.3, 0);
        forkGroup.add(tine1);
        forkGroup.add(tine2);
        
        group.add(forkGroup);
        
        // 5. Sound Wave Vibrations (glowing rings/wave outlines inside the top air column)
        const waves = new THREE.Group();
        // Air column is top of water (y = -2.0 + waterH) to tube top (y = 1.8)
        const airColTop = 1.8;
        const airColBot = -2.0 + waterH;
        const waveSpan = airColTop - airColBot;
        
        const wavesCount = 4;
        const wavePlanes = [];
        for (let i = 0; i < wavesCount; i++) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.012, 8, 24), soundMat);
            ring.rotation.x = Math.PI / 2;
            waves.add(ring);
            wavePlanes.push(ring);
        }
        group.add(waves);
        
        group.userData = {
            animate: function(time, speedFactor) {
                // Tuning fork vibrates
                const vib = Math.sin(time * 60.0) * 0.015 * speedFactor;
                tine1.position.x = -0.1 + vib;
                tine2.position.x = 0.1 - vib;
                
                // Sound waves ripple vertically inside the air column
                wavePlanes.forEach((ring, idx) => {
                    const phase = (time * 4.0 + idx * (Math.PI / 2)) % Math.PI;
                    const hOffset = (phase / Math.PI) * waveSpan;
                    ring.position.y = airColTop - hOffset;
                    // Fade waves near water level
                    ring.material.opacity = 0.6 * (1.0 - hOffset / waveSpan);
                    ring.scale.setScalar(1.0 + Math.sin(phase) * 0.25);
                });
            },
            explode: function(progress) {
                base.position.y = -2.2 - progress * 1.5;
                vertRod.position.x = -0.6 - progress * 1.0;
                glassTube.position.x = 0.1 + progress * 1.5;
                reservoir.position.x = 0.8 + progress * 1.5;
                forkGroup.position.y = 2.05 + progress * 2.0;
                waves.position.y = progress * 1.5;
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

    // 7. AI SYNTHESIZER — generic fallback
    createFallbackVisual: function(queryText, settings) {
        const group = this._synthGenericFallback(queryText, settings);
        if (group && settings && settings.nodeScale !== undefined) {
            group.scale.setScalar(settings.nodeScale);
        }
        return group;
    },

    _synthGenericFallback: function(queryText, settings) {
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
    },

    // ─── 31 SPECIALIZED AI OBJECT SYNTHESIZERS ───────────────────────────────

    _synthKeyboard: function(settings) {
        const group = new THREE.Group();
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.6 });
        const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 0.9), baseMat);
        base.position.y = -0.05;
        group.add(base);

        const keysGroup = new THREE.Group();
        const keyMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.4 });
        const spaceMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.4 });
        
        const rows = 4;
        const cols = 12;
        const dx = 0.17;
        const dz = 0.17;
        const startX = -((cols - 1) * dx) / 2;
        const startZ = -((rows - 1) * dz) / 2 - 0.05;
        
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (r === 3 && c >= 4 && c <= 7) continue; // Spacebar slot
                const key = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.06, 0.12), keyMat);
                key.position.set(startX + c * dx, 0.05, startZ + r * dz);
                keysGroup.add(key);
            }
        }
        
        const spacebar = new THREE.Mesh(new THREE.BoxGeometry(0.17 * 4 - 0.04, 0.06, 0.12), spaceMat);
        spacebar.position.set(0, 0.05, startZ + 3 * dz);
        keysGroup.add(spacebar);
        group.add(keysGroup);
        
        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.03;
            },
            explode: function(progress) {
                base.position.y = -0.05 - progress * 1.5;
                base.scale.setScalar(Math.max(0.001, 1 - progress));
                keysGroup.children.forEach((key, idx) => {
                    const dirX = ((idx % 12) - 5.5) * 0.5;
                    const dirZ = (Math.floor(idx / 12) - 1.5) * 0.5;
                    key.position.x += dirX * progress * 0.2;
                    key.position.z += dirZ * progress * 0.2;
                    key.position.y += progress * 1.5;
                    key.scale.setScalar(Math.max(0.001, 1 - progress));
                });
            }
        };
        return group;
    },

    _synthLaptop: function(settings) {
        const group = new THREE.Group();
        const chassisMat = new THREE.MeshStandardMaterial({ color: 0x374151, metalness: 0.8, roughness: 0.2 });
        
        const base = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.6), chassisMat);
        base.position.set(0, -0.04, 0);
        group.add(base);

        const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.0, 16), chassisMat);
        hinge.rotation.z = Math.PI / 2;
        hinge.position.set(0, 0.02, -0.76);
        group.add(hinge);

        const lidGroup = new THREE.Group();
        lidGroup.position.set(0, 0.02, -0.76);
        
        const lidCover = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.6, 0.06), chassisMat);
        lidCover.position.set(0, 0.8, -0.03);
        lidGroup.add(lidCover);

        // Screen display plane
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 340;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#1e1e1e";
        ctx.fillRect(0, 0, 512, 340);
        ctx.strokeStyle = "#8b5cf6";
        ctx.lineWidth = 4;
        ctx.strokeRect(10, 10, 492, 320);
        ctx.fillStyle = "#8b5cf6";
        ctx.font = "bold 24px monospace";
        ctx.fillText("> Edu3D AI Synthesizer", 30, 60);
        ctx.fillStyle = "#06b6d4";
        ctx.font = "18px monospace";
        ctx.fillText("Model: Neural-Mesh-3D", 30, 100);
        ctx.fillText("Symmetry: Isotropic", 30, 130);
        ctx.fillText("Status: Synthesis Complete", 30, 160);
        ctx.strokeStyle = "#06b6d4";
        ctx.beginPath();
        for (let x = 30; x < 480; x += 10) {
            const y = 250 + Math.sin(x * 0.05) * 30;
            if (x === 30) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const screenTexture = new THREE.CanvasTexture(canvas);
        const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
        const screen = new THREE.Mesh(new THREE.PlaneGeometry(2.28, 1.48), screenMat);
        screen.position.set(0, 0.8, 0.005);
        lidGroup.add(screen);

        lidGroup.rotation.x = Math.PI / 1.7; // open angle
        group.add(lidGroup);

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.03;
            },
            explode: function(progress) {
                base.position.y = -0.04 - progress * 1.2;
                base.scale.setScalar(Math.max(0.001, 1 - progress));
                lidGroup.position.y = 0.02 + progress * 1.5;
                lidGroup.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthDNA: function(settings) {
        const group = new THREE.Group();
        const radius = 0.7;
        const totalHeight = 3.0;
        const rungs = 18;
        const spheresGroup = new THREE.Group();
        const tubesGroup = new THREE.Group();
        
        const backbone1Mat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, metalness: 0.5, roughness: 0.2 });
        const backbone2Mat = new THREE.MeshStandardMaterial({ color: 0xef4444, metalness: 0.5, roughness: 0.2 });
        const rungAMat = new THREE.MeshStandardMaterial({ color: 0x10b981 });
        const rungBMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
        
        const sphereGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const rungGeo = new THREE.CylinderGeometry(0.03, 0.03, 1, 8);
        rungGeo.translate(0, 0.5, 0);
        rungGeo.rotateX(Math.PI / 2);

        for (let i = 0; i < rungs; i++) {
            const ratio = i / (rungs - 1);
            const y = ratio * totalHeight - totalHeight / 2;
            const theta = ratio * Math.PI * 4; // 2 full twists
            
            const x1 = Math.sin(theta) * radius;
            const z1 = Math.cos(theta) * radius;
            const x2 = Math.sin(theta + Math.PI) * radius;
            const z2 = Math.cos(theta + Math.PI) * radius;
            
            const s1 = new THREE.Mesh(sphereGeo, backbone1Mat);
            s1.position.set(x1, y, z1);
            spheresGroup.add(s1);
            
            const s2 = new THREE.Mesh(sphereGeo, backbone2Mat);
            s2.position.set(x2, y, z2);
            spheresGroup.add(s2);
            
            const rungHalf1 = new THREE.Mesh(rungGeo, i % 2 === 0 ? rungAMat : rungBMat);
            rungHalf1.position.set(x1, y, z1);
            rungHalf1.scale.set(1, 1, radius);
            rungHalf1.lookAt(new THREE.Vector3(0, y, 0));
            tubesGroup.add(rungHalf1);

            const rungHalf2 = new THREE.Mesh(rungGeo, i % 2 === 0 ? rungBMat : rungAMat);
            rungHalf2.position.set(x2, y, z2);
            rungHalf2.scale.set(1, 1, radius);
            rungHalf2.lookAt(new THREE.Vector3(0, y, 0));
            tubesGroup.add(rungHalf2);
        }
        
        group.add(spheresGroup);
        group.add(tubesGroup);
        
        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.4 * speedFactor;
            },
            explode: function(progress) {
                spheresGroup.children.forEach((s, idx) => {
                    const dir = s.position.clone().setY(0).normalize();
                    s.position.addScaledVector(dir, progress * 1.5);
                    s.scale.setScalar(Math.max(0.001, 1 - progress));
                });
                tubesGroup.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthTelescope: function(settings) {
        const group = new THREE.Group();
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.8, roughness: 0.2 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.6 });
        
        const tripod = new THREE.Group();
        for (let i = 0; i < 3; i++) {
            const angle = (i * Math.PI * 2) / 3;
            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.02, 1.8, 8), chromeMat);
            leg.position.set(Math.sin(angle) * 0.4, -0.9, Math.cos(angle) * 0.4);
            leg.rotation.z = -Math.sin(angle) * 0.25;
            leg.rotation.x = Math.cos(angle) * 0.25;
            tripod.add(leg);
        }
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 12), blackMat);
        hub.position.y = -0.1;
        tripod.add(hub);
        group.add(tripod);

        const mount = new THREE.Group();
        mount.position.y = 0.1;
        const mountBase = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.2, 12), chromeMat);
        const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 0.15), metalMat);
        bracket.position.y = 0.15;
        mount.add(mountBase);
        mount.add(bracket);
        group.add(mount);

        const scopeGroup = new THREE.Group();
        scopeGroup.position.set(0, 0.35, 0);
        scopeGroup.rotation.x = -0.25; // angled up

        const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.16, 2.2, 24), metalMat);
        tube.rotation.x = Math.PI / 2;
        scopeGroup.add(tube);

        const lensCap = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.15, 24), blackMat);
        lensCap.position.z = 1.1;
        lensCap.rotation.x = Math.PI / 2;
        scopeGroup.add(lensCap);

        const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.6, transmission: 0.9, ior: 1.5 });
        const objective = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.04, 24), lensMat);
        objective.position.z = 1.16;
        objective.rotation.x = Math.PI / 2;
        scopeGroup.add(objective);

        const eyepieceTube = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.5, 16), chromeMat);
        eyepieceTube.position.z = -1.2;
        eyepieceTube.rotation.x = Math.PI / 2;
        scopeGroup.add(eyepieceTube);

        const eyepiece = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.15, 16), blackMat);
        eyepiece.position.z = -1.45;
        eyepiece.rotation.x = Math.PI / 2;
        scopeGroup.add(eyepiece);
        group.add(scopeGroup);

        group.userData = {
            animate: function(time, speedFactor) {
                scopeGroup.rotation.y = Math.sin(time * 0.15) * 0.2 * speedFactor;
            },
            explode: function(progress) {
                tripod.position.y = -progress * 1.5;
                tripod.scale.setScalar(Math.max(0.001, 1 - progress));
                mount.position.y = 0.1 - progress * 0.5;
                mount.scale.setScalar(Math.max(0.001, 1 - progress));
                scopeGroup.position.z = progress * 1.5;
                scopeGroup.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthMicroscope: function(settings) {
        const group = new THREE.Group();
        const chassisMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.5 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.8, roughness: 0.2 });
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x111827 });
        
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 1.4), chassisMat);
        base.position.y = -1.2;
        group.add(base);

        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.8, 0.3), chassisMat);
        arm.position.set(0, -0.3, -0.5);
        arm.rotation.x = 0.1;
        group.add(arm);

        const stage = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.05, 1.0), blackMat);
        stage.position.set(0, -0.4, 0);
        group.add(stage);

        const headGroup = new THREE.Group();
        headGroup.position.set(0, 0.4, 0);
        
        const nosepiece = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.15, 16), metalMat);
        headGroup.add(nosepiece);

        const lens1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.25, 12), metalMat);
        lens1.position.set(-0.15, -0.15, 0.1);
        lens1.rotation.z = 0.2;
        headGroup.add(lens1);

        const lens2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.2, 12), blackMat);
        lens2.position.set(0.15, -0.12, 0.1);
        lens2.rotation.z = -0.2;
        headGroup.add(lens2);

        const mainTube = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.7, 16), chassisMat);
        mainTube.position.y = 0.4;
        mainTube.rotation.x = 0.2;
        headGroup.add(mainTube);

        const eyepiece = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.08, 0.2, 16), blackMat);
        eyepiece.position.set(0, 0.75, -0.07);
        eyepiece.rotation.x = 0.2;
        headGroup.add(eyepiece);
        group.add(headGroup);

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.03;
            },
            explode: function(progress) {
                base.position.y = -1.2 - progress * 1.2;
                base.scale.setScalar(Math.max(0.001, 1 - progress));
                arm.position.x = -progress * 1.5;
                arm.scale.setScalar(Math.max(0.001, 1 - progress));
                stage.position.y = -0.4 - progress * 0.8;
                stage.scale.setScalar(Math.max(0.001, 1 - progress));
                headGroup.position.y = 0.4 + progress * 1.5;
                headGroup.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthClock: function(settings) {
        const group = new THREE.Group();
        const bezelMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 }); // Gold/Brass
        const dialMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.7 });
        
        const outerBezel = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.08, 16, 64), bezelMat);
        group.add(outerBezel);

        const dial = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.05, 64), dialMat);
        dial.rotation.x = Math.PI / 2;
        dial.position.z = -0.03;
        group.add(dial);

        const ticksGroup = new THREE.Group();
        ticksGroup.position.z = 0.01;
        const tickMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const tickGeo = new THREE.BoxGeometry(0.03, 0.12, 0.01);
        
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI * 2) / 12;
            const tick = new THREE.Mesh(tickGeo, tickMat);
            tick.position.set(Math.sin(angle) * 1.0, Math.cos(angle) * 1.0, 0);
            tick.rotation.z = -angle;
            ticksGroup.add(tick);
        }
        group.add(ticksGroup);

        const handsGroup = new THREE.Group();
        handsGroup.position.z = 0.02;

        const hrHand = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.01), new THREE.MeshBasicMaterial({ color: 0x60a5fa }));
        hrHand.geometry.translate(0, 0.3, 0);
        handsGroup.add(hrHand);

        const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.9, 0.01), new THREE.MeshBasicMaterial({ color: 0x34d399 }));
        minHand.geometry.translate(0, 0.45, 0);
        handsGroup.add(minHand);

        const secHand = new THREE.Mesh(new THREE.BoxGeometry(0.015, 1.0, 0.01), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
        secHand.geometry.translate(0, 0.5, 0);
        handsGroup.add(secHand);

        group.add(handsGroup);

        group.userData = {
            animate: function(time, speedFactor) {
                const now = new Date();
                const s = now.getSeconds() + now.getMilliseconds() / 1000;
                const m = now.getMinutes() + s / 60;
                const h = (now.getHours() % 12) + m / 60;

                secHand.rotation.z = -s * (Math.PI / 30);
                minHand.rotation.z = -m * (Math.PI / 30);
                hrHand.rotation.z = -h * (Math.PI / 6);
            },
            explode: function(progress) {
                outerBezel.position.z = -progress * 1.5;
                outerBezel.scale.setScalar(Math.max(0.001, 1 - progress));
                dial.position.z = -0.03 - progress * 1.0;
                dial.scale.setScalar(Math.max(0.001, 1 - progress));
                ticksGroup.children.forEach(t => {
                    const dir = t.position.clone().normalize();
                    t.position.addScaledVector(dir, progress * 1.2);
                    t.scale.setScalar(Math.max(0.001, 1 - progress));
                });
                handsGroup.position.z = 0.02 + progress * 2.0;
                handsGroup.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthRocket: function(settings) {
        const group = new THREE.Group();
        const metalMat = new THREE.MeshStandardMaterial({ color: 0xf3f4f6, metalness: 0.6, roughness: 0.3 });
        const trimMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.5, roughness: 0.4 });
        const blackMat = new THREE.MeshStandardMaterial({ color: 0x1f2937 });
        
        const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 2.0, 24), metalMat);
        group.add(fuselage);

        const nose = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.8, 24), trimMat);
        nose.position.y = 1.4;
        group.add(nose);

        const engine = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 0.3, 16), blackMat);
        engine.position.y = -1.15;
        group.add(engine);

        const fins = new THREE.Group();
        for (let i = 0; i < 3; i++) {
            const angle = (i * Math.PI * 2) / 3;
            const fin = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.6, 0.5), trimMat);
            fin.geometry.translate(0, 0, 0.25);
            fin.position.set(Math.sin(angle) * 0.33, -0.7, Math.cos(angle) * 0.33);
            fin.rotation.y = -angle;
            fin.rotation.z = Math.sin(angle) * 0.2;
            fins.add(fin);
        }
        group.add(fins);

        // Rocket exhaust flame
        const flameGeo = new THREE.ConeGeometry(0.25, 0.8, 12);
        flameGeo.translate(0, -0.4, 0);
        const flameMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.9 });
        const flame = new THREE.Mesh(flameGeo, flameMat);
        flame.position.y = -1.3;
        group.add(flame);

        group.userData = {
            animate: function(time, speedFactor) {
                const s = 0.8 + Math.sin(time * 25) * 0.2 * speedFactor;
                flame.scale.set(s, s, s);
                group.position.y = Math.sin(time * 0.8) * 0.05;
            },
            explode: function(progress) {
                nose.position.y = 1.4 + progress * 1.5;
                nose.scale.setScalar(Math.max(0.001, 1 - progress));
                engine.position.y = -1.15 - progress * 1.0;
                engine.scale.setScalar(Math.max(0.001, 1 - progress));
                fuselage.scale.setScalar(Math.max(0.001, 1 - progress));
                fins.children.forEach(f => {
                    const dir = f.position.clone().setY(0).normalize();
                    f.position.addScaledVector(dir, progress * 1.2);
                    f.scale.setScalar(Math.max(0.001, 1 - progress));
                });
                flame.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthCar: function(settings) {
        const group = new THREE.Group();
        const paintMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.5, roughness: 0.2 }); // Red paint
        const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.4, transmission: 0.8 });
        const tireMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 });
        const hubMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.8, roughness: 0.2 });

        const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, 1.0), paintMat);
        body.position.y = 0.1;
        group.add(body);

        const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.35, 0.85), glassMat);
        cabin.position.set(-0.15, 0.45, 0);
        group.add(cabin);

        const cabinRoof = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.05, 0.85), paintMat);
        cabinRoof.position.set(-0.15, 0.625, 0);
        group.add(cabinRoof);

        const wheels = new THREE.Group();
        const wheelGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.18, 16);
        wheelGeo.rotateX(Math.PI / 2);
        const hubGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 12);
        hubGeo.rotateX(Math.PI / 2);

        const wPositions = [
            { x: -0.65, y: -0.05, z: 0.52 },
            { x: 0.65, y: -0.05, z: 0.52 },
            { x: -0.65, y: -0.05, z: -0.52 },
            { x: 0.65, y: -0.05, z: -0.52 }
        ];

        wPositions.forEach(pos => {
            const wGroup = new THREE.Group();
            wGroup.position.set(pos.x, pos.y, pos.z);
            
            const tire = new THREE.Mesh(wheelGeo, tireMat);
            const hub = new THREE.Mesh(hubGeo, hubMat);
            wGroup.add(tire);
            wGroup.add(hub);
            
            wheels.add(wGroup);
        });
        group.add(wheels);

        group.userData = {
            animate: function(time, speedFactor) {
                wheels.children.forEach(w => {
                    w.rotation.z = -time * 3 * speedFactor;
                });
            },
            explode: function(progress) {
                body.scale.setScalar(Math.max(0.001, 1 - progress));
                cabin.position.y = 0.45 + progress * 1.5;
                cabin.scale.setScalar(Math.max(0.001, 1 - progress));
                cabinRoof.position.y = 0.625 + progress * 1.7;
                cabinRoof.scale.setScalar(Math.max(0.001, 1 - progress));
                wheels.children.forEach(w => {
                    const dirZ = w.position.z > 0 ? 1 : -1;
                    w.position.z += dirZ * progress * 1.5;
                    w.scale.setScalar(Math.max(0.001, 1 - progress));
                });
            }
        };
        return group;
    },

    _synthHouse: function(settings) {
        const group = new THREE.Group();
        const wallMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.8 }); // Yellow walls
        const roofMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.6 }); // Red roof
        const doorMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
        const windowMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd });

        const walls = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.6), wallMat);
        walls.position.y = -0.4;
        group.add(walls);

        const roof = new THREE.Mesh(new THREE.ConeGeometry(1.3, 0.8, 4), roofMat);
        roof.rotation.y = Math.PI / 4;
        roof.position.y = 0.6;
        group.add(roof);

        const door = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.7, 0.05), doorMat);
        door.position.set(0, -0.65, 0.805);
        group.add(door);

        const win1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.05), windowMat);
        win1.position.set(-0.5, -0.3, 0.805);
        group.add(win1);

        const win2 = win1.clone();
        win2.position.set(0.5, -0.3, 0.805);
        group.add(win2);

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.02;
            },
            explode: function(progress) {
                walls.position.y = -0.4 - progress * 1.0;
                walls.scale.setScalar(Math.max(0.001, 1 - progress));
                roof.position.y = 0.6 + progress * 1.5;
                roof.scale.setScalar(Math.max(0.001, 1 - progress));
                door.position.z = 0.805 + progress * 1.2;
                door.scale.setScalar(Math.max(0.001, 1 - progress));
                win1.position.z = 0.805 + progress * 1.3;
                win1.scale.setScalar(Math.max(0.001, 1 - progress));
                win2.position.z = 0.805 + progress * 1.3;
                win2.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthTree: function(settings) {
        const group = new THREE.Group();
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 });

        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 1.2, 12), trunkMat);
        trunk.position.y = -0.9;
        group.add(trunk);

        const canopy = new THREE.Group();
        for (let i = 0; i < 3; i++) {
            const cone = new THREE.Mesh(new THREE.ConeGeometry(0.8 - i * 0.15, 0.9, 16), leafMat);
            cone.position.y = -0.1 + i * 0.55;
            canopy.add(cone);
        }
        group.add(canopy);

        group.userData = {
            animate: function(time, speedFactor) {
                canopy.rotation.y = time * 0.1 * speedFactor;
                // gentle sway
                canopy.rotation.z = Math.sin(time * 0.6) * 0.02 * speedFactor;
            },
            explode: function(progress) {
                trunk.position.y = -0.9 - progress * 1.2;
                trunk.scale.setScalar(Math.max(0.001, 1 - progress));
                canopy.children.forEach((c, idx) => {
                    c.position.y = (-0.1 + idx * 0.55) + progress * (1.5 + idx * 0.3);
                    c.scale.setScalar(Math.max(0.001, 1 - progress));
                });
            }
        };
        return group;
    },

    _synthFlower: function(settings) {
        const group = new THREE.Group();
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.8 });
        const petalMat = new THREE.MeshStandardMaterial({ color: 0xec4899, roughness: 0.5 }); // Pink
        const centerMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.6 }); // Yellow center

        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.8, 12), stemMat);
        stem.position.y = -0.7;
        group.add(stem);

        const leaf1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.5), stemMat);
        leaf1.position.set(0.18, -0.6, 0);
        leaf1.rotation.z = 0.4;
        leaf1.rotation.y = 0.5;
        group.add(leaf1);

        const leaf2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.5), stemMat);
        leaf2.position.set(-0.18, -0.9, 0);
        leaf2.rotation.z = -0.4;
        leaf2.rotation.y = -0.5;
        group.add(leaf2);

        const flowerHead = new THREE.Group();
        flowerHead.position.y = 0.2;

        const center = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), centerMat);
        center.scale.set(1, 1, 0.6);
        flowerHead.add(center);

        const petalGeo = new THREE.SphereGeometry(0.2, 16, 16);
        petalGeo.scale(1, 2.2, 0.4);
        petalGeo.translate(0, 0.35, 0);

        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            const petal = new THREE.Mesh(petalGeo, petalMat);
            petal.rotation.z = angle;
            flowerHead.add(petal);
        }
        group.add(flowerHead);

        group.userData = {
            animate: function(time, speedFactor) {
                flowerHead.rotation.z = Math.sin(time * 0.5) * 0.08 * speedFactor;
                group.rotation.y = time * 0.2 * speedFactor;
            },
            explode: function(progress) {
                stem.position.y = -0.7 - progress * 1.2;
                stem.scale.setScalar(Math.max(0.001, 1 - progress));
                leaf1.scale.setScalar(Math.max(0.001, 1 - progress));
                leaf2.scale.setScalar(Math.max(0.001, 1 - progress));
                center.position.z = progress * 1.5;
                center.scale.setScalar(Math.max(0.001, 1 - progress));
                flowerHead.children.forEach((p, idx) => {
                    if (idx > 0) { // skip center
                        const angle = ((idx - 1) * Math.PI * 2) / 6;
                        p.position.x += Math.sin(angle) * progress * 1.2;
                        p.position.y += Math.cos(angle) * progress * 1.2;
                        p.scale.setScalar(Math.max(0.001, 1 - progress));
                    }
                });
            }
        };
        return group;
    },

    _synthChair: function(settings) {
        const group = new THREE.Group();
        const woodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.7 });
        
        const seat = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.08, 1.0), woodMat);
        seat.position.y = -0.2;
        group.add(seat);

        const back = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.9, 0.08), woodMat);
        back.position.set(0, 0.25, -0.46);
        group.add(back);

        const legs = new THREE.Group();
        const legGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.9, 8);
        const lPositions = [
            { x: -0.42, z: 0.42 },
            { x: 0.42, z: 0.42 },
            { x: -0.42, z: -0.42 },
            { x: 0.42, z: -0.42 }
        ];
        lPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeo, woodMat);
            leg.position.set(pos.x, -0.65, pos.z);
            legs.add(leg);
        });
        group.add(legs);

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.02;
            },
            explode: function(progress) {
                seat.scale.setScalar(Math.max(0.001, 1 - progress));
                back.position.y = 0.25 + progress * 1.5;
                back.scale.setScalar(Math.max(0.001, 1 - progress));
                legs.children.forEach(leg => {
                    const dirX = leg.position.x > 0 ? 1 : -1;
                    const dirZ = leg.position.z > 0 ? 1 : -1;
                    leg.position.x += dirX * progress * 0.8;
                    leg.position.z += dirZ * progress * 0.8;
                    leg.position.y -= progress * 0.8;
                    leg.scale.setScalar(Math.max(0.001, 1 - progress));
                });
            }
        };
        return group;
    },

    _synthTable: function(settings) {
        const group = new THREE.Group();
        const topMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 });
        const legMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.8, roughness: 0.2 });

        const top = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 1.3), topMat);
        top.position.y = 0.3;
        group.add(top);

        const legs = new THREE.Group();
        const legGeo = new THREE.CylinderGeometry(0.06, 0.05, 1.2, 12);
        const lPositions = [
            { x: -0.85, z: 0.5 },
            { x: 0.85, z: 0.5 },
            { x: -0.85, z: -0.5 },
            { x: 0.85, z: -0.5 }
        ];
        lPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeo, legMat);
            leg.position.set(pos.x, -0.3, pos.z);
            legs.add(leg);
        });
        group.add(legs);

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.02;
            },
            explode: function(progress) {
                top.position.y = 0.3 + progress * 1.5;
                top.scale.setScalar(Math.max(0.001, 1 - progress));
                legs.children.forEach(leg => {
                    const dirX = leg.position.x > 0 ? 1 : -1;
                    const dirZ = leg.position.z > 0 ? 1 : -1;
                    leg.position.x += dirX * progress * 0.9;
                    leg.position.z += dirZ * progress * 0.9;
                    leg.position.y -= progress * 0.5;
                    leg.scale.setScalar(Math.max(0.001, 1 - progress));
                });
            }
        };
        return group;
    },

    _synthBook: function(settings) {
        const group = new THREE.Group();
        const coverColor = 0x1e3b8b;
        const pageColor = 0xfbfbfb;

        const coverCanvas = document.createElement("canvas");
        coverCanvas.width = 256;
        coverCanvas.height = 360;
        const ctx = coverCanvas.getContext("2d");
        ctx.fillStyle = "#1e3b8b";
        ctx.fillRect(0, 0, 256, 360);
        ctx.strokeStyle = "#eab308";
        ctx.lineWidth = 10;
        ctx.strokeRect(15, 15, 226, 330);
        ctx.fillStyle = "#eab308";
        ctx.font = "bold 28px serif";
        ctx.textAlign = "center";
        ctx.fillText("PHYSICS", 128, 120);
        ctx.font = "italic 18px serif";
        ctx.fillText("3D Simulator", 128, 160);
        ctx.font = "14px monospace";
        ctx.fillText("EDU-3D ENGINE", 128, 280);

        const coverTex = new THREE.CanvasTexture(coverCanvas);
        const coverTexMat = new THREE.MeshStandardMaterial({ map: coverTex });
        const spineMat = new THREE.MeshStandardMaterial({ color: 0x172554 });
        const pageMat = new THREE.MeshStandardMaterial({ color: pageColor, roughness: 0.9 });
        
        const frontCover = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.7, 0.04), coverTexMat);
        frontCover.position.set(0.6, 0, 0.1);
        group.add(frontCover);

        const backCover = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.7, 0.04), spineMat);
        backCover.position.set(0.6, 0, -0.1);
        group.add(backCover);

        const spine = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.7, 0.24), spineMat);
        spine.position.set(0, 0, 0);
        group.add(spine);

        const pages = new THREE.Mesh(new THREE.BoxGeometry(1.16, 1.64, 0.16), pageMat);
        pages.position.set(0.6, 0, 0);
        group.add(pages);

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.03;
            },
            explode: function(progress) {
                frontCover.position.z = 0.1 + progress * 1.5;
                frontCover.scale.setScalar(Math.max(0.001, 1 - progress));
                backCover.position.z = -0.1 - progress * 1.5;
                backCover.scale.setScalar(Math.max(0.001, 1 - progress));
                spine.position.x = -progress * 1.5;
                spine.scale.setScalar(Math.max(0.001, 1 - progress));
                pages.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthRobot: function(settings) {
        const group = new THREE.Group();
        const metalMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.7, roughness: 0.3 });
        const accentMat = new THREE.MeshStandardMaterial({ color: 0x4f46e5 });
        const visorMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 }); // glowing cyan

        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.0, 0.6), metalMat);
        torso.position.y = -0.2;
        group.add(torso);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.4), metalMat);
        head.position.y = 0.6;
        group.add(head);

        const visor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.42), visorMat);
        visor.position.set(0, 0.62, 0.01);
        group.add(visor);

        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.15, 12), accentMat);
        neck.position.y = 0.325;
        group.add(neck);

        const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.8, 12), metalMat);
        leftArm.position.set(-0.55, -0.2, 0);
        group.add(leftArm);

        const rightArm = leftArm.clone();
        rightArm.position.x = 0.55;
        group.add(rightArm);

        const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.9, 12), metalMat);
        leftLeg.position.set(-0.25, -1.15, 0);
        group.add(leftLeg);

        const rightLeg = leftLeg.clone();
        rightLeg.position.x = 0.25;
        group.add(rightLeg);

        group.userData = {
            animate: function(time, speedFactor) {
                leftArm.rotation.x = Math.sin(time * 2) * 0.4 * speedFactor;
                rightArm.rotation.x = -Math.sin(time * 2) * 0.4 * speedFactor;
                leftLeg.rotation.x = -Math.sin(time * 2) * 0.2 * speedFactor;
                rightLeg.rotation.x = Math.sin(time * 2) * 0.2 * speedFactor;
            },
            explode: function(progress) {
                torso.scale.setScalar(Math.max(0.001, 1 - progress));
                head.position.y = 0.6 + progress * 1.5;
                head.scale.setScalar(Math.max(0.001, 1 - progress));
                visor.position.y = 0.62 + progress * 1.6;
                visor.scale.setScalar(Math.max(0.001, 1 - progress));
                neck.scale.setScalar(Math.max(0.001, 1 - progress));
                leftArm.position.x = -0.55 - progress * 1.2;
                leftArm.scale.setScalar(Math.max(0.001, 1 - progress));
                rightArm.position.x = 0.55 + progress * 1.2;
                rightArm.scale.setScalar(Math.max(0.001, 1 - progress));
                leftLeg.position.y = -1.15 - progress * 1.2;
                leftLeg.scale.setScalar(Math.max(0.001, 1 - progress));
                rightLeg.position.y = -1.15 - progress * 1.2;
                rightLeg.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthGuitar: function(settings) {
        const group = new THREE.Group();
        const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.4 }); // body
        const neckMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 }); // fretboard
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });

        const body = new THREE.Group();
        const bodyBack = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.65, 0.15, 32), woodMat);
        bodyBack.rotation.x = Math.PI / 2;
        bodyBack.scale.set(1, 1.4, 1);
        body.add(bodyBack);

        const soundhole = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.16, 24), neckMat);
        soundhole.rotation.x = Math.PI / 2;
        soundhole.position.set(0, 0.2, 0.01);
        body.add(soundhole);
        group.add(body);

        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.6, 0.08), neckMat);
        neck.position.set(0, 1.3, 0);
        group.add(neck);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.08), woodMat);
        head.position.set(0, 2.2, 0);
        group.add(head);

        const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.06, 0.08), neckMat);
        bridge.position.set(0, -0.4, 0.08);
        group.add(bridge);

        const pegGeo = new THREE.SphereGeometry(0.03, 8, 8);
        for (let i = 0; i < 6; i++) {
            const peg = new THREE.Mesh(pegGeo, chromeMat);
            peg.position.set(i % 2 === 0 ? -0.12 : 0.12, 2.1 + Math.floor(i / 2) * 0.1, 0);
            group.add(peg);
        }

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.03;
                group.rotation.y = Math.sin(time * 0.2) * 0.1 * speedFactor;
            },
            explode: function(progress) {
                body.position.y = -progress * 1.5;
                body.scale.setScalar(Math.max(0.001, 1 - progress));
                neck.position.y = 1.3 + progress * 1.5;
                neck.scale.setScalar(Math.max(0.001, 1 - progress));
                head.position.y = 2.2 + progress * 2.0;
                head.scale.setScalar(Math.max(0.001, 1 - progress));
                bridge.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthBattery: function(settings) {
        const group = new THREE.Group();
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext("2d");
        const grad = ctx.createLinearGradient(0, 0, 512, 0);
        grad.addColorStop(0, "#065f46");
        grad.addColorStop(0.3, "#059669");
        grad.addColorStop(0.7, "#10b981");
        grad.addColorStop(1, "#34d399");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 64px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("BATTERY", 256, 160);
        ctx.fillText("+ 1.5V -", 256, 260);

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 15;
        ctx.strokeRect(100, 360, 312, 80);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(115, 375, 230, 50);

        const batteryTex = new THREE.CanvasTexture(canvas);
        const casingMat = new THREE.MeshStandardMaterial({ map: batteryTex });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 }); // Gold/Brass terminals
        
        const wrapper = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 2.0, 32), casingMat);
        group.add(wrapper);

        const posCap = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.15, 16), metalMat);
        posCap.position.y = 1.055;
        group.add(posCap);

        const negCap = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.05, 32), metalMat);
        negCap.position.y = -1.025;
        group.add(negCap);

        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.6 * speedFactor;
            },
            explode: function(progress) {
                wrapper.scale.set(1 + progress * 1.5, 1, 1 + progress * 1.5);
                wrapper.material.opacity = 1 - progress;
                wrapper.material.transparent = true;
                posCap.position.y = 1.055 + progress * 1.5;
                negCap.position.y = -1.025 - progress * 1.5;
                posCap.scale.setScalar(Math.max(0.001, 1 - progress));
                negCap.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthPhone: function(settings) {
        const group = new THREE.Group();
        const chassisMat = new THREE.MeshStandardMaterial({ color: 0x111827, metalness: 0.9, roughness: 0.1 });
        const screenCanvas = document.createElement("canvas");
        screenCanvas.width = 360;
        screenCanvas.height = 640;
        const ctx = screenCanvas.getContext("2d");
        ctx.fillStyle = "#020617";
        ctx.fillRect(0, 0, 360, 640);
        ctx.fillStyle = "rgba(139,92,246,0.15)";
        ctx.beginPath();
        ctx.arc(180, 240, 150, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "300 64px Space Grotesk, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("10:42", 180, 160);
        ctx.font = "500 20px Space Grotesk, sans-serif";
        ctx.fillText("Friday, June 19", 180, 200);

        ctx.fillStyle = "#06b6d4";
        ctx.beginPath();
        ctx.arc(180, 380, 45, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px sans-serif";
        ctx.fillText("3D", 180, 388);

        ctx.fillStyle = "rgba(255,255,255,0.1)";
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(40 + i * 80, 520, 50, 50);
        }

        const screenTexture = new THREE.CanvasTexture(screenCanvas);
        const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
        
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.08), chassisMat);
        group.add(body);

        const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.14, 2.14), screenMat);
        screen.position.set(0, 0, 0.041);
        group.add(screen);

        const camBump = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.04), chassisMat);
        camBump.position.set(-0.3, 0.75, -0.041);
        group.add(camBump);

        const lensGeo = new THREE.SphereGeometry(0.06, 16, 16);
        const lensMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.1 });
        const lens = new THREE.Mesh(lensGeo, lensMat);
        lens.scale.set(1, 1, 0.25);
        lens.position.set(-0.3, 0.75, -0.062);
        group.add(lens);

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.03;
                group.rotation.y = Math.sin(time * 0.3) * 0.2 * speedFactor;
            },
            explode: function(progress) {
                body.scale.setScalar(Math.max(0.001, 1 - progress));
                screen.position.z = 0.041 + progress * 1.5;
                screen.scale.setScalar(Math.max(0.001, 1 - progress));
                camBump.position.z = -0.041 - progress * 1.0;
                camBump.scale.setScalar(Math.max(0.001, 1 - progress));
                lens.position.z = -0.062 - progress * 1.1;
                lens.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthBrain: function(settings) {
        const group = new THREE.Group();
        const pinkMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.8 }); // Pinkish brain
        const networkMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.6 });

        const hemispheres = new THREE.Group();
        
        const leftHemiGeo = new THREE.SphereGeometry(0.8, 16, 16);
        leftHemiGeo.scale(1.2, 0.8, 0.75);
        const leftHemi = new THREE.Mesh(leftHemiGeo, pinkMat);
        leftHemi.position.set(-0.15, 0, 0);
        hemispheres.add(leftHemi);

        const rightHemi = leftHemi.clone();
        rightHemi.position.x = 0.15;
        hemispheres.add(rightHemi);
        
        group.add(hemispheres);

        const network = new THREE.Mesh(new THREE.SphereGeometry(0.9, 12, 12), networkMat);
        network.scale.set(1.4, 0.9, 0.9);
        group.add(network);

        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.3 * speedFactor;
            },
            explode: function(progress) {
                leftHemi.position.x = -0.15 - progress * 1.5;
                leftHemi.scale.setScalar(Math.max(0.001, 1 - progress));
                rightHemi.position.x = 0.15 + progress * 1.5;
                rightHemi.scale.setScalar(Math.max(0.001, 1 - progress));
                network.scale.setScalar(1 + progress * 1.5);
                networkMat.opacity = 0.6 * (1 - progress);
            }
        };
        return group;
    },

    _synthHeart: function(settings) {
        const group = new THREE.Group();
        const heartMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4, emissive: 0x450a0a, emissiveIntensity: 0.5 });
        const vesselMat = new THREE.MeshStandardMaterial({ color: 0x2563eb }); // Blue vessels
        
        const coreGroup = new THREE.Group();
        const mainSph1 = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), heartMat);
        mainSph1.position.set(-0.25, 0, 0);
        coreGroup.add(mainSph1);

        const mainSph2 = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), heartMat);
        mainSph2.position.set(0.25, 0, 0);
        coreGroup.add(mainSph2);

        const bottomCone = new THREE.Mesh(new THREE.ConeGeometry(0.68, 1.2, 32), heartMat);
        bottomCone.rotation.z = Math.PI;
        bottomCone.position.set(0, -0.6, 0);
        coreGroup.add(bottomCone);
        group.add(coreGroup);

        const vessels = new THREE.Group();
        const aorta = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.8, 16), heartMat);
        aorta.position.set(-0.2, 0.6, 0.1);
        aorta.rotation.z = -0.25;
        vessels.add(aorta);

        const venaCava = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16), vesselMat);
        venaCava.position.set(0.25, 0.6, -0.1);
        venaCava.rotation.z = 0.15;
        vessels.add(venaCava);
        group.add(vessels);

        group.userData = {
            animate: function(time, speedFactor) {
                // Heartbeat pulse simulation
                const beat = 1.0 + Math.max(0, Math.sin(time * 7.5 * speedFactor)) * 0.15;
                coreGroup.scale.set(beat, beat, beat);
                vessels.scale.set(beat, beat, beat);
                group.rotation.y = time * 0.2 * speedFactor;
            },
            explode: function(progress) {
                mainSph1.position.x = -0.25 - progress * 1.0;
                mainSph1.scale.setScalar(Math.max(0.001, 1 - progress));
                mainSph2.position.x = 0.25 + progress * 1.0;
                mainSph2.scale.setScalar(Math.max(0.001, 1 - progress));
                bottomCone.position.y = -0.6 - progress * 1.5;
                bottomCone.scale.setScalar(Math.max(0.001, 1 - progress));
                vessels.children.forEach(v => {
                    v.position.y += progress * 1.5;
                    v.scale.setScalar(Math.max(0.001, 1 - progress));
                });
            }
        };
        return group;
    },

    _synthAirplane: function(settings) {
        const group = new THREE.Group();
        const fuselageMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, metalness: 0.7, roughness: 0.3 });
        const wingMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.6, roughness: 0.4 }); // Blue wings
        const propellerMat = new THREE.MeshStandardMaterial({ color: 0x1f2937 });

        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.14, 2.5, 16), fuselageMat);
        body.rotation.x = Math.PI / 2;
        group.add(body);

        const wingL = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.4), wingMat);
        wingL.geometry.translate(-0.8, 0, 0);
        wingL.position.set(0, 0, 0.2);
        group.add(wingL);

        const wingR = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.04, 0.4), wingMat);
        wingR.geometry.translate(0.8, 0, 0);
        wingR.position.set(0, 0, 0.2);
        group.add(wingR);

        const tail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.3), wingMat);
        tail.geometry.translate(0, 0.25, 0);
        tail.position.set(0, 0, -1.1);
        group.add(tail);

        const noseCone = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.4, 16), wingMat);
        noseCone.rotation.x = Math.PI / 2;
        noseCone.position.set(0, 0, 1.45);
        group.add(noseCone);

        const propeller = new THREE.Group();
        propeller.position.set(0, 0, 1.66);
        const hub = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), propellerMat);
        propeller.add(hub);
        
        const bladeGeo = new THREE.BoxGeometry(0.7, 0.05, 0.015);
        const blade1 = new THREE.Mesh(bladeGeo, propellerMat);
        propeller.add(blade1);
        
        const blade2 = blade1.clone();
        blade2.rotation.z = Math.PI / 2;
        propeller.add(blade2);

        group.add(propeller);

        group.userData = {
            animate: function(time, speedFactor) {
                propeller.rotation.z = time * 30 * speedFactor;
                group.position.y = Math.sin(time * 0.8) * 0.05;
            },
            explode: function(progress) {
                body.scale.setScalar(Math.max(0.001, 1 - progress));
                wingL.position.x = -progress * 1.8;
                wingL.scale.setScalar(Math.max(0.001, 1 - progress));
                wingR.position.x = progress * 1.8;
                wingR.scale.setScalar(Math.max(0.001, 1 - progress));
                tail.position.y = progress * 1.5;
                tail.scale.setScalar(Math.max(0.001, 1 - progress));
                noseCone.position.z = 1.45 + progress * 1.2;
                noseCone.scale.setScalar(Math.max(0.001, 1 - progress));
                propeller.position.z = 1.66 + progress * 1.6;
                propeller.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthBridge: function(settings) {
        const group = new THREE.Group();
        const concreteMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.8 });
        const steelMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.8, roughness: 0.3 });
        const lineMat = new THREE.LineBasicMaterial({ color: 0xef4444, linewidth: 2 }); // Red suspension cables

        const roadDeck = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 0.6), concreteMat);
        roadDeck.position.y = -0.4;
        group.add(roadDeck);

        const towers = new THREE.Group();
        const towerGeo = new THREE.BoxGeometry(0.12, 1.4, 0.12);
        
        const towerL = new THREE.Mesh(towerGeo, concreteMat);
        towerL.position.set(-0.9, 0.3, 0);
        towers.add(towerL);

        const towerR = towerL.clone();
        towerR.position.x = 0.9;
        towers.add(towerR);
        group.add(towers);

        // Suspension Cables (Visual lines)
        const cables = new THREE.Group();
        const c1Points = [];
        for (let x = -1.8; x <= 1.8; x += 0.1) {
            // Parabolic shape
            const y = -0.4 + 1.1 * Math.pow(x / 1.8, 2);
            c1Points.push(new THREE.Vector3(x, y, 0));
        }
        const mainCableGeo = new THREE.BufferGeometry().setFromPoints(c1Points);
        const mainCable = new THREE.Line(mainCableGeo, lineMat);
        cables.add(mainCable);
        
        // Hanger lines
        for (let x = -1.7; x <= 1.7; x += 0.25) {
            const hCableY = -0.4 + 1.1 * Math.pow(x / 1.8, 2);
            const pts = [new THREE.Vector3(x, -0.4, 0), new THREE.Vector3(x, hCableY, 0)];
            cables.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
        }
        group.add(cables);

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.02;
            },
            explode: function(progress) {
                roadDeck.position.y = -0.4 - progress * 1.5;
                roadDeck.scale.setScalar(Math.max(0.001, 1 - progress));
                towerL.position.x = -0.9 - progress * 1.2;
                towerL.scale.setScalar(Math.max(0.001, 1 - progress));
                towerR.position.x = 0.9 + progress * 1.2;
                towerR.scale.setScalar(Math.max(0.001, 1 - progress));
                cables.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthSword: function(settings) {
        const group = new THREE.Group();
        const steelMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.9, roughness: 0.1 });
        const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.2 });
        const gripMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 }); // Leather

        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.2, 0.04), steelMat);
        blade.position.y = 0.8;
        group.add(blade);

        const tip = new THREE.Mesh(new THREE.ConeGeometry(0.126, 0.28, 4), steelMat);
        tip.rotation.y = Math.PI / 4;
        tip.scale.set(1.4, 1, 0.2);
        tip.position.y = 2.04;
        group.add(tip);

        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.08, 0.08), brassMat);
        guard.position.y = -0.34;
        group.add(guard);

        const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.5, 12), gripMat);
        grip.position.y = -0.63;
        group.add(grip);

        const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), brassMat);
        pommel.position.y = -0.93;
        group.add(pommel);

        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.4 * speedFactor;
                group.position.y = Math.sin(time * 0.5) * 0.04;
            },
            explode: function(progress) {
                blade.position.y = 0.8 + progress * 1.5;
                blade.scale.setScalar(Math.max(0.001, 1 - progress));
                tip.position.y = 2.04 + progress * 1.8;
                tip.scale.setScalar(Math.max(0.001, 1 - progress));
                guard.scale.setScalar(Math.max(0.001, 1 - progress));
                grip.position.y = -0.63 - progress * 1.0;
                grip.scale.setScalar(Math.max(0.001, 1 - progress));
                pommel.position.y = -0.93 - progress * 1.5;
                pommel.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthShield: function(settings) {
        const group = new THREE.Group();
        const metalMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.8, roughness: 0.2 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.1 });
        const emblemMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c }); // Red

        const plate = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.08, 32), metalMat);
        plate.rotation.x = Math.PI / 2;
        group.add(plate);

        const rim = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.05, 16, 64), goldMat);
        rim.position.z = 0.02;
        group.add(rim);

        const boss = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), goldMat);
        boss.scale.set(1, 1, 0.5);
        boss.position.z = 0.04;
        group.add(boss);

        const emblem = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.6, 0.03), emblemMat);
        emblem.position.z = 0.01;
        group.add(emblem);

        const emblemCross = emblem.clone();
        emblemCross.rotation.z = Math.PI / 2;
        group.add(emblemCross);

        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.3 * speedFactor;
            },
            explode: function(progress) {
                plate.scale.setScalar(Math.max(0.001, 1 - progress));
                rim.scale.setScalar(1 + progress * 1.5);
                boss.position.z = 0.04 + progress * 2.0;
                boss.scale.setScalar(Math.max(0.001, 1 - progress));
                emblem.position.y = progress * 1.5;
                emblem.scale.setScalar(Math.max(0.001, 1 - progress));
                emblemCross.position.x = -progress * 1.5;
                emblemCross.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthDice: function(settings) {
        const group = new THREE.Group();
        const faceMaterials = [];
        
        const pips = [
            [], // zero index
            [[0.5, 0.5]], // 1
            [[0.25, 0.25], [0.75, 0.75]], // 2
            [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]], // 3
            [[0.25, 0.25], [0.25, 0.75], [0.75, 0.25], [0.75, 0.75]], // 4
            [[0.25, 0.25], [0.25, 0.75], [0.5, 0.5], [0.75, 0.25], [0.75, 0.75]], // 5
            [[0.25, 0.25], [0.25, 0.5], [0.25, 0.75], [0.75, 0.25], [0.75, 0.5], [0.75, 0.75]] // 6
        ];

        for (let i = 1; i <= 6; i++) {
            const canvas = document.createElement("canvas");
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, 256, 256);
            ctx.fillStyle = "#dc2626"; // red pips
            pips[i].forEach(p => {
                ctx.beginPath();
                ctx.arc(p[0] * 256, p[1] * 256, 24, 0, Math.PI * 2);
                ctx.fill();
            });
            const tex = new THREE.CanvasTexture(canvas);
            faceMaterials.push(new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3 }));
        }

        const dice = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.5), faceMaterials);
        group.add(dice);

        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.x = time * 0.6 * speedFactor;
                group.rotation.y = time * 0.4 * speedFactor;
                group.position.y = Math.sin(time * 0.5) * 0.05;
            },
            explode: function(progress) {
                dice.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthHourglass: function(settings) {
        const group = new THREE.Group();
        const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.8 });
        const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8, roughness: 0.3 });
        const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, transmission: 0.9, roughness: 0 });
        const sandMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

        const capGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.08, 24);
        const topCap = new THREE.Mesh(capGeo, woodMat);
        topCap.position.y = 1.0;
        group.add(topCap);

        const bottomCap = topCap.clone();
        bottomCap.position.y = -1.0;
        group.add(bottomCap);

        const columns = new THREE.Group();
        const rodGeo = new THREE.CylinderGeometry(0.03, 0.03, 2.0, 8);
        for (let i = 0; i < 3; i++) {
            const angle = (i * Math.PI * 2) / 3;
            const rod = new THREE.Mesh(rodGeo, brassMat);
            rod.position.set(Math.sin(angle) * 0.7, 0, Math.cos(angle) * 0.7);
            columns.add(rod);
        }
        group.add(columns);

        const bulbGeo = new THREE.CylinderGeometry(0.55, 0.1, 0.9, 24);
        const topBulb = new THREE.Mesh(bulbGeo, glassMat);
        topBulb.position.y = 0.45;
        group.add(topBulb);

        const bottomBulb = topBulb.clone();
        bottomBulb.rotation.x = Math.PI;
        bottomBulb.position.y = -0.45;
        group.add(bottomBulb);

        const sands = new THREE.Group();
        const grainGeo = new THREE.SphereGeometry(0.024, 8, 8);
        for (let i = 0; i < 30; i++) {
            const grain = new THREE.Mesh(grainGeo, sandMat);
            grain.userData = {
                phase: Math.random() * Math.PI * 2,
                speed: 1.5 + Math.random() * 1.5
            };
            sands.add(grain);
        }
        group.add(sands);

        group.userData = {
            animate: function(time, speedFactor) {
                sands.children.forEach(g => {
                    const data = g.userData;
                    const elapsed = (time * data.speed + data.phase) % 2;
                    // sand falling through neck
                    g.position.y = 0.3 - elapsed * 0.6;
                    g.position.x = (Math.sin(time * 40 + data.phase) * 0.03) * (1 - elapsed/2);
                    g.position.z = (Math.cos(time * 40 + data.phase) * 0.03) * (1 - elapsed/2);
                });
            },
            explode: function(progress) {
                topCap.position.y = 1.0 + progress * 1.5;
                topCap.scale.setScalar(Math.max(0.001, 1 - progress));
                bottomCap.position.y = -1.0 - progress * 1.5;
                bottomCap.scale.setScalar(Math.max(0.001, 1 - progress));
                columns.children.forEach(r => {
                    const dir = r.position.clone().normalize();
                    r.position.addScaledVector(dir, progress * 1.2);
                    r.scale.setScalar(Math.max(0.001, 1 - progress));
                });
                topBulb.position.y = 0.45 + progress * 1.0;
                topBulb.scale.setScalar(Math.max(0.001, 1 - progress));
                bottomBulb.position.y = -0.45 - progress * 1.0;
                bottomBulb.scale.setScalar(Math.max(0.001, 1 - progress));
                sands.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthPyramid: function(settings) {
        const group = new THREE.Group();
        const stoneMat = new THREE.MeshStandardMaterial({ color: 0xd9b38c, roughness: 0.9 }); // Sandstone
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.1, emissive: 0x3b2302 });

        const layersGroup = new THREE.Group();
        const layerCount = 6;
        for (let i = 0; i < layerCount; i++) {
            const h = 0.25;
            const w = 2.0 - i * 0.32;
            const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), stoneMat);
            box.position.y = -0.8 + i * h;
            layersGroup.add(box);
        }
        group.add(layersGroup);

        const capstone = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.3, 4), goldMat);
        capstone.rotation.y = Math.PI / 4;
        capstone.position.y = -0.8 + layerCount * 0.25 + 0.05;
        group.add(capstone);

        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.2 * speedFactor;
            },
            explode: function(progress) {
                layersGroup.children.forEach((layer, idx) => {
                    layer.position.y = (-0.8 + idx * 0.25) - progress * (0.2 * (layerCount - idx));
                    layer.scale.setScalar(Math.max(0.001, 1 - progress));
                });
                capstone.position.y = 0.75 + progress * 2.0;
                capstone.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthSpring: function(settings) {
        const group = new THREE.Group();
        const coils = 8;
        const radius = 0.6;
        const segments = 200;
        const coilMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, metalness: 0.9, roughness: 0.1 });
        
        const pathPoints = [];
        for (let i = 0; i <= segments; i++) {
            const ratio = i / segments;
            const angle = ratio * coils * Math.PI * 2;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            const y = ratio * 2.0 - 1.0;
            pathPoints.push(new THREE.Vector3(x, y, z));
        }

        const curve = new THREE.CatmullRomCurve3(pathPoints);
        const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.08, 8, false);
        const spring = new THREE.Mesh(tubeGeo, coilMat);
        group.add(spring);

        group.userData = {
            animate: function(time, speedFactor) {
                // compress and expand spring
                const scaleY = 1.0 + Math.sin(time * 4 * speedFactor) * 0.25;
                spring.scale.y = scaleY;
            },
            explode: function(progress) {
                spring.scale.set(1 + progress * 2, Math.max(0.001, 1 - progress), 1 + progress * 2);
                coilMat.opacity = 1 - progress;
                coilMat.transparent = true;
            }
        };
        return group;
    },

    _synthPendulum: function(settings) {
        const group = new THREE.Group();
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, metalness: 0.8, roughness: 0.2 });
        const chromeMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.9, roughness: 0.1 });
        const stringMat = new THREE.LineBasicMaterial({ color: 0xffffff });

        const stand = new THREE.Group();
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 1.2), metalMat);
        base.position.y = -1.2;
        stand.add(base);

        const verticalRod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.4, 12), metalMat);
        verticalRod.position.set(-0.5, 0, 0);
        stand.add(verticalRod);

        const supportArm = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 12), metalMat);
        supportArm.rotation.z = Math.PI / 2;
        supportArm.position.set(-0.2, 1.2, 0);
        stand.add(supportArm);
        group.add(stand);

        const pivotGroup = new THREE.Group();
        pivotGroup.position.set(0.1, 1.2, 0);

        const bob = new THREE.Mesh(new THREE.SphereGeometry(0.24, 32, 32), chromeMat);
        bob.position.set(0, -1.8, 0);
        pivotGroup.add(bob);

        const pts = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -1.8, 0)];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const wire = new THREE.Line(lineGeo, stringMat);
        pivotGroup.add(wire);
        
        group.add(pivotGroup);

        group.userData = {
            animate: function(time, speedFactor) {
                // simple harmonic swing
                const maxAngle = 0.5; // rad
                const angle = maxAngle * Math.sin(time * 3.5 * speedFactor);
                pivotGroup.rotation.z = angle;
            },
            explode: function(progress) {
                stand.position.y = -progress * 1.5;
                stand.scale.setScalar(Math.max(0.001, 1 - progress));
                bob.position.y = -1.8 - progress * 1.5;
                bob.scale.setScalar(Math.max(0.001, 1 - progress));
                wire.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    },

    _synthDiamond: function(settings) {
        const group = new THREE.Group();
        const meshColor = 0x60a5fa;
        const gemGeo = new THREE.OctahedronGeometry(1.2, 1);
        const gemMat = new THREE.MeshPhysicalMaterial({
            color: meshColor,
            transparent: true,
            opacity: 0.3,
            transmission: 0.95,
            ior: 2.42, // diamond refractive index
            roughness: 0,
            metalness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0
        });

        const gem = new THREE.Mesh(gemGeo, gemMat);
        group.add(gem);

        const wireMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd, wireframe: true, transparent: true, opacity: 0.4 });
        const wire = new THREE.Mesh(gemGeo, wireMat);
        wire.scale.setScalar(1.002);
        group.add(wire);

        group.userData = {
            animate: function(time, speedFactor) {
                group.rotation.y = time * 0.3 * speedFactor;
                group.rotation.x = Math.sin(time * 0.1) * 0.15;
            },
            explode: function(progress) {
                gem.scale.setScalar(Math.max(0.001, 1 - progress));
                wire.scale.setScalar(1 + progress * 2.0);
                wireMat.opacity = 0.4 * (1 - progress);
            }
        };
        return group;
    },

    _synthCircuit: function(settings) {
        const group = new THREE.Group();
        const pcbMat = new THREE.MeshStandardMaterial({ color: 0x065f46, roughness: 0.4 }); // Green PCB
        const traceMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 }); // Gold traces
        const chipMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 }); // Black chip
        const capacitorMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8 }); // Blue capacitor
        const resistorMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12 }); // Brown resistor

        const board = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.06, 2.0), pcbMat);
        board.position.y = -0.15;
        group.add(board);

        // Traces on board (CanvasTexture)
        const traceCanvas = document.createElement("canvas");
        traceCanvas.width = 256;
        traceCanvas.height = 256;
        const ctx = traceCanvas.getContext("2d");
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = "#eab308";
        ctx.lineWidth = 4;
        // Draw grid traces
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.moveTo(32 + i * 28, 20);
            ctx.lineTo(32 + i * 28, 236);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(20, 32 + i * 28);
            ctx.lineTo(236, 32 + i * 28);
            ctx.stroke();
        }

        const traceTex = new THREE.CanvasTexture(traceCanvas);
        const tracePlaneMat = new THREE.MeshBasicMaterial({ map: traceTex, transparent: true });
        const tracePlane = new THREE.Mesh(new THREE.PlaneGeometry(1.96, 1.96), tracePlaneMat);
        tracePlane.rotation.x = -Math.PI / 2;
        tracePlane.position.y = -0.118;
        group.add(tracePlane);

        const components = new THREE.Group();
        
        // Microchip
        const chip = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.12, 0.7), chipMat);
        chip.position.set(0, -0.06, 0);
        components.add(chip);

        // Cylindrical capacitor
        const capacitor = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.5, 12), capacitorMat);
        capacitor.position.set(-0.6, 0.1, 0.6);
        components.add(capacitor);

        // Resistor box
        const resistor = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.16, 0.16), resistorMat);
        resistor.position.set(0.6, -0.04, -0.6);
        components.add(resistor);
        
        group.add(components);

        group.userData = {
            animate: function(time, speedFactor) {
                group.position.y = Math.sin(time * 0.4) * 0.03;
            },
            explode: function(progress) {
                board.position.y = -0.15 - progress * 1.5;
                board.scale.setScalar(Math.max(0.001, 1 - progress));
                tracePlane.position.y = -0.118 - progress * 1.45;
                tracePlane.scale.setScalar(Math.max(0.001, 1 - progress));
                chip.position.y = -0.06 + progress * 1.5;
                chip.scale.setScalar(Math.max(0.001, 1 - progress));
                capacitor.position.y = 0.1 + progress * 1.6;
                capacitor.position.x = -0.6 - progress * 0.8;
                capacitor.scale.setScalar(Math.max(0.001, 1 - progress));
                resistor.position.y = -0.04 + progress * 1.4;
                resistor.position.x = 0.6 + progress * 0.8;
                resistor.scale.setScalar(Math.max(0.001, 1 - progress));
            }
        };
        return group;
    }
};

// Expose globally
window.EduGenerators = EduGenerators;
