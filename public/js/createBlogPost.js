const newFormHandler = async (event) =>{
    const post_name = document.getElementById('post-name').value.trim();
    const post_body = document.getElementById('post-body').value.trim();

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