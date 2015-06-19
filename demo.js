new TextProgress({
	type: {
		name: 'changes',
		total: 6,
		template: '<span class="completed">${inserted}</span><span class="remaining">${deleted}</span>'
	},
	element: document.querySelector('.header-progress')
}).set(4);
