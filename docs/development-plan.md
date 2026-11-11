# DevLinks — Plano de Desenvolvimento

> Este arquivo guarda o plano de desenvolvimento da aplicação DevLinks, conforme
> elaborado a partir do `@AGENTS.md` e da análise do estado atual do repositório.
> Conteúdo em português; identificadores e commits em inglês.

## 1. Objetivo

Buildar uma aplicação React (Vite + TypeScript + Tailwind) que reproduza fielmente
as telas do Figma do DevLinks (Linktree-inspired): avatar, username, botões de link,
ícones de redes sociais e footer, no desktop e mobile, em light e dark mode.

## 2. Análise — estado inicial do repositório

- `src/App.tsx`: **scaffold padrão do Vite** (counter + logos) — substituído.
- `src/index.css`: **scaffold padrão** (font `system-ui`, dark default) — substituído pelos tokens.
- `src/App.css`: scaffold — removido.
- `src/main.tsx`: entry padrão — atualizado.
- `src/assets/`: **avatar-light.png, avatar-dark.png, bg-desktop-light.png, bg-desktop-dark.png, bg-mobile-light.png, bg-mobile-dark.png** já existentes (usados no app).
- `package.json`: React 19, Vite 7, TS 5.8, ESLint 9 — adicionadas `tailwindcss`, `@tailwindcss/vite`, `@phosphor-icons/react`, `ionicons`.

## 3. Premissas assumidas

1. Light mode como padrão; dark via `[data-theme='dark']`.
2. Inter via Google Fonts.
3. Fundos via imagens (`bg-desktop`, `bg-mobile` + variantes `-light/-dark`).
4. Botão = link externo com `target="_blank"` + `rel="noopener noreferrer"`.

> ⚠️ Antes de implementar: confirmar no Figma (ou via `get_design_context`) o texto
> exato dos 4 botões, do footer, das labels e das redes sociais exibidas.

## 4. Ferramentas MCP — Context7, Playwright e Figma (configuração e uso)

### Context7 (documentação de bibliotecas)

- **Onde se configura:** MCP servers no OpenCode (V2) ficam em `mcp.servers`, no
  arquivo de configuração (`opencode.json` global ou `opencode.json(c)`/`opencode.json` do
  projeto). Pelo CLI: `opencode mcp add <name> --global --url <remote-url>` (ou sem
  `--global` para configuração local ao projeto). Referência:
  <https://opencode.ai/docs/mcp-servers>.
- **Estado neste ambiente:** o binário `opencode` não estava disponível via shell PATH
  nesta sessão; o status de conexão/autenticação dos MCP servers deve ser conferido pelo
  usuário na interface (`/mcps`). A documentação oficial deve ser consultada antes de
  implementar ou trocar APIs de bibliotecas (React 19, Vite 7, Tailwind v4, TS).
- **Uso no fluxo de trabalho:** consultar a documentação oficial atualizada via Context7
  antes de escrever código que dependa de API cuja sintaxe possa ter mudado entre versões.

### Playwright (validação no navegador)

- **Onde se configura:** MCP server Playwright (por exemplo `@playwright/mcp`) no
  OpenCode, ou ferramentas integradas equivalentes.
- **Estado neste ambiente:** este agente dispõe de ferramentas integradas de browser
  (namespace `tools.browser.*`), baseadas em Chrome DevTools Protocol — com operações de
  navegação, snapshot, clique, hover, digitação, formulários, scroll, press, screenshot,
  console, evaluate, network, performance (CPU/Lighthouse) etc. Elas cumprem o papel de
  validação do Playwright neste ambiente. O MCP "Playwright" descrito no `@AGENTS.md` deve
  ser verificado/registrado para uso dedicado.
- **Uso no fluxo de trabalho:** subir a app (`npm run dev`), abrir `http://localhost:5173`,
  e rodar a validação em viewports 1440×1024 (desktop) e 360×800 (mobile).

### Figma (referência de design)

- **Uso:** ler frames e Style Guide via MCP (por exemplo `get_design_context`) nas frames
  correspondentes antes de estilar.

