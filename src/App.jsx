import React from "react";
import Weather from "./Pages/Weather";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://graphql-weather-api.herokuapp.com/",
  });

  return (
    <ApolloProvider client={client}>
      <Weather />
    </ApolloProvider>
  );
}

export default App;
