
  import React from 'react';

  export const default_commune_context = {
    
    userAddress: null,
    id: null,
    items :  [],
    expand_id: null
  }
  
  export const CommuneContext = React.createContext(default_commune_context);
  