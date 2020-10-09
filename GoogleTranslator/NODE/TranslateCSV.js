GoogleTranslator.TranslateCSV = METHOD((m) => {

	const Papa = require('papaparse');

	return {

		run: (params, callbackOrHandlers) => {
			//REQUIRED: params.content
			//REQUIRED: params.sourceLang
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success

			let content = params.content;
			let sourceLang = params.sourceLang;

			let errorHandler;
			let callback;

			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}

			let data = Papa.parse(content).data;

			let langs;
			NEXT(data, [(texts, next, i) => {

				// 첫번째 줄은 언어 설정
				if (i === 0) {
					langs = texts;
					next();
				}

				else {

					let sourceText;
					EACH(texts, (text, j) => {
						if (j > 0 && text !== '' && langs[j] === sourceLang) {
							sourceText = text;
							return false;
						}
					});

					if (sourceText !== undefined) {
						NEXT(langs, [(lang, next, j) => {
							if (j > 0 && lang !== sourceLang) {

								GoogleTranslator.Translate({
									text: sourceText,
									sourceLang: sourceLang,
									lang: lang
								}, {
									error: errorHandler,
									success: (result) => {
										texts[j] = result;
										next();
									}
								});

							} else {
								next();
							}
						}, () => {
							return next;
						}]);
					}

					else {
						next();
					}
				}
			}, () => {
				return () => {
					callback(Papa.unparse(data));
				};
			}]);
		}
	};
});
