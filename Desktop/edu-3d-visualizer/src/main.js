// ==========================================================================
// Edu3D Main Application Controller (Enhanced with Instrument Math Displays)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize 3D Engine
    EduEngine.init("canvas-container");
    
    // Bind Raycasting Click Callback
    EduEngine.onNodeClicked = (nodeData) => {
        showToast(`${nodeData.name}: ${nodeData.desc}`);
    };
    
    // State Tracker
    let activeObjectId = null;
    let activeObjectSettings = {};
    
    // Hide Loader
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 800);
    }
    
    // 2. Populate Left Sidebar Directory
    populateCategoryLists();
    
    // 3. UI Element References
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const autocompleteList = document.getElementById("autocomplete-list");
    
    const noSelectionPanel = document.getElementById("no-selection-panel");
    const selectionPanel = document.getElementById("selection-panel");
    
    const objCategory = document.getElementById("obj-category");
    const objName = document.getElementById("obj-name");
    const objFormula = document.getElementById("obj-formula");
    const objDesc = document.getElementById("obj-desc");
    
    const latticeDetailsSection = document.getElementById("lattice-details");
    const latCoordination = document.getElementById("lat-coordination");
    const latEfficiency = document.getElementById("lat-efficiency");
    const latAtomCount = document.getElementById("lat-atom-count");
    const latExamples = document.getElementById("lat-examples");
    
    const objProperties = document.getElementById("obj-properties");
    const controlsContainer = document.getElementById("dynamic-controls-container");
    
    const materialSelect = document.getElementById("material-select");
    const toggleOrbitsCheckbox = document.getElementById("toggle-orbits");
    const toggleLabelsCheckbox = document.getElementById("toggle-labels");
    
    const explodeBtn = document.getElementById("explode-btn");
    const resetCamBtn = document.getElementById("reset-cam-btn");
    
    const playPauseBtn = document.getElementById("play-pause-btn");
    const simSpeedSlider = document.getElementById("sim-speed-slider");
    const speedVal = document.getElementById("speed-val");
    
    const gridHelperBtn = document.getElementById("toggle-grid-helper");
    const autoRotateBtn = document.getElementById("toggle-auto-rotate");
    
    const helpBtn = document.getElementById("help-btn");
    const helpModal = document.getElementById("help-modal");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // Initialize Lucide Icons
    lucide.createIcons();

    function applyTheme(isLight) {
        document.documentElement.setAttribute("data-theme", isLight ? "light" : "dark");
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute("aria-pressed", String(isLight));
            themeToggleBtn.title = isLight ? "Switch to dark mode" : "Switch to light mode";
        }
        localStorage.setItem("edu3d-theme", isLight ? "light" : "dark");
    }

    const savedTheme = localStorage.getItem("edu3d-theme") || "dark";
    applyTheme(savedTheme === "light");
    
    // ======================================================================
    // Accordion Toggle
    // ======================================================================
    document.querySelectorAll(".category-title").forEach(title => {
        title.addEventListener("click", () => {
            const group = title.parentElement;
            group.classList.toggle("collapsed");
        });
    });
    
    // ======================================================================
    // Load Model Action
    // ======================================================================
    function loadObject(objectId, customObj = null) {
        let dbItem = customObj || EduDatabase[objectId];
        if (!dbItem) return;
        
        activeObjectId = objectId;
        activeObjectSettings = {};
        
        // Reset sidebar active states
        document.querySelectorAll(".category-items li").forEach(li => {
            li.classList.remove("active");
            if (li.getAttribute("data-id") === objectId) {
                li.classList.add("active");
            }
        });
        
        // A. Assemble Settings object & Default parameters
        dbItem.controls.forEach(ctrl => {
            activeObjectSettings[camelCase(ctrl.id)] = ctrl.value;
        });
        
        // B. Generate Model
        let modelGroup = null;
        if (dbItem.type === 'atom') {
            modelGroup = EduGenerators.createAtom(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'molecule') {
            modelGroup = EduGenerators.createMolecule(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'lattice') {
            modelGroup = EduGenerators.createLattice(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'lattice_nacl') {
            modelGroup = EduGenerators.createLatticeNaCl(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'space') {
            modelGroup = EduGenerators.createSpaceObject(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'physics') {
            modelGroup = EduGenerators.createPhysicsSetup(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'instrument_vernier') {
            modelGroup = EduGenerators.createVernierCaliper(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'instrument_optics') {
            modelGroup = EduGenerators.createRayOptics(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'instrument_magnifier') {
            modelGroup = EduGenerators.createMagnifyingGlass(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'math') {
            modelGroup = EduGenerators.createMathShape(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'fallback') {
            modelGroup = EduGenerators.createFallbackVisual(dbItem.name, activeObjectSettings);
        }
        
        if (modelGroup) {
            EduEngine.loadModel(modelGroup);
        }
        
        // C. Populate Right Panel details
        noSelectionPanel.classList.add("hidden");
        selectionPanel.classList.remove("hidden");
        
        objCategory.textContent = dbItem.category;
        objName.textContent = dbItem.name;
        objFormula.textContent = dbItem.formula || dbItem.symbol || "";
        objDesc.textContent = dbItem.description;
        
        // Crystalline details table
        if (dbItem.category === 'lattices' && dbItem.latticeDetails) {
            latticeDetailsSection.classList.remove("hidden");
            latCoordination.textContent = dbItem.latticeDetails.coordination;
            latEfficiency.textContent = dbItem.latticeDetails.efficiency;
            latAtomCount.textContent = dbItem.latticeDetails.atomCount;
            latExamples.textContent = dbItem.latticeDetails.examples;
        } else {
            latticeDetailsSection.classList.add("hidden");
        }
        
        // Stats grid
        objProperties.innerHTML = "";
        Object.entries(dbItem.properties).forEach(([key, val]) => {
            const statBox = document.createElement("div");
            statBox.className = "stat-box";
            statBox.innerHTML = `
                <span class="stat-label">${key}</span>
                <span class="stat-value" id="prop-${camelCase(key.replace(/\s+/g, '-'))}">${val}</span>
            `;
            objProperties.appendChild(statBox);
        });
        
        // Build Sliders in real-time
        buildDynamicControls(dbItem.controls);
        
        // Add custom visual calculations box for instruments
        appendCustomInstrumentReadouts(dbItem.id);
        
        // Explode view button availability
        if (modelGroup && modelGroup.userData.explode) {
            explodeBtn.removeAttribute("disabled");
            explodeBtn.classList.remove("hidden");
        } else {
            explodeBtn.setAttribute("disabled", "true");
            explodeBtn.classList.add("hidden");
        }
        
        // Apply rendering toggles
        EduEngine.toggleOrbits(toggleOrbitsCheckbox.checked);
        
        showToast(`Generated: ${dbItem.name}`);
    }
    
    // Build Sidebar Lists
    function populateCategoryLists() {
        const categories = {
            chemistry: document.getElementById("cat-chemistry"),
            lattices: document.getElementById("cat-lattices"),
            astronomy: document.getElementById("cat-astronomy"),
            physics: document.getElementById("cat-physics"),
            mathematics: document.getElementById("cat-mathematics")
        };
        
        Object.values(categories).forEach(ul => { if (ul) ul.innerHTML = ""; });
        
        Object.values(EduDatabase).forEach(item => {
            const ul = categories[item.category];
            if (ul) {
                const li = document.createElement("li");
                li.setAttribute("data-id", item.id);
                
                let iconName = "atom";
                if (item.category === "lattices") iconName = "grid-3x3";
                else if (item.category === "astronomy") iconName = "globe";
                else if (item.category === "physics" && (item.id.includes("caliper") || item.id.includes("ray"))) iconName = "wrench"; // instrument icon
                else if (item.category === "physics") iconName = "activity";
                else if (item.category === "mathematics") iconName = "triangle";
                
                li.innerHTML = `
                    <i data-lucide="${iconName}" class="item-icon"></i>
                    <span>${item.name}</span>
                `;
                li.addEventListener("click", () => loadObject(item.id));
                ul.appendChild(li);
            }
        });
        
        lucide.createIcons();
    }
    
    // Dynamic controls slider builder
    function buildDynamicControls(controlsData) {
        controlsContainer.innerHTML = "";
        
        if (!controlsData || controlsData.length === 0) {
            controlsContainer.innerHTML = "<p class='text-muted' style='font-size:12px;'>No adjustments available for this object.</p>";
            return;
        }
        
        controlsData.forEach(ctrl => {
            const group = document.createElement("div");
            group.className = "slider-group";
            
            const camelId = camelCase(ctrl.id);
            const initialVal = activeObjectSettings[camelId];
            
            group.innerHTML = `
                <div class="slider-header">
                    <span>${ctrl.label}</span>
                    <span id="val-${ctrl.id}">${initialVal.toFixed(ctrl.step % 1 === 0 ? 0 : 2)}${ctrl.unit || ""}</span>
                </div>
                <input type="range" id="input-${ctrl.id}" min="${ctrl.min}" max="${ctrl.max}" step="${ctrl.step}" value="${initialVal}">
            `;
            
            const input = group.querySelector("input");
            input.addEventListener("input", (e) => {
                const val = parseFloat(e.target.value);
                activeObjectSettings[camelId] = val;
                
                document.getElementById(`val-${ctrl.id}`).textContent = `${val.toFixed(ctrl.step % 1 === 0 ? 0 : 2)}${ctrl.unit || ""}`;
                
                // Live reload model
                reloadActiveModel();
                
                // Live update custom readout values
                updateCustomInstrumentReadouts();
            });
            
            controlsContainer.appendChild(group);
        });
    }
    
    // Append visual calculations cards for lab practicals
    function appendCustomInstrumentReadouts(id) {
        // Remove existing readout card if present
        const oldCard = document.getElementById("custom-readout-card");
        if (oldCard) oldCard.remove();
        
        if (id !== "vernier_caliper" && id !== "ray_optics" && id !== "magnifying_glass") return;
        
        const card = document.createElement("div");
        card.id = "custom-readout-card";
        card.className = "info-section";
        card.style.marginTop = "20px";
        card.style.padding = "14px";
        card.style.background = "rgba(255,255,255,0.03)";
        card.style.border = "1px solid rgba(255,255,255,0.06)";
        card.style.borderRadius = "8px";
        
        if (id === "vernier_caliper") {
            card.innerHTML = `
                <h4>Vernier Measurement Readout</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Main Scale Reading (MSR): <span id="read-msr" style="color:var(--cyan);font-weight:bold;">0.0 mm</span></div>
                    <div>Vernier Coincidence (VC): <span id="read-vc" style="color:var(--cyan);font-weight:bold;">0</span></div>
                    <div>Least Count (LC): <span style="color:var(--text-secondary);">0.1 mm</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Total Reading = MSR + (VC × LC)</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-total">0.0 mm</div>
                </div>
            `;
        } else if (id === "ray_optics") {
            card.innerHTML = `
                <h4>Optics Ray Calculations</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Object Distance (u): <span id="read-u" style="color:var(--violet);font-weight:bold;">-3.00 m</span></div>
                    <div>Focal Length (f): <span id="read-f" style="color:var(--violet);font-weight:bold;">1.50 m</span></div>
                    <div>Image Distance (v): <span id="read-v" style="color:var(--cyan);font-weight:bold;">3.00 m</span></div>
                    <div>Magnification (m): <span id="read-m" style="color:var(--cyan);font-weight:bold;">-1.00x</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Image Nature:</div>
                    <div style="font-size:13px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-nature">Real & Inverted</div>
                </div>
            `;
        } else if (id === "magnifying_glass") {
            card.innerHTML = `
                <h4>Magnifier Optics Formula</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Lens Height: <span id="read-height" style="color:var(--cyan);font-weight:bold;">2.0 units</span></div>
                    <div>Power Factor (M): <span id="read-power" style="color:var(--cyan);font-weight:bold;">2.8x</span></div>
                    <div>Near Point (D): <span style="color:var(--text-secondary);">25 cm</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Magnification Model:</div>
                    <div style="font-size:13px;color:var(--cyan);font-weight:bold;margin-top:4px;">Virtual, Upright & Magnified</div>
                </div>
            `;
        }
        
        controlsContainer.parentNode.appendChild(card);
        updateCustomInstrumentReadouts();
    }
    
    // Live update calculations cards
    function updateCustomInstrumentReadouts() {
        if (activeObjectId === "vernier_caliper") {
            const size = activeObjectSettings.objectSize; // 0 to 60 mm
            const msr = Math.floor(size); // Main scale reading (truncated mm)
            const vc = Math.round((size - msr) * 10); // Vernier coincidence (division count)
            const total = msr + (vc * 0.1);
            
            const msrSpan = document.getElementById("read-msr");
            const vcSpan = document.getElementById("read-vc");
            const totalSpan = document.getElementById("read-total");
            
            if (msrSpan) msrSpan.textContent = `${msr}.0 mm`;
            if (vcSpan) vcSpan.textContent = `${vc}`;
            if (totalSpan) totalSpan.textContent = `= ${msr} + (${vc} × 0.1) = ${total.toFixed(1)} mm`;
            
            // Sync with stats panel
            const propVal = document.getElementById("prop-calculated-reading");
            if (propVal) propVal.textContent = `${total.toFixed(1)} mm`;
            
        } else if (activeObjectId === "ray_optics") {
            const u = activeObjectSettings.objectDist; // positive number magnitude
            const f = activeObjectSettings.focalLen;
            
            // v = (u*f)/(u-f) - Cartesian sign convention: object is placed at -u.
            // 1/v - 1/(-u) = 1/f => 1/v = 1/f - 1/u => v = (u*f)/(u-f)
            let v = 0;
            let m = 0;
            let nature = "";
            
            if (Math.abs(u - f) < 0.05) {
                v = Infinity;
                m = Infinity;
                nature = "Image formed at Infinity";
            } else {
                v = (u * f) / (u - f);
                m = v / -u; // negative magnification represents inverted image
                nature = v > 0 ? "Real & Inverted" : "Virtual & Erect";
            }
            
            const uSpan = document.getElementById("read-u");
            const fSpan = document.getElementById("read-f");
            const vSpan = document.getElementById("read-v");
            const mSpan = document.getElementById("read-m");
            const natSpan = document.getElementById("read-nature");
            
            if (uSpan) uSpan.textContent = `-${u.toFixed(2)} m`;
            if (fSpan) fSpan.textContent = `${f.toFixed(2)} m`;
            if (vSpan) vSpan.textContent = v === Infinity ? "Infinity" : `${v.toFixed(2)} m`;
            if (mSpan) mSpan.textContent = m === Infinity ? "Infinity" : `${m.toFixed(2)}x`;
            if (natSpan) natSpan.textContent = nature;
            
            // Sync with properties stats grid
            const propV = document.getElementById("prop-calculated-image-(v)");
            const propM = document.getElementById("prop-magnification-(m)");
            const propN = document.getElementById("prop-image-nature");
            
            if (propV) propV.textContent = v === Infinity ? "Infinity" : `${v.toFixed(2)} m`;
            if (propM) propM.textContent = m === Infinity ? "Infinity" : `${m.toFixed(2)}x`;
            if (propN) propN.textContent = nature;
            
        } else if (activeObjectId === "magnifying_glass") {
            const h = activeObjectSettings.lensHeight;
            const p = activeObjectSettings.glassPower;
            
            const hSpan = document.getElementById("read-height");
            const pSpan = document.getElementById("read-power");
            
            if (hSpan) hSpan.textContent = `${h.toFixed(1)} units`;
            if (pSpan) pSpan.textContent = `${p.toFixed(1)}x`;
        }
    }
    
    // Live reloader to update Three.js parameters on slider drag
    function reloadActiveModel() {
        if (!activeObjectId || !EduEngine.currentModelGroup) return;
        
        const rx = EduEngine.currentModelGroup.rotation.x;
        const ry = EduEngine.currentModelGroup.rotation.y;
        const rz = EduEngine.currentModelGroup.rotation.z;
        
        let dbItem = EduDatabase[activeObjectId];
        let modelGroup = null;
        
        if (!dbItem) {
            if (activeObjectId.startsWith("custom_")) {
                dbItem = activeObjectSettings.customDbItem;
            }
        }
        
        if (!dbItem) return;
        
        if (dbItem.type === 'atom') {
            modelGroup = EduGenerators.createAtom(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'molecule') {
            modelGroup = EduGenerators.createMolecule(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'lattice') {
            modelGroup = EduGenerators.createLattice(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'lattice_nacl') {
            modelGroup = EduGenerators.createLatticeNaCl(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'space') {
            modelGroup = EduGenerators.createSpaceObject(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'physics') {
            modelGroup = EduGenerators.createPhysicsSetup(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'instrument_vernier') {
            modelGroup = EduGenerators.createVernierCaliper(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'instrument_optics') {
            modelGroup = EduGenerators.createRayOptics(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'instrument_magnifier') {
            modelGroup = EduGenerators.createMagnifyingGlass(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'math') {
            modelGroup = EduGenerators.createMathShape(dbItem, activeObjectSettings);
        } else if (dbItem.type === 'fallback') {
            modelGroup = EduGenerators.createFallbackVisual(dbItem.name, activeObjectSettings);
        }
        
        if (modelGroup) {
            EduEngine.scene.remove(EduEngine.currentModelGroup);
            EduEngine.currentModelGroup = modelGroup;
            EduEngine.scene.add(modelGroup);
            modelGroup.rotation.set(rx, ry, rz);
            
            EduEngine.backupOriginalMaterials(modelGroup);
            EduEngine.applyMaterialMode(EduEngine.currentMaterialMode);
            EduEngine.toggleOrbits(toggleOrbitsCheckbox.checked);
        }
    }
    
    // ======================================================================
    // Search & Autocomplete
    // ======================================================================
    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        if (query === "") {
            autocompleteList.classList.add("hidden");
            return;
        }
        
        const matches = Object.values(EduDatabase).filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.id.toLowerCase().includes(query) ||
            (item.symbol && item.symbol.toLowerCase().includes(query)) ||
            (item.formula && item.formula.toLowerCase().includes(query))
        );
        
        autocompleteList.innerHTML = "";
        
        if (matches.length > 0) {
            autocompleteList.classList.remove("hidden");
            matches.slice(0, 5).forEach(match => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span>${match.name}</span>
                    <span class="match-cat">${match.category}</span>
                `;
                li.addEventListener("click", () => {
                    loadObject(match.id);
                    searchInput.value = match.name;
                    autocompleteList.classList.add("hidden");
                });
                autocompleteList.appendChild(li);
            });
        } else {
            autocompleteList.classList.remove("hidden");
            const li = document.createElement("li");
            li.innerHTML = `
                <span>Procedurally Generate: <strong>"${e.target.value}"</strong></span>
                <span class="match-cat" style="background:rgba(139,92,246,0.2);color:#8b5cf6;">AI 3D</span>
            `;
            li.addEventListener("click", () => {
                triggerProceduralGeneration(e.target.value);
                autocompleteList.classList.add("hidden");
            });
            autocompleteList.appendChild(li);
        }
    });
    
    document.addEventListener("click", (e) => {
        if (e.target !== searchInput) {
            autocompleteList.classList.add("hidden");
        }
    });
    
    searchBtn.addEventListener("click", () => {
        performSearch();
    });
    
    searchInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (query === "") return;
        
        const matchedId = Object.keys(EduDatabase).find(key => 
            key === query || 
            EduDatabase[key].name.toLowerCase() === query ||
            (EduDatabase[key].symbol && EduDatabase[key].symbol.toLowerCase() === query) ||
            (EduDatabase[key].formula && EduDatabase[key].formula.toLowerCase() === query)
        );
        
        if (matchedId) {
            loadObject(matchedId);
        } else {
            const fuzzyMatch = Object.values(EduDatabase).find(item => 
                item.name.toLowerCase().includes(query)
            );
            if (fuzzyMatch) {
                loadObject(fuzzyMatch.id);
                searchInput.value = fuzzyMatch.name;
            } else {
                triggerProceduralGeneration(searchInput.value);
            }
        }
        autocompleteList.classList.add("hidden");
    }
    
    function triggerProceduralGeneration(queryText) {
        loader.classList.remove("hidden");
        document.querySelector(".loader-text").textContent = `Procedurally assembling mesh for: "${queryText}"...`;
        
        setTimeout(() => {
            loader.classList.add("hidden");
            const safeId = "custom_" + queryText.toLowerCase().replace(/[^a-z0-9]/g, "_");
            const prettyName = queryText.charAt(0).toUpperCase() + queryText.slice(1);
            
            const customDbItem = {
                id: safeId,
                name: prettyName,
                symbol: "AI-3D",
                category: "Custom",
                description: `Procedural visualizer of '${prettyName}'. This 3D representation showcases the geometric vector network, node connections, and orbital energy paths characterizing the simulated dynamics of a standard ${prettyName} concept. In educational models, this illustrates how individual nodes interact within a closed complex system.`,
                properties: {
                    "Type": "Procedural Fallback",
                    "System State": "Stable",
                    "Data Nodes": "Interactive",
                    "Vector Symmetry": "Isotropic"
                },
                controls: [
                    { id: "node-speed", label: "Rotation Vector", type: "slider", min: 0.1, max: 2, step: 0.1, value: 1.0, unit: " rad/s" },
                    { id: "node-scale", label: "Hologram Scale", type: "slider", min: 0.5, max: 2.0, step: 0.1, value: 1.2, unit: "x" }
                ],
                type: "fallback"
            };
            
            activeObjectSettings.customDbItem = customDbItem;
            loadObject(safeId, customDbItem);
        }, 1200);
    }
    
    // ======================================================================
    // Sidebar Controls
    // ======================================================================
    materialSelect.addEventListener("change", (e) => {
        EduEngine.applyMaterialMode(e.target.value);
        showToast(`Visual style: ${e.target.options[e.target.selectedIndex].text}`);
    });
    
    toggleOrbitsCheckbox.addEventListener("change", (e) => {
        EduEngine.toggleOrbits(e.target.checked);
    });
    
    explodeBtn.addEventListener("click", () => {
        explodeBtn.setAttribute("disabled", "true");
        showToast("Exploding model view...");
        EduEngine.explodeModel(() => {
            explodeBtn.removeAttribute("disabled");
        });
    });
    
    resetCamBtn.addEventListener("click", () => {
        EduEngine.resetCamera();
        showToast("Camera position reset");
    });
    
    // ======================================================================
    // Bottom Bar Action Triggers
    // ======================================================================
    playPauseBtn.addEventListener("click", () => {
        const isRunning = EduEngine.togglePlay();
        playPauseBtn.classList.toggle("active", isRunning);
        
        const icon = playPauseBtn.querySelector("i");
        if (isRunning) {
            icon.setAttribute("data-lucide", "pause");
            showToast("Simulation resumed");
        } else {
            icon.setAttribute("data-lucide", "play");
            showToast("Simulation paused");
        }
        lucide.createIcons();
    });
    
    simSpeedSlider.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        EduEngine.setSpeed(val);
        speedVal.textContent = `${val.toFixed(1)}x`;
    });
    
    gridHelperBtn.addEventListener("click", () => {
        gridHelperBtn.classList.toggle("active");
        const active = gridHelperBtn.classList.contains("active");
        EduEngine.toggleGrid(active);
        showToast(active ? "Grid helper visible" : "Grid helper hidden");
    });
    
    autoRotateBtn.addEventListener("click", () => {
        autoRotateBtn.classList.toggle("active");
        EduEngine.autoRotateCamera = autoRotateBtn.classList.contains("active");
        showToast(EduEngine.autoRotateCamera ? "Auto-Rotate enabled" : "Auto-Rotate disabled");
    });
    
    // ======================================================================
    // Theme Toggle
    // ======================================================================
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const nextTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
            applyTheme(nextTheme === "light");
            showToast(nextTheme === "light" ? "Light theme enabled" : "Dark theme enabled");
        });
    }

    // ======================================================================
    // Help Modal
    // ======================================================================
    helpBtn.addEventListener("click", () => {
        helpModal.classList.remove("hidden");
    });
    
    closeModalBtn.addEventListener("click", () => {
        helpModal.classList.add("hidden");
    });
    
    helpModal.addEventListener("click", (e) => {
        if (e.target === helpModal) {
            helpModal.classList.add("hidden");
        }
    });
    
    // ======================================================================
    // Utility Helpers
    // ======================================================================
    function camelCase(str) {
        return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
    
    function showToast(message) {
        const toast = document.getElementById("toast-notification");
        const msgSpan = document.getElementById("toast-message");
        if (!toast || !msgSpan) return;
        
        msgSpan.innerHTML = message;
        toast.classList.remove("hidden");
        
        if (window.toastTimeout) {
            clearTimeout(window.toastTimeout);
        }
        
        window.toastTimeout = setTimeout(() => {
            toast.classList.add("hidden");
        }, 3200);
    }
    
    // Load default object: Earth on initial start (showing off the new graphics!)
    setTimeout(() => {
        loadObject("earth");
        gridHelperBtn.classList.add("active");
        EduEngine.toggleGrid(true);
    }, 1200);
});
