IMAGE=reachsh/stdlib
ROOT=../..
include $(ROOT)/VERSION
include Makefile.docker

JS-PACKAGE='@reach-sh/stdlib'

$(ROOT)/hs/sol/stdlib.json:
	cd $(ROOT)/hs && $(MAKE) sol/stdlib.json

stdlib_sol.json: $(ROOT)/hs/sol/stdlib.json
	cp -f $< $@

.PHONY: expand
expand: package.json ts/version.ts ts/stdlib_sol.ts

.PHONY: build
build:
	$(ROOT)/scripts/build-image.sh $(IMAGE) Dockerfile
	TAG_ONLY=1 $(ROOT)/scripts/docker-push.sh $(IMAGE)

.PHONY: push
push:
	$(ROOT)/scripts/docker-push.sh $(IMAGE)

.PHONY: format
format: expand
	npm run beautify
	npm run format

.PHONY: check
check: expand
	sbin/check.sh

.PHONY: js-build
js-build: expand
	npm run build

# XXX should be preceded by js-build
# but don't want to re-force it
.PHONY: js-mjs
js-mjs: expand
	sbin/fix.sh

.PHONY: clone-js-stdlib
clone-js-stdlib:
	rm -rf js-reach-stdlib
	git clone https://github.com/reach-sh/js-reach-stdlib.git
	cp -r sbin js-reach-stdlib/sbin

.PHONY: refresh-js-stdlib
refresh-js-stdlib: clone-js-stdlib
	cd js-reach-stdlib && ./sbin/refresh.sh

.PHONY: bump-version-and-publish-js-stdlib
bump-version-and-publish-js-stdlib:
	cd js-reach-stdlib ; \
	echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc; \
	npm publish --access=public --tag=rc; \
	git tag $(RC_VERSION); \
	git push; \
	git push --tags

.PHONY: finalize-patch-js-stdlib
finalize-patch-js-stdlib:
	cd js-reach-stdlib
	echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
	npm version patch
	npm publish --access=public --tag=stable
	npm dist-tag add $(JS-PACKAGE)"@$$(npm view $(JS-PACKAGE)@stable version)" latest
	git push
	git push --tags
