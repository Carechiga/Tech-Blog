const editFormHandler = async (event) => {
    event.preventDefault();
    const post_name = document.querySelector('#post-name').value;
    const post_body = document.querySelector('#post-body').value;
    //grabs id from DOM
    const post_id = document.querySelector('#blog-id').dataset.id;

    const response = await fetch(`/api/blogs/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({ post_name, post_body }),
        headers: { 'Content-Type': 'application/json' }
    });

    if( response.ok ) {
        document.location.replace('/dashboard');
    }else {
        alert('Failed to update blog post');
    }
}

document.querySelector('.edit-blog-post-form').addEventListener('submit', editFormHandler);