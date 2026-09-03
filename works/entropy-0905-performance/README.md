# ENTROPY / 2026-09-05 Performance Asset Standard

This folder separates **baked production assets** from **camera / state / runtime logic**.

## Rule

Do not keep important baked structures only inside a show HTML file.

Each reusable production state should have:

- `assets/baked/<asset>-vNNN.js` — immutable baked geometry / point-cloud data
- `config/cameras.json` — canonical camera presets
- `states/manifest.json` — which asset + camera + layers form each show state
- `runtime/load-state.js` — one loader used by future viewers / show builds
- `archive/` — old complete show prototypes, only as reference

## Canonical first asset

`assets/baked/network-rich-v001.js`

This is the first canonical production bake based on the working ENTROPY 5.3 structure. It is treated as the stable rich point-cloud/network asset. Never overwrite `v001`; bake new material as `v002`, `v003`, etc.

## Camera identity

A visual state is not only geometry. Its identity is:

`BAKED ASSET + CAMERA PRESET + LAYERS + MOTION PHRASE`

This lets future show files directly read stable assets instead of rebuilding successful structures every time.

## Next baked assets

- `network-branching-v002`
- `volume-lattice-v001`
- `globe-shell-v001`
- `nerve-bundle-v001`
- `terrain-volume-v001`
- `ring-volume-v001`
- `constellation-depth-v001`

Each should get its own camera preset(s), while sharing the same runtime loader.