import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const PATHS = {
  distMain: path.join(__dirname, '../../../dist/main/index.js'),
  recordingsDir: path.join(__dirname, '../recordings'),
};

export interface TimingProfile {
  moveDuration: number;
  afterMove: number;
  afterClick: number;
  charDelay: number;
  afterType: number;
  afterKey: number;
  comprehensionPause: number;
  sectionPause: number;
}

export const TIMING: Record<string, TimingProfile> = {
  default: {
    moveDuration: 500,
    afterMove: 200,
    afterClick: 400,
    charDelay: 65,
    afterType: 300,
    afterKey: 250,
    comprehensionPause: 600,
    sectionPause: 1500,
  },
  fast: {
    moveDuration: 300,
    afterMove: 100,
    afterClick: 200,
    charDelay: 40,
    afterType: 150,
    afterKey: 150,
    comprehensionPause: 300,
    sectionPause: 800,
  },
  cinematic: {
    moveDuration: 700,
    afterMove: 350,
    afterClick: 600,
    charDelay: 80,
    afterType: 500,
    afterKey: 400,
    comprehensionPause: 1000,
    sectionPause: 2000,
  },
};

export const RESOLUTION = {
  '480p': { width: 854, height: 480 },
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
};

export type ResolutionKey = keyof typeof RESOLUTION;
