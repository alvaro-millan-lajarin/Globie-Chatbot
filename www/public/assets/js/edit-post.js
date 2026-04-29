(function () {
    const form = document.getElementById('edit-post-form');
    if (!form) return;

    const errorBox = document.getElementById('edit-error-box');
    const fileInput = document.getElementById('edit-post-image-input');
    const fileLabel = document.getElementById('edit-file-name-display');

    const csrfName = document.querySelector('meta[name="csrf-token-name"]').content;
    const csrfValue = document.querySelector('meta[name="csrf-token-value"]').content;

    const updateUrl = form.dataset.updateUrl;
    const homeUrl   = form.dataset.homeUrl;

    if (fileInput) {
        fileInput.addEventListener('change', () => {
            fileLabel.textContent = fileInput.files[0] ? fileInput.files[0].name : '';
        });
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        errorBox.style.display = 'none';
        errorBox.textContent = '';

        const formData = new FormData(form);
        formData.append(csrfName, csrfValue);

        try {
            const res = await fetch(updateUrl, {
                method: 'POST',
                headers: {
                    'X-HTTP-Method-Override': 'PUT',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: formData
            });

            const data = await res.json();

            if (!res.ok) {
                errorBox.textContent = data.message || 'Error updating post';
                errorBox.style.display = 'block';
                return;
            }

            window.location.href = homeUrl;
        } catch (e) {
            errorBox.textContent = 'Error updating post';
            errorBox.style.display = 'block';
        }
    });
})();