// Save user input as a comment
const commentFormHandler = async (event) => {
    event.preventDefault();

    if (event.target.children[2].hasAttribute('data-id')) {
        const content = document.querySelector('#comment').value.trim();
        const id = parseInt(event.target.children[2].getAttribute('data-id'));
    
        if (content) {
            const response = await fetch(`/post/${id}`, {
                method: 'POST',
                body: JSON.stringify({ content }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                document.location.replace(`/post/${id}`);
            } else {
                alert('Failed to create comment');
            }
        }

    }

    // Refresh the page
    window.location.reload();
}

document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);