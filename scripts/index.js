// index.js

// Core logic
import { generateQRCodeData, getInputValue, isValidUrl, createQRCodeConfig } from './core.js';

// DOM Utilities
import { setElementVisibility, getQRCodeImg, getQRCodeSrc, createDownloadLink } from './dom-utils.js';

// Render functions
import { renderQRCode, toggleQRCodeSection, setSpinner, showFlyAlert } from './render.js';

// Clipboard logic
import { copyQRCodeImageToClipboard } from './clipboard.js';

// Listeners setup
import './listeners.js';







