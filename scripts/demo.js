/* globals TextProgress */

// Header ++++--
new TextProgress({
	type: {
		name: 'changes',
		total: 6,
		template: '<span class="completed">${completed}</span><span class="remaining">${remaining}</span>'
	},
	element: document.querySelector('.header-progress')
}).set(4);


// Demo #1: changes
var changes = new TextProgress({
	type: {
		name: 'changes',
		total: 6,
		template: '${total} <span class="completed">${completed}</span><span class="remaining">${remaining}</span>'
	},
	element: document.querySelector('#git-log')
});
changes.set(4);


// Demo #2: terminal
var download = new TextProgress({
    type: {
        name: 'terminal',
        width: 10,
        charRemaining: '&minus;',
        template: '[${percent}% <span class="completed">${completed}</span><span class="remaining">${remaining}</span>]'
    },
    element: document.querySelector('#terminal-percent'),
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

[].forEach.call(document.querySelectorAll('[data-percent]'), function(el) {
	console.log('test', el);
	el.onclick = function() {
		var percent = Number(el.getAttribute('data-percent'));
		download.set(percent);
	};
});