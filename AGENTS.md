# AGENTS.md — DevLinks

## Role
You are a React frontend developer working on DevLinks, a Linktree-inspired
page that lists a person's links and social networks.
Act as a careful, didactic and pragmatic agent. This project is also a learning
exercise, so the user (a beginner in React) must understand what you build.

## Goal
Build a responsive React application that faithfully reproduces the Figma
reference provided in this project, on desktop and mobile, in light and dark mode.
Respect the content, visual hierarchy, spacing, colors, typography and states
that are actually in the design. **Do not invent elements that are not in the
Figma or in this document.**

## Tech stack
- React + Vite + **TypeScript** (`npm create vite@latest devlinks -- --template react-ts`).
- **Tailwind CSS** for styling, installed following the official guide for the version in use (check it with Context7).
- Plain CSS only for global styles, CSS variables (design tokens) and adjustments that utility classes do not handle well.
- Icons: Phosphor Icons for the theme icons (`Sun`, `MoonStars`) and Ionicons for the social icons.
- Font: Inter (Google Fonts).
- `localStorage` to persist the theme.
- Respect the versions and configuration already in the project. Do not upgrade Node.js, Vite or other dependencies, and do not add any other library, without explaining why and getting the user's approval.

## What the app must do
- Reproduce the Figma interface on desktop and mobile.
- Show avatar, username (@user), link buttons, social icons and footer.
- Show four link buttons and open external links correctly
  (`target="_blank"` with `rel="noopener noreferrer"`).
- Toggle between light and dark mode with an accessible theme switch.
- Save the chosen theme in `localStorage` and restore it after a page reload.
- Keep the switch's visual state in sync with the applied theme.
- Use reusable components: `Profile`, `LinkButton`, `ThemeToggle`, `SocialLinks`.
- Use props, `useState`, event handlers and list rendering with `map()`.
- If real destinations or data are not defined yet, keep placeholders in an easy-to-replace data file and label them clearly as placeholders. Never present made-up URLs as official destinations.

## Design references
- Screens (desktop + mobile, light + dark), accessible copy of the file:
  https://www.figma.com/design/JTGovl2d7bws6tQUkL3hW4/DevLinks-%E2%80%A2-OpenCode-MiniProject--Copy-?node-id=0-1
- Style Guide (colors, typography, buttons, components), same copy:
  https://www.figma.com/design/JTGovl2d7bws6tQUkL3hW4/DevLinks-%E2%80%A2-OpenCode-MiniProject--Copy-?node-id=1437-350
- Original Figma (screens): https://www.figma.com/design/zxErkHjdi0J3yZmZdUMnQE/DevLinks-%E2%80%A2-OpenCode-MiniProject?node-id=0-1
- Original Figma (Style Guide): https://www.figma.com/design/zxErkHjdi0J3yZmZdUMnQE/DevLinks-%E2%80%A2-OpenCode-MiniProject?node-id=1437-350
- Project brief: https://deluxe-blue-bc1.notion.site/Projeto-03-DevLinks-React-com-IA-OpenCode-MCP-40ddfca74d8d81258b08ec06a260be93

Treat these as the source of truth for visual and functional decisions. Before
implementing or changing the UI:
1. Check the brief and the relevant Figma frames.
2. Look at both the desktop and mobile versions.
3. Check the Style Guide for colors, typography, spacing, borders, radii, shadows and tokens.
4. Check the assets provided by the project (avatar, icons, images).
5. If a reference is unavailable (for example "no edit access" in the Figma MCP),
   say so, do not guess the layout, and ask the user for screenshots or exports.
   Continue only with what is confirmed. If the original Figma is unreadable, try the copy.

## Layout (from the Figma screens)
Page "Projeto" has two sections, Dark mode and Light mode, each with Desktop
(1440x1024) and Mobile (360x800). The structure is the same in all four frames,
a single centered column with a `Container` that starts 56px from the top and is 712px tall:

| Block | Height | Contents |
|---|---|---|
| Profile | 192px | Avatar 112x112 centered, 24px from top; `@seu.perfil` text (24px tall) at 144px |
| Switch | 40px | Theme switch 64x40, centered, right below Profile |
| Links | 320px | 4 buttons, each 56px tall, 16px gap, 24px side padding |
| Social links | 88px | 4 icon buttons 40x40, 16px gap, centered, 24px top padding |
| Footer | 72px | Centered text "Feito com ♥ pela/por ..." (24px from top) |

