import ContentLoader from 'react-content-loader';

const UserLoader = () => (
    <ContentLoader
      speed={1}
      width={1024}
      height={200}
      viewBox="0 0 1024 200"
      backgroundColor="#ecebeb"
      foregroundColor="#d6d2d2"
      style={{width: "100%"}}
      >
      <rect x="0" y="0" rx="1" ry="1" width="100%" height="30"/>
      <rect x="0" y="40" rx="1" ry="1" width="100%" height="30"/>
      <rect x="0" y="80" rx="1" ry="1" width="100%" height="30"/>
      <rect x="0" y="120" rx="1" ry="1" width="100%" height="30"/>
      <rect x="0" y="160" rx="1" ry="1" width="100%" height="30"/>
    </ContentLoader>
);

export default UserLoader;