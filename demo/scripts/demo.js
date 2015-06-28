/* globals TextProgress */

new TextProgress({
	type: {
		name: 'changes',
		total: 6,
		template: '<span class="completed">${completed}</span><span class="remaining">${remaining}</span>'
	},
	element: document.querySelector('.header-progress')
}).set(4);
