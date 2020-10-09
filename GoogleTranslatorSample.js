require(process.env.UPPERCASE_PATH + '/node.index.js');

BOOT({
	CONFIG: {
		isDevMode: true,
		defaultBoxName: 'GoogleTranslator'
	},
	NODE_CONFIG: {
		isSingleCoreMode: true,

		GoogleTranslator: {
			googleProjectId: 'catworld-1117'
		}
	}
});
