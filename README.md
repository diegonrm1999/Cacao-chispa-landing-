# 🍫 Cacao & Chispa — Ecommerce MVP

## Estructura del proyecto

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Router principal + CartProvider
│
├── styles/
│   └── global.css            # Variables CSS, reset, clases utilitarias (.btn)
│
├── data/
│   ├── products.js           # Lista de productos (agregar más aquí)
│   └── company.js            # Info de la empresa y fundadores
│
├── context/
│   └── CartContext.jsx       # Estado global del carrito (add/remove/update)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx + .module.css
│   │   └── Footer.jsx + .module.css
│   └── ui/
│       ├── ProductCard.jsx + .module.css    # Card reutilizable
│       ├── HeroSection.jsx + .module.css    # Sección hero del home
│       └── FoundersSection.jsx + .module.css
│
└── pages/
    ├── HomePage.jsx + .module.css           # ✅ Listo
    ├── CatalogPage.jsx                      # 🔜 Por construir
    ├── ProductPage.jsx                      # 🔜 Por construir
    ├── CartPage.jsx                         # 🔜 Por construir
    └── ConfirmPage.jsx                      # 🔜 Por construir
```

## Cómo correrlo

```bash
npm install
npm run dev
```

## Para agregar productos

Editar `src/data/products.js` — cada producto nuevo se refleja automáticamente en el catálogo y el home.

## Paleta de colores

| Variable        | Valor     |
|-----------------|-----------|
| `--choco`       | `#3E2723` |
| `--cream`       | `#FFF9F5` |
| `--rose`        | `#D4A5A5` |
| `--brown`       | `#8C5E45` |

## Fuente

**Love Ya Like A Sister** (Google Fonts) — display  
**Nunito** (Google Fonts) — body
