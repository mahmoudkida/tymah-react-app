import React from "react";
import {useQuery} from "@apollo/react-hooks";
import {ActivityIndicator} from "react-native";
import AnodinaRegular from "../components/AnodinaRegular";

const Query = ({children, query, id}) => {
    const {data, loading, error} = useQuery(query, {
        variables: {id: id}
    });

    if (loading) return <ActivityIndicator size="large" color="#ffffff"/>;
    if (error) return <AnodinaRegular> Error
        :
        {
            JSON.stringify(error)
        }
    </AnodinaRegular>;
    return children({data});
};

export default Query;  