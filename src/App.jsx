import React from 'react';
import Home from './pages/Home';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Test from './pages/Test';
import Login from './pages/Login';
import Register from './pages/Register';
import {
  BrowserRouter, Routes,Route } from 'react-router-dom';


function App() {

  const client = new ApolloClient({
    uri: "https://contact-graph-ql-vivr.vercel.app/",
    cache: new InMemoryCache(),
    headers: {
      authorization: localStorage.getItem("userData") || "",
    },
  });

  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;
