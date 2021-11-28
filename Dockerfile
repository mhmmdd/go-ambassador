FROM golang:1.17-alpine

WORKDIR /app
COPY go.mod .
COPY go.sum .

ENV GOPROXY=https://goproxy.io,direct

RUN go mod download

COPY . .

CMD ["go", "run", "main.go"]