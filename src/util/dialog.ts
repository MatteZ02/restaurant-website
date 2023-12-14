import trapFocus from "./trapFocus";

const openDialog = (dialog: HTMLDialogElement) => {
    dialog.showModal();
    dialog.addEventListener("keydown", e => trapFocus(e, dialog));
};

const closeDialog = (dialog: HTMLDialogElement) => {
    dialog.close();
    dialog.removeEventListener("keydown", e => trapFocus(e, dialog));
};

export { openDialog, closeDialog };
