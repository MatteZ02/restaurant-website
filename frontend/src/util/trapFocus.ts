const trapFocus = (e: KeyboardEvent, dialog: HTMLDialogElement) => {
    const elements = dialog.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    const firstElement = elements[0];
    const lastElement = elements[elements.length - 1];
    if (e.key === "Tab") {
        const tabForwards = !e.shiftKey && document.activeElement === lastElement;
        const tabBackwards = e.shiftKey && document.activeElement === firstElement;
        if (tabForwards) {
            e.preventDefault();
            firstElement.focus();
        } else if (tabBackwards) {
            e.preventDefault();
            lastElement.focus();
        }
    }
};

export default trapFocus;
