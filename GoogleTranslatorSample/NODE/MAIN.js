GoogleTranslatorSample.MAIN = METHOD({

	run: () => {

		GoogleTranslator.Translate({
			text: '안녕하세요',
			lang: 'en'
		}, console.log);

		READ_FILE('sample.csv', (content) => {

			GoogleTranslator.TranslateCSV({
				content: content.toString(),
				sourceLang: 'ko'
			}, (result) => {

				WRITE_FILE({
					path: 'sample_translated.csv',
					content: result
				});
			});
		});
	}
});
