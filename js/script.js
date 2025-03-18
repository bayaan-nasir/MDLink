function signUp(e) {
	e.preventDefault();

	const username = e.target[0].value;
	const email = e.target[1].value;
	const password = e.target[2].value;

	if (localStorage.getItem(email) !== null) {
		alert("User Already Exists");
	}

	const data = {
		username,
		password,
	};

	localStorage.setItem(email, JSON.stringify(data));
	sessionStorage.setItem("currentUser", JSON.stringify({ ...data, email }));
	window.location.href = "dashboard.html";
}

function login(e) {
	e.preventDefault();

	const email = e.target[0].value;
	const password = e.target[1].value;

	if (localStorage.getItem(email) === null) {
		alert("User Does Not Exist");
	} else {
		const user = JSON.parse(localStorage.getItem(email));
		if (password === user?.password) {
			sessionStorage.setItem(
				"currentUser",
				JSON.stringify({ ...user, email })
			);
			window.location.href = "dashboard.html";
		} else {
			alert("Incorrect Password");
		}
	}
}

function logout() {
	sessionStorage.removeItem("currentUser")
	location.reload()
}

user = JSON.parse(sessionStorage.getItem("currentUser"));
var username = document.getElementsByClassName("username");

let i;
for (i = 0; i < username.length; i++) {
	username[i].innerHTML = user.username;
}

var modal = document.getElementsByClassName("modal")[0];
function openModal() {
	modal.style.display = "flex";
}

function closeModal() {
	modal.style.display = "none";
	location.reload()
}

const doctors = [
	{
		img: "https://framerusercontent.com/images/Qq6nbULj570qVA6gI1htnXSgV6k.png?scale-down-to=512",
		name: "Dr. John Smith",
		phone: "+1-555-123-4567",
	},
	{
		img: "https://www.viceversaglobal.com/wp-content/uploads/2024/03/7270ccdb-ec9a-4484-9909-5cefaf6413c1-758x1024.jpg",
		name: "Dr. Emily Johnson",
		phone: "+1-555-987-6543",
	},
	{
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh8-NM4p3ps7-Qu02CP823a4uYFxqVFKIWAg&s",
		name: "Dr. Michael Brown",
		phone: "+1-555-567-8901",
	},
	{
		img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Dn0oLz6MDWnNS6Tkf6AT-zQNdMQ9YF-Iqw&s",
		name: "Dr. Sarah Davis",
		phone: "+1-555-234-5678",
	},
];

const drug_list = [
	{
		img: "https://image.cnbcfm.com/api/v1/image/101763285-94819136.jpg?v=1693051202",
		name: "Adderall",
		price: "60"
	},
	{
		img: "https://static.xfarma.it/media/catalog/product/cache/369016c29a18e368918e7a3015d9d84f/0/3/034741037-ambroxolo-eg-fl-200ml-15mg-5ml.jpg",
		name: "Ambroxol",
		price: "100"
	},
	{
		img: "https://www.crescentpharma.com/wp-content/uploads/2016/01/Amoxicillin_250mg5ml-Oral-Suspension_100ml_FF2-1.png",
		name: "Amoxicillin",
		price: "70"
	},
	{
		img: "https://5.imimg.com/data5/SELLER/Default/2021/6/HU/PB/RH/3911030/griseofulvin-500-mg-tablets.jpeg",
		name: "Griseufulvin",
		price: "120"
	},
	{
		img: "https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/2/shutterstock_1082421920.jpg",
		name: "Penicillin",
		price: "80"
	},
	{
		img: "https://cdn.commercev3.net/cdn.bernell.com/images/uploads/7260_13763_popup.jpg",
		name: "Phenylephrine HCl Solution",
		price: "150"
	},
	{
		img: "https://www.biobrickpharma.com/wp-content/uploads/2023/06/MEDGIK-10.jpg",
		name: "Medroxyprogesterone",
		price: "200"
	},
]
