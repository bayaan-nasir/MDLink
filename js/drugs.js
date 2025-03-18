window.onload = (e) => {
	if (!sessionStorage.getItem("currentUser")) {
		window.location.href = "login.html";
	}

	var drugs = document.getElementById("drugs");

	drug_list.forEach((drug) => {
		drugs.innerHTML += `
		<div class="drug-card">
			<img src="${drug?.img}" alt="${drug.name}">
			<div>
				<h2>${drug?.name}</h2>
				<span>GH&cent; ${drug?.price}</span>
			</div>
			<button class="btn btn-primary" onclick="alert('Your order is being processed')">Order Now</button>
		</div>
	`;
	});

	var announcement_list = JSON.parse(
		localStorage.getItem(`${user.username}_announcements`)
	).reverse();
	var announcements = document.getElementById("dash__announcements");

	if (announcement_list.length) announcements.innerHTML = "";
	announcement_list.forEach((element) => {
		announcements.innerHTML += `<li>
			<img src="${element?.assigner?.img}" alt="Assigner" />
			<p>${element?.announcement}</p>
		</li>`;
	});
};
