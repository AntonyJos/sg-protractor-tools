/*jshint multistr:true */
/**
 * @name fisMessager
 * @description Directive that displays specified messages in protractor tests.
 */
angular.module('exampleApp').directive('fisMessager', function () {
    'use strict';

    return {
		restrict: 'E',
		replace: true,
		template :  '<div class="{{ messageClasses }}">' +
						'<input id="fisMessagerMessageInput" type="text" ng-model="currentMessageKey" class="fis-messager-input" style="margin-top:10px;">' +
						'<input id="fisMessagerErrorMessageInput" type="text" ng-model="errorMessage" class="fis-messager-input" style="margin-top:12px;">' +
						'<input id="fisMessagerPosition" type="text" ng-model="messagerPosition" class="fis-messager-input" style="margin-top:14px;">' +
						'<input type="button" value="-" ng-click="toggleMessageArea()" class="fis-messager-area-icons">' +
						'{{ currentMessage }}<br>' +
					'</div>',
        link: function (scope) {
            scope.showMessages = false;
			scope.styleState = '';
			scope.reducedState = '';
			scope.positionState = 'top-right';
			scope.messagerPosition = 'top-right'; // bottom-right, bottom-left, top-left
			scope.messageClasses = '';
			scope.currentMessageKey = '';
			scope.$watch('currentMessageKey',function(newValue){
				if (newValue !== undefined && newValue !== '') {
					scope.showMessages = true;
					scope.currentMessage = scope.currentMessageKey;
				}
			});
			scope.errorMessage = '';
			scope.$watch('errorMessage',function(newValue){
				if (newValue !== undefined && newValue !== '') {
					scope.showMessages = true;
					// maybe do some formatting here
					scope.styleState = 'error';
					scope.currentMessage = 'EXCEPTION THROWN:<br>' + newValue;
				} else {
					scope.styleState = '';
				}
				scope.updateMessageClasses();
			});
			scope.$watch('showMessages',function(newValue){
				if (newValue !== undefined && newValue === true) {
					// maybe do some formatting here
					scope.reducedState = '';
				} else {
					scope.reducedState = 'reduced';
				}
				scope.updateMessageClasses();
			});
			scope.toggleMessageArea = function() {
				if (scope.showMessages === false) {
					scope.showMessages = true;
				} else {
					scope.showMessages = false;
				}
			};
			scope.$watch('messagerPosition',function(newValue){
				if (newValue !== undefined && (newValue === 'top-left' || newValue === 'top-right' || newValue === 'bottom-left' || newValue === 'bottom-right')) {
					// maybe do some formatting here
					scope.positionState = newValue;
					scope.updateMessageClasses();
				}
			});
			scope.updateMessageClasses = function() {
				scope.messageClasses = 'fis-messager-explanation-message '+scope.positionState+' '+scope.styleState+' '+scope.reducedState;
			};
        }
    };

});
