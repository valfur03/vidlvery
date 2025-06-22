FROM bash:5.2

RUN apk add ffmpeg inotify-tools

WORKDIR /app

COPY scripts scripts

CMD ["./scripts/ffmpeg-queue.sh", "/tmp/vidlvery"]
