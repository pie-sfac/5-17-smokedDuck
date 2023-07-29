export const header = () => {
  return {
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };
};

export const getLinkUrlInfo = (combinedLink: string) => {
  // ${youtubeVideoUrl};${thumbnailUrl}
  const [linkUrl, thumbnailUrl] = combinedLink.split(';');
  return {
    linkUrl,
    thumbnailUrl,
  };
};
