const filesystem = require('fs-jetpack')
const detectInstall = require('../../../src/lib/detect-install').default
const path = require('path')
const sep = path.sep

test('detects npm modules', async () => {
  const actual = detectInstall('something', { filesystem })
  const expected = { moduleName: 'ignite-something', type: 'npm', version: undefined }
  expect(actual).toEqual(expected)
})

test("won't double prefix", async () => {
  const actual = detectInstall('ignite-something', { filesystem })
  const expected = { moduleName: 'ignite-something', type: 'npm', version: undefined }
  expect(actual).toEqual(expected)
})

test('removes @ version', async () => {
  const actual = detectInstall('ignite-something@">=2.0.0"', { filesystem })
  const expected = { moduleName: 'ignite-something', type: 'npm', version: '">=2.0.0"' }
  expect(actual).toEqual(expected)
})

test('detects plugins from a full path', async () => {
  const moduleName = 'ignite-valid-plugin'
  const directory = path.resolve(`${__dirname}${sep}..${sep}fixtures${sep}${moduleName}`)
  const actual = detectInstall(directory, { filesystem })
  const expected = { type: 'directory', moduleName, directory }
  expect(actual).toEqual(expected)
})

test('detects plugins from a relative path', async () => {
  const moduleName = 'ignite-valid-plugin'
  const directory = `${process.cwd()}${sep}tests${sep}fast${sep}fixtures${sep}${moduleName}`
  const actual = detectInstall(directory, { filesystem })
  const expected = { type: 'directory', moduleName, directory }
  expect(actual).toEqual(expected)
})

test('detects invalid plugin directories', async () => {
  const moduleName = 'ignite-invalid-plugin'
  const actual = detectInstall(moduleName, { filesystem })
  const expected = { type: 'npm', moduleName, version: undefined }
  expect(actual).toEqual(expected)
})
