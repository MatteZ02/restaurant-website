import { openDialog } from "../util/dialog";

const displayErrorModal = (error: string) => {
    const modal = document.getElementsByClassName("errorDialog")[0] as HTMLDialogElement;
    if (!modal) return;
    const errorText = modal.getElementsByTagName("p")[0];
    if (!errorText) return;
    errorText.innerText = error;
    openDialog(modal);
};

export default displayErrorModal;
