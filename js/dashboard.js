window.onload = (e) => {
	if (!sessionStorage.getItem("currentUser")) {
		window.location.href = "login.html";
	}

	var appointment_list = JSON.parse(
		localStorage.getItem(`${user.username}_appointments`)
	)
		.filter((a) => new Date(a.date).getDate() >= new Date().getDate())
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	var appointments = document.getElementById("dash__appointments");

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


