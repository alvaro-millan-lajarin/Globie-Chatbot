(function () {
    const fileInput = document.getElementById('post-image-input');
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            document.getElementById('file-name-display').textContent =
                fileInput.files[0] ? fileInput.files[0].name : '';
        });
    }

    const btnImprove    = document.getElementById('btn-ai-improve');
    const textarea      = document.getElementById('post-content');
    const suggestionBox = document.getElementById('ai-suggestion');
    const suggestionTxt = document.getElementById('ai-suggestion-text');
    const btnAccept     = document.getElementById('btn-ai-accept');
    const btnReject     = document.getElementById('btn-ai-reject');

    if (!btnImprove) return;

    const improveUrl    = btnImprove.dataset.improveUrl;
    const improvingText = document.querySelector('meta[name="ai-improving-text"]')?.content ?? 'Improving…';
    const aiBtnText     = document.querySelector('meta[name="ai-btn-text"]')?.content ?? 'Improve with AI';
    let csrfValue       = document.querySelector('meta[name="csrf-token-value"]').content;

    function refreshCsrf() {
        const match = document.cookie.match(/(^|;\s*)csrf_cookie_name=([^;]+)/);
        if (match) csrfValue = decodeURIComponent(match[2]);
    }

    const aiBtnInnerHTML = btnImprove.innerHTML;

    btnImprove.addEventListener('click', async () => {
        const content = textarea.value.trim();
        if (!content) return;

        btnImprove.disabled    = true;
        btnImprove.textContent = improvingText;

        try {
            const res = await fetch(improveUrl, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': csrfValue,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ content }),
            });
            refreshCsrf();
            const data = await res.json();

            if (!res.ok || data.error) {
                alert(data.error || 'AI improvement failed.');
                return;
            }

            suggestionTxt.textContent = data.improved;
            suggestionBox.style.display = 'block';
        } catch (e) {
            alert('Could not reach the AI service.');
        } finally {
            btnImprove.disabled   = false;
            btnImprove.innerHTML  = aiBtnInnerHTML;
        }
    });

    btnAccept.addEventListener('click', () => {
        textarea.value = suggestionTxt.textContent;
        suggestionBox.style.display = 'none';
    });

    btnReject.addEventListener('click', () => {
        suggestionBox.style.display = 'none';
    });
})();
