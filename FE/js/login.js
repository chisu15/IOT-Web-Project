document
	.getElementById("loginForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;

		if (username === "admin" && password === "123456") {
			alert("Đăng nhập thành công!");
			window.location.href = "index.html";
		} else {
			alert("Sai tên đăng nhập hoặc mật khẩu!");
		}
	});
