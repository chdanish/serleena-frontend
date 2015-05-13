/**
   * Name: WizardDirectiveController
   * Package: Wizard
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 0.0.1        Matteo Lisotto      Create file
   *
   */

angular.module('wizard').controller('WizardDirectiveController', WizardDirectiveController);

/**
  * Classe che gestisce una generica procedura guidata.
  *
  * @author Antonio Cavestro
  * @version 0.1
  * @constructor
  * @param {Scope} $scope - L'oggetto ViewModel del controller.
  */

function WizardDirectiveController($scope) {
  /**
   * Array di oggetti $scope dei vari step.
   *
   * @name steps
   * @type Array
   * @memberOf WizardDirectiveController
   * @instance
   */
  $scope.steps = [];
  /**
   * Indice dello step corrente.
   *
   * @name currentStepIndex
   * @type Number
   * @memberOf WizardDirectiveController
   * @instance
   */
  $scope.currentStepIndex = 0;
  /**
   * Passa ad un altro step.
   *
   * @function toggleStep
   * @memberOf WizardDirectiveController
   * @instance
   * @private
   * @param {Number} index - Indice dello step a cui deve passare.
   */
  var toggleStep = function(index){
    $scope.steps[$scope.currentStepIndex].currentStep = false;
    $scope.currentStepIndex = index;
    $scope.steps[$scope.currentStepIndex].currentStep = true;
  };
  /**
   * Inserisce uno step nell'array di step.
   *
   * @function registerStep
   * @memberOf WizardDirectiveController
   * @instance
   * @param {Scope} step - Step da aggiungere.
   */
  this.registerStep = function(step){
    $scope.steps.push(step);
  };
  /**
   * Verifica che esista uno step successivo a quello corrente.
   *
   * @function hasNext
   * @memberOf WizardDirectiveController
   * @instance
   * @returns Boolean
   */
  $scope.hasNext = function(){
    return $scope.currentStepIndex < ($scope.steps.length - 1);
  };
  /**
   * Verifica che esista uno step precedente a quello corrente.
   *
   * @function hasPrevious
   * @memberOf WizardDirectiveController
   * @instance
   * @returns Boolean
   */
  $scope.hasPrevious = function() {
    return $scope.currentStepIndex > 0;
  };
  /**
   * Verifica che lo step corrente sia l'ultimo del wizard.
   *
   * @function hasNext
   * @memberOf WizardDirectiveController
   * @instance
   * @returns Boolean
   */
  $scope.isFinal = function() {
    return $scope.currentStepIndex == ($scope.steps.length - 1);
  };
  /**
   * Passa allo step successivo e invia un segnale al controller superiore nella
   * gerarchia.
   *
   * @function nextStep
   * @memberOf WizardDirectiveController
   * @instance
   */
  $scope.nextStep = function(){
    if ($scope.hasNext()){
      toggleStep($scope.currentStepIndex + 1);
    }
    //emit
    $scope.$emit('hhWizardNextStep', $scope.currentStepIndex);
  };
  /**
   * Passa allo step precedente e invia un segnale al controller superiore nella
   * gerarchia.
   *
   * @function previousStep
   * @memberOf WizardDirectiveController
   * @instance
   */
  $scope.previousStep = function(){
    if ($scope.hasPrevious()){
      toggleStep($scope.currentStepIndex - 1);
    }
  };
}
