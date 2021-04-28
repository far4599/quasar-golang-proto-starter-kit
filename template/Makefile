ROOT_PATH=${PWD}
GO_PROTO_DIR=${ROOT_PATH}/server/proto
JS_PROTO_DIR=${ROOT_PATH}/src/proto
TS_PROTOGEN=${ROOT_PATH}/node_modules/.bin/protoc-gen-ts

DOCKER_IMAGE_TAG=hellosvc:latest

protogen:
		mkdir -p ${GO_PROTO_DIR} && mkdir -p ${JS_PROTO_DIR}

		cd ${ROOT_PATH}/proto && protoc \
		--plugin=protoc-gen-ts=${TS_PROTOGEN} \
		--js_out=import_style=commonjs,binary:${JS_PROTO_DIR} \
		--ts_out=service=grpc-web:${JS_PROTO_DIR} \
		./**/*.proto

		cd ${ROOT_PATH}/proto && protoc \
		--go_out=${GO_PROTO_DIR} \
		--go_opt=paths=source_relative \
		--go-grpc_out=${GO_PROTO_DIR} --go-grpc_opt=paths=source_relative \
		./**/*.proto

docker-build-and-run: docker-image-build docker-image-run

docker-image-build:
		docker build -t ${DOCKER_IMAGE_TAG} .

docker-image-run:
		docker run --env-file .env -p 8080:8080 ${DOCKER_IMAGE_TAG}
