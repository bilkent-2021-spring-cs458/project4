export function validateEmail(email) {
    if (!email || email.length == 0) {
        return "Email is required!";
    }
    if (email.length < 5 || email.length > 50) {
        return "Email should be between 5 and 50 characters";
    }

    const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!pattern.test(email)) {
        return "Please enter a valid email address";
    }

    return true;
}

export function validatePassword(password) {
    if (!password || password.length == 0) {
        return "Password is required!";
    }
    if (password.length < 4 || password.length > 60) {
        return "Password should be between 4 and 60 characters";
    }

    return true;
}
