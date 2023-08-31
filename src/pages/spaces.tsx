
import React, { useState, createContext } from 'react';
import SpaceContextProvider from '../context/spaceContext';
import Layout from '@theme/Layout';
import '../css/global.css';
import Space from '../components/spaces/space';
import SpaceContainer from '../components/spaces/container';

export default function Spaces() {
    return (
    <Layout>
        <SpaceContextProvider>
            <SpaceContainer/>
        </SpaceContextProvider>
    </Layout>)
}