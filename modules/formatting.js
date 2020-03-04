
var profile = (userData, userid = false) => {
    let following = false
    if (userid) {
      following = (userData.follower).includes(userid);
    }
    let profileFormat = {
        username: userData.username,
        bio: userData.bio,
        image: userData.image,
        following: following
    }
    return profileFormat;
  }


var  Comment = (comments , userid=false)=>{  
    let formatedComment = {comment : []};
    comments.forEach((comment)=>{
      let singleComment = {
        id : comment.id,
        createdAt : comment.createdAt,
        updatedAt : comment.updatedAt,
        body : comment.body,
        author : profile(comment.author , userid)
      }
      formatedComment.comment.push(singleComment);
    } 
      )
      return formatedComment;
  }
module.exports = { Comment, profile};