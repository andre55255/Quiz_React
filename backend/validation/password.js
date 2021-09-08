/* Validation basic */
/* Length: equal to 6 */

function passwordValid(password) {
    if (password.length != 6) {
        return false;
    }
    return true;
}

module.exports = passwordValid;