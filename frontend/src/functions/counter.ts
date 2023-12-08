const increase = (element: HTMLInputElement) => {
    element.value = (parseInt(element.value) + 1).toString();
};
const decrease = (element: HTMLInputElement) => {
    element.value = (parseInt(element.value) - 1).toString();
};

export { increase, decrease };
