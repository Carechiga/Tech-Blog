const newFormHandler = async (event) =>{
    event.preventDefault();
    const post_name = document.querySelector('#post-name').value;
    const post_body = document.querySelector('#post-body').value.trim();

    if (post_name && post_body){
    const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ post_name, post_body }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create blog post');
    }
  }
}

document.querySelector('.new-blog-form').addEventListener('submit', newFormHandler);