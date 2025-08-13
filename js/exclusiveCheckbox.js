// Checkbox mutuamente esclusivi (gruppi Sì/No e simili)
document.querySelectorAll('.exclusive-group').forEach(group => {
    const checkboxes = group.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkboxes.forEach(other => {
                    if (other !== checkbox) other.checked = false;
                });
            }
        });
    });
});