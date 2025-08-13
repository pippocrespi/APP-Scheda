window.addEventListener('DOMContentLoaded', () => {
    // Data odierna in formato YYYY-MM-DD
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // mesi da 0 a 11
    const dd = String(today.getDate()).padStart(2, '0');
    const currentDate = `${yyyy}-${mm}-${dd}`;

    const dataInput = document.querySelector('input[name="data"]');
    if (dataInput) dataInput.value = currentDate;

    // Ora corrente in formato HH:MM
    const hh = String(today.getHours()).padStart(2, '0');
    const min = String(today.getMinutes()).padStart(2, '0');
    const currentTime = `${hh}:${min}`;

    const orarioInput = document.querySelector('input[name="orario"]');
    if (orarioInput) orarioInput.value = currentTime;
});