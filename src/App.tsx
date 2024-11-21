import type { Component } from 'solid-js';
import "./components/ui/button";

const App: Component = () => {

  
  return (
    <>
    <cn-button variant="outline" size="lg" label="Submit"></cn-button>
    <cn-button variant="ghost" disabled="true" label="Cancel"></cn-button>
    </>
  );
};

export default App;
