# Vidlvery

## Installation

### Configuration

Create a .env file with the following variables:

```
# The directory in which the video will be exposed to the web (e.g. NGINX directory)
PUBLIC_DIRECTORY_PATH=
# The base URL of your publicly accessible web server (from which the videos will be accessed)
VIDEOS_BASE_URL=
DISABLE_FFMPEG=false

SMTP_HOST=
SMTP_FROM=
SMTP_USER=
SMTP_PASS_FILE=
```

### Run with Docker

The easiest way to deploy this app is to use Docker. Just run the following command:

```shell
docker run \
    --env-file .env \
    --publish 3000:3000 \
    ghcr.io/valfur03/vidlvery:latest
```

## License

Licensed under MIT License, Copyright 2025 Valentin Furmanek.
