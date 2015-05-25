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

