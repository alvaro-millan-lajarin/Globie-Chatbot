(function () {
    const baseUrl       = document.querySelector('meta[name="base-url"]').content.replace(/\/$/, '');
    const currentUserId = Number(document.querySelector('meta[name="current-user-id"]').content);
    let   csrfValue     = document.querySelector('meta[name="csrf-token-value"]').content;


    function refreshCsrf() {
        const match = document.cookie.match(/(^|;\s*)csrf_cookie_name=([^;]+)/);
        if (match) csrfValue = decodeURIComponent(match[2]);
    }

    function csrfHeaders() {
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrfValue,
        };
    }

    // Likes

    document.querySelectorAll('.btn-like').forEach(btn => {
        btn.addEventListener('click', async () => {
            const postId = btn.dataset.postId;
            const liked  = btn.classList.contains('liked');
            try {
                const res  = await fetch(`/posts/${postId}/like`, {
                    method: liked ? 'DELETE' : 'POST',
                    headers: csrfHeaders(),
                });
                refreshCsrf();
                const data = await res.json();
                btn.classList.toggle('liked', data.liked);
                btn.querySelector('.like-count').textContent = data.count;
                btn.querySelector('.like-heart').setAttribute('fill', data.liked ? 'currentColor' : 'none');
            } catch (e) {
                console.error('Like failed', e);
            }
        });
    });

    // Comments toggle

    document.querySelectorAll('.btn-comment-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = document.getElementById(`comments-${btn.dataset.postId}`);
            const isHidden = section.style.display === 'none' || section.style.display === '';
            section.style.display = isHidden ? 'flex' : 'none';
        });
    });

    //Comment form submit

    document.querySelectorAll('.comment-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const postId  = form.dataset.postId;
            const input   = form.querySelector('.comment-input');
            const content = input.value.trim();
            if (!content) return;

            try {
                const res = await fetch(`/posts/${postId}/comments`, {
                    method: 'POST',
                    headers: { ...csrfHeaders(), 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ content }),
                });
                refreshCsrf();
                if (!res.ok) return;

                const comment   = await res.json();
                const section   = document.getElementById(`comments-${postId}`);
                const commentEl = buildCommentEl(comment);
                section.insertBefore(commentEl, form);
                input.value = '';
                updateCommentCount(postId, section);
            } catch (e) {
                console.error('Comment failed', e);
            }
        });
    });

    //Delete post & comment (event delegation)

    document.querySelector('.feed-wrap').addEventListener('click', async (e) => {
        if (e.target.closest('.btn-delete-post')) {
            const btn    = e.target.closest('.btn-delete-post');
            const postId = btn.dataset.postId;
            try {
                const res = await fetch(`/posts/${postId}`, {
                    method: 'DELETE',
                    headers: csrfHeaders(),
                });
                refreshCsrf();
                if (res.ok) {
                    document.querySelector(`article[data-post-id="${postId}"]`).remove();
                }
            } catch (e) {
                console.error('Delete post failed', e);
            }
            return;
        }

        if (e.target.closest('.btn-delete-comment')) {
            const btn       = e.target.closest('.btn-delete-comment');
            const commentEl = btn.closest('.comment');
            const section   = commentEl.closest('.comments-section');
            const postId    = section.id.replace('comments-', '');
            try {
                const res = await fetch(`/comments/${btn.dataset.commentId}`, {
                    method: 'DELETE',
                    headers: csrfHeaders(),
                });
                refreshCsrf();
                if (res.ok) {
                    commentEl.remove();
                    updateCommentCount(postId, section);
                }
            } catch (e) {
                console.error('Delete comment failed', e);
            }
        }
    });

    //Helpers

    function updateCommentCount(postId, section) {
        const count  = section.querySelectorAll('.comment').length;
        const toggle = document.querySelector(`.btn-comment-toggle[data-post-id="${postId}"]`);
        toggle.querySelector('.comment-count-text').textContent =
            `${count} ${count === 1 ? 'comment' : 'comments'}`;
    }

    function buildCommentEl(comment) {
        const pic  = comment.profile_picture ? `${baseUrl}/${comment.profile_picture}` : `${baseUrl}/uploads/profile_pictures/default.png`;

        const date = new Date(comment.created_at.replace(' ', 'T'));
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' · ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        const div = document.createElement('div');
        div.className = 'comment';
        div.dataset.commentId = comment.id;
        div.dataset.ownerId   = comment.user_id;

        const deleteBtn = comment.user_id === currentUserId
            ? `<button class="btn-delete-comment" data-comment-id="${comment.id}">×</button>`
            : '';

        div.innerHTML = `
            <img src="${esc(pic)}" class="comment-avatar" alt="${esc(comment.username)}">
            <div class="comment-body">
                <span class="comment-username">${esc(comment.username)}</span>
                <p class="comment-text">${esc(comment.content).replace(/\n/g, '<br>')}</p>
                <span class="comment-date">${dateStr}</span>
                ${deleteBtn}
            </div>`;
        return div;
    }

    function esc(str) {
        return String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    //Show delete button only for own comments

    document.querySelectorAll('.comment').forEach(el => {
        if (Number(el.dataset.ownerId) !== currentUserId) {
            const btn = el.querySelector('.btn-delete-comment');
            if (btn) btn.style.display = 'none';
        }
    });



    const fileInput = document.getElementById('post-image-input');
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            document.getElementById('file-name-display').textContent =
                fileInput.files[0] ? fileInput.files[0].name : '';
        });
    }
})();