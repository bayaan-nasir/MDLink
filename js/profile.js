window.onload = (e) => {
	if (!sessionStorage.getItem('currentUser')) {
		window.location.href = 'login.html'
	}

	var person = document.getElementById("person");

	const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

	const user = JSON.parse(localStorage.getItem(currentUser.email));

	person.innerHTML = `
		<img src="../media/profile.jpeg" alt="Profile Picture" />
		<h2>${user.username}</h2>
	`;

	if (!user.profile) {
		openModal();
	}

	var data = document.getElementById("data");
	data.innerHTML = `
		<div class="row">
			<div class="form-input">
				<h4>Gender</h4>
				<p>${user?.profile?.gender}</p>
			</div>
			<div class="form-input">
				<h4>Date of Birth</h4>
				<p>${user?.profile?.dob}</p>
			</div>
		</div>
		<div class="row">
			<div class="form-input">
				<h4>Blood Group</h4>
				<p>${user?.profile?.blood_group}</p>
			</div>
			<div class="form-input">
				<h4>Status</h4>
				<p>${user?.profile?.status}</p>
			</div>
		</div>
	`;
};

function setProfile(e) {
	e.preventDefault();

	const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
	const user = JSON.parse(localStorage.getItem(currentUser.email));

	const gender = e.target[0].value;
	const dob = e.target[1].value;
	const blood_group = e.target[2].value;

	user.profile = {
		gender,
		dob,
		blood_group,
		status: "Healthy",
	};

	localStorage.setItem(currentUser.email, JSON.stringify(user));
	location.reload();
}
