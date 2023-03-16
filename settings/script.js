let binds = {
    pause: "p",
    jump: "z",
    crouch: "s"
}

function settingsLoad() {
    let jumpInput = document.querySelector("#jump");
    let crouchInput = document.querySelector("#crouch");

    jumpInput.value = binds.jump;
    crouchInput.value = binds.crouch;

    jumpInput.addEventListener("focus", () => {
        jumpInput.value = "_";
    })
    jumpInput.addEventListener("keydown", (e) => {
        jumpInput.value = e.key;
        binds = {
            jump: jumpInput.value,
            crouch: binds.crouch
        }
        jumpInput.blur();
    })
    crouchInput.addEventListener("focus", () => {
        crouchInput.value = "_";
    })
    crouchInput.addEventListener("keydown", (e) => {
        crouchInput.value = e.key;
        binds = {
            jump: binds.jump,
            crouch: crouchInput.value
        }
        crouchInput.blur();
    })
}