/* eslint-disable @typescript-eslint/naming-convention */
import { chrome } from 'jest-chrome';

import manifest from './manifest.json';

describe('manifest.json', () => {
  beforeEach(() => {
    chrome.runtime.getManifest.mockImplementation(() => manifest);
  });

  it('contains all required keys', () => {
    const { name, version, manifest_version } = chrome.runtime.getManifest();

    expect(name).toBeDefined();
    expect(version).toBeDefined();
    expect(manifest_version).toBeDefined();
  });

  it('contains version 3', () => {
    const { manifest_version } = chrome.runtime.getManifest();

    expect(manifest_version).toBe(3);
  });

  it('contains service worker configuration', () => {
    const { background } = chrome.runtime.getManifest();

    expect(background.service_worker).toBe('service-worker.js');
  });

  it('contains content scripts configuration', () => {
    const {
      content_scripts: [script],
    } = chrome.runtime.getManifest();

    expect(script.js).toEqual(['scripts/content-scripts.js']);
  });

  it('contains popup configuration', () => {
    const {
      action: { default_popup },
    } = chrome.runtime.getManifest();

    expect(default_popup).toEqual('popup/popup.html');
  });

  it('contains options page configuration', () => {
    const { options_page } = chrome.runtime.getManifest();

    expect(options_page).toEqual('options/options.html');
  });
});
