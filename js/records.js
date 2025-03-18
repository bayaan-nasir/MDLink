window.onload = (e) => {
	if (!sessionStorage.getItem("currentUser")) {
		window.location.href = "login.html";
	}

	var appointment_list = JSON.parse(
		localStorage.getItem(`${user.username}_appointments`)
	).filter((a) => new Date(a.date).getDate() < new Date().getDate());

	var records = document.getElementById("records");

	if (appointment_list.length) records.innerHTML = "";
	appointment_list.forEach((element) => {
		records.innerHTML += `<tr>
			<td>
				${element?.reason}
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
			<td>
				Success
			</td>
		</tr>`;
	});
};
