// ==========================================================================
// Edu3D Three.js Core Rendering Engine
// ==========================================================================

const EduEngine = {
    scene: null,
    camera: null,
    renderer: null,
    controls: null,
    container: null,
    
    // Core parameters
    currentModelGroup: null,
    gridHelper: null,
    starfield: null,
    
    // Raycasting state
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(),
    
    // Animation flags
    speedFactor: 1.0,
    isPaused: false,
    autoRotateCamera: false,
    
    // Global timer
    clock: new THREE.Clock(),
    accumulatedTime: 0,
    
    // Material override state
    currentMaterialMode: "realistic", // realistic, hologram, wireframe, xray
    originalMaterialsMap: new Map(), // Backup map to restore realistic materials
    
    // Callbacks
    onNodeClicked: null,
    
    // INITIALIZATION
    init: function(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        // 1. Create Scene
        this.scene = new THREE.Scene();
        // Fog for depth feeling
        this.scene.fog = new THREE.FogExp2(0x050b18, 0.015);
        
        // 2. Setup Camera
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(0, 3, 8);
        
        // 3. Setup WebGLRenderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
        
        // 4. Setup Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxDistance = 25;
        this.controls.minDistance = 1.5;
        this.controls.enablePan = true;
        
        // 5. Setup Lighting
        this.setupLights();
        
        // 6. Setup Starfield Background
        this.createStarfield();
        
        // 7. Setup Grid Helper
        this.setupGridHelper();
        
        // 8. Event Listeners
        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.renderer.domElement.addEventListener('click', this.onDocumentClick.bind(this));
        
        // Start Render loop
        this.animateLoop();
    },
    
    setupLights: function() {
        // Soft ambient light
        const ambientLight = new THREE.AmbientLight(0x0e172c, 1.2);
        this.scene.add(ambientLight);
        
        // Key Light (main source)
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
        keyLight.position.set(5, 8, 5);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        keyLight.shadow.bias = -0.001;
        this.scene.add(keyLight);
        
        // Fill Light (colored glow on opposite side)
        const fillLight = new THREE.DirectionalLight(0x06b6d4, 0.6); // Cyan fill
        fillLight.position.set(-5, -3, -5);
        this.scene.add(fillLight);
        
        // Soft rim light
        const rimLight = new THREE.PointLight(0x8b5cf6, 1.0, 15);
        rimLight.position.set(0, 0, -4);
        this.scene.add(rimLight);
    },
    
    setupGridHelper: function() {
        // Clean high-tech glowing grid helper
        this.gridHelper = new THREE.GridHelper(16, 32, 0x06b6d4, 0x1f2937);
        this.gridHelper.position.y = -2.5;
        // Customize grid visual opacity
        if (this.gridHelper.material) {
            this.gridHelper.material.transparent = true;
            this.gridHelper.material.opacity = 0.08;
        }
        this.scene.add(this.gridHelper);
    },
    
    createStarfield: function() {
        const starsGeo = new THREE.BufferGeometry();
        const starsCount = 400;
        const positions = new Float32Array(starsCount * 3);
        
        for (let i = 0; i < starsCount; i++) {
            // Distribute stars far away on a sphere shell
            const u = Math.random();
            const v = Math.random();
            const theta = u * 2.0 * Math.PI;
            const phi = Math.acos(2.0 * v - 1.0);
            const r = 80 + Math.random() * 20; // Radius
            
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        
        starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starMat = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.15,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending
        });
        
        this.starfield = new THREE.Points(starsGeo, starMat);
        this.scene.add(this.starfield);
    },
    
    // WINDOW RESIZING
    onWindowResize: function() {
        if (!this.container || !this.camera || !this.renderer) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    },
    
    // MODEL LOADING & CLEARING
    loadModel: function(modelGroup) {
        // Clear existing model
        this.clearModel();
        
        this.currentModelGroup = modelGroup;
        this.scene.add(modelGroup);
        
        // Apply current material mode style overrides
        this.backupOriginalMaterials(modelGroup);
        this.applyMaterialMode(this.currentMaterialMode);
        
        // Reset scale and adjust camera height slightly based on object height
        modelGroup.scale.set(0.001, 0.001, 0.001);
        
        // Center camera controls target on loaded model
        this.controls.target.set(0, 0, 0);
        
        // Smooth entrance animation via GSAP
        gsap.to(modelGroup.scale, {
            x: 1, y: 1, z: 1,
            duration: 1.0,
            ease: "back.out(1.5)"
        });
        
        gsap.to(this.camera.position, {
            x: 0, y: 1.5, z: 7.5,
            duration: 1.0,
            ease: "power2.out"
        });
    },
    
    clearModel: function() {
        if (this.currentModelGroup) {
            this.scene.remove(this.currentModelGroup);
            // Dispose geometries & materials
            this.currentModelGroup.traverse(child => {
                if (child.isMesh) {
                    if (child.geometry) child.geometry.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach(m => m.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                }
            });
            this.currentModelGroup = null;
            this.originalMaterialsMap.clear();
        }
    },
    
    // EXPLOSION ANIMATION
    explodeModel: function(callback) {
        if (!this.currentModelGroup || !this.currentModelGroup.userData.explode) return;
        
        const obj = { progress: 0 };
        gsap.to(obj, {
            progress: 1.0,
            duration: 1.2,
            ease: "power2.inOut",
            yoyo: true, // Go out and come back in!
            repeat: 1,
            onUpdate: () => {
                if (this.currentModelGroup && this.currentModelGroup.userData.explode) {
                    this.currentModelGroup.userData.explode(obj.progress);
                }
            },
            onComplete: () => {
                if (callback) callback();
            }
        });
    },
    
    // INTERACTION / RAYCASTING
    onDocumentClick: function(event) {
        if (!this.currentModelGroup || !this.camera) return;
        
        // Calculate mouse position in normalized device coordinates (-1 to +1)
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Query intersections (recursive traversal)
        const intersects = this.raycaster.intersectObjects(this.currentModelGroup.children, true);
        
        if (intersects.length > 0) {
            // Find the first intersected object that has customized userData
            let targetMesh = null;
            for (let i = 0; i < intersects.length; i++) {
                const obj = intersects[i].object;
                if (obj.userData && obj.userData.name) {
                    targetMesh = obj;
                    break;
                }
            }
            
            // If direct node didn't store userData, check its parent group
            if (!targetMesh && intersects[0].object.parent && intersects[0].object.parent.userData && intersects[0].object.parent.userData.name) {
                targetMesh = intersects[0].object.parent;
            }
            
            if (targetMesh && this.onNodeClicked) {
                // Pulse click scaling effect
                const origScale = targetMesh.scale.clone();
                gsap.to(targetMesh.scale, {
                    x: origScale.x * 1.3,
                    y: origScale.y * 1.3,
                    z: origScale.z * 1.3,
                    duration: 0.15,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut"
                });
                
                this.onNodeClicked(targetMesh.userData);
            }
        }
    },
    
    // MATERIAL OVERRIDES
    backupOriginalMaterials: function(group) {
        group.traverse(child => {
            if (child.isMesh && child.material && child.userData.type !== 'orbit-ring') {
                this.originalMaterialsMap.set(child.uuid, child.material);
            }
        });
    },
    
    applyMaterialMode: function(mode) {
        this.currentMaterialMode = mode;
        if (!this.currentModelGroup) return;
        
        this.currentModelGroup.traverse(child => {
            if (!child.isMesh) return;
            
            // Bypass orbit paths or grid lines to keep them faint
            if (child.userData.type === 'orbit-ring' || child.material.transparent === true && child.material.opacity < 0.3) {
                return;
            }
            
            const origMat = this.originalMaterialsMap.get(child.uuid) || child.material;
            
            if (mode === 'realistic') {
                // Restore backup
                child.material = origMat;
            } else if (mode === 'hologram') {
                // Tech glowing blue hologram
                child.material = new THREE.MeshBasicMaterial({
                    color: 0x06b6d4,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.6,
                    blending: THREE.AdditiveBlending
                });
            } else if (mode === 'wireframe') {
                // Bare solid wireframe
                child.material = new THREE.MeshStandardMaterial({
                    color: origMat.color || 0x8b5cf6,
                    wireframe: true,
                    roughness: 0.5
                });
            } else if (mode === 'xray') {
                // Soft glow x-ray effect
                child.material = new THREE.MeshBasicMaterial({
                    color: 0x8b5cf6,
                    transparent: true,
                    opacity: 0.35,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide
                });
            }
        });
    },
    
    // RENDER LOOP
    animateLoop: function() {
        requestAnimationFrame(this.animateLoop.bind(this));
        
        // 1. Calculate time delta
        const delta = this.clock.getDelta();
        if (!this.isPaused) {
            this.accumulatedTime += delta * this.speedFactor;
        }
        
        // 2. Animate 3D Model logic
        if (this.currentModelGroup && this.currentModelGroup.userData.animate && !this.isPaused) {
            this.currentModelGroup.userData.animate(this.accumulatedTime, this.speedFactor);
        }
        
        // 3. Camera Auto Rotation
        if (this.autoRotateCamera) {
            const rotDelta = 0.003 * this.speedFactor;
            const x = this.camera.position.x;
            const z = this.camera.position.z;
            this.camera.position.x = x * Math.cos(rotDelta) - z * Math.sin(rotDelta);
            this.camera.position.z = x * Math.sin(rotDelta) + z * Math.cos(rotDelta);
        }
        
        // 4. Update Orbit Controls
        if (this.controls) {
            this.controls.update();
        }
        
        // 5. Render Scene
        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    },
    
    // HELPER TRIGGERS
    setSpeed: function(factor) {
        this.speedFactor = factor;
    },
    
    togglePlay: function() {
        this.isPaused = !this.isPaused;
        return !this.isPaused; // returns running state
    },
    
    toggleGrid: function(show) {
        if (this.gridHelper) {
            this.gridHelper.visible = show;
        }
    },
    
    toggleOrbits: function(show) {
        if (!this.currentModelGroup) return;
        
        // Hide orbits group or lines group inside the active model
        this.currentModelGroup.traverse(child => {
            if (child.userData.type === 'electron-orbit' || child.name === 'lines' || child.userData.type === 'orbit-ring' || (child.material && child.material.wireframe === true && this.currentMaterialMode === 'realistic')) {
                // Finer controls for atomic orbit outlines
                child.visible = show;
            }
        });
    },
    
    resetCamera: function() {
        if (this.camera && this.controls) {
            gsap.to(this.camera.position, {
                x: 0, y: 3, z: 8,
                duration: 0.8,
                ease: "power2.out"
            });
            gsap.to(this.controls.target, {
                x: 0, y: 0, z: 0,
                duration: 0.8,
                ease: "power2.out"
            });
        }
    }
};

// Expose globally
window.EduEngine = EduEngine;
