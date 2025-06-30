document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        let username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!fullname || !email || !username || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing fields!',
                text: 'Please fill out all fields.'
            });
            return;
        }

        if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid email!',
                text: 'Please enter a valid email address.'
            });
            return;
        }

        username = username.toLowerCase();
        document.getElementById("username").value = username;

        if (!validateUsername(username)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid username!',
                text: 'Username can only contain lowercase letters, numbers, and allowed special characters (.-_).'
            });
            return;
        }

        if (!validatePassword(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid password!',
                text: 'Password must be exactly 6 characters (lowercase a-z and numbers 1-6).'
            });
            return;
        }

        Swal.fire({
            title: "Account created successfully!",
            text: "You can now log in.",
            icon: "success",
            confirmButtonText: "OK",
            draggable: true
        }).then(() => {
            form.reset();
        });
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validateUsername(username) {
        const regex = /^[a-z0-9._-]+$/;
        return regex.test(username);
    }

    function validatePassword(password) {
        const regex = /^[a-z1-6]{6}$/;
        return regex.test(password);
    }
});
