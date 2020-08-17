document.addEventListener("DOMContentLoaded", function () {

    if(document.querySelector('.hero .article')) {

	try {
		let authors = document.getElementById('article-author').getElementsByTagName('a');
		let l = authors.length;

		for( i = 0; i < l; i++ ) {
			if (l > 2 && i < l-2){
				authors[i].outerHTML += ', ';
			}
		}
		i = l-2;
		authors[i].outerHTML += ' & ';
	} catch(ex) {
		console.log('error: ' + ex);
    }
    }
});