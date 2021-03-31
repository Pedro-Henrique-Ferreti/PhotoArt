export function setButtonLoader(button, innerText = null) {
    if (!innerText) {
        button.disabled = true;
        button.innerHTML = `
            <div class="app-loader">
                <div class="loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        `;
    } else {
        button.disabled = false;
        button.innerHTML = innerText;
    }
}