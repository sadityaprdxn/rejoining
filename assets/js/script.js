/* Author: 

*/

window.onload = function () {
	var page = this.document.querySelector(".container");

	if (page.classList.contains("home-page")) {
		this.console.log("hi");

		var hamburger = this.document.querySelector(".hamburger");
		var bannerSlider = document.querySelector(".slider");

		hamburger.addEventListener("click", function () {
			hamburger.classList.toggle("active-hamburger");
			document.querySelector("nav").classList.toggle("active");
		});

		// slick slider for carousel effect

		$(document).ready(function () {
			$(bannerSlider).slick({
				dots: false,
				//   autoplay: true,
				// //   autoplayspeed: 8000
			});
		});

		var servicesArray = this.Array.from(this.document.querySelectorAll(".services ul li"));
		var closeModal = this.document.querySelector(".close");
		var modal = document.querySelector(".modal");

		servicesArray.forEach(function (element) {
			element.addEventListener("click", function () {
				var imageSource = this.querySelector("figure img").getAttribute("src");
				modal.querySelector("img").setAttribute("src", imageSource);
				modal.classList.add("active-modal");
			})
		});

		closeModal.addEventListener("click", function () {
			modal.classList.remove("active-modal");
		});

		var inputArray = this.Array.from(this.document.querySelectorAll(".form-group input"));
		inputArray.push(this.document.querySelector("#client-message"));
		var termsAndConditions = this.document.querySelector("#TermsandCondition");
		var submitForm = this.document.querySelector(".get-in-touch button");
		submitForm.disabled = true;

		console.log(inputArray);

		// Regex for every input fields
		var Regex = {
			enquiry_regex: /^([a-zA-Z," "]){0,20}$/,
			name_regex: /^([a-zA-Z]){0,20}$/,
			mail_regex: /^([0-9a-zA-Z\_\.\-]+)@([0-9a-zA-Z\_\.\-]+)\.([a-zA-Z]+)$/,
			companyname_regex: /([0-9a-zA-Z]){0,50}$/,
			message_regex: /([0-9a-zA-Z]){10,50}$/
		};

		inputArray.forEach(function (element) {
			var inputRegex = element.getAttribute("data-regex");
			console.log(Regex[inputRegex]);
			if (Regex[inputRegex]) {
				element.addEventListener("keyup", function () {
					validate(element, Regex[inputRegex]);
					disableForm();
				});
			}
		});

		function disableForm() {
			termsAndConditions.checked = false;
			termsAndConditions.parentElement.classList.remove("success");
			submitForm.disabled = true;
			submitForm.classList.remove("active-button");
		}

		// function for form validate the regex
		function validate(input, RegularExpression) {
			var parent = input.parentNode;
			if (input.value == "") {
				parent.classList = "form-group";
			}
			else if (RegularExpression.test(input.value)) {
				parent.classList = "form-group success";
			} else {
				parent.classList = "form-group error";
			}
		}

		termsAndConditions.addEventListener("click", function () {
			if (termsAndConditions.checked === true) {
				termsAndConditions.parentElement.classList.add("success");
				var allFieldsCorrect = null;
				for (var i = 0; i < inputArray.length; i++) {
					var input = inputArray[i];
					if (input.parentElement.classList == "form-group" || input.parentElement.classList.contains("error")) {
						allFieldsCorrect = false;
						break;
					} else {
						allFieldsCorrect = true;
					}
				}

				if (allFieldsCorrect) {
					submitForm.disabled = false;
					submitForm.classList.add("active-button");
				}
			} else {
				disableForm();
			}
		});

		submitForm.addEventListener("click", function (e) {
			e.preventDefault();
			var data = {};
			inputArray.forEach(function (element) {
				if (element.getAttribute("data-regex")) {

					var propertyName = element.getAttribute("data-regex").split("_")[0];
					data[propertyName] = element.value;
				}
			});
			
			var unicode = "harvestClient" + window.localStorage.length;
			var data_serialized = JSON.stringify(data);
			window.localStorage.setItem(unicode, data_serialized);
		});

	}
}























