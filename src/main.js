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
    const toggleMoonsCheckbox = document.getElementById("toggle-moons");
    
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
        if (dbItem && dbItem.category === 'astronomy') {
            activeObjectSettings.showMoons = true;
        }
        
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
        let modelGroup = generateModel(dbItem, activeObjectSettings);
        
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
        
        const allowedIds = [
            "vernier_caliper", "ray_optics", "magnifying_glass", "ammeter", "voltmeter", 
            "galvanometer", "multimeter", "spring_balance", "stopwatch", "meter_scale", 
            "spherometer", "spectrometer", "travelling_microscope", "resonance_tube", 
            "microscope", "telescope", "screw_gauge", "metre_bridge"
        ];
        if (!allowedIds.includes(id)) return;
        
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
        } else if (id === "ammeter") {
            card.innerHTML = `
                <h4>Ammeter Circuit Formula</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Measured Current (I): <span id="read-current" style="color:var(--cyan);font-weight:bold;">0.00 A</span></div>
                    <div>Galvanometer Coil (Rg): <span style="color:var(--text-secondary);">5.00 Ω</span></div>
                    <div>Shunt Resistance (Rs): <span style="color:var(--text-secondary);">0.05 Ω</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Voltage across Ammeter (V):</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-ammeter-volt">0.00 V</div>
                </div>
            `;
        } else if (id === "voltmeter") {
            card.innerHTML = `
                <h4>Voltmeter multiplier Formula</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Measured Voltage (V): <span id="read-voltage" style="color:var(--cyan);font-weight:bold;">0.0 V</span></div>
                    <div>Full Deflection (Ig): <span style="color:var(--text-secondary);">10.0 mA</span></div>
                    <div>Coil Resistance (Rg): <span style="color:var(--text-secondary);">50.0 Ω</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Series Multiplier Resistance (R):</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-voltmeter-res">0.0 Ω</div>
                </div>
            `;
        } else if (id === "galvanometer") {
            card.innerHTML = `
                <h4>Galvanometer current Formula</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Scale Deflection (θ): <span id="read-deflect" style="color:var(--cyan);font-weight:bold;">0 div</span></div>
                    <div>Figure of Merit (k): <span style="color:var(--text-secondary);">20.0 μA/div</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Equivalent Current (I = k·θ):</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-galvo-current">0.0 μA</div>
                </div>
            `;
        } else if (id === "multimeter") {
            card.innerHTML = `
                <h4>Multimeter function Readout</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Mode Selector: <span id="read-multi-mode" style="color:var(--cyan);font-weight:bold;">DC Volts</span></div>
                    <div>Signal Strength: <span id="read-multi-strength" style="color:var(--cyan);font-weight:bold;">0%</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">LCD Display Output:</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-multi-disp">0.00 V</div>
                </div>
            `;
        } else if (id === "spring_balance") {
            card.innerHTML = `
                <h4>Hooke's Law spring balance</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Applied Force (F): <span id="read-spring-force" style="color:var(--cyan);font-weight:bold;">0.0 N</span></div>
                    <div>Spring Constant (k): <span style="color:var(--text-secondary);">2.0 N/cm</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Spring Extension (x = F/k):</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-spring-ext">0.0 cm</div>
                    <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">Equivalent Mass (m): <span id="read-spring-mass">0 g</span></div>
                </div>
            `;
        } else if (id === "stopwatch") {
            card.innerHTML = `
                <h4>Time interval Readout</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Slider Interval: <span id="read-stopwatch-val" style="color:var(--cyan);font-weight:bold;">0.0 s</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Time elapsed:</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-stopwatch-time">00:00.0</div>
                </div>
            `;
        } else if (id === "meter_scale") {
            card.innerHTML = `
                <h4>Metre Scale / Ruler info</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Scale Length (L): <span id="read-ruler-len" style="color:var(--cyan);font-weight:bold;">1.0 m</span></div>
                    <div>Least Count: <span style="color:var(--text-secondary);">1 mm (0.1 cm)</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Divisions count:</div>
                    <div style="font-size:13px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-ruler-div">1000 divisions</div>
                </div>
            `;
        } else if (id === "spherometer") {
            card.innerHTML = `
                <h4>Spherometer curvature radius</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Central screw height (h): <span id="read-sph-h" style="color:var(--cyan);font-weight:bold;">0.00 mm</span></div>
                    <div>Legs distance (l): <span style="color:var(--text-secondary);">50.00 mm</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Radius of Curvature R = (l²/6h) + (h/2):</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-sph-radius">Flat Surface</div>
                </div>
            `;
        } else if (id === "spectrometer") {
            card.innerHTML = `
                <h4>Spectrometer wavelength calculation</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Telescope angle (θ): <span id="read-spec-angle" style="color:var(--cyan);font-weight:bold;">0.0°</span></div>
                    <div>Grating spacing (d): <span style="color:var(--text-secondary);">1667 nm (600 lines/mm)</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Wavelength (λ = d·sin θ):</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-spec-wave">0.0 nm</div>
                </div>
            `;
        } else if (id === "travelling_microscope") {
            card.innerHTML = `
                <h4>Travelling Microscope scale</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Slider Travel: <span id="read-travel-slider" style="color:var(--cyan);font-weight:bold;">0.00 mm</span></div>
                    <div>Main Scale Reading (MSR): <span id="read-tm-msr" style="color:var(--text-secondary);">0.00 cm</span></div>
                    <div>Vernier scale Reading (VSR): <span id="read-tm-vsr" style="color:var(--text-secondary);">0.000 cm</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Total Displacement Reading:</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-tm-total">0.000 cm</div>
                </div>
            `;
        } else if (id === "resonance_tube") {
            card.innerHTML = `
                <h4>Resonance standing wave</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Water level column (h): <span id="read-res-h" style="color:var(--cyan);font-weight:bold;">0.00 m</span></div>
                    <div>Tuning Fork (f): <span style="color:var(--text-secondary);">512 Hz</span></div>
                    <div>Air column (L = 1.0 - h): <span id="read-res-L" style="color:var(--cyan);font-weight:bold;">0.00 m</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Calculated Speed of Sound (v = 4f·L):</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-res-speed">0.0 m/s</div>
                </div>
            `;
        } else if (id === "microscope") {
            card.innerHTML = `
                <h4>Compound Microscope optics</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Eyepiece lens: <span style="color:var(--text-secondary);">10x</span></div>
                    <div>Objective lens: <span style="color:var(--text-secondary);">45x</span></div>
                    <div>Focus Tube height: <span id="read-micro-h" style="color:var(--cyan);font-weight:bold;">0.0 mm</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Total Magnifying Power:</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;">450x magnification</div>
                </div>
            `;
        } else if (id === "telescope") {
            card.innerHTML = `
                <h4>Astronomical Telescope optics</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Objective focal (fo): <span style="color:var(--text-secondary);">150 cm</span></div>
                    <div>Eyepiece focal (fe): <span style="color:var(--text-secondary);">2.5 cm</span></div>
                    <div>Focus Adjustment: <span id="read-tele-f" style="color:var(--cyan);font-weight:bold;">1.50 cm</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Angular Magnification (M = -fo/fe):</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;">-60x (Inverted)</div>
                </div>
            `;
        } else if (id === "screw_gauge") {
            card.innerHTML = `
                <h4>Screw Gauge Measurement Readout</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Main Scale Reading (MSR): <span id="read-sg-msr" style="color:var(--cyan);font-weight:bold;">0.0 mm</span></div>
                    <div>Circular Scale Reading (CSR): <span id="read-sg-csr" style="color:var(--cyan);font-weight:bold;">0 div</span></div>
                    <div>Least Count (LC): <span style="color:var(--text-secondary);">0.01 mm</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Total Reading = MSR + (CSR × LC)</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-sg-total">0.00 mm</div>
                </div>
            `;
        } else if (id === "metre_bridge") {
            card.innerHTML = `
                <h4>Metre Bridge Resistance</h4>
                <div style="font-family:monospace;font-size:12px;line-height:1.6;margin-top:8px;">
                    <div>Known Resistance (R): <span id="read-mb-R" style="color:var(--cyan);font-weight:bold;">0 Ω</span></div>
                    <div>Balance Length (l): <span id="read-mb-l" style="color:var(--cyan);font-weight:bold;">0.0 cm</span></div>
                    <div>Remaining Length (100 - l): <span id="read-mb-rem" style="color:var(--text-secondary);">0.0 cm</span></div>
                    <hr style="border:none;border-top:1px solid rgba(255,255,255,0.08);margin:8px 0;">
                    <div style="font-size:13px;font-weight:bold;">Unknown Resistance X = R × (100 - l) / l:</div>
                    <div style="font-size:14px;color:var(--cyan);font-weight:bold;margin-top:4px;" id="read-mb-X">0.00 Ω</div>
                </div>
            `;
        }
        
        controlsContainer.parentNode.appendChild(card);
        updateCustomInstrumentReadouts();
    }
    
    // Live update calculations cards
    function updateCustomInstrumentReadouts() {
        if (!activeObjectId) return;
        
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
            
        } else if (activeObjectId === "ammeter") {
            const val = activeObjectSettings.current || 0;
            const res = 5.0; // Rg
            const shunt = 0.05; // Rs
            const rTotal = (res * shunt) / (res + shunt); // parallel resistance
            const volt = val * rTotal;
            
            const spanI = document.getElementById("read-current");
            const spanV = document.getElementById("read-ammeter-volt");
            if (spanI) spanI.textContent = `${val.toFixed(2)} A`;
            if (spanV) spanV.textContent = `${(volt * 1000).toFixed(1)} mV (V = I · Rp)`;
            
        } else if (activeObjectId === "voltmeter") {
            const val = activeObjectSettings.voltage || 0;
            const Ig = 0.01; // 10 mA
            const Rg = 50.0;
            // R = V/Ig - Rg
            const R_series = val / Ig - Rg;
            
            const spanV = document.getElementById("read-voltage");
            const spanR = document.getElementById("read-voltmeter-res");
            if (spanV) spanV.textContent = `${val.toFixed(1)} V`;
            if (spanR) spanR.textContent = `${Math.max(0, R_series).toFixed(0)} Ω`;
            
        } else if (activeObjectId === "galvanometer") {
            const val = activeObjectSettings.deflection || 0;
            const k = 20.0; // uA/division
            const equivCurrent = k * val;
            
            const spanDef = document.getElementById("read-deflect");
            const spanI = document.getElementById("read-galvo-current");
            if (spanDef) spanDef.textContent = `${val > 0 ? '+' : ''}${val} div`;
            if (spanI) spanI.textContent = `${equivCurrent.toFixed(0)} μA`;
            
        } else if (activeObjectId === "multimeter") {
            const mode = activeObjectSettings.modeLevel || 1;
            const strength = activeObjectSettings.measureValue || 0;
            
            let modeName = "DC Volts";
            let unitStr = " V";
            let multiplier = 0.12; // 0-12V range
            if (mode === 2) {
                modeName = "DC Amps";
                unitStr = " A";
                multiplier = 0.05; // 0-5A
            } else if (mode === 3) {
                modeName = "Resistance";
                unitStr = " kΩ";
                multiplier = 0.2; // 0-20kΩ
            }
            
            const readVal = strength * multiplier;
            
            const spanMode = document.getElementById("read-multi-mode");
            const spanStr = document.getElementById("read-multi-strength");
            const spanDisp = document.getElementById("read-multi-disp");
            
            if (spanMode) spanMode.textContent = modeName;
            if (spanStr) spanStr.textContent = `${strength}%`;
            if (spanDisp) spanDisp.textContent = `${readVal.toFixed(2)}${unitStr}`;
            
        } else if (activeObjectId === "spring_balance") {
            const F = activeObjectSettings.springForce || 0;
            const k = 2.0; // N / cm
            const x = F / k; // extension in cm
            const mass = (F / 9.8) * 1000; // in grams
            
            const spanF = document.getElementById("read-spring-force");
            const spanExt = document.getElementById("read-spring-ext");
            const spanMass = document.getElementById("read-spring-mass");
            
            if (spanF) spanF.textContent = `${F.toFixed(1)} N`;
            if (spanExt) spanExt.textContent = `${x.toFixed(2)} cm`;
            if (spanMass) spanMass.textContent = `${mass.toFixed(0)} g`;
            
        } else if (activeObjectId === "stopwatch") {
            const t = activeObjectSettings.timeInterval || 0;
            const mins = Math.floor(t / 60);
            const secs = Math.floor(t % 60);
            const tenths = Math.floor((t % 1) * 10);
            
            const strTime = `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}.${tenths}`;
            
            const spanVal = document.getElementById("read-stopwatch-val");
            const spanTime = document.getElementById("read-stopwatch-time");
            
            if (spanVal) spanVal.textContent = `${t.toFixed(1)} s`;
            if (spanTime) spanTime.textContent = strTime;
            
        } else if (activeObjectId === "meter_scale") {
            const L = activeObjectSettings.scaleLength || 1.0;
            const divs = L * 1000; // 1mm divs
            
            const spanLen = document.getElementById("read-ruler-len");
            const spanDiv = document.getElementById("read-ruler-div");
            
            if (spanLen) spanLen.textContent = `${L.toFixed(2)} m (${(L*100).toFixed(0)} cm)`;
            if (spanDiv) spanDiv.textContent = `${divs.toFixed(0)} divisions (1mm)`;
            
        } else if (activeObjectId === "spherometer") {
            const h = activeObjectSettings.height || 0; // mm
            const l = 50.0; // leg spacing mm
            let R_val = "Flat Surface";
            if (Math.abs(h) > 0.005) {
                const r = (l * l) / (6 * h) + h / 2;
                R_val = `${r.toFixed(1)} mm (${(r/10).toFixed(2)} cm)`;
            }
            
            const spanH = document.getElementById("read-sph-h");
            const spanRad = document.getElementById("read-sph-radius");
            
            if (spanH) spanH.textContent = `${h.toFixed(2)} mm`;
            if (spanRad) spanRad.textContent = R_val;
            
        } else if (activeObjectId === "spectrometer") {
            const thetaDeg = activeObjectSettings.angle || 0;
            const d = 1667.0; // nm
            const thetaRad = (thetaDeg * Math.PI) / 180;
            const wave = d * Math.sin(thetaRad); // wavelength nm
            
            const spanAng = document.getElementById("read-spec-angle");
            const spanWave = document.getElementById("read-spec-wave");
            
            if (spanAng) spanAng.textContent = `${thetaDeg.toFixed(1)}°`;
            if (spanWave) spanWave.textContent = wave <= 0 ? "0.0 nm" : `${wave.toFixed(1)} nm (Spectral line)`;
            
        } else if (activeObjectId === "travelling_microscope") {
            const sliderVal = activeObjectSettings.travel || 0; // mm
            const totalCm = sliderVal / 10; // travel in cm
            const msr = Math.floor(totalCm * 10) / 10; // main scale reading cm
            const vsr = totalCm - msr; // vernier contribution
            
            const spanSl = document.getElementById("read-travel-slider");
            const spanMsr = document.getElementById("read-tm-msr");
            const spanVsr = document.getElementById("read-tm-vsr");
            const spanTot = document.getElementById("read-tm-total");
            
            if (spanSl) spanSl.textContent = `${sliderVal.toFixed(2)} mm`;
            if (spanMsr) spanMsr.textContent = `${msr.toFixed(1)} cm`;
            if (spanVsr) spanVsr.textContent = `${vsr.toFixed(3)} cm`;
            if (spanTot) spanTot.textContent = `${totalCm.toFixed(3)} cm`;
            
        } else if (activeObjectId === "resonance_tube") {
            const h = activeObjectSettings.tubeLength || 0.45; // m (water level)
            const f = 512.0; // tuning fork Hz
            const L = 1.0 - h; // air column m
            const v_sound = 4 * f * L; // sound speed m/s
            
            const spanH = document.getElementById("read-res-h");
            const spanL = document.getElementById("read-res-L");
            const spanSp = document.getElementById("read-res-speed");
            
            if (spanH) spanH.textContent = `${h.toFixed(2)} m`;
            if (spanL) spanL.textContent = `${L.toFixed(2)} m (L = 1.0 - h)`;
            if (spanSp) spanSp.textContent = `${v_sound.toFixed(1)} m/s (ideal ~343 m/s)`;
            
        } else if (activeObjectId === "microscope") {
            const val = activeObjectSettings.zoom || 0;
            const spanH = document.getElementById("read-micro-h");
            if (spanH) spanH.textContent = `${val.toFixed(1)} mm`;
        } else if (activeObjectId === "telescope") {
            const val = activeObjectSettings.focus || 0;
            const spanF = document.getElementById("read-tele-f");
            if (spanF) spanF.textContent = `${val.toFixed(2)} cm`;
        } else if (activeObjectId === "screw_gauge") {
            const size = activeObjectSettings.gaugeSize || 0; // 0 to 15.0 mm
            const msr = Math.floor(size * 2) / 2; // Main scale reading in 0.5mm intervals
            const csr = Math.round((size - msr) / 0.01); // Circular scale divisions
            const total = msr + (csr * 0.01);
            
            const msrSpan = document.getElementById("read-sg-msr");
            const csrSpan = document.getElementById("read-sg-csr");
            const totalSpan = document.getElementById("read-sg-total");
            
            if (msrSpan) msrSpan.textContent = `${msr.toFixed(1)} mm`;
            if (csrSpan) csrSpan.textContent = `${csr} div`;
            if (totalSpan) totalSpan.textContent = `= ${msr.toFixed(1)} + (${csr} × 0.01) = ${total.toFixed(2)} mm`;
            
            // Sync with stats panel
            const propVal = document.getElementById("prop-calculated-reading");
            if (propVal) propVal.textContent = `${total.toFixed(2)} mm`;
        } else if (activeObjectId === "metre_bridge") {
            const R = activeObjectSettings.resistanceBox || 5;
            const l = activeObjectSettings.jockeyPosition || 50.0;
            const rem = 100.0 - l;
            const X = R * (rem / l);
            
            const rSpan = document.getElementById("read-mb-R");
            const lSpan = document.getElementById("read-mb-l");
            const remSpan = document.getElementById("read-mb-rem");
            const xSpan = document.getElementById("read-mb-X");
            
            if (rSpan) rSpan.textContent = `${R} Ω`;
            if (lSpan) lSpan.textContent = `${l.toFixed(1)} cm`;
            if (remSpan) remSpan.textContent = `${rem.toFixed(1)} cm`;
            if (xSpan) xSpan.textContent = `= ${R} × (${rem.toFixed(1)} / ${l.toFixed(1)}) = ${X.toFixed(2)} Ω`;
            
            // Sync with stats panel
            const propVal = document.getElementById("prop-galvanometer-null-point");
            if (propVal) propVal.textContent = `l = ${l.toFixed(1)} cm`;
        }
    }
    
    // Model Generation Router Helper
    function generateModel(dbItem, settings) {
        if (!dbItem || !settings) return null;
        
        switch (dbItem.type) {
            case 'atom':
                return EduGenerators.createAtom(dbItem, settings);
            case 'molecule':
                return EduGenerators.createMolecule(dbItem, settings);
            case 'lattice':
                return EduGenerators.createLattice(dbItem, settings);
            case 'lattice_nacl':
                return EduGenerators.createLatticeNaCl(dbItem, settings);
            case 'space':
                return EduGenerators.createSpaceObject(dbItem, settings);
            case 'physics':
                return EduGenerators.createPhysicsSetup(dbItem, settings);
            case 'instrument_vernier':
                return EduGenerators.createVernierCaliper(dbItem, settings);
            case 'instrument_optics':
                return EduGenerators.createRayOptics(dbItem, settings);
            case 'instrument_magnifier':
                return EduGenerators.createMagnifyingGlass(dbItem, settings);
            case 'instrument_meter_scale':
                return EduGenerators.createMeterScale(dbItem, settings);
            case 'instrument_spring_balance':
                return EduGenerators.createSpringBalance(dbItem, settings);
            case 'instrument_stopwatch':
                return EduGenerators.createStopwatch(dbItem, settings);
            case 'instrument_ammeter':
                return EduGenerators.createAmmeter(dbItem, settings);
            case 'instrument_voltmeter':
                return EduGenerators.createVoltmeter(dbItem, settings);
            case 'instrument_galvanometer':
                return EduGenerators.createGalvanometer(dbItem, settings);
            case 'instrument_multimeter':
                return EduGenerators.createMultimeter(dbItem, settings);
            case 'instrument_microscope':
                return EduGenerators.createMicroscope(dbItem, settings);
            case 'instrument_telescope':
                return EduGenerators.createTelescope(dbItem, settings);
            case 'instrument_spectrometer':
                return EduGenerators.createSpectrometer(dbItem, settings);
            case 'instrument_spherometer':
                return EduGenerators.createSpherometer(dbItem, settings);
            case 'instrument_travelling_microscope':
                return EduGenerators.createTravellingMicroscope(dbItem, settings);
            case 'instrument_resonance_tube':
                return EduGenerators.createResonanceTube(dbItem, settings);
            case 'instrument_screw_gauge':
                return EduGenerators.createScrewGauge(dbItem, settings);
            case 'instrument_metre_bridge':
                return EduGenerators.createMetreBridge(dbItem, settings);
            case 'math':
                return EduGenerators.createMathShape(dbItem, settings);
            case 'fallback':
                return EduGenerators.createFallbackVisual(dbItem.name, settings);
            default:
                return EduGenerators.createFallbackVisual(dbItem.name, settings);
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
        
        modelGroup = generateModel(dbItem, activeObjectSettings);
        
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

    toggleMoonsCheckbox.addEventListener("change", (e) => {
        activeObjectSettings.showMoons = e.target.checked;
        reloadActiveModel();
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
