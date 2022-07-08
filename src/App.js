import './App.css'
import BookSearch from './components/BookSearch.js'
import {QueryClient, QueryClientProvider} from 'react-query'

export default function App() {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                queryFn: defaultQueryFn,
                staleTime: 1000 * 60 * 5,
                cacheTime: 1000 * 60 * 5,
                retry: false,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false
            }
        }
    })

    async function defaultQueryFn({queryKey}) {
        const data =
            await fetch(queryKey[0])
            .then(res => res.json())
        
        return data
    }

    return (
        <> 
        <QueryClientProvider client={queryClient}> 
            <div className="App">
                <div className="website-title-container">
                    <h1 className="website-title">Book Search</h1>
                </div>
                <BookSearch/>
            </div>
        </QueryClientProvider> 
        </>
    )
}
