import React from "react";  
import { useQuery } from "@apollo/react-hooks";
import {  Text } from 'react-native';
import AnodinaRegular from "../components/AnodinaRegular";

const Query = ({ children, query, id }) => {  
  const { data, loading, error } = useQuery(query, {
    variables: { id: id }
  });

  if (loading) return <AnodinaRegular style={{textAlign: 'center'}}>Loading...</AnodinaRegular>;
  if (error) return <TexAnodinaRegulart>Error: {JSON.stringify(error)}</TexAnodinaRegulart>;
  return children({ data });
};

export default Query;  