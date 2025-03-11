window.onload = (e) => {
	user = JSON.parse(sessionStorage.getItem("currentUser"));
	var username = document.getElementsByClassName("username");

	let i;
	for (i = 0; i < username.length; i++) {
		username[i].innerHTML = user.username;
	}

	var appointment_list = JSON.parse(
		localStorage.getItem(`${user.username}_appointments`)
	).sort((a, b) => new Date(b.date) - new Date(a.date))
	console.log(appointment_list);
	
	var appointments = document.getElementById("dash__appointments");

	if (appointment_list.length) appointments.innerHTML = "";
	appointment_list.forEach((element) => {
		appointments.innerHTML += `<tr>
			<td>
				<img src="${element?.doctor?.img}" alt="${element?.doctor?.name}"/>
			</td>
			<td>
				${element?.doctor?.name}
			</td>
			<td>
				${element?.date}
			</td>
			<td>
				${element?.time}
			</td>
		</tr>`;
	});

	var announcement_list = JSON.parse(
		localStorage.getItem(`${user.username}_announcements`)
	);
	var announcements = document.getElementById("dash__announcements");

	if (announcement_list.length) announcements.innerHTML = "";
	announcement_list.forEach((element) => {
		announcements.innerHTML += `<li>
			<img src="${element?.assigner?.img}" alt="Assigner" />
			<p>${element?.announcement}</p>
		</li>`;
	});
};
