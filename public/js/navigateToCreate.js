const createPostHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard/new')
}
document.querySelector('#create-new-blog-post').addEventListener('click', createPostHandler);