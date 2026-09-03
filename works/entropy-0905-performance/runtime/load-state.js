import { getNetworkRichV001 } from '../assets/baked/network-rich-v001.js';

export async function loadEntropyProduction() {
  const [manifest, cameras] = await Promise.all([
    fetch('../states/manifest.json').then(r => r.json()),
    fetch('../config/cameras.json').then(r => r.json())
  ]);

  return {
    manifest,
    cameras,
    assets: {
      'network-rich-v001': getNetworkRichV001()
    }
  };
}

export function resolveState(production, stateId) {
  const state = production.manifest.states.find(s => s.id === stateId);
  if (!state) throw new Error(`Unknown ENTROPY state: ${stateId}`);
  const asset = production.assets[state.asset];
  const camera = production.cameras.presets[state.camera];
  if (!asset) throw new Error(`Missing asset: ${state.asset}`);
  if (!camera) throw new Error(`Missing camera: ${state.camera}`);
  return { ...state, asset, camera };
}
