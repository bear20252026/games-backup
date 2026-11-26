# Games Backup

A public source-backup shelf for browser games, kept separate from the playable [Games](https://github.com/bear20252026/games) library.

This repository stores editable projects. The source is the primary artifact; GitHub Pages hosts a build of the current source for quick inspection.

**Live preview:** <https://bear20252026.github.io/games-backup/>

## 01 · Curllmooha

An editable reconstruction of [curllmooha.com](https://www.curllmooha.com/): a Three.js meadow portfolio built with React 19, `@react-three/fiber`, three r174, Rapier, GSAP and postprocessing.

- **Editable source:** [`curllmooha-editable/`](./curllmooha-editable/)
- **Complete archive:** [`archives/curllmooha-editable.zip`](./archives/curllmooha-editable.zip)
- **Upstream site:** <https://www.curllmooha.com/>
- **Pages build:** the `Pages` workflow runs `vite build --base=/games-backup/`, normalises the source's root-absolute asset URLs, and publishes the output.
- **Project notes:** [`curllmooha-editable/README.md`](./curllmooha-editable/README.md)
- **Run:** `npm install && npm run dev` → <http://127.0.0.1:8899>
- **Build:** `npm run build` → `dist/`

### What is in the backup

- The 1.18 MB main scene at `src/main.js`, plus scenes, world helpers, flat pages and the data layer.
- Seven work pages, the hire page, the home-page boot sequence, assets, models and third-party runtime shims.
- `package-lock.json`, Vite multi-page config and the verification scripts.
- A dated ZIP of the same project, preserved byte-for-byte in `archives/`.

`node_modules/`, `dist/` and local server logs are deliberately excluded; the source can rebuild them.

## Rights and provenance

This is not the author's original `.jsx` source. It is a reverse-engineered reconstruction assembled from the published production bundle. The original site and its code, writing, artwork and models belong to **Vipin Pathak (curllmooha)**.

The upstream project ships no open-source licence; its README explicitly limits the reconstruction to local study and forbids commercial or secondary publication. Public visibility of this archive does not grant reuse rights. See [`curllmooha-editable/THIRD-PARTY-NOTICES.md`](./curllmooha-editable/THIRD-PARTY-NOTICES.md) and [`curllmooha-editable/README.md`](./curllmooha-editable/README.md) for the detailed notices.
