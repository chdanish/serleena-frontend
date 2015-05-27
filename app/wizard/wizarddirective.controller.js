/**
   * Name: WizardDirectiveController
   * Package: Wizard
   * Author: Antonio Cavestro
   *
   * History:
   * Version      Programmer          Changes
   * 1.0.0        Matteo Lisotto      Create file
   *
   */

angular.module('wizard').controller('WizardDirectiveController',
  WizardDirectiveController);

/**
  * Classe che gestisce una generica procedura guidata.
  *
  * @author Antonio Cavestro
  * @version 1.0
  * @example Mantiene un elenco di WizardStepDirective e gestisce il passaggio
  * tra essi in base alle interazioni dell’utente, che notifica a
  * Experience.ExperienceWizardController tramite il gestore degli eventi
  * implementato in AngularJS.
  * @constructor
  * @memberOf Wizard
  * @param {Scope} $scope - Contesto in cui vengono salvati i dati del
  * controller (il model) ed in cui vengono valutate le espressioni utilizzate
  * nella view.
  */

function WizardDirectiveController($scope) {
  /**
   * Array di oggetti $scope dei vari step.
   *
   * @name steps
   * @type Array
   * @memberOf Wizard.WizardDirectiveController
   * @instance
   */
  $scope.steps = [];
  /**
   * Indice dello step corrente.
   *
   * @name currentStepIndex
   * @type Number
   * @memberOf Wizard.WizardDirectiveController
   * @instance
   */
  $scope.currentStepIndex = 0;
  /**
   * Passa ad un altro step.
   *
   * @function toggleStep
   * @memberOf Wizard.WizardDirectiveController
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
   * @memberOf Wizard.WizardDirectiveController
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
   * @memberOf Wizard.WizardDirectiveController
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
   * @memberOf Wizard.WizardDirectiveController
   * @instance
   * @returns Boolean
   */
  $scope.hasPrevious = function() {
    return $scope.currentStepIndex > 0;
  };
  /**
   * Verifica che lo step corrente sia l'ultimo del wizard.
   *
   * @function isFinal
   * @memberOf Wizard.WizardDirectiveController
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
   * @memberOf Wizard.WizardDirectiveController
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
   * @memberOf Wizard.WizardDirectiveController
   * @instance
   */
  $scope.previousStep = function(){
    if ($scope.hasPrevious()){
      toggleStep($scope.currentStepIndex - 1);
    }
  };
  /**
   * Funzione invocata dalla vista quando il pulsante di completamento del
   * wizard è stato premuto. Invia un segnale di completamento al controller
   * superiore nella gerarchia.
   *
   * @function completeWizard
   * @memberOf Wizard.WizardDirectiveController
   * @instance
   */
  $scope.completeWizard = function(){
    //emit
    $scope.$emit('hhWizardCompleted', $scope.currentStepIndex);
  };
}
