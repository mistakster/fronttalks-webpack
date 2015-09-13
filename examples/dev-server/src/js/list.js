// для компоненты нужны стили
require('../less/list.less');
// и шаблон
var listTemplate =
	require('../jade/list.jade');
// заменяем содержимое документа
document.body.innerHTML =
	listTemplate();
