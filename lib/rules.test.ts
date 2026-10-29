import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrbitPosition,
  getNextPlanetId,
  getPrevPlanetId,
  calculateDepthOfField,
  getCameraPreset,
} from './rules';

test('calculateOrbitPosition generates expected coordinates on planar axes', () => {
  // At angle 0, x = radiusX, y = 0, z = 0
  const pos0 = calculateOrbitPosition(10, 8, 0, 0);
  assert.equal(pos0.x, 10);
  assert.equal(pos0.y, 0);
  assert.equal(pos0.z, 0);

  // At angle PI/2, x = 0, z = 8
  const posPi2 = calculateOrbitPosition(10, 8, 0, Math.PI / 2);
  assert.equal(Math.abs(posPi2.x) < 0.001, true);
  assert.equal(Math.abs(posPi2.z - 8) < 0.001, true);

  // With tilt, y is non-zero when z would be non-zero
  const posTilted = calculateOrbitPosition(10, 8, 0.2, Math.PI / 2);
  assert.equal(posTilted.y < 0, true);
});

test('planet navigation correctly cycles and wraps forwards and backwards', () => {
  const ids = ['01', '02', '03', '04', '05', '06'];

  assert.equal(getNextPlanetId('01', ids), '02');
  assert.equal(getNextPlanetId('06', ids), '01'); // wrap to first

  assert.equal(getPrevPlanetId('06', ids), '05');
  assert.equal(getPrevPlanetId('01', ids), '06'); // wrap to last

  // Fallbacks for unknown IDs
  assert.equal(getNextPlanetId('unknown', ids), '01');
  assert.equal(getPrevPlanetId('unknown', ids), '06');
});

test('calculateDepthOfField scales correctly based on Z depth', () => {
  const near = calculateDepthOfField(15, -15, 15);
  const far = calculateDepthOfField(-15, -15, 15);
  const mid = calculateDepthOfField(0, -15, 15);

  assert.equal(near.opacity >= 0.99, true);
  assert.equal(far.opacity <= 0.56, true);
  assert.equal(mid.opacity > far.opacity && mid.opacity < near.opacity, true);

  assert.equal(near.scaleFactor > far.scaleFactor, true);
});

test('getCameraPreset returns valid numbers for hero, solar, and planet modes', () => {
  const heroPreset = getCameraPreset('hero');
  assert.equal(heroPreset.cameraPos.length, 3);
  assert.equal(heroPreset.fov, 46);

  const solarPreset = getCameraPreset('solar');
  assert.equal(solarPreset.cameraPos[1] > 10, true);

  const planetPreset = getCameraPreset('planet', { x: 5, y: 1, z: 2 });
  assert.equal(planetPreset.lookAt[0], 5);
  assert.equal(planetPreset.lookAt[1], 1);
  assert.equal(planetPreset.lookAt[2], 2);
});
