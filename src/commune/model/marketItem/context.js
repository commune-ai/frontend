
import React from 'react';

export const default_model_context = {
    
        user: {
                depositValue: 0,
                marketValue: 0,
                marketShare: 0,
                depositShare: 0,
                depositValue: 0,
                address: "0x000",
                ROI: 0
                
            },
        portfolio: {
            tokens: [],
            percentBase: 0,
            tokenStates: {},
            ROI: 0
        }
    }


export const ModelContext = React.createContext({
    default_model_context,
    updateModelContext: (context) => {return context},
  });
