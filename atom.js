// Load atcss.config.json (optional)
fetch('atcss.config.json')
    .then(response => response.json())
    .then(config => {
    // Apply theme
    if (config.theme) {
        document.documentElement.setAttribute('data-theme', config.theme);
    }

    // Apply fonts
    if (config.fonts) {
        if (config.fonts.body) document.documentElement.style.setProperty('--font-body', config.fonts.body);
        if (config.fonts.headings) document.documentElement.style.setProperty('--font-headings', config.fonts.headings);
        if (config.fonts.code) document.documentElement.style.setProperty('--font-code', config.fonts.code);
    }

    // Apply custom styles for sections/classes
    if (config.custom) {
        const styleSheet = document.createElement('style');
        let customCSS = '';
        for (const selector in config.custom) {
        customCSS += `${selector} {`;
        for (const prop in config.custom[selector]) {
            customCSS += `${prop}: ${config.custom[selector][prop]};`;
        }
        customCSS += `}`;
        }
        styleSheet.textContent = customCSS;
        document.head.appendChild(styleSheet);
    }

    // Apply overrides (for custom themes)
    if (config.overrides) {
        for (const varName in config.overrides) {
        document.documentElement.style.setProperty(varName, config.overrides[varName]);
        }
    }
    })
    .catch(() => {
    // Config not found or invalid – use defaults
    console.log('Using default ATOM.css config');
    });

// Syntax Highlighting
document.addEventListener('DOMContentLoaded', (event) => {
    hljs.highlightAll();
});

// Copy Button
document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
    const codeElement = btn.parentElement.querySelector("pre > code");
    const code = codeElement.innerText;

    try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
        btn.textContent = "Copy";
        btn.classList.remove("copied");
        }, 1500);
    } catch (err) {
        btn.textContent = "Error";
        setTimeout(() => {
        btn.textContent = "Copy";
        }, 1500);
    }
    });
});

// Modal Toggling
document.querySelectorAll("[data-modal-target]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
    const modalId = trigger.dataset.modalTarget;
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("active");
    });
});

document.querySelectorAll(".close-modal").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
    const modal = closeBtn.closest(".modal");
    if (modal) modal.classList.remove("active");
    });
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
    e.target.classList.remove("active");
    }
});

// Sidebar Toggle (for mobile)
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.sidebar-toggle');
if (toggle) {
    toggle.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    });
}