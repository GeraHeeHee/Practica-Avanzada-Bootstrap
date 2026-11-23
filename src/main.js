import './scss/main.scss';
import { Modal, Offcanvas, Toast, Tooltip } from 'bootstrap';
import { initThemeToggle } from './js/theme.js';
import { initProductForm } from './js/product-form.js';

initThemeToggle();
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => new Tooltip(el));
initProductForm({ Modal, Toast });
