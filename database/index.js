
/* 유저 정보 */
const users = [
]

/* 댓글 테이블 */
const comments = [
]

/* 게시글 */
const posts = [
]

/* 식물 */
const plants = [
]

const addUser = function(id, pw) {
    users.push({
        id: id,
        pw: pw,
        tier: 0
    })
}

const getUserById = function(id) {
    return users.filter((user) => user.id == id)
}

const getAllUser = function() {
    return users
}

const getPlantById = function(id) {
    return plants.filter((plant) => plant.id == id)
}

const getPlantByUserid = function(id) {
    return plants.filter((plant) => plant.userid == id)
}

const addPost = function(userId, postTitle, content, picture) {    /* 게시물 추가 */
    posts.push({
        userId: userId,
        id: posts.length + 1,
        title: postTitle,
        content: content,
        picture: picture,
        uploadDate: new Date(),
        likeNum: 0,
        likeUser: []  /* 좋아요를 한 사람이 여러번 누르는걸 방지하기 위해 좋아요 누르면 
                           해당 리스트에 유저 id 저장 */
    })
}

const getPostById = function(id) {    /* 게시물 id로 게시물의 모든 정보 반환 */  
    return posts.filter((post) => post.id == id)
}

const getPostByUserId = function(userId) {
    return posts.filter((post) => post.userId == userId)
}

const getAllPost = function() {
    return posts
}

const addPlant = function(type, age, user) {
    plants.push({
        id: plants.length + 1,
        userid: user,
        type: type,
        age: age
    })
}

const addComment = function(comment, user, post) {
    comments.push({
        id: comments.length + 1,
        postId: post,
        userId: user,
        comment: comment
    })
}

const getCommentByPostId = function(post) {
    return comments.filter((comment) => comment.postId == post)
}

const addLike = function(user, postId) {
    const data = getPostById(postId)
    if (data.length == 0) {
        return
    }

    let post = data[0]
    if (post.userId == user) {
        return
    }
    if (post.likeUser.includes(user)) {
        return
    }
    post.likeNum += 1
    post.likeUser.push(user)
}

/*  게시물 수정 잘 모르겠음
const additPost = function(postTitle, post) {
    const index = post.findIndex((post) => post.Id == 자기자신의 id)
    post[index].postTitle = postTitle;  // 자신을 가르키는 게시물 인덱스의 게시물 제목 수정
    post[index].post = post;            // 자신을 가르키는 게시물 인덱스의 게시물 내용 수줭
}
*/

/*  게시물 삭제인데 게시물 수정과 같은 이유로 잘 모름 + 게시물 작성자 id와 삭제하는 사람 id가 같은지 확인하는 방법 모름
const deletePost = function(뭔가 들어가야 하나?) {
    const index = post.findIndex((post) => post.Id == 자기자신의 id)
    post.splice(index,1)  // 자신을 가르키는 게시물 인덱스부터 1개의 객체 삭제
}
*/

/*  댓글 삭제
const deleteComment = function(뭐가 들어가야할까..) {

}
*/

module.exports = {
    addUser,
    getUserById,
    getAllUser,
    addPlant,
    getPlantById,
    getPlantByUserid,
    addPost,
    getPostById,
    getPostByUserId,
    getAllPost,
    addComment,
    getCommentByPostId,
    addLike
}