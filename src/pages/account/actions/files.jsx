import { API } from "../../../config";

export const REQUEST = "/request";
export const SUCCESS = "/success";
export const ERROR = "/error";

export const UploadFiles = "/UploadFiles";
export const DownloadFiles = "/DownloadFiles";
export const fileNames = [
	"Presentation",
	"Business Presentation",
	"Video Presentation",
	"Social post",
	"Instagram",
	"Promo Picture",
	"Promo Video",
	"Platform Tutorial",
];

const GetFileFetch = async (content) => {
	let response = await API(
		"/Administrator" + DownloadFiles + "?Content=" + content,
		"file"
	);
	return response;
};

const UploadFileFetch = async (content, data) => {
	let response = await API(
		"/Administrator" + UploadFiles + "?Content=" + content,
		"put",
		data
	);
	return response;
};

// Convert image to base64

const convertFile = (data) => {
	var reader = new FileReader();
	return new Promise((resolve, reject) => {
		reader.onerror = () => {
			reader.abort();
			reject(new DOMException("Problem parsing input file."));
		};
		reader.onloadend = function () {
			resolve(reader.result);
		};
		reader.readAsDataURL(data);
	});
};

// Action functions

const ActionRequest = (type, block) => ({
	type: type + REQUEST,
	payload: block,
});

const ActionError = (type, error) => ({
	type: type + ERROR,
	payload: error,
});

const ActionSuccess = (type, data) => ({
	type: type + SUCCESS,
	payload: data,
});

export const GetFile = (content) => (dispatch) => {
	dispatch(ActionRequest(DownloadFiles, content));
	GetFileFetch(content)
		.then(async function (res) {
			console.log("file", content);
			if (res.ok) {
				//let file = await convertFile(res.data);
				let type = res.data.type.split("/")[1];
				let file = new Blob([res.data], { type });

				dispatch(
					ActionSuccess(DownloadFiles, {
						content,
						file,
					})
				);
			} else if (res.status === 404) {
				dispatch(
					ActionSuccess(DownloadFiles, {
						content,
						file: null,
					})
				);
			} else {
				dispatch(
					ActionError(DownloadFiles, {
						content,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					})
				);
			}
		})
		.catch((error) => {
			console.log("file", content);
			dispatch(
				ActionError(DownloadFiles, {
					content,
					error: {
						type: error.status,
						message: error.message,
					},
				})
			);
		});
};

export const UpdateFile = (file, content) => (dispatch) => {
	dispatch(ActionRequest(UploadFiles, content));

	UploadFileFetch(content, file)
		.then((res) => {
			if (res.ok) {
				dispatch(ActionSuccess(UploadFiles, content));
			} else {
				dispatch(
					ActionError(UploadFiles, {
						content,
						error: {
							type: res.error.status,
							message: res.error.message,
						},
					})
				);
			}
		})
		.catch((error) => {
			dispatch(
				ActionError(UploadFiles, {
					content,
					error: {
						type: error.status,
						message: error.message,
					},
				})
			);
		});
};
