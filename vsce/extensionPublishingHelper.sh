#!/bin/sh
# ^-- SC2148: Tips depend on target
# shell and yours is unknown. Add a
# shebang or a 'shell' directive.

echo
echo "Building Docker image to publish"
echo "version $VER of the extension"
echo "using $NODE_IMAGE..."
echo
# Give the new image a tag of "img".
docker build \
  --build-arg NODE_IMAGE="${NODE_IMAGE}" \
  --pull=false \
  -t img \
  .

# Give publish, "$VER", -p and "$KEY"
# all as arguments to vsce, which is the
# tool we use to publish our extension.
# We need the "publish" argument to
# publish our extension at all.
# We need the "$VER" argument to have
# our extension's version synchronize
# with the rest of our versioning.
# We need the -p and "$KEY" arguments
# to have the permissions necessary to
# publish this extension under our
# organization's name.
echo
echo "Running Docker image to publish"
echo "version $VER of our extension..."
echo
docker run img publish "$VER" -p "$KEY"
# ^--^ SC2086: Double quote to prevent
# globbing and word splitting.
