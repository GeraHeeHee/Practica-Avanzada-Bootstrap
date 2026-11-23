// src/js/product-form.js
const stateFor = (stock) => {
  if (stock === 0) return 'agotado';
  if (stock < 10) return 'bajo';
  return 'disponible';
};

function createRow({ sku, nombre, categoria, stock }) {
  const row = document.querySelector('#rowTemplate').content.cloneNode(true);
  const estado = stateFor(Number(stock));

  Object.entries({ sku, nombre, categoria, stock }).forEach(([field, value]) => {
    row.querySelector(`[data-field="${field}"]`).textContent = value;
  });

  const badge = row.querySelector('.status-badge');
  badge.classList.add(`status-badge--${estado}`);
  badge.textContent = estado.charAt(0).toUpperCase() + estado.slice(1);
  return row;
}

function updateKpis() {
  const tbody = document.querySelector('#productTable tbody');
  const low = tbody.querySelectorAll('.status-badge--bajo').length;
  document.querySelector('#kpiLow').textContent = low;
}

export function initProductForm({ Modal, Toast }) {
  const form = document.querySelector('#productForm');
  const modal = Modal.getOrCreateInstance('#productModal');
  const toast = Toast.getOrCreateInstance('#saveToast');
  const tbody = document.querySelector('#productTable tbody');

  updateKpis();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      form.querySelector(':invalid')?.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    tbody.prepend(createRow(data));
    updateKpis();
    form.reset();
    form.classList.remove('was-validated');
    modal.hide();
    toast.show();
  });
}