### Checklist de uso das ferramentas no projeto

- Antes de implementar/trocar API de biblioteca → **Context7**.
- Na validação visual/comportamental → **browser tools / Playwright**.
- No design → **Figma MCP**.

## 5. Roadmap — fases e status

### Fase 1 — Fundação: setup e limpeza do scaffold ✅
- [x] Task 1.1: Instalar Tailwind CSS (v4 + `@tailwindcss/vite`), Phosphor Icons e Ionicons.
- [x] Task 1.2: Adicionar a fonte **Inter** no `index.html` (Google Fonts).
- [x] Task 1.3: Substituir `src/App.tsx`, `src/index.css`; remover `src/App.css`.

### Fase 2 — Design tokens e estilos globais ✅
- [x] Task 2.1: Tokens CSS no `src/index.css` (light default + `[data-theme='dark']`).
- [x] Task 2.2: Inter, tipografia `text-md` (16/24/500) e `text-sm` (14/24/400) via `@theme`.
- [x] Task 2.3: Background-image dos fundos (mobile default, desktop a partir de 768px).

### Fase 3 — Tema: hook + toggle ✅
- [x] Task 3.1: `src/hooks/useTheme.ts` (`Theme`, `getStoredTheme`, `applyTheme`, `useTheme`).
- [x] Task 3.2: `src/components/ui/ThemeToggle.tsx` (64×40, Phosphor `Sun`/`MoonStars`, `aria-pressed`, `aria-label`).
- [x] Task 3.3: Tema aplicado em `main.tsx` antes do primeiro render (sem flash) + integração no `App`.

### Fase 4 — Dados ✅
- [x] Task 4.1: `src/data/profile.ts` (`Profile`, `LinkItem`, `SocialLink` + arrays com placeholders `example.com`).

### Fase 5 — Componentes de feature ✅
- [x] Task 5.1: `LinkButton` (`target="_blank"` + `rel="noopener noreferrer"`).
- [x] Task 5.2: `SocialLinks` (Ionicons via web component `ion-icon` + `addIcons`).
- [x] Task 5.3: `Profile` (avatar light/dark + username).

### Fase 6 — Layout responsivo e composição ✅
- [x] Task 6.1: `App` com container `max-w-[588px]`, `pt-14` (56px) e blocos 192/40/320/88/72px.
- [x] Task 6.2: Botões full-width (540px desktop / 312px mobile via padding de 24px).
- [x] Task 6.3: Fundo desktop vs mobile via media query (768px).

### Fase 7 — Polimento, acessibilidade e validação ✅ (com ressalvas)
- [x] Task 7.1: Estados hover (`surface-hover`), `aria-pressed`/`aria-label`/`aria-hidden`.
- [x] Task 7.2: Validação com browser tools + `tsc`, `build`, `lint` — todos sem erros.
- [x] Task 7.2a: Aplicar CSS das frames **Desktop Dark** e **Desktop Light** recebidas
      (fundo #121214/#FFFFFF, avatar com borda 2px stroke, `@seu.perfil` weight 400,
      switch com track+knob e position por tema, blur 4px nos botões, knob light/dark).
- [x] Task 7.2b: Aplicar CSS das frames **Mobile** (Dark e Light): bg, avatar, username
      (weight 500 no mobile), switch, links com largura 312px e blur 4px.
- [ ] Task 7.3 (pendente): revisar `focus-visible` explícito e `prefers-reduced-motion` (hoje há apenas a transição de 150ms).

### Fase 8 — Documentação ⏳
- [ ] Task 8.1: README (install/run/technologies) e screenshots desktop/mobile.

## 6. Ordem de implementação sugerida

1. Fase 1 (setup + limpeza) → 2. Fase 2 (tokens) → 3. Fase 3 (tema) → 4. Fase 4 (dados) →
   5. Fase 5 (componentes) → 6. Fase 6 (layout) → 7. Fase 7 (polimento/validação) → 8. Fase 8 (docs).

## 7. Arquivos do projeto (atual)

