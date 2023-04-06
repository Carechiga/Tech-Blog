const delButtonHandler = async (event) => {
 
    //grabs id from DOM
    const post_id = document.querySelector('#blog-id').dataset.id;

    const response = await fetch(`/api/blogs/${post_id}`, { method: 'DELETE' });

    //if DELETE is successful this will reroute to the Dashboard
        if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog post');
      }
    
  };

  document.querySelector('.delete-post-btn').addEventListener('click', delButtonHandler);