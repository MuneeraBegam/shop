var myapp = angular.module("myapp", []);
myapp.controller("myController",function($scope, $http) {
			//var BASE_PATH = "http://localhost:8080";


	var pathArray = window.location.pathname.split('/');
	var contextRoot = pathArray[1];
	//alert( pathArray+"=="+ contextRoot);
	var BASE_PATH = window.location.protocol + "//" + window.location.host + "/" + contextRoot;
	//alert(BASE_PATH);
			$scope.getProductList = function() {
				$http.get(BASE_PATH + "/getProductsList")
						.success(function(data) {
							$scope.products = data;
						});
			}

			$scope.addToCart = function(productId) {
				$http.put(BASE_PATH + "/cart/add/" + productId)
						.success(function() {
							alert("Added Successfully");
						})
			}

			$scope.refreshCart = function() {
				$http.get(BASE_PATH + "/cart/getCart/"
								+ $scope.cartId).success(function(data) {

					$scope.carts = data;
				})
			}

			$scope.getCart = function(cartId) {
				$scope.cartId = cartId;
				$scope.refreshCart(cartId);
			}
			$scope.removeFromCart = function(cartItemId) {
				$http.put(BASE_PATH +"/cart/removeCartItem/"
								+ cartItemId).success(function() {
					$scope.refreshCart();
				});
			}

			$scope.clearCart = function() {
				$http.put(BASE_PATH + "/cart/removeAllItems/"
								+ $scope.cartId).success(function() {
					$scope.refreshCart();
				});
			}

			$scope.calculateGrandTotal = function() {
				var grandTotal = 0.0;
				for (var i = 0; i < $scope.carts.cartItem.length; i++)
					grandTotal = grandTotal + $scope.carts.cartItem[i].price;
				return grandTotal;

			}
		});
