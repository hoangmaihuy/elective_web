echo "Pulling tuike_web image..."
docker pull hoangmaihuy/tuike_web
echo "Run tuike_web container on port 3000"
docker run -p 3000:3000 -e "PORT=3000" --name tuike_web -d hoangmaihuy/tuike_web
