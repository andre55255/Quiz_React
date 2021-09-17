export const isCorrectAnswer = (c1, c2, c3, c4) => {

    c1 = (c1 === "true") ? true : false;
    c2 = (c2 === "true") ? true : false;
    c3 = (c3 === "true") ? true : false;
    c4 = (c4 === "true") ? true : false;

    if (c1 && !c2 && !c3 && !c4) {
        return true;
    } else if (!c1 && c2 && !c3 && !c4) {
        return true;
    } else if (!c1 && !c2 && c3 && !c4) {
        return true;
    } else if (!c1 && !c2 && !c3 && c4) {
        return true;
    } else {
        return false;
    }
}