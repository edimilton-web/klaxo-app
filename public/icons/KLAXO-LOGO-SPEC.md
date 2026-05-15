# Klaxo Logo — Especificação Técnica

Especificação completa do ícone Klaxo (rounded square com "K") para implementação no app e site.

---

## 1. Identidade visual

| Item | Valor |
|---|---|
| Marca | **Klaxo** |
| Símbolo | Letra **"K"** branca |
| Background | Squircle (rounded square) com gradiente violeta |
| Forma | Quadrada, cantos arredondados 22% |
| Aplicação | App icon, favicon, navegação, OG image |

---

## 2. Color tokens

```css
:root {
  --klaxo-grad-start: #A78BFA;  /* violeta claro */
  --klaxo-grad-mid:   #7C3AED;  /* violeta principal (brand color) */
  --klaxo-grad-end:   #3B0764;  /* violeta profundo */
  --klaxo-letter:     #FFFFFF;  /* "K" branco */
}

/* gradiente do ícone */
background: linear-gradient(135deg,
  var(--klaxo-grad-start) 0%,
  var(--klaxo-grad-mid)  50%,
  var(--klaxo-grad-end)  100%
);
```

**Cor flat para contextos sem gradiente** (badges, links inline, single-color logo):
`#7C3AED` (violeta principal)

---

## 3. Tipografia

- **Fonte:** Nunito (Google Fonts)
- **Peso:** 900 (Black)
- **Cor:** `#FFFFFF`
- **Tamanho relativo ao ícone:** 62.5% do lado (ex: 150px em ícone 240px)

Import:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@900&display=swap" rel="stylesheet">
```

---

## 4. Geometria

| Propriedade | Valor |
|---|---|
| Aspect ratio | 1:1 (quadrado) |
| Border radius | **22% do lado** (rx em SVG, border-radius em CSS) |
| Ângulo do gradiente | 135° (top-left → bottom-right) |
| Posição do "K" | Centro geométrico, com nudge vertical de +2% para centramento óptico |

**Border radius por tamanho:**

| Lado | Radius |
|---|---|
| 16px | 4px |
| 32px | 7px |
| 48px | 11px |
| 64px | 14px |
| 96px | 21px |
| 180px | 40px |
| 192px | 42px |
| 240px | 53px |
| 256px | 56px |
| 512px | 113px |
| 1024px | 225px |

---

## 5. Assets (arquivos PNG inclusos)

| Arquivo | Tamanho | Uso |
|---|---|---|
| `klaxo-icon-16.png`    | 16×16    | Favicon |
| `klaxo-icon-32.png`    | 32×32    | Favicon, tab |
| `klaxo-icon-48.png`    | 48×48    | Windows tile |
| `klaxo-icon-64.png`    | 64×64    | Notification, small UI |
| `klaxo-icon-96.png`    | 96×96    | Android (mdpi) |
| `klaxo-icon-180.png`   | 180×180  | apple-touch-icon (iOS) |
| `klaxo-icon-192.png`   | 192×192  | PWA manifest (Android) |
| `klaxo-icon-256.png`   | 256×256  | macOS, large UI |
| `klaxo-icon.png`       | 240×240  | UI geral |
| `klaxo-icon-512.png`   | 512×512  | PWA manifest (high-res), splash |
| `klaxo-icon-1024.png`  | 1024×1024| App Store, marketing |
| `klaxo-icon.svg`       | vetor    | Inline, escalável |

Todos os PNGs têm **fundo transparente** fora do squircle.

---

## 6. Integração no `<head>`

```html
<!-- Favicons -->
<link rel="icon" type="image/png" sizes="16x16"  href="/klaxo-icon-16.png">
<link rel="icon" type="image/png" sizes="32x32"  href="/klaxo-icon-32.png">
<link rel="icon" type="image/svg+xml" href="/klaxo-icon.svg">

<!-- Apple touch icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/klaxo-icon-180.png">

<!-- PWA / Android -->
<link rel="manifest" href="/site.webmanifest">

