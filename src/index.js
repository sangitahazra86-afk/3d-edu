// Main entry point for Vite bundling
// Import external libraries first (loaded via CDN in HTML)
// Then import local modules

// Note: Three.js, OrbitControls, and GSAP are loaded via CDN in index.html
// This file initializes our application after DOM is ready

import * as Database from './database.js';
import * as PeriodicTable from './periodic-table.js';
import * as Generators from './generators.js';
import * as Engine from './engine.js';
import * as Main from './main.js';

// Expose modules to window if needed
window.EDU3D = {
  Database,
  PeriodicTable,
  Generators,
  Engine,
  Main
};

console.log('Edu3D modules loaded');
