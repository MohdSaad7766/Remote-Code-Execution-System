FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y gcc && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY run.sh /run.sh
RUN chmod +x /run.sh

CMD ["/run.sh"]
