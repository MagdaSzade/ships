function information(txtInfo) {
    const informationField = document.getElementById("info");
    informationField.innerHTML = `<h2>${txtInfo}</h2>`;
}

module.exports = information;