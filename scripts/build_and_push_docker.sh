echo "Build tuike_web from source..."
UMI_ENV=live npm run build
echo "Build docker image..."
docker build -t hoangmaihuy/tuike_web -f Dockerfile.live dist
echo "Push to docker hub"
docker push hoangmaihuy/tuike_web
