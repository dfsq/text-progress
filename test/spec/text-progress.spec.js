describe('TextProgress', function() {

	var TextProgress = window.TextProgress;

	it('should define TextProgress constructor function', function() {
		expect(TextProgress).to.be.a('function');
	});

	describe('Static properties', function() {
		describe('Progress types', function() {
			it('should have progress types object', function() {
				expect(TextProgress.TYPES).to.be.a('object');
			});

			it('should have all predefined progress types', function() {
				expect(TextProgress.TYPES).to.have.all.keys('simple', 'terminal', 'changes');
			});
		});
	});

	describe('Instance', function() {

		var element, progress;

		beforeEach(function() {
			element = document.createElement('span');
			progress = new TextProgress({
				type: {
					name: 'terminal',
					width: 10,
					template: '[${percent}% <span class="completed">${completed}</span><span class="remaining">${remaining}</span>]'
				},
				element: element,
				max: 100
			});
		});

		it('should create instance object with given config', function() {
			expect(progress).to.be.a('object');
		});

		it('should render correct HTML based on provided config value', function() {
			progress.set(25);
			var expected = '[25% <span class="completed">==</span><span class="remaining">−−−−−−−−</span>]';
			expect(progress.element.innerHTML).to.equal(expected);
		});
	});

});
