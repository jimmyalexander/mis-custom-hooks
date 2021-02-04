import { useEffect, useRef, useState } from 'react';

export const useFetch = ( url ) => {

    const isSMounted = useRef( true );
    const [state, setState] = useState({ data: null, loading: true, error: null});

    useEffect( () => {
        return () => {
            isSMounted.current = false;  // cuando se desmonte  el componente o cancele la suscripcion a la api isMounted o 'useRef' sera false
        }
    }, []);

    useEffect( () => {
        setState({ data: null, loading: true, error: null });
            fetch( url )
            .then( resp => {
                return resp.json();
            })
            .then( data => {
                    if( isSMounted.current){ //si mi componente sigue montado 'true' entonces podremos setear la
                        setState({
                            loading: false,
                            error: null,
                            data
                        })
                    }
                    else{
                        console.log('setState no se llamo')
                    }
                
            });
    }, [url])
    return state;
}
