window.onload = (e) => {
	if (!sessionStorage.getItem("currentUser")) {
		window.location.href = "login.html";
	}

	user = JSON.parse(sessionStorage.getItem("currentUser"));
	var username = document.getElementsByClassName("username");

	const form = document.getElementById("appointment-form");
	form.addEventListener("submit", bookAppointment);

	let i;
	for (i = 0; i < username.length; i++) {
		username[i].innerHTML = user.username;
	}

	var doctors_choice = document.getElementById("doctor");

	doctors.forEach((doc) => {
		doctors_choice.innerHTML += `<option value='${JSON.stringify(doc)}'>
			${doc.name}
		</option>`;
	});

	var appointment_list = JSON.parse(
		localStorage.getItem(`${user.username}_appointments`)
	)
		.filter((a) => new Date(a.date).getDate() >= new Date().getDate())
		.sort((a, b) => new Date(b.date) - new Date(a.date));

	var appointments = document.getElementById("appointments");

	if (appointment_list?.length) appointments.innerHTML = "";
	appointment_list.forEach((element) => {
		appointments.innerHTML += `<tr>
			<td>
				<img src="${element?.doctor?.img}" alt="${element?.doctor?.name}"/>
			</td>
			<td>
				${element?.doctor?.name}
			</td>
			<td>
				${element?.reason}
			</td>
			<td>
				${element?.date}
			</td>
			<td>
				${element?.time}
			</td>
			<td style="display: flex; align-items; center; gap: 5px">
				<button onclick="reschedule('${encodeURI(
					JSON.stringify(element)
				)}')" class="btn btn-primary">Reschedule Appointment</button>
				<button onclick="cancelAppointment('${element?.doctor?.name}', '${
			element?.date
		}', '${
			element?.time
		}')" class="btn btn-danger">Cancel Appointment</button>
			</td>
		</tr>`;
	});
};

function reschedule(appointment) {
	openModal();
	appointment = JSON.parse(decodeURI(appointment));
	const doctor = document.getElementById("doctor");

	const reason = document.getElementById("reason");
	const date = document.getElementById("date");
	const time = document.getElementById("time");
	const submit = document.querySelector(
		"#appointment-form > .uneven-row > input[type=submit]"
	);
	submit.disabled = true;

	doctor.selectedIndex = doctors.find(
		(doc) => JSON.stringify(doc) === appointment.doctor
	);
	doctor.disabled = true;
	reason.value = appointment.reason;
	reason.disabled = true;
	date.value = appointment.date;
	time.value = appointment.time;

	time.addEventListener("change", () => (submit.disabled = false));
	date.addEventListener("change", () => (submit.disabled = false));

	const form = document.getElementById("appointment-form");
	form.removeEventListener("submit", bookAppointment, false);
	form.addEventListener("submit", (e) => changeAppointment(e, appointment));
}

function changeAppointment(e, appointment) {
	e.preventDefault();

	const doctor = JSON.parse(e.target[0].value);
	const reason = e.target[1].value;
	const date = e.target[2].value;
	const time = e.target[3].value;

	var appointment_list = JSON.parse(
		localStorage.getItem(`${user.username}_appointments`)
	);

	var announcement_list = JSON.parse(
		localStorage.getItem(`${user.username}_announcements`)
	);

	if (announcement_list) {
		announcement_list.push({
			assigner: doctor,
			announcement: `Appointment with ${doctor.name} for ${reason} has been rescheduled to ${date}.`,
		});
	} else {
		announcement_list = [
			{
				assigner: doctor,
				announcement: `Appointment with ${doctor.name} for ${reason} has been rescheduled to ${date}.`,
			},
		];
	}

	appointment_list = appointment_list.filter(
		(a) => a.date !== appointment.date && a.time !== appointment.time
	);
	appointment_list.push({
		doctor,
		reason,
		date,
		time,
	});
	localStorage.setItem(
		`${user.username}_announcements`,
		JSON.stringify(announcement_list)
	);
	localStorage.setItem(
		`${user.username}_appointments`,
		JSON.stringify(appointment_list)
	);
	location.reload()
}

function cancelAppointment(doctor, date, time) {
	var appointment_list = JSON.parse(
		localStorage.getItem(`${user.username}_appointments`)
	);

	var announcement_list = JSON.parse(
		localStorage.getItem(`${user.username}_announcements`)
	);

	if (announcement_list) {
		announcement_list.push({
			assigner: doctor,
			announcement: `Appointment with ${doctor} on ${date} has been cancelled.`,
		});
	} else {
		announcement_list = [
			{
				assigner: doctor,
				announcement: `Appointment with ${doctor} on ${date} has been cancelled.`,
			},
		];
	}

	localStorage.setItem(
		`${user.username}_announcements`,
		JSON.stringify(announcement_list)
	);
	localStorage.setItem(
		`${user.username}_appointments`,
		JSON.stringify(
			appointment_list.filter(
				(appointment) =>
					appointment.date !== date && appointment.time !== time
			)
		)
	);
	location.reload();
}

function bookAppointment(e) {
	e.preventDefault();

	const doctor = JSON.parse(e.target[0].value);
	const reason = e.target[1].value;
	const date = e.target[2].value;
	const time = e.target[3].value;

	var appointment_list = JSON.parse(
		localStorage.getItem(`${user.username}_appointments`)
	);

	var announcement_list = JSON.parse(
		localStorage.getItem(`${user.username}_announcements`)
	);

	if (appointment_list) {
		appointment_list.push({
			doctor,
			reason,
			date,
			time,
		});
	} else {
		appointment_list = [
			{
				doctor,
				reason,
				date,
				time,
			},
		];
	}
	if (new Date(appointment_list.date) >= new Date()) {
		if (announcement_list) {
			announcement_list.push({
				assigner: doctor,
				announcement: `New Appointment with ${doctor.name} on ${date}`,
			});
		} else {
			announcement_list = [
				{
					assigner: doctor,
					announcement: `New Appointment with ${doctor.name} on ${date}`,
				},
			];
		}
		localStorage.setItem(
			`${user.username}_announcements`,
			JSON.stringify(announcement_list)
		);
	}
	localStorage.setItem(
		`${user.username}_appointments`,
		JSON.stringify(appointment_list)
	);
	location.reload();
}