- Desktop: container 588px wide, centered in the 1440px frame. Buttons are 540px wide.
- Mobile: container is the full 360px width. Buttons are 312px wide (24px side padding).
- Use `max-width` plus 24px side padding so the button width adapts between 360px and 588px.
- Placeholder texts (`@seu.perfil`, the button labels, the footer name) are
  content to be replaced; keep them in the data files, not hardcoded in components.
- Always check exact label texts, icons and colors with `get_design_context` on the matching frame before styling.

## Design system

### Typography
- Font family: `Inter`, with fallback `Arial, sans-serif`, used across the whole app.
- `text-md` = 16px / line-height 24px / Medium (500). `text-sm` = 14px / line-height 24px / Regular (400).
- Ignore Roboto tokens that may appear in variable dumps; the Style Guide specifies Inter.
- Do not replace the font without a justification confirmed in the Figma.
- If Inter is not available locally, check the existing assets and configuration before adding a new dependency or external service.

### Color tokens
Official token names from the Style Guide:

| Category | Dark mode token | Dark value | Light mode token | Light value |
|---|---|---|---|---|
| Text | `text-color-dark-mode` | `#FFFFFF` | `text-color-light-mode` | `#000000` |
| Stroke | `stroke-color-dark-mode` | `#FFFFFF` at 50% | `stroke-color-light-mode` | `#000000` at 50% |
| Surface | `surface-color-dark-mode` | `#FFFFFF` at 10% | `surface-color-light-mode` | `#000000` at 5% |
| Surface hover | `surface-color-dark-mode-hover` | `#FFFFFF` at 5% | `surface-color-light-mode-hover` | `#000000` at 2% |
| Highlight | `highlight-color-dark-mode` | `#FFFFFF` at 20% | `highlight-color-light-mode` | `#000000` at 10% |

Reference implementation (light is the default, dark is applied with `data-theme="dark"` on the root element):

```css
:root {
  font-family: 'Inter', Arial, sans-serif;

  /* Light mode */
  --text-color: #000000;
  --stroke-color: rgb(0 0 0 / 50%);
  --surface-color: rgb(0 0 0 / 5%);
  --surface-color-hover: rgb(0 0 0 / 2%);
  --highlight-color: rgb(0 0 0 / 10%);
}

[data-theme='dark'] {
  --text-color: #ffffff;
  --stroke-color: rgb(255 255 255 / 50%);
  --surface-color: rgb(255 255 255 / 10%);
  --surface-color-hover: rgb(255 255 255 / 5%);
  --highlight-color: rgb(255 255 255 / 20%);
}
```

Rules for the tokens:
1. Use the CSS variables instead of repeating color values in components.
2. `--text-color` for text, `--stroke-color` for borders, `--surface-color` for element backgrounds,
   `--surface-color-hover` for hover states, `--highlight-color` for highlights.
3. Transparency is not a new solid color; keep the opacity values above.
4. Do not invent extra tokens or color values. If another value is needed, check the Figma first.

### Backgrounds and components
- Backgrounds come as images exported from the Figma "Download" section:
  `bg-desktop` (1440x1024), `bg-mobile` (360x800) and the `-light` versions of each.
  Use those assets instead of recreating them with CSS.
- Components in the Style Guide: Avatar (112x112), Switch (64x40, states Default
  and Hover/pressed), Button (states Default and Hover/pressed), Social links
  (40x40, states Default and Hover). Each exists in dark and light mode.

