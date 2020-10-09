GoogleTranslator.Translate = METHOD((m) => {

	const GOOGLE_PROJECT_ID = NODE_CONFIG.GoogleTranslator.googleProjectId;

	let translateClient;
	if (GOOGLE_PROJECT_ID !== undefined) {
		let GoogleTranslate = require('@google-cloud/translate').v2.Translate;
		translateClient = new GoogleTranslate({
			projectId: GOOGLE_PROJECT_ID
		});
	}

	return {

		run: (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.text
			//OPTIONAL: params.sourceLang
			//REQUIRED: params.lang
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success

			let text = params.text;
			let sourceLang = params.sourceLang;
			let lang = params.lang;

			let errorHandler;
			let callback;

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}

			if (translateClient === undefined) {
				SHOW_ERROR('GoogleTranslator', '설정되어있지 않습니다. 설정 파일을 확인해주시기 바랍니다.', params);
				callback(text);
			}

			else {

				translateClient.translate(text, {
					from: sourceLang,
					to: lang
				}).then((results) => {
					callback(results[0]);
				}).catch((error) => {

					let errorMsg = error.toString();

					if (errorHandler !== undefined) {
						errorHandler(errorMsg, params);
					} else {
						SHOW_ERROR('GoogleTranslator', errorMsg, params);
					}
				});
			}
		}
	};
});
