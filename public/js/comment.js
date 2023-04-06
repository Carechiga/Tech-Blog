const commentFormHandler = async function (event) {
	event.preventDefault();
	const blog_id = document.querySelector('.blog-id').dataset.id;
	const comment_text = document.querySelector('#comment-body').value.trim();

	if (comment_text) {
		await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify({
				blog_id,
				comment_text,
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		document.location.reload();
	}
};

document
	.querySelector('.comment-form').addEventListener('submit', commentFormHandler);