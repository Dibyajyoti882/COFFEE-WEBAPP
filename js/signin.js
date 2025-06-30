document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing fields!',
                text: 'Please fill out both username and password.'
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
            title: "Signed in successfully!",
            text: "Welcome back to Coffee Shop ☕",
            icon: "success",
            confirmButtonText: "Continue",
            draggable: true
        }).then(() => {
            form.reset();
             window.location.href = "PROJECT.html";
        });
    });

    function validateUsername(username) {
        const regex = /^[a-z0-9._-]+$/;
        return regex.test(username);
    }

    function validatePassword(password) {
        const regex = /^[a-z1-6]{6}$/;
        return regex.test(password);
    }
});
