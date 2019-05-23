import React, { useState } from 'react';
import './App.css';
// @ts-ignore
import { CastButton, CastProvider } from 'react-cast-sender';
import Code from './components/CodeExample';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import styled from 'styled-components';
import UseCastExample from './components/UseCastExample';
import UseCastPlayerExample from './components/UseCastPlayerExample/UseCastPlayerExample';

const Title = styled.h1`
  color: #fff;
  text-align: center;
`;
const Container = styled.div`
  max-width: 960px;
  margin: auto;
`;

const App: React.FC = () => {
  const [receiverApplicationId, setReceiverApplicationId] = useState(
    '5D7312A7'
  );
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Title>React Cast Sender</Title>
          <Code step={1} title="Install">
            yarn add react-cast-sender
          </Code>
          <Code step={2} title="Install peer Dependencies">
            yarn add react <br />
            yarn add react-dom <br />
            yarn add styled-components
          </Code>
          <Code step={3} title="Add CastProvider">
            {`import { CastProvider } from 'react-cast-sender';

const App = ({ children }) => {
  return <CastProvider receiverApplicationId="my-cast-id">
    {children}
  </CastProvider>
}`}
          </Code>
        </Container>
      </header>
      <Container>
        <h2>Documentation</h2>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              disabled
              id="receiverApplicationId"
              label="receiverApplicationId"
              value={receiverApplicationId}
              onChange={e => {
                setReceiverApplicationId(e.target.value);
              }}
              margin="normal"
              helperText="Select reveiver Application Id to use in examples below"
            />
          </Grid>
          <Grid item xs={6}>
            <div style={{ width: '64px' }}>
              <CastButton />
            </div>
          </Grid>
        </Grid>
        <CastProvider receiverApplicationId={receiverApplicationId}>
          <h3>Hooks</h3>

          <UseCastExample />
          <UseCastPlayerExample />
          <h3>Components</h3>
          {/*<MiniController />*/}
        </CastProvider>
      </Container>
    </div>
  );
};

export default App;
