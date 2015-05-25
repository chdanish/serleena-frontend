/******************************************************************************
 * 
 * This file is part of Serleena-Frontend
 * 
 * The MIT License (MIT)
 *
 * Copyright (C) 2015 Antonio Cavestro, Matteo Lisotto.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *****************************************************************************/


/**
  * Name: WizardDirectiveControllerTest
  * Package: Wizard
  * Author: Matteo Lisotto <matteo.lisotto@gmail.com>
  *
  * History
  * Version    Programmer        Changes
  * 1.0.0      Matteo Lisotto    Crea file e test per WizardDirectiveController
  *
  */

describe('WizardDirectiveController Test', function () {
    var $scope, controller;

    beforeEach(module('wizard'));

    beforeEach(inject(function ($controller, $rootScope) {
	$scope = $rootScope.$new();

	controller = $controller('WizardDirectiveController', {
	    $scope: $scope
	});
    }));

    beforeEach(function () {
	spyOn($scope, '$emit');
    });
   
    it('hasNext', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);

	$scope.steps.push(4, 55, 33);
	var result = $scope.hasNext();

	expect(result).toBe(true);
    });

    it('Not hasNext', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);

	var result = $scope.hasNext();

	expect(result).toBe(false);
    });

    it('hasPrevious', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);

	$scope.currentStepIndex = 2;
	var result = $scope.hasPrevious();

	expect(result).toBe(true);
    });

    it('Not hasPrevious', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);

	var result = $scope.hasPrevious();

	expect(result).toBe(false);
        });

    it('isFinal', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);

	$scope.steps.push(4, 55, 33);
	$scope.currentStepIndex = 2;
	var result = $scope.isFinal();

	expect(result).toBe(true);
    });

    it('Not isFinal', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);

	$scope.steps.push(4, 55, 33);
	var result = $scope.isFinal();

	expect(result).toBe(false);
    });

    it('Successfully nextStep', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);

	var obj = {
	    currentStep: true,
	};
	var obj2 = {
	    currentStep: false,
	};
	$scope.steps.push(obj, obj2);
	$scope.nextStep();

	expect($scope.currentStepIndex).toBe(1);
	expect($scope.steps[0].currentStep).toBe(false);
	expect($scope.steps[1].currentStep).toBe(true);
	expect($scope.$emit).toHaveBeenCalledWith('hhWizardNextStep', 1);
    });

    it('Not nextStep', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);

	var obj = {
	    currentStep: true,
	};
	$scope.steps.push(obj);
	$scope.nextStep();

	expect($scope.currentStepIndex).toBe(0);
	expect($scope.steps[0].currentStep).toBe(true);
	expect($scope.$emit).toHaveBeenCalledWith('hhWizardNextStep', 0);
    });

    it('Successfully previousStep', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);
	
	var obj = {
	    currentStep: false,
	};
	var obj2 = {
	    currentStep: true,
	};
	$scope.steps.push(obj, obj2);
	$scope.currentStepIndex = 1;
	$scope.previousStep();

	expect($scope.currentStepIndex).toBe(0);
	expect($scope.steps[0].currentStep).toBe(true);
	expect($scope.steps[1].currentStep).toBe(false);
    });

    it('Not previousStep', function () {
	expect($scope.steps).toEqual([]);
	expect($scope.currentStepIndex).toBe(0);

	var obj = {
	    currentStep: true,
	};
	$scope.steps.push(obj);
	$scope.previousStep();

	expect($scope.currentStepIndex).toBe(0);
	expect($scope.steps[0].currentStep).toBe(true);
    });

    it('Successfully completewizard', function () {
	$scope.completeWizard();
	expect($scope.$emit).toHaveBeenCalledWith('hhWizardCompleted', 0);
    });

    it('Successfully registerStep', function () {
	var step = 'step01';

	controller.registerStep(step);

	expect($scope.steps).toEqual(['step01']);
    });
});

