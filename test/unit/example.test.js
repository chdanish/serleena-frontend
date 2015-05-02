describe("An example test", function() {
  it("may pass.", function() {
    expect(true).toBe(true);
  });
});

describe('TestController', function() {
  beforeEach(module('testAngular'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.name', function() {
    it('should be AngularJS', function() {
      var $scope = {};
      var controller = $controller('TestController', { $scope: $scope });
      expect($scope.name).toEqual('AngularJS');
    });
  });
});