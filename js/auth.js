window.onload = (e) => {
	if (!sessionStorage.getItem('currentUser')) {
		window.location.href = 'login.html'
	}
}