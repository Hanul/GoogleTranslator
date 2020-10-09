# GoogleTranslator

## 설정
아래 문서의 `Before you begin` 항목을 그대로 수행합니다.

https://github.com/googleapis/nodejs-translate#before-you-begin

## 사용 방법

### 단일 텍스트 번역
```js
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
```

### CSV 파일 번역
```js
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
```

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)