
import React from 'react';

export const UserAvatar = ({ user, className = '' }) => {
  return React.createElement('div', { className: `flex-shrink-0 ${className}` },
    React.createElement('img', {
      src: user.avatarUrl,
      alt: user.name,
      className: "h-10 w-10 rounded-full object-cover",
      title: user.name
    })
  );
};
