// Create post form
function newPost() {
    return `
            <form>
                <label for="title" class="form-label">Title</label>
                <input type="text" id="title" class="form-control" id="title">
                <label for="content" class="form-label">Content</label>
                <input type="text" id="content" class="form-control" id="content">
                <button type="submit" class="btn btn-primary">Create</button>
            </form>
     `
}

// Edit post form
function editPost() {
    return `
            <form>
                <label for="title" class="form-label">Title</label>
                <input type="text" id="title" class="form-control" id="title" value="${title}">
                <label for="content" class="form-label">Content</label>
                <input type="text" id="content" class="form-control" id="content" value="${content}">
                <button type="submit" class="btn btn-primary">Update Post</button>
                <button type="submit" class="btn btn-primary">Delete</button>
            </form>
     `
}

// Saves new post to database
const saveNewPost = async () => {

}

// When user clicks "+ New Post"
document
    .querySelector(".new-post-form")
    .addEventListener('submit', () => {
        document.querySelector(".dashboard").innerHTML = newPost()
    });
// When user clicks "Create"

// When user clicks "Update Post"

// When user clicks "Delete"


