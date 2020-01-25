'use strict';

import npmPackageBoilerpate from '../index';

beforeEach(() => {});

describe('npmPackageBoilerpate function', () => {
	it('should init the npmPackageBoilerpate function', () => {
		const result = npmPackageBoilerpate();
		expect(result).toBe('NPM package boilerplate');
	});
});
