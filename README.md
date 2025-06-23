# Vidlvery

## Installation

### Configuration

Create a .env file with the following variables:

```
WATCH_DIRECTORY_PATH=/tmp/vidlvery
# The directory in which the video will be exposed to the web (e.g. NGINX directory)
PUBLIC_DIRECTORY_PATH=
# The base URL of your publicly accessible web server (from which the videos will be accessed)
VIDEOS_BASE_URL=

SMTP_HOST=
SMTP_FROM=
SMTP_USER=
SMTP_PASS_FILE=
```

### Run with Docker

The easiest way to deploy this app is to use Docker Compose. Just run the following command:

```shell
docker compose up -d
```