<!-- Theme color (atualizar para o gradiente principal) -->
<meta name="theme-color" content="#7C3AED">
```

### `site.webmanifest`

```json
{
  "name": "Klaxo",
  "short_name": "Klaxo",
  "icons": [
    { "src": "/klaxo-icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/klaxo-icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "theme_color": "#7C3AED",
  "background_color": "#3B0764",
  "display": "standalone"
}
```

---

## 7. SVG inline (cópia rápida)

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Klaxo">
  <defs>
    <linearGradient id="klaxoGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#A78BFA"/>
      <stop offset="50%"  stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#3B0764"/>
    </linearGradient>
  </defs>
  <rect width="240" height="240" rx="53" fill="url(#klaxoGrad)"/>
  <text x="120" y="124"
        font-family="Nunito, system-ui, sans-serif"
        font-weight="900"
        font-size="150"
        fill="#FFFFFF"
        text-anchor="middle"
        dominant-baseline="central">K</text>
</svg>
```

> **Atenção:** o SVG usa `<text>` com Nunito. Para garantir renderização consistente em browsers/contextos que não tenham a fonte carregada, use os **PNGs** ou converta o "K" em path com uma ferramenta como [Glyphter](https://www.glyphter.com/) ou Inkscape (`Path → Object to Path`).

---

## 8. Componente React (Tailwind)

```jsx
export function KlaxoIcon({ size = 40, className = '' }) {
  return (
    <div
      className={`grid place-items-center rounded-[22%] text-white font-black ${className}`}
      style={{
        width: size,
        height: size,
        fontFamily: 'Nunito, system-ui, sans-serif',
        fontSize: size * 0.625,
        lineHeight: 1,
        background: 'linear-gradient(135deg, #A78BFA 0%, #7C3AED 50%, #3B0764 100%)',
      }}
      aria-label="Klaxo"
    >
      K
    </div>
  );
}
```

Tamanhos recomendados em UI:
- `xs` 24px (badge, chip)
- `sm` 32px (avatar inline)
- `md` 48px (header nav)
- `lg` 80px (auth screens)
- `xl` 120px (onboarding hero)

---

## 9. Animações (opcionais)

```css
/* Scale-in na entrada (splash, logo reveal) */
@keyframes klaxo-scale-in {
  0%   { transform: scale(0.6); opacity: 0; }
  60%  { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
}
.klaxo-scale-in { animation: klaxo-scale-in 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }

/* Letter pop — destaca o K ao carregar */
@keyframes klaxo-letter-pop {
  0%   { transform: scale(0.5); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.klaxo-letter-pop > * { animation: klaxo-letter-pop 400ms ease-out 200ms both; }

/* Glow pulse — estado idle/loading */
@keyframes klaxo-glow-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.5); }
  50%      { box-shadow: 0 0 0 12px rgba(124, 58, 237, 0); }
}
.klaxo-glow-pulse { animation: klaxo-glow-pulse 2s ease-in-out infinite; }
```

---

## 10. Consistência landing ↔ app

**Atenção:** atualmente a landing usa cor flat (`#7C5CFC` em `meta theme-color`) enquanto o app usa o gradiente completo.

**Recomendação:** unificar — ou:
- (a) Usar o **gradiente em ambos** (preferível para impacto visual)
- (b) Manter flat na landing mas atualizar para **`#7C3AED`** (cor principal da paleta nova)

Atualizar:
```html
<!-- landing -->
<meta name="theme-color" content="#7C3AED">
```

---

## 11. Não fazer (do's & don'ts)

❌ Não alterar o ângulo do gradiente (135° fixo)
❌ Não substituir a Nunito por outra fonte (mesmo similar como Quicksand ou Manrope)
❌ Não usar peso menor que 900 para o "K"
❌ Não adicionar sombra, borda, ou outline ao squircle
❌ Não comprimir o aspect ratio (sempre 1:1)
❌ Não usar a cor flat sem necessidade — gradiente é o padrão

✅ Sempre manter o "K" branco puro `#FFFFFF`
✅ Sempre usar `border-radius: 22%` (não pixel-fixed em UIs responsivas)
✅ Sempre incluir `aria-label="Klaxo"` em SVG/imagens não-decorativas

---

## 12. Resumo executivo

```
Brand: Klaxo
Symbol: White "K" on violet gradient squircle
Colors: #A78BFA → #7C3AED → #3B0764 (linear 135°)
Font: Nunito 900 (Google Fonts)
Geometry: 1:1, border-radius 22%, K at 62.5% size
Assets: 12 PNG sizes + SVG (transparent background)
```
