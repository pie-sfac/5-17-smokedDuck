export const header = (token?: string) => {
  return {
    Authorization: `Bearer ${token || window.localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  };
};

export const getLinkUrlInfo = (combinedLink: string) => {
  const [linkUrl, thumbnailUrl] = combinedLink.split(';');
  return {
    linkUrl,
    thumbnailUrl,
  };
};
