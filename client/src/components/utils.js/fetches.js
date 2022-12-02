//function to delete a commment
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
