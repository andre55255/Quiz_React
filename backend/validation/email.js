/* Validation basic */

function emailValid(email) {
    user = email.substring(0, email.indexOf("@"));
    domain = email.substring(email.indexOf("@") + 1, email.length);

    if (
        user.length >= 1 &&
        domain.length >= 3 &&
        user.search("@") == -1 &&
        domain.search("@") == -1 &&
        user.search(" ") == -1 &&
        domain.search(" ") == -1 &&
        domain.search(".") != -1 &&
        domain.indexOf(".") >= 1 &&
        domain.lastIndexOf(".") < domain.length - 1
    ) {
        return true;
    } else {
        return false;
    }
}

module.exports = emailValid;