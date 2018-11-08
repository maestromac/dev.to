export function checkFollowingStatus(followedTags, jsonTags) {
  const newJSON = jsonTags;
  jsonTags.map((tag, index) => {
    if (followedTags.includes(tag.name)) {
      newJSON[index].following = true;
    } else {
      newJSON[index].following = false;
    }
    return newJSON;
  });
  return newJSON;
}
