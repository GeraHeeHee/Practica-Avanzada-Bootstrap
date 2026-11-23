const STORAGE_KEY = 'stocklab-theme';
const root = document.documentElement;

function appyTheme(theme) {
    root.dataset.bsTheme = theme;
    document.querySelector('#themeToggle')?.setAttribute('aria-pressed', String(theme === 'dark'));
}

export function initThemeToggle() {
    appyTheme(root.dataset.bsTheme ?? 'light');

    document.querySelector('#themeToggle')?.addEventListener('click', () => {
        const next = root.dataset.bsTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        appyTheme(next);
    })
}