```text
src/
├── assets/            # avatar + backgrounds (do projeto)
├── components/
│   ├── features/      # Profile.tsx, LinkButton.tsx, SocialLinks.tsx
│   └── ui/            # ThemeToggle.tsx
├── data/              # profile.ts (dados + tipos)
├── hooks/             # useTheme.ts (tema)
├── App.tsx            # composição da página
├── index.css          # tokens + Tailwind + fundos
├── main.tsx           # entry (tema antes do render + registro de ícones)
└── ion-icon.d.ts      # tipagem do web component ion-icon

index.html             # Inter (Google Fonts), lang pt-BR, título DevLinks
vite.config.ts         # plugins react + tailwindcss
docs/                  # este plano
```

## 8. Critérios de aceitação por fase

- Fase 2: tokens light/dark, Inter, fundos aplicados. ✅
- Fase 3: toggle funciona, persiste, `data-theme` sincronizado. ✅
- Fases 5–6: 4 botões + 4 ícones + perfil renderizados. ✅
- Fase 7: `tsc`, `build`, `lint` sem erros. ✅

## 9. Branches e commits sugeridos

| Fase | Branch | Commit |
|---|---|---|
| Setup + implementação inicial | `feat/devlinks-page` | `feat: build devlinks page with theme and layout` |
| Docs | `docs/readme` | `docs: add readme with install and run instructions` |

> Obs.: o diretório ainda não é um repositório git; o primeiro passo de versionamento
> é decidir sobre `git init` e o commit inicial (ver Pendências).

## 10. Como cada fase foi validada

- Sempre: `npm run build` (roda `tsc -b && vite build`) e `npm run lint`. ✅ passaram.
- Browser tools (`tools.browser.*`) em `http://localhost:5173`: ✅
  - renderização, estrutura semântica (`main`/`header`/`nav`/`footer`);
  - fonte Inter aplicada; tokens light/dark corretos (texto, surface, stroke);
  - toggle alterna tema, sincroniza `data-theme` + `localStorage` e persiste após reload;
  - hover: light `rgba(0,0,0,0.02)` / dark `rgba(255,255,255,0.05)` (`surface-hover`);
  - ícones: Phosphor no switch e Ionicons (`ion-icon` com SVG no shadow root, 24px);
  - links com `target="_blank"` + `rel="noopener noreferrer"` e hrefs dos placeholders;
  - sem erros/avisos no console; sem scroll horizontal.
- **Limitações:** as ferramentas de browser disponíveis não permitem emular viewport
  1440×1024 ou 360×800; a validação desktop/mobile foi feita por regras CSS (media query
  768px) e estilos computados em ~531px de largura. Comparação visual pixel a pixel com o
  Figma pendente (MCP Figma não configurado nesta sessão).

## 11. Pendências e decisões em aberto

1. Aprovação para instalar dependências — **concluída** para Tailwind/Phosphor/Ionicons.
2. Tailwind v3 ou v4 — decidido: **v4** (`tailwindcss` + `@tailwindcss/vite`).
3. Textos exatos dos botões/footer e redes sociais reais — **confirmar no Figma**; hoje são placeholders (`Link 1..4`, `@seu.perfil`, URLs `example.com`).
4. MCP servers (Context7, Playwright, Figma) — registrar/verificar no OpenCode.
5. Versionamento — o diretório não é um repositório git: definir `git init` + commit inicial e branches por tarefa.
6. Task 7.3: `focus-visible` e `prefers-reduced-motion` (revisão final de acessibilidade).
7. Task 8.1: README e screenshots desktop/mobile.
8. Frames **Mobile** (light/dark) ainda não recebidas/comparadas.

## 12. Próximos passos

1. Decidir sobre `git init` + commit inicial (proposta: `feat/devlinks-page`).
2. Confirmar textos/destinos reais no Figma e substituir os placeholders de `src/data/profile.ts`.
3. Revisar `focus-visible`/`prefers-reduced-motion` (Task 7.3).
4. README + screenshots (Task 8.1).
