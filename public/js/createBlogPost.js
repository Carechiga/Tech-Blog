const newFormHandler = async (event) =>{
    event.preventDefault();
    const title = document.querySelector('#post-name').value;
    const post_content = document.querySelector('#post-body').value.trim();

    const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({
            post_name,
            post_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create blog post');
    }
}

document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);