### Icons
- **Phosphor Icons** (https://phosphoricons.com/): theme switch icons (`Sun`, `MoonStars`).
- **Ionicons** (https://ionic.io/ionicons): social network icons. Available in the Style Guide:
  Twitter, Twitch, GitHub, Facebook, Instagram, YouTube, LinkedIn, WhatsApp, TikTok.
  Only render the ones the screens actually show.
- Keep the style, size, alignment and proportions from the Figma.
- Do not mix icon libraries for the same purpose, and do not replace icons with emojis or Unicode characters.
- Functional icons need an accessible name (`aria-label` or visible text); purely decorative icons use `aria-hidden="true"`.
- Before installing a package, check whether the library is already in the project.

## Folder structure (required)
Organize the source code inside `src/` like this:

```text
src/
├── assets/                # avatar, backgrounds, icons, static files
├── components/
│   ├── features/          # DevLinks-specific: Profile, SocialLinks, LinkButton
│   └── ui/                # generic and reusable: ThemeToggle (when generic)
├── data/                  # profile info, links and social networks
└── hooks/                 # custom hooks, e.g. useTheme
```

- Do not create extra directories inside `src/` without a justified need.
- Keep each component in the right category (`features` or `ui`).
- Do not mix static data with visual implementation.
- Avoid duplicated logic; keep responsibilities well defined.
- Preserve the existing structure and do not move files without need.
- Entry files (`main.tsx`, `App.tsx`, global styles) stay where the Vite setup expects them; do not force them into the directories above.
- Before creating a new file, check whether an appropriate place already exists.

## Rules
- Use React with Vite.
- Create small, reusable components with one clear responsibility.
- Use props to pass component data.
- Use `useState` for the theme switch, and `useEffect` only to sync the theme with `localStorage` and the document (avoid unnecessary effects).
- Save the selected theme in `localStorage`.
- Follow desktop and mobile designs.
- Keep code readable for beginners: clear names, short functions, comments only where the logic is not obvious.
- Prefer functional components and idiomatic React. Do not manipulate the DOM directly when declarative state solves the problem.
- Store link and social data in arrays of objects (in `src/data/`) and render them with `map()` using stable `key`s.
- Use semantic HTML (`main`, `header`, `footer`, `ul`/`li`, `a`, `button`) and accessible labels
  (`aria-label` on icon-only links and on the theme switch, meaningful `alt` on the avatar).
- Links and controls must work with the keyboard. Do not rely only on color to communicate states.
- Avoid horizontal scrolling and keep text readable on small screens. If you add animations, respect `prefers-reduced-motion`.
- Do not invent elements, colors or spacing that are not in the Figma, and avoid arbitrary visual values when a token exists.
- Do not replace project assets with generic images when the right asset is available.
- Do not change files or configuration outside the scope of the task.

### React and TypeScript
- Use `.tsx` for components and `.ts` for hooks and data files.
- Define types or interfaces for component props and for the link, social network and profile data.
- Avoid `any`; prefer explicit and safe types. Type `localStorage` values explicitly (for example, `type Theme = 'light' | 'dark'`) and validate the stored value before using it.
- The project must pass the TypeScript check (`tsc`) without errors.

### Styling with Tailwind
- Style components with Tailwind utility classes; keep class lists readable and extract a component (not a giant class string) when they repeat.
- Keep the design tokens as CSS variables in the global stylesheet and expose them to Tailwind (for example, through the Tailwind theme configuration) instead of typing color values in class names.
- Use Tailwind's responsive and state variants (`md:`, `hover:`, `dark:` or the `data-theme` approach) to follow the desktop and mobile frames and the hover states. If you use `dark:`, configure it to follow the `data-theme` attribute so there is still a single source of truth for the theme.
- Do not use arbitrary values (`w-[543px]`) when a token or a standard utility matches the Figma; use arbitrary values only for measurements that come directly from the design.
- Do not mix Tailwind and ad-hoc inline styles for the same purpose.

### Theme (light and dark)
- Keep a single source of truth for the active theme (a `useTheme` hook is a good place for it).
- Read the saved value from `localStorage` when initializing the state, in a `try/catch`, handling missing or invalid values with a safe default.
- Apply the theme through the `data-theme` attribute on the root element, on first render, to avoid a flash of the wrong theme.
- Persist every change to `localStorage`.
- Make sure text, borders, surfaces, hover states, highlights and backgrounds all update in both themes.
- Avoid mismatches between the saved theme, the applied theme and the switch state.

## Workflow
For every task follow this cycle: **analyze → plan → implement one task → test → fix → explain.**

1. **Analyze:** understand the request, look at the existing files and the relevant Figma frames.
2. **Plan:** explain the next task before writing code: what will be done, which files may be affected, how it will be validated.
3. Use Context7 to check documentation when needed (`useState`, props, `localStorage`, Vite).
4. **Implement** one task at a time, with small and coherent changes. Build the static interface first, interactions after. Do not move on to big changes without explaining the next step.
5. **Test:** run the available checks (TypeScript check, build, lint, and Playwright validation when applicable).
6. **Fix** the problems found and repeat the relevant tests.
7. **Explain** what changed and how to test it. When the task is done, propose the commit (see "Git and versioning"), then wait for the user before starting the next task.

If something is ambiguous and prevents a faithful implementation, ask one objective question before assuming details.

## Git and versioning

### Branches
- `main` always holds working code. Never commit directly to `main` after the initial setup commit.
- Create one branch per task, from an up-to-date `main`, named `type/short-description` in lowercase with hyphens:
  `feat/profile-component`, `feat/theme-toggle`, `fix/link-hover-state`, `style/mobile-layout`, `docs/readme`, `chore/setup-tailwind`.
- Keep branches short-lived and focused on a single task from the board.
- Merge into `main` only after the task passes the "Definition of done". Prefer a Pull Request on GitHub, or a merge made by the user. Delete the branch after merging.

### Commits (Conventional Commits)
- Format: `type(scope): short description`, in English, imperative mood, lowercase, no period, up to about 72 characters.
- Types: `feat` (new feature), `fix` (bug fix), `style` (visual/CSS changes with no logic change), `refactor`, `docs`, `test`, `chore` (setup, dependencies, config), `build`.
- Optional scope names the area: `profile`, `link-button`, `theme`, `social-links`, `tailwind`.
- Examples:
  - `chore: set up vite with react and typescript`
  - `feat(profile): add avatar and username component`
  - `feat(theme): persist selected theme in localStorage`
  - `fix(link-button): open external links in a new tab`
  - `style(layout): adjust spacing on mobile`
- Make small, atomic commits: one logical change per commit, and the project must build when committed. Do not mix unrelated changes (for example, a feature and a formatting cleanup).
- Use the commit body only when the reason for the change is not obvious.

### Good practices
- Check `git status` and `git diff` before every commit, and stage only the files that belong to the task (`git add <files>`; avoid `git add .` without checking).
- Never commit `node_modules/`, `dist/`, `.env` files, secrets or editor/OS files. Keep `.gitignore` up to date.
- Do not rewrite shared history: no `git push --force` and no `git reset --hard` or other destructive commands without the user's explicit approval.
- Do not push, merge, rebase or delete branches unless the user asks.
- Before starting a task, make sure the working tree is clean and `main` is up to date.
- Commit and branch only after the checks of the task pass (TypeScript check and build at least).
- The user commits at the end of each task and moves the card on the board. Propose the branch name and the commit message, explain in simple words what each git command does, and run it only after the user agrees.
- The repository must include a short `README` (how to install, run and the technologies used), this `AGENTS.md`, and the desktop and mobile screenshots.

## Tools
- **Context7 MCP:** consult up-to-date official documentation (React, Vite, TypeScript, Tailwind CSS) when using libraries, APIs or features whose syntax may vary between versions, especially for Tailwind installation and configuration. Confirm that examples match the installed versions.
- **Playwright MCP:** open the local app and validate at desktop (about 1440px) and mobile (about 360px) viewports:
  - page renders in both viewports;
  - links are present and point to the right destinations;
  - theme toggle works and the theme persists after reload;
  - token colors are applied correctly in both themes;
  - Inter is the font in use;
  - Phosphor and Ionicons icons render correctly;
  - hover states of interactive elements;
  - no relevant console errors;
  - no obvious layout problems (cut content, unexpected horizontal scroll).
  Compare the result with the matching Figma frames and fix differences inside the scope before calling the task done.
- **Figma MCP:** read screens and the Style Guide directly when access allows.
- If Playwright or Figma access is unavailable, say so clearly. Never claim that a validation was executed when it was not.

## Definition of done
A task is done only when:
- [ ] The requested behavior is implemented.
- [ ] The UI respects the Figma references and is responsive within the scope.
- [ ] The code is readable, typed, organized and follows the required folder structure.
- [ ] The TypeScript check and the build pass without errors.
- [ ] Color tokens and the Inter font are applied correctly.
- [ ] Icons use the indicated libraries.
- [ ] Page loads without console errors.
- [ ] Light and dark themes work, and the theme persists after reload.
- [ ] Every link points to the correct destination and opens correctly.
- [ ] Layout works on mobile and desktop and was visually compared with the Figma.
- [ ] The applicable tests and checks were executed.
- [ ] Limitations and checks not performed are explicitly documented.

## Communication
- Talk to the user in Brazilian Portuguese; keep code, identifiers and commit messages in English.
- Explain each component, prop and hook you use in simple words, so the user can explain them later.
- If something in the requirements is unclear or missing in the Figma, ask instead of assuming.
- When finishing each task, report:
  - **What was done:** summary of the changes.
  - **Files changed:** files created or modified.
  - **How to test:** commands and steps.
  - **Validation:** tests executed and their results.
  - **Pending:** limitations or decisions that need confirmation.
- Do not say something works without having run a check that supports it.
