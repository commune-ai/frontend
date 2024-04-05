import React from 'react';
import { usePathname } from 'next/navigation';

const Head = () => {
  const currentPath = usePathname();

  // Split the path and get the last part
  const pathParts = currentPath.split('/');
  let moduleName = pathParts[pathParts.length - 1];

  // If moduleName is empty, default it to 'Home' or some other default value
  if (!moduleName) {
    moduleName = 'Home'; // You can change this default value to whatever you want
  }

  return (
    <>
      <title>{`Commune | ${moduleName}`}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Renovating the way we build software for developers" />
      <link rel="icon" href="/svg/commune.svg" />
    </>
  );
};

export default Head;
