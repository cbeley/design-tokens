'use strict';

let originCWD;
const mockCWD = jest.fn(() => 'somePath');
beforeAll(() => {
  originCWD = global.process.cwd;
  global.process.cwd = mockCWD;
});

afterAll(() => {
  global.process.cwd = originCWD;
});

const mockReadDir = jest.fn(() =>
  Promise.resolve([
    'icon1.svg',
    'icon2.svg',
    'icon3.svg',
    'readme.md',
    'remember.coffee'
  ])
);

jest.mock('fs-extra', () => {
  return {
    readdir: mockReadDir
  };
});

const getIconFileList = require('../lib/getIconFileList');

test('Get list of icon files', async () => {
  const iconFileList = await getIconFileList();
  expect(iconFileList.length).toBe(3);
  const resolvedList = await Promise.all(iconFileList);
  expect(resolvedList).toEqual([
    { fileName: 'icon1.svg', id: 'icon1' },
    { fileName: 'icon2.svg', id: 'icon2' },
    { fileName: 'icon3.svg', id: 'icon3' }
  ]);
});
