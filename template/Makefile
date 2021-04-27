ROOT_PATH=${PWD}
GO_PROTO_DIR=${ROOT_PATH}/server/proto
JS_PROTO_DIR=${ROOT_PATH}/src/proto
TS_PROTOGEN=${ROOT_PATH}/node_modules/.bin/protoc-gen-ts


protogen2:
		mkdir -p ${GO_PROTO_DIR} && mkdir -p ${JS_PROTO_DIR}

		cd ${ROOT_PATH}/proto && protoc \
		--plugin=protoc-gen-ts=${TS_PROTOGEN} \
		--js_out=import_style=commonjs,binary:${JS_PROTO_DIR} \
		--ts_out=service=grpc-web:${JS_PROTO_DIR} \
		hello.proto

		cd ${ROOT_PATH}/proto && protoc \
		--go_out=${GO_PROTO_DIR} \
		--go_opt=paths=source_relative \
		--go-grpc_out=${GO_PROTO_DIR} --go-grpc_opt=paths=source_relative \
		hello.proto
