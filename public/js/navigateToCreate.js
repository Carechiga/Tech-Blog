const createPostHandler = async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard/new')
}
document.querySelector('#create-new-blog-post').addEventListener('click', createPostHandler);

const editPostHandler = async (event) => {
    event.preventDefault();
    const blogId = document.querySelector('.blog-id').dataset.id
    document.location.replace(`/dashboard/edit/${blogId}`)
}

document.querySelector('.edit-btn').addEventListener('click', editPostHandler);