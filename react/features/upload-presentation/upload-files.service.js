import http from "./http-common";

class UploadFilesService {
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return http.post("/post", formData, {
            headers: {
                "Access-Allow-Control-Origin": "*",
                "Content-type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }
}

export default new UploadFilesService();