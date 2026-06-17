# Changelog

## [2.2.1](https://github.com/jbmunozhuercano/gas-stations-api/compare/gas-stations-api-v2.2.0...gas-stations-api-v2.2.1) (2026-06-17)


### Miscellaneous

* upgrade Next.js to 16.2.9 ([6a8b36a](https://github.com/jbmunozhuercano/gas-stations-api/commit/6a8b36a847394ecc814dcb9438758a606c72634a))
* upgrade Next.js to 16.2.9 ([be88218](https://github.com/jbmunozhuercano/gas-stations-api/commit/be88218404b81c99e23f7b1d748349da79cfe4b6))

## [2.2.0](https://github.com/jbmunozhuercano/gas-stations-api/compare/gas-stations-api-v2.1.8...gas-stations-api-v2.2.0) (2026-06-16)


### Features

* center map on municipality when searching by location ([ef384db](https://github.com/jbmunozhuercano/gas-stations-api/commit/ef384db1613e029139b5791284285b956fee84df))
* zoom level 13 when centering map on municipality search ([e1c9ec8](https://github.com/jbmunozhuercano/gas-stations-api/commit/e1c9ec825aab7e701574c170ae864f29caf82f30))


### Bug Fixes

* move filteredCenter before mapCenter to fix initialization error ([490bb64](https://github.com/jbmunozhuercano/gas-stations-api/commit/490bb64e71fc43b419ac23a6b9b35e5a580e1965))
* only zoom to 13 when municipality field is filled, not on region change ([537723f](https://github.com/jbmunozhuercano/gas-stations-api/commit/537723fe7b1cae93b99a771c98b5a69f7d845ceb))
* trim trailing space from municipality input on mobile autocomplete ([fb23dbc](https://github.com/jbmunozhuercano/gas-stations-api/commit/fb23dbcbb30130b9a763a015570196564f6f7494))

## [2.1.8](https://github.com/jbmunozhuercano/gas-stations-api/compare/gas-stations-api-v2.1.7...gas-stations-api-v2.1.8) (2026-06-16)


### Bug Fixes

* add name attribute and specific autoComplete for mobile autocomplete ([7aea2cb](https://github.com/jbmunozhuercano/gas-stations-api/commit/7aea2cbaf02861c18bf79905894b94540cba5ba5))
* allow spaces in municipality input for mobile autocomplete ([6a92d54](https://github.com/jbmunozhuercano/gas-stations-api/commit/6a92d54e943d999bcc05aa4416fb40bc9500d91a))

## [2.1.7](https://github.com/jbmunozhuercano/gas-stations-api/compare/gas-stations-api-v2.1.6...gas-stations-api-v2.1.7) (2026-06-16)


### Bug Fixes

* map fills viewport height on desktop ([9a1a567](https://github.com/jbmunozhuercano/gas-stations-api/commit/9a1a5677a669597a2e799500f3a6a5e6ef5f4d34))
* position error message absolute so it doesn't shrink the map ([1fd7903](https://github.com/jbmunozhuercano/gas-stations-api/commit/1fd79032fa31a6783f2b282d2eabc6d09b0ef0fa))
* translate error messages to Spanish, fix error position and auto-dismiss ([118429c](https://github.com/jbmunozhuercano/gas-stations-api/commit/118429c95771d63408f421f70c3f2d396d49552e))

## [2.1.6](https://github.com/jbmunozhuercano/gas-stations-api/compare/gas-stations-api-v2.1.5...gas-stations-api-v2.1.6) (2026-06-08)


### Bug Fixes

* allow accented Spanish characters in municipality input ([e9cdee6](https://github.com/jbmunozhuercano/gas-stations-api/commit/e9cdee61d7000298582b321b2ae4ff5e5dfa0ff9))
* display human-readable fuel names in LocationInfo ([85deed9](https://github.com/jbmunozhuercano/gas-stations-api/commit/85deed9252fd1c9b3141c2d9b331df34c2c7eac8))
* raise Leaflet popup z-index above listHeader ([c4aa6e7](https://github.com/jbmunozhuercano/gas-stations-api/commit/c4aa6e7fda351590f226dfd02b722a015ecc3f18))


### Miscellaneous

* fix typo, remove dead CSS and duplicate styles ([b65038f](https://github.com/jbmunozhuercano/gas-stations-api/commit/b65038fe7e6a904ee4688537c703a55f2b97d834))
* remove debug console.logs and standardize API response ([6ecb856](https://github.com/jbmunozhuercano/gas-stations-api/commit/6ecb856d71374ba4121f10838f754cd9fd43c052))
* remove unused Pagination component and motion dependency ([6bf69db](https://github.com/jbmunozhuercano/gas-stations-api/commit/6bf69dbd978919877f1d1e732a167e8f83a98322))
* replace inline styles with CSS classes, remove axios from Select ([3c24a3a](https://github.com/jbmunozhuercano/gas-stations-api/commit/3c24a3a19e23a2c1c3002d46a254ce5b6ca82677))

## [2.1.5](https://github.com/jbmunozhuercano/gas-stations-api/compare/gas-stations-api-v2.1.4...gas-stations-api-v2.1.5) (2026-06-08)


### Documentation

* add testing section to README and update AGENTS.md ([991738d](https://github.com/jbmunozhuercano/gas-stations-api/commit/991738ddeed0e9854300519e5f2f1ed673d408a1))


### Miscellaneous

* configure vitest testing framework ([2aa9cde](https://github.com/jbmunozhuercano/gas-stations-api/commit/2aa9cdec4f15824a132d497298acd966ac6372db))
* remove unused eslint-disable comments ([498053b](https://github.com/jbmunozhuercano/gas-stations-api/commit/498053bcabeaa705f029d6b686697b8c9a1a6df9))
