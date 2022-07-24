
  import React from 'react';

  export const default_market_context = {
    
    userAddress: null,
    id: null,
    items :  [],
    expand_id: null
  }
  
  export const MarketContext = React.createContext(default_market_context);
  