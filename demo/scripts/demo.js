/* globals TextProgress */

'use strict';

// Demo runner
function runner(demos) {

	function fixIndent(text) {
		text = text
			.replace(/^[\r\n]+/, '') // strip leading newline
			.replace(/\s+$/g, ''); // strip trailing whitespace

		if (/^\S/gm.test(text)) {
			return text;
		}

		var mat, str, re = /^[\t ]+/gm,
			len, min = 1e3;

		while (mat = re.exec(text)) {
			len = mat[0].length;
			if (len < min) {
				min = len;
				str = mat[0];
			}
		}

		if (min === 1e3) {
			return;
		}

		return text.replace(new RegExp('^' + str, 'gm'), '');
	}

	function escapeHTML(text) {
		var div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	for (var name in demos) {

		// Run the demo
		var element = document.querySelector('[data-demo="' + name + '"]');
		demos[name].run(element);

		// Render demo javascript code
		var demoCode = document.querySelector('[data-demo-code="' + name + '"]'),
			code = demos[name].run.toString(),
			body = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

		if (demoCode) {
			demoCode.className += demos[name].className || '';
			demoCode.innerHTML =
				'<code>' + fixIndent(escapeHTML(body)) + '</code>';
		}
	}
}


runner({
	header: {
		run: function(element) {
			new TextProgress({
				type: {
					name: 'changes',
					total: 6,
					template: '<span class="completed">${completed}</span><span class="remaining">${remaining}</span>'
				},
				element: element
			}).set(4);
		}
	},
	changes: {
		className: 'language-javascript',
		run: function(element) {
			var changes = new TextProgress({
				type: {
					name: 'changes',
					total: 6,
					template: '${total} <span class="completed">${completed}</span><span class="remaining">${remaining}</span>'
				},
				element: element
			});
			changes.set(4);
		}
	},
	terminal: {
		className: 'language-javascript',
		run: function(element) {
			var download = new TextProgress({
				type: {
					name: 'terminal',
					width: 10,
					charRemaining: '&minus;',
					template: '[${percent}% <span class="completed">${completed}</span><span class="remaining">${remaining}</span>]'
				},
				element: element,
				max: 100
			});
			download.set(0);

			var inter = setInterval(function() {
				if (download.getPercent() >= 100) {
					clearTimeout(inter);
				}
				else {
					download.increment(1);
				}
			}, 200);
		}
	}
});
