import React from 'react';
import styled from 'styled-components';
/*
.code-example__pre,
.code-example__example {
  padding: 20px;
}
.code-example__example {
  border-top-right-radius: 0.3em;
  border-top-left-radius: 0.3em;
  background-color: white;
  border: 1px solid #dedede;
}
.code-example__example:first-child {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.code-example__example__heading {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 20px;
  padding-bottom: 20px;
  text-transform: uppercase;
}
.code-example__example__heading--no-rule {
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
}
.code-example__pre {
  background: #fafafa;
  border: 1px solid #dedede;
  border-top: none;
  margin: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.code-example__pre:last-child {
  border-bottom-right-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
}
.code-example__example-element {
  border-radius: .3em;
  padding: .5em 1.5em;
}
.code-example__example-element--block + .code-example__example-element--block {
  margin-top: 1em;
}
.code-example__example-element--inline + .code-example__example-element--inline {
  margin-top: 1em;
}
@media (min-width: 768px) {
  .code-example__example-element--inline {
    display: inline-block;
    vertical-align: text-bottom;
  }
  .code-example__example-element--inline + .code-example__example-element--inline {
    margin-left: 1em;
    margin-top: 0;
  }
}
.code-example__example-element--primary-bg {
  background-color: #1385e5;
}
*/

const CodeWrapper = styled.div`
  width: 100%;
  margin-bottom: 2em;
  margin-top: 2em;

  p {
    color: #999;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    display: inline-block;
  }

  pre {
    border-bottom-right-radius: 0.3em;
    border-bottom-left-radius: 0.3em;

    background: #fafafa;
    border: 1px solid #dedede;
    border-top: none;
    margin: 0;
    overflow-x: auto;
    padding: 20px;
    text-align: left;
  }
`;

const Title = styled.div`
  padding: 0 20px;
  text-align: left;
  border-top-right-radius: 0.3em;
  border-top-left-radius: 0.3em;
  background-color: white;
  border: 1px solid #dedede;
`;

const Step = styled.div`
  box-shadow: 0 0 0 1px #ddd;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 50%;
  color: #999;
  display: inline-block;
  font-size: 0.75em;
  font-weight: 500;
  line-height: 22px;
  margin-right: 10px;
  text-align: center;
`;

interface CodeProps {
  title: string;
  step: number;
  children: React.ReactNode;
}

const CodeExample = ({ title, step, children }: CodeProps) => {
  return (
    <CodeWrapper>
      <Title>
        <Step>{step}</Step>
        <p>{title}</p>
      </Title>
      <pre>{children}</pre>
    </CodeWrapper>
  );
};

export default CodeExample;
