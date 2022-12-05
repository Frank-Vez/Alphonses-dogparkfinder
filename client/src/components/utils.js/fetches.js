//function to delete a commment, fetch the delete comment Patch API
export const deleteComment = (commentId, parkId) => {
  fetch(`/API/parks/${parkId}/deleteComment`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId: commentId,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
//function to modify a commment, fetch the modify comment Patch API

export const modifyComment = (parkId, commentId, comment) => {
  fetch(`/API/parks/${parkId}/modifyComment`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentId: commentId,
      comment: comment,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

//function to add a favorite park. This one sends the park _id, user._id, the array of dogs of the owner and the oldFavorite parkId

export const addFavoritePark = (parkId, userId, dogs, oldPark) => {
  fetch(`/API/parks/${parkId}/favorite`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: userId,
      dogs: dogs,
      oldPark: oldPark,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
