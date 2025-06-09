import { useEffect, useState } from "react";

export function useFetch(url){
    const [finalData, setFinalData] = useState();

    useEffect(() => {
        async function getData(){
            try {
                const response = await fetch(url);
                const json = await response.json();
                setFinalData(json);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, [url]);

    return { finalData };
}