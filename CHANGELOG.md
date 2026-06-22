# Changelog

## [2.4.0](https://github.com/jbmunozhuercano/gas-stations-api/compare/gas-stations-api-v2.3.0...gas-stations-api-v2.4.0) (2026-06-22)


### Features

* 2x2 grid buttons, eraser icon, consistent sizing ([45e44a3](https://github.com/jbmunozhuercano/gas-stations-api/commit/45e44a3373d59be3ef622d3bfa2ed9ce09f8f474))
* add desktop station list sorted by price ([c881aa8](https://github.com/jbmunozhuercano/gas-stations-api/commit/c881aa839f98df3336bb90001f7a61f104ce671a))
* add Motion animations to station list ([ad3fd6d](https://github.com/jbmunozhuercano/gas-stations-api/commit/ad3fd6d41143e38f6521a0b68aa9d7ba6127867e))
* animated scroll indicator when list overflows ([09e3cc9](https://github.com/jbmunozhuercano/gas-stations-api/commit/09e3cc9354cab86408f89723f8944911aaaad4cf))
* clickable station list, right side, 33% layout ([6838d64](https://github.com/jbmunozhuercano/gas-stations-api/commit/6838d64fb011da52d78d403af5fbd529a781c6c6))
* mobile - shorter labels, square icon buttons, smaller input ([ab2eb63](https://github.com/jbmunozhuercano/gas-stations-api/commit/ab2eb63b40fca90afc4add5583b7e36491bcbfa3))
* mobile fixed bottom bar with icon-only buttons ([5e145dc](https://github.com/jbmunozhuercano/gas-stations-api/commit/5e145dcaf0a90ed1161cb790d4561903f6f5dcab))
* mobile grid layout - row1: comunidad+municipio, row2: gas+gps+reset ([a00192a](https://github.com/jbmunozhuercano/gas-stations-api/commit/a00192ad49538b9cb384274d8cab5cb19ea6f2d4))
* mobile layout - buttons at top, smaller map, darker list bg ([92df3b4](https://github.com/jbmunozhuercano/gas-stations-api/commit/92df3b4bacce4d0aa5f2075002cfb0b44875fae7))
* mobile/tablet station list overlay ([9a8bb8c](https://github.com/jbmunozhuercano/gas-stations-api/commit/9a8bb8c02f4c1296424912d197e7d6dd48457e20))
* scroll map into view when clicking station on mobile ([b11612a](https://github.com/jbmunozhuercano/gas-stations-api/commit/b11612a49bf98bc439b9bcc261a18bf9949de61e))
* smooth scroll, click animation, fix bottom overflow ([66b3e88](https://github.com/jbmunozhuercano/gas-stations-api/commit/66b3e88e3f5d5977e016e3d2bbb447636e2bcd4b))


### Bug Fixes

* change listing breakpoint from 768px to 1024px ([38ed9f3](https://github.com/jbmunozhuercano/gas-stations-api/commit/38ed9f355aa1a71f10139125dde1333220be376c))
* delay scroll to map after browser layout pass ([5da022e](https://github.com/jbmunozhuercano/gas-stations-api/commit/5da022e550efa1b275cf9e98998a83fa0cac3afc))
* flexbox layout with order for mobile buttons ([ebe7c52](https://github.com/jbmunozhuercano/gas-stations-api/commit/ebe7c52fb144908d90b9f7a805b6b9da551ba7bd))
* force scroll to top after input focus on mobile ([d9981c6](https://github.com/jbmunozhuercano/gas-stations-api/commit/d9981c68ffd186e5a81c30b140fc1cd6bfd63efc))
* GasTypeSelector container width auto on desktop ([fd6f366](https://github.com/jbmunozhuercano/gas-stations-api/commit/fd6f3669bc722f5a1babba8d05c83755799644e1))
* GasTypeSelector grid placement with display:contents wrapper ([e64dddf](https://github.com/jbmunozhuercano/gas-stations-api/commit/e64dddfbe60937fa44938ef670b1e3e54d6e7fc2))
* grid placement on GasTypeSelector container wrapper ([89973ae](https://github.com/jbmunozhuercano/gas-stations-api/commit/89973aefaa11b6c840731e32c2c7e7fe55e0716c))
* increase mobile font size to 0.75rem for selects and input ([84e80c8](https://github.com/jbmunozhuercano/gas-stations-api/commit/84e80c89c6d6c0443b968d9b0b482bf2f3f29d03))
* listing top 3.5em between 1024px-1720px to avoid button overlap ([f43d8a7](https://github.com/jbmunozhuercano/gas-stations-api/commit/f43d8a73d14a23b1eb4b7c532ed0fa2a4cf9e218))
* mobile list in normal flow between map and SEO text ([0ba3684](https://github.com/jbmunozhuercano/gas-stations-api/commit/0ba36844f0f08afc3b7cfa308c34689d2bb67a02))
* more transparent bg (0.65), 1px borders on mobile buttons ([244b0d0](https://github.com/jbmunozhuercano/gas-stations-api/commit/244b0d0d8a24e300f70cc1babedd74011cd8e38f))
* move buttons inside mapRow so they stay at bottom of map ([adae93c](https://github.com/jbmunozhuercano/gas-stations-api/commit/adae93c1297f6ac1935ddaf10c5de19e284a672b))
* move LocationInfo inside mapRow, position at bottom of map ([16a1548](https://github.com/jbmunozhuercano/gas-stations-api/commit/16a154816d48a1128cd484f928f2df081b661cba))
* move StationList after map in DOM for mobile flow ([e160178](https://github.com/jbmunozhuercano/gas-stations-api/commit/e16017857139c07af74d69aa837362de81f585e1))
* prevent price overflow with text-overflow ellipsis ([9c4f5d0](https://github.com/jbmunozhuercano/gas-stations-api/commit/9c4f5d0cc170c0d03212d73db67df8db176e46cb))
* reduce max-height to prevent overflow in 1024px-1720px range ([a621503](https://github.com/jbmunozhuercano/gas-stations-api/commit/a621503aa75deeb3589d9d8597e7f8b49c54ee27))
* reset mobile styles in desktop media queries ([d3a8341](https://github.com/jbmunozhuercano/gas-stations-api/commit/d3a8341523f786cc355e639f3ae66be1fb59c0a6))
* revert button bar transparency to 0.85 ([861354b](https://github.com/jbmunozhuercano/gas-stations-api/commit/861354be13e9b9f8d514a2bebd839dd3c33ddb45))
* scroll to map top instead of page top ([773c26b](https://github.com/jbmunozhuercano/gas-stations-api/commit/773c26bee713ee24f4c0c2a96c544fb1b7aa80d7))
* scroll to map when municipality input gets focus ([07ede0d](https://github.com/jbmunozhuercano/gas-stations-api/commit/07ede0d6271f785ac19bedb579eb7f84831ccdf3))
* scroll to map when station list first appears ([efbf757](https://github.com/jbmunozhuercano/gas-stations-api/commit/efbf757cc0f6c94f53c6debb501af995ce8800d2))
* scroll to top when municipality input is filled ([420f71c](https://github.com/jbmunozhuercano/gas-stations-api/commit/420f71c19948f619d99e6d27072a5718ea5ee06b))
* share marker refs between MapController and markers ([27a0153](https://github.com/jbmunozhuercano/gas-stations-api/commit/27a0153b6e8a5ff94b35623ce7fe193e91b0ade8))
* station list only shows after municipality or location search ([94b9608](https://github.com/jbmunozhuercano/gas-stations-api/commit/94b96086ba802c80dadb021ddeaeb247696d3970))
* transparent bg, remove top border on mobile button bar ([b7fe0f9](https://github.com/jbmunozhuercano/gas-stations-api/commit/b7fe0f945615d5d48d917cfc9e1fcc760b5f758a))


### Reverts

* remove overflow ellipsis fix ([bd18cb0](https://github.com/jbmunozhuercano/gas-stations-api/commit/bd18cb0775501c7a5c9cf86fe1645c1dfa0ff18c))

## [2.3.0](https://github.com/jbmunozhuercano/gas-stations-api/compare/gas-stations-api-v2.2.1...gas-stations-api-v2.3.0) (2026-06-19)


### Features

* add opening hours feature with gray pin for closed gas stations ([85f4ef0](https://github.com/jbmunozhuercano/gas-stations-api/commit/85f4ef073be47635b39d365f263ed2826d5d7bdc))
* disable Google Maps button when gas station is closed ([71abacb](https://github.com/jbmunozhuercano/gas-stations-api/commit/71abacbd4e6ab4bc728e1e864761bdb91687b7e0))
* show 'Cerrada' in red on popup when gas station is closed ([ffab3b0](https://github.com/jbmunozhuercano/gas-stations-api/commit/ffab3b0cccc4d427ce3e84e0617fdc1d09c6562f))


### Documentation

* add opening hours feature to README ([1e930f3](https://github.com/jbmunozhuercano/gas-stations-api/commit/1e930f32374dd815727061db0729df6d5ccf6aef))
* update documentation with opening hours feature ([e547dc7](https://github.com/jbmunozhuercano/gas-stations-api/commit/e547dc7eb977e7a3c0bbd1a0efe9fc45d6ef9343))

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
